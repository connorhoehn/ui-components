import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/SkeletonCard.tsx
var n = {
	md: "rounded-md",
	lg: "rounded-lg",
	full: "rounded-full"
};
function r({ width: r = "100%", height: i = 64, rounded: a = "lg" }) {
	return /* @__PURE__ */ t("div", {
		"data-testid": "skeleton-card",
		className: e(n[a], "bg-gradient-to-r from-surface-hover via-surface-emphasis to-surface-hover", "bg-[length:400px_100%] animate-[skeleton-shimmer_1.4s_ease-in-out_infinite]"),
		style: {
			width: r,
			height: i
		}
	});
}
//#endregion
export { r as t };
