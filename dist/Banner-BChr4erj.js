import { t as e } from "./cn-DhjIN-s0.js";
import { T as t, et as n, l as r } from "./Icons-CI4hzRkO.js";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/Banner.tsx
var o = {
	error: () => /* @__PURE__ */ i(n, { size: 20 }),
	warning: () => /* @__PURE__ */ i(n, { size: 20 }),
	info: () => /* @__PURE__ */ i(t, { size: 20 }),
	success: () => /* @__PURE__ */ i(r, { size: 20 })
}, s = {
	error: "text-danger",
	warning: "text-warning",
	info: "text-info",
	success: "text-success"
}, c = {
	error: "bg-danger-bg border-danger-border text-danger-fg",
	warning: "bg-warning-bg border-warning-border text-warning-fg",
	info: "bg-info-bg border-info-border text-info-fg",
	success: "bg-success-bg border-success-border text-success-fg"
};
function l({ variant: t = "error", title: n, layout: r = "inline", icon: l, onDismiss: u, action: d, children: f, className: p, style: m, "data-testid": h }) {
	let g = l === !0 ? o[t]() : l, _ = g ? /* @__PURE__ */ i("span", {
		"aria-hidden": "true",
		"data-testid": h ? `${h}-icon` : void 0,
		className: e("shrink-0 flex items-center", s[t]),
		children: g
	}) : null, v = u && /* @__PURE__ */ i("button", {
		type: "button",
		onClick: u,
		"aria-label": "Dismiss",
		className: "bg-transparent border-none text-current cursor-pointer text-base p-0 leading-none",
		children: "×"
	});
	return r === "callout" ? /* @__PURE__ */ a("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		"data-testid": h,
		"data-layout": "callout",
		className: e("px-5 py-3 rounded-md text-[13px] flex items-center gap-4 border", c[t], p),
		style: m,
		children: [
			_,
			/* @__PURE__ */ a("div", {
				className: "flex-1 min-w-0 flex flex-col gap-0.5",
				children: [n && /* @__PURE__ */ i("strong", {
					className: "text-sm font-semibold leading-5 text-text-primary",
					children: n
				}), f != null && /* @__PURE__ */ i("span", {
					className: "text-[13px] leading-5 text-text-secondary",
					children: f
				})]
			}),
			d && /* @__PURE__ */ i("span", {
				className: "shrink-0 flex items-center gap-2 whitespace-nowrap",
				children: d
			}),
			v
		]
	}) : /* @__PURE__ */ a("div", {
		role: t === "error" || t === "warning" ? "alert" : "status",
		"aria-live": t === "error" || t === "warning" ? "assertive" : "polite",
		"data-testid": h,
		className: e("px-3.5 py-2.5 rounded-lg text-[13px] flex gap-2 border", r === "stacked" ? "flex-col items-start gap-1" : "items-center", c[t], p),
		style: m,
		children: [
			_,
			n && /* @__PURE__ */ i("strong", { children: n }),
			/* @__PURE__ */ i("span", {
				className: r === "stacked" ? "w-full" : "flex-1",
				children: f
			}),
			d && /* @__PURE__ */ i("span", {
				className: "shrink-0 flex items-center gap-2",
				children: d
			}),
			v
		]
	});
}
//#endregion
export { l as t };
