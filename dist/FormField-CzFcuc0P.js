import { t as e } from "./cn-DhjIN-s0.js";
import { useId as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/FormField.tsx
function i({ label: i, hint: a, error: o, required: s = !1, layout: c = "stacked", children: l, className: u, labelClassName: d, style: f, "data-testid": p }) {
	let m = t(), h = `${m}-label`, g = a || o ? `${m}-desc` : void 0, _ = {
		id: m,
		labelId: h,
		"aria-describedby": g,
		"aria-invalid": o ? !0 : void 0,
		"aria-required": s || void 0
	};
	return /* @__PURE__ */ r("div", {
		"data-testid": p,
		className: e(c === "inline" ? "flex items-center gap-3" : "flex flex-col gap-1", u),
		style: f,
		children: [/* @__PURE__ */ r("label", {
			id: h,
			htmlFor: m,
			className: e("text-[12px] font-medium", c === "inline" ? "min-w-[140px]" : "", o ? "text-danger-fg" : "text-text-primary", d),
			children: [i, s && /* @__PURE__ */ n("span", {
				"aria-hidden": "true",
				className: "ml-0.5 text-danger-fg",
				children: "*"
			})]
		}), /* @__PURE__ */ r("div", {
			className: e(c === "inline" ? "flex-1" : ""),
			children: [l(_), (a || o) && /* @__PURE__ */ n("div", {
				id: g,
				className: e("mt-1 text-[11px]", o ? "text-danger-fg" : "text-neutral"),
				children: o ?? a
			})]
		})]
	});
}
//#endregion
export { i as t };
