import { t as e } from "./cn-D4QmbyEy.js";
import { l as t, s as n } from "./Button-uREUOWUk.js";
import { n as r } from "./overlayStack-C0EBgmzL.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function o({ title: o, description: s, actions: c, children: l, count: u, countTone: d = "neutral", size: f, className: p, "data-testid": m }) {
	t("PageSection", f, {
		comfortable: "lg",
		compact: "sm"
	});
	let h = n(), g = f ?? "lg", _ = g === "sm", v = g === "md" || _, y = v || f === void 0 && h === "compact", b = v ? "h2" : "h1";
	return /* @__PURE__ */ a("section", {
		className: e("flex flex-col", y ? "gap-2" : "gap-6", p),
		...m ? { "data-testid": m } : {},
		"data-size": v ? g : void 0,
		"data-density": f === void 0 && h === "compact" ? "compact" : void 0,
		children: [/* @__PURE__ */ a("div", {
			className: e("flex flex-wrap justify-between gap-x-4 gap-y-2", v ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ a("div", {
				className: "min-w-0 flex-[1_1_16rem]",
				children: [/* @__PURE__ */ a(b, {
					className: e("m-0 text-text-primary", v ? e("flex min-w-0 items-center gap-2.5 font-semibold", _ ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [v ? /* @__PURE__ */ i("span", {
						className: "min-w-0 truncate",
						children: o
					}) : o, typeof u == "number" && /* @__PURE__ */ i(r, {
						size: d === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !v && "ml-2.5 align-middle", d === "primary" && e("rounded-md bg-primary-bg font-medium text-primary-fg", _ ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${u} items`,
						...m ? { "data-testid": `${m}-count` } : {},
						children: u
					})]
				}), s && /* @__PURE__ */ i("p", {
					className: "text-sm text-neutral mt-1 mb-0",
					children: s
				})]
			}), c && /* @__PURE__ */ i("div", {
				className: e("flex max-w-full min-w-0 flex-wrap items-center gap-2 shrink-0", _ && "text-sm"),
				children: c
			})]
		}), l]
	});
}
//#endregion
export { o as t };
