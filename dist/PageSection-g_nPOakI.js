import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Chip-0zFpfJ52.js";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function i({ title: i, description: a, actions: o, children: s, count: c, countTone: l = "neutral", size: u = "lg", className: d, "data-testid": f }) {
	let p = u === "md", m = p ? "h2" : "h1";
	return /* @__PURE__ */ r("section", {
		className: e("flex flex-col", p ? "gap-2" : "gap-6", d),
		...f ? { "data-testid": f } : {},
		"data-size": p ? "md" : void 0,
		children: [/* @__PURE__ */ r("div", {
			className: e("flex justify-between gap-4", p ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ r("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ r(m, {
					className: e("m-0 text-text-primary", p ? "flex min-w-0 items-center gap-2.5 text-[16px] font-semibold leading-6" : "text-xl font-semibold"),
					children: [p ? /* @__PURE__ */ n("span", {
						className: "min-w-0 truncate",
						children: i
					}) : i, typeof c == "number" && /* @__PURE__ */ n(t, {
						size: l === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !p && "ml-2.5 align-middle", l === "primary" && "rounded-md bg-primary-bg text-[13px] font-medium leading-[18px] text-primary-fg"),
						"aria-label": `${c} items`,
						...f ? { "data-testid": `${f}-count` } : {},
						children: c
					})]
				}), a && /* @__PURE__ */ n("p", {
					className: "text-sm text-neutral mt-1 mb-0",
					children: a
				})]
			}), o && /* @__PURE__ */ n("div", {
				className: "flex items-center gap-2 shrink-0",
				children: o
			})]
		}), s]
	});
}
//#endregion
export { i as t };
