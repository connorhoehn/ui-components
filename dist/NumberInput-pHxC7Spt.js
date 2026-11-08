import { t as e } from "./Input-DiOEvL5h.js";
import { forwardRef as t, useCallback as n } from "react";
import { jsx as r } from "react/jsx-runtime";
//#region src/components/forms/NumberInput.tsx
var i = t(function({ value: t, onChange: i, onClear: a, min: o, max: s, step: c, unit: l, placeholder: u, invalid: d = !1, disabled: f = !1, size: p = "md", id: m, name: h, required: g, "aria-label": _, "aria-labelledby": v, "aria-describedby": y, "aria-invalid": b, "aria-required": x, "data-testid": S }, C) {
	let w = n((e) => {
		let t = e;
		return o !== void 0 && t < o && (t = o), s !== void 0 && t > s && (t = s), t;
	}, [o, s]), T = n((e) => {
		let t = e.target.value;
		if (t === "" && a) {
			a();
			return;
		}
		let n = parseFloat(t);
		Number.isNaN(n) || i(n);
	}, [i, a]), E = n((e) => {
		let t = parseFloat(e.target.value);
		if (!Number.isNaN(t)) {
			let e = w(t);
			e !== t && i(e);
		}
	}, [w, i]);
	return /* @__PURE__ */ r(e, {
		ref: C,
		type: "number",
		size: p,
		value: t ?? "",
		min: o,
		max: s,
		step: c,
		placeholder: u,
		invalid: d,
		disabled: f,
		suffix: l ? /* @__PURE__ */ r("span", {
			className: "text-text-tertiary font-sans text-[12px] select-none",
			children: l
		}) : void 0,
		id: m,
		name: h,
		required: g,
		"aria-label": _,
		"aria-labelledby": v,
		"aria-describedby": y,
		"aria-invalid": b,
		"aria-required": x,
		"data-testid": S,
		"data-ui-control": "number",
		onChange: T,
		onBlur: E
	});
});
//#endregion
export { i as t };
