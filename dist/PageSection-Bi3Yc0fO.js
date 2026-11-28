import { c as e, f as t, u as n } from "./Button-DwPf_9pb.js";
import { t as r } from "./Chip-DVGdTxaN.js";
import { createContext as i, useContext as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/pageHeadingContext.ts
var c = i(null);
function l() {
	return a(c);
}
function u(e) {
	return e === "h1" ? "h2" : e === "h2" ? "h3" : "h4";
}
//#endregion
//#region src/components/ui/PageSection.tsx
function d({ title: i, description: a, actions: c, children: d, count: f, countTone: p = "neutral", empty: m, size: h, divided: g = !1, as: _, className: v, "data-testid": y }) {
	let b = l();
	n("PageSection", h, {
		comfortable: "lg",
		compact: "sm"
	});
	let x = e(), S = h ?? "lg", C = S === "sm", w = S === "md" || C, T = w || h === void 0 && x === "compact", E = _ ?? (b ? u(b) : w ? "h2" : "h1"), D = m != null && m !== !1;
	return /* @__PURE__ */ s("section", {
		"data-ui-part": "",
		className: t("flex flex-col", T ? "gap-2" : "gap-6", v),
		...y ? { "data-testid": y } : {},
		"data-size": w ? S : void 0,
		"data-density": h === void 0 && x === "compact" ? "compact" : void 0,
		"data-ui-section": "",
		"data-section-empty": D ? "" : void 0,
		children: [/* @__PURE__ */ s("div", {
			className: t("flex flex-wrap justify-between gap-x-4 gap-y-2", w ? "items-center" : "items-start"),
			children: [/* @__PURE__ */ s("div", {
				className: t("min-w-0 flex-[1_1_16rem]", D && "flex items-baseline gap-3"),
				children: [/* @__PURE__ */ s(E, {
					className: t("m-0 text-text-primary", D && "shrink-0", w ? t("flex min-w-0 items-center gap-2.5 font-semibold", C ? "text-sm leading-5" : "text-[16px] leading-6") : "text-xl font-semibold"),
					children: [w ? /* @__PURE__ */ o("span", {
						className: "min-w-0 truncate",
						children: i
					}) : i, typeof f == "number" && f > 0 && /* @__PURE__ */ o(r, {
						size: p === "primary" ? "md" : "sm",
						tone: "neutral",
						className: t("shrink-0", !w && "ml-2.5 align-middle", p === "primary" && t("rounded-md bg-primary-bg font-medium text-primary-fg", C ? "text-xs leading-4" : "text-[13px] leading-[18px]")),
						"aria-label": `${f} items`,
						...y ? { "data-testid": `${y}-count` } : {},
						children: f
					})]
				}), D ? /* @__PURE__ */ o("span", {
					"data-ui-empty": "",
					className: t("min-w-0 truncate text-text-tertiary", C ? "text-xs" : "text-sm"),
					children: m
				}) : a && /* @__PURE__ */ o("p", {
					className: "text-sm text-text-secondary mt-1 mb-0",
					children: a
				})]
			}), c && /* @__PURE__ */ o("div", {
				className: t("flex max-w-full min-w-0 flex-wrap items-center gap-2 shrink-0", C && "text-sm"),
				children: c
			})]
		}), !D && (g ? /* @__PURE__ */ o("div", {
			className: "flex flex-col divide-y divide-border [&>*:not(:first-child)]:pt-[var(--ui-section-gap,0.75rem)] [&>*:not(:last-child)]:pb-[var(--ui-section-gap,0.75rem)]",
			"data-section-divided": "",
			...y ? { "data-testid": `${y}-groups` } : {},
			children: d
		}) : d)]
	});
}
//#endregion
export { c as n, d as t };
