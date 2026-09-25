import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i } from "./overlayStack-CHdlnODN.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CypeBEj0.js";
import { t as d } from "./IconButton-DDeXW3mZ.js";
import { f, q as p } from "./Icons-BSEVGRI6.js";
import { a as m, c as h, n as g, s as _ } from "./Text-C7sRVNWD.js";
import { t as v } from "./Chip-zdVBwV9j.js";
import { t as y } from "./Modal-DMFNRUDx.js";
import { t as b } from "./Input-DLknWXri.js";
import { t as x } from "./EmptyState-zKbpAhFD.js";
import { n as S, t as C } from "./SegmentedControl-X19S_gNQ.js";
import { n as w, t as T } from "./SearchInput-Dau1QZ7U.js";
import { t as E } from "./FormField-E8Z0ppOp.js";
import { n as ee } from "./Tabs-DjNsAODd.js";
import { t as D } from "./Textarea-Dz4doxTv.js";
import { t as O } from "./DotMeter-BDVkadI8.js";
import { n as te } from "./RovingToolbar-CmQag9q6.js";
import { t as k } from "./InlineAlert-CRnIKeAF.js";
import { t as A } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as j } from "./SectionLabel-bcrhNYOr.js";
import { t as M } from "./DropdownMenu-DqaWOpyO.js";
import { t as N } from "./StatusPill-C-aN2Pzz.js";
import { t as P } from "./Select-D2EQq7Wi.js";
import { G as F, U as I } from "./renderers-CLgJ6UYB.js";
import { t as ne } from "./useMeasuredWidth-BPrwD0q5.js";
import { r as L } from "./composerCommands-DC6fDAfJ.js";
import { i as re, t as ie } from "./FloatingComposerDock-DMUQCjea.js";
import { Component as ae, Suspense as oe, lazy as se, useCallback as R, useEffect as z, useId as ce, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var le = /* @__PURE__ */ new Set(["diagram", "presentation"]), ue = [
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
function he({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c, initialShape: l }) {
	let [u, d] = H([]), [f, p] = H(!1), [m, g] = H(null), [_, x] = H(null), [S, C] = H(""), [w, T] = H(""), [E, ee] = H(!1), [O, te] = H(""), [k, A] = H("page"), [j, M] = H("blank"), [N, ne] = H(""), [L, re] = H(""), [ie, ae] = H([]), oe = V(null), se = V(null), R = ce(), he = `${R}-blank-label`, ge = `${R}-type-label`, _e = `${R}-cookbook-label`, ve = `${R}-title`, ye = `${R}-description`, be = `${R}-deck-from`, xe = `${R}-deck-source`;
	z(() => {
		if (!e) return;
		let r = n();
		d(r), g(null), x(null), C(""), T(""), ee(!1), te(""), A(l ?? "page"), M("blank"), ne(""), re(""), ae([]);
		let i = !1;
		p(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			d(t), g((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || p(!1);
		});
		let a = setTimeout(() => oe.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let Se = B(() => ue.filter((e) => fe(e, S)), [S]), Ce = B(() => u.filter((e) => pe(e, S)), [u, S]), we = B(() => I.filter((e) => F(e, S)), [S]);
	if (z(() => {
		if (!e || k !== "presentation") return;
		if (j === "blank") {
			ae([]);
			return;
		}
		let t = L.trim().toLowerCase();
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
		return Promise.resolve(s(L.trim())).then((e) => {
			n || ae(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		k,
		j,
		L,
		c,
		s
	]), !e) return null;
	let Te = u.find((e) => e.id === m), K = _ ? I.find((e) => e.id === _) : void 0, q = k === "sections", Ee = !!K || !!Te, De = u.length === 0 && !f && !K, J = Se.length === 0 && Ce.length === 0 && we.length === 0, Oe = K ? {
		kind: "cookbook",
		cookbook: K
	} : Te && !le.has(k) ? {
		kind: "type",
		type: Te
	} : {
		kind: "blank",
		shape: k
	}, ke = (e) => {
		if (e.kind === "cookbook") {
			x(e.cookbook.id), le.has(k) && A("page"), E || T(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			A(e.shape), le.has(e.shape) && (x(null), E || T(""));
			return;
		}
		x(null), g(e.type.id), E || T("");
	}, Ae = (e) => e.kind === "blank" ? e.shape : le.has(k) ? "page" : k, je = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = O.trim() || void 0;
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
	}, Me = k === "presentation" && j !== "blank" && !N, Y = !!w.trim() && (!q || Ee) && !Me, X = () => {
		Y && je(Oe, w, Ae(Oe));
	};
	return /* @__PURE__ */ W(y, {
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
				e.key === "Enter" && !e.shiftKey && Y && X();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ W("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ G("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ W(b, {
						ref: oe,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: S,
						onChange: (e) => C(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = we.length > 0 && S.trim() ? {
								kind: "cookbook",
								cookbook: we[0]
							} : Se.length > 0 ? {
								kind: "blank",
								shape: Se[0].id
							} : Ce.length > 0 ? {
								kind: "type",
								type: Ce[0]
							} : void 0;
							if (!t) return;
							ke(t);
							let n = w.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								se.current?.focus();
								return;
							}
							je(t, n, Ae(t));
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
						Se.length > 0 && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ W("div", {
								id: he,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": he,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: Se.map((e) => /* @__PURE__ */ G(h, {
									padding: "md",
									selected: k === e.id,
									onSelect: () => ke({
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
											e.id === "page" && /* @__PURE__ */ W(v, {
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
						k === "presentation" && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ W("label", {
									htmlFor: be,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ W(P, {
									id: be,
									value: j,
									options: de.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										M(e.target.value), ne(""), re("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ W("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: j === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								j !== "blank" && /* @__PURE__ */ G("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ W(b, {
										type: "search",
										value: L,
										onChange: (e) => re(e.target.value),
										"aria-label": j === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: j === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ie.length === 0 ? /* @__PURE__ */ W("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: j === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G("label", {
										htmlFor: xe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											j === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ W("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ W(P, {
										id: xe,
										required: !0,
										"aria-required": "true",
										value: N,
										placeholder: "Choose one…",
										options: ie.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => ne(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						we.length > 0 && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ G("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ W("div", {
									id: _e,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ W("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: k === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : k === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : k === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": _e,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: we.map((e) => {
									let t = _ === e.id;
									return /* @__PURE__ */ G(h, {
										padding: "md",
										selected: t,
										onSelect: () => ke({
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
						!le.has(k) && (Ce.length > 0 || De || u.length === 0 && f) && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ G("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ W("span", {
										id: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !q && /* @__PURE__ */ W("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								u.length === 0 && f && /* @__PURE__ */ W("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								De && /* @__PURE__ */ W("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: q ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								Ce.length > 0 && /* @__PURE__ */ W("div", {
									role: "group",
									"aria-labelledby": ge,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Ce.map((e) => {
										let t = !K && m === e.id;
										return /* @__PURE__ */ G("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => ke({
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
															children: k === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
						J && /* @__PURE__ */ G("div", {
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
				/* @__PURE__ */ G("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ G("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ G("label", {
							htmlFor: ve,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ W("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ W(b, {
							ref: se,
							id: ve,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: w,
							onChange: (e) => {
								T(e.target.value), ee(!0);
							},
							placeholder: K ? `e.g. ${K.name}` : Te ? `e.g. Q2 ${Te.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("label", {
						htmlFor: ye,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ W("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ W(D, {
						id: ye,
						"data-testid": "new-doc-description",
						value: O,
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
						onClick: X,
						disabled: !Y,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Y ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var ge = class extends ae {
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
//#region src/components/inbox/InboxSection.tsx
function _e({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = ce(), p = c === 3 ? "h3" : "h2", m = t === 0;
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
					/* @__PURE__ */ W(v, {
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
			m && o ? /* @__PURE__ */ W(x, {
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
function ve({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ W("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var ye = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function be({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = H(!1), [h, g] = H(e), _ = V(null);
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
	return p ? /* @__PURE__ */ W(b, {
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
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", ye[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var xe = "__older-revisions__";
function Se(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: xe,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: xe,
		label: `Older versions (${t.count})…`
	}), n;
}
function Ce(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function we(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Te(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || we(e.target)) return null;
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
function K(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var q = 5;
function Ee({ back: e }) {
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
function De({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: f = "Download .pptx", onOpenPreview: p, pending: h, notice: _, state: v = "ready", errorMessage: y, ownerName: b, onRetry: T, maxSlideWidth: E, autoFocus: ee = !1, className: D, "data-testid": O = "presentation-view" }) {
	let te = ce(), k = V(null), A = V(!1);
	if (z(() => {
		!ee || A.current || !k.current || (A.current = !0, k.current.focus({ preventScroll: !0 }));
	}), v === "loading") return /* @__PURE__ */ W(w, {
		label: "Opening the presentation…",
		testId: `${O}-loading`
	});
	if (v === "no-access") return /* @__PURE__ */ W(m, {
		resource: "this presentation",
		ownerName: b ?? null,
		testId: `${O}-no-access`
	});
	if (v === "error") return /* @__PURE__ */ W(S, {
		title: "This presentation could not be opened",
		...y ? { description: y } : {},
		...T ? {
			actionLabel: "Try again",
			onAction: T
		} : {},
		testId: `${O}-error`
	});
	let M = n.find((e) => e.id === o) ?? n[0], F = M?.slides ?? [];
	if (v === "empty" || !M || F.length === 0) return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", D),
		"data-testid": O,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ W(g, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ W(g, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${O}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ W(x, {
			title: "No slides yet",
			description: h?.status === "generating" ? `${h.label} is still being generated.` : h?.status === "failed" ? h.message ?? `${h.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${O}-empty`
		})]
	});
	let I = F[Math.min(Math.max(c, 1), F.length) - 1];
	return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", D),
		ref: k,
		"data-testid": O,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${I.index} of ${F.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Te(e);
			if (!t) return;
			e.preventDefault();
			let n = K(t, I.index, F.length);
			n !== I.index && l(n);
		},
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ G("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ W(g, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${O}-title`,
						children: e
					}), t && /* @__PURE__ */ W(g, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${O}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ G("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > q || (a?.count ?? 0) > 0 ? /* @__PURE__ */ W(P, {
							"aria-label": "Revision",
							size: "sm",
							value: M.id,
							onChange: (e) => Ce(e.target.value, s, a),
							options: Se(n, a),
							className: "w-auto",
							"data-testid": `${O}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ W(C, {
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
						h && /* @__PURE__ */ W(N, {
							state: h.status === "failed" ? "error" : "pending",
							label: `${h.label} ${h.status}`,
							"data-testid": `${O}-pending`
						}),
						u && /* @__PURE__ */ W(i, {
							variant: "secondary",
							size: "sm",
							onClick: u,
							"data-testid": `${O}-download`,
							children: f
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
							style: E === void 0 ? void 0 : { maxWidth: E },
							"data-testid": `${O}-stage`,
							children: I.preview ?? /* @__PURE__ */ W(g, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${O}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ G("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ W(d, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(Ee, { back: !0 }),
								disabled: I.index <= 1,
								onClick: () => l(I.index - 1),
								"data-testid": `${O}-previous`
							}),
							/* @__PURE__ */ W(g, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${O}-position`,
								children: `Slide ${I.index} of ${F.length}`
							}),
							/* @__PURE__ */ W(d, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(Ee, {}),
								disabled: I.index >= F.length,
								onClick: () => l(I.index + 1),
								"data-testid": `${O}-next`
							}),
							p && I.preview && /* @__PURE__ */ W(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => p(I.id),
								"data-testid": `${O}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ G("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": te,
					"data-testid": `${O}-outline`,
					children: [/* @__PURE__ */ W(j, {
						as: "div",
						className: "mb-1",
						"data-testid": `${O}-outline-label`,
						children: /* @__PURE__ */ W("span", {
							id: te,
							children: "Slides"
						})
					}), /* @__PURE__ */ W("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: F.map((e) => /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === I.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === I.id && "bg-surface-hover font-medium"),
							"data-testid": `${O}-outline-row`,
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
			_ && /* @__PURE__ */ W(g, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${O}-notice`,
				children: _
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function J(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Oe() {
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
function ke() {
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
function Ae() {
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
function je() {
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
function Me({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: f, onDelete: p, canDuplicate: m, canDelete: h, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = J(i);
	return /* @__PURE__ */ G("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (_ ?? /* @__PURE__ */ W("span", {
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
						}) : /* @__PURE__ */ W(g, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ G("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ W(g, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ W(g, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ W(g, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ W(g, {
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
					children: [/* @__PURE__ */ W(d, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Oe, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ W(d, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(ke, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ G("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ W(d, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Ae, {}),
						disabled: !m,
						onClick: () => f(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ W(d, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(je, {}),
						disabled: !h,
						onClick: () => p(e.id),
						"data-testid": `${b}-delete-${e.id}`
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideList.tsx
function Y({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Me, listClassName: u, testIdPrefix: d }) {
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
var X = 40, Ne = 8, Pe = 200, Fe = 120, Ie = 200, Le = 60, Re = 2e3, ze = 24, Be = 6, Z = 400, Q = 10, $ = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ve = [
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
var tt = se(() => import("./SortableSlideList-BCBhF0rL.js"));
function nt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function rt(e, t) {
	nt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function it() {
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
function at({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = J(e.thumbnailSvg), c = t + 1;
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
						children: [/* @__PURE__ */ W(g, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ W(g, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ W(g, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ G(g, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ W(it, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(A, {
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
function st({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: _, dragHandle: v, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = J(i), C = t + 1, w = e.title || "Untitled slide", T = [
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
		..._ ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => m(e.id),
			"data-testid": `${x}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ G("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ G("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ W("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
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
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ W("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ G("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ W(g, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ W(g, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: He[e.layout]
						})]
					}), c && /* @__PURE__ */ W("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ W(g, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						S ? /* @__PURE__ */ W(g, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}) : /* @__PURE__ */ W("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ W(g, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ W(g, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${x}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(A, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && T.length > 0 && /* @__PURE__ */ W("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ W(M, {
						trigger: /* @__PURE__ */ W(ot, {}),
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
function ct({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: m = !1, className: h, testIdPrefix: _ = "filmstrip" }) {
	let v = V(null), y = B(() => new Set(u ?? []), [u]), b = B(() => e.map((e) => {
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
	]), x = B(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	z(() => {
		nt(v.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			if (m || i >= e.length || o >= e.length) return;
			a(i, o), requestAnimationFrame(() => rt(v.current, s));
			return;
		}
		let c = C[o];
		n(c), rt(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: st,
		listClassName: "gap-2.5",
		testIdPrefix: _
	};
	return /* @__PURE__ */ G("div", {
		ref: v,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", h),
		"data-testid": `${_}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ W(oe, {
				fallback: /* @__PURE__ */ W(Y, { ...T }),
				children: W(m ? Y : tt, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ G("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${_}-placeholder-${t}`,
				children: [/* @__PURE__ */ W("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ W("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ W(g, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ W("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${_}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ W(at, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: _
				}, r.id))
			}),
			c && !m && /* @__PURE__ */ G("div", {
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
					"data-testid": `${_}-add`,
					children: /* @__PURE__ */ G("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ W(p, { size: 12 }), "Add slide"]
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
	let [l, u] = H(""), [d, f] = H(!1), [p, m] = H(n), h = ce(), _ = V(0);
	z(() => {
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
	}, x = /* @__PURE__ */ W(L, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ W(T, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ W(g, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ W(g, {
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
							children: lt[t.kind ?? "document"]
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
				/* @__PURE__ */ W(j, {
					as: "div",
					children: /* @__PURE__ */ W("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ W(g, {
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
					disabled: y && !d,
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
			/* @__PURE__ */ W(j, {
				as: "div",
				children: /* @__PURE__ */ W("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ W(k, {
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
function ft({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ W(j, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ W("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ G("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ W(g, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ W(b, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ W(d, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ W(dt, {}),
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
function pt({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
				onClick: p,
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
			children: /* @__PURE__ */ G(u, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ W(l, { children: /* @__PURE__ */ G(o, { children: [
					/* @__PURE__ */ W(c, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(b, {
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
					!n && /* @__PURE__ */ W(c, {})
				] }) }), /* @__PURE__ */ W(s, { children: e.labels.map((i, s) => /* @__PURE__ */ G(o, { children: [
					/* @__PURE__ */ W(a, { children: /* @__PURE__ */ W(b, {
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
					e.series.map((e, t) => /* @__PURE__ */ W(a, { children: /* @__PURE__ */ W(b, {
						size: "sm",
						type: "number",
						value: String(e.values[s] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => f(t, s, e.target.value),
						"data-testid": `${r}-value-${t}-${s}`
					}) }, t)),
					!n && /* @__PURE__ */ W(a, { children: /* @__PURE__ */ W(d, {
						"aria-label": `Remove row ${s + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(dt, {}),
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
	return /* @__PURE__ */ G("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ W(E, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ W(b, {
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
					children: (t) => /* @__PURE__ */ W(b, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ W(ft, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ W(ft, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ W(ft, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ W(pt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ W(E, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ W(D, {
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
					children: (t) => /* @__PURE__ */ W(b, {
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
				children: (t) => /* @__PURE__ */ W(b, {
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
				children: (t) => /* @__PURE__ */ W(D, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ W(ut, {
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
	return /* @__PURE__ */ W("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ G("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", ht[a]),
			children: [e, t && /* @__PURE__ */ G("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ W("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(g, {
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
function Tt() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Et() {
	return /* @__PURE__ */ W("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Dt({ label: e, value: t }) {
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
			/* @__PURE__ */ W(f, { size: 12 })
		]
	});
}
function Ot({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: f = !1, canRedo: m = !1, onPresent: h, end: _, disabled: v = !1, className: y, testIdPrefix: b = "slides-toolbar", size: x = "auto" }) {
	let { ref: S, ...w } = te(), { ref: T, width: E } = ne(S), ee = x === "auto" ? bt(E) : x, D = xt[ee], O = (e) => D.has(e), k = v, A = !k && e ? {
		label: "Layout of this slide",
		items: Ve.map((t) => ({
			label: He[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${b}-layout-${t}`
		}))
	} : null, j = !k && a ? {
		label: "New slide after this one",
		items: _t.map((e) => ({
			label: `${He[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${b}-insert-${e}`
		}))
	} : null, N = k ? null : {
		label: "Deck theme",
		items: Ue.map((e) => ({
			label: vt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${b}-theme-${e}`
		}))
	}, P = !k && e?.layout === "chart" && e.chart && c ? e.chart : null, F = P && c ? {
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
	return !O("layout") && A && I.push(A), !O("insert") && j && I.push(j), !O("theme") && N && I.push(N), !O("chart") && F && I.push(F), !O("note") && !k && I.push({
		label: St,
		items: [],
		"data-testid": `${b}-style-note`
	}), /* @__PURE__ */ G("div", {
		...w,
		ref: T,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": ee,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", y),
		"data-testid": b,
		children: [
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: k || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${b}-new-slide`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ W(p, { size: 12 }), "New slide"]
				})
			}),
			O("layout") && A && e && /* @__PURE__ */ W(M, {
				trigger: /* @__PURE__ */ W(Dt, {
					label: "Layout",
					value: He[e.layout]
				}),
				triggerLabel: `Layout: ${He[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-layout`,
				sections: [A],
				"data-testid": `${b}-layout-menu`
			}),
			O("insert") && j && /* @__PURE__ */ W(M, {
				trigger: /* @__PURE__ */ W(Dt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-insert`,
				sections: [j],
				"data-testid": `${b}-insert-menu`
			}),
			O("theme") && N && /* @__PURE__ */ W(M, {
				trigger: /* @__PURE__ */ W(Dt, {
					label: "Theme",
					value: vt[t]
				}),
				triggerLabel: `Theme: ${vt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${b}-theme`,
				sections: [N],
				"data-testid": `${b}-theme-menu`
			}),
			O("chart") && P && c && /* @__PURE__ */ W(C, {
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
			(l || u) && /* @__PURE__ */ G(U, { children: [
				/* @__PURE__ */ W(Et, {}),
				l && /* @__PURE__ */ W(d, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(wt, {}),
					disabled: k || !f,
					onClick: l,
					"data-testid": `${b}-undo`
				}),
				u && /* @__PURE__ */ W(d, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(wt, { redo: !0 }),
					disabled: k || !m,
					onClick: u,
					"data-testid": `${b}-redo`
				})
			] }),
			I.length > 0 && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(Et, {}), /* @__PURE__ */ W(M, {
				trigger: /* @__PURE__ */ W("span", {
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
			O("note") && /* @__PURE__ */ W(g, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Ct,
				"data-testid": `${b}-style-note`,
				children: St
			}),
			/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			_,
			h && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: h,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${b}-present`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ W(Tt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function kt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Re, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = ce(), l = ce(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ G("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ W(g, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ W(g, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ W(D, {
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
	return /* @__PURE__ */ W(k, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var jt = se(() => import("./PresentationAgentComposer-B8ZZARp9.js").catch(() => ({ default: At })));
function Mt({ back: e }) {
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
function Nt(e, t) {
	let [n, r] = H({
		past: [],
		future: []
	}), i = V(null), a = V(0);
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
function Pt({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: f, onSearchSources: p, onDownload: m, onOpenPresentationView: h, readOnly: v = !1, onInstruct: y, instructHints: C, onUndoInstruct: T, generatingSlideIds: D, slideViewers: te, selectSlideRequest: A, footer: j, renderFrame: M, onSelectedSlideChange: N, className: F, "data-testid": I = "presentation-editor" }) {
	let [ne, L] = H(() => e.slides[0]?.id ?? ""), [ae, se] = H(!1), [ce, le] = H(null), ue = !!y, [de, fe] = H("slide"), [pe, me] = H(!1), [he, ge] = H(null), [_e, ve] = H(null), [ye, xe] = H(() => /* @__PURE__ */ new Set()), { edit: q, undo: Ee, redo: Oe, canUndo: ke, canRedo: Ae } = Nt(e, t), [je, Me] = H([]);
	z(() => {
		typeof n == "object" && "slides" in n && Me(n.slides);
	}, [n]);
	let Y = V(a);
	Y.current = a;
	let X = e.slides, Ne = B(() => new Set(We(e)), [e]), Pe = Ne.size === 0;
	z(() => {
		Pe && Y.current(e);
	}, [e, Pe]);
	let Fe = typeof n == "object" && "slides" in n ? n.slides : je, Ie = B(() => new Map(Fe.map((e) => [e.id, e.svg])), [Fe]), Le = B(() => {
		let e = new Set(X.map((e) => e.id));
		return Fe.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Fe, X]), Re = X.length + Le.length, ze = X.findIndex((e) => e.id === ne), Be = ze === -1 ? Le.findIndex((e) => e.id === ne) : -1, Z = ze === -1 ? Be === -1 ? 0 : X.length + Be : ze, Q = ze !== -1 || Be === -1 ? X[Z] : void 0, $ = Be === -1 ? void 0 : Le[Be], Ve = Q?.id ?? $?.id, He = Q ? Q.title || "Untitled slide" : $?.title, Ue = B(() => [...X.map((e) => e.id), ...Le.map((e) => e.id)], [X, Le]), Ge = Math.min(Z, X.length - 1), Ke = V(N);
	Ke.current = N, z(() => {
		Ve && Ke.current?.(Ve, Z);
	}, [Ve, Z]);
	let qe = B(() => {
		let e = new Set(D ?? []);
		return pe && de === "slide" && Q && e.add(Q.id), [...e];
	}, [
		D,
		pe,
		de,
		Q
	]), tt = !!Q && qe.includes(Q.id), nt = X.map((e) => ({
		slide: e,
		thumbnailSvg: Ie.get(e.id),
		uncited: Ne.has(e.id),
		changed: ye.has(e.id)
	})), rt = R((e) => {
		L(e);
	}, []), it = A?.key, at = A?.slideId;
	z(() => {
		at && e.slides.some((e) => e.id === at) && L(at);
	}, [it, at]);
	let ot = R((t, n) => {
		q(Xe(e, t, n));
	}, [q, e]), st = R((t) => {
		let n = Ze(e, Ge, t);
		n !== e && (q(n), L(n.slides[Ge + 1].id));
	}, [
		q,
		e,
		Ge
	]), lt = R((t) => {
		let n = Qe(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		q(n), L(n.slides[r + 1].id);
	}, [q, e]), dt = R((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = $e(e, t);
		r !== e && (q(r), L(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [q, e]), ft = R((t) => q(Ye(e, t)), [q, e]), pt = R(async (e) => {
		if (!y || pe) return !1;
		let t = Q?.id;
		me(!0), ve(null);
		try {
			let n = await y(e, de === "slide" && t ? {
				slideId: t,
				scope: de
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return xe(new Set(r)), ge(n?.summary?.trim() || "Done."), de === "deck" && r.length && (!t || !r.includes(t)) && L(r[0]), !0;
		} catch (e) {
			return ve(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			me(!1);
		}
	}, [
		y,
		pe,
		de,
		Q?.id
	]), ht = R(() => {
		T?.(), ge(null), xe(/* @__PURE__ */ new Set());
	}, [T]), _t = Ne.size, vt = !v && X.length > 0 && _t === 0 && !ae, yt = R(() => {
		vt && (se(!0), le(null), Promise.resolve(o(e)).catch((e) => {
			le(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => se(!1)));
	}, [
		vt,
		o,
		e
	]), bt = R((e) => {
		let t = Ue[Z + e];
		t && L(t);
	}, [Ue, Z]);
	if (z(() => {
		if (v) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), yt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !we(e.target)) {
				e.preventDefault(), e.shiftKey ? Oe() : Ee();
				return;
			}
			let n = Te(e);
			if (!n) return;
			e.preventDefault();
			let r = K(n, Z + 1, Re);
			r !== Z + 1 && bt(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		v,
		yt,
		Ee,
		Oe,
		bt,
		Z,
		Re
	]), v) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...X.map((e, t) => {
				let n = J(Ie.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Le.map((e, t) => {
				let n = J(e.svg);
				return {
					id: e.id,
					index: X.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ W(De, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = Ue[e - 1];
				t && L(t);
			},
			...m ? { onDownload: m } : {},
			className: F,
			"data-testid": `${I}-readonly`
		});
	}
	let xt = (() => {
		if ($) {
			let e = J($.svg);
			return e ? /* @__PURE__ */ W("img", {
				src: e,
				alt: $.title,
				className: "h-full w-full object-contain",
				"data-testid": `${I}-stage-image`
			}) : /* @__PURE__ */ W(g, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${I}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Q && Ne.has(Q.id)) return /* @__PURE__ */ W(x, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${I}-preview-needs-source`
		});
		let t = Q ? J(Ie.get(Q.id)) : void 0;
		if (!Pe && !t) return /* @__PURE__ */ W(x, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${I}-preview-needs-source`
		});
		if (n === "loading" && Ie.size === 0) return /* @__PURE__ */ W(w, {
			label: "Rendering the deck…",
			testId: `${I}-preview-loading`
		});
		if (Pe && typeof n == "object" && "error" in n) return /* @__PURE__ */ W(S, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${I}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ W("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${I}-stage-image`
		}) : /* @__PURE__ */ W(g, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${I}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ G("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${I}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ W(P, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => Ce(e.target.value, l, u),
				options: Se(St, u),
				className: "w-auto",
				"data-testid": `${I}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ W(ee, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${I}-revisions`
			}),
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: !vt,
				onClick: yt,
				"data-testid": `${I}-save`,
				children: ae ? "Saving…" : `Save as ${et(s)}`
			}),
			m && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: m,
				"data-testid": `${I}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = ue || M ? /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ W(be, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => q({
				...e,
				title: t
			}),
			"data-testid": `${I}-deck-title`
		}), /* @__PURE__ */ W(be, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => q({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${I}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ G("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ W(E, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ W(b, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => q({
					...e,
					title: t.target.value
				}),
				"data-testid": `${I}-deck-title`
			})
		}), /* @__PURE__ */ W(E, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ W(b, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => q({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${I}-deck-subtitle`
			})
		})]
	}), Tt = h ? () => h(Ve ? {
		slideId: Ve,
		slideIndex: Z + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ W(Ot, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: X.length < 40,
		onLayoutChange: (t) => {
			Q && q(Ye(e, Je(Q, t)));
		},
		onThemeChange: (t) => q({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && q(Ye(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: Ee,
		onRedo: Oe,
		canUndo: ke,
		canRedo: Ae,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${I}-toolbar`
	}), Dt = /* @__PURE__ */ G(U, { children: [_t > 0 && /* @__PURE__ */ W(k, {
		tone: "warning",
		"data-testid": `${I}-uncited-warning`,
		children: _t === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${_t} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ce && /* @__PURE__ */ W(k, {
		tone: "error",
		onDismiss: () => le(null),
		"data-testid": `${I}-save-error`,
		children: ce
	})] }), At = ue && /* @__PURE__ */ G(U, { children: [_e && /* @__PURE__ */ W(k, {
		tone: "error",
		onDismiss: () => ve(null),
		"data-testid": `${I}-agent-error`,
		children: _e
	}), he && !_e && /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${I}-agent-summary`,
		children: [
			/* @__PURE__ */ W(g, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${he}`
			}),
			ye.size > 0 && /* @__PURE__ */ W(g, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: ye.size === 1 ? "1 slide marked in the filmstrip" : `${ye.size} slides marked in the filmstrip`
			}),
			T && /* @__PURE__ */ W(i, {
				variant: "ghost",
				size: "sm",
				onClick: ht,
				"data-testid": `${I}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Pt = ue && Q && /* @__PURE__ */ W(oe, {
		fallback: /* @__PURE__ */ W(g, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${I}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ W(jt, {
			scope: de,
			onScopeChange: fe,
			slideLabel: `slide ${Z + 1}`,
			busy: pe,
			onSubmit: pt,
			...C?.length ? { suggestions: C } : {},
			testIdPrefix: I
		})
	}), Ft = {
		selectedSlide: Q,
		...$ ? { selectedGeneratedSlide: $ } : {},
		selectedIndex: Z,
		slideCount: Re,
		selectSlide: rt,
		markChanged: (e) => xe(new Set(e))
	}, It = typeof j == "function" ? j(Ft) : j, Lt = It != null && It !== !1 ? It : Pt ? /* @__PURE__ */ W(re, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ G("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${I}-dock-card`,
			children: [At, Pt]
		}),
		"data-testid": `${I}-dock`
	}) : null, Rt = Q && /* @__PURE__ */ W(U, { children: ue ? /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(ut, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => ft({
			...Q,
			sources: e
		}),
		options: f,
		onSearchSources: p,
		testIdPrefix: `${I}-slide`
	}), /* @__PURE__ */ W(_, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${I}-details`,
		children: /* @__PURE__ */ W(mt, {
			slide: Q,
			onChange: ft,
			sources: f,
			onSearchSources: p,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${I}-slide`
		})
	})] }) : /* @__PURE__ */ W(mt, {
		slide: Q,
		onChange: ft,
		sources: f,
		onSearchSources: p,
		showNotes: !1,
		testIdPrefix: `${I}-slide`
	}) }), zt = /* @__PURE__ */ G("div", {
		className: r("flex items-center justify-center gap-2", M && "ml-auto shrink-0"),
		"data-testid": `${I}-slide-nav`,
		children: [
			/* @__PURE__ */ W(d, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Mt, { back: !0 }),
				disabled: Z <= 0,
				onClick: () => bt(-1),
				"data-testid": `${I}-previous`
			}),
			/* @__PURE__ */ W(g, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${I}-position`,
				children: `Slide ${Re === 0 ? 0 : Z + 1} of ${Re}`
			}),
			/* @__PURE__ */ W(d, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Mt, {}),
				disabled: Z >= Re - 1,
				onClick: () => bt(1),
				"data-testid": `${I}-next`
			}),
			/* @__PURE__ */ W(O, {
				value: X.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${X.length} / 40`,
				className: "ml-2",
				"data-testid": `${I}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ G("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${I}-body`,
		children: [/* @__PURE__ */ W(ct, {
			items: nt,
			selectedId: Q?.id ?? "",
			onSelect: rt,
			onMove: ot,
			onDuplicate: lt,
			onDelete: dt,
			onAdd: () => st(),
			canAdd: X.length < 40,
			generatingSlideIds: qe,
			generatedItems: Le.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...te ? { slideViewers: te } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${I}-slide`
		}), /* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${I}-main`,
			children: [
				/* @__PURE__ */ W("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${I}-stage-frame`,
					children: /* @__PURE__ */ W(gt, {
						generating: tt,
						label: He ? `Slide ${Z + 1} of ${Re}: ${He}` : "No slide",
						"data-testid": `${I}-stage`,
						children: xt
					})
				}),
				!M && zt,
				$ && /* @__PURE__ */ W(g, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${I}-generated-note`,
					children: `${$.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Q && /* @__PURE__ */ G("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ W(kt, {
						value: Q.notes,
						onChange: (e) => ft({
							...Q,
							notes: e
						}),
						"data-testid": `${I}-slide-notes`
					}), Rt]
				})
			]
		})]
	}), Vt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (M) {
		let e = /* @__PURE__ */ G("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", F),
			"data-testid": I,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ G("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${I}-deck-line`,
					children: [wt, zt]
				}),
				Dt,
				Bt
			]
		});
		return /* @__PURE__ */ W(U, { children: M({
			toolbar: Et,
			actions: Ct,
			surface: e,
			footer: Lt
		}) });
	}
	return /* @__PURE__ */ G("div", {
		className: r("relative flex h-full min-h-0 flex-col", F),
		"data-testid": I,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ G("div", {
					className: r("flex flex-wrap justify-between gap-2", ue ? "items-center" : "items-end"),
					...ue ? { "data-testid": `${I}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ W("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${I}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${I}-dock-row`,
				children: /* @__PURE__ */ W(ie.Provider, {
					value: "pinned",
					children: Lt
				})
			})
		]
	});
}
//#endregion
export { qe as A, J as B, Fe as C, Ze as D, He as E, Ye as F, _e as G, xe as H, We as I, he as J, ve as K, Je as L, et as M, Ke as N, Ge as O, $e as P, Y as R, Ie as S, Ve as T, Se as U, De as V, be as W, Le as _, Ot as a, X as b, mt as c, st as d, Ue as f, Be as g, ze as h, _t as i, Xe as j, Qe as k, ut as l, Pe as m, kt as n, bt as o, Ne as p, ge as q, yt as r, gt as s, Pt as t, ct as u, Re as v, $ as w, Q as x, Z as y, Me as z };
