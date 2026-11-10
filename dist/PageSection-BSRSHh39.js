import { d as e, l as t, s as n } from "./Button-DQoeE5dN.js";
import { r } from "./safeHref-D1tj5kGa.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/PageSection.tsx
function o({ title: o, description: s, actions: c, children: l, count: u, countTone: d = "neutral", empty: f, size: p, divided: m = !1, className: h, "data-testid": g }) {
	t("PageSection", p, {
		comfortable: "lg",
		compact: "sm"
	});
	let _ = n(), v = p ?? "lg", y = v === "sm", b = v === "md" || y, x = b || p === void 0 && _ === "compact", S = b ? "h2" : "h1", C = f != null && f !== !1;
	return /* @__PURE__ */ a("section", {
		"data-ui-part": "",
		className: e("flex flex-col", x ? "gap-2" : "gap-6", h),
		...g ? { "data-testid": g } : {},
		"data-size": b ? v : void 0,
		"data-density": p === void 0 && _ === "compact" ? "compact" : void 0,
		"data-ui-section": "",
		"data-section-empty": C ? "" : void 0,
		children: [/* @__PURE__ */ a("div", {
			className: e("flex flex-wrap justify-between gap-x-4 gap-y-2", b ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ a("div", {
				className: e("min-w-0 flex-[1_1_16rem]", C && "flex items-baseline gap-3"),
				children: [/* @__PURE__ */ a(S, {
					className: e("m-0 text-text-primary", C && "shrink-0", b ? e("flex min-w-0 items-center gap-2.5 font-semibold", y ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [b ? /* @__PURE__ */ i("span", {
						className: "min-w-0 truncate",
						children: o
					}) : o, typeof u == "number" && u > 0 && /* @__PURE__ */ i(r, {
						size: d === "primary" ? "md" : "sm",
						tone: "neutral",
						className: e("shrink-0", !b && "ml-2.5 align-middle", d === "primary" && e("rounded-md bg-primary-bg font-medium text-primary-fg", y ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${u} items`,
						...g ? { "data-testid": `${g}-count` } : {},
						children: u
					})]
				}), C ? /* @__PURE__ */ i("span", {
					"data-ui-empty": "",
					className: e("min-w-0 truncate text-text-tertiary", y ? "text-xs" : "text-sm"),
					children: f
				}) : s && /* @__PURE__ */ i("p", {
					className: "text-sm text-text-secondary mt-1 mb-0",
					children: s
				})]
			}), c && /* @__PURE__ */ i("div", {
				className: e("flex max-w-full min-w-0 flex-wrap items-center gap-2 shrink-0", y && "text-sm"),
				children: c
			})]
		}), !C && (m ? /* @__PURE__ */ i("div", {
			className: "flex flex-col divide-y divide-border [&>*:not(:first-child)]:pt-[var(--ui-section-gap,0.75rem)] [&>*:not(:last-child)]:pb-[var(--ui-section-gap,0.75rem)]",
			"data-section-divided": "",
			...g ? { "data-testid": `${g}-groups` } : {},
			children: l
		}) : l)]
	});
}
//#endregion
export { o as t };
