import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-BDlo8PJg.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { T as h, c as g, t as _ } from "./DropdownMenu-BXhLlQ0B.js";
import { n as v, s as y } from "./Text-Bu-inXL-.js";
import { t as b } from "./Chip-DYqbAD3L.js";
import { t as x } from "./Modal-D2qxMX2_.js";
import { t as S } from "./EmptyState-DQYx5Oyy.js";
import { i as C, n as w, r as T, t as E } from "./SearchInput-DXbGHmns.js";
import { t as D } from "./FormField-E8Z0ppOp.js";
import { n as O } from "./Tabs-BGZyr2nH.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as ee } from "./Textarea-Dz4doxTv.js";
import { t as te } from "./DotMeter-BDVkadI8.js";
import { n as A } from "./RovingToolbar-CmQag9q6.js";
import { t as ne } from "./InlineAlert-CRnIKeAF.js";
import { t as j } from "./SectionLabel-bcrhNYOr.js";
import { t as M } from "./StatusPill-Db42eiME.js";
import { t as re } from "./Select-CD8ixtYi.js";
import { G as ie, U as ae } from "./renderers-5O9bh08s.js";
import { t as oe } from "./ComposerReferences-nGKcicNt.js";
import { Component as N, Suspense as se, createContext as P, lazy as ce, useCallback as F, useContext as I, useEffect as L, useId as le, useLayoutEffect as ue, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var de = /* @__PURE__ */ new Set(["diagram", "presentation"]), fe = [
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
], pe = [
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
function me(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function he(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function W(t) {
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
function ge({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = B([]), [d, f] = B(!1), [p, m] = B(null), [h, g] = B(null), [_, v] = B(""), [S, C] = B(""), [w, T] = B(!1), [E, D] = B(""), [O, te] = B("page"), [A, ne] = B("blank"), [j, M] = B(""), [oe, N] = B(""), [se, P] = B([]), ce = z(null), F = z(null), I = le(), ue = `${I}-blank-label`, ge = `${I}-type-label`, _e = `${I}-cookbook-label`, ve = `${I}-title`, ye = `${I}-description`, be = `${I}-deck-from`, xe = `${I}-deck-source`;
	L(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), v(""), C(""), T(!1), D(""), te("page"), ne("blank"), M(""), N(""), P([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => ce.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let G = R(() => fe.filter((e) => me(e, _)), [_]), K = R(() => l.filter((e) => he(e, _)), [l, _]), Se = R(() => ae.filter((e) => ie(e, _)), [_]);
	if (L(() => {
		if (!e || O !== "presentation") return;
		if (A === "blank") {
			P([]);
			return;
		}
		let t = oe.trim().toLowerCase();
		if (A === "transcript") {
			let e = c ?? [];
			P(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			P([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(oe.trim())).then((e) => {
			n || P(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		A,
		oe,
		c,
		s
	]), !e) return null;
	let Ce = l.find((e) => e.id === p), q = h ? ae.find((e) => e.id === h) : void 0, we = O === "sections", Te = !!q || !!Ce, J = l.length === 0 && !d && !q, Y = G.length === 0 && K.length === 0 && Se.length === 0, Ee = q ? {
		kind: "cookbook",
		cookbook: q
	} : Ce && !de.has(O) ? {
		kind: "type",
		type: Ce
	} : {
		kind: "blank",
		shape: O
	}, X = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), de.has(O) && te("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			te(e.shape), de.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, De = (e) => e.kind === "blank" ? e.shape : de.has(O) ? "page" : O, Z = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = E.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: A,
				...A !== "blank" && j ? { sourceId: j } : {},
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
			let t = W(e.cookbook);
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
	}, Q = O === "presentation" && A !== "blank" && !j, Oe = !!S.trim() && (!we || Te) && !Q, ke = () => {
		Oe && Z(Ee, S, De(Ee));
	};
	return /* @__PURE__ */ H(x, {
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
		children: /* @__PURE__ */ U("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Oe && ke();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ H("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ U("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ H(k, {
						ref: ce,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: _,
						onChange: (e) => v(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = Se.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: Se[0]
							} : G.length > 0 ? {
								kind: "blank",
								shape: G[0].id
							} : K.length > 0 ? {
								kind: "type",
								type: K[0]
							} : void 0;
							if (!t) return;
							X(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								F.current?.focus();
								return;
							}
							Z(t, n, De(t));
						}
					}), /* @__PURE__ */ H("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ U("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						G.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ H("div", {
								id: ue,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": ue,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: G.map((e) => /* @__PURE__ */ U(y, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => X({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ U("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ H("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ H("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ H(b, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ H("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ H("label", {
									htmlFor: be,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ H(re, {
									id: be,
									value: A,
									options: pe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ne(e.target.value), M(""), N("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ H("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ U("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ H(k, {
										type: "search",
										value: oe,
										onChange: (e) => N(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), se.length === 0 ? /* @__PURE__ */ H("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("label", {
										htmlFor: xe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ H("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ H(re, {
										id: xe,
										required: !0,
										"aria-required": "true",
										value: j,
										placeholder: "Choose one…",
										options: se.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => M(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						Se.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ U("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ H("div", {
									id: _e,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ H("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": _e,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: Se.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ U(y, {
										padding: "md",
										selected: t,
										onSelect: () => X({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ U("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ H("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ H("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ H("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ H("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!de.has(O) && (K.length > 0 || J || l.length === 0 && d) && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ U("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ H("span", {
										id: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !we && /* @__PURE__ */ H("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ H("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								J && /* @__PURE__ */ H("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: we ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								K.length > 0 && /* @__PURE__ */ H("div", {
									role: "group",
									"aria-labelledby": ge,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: K.map((e) => {
										let t = !q && p === e.id;
										return /* @__PURE__ */ U("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => X({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ H("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ U("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ H("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ H("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ H("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ H("span", {
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
						Y && /* @__PURE__ */ U("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								_,
								"”. Clear the search to see every starting point."
							]
						})
					]
				}),
				/* @__PURE__ */ U("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ U("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ U("label", {
							htmlFor: ve,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ H("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ H(k, {
							ref: F,
							id: ve,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: q ? `e.g. ${q.name}` : Ce ? `e.g. Q2 ${Ce.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("label", {
						htmlFor: ye,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ H("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ H(ee, {
						id: ye,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => D(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ U("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ H("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ H("button", {
						"data-testid": "new-doc-submit",
						onClick: ke,
						disabled: !Oe,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Oe ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var _e = class extends N {
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
		return this.state.hasError ? /* @__PURE__ */ U("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ H("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ H("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ H("button", {
					onClick: this.handleRetry,
					className: "bg-danger text-white border-none rounded-md px-4 py-1.5 text-[0.8rem] font-semibold cursor-pointer font-[inherit]",
					children: "Retry"
				})
			]
		}) : this.props.children;
	}
};
//#endregion
//#region src/components/ui/Disclosure.tsx
function ve({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": h = "disclosure" }) {
	let _ = n !== void 0, [v, y] = B(i), b = _ ? n : v, x = z(null);
	L(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ U("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": h,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ U("summary", {
			"data-testid": `${h}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ H(g, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ H("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ H("div", {
			"data-testid": `${h}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function ye({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = le(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ U("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ H(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ H(b, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ H("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("span", { className: "flex-1" }), /* @__PURE__ */ H("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ H(S, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ H("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ H("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function be({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ H("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var xe = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function G({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", className: u, "data-testid": d = "inline-editable-text" }) {
	let [f, p] = B(!1), [m, h] = B(e), g = z(null);
	L(() => {
		f || h(e);
	}, [e, f]), L(() => {
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
	return f ? /* @__PURE__ */ H(k, {
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
	}) : /* @__PURE__ */ H("button", {
		type: "button",
		disabled: s,
		onClick: () => p(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": d,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", xe[l], !e && "italic text-text-tertiary", u),
		children: e || i
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function K(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Se(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || K(e.target)) return null;
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
function Ce(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function q({ back: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function we({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: d, notice: f, state: p = "ready", errorMessage: h, onRetry: g, maxSlideWidth: _, className: y, "data-testid": b = "presentation-view" }) {
	let x = le();
	if (p === "loading") return /* @__PURE__ */ H(T, {
		label: "Opening the presentation…",
		testId: `${b}-loading`
	});
	if (p === "error") return /* @__PURE__ */ H(C, {
		title: "This presentation could not be opened",
		...h ? { description: h } : {},
		...g ? {
			actionLabel: "Try again",
			onAction: g
		} : {},
		testId: `${b}-error`
	});
	let E = t.find((e) => e.id === n) ?? t[0], D = E?.slides ?? [];
	if (p === "empty" || !E || D.length === 0) return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", y),
		"data-testid": b,
		children: [/* @__PURE__ */ H(v, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ H(S, {
			title: "No slides yet",
			description: d?.status === "generating" ? `${d.label} is still being generated.` : d?.status === "failed" ? d.message ?? `${d.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${b}-empty`
		})]
	});
	let O = D[Math.min(Math.max(o, 1), D.length) - 1];
	return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", y),
		"data-testid": b,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${O.index} of ${D.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Se(e);
			if (!t) return;
			e.preventDefault();
			let n = Ce(t, O.index, D.length);
			n !== O.index && s(n);
		},
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ H(v, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${b}-title`,
					children: e
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ H(w, {
							"aria-label": "Revision",
							size: "sm",
							value: E.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${b}-revisions`
						}),
						d && /* @__PURE__ */ H(M, {
							state: d.status === "failed" ? "error" : "pending",
							label: `${d.label} ${d.status}`,
							"data-testid": `${b}-pending`
						}),
						c && /* @__PURE__ */ H(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${b}-download`,
							children: l
						})
					]
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ H("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ H("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: _ === void 0 ? void 0 : { maxWidth: _ },
							"data-testid": `${b}-stage`,
							children: O.preview ?? /* @__PURE__ */ H(v, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${b}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ U("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ H(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(q, { back: !0 }),
								disabled: O.index <= 1,
								onClick: () => s(O.index - 1),
								"data-testid": `${b}-previous`
							}),
							/* @__PURE__ */ H(v, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${b}-position`,
								children: `Slide ${O.index} of ${D.length}`
							}),
							/* @__PURE__ */ H(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(q, {}),
								disabled: O.index >= D.length,
								onClick: () => s(O.index + 1),
								"data-testid": `${b}-next`
							}),
							u && O.preview && /* @__PURE__ */ H(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(O.id),
								"data-testid": `${b}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ U("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": x,
					"data-testid": `${b}-outline`,
					children: [/* @__PURE__ */ H(j, {
						as: "div",
						className: "mb-1",
						"data-testid": `${b}-outline-label`,
						children: /* @__PURE__ */ H("span", {
							id: x,
							children: "Slides"
						})
					}), /* @__PURE__ */ H("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: D.map((e) => /* @__PURE__ */ H("li", { children: /* @__PURE__ */ U("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === O.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === O.id && "bg-surface-hover font-medium"),
							"data-testid": `${b}-outline-row`,
							children: [/* @__PURE__ */ H("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ H("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			f && /* @__PURE__ */ H(v, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${b}-notice`,
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/FloatingComposerDock.tsx
var Te = {
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl"
}, J = P("overlay"), Y = "--dock-height";
function Ee({ composer: e, strip: t, above: n, maxWidth: i = "3xl", label: a = "Composer", className: o, "data-testid": s = "floating-composer-dock" }) {
	let c = z(null), l = I(J);
	return ue(() => {
		if (l !== "overlay") return;
		let e = c.current, t = e?.parentElement;
		if (!e || !t) return;
		let n = (e) => t.style.setProperty(Y, `${Math.ceil(e)}px`);
		n(e.getBoundingClientRect().height);
		let r = null;
		return typeof ResizeObserver < "u" && (r = new ResizeObserver(([e]) => {
			e && n(e.target.getBoundingClientRect().height);
		}), r.observe(e)), () => {
			r?.disconnect(), t.style.removeProperty(Y);
		};
	}, [l]), /* @__PURE__ */ H("div", {
		ref: c,
		role: "region",
		"aria-label": a,
		"data-testid": s,
		"data-placement": l,
		className: r(l === "pinned" ? "relative shrink-0 bg-workspace px-4 pb-3 pt-2" : "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8", o),
		children: /* @__PURE__ */ U("div", {
			className: r("pointer-events-auto mx-auto flex w-full flex-col", Te[i]),
			children: [
				n && /* @__PURE__ */ H("div", {
					className: "mb-2",
					"data-testid": `${s}-above`,
					children: n
				}),
				t && /* @__PURE__ */ H("div", {
					"data-testid": `${s}-strip`,
					children: t
				}),
				/* @__PURE__ */ H("div", {
					className: r("rounded-lg shadow-lg", t && "rounded-t-none [&_.chat-composer]:rounded-t-none"),
					"data-testid": `${s}-composer`,
					children: e
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function X(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function De() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Z() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Q() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ H("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ H("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Oe() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function ke({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: y = !1, testIdPrefix: b }) {
	let x = X(i);
	return /* @__PURE__ */ U("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ H("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ H("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ H("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ H("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ H(v, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ U("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ H(v, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ H(v, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ H(v, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ H(v, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ U("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ U("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ H(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(De, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ H(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Z, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ U("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ H(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Q, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ H(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Oe, {}),
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
function Ae({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = ke, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ H("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ H(l, {
			slide: r.slide,
			index: u,
			total: e.length,
			thumbnailSvg: r.thumbnailSvg,
			selected: r.slide.id === t,
			uncited: r.uncited,
			changed: r.changed,
			generating: r.generating,
			readOnly: n,
			onSelect: i,
			onMove: a,
			onDuplicate: o,
			onDelete: s,
			canDuplicate: c,
			canDelete: e.length > 1,
			testIdPrefix: d
		}, r.slide.id))
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var je = 40, Me = 8, Ne = 200, Pe = 120, Fe = 200, Ie = 60, Le = 2e3, Re = 24, ze = 6, Be = 400, Ve = 10, He = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ue = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], $ = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, We = [
	"product",
	"engineering",
	"plain"
];
function Ge(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Ke(e) {
	return e.slides.length > 0 && Ge(e).length === 0;
}
function qe(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Je(e, t = "bullets") {
	return Ye({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ye(e, t) {
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
function Xe(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Ze(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Qe(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Je(qe(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function $e(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: qe(e),
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
function et(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function tt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var nt = ce(() => import("./SortableSlideList-D-2YjP2O.js"));
function rt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function it(e, t) {
	rt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function at() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ H("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ H("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ H("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function ot({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, readOnly: l = !1, onSelect: u, onMove: d, onDuplicate: f, onDelete: p, canDuplicate: m, canDelete: h, dragHandle: g, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = X(i), C = t + 1, w = e.title || "Untitled slide", T = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => d(t, t - 1),
			"data-testid": `${x}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => d(t, t + 1),
			"data-testid": `${x}-down-${e.id}`
		}] : [],
		...m ? [{
			label: "Duplicate",
			onSelect: () => f(e.id),
			"data-testid": `${x}-duplicate-${e.id}`
		}] : [],
		...h ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => p(e.id),
			"data-testid": `${x}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ U("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ U("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
			}), !l && g && /* @__PURE__ */ H("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: g
			})]
		}), /* @__PURE__ */ U("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => u(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ H("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ U("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ H(v, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ H(v, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: $[e.layout]
						})]
					}), c && /* @__PURE__ */ H("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ H(v, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ U("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						/* @__PURE__ */ H(v, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}),
						s && !c && /* @__PURE__ */ H(v, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ H(v, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				!l && T.length > 0 && /* @__PURE__ */ H("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ H(_, {
						trigger: /* @__PURE__ */ H(at, {}),
						triggerLabel: `Slide ${C} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "bg-surface/90 px-1 py-0.5",
						triggerTestId: `${x}-menu-${e.id}`,
						align: "end",
						sections: [{ items: T }],
						"data-testid": `${x}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function st({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, readOnly: d = !1, className: f, testIdPrefix: p = "filmstrip" }) {
	let m = z(null), g = R(() => new Set(u ?? []), [u]), _ = R(() => e.map((e) => g.has(e.slide.id) ? {
		...e,
		generating: !0
	} : e), [e, g]), y = R(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...g].filter((e) => !t.has(e));
	}, [e, g]);
	L(() => {
		rt(m.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let b = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = e.findIndex((e) => e.slide.id === t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= e.length) return;
		r.preventDefault();
		let s = e[i].slide.id;
		if (r.altKey) {
			if (d) return;
			a(i, o), requestAnimationFrame(() => it(m.current, s));
			return;
		}
		let c = e[o].slide.id;
		n(c), it(m.current, c);
	}, x = {
		items: _,
		selectedId: t,
		readOnly: d,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ot,
		listClassName: "gap-2.5",
		testIdPrefix: p
	};
	return /* @__PURE__ */ U("div", {
		ref: m,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", f),
		"data-testid": `${p}-strip`,
		onKeyDown: b,
		children: [
			/* @__PURE__ */ H(se, {
				fallback: /* @__PURE__ */ H(Ae, { ...x }),
				children: H(d ? Ae : nt, { ...x })
			}),
			y.map((t) => /* @__PURE__ */ U("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${p}-placeholder-${t}`,
				children: [/* @__PURE__ */ H("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ H("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ H(v, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			c && !d && /* @__PURE__ */ U("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ H("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ U(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${p}-add`,
					children: [/* @__PURE__ */ H(h, { size: 12 }), "Add slide"]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ct = {
	document: "📄",
	transcript: "🎙️"
};
function lt({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = B(""), [d, f] = B(!1), [p, m] = B(n), h = le(), g = z(0);
	L(() => {
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
	let _ = e.map((e) => ({
		id: `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}`,
		label: e.anchor ? `${e.title} · ${e.anchor}` : e.title,
		icon: "📄",
		title: e.title
	})), y = e.length >= 10, b = (n) => {
		y || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), u(""), f(!1));
	}, x = /* @__PURE__ */ H(oe, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ H(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ H(v, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ H(v, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ H("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ H("li", { children: /* @__PURE__ */ U(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ H("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ct[t.kind ?? "document"]
						}),
						/* @__PURE__ */ H("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ H("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ H(j, {
					as: "div",
					children: /* @__PURE__ */ H("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ H(v, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ H("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ H(i, {
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
	}) : /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ H(j, {
				as: "div",
				children: /* @__PURE__ */ H("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ H(ne, {
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
function ut() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function dt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ H(j, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ H("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ U("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ H(v, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ H(k, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ H(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(ut, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ H(i, {
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
function ft({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ H(D, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ H(re, {
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
			}), !n && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ H(i, {
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
		}), /* @__PURE__ */ H("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ U(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ H(f, { children: /* @__PURE__ */ U(l, { children: [
					/* @__PURE__ */ H(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ H(d, { children: /* @__PURE__ */ H(k, {
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
					!n && /* @__PURE__ */ H(d, {})
				] }) }), /* @__PURE__ */ H(u, { children: e.labels.map((i, o) => /* @__PURE__ */ U(l, { children: [
					/* @__PURE__ */ H(c, { children: /* @__PURE__ */ H(k, {
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
					e.series.map((e, t) => /* @__PURE__ */ H(c, { children: /* @__PURE__ */ H(k, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ H(c, { children: /* @__PURE__ */ H(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(ut, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function pt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ H(D, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ H(k, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ H(D, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ H(k, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ H(dt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ H(dt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ H(dt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ H(ft, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ H(D, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ H(ee, {
						...t,
						rows: 3,
						maxLength: 400,
						value: e.quote?.text ?? "",
						disabled: a,
						onChange: (t) => l({ quote: {
							text: t.target.value,
							by: e.quote?.by ?? ""
						} }),
						"data-testid": `${c}-quote-text`
					})
				}), /* @__PURE__ */ H(D, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ H(k, {
						...t,
						value: e.quote?.by ?? "",
						disabled: a,
						onChange: (t) => l({ quote: {
							text: e.quote?.text ?? "",
							by: t.target.value
						} }),
						"data-testid": `${c}-quote-by`
					})
				})]
			}),
			e.layout === "image" && /* @__PURE__ */ H(D, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ H(k, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ H(D, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ H(ee, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ H(lt, {
				sources: e.sources,
				onChange: (e) => l({ sources: e }),
				options: n,
				onSearchSources: i,
				readOnly: a,
				testIdPrefix: c
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideStage.tsx
var mt = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function ht({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ H("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ U("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", mt[a]),
			children: [e, t && /* @__PURE__ */ U("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ H("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ H(v, {
					as: "span",
					className: "text-[12px] font-medium text-text-secondary",
					children: n
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlidesToolbar.tsx
var gt = [
	"chart",
	"quote",
	"image",
	"two-column"
], _t = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
};
function vt({ redo: e }) {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ H("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ H("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function yt() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function bt() {
	return /* @__PURE__ */ H("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function xt({ label: e, value: t }) {
	return /* @__PURE__ */ U("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ H("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ H(g, { size: 12 })
		]
	});
}
function St({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: g, disabled: y = !1, className: b, testIdPrefix: x = "slides-toolbar" }) {
	let S = A(), C = y;
	return /* @__PURE__ */ U("div", {
		...S,
		role: "toolbar",
		"aria-label": "Slide tools",
		className: r("flex min-w-0 flex-1 flex-wrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ U(i, {
				variant: "primary",
				size: "sm",
				disabled: C || !a,
				onClick: () => n(),
				"data-testid": `${x}-new-slide`,
				children: [/* @__PURE__ */ H(h, { size: 12 }), "New slide"]
			}),
			!C && e && /* @__PURE__ */ H(_, {
				trigger: /* @__PURE__ */ H(xt, {
					label: "Layout",
					value: $[e.layout]
				}),
				triggerLabel: `Layout: ${$[e.layout]}`,
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [{
					label: "Layout of this slide",
					items: Ue.map((t) => ({
						label: $[t],
						checked: t === e.layout,
						onSelect: () => {
							t !== e.layout && o(t);
						},
						"data-testid": `${x}-layout-${t}`
					}))
				}],
				"data-testid": `${x}-layout-menu`
			}),
			!C && a && /* @__PURE__ */ H(_, {
				trigger: /* @__PURE__ */ H(xt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [{
					label: "New slide after this one",
					items: gt.map((e) => ({
						label: `${$[e]} slide`,
						onSelect: () => n(e),
						"data-testid": `${x}-insert-${e}`
					}))
				}],
				"data-testid": `${x}-insert-menu`
			}),
			!C && /* @__PURE__ */ H(_, {
				trigger: /* @__PURE__ */ H(xt, {
					label: "Theme",
					value: _t[t]
				}),
				triggerLabel: `Theme: ${_t[t]}`,
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [{
					label: "Deck theme",
					items: We.map((e) => ({
						label: _t[e],
						checked: e === t,
						onSelect: () => {
							e !== t && s(e);
						},
						"data-testid": `${x}-theme-${e}`
					}))
				}],
				"data-testid": `${x}-theme-menu`
			}),
			!C && e?.layout === "chart" && e.chart && c && /* @__PURE__ */ H(w, {
				size: "sm",
				value: e.chart.kind,
				onChange: (e) => c(e),
				options: [{
					value: "bar",
					label: "Bar"
				}, {
					value: "line",
					label: "Line"
				}],
				"aria-label": "Chart type",
				"data-testid": `${x}-chart-kind`
			}),
			(l || u) && /* @__PURE__ */ U(V, { children: [
				/* @__PURE__ */ H(bt, {}),
				l && /* @__PURE__ */ H(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(vt, {}),
					disabled: C || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ H(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(vt, { redo: !0 }),
					disabled: C || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			/* @__PURE__ */ H(v, {
				as: "span",
				className: "ml-1 hidden text-[11px] text-text-tertiary xl:inline",
				title: "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.",
				"data-testid": `${x}-style-note`,
				children: "Text style comes from the theme"
			}),
			/* @__PURE__ */ H("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			p && /* @__PURE__ */ U(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				"data-testid": `${x}-present`,
				children: [/* @__PURE__ */ H(yt, {}), "Present"]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Ct({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Le, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = le(), l = le(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ U("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ H(v, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ H(v, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ H(ee, {
			"aria-labelledby": c,
			"aria-describedby": l,
			autoResize: !0,
			minRows: 2,
			maxRows: 8,
			maxLength: i,
			value: e ?? "",
			disabled: n,
			placeholder: a,
			onChange: (e) => t(e.target.value.slice(0, i) || void 0),
			className: "border-transparent bg-transparent px-0 text-[13px] focus:border-transparent",
			"data-testid": s
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/PresentationEditor.tsx
function wt({ testIdPrefix: e }) {
	return /* @__PURE__ */ H(ne, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Tt = ce(() => import("./PresentationAgentComposer-CcEBiigx.js").catch(() => ({ default: wt })));
function Et({ back: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Dt(e, t) {
	let [n, r] = B({
		past: [],
		future: []
	}), i = z(null), a = z(0);
	return L(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: F((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: F(() => {
			let o = n.past[n.past.length - 1];
			o && (r({
				past: n.past.slice(0, -1),
				future: [e, ...n.future]
			}), a.current = 0, i.current = o, t(o));
		}, [
			n,
			e,
			t
		]),
		redo: F(() => {
			let o = n.future[0];
			o && (r({
				past: [...n.past, e],
				future: n.future.slice(1)
			}), a.current = 0, i.current = o, t(o));
		}, [
			n,
			e,
			t
		]),
		canUndo: n.past.length > 0,
		canRedo: n.future.length > 0
	};
}
function Ot({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: _, onUndoInstruct: y, generatingSlideIds: b, footer: x, renderFrame: w, onSelectedSlideChange: E, className: ee, "data-testid": A = "presentation-editor" }) {
	let [j, M] = B(() => e.slides[0]?.id ?? ""), [re, ie] = B(!1), [ae, oe] = B(null), N = !!g, [P, ce] = B("slide"), [I, le] = B(!1), [ue, de] = B(null), [fe, pe] = B(null), [me, he] = B(() => /* @__PURE__ */ new Set()), { edit: W, undo: ge, redo: _e, canUndo: ye, canRedo: be } = Dt(e, t), [xe, q] = B([]);
	L(() => {
		typeof n == "object" && "slides" in n && q(n.slides);
	}, [n]);
	let Te = z(a);
	Te.current = a;
	let J = e.slides, Y = R(() => new Set(Ge(e)), [e]), De = Y.size === 0;
	L(() => {
		De && Te.current(e);
	}, [e, De]);
	let Z = Math.max(J.findIndex((e) => e.id === j), 0), Q = J[Z], Oe = z(E);
	Oe.current = E, L(() => {
		Q && Oe.current?.(Q.id, Z);
	}, [Q?.id, Z]);
	let ke = R(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : xe;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, xe]), Ae = R(() => {
		let e = new Set(b ?? []);
		return I && P === "slide" && Q && e.add(Q.id), [...e];
	}, [
		b,
		I,
		P,
		Q
	]), je = !!Q && Ae.includes(Q.id), Me = J.map((e) => ({
		slide: e,
		thumbnailSvg: ke.get(e.id),
		uncited: Y.has(e.id),
		changed: me.has(e.id)
	})), Ne = F((e) => {
		M(e);
	}, []), Pe = F((t, n) => {
		W(Ze(e, t, n));
	}, [W, e]), Fe = F((t) => {
		let n = Qe(e, Z, t);
		n !== e && (W(n), M(n.slides[Z + 1].id));
	}, [
		W,
		e,
		Z
	]), Ie = F((t) => {
		let n = $e(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		W(n), M(n.slides[r + 1].id);
	}, [W, e]), Le = F((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = et(e, t);
		r !== e && (W(r), M(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [W, e]), Re = F((t) => W(Xe(e, t)), [W, e]), ze = F(async (e) => {
		if (!g || I) return !1;
		let t = Q?.id;
		le(!0), pe(null);
		try {
			let n = await g(e, P === "slide" && t ? {
				slideId: t,
				scope: P
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return he(new Set(r)), de(n?.summary?.trim() || "Done."), P === "deck" && r.length && (!t || !r.includes(t)) && M(r[0]), !0;
		} catch (e) {
			return pe(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			le(!1);
		}
	}, [
		g,
		I,
		P,
		Q?.id
	]), Be = F(() => {
		y?.(), de(null), he(/* @__PURE__ */ new Set());
	}, [y]), Ve = Y.size, He = !h && J.length > 0 && Ve === 0 && !re, Ue = F(() => {
		He && (ie(!0), oe(null), Promise.resolve(o(e)).catch((e) => {
			oe(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ie(!1)));
	}, [
		He,
		o,
		e
	]), $ = F((e) => {
		let t = J[Z + e];
		t && M(t.id);
	}, [J, Z]);
	if (L(() => {
		if (h) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), Ue();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !K(e.target)) {
				e.preventDefault(), e.shiftKey ? _e() : ge();
				return;
			}
			let n = Se(e);
			if (!n) return;
			e.preventDefault();
			let r = Ce(n, Z + 1, J.length);
			r !== Z + 1 && $(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		Ue,
		ge,
		_e,
		$,
		Z,
		J.length
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? J.map((e, t) => {
				let n = X(ke.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ H("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ H(we, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = J[e - 1];
				t && M(t.id);
			},
			...f ? { onDownload: f } : {},
			className: ee,
			"data-testid": `${A}-readonly`
		});
	}
	let We = (() => {
		if (Q && Y.has(Q.id)) return /* @__PURE__ */ H(S, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${A}-preview-needs-source`
		});
		let t = Q ? X(ke.get(Q.id)) : void 0;
		if (!De && !t) return /* @__PURE__ */ H(S, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${A}-preview-needs-source`
		});
		if (n === "loading" && ke.size === 0) return /* @__PURE__ */ H(T, {
			label: "Rendering the deck…",
			testId: `${A}-preview-loading`
		});
		if (De && typeof n == "object" && "error" in n) return /* @__PURE__ */ H(C, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${A}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ H("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${A}-stage-image`
		}) : /* @__PURE__ */ H(v, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${A}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ke = s.map((e) => ({
		id: e.id,
		label: e.label
	})), qe = /* @__PURE__ */ U("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${A}-revision-controls`,
		children: [
			Ke.length > 0 && /* @__PURE__ */ H(O, {
				items: Ke,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${A}-revisions`
			}),
			/* @__PURE__ */ H(i, {
				variant: "primary",
				size: "sm",
				disabled: !He,
				onClick: Ue,
				"data-testid": `${A}-save`,
				children: re ? "Saving…" : `Save as ${tt(s)}`
			}),
			f && /* @__PURE__ */ H(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${A}-download`,
				children: "Download .pptx"
			})
		]
	}), Je = N ? /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ H(G, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => W({
				...e,
				title: t
			}),
			"data-testid": `${A}-deck-title`
		}), /* @__PURE__ */ H(G, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => W({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${A}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ H(D, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ H(k, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => W({
					...e,
					title: t.target.value
				}),
				"data-testid": `${A}-deck-title`
			})
		}), /* @__PURE__ */ H(D, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ H(k, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => W({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${A}-deck-subtitle`
			})
		})]
	}), nt = p ? () => p(Q ? {
		slideId: Q.id,
		slideIndex: Z + 1
	} : void 0) : void 0, rt = !!w, it = /* @__PURE__ */ H(St, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: Fe,
		canAddSlide: J.length < 40,
		onLayoutChange: (t) => {
			Q && W(Xe(e, Ye(Q, t)));
		},
		onThemeChange: (t) => W({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && W(Xe(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: ge,
		onRedo: _e,
		canUndo: ye,
		canRedo: be,
		...nt ? { onPresent: nt } : {},
		testIdPrefix: `${A}-toolbar`
	}), at = /* @__PURE__ */ U(V, { children: [Ve > 0 && /* @__PURE__ */ H(ne, {
		tone: "warning",
		"data-testid": `${A}-uncited-warning`,
		children: Ve === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${Ve} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ae && /* @__PURE__ */ H(ne, {
		tone: "error",
		onDismiss: () => oe(null),
		"data-testid": `${A}-save-error`,
		children: ae
	})] }), ot = N && /* @__PURE__ */ U(V, { children: [fe && /* @__PURE__ */ H(ne, {
		tone: "error",
		onDismiss: () => pe(null),
		"data-testid": `${A}-agent-error`,
		children: fe
	}), ue && !fe && /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${A}-agent-summary`,
		children: [
			/* @__PURE__ */ H(v, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${ue}`
			}),
			me.size > 0 && /* @__PURE__ */ H(v, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: me.size === 1 ? "1 slide marked in the filmstrip" : `${me.size} slides marked in the filmstrip`
			}),
			y && /* @__PURE__ */ H(i, {
				variant: "ghost",
				size: "sm",
				onClick: Be,
				"data-testid": `${A}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), ct = N && Q && /* @__PURE__ */ H(se, {
		fallback: /* @__PURE__ */ H(v, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${A}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ H(Tt, {
			scope: P,
			onScopeChange: ce,
			slideLabel: `slide ${Z + 1}`,
			busy: I,
			onSubmit: ze,
			..._?.length ? { suggestions: _ } : {},
			testIdPrefix: A
		})
	}), ut = {
		selectedSlide: Q,
		selectedIndex: Z,
		slideCount: J.length,
		selectSlide: Ne,
		markChanged: (e) => he(new Set(e))
	}, dt = typeof x == "function" ? x(ut) : x, ft = dt != null && dt !== !1 ? dt : ct ? rt ? /* @__PURE__ */ H(Ee, {
		maxWidth: "4xl",
		label: "Deck agent",
		above: ot,
		composer: ct,
		"data-testid": `${A}-dock`
	}) : /* @__PURE__ */ U(V, { children: [ct, ot] }) : null, mt = Q && /* @__PURE__ */ H(V, { children: N ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(lt, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => Re({
			...Q,
			sources: e
		}),
		options: u,
		onSearchSources: d,
		testIdPrefix: `${A}-slide`
	}), /* @__PURE__ */ H(ve, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${A}-details`,
		children: /* @__PURE__ */ H(pt, {
			slide: Q,
			onChange: Re,
			sources: u,
			onSearchSources: d,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${A}-slide`
		})
	})] }) : /* @__PURE__ */ H(pt, {
		slide: Q,
		onChange: Re,
		sources: u,
		onSearchSources: d,
		showNotes: !1,
		testIdPrefix: `${A}-slide`
	}) }), gt = /* @__PURE__ */ U("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		children: [/* @__PURE__ */ H(st, {
			items: Me,
			selectedId: Q?.id ?? "",
			onSelect: Ne,
			onMove: Pe,
			onDuplicate: Ie,
			onDelete: Le,
			onAdd: () => Fe(),
			canAdd: J.length < 40,
			generatingSlideIds: Ae,
			className: "md:w-44 md:shrink-0",
			testIdPrefix: `${A}-slide`
		}), /* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3",
			"data-testid": `${A}-main`,
			children: [
				/* @__PURE__ */ H(ht, {
					generating: je,
					label: Q ? `Slide ${Z + 1} of ${J.length}: ${Q.title || "Untitled slide"}` : "No slide",
					"data-testid": `${A}-stage`,
					children: We
				}),
				/* @__PURE__ */ U("div", {
					className: "flex items-center justify-center gap-2",
					children: [
						/* @__PURE__ */ H(m, {
							"aria-label": "Previous slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Et, { back: !0 }),
							disabled: Z <= 0,
							onClick: () => $(-1),
							"data-testid": `${A}-previous`
						}),
						/* @__PURE__ */ H(v, {
							className: "text-[13px] text-text-secondary",
							"data-testid": `${A}-position`,
							children: `Slide ${J.length === 0 ? 0 : Z + 1} of ${J.length}`
						}),
						/* @__PURE__ */ H(m, {
							"aria-label": "Next slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Et, {}),
							disabled: Z >= J.length - 1,
							onClick: () => $(1),
							"data-testid": `${A}-next`
						}),
						/* @__PURE__ */ H(te, {
							value: J.length / 40,
							segments: 10,
							showPercent: !1,
							tone: "surface",
							note: `${J.length} / 40`,
							className: "ml-2",
							"data-testid": `${A}-slide-meter`
						})
					]
				}),
				Q && /* @__PURE__ */ U("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [
						/* @__PURE__ */ H(Ct, {
							value: Q.notes,
							onChange: (e) => Re({
								...Q,
								notes: e
							}),
							"data-testid": `${A}-slide-notes`
						}),
						!rt && ft,
						mt
					]
				})
			]
		})]
	}), _t = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (w) {
		let e = /* @__PURE__ */ U("div", {
			className: r("flex min-h-0 flex-col gap-3 p-4", ee),
			"data-testid": A,
			onKeyDown: _t,
			children: [
				/* @__PURE__ */ H("div", {
					className: "flex flex-wrap items-center gap-2",
					"data-testid": `${A}-deck-line`,
					children: Je
				}),
				at,
				gt
			]
		});
		return /* @__PURE__ */ H(V, { children: w({
			toolbar: it,
			actions: qe,
			surface: e,
			footer: ft
		}) });
	}
	return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", ee),
		"data-testid": A,
		onKeyDown: _t,
		children: [
			/* @__PURE__ */ U("div", {
				className: r("flex flex-wrap justify-between gap-2", N ? "items-center" : "items-end"),
				...N ? { "data-testid": `${A}-deck-line` } : {},
				children: [Je, qe]
			}),
			/* @__PURE__ */ H("div", {
				className: "rounded-lg border border-border bg-surface px-2 py-1.5",
				children: it
			}),
			at,
			gt
		]
	});
}
//#endregion
export { tt as A, Y as B, Ue as C, $e as D, Ke as E, Ye as F, be as G, we as H, Ae as I, ge as J, ve as K, ke as L, et as M, Xe as N, Je as O, Ge as P, X as R, He as S, Qe as T, G as U, Ee as V, ye as W, Be as _, ht as a, Fe as b, st as c, Me as d, Ne as f, Le as g, Ie as h, St as i, qe as j, Ze as k, ot as l, ze as m, Ct as n, pt as o, Re as p, _e as q, gt as r, lt as s, Ot as t, We as u, je as v, $ as w, Pe as x, Ve as y, J as z };
