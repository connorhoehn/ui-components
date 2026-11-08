import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Card.tsx
var n = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-8"
};
function r({ children: r, padding: i = "none", className: a, ref: o, ...s }) {
	return /* @__PURE__ */ t("div", {
		ref: o,
		"data-ui-card": "",
		className: e("border border-border rounded-lg bg-surface overflow-hidden", n[i], a),
		...s,
		children: r
	});
}
//#endregion
export { r as t };
