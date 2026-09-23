import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-BDlo8PJg.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { c as h } from "./DropdownMenu-BXhLlQ0B.js";
import { n as g, s as _ } from "./Text-Bu-inXL-.js";
import { t as v } from "./Chip-DYqbAD3L.js";
import { t as y } from "./Modal-D2qxMX2_.js";
import { t as b } from "./EmptyState-DQYx5Oyy.js";
import { i as x, n as S, r as C, t as w } from "./SearchInput-DXbGHmns.js";
import { t as T } from "./FormField-E8Z0ppOp.js";
import { n as ee } from "./Tabs-BGZyr2nH.js";
import { t as E } from "./Input-DLknWXri.js";
import { t as D } from "./Textarea-Dz4doxTv.js";
import { t as te } from "./DotMeter-BDVkadI8.js";
import { t as O } from "./InlineAlert-CRnIKeAF.js";
import { t as k } from "./SectionLabel-bcrhNYOr.js";
import { t as A } from "./StatusPill-Db42eiME.js";
import { t as ne } from "./Select-CD8ixtYi.js";
import { G as re, U as ie } from "./renderers-5O9bh08s.js";
import { t as ae } from "./ComposerReferences-nGKcicNt.js";
import { Component as j, Suspense as oe, lazy as M, useCallback as N, useEffect as P, useId as F, useMemo as se, useRef as I, useState as L } from "react";
import { Fragment as ce, jsx as R, jsxs as z } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var B = /* @__PURE__ */ new Set(["diagram", "presentation"]), le = [
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
function V({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = L([]), [d, f] = L(!1), [p, m] = L(null), [h, g] = L(null), [b, x] = L(""), [S, C] = L(""), [w, T] = L(!1), [ee, te] = L(""), [O, k] = L("page"), [A, ae] = L("blank"), [j, oe] = L(""), [M, N] = L(""), [V, H] = L([]), me = I(null), he = I(null), U = F(), ge = `${U}-blank-label`, _e = `${U}-type-label`, ve = `${U}-cookbook-label`, ye = `${U}-title`, be = `${U}-description`, W = `${U}-deck-from`, xe = `${U}-deck-source`;
	P(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), x(""), C(""), T(!1), te(""), k("page"), ae("blank"), oe(""), N(""), H([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => me.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let G = se(() => le.filter((e) => de(e, b)), [b]), K = se(() => l.filter((e) => fe(e, b)), [l, b]), q = se(() => ie.filter((e) => re(e, b)), [b]);
	if (P(() => {
		if (!e || O !== "presentation") return;
		if (A === "blank") {
			H([]);
			return;
		}
		let t = M.trim().toLowerCase();
		if (A === "transcript") {
			let e = c ?? [];
			H(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			H([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(M.trim())).then((e) => {
			n || H(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		A,
		M,
		c,
		s
	]), !e) return null;
	let J = l.find((e) => e.id === p), Y = h ? ie.find((e) => e.id === h) : void 0, Se = O === "sections", Ce = !!Y || !!J, we = l.length === 0 && !d && !Y, Te = G.length === 0 && K.length === 0 && q.length === 0, Ee = Y ? {
		kind: "cookbook",
		cookbook: Y
	} : J && !B.has(O) ? {
		kind: "type",
		type: J
	} : {
		kind: "blank",
		shape: O
	}, X = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), B.has(O) && k("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			k(e.shape), B.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, De = (e) => e.kind === "blank" ? e.shape : B.has(O) ? "page" : O, Oe = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = ee.trim() || void 0;
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
	}, ke = O === "presentation" && A !== "blank" && !j, Z = !!S.trim() && (!Se || Ce) && !ke, Ae = () => {
		Z && Oe(Ee, S, De(Ee));
	};
	return /* @__PURE__ */ R(y, {
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
		children: /* @__PURE__ */ z("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Z && Ae();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ R("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ z("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ R(E, {
						ref: me,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => x(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = q.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: q[0]
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
								he.current?.focus();
								return;
							}
							Oe(t, n, De(t));
						}
					}), /* @__PURE__ */ R("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ z("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						G.length > 0 && /* @__PURE__ */ z("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ R("div", {
								id: ge,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ R("div", {
								role: "group",
								"aria-labelledby": ge,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: G.map((e) => /* @__PURE__ */ z(_, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => X({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ z("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ R("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ R("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ R(v, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ R("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ z("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ R("label", {
									htmlFor: W,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ R(ne, {
									id: W,
									value: A,
									options: ue.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ae(e.target.value), oe(""), N("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ R("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ z("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ R(E, {
										type: "search",
										value: M,
										onChange: (e) => N(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), V.length === 0 ? /* @__PURE__ */ R("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ z(ce, { children: [/* @__PURE__ */ z("label", {
										htmlFor: xe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ R("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ R(ne, {
										id: xe,
										required: !0,
										"aria-required": "true",
										value: j,
										placeholder: "Choose one…",
										options: V.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => oe(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						q.length > 0 && /* @__PURE__ */ z("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ z("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ R("div", {
									id: ve,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ R("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ R("div", {
								role: "group",
								"aria-labelledby": ve,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: q.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ z(_, {
										padding: "md",
										selected: t,
										onSelect: () => X({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ z("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ R("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ R("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ R("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ R("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!B.has(O) && (K.length > 0 || we || l.length === 0 && d) && /* @__PURE__ */ z("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ z("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ R("span", {
										id: _e,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Se && /* @__PURE__ */ R("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ R("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								we && /* @__PURE__ */ R("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Se ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								K.length > 0 && /* @__PURE__ */ R("div", {
									role: "group",
									"aria-labelledby": _e,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: K.map((e) => {
										let t = !Y && p === e.id;
										return /* @__PURE__ */ z("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => X({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ R("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ z("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ R("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ R("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ R("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ R("span", {
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
						Te && /* @__PURE__ */ z("div", {
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
				/* @__PURE__ */ z("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ z("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ z("label", {
							htmlFor: ye,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ R("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ R(E, {
							ref: he,
							id: ye,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: Y ? `e.g. ${Y.name}` : J ? `e.g. Q2 ${J.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ z("div", { children: [/* @__PURE__ */ z("label", {
						htmlFor: be,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ R("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ R(D, {
						id: be,
						"data-testid": "new-doc-description",
						value: ee,
						onChange: (e) => te(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ z("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ R("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ R("button", {
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
var H = class extends j {
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
		return this.state.hasError ? /* @__PURE__ */ z("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ R("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ R("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ R("button", {
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
function me({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": g = "disclosure" }) {
	let _ = n !== void 0, [v, y] = L(i), b = _ ? n : v, x = I(null);
	P(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ z("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": g,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ z("summary", {
			"data-testid": `${g}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ R(h, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ R("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ R("div", {
			"data-testid": `${g}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function he({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = F(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ z("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ R(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ R(v, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ R("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ z(ce, { children: [/* @__PURE__ */ R("span", { className: "flex-1" }), /* @__PURE__ */ R("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ R(b, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ R("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ R("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function U({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ R("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var ge = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function _e({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", className: u, "data-testid": d = "inline-editable-text" }) {
	let [f, p] = L(!1), [m, h] = L(e), g = I(null);
	P(() => {
		f || h(e);
	}, [e, f]), P(() => {
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
	return f ? /* @__PURE__ */ R(E, {
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
	}) : /* @__PURE__ */ R("button", {
		type: "button",
		disabled: s,
		onClick: () => p(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": d,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", ge[l], !e && "italic text-text-tertiary", u),
		children: e || i
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function ve(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function ye(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || ve(e.target)) return null;
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
function be(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function W({ back: e }) {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function xe({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: d, notice: f, state: p = "ready", errorMessage: h, onRetry: _, maxSlideWidth: v, className: y, "data-testid": w = "presentation-view" }) {
	let T = F();
	if (p === "loading") return /* @__PURE__ */ R(C, {
		label: "Opening the presentation…",
		testId: `${w}-loading`
	});
	if (p === "error") return /* @__PURE__ */ R(x, {
		title: "This presentation could not be opened",
		...h ? { description: h } : {},
		..._ ? {
			actionLabel: "Try again",
			onAction: _
		} : {},
		testId: `${w}-error`
	});
	let ee = t.find((e) => e.id === n) ?? t[0], E = ee?.slides ?? [];
	if (p === "empty" || !ee || E.length === 0) return /* @__PURE__ */ z("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", y),
		"data-testid": w,
		children: [/* @__PURE__ */ R(g, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ R(b, {
			title: "No slides yet",
			description: d?.status === "generating" ? `${d.label} is still being generated.` : d?.status === "failed" ? d.message ?? `${d.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${w}-empty`
		})]
	});
	let D = E[Math.min(Math.max(o, 1), E.length) - 1];
	return /* @__PURE__ */ z("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", y),
		"data-testid": w,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${D.index} of ${E.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = ye(e);
			if (!t) return;
			e.preventDefault();
			let n = be(t, D.index, E.length);
			n !== D.index && s(n);
		},
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ R(g, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${w}-title`,
					children: e
				}), /* @__PURE__ */ z("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ R(S, {
							"aria-label": "Revision",
							size: "sm",
							value: ee.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${w}-revisions`
						}),
						d && /* @__PURE__ */ R(A, {
							state: d.status === "failed" ? "error" : "pending",
							label: `${d.label} ${d.status}`,
							"data-testid": `${w}-pending`
						}),
						c && /* @__PURE__ */ R(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${w}-download`,
							children: l
						})
					]
				})]
			}),
			/* @__PURE__ */ z("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ z("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ R("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ R("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: v === void 0 ? void 0 : { maxWidth: v },
							"data-testid": `${w}-stage`,
							children: D.preview ?? /* @__PURE__ */ R(g, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${w}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ z("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ R(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ R(W, { back: !0 }),
								disabled: D.index <= 1,
								onClick: () => s(D.index - 1),
								"data-testid": `${w}-previous`
							}),
							/* @__PURE__ */ R(g, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${w}-position`,
								children: `Slide ${D.index} of ${E.length}`
							}),
							/* @__PURE__ */ R(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ R(W, {}),
								disabled: D.index >= E.length,
								onClick: () => s(D.index + 1),
								"data-testid": `${w}-next`
							}),
							u && D.preview && /* @__PURE__ */ R(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(D.id),
								"data-testid": `${w}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ z("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": T,
					"data-testid": `${w}-outline`,
					children: [/* @__PURE__ */ R(k, {
						as: "div",
						className: "mb-1",
						"data-testid": `${w}-outline-label`,
						children: /* @__PURE__ */ R("span", {
							id: T,
							children: "Slides"
						})
					}), /* @__PURE__ */ R("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: E.map((e) => /* @__PURE__ */ R("li", { children: /* @__PURE__ */ z("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === D.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === D.id && "bg-surface-hover font-medium"),
							"data-testid": `${w}-outline-row`,
							children: [/* @__PURE__ */ R("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ R("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			f && /* @__PURE__ */ R(g, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${w}-notice`,
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var G = 40, K = 8, q = 200, J = 120, Y = 200, Se = 60, Ce = 2e3, we = 24, Te = 6, Ee = 400, X = 10, De = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Oe = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], ke = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Z = [
	"product",
	"engineering",
	"plain"
];
function Ae(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function je(e) {
	return e.slides.length > 0 && Ae(e).length === 0;
}
function Q(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Me(e, t = "bullets") {
	return Ne({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ne(e, t) {
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
function Pe(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Fe(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Ie(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Me(Q(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Le(e, t) {
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
function Re(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function ze(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var Be = {
	document: "📄",
	transcript: "🎙️"
};
function Ve({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = L(""), [d, f] = L(!1), [p, m] = L(n), h = F(), _ = I(0);
	P(() => {
		let e = l.trim();
		if (!a) {
			let t = e.toLowerCase();
			m(t ? n.filter((e) => e.title.toLowerCase().includes(t)) : n);
			return;
		}
		let t = ++_.current, r = !1;
		return Promise.resolve(a(e)).then((e) => {
			r || t !== _.current || m(e);
		}).catch(() => {
			!r && t === _.current && m(n);
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
	}, x = /* @__PURE__ */ R(ae, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ R(w, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ R(g, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ R(g, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ R("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ R("li", { children: /* @__PURE__ */ z(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ R("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: Be[t.kind ?? "document"]
						}),
						/* @__PURE__ */ R("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ R("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ z("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ R(k, {
					as: "div",
					children: /* @__PURE__ */ R("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ R(g, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ R("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ R(i, {
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
	}) : /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ R(k, {
				as: "div",
				children: /* @__PURE__ */ R("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ R(O, {
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
function $() {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
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
	return /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ R(k, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ R("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ z("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ R(g, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ R(E, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ R(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ R($, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ R(i, {
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
	return /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ z("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ R(T, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ R(ne, {
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
			}), !n && /* @__PURE__ */ z(ce, { children: [/* @__PURE__ */ R(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ R(i, {
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
		}), /* @__PURE__ */ R("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ z(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ R(f, { children: /* @__PURE__ */ z(l, { children: [
					/* @__PURE__ */ R(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ R(d, { children: /* @__PURE__ */ R(E, {
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
					!n && /* @__PURE__ */ R(d, {})
				] }) }), /* @__PURE__ */ R(u, { children: e.labels.map((i, o) => /* @__PURE__ */ z(l, { children: [
					/* @__PURE__ */ R(c, { children: /* @__PURE__ */ R(E, {
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
					e.series.map((e, t) => /* @__PURE__ */ R(c, { children: /* @__PURE__ */ R(E, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ R(c, { children: /* @__PURE__ */ R(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ R($, {}),
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
	return /* @__PURE__ */ z("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${s}-form`,
		children: [
			/* @__PURE__ */ z("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ R(T, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ R(E, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => c({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${s}-eyebrow`
					})
				}), /* @__PURE__ */ R(T, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ R(E, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => c({ title: e.target.value }),
						"data-testid": `${s}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ R(He, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => c({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${s}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ z("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ R(He, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => c({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${s}-column-0`
				}), /* @__PURE__ */ R(He, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => c({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${s}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ R(Ue, {
				chart: e.chart,
				onChange: (e) => c({ chart: e }),
				readOnly: a,
				testIdPrefix: `${s}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ z("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ R(T, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ R(D, {
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
				}), /* @__PURE__ */ R(T, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ R(E, {
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
			e.layout === "image" && /* @__PURE__ */ R(T, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ R(E, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => c({ image: { alt: e.target.value } }),
					"data-testid": `${s}-image-alt`
				})
			}),
			/* @__PURE__ */ R(T, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ R(D, {
					...t,
					rows: 3,
					maxLength: Ce,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => c({ notes: e.target.value || void 0 }),
					"data-testid": `${s}-notes`
				})
			}),
			o && /* @__PURE__ */ R(Ve, {
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
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function qe() {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Je() {
	return /* @__PURE__ */ z("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ R("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ R("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Ye() {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Xe({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = Ge(i);
	return /* @__PURE__ */ z("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (_ ?? /* @__PURE__ */ R("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ z("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ R("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ R("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ R("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ R(g, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ z("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ R(g, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ R(g, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ R(g, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ R(g, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ z("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ z("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ R(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ R(Ke, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ R(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ R(qe, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ z("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ R(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ R(Je, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ R(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ R(Ye, {}),
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
	return /* @__PURE__ */ R("ol", {
		className: "m-0 flex list-none flex-col gap-1 p-0",
		"data-testid": `${c}-list`,
		children: e.map((l, u) => /* @__PURE__ */ R(Xe, {
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
var Qe = M(() => import("./SortableSlideList-R63kRCgW.js"));
function $e({ testIdPrefix: e }) {
	return /* @__PURE__ */ R(O, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var et = M(() => import("./PresentationAgentComposer-CpVCKFqO.js").catch(() => ({ default: $e })));
function tt({ back: e }) {
	return /* @__PURE__ */ R("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function nt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: _, instructHints: v, onUndoInstruct: y, className: S, "data-testid": w = "presentation-editor" }) {
	let [D, A] = L(() => e.slides[0]?.id ?? ""), [re, ie] = L(!1), [ae, j] = L(null), M = !!_, [F, B] = L("slide"), [le, ue] = L(!1), [de, fe] = L(null), [pe, V] = L(null), [H, he] = L(() => /* @__PURE__ */ new Set()), [U, ge] = L([]);
	P(() => {
		typeof n == "object" && "slides" in n && ge(n.slides);
	}, [n]);
	let ve = I(a);
	ve.current = a;
	let W = e.slides, G = se(() => new Set(Ae(e)), [e]), K = G.size === 0;
	P(() => {
		K && ve.current(e);
	}, [e, K]);
	let q = Math.max(W.findIndex((e) => e.id === D), 0), J = W[q], Y = se(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : U;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, U]), Se = W.map((e) => ({
		slide: e,
		thumbnailSvg: Y.get(e.id),
		uncited: G.has(e.id),
		changed: H.has(e.id)
	})), Ce = N((e) => {
		A(e);
	}, []), we = N((n, r) => {
		t(Fe(e, n, r));
	}, [t, e]), Te = N(() => {
		let n = Ie(e, q);
		n !== e && (t(n), A(n.slides[q + 1].id));
	}, [
		t,
		e,
		q
	]), Ee = N((n) => {
		let r = Le(e, n);
		if (r === e) return;
		let i = r.slides.findIndex((e) => e.id === n);
		t(r), A(r.slides[i + 1].id);
	}, [t, e]), X = N((n) => {
		let r = e.slides.findIndex((e) => e.id === n), i = Re(e, n);
		i !== e && (t(i), A(i.slides[Math.min(r, i.slides.length - 1)].id));
	}, [t, e]), De = N(async (e) => {
		if (!_ || le) return !1;
		let t = J?.id;
		ue(!0), V(null);
		try {
			let n = await _(e, F === "slide" && t ? {
				slideId: t,
				scope: F
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return he(new Set(r)), fe(n?.summary?.trim() || "Done."), F === "deck" && r.length && (!t || !r.includes(t)) && A(r[0]), !0;
		} catch (e) {
			return V(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			ue(!1);
		}
	}, [
		_,
		le,
		F,
		J?.id
	]), je = N(() => {
		y?.(), fe(null), he(/* @__PURE__ */ new Set());
	}, [y]), Q = G.size, Me = !h && W.length > 0 && Q === 0 && !re, Be = N(() => {
		Me && (ie(!0), j(null), Promise.resolve(o(e)).catch((e) => {
			j(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ie(!1)));
	}, [
		Me,
		o,
		e
	]), $ = N((e) => {
		let t = W[q + e];
		t && A(t.id);
	}, [W, q]);
	if (P(() => {
		let e = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
				e.preventDefault(), Be();
				return;
			}
			let t = ye(e);
			if (!t) return;
			e.preventDefault();
			let n = be(t, q + 1, W.length);
			n !== q + 1 && $(n - (q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		Be,
		$,
		q,
		W.length
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? W.map((e, t) => {
				let n = Ge(Y.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ R("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ R(xe, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: q + 1,
			onSlideChange: (e) => {
				let t = W[e - 1];
				t && A(t.id);
			},
			...f ? { onDownload: f } : {},
			className: S,
			"data-testid": `${w}-readonly`
		});
	}
	let He = (() => {
		if (J && G.has(J.id)) return /* @__PURE__ */ R(b, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${w}-preview-needs-source`
		});
		let t = J ? Ge(Y.get(J.id)) : void 0;
		if (!K && !t) return /* @__PURE__ */ R(b, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${w}-preview-needs-source`
		});
		if (n === "loading" && Y.size === 0) return /* @__PURE__ */ R(C, {
			label: "Rendering the deck…",
			testId: `${w}-preview-loading`
		});
		if (K && typeof n == "object" && "error" in n) return /* @__PURE__ */ R(x, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${w}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ R("img", {
			src: r,
			alt: J.title || `Slide ${q + 1}`,
			className: "max-h-full max-w-full object-contain",
			"data-testid": `${w}-stage-image`
		}) : /* @__PURE__ */ R(g, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${w}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ue = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ke = /* @__PURE__ */ z("div", {
		className: "flex flex-wrap items-center gap-2",
		children: [
			Ue.length > 0 && /* @__PURE__ */ R(ee, {
				items: Ue,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${w}-revisions`
			}),
			/* @__PURE__ */ R(i, {
				variant: "primary",
				size: "sm",
				disabled: !Me,
				onClick: Be,
				"data-testid": `${w}-save`,
				children: re ? "Saving…" : `Save as ${ze(s)}`
			}),
			f && /* @__PURE__ */ R(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${w}-download`,
				children: "Download .pptx"
			}),
			p && /* @__PURE__ */ R(i, {
				variant: "ghost",
				size: "sm",
				onClick: p,
				"data-testid": `${w}-open-view`,
				children: "Open in presentation view"
			})
		]
	});
	return /* @__PURE__ */ z("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": w,
		onKeyDown: (e) => {
			e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
		},
		children: [
			M ? /* @__PURE__ */ z("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				"data-testid": `${w}-deck-line`,
				children: [/* @__PURE__ */ z("div", {
					className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
					children: [
						/* @__PURE__ */ R(_e, {
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
						/* @__PURE__ */ R(_e, {
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
						/* @__PURE__ */ R(ne, {
							size: "sm",
							variant: "pill",
							"aria-label": "Theme",
							value: e.theme ?? "product",
							options: Z.map((e) => ({
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
			}) : /* @__PURE__ */ z("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ z("div", {
					className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]",
					children: [
						/* @__PURE__ */ R(T, {
							label: "Deck title",
							required: !0,
							children: (n) => /* @__PURE__ */ R(E, {
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
						/* @__PURE__ */ R(T, {
							label: "Subtitle",
							children: (n) => /* @__PURE__ */ R(E, {
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
						/* @__PURE__ */ R(T, {
							label: "Theme",
							children: (n) => /* @__PURE__ */ R(ne, {
								...n,
								value: e.theme ?? "product",
								options: Z.map((e) => ({
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
			Q > 0 && /* @__PURE__ */ R(O, {
				tone: "warning",
				"data-testid": `${w}-uncited-warning`,
				children: Q === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${Q} slides cite no source. Every slide names at least one — Save is off until they do.`
			}),
			ae && /* @__PURE__ */ R(O, {
				tone: "error",
				onDismiss: () => j(null),
				"data-testid": `${w}-save-error`,
				children: ae
			}),
			/* @__PURE__ */ z("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ z("div", {
					className: "flex min-w-0 flex-col gap-2 md:w-72",
					"data-testid": `${w}-rail`,
					children: [
						/* @__PURE__ */ z("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ R(k, {
								as: "div",
								children: "Slides"
							}), /* @__PURE__ */ R(te, {
								value: W.length / 40,
								segments: 10,
								showPercent: !1,
								tone: "surface",
								note: `${W.length} / 40`,
								"data-testid": `${w}-slide-meter`
							})]
						}),
						/* @__PURE__ */ z("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ R(T, {
								label: "Layout",
								className: "min-w-0 flex-1",
								children: (n) => /* @__PURE__ */ R(ne, {
									...n,
									size: "sm",
									value: J?.layout ?? "bullets",
									disabled: !J,
									options: Oe.map((e) => ({
										value: e,
										label: ke[e]
									})),
									onChange: (n) => {
										J && t(Pe(e, Ne(J, n.target.value)));
									},
									"data-testid": `${w}-layout`
								})
							}), /* @__PURE__ */ R(i, {
								variant: "secondary",
								size: "sm",
								disabled: W.length >= 40,
								onClick: Te,
								"data-testid": `${w}-add-slide`,
								children: "Add slide"
							})]
						}),
						/* @__PURE__ */ R("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ R(oe, {
								fallback: /* @__PURE__ */ R(Ze, {
									items: Se,
									selectedId: J?.id ?? "",
									onSelect: Ce,
									onMove: we,
									onDuplicate: Ee,
									onDelete: X,
									canDuplicate: W.length < 40,
									testIdPrefix: `${w}-slide`
								}),
								children: /* @__PURE__ */ R(Qe, {
									items: Se,
									selectedId: J?.id ?? "",
									onSelect: Ce,
									onMove: we,
									onDuplicate: Ee,
									onDelete: X,
									canDuplicate: W.length < 40,
									testIdPrefix: `${w}-slide`
								})
							})
						})
					]
				}), /* @__PURE__ */ z("div", {
					className: "flex min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ R("div", {
							className: "flex min-h-[14rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40 p-2",
							"data-testid": `${w}-stage`,
							children: He
						}),
						/* @__PURE__ */ z("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ R(m, {
									"aria-label": "Previous slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ R(tt, { back: !0 }),
									disabled: q <= 0,
									onClick: () => $(-1),
									"data-testid": `${w}-previous`
								}),
								/* @__PURE__ */ R(g, {
									className: "text-[13px] text-text-secondary",
									"data-testid": `${w}-position`,
									children: `Slide ${W.length === 0 ? 0 : q + 1} of ${W.length}`
								}),
								/* @__PURE__ */ R(m, {
									"aria-label": "Next slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ R(tt, {}),
									disabled: q >= W.length - 1,
									onClick: () => $(1),
									"data-testid": `${w}-next`
								})
							]
						}),
						M && J && /* @__PURE__ */ z(ce, { children: [
							/* @__PURE__ */ R(oe, {
								fallback: /* @__PURE__ */ R(g, {
									className: "text-[12px] text-text-tertiary",
									"data-testid": `${w}-agent-loading`,
									children: "Loading the agent…"
								}),
								children: /* @__PURE__ */ R(et, {
									scope: F,
									onScopeChange: B,
									slideLabel: `slide ${q + 1}`,
									busy: le,
									onSubmit: De,
									...v?.length ? { suggestions: v } : {},
									testIdPrefix: w
								})
							}),
							pe && /* @__PURE__ */ R(O, {
								tone: "error",
								onDismiss: () => V(null),
								"data-testid": `${w}-agent-error`,
								children: pe
							}),
							de && !pe && /* @__PURE__ */ z("div", {
								className: "flex min-w-0 flex-wrap items-center gap-2",
								role: "status",
								"data-testid": `${w}-agent-summary`,
								children: [
									/* @__PURE__ */ R(g, {
										as: "span",
										className: "min-w-0 flex-1 truncate text-[12px] text-success-fg",
										title: de,
										children: `✓ ${de}`
									}),
									H.size > 0 && /* @__PURE__ */ R(g, {
										as: "span",
										className: "text-[11px] text-text-tertiary",
										children: H.size === 1 ? "1 slide marked in the rail" : `${H.size} slides marked in the rail`
									}),
									y && /* @__PURE__ */ R(i, {
										variant: "ghost",
										size: "sm",
										onClick: je,
										"data-testid": `${w}-agent-undo`,
										children: "Undo"
									})
								]
							}),
							/* @__PURE__ */ R(Ve, {
								compact: !0,
								sources: J.sources,
								onChange: (n) => t(Pe(e, {
									...J,
									sources: n
								})),
								options: u,
								onSearchSources: d,
								testIdPrefix: `${w}-slide`
							}),
							/* @__PURE__ */ R(me, {
								summary: "Edit slide details",
								density: "compact",
								"data-testid": `${w}-details`,
								children: /* @__PURE__ */ R(We, {
									slide: J,
									onChange: (n) => t(Pe(e, n)),
									sources: u,
									onSearchSources: d,
									showSources: !1,
									testIdPrefix: `${w}-slide`
								})
							})
						] }),
						!M && J && /* @__PURE__ */ R(We, {
							slide: J,
							onChange: (n) => t(Pe(e, n)),
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
export { Pe as A, je as C, ze as D, Fe as E, he as F, U as I, me as L, Ne as M, xe as N, Q as O, _e as P, H as R, Ie as S, Me as T, Y as _, We as a, Oe as b, K as c, Te as d, Se as f, X as g, G as h, Ge as i, Ae as j, Re as k, q as l, Ee as m, Ze as n, Ve as o, Ce as p, Xe as r, Z as s, nt as t, we as u, J as v, Le as w, ke as x, De as y, V as z };
