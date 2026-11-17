import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t, jsxs as n } from "react/jsx-runtime";
//#region src/components/shared/StatusDot.tsx
var r = {
	xs: "w-1.5 h-1.5",
	sm: "w-2 h-2",
	md: "w-2.5 h-2.5"
};
function i({ color: i, pulse: a = !1, size: o = "sm", label: s, className: c, style: l, title: u, "data-testid": d, "aria-label": f }) {
	let p = i ?? "var(--color-text-tertiary)", m = /* @__PURE__ */ t("span", {
		"aria-hidden": s != null || void 0,
		"aria-label": s == null ? f : void 0,
		className: e("inline-block rounded-full shrink-0", r[o], a && "animate-pulse"),
		style: { background: p }
	});
	return s == null ? /* @__PURE__ */ t("span", {
		"data-testid": d,
		title: u,
		className: e("inline-flex items-center", c),
		style: l,
		children: m
	}) : /* @__PURE__ */ n("span", {
		"data-testid": d,
		title: u,
		"aria-label": f,
		className: e("inline-flex items-center", c),
		style: l,
		children: [m, /* @__PURE__ */ t("span", {
			className: "ml-1.5 text-xs text-[var(--color-text-secondary)]",
			children: s
		})]
	});
}
//#endregion
export { i as t };
