import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { c as n, s as r } from "./useWebSocket-BKfGpImp.js";
import { t as i } from "./useDocumentTypes-C-AMWgYq.js";
import { t as a } from "./cn-DhjIN-s0.js";
import { t as o } from "./useEventCallback-Cwx9QVSi.js";
import { t as s } from "./Modal-CyoyiNKN.js";
import { t as c } from "./Input-DLknWXri.js";
import { t as l } from "./Textarea-Dz4doxTv.js";
import { t as u } from "./Select-CqVokE2v.js";
import { t as d } from "./Checkbox-DsS7fIUO.js";
import { Component as f, useCallback as p, useEffect as m, useId as h, useMemo as g, useRef as _, useState as v } from "react";
import { Fragment as y, jsx as b, jsxs as x } from "react/jsx-runtime";
import * as S from "yjs";
import { EditorContent as C, useEditor as w } from "@tiptap/react";
import T from "@tiptap/starter-kit";
import E from "@tiptap/extension-task-list";
import D from "@tiptap/extension-task-item";
import O from "@tiptap/extension-placeholder";
import k from "@tiptap/extension-collaboration";
import { absolutePositionToRelativePosition as A, relativePositionToAbsolutePosition as j, ySyncPluginKey as M } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/NewDocumentModal.tsx
function N({ open: e, onClose: t, onCreate: n }) {
	let [r, o] = v([]), [u, d] = v(null), [f, p] = v(""), [g, S] = v(""), C = _(null), w = h(), T = `${w}-type-label`, E = `${w}-title`, D = `${w}-description`;
	if (m(() => {
		if (!e) return;
		let t = i();
		o(t), d(t[0]?.id ?? null), p(""), S("");
		let n = setTimeout(() => C.current?.focus(), 50);
		return () => clearTimeout(n);
	}, [e]), !e) return null;
	let O = r.find((e) => e.id === u), k = () => {
		let e = f.trim();
		!e || !O || (n({
			title: e,
			type: O.name,
			description: g.trim() || void 0,
			icon: O.icon,
			documentTypeId: O.id
		}), t());
	}, A = (e) => {
		e.key === "Enter" && !e.shiftKey && f.trim() && O && k();
	}, j = !!f.trim() && !!O;
	return /* @__PURE__ */ b(s, {
		open: e,
		onClose: t,
		ariaLabel: "Create New Document",
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
		children: /* @__PURE__ */ x("div", {
			onKeyDown: A,
			className: "contents",
			children: [
				/* @__PURE__ */ b("h2", {
					className: a("m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ b("div", {
					className: a("flex-1 overflow-y-auto px-6 min-h-0"),
					children: r.length === 0 ? /* @__PURE__ */ x("div", {
						className: a("text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-neutral"),
						children: [
							/* @__PURE__ */ b("div", {
								className: a("text-[40px] mb-3"),
								children: "📋"
							}),
							/* @__PURE__ */ b("div", {
								className: a("text-[15px] font-semibold mb-2 text-text-primary"),
								children: "No document types defined yet"
							}),
							/* @__PURE__ */ x("div", {
								className: a("text-[13px] text-text-tertiary max-w-xs mx-auto mb-4"),
								children: [
									"Document types define the sections and structure of your documents. Create one first in ",
									/* @__PURE__ */ b("strong", { children: "☰ → Document Types" }),
									"."
								]
							}),
							/* @__PURE__ */ b("button", {
								onClick: t,
								className: a("px-5 py-2 text-[13px] font-semibold bg-primary text-white border-none rounded-[7px] cursor-pointer font-[inherit]"),
								children: "Close"
							})
						]
					}) : /* @__PURE__ */ x(y, { children: [
						/* @__PURE__ */ x("div", {
							className: a("mb-5"),
							children: [/* @__PURE__ */ b("div", {
								id: T,
								className: a("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Document Type"
							}), /* @__PURE__ */ b("div", {
								role: "group",
								"aria-labelledby": T,
								className: a("grid grid-cols-2 gap-2"),
								children: r.map((e) => {
									let t = u === e.id;
									return /* @__PURE__ */ x("button", {
										type: "button",
										"data-testid": `type-option-${e.id}`,
										"aria-pressed": t,
										onClick: () => d(e.id),
										className: a("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
										children: [
											/* @__PURE__ */ b("span", {
												className: a("text-2xl shrink-0"),
												children: e.icon
											}),
											/* @__PURE__ */ x("div", {
												className: a("min-w-0"),
												children: [
													/* @__PURE__ */ b("div", {
														className: a("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
														children: e.name
													}),
													e.description && /* @__PURE__ */ b("div", {
														className: a("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
														children: e.description
													}),
													/* @__PURE__ */ x("div", {
														className: a("text-[11px] text-text-tertiary mt-0.5"),
														children: [
															e.fields.length,
															" section",
															e.fields.length === 1 ? "" : "s"
														]
													})
												]
											}),
											t && /* @__PURE__ */ b("span", {
												"aria-hidden": "true",
												className: a("absolute top-1.5 right-2 text-sm text-info-fg font-bold"),
												children: "✓"
											})
										]
									}, e.id);
								})
							})]
						}),
						/* @__PURE__ */ x("div", {
							className: a("mb-4"),
							children: [/* @__PURE__ */ x("label", {
								htmlFor: E,
								className: a("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Title ", /* @__PURE__ */ b("span", {
									className: a("text-danger-fg"),
									"aria-hidden": "true",
									children: "*"
								})]
							}), /* @__PURE__ */ b(c, {
								ref: C,
								id: E,
								required: !0,
								"aria-required": "true",
								"data-testid": "new-doc-title",
								value: f,
								onChange: (e) => p(e.target.value),
								placeholder: O ? `e.g. Q2 ${O.name}` : "Document title…"
							})]
						}),
						/* @__PURE__ */ x("div", {
							className: a("mb-5"),
							children: [/* @__PURE__ */ x("label", {
								htmlFor: D,
								className: a("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Description ", /* @__PURE__ */ b("span", {
									className: a("text-text-tertiary font-normal"),
									children: "(optional)"
								})]
							}), /* @__PURE__ */ b(l, {
								id: D,
								"data-testid": "new-doc-description",
								value: g,
								onChange: (e) => S(e.target.value),
								placeholder: "Brief description of this document…",
								rows: 3,
								className: a("resize-y")
							})]
						})
					] })
				}),
				r.length > 0 && /* @__PURE__ */ x("div", {
					className: a("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ b("button", {
						"data-testid": "new-doc-cancel",
						onClick: t,
						className: a("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ b("button", {
						"data-testid": "new-doc-submit",
						onClick: k,
						disabled: !j,
						className: a("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", j ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var P = class extends f {
	constructor(e) {
		super(e), this.state = {
			hasError: !1,
			error: null
		};
	}
	static getDerivedStateFromError(e) {
		return {
			hasError: !0,
			error: e
		};
	}
	componentDidCatch(e, t) {
		console.error(`[ErrorBoundary:${this.props.name}]`, e, t.componentStack);
	}
	handleRetry = () => {
		this.setState({
			hasError: !1,
			error: null
		});
	};
	render() {
		return this.state.hasError ? /* @__PURE__ */ x("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ b("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ b("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ b("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
}, ee = {
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
}, F = {
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
}, te = {
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
}, ne = {
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
}, re = {
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
}, ie = {
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
}, ae = {
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
}, oe = [
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
function se({ editor: e }) {
	return e ? /* @__PURE__ */ b("div", {
		className: a("flex flex-wrap gap-1 px-2 py-1.5 border-b border-border bg-surface-panel rounded-t-lg"),
		children: oe.map((t) => {
			let n = t.isActive(e);
			return /* @__PURE__ */ b("button", {
				type: "button",
				onClick: () => t.action(e),
				className: a("px-2 py-1 text-xs font-[inherit] border border-border-emphasis rounded cursor-pointer leading-snug", n ? "bg-info text-white" : "bg-surface text-text-primary"),
				title: t.label,
				children: t.label
			}, t.label);
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/TiptapEditor.tsx
function I(e, t, n) {
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
function ce({ cursors: e, editorView: t, containerEl: n }) {
	return t ? /* @__PURE__ */ b(y, { children: e.map((e) => {
		if (e.head == null) return null;
		let r = I(t, e.head, n);
		if (!r) return null;
		let i = e.name.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2) || e.name.slice(0, 2).toUpperCase(), a = [];
		if (e.anchor != null && e.anchor !== e.head) {
			let r = Math.min(e.anchor, e.head), i = Math.max(e.anchor, e.head);
			try {
				let o = t.dom.offsetWidth, s = r;
				for (; s <= i;) {
					let c = I(t, s, n);
					if (!c) break;
					let l = s, u = c.top;
					for (let e = s + 1; e <= i; e++) {
						let r = I(t, e, n);
						if (!r || Math.abs(r.top - u) > 2) break;
						l = e;
					}
					let d = I(t, l, n);
					if (d) {
						let t = s === r ? c.left : 0, n = l === i ? d.left + 4 : o;
						a.push(/* @__PURE__ */ b("div", {
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
		return /* @__PURE__ */ x("div", {
			className: "pointer-events-none",
			children: [
				a,
				/* @__PURE__ */ b("div", {
					className: "absolute w-0.5 opacity-40 rounded-[1px] pointer-events-none z-10 [animation:cursorBlink_1.2s_ease-in-out_infinite]",
					style: {
						top: r.top,
						left: r.left - 1,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ b("div", {
					className: "absolute w-2 opacity-[0.06] rounded pointer-events-none z-[9]",
					style: {
						top: r.top,
						left: r.left - 4,
						height: r.height || 18,
						background: e.color
					}
				}),
				/* @__PURE__ */ b("div", {
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
function L({ fragment: e, ydoc: t, provider: n, user: r, editable: i = !0, placeholder: o = "Start typing...", sectionId: s, onUpdateCursorInfo: c }) {
	let l = g(() => [
		T.configure({ history: !1 }),
		E,
		D.configure({ nested: !0 }),
		O.configure({ placeholder: o }),
		k.configure({
			document: t,
			fragment: e
		})
	], [t, e]), u = w({
		extensions: l,
		editable: i
	}, [l]), [d, f] = v([]), [h, _] = v(null);
	m(() => {
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
	let y = p(() => {
		if (!n?.awareness || !u?.view) return;
		let e = n.awareness.getStates(), t = n.awareness.clientID, r = [];
		e.forEach((e, n) => {
			if (n === t) return;
			let i = e.user;
			if (!(!i || !e.cursor) && !(s && e.cursor.sectionId !== s)) try {
				let t = M.getState(u.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let a = j(t.doc, t.type, S.createRelativePositionFromJSON(e.cursor.anchor), t.binding.mapping), o = j(t.doc, t.type, S.createRelativePositionFromJSON(e.cursor.head), t.binding.mapping);
				r.push({
					clientId: n,
					name: i.name || `User ${n}`,
					color: i.color || "var(--color-info)",
					anchor: a,
					head: o
				});
			} catch {}
		}), f(r);
	}, [
		n,
		u,
		s
	]);
	return m(() => {
		if (!u?.view || !n?.awareness) return;
		let e = () => {
			try {
				let e = M.getState(u.view.state);
				if (!e?.type || !e?.binding?.mapping) return;
				let { anchor: t, head: r } = u.view.state.selection, i = A(t, e.type, e.binding.mapping), a = A(r, e.type, e.binding.mapping);
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
	]), m(() => {
		if (!n?.awareness) return;
		let e = () => y();
		return n.awareness.on("change", e), () => {
			n.awareness.off("change", e);
		};
	}, [n, y]), /* @__PURE__ */ x("div", {
		className: a(i ? "border border-border rounded-lg overflow-hidden relative" : "relative"),
		children: [i && /* @__PURE__ */ b(se, { editor: u }), /* @__PURE__ */ x("div", {
			ref: _,
			className: a("px-4 py-3 text-sm leading-relaxed text-text-primary relative"),
			children: [/* @__PURE__ */ b(C, { editor: u }), /* @__PURE__ */ b(ce, {
				cursors: d,
				editorView: u?.view,
				containerEl: h
			})]
		})]
	});
}
//#endregion
//#region src/lib/dateOnly.ts
var le = /^(\d{4})-(\d{2})-(\d{2})$/;
function R(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	if (t === "") return null;
	let n = le.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]), r = Number(n[3]);
		if (t < 1 || t > 12 || r < 1 || r > 31) return null;
		let i = new Date(e, t - 1, r);
		return i.setFullYear(e, t - 1, r), i.getMonth() !== t - 1 || i.getDate() !== r ? null : i;
	}
	let r = new Date(t);
	return Number.isNaN(r.getTime()) ? null : r;
}
function z(e = /* @__PURE__ */ new Date()) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function B(e, t = /* @__PURE__ */ new Date()) {
	let n = R(e);
	return n ? z(n).getTime() < z(t).getTime() : !1;
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var ue = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, V = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, de = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function fe(e) {
	let t = R(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function pe(e) {
	return B(e);
}
function H(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function U({ item: e, editable: t, onUpdate: i, onRemove: o, autoFocusText: s, onDidAutoFocus: l }) {
	let [f, h] = v(!1), [g, S] = v(""), [C, w] = v(0), T = _(null), E = _(null), D = _(null), O = () => {
		i({ status: e.status === "done" ? "pending" : "done" });
	}, k = e.assignee ? r.find((t) => t.displayName === e.assignee) : void 0, A = g.trim() ? n(g) : r, j = p(() => {
		t && (S(""), w(0), h(!0));
	}, [t]), M = p(() => {
		h(!1), S(""), w(0);
	}, []), N = p((e) => {
		i({ assignee: e.displayName }), M();
	}, [i, M]), P = p(() => {
		i({ assignee: "" }), M();
	}, [i, M]);
	m(() => {
		if (!f) return;
		let e = (e) => {
			T.current && !T.current.contains(e.target) && M();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [f, M]), m(() => {
		f && E.current && E.current.focus();
	}, [f]), m(() => {
		w(0);
	}, [g]), m(() => {
		s && D.current && (D.current.focus(), l?.());
	}, [s, l]);
	let ee = (e) => {
		e.key === "Escape" ? M() : e.key === "ArrowDown" ? (e.preventDefault(), w((e) => Math.min(e + 1, A.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), w((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), A[C] && N(A[C]));
	}, F = e.dueDate && e.status !== "done" ? pe(e.dueDate) : !1;
	return /* @__PURE__ */ x("div", {
		className: a("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ b("span", {
				title: `Priority: ${e.priority}`,
				className: a("w-2 h-2 rounded-full shrink-0"),
				style: { background: V[e.priority] }
			}),
			/* @__PURE__ */ b(d, {
				checked: e.status === "done",
				onChange: O,
				disabled: !t,
				className: a("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ b(c, {
				ref: D,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				className: a("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ x("span", {
				title: e.dueDate,
				className: a("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", F ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					F ? "⚠ " : "",
					"Due: ",
					fe(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ b("span", {
				className: a("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: de[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ x("div", {
				ref: T,
				className: a("relative"),
				children: [/* @__PURE__ */ b("button", {
					type: "button",
					onClick: j,
					title: e.assignee || "Unassigned",
					className: a("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-surface text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ x(y, { children: [/* @__PURE__ */ b("span", {
						className: a("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: k?.color ?? "var(--color-text-tertiary)" },
						children: H(e.assignee)
					}), /* @__PURE__ */ b("span", {
						className: a("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), f && /* @__PURE__ */ x("div", {
					className: a("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ b("div", {
							className: a("px-2 py-1"),
							children: /* @__PURE__ */ b(c, {
								ref: E,
								size: "sm",
								value: g,
								onChange: (e) => S(e.target.value),
								onKeyDown: ee,
								placeholder: "Search users...",
								className: a("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ x("button", {
							type: "button",
							onClick: P,
							className: a("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ b("span", {
								className: a("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ b("span", {
								className: a("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						A.map((e, t) => /* @__PURE__ */ x("button", {
							type: "button",
							onClick: () => N(e),
							onMouseEnter: () => w(t),
							className: a("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === C ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ b("span", {
								className: a("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: H(e.displayName)
							}), /* @__PURE__ */ b("span", { children: e.displayName })]
						}, e.userId)),
						A.length === 0 && /* @__PURE__ */ b("div", {
							className: a("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ b(u, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => i({ priority: e.target.value }),
				className: a("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: V[e.priority] },
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
			/* @__PURE__ */ b(u, {
				value: e.status,
				disabled: !t,
				onChange: (e) => i({ status: e.target.value }),
				className: a("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: ue[e.status] },
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
			t && /* @__PURE__ */ b("button", {
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
function W({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: i }) {
	if (e.length === 0) return /* @__PURE__ */ b("div", {
		className: a("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let o = i?.current ?? !1;
	return /* @__PURE__ */ b("div", {
		className: a("py-2"),
		children: e.map((a, s) => /* @__PURE__ */ b(U, {
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
//#region src/renderers/sectionItems.ts
function G(e) {
	let t = e.items;
	return Array.isArray(t) ? t.filter((e) => e != null) : [];
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function K({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = G(e), d = _(!1);
	return /* @__PURE__ */ x("div", { children: [
		t && n && /* @__PURE__ */ b(L, {
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
		(u.length > 0 || a) && /* @__PURE__ */ b(W, {
			items: u,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: d
		}),
		a && /* @__PURE__ */ b("button", {
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
				}), d.current = !0;
			},
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/rich-text/RichTextEditorRenderer.tsx
function me({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o }) {
	return !t || !n ? /* @__PURE__ */ b("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ b(L, {
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
function q({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i }) {
	return /* @__PURE__ */ x("div", { children: [t && n ? /* @__PURE__ */ b("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ b(L, {
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
	}) : /* @__PURE__ */ b("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ b("button", {
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function he({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = G(e), o = _(!1);
	return /* @__PURE__ */ x("div", {
		className: "py-1",
		children: [
			a.length > 0 || t ? /* @__PURE__ */ b(W, {
				items: a,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: o
			}) : null,
			a.length === 0 && !t && /* @__PURE__ */ b("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ b("button", {
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
					}), o.current = !0;
				},
				className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
				children: "+ Add item"
			})
		]
	});
}
//#endregion
//#region src/renderers/tasks/TasksReaderRenderer.tsx
var J = {
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
}, ge = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function _e(e) {
	return B(e);
}
function ve(e) {
	let t = R(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function ye(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Y({ item: e, onUpdateItem: t }) {
	let [n, r] = v(!1), [i, o] = v(!1), s = n || i, c = J[e.status] ?? J.pending, l = ge[e.priority] ?? ge.medium, u = e.dueDate && e.status === "pending" ? _e(e.dueDate) : !1, d = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ x("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		onFocus: () => o(!0),
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || o(!1);
		},
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: d ? .65 : 1 },
		children: [
			/* @__PURE__ */ b("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: l,
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ b("button", {
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
					border: `2px solid ${c.color}`,
					background: d ? c.color : "transparent",
					cursor: t ? "pointer" : "default",
					flexShrink: 0,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					padding: 0
				},
				children: d && /* @__PURE__ */ b("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ b("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ b("span", {
				className: a("flex-1 text-[13px] leading-[1.4]", d ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ b("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ b("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: ye(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ x("span", {
				style: {
					fontSize: 10,
					fontWeight: 600,
					padding: "1px 6px",
					borderRadius: 10,
					background: u ? "var(--color-danger-bg)" : "var(--color-info-bg)",
					color: u ? "var(--color-danger)" : "var(--color-neutral)",
					border: u ? "1px solid var(--color-danger-border)" : "1px solid var(--color-info-border)",
					whiteSpace: "nowrap",
					flexShrink: 0
				},
				children: [u ? "⚠ " : "", ve(e.dueDate)]
			}),
			t && s && /* @__PURE__ */ x("select", {
				"aria-label": `Set status for ${e.text || "untitled item"}`,
				value: e.status,
				onChange: (n) => t(e.id, { status: n.target.value }),
				onClick: (e) => e.stopPropagation(),
				style: {
					fontSize: 10,
					padding: "1px 4px",
					borderRadius: 6,
					border: `1px solid ${c.color}`,
					background: c.bg,
					color: c.color,
					fontWeight: 600,
					cursor: "pointer",
					outline: "none",
					fontFamily: "inherit",
					flexShrink: 0
				},
				children: [
					/* @__PURE__ */ b("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ b("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ b("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ b("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function be({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = G(e);
	if (r.length === 0) return /* @__PURE__ */ b("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "done" || e.status === "acked"), a = r.filter((e) => e.status === "rejected"), o = r.filter((e) => !i.includes(e) && !a.includes(e));
	return /* @__PURE__ */ x("div", { children: [
		o.length > 0 && /* @__PURE__ */ b("div", {
			className: "mb-1",
			children: o.map((e) => /* @__PURE__ */ b(Y, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		i.length > 0 && /* @__PURE__ */ b("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ b(Y, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ b("div", { children: a.map((e) => /* @__PURE__ */ b(Y, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ b("button", {
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function xe({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: s }) {
	let c = _(null), l = e.status === "done", u = o(r);
	return m(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ x("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ b("input", {
				type: "checkbox",
				checked: l,
				onChange: () => i({ status: l ? "pending" : "done" }),
				disabled: !t,
				className: a("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ b("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: a("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", l ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ b("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function Se({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = G(e), d = _(null), f = () => {
		o && (d.current = u.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, p = d.current, m = p !== null && u.length > p, h = u.length, g = u.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ x("div", { children: [
		t && n && /* @__PURE__ */ b(L, {
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
		h > 0 && /* @__PURE__ */ x("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				g,
				" / ",
				h,
				" done"
			]
		}),
		/* @__PURE__ */ b("div", { children: u.map((e, t) => {
			let n = t === u.length - 1, r = m && n;
			return /* @__PURE__ */ b(xe, {
				item: e,
				editable: a,
				autoFocus: r,
				onDidAutoFocus: r ? () => {
					d.current = null;
				} : void 0,
				onUpdate: (t) => s?.(e.id, t),
				onRemove: () => c?.(e.id)
			}, e.id);
		}) }),
		a && /* @__PURE__ */ b("button", {
			type: "button",
			onClick: f,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function Ce({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: i, onNavigateToEditor: o }) {
	let s = G(e), c = s.length, l = s.filter((e) => e.status === "done").length, u = c > 0 ? Math.round(l / c * 100) : 0;
	return /* @__PURE__ */ x("div", { children: [
		t && n && /* @__PURE__ */ b("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ b(L, {
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
		c > 0 && /* @__PURE__ */ x("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ x("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ x("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						l,
						" / ",
						c,
						" done"
					]
				}), /* @__PURE__ */ x("span", {
					className: a("text-[11px] font-semibold", u === 100 ? "text-success-fg" : "text-neutral"),
					children: [u, "%"]
				})]
			}), /* @__PURE__ */ b("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ b("div", {
					className: a("h-full rounded-sm transition-[width] duration-300", u === 100 ? "bg-success" : "bg-info"),
					style: { width: `${u}%` }
				})
			})]
		}),
		c === 0 ? /* @__PURE__ */ b("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ b("div", { children: s.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ x("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ b("input", {
					type: "checkbox",
					checked: t,
					onChange: () => i?.(e.id, { status: t ? "pending" : "done" }),
					className: a("w-3.5 h-3.5 accent-success shrink-0", i ? "cursor-pointer" : "cursor-default"),
					readOnly: !i
				}), /* @__PURE__ */ b("span", {
					className: a("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ b("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		o && /* @__PURE__ */ b("button", {
			type: "button",
			onClick: () => o(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var we = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
};
function Te() {
	return "";
}
function Ee() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function De(e) {
	return we[e] ?? null;
}
async function Oe(e) {
	let t = e.documentId ?? Ee();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = await fetch(`${Te()}/api/approvals`, {
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
var ke = {
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
function Ae({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: s }) {
	let c = _(null), l = ke[e.status] ?? ke.pending, u = o(r);
	return m(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ x("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ b("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: l.bg,
					color: l.color
				},
				children: l.icon
			}),
			/* @__PURE__ */ b("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: a("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ x("select", {
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => i({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
				style: {
					border: `1px solid ${l.color}`,
					background: l.bg,
					color: l.color
				},
				children: [
					/* @__PURE__ */ b("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ b("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ b("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ b("button", {
				type: "button",
				onClick: s,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function je({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = G(e), d = _(null), f = () => {
		o && (d.current = u.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, p = d.current, m = p !== null && u.length > p;
	return /* @__PURE__ */ x("div", { children: [
		t && n && /* @__PURE__ */ b(L, {
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
		u.length === 0 && !a && /* @__PURE__ */ b("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ b("div", { children: u.map((t, n) => {
			let r = n === u.length - 1, o = m && r;
			return /* @__PURE__ */ b(Ae, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					d.current = null;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = De(n.status);
						t && Oe({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ b("button", {
			type: "button",
			onClick: f,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var X = {
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
function Me({ item: e }) {
	let t = X[e.status] ?? X.pending;
	return /* @__PURE__ */ x("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ b("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ b("span", {
				className: a("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ b("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ b("span", {
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
function Z({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ x("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ b("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ b(Me, { item: e }, e.id))]
	});
}
function Ne({ section: e, onNavigateToEditor: t }) {
	let n = G(e);
	if (n.length === 0) return /* @__PURE__ */ b("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "acked" || e.status === "done"), i = n.filter((e) => e.status === "rejected"), a = n.filter((e) => !r.includes(e) && !i.includes(e));
	return /* @__PURE__ */ x("div", { children: [
		a.length > 0 && /* @__PURE__ */ b(Z, {
			label: "Open",
			color: X.pending.color,
			items: a
		}),
		r.length > 0 && /* @__PURE__ */ b(Z, {
			label: "Decided",
			color: X.acked.color,
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ b(Z, {
			label: "Vetoed",
			color: X.rejected.color,
			items: i
		}),
		t && /* @__PURE__ */ b("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function Pe(e) {
	return e.metadata ?? {};
}
function Fe({ section: e, editable: t, onUpdateSection: n }) {
	let r = Pe(e), [i, o] = v(!1), s = (t) => {
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
	return /* @__PURE__ */ b("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ x("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ b("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ b("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ x("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ b("button", {
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
		}) : /* @__PURE__ */ x("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: a("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ b("input", {
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
	return t.fileName ? /* @__PURE__ */ x("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ b("span", {
				className: "text-base",
				children: "📎"
			}),
			/* @__PURE__ */ x("a", {
				href: t.fileDataUrl ?? "#",
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ x("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	}) : /* @__PURE__ */ b("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function Ie({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [i, o] = v(!1), s = (t) => {
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
	return /* @__PURE__ */ b("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ x("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ b("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ x("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ b("input", {
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ b("button", {
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
		}) : /* @__PURE__ */ x("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: a("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ b("input", {
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
function Le({ section: e }) {
	let t = e.metadata ?? {};
	return t.imageDataUrl ? /* @__PURE__ */ x("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ b("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ b("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ b("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function Re(e) {
	return typeof e == "object" && !!e;
}
function ze(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links.filter(Re).map((e) => ({
		label: typeof e.label == "string" ? e.label : "",
		url: typeof e.url == "string" ? e.url : ""
	})) : [];
}
function Be({ section: e, editable: t, onUpdateSection: n }) {
	let r = ze(e), i = (t) => {
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
	return /* @__PURE__ */ x("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ b("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ x("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ b("input", {
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ b("input", {
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ b("button", {
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ b("button", {
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
function Ve(e) {
	return typeof e == "object" && !!e && typeof e.url == "string";
}
function $({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => Ve(e) && e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ b("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ b("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => /* @__PURE__ */ b("li", {
			className: "text-[13px]",
			children: /* @__PURE__ */ b("a", {
				href: e.url,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "text-primary font-medium no-underline",
				children: e.label || e.url
			})
		}, t))
	});
}
e(ee), e(F), e(te), e(ne), e(re), e(ie), e(ae), t("*", "*", K), t("rich-text", "editor", me), t("rich-text", "ack", q), t("rich-text", "reader", q), t("tasks", "editor", he), t("tasks", "ack", be), t("tasks", "reader", be), t("checklist", "editor", Se), t("checklist", "ack", Ce), t("checklist", "reader", Ce), t("decisions", "editor", je), t("decisions", "ack", Ne), t("decisions", "reader", Ne), t("file-upload", "editor", Fe), t("file-upload", "ack", Q), t("file-upload", "reader", Q), t("diagram", "editor", Ie), t("diagram", "ack", Le), t("diagram", "reader", Le), t("link-block", "editor", Be), t("link-block", "ack", $), t("link-block", "reader", $);
//#endregion
export { se as a, L as i, W as n, P as o, U as r, N as s, K as t };
