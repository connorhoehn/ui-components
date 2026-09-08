import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./Input-DLknWXri.js";
import { t as o } from "./Textarea-Dz4doxTv.js";
import { n as s, t as c } from "./useResolvedTheme-MncahQcS.js";
import { Suspense as l, createElement as u, lazy as d, useCallback as f, useEffect as p, useMemo as ee, useRef as m, useState as h } from "react";
import { Fragment as te, jsx as g, jsxs as _ } from "react/jsx-runtime";
import { Extension as v } from "@tiptap/core";
import { Plugin as ne, PluginKey as y } from "@tiptap/pm/state";
import { createRoot as re } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var b = d(() => import("./ExcalidrawCanvas-Cb7J6789.js"));
function x({ label: e }) {
	return /* @__PURE__ */ g("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function ie(e) {
	return e.ydoc !== void 0;
}
function ae(e) {
	return ie(e) ? /* @__PURE__ */ g(oe, { ...e }) : /* @__PURE__ */ g(se, { ...e });
}
function oe({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ g("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ g(l, {
			fallback: /* @__PURE__ */ g(x, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ g(b, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function se({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...u }) {
	let d = m(/* @__PURE__ */ new Set()), p = f((e) => (d.current.add(e), () => {
		d.current.delete(e);
	}), []), h = f((e) => {
		d.current.forEach((t) => t(e));
	}, []), te = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), _ = t({
		config: te,
		onMessage: h
	}), { ydoc: v, provider: ne, synced: y } = e({
		documentId: i,
		ws: _,
		onMessage: p
	});
	return v && (o !== !0 || y) ? /* @__PURE__ */ g("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ g(l, {
			fallback: /* @__PURE__ */ g(x, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ g(b, {
				ydoc: v,
				awareness: ne?.awareness ?? null,
				...u
			})
		})
	}) : /* @__PURE__ */ g("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ g(x, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function ce({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ _("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ g("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ g(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ g("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ g(ae, {
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
	}) : /* @__PURE__ */ g("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ _("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ g("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ g("pre", {
			className: "overflow-x-auto whitespace-pre-wrap font-mono text-xs",
			children: t
		})]
	});
}
//#endregion
//#region src/components/doc-macros/ReactMacroView.ts
var S = class {
	dom;
	node;
	view;
	getPos;
	host;
	root;
	dead = !1;
	queued = !1;
	constructor(e, t) {
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = re(this.host);
	}
	schedule() {
		this.queued || this.dead || (this.queued = !0, queueMicrotask(() => {
			this.queued = !1, this.dead || this.root.render(this.element());
		}));
	}
	refresh() {
		this.schedule();
	}
	get editable() {
		return this.view.editable;
	}
	replaceText(e, t, n) {
		if (!this.editable) return !1;
		let r = this.getPos();
		if (r === void 0) return !1;
		let i = r + 1, a = this.view.state.tr;
		return n === "" ? a.delete(i + e, i + t) : a.replaceWith(i + e, i + t, this.view.state.schema.text(n)), this.view.dispatch(a), !0;
	}
	removeBlock() {
		let e = this.getPos();
		return e !== void 0 && (this.view.dispatch(this.view.state.tr.delete(e, e + this.node.nodeSize)), !0);
	}
	destroy() {
		this.dead = !0;
		let e = this.root;
		queueMicrotask(() => e.unmount());
	}
};
//#endregion
//#region src/components/doc-macros/plainMacroView.ts
function C(e) {
	let t = document.createElement("pre");
	t.setAttribute("data-macro", String(e.attrs.macroName ?? "unknown"));
	let n = document.createElement("code");
	return t.appendChild(n), {
		dom: t,
		contentDOM: n
	};
}
//#endregion
//#region src/components/doc-macros/registry.ts
var w = "macro", T = "macroRenderers", E = new y(T);
function le(e = []) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e) t.set(n.macroName, n);
	return {
		register(e) {
			t.set(e.macroName, e);
		},
		get(e) {
			return t.get(e);
		},
		names() {
			return [...t.keys()];
		}
	};
}
function D() {
	return { macroRenderer: !0 };
}
var O = /* @__PURE__ */ new WeakMap();
function k(e) {
	let t = e.extensionManager ?? e, n = O.get(t);
	return n || (n = le(), O.set(t, n)), n;
}
function A(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === T : i.length === 0 || i[0] === t;
}
function ue(e, t) {
	let n = C(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function de(e) {
	let t = /* @__PURE__ */ new Set();
	return new ne({
		key: E,
		props: { nodeViews: { [w]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return C(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return ue(n, o);
			t.add(s);
			let c = s.destroy?.bind(s);
			return s.destroy = () => {
				t.delete(s), c?.();
			}, s;
		} } },
		view: (e) => {
			let n = e.editable;
			return { update: (e) => {
				e.editable !== n && (n = e.editable, t.forEach((e) => e.refresh?.()));
			} };
		}
	});
}
function j(e, t, ...n) {
	let r = k(e);
	for (let e of n) r.register(e);
	return A(e, t) ? [de(r)] : [];
}
//#endregion
//#region src/components/diagram/macro.ts
var M = "diagram", fe = "macro";
function pe() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function me(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function he(e) {
	return `id: ${e}`;
}
function N(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return me(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var ge = new y("diagramMacro"), _e = class extends S {
	options;
	active = !1;
	onDocumentPointerDown = (e) => {
		if (!this.active) return;
		let t = e.target;
		t && this.dom.contains(t) || this.setActive(!1);
	};
	onDocumentKeyDown = (e) => {
		this.active && e.key === "Escape" && this.setActive(!1);
	};
	setActive(e) {
		this.active !== e && (this.active = e, this.dom.setAttribute("data-diagram-active", String(e)), this.schedule());
	}
	constructor(e, t) {
		super(e, M), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return u(ce, {
			diagramId: N(t),
			source: t,
			ydoc: e?.ydoc ?? null,
			awareness: e?.awareness ?? null,
			editable: this.editable && this.active,
			user: e?.user ?? {
				name: "Anonymous",
				color: "#3b82f6"
			},
			...e?.assetPath ? { assetPath: e.assetPath } : {},
			...this.editable && this.active ? { onRemove: () => this.removeBlock() } : {}
		});
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
		document.removeEventListener("mousedown", this.onDocumentPointerDown, !0), document.removeEventListener("keydown", this.onDocumentKeyDown, !0), super.destroy();
	}
};
function P(e) {
	return {
		macroName: M,
		create: (t) => new _e(t, e)
	};
}
var ve = v.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: fe,
			attrs: { macroName: M },
			content: [{
				type: "text",
				text: he(e ?? pe())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: D,
	addProseMirrorPlugins() {
		return j(this.editor, this.name, P(this.options));
	}
}), ye = v.create({
	name: T,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: D,
	addProseMirrorPlugins() {
		return j(this.editor, this.name, ...this.options.renderers);
	}
}), F = "done", I = "pending", L = "action-items", be = /^([A-Za-z][A-Za-z0-9_-]*):/, R = "  - ", z = "    ";
function xe(e) {
	let t = [], n = 0;
	for (;;) {
		let r = e.indexOf("\n", n);
		if (r === -1) return t.push({
			text: e.slice(n),
			start: n
		}), t;
		t.push({
			text: e.slice(n, r),
			start: n
		}), n = r + 1;
	}
}
function Se(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function B(e, t, n) {
	let r = be.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Se(e.slice(i, a));
	return o === null ? null : {
		key: r[1],
		keyEnd: t + n + r[0].length,
		scalar: {
			value: o,
			from: t + i,
			to: t + a
		},
		lineStart: t,
		lineEnd: t + e.length
	};
}
function V(e) {
	let t = xe(e), n = 0;
	for (; n < t.length && t[n].text.trim() === "";) n += 1;
	let r = t[n];
	if (!r) return null;
	let i = B(r.text, r.start, 0);
	if (!i || i.key !== "items" || i.scalar.value !== "" && i.scalar.value !== "[]") return null;
	n += 1;
	let a = [], o = i.lineEnd;
	for (; n < t.length; n += 1) {
		let e = t[n];
		if (e.text.trim() !== "") {
			if (e.text.startsWith(R)) {
				let t = B(e.text, e.start, 4);
				if (!t) return null;
				a.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith(z)) {
				let t = a[a.length - 1];
				if (!t) return null;
				let n = B(e.text, e.start, 4);
				if (!n || t.entries.some((e) => e.key === n.key)) return null;
				t.entries.push(n), t.lineEnd = n.lineEnd;
			} else return null;
			o = a[a.length - 1].lineEnd;
		}
	}
	return a.length > 0 && i.scalar.value === "[]" ? null : {
		items: a,
		list: i,
		listEnd: o
	};
}
function H(e, t) {
	return e.entries.find((e) => e.key === t);
}
function U(e) {
	let t = V(e);
	return t ? t.items.map((e, t) => {
		let n = H(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			text: H(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === F,
			assignee: H(e, "assignee")?.scalar.value ?? null,
			due: H(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function W(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Ce(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${z}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${z}${t}: ${n}`
	};
}
function G(e, t, n, r) {
	let i = V(e)?.items[t];
	if (!i) return null;
	let a = W(r);
	if (a === null) return null;
	let o = H(i, n);
	return o ? o.scalar.value === r ? null : {
		from: o.scalar.from,
		to: o.scalar.to,
		insert: a
	} : Ce(i, n, a);
}
function we(e, t) {
	let n = U(e)?.[t];
	return n ? G(e, t, "status", n.done ? I : F) : null;
}
function Te(e, t, n) {
	return G(e, t, "text", n);
}
function Ee(e, t) {
	let n = V(e), r = n?.items[t];
	if (!n || !r) return null;
	if (n.items.length === 1) return {
		from: n.list.keyEnd,
		to: n.listEnd,
		insert: " []"
	};
	let i = n.items[t + 1];
	return i ? {
		from: r.lineStart,
		to: i.lineStart,
		insert: ""
	} : {
		from: r.lineStart - 1,
		to: n.listEnd,
		insert: ""
	};
}
function De(e, t) {
	let n = V(e);
	if (!n) return null;
	let r = W(t);
	if (r === null) return null;
	let i = `${R}status: ${I}\n${z}text: ${r}`;
	return n.items.length === 0 ? {
		from: n.list.keyEnd,
		to: n.listEnd,
		insert: `\n${i}`
	} : {
		from: n.listEnd,
		to: n.listEnd,
		insert: `\n${i}`
	};
}
function Oe(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? R : z}${e}: ${W(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function ke({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ g("button", {
		type: "button",
		role: "checkbox",
		"aria-checked": e.done,
		"aria-label": e.text || "Untitled action item",
		disabled: !t,
		"data-testid": i,
		"data-status": e.status || "none",
		onClick: r,
		className: n("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border text-[10px] leading-none transition-colors", e.done ? "border-success-border bg-success text-white" : "border-border-emphasis bg-surface", t ? "cursor-pointer hover:border-primary" : "cursor-default"),
		children: e.done ? "✓" : ""
	});
}
function Ae({ item: e, testId: t }) {
	let n = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ _(te, { children: [
		e.assignee ? /* @__PURE__ */ _("span", {
			"data-testid": `${t}-assignee`,
			className: n,
			children: ["@", e.assignee]
		}) : null,
		e.due ? /* @__PURE__ */ _("span", {
			"data-testid": `${t}-due`,
			className: n,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ g("span", {
			"data-testid": `${t}-status`,
			className: n,
			children: e.status
		}) : null
	] });
}
function je({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [o, s] = h(e.text), c = m(!1);
	if (p(() => {
		c.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ g("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ g("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let l = () => {
		o !== e.text && r?.(o);
	};
	return /* @__PURE__ */ g(a, {
		size: "sm",
		"data-testid": `${i}-text`,
		value: o,
		placeholder: "Untitled action item",
		"aria-label": "Action item text",
		onChange: (e) => s(e.target.value),
		onFocus: () => {
			c.current = !0;
		},
		onBlur: () => {
			c.current = !1, l();
		},
		onKeyDown: (t) => {
			t.key === "Enter" ? (t.preventDefault(), l(), t.target.blur()) : t.key === "Escape" && (s(e.text), t.target.blur());
		},
		className: n("min-w-0 flex-1 border-transparent bg-transparent hover:border-border", e.done && "text-text-tertiary line-through")
	});
}
function Me({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, "data-testid": c = "action-items" }) {
	let l = e.filter((e) => e.done).length;
	return /* @__PURE__ */ _("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ g("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ _("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ _("span", {
					"data-testid": `${c}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						l,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ g(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${c}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ _("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ g("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ g("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-item-${e.index}`;
					return /* @__PURE__ */ _("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ g(ke, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ g(je, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ _("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [/* @__PURE__ */ g(Ae, {
									item: e,
									testId: o
								}), t ? /* @__PURE__ */ g(r, {
									variant: "ghost",
									size: "sm",
									"aria-label": "Remove action item",
									"data-testid": `${o}-remove`,
									onClick: () => a?.(e.index),
									children: "✕"
								}) : null]
							})
						]
					}, e.index);
				})
			}), t ? /* @__PURE__ */ g("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ g(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${c}-add`,
					onClick: o,
					children: "+ Add item"
				})
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/ActionItemsMacro.tsx
var Ne = class extends S {
	items;
	constructor(e, t) {
		super(e, L), this.items = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ g(Me, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(we(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(Te(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(Ee(this.node.textContent, e)),
			onAddItem: () => this.apply(De(this.node.textContent, "")),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = U(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.items = t, n && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function Pe() {
	return {
		macroName: L,
		accepts: (e) => U(e.textContent) !== null,
		create: (e) => {
			let t = U(e.node.textContent);
			return t ? new Ne(e, t) : null;
		}
	};
}
var Fe = v.create({
	name: "actionItemsMacro",
	addStorage: D,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = Oe((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: w,
				attrs: { macroName: L },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return j(this.editor, this.name, Pe());
	}
}), K = "hitl", Ie = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", Le = "_macro", Re = "hitl", ze = /^([A-Za-z][A-Za-z0-9_-]*):/, q = "  - ", Be = "    ", Ve = /* @__PURE__ */ new Set(["then", "value"]), He = [
	"answer",
	"answeredAt",
	"answeredBy"
], Ue = "answeredBy";
function We(e) {
	let t = [], n = 0;
	for (;;) {
		let r = e.indexOf("\n", n);
		if (r === -1) return t.push({
			text: e.slice(n),
			start: n
		}), t;
		t.push({
			text: e.slice(n, r),
			start: n
		}), n = r + 1;
	}
}
function Ge(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function J(e, t, n) {
	let r = ze.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Ge(e.slice(i, a));
	return o === null ? null : {
		key: r[1],
		keyEnd: t + n + r[0].length,
		scalar: {
			value: o,
			from: t + i,
			to: t + a
		},
		lineStart: t,
		lineEnd: t + e.length
	};
}
function Y(e) {
	let t = We(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(q)) {
			if (!a) return null;
			let t = e.text.slice(4), n = J(e.text, e.start, 4);
			if (n) {
				if (!Ve.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = Ge(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(Be)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = J(e.text, e.start, 4);
			if (!n || !Ve.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = J(e.text, e.start, 0);
			if (!t || i.has(t.key)) return null;
			if (i.add(t.key), n.push(t), t.key === "options") {
				if (t.scalar.value !== "" && t.scalar.value !== "[]") return null;
				a = !0;
			} else a = !1;
		}
		let t = r[r.length - 1];
		o = Math.max(o, n[n.length - 1]?.lineEnd ?? 0, t ? t.lineEnd : 0);
	}
	let s = n.find((e) => e.key === "options");
	return s?.scalar.value === "[]" && r.length > 0 || !s && r.length > 0 ? null : {
		entries: n,
		options: r,
		end: o
	};
}
function X(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function Z(e) {
	let t = Y(e);
	if (!t) return null;
	let n = X(t, "question");
	if (!n) return null;
	let r = [];
	for (let e of t.options) {
		if (e.scalar !== null) {
			r.push({
				value: e.scalar,
				then: ""
			});
			continue;
		}
		let t = e.entries.find((e) => e.key === "value")?.scalar.value ?? "";
		if (!t) return null;
		r.push({
			value: t,
			then: e.entries.find((e) => e.key === "then")?.scalar.value ?? ""
		});
	}
	let i = t.entries.find((e) => e.key === "answer");
	return {
		id: X(t, "id"),
		question: n,
		context: X(t, "context"),
		askedBy: X(t, "askedBy"),
		assignee: X(t, "assignee"),
		blocks: X(t, "blocks"),
		expiresAt: X(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: X(t, "answeredBy"),
		answeredAt: X(t, "answeredAt")
	};
}
function Ke(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function qe(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		He.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function Je(e, t) {
	let n = e.entries.find((e) => e.key > Ue);
	return n ? {
		from: n.lineStart,
		to: n.lineStart,
		insert: `${t}\n`
	} : {
		from: e.end,
		to: e.end,
		insert: `\n${t}`
	};
}
function Ye(e, t) {
	let n = Y(e);
	if (!n || !X(n, "question")) return null;
	let r = W(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = W(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = W(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = qe(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => He.includes(e.key)) ? null : Je(n, a);
}
function Q(e) {
	let t = Y(e);
	if (!t) return null;
	let n = qe(t);
	return n ? n.to < t.end ? {
		from: n.from,
		to: n.to + 1,
		insert: ""
	} : n.from === 0 ? null : {
		from: n.from - 1,
		to: n.to,
		insert: ""
	} : null;
}
function Xe(e) {
	let t = [], n = (e) => W(e) ?? "''", r = [
		["askedBy", e.askedBy],
		["assignee", e.assignee],
		["blocks", e.blocks],
		["context", e.context],
		["expiresAt", e.expiresAt],
		["id", e.id]
	];
	for (let [e, i] of r) i && t.push(`${e}: ${n(i)}`);
	let i = e.options ?? [];
	if (i.length > 0) {
		t.push("options:");
		for (let e of i) typeof e == "string" ? t.push(`${q}${n(e)}`) : e.then ? (t.push(`${q}then: ${n(e.then)}`), t.push(`${Be}value: ${n(e.value)}`)) : t.push(`${q}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function $(e, t) {
	return e.answer === null ? Ke(e, t) ? "expired" : "waiting" : "answered";
}
var Ze = {
	waiting: {
		label: "agent waiting",
		tone: "warning"
	},
	answered: {
		label: "answered",
		tone: "success"
	},
	expired: {
		label: "expired",
		tone: "neutral"
	}
}, Qe = "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function $e({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ _("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ g(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ _("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function et({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = h(""), s = i.trim().length > 0 && !t, c = () => {
		s && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ _("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ g(o, {
			"data-testid": `${n}-draft`,
			value: i,
			rows: 2,
			disabled: t,
			"aria-label": "Answer the agent",
			placeholder: "Answer the agent — it is waiting on this…",
			onChange: (e) => a(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), c());
			}
		}), /* @__PURE__ */ g("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ g(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !s,
				onClick: c,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function tt({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, onRetract: c, onRemove: l, "data-testid": u = "hitl" }) {
	let d = $(e, n), f = Ze[d], p = d === "waiting" && t && !!a;
	return /* @__PURE__ */ _("div", {
		"data-testid": u,
		"data-phase": d,
		className: "my-3",
		children: [/* @__PURE__ */ _("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ g("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ g(i, {
					tone: f.tone,
					size: "xs",
					uppercase: !0,
					dot: d === "waiting" ? "pulse" : "static",
					"data-testid": `${u}-phase`,
					children: f.label
				}),
				/* @__PURE__ */ g("span", { className: "flex-1" }),
				t && l ? /* @__PURE__ */ g(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${u}-remove`,
					onClick: l,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ _("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ g("p", {
					"data-testid": `${u}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ g("p", {
					"data-testid": `${u}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ _("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ _("span", {
							"data-testid": `${u}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						e.assignee ? /* @__PURE__ */ _(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ g(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ _(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${u}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && d === "waiting" ? /* @__PURE__ */ _("span", {
							"data-testid": `${u}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				d === "answered" ? /* @__PURE__ */ _("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ _("span", {
							className: Qe,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ g("p", {
							"data-testid": `${u}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && c ? /* @__PURE__ */ g("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ g(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${u}-retract`,
								onClick: c,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				d === "expired" ? /* @__PURE__ */ g("p", {
					"data-testid": `${u}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ g("p", {
					"data-testid": `${u}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				p && e.options.length > 0 ? /* @__PURE__ */ g("div", {
					"data-testid": `${u}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ g($e, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${u}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				p && e.options.length === 0 ? /* @__PURE__ */ g(et, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: u
				}) : null,
				d === "waiting" && !p ? /* @__PURE__ */ g("p", {
					"data-testid": `${u}-readonly-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: e.options.length > 0 ? `Waiting on one of: ${e.options.map((e) => e.value).join(", ")}.` : "Waiting on an answer."
				}) : null
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/HitlMacro.tsx
function nt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var rt = class extends S {
	options;
	callout;
	busy = !1;
	failure = null;
	constructor(e, t, n) {
		super(e, K), this.options = n, this.callout = t, this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && Q(this.node.textContent) !== null;
		return /* @__PURE__ */ g(tt, {
			callout: this.callout,
			editable: this.editable,
			busy: this.busy,
			failure: this.failure,
			...this.options.now ? { now: this.options.now() } : {},
			onAnswer: (e) => this.answer(e),
			...e ? { onRetract: () => this.retract() } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	answer(e) {
		if ($(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = nt(this.options.answeredBy), i = Ye(this.node.textContent, {
			answer: e,
			at: n,
			...r ? { by: r } : {}
		});
		if (!this.apply(i)) return;
		this.failure = null;
		let a = this.options.onAnswered?.({
			id: t.id,
			answer: e,
			answeredAt: n,
			answeredBy: r,
			callout: t
		});
		if (!a) return;
		this.busy = !0, this.schedule();
		let o = (e) => {
			this.busy = !1, this.failure = e, e && this.retract(), this.schedule();
		};
		Promise.resolve(a).then((e) => o(e && e.ok === !1 ? e.message ?? "The answer was not recorded." : null), (e) => o(e instanceof Error ? `The answer was not recorded: ${e.message}` : "The answer was not recorded."));
	}
	retract() {
		this.apply(Q(this.node.textContent));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = Z(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.callout = t, n && t.answer !== null && (this.failure = null), n && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function it(e = {}) {
	return {
		macroName: K,
		accepts: (e) => Z(e.textContent) !== null,
		create: (t) => {
			let n = Z(t.node.textContent);
			return n ? new rt(t, n, e) : null;
		}
	};
}
var at = v.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: D,
	addCommands() {
		return { insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
			type: w,
			attrs: { macroName: K },
			content: [{
				type: "text",
				text: Xe(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return j(this.editor, this.name, it(this.options));
	}
});
//#endregion
export { L as ACTION_ITEMS_MACRO_NAME, Me as ActionItemsBlock, Fe as ActionItemsMacro, ae as CollaborativeExcalidraw, M as DIAGRAM_MACRO_NAME, ce as DiagramBlockRenderer, ve as DiagramMacro, s as DiagramPresenceBar, Re as HITL_ITEM_CATEGORY, K as HITL_MACRO_NAME, Ie as HITL_QUERYABILITY, Le as HITL_SENTINEL_SECTION, tt as HitlBlock, at as HitlMacro, fe as MACRO_NODE_NAME, T as MACRO_RENDERERS_NAME, ye as MacroRenderers, S as ReactMacroView, F as STATUS_DONE, I as STATUS_PENDING, Oe as actionItemsMacroText, Pe as actionItemsRenderer, De as addItemEdit, Ye as answerHitlEdit, le as createMacroRendererRegistry, ge as diagramMacroPluginKey, he as diagramMacroText, P as diagramRenderer, Ke as hitlExpired, Xe as hitlMacroText, $ as hitlPhase, it as hitlRenderer, A as hostsMacroNodeViews, me as isDiagramId, de as macroNodeViewPlugin, j as macroRendererPlugins, D as macroRendererStorage, k as macroRenderersFor, E as macroRenderersPluginKey, pe as newDiagramId, C as plainMacroView, U as readActionItems, N as readDiagramId, Z as readHitl, Ee as removeItemEdit, Q as retractHitlEdit, G as setItemKeyEdit, Te as setItemTextEdit, we as toggleItemEdit, c as useResolvedTheme, W as yamlScalar };
