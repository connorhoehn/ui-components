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
import { Plugin as te, PluginKey as ne } from "@tiptap/pm/state";
import { createRoot as re } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var ie = p(() => import("./ExcalidrawCanvas-Cb7J6789.js"));
function ae({ label: e }) {
	return /* @__PURE__ */ y("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function oe(e) {
	return e.ydoc !== void 0;
}
function se(e) {
	return oe(e) ? /* @__PURE__ */ y(ce, { ...e }) : /* @__PURE__ */ y(le, { ...e });
}
function ce({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ y("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ y(d, {
			fallback: /* @__PURE__ */ y(ae, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ y(ie, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function le({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: s, className: c, ...l }) {
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
			fallback: /* @__PURE__ */ y(ae, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ y(ie, {
				ydoc: v,
				awareness: b?.awareness ?? null,
				...l
			})
		})
	}) : /* @__PURE__ */ y("div", {
		className: n("h-full w-full", c),
		children: s ?? /* @__PURE__ */ y(ae, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function ue({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
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
			children: /* @__PURE__ */ y(se, {
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
function de(e) {
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
var C = "macro", w = "macroRenderers", fe = new ne(w);
function pe(e = []) {
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
var me = /* @__PURE__ */ new WeakMap();
function he(e) {
	let t = e.extensionManager ?? e, n = me.get(t);
	return n || (n = pe(), me.set(t, n)), n;
}
function ge(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === w : i.length === 0 || i[0] === t;
}
function _e(e, t) {
	let n = de(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function ve(e) {
	let t = /* @__PURE__ */ new Set();
	return new te({
		key: fe,
		props: { nodeViews: { [C]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return de(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return _e(n, o);
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
function E(e, t, ...n) {
	let r = he(e);
	for (let e of n) r.register(e);
	return ge(e, t) ? [ve(r)] : [];
}
//#endregion
//#region src/components/diagram/macro.ts
var D = "diagram", ye = "macro";
function be() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function xe(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function Se(e) {
	return `id: ${e}`;
}
function Ce(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return xe(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var we = new ne("diagramMacro"), Te = class extends S {
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
		return f(ue, {
			diagramId: Ce(t),
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
function Ee(e) {
	return {
		macroName: D,
		create: (t) => new Te(t, e)
	};
}
var De = x.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: ye,
			attrs: { macroName: D },
			content: [{
				type: "text",
				text: Se(e ?? be())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: T,
	addProseMirrorPlugins() {
		return E(this.editor, this.name, Ee(this.options));
	}
}), Oe = x.create({
	name: w,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: T,
	addProseMirrorPlugins() {
		return E(this.editor, this.name, ...this.options.renderers);
	}
}), ke = "done", Ae = "pending", O = "action-items", je = /^([A-Za-z][A-Za-z0-9_-]*):/, k = "  - ", A = "    ";
function Me(e) {
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
function Ne(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function j(e, t, n) {
	let r = je.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = Ne(e.slice(i, a));
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
function M(e) {
	let t = Me(e), n = 0;
	for (; n < t.length && t[n].text.trim() === "";) n += 1;
	let r = t[n];
	if (!r) return null;
	let i = j(r.text, r.start, 0);
	if (!i || i.key !== "items" || i.scalar.value !== "" && i.scalar.value !== "[]") return null;
	n += 1;
	let a = [], o = i.lineEnd;
	for (; n < t.length; n += 1) {
		let e = t[n];
		if (e.text.trim() !== "") {
			if (e.text.startsWith(k)) {
				let t = j(e.text, e.start, 4);
				if (!t) return null;
				a.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith(A)) {
				let t = a[a.length - 1];
				if (!t) return null;
				let n = j(e.text, e.start, 4);
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
function N(e, t) {
	return e.entries.find((e) => e.key === t);
}
function P(e) {
	let t = M(e);
	return t ? t.items.map((e, t) => {
		let n = N(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			text: N(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === ke,
			assignee: N(e, "assignee")?.scalar.value ?? null,
			due: N(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function F(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function Pe(e, t, n) {
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
function Fe(e, t, n, r) {
	let i = M(e)?.items[t];
	if (!i) return null;
	let a = F(r);
	if (a === null) return null;
	let o = N(i, n);
	return o ? o.scalar.value === r ? null : {
		from: o.scalar.from,
		to: o.scalar.to,
		insert: a
	} : Pe(i, n, a);
}
function Ie(e, t) {
	let n = P(e)?.[t];
	return n ? Fe(e, t, "status", n.done ? Ae : ke) : null;
}
function Le(e, t, n) {
	return Fe(e, t, "text", n);
}
function Re(e, t) {
	let n = M(e), r = n?.items[t];
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
function ze(e, t) {
	let n = M(e);
	if (!n) return null;
	let r = F(t);
	if (r === null) return null;
	let i = `${k}status: ${Ae}\n${A}text: ${r}`;
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
function Be(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? k : A}${e}: ${F(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/useDraft.ts
function I(e) {
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
function Ve({ item: e, editable: t, onToggle: r, testId: i }) {
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
function He({ item: e, testId: t }) {
	let n = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ b(v, { children: [
		e.assignee ? /* @__PURE__ */ b("span", {
			"data-testid": `${t}-assignee`,
			className: n,
			children: ["@", e.assignee]
		}) : null,
		e.due ? /* @__PURE__ */ b("span", {
			"data-testid": `${t}-due`,
			className: n,
			children: ["due ", e.due]
		}) : null,
		e.status !== "" && e.status !== "pending" && e.status !== "done" ? /* @__PURE__ */ y("span", {
			"data-testid": `${t}-status`,
			className: n,
			children: e.status
		}) : null
	] });
}
function Ue({ item: e, editable: t, onTextChange: r, testId: i }) {
	let [o, s, c] = I(e.text), l = g(!1);
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
function We({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, "data-testid": c = "action-items" }) {
	let l = e.filter((e) => e.done).length;
	return /* @__PURE__ */ b("div", {
		"data-testid": c,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center justify-between gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [/* @__PURE__ */ y("span", {
				className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
				children: "Action items"
			}), /* @__PURE__ */ b("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ b("span", {
					"data-testid": `${c}-progress`,
					className: "text-[11px] tabular-nums text-text-tertiary",
					children: [
						l,
						" of ",
						e.length,
						" done"
					]
				}), t && s ? /* @__PURE__ */ y(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${c}-remove`,
					onClick: s,
					children: "Remove"
				}) : null]
			})]
		}), /* @__PURE__ */ b("div", {
			className: "rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [e.length === 0 ? /* @__PURE__ */ y("p", {
				"data-testid": `${c}-empty`,
				className: "px-0.5 py-1 text-[13px] text-text-tertiary",
				children: "No action items yet."
			}) : /* @__PURE__ */ y("ul", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: e.map((e) => {
					let o = `${c}-item-${e.index}`;
					return /* @__PURE__ */ b("li", {
						"data-testid": o,
						"data-done": String(e.done),
						className: "flex items-start gap-2",
						children: [
							/* @__PURE__ */ y(Ve, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ y(Ue, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ b("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [/* @__PURE__ */ y(He, {
									item: e,
									testId: o
								}), t ? /* @__PURE__ */ y(r, {
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
			}), t ? /* @__PURE__ */ y("div", {
				className: "pt-1.5",
				children: /* @__PURE__ */ y(r, {
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
var Ge = class extends S {
	items;
	constructor(e, t) {
		super(e, O), this.items = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ y(We, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(Ie(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(Le(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(Re(this.node.textContent, e)),
			onAddItem: () => this.apply(ze(this.node.textContent, "")),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = P(e.textContent);
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
function Ke() {
	return {
		macroName: O,
		accepts: (e) => P(e.textContent) !== null,
		create: (e) => {
			let t = P(e.node.textContent);
			return t ? new Ge(e, t) : null;
		}
	};
}
var qe = x.create({
	name: "actionItemsMacro",
	addStorage: T,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = Be((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: C,
				attrs: { macroName: O },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, Ke());
	}
}), L = "hitl", Je = "The body is the record; a section-item row keyed on `id` under the `_macro` sentinel section is the queryable mirror. The row can carry the question, the addressee and the answer; it cannot carry the options or the expiry.", Ye = "_macro", Xe = "hitl", Ze = /^([A-Za-z][A-Za-z0-9_-]*):/, R = "  - ", Qe = "    ", $e = /* @__PURE__ */ new Set(["then", "value"]), et = [
	"answer",
	"answeredAt",
	"answeredBy"
], tt = "answeredBy";
function nt(e) {
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
function rt(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function it(e, t, n) {
	let r = Ze.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = rt(e.slice(i, a));
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
function at(e) {
	let t = nt(e), n = [], r = [], i = /* @__PURE__ */ new Set(), a = !1, o = 0;
	for (let e of t) {
		if (e.text.trim() === "") continue;
		if (e.text.startsWith(R)) {
			if (!a) return null;
			let t = e.text.slice(4), n = it(e.text, e.start, 4);
			if (n) {
				if (!$e.has(n.key)) return null;
				r.push({
					entries: [n],
					scalar: null,
					lineStart: e.start,
					lineEnd: n.lineEnd
				});
			} else {
				let n = rt(t.trim());
				if (n === null || n === "") return null;
				r.push({
					entries: [],
					scalar: n,
					lineStart: e.start,
					lineEnd: e.start + e.text.length
				});
			}
		} else if (e.text.startsWith(Qe)) {
			if (!a) return null;
			let t = r[r.length - 1];
			if (!t || t.scalar !== null) return null;
			let n = it(e.text, e.start, 4);
			if (!n || !$e.has(n.key) || t.entries.some((e) => e.key === n.key)) return null;
			t.entries.push(n), t.lineEnd = n.lineEnd;
		} else if (e.text.startsWith(" ") || e.text.startsWith("	")) return null;
		else {
			let t = it(e.text, e.start, 0);
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
	let t = at(e);
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
function ot(e, t = Date.now()) {
	if (!e.expiresAt) return !1;
	let n = Date.parse(e.expiresAt);
	return Number.isFinite(n) && n <= t;
}
function st(e) {
	let t = [];
	if (e.entries.forEach((e, n) => {
		et.includes(e.key) && t.push(n);
	}), t.length === 0) return null;
	for (let e = 1; e < t.length; e += 1) if (t[e] !== t[e - 1] + 1) return null;
	let n = e.entries[t[0]], r = e.entries[t[t.length - 1]];
	return {
		from: n.lineStart,
		to: r.lineEnd
	};
}
function ct(e, t) {
	let n = e.entries.find((e) => e.key > tt);
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
function lt(e, t) {
	let n = at(e);
	if (!n || !z(n, "question")) return null;
	let r = F(t.answer);
	if (r === null || t.answer === "") return null;
	let i = [`answer: ${r}`];
	if (t.at) {
		let e = F(t.at);
		if (e === null) return null;
		i.push(`answeredAt: ${e}`);
	}
	if (t.by) {
		let e = F(t.by);
		if (e === null) return null;
		i.push(`answeredBy: ${e}`);
	}
	let a = i.join("\n"), o = st(n);
	return o ? e.slice(o.from, o.to) === a ? null : {
		from: o.from,
		to: o.to,
		insert: a
	} : n.entries.some((e) => et.includes(e.key)) ? null : ct(n, a);
}
function ut(e) {
	let t = at(e);
	if (!t) return null;
	let n = st(t);
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
function dt(e) {
	let t = [], n = (e) => F(e) ?? "''", r = [
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
		for (let e of i) typeof e == "string" ? t.push(`${R}${n(e)}`) : e.then ? (t.push(`${R}then: ${n(e.then)}`), t.push(`${Qe}value: ${n(e.value)}`)) : t.push(`${R}${n(e.value)}`);
	}
	return t.push(`question: ${n(e.question)}`), t.join("\n");
}
//#endregion
//#region src/components/doc-macros/HitlBlock.tsx
function ft(e, t) {
	return e.answer === null ? ot(e, t) ? "expired" : "waiting" : "answered";
}
var pt = {
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
}, mt = "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary select-none";
function ht({ option: e, disabled: t, onPick: n, testId: i }) {
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
function gt({ onAnswer: e, busy: t, testId: n }) {
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
function _t({ callout: e, editable: t = !1, now: n, onAnswer: a, busy: o = !1, failure: s = null, onRetract: c, onRemove: l, "data-testid": u = "hitl" }) {
	let d = ft(e, n), f = pt[d], p = d === "waiting" && t && !!a;
	return /* @__PURE__ */ b("div", {
		"data-testid": u,
		"data-phase": d,
		className: "my-3",
		children: [/* @__PURE__ */ b("div", {
			className: "flex items-center gap-2 rounded-t-md border border-b-0 border-border bg-surface-inset px-2.5 py-1",
			children: [
				/* @__PURE__ */ y("span", {
					className: "text-[11px] font-semibold uppercase tracking-wide text-text-secondary",
					children: "Agent asks"
				}),
				/* @__PURE__ */ y(i, {
					tone: f.tone,
					size: "xs",
					uppercase: !0,
					dot: d === "waiting" ? "pulse" : "static",
					"data-testid": `${u}-phase`,
					children: f.label
				}),
				/* @__PURE__ */ y("span", { className: "flex-1" }),
				t && l ? /* @__PURE__ */ y(r, {
					variant: "ghost",
					size: "sm",
					"data-testid": `${u}-remove`,
					onClick: l,
					children: "Remove"
				}) : null
			]
		}), /* @__PURE__ */ b("div", {
			className: "flex flex-col gap-2 rounded-b-md border border-border bg-surface px-2.5 py-2",
			children: [
				/* @__PURE__ */ y("p", {
					"data-testid": `${u}-question`,
					className: "m-0 text-[13.5px] font-medium leading-snug text-text-primary",
					children: e.question
				}),
				e.context ? /* @__PURE__ */ y("p", {
					"data-testid": `${u}-context`,
					className: "m-0 border-l-2 border-border pl-2.5 text-[12px] leading-snug text-text-secondary",
					children: e.context
				}) : null,
				/* @__PURE__ */ b("div", {
					className: "flex flex-wrap items-center gap-1.5 text-[11px] text-text-tertiary",
					children: [
						e.askedBy ? /* @__PURE__ */ b("span", {
							"data-testid": `${u}-asked-by`,
							children: [e.askedBy, " asked"]
						}) : null,
						e.assignee ? /* @__PURE__ */ b(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-assignee`,
							children: ["for ", e.assignee]
						}) : /* @__PURE__ */ y(i, {
							tone: "neutral",
							size: "xs",
							"data-testid": `${u}-unassigned`,
							children: "unassigned"
						}),
						e.blocks ? /* @__PURE__ */ b(i, {
							tone: "warning",
							size: "xs",
							"data-testid": `${u}-blocks`,
							children: ["blocks ", e.blocks]
						}) : null,
						e.expiresAt && d === "waiting" ? /* @__PURE__ */ b("span", {
							"data-testid": `${u}-expires`,
							children: ["until ", e.expiresAt]
						}) : null
					]
				}),
				d === "answered" ? /* @__PURE__ */ b("div", {
					className: "flex flex-col gap-1",
					children: [
						/* @__PURE__ */ b("span", {
							className: mt,
							children: [
								"Answer",
								e.answeredBy ? ` — ${e.answeredBy}` : "",
								e.answeredAt ? ` · ${e.answeredAt}` : ""
							]
						}),
						/* @__PURE__ */ y("p", {
							"data-testid": `${u}-answer`,
							className: "m-0 text-[12.5px] leading-snug text-text-primary",
							children: e.answer
						}),
						t && c ? /* @__PURE__ */ y("div", {
							className: "flex justify-end",
							children: /* @__PURE__ */ y(r, {
								variant: "ghost",
								size: "sm",
								"data-testid": `${u}-retract`,
								onClick: c,
								children: "Retract answer"
							})
						}) : null
					]
				}) : null,
				d === "expired" ? /* @__PURE__ */ y("p", {
					"data-testid": `${u}-expired-note`,
					className: "m-0 text-[11.5px] text-text-tertiary",
					children: "Expired unanswered — the agent stopped waiting. Answering here would not reach it."
				}) : null,
				s ? /* @__PURE__ */ y("p", {
					"data-testid": `${u}-failure`,
					role: "alert",
					className: "m-0 rounded-sm border border-danger-border bg-danger-bg px-2 py-1 text-[11.5px] leading-snug text-danger-fg",
					children: s
				}) : null,
				p && e.options.length > 0 ? /* @__PURE__ */ y("div", {
					"data-testid": `${u}-options`,
					className: "flex flex-wrap items-start gap-2 pt-0.5",
					children: e.options.map((e, t) => /* @__PURE__ */ y(ht, {
						option: e,
						disabled: o,
						onPick: () => a?.(e.value),
						testId: `${u}-option-${t}`
					}, `${e.value}:${t}`))
				}) : null,
				p && e.options.length === 0 ? /* @__PURE__ */ y(gt, {
					onAnswer: (e) => a?.(e),
					busy: o,
					testId: u
				}) : null,
				d === "waiting" && !p ? /* @__PURE__ */ y("p", {
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
function vt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
var yt = class extends S {
	options;
	callout;
	busy = !1;
	failure = null;
	constructor(e, t, n) {
		super(e, L), this.options = n, this.callout = t, this.schedule();
	}
	element() {
		let e = this.callout.answer !== null && this.editable && ut(this.node.textContent) !== null;
		return /* @__PURE__ */ y(_t, {
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
		if (ft(this.callout, this.options.now?.()) !== "waiting" || this.busy) return;
		let t = this.callout, n = new Date(this.options.now?.() ?? Date.now()).toISOString(), r = vt(this.options.answeredBy), i = lt(this.node.textContent, {
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
		this.apply(ut(this.node.textContent));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "hitl") return !1;
		let t = B(e.textContent);
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
function bt(e = {}) {
	return {
		macroName: L,
		accepts: (e) => B(e.textContent) !== null,
		create: (t) => {
			let n = B(t.node.textContent);
			return n ? new yt(t, n, e) : null;
		}
	};
}
var xt = x.create({
	name: "hitlMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return { insertHitl: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.question ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: L },
			content: [{
				type: "text",
				text: dt(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, bt(this.options));
	}
}), V = "decision", H = [
	"proposed",
	"accepted",
	"rejected",
	"superseded"
], St = new Set(H), Ct = "The body is the record and there is no mirror: nothing polls a decision, so unlike a HITL callout it has no second store to keep honest.", wt = /^([A-Za-z][A-Za-z0-9_-]*):/, U = "  - ";
function Tt(e) {
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
			let e = Tt(a.slice(4));
			if (e === null) return null;
			n.push(e);
			continue;
		}
		let s = wt.exec(a);
		if (!s) return null;
		i = s[1] === "alternatives";
		let c = a.slice(s[0].length), l = Tt(c);
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
	return r !== "" && !St.has(r) ? null : {
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
function Et(e) {
	return K(e) !== null;
}
function Dt(e, t, n) {
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
	let r = F(n);
	if (r === null) return null;
	let i = e.entries.find((e) => e.key === t);
	return i ? e.entries.filter((e) => e.key === t).length > 1 || i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : Dt(e, t, r);
}
function Ot(e, t) {
	let n = W(e);
	return !n || !G(n, "decision") || !St.has(t) ? null : q(n, "status", t);
}
function kt(e, t) {
	let n = W(e);
	return n ? t.by ? q(n, "decidedBy", t.by) : t.at ? q(n, "decidedAt", t.at) : null : null;
}
function At(e, t) {
	let n = W(e);
	return !n || !G(n, "decision") ? null : q(n, "supersededBy", t);
}
function jt(e) {
	let t = [], n = (e, n) => {
		if (!n) return;
		let r = F(n);
		r !== null && t.push(`${e}: ${r}`);
	};
	n("decidedAt", e.decidedAt), n("decidedBy", e.decidedBy), n("decision", e.decision), n("id", e.id), n("rationale", e.rationale), n("status", e.status ?? "proposed");
	let r = (e.alternatives ?? []).filter((e) => e.trim() !== "");
	if (r.length > 0) {
		t.push("alternatives:");
		for (let e of r) {
			let n = F(e);
			n !== null && t.push(`${U}${n}`.replace(U, U));
		}
	}
	return t.join("\n");
}
//#endregion
//#region src/components/doc-macros/DecisionBlock.tsx
var Mt = {
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
function Nt({ decision: e, editable: t = !1, onStatusChange: n, onSupersededBy: o, onRemove: s, testId: c = "decision-block" }) {
	let [l, u] = _(""), d = Mt[e.status], f = e.status === "rejected";
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
					children: H.map((t) => /* @__PURE__ */ y(r, {
						size: "sm",
						variant: t === e.status ? "primary" : "secondary",
						"aria-pressed": t === e.status,
						disabled: t === e.status,
						onClick: () => n(t),
						"data-testid": `${c}-set-${t}`,
						children: Mt[t].label
					}, t))
				})
			]
		})]
	});
}
//#endregion
//#region src/components/doc-macros/DecisionMacro.tsx
function Pt(e) {
	return typeof e == "function" ? e() ?? "" : e ?? "";
}
function Ft(e) {
	let t = new Date(e), n = (e) => String(e).padStart(2, "0");
	return `${t.getFullYear()}-${n(t.getMonth() + 1)}-${n(t.getDate())}`;
}
var It = class extends S {
	options;
	decision;
	constructor(e, t, n) {
		super(e, V), this.options = n, this.decision = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ y(Nt, {
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
		if (!this.apply(Ot(this.node.textContent, e))) return;
		let t = Pt(this.options.decidedBy);
		t && this.apply(kt(this.node.textContent, { by: t })), this.apply(kt(this.node.textContent, { at: Ft(this.options.now?.() ?? Date.now()) }));
	}
	setSupersededBy(e) {
		this.apply(At(this.node.textContent, e));
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "decision") return !1;
		let t = K(e.textContent);
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
function Lt(e = {}) {
	return {
		macroName: V,
		accepts: (e) => K(e.textContent) !== null,
		create: (t) => {
			let n = K(t.node.textContent);
			return n ? new It(t, n, e) : null;
		}
	};
}
var Rt = x.create({
	name: "decisionMacro",
	addOptions() {
		return {};
	},
	addStorage: T,
	addCommands() {
		return { insertDecision: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.decision ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: V },
			content: [{
				type: "text",
				text: jt(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, Lt(this.options));
	}
}), J = "field", zt = [
	"text",
	"date",
	"number",
	"boolean"
], Bt = new Set(zt), Vt = "The body is the record and there is no mirror. A field index, if one is ever wanted, is a scan over document bodies — not a write-through that can go stale and misreport a real number.", Ht = /^([A-Za-z][A-Za-z0-9_-]*):/;
function Ut(e) {
	let t = e.trim();
	return t === "" ? "" : t.startsWith("|") || t.startsWith(">") ? null : t.startsWith("'") ? t.length < 2 || !t.endsWith("'") ? null : t.slice(1, -1).replace(/''/g, "'") : t.startsWith("\"") ? t.length < 2 || !t.endsWith("\"") ? null : t.slice(1, -1).replace(/\\"/g, "\"") : t;
}
function Y(e) {
	let t = [], n = 0;
	for (let r of e.split("\n")) {
		let e = n, i = n + r.length;
		if (n = i + 1, r.trim() === "") continue;
		let a = Ht.exec(r);
		if (!a) return null;
		let o = r.slice(a[0].length), s = Ut(o);
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
function Z(e) {
	for (let t of [
		"label",
		"type",
		"value"
	]) if (e.entries.filter((e) => e.key === t).length > 1) return !0;
	return !1;
}
var Wt = /^\d{4}-\d{2}-\d{2}$/;
function Q(e, t) {
	switch (e) {
		case "text": return !0;
		case "boolean": return t === "true" || t === "false";
		case "number": return t.trim() !== "" && Number.isFinite(Number(t));
		case "date": {
			if (!Wt.test(t)) return !1;
			let e = /* @__PURE__ */ new Date(`${t}T00:00:00Z`);
			return !Number.isNaN(e.getTime()) && e.toISOString().slice(0, 10) === t;
		}
	}
}
function $(e) {
	let t = Y(e);
	if (!t || Z(t)) return null;
	let n = X(t, "label")?.value ?? "";
	if (!n) return null;
	let r = X(t, "type")?.value ?? "";
	if (r !== "" && !Bt.has(r)) return null;
	let i = r || "text", a = X(t, "value")?.value;
	return {
		label: n,
		type: i,
		value: a,
		valid: a === void 0 || Q(i, a)
	};
}
function Gt(e) {
	return $(e) !== null;
}
function Kt(e) {
	if (e.value === void 0 || e.type !== "number" || e.value.trim() === "") return;
	let t = Number(e.value);
	return Number.isFinite(t) ? t : void 0;
}
function qt(e) {
	if (e.value !== void 0 && e.type === "boolean") {
		if (e.value === "true") return !0;
		if (e.value === "false") return !1;
	}
}
function Jt(e) {
	return e.value === void 0 || e.type !== "date" ? "" : Q("date", e.value) ? e.value : "";
}
function Yt(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	return Number.isNaN(t.getTime()) ? e : t.toLocaleDateString(void 0, {
		year: "numeric",
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	});
}
function Xt(e) {
	return e.toLocaleString(void 0, { maximumFractionDigits: 20 });
}
function Zt(e) {
	if (e.value === void 0) return "";
	if (!e.valid) return e.value;
	switch (e.type) {
		case "date": return Yt(e.value);
		case "number": {
			let t = Kt(e);
			return t === void 0 ? e.value : Xt(t);
		}
		case "boolean": return e.value === "true" ? "Yes" : "No";
		case "text": return e.value;
	}
}
function Qt(e, t) {
	return Q(e, t) ? e === "boolean" ? t : e === "number" ? t.trim() : F(t) : F(t);
}
function $t(e, t, n) {
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
function en(e, t, n, r) {
	if (r === null) return null;
	let i = X(e, t);
	return i ? i.value === n ? null : {
		from: i.valueFrom,
		to: i.valueTo,
		insert: r
	} : $t(e, t, r);
}
function tn(e, t) {
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
function nn(e, t) {
	let n = Y(e);
	if (!n || Z(n) || !X(n, "label")?.value) return null;
	let r = X(n, "value");
	if (t === void 0) return r ? tn(n, r) : null;
	let i = X(n, "type")?.value ?? "";
	return i !== "" && !Bt.has(i) ? null : en(n, "value", t, Qt(i || "text", t));
}
function rn(e, t) {
	let n = Y(e);
	return !n || Z(n) || !X(n, "label")?.value || t.trim() === "" ? null : en(n, "label", t, F(t));
}
function an(e, t) {
	let n = Y(e);
	return !n || Z(n) || !X(n, "label")?.value || !Bt.has(t) ? null : en(n, "type", t, t);
}
function on(e) {
	let t = e.type ?? "text", n = [`label: ${F(e.label) ?? F(e.label.split("\n")[0] ?? "") ?? "''"}`, `type: ${t}`];
	if (e.value !== void 0) {
		let r = Qt(t, e.value);
		r !== null && n.push(`value: ${r}`);
	}
	return n.join("\n");
}
//#endregion
//#region src/components/doc-macros/FieldBlock.tsx
var sn = {
	text: "Text",
	date: "Date",
	number: "Number",
	boolean: "Yes / no"
}, cn = {
	text: "not text",
	date: "not a date",
	number: "not a number",
	boolean: "not yes / no"
};
function ln({ field: e, editable: t = !1, onValueChange: n, onLabelChange: r, onTypeChange: o, onRemove: l, testId: u = "field-block" }) {
	let [d, f, p] = I(null), [m, h, ee] = I(null), g = e.value === void 0 ? "empty" : e.valid ? "set" : "invalid";
	if (!t) {
		let t = Zt(e);
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
					children: cn[e.type]
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
			let t = qt(e);
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
			let t = Jt(e);
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
					children: Yt(t)
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
				children: cn[e.type]
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
				options: zt.map((e) => ({
					value: e,
					label: sn[e]
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
var un = class extends S {
	field;
	constructor(e, t) {
		super(e, J), this.field = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ y(ln, {
			field: this.field,
			editable: this.editable,
			...this.editable ? {
				onValueChange: (e) => this.apply(nn(this.node.textContent, e)),
				onLabelChange: (e) => this.apply(rn(this.node.textContent, e)),
				onTypeChange: (e) => this.apply(an(this.node.textContent, e)),
				onRemove: () => this.removeBlock()
			} : {}
		});
	}
	apply(e) {
		return e ? this.replaceText(e.from, e.to, e.insert) : !1;
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "field") return !1;
		let t = $(e.textContent);
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
function dn() {
	return {
		macroName: J,
		accepts: (e) => $(e.textContent) !== null,
		create: (e) => {
			let t = $(e.node.textContent);
			return t ? new un(e, t) : null;
		}
	};
}
var fn = x.create({
	name: "fieldMacro",
	addStorage: T,
	addCommands() {
		return { insertField: (e) => ({ state: t, commands: n }) => !t.schema.nodes.macro || !e.label || e.label.trim() === "" ? !1 : n.insertContent([{
			type: C,
			attrs: { macroName: J },
			content: [{
				type: "text",
				text: on(e)
			}]
		}, { type: "paragraph" }]) };
	},
	addProseMirrorPlugins() {
		return E(this.editor, this.name, dn());
	}
});
//#endregion
export { O as ACTION_ITEMS_MACRO_NAME, We as ActionItemsBlock, qe as ActionItemsMacro, se as CollaborativeExcalidraw, V as DECISION_MACRO_NAME, Ct as DECISION_QUERYABILITY, H as DECISION_STATUSES, D as DIAGRAM_MACRO_NAME, Nt as DecisionBlock, Rt as DecisionMacro, ue as DiagramBlockRenderer, De as DiagramMacro, l as DiagramPresenceBar, J as FIELD_MACRO_NAME, Vt as FIELD_QUERYABILITY, zt as FIELD_TYPES, ln as FieldBlock, fn as FieldMacro, Xe as HITL_ITEM_CATEGORY, L as HITL_MACRO_NAME, Je as HITL_QUERYABILITY, Ye as HITL_SENTINEL_SECTION, _t as HitlBlock, xt as HitlMacro, ye as MACRO_NODE_NAME, w as MACRO_RENDERERS_NAME, Oe as MacroRenderers, S as ReactMacroView, ke as STATUS_DONE, Ae as STATUS_PENDING, Et as acceptsDecision, Gt as acceptsField, Be as actionItemsMacroText, Ke as actionItemsRenderer, ze as addItemEdit, lt as answerHitlEdit, kt as attributeDecisionEdit, pe as createMacroRendererRegistry, jt as decisionMacroText, Lt as decisionRenderer, we as diagramMacroPluginKey, Se as diagramMacroText, Ee as diagramRenderer, qt as fieldBoolean, Jt as fieldDate, on as fieldMacroText, Kt as fieldNumber, dn as fieldRenderer, Qt as fieldScalar, Q as fitsFieldType, Yt as formatFieldDate, Xt as formatFieldNumber, Zt as formatFieldValue, ot as hitlExpired, dt as hitlMacroText, ft as hitlPhase, bt as hitlRenderer, ge as hostsMacroNodeViews, xe as isDiagramId, ve as macroNodeViewPlugin, E as macroRendererPlugins, T as macroRendererStorage, he as macroRenderersFor, fe as macroRenderersPluginKey, be as newDiagramId, de as plainMacroView, P as readActionItems, K as readDecision, Ce as readDiagramId, B as readHitl, $ as readTypedField, Re as removeItemEdit, ut as retractHitlEdit, Ot as setDecisionStatusEdit, rn as setFieldLabelEdit, an as setFieldTypeEdit, nn as setFieldValueEdit, Fe as setItemKeyEdit, Le as setItemTextEdit, At as supersedeDecisionEdit, Ie as toggleItemEdit, u as useResolvedTheme, F as yamlScalar };
