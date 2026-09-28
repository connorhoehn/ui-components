import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i } from "./overlayStack-CHdlnODN.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CypeBEj0.js";
import { t as d } from "./Chip-4IBrlduZ.js";
import { t as f } from "./IconButton-DDeXW3mZ.js";
import { f as p, q as m } from "./Icons-BSEVGRI6.js";
import { i as h, o as g } from "./Breadcrumbs-embdT7_l.js";
import { n as _ } from "./Badge-BGDepkwI.js";
import { t as v } from "./Modal-DMFNRUDx.js";
import { t as y } from "./Input-DLknWXri.js";
import { t as b } from "./EmptyState-zKbpAhFD.js";
import { t as x } from "./ErrorState-Czna8rFK.js";
import { t as S } from "./LoadingState-a2GlKOK1.js";
import { t as C } from "./FormField-E8Z0ppOp.js";
import { n as w } from "./Tabs-CWj6ZL7J.js";
import { t as T } from "./Textarea-Dz4doxTv.js";
import { t as ee } from "./DotMeter-BDVkadI8.js";
import { t as te } from "./SegmentedControl-CKYHtOJ0.js";
import { t as E } from "./SearchInput-BqFaonBP.js";
import { n as ne } from "./RovingToolbar-CmQag9q6.js";
import { t as D } from "./InlineAlert-CRnIKeAF.js";
import { t as O } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as k } from "./SectionLabel-bcrhNYOr.js";
import { t as A } from "./DropdownMenu-CHrQvZgc.js";
import { t as j } from "./StatusPill-C-aN2Pzz.js";
import { n as M } from "./Text-Dl82j5s1.js";
import { t as N } from "./Select-D3fGI8SO.js";
import { G as P, U as F } from "./renderers-DIPIkjU7.js";
import { t as re } from "./useMeasuredWidth-BPrwD0q5.js";
import { r as I } from "./composerCommands-CgPFKkKH.js";
import { i as ie, t as ae } from "./FloatingComposerDock-DMUQCjea.js";
import { Component as oe, Suspense as se, lazy as ce, useCallback as L, useEffect as R, useId as le, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
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
function ge({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c, initialShape: l }) {
	let [u, f] = V([]), [p, m] = V(!1), [h, _] = V(null), [b, x] = V(null), [S, C] = V(""), [w, ee] = V(""), [te, E] = V(!1), [ne, D] = V(""), [O, k] = V("page"), [A, j] = V("blank"), [M, re] = V(""), [I, ie] = V(""), [ae, oe] = V([]), se = B(null), ce = B(null), L = le(), ge = `${L}-blank-label`, _e = `${L}-type-label`, ve = `${L}-cookbook-label`, ye = `${L}-title`, be = `${L}-description`, xe = `${L}-deck-from`, Se = `${L}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		f(r), _(null), x(null), C(""), ee(""), E(!1), D(""), k(l ?? "page"), j("blank"), re(""), ie(""), oe([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), _((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => se.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let Ce = z(() => de.filter((e) => pe(e, S)), [S]), we = z(() => u.filter((e) => me(e, S)), [u, S]), Te = z(() => F.filter((e) => P(e, S)), [S]);
	if (R(() => {
		if (!e || O !== "presentation") return;
		if (A === "blank") {
			oe([]);
			return;
		}
		let t = I.trim().toLowerCase();
		if (A === "transcript") {
			let e = c ?? [];
			oe(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			oe([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(I.trim())).then((e) => {
			n || oe(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		A,
		I,
		c,
		s
	]), !e) return null;
	let Ee = u.find((e) => e.id === h), G = b ? F.find((e) => e.id === b) : void 0, K = O === "sections", De = !!G || !!Ee, Oe = u.length === 0 && !p && !G, q = Ce.length === 0 && we.length === 0 && Te.length === 0, ke = G ? {
		kind: "cookbook",
		cookbook: G
	} : Ee && !ue.has(O) ? {
		kind: "type",
		type: Ee
	} : {
		kind: "blank",
		shape: O
	}, Ae = (e) => {
		if (e.kind === "cookbook") {
			x(e.cookbook.id), ue.has(O) && k("page"), te || ee(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			k(e.shape), ue.has(e.shape) && (x(null), te || ee(""));
			return;
		}
		x(null), _(e.type.id), te || ee("");
	}, je = (e) => e.kind === "blank" ? e.shape : ue.has(O) ? "page" : O, Me = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = ne.trim() || void 0;
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
	}, Ne = O === "presentation" && A !== "blank" && !M, J = !!w.trim() && (!K || De) && !Ne, Y = () => {
		J && Me(ke, w, je(ke));
	};
	return /* @__PURE__ */ U(v, {
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
		children: /* @__PURE__ */ W("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && J && Y();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ U("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ W("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ U(y, {
						ref: se,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: S,
						onChange: (e) => C(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = Te.length > 0 && S.trim() ? {
								kind: "cookbook",
								cookbook: Te[0]
							} : Ce.length > 0 ? {
								kind: "blank",
								shape: Ce[0].id
							} : we.length > 0 ? {
								kind: "type",
								type: we[0]
							} : void 0;
							if (!t) return;
							Ae(t);
							let n = w.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								ce.current?.focus();
								return;
							}
							Me(t, n, je(t));
						}
					}), /* @__PURE__ */ U("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ W("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						Ce.length > 0 && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ U("div", {
								id: ge,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ U("div", {
								role: "group",
								"aria-labelledby": ge,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: Ce.map((e) => /* @__PURE__ */ W(g, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => Ae({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ W("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ U("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ U("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ U(d, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ U("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ U("label", {
									htmlFor: xe,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ U(N, {
									id: xe,
									value: A,
									options: fe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										j(e.target.value), re(""), ie("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ U("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ W("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ U(y, {
										type: "search",
										value: I,
										onChange: (e) => ie(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ae.length === 0 ? /* @__PURE__ */ U("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("label", {
										htmlFor: Se,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ U("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ U(N, {
										id: Se,
										required: !0,
										"aria-required": "true",
										value: M,
										placeholder: "Choose one…",
										options: ae.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => re(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						Te.length > 0 && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ W("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ U("div", {
									id: ve,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ U("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ U("div", {
								role: "group",
								"aria-labelledby": ve,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: Te.map((e) => {
									let t = b === e.id;
									return /* @__PURE__ */ W(g, {
										padding: "md",
										selected: t,
										onSelect: () => Ae({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ W("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ U("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ U("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ U("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ U("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!ue.has(O) && (we.length > 0 || Oe || u.length === 0 && p) && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ W("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ U("span", {
										id: _e,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !K && /* @__PURE__ */ U("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								u.length === 0 && p && /* @__PURE__ */ U("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Oe && /* @__PURE__ */ U("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: K ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								we.length > 0 && /* @__PURE__ */ U("div", {
									role: "group",
									"aria-labelledby": _e,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: we.map((e) => {
										let t = !G && h === e.id;
										return /* @__PURE__ */ W("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Ae({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ U("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ W("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ U("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ U("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ U("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ U("span", {
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
						q && /* @__PURE__ */ W("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								S,
								"”. Clear the search to see every starting point."
							]
						})
					]
				}),
				/* @__PURE__ */ W("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ W("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ W("label", {
							htmlFor: ye,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ U("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ U(y, {
							ref: ce,
							id: ye,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: w,
							onChange: (e) => {
								ee(e.target.value), E(!0);
							},
							placeholder: G ? `e.g. ${G.name}` : Ee ? `e.g. Q2 ${Ee.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("label", {
						htmlFor: be,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ U("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ U(T, {
						id: be,
						"data-testid": "new-doc-description",
						value: ne,
						onChange: (e) => D(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ W("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ U("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ U("button", {
						"data-testid": "new-doc-submit",
						onClick: Y,
						disabled: !J,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", J ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var _e = class extends oe {
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
		return this.state.hasError ? /* @__PURE__ */ W("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ U("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ U("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ U("button", {
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
function ve({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": f }) {
	let p = le(), m = c === 3 ? "h3" : "h2", h = t === 0;
	return /* @__PURE__ */ W("section", {
		"aria-labelledby": p,
		"data-testid": f,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ U(m, {
						id: p,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ U(d, {
						tone: h ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ U("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("span", { className: "flex-1" }), /* @__PURE__ */ U("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			h && o ? /* @__PURE__ */ U(b, {
				size: "sm",
				testId: o.testId ?? (f ? `${f}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ U("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!h && s != null && /* @__PURE__ */ U("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function ye({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ U("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var be = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function xe({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = V(!1), [h, g] = V(e), _ = B(null);
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
	return p ? /* @__PURE__ */ U(y, {
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
	}) : /* @__PURE__ */ U("button", {
		type: "button",
		disabled: s,
		onClick: () => m(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": f,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", be[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var Se = "__older-revisions__";
function Ce(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: Se,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: Se,
		label: `Older versions (${t.count})…`
	}), n;
}
function we(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function Te(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Ee(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || Te(e.target)) return null;
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
function G(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var K = 5;
function De({ back: e }) {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Oe({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: d = "Download .pptx", onOpenPreview: p, pending: m, notice: g, state: _ = "ready", errorMessage: v, ownerName: y, onRetry: C, maxSlideWidth: w, autoFocus: T = !1, className: ee, "data-testid": E = "presentation-view" }) {
	let ne = le(), D = B(null), O = B(!1);
	if (R(() => {
		!T || O.current || !D.current || (O.current = !0, D.current.focus({ preventScroll: !0 }));
	}), _ === "loading") return /* @__PURE__ */ U(S, {
		label: "Opening the presentation…",
		testId: `${E}-loading`
	});
	if (_ === "no-access") return /* @__PURE__ */ U(h, {
		resource: "this presentation",
		ownerName: y ?? null,
		testId: `${E}-no-access`
	});
	if (_ === "error") return /* @__PURE__ */ U(x, {
		title: "This presentation could not be opened",
		...v ? { description: v } : {},
		...C ? {
			actionLabel: "Try again",
			onAction: C
		} : {},
		testId: `${E}-error`
	});
	let A = n.find((e) => e.id === o) ?? n[0], P = A?.slides ?? [];
	if (_ === "empty" || !A || P.length === 0) return /* @__PURE__ */ W("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", ee),
		"data-testid": E,
		children: [/* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ U(M, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ U(M, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${E}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ U(b, {
			title: "No slides yet",
			description: m?.status === "generating" ? `${m.label} is still being generated.` : m?.status === "failed" ? m.message ?? `${m.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${E}-empty`
		})]
	});
	let F = P[Math.min(Math.max(c, 1), P.length) - 1];
	return /* @__PURE__ */ W("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", ee),
		ref: D,
		"data-testid": E,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${F.index} of ${P.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Ee(e);
			if (!t) return;
			e.preventDefault();
			let n = G(t, F.index, P.length);
			n !== F.index && l(n);
		},
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ U(M, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${E}-title`,
						children: e
					}), t && /* @__PURE__ */ U(M, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${E}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > K || (a?.count ?? 0) > 0 ? /* @__PURE__ */ U(N, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: (e) => we(e.target.value, s, a),
							options: Ce(n, a),
							className: "w-auto",
							"data-testid": `${E}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ U(te, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: s,
							options: n.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${E}-revisions`
						}),
						m && /* @__PURE__ */ U(j, {
							state: m.status === "failed" ? "error" : "pending",
							label: `${m.label} ${m.status}`,
							"data-testid": `${E}-pending`
						}),
						u && /* @__PURE__ */ U(i, {
							variant: "secondary",
							size: "sm",
							onClick: u,
							"data-testid": `${E}-download`,
							children: d
						})
					]
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ U("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ U("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: w === void 0 ? void 0 : { maxWidth: w },
							"data-testid": `${E}-stage`,
							children: F.preview ?? /* @__PURE__ */ U(M, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${E}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ W("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ U(f, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ U(De, { back: !0 }),
								disabled: F.index <= 1,
								onClick: () => l(F.index - 1),
								"data-testid": `${E}-previous`
							}),
							/* @__PURE__ */ U(M, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${E}-position`,
								children: `Slide ${F.index} of ${P.length}`
							}),
							/* @__PURE__ */ U(f, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ U(De, {}),
								disabled: F.index >= P.length,
								onClick: () => l(F.index + 1),
								"data-testid": `${E}-next`
							}),
							p && F.preview && /* @__PURE__ */ U(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => p(F.id),
								"data-testid": `${E}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ W("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": ne,
					"data-testid": `${E}-outline`,
					children: [/* @__PURE__ */ U(k, {
						as: "div",
						className: "mb-1",
						"data-testid": `${E}-outline-label`,
						children: /* @__PURE__ */ U("span", {
							id: ne,
							children: "Slides"
						})
					}), /* @__PURE__ */ U("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: P.map((e) => /* @__PURE__ */ U("li", { children: /* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === F.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === F.id && "bg-surface-hover font-medium"),
							"data-testid": `${E}-outline-row`,
							children: [/* @__PURE__ */ U("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ U("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			g && /* @__PURE__ */ U(M, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${E}-notice`,
				children: g
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function q(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function ke() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ae() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function je() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ U("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Me() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Ne({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: p, canDuplicate: m, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: y }) {
	let b = q(i);
	return /* @__PURE__ */ W("li", {
		ref: _,
		"data-testid": `${y}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ U("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ W("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${y}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ U("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ U("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: b ? /* @__PURE__ */ U("img", {
							src: b,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${y}-thumb-${e.id}`
						}) : /* @__PURE__ */ U(M, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ W("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ U(M, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ U(M, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ U(M, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${y}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ U(M, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${y}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ W("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ W("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ U(f, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ U(ke, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${y}-up-${e.id}`
					}), /* @__PURE__ */ U(f, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ U(Ae, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${y}-down-${e.id}`
					})]
				}), /* @__PURE__ */ W("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ U(f, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ U(je, {}),
						disabled: !m,
						onClick: () => d(e.id),
						"data-testid": `${y}-duplicate-${e.id}`
					}), /* @__PURE__ */ U(f, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ U(Me, {}),
						disabled: !h,
						onClick: () => p(e.id),
						"data-testid": `${y}-delete-${e.id}`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideList.tsx
function J({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Ne, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ U("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ U(l, {
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
var Y = 40, Pe = 8, Fe = 200, Ie = 120, Le = 200, Re = 60, X = 2e3, ze = 24, Be = 6, Z = 400, Q = 10, $ = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ve = [
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
var tt = ce(() => import("./SortableSlideList-BZwHdTQS.js"));
function nt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function rt(e, t) {
	nt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function it() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ U("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function at({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = q(e.thumbnailSvg), c = t + 1;
	return /* @__PURE__ */ W("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ U("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ U("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: c
			})
		}), /* @__PURE__ */ W("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${c}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ U("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ W("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ U(M, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ U(M, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ W("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ U(M, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ W(M, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ U(it, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ U("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ U(O, {
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
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ U("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ U("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ U("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function st({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = q(i), S = t + 1, C = e.title || "Untitled slide", w = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => f(t, t - 1),
			"data-testid": `${b}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => f(t, t + 1),
			"data-testid": `${b}-down-${e.id}`
		}] : [],
		...h ? [{
			label: "Duplicate",
			onSelect: () => p(e.id),
			"data-testid": `${b}-duplicate-${e.id}`
		}] : [],
		...g ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => m(e.id),
			"data-testid": `${b}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ W("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", y && "opacity-40"),
		children: [/* @__PURE__ */ W("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ U("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: S
			}), !u && _ && /* @__PURE__ */ U("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: _
			})]
		}), /* @__PURE__ */ W("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ W("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${S}: ${C}`,
					"data-testid": `${b}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [x ? /* @__PURE__ */ U("img", {
						src: x,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${b}-thumb-${e.id}`
					}) : /* @__PURE__ */ W("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ U(M, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: C
						}), /* @__PURE__ */ U(M, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: He[e.layout]
						})]
					}), c && /* @__PURE__ */ U("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${b}-generating-${e.id}`,
						children: /* @__PURE__ */ U(M, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ W("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						x ? /* @__PURE__ */ U(M, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: C
						}) : /* @__PURE__ */ U("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ U(M, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${b}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ U(M, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${b}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ U("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${b}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ U(O, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && w.length > 0 && /* @__PURE__ */ U("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ U(A, {
						trigger: /* @__PURE__ */ U(ot, {}),
						triggerLabel: `Slide ${S} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "bg-surface/90 px-1 py-0.5",
						triggerTestId: `${b}-menu-${e.id}`,
						align: "end",
						sections: [{ items: w }],
						"data-testid": `${b}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function ct({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: h, testIdPrefix: g = "filmstrip" }) {
	let _ = B(null), v = z(() => new Set(u ?? []), [u]), y = z(() => e.map((e) => {
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
	]), b = z(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...v].filter((e) => !t.has(e));
	}, [e, v]);
	R(() => {
		nt(_.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let x = d ?? [], S = [...e.map((e) => e.slide.id), ...x.map((e) => e.id)], C = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = S.indexOf(t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= S.length) return;
		r.preventDefault();
		let s = S[i];
		if (r.altKey) {
			if (p || i >= e.length || o >= e.length) return;
			a(i, o), requestAnimationFrame(() => rt(_.current, s));
			return;
		}
		let c = S[o];
		n(c), rt(_.current, c);
	}, w = {
		items: y,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: st,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ W("div", {
		ref: _,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", h),
		"data-testid": `${g}-strip`,
		onKeyDown: C,
		children: [
			/* @__PURE__ */ U(se, {
				fallback: /* @__PURE__ */ U(J, { ...w }),
				children: U(p ? J : tt, { ...w })
			}),
			b.map((t) => /* @__PURE__ */ W("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ U("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ U("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ U(M, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			x.length > 0 && /* @__PURE__ */ U("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: x.map((r, i) => /* @__PURE__ */ U(at, {
					item: r,
					index: e.length + b.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			c && !p && /* @__PURE__ */ W("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ U("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ U(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ W("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ U(m, { size: 12 }), "Add slide"]
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
	let [l, u] = V(""), [d, f] = V(!1), [p, m] = V(n), h = le(), g = B(0);
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
	})), v = e.length >= 10, y = (n) => {
		v || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), u(""), f(!1));
	}, b = /* @__PURE__ */ U(I, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), x = /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ U(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ U(M, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ U(M, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ U("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ U("li", { children: /* @__PURE__ */ W(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => y(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ U("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: lt[t.kind ?? "document"]
						}),
						/* @__PURE__ */ U("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ U("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ U(k, {
					as: "div",
					children: /* @__PURE__ */ U("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ U(M, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ U("div", {
					className: "min-w-0",
					children: b
				}),
				!o && /* @__PURE__ */ U(i, {
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
		}), !o && d && x]
	}) : /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ U(k, {
				as: "div",
				children: /* @__PURE__ */ U("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ U(D, {
				tone: "warning",
				"data-testid": `${c}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : b,
			!o && x
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function dt() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
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
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ U(k, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ U("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ W("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ U(M, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ U(y, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ U(f, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ U(dt, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ U(i, {
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
	let d = (n, r, i) => {
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
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ U(C, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ U(N, {
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
			}), !n && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: p,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ U(i, {
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
		}), /* @__PURE__ */ U("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ W(u, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ U(l, { children: /* @__PURE__ */ W(o, { children: [
					/* @__PURE__ */ U(c, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ U(c, { children: /* @__PURE__ */ U(y, {
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
					!n && /* @__PURE__ */ U(c, {})
				] }) }), /* @__PURE__ */ U(s, { children: e.labels.map((i, s) => /* @__PURE__ */ W(o, { children: [
					/* @__PURE__ */ U(a, { children: /* @__PURE__ */ U(y, {
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
					e.series.map((e, t) => /* @__PURE__ */ U(a, { children: /* @__PURE__ */ U(y, {
						size: "sm",
						type: "number",
						value: String(e.values[s] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => d(t, s, e.target.value),
						"data-testid": `${r}-value-${t}-${s}`
					}) }, t)),
					!n && /* @__PURE__ */ U(a, { children: /* @__PURE__ */ U(f, {
						"aria-label": `Remove row ${s + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ U(dt, {}),
						disabled: e.labels.length <= 1,
						onClick: () => m(s),
						"data-testid": `${r}-remove-label-${s}`
					}) })
				] }, s)) })]
			})
		})]
	});
}
function mt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ W("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ U(C, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ U(y, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ U(C, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ U(y, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ U(ft, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ U(ft, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ U(ft, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ U(pt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ U(C, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ U(T, {
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
				}), /* @__PURE__ */ U(C, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ U(y, {
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
			e.layout === "image" && /* @__PURE__ */ U(C, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ U(y, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ U(C, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ U(T, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ U(ut, {
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
	return /* @__PURE__ */ U("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ W("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", ht[a]),
			children: [e, t && /* @__PURE__ */ W("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ U("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ U(M, {
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
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ U("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function Tt() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Et() {
	return /* @__PURE__ */ U("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Dt({ label: e, value: t }) {
	return /* @__PURE__ */ W("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ U("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ U("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ U(p, { size: 12 })
		]
	});
}
function Ot({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: p = !1, onPresent: h, end: g, disabled: _ = !1, className: v, testIdPrefix: y = "slides-toolbar", size: b = "auto" }) {
	let { ref: x, ...S } = ne(), { ref: C, width: w } = re(x), T = b === "auto" ? bt(w) : b, ee = xt[T], E = (e) => ee.has(e), D = _, O = !D && e ? {
		label: "Layout of this slide",
		items: Ve.map((t) => ({
			label: He[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${y}-layout-${t}`
		}))
	} : null, k = !D && a ? {
		label: "New slide after this one",
		items: _t.map((e) => ({
			label: `${He[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${y}-insert-${e}`
		}))
	} : null, j = D ? null : {
		label: "Deck theme",
		items: Ue.map((e) => ({
			label: vt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${y}-theme-${e}`
		}))
	}, N = !D && e?.layout === "chart" && e.chart && c ? e.chart : null, P = N && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: N.kind === e,
			onSelect: () => {
				N.kind !== e && c(e);
			},
			"data-testid": `${y}-chart-kind-${e}`
		}))
	} : null, F = [];
	return !E("layout") && O && F.push(O), !E("insert") && k && F.push(k), !E("theme") && j && F.push(j), !E("chart") && P && F.push(P), !E("note") && !D && F.push({
		label: St,
		items: [],
		"data-testid": `${y}-style-note`
	}), /* @__PURE__ */ W("div", {
		...S,
		ref: C,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": T,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", v),
		"data-testid": y,
		children: [
			/* @__PURE__ */ U(i, {
				variant: "primary",
				size: "sm",
				disabled: D || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${y}-new-slide`,
				children: /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ U(m, { size: 12 }), "New slide"]
				})
			}),
			E("layout") && O && e && /* @__PURE__ */ U(A, {
				trigger: /* @__PURE__ */ U(Dt, {
					label: "Layout",
					value: He[e.layout]
				}),
				triggerLabel: `Layout: ${He[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-layout`,
				sections: [O],
				"data-testid": `${y}-layout-menu`
			}),
			E("insert") && k && /* @__PURE__ */ U(A, {
				trigger: /* @__PURE__ */ U(Dt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-insert`,
				sections: [k],
				"data-testid": `${y}-insert-menu`
			}),
			E("theme") && j && /* @__PURE__ */ U(A, {
				trigger: /* @__PURE__ */ U(Dt, {
					label: "Theme",
					value: vt[t]
				}),
				triggerLabel: `Theme: ${vt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-theme`,
				sections: [j],
				"data-testid": `${y}-theme-menu`
			}),
			E("chart") && N && c && /* @__PURE__ */ U(te, {
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
				"data-testid": `${y}-chart-kind`
			}),
			(l || u) && /* @__PURE__ */ W(H, { children: [
				/* @__PURE__ */ U(Et, {}),
				l && /* @__PURE__ */ U(f, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ U(wt, {}),
					disabled: D || !d,
					onClick: l,
					"data-testid": `${y}-undo`
				}),
				u && /* @__PURE__ */ U(f, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ U(wt, { redo: !0 }),
					disabled: D || !p,
					onClick: u,
					"data-testid": `${y}-redo`
				})
			] }),
			F.length > 0 && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(Et, {}), /* @__PURE__ */ U(A, {
				trigger: /* @__PURE__ */ U("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-more`,
				sections: F,
				"data-testid": `${y}-more-menu`
			})] }),
			E("note") && /* @__PURE__ */ U(M, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Ct,
				"data-testid": `${y}-style-note`,
				children: St
			}),
			/* @__PURE__ */ U("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			h && /* @__PURE__ */ U(i, {
				variant: "secondary",
				size: "sm",
				onClick: h,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${y}-present`,
				children: /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ U(Tt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function kt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = X, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = le(), l = le(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ W("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ U(M, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ U(M, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ U(T, {
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
	return /* @__PURE__ */ U(D, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var jt = ce(() => import("./PresentationAgentComposer-DW3-Bfej.js").catch(() => ({ default: At })));
function Mt({ back: e }) {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Nt(e, t) {
	let [n, r] = V({
		past: [],
		future: []
	}), i = B(null), a = B(0);
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
function Pt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: d, onSearchSources: p, onDownload: m, onOpenPresentationView: h, readOnly: g = !1, onInstruct: v, instructHints: T, onUndoInstruct: te, generatingSlideIds: E, slideViewers: ne, selectSlideRequest: O, footer: k, renderFrame: A, onSelectedSlideChange: j, className: P, "data-testid": F = "presentation-editor" }) {
	let [re, I] = V(() => e.slides[0]?.id ?? ""), [oe, ce] = V(!1), [le, ue] = V(null), de = !!v, [fe, pe] = V("slide"), [me, he] = V(!1), [ge, _e] = V(null), [ve, ye] = V(null), [be, Se] = V(() => /* @__PURE__ */ new Set()), { edit: K, undo: De, redo: ke, canUndo: Ae, canRedo: je } = Nt(e, t), [Me, Ne] = V([]);
	R(() => {
		typeof n == "object" && "slides" in n && Ne(n.slides);
	}, [n]);
	let J = B(a);
	J.current = a;
	let Y = e.slides, Pe = z(() => new Set(We(e)), [e]), Fe = Pe.size === 0;
	R(() => {
		Fe && J.current(e);
	}, [e, Fe]);
	let Ie = typeof n == "object" && "slides" in n ? n.slides : Me, Le = z(() => new Map(Ie.map((e) => [e.id, e.svg])), [Ie]), Re = z(() => {
		let e = new Set(Y.map((e) => e.id));
		return Ie.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Ie, Y]), X = Y.length + Re.length, ze = Y.findIndex((e) => e.id === re), Be = ze === -1 ? Re.findIndex((e) => e.id === re) : -1, Z = ze === -1 ? Be === -1 ? 0 : Y.length + Be : ze, Q = ze !== -1 || Be === -1 ? Y[Z] : void 0, $ = Be === -1 ? void 0 : Re[Be], Ve = Q?.id ?? $?.id, He = Q ? Q.title || "Untitled slide" : $?.title, Ue = z(() => [...Y.map((e) => e.id), ...Re.map((e) => e.id)], [Y, Re]), Ge = Math.min(Z, Y.length - 1), Ke = B(j);
	Ke.current = j, R(() => {
		Ve && Ke.current?.(Ve, Z);
	}, [Ve, Z]);
	let qe = z(() => {
		let e = new Set(E ?? []);
		return me && fe === "slide" && Q && e.add(Q.id), [...e];
	}, [
		E,
		me,
		fe,
		Q
	]), tt = !!Q && qe.includes(Q.id), nt = Y.map((e) => ({
		slide: e,
		thumbnailSvg: Le.get(e.id),
		uncited: Pe.has(e.id),
		changed: be.has(e.id)
	})), rt = L((e) => {
		I(e);
	}, []), it = O?.key, at = O?.slideId;
	R(() => {
		at && e.slides.some((e) => e.id === at) && I(at);
	}, [it, at]);
	let ot = L((t, n) => {
		K(Xe(e, t, n));
	}, [K, e]), st = L((t) => {
		let n = Ze(e, Ge, t);
		n !== e && (K(n), I(n.slides[Ge + 1].id));
	}, [
		K,
		e,
		Ge
	]), lt = L((t) => {
		let n = Qe(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		K(n), I(n.slides[r + 1].id);
	}, [K, e]), dt = L((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = $e(e, t);
		r !== e && (K(r), I(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [K, e]), ft = L((t) => K(Ye(e, t)), [K, e]), pt = L(async (e) => {
		if (!v || me) return !1;
		let t = Q?.id;
		he(!0), ye(null);
		try {
			let n = await v(e, fe === "slide" && t ? {
				slideId: t,
				scope: fe
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return Se(new Set(r)), _e(n?.summary?.trim() || "Done."), fe === "deck" && r.length && (!t || !r.includes(t)) && I(r[0]), !0;
		} catch (e) {
			return ye(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			he(!1);
		}
	}, [
		v,
		me,
		fe,
		Q?.id
	]), ht = L(() => {
		te?.(), _e(null), Se(/* @__PURE__ */ new Set());
	}, [te]), _t = Pe.size, vt = !g && Y.length > 0 && _t === 0 && !oe, yt = L(() => {
		vt && (ce(!0), ue(null), Promise.resolve(o(e)).catch((e) => {
			ue(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ce(!1)));
	}, [
		vt,
		o,
		e
	]), bt = L((e) => {
		let t = Ue[Z + e];
		t && I(t);
	}, [Ue, Z]);
	if (R(() => {
		if (g) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), yt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !Te(e.target)) {
				e.preventDefault(), e.shiftKey ? ke() : De();
				return;
			}
			let n = Ee(e);
			if (!n) return;
			e.preventDefault();
			let r = G(n, Z + 1, X);
			r !== Z + 1 && bt(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		yt,
		De,
		ke,
		bt,
		Z,
		X
	]), g) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...Y.map((e, t) => {
				let n = q(Le.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ U("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Re.map((e, t) => {
				let n = q(e.svg);
				return {
					id: e.id,
					index: Y.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ U("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ U(Oe, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = Ue[e - 1];
				t && I(t);
			},
			...m ? { onDownload: m } : {},
			className: P,
			"data-testid": `${F}-readonly`
		});
	}
	let xt = (() => {
		if ($) {
			let e = q($.svg);
			return e ? /* @__PURE__ */ U("img", {
				src: e,
				alt: $.title,
				className: "h-full w-full object-contain",
				"data-testid": `${F}-stage-image`
			}) : /* @__PURE__ */ U(M, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${F}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Q && Pe.has(Q.id)) return /* @__PURE__ */ U(b, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${F}-preview-needs-source`
		});
		let t = Q ? q(Le.get(Q.id)) : void 0;
		if (!Fe && !t) return /* @__PURE__ */ U(b, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${F}-preview-needs-source`
		});
		if (n === "loading" && Le.size === 0) return /* @__PURE__ */ U(S, {
			label: "Rendering the deck…",
			testId: `${F}-preview-loading`
		});
		if (Fe && typeof n == "object" && "error" in n) return /* @__PURE__ */ U(x, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${F}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ U("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${F}-stage-image`
		}) : /* @__PURE__ */ U(M, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${F}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ W("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${F}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ U(N, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => we(e.target.value, l, u),
				options: Ce(St, u),
				className: "w-auto",
				"data-testid": `${F}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ U(w, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${F}-revisions`
			}),
			/* @__PURE__ */ U(i, {
				variant: "primary",
				size: "sm",
				disabled: !vt,
				onClick: yt,
				"data-testid": `${F}-save`,
				children: oe ? "Saving…" : `Save as ${et(s)}`
			}),
			m && /* @__PURE__ */ U(i, {
				variant: "secondary",
				size: "sm",
				onClick: m,
				"data-testid": `${F}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = de || A ? /* @__PURE__ */ W("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ U(xe, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => K({
				...e,
				title: t
			}),
			"data-testid": `${F}-deck-title`
		}), /* @__PURE__ */ U(xe, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => K({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${F}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ W("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ U(C, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ U(y, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => K({
					...e,
					title: t.target.value
				}),
				"data-testid": `${F}-deck-title`
			})
		}), /* @__PURE__ */ U(C, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ U(y, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => K({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${F}-deck-subtitle`
			})
		})]
	}), Tt = h ? () => h(Ve ? {
		slideId: Ve,
		slideIndex: Z + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ U(Ot, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: Y.length < 40,
		onLayoutChange: (t) => {
			Q && K(Ye(e, Je(Q, t)));
		},
		onThemeChange: (t) => K({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && K(Ye(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: De,
		onRedo: ke,
		canUndo: Ae,
		canRedo: je,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${F}-toolbar`
	}), Dt = /* @__PURE__ */ W(H, { children: [_t > 0 && /* @__PURE__ */ U(D, {
		tone: "warning",
		"data-testid": `${F}-uncited-warning`,
		children: _t === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${_t} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), le && /* @__PURE__ */ U(D, {
		tone: "error",
		onDismiss: () => ue(null),
		"data-testid": `${F}-save-error`,
		children: le
	})] }), At = de && /* @__PURE__ */ W(H, { children: [ve && /* @__PURE__ */ U(D, {
		tone: "error",
		onDismiss: () => ye(null),
		"data-testid": `${F}-agent-error`,
		children: ve
	}), ge && !ve && /* @__PURE__ */ W("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${F}-agent-summary`,
		children: [
			/* @__PURE__ */ U(M, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${ge}`
			}),
			be.size > 0 && /* @__PURE__ */ U(M, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: be.size === 1 ? "1 slide marked in the filmstrip" : `${be.size} slides marked in the filmstrip`
			}),
			te && /* @__PURE__ */ U(i, {
				variant: "ghost",
				size: "sm",
				onClick: ht,
				"data-testid": `${F}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Pt = de && Q && /* @__PURE__ */ U(se, {
		fallback: /* @__PURE__ */ U(M, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${F}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ U(jt, {
			scope: fe,
			onScopeChange: pe,
			slideLabel: `slide ${Z + 1}`,
			busy: me,
			onSubmit: pt,
			...T?.length ? { suggestions: T } : {},
			testIdPrefix: F
		})
	}), Ft = {
		selectedSlide: Q,
		...$ ? { selectedGeneratedSlide: $ } : {},
		selectedIndex: Z,
		slideCount: X,
		selectSlide: rt,
		markChanged: (e) => Se(new Set(e))
	}, It = typeof k == "function" ? k(Ft) : k, Lt = It != null && It !== !1 ? It : Pt ? /* @__PURE__ */ U(ie, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${F}-dock-card`,
			children: [At, Pt]
		}),
		"data-testid": `${F}-dock`
	}) : null, Rt = Q && /* @__PURE__ */ U(H, { children: de ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(ut, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => ft({
			...Q,
			sources: e
		}),
		options: d,
		onSearchSources: p,
		testIdPrefix: `${F}-slide`
	}), /* @__PURE__ */ U(_, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${F}-details`,
		children: /* @__PURE__ */ U(mt, {
			slide: Q,
			onChange: ft,
			sources: d,
			onSearchSources: p,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${F}-slide`
		})
	})] }) : /* @__PURE__ */ U(mt, {
		slide: Q,
		onChange: ft,
		sources: d,
		onSearchSources: p,
		showNotes: !1,
		testIdPrefix: `${F}-slide`
	}) }), zt = /* @__PURE__ */ W("div", {
		className: r("flex items-center justify-center gap-2", A && "ml-auto shrink-0"),
		"data-testid": `${F}-slide-nav`,
		children: [
			/* @__PURE__ */ U(f, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(Mt, { back: !0 }),
				disabled: Z <= 0,
				onClick: () => bt(-1),
				"data-testid": `${F}-previous`
			}),
			/* @__PURE__ */ U(M, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${F}-position`,
				children: `Slide ${X === 0 ? 0 : Z + 1} of ${X}`
			}),
			/* @__PURE__ */ U(f, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(Mt, {}),
				disabled: Z >= X - 1,
				onClick: () => bt(1),
				"data-testid": `${F}-next`
			}),
			/* @__PURE__ */ U(ee, {
				value: Y.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Y.length} / 40`,
				className: "ml-2",
				"data-testid": `${F}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ W("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${F}-body`,
		children: [/* @__PURE__ */ U(ct, {
			items: nt,
			selectedId: Q?.id ?? "",
			onSelect: rt,
			onMove: ot,
			onDuplicate: lt,
			onDelete: dt,
			onAdd: () => st(),
			canAdd: Y.length < 40,
			generatingSlideIds: qe,
			generatedItems: Re.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...ne ? { slideViewers: ne } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${F}-slide`
		}), /* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${F}-main`,
			children: [
				/* @__PURE__ */ U("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${F}-stage-frame`,
					children: /* @__PURE__ */ U(gt, {
						generating: tt,
						label: He ? `Slide ${Z + 1} of ${X}: ${He}` : "No slide",
						"data-testid": `${F}-stage`,
						children: xt
					})
				}),
				!A && zt,
				$ && /* @__PURE__ */ U(M, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${F}-generated-note`,
					children: `${$.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Q && /* @__PURE__ */ W("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ U(kt, {
						value: Q.notes,
						onChange: (e) => ft({
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
	if (A) {
		let e = /* @__PURE__ */ W("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", P),
			"data-testid": F,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${F}-deck-line`,
					children: [wt, zt]
				}),
				Dt,
				Bt
			]
		});
		return /* @__PURE__ */ U(H, { children: A({
			toolbar: Et,
			actions: Ct,
			surface: e,
			footer: Lt
		}) });
	}
	return /* @__PURE__ */ W("div", {
		className: r("relative flex h-full min-h-0 flex-col", P),
		"data-testid": F,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ W("div", {
					className: r("flex flex-wrap justify-between gap-2", de ? "items-center" : "items-end"),
					...de ? { "data-testid": `${F}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ U("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${F}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${F}-dock-row`,
				children: /* @__PURE__ */ U(ae.Provider, {
					value: "pinned",
					children: Lt
				})
			})
		]
	});
}
//#endregion
export { qe as A, q as B, Ie as C, Ze as D, He as E, Ye as F, ve as G, Se as H, We as I, ge as J, ye as K, Je as L, et as M, Ke as N, Ge as O, $e as P, J as R, Le as S, Ve as T, Ce as U, Oe as V, xe as W, Re as _, Ot as a, Y as b, mt as c, st as d, Ue as f, Be as g, ze as h, _t as i, Xe as j, Qe as k, ut as l, Fe as m, kt as n, bt as o, Pe as p, _e as q, yt as r, gt as s, Pt as t, ct as u, X as v, $ as w, Q as x, Z as y, Ne as z };
