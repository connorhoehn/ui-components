import { n as e, r as t, t as n } from "./useDocumentTypes-DwWC-vAB.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i } from "./overlayStack-BDlo8PJg.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CypeBEj0.js";
import { t as d } from "./IconButton-C3DMtvSx.js";
import { a as f, i as p, n as m, o as h } from "./Text-DIl-Ssia.js";
import { t as g } from "./Chip-DYqbAD3L.js";
import { t as _ } from "./Modal-D2qxMX2_.js";
import { t as v } from "./EmptyState-DQYx5Oyy.js";
import { t as y } from "./FormField-E8Z0ppOp.js";
import { n as b } from "./Tabs-BGZyr2nH.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./Textarea-Dz4doxTv.js";
import { t as C } from "./DotMeter-BDVkadI8.js";
import { n as w, t as T } from "./SearchInput-Y-j1He57.js";
import { t as E } from "./InlineAlert-CRnIKeAF.js";
import { t as D } from "./SectionLabel-bcrhNYOr.js";
import { t as O } from "./StatusPill-Db42eiME.js";
import { t as k } from "./Select-CD8ixtYi.js";
import { G as A, U as ee } from "./renderers-5O9bh08s.js";
import { t as te } from "./ComposerReferences-nGKcicNt.js";
import { Component as j, Suspense as ne, lazy as M, useCallback as N, useEffect as re, useId as ie, useMemo as ae, useRef as oe, useState as P } from "react";
import { Fragment as se, jsx as F, jsxs as I } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var L = /* @__PURE__ */ new Set(["diagram", "presentation"]), ce = [
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
], R = [
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
function z(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function le(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function ue(t) {
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
function B({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = P([]), [d, f] = P(!1), [p, m] = P(null), [v, y] = P(null), [b, C] = P(""), [w, T] = P(""), [E, D] = P(!1), [O, te] = P(""), [j, ne] = P("page"), [M, N] = P("blank"), [B, V] = P(""), [H, U] = P(""), [de, W] = P([]), fe = oe(null), G = oe(null), K = ie(), q = `${K}-blank-label`, J = `${K}-type-label`, Y = `${K}-cookbook-label`, pe = `${K}-title`, me = `${K}-description`, he = `${K}-deck-from`, ge = `${K}-deck-source`;
	re(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), y(null), C(""), T(""), D(!1), te(""), ne("page"), N("blank"), V(""), U(""), W([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => fe.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let _e = ae(() => ce.filter((e) => z(e, b)), [b]), X = ae(() => l.filter((e) => le(e, b)), [l, b]), ve = ae(() => ee.filter((e) => A(e, b)), [b]);
	if (re(() => {
		if (!e || j !== "presentation") return;
		if (M === "blank") {
			W([]);
			return;
		}
		let t = H.trim().toLowerCase();
		if (M === "transcript") {
			let e = c ?? [];
			W(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			W([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(H.trim())).then((e) => {
			n || W(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		j,
		M,
		H,
		c,
		s
	]), !e) return null;
	let ye = l.find((e) => e.id === p), Z = v ? ee.find((e) => e.id === v) : void 0, be = j === "sections", xe = !!Z || !!ye, Se = l.length === 0 && !d && !Z, Ce = _e.length === 0 && X.length === 0 && ve.length === 0, we = Z ? {
		kind: "cookbook",
		cookbook: Z
	} : ye && !L.has(j) ? {
		kind: "type",
		type: ye
	} : {
		kind: "blank",
		shape: j
	}, Q = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), L.has(j) && ne("page"), E || T(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			ne(e.shape), L.has(e.shape) && (y(null), E || T(""));
			return;
		}
		y(null), m(e.type.id), E || T("");
	}, Te = (e) => e.kind === "blank" ? e.shape : L.has(j) ? "page" : j, Ee = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = O.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: M,
				...M !== "blank" && B ? { sourceId: B } : {},
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
			let t = ue(e.cookbook);
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
	}, De = j === "presentation" && M !== "blank" && !B, $ = !!w.trim() && (!be || xe) && !De, Oe = () => {
		$ && Ee(we, w, Te(we));
	};
	return /* @__PURE__ */ F(_, {
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
		children: /* @__PURE__ */ I("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && $ && Oe();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ F("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ I("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ F(x, {
						ref: fe,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => C(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = ve.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: ve[0]
							} : _e.length > 0 ? {
								kind: "blank",
								shape: _e[0].id
							} : X.length > 0 ? {
								kind: "type",
								type: X[0]
							} : void 0;
							if (!t) return;
							Q(t);
							let n = w.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								G.current?.focus();
								return;
							}
							Ee(t, n, Te(t));
						}
					}), /* @__PURE__ */ F("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ I("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						_e.length > 0 && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ F("div", {
								id: q,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ F("div", {
								role: "group",
								"aria-labelledby": q,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: _e.map((e) => /* @__PURE__ */ I(h, {
									padding: "md",
									selected: j === e.id,
									onSelect: () => Q({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ I("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ F("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ F("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ F(g, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ F("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						j === "presentation" && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ F("label", {
									htmlFor: he,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ F(k, {
									id: he,
									value: M,
									options: R.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										N(e.target.value), V(""), U("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ F("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: M === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								M !== "blank" && /* @__PURE__ */ I("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ F(x, {
										type: "search",
										value: H,
										onChange: (e) => U(e.target.value),
										"aria-label": M === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: M === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), de.length === 0 ? /* @__PURE__ */ F("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: M === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ I(se, { children: [/* @__PURE__ */ I("label", {
										htmlFor: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											M === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ F("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ F(k, {
										id: ge,
										required: !0,
										"aria-required": "true",
										value: B,
										placeholder: "Choose one…",
										options: de.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => V(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						ve.length > 0 && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ I("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ F("div", {
									id: Y,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ F("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: j === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : j === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : j === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ F("div", {
								role: "group",
								"aria-labelledby": Y,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: ve.map((e) => {
									let t = v === e.id;
									return /* @__PURE__ */ I(h, {
										padding: "md",
										selected: t,
										onSelect: () => Q({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ I("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ F("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ F("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ F("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ F("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!L.has(j) && (X.length > 0 || Se || l.length === 0 && d) && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ I("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ F("span", {
										id: J,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !be && /* @__PURE__ */ F("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ F("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Se && /* @__PURE__ */ F("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: be ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								X.length > 0 && /* @__PURE__ */ F("div", {
									role: "group",
									"aria-labelledby": J,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: X.map((e) => {
										let t = !Z && p === e.id;
										return /* @__PURE__ */ I("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Q({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ F("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ I("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ F("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ F("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ F("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: j === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ F("span", {
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
						Ce && /* @__PURE__ */ I("div", {
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
				/* @__PURE__ */ I("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ I("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ I("label", {
							htmlFor: pe,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ F("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ F(x, {
							ref: G,
							id: pe,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: w,
							onChange: (e) => {
								T(e.target.value), D(!0);
							},
							placeholder: Z ? `e.g. ${Z.name}` : ye ? `e.g. Q2 ${ye.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ I("div", { children: [/* @__PURE__ */ I("label", {
						htmlFor: me,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ F("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ F(S, {
						id: me,
						"data-testid": "new-doc-description",
						value: O,
						onChange: (e) => te(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ I("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ F("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ F("button", {
						"data-testid": "new-doc-submit",
						onClick: Oe,
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
var V = class extends j {
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
		return this.state.hasError ? /* @__PURE__ */ I("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ F("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ F("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ F("button", {
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
function H({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = ie(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ I("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ I("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ F(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ F(g, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ F("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ I(se, { children: [/* @__PURE__ */ F("span", { className: "flex-1" }), /* @__PURE__ */ F("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ F(v, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ F("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ F("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function U({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ F("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function de(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function W(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || de(e.target)) return null;
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
function fe(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function G({ back: e }) {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function K({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: h, notice: g, state: _ = "ready", errorMessage: y, onRetry: b, maxSlideWidth: x, className: S, "data-testid": C = "presentation-view" }) {
	let T = ie();
	if (_ === "loading") return /* @__PURE__ */ F(p, {
		label: "Opening the presentation…",
		testId: `${C}-loading`
	});
	if (_ === "error") return /* @__PURE__ */ F(f, {
		title: "This presentation could not be opened",
		...y ? { description: y } : {},
		...b ? {
			actionLabel: "Try again",
			onAction: b
		} : {},
		testId: `${C}-error`
	});
	let E = t.find((e) => e.id === n) ?? t[0], k = E?.slides ?? [];
	if (_ === "empty" || !E || k.length === 0) return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": C,
		children: [/* @__PURE__ */ F(m, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ F(v, {
			title: "No slides yet",
			description: h?.status === "generating" ? `${h.label} is still being generated.` : h?.status === "failed" ? h.message ?? `${h.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${C}-empty`
		})]
	});
	let A = k[Math.min(Math.max(o, 1), k.length) - 1];
	return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", S),
		"data-testid": C,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${A.index} of ${k.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = W(e);
			if (!t) return;
			e.preventDefault();
			let n = fe(t, A.index, k.length);
			n !== A.index && s(n);
		},
		children: [
			/* @__PURE__ */ I("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ F(m, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${C}-title`,
					children: e
				}), /* @__PURE__ */ I("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ F(w, {
							"aria-label": "Revision",
							size: "sm",
							value: E.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${C}-revisions`
						}),
						h && /* @__PURE__ */ F(O, {
							state: h.status === "failed" ? "error" : "pending",
							label: `${h.label} ${h.status}`,
							"data-testid": `${C}-pending`
						}),
						c && /* @__PURE__ */ F(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${C}-download`,
							children: l
						})
					]
				})]
			}),
			/* @__PURE__ */ I("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ I("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ F("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ F("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: x === void 0 ? void 0 : { maxWidth: x },
							"data-testid": `${C}-stage`,
							children: A.preview ?? /* @__PURE__ */ F(m, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${C}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ I("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ F(d, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ F(G, { back: !0 }),
								disabled: A.index <= 1,
								onClick: () => s(A.index - 1),
								"data-testid": `${C}-previous`
							}),
							/* @__PURE__ */ F(m, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${C}-position`,
								children: `Slide ${A.index} of ${k.length}`
							}),
							/* @__PURE__ */ F(d, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ F(G, {}),
								disabled: A.index >= k.length,
								onClick: () => s(A.index + 1),
								"data-testid": `${C}-next`
							}),
							u && A.preview && /* @__PURE__ */ F(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(A.id),
								"data-testid": `${C}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ I("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": T,
					"data-testid": `${C}-outline`,
					children: [/* @__PURE__ */ F(D, {
						as: "div",
						className: "mb-1",
						"data-testid": `${C}-outline-label`,
						children: /* @__PURE__ */ F("span", {
							id: T,
							children: "Slides"
						})
					}), /* @__PURE__ */ F("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: k.map((e) => /* @__PURE__ */ F("li", { children: /* @__PURE__ */ I("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === A.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === A.id && "bg-surface-hover font-medium"),
							"data-testid": `${C}-outline-row`,
							children: [/* @__PURE__ */ F("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ F("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			g && /* @__PURE__ */ F(m, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${C}-notice`,
				children: g
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var q = 40, J = 8, Y = 200, pe = 120, me = 200, he = 60, ge = 2e3, _e = 24, X = 6, ve = 400, ye = 10, Z = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, be = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], xe = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Se = [
	"product",
	"engineering",
	"plain"
];
function Ce(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function we(e) {
	return e.slides.length > 0 && Ce(e).length === 0;
}
function Q(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Te(e, t = "bullets") {
	return Ee({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ee(e, t) {
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
function De(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function $(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Oe(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Te(Q(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function ke(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Q(e),
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
function Ae(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function je(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var Me = {
	document: "📄",
	transcript: "🎙️"
};
function Ne({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, testIdPrefix: s }) {
	let [c, l] = P(""), [u, d] = P(n), f = ie(), p = oe(0);
	re(() => {
		let e = c.trim();
		if (!a) {
			let t = e.toLowerCase();
			d(t ? n.filter((e) => e.title.toLowerCase().includes(t)) : n);
			return;
		}
		let t = ++p.current, r = !1;
		return Promise.resolve(a(e)).then((e) => {
			r || t !== p.current || d(e);
		}).catch(() => {
			!r && t === p.current && d(n);
		}), () => {
			r = !0;
		};
	}, [
		c,
		a,
		n
	]);
	let h = e.map((e) => ({
		id: `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}`,
		label: e.anchor ? `${e.title} · ${e.anchor}` : e.title,
		icon: "📄",
		title: e.title
	})), g = e.length >= 10, _ = (n) => {
		g || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), l(""));
	};
	return /* @__PURE__ */ I("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${s}-sources`,
		children: [
			/* @__PURE__ */ F(D, {
				as: "div",
				children: /* @__PURE__ */ F("span", {
					id: f,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ F(E, {
				tone: "warning",
				"data-testid": `${s}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : /* @__PURE__ */ F(te, {
				references: h,
				onRemove: o ? void 0 : (n) => {
					t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
				},
				removeLabel: (e) => `Remove source ${e.label}`,
				className: "px-0 py-0",
				"data-testid": `${s}-source-chips`
			}),
			!o && /* @__PURE__ */ I("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ F(T, {
					value: c,
					onChange: l,
					placeholder: "Search your documents and transcripts…",
					"aria-label": "Search sources",
					"data-testid": `${s}-source-search`
				}), g ? /* @__PURE__ */ F(m, {
					className: "text-[11px] text-text-tertiary",
					children: "A slide cites at most 10 sources."
				}) : u.length === 0 ? /* @__PURE__ */ F(m, {
					className: "text-[11px] text-text-tertiary",
					"data-testid": `${s}-source-no-results`,
					children: "Nothing matches that. Sources come from the Documents explorer."
				}) : /* @__PURE__ */ F("ul", {
					"aria-labelledby": f,
					className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
					"data-testid": `${s}-source-results`,
					children: u.slice(0, 20).map((t) => {
						let n = e.some((e) => e.documentId === t.documentId);
						return /* @__PURE__ */ F("li", { children: /* @__PURE__ */ I(i, {
							variant: "ghost",
							size: "sm",
							fullWidth: !0,
							disabled: n,
							onClick: () => _(t),
							"data-testid": `${s}-source-option-${t.documentId}`,
							className: r("justify-start border-none text-left"),
							children: [
								/* @__PURE__ */ F("span", {
									className: "mr-1.5",
									"aria-hidden": "true",
									children: Me[t.kind ?? "document"]
								}),
								/* @__PURE__ */ F("span", {
									className: "truncate",
									children: t.title
								}),
								n && /* @__PURE__ */ F("span", {
									className: "ml-1.5 text-[10px] text-text-tertiary",
									children: "added"
								})
							]
						}) }, t.documentId);
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function Pe() {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Fe({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ I("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ F(D, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ F("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ I("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ F(m, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ F(x, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ F(d, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ F(Pe, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ F(i, {
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
function Ie({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let f = (n, r, i) => {
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
	}, p = () => {
		e.labels.length >= 24 || t({
			...e,
			labels: [...e.labels, `Label ${e.labels.length + 1}`],
			series: e.series.map((e) => ({
				...e,
				values: [...e.values, 0]
			}))
		});
	}, m = (n) => {
		e.labels.length <= 1 || t({
			...e,
			labels: e.labels.filter((e, t) => t !== n),
			series: e.series.map((e) => ({
				...e,
				values: e.values.filter((e, t) => t !== n)
			}))
		});
	};
	return /* @__PURE__ */ I("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ I("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ F(y, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ F(k, {
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
			}), !n && /* @__PURE__ */ I(se, { children: [/* @__PURE__ */ F(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: p,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ F(i, {
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
		}), /* @__PURE__ */ F("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ I(u, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ F(l, { children: /* @__PURE__ */ I(o, { children: [
					/* @__PURE__ */ F(c, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ F(c, { children: /* @__PURE__ */ F(x, {
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
					!n && /* @__PURE__ */ F(c, {})
				] }) }), /* @__PURE__ */ F(s, { children: e.labels.map((i, s) => /* @__PURE__ */ I(o, { children: [
					/* @__PURE__ */ F(a, { children: /* @__PURE__ */ F(x, {
						size: "sm",
						value: i,
						disabled: n,
						"aria-label": `Row ${s + 1} label`,
						onChange: (n) => t({
							...e,
							labels: e.labels.map((e, t) => t === s ? n.target.value : e)
						}),
						"data-testid": `${r}-label-${s}`
					}) }),
					e.series.map((e, t) => /* @__PURE__ */ F(a, { children: /* @__PURE__ */ F(x, {
						size: "sm",
						type: "number",
						value: String(e.values[s] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => f(t, s, e.target.value),
						"data-testid": `${r}-value-${t}-${s}`
					}) }, t)),
					!n && /* @__PURE__ */ F(a, { children: /* @__PURE__ */ F(d, {
						"aria-label": `Remove row ${s + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ F(Pe, {}),
						disabled: e.labels.length <= 1,
						onClick: () => m(s),
						"data-testid": `${r}-remove-label-${s}`
					}) })
				] }, s)) })]
			})
		})]
	});
}
function Le({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, testIdPrefix: o }) {
	let s = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ I("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${o}-form`,
		children: [
			/* @__PURE__ */ I("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ F(y, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ F(x, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => s({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${o}-eyebrow`
					})
				}), /* @__PURE__ */ F(y, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ F(x, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => s({ title: e.target.value }),
						"data-testid": `${o}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ F(Fe, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => s({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${o}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ I("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ F(Fe, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => s({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${o}-column-0`
				}), /* @__PURE__ */ F(Fe, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => s({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${o}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ F(Ie, {
				chart: e.chart,
				onChange: (e) => s({ chart: e }),
				readOnly: a,
				testIdPrefix: `${o}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ I("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ F(y, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ F(S, {
						...t,
						rows: 3,
						maxLength: 400,
						value: e.quote?.text ?? "",
						disabled: a,
						onChange: (t) => s({ quote: {
							text: t.target.value,
							by: e.quote?.by ?? ""
						} }),
						"data-testid": `${o}-quote-text`
					})
				}), /* @__PURE__ */ F(y, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ F(x, {
						...t,
						value: e.quote?.by ?? "",
						disabled: a,
						onChange: (t) => s({ quote: {
							text: e.quote?.text ?? "",
							by: t.target.value
						} }),
						"data-testid": `${o}-quote-by`
					})
				})]
			}),
			e.layout === "image" && /* @__PURE__ */ F(y, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ F(x, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => s({ image: { alt: e.target.value } }),
					"data-testid": `${o}-image-alt`
				})
			}),
			/* @__PURE__ */ F(y, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ F(S, {
					...t,
					rows: 3,
					maxLength: ge,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => s({ notes: e.target.value || void 0 }),
					"data-testid": `${o}-notes`
				})
			}),
			/* @__PURE__ */ F(Ne, {
				sources: e.sources,
				onChange: (e) => s({ sources: e }),
				options: n,
				onSearchSources: i,
				readOnly: a,
				testIdPrefix: o
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function Re(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function ze() {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Be() {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ve() {
	return /* @__PURE__ */ I("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ F("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ F("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function He() {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Ue({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, readOnly: s = !1, onSelect: c, onMove: l, onDuplicate: u, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: y }) {
	let b = Re(i);
	return /* @__PURE__ */ I("li", {
		ref: _,
		"data-testid": `${y}-row-${e.id}`,
		"data-slide-id": e.id,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!s && (g ?? /* @__PURE__ */ F("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ I("button", {
				type: "button",
				onClick: () => c(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${y}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ F("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ F("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: b ? /* @__PURE__ */ F("img", {
							src: b,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${y}-thumb-${e.id}`
						}) : /* @__PURE__ */ F(m, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ I("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ F(m, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ F(m, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							o && /* @__PURE__ */ F(m, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${y}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!s && /* @__PURE__ */ I("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ I("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ F(d, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ F(ze, {}),
						disabled: t === 0,
						onClick: () => l(t, t - 1),
						"data-testid": `${y}-up-${e.id}`
					}), /* @__PURE__ */ F(d, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ F(Be, {}),
						disabled: t >= n - 1,
						onClick: () => l(t, t + 1),
						"data-testid": `${y}-down-${e.id}`
					})]
				}), /* @__PURE__ */ I("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ F(d, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ F(Ve, {}),
						disabled: !p,
						onClick: () => u(e.id),
						"data-testid": `${y}-duplicate-${e.id}`
					}), /* @__PURE__ */ F(d, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ F(He, {}),
						disabled: !h,
						onClick: () => f(e.id),
						"data-testid": `${y}-delete-${e.id}`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideList.tsx
function We({ items: e, selectedId: t, readOnly: n = !1, onSelect: r, onMove: i, onDuplicate: a, onDelete: o, canDuplicate: s, testIdPrefix: c }) {
	return /* @__PURE__ */ F("ol", {
		className: "m-0 flex list-none flex-col gap-1 p-0",
		"data-testid": `${c}-list`,
		children: e.map((l, u) => /* @__PURE__ */ F(Ue, {
			slide: l.slide,
			index: u,
			total: e.length,
			thumbnailSvg: l.thumbnailSvg,
			selected: l.slide.id === t,
			uncited: l.uncited,
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
var Ge = M(() => import("./SortableSlideList-CJsw81G2.js"));
function Ke({ back: e }) {
	return /* @__PURE__ */ F("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function qe({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: h, onDownload: g, onOpenPresentationView: _, readOnly: v = !1, className: S, "data-testid": w = "presentation-editor" }) {
	let [T, O] = P(() => e.slides[0]?.id ?? ""), [A, ee] = P(!1), [te, j] = P(null), [M, ie] = P([]);
	re(() => {
		typeof n == "object" && "slides" in n && ie(n.slides);
	}, [n]);
	let se = oe(a);
	se.current = a, re(() => {
		se.current(e);
	}, [e]);
	let L = e.slides, ce = ae(() => new Set(Ce(e)), [e]), R = Math.max(L.findIndex((e) => e.id === T), 0), z = L[R], le = ae(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : M;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, M]), ue = L.map((e) => ({
		slide: e,
		thumbnailSvg: le.get(e.id),
		uncited: ce.has(e.id)
	})), B = N((e) => {
		O(e);
	}, []), V = N((n, r) => {
		t($(e, n, r));
	}, [t, e]), H = N(() => {
		let n = Oe(e, R);
		n !== e && (t(n), O(n.slides[R + 1].id));
	}, [
		t,
		e,
		R
	]), U = N((n) => {
		let r = ke(e, n);
		if (r === e) return;
		let i = r.slides.findIndex((e) => e.id === n);
		t(r), O(r.slides[i + 1].id);
	}, [t, e]), de = N((n) => {
		let r = e.slides.findIndex((e) => e.id === n), i = Ae(e, n);
		i !== e && (t(i), O(i.slides[Math.min(r, i.slides.length - 1)].id));
	}, [t, e]), G = ce.size, q = !v && L.length > 0 && G === 0 && !A, J = N(() => {
		q && (ee(!0), j(null), Promise.resolve(o(e)).catch((e) => {
			j(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ee(!1)));
	}, [
		q,
		o,
		e
	]), Y = N((e) => {
		let t = L[R + e];
		t && O(t.id);
	}, [L, R]);
	if (re(() => {
		let e = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
				e.preventDefault(), J();
				return;
			}
			let t = W(e);
			if (!t) return;
			e.preventDefault();
			let n = fe(t, R + 1, L.length);
			n !== R + 1 && Y(n - (R + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		J,
		Y,
		R,
		L.length
	]), v) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? L.map((e, t) => {
				let n = Re(le.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ F("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ F(K, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: R + 1,
			onSlideChange: (e) => {
				let t = L[e - 1];
				t && O(t.id);
			},
			...g ? { onDownload: g } : {},
			className: S,
			"data-testid": `${w}-readonly`
		});
	}
	let pe = (() => {
		if (n === "loading" && le.size === 0) return /* @__PURE__ */ F(p, {
			label: "Rendering the deck…",
			testId: `${w}-preview-loading`
		});
		if (typeof n == "object" && "error" in n) return /* @__PURE__ */ F(f, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${w}-preview-error`
		});
		let t = z ? Re(le.get(z.id)) : void 0;
		return t ? /* @__PURE__ */ F("img", {
			src: t,
			alt: z.title || `Slide ${R + 1}`,
			className: "max-h-full max-w-full object-contain",
			"data-testid": `${w}-stage-image`
		}) : /* @__PURE__ */ F(m, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${w}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), me = s.map((e) => ({
		id: e.id,
		label: e.label
	}));
	return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": w,
		onKeyDown: (e) => {
			e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
		},
		children: [
			/* @__PURE__ */ I("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ I("div", {
					className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]",
					children: [
						/* @__PURE__ */ F(y, {
							label: "Deck title",
							required: !0,
							children: (n) => /* @__PURE__ */ F(x, {
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
						/* @__PURE__ */ F(y, {
							label: "Subtitle",
							children: (n) => /* @__PURE__ */ F(x, {
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
						/* @__PURE__ */ F(y, {
							label: "Theme",
							children: (n) => /* @__PURE__ */ F(k, {
								...n,
								value: e.theme ?? "product",
								options: Se.map((e) => ({
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
				}), /* @__PURE__ */ I("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						me.length > 0 && /* @__PURE__ */ F(b, {
							items: me,
							value: c,
							onValueChange: l,
							variant: "segmented",
							size: "sm",
							"aria-label": "Revision",
							idPrefix: `${w}-revisions`
						}),
						/* @__PURE__ */ F(i, {
							variant: "primary",
							size: "sm",
							disabled: !q,
							onClick: J,
							"data-testid": `${w}-save`,
							children: A ? "Saving…" : `Save as ${je(s)}`
						}),
						g && /* @__PURE__ */ F(i, {
							variant: "secondary",
							size: "sm",
							onClick: g,
							"data-testid": `${w}-download`,
							children: "Download .pptx"
						}),
						_ && /* @__PURE__ */ F(i, {
							variant: "ghost",
							size: "sm",
							onClick: _,
							"data-testid": `${w}-open-view`,
							children: "Open in presentation view"
						})
					]
				})]
			}),
			G > 0 && /* @__PURE__ */ F(E, {
				tone: "warning",
				"data-testid": `${w}-uncited-warning`,
				children: G === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${G} slides cite no source. Every slide names at least one — Save is off until they do.`
			}),
			te && /* @__PURE__ */ F(E, {
				tone: "error",
				onDismiss: () => j(null),
				"data-testid": `${w}-save-error`,
				children: te
			}),
			/* @__PURE__ */ I("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ I("div", {
					className: "flex min-w-0 flex-col gap-2 md:w-72",
					"data-testid": `${w}-rail`,
					children: [
						/* @__PURE__ */ I("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ F(D, {
								as: "div",
								children: "Slides"
							}), /* @__PURE__ */ F(C, {
								value: L.length / 40,
								segments: 10,
								showPercent: !1,
								tone: "surface",
								note: `${L.length} / 40`,
								"data-testid": `${w}-slide-meter`
							})]
						}),
						/* @__PURE__ */ I("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ F(y, {
								label: "Layout",
								className: "min-w-0 flex-1",
								children: (n) => /* @__PURE__ */ F(k, {
									...n,
									size: "sm",
									value: z?.layout ?? "bullets",
									disabled: !z,
									options: be.map((e) => ({
										value: e,
										label: xe[e]
									})),
									onChange: (n) => {
										z && t(De(e, Ee(z, n.target.value)));
									},
									"data-testid": `${w}-layout`
								})
							}), /* @__PURE__ */ F(i, {
								variant: "secondary",
								size: "sm",
								disabled: L.length >= 40,
								onClick: H,
								"data-testid": `${w}-add-slide`,
								children: "Add slide"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ F(ne, {
								fallback: /* @__PURE__ */ F(We, {
									items: ue,
									selectedId: z?.id ?? "",
									onSelect: B,
									onMove: V,
									onDuplicate: U,
									onDelete: de,
									canDuplicate: L.length < 40,
									testIdPrefix: `${w}-slide`
								}),
								children: /* @__PURE__ */ F(Ge, {
									items: ue,
									selectedId: z?.id ?? "",
									onSelect: B,
									onMove: V,
									onDuplicate: U,
									onDelete: de,
									canDuplicate: L.length < 40,
									testIdPrefix: `${w}-slide`
								})
							})
						})
					]
				}), /* @__PURE__ */ I("div", {
					className: "flex min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ F("div", {
							className: "flex min-h-[14rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40 p-2",
							"data-testid": `${w}-stage`,
							children: pe
						}),
						/* @__PURE__ */ I("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ F(d, {
									"aria-label": "Previous slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ F(Ke, { back: !0 }),
									disabled: R <= 0,
									onClick: () => Y(-1),
									"data-testid": `${w}-previous`
								}),
								/* @__PURE__ */ F(m, {
									className: "text-[13px] text-text-secondary",
									"data-testid": `${w}-position`,
									children: `Slide ${L.length === 0 ? 0 : R + 1} of ${L.length}`
								}),
								/* @__PURE__ */ F(d, {
									"aria-label": "Next slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ F(Ke, {}),
									disabled: R >= L.length - 1,
									onClick: () => Y(1),
									"data-testid": `${w}-next`
								})
							]
						}),
						z && /* @__PURE__ */ F(Le, {
							slide: z,
							onChange: (n) => t(De(e, n)),
							sources: u,
							onSearchSources: h,
							testIdPrefix: `${w}-slide`
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { De as A, we as C, je as D, $ as E, U as F, V as I, B as L, Ee as M, K as N, Q as O, H as P, Oe as S, Te as T, me as _, Le as a, be as b, J as c, X as d, he as f, ye as g, q as h, Re as i, Ce as j, Ae as k, Y as l, ve as m, We as n, Ne as o, ge as p, Ue as r, Se as s, qe as t, _e as u, pe as v, ke as w, xe as x, Z as y };
