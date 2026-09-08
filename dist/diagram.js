import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./Input-DLknWXri.js";
import { t as o } from "./Textarea-Dz4doxTv.js";
import { t as s } from "./Select-CqVokE2v.js";
import { t as c } from "./Checkbox-DqN9RkXK.js";
import { n as l, t as u } from "./useResolvedTheme-MncahQcS.js";
import { Suspense as d, createElement as f, lazy as p, useCallback as m, useEffect as h, useMemo as ee, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
import { Extension as x } from "@tiptap/core";
import { NodeSelection as te, Plugin as ne, PluginKey as re, TextSelection as ie } from "@tiptap/pm/state";
import { createRoot as ae } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var oe = p(() => import("./ExcalidrawCanvas-Cb7J6789.js"));
function se({ label: e }) {
	return /* @__PURE__ */ y("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function ce(e) {
	return e.ydoc !== void 0;
}
function le(e) {
	return ce(e) ? /* @__PURE__ */ y(ue, { ...e }) : /* @__PURE__ */ y(de, { ...e });
}
function ue({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ y("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ y(d, {
			fallback: /* @__PURE__ */ y(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ y(oe, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function de({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...l }) {
	let u = g(/* @__PURE__ */ new Set()), f = m((e) => (u.current.add(e), () => {
		u.current.delete(e);
	}), []), p = m((e) => {
		u.current.forEach((t) => t(e));
	}, []), h = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), _ = t({
		config: h,
		onMessage: p
	}), { ydoc: v, provider: b, synced: x } = e({
		documentId: i,
		ws: _,
		onMessage: f
	});
	return v && (o !== !0 || x) ? /* @__PURE__ */ y("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ y(d, {
			fallback: /* @__PURE__ */ y(se, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ y(oe, {
				ydoc: v,
				awareness: b?.awareness ?? null,
				...l
			})
		})
	}) : /* @__PURE__ */ y("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ y(se, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function fe({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ b("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ y("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ y(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ y("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ y(le, {
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
	}) : /* @__PURE__ */ y("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ b("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ y("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ y("pre", {
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
var S = "macro", C = "macroRenderers", me = new re(C);
function he(e = []) {
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
var ge = /* @__PURE__ */ new WeakMap();
function _e(e) {
	let t = e.extensionManager ?? e, n = ge.get(t);
	return n || (n = he(), ge.set(t, n)), n;
}
function ve(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === C : i.length === 0 || i[0] === t;
}
function ye(e, t) {
	let n = pe(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function be(e) {
	let t = me.get(e.state)?.macroViews;
	return t ? (t.forEach((e) => e.refresh?.()), !0) : !1;
}
function xe(e) {
	let t = /* @__PURE__ */ new Set(), n = new ne({
		key: me,
		props: { nodeViews: { [S]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return pe(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return ye(n, o);
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
	let r = _e(e);
	for (let e of n) r.register(e);
	return ve(e, t) ? [xe(r)] : [];
}
var Se = {
	"action-items": "Action items",
	hitl: "Decision required",
	decision: "Decision",
	field: "Field",
	diagram: "Diagram"
};
function Ce(e) {
	return Se[e] ?? e;
}
//#endregion
//#region src/components/doc-macros/ReactMacroView.ts
function we(e) {
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
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.dom.setAttribute("role", "group"), this.dom.setAttribute("aria-label", Ce(t)), this.dom.setAttribute("tabindex", "-1"), this.dom.addEventListener("keydown", this.onEscape), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = ae(this.host);
	}
	onEscape = (e) => {
		if (e.key === "Escape") {
			if (we(e.target) && e.target !== this.dom) {
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
}, D = "diagram", Te = "macro";
function Ee() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function De(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function Oe(e) {
	return `id: ${e}`;
}
function ke(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return De(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var Ae = new re("diagramMacro"), je = class extends E {
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
		return f(fe, {
			diagramId: ke(t),
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
function Me(e) {
	return {
		macroName: D,
		create: (t) => new je(t, e)
	};
}
var Ne = x.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: Te,
			attrs: { macroName: D },
			content: [{
				type: "text",
				text: Oe(e ?? Ee())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, Me(this.options));
	}
}), Pe = x.create({
	name: C,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ...this.options.renderers);
	}
}), Fe = "done", Ie = "pending", O = "action-items", Le = "action-item", Re = /^([A-Za-z][A-Za-z0-9_-]*):/, ze = "  - ", k = "    ";
function Be(e) {
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
function Ve(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function He(e, t, n) {
	let r = Re.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Ve(e.slice(i, a));
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
function A(e) {
	let t = Be(e), n = 0;
	for (; n < t.length && t[n].text.trim() === "";) n += 1;
	let r = t[n];
	if (!r) return null;
	let i = He(r.text, r.start, 0);
	if (!i || i.key !== "items" || i.scalar.value !== "" && i.scalar.value !== "[]") return null;
	n += 1;
	let a = [], o = i.lineEnd;
	for (; n < t.length; n += 1) {
		let e = t[n];
		if (e.text.trim() !== "") {
			if (e.text.startsWith(ze)) {
				let t = He(e.text, e.start, 4);
				if (!t) return null;
				a.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith(k)) {
				let t = a[a.length - 1];
				if (!t) return null;
				let n = He(e.text, e.start, 4);
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
function j(e, t) {
	return e.entries.find((e) => e.key === t);
}
function M(e) {
	let t = A(e);
	return t ? t.items.map((e, t) => {
		let n = j(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			id: j(e, "id")?.scalar.value ?? null,
			text: j(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === Fe,
			assignee: j(e, "assignee")?.scalar.value ?? null,
			due: j(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function N(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Ue(e, t, n) {
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
function P(e, t, n, r) {
	let i = A(e)?.items[t];
	if (!i) return null;
	let a = N(r);
	if (a === null) return null;
	let o = j(i, n);
	return o ? o.scalar.value === r ? null : {
		from: o.scalar.from,
		to: o.scalar.to,
		insert: a
	} : Ue(i, n, a);
}
function We(e, t, n) {
	let r = A(e)?.items[t];
	if (!r) return null;
	let i = j(r, n);
	if (!i || r.entries.length < 2) return null;
	let a = r.entries.indexOf(i);
	if (a === 0) {
		let e = r.entries[1];
		return {
			from: i.lineStart + 4,
			to: e.lineStart + 4,
			insert: ""
		};
	}
	return {
		from: r.entries[a - 1].lineEnd,
		to: i.lineEnd,
		insert: ""
	};
}
function Ge(e, t, n = Ke) {
	let r = A(e)?.items[t];
	return !r || j(r, "id") ? null : P(e, t, "id", n());
}
function Ke() {
	let e = globalThis.crypto;
	return e?.randomUUID ? e.randomUUID() : `ai-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
function qe(e) {
	return !e.id || !e.assignee || !e.text ? null : {
		itemId: e.id,
		text: e.text,
		assigneeId: e.assignee,
		category: Le,
		dueDate: e.due,
		done: e.done
	};
}
function Je(e, t) {
	let n = M(e)?.[t];
	return n ? P(e, t, "status", n.done ? Ie : Fe) : null;
}
function Ye(e, t, n) {
	return P(e, t, "text", n);
}
function Xe(e, t) {
	let n = A(e), r = n?.items[t];
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
function Ze(e, t) {
	let n = A(e);
	if (!n) return null;
	let r = N(t);
	if (r === null) return null;
	let i = `${ze}status: ${Ie}\n${k}text: ${r}`;
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
function Qe(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? ze : k}${e}: ${N(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/useDraft.ts
function $e(e) {
	let [t, n] = _(e), r = g(e);
	return [
		t,
		m((e) => {
			r.current = e, n(e);
		}, []),
		m(() => r.current, [])
	];
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function et({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ y("button", {
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
function tt({ value: e, people: t, onAssign: n, testId: r }) {
	let i = e ?? "", a = t.some((e) => e.id === i);
	return /* @__PURE__ */ y(s, {
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
function nt({ item: e, testId: t, hideAssignee: n = !1 }) {
	let r = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ b(v, { children: [
		e.assignee && !n ? /* @__PURE__ */ b("span", {
			"data-testid": `${t}-assignee`,
			className: r,
			children: ["@", e.assignee]
		}) : null,
		e.due ? /* @__PURE__ */ b("span", {
			"data-testid": `${t}-due`,
			className: r,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ y("span", {
			"data-testid": `${t}-status`,
			className: r,
			children: e.status
		}) : null
	] });
}
function rt({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [o, s, c] = $e(e.text), l = g(!1);
	if (h(() => {
		l.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ y("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ y("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let u = () => {
		let t = c();
		t !== e.text && r?.(t);
	};
	return /* @__PURE__ */ y(a, {
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
function it({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, people: c, onAssign: l, "data-testid": u = "action-items" }) {
	let d = e.filter((e) => e.done).length;
	return /* @__PURE__ */ b("div", {
		"data-testid": u,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ y("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ b("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ b("span", {
					"data-testid": `${u}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						d,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ y(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${u}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ b("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ y("p", {
				"data-testid": `${u}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ y("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${u}-item-${e.index}`;
					return /* @__PURE__ */ b("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ y(et, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ y(rt, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ b("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [
									t && c && l ? /* @__PURE__ */ y(tt, {
										value: e.assignee,
										people: c,
										onAssign: (t) => l(e.index, t),
										testId: o
									}) : null,
									/* @__PURE__ */ y(nt, {
										item: e,
										testId: o,
										hideAssignee: !!(t && c && l)
									}),
									t ? /* @__PURE__ */ y(r, {
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
			}), t ? /* @__PURE__ */ y("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ y(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${u}-add`,
					onClick: o,
					children: "+ Add item"
				})
			}) : null]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/ActionItemsMacro.tsx
var at = class extends E {
	options;
	items;
	constructor(e, t, n = {}) {
		super(e, O), this.options = n, this.items = t, this.report(), this.schedule();
	}
	report() {
		let e = this.options.onItemChanged;
		if (e) for (let t of this.items) {
			let n = qe(t);
			n && e(n);
		}
	}
	element() {
		let e = this.options.people?.() ?? [];
		return /* @__PURE__ */ y(it, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(Je(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(Ye(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(Xe(this.node.textContent, e)),
			onAddItem: () => this.apply(Ze(this.node.textContent, "")),
			...e.length ? { people: e } : {},
			...e.length ? { onAssign: (e, t) => this.assign(e, t) } : {},
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	assign(e, t) {
		if (!t) {
			this.apply(We(this.node.textContent, e, "assignee"));
			return;
		}
		this.apply(Ge(this.node.textContent, e)), this.apply(P(this.node.textContent, e, "assignee", t));
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = M(e.textContent);
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
function ot(e = {}) {
	return {
		macroName: O,
		accepts: (e) => M(e.textContent) !== null,
		create: (t) => {
			let n = M(t.node.textContent);
			return n ? new at(t, n, e) : null;
		}
	};
}
var st = x.create({
	name: "actionItemsMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = Qe((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: S,
				attrs: { macroName: O },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ot(this.options));
	}
}), F = "hitl", ct = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", lt = "The body owns the ask and is projected to the row; the row owns whether an answer stuck. An answered row fills an unanswered body; an answered body is never overwritten, only reported.", ut = "_macro", dt = ut, ft = "hitl", pt = /^([A-Za-z][A-Za-z0-9_-]*):/, I = "  - ", mt = "    ", ht = /* @__PURE__ */ new Set(["then", "value"]), gt = [
	"answer",
	"answeredAt",
	"answeredBy"
], _t = "answeredBy";
function vt(e) {
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
function yt(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function bt(e, t, n) {
	let r = pt.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = yt(e.slice(i, a));
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
function L(e) {
	let t = vt(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(I)) {
			if (!a) return null;
			let t = e.text.slice(4), n = bt(e.text, e.start, 4);
			if (n) {
				if (!ht.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = yt(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(mt)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = bt(e.text, e.start, 4);
			if (!n || !ht.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = bt(e.text, e.start, 0);
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
function R(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function z(e) {
	let t = L(e);
	if (!t) return null;
	let n = R(t, "question");
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
		id: R(t, "id"),
		question: n,
		context: R(t, "context"),
		askedBy: R(t, "askedBy"),
		assignee: R(t, "assignee"),
		blocks: R(t, "blocks"),
		expiresAt: R(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: R(t, "answeredBy"),
		answeredAt: R(t, "answeredAt")
	};
}
function xt(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function St(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		gt.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function Ct(e, t) {
	let n = e.entries.find((e) => e.key > _t);
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
function wt(e, t) {
	let n = L(e);
	if (!n || !R(n, "question")) return null;
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
	let a = i.join("\n"), o = St(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => gt.includes(e.key)) ? null : Ct(n, a);
}
function Tt(e) {
	let t = L(e);
	if (!t) return null;
	let n = St(t);
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
function Et(e) {
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
		for (let e of i) typeof e == "string" ? t.push(`${I}${n(e)}`) : e.then ? (t.push(`${I}then: ${n(e.then)}`), t.push(`${mt}value: ${n(e.value)}`)) : t.push(`${I}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
function Dt(e, t, n) {
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
function Ot(e, t) {
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
function kt(e, t) {
	let n = L(e);
	if (!n || !R(n, "question")) return null;
	let r = n.entries.find((e) => e.key === "assignee");
	if (t === "") {
		if (!r) return null;
		let e = Ot(n, r);
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
	} : Dt(n, "assignee", i);
}
function At(e) {
	return !e.id || !e.assignee || !e.question ? null : {
		itemId: e.id,
		text: e.question,
		assigneeId: e.assignee,
		category: ft
	};
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function jt(e, t) {
	return e.answer === null ? xt(e, t) ? "expired" : "waiting" : "answered";
}
var Mt = {
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
}, Nt = "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function Pt({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ b("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ y(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ b("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function Ft({ value: e, people: t, disabled: n, onAssign: r, testId: i }) {
	let a = t.some((t) => t.id === e);
	return /* @__PURE__ */ y(s, {
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
function It({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = _(""), s = i.trim().length > 0 && !t, c = () => {
		s && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ b("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ y(o, {
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
		}), /* @__PURE__ */ y("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ y(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !s,
				onClick: c,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function Lt({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, people: c, onAssign: l, onRetract: u, onRemove: d, "data-testid": f = "hitl" }) {
	let p = jt(e, n), m = Mt[p], h = p === "waiting" && t && !!a, ee = p === "waiting" && t && !!l && (c?.length ?? 0) > 0;
	return /* @__PURE__ */ b("div", {
		"data-testid": f,
		"data-phase": p,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ y("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ y(i, {
					tone: m.tone,
					size: "xs",
					uppercase: !0,
					dot: p === "waiting" ? "pulse" : "static",
					"data-testid": `${f}-phase`,
					children: m.label
				}),
				/* @__PURE__ */ y("span", { className: "flex-1" }),
				t && d ? /* @__PURE__ */ y(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${f}-remove`,
					onClick: d,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ y("p", {
					"data-testid": `${f}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ y("p", {
					"data-testid": `${f}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ b("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ b("span", {
							"data-testid": `${f}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						ee ? /* @__PURE__ */ y(Ft, {
							value: e.assignee,
							people: c ?? [],
							disabled: o,
							onAssign: (e) => l?.(e),
							testId: f
						}) : e.assignee ? /* @__PURE__ */ b(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ y(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${f}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ b(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${f}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && p === "waiting" ? /* @__PURE__ */ b("span", {
							"data-testid": `${f}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				p === "answered" ? /* @__PURE__ */ b("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ b("span", {
							className: Nt,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ y("p", {
							"data-testid": `${f}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && u ? /* @__PURE__ */ y("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ y(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${f}-retract`,
								onClick: u,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				p === "expired" ? /* @__PURE__ */ y("p", {
					"data-testid": `${f}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ y("p", {
					"data-testid": `${f}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				h && e.options.length > 0 ? /* @__PURE__ */ y("div", {
					"data-testid": `${f}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ y(Pt, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${f}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				h && e.options.length === 0 ? /* @__PURE__ */ y(It, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: f
				}) : null,
				p === "waiting" && !h ? /* @__PURE__ */ y("p", {
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
function Rt(e) {
	return [
		e.id,
		e.assignee,
		e.question,
		e.answer === null ? "" : "answered"
	].join("\0");
}
function zt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var Bt = class extends E {
	options;
	callout;
	busy = !1;
	failure = null;
	signature;
	constructor(e, t, n) {
		super(e, F), this.options = n, this.callout = t, this.signature = Rt(t), this.options.onCalloutChanged?.(t), this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && Tt(this.node.textContent) !== null;
		return /* @__PURE__ */ y(Lt, {
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
		if (jt(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = zt(this.options.answeredBy), i = wt(this.node.textContent, {
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
		this.apply(Tt(this.node.textContent));
	}
	assign(e) {
		this.busy || this.apply(kt(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = z(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		this.node = e, this.callout = t, n && t.answer !== null && (this.failure = null), n && this.schedule();
		let r = Rt(t);
		return r !== this.signature && (this.signature = r, this.options.onCalloutChanged?.(t)), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function Vt(e = {}) {
	return {
		macroName: F,
		accepts: (e) => z(e.textContent) !== null,
		create: (t) => {
			let n = z(t.node.textContent);
			return n ? new Bt(t, n, e) : null;
		}
	};
}
var Ht = x.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return {
			insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
				type: S,
				attrs: { macroName: F },
				content: [{
					type: "text",
					text: Et(e)
				}]
			}, { type: "paragraph" }]),
			answerHitl: (e) => ({ state: t, tr: n, dispatch: r }) => {
				let i = t.schema.nodes[S];
				if (!i || !e.id || !e.answer) return !1;
				let a = !1;
				return t.doc.descendants((o, s) => {
					if (a) return !1;
					if (o.type !== i) return;
					if (o.attrs.macroName !== "hitl") return !1;
					let c = z(o.textContent);
					if (!c || c.id !== e.id || c.answer !== null) return !1;
					let l = wt(o.textContent, {
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
		return T(this.editor, this.name, Vt(this.options));
	}
}), B = "decision", Ut = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], Wt = new Set(Ut), Gt = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", Kt = /^([A-Za-z][A-Za-z0-9_-]*):/, V = "  - ";
function qt(e) {
	let t = e.trim();
	return t === "" ? "" : t === "|" || t === ">" || t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function H(e) {
	let t = [], n = [], r = 0, i = !1;
	for (let a of e.split("\n")) {
		let e = r, o = r + a.length;
		if (r = o + 1, a.trim() === "") {
			i = !1;
			continue;
		}
		if (i && a.startsWith(V)) {
			let e = qt(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = Kt.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = qt(c);
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
function U(e, t) {
	return e.entries.find((e) => e.key === t)?.value ?? "";
}
function W(e) {
	let t = H(e);
	if (!t) return null;
	let n = U(t, "decision");
	if (!n) return null;
	let r = U(t, "status");
	return r !== "" && !Wt.has(r) ? null : {
		decision: n,
		status: r || "proposed",
		rationale: U(t, "rationale"),
		alternatives: t.alternatives,
		decidedBy: U(t, "decidedBy"),
		decidedAt: U(t, "decidedAt"),
		supersededBy: U(t, "supersededBy"),
		id: U(t, "id")
	};
}
function Jt(e) {
	return W(e) !== null;
}
function Yt(e, t, n) {
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
function G(e, t, n) {
	let r = N(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : Yt(e, t, r);
}
function Xt(e, t) {
	let n = H(e);
	return !n || !U(n, "decision") || !Wt.has(t) ? null : G(n, "status", t);
}
function Zt(e, t) {
	let n = H(e);
	return n ? t.by ? G(n, "decidedBy", t.by) : t.at ? G(n, "decidedAt", t.at) : null : null;
}
function Qt(e, t) {
	let n = H(e);
	return !n || !U(n, "decision") ? null : G(n, "supersededBy", t);
}
function $t(e) {
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
			n !== null && t.push(`${V}${n}`.replace(V, V));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var en = {
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
function tn({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: o, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = _(""), d = en[e.status], f = e.status === "rejected";
	return /* @__PURE__ */ b("div", {
		"data-testid": c,
		"data-status": e.status,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ y("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Decision"
				}),
				/* @__PURE__ */ y(i, {
					tone: d.tone,
					size: "sm",
					"data-testid": `${c}-status`,
					children: d.label
				}),
				/* @__PURE__ */ y("span", {
					className: "text-[11px] text-text-tertiary",
					children: d.hint
				}),
				/* @__PURE__ */ y("span", { className: "flex-1" }),
				t && s && /* @__PURE__ */ y("button", {
					type: "button",
					"aria-label": "Remove this decision",
					onClick: s,
					className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
					children: "✕"
				})
			]
		}), /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ y("p", {
					"data-testid": `${c}-claim`,
					className: f ? "m-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through" : "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.decision
				}),
				e.rationale && /* @__PURE__ */ y("p", {
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.rationale
				}),
				e.alternatives.length > 0 && /* @__PURE__ */ b("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ y("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Also considered"
					}), /* @__PURE__ */ y("ul", {
						className: "m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary",
						children: e.alternatives.map((e, t) => /* @__PURE__ */ y("li", { children: e }, `${e}-${t}`))
					})]
				}),
				(e.decidedBy || e.decidedAt) && /* @__PURE__ */ b("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.decidedBy && /* @__PURE__ */ y("span", { children: e.decidedBy }),
						e.decidedBy && e.decidedAt && /* @__PURE__ */ y("span", { children: "·" }),
						e.decidedAt && /* @__PURE__ */ y("span", { children: e.decidedAt })
					]
				}),
				e.status === "superseded" && e.supersededBy && /* @__PURE__ */ b("p", {
					"data-testid": `${c}-superseded-by`,
					className: "m-0 text-[12px] leading-snug text-text-secondary",
					children: ["Replaced by ", /* @__PURE__ */ y("span", {
						className: "font-medium",
						children: e.supersededBy
					})]
				}),
				t && o && e.status === "superseded" && !e.supersededBy && /* @__PURE__ */ b("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ y(a, {
						"aria-label": "What replaced this decision",
						placeholder: "Replaced by…",
						value: l,
						onChange: (e) => u(e.target.value),
						"data-testid": `${c}-superseded-input`
					}), /* @__PURE__ */ y(r, {
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
				t && n && /* @__PURE__ */ y("div", {
					role: "group",
					"aria-label": "Decision status",
					className: "flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: Ut.map((t) => /* @__PURE__ */ y(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						onClick: () => {
							t !== e.status && n(t);
						},
						"data-testid": `${c}-set-${t}`,
						children: en[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function nn(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function rn(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var an = class extends E {
	options;
	decision;
	constructor(e, t, n) {
		super(e, B), this.options = n, this.decision = t, this.name(t), this.schedule();
	}
	name(e) {
		this.setAccessibleName(`Decision, ${e.status}: ${e.decision}`);
	}
	element() {
		return /* @__PURE__ */ y(tn, {
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
		if (!this.apply(Xt(this.node.textContent, e))) return;
		let t = nn(this.options.decidedBy);
		t && this.apply(Zt(this.node.textContent, { by: t })), this.apply(Zt(this.node.textContent, { at: rn(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(Qt(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = W(e.textContent);
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
function on(e = {}) {
	return {
		macroName: B,
		accepts: (e) => W(e.textContent) !== null,
		create: (t) => {
			let n = W(t.node.textContent);
			return n ? new an(t, n, e) : null;
		}
	};
}
var sn = x.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: S,
			attrs: { macroName: B },
			content: [{
				type: "text",
				text: $t(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, on(this.options));
	}
}), K = "field", cn = [
	"text",
	"date",
	"number",
	"boolean"
], ln = new Set(cn), un = "The body is the record and there is no mirror. A field index, if one is ever wanted, is a scan over document bodies — not a write-through that can go stale and misreport a real number.", dn = /^([A-Za-z][A-Za-z0-9_-]*):/;
function fn(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function q(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = n, i = n + r.length;
		if (n = i + 1, r.trim() === "") continue;
		let a = dn.exec(r);
		if (!a) return null;
		let o = r.slice(a[0].length), s = fn(o);
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
function J(e, t) {
	return e.entries.find((e) => e.key === t);
}
function Y(e) {
	for (let t of [
		"label",
		"type",
		"value"
	]) if (e.entries.filter((e) => e.key === t).length > 1) return !0;
	return !1;
}
var pn = /^\d{4}-\d{2}-\d{2}$/;
function X(e, t) {
	switch (e) {
		case "text": return !0;
		case "boolean": return t === "true" || t === "false";
		case "number": return t.trim() !== "" && Number.isFinite(Number(t));
		case "date": {
			if (!pn.test(t)) return !1;
			let e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
			return !Number.isNaN(e.getTime()) && e.toISOString().slice(0, 10) === t;
		}
	}
}
function Z(e) {
	let t = q(e);
	if (!t || Y(t)) return null;
	let n = J(t, "label")?.value ?? "";
	if (!n) return null;
	let r = J(t, "type")?.value ?? "";
	if (r !== "" && !ln.has(r)) return null;
	let i = r || "text", a = J(t, "value")?.value;
	return {
		label: n,
		type: i,
		value: a,
		valid: a === void 0 || X(i, a)
	};
}
function mn(e) {
	return Z(e) !== null;
}
function hn(e) {
	if (e.value === void 0 || e.type !== "number" || e.value.trim() === "") return;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : void 0;
}
function gn(e) {
	if (e.value !== void 0 && e.type === "boolean") {
		if (e.value === "true") return !0;
		if (e.value === "false") return !1;
	}
}
function _n(e) {
	return e.value === void 0 || e.type !== "date" ? "" : X("date", e.value) ? e.value : "";
}
function vn(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function yn(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function bn(e) {
	if (e.value === void 0) return "";
	if (!e.valid) return e.value;
	switch (e.type) {
		case "date": return vn(e.value);
		case "number": {
			let t = hn(e);
			return t === void 0 ? e.value : yn(t);
		}
		case "boolean": return e.value === "true" ? "Yes" : "No";
		case "text": return e.value;
	}
}
function Q(e, t) {
	return X(e, t) ? e === "boolean" ? t : e === "number" ? t.trim() : N(t) : N(t);
}
function xn(e, t, n) {
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
function $(e, t, n, r) {
	if (r === null) return null;
	let i = J(e, t);
	return i ? i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : xn(e, t, r);
}
function Sn(e, t) {
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
function Cn(e, t) {
	let n = q(e);
	if (!n || Y(n) || !J(n, "label")?.value) return null;
	let r = J(n, "value");
	if (t === void 0) return r ? Sn(n, r) : null;
	let i = J(n, "type")?.value ?? "";
	return i !== "" && !ln.has(i) ? null : $(n, "value", t, Q(i || "text", t));
}
function wn(e, t) {
	let n = q(e);
	return !n || Y(n) || !J(n, "label")?.value || t.trim() === "" ? null : $(n, "label", t, N(t));
}
function Tn(e, t) {
	let n = q(e);
	return !n || Y(n) || !J(n, "label")?.value || !ln.has(t) ? null : $(n, "type", t, t);
}
function En(e) {
	let t = e.type ?? "text", n = [`label: ${N(e.label) ?? N(e.label.split("\n")[0] ?? "") ?? "''"}`, `type: ${t}`];
	if (e.value !== void 0) {
		let r = Q(t, e.value);
		r !== null && n.push(`value: ${r}`);
	}
	return n.join("\n");
}
//#endregion
//#region src/components/doc-macros/FieldBlock.tsx
var Dn = {
	text: "Text",
	date: "Date",
	number: "Number",
	boolean: "Yes / no"
}, On = {
	text: "not text",
	date: "not a date",
	number: "not a number",
	boolean: "not yes / no"
};
function kn({ field: e, editable: t = !1, onValueChange: n, onLabelChange: r, onTypeChange: o, onRemove: l, testId: u = "field-block" }) {
	let [d, f, p] = $e(null), [m, h, ee] = $e(null), g = e.value === void 0 ? "empty" : e.valid ? "set" : "invalid";
	if (!t) {
		let t = bn(e);
		return /* @__PURE__ */ b("div", {
			"data-testid": u,
			"data-field-type": e.type,
			"data-field-state": g,
			className: "my-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5",
			children: [
				/* @__PURE__ */ y("span", {
					"data-testid": `${u}-label`,
					className: "min-w-[7.5rem] text-[12px] font-medium text-text-secondary",
					children: e.label
				}),
				t ? /* @__PURE__ */ y("span", {
					"data-testid": `${u}-value`,
					className: "text-[13.5px] leading-snug text-text-primary",
					children: t
				}) : /* @__PURE__ */ y("span", {
					"data-testid": `${u}-empty`,
					className: "text-[12px] italic text-text-tertiary",
					children: "Not set"
				}),
				!e.valid && /* @__PURE__ */ y(i, {
					tone: "warning",
					size: "xs",
					"data-testid": `${u}-invalid`,
					children: On[e.type]
				})
			]
		});
	}
	let _ = () => {
		let t = p();
		f(null), t !== null && t.trim() !== "" && t !== e.label && r?.(t);
	}, v = () => {
		let t = ee();
		h(null), t !== null && t !== (e.value ?? "") && n?.(t === "" ? void 0 : t);
	}, x = (e, t) => ({ onKeyDown: (n) => {
		n.key === "Enter" && (n.preventDefault(), e(), n.currentTarget.blur()), n.key === "Escape" && (n.preventDefault(), t(), n.currentTarget.blur());
	} }), te = m ?? e.value ?? "", ne = () => {
		if (!e.valid) return /* @__PURE__ */ y(a, {
			size: "sm",
			invalid: !0,
			"aria-label": `${e.label} (value)`,
			"data-testid": `${u}-raw-input`,
			className: "w-[11rem]",
			value: te,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...x(v, () => h(null))
		});
		if (e.type === "boolean") {
			let t = gn(e);
			return /* @__PURE__ */ b("span", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ y(c, {
					checked: t === !0,
					indeterminate: t === void 0,
					"aria-label": e.label,
					"data-testid": `${u}-checkbox`,
					onChange: (e) => n?.(e ? "true" : "false")
				}), /* @__PURE__ */ y("span", {
					className: "text-[12px] text-text-secondary",
					children: t === void 0 ? "Not set" : t ? "Yes" : "No"
				})]
			});
		}
		if (e.type === "date") {
			let t = _n(e);
			return /* @__PURE__ */ b("span", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ y(a, {
					size: "sm",
					type: "date",
					"aria-label": e.label,
					"data-testid": `${u}-date-input`,
					className: "w-[9.5rem]",
					value: t,
					onChange: (e) => n?.(e.target.value || void 0)
				}), t && /* @__PURE__ */ y("span", {
					"data-testid": `${u}-formatted`,
					className: "text-[12px] tabular-nums text-text-tertiary",
					children: vn(t)
				})]
			});
		}
		return /* @__PURE__ */ y(a, {
			size: "sm",
			type: e.type === "number" ? "number" : "text",
			"aria-label": e.label,
			"data-testid": `${u}-input`,
			className: e.type === "number" ? "w-[8rem]" : "w-[13rem]",
			placeholder: "Not set",
			value: te,
			onChange: (e) => h(e.target.value),
			onBlur: v,
			...x(v, () => h(null))
		});
	};
	return /* @__PURE__ */ b("div", {
		"data-testid": u,
		"data-field-type": e.type,
		"data-field-state": g,
		className: "my-1 flex flex-wrap items-center gap-x-2 gap-y-1",
		children: [
			/* @__PURE__ */ y(a, {
				size: "sm",
				"aria-label": "Field name",
				"data-testid": `${u}-label-input`,
				className: "w-[9rem] font-medium",
				value: d ?? e.label,
				onChange: (e) => f(e.target.value),
				onBlur: _,
				...x(_, () => f(null))
			}),
			ne(),
			!e.valid && /* @__PURE__ */ y(i, {
				tone: "warning",
				size: "xs",
				"data-testid": `${u}-invalid`,
				children: On[e.type]
			}),
			e.value !== void 0 && /* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `${u}-clear`,
				onClick: () => n?.(void 0),
				className: "rounded px-1 text-[12px] text-text-tertiary hover:text-text-primary",
				children: "Clear"
			}),
			/* @__PURE__ */ y(s, {
				size: "sm",
				"aria-label": "Field type",
				"data-testid": `${u}-type`,
				className: "w-[7.5rem]",
				value: e.type,
				options: cn.map((e) => ({
					value: e,
					label: Dn[e]
				})),
				onChange: (e) => o?.(e.target.value)
			}),
			/* @__PURE__ */ y("span", { className: "flex-1" }),
			l && /* @__PURE__ */ y("button", {
				type: "button",
				"aria-label": "Remove this field",
				"data-testid": `${u}-remove`,
				onClick: l,
				className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
				children: "✕"
			})
		]
	});
}
//#endregion
//#region src/components/doc-macros/FieldMacro.tsx
var An = class extends E {
	field;
	constructor(e, t) {
		super(e, K), this.field = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ y(kn, {
			field: this.field,
			editable: this.editable,
			...this.editable ? {
				onValueChange: (e) => this.apply(Cn(this.node.textContent, e)),
				onLabelChange: (e) => this.apply(wn(this.node.textContent, e)),
				onTypeChange: (e) => this.apply(Tn(this.node.textContent, e)),
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
function jn() {
	return {
		macroName: K,
		accepts: (e) => Z(e.textContent) !== null,
		create: (e) => {
			let t = Z(e.node.textContent);
			return t ? new An(e, t) : null;
		}
	};
}
var Mn = x.create({
	name: "fieldMacro",
	addStorage: w,
	addCommands() {
		return { insertField: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.label || e.label.trim() === "" ? !1 : n.insertContent([{
			type: S,
			attrs: { macroName: K },
			content: [{
				type: "text",
				text: En(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, jn());
	}
});
//#endregion
export { O as ACTION_ITEMS_MACRO_NAME, Le as ACTION_ITEM_CATEGORY, it as ActionItemsBlock, st as ActionItemsMacro, le as CollaborativeExcalidraw, B as DECISION_MACRO_NAME, Gt as DECISION_QUERYABILITY, Ut as DECISION_STATUSES, D as DIAGRAM_MACRO_NAME, tn as DecisionBlock, sn as DecisionMacro, fe as DiagramBlockRenderer, Ne as DiagramMacro, l as DiagramPresenceBar, K as FIELD_MACRO_NAME, un as FIELD_QUERYABILITY, cn as FIELD_TYPES, kn as FieldBlock, Mn as FieldMacro, lt as HITL_CONVERGENCE, ft as HITL_ITEM_CATEGORY, F as HITL_MACRO_NAME, ct as HITL_QUERYABILITY, dt as HITL_SENTINEL_SECTION, Lt as HitlBlock, Ht as HitlMacro, ut as MACRO_ITEM_SENTINEL_SECTION, Te as MACRO_NODE_NAME, C as MACRO_RENDERERS_NAME, Pe as MacroRenderers, E as ReactMacroView, Fe as STATUS_DONE, Ie as STATUS_PENDING, Jt as acceptsDecision, mn as acceptsField, qe as actionItemMirrorRow, Qe as actionItemsMacroText, ot as actionItemsRenderer, Ze as addItemEdit, wt as answerHitlEdit, Zt as attributeDecisionEdit, he as createMacroRendererRegistry, $t as decisionMacroText, on as decisionRenderer, Ae as diagramMacroPluginKey, Oe as diagramMacroText, Me as diagramRenderer, Ge as ensureItemIdEdit, gn as fieldBoolean, _n as fieldDate, En as fieldMacroText, hn as fieldNumber, jn as fieldRenderer, Q as fieldScalar, X as fitsFieldType, vn as formatFieldDate, yn as formatFieldNumber, bn as formatFieldValue, xt as hitlExpired, Et as hitlMacroText, At as hitlMirrorRow, jt as hitlPhase, Vt as hitlRenderer, ve as hostsMacroNodeViews, De as isDiagramId, xe as macroNodeViewPlugin, T as macroRendererPlugins, w as macroRendererStorage, _e as macroRenderersFor, me as macroRenderersPluginKey, Ee as newDiagramId, pe as plainMacroView, M as readActionItems, W as readDecision, ke as readDiagramId, z as readHitl, Z as readTypedField, be as refreshMacroViews, Xe as removeItemEdit, We as removeItemKeyEdit, Tt as retractHitlEdit, Xt as setDecisionStatusEdit, wn as setFieldLabelEdit, Tn as setFieldTypeEdit, Cn as setFieldValueEdit, kt as setHitlAssigneeEdit, P as setItemKeyEdit, Ye as setItemTextEdit, Qt as supersedeDecisionEdit, Je as toggleItemEdit, u as useResolvedTheme, N as yamlScalar };
