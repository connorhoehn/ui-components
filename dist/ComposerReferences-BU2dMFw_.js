import { t as e } from "./cn-DhjIN-s0.js";
import { d as t, l as n } from "./DropdownMenu-DKjyJHNc.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/social/ComposerReferences.tsx
var a = (e) => `Remove ${e.label}`;
function o({ references: o, onRemove: s, removeLabel: c = a, className: l, size: u = "xs", "data-testid": d = "composer-references" }) {
	return o.length === 0 ? null : /* @__PURE__ */ r("ul", {
		"data-testid": d,
		className: e("flex flex-wrap items-center gap-1 px-2 py-1.5", l),
		children: o.map((a) => /* @__PURE__ */ i("li", {
			"data-testid": `${d}-item`,
			"data-reference-id": a.id,
			title: a.title ?? a.label,
			className: e("inline-flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface pl-2 pr-1 text-text-primary", u === "sm" ? "py-1 text-xs" : "py-0.5 text-[11px]"),
			children: [
				a.icon ? /* @__PURE__ */ r("span", {
					"aria-hidden": "true",
					className: "shrink-0",
					children: a.icon
				}) : /* @__PURE__ */ r(t, {
					size: 12,
					className: "shrink-0 text-text-tertiary",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ r("span", {
					className: "min-w-0 truncate",
					children: a.label
				}),
				s && /* @__PURE__ */ r("button", {
					type: "button",
					"aria-label": c(a),
					onClick: () => s(a.id),
					"data-testid": `${d}-remove`,
					className: "shrink-0 rounded-full p-0.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					children: /* @__PURE__ */ r(n, { size: 10 })
				})
			]
		}, a.id))
	});
}
//#endregion
export { o as t };
