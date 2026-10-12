/** Serializable browser-side collector. No React, application imports or network. */
export function measureDOM({ contract, selectors, required = [], composerExpectation }) {
  const issues = [], coverage = [], samples = [];
  const selectorCache = new WeakMap();
  const tolerance = contract.tolerance ?? 1;
  const visible = el => { const b = el.getBoundingClientRect(), s = getComputedStyle(el); return b.width > 0 && b.height > 0 && s.display !== 'none' && s.visibility !== 'hidden' && s.clip.replace(/\s/g, '') !== 'rect(0px,0px,0px,0px)' && s.clipPath !== 'inset(50%)'; };
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
  const query = name => {
    const s = css(name);
    if (!s) throw new Error(`Unbound selector ${name}`);
    return [...document.querySelectorAll(s)].filter(visible);
  };
  const rect = el => { const b = el.getBoundingClientRect(); return Object.fromEntries(['x', 'y', 'left', 'right', 'top', 'bottom', 'width', 'height'].map(k => [k, Math.round(b[k] * 100) / 100])); };
  const add = (rule, el, property, expected, actual, category = 'violation') => issues.push({ rule: rule.id, category, owner: rule.owner ?? 'shared UI contract', selector: el ? selectorOf(el) : css(rule.selector) ?? 'document', property, expected, actual, ...(el ? { bounds: rect(el) } : {}) });
  const resolve = expected => {
    if (!expected || typeof expected !== 'object') return expected;
    if (expected.token) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(expected.token).trim();
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
    const wanted = resolve(expected);
    samples.push({ rule: rule.id, selector: selectorOf(el), property, actual, expected: wanted });
    if (!matches(actual, wanted, rule.tolerance ?? tolerance)) add(rule, el, property, wanted, actual);
  };
  for (const name of required) if (query(name).length === 0) add({ id: 'coverage.required', selector: name }, null, 'rendered count', '>= 1', 0, 'coverage');
  for (const rule of contract.rules) {
    try {
      let nodes = rule.selector ? query(rule.selector) : [];
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
        else if (mode === 'exempt' && (!reason || /^(?:todo|tbd|n\/?a|none|null|undefined|exempt|not applicable|coming soon|[-?.…]+)[.!?]*$/i.test(reason))) {
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
    } catch (error) { add(rule, null, 'rule evaluation', 'valid selector/token/config', String(error.message), 'coverage'); }
  }
  return { issues, coverage, samples, viewport: { width: innerWidth, height: innerHeight }, measuredElements: new Set(samples.map(s => s.selector)).size };
}
