import { t as e } from "./cn-D4QmbyEy.js";
import { jsx as t } from "react/jsx-runtime";
//#region src/components/shared/SectionLabel.tsx
var n = {
	upper: "text-[12px] font-bold uppercase tracking-[0.06em] text-text-tertiary",
	sentence: "text-[12px] font-medium normal-case tracking-normal text-text-primary"
};
function r({ children: r, as: i = "span", case: a = "upper", className: o, "data-testid": s }) {
	return /* @__PURE__ */ t(i, {
		"data-testid": s,
		className: e(n[a] ?? n.upper, o),
		children: r
	});
}
//#endregion
export { r as t };
