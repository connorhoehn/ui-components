import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Button.tsx
var n = {
	primary: "bg-primary text-white border-none hover:bg-primary-hover",
	secondary: "bg-surface-inset text-text-primary border border-border hover:bg-surface-hover",
	ghost: "bg-transparent text-text-primary border border-border hover:bg-surface-hover",
	danger: "bg-transparent text-danger-fg border border-danger-border hover:bg-danger-bg",
	"danger-solid": "bg-danger text-white border-none hover:bg-danger/90"
}, r = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-5 py-2.5 text-sm"
};
function i({ variant: i = "primary", size: a = "md", disabled: o = !1, fullWidth: s = !1, children: c, type: l = "button", className: u, ...d }) {
	return /* @__PURE__ */ t("button", {
		type: l,
		disabled: o,
		className: e("font-semibold rounded-md font-[inherit] transition-colors duration-150 ease-in-out", n[i], r[a], o && "opacity-50 cursor-not-allowed", !o && "cursor-pointer", s && "w-full", u),
		...d,
		children: c
	});
}
//#endregion
export { i as t };
