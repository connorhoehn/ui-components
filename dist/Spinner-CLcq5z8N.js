import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/Spinner.tsx
var n = {
	sm: "w-[14px] h-[14px]",
	md: "w-[20px] h-[20px]",
	lg: "w-[28px] h-[28px]"
};
function r({ size: r = "md", color: i, className: a, style: o, decorative: s = !1, "aria-label": c = "Loading", "data-testid": l }) {
	let u = i ?? "var(--color-primary)";
	return /* @__PURE__ */ t("div", {
		...s ? { "aria-hidden": !0 } : {
			role: "status",
			"aria-label": c
		},
		"data-testid": l,
		className: e("inline-block rounded-full border-2 border-transparent animate-spin", n[r], a),
		style: {
			borderTopColor: u,
			...o
		}
	});
}
//#endregion
export { r as t };
