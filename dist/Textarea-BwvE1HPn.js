import { t as e } from "./cn-D4QmbyEy.js";
import { forwardRef as t, useCallback as n, useEffect as r, useRef as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/forms/Textarea.tsx
var o = t(function({ rows: t, minRows: o = 2, maxRows: s, autoResize: c = !1, invalid: l = !1, disabled: u = !1, onChange: d, value: f, className: p, "data-testid": m, "aria-invalid": h, ...g }, _) {
	let v = h ?? (l || void 0), y = i(null), b = n((e) => {
		y.current = e, typeof _ == "function" ? _(e) : _ && (_.current = e);
	}, [_]), x = n(() => {
		let e = y.current;
		if (!e || !c) return;
		e.style.height = "auto";
		let t = o * 20 + 12, n = e.scrollHeight, r = s ? s * 20 + 12 : Infinity;
		e.style.height = `${Math.min(Math.max(n, t), r)}px`, e.style.overflowY = n > r ? "auto" : "hidden";
	}, [
		c,
		o,
		s
	]);
	r(() => {
		x();
	}, [f, x]);
	let S = n((e) => {
		x(), d?.(e);
	}, [d, x]);
	return /* @__PURE__ */ a("textarea", {
		ref: b,
		rows: c ? void 0 : t ?? o,
		disabled: u,
		"data-testid": m,
		"aria-invalid": v,
		value: f,
		onChange: S,
		className: e("w-full rounded-md border bg-surface-panel font-inherit text-text-primary", "outline-none transition-colors duration-150 px-2.5 py-1.5 text-sm leading-5", "placeholder:text-text-tertiary", "focus:bg-surface focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", !c && "resize-y", c && "resize-none overflow-hidden", l ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", p),
		style: c ? { minHeight: `${o * 20 + 12}px` } : void 0,
		...g
	});
});
//#endregion
export { o as t };
