import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Button.tsx
var n = {
	primary: "bg-primary text-white border-none hover:bg-primary-hover",
	secondary: "bg-surface-inset text-text-primary border border-border hover:bg-surface-hover",
	ghost: "bg-transparent text-text-primary border border-border hover:bg-surface-hover",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-white border-none hover:bg-danger/90",
	success: "bg-transparent text-success-fg border border-success-border hover:bg-success-bg"
}, r = {
	surface: n,
	code: {
		primary: "bg-code-blue text-code-bg border-none hover:bg-code-blue/90",
		secondary: "bg-code-surface text-code-text border border-code-border hover:bg-code-raised",
		ghost: "bg-transparent text-code-text border border-code-border hover:bg-code-surface",
		danger: "bg-transparent text-code-red border border-code-red/40 hover:bg-code-surface",
		"danger-solid": "bg-code-red text-code-bg border-none hover:bg-code-red/90",
		success: "bg-transparent text-code-green border border-code-green/40 hover:bg-code-surface"
	}
}, i = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-2.5 text-sm"
};
function a({ variant: a = "primary", size: o = "md", tone: s = "surface", disabled: c = !1, fullWidth: l = !1, children: u, type: d = "button", className: f, ref: p, ...m }) {
	return /* @__PURE__ */ t("button", {
		ref: p,
		type: d,
		disabled: c,
		className: e("whitespace-nowrap font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out", (r[s] ?? n)[a], i[o], c && "opacity-50 cursor-not-allowed", !c && "cursor-pointer", l && "w-full", f),
		...m,
		children: u
	});
}
//#endregion
export { a as t };
