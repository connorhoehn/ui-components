import { n as e, t } from "./useDocumentTypes-CrsHC24c.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { n as r } from "./SegmentedControl-CQxKJF-Z.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./Modal-CyoyiNKN.js";
import { t as o } from "./Input-DLknWXri.js";
import { t as s } from "./Textarea-Dz4doxTv.js";
import { Component as c, useEffect as l, useId as u, useRef as d, useState as f } from "react";
import { Fragment as p, jsx as m, jsxs as h } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var g = [
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
function _({ open: c, onClose: _, onCreate: v }) {
	let [y, b] = f([]), [x, S] = f(!1), [C, w] = f(null), [T, E] = f(""), [D, O] = f(""), [k, A] = f("page"), j = d(null), M = u(), N = `${M}-shape-label`, P = `${M}-type-label`, F = `${M}-title`, I = `${M}-description`;
	if (l(() => {
		if (!c) return;
		let n = t();
		b(n), w(n[0]?.id ?? null), E(""), O(""), A("page");
		let r = !1;
		S(!0), e().then((e) => {
			if (r) return;
			let t = e.ok ? e.types : e.cached;
			b(t), w((e) => e && t.some((t) => t.id === e) ? e : t[0]?.id ?? null);
		}).finally(() => {
			r || S(!1);
		});
		let i = setTimeout(() => j.current?.focus(), 50);
		return () => {
			r = !0, clearTimeout(i);
		};
	}, [c]), !c) return null;
	let L = y.find((e) => e.id === C), R = k === "sections", z = y.length === 0 && !x, B = () => {
		let e = T.trim();
		if (!e || R && !L) return;
		let t = k === "diagram" ? void 0 : L;
		v({
			title: e,
			type: k === "diagram" ? "Diagram" : t ? t.name : "Document",
			description: D.trim() || void 0,
			icon: k === "diagram" ? "🖉" : t ? t.icon : "📄",
			...t ? { documentTypeId: t.id } : {},
			shape: k
		}), _();
	}, V = !!T.trim() && (!R || !!L);
	return /* @__PURE__ */ m(a, {
		open: c,
		onClose: _,
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
		children: /* @__PURE__ */ h("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && V && B();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ m("h2", {
					className: n("m-0 px-6 pt-6 pb-4 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ m("div", {
					className: n("flex-1 overflow-y-auto px-6 min-h-0"),
					children: y.length === 0 && x ? /* @__PURE__ */ m("div", {
						className: n("text-center px-4 py-8 border border-dashed border-border-field rounded-lg mb-5 text-text-tertiary"),
						children: /* @__PURE__ */ m("div", {
							className: n("text-[13px]"),
							children: "Loading document types…"
						})
					}) : /* @__PURE__ */ h(p, { children: [
						/* @__PURE__ */ h("div", {
							className: n("mb-5"),
							children: [/* @__PURE__ */ m("div", {
								id: N,
								className: n("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "How is this document written?"
							}), /* @__PURE__ */ m("div", {
								role: "group",
								"aria-labelledby": N,
								className: n("grid grid-cols-2 gap-2"),
								children: g.map((e) => /* @__PURE__ */ h(r, {
									padding: "md",
									selected: k === e.id,
									onSelect: () => A(e.id),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ h("div", {
										className: n("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ m("span", {
												className: n("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ m("span", {
												className: n("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ m(i, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ m("div", {
										className: n("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						k !== "diagram" && /* @__PURE__ */ h("div", {
							className: n("mb-5"),
							children: [
								/* @__PURE__ */ h("div", {
									className: n("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ m("span", {
										id: P,
										className: n("block text-[13px] font-semibold text-text-secondary"),
										children: "Document Type"
									}), !R && /* @__PURE__ */ m("span", {
										className: n("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								z && /* @__PURE__ */ m("div", {
									"data-testid": "no-document-types",
									className: n("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: R ? "Sections come from a document type, and none are defined yet. Define one in ☰ → Document Types, or make a page instead — it needs no type." : "No document types yet. A page does not need one; define types in ☰ → Document Types when you want a reusable icon and structure."
								}),
								/* @__PURE__ */ m("div", {
									role: "group",
									"aria-labelledby": P,
									className: n("grid grid-cols-2 gap-2"),
									children: y.map((e) => {
										let t = C === e.id;
										return /* @__PURE__ */ h("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => w(e.id),
											className: n("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ m("span", {
													className: n("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ h("div", {
													className: n("min-w-0"),
													children: [
														/* @__PURE__ */ m("div", {
															className: n("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ m("div", {
															className: n("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ m("div", {
															className: n("text-[11px] text-text-tertiary mt-0.5"),
															children: k === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : "Sets the icon and type"
														})
													]
												}),
												t && /* @__PURE__ */ m("span", {
													"aria-hidden": "true",
													className: n("absolute top-1.5 right-2 text-sm text-info-fg font-bold"),
													children: "✓"
												})
											]
										}, e.id);
									})
								})
							]
						}),
						/* @__PURE__ */ h("div", {
							className: n("mb-4"),
							children: [/* @__PURE__ */ h("label", {
								htmlFor: F,
								className: n("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Title ", /* @__PURE__ */ m("span", {
									className: n("text-danger-fg"),
									"aria-hidden": "true",
									children: "*"
								})]
							}), /* @__PURE__ */ m(o, {
								ref: j,
								id: F,
								required: !0,
								"aria-required": "true",
								"data-testid": "new-doc-title",
								value: T,
								onChange: (e) => E(e.target.value),
								placeholder: L ? `e.g. Q2 ${L.name}` : "Document title…"
							})]
						}),
						/* @__PURE__ */ h("div", {
							className: n("mb-5"),
							children: [/* @__PURE__ */ h("label", {
								htmlFor: I,
								className: n("block text-[13px] font-semibold text-text-secondary mb-1"),
								children: ["Description ", /* @__PURE__ */ m("span", {
									className: n("text-text-tertiary font-normal"),
									children: "(optional)"
								})]
							}), /* @__PURE__ */ m(s, {
								id: I,
								"data-testid": "new-doc-description",
								value: D,
								onChange: (e) => O(e.target.value),
								placeholder: "Brief description of this document…",
								rows: 3,
								className: n("resize-y")
							})]
						})
					] })
				}),
				!(y.length === 0 && x) && /* @__PURE__ */ h("div", {
					className: n("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ m("button", {
						"data-testid": "new-doc-cancel",
						onClick: _,
						className: n("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ m("button", {
						"data-testid": "new-doc-submit",
						onClick: B,
						disabled: !V,
						className: n("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", V ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var v = class extends c {
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
		return this.state.hasError ? /* @__PURE__ */ h("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ m("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ m("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ m("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
export { _ as n, v as t };
