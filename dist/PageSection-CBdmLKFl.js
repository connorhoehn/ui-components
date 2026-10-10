import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Chip-D2jKHd4a.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function i({ title: i, description: a, actions: o, children: s, count: c, countTone: l = "neutral", size: u = "lg", className: d, "data-testid": f }) {
	let p = u === "sm", m = u === "md" || p, h = m ? "h2" : "h1";
	return /* @__PURE__ */ r("section", {
		className: e("flex flex-col", m ? "gap-2" : "gap-6", d),
		...f ? { "data-testid": f } : {},
		"data-size": m ? u : void 0,
		children: [/* @__PURE__ */ r("div", {
			className: e("flex justify-between gap-4", m ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ r("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ r(h, {
					className: e("m-0 text-text-primary", m ? e("flex min-w-0 items-center gap-2.5 font-semibold", p ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [m ? /* @__PURE__ */ n("span", {
						className: "min-w-0 truncate",
						children: i
					}) : i, typeof c == "number" && /* @__PURE__ */ n(t, {
						size: l === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !m && "ml-2.5 align-middle", l === "primary" && e("rounded-md bg-primary-bg font-medium text-primary-fg", p ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${c} items`,
						...f ? { "data-testid": `${f}-count` } : {},
						children: c
					})]
				}), a && /* @__PURE__ */ n("p", {
					className: "text-sm text-neutral mt-1 mb-0",
					children: a
				})]
			}), o && /* @__PURE__ */ n("div", {
				className: e("flex items-center gap-2 shrink-0", p && "text-sm"),
				children: o
			})]
		}), s]
	});
}
//#endregion
export { i as t };
