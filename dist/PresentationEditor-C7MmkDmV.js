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
import { n as ee, t as te } from "./SearchInput-TPCQujCD.js";
import { t as E } from "./FormField-E8Z0ppOp.js";
import { n as D } from "./Tabs-DjNsAODd.js";
import { t as O } from "./Input-DLknWXri.js";
import { t as k } from "./Textarea-Dz4doxTv.js";
import { t as A } from "./DotMeter-BDVkadI8.js";
import { n as ne } from "./RovingToolbar-CmQag9q6.js";
import { t as j } from "./InlineAlert-CRnIKeAF.js";
import { t as M } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as N } from "./SectionLabel-bcrhNYOr.js";
import { t as re } from "./StatusPill-C-aN2Pzz.js";
import { t as P } from "./Select-D2EQq7Wi.js";
import { G as ie, U as ae } from "./renderers-CLgJ6UYB.js";
import { t as oe } from "./useMeasuredWidth-BPrwD0q5.js";
import { r as se } from "./composerCommands-DRKsP3QT.js";
import { i as ce, t as le } from "./FloatingComposerDock-DMUQCjea.js";
import { Component as F, Suspense as ue, lazy as I, useCallback as L, useEffect as R, useId as z, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
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
function ge(t) {
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
function _e({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = H([]), [d, f] = H(!1), [p, m] = H(null), [h, g] = H(null), [_, v] = H(""), [y, C] = H(""), [w, T] = H(!1), [ee, te] = H(""), [E, D] = H("page"), [A, ne] = H("blank"), [j, M] = H(""), [N, re] = H(""), [oe, se] = H([]), ce = V(null), le = V(null), F = z(), ue = `${F}-blank-label`, I = `${F}-type-label`, L = `${F}-cookbook-label`, _e = `${F}-title`, ve = `${F}-description`, ye = `${F}-deck-from`, be = `${F}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), v(""), C(""), T(!1), te(""), D("page"), ne("blank"), M(""), re(""), se([]);
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
	let K = B(() => fe.filter((e) => me(e, _)), [_]), q = B(() => l.filter((e) => he(e, _)), [l, _]), xe = B(() => ae.filter((e) => ie(e, _)), [_]);
	if (R(() => {
		if (!e || E !== "presentation") return;
		if (A === "blank") {
			se([]);
			return;
		}
		let t = N.trim().toLowerCase();
		if (A === "transcript") {
			let e = c ?? [];
			se(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			se([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(N.trim())).then((e) => {
			n || se(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		E,
		A,
		N,
		c,
		s
	]), !e) return null;
	let J = l.find((e) => e.id === p), Y = h ? ae.find((e) => e.id === h) : void 0, Se = E === "sections", Ce = !!Y || !!J, we = l.length === 0 && !d && !Y, Te = K.length === 0 && q.length === 0 && xe.length === 0, Ee = Y ? {
		kind: "cookbook",
		cookbook: Y
	} : J && !de.has(E) ? {
		kind: "type",
		type: J
	} : {
		kind: "blank",
		shape: E
	}, De = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), de.has(E) && D("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			D(e.shape), de.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : de.has(E) ? "page" : E, X = (e, t, n) => {
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
			let t = ge(e.cookbook);
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
	}, ke = E === "presentation" && A !== "blank" && !j, Ae = !!y.trim() && (!Se || Ce) && !ke, je = () => {
		Ae && X(Ee, y, Oe(Ee));
	};
	return /* @__PURE__ */ W(S, {
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
		children: /* @__PURE__ */ G("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Ae && je();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ W("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ G("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ W(O, {
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
							let t = xe.length > 0 && _.trim() ? {
								kind: "cookbook",
								cookbook: xe[0]
							} : K.length > 0 ? {
								kind: "blank",
								shape: K[0].id
							} : q.length > 0 ? {
								kind: "type",
								type: q[0]
							} : void 0;
							if (!t) return;
							De(t);
							let n = y.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								le.current?.focus();
								return;
							}
							X(t, n, Oe(t));
						}
					}), /* @__PURE__ */ W("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ G("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						K.length > 0 && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ W("div", {
								id: ue,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": ue,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: K.map((e) => /* @__PURE__ */ G(b, {
									padding: "md",
									selected: E === e.id,
									onSelect: () => De({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ G("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ W("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ W("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ W(x, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ W("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						E === "presentation" && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ W("label", {
									htmlFor: ye,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ W(P, {
									id: ye,
									value: A,
									options: pe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ne(e.target.value), M(""), re("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ W("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ G("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ W(O, {
										type: "search",
										value: N,
										onChange: (e) => re(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), oe.length === 0 ? /* @__PURE__ */ W("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G("label", {
										htmlFor: be,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ W("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ W(P, {
										id: be,
										required: !0,
										"aria-required": "true",
										value: j,
										placeholder: "Choose one…",
										options: oe.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => M(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						xe.length > 0 && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ G("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ W("div", {
									id: L,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ W("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: E === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : E === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : E === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": L,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: xe.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ G(b, {
										padding: "md",
										selected: t,
										onSelect: () => De({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ G("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ W("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ W("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ W("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ W("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!de.has(E) && (q.length > 0 || we || l.length === 0 && d) && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ G("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ W("span", {
										id: I,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Se && /* @__PURE__ */ W("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ W("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								we && /* @__PURE__ */ W("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Se ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								q.length > 0 && /* @__PURE__ */ W("div", {
									role: "group",
									"aria-labelledby": I,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: q.map((e) => {
										let t = !Y && p === e.id;
										return /* @__PURE__ */ G("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => De({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ W("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ G("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ W("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ W("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ W("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: E === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ W("span", {
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
						Te && /* @__PURE__ */ G("div", {
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
				/* @__PURE__ */ G("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ G("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ G("label", {
							htmlFor: _e,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ W("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ W(O, {
							ref: le,
							id: _e,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: y,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: Y ? `e.g. ${Y.name}` : J ? `e.g. Q2 ${J.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("label", {
						htmlFor: ve,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ W("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ W(k, {
						id: ve,
						"data-testid": "new-doc-description",
						value: ee,
						onChange: (e) => te(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ G("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ W("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ W("button", {
						"data-testid": "new-doc-submit",
						onClick: je,
						disabled: !Ae,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Ae ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var ve = class extends F {
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
		return this.state.hasError ? /* @__PURE__ */ G("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ W("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ W("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ W("button", {
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
function ye({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": g = "disclosure" }) {
	let _ = n !== void 0, [v, y] = H(i), b = _ ? n : v, x = V(null);
	R(() => {
		let e = x.current;
		e && e.open !== b && (e.open = b);
	}, [b]);
	let S = (e) => {
		let t = e.currentTarget.open;
		_ || y(t), c?.(t);
	}, C = l === void 0 ? void 0 : a(l), w = u === "compact", T = d === "plain";
	return /* @__PURE__ */ G("details", {
		ref: x,
		open: b,
		onToggle: S,
		"data-testid": g,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ G("summary", {
			"data-testid": `${g}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ W(h, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ W("div", {
			"data-testid": `${g}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function be({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = z(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ G("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ W(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ W(x, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ W("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W("span", { className: "flex-1" }), /* @__PURE__ */ W("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ W(C, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ W("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ W("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function K({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ W("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var q = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function xe({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = H(!1), [h, g] = H(e), _ = V(null);
	R(() => {
		p || g(e);
	}, [e, p]), R(() => {
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
	return p ? /* @__PURE__ */ W(O, {
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
	}) : /* @__PURE__ */ W("button", {
		type: "button",
		disabled: s,
		onClick: () => m(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": f,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", q[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var J = "__older-revisions__";
function Y(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: J,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: J,
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
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Oe({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: d = "Download .pptx", onOpenPreview: f, pending: p, notice: h, state: g = "ready", errorMessage: _, ownerName: b, onRetry: x, maxSlideWidth: S, autoFocus: te = !1, className: E, "data-testid": D = "presentation-view" }) {
	let O = z(), k = V(null), A = V(!1);
	if (R(() => {
		!te || A.current || !k.current || (A.current = !0, k.current.focus({ preventScroll: !0 }));
	}), g === "loading") return /* @__PURE__ */ W(ee, {
		label: "Opening the presentation…",
		testId: `${D}-loading`
	});
	if (g === "no-access") return /* @__PURE__ */ W(v, {
		resource: "this presentation",
		ownerName: b ?? null,
		testId: `${D}-no-access`
	});
	if (g === "error") return /* @__PURE__ */ W(w, {
		title: "This presentation could not be opened",
		..._ ? { description: _ } : {},
		...x ? {
			actionLabel: "Try again",
			onAction: x
		} : {},
		testId: `${D}-error`
	});
	let ne = n.find((e) => e.id === o) ?? n[0], j = ne?.slides ?? [];
	if (g === "empty" || !ne || j.length === 0) return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", E),
		"data-testid": D,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ W(y, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ W(y, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${D}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ W(C, {
			title: "No slides yet",
			description: p?.status === "generating" ? `${p.label} is still being generated.` : p?.status === "failed" ? p.message ?? `${p.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${D}-empty`
		})]
	});
	let M = j[Math.min(Math.max(c, 1), j.length) - 1];
	return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", E),
		ref: k,
		"data-testid": D,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${M.index} of ${j.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = we(e);
			if (!t) return;
			e.preventDefault();
			let n = Te(t, M.index, j.length);
			n !== M.index && l(n);
		},
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ G("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ W(y, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${D}-title`,
						children: e
					}), t && /* @__PURE__ */ W(y, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${D}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ G("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ee || (a?.count ?? 0) > 0 ? /* @__PURE__ */ W(P, {
							"aria-label": "Revision",
							size: "sm",
							value: ne.id,
							onChange: (e) => Se(e.target.value, s, a),
							options: Y(n, a),
							className: "w-auto",
							"data-testid": `${D}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ W(T, {
							"aria-label": "Revision",
							size: "sm",
							value: ne.id,
							onChange: s,
							options: n.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${D}-revisions`
						}),
						p && /* @__PURE__ */ W(re, {
							state: p.status === "failed" ? "error" : "pending",
							label: `${p.label} ${p.status}`,
							"data-testid": `${D}-pending`
						}),
						u && /* @__PURE__ */ W(i, {
							variant: "secondary",
							size: "sm",
							onClick: u,
							"data-testid": `${D}-download`,
							children: d
						})
					]
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ G("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ W("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ W("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: S === void 0 ? void 0 : { maxWidth: S },
							"data-testid": `${D}-stage`,
							children: M.preview ?? /* @__PURE__ */ W(y, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${D}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ G("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ W(m, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(De, { back: !0 }),
								disabled: M.index <= 1,
								onClick: () => l(M.index - 1),
								"data-testid": `${D}-previous`
							}),
							/* @__PURE__ */ W(y, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${D}-position`,
								children: `Slide ${M.index} of ${j.length}`
							}),
							/* @__PURE__ */ W(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(De, {}),
								disabled: M.index >= j.length,
								onClick: () => l(M.index + 1),
								"data-testid": `${D}-next`
							}),
							f && M.preview && /* @__PURE__ */ W(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => f(M.id),
								"data-testid": `${D}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ G("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": O,
					"data-testid": `${D}-outline`,
					children: [/* @__PURE__ */ W(N, {
						as: "div",
						className: "mb-1",
						"data-testid": `${D}-outline-label`,
						children: /* @__PURE__ */ W("span", {
							id: O,
							children: "Slides"
						})
					}), /* @__PURE__ */ W("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === M.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === M.id && "bg-surface-hover font-medium"),
							"data-testid": `${D}-outline-row`,
							children: [/* @__PURE__ */ W("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ W("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			h && /* @__PURE__ */ W(y, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${D}-notice`,
				children: h
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
function ke() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ae() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
			d: "M4 6l4 4 4-4",
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
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ W("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ W("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Z() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Me({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: b }) {
	let x = X(i);
	return /* @__PURE__ */ G("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ W("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ G("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ W("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ W("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ W("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ W(y, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ G("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ W(y, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ W(y, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ W(y, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ W(y, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ G("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ G("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ W(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(ke, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Ae, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ G("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ W(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(je, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Z, {}),
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
function Ne({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Me, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ W("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ W(l, {
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
var Pe = 40, Fe = 8, Ie = 200, Le = 120, Re = 200, ze = 60, Q = 2e3, $ = 24, Be = 6, Ve = 400, He = 10, Ue = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, We = [
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
var it = I(() => import("./SortableSlideList-DR3yrl69.js"));
function at(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function ot(e, t) {
	at(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function st() {
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ W("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ W("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function ct({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = X(e.thumbnailSvg), c = t + 1;
	return /* @__PURE__ */ G("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ W("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ W("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: c
			})
		}), /* @__PURE__ */ G("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${c}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ W("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ G("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ W(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ W(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ W(y, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ G(y, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ W(st, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(M, {
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
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ W("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ W("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ W("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function ut({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: _, dragHandle: v, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
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
	return /* @__PURE__ */ G("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ G("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ W("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: w
			}), !u && v && /* @__PURE__ */ W("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ G("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ G("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${w}: ${T}`,
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ W("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ G("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ W(y, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: T
						}), /* @__PURE__ */ W(y, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ge[e.layout]
						})]
					}), c && /* @__PURE__ */ W("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ W(y, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ W(y, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: T
						}) : /* @__PURE__ */ W("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ W(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ W(y, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(M, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && ee.length > 0 && /* @__PURE__ */ W("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ W(g, {
						trigger: /* @__PURE__ */ W(lt, {}),
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
function dt({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: h = "filmstrip" }) {
	let g = V(null), v = B(() => new Set(u ?? []), [u]), b = B(() => e.map((e) => {
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
	]), x = B(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...v].filter((e) => !t.has(e));
	}, [e, v]);
	R(() => {
		at(g.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => ot(g.current, s));
			return;
		}
		let c = C[o];
		n(c), ot(g.current, c);
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
		testIdPrefix: h
	};
	return /* @__PURE__ */ G("div", {
		ref: g,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${h}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ W(ue, {
				fallback: /* @__PURE__ */ W(Ne, { ...T }),
				children: W(p ? Ne : it, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ G("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${h}-placeholder-${t}`,
				children: [/* @__PURE__ */ W("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ W("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ W(y, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ W("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${h}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ W(ct, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: h
				}, r.id))
			}),
			c && !p && /* @__PURE__ */ G("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ W("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${h}-add`,
					children: /* @__PURE__ */ G("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ W(_, { size: 12 }), "Add slide"]
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
	let [l, u] = H(""), [d, f] = H(!1), [p, m] = H(n), h = z(), g = V(0);
	R(() => {
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
	}, x = /* @__PURE__ */ W(se, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ W(te, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ W(y, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ W(y, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ W("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ W("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ft[t.kind ?? "document"]
						}),
						/* @__PURE__ */ W("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ W("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ W(N, {
					as: "div",
					children: /* @__PURE__ */ W("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ W(y, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ W("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ W(i, {
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
	}) : /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ W(N, {
				as: "div",
				children: /* @__PURE__ */ W("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ W(j, {
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
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
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
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ W(N, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ W("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ G("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ W(y, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ W(O, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ W(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ W(mt, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ W(i, {
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
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ W(E, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ W(P, {
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
			}), !n && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: o,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ W(i, {
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
		}), /* @__PURE__ */ W("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ G(p, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ W(f, { children: /* @__PURE__ */ G(l, { children: [
					/* @__PURE__ */ W(d, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ W(d, { children: /* @__PURE__ */ W(O, {
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
					!n && /* @__PURE__ */ W(d, {})
				] }) }), /* @__PURE__ */ W(u, { children: e.labels.map((i, o) => /* @__PURE__ */ G(l, { children: [
					/* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(O, {
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
					e.series.map((e, t) => /* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(O, {
						size: "sm",
						type: "number",
						value: String(e.values[o] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, o, e.target.value),
						"data-testid": `${r}-value-${t}-${o}`
					}) }, t)),
					!n && /* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(m, {
						"aria-label": `Remove row ${o + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(mt, {}),
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
	return /* @__PURE__ */ G("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ W(E, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ W(O, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ W(E, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ W(O, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ W(ht, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ W(ht, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ W(ht, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ W(gt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ W(E, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ W(k, {
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
				}), /* @__PURE__ */ W(E, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ W(O, {
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
			e.layout === "image" && /* @__PURE__ */ W(E, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ W(O, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ W(E, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ W(k, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ W(pt, {
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
	return /* @__PURE__ */ W("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ G("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", vt[a]),
			children: [e, t && /* @__PURE__ */ G("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ W("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(y, {
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
	return /* @__PURE__ */ G("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ W("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ W("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function Ot() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function kt() {
	return /* @__PURE__ */ W("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function At({ label: e, value: t }) {
	return /* @__PURE__ */ G("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ W("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ W("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ W(h, { size: 12 })
		]
	});
}
function jt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: h, disabled: v = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...w } = ne(), { ref: ee, width: te } = oe(C), E = S === "auto" ? Ct(te) : S, D = wt[E], O = (e) => D.has(e), k = v, A = !k && e ? {
		label: "Layout of this slide",
		items: We.map((t) => ({
			label: Ge[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${x}-layout-${t}`
		}))
	} : null, j = !k && a ? {
		label: "New slide after this one",
		items: bt.map((e) => ({
			label: `${Ge[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, M = k ? null : {
		label: "Deck theme",
		items: Ke.map((e) => ({
			label: xt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${x}-theme-${e}`
		}))
	}, N = !k && e?.layout === "chart" && e.chart && c ? e.chart : null, re = N && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: N.kind === e,
			onSelect: () => {
				N.kind !== e && c(e);
			},
			"data-testid": `${x}-chart-kind-${e}`
		}))
	} : null, P = [];
	return !O("layout") && A && P.push(A), !O("insert") && j && P.push(j), !O("theme") && M && P.push(M), !O("chart") && re && P.push(re), !O("note") && !k && P.push({
		label: Tt,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ G("div", {
		...w,
		ref: ee,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": E,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: k || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ W(_, { size: 12 }), "New slide"]
				})
			}),
			O("layout") && A && e && /* @__PURE__ */ W(g, {
				trigger: /* @__PURE__ */ W(At, {
					label: "Layout",
					value: Ge[e.layout]
				}),
				triggerLabel: `Layout: ${Ge[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [A],
				"data-testid": `${x}-layout-menu`
			}),
			O("insert") && j && /* @__PURE__ */ W(g, {
				trigger: /* @__PURE__ */ W(At, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [j],
				"data-testid": `${x}-insert-menu`
			}),
			O("theme") && M && /* @__PURE__ */ W(g, {
				trigger: /* @__PURE__ */ W(At, {
					label: "Theme",
					value: xt[t]
				}),
				triggerLabel: `Theme: ${xt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [M],
				"data-testid": `${x}-theme-menu`
			}),
			O("chart") && N && c && /* @__PURE__ */ W(T, {
				size: "sm",
				value: N.kind,
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
			(l || u) && /* @__PURE__ */ G(U, { children: [
				/* @__PURE__ */ W(kt, {}),
				l && /* @__PURE__ */ W(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(Dt, {}),
					disabled: k || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ W(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(Dt, { redo: !0 }),
					disabled: k || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			P.length > 0 && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(kt, {}), /* @__PURE__ */ W(g, {
				trigger: /* @__PURE__ */ W("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-more`,
				sections: P,
				"data-testid": `${x}-more-menu`
			})] }),
			O("note") && /* @__PURE__ */ W(y, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Et,
				"data-testid": `${x}-style-note`,
				children: Tt
			}),
			/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			h,
			p && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ W(Ot, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Mt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Q, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = z(), l = z(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ G("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ W(y, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ W(y, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ W(k, {
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
	return /* @__PURE__ */ W(j, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Pt = I(() => import("./PresentationAgentComposer-DzPEVVkS.js").catch(() => ({ default: Nt })));
function Ft({ back: e }) {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function It(e, t) {
	let [n, r] = H({
		past: [],
		future: []
	}), i = V(null), a = V(0);
	return R(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: L((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: L(() => {
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
		redo: L(() => {
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
function Lt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: d, onSearchSources: f, onDownload: p, onOpenPresentationView: h, readOnly: g = !1, onInstruct: _, instructHints: v, onUndoInstruct: b, generatingSlideIds: x, slideViewers: S, selectSlideRequest: T, footer: te, renderFrame: k, onSelectedSlideChange: ne, className: M, "data-testid": N = "presentation-editor" }) {
	let [re, ie] = H(() => e.slides[0]?.id ?? ""), [ae, oe] = H(!1), [se, F] = H(null), I = !!_, [z, de] = H("slide"), [fe, pe] = H(!1), [me, he] = H(null), [ge, _e] = H(null), [ve, be] = H(() => /* @__PURE__ */ new Set()), { edit: K, undo: q, redo: J, canUndo: Ee, canRedo: De } = It(e, t), [ke, Ae] = H([]);
	R(() => {
		typeof n == "object" && "slides" in n && Ae(n.slides);
	}, [n]);
	let je = V(a);
	je.current = a;
	let Z = e.slides, Me = B(() => new Set(qe(e)), [e]), Ne = Me.size === 0;
	R(() => {
		Ne && je.current(e);
	}, [e, Ne]);
	let Pe = typeof n == "object" && "slides" in n ? n.slides : ke, Fe = B(() => new Map(Pe.map((e) => [e.id, e.svg])), [Pe]), Ie = B(() => {
		let e = new Set(Z.map((e) => e.id));
		return Pe.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Pe, Z]), Le = Z.length + Ie.length, Re = Z.findIndex((e) => e.id === re), ze = Re === -1 ? Ie.findIndex((e) => e.id === re) : -1, Q = Re === -1 ? ze === -1 ? 0 : Z.length + ze : Re, $ = Re !== -1 || ze === -1 ? Z[Q] : void 0, Be = ze === -1 ? void 0 : Ie[ze], Ve = $?.id ?? Be?.id, He = $ ? $.title || "Untitled slide" : Be?.title, Ue = B(() => [...Z.map((e) => e.id), ...Ie.map((e) => e.id)], [Z, Ie]), We = Math.min(Q, Z.length - 1), Ge = V(ne);
	Ge.current = ne, R(() => {
		Ve && Ge.current?.(Ve, Q);
	}, [Ve, Q]);
	let Ke = B(() => {
		let e = new Set(x ?? []);
		return fe && z === "slide" && $ && e.add($.id), [...e];
	}, [
		x,
		fe,
		z,
		$
	]), Je = !!$ && Ke.includes($.id), Ye = Z.map((e) => ({
		slide: e,
		thumbnailSvg: Fe.get(e.id),
		uncited: Me.has(e.id),
		changed: ve.has(e.id)
	})), Xe = L((e) => {
		ie(e);
	}, []), it = T?.key, at = T?.slideId;
	R(() => {
		at && e.slides.some((e) => e.id === at) && ie(at);
	}, [it, at]);
	let ot = L((t, n) => {
		K($e(e, t, n));
	}, [K, e]), st = L((t) => {
		let n = et(e, We, t);
		n !== e && (K(n), ie(n.slides[We + 1].id));
	}, [
		K,
		e,
		We
	]), ct = L((t) => {
		let n = tt(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		K(n), ie(n.slides[r + 1].id);
	}, [K, e]), lt = L((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = nt(e, t);
		r !== e && (K(r), ie(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [K, e]), ut = L((t) => K(Qe(e, t)), [K, e]), ft = L(async (e) => {
		if (!_ || fe) return !1;
		let t = $?.id;
		pe(!0), _e(null);
		try {
			let n = await _(e, z === "slide" && t ? {
				slideId: t,
				scope: z
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return be(new Set(r)), he(n?.summary?.trim() || "Done."), z === "deck" && r.length && (!t || !r.includes(t)) && ie(r[0]), !0;
		} catch (e) {
			return _e(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			pe(!1);
		}
	}, [
		_,
		fe,
		z,
		$?.id
	]), mt = L(() => {
		b?.(), he(null), be(/* @__PURE__ */ new Set());
	}, [b]), ht = Me.size, gt = !g && Z.length > 0 && ht === 0 && !ae, vt = L(() => {
		gt && (oe(!0), F(null), Promise.resolve(o(e)).catch((e) => {
			F(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => oe(!1)));
	}, [
		gt,
		o,
		e
	]), bt = L((e) => {
		let t = Ue[Q + e];
		t && ie(t);
	}, [Ue, Q]);
	if (R(() => {
		if (g) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), vt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !Ce(e.target)) {
				e.preventDefault(), e.shiftKey ? J() : q();
				return;
			}
			let n = we(e);
			if (!n) return;
			e.preventDefault();
			let r = Te(n, Q + 1, Le);
			r !== Q + 1 && bt(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		vt,
		q,
		J,
		bt,
		Q,
		Le
	]), g) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...Z.map((e, t) => {
				let n = X(Fe.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Ie.map((e, t) => {
				let n = X(e.svg);
				return {
					id: e.id,
					index: Z.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ W(Oe, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = Ue[e - 1];
				t && ie(t);
			},
			...p ? { onDownload: p } : {},
			className: M,
			"data-testid": `${N}-readonly`
		});
	}
	let xt = (() => {
		if (Be) {
			let e = X(Be.svg);
			return e ? /* @__PURE__ */ W("img", {
				src: e,
				alt: Be.title,
				className: "h-full w-full object-contain",
				"data-testid": `${N}-stage-image`
			}) : /* @__PURE__ */ W(y, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${N}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if ($ && Me.has($.id)) return /* @__PURE__ */ W(C, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${N}-preview-needs-source`
		});
		let t = $ ? X(Fe.get($.id)) : void 0;
		if (!Ne && !t) return /* @__PURE__ */ W(C, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${N}-preview-needs-source`
		});
		if (n === "loading" && Fe.size === 0) return /* @__PURE__ */ W(ee, {
			label: "Rendering the deck…",
			testId: `${N}-preview-loading`
		});
		if (Ne && typeof n == "object" && "error" in n) return /* @__PURE__ */ W(w, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${N}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ W("img", {
			src: r,
			alt: $.title || `Slide ${Q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${N}-stage-image`
		}) : /* @__PURE__ */ W(y, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${N}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ G("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${N}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ W(P, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => Se(e.target.value, l, u),
				options: Y(St, u),
				className: "w-auto",
				"data-testid": `${N}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ W(D, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${N}-revisions`
			}),
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: !gt,
				onClick: vt,
				"data-testid": `${N}-save`,
				children: ae ? "Saving…" : `Save as ${rt(s)}`
			}),
			p && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				"data-testid": `${N}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = I || k ? /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ W(xe, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => K({
				...e,
				title: t
			}),
			"data-testid": `${N}-deck-title`
		}), /* @__PURE__ */ W(xe, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => K({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${N}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ G("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ W(E, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ W(O, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => K({
					...e,
					title: t.target.value
				}),
				"data-testid": `${N}-deck-title`
			})
		}), /* @__PURE__ */ W(E, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ W(O, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => K({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${N}-deck-subtitle`
			})
		})]
	}), Tt = h ? () => h(Ve ? {
		slideId: Ve,
		slideIndex: Q + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ W(jt, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: Z.length < 40,
		onLayoutChange: (t) => {
			$ && K(Qe(e, Ze($, t)));
		},
		onThemeChange: (t) => K({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			$?.chart && K(Qe(e, {
				...$,
				chart: {
					...$.chart,
					kind: t
				}
			}));
		},
		onUndo: q,
		onRedo: J,
		canUndo: Ee,
		canRedo: De,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${N}-toolbar`
	}), Dt = /* @__PURE__ */ G(U, { children: [ht > 0 && /* @__PURE__ */ W(j, {
		tone: "warning",
		"data-testid": `${N}-uncited-warning`,
		children: ht === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${ht} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), se && /* @__PURE__ */ W(j, {
		tone: "error",
		onDismiss: () => F(null),
		"data-testid": `${N}-save-error`,
		children: se
	})] }), Ot = I && /* @__PURE__ */ G(U, { children: [ge && /* @__PURE__ */ W(j, {
		tone: "error",
		onDismiss: () => _e(null),
		"data-testid": `${N}-agent-error`,
		children: ge
	}), me && !ge && /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${N}-agent-summary`,
		children: [
			/* @__PURE__ */ W(y, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${me}`
			}),
			ve.size > 0 && /* @__PURE__ */ W(y, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: ve.size === 1 ? "1 slide marked in the filmstrip" : `${ve.size} slides marked in the filmstrip`
			}),
			b && /* @__PURE__ */ W(i, {
				variant: "ghost",
				size: "sm",
				onClick: mt,
				"data-testid": `${N}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), kt = I && $ && /* @__PURE__ */ W(ue, {
		fallback: /* @__PURE__ */ W(y, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${N}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ W(Pt, {
			scope: z,
			onScopeChange: de,
			slideLabel: `slide ${Q + 1}`,
			busy: fe,
			onSubmit: ft,
			...v?.length ? { suggestions: v } : {},
			testIdPrefix: N
		})
	}), At = {
		selectedSlide: $,
		...Be ? { selectedGeneratedSlide: Be } : {},
		selectedIndex: Q,
		slideCount: Le,
		selectSlide: Xe,
		markChanged: (e) => be(new Set(e))
	}, Nt = typeof te == "function" ? te(At) : te, Lt = Nt != null && Nt !== !1 ? Nt : kt ? /* @__PURE__ */ W(ce, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ G("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${N}-dock-card`,
			children: [Ot, kt]
		}),
		"data-testid": `${N}-dock`
	}) : null, Rt = $ && /* @__PURE__ */ W(U, { children: I ? /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(pt, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => ut({
			...$,
			sources: e
		}),
		options: d,
		onSearchSources: f,
		testIdPrefix: `${N}-slide`
	}), /* @__PURE__ */ W(ye, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${N}-details`,
		children: /* @__PURE__ */ W(_t, {
			slide: $,
			onChange: ut,
			sources: d,
			onSearchSources: f,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${N}-slide`
		})
	})] }) : /* @__PURE__ */ W(_t, {
		slide: $,
		onChange: ut,
		sources: d,
		onSearchSources: f,
		showNotes: !1,
		testIdPrefix: `${N}-slide`
	}) }), zt = /* @__PURE__ */ G("div", {
		className: r("flex items-center justify-center gap-2", k && "ml-auto shrink-0"),
		"data-testid": `${N}-slide-nav`,
		children: [
			/* @__PURE__ */ W(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Ft, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => bt(-1),
				"data-testid": `${N}-previous`
			}),
			/* @__PURE__ */ W(y, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${N}-position`,
				children: `Slide ${Le === 0 ? 0 : Q + 1} of ${Le}`
			}),
			/* @__PURE__ */ W(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Ft, {}),
				disabled: Q >= Le - 1,
				onClick: () => bt(1),
				"data-testid": `${N}-next`
			}),
			/* @__PURE__ */ W(A, {
				value: Z.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Z.length} / 40`,
				className: "ml-2",
				"data-testid": `${N}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ G("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${N}-body`,
		children: [/* @__PURE__ */ W(dt, {
			items: Ye,
			selectedId: $?.id ?? "",
			onSelect: Xe,
			onMove: ot,
			onDuplicate: ct,
			onDelete: lt,
			onAdd: () => st(),
			canAdd: Z.length < 40,
			generatingSlideIds: Ke,
			generatedItems: Ie.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...S ? { slideViewers: S } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${N}-slide`
		}), /* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${N}-main`,
			children: [
				/* @__PURE__ */ W("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${N}-stage-frame`,
					children: /* @__PURE__ */ W(yt, {
						generating: Je,
						label: He ? `Slide ${Q + 1} of ${Le}: ${He}` : "No slide",
						"data-testid": `${N}-stage`,
						children: xt
					})
				}),
				!k && zt,
				Be && /* @__PURE__ */ W(y, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${N}-generated-note`,
					children: `${Be.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				$ && /* @__PURE__ */ G("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ W(Mt, {
						value: $.notes,
						onChange: (e) => ut({
							...$,
							notes: e
						}),
						"data-testid": `${N}-slide-notes`
					}), Rt]
				})
			]
		})]
	}), Vt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (k) {
		let e = /* @__PURE__ */ G("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", M),
			"data-testid": N,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ G("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${N}-deck-line`,
					children: [wt, zt]
				}),
				Dt,
				Bt
			]
		});
		return /* @__PURE__ */ W(U, { children: k({
			toolbar: Et,
			actions: Ct,
			surface: e,
			footer: Lt
		}) });
	}
	return /* @__PURE__ */ G("div", {
		className: r("relative flex h-full min-h-0 flex-col", M),
		"data-testid": N,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ G("div", {
					className: r("flex flex-wrap justify-between gap-2", I ? "items-center" : "items-end"),
					...I ? { "data-testid": `${N}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ W("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${N}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${N}-dock-row`,
				children: /* @__PURE__ */ W(le.Provider, {
					value: "pinned",
					children: Lt
				})
			})
		]
	});
}
//#endregion
export { Xe as A, X as B, Le as C, et as D, Ge as E, Qe as F, be as G, J as H, qe as I, ve as J, K, Ze as L, rt as M, Ye as N, Je as O, nt as P, Ne as R, Re as S, We as T, Y as U, Oe as V, xe as W, _e as Y, ze as _, jt as a, Pe as b, _t as c, ut as d, Ke as f, Be as g, $ as h, bt as i, $e as j, tt as k, pt as l, Ie as m, Mt as n, Ct as o, Fe as p, ye as q, St as r, yt as s, Lt as t, dt as u, Q as v, Ue as w, He as x, Ve as y, Me as z };
