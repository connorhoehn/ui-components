import { t as e } from "./cn-DhjIN-s0.js";
import { f as t, u as n } from "./overlayStack-BDlo8PJg.js";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/Badge.tsx
var a = {
	accent: "info",
	success: "success",
	danger: "danger",
	muted: "neutral"
};
function o(e) {
	return e == null || e <= 0 ? "0" : e > 99 ? "99+" : String(Math.trunc(e));
}
function s({ variant: s, value: c, color: l = "accent", "aria-label": u, className: d, "data-testid": f }) {
	if (s === "count") {
		let t = o(c);
		return /* @__PURE__ */ r("span", {
			"data-testid": f,
			"aria-label": u ?? `${t} items`,
			className: e("inline-flex items-center justify-center min-w-[18px] h-[18px]", "px-1.5 rounded-full text-[10px] font-semibold leading-none select-none", n[a[l]], d),
			children: t
		});
	}
	return s === "dot" ? /* @__PURE__ */ r("span", {
		"data-testid": f,
		"aria-label": u,
		role: u ? "img" : void 0,
		className: e("inline-block w-2 h-2 rounded-full shrink-0", t[a[l]], d)
	}) : /* @__PURE__ */ i("span", {
		"data-testid": f,
		"aria-label": u,
		role: u ? "img" : void 0,
		className: e("relative inline-flex w-2.5 h-2.5 shrink-0", d),
		children: [/* @__PURE__ */ r("span", {
			"aria-hidden": "true",
			className: e("absolute inset-0 rounded-full animate-ping", e(t[a[l]], "opacity-60"))
		}), /* @__PURE__ */ r("span", {
			"aria-hidden": "true",
			className: e("relative inline-block w-2.5 h-2.5 rounded-full", t[a[l]])
		})]
	});
}
//#endregion
export { s as t };
