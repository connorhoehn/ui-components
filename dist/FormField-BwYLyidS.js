import { f as e } from "./Button-DwPf_9pb.js";
import { t } from "./formFieldContext-CWJ7aU7Y.js";
import { useId as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/FormField.tsx
function a({ label: a, hint: o, error: s, required: c = !1, layout: l = "stacked", children: u, className: d, labelClassName: f, style: p, hintTestId: m, "data-testid": h }) {
	let g = n(), _ = `${g}-label`, v = o || s ? `${g}-desc` : void 0, y = {
		id: g,
		"aria-describedby": v,
		"aria-invalid": s ? !0 : void 0,
		"aria-required": c || void 0
	};
	Object.defineProperty(y, "labelId", {
		value: _,
		enumerable: !1
	});
	let b = /* @__PURE__ */ i("label", {
		id: _,
		htmlFor: g,
		className: e("text-[12px] font-medium", s ? "text-danger-fg" : "text-text-primary", f),
		children: [a, c && /* @__PURE__ */ r("span", {
			"aria-hidden": "true",
			className: "ml-0.5 text-danger-fg",
			children: "*"
		})]
	}), x = o || s ? /* @__PURE__ */ r("div", {
		id: v,
		"data-testid": m,
		className: e("text-xs font-normal leading-4", s ? "text-danger-fg" : "text-neutral"),
		children: s ?? o
	}) : null;
	return l === "inline-start" ? /* @__PURE__ */ i("div", {
		"data-testid": h,
		"data-layout": "inline-start",
		className: e("flex items-start gap-2", d),
		style: p,
		children: [/* @__PURE__ */ r("span", {
			className: "flex shrink-0 pt-px",
			children: /* @__PURE__ */ r(t.Provider, {
				value: _,
				children: u(y)
			})
		}), /* @__PURE__ */ i("span", {
			className: "flex min-w-0 flex-col gap-0.5",
			children: [b, x]
		})]
	}) : l === "inline" ? /* @__PURE__ */ i("div", {
		"data-testid": h,
		className: e("flex items-center justify-between gap-4", d),
		style: p,
		children: [/* @__PURE__ */ i("span", {
			className: "flex min-w-0 flex-col gap-0.5",
			children: [b, x]
		}), /* @__PURE__ */ r("span", {
			className: "shrink-0",
			children: /* @__PURE__ */ r(t.Provider, {
				value: _,
				children: u(y)
			})
		})]
	}) : /* @__PURE__ */ i("div", {
		"data-testid": h,
		className: e("flex flex-col gap-1", d),
		style: p,
		children: [b, /* @__PURE__ */ i("div", { children: [/* @__PURE__ */ r(t.Provider, {
			value: _,
			children: u(y)
		}), x && /* @__PURE__ */ r("div", {
			className: "mt-1",
			children: x
		})] })]
	});
}
//#endregion
export { a as t };
