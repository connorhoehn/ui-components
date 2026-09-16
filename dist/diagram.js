import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-BhS4-R6_.js";
import { t as i } from "./Chip-BENLwTlq.js";
import { t as a } from "./Input-DLknWXri.js";
import { t as o } from "./Textarea-Dz4doxTv.js";
import { t as s } from "./Select-CqVokE2v.js";
import { t as c } from "./Checkbox-DqN9RkXK.js";
import { t as l } from "./formatBytes-05ivRSJY.js";
import { n as u, t as d } from "./useResolvedTheme-6q3MgtPr.js";
import { Suspense as f, createElement as p, lazy as m, useCallback as h, useEffect as g, useMemo as ee, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
import { Extension as S } from "@tiptap/core";
import { NodeSelection as te, Plugin as ne, PluginKey as re, TextSelection as ie } from "@tiptap/pm/state";
import { createRoot as ae } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var oe = m(() => import("./ExcalidrawCanvas-DiVE39b8.js"));
function se({ label: e }) {
	return /* @__PURE__ */ b("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function ce(e) {
	return e.ydoc !== void 0;
}
function le(e) {
	return ce(e) ? /* @__PURE__ */ b(ue, { ...e }) : /* @__PURE__ */ b(de, { ...e });
}
function ue({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ b("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ b(f, {
			fallback: /* @__PURE__ */ b(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ b(oe, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function de({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...l }) {
	let u = _(/* @__PURE__ */ new Set()), d = h((e) => (u.current.add(e), () => {
		u.current.delete(e);
	}), []), p = h((e) => {
		u.current.forEach((t) => t(e));
	}, []), m = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), g = t({
		config: m,
		onMessage: p
	}), { ydoc: v, provider: y, synced: x } = e({
		documentId: i,
		ws: g,
		onMessage: d
	});
	return v && (o !== !0 || x) ? /* @__PURE__ */ b("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ b(f, {
			fallback: /* @__PURE__ */ b(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ b(oe, {
				ydoc: v,
				awareness: y?.awareness ?? null,
				...l
			})
		})
	}) : /* @__PURE__ */ b("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ b(se, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function fe({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ x("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ b("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ b(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ b("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ b(le, {
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
	}) : /* @__PURE__ */ b("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ x("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ b("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ b("pre", {
			className: "overflow-x-auto whitespace-pre-wrap font-mono text-xs",
			children: t
		})]
	});
}
//#endregion
//#region src/components/doc-macros/plainMacroView.ts
function pe(e) {
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
var C = "macro", me = "macroRenderers", he = new re(me);
function ge(e = []) {
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
function w() {
	return { macroRenderer: !0 };
}
var _e = /* @__PURE__ */ new WeakMap();
function ve(e) {
	let t = e.extensionManager ?? e, n = _e.get(t);
	return n || (n = ge(), _e.set(t, n)), n;
}
function ye(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === me : i.length === 0 || i[0] === t;
}
function be(e, t) {
	let n = pe(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function xe(e) {
	let t = he.get(e.state)?.macroViews;
	return t ? (t.forEach((e) => e.refresh?.()), !0) : !1;
}
function Se(e) {
	let t = /* @__PURE__ */ new Set(), n = new ne({
		key: he,
		props: { nodeViews: { [C]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return pe(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return be(n, o);
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
	return n.macroViews = t, n;
}
function T(e, t, ...n) {
	let r = ve(e);
	for (let e of n) r.register(e);
	return ye(e, t) ? [Se(r)] : [];
}
var Ce = {
	"action-items": "Action items",
	hitl: "Decision required",
	decision: "Decision",
	field: "Field",
	diagram: "Diagram"
};
function we(e) {
	return Ce[e] ?? e;
}
//#endregion
//#region src/components/doc-macros/ReactMacroView.ts
function Te(e) {
	if (!(e instanceof HTMLElement)) return !1;
	if (e.isContentEditable) return !0;
	let t = e.tagName;
	return t === "INPUT" || t === "TEXTAREA" || t === "SELECT";
}
var E = class {
	dom;
	node;
	view;
	getPos;
	host;
	root;
	dead = !1;
	queued = !1;
	constructor(e, t) {
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.dom.setAttribute("role", "group"), this.dom.setAttribute("aria-label", we(t)), this.dom.setAttribute("tabindex", "-1"), this.dom.addEventListener("keydown", this.onEscape), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = ae(this.host);
	}
	onEscape = (e) => {
		if (e.key === "Escape") {
			if (Te(e.target) && e.target !== this.dom) {
				e.stopPropagation(), this.dom.focus();
				return;
			}
			e.stopPropagation(), e.preventDefault(), this.exitToText();
		}
	};
	exitToText() {
		let e = this.getPos();
		if (e === void 0) {
			this.view.focus();
			return;
		}
		let { state: t } = this.view, n = Math.min(e + this.node.nodeSize, t.doc.content.size), r = this.proseNear(n) ?? te.create(t.doc, e);
		this.view.dispatch(t.tr.setSelection(r).scrollIntoView()), this.view.focus();
	}
	proseNear(e) {
		let { doc: t } = this.view.state, n = null, r = null;
		t.descendants((t, i) => n !== null || t.type.name === "macro" ? !1 : !t.isTextblock || (i >= e ? n = i + 1 : r = i + 1, !1));
		let i = n ?? r;
		return i === null ? null : ie.create(t, i);
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
	setAccessibleName(e) {
		this.dom.setAttribute("aria-label", e);
	}
	destroy() {
		this.dead = !0, this.dom.removeEventListener("keydown", this.onEscape);
		let e = this.root;
		queueMicrotask(() => e.unmount());
	}
}, D = "diagram", Ee = "macro";
function De() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function Oe(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function ke(e) {
	return `id: ${e}`;
}
function Ae(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return Oe(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var je = new re("diagramMacro"), Me = class extends E {
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
		super(e, D), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return p(fe, {
			diagramId: Ae(t),
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
function Ne(e) {
	return {
		macroName: D,
		create: (t) => new Me(t, e)
	};
}
var Pe = S.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: Ee,
			attrs: { macroName: D },
			content: [{
				type: "text",
				text: ke(e ?? De())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, Ne(this.options));
	}
}), Fe = S.create({
	name: me,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ...this.options.renderers);
	}
}), Ie = /^([A-Za-z][A-Za-z0-9_-]*):/, Le = "  - ", O = "    ";
function Re(e) {
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
function ze(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function Be(e, t, n) {
	let r = Ie.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = ze(e.slice(i, a));
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
function k(e, t) {
	let n = Re(e), r = 0;
	for (; r < n.length && n[r].text.trim() === "";) r += 1;
	let i = n[r];
	if (!i) return null;
	let a = Be(i.text, i.start, 0);
	if (!a || a.key !== t || a.scalar.value !== "" && a.scalar.value !== "[]") return null;
	r += 1;
	let o = [], s = a.lineEnd;
	for (; r < n.length; r += 1) {
		let e = n[r];
		if (e.text.trim() !== "") {
			if (e.text.startsWith("  - ")) {
				let t = Be(e.text, e.start, 4);
				if (!t) return null;
				o.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith("    ")) {
				let t = o[o.length - 1];
				if (!t) return null;
				let n = Be(e.text, e.start, 4);
				if (!n || t.entries.some((e) => e.key === n.key)) return null;
				t.entries.push(n), t.lineEnd = n.lineEnd;
			} else return null;
			s = o[o.length - 1].lineEnd;
		}
	}
	return o.length > 0 && a.scalar.value === "[]" ? null : {
		items: o,
		list: a,
		listEnd: s
	};
}
function A(e, t) {
	return e.entries.find((e) => e.key === t);
}
function j(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Ve(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${O}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${O}${t}: ${n}`
	};
}
function M(e, t, n, r, i) {
	let a = k(e, t)?.items[n];
	if (!a) return null;
	let o = j(i);
	if (o === null) return null;
	let s = A(a, r);
	return s ? s.scalar.value === i ? null : {
		from: s.scalar.from,
		to: s.scalar.to,
		insert: o
	} : Ve(a, r, o);
}
function He(e, t, n, r) {
	let i = k(e, t)?.items[n];
	if (!i) return null;
	let a = A(i, r);
	if (!a || i.entries.length < 2) return null;
	let o = i.entries.indexOf(a);
	if (o === 0) {
		let e = i.entries[1];
		return {
			from: a.lineStart + 4,
			to: e.lineStart + 4,
			insert: ""
		};
	}
	return {
		from: i.entries[o - 1].lineEnd,
		to: a.lineEnd,
		insert: ""
	};
}
function Ue(e, t, n) {
	let r = k(e, t), i = r?.items[n];
	if (!r || !i) return null;
	if (r.items.length === 1) return {
		from: r.list.keyEnd,
		to: r.listEnd,
		insert: " []"
	};
	let a = r.items[n + 1];
	return a ? {
		from: i.lineStart,
		to: a.lineStart,
		insert: ""
	} : {
		from: i.lineStart - 1,
		to: r.listEnd,
		insert: ""
	};
}
function We(e, t, n) {
	let r = k(e, t);
	if (!r || n.length === 0) return null;
	let i = n.map(([, e]) => j(e));
	if (i.some((e) => e === null)) return null;
	let a = n.map(([e], t) => `${t === 0 ? Le : O}${e}: ${i[t]}`).join("\n");
	return r.items.length === 0 ? {
		from: r.list.keyEnd,
		to: r.listEnd,
		insert: `\n${a}`
	} : {
		from: r.listEnd,
		to: r.listEnd,
		insert: `\n${a}`
	};
}
//#endregion
//#region src/components/doc-macros/actionItemsText.ts
var N = "items", Ge = (e) => k(e, N), Ke = "done", qe = "pending", P = "action-items", Je = "action-item";
function F(e, t, n, r) {
	return M(e, N, t, n, r);
}
function Ye(e, t, n) {
	return He(e, N, t, n);
}
function I(e) {
	let t = Ge(e);
	return t ? t.items.map((e, t) => {
		let n = A(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			id: A(e, "id")?.scalar.value ?? null,
			text: A(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === Ke,
			assignee: A(e, "assignee")?.scalar.value ?? null,
			due: A(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function Xe(e, t, n = Ze) {
	let r = Ge(e)?.items[t];
	return !r || A(r, "id") ? null : F(e, t, "id", n());
}
function Ze() {
	let e = globalThis.crypto;
	return e?.randomUUID ? e.randomUUID() : `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function Qe(e) {
	return !e.id || !e.assignee || !e.text ? null : {
		itemId: e.id,
		text: e.text,
		assigneeId: e.assignee,
		category: Je,
		dueDate: e.due,
		done: e.done
	};
}
function $e(e, t) {
	let n = I(e)?.[t];
	return n ? F(e, t, "status", n.done ? qe : Ke) : null;
}
function et(e, t, n) {
	return F(e, t, "text", n);
}
function tt(e, t) {
	return Ue(e, N, t);
}
function nt(e, t) {
	return We(e, N, [["status", qe], ["text", t]]);
}
function rt(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? Le : O}${e}: ${j(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/useDraft.ts
function L(e) {
	let [t, n] = v(e), r = _(e);
	return [
		t,
		h((e) => {
			r.current = e, n(e);
		}, []),
		h(() => r.current, [])
	];
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function it({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ b("button", {
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
function at({ value: e, people: t, onAssign: n, testId: r }) {
	let i = e ?? "", a = t.some((e) => e.id === i);
	return /* @__PURE__ */ b(s, {
		size: "sm",
		"data-testid": `${r}-assign`,
		"aria-label": "Assign this action item",
		value: i,
		onChange: (e) => n(e.target.value),
		options: [
			{
				value: "",
				label: "unassigned"
			},
			...i && !a ? [{
				value: i,
				label: `for ${i}`
			}] : [],
			...t.map((e) => ({
				value: e.id,
				label: `for ${e.name}`
			}))
		]
	});
}
var ot = /^\d{4}-\d{2}-\d{2}$/;
function st({ value: e, onDue: t, testId: n }) {
	let [i, o] = v(!1);
	return !e && !i ? /* @__PURE__ */ b(r, {
		variant: "ghost",
		size: "sm",
		"aria-label": "Set a due date",
		"data-testid": `${n}-due-add`,
		onClick: () => o(!0),
		className: "whitespace-nowrap",
		children: "+ due"
	}) : /* @__PURE__ */ b(a, {
		type: "date",
		size: "sm",
		autoFocus: i && !e,
		"data-testid": `${n}-due-set`,
		"aria-label": "Due date",
		value: e,
		onChange: (e) => t(e.target.value),
		onBlur: () => o(!1),
		className: "w-[122px] border-transparent bg-transparent tabular-nums hover:border-border"
	});
}
function ct({ item: e, testId: t, hideAssignee: n = !1, hideDue: r = !1 }) {
	let i = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ x(y, { children: [
		e.assignee && !n ? /* @__PURE__ */ x("span", {
			"data-testid": `${t}-assignee`,
			className: i,
			children: ["@", e.assignee]
		}) : null,
		e.due && !r ? /* @__PURE__ */ x("span", {
			"data-testid": `${t}-due`,
			className: i,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ b("span", {
			"data-testid": `${t}-status`,
			className: i,
			children: e.status
		}) : null
	] });
}
function lt({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [o, s, c] = L(e.text), l = _(!1);
	if (g(() => {
		l.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ b("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ b("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let u = () => {
		let t = c();
		t !== e.text && r?.(t);
	};
	return /* @__PURE__ */ b(a, {
		size: "sm",
		"data-testid": `${i}-text`,
		value: o,
		placeholder: "Untitled action item",
		"aria-label": "Action item text",
		onChange: (e) => s(e.target.value),
		onFocus: () => {
			l.current = !0;
		},
		onBlur: () => {
			l.current = !1, u();
		},
		onKeyDown: (t) => {
			t.key === "Enter" ? (t.preventDefault(), u(), t.target.blur()) : t.key === "Escape" && (s(e.text), t.target.blur());
		},
		className: n("min-w-0 flex-1 border-transparent bg-transparent hover:border-border", e.done && "text-text-tertiary line-through")
	});
}
function ut({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, people: c, onAssign: l, onDue: u, "data-testid": d = "action-items" }) {
	let f = e.filter((e) => e.done).length;
	return /* @__PURE__ */ x("div", {
		"data-testid": d,
		className: "my-3",
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ b("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ x("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [/* @__PURE__ */ x("span", {
					"data-testid": `${d}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						f,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ b(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${d}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ x("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ b("p", {
				"data-testid": `${d}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ b("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${d}-item-${e.index}`;
					return /* @__PURE__ */ x("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ b(it, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ b(lt, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ x("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [
									t && c && l ? /* @__PURE__ */ b(at, {
										value: e.assignee,
										people: c,
										onAssign: (t) => l(e.index, t),
										testId: o
									}) : null,
									t && u && (e.due === null || ot.test(e.due)) ? /* @__PURE__ */ b(st, {
										value: e.due ?? "",
										onDue: (t) => u(e.index, t),
										testId: o
									}) : null,
									/* @__PURE__ */ b(ct, {
										item: e,
										testId: o,
										hideAssignee: !!(t && c && l),
										hideDue: !!(t && u && (e.due === null || ot.test(e.due)))
									}),
									t ? /* @__PURE__ */ b(r, {
										variant: "ghost",
										size: "sm",
										"aria-label": "Remove action item",
										"data-testid": `${o}-remove`,
										onClick: () => a?.(e.index),
										children: "✕"
									}) : null
								]
							})
						]
					}, e.index);
				})
			}), t ? /* @__PURE__ */ b("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ b(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${d}-add`,
					onClick: o,
					children: "+ Add item"
				})
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/ActionItemsMacro.tsx
var dt = class extends E {
	options;
	items;
	constructor(e, t, n = {}) {
		super(e, P), this.options = n, this.items = t, this.report(), this.schedule();
	}
	report() {
		let e = this.options.onItemChanged;
		if (e) for (let t of this.items) {
			let n = Qe(t);
			n && e(n);
		}
	}
	element() {
		let e = this.options.people?.() ?? [];
		return /* @__PURE__ */ b(ut, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply($e(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(et(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(tt(this.node.textContent, e)),
			onAddItem: () => this.apply(nt(this.node.textContent, "")),
			...e.length ? { people: e } : {},
			...e.length ? { onAssign: (e, t) => this.assign(e, t) } : {},
			...this.editable ? { onDue: (e, t) => this.due(e, t) } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	assign(e, t) {
		if (!t) {
			this.apply(Ye(this.node.textContent, e, "assignee"));
			return;
		}
		this.apply(Xe(this.node.textContent, e)), this.apply(F(this.node.textContent, e, "assignee", t));
	}
	due(e, t) {
		this.apply(t ? F(this.node.textContent, e, "due", t) : Ye(this.node.textContent, e, "due"));
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = I(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.items = t, n && (this.report(), this.schedule()), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function ft(e = {}) {
	return {
		macroName: P,
		accepts: (e) => I(e.textContent) !== null,
		create: (t) => {
			let n = I(t.node.textContent);
			return n ? new dt(t, n, e) : null;
		}
	};
}
var pt = S.create({
	name: "actionItemsMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = rt((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: C,
				attrs: { macroName: P },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ft(this.options));
	}
}), R = "hitl", mt = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", ht = "The body owns the ask and is projected to the row; the row owns whether an answer stuck. An answered row fills an unanswered body; an answered body is never overwritten, only reported.", gt = "_macro", _t = gt, vt = "hitl", yt = /^([A-Za-z][A-Za-z0-9_-]*):/, z = "  - ", bt = "    ", xt = /* @__PURE__ */ new Set(["then", "value"]), St = [
	"answer",
	"answeredAt",
	"answeredBy"
], Ct = "answeredBy";
function wt(e) {
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
function Tt(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function Et(e, t, n) {
	let r = yt.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Tt(e.slice(i, a));
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
function B(e) {
	let t = wt(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(z)) {
			if (!a) return null;
			let t = e.text.slice(4), n = Et(e.text, e.start, 4);
			if (n) {
				if (!xt.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = Tt(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(bt)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = Et(e.text, e.start, 4);
			if (!n || !xt.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = Et(e.text, e.start, 0);
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
function V(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function H(e) {
	let t = B(e);
	if (!t) return null;
	let n = V(t, "question");
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
		id: V(t, "id"),
		question: n,
		context: V(t, "context"),
		askedBy: V(t, "askedBy"),
		assignee: V(t, "assignee"),
		blocks: V(t, "blocks"),
		expiresAt: V(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: V(t, "answeredBy"),
		answeredAt: V(t, "answeredAt")
	};
}
function Dt(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function Ot(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		St.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function kt(e, t) {
	let n = e.entries.find((e) => e.key > Ct);
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
function At(e, t) {
	let n = B(e);
	if (!n || !V(n, "question")) return null;
	let r = j(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = j(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = j(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = Ot(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => St.includes(e.key)) ? null : kt(n, a);
}
function jt(e) {
	let t = B(e);
	if (!t) return null;
	let n = Ot(t);
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
function Mt(e) {
	let t = [], n = (e) => j(e) ?? "''", r = [
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
		for (let e of i) typeof e == "string" ? t.push(`${z}${n(e)}`) : e.then ? (t.push(`${z}then: ${n(e.then)}`), t.push(`${bt}value: ${n(e.value)}`)) : t.push(`${z}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
function Nt(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	return r ? {
		from: r.lineStart,
		to: r.lineStart,
		insert: `${t}: ${n}\n`
	} : {
		from: e.end,
		to: e.end,
		insert: `\n${t}: ${n}`
	};
}
function Pt(e, t) {
	return t.lineEnd < e.end ? {
		from: t.lineStart,
		to: t.lineEnd + 1
	} : t.lineStart === 0 ? {
		from: 0,
		to: t.lineEnd
	} : {
		from: t.lineStart - 1,
		to: t.lineEnd
	};
}
function Ft(e, t) {
	let n = B(e);
	if (!n || !V(n, "question")) return null;
	let r = n.entries.find((e) => e.key === "assignee");
	if (t === "") {
		if (!r) return null;
		let e = Pt(n, r);
		return {
			from: e.from,
			to: e.to,
			insert: ""
		};
	}
	let i = j(t);
	return i === null ? null : r ? r.scalar.value === t ? null : {
		from: r.scalar.from,
		to: r.scalar.to,
		insert: i
	} : Nt(n, "assignee", i);
}
function It(e) {
	return !e.id || !e.assignee || !e.question ? null : {
		itemId: e.id,
		text: e.question,
		assigneeId: e.assignee,
		category: vt
	};
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function Lt(e, t) {
	return e.answer === null ? Dt(e, t) ? "expired" : "waiting" : "answered";
}
var Rt = {
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
}, zt = "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function Bt({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ x("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ b(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ x("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function Vt({ value: e, people: t, disabled: n, onAssign: r, testId: i }) {
	let a = t.some((t) => t.id === e);
	return /* @__PURE__ */ b(s, {
		size: "sm",
		"data-testid": `${i}-assign`,
		"aria-label": "Who is being asked",
		value: e,
		disabled: n,
		onChange: (e) => r(e.target.value),
		options: [
			{
				value: "",
				label: "unassigned"
			},
			...e && !a ? [{
				value: e,
				label: `for ${e}`
			}] : [],
			...t.map((e) => ({
				value: e.id,
				label: `for ${e.name}`
			}))
		]
	});
}
function Ht({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = v(""), s = i.trim().length > 0 && !t, c = () => {
		s && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ x("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ b(o, {
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
		}), /* @__PURE__ */ b("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ b(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !s,
				onClick: c,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function Ut({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, people: c, onAssign: l, onRetract: u, onRemove: d, "data-testid": f = "hitl" }) {
	let p = Lt(e, n), m = Rt[p], h = p === "waiting" && t && !!a, g = p === "waiting" && t && !!l && (c?.length ?? 0) > 0;
	return /* @__PURE__ */ x("div", {
		"data-testid": f,
		"data-phase": p,
		className: "my-3",
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ b("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ b(i, {
					tone: m.tone,
					size: "xs",
					uppercase: !0,
					dot: p === "waiting" ? "pulse" : "static",
					"data-testid": `${f}-phase`,
					children: m.label
				}),
				/* @__PURE__ */ b("span", { className: "flex-1" }),
				t && d ? /* @__PURE__ */ b(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${f}-remove`,
					onClick: d,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ b("p", {
					"data-testid": `${f}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ b("p", {
					"data-testid": `${f}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ x("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ x("span", {
							"data-testid": `${f}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						g ? /* @__PURE__ */ b(Vt, {
							value: e.assignee,
							people: c ?? [],
							disabled: o,
							onAssign: (e) => l?.(e),
							testId: f
						}) : e.assignee ? /* @__PURE__ */ x(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ b(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ x(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${f}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && p === "waiting" ? /* @__PURE__ */ x("span", {
							"data-testid": `${f}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				p === "answered" ? /* @__PURE__ */ x("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ x("span", {
							className: zt,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ b("p", {
							"data-testid": `${f}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && u ? /* @__PURE__ */ b("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ b(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${f}-retract`,
								onClick: u,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				p === "expired" ? /* @__PURE__ */ b("p", {
					"data-testid": `${f}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ b("p", {
					"data-testid": `${f}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				h && e.options.length > 0 ? /* @__PURE__ */ b("div", {
					"data-testid": `${f}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ b(Bt, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${f}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				h && e.options.length === 0 ? /* @__PURE__ */ b(Ht, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: f
				}) : null,
				p === "waiting" && !h ? /* @__PURE__ */ b("p", {
					"data-testid": `${f}-readonly-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: e.options.length > 0 ? `Waiting on one of: ${e.options.map((e) => e.value).join(", ")}.` : "Waiting on an answer."
				}) : null
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/HitlMacro.tsx
function Wt(e) {
	return [
		e.id,
		e.assignee,
		e.question,
		e.answer === null ? "" : "answered"
	].join("\0");
}
function Gt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var Kt = class extends E {
	options;
	callout;
	busy = !1;
	failure = null;
	signature;
	constructor(e, t, n) {
		super(e, R), this.options = n, this.callout = t, this.signature = Wt(t), this.options.onCalloutChanged?.(t), this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && jt(this.node.textContent) !== null;
		return /* @__PURE__ */ b(Ut, {
			callout: this.callout,
			editable: this.editable,
			busy: this.busy,
			failure: this.failure,
			...this.options.now ? { now: this.options.now() } : {},
			onAnswer: (e) => this.answer(e),
			...this.options.people ? { people: this.options.people() } : {},
			onAssign: (e) => this.assign(e),
			...e ? { onRetract: () => this.retract() } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	answer(e) {
		if (Lt(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = Gt(this.options.answeredBy), i = At(this.node.textContent, {
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
		this.apply(jt(this.node.textContent));
	}
	assign(e) {
		this.busy || this.apply(Ft(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = H(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		this.node = e, this.callout = t, n && t.answer !== null && (this.failure = null), n && this.schedule();
		let r = Wt(t);
		return r !== this.signature && (this.signature = r, this.options.onCalloutChanged?.(t)), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function qt(e = {}) {
	return {
		macroName: R,
		accepts: (e) => H(e.textContent) !== null,
		create: (t) => {
			let n = H(t.node.textContent);
			return n ? new Kt(t, n, e) : null;
		}
	};
}
var Jt = S.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return {
			insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
				type: C,
				attrs: { macroName: R },
				content: [{
					type: "text",
					text: Mt(e)
				}]
			}, { type: "paragraph" }]),
			answerHitl: (e) => ({ state: t, tr: n, dispatch: r }) => {
				let i = t.schema.nodes[C];
				if (!i || !e.id || !e.answer) return !1;
				let a = !1;
				return t.doc.descendants((o, s) => {
					if (a) return !1;
					if (o.type !== i) return;
					if (o.attrs.macroName !== "hitl") return !1;
					let c = H(o.textContent);
					if (!c || c.id !== e.id || c.answer !== null) return !1;
					let l = At(o.textContent, {
						answer: e.answer,
						...e.answeredAt ? { at: e.answeredAt } : {},
						...e.answeredBy ? { by: e.answeredBy } : {}
					});
					if (!l) return !1;
					if (a = !0, r) {
						let e = s + 1;
						l.insert === "" ? n.delete(e + l.from, e + l.to) : n.replaceWith(e + l.from, e + l.to, t.schema.text(l.insert));
					}
					return !1;
				}), a;
			}
		};
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, qt(this.options));
	}
}), U = "decision", Yt = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], Xt = new Set(Yt), Zt = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", Qt = /^([A-Za-z][A-Za-z0-9_-]*):/, W = "  - ";
function $t(e) {
	let t = e.trim();
	return t === "" ? "" : t === "|" || t === ">" || t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function G(e) {
	let t = [], n = [], r = 0, i = !1;
	for (let a of e.split("\n")) {
		let e = r, o = r + a.length;
		if (r = o + 1, a.trim() === "") {
			i = !1;
			continue;
		}
		if (i && a.startsWith(W)) {
			let e = $t(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = Qt.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = $t(c);
		if (l === null) return null;
		let u = c.length - c.trimStart().length;
		t.push({
			key: s[1],
			value: l,
			valueFrom: e + s[0].length + u,
			valueTo: o,
			lineStart: e,
			lineEnd: o
		});
	}
	return t.length === 0 ? null : {
		entries: t,
		alternatives: n,
		end: e.length
	};
}
function K(e, t) {
	return e.entries.find((e) => e.key === t)?.value ?? "";
}
function q(e) {
	let t = G(e);
	if (!t) return null;
	let n = K(t, "decision");
	if (!n) return null;
	let r = K(t, "status");
	return r !== "" && !Xt.has(r) ? null : {
		decision: n,
		status: r || "proposed",
		rationale: K(t, "rationale"),
		alternatives: t.alternatives,
		decidedBy: K(t, "decidedBy"),
		decidedAt: K(t, "decidedAt"),
		supersededBy: K(t, "supersededBy"),
		id: K(t, "id")
	};
}
function en(e) {
	return q(e) !== null;
}
function tn(e, t, n) {
	let r = e.entries.find((e) => e.key > t && e.key !== "alternatives");
	if (r) return {
		from: r.lineStart,
		to: r.lineStart,
		insert: `${t}: ${n}\n`
	};
	let i = e.entries.find((e) => e.key === "alternatives");
	return i ? {
		from: i.lineStart,
		to: i.lineStart,
		insert: `${t}: ${n}\n`
	} : {
		from: e.end,
		to: e.end,
		insert: `\n${t}: ${n}`
	};
}
function J(e, t, n) {
	let r = j(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : tn(e, t, r);
}
function nn(e, t) {
	let n = G(e);
	return !n || !K(n, "decision") || !Xt.has(t) ? null : J(n, "status", t);
}
function rn(e, t) {
	let n = G(e);
	return n ? t.by ? J(n, "decidedBy", t.by) : t.at ? J(n, "decidedAt", t.at) : null : null;
}
function an(e, t) {
	let n = G(e);
	return !n || !K(n, "decision") ? null : J(n, "supersededBy", t);
}
function on(e) {
	let t = [], n = (e, n) => {
		if (!n) return;
		let r = j(n);
		r !== null && t.push(`${e}: ${r}`);
	};
	n("decidedAt", e.decidedAt), n("decidedBy", e.decidedBy), n("decision", e.decision), n("id", e.id), n("rationale", e.rationale), n("status", e.status ?? "proposed");
	let r = (e.alternatives ?? []).filter((e) => e.trim() !== "");
	if (r.length > 0) {
		t.push("alternatives:");
		for (let e of r) {
			let n = j(e);
			n !== null && t.push(`${W}${n}`.replace(W, W));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var sn = {
	proposed: {
		label: "Proposed",
		tone: "info",
		hint: "Not decided yet"
	},
	accepted: {
		label: "Accepted",
		tone: "success",
		hint: "In force"
	},
	rejected: {
		label: "Rejected",
		tone: "danger",
		hint: "Never adopted"
	},
	superseded: {
		label: "Superseded",
		tone: "neutral",
		hint: "Was in force, replaced"
	}
};
function cn({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: o, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = v(""), d = sn[e.status], f = e.status === "rejected";
	return /* @__PURE__ */ x("div", {
		"data-testid": c,
		"data-status": e.status,
		className: "my-3",
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ b("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Decision"
				}),
				/* @__PURE__ */ b(i, {
					tone: d.tone,
					size: "sm",
					"data-testid": `${c}-status`,
					children: d.label
				}),
				/* @__PURE__ */ b("span", {
					className: "text-[11px] text-text-tertiary",
					children: d.hint
				}),
				/* @__PURE__ */ b("span", { className: "flex-1" }),
				t && s && /* @__PURE__ */ b("button", {
					type: "button",
					"aria-label": "Remove this decision",
					onClick: s,
					className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
					children: "✕"
				})
			]
		}), /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ b("p", {
					"data-testid": `${c}-claim`,
					className: f ? "m-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through" : "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.decision
				}),
				e.rationale && /* @__PURE__ */ b("p", {
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.rationale
				}),
				e.alternatives.length > 0 && /* @__PURE__ */ x("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ b("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Also considered"
					}), /* @__PURE__ */ b("ul", {
						className: "m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary",
						children: e.alternatives.map((e, t) => /* @__PURE__ */ b("li", { children: e }, `${e}-${t}`))
					})]
				}),
				(e.decidedBy || e.decidedAt) && /* @__PURE__ */ x("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.decidedBy && /* @__PURE__ */ b("span", { children: e.decidedBy }),
						e.decidedBy && e.decidedAt && /* @__PURE__ */ b("span", { children: "·" }),
						e.decidedAt && /* @__PURE__ */ b("span", { children: e.decidedAt })
					]
				}),
				e.status === "superseded" && e.supersededBy && /* @__PURE__ */ x("p", {
					"data-testid": `${c}-superseded-by`,
					className: "m-0 text-[12px] leading-snug text-text-secondary",
					children: ["Replaced by ", /* @__PURE__ */ b("span", {
						className: "font-medium",
						children: e.supersededBy
					})]
				}),
				t && o && e.status === "superseded" && !e.supersededBy && /* @__PURE__ */ x("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ b(a, {
						"aria-label": "What replaced this decision",
						placeholder: "Replaced by…",
						value: l,
						onChange: (e) => u(e.target.value),
						"data-testid": `${c}-superseded-input`
					}), /* @__PURE__ */ b(r, {
						size: "sm",
						variant: "secondary",
						className: "shrink-0 whitespace-nowrap",
						disabled: l.trim() === "",
						onClick: () => {
							o(l.trim()), u("");
						},
						children: "Record"
					})]
				}),
				t && n && /* @__PURE__ */ b("div", {
					role: "group",
					"aria-label": "Decision status",
					className: "flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: Yt.map((t) => /* @__PURE__ */ b(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						onClick: () => {
							t !== e.status && n(t);
						},
						"data-testid": `${c}-set-${t}`,
						children: sn[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function ln(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function un(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var dn = class extends E {
	options;
	decision;
	constructor(e, t, n) {
		super(e, U), this.options = n, this.decision = t, this.name(t), this.schedule();
	}
	name(e) {
		this.setAccessibleName(`Decision, ${e.status}: ${e.decision}`);
	}
	element() {
		return /* @__PURE__ */ b(cn, {
			decision: this.decision,
			editable: this.editable,
			...this.editable ? { onStatusChange: (e) => this.setStatus(e) } : {},
			...this.editable ? { onSupersededBy: (e) => this.setSupersededBy(e) } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	setStatus(e) {
		if (!this.apply(nn(this.node.textContent, e))) return;
		let t = ln(this.options.decidedBy);
		t && this.apply(rn(this.node.textContent, { by: t })), this.apply(rn(this.node.textContent, { at: un(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(an(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = q(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.decision = t, n && (this.name(t), this.schedule()), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function fn(e = {}) {
	return {
		macroName: U,
		accepts: (e) => q(e.textContent) !== null,
		create: (t) => {
			let n = q(t.node.textContent);
			return n ? new dn(t, n, e) : null;
		}
	};
}
var pn = S.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: U },
			content: [{
				type: "text",
				text: on(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, fn(this.options));
	}
}), Y = "field", mn = [
	"text",
	"date",
	"number",
	"boolean"
], hn = new Set(mn), gn = "The body is the record and there is no mirror. A field index, if one is ever wanted, is a scan over document bodies — not a write-through that can go stale and misreport a real number.", _n = /^([A-Za-z][A-Za-z0-9_-]*):/;
function vn(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function yn(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = n, i = n + r.length;
		if (n = i + 1, r.trim() === "") continue;
		let a = _n.exec(r);
		if (!a) return null;
		let o = r.slice(a[0].length), s = vn(o);
		if (s === null) return null;
		let c = o.length - o.trimStart().length;
		t.push({
			key: a[1],
			value: s,
			valueFrom: e + a[0].length + c,
			valueTo: i,
			lineStart: e,
			lineEnd: i
		});
	}
	return t.length === 0 ? null : {
		entries: t,
		end: e.length
	};
}
function X(e, t) {
	return e.entries.find((e) => e.key === t);
}
function bn(e) {
	for (let t of [
		"label",
		"type",
		"value"
	]) if (e.entries.filter((e) => e.key === t).length > 1) return !0;
	return !1;
}
var xn = /^\d{4}-\d{2}-\d{2}$/;
function Sn(e, t) {
	switch (e) {
		case "text": return !0;
		case "boolean": return t === "true" || t === "false";
		case "number": return t.trim() !== "" && Number.isFinite(Number(t));
		case "date": {
			if (!xn.test(t)) return !1;
			let e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
			return !Number.isNaN(e.getTime()) && e.toISOString().slice(0, 10) === t;
		}
	}
}
function Z(e) {
	let t = yn(e);
	if (!t || bn(t)) return null;
	let n = X(t, "label")?.value ?? "";
	if (!n) return null;
	let r = X(t, "type")?.value ?? "";
	if (r !== "" && !hn.has(r)) return null;
	let i = r || "text", a = X(t, "value")?.value;
	return {
		label: n,
		type: i,
		value: a,
		valid: a === void 0 || Sn(i, a)
	};
}
function Cn(e) {
	return Z(e) !== null;
}
function wn(e) {
	if (e.value === void 0 || e.type !== "number" || e.value.trim() === "") return;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : void 0;
}
function Tn(e) {
	if (e.value !== void 0 && e.type === "boolean") {
		if (e.value === "true") return !0;
		if (e.value === "false") return !1;
	}
}
function En(e) {
	return e.value === void 0 || e.type !== "date" ? "" : Sn("date", e.value) ? e.value : "";
}
function Dn(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function On(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function kn(e) {
	if (e.value === void 0) return "";
	if (!e.valid) return e.value;
	switch (e.type) {
		case "date": return Dn(e.value);
		case "number": {
			let t = wn(e);
			return t === void 0 ? e.value : On(t);
		}
		case "boolean": return e.value === "true" ? "Yes" : "No";
		case "text": return e.value;
	}
}
function An(e, t) {
	return Sn(e, t) ? e === "boolean" ? t : e === "number" ? t.trim() : j(t) : j(t);
}
function jn(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	return r ? {
		from: r.lineStart,
		to: r.lineStart,
		insert: `${t}: ${n}\n`
	} : {
		from: e.end,
		to: e.end,
		insert: `\n${t}: ${n}`
	};
}
function Mn(e, t, n, r) {
	if (r === null) return null;
	let i = X(e, t);
	return i ? i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : jn(e, t, r);
}
function Nn(e, t) {
	return t.lineEnd < e.end ? {
		from: t.lineStart,
		to: t.lineEnd + 1,
		insert: ""
	} : {
		from: Math.max(0, t.lineStart - 1),
		to: t.lineEnd,
		insert: ""
	};
}
function Pn(e, t) {
	let n = yn(e);
	if (!n || bn(n) || !X(n, "label")?.value) return null;
	let r = X(n, "value");
	if (t === void 0) return r ? Nn(n, r) : null;
	let i = X(n, "type")?.value ?? "";
	return i !== "" && !hn.has(i) ? null : Mn(n, "value", t, An(i || "text", t));
}
function Fn(e, t) {
	let n = yn(e);
	return !n || bn(n) || !X(n, "label")?.value || t.trim() === "" ? null : Mn(n, "label", t, j(t));
}
function In(e, t) {
	let n = yn(e);
	return !n || bn(n) || !X(n, "label")?.value || !hn.has(t) ? null : Mn(n, "type", t, t);
}
function Ln(e) {
	let t = e.type ?? "text", n = [`label: ${j(e.label) ?? j(e.label.split("\n")[0] ?? "") ?? "''"}`, `type: ${t}`];
	if (e.value !== void 0) {
		let r = An(t, e.value);
		r !== null && n.push(`value: ${r}`);
	}
	return n.join("\n");
}
//#endregion
//#region src/components/doc-macros/FieldBlock.tsx
var Rn = {
	text: "Text",
	date: "Date",
	number: "Number",
	boolean: "Yes / no"
}, zn = {
	text: "not text",
	date: "not a date",
	number: "not a number",
	boolean: "not yes / no"
};
function Bn({ field: e, editable: t = !1, onValueChange: n, onLabelChange: r, onTypeChange: o, onRemove: l, testId: u = "field-block" }) {
	let [d, f, p] = L(null), [m, h, g] = L(null), ee = e.value === void 0 ? "empty" : e.valid ? "set" : "invalid";
	if (!t) {
		let t = kn(e);
		return /* @__PURE__ */ x("div", {
			"data-testid": u,
			"data-field-type": e.type,
			"data-field-state": ee,
			className: "my-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
			children: [
				/* @__PURE__ */ b("span", {
					"data-testid": `${u}-label`,
					className: "min-w-[7.5rem] text-[12px] font-medium text-text-secondary",
					children: e.label
				}),
				t ? /* @__PURE__ */ b("span", {
					"data-testid": `${u}-value`,
					className: "text-[13.5px] leading-snug text-text-primary",
					children: t
				}) : /* @__PURE__ */ b("span", {
					"data-testid": `${u}-empty`,
					className: "text-[12px] italic text-text-tertiary",
					children: "Not set"
				}),
				!e.valid && /* @__PURE__ */ b(i, {
					tone: "warning",
					size: "xs",
					"data-testid": `${u}-invalid`,
					children: zn[e.type]
				})
			]
		});
	}
	let _ = () => {
		let t = p();
		f(null), t !== null && t.trim() !== "" && t !== e.label && r?.(t);
	}, v = () => {
		let t = g();
		h(null), t !== null && t !== (e.value ?? "") && n?.(t === "" ? void 0 : t);
	}, y = (e, t) => ({ onKeyDown: (n) => {
		n.key === "Enter" && (n.preventDefault(), e(), n.currentTarget.blur()), n.key === "Escape" && (n.preventDefault(), t(), n.currentTarget.blur());
	} }), S = m ?? e.value ?? "", te = () => {
		if (!e.valid) return /* @__PURE__ */ b(a, {
			size: "sm",
			invalid: !0,
			"aria-label": `${e.label} (value)`,
			"data-testid": `${u}-raw-input`,
			className: "w-[11rem]",
			value: S,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...y(v, () => h(null))
		});
		if (e.type === "boolean") {
			let t = Tn(e);
			return /* @__PURE__ */ x("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ b(c, {
					checked: t === !0,
					indeterminate: t === void 0,
					"aria-label": e.label,
					"data-testid": `${u}-checkbox`,
					onChange: (e) => n?.(e ? "true" : "false")
				}), /* @__PURE__ */ b("span", {
					className: "text-[12px] text-text-secondary",
					children: t === void 0 ? "Not set" : t ? "Yes" : "No"
				})]
			});
		}
		if (e.type === "date") {
			let t = En(e), r = m ?? t, i = () => {
				let e = g();
				h(null), e !== null && e !== t && n?.(e.trim() === "" ? void 0 : e.trim());
			};
			return /* @__PURE__ */ x("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ b(a, {
					size: "sm",
					type: "text",
					inputMode: "numeric",
					"aria-label": e.label,
					"data-testid": `${u}-date-input`,
					className: "w-[9.5rem] !border-transparent !bg-transparent !shadow-none tabular-nums hover:!border-border focus:!border-border",
					placeholder: "YYYY-MM-DD",
					value: r,
					onChange: (e) => {
						let t = e.target.value;
						t === "" || /^\d{4}-\d{2}-\d{2}$/.test(t) ? (h(null), n?.(t || void 0)) : h(t);
					},
					onBlur: i,
					...y(i, () => h(null))
				}), t && /* @__PURE__ */ b("span", {
					"data-testid": `${u}-formatted`,
					className: "text-[12px] tabular-nums text-text-tertiary",
					children: Dn(t)
				})]
			});
		}
		return /* @__PURE__ */ b(a, {
			size: "sm",
			type: e.type === "number" ? "number" : "text",
			"aria-label": e.label,
			"data-testid": `${u}-input`,
			className: `${e.type === "number" ? "w-[8rem]" : "w-[13rem]"} !border-transparent !bg-transparent !shadow-none hover:!border-border focus:!border-border`,
			placeholder: "Not set",
			value: S,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...y(v, () => h(null))
		});
	};
	return /* @__PURE__ */ x("div", {
		"data-testid": u,
		"data-field-type": e.type,
		"data-field-state": ee,
		className: "group my-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md -mx-1 px-1 hover:bg-surface-hover/60 focus-within:bg-surface-hover/60",
		children: [
			/* @__PURE__ */ b(a, {
				size: "sm",
				"aria-label": "Field name",
				"data-testid": `${u}-label-input`,
				className: "w-[9rem] font-medium !border-transparent !bg-transparent !shadow-none text-text-secondary hover:!border-border focus:!border-border",
				value: d ?? e.label,
				onChange: (e) => f(e.target.value),
				onBlur: _,
				...y(_, () => f(null))
			}),
			te(),
			!e.valid && /* @__PURE__ */ b(i, {
				tone: "warning",
				size: "xs",
				"data-testid": `${u}-invalid`,
				children: zn[e.type]
			}),
			e.value !== void 0 && /* @__PURE__ */ b("button", {
				type: "button",
				"data-testid": `${u}-clear`,
				onClick: () => n?.(void 0),
				className: "rounded px-1 text-[12px] text-text-tertiary hover:text-text-primary",
				children: "Clear"
			}),
			/* @__PURE__ */ b(s, {
				size: "sm",
				"aria-label": "Field type",
				"data-testid": `${u}-type`,
				className: "w-[7.5rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
				value: e.type,
				options: mn.map((e) => ({
					value: e,
					label: Rn[e]
				})),
				onChange: (e) => o?.(e.target.value)
			}),
			/* @__PURE__ */ b("span", { className: "flex-1" }),
			l && /* @__PURE__ */ b("button", {
				type: "button",
				"aria-label": "Remove this field",
				"data-testid": `${u}-remove`,
				onClick: l,
				className: "rounded px-1 text-[13px] leading-none text-text-tertiary opacity-0 transition-opacity hover:text-danger-fg group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
				children: "✕"
			})
		]
	});
}
//#endregion
//#region src/components/doc-macros/FieldMacro.tsx
var Vn = class extends E {
	field;
	constructor(e, t) {
		super(e, Y), this.field = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ b(Bn, {
			field: this.field,
			editable: this.editable,
			...this.editable ? {
				onValueChange: (e) => this.apply(Pn(this.node.textContent, e)),
				onLabelChange: (e) => this.apply(Fn(this.node.textContent, e)),
				onTypeChange: (e) => this.apply(In(this.node.textContent, e)),
				onRemove: () => this.removeBlock()
			} : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "field") return !1;
		let t = Z(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.field = t, n && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function Hn() {
	return {
		macroName: Y,
		accepts: (e) => Z(e.textContent) !== null,
		create: (e) => {
			let t = Z(e.node.textContent);
			return t ? new Vn(e, t) : null;
		}
	};
}
var Un = S.create({
	name: "fieldMacro",
	addStorage: w,
	addCommands() {
		return { insertField: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.label || e.label.trim() === "" ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: Y },
			content: [{
				type: "text",
				text: Ln(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, Hn());
	}
}), Q = "links", Wn = "links", Gn = [
	"http:",
	"https:",
	"mailto:"
];
function Kn(e) {
	let t = e.trim();
	if (!t) return null;
	let n = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) ? t : t.startsWith("//") ? null : `https://${t}`;
	if (n === null) return null;
	try {
		let e = new URL(n);
		return Gn.includes(e.protocol) ? e.href : null;
	} catch {
		return null;
	}
}
function qn(e) {
	let t = k(e, Q);
	return t ? t.items.map((e, t) => ({
		index: t,
		label: A(e, "label")?.scalar.value ?? "",
		url: A(e, "url")?.scalar.value ?? ""
	})) : null;
}
function Jn(e, t, n) {
	return M(e, Q, t, "label", n);
}
function Yn(e, t, n) {
	return M(e, Q, t, "url", n);
}
function Xn(e, t) {
	return Ue(e, Q, t);
}
function Zn(e, t = "", n = "") {
	return We(e, Q, [["label", t], ["url", n]]);
}
function Qn(e) {
	return e.length === 0 ? "links: []" : ["links:", ...e.map((e) => [["label", e.label ?? ""], ["url", e.url ?? ""]].map(([e, t], n) => `${n === 0 ? "  - " : "    "}${e}: ${j(t) ?? "''"}`).join("\n"))].join("\n");
}
//#endregion
//#region src/components/doc-macros/LinksBlock.tsx
function $n({ value: e, placeholder: t, ariaLabel: r, onCommit: i, testId: o, className: s }) {
	let [c, l, u] = L(e), d = _(!1);
	g(() => {
		d.current || l(e);
	}, [e]);
	let f = () => {
		let t = u();
		t !== e && i(t);
	};
	return /* @__PURE__ */ b(a, {
		size: "sm",
		"data-testid": o,
		value: c,
		placeholder: t,
		"aria-label": r,
		onChange: (e) => l(e.target.value),
		onFocus: () => {
			d.current = !0;
		},
		onBlur: () => {
			d.current = !1, f();
		},
		onKeyDown: (t) => {
			t.key === "Enter" ? (t.preventDefault(), f(), t.target.blur()) : t.key === "Escape" && (l(e), t.target.blur());
		},
		className: n("border-transparent bg-transparent hover:border-border", s)
	});
}
function er({ row: e, testId: t }) {
	let n = Kn(e.url), r = e.label || e.url || "Untitled link";
	return n ? /* @__PURE__ */ b("a", {
		"data-testid": `${t}-anchor`,
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "text-[13px] leading-5 text-info underline decoration-info/40 underline-offset-2 hover:decoration-info",
		children: r
	}) : /* @__PURE__ */ x("span", {
		"data-testid": `${t}-text`,
		className: "text-[13px] leading-5 text-text-primary",
		children: [r, e.url ? /* @__PURE__ */ b("span", {
			className: "ml-1.5 text-[11px] text-text-tertiary",
			children: e.url
		}) : null]
	});
}
function tr({ rows: e, editable: t = !1, onLabelChange: n, onUrlChange: i, onRemoveRow: a, onAddRow: o, onRemove: s, "data-testid": c = "links" }) {
	return /* @__PURE__ */ x("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ x("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ b("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Links"
			}), t && s ? /* @__PURE__ */ b(r, {
				variant: "ghost",
				size: "sm",
				"data-testid": `${c}-remove`,
				onClick: s,
				children: "Remove"
			}) : null]
		}), /* @__PURE__ */ x("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ b("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No links yet."
			}) : /* @__PURE__ */ b("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-row-${e.index}`;
					return /* @__PURE__ */ b("li", {
						"data-testid": o,
						className: "flex items-center gap-2",
						children: t ? /* @__PURE__ */ x(y, { children: [
							/* @__PURE__ */ b($n, {
								value: e.label,
								placeholder: "Label",
								ariaLabel: "Link label",
								testId: `${o}-label`,
								onCommit: (t) => n?.(e.index, t),
								className: "w-[34%] min-w-0"
							}),
							/* @__PURE__ */ b($n, {
								value: e.url,
								placeholder: "https://",
								ariaLabel: "Link URL",
								testId: `${o}-url`,
								onCommit: (t) => i?.(e.index, t),
								className: "min-w-0 flex-1 font-mono text-[11px]"
							}),
							/* @__PURE__ */ b(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": "Remove link",
								"data-testid": `${o}-remove`,
								onClick: () => a?.(e.index),
								children: "✕"
							})
						] }) : /* @__PURE__ */ b(er, {
							row: e,
							testId: o
						})
					}, e.index);
				})
			}), t ? /* @__PURE__ */ b("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ b(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${c}-add`,
					onClick: o,
					children: "+ Add link"
				})
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/LinksMacro.tsx
var nr = class extends E {
	rows;
	constructor(e, t) {
		super(e, Wn), this.rows = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ b(tr, {
			rows: this.rows,
			editable: this.editable,
			onLabelChange: (e, t) => this.apply(Jn(this.node.textContent, e, t)),
			onUrlChange: (e, t) => this.apply(Yn(this.node.textContent, e, t)),
			onRemoveRow: (e) => this.apply(Xn(this.node.textContent, e)),
			onAddRow: () => this.apply(Zn(this.node.textContent)),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "links") return !1;
		let t = qn(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.rows = t, n && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function rr() {
	return {
		macroName: Wn,
		accepts: (e) => qn(e.textContent) !== null,
		create: (e) => {
			let t = qn(e.node.textContent);
			return t ? new nr(e, t) : null;
		}
	};
}
var ir = S.create({
	name: "linksMacro",
	addStorage: w,
	addCommands() {
		return { insertLinks: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = Qn(e ?? [{}]);
			return n.insertContent([{
				type: C,
				attrs: { macroName: Wn },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, rr());
	}
}), ar = "attachment", or = "/api/uploads/";
function sr(e) {
	return e.startsWith(or);
}
function cr(e) {
	return e.type.startsWith("image/");
}
var lr = /^([A-Za-z][A-Za-z0-9_-]*):/;
function ur(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function $(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.split("\n")) {
		if (n.trim() === "") continue;
		let e = lr.exec(n);
		if (!e) return null;
		let r = ur(n.slice(e[0].length));
		if (r === null || t.has(e[1])) return null;
		t.set(e[1], r);
	}
	let n = t.get("name") ?? "", r = t.get("url") ?? "";
	if (!n || !r) return null;
	let i = t.get("size"), a = null;
	if (i !== void 0 && i !== "") {
		if (!/^\d+$/.test(i)) return null;
		a = Number(i);
	}
	return {
		name: n,
		size: a,
		type: t.get("type") ?? "",
		url: r
	};
}
function dr(e) {
	return $(e) !== null;
}
function fr(e) {
	return sr(e.url) ? null : Kn(e.url);
}
function pr(e) {
	let t = [`name: ${j(e.name) ?? "''"}`];
	return e.size !== void 0 && Number.isFinite(e.size) && e.size >= 0 && t.push(`size: ${Math.floor(e.size)}`), e.type && t.push(`type: ${j(e.type) ?? "''"}`), t.push(`url: ${j(e.url) ?? "''"}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/AttachmentBlock.tsx
function mr(e) {
	return e.startsWith("image/") ? "🖼" : e.startsWith("video/") ? "🎞" : e.startsWith("audio/") ? "🎵" : e === "application/pdf" ? "📄" : e.includes("zip") || e.includes("compressed") || e.includes("tar") ? "🗜" : e.startsWith("text/") || e.includes("json") || e.includes("xml") ? "📝" : "📎";
}
function hr({ attachment: e, editable: t = !1, href: i = null, onOpen: a, previewSrc: o = null, onRemove: s, "data-testid": c = "attachment" }) {
	let u = e.size === null ? "" : l(e.size), d = !!(a || i), f = cr(e) && !!o, p = /* @__PURE__ */ b("span", {
		"data-testid": `${c}-name`,
		className: "min-w-0 break-all text-[13px] font-medium leading-5 text-text-primary",
		children: e.name
	});
	return /* @__PURE__ */ x("div", {
		"data-testid": c,
		"data-openable": String(d),
		className: "my-3 overflow-hidden rounded-md border border-border bg-surface",
		children: [f ? /* @__PURE__ */ b("img", {
			"data-testid": `${c}-preview`,
			src: o,
			alt: e.name,
			className: "block max-h-[360px] w-full bg-surface-inset object-contain",
			draggable: !1
		}) : null, /* @__PURE__ */ x("div", {
			className: "flex items-center gap-2.5 px-2.5 py-2",
			children: [
				/* @__PURE__ */ b("span", {
					"aria-hidden": "true",
					className: "shrink-0 text-[18px] leading-none",
					children: mr(e.type)
				}),
				/* @__PURE__ */ x("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [a ? /* @__PURE__ */ b("button", {
						type: "button",
						"data-testid": `${c}-open`,
						onClick: a,
						className: "m-0 flex min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left hover:underline",
						children: p
					}) : i ? /* @__PURE__ */ b("a", {
						"data-testid": `${c}-anchor`,
						href: i,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex min-w-0 hover:underline",
						children: p
					}) : p, /* @__PURE__ */ b("span", {
						"data-testid": `${c}-meta`,
						className: n("min-w-0 truncate text-[11px] text-text-tertiary", !u && !e.type && "hidden"),
						children: [u, e.type].filter(Boolean).join(" · ")
					})]
				}),
				t && s ? /* @__PURE__ */ b(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Remove attachment",
					"data-testid": `${c}-remove`,
					onClick: s,
					children: "✕"
				}) : null
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/AttachmentMacro.tsx
var gr = class extends E {
	options;
	attachment;
	previewSrc = null;
	resolvedFor = null;
	constructor(e, t, n = {}) {
		super(e, ar), this.options = n, this.attachment = t, this.schedule(), this.resolvePreview();
	}
	resolvePreview() {
		let { resolve: e } = this.options, t = this.attachment;
		!e || !cr(t) || this.resolvedFor === t.url || (this.resolvedFor = t.url, e(t).then((e) => {
			this.resolvedFor === t.url && (this.previewSrc = e, this.schedule());
		}, () => {
			this.resolvedFor === t.url && (this.previewSrc = null);
		}));
	}
	element() {
		let e = this.attachment, { open: t } = this.options, n = t ? () => t(e) : void 0;
		return /* @__PURE__ */ b(hr, {
			attachment: e,
			editable: this.editable,
			href: fr(e),
			...n ? { onOpen: n } : {},
			previewSrc: this.previewSrc,
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "attachment") return !1;
		let t = $(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.attachment = t, n && (t.url !== this.resolvedFor && (this.previewSrc = null, this.resolvedFor = null), this.schedule(), this.resolvePreview()), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function _r(e = {}) {
	return {
		macroName: ar,
		accepts: (e) => $(e.textContent) !== null,
		create: (t) => {
			let n = $(t.node.textContent);
			return n ? new gr(t, n, e) : null;
		}
	};
}
var vr = S.create({
	name: "attachmentMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertAttachment: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.name?.trim() || !e.url?.trim() ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: ar },
			content: [{
				type: "text",
				text: pr(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, _r(this.options));
	}
});
//#endregion
export { P as ACTION_ITEMS_MACRO_NAME, Je as ACTION_ITEM_CATEGORY, ar as ATTACHMENT_MACRO_NAME, ut as ActionItemsBlock, pt as ActionItemsMacro, hr as AttachmentBlock, vr as AttachmentMacro, le as CollaborativeExcalidraw, U as DECISION_MACRO_NAME, Zt as DECISION_QUERYABILITY, Yt as DECISION_STATUSES, D as DIAGRAM_MACRO_NAME, cn as DecisionBlock, pn as DecisionMacro, fe as DiagramBlockRenderer, Pe as DiagramMacro, u as DiagramPresenceBar, Y as FIELD_MACRO_NAME, gn as FIELD_QUERYABILITY, mn as FIELD_TYPES, Bn as FieldBlock, Un as FieldMacro, ht as HITL_CONVERGENCE, vt as HITL_ITEM_CATEGORY, R as HITL_MACRO_NAME, mt as HITL_QUERYABILITY, _t as HITL_SENTINEL_SECTION, Ut as HitlBlock, Jt as HitlMacro, Wn as LINKS_MACRO_NAME, tr as LinksBlock, ir as LinksMacro, gt as MACRO_ITEM_SENTINEL_SECTION, Ee as MACRO_NODE_NAME, me as MACRO_RENDERERS_NAME, Fe as MacroRenderers, E as ReactMacroView, Ke as STATUS_DONE, qe as STATUS_PENDING, or as UPLOAD_PATH_PREFIX, dr as acceptsAttachment, en as acceptsDecision, Cn as acceptsField, Qe as actionItemMirrorRow, rt as actionItemsMacroText, ft as actionItemsRenderer, nt as addItemEdit, Zn as addLinkEdit, We as addListItemEdit, At as answerHitlEdit, fr as attachmentHref, pr as attachmentMacroText, _r as attachmentRenderer, rn as attributeDecisionEdit, ge as createMacroRendererRegistry, on as decisionMacroText, fn as decisionRenderer, je as diagramMacroPluginKey, ke as diagramMacroText, Ne as diagramRenderer, Xe as ensureItemIdEdit, Tn as fieldBoolean, En as fieldDate, Ln as fieldMacroText, wn as fieldNumber, Hn as fieldRenderer, An as fieldScalar, Sn as fitsFieldType, l as formatBytes, Dn as formatFieldDate, On as formatFieldNumber, kn as formatFieldValue, Dt as hitlExpired, Mt as hitlMacroText, It as hitlMirrorRow, Lt as hitlPhase, qt as hitlRenderer, ye as hostsMacroNodeViews, Oe as isDiagramId, sr as isHostedUpload, cr as isImageAttachment, Kn as linkHref, Qn as linksMacroText, rr as linksRenderer, Se as macroNodeViewPlugin, T as macroRendererPlugins, w as macroRendererStorage, ve as macroRenderersFor, he as macroRenderersPluginKey, De as newDiagramId, k as parseListBody, pe as plainMacroView, I as readActionItems, $ as readAttachment, q as readDecision, Ae as readDiagramId, H as readHitl, qn as readLinks, Z as readTypedField, xe as refreshMacroViews, tt as removeItemEdit, Ye as removeItemKeyEdit, Xn as removeLinkEdit, Ue as removeListItemEdit, He as removeListItemKeyEdit, jt as retractHitlEdit, nn as setDecisionStatusEdit, Fn as setFieldLabelEdit, In as setFieldTypeEdit, Pn as setFieldValueEdit, Ft as setHitlAssigneeEdit, F as setItemKeyEdit, et as setItemTextEdit, Jn as setLinkLabelEdit, Yn as setLinkUrlEdit, M as setListItemKeyEdit, an as supersedeDecisionEdit, $e as toggleItemEdit, d as useResolvedTheme, j as yamlScalar };
