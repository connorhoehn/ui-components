import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-CHdlnODN.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-DDeXW3mZ.js";
import { d as h, t as g, z as _ } from "./DropdownMenu-thsvyIAZ.js";
import { a as v, n as y, s as b } from "./Text-DLYUIQhS.js";
import { t as x } from "./Chip-zdVBwV9j.js";
import { t as S } from "./Modal-DMFNRUDx.js";
import { t as C } from "./EmptyState-DFWbBBcY.js";
import { n as w, t as T } from "./SegmentedControl-X19S_gNQ.js";
import { n as ee, t as E } from "./SearchInput-TPCQujCD.js";
import { t as D } from "./FormField-E8Z0ppOp.js";
import { n as te } from "./Tabs-DjNsAODd.js";
import { t as O } from "./Input-DLknWXri.js";
import { t as k } from "./Textarea-Dz4doxTv.js";
import { t as A } from "./DotMeter-BDVkadI8.js";
import { n as j } from "./RovingToolbar-CmQag9q6.js";
import { t as M } from "./InlineAlert-CRnIKeAF.js";
import { t as N } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as P } from "./SectionLabel-bcrhNYOr.js";
import { t as F } from "./StatusPill-C-aN2Pzz.js";
import { t as I } from "./Select-D2EQq7Wi.js";
import { G as ne, U as re } from "./renderers-CLgJ6UYB.js";
import { r as ie } from "./composerCommands-DRKsP3QT.js";
import { i as ae, t as oe } from "./FloatingComposerDock-DMUQCjea.js";
import { t as se } from "./useMeasuredWidth-BPrwD0q5.js";
import { Component as L, Suspense as ce, lazy as R, useCallback as z, useEffect as B, useId as le, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var q = /* @__PURE__ */ new Set(["diagram", "presentation"]), ue = [
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
], de = [
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
function fe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function pe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function me(t) {
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
function he({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = U([]), [d, f] = U(!1), [p, m] = U(null), [h, g] = U(null), [_, v] = U(""), [y, C] = U(""), [w, T] = U(!1), [ee, E] = U(""), [D, te] = U("page"), [A, j] = U("blank"), [M, N] = U(""), [P, F] = U(""), [ie, ae] = U([]), oe = H(null), se = H(null), L = le(), ce = `${L}-blank-label`, R = `${L}-type-label`, z = `${L}-cookbook-label`, he = `${L}-title`, ge = `${L}-description`, _e = `${L}-deck-from`, J = `${L}-deck-source`;
	B(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), v(""), C(""), T(!1), E(""), te("page"), j("blank"), N(""), F(""), ae([]);
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
	let ve = V(() => ue.filter((e) => fe(e, _)), [_]), Y = V(() => l.filter((e) => pe(e, _)), [l, _]), ye = V(() => re.filter((e) => ne(e, _)), [_]);
	if (B(() => {
		if (!e || D !== "presentation") return;
		if (A === "blank") {
			ae([]);
			return;
		}
		let t = P.trim().toLowerCase();
		if (A === "transcript") {
			let e = c ?? [];
			ae(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			ae([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(P.trim())).then((e) => {
			n || ae(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		D,
		A,
		P,
		c,
		s
	]), !e) return null;
	let be = l.find((e) => e.id === p), xe = h ? re.find((e) => e.id === h) : void 0, Se = D === "sections", Ce = !!xe || !!be, we = l.length === 0 && !d && !xe, Te = ve.length === 0 && Y.length === 0 && ye.length === 0, X = xe ? {
		kind: "cookbook",
		cookbook: xe
	} : be && !q.has(D) ? {
		kind: "type",
		type: be
	} : {
		kind: "blank",
		shape: D
	}, Ee = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), q.has(D) && te("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			te(e.shape), q.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, De = (e) => e.kind === "blank" ? e.shape : q.has(D) ? "page" : D, Oe = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = ee.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: A,
				...A !== "blank" && M ? { sourceId: M } : {},
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
			let t = me(e.cookbook);
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
	}, Z = D === "presentation" && A !== "blank" && !M, ke = !!y.trim() && (!Se || Ce) && !Z, Ae = () => {
		ke && Oe(X, y, De(X));
	};
	return /* @__PURE__ */ G(S, {
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
				e.key === "Enter" && !e.shiftKey && ke && Ae();
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
							let t = ye.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: ye[0]
							} : ve.length > 0 ? {
								kind: "blank",
								shape: ve[0].id
							} : Y.length > 0 ? {
								kind: "type",
								type: Y[0]
							} : void 0;
							if (!t) return;
							Ee(t);
							let n = y.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								se.current?.focus();
								return;
							}
							Oe(t, n, De(t));
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
						ve.length > 0 && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ G("div", {
								id: ce,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ G("div", {
								role: "group",
								"aria-labelledby": ce,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: ve.map((e) => /* @__PURE__ */ K(b, {
									padding: "md",
									selected: D === e.id,
									onSelect: () => Ee({
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
											e.id === "page" && /* @__PURE__ */ G(x, {
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
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ G(I, {
									id: _e,
									value: A,
									options: de.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										j(e.target.value), N(""), F("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ G("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ K("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ G(O, {
										type: "search",
										value: P,
										onChange: (e) => F(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ie.length === 0 ? /* @__PURE__ */ G("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K("label", {
										htmlFor: J,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ G("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ G(I, {
										id: J,
										required: !0,
										"aria-required": "true",
										value: M,
										placeholder: "Choose one…",
										options: ie.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => N(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						ye.length > 0 && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ K("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ G("div", {
									id: z,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ G("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: D === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : D === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : D === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ G("div", {
								role: "group",
								"aria-labelledby": z,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: ye.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ K(b, {
										padding: "md",
										selected: t,
										onSelect: () => Ee({
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
						!q.has(D) && (Y.length > 0 || we || l.length === 0 && d) && /* @__PURE__ */ K("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ K("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ G("span", {
										id: R,
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
								Y.length > 0 && /* @__PURE__ */ G("div", {
									role: "group",
									"aria-labelledby": R,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Y.map((e) => {
										let t = !xe && p === e.id;
										return /* @__PURE__ */ K("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Ee({
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
							htmlFor: he,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ G("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ G(O, {
							ref: se,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: y,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: xe ? `e.g. ${xe.name}` : be ? `e.g. Q2 ${be.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ K("div", { children: [/* @__PURE__ */ K("label", {
						htmlFor: ge,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ G("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ G(k, {
						id: ge,
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
						onClick: Ae,
						disabled: !ke,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", ke ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var ge = class extends L {
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
function _e({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": g = "disclosure" }) {
	let _ = n !== void 0, [v, y] = U(i), b = _ ? n : v, x = H(null);
	B(() => {
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
		"data-testid": g,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ K("summary", {
			"data-testid": `${g}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ G(h, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ G("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ G("div", {
			"data-testid": `${g}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function J({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = le(), p = c === 3 ? "h3" : "h2", m = t === 0;
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
					/* @__PURE__ */ G(x, {
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
			m && o ? /* @__PURE__ */ G(C, {
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
function ve({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ G("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var Y = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function ye({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = U(!1), [h, g] = U(e), _ = H(null);
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
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", Y[l], !e && "italic text-text-tertiary", d),
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
function Te({ title: e, subtitle: t, revisions: n, revisionId: a, onRevisionChange: o, slideIndex: s, onSlideChange: c, onDownload: l, downloadLabel: u = "Download .pptx", onOpenPreview: d, pending: f, notice: p, state: h = "ready", errorMessage: g, ownerName: _, onRetry: b, maxSlideWidth: x, autoFocus: S = !1, className: E, "data-testid": D = "presentation-view" }) {
	let te = le(), O = H(null), k = H(!1);
	if (B(() => {
		!S || k.current || !O.current || (k.current = !0, O.current.focus({ preventScroll: !0 }));
	}), h === "loading") return /* @__PURE__ */ G(ee, {
		label: "Opening the presentation…",
		testId: `${D}-loading`
	});
	if (h === "no-access") return /* @__PURE__ */ G(v, {
		resource: "this presentation",
		ownerName: _ ?? null,
		testId: `${D}-no-access`
	});
	if (h === "error") return /* @__PURE__ */ G(w, {
		title: "This presentation could not be opened",
		...g ? { description: g } : {},
		...b ? {
			actionLabel: "Try again",
			onAction: b
		} : {},
		testId: `${D}-error`
	});
	let A = n.find((e) => e.id === a) ?? n[0], j = A?.slides ?? [];
	if (h === "empty" || !A || j.length === 0) return /* @__PURE__ */ K("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", E),
		"data-testid": D,
		children: [/* @__PURE__ */ K("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ G(y, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ G(y, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${D}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ G(C, {
			title: "No slides yet",
			description: f?.status === "generating" ? `${f.label} is still being generated.` : f?.status === "failed" ? f.message ?? `${f.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${D}-empty`
		})]
	});
	let M = j[Math.min(Math.max(s, 1), j.length) - 1];
	return /* @__PURE__ */ K("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", E),
		ref: O,
		"data-testid": D,
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
			/* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ K("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ G(y, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${D}-title`,
						children: e
					}), t && /* @__PURE__ */ G(y, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${D}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ K("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ce ? /* @__PURE__ */ G(I, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: (e) => o?.(e.target.value),
							options: [...n].reverse().map((e, t) => ({
								value: e.id,
								label: t === 0 ? `${e.label} · latest` : e.label
							})),
							className: "w-auto",
							"data-testid": `${D}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ G(T, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: o,
							options: n.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${D}-revisions`
						}),
						f && /* @__PURE__ */ G(F, {
							state: f.status === "failed" ? "error" : "pending",
							label: `${f.label} ${f.status}`,
							"data-testid": `${D}-pending`
						}),
						l && /* @__PURE__ */ G(i, {
							variant: "secondary",
							size: "sm",
							onClick: l,
							"data-testid": `${D}-download`,
							children: u
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
							style: x === void 0 ? void 0 : { maxWidth: x },
							"data-testid": `${D}-stage`,
							children: M.preview ?? /* @__PURE__ */ G(y, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${D}-no-preview`,
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
								icon: /* @__PURE__ */ G(we, { back: !0 }),
								disabled: M.index <= 1,
								onClick: () => c(M.index - 1),
								"data-testid": `${D}-previous`
							}),
							/* @__PURE__ */ G(y, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${D}-position`,
								children: `Slide ${M.index} of ${j.length}`
							}),
							/* @__PURE__ */ G(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ G(we, {}),
								disabled: M.index >= j.length,
								onClick: () => c(M.index + 1),
								"data-testid": `${D}-next`
							}),
							d && M.preview && /* @__PURE__ */ G(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => d(M.id),
								"data-testid": `${D}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ K("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": te,
					"data-testid": `${D}-outline`,
					children: [/* @__PURE__ */ G(P, {
						as: "div",
						className: "mb-1",
						"data-testid": `${D}-outline-label`,
						children: /* @__PURE__ */ G("span", {
							id: te,
							children: "Slides"
						})
					}), /* @__PURE__ */ G("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ G("li", { children: /* @__PURE__ */ K("button", {
							type: "button",
							onClick: () => c(e.index),
							"aria-current": e.id === M.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === M.id && "bg-surface-hover font-medium"),
							"data-testid": `${D}-outline-row`,
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
			p && /* @__PURE__ */ G(y, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${D}-notice`,
				children: p
			})
		]
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
function Ee() {
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
function De() {
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
function Oe() {
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
function Z() {
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
function ke({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: b }) {
	let x = X(i);
	return /* @__PURE__ */ K("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
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
						}) : /* @__PURE__ */ G(y, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ K("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ G(y, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ G(y, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ G(y, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ G(y, {
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
						icon: /* @__PURE__ */ G(Ee, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ G(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(De, {}),
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
						icon: /* @__PURE__ */ G(Oe, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ G(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ G(Z, {}),
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
var je = 40, Me = 8, Ne = 200, Pe = 120, Fe = 200, Ie = 60, Q = 2e3, $ = 24, Le = 6, Re = 400, ze = 10, Be = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ve = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], He = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Ue = [
	"product",
	"engineering",
	"plain"
];
function We(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Ge(e) {
	return e.slides.length > 0 && We(e).length === 0;
}
function Ke(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function qe(e, t = "bullets") {
	return Je({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Je(e, t) {
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
function Ye(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Xe(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Ze(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = qe(Ke(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Qe(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Ke(e),
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
function $e(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function et(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var tt = R(() => import("./SortableSlideList-dCKAWqo5.js"));
function nt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function rt(e, t) {
	nt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function it() {
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
function at({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = X(e.thumbnailSvg), c = t + 1;
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
						children: [/* @__PURE__ */ G(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ G(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ K("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ G(y, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ K(y, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ G(it, {}), "Generated"]
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
function ot() {
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
function st({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: _, dragHandle: v, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = X(i), w = t + 1, T = e.title || "Untitled slide", ee = [
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
		..._ ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => m(e.id),
			"data-testid": `${S}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ K("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ K("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ G("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: w
			}), !u && v && /* @__PURE__ */ G("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ K("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ K("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${w}: ${T}`,
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ G("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ K("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ G(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: T
						}), /* @__PURE__ */ G(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: He[e.layout]
						})]
					}), c && /* @__PURE__ */ G("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ G(y, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ K("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ G(y, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: T
						}) : /* @__PURE__ */ G("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ G(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ G(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ G("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ G(N, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && ee.length > 0 && /* @__PURE__ */ G("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ G(g, {
						trigger: /* @__PURE__ */ G(ot, {}),
						triggerLabel: `Slide ${w} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "bg-surface/90 px-1 py-0.5",
						triggerTestId: `${S}-menu-${e.id}`,
						align: "end",
						sections: [{ items: ee }],
						"data-testid": `${S}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function ct({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: h = "filmstrip" }) {
	let g = H(null), v = V(() => new Set(u ?? []), [u]), b = V(() => e.map((e) => {
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
	]), x = V(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...v].filter((e) => !t.has(e));
	}, [e, v]);
	B(() => {
		nt(g.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => rt(g.current, s));
			return;
		}
		let c = C[o];
		n(c), rt(g.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: st,
		listClassName: "gap-2.5",
		testIdPrefix: h
	};
	return /* @__PURE__ */ K("div", {
		ref: g,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${h}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ G(ce, {
				fallback: /* @__PURE__ */ G(Ae, { ...T }),
				children: G(p ? Ae : tt, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ K("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${h}-placeholder-${t}`,
				children: [/* @__PURE__ */ G("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ G("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ G(y, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ G("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${h}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ G(at, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: h
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
					"data-testid": `${h}-add`,
					children: /* @__PURE__ */ K("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ G(_, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var lt = {
	document: "📄",
	transcript: "🎙️"
};
function ut({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = U(""), [d, f] = U(!1), [p, m] = U(n), h = le(), g = H(0);
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
	}, x = /* @__PURE__ */ G(ie, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ G(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ G(y, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ G(y, {
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
							children: lt[t.kind ?? "document"]
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
				e.length === 0 ? /* @__PURE__ */ G(y, {
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
					disabled: v && !d,
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
function dt() {
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
function ft({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
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
						/* @__PURE__ */ G(y, {
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
							icon: /* @__PURE__ */ G(dt, {}),
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
function pt({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			children: [/* @__PURE__ */ G(D, {
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
						icon: /* @__PURE__ */ G(dt, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function mt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
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
				children: [/* @__PURE__ */ G(D, {
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
				}), /* @__PURE__ */ G(D, {
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
			e.layout === "bullets" && /* @__PURE__ */ G(ft, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ K("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ G(ft, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ G(ft, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ G(pt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ K("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ G(D, {
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
				}), /* @__PURE__ */ G(D, {
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
			e.layout === "image" && /* @__PURE__ */ G(D, {
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
			s && /* @__PURE__ */ G(D, {
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
			o && /* @__PURE__ */ G(ut, {
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
var ht = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function gt({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ G("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ K("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", ht[a]),
			children: [e, t && /* @__PURE__ */ K("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ G("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ G(y, {
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
var _t = [
	"chart",
	"quote",
	"image",
	"two-column"
], vt = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
}, yt = {
	narrow: 600,
	wide: 900
};
function bt(e) {
	return e == null ? "wide" : e < yt.narrow ? "narrow" : e < yt.wide ? "medium" : "wide";
}
var xt = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, St = "Text style comes from the theme", Ct = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function wt({ redo: e }) {
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
function Tt() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Et() {
	return /* @__PURE__ */ G("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Dt({ label: e, value: t }) {
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
			/* @__PURE__ */ G(h, { size: 12 })
		]
	});
}
function Ot({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: h, disabled: v = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...w } = j(), { ref: ee, width: E } = se(C), D = S === "auto" ? bt(E) : S, te = xt[D], O = (e) => te.has(e), k = v, A = !k && e ? {
		label: "Layout of this slide",
		items: Ve.map((t) => ({
			label: He[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${x}-layout-${t}`
		}))
	} : null, M = !k && a ? {
		label: "New slide after this one",
		items: _t.map((e) => ({
			label: `${He[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, N = k ? null : {
		label: "Deck theme",
		items: Ue.map((e) => ({
			label: vt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${x}-theme-${e}`
		}))
	}, P = !k && e?.layout === "chart" && e.chart && c ? e.chart : null, F = P && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: P.kind === e,
			onSelect: () => {
				P.kind !== e && c(e);
			},
			"data-testid": `${x}-chart-kind-${e}`
		}))
	} : null, I = [];
	return !O("layout") && A && I.push(A), !O("insert") && M && I.push(M), !O("theme") && N && I.push(N), !O("chart") && F && I.push(F), !O("note") && !k && I.push({
		label: St,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ K("div", {
		...w,
		ref: ee,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": D,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ G(i, {
				variant: "primary",
				size: "sm",
				disabled: k || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ K("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ G(_, { size: 12 }), "New slide"]
				})
			}),
			O("layout") && A && e && /* @__PURE__ */ G(g, {
				trigger: /* @__PURE__ */ G(Dt, {
					label: "Layout",
					value: He[e.layout]
				}),
				triggerLabel: `Layout: ${He[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [A],
				"data-testid": `${x}-layout-menu`
			}),
			O("insert") && M && /* @__PURE__ */ G(g, {
				trigger: /* @__PURE__ */ G(Dt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [M],
				"data-testid": `${x}-insert-menu`
			}),
			O("theme") && N && /* @__PURE__ */ G(g, {
				trigger: /* @__PURE__ */ G(Dt, {
					label: "Theme",
					value: vt[t]
				}),
				triggerLabel: `Theme: ${vt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [N],
				"data-testid": `${x}-theme-menu`
			}),
			O("chart") && P && c && /* @__PURE__ */ G(T, {
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
				"data-testid": `${x}-chart-kind`
			}),
			(l || u) && /* @__PURE__ */ K(W, { children: [
				/* @__PURE__ */ G(Et, {}),
				l && /* @__PURE__ */ G(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ G(wt, {}),
					disabled: k || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ G(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ G(wt, { redo: !0 }),
					disabled: k || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			I.length > 0 && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(Et, {}), /* @__PURE__ */ G(g, {
				trigger: /* @__PURE__ */ G("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-more`,
				sections: I,
				"data-testid": `${x}-more-menu`
			})] }),
			O("note") && /* @__PURE__ */ G(y, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Ct,
				"data-testid": `${x}-style-note`,
				children: St
			}),
			/* @__PURE__ */ G("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			h,
			p && /* @__PURE__ */ G(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ K("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ G(Tt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function kt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Q, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = le(), l = le(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ K("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ G(y, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ G(y, {
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
function At({ testIdPrefix: e }) {
	return /* @__PURE__ */ G(M, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var jt = R(() => import("./PresentationAgentComposer-qsowLipM.js").catch(() => ({ default: At })));
function Mt({ back: e }) {
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
function Nt(e, t) {
	let [n, r] = U({
		past: [],
		future: []
	}), i = H(null), a = H(0);
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
function Pt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: _, onUndoInstruct: v, generatingSlideIds: b, slideViewers: x, selectSlideRequest: S, footer: T, renderFrame: E, onSelectedSlideChange: k, className: j, "data-testid": N = "presentation-editor" }) {
	let [P, F] = U(() => e.slides[0]?.id ?? ""), [ne, re] = U(!1), [ie, se] = U(null), L = !!g, [R, le] = U("slide"), [q, ue] = U(!1), [de, fe] = U(null), [pe, me] = U(null), [he, ge] = U(() => /* @__PURE__ */ new Set()), { edit: J, undo: ve, redo: Y, canUndo: Ce, canRedo: we } = Nt(e, t), [Ee, De] = U([]);
	B(() => {
		typeof n == "object" && "slides" in n && De(n.slides);
	}, [n]);
	let Oe = H(a);
	Oe.current = a;
	let Z = e.slides, ke = V(() => new Set(We(e)), [e]), Ae = ke.size === 0;
	B(() => {
		Ae && Oe.current(e);
	}, [e, Ae]);
	let je = typeof n == "object" && "slides" in n ? n.slides : Ee, Me = V(() => new Map(je.map((e) => [e.id, e.svg])), [je]), Ne = V(() => {
		let e = new Set(Z.map((e) => e.id));
		return je.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [je, Z]), Pe = Z.length + Ne.length, Fe = Z.findIndex((e) => e.id === P), Ie = Fe === -1 ? Ne.findIndex((e) => e.id === P) : -1, Q = Fe === -1 ? Ie === -1 ? 0 : Z.length + Ie : Fe, $ = Fe !== -1 || Ie === -1 ? Z[Q] : void 0, Le = Ie === -1 ? void 0 : Ne[Ie], Re = $?.id ?? Le?.id, ze = $ ? $.title || "Untitled slide" : Le?.title, Be = V(() => [...Z.map((e) => e.id), ...Ne.map((e) => e.id)], [Z, Ne]), Ve = Math.min(Q, Z.length - 1), He = H(k);
	He.current = k, B(() => {
		Re && He.current?.(Re, Q);
	}, [Re, Q]);
	let Ue = V(() => {
		let e = new Set(b ?? []);
		return q && R === "slide" && $ && e.add($.id), [...e];
	}, [
		b,
		q,
		R,
		$
	]), Ge = !!$ && Ue.includes($.id), Ke = Z.map((e) => ({
		slide: e,
		thumbnailSvg: Me.get(e.id),
		uncited: ke.has(e.id),
		changed: he.has(e.id)
	})), qe = z((e) => {
		F(e);
	}, []), tt = S?.key, nt = S?.slideId;
	B(() => {
		nt && e.slides.some((e) => e.id === nt) && F(nt);
	}, [tt, nt]);
	let rt = z((t, n) => {
		J(Xe(e, t, n));
	}, [J, e]), it = z((t) => {
		let n = Ze(e, Ve, t);
		n !== e && (J(n), F(n.slides[Ve + 1].id));
	}, [
		J,
		e,
		Ve
	]), at = z((t) => {
		let n = Qe(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		J(n), F(n.slides[r + 1].id);
	}, [J, e]), ot = z((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = $e(e, t);
		r !== e && (J(r), F(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [J, e]), st = z((t) => J(Ye(e, t)), [J, e]), lt = z(async (e) => {
		if (!g || q) return !1;
		let t = $?.id;
		ue(!0), me(null);
		try {
			let n = await g(e, R === "slide" && t ? {
				slideId: t,
				scope: R
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return ge(new Set(r)), fe(n?.summary?.trim() || "Done."), R === "deck" && r.length && (!t || !r.includes(t)) && F(r[0]), !0;
		} catch (e) {
			return me(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			ue(!1);
		}
	}, [
		g,
		q,
		R,
		$?.id
	]), dt = z(() => {
		v?.(), fe(null), ge(/* @__PURE__ */ new Set());
	}, [v]), ft = ke.size, pt = !h && Z.length > 0 && ft === 0 && !ne, ht = z(() => {
		pt && (re(!0), se(null), Promise.resolve(o(e)).catch((e) => {
			se(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => re(!1)));
	}, [
		pt,
		o,
		e
	]), _t = z((e) => {
		let t = Be[Q + e];
		t && F(t);
	}, [Be, Q]);
	if (B(() => {
		if (h) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), ht();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !be(e.target)) {
				e.preventDefault(), e.shiftKey ? Y() : ve();
				return;
			}
			let n = xe(e);
			if (!n) return;
			e.preventDefault();
			let r = Se(n, Q + 1, Pe);
			r !== Q + 1 && _t(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		ht,
		ve,
		Y,
		_t,
		Q,
		Pe
	]), h) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...Z.map((e, t) => {
				let n = X(Me.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ G("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Ne.map((e, t) => {
				let n = X(e.svg);
				return {
					id: e.id,
					index: Z.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ G("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ G(Te, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = Be[e - 1];
				t && F(t);
			},
			...f ? { onDownload: f } : {},
			className: j,
			"data-testid": `${N}-readonly`
		});
	}
	let vt = (() => {
		if (Le) {
			let e = X(Le.svg);
			return e ? /* @__PURE__ */ G("img", {
				src: e,
				alt: Le.title,
				className: "h-full w-full object-contain",
				"data-testid": `${N}-stage-image`
			}) : /* @__PURE__ */ G(y, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${N}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if ($ && ke.has($.id)) return /* @__PURE__ */ G(C, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${N}-preview-needs-source`
		});
		let t = $ ? X(Me.get($.id)) : void 0;
		if (!Ae && !t) return /* @__PURE__ */ G(C, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${N}-preview-needs-source`
		});
		if (n === "loading" && Me.size === 0) return /* @__PURE__ */ G(ee, {
			label: "Rendering the deck…",
			testId: `${N}-preview-loading`
		});
		if (Ae && typeof n == "object" && "error" in n) return /* @__PURE__ */ G(w, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${N}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ G("img", {
			src: r,
			alt: $.title || `Slide ${Q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${N}-stage-image`
		}) : /* @__PURE__ */ G(y, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${N}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), yt = s.map((e) => ({
		id: e.id,
		label: e.label
	})), bt = /* @__PURE__ */ K("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${N}-revision-controls`,
		children: [
			yt.length > 5 ? /* @__PURE__ */ G(I, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => l?.(e.target.value),
				options: [...yt].reverse().map((e, t) => ({
					value: e.id,
					label: t === 0 ? `${e.label} · latest` : e.label
				})),
				className: "w-auto",
				"data-testid": `${N}-revision-select`
			}) : yt.length > 0 && /* @__PURE__ */ G(te, {
				items: yt,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${N}-revisions`
			}),
			/* @__PURE__ */ G(i, {
				variant: "primary",
				size: "sm",
				disabled: !pt,
				onClick: ht,
				"data-testid": `${N}-save`,
				children: ne ? "Saving…" : `Save as ${et(s)}`
			}),
			f && /* @__PURE__ */ G(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${N}-download`,
				children: "Download .pptx"
			})
		]
	}), xt = L || E ? /* @__PURE__ */ K("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ G(ye, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => J({
				...e,
				title: t
			}),
			"data-testid": `${N}-deck-title`
		}), /* @__PURE__ */ G(ye, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => J({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${N}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ K("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ G(D, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ G(O, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => J({
					...e,
					title: t.target.value
				}),
				"data-testid": `${N}-deck-title`
			})
		}), /* @__PURE__ */ G(D, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ G(O, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => J({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${N}-deck-subtitle`
			})
		})]
	}), St = p ? () => p(Re ? {
		slideId: Re,
		slideIndex: Q + 1
	} : void 0) : void 0, Ct = /* @__PURE__ */ G(Ot, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: it,
		canAddSlide: Z.length < 40,
		onLayoutChange: (t) => {
			$ && J(Ye(e, Je($, t)));
		},
		onThemeChange: (t) => J({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			$?.chart && J(Ye(e, {
				...$,
				chart: {
					...$.chart,
					kind: t
				}
			}));
		},
		onUndo: ve,
		onRedo: Y,
		canUndo: Ce,
		canRedo: we,
		...St ? { onPresent: St } : {},
		testIdPrefix: `${N}-toolbar`
	}), wt = /* @__PURE__ */ K(W, { children: [ft > 0 && /* @__PURE__ */ G(M, {
		tone: "warning",
		"data-testid": `${N}-uncited-warning`,
		children: ft === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${ft} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ie && /* @__PURE__ */ G(M, {
		tone: "error",
		onDismiss: () => se(null),
		"data-testid": `${N}-save-error`,
		children: ie
	})] }), Tt = L && /* @__PURE__ */ K(W, { children: [pe && /* @__PURE__ */ G(M, {
		tone: "error",
		onDismiss: () => me(null),
		"data-testid": `${N}-agent-error`,
		children: pe
	}), de && !pe && /* @__PURE__ */ K("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${N}-agent-summary`,
		children: [
			/* @__PURE__ */ G(y, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${de}`
			}),
			he.size > 0 && /* @__PURE__ */ G(y, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: he.size === 1 ? "1 slide marked in the filmstrip" : `${he.size} slides marked in the filmstrip`
			}),
			v && /* @__PURE__ */ G(i, {
				variant: "ghost",
				size: "sm",
				onClick: dt,
				"data-testid": `${N}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Et = L && $ && /* @__PURE__ */ G(ce, {
		fallback: /* @__PURE__ */ G(y, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${N}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ G(jt, {
			scope: R,
			onScopeChange: le,
			slideLabel: `slide ${Q + 1}`,
			busy: q,
			onSubmit: lt,
			..._?.length ? { suggestions: _ } : {},
			testIdPrefix: N
		})
	}), Dt = {
		selectedSlide: $,
		...Le ? { selectedGeneratedSlide: Le } : {},
		selectedIndex: Q,
		slideCount: Pe,
		selectSlide: qe,
		markChanged: (e) => ge(new Set(e))
	}, At = typeof T == "function" ? T(Dt) : T, Pt = At != null && At !== !1 ? At : Et ? /* @__PURE__ */ G(ae, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ K("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${N}-dock-card`,
			children: [Tt, Et]
		}),
		"data-testid": `${N}-dock`
	}) : null, Ft = $ && /* @__PURE__ */ G(W, { children: L ? /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(ut, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => st({
			...$,
			sources: e
		}),
		options: u,
		onSearchSources: d,
		testIdPrefix: `${N}-slide`
	}), /* @__PURE__ */ G(_e, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${N}-details`,
		children: /* @__PURE__ */ G(mt, {
			slide: $,
			onChange: st,
			sources: u,
			onSearchSources: d,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${N}-slide`
		})
	})] }) : /* @__PURE__ */ G(mt, {
		slide: $,
		onChange: st,
		sources: u,
		onSearchSources: d,
		showNotes: !1,
		testIdPrefix: `${N}-slide`
	}) }), It = /* @__PURE__ */ K("div", {
		className: r("flex items-center justify-center gap-2", E && "ml-auto shrink-0"),
		"data-testid": `${N}-slide-nav`,
		children: [
			/* @__PURE__ */ G(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ G(Mt, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => _t(-1),
				"data-testid": `${N}-previous`
			}),
			/* @__PURE__ */ G(y, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${N}-position`,
				children: `Slide ${Pe === 0 ? 0 : Q + 1} of ${Pe}`
			}),
			/* @__PURE__ */ G(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ G(Mt, {}),
				disabled: Q >= Pe - 1,
				onClick: () => _t(1),
				"data-testid": `${N}-next`
			}),
			/* @__PURE__ */ G(A, {
				value: Z.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Z.length} / 40`,
				className: "ml-2",
				"data-testid": `${N}-slide-meter`
			})
		]
	}), Lt = /* @__PURE__ */ K("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${N}-body`,
		children: [/* @__PURE__ */ G(ct, {
			items: Ke,
			selectedId: $?.id ?? "",
			onSelect: qe,
			onMove: rt,
			onDuplicate: at,
			onDelete: ot,
			onAdd: () => it(),
			canAdd: Z.length < 40,
			generatingSlideIds: Ue,
			generatedItems: Ne.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...x ? { slideViewers: x } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${N}-slide`
		}), /* @__PURE__ */ K("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${N}-main`,
			children: [
				/* @__PURE__ */ G("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${N}-stage-frame`,
					children: /* @__PURE__ */ G(gt, {
						generating: Ge,
						label: ze ? `Slide ${Q + 1} of ${Pe}: ${ze}` : "No slide",
						"data-testid": `${N}-stage`,
						children: vt
					})
				}),
				!E && It,
				Le && /* @__PURE__ */ G(y, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${N}-generated-note`,
					children: `${Le.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				$ && /* @__PURE__ */ K("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ G(kt, {
						value: $.notes,
						onChange: (e) => st({
							...$,
							notes: e
						}),
						"data-testid": `${N}-slide-notes`
					}), Ft]
				})
			]
		})]
	}), Rt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (E) {
		let e = /* @__PURE__ */ K("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", j),
			"data-testid": N,
			onKeyDown: Rt,
			children: [
				/* @__PURE__ */ K("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${N}-deck-line`,
					children: [xt, It]
				}),
				wt,
				Lt
			]
		});
		return /* @__PURE__ */ G(W, { children: E({
			toolbar: Ct,
			actions: bt,
			surface: e,
			footer: Pt
		}) });
	}
	return /* @__PURE__ */ K("div", {
		className: r("relative flex h-full min-h-0 flex-col", j),
		"data-testid": N,
		onKeyDown: Rt,
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ K("div", {
					className: r("flex flex-wrap justify-between gap-2", L ? "items-center" : "items-end"),
					...L ? { "data-testid": `${N}-deck-line` } : {},
					children: [xt, bt]
				}), /* @__PURE__ */ G("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Ct
				})]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${N}-scroller`,
				children: [wt, Lt]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${N}-dock-row`,
				children: /* @__PURE__ */ G(oe.Provider, {
					value: "pinned",
					children: Pt
				})
			})
		]
	});
}
//#endregion
export { qe as A, X as B, Pe as C, Ze as D, He as E, Ye as F, _e as G, ye as H, We as I, ge as K, Je as L, et as M, Ke as N, Ge as O, $e as P, Ae as R, Fe as S, Ve as T, J as U, Te as V, ve as W, Ie as _, Ot as a, je as b, mt as c, st as d, Ue as f, Le as g, $ as h, _t as i, Xe as j, Qe as k, ut as l, Ne as m, kt as n, bt as o, Me as p, he as q, yt as r, gt as s, Pt as t, ct as u, Q as v, Be as w, ze as x, Re as y, ke as z };
