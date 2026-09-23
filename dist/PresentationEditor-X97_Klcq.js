import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-BDlo8PJg.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { c as h } from "./DropdownMenu-BXhLlQ0B.js";
import { i as g, n as _ } from "./Text-D5E7T_4D.js";
import { t as v } from "./Chip-DYqbAD3L.js";
import { t as y } from "./Modal-D2qxMX2_.js";
import { t as b } from "./EmptyState-DQYx5Oyy.js";
import { i as x, n as S, r as C, t as w } from "./SearchInput-DXbGHmns.js";
import { t as T } from "./FormField-E8Z0ppOp.js";
import { n as E } from "./Tabs-BGZyr2nH.js";
import { t as D } from "./Input-DLknWXri.js";
import { t as O } from "./Textarea-Dz4doxTv.js";
import { t as ee } from "./DotMeter-BDVkadI8.js";
import { t as k } from "./InlineAlert-CRnIKeAF.js";
import { t as A } from "./SectionLabel-bcrhNYOr.js";
import { t as j } from "./StatusPill-Db42eiME.js";
import { t as te } from "./Select-CD8ixtYi.js";
import { G as ne, U as re } from "./renderers-5O9bh08s.js";
import { t as ie } from "./ComposerReferences-nGKcicNt.js";
import { Component as M, Suspense as ae, lazy as N, useCallback as P, useEffect as F, useId as I, useMemo as oe, useRef as L, useState as R } from "react";
import { Fragment as se, jsx as z, jsxs as B } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var V = /* @__PURE__ */ new Set(["diagram", "presentation"]), ce = [
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
	},
	{
		id: "presentation",
		icon: "📊",
		name: "Presentation",
		description: "A slide deck, grounded in documents you already have. Edits as slides and downloads as a real .pptx — every slide cites its source.",
		keywords: [
			"deck",
			"slides",
			"slide",
			"ppt",
			"pptx",
			"powerpoint",
			"keynote"
		]
	}
], le = [
	{
		value: "blank",
		label: "Blank — one empty slide"
	},
	{
		value: "transcript",
		label: "From a transcript"
	},
	{
		value: "document",
		label: "From a project document"
	}
];
function ue(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function de(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function fe(t) {
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
function H({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = R([]), [d, f] = R(!1), [p, m] = R(null), [h, _] = R(null), [b, x] = R(""), [S, C] = R(""), [w, T] = R(!1), [E, ee] = R(""), [k, A] = R("page"), [j, ie] = R("blank"), [M, ae] = R(""), [N, P] = R(""), [H, U] = R([]), pe = L(null), me = L(null), W = I(), he = `${W}-blank-label`, ge = `${W}-type-label`, _e = `${W}-cookbook-label`, ve = `${W}-title`, ye = `${W}-description`, G = `${W}-deck-from`, be = `${W}-deck-source`;
	F(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), _(null), x(""), C(""), T(!1), ee(""), A("page"), ie("blank"), ae(""), P(""), U([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => pe.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let K = oe(() => ce.filter((e) => ue(e, b)), [b]), q = oe(() => l.filter((e) => de(e, b)), [l, b]), J = oe(() => re.filter((e) => ne(e, b)), [b]);
	if (F(() => {
		if (!e || k !== "presentation") return;
		if (j === "blank") {
			U([]);
			return;
		}
		let t = N.trim().toLowerCase();
		if (j === "transcript") {
			let e = c ?? [];
			U(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			U([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(N.trim())).then((e) => {
			n || U(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		k,
		j,
		N,
		c,
		s
	]), !e) return null;
	let Y = l.find((e) => e.id === p), X = h ? re.find((e) => e.id === h) : void 0, xe = k === "sections", Se = !!X || !!Y, Ce = l.length === 0 && !d && !X, we = K.length === 0 && q.length === 0 && J.length === 0, Te = X ? {
		kind: "cookbook",
		cookbook: X
	} : Y && !V.has(k) ? {
		kind: "type",
		type: Y
	} : {
		kind: "blank",
		shape: k
	}, Z = (e) => {
		if (e.kind === "cookbook") {
			_(e.cookbook.id), V.has(k) && A("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			A(e.shape), V.has(e.shape) && (_(null), w || C(""));
			return;
		}
		_(null), m(e.type.id), w || C("");
	}, Ee = (e) => e.kind === "blank" ? e.shape : V.has(k) ? "page" : k, De = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = E.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: j,
				...j !== "blank" && M ? { sourceId: M } : {},
				title: r,
				...s ? { description: s } : {}
			}) : a({
				title: r,
				type: "Presentation",
				description: s,
				icon: "📊",
				shape: "presentation"
			}), i();
			return;
		}
		if (e.kind === "cookbook") {
			let t = fe(e.cookbook);
			a({
				title: r,
				type: t.name,
				description: s,
				icon: t.icon,
				documentTypeId: t.id,
				shape: n
			});
		} else e.kind === "type" && n !== "diagram" ? a({
			title: r,
			type: e.type.name,
			description: s,
			icon: e.type.icon,
			documentTypeId: e.type.id,
			shape: n
		}) : a({
			title: r,
			type: n === "diagram" ? "Diagram" : "Document",
			description: s,
			icon: n === "diagram" ? "🖉" : "📄",
			shape: n
		});
		i();
	}, Oe = k === "presentation" && j !== "blank" && !M, Q = !!S.trim() && (!xe || Se) && !Oe, ke = () => {
		Q && De(Te, S, Ee(Te));
	};
	return /* @__PURE__ */ z(y, {
		open: e,
		onClose: i,
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
		children: /* @__PURE__ */ B("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Q && ke();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ z("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ B("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ z(D, {
						ref: pe,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => x(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = J.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: J[0]
							} : K.length > 0 ? {
								kind: "blank",
								shape: K[0].id
							} : q.length > 0 ? {
								kind: "type",
								type: q[0]
							} : void 0;
							if (!t) return;
							Z(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								me.current?.focus();
								return;
							}
							De(t, n, Ee(t));
						}
					}), /* @__PURE__ */ z("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ B("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						K.length > 0 && /* @__PURE__ */ B("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ z("div", {
								id: he,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ z("div", {
								role: "group",
								"aria-labelledby": he,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: K.map((e) => /* @__PURE__ */ B(g, {
									padding: "md",
									selected: k === e.id,
									onSelect: () => Z({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ B("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ z("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ z("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ z(v, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ z("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						k === "presentation" && /* @__PURE__ */ B("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ z("label", {
									htmlFor: G,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ z(te, {
									id: G,
									value: j,
									options: le.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ie(e.target.value), ae(""), P("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ z("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: j === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								j !== "blank" && /* @__PURE__ */ B("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ z(D, {
										type: "search",
										value: N,
										onChange: (e) => P(e.target.value),
										"aria-label": j === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: j === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), H.length === 0 ? /* @__PURE__ */ z("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: j === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ B(se, { children: [/* @__PURE__ */ B("label", {
										htmlFor: be,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											j === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ z("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ z(te, {
										id: be,
										required: !0,
										"aria-required": "true",
										value: M,
										placeholder: "Choose one…",
										options: H.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => ae(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						J.length > 0 && /* @__PURE__ */ B("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ B("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ z("div", {
									id: _e,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ z("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: k === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : k === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : k === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ z("div", {
								role: "group",
								"aria-labelledby": _e,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: J.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ B(g, {
										padding: "md",
										selected: t,
										onSelect: () => Z({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ B("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ z("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ z("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ z("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ z("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!V.has(k) && (q.length > 0 || Ce || l.length === 0 && d) && /* @__PURE__ */ B("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ B("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ z("span", {
										id: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !xe && /* @__PURE__ */ z("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ z("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Ce && /* @__PURE__ */ z("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: xe ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								q.length > 0 && /* @__PURE__ */ z("div", {
									role: "group",
									"aria-labelledby": ge,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: q.map((e) => {
										let t = !X && p === e.id;
										return /* @__PURE__ */ B("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Z({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ z("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ B("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ z("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ z("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ z("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: k === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ z("span", {
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
						we && /* @__PURE__ */ B("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								b,
								"”. Clear the search to see every starting point."
							]
						})
					]
				}),
				/* @__PURE__ */ B("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ B("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ B("label", {
							htmlFor: ve,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ z("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ z(D, {
							ref: me,
							id: ve,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: X ? `e.g. ${X.name}` : Y ? `e.g. Q2 ${Y.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ B("div", { children: [/* @__PURE__ */ B("label", {
						htmlFor: ye,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ z("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ z(O, {
						id: ye,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => ee(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ B("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ z("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ z("button", {
						"data-testid": "new-doc-submit",
						onClick: ke,
						disabled: !Q,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Q ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var U = class extends M {
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
		return this.state.hasError ? /* @__PURE__ */ B("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ z("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ z("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ z("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
//#region src/components/inbox/InboxSection.tsx
function pe({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = I(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ B("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ B("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ z(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ z(v, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ z("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ B(se, { children: [/* @__PURE__ */ z("span", { className: "flex-1" }), /* @__PURE__ */ z("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ z(b, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ z("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ z("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function me({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ z("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var W = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function he({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", className: u, "data-testid": d = "inline-editable-text" }) {
	let [f, p] = R(!1), [m, h] = R(e), g = L(null);
	F(() => {
		f || h(e);
	}, [e, f]), F(() => {
		f && g.current?.select();
	}, [f]);
	let _ = () => {
		p(!1);
		let n = m.trim();
		if (o && !n) {
			h(e);
			return;
		}
		n !== e && t(n);
	};
	return f ? /* @__PURE__ */ z(D, {
		ref: g,
		size: c,
		value: m,
		"aria-label": n,
		placeholder: i,
		maxLength: a,
		autoFocus: !0,
		onChange: (e) => h(e.target.value),
		onBlur: _,
		onKeyDown: (t) => {
			t.key === "Enter" && (t.preventDefault(), _()), t.key === "Escape" && (t.preventDefault(), h(e), p(!1));
		},
		className: r("min-w-0", u),
		"data-testid": `${d}-input`
	}) : /* @__PURE__ */ z("button", {
		type: "button",
		disabled: s,
		onClick: () => p(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": d,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", W[l], !e && "italic text-text-tertiary", u),
		children: e || i
	});
}
//#endregion
//#region src/components/ui/Disclosure.tsx
function ge({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": g = "disclosure" }) {
	let _ = n !== void 0, [v, y] = R(i), b = _ ? n : v, x = L(null);
	F(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ B("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": g,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ B("summary", {
			"data-testid": `${g}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ z(h, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ z("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ z("div", {
			"data-testid": `${g}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function _e(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function ve(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || _e(e.target)) return null;
	switch (e.key) {
		case "ArrowLeft":
		case "PageUp": return "previous";
		case "ArrowRight":
		case "PageDown": return "next";
		case "Home": return "first";
		case "End": return "last";
		default: return null;
	}
}
function ye(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function G({ back: e }) {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function be({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: d, notice: f, state: p = "ready", errorMessage: h, onRetry: g, maxSlideWidth: v, className: y, "data-testid": w = "presentation-view" }) {
	let T = I();
	if (p === "loading") return /* @__PURE__ */ z(C, {
		label: "Opening the presentation…",
		testId: `${w}-loading`
	});
	if (p === "error") return /* @__PURE__ */ z(x, {
		title: "This presentation could not be opened",
		...h ? { description: h } : {},
		...g ? {
			actionLabel: "Try again",
			onAction: g
		} : {},
		testId: `${w}-error`
	});
	let E = t.find((e) => e.id === n) ?? t[0], D = E?.slides ?? [];
	if (p === "empty" || !E || D.length === 0) return /* @__PURE__ */ B("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", y),
		"data-testid": w,
		children: [/* @__PURE__ */ z(_, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ z(b, {
			title: "No slides yet",
			description: d?.status === "generating" ? `${d.label} is still being generated.` : d?.status === "failed" ? d.message ?? `${d.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${w}-empty`
		})]
	});
	let O = D[Math.min(Math.max(o, 1), D.length) - 1];
	return /* @__PURE__ */ B("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", y),
		"data-testid": w,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${O.index} of ${D.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = ve(e);
			if (!t) return;
			e.preventDefault();
			let n = ye(t, O.index, D.length);
			n !== O.index && s(n);
		},
		children: [
			/* @__PURE__ */ B("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ z(_, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${w}-title`,
					children: e
				}), /* @__PURE__ */ B("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ z(S, {
							"aria-label": "Revision",
							size: "sm",
							value: E.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${w}-revisions`
						}),
						d && /* @__PURE__ */ z(j, {
							state: d.status === "failed" ? "error" : "pending",
							label: `${d.label} ${d.status}`,
							"data-testid": `${w}-pending`
						}),
						c && /* @__PURE__ */ z(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${w}-download`,
							children: l
						})
					]
				})]
			}),
			/* @__PURE__ */ B("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ B("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ z("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ z("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: v === void 0 ? void 0 : { maxWidth: v },
							"data-testid": `${w}-stage`,
							children: O.preview ?? /* @__PURE__ */ z(_, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${w}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ B("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ z(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ z(G, { back: !0 }),
								disabled: O.index <= 1,
								onClick: () => s(O.index - 1),
								"data-testid": `${w}-previous`
							}),
							/* @__PURE__ */ z(_, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${w}-position`,
								children: `Slide ${O.index} of ${D.length}`
							}),
							/* @__PURE__ */ z(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ z(G, {}),
								disabled: O.index >= D.length,
								onClick: () => s(O.index + 1),
								"data-testid": `${w}-next`
							}),
							u && O.preview && /* @__PURE__ */ z(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(O.id),
								"data-testid": `${w}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ B("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": T,
					"data-testid": `${w}-outline`,
					children: [/* @__PURE__ */ z(A, {
						as: "div",
						className: "mb-1",
						"data-testid": `${w}-outline-label`,
						children: /* @__PURE__ */ z("span", {
							id: T,
							children: "Slides"
						})
					}), /* @__PURE__ */ z("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: D.map((e) => /* @__PURE__ */ z("li", { children: /* @__PURE__ */ B("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === O.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === O.id && "bg-surface-hover font-medium"),
							"data-testid": `${w}-outline-row`,
							children: [/* @__PURE__ */ z("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ z("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			f && /* @__PURE__ */ z(_, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${w}-notice`,
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var K = 40, q = 8, J = 200, Y = 120, X = 200, xe = 60, Se = 2e3, Ce = 24, we = 6, Te = 400, Z = 10, Ee = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, De = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], Oe = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Q = [
	"product",
	"engineering",
	"plain"
];
function ke(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Ae(e) {
	return e.slides.length > 0 && ke(e).length === 0;
}
function $(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function je(e, t = "bullets") {
	return Me({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Me(e, t) {
	let n = {
		...e,
		layout: t
	};
	return t === "bullets" && !n.bullets && (n.bullets = [""]), t === "two-column" && !n.columns && (n.columns = [[""], [""]]), t === "chart" && !n.chart && (n.chart = {
		kind: "bar",
		labels: ["Q1", "Q2"],
		series: [{
			name: "Series 1",
			values: [0, 0]
		}]
	}), t === "quote" && !n.quote && (n.quote = {
		text: "",
		by: ""
	}), t === "image" && !n.image && (n.image = { alt: "" }), n;
}
function Ne(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Pe(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Fe(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = je($(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Ie(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: $(e),
		bullets: r.bullets ? r.bullets.slice() : void 0,
		columns: r.columns ? [r.columns[0].slice(), r.columns[1].slice()] : void 0,
		chart: r.chart ? {
			kind: r.chart.kind,
			labels: r.chart.labels.slice(),
			series: r.chart.series.map((e) => ({
				name: e.name,
				values: e.values.slice()
			}))
		} : void 0,
		quote: r.quote ? { ...r.quote } : void 0,
		image: r.image ? { ...r.image } : void 0,
		sources: r.sources.map((e) => ({ ...e }))
	}, a = e.slides.slice();
	return a.splice(n + 1, 0, i), {
		...e,
		slides: a
	};
}
function Le(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function Re(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ze = {
	document: "📄",
	transcript: "🎙️"
};
function Be({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = R(""), [d, f] = R(!1), [p, m] = R(n), h = I(), g = L(0);
	F(() => {
		let e = l.trim();
		if (!a) {
			let t = e.toLowerCase();
			m(t ? n.filter((e) => e.title.toLowerCase().includes(t)) : n);
			return;
		}
		let t = ++g.current, r = !1;
		return Promise.resolve(a(e)).then((e) => {
			r || t !== g.current || m(e);
		}).catch(() => {
			!r && t === g.current && m(n);
		}), () => {
			r = !0;
		};
	}, [
		l,
		a,
		n
	]);
	let v = e.map((e) => ({
		id: `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}`,
		label: e.anchor ? `${e.title} · ${e.anchor}` : e.title,
		icon: "📄",
		title: e.title
	})), y = e.length >= 10, b = (n) => {
		y || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), u(""), f(!1));
	}, x = /* @__PURE__ */ z(ie, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ B("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ z(w, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ z(_, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ z(_, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ z("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ z("li", { children: /* @__PURE__ */ B(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ z("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ze[t.kind ?? "document"]
						}),
						/* @__PURE__ */ z("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ z("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ B("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ B("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ z(A, {
					as: "div",
					children: /* @__PURE__ */ z("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ z(_, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ z("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ z(i, {
					variant: "ghost",
					size: "sm",
					"aria-expanded": d,
					disabled: y && !d,
					onClick: () => {
						f((e) => !e), u("");
					},
					"data-testid": `${c}-add-source`,
					children: d ? "Done" : "+ Add source"
				})
			]
		}), !o && d && S]
	}) : /* @__PURE__ */ B("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ z(A, {
				as: "div",
				children: /* @__PURE__ */ z("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ z(k, {
				tone: "warning",
				"data-testid": `${c}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : x,
			!o && S
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function Ve() {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function He({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ B("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ z(A, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ z("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ B("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ z(_, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ z(D, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ z(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ z(Ve, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ z(i, {
				variant: "ghost",
				size: "sm",
				disabled: t.length >= 8,
				onClick: () => n([...t, ""]),
				"data-testid": `${a}-add`,
				className: "self-start",
				children: "Add bullet"
			})
		]
	});
}
function Ue({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let a = (n, r, i) => {
		let a = Number(i), o = e.series.map((e, t) => {
			if (t !== n) return e;
			let i = e.values.slice();
			return i[r] = Number.isFinite(a) ? a : 0, {
				...e,
				values: i
			};
		});
		t({
			...e,
			series: o
		});
	}, o = () => {
		e.labels.length >= 24 || t({
			...e,
			labels: [...e.labels, `Label ${e.labels.length + 1}`],
			series: e.series.map((e) => ({
				...e,
				values: [...e.values, 0]
			}))
		});
	}, s = (n) => {
		e.labels.length <= 1 || t({
			...e,
			labels: e.labels.filter((e, t) => t !== n),
			series: e.series.map((e) => ({
				...e,
				values: e.values.filter((e, t) => t !== n)
			}))
		});
	};
	return /* @__PURE__ */ B("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ B("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ z(T, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ z(te, {
					...i,
					size: "sm",
					value: e.kind,
					disabled: n,
					options: [{
						value: "bar",
						label: "Bar"
					}, {
						value: "line",
						label: "Line"
					}],
					onChange: (n) => t({
						...e,
						kind: n.target.value
					}),
					"data-testid": `${r}-kind`
				})
			}), !n && /* @__PURE__ */ B(se, { children: [/* @__PURE__ */ z(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ z(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.series.length >= 6,
				onClick: () => t({
					...e,
					series: [...e.series, {
						name: `Series ${e.series.length + 1}`,
						values: e.labels.map(() => 0)
					}]
				}),
				"data-testid": `${r}-add-series`,
				children: "Add series"
			})] })]
		}), /* @__PURE__ */ z("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ B(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ z(f, { children: /* @__PURE__ */ B(l, { children: [
					/* @__PURE__ */ z(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ z(d, { children: /* @__PURE__ */ z(D, {
						size: "sm",
						value: i.name,
						disabled: n,
						"aria-label": `Series ${a + 1} name`,
						onChange: (n) => t({
							...e,
							series: e.series.map((e, t) => t === a ? {
								...e,
								name: n.target.value
							} : e)
						}),
						"data-testid": `${r}-series-name-${a}`
					}) }, a)),
					!n && /* @__PURE__ */ z(d, {})
				] }) }), /* @__PURE__ */ z(u, { children: e.labels.map((i, o) => /* @__PURE__ */ B(l, { children: [
					/* @__PURE__ */ z(c, { children: /* @__PURE__ */ z(D, {
						size: "sm",
						value: i,
						disabled: n,
						"aria-label": `Row ${o + 1} label`,
						onChange: (n) => t({
							...e,
							labels: e.labels.map((e, t) => t === o ? n.target.value : e)
						}),
						"data-testid": `${r}-label-${o}`
					}) }),
					e.series.map((e, t) => /* @__PURE__ */ z(c, { children: /* @__PURE__ */ z(D, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ z(c, { children: /* @__PURE__ */ z(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ z(Ve, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function We({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, testIdPrefix: s }) {
	let c = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ B("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${s}-form`,
		children: [
			/* @__PURE__ */ B("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ z(T, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ z(D, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => c({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${s}-eyebrow`
					})
				}), /* @__PURE__ */ z(T, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ z(D, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => c({ title: e.target.value }),
						"data-testid": `${s}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ z(He, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => c({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${s}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ B("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ z(He, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => c({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${s}-column-0`
				}), /* @__PURE__ */ z(He, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => c({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${s}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ z(Ue, {
				chart: e.chart,
				onChange: (e) => c({ chart: e }),
				readOnly: a,
				testIdPrefix: `${s}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ B("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ z(T, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ z(O, {
						...t,
						rows: 3,
						maxLength: 400,
						value: e.quote?.text ?? "",
						disabled: a,
						onChange: (t) => c({ quote: {
							text: t.target.value,
							by: e.quote?.by ?? ""
						} }),
						"data-testid": `${s}-quote-text`
					})
				}), /* @__PURE__ */ z(T, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ z(D, {
						...t,
						value: e.quote?.by ?? "",
						disabled: a,
						onChange: (t) => c({ quote: {
							text: e.quote?.text ?? "",
							by: t.target.value
						} }),
						"data-testid": `${s}-quote-by`
					})
				})]
			}),
			e.layout === "image" && /* @__PURE__ */ z(T, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ z(D, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => c({ image: { alt: e.target.value } }),
					"data-testid": `${s}-image-alt`
				})
			}),
			/* @__PURE__ */ z(T, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ z(O, {
					...t,
					rows: 3,
					maxLength: Se,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => c({ notes: e.target.value || void 0 }),
					"data-testid": `${s}-notes`
				})
			}),
			o && /* @__PURE__ */ z(Be, {
				sources: e.sources,
				onChange: (e) => c({ sources: e }),
				options: n,
				onSearchSources: i,
				readOnly: a,
				testIdPrefix: s
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function Ge(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Ke() {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function qe() {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Je() {
	return /* @__PURE__ */ B("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ z("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ z("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Ye() {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Xe({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = Ge(i);
	return /* @__PURE__ */ B("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ z("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ B("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ z("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ z("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ z("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ z(_, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ B("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ z(_, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ z(_, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ z(_, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ z(_, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ B("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ B("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ z(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ z(Ke, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ z(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ z(qe, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ B("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ z(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ z(Je, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ z(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ z(Ye, {}),
						disabled: !h,
						onClick: () => f(e.id),
						"data-testid": `${b}-delete-${e.id}`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideList.tsx
function Ze({ items: e, selectedId: t, readOnly: n = !1, onSelect: r, onMove: i, onDuplicate: a, onDelete: o, canDuplicate: s, testIdPrefix: c }) {
	return /* @__PURE__ */ z("ol", {
		className: "m-0 flex list-none flex-col gap-1 p-0",
		"data-testid": `${c}-list`,
		children: e.map((l, u) => /* @__PURE__ */ z(Xe, {
			slide: l.slide,
			index: u,
			total: e.length,
			thumbnailSvg: l.thumbnailSvg,
			selected: l.slide.id === t,
			uncited: l.uncited,
			changed: l.changed,
			readOnly: n,
			onSelect: r,
			onMove: i,
			onDuplicate: a,
			onDelete: o,
			canDuplicate: s,
			canDelete: e.length > 1,
			testIdPrefix: c
		}, l.slide.id))
	});
}
//#endregion
//#region src/components/doc-editor/presentation/PresentationEditor.tsx
var Qe = N(() => import("./SortableSlideList-C3iDIwY_.js"));
function $e({ testIdPrefix: e }) {
	return /* @__PURE__ */ z(k, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var et = N(() => import("./PresentationAgentComposer-CgepA7Ip.js").catch(() => ({ default: $e })));
function tt({ back: e }) {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ z("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function nt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: v, onUndoInstruct: y, className: S, "data-testid": w = "presentation-editor" }) {
	let [O, j] = R(() => e.slides[0]?.id ?? ""), [ne, re] = R(!1), [ie, M] = R(null), N = !!g, [I, V] = R("slide"), [ce, le] = R(!1), [ue, de] = R(null), [fe, H] = R(null), [U, pe] = R(() => /* @__PURE__ */ new Set()), [me, W] = R([]);
	F(() => {
		typeof n == "object" && "slides" in n && W(n.slides);
	}, [n]);
	let _e = L(a);
	_e.current = a;
	let G = e.slides, K = oe(() => new Set(ke(e)), [e]), q = K.size === 0;
	F(() => {
		q && _e.current(e);
	}, [e, q]);
	let J = Math.max(G.findIndex((e) => e.id === O), 0), Y = G[J], X = oe(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : me;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, me]), xe = G.map((e) => ({
		slide: e,
		thumbnailSvg: X.get(e.id),
		uncited: K.has(e.id),
		changed: U.has(e.id)
	})), Se = P((e) => {
		j(e);
	}, []), Ce = P((n, r) => {
		t(Pe(e, n, r));
	}, [t, e]), we = P(() => {
		let n = Fe(e, J);
		n !== e && (t(n), j(n.slides[J + 1].id));
	}, [
		t,
		e,
		J
	]), Te = P((n) => {
		let r = Ie(e, n);
		if (r === e) return;
		let i = r.slides.findIndex((e) => e.id === n);
		t(r), j(r.slides[i + 1].id);
	}, [t, e]), Z = P((n) => {
		let r = e.slides.findIndex((e) => e.id === n), i = Le(e, n);
		i !== e && (t(i), j(i.slides[Math.min(r, i.slides.length - 1)].id));
	}, [t, e]), Ee = P(async (e) => {
		if (!g || ce) return !1;
		let t = Y?.id;
		le(!0), H(null);
		try {
			let n = await g(e, I === "slide" && t ? {
				slideId: t,
				scope: I
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return pe(new Set(r)), de(n?.summary?.trim() || "Done."), I === "deck" && r.length && (!t || !r.includes(t)) && j(r[0]), !0;
		} catch (e) {
			return H(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			le(!1);
		}
	}, [
		g,
		ce,
		I,
		Y?.id
	]), Ae = P(() => {
		y?.(), de(null), pe(/* @__PURE__ */ new Set());
	}, [y]), $ = K.size, je = !h && G.length > 0 && $ === 0 && !ne, ze = P(() => {
		je && (re(!0), M(null), Promise.resolve(o(e)).catch((e) => {
			M(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => re(!1)));
	}, [
		je,
		o,
		e
	]), Ve = P((e) => {
		let t = G[J + e];
		t && j(t.id);
	}, [G, J]);
	if (F(() => {
		let e = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
				e.preventDefault(), ze();
				return;
			}
			let t = ve(e);
			if (!t) return;
			e.preventDefault();
			let n = ye(t, J + 1, G.length);
			n !== J + 1 && Ve(n - (J + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		ze,
		Ve,
		J,
		G.length
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? G.map((e, t) => {
				let n = Ge(X.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ z("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ z(be, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: J + 1,
			onSlideChange: (e) => {
				let t = G[e - 1];
				t && j(t.id);
			},
			...f ? { onDownload: f } : {},
			className: S,
			"data-testid": `${w}-readonly`
		});
	}
	let He = (() => {
		if (Y && K.has(Y.id)) return /* @__PURE__ */ z(b, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${w}-preview-needs-source`
		});
		let t = Y ? Ge(X.get(Y.id)) : void 0;
		if (!q && !t) return /* @__PURE__ */ z(b, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${w}-preview-needs-source`
		});
		if (n === "loading" && X.size === 0) return /* @__PURE__ */ z(C, {
			label: "Rendering the deck…",
			testId: `${w}-preview-loading`
		});
		if (q && typeof n == "object" && "error" in n) return /* @__PURE__ */ z(x, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${w}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ z("img", {
			src: r,
			alt: Y.title || `Slide ${J + 1}`,
			className: "max-h-full max-w-full object-contain",
			"data-testid": `${w}-stage-image`
		}) : /* @__PURE__ */ z(_, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${w}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ue = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ke = /* @__PURE__ */ B("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			Ue.length > 0 && /* @__PURE__ */ z(E, {
				items: Ue,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${w}-revisions`
			}),
			/* @__PURE__ */ z(i, {
				variant: "primary",
				size: "sm",
				disabled: !je,
				onClick: ze,
				"data-testid": `${w}-save`,
				children: ne ? "Saving…" : `Save as ${Re(s)}`
			}),
			f && /* @__PURE__ */ z(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${w}-download`,
				children: "Download .pptx"
			}),
			p && /* @__PURE__ */ z(i, {
				variant: "ghost",
				size: "sm",
				onClick: p,
				"data-testid": `${w}-open-view`,
				children: "Open in presentation view"
			})
		]
	});
	return /* @__PURE__ */ B("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": w,
		onKeyDown: (e) => {
			e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
		},
		children: [
			N ? /* @__PURE__ */ B("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				"data-testid": `${w}-deck-line`,
				children: [/* @__PURE__ */ B("div", {
					className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ z(he, {
							value: e.title,
							required: !0,
							label: "Deck title",
							maxLength: 120,
							onCommit: (n) => t({
								...e,
								title: n
							}),
							"data-testid": `${w}-deck-title`
						}),
						/* @__PURE__ */ z(he, {
							value: e.subtitle ?? "",
							label: "Subtitle",
							placeholder: "Add a subtitle",
							tone: "muted",
							maxLength: 200,
							onCommit: (n) => t({
								...e,
								subtitle: n || void 0
							}),
							"data-testid": `${w}-deck-subtitle`
						}),
						/* @__PURE__ */ z(te, {
							size: "sm",
							variant: "pill",
							"aria-label": "Theme",
							value: e.theme ?? "product",
							options: Q.map((e) => ({
								value: e,
								label: `${e} theme`
							})),
							onChange: (n) => t({
								...e,
								theme: n.target.value
							}),
							"data-testid": `${w}-deck-theme`
						})
					]
				}), Ke]
			}) : /* @__PURE__ */ B("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ B("div", {
					className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]",
					children: [
						/* @__PURE__ */ z(T, {
							label: "Deck title",
							required: !0,
							children: (n) => /* @__PURE__ */ z(D, {
								...n,
								value: e.title,
								maxLength: 120,
								onChange: (n) => t({
									...e,
									title: n.target.value
								}),
								"data-testid": `${w}-deck-title`
							})
						}),
						/* @__PURE__ */ z(T, {
							label: "Subtitle",
							children: (n) => /* @__PURE__ */ z(D, {
								...n,
								value: e.subtitle ?? "",
								maxLength: 200,
								onChange: (n) => t({
									...e,
									subtitle: n.target.value || void 0
								}),
								"data-testid": `${w}-deck-subtitle`
							})
						}),
						/* @__PURE__ */ z(T, {
							label: "Theme",
							children: (n) => /* @__PURE__ */ z(te, {
								...n,
								value: e.theme ?? "product",
								options: Q.map((e) => ({
									value: e,
									label: e
								})),
								onChange: (n) => t({
									...e,
									theme: n.target.value
								}),
								"data-testid": `${w}-deck-theme`
							})
						})
					]
				}), Ke]
			}),
			$ > 0 && /* @__PURE__ */ z(k, {
				tone: "warning",
				"data-testid": `${w}-uncited-warning`,
				children: $ === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${$} slides cite no source. Every slide names at least one — Save is off until they do.`
			}),
			ie && /* @__PURE__ */ z(k, {
				tone: "error",
				onDismiss: () => M(null),
				"data-testid": `${w}-save-error`,
				children: ie
			}),
			/* @__PURE__ */ B("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ B("div", {
					className: "flex min-w-0 flex-col gap-2 md:w-72",
					"data-testid": `${w}-rail`,
					children: [
						/* @__PURE__ */ B("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ z(A, {
								as: "div",
								children: "Slides"
							}), /* @__PURE__ */ z(ee, {
								value: G.length / 40,
								segments: 10,
								showPercent: !1,
								tone: "surface",
								note: `${G.length} / 40`,
								"data-testid": `${w}-slide-meter`
							})]
						}),
						/* @__PURE__ */ B("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ z(T, {
								label: "Layout",
								className: "min-w-0 flex-1",
								children: (n) => /* @__PURE__ */ z(te, {
									...n,
									size: "sm",
									value: Y?.layout ?? "bullets",
									disabled: !Y,
									options: De.map((e) => ({
										value: e,
										label: Oe[e]
									})),
									onChange: (n) => {
										Y && t(Ne(e, Me(Y, n.target.value)));
									},
									"data-testid": `${w}-layout`
								})
							}), /* @__PURE__ */ z(i, {
								variant: "secondary",
								size: "sm",
								disabled: G.length >= 40,
								onClick: we,
								"data-testid": `${w}-add-slide`,
								children: "Add slide"
							})]
						}),
						/* @__PURE__ */ z("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ z(ae, {
								fallback: /* @__PURE__ */ z(Ze, {
									items: xe,
									selectedId: Y?.id ?? "",
									onSelect: Se,
									onMove: Ce,
									onDuplicate: Te,
									onDelete: Z,
									canDuplicate: G.length < 40,
									testIdPrefix: `${w}-slide`
								}),
								children: /* @__PURE__ */ z(Qe, {
									items: xe,
									selectedId: Y?.id ?? "",
									onSelect: Se,
									onMove: Ce,
									onDuplicate: Te,
									onDelete: Z,
									canDuplicate: G.length < 40,
									testIdPrefix: `${w}-slide`
								})
							})
						})
					]
				}), /* @__PURE__ */ B("div", {
					className: "flex min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ z("div", {
							className: "flex min-h-[14rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40 p-2",
							"data-testid": `${w}-stage`,
							children: He
						}),
						/* @__PURE__ */ B("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ z(m, {
									"aria-label": "Previous slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ z(tt, { back: !0 }),
									disabled: J <= 0,
									onClick: () => Ve(-1),
									"data-testid": `${w}-previous`
								}),
								/* @__PURE__ */ z(_, {
									className: "text-[13px] text-text-secondary",
									"data-testid": `${w}-position`,
									children: `Slide ${G.length === 0 ? 0 : J + 1} of ${G.length}`
								}),
								/* @__PURE__ */ z(m, {
									"aria-label": "Next slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ z(tt, {}),
									disabled: J >= G.length - 1,
									onClick: () => Ve(1),
									"data-testid": `${w}-next`
								})
							]
						}),
						N && Y && /* @__PURE__ */ B(se, { children: [
							/* @__PURE__ */ z(ae, {
								fallback: /* @__PURE__ */ z(_, {
									className: "text-[12px] text-text-tertiary",
									"data-testid": `${w}-agent-loading`,
									children: "Loading the agent…"
								}),
								children: /* @__PURE__ */ z(et, {
									scope: I,
									onScopeChange: V,
									slideLabel: `slide ${J + 1}`,
									busy: ce,
									onSubmit: Ee,
									...v?.length ? { suggestions: v } : {},
									testIdPrefix: w
								})
							}),
							fe && /* @__PURE__ */ z(k, {
								tone: "error",
								onDismiss: () => H(null),
								"data-testid": `${w}-agent-error`,
								children: fe
							}),
							ue && !fe && /* @__PURE__ */ B("div", {
								className: "flex min-w-0 flex-wrap items-center gap-2",
								role: "status",
								"data-testid": `${w}-agent-summary`,
								children: [
									/* @__PURE__ */ z(_, {
										as: "span",
										className: "min-w-0 flex-1 truncate text-[12px] text-success-fg",
										title: ue,
										children: `✓ ${ue}`
									}),
									U.size > 0 && /* @__PURE__ */ z(_, {
										as: "span",
										className: "text-[11px] text-text-tertiary",
										children: U.size === 1 ? "1 slide marked in the rail" : `${U.size} slides marked in the rail`
									}),
									y && /* @__PURE__ */ z(i, {
										variant: "ghost",
										size: "sm",
										onClick: Ae,
										"data-testid": `${w}-agent-undo`,
										children: "Undo"
									})
								]
							}),
							/* @__PURE__ */ z(Be, {
								compact: !0,
								sources: Y.sources,
								onChange: (n) => t(Ne(e, {
									...Y,
									sources: n
								})),
								options: u,
								onSearchSources: d,
								testIdPrefix: `${w}-slide`
							}),
							/* @__PURE__ */ z(ge, {
								summary: "Edit slide details",
								density: "compact",
								"data-testid": `${w}-details`,
								children: /* @__PURE__ */ z(We, {
									slide: Y,
									onChange: (n) => t(Ne(e, n)),
									sources: u,
									onSearchSources: d,
									showSources: !1,
									testIdPrefix: `${w}-slide`
								})
							})
						] }),
						!N && Y && /* @__PURE__ */ z(We, {
							slide: Y,
							onChange: (n) => t(Ne(e, n)),
							sources: u,
							onSearchSources: d,
							testIdPrefix: `${w}-slide`
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Ne as A, Ae as C, Re as D, Pe as E, he as F, pe as I, me as L, Me as M, be as N, $ as O, ge as P, U as R, Fe as S, je as T, X as _, We as a, De as b, q as c, we as d, xe as f, Z as g, K as h, Ge as i, ke as j, Le as k, J as l, Te as m, Ze as n, Be as o, Se as p, Xe as r, Q as s, nt as t, Ce as u, Y as v, Ie as w, Oe as x, Ee as y, H as z };
