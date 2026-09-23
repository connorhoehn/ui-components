import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i, h as a, l as o, u as s } from "./overlayStack-BDlo8PJg.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-CypeBEj0.js";
import { t as m } from "./IconButton-C3DMtvSx.js";
import { T as h, c as g, t as _ } from "./DropdownMenu-DKjyJHNc.js";
import { n as v, s as y } from "./Text--OOYo_KJ.js";
import { t as b } from "./Chip-DYqbAD3L.js";
import { t as x } from "./Modal-D2qxMX2_.js";
import { t as S } from "./EmptyState-DQYx5Oyy.js";
import { i as C, n as w, r as T, t as E } from "./SearchInput-DXbGHmns.js";
import { t as D } from "./FormField-E8Z0ppOp.js";
import { n as O } from "./Tabs-BGZyr2nH.js";
import { t as k } from "./Input-DLknWXri.js";
import { t as A } from "./Textarea-Dz4doxTv.js";
import { t as ee } from "./DotMeter-BDVkadI8.js";
import { n as j } from "./RovingToolbar-CmQag9q6.js";
import { t as te } from "./InlineAlert-CRnIKeAF.js";
import { t as M } from "./PresenceAvatars-CubTOqbV.js";
import { t as N } from "./SectionLabel-bcrhNYOr.js";
import { t as ne } from "./StatusPill-Db42eiME.js";
import { t as re } from "./Select-CD8ixtYi.js";
import { G as P, U as ie } from "./renderers-5O9bh08s.js";
import { t as ae } from "./ComposerReferences-BDud81lg.js";
import { Component as oe, Suspense as se, createContext as ce, lazy as F, useCallback as I, useContext as L, useEffect as R, useId as le, useLayoutEffect as z, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
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
	let [l, u] = H([]), [d, f] = H(!1), [p, m] = H(null), [h, g] = H(null), [_, v] = H(""), [S, C] = H(""), [w, T] = H(!1), [E, D] = H(""), [O, ee] = H("page"), [j, te] = H("blank"), [M, N] = H(""), [ne, ae] = H(""), [oe, se] = H([]), ce = V(null), F = V(null), I = le(), L = `${I}-blank-label`, z = `${I}-type-label`, ge = `${I}-cookbook-label`, K = `${I}-title`, _e = `${I}-description`, ve = `${I}-deck-from`, ye = `${I}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), g(null), v(""), C(""), T(!1), D(""), ee("page"), te("blank"), N(""), ae(""), se([]);
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
	let be = B(() => de.filter((e) => pe(e, _)), [_]), q = B(() => l.filter((e) => me(e, _)), [l, _]), xe = B(() => ie.filter((e) => P(e, _)), [_]);
	if (R(() => {
		if (!e || O !== "presentation") return;
		if (j === "blank") {
			se([]);
			return;
		}
		let t = ne.trim().toLowerCase();
		if (j === "transcript") {
			let e = c ?? [];
			se(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			se([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(ne.trim())).then((e) => {
			n || se(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		j,
		ne,
		c,
		s
	]), !e) return null;
	let Se = l.find((e) => e.id === p), J = h ? ie.find((e) => e.id === h) : void 0, Ce = O === "sections", we = !!J || !!Se, Te = l.length === 0 && !d && !J, Ee = be.length === 0 && q.length === 0 && xe.length === 0, De = J ? {
		kind: "cookbook",
		cookbook: J
	} : Se && !ue.has(O) ? {
		kind: "type",
		type: Se
	} : {
		kind: "blank",
		shape: O
	}, Y = (e) => {
		if (e.kind === "cookbook") {
			g(e.cookbook.id), ue.has(O) && ee("page"), w || C(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			ee(e.shape), ue.has(e.shape) && (g(null), w || C(""));
			return;
		}
		g(null), m(e.type.id), w || C("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : ue.has(O) ? "page" : O, ke = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = E.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: j,
				...j !== "blank" && M ? { sourceId: M } : {},
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
	}, X = O === "presentation" && j !== "blank" && !M, Z = !!S.trim() && (!Ce || we) && !X, Ae = () => {
		Z && ke(De, S, Oe(De));
	};
	return /* @__PURE__ */ W(x, {
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
				e.key === "Enter" && !e.shiftKey && Z && Ae();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ W("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ G("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ W(k, {
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
							} : be.length > 0 ? {
								kind: "blank",
								shape: be[0].id
							} : q.length > 0 ? {
								kind: "type",
								type: q[0]
							} : void 0;
							if (!t) return;
							Y(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								F.current?.focus();
								return;
							}
							ke(t, n, Oe(t));
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
						be.length > 0 && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ W("div", {
								id: L,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": L,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: be.map((e) => /* @__PURE__ */ G(y, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => Y({
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
											e.id === "page" && /* @__PURE__ */ W(b, {
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
						O === "presentation" && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ W("label", {
									htmlFor: ve,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ W(re, {
									id: ve,
									value: j,
									options: fe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										te(e.target.value), N(""), ae("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ W("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: j === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								j !== "blank" && /* @__PURE__ */ G("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ W(k, {
										type: "search",
										value: ne,
										onChange: (e) => ae(e.target.value),
										"aria-label": j === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: j === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), oe.length === 0 ? /* @__PURE__ */ W("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: j === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G("label", {
										htmlFor: ye,
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
									}), /* @__PURE__ */ W(re, {
										id: ye,
										required: !0,
										"aria-required": "true",
										value: M,
										placeholder: "Choose one…",
										options: oe.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => N(e.target.value),
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
									id: ge,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ W("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": ge,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: xe.map((e) => {
									let t = h === e.id;
									return /* @__PURE__ */ G(y, {
										padding: "md",
										selected: t,
										onSelect: () => Y({
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
						!ue.has(O) && (q.length > 0 || Te || l.length === 0 && d) && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ G("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ W("span", {
										id: z,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Ce && /* @__PURE__ */ W("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ W("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Te && /* @__PURE__ */ W("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Ce ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								q.length > 0 && /* @__PURE__ */ W("div", {
									role: "group",
									"aria-labelledby": z,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: q.map((e) => {
										let t = !J && p === e.id;
										return /* @__PURE__ */ G("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Y({
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
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
						Ee && /* @__PURE__ */ G("div", {
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
							htmlFor: K,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ W("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ W(k, {
							ref: F,
							id: K,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								C(e.target.value), T(!0);
							},
							placeholder: J ? `e.g. ${J.name}` : Se ? `e.g. Q2 ${Se.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("label", {
						htmlFor: _e,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ W("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ W(A, {
						id: _e,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => D(e.target.value),
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
var K = class extends oe {
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
function _e({ summary: e, children: t, open: n, defaultOpen: i = !1, onToggle: c, tone: l, density: u = "default", variant: d = "default", className: f, summaryClassName: p, bodyClassName: m, "data-testid": h = "disclosure" }) {
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
		"data-testid": h,
		className: r("group", !T && "rounded-md border overflow-hidden", w ? "text-xs" : "text-sm", !T && (C ? o[C] : "border-border"), f),
		children: [/* @__PURE__ */ G("summary", {
			"data-testid": `${h}-summary`,
			className: r("flex items-center gap-2 cursor-pointer select-none list-none marker:hidden [&::-webkit-details-marker]:hidden", w ? "px-2 py-1" : "px-3 py-2", T ? "text-text-primary hover:bg-surface-hover" : C ? s[C] : "bg-surface text-text-primary hover:bg-surface-hover", p),
			children: [/* @__PURE__ */ W(g, {
				size: w ? 11 : 14,
				dir: "right",
				className: "shrink-0 transition-transform duration-150 group-open:rotate-90"
			}), /* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				children: e
			})]
		}), /* @__PURE__ */ W("div", {
			"data-testid": `${h}-body`,
			className: r(!T && "border-t", w ? "px-2 py-1" : "px-3 py-2", !T && (C ? o[C] : "border-border"), m),
			children: t
		})]
	});
}
//#endregion
//#region src/components/inbox/InboxSection.tsx
function ve({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = le(), p = c === 3 ? "h3" : "h2", m = t === 0;
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
					/* @__PURE__ */ W(b, {
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
			m && o ? /* @__PURE__ */ W(S, {
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
function ye({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ W("li", {
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
function q({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", className: u, "data-testid": d = "inline-editable-text" }) {
	let [f, p] = H(!1), [m, h] = H(e), g = V(null);
	R(() => {
		f || h(e);
	}, [e, f]), R(() => {
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
	return f ? /* @__PURE__ */ W(k, {
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
	}) : /* @__PURE__ */ W("button", {
		type: "button",
		disabled: s,
		onClick: () => p(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": d,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", be[l], !e && "italic text-text-tertiary", u),
		children: e || i
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function xe(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Se(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || xe(e.target)) return null;
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
function J(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Ce = 5;
function we({ back: e }) {
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
function Te({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: d, notice: f, state: p = "ready", errorMessage: h, onRetry: g, maxSlideWidth: _, className: y, "data-testid": b = "presentation-view" }) {
	let x = le();
	if (p === "loading") return /* @__PURE__ */ W(T, {
		label: "Opening the presentation…",
		testId: `${b}-loading`
	});
	if (p === "error") return /* @__PURE__ */ W(C, {
		title: "This presentation could not be opened",
		...h ? { description: h } : {},
		...g ? {
			actionLabel: "Try again",
			onAction: g
		} : {},
		testId: `${b}-error`
	});
	let E = t.find((e) => e.id === n) ?? t[0], D = E?.slides ?? [];
	if (p === "empty" || !E || D.length === 0) return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", y),
		"data-testid": b,
		children: [/* @__PURE__ */ W(v, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ W(S, {
			title: "No slides yet",
			description: d?.status === "generating" ? `${d.label} is still being generated.` : d?.status === "failed" ? d.message ?? `${d.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${b}-empty`
		})]
	});
	let O = D[Math.min(Math.max(o, 1), D.length) - 1];
	return /* @__PURE__ */ G("div", {
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
			let n = J(t, O.index, D.length);
			n !== O.index && s(n);
		},
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ W(v, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${b}-title`,
					children: e
				}), /* @__PURE__ */ G("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > Ce ? /* @__PURE__ */ W(re, {
							"aria-label": "Revision",
							size: "sm",
							value: E.id,
							onChange: (e) => a?.(e.target.value),
							options: [...t].reverse().map((e, t) => ({
								value: e.id,
								label: t === 0 ? `${e.label} · latest` : e.label
							})),
							className: "w-auto",
							"data-testid": `${b}-revision-select`
						}) : t.length > 1 && /* @__PURE__ */ W(w, {
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
						d && /* @__PURE__ */ W(ne, {
							state: d.status === "failed" ? "error" : "pending",
							label: `${d.label} ${d.status}`,
							"data-testid": `${b}-pending`
						}),
						c && /* @__PURE__ */ W(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${b}-download`,
							children: l
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
							style: _ === void 0 ? void 0 : { maxWidth: _ },
							"data-testid": `${b}-stage`,
							children: O.preview ?? /* @__PURE__ */ W(v, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${b}-no-preview`,
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
								icon: /* @__PURE__ */ W(we, { back: !0 }),
								disabled: O.index <= 1,
								onClick: () => s(O.index - 1),
								"data-testid": `${b}-previous`
							}),
							/* @__PURE__ */ W(v, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${b}-position`,
								children: `Slide ${O.index} of ${D.length}`
							}),
							/* @__PURE__ */ W(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(we, {}),
								disabled: O.index >= D.length,
								onClick: () => s(O.index + 1),
								"data-testid": `${b}-next`
							}),
							u && O.preview && /* @__PURE__ */ W(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(O.id),
								"data-testid": `${b}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ G("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": x,
					"data-testid": `${b}-outline`,
					children: [/* @__PURE__ */ W(N, {
						as: "div",
						className: "mb-1",
						"data-testid": `${b}-outline-label`,
						children: /* @__PURE__ */ W("span", {
							id: x,
							children: "Slides"
						})
					}), /* @__PURE__ */ W("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: D.map((e) => /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === O.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === O.id && "bg-surface-hover font-medium"),
							"data-testid": `${b}-outline-row`,
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
			f && /* @__PURE__ */ W(v, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${b}-notice`,
				children: f
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/FloatingComposerDock.tsx
var Ee = {
	md: "max-w-md",
	lg: "max-w-lg",
	xl: "max-w-xl",
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl"
}, De = ce("overlay"), Y = "--dock-height";
function Oe({ composer: e, strip: t, above: n, maxWidth: i = "3xl", label: a = "Composer", className: o, "data-testid": s = "floating-composer-dock" }) {
	let c = V(null), l = L(De);
	return z(() => {
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
	}, [l]), /* @__PURE__ */ W("div", {
		ref: c,
		role: "region",
		"aria-label": a,
		"data-testid": s,
		"data-placement": l,
		className: r(l === "pinned" ? "relative flex max-h-full min-h-0 shrink flex-col bg-workspace px-4 pb-1.5 pt-1" : "pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-workspace via-workspace/85 to-transparent px-4 pb-3 pt-8", o),
		children: /* @__PURE__ */ G("div", {
			"data-uic-keepout": "bottom",
			className: r("pointer-events-auto mx-auto flex min-h-0 w-full flex-col", Ee[i]),
			children: [
				n && /* @__PURE__ */ W("div", {
					className: "mb-2 min-h-0 shrink overflow-y-auto",
					"data-testid": `${s}-above`,
					children: n
				}),
				t && /* @__PURE__ */ W("div", {
					className: "shrink-0",
					"data-testid": `${s}-strip`,
					children: t
				}),
				/* @__PURE__ */ W("div", {
					className: r("shrink-0 rounded-[var(--composer-radius,12px)] shadow-lg", t && "rounded-t-none [&_.chat-composer]:rounded-t-none"),
					"data-testid": `${s}-composer`,
					children: e
				})
			]
		})
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
function X() {
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
function Z() {
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
function Q() {
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
function $({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: y = !1, testIdPrefix: b }) {
	let x = ke(i);
	return /* @__PURE__ */ G("li", {
		ref: _,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
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
						}) : /* @__PURE__ */ W(v, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ G("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ W(v, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ W(v, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ W(v, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ W(v, {
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
						icon: /* @__PURE__ */ W(X, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Z, {}),
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
						icon: /* @__PURE__ */ W(Ae, {}),
						disabled: !p,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Q, {}),
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
function je({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = $, listClassName: u, testIdPrefix: d }) {
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
var Me = 40, Ne = 8, Pe = 200, Fe = 120, Ie = 200, Le = 60, Re = 2e3, ze = 24, Be = 6, Ve = 400, He = 10, Ue = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, We = [
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
var it = F(() => import("./SortableSlideList-Bp2JgZEY.js"));
function at(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function ot(e, t) {
	at(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function st() {
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
function ct({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: y, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = ke(i), w = t + 1, T = e.title || "Untitled slide", E = [
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
			}), !u && y && /* @__PURE__ */ W("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: y
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
						children: [/* @__PURE__ */ W(v, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: T
						}), /* @__PURE__ */ W(v, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ge[e.layout]
						})]
					}), c && /* @__PURE__ */ W("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ W(v, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ W(v, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: T
						}) : /* @__PURE__ */ W("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ W(v, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ W(v, {
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
				!u && E.length > 0 && /* @__PURE__ */ W("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ W(_, {
						trigger: /* @__PURE__ */ W(st, {}),
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
function lt({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, slideViewers: d, readOnly: f = !1, className: p, testIdPrefix: m = "filmstrip" }) {
	let g = V(null), _ = B(() => new Set(u ?? []), [u]), y = B(() => e.map((e) => {
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
	]), b = B(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [..._].filter((e) => !t.has(e));
	}, [e, _]);
	R(() => {
		at(g.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => ot(g.current, s));
			return;
		}
		let c = e[o].slide.id;
		n(c), ot(g.current, c);
	}, S = {
		items: y,
		selectedId: t,
		readOnly: f,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ct,
		listClassName: "gap-2.5",
		testIdPrefix: m
	};
	return /* @__PURE__ */ G("div", {
		ref: g,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", p),
		"data-testid": `${m}-strip`,
		onKeyDown: x,
		children: [
			/* @__PURE__ */ W(se, {
				fallback: /* @__PURE__ */ W(je, { ...S }),
				children: W(f ? je : it, { ...S })
			}),
			b.map((t) => /* @__PURE__ */ G("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${m}-placeholder-${t}`,
				children: [/* @__PURE__ */ W("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ W("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ W(v, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			c && !f && /* @__PURE__ */ G("div", {
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
					"data-testid": `${m}-add`,
					children: /* @__PURE__ */ G("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ W(h, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ut = {
	document: "📄",
	transcript: "🎙️"
};
function dt({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = H(""), [d, f] = H(!1), [p, m] = H(n), h = le(), g = V(0);
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
	})), y = e.length >= 10, b = (n) => {
		y || e.some((e) => e.documentId === n.documentId && !e.anchor) || (t([...e, {
			documentId: n.documentId,
			title: n.title
		}]), u(""), f(!1));
	}, x = /* @__PURE__ */ W(ae, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ W(E, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ W(v, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ W(v, {
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
							children: ut[t.kind ?? "document"]
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
				e.length === 0 ? /* @__PURE__ */ W(v, {
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
			/* @__PURE__ */ W(N, {
				as: "div",
				children: /* @__PURE__ */ W("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ W(te, {
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
function ft() {
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
function pt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
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
						/* @__PURE__ */ W(v, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ W(k, {
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
							icon: /* @__PURE__ */ W(ft, {}),
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
function mt({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			children: [/* @__PURE__ */ W(D, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ W(re, {
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
					e.series.map((i, a) => /* @__PURE__ */ W(d, { children: /* @__PURE__ */ W(k, {
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
					/* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(k, {
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
					e.series.map((e, t) => /* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(k, {
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
						icon: /* @__PURE__ */ W(ft, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function ht({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
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
				children: [/* @__PURE__ */ W(D, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ W(k, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ W(D, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ W(k, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ W(pt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ W(pt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ W(pt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ W(mt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ W(D, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ W(A, {
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
				}), /* @__PURE__ */ W(D, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ W(k, {
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
			e.layout === "image" && /* @__PURE__ */ W(D, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ W(k, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ W(D, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ W(A, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ W(dt, {
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
var gt = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function _t({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ W("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ G("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", gt[a]),
			children: [e, t && /* @__PURE__ */ G("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ W("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(v, {
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
var vt = [
	"chart",
	"quote",
	"image",
	"two-column"
], yt = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
};
function bt({ redo: e }) {
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
function xt() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function St() {
	return /* @__PURE__ */ W("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Ct({ label: e, value: t }) {
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
			/* @__PURE__ */ W(g, { size: 12 })
		]
	});
}
function wt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: f = !1, onPresent: p, end: g, disabled: y = !1, className: b, testIdPrefix: x = "slides-toolbar" }) {
	let S = j(), C = y;
	return /* @__PURE__ */ G("div", {
		...S,
		role: "toolbar",
		"aria-label": "Slide tools",
		className: r("flex min-w-0 flex-1 flex-wrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: C || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ W(h, { size: 12 }), "New slide"]
				})
			}),
			!C && e && /* @__PURE__ */ W(_, {
				trigger: /* @__PURE__ */ W(Ct, {
					label: "Layout",
					value: Ge[e.layout]
				}),
				triggerLabel: `Layout: ${Ge[e.layout]}`,
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [{
					label: "Layout of this slide",
					items: We.map((t) => ({
						label: Ge[t],
						checked: t === e.layout,
						onSelect: () => {
							t !== e.layout && o(t);
						},
						"data-testid": `${x}-layout-${t}`
					}))
				}],
				"data-testid": `${x}-layout-menu`
			}),
			!C && a && /* @__PURE__ */ W(_, {
				trigger: /* @__PURE__ */ W(Ct, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [{
					label: "New slide after this one",
					items: vt.map((e) => ({
						label: `${Ge[e]} slide`,
						onSelect: () => n(e),
						"data-testid": `${x}-insert-${e}`
					}))
				}],
				"data-testid": `${x}-insert-menu`
			}),
			!C && /* @__PURE__ */ W(_, {
				trigger: /* @__PURE__ */ W(Ct, {
					label: "Theme",
					value: yt[t]
				}),
				triggerLabel: `Theme: ${yt[t]}`,
				triggerClassName: "border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [{
					label: "Deck theme",
					items: Ke.map((e) => ({
						label: yt[e],
						checked: e === t,
						onSelect: () => {
							e !== t && s(e);
						},
						"data-testid": `${x}-theme-${e}`
					}))
				}],
				"data-testid": `${x}-theme-menu`
			}),
			!C && e?.layout === "chart" && e.chart && c && /* @__PURE__ */ W(w, {
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
			(l || u) && /* @__PURE__ */ G(U, { children: [
				/* @__PURE__ */ W(St, {}),
				l && /* @__PURE__ */ W(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(bt, {}),
					disabled: C || !d,
					onClick: l,
					"data-testid": `${x}-undo`
				}),
				u && /* @__PURE__ */ W(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(bt, { redo: !0 }),
					disabled: C || !f,
					onClick: u,
					"data-testid": `${x}-redo`
				})
			] }),
			/* @__PURE__ */ W(v, {
				as: "span",
				className: "ml-1 hidden text-[11px] text-text-tertiary xl:inline",
				title: "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.",
				"data-testid": `${x}-style-note`,
				children: "Text style comes from the theme"
			}),
			/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			p && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: p,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ W(xt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Tt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Re, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = le(), l = le(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ G("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ W(v, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ W(v, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ W(A, {
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
function Et({ testIdPrefix: e }) {
	return /* @__PURE__ */ W(te, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Dt = F(() => import("./PresentationAgentComposer-BQ8hKJt-.js").catch(() => ({ default: Et })));
function Ot({ back: e }) {
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
function kt(e, t) {
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
		edit: I((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: I(() => {
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
		redo: I(() => {
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
function At({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: d, onDownload: f, onOpenPresentationView: p, readOnly: h = !1, onInstruct: g, instructHints: _, onUndoInstruct: y, generatingSlideIds: b, slideViewers: x, selectSlideRequest: w, footer: E, renderFrame: A, onSelectedSlideChange: j, className: M, "data-testid": N = "presentation-editor" }) {
	let [ne, P] = H(() => e.slides[0]?.id ?? ""), [ie, ae] = H(!1), [oe, ce] = H(null), F = !!g, [L, le] = H("slide"), [z, ue] = H(!1), [de, fe] = H(null), [pe, me] = H(null), [he, ge] = H(() => /* @__PURE__ */ new Set()), { edit: K, undo: ve, redo: ye, canUndo: be, canRedo: Ce } = kt(e, t), [we, Ee] = H([]);
	R(() => {
		typeof n == "object" && "slides" in n && Ee(n.slides);
	}, [n]);
	let Y = V(a);
	Y.current = a;
	let X = e.slides, Z = B(() => new Set(qe(e)), [e]), Ae = Z.size === 0;
	R(() => {
		Ae && Y.current(e);
	}, [e, Ae]);
	let Q = Math.max(X.findIndex((e) => e.id === ne), 0), $ = X[Q], je = V(j);
	je.current = j, R(() => {
		$ && je.current?.($.id, Q);
	}, [$?.id, Q]);
	let Me = B(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : we;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, we]), Ne = B(() => {
		let e = new Set(b ?? []);
		return z && L === "slide" && $ && e.add($.id), [...e];
	}, [
		b,
		z,
		L,
		$
	]), Pe = !!$ && Ne.includes($.id), Fe = X.map((e) => ({
		slide: e,
		thumbnailSvg: Me.get(e.id),
		uncited: Z.has(e.id),
		changed: he.has(e.id)
	})), Ie = I((e) => {
		P(e);
	}, []), Le = w?.key, Re = w?.slideId;
	R(() => {
		Re && e.slides.some((e) => e.id === Re) && P(Re);
	}, [Le, Re]);
	let ze = I((t, n) => {
		K($e(e, t, n));
	}, [K, e]), Be = I((t) => {
		let n = et(e, Q, t);
		n !== e && (K(n), P(n.slides[Q + 1].id));
	}, [
		K,
		e,
		Q
	]), Ve = I((t) => {
		let n = tt(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		K(n), P(n.slides[r + 1].id);
	}, [K, e]), He = I((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = nt(e, t);
		r !== e && (K(r), P(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [K, e]), Ue = I((t) => K(Qe(e, t)), [K, e]), We = I(async (e) => {
		if (!g || z) return !1;
		let t = $?.id;
		ue(!0), me(null);
		try {
			let n = await g(e, L === "slide" && t ? {
				slideId: t,
				scope: L
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return ge(new Set(r)), fe(n?.summary?.trim() || "Done."), L === "deck" && r.length && (!t || !r.includes(t)) && P(r[0]), !0;
		} catch (e) {
			return me(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			ue(!1);
		}
	}, [
		g,
		z,
		L,
		$?.id
	]), Ge = I(() => {
		y?.(), fe(null), ge(/* @__PURE__ */ new Set());
	}, [y]), Ke = Z.size, Je = !h && X.length > 0 && Ke === 0 && !ie, Ye = I(() => {
		Je && (ae(!0), ce(null), Promise.resolve(o(e)).catch((e) => {
			ce(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ae(!1)));
	}, [
		Je,
		o,
		e
	]), Xe = I((e) => {
		let t = X[Q + e];
		t && P(t.id);
	}, [X, Q]);
	if (R(() => {
		if (h) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), Ye();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !xe(e.target)) {
				e.preventDefault(), e.shiftKey ? ye() : ve();
				return;
			}
			let n = Se(e);
			if (!n) return;
			e.preventDefault();
			let r = J(n, Q + 1, X.length);
			r !== Q + 1 && Xe(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		h,
		Ye,
		ve,
		ye,
		Xe,
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
				let n = ke(Me.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ W(Te, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = X[e - 1];
				t && P(t.id);
			},
			...f ? { onDownload: f } : {},
			className: M,
			"data-testid": `${N}-readonly`
		});
	}
	let it = (() => {
		if ($ && Z.has($.id)) return /* @__PURE__ */ W(S, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${N}-preview-needs-source`
		});
		let t = $ ? ke(Me.get($.id)) : void 0;
		if (!Ae && !t) return /* @__PURE__ */ W(S, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${N}-preview-needs-source`
		});
		if (n === "loading" && Me.size === 0) return /* @__PURE__ */ W(T, {
			label: "Rendering the deck…",
			testId: `${N}-preview-loading`
		});
		if (Ae && typeof n == "object" && "error" in n) return /* @__PURE__ */ W(C, {
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
		}) : /* @__PURE__ */ W(v, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${N}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), at = s.map((e) => ({
		id: e.id,
		label: e.label
	})), ot = /* @__PURE__ */ G("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${N}-revision-controls`,
		children: [
			at.length > 5 ? /* @__PURE__ */ W(re, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => l?.(e.target.value),
				options: [...at].reverse().map((e, t) => ({
					value: e.id,
					label: t === 0 ? `${e.label} · latest` : e.label
				})),
				className: "w-auto",
				"data-testid": `${N}-revision-select`
			}) : at.length > 0 && /* @__PURE__ */ W(O, {
				items: at,
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
				disabled: !Je,
				onClick: Ye,
				"data-testid": `${N}-save`,
				children: ie ? "Saving…" : `Save as ${rt(s)}`
			}),
			f && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: f,
				"data-testid": `${N}-download`,
				children: "Download .pptx"
			})
		]
	}), st = F || A ? /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ W(q, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => K({
				...e,
				title: t
			}),
			"data-testid": `${N}-deck-title`
		}), /* @__PURE__ */ W(q, {
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
		children: [/* @__PURE__ */ W(D, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ W(k, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => K({
					...e,
					title: t.target.value
				}),
				"data-testid": `${N}-deck-title`
			})
		}), /* @__PURE__ */ W(D, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ W(k, {
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
	}), ct = p ? () => p($ ? {
		slideId: $.id,
		slideIndex: Q + 1
	} : void 0) : void 0, ut = /* @__PURE__ */ W(wt, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: Be,
		canAddSlide: X.length < 40,
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
		onUndo: ve,
		onRedo: ye,
		canUndo: be,
		canRedo: Ce,
		...ct ? { onPresent: ct } : {},
		testIdPrefix: `${N}-toolbar`
	}), ft = /* @__PURE__ */ G(U, { children: [Ke > 0 && /* @__PURE__ */ W(te, {
		tone: "warning",
		"data-testid": `${N}-uncited-warning`,
		children: Ke === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${Ke} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), oe && /* @__PURE__ */ W(te, {
		tone: "error",
		onDismiss: () => ce(null),
		"data-testid": `${N}-save-error`,
		children: oe
	})] }), pt = F && /* @__PURE__ */ G(U, { children: [pe && /* @__PURE__ */ W(te, {
		tone: "error",
		onDismiss: () => me(null),
		"data-testid": `${N}-agent-error`,
		children: pe
	}), de && !pe && /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${N}-agent-summary`,
		children: [
			/* @__PURE__ */ W(v, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${de}`
			}),
			he.size > 0 && /* @__PURE__ */ W(v, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: he.size === 1 ? "1 slide marked in the filmstrip" : `${he.size} slides marked in the filmstrip`
			}),
			y && /* @__PURE__ */ W(i, {
				variant: "ghost",
				size: "sm",
				onClick: Ge,
				"data-testid": `${N}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), mt = F && $ && /* @__PURE__ */ W(se, {
		fallback: /* @__PURE__ */ W(v, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${N}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ W(Dt, {
			scope: L,
			onScopeChange: le,
			slideLabel: `slide ${Q + 1}`,
			busy: z,
			onSubmit: We,
			..._?.length ? { suggestions: _ } : {},
			testIdPrefix: N
		})
	}), gt = {
		selectedSlide: $,
		selectedIndex: Q,
		slideCount: X.length,
		selectSlide: Ie,
		markChanged: (e) => ge(new Set(e))
	}, vt = typeof E == "function" ? E(gt) : E, yt = vt != null && vt !== !1 ? vt : mt ? /* @__PURE__ */ W(Oe, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ G("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${N}-dock-card`,
			children: [pt, mt]
		}),
		"data-testid": `${N}-dock`
	}) : null, bt = $ && /* @__PURE__ */ W(U, { children: F ? /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(dt, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => Ue({
			...$,
			sources: e
		}),
		options: u,
		onSearchSources: d,
		testIdPrefix: `${N}-slide`
	}), /* @__PURE__ */ W(_e, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${N}-details`,
		children: /* @__PURE__ */ W(ht, {
			slide: $,
			onChange: Ue,
			sources: u,
			onSearchSources: d,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${N}-slide`
		})
	})] }) : /* @__PURE__ */ W(ht, {
		slide: $,
		onChange: Ue,
		sources: u,
		onSearchSources: d,
		showNotes: !1,
		testIdPrefix: `${N}-slide`
	}) }), xt = /* @__PURE__ */ G("div", {
		className: r("flex items-center justify-center gap-2", A && "ml-auto shrink-0"),
		"data-testid": `${N}-slide-nav`,
		children: [
			/* @__PURE__ */ W(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Ot, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => Xe(-1),
				"data-testid": `${N}-previous`
			}),
			/* @__PURE__ */ W(v, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${N}-position`,
				children: `Slide ${X.length === 0 ? 0 : Q + 1} of ${X.length}`
			}),
			/* @__PURE__ */ W(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(Ot, {}),
				disabled: Q >= X.length - 1,
				onClick: () => Xe(1),
				"data-testid": `${N}-next`
			}),
			/* @__PURE__ */ W(ee, {
				value: X.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${X.length} / 40`,
				className: "ml-2",
				"data-testid": `${N}-slide-meter`
			})
		]
	}), St = /* @__PURE__ */ G("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${N}-body`,
		children: [/* @__PURE__ */ W(lt, {
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
			testIdPrefix: `${N}-slide`
		}), /* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${N}-main`,
			children: [
				/* @__PURE__ */ W("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${N}-stage-frame`,
					children: /* @__PURE__ */ W(_t, {
						generating: Pe,
						label: $ ? `Slide ${Q + 1} of ${X.length}: ${$.title || "Untitled slide"}` : "No slide",
						"data-testid": `${N}-stage`,
						children: it
					})
				}),
				!A && xt,
				$ && /* @__PURE__ */ G("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ W(Tt, {
						value: $.notes,
						onChange: (e) => Ue({
							...$,
							notes: e
						}),
						"data-testid": `${N}-slide-notes`
					}), bt]
				})
			]
		})]
	}), Ct = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (A) {
		let e = /* @__PURE__ */ G("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", M),
			"data-testid": N,
			onKeyDown: Ct,
			children: [
				/* @__PURE__ */ G("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${N}-deck-line`,
					children: [st, xt]
				}),
				ft,
				St
			]
		});
		return /* @__PURE__ */ W(U, { children: A({
			toolbar: ut,
			actions: ot,
			surface: e,
			footer: yt
		}) });
	}
	return /* @__PURE__ */ G("div", {
		className: r("relative flex h-full min-h-0 flex-col", M),
		"data-testid": N,
		onKeyDown: Ct,
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ G("div", {
					className: r("flex flex-wrap justify-between gap-2", F ? "items-center" : "items-end"),
					...F ? { "data-testid": `${N}-deck-line` } : {},
					children: [st, ot]
				}), /* @__PURE__ */ W("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: ut
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${N}-scroller`,
				children: [ft, St]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
				"data-testid": `${N}-dock-row`,
				children: /* @__PURE__ */ W(De.Provider, {
					value: "pinned",
					children: yt
				})
			})
		]
	});
}
//#endregion
export { rt as A, Y as B, We as C, tt as D, Je as E, Ze as F, ye as G, Te as H, je as I, ge as J, _e as K, $ as L, nt as M, Qe as N, Xe as O, qe as P, ke as R, Ue as S, et as T, q as U, Oe as V, ve as W, Ve as _, _t as a, Ie as b, lt as c, Ne as d, Pe as f, Re as g, Le as h, wt as i, Ye as j, $e as k, ct as l, Be as m, Tt as n, ht as o, ze as p, K as q, vt as r, dt as s, At as t, Ke as u, Me as v, Ge as w, Fe as x, He as y, De as z };
