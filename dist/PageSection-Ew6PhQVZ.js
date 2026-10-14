import { t as e } from "./cn-D4QmbyEy.js";
import { l as t, s as n } from "./Button-uREUOWUk.js";
import { n as r } from "./overlayStack-C0EBgmzL.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function o({ title: o, description: s, actions: c, children: l, count: u, countTone: d = "neutral", empty: f, size: p, className: m, "data-testid": h }) {
	t("PageSection", p, {
		comfortable: "lg",
		compact: "sm"
	});
	let g = n(), _ = p ?? "lg", v = _ === "sm", y = _ === "md" || v, b = y || p === void 0 && g === "compact", x = y ? "h2" : "h1", S = f != null && f !== !1;
	return /* @__PURE__ */ a("section", {
		className: e("flex flex-col", b ? "gap-2" : "gap-6", m),
		...h ? { "data-testid": h } : {},
		"data-size": y ? _ : void 0,
		"data-density": p === void 0 && g === "compact" ? "compact" : void 0,
		"data-ui-section": "",
		"data-section-empty": S ? "" : void 0,
		children: [/* @__PURE__ */ a("div", {
			className: e("flex flex-wrap justify-between gap-x-4 gap-y-2", y ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ a("div", {
				className: e("min-w-0 flex-[1_1_16rem]", S && "flex items-baseline gap-3"),
				children: [/* @__PURE__ */ a(x, {
					className: e("m-0 text-text-primary", S && "shrink-0", y ? e("flex min-w-0 items-center gap-2.5 font-semibold", v ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [y ? /* @__PURE__ */ i("span", {
						className: "min-w-0 truncate",
						children: o
					}) : o, typeof u == "number" && /* @__PURE__ */ i(r, {
						size: d === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !y && "ml-2.5 align-middle", d === "primary" && e("rounded-md bg-primary-bg font-medium text-primary-fg", v ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${u} items`,
						...h ? { "data-testid": `${h}-count` } : {},
						children: u
					})]
				}), S ? /* @__PURE__ */ i("span", {
					"data-ui-empty": "",
					className: e("min-w-0 truncate text-text-tertiary", v ? "text-xs" : "text-sm"),
					children: f
				}) : s && /* @__PURE__ */ i("p", {
					className: "text-sm text-neutral mt-1 mb-0",
					children: s
				})]
			}), c && /* @__PURE__ */ i("div", {
				className: e("flex max-w-full min-w-0 flex-wrap items-center gap-2 shrink-0", v && "text-sm"),
				children: c
			})]
		}), !S && l]
	});
}
//#endregion
export { o as t };
