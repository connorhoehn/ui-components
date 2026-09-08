import { n as e, t } from "./useWebSocket-Cmv4zMFO.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Input-DLknWXri.js";
import { n as a, t as o } from "./useResolvedTheme-MncahQcS.js";
import { Suspense as s, createElement as c, lazy as l, useCallback as u, useEffect as d, useMemo as ee, useRef as f, useState as p } from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";
import { Extension as _ } from "@tiptap/core";
import { Plugin as v, PluginKey as y } from "@tiptap/pm/state";
import { createRoot as te } from "react-dom/client";
//#region src/components/diagram/CollaborativeExcalidraw.tsx
var b = l(() => import("./ExcalidrawCanvas-Cb7J6789.js"));
function x({ label: e }) {
	return /* @__PURE__ */ h("div", {
		"data-testid": "diagram-loading",
		className: "flex h-full min-h-40 w-full items-center justify-center rounded-md border border-border bg-surface-inset text-[13px] text-neutral",
		children: e
	});
}
function S(e) {
	return e.ydoc !== void 0;
}
function C(e) {
	return S(e) ? /* @__PURE__ */ h(ne, { ...e }) : /* @__PURE__ */ h(re, { ...e });
}
function ne({ ydoc: e, awareness: t, className: r, ...i }) {
	return /* @__PURE__ */ h("div", {
		className: n("h-full w-full", r),
		children: /* @__PURE__ */ h(s, {
			fallback: /* @__PURE__ */ h(x, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ h(b, {
				ydoc: e,
				awareness: t ?? null,
				...i
			})
		})
	});
}
function re({ gatewayUrl: r, diagramId: i, authToken: a, requireSync: o, loadingSlot: c, className: l, ...d }) {
	let p = f(/* @__PURE__ */ new Set()), m = u((e) => (p.current.add(e), () => {
		p.current.delete(e);
	}), []), g = u((e) => {
		p.current.forEach((t) => t(e));
	}, []), _ = ee(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: `doc:${i}`
	}), [
		r,
		a,
		i
	]), v = t({
		config: _,
		onMessage: g
	}), { ydoc: y, provider: te, synced: S } = e({
		documentId: i,
		ws: v,
		onMessage: m
	});
	return y && (o !== !0 || S) ? /* @__PURE__ */ h("div", {
		className: n("h-full w-full", l),
		children: /* @__PURE__ */ h(s, {
			fallback: /* @__PURE__ */ h(x, { label: "Loading diagram editor…" }),
			children: /* @__PURE__ */ h(b, {
				ydoc: y,
				awareness: te?.awareness ?? null,
				...d
			})
		})
	}) : /* @__PURE__ */ h("div", {
		className: n("h-full w-full", l),
		children: c ?? /* @__PURE__ */ h(x, { label: "Connecting…" })
	});
}
//#endregion
//#region src/components/diagram/DiagramBlockRenderer.tsx
function w({ diagramId: e, source: t = "", ydoc: i, awareness: a, editable: o = !0, user: s, assetPath: c, onRemove: l, "data-testid": u }) {
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
			children: /* @__PURE__ */ h(C, {
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
var T = class {
	dom;
	node;
	view;
	getPos;
	host;
	root;
	dead = !1;
	queued = !1;
	constructor(e, t) {
		this.node = e.node, this.view = e.view, this.getPos = e.getPos, this.dom = document.createElement("div"), this.dom.setAttribute("data-macro", t), this.host = document.createElement("div"), this.dom.appendChild(this.host), this.root = te(this.host);
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
function E(e) {
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
var D = "macro", O = "macroRenderers", k = new y(O);
function A(e = []) {
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
function j() {
	return { macroRenderer: !0 };
}
var ie = /* @__PURE__ */ new WeakMap();
function M(e) {
	let t = e.extensionManager ?? e, n = ie.get(t);
	return n || (n = A(), ie.set(t, n)), n;
}
function N(e, t) {
	let n = e.extensionManager?.extensions ?? [], r = e.extensionStorage ?? {}, i = n.map((e) => e.name).filter((e) => r[e]?.macroRenderer);
	return i.includes("macroRenderers") ? t === O : i.length === 0 || i[0] === t;
}
function ae(e, t) {
	let n = E(e), r = t?.accepts;
	if (!r) return n;
	let i = e;
	return n.update = (e) => e.type !== i.type || e.attrs.macroName !== i.attrs.macroName || r.call(t, e) ? !1 : (i = e, !0), n;
}
function P(e) {
	let t = /* @__PURE__ */ new Set();
	return new v({
		key: k,
		props: { nodeViews: { [D]: (n, r, i) => {
			let a = String(n.attrs.macroName ?? "unknown"), o = e.get(a);
			if (!o) return E(n);
			let s = o.accepts?.(n) ?? !0 ? o.create({
				node: n,
				view: r,
				getPos: i
			}) : null;
			if (!s) return ae(n, o);
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
function F(e, t, ...n) {
	let r = M(e);
	for (let e of n) r.register(e);
	return N(e, t) ? [P(r)] : [];
}
//#endregion
//#region src/components/diagram/macro.ts
var I = "diagram", L = "macro";
function R() {
	let e = globalThis.crypto;
	if (typeof e?.randomUUID == "function") return e.randomUUID();
	let t = "";
	for (let e = 0; e < 32; e += 1) (e === 8 || e === 12 || e === 16 || e === 20) && (t += "-"), t += Math.floor(Math.random() * 16).toString(16);
	return t;
}
function z(e) {
	return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(e);
}
function B(e) {
	return `id: ${e}`;
}
function V(e) {
	let t = /^id:[ \t]*(?:"([^"\n]*)"|'([^'\n]*)'|([^\s#]+))[ \t]*$/m.exec(e);
	if (!t) return null;
	let n = t[1] ?? t[2] ?? t[3] ?? "";
	return z(n) ? n : null;
}
//#endregion
//#region src/components/diagram/DiagramMacro.tsx
var oe = new y("diagramMacro"), se = class extends T {
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
		super(e, I), this.options = t, this.dom.setAttribute("data-diagram-active", "false"), this.dom.addEventListener("mousedown", () => {
			this.editable && this.setActive(!0);
		}), document.addEventListener("mousedown", this.onDocumentPointerDown, !0), document.addEventListener("keydown", this.onDocumentKeyDown, !0), this.schedule();
	}
	element() {
		let e = this.options.getContext(), t = this.node.textContent;
		return c(w, {
			diagramId: V(t),
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
function H(e) {
	return {
		macroName: I,
		create: (t) => new se(t, e)
	};
}
var ce = _.create({
	name: "diagramMacro",
	addOptions() {
		return { getContext: () => null };
	},
	addCommands() {
		return { insertDiagram: (e) => ({ state: t, commands: n }) => t.schema.nodes.macro ? n.insertContent([{
			type: L,
			attrs: { macroName: I },
			content: [{
				type: "text",
				text: B(e ?? R())
			}]
		}, { type: "paragraph" }]) : !1 };
	},
	addStorage: j,
	addProseMirrorPlugins() {
		return F(this.editor, this.name, H(this.options));
	}
}), le = _.create({
	name: O,
	addOptions() {
		return { renderers: [] };
	},
	addStorage: j,
	addProseMirrorPlugins() {
		return F(this.editor, this.name, ...this.options.renderers);
	}
}), U = "done", W = "pending", G = "action-items", ue = /^([A-Za-z][A-Za-z0-9_-]*):/, K = "  - ", q = "    ";
function de(e) {
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
function fe(e) {
	if (e.length >= 2 && e.startsWith("'") && e.endsWith("'")) return e.slice(1, -1).replace(/''/g, "'");
	if (e.length >= 2 && e.startsWith("\"") && e.endsWith("\"")) try {
		return JSON.parse(e);
	} catch {
		return null;
	}
	return e.startsWith("'") || e.startsWith("\"") || /(^|\s)#/.test(e) ? null : e;
}
function J(e, t, n) {
	let r = ue.exec(e.slice(n));
	if (!r) return null;
	let i = n + r[0].length;
	for (; i < e.length && (e[i] === " " || e[i] === "	");) i += 1;
	let a = e.length;
	for (; a > i && (e[a - 1] === " " || e[a - 1] === "	");) --a;
	let o = fe(e.slice(i, a));
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
	let t = de(e), n = 0;
	for (; n < t.length && t[n].text.trim() === "";) n += 1;
	let r = t[n];
	if (!r) return null;
	let i = J(r.text, r.start, 0);
	if (!i || i.key !== "items" || i.scalar.value !== "" && i.scalar.value !== "[]") return null;
	n += 1;
	let a = [], o = i.lineEnd;
	for (; n < t.length; n += 1) {
		let e = t[n];
		if (e.text.trim() !== "") {
			if (e.text.startsWith(K)) {
				let t = J(e.text, e.start, 4);
				if (!t) return null;
				a.push({
					entries: [t],
					lineStart: e.start,
					lineEnd: t.lineEnd
				});
			} else if (e.text.startsWith(q)) {
				let t = a[a.length - 1];
				if (!t) return null;
				let n = J(e.text, e.start, 4);
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
function X(e, t) {
	return e.entries.find((e) => e.key === t);
}
function Z(e) {
	let t = Y(e);
	return t ? t.items.map((e, t) => {
		let n = X(e, "status")?.scalar.value ?? "";
		return {
			index: t,
			text: X(e, "text")?.scalar.value ?? "",
			status: n,
			done: n === U,
			assignee: X(e, "assignee")?.scalar.value ?? null,
			due: X(e, "due")?.scalar.value ?? null
		};
	}) : null;
}
function Q(e) {
	return e.includes("\n") ? null : e !== "" && /^[A-Za-z][A-Za-z0-9 _.()/-]*$/.test(e) && !e.endsWith(" ") && !/^(true|false|null|yes|no|on|off|y|n)$/i.test(e) ? e : `'${e.replace(/'/g, "''")}'`;
}
function pe(e, t, n) {
	let r = e.entries.find((e) => e.key > t);
	if (r) {
		let e = r.lineStart + 4;
		return {
			from: e,
			to: e,
			insert: `${t}: ${n}\n${q}`
		};
	}
	let i = e.entries[e.entries.length - 1];
	return {
		from: i.lineEnd,
		to: i.lineEnd,
		insert: `\n${q}${t}: ${n}`
	};
}
function $(e, t, n, r) {
	let i = Y(e)?.items[t];
	if (!i) return null;
	let a = Q(r);
	if (a === null) return null;
	let o = X(i, n);
	return o ? o.scalar.value === r ? null : {
		from: o.scalar.from,
		to: o.scalar.to,
		insert: a
	} : pe(i, n, a);
}
function me(e, t) {
	let n = Z(e)?.[t];
	return n ? $(e, t, "status", n.done ? W : U) : null;
}
function he(e, t, n) {
	return $(e, t, "text", n);
}
function ge(e, t) {
	let n = Y(e), r = n?.items[t];
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
function _e(e, t) {
	let n = Y(e);
	if (!n) return null;
	let r = Q(t);
	if (r === null) return null;
	let i = `${K}status: ${W}\n${q}text: ${r}`;
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
function ve(e) {
	return e.length === 0 ? "items: []" : ["items:", ...e.map((e) => {
		let t = [];
		return e.assignee && t.push(["assignee", e.assignee]), e.due && t.push(["due", e.due]), t.push(["status", e.status ?? "pending"]), t.push(["text", e.text]), t.map(([e, t], n) => `${n === 0 ? K : q}${e}: ${Q(t) ?? "''"}`).join("\n");
	})].join("\n");
}
//#endregion
//#region src/components/doc-macros/ActionItemsBlock.tsx
function ye({ item: e, editable: t, onToggle: r, testId: i }) {
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
function be({ item: e, testId: t }) {
	let n = "rounded-sm border border-border bg-surface px-1.5 py-px text-[11px] text-text-secondary";
	return /* @__PURE__ */ g(m, { children: [
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
function xe({ item: e, editable: t, onTextChange: r, testId: a }) {
	let [o, s] = p(e.text), c = f(!1);
	if (d(() => {
		c.current || s(e.text);
	}, [e.text]), !t) return /* @__PURE__ */ h("span", {
		"data-testid": `${a}-text`,
		className: n("min-w-0 flex-1 text-[13px] leading-5", e.done ? "text-text-tertiary line-through" : "text-text-primary"),
		children: e.text || /* @__PURE__ */ h("span", {
			className: "text-text-tertiary",
			children: "Untitled action item"
		})
	});
	let l = () => {
		o !== e.text && r?.(o);
	};
	return /* @__PURE__ */ h(i, {
		size: "sm",
		"data-testid": `${a}-text`,
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
function Se({ items: e, editable: t = !1, onToggle: n, onTextChange: i, onRemoveItem: a, onAddItem: o, onRemove: s, "data-testid": c = "action-items" }) {
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
							/* @__PURE__ */ h(ye, {
								item: e,
								editable: t,
								onToggle: () => n?.(e.index),
								testId: `${o}-toggle`
							}),
							/* @__PURE__ */ h(xe, {
								item: e,
								editable: t,
								onTextChange: (t) => i?.(e.index, t),
								testId: o
							}),
							/* @__PURE__ */ g("div", {
								className: "flex shrink-0 items-center gap-1 pt-0.5",
								children: [/* @__PURE__ */ h(be, {
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
var Ce = class extends T {
	items;
	constructor(e, t) {
		super(e, G), this.items = t, this.schedule();
	}
	element() {
		return /* @__PURE__ */ h(Se, {
			items: this.items,
			editable: this.editable,
			onToggle: (e) => this.apply(me(this.node.textContent, e)),
			onTextChange: (e, t) => this.apply(he(this.node.textContent, e, t)),
			onRemoveItem: (e) => this.apply(ge(this.node.textContent, e)),
			onAddItem: () => this.apply(_e(this.node.textContent, "")),
			...this.editable ? { onRemove: () => this.removeBlock() } : {}
		});
	}
	apply(e) {
		e && this.replaceText(e.from, e.to, e.insert);
	}
	update(e) {
		if (e.type !== this.node.type || e.attrs.macroName !== "action-items") return !1;
		let t = Z(e.textContent);
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
function we() {
	return {
		macroName: G,
		accepts: (e) => Z(e.textContent) !== null,
		create: (e) => {
			let t = Z(e.node.textContent);
			return t ? new Ce(e, t) : null;
		}
	};
}
var Te = _.create({
	name: "actionItemsMacro",
	addStorage: j,
	addCommands() {
		return { insertActionItems: (e) => ({ state: t, commands: n }) => {
			if (!t.schema.nodes.macro) return !1;
			let r = ve((e ?? [""]).map((e) => ({ text: e })));
			return n.insertContent([{
				type: D,
				attrs: { macroName: G },
				content: [{
					type: "text",
					text: r
				}]
			}, { type: "paragraph" }]);
		} };
	},
	addProseMirrorPlugins() {
		return F(this.editor, this.name, we());
	}
});
//#endregion
export { G as ACTION_ITEMS_MACRO_NAME, Se as ActionItemsBlock, Te as ActionItemsMacro, C as CollaborativeExcalidraw, I as DIAGRAM_MACRO_NAME, w as DiagramBlockRenderer, ce as DiagramMacro, a as DiagramPresenceBar, L as MACRO_NODE_NAME, O as MACRO_RENDERERS_NAME, le as MacroRenderers, T as ReactMacroView, U as STATUS_DONE, W as STATUS_PENDING, ve as actionItemsMacroText, we as actionItemsRenderer, _e as addItemEdit, A as createMacroRendererRegistry, oe as diagramMacroPluginKey, B as diagramMacroText, H as diagramRenderer, N as hostsMacroNodeViews, z as isDiagramId, P as macroNodeViewPlugin, F as macroRendererPlugins, j as macroRendererStorage, M as macroRenderersFor, k as macroRenderersPluginKey, R as newDiagramId, E as plainMacroView, Z as readActionItems, V as readDiagramId, ge as removeItemEdit, $ as setItemKeyEdit, he as setItemTextEdit, me as toggleItemEdit, o as useResolvedTheme, Q as yamlScalar };
