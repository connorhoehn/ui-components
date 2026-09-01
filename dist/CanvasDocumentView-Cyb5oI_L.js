import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./Banner-BLOg1hC_.js";
import { t as r } from "./Chip-YhQI5B9P.js";
import { t as i } from "./EmptyState-ClmWoqCb.js";
import { t as a } from "./Select-CqVokE2v.js";
import { t as o } from "./TiptapEditor-CnjifOQz.js";
import { useCallback as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/doc-editor/DocumentToolbar.tsx
var d = [
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
function f(e) {
	return e.isActive("heading", { level: 1 }) ? "heading1" : e.isActive("heading", { level: 2 }) ? "heading2" : e.isActive("heading", { level: 3 }) ? "heading3" : e.isActive("blockquote") ? "blockquote" : e.isActive("codeBlock") ? "codeBlock" : "paragraph";
}
var p = [
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
], m = [
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
function h({ btn: t, editor: n, testId: r }) {
	let i = t.active(n);
	return /* @__PURE__ */ l("button", {
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
function g() {
	return /* @__PURE__ */ l("span", {
		"aria-hidden": !0,
		className: "mx-1 h-5 w-px self-center bg-border"
	});
}
function _({ editor: e, actions: t, "data-testid": n = "document-toolbar" }) {
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
	return e ? /* @__PURE__ */ u("div", {
		"data-testid": n,
		role: "toolbar",
		"aria-label": "Document formatting",
		className: "flex flex-wrap items-center gap-0.5 px-2 py-1.5",
		children: [
			/* @__PURE__ */ l(h, {
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
			/* @__PURE__ */ l(h, {
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
			/* @__PURE__ */ l(g, {}),
			/* @__PURE__ */ l(a, {
				size: "sm",
				"data-testid": `${n}-block`,
				"aria-label": "Text style",
				value: f(e),
				options: d,
				onChange: (e) => r(e.target.value),
				className: "w-[140px]"
			}),
			/* @__PURE__ */ l(g, {}),
			p.map((t) => /* @__PURE__ */ l(h, {
				btn: t,
				editor: e,
				testId: `${n}-${t.key}`
			}, t.key)),
			/* @__PURE__ */ l(g, {}),
			m.map((t) => /* @__PURE__ */ l(h, {
				btn: t,
				editor: e,
				testId: `${n}-${t.key}`
			}, t.key)),
			/* @__PURE__ */ l(g, {}),
			/* @__PURE__ */ l(h, {
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
			/* @__PURE__ */ l(h, {
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
			t && /* @__PURE__ */ l("span", {
				className: "ml-auto flex items-center gap-1",
				children: t
			})
		]
	}) : null;
}
//#endregion
//#region src/components/doc-editor/CanvasDocumentView.tsx
function v({ isCanvas: e, body: a, ydoc: s, provider: d, user: f, editable: p = !0, extensions: m, onConvert: h, unsupported: g = [], header: v, onEditorReady: y, "data-testid": b = "canvas-document" }) {
	let [x, S] = c(!1), [C, w] = c(null), [T, E] = c(null);
	return /* @__PURE__ */ u("div", {
		"data-testid": b,
		className: "flex flex-col gap-3",
		children: [
			v,
			g.length > 0 && /* @__PURE__ */ l(n, {
				variant: "warning",
				title: "Some content could not be represented",
				"data-testid": `${b}-unsupported`,
				children: /* @__PURE__ */ u("span", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [g.map((e, t) => /* @__PURE__ */ l(r, {
						tone: "warning",
						size: "xs",
						children: e.kind
					}, `${e.kind}-${t}`)), /* @__PURE__ */ l("span", { children: "— kept on the page as text so nothing was lost." })]
				})
			}),
			C && /* @__PURE__ */ l(n, {
				variant: "error",
				title: "Could not convert",
				"data-testid": `${b}-convert-error`,
				children: C
			}),
			e && a ? /* @__PURE__ */ u("div", {
				"data-testid": `${b}-workspace`,
				className: "rounded-lg bg-surface-inset overflow-y-auto",
				children: [p && T && /* @__PURE__ */ l("div", {
					"data-testid": `${b}-toolbar`,
					className: "sticky top-0 z-10 border-b border-border bg-surface-panel",
					children: /* @__PURE__ */ l("div", {
						className: "mx-auto max-w-[816px] px-2",
						children: /* @__PURE__ */ l(_, { editor: T })
					})
				}), /* @__PURE__ */ l("div", {
					className: "py-8",
					children: /* @__PURE__ */ l("div", {
						"data-testid": `${b}-paper`,
						className: "doc-page mx-auto w-full max-w-[816px] min-h-[1056px] bg-paper px-[96px] py-[96px] text-paper-ink shadow-[0_1px_3px_rgba(60,64,67,0.15),0_4px_12px_rgba(60,64,67,0.15)]",
						children: /* @__PURE__ */ l(o, {
							fragment: a,
							ydoc: s,
							provider: d,
							user: f,
							editable: p,
							extensions: m,
							placeholder: "Start writing…",
							chrome: "none",
							hideToolbar: !0,
							onEditorReady: (e) => {
								E(e), y?.(e);
							}
						})
					})
				})]
			}) : /* @__PURE__ */ l(i, {
				testId: `${b}-convert-prompt`,
				title: "This document still uses sections",
				description: "Convert it to a single page to edit it as one continuous document. Your existing sections become headings; nothing is deleted.",
				action: h ? /* @__PURE__ */ l(t, {
					onClick: async () => {
						if (!(!h || x)) {
							S(!0), w(null);
							try {
								let e = await h();
								e && w(e);
							} catch (e) {
								w(e instanceof Error ? e.message : String(e));
							} finally {
								S(!1);
							}
						}
					},
					disabled: x,
					"data-testid": `${b}-convert`,
					children: x ? "Converting…" : "Convert to page"
				}) : void 0
			})
		]
	});
}
//#endregion
export { _ as n, v as t };
