import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { r as n } from "./safeHref-D1tj5kGa.js";
import { t as r } from "./IconButton-BgM9MvwA.js";
import { B as i, Ct as a, F as o, H as s, J as c, L as l, N as u, Y as d, _ as f, l as p, lt as m, m as h, p as g } from "./Icons-CqVFbuiZ.js";
import { t as _ } from "./Banner-DPR4sIxI.js";
import { t as v } from "./Input-DiOEvL5h.js";
import { t as ee } from "./Select-CG_PYETL.js";
import { t as y } from "./InlinePopover-BQTS5egk.js";
import { t as b } from "./EmptyState-BTnHHhgg.js";
import { n as te } from "./RovingToolbar-C8vF753M.js";
import { t as ne } from "./useMeasuredWidth-DgmyHS_L.js";
import { a as re, c as ie, d as ae, i as oe, n as se, o as ce, t as le, u as ue } from "./TiptapEditor-Blmu8WT6.js";
import { createContext as de, useCallback as x, useContext as S, useEffect as C, useId as fe, useLayoutEffect as pe, useMemo as me, useRef as w, useState as T } from "react";
import { Fragment as E, jsx as D, jsxs as O } from "react/jsx-runtime";
import { createPortal as he } from "react-dom";
import { NodeViewWrapper as ge, ReactNodeViewRenderer as k, useEditorState as _e } from "@tiptap/react";
import { Extension as A } from "@tiptap/core";
import { Plugin as ve, PluginKey as ye } from "@tiptap/pm/state";
import { Decoration as j, DecorationSet as M } from "@tiptap/pm/view";
//#region src/components/doc-editor/DocumentRuler.tsx
var N = 96, P = 8;
function be(e, t, n = 1) {
	let r = [], i = 12 * n >= P;
	for (let a = 0; a <= e + .5; a += 12) {
		let e = (a - t) / 96, o = Math.round(e * 8) / 8, s = Number.isInteger(o), c = !s && Math.abs(o * 2 - Math.round(o * 2)) < 1e-9;
		!s && !c && !i || r.push({
			x: a * n,
			kind: s ? "inch" : c ? "half" : "minor",
			label: s && o !== 0 ? String(Math.abs(o)) : void 0
		});
	}
	return r;
}
function xe({ pageWidth: t = 816, marginLeft: n = 96, marginRight: r = 96, zoom: i = 1, className: a, style: o, "data-testid": s = "document-ruler" }) {
	let c = t * i, l = n * i, u = r * i, d = be(t, n, i);
	return /* @__PURE__ */ D("div", {
		"data-testid": s,
		"aria-hidden": "true",
		className: e("flex select-none", a),
		style: o,
		children: /* @__PURE__ */ O("div", {
			className: "relative h-6 shrink-0 mx-auto",
			style: { width: c },
			"data-testid": `${s}-track`,
			children: [
				/* @__PURE__ */ D("div", { className: "absolute inset-0 rounded-sm bg-workspace" }),
				/* @__PURE__ */ D("div", {
					"data-testid": `${s}-text-area`,
					className: "absolute inset-y-0 bg-paper",
					style: {
						left: l,
						right: u
					}
				}),
				d.map((t, n) => /* @__PURE__ */ D("div", {
					className: e("absolute w-px bg-text-tertiary", t.kind === "inch" ? "opacity-0" : t.kind === "half" ? "opacity-60" : "opacity-30"),
					style: {
						left: t.x,
						top: t.kind === "half" ? 8 : 10,
						height: t.kind === "half" ? 8 : 4
					}
				}, n)),
				d.filter((e) => e.label).map((e) => /* @__PURE__ */ D("span", {
					"data-testid": `${s}-label`,
					className: "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] leading-none text-text-secondary",
					style: { left: e.x },
					children: e.label
				}, `l${e.x}`)),
				[l, c - u].map((e, t) => /* @__PURE__ */ D("div", {
					"data-testid": `${s}-margin-marker`,
					className: "absolute inset-y-1 w-px bg-primary opacity-70",
					style: { left: e }
				}, `m${t}`))
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentOutline.tsx
function F(e, t) {
	return Math.min(e - t, 3) * 12;
}
function Se({ entries: n, presentation: i = "outline", onContents: a, compact: o = !1, activeId: s, onSelect: c, emptyLabel: l = "Headings you add will appear here", className: u, wrap: d = !1, "data-testid": f = "document-outline", "aria-label": p = "Document outline" }) {
	let m = n.length > 0 ? Math.min(...n.map((e) => e.level)) : 1;
	if (i === "controls") {
		let i = n.findIndex((e) => e.id === s), l = n[i - 1], d = n[i + 1];
		return /* @__PURE__ */ O("nav", {
			"aria-label": p,
			"data-testid": f,
			className: e("flex min-w-0 items-center justify-center gap-1", u),
			children: [
				/* @__PURE__ */ D(r, {
					size: "sm",
					variant: "ghost",
					"aria-label": "Previous section",
					title: l ? l.text : "At the first section",
					disabled: !l,
					onClick: () => l && c?.(l.id),
					icon: /* @__PURE__ */ D(h, {
						dir: "up",
						size: 16
					}),
					"data-testid": `${f}-previous`
				}),
				/* @__PURE__ */ D(t, {
					size: "sm",
					variant: "ghost",
					onClick: a,
					"aria-label": "Back to contents",
					"data-testid": `${f}-contents`,
					children: o ? "Contents" : "Back to contents"
				}),
				/* @__PURE__ */ D("span", {
					className: "shrink-0 text-xs tabular-nums text-text-secondary",
					"aria-live": "polite",
					"aria-label": i < 0 ? "Contents" : `Section ${i + 1} of ${n.length}`,
					children: i < 0 ? `— / ${n.length}` : `${i + 1} / ${n.length}`
				}),
				/* @__PURE__ */ D(r, {
					size: "sm",
					variant: "ghost",
					"aria-label": "Next section",
					title: d ? d.text : "At the last section",
					disabled: !d,
					onClick: () => d && c?.(d.id),
					icon: /* @__PURE__ */ D(h, {
						dir: "down",
						size: 16
					}),
					"data-testid": `${f}-next`
				})
			]
		});
	}
	return /* @__PURE__ */ D("nav", {
		"data-testid": f,
		"aria-label": p,
		className: e("flex flex-col gap-0.5 text-sm", u),
		children: n.length === 0 ? /* @__PURE__ */ D("p", {
			"data-testid": `${f}-empty`,
			className: "px-2 py-1.5 text-xs text-text-tertiary",
			children: l
		}) : n.map((t) => {
			let n = !!s && t.id === s;
			return /* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${f}-entry`,
				"data-level": t.level,
				"data-active": n ? "true" : "false",
				"aria-current": n ? "location" : void 0,
				onClick: () => c?.(t.id),
				style: { paddingLeft: 12 + F(t.level, m) },
				className: e("rounded py-1 pr-3 text-left transition-colors", d ? "whitespace-normal break-words" : "truncate", "hover:bg-surface-hover", n ? "bg-surface-inset font-medium text-text-primary" : "text-text-secondary"),
				title: t.text,
				children: t.text || "Untitled heading"
			}, t.id);
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentStatusBar.tsx
var I = [
	.5,
	.75,
	.9,
	1,
	1.25,
	1.5,
	2
], L = "fit";
function R({ wordCount: t = null, zoom: n = 1, onZoomChange: r, fitActive: i = !1, onFitWidth: a, children: o, className: s, "data-testid": c = "document-status-bar" }) {
	let l = i || I.includes(n) ? I : [...I, n].sort((e, t) => e - t);
	return /* @__PURE__ */ O("div", {
		"data-testid": c,
		className: e("flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border bg-surface-panel px-3 py-1 text-xs text-text-tertiary", s),
		children: [
			t !== null && /* @__PURE__ */ D("span", {
				"data-testid": `${c}-word-count`,
				className: "tabular-nums",
				children: t === 1 ? "1 word" : `${t.toLocaleString()} words`
			}),
			o,
			r && /* @__PURE__ */ D(ee, {
				size: "sm",
				variant: "ghost",
				"data-testid": `${c}-zoom`,
				"aria-label": "Zoom",
				title: "Zoom",
				className: "ml-auto",
				value: i ? "fit" : String(n),
				onChange: (e) => {
					e.target.value === "fit" ? a?.() : r(Number(e.target.value));
				},
				options: [...a ? [{
					value: "fit",
					label: "Fit width"
				}] : [], ...l.map((e) => ({
					value: String(e),
					label: `${Math.round(e * 100)}%`
				}))]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useDocumentOutline.ts
function Ce(e) {
	let t = e?.state?.doc?.descendants;
	if (!e || typeof t != "function") return [];
	let n = [];
	return e.state.doc.descendants((e, t) => {
		if (e.type?.name !== "heading") return;
		let r = e.attrs?.level;
		n.push({
			id: String(t),
			text: (e.textContent ?? "").trim(),
			level: typeof r == "number" ? r : 1
		});
	}), n;
}
function we(e, t) {
	if (!e) return null;
	let n = Number(t);
	if (!Number.isFinite(n) || typeof e.view?.domAtPos != "function") return null;
	try {
		let { node: t } = e.view.domAtPos(n + 1), r = t.nodeType === Node.ELEMENT_NODE ? t : t.parentElement;
		return r?.closest("h1,h2,h3,h4,h5,h6") ?? r;
	} catch {
		return null;
	}
}
function Te(e) {
	let [t, n] = T(() => Ce(e)), [r, i] = T(null);
	return C(() => {
		if (!e) {
			n([]);
			return;
		}
		let t = () => n(Ce(e));
		if (t(), typeof e.on == "function" && typeof e.off == "function") return e.on("update", t), () => e.off("update", t);
	}, [e]), {
		entries: t,
		activeId: r,
		goTo: x((t) => {
			let n = we(e, t);
			n && (n.scrollIntoView({
				behavior: "smooth",
				block: "start"
			}), i(t));
		}, [e])
	};
}
function Ee(e) {
	let t = e?.state?.doc;
	if (!t) return null;
	let n = "";
	return typeof e.state?.doc?.descendants == "function" ? e.state.doc.descendants((e) => {
		let t = e.text;
		typeof t == "string" && (n += `${t} `);
	}) : typeof t.textContent == "string" && (n = t.textContent), n.trim().split(/\s+/).filter(Boolean).length;
}
function De(e) {
	let [t, n] = T(() => Ee(e));
	return C(() => {
		if (!e) {
			n(null);
			return;
		}
		let t = () => n(Ee(e));
		if (t(), typeof e.on == "function" && typeof e.off == "function") return e.on("update", t), () => e.off("update", t);
	}, [e]), t;
}
//#endregion
//#region src/components/doc-editor/LinkPopover.tsx
function Oe(e) {
	let t = e.trim().replace(/[ -\s]/g, "").toLowerCase();
	return !/^(javascript|data|vbscript):/.test(t) && t.length > 0;
}
function z(e) {
	let t = e.trim();
	return t ? /^([a-z][a-z0-9+.-]*:|\/|#|\?)/i.test(t) ? t : `https://${t}` : "";
}
function ke({ trigger: e, open: n, onClose: r, initialHref: i = "", onSubmit: a, onRemove: o, "data-testid": s = "link-popover" }) {
	let [c, l] = T(i), [u, d] = T(null), f = w(null);
	C(() => {
		if (!n) return;
		l(i), d(null);
		let e = setTimeout(() => f.current?.focus(), 20);
		return () => clearTimeout(e);
	}, [n, i]);
	let p = () => {
		let e = z(c);
		if (!e) {
			d("Enter a URL.");
			return;
		}
		if (!Oe(e)) {
			d("That link scheme is not allowed.");
			return;
		}
		a(e), r();
	};
	return /* @__PURE__ */ D(y, {
		trigger: e,
		open: n,
		onClose: r,
		"data-testid": s,
		"aria-label": "Edit link",
		className: "w-[320px] p-2",
		children: /* @__PURE__ */ O("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ D(v, {
					ref: f,
					size: "sm",
					type: "url",
					"aria-label": "Link URL",
					placeholder: "https://example.dev",
					"data-testid": `${s}-input`,
					value: c,
					onChange: (e) => {
						l(e.target.value), d(null);
					},
					onKeyDown: (e) => {
						e.key === "Enter" && (e.preventDefault(), p());
					}
				}),
				u && /* @__PURE__ */ D("div", {
					role: "alert",
					"data-testid": `${s}-error`,
					className: "text-[11px] text-danger-fg",
					children: u
				}),
				/* @__PURE__ */ O("div", {
					className: "flex items-center justify-end gap-1.5",
					children: [o && /* @__PURE__ */ D(t, {
						variant: "ghost",
						size: "sm",
						"data-testid": `${s}-remove`,
						onClick: () => {
							o(), r();
						},
						children: "Remove"
					}), /* @__PURE__ */ D(t, {
						size: "sm",
						"data-testid": `${s}-apply`,
						onClick: p,
						children: "Apply"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentToolbar.tsx
var B = {
	narrow: 840,
	wide: 1240
};
function V(e) {
	return e == null ? "wide" : e < B.narrow ? "narrow" : e < B.wide ? "medium" : "wide";
}
var Ae = de("wide"), je = de(!1), Me = "h-9 min-w-8 px-1.5 rounded-md text-sm", H = "h-7 min-w-7 px-1.5 rounded text-xs", Ne = () => S(je) ? 18 : 14;
function Pe() {
	return S(Ae);
}
var Fe = [
	"selects",
	"marksExtra",
	"listsExtra",
	"indent",
	"colour",
	"shape",
	"insert",
	"image",
	"clear"
], Ie = [
	"clear",
	"shape",
	"insert",
	"indent",
	"colour",
	"image",
	"listsExtra",
	"marksExtra",
	"selects"
], Le = /* @__PURE__ */ new Set([
	"indent",
	"shape",
	"insert",
	"clear"
]), Re = [
	"image",
	"colour",
	"listsExtra",
	"marksExtra",
	"selects"
], U = {
	wide: new Set(Fe),
	medium: /* @__PURE__ */ new Set(["selects"]),
	narrow: /* @__PURE__ */ new Set([])
}, ze = /* @__PURE__ */ new Set(["strike", "code"]), Be = /* @__PURE__ */ new Set(["taskList"]), Ve = [
	{
		value: "",
		label: "Default"
	},
	{
		value: "Arial, Helvetica, sans-serif",
		label: "Arial"
	},
	{
		value: "Georgia, \"Times New Roman\", serif",
		label: "Georgia"
	},
	{
		value: "\"Times New Roman\", Times, serif",
		label: "Times New Roman"
	},
	{
		value: "\"Courier New\", Courier, monospace",
		label: "Courier New"
	},
	{
		value: "Verdana, Geneva, sans-serif",
		label: "Verdana"
	}
], He = [{
	value: "",
	label: "Size"
}, ...[
	8,
	9,
	10,
	11,
	12,
	14,
	18,
	24,
	30,
	36
].map((e) => ({
	value: `${e}pt`,
	label: String(e)
}))], Ue = [
	{
		value: "paragraph",
		label: "Normal text"
	},
	{
		value: "heading1",
		label: "Heading 1"
	},
	{
		value: "heading2",
		label: "Heading 2"
	},
	{
		value: "heading3",
		label: "Heading 3"
	},
	{
		value: "blockquote",
		label: "Quote"
	},
	{
		value: "codeBlock",
		label: "Code block"
	}
];
function We(e) {
	return e.isActive("heading", { level: 1 }) ? "heading1" : e.isActive("heading", { level: 2 }) ? "heading2" : e.isActive("heading", { level: 3 }) ? "heading3" : e.isActive("blockquote") ? "blockquote" : e.isActive("codeBlock") ? "codeBlock" : "paragraph";
}
function W(e, t) {
	if (e.isDestroyed) return !1;
	try {
		return typeof e.commands[t] == "function";
	} catch {
		return !1;
	}
}
function G({ icon: e }) {
	let t = Ne();
	return /* @__PURE__ */ D(e, { size: t });
}
var Ge = [
	{
		key: "bold",
		label: /* @__PURE__ */ D("span", {
			className: "font-bold",
			children: "B"
		}),
		hint: "Bold  **text**",
		run: (e) => {
			e.chain().focus().toggleBold().run();
		},
		active: (e) => e.isActive("bold")
	},
	{
		key: "italic",
		label: /* @__PURE__ */ D(G, { icon: l }),
		hint: "Italic  *text*",
		run: (e) => {
			e.chain().focus().toggleItalic().run();
		},
		active: (e) => e.isActive("italic")
	},
	{
		key: "underline",
		label: /* @__PURE__ */ D("span", {
			className: "underline underline-offset-2",
			children: "U"
		}),
		hint: "Underline",
		run: (e) => {
			e.chain().focus().toggleUnderline().run();
		},
		active: (e) => e.isActive("underline")
	},
	{
		key: "strike",
		label: /* @__PURE__ */ D("span", {
			className: "line-through",
			children: "S"
		}),
		hint: "Strikethrough  ~~text~~",
		run: (e) => {
			e.chain().focus().toggleStrike().run();
		},
		active: (e) => e.isActive("strike")
	},
	{
		key: "code",
		label: /* @__PURE__ */ D(G, { icon: f }),
		hint: "Inline code  `text`",
		run: (e) => {
			e.chain().focus().toggleCode().run();
		},
		active: (e) => e.isActive("code")
	}
], Ke = [
	{
		key: "bulletList",
		label: /* @__PURE__ */ D(G, { icon: p }),
		hint: "Bulleted list  - item",
		run: (e) => {
			e.chain().focus().toggleBulletList().run();
		},
		active: (e) => e.isActive("bulletList")
	},
	{
		key: "orderedList",
		label: /* @__PURE__ */ D(G, { icon: d }),
		hint: "Numbered list  1. item",
		run: (e) => {
			e.chain().focus().toggleOrderedList().run();
		},
		active: (e) => e.isActive("orderedList")
	},
	{
		key: "taskList",
		label: /* @__PURE__ */ D(G, { icon: g }),
		hint: "Task list  - [ ] item",
		run: (e) => {
			e.chain().focus().toggleTaskList().run();
		},
		active: (e) => e.isActive("taskList")
	}
];
function K(e) {
	return {
		onMouseDown: (t) => {
			t.preventDefault(), e();
		},
		onClick: (t) => {
			t.detail === 0 && e();
		}
	};
}
var q = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function J({ btn: t, editor: n, testId: r, active: i }) {
	let a = S(je);
	return /* @__PURE__ */ D("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": r,
		title: t.hint,
		"aria-label": t.hint.split("  ")[0],
		"aria-pressed": i,
		...K(() => t.run(n)),
		className: e("inline-flex items-center justify-center font-semibold cursor-pointer border-none", a ? Me : H, i ? "bg-primary text-on-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
		children: t.label
	});
}
var qe = [
	"left",
	"center",
	"right",
	"justify"
];
function Y(e) {
	return e === "justify" ? "Justify" : `Align ${e}`;
}
var X = 700;
function Z() {
	let [e, t] = T(!1), n = w(null), r = w(null), i = w(null), a = fe(), [o, s] = T(null), [c, l] = T(null), u = w({
		buf: "",
		at: 0
	}), d = x(() => i.current ? Array.from(i.current.querySelectorAll("[role^=\"menuitem\"]")) : [], []), f = x((e) => {
		t(!1), s(null), l(null), e && r.current?.focus();
	}, []), p = x(() => {
		f(!!(document.activeElement && n.current?.contains(document.activeElement)));
	}, [f]);
	C(() => {
		if (!e) return;
		let t = (e) => !!(e && n.current?.contains(e)), r = (e) => {
			t(e.target) || f(!1);
		}, i = (e) => {
			e.key === "Escape" && f(t(document.activeElement));
		}, a = (e) => {
			t(e.target) || f(!1);
		};
		return document.addEventListener("mousedown", r), document.addEventListener("keydown", i), document.addEventListener("focusin", a), () => {
			document.removeEventListener("mousedown", r), document.removeEventListener("keydown", i), document.removeEventListener("focusin", a);
		};
	}, [e, f]), pe(() => {
		if (!e || c === null) return;
		let t = d();
		if (t.length === 0) return;
		let n = t.find((e) => e.getAttribute("aria-checked") === "true"), r = c === "last" ? t[t.length - 1] : n ?? t[0];
		s(r?.id ?? null), l(null);
	}, [
		e,
		c,
		d
	]), C(() => {
		!e || !o || document.getElementById(o)?.focus();
	}, [e, o]);
	let m = x((e) => {
		let t = d();
		if (t.length === 0) return;
		let n = t.findIndex((e) => e.id === o), i = (n) => {
			e.preventDefault();
			let r = t[(n + t.length) % t.length];
			r && s(r.id);
		};
		switch (e.key) {
			case "ArrowDown":
			case "ArrowRight": return i(n < 0 ? 0 : n + 1);
			case "ArrowUp":
			case "ArrowLeft": return i(n < 0 ? t.length - 1 : n - 1);
			case "Home": return i(0);
			case "End": return i(t.length - 1);
			case "Tab":
				r.current?.focus(), f(!1);
				return;
			case "Enter":
			case " ": return;
		}
		if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
		let a = Date.now(), c = (a - u.current.at < X ? u.current.buf : "") + e.key.toLowerCase();
		u.current = {
			buf: c,
			at: a
		};
		let l = (e) => (e.getAttribute("aria-label") || e.textContent || "").trim().toLowerCase(), p = [...t.slice(n + 1), ...t.slice(0, n + 1)].find((e) => l(e).startsWith(c));
		p && (e.preventDefault(), s(p.id));
	}, [
		o,
		d,
		f
	]), h = x((n) => {
		if (e) {
			m(n);
			return;
		}
		if (n.key === "ArrowDown") {
			n.preventDefault(), t(!0), l("first");
			return;
		}
		n.key === "ArrowUp" && (n.preventDefault(), t(!0), l("last"));
	}, [e, m]);
	return {
		open: e,
		close: p,
		wrapRef: n,
		triggerProps: {
			ref: r,
			"aria-haspopup": "menu",
			"aria-expanded": e,
			...e ? { "aria-controls": a } : {},
			onMouseDown: (e) => {
				e.preventDefault(), t((e) => !e), s(null);
			},
			onClick: (e) => {
				e.detail === 0 && t((e) => e ? (s(null), !1) : (l("first"), !0));
			},
			onKeyDown: h
		},
		menuProps: {
			ref: (e) => {
				i.current = e;
			},
			id: a,
			role: "menu",
			tabIndex: -1,
			...o ? { "aria-activedescendant": o } : {},
			onKeyDown: m
		},
		itemProps: (e) => {
			let t = `${a}${e}`;
			return {
				id: t,
				tabIndex: o === t ? 0 : -1
			};
		}
	};
}
var Je = [
	{
		value: "#202124",
		label: "Black"
	},
	{
		value: "#5f6368",
		label: "Grey"
	},
	{
		value: "#c5221f",
		label: "Red"
	},
	{
		value: "#e8710a",
		label: "Orange"
	},
	{
		value: "#188038",
		label: "Green"
	},
	{
		value: "#1967d2",
		label: "Blue"
	},
	{
		value: "#8430ce",
		label: "Purple"
	}
], Ye = [
	{
		value: "#fff475",
		label: "Yellow"
	},
	{
		value: "#ccff90",
		label: "Green"
	},
	{
		value: "#a7ffeb",
		label: "Teal"
	},
	{
		value: "#cbf0f8",
		label: "Blue"
	},
	{
		value: "#fdcfe8",
		label: "Pink"
	},
	{
		value: "#e6c9a8",
		label: "Brown"
	}
];
function Xe({ editor: t, current: n, swatches: r, setCmd: i, unsetCmd: a, glyph: o, title: s, testId: c }) {
	let { open: l, close: u, wrapRef: d, triggerProps: f, menuProps: p, itemProps: m } = Z(), g = S(je), _ = (e) => {
		let n = t.chain().focus();
		e ? n[i](e).run() : n[a]().run(), u();
	};
	return /* @__PURE__ */ O("span", {
		ref: d,
		className: "relative inline-flex",
		children: [/* @__PURE__ */ O("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": c,
			title: s,
			"aria-label": s,
			...f,
			className: e("inline-flex items-center justify-center gap-1 cursor-pointer border-none leading-none", g ? "h-9 rounded-md px-1.5 text-[16px] font-semibold" : "h-7 rounded px-1.5 text-xs", l ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ O("span", {
				className: "inline-flex flex-col items-center justify-center gap-px",
				children: [/* @__PURE__ */ D("span", {
					"aria-hidden": !0,
					children: o
				}), /* @__PURE__ */ D("span", {
					"aria-hidden": !0,
					"data-testid": `${c}-current`,
					className: e("rounded-sm border border-border", g ? "h-1 w-[18px]" : "h-[3px] w-3.5"),
					style: { background: n || (g && i === "setColor" ? "var(--color-text-primary)" : "transparent") }
				})]
			}), g && i === "setColor" && /* @__PURE__ */ D(h, {
				size: 12,
				"aria-hidden": "true"
			})]
		}), l && /* @__PURE__ */ O("span", {
			...p,
			"data-testid": `${c}-menu`,
			"aria-label": s,
			className: "absolute left-0 top-full z-20 mt-1 grid w-[136px] grid-cols-4 gap-1 rounded-md border border-border bg-surface-panel p-1.5 shadow-lg",
			children: [/* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitem",
				...m("none"),
				"data-testid": `${c}-none`,
				title: "None",
				"aria-label": "None",
				...K(() => _(null)),
				className: e("col-span-4 rounded px-1 py-0.5 text-left text-[11px] text-text-secondary hover:bg-surface-hover cursor-pointer border-none bg-transparent", q),
				children: "None"
			}), r.map((t) => /* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitemradio",
				"aria-checked": t.value === n,
				...m(t.value),
				"data-testid": `${c}-${t.label.toLowerCase()}`,
				title: t.label,
				"aria-label": t.label,
				...K(() => _(t.value)),
				className: e("h-6 w-6 rounded cursor-pointer border", q, "focus-visible:ring-offset-1", t.value === n ? "border-primary ring-1 ring-primary" : "border-border"),
				style: { background: t.value }
			}, t.value))]
		})]
	});
}
var Ze = [
	{
		key: "row-before",
		label: "Insert row above",
		cmd: "addRowBefore"
	},
	{
		key: "row-after",
		label: "Insert row below",
		cmd: "addRowAfter"
	},
	{
		key: "col-before",
		label: "Insert column left",
		cmd: "addColumnBefore"
	},
	{
		key: "col-after",
		label: "Insert column right",
		cmd: "addColumnAfter"
	},
	{
		key: "header-row",
		label: "Toggle header row",
		cmd: "toggleHeaderRow"
	},
	{
		key: "merge",
		label: "Merge or split cells",
		cmd: "mergeOrSplit"
	},
	{
		key: "del-row",
		label: "Delete row",
		cmd: "deleteRow"
	},
	{
		key: "del-col",
		label: "Delete column",
		cmd: "deleteColumn"
	},
	{
		key: "del-table",
		label: "Delete table",
		cmd: "deleteTable"
	}
];
function Qe({ editor: t, inTable: n, testId: r }) {
	let { open: i, close: a, wrapRef: o, triggerProps: s, menuProps: c, itemProps: l } = Z(), u = (e) => {
		t.chain().focus()[e]?.().run(), a();
	}, d = () => {
		t.chain().focus().insertTable({
			rows: 3,
			cols: 3,
			withHeaderRow: !0
		}).run(), a();
	};
	return /* @__PURE__ */ O("span", {
		ref: o,
		className: "relative inline-flex",
		children: [/* @__PURE__ */ O("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": r,
			title: n ? "Table" : "Insert table",
			"aria-label": n ? "Table options" : "Insert a table",
			...s,
			className: e("inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none", i ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				children: "▦"
			}), /* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				className: "text-[8px] leading-none",
				children: "▾"
			})]
		}), i && /* @__PURE__ */ O("span", {
			...c,
			"data-testid": `${r}-menu`,
			"aria-label": "Table",
			className: "absolute left-0 top-full z-20 mt-1 flex min-w-[180px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg",
			children: [/* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitem",
				...l("insert"),
				"data-testid": `${r}-insert`,
				...K(d),
				className: e("cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover", q),
				children: "Insert table"
			}), n && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				className: "my-1 h-px bg-border"
			}), Ze.map((t) => /* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitem",
				...l(t.key),
				"data-testid": `${r}-${t.key}`,
				...K(() => u(t.cmd)),
				className: e("cursor-pointer rounded border-none bg-transparent px-2 py-1 text-left text-xs text-text-secondary hover:bg-surface-hover", q),
				children: t.label
			}, t.key))] })]
		})]
	});
}
function $e({ editor: t, btn: n, active: r, styles: i, current: a, label: o, icon: s, testId: c }) {
	let { open: l, close: u, wrapRef: d, triggerProps: f, menuProps: p, itemProps: m } = Z(), g = S(je), _ = (e) => {
		t.chain().focus().setListStyle(e).run(), u();
	};
	return /* @__PURE__ */ O("span", {
		ref: d,
		className: "relative inline-flex items-center",
		children: [
			n && /* @__PURE__ */ D(J, {
				btn: n,
				editor: t,
				active: r,
				testId: c
			}),
			/* @__PURE__ */ O("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": n ? `${c}-styles` : c,
				title: o,
				"aria-label": o,
				...f,
				className: e("inline-flex items-center justify-center gap-0.5 cursor-pointer border-none", g ? "h-9 rounded-md" : "h-7 rounded", n ? "w-4 px-0" : g ? "px-2" : "px-1.5", l ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover", !n && !l && r && "text-text-primary"),
				children: [s, /* @__PURE__ */ D(h, {
					size: n ? 10 : 12,
					"aria-hidden": "true"
				})]
			}),
			l && /* @__PURE__ */ D("span", {
				...p,
				"data-testid": `${n ? `${c}-styles` : c}-menu`,
				"aria-label": o,
				className: "absolute left-0 top-full z-20 mt-1 flex min-w-[180px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg",
				children: i.map((t) => /* @__PURE__ */ D("button", {
					"data-ui-part": "",
					type: "button",
					role: "menuitemradio",
					"aria-checked": t === a,
					...m(t),
					"data-testid": `${c}-style-${t}`,
					...K(() => _(t)),
					className: e("whitespace-pre rounded px-2 py-1.5 text-left text-[13px] cursor-pointer border-none", q, t === a ? "bg-surface-hover font-semibold text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
					children: oe[t]
				}, t))
			})
		]
	});
}
function et({ control: e, testId: t }) {
	let { zoom: n, fitActive: r, steps: i, onZoomChange: a, onFitWidth: o } = e, s = [
		...o ? [{
			value: "fit",
			label: "Fit width"
		}] : [],
		...i.map((e) => ({
			value: String(e),
			label: `${Math.round(e * 100)}%`
		})),
		...!r && !i.includes(n) ? [{
			value: String(n),
			label: `${Math.round(n * 100)}%`
		}] : []
	];
	return /* @__PURE__ */ O("span", {
		className: "flex w-full items-center justify-between gap-3 px-1.5 py-1 text-[13px] text-text-secondary",
		"data-testid": `${t}-zoom-row`,
		children: [/* @__PURE__ */ D("span", { children: "Zoom" }), /* @__PURE__ */ D(ee, {
			size: "sm",
			"aria-label": "Zoom",
			"data-testid": `${t}-zoom`,
			value: r && o ? "fit" : String(n),
			options: s,
			onChange: (e) => {
				e.target.value === "fit" ? o?.() : a(Number(e.target.value));
			},
			className: "w-[110px]"
		})]
	});
}
function tt({ editor: t, current: n, testId: r }) {
	let { open: i, close: a, wrapRef: o, triggerProps: s, menuProps: c, itemProps: l } = Z(), u = (e) => {
		t.chain().focus().setTextAlign(e).run(), a();
	};
	return /* @__PURE__ */ O("span", {
		ref: o,
		className: "relative inline-flex",
		children: [/* @__PURE__ */ O("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": r,
			title: Y(n),
			"aria-label": "Text alignment",
			...s,
			className: e("inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none", i ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ D(it, { align: n }), /* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				className: "text-[8px] leading-none",
				children: "▾"
			})]
		}), i && /* @__PURE__ */ D("span", {
			...c,
			"data-testid": `${r}-menu`,
			"aria-label": "Text alignment",
			className: "absolute left-0 top-full z-20 mt-1 inline-flex gap-0.5 rounded-md border border-border bg-surface-panel p-1 shadow-lg",
			children: qe.map((t) => /* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitemradio",
				"aria-checked": t === n,
				...l(t),
				"data-testid": `${r}-${t}`,
				title: Y(t),
				"aria-label": Y(t),
				...K(() => u(t)),
				className: e("inline-flex h-7 w-7 items-center justify-center rounded cursor-pointer border-none", q, t === n ? "bg-primary text-on-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
				children: /* @__PURE__ */ D(it, { align: t })
			}, t))
		})]
	});
}
function nt({ editor: t, current: n, testId: r }) {
	let { open: i, close: a, wrapRef: o, triggerProps: s, menuProps: c, itemProps: l } = Z(), u = (e) => {
		t.chain().focus().setLineSpacing(e).run(), a();
	};
	return /* @__PURE__ */ O("span", {
		ref: o,
		className: "relative inline-flex",
		children: [/* @__PURE__ */ O("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": r,
			title: `Line spacing: ${ae[n]}`,
			"aria-label": "Line spacing",
			...s,
			className: e("inline-flex items-center gap-0.5 h-7 px-1.5 rounded text-xs cursor-pointer border-none", i ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ D(rt, {}), /* @__PURE__ */ D("span", {
				"aria-hidden": !0,
				className: "text-[8px] leading-none",
				children: "▾"
			})]
		}), i && /* @__PURE__ */ D("span", {
			...c,
			"data-testid": `${r}-menu`,
			"aria-label": "Line spacing",
			className: "absolute left-0 top-full z-20 mt-1 flex min-w-[110px] flex-col rounded-md border border-border bg-surface-panel p-1 shadow-lg",
			children: ue.map((t) => /* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				role: "menuitemradio",
				"aria-checked": t === n,
				...l(t),
				"data-testid": `${r}-${t.replace(".", "-")}`,
				title: ae[t],
				"aria-label": ae[t],
				...K(() => u(t)),
				className: e("cursor-pointer rounded border-none px-2 py-1 text-left text-xs", q, t === n ? "bg-primary text-on-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
				children: ae[t]
			}, t))
		})]
	});
}
function rt() {
	return /* @__PURE__ */ O("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			[
				2.5,
				7,
				11.5
			].map((e) => /* @__PURE__ */ D("rect", {
				x: "5.5",
				y: e,
				width: "8",
				height: "1.4",
				rx: "0.7",
				fill: "currentColor"
			}, e)),
			/* @__PURE__ */ D("rect", {
				x: "2.2",
				y: "2.5",
				width: "1.2",
				height: "10.4",
				rx: "0.6",
				fill: "currentColor"
			}),
			/* @__PURE__ */ D("path", {
				d: "M2.8 1.4 L4.6 4 L1 4 Z",
				fill: "currentColor"
			}),
			/* @__PURE__ */ D("path", {
				d: "M2.8 14 L4.6 11.4 L1 11.4 Z",
				fill: "currentColor"
			})
		]
	});
}
function it({ align: e }) {
	let t = e === "justify" ? 12 : 7, n = e === "right" ? 6 : e === "center" ? 3.5 : 1;
	return /* @__PURE__ */ D("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 14 14",
		"aria-hidden": "true",
		focusable: "false",
		children: [
			2,
			5,
			8,
			11
		].map((e, r) => {
			let i = r % 2 == 1;
			return /* @__PURE__ */ D("rect", {
				x: i ? n : 1,
				y: e,
				width: i ? t : 12,
				height: "1.4",
				rx: "0.7",
				fill: "currentColor"
			}, e);
		})
	});
}
function Q() {
	return /* @__PURE__ */ D("span", {
		"aria-hidden": !0,
		"data-divider": "true",
		className: e("w-px shrink-0 self-center bg-border-emphasis", S(je) ? "mx-2 h-6" : "mx-1.5 h-5")
	});
}
function at(e, t) {
	return t === 0 ? "Comments" : e === 0 ? "Suggestions" : "Markup";
}
function ot({ comments: t, suggestions: n, visible: r, onToggle: i, testId: a }) {
	let o = at(t, n), s = t + n, c = `${r ? "Hide" : "Show"} ${o.toLowerCase()} (${s})`;
	return /* @__PURE__ */ O("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": a,
		title: c,
		"aria-label": c,
		"aria-pressed": r,
		onClick: i,
		className: e("inline-flex items-center gap-1.5 h-7 px-2 rounded border text-xs font-semibold cursor-pointer", r ? "bg-primary text-on-primary border-primary" : "bg-primary-bg text-primary-fg border-primary-border hover:bg-surface-hover"),
		children: [
			/* @__PURE__ */ D("span", { children: o }),
			/* @__PURE__ */ D("span", {
				className: e("rounded-full px-1.5 leading-4 tabular-nums", r ? "bg-on-primary/25 text-on-primary" : "bg-primary text-on-primary"),
				children: s
			}),
			!r && /* @__PURE__ */ D("span", {
				className: "text-[10px] font-normal uppercase tracking-wide",
				children: "hidden"
			})
		]
	});
}
function st() {
	let [e, t] = T(!1), n = w(null), r = w(null), i = fe(), a = x((e) => {
		t(!1), e && r.current?.focus();
	}, []);
	return C(() => {
		if (!e) return;
		let t = (e) => !!(e && n.current?.contains(e)), r = (e) => {
			t(e.target) || a(!1);
		}, i = (e) => {
			e.key === "Escape" && a(t(document.activeElement));
		}, o = (e) => {
			t(e.target) || a(!1);
		};
		return document.addEventListener("mousedown", r), document.addEventListener("keydown", i), document.addEventListener("focusin", o), () => {
			document.removeEventListener("mousedown", r), document.removeEventListener("keydown", i), document.removeEventListener("focusin", o);
		};
	}, [e, a]), {
		open: e,
		close: () => a(!1),
		wrapRef: n,
		triggerProps: {
			ref: r,
			"aria-expanded": e,
			...e ? { "aria-controls": i } : {},
			onMouseDown: (e) => {
				e.preventDefault(), t((e) => !e);
			},
			onClick: (e) => {
				e.detail === 0 && t((e) => !e);
			}
		},
		panelProps: {
			id: i,
			role: "group"
		}
	};
}
var ct = "inline-flex h-7 items-center gap-1 rounded px-1.5 text-xs font-semibold cursor-pointer border-none", $ = (e) => e ? "bg-surface-hover text-text-primary" : "bg-transparent text-text-secondary hover:bg-surface-hover", lt = "absolute top-full z-20 mt-1 rounded-md border border-border bg-surface-panel shadow-lg";
function ut({ editor: t, actions: n, commentCount: r = 0, suggestionCount: l = 0, gutterVisible: d = !0, onToggleGutter: f, onInsertImage: p, density: h = "full", size: g = "auto", extras: _ = "inline", zoomControl: v, "data-testid": y = "document-toolbar" }) {
	let b = _e({
		editor: t,
		selector: ({ editor: e }) => {
			if (!e) return null;
			let t = {};
			for (let n of [...Ge, ...Ke]) t[n.key] = n.active(e);
			t.link = e.isActive("link"), t.highlight = e.isActive("highlight"), t.table = e.isActive("table"), t.inListItem = e.isActive("listItem") || e.isActive("taskItem"), t.inTaskItem = e.isActive("taskItem");
			for (let n of qe) t[`align-${n}`] = e.isActive({ textAlign: n });
			let n = e.getAttributes("paragraph").lineSpacing, r = e.getAttributes("textStyle"), i = e.isActive("bulletList") ? "bulletList" : e.isActive("orderedList") ? "orderedList" : null;
			return {
				listStyle: i ? ie(e.getAttributes(i).listStyle) : null,
				block: We(e),
				flags: t,
				fontFamily: r.fontFamily ?? "",
				fontSize: r.fontSize ?? "",
				color: r.color ?? "",
				backgroundColor: r.backgroundColor ?? "",
				lineSpacing: ue.includes(n ?? "") ? n : "1"
			};
		}
	}), ae = w(null), [oe, le] = T(!1), de = r + l, S = x((e) => {
		if (!t || t.isDestroyed) return;
		let n = t.chain().focus();
		switch (e) {
			case "heading1":
				n.setNode("heading", { level: 1 }).run();
				break;
			case "heading2":
				n.setNode("heading", { level: 2 }).run();
				break;
			case "heading3":
				n.setNode("heading", { level: 3 }).run();
				break;
			case "blockquote":
				n.toggleBlockquote().run();
				break;
			case "codeBlock":
				n.setNode("codeBlock").run();
				break;
			default: n.setParagraph().run();
		}
	}, [t]), { ref: C, ...fe } = te(), me = w(null), { ref: he, width: ge } = ne(x((e) => {
		me.current = e, C.current = e;
	}, [C])), k = st(), A = st(), ve = g === "auto" ? V(ge) : g, ye = g === "auto" && h === "full", j = _ === "overflow" && h === "full", M = j ? Re : Ie, [N, P] = T(0), be = w([]), xe = w(null);
	if (pe(() => {
		if (!ye) return;
		let e = me.current, t = xe.current;
		if (!e || !t) return;
		let n = e.clientWidth;
		if (!(n > 0)) return;
		let r = e.scrollWidth - t.getBoundingClientRect().width;
		if (be.current[N] = r, r > n + 1 && N < M.length) {
			P(N + 1);
			return;
		}
		if (N > 0) {
			let e = be.current[N - 1];
			(e == null || e <= n + 1) && P(N - 1);
		}
	}), !t || t.isDestroyed) return null;
	let F = h === "full", Se = F ? ye ? new Set(Fe.filter((e) => !M.slice(0, N).includes(e) && !(j && Le.has(e)))) : j ? new Set([...U[ve]].filter((e) => !Le.has(e))) : U[ve] : /* @__PURE__ */ new Set(["marksExtra", "listsExtra"]), I = (e) => Se.has(e), L = (e) => F && !Se.has(e), R = (e) => /* @__PURE__ */ D(J, {
		btn: e,
		editor: t,
		active: b?.flags[e.key] ?? !1,
		testId: `${y}-${e.key}`
	}, e.key), Ce = Ge.filter((e) => !ze.has(e.key)), we = Ge.filter((e) => ze.has(e.key)), Te = Ke.filter((e) => !Be.has(e.key)), Ee = Ke.filter((e) => Be.has(e.key)), De = (e) => /* @__PURE__ */ O(E, { children: [
		/* @__PURE__ */ D(ee, {
			size: F ? "md" : "sm",
			"data-testid": `${y}-block`,
			"aria-label": "Text style",
			value: b?.block ?? "paragraph",
			options: Ue,
			onChange: (e) => S(e.target.value),
			className: e ? "w-full" : F ? "w-[140px] text-sm" : "w-[140px]"
		}),
		W(t, "setFontFamily") && /* @__PURE__ */ O(E, { children: [!e && !j && /* @__PURE__ */ D(Q, {}), /* @__PURE__ */ D(ee, {
			size: F ? "md" : "sm",
			"data-testid": `${y}-font-family`,
			"aria-label": "Font",
			value: b?.fontFamily ?? "",
			options: Ve,
			onChange: (e) => {
				let n = t.chain().focus();
				e.target.value ? n.setFontFamily(e.target.value).run() : n.unsetFontFamily().run();
			},
			className: e ? "w-full" : j ? "ml-2 w-[128px] text-sm" : "w-[130px]"
		})] }),
		W(t, "setFontSize") && /* @__PURE__ */ D(ee, {
			size: F ? "md" : "sm",
			"data-testid": `${y}-font-size`,
			"aria-label": "Font size",
			value: b?.fontSize ?? "",
			options: He,
			onChange: (e) => {
				let n = t.chain().focus();
				e.target.value ? n.setFontSize(e.target.value).run() : n.unsetFontSize().run();
			},
			className: e ? "w-full" : j ? "ml-2 w-[76px] text-sm" : "w-[72px]"
		})
	] }), Oe = W(t, "sinkListItem") && (b?.flags.inListItem ?? !1) ? /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(J, {
		btn: {
			key: "outdent",
			label: "⇤",
			hint: "Outdent  Shift-Tab",
			run: (e) => {
				let t = b?.flags.inTaskItem ? "taskItem" : "listItem";
				e.chain().focus().liftListItem(t).run();
			},
			active: () => !1
		},
		editor: t,
		active: !1,
		testId: `${y}-outdent`
	}), /* @__PURE__ */ D(J, {
		btn: {
			key: "indent",
			label: "⇥",
			hint: "Indent  Tab",
			run: (e) => {
				let t = b?.flags.inTaskItem ? "taskItem" : "listItem";
				e.chain().focus().sinkListItem(t).run();
			},
			active: () => !1
		},
		editor: t,
		active: !1,
		testId: `${y}-indent`
	})] }) : null, z = W(t, "setColor") || W(t, "setBackgroundColor") || W(t, "toggleHighlight") ? /* @__PURE__ */ O(E, { children: [
		W(t, "setColor") && /* @__PURE__ */ D(Xe, {
			editor: t,
			current: b?.color ?? "",
			swatches: Je,
			setCmd: "setColor",
			unsetCmd: "unsetColor",
			glyph: "A",
			title: "Text colour",
			testId: `${y}-color`
		}),
		j && W(t, "setColor") && (W(t, "setBackgroundColor") || W(t, "toggleHighlight")) && /* @__PURE__ */ D(Q, {}),
		W(t, "setBackgroundColor") && /* @__PURE__ */ D(Xe, {
			editor: t,
			current: b?.backgroundColor ?? "",
			swatches: Ye,
			setCmd: "setBackgroundColor",
			unsetCmd: "unsetBackgroundColor",
			glyph: F ? /* @__PURE__ */ D(u, { size: 18 }) : "✎",
			title: "Highlight colour",
			testId: `${y}-highlight-color`
		}),
		W(t, "toggleHighlight") && !(j && W(t, "setBackgroundColor")) && /* @__PURE__ */ D(J, {
			btn: {
				key: "highlight",
				label: /* @__PURE__ */ D(G, { icon: u }),
				hint: "Highlight",
				run: (e) => {
					e.chain().focus().toggleHighlight().run();
				},
				active: (e) => e.isActive("highlight")
			},
			editor: t,
			active: b?.flags.highlight ?? !1,
			testId: `${y}-highlight`
		})
	] }) : null, B = W(t, "setTextAlign") || W(t, "setLineSpacing") ? /* @__PURE__ */ O(E, { children: [W(t, "setTextAlign") && /* @__PURE__ */ D(tt, {
		editor: t,
		current: qe.find((e) => b?.flags[`align-${e}`]) ?? "left",
		testId: `${y}-align`
	}), W(t, "setLineSpacing") && /* @__PURE__ */ D(nt, {
		editor: t,
		current: b?.lineSpacing ?? "1",
		testId: `${y}-line-spacing`
	})] }) : null, Me = /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(J, {
		btn: {
			key: "hr",
			label: "—",
			hint: "Divider  ---",
			run: (e) => {
				e.chain().focus().setHorizontalRule().run();
			},
			active: () => !1
		},
		editor: t,
		active: !1,
		testId: `${y}-hr`
	}), W(t, "insertTable") && /* @__PURE__ */ D(Qe, {
		editor: t,
		inTable: b?.flags.table ?? !1,
		testId: `${y}-table`
	})] }), H = p && W(t, "setImage") ? /* @__PURE__ */ D(J, {
		btn: {
			key: "image",
			label: /* @__PURE__ */ D(G, { icon: o }),
			hint: "Insert image",
			run: () => {
				p();
			},
			active: () => !1
		},
		editor: t,
		active: !1,
		testId: `${y}-image`
	}) : null, Ne = W(t, "unsetAllMarks") ? /* @__PURE__ */ D(J, {
		btn: {
			key: "clear-formatting",
			label: "⌫",
			hint: "Clear formatting",
			run: (e) => {
				e.chain().focus().unsetAllMarks().clearNodes().run();
			},
			active: () => !1
		},
		editor: t,
		active: !1,
		testId: `${y}-clear-formatting`
	}) : null, Pe = /* @__PURE__ */ D("span", {
		ref: ae,
		className: "inline-flex",
		children: /* @__PURE__ */ D(J, {
			btn: {
				key: "link",
				label: /* @__PURE__ */ D(G, { icon: i }),
				hint: "Link  [text](url)",
				run: (e) => {
					if (e.isActive("link")) {
						e.chain().focus().unsetLink().run();
						return;
					}
					le(!0);
				},
				active: (e) => e.isActive("link")
			},
			editor: t,
			active: b?.flags.link ?? !1,
			testId: `${y}-link`
		})
	}), K = W(t, "setListStyle"), q = (e) => b?.flags[e] ?? !1, Y = /* @__PURE__ */ O(E, { children: [
		Te.map((e) => K ? /* @__PURE__ */ D($e, {
			editor: t,
			btn: e,
			active: q(e.key),
			styles: e.key === "bulletList" ? se : ce,
			current: b?.listStyle ?? null,
			label: e.key === "bulletList" ? "Bullet style" : "Numbering style",
			testId: `${y}-${e.key}`
		}, e.key) : R(e)),
		I("listsExtra") && K && /* @__PURE__ */ D($e, {
			editor: t,
			active: q("bulletList") || q("orderedList"),
			styles: re,
			current: b?.listStyle ?? null,
			label: "List style",
			icon: /* @__PURE__ */ D(G, { icon: s }),
			testId: `${y}-list-style`
		}),
		I("listsExtra") && Ee.map(R)
	] }), X = [];
	L("marksExtra") && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: we.map(R)
	}, "marksExtra")), L("listsExtra") && X.push(/* @__PURE__ */ O("span", {
		className: "inline-flex gap-0.5",
		children: [j && K && /* @__PURE__ */ D($e, {
			editor: t,
			active: q("bulletList") || q("orderedList"),
			styles: re,
			current: b?.listStyle ?? null,
			label: "List style",
			icon: /* @__PURE__ */ D(G, { icon: s }),
			testId: `${y}-list-style`
		}), Ee.map(R)]
	}, "listsExtra")), L("indent") && Oe && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: Oe
	}, "indent")), L("colour") && z && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: z
	}, "colour")), L("shape") && B && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: B
	}, "shape")), L("insert") && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: Me
	}, "insert")), L("image") && H && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: H
	}, "image")), j && W(t, "setBackgroundColor") && W(t, "toggleHighlight") && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: /* @__PURE__ */ D(J, {
			btn: {
				key: "highlight",
				label: /* @__PURE__ */ D(G, { icon: u }),
				hint: "Highlight",
				run: (e) => {
					e.chain().focus().toggleHighlight().run();
				},
				active: (e) => e.isActive("highlight")
			},
			editor: t,
			active: b?.flags.highlight ?? !1,
			testId: `${y}-highlight`
		})
	}, "highlight")), L("clear") && Ne && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex gap-0.5",
		children: Ne
	}, "clear"));
	let Z = j && !!f && de > 0;
	Z && X.push(/* @__PURE__ */ D("span", {
		className: "inline-flex",
		children: /* @__PURE__ */ D(ot, {
			comments: r,
			suggestions: l,
			visible: d,
			onToggle: f,
			testId: `${y}-gutter-toggle`
		})
	}, "gutter")), v && X.push(/* @__PURE__ */ D(et, {
		control: v,
		testId: y
	}, "zoom"));
	let Ze = Ue.find((e) => e.value === (b?.block ?? "paragraph"))?.label ?? "Normal text";
	return /* @__PURE__ */ D(je.Provider, {
		value: F,
		children: /* @__PURE__ */ O("div", {
			...fe,
			ref: he,
			"data-testid": y,
			role: "toolbar",
			"aria-label": "Document formatting",
			"data-density": h,
			"data-size": ve,
			className: e("flex min-w-0 flex-nowrap items-center gap-0.5 [&>*]:shrink-0", j ? "px-3 py-2" : "px-2 py-1.5"),
			children: [
				/* @__PURE__ */ D(J, {
					btn: {
						key: "undo",
						label: /* @__PURE__ */ D(G, { icon: a }),
						hint: "Undo",
						run: (e) => {
							e.chain().focus().undo().run();
						},
						active: () => !1
					},
					editor: t,
					active: !1,
					testId: `${y}-undo`
				}),
				/* @__PURE__ */ D(J, {
					btn: {
						key: "redo",
						label: /* @__PURE__ */ D(G, { icon: m }),
						hint: "Redo",
						run: (e) => {
							e.chain().focus().redo().run();
						},
						active: () => !1
					},
					editor: t,
					active: !1,
					testId: `${y}-redo`
				}),
				F && I("selects") && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), De(!1)] }),
				F && !I("selects") && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), /* @__PURE__ */ O("span", {
					ref: A.wrapRef,
					className: "relative inline-flex",
					children: [/* @__PURE__ */ O("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${y}-style`,
						title: `Text style: ${Ze}`,
						"aria-label": "Text style",
						...A.triggerProps,
						className: e(ct, F ? "h-9 px-2.5 text-sm" : "px-2", $(A.open)),
						children: ["Style", /* @__PURE__ */ D("span", {
							"aria-hidden": !0,
							className: "text-[8px] leading-none",
							children: "▾"
						})]
					}), A.open && /* @__PURE__ */ D("span", {
						...A.panelProps,
						"aria-label": "Text style",
						"data-testid": `${y}-style-panel`,
						className: e(lt, "left-0 flex w-56 flex-col gap-1.5 p-2"),
						children: De(!0)
					})]
				})] }),
				j ? /* @__PURE__ */ O(E, { children: [
					/* @__PURE__ */ D(Q, {}),
					Ce.map(R),
					I("marksExtra") && we.map(R),
					/* @__PURE__ */ D(Q, {}),
					Pe,
					I("image") && H,
					/* @__PURE__ */ D(Q, {}),
					Y,
					I("colour") && z && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), z] })
				] }) : /* @__PURE__ */ O(E, { children: [
					/* @__PURE__ */ D(Q, {}),
					Ce.map(R),
					I("marksExtra") && we.map(R),
					/* @__PURE__ */ D(Q, {}),
					Te.map(R),
					I("listsExtra") && Ee.map(R),
					I("indent") && Oe,
					I("colour") && z && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), z] }),
					I("shape") && B && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), B] }),
					/* @__PURE__ */ D(Q, {}),
					Pe,
					I("image") && H,
					I("insert") && Me,
					I("clear") && Ne && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), Ne] })
				] }),
				X.length > 0 && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D(Q, {}), /* @__PURE__ */ O("span", {
					ref: k.wrapRef,
					className: "relative inline-flex",
					children: [/* @__PURE__ */ D("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": `${y}-more`,
						title: "More formatting",
						"aria-label": "More formatting",
						...k.triggerProps,
						className: e(ct, F ? "h-9 min-w-9 rounded-md justify-center" : "min-w-7 justify-center", $(k.open)),
						children: F ? /* @__PURE__ */ D(c, { size: 18 }) : "⋯"
					}), k.open && /* @__PURE__ */ D("span", {
						...k.panelProps,
						"aria-label": "More formatting",
						"data-testid": `${y}-more-panel`,
						className: e(lt, "right-0 flex max-w-[22rem] flex-wrap items-center gap-0.5 p-1"),
						children: X.map((e, t) => t === 0 ? e : [e.key === "zoom" ? /* @__PURE__ */ D("span", {
							"aria-hidden": !0,
							className: "my-1 h-px w-full bg-border"
						}, `d${t}`) : /* @__PURE__ */ D(Q, {}, `d${t}`), e])
					})]
				})] }),
				/* @__PURE__ */ D("span", {
					ref: xe,
					"aria-hidden": !0,
					"data-testid": `${y}-spacer`,
					className: "min-w-0 flex-1"
				}),
				f && de > 0 && !Z || n ? /* @__PURE__ */ O("span", {
					className: "flex shrink-0 items-center gap-1",
					children: [f && de > 0 && !Z && /* @__PURE__ */ D(ot, {
						comments: r,
						suggestions: l,
						visible: d,
						onToggle: f,
						testId: `${y}-gutter-toggle`
					}), /* @__PURE__ */ D(Ae.Provider, {
						value: ve,
						children: n
					})]
				}) : null,
				/* @__PURE__ */ D(ke, {
					trigger: ae,
					open: oe,
					onClose: () => le(!1),
					initialHref: t.getAttributes("link")?.href ?? "",
					onSubmit: (e) => {
						t.chain().focus().setLink({ href: e }).run();
					},
					...t.isActive("link") ? { onRemove: () => {
						t.chain().focus().unsetLink().run();
					} } : {},
					"data-testid": `${y}-link-popover`
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentGutter.tsx
function dt(e, t, n) {
	let r = typeof t == "function" ? t : () => t, i = [...e].sort((e, t) => e.top - t.top), a = /* @__PURE__ */ new Map(), o = -Infinity;
	for (let e of i) {
		let t = Math.max(e.top, o);
		a.set(e.id, t), o = t + r(e.id) + n;
	}
	return a;
}
function ft({ items: t, lead: n, gap: r = 12, estimatedHeight: i = 120, onFocusItem: a, onHoverItem: o, emptyLabel: s = "No comments yet", "data-testid": c = "document-gutter" }) {
	let [l, u] = T({}), d = w(/* @__PURE__ */ new Map());
	pe(() => {
		let e = () => {
			u((e) => {
				let t = !1, n = { ...e };
				for (let [r, i] of d.current) {
					let a = i.offsetHeight;
					a > 0 && Math.abs((e[r] ?? 0) - a) > 1 && (n[r] = a, t = !0);
				}
				return t ? n : e;
			});
		};
		if (e(), typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(e);
		for (let [, e] of d.current) t.observe(e);
		return () => t.disconnect();
	}, [t]);
	let f = t.find((e) => e.active)?.id ?? null;
	C(() => {
		if (!f) return;
		let e = d.current.get(f);
		e && typeof e.scrollIntoView == "function" && e.scrollIntoView({
			block: "nearest",
			behavior: "smooth"
		});
	}, [f]);
	let p = me(() => dt(t, (e) => l[e] ?? i, r), [
		t,
		l,
		i,
		r
	]), m = me(() => {
		let e = 0;
		for (let [t, n] of p) e = Math.max(e, n + (l[t] ?? i));
		return e;
	}, [
		p,
		l,
		i
	]);
	return t.length === 0 ? n ? /* @__PURE__ */ D("div", {
		"data-testid": c,
		className: "w-[280px] shrink-0",
		children: /* @__PURE__ */ D("div", {
			"data-testid": `${c}-lead`,
			children: n
		})
	}) : /* @__PURE__ */ D("div", {
		"data-testid": `${c}-empty`,
		className: "px-3 py-4 text-xs text-text-tertiary",
		children: s
	}) : /* @__PURE__ */ O("div", {
		"data-testid": c,
		className: "w-[280px] shrink-0",
		children: [n && /* @__PURE__ */ D("div", {
			"data-testid": `${c}-lead`,
			className: "mb-3",
			children: n
		}), /* @__PURE__ */ D("div", {
			"data-testid": `${c}-cards`,
			className: "relative",
			style: { height: m },
			children: t.map((t) => /* @__PURE__ */ D("div", {
				"data-testid": `${c}-item-${t.id}`,
				"data-active": String(!!t.active),
				ref: (e) => {
					e ? d.current.set(t.id, e) : d.current.delete(t.id);
				},
				className: "absolute left-0 right-0",
				style: { top: p.get(t.id) ?? t.top },
				children: /* @__PURE__ */ D("div", {
					role: a ? "button" : void 0,
					tabIndex: a ? 0 : void 0,
					onClick: a ? () => a(t.id) : void 0,
					onMouseEnter: o ? () => o(t.id) : void 0,
					onMouseLeave: o ? () => o(null) : void 0,
					onKeyDown: a ? (e) => {
						(e.key === "Enter" || e.key === " ") && (e.preventDefault(), a(t.id));
					} : void 0,
					className: e("rounded-lg border bg-surface p-2 text-left transition-shadow", t.active ? "border-primary shadow-md" : "border-border shadow-sm hover:shadow-md", a && "cursor-pointer"),
					children: t.content
				})
			}, t.id))
		})]
	});
}
//#endregion
//#region src/components/doc-editor/findMatches.ts
function pt(e, t, n = {}) {
	let r = n.caseSensitive ? t : t.toLowerCase();
	if (!e || r.trim().length === 0) return [];
	let i = [];
	return e.descendants((e, t) => {
		if (!e.isText || !e.text) return;
		let a = n.caseSensitive ? e.text : e.text.toLowerCase(), o = a.indexOf(r);
		for (; o !== -1;) i.push({
			from: t + o,
			to: t + o + r.length
		}), o = a.indexOf(r, o + r.length);
	}), i;
}
function mt(e, t, n = 1) {
	if (e.length === 0) return -1;
	if (n === 1) {
		let n = e.findIndex((e) => e.from >= t);
		return n === -1 ? 0 : n;
	}
	for (let n = e.length - 1; n >= 0; n--) if (e[n].from < t) return n;
	return e.length - 1;
}
//#endregion
//#region src/components/doc-editor/DocumentFindBar.tsx
function ht({ editor: t, onClose: n, canReplace: r = !0, focusNonce: i = 0, className: a, "data-testid": o = "find-bar" }) {
	let [s, c] = T(""), [l, u] = T(""), [d, f] = T(0), p = w(null);
	C(() => {
		let e = p.current;
		e && (e.focus(), e.select());
	}, [i]);
	let m = me(() => pt(t?.state.doc, s), [
		t,
		s,
		t?.state.doc
	]), h = x((e) => {
		if (!t || m.length === 0) return;
		let n = (e % m.length + m.length) % m.length, r = m[n];
		f(n), t.chain().focus().setTextSelection({
			from: r.from,
			to: r.to
		}).scrollIntoView().run();
	}, [t, m]), g = x((e) => {
		if (!t || m.length === 0) return;
		let n = t.state.selection.from + +(e === 1);
		h(mt(m, n, e));
	}, [
		t,
		m,
		h
	]), _ = x(() => {
		if (!t || m.length === 0) return;
		let e = m[Math.min(d, m.length - 1)];
		t.chain().focus().setTextSelection({
			from: e.from,
			to: e.to
		}).insertContent(l).run();
	}, [
		t,
		m,
		d,
		l
	]), v = x(() => {
		if (!t || m.length === 0) return;
		let e = t.chain().focus();
		for (let t = m.length - 1; t >= 0; t--) e.setTextSelection({
			from: m[t].from,
			to: m[t].to
		}).insertContent(l);
		e.run();
	}, [
		t,
		m,
		l
	]), ee = (e) => {
		if (e.key === "Escape") {
			e.preventDefault(), n();
			return;
		}
		e.key === "Enter" && (e.preventDefault(), g(e.shiftKey ? -1 : 1));
	}, y = "h-7 rounded border border-border bg-surface px-2 text-xs text-text-primary", b = "h-7 rounded px-2 text-xs cursor-pointer border-none bg-transparent text-text-secondary hover:bg-surface-hover disabled:opacity-40 disabled:cursor-default";
	return /* @__PURE__ */ O("div", {
		"data-testid": o,
		role: "search",
		"aria-label": "Find in document",
		className: e("flex items-center gap-1.5 rounded-lg border border-border bg-surface-panel px-3 py-1.5 shadow-lg", a),
		onKeyDown: ee,
		children: [
			/* @__PURE__ */ D("input", {
				"data-ui-part": "",
				ref: p,
				"data-testid": `${o}-query`,
				"aria-label": "Find",
				placeholder: "Find in document",
				value: s,
				onChange: (e) => {
					c(e.target.value), f(0);
				},
				className: e(y, "w-[180px]")
			}),
			/* @__PURE__ */ D("span", {
				"data-testid": `${o}-count`,
				className: "min-w-[68px] text-[11px] text-text-secondary",
				children: s.trim().length === 0 ? "" : m.length === 0 ? "No results" : `${d + 1} of ${m.length}`
			}),
			/* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${o}-prev`,
				className: b,
				onClick: () => g(-1),
				disabled: m.length === 0,
				"aria-label": "Previous match",
				children: "↑"
			}),
			/* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${o}-next`,
				className: b,
				onClick: () => g(1),
				disabled: m.length === 0,
				"aria-label": "Next match",
				children: "↓"
			}),
			r && /* @__PURE__ */ O(E, { children: [
				/* @__PURE__ */ D("span", {
					"aria-hidden": !0,
					className: "mx-1 h-4 w-px bg-border"
				}),
				/* @__PURE__ */ D("input", {
					"data-ui-part": "",
					"data-testid": `${o}-replacement`,
					"aria-label": "Replace with",
					placeholder: "Replace with",
					value: l,
					onChange: (e) => u(e.target.value),
					className: e(y, "w-[150px]")
				}),
				/* @__PURE__ */ D("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `${o}-replace`,
					className: b,
					onClick: _,
					disabled: m.length === 0,
					children: "Replace"
				}),
				/* @__PURE__ */ D("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": `${o}-replace-all`,
					className: b,
					onClick: v,
					disabled: m.length === 0,
					children: "All"
				})
			] }),
			/* @__PURE__ */ D("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${o}-close`,
				className: e(b, "ml-auto"),
				onClick: n,
				"aria-label": "Close find",
				children: "✕"
			})
		]
	});
}
var gt = 1056, _t = .01;
function vt(e, t) {
	let n = (e % t + t) % t;
	return n <= _t || t - n <= _t ? 0 : t - n;
}
function yt(e, t = {}) {
	let n = t.pageHeight ?? 1056, r = t.contentTop ?? 48, i = t.line ?? 24, a = t.grid ?? 4, o = Math.max(0, t.pageMargin ?? r), s = t.keepLines ?? 2, c = Math.max(0, (t.edgeClearance ?? 12.5) - o), l = Math.max(0, (t.seamClearance ?? 13) - o), u = Array(e.length).fill(0);
	if (!(n > 0) || !(i > 0) || !(a > 0) || e.length === 0) return {
		pushes: u,
		pageCount: 1,
		contentHeight: 0
	};
	let d = (e) => {
		let t = (Math.floor((e + r - o) / n) + 1) * n - r;
		return [t - o, t + o];
	}, f = n - 2 * o - l - c, p = 0, m = 0;
	for (let t = 0; t < e.length; t += 1) {
		let n = e[t], r = n.top + p, h = (e) => {
			u[t] += e, p += e, r += e;
		};
		n.onGrid && h(vt(r, a));
		let g = e[t + 1], _ = n.keepWithNext && g ? Math.max(n.height, g.top - n.top + i) : n.height, v = n.splittable ? r : r - c, ee = n.splittable ? r + _ : r + _ + c, [y, b] = d(v);
		if (y < ee - _t && b > v + _t) {
			if (!n.splittable || o > _t) _ <= f + _t && (h(b + l - r), n.onGrid && h(vt(r, a)));
			else {
				let e = Math.max(1, Math.round(n.height / i)), t = Math.max(0, Math.floor((y - r) / i + _t)), o = e - t;
				t > 0 && t < s && n.height <= f + _t ? (h(b + l - r), n.onGrid && h(vt(r, a))) : o > 0 && o < s && t - (s - o) >= s && h((s - o) * i);
			}
		}
		m = Math.max(m, r + n.height);
	}
	let h = r * 2 + m;
	return {
		pushes: u,
		pageCount: Math.max(1, Math.ceil(h / n - _t / n)),
		contentHeight: m
	};
}
function bt(e, t, n = {}) {
	let r = n.pageHeight ?? 1056;
	if (!(r > 0)) return 1;
	let i = Math.floor(e / r) + 1;
	return Math.min(Math.max(1, i), Math.max(1, t));
}
function xt(e) {
	switch (e.tagName.toUpperCase()) {
		case "P":
		case "UL":
		case "OL":
		case "BLOCKQUOTE": return {
			splittable: !0,
			onGrid: !0
		};
		case "H1":
		case "H2":
		case "H3":
		case "H4":
		case "H5":
		case "H6": return {
			splittable: !1,
			onGrid: !0,
			keepWithNext: !0
		};
		case "PRE": return {
			splittable: !1,
			onGrid: !0
		};
		case "HR": return {
			splittable: !1,
			onGrid: !0
		};
		default: return {
			splittable: !1,
			onGrid: !1
		};
	}
}
//#endregion
//#region src/components/doc-editor/canvas/useCanvasPageFlow.ts
var St = (e) => Math.round(e * 100) / 100;
function Ct(e) {
	let t = e.querySelector(".ProseMirror");
	return t ? Array.from(t.children).filter((e) => e instanceof HTMLElement) : [];
}
function wt(e, t, n, r) {
	let i = Ct(t);
	if (i.length === 0) return 1;
	let a = e.getBoundingClientRect().top, o = n > 0 ? n : 1, s = [], c = 0;
	for (let e of i) {
		let t = e.getBoundingClientRect();
		c += r.get(e) ?? 0, s.push({
			top: (t.top - a) / o - 48 - c,
			height: t.height / o,
			...xt(e)
		});
	}
	let l = yt(s);
	for (let e = 0; e < i.length; e += 1) {
		let t = i[e], n = St(l.pushes[e] ?? 0);
		if (n === St(r.get(t) ?? 0)) continue;
		if (n === 0) {
			t.style.marginTop = "", t.style.removeProperty("--doc-natural-gap"), r.delete(t);
			continue;
		}
		let a = s[e - 1], o = e === 0 ? s[0].top : s[e].top - (a.top + a.height), c = St(Math.max(0, o));
		t.style.setProperty("--doc-natural-gap", `${c}px`), t.style.marginTop = `${St(c + n)}px`, r.set(t, n);
	}
	return l.pageCount;
}
function Tt(e, t, n, r) {
	let [i, a] = T(1), o = w(null);
	o.current === null && (o.current = /* @__PURE__ */ new WeakMap());
	let s = x(() => {
		let e = n.current, t = o.current;
		if (e) for (let n of Ct(e)) t.has(n) && (n.style.marginTop = "", n.style.removeProperty("--doc-natural-gap"), t.delete(n));
	}, [n]), c = x(() => {
		let i = t.current, s = n.current;
		!i || !s || !e || a(wt(i, s, r, o.current));
	}, [
		e,
		t,
		n,
		r
	]);
	return C(() => {
		if (!e) {
			s(), a(1);
			return;
		}
		let t = n.current;
		if (!t) return;
		let r = 0, i = () => {
			r ||= requestAnimationFrame(() => {
				r = 0, c();
			});
		};
		i();
		let o = null;
		typeof MutationObserver < "u" && (o = new MutationObserver(i), o.observe(t, {
			childList: !0,
			subtree: !0,
			characterData: !0
		}));
		let l = null;
		return typeof ResizeObserver < "u" && (l = new ResizeObserver(i), l.observe(t)), t.addEventListener("load", i, !0), () => {
			r && cancelAnimationFrame(r), o?.disconnect(), l?.disconnect(), t.removeEventListener("load", i, !0);
		};
	}, [
		e,
		c,
		s,
		n
	]), {
		pageCount: i,
		remeasure: c
	};
}
//#endregion
//#region src/components/doc-editor/canvas/readingContents.ts
function Et(e) {
	let t = e[0]?.level === 1 ? e.slice(1) : e, n = [], r = [];
	return t.map((e) => {
		for (; n.length && n[n.length - 1] > e.level;) n.pop(), r.pop();
		return n[n.length - 1] !== e.level && (n.push(e.level), r.push(0)), r[r.length - 1] += 1, {
			...e,
			number: r.join(".")
		};
	});
}
function Dt(e) {
	let t = 0, n = !1;
	return e.forEach((e, r, i) => {
		n || e.type.name === "heading" && (i !== 0 || e.attrs.level !== 1) && (t = r, n = !0);
	}), n ? t : e.content.size;
}
function Ot(e) {
	return A.create({
		name: "readingContents",
		addProseMirrorPlugins() {
			return [new ve({
				key: new ye("readingContents"),
				props: { decorations(t) {
					let n = [];
					t.doc.descendants((e, t) => {
						e.type.name === "heading" && n.push({
							id: String(t),
							text: e.textContent,
							level: e.attrs.level
						});
					});
					let r = Et(n);
					if (!r.length) return M.empty;
					let i = r.map((e) => {
						let n = Number(e.id), r = t.doc.nodeAt(n);
						return j.node(n, n + r.nodeSize, { "data-reading-number": e.number });
					});
					return i.push(j.widget(Dt(t.doc), () => e, {
						side: -1,
						key: "reading-contents",
						ignoreSelection: !0
					})), M.create(t.doc, i);
				} }
			})];
		}
	});
}
//#endregion
//#region src/components/doc-editor/CanvasDocumentView.tsx
var kt = 16, At = gt, jt = 816, Mt = {
	base: 16,
	sm: 48
}, Nt = 640, Pt = {
	base: 12,
	sm: 24
}, Ft = 280, It = 220;
function Lt(e, t, n) {
	let r = n ? Mt.base : Mt.sm, i = n ? Pt.base : Pt.sm, a = (e ? Ft : 0) + (t ? It : 0), o = e || t ? i * 2 : 0;
	return r + a + o;
}
var Rt = .25, zt = 4, Bt = (e) => Math.min(zt, Math.max(Rt, e)), Vt = "uic:canvas-document:zoom";
function Ht() {
	if (typeof window > "u") return 1;
	try {
		let e = window.localStorage.getItem(Vt);
		if (e === null) return 1;
		if (e === "fit") return "fit";
		let t = Number(e);
		return Number.isFinite(t) && t >= Rt && t <= zt ? t : 1;
	} catch {
		return 1;
	}
}
function Ut(e, t) {
	return {
		...e === 1 ? {} : { zoom: e },
		...t === null ? {} : { minHeight: t }
	};
}
function Wt({ isCanvas: r, body: i, ydoc: a, provider: o, user: s, editable: c = !0, extensions: l, onConvert: u, convertSlot: d = null, unsupported: f = [], schemaProbe: p, header: m, belowRuler: h, toolbarActions: g, gutterItems: v, gutterLead: ee, onFocusGutterItem: y, onHoverGutterItem: te, gutterVisible: ne = !0, showRuler: re = !0, toolbarDensity: ie = "full", showStatusBar: ae = !0, zoomMode: oe = "remembered", initialZoom: se, toolbarStyle: ce = "bar", pageMargin: ue = "normal", onDocumentStats: de, fitHeight: S = "viewport", showOutline: fe = !1, paginate: pe = !0, readingPresentation: ge = "page", readingNavigation: k = !1, onToggleGutter: _e, renderFrame: A, onInsertImage: ve, onEditorReady: ye, "data-testid": j = "canvas-document" }) {
	let M = !c && ge === "pane", N = pe && !M, P = fe && !M, be = re && !M, F = me(() => {
		let e = 0, t = 0;
		for (let n of v ?? []) n.kind === "suggestion" ? t += 1 : e += 1;
		return {
			comments: e,
			suggestions: t,
			total: e + t
		};
	}, [v]), L = (F.total > 0 || !!ee) && ne, [Ce, Ee] = T(() => se == null ? Ht() : Bt(se)), Oe = oe === "fit" ? "fit" : Ce, z = x((e) => {
		try {
			window.localStorage.setItem(Vt, String(e));
		} catch {}
	}, []), ke = x((e) => {
		Ee(e), z(e);
	}, [z]), B = x(() => {
		Ee("fit"), z("fit");
	}, [z]), V = w(null), Ae = w(null), [je, Me] = T(1);
	C(() => {
		let e = V.current;
		if (!e) return;
		let t = () => {
			let t = window.innerWidth < Nt, n = e.clientWidth - Lt(L, P, t);
			Me(Bt(Math.floor(n / jt * 100) / 100));
		};
		if (t(), typeof ResizeObserver > "u") return window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
		let n = new ResizeObserver(t);
		return n.observe(e), () => n.disconnect();
	}, [
		L,
		P,
		r,
		i
	]);
	let H = M ? 1 : Oe === "fit" ? je : Oe, Ne = Oe === "fit";
	C(() => {
		let e = V.current;
		if (!e) return;
		let t = () => {
			let t = Ae.current ? Math.round(Ae.current.getBoundingClientRect().height) : 0;
			e.style.setProperty("--uic-canvas-toolbar-h", `${t}px`);
		};
		t();
		let n = typeof ResizeObserver < "u" ? new ResizeObserver(t) : null;
		return n && (n.observe(e), Ae.current && n.observe(Ae.current)), () => n?.disconnect();
	});
	let Pe = w(null), [Fe, Ie] = T(null), Le = x(() => {
		let e = Pe.current;
		e && Ie(e.getBoundingClientRect().width);
	}, []);
	C(() => {
		Le();
		let e = Pe.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(Le);
		return t.observe(e), () => t.disconnect();
	}, [Le, H]);
	let Re = w(null), { pageCount: U } = Tt(N, Pe, Re, H), [ze, Be] = T(null);
	C(() => {
		let e = V.current;
		if (S === "parent") {
			Be(null);
			return;
		}
		if (!e || typeof window > "u") return;
		let t = () => {
			let t = e.getBoundingClientRect().top + window.scrollY;
			Be(Math.max(320, window.innerHeight - t - kt));
		};
		return t(), window.addEventListener("resize", t), () => window.removeEventListener("resize", t);
	}, [
		r,
		i,
		S
	]);
	let [Ve, He] = T(1);
	C(() => {
		if (!N) {
			He(1);
			return;
		}
		let e = V.current;
		if (!e) return;
		let t = 0, n = () => {
			t = 0;
			let n = Pe.current;
			if (!n) return;
			let r = (e.getBoundingClientRect().top - n.getBoundingClientRect().top) / (H > 0 ? H : 1);
			He(bt(r, U));
		}, r = () => {
			t ||= requestAnimationFrame(n);
		};
		return n(), e.addEventListener("scroll", r, { passive: !0 }), () => {
			t && cancelAnimationFrame(t), e.removeEventListener("scroll", r);
		};
	}, [
		N,
		H,
		U
	]);
	let [Ue, We] = T(!1), [W, G] = T(0);
	C(() => {
		let e = (e) => {
			(e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f" && (e.preventDefault(), We(!0), G((e) => e + 1));
		}, t = V.current;
		return t?.addEventListener("keydown", e), () => t?.removeEventListener("keydown", e);
	}, [r, i]);
	let [Ge, Ke] = T(!1), [K, q] = T(null), [J, qe] = T(null), Y = Te(J), X = Et(Y.entries), Z = me(() => {
		if (typeof document > "u") return null;
		let e = document.createElement("div");
		return e.dataset.readingContents = "", e.contentEditable = "false", e;
	}, []), Je = me(() => k && !c && Z ? [...l, Ot(Z)] : l, [
		l,
		k,
		c,
		Z
	]), [Ye, Xe] = T({});
	C(() => {
		if (!k || !N || !J) return;
		let e = 0, t = () => {
			e = 0;
			let t = Pe.current;
			if (!t) return;
			let n = t.getBoundingClientRect().top, r = {};
			for (let e of Y.entries) {
				let t = we(J, e.id);
				t && (r[e.id] = Math.max(1, Math.floor((t.getBoundingClientRect().top - n) / H / At) + 1));
			}
			Xe((e) => JSON.stringify(e) === JSON.stringify(r) ? e : r);
		}, n = () => {
			e ||= requestAnimationFrame(t);
		};
		n();
		let r = Re.current, i = typeof MutationObserver > "u" ? null : new MutationObserver(n), a = typeof ResizeObserver > "u" ? null : new ResizeObserver(n);
		return r && (i?.observe(r, {
			subtree: !0,
			childList: !0,
			characterData: !0,
			attributes: !0,
			attributeFilter: ["style"]
		}), a?.observe(r)), () => {
			e && cancelAnimationFrame(e), i?.disconnect(), a?.disconnect();
		};
	}, [
		k,
		N,
		J,
		Y.entries,
		U,
		H
	]);
	let Ze = w(null), [Qe, $e] = T(null), et = (e) => {
		let t = we(J, e), n = V.current;
		!(t instanceof HTMLElement) || !n || (t.tabIndex = -1, t.focus({ preventScroll: !0 }), n.scrollTo({
			top: n.scrollTop + t.getBoundingClientRect().top - n.getBoundingClientRect().top - 16,
			behavior: "smooth"
		}), $e(e));
	}, tt = () => {
		V.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		}), Ze.current?.focus({ preventScroll: !0 }), $e(null);
	};
	C(() => {
		let e = V.current;
		if (!k || c || !J || !e) return;
		let t, n = () => {
			let t = Et(Y.entries), n = e.getBoundingClientRect().top + 32, r = e.scrollTop > 0 && e.scrollTop + e.clientHeight >= e.scrollHeight - 2 ? t.at(-1) : t.filter((e) => {
				let t = we(J, e.id);
				return t && t.getBoundingClientRect().top <= n;
			}).at(-1);
			$e(r?.id ?? null);
		}, r = () => {
			clearTimeout(t), t = setTimeout(n, 120);
		};
		return e.addEventListener("scroll", r, { passive: !0 }), () => {
			clearTimeout(t), e.removeEventListener("scroll", r);
		};
	}, [
		k,
		c,
		J,
		Y.entries
	]);
	let nt = De(J), rt = ue === "narrow" ? 72 : 96, it = me(() => ae || oe === "fit" ? null : {
		zoom: H,
		fitActive: Ne,
		steps: I,
		onZoomChange: ke,
		onFitWidth: B
	}, [
		ae,
		oe,
		H,
		Ne,
		ke,
		B
	]), Q = w(de);
	Q.current = de;
	let at = N ? U : null;
	C(() => {
		Q.current?.({
			wordCount: nt,
			pageCount: at
		});
	}, [nt, at]);
	let [ot, st] = T(0);
	C(() => {
		if (!J) {
			st(0);
			return;
		}
		let e = () => {
			let e = J.state?.selection;
			if (!e || e.empty) {
				st(0);
				return;
			}
			let t = J.state.doc.textBetween(e.from, e.to, " ", " ");
			st(t.trim().split(/\s+/).filter(Boolean).length);
		};
		if (e(), typeof J.on == "function" && typeof J.off == "function") return J.on("selectionUpdate", e), J.on("update", e), () => {
			J.off("selectionUpdate", e), J.off("update", e);
		};
	}, [J]);
	let ct = async () => {
		if (!(!u || Ge)) {
			Ke(!0), q(null);
			try {
				let e = await u();
				e && q(e);
			} catch (e) {
				q(e instanceof Error ? e.message : String(e));
			} finally {
				Ke(!1);
			}
		}
	}, $ = !!A, lt = c && J ? /* @__PURE__ */ O("div", {
		ref: $ ? void 0 : Ae,
		"data-testid": `${j}-toolbar`,
		className: $ ? "min-w-0" : "sticky top-0 z-20",
		children: [/* @__PURE__ */ D("div", {
			className: $ ? void 0 : ce === "card" ? "bg-workspace px-[var(--dock-inset,1rem)] pb-2 pt-2" : "border-b border-border bg-surface-panel",
			children: /* @__PURE__ */ D("div", {
				className: $ ? "w-full" : ce === "card" ? "w-full rounded-lg border border-border bg-surface shadow-sm" : "w-full px-3",
				"data-toolbar-style": ce,
				children: /* @__PURE__ */ D(ut, {
					density: ie,
					...ce === "card" ? { extras: "overflow" } : {},
					editor: J,
					actions: g,
					commentCount: F.comments,
					suggestionCount: F.suggestions,
					gutterVisible: ne,
					..._e ? { onToggleGutter: _e } : {},
					...ve ? { onInsertImage: ve } : {},
					...it ? { zoomControl: it } : {}
				})
			})
		}), Ue && /* @__PURE__ */ D("div", {
			"data-testid": `${j}-find-row`,
			className: $ ? "flex justify-end pt-2" : "flex justify-end bg-workspace px-[var(--dock-inset,1rem)] pb-2 pt-2",
			children: /* @__PURE__ */ D(ht, {
				editor: J,
				canReplace: c,
				focusNonce: W,
				onClose: () => {
					We(!1), J.commands.focus();
				},
				"data-testid": `${j}-find`
			})
		})]
	}) : null, dt = be ? /* @__PURE__ */ O("div", {
		"data-testid": `${j}-ruler-row`,
		className: e("flex px-2 sm:px-6", $ ? "pt-1" : c && J && ce === "card" ? "pt-0" : "pt-3", (L || P) && "gap-3 sm:gap-6"),
		children: [
			L && !P && /* @__PURE__ */ D("div", {
				"aria-hidden": !0,
				className: "flex-1 max-w-[280px]"
			}),
			P && /* @__PURE__ */ D("div", {
				"aria-hidden": !0,
				className: "w-[220px] shrink-0"
			}),
			/* @__PURE__ */ D(xe, {
				...Fe ? { pageWidth: Fe / H } : {},
				marginLeft: rt,
				marginRight: rt,
				zoom: H,
				className: "mx-auto shrink-0",
				style: Fe === null ? void 0 : { width: Fe }
			}),
			L && /* @__PURE__ */ D("div", {
				"aria-hidden": !0,
				className: "w-[280px] shrink-0"
			}),
			P && !L && /* @__PURE__ */ D("div", {
				"aria-hidden": !0,
				className: "flex-1 max-w-[280px]"
			})
		]
	}) : null, pt = /* @__PURE__ */ O("div", {
		"data-testid": j,
		"data-fit-height": S,
		className: e("flex flex-col gap-3", S === "parent" && "h-full min-h-0"),
		children: [
			m,
			f.length > 0 && /* @__PURE__ */ D(_, {
				variant: "warning",
				title: "Some content could not be represented",
				"data-testid": `${j}-unsupported`,
				children: /* @__PURE__ */ O("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [f.map((e, t) => /* @__PURE__ */ D(n, {
						tone: "warning",
						size: "xs",
						children: e.kind
					}, `${e.kind}-${t}`)), /* @__PURE__ */ D("span", { children: "— kept on the page as text so nothing was lost." })]
				})
			}),
			K && /* @__PURE__ */ D(_, {
				variant: "error",
				title: "Could not convert",
				"data-testid": `${j}-convert-error`,
				children: K
			}),
			k && !c && Z && he(/* @__PURE__ */ O("div", {
				ref: Ze,
				tabIndex: -1,
				"data-testid": `${j}-contents`,
				className: "doc-reading-contents",
				children: [/* @__PURE__ */ D("p", {
					className: "doc-reading-contents-title",
					children: "Contents"
				}), /* @__PURE__ */ D("nav", {
					"aria-label": "Document contents",
					children: X.map((e) => /* @__PURE__ */ O("button", {
						"data-ui-part": "",
						type: "button",
						className: "doc-reading-contents-entry",
						"data-depth": e.number.split(".").length,
						"aria-current": Qe === e.id ? "location" : void 0,
						onClick: () => et(e.id),
						children: [
							/* @__PURE__ */ O("span", {
								className: "doc-reading-section-number",
								children: [e.number, "."]
							}),
							/* @__PURE__ */ D("span", {
								className: "doc-reading-contents-label",
								children: e.text
							}),
							N && /* @__PURE__ */ O(E, { children: [/* @__PURE__ */ D("span", {
								className: "doc-reading-leader",
								"aria-hidden": "true"
							}), /* @__PURE__ */ D("span", {
								className: "doc-reading-page-number",
								"aria-label": `Page ${Ye[e.id] ?? 1}`,
								children: Ye[e.id] ?? 1
							})] })
						]
					}, e.id))
				})]
			}), Z),
			r && i ? /* @__PURE__ */ O("div", {
				"data-testid": `${j}-workspace`,
				ref: V,
				"data-reading-presentation": M ? "pane" : "page",
				className: e("@container rounded-lg bg-workspace overflow-y-auto overflow-x-auto", S === "parent" && "min-h-0 flex-1"),
				style: S === "parent" || ze === null ? void 0 : { height: ze },
				children: [
					!$ && lt,
					!$ && dt,
					h != null && h !== !1 && /* @__PURE__ */ D("div", {
						"data-testid": `${j}-below-ruler`,
						className: "sticky top-[var(--uic-canvas-toolbar-h,0px)] z-10 bg-workspace px-2 pt-2 pb-1 sm:px-6",
						children: h
					}),
					/* @__PURE__ */ O("div", {
						"data-testid": `${j}-page-row`,
						"data-gutter": L ? "visible" : "hidden",
						className: e(M ? "flex px-2 pb-4" : "flex px-2 pb-4 sm:px-6 sm:pb-8", M ? "pt-3" : be ? "pt-2 sm:pt-3" : "pt-4 sm:pt-8", (L || P) && "gap-3 sm:gap-6"),
						children: [
							L && !P && /* @__PURE__ */ D("div", {
								"aria-hidden": !0,
								"data-testid": `${j}-rail-spacer`,
								className: "flex-1 max-w-[280px]"
							}),
							P && /* @__PURE__ */ D("aside", {
								"data-testid": `${j}-outline`,
								className: "w-[220px] shrink-0 self-start sticky top-4",
								children: /* @__PURE__ */ D(Se, {
									entries: Y.entries,
									activeId: Y.activeId,
									onSelect: Y.goTo
								})
							}),
							/* @__PURE__ */ D("div", {
								ref: Pe,
								"data-testid": `${j}-paper`,
								"data-page-count": N ? String(U) : void 0,
								style: Ut(H, N ? U * At : null),
								className: e("doc-page @container mx-auto bg-paper text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]", N && "doc-page--paginated", k && !c && "doc-page--reading", !M && "min-h-[1056px]", M ? "w-full min-w-0" : H === 1 ? "w-full max-w-[816px]" : "w-[816px] shrink-0"),
								children: /* @__PURE__ */ D("div", {
									ref: Re,
									"data-testid": `${j}-body`,
									role: "document",
									"aria-label": "Document content",
									className: e("doc-page__body", M ? "px-5 py-6" : "py-8 sm:py-10 lg:py-12", !M && (ue === "narrow" ? "px-[8.82cqi]" : "px-[11.76cqi]")),
									children: /* @__PURE__ */ D(le, {
										fragment: i,
										ydoc: a,
										provider: o,
										user: s,
										editable: c,
										extensions: Je,
										placeholder: "Start writing…",
										chrome: "none",
										hideToolbar: !0,
										onEditorReady: (e) => {
											qe(e), ye?.(e);
										}
									})
								})
							}),
							L && /* @__PURE__ */ D(ft, {
								items: v ?? [],
								lead: ee,
								onFocusItem: y,
								onHoverItem: te,
								"data-testid": `${j}-gutter`
							}),
							P && !L && /* @__PURE__ */ D("div", {
								"aria-hidden": !0,
								"data-testid": `${j}-rail-spacer`,
								className: "flex-1 max-w-[280px]"
							})
						]
					}),
					ae && /* @__PURE__ */ O(R, {
						className: "sticky bottom-0 z-10",
						wordCount: nt,
						zoom: H,
						onZoomChange: M || oe === "fit" ? void 0 : ke,
						fitActive: Ne,
						onFitWidth: B,
						"data-testid": `${j}-status-bar`,
						children: [
							k && !c && X.length > 0 && /* @__PURE__ */ D(Se, {
								entries: X,
								activeId: Qe,
								onSelect: et,
								presentation: "controls",
								compact: !0,
								onContents: tt,
								"aria-label": "Document section navigation",
								"data-testid": `${j}-section-navigation`
							}),
							ot > 0 && /* @__PURE__ */ D("span", {
								"data-testid": `${j}-selected-word-count`,
								className: "tabular-nums",
								children: ot === 1 ? "1 selected" : `${ot.toLocaleString()} selected`
							}),
							N && /* @__PURE__ */ D("span", {
								"data-testid": `${j}-page-count`,
								className: "tabular-nums",
								title: "Approximate. Pages are counted as this view lays them out, and a printed copy may run shorter — the screen never splits a paragraph or an image across a page break.",
								children: U === 1 ? "1 page" : `Page ${Ve} of ${U}`
							})
						]
					})
				]
			}) : /* @__PURE__ */ O(E, { children: [u && d ? he(/* @__PURE__ */ D(t, {
				size: "sm",
				variant: "secondary",
				onClick: ct,
				disabled: Ge,
				"data-testid": `${j}-convert`,
				title: "Convert this sectioned document into a single page. Your sections become headings; nothing is deleted.",
				children: Ge ? "Converting…" : "Convert to page"
			}), d) : /* @__PURE__ */ D(b, {
				testId: `${j}-convert-prompt`,
				title: "This document still uses sections",
				description: "Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted.",
				action: u ? /* @__PURE__ */ D(t, {
					onClick: ct,
					disabled: Ge,
					"data-testid": `${j}-convert`,
					children: Ge ? "Converting…" : "Convert to page"
				}) : void 0
			}), u && p && /* @__PURE__ */ D("div", {
				hidden: !0,
				"aria-hidden": "true",
				"data-testid": `${j}-schema-probe`,
				children: /* @__PURE__ */ D(le, {
					fragment: p,
					ydoc: a,
					provider: null,
					user: s,
					editable: !1,
					extensions: Je,
					chrome: "none",
					hideToolbar: !0,
					onEditorReady: (e) => ye?.(e)
				})
			})] })
		]
	});
	return A ? /* @__PURE__ */ D(E, { children: A({
		toolbar: lt,
		ruler: dt,
		surface: pt
	}) }) : pt;
}
//#endregion
//#region src/components/doc-editor/AuthenticatedDocumentImage.tsx
var Gt = (e) => e.startsWith("/api/uploads/"), Kt = de(null);
function qt({ children: e, ...t }) {
	return /* @__PURE__ */ D(Kt.Provider, {
		value: t,
		children: e
	});
}
function Jt({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = S(Kt), o = a?.loadImage, s = a?.requiresAuthentication ?? Gt, [c, l] = T(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
	return C(() => {
		if (!n || !u) return;
		let e = new AbortController(), t = null;
		return l(null), (async () => {
			try {
				if (!o) throw Error("Document image authentication is not configured");
				let r = await o(n, e.signal);
				if (e.signal.aborted) return;
				t = URL.createObjectURL(r), l({
					src: n,
					loader: o,
					url: t,
					failed: !1
				});
			} catch {
				e.signal.aborted || l({
					src: n,
					loader: o,
					url: null,
					failed: !0
				});
			}
		})(), () => {
			e.abort(), t && URL.revokeObjectURL(t);
		};
	}, [
		n,
		u,
		o
	]), /* @__PURE__ */ D(ge, {
		as: "div",
		"data-testid": "canvas-document-image",
		"data-image-state": p ? "failed" : f ? "ready" : "loading",
		children: f && !p ? /* @__PURE__ */ D("img", {
			src: f,
			alt: r,
			...i ? { title: i } : {},
			className: t ? "ProseMirror-selectednode" : void 0,
			draggable: !1
		}) : /* @__PURE__ */ D("span", {
			className: p ? "text-sm italic text-danger-fg" : "text-sm italic text-text-tertiary",
			"data-testid": "canvas-document-image-fallback",
			children: p ? `Could not load ${r || "image"}` : "Loading image…"
		})
	});
}
function Yt(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return k(Jt);
	} });
}
//#endregion
//#region src/integrations/realtime-modules/useDocumentImageUpload.ts
var Xt = 10485760, Zt = 26214400;
function Qt(e) {
	return e.type.startsWith("image/") && e.size > 0 && e.size <= 10485760;
}
function $t(e, t, n, r = 6e4) {
	let i = w(/* @__PURE__ */ new Map()), a = w(/* @__PURE__ */ new Map()), o = w(0), s = w(0), { upload: c } = n(e ? `doc:${e}` : "doc:pending", {
		displayName: t,
		previewMaxEdge: 0,
		onComplete: (e) => {
			if (!e.mine) return;
			let t = i.current.get(e.transferId);
			t ? (i.current.delete(e.transferId), clearTimeout(t.timer), e.downloadUrl ? t.resolve(e.downloadUrl) : t.reject(/* @__PURE__ */ Error("Upload finished without a download URL"))) : o.current > 0 && (a.current.set(e.transferId, e), a.current.size > 64 && a.current.delete(a.current.keys().next().value));
		}
	});
	C(() => () => {
		s.current++;
		for (let e of i.current.values()) clearTimeout(e.timer), e.reject(/* @__PURE__ */ Error("Document changed before the upload completed"));
		i.current.clear(), a.current.clear();
	}, [e]);
	let l = x(async (t) => {
		if (!e) throw Error("This document is not ready for uploads yet");
		let n = s.current;
		o.current++;
		try {
			let e = await c(t);
			if (s.current !== n) throw Error("Document changed before the upload completed");
			if (e.status === "failed") throw Error(e.error || `Could not upload ${t.name}`);
			let o = e.transferId;
			if (!o) throw Error("Upload returned no transfer id — the gateway never issued one");
			let l = a.current.get(o);
			if (a.current.delete(o), l) {
				if (!l.downloadUrl) throw Error("Upload finished without a download URL");
				return l.downloadUrl;
			}
			return await new Promise((e, n) => {
				let a = setTimeout(() => {
					i.current.delete(o), n(/* @__PURE__ */ Error(`Upload timed out: ${t.name}`));
				}, r);
				i.current.set(o, {
					resolve: e,
					reject: n,
					timer: a
				});
			});
		} finally {
			o.current--, o.current === 0 && a.current.clear();
		}
	}, [
		e,
		c,
		r
	]);
	return {
		uploadImage: x(async (e) => {
			if (!e.type.startsWith("image/")) throw Error(`${e.name} is not an image`);
			if (e.size === 0) throw Error(`${e.name} is empty`);
			if (e.size > 10485760) throw Error(`${e.name} is larger than ${Xt / 1024 / 1024}MB`);
			return l(e);
		}, [l]),
		uploadFile: x(async (e) => {
			if (e.size === 0) throw Error(`${e.name} is empty`);
			if (e.size > 26214400) throw Error(`${e.name} is larger than ${Zt / 1024 / 1024}MB`);
			return {
				url: await l(e),
				name: e.name,
				size: e.size,
				type: e.type
			};
		}, [l]),
		accepts: Qt
	};
}
//#endregion
export { Se as C, I as S, N as T, Pe as _, Jt as a, R as b, Wt as c, mt as d, ft as f, V as g, ut as h, $t as i, ht as l, B as m, Xt as n, qt as o, dt as p, Qt as r, Yt as s, Zt as t, pt as u, Ce as v, xe as w, L as x, Te as y };
