import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { useEffect as n, useRef as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/graph/work/WorkEntityList.tsx
function o(e, t, n) {
	return e?.kind === t && e.id === n;
}
function s(e) {
	return e.locked ? "Restricted work item" : e.title.trim() || "Untitled work item";
}
function c(e, t) {
	let n = t.get(e.fromId), r = t.get(e.toId), i = n ? s(n) : "Unavailable item", a = r ? s(r) : "Unavailable item";
	return e.label?.trim() || `${i} ${e.relation} ${a}`;
}
var l = (t) => e("w-full rounded-md border px-3 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50", t ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:bg-surface-hover");
function u({ nodes: e, edges: t, selection: u, onSelectionChange: d, heading: f = "Accessible work graph", groups: p, footer: m, statusLabelOf: h }) {
	let g = new Map(e.map((e) => [e.id, e])), _ = r(null), v = u ? `${u.kind}:${u.id}` : null;
	n(() => {
		v && _.current?.scrollIntoView?.({ block: "nearest" });
	}, [v]);
	let y = (e) => {
		let t = o(u, "node", e.id);
		return /* @__PURE__ */ i("li", { children: /* @__PURE__ */ a("button", {
			"data-ui-part": "",
			ref: t ? _ : void 0,
			type: "button",
			"aria-label": `Work item: ${s(e)}`,
			"aria-pressed": t,
			"aria-current": t ? "true" : void 0,
			"data-selected": t || void 0,
			onClick: () => d({
				kind: "node",
				id: e.id
			}),
			className: l(t),
			children: [/* @__PURE__ */ i("span", {
				className: "block break-words font-medium text-text-primary",
				children: s(e)
			}), /* @__PURE__ */ i("span", {
				className: "text-xs text-text-tertiary",
				children: e.kind === "conversation" ? "Chat · Recent activity" : `${e.kind} · ${h?.(e) ?? e.status}`
			})]
		}) }, e.id);
	}, b = p?.map((e) => ({
		...e,
		items: e.nodeIds.map((e) => g.get(e)).filter((e) => !!e)
	})).filter((e) => e.items.length > 0), x = b ? b.length === 0 && t.length === 0 : e.length === 0 && t.length === 0;
	return /* @__PURE__ */ a("section", {
		"data-ui-part": "",
		"aria-labelledby": "work-entity-list-heading",
		className: "min-w-0 space-y-3",
		children: [
			/* @__PURE__ */ i("h3", {
				id: "work-entity-list-heading",
				className: "text-sm font-semibold text-text-primary",
				children: f
			}),
			x ? /* @__PURE__ */ i("p", {
				className: "text-sm text-text-secondary",
				children: "No shared work is available."
			}) : /* @__PURE__ */ a("div", {
				className: "grid gap-3 md:grid-cols-2",
				children: [/* @__PURE__ */ a("div", { children: [/* @__PURE__ */ i("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Items"
				}), b ? b.map((e) => /* @__PURE__ */ a("section", {
					"data-ui-part": "",
					"aria-label": e.title,
					className: "mb-2",
					"data-testid": "work-entity-list-group",
					children: [/* @__PURE__ */ a("h5", {
						className: "mb-1 truncate text-xs font-semibold text-text-secondary",
						children: [e.title, e.subtitle && /* @__PURE__ */ a("span", {
							className: "font-normal text-text-tertiary",
							children: [" · ", e.subtitle]
						})]
					}), /* @__PURE__ */ i("ul", {
						className: "space-y-1",
						children: e.items.map(y)
					})]
				}, e.id)) : /* @__PURE__ */ i("ul", {
					className: "space-y-1",
					children: e.map(y)
				})] }), /* @__PURE__ */ a("div", { children: [/* @__PURE__ */ i("h4", {
					className: "mb-1 text-xs font-medium uppercase tracking-wide text-text-tertiary",
					children: "Relationships"
				}), /* @__PURE__ */ i("ul", {
					className: "space-y-1",
					children: t.map((e) => {
						let t = o(u, "edge", e.id), n = c(e, g);
						return /* @__PURE__ */ i("li", { children: /* @__PURE__ */ a("button", {
							"data-ui-part": "",
							ref: t ? _ : void 0,
							type: "button",
							"aria-label": `Relationship: ${n}`,
							"aria-pressed": t,
							"aria-current": t ? "true" : void 0,
							"data-selected": t || void 0,
							onClick: () => d({
								kind: "edge",
								id: e.id
							}),
							className: l(t),
							children: [/* @__PURE__ */ i("span", {
								className: "block break-words font-medium text-text-primary",
								children: n
							}), /* @__PURE__ */ a("span", {
								className: "text-xs text-text-tertiary",
								children: [
									e.relation,
									" · ",
									e.status
								]
							})]
						}) }, e.id);
					})
				})] })]
			}),
			m
		]
	});
}
//#endregion
//#region src/components/graph/work/WorkInspector.tsx
var d = {
	message: "Message",
	"view-document": "View document",
	"edit-document": "Edit document",
	"join-conversation": "Join conversation",
	"join-meeting": "Join meeting",
	"observe-terminal": "Observe terminal",
	"control-terminal": "Control terminal",
	"view-transcript": "View transcript",
	"view-run": "View run",
	"dispatch-run": "Dispatch run"
}, f = /* @__PURE__ */ new Set([
	"view-document",
	"edit-document",
	"join-conversation",
	"join-meeting",
	"observe-terminal",
	"control-terminal",
	"view-transcript",
	"view-run"
]);
function p(e, t, n) {
	if (n) return n.kind === "node" ? e.find((e) => e.id === n.id) : t.find((e) => e.id === n.id);
}
function m(e) {
	return "kind" in e ? e.locked ? "Restricted work item" : e.title : e.label?.trim() || `${e.relation} relationship`;
}
function h({ nodes: e, edges: r, selection: o, onSelectionChange: s, onOpen: c, onReference: l, onRequestCollaboration: u }) {
	let h = p(e, r, o);
	if (n(() => {
		o && !h && s(null);
	}, [
		h,
		s,
		o
	]), !o || !h) return /* @__PURE__ */ i("aside", {
		"aria-label": "Work details",
		className: "rounded-lg border border-border bg-surface p-4",
		children: /* @__PURE__ */ i("p", {
			className: "text-sm text-text-secondary",
			children: "Select a work item or relationship to inspect it."
		})
	});
	let g = o, _ = h.capabilities.find((e) => f.has(e));
	return /* @__PURE__ */ a("aside", {
		"aria-label": "Work details",
		className: "space-y-4 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ a("div", {
				className: "min-w-0",
				children: [
					/* @__PURE__ */ i("p", {
						className: "text-xs font-medium uppercase tracking-wide text-text-tertiary",
						children: "kind" in h ? h.kind : "Relationship"
					}),
					/* @__PURE__ */ i("h3", {
						className: "break-words text-base font-semibold text-text-primary",
						children: m(h)
					}),
					/* @__PURE__ */ i("p", {
						className: "text-sm text-text-secondary",
						children: h.status
					}),
					"description" in h && !h.locked && h.description ? /* @__PURE__ */ i("p", {
						className: "mt-2 break-words text-sm text-text-secondary",
						children: h.description
					}) : null
				]
			}),
			/* @__PURE__ */ a("div", {
				className: "flex flex-wrap gap-2",
				children: [_ && c ? /* @__PURE__ */ i(t, {
					size: "sm",
					variant: "secondary",
					onClick: () => c(g),
					children: "Open"
				}) : null, l ? /* @__PURE__ */ i(t, {
					size: "sm",
					variant: "secondary",
					onClick: () => l(g),
					children: "Reference"
				}) : null]
			}),
			h.capabilities.length > 0 && u ? /* @__PURE__ */ a("div", { children: [/* @__PURE__ */ i("h4", {
				className: "mb-2 text-xs font-medium uppercase tracking-wide text-text-tertiary",
				children: "Request collaboration"
			}), /* @__PURE__ */ i("div", {
				className: "flex flex-wrap gap-2",
				children: h.capabilities.map((e) => /* @__PURE__ */ i(t, {
					size: "sm",
					variant: "secondary",
					onClick: () => u(g, e),
					children: d[e]
				}, e))
			})] }) : null
		]
	});
}
//#endregion
export { u as n, h as t };
