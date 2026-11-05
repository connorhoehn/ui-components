import { t as e } from "./cn-D4QmbyEy.js";
import { Et as t, I as n, p as r } from "./Icons-CqVFbuiZ.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/Banner.tsx
var o = {
	error: () => /* @__PURE__ */ i(t, { size: 20 }),
	warning: () => /* @__PURE__ */ i(t, { size: 20 }),
	info: () => /* @__PURE__ */ i(n, { size: 20 }),
	success: () => /* @__PURE__ */ i(r, { size: 20 })
}, s = {
	error: "text-danger",
	warning: "text-warning",
	info: "text-info",
	success: "text-success"
}, c = {
	error: "border-l-danger",
	warning: "border-l-warning",
	info: "border-l-info",
	success: "border-l-success"
}, l = {
	error: "bg-danger-bg border-danger-border text-danger-fg",
	warning: "bg-warning-bg border-warning-border text-warning-fg",
	info: "bg-info-bg border-info-border text-info-fg",
	success: "bg-success-bg border-success-border text-success-fg"
}, u = {
	error: "bg-danger-callout border-danger-callout-border",
	warning: "bg-warning-callout border-warning-callout-border",
	info: "bg-info-callout border-info-callout-border",
	success: "bg-success-callout border-success-callout-border"
};
function d({ variant: t = "error", title: n, layout: r = "inline", icon: d, onDismiss: f, action: p, accent: m = "none", meta: h, size: g = "md", children: _, className: v, style: y, "data-testid": b }) {
	let x = d === !0 ? o[t]() : d, S = x ? /* @__PURE__ */ i("span", {
		"aria-hidden": "true",
		"data-testid": b ? `${b}-icon` : void 0,
		className: e("shrink-0 flex items-center", s[t]),
		children: x
	}) : null, C = f && /* @__PURE__ */ i("button", {
		"data-ui-part": "",
		type: "button",
		onClick: f,
		"aria-label": "Dismiss",
		className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
		children: "×"
	}), w = g === "lg";
	if (r === "callout") return /* @__PURE__ */ a("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		"data-testid": b,
		"data-layout": "callout",
		"data-accent": m,
		"data-size": g,
		className: e("rounded-md flex gap-4 border text-text-primary", w ? "items-start" : "items-center", w ? "px-6 py-3 text-[15px]" : "px-4 py-3 text-sm", u[t], m === "bar" && e("border-l-[3px]", c[t]), v),
		style: y,
		children: [
			S,
			/* @__PURE__ */ a("div", {
				className: "flex-1 min-w-0 flex flex-col gap-0.5",
				children: [
					n && /* @__PURE__ */ i("strong", {
						className: e("font-semibold text-text-primary", w ? "text-[17px] leading-[22px]" : "text-sm leading-5"),
						children: n
					}),
					_ != null && /* @__PURE__ */ i("span", {
						className: e(w ? "text-[15px] leading-[22px] text-text-primary" : "text-sm leading-5 text-text-secondary"),
						children: _
					}),
					h != null && /* @__PURE__ */ i("span", {
						className: e("text-text-secondary", w ? "text-sm leading-5" : "text-[12px] leading-4"),
						"data-testid": b ? `${b}-meta` : void 0,
						children: h
					})
				]
			}),
			p && /* @__PURE__ */ i("span", {
				className: "shrink-0 flex items-center gap-2 whitespace-nowrap",
				children: p
			}),
			C
		]
	});
	let T = r === "stacked";
	return /* @__PURE__ */ i("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		"data-testid": b,
		"data-layout": r,
		className: e("@container px-3.5 py-2.5 rounded-lg text-sm border", l[t], v),
		style: y,
		children: /* @__PURE__ */ a("div", {
			className: e("flex gap-2 min-w-0", T ? "flex-col items-start gap-1" : "items-center @max-[30rem]:flex-col @max-[30rem]:items-start @max-[30rem]:gap-1.5"),
			"data-banner-row": "",
			children: [
				S,
				n && /* @__PURE__ */ i("strong", { children: n }),
				/* @__PURE__ */ i("span", {
					className: T ? "w-full" : "min-w-0 flex-1 @max-[30rem]:w-full",
					children: _
				}),
				p && /* @__PURE__ */ i("span", {
					className: "shrink-0 flex items-center gap-2",
					children: p
				}),
				C
			]
		})
	});
}
//#endregion
export { d as t };
