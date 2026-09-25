import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-CHdlnODN.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-DDeXW3mZ.js";
import { R as h, u as g } from "./Icons-CI4hzRkO.js";
import { a as _, n as v, s as y } from "./Text-DLYUIQhS.js";
import { t as b } from "./Chip-zdVBwV9j.js";
import { t as x } from "./Modal-DMFNRUDx.js";
import { t as S } from "./EmptyState-DFWbBBcY.js";
import { n as C, t as w } from "./SegmentedControl-X19S_gNQ.js";
import { n as T, t as ee } from "./SearchInput-TPCQujCD.js";
import { t as E } from "./FormField-E8Z0ppOp.js";
import { n as D } from "./Tabs-DjNsAODd.js";
import { t as O } from "./Input-DLknWXri.js";
import { t as k } from "./Textarea-Dz4doxTv.js";
import { t as A } from "./DotMeter-BDVkadI8.js";
import { n as j } from "./RovingToolbar-CmQag9q6.js";
import { t as M } from "./InlineAlert-CRnIKeAF.js";
import { t as N } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as P } from "./SectionLabel-bcrhNYOr.js";
import { t as F } from "./DropdownMenu-R850IyDw.js";
import { t as te } from "./StatusPill-C-aN2Pzz.js";
import { t as I } from "./Select-D2EQq7Wi.js";
import { G as ne, U as re } from "./renderers-CLgJ6UYB.js";
import { t as ie } from "./useMeasuredWidth-BPrwD0q5.js";
import { r as ae } from "./composerCommands-C15XwS5R.js";
import { i as oe, t as se } from "./FloatingComposerDock-DMUQCjea.js";
import { Component as L, Suspense as ce, lazy as le, useCallback as R, useEffect as z, useId as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var ue = /* @__PURE__ */ new Set(["diagram", "presentation"]), de = [
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
], fe = [
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
function pe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function me(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function he(t) {
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
	let [l, u] = U([]), [d, f] = U(!1), [p, m] = U(null), [h, g] = U(null), [_, v] = U(""), [S, C] = U(""), [w, T] = U(!1), [ee, E] = U(""), [D, A] = U("page"), [j, M] = U("blank"), [N, P] = U(""), [F, te] = U(""), [ie, ae] = U([]), oe = H(null), se = H(null), L = B(), ce = `${L}-blank-label`, le = `${L}-type-label`, R = `${L}-cookbook-label`, ge = `${L}-title`, _e = `${L}-description`, ve = `${L}-deck-from`, ye = `${L}-deck-source`;
	z(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), v(""), C(""), T(!1), E(""), A("page"), M("blank"), P(""), te(""), ae([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => oe.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let q = V(() => de.filter((e) => pe(e, _)), [_]), J = V(() => l.filter((e) => me(e, _)), [l, _]), be = V(() => re.filter((e) => ne(e, _)), [_]);
	if (z(() => {
		if (!e || D !== "presentation") return;
		if (j === "blank") {
			ae([]);
			return;
		}
		let t = F.trim().toLowerCase();
		if (j === "transcript") {
			let e = c ?? [];
			ae(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			ae([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(F.trim())).then((e) => {
			n || ae(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		D,
		j,
		F,
		c,
		s
	]), !e) return null;
	let Y = l.find((e) => e.id === p), xe = h ? re.find((e) => e.id === h) : void 0, Se = D === "sections", Ce = !!xe || !!Y, we = l.length === 0 && !d && !xe, Te = q.length === 0 && J.length === 0 && be.length === 0, Ee = xe ? {
		kind: "cookbook",
		cookbook: xe
	} : Y && !ue.has(D) ? {
		kind: "type",
		type: Y
	} : {
		kind: "blank",
		shape: D
	}, De = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), ue.has(D) && A("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			A(e.shape), ue.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : ue.has(D) ? "page" : D, ke = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = ee.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: j,
				...j !== "blank" && N ? { sourceId: N } : {},
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
			let t = he(e.cookbook);
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
	}, Ae = D === "presentation" && j !== "blank" && !N, je = !!S.trim() && (!Se || Ce) && !Ae, Me = () => {
		je && ke(Ee, S, Oe(Ee));
	};
	return /* @__PURE__ */ G(x, {
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
		children: /* @__PURE__ */ K("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && je && Me();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ G("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ K("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ G(O, {
						ref: oe,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: _,
						onChange: (e) => v(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = be.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: be[0]
							} : q.length > 0 ? {
								kind: "blank",
								shape: q[0].id
							} : J.length > 0 ? {
								kind: "type",
								type: J[0]
							} : void 0;
							if (!t) return;
							De(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								se.current?.focus();
								return;
							}
							ke(t, n, Oe(t));
						}
					}), /* @__PURE__ */ G("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ K("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						q.length > 0 && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ G("div", {
								id: ce,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ G("div", {
								role: "group",
								"aria-labelledby": ce,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: q.map((e) => /* @__PURE__ */ K(y, {
									padding: "md",
									selected: D === e.id,
									onSelect: () => De({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ K("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ G("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ G("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ G(b, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ G("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						D === "presentation" && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ G("label", {
									htmlFor: ve,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ G(I, {
									id: ve,
									value: j,
									options: fe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										M(e.target.value), P(""), te("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ G("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: j === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								j !== "blank" && /* @__PURE__ */ K("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ G(O, {
										type: "search",
										value: F,
										onChange: (e) => te(e.target.value),
										"aria-label": j === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: j === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ie.length === 0 ? /* @__PURE__ */ G("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: j === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K("label", {
										htmlFor: ye,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											j === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ G("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ G(I, {
										id: ye,
										required: !0,
										"aria-required": "true",
										value: N,
										placeholder: "Choose one…",
										options: ie.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => P(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						be.length > 0 && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ K("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ G("div", {
									id: R,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ G("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: D === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : D === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : D === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ G("div", {
								role: "group",
								"aria-labelledby": R,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: be.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ K(y, {
										padding: "md",
										selected: t,
										onSelect: () => De({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ K("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ G("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ G("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ G("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ G("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!ue.has(D) && (J.length > 0 || we || l.length === 0 && d) && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ K("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ G("span", {
										id: le,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Se && /* @__PURE__ */ G("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ G("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								we && /* @__PURE__ */ G("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Se ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								J.length > 0 && /* @__PURE__ */ G("div", {
									role: "group",
									"aria-labelledby": le,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: J.map((e) => {
										let t = !xe && p === e.id;
										return /* @__PURE__ */ K("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => De({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ G("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ K("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ G("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ G("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ G("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: D === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ G("span", {
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
						Te && /* @__PURE__ */ K("div", {
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
				/* @__PURE__ */ K("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ K("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ K("label", {
							htmlFor: ge,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ G("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ G(O, {
							ref: se,
							id: ge,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: xe ? `e.g. ${xe.name}` : Y ? `e.g. Q2 ${Y.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ K("div", { children: [/* @__PURE__ */ K("label", {
						htmlFor: _e,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ G("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ G(k, {
						id: _e,
						"data-testid": "new-doc-description",
						value: ee,
						onChange: (e) => E(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ K("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ G("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ G("button", {
						"data-testid": "new-doc-submit",
						onClick: Me,
						disabled: !je,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", je ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var _e = class extends L {
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
		return this.state.hasError ? /* @__PURE__ */ K("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ G("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ G("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ G("button", {
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
	let _ = n !== void 0, [v, y] = U(i), b = _ ? n : v, x = H(null);
	z(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ K("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": h,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ K("summary", {
			"data-testid": `${h}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ G(g, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ G("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ G("div", {
			"data-testid": `${h}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function ye({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = B(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ K("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ G(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ G(b, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ G("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G("span", { className: "flex-1" }), /* @__PURE__ */ G("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ G(S, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ G("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ G("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function q({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ G("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var J = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function be({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = U(!1), [h, g] = U(e), _ = H(null);
	z(() => {
		p || g(e);
	}, [e, p]), z(() => {
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
	return p ? /* @__PURE__ */ G(O, {
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
	}) : /* @__PURE__ */ G("button", {
		type: "button",
		disabled: s,
		onClick: () => m(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": f,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", J[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var Y = "__older-revisions__";
function xe(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: Y,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: Y,
		label: `Older versions (${t.count})…`
	}), n;
}
function Se(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function Ce(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function we(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || Ce(e.target)) return null;
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
function Te(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Ee = 5;
function De({ back: e }) {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Oe({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: d = "Download .pptx", onOpenPreview: f, pending: p, notice: h, state: g = "ready", errorMessage: y, ownerName: b, onRetry: x, maxSlideWidth: ee, autoFocus: E = !1, className: D, "data-testid": O = "presentation-view" }) {
	let k = B(), A = H(null), j = H(!1);
	if (z(() => {
		!E || j.current || !A.current || (j.current = !0, A.current.focus({ preventScroll: !0 }));
	}), g === "loading") return /* @__PURE__ */ G(T, {
		label: "Opening the presentation…",
		testId: `${O}-loading`
	});
	if (g === "no-access") return /* @__PURE__ */ G(_, {
		resource: "this presentation",
		ownerName: b ?? null,
		testId: `${O}-no-access`
	});
	if (g === "error") return /* @__PURE__ */ G(C, {
		title: "This presentation could not be opened",
		...y ? { description: y } : {},
		...x ? {
			actionLabel: "Try again",
			onAction: x
		} : {},
		testId: `${O}-error`
	});
	let M = n.find((e) => e.id === o) ?? n[0], N = M?.slides ?? [];
	if (g === "empty" || !M || N.length === 0) return /* @__PURE__ */ K("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", D),
		"data-testid": O,
		children: [/* @__PURE__ */ K("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ G(v, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ G(v, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${O}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ G(S, {
			title: "No slides yet",
			description: p?.status === "generating" ? `${p.label} is still being generated.` : p?.status === "failed" ? p.message ?? `${p.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${O}-empty`
		})]
	});
	let F = N[Math.min(Math.max(c, 1), N.length) - 1];
	return /* @__PURE__ */ K("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", D),
		ref: A,
		"data-testid": O,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${F.index} of ${N.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = we(e);
			if (!t) return;
			e.preventDefault();
			let n = Te(t, F.index, N.length);
			n !== F.index && l(n);
		},
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ K("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ G(v, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${O}-title`,
						children: e
					}), t && /* @__PURE__ */ G(v, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${O}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ K("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ee || (a?.count ?? 0) > 0 ? /* @__PURE__ */ G(I, {
							"aria-label": "Revision",
							size: "sm",
							value: M.id,
							onChange: (e) => Se(e.target.value, s, a),
							options: xe(n, a),
							className: "w-auto",
							"data-testid": `${O}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ G(w, {
							"aria-label": "Revision",
							size: "sm",
							value: M.id,
							onChange: s,
							options: n.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${O}-revisions`
						}),
						p && /* @__PURE__ */ G(te, {
							state: p.status === "failed" ? "error" : "pending",
							label: `${p.label} ${p.status}`,
							"data-testid": `${O}-pending`
						}),
						u && /* @__PURE__ */ G(i, {
							variant: "secondary",
							size: "sm",
							onClick: u,
							"data-testid": `${O}-download`,
							children: d
						})
					]
				})]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ K("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ G("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ G("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: ee === void 0 ? void 0 : { maxWidth: ee },
							"data-testid": `${O}-stage`,
							children: F.preview ?? /* @__PURE__ */ G(v, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${O}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ K("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ G(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ G(De, { back: !0 }),
								disabled: F.index <= 1,
								onClick: () => l(F.index - 1),
								"data-testid": `${O}-previous`
							}),
							/* @__PURE__ */ G(v, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${O}-position`,
								children: `Slide ${F.index} of ${N.length}`
							}),
							/* @__PURE__ */ G(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ G(De, {}),
								disabled: F.index >= N.length,
								onClick: () => l(F.index + 1),
								"data-testid": `${O}-next`
							}),
							f && F.preview && /* @__PURE__ */ G(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => f(F.id),
								"data-testid": `${O}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ K("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${O}-outline`,
					children: [/* @__PURE__ */ G(P, {
						as: "div",
						className: "mb-1",
						"data-testid": `${O}-outline-label`,
						children: /* @__PURE__ */ G("span", {
							id: k,
							children: "Slides"
						})
					}), /* @__PURE__ */ G("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: N.map((e) => /* @__PURE__ */ G("li", { children: /* @__PURE__ */ K("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === F.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === F.id && "bg-surface-hover font-medium"),
							"data-testid": `${O}-outline-row`,
							children: [/* @__PURE__ */ G("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ G("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			h && /* @__PURE__ */ G(v, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${O}-notice`,
				children: h
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function ke(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Ae() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function je() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Me() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ G("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ G("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function X() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Ne({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: y = !1, testIdPrefix: b }) {
	let x = ke(i);
	return /* @__PURE__ */ K("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ G("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ K("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ G("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ G("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ G("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ G(v, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ K("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ G(v, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ G(v, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ G(v, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ G(v, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ K("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ K("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ G(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(Ae, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ G(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(je, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ K("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ G(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(Me, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ G(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(X, {}),
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
function Pe({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Ne, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ G("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ G(l, {
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
var Fe = 40, Ie = 8, Le = 200, Re = 120, ze = 200, Be = 60, Z = 2e3, Q = 24, $ = 6, Ve = 400, He = 10, Ue = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, We = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], Ge = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Ke = [
	"product",
	"engineering",
	"plain"
];
function qe(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Je(e) {
	return e.slides.length > 0 && qe(e).length === 0;
}
function Ye(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Xe(e, t = "bullets") {
	return Ze({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ze(e, t) {
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
function Qe(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function $e(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function et(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Xe(Ye(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function tt(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Ye(e),
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
function nt(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function rt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var it = le(() => import("./SortableSlideList-CRhc2Eq9.js"));
function at(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function ot(e, t) {
	at(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function st() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ G("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ G("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function ct({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = ke(e.thumbnailSvg), c = t + 1;
	return /* @__PURE__ */ K("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ G("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ G("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: c
			})
		}), /* @__PURE__ */ K("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ G("button", {
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${c}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ G("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ K("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ G(v, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ G(v, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ K("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ G(v, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ K(v, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ G(st, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ G("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ G(N, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function lt() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ G("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ G("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ G("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function ut({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: _, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = ke(i), C = t + 1, w = e.title || "Untitled slide", T = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => f(t, t - 1),
			"data-testid": `${x}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => f(t, t + 1),
			"data-testid": `${x}-down-${e.id}`
		}] : [],
		...h ? [{
			label: "Duplicate",
			onSelect: () => p(e.id),
			"data-testid": `${x}-duplicate-${e.id}`
		}] : [],
		...g ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => m(e.id),
			"data-testid": `${x}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ K("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ K("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ G("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
			}), !u && _ && /* @__PURE__ */ G("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: _
			})]
		}), /* @__PURE__ */ K("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ K("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ G("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ K("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ G(v, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ G(v, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ge[e.layout]
						})]
					}), c && /* @__PURE__ */ G("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ G(v, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ K("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						S ? /* @__PURE__ */ G(v, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}) : /* @__PURE__ */ G("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ G(v, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ G(v, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ G("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${x}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ G(N, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && T.length > 0 && /* @__PURE__ */ G("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ G(F, {
						trigger: /* @__PURE__ */ G(lt, {}),
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
function dt({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: g = "filmstrip" }) {
	let _ = H(null), y = V(() => new Set(u ?? []), [u]), b = V(() => e.map((e) => {
		let t = f?.[e.slide.id];
		return !y.has(e.slide.id) && !t?.length ? e : {
			...e,
			...y.has(e.slide.id) ? { generating: !0 } : {},
			...t?.length ? { viewers: t } : {}
		};
	}), [
		e,
		y,
		f
	]), x = V(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	z(() => {
		at(_.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => ot(_.current, s));
			return;
		}
		let c = C[o];
		n(c), ot(_.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ut,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ K("div", {
		ref: _,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${g}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ G(ce, {
				fallback: /* @__PURE__ */ G(Pe, { ...T }),
				children: G(p ? Pe : it, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ K("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ G("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ G("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ G(v, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ G("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ G(ct, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			c && !p && /* @__PURE__ */ K("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ G("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ G(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ K("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ G(h, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ft = {
	document: "📄",
	transcript: "🎙️"
};
function pt({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = U(""), [d, f] = U(!1), [p, m] = U(n), h = B(), g = H(0);
	z(() => {
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
	}, x = /* @__PURE__ */ G(ae, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ G(ee, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ G(v, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ G(v, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ G("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ G("li", { children: /* @__PURE__ */ K(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ G("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ft[t.kind ?? "document"]
						}),
						/* @__PURE__ */ G("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ G("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ K("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ G(P, {
					as: "div",
					children: /* @__PURE__ */ G("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ G(v, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ G("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ G(i, {
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
	}) : /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ G(P, {
				as: "div",
				children: /* @__PURE__ */ G("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ G(M, {
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
function mt() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function ht({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ G(P, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ G("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ K("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ G(v, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ G(O, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ G(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ G(mt, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ G(i, {
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
function gt({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	return /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ G(E, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ G(I, {
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
			}), !n && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ G(i, {
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
		}), /* @__PURE__ */ G("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ K(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ G(f, { children: /* @__PURE__ */ K(l, { children: [
					/* @__PURE__ */ G(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ G(d, { children: /* @__PURE__ */ G(O, {
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
					!n && /* @__PURE__ */ G(d, {})
				] }) }), /* @__PURE__ */ G(u, { children: e.labels.map((i, o) => /* @__PURE__ */ K(l, { children: [
					/* @__PURE__ */ G(c, { children: /* @__PURE__ */ G(O, {
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
					e.series.map((e, t) => /* @__PURE__ */ G(c, { children: /* @__PURE__ */ G(O, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ G(c, { children: /* @__PURE__ */ G(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(mt, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function _t({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ K("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ K("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ G(E, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ G(O, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ G(E, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ G(O, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ G(ht, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ K("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ G(ht, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ G(ht, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ G(gt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ K("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ G(E, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ G(k, {
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
				}), /* @__PURE__ */ G(E, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ G(O, {
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
			e.layout === "image" && /* @__PURE__ */ G(E, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ G(O, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ G(E, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ G(k, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ G(pt, {
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
var vt = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function yt({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ G("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ K("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", vt[a]),
			children: [e, t && /* @__PURE__ */ K("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ G("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ G(v, {
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
var bt = [
	"chart",
	"quote",
	"image",
	"two-column"
], xt = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
}, St = {
	narrow: 600,
	wide: 900
};
function Ct(e) {
	return e == null ? "wide" : e < St.narrow ? "narrow" : e < St.wide ? "medium" : "wide";
}
var wt = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, Tt = "Text style comes from the theme", Et = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function Dt({ redo: e }) {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ G("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ G("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function Ot() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function kt() {
	return /* @__PURE__ */ G("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function At({ label: e, value: t }) {
	return /* @__PURE__ */ K("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ G("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ G("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ G(g, { size: 12 })
		]
	});
}
function jt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: g, disabled: _ = !1, className: y, testIdPrefix: b = "slides-toolbar", size: x = "auto" }) {
	let { ref: S, ...C } = j(), { ref: T, width: ee } = ie(S), E = x === "auto" ? Ct(ee) : x, D = wt[E], O = (e) => D.has(e), k = _, A = !k && e ? {
		label: "Layout of this slide",
		items: We.map((t) => ({
			label: Ge[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${b}-layout-${t}`
		}))
	} : null, M = !k && a ? {
		label: "New slide after this one",
		items: bt.map((e) => ({
			label: `${Ge[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${b}-insert-${e}`
		}))
	} : null, N = k ? null : {
		label: "Deck theme",
		items: Ke.map((e) => ({
			label: xt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${b}-theme-${e}`
		}))
	}, P = !k && e?.layout === "chart" && e.chart && c ? e.chart : null, te = P && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: P.kind === e,
			onSelect: () => {
				P.kind !== e && c(e);
			},
			"data-testid": `${b}-chart-kind-${e}`
		}))
	} : null, I = [];
	return !O("layout") && A && I.push(A), !O("insert") && M && I.push(M), !O("theme") && N && I.push(N), !O("chart") && te && I.push(te), !O("note") && !k && I.push({
		label: Tt,
		items: [],
		"data-testid": `${b}-style-note`
	}), /* @__PURE__ */ K("div", {
		...C,
		ref: T,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": E,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", y),
		"data-testid": b,
		children: [
			/* @__PURE__ */ G(i, {
				variant: "primary",
				size: "sm",
				disabled: k || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${b}-new-slide`,
				children: /* @__PURE__ */ K("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ G(h, { size: 12 }), "New slide"]
				})
			}),
			O("layout") && A && e && /* @__PURE__ */ G(F, {
				trigger: /* @__PURE__ */ G(At, {
					label: "Layout",
					value: Ge[e.layout]
				}),
				triggerLabel: `Layout: ${Ge[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-layout`,
				sections: [A],
				"data-testid": `${b}-layout-menu`
			}),
			O("insert") && M && /* @__PURE__ */ G(F, {
				trigger: /* @__PURE__ */ G(At, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-insert`,
				sections: [M],
				"data-testid": `${b}-insert-menu`
			}),
			O("theme") && N && /* @__PURE__ */ G(F, {
				trigger: /* @__PURE__ */ G(At, {
					label: "Theme",
					value: xt[t]
				}),
				triggerLabel: `Theme: ${xt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-theme`,
				sections: [N],
				"data-testid": `${b}-theme-menu`
			}),
			O("chart") && P && c && /* @__PURE__ */ G(w, {
				size: "sm",
				value: P.kind,
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
				"data-testid": `${b}-chart-kind`
			}),
			(l || u) && /* @__PURE__ */ K(W, { children: [
				/* @__PURE__ */ G(kt, {}),
				l && /* @__PURE__ */ G(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ G(Dt, {}),
					disabled: k || !d,
					onClick: l,
					"data-testid": `${b}-undo`
				}),
				u && /* @__PURE__ */ G(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ G(Dt, { redo: !0 }),
					disabled: k || !f,
					onClick: u,
					"data-testid": `${b}-redo`
				})
			] }),
			I.length > 0 && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(kt, {}), /* @__PURE__ */ G(F, {
				trigger: /* @__PURE__ */ G("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-more`,
				sections: I,
				"data-testid": `${b}-more-menu`
			})] }),
			O("note") && /* @__PURE__ */ G(v, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Et,
				"data-testid": `${b}-style-note`,
				children: Tt
			}),
			/* @__PURE__ */ G("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			p && /* @__PURE__ */ G(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${b}-present`,
				children: /* @__PURE__ */ K("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ G(Ot, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Mt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Z, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = B(), l = B(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ K("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ G(v, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ G(v, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ G(k, {
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
function Nt({ testIdPrefix: e }) {
	return /* @__PURE__ */ G(M, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Pt = le(() => import("./PresentationAgentComposer-Dyyuvuan.js").catch(() => ({ default: Nt })));
function Ft({ back: e }) {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function It(e, t) {
	let [n, r] = U({
		past: [],
		future: []
	}), i = H(null), a = H(0);
	return z(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: R((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: R(() => {
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
		redo: R(() => {
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
function Lt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: d, onSearchSources: f, onDownload: p, onOpenPresentationView: h, readOnly: g = !1, onInstruct: _, instructHints: y, onUndoInstruct: b, generatingSlideIds: x, slideViewers: w, selectSlideRequest: ee, footer: k, renderFrame: j, onSelectedSlideChange: N, className: P, "data-testid": F = "presentation-editor" }) {
	let [te, ne] = U(() => e.slides[0]?.id ?? ""), [re, ie] = U(!1), [ae, L] = U(null), le = !!_, [B, ue] = U("slide"), [de, fe] = U(!1), [pe, me] = U(null), [he, ge] = U(null), [_e, ye] = U(() => /* @__PURE__ */ new Set()), { edit: q, undo: J, redo: Y, canUndo: Ee, canRedo: De } = It(e, t), [Ae, je] = U([]);
	z(() => {
		typeof n == "object" && "slides" in n && je(n.slides);
	}, [n]);
	let Me = H(a);
	Me.current = a;
	let X = e.slides, Ne = V(() => new Set(qe(e)), [e]), Pe = Ne.size === 0;
	z(() => {
		Pe && Me.current(e);
	}, [e, Pe]);
	let Fe = typeof n == "object" && "slides" in n ? n.slides : Ae, Ie = V(() => new Map(Fe.map((e) => [e.id, e.svg])), [Fe]), Le = V(() => {
		let e = new Set(X.map((e) => e.id));
		return Fe.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Fe, X]), Re = X.length + Le.length, ze = X.findIndex((e) => e.id === te), Be = ze === -1 ? Le.findIndex((e) => e.id === te) : -1, Z = ze === -1 ? Be === -1 ? 0 : X.length + Be : ze, Q = ze !== -1 || Be === -1 ? X[Z] : void 0, $ = Be === -1 ? void 0 : Le[Be], Ve = Q?.id ?? $?.id, He = Q ? Q.title || "Untitled slide" : $?.title, Ue = V(() => [...X.map((e) => e.id), ...Le.map((e) => e.id)], [X, Le]), We = Math.min(Z, X.length - 1), Ge = H(N);
	Ge.current = N, z(() => {
		Ve && Ge.current?.(Ve, Z);
	}, [Ve, Z]);
	let Ke = V(() => {
		let e = new Set(x ?? []);
		return de && B === "slide" && Q && e.add(Q.id), [...e];
	}, [
		x,
		de,
		B,
		Q
	]), Je = !!Q && Ke.includes(Q.id), Ye = X.map((e) => ({
		slide: e,
		thumbnailSvg: Ie.get(e.id),
		uncited: Ne.has(e.id),
		changed: _e.has(e.id)
	})), Xe = R((e) => {
		ne(e);
	}, []), it = ee?.key, at = ee?.slideId;
	z(() => {
		at && e.slides.some((e) => e.id === at) && ne(at);
	}, [it, at]);
	let ot = R((t, n) => {
		q($e(e, t, n));
	}, [q, e]), st = R((t) => {
		let n = et(e, We, t);
		n !== e && (q(n), ne(n.slides[We + 1].id));
	}, [
		q,
		e,
		We
	]), ct = R((t) => {
		let n = tt(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		q(n), ne(n.slides[r + 1].id);
	}, [q, e]), lt = R((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = nt(e, t);
		r !== e && (q(r), ne(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [q, e]), ut = R((t) => q(Qe(e, t)), [q, e]), ft = R(async (e) => {
		if (!_ || de) return !1;
		let t = Q?.id;
		fe(!0), ge(null);
		try {
			let n = await _(e, B === "slide" && t ? {
				slideId: t,
				scope: B
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return ye(new Set(r)), me(n?.summary?.trim() || "Done."), B === "deck" && r.length && (!t || !r.includes(t)) && ne(r[0]), !0;
		} catch (e) {
			return ge(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			fe(!1);
		}
	}, [
		_,
		de,
		B,
		Q?.id
	]), mt = R(() => {
		b?.(), me(null), ye(/* @__PURE__ */ new Set());
	}, [b]), ht = Ne.size, gt = !g && X.length > 0 && ht === 0 && !re, vt = R(() => {
		gt && (ie(!0), L(null), Promise.resolve(o(e)).catch((e) => {
			L(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ie(!1)));
	}, [
		gt,
		o,
		e
	]), bt = R((e) => {
		let t = Ue[Z + e];
		t && ne(t);
	}, [Ue, Z]);
	if (z(() => {
		if (g) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), vt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !Ce(e.target)) {
				e.preventDefault(), e.shiftKey ? Y() : J();
				return;
			}
			let n = we(e);
			if (!n) return;
			e.preventDefault();
			let r = Te(n, Z + 1, Re);
			r !== Z + 1 && bt(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		vt,
		J,
		Y,
		bt,
		Z,
		Re
	]), g) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...X.map((e, t) => {
				let n = ke(Ie.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ G("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Le.map((e, t) => {
				let n = ke(e.svg);
				return {
					id: e.id,
					index: X.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ G("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ G(Oe, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = Ue[e - 1];
				t && ne(t);
			},
			...p ? { onDownload: p } : {},
			className: P,
			"data-testid": `${F}-readonly`
		});
	}
	let xt = (() => {
		if ($) {
			let e = ke($.svg);
			return e ? /* @__PURE__ */ G("img", {
				src: e,
				alt: $.title,
				className: "h-full w-full object-contain",
				"data-testid": `${F}-stage-image`
			}) : /* @__PURE__ */ G(v, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${F}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Q && Ne.has(Q.id)) return /* @__PURE__ */ G(S, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${F}-preview-needs-source`
		});
		let t = Q ? ke(Ie.get(Q.id)) : void 0;
		if (!Pe && !t) return /* @__PURE__ */ G(S, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${F}-preview-needs-source`
		});
		if (n === "loading" && Ie.size === 0) return /* @__PURE__ */ G(T, {
			label: "Rendering the deck…",
			testId: `${F}-preview-loading`
		});
		if (Pe && typeof n == "object" && "error" in n) return /* @__PURE__ */ G(C, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${F}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ G("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${F}-stage-image`
		}) : /* @__PURE__ */ G(v, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${F}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ K("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${F}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ G(I, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => Se(e.target.value, l, u),
				options: xe(St, u),
				className: "w-auto",
				"data-testid": `${F}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ G(D, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${F}-revisions`
			}),
			/* @__PURE__ */ G(i, {
				variant: "primary",
				size: "sm",
				disabled: !gt,
				onClick: vt,
				"data-testid": `${F}-save`,
				children: re ? "Saving…" : `Save as ${rt(s)}`
			}),
			p && /* @__PURE__ */ G(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				"data-testid": `${F}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = le || j ? /* @__PURE__ */ K("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ G(be, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => q({
				...e,
				title: t
			}),
			"data-testid": `${F}-deck-title`
		}), /* @__PURE__ */ G(be, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => q({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${F}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ K("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ G(E, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ G(O, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => q({
					...e,
					title: t.target.value
				}),
				"data-testid": `${F}-deck-title`
			})
		}), /* @__PURE__ */ G(E, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ G(O, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => q({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${F}-deck-subtitle`
			})
		})]
	}), Tt = h ? () => h(Ve ? {
		slideId: Ve,
		slideIndex: Z + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ G(jt, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: X.length < 40,
		onLayoutChange: (t) => {
			Q && q(Qe(e, Ze(Q, t)));
		},
		onThemeChange: (t) => q({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && q(Qe(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: J,
		onRedo: Y,
		canUndo: Ee,
		canRedo: De,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${F}-toolbar`
	}), Dt = /* @__PURE__ */ K(W, { children: [ht > 0 && /* @__PURE__ */ G(M, {
		tone: "warning",
		"data-testid": `${F}-uncited-warning`,
		children: ht === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${ht} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ae && /* @__PURE__ */ G(M, {
		tone: "error",
		onDismiss: () => L(null),
		"data-testid": `${F}-save-error`,
		children: ae
	})] }), Ot = le && /* @__PURE__ */ K(W, { children: [he && /* @__PURE__ */ G(M, {
		tone: "error",
		onDismiss: () => ge(null),
		"data-testid": `${F}-agent-error`,
		children: he
	}), pe && !he && /* @__PURE__ */ K("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${F}-agent-summary`,
		children: [
			/* @__PURE__ */ G(v, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${pe}`
			}),
			_e.size > 0 && /* @__PURE__ */ G(v, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: _e.size === 1 ? "1 slide marked in the filmstrip" : `${_e.size} slides marked in the filmstrip`
			}),
			b && /* @__PURE__ */ G(i, {
				variant: "ghost",
				size: "sm",
				onClick: mt,
				"data-testid": `${F}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), kt = le && Q && /* @__PURE__ */ G(ce, {
		fallback: /* @__PURE__ */ G(v, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${F}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ G(Pt, {
			scope: B,
			onScopeChange: ue,
			slideLabel: `slide ${Z + 1}`,
			busy: de,
			onSubmit: ft,
			...y?.length ? { suggestions: y } : {},
			testIdPrefix: F
		})
	}), At = {
		selectedSlide: Q,
		...$ ? { selectedGeneratedSlide: $ } : {},
		selectedIndex: Z,
		slideCount: Re,
		selectSlide: Xe,
		markChanged: (e) => ye(new Set(e))
	}, Nt = typeof k == "function" ? k(At) : k, Lt = Nt != null && Nt !== !1 ? Nt : kt ? /* @__PURE__ */ G(oe, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ K("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${F}-dock-card`,
			children: [Ot, kt]
		}),
		"data-testid": `${F}-dock`
	}) : null, Rt = Q && /* @__PURE__ */ G(W, { children: le ? /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(pt, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => ut({
			...Q,
			sources: e
		}),
		options: d,
		onSearchSources: f,
		testIdPrefix: `${F}-slide`
	}), /* @__PURE__ */ G(ve, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${F}-details`,
		children: /* @__PURE__ */ G(_t, {
			slide: Q,
			onChange: ut,
			sources: d,
			onSearchSources: f,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${F}-slide`
		})
	})] }) : /* @__PURE__ */ G(_t, {
		slide: Q,
		onChange: ut,
		sources: d,
		onSearchSources: f,
		showNotes: !1,
		testIdPrefix: `${F}-slide`
	}) }), zt = /* @__PURE__ */ K("div", {
		className: r("flex items-center justify-center gap-2", j && "ml-auto shrink-0"),
		"data-testid": `${F}-slide-nav`,
		children: [
			/* @__PURE__ */ G(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ G(Ft, { back: !0 }),
				disabled: Z <= 0,
				onClick: () => bt(-1),
				"data-testid": `${F}-previous`
			}),
			/* @__PURE__ */ G(v, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${F}-position`,
				children: `Slide ${Re === 0 ? 0 : Z + 1} of ${Re}`
			}),
			/* @__PURE__ */ G(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ G(Ft, {}),
				disabled: Z >= Re - 1,
				onClick: () => bt(1),
				"data-testid": `${F}-next`
			}),
			/* @__PURE__ */ G(A, {
				value: X.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${X.length} / 40`,
				className: "ml-2",
				"data-testid": `${F}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ K("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${F}-body`,
		children: [/* @__PURE__ */ G(dt, {
			items: Ye,
			selectedId: Q?.id ?? "",
			onSelect: Xe,
			onMove: ot,
			onDuplicate: ct,
			onDelete: lt,
			onAdd: () => st(),
			canAdd: X.length < 40,
			generatingSlideIds: Ke,
			generatedItems: Le.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...w ? { slideViewers: w } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${F}-slide`
		}), /* @__PURE__ */ K("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${F}-main`,
			children: [
				/* @__PURE__ */ G("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${F}-stage-frame`,
					children: /* @__PURE__ */ G(yt, {
						generating: Je,
						label: He ? `Slide ${Z + 1} of ${Re}: ${He}` : "No slide",
						"data-testid": `${F}-stage`,
						children: xt
					})
				}),
				!j && zt,
				$ && /* @__PURE__ */ G(v, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${F}-generated-note`,
					children: `${$.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Q && /* @__PURE__ */ K("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ G(Mt, {
						value: Q.notes,
						onChange: (e) => ut({
							...Q,
							notes: e
						}),
						"data-testid": `${F}-slide-notes`
					}), Rt]
				})
			]
		})]
	}), Vt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (j) {
		let e = /* @__PURE__ */ K("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", P),
			"data-testid": F,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ K("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${F}-deck-line`,
					children: [wt, zt]
				}),
				Dt,
				Bt
			]
		});
		return /* @__PURE__ */ G(W, { children: j({
			toolbar: Et,
			actions: Ct,
			surface: e,
			footer: Lt
		}) });
	}
	return /* @__PURE__ */ K("div", {
		className: r("relative flex h-full min-h-0 flex-col", P),
		"data-testid": F,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ K("div", {
					className: r("flex flex-wrap justify-between gap-2", le ? "items-center" : "items-end"),
					...le ? { "data-testid": `${F}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ G("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${F}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${F}-dock-row`,
				children: /* @__PURE__ */ G(se.Provider, {
					value: "pinned",
					children: Lt
				})
			})
		]
	});
}
//#endregion
export { Xe as A, ke as B, Re as C, et as D, Ge as E, Qe as F, ye as G, Y as H, qe as I, _e as J, q as K, Ze as L, rt as M, Ye as N, Je as O, nt as P, Pe as R, ze as S, We as T, xe as U, Oe as V, be as W, ge as Y, Be as _, jt as a, Fe as b, _t as c, ut as d, Ke as f, $ as g, Q as h, bt as i, $e as j, tt as k, pt as l, Le as m, Mt as n, Ct as o, Ie as p, ve as q, St as r, yt as s, Lt as t, dt as u, Z as v, Ue as w, He as x, Ve as y, Ne as z };
