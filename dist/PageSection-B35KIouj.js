import { t as e } from "./cn-D4QmbyEy.js";
import { a as t } from "./Density-BgubVeSf.js";
import { t as n } from "./Chip-D2jKHd4a.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function a({ title: a, description: o, actions: s, children: c, count: l, countTone: u = "neutral", size: d, className: f, "data-testid": p }) {
	let m = t("PageSection", d, {
		comfortable: "lg",
		compact: "sm"
	}), h = m === "sm", g = m === "md" || h, _ = g ? "h2" : "h1";
	return /* @__PURE__ */ i("section", {
		className: e("flex flex-col", g ? "gap-2" : "gap-6", f),
		...p ? { "data-testid": p } : {},
		"data-size": g ? m : void 0,
		children: [/* @__PURE__ */ i("div", {
			className: e("flex justify-between gap-4", g ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ i("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ i(_, {
					className: e("m-0 text-text-primary", g ? e("flex min-w-0 items-center gap-2.5 font-semibold", h ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [g ? /* @__PURE__ */ r("span", {
						className: "min-w-0 truncate",
						children: a
					}) : a, typeof l == "number" && /* @__PURE__ */ r(n, {
						size: u === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !g && "ml-2.5 align-middle", u === "primary" && e("rounded-md bg-primary-bg font-medium text-primary-fg", h ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${l} items`,
						...p ? { "data-testid": `${p}-count` } : {},
						children: l
					})]
				}), o && /* @__PURE__ */ r("p", {
					className: "text-sm text-neutral mt-1 mb-0",
					children: o
				})]
			}), s && /* @__PURE__ */ r("div", {
				className: e("flex items-center gap-2 shrink-0", h && "text-sm"),
				children: s
			})]
		}), c]
	});
}
//#endregion
export { a as t };
