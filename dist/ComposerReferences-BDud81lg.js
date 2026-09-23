import { t as e } from "./cn-DhjIN-s0.js";
import { d as t, l as n } from "./DropdownMenu-DKjyJHNc.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/social/ComposerReferences.tsx
var a = (e) => `Remove ${e.label}`;
function o({ references: o, onRemove: s, removeLabel: c = a, className: l, "data-testid": u = "composer-references" }) {
	return o.length === 0 ? null : /* @__PURE__ */ r("ul", {
		"data-testid": u,
		className: e("flex flex-wrap items-center gap-1 px-2 py-1.5", l),
		children: o.map((e) => /* @__PURE__ */ i("li", {
			"data-testid": `${u}-item`,
			"data-reference-id": e.id,
			title: e.title ?? e.label,
			className: "inline-flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface py-0.5 pl-2 pr-1 text-[11px] text-text-primary",
			children: [
				e.icon ? /* @__PURE__ */ r("span", {
					"aria-hidden": "true",
					className: "shrink-0",
					children: e.icon
				}) : /* @__PURE__ */ r(t, {
					size: 12,
					className: "shrink-0 text-text-tertiary",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ r("span", {
					className: "min-w-0 truncate",
					children: e.label
				}),
				s && /* @__PURE__ */ r("button", {
					type: "button",
					"aria-label": c(e),
					onClick: () => s(e.id),
					"data-testid": `${u}-remove`,
					className: "shrink-0 rounded-full p-0.5 text-text-tertiary hover:bg-surface-hover hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
					children: /* @__PURE__ */ r(n, { size: 10 })
				})
			]
		}, e.id))
	});
}
//#endregion
export { o as t };
