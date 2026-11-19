import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { f as n, n as r } from "./Button-DwPf_9pb.js";
import { t as i } from "./Chip-DVGdTxaN.js";
import { n as a } from "./safeHref-dF2rw8EK.js";
import { t as o } from "./Input-B5h9UXBs.js";
import { t as s } from "./Select-nxx_K9gv.js";
import { t as c } from "./Textarea-MJCZpfkl.js";
import { t as l } from "./Checkbox-tmvdkINV.js";
import { t as u } from "./formatBytes-05ivRSJY.js";
import { a as d, i as f, n as p, o as m, r as h, s as g, t as ee } from "./camera-D-KbR-kd.js";
import { Suspense as _, createElement as v, lazy as y, useCallback as b, useEffect as te, useMemo as ne, useRef as re, useState as x } from "react";
import { Fragment as ie, jsx as S, jsxs as C } from "react/jsx-runtime";
import { Extension as w } from "@tiptap/core";
import { NodeSelection as ae, Plugin as oe, PluginKey as se, TextSelection as ce } from "@tiptap/pm/state";
import { createRoot as le } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var ue = y(() => import("./ExcalidrawCanvas-B8CLUMHn.js"));
function de({ label: e }) {
	return /* @__PURE__ */ S("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function fe(e) {
	return e.ydoc !== void 0;
}
function pe(e) {
	return fe(e) ? /* @__PURE__ */ S(me, { ...e }) : /* @__PURE__ */ S(he, { ...e });
}
function me({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ S("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ S(_, {
			fallback: /* @__PURE__ */ S(de, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ S(ue, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function he({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...l }) {
	let u = re(/* @__PURE__ */ new Set()), d = b((e) => (u.current.add(e), () => {
		u.current.delete(e);
	}), []), f = b((e) => {
		u.current.forEach((t) => t(e));
	}, []), p = ne(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), m = t({
		config: p,
		onMessage: f
	}), { ydoc: h, provider: g, synced: ee } = e({
		documentId: i,
		ws: m,
		onMessage: d
	});
	return h && (o !== !0 || ee) ? /* @__PURE__ */ S("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ S(_, {
			fallback: /* @__PURE__ */ S(de, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ S(ue, {
				ydoc: h,
				awareness: g?.awareness ?? null,
				...l
			})
		})
	}) : /* @__PURE__ */ S("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ S(de, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function ge({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ C("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ S("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ S(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ S("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ S(pe, {
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
	}) : /* @__PURE__ */ S("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ C("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ S("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ S("pre", {
			className: "overflow-x-auto whitespace-pre-wrap font-mono text-xs",
			children: t
		})]
	});
}
//#endregion
//#region src/components/doc-macros/plainMacroView.ts
function _e(e) {
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
var T = "macro", E = "macroRenderers", ve = new se(E);
function ye(e = []) {
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
var be = /* @__PURE__ */ new WeakMap();
function xe(e) {
	let t = e.extensionManager ?? e, n = be.get(t);
	return n || (n = ye(), be.set(t, n)), n;
}
function Se(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === E : i.length === 0 || i[0] === t;
}
function Ce(e, t) {
	let n = _e(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function we(e) {
	let t = ve.get(e.state)?.macroViews;
	return t ? (t.forEach((e) => e.refresh?.()), !0) : !1;
}
function Te(e) {
	let t = /* @__PURE__ */ new Set(), n = new oe({
		key: ve,
		props: { nodeViews: { [T]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return _e(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return Ce(n, o);
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
function O(e, t, ...n) {
	let r = xe(e);
	for (let e of n) r.register(e);
	return Se(e, t) ? [Te(r)] : [];
}
var Ee = {
	"action-items": "Action items",
	hitl: "Decision required",
	decision: "Decision",
	field: "Field",
	diagram: "Diagram"
};
function De(e) {
	return Ee[e] ?? e;
}
//#endregion
//#region src/components/doc-macros/ReactMacroView.ts
function Oe(e) {
	if (!(e instanceof HTMLElement)) return !1;
	if (e.isContentEditable) return !0;
	let t = e.tagName;
	return t === "INPUT" || t === "TEXTAREA" || t === "SELECT";
}
var k = class {
	dom;
	node;
	view;
	getPos;
	host;
	root;
	dead = !1;
	queued = !1;
	constructor(e, t) {
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.dom.setAttribute("role", "group"), this.dom.setAttribute("aria-label", De(t)), this.dom.setAttribute("tabindex", "-1"), this.dom.addEventListener("keydown", this.onEscape), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = le(this.host);
	}
	onEscape = (e) => {
		if (e.key === "Escape") {
			if (Oe(e.target) && e.target !== this.dom) {
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
		let { state: t } = this.view, n = Math.min(e + this.node.nodeSize, t.doc.content.size), r = this.proseNear(n) ?? ae.create(t.doc, e);
		this.view.dispatch(t.tr.setSelection(r).scrollIntoView()), this.view.focus();
	}
	proseNear(e) {
		let { doc: t } = this.view.state, n = null, r = null;
		t.descendants((t, i) => n !== null || t.type.name === "macro" ? !1 : !t.isTextblock || (i >= e ? n = i + 1 : r = i + 1, !1));
		let i = n ?? r;
		return i === null ? null : ce.create(t, i);
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
}, ke = "diagram", Ae = "macro";
function je() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function Me(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function Ne(e) {
	return `id: ${e}`;
}
function Pe(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return Me(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var Fe = new se("diagramMacro"), Ie = class extends k {
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
		super(e, ke), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return v(ge, {
			diagramId: Pe(t),
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
function Le(e) {
	return {
		macroName: ke,
		create: (t) => new Ie(t, e)
	};
}
var Re = w.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: Ae,
			attrs: { macroName: ke },
			content: [{
				type: "text",
				text: Ne(e ?? je())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: D,
	addProseMirrorPlugins() {
		return O(this.editor, this.name, Le(this.options));
	}
}), ze = w.create({
	name: E,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: D,
	addProseMirrorPlugins() {
		return O(this.editor, this.name, ...this.options.renderers);
	}
}), Be = /^([A-Za-z][A-Za-z0-9_-]*):/, Ve = "  - ", A = "    ";
function He(e) {
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
function Ue(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function We(e, t, n) {
	let r = Be.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Ue(e.slice(i, a));
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
function j(e, t) {
	let n = He(e), r = 0;
	for (; r < n.length && n[r].text.trim() === "";) r += 1;
	let i = n[r];
	if (!i) return null;
	let a = We(i.text, i.start, 0);
	if (!a || a.key !== t || a.scalar.value !== "" && a.scalar.value !== "[]") return null;
	r += 1;
	let o = [], s = a.lineEnd;
	for (; r < n.length; r += 1) {
		let e = n[r];
		if (e.text.trim() !== "") {
			if (e.text.startsWith("  - ")) {
				let t = We(e.text, e.start, 4);
				if (!t) return null;
				o.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith("    ")) {
				let t = o[o.length - 1];
				if (!t) return null;
				let n = We(e.text, e.start, 4);
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
function M(e, t) {
	return e.entries.find((e) => e.key === t);
}
function N(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Ge(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${A}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${A}${t}: ${n}`
	};
}
function Ke(e, t, n, r, i) {
	let a = j(e, t)?.items[n];
	if (!a) return null;
	let o = N(i);
	if (o === null) return null;
	let s = M(a, r);
	return s ? s.scalar.value === i ? null : {
		from: s.scalar.from,
		to: s.scalar.to,
		insert: o
	} : Ge(a, r, o);
}
function qe(e, t, n, r) {
	let i = j(e, t)?.items[n];
	if (!i) return null;
	let a = M(i, r);
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
function Je(e, t, n) {
	let r = j(e, t), i = r?.items[n];
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
function Ye(e, t, n) {
	let r = j(e, t);
	if (!r || n.length === 0) return null;
	let i = n.map(([, e]) => N(e));
	if (i.some((e) => e === null)) return null;
	let a = n.map(([e], t) => `${t === 0 ? Ve : A}${e}: ${i[t]}`).join("\n");
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
var P = "items", Xe = (e) => j(e, P), Ze = "done", Qe = "pending", $e = "action-items", et = "action-item";
function F(e, t, n, r) {
	return Ke(e, P, t, n, r);
}
function tt(e, t, n) {
	return qe(e, P, t, n);
}
function I(e) {
	let t = Xe(e);
	return t ? t.items.map((e, t) => {
		let n = M(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			id: M(e, "id")?.scalar.value ?? null,
			text: M(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === Ze,
			assignee: M(e, "assignee")?.scalar.value ?? null,
			due: M(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function nt(e, t, n = rt) {
	let r = Xe(e)?.items[t];
	return !r || M(r, "id") ? null : F(e, t, "id", n());
}
function rt() {
	let e = globalThis.crypto;
	return e?.randomUUID ? e.randomUUID() : `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function it(e) {
	return !e.id || !e.assignee || !e.text ? null : {
		itemId: e.id,
		text: e.text,
		assigneeId: e.assignee,
		category: et,
		dueDate: e.due,
		done: e.done
	};
}
function at(e, t) {
	let n = I(e)?.[t];
	return n ? F(e, t, "status", n.done ? Qe : Ze) : null;
}
function ot(e, t, n) {
	return F(e, t, "text", n);
}
function st(e, t) {
	return Je(e, P, t);
}
function ct(e, t) {
	return Ye(e, P, [["status", Qe], ["text", t]]);
}
function lt(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? Ve : A}${e}: ${N(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/useDraft.ts
function ut(e) {
	let [t, n] = x(e), r = re(e);
	return [
		t,
		b((e) => {
			r.current = e, n(e);
		}, []),
		b(() => r.current, [])
	];
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function dt({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ S("button", {
		"data-ui-part": "",
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
function ft({ value: e, people: t, onAssign: n, testId: r }) {
	let i = e ?? "", a = t.some((e) => e.id === i);
	return /* @__PURE__ */ S(s, {
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
var pt = /^\d{4}-\d{2}-\d{2}$/;
function mt({ value: e, onDue: t, testId: n }) {
	let [i, a] = x(!1);
	return !e && !i ? /* @__PURE__ */ S(r, {
		variant: "ghost",
		size: "sm",
		"aria-label": "Set a due date",
		"data-testid": `${n}-due-add`,
		onClick: () => a(!0),
		className: "whitespace-nowrap",
		children: "+ due"
	}) : /* @__PURE__ */ S(o, {
		type: "date",
		size: "sm",
		autoFocus: i && !e,
		"data-testid": `${n}-due-set`,
		"aria-label": "Due date",
		value: e,
		onChange: (e) => t(e.target.value),
		onBlur: () => a(!1),
		className: "w-[122px] border-transparent bg-transparent tabular-nums hover:border-border"
	});
}
function ht({ item: e, testId: t, hideAssignee: n = !1, hideDue: r = !1 }) {
	let i = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ C(ie, { children: [
		e.assignee && !n ? /* @__PURE__ */ C("span", {
			"data-testid": `${t}-assignee`,
			className: i,
			children: ["@", e.assignee]
		}) : null,
		e.due && !r ? /* @__PURE__ */ C("span", {
			"data-testid": `${t}-due`,
			className: i,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ S("span", {
			"data-testid": `${t}-status`,
			className: i,
			children: e.status
		}) : null
	] });
}
function gt({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [a, s, c] = ut(e.text), l = re(!1);
	if (te(() => {
		l.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ S("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ S("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let u = () => {
		let t = c();
		t !== e.text && r?.(t);
	};
	return /* @__PURE__ */ S(o, {
		size: "sm",
		"data-testid": `${i}-text`,
		value: a,
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
function _t({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, people: c, onAssign: l, onDue: u, "data-testid": d = "action-items" }) {
	let f = e.filter((e) => e.done).length;
	return /* @__PURE__ */ C("div", {
		"data-testid": d,
		className: "my-3",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ S("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ C("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [/* @__PURE__ */ C("span", {
					"data-testid": `${d}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						f,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ S(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${d}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ C("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ S("p", {
				"data-testid": `${d}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ S("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${d}-item-${e.index}`;
					return /* @__PURE__ */ C("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ S(dt, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ S(gt, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ C("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [
									t && c && l ? /* @__PURE__ */ S(ft, {
										value: e.assignee,
										people: c,
										onAssign: (t) => l(e.index, t),
										testId: o
									}) : null,
									t && u && (e.due === null || pt.test(e.due)) ? /* @__PURE__ */ S(mt, {
										value: e.due ?? "",
										onDue: (t) => u(e.index, t),
										testId: o
									}) : null,
									/* @__PURE__ */ S(ht, {
										item: e,
										testId: o,
										hideAssignee: !!(t && c && l),
										hideDue: !!(t && u && (e.due === null || pt.test(e.due)))
									}),
									t ? /* @__PURE__ */ S(r, {
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
			}), t ? /* @__PURE__ */ S("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ S(r, {
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
var vt = class extends k {
	options;
	items;
	constructor(e, t, n = {}) {
		super(e, $e), this.options = n, this.items = t, this.report(), this.schedule();
	}
	report() {
		let e = this.options.onItemChanged;
		if (e) for (let t of this.items) {
			let n = it(t);
			n && e(n);
		}
	}
	element() {
		let e = this.options.people?.() ?? [];
		return /* @__PURE__ */ S(_t, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(at(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(ot(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(st(this.node.textContent, e)),
			onAddItem: () => this.apply(ct(this.node.textContent, "")),
			...e.length ? { people: e } : {},
			...e.length ? { onAssign: (e, t) => this.assign(e, t) } : {},
			...this.editable ? { onDue: (e, t) => this.due(e, t) } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	assign(e, t) {
		if (!t) {
			this.apply(tt(this.node.textContent, e, "assignee"));
			return;
		}
		this.apply(nt(this.node.textContent, e)), this.apply(F(this.node.textContent, e, "assignee", t));
	}
	due(e, t) {
		this.apply(t ? F(this.node.textContent, e, "due", t) : tt(this.node.textContent, e, "due"));
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
function yt(e = {}) {
	return {
		macroName: $e,
		accepts: (e) => I(e.textContent) !== null,
		create: (t) => {
			let n = I(t.node.textContent);
			return n ? new vt(t, n, e) : null;
		}
	};
}
var bt = w.create({
	name: "actionItemsMacro",
	addOptions() {
		return {};
	},
	addStorage: D,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = lt((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: T,
				attrs: { macroName: $e },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return O(this.editor, this.name, yt(this.options));
	}
}), L = "hitl", xt = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", St = "The body owns the ask and is projected to the row; the row owns whether an answer stuck. An answered row fills an unanswered body; an answered body is never overwritten, only reported.", Ct = "_macro", wt = Ct, Tt = "hitl", Et = /^([A-Za-z][A-Za-z0-9_-]*):/, R = "  - ", Dt = "    ", Ot = /* @__PURE__ */ new Set(["then", "value"]), kt = [
	"answer",
	"answeredAt",
	"answeredBy"
], At = "answeredBy";
function jt(e) {
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
function Mt(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function Nt(e, t, n) {
	let r = Et.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Mt(e.slice(i, a));
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
function z(e) {
	let t = jt(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(R)) {
			if (!a) return null;
			let t = e.text.slice(4), n = Nt(e.text, e.start, 4);
			if (n) {
				if (!Ot.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = Mt(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(Dt)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = Nt(e.text, e.start, 4);
			if (!n || !Ot.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = Nt(e.text, e.start, 0);
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
function B(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function V(e) {
	let t = z(e);
	if (!t) return null;
	let n = B(t, "question");
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
		id: B(t, "id"),
		question: n,
		context: B(t, "context"),
		askedBy: B(t, "askedBy"),
		assignee: B(t, "assignee"),
		blocks: B(t, "blocks"),
		expiresAt: B(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: B(t, "answeredBy"),
		answeredAt: B(t, "answeredAt")
	};
}
function Pt(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function Ft(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		kt.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function It(e, t) {
	let n = e.entries.find((e) => e.key > At);
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
function Lt(e, t) {
	let n = z(e);
	if (!n || !B(n, "question")) return null;
	let r = N(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = N(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = N(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = Ft(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => kt.includes(e.key)) ? null : It(n, a);
}
function Rt(e) {
	let t = z(e);
	if (!t) return null;
	let n = Ft(t);
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
function zt(e) {
	let t = [], n = (e) => N(e) ?? "''", r = [
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
		for (let e of i) typeof e == "string" ? t.push(`${R}${n(e)}`) : e.then ? (t.push(`${R}then: ${n(e.then)}`), t.push(`${Dt}value: ${n(e.value)}`)) : t.push(`${R}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
function Bt(e, t, n) {
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
function Vt(e, t) {
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
function Ht(e, t) {
	let n = z(e);
	if (!n || !B(n, "question")) return null;
	let r = n.entries.find((e) => e.key === "assignee");
	if (t === "") {
		if (!r) return null;
		let e = Vt(n, r);
		return {
			from: e.from,
			to: e.to,
			insert: ""
		};
	}
	let i = N(t);
	return i === null ? null : r ? r.scalar.value === t ? null : {
		from: r.scalar.from,
		to: r.scalar.to,
		insert: i
	} : Bt(n, "assignee", i);
}
function Ut(e) {
	return !e.id || !e.assignee || !e.question ? null : {
		itemId: e.id,
		text: e.question,
		assigneeId: e.assignee,
		category: Tt
	};
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function Wt(e, t) {
	return e.answer === null ? Pt(e, t) ? "expired" : "waiting" : "answered";
}
var Gt = {
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
}, Kt = "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function qt({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ C("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ S(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ C("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function Jt({ value: e, people: t, disabled: n, onAssign: r, testId: i }) {
	let a = t.some((t) => t.id === e);
	return /* @__PURE__ */ S(s, {
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
function Yt({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = x(""), o = i.trim().length > 0 && !t, s = () => {
		o && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ C("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ S(c, {
			"data-testid": `${n}-draft`,
			value: i,
			rows: 2,
			disabled: t,
			"aria-label": "Answer the agent",
			placeholder: "Answer the agent — it is waiting on this…",
			onChange: (e) => a(e.target.value),
			onKeyDown: (e) => {
				e.key === "Enter" && (e.metaKey || e.ctrlKey) && (e.preventDefault(), s());
			}
		}), /* @__PURE__ */ S("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ S(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !o,
				onClick: s,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function Xt({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, people: c, onAssign: l, onRetract: u, onRemove: d, "data-testid": f = "hitl" }) {
	let p = Wt(e, n), m = Gt[p], h = p === "waiting" && t && !!a, g = p === "waiting" && t && !!l && (c?.length ?? 0) > 0;
	return /* @__PURE__ */ C("div", {
		"data-testid": f,
		"data-phase": p,
		className: "my-3",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ S("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ S(i, {
					tone: m.tone,
					size: "xs",
					uppercase: !0,
					dot: p === "waiting" ? "pulse" : "static",
					"data-testid": `${f}-phase`,
					children: m.label
				}),
				/* @__PURE__ */ S("span", { className: "flex-1" }),
				t && d ? /* @__PURE__ */ S(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${f}-remove`,
					onClick: d,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ C("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ S("p", {
					"data-testid": `${f}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ S("p", {
					"data-testid": `${f}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ C("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ C("span", {
							"data-testid": `${f}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						g ? /* @__PURE__ */ S(Jt, {
							value: e.assignee,
							people: c ?? [],
							disabled: o,
							onAssign: (e) => l?.(e),
							testId: f
						}) : e.assignee ? /* @__PURE__ */ C(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ S(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ C(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${f}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && p === "waiting" ? /* @__PURE__ */ C("span", {
							"data-testid": `${f}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				p === "answered" ? /* @__PURE__ */ C("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ C("span", {
							className: Kt,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ S("p", {
							"data-testid": `${f}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && u ? /* @__PURE__ */ S("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ S(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${f}-retract`,
								onClick: u,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				p === "expired" ? /* @__PURE__ */ S("p", {
					"data-testid": `${f}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ S("p", {
					"data-testid": `${f}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				h && e.options.length > 0 ? /* @__PURE__ */ S("div", {
					"data-testid": `${f}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ S(qt, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${f}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				h && e.options.length === 0 ? /* @__PURE__ */ S(Yt, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: f
				}) : null,
				p === "waiting" && !h ? /* @__PURE__ */ S("p", {
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
function Zt(e) {
	return [
		e.id,
		e.assignee,
		e.question,
		e.answer === null ? "" : "answered"
	].join("\0");
}
function Qt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var $t = class extends k {
	options;
	callout;
	busy = !1;
	failure = null;
	signature;
	constructor(e, t, n) {
		super(e, L), this.options = n, this.callout = t, this.signature = Zt(t), this.options.onCalloutChanged?.(t), this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && Rt(this.node.textContent) !== null;
		return /* @__PURE__ */ S(Xt, {
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
		if (Wt(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = Qt(this.options.answeredBy), i = Lt(this.node.textContent, {
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
		this.apply(Rt(this.node.textContent));
	}
	assign(e) {
		this.busy || this.apply(Ht(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = V(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		this.node = e, this.callout = t, n && t.answer !== null && (this.failure = null), n && this.schedule();
		let r = Zt(t);
		return r !== this.signature && (this.signature = r, this.options.onCalloutChanged?.(t)), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function en(e = {}) {
	return {
		macroName: L,
		accepts: (e) => V(e.textContent) !== null,
		create: (t) => {
			let n = V(t.node.textContent);
			return n ? new $t(t, n, e) : null;
		}
	};
}
var tn = w.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: D,
	addCommands() {
		return {
			insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
				type: T,
				attrs: { macroName: L },
				content: [{
					type: "text",
					text: zt(e)
				}]
			}, { type: "paragraph" }]),
			answerHitl: (e) => ({ state: t, tr: n, dispatch: r }) => {
				let i = t.schema.nodes[T];
				if (!i || !e.id || !e.answer) return !1;
				let a = !1;
				return t.doc.descendants((o, s) => {
					if (a) return !1;
					if (o.type !== i) return;
					if (o.attrs.macroName !== "hitl") return !1;
					let c = V(o.textContent);
					if (!c || c.id !== e.id || c.answer !== null) return !1;
					let l = Lt(o.textContent, {
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
		return O(this.editor, this.name, en(this.options));
	}
}), H = "decision", nn = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], rn = new Set(nn), an = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", on = /^([A-Za-z][A-Za-z0-9_-]*):/, U = "  - ";
function sn(e) {
	let t = e.trim();
	return t === "" ? "" : t === "|" || t === ">" || t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function W(e) {
	let t = [], n = [], r = 0, i = !1;
	for (let a of e.split("\n")) {
		let e = r, o = r + a.length;
		if (r = o + 1, a.trim() === "") {
			i = !1;
			continue;
		}
		if (i && a.startsWith(U)) {
			let e = sn(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = on.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = sn(c);
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
function G(e, t) {
	return e.entries.find((e) => e.key === t)?.value ?? "";
}
function K(e) {
	let t = W(e);
	if (!t) return null;
	let n = G(t, "decision");
	if (!n) return null;
	let r = G(t, "status");
	return r !== "" && !rn.has(r) ? null : {
		decision: n,
		status: r || "proposed",
		rationale: G(t, "rationale"),
		alternatives: t.alternatives,
		decidedBy: G(t, "decidedBy"),
		decidedAt: G(t, "decidedAt"),
		supersededBy: G(t, "supersededBy"),
		id: G(t, "id")
	};
}
function cn(e) {
	return K(e) !== null;
}
function ln(e, t, n) {
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
function q(e, t, n) {
	let r = N(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : ln(e, t, r);
}
function un(e, t) {
	let n = W(e);
	return !n || !G(n, "decision") || !rn.has(t) ? null : q(n, "status", t);
}
function dn(e, t) {
	let n = W(e);
	return n ? t.by ? q(n, "decidedBy", t.by) : t.at ? q(n, "decidedAt", t.at) : null : null;
}
function fn(e, t) {
	let n = W(e);
	return !n || !G(n, "decision") ? null : q(n, "supersededBy", t);
}
function pn(e) {
	let t = [], n = (e, n) => {
		if (!n) return;
		let r = N(n);
		r !== null && t.push(`${e}: ${r}`);
	};
	n("decidedAt", e.decidedAt), n("decidedBy", e.decidedBy), n("decision", e.decision), n("id", e.id), n("rationale", e.rationale), n("status", e.status ?? "proposed");
	let r = (e.alternatives ?? []).filter((e) => e.trim() !== "");
	if (r.length > 0) {
		t.push("alternatives:");
		for (let e of r) {
			let n = N(e);
			n !== null && t.push(`${U}${n}`.replace(U, U));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var mn = {
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
function hn({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: a, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = x(""), d = mn[e.status], f = e.status === "rejected";
	return /* @__PURE__ */ C("div", {
		"data-testid": c,
		"data-status": e.status,
		className: "my-3",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ S("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Decision"
				}),
				/* @__PURE__ */ S(i, {
					tone: d.tone,
					size: "sm",
					"data-testid": `${c}-status`,
					children: d.label
				}),
				/* @__PURE__ */ S("span", {
					className: "text-[11px] text-text-tertiary",
					children: d.hint
				}),
				/* @__PURE__ */ S("span", { className: "flex-1" }),
				t && s && /* @__PURE__ */ S("button", {
					"data-ui-part": "",
					type: "button",
					"aria-label": "Remove this decision",
					onClick: s,
					className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
					children: "✕"
				})
			]
		}), /* @__PURE__ */ C("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ S("p", {
					"data-testid": `${c}-claim`,
					className: f ? "m-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through" : "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.decision
				}),
				e.rationale && /* @__PURE__ */ S("p", {
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.rationale
				}),
				e.alternatives.length > 0 && /* @__PURE__ */ C("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ S("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Also considered"
					}), /* @__PURE__ */ S("ul", {
						className: "m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary",
						children: e.alternatives.map((e, t) => /* @__PURE__ */ S("li", { children: e }, `${e}-${t}`))
					})]
				}),
				(e.decidedBy || e.decidedAt) && /* @__PURE__ */ C("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.decidedBy && /* @__PURE__ */ S("span", { children: e.decidedBy }),
						e.decidedBy && e.decidedAt && /* @__PURE__ */ S("span", { children: "·" }),
						e.decidedAt && /* @__PURE__ */ S("span", { children: e.decidedAt })
					]
				}),
				e.status === "superseded" && e.supersededBy && /* @__PURE__ */ C("p", {
					"data-testid": `${c}-superseded-by`,
					className: "m-0 text-[12px] leading-snug text-text-secondary",
					children: ["Replaced by ", /* @__PURE__ */ S("span", {
						className: "font-medium",
						children: e.supersededBy
					})]
				}),
				t && a && e.status === "superseded" && !e.supersededBy && /* @__PURE__ */ C("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ S(o, {
						"aria-label": "What replaced this decision",
						placeholder: "Replaced by…",
						value: l,
						onChange: (e) => u(e.target.value),
						"data-testid": `${c}-superseded-input`
					}), /* @__PURE__ */ S(r, {
						size: "sm",
						variant: "secondary",
						className: "shrink-0 whitespace-nowrap",
						disabled: l.trim() === "",
						onClick: () => {
							a(l.trim()), u("");
						},
						children: "Record"
					})]
				}),
				t && n && /* @__PURE__ */ S("div", {
					role: "group",
					"aria-label": "Decision status",
					className: "flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: nn.map((t) => /* @__PURE__ */ S(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						onClick: () => {
							t !== e.status && n(t);
						},
						"data-testid": `${c}-set-${t}`,
						children: mn[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function gn(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function _n(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var vn = class extends k {
	options;
	decision;
	constructor(e, t, n) {
		super(e, H), this.options = n, this.decision = t, this.name(t), this.schedule();
	}
	name(e) {
		this.setAccessibleName(`Decision, ${e.status}: ${e.decision}`);
	}
	element() {
		return /* @__PURE__ */ S(hn, {
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
		if (!this.apply(un(this.node.textContent, e))) return;
		let t = gn(this.options.decidedBy);
		t && this.apply(dn(this.node.textContent, { by: t })), this.apply(dn(this.node.textContent, { at: _n(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(fn(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = K(e.textContent);
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
function yn(e = {}) {
	return {
		macroName: H,
		accepts: (e) => K(e.textContent) !== null,
		create: (t) => {
			let n = K(t.node.textContent);
			return n ? new vn(t, n, e) : null;
		}
	};
}
var bn = w.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: D,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: T,
			attrs: { macroName: H },
			content: [{
				type: "text",
				text: pn(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return O(this.editor, this.name, yn(this.options));
	}
}), J = "field", xn = [
	"text",
	"date",
	"number",
	"boolean"
], Sn = new Set(xn), Cn = "The body is the record and there is no mirror. A field index, if one is ever wanted, is a scan over document bodies — not a write-through that can go stale and misreport a real number.", wn = /^([A-Za-z][A-Za-z0-9_-]*):/;
function Tn(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function En(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = n, i = n + r.length;
		if (n = i + 1, r.trim() === "") continue;
		let a = wn.exec(r);
		if (!a) return null;
		let o = r.slice(a[0].length), s = Tn(o);
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
function Y(e, t) {
	return e.entries.find((e) => e.key === t);
}
function Dn(e) {
	for (let t of [
		"label",
		"type",
		"value"
	]) if (e.entries.filter((e) => e.key === t).length > 1) return !0;
	return !1;
}
var On = /^\d{4}-\d{2}-\d{2}$/;
function kn(e, t) {
	switch (e) {
		case "text": return !0;
		case "boolean": return t === "true" || t === "false";
		case "number": return t.trim() !== "" && Number.isFinite(Number(t));
		case "date": {
			if (!On.test(t)) return !1;
			let e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
			return !Number.isNaN(e.getTime()) && e.toISOString().slice(0, 10) === t;
		}
	}
}
function X(e) {
	let t = En(e);
	if (!t || Dn(t)) return null;
	let n = Y(t, "label")?.value ?? "";
	if (!n) return null;
	let r = Y(t, "type")?.value ?? "";
	if (r !== "" && !Sn.has(r)) return null;
	let i = r || "text", a = Y(t, "value")?.value;
	return {
		label: n,
		type: i,
		value: a,
		valid: a === void 0 || kn(i, a)
	};
}
function An(e) {
	return X(e) !== null;
}
function jn(e) {
	if (e.value === void 0 || e.type !== "number" || e.value.trim() === "") return;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : void 0;
}
function Mn(e) {
	if (e.value !== void 0 && e.type === "boolean") {
		if (e.value === "true") return !0;
		if (e.value === "false") return !1;
	}
}
function Nn(e) {
	return e.value === void 0 || e.type !== "date" ? "" : kn("date", e.value) ? e.value : "";
}
function Pn(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function Fn(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function In(e) {
	if (e.value === void 0) return "";
	if (!e.valid) return e.value;
	switch (e.type) {
		case "date": return Pn(e.value);
		case "number": {
			let t = jn(e);
			return t === void 0 ? e.value : Fn(t);
		}
		case "boolean": return e.value === "true" ? "Yes" : "No";
		case "text": return e.value;
	}
}
function Ln(e, t) {
	return kn(e, t) ? e === "boolean" ? t : e === "number" ? t.trim() : N(t) : N(t);
}
function Rn(e, t, n) {
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
function zn(e, t, n, r) {
	if (r === null) return null;
	let i = Y(e, t);
	return i ? i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : Rn(e, t, r);
}
function Bn(e, t) {
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
function Vn(e, t) {
	let n = En(e);
	if (!n || Dn(n) || !Y(n, "label")?.value) return null;
	let r = Y(n, "value");
	if (t === void 0) return r ? Bn(n, r) : null;
	let i = Y(n, "type")?.value ?? "";
	return i !== "" && !Sn.has(i) ? null : zn(n, "value", t, Ln(i || "text", t));
}
function Hn(e, t) {
	let n = En(e);
	return !n || Dn(n) || !Y(n, "label")?.value || t.trim() === "" ? null : zn(n, "label", t, N(t));
}
function Un(e, t) {
	let n = En(e);
	return !n || Dn(n) || !Y(n, "label")?.value || !Sn.has(t) ? null : zn(n, "type", t, t);
}
function Wn(e) {
	let t = e.type ?? "text", n = [`label: ${N(e.label) ?? N(e.label.split("\n")[0] ?? "") ?? "''"}`, `type: ${t}`];
	if (e.value !== void 0) {
		let r = Ln(t, e.value);
		r !== null && n.push(`value: ${r}`);
	}
	return n.join("\n");
}
//#endregion
//#region src/components/doc-macros/FieldBlock.tsx
var Gn = {
	text: "Text",
	date: "Date",
	number: "Number",
	boolean: "Yes / no"
}, Kn = {
	text: "not text",
	date: "not a date",
	number: "not a number",
	boolean: "not yes / no"
};
function qn({ field: e, editable: t = !1, onValueChange: n, onLabelChange: r, onTypeChange: a, onRemove: c, testId: u = "field-block" }) {
	let [d, f, p] = ut(null), [m, h, g] = ut(null), ee = e.value === void 0 ? "empty" : e.valid ? "set" : "invalid";
	if (!t) {
		let t = In(e);
		return /* @__PURE__ */ C("div", {
			"data-testid": u,
			"data-field-type": e.type,
			"data-field-state": ee,
			className: "my-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
			children: [
				/* @__PURE__ */ S("span", {
					"data-testid": `${u}-label`,
					className: "min-w-[7.5rem] text-[12px] font-medium text-text-secondary",
					children: e.label
				}),
				t ? /* @__PURE__ */ S("span", {
					"data-testid": `${u}-value`,
					className: "text-[13.5px] leading-snug text-text-primary",
					children: t
				}) : /* @__PURE__ */ S("span", {
					"data-testid": `${u}-empty`,
					className: "text-[12px] italic text-text-tertiary",
					children: "Not set"
				}),
				!e.valid && /* @__PURE__ */ S(i, {
					tone: "warning",
					size: "xs",
					"data-testid": `${u}-invalid`,
					children: Kn[e.type]
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
	} }), b = m ?? e.value ?? "", te = () => {
		if (!e.valid) return /* @__PURE__ */ S(o, {
			size: "sm",
			invalid: !0,
			"aria-label": `${e.label} (value)`,
			"data-testid": `${u}-raw-input`,
			className: "w-[11rem]",
			value: b,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...y(v, () => h(null))
		});
		if (e.type === "boolean") {
			let t = Mn(e);
			return /* @__PURE__ */ C("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ S(l, {
					checked: t === !0,
					indeterminate: t === void 0,
					"aria-label": e.label,
					"data-testid": `${u}-checkbox`,
					onChange: (e) => n?.(e ? "true" : "false")
				}), /* @__PURE__ */ S("span", {
					className: "text-[12px] text-text-secondary",
					children: t === void 0 ? "Not set" : t ? "Yes" : "No"
				})]
			});
		}
		if (e.type === "date") {
			let t = Nn(e), r = m ?? t, i = () => {
				let e = g();
				h(null), e !== null && e !== t && n?.(e.trim() === "" ? void 0 : e.trim());
			};
			return /* @__PURE__ */ C("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ S(o, {
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
				}), t && /* @__PURE__ */ S("span", {
					"data-testid": `${u}-formatted`,
					className: "text-[12px] tabular-nums text-text-tertiary",
					children: Pn(t)
				})]
			});
		}
		return /* @__PURE__ */ S(o, {
			size: "sm",
			type: e.type === "number" ? "number" : "text",
			"aria-label": e.label,
			"data-testid": `${u}-input`,
			className: `${e.type === "number" ? "w-[8rem]" : "w-[13rem]"} !border-transparent !bg-transparent !shadow-none hover:!border-border focus:!border-border`,
			placeholder: "Not set",
			value: b,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...y(v, () => h(null))
		});
	};
	return /* @__PURE__ */ C("div", {
		"data-testid": u,
		"data-field-type": e.type,
		"data-field-state": ee,
		className: "group my-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md -mx-1 px-1 hover:bg-surface-hover/60 focus-within:bg-surface-hover/60",
		children: [
			/* @__PURE__ */ S(o, {
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
			!e.valid && /* @__PURE__ */ S(i, {
				tone: "warning",
				size: "xs",
				"data-testid": `${u}-invalid`,
				children: Kn[e.type]
			}),
			e.value !== void 0 && /* @__PURE__ */ S("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${u}-clear`,
				onClick: () => n?.(void 0),
				className: "rounded px-1 text-[12px] text-text-tertiary hover:text-text-primary",
				children: "Clear"
			}),
			/* @__PURE__ */ S(s, {
				size: "sm",
				"aria-label": "Field type",
				"data-testid": `${u}-type`,
				className: "w-[7.5rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
				value: e.type,
				options: xn.map((e) => ({
					value: e,
					label: Gn[e]
				})),
				onChange: (e) => a?.(e.target.value)
			}),
			/* @__PURE__ */ S("span", { className: "flex-1" }),
			c && /* @__PURE__ */ S("button", {
				"data-ui-part": "",
				type: "button",
				"aria-label": "Remove this field",
				"data-testid": `${u}-remove`,
				onClick: c,
				className: "rounded px-1 text-[13px] leading-none text-text-tertiary opacity-0 transition-opacity hover:text-danger-fg group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
				children: "✕"
			})
		]
	});
}
//#endregion
//#region src/components/doc-macros/FieldMacro.tsx
var Jn = class extends k {
	field;
	constructor(e, t) {
		super(e, J), this.field = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ S(qn, {
			field: this.field,
			editable: this.editable,
			...this.editable ? {
				onValueChange: (e) => this.apply(Vn(this.node.textContent, e)),
				onLabelChange: (e) => this.apply(Hn(this.node.textContent, e)),
				onTypeChange: (e) => this.apply(Un(this.node.textContent, e)),
				onRemove: () => this.removeBlock()
			} : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "field") return !1;
		let t = X(e.textContent);
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
function Yn() {
	return {
		macroName: J,
		accepts: (e) => X(e.textContent) !== null,
		create: (e) => {
			let t = X(e.node.textContent);
			return t ? new Jn(e, t) : null;
		}
	};
}
var Xn = w.create({
	name: "fieldMacro",
	addStorage: D,
	addCommands() {
		return { insertField: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.label || e.label.trim() === "" ? !1 : n.insertContent([{
			type: T,
			attrs: { macroName: J },
			content: [{
				type: "text",
				text: Wn(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return O(this.editor, this.name, Yn());
	}
}), Z = "links", Q = "links", Zn = [
	"http:",
	"https:",
	"mailto:"
];
function Qn(e) {
	let t = e.trim();
	if (!t) return null;
	let n = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) ? t : t.startsWith("//") ? null : `https://${t}`;
	if (n === null) return null;
	try {
		let e = new URL(n);
		return Zn.includes(e.protocol) ? e.href : null;
	} catch {
		return null;
	}
}
function $n(e) {
	let t = j(e, Z);
	return t ? t.items.map((e, t) => ({
		index: t,
		label: M(e, "label")?.scalar.value ?? "",
		url: M(e, "url")?.scalar.value ?? ""
	})) : null;
}
function er(e, t, n) {
	return Ke(e, Z, t, "label", n);
}
function tr(e, t, n) {
	return Ke(e, Z, t, "url", n);
}
function nr(e, t) {
	return Je(e, Z, t);
}
function rr(e, t = "", n = "") {
	return Ye(e, Z, [["label", t], ["url", n]]);
}
function ir(e) {
	return e.length === 0 ? "links: []" : ["links:", ...e.map((e) => [["label", e.label ?? ""], ["url", e.url ?? ""]].map(([e, t], n) => `${n === 0 ? "  - " : "    "}${e}: ${N(t) ?? "''"}`).join("\n"))].join("\n");
}
//#endregion
//#region src/components/doc-macros/LinksBlock.tsx
function ar({ value: e, placeholder: t, ariaLabel: r, onCommit: i, testId: a, className: s }) {
	let [c, l, u] = ut(e), d = re(!1);
	te(() => {
		d.current || l(e);
	}, [e]);
	let f = () => {
		let t = u();
		t !== e && i(t);
	};
	return /* @__PURE__ */ S(o, {
		size: "sm",
		"data-testid": a,
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
function or({ row: e, testId: t }) {
	let n = Qn(e.url), r = e.label || e.url || "Untitled link";
	return n ? /* @__PURE__ */ S("a", {
		"data-testid": `${t}-anchor`,
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "text-[13px] leading-5 text-info underline decoration-info/40 underline-offset-2 hover:decoration-info",
		children: r
	}) : /* @__PURE__ */ C("span", {
		"data-testid": `${t}-text`,
		className: "text-[13px] leading-5 text-text-primary",
		children: [r, e.url ? /* @__PURE__ */ S("span", {
			className: "ml-1.5 text-[11px] text-text-tertiary",
			children: e.url
		}) : null]
	});
}
function sr({ rows: e, editable: t = !1, onLabelChange: n, onUrlChange: i, onRemoveRow: a, onAddRow: o, onRemove: s, "data-testid": c = "links" }) {
	return /* @__PURE__ */ C("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ C("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ S("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Links"
			}), t && s ? /* @__PURE__ */ S(r, {
				variant: "ghost",
				size: "sm",
				"data-testid": `${c}-remove`,
				onClick: s,
				children: "Remove"
			}) : null]
		}), /* @__PURE__ */ C("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ S("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No links yet."
			}) : /* @__PURE__ */ S("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-row-${e.index}`;
					return /* @__PURE__ */ S("li", {
						"data-testid": o,
						className: "flex items-center gap-2",
						children: t ? /* @__PURE__ */ C(ie, { children: [
							/* @__PURE__ */ S(ar, {
								value: e.label,
								placeholder: "Label",
								ariaLabel: "Link label",
								testId: `${o}-label`,
								onCommit: (t) => n?.(e.index, t),
								className: "w-[34%] min-w-0"
							}),
							/* @__PURE__ */ S(ar, {
								value: e.url,
								placeholder: "https://",
								ariaLabel: "Link URL",
								testId: `${o}-url`,
								onCommit: (t) => i?.(e.index, t),
								className: "min-w-0 flex-1 font-mono text-[11px]"
							}),
							/* @__PURE__ */ S(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": "Remove link",
								"data-testid": `${o}-remove`,
								onClick: () => a?.(e.index),
								children: "✕"
							})
						] }) : /* @__PURE__ */ S(or, {
							row: e,
							testId: o
						})
					}, e.index);
				})
			}), t ? /* @__PURE__ */ S("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ S(r, {
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
var cr = class extends k {
	rows;
	constructor(e, t) {
		super(e, Q), this.rows = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ S(sr, {
			rows: this.rows,
			editable: this.editable,
			onLabelChange: (e, t) => this.apply(er(this.node.textContent, e, t)),
			onUrlChange: (e, t) => this.apply(tr(this.node.textContent, e, t)),
			onRemoveRow: (e) => this.apply(nr(this.node.textContent, e)),
			onAddRow: () => this.apply(rr(this.node.textContent)),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "links") return !1;
		let t = $n(e.textContent);
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
function lr() {
	return {
		macroName: Q,
		accepts: (e) => $n(e.textContent) !== null,
		create: (e) => {
			let t = $n(e.node.textContent);
			return t ? new cr(e, t) : null;
		}
	};
}
var ur = w.create({
	name: "linksMacro",
	addStorage: D,
	addCommands() {
		return { insertLinks: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = ir(e ?? [{}]);
			return n.insertContent([{
				type: T,
				attrs: { macroName: Q },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return O(this.editor, this.name, lr());
	}
}), dr = new se("documentLinkClick");
function fr(e, t = globalThis.location?.origin ?? "") {
	let n;
	try {
		n = new URL(e, t || void 0);
	} catch {
		return null;
	}
	return t && n.origin !== t || !/^\/documents\/[^/]+/.test(n.pathname) ? null : `${n.pathname}${n.search}${n.hash}`;
}
var pr = w.create({
	name: "documentLinkClick",
	priority: 1001,
	addOptions() {
		return {
			resolve: (e) => fr(e),
			onOpen: () => {}
		};
	},
	addProseMirrorPlugins() {
		let e = this.options;
		return [new oe({
			key: dr,
			props: { handleClick: (t, n, r) => {
				if (r.button !== 0 || r.metaKey || r.ctrlKey || r.shiftKey || r.altKey) return !1;
				let i = r.target, a = i && typeof i.closest == "function" ? i.closest("a[href]") : null;
				if (!a || !t.dom.contains(a)) return !1;
				let o = e.resolve(a.getAttribute("href") ?? "");
				return o ? (r.preventDefault(), e.onOpen(o), !0) : !1;
			} }
		})];
	}
}), mr = "attachment", hr = "/api/uploads/";
function gr(e) {
	return e.startsWith(hr);
}
function _r(e) {
	return e.type.startsWith("image/");
}
var vr = /^([A-Za-z][A-Za-z0-9_-]*):/;
function yr(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function $(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.split("\n")) {
		if (n.trim() === "") continue;
		let e = vr.exec(n);
		if (!e) return null;
		let r = yr(n.slice(e[0].length));
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
function br(e) {
	return $(e) !== null;
}
function xr(e) {
	return gr(e.url) ? null : Qn(e.url);
}
function Sr(e) {
	let t = [`name: ${N(e.name) ?? "''"}`];
	return e.size !== void 0 && Number.isFinite(e.size) && e.size >= 0 && t.push(`size: ${Math.floor(e.size)}`), e.type && t.push(`type: ${N(e.type) ?? "''"}`), t.push(`url: ${N(e.url) ?? "''"}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/AttachmentBlock.tsx
function Cr(e) {
	return e.startsWith("image/") ? "🖼" : e.startsWith("video/") ? "🎞" : e.startsWith("audio/") ? "🎵" : e === "application/pdf" ? "📄" : e.includes("zip") || e.includes("compressed") || e.includes("tar") ? "🗜" : e.startsWith("text/") || e.includes("json") || e.includes("xml") ? "📝" : "📎";
}
function wr({ attachment: e, editable: t = !1, href: i = null, onOpen: o, previewSrc: s = null, onRemove: c, "data-testid": l = "attachment" }) {
	let d = e.size === null ? "" : u(e.size), f = !!(o || i), p = _r(e) && !!s, m = /* @__PURE__ */ S("span", {
		"data-testid": `${l}-name`,
		className: "min-w-0 break-all text-[13px] font-medium leading-5 text-text-primary",
		children: e.name
	});
	return /* @__PURE__ */ C("div", {
		"data-testid": l,
		"data-openable": String(f),
		className: "my-3 overflow-hidden rounded-md border border-border bg-surface",
		children: [p ? /* @__PURE__ */ S("img", {
			"data-testid": `${l}-preview`,
			src: s,
			alt: e.name,
			className: "block max-h-[360px] w-full bg-surface-inset object-contain",
			draggable: !1
		}) : null, /* @__PURE__ */ C("div", {
			className: "flex items-center gap-2.5 px-2.5 py-2",
			children: [
				/* @__PURE__ */ S("span", {
					"aria-hidden": "true",
					className: "shrink-0 text-[18px] leading-none",
					children: Cr(e.type)
				}),
				/* @__PURE__ */ C("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [o ? /* @__PURE__ */ S("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${l}-open`,
						onClick: o,
						className: "m-0 flex min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left hover:underline",
						children: m
					}) : i ? /* @__PURE__ */ S("a", {
						"data-testid": `${l}-anchor`,
						href: a(i) ?? void 0,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex min-w-0 hover:underline",
						children: m
					}) : m, /* @__PURE__ */ S("span", {
						"data-testid": `${l}-meta`,
						className: n("min-w-0 truncate text-[11px] text-text-tertiary", !d && !e.type && "hidden"),
						children: [d, e.type].filter(Boolean).join(" · ")
					})]
				}),
				t && c ? /* @__PURE__ */ S(r, {
					variant: "ghost",
					size: "sm",
					"aria-label": "Remove attachment",
					"data-testid": `${l}-remove`,
					onClick: c,
					children: "✕"
				}) : null
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/AttachmentMacro.tsx
var Tr = class extends k {
	options;
	attachment;
	previewSrc = null;
	resolvedFor = null;
	constructor(e, t, n = {}) {
		super(e, mr), this.options = n, this.attachment = t, this.schedule(), this.resolvePreview();
	}
	resolvePreview() {
		let { resolve: e } = this.options, t = this.attachment;
		!e || !_r(t) || this.resolvedFor === t.url || (this.resolvedFor = t.url, e(t).then((e) => {
			this.resolvedFor === t.url && (this.previewSrc = e, this.schedule());
		}, () => {
			this.resolvedFor === t.url && (this.previewSrc = null);
		}));
	}
	element() {
		let e = this.attachment, { open: t } = this.options, n = t ? () => t(e) : void 0;
		return /* @__PURE__ */ S(wr, {
			attachment: e,
			editable: this.editable,
			href: xr(e),
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
function Er(e = {}) {
	return {
		macroName: mr,
		accepts: (e) => $(e.textContent) !== null,
		create: (t) => {
			let n = $(t.node.textContent);
			return n ? new Tr(t, n, e) : null;
		}
	};
}
var Dr = w.create({
	name: "attachmentMacro",
	addOptions() {
		return {};
	},
	addStorage: D,
	addCommands() {
		return { insertAttachment: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.name?.trim() || !e.url?.trim() ? !1 : n.insertContent([{
			type: T,
			attrs: { macroName: mr },
			content: [{
				type: "text",
				text: Sr(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return O(this.editor, this.name, Er(this.options));
	}
});
//#endregion
export { $e as ACTION_ITEMS_MACRO_NAME, et as ACTION_ITEM_CATEGORY, mr as ATTACHMENT_MACRO_NAME, _t as ActionItemsBlock, bt as ActionItemsMacro, wr as AttachmentBlock, Dr as AttachmentMacro, pe as CollaborativeExcalidraw, H as DECISION_MACRO_NAME, an as DECISION_QUERYABILITY, nn as DECISION_STATUSES, ke as DIAGRAM_MACRO_NAME, ee as DIAGRAM_ZOOM_CEILING, p as DIAGRAM_ZOOM_FLOOR, dr as DOCUMENT_LINK_CLICK_KEY, hn as DecisionBlock, bn as DecisionMacro, ge as DiagramBlockRenderer, Re as DiagramMacro, g as DiagramPresenceBar, pr as DocumentLinkClick, J as FIELD_MACRO_NAME, Cn as FIELD_QUERYABILITY, xn as FIELD_TYPES, qn as FieldBlock, Xn as FieldMacro, St as HITL_CONVERGENCE, Tt as HITL_ITEM_CATEGORY, L as HITL_MACRO_NAME, xt as HITL_QUERYABILITY, wt as HITL_SENTINEL_SECTION, Xt as HitlBlock, tn as HitlMacro, Q as LINKS_MACRO_NAME, sr as LinksBlock, ur as LinksMacro, Ct as MACRO_ITEM_SENTINEL_SECTION, Ae as MACRO_NODE_NAME, E as MACRO_RENDERERS_NAME, ze as MacroRenderers, k as ReactMacroView, Ze as STATUS_DONE, Qe as STATUS_PENDING, hr as UPLOAD_PATH_PREFIX, br as acceptsAttachment, cn as acceptsDecision, An as acceptsField, it as actionItemMirrorRow, lt as actionItemsMacroText, yt as actionItemsRenderer, ct as addItemEdit, rr as addLinkEdit, Ye as addListItemEdit, Lt as answerHitlEdit, xr as attachmentHref, Sr as attachmentMacroText, Er as attachmentRenderer, dn as attributeDecisionEdit, h as cameraToContain, ye as createMacroRendererRegistry, pn as decisionMacroText, yn as decisionRenderer, Fe as diagramMacroPluginKey, Ne as diagramMacroText, Le as diagramRenderer, nt as ensureItemIdEdit, Mn as fieldBoolean, Nn as fieldDate, Wn as fieldMacroText, jn as fieldNumber, Yn as fieldRenderer, Ln as fieldScalar, kn as fitsFieldType, u as formatBytes, Pn as formatFieldDate, Fn as formatFieldNumber, In as formatFieldValue, Pt as hitlExpired, zt as hitlMacroText, Ut as hitlMirrorRow, Wt as hitlPhase, en as hitlRenderer, Se as hostsMacroNodeViews, Me as isDiagramId, gr as isHostedUpload, _r as isImageAttachment, Qn as linkHref, ir as linksMacroText, lr as linksRenderer, Te as macroNodeViewPlugin, O as macroRendererPlugins, D as macroRendererStorage, xe as macroRenderersFor, ve as macroRenderersPluginKey, je as newDiagramId, j as parseListBody, _e as plainMacroView, I as readActionItems, $ as readAttachment, K as readDecision, Pe as readDiagramId, V as readHitl, $n as readLinks, X as readTypedField, we as refreshMacroViews, st as removeItemEdit, tt as removeItemKeyEdit, nr as removeLinkEdit, Je as removeListItemEdit, qe as removeListItemKeyEdit, Rt as retractHitlEdit, fr as sameOriginDocumentPath, f as sceneBounds, un as setDecisionStatusEdit, Hn as setFieldLabelEdit, Un as setFieldTypeEdit, Vn as setFieldValueEdit, Ht as setHitlAssigneeEdit, F as setItemKeyEdit, ot as setItemTextEdit, er as setLinkLabelEdit, tr as setLinkUrlEdit, Ke as setListItemKeyEdit, fn as supersedeDecisionEdit, at as toggleItemEdit, m as useResolvedTheme, d as visibleSceneArea, N as yamlScalar };
