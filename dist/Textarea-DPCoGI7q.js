import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t, useCallback as n, useEffect as r, useRef as i } from "react";
import { jsx as a } from "react/jsx-runtime";
//#region src/components/forms/Textarea.tsx
var o = t(function({ rows: t, minRows: o = 2, maxRows: s, autoResize: c = !1, invalid: l = !1, disabled: u = !1, onChange: d, value: f, className: p, "data-testid": m, ...h }, g) {
	let _ = i(null), v = n((e) => {
		_.current = e, typeof g == "function" ? g(e) : g && (g.current = e);
	}, [g]), y = n(() => {
		let e = _.current;
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
		y();
	}, [f, y]);
	let b = n((e) => {
		y(), d?.(e);
	}, [d, y]);
	return /* @__PURE__ */ a("textarea", {
		ref: v,
		rows: c ? void 0 : t ?? o,
		disabled: u,
		"data-testid": m,
		value: f,
		onChange: b,
		className: e("w-full rounded-md border bg-surface-panel font-inherit text-text-primary", "outline-none transition-colors duration-150 px-2.5 py-1.5 text-[13px] leading-5", "placeholder:text-text-tertiary", "focus:bg-white focus:border-info focus:ring-1 focus:ring-info/40", "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-surface-hover", !c && "resize-y", c && "resize-none overflow-hidden", l ? "border-danger focus:border-danger focus:ring-danger/40" : "border-border-emphasis", p),
		style: c ? { minHeight: `${o * 20 + 12}px` } : void 0,
		...h
	});
});
//#endregion
export { o as t };
