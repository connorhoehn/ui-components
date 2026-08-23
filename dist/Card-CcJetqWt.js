import { t as e } from "./cn-DhjIN-s0.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Card.tsx
var n = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-8"
};
function r({ children: r, padding: i = "none", className: a, ...o }) {
	return /* @__PURE__ */ t("div", {
		className: e("border border-border rounded-lg bg-white overflow-hidden", n[i], a),
		...o,
		children: r
	});
}
//#endregion
export { r as t };
