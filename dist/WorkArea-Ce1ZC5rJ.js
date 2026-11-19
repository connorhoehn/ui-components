import { d as e } from "./Button-DQoeE5dN.js";
import { createContext as t, useContext as n, useLayoutEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/WorkArea.tsx
var s = {
	surface: {
		column: "bg-surface-panel",
		divider: "border-border",
		status: "bg-surface text-text-tertiary"
	},
	code: {
		column: "bg-code-bg",
		divider: "border-code-border",
		status: "bg-code-panel text-code-subtle"
	}
}, c = t(!1);
function l() {
	return n(c);
}
var u = "--dock-height";
function d({ breadcrumbs: t, toolbar: n, children: l, status: d, footer: f, footerPlacement: p = "pinned", padded: m = !0, tone: h = "surface", className: g, bodyClassName: _, "data-testid": v }) {
	let y = s[h], b = !!f && p === "float", x = i(null), S = i(null);
	r(() => {
		let e = x.current, t = S.current;
		if (!b || !e || !t) return;
		let n = (t) => e.style.setProperty(u, `${Math.ceil(t)}px`);
		n(t.getBoundingClientRect().height);
		let r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(([e]) => {
			e && n(e.target.getBoundingClientRect().height);
		}), r.observe(t)), () => {
			r?.disconnect(), e.style.removeProperty(u);
		};
	}, [b]);
	let C = /* @__PURE__ */ o("div", {
		className: e("min-h-0 flex-1 overflow-auto", m && "p-[var(--ui-page-gutter,1.5rem)]", _),
		children: [l, b && /* @__PURE__ */ a("div", {
			"aria-hidden": !0,
			className: "h-[var(--dock-height,0px)] shrink-0",
			"data-workarea-dock-spacer": ""
		})]
	});
	return /* @__PURE__ */ o("div", {
		"data-testid": v,
		className: e("flex h-full min-h-0 min-w-0 flex-1 flex-col", y.column, g),
		children: [
			t && /* @__PURE__ */ a("div", {
				className: e("flex flex-none items-center overflow-x-auto border-b px-3 py-1.5", y.divider),
				children: t
			}),
			n,
			b ? /* @__PURE__ */ o("div", {
				ref: x,
				className: "relative flex min-h-0 flex-1 flex-col",
				"data-workarea-float-region": "",
				children: [C, /* @__PURE__ */ a("div", {
					ref: S,
					className: "pointer-events-none absolute inset-x-0 bottom-0 z-10 min-w-0",
					"data-workarea-footer": "",
					"data-placement": "float",
					children: /* @__PURE__ */ a(c.Provider, {
						value: !0,
						children: f
					})
				})]
			}) : C,
			d && /* @__PURE__ */ a("div", {
				className: e("flex flex-none items-center gap-3 border-t px-3 py-1 text-[11px]", y.divider, y.status),
				children: d
			}),
			f && !b && /* @__PURE__ */ a("div", {
				className: "min-w-0 shrink-0",
				"data-workarea-footer": !0,
				children: f
			})
		]
	});
}
//#endregion
export { d as n, l as r, u as t };
