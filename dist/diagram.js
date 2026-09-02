import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./useResolvedTheme-C-Qskt8V.js";
import { Suspense as a, createElement as o, lazy as s, useCallback as c, useMemo as l, useRef as u } from "react";
import { jsx as d, jsxs as f } from "react/jsx-runtime";
import { createRoot as p } from "react-dom/client";
import { Extension as m } from "@tiptap/core";
import { Plugin as h, PluginKey as g } from "@tiptap/pm/state";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var _ = s(() => import("./ExcalidrawCanvas-DqjnIjds.js"));
function v({ label: e }) {
	return /* @__PURE__ */ d("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function y(e) {
	return e.ydoc !== void 0;
}
function b(e) {
	return y(e) ? /* @__PURE__ */ d(x, { ...e }) : /* @__PURE__ */ d(S, { ...e });
}
function x({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ d("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ d(a, {
			fallback: /* @__PURE__ */ d(v, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ d(_, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function S({ gatewayUrl: r, diagramId: i, authToken: o, requireSync: s, loadingSlot: f, className: p, ...m }) {
	let h = u(/* @__PURE__ */ new Set()), g = c((e) => (h.current.add(e), () => {
		h.current.delete(e);
	}), []), y = c((e) => {
		h.current.forEach((t) => t(e));
	}, []), b = l(() => ({
		wsUrl: r,
		cognitoToken: o,
		defaultChannel: `doc:${i}`
	}), [
		r,
		o,
		i
	]), x = t({
		config: b,
		onMessage: y
	}), { ydoc: S, provider: C, synced: w } = e({
		documentId: i,
		ws: x,
		onMessage: g
	});
	return S && (s !== !0 || w) ? /* @__PURE__ */ d("div", {
		className: n("h-full w-full", p),
		children: /* @__PURE__ */ d(a, {
			fallback: /* @__PURE__ */ d(v, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ d(_, {
				ydoc: S,
				awareness: C?.awareness ?? null,
				...m
			})
		})
	}) : /* @__PURE__ */ d("div", {
		className: n("h-full w-full", p),
		children: f ?? /* @__PURE__ */ d(v, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function C({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let p = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ f("div", {
		"data-testid": p,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ f("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ d("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ d(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${p}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ d("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ d(b, {
				ydoc: i,
				awareness: a ?? null,
				blockId: e,
				editable: o,
				...c ? { assetPath: c } : {},
				user: {
					displayName: s.name || "Anonymous",
					color: s.color || "#3b82f6",
					...s.userId ? { userId: s.userId } : {}
				}
			})
		})]
	}) : /* @__PURE__ */ d("div", {
		"data-testid": `${p}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ f("div", {
		"data-testid": `${p}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ d("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ d("pre", {
			className: "overflow-x-auto whitespace-pre-wrap font-mono text-xs",
			children: t
		})]
	});
}
//#endregion
//#region src/components/diagram/macro.ts
var w = "diagram", T = "macro";
function E() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function D(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function O(e) {
	return `id: ${e}`;
}
function k(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return D(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var A = new g("diagramMacro");
function j(e) {
	let t = document.createElement("pre");
	t.setAttribute("data-macro", String(e.attrs.macroName ?? "unknown"));
	let n = document.createElement("code");
	return t.appendChild(n), {
		dom: t,
		contentDOM: n
	};
}
var M = class {
	view;
	getPos;
	options;
	dom;
	root;
	host;
	node;
	dead = !1;
	queued = !1;
	constructor(e, t, n, r) {
		this.view = t, this.getPos = n, this.options = r, this.node = e, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", w), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = p(this.host), this.schedule();
	}
	schedule() {
		this.queued || this.dead || (this.queued = !0, queueMicrotask(() => {
			this.queued = !1, this.dead || this.render();
		}));
	}
	render() {
		let e = this.options.getContext(), t = this.node.textContent;
		this.root.render(o(C, {
			diagramId: k(t),
			source: t,
			ydoc: e?.ydoc ?? null,
			awareness: e?.awareness ?? null,
			editable: this.view.editable,
			user: e?.user ?? {
				name: "Anonymous",
				color: "#3b82f6"
			},
			...e?.assetPath ? { assetPath: e.assetPath } : {},
			...this.view.editable ? { onRemove: () => this.remove() } : {}
		}));
	}
	remove() {
		let e = this.getPos();
		e !== void 0 && this.view.dispatch(this.view.state.tr.delete(e, e + this.node.nodeSize));
	}
	refresh() {
		this.schedule();
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "diagram") return !1;
		let t = e.textContent !== this.node.textContent;
		return this.node = e, t && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
	destroy() {
		this.dead = !0;
		let e = this.root;
		queueMicrotask(() => e.unmount());
	}
}, N = m.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: T,
			attrs: { macroName: w },
			content: [{
				type: "text",
				text: O(e ?? E())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addProseMirrorPlugins() {
		let e = this.options, t = /* @__PURE__ */ new Set();
		return [new h({
			key: A,
			props: { nodeViews: { [T]: (n, r, i) => {
				if (n.attrs.macroName !== "diagram") return j(n);
				let a = new M(n, r, i, e);
				t.add(a);
				let o = a.destroy.bind(a);
				return a.destroy = () => {
					t.delete(a), o();
				}, a;
			} } },
			view: (e) => {
				let n = e.editable;
				return { update: (e) => {
					e.editable !== n && (n = e.editable, t.forEach((e) => e.refresh()));
				} };
			}
		})];
	}
});
//#endregion
export { b as CollaborativeExcalidraw, w as DIAGRAM_MACRO_NAME, C as DiagramBlockRenderer, N as DiagramMacro, T as MACRO_NODE_NAME, A as diagramMacroPluginKey, O as diagramMacroText, D as isDiagramId, E as newDiagramId, k as readDiagramId, i as useResolvedTheme };
