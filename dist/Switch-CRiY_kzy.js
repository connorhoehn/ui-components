import { d as e } from "./Button-DQoeE5dN.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/Switch.tsx
var n = {
	sm: "w-7 h-4",
	md: "w-9 h-5"
}, r = {
	sm: "w-3 h-3",
	md: "w-4 h-4"
}, i = {
	sm: "translate-x-3",
	md: "translate-x-4"
};
function a({ checked: a, onChange: o, disabled: s = !1, size: c = "md", "aria-label": l, "aria-labelledby": u, className: d, style: f, "data-testid": p }) {
	return /* @__PURE__ */ t("button", {
		"data-ui-part": "",
		type: "button",
		role: "switch",
		"aria-checked": a,
		"aria-label": l,
		"aria-labelledby": u,
		disabled: s,
		"data-testid": p,
		"data-ui-control": "switch",
		onClick: () => {
			s || o(!a);
		},
		className: e("relative inline-flex items-center rounded-full border border-transparent transition-colors", "focus:outline-none focus-visible:ring-2 focus-visible:ring-info", n[c], a ? "bg-info" : "bg-surface-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", d),
		style: f,
		children: /* @__PURE__ */ t("span", { className: e("inline-block rounded-full bg-white shadow transform transition-transform", r[c], a ? i[c] : "translate-x-0.5") })
	});
}
//#endregion
export { a as t };
