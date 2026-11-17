import { jsx as e } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var t = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: 0
};
function n({ as: n = "span", children: r, className: i, id: a, "data-testid": o }) {
	return /* @__PURE__ */ e(n, {
		id: a,
		"data-testid": o,
		className: i,
		style: t,
		children: r
	});
}
//#endregion
export { n, t };
