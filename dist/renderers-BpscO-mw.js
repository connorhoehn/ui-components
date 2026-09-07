import { a as e, o as t } from "./registry-DbX3MVAA.js";
import { o as n, s as r } from "./useVideoSessions-CQvF7-8H.js";
import { n as i, t as a } from "./useDocumentTypes-CrsHC24c.js";
import { t as o } from "./cn-DhjIN-s0.js";
import { t as s } from "./useEventCallback-Cwx9QVSi.js";
import { t as c } from "./SelectableCard-BVSflqyL.js";
import { t as l } from "./Chip-YhQI5B9P.js";
import { t as u } from "./Modal-CyoyiNKN.js";
import { t as d } from "./Input-DLknWXri.js";
import { t as f } from "./Textarea-Dz4doxTv.js";
import { t as p } from "./Select-CqVokE2v.js";
import { t as m } from "./Checkbox-DsS7fIUO.js";
import { t as h } from "./TiptapEditor-Dn9rUdZx.js";
import { Component as g, useCallback as _, useEffect as v, useId as y, useRef as b, useState as x } from "react";
import { Fragment as ee, jsx as S, jsxs as C } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var w = [
	{
		id: "page",
		icon: "📄",
		name: "Page",
		description: "One continuous document. Headings, paragraphs, lists and tables flow down a single sheet — like Google Docs or Confluence."
	},
	{
		id: "sections",
		icon: "🗂️",
		name: "Sections",
		description: "A structured set of section forms — task lists, decisions and notes, each in its own box. Better as a todo creator or a notepad."
	},
	{
		id: "diagram",
		icon: "🖉",
		name: "Diagram",
		description: "A whiteboard. Shapes, arrows and text on an infinite canvas, drawn with others in real time — opens full width with the sidebar out of the way."
	}
];
function T({ open: e, onClose: t, onCreate: n }) {
	let [r, s] = x([]), [p, m] = x(!1), [h, g] = x(null), [_, T] = x(""), [E, D] = x(""), [O, k] = x("page"), A = b(null), j = y(), M = `${j}-shape-label`, N = `${j}-type-label`, P = `${j}-title`, F = `${j}-description`;
	if (v(() => {
		if (!e) return;
		let t = a();
		s(t), g(t[0]?.id ?? null), T(""), D(""), k("page");
		let n = !1;
		m(!0), i().then((e) => {
			if (n) return;
			let t = e.ok ? e.types : e.cached;
			s(t), g((e) => e && t.some((t) => t.id === e) ? e : t[0]?.id ?? null);
		}).finally(() => {
			n || m(!1);
		});
		let r = setTimeout(() => A.current?.focus(), 50);
		return () => {
			n = !0, clearTimeout(r);
		};
	}, [e]), !e) return null;
	let I = r.find((e) => e.id === h), L = O === "sections", R = r.length === 0 && !p, z = () => {
		let e = _.trim();
		if (!e || L && !I) return;
		let r = O === "diagram" ? void 0 : I;
		n({
			title: e,
			type: O === "diagram" ? "Diagram" : r ? r.name : "Document",
			description: E.trim() || void 0,
			icon: O === "diagram" ? "🖉" : r ? r.icon : "📄",
			...r ? { documentTypeId: r.id } : {},
			shape: O
		}), t();
	}, B = !!_.trim() && (!L || !!I);
	return /* @__PURE__ */ S(u, {
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
		children: /* @__PURE__ */ C("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && B && z();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ S("h2", {
					className: o("m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ S("div", {
					className: o("flex-1 overflow-y-auto px-6 min-h-0"),
					children: r.length === 0 && p ? /* @__PURE__ */ S("div", {
						className: o("text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-text-tertiary"),
						children: /* @__PURE__ */ S("div", {
							className: o("text-[13px]"),
							children: "Loading document types…"
						})
					}) : /* @__PURE__ */ C(ee, { children: [
						/* @__PURE__ */ C("div", {
							className: o("mb-5"),
							children: [/* @__PURE__ */ S("div", {
								id: M,
								className: o("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "How is this document written?"
							}), /* @__PURE__ */ S("div", {
								role: "group",
								"aria-labelledby": M,
								className: o("grid grid-cols-2 gap-2"),
								children: w.map((e) => /* @__PURE__ */ C(c, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => k(e.id),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ C("div", {
										className: o("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ S("span", {
												className: o("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ S("span", {
												className: o("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ S(l, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ S("div", {
										className: o("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O !== "diagram" && /* @__PURE__ */ C("div", {
							className: o("mb-5"),
							children: [
								/* @__PURE__ */ C("div", {
									className: o("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ S("span", {
										id: N,
										className: o("block text-[13px] font-semibold text-text-secondary"),
										children: "Document Type"
									}), !L && /* @__PURE__ */ S("span", {
										className: o("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								R && /* @__PURE__ */ S("div", {
									"data-testid": "no-document-types",
									className: o("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: L ? "Sections come from a document type, and none are defined yet. Define one in ☰ → Document Types, or make a page instead — it needs no type." : "No document types yet. A page does not need one; define types in ☰ → Document Types when you want a reusable icon and structure."
								}),
								/* @__PURE__ */ S("div", {
									role: "group",
									"aria-labelledby": N,
									className: o("grid grid-cols-2 gap-2"),
									children: r.map((e) => {
										let t = h === e.id;
										return /* @__PURE__ */ C("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => g(e.id),
											className: o("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ S("span", {
													className: o("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ C("div", {
													className: o("min-w-0"),
													children: [
														/* @__PURE__ */ S("div", {
															className: o("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ S("div", {
															className: o("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ S("div", {
															className: o("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : "Sets the icon and type"
														})
													]
												}),
												t && /* @__PURE__ */ S("span", {
													"aria-hidden": "true",
													className: o("absolute top-1.5 right-2 text-sm text-info-fg font-bold"),
													children: "✓"
												})
											]
										}, e.id);
									})
								})
							]
						}),
						/* @__PURE__ */ C("div", {
							className: o("mb-4"),
							children: [/* @__PURE__ */ C("label", {
								htmlFor: P,
								className: o("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Title ", /* @__PURE__ */ S("span", {
									className: o("text-danger-fg"),
									"aria-hidden": "true",
									children: "*"
								})]
							}), /* @__PURE__ */ S(d, {
								ref: A,
								id: P,
								required: !0,
								"aria-required": "true",
								"data-testid": "new-doc-title",
								value: _,
								onChange: (e) => T(e.target.value),
								placeholder: I ? `e.g. Q2 ${I.name}` : "Document title…"
							})]
						}),
						/* @__PURE__ */ C("div", {
							className: o("mb-5"),
							children: [/* @__PURE__ */ C("label", {
								htmlFor: F,
								className: o("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Description ", /* @__PURE__ */ S("span", {
									className: o("text-text-tertiary font-normal"),
									children: "(optional)"
								})]
							}), /* @__PURE__ */ S(f, {
								id: F,
								"data-testid": "new-doc-description",
								value: E,
								onChange: (e) => D(e.target.value),
								placeholder: "Brief description of this document…",
								rows: 3,
								className: o("resize-y")
							})]
						})
					] })
				}),
				!(r.length === 0 && p) && /* @__PURE__ */ C("div", {
					className: o("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ S("button", {
						"data-testid": "new-doc-cancel",
						onClick: t,
						className: o("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ S("button", {
						"data-testid": "new-doc-submit",
						onClick: z,
						disabled: !B,
						className: o("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", B ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var E = class extends g {
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
		return this.state.hasError ? /* @__PURE__ */ C("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ S("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ S("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ S("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
}, D = {
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
}, O = {
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
}, k = {
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
}, A = {
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
}, j = {
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
}, M = {
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
}, N = {
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
}, P = /^(\d{4})-(\d{2})-(\d{2})$/;
function F(e) {
	if (typeof e != "string") return null;
	let t = e.trim();
	if (t === "") return null;
	let n = P.exec(t);
	if (n) {
		let e = Number(n[1]), t = Number(n[2]), r = Number(n[3]);
		if (t < 1 || t > 12 || r < 1 || r > 31) return null;
		let i = new Date(e, t - 1, r);
		return i.setFullYear(e, t - 1, r), i.getMonth() !== t - 1 || i.getDate() !== r ? null : i;
	}
	let r = new Date(t);
	return Number.isNaN(r.getTime()) ? null : r;
}
function I(e = /* @__PURE__ */ new Date()) {
	let t = new Date(e.getTime());
	return t.setHours(0, 0, 0, 0), t;
}
function L(e, t = /* @__PURE__ */ new Date()) {
	let n = F(e);
	return n ? I(n).getTime() < I(t).getTime() : !1;
}
//#endregion
//#region src/components/doc-editor/TaskItemRow.tsx
var R = {
	pending: "var(--color-text-tertiary)",
	acked: "var(--color-info)",
	done: "var(--color-success)",
	rejected: "var(--color-danger)"
}, z = {
	low: "var(--color-text-tertiary)",
	medium: "var(--color-caution)",
	high: "var(--color-danger)"
}, B = {
	start: "var(--color-success)",
	stop: "var(--color-danger)",
	continue: "var(--color-info)"
};
function te(e) {
	let t = F(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function ne(e) {
	return L(e);
}
function re(e) {
	return e.split(/\s+/).map((e) => e[0]).join("").toUpperCase().slice(0, 2);
}
function ie({ item: e, editable: t, onUpdate: i, onRemove: a, autoFocusText: s, onDidAutoFocus: c }) {
	let [l, u] = x(!1), [f, h] = x(""), [g, y] = x(0), w = b(null), T = b(null), E = b(null), D = () => {
		i({ status: e.status === "done" ? "pending" : "done" });
	}, O = e.assignee ? n.find((t) => t.displayName === e.assignee) : void 0, k = f.trim() ? r(f) : n, A = _(() => {
		t && (h(""), y(0), u(!0));
	}, [t]), j = _(() => {
		u(!1), h(""), y(0);
	}, []), M = _((e) => {
		i({ assignee: e.displayName }), j();
	}, [i, j]), N = _(() => {
		i({ assignee: "" }), j();
	}, [i, j]);
	v(() => {
		if (!l) return;
		let e = (e) => {
			w.current && !w.current.contains(e.target) && j();
		};
		return document.addEventListener("mousedown", e), () => document.removeEventListener("mousedown", e);
	}, [l, j]), v(() => {
		l && T.current && T.current.focus();
	}, [l]), v(() => {
		y(0);
	}, [f]), v(() => {
		s && E.current && (E.current.focus(), c?.());
	}, [s, c]);
	let P = (e) => {
		e.key === "Escape" ? j() : e.key === "ArrowDown" ? (e.preventDefault(), y((e) => Math.min(e + 1, k.length - 1))) : e.key === "ArrowUp" ? (e.preventDefault(), y((e) => Math.max(e - 1, 0))) : e.key === "Enter" && (e.preventDefault(), k[g] && M(k[g]));
	}, F = e.dueDate && e.status !== "done" ? ne(e.dueDate) : !1;
	return /* @__PURE__ */ C("div", {
		className: o("flex items-center gap-2 py-1.5 border-b border-border-subtle"),
		children: [
			/* @__PURE__ */ S("span", {
				title: `Priority: ${e.priority}`,
				className: o("w-2 h-2 rounded-full shrink-0"),
				style: { background: z[e.priority] }
			}),
			/* @__PURE__ */ S(m, {
				checked: e.status === "done",
				onChange: D,
				disabled: !t,
				className: o("w-4 h-4", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ S(d, {
				ref: E,
				"data-testid": `task-text-${e.id}`,
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				className: o("flex-1 h-auto border-transparent bg-transparent px-1 py-0.5", e.status === "done" ? "line-through text-text-tertiary" : "text-text-primary")
			}),
			e.dueDate && /* @__PURE__ */ C("span", {
				title: e.dueDate,
				className: o("inline-block px-2 py-0.5 text-[10px] font-semibold rounded-xl whitespace-nowrap leading-snug border", F ? "bg-danger-bg text-danger-fg border-danger-border" : "bg-info-bg text-neutral border-info-border"),
				children: [
					F ? "⚠ " : "",
					"Due: ",
					te(e.dueDate)
				]
			}),
			e.category && /* @__PURE__ */ S("span", {
				className: o("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap"),
				style: { backgroundColor: B[e.category.toLowerCase()] ?? "var(--color-neutral)" },
				children: e.category
			}),
			/* @__PURE__ */ C("div", {
				ref: w,
				className: o("relative"),
				children: [/* @__PURE__ */ S("button", {
					type: "button",
					onClick: A,
					title: e.assignee || "Unassigned",
					className: o("inline-flex items-center justify-center h-6 rounded-xl font-semibold text-[11px] cursor-pointer leading-snug whitespace-nowrap", e.assignee ? "px-2 bg-primary-bg text-primary-fg border-none min-w-0" : "w-6 px-0 bg-surface text-text-tertiary border border-dashed border-border-emphasis"),
					children: e.assignee ? /* @__PURE__ */ C(ee, { children: [/* @__PURE__ */ S("span", {
						className: o("w-[18px] h-[18px] rounded-full text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0 leading-none"),
						style: { background: O?.color ?? "var(--color-text-tertiary)" },
						children: re(e.assignee)
					}), /* @__PURE__ */ S("span", {
						className: o("ml-1 text-[11px]"),
						children: e.assignee.split(" ")[0]
					})] }) : "+"
				}), l && /* @__PURE__ */ C("div", {
					className: o("absolute top-full left-0 mt-1 min-w-[180px] max-h-[200px] overflow-y-auto bg-surface border border-border rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.12)] z-[1000] py-1"),
					children: [
						/* @__PURE__ */ S("div", {
							className: o("px-2 py-1"),
							children: /* @__PURE__ */ S(d, {
								ref: T,
								size: "sm",
								value: f,
								onChange: (e) => h(e.target.value),
								onKeyDown: P,
								placeholder: "Search users...",
								className: o("text-[11px]")
							})
						}),
						e.assignee && /* @__PURE__ */ C("button", {
							type: "button",
							onClick: N,
							className: o("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer bg-transparent border-none w-full text-left font-[inherit] text-text-primary"),
							children: [/* @__PURE__ */ S("span", {
								className: o("w-[22px] h-[22px] rounded-full bg-border-emphasis text-neutral inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								children: "--"
							}), /* @__PURE__ */ S("span", {
								className: o("text-neutral italic"),
								children: "Unassigned"
							})]
						}),
						k.map((e, t) => /* @__PURE__ */ C("button", {
							type: "button",
							onClick: () => M(e),
							onMouseEnter: () => y(t),
							className: o("flex items-center gap-2 py-1.5 px-2.5 text-xs cursor-pointer border-none w-full text-left font-[inherit] text-text-primary", t === g ? "bg-surface-hover" : "bg-transparent"),
							children: [/* @__PURE__ */ S("span", {
								className: o("w-[22px] h-[22px] rounded-full text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0 leading-none"),
								style: { background: e.color },
								children: re(e.displayName)
							}), /* @__PURE__ */ S("span", { children: e.displayName })]
						}, e.userId)),
						k.length === 0 && /* @__PURE__ */ S("div", {
							className: o("px-2.5 py-2 text-[11px] text-text-tertiary"),
							children: "No users found"
						})
					]
				})]
			}),
			/* @__PURE__ */ S(p, {
				value: e.priority,
				disabled: !t,
				onChange: (e) => i({ priority: e.target.value }),
				className: o("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: z[e.priority] },
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
			/* @__PURE__ */ S(p, {
				value: e.status,
				disabled: !t,
				onChange: (e) => i({ status: e.target.value }),
				className: o("w-auto h-auto inline-block px-2 py-0.5 pr-4 text-[11px] font-semibold rounded-xl text-white capitalize leading-snug whitespace-nowrap border-none appearance-none doc-select-arrow", t ? "cursor-pointer" : "cursor-default"),
				style: { backgroundColor: R[e.status] },
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
			t && /* @__PURE__ */ S("button", {
				type: "button",
				onClick: a,
				title: "Remove task",
				className: o("border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 rounded leading-none"),
				children: "x"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/TaskList.tsx
function V({ items: e, editable: t, onUpdateItem: n, onRemoveItem: r, focusLastItem: i }) {
	if (e.length === 0) return /* @__PURE__ */ S("div", {
		className: o("text-text-tertiary text-[13px] italic py-2"),
		children: "No tasks yet."
	});
	let a = i?.current ?? !1;
	return /* @__PURE__ */ S("div", {
		className: o("py-2"),
		children: e.map((o, s) => /* @__PURE__ */ S(ie, {
			item: o,
			editable: t,
			onUpdate: (e) => n(o.id, e),
			onRemove: () => r(o.id),
			autoFocusText: a && s === e.length - 1,
			onDidAutoFocus: a && s === e.length - 1 ? () => {
				i && (i.current = !1);
			} : void 0
		}, o.id))
	});
}
//#endregion
//#region src/renderers/sectionItems.ts
function H(e) {
	let t = e.items;
	return Array.isArray(t) ? t.filter((e) => e != null) : [];
}
//#endregion
//#region src/renderers/default/DefaultRenderer.tsx
function U({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = H(e), d = b(!1);
	return /* @__PURE__ */ C("div", { children: [
		t && n && /* @__PURE__ */ S(h, {
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
		(u.length > 0 || a) && /* @__PURE__ */ S(V, {
			items: u,
			editable: a,
			onUpdateItem: (e, t) => s?.(e, t),
			onRemoveItem: (e) => c?.(e),
			focusLastItem: d
		}),
		a && /* @__PURE__ */ S("button", {
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
function ae({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onUpdateCursorInfo: o }) {
	return !t || !n ? /* @__PURE__ */ S("div", {
		className: "text-text-tertiary italic text-[13px] py-2",
		children: "No content yet."
	}) : /* @__PURE__ */ S(h, {
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
function W({ section: e, fragment: t, ydoc: n, provider: r, onNavigateToEditor: i }) {
	return /* @__PURE__ */ C("div", { children: [t && n ? /* @__PURE__ */ S("div", {
		className: "border border-info-border border-l-[3px] border-l-info rounded-md px-3.5 py-2.5 bg-info-bg text-sm text-text-primary leading-[1.6]",
		children: /* @__PURE__ */ S(h, {
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
	}) : /* @__PURE__ */ S("div", {
		className: "text-text-tertiary italic text-[13px]",
		children: "No content."
	}), i && /* @__PURE__ */ S("button", {
		type: "button",
		onClick: () => i(e.id),
		className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
		children: "Edit in editor →"
	})] });
}
//#endregion
//#region src/renderers/tasks/TasksEditorRenderer.tsx
function oe({ section: e, editable: t, onAddItem: n, onUpdateItem: r, onRemoveItem: i }) {
	let a = H(e), o = b(!1);
	return /* @__PURE__ */ C("div", {
		className: "py-1",
		children: [
			a.length > 0 || t ? /* @__PURE__ */ S(V, {
				items: a,
				editable: t,
				onUpdateItem: (e, t) => r?.(e, t),
				onRemoveItem: (e) => i?.(e),
				focusLastItem: o
			}) : null,
			a.length === 0 && !t && /* @__PURE__ */ S("p", {
				className: "text-text-tertiary text-[13px] italic my-2",
				children: "No items yet."
			}),
			t && /* @__PURE__ */ S("button", {
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
var G = {
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
}, K = {
	high: "var(--color-danger)",
	medium: "var(--color-caution)",
	low: "var(--color-text-tertiary)"
};
function se(e) {
	return L(e);
}
function ce(e) {
	let t = F(e);
	return t ? t.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	}) : e;
}
function le(e) {
	return e.split(/\s+/).map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function q({ item: e, onUpdateItem: t }) {
	let [n, r] = x(!1), [i, a] = x(!1), s = n || i, c = G[e.status] ?? G.pending, l = K[e.priority] ?? K.medium, u = e.dueDate && e.status === "pending" ? se(e.dueDate) : !1, d = e.status === "done" || e.status === "acked";
	return /* @__PURE__ */ C("div", {
		onMouseEnter: () => r(!0),
		onMouseLeave: () => r(!1),
		onFocus: () => a(!0),
		onBlur: (e) => {
			e.currentTarget.contains(e.relatedTarget) || a(!1);
		},
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		style: { opacity: d ? .65 : 1 },
		children: [
			/* @__PURE__ */ S("span", {
				title: `Priority: ${e.priority}`,
				style: {
					width: 7,
					height: 7,
					borderRadius: "50%",
					background: l,
					flexShrink: 0
				}
			}),
			/* @__PURE__ */ S("button", {
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
				children: d && /* @__PURE__ */ S("svg", {
					width: "9",
					height: "9",
					viewBox: "0 0 10 10",
					fill: "none",
					children: /* @__PURE__ */ S("polyline", {
						points: "2,5 4,7.5 8,2.5",
						stroke: "#fff",
						strokeWidth: "1.8",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			}),
			/* @__PURE__ */ S("span", {
				className: o("flex-1 text-[13px] leading-[1.4]", d ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ S("span", {
					className: "text-text-disabled italic",
					children: "Untitled item"
				})
			}),
			e.assignee && /* @__PURE__ */ S("span", {
				title: e.assignee,
				className: "w-[22px] h-[22px] rounded-full bg-primary-bg text-primary-fg text-[9px] font-bold flex items-center justify-center shrink-0",
				children: le(e.assignee)
			}),
			e.dueDate && /* @__PURE__ */ C("span", {
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
				children: [u ? "⚠ " : "", ce(e.dueDate)]
			}),
			t && s && /* @__PURE__ */ C("select", {
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
					/* @__PURE__ */ S("option", {
						value: "pending",
						children: "pending"
					}),
					/* @__PURE__ */ S("option", {
						value: "acked",
						children: "acked"
					}),
					/* @__PURE__ */ S("option", {
						value: "done",
						children: "done"
					}),
					/* @__PURE__ */ S("option", {
						value: "rejected",
						children: "rejected"
					})
				]
			})
		]
	});
}
function J({ section: e, onUpdateItem: t, onNavigateToEditor: n }) {
	let r = H(e);
	if (r.length === 0) return /* @__PURE__ */ S("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No items."
	});
	let i = r.filter((e) => e.status === "done" || e.status === "acked"), a = r.filter((e) => e.status === "rejected"), o = r.filter((e) => !i.includes(e) && !a.includes(e));
	return /* @__PURE__ */ C("div", { children: [
		o.length > 0 && /* @__PURE__ */ S("div", {
			className: "mb-1",
			children: o.map((e) => /* @__PURE__ */ S(q, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		i.length > 0 && /* @__PURE__ */ S("div", {
			className: "mb-1",
			children: i.map((e) => /* @__PURE__ */ S(q, {
				item: e,
				onUpdateItem: t
			}, e.id))
		}),
		a.length > 0 && /* @__PURE__ */ S("div", { children: a.map((e) => /* @__PURE__ */ S(q, {
			item: e,
			onUpdateItem: t
		}, e.id)) }),
		n && /* @__PURE__ */ S("button", {
			type: "button",
			onClick: () => n(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistEditorRenderer.tsx
function ue({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: a }) {
	let c = b(null), l = e.status === "done", u = s(r);
	return v(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ C("div", {
		className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
		children: [
			/* @__PURE__ */ S("input", {
				type: "checkbox",
				checked: l,
				onChange: () => i({ status: l ? "pending" : "done" }),
				disabled: !t,
				className: o("w-[15px] h-[15px] accent-success shrink-0", t ? "cursor-pointer" : "cursor-default")
			}),
			/* @__PURE__ */ S("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Checklist item...",
				className: o("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", l ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ S("button", {
				type: "button",
				onClick: a,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function de({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = H(e), d = b(null), f = () => {
		o && (d.current = u.length, o({
			text: "",
			status: "pending",
			assignee: "",
			ackedBy: "",
			ackedAt: "",
			priority: "medium",
			notes: ""
		}));
	}, p = d.current, m = p !== null && u.length > p, g = u.length, _ = u.filter((e) => e.status === "done").length;
	return /* @__PURE__ */ C("div", { children: [
		t && n && /* @__PURE__ */ S(h, {
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
		g > 0 && /* @__PURE__ */ C("div", {
			className: "text-[11px] text-neutral font-semibold mb-1.5",
			children: [
				_,
				" / ",
				g,
				" done"
			]
		}),
		/* @__PURE__ */ S("div", { children: u.map((e, t) => {
			let n = t === u.length - 1, r = m && n;
			return /* @__PURE__ */ S(ue, {
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
		a && /* @__PURE__ */ S("button", {
			type: "button",
			onClick: f,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add item"
		})
	] });
}
//#endregion
//#region src/renderers/checklist/ChecklistReaderRenderer.tsx
function Y({ section: e, fragment: t, ydoc: n, provider: r, onUpdateItem: i, onNavigateToEditor: a }) {
	let s = H(e), c = s.length, l = s.filter((e) => e.status === "done").length, u = c > 0 ? Math.round(l / c * 100) : 0;
	return /* @__PURE__ */ C("div", { children: [
		t && n && /* @__PURE__ */ S("div", {
			className: "mb-2.5",
			children: /* @__PURE__ */ S(h, {
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
		c > 0 && /* @__PURE__ */ C("div", {
			className: "mb-2.5",
			children: [/* @__PURE__ */ C("div", {
				className: "flex justify-between mb-1",
				children: [/* @__PURE__ */ C("span", {
					className: "text-[11px] text-neutral font-semibold",
					children: [
						l,
						" / ",
						c,
						" done"
					]
				}), /* @__PURE__ */ C("span", {
					className: o("text-[11px] font-semibold", u === 100 ? "text-success-fg" : "text-neutral"),
					children: [u, "%"]
				})]
			}), /* @__PURE__ */ S("div", {
				className: "h-1 bg-border rounded-sm overflow-hidden",
				children: /* @__PURE__ */ S("div", {
					className: o("h-full rounded-sm transition-[width] duration-300", u === 100 ? "bg-success" : "bg-info"),
					style: { width: `${u}%` }
				})
			})]
		}),
		c === 0 ? /* @__PURE__ */ S("div", {
			className: "text-text-tertiary italic text-[13px]",
			children: "No items."
		}) : /* @__PURE__ */ S("div", { children: s.map((e) => {
			let t = e.status === "done";
			return /* @__PURE__ */ C("div", {
				className: "flex items-center gap-2 py-[5px] border-b border-border-subtle",
				children: [/* @__PURE__ */ S("input", {
					type: "checkbox",
					checked: t,
					onChange: () => i?.(e.id, { status: t ? "pending" : "done" }),
					className: o("w-3.5 h-3.5 accent-success shrink-0", i ? "cursor-pointer" : "cursor-default"),
					readOnly: !i
				}), /* @__PURE__ */ S("span", {
					className: o("text-[13px] flex-1 leading-[1.4]", t ? "text-text-tertiary line-through" : "text-text-primary"),
					children: e.text || /* @__PURE__ */ S("span", {
						className: "text-text-disabled italic",
						children: "Untitled"
					})
				})]
			}, e.id);
		}) }),
		a && /* @__PURE__ */ S("button", {
			type: "button",
			onClick: () => a(e.id),
			className: "mt-2 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/approvalSync.ts
var fe = {
	acked: "approved",
	done: "approved",
	rejected: "rejected"
};
function pe() {
	return "";
}
function me() {
	if (typeof window > "u") return null;
	let e = window.location.pathname.match(/\/documents\/([^/?#]+)/);
	return e ? e[1] : null;
}
function he(e) {
	return fe[e] ?? null;
}
async function ge(e) {
	let t = e.documentId ?? me();
	if (!t) return {
		ok: !1,
		error: "no documentId in URL"
	};
	try {
		let n = { "Content-Type": "application/json" };
		e.idToken && (n.Authorization = `Bearer ${e.idToken}`);
		let r = await fetch(`${pe()}/api/approvals`, {
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
function _e({ item: e, editable: t, autoFocus: n, onDidAutoFocus: r, onUpdate: i, onRemove: a }) {
	let c = b(null), l = X[e.status] ?? X.pending, u = s(r);
	return v(() => {
		n && c.current && (c.current.focus(), u());
	}, [n, u]), /* @__PURE__ */ C("div", {
		className: "flex items-center gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ S("span", {
				className: "w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 select-none",
				style: {
					background: l.bg,
					color: l.color
				},
				children: l.icon
			}),
			/* @__PURE__ */ S("input", {
				ref: c,
				type: "text",
				value: e.text,
				onChange: (e) => i({ text: e.target.value }),
				readOnly: !t,
				placeholder: "Describe the decision...",
				className: o("flex-1 border-none outline-none text-sm font-inherit bg-transparent px-1 py-0.5", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary")
			}),
			t && /* @__PURE__ */ C("select", {
				value: e.status === "done" ? "acked" : e.status,
				onChange: (e) => i({ status: e.target.value }),
				className: "text-[10px] px-2 py-0.5 rounded-[10px] font-semibold cursor-pointer outline-none font-inherit shrink-0 appearance-none",
				style: {
					border: `1px solid ${l.color}`,
					background: l.bg,
					color: l.color
				},
				children: [
					/* @__PURE__ */ S("option", {
						value: "pending",
						children: "Open"
					}),
					/* @__PURE__ */ S("option", {
						value: "acked",
						children: "Decided"
					}),
					/* @__PURE__ */ S("option", {
						value: "rejected",
						children: "Vetoed"
					})
				]
			}),
			t && /* @__PURE__ */ S("button", {
				type: "button",
				onClick: a,
				className: "border-none bg-transparent text-danger-fg cursor-pointer text-base px-1.5 py-0.5 leading-none",
				children: "×"
			})
		]
	});
}
function ve({ section: e, fragment: t, ydoc: n, provider: r, user: i, editable: a, onAddItem: o, onUpdateItem: s, onRemoveItem: c, onUpdateCursorInfo: l }) {
	let u = H(e), d = b(null), f = () => {
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
	return /* @__PURE__ */ C("div", { children: [
		t && n && /* @__PURE__ */ S(h, {
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
		u.length === 0 && !a && /* @__PURE__ */ S("div", {
			className: "text-text-tertiary italic text-[13px] py-1",
			children: "No decisions yet."
		}),
		/* @__PURE__ */ S("div", { children: u.map((t, n) => {
			let r = n === u.length - 1, o = m && r;
			return /* @__PURE__ */ S(_e, {
				item: t,
				editable: a,
				autoFocus: o,
				onDidAutoFocus: o ? () => {
					d.current = null;
				} : void 0,
				onUpdate: (n) => {
					let r = t.status;
					if (s?.(t.id, n), n.status && n.status !== r) {
						let t = he(n.status);
						t && ge({
							sectionId: e.id,
							decision: t,
							reviewerName: i?.name
						});
					}
				},
				onRemove: () => c?.(t.id)
			}, t.id);
		}) }),
		a && /* @__PURE__ */ S("button", {
			type: "button",
			onClick: f,
			className: "mt-2 px-3.5 py-1.5 text-[13px] border border-dashed border-border-emphasis rounded-md bg-transparent text-neutral cursor-pointer font-inherit",
			children: "+ Add decision"
		})
	] });
}
//#endregion
//#region src/renderers/decisions/DecisionsReaderRenderer.tsx
var Z = {
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
function ye({ item: e }) {
	let t = Z[e.status] ?? Z.pending;
	return /* @__PURE__ */ C("div", {
		className: "flex items-start gap-2 py-1.5 border-b border-border-subtle",
		children: [
			/* @__PURE__ */ S("span", {
				className: "w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 select-none",
				style: {
					background: t.bg,
					color: t.color
				},
				children: t.icon
			}),
			/* @__PURE__ */ S("span", {
				className: o("flex-1 text-[13px] leading-[1.4]", e.status === "rejected" ? "text-text-tertiary line-through" : "text-text-primary"),
				children: e.text || /* @__PURE__ */ S("span", {
					className: "text-text-disabled italic",
					children: "Untitled decision"
				})
			}),
			/* @__PURE__ */ S("span", {
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
function Q({ label: e, color: t, items: n }) {
	return /* @__PURE__ */ C("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ S("div", {
			className: "text-[10px] font-bold uppercase tracking-[0.05em] mb-0.5",
			style: { color: t },
			children: e
		}), n.map((e) => /* @__PURE__ */ S(ye, { item: e }, e.id))]
	});
}
function be({ section: e, onNavigateToEditor: t }) {
	let n = H(e);
	if (n.length === 0) return /* @__PURE__ */ S("div", {
		className: "text-text-tertiary italic text-[13px] py-1",
		children: "No decisions recorded."
	});
	let r = n.filter((e) => e.status === "acked" || e.status === "done"), i = n.filter((e) => e.status === "rejected"), a = n.filter((e) => !r.includes(e) && !i.includes(e));
	return /* @__PURE__ */ C("div", { children: [
		a.length > 0 && /* @__PURE__ */ S(Q, {
			label: "Open",
			color: Z.pending.color,
			items: a
		}),
		r.length > 0 && /* @__PURE__ */ S(Q, {
			label: "Decided",
			color: Z.acked.color,
			items: r
		}),
		i.length > 0 && /* @__PURE__ */ S(Q, {
			label: "Vetoed",
			color: Z.rejected.color,
			items: i
		}),
		t && /* @__PURE__ */ S("button", {
			type: "button",
			onClick: () => t(e.id),
			className: "mt-1.5 bg-transparent border-none text-info-fg text-xs cursor-pointer p-0 font-inherit",
			children: "Edit in editor →"
		})
	] });
}
//#endregion
//#region src/renderers/file-upload/FileUploadEditorRenderer.tsx
function xe(e) {
	return e.metadata ?? {};
}
function Se({ section: e, editable: t, onUpdateSection: n }) {
	let r = xe(e), [i, a] = x(!1), s = (t) => {
		a(!0);
		let r = new FileReader();
		r.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				fileName: t.name,
				fileDataUrl: typeof r.result == "string" ? r.result : "",
				fileSize: t.size
			} }), a(!1);
		}, r.onerror = () => a(!1), r.readAsDataURL(t);
	};
	return /* @__PURE__ */ S("div", {
		"data-testid": `file-upload-editor-${e.id}`,
		children: r.fileName ? /* @__PURE__ */ C("div", {
			className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
			children: [
				/* @__PURE__ */ S("span", {
					className: "text-base",
					children: "📎"
				}),
				/* @__PURE__ */ S("span", {
					className: "flex-1 font-medium text-text-primary",
					children: r.fileName
				}),
				typeof r.fileSize == "number" && /* @__PURE__ */ C("span", {
					className: "text-[11px] text-text-tertiary",
					children: [(r.fileSize / 1024).toFixed(1), " kB"]
				}),
				t && /* @__PURE__ */ S("button", {
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
		}) : /* @__PURE__ */ C("label", {
			"data-testid": `file-upload-empty-${e.id}`,
			className: o("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading file…" : e.placeholder ?? "Click to upload a file", /* @__PURE__ */ S("input", {
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
function Ce({ section: e }) {
	let t = e.metadata ?? {};
	return t.fileName ? /* @__PURE__ */ C("div", {
		"data-testid": `file-upload-reader-${e.id}`,
		className: "flex items-center gap-2.5 px-3 py-2 rounded-md bg-surface-panel border border-border text-[13px]",
		children: [
			/* @__PURE__ */ S("span", {
				className: "text-base",
				children: "📎"
			}),
			/* @__PURE__ */ C("a", {
				href: t.fileDataUrl ?? "#",
				download: t.fileName,
				"data-testid": `file-upload-link-${e.id}`,
				className: "text-primary font-medium no-underline",
				children: ["Download ", t.fileName]
			}),
			typeof t.fileSize == "number" && /* @__PURE__ */ C("span", {
				className: "text-[11px] text-text-tertiary",
				children: [
					"(",
					(t.fileSize / 1024).toFixed(1),
					" kB)"
				]
			})
		]
	}) : /* @__PURE__ */ S("div", {
		"data-testid": `file-upload-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No file uploaded."
	});
}
//#endregion
//#region src/renderers/diagram/DiagramEditorRenderer.tsx
function we({ section: e, editable: t, onUpdateSection: n }) {
	let r = e.metadata ?? {}, [i, a] = x(!1), s = (t) => {
		a(!0);
		let i = new FileReader();
		i.onload = () => {
			n?.({ metadata: {
				...e.metadata ?? {},
				imageDataUrl: typeof i.result == "string" ? i.result : "",
				alt: r.alt ?? t.name
			} }), a(!1);
		}, i.onerror = () => a(!1), i.readAsDataURL(t);
	}, c = (t) => {
		n?.({ metadata: {
			...e.metadata ?? {},
			alt: t
		} });
	};
	return /* @__PURE__ */ S("div", {
		"data-testid": `diagram-editor-${e.id}`,
		children: r.imageDataUrl ? /* @__PURE__ */ C("div", {
			className: "flex flex-col gap-2",
			children: [/* @__PURE__ */ S("img", {
				"data-testid": `diagram-image-${e.id}`,
				src: r.imageDataUrl,
				alt: r.alt ?? "",
				className: "max-w-full max-h-[320px] rounded-md border border-border"
			}), t && /* @__PURE__ */ C("div", {
				className: "flex gap-2 items-center",
				children: [/* @__PURE__ */ S("input", {
					type: "text",
					"data-testid": `diagram-alt-${e.id}`,
					value: r.alt ?? "",
					placeholder: "Alt text",
					onChange: (e) => c(e.target.value),
					className: "flex-1 px-2 py-1 text-xs border border-border-emphasis rounded"
				}), /* @__PURE__ */ S("button", {
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
		}) : /* @__PURE__ */ C("label", {
			"data-testid": `diagram-empty-${e.id}`,
			className: o("block px-4 py-3.5 border border-dashed border-border-emphasis rounded-lg text-neutral text-[13px] text-center bg-surface-inset", t ? "cursor-pointer" : "cursor-default"),
			children: [i ? "Reading image…" : e.placeholder ?? "Upload an image (PNG / JPG / SVG)", /* @__PURE__ */ S("input", {
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
	return t.imageDataUrl ? /* @__PURE__ */ C("figure", {
		"data-testid": `diagram-reader-${e.id}`,
		className: "m-0",
		children: [/* @__PURE__ */ S("img", {
			src: t.imageDataUrl,
			alt: t.alt ?? "",
			className: "max-w-full max-h-[480px] rounded-md border border-border"
		}), t.alt && /* @__PURE__ */ S("figcaption", {
			className: "text-[11px] text-text-tertiary mt-1 text-center",
			children: t.alt
		})]
	}) : /* @__PURE__ */ S("div", {
		"data-testid": `diagram-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No diagram uploaded."
	});
}
//#endregion
//#region src/renderers/link-block/LinkBlockEditorRenderer.tsx
function Te(e) {
	return typeof e == "object" && !!e;
}
function Ee(e) {
	let t = e.metadata ?? {};
	return Array.isArray(t.links) ? t.links.filter(Te).map((e) => ({
		label: typeof e.label == "string" ? e.label : "",
		url: typeof e.url == "string" ? e.url : ""
	})) : [];
}
function De({ section: e, editable: t, onUpdateSection: n }) {
	let r = Ee(e), i = (t) => {
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
	return /* @__PURE__ */ C("div", {
		"data-testid": `link-block-editor-${e.id}`,
		className: "flex flex-col gap-1.5",
		children: [
			r.length === 0 && /* @__PURE__ */ S("div", {
				"data-testid": `link-block-empty-${e.id}`,
				className: "text-text-tertiary text-xs italic py-1",
				children: "No links yet."
			}),
			r.map((n, r) => /* @__PURE__ */ C("div", {
				className: "flex items-center gap-1.5",
				children: [
					/* @__PURE__ */ S("input", {
						type: "text",
						"data-testid": `link-block-label-${e.id}-${r}`,
						value: n.label,
						placeholder: "Label",
						onChange: (e) => o(r, { label: e.target.value }),
						disabled: !t,
						className: "flex-1 px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					/* @__PURE__ */ S("input", {
						type: "url",
						"data-testid": `link-block-url-${e.id}-${r}`,
						value: n.url,
						placeholder: "https://example.com",
						onChange: (e) => o(r, { url: e.target.value }),
						disabled: !t,
						className: "flex-[2] px-2 py-1 text-[13px] border border-border-emphasis rounded"
					}),
					t && /* @__PURE__ */ S("button", {
						type: "button",
						"data-testid": `link-block-remove-${e.id}-${r}`,
						onClick: () => s(r),
						className: "border-none bg-transparent text-danger-fg cursor-pointer text-sm px-1.5 py-0.5",
						children: "×"
					})
				]
			}, r)),
			t && /* @__PURE__ */ S("button", {
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
function Oe(e) {
	return typeof e == "object" && !!e && typeof e.url == "string";
}
function ke({ section: e }) {
	let t = e.metadata ?? {}, n = Array.isArray(t.links) ? t.links.filter((e) => Oe(e) && e.url) : [];
	return n.length === 0 ? /* @__PURE__ */ S("div", {
		"data-testid": `link-block-reader-empty-${e.id}`,
		className: "text-text-tertiary text-[13px] italic",
		children: "No links."
	}) : /* @__PURE__ */ S("ul", {
		"data-testid": `link-block-reader-${e.id}`,
		className: "list-none m-0 p-0 flex flex-col gap-1",
		children: n.map((e, t) => /* @__PURE__ */ S("li", {
			className: "text-[13px]",
			children: /* @__PURE__ */ S("a", {
				href: e.url,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "text-primary font-medium no-underline",
				children: e.label || e.url
			})
		}, t))
	});
}
e(D), e(O), e(k), e(A), e(j), e(M), e(N), t("*", "*", U), t("rich-text", "editor", ae), t("rich-text", "ack", W), t("rich-text", "reader", W), t("tasks", "editor", oe), t("tasks", "ack", J), t("tasks", "reader", J), t("checklist", "editor", de), t("checklist", "ack", Y), t("checklist", "reader", Y), t("decisions", "editor", ve), t("decisions", "ack", be), t("decisions", "reader", be), t("file-upload", "editor", Se), t("file-upload", "ack", Ce), t("file-upload", "reader", Ce), t("diagram", "editor", we), t("diagram", "ack", $), t("diagram", "reader", $), t("link-block", "editor", De), t("link-block", "ack", ke), t("link-block", "reader", ke);
//#endregion
export { T as a, E as i, V as n, ie as r, U as t };
