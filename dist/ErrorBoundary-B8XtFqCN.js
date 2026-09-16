import { n as e, r as t, t as n } from "./useDocumentTypes-BUXMPyPU.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { t as i } from "./SelectableCard-BVSflqyL.js";
import { t as a } from "./Chip-BENLwTlq.js";
import { t as o } from "./Modal-CyoyiNKN.js";
import { t as s } from "./Input-DLknWXri.js";
import { t as ee } from "./Textarea-Dz4doxTv.js";
import { G as te, U as c } from "./renderers-9QJtVt3f.js";
import { Component as l, useEffect as ne, useId as re, useMemo as u, useRef as d, useState as f } from "react";
import { jsx as p, jsxs as m } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var ie = [
	{
		id: "page",
		icon: "📄",
		name: "Page",
		description: "One continuous document. Headings, paragraphs, lists and tables flow down a single sheet — like Google Docs or Confluence.",
		keywords: [
			"blank",
			"empty",
			"doc",
			"document",
			"write"
		]
	},
	{
		id: "sections",
		icon: "🗂️",
		name: "Sections",
		description: "A structured set of section forms — task lists, decisions and notes, each in its own box. Better as a todo creator or a notepad.",
		keywords: [
			"blank",
			"todo",
			"tasks",
			"notepad",
			"form"
		]
	},
	{
		id: "diagram",
		icon: "🖉",
		name: "Diagram",
		description: "A whiteboard. Shapes, arrows and text on an infinite canvas, drawn with others in real time — opens full width with the sidebar out of the way.",
		keywords: [
			"blank",
			"whiteboard",
			"canvas",
			"draw",
			"sketch"
		]
	}
];
function ae(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function oe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function se(t) {
	let r = t.build(), i = n(), a = i.find((e) => e.name.toLowerCase() === r.name.toLowerCase());
	if (a) return a;
	let o = (/* @__PURE__ */ new Date()).toISOString(), s = {
		...r,
		id: crypto.randomUUID(),
		createdAt: o,
		updatedAt: o
	};
	return e([...i, s]), s;
}
function h({ open: e, onClose: l, onCreate: h }) {
	let [g, _] = f([]), [v, y] = f(!1), [b, x] = f(null), [S, C] = f(null), [w, T] = f(""), [E, D] = f(""), [O, k] = f(!1), [A, j] = f(""), [M, N] = f("page"), P = d(null), F = d(null), I = re(), L = `${I}-blank-label`, R = `${I}-type-label`, z = `${I}-cookbook-label`, B = `${I}-title`, V = `${I}-description`;
	ne(() => {
		if (!e) return;
		let r = n();
		_(r), x(null), C(null), T(""), D(""), k(!1), j(""), N("page");
		let i = !1;
		y(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			_(t), x((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || y(!1);
		});
		let a = setTimeout(() => P.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let H = u(() => ie.filter((e) => ae(e, w)), [w]), U = u(() => g.filter((e) => oe(e, w)), [g, w]), W = u(() => c.filter((e) => te(e, w)), [w]);
	if (!e) return null;
	let G = g.find((e) => e.id === b), K = S ? c.find((e) => e.id === S) : void 0, q = M === "sections", ce = !!K || !!G, J = g.length === 0 && !v && !K, le = H.length === 0 && U.length === 0 && W.length === 0, Y = K ? {
		kind: "cookbook",
		cookbook: K
	} : G && M !== "diagram" ? {
		kind: "type",
		type: G
	} : {
		kind: "blank",
		shape: M
	}, X = (e) => {
		if (e.kind === "cookbook") {
			C(e.cookbook.id), M === "diagram" && N("page"), O || D(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			N(e.shape), e.shape === "diagram" && (C(null), O || D(""));
			return;
		}
		C(null), x(e.type.id), O || D("");
	}, Z = (e) => e.kind === "blank" ? e.shape : M === "diagram" ? "page" : M, Q = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let i = A.trim() || void 0;
		if (e.kind === "cookbook") {
			let t = se(e.cookbook);
			h({
				title: r,
				type: t.name,
				description: i,
				icon: t.icon,
				documentTypeId: t.id,
				shape: n
			});
		} else e.kind === "type" && n !== "diagram" ? h({
			title: r,
			type: e.type.name,
			description: i,
			icon: e.type.icon,
			documentTypeId: e.type.id,
			shape: n
		}) : h({
			title: r,
			type: n === "diagram" ? "Diagram" : "Document",
			description: i,
			icon: n === "diagram" ? "🖉" : "📄",
			shape: n
		});
		l();
	}, $ = !!E.trim() && (!q || ce), ue = () => {
		$ && Q(Y, E, Z(Y));
	};
	return /* @__PURE__ */ p(o, {
		open: e,
		onClose: l,
		ariaLabel: "Create New Document",
		maxWidth: 720,
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
		children: /* @__PURE__ */ m("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && $ && ue();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ p("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ m("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ p(s, {
						ref: P,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: w,
						onChange: (e) => T(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = W.length > 0 && w.trim() ? {
								kind: "cookbook",
								cookbook: W[0]
							} : H.length > 0 ? {
								kind: "blank",
								shape: H[0].id
							} : U.length > 0 ? {
								kind: "type",
								type: U[0]
							} : void 0;
							if (!t) return;
							X(t);
							let n = E.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								F.current?.focus();
								return;
							}
							Q(t, n, Z(t));
						}
					}), /* @__PURE__ */ p("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ m("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						H.length > 0 && /* @__PURE__ */ m("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ p("div", {
								id: L,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ p("div", {
								role: "group",
								"aria-labelledby": L,
								className: r("grid grid-cols-3 gap-2"),
								children: H.map((e) => /* @__PURE__ */ m(i, {
									padding: "md",
									selected: M === e.id,
									onSelect: () => X({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ m("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ p("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ p("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ p(a, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ p("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						W.length > 0 && /* @__PURE__ */ m("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ m("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ p("div", {
									id: z,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ p("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: M === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : M === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ p("div", {
								role: "group",
								"aria-labelledby": z,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: W.map((e) => {
									let t = S === e.id;
									return /* @__PURE__ */ m(i, {
										padding: "md",
										selected: t,
										onSelect: () => X({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ m("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ p("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ p("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ p("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ p("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						M !== "diagram" && (U.length > 0 || J || g.length === 0 && v) && /* @__PURE__ */ m("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ m("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ p("span", {
										id: R,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !q && /* @__PURE__ */ p("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								g.length === 0 && v && /* @__PURE__ */ p("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								J && /* @__PURE__ */ p("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: q ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								U.length > 0 && /* @__PURE__ */ p("div", {
									role: "group",
									"aria-labelledby": R,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: U.map((e) => {
										let t = !K && b === e.id;
										return /* @__PURE__ */ m("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => X({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ p("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ m("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ p("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ p("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ p("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: M === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ p("span", {
													"aria-hidden": "true",
													className: r("absolute top-1.5 right-2 text-sm text-info-fg font-bold"),
													children: "✓"
												})
											]
										}, e.id);
									})
								})
							]
						}),
						le && /* @__PURE__ */ m("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								w,
								"”. Clear the search to see every starting point."
							]
						})
					]
				}),
				/* @__PURE__ */ m("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ m("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ m("label", {
							htmlFor: B,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ p("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ p(s, {
							ref: F,
							id: B,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: E,
							onChange: (e) => {
								D(e.target.value), k(!0);
							},
							placeholder: K ? `e.g. ${K.name}` : G ? `e.g. Q2 ${G.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ m("div", { children: [/* @__PURE__ */ m("label", {
						htmlFor: V,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ p("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ p(ee, {
						id: V,
						"data-testid": "new-doc-description",
						value: A,
						onChange: (e) => j(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ m("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ p("button", {
						"data-testid": "new-doc-cancel",
						onClick: l,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ p("button", {
						"data-testid": "new-doc-submit",
						onClick: ue,
						disabled: !$,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", $ ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var g = class extends l {
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
		return this.state.hasError ? /* @__PURE__ */ m("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ p("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ p("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ p("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
export { h as n, g as t };
