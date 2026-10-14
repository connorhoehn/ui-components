/** Serializable browser-side collector. No React, application imports or network. */
export function measureDOM({ contract, selectors, required = [], composerExpectation, probe }) {
  const issues = [], coverage = [], samples = [];
  const selectorCache = new WeakMap();
  const tolerance = contract.tolerance ?? 1;
  // checkVisibility(): a closed <details>'s contents (content-visibility hidden)
  // keep a laid-out box but paint nothing; whether that box has been laid out
  // yet depends on what forced layout last, so judging it made cases unstable.
  const visible = el => { const b = el.getBoundingClientRect(), s = getComputedStyle(el); return b.width > 0 && b.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && s.clip.replace(/\s/g, '') !== 'rect(0px,0px,0px,0px)' && s.clipPath !== 'inset(50%)' && (typeof el.checkVisibility !== 'function' || el.checkVisibility()); };
  const selectorOf = el => {
    if (el === document.documentElement) return ':root';
    if (selectorCache.has(el)) return selectorCache.get(el);
    const parts = [];
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      if (n.id && !/^(_r_|:r|radix-)/.test(n.id)) { parts.unshift('#' + CSS.escape(n.id)); break; }
      const testId = n.getAttribute('data-testid');
      if (testId && document.querySelectorAll(`[data-testid="${CSS.escape(testId)}"]`).length === 1) { parts.unshift(`[data-testid="${CSS.escape(testId)}"]`); break; }
      const tag = n.tagName.toLowerCase();
      const siblings = n.parentElement ? [...n.parentElement.children].filter(s => s.tagName === n.tagName) : [];
      parts.unshift(tag + (siblings.length > 1 ? `:nth-of-type(${siblings.indexOf(n) + 1})` : ''));
    }
    const result = parts.join(' > '); selectorCache.set(el, result); return result;
  };
  const css = name => name?.startsWith('$') ? selectors[name.slice(1)] : name;
  const query = (name, includeHidden = false) => {
    const s = css(name);
    if (!s) throw new Error(`Unbound selector ${name}`);
    const all = [...document.querySelectorAll(s)];
    return includeHidden ? all : all.filter(visible);
  };
  const rect = el => { const b = el.getBoundingClientRect(); return Object.fromEntries(['x', 'y', 'left', 'right', 'top', 'bottom', 'width', 'height'].map(k => [k, Math.round(b[k] * 100) / 100])); };
  const add = (rule, el, property, expected, actual, category = 'violation') => issues.push({ rule: rule.id, category, owner: rule.owner ?? 'shared UI contract', selector: el ? selectorOf(el) : css(rule.selector) ?? 'document', property, expected, actual, ...(el ? { bounds: rect(el) } : {}) });
  // A token resolves on the document root, or — `scope: "element"` — on the
  // measured element, so a host-scoped override of the token (a record pane
  // setting its own content gutter) is the value that element must meet.
  const resolve = (expected, el) => {
    if (!expected || typeof expected !== 'object') return expected;
    if (expected.token) {
      const host = expected.scope === 'element' && el ? el : document.documentElement;
      const value = getComputedStyle(host).getPropertyValue(expected.token).trim();
      if (!value) throw new Error(`Missing design token ${expected.token}`);
      if (/^-?[\d.]+rem$/.test(value)) return parseFloat(value) * parseFloat(getComputedStyle(document.documentElement).fontSize);
      if (/^-?[\d.]+(?:px)?$/.test(value)) return parseFloat(value);
      throw new Error(`Token ${expected.token} is not a pixel/rem scalar: ${value}`);
    }
    if (expected.from) {
      const el = query(expected.from)[0];
      if (!el) throw new Error(`Missing style reference ${expected.from}`);
      return getComputedStyle(el)[expected.property];
    }
    return expected;
  };
  const matches = (actual, expected, tol = tolerance) => {
    expected = resolve(expected);
    if (Array.isArray(expected)) return expected.some(v => matches(actual, v, tol));
    if (typeof expected === 'number') return Number.isFinite(parseFloat(actual)) && Math.abs(parseFloat(actual) - expected) <= tol;
    if (expected && typeof expected === 'object') {
      if (expected.contains) return String(actual).includes(expected.contains);
      const n = parseFloat(actual);
      return Number.isFinite(n) && (expected.min == null || n >= expected.min - tol) && (expected.max == null || n <= expected.max + tol);
    }
    return String(actual).replace(/\s+/g, ' ').trim() === String(expected).replace(/\s+/g, ' ').trim();
  };
  const check = (rule, el, property, actual, expected) => {
    const wanted = resolve(expected, el);
    samples.push({ rule: rule.id, selector: selectorOf(el), property, actual, expected: wanted });
    if (!matches(actual, wanted, rule.tolerance ?? tolerance)) add(rule, el, property, wanted, actual);
  };
  const PLACEHOLDER_REASON = /^(?:todo|tbd|n\/?a|none|null|undefined|exempt|not applicable|coming soon|[-?.…]+)[.!?]*$/i;
  // The URL a reader would share: path and query, never a hash or the origin.
  const urlKey = href => { try { const u = new URL(href); return u.pathname + u.search; } catch { return String(href); } };
  // Ink: where a reader actually sees something — visible text runs, images,
  // icons and canvases — never a padded wrapper's box. Used by the gutter,
  // row-start and sparse-row rules so full-bleed rows and hover surfaces are
  // judged by what they draw, not by the box that holds it.
  const INK_ELEMENTS = 'img, svg, canvas, video, [data-ui-text="avatar"]';
  const inkRects = (root, skip = () => false) => {
    const out = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const text = walker.currentNode, parent = text.parentElement;
      if (!text.textContent.trim() || !parent || !visible(parent) || parent.closest('svg, [aria-hidden="true"]') || skip(parent)) continue;
      const range = document.createRange(); range.selectNodeContents(text);
      for (const r of range.getClientRects()) if (r.width > 1 && r.height > 1) out.push({ el: parent, left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    }
    for (const el of [root, ...root.querySelectorAll(INK_ELEMENTS)]) {
      if (!el.matches?.(INK_ELEMENTS) || !visible(el) || el.parentElement?.closest('svg') || skip(el)) continue;
      const r = el.getBoundingClientRect();
      out.push({ el, left: r.left, right: r.right, top: r.top, bottom: r.bottom });
    }
    return out;
  };
  // A box whose padding is the gutter: its content box is the column's reading edge.
  const contentBox = el => { const b = el.getBoundingClientRect(), s = getComputedStyle(el); return { left: b.left + parseFloat(s.paddingLeft), right: b.right - parseFloat(s.paddingRight), top: b.top, bottom: b.bottom }; };
  // Ink is only what a clipping or scrolling ancestor (below `stop`) lets through:
  // a wide table inside its own scroller is judged by the scroller's window.
  const clipToAncestors = (r, stop) => {
    let { left, right } = r;
    for (let n = r.el.parentElement; n && n !== stop; n = n.parentElement) {
      if (getComputedStyle(n).overflowX === 'visible') continue;
      const c = n.getBoundingClientRect(); left = Math.max(left, c.left); right = Math.min(right, c.right);
    }
    return right - left > 1 ? { ...r, left, right } : null;
  };
  // ── Legible text (text.cramped, text.overlap, text.clipped, placeholder.squeezed) ──
  // A text run is a non-empty text node a reader can see: its parent paints
  // (no display:none / visibility:hidden / sr-only clip, no opacity-0
  // ancestor) and it is not an icon glyph (svg, aria-hidden). Each line of it
  // is judged by its EM box: the glyph rect a range reports is ~1.2em tall
  // (ascent + descent), so two tight lines (leading-none) would "touch"
  // without any ink meeting; the em box is what the eye reads as the line.
  const csCache = new Map();
  const cs = el => { let s = csCache.get(el); if (!s) { s = getComputedStyle(el); csCache.set(el, s); } return s; };
  const faded = el => { for (let n = el; n && n !== document.documentElement; n = n.parentElement) if (cs(n).opacity === '0') return true; return false; };
  const textRuns = root => {
    const out = [], seen = new Map();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode, el = node.parentElement;
      if (!node.textContent.trim() || !el || el.closest('svg, [aria-hidden="true"], script, style, noscript, template, title')) continue;
      if (!seen.has(el)) seen.set(el, visible(el) && !faded(el));
      if (!seen.get(el)) continue;
      const range = document.createRange(); range.selectNodeContents(node);
      const fs = parseFloat(cs(el).fontSize) || 14;
      const rects = [...range.getClientRects()].filter(r => r.width > 1 && r.height > 1).map(r => {
        const pad = Math.max(0, (r.height - fs) / 2);
        return { left: r.left, right: r.right, top: r.top + pad, bottom: r.bottom - pad };
      });
      if (rects.length) out.push({ node, el, fs, rects, text: node.textContent.replace(/\s+/g, ' ').trim() });
    }
    return out;
  };
  // The ancestors that clip an element's painted box, honouring containing
  // blocks: an absolutely positioned box escapes static ancestors' overflow,
  // a fixed one escapes everything below a transformed/filtered ancestor.
  // The element itself is first: its overflow clips its own text.
  const clipCache = new Map();
  const clippers = el => {
    if (clipCache.has(el)) return clipCache.get(el);
    const out = []; let pos = 'static';
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = cs(n);
      const contains = s.position !== 'static' || s.transform !== 'none' || s.filter !== 'none' || /paint|layout|strict|content/.test(s.contain);
      const holds = pos === 'fixed' ? (s.transform !== 'none' || s.filter !== 'none' || /paint|layout|strict|content/.test(s.contain)) : pos === 'absolute' ? contains : true;
      if (holds) {
        {
          const x = s.overflowX !== 'visible', y = s.overflowY !== 'visible';
          if (x || y) out.push({ n, x, y, xHard: /hidden|clip/.test(s.overflowX), yHard: /hidden|clip/.test(s.overflowY) });
        }
        pos = s.position;
      }
      if (n === document.body) break;
    }
    clipCache.set(el, out); return out;
  };
  // The padding box in viewport pixels. client* sizes are layout pixels, so a
  // box under a scale transform (a zoomed node canvas) is converted by its
  // own rendered/layout ratio.
  const innerBox = n => {
    const b = n.getBoundingClientRect();
    const sx = n.offsetWidth ? b.width / n.offsetWidth : 1, sy = n.offsetHeight ? b.height / n.offsetHeight : 1;
    const left = b.left + n.clientLeft * sx, top = b.top + n.clientTop * sy;
    return { left, top, right: left + (n.clientWidth ? n.clientWidth * sx : b.width), bottom: top + (n.clientHeight ? n.clientHeight * sy : b.height) };
  };
  // A run's rect cut to every clipping/scrolling ancestor: null when wholly
  // hidden (a collapsed panel, a row scrolled out of its list).
  const clipped = (r, el) => {
    let { left, right, top, bottom } = r;
    for (const c of clippers(el)) {
      const b = innerBox(c.n);
      if (c.x) { left = Math.max(left, b.left); right = Math.min(right, b.right); }
      if (c.y) { top = Math.max(top, b.top); bottom = Math.min(bottom, b.bottom); }
    }
    return right - left > 1 && bottom - top > 1 ? { left, right, top, bottom } : null;
  };
  // The nearest stacking-context root: two runs are only comparable when they
  // paint in the same context (a popover, a sticky header or a canvas node is
  // its own layer, drawn over the page by design).
  const stackCache = new Map();
  const stackRoot = el => {
    if (stackCache.has(el)) return stackCache.get(el);
    let root = document.documentElement;
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = cs(n), parent = n.parentElement ? cs(n.parentElement) : null;
      const flexItem = parent && /flex|grid/.test(parent.display);
      if (s.position === 'fixed' || s.position === 'sticky' || ((s.position !== 'static' || flexItem) && s.zIndex !== 'auto') || parseFloat(s.opacity) < 1
        || s.transform !== 'none' || s.filter !== 'none' || s.isolation === 'isolate' || s.mixBlendMode !== 'normal' || /transform|opacity|filter/.test(s.willChange)
        || /paint|layout|strict|content/.test(s.contain) || (s.backdropFilter && s.backdropFilter !== 'none') || s.clipPath !== 'none' || (s.maskImage && s.maskImage !== 'none')) { root = n; break; }
    }
    stackCache.set(el, root); return root;
  };
  // Elements layered over text by design (a count badge over an avatar)
  // declare it on the owner: data-ui-layered="<reason>".
  const layered = el => el.closest('[data-ui-layered]');
  const snippet = s => (s.length > 40 ? s.slice(0, 39) + '…' : s);
  const canvas = document.createElement('canvas').getContext('2d');
  const textWidth = (text, font) => { canvas.font = font; return canvas.measureText(text).width; };
  const fontOf = s => s.font || `${s.fontStyle} ${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
  for (const name of required) if (query(name).length === 0) add({ id: 'coverage.required', selector: name }, null, 'rendered count', '>= 1', 0, 'coverage');
  for (const rule of contract.rules) {
    try {
      // `includeHidden`: count elements whether or not they paint — a native
      // <select> hidden behind a custom trigger is still a native dropdown.
      let nodes = rule.selector ? query(rule.selector, rule.includeHidden === true) : [];
      const excluded = [];
      for (const exclusion of rule.exclude ?? []) {
        if (!exclusion.reason) throw new Error(`Exclusion on ${rule.id} needs a reason`);
        const removed = nodes.filter(el => el.matches(css(exclusion.selector)) || el.closest(css(exclusion.selector)));
        excluded.push({ reason: exclusion.reason, count: removed.length });
        nodes = nodes.filter(el => !removed.includes(el));
      }
      coverage.push({ rule: rule.id, matched: nodes.length, excluded });
      if (rule.required && nodes.length === 0) { add(rule, null, 'rendered count', '>= 1', 0, 'coverage'); continue; }
      if (rule.kind === 'composer-presence') {
        // Omitted policy is unreviewed; an explicitly malformed policy is an adapter defect.
        const mode = composerExpectation == null ? 'unclassified' : composerExpectation.mode;
        const validPolicy = composerExpectation == null || (typeof composerExpectation === 'object' && !Array.isArray(composerExpectation) && ['required', 'exempt', 'unclassified'].includes(mode));
        const reason = typeof composerExpectation?.reason === 'string' ? composerExpectation.reason.trim() : '';
        Object.assign(coverage.at(-1), { status: validPolicy ? mode : 'invalid', ...(reason ? { reason } : {}) });
        samples.push({ rule: rule.id, selector: css(rule.selector), property: 'presence policy', actual: nodes.length, expected: mode, ...(reason ? { reason } : {}) });
        if (!validPolicy) add(rule, null, 'presence policy', 'object with required, exempt or unclassified mode', mode ?? composerExpectation, 'coverage');
        else if (mode === 'required') {
          if (nodes.length === 0) add(rule, null, 'composer count', '>= 1', 0);
          else {
            const inputs = nodes.flatMap(el => [...el.querySelectorAll(rule.input ?? '[contenteditable="true"], textarea, [role="textbox"]')].filter(visible));
            samples.push({ rule: rule.id, selector: css(rule.selector), property: 'composer input count', actual: inputs.length, expected: '>= 1' });
            if (!inputs.length) add(rule, nodes[0], 'composer input count', '>= 1 visible input inside composer', 0);
          }
        }
        else if (mode === 'exempt' && (!reason || PLACEHOLDER_REASON.test(reason))) {
          add(rule, null, 'exemption reason', 'documented contextual reason, not blank or a placeholder', reason, 'coverage');
        }
      }
      else if (rule.kind === 'text') {
        const labels = new Set();
        for (const scope of nodes) {
          if (scope.matches('input,select,textarea')) labels.add(scope);
          const walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
          while (walker.nextNode()) {
            const text = walker.currentNode, parent = text.parentElement;
            if (!text.textContent.trim() || !parent || !visible(parent) || parent.closest('svg, [aria-hidden="true"]')) continue;
            if ((rule.exclude ?? []).some(e => parent.closest(css(e.selector)))) continue;
            const range = document.createRange(); range.selectNodeContents(text);
            if ([...range.getClientRects()].some(r => r.width > 1 && r.height > 1)) labels.add(parent);
          }
        }
        coverage.at(-1).textNodes = labels.size;
        for (const el of labels) for (const [property, expected] of Object.entries(rule.properties)) check(rule, el, property, getComputedStyle(el)[property], expected);
      }
      else if (rule.kind === 'style' || rule.kind === 'box') for (const el of nodes) {
        const values = rule.kind === 'style' ? getComputedStyle(el) : rect(el);
        for (const [property, expected] of Object.entries(rule.properties)) check(rule, el, property, values[property], expected);
      }
      else if (rule.kind === 'count') {
        samples.push({ rule: rule.id, selector: css(rule.selector), property: 'count', actual: nodes.length, expected: rule.expected });
        if (!matches(nodes.length, rule.expected, 0)) add(rule, nodes[0], 'count', rule.expected, nodes.length);
      }
      else if (rule.kind === 'in-viewport') for (const el of nodes) {
        // An open popup (a listbox, a menu) must sit wholly inside the viewport.
        const b = rect(el);
        const box = { left: b.left, top: b.top, right: window.innerWidth - b.right, bottom: window.innerHeight - b.bottom };
        samples.push({ rule: rule.id, selector: selectorOf(el), property: 'viewport margins', actual: box, expected: { min: 0 } });
        for (const [edge, gap] of Object.entries(box)) if (gap < -tolerance) add(rule, el, `${edge} inside viewport`, '>= 0', Math.round(gap * 100) / 100);
      }
      else if (rule.kind === 'viewport') {
        const overflow = document.documentElement.scrollWidth - innerWidth;
        samples.push({ rule: rule.id, selector: ':root', property: 'horizontal overflow', actual: overflow, expected: {max:tolerance} });
        if (overflow > tolerance) add(rule, document.documentElement, 'horizontal overflow', '<= ' + tolerance, overflow);
      }
      else if (rule.kind === 'align' || rule.kind === 'within') for (const el of nodes) {
        const anchors = rule.ancestor ? [el.parentElement?.closest(css(rule.anchor))].filter(Boolean) : query(rule.anchor);
        if (anchors.length !== 1) { add(rule, el, 'anchor count', 1, anchors.length, 'coverage'); continue; }
        const a = rect(anchors[0]), b = rect(el);
        if (rule.kind === 'align') for (const edge of rule.edges ?? ['left', 'right']) check(rule, el, edge, b[edge] - a[edge], rule.offset ?? 0);
        else for (const axis of rule.axes ?? ['x', 'y']) {
          const [start, end] = axis === 'x' ? ['left', 'right'] : ['top', 'bottom'];
          if (b[start] < a[start] - tolerance || b[end] > a[end] + tolerance) add(rule, el, axis + ' containment', [a[start], a[end]], [b[start], b[end]]);
        }
      }
      else if (rule.kind === 'gutter') {
        // The content column's reading edge: the anchor (the trail band, padded
        // by the page gutter) sets left/right; every piece of ink in the
        // column's body must sit inside it. A body flush to the rail while the
        // trail and title are inset fails; so does an action at the window edge.
        let measured = 0;
        for (const region of nodes) {
          const anchor = [...region.querySelectorAll(css(rule.anchor))].filter(visible)[0];
          if (!anchor) { add(rule, region, 'gutter anchor', css(rule.anchor), 'missing', 'coverage'); continue; }
          const edge = contentBox(anchor);
          const skip = el => anchor.contains(el) || (rule.exclude ?? []).some(e => el.closest(css(e.selector)));
          const ink = inkRects(region, skip).filter(r => r.top >= edge.bottom - tolerance).map(r => clipToAncestors(r, region)).filter(Boolean);
          measured += ink.length;
          const tol = rule.tolerance ?? tolerance;
          for (const side of rule.edges ?? ['left', 'right']) {
            const worst = side === 'left' ? ink.reduce((a, r) => (!a || r.left < a.left ? r : a), null) : ink.reduce((a, r) => (!a || r.right > a.right ? r : a), null);
            if (!worst) continue;
            const delta = Math.round((side === 'left' ? worst.left - edge.left : edge.right - worst.right) * 100) / 100;
            samples.push({ rule: rule.id, selector: selectorOf(region), property: `${side} gutter`, actual: delta, expected: { min: 0 } });
            if (delta < -tol) add(rule, worst.el, `${side} gutter (ink inside the trail's edge)`, `>= 0 (edge ${Math.round(edge[side])})`, delta);
          }
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'row-start') {
        // The first heading row under the anchor (a page title, or a
        // conversation's avatar + name when it is the page's header) starts
        // at the anchor's reading edge — not left of it, not indented.
        let measured = 0;
        for (const region of nodes) {
          const anchor = [...region.querySelectorAll(css(rule.anchor))].filter(visible)[0];
          if (!anchor) continue;
          const edge = contentBox(anchor);
          const heading = [...region.querySelectorAll(css(rule.heading ?? 'h1, h2, h3, [role="heading"]'))]
            .filter(el => visible(el) && !anchor.contains(el) && el.getBoundingClientRect().top >= edge.bottom - tolerance)
            .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)[0];
          if (!heading) continue;
          const band = heading.getBoundingClientRect(), mid = (band.top + band.bottom) / 2;
          // The row: ink in the region whose vertical extent crosses the heading's middle.
          const row = inkRects(region).filter(r => r.top <= mid && r.bottom >= mid);
          const start = row.reduce((a, r) => (!a || r.left < a.left ? r : a), null);
          if (!start) continue;
          measured++;
          check(rule, start.el, 'first heading row start', Math.round((start.left - edge.left) * 100) / 100, rule.offset ?? 0);
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'title-count') {
        // One title per page: headings drawn at the page-title step (or larger) in the content column.
        const min = resolve(rule.titleSize) - 0.1;
        for (const region of nodes) {
          const titles = [...region.querySelectorAll('h1, h2, h3, h4, h5, h6, [role="heading"]')]
            .filter(el => visible(el) && parseFloat(getComputedStyle(el).fontSize) >= min && !(rule.exclude ?? []).some(e => el.closest(css(e.selector))));
          samples.push({ rule: rule.id, selector: selectorOf(region), property: 'title-size headings', actual: titles.length, expected: rule.expected ?? 1 });
          if (!matches(titles.length, rule.expected ?? 1, 0)) add(rule, titles[1] ?? region, 'title-size headings', rule.expected ?? 1, `${titles.length}: ${titles.map(t => `${(t.textContent ?? '').trim().slice(0, 40)} (${getComputedStyle(t).fontSize})`).join(' | ')}`);
        }
      }
      else if (rule.kind === 'contained') {
        // A visible control must be wholly visible: inside the viewport, inside
        // its region (the content column, a rail), and not cut by any clipping
        // or scrolling ancestor. The exception is explicit: an ancestor matching
        // `scrollers` (a tab row, a table's scroller) may scroll the control
        // out of view, and that scroller is judged in its place.
        const tol = rule.tolerance ?? tolerance;
        for (const reason of rule.scrollers ?? []) if (!reason.reason) throw new Error(`Scroller exception on ${rule.id} needs a reason`);
        const scroller = n => (rule.scrollers ?? []).some(x => n.matches(css(x.selector)));
        for (const el of nodes) {
          let subject = el, clipped = false;
          const region = rule.region ? el.parentElement?.closest(css(rule.region)) : null;
          for (let n = el.parentElement; n && n !== document.body && n !== region; n = n.parentElement) {
            const ox = getComputedStyle(n).overflowX;
            if (ox === 'visible') continue;
            if (scroller(n)) { subject = n; continue; }
            const c = n.getBoundingClientRect(), b = subject.getBoundingClientRect();
            // Wholly outside the clip box is hidden (a collapsed panel's contents), not clipped.
            if (b.left >= c.right - tol || b.right <= c.left + tol) { clipped = true; break; }
            if (b.right > c.right + tol || b.left < c.left - tol) {
              add(rule, el, subject === el ? 'clipped by an ancestor' : 'scroller clipped by an ancestor', [Math.round(c.left), Math.round(c.right)], [Math.round(b.left), Math.round(b.right)]);
              clipped = true; break;
            }
          }
          if (clipped) continue;
          const b = subject.getBoundingClientRect();
          const bounds = { left: 0, right: innerWidth };
          if (region) { const r = region.getBoundingClientRect(); bounds.left = Math.max(bounds.left, r.left); bounds.right = Math.min(bounds.right, r.right); }
          samples.push({ rule: rule.id, selector: selectorOf(el), property: 'x containment', actual: [Math.round(b.left), Math.round(b.right)], expected: [Math.round(bounds.left), Math.round(bounds.right)] });
          if (b.right > bounds.right + tol || b.left < bounds.left - tol) add(rule, el, subject === el ? 'x containment' : 'x containment (its scroller)', [Math.round(bounds.left), Math.round(bounds.right)], [Math.round(b.left), Math.round(b.right)]);
        }
      }
      else if (rule.kind === 'sparse-row') {
        // A row of like tiles (people, avatars) packed by what they draw: on a
        // wide column a stretched grid sets each tile's ink far from the next.
        const factor = rule.maxGapRatio ?? 3, minItems = rule.minItems ?? 3;
        for (const list of nodes) {
          const items = [...list.children].filter(visible).map(item => {
            const ink = inkRects(item);
            if (!ink.length) return null;
            return { item, left: Math.min(...ink.map(r => r.left)), right: Math.max(...ink.map(r => r.right)), top: item.getBoundingClientRect().top };
          }).filter(Boolean);
          const rows = new Map();
          for (const it of items) { const key = [...rows.keys()].find(t => Math.abs(t - it.top) <= 2) ?? it.top; rows.set(key, [...(rows.get(key) ?? []), it]); }
          for (const row of rows.values()) {
            if (row.length < minItems) continue;
            row.sort((a, b) => a.left - b.left);
            const widths = row.map(r => r.right - r.left).sort((a, b) => a - b), median = widths[Math.floor(widths.length / 2)];
            const gap = Math.max(...row.slice(1).map((r, i) => r.left - row[i].right));
            samples.push({ rule: rule.id, selector: selectorOf(list), property: 'tile gap / tile width', actual: Math.round((gap / median) * 100) / 100, expected: { max: factor } });
            if (gap > factor * median + tolerance) add(rule, list, 'tile gap', `<= ${factor}x the ${Math.round(median)}px tile ink`, `${Math.round(gap)}px`);
          }
        }
      }
      else if (rule.kind === 'columns') {
        const groups = rule.children ? nodes.map(parent => [...parent.querySelectorAll(rule.children)].filter(visible).map(el => ({ name: selectorOf(el), el, box: rect(el) })))
          : [rule.regions.flatMap(name => query(name).map(el => ({ name, el, box: rect(el) })))];
        let measured = 0;
        for (const group of groups) {
          const columns = group.sort((a, b) => a.box.left - b.box.left); measured += columns.length;
          if (columns.length < rule.min || columns.length > rule.max) add(rule, null, 'column count', { min: rule.min, max: rule.max }, columns.length);
          for (let i = 1; i < columns.length; i++) {
            const prev = columns[i - 1], curr = columns[i];
            check(rule, curr.el, 'column gap', curr.box.left - prev.box.right, { min: 0, max: rule.maxGap ?? 1 });
            check(rule, curr.el, 'column top alignment', curr.box.top - prev.box.top, 0);
            check(rule, curr.el, 'column bottom alignment', curr.box.bottom - prev.box.bottom, 0);
          }
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'dock-clearance') {
        // A pinned composer dock (and the prompt deck inside it) takes layout
        // space: the content column scrolls ABOVE it. Nothing outside the dock
        // may paint inside its box — judged on each element's VISIBLE rect
        // (cut by every clipping/scrolling ancestor), so content that scrolls
        // under a scroller ending at the dock's top is fine, and content drawn
        // over or under the dock is not. Only elements that paint something of
        // their own (text, a control, an image) are judged.
        const tol = rule.tolerance ?? tolerance;
        const ignore = rule.ignore ? css(rule.ignore) : null;
        const paints = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) || el.matches('button, a[href], input, select, textarea, img, svg, video, canvas, [role="button"]');
        // Pinned means it holds its place while the content scrolls: the dock
        // (or an ancestor) is sticky/fixed, or no ancestor scroll container
        // actually scrolls it. A dock laid out as the last row INSIDE a
        // scrolling column (an embedded collection command host) scrolls with
        // that column; it is not a dock, and the shell chrome under that
        // column's bottom edge is not "inside" it.
        const inScrollFlow = dock => {
          for (let n = dock; n && n !== document.documentElement; n = n.parentElement) {
            const cs = getComputedStyle(n);
            if (cs.position === 'fixed' || cs.position === 'sticky') return false;
            if (n !== dock && /^(auto|scroll)$/.test(cs.overflowY) && n.scrollHeight > n.clientHeight + 1) return true;
          }
          return false;
        };
        for (const dock of nodes) {
          if (inScrollFlow(dock)) { samples.push({ rule: rule.id, selector: selectorOf(dock), property: 'dock placement', actual: 'scrolls with its column (not pinned)', expected: 'judged only when pinned' }); continue; }
          const d = dock.getBoundingClientRect();
          let found = 0;
          for (const el of document.body.querySelectorAll('*')) {
            if (found >= (rule.maxPerDock ?? 3)) break;
            if (dock.contains(el) || el.contains(dock)) continue;
            const b = el.getBoundingClientRect();
            // Cheap first: only an element whose own box reaches the dock can paint in it.
            if (!(b.bottom > d.top + tol && b.top < d.bottom - tol && b.right > d.left + tol && b.left < d.right - tol)) continue;
            if (!paints(el) || !visible(el) || (ignore && el.closest(ignore))) continue;
            let top = b.top, bottom = b.bottom, left = b.left, right = b.right;
            for (let n = el.parentElement; n && n !== document.documentElement; n = n.parentElement) {
              const cs = getComputedStyle(n);
              if (cs.position === 'fixed') break;
              if (cs.overflowX === 'visible' && cs.overflowY === 'visible') continue;
              const c = n.getBoundingClientRect();
              top = Math.max(top, c.top); bottom = Math.min(bottom, c.bottom); left = Math.max(left, c.left); right = Math.min(right, c.right);
            }
            if (bottom - top <= tol || right - left <= tol) continue;
            if (bottom > d.top + tol && top < d.bottom - tol && right > d.left + tol && left < d.right - tol) {
              add(rule, el, 'visible bottom vs docked composer top', `<= ${Math.round(d.top)} (nothing paints inside the dock)`, Math.round(bottom));
              found++;
            }
          }
          samples.push({ rule: rule.id, selector: selectorOf(dock), property: 'elements painting inside the dock', actual: found, expected: 0 });
        }
      }
      else if (rule.kind === 'table') for (const table of nodes) {
        const rows = [...table.querySelectorAll('tbody > tr')].filter(visible).filter(row => !row.querySelector('[colspan]'));
        for (const row of rows) check(rule, row, 'row height', rect(row).height, rule.rowHeight);
        for (const th of [...table.querySelectorAll('thead th')].filter(visible)) {
          check(rule, th, 'header fontSize', getComputedStyle(th).fontSize, rule.headerFontSize);
          check(rule, th, 'header fontWeight', getComputedStyle(th).fontWeight, rule.headerFontWeight);
        }
        for (const cell of [...table.querySelectorAll('tbody td:not([colspan])')].filter(visible)) {
          if (rule.bodyFontSize != null) check(rule, cell, 'cell fontSize', getComputedStyle(cell).fontSize, rule.bodyFontSize);
          if (rule.bodyFontFamily != null) check(rule, cell, 'cell fontFamily', getComputedStyle(cell).fontFamily, rule.bodyFontFamily);
          check(rule, cell, 'cell paddingLeft', getComputedStyle(cell).paddingLeft, rule.cellInset);
          check(rule, cell, 'cell paddingRight', getComputedStyle(cell).paddingRight, rule.cellInset);
        }
        coverage.at(-1).rows = (coverage.at(-1).rows ?? 0) + rows.length;
      }
      else if (rule.kind === 'composer') for (const el of nodes) {
        const inputs = [...el.querySelectorAll(rule.input)].filter(visible);
        check(rule, el, 'input count', inputs.length, 1);
        for (const side of ['paddingLeft', 'paddingRight']) check(rule, el, side, getComputedStyle(el)[side], rule.inset);
        const background = getComputedStyle(el, rule.pseudo ?? '::before');
        if (background.content === 'none' || background.backgroundImage === 'none') add(rule, el, 'backdrop', 'painted pseudo-element', 'missing');
        for (const side of ['left', 'right', 'top', 'bottom']) if (parseFloat(background[side]) > tolerance) add(rule, el, 'backdrop ' + side, '<= 0', background[side]);
        const anchor = el.parentElement?.closest(css(rule.boundary));
        if (!anchor) add(rule, el, 'composer boundary', css(rule.boundary), 'missing', 'coverage');
        else for (const edge of ['left', 'right']) check(rule, el, 'shelf ' + edge, rect(el)[edge] - rect(anchor)[edge], 0);
      }
      else if (rule.kind === 'popover-fit') for (const el of nodes) {
        // An open anchored panel must fit the viewport, must not cover the
        // control that opened it, and — when it has a header (title, tabs,
        // "Mark all read") — must scroll a region inside itself rather than
        // scrolling as a whole, which carries the header away with the feed.
        const b = rect(el), margin = rule.margin ?? 0;
        samples.push({ rule: rule.id, selector: selectorOf(el), property: 'viewport fit', actual: [b.top, b.bottom], expected: [margin, innerHeight - margin] });
        if (b.top < margin - tolerance || b.bottom > innerHeight - margin + tolerance) add(rule, el, 'y containment', [margin, innerHeight - margin], [b.top, b.bottom]);
        if (b.left < margin - tolerance || b.right > innerWidth - margin + tolerance) add(rule, el, 'x containment', [margin, innerWidth - margin], [b.left, b.right]);
        const triggers = [...document.querySelectorAll(rule.trigger ?? '[aria-expanded="true"]')].filter(t => visible(t) && !el.contains(t));
        for (const trigger of triggers) {
          const t = rect(trigger);
          const overlap = Math.min(b.right, t.right) - Math.max(b.left, t.left) > tolerance && Math.min(b.bottom, t.bottom) - Math.max(b.top, t.top) > tolerance;
          samples.push({ rule: rule.id, selector: selectorOf(el), property: 'covers trigger', actual: overlap, expected: false });
          if (overlap) add(rule, el, 'covers trigger', 'opens beside its trigger, not over it', selectorOf(trigger));
        }
        const style = getComputedStyle(el);
        const scrollsWhole = /(auto|scroll)/.test(style.overflowY) && el.scrollHeight > el.clientHeight + tolerance;
        const header = rule.header ? [...el.querySelectorAll(css(rule.header))].find(visible) : null;
        samples.push({ rule: rule.id, selector: selectorOf(el), property: 'scroll region', actual: scrollsWhole && header ? 'whole panel' : 'inner', expected: 'inner' });
        if (scrollsWhole && header) add(rule, el, 'scroll region', 'a scrolling region inside the panel; the header stays in view', `the whole panel scrolls (${el.scrollHeight}px in ${el.clientHeight}px), carrying ${selectorOf(header)}`);
      }
      else if (rule.kind === 'panel-inset') {
        // Inside an anchored panel (popover, dialog, drawer) every block shares
        // the header's inset: no ink starts left of the header's first ink or
        // ends right of the same inset from the panel's right edge. A
        // start-aligned empty state flush on the panel's edge under an inset
        // title and tab row is the reported shape. Judged on ink, clipped to
        // the panel's scrolling/clipping descendants, so a full-bleed row whose
        // text keeps the inset passes. A panel inside another is judged on its
        // own; a panel with no heading is unexercised.
        const tol = rule.tolerance ?? 2;
        let measured = 0;
        for (const panel of nodes) {
          const nested = n => n !== panel && n.closest(css(rule.selector)) !== panel;
          const heading = [...panel.querySelectorAll(css(rule.header ?? 'h1, h2, h3, [role="heading"]'))].find(h => visible(h) && !nested(h));
          if (!heading) continue;
          const headInk = inkRects(heading);
          if (!headInk.length) continue;
          const p = panel.getBoundingClientRect();
          const edge = Math.min(...headInk.map(r => r.left)), inset = edge - p.left;
          const skip = el => nested(el) || (rule.exclude ?? []).some(e => el.closest(css(e.selector)));
          const ink = inkRects(panel, skip).map(r => clipToAncestors(r, panel)).filter(Boolean);
          measured++;
          const left = ink.reduce((a, r) => (!a || r.left < a.left ? r : a), null), right = ink.reduce((a, r) => (!a || r.right > a.right ? r : a), null);
          const dl = left ? Math.round((left.left - edge) * 100) / 100 : 0, dr = right ? Math.round((p.right - inset - right.right) * 100) / 100 : 0;
          samples.push({ rule: rule.id, selector: selectorOf(panel), property: 'panel inset', actual: { left: dl, right: dr, inset: Math.round(inset) }, expected: { min: 0 } });
          if (dl < -tol) add(rule, left.el, 'left inset (ink left of the panel header)', `>= ${Math.round(inset)}px from the panel edge (the header's inset)`, `${Math.round(left.left - p.left)}px`);
          if (dr < -tol) add(rule, right.el, 'right inset (ink past the header inset)', `<= panel right - ${Math.round(inset)}px`, `${Math.round(p.right - right.right)}px from the panel's right edge`);
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'panel-empty') {
        // An anchored panel whose content is an empty state shrinks to that
        // content: its fixed height is a maximum, not a minimum. Judged on
        // the blank bands between what the panel draws (ink: text, icons,
        // images) — from its padded top to its padded bottom — so a pinned
        // footer link under a blank 300px area still fails.
        const maxGap = rule.maxGap ?? 96, tol = rule.tolerance ?? tolerance;
        let measured = 0;
        for (const panel of nodes) {
          const empty = [...panel.querySelectorAll(css(rule.empty))].filter(visible);
          if (!empty.length) continue;
          measured++;
          const p = panel.getBoundingClientRect(), s = getComputedStyle(panel);
          const top = p.top + parseFloat(s.borderTopWidth) + parseFloat(s.paddingTop), bottom = p.bottom - parseFloat(s.borderBottomWidth) - parseFloat(s.paddingBottom);
          const bands = inkRects(panel).map(r => [Math.max(top, r.top), Math.min(bottom, r.bottom)]).filter(([a, b]) => b - a > 1).sort((a, b) => a[0] - b[0]);
          let cursor = top, gap = 0, at = top;
          for (const [a, b] of bands) { if (a - cursor > gap) { gap = a - cursor; at = cursor; } cursor = Math.max(cursor, b); }
          if (bottom - cursor > gap) { gap = bottom - cursor; at = cursor; }
          gap = Math.round(gap * 100) / 100;
          samples.push({ rule: rule.id, selector: selectorOf(panel), property: 'largest blank band', actual: gap, expected: { max: maxGap } });
          if (gap > maxGap + tol) add(rule, panel, 'blank band in an empty panel', `<= ${maxGap}px (the panel shrinks to its empty state; its height cap is a maximum)`, `${Math.round(gap)}px blank from y=${Math.round(at)} in a ${Math.round(p.height)}px panel`);
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'composer-last') {
        // A page's composer is docked at the bottom of its column: nothing is
        // laid out below it in that column (the dock that holds it excepted —
        // a call strip under the composer belongs to the dock), and its band
        // (the surface's painted backdrop) spans the column edge to edge, never
        // a decorated strip with side margins inside a section. Content below
        // the composer counts whether or not it is scrolled into view.
        const tol = rule.tolerance ?? tolerance;
        let measured = 0;
        for (const composer of nodes) {
          const column = composer.parentElement?.closest(css(rule.column));
          if (!column) { add(rule, composer, 'composer column', css(rule.column), 'missing', 'coverage'); continue; }
          measured++;
          const c = composer.getBoundingClientRect(), col = column.getBoundingClientRect();
          const dock = rule.dock ? composer.closest(css(rule.dock)) : null;
          const ignore = rule.ignore ? css(rule.ignore) : null;
          const layer = el => { for (let n = el; n && n !== column; n = n.parentElement) if (getComputedStyle(n).position === 'fixed') return true; return false; };
          const skip = el => composer.contains(el) || (dock && column.contains(dock) && dock.contains(el)) || (ignore && el.closest(ignore)) || layer(el);
          const below = inkRects(column, skip).map(r => clipToAncestors(r, column)).filter(r => r && r.top >= c.bottom - tol && r.right > c.left + tol && r.left < c.right - tol).sort((a, b) => a.top - b.top);
          samples.push({ rule: rule.id, selector: selectorOf(composer), property: 'content below the composer', actual: below.length, expected: 0 });
          if (below.length) add(rule, below[0].el, 'content below the composer', `nothing in ${selectorOf(column)} below the composer (bottom ${Math.round(c.bottom)})`, `${below.length} piece(s) of ink, first "${snippet((below[0].el.textContent ?? '').trim()) || below[0].el.tagName.toLowerCase()}" at y=${Math.round(below[0].top)}`);
          const margins = { left: Math.round((c.left - col.left) * 100) / 100, right: Math.round((col.right - c.right) * 100) / 100 };
          samples.push({ rule: rule.id, selector: selectorOf(composer), property: 'band side margins', actual: margins, expected: 0 });
          for (const side of ['left', 'right']) if (Math.abs(margins[side]) > tol) add(rule, composer, `band ${side} margin`, `the composer band spans ${selectorOf(column)} (0px)`, `${margins[side]}px`);
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'surface-distinct') for (const el of nodes) {
        // A surface that is meant to read as its own region (a board lane)
        // paints a background the reader can tell apart from what it sits on.
        const painted = c => { const m = /rgba?\(([^)]+)\)/.exec(c); if (!m) return c !== 'transparent'; const parts = m[1].split(/[\s,/]+/).filter(Boolean); return parts.length < 4 || parseFloat(parts[3]) > 0; };
        const own = getComputedStyle(el).backgroundColor;
        let behind = null;
        for (let n = el.parentElement; n; n = n.parentElement) { const c = getComputedStyle(n).backgroundColor; if (painted(c)) { behind = c; break; } }
        behind ??= 'rgb(255, 255, 255)';
        samples.push({ rule: rule.id, selector: selectorOf(el), property: 'backgroundColor', actual: own, expected: `painted, not ${behind}` });
        if (!painted(own)) add(rule, el, 'backgroundColor', 'a painted surface distinct from its background', own);
        else if (own.replace(/\s/g, '') === behind.replace(/\s/g, '')) add(rule, el, 'backgroundColor', `distinct from the surface behind it (${behind})`, own);
      }
      else if (rule.kind === 'record-popout') {
        // Judged only after a row or record-detail action was activated (the
        // state's probe). Allowed kinds are named by semantic marker.
        const activation = probe?.kind === 'row-activation' ? probe : null;
        Object.assign(coverage.at(-1), { matched: activation ? 1 : 0, ...(activation ? { trigger: activation.trigger } : {}) });
        if (activation) {
          const allowed = el => (rule.allow ?? []).some(a => el.matches(css(a)));
          const popouts = nodes.filter(el => !allowed(el) && !nodes.some(other => other !== el && !allowed(other) && other.contains(el)));
          samples.push({ rule: rule.id, selector: 'probe', property: `popouts after ${activation.trigger}`, actual: popouts.length, expected: 0 });
          for (const el of popouts) add(rule, el, 'record surface', 'the record routed into the content column or split layout (no drawer/modal)', `${el.getAttribute('data-ui-dialog') ?? el.getAttribute('role') ?? el.tagName.toLowerCase()} opened by ${activation.trigger}${activation.label ? ` "${activation.label}"` : ''}`);
          if (activation.trigger === 'row') {
            const before = urlKey(activation.beforeUrl), after = urlKey(activation.afterUrl);
            samples.push({ rule: rule.id, selector: 'probe', property: 'url changed by row activation', actual: before !== after, expected: true });
            if (before === after) add(rule, null, 'url after row activation', `a record URL other than ${before}`, after);
          }
          if (activation.blockedWrites?.length) add(rule, null, 'writes during activation', 'none (activation is navigation)', activation.blockedWrites.join(', '));
        }
      }
      else if (rule.kind === 'row-activatable') {
        let rows = 0;
        for (const table of nodes) {
          const host = table.closest('[data-collection-rows]');
          if (host?.getAttribute('data-collection-rows') === 'static') {
            const reason = (host.getAttribute('data-collection-rows-reason') ?? '').trim();
            samples.push({ rule: rule.id, selector: selectorOf(table), property: 'static rows reason', actual: reason, expected: 'documented reason' });
            if (!reason || PLACEHOLDER_REASON.test(reason)) add(rule, table, 'static rows reason', 'documented reason, not blank or a placeholder', reason, 'coverage');
            continue;
          }
          const body = [...table.querySelectorAll(':scope > tbody > tr')].filter(visible).filter(row => !row.querySelector('[colspan]'));
          rows += body.length;
          const activatable = row => {
            const focusable = row.tabIndex >= 0 || ['link', 'button'].includes(row.getAttribute('role'));
            return (focusable && getComputedStyle(row).cursor === 'pointer') || !!row.querySelector('td a[href]');
          };
          const inert = body.filter(row => !activatable(row));
          samples.push({ rule: rule.id, selector: selectorOf(table), property: 'activatable rows', actual: body.length - inert.length, expected: body.length });
          if (inert.length) add(rule, inert[0], 'row activation', 'focusable pointer row with a click target or a row link, or data-collection-rows="static" with a reason', `${inert.length} of ${body.length} rows inert`);
        }
        coverage.at(-1).rows = rows;
      }
      else if (rule.kind === 'selection-shift') {
        const selection = probe?.kind === 'selection' ? probe : null;
        coverage.at(-1).matched = selection ? 1 : 0;
        if (selection) {
          if (!selection.toggled) add(rule, null, 'selection toggle', 'checked then unchecked', JSON.stringify([selection.before.checked, selection.during.checked, selection.after.checked]), 'coverage');
          if (selection.blockedWrites?.length) add(rule, null, 'writes during selection', 'none (selection is local state)', selection.blockedWrites.join(', '));
          for (const phase of ['during', 'after']) for (const edge of ['tableTop', 'rowTop', 'rowBottom', 'rowLeft']) {
            const delta = Math.round((selection[phase][edge] - selection.before[edge]) * 100) / 100;
            samples.push({ rule: rule.id, selector: 'probe', property: `${edge} ${phase} selection`, actual: delta, expected: 0 });
            if (Math.abs(delta) > (rule.tolerance ?? tolerance)) add(rule, null, `${edge} ${phase} selection`, 0, delta);
          }
        }
      }
      else if (rule.kind === 'text-cramped') {
        // A block of wrapped text squeezed into a column too narrow to read:
        // more than `maxLines` lines while a line holds fewer than `minChars`
        // characters at the block's own font (measured, not assumed). A
        // truncated cell, a chip or a single-word label is one line and never
        // qualifies; lines forced by <br> or separate items (a short address)
        // do not either — the text must be long enough to fill the lines by
        // wrapping (`length / chars-per-line > maxLines`).
        const maxLines = rule.maxLines ?? 4, minChars = rule.minChars ?? 20;
        const blocks = new Map();
        for (const scope of nodes) for (const run of textRuns(scope)) {
          if ((rule.exclude ?? []).some(e => run.el.closest(css(e.selector)))) continue;
          let block = run.el;
          while (block.parentElement && /^(inline|contents)$/.test(cs(block).display)) block = block.parentElement;
          if (/^(pre|pre-wrap)$/.test(cs(block).whiteSpace) || block.closest('pre, code, [contenteditable="true"]') || cs(block).writingMode !== 'horizontal-tb') continue;
          const entry = blocks.get(block) ?? { text: '', tops: [] };
          entry.text += (entry.text ? ' ' : '') + run.text;
          for (const r of run.rects) entry.tops.push({ top: r.top, fs: run.fs });
          blocks.set(block, entry);
        }
        let measured = 0;
        for (const [block, { text, tops }] of blocks) {
          tops.sort((a, b) => a.top - b.top);
          let lines = 0, last = -Infinity;
          for (const t of tops) if (t.top > last + t.fs * 0.5) { lines++; last = t.top; }
          if (lines <= maxLines) continue;
          measured++;
          const s = cs(block), width = block.clientWidth - parseFloat(s.paddingLeft) - parseFloat(s.paddingRight);
          const avg = textWidth(text, fontOf(s)) / Math.max(1, text.length);
          const perLine = width / Math.max(avg, 0.1);
          samples.push({ rule: rule.id, selector: selectorOf(block), property: 'characters per line', actual: Math.round(perLine), expected: { min: minChars } });
          if (perLine < minChars && text.length / perLine > maxLines) add(rule, block, 'characters per line', `>= ${minChars} when the text wraps past ${maxLines} lines`, `${Math.round(perLine)} chars (${Math.round(width)}px, ${Math.round(width / parseFloat(s.fontSize) * 10) / 10}em) over ${lines} lines: "${snippet(text)}"`);
        }
        coverage.at(-1).matched = measured;
        coverage.at(-1).textNodes = blocks.size;
      }
      else if (rule.kind === 'text-overlap') {
        // Two runs of text drawn on top of each other in the same stacking
        // context: a label that overflows into its neighbour, an absolutely
        // placed caption over a value. Judged on each line's em box cut to its
        // clipping/scrolling ancestors; a pair inside a declared layer
        // (data-ui-layered="<reason>") is exempt, and a blank or placeholder
        // reason fails coverage.
        const tol = rule.tolerance ?? 2, cap = rule.maxPerPage ?? 10;
        const boxes = [];
        for (const scope of nodes) for (const run of textRuns(scope)) {
          if ((rule.exclude ?? []).some(e => run.el.closest(css(e.selector)))) continue;
          const layer = layered(run.el);
          if (layer) {
            const reason = (layer.getAttribute('data-ui-layered') ?? '').trim();
            if (!reason || PLACEHOLDER_REASON.test(reason)) add(rule, layer, 'layered reason', 'data-ui-layered names why text is layered over text', reason, 'coverage');
            continue;
          }
          for (const r of run.rects) { const v = clipped(r, run.el); if (v) boxes.push({ ...v, run, root: stackRoot(run.el) }); }
        }
        boxes.sort((a, b) => a.left - b.left);
        let found = 0;
        for (let i = 0; i < boxes.length && found < cap; i++) {
          const a = boxes[i];
          for (let j = i + 1; j < boxes.length && boxes[j].left < a.right - tol && found < cap; j++) {
            const b = boxes[j];
            if (a.run === b.run || a.root !== b.root) continue;
            const x = Math.min(a.right, b.right) - Math.max(a.left, b.left), y = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
            if (x > tol && y > tol) {
              add(rule, a.run.el, 'text overlaps text', `no overlap (> ${tol}px) with neighbouring text in the same layer`, `"${snippet(a.run.text)}" × "${snippet(b.run.text)}" (${Math.round(x)}×${Math.round(y)}px; other: ${selectorOf(b.run.el)})`);
              found++;
            }
          }
        }
        samples.push({ rule: rule.id, selector: 'document', property: 'overlapping text pairs', actual: found, expected: 0 });
        coverage.at(-1).matched = boxes.length;
      }
      else if (rule.kind === 'text-clipped') {
        // Text cut by an overflow:hidden/clip ancestor — a label sliced
        // mid-glyph at a container edge. Allowed only as a declared
        // truncation: an ellipsis (text-overflow: ellipsis, or a line clamp
        // for a vertical cut) on the element doing the cutting or between it
        // and the text. Whether the full text is reachable (a `title`, an
        // aria-label carrying it) is recorded on the sample; `requireFullText`
        // makes it a violation too. Text wholly outside the clip box is
        // hidden, not clipped; a scroll container's edge is not a cut (the
        // reader can scroll), nor is a declared pannable viewport's
        // (`scrollers`, each with a reason — a node canvas pans).
        const tol = rule.tolerance ?? 1;
        for (const x of rule.scrollers ?? []) if (!x.reason) throw new Error(`Scroller exception on ${rule.id} needs a reason`);
        const pannable = n => (rule.scrollers ?? []).some(x => n.matches(css(x.selector)));
        const reported = new Set();
        let measured = 0;
        for (const scope of nodes) for (const run of textRuns(scope)) {
          if (reported.has(run.el) || (rule.exclude ?? []).some(e => run.el.closest(css(e.selector)))) continue;
          const chain = clippers(run.el).map(c => pannable(c.n) ? { ...c, xHard: false, yHard: false } : c);
          if (!chain.some(c => c.xHard || c.yHard)) continue;
          measured++;
          let cut = null;
          for (const r of run.rects) {
            let { left, right, top, bottom } = r, hidden = false;
            for (const c of chain) {
              const b = innerBox(c.n);
              const nl = c.x ? Math.max(left, b.left) : left, nr = c.x ? Math.min(right, b.right) : right;
              const nt = c.y ? Math.max(top, b.top) : top, nb = c.y ? Math.min(bottom, b.bottom) : bottom;
              if (nr - nl <= 1 || nb - nt <= 1) { hidden = true; break; }
              const axis = (nl - left > tol || right - nr > tol) ? 'x' : (nt - top > tol || bottom - nb > tol) ? 'y' : null;
              if (axis && (axis === 'x' ? c.xHard : c.yHard)) { cut = { c, axis, lost: axis === 'x' ? (nl - left) + (right - nr) : (nt - top) + (bottom - nb) }; break; }
              left = nl; right = nr; top = nt; bottom = nb;
            }
            if (hidden || cut) break;
          }
          if (!cut) continue;
          const between = [];
          for (let n = run.el; n; n = n.parentElement) { between.push(n); if (n === cut.c.n) break; }
          const ellipsis = between.some(n => cut.axis === 'x' ? cs(n).textOverflow === 'ellipsis' : (cs(n).webkitLineClamp && cs(n).webkitLineClamp !== 'none'));
          const probe = run.text.slice(0, 24).toLowerCase();
          let reachable = false;
          for (let n = run.el, k = 0; n && k < between.length + 3; n = n.parentElement, k++) {
            if ((n.getAttribute('title') ?? '').trim()) { reachable = true; break; }
            const label = (n.getAttribute('aria-label') ?? '').toLowerCase();
            if (label && label.includes(probe)) { reachable = true; break; }
          }
          samples.push({ rule: rule.id, selector: selectorOf(run.el), property: 'clipped text', actual: { ellipsis, reachable, axis: cut.axis }, expected: 'ellipsis + full text' });
          if (!ellipsis || (rule.requireFullText && !reachable)) {
            reported.add(run.el);
            add(rule, run.el, `text clipped (${cut.axis})`, 'fits its box, or an ellipsis with the full text in a title / aria-label', `${Math.round(cut.lost)}px of "${snippet(run.text)}" cut by ${selectorOf(cut.c.n)}${ellipsis ? ' (ellipsis, no full text)' : ' (no ellipsis)'}`);
          }
        }
        coverage.at(-1).matched = measured;
      }
      else if (rule.kind === 'placeholder-squeezed') for (const el of nodes) {
        // An input sharing its row with chips/buttons must keep room to be
        // read: at least `minEm` of its own font wide, and its placeholder
        // must not lose more than `maxHidden` (default half) of its width
        // while the row's other items are wider than the input itself — the
        // chips taking the space the words need.
        const editable = el.isContentEditable;
        const holder = editable ? el.querySelector('[data-placeholder]') : el;
        const placeholder = editable ? (holder?.getAttribute('data-placeholder') ?? el.getAttribute('aria-placeholder') ?? '') : (el.getAttribute('placeholder') ?? '');
        const empty = editable ? !el.textContent.trim() : !el.value;
        if (!placeholder.trim() || !empty) continue;
        const s = cs(el), fs = parseFloat(s.fontSize) || 14, own = el.getBoundingClientRect();
        // The row: the nearest flex/grid ancestor (display:contents wrappers
        // flattened) holding other painted items on the input's line.
        let siblings = null, row = null;
        for (let child = el, n = el.parentElement, k = 0; n && k < 8; child = n, n = n.parentElement, k++) {
          const d = cs(n).display;
          if (d === 'contents') continue;
          if (!/flex|grid/.test(d) || (/flex/.test(d) && /column/.test(cs(n).flexDirection))) continue;
          const flat = node => [...node.children].flatMap(c => cs(c).display === 'contents' ? flat(c) : [c]);
          const items = flat(n).filter(c => c !== child && !c.contains(el) && visible(c)).filter(c => { const b = c.getBoundingClientRect(); return b.width > 1 && Math.min(b.bottom, own.bottom) - Math.max(b.top, own.top) > 4; });
          if (items.length) { siblings = items; row = n; break; }
        }
        if (!siblings) continue;
        const sibWidth = siblings.reduce((sum, c) => sum + c.getBoundingClientRect().width, 0);
        const box = holder && holder !== el ? holder : el, bs = cs(box);
        const avail = box.clientWidth - parseFloat(bs.paddingLeft) - parseFloat(bs.paddingRight);
        const phFont = fontOf(getComputedStyle(holder ?? el, editable ? '::before' : '::placeholder'));
        const need = textWidth(placeholder, phFont);
        const truncated = need > avail + tolerance && avail < need * (1 - (rule.maxHidden ?? 0.5));
        samples.push({ rule: rule.id, selector: selectorOf(el), property: 'input width (em)', actual: Math.round(own.width / fs * 10) / 10, expected: { min: rule.minEm ?? 10 } });
        if (own.width < (rule.minEm ?? 10) * fs - tolerance) add(rule, el, 'input width', `>= ${rule.minEm ?? 10}em (${Math.round((rule.minEm ?? 10) * fs)}px) beside ${siblings.length} row item(s)`, `${Math.round(own.width)}px; the row's other items take ${Math.round(sibWidth)}px (${selectorOf(row)})`);
        else if (truncated && sibWidth > own.width) add(rule, el, 'placeholder truncated', `at most ${Math.round((rule.maxHidden ?? 0.5) * 100)}% of the placeholder hidden, or the input wider than what shares its row`, `"${snippet(placeholder)}" needs ${Math.round(need)}px, has ${Math.round(avail)}px; row items take ${Math.round(sibWidth)}px`);
      }
    } catch (error) { add(rule, null, 'rule evaluation', 'valid selector/token/config', String(error.message), 'coverage'); }
  }
  return { issues, coverage, samples, viewport: { width: innerWidth, height: innerHeight }, measuredElements: new Set(samples.map(s => s.selector)).size };
}
