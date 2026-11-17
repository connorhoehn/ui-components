import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/ThinkingDots.tsx
function n({ size: n = "md", className: r }) {
	return /* @__PURE__ */ t("span", {
		className: e("inline-flex items-center gap-1", r),
		"data-testid": "thinking-dots",
		children: [
			0,
			1,
			2
		].map((r) => /* @__PURE__ */ t("span", { className: e("ui-thinking-dot inline-block rounded-full bg-current", n === "sm" ? "h-1 w-1" : "h-1.5 w-1.5", r === 1 && "[animation-delay:200ms]", r === 2 && "[animation-delay:400ms]") }, r))
	});
}
//#endregion
export { n as t };
