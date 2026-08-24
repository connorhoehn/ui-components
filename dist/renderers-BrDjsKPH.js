import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { c as n, s as r } from "./useWebSocket-DgefXbuy.js";
import { t as i } from "./useDocumentTypes-C-AMWgYq.js";
import { t as a } from "./cn-DhjIN-s0.js";
import { t as o } from "./Modal-B75saHcP.js";
import { t as s } from "./Input-HA4mVi1W.js";
import { t as c } from "./Textarea-DPCoGI7q.js";
import { t as l } from "./Select-CBb9fCiw.js";
import { t as u } from "./Checkbox-CsbxMNgR.js";
import { useCallback as d, useEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
import * as y from "yjs";
import { EditorContent as b, useEditor as x } from "@tiptap/react";
import S from "@tiptap/starter-kit";
import C from "@tiptap/extension-task-list";
import w from "@tiptap/extension-task-item";
import T from "@tiptap/extension-placeholder";
import E from "@tiptap/extension-collaboration";
import { absolutePositionToRelativePosition as D, relativePositionToAbsolutePosition as O, ySyncPluginKey as k } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/NewDocumentModal.tsx
function A({ open: e, onClose: t, onCreate: n }) {
	let [r, l] = h([]), [u, d] = h(null), [p, y] = h(""), [b, x] = h(""), S = m(null);
	if (f(() => {
		if (!e) return;
		let t = i();
		l(t), d(t[0]?.id ?? null), y(""), x("");
		let n = setTimeout(() => S.current?.focus(), 50);
		return () => clearTimeout(n);
	}, [e]), !e) return null;
	let C = r.find((e) => e.id === u), w = () => {
		let e = p.trim();
		!e || !C || (n({
			title: e,
			type: C.name,
			description: b.trim() || void 0,
			icon: C.icon,
			documentTypeId: C.id
		}), t());
	}, T = (e) => {
		e.key === "Enter" && !e.shiftKey && p.trim() && C && w();
	}, E = !!p.trim() && !!C;
	return /* @__PURE__ */ _(o, {
		open: e,
		onClose: t,
		maxWidth: 560,
		zIndex: 1e4,
		rawChildren: !0,
		backdropStyle: {
			background: "rgba(15,23,42,0.5)",
			backdropFilter: "blur(2px)",
			WebkitBackdropFilter: "blur(2px)"
		},
		cardStyle: {
			border: "1px solid #e2e8f0",
			borderRadius: 8,
			maxHeight: "90vh",
			width: "90vw",
			boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
			display: "flex",
			flexDirection: "column",
			overflow: "hidden",
			padding: 0
		},
		children: /* @__PURE__ */ v("div", {
			onKeyDown: T,
			className: "contents",
			children: [
				/* @__PURE__ */ _("h2", {
					className: a("m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ _("div", {
					className: a("flex-1 overflow-y-auto px-6 min-h-0"),
					children: r.length === 0 ? /* @__PURE__ */ v("div", {
						className: a("text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-neutral"),
						children: [
							/* @__PURE__ */ _("div", {
								className: a("text-[40px] mb-3"),
								children: "📋"
							}),
							/* @__PURE__ */ _("div", {
								className: a("text-[15px] font-semibold mb-2 text-text-primary"),
								children: "No document types defined yet"
							}),
							/* @__PURE__ */ v("div", {
								className: a("text-[13px] text-text-tertiary max-w-xs mx-auto mb-4"),
								children: [
									"Document types define the sections and structure of your documents. Create one first in ",
									/* @__PURE__ */ _("strong", { children: "☰ → Document Types" }),
									"."
								]
							}),
							/* @__PURE__ */ _("button", {
								onClick: t,
								className: a("px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"),
								children: "Close"
							})
						]
					}) : /* @__PURE__ */ v(g, { children: [
						/* @__PURE__ */ v("div", {
							className: a("mb-5"),
							children: [/* @__PURE__ */ _("label", {
								className: a("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Document Type"
							}), /* @__PURE__ */ _("div", {
								className: a("grid grid-cols-2 gap-2"),
								children: r.map((e) => {
									let t = u === e.id;
									return /* @__PURE__ */ v("button", {
										"data-testid": `type-option-${e.id}`,
										onClick: () => d(e.id),
										className: a("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-white border-2 border-border hover:bg-surface-panel"),
										children: [
											/* @__PURE__ */ _("span", {
												className: a("text-2xl shrink-0"),
												children: e.icon
											}),
											/* @__PURE__ */ v("div", {
												className: a("min-w-0"),
												children: [
													/* @__PURE__ */ _("div", {
														className: a("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
														children: e.name
													}),
													e.description && /* @__PURE__ */ _("div", {
														className: a("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
														children: e.description
													}),
													/* @__PURE__ */ v("div", {
														className: a("text-[11px] text-text-tertiary mt-0.5"),
														children: [
															e.fields.length,
															" section",
															e.fields.length === 1 ? "" : "s"
														]
													})
												]
											}),
											t && /* @__PURE__ */ _("span", {
												className: a("absolute top-1.5 right-2 text-sm text-info-fg font-bold"),
												children: "✓"
											})
										]
									}, e.id);
								})
							})]
						}),
						/* @__PURE__ */ v("div", {
							className: a("mb-4"),
							children: [/* @__PURE__ */ v("label", {
								className: a("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Title ", /* @__PURE__ */ _("span", {
									className: a("text-danger-fg"),
									children: "*"
								})]
							}), /* @__PURE__ */ _(s, {
								ref: S,
								"data-testid": "new-doc-title",
								value: p,
								onChange: (e) => y(e.target.value),
								placeholder: C ? `e.g. Q2 ${C.name}` : "Document title…"
							})]
						}),
						/* @__PURE__ */ v("div", {
							className: a("mb-5"),
							children: [/* @__PURE__ */ v("label", {
								className: a("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Description ", /* @__PURE__ */ _("span", {
									className: a("text-text-tertiary font-normal"),
									children: "(optional)"
								})]
							}), /* @__PURE__ */ _(c, {
								"data-testid": "new-doc-description",
								value: b,
								onChange: (e) => x(e.target.value),
								placeholder: "Brief description of this document…",
								rows: 3,
								className: a("resize-y")
							})]
						})
					] })
				}),
				r.length > 0 && /* @__PURE__ */ v("div", {
					className: a("flex justify-end gap-2 px-6 py-4 border-t border-border bg-white shrink-0"),
					children: [/* @__PURE__ */ _("button", {
						"data-testid": "new-doc-cancel",
						onClick: t,
						className: a("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-white text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ _("button", {
						"data-testid": "new-doc-submit",
						onClick: w,
						disabled: !E,
						className: a("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", E ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/renderers/tasks/definition.ts
var j = {
	type: "tasks",
	label: "Task List",
	icon: "✅",
	description: "Assignable action items with status tracking",
	rendererKeys: {
		editor: ["tasks:editor"],
		ack: ["tasks:ack"],
		reader: ["tasks:reader"]
	},
	rendererLabels: {
		"tasks:editor": "Task Editor",
		"tasks:ack": "Task Review",
		"tasks:reader": "Task Reader"
	}
}, M = {
	type: "rich-text",
	label: "Rich Text",
	icon: "📝",
	description: "Formatted content with headings and lists",
	rendererKeys: {
		editor: ["rich-text:editor"],
		ack: ["rich-text:ack"],
		reader: ["rich-text:reader"]
	},
	rendererLabels: {
		"rich-text:editor": "Rich Text Editor",
		"rich-text:ack": "Rich Text Viewer",
		"rich-text:reader": "Rich Text Viewer"
	}
}, N = {
	type: "decisions",
	label: "Decisions",
	icon: "🎯",
	description: "Decision log with rationale and context",
	rendererKeys: {
		editor: ["decisions:editor"],
		ack: ["decisions:ack"],
		reader: ["decisions:reader"]
	},
	rendererLabels: {
		"decisions:editor": "Decisions Editor",
		"decisions:ack": "Decisions Viewer",
		"decisions:reader": "Decisions Viewer"
	}
}, P = {
	type: "checklist",
	label: "Checklist",
	icon: "☑️",
	description: "Simple yes/no checklist items",
	rendererKeys: {
		editor: ["checklist:editor"],
		ack: ["checklist:ack"],
		reader: ["checklist:reader"]
	},
	rendererLabels: {
		"checklist:editor": "Checklist Editor",
		"checklist:ack": "Checklist Viewer",
		"checklist:reader": "Checklist Viewer"
	}
}, F = {
	type: "file-upload",
	label: "File Upload",
	icon: "📎",
	description: "Upload a file at edit time; download link in viewer",
	rendererKeys: {
		editor: ["file-upload:editor"],
		ack: ["file-upload:ack"],
		reader: ["file-upload:reader"]
	},
	rendererLabels: {
		"file-upload:editor": "File Upload Editor",
		"file-upload:ack": "File Upload Viewer",
		"file-upload:reader": "File Upload Viewer"
	}
}, I = {
	type: "diagram",
	label: "Diagram",
	icon: "▦",
	description: "Embedded image or SVG (placeholder until upload pipeline lands)",
	rendererKeys: {
		editor: ["diagram:editor"],
		ack: ["diagram:ack"],
		reader: ["diagram:reader"]
	},
	rendererLabels: {
		"diagram:editor": "Diagram Editor",
		"diagram:ack": "Diagram Viewer",
		"diagram:reader": "Diagram Viewer"
	}
}, ee = {
	type: "link-block",
	label: "Link Block",
	icon: "🔗",
	description: "List of external links (label + url pairs)",
	rendererKeys: {
		editor: ["link-block:editor"],
		ack: ["link-block:ack"],
		reader: ["link-block:reader"]
	},
	rendererLabels: {
		"link-block:editor": "Link Block Editor",
		"link-block:ack": "Link Block Viewer",
		"link-block:reader": "Link Block Viewer"
	}
}, te = [
	{
		label: "B",
		action: (e) => {
			e.chain().focus().toggleBold().run();
		},
		isActive: (e) => e.isActive("bold")
	},
	{
		label: "I",
		action: (e) => {
			e.chain().focus().toggleItalic().run();
		},
		isActive: (e) => e.isActive("italic")
	},
	{
		label: "S",
		action: (e) => {
			e.chain().focus().toggleStrike().run();
		},
		isActive: (e) => e.isActive("strike")
	},
	{
		label: "</>",
		action: (e) => {
			e.chain().focus().toggleCode().run();
		},
		isActive: (e) => e.isActive("code")
	},
	{
		label: "H1",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 1 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 1 })
	},
	{
		label: "H2",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 2 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 2 })
	},
	{
		label: "H3",
		action: (e) => {
			e.chain().focus().toggleHeading({ level: 3 }).run();
		},
		isActive: (e) => e.isActive("heading", { level: 3 })
	},
	{
		label: "Bullet",
		action: (e) => {
			e.chain().focus().toggleBulletList().run();
		},
		isActive: (e) => e.isActive("bulletList")
	},
	{
		label: "Ordered",
		action: (e) => {
			e.chain().focus().toggleOrderedList().run();
		},
		isActive: (e) => e.isActive("orderedList")
	},
	{
		label: "Task",
		action: (e) => {
			e.chain().focus().toggleTaskList().run();
		},
		isActive: (e) => e.isActive("taskList")
	},
	{
		label: "Quote",
		action: (e) => {
			e.chain().focus().toggleBlockquote().run();
		},
		isActive: (e) => e.isActive("blockquote")
	},
	{
		label: "Code Block",
		action: (e) => {
			e.chain().focus().toggleCodeBlock().run();
		},
		isActive: (e) => e.isActive("codeBlock")
	},
	{
		label: "HR",
		action: (e) => {
			e.chain().focus().setHorizontalRule().run();
		},
		isActive: () => !1
	}
];
function L({ editor: e }) {
	return e ? /* @__PURE__ */ _("div", {
		className: a("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-surface-panel rounded-t-lg"),
		children: te.map((t) => {
			let n = t.isActive(e);
			return /* @__PURE__ */ _("button", {
				type: "button",
				onClick: () => t.action(e),
				className: a("px-2 py-1 text-xs font-[inherit] border border-border-emphasis rounded cursor-pointer leading-snug", n ? "bg-info text-white" : "bg-white text-text-primary"),
				title: t.label,
				children: t.label
			}, t.label);
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/TiptapEditor.tsx
function R(e, t, n) {
	try {
		if (t < 0 || t > e.state.doc.content.size) return null;
		let r = e.coordsAtPos(t), i = (n || e.dom).getBoundingClientRect();
		return {
			top: r.top - i.top,
			left: r.left - i.left,
			height: r.bottom - r.top
		};
	} catch {
		return null;
	}
}
function ne({ cursors: e, editorView: t, containerEl: n }) {
	return t ? /* @__PURE__ */ _(g, { children: e.map((e) => {
		if (e.head == null) return null;
		let r = R(t, e.head, n);
		if (!r) return null;
		let i = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2) || e.name.slice(0, 2).toUpperCase(), a = [];
		if (e.anchor != null && e.anchor !== e.head) {
			let r = Math.min(e.anchor, e.head), i = Math.max(e.anchor, e.head);
			try {
				let o = t.dom.offsetWidth, s = r;
				for (; s <= i;) {
					let c = R(t, s, n);
					if (!c) break;
					let l = s, u = c.top;
					for (let e = s + 1; e <= i; e++) {
						let r = R(t, e, n);
						if (!r || Math.abs(r.top - u) > 2) break;
						l = e;
					}
					let d = R(t, l, n);
					if (d) {
						let t = s === r ? c.left : 0, n = l === i ? d.left + 4 : o;
						a.push(/* @__PURE__ */ _("div", {
							className: "absolute rounded-sm pointer-events-none opacity-[0.12] z-[5]",
							style: {
								top: u,
								left: t,
								width: Math.max(n - t, 4),
								height: c.height || 18,
								background: e.color
							}
						}, `sel-${e.clientId}-${s}`));
					}
					s = l + 1;
				}
			} catch {}
		}
		return /* @__PURE__ */ v("div", {
			className: "pointer-events-none",
			children: [
				a,
				/* @__PURE__ */ _("div", {
					className: "absolute w-0.5 opacity-40 rounded-[1px] pointer-events-none z-10 [animation:cursorBlink_1.2s_ease-in-out_infinite]",
					style: {
						top: r.top,
						left: r.left - 1,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ _("div", {
					className: "absolute w-2 opacity-[0.06] rounded pointer-events-none z-[9]",
					style: {
						top: r.top,
						left: r.left - 4,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ _("div", {
					className: "absolute text-white text-[10px] font-bold py-px px-[5px] rounded-[4px_4px_4px_0] whitespace-nowrap pointer-events-none z-[11] opacity-[0.55] shadow-[0_1px_4px_rgba(0,0,0,0.1)]",
					style: {
						top: r.top - 18,
						left: r.left - 2,
						background: e.color
					},
					title: e.name,
					children: i
				})
			]
		}, e.clientId);
	}) }) : null;
}
function z({ fragment: e, ydoc: t, provider: n, user: r, editable: i = !0, placeholder: o = "Start typing...", sectionId: s, onUpdateCursorInfo: c }) {
	let l = p(() => [
		S.configure({ history: !1 }),
		C,
		w.configure({ nested: !0 }),
		T.configure({ placeholder: o }),
		E.configure({
			document: t,
			fragment: e
		})
	], [t, e]), u = x({
		extensions: l,
		editable: i
	}, [l]), [m, g] = h([]), [A, j] = h(null);
	f(() => {
		if (c) c(r.name, r.color);
		else if (n?.awareness) {
			let e = n.awareness.getLocalState()?.user || {};
			n.awareness.setLocalStateField("user", {
				...e,
				name: r.name,
				color: r.color
			});
		}
	}, [
		n,
		r,
		c
	]);
	let M = d(() => {
		if (!n?.awareness || !u?.view) return;
		let e = n.awareness.getStates(), t = n.awareness.clientID, r = [];
		e.forEach((e, n) => {
			if (n === t) return;
			let i = e.user;
			if (!(!i || !e.cursor) && !(s && e.cursor.sectionId !== s)) try {
				let t = k.getState(u.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let a = O(t.doc, t.type, y.createRelativePositionFromJSON(e.cursor.anchor), t.binding.mapping), o = O(t.doc, t.type, y.createRelativePositionFromJSON(e.cursor.head), t.binding.mapping);
				r.push({
					clientId: n,
					name: i.name || `User ${n}`,
					color: i.color || "var(--color-info)",
					anchor: a,
					head: o
				});
			} catch {}
		}), g(r);
	}, [
		n,
		u,
		s
	]);
	return f(() => {
		if (!u?.view || !n?.awareness) return;
		let e = () => {
			try {
				let e = k.getState(u.view.state);
				if (!e?.type || !e?.binding?.mapping) return;
				let { anchor: t, head: r } = u.view.state.selection, i = D(t, e.type, e.binding.mapping), a = D(r, e.type, e.binding.mapping);
				n.awareness.setLocalStateField("cursor", {
					anchor: i,
					head: a,
					sectionId: s
				});
			} catch {}
		};
		return u.on("selectionUpdate", e), e(), () => {
			u.off("selectionUpdate", e), n.awareness.setLocalStateField("cursor", null);
		};
	}, [
		u,
		n,
		s
	]), f(() => {
		if (!n?.awareness) return;
		let e = () => M();
		return n.awareness.on("change", e), () => {
			n.awareness.off("change", e);
		};
	}, [n, M]), /* @__PURE__ */ v("div", {
		className: a(i ? "border border-border rounded-lg overflow-hidden relative" : "relative"),
		children: [i && /* @__PURE__ */ _(L, { editor: u }), /* @__PURE__ */ v("div", {
			ref: j,
			className: a("px-4 py-3 text-sm leading-relaxed text-text-primary relative"),
			children: [/* @__PURE__ */ _(b, { editor: u }), /* @__PURE__ */ _(ne, {
				cursors: m,
				editorView: u?.view,
				containerEl: A
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var re = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, B = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, ie = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function ae(e) {
	let t = new Date(e);
	return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}
function oe(e) {
	let t = new Date(e);
	if (isNaN(t.getTime())) return !1;
	let n = /* @__PURE__ */ new Date();
	return n.setHours(0, 0, 0, 0), t < n;
}
function V(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function H({ item: e, editable: t, onUpdate: i, onRemove: o, autoFocusText: c, onDidAutoFocus: p }) {
	let [y, b] = h(!1), [x, S] = h(""), [C, w] = h(0), T = m(null), E = m(null), D = m(null), O = () => {
		i({ status: e.status === "done" ? "pending" : "done" });
	}, k = e.assignee ? r.find((t) => t.displayName === e.assignee) : void 0, A = x.trim() ? n(x) : r, j = d(() => {
		t && (S(""), w(0), b(!0));
	}, [t]), M = d(() => {
		b(!1), S(""), w(0);
	}, []), N = d((e) => {
		i({ assignee: e.displayName }), M();
	}, [i, M]), P = d(() => {
		i({ assignee: "" }), M();
	}, [i, M]);
	f(() => {
		if (!y) return;
		let e = (e) => {
			T.current && !T.current.contains(e.target) && M();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [y, M]), f(() => {
		y && E.current && E.current.focus();
	}, [y]), f(() => {
		w(0);
	}, [x]), f(() => {
		c && D.current && (D.current.focus(), p?.());
	}, [c, p]);
	let F = (e) => {
		e.key === "Escape" ? M() : e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, A.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), A[C] && N(A[C]));
	}, I = e.dueDate && e.status !== "done" ? oe(e.dueDate) : !1;
	return /* @__PURE__ */ v("div", {
		className: a("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ _("span", {
				title: `Priority: ${e.priority}`,
				className: a("w-2 h-2 rounded-full shrink-0"),
				style: { background: B[e.priority] }
			}),
			/* @__PURE__ */ _(u, {
				checked: e.status === "done",
				onChange: O,
				disabled: !t,
				className: a("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ _(s, {
				ref: D,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				className: a("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ v("span", {
				title: e.dueDate,
				className: a("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", I ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					I ? "⚠ " : "",
					"Due: ",
					ae(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ _("span", {
				className: a("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: ie[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ v("div", {
				ref: T,
				className: a("relative"),
				children: [/* @__PURE__ */ _("button", {
					type: "button",
					onClick: j,
					title: e.assignee || "Unassigned",
					className: a("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-white text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("span", {
						className: a("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: k?.color ?? "var(--color-text-tertiary)" },
						children: V(e.assignee)
					}), /* @__PURE__ */ _("span", {
						className: a("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), y && /* @__PURE__ */ v("div", {
					className: a("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-white border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ _("div", {
							className: a("px-2 py-1"),
							children: /* @__PURE__ */ _(s, {
								ref: E,
								size: "sm",
								value: x,
								onChange: (e) => S(e.target.value),
								onKeyDown: F,
								placeholder: "Search users...",
								className: a("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ v("button", {
							type: "button",
							onClick: P,
							className: a("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ _("span", {
								className: a("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ _("span", {
								className: a("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						A.map((e, t) => /* @__PURE__ */ v("button", {
							type: "button",
							onClick: () => N(e),
							onMouseEnter: () => w(t),
							className: a("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === C ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ _("span", {
								className: a("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: V(e.displayName)
							}), /* @__PURE__ */ _("span", { children: e.displayName })]
						}, e.userId)),
						A.length === 0 && /* @__PURE__ */ _("div", {
							className: a("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ _(l, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => i({ priority: e.target.value }),
				className: a("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: B[e.priority] },
				title: `Priority: ${e.priority}`,
				options: [
					{
						value: "low",
						label: "low"
					},
					{
						value: "medium",
						label: "medium"
					},
					{
						value: "high",
						label: "high"
					}
				]
			}),
			/* @__PURE__ */ _(l, {
				value: e.status,
				disabled: !t,
				onChange: (e) => i({ status: e.target.value }),
				className: a("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: re[e.status] },
				title: `Status: ${e.status}`,
				options: [
					{
						value: "pending",
						label: "pending"
					},
					{
						value: "acked",
						label: "acked"
					},
					{
						value: "done",
						label: "done"
					},
					{
						value: "rejected",
						label: "rejected"
					}
				]
			}),
			t && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: o,
				title: "Remove task",
				className: a("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
				children: "x"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TaskList.tsx
function U({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: i }) {
	if (e.length === 0) return /* @__PURE__ */ _("div", {
		className: a("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let o = i?.current ?? !1;
	return /* @__PURE__ */ _("div", {
		className: a("py-2"),
		children: e.map((a, s) => /* @__PURE__ */ _(H, {
			item: a,
			editable: t,
			onUpdate: (e) => n(a.id, e),
			onRemove: () => r(a.id),
			autoFocusText: o && s === e.length - 1,
			onDidAutoFocus: o && s === e.length - 1 ? () => {
				i && (i.current = !1);
			} : void 0
		}, a.id))
	});
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function W({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = m(!1);
	return /* @__PURE__ */ v("div", { children: [
		t && n && /* @__PURE__ */ _(z, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? `Write ${e.type} content...`,
			sectionId: e.id,
			onUpdateCursorInfo: l
		}),
		(e.items.length > 0 || a) && /* @__PURE__ */ _(U, {
			items: e.items,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: u
		}),
		a && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => {
				o?.({
					text: "",
					status: "pending",
					assignee: "",
					ackedBy: "",
					ackedAt: "",
					priority: "medium",
					notes: ""
				}), u.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/rich-text/RichTextEditorRenderer.tsx
function se({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o }) {
	return !t || !n ? /* @__PURE__ */ _("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ _(z, {
		fragment: t,
		ydoc: n,
		provider: r ?? null,
		user: i ?? {
			name: "Anonymous",
			color: "#6b7280"
		},
		editable: a,
		placeholder: e.placeholder ?? "Write content...",
		sectionId: e.id,
		onUpdateCursorInfo: o
	});
}
//#endregion
//#region src/renderers/rich-text/RichTextReaderRenderer.tsx
function G({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i }) {
	return /* @__PURE__ */ v("div", { children: [t && n ? /* @__PURE__ */ _("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ _(z, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: {
				name: "",
				color: "#6b7280"
			},
			editable: !1,
			sectionId: e.id
		})
	}) : /* @__PURE__ */ _("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ _("button", {
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function ce({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = m(!1);
	return /* @__PURE__ */ v("div", {
		className: "py-1",
		children: [
			e.items.length > 0 || t ? /* @__PURE__ */ _(U, {
				items: e.items,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: a
			}) : null,
			e.items.length === 0 && !t && /* @__PURE__ */ _("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: () => {
					n?.({
						text: "",
						status: "pending",
						assignee: "",
						ackedBy: "",
						ackedAt: "",
						priority: "medium",
						notes: ""
					}), a.current = !0;
				},
				className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
				children: "+ Add item"
			})
		]
	});
}
//#endregion
//#region src/renderers/tasks/TasksReaderRenderer.tsx
var le = {
	pending: {
		label: "Pending",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Acked",
		color: "var(--color-info-fg)",
		bg: "var(--color-info-bg)"
	},
	done: {
		label: "Done",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Rejected",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
}, ue = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function de(e) {
	let t = new Date(e);
	if (isNaN(t.getTime())) return !1;
	let n = /* @__PURE__ */ new Date();
	return n.setHours(0, 0, 0, 0), t < n;
}
function fe(e) {
	let t = new Date(e);
	return isNaN(t.getTime()) ? e : t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}
function pe(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function K({ item: e, onUpdateItem: t }) {
	let [n, r] = h(!1), i = le[e.status], o = e.dueDate && e.status === "pending" ? de(e.dueDate) : !1, s = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ v("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: s ? .65 : 1 },
		children: [
			/* @__PURE__ */ _("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: ue[e.priority],
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ _("button", {
				type: "button",
				title: `Status: ${e.status}${t ? " — click to toggle done" : ""}`,
				onClick: () => {
					if (!t) return;
					let n = e.status === "done" ? "pending" : "done";
					t(e.id, { status: n });
				},
				style: {
					width: 18,
					height: 18,
					borderRadius: "50%",
					border: `2px solid ${i.color}`,
					background: s ? i.color : "transparent",
					cursor: t ? "pointer" : "default",
					flexShrink: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 0
				},
				children: s && /* @__PURE__ */ _("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ _("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ _("span", {
				className: a("flex-1 text-[13px] leading-[1.4]", s ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ _("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ _("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: pe(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ v("span", {
				style: {
					fontSize: 10,
					fontWeight: 600,
					padding: "1px 6px",
					borderRadius: 10,
					background: o ? "var(--color-danger-bg)" : "#f0f9ff",
					color: o ? "var(--color-danger)" : "var(--color-neutral)",
					border: o ? "1px solid #fecaca" : "1px solid #e0f2fe",
					whiteSpace: "nowrap",
					flexShrink: 0
				},
				children: [o ? "⚠ " : "", fe(e.dueDate)]
			}),
			t && n && /* @__PURE__ */ v("select", {
				value: e.status,
				onChange: (n) => t(e.id, { status: n.target.value }),
				onClick: (e) => e.stopPropagation(),
				style: {
					fontSize: 10,
					padding: "1px 4px",
					borderRadius: 6,
					border: `1px solid ${i.color}`,
					background: i.bg,
					color: i.color,
					fontWeight: 600,
					cursor: "pointer",
					outline: "none",
					fontFamily: "inherit",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ _("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ _("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ _("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ _("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function me({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = e.items;
	if (r.length === 0) return /* @__PURE__ */ _("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "pending"), a = r.filter((e) => e.status === "done" || e.status === "acked"), o = r.filter((e) => e.status === "rejected");
	return /* @__PURE__ */ v("div", { children: [
		i.length > 0 && /* @__PURE__ */ _("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ _(K, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ _("div", {
			className: "mb-1",
			children: a.map((e) => /* @__PURE__ */ _(K, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		o.length > 0 && /* @__PURE__ */ _("div", { children: o.map((e) => /* @__PURE__ */ _(K, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function he({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: o }) {
	let s = m(null), c = e.status === "done";
	return f(() => {
		n && s.current && (s.current.focus(), r?.());
	}, [n, r]), /* @__PURE__ */ v("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ _("input", {
				type: "checkbox",
				checked: c,
				onChange: () => i({ status: c ? "pending" : "done" }),
				disabled: !t,
				className: a("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ _("input", {
				ref: s,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: a("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", c ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: o,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function ge({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = m(!1), d = () => {
		o?.({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}), u.current = !0;
	}, f = e.items.length, p = e.items.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ v("div", { children: [
		t && n && /* @__PURE__ */ _(z, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? "Add notes or context...",
			sectionId: e.id,
			onUpdateCursorInfo: l
		}),
		f > 0 && /* @__PURE__ */ v("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				p,
				" / ",
				f,
				" done"
			]
		}),
		/* @__PURE__ */ _("div", { children: e.items.map((t, n) => {
			let r = n === e.items.length - 1, i = u.current && r;
			return /* @__PURE__ */ _(he, {
				item: t,
				editable: a,
				autoFocus: i,
				onDidAutoFocus: i ? () => {
					u.current = !1;
				} : void 0,
				onUpdate: (e) => s?.(t.id, e),
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: d,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function q({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: i, onNavigateToEditor: o }) {
	let s = e.items, c = s.length, l = s.filter((e) => e.status === "done").length, u = c > 0 ? Math.round(l / c * 100) : 0;
	return /* @__PURE__ */ v("div", { children: [
		t && n && /* @__PURE__ */ _("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ _(z, {
				fragment: t,
				ydoc: n,
				provider: r ?? null,
				user: {
					name: "",
					color: "#6b7280"
				},
				editable: !1,
				sectionId: e.id
			})
		}),
		c > 0 && /* @__PURE__ */ v("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ v("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ v("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						l,
						" / ",
						c,
						" done"
					]
				}), /* @__PURE__ */ v("span", {
					className: a("text-[11px] font-semibold", u === 100 ? "text-success-fg" : "text-neutral"),
					children: [u, "%"]
				})]
			}), /* @__PURE__ */ _("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ _("div", {
					className: a("h-full rounded-sm transition-[width] duration-300", u === 100 ? "bg-success" : "bg-info"),
					style: { width: `${u}%` }
				})
			})]
		}),
		c === 0 ? /* @__PURE__ */ _("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ _("div", { children: s.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ v("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ _("input", {
					type: "checkbox",
					checked: t,
					onChange: () => i?.(e.id, { status: t ? "pending" : "done" }),
					className: a("w-3.5 h-3.5 accent-success shrink-0", i ? "cursor-pointer" : "cursor-default"),
					readOnly: !i
				}), /* @__PURE__ */ _("span", {
					className: a("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ _("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		o && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => o(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var _e = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
};
function ve() {
	return "";
}
function ye() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function be(e) {
	return _e[e] ?? null;
}
async function xe(e) {
	let t = e.documentId ?? ye();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = await fetch(`${ve()}/api/approvals`, {
			method: "POST",
			headers: n,
			body: JSON.stringify({
				documentId: t,
				sectionId: e.sectionId,
				decision: e.decision,
				...e.reviewerName ? { reviewerName: e.reviewerName } : {},
				...e.comment ? { comment: e.comment } : {}
			})
		});
		return r.ok ? { ok: !0 } : {
			ok: !1,
			error: `POST failed: ${r.status}`
		};
	} catch (e) {
		return {
			ok: !1,
			error: e.message
		};
	}
}
//#endregion
//#region src/renderers/decisions/DecisionsEditorRenderer.tsx
var J = {
	pending: {
		label: "Open",
		icon: "○",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	done: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Vetoed",
		icon: "✕",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
};
function Se({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: o }) {
	let s = m(null), c = J[e.status] ?? J.pending;
	return f(() => {
		n && s.current && (s.current.focus(), r?.());
	}, [n, r]), /* @__PURE__ */ v("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ _("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: c.bg,
					color: c.color
				},
				children: c.icon
			}),
			/* @__PURE__ */ _("input", {
				ref: s,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: a("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ v("select", {
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => i({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
				style: {
					border: `1px solid ${c.color}`,
					background: c.bg,
					color: c.color
				},
				children: [
					/* @__PURE__ */ _("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ _("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ _("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: o,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function Ce({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = m(!1);
	return /* @__PURE__ */ v("div", { children: [
		t && n && /* @__PURE__ */ _(z, {
			fragment: t,
			ydoc: n,
			provider: r ?? null,
			user: i ?? {
				name: "Anonymous",
				color: "#6b7280"
			},
			editable: a,
			placeholder: e.placeholder ?? "Add context or background...",
			sectionId: e.id,
			onUpdateCursorInfo: l
		}),
		e.items.length === 0 && !a && /* @__PURE__ */ _("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ _("div", { children: e.items.map((t, n) => {
			let r = n === e.items.length - 1, o = u.current && r;
			return /* @__PURE__ */ _(Se, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					u.current = !1;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = be(n.status);
						t && xe({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => {
				o?.({
					text: "",
					status: "pending",
					assignee: "",
					ackedBy: "",
					ackedAt: "",
					priority: "medium",
					notes: ""
				}), u.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var Y = {
	pending: {
		label: "Open",
		icon: "○",
		color: "var(--color-warning-fg)",
		bg: "var(--color-warning-bg)"
	},
	acked: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	done: {
		label: "Decided",
		icon: "✓",
		color: "var(--color-success-fg)",
		bg: "var(--color-success-bg)"
	},
	rejected: {
		label: "Vetoed",
		icon: "✕",
		color: "var(--color-danger-fg)",
		bg: "var(--color-danger-bg)"
	}
};
function we({ item: e }) {
	let t = Y[e.status] ?? Y.pending;
	return /* @__PURE__ */ v("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ _("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ _("span", {
				className: a("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ _("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ _("span", {
				className: "text-[10px] font-semibold px-2 py-0.5 rounded-[10px] whitespace-nowrap shrink-0",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.label
			})
		]
	});
}
function X({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ v("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ _("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ _(we, { item: e }, e.id))]
	});
}
function Z({ section: e, onNavigateToEditor: t }) {
	let n = e.items;
	if (n.length === 0) return /* @__PURE__ */ _("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "pending"), i = n.filter((e) => e.status === "acked" || e.status === "done"), a = n.filter((e) => e.status === "rejected");
	return /* @__PURE__ */ v("div", { children: [
		r.length > 0 && /* @__PURE__ */ _(X, {
			label: "Open",
			color: "#92400e",
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ _(X, {
			label: "Decided",
			color: "#065f46",
			items: i
		}),
		a.length > 0 && /* @__PURE__ */ _(X, {
			label: "Vetoed",
			color: "#991b1b",
			items: a
		}),
		t && /* @__PURE__ */ _("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function Te(e) {
	return e.metadata ?? {};
}
function Ee({ section: e, editable: t, onUpdateSection: n }) {
	let r = Te(e), [i, o] = h(!1), s = (t) => {
		o(!0);
		let r = new FileReader();
		r.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				fileName: t.name,
				fileDataUrl: typeof r.result == "string" ? r.result : "",
				fileSize: t.size
			} }), o(!1);
		}, r.onerror = () => o(!1), r.readAsDataURL(t);
	};
	return /* @__PURE__ */ _("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ v("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ _("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ _("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ v("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ _("button", {
					type: "button",
					"data-testid": `file-upload-remove-${e.id}`,
					onClick: () => {
						n?.({ metadata: {
							...e.metadata ?? {},
							fileName: void 0,
							fileDataUrl: void 0,
							fileSize: void 0
						} });
					},
					className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
					children: "×"
				})
			]
		}) : /* @__PURE__ */ v("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: a("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ _("input", {
				type: "file",
				"data-testid": `file-upload-input-${e.id}`,
				disabled: !t,
				className: "hidden",
				onChange: (e) => {
					let t = e.target.files?.[0];
					t && s(t);
				}
			})]
		})
	});
}
//#endregion
//#region src/renderers/file-upload/FileUploadReaderRenderer.tsx
function Q({ section: e }) {
	let t = e.metadata ?? {};
	return t.fileName ? /* @__PURE__ */ v("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ _("span", {
				className: "text-base",
				children: "📎"
			}),
			/* @__PURE__ */ v("a", {
				href: t.fileDataUrl ?? "#",
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ v("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	}) : /* @__PURE__ */ _("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function De({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [i, o] = h(!1), s = (t) => {
		o(!0);
		let i = new FileReader();
		i.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				imageDataUrl: typeof i.result == "string" ? i.result : "",
				alt: r.alt ?? t.name
			} }), o(!1);
		}, i.onerror = () => o(!1), i.readAsDataURL(t);
	}, c = (t) => {
		n?.({ metadata: {
			...e.metadata ?? {},
			alt: t
		} });
	};
	return /* @__PURE__ */ _("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ v("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ _("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ v("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ _("input", {
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ _("button", {
					type: "button",
					"data-testid": `diagram-remove-${e.id}`,
					onClick: () => {
						n?.({ metadata: {
							...e.metadata ?? {},
							imageDataUrl: void 0,
							alt: void 0
						} });
					},
					className: "bg-transparent border-none text-danger-fg cursor-pointer text-[13px]",
					children: "Remove"
				})]
			})]
		}) : /* @__PURE__ */ v("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: a("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ _("input", {
				type: "file",
				accept: "image/*",
				"data-testid": `diagram-input-${e.id}`,
				disabled: !t,
				className: "hidden",
				onChange: (e) => {
					let t = e.target.files?.[0];
					t && s(t);
				}
			})]
		})
	});
}
//#endregion
//#region src/renderers/diagram/DiagramReaderRenderer.tsx
function $({ section: e }) {
	let t = e.metadata ?? {};
	return t.imageDataUrl ? /* @__PURE__ */ v("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ _("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ _("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ _("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function Oe(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links : [];
}
function ke({ section: e, editable: t, onUpdateSection: n }) {
	let r = Oe(e), i = (t) => {
		n?.({ metadata: {
			...e.metadata ?? {},
			links: t
		} });
	}, a = () => i([...r, {
		label: "",
		url: ""
	}]), o = (e, t) => {
		i(r.map((n, r) => r === e ? {
			...n,
			...t
		} : n));
	}, s = (e) => {
		i(r.filter((t, n) => n !== e));
	};
	return /* @__PURE__ */ v("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ _("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ v("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ _("input", {
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ _("input", {
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ _("button", {
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ _("button", {
				type: "button",
				"data-testid": `link-block-add-${e.id}`,
				onClick: a,
				className: "self-start mt-1 px-3 py-1 text-xs bg-transparent border border-dashed border-border-emphasis text-primary rounded-md cursor-pointer",
				children: "+ Add link"
			})
		]
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockReaderRenderer.tsx
function Ae({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ _("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ _("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => /* @__PURE__ */ _("li", {
			className: "text-[13px]",
			children: /* @__PURE__ */ _("a", {
				href: e.url,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "text-primary font-medium no-underline",
				children: e.label || e.url
			})
		}, t))
	});
}
e(j), e(M), e(N), e(P), e(F), e(I), e(ee), t("*", "*", W), t("rich-text", "editor", se), t("rich-text", "ack", G), t("rich-text", "reader", G), t("tasks", "editor", ce), t("tasks", "ack", me), t("tasks", "reader", me), t("checklist", "editor", ge), t("checklist", "ack", q), t("checklist", "reader", q), t("decisions", "editor", Ce), t("decisions", "ack", Z), t("decisions", "reader", Z), t("file-upload", "editor", Ee), t("file-upload", "ack", Q), t("file-upload", "reader", Q), t("diagram", "editor", De), t("diagram", "ack", $), t("diagram", "reader", $), t("link-block", "editor", ke), t("link-block", "ack", Ae), t("link-block", "reader", Ae);
//#endregion
export { L as a, z as i, U as n, A as o, H as r, W as t };
