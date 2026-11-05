import { t as e } from "./cn-D4QmbyEy.js";
import { r as t } from "./Button-C-I3BxWI.js";
import { t as n } from "./IconButton-Bf5Wy0tS.js";
import { ft as r } from "./Icons-CqVFbuiZ.js";
import { useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/shared/SearchInput.tsx
function l(e) {
	let t = e;
	return !t || !t.tagName ? !1 : t.isContentEditable || t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
var u = {
	surface: {
		icon: "text-[var(--color-text-tertiary)]",
		field: "border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",
		clear: "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
	},
	code: {
		icon: "text-code-muted",
		field: "border-code-border bg-code-surface text-code-text placeholder:text-code-muted focus:ring-code-blue focus:border-code-blue",
		clear: "text-code-muted hover:text-code-text hover:bg-code-raised"
	}
};
function d({ value: d, onChange: f, placeholder: p, onClear: m, tone: h = "surface", className: g, inputClassName: _, size: v = "sm", onKeyDown: y, style: b, autoFocus: x, "aria-label": S, "data-testid": C, collapsible: w = !1, defaultExpanded: T = !1, shortcut: E = "/", onExpandedChange: D }) {
	let O = u[h] ?? u.surface, k = a(null), A = a(null), [j, M] = o(T), N = !w || j || d !== "", P = a(!1), F = a(null), I = a(!1), L = (e, t = !1) => {
		P.current = t, e === j ? e && t && k.current?.focus() : (M(e), D?.(e));
	};
	i(() => {
		w && d !== "" && !j && M(!0);
	}, [
		w,
		d,
		j
	]), i(() => {
		N && P.current && (P.current = !1, k.current?.focus()), !N && I.current && (I.current = !1, F.current?.focus());
	}, [N]), i(() => {
		if (!w || N || E === !1) return;
		let e = (e) => {
			e.key !== E || e.metaKey || e.ctrlKey || e.altKey || e.defaultPrevented || l(e.target) || (e.preventDefault(), L(!0, !0));
		};
		return document.addEventListener("keydown", e), () => document.removeEventListener("keydown", e);
	});
	let R = S ?? p ?? "Search";
	return N ? /* @__PURE__ */ c("div", {
		ref: A,
		className: e("relative inline-flex items-center", g),
		style: b,
		"data-search-collapsible": w ? "" : void 0,
		onBlur: w ? (e) => {
			A.current?.contains(e.relatedTarget) || d === "" && L(!1);
		} : void 0,
		children: [
			/* @__PURE__ */ c("svg", {
				className: e("absolute pointer-events-none", v === "lg" ? "left-4 h-5 w-5" : v === "md" ? "left-3 h-[18px] w-[18px]" : "left-3 w-3.5 h-3.5", O.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ s("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ s("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ s("input", {
				"data-ui-part": "",
				type: "text",
				value: d,
				onChange: (e) => f(e.target.value),
				ref: k,
				onKeyDown: (e) => {
					y?.(e), w && !e.defaultPrevented && e.key === "Escape" && d === "" && (e.preventDefault(), I.current = !0, L(!1));
				},
				placeholder: p ?? "Search…",
				autoFocus: x,
				"aria-label": R,
				"data-testid": C,
				"data-ui-control": "search",
				className: e("w-full border focus:outline-none focus:ring-2 transition-colors", v === "lg" ? `${t.lg} pl-12 pr-11 text-sm rounded-lg` : v === "md" ? `${t.md} pl-10 pr-7 text-sm rounded-md` : `${t.sm} pl-8 pr-7 text-xs rounded-md`, O.field, _)
			}),
			d && /* @__PURE__ */ s("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => {
					f(""), m?.(), w && k.current?.focus();
				},
				className: e("absolute rounded", v === "lg" ? "right-3 p-1" : "right-2 p-0.5", O.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ s("svg", {
					width: v === "lg" ? 16 : 12,
					height: v === "lg" ? 16 : 12,
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ s("path", {
						d: "M2 2l8 8M10 2l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})
		]
	}) : /* @__PURE__ */ s(n, {
		ref: F,
		"aria-label": R,
		"aria-expanded": !1,
		"aria-keyshortcuts": E === !1 ? void 0 : E,
		title: E === !1 ? R : `${R} (${E})`,
		icon: /* @__PURE__ */ s(r, {}),
		size: v,
		tone: h,
		"data-search-collapsed": "",
		"data-testid": C ? `${C}-toggle` : void 0,
		onClick: () => L(!0, !0)
	});
}
//#endregion
export { d as t };
