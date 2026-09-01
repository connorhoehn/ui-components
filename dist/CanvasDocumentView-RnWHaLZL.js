import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./Banner-BLOg1hC_.js";
import { t as r } from "./Chip-YhQI5B9P.js";
import { t as i } from "./EmptyState-ClmWoqCb.js";
import { t as a } from "./Select-CqVokE2v.js";
import { t as o } from "./TiptapEditor-CnjifOQz.js";
import { useCallback as s, useMemo as c, useState as l } from "react";
import { jsx as u, jsxs as d } from "react/jsx-runtime";
//#region src/components/doc-editor/DocumentToolbar.tsx
var f = [
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
function p(e) {
	return e.isActive("heading", { level: 1 }) ? "heading1" : e.isActive("heading", { level: 2 }) ? "heading2" : e.isActive("heading", { level: 3 }) ? "heading3" : e.isActive("blockquote") ? "blockquote" : e.isActive("codeBlock") ? "codeBlock" : "paragraph";
}
var m = [
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
], h = [
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
function g({ btn: t, editor: n, testId: r }) {
	let i = t.active(n);
	return /* @__PURE__ */ u("button", {
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
function _() {
	return /* @__PURE__ */ u("span", {
		"aria-hidden": !0,
		className: "mx-1 h-5 w-px self-center bg-border"
	});
}
function v({ editor: e, actions: t, "data-testid": n = "document-toolbar" }) {
	let r = s((t) => {
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
	return e ? /* @__PURE__ */ d("div", {
		"data-testid": n,
		role: "toolbar",
		"aria-label": "Document formatting",
		className: "flex flex-wrap items-center gap-0.5 px-2 py-1.5",
		children: [
			/* @__PURE__ */ u(g, {
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
				testId: `${n}-undo`
			}),
			/* @__PURE__ */ u(g, {
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
				testId: `${n}-redo`
			}),
			/* @__PURE__ */ u(_, {}),
			/* @__PURE__ */ u(a, {
				size: "sm",
				"data-testid": `${n}-block`,
				"aria-label": "Text style",
				value: p(e),
				options: f,
				onChange: (e) => r(e.target.value),
				className: "w-[140px]"
			}),
			/* @__PURE__ */ u(_, {}),
			m.map((t) => /* @__PURE__ */ u(g, {
				btn: t,
				editor: e,
				testId: `${n}-${t.key}`
			}, t.key)),
			/* @__PURE__ */ u(_, {}),
			h.map((t) => /* @__PURE__ */ u(g, {
				btn: t,
				editor: e,
				testId: `${n}-${t.key}`
			}, t.key)),
			/* @__PURE__ */ u(_, {}),
			/* @__PURE__ */ u(g, {
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
				testId: `${n}-link`
			}),
			/* @__PURE__ */ u(g, {
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
				testId: `${n}-hr`
			}),
			t && /* @__PURE__ */ u("span", {
				className: "ml-auto flex items-center gap-1",
				children: t
			})
		]
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentGutter.tsx
function y(e, t, n) {
	let r = [...e].sort((e, t) => e.top - t.top), i = /* @__PURE__ */ new Map(), a = -Infinity;
	for (let e of r) {
		let r = Math.max(e.top, a);
		i.set(e.id, r), a = r + t + n;
	}
	return i;
}
function b({ items: t, gap: n = 12, estimatedHeight: r = 120, onFocusItem: i, emptyLabel: a = "No comments yet", "data-testid": o = "document-gutter" }) {
	let s = c(() => y(t, r, n), [
		t,
		r,
		n
	]), l = c(() => {
		let e = 0;
		for (let [, t] of s) e = Math.max(e, t + r);
		return e;
	}, [s, r]);
	return t.length === 0 ? /* @__PURE__ */ u("div", {
		"data-testid": `${o}-empty`,
		className: "px-3 py-4 text-xs text-text-tertiary",
		children: a
	}) : /* @__PURE__ */ u("div", {
		"data-testid": o,
		className: "relative w-[280px] shrink-0",
		style: { height: l },
		children: t.map((t) => /* @__PURE__ */ u("div", {
			"data-testid": `${o}-item-${t.id}`,
			"data-active": String(!!t.active),
			className: "absolute left-0 right-0",
			style: { top: s.get(t.id) ?? t.top },
			children: /* @__PURE__ */ u("div", {
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
function x({ isCanvas: e, body: a, ydoc: s, provider: c, user: f, editable: p = !0, extensions: m, onConvert: h, unsupported: g = [], header: _, toolbarActions: y, gutterItems: x, onFocusGutterItem: S, onEditorReady: C, "data-testid": w = "canvas-document" }) {
	let [T, E] = l(!1), [D, O] = l(null), [k, A] = l(null);
	return /* @__PURE__ */ d("div", {
		"data-testid": w,
		className: "flex flex-col gap-3",
		children: [
			_,
			g.length > 0 && /* @__PURE__ */ u(n, {
				variant: "warning",
				title: "Some content could not be represented",
				"data-testid": `${w}-unsupported`,
				children: /* @__PURE__ */ d("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [g.map((e, t) => /* @__PURE__ */ u(r, {
						tone: "warning",
						size: "xs",
						children: e.kind
					}, `${e.kind}-${t}`)), /* @__PURE__ */ u("span", { children: "— kept on the page as text so nothing was lost." })]
				})
			}),
			D && /* @__PURE__ */ u(n, {
				variant: "error",
				title: "Could not convert",
				"data-testid": `${w}-convert-error`,
				children: D
			}),
			e && a ? /* @__PURE__ */ d("div", {
				"data-testid": `${w}-workspace`,
				className: "rounded-lg bg-surface-inset overflow-y-auto",
				children: [p && k && /* @__PURE__ */ u("div", {
					"data-testid": `${w}-toolbar`,
					className: "sticky top-0 z-10 border-b border-border bg-surface-panel",
					children: /* @__PURE__ */ u("div", {
						className: "mx-auto max-w-[816px] px-2",
						children: /* @__PURE__ */ u(v, {
							editor: k,
							actions: y
						})
					})
				}), /* @__PURE__ */ d("div", {
					className: "flex justify-center gap-6 py-8 px-6",
					children: [/* @__PURE__ */ u("div", {
						"data-testid": `${w}-paper`,
						className: "doc-page w-full max-w-[816px] min-h-[1056px] bg-paper px-[96px] py-[96px] text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]",
						children: /* @__PURE__ */ u(o, {
							fragment: a,
							ydoc: s,
							provider: c,
							user: f,
							editable: p,
							extensions: m,
							placeholder: "Start writing…",
							chrome: "none",
							hideToolbar: !0,
							onEditorReady: (e) => {
								A(e), C?.(e);
							}
						})
					}), x && x.length > 0 && /* @__PURE__ */ u(b, {
						items: x,
						onFocusItem: S,
						"data-testid": `${w}-gutter`
					})]
				})]
			}) : /* @__PURE__ */ u(i, {
				testId: `${w}-convert-prompt`,
				title: "This document still uses sections",
				description: "Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted.",
				action: h ? /* @__PURE__ */ u(t, {
					onClick: async () => {
						if (!(!h || T)) {
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
					disabled: T,
					"data-testid": `${w}-convert`,
					children: T ? "Converting…" : "Convert to page"
				}) : void 0
			})
		]
	});
}
//#endregion
export { v as i, b as n, y as r, x as t };
