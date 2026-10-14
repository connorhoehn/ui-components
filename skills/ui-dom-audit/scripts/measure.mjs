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
    } catch (error) { add(rule, null, 'rule evaluation', 'valid selector/token/config', String(error.message), 'coverage'); }
  }
  return { issues, coverage, samples, viewport: { width: innerWidth, height: innerHeight }, measuredElements: new Set(samples.map(s => s.selector)).size };
}
