import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./Input-DLknWXri.js";
import { t as o } from "./Textarea-Dz4doxTv.js";
import { n as s, t as c } from "./useResolvedTheme-MncahQcS.js";
import { Suspense as l, createElement as u, lazy as d, useCallback as f, useEffect as p, useMemo as ee, useRef as te, useState as m } from "react";
import { Fragment as ne, jsx as h, jsxs as g } from "react/jsx-runtime";
import { Extension as _ } from "@tiptap/core";
import { Plugin as re, PluginKey as v } from "@tiptap/pm/state";
import { createRoot as ie } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var ae = d(() => import("./ExcalidrawCanvas-Cb7J6789.js"));
function y({ label: e }) {
	return /* @__PURE__ */ h("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function oe(e) {
	return e.ydoc !== void 0;
}
function se(e) {
	return oe(e) ? /* @__PURE__ */ h(ce, { ...e }) : /* @__PURE__ */ h(le, { ...e });
}
function ce({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ h("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ h(l, {
			fallback: /* @__PURE__ */ h(y, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ h(ae, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function le({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...u }) {
	let d = te(/* @__PURE__ */ new Set()), p = f((e) => (d.current.add(e), () => {
		d.current.delete(e);
	}), []), m = f((e) => {
		d.current.forEach((t) => t(e));
	}, []), ne = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), g = t({
		config: ne,
		onMessage: m
	}), { ydoc: _, provider: re, synced: v } = e({
		documentId: i,
		ws: g,
		onMessage: p
	});
	return _ && (o !== !0 || v) ? /* @__PURE__ */ h("div", {
		className: n("h-full w-full", c),
		children: /* @__PURE__ */ h(l, {
			fallback: /* @__PURE__ */ h(y, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ h(ae, {
				ydoc: _,
				awareness: re?.awareness ?? null,
				...u
			})
		})
	}) : /* @__PURE__ */ h("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ h(y, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function ue({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
	let d = u ?? `diagram-block-${e ?? "unreadable"}`;
	return e ? i ? /* @__PURE__ */ g("div", {
		"data-testid": d,
		"data-diagram-id": e,
		className: "my-3",
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ h("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Diagram"
			}), o && l && /* @__PURE__ */ h(r, {
				size: "sm",
				variant: "ghost",
				onClick: l,
				"data-testid": `${d}-remove`,
				children: "Remove"
			})]
		}), /* @__PURE__ */ h("div", {
			className: n("h-[420px] w-full overflow-hidden rounded-b-md border border-border"),
			children: /* @__PURE__ */ h(se, {
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
	}) : /* @__PURE__ */ h("div", {
		"data-testid": `${d}-unavailable`,
		className: "rounded-md border border-dashed border-border-emphasis bg-surface-inset px-4 py-3.5 text-center text-[13px] text-neutral",
		children: "Diagram unavailable — this page is not connected to a shared document."
	}) : /* @__PURE__ */ g("div", {
		"data-testid": `${d}-unreadable`,
		className: "rounded-md border border-dashed border-warning-border bg-warning-bg px-4 py-3 text-[13px] text-warning-fg",
		children: [/* @__PURE__ */ h("p", {
			className: "mb-1.5 font-semibold",
			children: "This diagram block no longer names a diagram."
		}), /* @__PURE__ */ h("pre", {
			className: "overflow-x-auto whitespace-pre-wrap font-mono text-xs",
			children: t
		})]
	});
}
//#endregion
//#region src/components/doc-macros/ReactMacroView.ts
var b = class {
	dom;
	node;
	view;
	getPos;
	host;
	root;
	dead = !1;
	queued = !1;
	constructor(e, t) {
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = ie(this.host);
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
function x(e) {
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
var S = "macro", C = "macroRenderers", de = new v(C);
function fe(e = []) {
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
var pe = /* @__PURE__ */ new WeakMap();
function me(e) {
	let t = e.extensionManager ?? e, n = pe.get(t);
	return n || (n = fe(), pe.set(t, n)), n;
}
function he(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === C : i.length === 0 || i[0] === t;
}
function ge(e, t) {
	let n = x(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function _e(e) {
	let t = /* @__PURE__ */ new Set();
	return new re({
		key: de,
		props: { nodeViews: { [S]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return x(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return ge(n, o);
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
function T(e, t, ...n) {
	let r = me(e);
	for (let e of n) r.register(e);
	return he(e, t) ? [_e(r)] : [];
}
//#endregion
//#region src/components/diagram/macro.ts
var E = "diagram", ve = "macro";
function ye() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function be(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function xe(e) {
	return `id: ${e}`;
}
function Se(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return be(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var Ce = new v("diagramMacro"), we = class extends b {
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
		super(e, E), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return u(ue, {
			diagramId: Se(t),
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
function Te(e) {
	return {
		macroName: E,
		create: (t) => new we(t, e)
	};
}
var Ee = _.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: ve,
			attrs: { macroName: E },
			content: [{
				type: "text",
				text: xe(e ?? ye())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, Te(this.options));
	}
}), De = _.create({
	name: C,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: w,
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ...this.options.renderers);
	}
}), D = "done", O = "pending", k = "action-items", Oe = /^([A-Za-z][A-Za-z0-9_-]*):/, A = "  - ", j = "    ";
function ke(e) {
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
function Ae(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function M(e, t, n) {
	let r = Oe.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Ae(e.slice(i, a));
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
function N(e) {
	let t = ke(e), n = 0;
	for (; n < t.length && t[n].text.trim() === "";) n += 1;
	let r = t[n];
	if (!r) return null;
	let i = M(r.text, r.start, 0);
	if (!i || i.key !== "items" || i.scalar.value !== "" && i.scalar.value !== "[]") return null;
	n += 1;
	let a = [], o = i.lineEnd;
	for (; n < t.length; n += 1) {
		let e = t[n];
		if (e.text.trim() !== "") {
			if (e.text.startsWith(A)) {
				let t = M(e.text, e.start, 4);
				if (!t) return null;
				a.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith(j)) {
				let t = a[a.length - 1];
				if (!t) return null;
				let n = M(e.text, e.start, 4);
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
function P(e, t) {
	return e.entries.find((e) => e.key === t);
}
function F(e) {
	let t = N(e);
	return t ? t.items.map((e, t) => {
		let n = P(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			text: P(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === D,
			assignee: P(e, "assignee")?.scalar.value ?? null,
			due: P(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function I(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function je(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${j}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${j}${t}: ${n}`
	};
}
function L(e, t, n, r) {
	let i = N(e)?.items[t];
	if (!i) return null;
	let a = I(r);
	if (a === null) return null;
	let o = P(i, n);
	return o ? o.scalar.value === r ? null : {
		from: o.scalar.from,
		to: o.scalar.to,
		insert: a
	} : je(i, n, a);
}
function Me(e, t) {
	let n = F(e)?.[t];
	return n ? L(e, t, "status", n.done ? O : D) : null;
}
function Ne(e, t, n) {
	return L(e, t, "text", n);
}
function Pe(e, t) {
	let n = N(e), r = n?.items[t];
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
function Fe(e, t) {
	let n = N(e);
	if (!n) return null;
	let r = I(t);
	if (r === null) return null;
	let i = `${A}status: ${O}\n${j}text: ${r}`;
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
function Ie(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? A : j}${e}: ${I(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function Le({ item: e, editable: t, onToggle: r, testId: i }) {
	return /* @__PURE__ */ h("button", {
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
function Re({ item: e, testId: t }) {
	let n = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ g(ne, { children: [
		e.assignee ? /* @__PURE__ */ g("span", {
			"data-testid": `${t}-assignee`,
			className: n,
			children: ["@", e.assignee]
		}) : null,
		e.due ? /* @__PURE__ */ g("span", {
			"data-testid": `${t}-due`,
			className: n,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ h("span", {
			"data-testid": `${t}-status`,
			className: n,
			children: e.status
		}) : null
	] });
}
function ze({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [o, s] = m(e.text), c = te(!1);
	if (p(() => {
		c.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ h("span", {
		"data-testid": `${i}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ h("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let l = () => {
		o !== e.text && r?.(o);
	};
	return /* @__PURE__ */ h(a, {
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
function Be({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, "data-testid": c = "action-items" }) {
	let l = e.filter((e) => e.done).length;
	return /* @__PURE__ */ g("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ h("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ g("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ g("span", {
					"data-testid": `${c}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						l,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ h(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${c}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ g("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ h("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ h("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-item-${e.index}`;
					return /* @__PURE__ */ g("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ h(Le, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ h(ze, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ g("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [/* @__PURE__ */ h(Re, {
									item: e,
									testId: o
								}), t ? /* @__PURE__ */ h(r, {
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
			}), t ? /* @__PURE__ */ h("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ h(r, {
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
var Ve = class extends b {
	items;
	constructor(e, t) {
		super(e, k), this.items = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ h(Be, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(Me(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(Ne(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(Pe(this.node.textContent, e)),
			onAddItem: () => this.apply(Fe(this.node.textContent, "")),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = F(e.textContent);
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
function He() {
	return {
		macroName: k,
		accepts: (e) => F(e.textContent) !== null,
		create: (e) => {
			let t = F(e.node.textContent);
			return t ? new Ve(e, t) : null;
		}
	};
}
var Ue = _.create({
	name: "actionItemsMacro",
	addStorage: w,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = Ie((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: S,
				attrs: { macroName: k },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, He());
	}
}), R = "hitl", We = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", Ge = "_macro", Ke = "hitl", qe = /^([A-Za-z][A-Za-z0-9_-]*):/, z = "  - ", Je = "    ", Ye = /* @__PURE__ */ new Set(["then", "value"]), Xe = [
	"answer",
	"answeredAt",
	"answeredBy"
], Ze = "answeredBy";
function Qe(e) {
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
function $e(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function B(e, t, n) {
	let r = qe.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = $e(e.slice(i, a));
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
	let t = Qe(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(z)) {
			if (!a) return null;
			let t = e.text.slice(4), n = B(e.text, e.start, 4);
			if (n) {
				if (!Ye.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = $e(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(Je)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = B(e.text, e.start, 4);
			if (!n || !Ye.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = B(e.text, e.start, 0);
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
function H(e, t) {
	return e.entries.find((e) => e.key === t)?.scalar.value ?? "";
}
function U(e) {
	let t = V(e);
	if (!t) return null;
	let n = H(t, "question");
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
		id: H(t, "id"),
		question: n,
		context: H(t, "context"),
		askedBy: H(t, "askedBy"),
		assignee: H(t, "assignee"),
		blocks: H(t, "blocks"),
		expiresAt: H(t, "expiresAt") || null,
		options: r,
		answer: i ? i.scalar.value : null,
		answeredBy: H(t, "answeredBy"),
		answeredAt: H(t, "answeredAt")
	};
}
function et(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function tt(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		Xe.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function nt(e, t) {
	let n = e.entries.find((e) => e.key > Ze);
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
function rt(e, t) {
	let n = V(e);
	if (!n || !H(n, "question")) return null;
	let r = I(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = I(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = I(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = tt(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => Xe.includes(e.key)) ? null : nt(n, a);
}
function W(e) {
	let t = V(e);
	if (!t) return null;
	let n = tt(t);
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
function it(e) {
	let t = [], n = (e) => I(e) ?? "''", r = [
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
		for (let e of i) typeof e == "string" ? t.push(`${z}${n(e)}`) : e.then ? (t.push(`${z}then: ${n(e.then)}`), t.push(`${Je}value: ${n(e.value)}`)) : t.push(`${z}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function G(e, t) {
	return e.answer === null ? et(e, t) ? "expired" : "waiting" : "answered";
}
var at = {
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
}, ot = "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function st({ option: e, disabled: t, onPick: n, testId: i }) {
	return /* @__PURE__ */ g("div", {
		className: "flex min-w-0 flex-col gap-0.5",
		children: [/* @__PURE__ */ h(r, {
			variant: "secondary",
			size: "sm",
			"data-testid": i,
			disabled: t,
			onClick: n,
			children: e.value
		}), e.then ? /* @__PURE__ */ g("span", {
			"data-testid": `${i}-then`,
			className: "px-0.5 text-[11px] leading-snug text-text-tertiary",
			children: ["→ ", e.then]
		}) : null]
	});
}
function ct({ onAnswer: e, busy: t, testId: n }) {
	let [i, a] = m(""), s = i.trim().length > 0 && !t, c = () => {
		s && (e(i.trim()), a(""));
	};
	return /* @__PURE__ */ g("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ h(o, {
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
		}), /* @__PURE__ */ h("div", {
			className: "flex items-center justify-end",
			children: /* @__PURE__ */ h(r, {
				size: "sm",
				"data-testid": `${n}-send`,
				disabled: !s,
				onClick: c,
				children: t ? "Sending…" : "Send answer"
			})
		})]
	});
}
function lt({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, onRetract: c, onRemove: l, "data-testid": u = "hitl" }) {
	let d = G(e, n), f = at[d], p = d === "waiting" && t && !!a;
	return /* @__PURE__ */ g("div", {
		"data-testid": u,
		"data-phase": d,
		className: "my-3",
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ h("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ h(i, {
					tone: f.tone,
					size: "xs",
					uppercase: !0,
					dot: d === "waiting" ? "pulse" : "static",
					"data-testid": `${u}-phase`,
					children: f.label
				}),
				/* @__PURE__ */ h("span", { className: "flex-1" }),
				t && l ? /* @__PURE__ */ h(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${u}-remove`,
					onClick: l,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ g("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ h("p", {
					"data-testid": `${u}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ h("p", {
					"data-testid": `${u}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ g("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ g("span", {
							"data-testid": `${u}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						e.assignee ? /* @__PURE__ */ g(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ h(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ g(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${u}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && d === "waiting" ? /* @__PURE__ */ g("span", {
							"data-testid": `${u}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				d === "answered" ? /* @__PURE__ */ g("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ g("span", {
							className: ot,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ h("p", {
							"data-testid": `${u}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && c ? /* @__PURE__ */ h("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ h(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${u}-retract`,
								onClick: c,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				d === "expired" ? /* @__PURE__ */ h("p", {
					"data-testid": `${u}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ h("p", {
					"data-testid": `${u}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				p && e.options.length > 0 ? /* @__PURE__ */ h("div", {
					"data-testid": `${u}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ h(st, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${u}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				p && e.options.length === 0 ? /* @__PURE__ */ h(ct, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: u
				}) : null,
				d === "waiting" && !p ? /* @__PURE__ */ h("p", {
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
function ut(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var dt = class extends b {
	options;
	callout;
	busy = !1;
	failure = null;
	constructor(e, t, n) {
		super(e, R), this.options = n, this.callout = t, this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && W(this.node.textContent) !== null;
		return /* @__PURE__ */ h(lt, {
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
		if (G(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = ut(this.options.answeredBy), i = rt(this.node.textContent, {
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
		this.apply(W(this.node.textContent));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = U(e.textContent);
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
function ft(e = {}) {
	return {
		macroName: R,
		accepts: (e) => U(e.textContent) !== null,
		create: (t) => {
			let n = U(t.node.textContent);
			return n ? new dt(t, n, e) : null;
		}
	};
}
var pt = _.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
			type: S,
			attrs: { macroName: R },
			content: [{
				type: "text",
				text: it(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, ft(this.options));
	}
}), K = "decision", q = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], mt = new Set(q), ht = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", gt = /^([A-Za-z][A-Za-z0-9_-]*):/, J = "  - ";
function _t(e) {
	let t = e.trim();
	return t === "" ? "" : t === "|" || t === ">" || t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function Y(e) {
	let t = [], n = [], r = 0, i = !1;
	for (let a of e.split("\n")) {
		let e = r, o = r + a.length;
		if (r = o + 1, a.trim() === "") {
			i = !1;
			continue;
		}
		if (i && a.startsWith(J)) {
			let e = _t(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = gt.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = _t(c);
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
function X(e, t) {
	return e.entries.find((e) => e.key === t)?.value ?? "";
}
function Z(e) {
	let t = Y(e);
	if (!t) return null;
	let n = X(t, "decision");
	if (!n) return null;
	let r = X(t, "status");
	return r !== "" && !mt.has(r) ? null : {
		decision: n,
		status: r || "proposed",
		rationale: X(t, "rationale"),
		alternatives: t.alternatives,
		decidedBy: X(t, "decidedBy"),
		decidedAt: X(t, "decidedAt"),
		supersededBy: X(t, "supersededBy"),
		id: X(t, "id")
	};
}
function vt(e) {
	return Z(e) !== null;
}
function yt(e, t, n) {
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
function Q(e, t, n) {
	let r = I(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : yt(e, t, r);
}
function bt(e, t) {
	let n = Y(e);
	return !n || !X(n, "decision") || !mt.has(t) ? null : Q(n, "status", t);
}
function $(e, t) {
	let n = Y(e);
	return n ? t.by ? Q(n, "decidedBy", t.by) : t.at ? Q(n, "decidedAt", t.at) : null : null;
}
function xt(e, t) {
	let n = Y(e);
	return !n || !X(n, "decision") ? null : Q(n, "supersededBy", t);
}
function St(e) {
	let t = [], n = (e, n) => {
		if (!n) return;
		let r = I(n);
		r !== null && t.push(`${e}: ${r}`);
	};
	n("decidedAt", e.decidedAt), n("decidedBy", e.decidedBy), n("decision", e.decision), n("id", e.id), n("rationale", e.rationale), n("status", e.status ?? "proposed");
	let r = (e.alternatives ?? []).filter((e) => e.trim() !== "");
	if (r.length > 0) {
		t.push("alternatives:");
		for (let e of r) {
			let n = I(e);
			n !== null && t.push(`${J}${n}`.replace(J, J));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var Ct = {
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
function wt({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: o, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = m(""), d = Ct[e.status], f = e.status === "rejected";
	return /* @__PURE__ */ g("div", {
		"data-testid": c,
		"data-status": e.status,
		className: "my-3",
		children: [/* @__PURE__ */ g("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ h("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Decision"
				}),
				/* @__PURE__ */ h(i, {
					tone: d.tone,
					size: "sm",
					"data-testid": `${c}-status`,
					children: d.label
				}),
				/* @__PURE__ */ h("span", {
					className: "text-[11px] text-text-tertiary",
					children: d.hint
				}),
				/* @__PURE__ */ h("span", { className: "flex-1" }),
				t && s && /* @__PURE__ */ h("button", {
					type: "button",
					"aria-label": "Remove this decision",
					onClick: s,
					className: "rounded px-1 text-[13px] leading-none text-text-tertiary hover:text-danger-fg",
					children: "✕"
				})
			]
		}), /* @__PURE__ */ g("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ h("p", {
					"data-testid": `${c}-claim`,
					className: f ? "m-0 text-[13.5px] font-medium leading-snug text-text-tertiary line-through" : "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.decision
				}),
				e.rationale && /* @__PURE__ */ h("p", {
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.rationale
				}),
				e.alternatives.length > 0 && /* @__PURE__ */ g("div", {
					className: "flex flex-col gap-0.5",
					children: [/* @__PURE__ */ h("span", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-text-tertiary",
						children: "Also considered"
					}), /* @__PURE__ */ h("ul", {
						className: "m-0 list-disc pl-4 text-[12px] leading-snug text-text-secondary",
						children: e.alternatives.map((e, t) => /* @__PURE__ */ h("li", { children: e }, `${e}-${t}`))
					})]
				}),
				(e.decidedBy || e.decidedAt) && /* @__PURE__ */ g("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.decidedBy && /* @__PURE__ */ h("span", { children: e.decidedBy }),
						e.decidedBy && e.decidedAt && /* @__PURE__ */ h("span", { children: "·" }),
						e.decidedAt && /* @__PURE__ */ h("span", { children: e.decidedAt })
					]
				}),
				e.status === "superseded" && e.supersededBy && /* @__PURE__ */ g("p", {
					"data-testid": `${c}-superseded-by`,
					className: "m-0 text-[12px] leading-snug text-text-secondary",
					children: ["Replaced by ", /* @__PURE__ */ h("span", {
						className: "font-medium",
						children: e.supersededBy
					})]
				}),
				t && o && e.status === "superseded" && !e.supersededBy && /* @__PURE__ */ g("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ h(a, {
						"aria-label": "What replaced this decision",
						placeholder: "Replaced by…",
						value: l,
						onChange: (e) => u(e.target.value),
						"data-testid": `${c}-superseded-input`
					}), /* @__PURE__ */ h(r, {
						size: "sm",
						variant: "secondary",
						disabled: l.trim() === "",
						onClick: () => {
							o(l.trim()), u("");
						},
						children: "Record"
					})]
				}),
				t && n && /* @__PURE__ */ h("div", {
					role: "group",
					"aria-label": "Decision status",
					className: "flex flex-wrap items-center gap-1 border-t border-border pt-2",
					children: q.map((t) => /* @__PURE__ */ h(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						disabled: t === e.status,
						onClick: () => n(t),
						"data-testid": `${c}-set-${t}`,
						children: Ct[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function Tt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function Et(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var Dt = class extends b {
	options;
	decision;
	constructor(e, t, n) {
		super(e, K), this.options = n, this.decision = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ h(wt, {
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
		if (!this.apply(bt(this.node.textContent, e))) return;
		let t = Tt(this.options.decidedBy);
		t && this.apply($(this.node.textContent, { by: t })), this.apply($(this.node.textContent, { at: Et(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(xt(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = Z(e.textContent);
		if (!t) return !1;
		let n = e.textContent !== this.node.textContent;
		return this.node = e, this.decision = t, n && this.schedule(), !0;
	}
	ignoreMutation() {
		return !0;
	}
	stopEvent() {
		return !0;
	}
};
function Ot(e = {}) {
	return {
		macroName: K,
		accepts: (e) => Z(e.textContent) !== null,
		create: (t) => {
			let n = Z(t.node.textContent);
			return n ? new Dt(t, n, e) : null;
		}
	};
}
var kt = _.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: w,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: S,
			attrs: { macroName: K },
			content: [{
				type: "text",
				text: St(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return T(this.editor, this.name, Ot(this.options));
	}
});
//#endregion
export { k as ACTION_ITEMS_MACRO_NAME, Be as ActionItemsBlock, Ue as ActionItemsMacro, se as CollaborativeExcalidraw, K as DECISION_MACRO_NAME, ht as DECISION_QUERYABILITY, q as DECISION_STATUSES, E as DIAGRAM_MACRO_NAME, wt as DecisionBlock, kt as DecisionMacro, ue as DiagramBlockRenderer, Ee as DiagramMacro, s as DiagramPresenceBar, Ke as HITL_ITEM_CATEGORY, R as HITL_MACRO_NAME, We as HITL_QUERYABILITY, Ge as HITL_SENTINEL_SECTION, lt as HitlBlock, pt as HitlMacro, ve as MACRO_NODE_NAME, C as MACRO_RENDERERS_NAME, De as MacroRenderers, b as ReactMacroView, D as STATUS_DONE, O as STATUS_PENDING, vt as acceptsDecision, Ie as actionItemsMacroText, He as actionItemsRenderer, Fe as addItemEdit, rt as answerHitlEdit, $ as attributeDecisionEdit, fe as createMacroRendererRegistry, St as decisionMacroText, Ot as decisionRenderer, Ce as diagramMacroPluginKey, xe as diagramMacroText, Te as diagramRenderer, et as hitlExpired, it as hitlMacroText, G as hitlPhase, ft as hitlRenderer, he as hostsMacroNodeViews, be as isDiagramId, _e as macroNodeViewPlugin, T as macroRendererPlugins, w as macroRendererStorage, me as macroRenderersFor, de as macroRenderersPluginKey, ye as newDiagramId, x as plainMacroView, F as readActionItems, Z as readDecision, Se as readDiagramId, U as readHitl, Pe as removeItemEdit, W as retractHitlEdit, bt as setDecisionStatusEdit, L as setItemKeyEdit, Ne as setItemTextEdit, xt as supersedeDecisionEdit, Me as toggleItemEdit, c as useResolvedTheme, I as yamlScalar };
