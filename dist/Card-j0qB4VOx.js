import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/ui/Card.tsx
var n = {
	none: "",
	sm: "p-4",
	md: "p-6",
	lg: "p-8"
};
function r({ children: r, padding: i = "none", tone: a = "default", className: o, ref: s, ...c }) {
	return /* @__PURE__ */ t("div", {
		ref: s,
		"data-ui-card": "",
		"data-tone": a === "assistant" ? "assistant" : void 0,
		className: e("border rounded-lg overflow-hidden", a === "assistant" ? "border-accent/25 bg-accent/8" : "border-border bg-surface", n[i], o),
		...c,
		children: r
	});
}
//#endregion
export { r as t };
