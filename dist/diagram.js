import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { d as n, n as r } from "./Button-DQoeE5dN.js";
import { n as i, r as a } from "./safeHref-CSAycLWi.js";
import { t as o } from "./Input-DiOEvL5h.js";
import { t as s } from "./Select-CDxAVVnW.js";
import { t as c } from "./Textarea-Cf4WFXAs.js";
import { t as l } from "./Checkbox-DgSkOMOT.js";
import { t as u } from "./formatBytes-05ivRSJY.js";
import { n as d, t as f } from "./useResolvedTheme-DOW-ad8r.js";
import { Suspense as p, createElement as m, lazy as h, useCallback as g, useEffect as _, useMemo as ee, useRef as v, useState as y } from "react";
import { Fragment as b, jsx as x, jsxs as S } from "react/jsx-runtime";
import { Extension as C } from "@tiptap/core";
import { NodeSelection as te, Plugin as ne, PluginKey as re, TextSelection as ie } from "@tiptap/pm/state";
import { createRoot as ae } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var oe = h(() => import("./ExcalidrawCanvas-Cxa63s8g.js"));
function se({ label: e }) {
	return /* @__PURE__ */ x("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function ce(e) {
	return e.ydoc !== void 0;
}
function le(e) {
	return ce(e) ? /* @__PURE__ */ x(ue, { ...e }) : /* @__PURE__ */ x(de, { ...e });
}
function ue({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ x("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ x(p, {
			fallback: /* @__PURE__ */ x(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ x(oe, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function de({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...l }) {
	let u = v(/* @__PURE__ */ new Set()), d = g((e) => (u.current.add(e), () => {
		u.current.delete(e);
	}), []), f = g((e) => {
		u.current.forEach((t) => t(e));
	}, []), m = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), h = t({
		config: m,
		onMessage: f
	}), { ydoc: _, provider: y, synced: b } = e({
		documentId: i,
		ws: h,
		onMessage: d
	});
	return _ && (o !== !0 || b) ? /* @__PURE__ */ x("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ x(p, {
			fallback: /* @__PURE__ */ x(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ x(oe, {
				ydoc: _,
				awareness: y?.awareness ?? null,
				...l
			})
		})
	}) : /* @__PURE__ */ x("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ x(se, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function fe({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ S("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ x("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ x(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ x("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ x(le, {
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
	}) : /* @__PURE__ */ x("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ S("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ x("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ x("pre", {
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
var w = "macro", me = "macroRenderers", he = new re(me);
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
function T() {
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
		props: { nodeViews: { [w]: (n, r, i) => {
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
function E(e, t, ...n) {
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
var D = class {
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
}, O = "diagram", Ee = "macro";
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
var je = new re("diagramMacro"), Me = class extends D {
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
		super(e, O), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return m(fe, {
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
		macroName: O,
		create: (t) => new Me(t, e)
	};
}
var Pe = C.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: Ee,
			attrs: { macroName: O },
			content: [{
				type: "text",
				text: ke(e ?? De())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: T,
	addProseMirrorPlugins() {
		return E(this.editor, this.name, Ne(this.options));
	}
}), Fe = C.create({
	name: me,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: T,
	addProseMirrorPlugins() {
		return E(this.editor, this.name, ...this.options.renderers);
	}
}), Ie = /^([A-Za-z][A-Za-z0-9_-]*):/, Le = "  - ", k = "    ";
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
function A(e, t) {
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
function j(e, t) {
	return e.entries.find((e) => e.key === t);
}
function M(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Ve(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${k}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${k}${t}: ${n}`
	};
}
function He(e, t, n, r, i) {
	let a = A(e, t)?.items[n];
	if (!a) return null;
	let o = M(i);
	if (o === null) return null;
	let s = j(a, r);
	return s ? s.scalar.value === i ? null : {
		from: s.scalar.from,
		to: s.scalar.to,
		insert: o
	} : Ve(a, r, o);
}
function Ue(e, t, n, r) {
	let i = A(e, t)?.items[n];
	if (!i) return null;
	let a = j(i, r);
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
function We(e, t, n) {
	let r = A(e, t), i = r?.items[n];
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
function Ge(e, t, n) {
	let r = A(e, t);
	if (!r || n.length === 0) return null;
	let i = n.map(([, e]) => M(e));
	if (i.some((e) => e === null)) return null;
	let a = n.map(([e], t) => `${t === 0 ? Le : k}${e}: ${i[t]}`).join("\n");
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
var N = "items", Ke = (e) => A(e, N), qe = "done", Je = "pending", P = "action-items", Ye = "action-item";
function F(e, t, n, r) {
	return He(e, N, t, n, r);
}
function Xe(e, t, n) {
	return Ue(e, N, t, n);
}
function I(e) {
	let t = Ke(e);
	return t ? t.items.map((e, t) => {
		let n = j(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			id: j(e, "id")?.scalar.value ?? null,
			text: j(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === qe,
			assignee: j(e, "assignee")?.scalar.value ?? null,
			due: j(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function Ze(e, t, n = Qe) {
	let r = Ke(e)?.items[t];
	return !r || j(r, "id") ? null : F(e, t, "id", n());
}
function Qe() {
	let e = globalThis.crypto;
	return e?.randomUUID ? e.randomUUID() : `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function $e(e) {
	return !e.id || !e.assignee || !e.text ? null : {
		itemId: e.id,
		text: e.text,
		assigneeId: e.assignee,
		category: Ye,
		dueDate: e.due,
		done: e.done
	};
}
function et(e, t) {
	let n = I(e)?.[t];
	return n ? F(e, t, "status", n.done ? Je : qe) : null;
}
function tt(e, t, n) {
	return F(e, t, "text", n);
}
function nt(e, t) {
	return We(e, N, t);
}
function rt(e, t) {
	return Ge(e, N, [["status", Je], ["text", t]]);
}
function it(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? Le : k}${e}: ${M(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/useDraft.ts
function L(e) {
	let [t, n] = y(e), r = v(e);
	return [
		t,
		g((e) => {
			r.current = e, n(e);
		}, []),
		g(() => r.current, [])
	];
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function at({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ x("button", {
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
function ot({ value: e, people: t, onAssign: n, testId: r }) {
	let i = e ?? "", a = t.some((e) => e.id === i);
	return /* @__PURE__ */ x(s, {
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
var st = /^\d{4}-\d{2}-\d{2}$/;
function ct({ value: e, onDue: t, testId: n }) {
	let [i, a] = y(!1);
	return !e && !i ? /* @__PURE__ */ x(r, {
		variant: "ghost",
		size: "sm",
		"aria-label": "Set a due date",
		"data-testid": `${n}-due-add`,
		onClick: () => a(!0),
		className: "whitespace-nowrap",
		children: "+ due"
	}) : /* @__PURE__ */ x(o, {
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
function lt({ item: e, testId: t, hideAssignee: n = !1, hideDue: r = !1 }) {
	let i = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ S(b, { children: [
		e.assignee && !n ? /* @__PURE__ */ S("span", {
			"data-testid": `${t}-assignee`,
			className: i,
			children: ["@", e.assignee]
		}) : null,
		e.due && !r ? /* @__PURE__ */ S("span", {
			"data-testid": `${t}-due`,
			className: i,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ x("span", {
			"data-testid": `${t}-status`,
			className: i,
			children: e.status
		}) : null
	] });
}
function ut({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [a, s, c] = L(e.text), l = v(!1);
	if (_(() => {
		l.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ x("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ x("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let u = () => {
		let t = c();
		t !== e.text && r?.(t);
	};
	return /* @__PURE__ */ x(o, {
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
function dt({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, people: c, onAssign: l, onDue: u, "data-testid": d = "action-items" }) {
	let f = e.filter((e) => e.done).length;
	return /* @__PURE__ */ S("div", {
		"data-testid": d,
		className: "my-3",
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ x("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ S("div", {
				className: "flex shrink-0 items-center gap-2",
				children: [/* @__PURE__ */ S("span", {
					"data-testid": `${d}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						f,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ x(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${d}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ S("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ x("p", {
				"data-testid": `${d}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ x("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${d}-item-${e.index}`;
					return /* @__PURE__ */ S("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ x(at, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ x(ut, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ S("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [
									t && c && l ? /* @__PURE__ */ x(ot, {
										value: e.assignee,
										people: c,
										onAssign: (t) => l(e.index, t),
										testId: o
									}) : null,
									t && u && (e.due === null || st.test(e.due)) ? /* @__PURE__ */ x(ct, {
										value: e.due ?? "",
										onDue: (t) => u(e.index, t),
										testId: o
									}) : null,
									/* @__PURE__ */ x(lt, {
										item: e,
										testId: o,
										hideAssignee: !!(t && c && l),
										hideDue: !!(t && u && (e.due === null || st.test(e.due)))
									}),
									t ? /* @__PURE__ */ x(r, {
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
			}), t ? /* @__PURE__ */ x("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ x(r, {
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
var ft = class extends D {
	options;
	items;
	constructor(e, t, n = {}) {
		super(e, P), this.options = n, this.items = t, this.report(), this.schedule();
	}
	report() {
		let e = this.options.onItemChanged;
		if (e) for (let t of this.items) {
			let n = $e(t);
			n && e(n);
		}
	}
	element() {
		let e = this.options.people?.() ?? [];
		return /* @__PURE__ */ x(dt, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(et(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(tt(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(nt(this.node.textContent, e)),
			onAddItem: () => this.apply(rt(this.node.textContent, "")),
			...e.length ? { people: e } : {},
			...e.length ? { onAssign: (e, t) => this.assign(e, t) } : {},
			...this.editable ? { onDue: (e, t) => this.due(e, t) } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	assign(e, t) {
		if (!t) {
			this.apply(Xe(this.node.textContent, e, "assignee"));
			return;
		}
		this.apply(Ze(this.node.textContent, e)), this.apply(F(this.node.textContent, e, "assignee", t));
	}
	due(e, t) {
		this.apply(t ? F(this.node.textContent, e, "due", t) : Xe(this.node.textContent, e, "due"));
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
function pt(e = {}) {
	return {
		macroName: P,
		accepts: (e) => I(e.textContent) !== null,
		create: (t) => {
			let n = I(t.node.textContent);
			return n ? new ft(t, n, e) : null;
		}
	};
}
var mt = C.create({
	name: "actionItemsMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = it((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: w,
				attrs: { macroName: P },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, pt(this.options));
	}
}), R = "hitl", ht = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", gt = "The body owns the ask and is projected to the row; the row owns whether an answer stuck. An answered row fills an unanswered body; an answered body is never overwritten, only reported.", _t = "_macro", vt = _t, yt = "hitl", bt = /^([A-Za-z][A-Za-z0-9_-]*):/, xt = "  - ", St = "    ", Ct = /* @__PURE__ */ new Set(["then", "value"]), wt = [
	"answer",
	"answeredAt",
	"answeredBy"
], Tt = "answeredBy";
function Et(e) {
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
function Dt(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function Ot(e, t, n) {
	let r = bt.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Dt(e.slice(i, a));
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
function kt(e) {
	let t = Et(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(xt)) {
			if (!a) return null;
			let t = e.text.slice(4), n = Ot(e.text, e.start, 4);
			if (n) {
				if (!Ct.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = Dt(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(St)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = Ot(e.text, e.start, 4);
			if (!n || !Ct.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = Ot(e.text, e.start, 0);
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
function z(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function B(e) {
	let t = kt(e);
	if (!t) return null;
	let n = z(t, "question");
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
		id: z(t, "id"),
		question: n,
		context: z(t, "context"),
		askedBy: z(t, "askedBy"),
		assignee: z(t, "assignee"),
		blocks: z(t, "blocks"),
		expiresAt: z(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: z(t, "answeredBy"),
		answeredAt: z(t, "answeredAt")
	};
}
function At(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function jt(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		wt.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function Mt(e, t) {
	let n = e.entries.find((e) => e.key > Tt);
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
function Nt(e, t) {
	let n = kt(e);
	if (!n || !z(n, "question")) return null;
	let r = M(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = M(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = M(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = jt(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => wt.includes(e.key)) ? null : Mt(n, a);
}
function Pt(e) {
	let t = kt(e);
	if (!t) return null;
	let n = jt(t);
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
function Ft(e) {
	let t = [], n = (e) => M(e) ?? "''", r = [
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
		for (let e of i) typeof e == "string" ? t.push(`${xt}${n(e)}`) : e.then ? (t.push(`${xt}then: ${n(e.then)}`), t.push(`${St}value: ${n(e.value)}`)) : t.push(`${xt}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
function It(e, t, n) {
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
function Lt(e, t) {
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
function Rt(e, t) {
	let n = kt(e);
	if (!n || !z(n, "question")) return null;
	let r = n.entries.find((e) => e.key === "assignee");
	if (t === "") {
		if (!r) return null;
		let e = Lt(n, r);
		return {
			from: e.from,
			to: e.to,
			insert: ""
		};
	}
	let i = M(t);
	return i === null ? null : r ? r.scalar.value === t ? null : {
		from: r.scalar.from,
		to: r.scalar.to,
		insert: i
	} : It(n, "assignee", i);
}
function zt(e) {
	return !e.id || !e.assignee || !e.question ? null : {
		itemId: e.id,
		text: e.question,
		assigneeId: e.assignee,
		category: yt
	};
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function Bt(e, t) {
	return e.answer === null ? At(e, t) ? "expired" : "waiting" : "answered";
}
var Vt = {
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
}, Ht = "whitespace-nowrap text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function Ut({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ S("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ x(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ S("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function Wt({ value: e, people: t, disabled: n, onAssign: r, testId: i }) {
	let a = t.some((t) => t.id === e);
	return /* @__PURE__ */ x(s, {
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
function Gt({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = y(""), o = i.trim().length > 0 && !t, s = () => {
		o && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ S("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ x(c, {
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
		}), /* @__PURE__ */ x("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ x(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !o,
				onClick: s,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function Kt({ callout: e, editable: t = !1, now: n, onAnswer: i, busy: o = !1, failure: s = null, people: c, onAssign: l, onRetract: u, onRemove: d, "data-testid": f = "hitl" }) {
	let p = Bt(e, n), m = Vt[p], h = p === "waiting" && t && !!i, g = p === "waiting" && t && !!l && (c?.length ?? 0) > 0;
	return /* @__PURE__ */ S("div", {
		"data-testid": f,
		"data-phase": p,
		className: "my-3",
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ x("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ x(a, {
					tone: m.tone,
					size: "xs",
					uppercase: !0,
					dot: p === "waiting" ? "pulse" : "static",
					"data-testid": `${f}-phase`,
					children: m.label
				}),
				/* @__PURE__ */ x("span", { className: "flex-1" }),
				t && d ? /* @__PURE__ */ x(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${f}-remove`,
					onClick: d,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ S("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ x("p", {
					"data-testid": `${f}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ x("p", {
					"data-testid": `${f}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ S("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ S("span", {
							"data-testid": `${f}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						g ? /* @__PURE__ */ x(Wt, {
							value: e.assignee,
							people: c ?? [],
							disabled: o,
							onAssign: (e) => l?.(e),
							testId: f
						}) : e.assignee ? /* @__PURE__ */ S(a, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ x(a, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ S(a, {
							tone: "warning",
							size: "xs",
							"data-testid": `${f}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && p === "waiting" ? /* @__PURE__ */ S("span", {
							"data-testid": `${f}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				p === "answered" ? /* @__PURE__ */ S("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ S("span", {
							className: Ht,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ x("p", {
							"data-testid": `${f}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && u ? /* @__PURE__ */ x("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ x(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${f}-retract`,
								onClick: u,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				p === "expired" ? /* @__PURE__ */ x("p", {
					"data-testid": `${f}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ x("p", {
					"data-testid": `${f}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				h && e.options.length > 0 ? /* @__PURE__ */ x("div", {
					"data-testid": `${f}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ x(Ut, {
						option: e,
						disabled: o,
						onPick: () => i?.(e.value),
						testId: `${f}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				h && e.options.length === 0 ? /* @__PURE__ */ x(Gt, {
					onAnswer: (e) => i?.(e),
					busy: o,
					testId: f
				}) : null,
				p === "waiting" && !h ? /* @__PURE__ */ x("p", {
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
function qt(e) {
	return [
		e.id,
		e.assignee,
		e.question,
		e.answer === null ? "" : "answered"
	].join("\0");
}
function Jt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var Yt = class extends D {
	options;
	callout;
	busy = !1;
	failure = null;
	signature;
	constructor(e, t, n) {
		super(e, R), this.options = n, this.callout = t, this.signature = qt(t), this.options.onCalloutChanged?.(t), this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && Pt(this.node.textContent) !== null;
		return /* @__PURE__ */ x(Kt, {
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
		if (Bt(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = Jt(this.options.answeredBy), i = Nt(this.node.textContent, {
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
		this.apply(Pt(this.node.textContent));
	}
	assign(e) {
		this.busy || this.apply(Rt(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = B(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		this.node = e, this.callout = t, n && t.answer !== null && (this.failure = null), n && this.schedule();
		let r = qt(t);
		return r !== this.signature && (this.signature = r, this.options.onCalloutChanged?.(t)), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function Xt(e = {}) {
	return {
		macroName: R,
		accepts: (e) => B(e.textContent) !== null,
		create: (t) => {
			let n = B(t.node.textContent);
			return n ? new Yt(t, n, e) : null;
		}
	};
}
var Zt = C.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return {
			insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
				type: w,
				attrs: { macroName: R },
				content: [{
					type: "text",
					text: Ft(e)
				}]
			}, { type: "paragraph" }]),
			answerHitl: (e) => ({ state: t, tr: n, dispatch: r }) => {
				let i = t.schema.nodes[w];
				if (!i || !e.id || !e.answer) return !1;
				let a = !1;
				return t.doc.descendants((o, s) => {
					if (a) return !1;
					if (o.type !== i) return;
					if (o.attrs.macroName !== "hitl") return !1;
					let c = B(o.textContent);
					if (!c || c.id !== e.id || c.answer !== null) return !1;
					let l = Nt(o.textContent, {
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
		return E(this.editor, this.name, Xt(this.options));
	}
}), V = "decision", Qt = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], $t = new Set(Qt), en = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", tn = /^([A-Za-z][A-Za-z0-9_-]*):/, H = "  - ";
function nn(e) {
	let t = e.trim();
	return t === "" ? "" : t === "|" || t === ">" || t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function U(e) {
	let t = [], n = [], r = 0, i = !1;
	for (let a of e.split("\n")) {
		let e = r, o = r + a.length;
		if (r = o + 1, a.trim() === "") {
			i = !1;
			continue;
		}
		if (i && a.startsWith(H)) {
			let e = nn(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = tn.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = nn(c);
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
function W(e, t) {
	return e.entries.find((e) => e.key === t)?.value ?? "";
}
function G(e) {
	let t = U(e);
	if (!t) return null;
	let n = W(t, "decision");
	if (!n) return null;
	let r = W(t, "status");
	return r !== "" && !$t.has(r) ? null : {
		decision: n,
		status: r || "proposed",
		rationale: W(t, "rationale"),
		alternatives: t.alternatives,
		decidedBy: W(t, "decidedBy"),
		decidedAt: W(t, "decidedAt"),
		supersededBy: W(t, "supersededBy"),
		id: W(t, "id")
	};
}
function rn(e) {
	return G(e) !== null;
}
function an(e, t, n) {
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
function K(e, t, n) {
	let r = M(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : an(e, t, r);
}
function on(e, t) {
	let n = U(e);
	return !n || !W(n, "decision") || !$t.has(t) ? null : K(n, "status", t);
}
function sn(e, t) {
	let n = U(e);
	return n ? t.by ? K(n, "decidedBy", t.by) : t.at ? K(n, "decidedAt", t.at) : null : null;
}
function cn(e, t) {
	let n = U(e);
	return !n || !W(n, "decision") ? null : K(n, "supersededBy", t);
}
function ln(e) {
	let t = [], n = (e, n) => {
		if (!n) return;
		let r = M(n);
		r !== null && t.push(`${e}: ${r}`);
	};
	n("decidedAt", e.decidedAt), n("decidedBy", e.decidedBy), n("decision", e.decision), n("id", e.id), n("rationale", e.rationale), n("status", e.status ?? "proposed");
	let r = (e.alternatives ?? []).filter((e) => e.trim() !== "");
	if (r.length > 0) {
		t.push("alternatives:");
		for (let e of r) {
			let n = M(e);
			n !== null && t.push(`${H}${n}`.replace(H, H));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var un = {
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
function dn({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: i, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = y(""), d = un[e.status], f = e.status === "rejected";
	return /* @__PURE__ */ S("div", {
		"data-testid": c,
		"data-status": e.status,
		className: "my-3",
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ x("span", {
					className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Decision"
				}),
				/* @__PURE__ */ x(a, {
					tone: d.tone,
					size: "sm",
					"data-testid": `${c}-status`,
					children: d.label
				}),
				/* @__PURE__ */ x("span", {
					className: "text-[11px] text-text-tertiary",
					children: d.hint
				}),
				/* @__PURE__ */ x("span", { className: "flex-1" }),
				t && s && /* @__PURE__ */ x("button", {
					"data-ui-part": "",
					type: "button",
					"aria-label": "Remove this decision",
					onClick: s,
					className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
					children: "✕"
				})
			]
		}), /* @__PURE__ */ S("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ x("p", {
					"data-testid": `${c}-claim`,
					className: f ? "m-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through" : "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.decision
				}),
				e.rationale && /* @__PURE__ */ x("p", {
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.rationale
				}),
				e.alternatives.length > 0 && /* @__PURE__ */ S("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ x("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Also considered"
					}), /* @__PURE__ */ x("ul", {
						className: "m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary",
						children: e.alternatives.map((e, t) => /* @__PURE__ */ x("li", { children: e }, `${e}-${t}`))
					})]
				}),
				(e.decidedBy || e.decidedAt) && /* @__PURE__ */ S("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.decidedBy && /* @__PURE__ */ x("span", { children: e.decidedBy }),
						e.decidedBy && e.decidedAt && /* @__PURE__ */ x("span", { children: "·" }),
						e.decidedAt && /* @__PURE__ */ x("span", { children: e.decidedAt })
					]
				}),
				e.status === "superseded" && e.supersededBy && /* @__PURE__ */ S("p", {
					"data-testid": `${c}-superseded-by`,
					className: "m-0 text-[12px] leading-snug text-text-secondary",
					children: ["Replaced by ", /* @__PURE__ */ x("span", {
						className: "font-medium",
						children: e.supersededBy
					})]
				}),
				t && i && e.status === "superseded" && !e.supersededBy && /* @__PURE__ */ S("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ x(o, {
						"aria-label": "What replaced this decision",
						placeholder: "Replaced by…",
						value: l,
						onChange: (e) => u(e.target.value),
						"data-testid": `${c}-superseded-input`
					}), /* @__PURE__ */ x(r, {
						size: "sm",
						variant: "secondary",
						className: "shrink-0 whitespace-nowrap",
						disabled: l.trim() === "",
						onClick: () => {
							i(l.trim()), u("");
						},
						children: "Record"
					})]
				}),
				t && n && /* @__PURE__ */ x("div", {
					role: "group",
					"aria-label": "Decision status",
					className: "flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: Qt.map((t) => /* @__PURE__ */ x(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						onClick: () => {
							t !== e.status && n(t);
						},
						"data-testid": `${c}-set-${t}`,
						children: un[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function fn(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function pn(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var mn = class extends D {
	options;
	decision;
	constructor(e, t, n) {
		super(e, V), this.options = n, this.decision = t, this.name(t), this.schedule();
	}
	name(e) {
		this.setAccessibleName(`Decision, ${e.status}: ${e.decision}`);
	}
	element() {
		return /* @__PURE__ */ x(dn, {
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
		if (!this.apply(on(this.node.textContent, e))) return;
		let t = fn(this.options.decidedBy);
		t && this.apply(sn(this.node.textContent, { by: t })), this.apply(sn(this.node.textContent, { at: pn(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(cn(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = G(e.textContent);
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
function hn(e = {}) {
	return {
		macroName: V,
		accepts: (e) => G(e.textContent) !== null,
		create: (t) => {
			let n = G(t.node.textContent);
			return n ? new mn(t, n, e) : null;
		}
	};
}
var gn = C.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: w,
			attrs: { macroName: V },
			content: [{
				type: "text",
				text: ln(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, hn(this.options));
	}
}), q = "field", _n = [
	"text",
	"date",
	"number",
	"boolean"
], vn = new Set(_n), yn = "The body is the record and there is no mirror. A field index, if one is ever wanted, is a scan over document bodies — not a write-through that can go stale and misreport a real number.", bn = /^([A-Za-z][A-Za-z0-9_-]*):/;
function xn(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function J(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = n, i = n + r.length;
		if (n = i + 1, r.trim() === "") continue;
		let a = bn.exec(r);
		if (!a) return null;
		let o = r.slice(a[0].length), s = xn(o);
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
function X(e) {
	for (let t of [
		"label",
		"type",
		"value"
	]) if (e.entries.filter((e) => e.key === t).length > 1) return !0;
	return !1;
}
var Sn = /^\d{4}-\d{2}-\d{2}$/;
function Cn(e, t) {
	switch (e) {
		case "text": return !0;
		case "boolean": return t === "true" || t === "false";
		case "number": return t.trim() !== "" && Number.isFinite(Number(t));
		case "date": {
			if (!Sn.test(t)) return !1;
			let e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
			return !Number.isNaN(e.getTime()) && e.toISOString().slice(0, 10) === t;
		}
	}
}
function Z(e) {
	let t = J(e);
	if (!t || X(t)) return null;
	let n = Y(t, "label")?.value ?? "";
	if (!n) return null;
	let r = Y(t, "type")?.value ?? "";
	if (r !== "" && !vn.has(r)) return null;
	let i = r || "text", a = Y(t, "value")?.value;
	return {
		label: n,
		type: i,
		value: a,
		valid: a === void 0 || Cn(i, a)
	};
}
function wn(e) {
	return Z(e) !== null;
}
function Tn(e) {
	if (e.value === void 0 || e.type !== "number" || e.value.trim() === "") return;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : void 0;
}
function En(e) {
	if (e.value !== void 0 && e.type === "boolean") {
		if (e.value === "true") return !0;
		if (e.value === "false") return !1;
	}
}
function Dn(e) {
	return e.value === void 0 || e.type !== "date" ? "" : Cn("date", e.value) ? e.value : "";
}
function On(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function kn(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function An(e) {
	if (e.value === void 0) return "";
	if (!e.valid) return e.value;
	switch (e.type) {
		case "date": return On(e.value);
		case "number": {
			let t = Tn(e);
			return t === void 0 ? e.value : kn(t);
		}
		case "boolean": return e.value === "true" ? "Yes" : "No";
		case "text": return e.value;
	}
}
function jn(e, t) {
	return Cn(e, t) ? e === "boolean" ? t : e === "number" ? t.trim() : M(t) : M(t);
}
function Mn(e, t, n) {
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
function Nn(e, t, n, r) {
	if (r === null) return null;
	let i = Y(e, t);
	return i ? i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : Mn(e, t, r);
}
function Pn(e, t) {
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
function Fn(e, t) {
	let n = J(e);
	if (!n || X(n) || !Y(n, "label")?.value) return null;
	let r = Y(n, "value");
	if (t === void 0) return r ? Pn(n, r) : null;
	let i = Y(n, "type")?.value ?? "";
	return i !== "" && !vn.has(i) ? null : Nn(n, "value", t, jn(i || "text", t));
}
function In(e, t) {
	let n = J(e);
	return !n || X(n) || !Y(n, "label")?.value || t.trim() === "" ? null : Nn(n, "label", t, M(t));
}
function Ln(e, t) {
	let n = J(e);
	return !n || X(n) || !Y(n, "label")?.value || !vn.has(t) ? null : Nn(n, "type", t, t);
}
function Rn(e) {
	let t = e.type ?? "text", n = [`label: ${M(e.label) ?? M(e.label.split("\n")[0] ?? "") ?? "''"}`, `type: ${t}`];
	if (e.value !== void 0) {
		let r = jn(t, e.value);
		r !== null && n.push(`value: ${r}`);
	}
	return n.join("\n");
}
//#endregion
//#region src/components/doc-macros/FieldBlock.tsx
var zn = {
	text: "Text",
	date: "Date",
	number: "Number",
	boolean: "Yes / no"
}, Bn = {
	text: "not text",
	date: "not a date",
	number: "not a number",
	boolean: "not yes / no"
};
function Vn({ field: e, editable: t = !1, onValueChange: n, onLabelChange: r, onTypeChange: i, onRemove: c, testId: u = "field-block" }) {
	let [d, f, p] = L(null), [m, h, g] = L(null), _ = e.value === void 0 ? "empty" : e.valid ? "set" : "invalid";
	if (!t) {
		let t = An(e);
		return /* @__PURE__ */ S("div", {
			"data-testid": u,
			"data-field-type": e.type,
			"data-field-state": _,
			className: "my-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
			children: [
				/* @__PURE__ */ x("span", {
					"data-testid": `${u}-label`,
					className: "min-w-[7.5rem] text-[12px] font-medium text-text-secondary",
					children: e.label
				}),
				t ? /* @__PURE__ */ x("span", {
					"data-testid": `${u}-value`,
					className: "text-[13.5px] leading-snug text-text-primary",
					children: t
				}) : /* @__PURE__ */ x("span", {
					"data-testid": `${u}-empty`,
					className: "text-[12px] italic text-text-tertiary",
					children: "Not set"
				}),
				!e.valid && /* @__PURE__ */ x(a, {
					tone: "warning",
					size: "xs",
					"data-testid": `${u}-invalid`,
					children: Bn[e.type]
				})
			]
		});
	}
	let ee = () => {
		let t = p();
		f(null), t !== null && t.trim() !== "" && t !== e.label && r?.(t);
	}, v = () => {
		let t = g();
		h(null), t !== null && t !== (e.value ?? "") && n?.(t === "" ? void 0 : t);
	}, y = (e, t) => ({ onKeyDown: (n) => {
		n.key === "Enter" && (n.preventDefault(), e(), n.currentTarget.blur()), n.key === "Escape" && (n.preventDefault(), t(), n.currentTarget.blur());
	} }), b = m ?? e.value ?? "", C = () => {
		if (!e.valid) return /* @__PURE__ */ x(o, {
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
			let t = En(e);
			return /* @__PURE__ */ S("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ x(l, {
					checked: t === !0,
					indeterminate: t === void 0,
					"aria-label": e.label,
					"data-testid": `${u}-checkbox`,
					onChange: (e) => n?.(e ? "true" : "false")
				}), /* @__PURE__ */ x("span", {
					className: "text-[12px] text-text-secondary",
					children: t === void 0 ? "Not set" : t ? "Yes" : "No"
				})]
			});
		}
		if (e.type === "date") {
			let t = Dn(e), r = m ?? t, i = () => {
				let e = g();
				h(null), e !== null && e !== t && n?.(e.trim() === "" ? void 0 : e.trim());
			};
			return /* @__PURE__ */ S("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ x(o, {
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
				}), t && /* @__PURE__ */ x("span", {
					"data-testid": `${u}-formatted`,
					className: "text-[12px] tabular-nums text-text-tertiary",
					children: On(t)
				})]
			});
		}
		return /* @__PURE__ */ x(o, {
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
	return /* @__PURE__ */ S("div", {
		"data-testid": u,
		"data-field-type": e.type,
		"data-field-state": _,
		className: "group my-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 rounded-md -mx-1 px-1 hover:bg-surface-hover/60 focus-within:bg-surface-hover/60",
		children: [
			/* @__PURE__ */ x(o, {
				size: "sm",
				"aria-label": "Field name",
				"data-testid": `${u}-label-input`,
				className: "w-[9rem] font-medium !border-transparent !bg-transparent !shadow-none text-text-secondary hover:!border-border focus:!border-border",
				value: d ?? e.label,
				onChange: (e) => f(e.target.value),
				onBlur: ee,
				...y(ee, () => f(null))
			}),
			C(),
			!e.valid && /* @__PURE__ */ x(a, {
				tone: "warning",
				size: "xs",
				"data-testid": `${u}-invalid`,
				children: Bn[e.type]
			}),
			e.value !== void 0 && /* @__PURE__ */ x("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${u}-clear`,
				onClick: () => n?.(void 0),
				className: "rounded px-1 text-[12px] text-text-tertiary hover:text-text-primary",
				children: "Clear"
			}),
			/* @__PURE__ */ x(s, {
				size: "sm",
				"aria-label": "Field type",
				"data-testid": `${u}-type`,
				className: "w-[7.5rem] opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus:opacity-100",
				value: e.type,
				options: _n.map((e) => ({
					value: e,
					label: zn[e]
				})),
				onChange: (e) => i?.(e.target.value)
			}),
			/* @__PURE__ */ x("span", { className: "flex-1" }),
			c && /* @__PURE__ */ x("button", {
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
var Hn = class extends D {
	field;
	constructor(e, t) {
		super(e, q), this.field = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ x(Vn, {
			field: this.field,
			editable: this.editable,
			...this.editable ? {
				onValueChange: (e) => this.apply(Fn(this.node.textContent, e)),
				onLabelChange: (e) => this.apply(In(this.node.textContent, e)),
				onTypeChange: (e) => this.apply(Ln(this.node.textContent, e)),
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
function Un() {
	return {
		macroName: q,
		accepts: (e) => Z(e.textContent) !== null,
		create: (e) => {
			let t = Z(e.node.textContent);
			return t ? new Hn(e, t) : null;
		}
	};
}
var Wn = C.create({
	name: "fieldMacro",
	addStorage: T,
	addCommands() {
		return { insertField: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.label || e.label.trim() === "" ? !1 : n.insertContent([{
			type: w,
			attrs: { macroName: q },
			content: [{
				type: "text",
				text: Rn(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, Un());
	}
}), Q = "links", Gn = "links", Kn = [
	"http:",
	"https:",
	"mailto:"
];
function qn(e) {
	let t = e.trim();
	if (!t) return null;
	let n = /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t) ? t : t.startsWith("//") ? null : `https://${t}`;
	if (n === null) return null;
	try {
		let e = new URL(n);
		return Kn.includes(e.protocol) ? e.href : null;
	} catch {
		return null;
	}
}
function Jn(e) {
	let t = A(e, Q);
	return t ? t.items.map((e, t) => ({
		index: t,
		label: j(e, "label")?.scalar.value ?? "",
		url: j(e, "url")?.scalar.value ?? ""
	})) : null;
}
function Yn(e, t, n) {
	return He(e, Q, t, "label", n);
}
function Xn(e, t, n) {
	return He(e, Q, t, "url", n);
}
function Zn(e, t) {
	return We(e, Q, t);
}
function Qn(e, t = "", n = "") {
	return Ge(e, Q, [["label", t], ["url", n]]);
}
function $n(e) {
	return e.length === 0 ? "links: []" : ["links:", ...e.map((e) => [["label", e.label ?? ""], ["url", e.url ?? ""]].map(([e, t], n) => `${n === 0 ? "  - " : "    "}${e}: ${M(t) ?? "''"}`).join("\n"))].join("\n");
}
//#endregion
//#region src/components/doc-macros/LinksBlock.tsx
function er({ value: e, placeholder: t, ariaLabel: r, onCommit: i, testId: a, className: s }) {
	let [c, l, u] = L(e), d = v(!1);
	_(() => {
		d.current || l(e);
	}, [e]);
	let f = () => {
		let t = u();
		t !== e && i(t);
	};
	return /* @__PURE__ */ x(o, {
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
function tr({ row: e, testId: t }) {
	let n = qn(e.url), r = e.label || e.url || "Untitled link";
	return n ? /* @__PURE__ */ x("a", {
		"data-testid": `${t}-anchor`,
		href: n,
		target: "_blank",
		rel: "noopener noreferrer",
		className: "text-[13px] leading-5 text-info underline decoration-info/40 underline-offset-2 hover:decoration-info",
		children: r
	}) : /* @__PURE__ */ S("span", {
		"data-testid": `${t}-text`,
		className: "text-[13px] leading-5 text-text-primary",
		children: [r, e.url ? /* @__PURE__ */ x("span", {
			className: "ml-1.5 text-[11px] text-text-tertiary",
			children: e.url
		}) : null]
	});
}
function nr({ rows: e, editable: t = !1, onLabelChange: n, onUrlChange: i, onRemoveRow: a, onAddRow: o, onRemove: s, "data-testid": c = "links" }) {
	return /* @__PURE__ */ S("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ S("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ x("span", {
				className: "whitespace-nowrap text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Links"
			}), t && s ? /* @__PURE__ */ x(r, {
				variant: "ghost",
				size: "sm",
				"data-testid": `${c}-remove`,
				onClick: s,
				children: "Remove"
			}) : null]
		}), /* @__PURE__ */ S("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ x("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No links yet."
			}) : /* @__PURE__ */ x("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-row-${e.index}`;
					return /* @__PURE__ */ x("li", {
						"data-testid": o,
						className: "flex items-center gap-2",
						children: t ? /* @__PURE__ */ S(b, { children: [
							/* @__PURE__ */ x(er, {
								value: e.label,
								placeholder: "Label",
								ariaLabel: "Link label",
								testId: `${o}-label`,
								onCommit: (t) => n?.(e.index, t),
								className: "w-[34%] min-w-0"
							}),
							/* @__PURE__ */ x(er, {
								value: e.url,
								placeholder: "https://",
								ariaLabel: "Link URL",
								testId: `${o}-url`,
								onCommit: (t) => i?.(e.index, t),
								className: "min-w-0 flex-1 font-mono text-[11px]"
							}),
							/* @__PURE__ */ x(r, {
								variant: "ghost",
								size: "sm",
								"aria-label": "Remove link",
								"data-testid": `${o}-remove`,
								onClick: () => a?.(e.index),
								children: "✕"
							})
						] }) : /* @__PURE__ */ x(tr, {
							row: e,
							testId: o
						})
					}, e.index);
				})
			}), t ? /* @__PURE__ */ x("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ x(r, {
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
var rr = class extends D {
	rows;
	constructor(e, t) {
		super(e, Gn), this.rows = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ x(nr, {
			rows: this.rows,
			editable: this.editable,
			onLabelChange: (e, t) => this.apply(Yn(this.node.textContent, e, t)),
			onUrlChange: (e, t) => this.apply(Xn(this.node.textContent, e, t)),
			onRemoveRow: (e) => this.apply(Zn(this.node.textContent, e)),
			onAddRow: () => this.apply(Qn(this.node.textContent)),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "links") return !1;
		let t = Jn(e.textContent);
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
function ir() {
	return {
		macroName: Gn,
		accepts: (e) => Jn(e.textContent) !== null,
		create: (e) => {
			let t = Jn(e.node.textContent);
			return t ? new rr(e, t) : null;
		}
	};
}
var ar = C.create({
	name: "linksMacro",
	addStorage: T,
	addCommands() {
		return { insertLinks: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = $n(e ?? [{}]);
			return n.insertContent([{
				type: w,
				attrs: { macroName: Gn },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, ir());
	}
}), or = new re("documentLinkClick");
function sr(e, t = globalThis.location?.origin ?? "") {
	let n;
	try {
		n = new URL(e, t || void 0);
	} catch {
		return null;
	}
	return t && n.origin !== t || !/^\/documents\/[^/]+/.test(n.pathname) ? null : `${n.pathname}${n.search}${n.hash}`;
}
var cr = C.create({
	name: "documentLinkClick",
	priority: 1001,
	addOptions() {
		return {
			resolve: (e) => sr(e),
			onOpen: () => {}
		};
	},
	addProseMirrorPlugins() {
		let e = this.options;
		return [new ne({
			key: or,
			props: { handleClick: (t, n, r) => {
				if (r.button !== 0 || r.metaKey || r.ctrlKey || r.shiftKey || r.altKey) return !1;
				let i = r.target, a = i && typeof i.closest == "function" ? i.closest("a[href]") : null;
				if (!a || !t.dom.contains(a)) return !1;
				let o = e.resolve(a.getAttribute("href") ?? "");
				return o ? (r.preventDefault(), e.onOpen(o), !0) : !1;
			} }
		})];
	}
}), lr = "attachment", ur = "/api/uploads/";
function dr(e) {
	return e.startsWith(ur);
}
function fr(e) {
	return e.type.startsWith("image/");
}
var pr = /^([A-Za-z][A-Za-z0-9_-]*):/;
function mr(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function $(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.split("\n")) {
		if (n.trim() === "") continue;
		let e = pr.exec(n);
		if (!e) return null;
		let r = mr(n.slice(e[0].length));
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
function hr(e) {
	return $(e) !== null;
}
function gr(e) {
	return dr(e.url) ? null : qn(e.url);
}
function _r(e) {
	let t = [`name: ${M(e.name) ?? "''"}`];
	return e.size !== void 0 && Number.isFinite(e.size) && e.size >= 0 && t.push(`size: ${Math.floor(e.size)}`), e.type && t.push(`type: ${M(e.type) ?? "''"}`), t.push(`url: ${M(e.url) ?? "''"}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/AttachmentBlock.tsx
function vr(e) {
	return e.startsWith("image/") ? "🖼" : e.startsWith("video/") ? "🎞" : e.startsWith("audio/") ? "🎵" : e === "application/pdf" ? "📄" : e.includes("zip") || e.includes("compressed") || e.includes("tar") ? "🗜" : e.startsWith("text/") || e.includes("json") || e.includes("xml") ? "📝" : "📎";
}
function yr({ attachment: e, editable: t = !1, href: a = null, onOpen: o, previewSrc: s = null, onRemove: c, "data-testid": l = "attachment" }) {
	let d = e.size === null ? "" : u(e.size), f = !!(o || a), p = fr(e) && !!s, m = /* @__PURE__ */ x("span", {
		"data-testid": `${l}-name`,
		className: "min-w-0 break-all text-[13px] font-medium leading-5 text-text-primary",
		children: e.name
	});
	return /* @__PURE__ */ S("div", {
		"data-testid": l,
		"data-openable": String(f),
		className: "my-3 overflow-hidden rounded-md border border-border bg-surface",
		children: [p ? /* @__PURE__ */ x("img", {
			"data-testid": `${l}-preview`,
			src: s,
			alt: e.name,
			className: "block max-h-[360px] w-full bg-surface-inset object-contain",
			draggable: !1
		}) : null, /* @__PURE__ */ S("div", {
			className: "flex items-center gap-2.5 px-2.5 py-2",
			children: [
				/* @__PURE__ */ x("span", {
					"aria-hidden": "true",
					className: "shrink-0 text-[18px] leading-none",
					children: vr(e.type)
				}),
				/* @__PURE__ */ S("div", {
					className: "flex min-w-0 flex-1 flex-col",
					children: [o ? /* @__PURE__ */ x("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${l}-open`,
						onClick: o,
						className: "m-0 flex min-w-0 cursor-pointer border-0 bg-transparent p-0 text-left hover:underline",
						children: m
					}) : a ? /* @__PURE__ */ x("a", {
						"data-testid": `${l}-anchor`,
						href: i(a) ?? void 0,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "flex min-w-0 hover:underline",
						children: m
					}) : m, /* @__PURE__ */ x("span", {
						"data-testid": `${l}-meta`,
						className: n("min-w-0 truncate text-[11px] text-text-tertiary", !d && !e.type && "hidden"),
						children: [d, e.type].filter(Boolean).join(" · ")
					})]
				}),
				t && c ? /* @__PURE__ */ x(r, {
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
var br = class extends D {
	options;
	attachment;
	previewSrc = null;
	resolvedFor = null;
	constructor(e, t, n = {}) {
		super(e, lr), this.options = n, this.attachment = t, this.schedule(), this.resolvePreview();
	}
	resolvePreview() {
		let { resolve: e } = this.options, t = this.attachment;
		!e || !fr(t) || this.resolvedFor === t.url || (this.resolvedFor = t.url, e(t).then((e) => {
			this.resolvedFor === t.url && (this.previewSrc = e, this.schedule());
		}, () => {
			this.resolvedFor === t.url && (this.previewSrc = null);
		}));
	}
	element() {
		let e = this.attachment, { open: t } = this.options, n = t ? () => t(e) : void 0;
		return /* @__PURE__ */ x(yr, {
			attachment: e,
			editable: this.editable,
			href: gr(e),
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
function xr(e = {}) {
	return {
		macroName: lr,
		accepts: (e) => $(e.textContent) !== null,
		create: (t) => {
			let n = $(t.node.textContent);
			return n ? new br(t, n, e) : null;
		}
	};
}
var Sr = C.create({
	name: "attachmentMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return { insertAttachment: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.name?.trim() || !e.url?.trim() ? !1 : n.insertContent([{
			type: w,
			attrs: { macroName: lr },
			content: [{
				type: "text",
				text: _r(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, xr(this.options));
	}
});
//#endregion
export { P as ACTION_ITEMS_MACRO_NAME, Ye as ACTION_ITEM_CATEGORY, lr as ATTACHMENT_MACRO_NAME, dt as ActionItemsBlock, mt as ActionItemsMacro, yr as AttachmentBlock, Sr as AttachmentMacro, le as CollaborativeExcalidraw, V as DECISION_MACRO_NAME, en as DECISION_QUERYABILITY, Qt as DECISION_STATUSES, O as DIAGRAM_MACRO_NAME, or as DOCUMENT_LINK_CLICK_KEY, dn as DecisionBlock, gn as DecisionMacro, fe as DiagramBlockRenderer, Pe as DiagramMacro, d as DiagramPresenceBar, cr as DocumentLinkClick, q as FIELD_MACRO_NAME, yn as FIELD_QUERYABILITY, _n as FIELD_TYPES, Vn as FieldBlock, Wn as FieldMacro, gt as HITL_CONVERGENCE, yt as HITL_ITEM_CATEGORY, R as HITL_MACRO_NAME, ht as HITL_QUERYABILITY, vt as HITL_SENTINEL_SECTION, Kt as HitlBlock, Zt as HitlMacro, Gn as LINKS_MACRO_NAME, nr as LinksBlock, ar as LinksMacro, _t as MACRO_ITEM_SENTINEL_SECTION, Ee as MACRO_NODE_NAME, me as MACRO_RENDERERS_NAME, Fe as MacroRenderers, D as ReactMacroView, qe as STATUS_DONE, Je as STATUS_PENDING, ur as UPLOAD_PATH_PREFIX, hr as acceptsAttachment, rn as acceptsDecision, wn as acceptsField, $e as actionItemMirrorRow, it as actionItemsMacroText, pt as actionItemsRenderer, rt as addItemEdit, Qn as addLinkEdit, Ge as addListItemEdit, Nt as answerHitlEdit, gr as attachmentHref, _r as attachmentMacroText, xr as attachmentRenderer, sn as attributeDecisionEdit, ge as createMacroRendererRegistry, ln as decisionMacroText, hn as decisionRenderer, je as diagramMacroPluginKey, ke as diagramMacroText, Ne as diagramRenderer, Ze as ensureItemIdEdit, En as fieldBoolean, Dn as fieldDate, Rn as fieldMacroText, Tn as fieldNumber, Un as fieldRenderer, jn as fieldScalar, Cn as fitsFieldType, u as formatBytes, On as formatFieldDate, kn as formatFieldNumber, An as formatFieldValue, At as hitlExpired, Ft as hitlMacroText, zt as hitlMirrorRow, Bt as hitlPhase, Xt as hitlRenderer, ye as hostsMacroNodeViews, Oe as isDiagramId, dr as isHostedUpload, fr as isImageAttachment, qn as linkHref, $n as linksMacroText, ir as linksRenderer, Se as macroNodeViewPlugin, E as macroRendererPlugins, T as macroRendererStorage, ve as macroRenderersFor, he as macroRenderersPluginKey, De as newDiagramId, A as parseListBody, pe as plainMacroView, I as readActionItems, $ as readAttachment, G as readDecision, Ae as readDiagramId, B as readHitl, Jn as readLinks, Z as readTypedField, xe as refreshMacroViews, nt as removeItemEdit, Xe as removeItemKeyEdit, Zn as removeLinkEdit, We as removeListItemEdit, Ue as removeListItemKeyEdit, Pt as retractHitlEdit, sr as sameOriginDocumentPath, on as setDecisionStatusEdit, In as setFieldLabelEdit, Ln as setFieldTypeEdit, Fn as setFieldValueEdit, Rt as setHitlAssigneeEdit, F as setItemKeyEdit, tt as setItemTextEdit, Yn as setLinkLabelEdit, Xn as setLinkUrlEdit, He as setListItemKeyEdit, cn as supersedeDecisionEdit, et as toggleItemEdit, f as useResolvedTheme, M as yamlScalar };
