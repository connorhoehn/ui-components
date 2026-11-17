import { t as e } from "./cn-D4QmbyEy.js";
import { useId as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/FormField.tsx
function i({ label: i, hint: a, error: o, required: s = !1, layout: c = "stacked", children: l, className: u, labelClassName: d, style: f, hintTestId: p, "data-testid": m }) {
	let h = t(), g = `${h}-label`, _ = a || o ? `${h}-desc` : void 0, v = {
		id: h,
		"aria-describedby": _,
		"aria-invalid": o ? !0 : void 0,
		"aria-required": s || void 0
	};
	Object.defineProperty(v, "labelId", {
		value: g,
		enumerable: !1
	});
	let y = /* @__PURE__ */ r("label", {
		id: g,
		htmlFor: h,
		className: e("text-[12px] font-medium", o ? "text-danger-fg" : "text-text-primary", d),
		children: [i, s && /* @__PURE__ */ n("span", {
			"aria-hidden": "true",
			className: "ml-0.5 text-danger-fg",
			children: "*"
		})]
	}), b = a || o ? /* @__PURE__ */ n("div", {
		id: _,
		"data-testid": p,
		className: e("text-xs font-normal leading-4", o ? "text-danger-fg" : "text-neutral"),
		children: o ?? a
	}) : null;
	return c === "inline" ? /* @__PURE__ */ r("div", {
		"data-testid": m,
		className: e("flex items-center justify-between gap-4", u),
		style: f,
		children: [/* @__PURE__ */ r("span", {
			className: "flex min-w-0 flex-col gap-0.5",
			children: [y, b]
		}), /* @__PURE__ */ n("span", {
			className: "shrink-0",
			children: l(v)
		})]
	}) : /* @__PURE__ */ r("div", {
		"data-testid": m,
		className: e("flex flex-col gap-1", u),
		style: f,
		children: [y, /* @__PURE__ */ r("div", { children: [l(v), b && /* @__PURE__ */ n("div", {
			className: "mt-1",
			children: b
		})] })]
	});
}
//#endregion
export { i as t };
