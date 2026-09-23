import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-CHdlnODN.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { M as h, l as g, t as _ } from "./DropdownMenu-3RUmXOvU.js";
import { a as v, n as y } from "./Text-DpIU0dw3.js";
import { t as b } from "./Chip-zdVBwV9j.js";
import { t as x } from "./Modal-DMFNRUDx.js";
import { t as S } from "./EmptyState-DFWbBBcY.js";
import { n as C, t as w } from "./SegmentedControl-X19S_gNQ.js";
import { n as T, t as E } from "./SearchInput-TPCQujCD.js";
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
import { t as ee } from "./Select-D2EQq7Wi.js";
import { G as L, U as te } from "./renderers-suizM8nE.js";
import { t as ne } from "./ComposerReferences-q9qjqqi5.js";
import { i as re, t as ie } from "./FloatingComposerDock-DMUQCjea.js";
import { t as ae } from "./useMeasuredWidth-BPrwD0q5.js";
import { Component as oe, Suspense as se, lazy as R, useCallback as z, useEffect as B, useId as V, useMemo as H, useRef as U, useState as W } from "react";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var ce = /* @__PURE__ */ new Set(["diagram", "presentation"]), le = [
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
], ue = [
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
function de(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function fe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function pe(t) {
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
function me({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = W([]), [d, f] = W(!1), [p, m] = W(null), [h, g] = W(null), [_, y] = W(""), [S, C] = W(""), [w, T] = W(!1), [E, D] = W(""), [O, j] = W("page"), [M, N] = W("blank"), [P, F] = W(""), [I, ne] = W(""), [re, ie] = W([]), ae = U(null), oe = U(null), se = V(), R = `${se}-blank-label`, z = `${se}-type-label`, me = `${se}-cookbook-label`, he = `${se}-title`, ge = `${se}-description`, _e = `${se}-deck-from`, J = `${se}-deck-source`;
	B(() => {
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
	let ve = H(() => le.filter((e) => de(e, _)), [_]), ye = H(() => l.filter((e) => fe(e, _)), [l, _]), be = H(() => te.filter((e) => L(e, _)), [_]);
	if (B(() => {
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
	let xe = l.find((e) => e.id === p), Se = h ? te.find((e) => e.id === h) : void 0, Ce = O === "sections", we = !!Se || !!xe, Te = l.length === 0 && !d && !Se, Ee = ve.length === 0 && ye.length === 0 && be.length === 0, De = Se ? {
		kind: "cookbook",
		cookbook: Se
	} : xe && !ce.has(O) ? {
		kind: "type",
		type: xe
	} : {
		kind: "blank",
		shape: O
	}, Oe = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), ce.has(O) && j("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			j(e.shape), ce.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, ke = (e) => e.kind === "blank" ? e.shape : ce.has(O) ? "page" : O, Ae = (e, t, n) => {
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
			let t = pe(e.cookbook);
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
	}, Y = O === "presentation" && M !== "blank" && !P, X = !!S.trim() && (!Ce || we) && !Y, je = () => {
		X && Ae(De, S, ke(De));
	};
	return /* @__PURE__ */ K(x, {
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
		children: /* @__PURE__ */ q("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && X && je();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ K("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ q("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ K(k, {
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
							let t = be.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: be[0]
							} : ve.length > 0 ? {
								kind: "blank",
								shape: ve[0].id
							} : ye.length > 0 ? {
								kind: "type",
								type: ye[0]
							} : void 0;
							if (!t) return;
							Oe(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								oe.current?.focus();
								return;
							}
							Ae(t, n, ke(t));
						}
					}), /* @__PURE__ */ K("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ q("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						ve.length > 0 && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ K("div", {
								id: R,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": R,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: ve.map((e) => /* @__PURE__ */ q(v, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => Oe({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ q("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ K("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ K("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ K(b, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ K("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ K("label", {
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ K(ee, {
									id: _e,
									value: M,
									options: ue.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										N(e.target.value), F(""), ne("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ K("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: M === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								M !== "blank" && /* @__PURE__ */ q("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ K(k, {
										type: "search",
										value: I,
										onChange: (e) => ne(e.target.value),
										"aria-label": M === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: M === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), re.length === 0 ? /* @__PURE__ */ K("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: M === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q("label", {
										htmlFor: J,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											M === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ K("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ K(ee, {
										id: J,
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
						be.length > 0 && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ q("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ K("div", {
									id: me,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ K("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": me,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: be.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ q(v, {
										padding: "md",
										selected: t,
										onSelect: () => Oe({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ q("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ K("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ K("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ K("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ K("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!ce.has(O) && (ye.length > 0 || Te || l.length === 0 && d) && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ q("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ K("span", {
										id: z,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Ce && /* @__PURE__ */ K("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ K("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Te && /* @__PURE__ */ K("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Ce ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								ye.length > 0 && /* @__PURE__ */ K("div", {
									role: "group",
									"aria-labelledby": z,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: ye.map((e) => {
										let t = !Se && p === e.id;
										return /* @__PURE__ */ q("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Oe({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ K("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ q("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ K("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ K("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ K("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ K("span", {
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
						Ee && /* @__PURE__ */ q("div", {
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
				/* @__PURE__ */ q("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ q("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ q("label", {
							htmlFor: he,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ K("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ K(k, {
							ref: oe,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: Se ? `e.g. ${Se.name}` : xe ? `e.g. Q2 ${xe.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ q("label", {
						htmlFor: ge,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ K("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ K(A, {
						id: ge,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => D(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ q("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ K("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ K("button", {
						"data-testid": "new-doc-submit",
						onClick: je,
						disabled: !X,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", X ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var he = class extends oe {
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
		return this.state.hasError ? /* @__PURE__ */ q("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ K("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ K("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ K("button", {
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
function ge({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": h = "disclosure" }) {
	let _ = n !== void 0, [v, y] = W(i), b = _ ? n : v, x = U(null);
	B(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ q("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": h,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ q("summary", {
			"data-testid": `${h}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ K(g, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ K("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ K("div", {
			"data-testid": `${h}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function _e({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = V(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ K(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ K(b, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ K("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K("span", { className: "flex-1" }), /* @__PURE__ */ K("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ K(S, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ K("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ K("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function J({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ K("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var ve = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function ye({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = W(!1), [h, g] = W(e), _ = U(null);
	B(() => {
		p || g(e);
	}, [e, p]), B(() => {
		p && _.current?.select();
	}, [p]);
	let v = () => {
		m(!1);
		let n = h.trim();
		if (o && !n) {
			g(e);
			return;
		}
		n !== e && t(n);
	};
	return p ? /* @__PURE__ */ K(k, {
		ref: _,
		size: c,
		value: h,
		"aria-label": n,
		placeholder: i,
		maxLength: a,
		autoFocus: !0,
		onChange: (e) => g(e.target.value),
		onBlur: v,
		onKeyDown: (t) => {
			t.key === "Enter" && (t.preventDefault(), v()), t.key === "Escape" && (t.preventDefault(), g(e), m(!1));
		},
		className: r("min-w-0", u && "w-auto min-w-[8ch] [field-sizing:content]", d),
		"data-testid": `${f}-input`
	}) : /* @__PURE__ */ K("button", {
		type: "button",
		disabled: s,
		onClick: () => m(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": f,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", ve[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function be(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function xe(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || be(e.target)) return null;
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
function Se(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Ce = 5;
function we({ back: e }) {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Te({ title: e, subtitle: t, revisions: n, revisionId: a, onRevisionChange: o, slideIndex: s, onSlideChange: c, onDownload: l, downloadLabel: u = "Download .pptx", onOpenPreview: d, pending: f, notice: p, state: h = "ready", errorMessage: g, onRetry: _, maxSlideWidth: v, autoFocus: b = !1, className: x, "data-testid": E = "presentation-view" }) {
	let D = V(), O = U(null), k = U(!1);
	if (B(() => {
		!b || k.current || !O.current || (k.current = !0, O.current.focus({ preventScroll: !0 }));
	}), h === "loading") return /* @__PURE__ */ K(T, {
		label: "Opening the presentation…",
		testId: `${E}-loading`
	});
	if (h === "error") return /* @__PURE__ */ K(C, {
		title: "This presentation could not be opened",
		...g ? { description: g } : {},
		..._ ? {
			actionLabel: "Try again",
			onAction: _
		} : {},
		testId: `${E}-error`
	});
	let A = n.find((e) => e.id === a) ?? n[0], j = A?.slides ?? [];
	if (h === "empty" || !A || j.length === 0) return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", x),
		"data-testid": E,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ K(y, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ K(y, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${E}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ K(S, {
			title: "No slides yet",
			description: f?.status === "generating" ? `${f.label} is still being generated.` : f?.status === "failed" ? f.message ?? `${f.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${E}-empty`
		})]
	});
	let M = j[Math.min(Math.max(s, 1), j.length) - 1];
	return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", x),
		ref: O,
		"data-testid": E,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${M.index} of ${j.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = xe(e);
			if (!t) return;
			e.preventDefault();
			let n = Se(t, M.index, j.length);
			n !== M.index && c(n);
		},
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ K(y, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${E}-title`,
						children: e
					}), t && /* @__PURE__ */ K(y, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${E}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ q("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ce ? /* @__PURE__ */ K(ee, {
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
						}) : n.length > 1 && /* @__PURE__ */ K(w, {
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
						f && /* @__PURE__ */ K(I, {
							state: f.status === "failed" ? "error" : "pending",
							label: `${f.label} ${f.status}`,
							"data-testid": `${E}-pending`
						}),
						l && /* @__PURE__ */ K(i, {
							variant: "secondary",
							size: "sm",
							onClick: l,
							"data-testid": `${E}-download`,
							children: u
						})
					]
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ K("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ K("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: v === void 0 ? void 0 : { maxWidth: v },
							"data-testid": `${E}-stage`,
							children: M.preview ?? /* @__PURE__ */ K(y, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${E}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ q("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ K(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(we, { back: !0 }),
								disabled: M.index <= 1,
								onClick: () => c(M.index - 1),
								"data-testid": `${E}-previous`
							}),
							/* @__PURE__ */ K(y, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${E}-position`,
								children: `Slide ${M.index} of ${j.length}`
							}),
							/* @__PURE__ */ K(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(we, {}),
								disabled: M.index >= j.length,
								onClick: () => c(M.index + 1),
								"data-testid": `${E}-next`
							}),
							d && M.preview && /* @__PURE__ */ K(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => d(M.id),
								"data-testid": `${E}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ q("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": D,
					"data-testid": `${E}-outline`,
					children: [/* @__PURE__ */ K(F, {
						as: "div",
						className: "mb-1",
						"data-testid": `${E}-outline-label`,
						children: /* @__PURE__ */ K("span", {
							id: D,
							children: "Slides"
						})
					}), /* @__PURE__ */ K("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => c(e.index),
							"aria-current": e.id === M.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === M.id && "bg-surface-hover font-medium"),
							"data-testid": `${E}-outline-row`,
							children: [/* @__PURE__ */ K("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ K("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			p && /* @__PURE__ */ K(y, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${E}-notice`,
				children: p
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function Ee(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function De() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Oe() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ke() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ K("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Ae() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Y({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: b }) {
	let x = Ee(i);
	return /* @__PURE__ */ q("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ K("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ q("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ K("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ K("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ K("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ K(y, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ q("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ K(y, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ K(y, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ K(y, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ K(y, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ q("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ q("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ K(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(De, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ K(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Oe, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ q("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ K(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(ke, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ K(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Ae, {}),
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
function X({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Y, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ K("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ K(l, {
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
var je = 40, Me = 8, Ne = 200, Pe = 120, Fe = 200, Ie = 60, Le = 2e3, Z = 24, Q = 6, $ = 400, Re = 10, ze = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Be = [
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
var et = R(() => import("./SortableSlideList-4OoFwMNq.js"));
function tt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function nt(e, t) {
	tt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function rt() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ K("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function it({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = Ee(e.thumbnailSvg), c = t + 1;
	return /* @__PURE__ */ q("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ K("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ K("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: c
			})
		}), /* @__PURE__ */ q("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ K("button", {
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${c}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ K("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ q("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ K(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ K(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ K(y, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ q(y, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ K(rt, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(P, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function at() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ K("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ K("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ K("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function ot({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: v, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = Ee(i), w = t + 1, T = e.title || "Untitled slide", E = [
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
	return /* @__PURE__ */ q("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ q("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ K("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: w
			}), !u && v && /* @__PURE__ */ K("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ q("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${w}: ${T}`,
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ K("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ q("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ K(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: T
						}), /* @__PURE__ */ K(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ve[e.layout]
						})]
					}), c && /* @__PURE__ */ K("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ K(y, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ K(y, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: T
						}) : /* @__PURE__ */ K("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ K(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ K(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(P, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && E.length > 0 && /* @__PURE__ */ K("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ K(_, {
						trigger: /* @__PURE__ */ K(at, {}),
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
function st({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: g = "filmstrip" }) {
	let _ = U(null), v = H(() => new Set(u ?? []), [u]), b = H(() => e.map((e) => {
		let t = f?.[e.slide.id];
		return !v.has(e.slide.id) && !t?.length ? e : {
			...e,
			...v.has(e.slide.id) ? { generating: !0 } : {},
			...t?.length ? { viewers: t } : {}
		};
	}), [
		e,
		v,
		f
	]), x = H(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...v].filter((e) => !t.has(e));
	}, [e, v]);
	B(() => {
		tt(_.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let S = d ?? [], C = [...e.map((e) => e.slide.id), ...S.map((e) => e.id)], w = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = C.indexOf(t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= C.length) return;
		r.preventDefault();
		let s = C[i];
		if (r.altKey) {
			if (p || i >= e.length || o >= e.length) return;
			a(i, o), requestAnimationFrame(() => nt(_.current, s));
			return;
		}
		let c = C[o];
		n(c), nt(_.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ot,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ q("div", {
		ref: _,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${g}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ K(se, {
				fallback: /* @__PURE__ */ K(X, { ...T }),
				children: K(p ? X : et, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ q("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ K("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ K("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ K(y, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ K("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ K(it, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			c && !p && /* @__PURE__ */ q("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ K("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ K(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ q("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ K(h, { size: 12 }), "Add slide"]
					})
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
	let [l, u] = W(""), [d, f] = W(!1), [p, m] = W(n), h = V(), g = U(0);
	B(() => {
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
	}, x = /* @__PURE__ */ K(ne, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ K(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ K(y, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ K(y, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ K("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ K("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ct[t.kind ?? "document"]
						}),
						/* @__PURE__ */ K("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ K("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ K(F, {
					as: "div",
					children: /* @__PURE__ */ K("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ K(y, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ K("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ K(i, {
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
	}) : /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ K(F, {
				as: "div",
				children: /* @__PURE__ */ K("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ K(N, {
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
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
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
	return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ K(F, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ K("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ q("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ K(y, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ K(k, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ K(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ K(ut, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ K(i, {
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
	return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ q("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ K(D, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ K(ee, {
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
			}), !n && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ K(i, {
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
		}), /* @__PURE__ */ K("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ q(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ K(f, { children: /* @__PURE__ */ q(l, { children: [
					/* @__PURE__ */ K(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ K(d, { children: /* @__PURE__ */ K(k, {
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
					!n && /* @__PURE__ */ K(d, {})
				] }) }), /* @__PURE__ */ K(u, { children: e.labels.map((i, o) => /* @__PURE__ */ q(l, { children: [
					/* @__PURE__ */ K(c, { children: /* @__PURE__ */ K(k, {
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
					e.series.map((e, t) => /* @__PURE__ */ K(c, { children: /* @__PURE__ */ K(k, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ K(c, { children: /* @__PURE__ */ K(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(ut, {}),
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
	return /* @__PURE__ */ q("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ q("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ K(D, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ K(k, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ K(D, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ K(k, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ K(dt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ q("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ K(dt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ K(dt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ K(ft, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ q("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ K(D, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ K(A, {
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
				}), /* @__PURE__ */ K(D, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ K(k, {
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
			e.layout === "image" && /* @__PURE__ */ K(D, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ K(k, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ K(D, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ K(A, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ K(lt, {
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
	return /* @__PURE__ */ K("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ q("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", mt[a]),
			children: [e, t && /* @__PURE__ */ q("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ K("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ K(y, {
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
}, vt = {
	narrow: 600,
	wide: 900
};
function yt(e) {
	return e == null ? "wide" : e < vt.narrow ? "narrow" : e < vt.wide ? "medium" : "wide";
}
var bt = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, xt = "Text style comes from the theme", St = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function Ct({ redo: e }) {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ K("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function wt() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Tt() {
	return /* @__PURE__ */ K("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Et({ label: e, value: t }) {
	return /* @__PURE__ */ q("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ K("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ K("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ K(g, { size: 12 })
		]
	});
}
function Dt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: g, disabled: v = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...T } = M(), { ref: E, width: D } = ae(C), O = S === "auto" ? yt(D) : S, k = bt[O], A = (e) => k.has(e), j = v, N = !j && e ? {
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
		items: gt.map((e) => ({
			label: `${Ve[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, F = j ? null : {
		label: "Deck theme",
		items: He.map((e) => ({
			label: _t[e],
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
		label: xt,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ q("div", {
		...T,
		ref: E,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": O,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: j || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ K(h, { size: 12 }), "New slide"]
				})
			}),
			A("layout") && N && e && /* @__PURE__ */ K(_, {
				trigger: /* @__PURE__ */ K(Et, {
					label: "Layout",
					value: Ve[e.layout]
				}),
				triggerLabel: `Layout: ${Ve[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [N],
				"data-testid": `${x}-layout-menu`
			}),
			A("insert") && P && /* @__PURE__ */ K(_, {
				trigger: /* @__PURE__ */ K(Et, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [P],
				"data-testid": `${x}-insert-menu`
			}),
			A("theme") && F && /* @__PURE__ */ K(_, {
				trigger: /* @__PURE__ */ K(Et, {
					label: "Theme",
					value: _t[t]
				}),
				triggerLabel: `Theme: ${_t[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [F],
				"data-testid": `${x}-theme-menu`
			}),
			A("chart") && I && c && /* @__PURE__ */ K(w, {
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
			(l || u) && /* @__PURE__ */ q(G, { children: [
				/* @__PURE__ */ K(Tt, {}),
				l && /* @__PURE__ */ K(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Ct, {}),
					disabled: j || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ K(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Ct, { redo: !0 }),
					disabled: j || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			L.length > 0 && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(Tt, {}), /* @__PURE__ */ K(_, {
				trigger: /* @__PURE__ */ K("span", {
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
			A("note") && /* @__PURE__ */ K(y, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: St,
				"data-testid": `${x}-style-note`,
				children: xt
			}),
			/* @__PURE__ */ K("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			p && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ K(wt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Ot({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Le, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = V(), l = V(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ q("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ K(y, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ K(y, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ K(A, {
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
function kt({ testIdPrefix: e }) {
	return /* @__PURE__ */ K(N, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var At = R(() => import("./PresentationAgentComposer-BTIilVLy.js").catch(() => ({ default: kt })));
function jt({ back: e }) {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Mt(e, t) {
	let [n, r] = W({
		past: [],
		future: []
	}), i = U(null), a = U(0);
	return B(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: z((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: z(() => {
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
		redo: z(() => {
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
function Nt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: _, onUndoInstruct: v, generatingSlideIds: b, slideViewers: x, selectSlideRequest: w, footer: E, renderFrame: A, onSelectedSlideChange: M, className: P, "data-testid": F = "presentation-editor" }) {
	let [I, L] = W(() => e.slides[0]?.id ?? ""), [te, ne] = W(!1), [ae, oe] = W(null), R = !!g, [V, ce] = W("slide"), [le, ue] = W(!1), [de, fe] = W(null), [pe, me] = W(null), [he, _e] = W(() => /* @__PURE__ */ new Set()), { edit: J, undo: ve, redo: Ce, canUndo: we, canRedo: De } = Mt(e, t), [Oe, ke] = W([]);
	B(() => {
		typeof n == "object" && "slides" in n && ke(n.slides);
	}, [n]);
	let Ae = U(a);
	Ae.current = a;
	let Y = e.slides, X = H(() => new Set(Ue(e)), [e]), je = X.size === 0;
	B(() => {
		je && Ae.current(e);
	}, [e, je]);
	let Me = typeof n == "object" && "slides" in n ? n.slides : Oe, Ne = H(() => new Map(Me.map((e) => [e.id, e.svg])), [Me]), Pe = H(() => {
		let e = new Set(Y.map((e) => e.id));
		return Me.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Me, Y]), Fe = Y.length + Pe.length, Ie = Y.findIndex((e) => e.id === I), Le = Ie === -1 ? Pe.findIndex((e) => e.id === I) : -1, Z = Ie === -1 ? Le === -1 ? 0 : Y.length + Le : Ie, Q = Ie !== -1 || Le === -1 ? Y[Z] : void 0, $ = Le === -1 ? void 0 : Pe[Le], Re = Q?.id ?? $?.id, ze = Q ? Q.title || "Untitled slide" : $?.title, Be = H(() => [...Y.map((e) => e.id), ...Pe.map((e) => e.id)], [Y, Pe]), Ve = Math.min(Z, Y.length - 1), He = U(M);
	He.current = M, B(() => {
		Re && He.current?.(Re, Z);
	}, [Re, Z]);
	let We = H(() => {
		let e = new Set(b ?? []);
		return le && V === "slide" && Q && e.add(Q.id), [...e];
	}, [
		b,
		le,
		V,
		Q
	]), Ge = !!Q && We.includes(Q.id), Ke = Y.map((e) => ({
		slide: e,
		thumbnailSvg: Ne.get(e.id),
		uncited: X.has(e.id),
		changed: he.has(e.id)
	})), et = z((e) => {
		L(e);
	}, []), tt = w?.key, nt = w?.slideId;
	B(() => {
		nt && e.slides.some((e) => e.id === nt) && L(nt);
	}, [tt, nt]);
	let rt = z((t, n) => {
		J(Ye(e, t, n));
	}, [J, e]), it = z((t) => {
		let n = Xe(e, Ve, t);
		n !== e && (J(n), L(n.slides[Ve + 1].id));
	}, [
		J,
		e,
		Ve
	]), at = z((t) => {
		let n = Ze(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		J(n), L(n.slides[r + 1].id);
	}, [J, e]), ot = z((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = Qe(e, t);
		r !== e && (J(r), L(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [J, e]), ct = z((t) => J(Je(e, t)), [J, e]), ut = z(async (e) => {
		if (!g || le) return !1;
		let t = Q?.id;
		ue(!0), me(null);
		try {
			let n = await g(e, V === "slide" && t ? {
				slideId: t,
				scope: V
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return _e(new Set(r)), fe(n?.summary?.trim() || "Done."), V === "deck" && r.length && (!t || !r.includes(t)) && L(r[0]), !0;
		} catch (e) {
			return me(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			ue(!1);
		}
	}, [
		g,
		le,
		V,
		Q?.id
	]), dt = z(() => {
		v?.(), fe(null), _e(/* @__PURE__ */ new Set());
	}, [v]), ft = X.size, mt = !h && Y.length > 0 && ft === 0 && !te, gt = z(() => {
		mt && (ne(!0), oe(null), Promise.resolve(o(e)).catch((e) => {
			oe(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ne(!1)));
	}, [
		mt,
		o,
		e
	]), _t = z((e) => {
		let t = Be[Z + e];
		t && L(t);
	}, [Be, Z]);
	if (B(() => {
		if (h) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), gt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !be(e.target)) {
				e.preventDefault(), e.shiftKey ? Ce() : ve();
				return;
			}
			let n = xe(e);
			if (!n) return;
			e.preventDefault();
			let r = Se(n, Z + 1, Fe);
			r !== Z + 1 && _t(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		gt,
		ve,
		Ce,
		_t,
		Z,
		Fe
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...Y.map((e, t) => {
				let n = Ee(Ne.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ K("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Pe.map((e, t) => {
				let n = Ee(e.svg);
				return {
					id: e.id,
					index: Y.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ K("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ K(Te, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = Be[e - 1];
				t && L(t);
			},
			...f ? { onDownload: f } : {},
			className: P,
			"data-testid": `${F}-readonly`
		});
	}
	let vt = (() => {
		if ($) {
			let e = Ee($.svg);
			return e ? /* @__PURE__ */ K("img", {
				src: e,
				alt: $.title,
				className: "h-full w-full object-contain",
				"data-testid": `${F}-stage-image`
			}) : /* @__PURE__ */ K(y, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${F}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Q && X.has(Q.id)) return /* @__PURE__ */ K(S, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${F}-preview-needs-source`
		});
		let t = Q ? Ee(Ne.get(Q.id)) : void 0;
		if (!je && !t) return /* @__PURE__ */ K(S, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${F}-preview-needs-source`
		});
		if (n === "loading" && Ne.size === 0) return /* @__PURE__ */ K(T, {
			label: "Rendering the deck…",
			testId: `${F}-preview-loading`
		});
		if (je && typeof n == "object" && "error" in n) return /* @__PURE__ */ K(C, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${F}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ K("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${F}-stage-image`
		}) : /* @__PURE__ */ K(y, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${F}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), yt = s.map((e) => ({
		id: e.id,
		label: e.label
	})), bt = /* @__PURE__ */ q("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${F}-revision-controls`,
		children: [
			yt.length > 5 ? /* @__PURE__ */ K(ee, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => l?.(e.target.value),
				options: [...yt].reverse().map((e, t) => ({
					value: e.id,
					label: t === 0 ? `${e.label} · latest` : e.label
				})),
				className: "w-auto",
				"data-testid": `${F}-revision-select`
			}) : yt.length > 0 && /* @__PURE__ */ K(O, {
				items: yt,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${F}-revisions`
			}),
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: !mt,
				onClick: gt,
				"data-testid": `${F}-save`,
				children: te ? "Saving…" : `Save as ${$e(s)}`
			}),
			f && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${F}-download`,
				children: "Download .pptx"
			})
		]
	}), xt = R || A ? /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ K(ye, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => J({
				...e,
				title: t
			}),
			"data-testid": `${F}-deck-title`
		}), /* @__PURE__ */ K(ye, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => J({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${F}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ q("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ K(D, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ K(k, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => J({
					...e,
					title: t.target.value
				}),
				"data-testid": `${F}-deck-title`
			})
		}), /* @__PURE__ */ K(D, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ K(k, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => J({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${F}-deck-subtitle`
			})
		})]
	}), St = p ? () => p(Re ? {
		slideId: Re,
		slideIndex: Z + 1
	} : void 0) : void 0, Ct = /* @__PURE__ */ K(Dt, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: it,
		canAddSlide: Y.length < 40,
		onLayoutChange: (t) => {
			Q && J(Je(e, qe(Q, t)));
		},
		onThemeChange: (t) => J({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && J(Je(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: ve,
		onRedo: Ce,
		canUndo: we,
		canRedo: De,
		...St ? { onPresent: St } : {},
		testIdPrefix: `${F}-toolbar`
	}), wt = /* @__PURE__ */ q(G, { children: [ft > 0 && /* @__PURE__ */ K(N, {
		tone: "warning",
		"data-testid": `${F}-uncited-warning`,
		children: ft === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${ft} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ae && /* @__PURE__ */ K(N, {
		tone: "error",
		onDismiss: () => oe(null),
		"data-testid": `${F}-save-error`,
		children: ae
	})] }), Tt = R && /* @__PURE__ */ q(G, { children: [pe && /* @__PURE__ */ K(N, {
		tone: "error",
		onDismiss: () => me(null),
		"data-testid": `${F}-agent-error`,
		children: pe
	}), de && !pe && /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${F}-agent-summary`,
		children: [
			/* @__PURE__ */ K(y, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${de}`
			}),
			he.size > 0 && /* @__PURE__ */ K(y, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: he.size === 1 ? "1 slide marked in the filmstrip" : `${he.size} slides marked in the filmstrip`
			}),
			v && /* @__PURE__ */ K(i, {
				variant: "ghost",
				size: "sm",
				onClick: dt,
				"data-testid": `${F}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Et = R && Q && /* @__PURE__ */ K(se, {
		fallback: /* @__PURE__ */ K(y, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${F}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ K(At, {
			scope: V,
			onScopeChange: ce,
			slideLabel: `slide ${Z + 1}`,
			busy: le,
			onSubmit: ut,
			..._?.length ? { suggestions: _ } : {},
			testIdPrefix: F
		})
	}), kt = {
		selectedSlide: Q,
		...$ ? { selectedGeneratedSlide: $ } : {},
		selectedIndex: Z,
		slideCount: Fe,
		selectSlide: et,
		markChanged: (e) => _e(new Set(e))
	}, Nt = typeof E == "function" ? E(kt) : E, Pt = Nt != null && Nt !== !1 ? Nt : Et ? /* @__PURE__ */ K(re, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${F}-dock-card`,
			children: [Tt, Et]
		}),
		"data-testid": `${F}-dock`
	}) : null, Ft = Q && /* @__PURE__ */ K(G, { children: R ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(lt, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => ct({
			...Q,
			sources: e
		}),
		options: u,
		onSearchSources: d,
		testIdPrefix: `${F}-slide`
	}), /* @__PURE__ */ K(ge, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${F}-details`,
		children: /* @__PURE__ */ K(pt, {
			slide: Q,
			onChange: ct,
			sources: u,
			onSearchSources: d,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${F}-slide`
		})
	})] }) : /* @__PURE__ */ K(pt, {
		slide: Q,
		onChange: ct,
		sources: u,
		onSearchSources: d,
		showNotes: !1,
		testIdPrefix: `${F}-slide`
	}) }), It = /* @__PURE__ */ q("div", {
		className: r("flex items-center justify-center gap-2", A && "ml-auto shrink-0"),
		"data-testid": `${F}-slide-nav`,
		children: [
			/* @__PURE__ */ K(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(jt, { back: !0 }),
				disabled: Z <= 0,
				onClick: () => _t(-1),
				"data-testid": `${F}-previous`
			}),
			/* @__PURE__ */ K(y, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${F}-position`,
				children: `Slide ${Fe === 0 ? 0 : Z + 1} of ${Fe}`
			}),
			/* @__PURE__ */ K(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(jt, {}),
				disabled: Z >= Fe - 1,
				onClick: () => _t(1),
				"data-testid": `${F}-next`
			}),
			/* @__PURE__ */ K(j, {
				value: Y.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Y.length} / 40`,
				className: "ml-2",
				"data-testid": `${F}-slide-meter`
			})
		]
	}), Lt = /* @__PURE__ */ q("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${F}-body`,
		children: [/* @__PURE__ */ K(st, {
			items: Ke,
			selectedId: Q?.id ?? "",
			onSelect: et,
			onMove: rt,
			onDuplicate: at,
			onDelete: ot,
			onAdd: () => it(),
			canAdd: Y.length < 40,
			generatingSlideIds: We,
			generatedItems: Pe.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...x ? { slideViewers: x } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${F}-slide`
		}), /* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${F}-main`,
			children: [
				/* @__PURE__ */ K("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${F}-stage-frame`,
					children: /* @__PURE__ */ K(ht, {
						generating: Ge,
						label: ze ? `Slide ${Z + 1} of ${Fe}: ${ze}` : "No slide",
						"data-testid": `${F}-stage`,
						children: vt
					})
				}),
				!A && It,
				$ && /* @__PURE__ */ K(y, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${F}-generated-note`,
					children: `${$.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Q && /* @__PURE__ */ q("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ K(Ot, {
						value: Q.notes,
						onChange: (e) => ct({
							...Q,
							notes: e
						}),
						"data-testid": `${F}-slide-notes`
					}), Ft]
				})
			]
		})]
	}), Rt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (A) {
		let e = /* @__PURE__ */ q("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", P),
			"data-testid": F,
			onKeyDown: Rt,
			children: [
				/* @__PURE__ */ q("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${F}-deck-line`,
					children: [xt, It]
				}),
				wt,
				Lt
			]
		});
		return /* @__PURE__ */ K(G, { children: A({
			toolbar: Ct,
			actions: bt,
			surface: e,
			footer: Pt
		}) });
	}
	return /* @__PURE__ */ q("div", {
		className: r("relative flex h-full min-h-0 flex-col", P),
		"data-testid": F,
		onKeyDown: Rt,
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ q("div", {
					className: r("flex flex-wrap justify-between gap-2", R ? "items-center" : "items-end"),
					...R ? { "data-testid": `${F}-deck-line` } : {},
					children: [xt, bt]
				}), /* @__PURE__ */ K("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Ct
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${F}-scroller`,
				children: [wt, Lt]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${F}-dock-row`,
				children: /* @__PURE__ */ K(ie.Provider, {
					value: "pinned",
					children: Pt
				})
			})
		]
	});
}
//#endregion
export { Ke as A, Ee as B, Pe as C, Xe as D, Ve as E, Je as F, ge as G, ye as H, Ue as I, he as K, qe as L, $e as M, Ge as N, We as O, Qe as P, X as R, Fe as S, Be as T, _e as U, Te as V, J as W, Ie as _, Dt as a, je as b, pt as c, ot as d, He as f, Q as g, Z as h, gt as i, Ye as j, Ze as k, lt as l, Ne as m, Ot as n, yt as o, Me as p, me as q, vt as r, ht as s, Nt as t, st as u, Le as v, ze as w, Re as x, $ as y, Y as z };
