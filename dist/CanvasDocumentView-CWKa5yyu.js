import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./Banner-BLOg1hC_.js";
import { t as r } from "./Chip-YhQI5B9P.js";
import { t as i } from "./EmptyState-ClmWoqCb.js";
import { t as a } from "./Select-CqVokE2v.js";
import { t as o } from "./TiptapEditor-CnjifOQz.js";
import { useCallback as s, useLayoutEffect as c, useMemo as l, useRef as u, useState as d } from "react";
import { Fragment as f, jsx as p, jsxs as m } from "react/jsx-runtime";
import { useEditorState as h } from "@tiptap/react";
//#region src/components/doc-editor/DocumentToolbar.tsx
var g = [
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
function _(e) {
	return e.isActive("heading", { level: 1 }) ? "heading1" : e.isActive("heading", { level: 2 }) ? "heading2" : e.isActive("heading", { level: 3 }) ? "heading3" : e.isActive("blockquote") ? "blockquote" : e.isActive("codeBlock") ? "codeBlock" : "paragraph";
}
function v(e, t) {
	return typeof e.commands[t] == "function";
}
var y = [
	{
		key: "bold",
		label: "B",
		hint: "Bold  **text**",
		run: (e) => {
			e.chain().focus().toggleBold().run();
		},
		active: (e) => e.isActive("bold")
	},
	{
		key: "italic",
		label: "I",
		hint: "Italic  *text*",
		run: (e) => {
			e.chain().focus().toggleItalic().run();
		},
		active: (e) => e.isActive("italic")
	},
	{
		key: "underline",
		label: "U",
		hint: "Underline",
		run: (e) => {
			e.chain().focus().toggleUnderline().run();
		},
		active: (e) => e.isActive("underline")
	},
	{
		key: "strike",
		label: "S",
		hint: "Strikethrough  ~~text~~",
		run: (e) => {
			e.chain().focus().toggleStrike().run();
		},
		active: (e) => e.isActive("strike")
	},
	{
		key: "code",
		label: "</>",
		hint: "Inline code  `text`",
		run: (e) => {
			e.chain().focus().toggleCode().run();
		},
		active: (e) => e.isActive("code")
	}
], b = [
	{
		key: "bulletList",
		label: "•",
		hint: "Bulleted list  - item",
		run: (e) => {
			e.chain().focus().toggleBulletList().run();
		},
		active: (e) => e.isActive("bulletList")
	},
	{
		key: "orderedList",
		label: "1.",
		hint: "Numbered list  1. item",
		run: (e) => {
			e.chain().focus().toggleOrderedList().run();
		},
		active: (e) => e.isActive("orderedList")
	},
	{
		key: "taskList",
		label: "☑",
		hint: "Task list  - [ ] item",
		run: (e) => {
			e.chain().focus().toggleTaskList().run();
		},
		active: (e) => e.isActive("taskList")
	}
];
function x({ btn: t, editor: n, testId: r, active: i }) {
	return /* @__PURE__ */ p("button", {
		type: "button",
		"data-testid": r,
		title: t.hint,
		"aria-label": t.hint,
		"aria-pressed": i,
		onMouseDown: (e) => {
			e.preventDefault(), t.run(n);
		},
		className: e("min-w-7 h-7 px-1.5 rounded text-xs font-semibold cursor-pointer border-none", i ? "bg-primary text-white" : "bg-transparent text-text-secondary hover:bg-surface-hover"),
		children: t.label
	});
}
function S() {
	return /* @__PURE__ */ p("span", {
		"aria-hidden": !0,
		className: "mx-1 h-5 w-px self-center bg-border"
	});
}
function C({ editor: e, actions: t, "data-testid": n = "document-toolbar" }) {
	let r = h({
		editor: e,
		selector: ({ editor: e }) => {
			if (!e) return null;
			let t = {};
			for (let n of [...y, ...b]) t[n.key] = n.active(e);
			t.link = e.isActive("link"), t.highlight = e.isActive("highlight");
			for (let n of [
				"left",
				"center",
				"right"
			]) t[`align-${n}`] = e.isActive({ textAlign: n });
			return {
				block: _(e),
				flags: t
			};
		}
	}), i = s((t) => {
		if (!e) return;
		let n = e.chain().focus();
		switch (t) {
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
	}, [e]);
	return e ? /* @__PURE__ */ m("div", {
		"data-testid": n,
		role: "toolbar",
		"aria-label": "Document formatting",
		className: "flex flex-wrap items-center gap-0.5 px-2 py-1.5",
		children: [
			/* @__PURE__ */ p(x, {
				btn: {
					key: "undo",
					label: "↶",
					hint: "Undo",
					run: (e) => {
						e.chain().focus().undo().run();
					},
					active: () => !1
				},
				editor: e,
				active: !1,
				testId: `${n}-undo`
			}),
			/* @__PURE__ */ p(x, {
				btn: {
					key: "redo",
					label: "↷",
					hint: "Redo",
					run: (e) => {
						e.chain().focus().redo().run();
					},
					active: () => !1
				},
				editor: e,
				active: !1,
				testId: `${n}-redo`
			}),
			/* @__PURE__ */ p(S, {}),
			/* @__PURE__ */ p(a, {
				size: "sm",
				"data-testid": `${n}-block`,
				"aria-label": "Text style",
				value: r?.block ?? "paragraph",
				options: g,
				onChange: (e) => i(e.target.value),
				className: "w-[140px]"
			}),
			/* @__PURE__ */ p(S, {}),
			y.map((t) => /* @__PURE__ */ p(x, {
				btn: t,
				editor: e,
				active: r?.flags[t.key] ?? !1,
				testId: `${n}-${t.key}`
			}, t.key)),
			/* @__PURE__ */ p(S, {}),
			b.map((t) => /* @__PURE__ */ p(x, {
				btn: t,
				editor: e,
				active: r?.flags[t.key] ?? !1,
				testId: `${n}-${t.key}`
			}, t.key)),
			v(e, "toggleHighlight") && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(S, {}), /* @__PURE__ */ p(x, {
				btn: {
					key: "highlight",
					label: "🖍",
					hint: "Highlight",
					run: (e) => {
						e.chain().focus().toggleHighlight().run();
					},
					active: (e) => e.isActive("highlight")
				},
				editor: e,
				active: r?.flags.highlight ?? !1,
				testId: `${n}-highlight`
			})] }),
			v(e, "setTextAlign") && /* @__PURE__ */ m(f, { children: [/* @__PURE__ */ p(S, {}), [
				"left",
				"center",
				"right"
			].map((t) => /* @__PURE__ */ p(x, {
				btn: {
					key: `align-${t}`,
					label: t === "left" ? "⯇" : t === "center" ? "≡" : "⯈",
					hint: `Align ${t}`,
					run: (e) => {
						e.chain().focus().setTextAlign(t).run();
					},
					active: (e) => e.isActive({ textAlign: t })
				},
				editor: e,
				active: r?.flags[`align-${t}`] ?? !1,
				testId: `${n}-align-${t}`
			}, t))] }),
			/* @__PURE__ */ p(S, {}),
			/* @__PURE__ */ p(x, {
				btn: {
					key: "link",
					label: "🔗",
					hint: "Link  [text](url)",
					run: (e) => {
						if (e.isActive("link")) {
							e.chain().focus().unsetLink().run();
							return;
						}
						let t = e.getAttributes("link")?.href ?? "", n = typeof window > "u" ? null : window.prompt("Link URL", t);
						if (n !== null) {
							if (n === "") {
								e.chain().focus().unsetLink().run();
								return;
							}
							e.chain().focus().setLink({ href: n }).run();
						}
					},
					active: (e) => e.isActive("link")
				},
				editor: e,
				active: r?.flags.link ?? !1,
				testId: `${n}-link`
			}),
			/* @__PURE__ */ p(x, {
				btn: {
					key: "hr",
					label: "—",
					hint: "Divider  ---",
					run: (e) => {
						e.chain().focus().setHorizontalRule().run();
					},
					active: () => !1
				},
				editor: e,
				active: !1,
				testId: `${n}-hr`
			}),
			t && /* @__PURE__ */ p("span", {
				className: "ml-auto flex items-center gap-1",
				children: t
			})
		]
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentGutter.tsx
function w(e, t, n) {
	let r = typeof t == "function" ? t : () => t, i = [...e].sort((e, t) => e.top - t.top), a = /* @__PURE__ */ new Map(), o = -Infinity;
	for (let e of i) {
		let t = Math.max(e.top, o);
		a.set(e.id, t), o = t + r(e.id) + n;
	}
	return a;
}
function T({ items: t, gap: n = 12, estimatedHeight: r = 120, onFocusItem: i, emptyLabel: a = "No comments yet", "data-testid": o = "document-gutter" }) {
	let [s, f] = d({}), m = u(/* @__PURE__ */ new Map());
	c(() => {
		let e = () => {
			f((e) => {
				let t = !1, n = { ...e };
				for (let [r, i] of m.current) {
					let a = i.offsetHeight;
					a > 0 && Math.abs((e[r] ?? 0) - a) > 1 && (n[r] = a, t = !0);
				}
				return t ? n : e;
			});
		};
		if (e(), typeof ResizeObserver > "u") return;
		let t = new ResizeObserver(e);
		for (let [, e] of m.current) t.observe(e);
		return () => t.disconnect();
	}, [t]);
	let h = l(() => w(t, (e) => s[e] ?? r, n), [
		t,
		s,
		r,
		n
	]), g = l(() => {
		let e = 0;
		for (let [t, n] of h) e = Math.max(e, n + (s[t] ?? r));
		return e;
	}, [
		h,
		s,
		r
	]);
	return t.length === 0 ? /* @__PURE__ */ p("div", {
		"data-testid": `${o}-empty`,
		className: "px-3 py-4 text-xs text-text-tertiary",
		children: a
	}) : /* @__PURE__ */ p("div", {
		"data-testid": o,
		className: "relative w-[280px] shrink-0",
		style: { height: g },
		children: t.map((t) => /* @__PURE__ */ p("div", {
			"data-testid": `${o}-item-${t.id}`,
			"data-active": String(!!t.active),
			ref: (e) => {
				e ? m.current.set(t.id, e) : m.current.delete(t.id);
			},
			className: "absolute left-0 right-0",
			style: { top: h.get(t.id) ?? t.top },
			children: /* @__PURE__ */ p("div", {
				role: i ? "button" : void 0,
				tabIndex: i ? 0 : void 0,
				onClick: i ? () => i(t.id) : void 0,
				onKeyDown: i ? (e) => {
					(e.key === "Enter" || e.key === " ") && (e.preventDefault(), i(t.id));
				} : void 0,
				className: e("rounded-lg border bg-surface p-2 text-left transition-shadow", t.active ? "border-primary shadow-md" : "border-border shadow-sm hover:shadow-md", i && "cursor-pointer"),
				children: t.content
			})
		}, t.id))
	});
}
//#endregion
//#region src/components/doc-editor/CanvasDocumentView.tsx
function E({ isCanvas: e, body: a, ydoc: s, provider: c, user: l, editable: u = !0, extensions: f, onConvert: h, unsupported: g = [], header: _, toolbarActions: v, gutterItems: y, onFocusGutterItem: b, onEditorReady: x, "data-testid": S = "canvas-document" }) {
	let [w, E] = d(!1), [D, O] = d(null), [k, A] = d(null);
	return /* @__PURE__ */ m("div", {
		"data-testid": S,
		className: "flex flex-col gap-3",
		children: [
			_,
			g.length > 0 && /* @__PURE__ */ p(n, {
				variant: "warning",
				title: "Some content could not be represented",
				"data-testid": `${S}-unsupported`,
				children: /* @__PURE__ */ m("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [g.map((e, t) => /* @__PURE__ */ p(r, {
						tone: "warning",
						size: "xs",
						children: e.kind
					}, `${e.kind}-${t}`)), /* @__PURE__ */ p("span", { children: "— kept on the page as text so nothing was lost." })]
				})
			}),
			D && /* @__PURE__ */ p(n, {
				variant: "error",
				title: "Could not convert",
				"data-testid": `${S}-convert-error`,
				children: D
			}),
			e && a ? /* @__PURE__ */ m("div", {
				"data-testid": `${S}-workspace`,
				className: "rounded-lg bg-surface-inset overflow-y-auto",
				children: [u && k && /* @__PURE__ */ p("div", {
					"data-testid": `${S}-toolbar`,
					className: "sticky top-0 z-10 border-b border-border bg-surface-panel",
					children: /* @__PURE__ */ p("div", {
						className: "mx-auto max-w-[816px] px-2",
						children: /* @__PURE__ */ p(C, {
							editor: k,
							actions: v
						})
					})
				}), /* @__PURE__ */ m("div", {
					className: "flex justify-center gap-6 py-8 px-6",
					children: [/* @__PURE__ */ p("div", {
						"data-testid": `${S}-paper`,
						className: "doc-page w-full max-w-[816px] min-h-[1056px] bg-paper px-[96px] py-[96px] text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]",
						children: /* @__PURE__ */ p(o, {
							fragment: a,
							ydoc: s,
							provider: c,
							user: l,
							editable: u,
							extensions: f,
							placeholder: "Start writing…",
							chrome: "none",
							hideToolbar: !0,
							onEditorReady: (e) => {
								A(e), x?.(e);
							}
						})
					}), y && y.length > 0 && /* @__PURE__ */ p(T, {
						items: y,
						onFocusItem: b,
						"data-testid": `${S}-gutter`
					})]
				})]
			}) : /* @__PURE__ */ p(i, {
				testId: `${S}-convert-prompt`,
				title: "This document still uses sections",
				description: "Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted.",
				action: h ? /* @__PURE__ */ p(t, {
					onClick: async () => {
						if (!(!h || w)) {
							E(!0), O(null);
							try {
								let e = await h();
								e && O(e);
							} catch (e) {
								O(e instanceof Error ? e.message : String(e));
							} finally {
								E(!1);
							}
						}
					},
					disabled: w,
					"data-testid": `${S}-convert`,
					children: w ? "Converting…" : "Convert to page"
				}) : void 0
			})
		]
	});
}
//#endregion
export { C as i, T as n, w as r, E as t };
