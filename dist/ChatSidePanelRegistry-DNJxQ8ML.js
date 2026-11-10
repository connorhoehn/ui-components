import { d as e, l as t, o as n } from "./Button-DQoeE5dN.js";
import { r } from "./Text-fqIvcZp2.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { h as a, st as o } from "./Icons-CqVFbuiZ.js";
import { t as s } from "./Tooltip-ClzY6PN8.js";
import { t as c } from "./EmptyState-D0-FmU2J.js";
import { createContext as l, useContext as u, useMemo as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/social/ChatSidePanelRegistry.tsx
var g = l(null);
function _({ renderers: e, children: t }) {
	let n = u(g), r = d(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ m(g.Provider, {
		value: r,
		children: t
	});
}
function v() {
	return u(g) ?? y;
}
var y = {};
function b(e) {
	return v()[e] ?? null;
}
function x({ titleAs: n = "span", title: o, subtitle: c, onClose: l, onOpenFullPage: u, actions: d, expanded: f = !1, onToggleExpanded: g, size: _, closeLabel: v = "Close panel", children: y, className: b, "data-testid": x = "chat-side-panel" }) {
	let S = t("ChatSidePanelFrame", _, {
		comfortable: "xs",
		compact: "sm"
	}) === "sm";
	return /* @__PURE__ */ h("section", {
		"data-ui-part": "",
		"aria-label": o,
		"data-testid": x,
		"data-size": S ? "sm" : void 0,
		"data-uic-popover-boundary": "",
		className: e("flex h-full min-h-0 flex-col border-l border-border bg-surface", b),
		children: [/* @__PURE__ */ h("header", {
			className: e("flex shrink-0 items-center justify-between gap-2 border-b border-border", S ? "px-[var(--ui-content-gutter,1rem)] py-1.5" : "px-3 py-1.5"),
			children: [/* @__PURE__ */ h(r, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ h("span", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ m(n, {
						className: e("m-0 truncate font-semibold", S ? "text-sm leading-5 text-text-primary" : "text-[12px] text-text-secondary"),
						"data-testid": `${x}-title`,
						children: o
					}), c && /* @__PURE__ */ m("span", {
						className: e("truncate", S ? "text-xs leading-4 text-text-secondary" : "text-[11px] text-text-tertiary"),
						"data-testid": `${x}-subtitle`,
						children: c
					})]
				}), /* @__PURE__ */ h(r, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					children: [
						g && /* @__PURE__ */ m(s, {
							content: f ? "Show chat" : "Expand board",
							placement: "bottom",
							children: /* @__PURE__ */ m(i, {
								size: S ? "sm" : void 0,
								"aria-label": f ? "Show chat" : "Expand board",
								"aria-pressed": f,
								onClick: g,
								"data-testid": `${x}-expand`,
								children: /* @__PURE__ */ m("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: f ? /* @__PURE__ */ h(p, { children: [/* @__PURE__ */ m("rect", {
										x: "2",
										y: "2.5",
										width: "12",
										height: "11",
										rx: "1.5"
									}), /* @__PURE__ */ m("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ m("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
								})
							})
						}),
						u && /* @__PURE__ */ m(s, {
							content: "Open full page",
							placement: "bottom",
							children: /* @__PURE__ */ m(i, {
								size: S ? "sm" : void 0,
								"aria-label": "Open full page",
								onClick: u,
								"data-testid": `${x}-open-full`,
								children: /* @__PURE__ */ m("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: /* @__PURE__ */ m("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
								})
							})
						}),
						d
					]
				})]
			}), /* @__PURE__ */ m(s, {
				content: v,
				placement: "bottom",
				children: /* @__PURE__ */ m(i, {
					size: S ? "sm" : void 0,
					"aria-label": v,
					onClick: l,
					"data-testid": `${x}-close`,
					className: "shrink-0",
					children: /* @__PURE__ */ m(a, {})
				})
			})]
		}), /* @__PURE__ */ m("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: y
		})]
	});
}
function S(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function C({ panel: e, onClose: t, onOpenFullPage: r, subtitle: i, actions: a, expanded: s, onToggleExpanded: l, className: u, "data-testid": p = "chat-side-panel" }) {
	let h = b(e.kind), [g, _] = f(null), v = d(() => ({
		close: t,
		openFullPage: r ? () => r(e) : void 0,
		setTitle: _
	}), [
		t,
		r,
		e
	]), y = g || e.title || S(e.kind);
	return /* @__PURE__ */ m(x, {
		title: y,
		subtitle: i,
		actions: a,
		expanded: s,
		onToggleExpanded: l,
		onClose: t,
		onOpenFullPage: v.openFullPage,
		className: u,
		"data-testid": p,
		children: h ? /* @__PURE__ */ m("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: h(e, v)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ m(n, {
			density: "compact",
			children: /* @__PURE__ */ m(c, {
				icon: /* @__PURE__ */ m(o, { size: 28 }),
				title: `No view registered for ${e.kind}`,
				body: "Register a renderer for this kind with ChatSidePanelProvider.",
				testId: `${p}-empty`
			})
		})
	});
}
//#endregion
export { b as a, S as i, x as n, v as o, _ as r, C as t };
