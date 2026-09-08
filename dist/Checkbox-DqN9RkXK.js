import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/forms/Checkbox.tsx
var a = {
	shiftKey: !1,
	metaKey: !1,
	ctrlKey: !1,
	altKey: !1
}, o = t(function({ id: t, name: o, checked: s, onChange: c, indeterminate: l = !1, disabled: u = !1, "aria-label": d, "aria-labelledby": f, "aria-describedby": p, onClick: m, onKeyDown: h, className: g, "data-testid": _ }, v) {
	let y = r(a), b = r(null);
	return n(() => {
		b.current && (b.current.indeterminate = l);
	}, [l]), /* @__PURE__ */ i("input", {
		ref: (e) => {
			b.current = e, typeof v == "function" ? v(e) : v && (v.current = e);
		},
		type: "checkbox",
		id: t,
		name: o,
		checked: s,
		disabled: u,
		"aria-label": d,
		"aria-labelledby": f,
		"aria-describedby": p,
		"aria-checked": l ? "mixed" : void 0,
		onClick: (e) => {
			y.current = {
				shiftKey: e.shiftKey,
				metaKey: e.metaKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey
			}, m?.(e);
		},
		onKeyDown: (e) => {
			y.current = a, h?.(e);
		},
		onChange: (e) => c(e.target.checked, y.current),
		className: e("w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed", g),
		"data-testid": _
	});
});
//#endregion
export { o as t };
