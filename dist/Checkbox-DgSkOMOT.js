import { d as e } from "./Button-DQoeE5dN.js";
import { h as t, p as n, u as r } from "./safeHref-CSAycLWi.js";
import { forwardRef as i, useEffect as a, useRef as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/forms/Checkbox.tsx
var l = {
	neutral: "peer-hover:bg-neutral/20",
	success: "peer-hover:bg-success/20",
	warning: "peer-hover:bg-warning/20",
	danger: "peer-hover:bg-danger/20",
	info: "peer-hover:bg-info/20",
	caution: "peer-hover:bg-caution/20",
	accent: "peer-hover:bg-accent/20"
}, u = {
	shiftKey: !1,
	metaKey: !1,
	ctrlKey: !1,
	altKey: !1
}, d = i(function({ id: i, name: d, checked: f, onChange: p, indeterminate: m = !1, disabled: h = !1, "aria-label": g, "aria-labelledby": _, "aria-describedby": v, onClick: y, onKeyDown: b, shape: x = "square", tone: S = "info", className: C, "data-testid": w }, T) {
	let E = o(u), D = o(null);
	a(() => {
		D.current && (D.current.indeterminate = m);
	}, [m]);
	let O = (e) => {
		D.current = e, typeof T == "function" ? T(e) : T && (T.current = e);
	}, k = {
		type: "checkbox",
		id: i,
		name: d,
		checked: f,
		disabled: h,
		"aria-label": g,
		"aria-labelledby": _,
		"aria-describedby": v,
		"aria-checked": m ? "mixed" : void 0,
		onClick: (e) => {
			E.current = {
				shiftKey: e.shiftKey,
				metaKey: e.metaKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey
			}, y?.(e);
		},
		onKeyDown: (e) => {
			E.current = u, b?.(e);
		},
		onChange: (e) => p(e.target.checked, E.current),
		"data-testid": w,
		"data-ui-control": "checkbox"
	};
	if (x === "round") {
		let i = t(S), a = f || m;
		return /* @__PURE__ */ c("span", {
			className: e("relative inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center align-middle", h && "opacity-50", C),
			children: [/* @__PURE__ */ s("input", {
				"data-ui-part": "",
				...k,
				ref: O,
				className: "peer absolute inset-0 m-0 h-full w-full cursor-pointer rounded-full opacity-0 disabled:cursor-not-allowed"
			}), /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				className: e("pointer-events-none flex h-full w-full items-center justify-center rounded-full border-2 p-0 text-white transition-colors", r[i], a ? n[i] : e("bg-transparent", !h && l[i]), "peer-focus-visible:ring-2 peer-focus-visible:ring-info/40"),
				children: m ? /* @__PURE__ */ s("svg", {
					viewBox: "0 0 10 2",
					className: "w-1/2",
					"aria-hidden": "true",
					children: /* @__PURE__ */ s("line", {
						x1: "1",
						y1: "1",
						x2: "9",
						y2: "1",
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round"
					})
				}) : f ? /* @__PURE__ */ s("svg", {
					viewBox: "0 0 10 10",
					fill: "none",
					className: "h-1/2 w-1/2",
					"aria-hidden": "true",
					children: /* @__PURE__ */ s("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "currentColor",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				}) : null
			})]
		});
	}
	return /* @__PURE__ */ s("input", {
		"data-ui-part": "",
		ref: (e) => {
			D.current = e, typeof T == "function" ? T(e) : T && (T.current = e);
		},
		type: "checkbox",
		id: i,
		name: d,
		checked: f,
		disabled: h,
		"aria-label": g,
		"aria-labelledby": _,
		"aria-describedby": v,
		"aria-checked": m ? "mixed" : void 0,
		onClick: (e) => {
			E.current = {
				shiftKey: e.shiftKey,
				metaKey: e.metaKey,
				ctrlKey: e.ctrlKey,
				altKey: e.altKey
			}, y?.(e);
		},
		onKeyDown: (e) => {
			E.current = u, b?.(e);
		},
		onChange: (e) => p(e.target.checked, E.current),
		className: e("w-3.5 h-3.5 accent-primary cursor-pointer disabled:cursor-not-allowed", C),
		"data-testid": w,
		"data-ui-control": "checkbox"
	});
});
//#endregion
export { d as t };
