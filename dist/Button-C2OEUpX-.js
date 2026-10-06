import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Button.tsx
var n = {
	primary: "bg-primary text-on-primary border-none hover:bg-primary-hover",
	secondary: "bg-surface-inset text-text-primary border border-border hover:bg-surface-hover",
	ghost: "bg-transparent text-text-primary border border-border hover:bg-surface-hover",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-white border-none hover:bg-danger/90",
	success: "bg-transparent text-success-fg border border-success-border hover:bg-success-bg",
	info: "bg-info text-white border-none hover:bg-info/90",
	link: "bg-transparent text-primary border-none p-0 no-underline hover:underline"
}, r = {
	surface: n,
	code: {
		primary: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		secondary: "bg-code-surface text-code-text border border-code-border hover:bg-code-raised",
		ghost: "bg-transparent text-code-text border border-code-border hover:bg-code-surface",
		danger: "bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface",
		"danger-solid": "bg-code-red text-code-bg border-none hover:bg-code-red/90",
		success: "bg-transparent text-code-green border border-code-green/40 hover:bg-code-surface",
		info: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		link: "bg-transparent text-code-blue border-none p-0 no-underline hover:underline"
	}
}, i = "font-semibold", a = {
	sm: "h-6.5 gap-1.5 px-2.5 text-xs",
	md: "h-9 gap-2 px-4 text-sm",
	lg: "h-10 gap-2 px-5 text-sm"
};
function o({ variant: o = "primary", size: s = "md", tone: c = "surface", disabled: l = !1, fullWidth: u = !1, children: d, type: f = "button", className: p, ref: m, ...h }) {
	let g = o === "link";
	return /* @__PURE__ */ t("button", {
		ref: m,
		type: f,
		disabled: l,
		"data-variant": o,
		"data-size": g ? void 0 : s,
		className: e(g ? "font-[inherit] transition-colors duration-150 ease-in-out" : "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-md font-[inherit] transition-colors duration-150 ease-in-out", i, (r[c] ?? n)[o], !g && a[s], l && "opacity-50 cursor-not-allowed", !l && "cursor-pointer", u && "w-full", p),
		...h,
		children: d
	});
}
//#endregion
export { o as n, i as t };
