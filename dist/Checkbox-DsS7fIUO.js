import { t as e } from "./cn-DhjIN-s0.js";
import { forwardRef as t, useEffect as n, useRef as r } from "react";
import { jsx as i } from "react/jsx-runtime";
//#region src/components/forms/Checkbox.tsx
var a = t(function({ id: t, name: a, checked: o, onChange: s, indeterminate: c = !1, disabled: l = !1, "aria-label": u, "aria-labelledby": d, "aria-describedby": f, onClick: p, onKeyDown: m, className: h, "data-testid": g }, _) {
	let v = r(null);
	return n(() => {
		v.current && (v.current.indeterminate = c);
	}, [c]), /* @__PURE__ */ i("input", {
		ref: (e) => {
			v.current = e, typeof _ == "function" ? _(e) : _ && (_.current = e);
		},
		type: "checkbox",
		id: t,
		name: a,
		checked: o,
		disabled: l,
		"aria-label": u,
		"aria-labelledby": d,
		"aria-describedby": f,
		"aria-checked": c ? "mixed" : void 0,
		onChange: (e) => s(e.target.checked),
		onClick: p,
		onKeyDown: m,
		className: e("w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed", h),
		"data-testid": g
	});
});
//#endregion
export { a as t };
