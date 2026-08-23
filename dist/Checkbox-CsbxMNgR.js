import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/forms/Checkbox.tsx
var a = t(function({ id: t, name: a, checked: o, onChange: s, indeterminate: c = !1, disabled: l = !1, "aria-label": u, onClick: d, onKeyDown: f, className: p, "data-testid": m }, h) {
	let g = r(null);
	return n(() => {
		g.current && (g.current.indeterminate = c);
	}, [c]), /* @__PURE__ */ i("input", {
		ref: (e) => {
			g.current = e, typeof h == "function" ? h(e) : h && (h.current = e);
		},
		type: "checkbox",
		id: t,
		name: a,
		checked: o,
		disabled: l,
		"aria-label": u,
		"aria-checked": c ? "mixed" : void 0,
		onChange: (e) => s(e.target.checked),
		onClick: d,
		onKeyDown: f,
		className: e("w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed", p),
		"data-testid": m
	});
});
//#endregion
export { a as t };
