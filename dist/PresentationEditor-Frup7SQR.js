import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-CHdlnODN.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { T as h, c as g, t as _ } from "./DropdownMenu-Ct9zTKPJ.js";
import { a as v, n as y } from "./Text-nbwye3hS.js";
import { t as b } from "./Chip-B_HZn3xl.js";
import { t as x } from "./Modal-DMFNRUDx.js";
import { t as S } from "./EmptyState-DFWbBBcY.js";
import { n as C, t as w } from "./SegmentedControl-X19S_gNQ.js";
import { n as T, t as E } from "./SearchInput-BzLo-Ril.js";
import { t as D } from "./FormField-E8Z0ppOp.js";
import { n as O } from "./Tabs-BGZyr2nH.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as A } from "./Textarea-Dz4doxTv.js";
import { t as j } from "./DotMeter-BDVkadI8.js";
import { n as M } from "./RovingToolbar-CmQag9q6.js";
import { t as N } from "./InlineAlert-CRnIKeAF.js";
import { t as P } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as F } from "./SectionLabel-bcrhNYOr.js";
import { t as I } from "./StatusPill-C_pBuvaK.js";
import { t as ee } from "./Select-D5mMMegw.js";
import { G as L, U as te } from "./renderers-BX3ZB5kO.js";
import { t as ne } from "./ComposerReferences-UMETBZqe.js";
import { i as re, t as ie } from "./FloatingComposerDock-DMUQCjea.js";
import { t as ae } from "./useMeasuredWidth-BPrwD0q5.js";
import { Component as oe, Suspense as R, lazy as z, useCallback as B, useEffect as V, useId as H, useMemo as U, useRef as W, useState as G } from "react";
import { Fragment as K, jsx as q, jsxs as J } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var se = /* @__PURE__ */ new Set(["diagram", "presentation"]), ce = [
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
function pe({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = G([]), [d, f] = G(!1), [p, m] = G(null), [h, g] = G(null), [_, y] = G(""), [S, C] = G(""), [w, T] = G(!1), [E, D] = G(""), [O, j] = G("page"), [M, N] = G("blank"), [P, F] = G(""), [I, ne] = G(""), [re, ie] = G([]), ae = W(null), oe = W(null), R = H(), z = `${R}-blank-label`, B = `${R}-type-label`, pe = `${R}-cookbook-label`, me = `${R}-title`, he = `${R}-description`, ge = `${R}-deck-from`, Y = `${R}-deck-source`;
	V(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), y(""), C(""), T(!1), D(""), j("page"), N("blank"), F(""), ne(""), ie([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => ae.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let _e = U(() => ce.filter((e) => ue(e, _)), [_]), ve = U(() => l.filter((e) => de(e, _)), [l, _]), ye = U(() => te.filter((e) => L(e, _)), [_]);
	if (V(() => {
		if (!e || O !== "presentation") return;
		if (M === "blank") {
			ie([]);
			return;
		}
		let t = I.trim().toLowerCase();
		if (M === "transcript") {
			let e = c ?? [];
			ie(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			ie([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(I.trim())).then((e) => {
			n || ie(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		M,
		I,
		c,
		s
	]), !e) return null;
	let be = l.find((e) => e.id === p), xe = h ? te.find((e) => e.id === h) : void 0, Se = O === "sections", Ce = !!xe || !!be, we = l.length === 0 && !d && !xe, Te = _e.length === 0 && ve.length === 0 && ye.length === 0, Ee = xe ? {
		kind: "cookbook",
		cookbook: xe
	} : be && !se.has(O) ? {
		kind: "type",
		type: be
	} : {
		kind: "blank",
		shape: O
	}, De = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), se.has(O) && j("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			j(e.shape), se.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : se.has(O) ? "page" : O, ke = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = E.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: M,
				...M !== "blank" && P ? { sourceId: P } : {},
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
	}, X = O === "presentation" && M !== "blank" && !P, Z = !!S.trim() && (!Se || Ce) && !X, Ae = () => {
		Z && ke(Ee, S, Oe(Ee));
	};
	return /* @__PURE__ */ q(x, {
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
		children: /* @__PURE__ */ J("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Z && Ae();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ q("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ J("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ q(k, {
						ref: ae,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: _,
						onChange: (e) => y(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = ye.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: ye[0]
							} : _e.length > 0 ? {
								kind: "blank",
								shape: _e[0].id
							} : ve.length > 0 ? {
								kind: "type",
								type: ve[0]
							} : void 0;
							if (!t) return;
							De(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								oe.current?.focus();
								return;
							}
							ke(t, n, Oe(t));
						}
					}), /* @__PURE__ */ q("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ J("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						_e.length > 0 && /* @__PURE__ */ J("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ q("div", {
								id: z,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ q("div", {
								role: "group",
								"aria-labelledby": z,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: _e.map((e) => /* @__PURE__ */ J(v, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => De({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ J("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ q("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ q("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ q(b, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ q("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ J("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ q("label", {
									htmlFor: ge,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ q(ee, {
									id: ge,
									value: M,
									options: le.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										N(e.target.value), F(""), ne("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ q("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: M === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								M !== "blank" && /* @__PURE__ */ J("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ q(k, {
										type: "search",
										value: I,
										onChange: (e) => ne(e.target.value),
										"aria-label": M === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: M === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), re.length === 0 ? /* @__PURE__ */ q("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: M === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ J("label", {
										htmlFor: Y,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											M === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ q("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ q(ee, {
										id: Y,
										required: !0,
										"aria-required": "true",
										value: P,
										placeholder: "Choose one…",
										options: re.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => F(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						ye.length > 0 && /* @__PURE__ */ J("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ J("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ q("div", {
									id: pe,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ q("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ q("div", {
								role: "group",
								"aria-labelledby": pe,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: ye.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ J(v, {
										padding: "md",
										selected: t,
										onSelect: () => De({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ J("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ q("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ q("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ q("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ q("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!se.has(O) && (ve.length > 0 || we || l.length === 0 && d) && /* @__PURE__ */ J("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ J("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ q("span", {
										id: B,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Se && /* @__PURE__ */ q("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ q("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								we && /* @__PURE__ */ q("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Se ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								ve.length > 0 && /* @__PURE__ */ q("div", {
									role: "group",
									"aria-labelledby": B,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: ve.map((e) => {
										let t = !xe && p === e.id;
										return /* @__PURE__ */ J("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => De({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ q("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ J("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ q("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ q("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ q("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ q("span", {
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
						Te && /* @__PURE__ */ J("div", {
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
				/* @__PURE__ */ J("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ J("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ J("label", {
							htmlFor: me,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ q("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ q(k, {
							ref: oe,
							id: me,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: xe ? `e.g. ${xe.name}` : be ? `e.g. Q2 ${be.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ J("div", { children: [/* @__PURE__ */ J("label", {
						htmlFor: he,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ q("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ q(A, {
						id: he,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => D(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ J("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ q("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ q("button", {
						"data-testid": "new-doc-submit",
						onClick: Ae,
						disabled: !Z,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Z ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var me = class extends oe {
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
		return this.state.hasError ? /* @__PURE__ */ J("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ q("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ q("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ q("button", {
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
function he({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": h = "disclosure" }) {
	let _ = n !== void 0, [v, y] = G(i), b = _ ? n : v, x = W(null);
	V(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ J("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": h,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ J("summary", {
			"data-testid": `${h}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ q(g, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ q("div", {
			"data-testid": `${h}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function ge({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = H(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ J("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ q(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ q(b, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ q("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q("span", { className: "flex-1" }), /* @__PURE__ */ q("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ q(S, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ q("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ q("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function Y({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ q("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var _e = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function ve({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", className: u, "data-testid": d = "inline-editable-text" }) {
	let [f, p] = G(!1), [m, h] = G(e), g = W(null);
	V(() => {
		f || h(e);
	}, [e, f]), V(() => {
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
	return f ? /* @__PURE__ */ q(k, {
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
	}) : /* @__PURE__ */ q("button", {
		type: "button",
		disabled: s,
		onClick: () => p(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": d,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", _e[l], !e && "italic text-text-tertiary", u),
		children: e || i
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function ye(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function be(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || ye(e.target)) return null;
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
function xe(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Se = 5;
function Ce({ back: e }) {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function we({ title: e, subtitle: t, revisions: n, revisionId: a, onRevisionChange: o, slideIndex: s, onSlideChange: c, onDownload: l, downloadLabel: u = "Download .pptx", onOpenPreview: d, pending: f, notice: p, state: h = "ready", errorMessage: g, onRetry: _, maxSlideWidth: v, autoFocus: b = !1, className: x, "data-testid": E = "presentation-view" }) {
	let D = H(), O = W(null), k = W(!1);
	if (V(() => {
		!b || k.current || !O.current || (k.current = !0, O.current.focus({ preventScroll: !0 }));
	}), h === "loading") return /* @__PURE__ */ q(T, {
		label: "Opening the presentation…",
		testId: `${E}-loading`
	});
	if (h === "error") return /* @__PURE__ */ q(C, {
		title: "This presentation could not be opened",
		...g ? { description: g } : {},
		..._ ? {
			actionLabel: "Try again",
			onAction: _
		} : {},
		testId: `${E}-error`
	});
	let A = n.find((e) => e.id === a) ?? n[0], j = A?.slides ?? [];
	if (h === "empty" || !A || j.length === 0) return /* @__PURE__ */ J("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", x),
		"data-testid": E,
		children: [/* @__PURE__ */ J("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ q(y, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ q(y, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${E}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ q(S, {
			title: "No slides yet",
			description: f?.status === "generating" ? `${f.label} is still being generated.` : f?.status === "failed" ? f.message ?? `${f.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${E}-empty`
		})]
	});
	let M = j[Math.min(Math.max(s, 1), j.length) - 1];
	return /* @__PURE__ */ J("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", x),
		ref: O,
		"data-testid": E,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${M.index} of ${j.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = be(e);
			if (!t) return;
			e.preventDefault();
			let n = xe(t, M.index, j.length);
			n !== M.index && c(n);
		},
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ J("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ q(y, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${E}-title`,
						children: e
					}), t && /* @__PURE__ */ q(y, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${E}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ J("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Se ? /* @__PURE__ */ q(ee, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: (e) => o?.(e.target.value),
							options: [...n].reverse().map((e, t) => ({
								value: e.id,
								label: t === 0 ? `${e.label} · latest` : e.label
							})),
							className: "w-auto",
							"data-testid": `${E}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ q(w, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: o,
							options: n.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${E}-revisions`
						}),
						f && /* @__PURE__ */ q(I, {
							state: f.status === "failed" ? "error" : "pending",
							label: `${f.label} ${f.status}`,
							"data-testid": `${E}-pending`
						}),
						l && /* @__PURE__ */ q(i, {
							variant: "secondary",
							size: "sm",
							onClick: l,
							"data-testid": `${E}-download`,
							children: u
						})
					]
				})]
			}),
			/* @__PURE__ */ J("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ J("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ q("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ q("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: v === void 0 ? void 0 : { maxWidth: v },
							"data-testid": `${E}-stage`,
							children: M.preview ?? /* @__PURE__ */ q(y, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${E}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ J("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ q(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ q(Ce, { back: !0 }),
								disabled: M.index <= 1,
								onClick: () => c(M.index - 1),
								"data-testid": `${E}-previous`
							}),
							/* @__PURE__ */ q(y, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${E}-position`,
								children: `Slide ${M.index} of ${j.length}`
							}),
							/* @__PURE__ */ q(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ q(Ce, {}),
								disabled: M.index >= j.length,
								onClick: () => c(M.index + 1),
								"data-testid": `${E}-next`
							}),
							d && M.preview && /* @__PURE__ */ q(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => d(M.id),
								"data-testid": `${E}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ J("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": D,
					"data-testid": `${E}-outline`,
					children: [/* @__PURE__ */ q(F, {
						as: "div",
						className: "mb-1",
						"data-testid": `${E}-outline-label`,
						children: /* @__PURE__ */ q("span", {
							id: D,
							children: "Slides"
						})
					}), /* @__PURE__ */ q("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ q("li", { children: /* @__PURE__ */ J("button", {
							type: "button",
							onClick: () => c(e.index),
							"aria-current": e.id === M.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === M.id && "bg-surface-hover font-medium"),
							"data-testid": `${E}-outline-row`,
							children: [/* @__PURE__ */ q("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ q("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			p && /* @__PURE__ */ q(y, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${E}-notice`,
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function Te(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Ee() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function De() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Oe() {
	return /* @__PURE__ */ J("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ q("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ q("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function ke() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function X({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: b }) {
	let x = Te(i);
	return /* @__PURE__ */ J("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ q("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ J("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ q("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ q("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ q("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ q(y, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ J("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ q(y, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ q(y, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ q(y, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ q(y, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ J("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ J("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ q(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ q(Ee, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ q(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ q(De, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ J("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ q(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ q(Oe, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ q(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ q(ke, {}),
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
function Z({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = X, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ q("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ q(l, {
			slide: r.slide,
			index: u,
			total: e.length,
			thumbnailSvg: r.thumbnailSvg,
			selected: r.slide.id === t,
			uncited: r.uncited,
			changed: r.changed,
			generating: r.generating,
			viewers: r.viewers,
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
var Ae = 40, Q = 8, $ = 200, je = 120, Me = 200, Ne = 60, Pe = 2e3, Fe = 24, Ie = 6, Le = 400, Re = 10, ze = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Be = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], Ve = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, He = [
	"product",
	"engineering",
	"plain"
];
function Ue(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function We(e) {
	return e.slides.length > 0 && Ue(e).length === 0;
}
function Ge(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Ke(e, t = "bullets") {
	return qe({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function qe(e, t) {
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
function Je(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Ye(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Xe(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Ke(Ge(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Ze(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Ge(e),
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
function Qe(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function $e(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var et = z(() => import("./SortableSlideList-CW4yAWY8.js"));
function tt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function nt(e, t) {
	tt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function rt() {
	return /* @__PURE__ */ J("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ q("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ q("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ q("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function it({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: v, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = Te(i), w = t + 1, T = e.title || "Untitled slide", E = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => f(t, t - 1),
			"data-testid": `${S}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => f(t, t + 1),
			"data-testid": `${S}-down-${e.id}`
		}] : [],
		...h ? [{
			label: "Duplicate",
			onSelect: () => p(e.id),
			"data-testid": `${S}-duplicate-${e.id}`
		}] : [],
		...g ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => m(e.id),
			"data-testid": `${S}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ J("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ J("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ q("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: w
			}), !u && v && /* @__PURE__ */ q("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ J("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ J("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${w}: ${T}`,
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ q("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ J("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ q(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: T
						}), /* @__PURE__ */ q(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ve[e.layout]
						})]
					}), c && /* @__PURE__ */ q("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ q(y, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ J("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ q(y, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: T
						}) : /* @__PURE__ */ q("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ q(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ q(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ q("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ q(P, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && E.length > 0 && /* @__PURE__ */ q("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ q(_, {
						trigger: /* @__PURE__ */ q(rt, {}),
						triggerLabel: `Slide ${w} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "bg-surface/90 px-1 py-0.5",
						triggerTestId: `${S}-menu-${e.id}`,
						align: "end",
						sections: [{ items: E }],
						"data-testid": `${S}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function at({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, slideViewers: d, readOnly: f = !1, className: p, testIdPrefix: m = "filmstrip" }) {
	let g = W(null), _ = U(() => new Set(u ?? []), [u]), v = U(() => e.map((e) => {
		let t = d?.[e.slide.id];
		return !_.has(e.slide.id) && !t?.length ? e : {
			...e,
			..._.has(e.slide.id) ? { generating: !0 } : {},
			...t?.length ? { viewers: t } : {}
		};
	}), [
		e,
		_,
		d
	]), b = U(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [..._].filter((e) => !t.has(e));
	}, [e, _]);
	V(() => {
		tt(g.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let x = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = e.findIndex((e) => e.slide.id === t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= e.length) return;
		r.preventDefault();
		let s = e[i].slide.id;
		if (r.altKey) {
			if (f) return;
			a(i, o), requestAnimationFrame(() => nt(g.current, s));
			return;
		}
		let c = e[o].slide.id;
		n(c), nt(g.current, c);
	}, S = {
		items: v,
		selectedId: t,
		readOnly: f,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: it,
		listClassName: "gap-2.5",
		testIdPrefix: m
	};
	return /* @__PURE__ */ J("div", {
		ref: g,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", p),
		"data-testid": `${m}-strip`,
		onKeyDown: x,
		children: [
			/* @__PURE__ */ q(R, {
				fallback: /* @__PURE__ */ q(Z, { ...S }),
				children: q(f ? Z : et, { ...S })
			}),
			b.map((t) => /* @__PURE__ */ J("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${m}-placeholder-${t}`,
				children: [/* @__PURE__ */ q("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ q("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ q(y, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			c && !f && /* @__PURE__ */ J("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ q("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ q(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${m}-add`,
					children: /* @__PURE__ */ J("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ q(h, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ot = {
	document: "📄",
	transcript: "🎙️"
};
function st({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = G(""), [d, f] = G(!1), [p, m] = G(n), h = H(), g = W(0);
	V(() => {
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
	})), v = e.length >= 10, b = (n) => {
		v || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), u(""), f(!1));
	}, x = /* @__PURE__ */ q(ne, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ J("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ q(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ q(y, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ q(y, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ q("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ q("li", { children: /* @__PURE__ */ J(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ q("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ot[t.kind ?? "document"]
						}),
						/* @__PURE__ */ q("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ q("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ J("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ J("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ q(F, {
					as: "div",
					children: /* @__PURE__ */ q("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ q(y, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ q("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ q(i, {
					variant: "ghost",
					size: "sm",
					"aria-expanded": d,
					disabled: v && !d,
					onClick: () => {
						f((e) => !e), u("");
					},
					"data-testid": `${c}-add-source`,
					children: d ? "Done" : "+ Add source"
				})
			]
		}), !o && d && S]
	}) : /* @__PURE__ */ J("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ q(F, {
				as: "div",
				children: /* @__PURE__ */ q("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ q(N, {
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
function ct() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function lt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ J("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ q(F, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ q("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ J("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ q(y, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ q(k, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ q(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ q(ct, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ q(i, {
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
function ut({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	return /* @__PURE__ */ J("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ J("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ q(D, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ q(ee, {
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
			}), !n && /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ q(i, {
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
		}), /* @__PURE__ */ q("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ J(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ q(f, { children: /* @__PURE__ */ J(l, { children: [
					/* @__PURE__ */ q(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ q(d, { children: /* @__PURE__ */ q(k, {
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
					!n && /* @__PURE__ */ q(d, {})
				] }) }), /* @__PURE__ */ q(u, { children: e.labels.map((i, o) => /* @__PURE__ */ J(l, { children: [
					/* @__PURE__ */ q(c, { children: /* @__PURE__ */ q(k, {
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
					e.series.map((e, t) => /* @__PURE__ */ q(c, { children: /* @__PURE__ */ q(k, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ q(c, { children: /* @__PURE__ */ q(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ q(ct, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function dt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ J("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ J("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ q(D, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ q(k, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ q(D, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ q(k, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ q(lt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ J("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ q(lt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ q(lt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ q(ut, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ J("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ q(D, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ q(A, {
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
				}), /* @__PURE__ */ q(D, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ q(k, {
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
			e.layout === "image" && /* @__PURE__ */ q(D, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ q(k, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ q(D, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ q(A, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ q(st, {
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
var ft = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function pt({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ q("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ J("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", ft[a]),
			children: [e, t && /* @__PURE__ */ J("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ q("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ q(y, {
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
var mt = [
	"chart",
	"quote",
	"image",
	"two-column"
], ht = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
}, gt = {
	narrow: 600,
	wide: 900
};
function _t(e) {
	return e == null ? "wide" : e < gt.narrow ? "narrow" : e < gt.wide ? "medium" : "wide";
}
var vt = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, yt = "Text style comes from the theme", bt = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function xt({ redo: e }) {
	return /* @__PURE__ */ J("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ q("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ q("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function St() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Ct() {
	return /* @__PURE__ */ q("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function wt({ label: e, value: t }) {
	return /* @__PURE__ */ J("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ q("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ q("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ q(g, { size: 12 })
		]
	});
}
function Tt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: g, disabled: v = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...T } = M(), { ref: E, width: D } = ae(C), O = S === "auto" ? _t(D) : S, k = vt[O], A = (e) => k.has(e), j = v, N = !j && e ? {
		label: "Layout of this slide",
		items: Be.map((t) => ({
			label: Ve[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${x}-layout-${t}`
		}))
	} : null, P = !j && a ? {
		label: "New slide after this one",
		items: mt.map((e) => ({
			label: `${Ve[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, F = j ? null : {
		label: "Deck theme",
		items: He.map((e) => ({
			label: ht[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${x}-theme-${e}`
		}))
	}, I = !j && e?.layout === "chart" && e.chart && c ? e.chart : null, ee = I && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: I.kind === e,
			onSelect: () => {
				I.kind !== e && c(e);
			},
			"data-testid": `${x}-chart-kind-${e}`
		}))
	} : null, L = [];
	return !A("layout") && N && L.push(N), !A("insert") && P && L.push(P), !A("theme") && F && L.push(F), !A("chart") && ee && L.push(ee), !A("note") && !j && L.push({
		label: yt,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ J("div", {
		...T,
		ref: E,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": O,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ q(i, {
				variant: "primary",
				size: "sm",
				disabled: j || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ J("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ q(h, { size: 12 }), "New slide"]
				})
			}),
			A("layout") && N && e && /* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ q(wt, {
					label: "Layout",
					value: Ve[e.layout]
				}),
				triggerLabel: `Layout: ${Ve[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [N],
				"data-testid": `${x}-layout-menu`
			}),
			A("insert") && P && /* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ q(wt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [P],
				"data-testid": `${x}-insert-menu`
			}),
			A("theme") && F && /* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ q(wt, {
					label: "Theme",
					value: ht[t]
				}),
				triggerLabel: `Theme: ${ht[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [F],
				"data-testid": `${x}-theme-menu`
			}),
			A("chart") && I && c && /* @__PURE__ */ q(w, {
				size: "sm",
				value: I.kind,
				onChange: (e) => c(e),
				options: [{
					value: "bar",
					label: "Bar"
				}, {
					value: "line",
					label: "Line"
				}],
				"aria-label": "Chart type",
				className: "shrink-0",
				"data-testid": `${x}-chart-kind`
			}),
			(l || u) && /* @__PURE__ */ J(K, { children: [
				/* @__PURE__ */ q(Ct, {}),
				l && /* @__PURE__ */ q(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ q(xt, {}),
					disabled: j || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ q(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ q(xt, { redo: !0 }),
					disabled: j || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			L.length > 0 && /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(Ct, {}), /* @__PURE__ */ q(_, {
				trigger: /* @__PURE__ */ q("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-more`,
				sections: L,
				"data-testid": `${x}-more-menu`
			})] }),
			A("note") && /* @__PURE__ */ q(y, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: bt,
				"data-testid": `${x}-style-note`,
				children: yt
			}),
			/* @__PURE__ */ q("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			p && /* @__PURE__ */ q(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ J("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ q(St, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Et({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Pe, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = H(), l = H(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ J("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ J("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ q(y, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ q(y, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ q(A, {
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
function Dt({ testIdPrefix: e }) {
	return /* @__PURE__ */ q(N, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Ot = z(() => import("./PresentationAgentComposer-DELN7M8e.js").catch(() => ({ default: Dt })));
function kt({ back: e }) {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ q("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function At(e, t) {
	let [n, r] = G({
		past: [],
		future: []
	}), i = W(null), a = W(0);
	return V(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: B((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: B(() => {
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
		redo: B(() => {
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
function jt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: _, onUndoInstruct: v, generatingSlideIds: b, slideViewers: x, selectSlideRequest: w, footer: E, renderFrame: A, onSelectedSlideChange: M, className: P, "data-testid": F = "presentation-editor" }) {
	let [I, L] = G(() => e.slides[0]?.id ?? ""), [te, ne] = G(!1), [ae, oe] = G(null), z = !!g, [H, se] = G("slide"), [ce, le] = G(!1), [ue, de] = G(null), [fe, pe] = G(null), [me, ge] = G(() => /* @__PURE__ */ new Set()), { edit: Y, undo: _e, redo: Se, canUndo: Ce, canRedo: Ee } = At(e, t), [De, Oe] = G([]);
	V(() => {
		typeof n == "object" && "slides" in n && Oe(n.slides);
	}, [n]);
	let ke = W(a);
	ke.current = a;
	let X = e.slides, Z = U(() => new Set(Ue(e)), [e]), Ae = Z.size === 0;
	V(() => {
		Ae && ke.current(e);
	}, [e, Ae]);
	let Q = Math.max(X.findIndex((e) => e.id === I), 0), $ = X[Q], je = W(M);
	je.current = M, V(() => {
		$ && je.current?.($.id, Q);
	}, [$?.id, Q]);
	let Me = U(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : De;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, De]), Ne = U(() => {
		let e = new Set(b ?? []);
		return ce && H === "slide" && $ && e.add($.id), [...e];
	}, [
		b,
		ce,
		H,
		$
	]), Pe = !!$ && Ne.includes($.id), Fe = X.map((e) => ({
		slide: e,
		thumbnailSvg: Me.get(e.id),
		uncited: Z.has(e.id),
		changed: me.has(e.id)
	})), Ie = B((e) => {
		L(e);
	}, []), Le = w?.key, Re = w?.slideId;
	V(() => {
		Re && e.slides.some((e) => e.id === Re) && L(Re);
	}, [Le, Re]);
	let ze = B((t, n) => {
		Y(Ye(e, t, n));
	}, [Y, e]), Be = B((t) => {
		let n = Xe(e, Q, t);
		n !== e && (Y(n), L(n.slides[Q + 1].id));
	}, [
		Y,
		e,
		Q
	]), Ve = B((t) => {
		let n = Ze(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		Y(n), L(n.slides[r + 1].id);
	}, [Y, e]), He = B((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = Qe(e, t);
		r !== e && (Y(r), L(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [Y, e]), We = B((t) => Y(Je(e, t)), [Y, e]), Ge = B(async (e) => {
		if (!g || ce) return !1;
		let t = $?.id;
		le(!0), pe(null);
		try {
			let n = await g(e, H === "slide" && t ? {
				slideId: t,
				scope: H
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return ge(new Set(r)), de(n?.summary?.trim() || "Done."), H === "deck" && r.length && (!t || !r.includes(t)) && L(r[0]), !0;
		} catch (e) {
			return pe(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			le(!1);
		}
	}, [
		g,
		ce,
		H,
		$?.id
	]), Ke = B(() => {
		v?.(), de(null), ge(/* @__PURE__ */ new Set());
	}, [v]), et = Z.size, tt = !h && X.length > 0 && et === 0 && !te, nt = B(() => {
		tt && (ne(!0), oe(null), Promise.resolve(o(e)).catch((e) => {
			oe(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ne(!1)));
	}, [
		tt,
		o,
		e
	]), rt = B((e) => {
		let t = X[Q + e];
		t && L(t.id);
	}, [X, Q]);
	if (V(() => {
		if (h) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), nt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !ye(e.target)) {
				e.preventDefault(), e.shiftKey ? Se() : _e();
				return;
			}
			let n = be(e);
			if (!n) return;
			e.preventDefault();
			let r = xe(n, Q + 1, X.length);
			r !== Q + 1 && rt(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		nt,
		_e,
		Se,
		rt,
		Q,
		X.length
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? X.map((e, t) => {
				let n = Te(Me.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ q("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ q(we, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = X[e - 1];
				t && L(t.id);
			},
			...f ? { onDownload: f } : {},
			className: P,
			"data-testid": `${F}-readonly`
		});
	}
	let it = (() => {
		if ($ && Z.has($.id)) return /* @__PURE__ */ q(S, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${F}-preview-needs-source`
		});
		let t = $ ? Te(Me.get($.id)) : void 0;
		if (!Ae && !t) return /* @__PURE__ */ q(S, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${F}-preview-needs-source`
		});
		if (n === "loading" && Me.size === 0) return /* @__PURE__ */ q(T, {
			label: "Rendering the deck…",
			testId: `${F}-preview-loading`
		});
		if (Ae && typeof n == "object" && "error" in n) return /* @__PURE__ */ q(C, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${F}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ q("img", {
			src: r,
			alt: $.title || `Slide ${Q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${F}-stage-image`
		}) : /* @__PURE__ */ q(y, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${F}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), ot = s.map((e) => ({
		id: e.id,
		label: e.label
	})), ct = /* @__PURE__ */ J("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${F}-revision-controls`,
		children: [
			ot.length > 5 ? /* @__PURE__ */ q(ee, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => l?.(e.target.value),
				options: [...ot].reverse().map((e, t) => ({
					value: e.id,
					label: t === 0 ? `${e.label} · latest` : e.label
				})),
				className: "w-auto",
				"data-testid": `${F}-revision-select`
			}) : ot.length > 0 && /* @__PURE__ */ q(O, {
				items: ot,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${F}-revisions`
			}),
			/* @__PURE__ */ q(i, {
				variant: "primary",
				size: "sm",
				disabled: !tt,
				onClick: nt,
				"data-testid": `${F}-save`,
				children: te ? "Saving…" : `Save as ${$e(s)}`
			}),
			f && /* @__PURE__ */ q(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${F}-download`,
				children: "Download .pptx"
			})
		]
	}), lt = z || A ? /* @__PURE__ */ J("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ q(ve, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => Y({
				...e,
				title: t
			}),
			"data-testid": `${F}-deck-title`
		}), /* @__PURE__ */ q(ve, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => Y({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${F}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ J("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ q(D, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ q(k, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => Y({
					...e,
					title: t.target.value
				}),
				"data-testid": `${F}-deck-title`
			})
		}), /* @__PURE__ */ q(D, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ q(k, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => Y({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${F}-deck-subtitle`
			})
		})]
	}), ut = p ? () => p($ ? {
		slideId: $.id,
		slideIndex: Q + 1
	} : void 0) : void 0, ft = /* @__PURE__ */ q(Tt, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: Be,
		canAddSlide: X.length < 40,
		onLayoutChange: (t) => {
			$ && Y(Je(e, qe($, t)));
		},
		onThemeChange: (t) => Y({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			$?.chart && Y(Je(e, {
				...$,
				chart: {
					...$.chart,
					kind: t
				}
			}));
		},
		onUndo: _e,
		onRedo: Se,
		canUndo: Ce,
		canRedo: Ee,
		...ut ? { onPresent: ut } : {},
		testIdPrefix: `${F}-toolbar`
	}), mt = /* @__PURE__ */ J(K, { children: [et > 0 && /* @__PURE__ */ q(N, {
		tone: "warning",
		"data-testid": `${F}-uncited-warning`,
		children: et === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${et} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ae && /* @__PURE__ */ q(N, {
		tone: "error",
		onDismiss: () => oe(null),
		"data-testid": `${F}-save-error`,
		children: ae
	})] }), ht = z && /* @__PURE__ */ J(K, { children: [fe && /* @__PURE__ */ q(N, {
		tone: "error",
		onDismiss: () => pe(null),
		"data-testid": `${F}-agent-error`,
		children: fe
	}), ue && !fe && /* @__PURE__ */ J("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${F}-agent-summary`,
		children: [
			/* @__PURE__ */ q(y, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${ue}`
			}),
			me.size > 0 && /* @__PURE__ */ q(y, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: me.size === 1 ? "1 slide marked in the filmstrip" : `${me.size} slides marked in the filmstrip`
			}),
			v && /* @__PURE__ */ q(i, {
				variant: "ghost",
				size: "sm",
				onClick: Ke,
				"data-testid": `${F}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), gt = z && $ && /* @__PURE__ */ q(R, {
		fallback: /* @__PURE__ */ q(y, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${F}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ q(Ot, {
			scope: H,
			onScopeChange: se,
			slideLabel: `slide ${Q + 1}`,
			busy: ce,
			onSubmit: Ge,
			..._?.length ? { suggestions: _ } : {},
			testIdPrefix: F
		})
	}), _t = {
		selectedSlide: $,
		selectedIndex: Q,
		slideCount: X.length,
		selectSlide: Ie,
		markChanged: (e) => ge(new Set(e))
	}, vt = typeof E == "function" ? E(_t) : E, yt = vt != null && vt !== !1 ? vt : gt ? /* @__PURE__ */ q(re, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ J("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${F}-dock-card`,
			children: [ht, gt]
		}),
		"data-testid": `${F}-dock`
	}) : null, bt = $ && /* @__PURE__ */ q(K, { children: z ? /* @__PURE__ */ J(K, { children: [/* @__PURE__ */ q(st, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => We({
			...$,
			sources: e
		}),
		options: u,
		onSearchSources: d,
		testIdPrefix: `${F}-slide`
	}), /* @__PURE__ */ q(he, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${F}-details`,
		children: /* @__PURE__ */ q(dt, {
			slide: $,
			onChange: We,
			sources: u,
			onSearchSources: d,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${F}-slide`
		})
	})] }) : /* @__PURE__ */ q(dt, {
		slide: $,
		onChange: We,
		sources: u,
		onSearchSources: d,
		showNotes: !1,
		testIdPrefix: `${F}-slide`
	}) }), xt = /* @__PURE__ */ J("div", {
		className: r("flex items-center justify-center gap-2", A && "ml-auto shrink-0"),
		"data-testid": `${F}-slide-nav`,
		children: [
			/* @__PURE__ */ q(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ q(kt, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => rt(-1),
				"data-testid": `${F}-previous`
			}),
			/* @__PURE__ */ q(y, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${F}-position`,
				children: `Slide ${X.length === 0 ? 0 : Q + 1} of ${X.length}`
			}),
			/* @__PURE__ */ q(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ q(kt, {}),
				disabled: Q >= X.length - 1,
				onClick: () => rt(1),
				"data-testid": `${F}-next`
			}),
			/* @__PURE__ */ q(j, {
				value: X.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${X.length} / 40`,
				className: "ml-2",
				"data-testid": `${F}-slide-meter`
			})
		]
	}), St = /* @__PURE__ */ J("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${F}-body`,
		children: [/* @__PURE__ */ q(at, {
			items: Fe,
			selectedId: $?.id ?? "",
			onSelect: Ie,
			onMove: ze,
			onDuplicate: Ve,
			onDelete: He,
			onAdd: () => Be(),
			canAdd: X.length < 40,
			generatingSlideIds: Ne,
			...x ? { slideViewers: x } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${F}-slide`
		}), /* @__PURE__ */ J("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${F}-main`,
			children: [
				/* @__PURE__ */ q("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${F}-stage-frame`,
					children: /* @__PURE__ */ q(pt, {
						generating: Pe,
						label: $ ? `Slide ${Q + 1} of ${X.length}: ${$.title || "Untitled slide"}` : "No slide",
						"data-testid": `${F}-stage`,
						children: it
					})
				}),
				!A && xt,
				$ && /* @__PURE__ */ J("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ q(Et, {
						value: $.notes,
						onChange: (e) => We({
							...$,
							notes: e
						}),
						"data-testid": `${F}-slide-notes`
					}), bt]
				})
			]
		})]
	}), Ct = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (A) {
		let e = /* @__PURE__ */ J("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", P),
			"data-testid": F,
			onKeyDown: Ct,
			children: [
				/* @__PURE__ */ J("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${F}-deck-line`,
					children: [lt, xt]
				}),
				mt,
				St
			]
		});
		return /* @__PURE__ */ q(K, { children: A({
			toolbar: ft,
			actions: ct,
			surface: e,
			footer: yt
		}) });
	}
	return /* @__PURE__ */ J("div", {
		className: r("relative flex h-full min-h-0 flex-col", P),
		"data-testid": F,
		onKeyDown: Ct,
		children: [
			/* @__PURE__ */ J("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ J("div", {
					className: r("flex flex-wrap justify-between gap-2", z ? "items-center" : "items-end"),
					...z ? { "data-testid": `${F}-deck-line` } : {},
					children: [lt, ct]
				}), /* @__PURE__ */ q("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: ft
				})]
			}),
			/* @__PURE__ */ J("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${F}-scroller`,
				children: [mt, St]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${F}-dock-row`,
				children: /* @__PURE__ */ q(ie.Provider, {
					value: "pinned",
					children: yt
				})
			})
		]
	});
}
//#endregion
export { Ke as A, Te as B, je as C, Xe as D, Ve as E, Je as F, he as G, ve as H, Ue as I, me as K, qe as L, $e as M, Ge as N, We as O, Qe as P, Z as R, Me as S, Be as T, ge as U, we as V, Y as W, Ne as _, Tt as a, Ae as b, dt as c, it as d, He as f, Ie as g, Fe as h, mt as i, Ye as j, Ze as k, st as l, $ as m, Et as n, _t as o, Q as p, pe as q, gt as r, pt as s, jt as t, at as u, Pe as v, ze as w, Re as x, Le as y, X as z };
