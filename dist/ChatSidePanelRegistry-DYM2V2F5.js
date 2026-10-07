import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./IconButton-VqtspsS5.js";
import { h as n, it as r } from "./Icons-B_xESAH3.js";
import { t as i } from "./Stack-DNMA-_4L.js";
import { t as a } from "./EmptyState-BupZX4UK.js";
import { n as o } from "./SegmentedControl-ZZBhxFk1.js";
import { createContext as s, useContext as c, useMemo as l, useState as u } from "react";
import { Fragment as d, jsx as f, jsxs as p } from "react/jsx-runtime";
//#region src/components/social/ChatSidePanelRegistry.tsx
var m = s(null);
function h({ renderers: e, children: t }) {
	let n = c(m), r = l(() => ({
		...n ?? {},
		...e ?? {}
	}), [n, e]);
	return /* @__PURE__ */ f(m.Provider, {
		value: r,
		children: t
	});
}
function g() {
	return c(m) ?? _;
}
var _ = {};
function v(e) {
	return g()[e] ?? null;
}
function y({ title: r, subtitle: a, onClose: s, onOpenFullPage: c, actions: l, expanded: u = !1, onToggleExpanded: m, size: h = "xs", closeLabel: g = "Close panel", children: _, className: v, "data-testid": y = "chat-side-panel" }) {
	let b = h === "sm";
	return /* @__PURE__ */ p("section", {
		"aria-label": r,
		"data-testid": y,
		"data-size": b ? "sm" : void 0,
		"data-uic-popover-boundary": "",
		className: e("flex h-full min-h-0 flex-col border-l border-border bg-surface", v),
		children: [/* @__PURE__ */ p("header", {
			className: e("flex shrink-0 items-center justify-between gap-2 border-b border-border", b ? "px-4 py-2" : "px-3 py-1.5"),
			children: [/* @__PURE__ */ p(i, {
				gap: "sm",
				align: "center",
				wrap: !1,
				className: "min-w-0",
				children: [/* @__PURE__ */ p("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ f("span", {
						className: e("truncate font-semibold", b ? "text-sm leading-5 text-text-primary" : "text-[12px] text-text-secondary"),
						"data-testid": `${y}-title`,
						children: r
					}), a && /* @__PURE__ */ f("span", {
						className: e("truncate", b ? "text-xs leading-4 text-text-secondary" : "text-[11px] text-text-tertiary"),
						"data-testid": `${y}-subtitle`,
						children: a
					})]
				}), /* @__PURE__ */ p(i, {
					gap: "xs",
					align: "center",
					wrap: !1,
					className: "shrink-0",
					children: [
						m && /* @__PURE__ */ f(o, {
							content: u ? "Show chat" : "Expand board",
							placement: "bottom",
							children: /* @__PURE__ */ f(t, {
								size: "md",
								"aria-label": u ? "Show chat" : "Expand board",
								"aria-pressed": u,
								onClick: m,
								"data-testid": `${y}-expand`,
								children: /* @__PURE__ */ f("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: u ? /* @__PURE__ */ p(d, { children: [/* @__PURE__ */ f("rect", {
										x: "2",
										y: "2.5",
										width: "12",
										height: "11",
										rx: "1.5"
									}), /* @__PURE__ */ f("path", { d: "M6 2.5v11" })] }) : /* @__PURE__ */ f("path", { d: "M6 2H2v4M10 2h4v4M14 10v4h-4M6 14H2v-4" })
								})
							})
						}),
						c && /* @__PURE__ */ f(o, {
							content: "Open full page",
							placement: "bottom",
							children: /* @__PURE__ */ f(t, {
								size: "md",
								"aria-label": "Open full page",
								onClick: c,
								"data-testid": `${y}-open-full`,
								children: /* @__PURE__ */ f("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 16 16",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "1.5",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									"aria-hidden": "true",
									children: /* @__PURE__ */ f("path", { d: "M9 2h5v5M14 2 7 9M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3" })
								})
							})
						}),
						l
					]
				})]
			}), /* @__PURE__ */ f(o, {
				content: g,
				placement: "bottom",
				children: /* @__PURE__ */ f(t, {
					size: "md",
					"aria-label": g,
					onClick: s,
					"data-testid": `${y}-close`,
					className: "shrink-0",
					children: /* @__PURE__ */ f(n, {})
				})
			})]
		}), /* @__PURE__ */ f("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children: _
		})]
	});
}
function b(e) {
	let t = e.replace(/[-_]+/g, " ").trim();
	return t ? t[0].toUpperCase() + t.slice(1) : "Panel";
}
function x({ panel: e, onClose: t, onOpenFullPage: n, subtitle: i, actions: o, expanded: s, onToggleExpanded: c, className: d, "data-testid": p = "chat-side-panel" }) {
	let m = v(e.kind), [h, g] = u(null), _ = l(() => ({
		close: t,
		openFullPage: n ? () => n(e) : void 0,
		setTitle: g
	}), [
		t,
		n,
		e
	]), x = h || e.title || b(e.kind);
	return /* @__PURE__ */ f(y, {
		title: x,
		subtitle: i,
		actions: o,
		expanded: s,
		onToggleExpanded: c,
		onClose: t,
		onOpenFullPage: _.openFullPage,
		className: d,
		"data-testid": p,
		children: m ? /* @__PURE__ */ f("div", {
			className: "flex h-full min-h-0 flex-col",
			"data-kind": e.kind,
			"data-id": e.id,
			children: m(e, _)
		}, `${e.kind}:${e.id}`) : /* @__PURE__ */ f(a, {
			size: "sm",
			icon: /* @__PURE__ */ f(r, { size: 28 }),
			title: `No view registered for ${e.kind}`,
			body: "Register a renderer for this kind with ChatSidePanelProvider.",
			testId: `${p}-empty`
		})
	});
}
//#endregion
export { v as a, b as i, y as n, g as o, h as r, x as t };
