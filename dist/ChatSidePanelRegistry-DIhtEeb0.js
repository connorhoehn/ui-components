import { t as e } from "./cn-D4QmbyEy.js";
import { l as t, o as n } from "./Button-C-I3BxWI.js";
import { t as r } from "./IconButton-J9jGN6eo.js";
import { h as i, ot as a } from "./Icons-C__ztBBw.js";
import { c as o } from "./Text-Bges3p6o.js";
import { t as s } from "./Tooltip-C2PEm6cS.js";
import { t as c } from "./EmptyState-D5ucMp2y.js";
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
function x({ titleAs: n = "span", title: a, subtitle: c, onClose: l, onOpenFullPage: u, actions: d, expanded: f = !1, onToggleExpanded: g, size: _, closeLabel: v = "Close panel", children: y, className: b, "data-testid": x = "chat-side-panel" }) {
	let S = t("ChatSidePanelFrame", _, {
		comfortable: "xs",
		compact: "sm"
	}) === "sm";
	return /* @__PURE__ */ h("section", {
		"aria-label": a,
		"data-testid": x,
		"data-size": S ? "sm" : void 0,
		"data-uic-popover-boundary": "",
		className: e("flex h-full min-h-0 flex-col border-l border-border bg-surface", b),
		children: [/* @__PURE__ */ h("header", {
			className: e("flex shrink-0 items-center justify-between gap-2 border-b border-border", S ? "px-[var(--ui-content-gutter,1rem)] py-1.5" : "px-3 py-1.5"),
			children: [/* @__PURE__ */ h(o, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ h("span", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [/* @__PURE__ */ m(n, {
						className: e("m-0 truncate font-semibold", S ? "text-sm leading-5 text-text-primary" : "text-[12px] text-text-secondary"),
						"data-testid": `${x}-title`,
						children: a
					}), c && /* @__PURE__ */ m("span", {
						className: e("truncate", S ? "text-xs leading-4 text-text-secondary" : "text-[11px] text-text-tertiary"),
						"data-testid": `${x}-subtitle`,
						children: c
					})]
				}), /* @__PURE__ */ h(o, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					children: [
						g && /* @__PURE__ */ m(s, {
							content: f ? "Show chat" : "Expand board",
							placement: "bottom",
							children: /* @__PURE__ */ m(r, {
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
							children: /* @__PURE__ */ m(r, {
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
				children: /* @__PURE__ */ m(r, {
					size: S ? "sm" : void 0,
					"aria-label": v,
					onClick: l,
					"data-testid": `${x}-close`,
					className: "shrink-0",
					children: /* @__PURE__ */ m(i, {})
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
function C({ panel: e, onClose: t, onOpenFullPage: r, subtitle: i, actions: o, expanded: s, onToggleExpanded: l, className: u, "data-testid": p = "chat-side-panel" }) {
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
		actions: o,
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
				icon: /* @__PURE__ */ m(a, { size: 28 }),
				title: `No view registered for ${e.kind}`,
				body: "Register a renderer for this kind with ChatSidePanelProvider.",
				testId: `${p}-empty`
			})
		})
	});
}
//#endregion
export { b as a, S as i, x as n, v as o, _ as r, C as t };
