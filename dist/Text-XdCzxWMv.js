import { t as e } from "./Stack-CE1FjEn8.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/Text.tsx
var n = {
	xs: "text-xs",
	sm: "text-sm",
	base: "text-base",
	lg: "text-lg"
}, r = {
	normal: "font-normal",
	medium: "font-medium",
	semibold: "font-semibold",
	bold: "font-bold"
}, i = {
	primary: "text-text-primary",
	secondary: "text-text-secondary",
	tertiary: "text-text-tertiary",
	success: "text-success-fg",
	warning: "text-warning-fg",
	danger: "text-danger-fg",
	inherit: ""
}, a = {
	2: "min-w-0 max-w-full line-clamp-2 break-words",
	3: "min-w-0 max-w-full line-clamp-3 break-words"
};
function o({ as: o = "span", className: s, title: c, children: l, wrap: u = !1, size: d, weight: f, tone: p, tabular: m = !1, truncate: h = !1, clamp: g, ..._ }) {
	if (g || h) {
		let e = o, u = typeof l == "string" || typeof l == "number" ? String(l) : void 0, h = [
			g ? a[g] : "block min-w-0 max-w-full truncate",
			d && n[d],
			f && r[f],
			p && i[p],
			m && "tabular-nums",
			s
		].filter(Boolean).join(" "), { role: v, id: y, onClick: b, ...x } = _;
		return /* @__PURE__ */ t(e, {
			className: h,
			title: c ?? u,
			"data-text-truncate": g ? void 0 : "",
			"data-text-clamp": g,
			role: v,
			id: y,
			onClick: b,
			"aria-label": x["aria-label"],
			"aria-hidden": x["aria-hidden"],
			"data-testid": x["data-testid"],
			children: l
		});
	}
	let v = [
		d && n[d],
		f && r[f],
		p && i[p],
		m && "tabular-nums",
		s
	].filter(Boolean).join(" ") || void 0;
	return /* @__PURE__ */ t(e, {
		as: o,
		gap: "none",
		wrap: u,
		className: v,
		title: c,
		..._,
		children: u ? /* @__PURE__ */ t("span", {
			className: "min-w-0",
			children: l
		}) : l
	});
}
var s = o;
//#endregion
export { o as n, s as t };
