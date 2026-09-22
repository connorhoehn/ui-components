import { n as e, r as t, t as n } from "./useDocumentTypes-BUXMPyPU.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { t as i } from "./Button-i2ZnAx-Z.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CypeBEj0.js";
import { t as d } from "./IconButton-C3DMtvSx.js";
import { a as f, i as p, n as m, o as h } from "./Text-DIl-Ssia.js";
import { t as g } from "./Chip-B0FPId77.js";
import { t as _ } from "./Modal-CyoyiNKN.js";
import { t as v } from "./EmptyState-JzzL2z1E.js";
import { t as y } from "./FormField-CBOSCKs0.js";
import { n as b } from "./Tabs-D97JGZEx.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./Textarea-Dz4doxTv.js";
import { t as ee } from "./DotMeter-BDVkadI8.js";
import { n as C, t as w } from "./SearchInput-Y-j1He57.js";
import { t as T } from "./InlineAlert-CRnIKeAF.js";
import { t as te } from "./SectionLabel-hq1ieKla.js";
import { t as E } from "./StatusPill-Db42eiME.js";
import { t as D } from "./Select-CqVokE2v.js";
import { G as ne, U as re } from "./renderers-9QJtVt3f.js";
import { t as ie } from "./ComposerReferences-DOYqoE6C.js";
import { Component as O, Suspense as ae, lazy as k, useCallback as A, useEffect as j, useId as oe, useMemo as se, useRef as ce, useState as M } from "react";
import { Fragment as le, jsx as N, jsxs as P } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var F = /* @__PURE__ */ new Set(["diagram", "presentation"]), ue = [
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
], I = [
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
function L(e, t) {
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
function R({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c }) {
	let [l, u] = M([]), [d, f] = M(!1), [p, m] = M(null), [v, y] = M(null), [b, ee] = M(""), [C, w] = M(""), [T, te] = M(!1), [E, ie] = M(""), [O, ae] = M("page"), [k, A] = M("blank"), [R, z] = M(""), [B, V] = M(""), [H, U] = M([]), W = ce(null), G = ce(null), K = oe(), q = `${K}-blank-label`, pe = `${K}-type-label`, me = `${K}-cookbook-label`, he = `${K}-title`, ge = `${K}-description`, _e = `${K}-deck-from`, ve = `${K}-deck-source`;
	j(() => {
		if (!e) return;
		let r = n();
		u(r), m(null), y(null), ee(""), w(""), te(!1), ie(""), ae("page"), A("blank"), z(""), V(""), U([]);
		let i = !1;
		f(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), m((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || f(!1);
		});
		let a = setTimeout(() => W.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let J = se(() => ue.filter((e) => L(e, b)), [b]), Y = se(() => l.filter((e) => de(e, b)), [l, b]), X = se(() => re.filter((e) => ne(e, b)), [b]);
	if (j(() => {
		if (!e || O !== "presentation") return;
		if (k === "blank") {
			U([]);
			return;
		}
		let t = B.trim().toLowerCase();
		if (k === "transcript") {
			let e = c ?? [];
			U(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			U([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(B.trim())).then((e) => {
			n || U(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		k,
		B,
		c,
		s
	]), !e) return null;
	let Z = l.find((e) => e.id === p), Q = v ? re.find((e) => e.id === v) : void 0, ye = O === "sections", be = !!Q || !!Z, xe = l.length === 0 && !d && !Q, Se = J.length === 0 && Y.length === 0 && X.length === 0, Ce = Q ? {
		kind: "cookbook",
		cookbook: Q
	} : Z && !F.has(O) ? {
		kind: "type",
		type: Z
	} : {
		kind: "blank",
		shape: O
	}, $ = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), F.has(O) && ae("page"), T || w(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			ae(e.shape), F.has(e.shape) && (y(null), T || w(""));
			return;
		}
		y(null), m(e.type.id), T || w("");
	}, we = (e) => e.kind === "blank" ? e.shape : F.has(O) ? "page" : O, Te = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = E.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: k,
				...k !== "blank" && R ? { sourceId: R } : {},
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
	}, Ee = O === "presentation" && k !== "blank" && !R, De = !!C.trim() && (!ye || be) && !Ee, Oe = () => {
		De && Te(Ce, C, we(Ce));
	};
	return /* @__PURE__ */ N(_, {
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
		children: /* @__PURE__ */ P("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && De && Oe();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ N("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ P("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ N(x, {
						ref: W,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => ee(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = X.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: X[0]
							} : J.length > 0 ? {
								kind: "blank",
								shape: J[0].id
							} : Y.length > 0 ? {
								kind: "type",
								type: Y[0]
							} : void 0;
							if (!t) return;
							$(t);
							let n = C.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								G.current?.focus();
								return;
							}
							Te(t, n, we(t));
						}
					}), /* @__PURE__ */ N("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ P("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						J.length > 0 && /* @__PURE__ */ P("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ N("div", {
								id: q,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ N("div", {
								role: "group",
								"aria-labelledby": q,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: J.map((e) => /* @__PURE__ */ P(h, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => $({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ P("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ N("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ N("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ N(g, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ N("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ P("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ N("label", {
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ N(D, {
									id: _e,
									value: k,
									options: I.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										A(e.target.value), z(""), V("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ N("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: k === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								k !== "blank" && /* @__PURE__ */ P("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ N(x, {
										type: "search",
										value: B,
										onChange: (e) => V(e.target.value),
										"aria-label": k === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: k === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), H.length === 0 ? /* @__PURE__ */ N("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: k === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ P(le, { children: [/* @__PURE__ */ P("label", {
										htmlFor: ve,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											k === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ N("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ N(D, {
										id: ve,
										required: !0,
										"aria-required": "true",
										value: R,
										placeholder: "Choose one…",
										options: H.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => z(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						X.length > 0 && /* @__PURE__ */ P("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ P("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ N("div", {
									id: me,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ N("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ N("div", {
								role: "group",
								"aria-labelledby": me,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: X.map((e) => {
									let t = v === e.id;
									return /* @__PURE__ */ P(h, {
										padding: "md",
										selected: t,
										onSelect: () => $({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ P("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ N("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ N("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ N("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ N("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!F.has(O) && (Y.length > 0 || xe || l.length === 0 && d) && /* @__PURE__ */ P("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ P("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ N("span", {
										id: pe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !ye && /* @__PURE__ */ N("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ N("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								xe && /* @__PURE__ */ N("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: ye ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								Y.length > 0 && /* @__PURE__ */ N("div", {
									role: "group",
									"aria-labelledby": pe,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Y.map((e) => {
										let t = !Q && p === e.id;
										return /* @__PURE__ */ P("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => $({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ N("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ P("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ N("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ N("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ N("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ N("span", {
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
						Se && /* @__PURE__ */ P("div", {
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
				/* @__PURE__ */ P("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ P("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ P("label", {
							htmlFor: he,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ N("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ N(x, {
							ref: G,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: C,
							onChange: (e) => {
								w(e.target.value), te(!0);
							},
							placeholder: Q ? `e.g. ${Q.name}` : Z ? `e.g. Q2 ${Z.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ P("div", { children: [/* @__PURE__ */ P("label", {
						htmlFor: ge,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ N("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ N(S, {
						id: ge,
						"data-testid": "new-doc-description",
						value: E,
						onChange: (e) => ie(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ P("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ N("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ N("button", {
						"data-testid": "new-doc-submit",
						onClick: Oe,
						disabled: !De,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", De ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var z = class extends O {
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
		return this.state.hasError ? /* @__PURE__ */ P("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ N("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ N("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ N("button", {
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
function B({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = oe(), p = c === 3 ? "h3" : "h2", m = t === 0;
	return /* @__PURE__ */ P("section", {
		"aria-labelledby": f,
		"data-testid": d,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ N(p, {
						id: f,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ N(g, {
						tone: m ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ N("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ P(le, { children: [/* @__PURE__ */ N("span", { className: "flex-1" }), /* @__PURE__ */ N("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			m && o ? /* @__PURE__ */ N(v, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ N("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!m && s != null && /* @__PURE__ */ N("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function V({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ N("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function H({ back: e }) {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function U({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: h, notice: g, state: _ = "ready", errorMessage: y, onRetry: b, className: x, "data-testid": S = "presentation-view" }) {
	let ee = oe();
	if (_ === "loading") return /* @__PURE__ */ N(p, {
		label: "Opening the presentation…",
		testId: `${S}-loading`
	});
	if (_ === "error") return /* @__PURE__ */ N(f, {
		title: "This presentation could not be opened",
		...y ? { description: y } : {},
		...b ? {
			actionLabel: "Try again",
			onAction: b
		} : {},
		testId: `${S}-error`
	});
	let w = t.find((e) => e.id === n) ?? t[0], T = w?.slides ?? [];
	if (_ === "empty" || !w || T.length === 0) return /* @__PURE__ */ P("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", x),
		"data-testid": S,
		children: [/* @__PURE__ */ N(m, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ N(v, {
			title: "No slides yet",
			description: h?.status === "generating" ? `${h.label} is still being generated.` : h?.status === "failed" ? h.message ?? `${h.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${S}-empty`
		})]
	});
	let D = T[Math.min(Math.max(o, 1), T.length) - 1];
	return /* @__PURE__ */ P("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", x),
		"data-testid": S,
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ N(m, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${S}-title`,
					children: e
				}), /* @__PURE__ */ P("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ N(C, {
							"aria-label": "Revision",
							size: "sm",
							value: w.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${S}-revisions`
						}),
						h && /* @__PURE__ */ N(E, {
							state: h.status === "failed" ? "error" : "pending",
							label: `${h.label} ${h.status}`,
							"data-testid": `${S}-pending`
						}),
						c && /* @__PURE__ */ N(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${S}-download`,
							children: l
						})
					]
				})]
			}),
			/* @__PURE__ */ P("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ P("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ N("div", {
						className: "flex min-h-[12rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40",
						"data-testid": `${S}-stage`,
						children: D.preview ?? /* @__PURE__ */ N(m, {
							className: "text-[13px] text-text-tertiary",
							"data-testid": `${S}-no-preview`,
							children: "This slide’s preview could not be read."
						})
					}), /* @__PURE__ */ P("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ N(d, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ N(H, { back: !0 }),
								disabled: D.index <= 1,
								onClick: () => s(D.index - 1),
								"data-testid": `${S}-previous`
							}),
							/* @__PURE__ */ N(m, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${S}-position`,
								children: `Slide ${D.index} of ${T.length}`
							}),
							/* @__PURE__ */ N(d, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ N(H, {}),
								disabled: D.index >= T.length,
								onClick: () => s(D.index + 1),
								"data-testid": `${S}-next`
							}),
							u && D.preview && /* @__PURE__ */ N(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(D.id),
								"data-testid": `${S}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ P("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": ee,
					"data-testid": `${S}-outline`,
					children: [/* @__PURE__ */ N(te, {
						as: "div",
						className: "mb-1",
						"data-testid": `${S}-outline-label`,
						children: /* @__PURE__ */ N("span", {
							id: ee,
							children: "Slides"
						})
					}), /* @__PURE__ */ N("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: T.map((e) => /* @__PURE__ */ N("li", { children: /* @__PURE__ */ P("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === D.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === D.id && "bg-surface-hover font-medium"),
							"data-testid": `${S}-outline-row`,
							children: [/* @__PURE__ */ N("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ N("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			g && /* @__PURE__ */ N(m, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${S}-notice`,
				children: g
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var W = 40, G = 8, K = 200, q = 120, pe = 200, me = 60, he = 2e3, ge = 24, _e = 6, ve = 400, J = 10, Y = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, X = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], Z = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Q = [
	"product",
	"engineering",
	"plain"
];
function ye(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function be(e) {
	return e.slides.length > 0 && ye(e).length === 0;
}
function xe(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Se(e, t = "bullets") {
	return Ce({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ce(e, t) {
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
function $(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function we(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Te(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Se(xe(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Ee(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: xe(e),
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
function De(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function Oe(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var ke = {
	document: "📄",
	transcript: "🎙️"
};
function Ae({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, testIdPrefix: s }) {
	let [c, l] = M(""), [u, d] = M(n), f = oe(), p = ce(0);
	j(() => {
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
	return /* @__PURE__ */ P("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${s}-sources`,
		children: [
			/* @__PURE__ */ N(te, {
				as: "div",
				children: /* @__PURE__ */ N("span", {
					id: f,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ N(T, {
				tone: "warning",
				"data-testid": `${s}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : /* @__PURE__ */ N(ie, {
				references: h,
				onRemove: o ? void 0 : (n) => {
					t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
				},
				removeLabel: (e) => `Remove source ${e.label}`,
				className: "px-0 py-0",
				"data-testid": `${s}-source-chips`
			}),
			!o && /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ N(w, {
					value: c,
					onChange: l,
					placeholder: "Search your documents and transcripts…",
					"aria-label": "Search sources",
					"data-testid": `${s}-source-search`
				}), g ? /* @__PURE__ */ N(m, {
					className: "text-[11px] text-text-tertiary",
					children: "A slide cites at most 10 sources."
				}) : u.length === 0 ? /* @__PURE__ */ N(m, {
					className: "text-[11px] text-text-tertiary",
					"data-testid": `${s}-source-no-results`,
					children: "Nothing matches that. Sources come from the Documents explorer."
				}) : /* @__PURE__ */ N("ul", {
					"aria-labelledby": f,
					className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
					"data-testid": `${s}-source-results`,
					children: u.slice(0, 20).map((t) => {
						let n = e.some((e) => e.documentId === t.documentId);
						return /* @__PURE__ */ N("li", { children: /* @__PURE__ */ P(i, {
							variant: "ghost",
							size: "sm",
							fullWidth: !0,
							disabled: n,
							onClick: () => _(t),
							"data-testid": `${s}-source-option-${t.documentId}`,
							className: r("justify-start border-none text-left"),
							children: [
								/* @__PURE__ */ N("span", {
									className: "mr-1.5",
									"aria-hidden": "true",
									children: ke[t.kind ?? "document"]
								}),
								/* @__PURE__ */ N("span", {
									className: "truncate",
									children: t.title
								}),
								n && /* @__PURE__ */ N("span", {
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
function je() {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Me({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ P("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ N(te, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ N("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ P("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ N(m, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ N(x, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ N(d, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ N(je, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ N(i, {
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
function Ne({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	return /* @__PURE__ */ P("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ P("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ N(y, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ N(D, {
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
			}), !n && /* @__PURE__ */ P(le, { children: [/* @__PURE__ */ N(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: p,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ N(i, {
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
		}), /* @__PURE__ */ N("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ P(u, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ N(l, { children: /* @__PURE__ */ P(o, { children: [
					/* @__PURE__ */ N(c, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ N(c, { children: /* @__PURE__ */ N(x, {
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
					!n && /* @__PURE__ */ N(c, {})
				] }) }), /* @__PURE__ */ N(s, { children: e.labels.map((i, s) => /* @__PURE__ */ P(o, { children: [
					/* @__PURE__ */ N(a, { children: /* @__PURE__ */ N(x, {
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
					e.series.map((e, t) => /* @__PURE__ */ N(a, { children: /* @__PURE__ */ N(x, {
						size: "sm",
						type: "number",
						value: String(e.values[s] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => f(t, s, e.target.value),
						"data-testid": `${r}-value-${t}-${s}`
					}) }, t)),
					!n && /* @__PURE__ */ N(a, { children: /* @__PURE__ */ N(d, {
						"aria-label": `Remove row ${s + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ N(je, {}),
						disabled: e.labels.length <= 1,
						onClick: () => m(s),
						"data-testid": `${r}-remove-label-${s}`
					}) })
				] }, s)) })]
			})
		})]
	});
}
function Pe({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, testIdPrefix: o }) {
	let s = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ P("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${o}-form`,
		children: [
			/* @__PURE__ */ P("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ N(y, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ N(x, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => s({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${o}-eyebrow`
					})
				}), /* @__PURE__ */ N(y, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ N(x, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => s({ title: e.target.value }),
						"data-testid": `${o}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ N(Me, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => s({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${o}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ P("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ N(Me, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => s({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${o}-column-0`
				}), /* @__PURE__ */ N(Me, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => s({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${o}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ N(Ne, {
				chart: e.chart,
				onChange: (e) => s({ chart: e }),
				readOnly: a,
				testIdPrefix: `${o}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ P("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ N(y, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ N(S, {
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
				}), /* @__PURE__ */ N(y, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ N(x, {
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
			e.layout === "image" && /* @__PURE__ */ N(y, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ N(x, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => s({ image: { alt: e.target.value } }),
					"data-testid": `${o}-image-alt`
				})
			}),
			/* @__PURE__ */ N(y, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ N(S, {
					...t,
					rows: 3,
					maxLength: he,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => s({ notes: e.target.value || void 0 }),
					"data-testid": `${o}-notes`
				})
			}),
			/* @__PURE__ */ N(Ae, {
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
function Fe(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Ie() {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Le() {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Re() {
	return /* @__PURE__ */ P("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ N("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ N("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function ze() {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Be({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, readOnly: s = !1, onSelect: c, onMove: l, onDuplicate: u, onDelete: f, canDuplicate: p, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: y }) {
	let b = Fe(i);
	return /* @__PURE__ */ P("li", {
		ref: _,
		"data-testid": `${y}-row-${e.id}`,
		"data-slide-id": e.id,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!s && (g ?? /* @__PURE__ */ N("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ P("button", {
				type: "button",
				onClick: () => c(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${y}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ N("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ N("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: b ? /* @__PURE__ */ N("img", {
							src: b,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${y}-thumb-${e.id}`
						}) : /* @__PURE__ */ N(m, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ P("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ N(m, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ N(m, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							o && /* @__PURE__ */ N(m, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${y}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!s && /* @__PURE__ */ P("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ P("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ N(d, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ N(Ie, {}),
						disabled: t === 0,
						onClick: () => l(t, t - 1),
						"data-testid": `${y}-up-${e.id}`
					}), /* @__PURE__ */ N(d, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ N(Le, {}),
						disabled: t >= n - 1,
						onClick: () => l(t, t + 1),
						"data-testid": `${y}-down-${e.id}`
					})]
				}), /* @__PURE__ */ P("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ N(d, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ N(Re, {}),
						disabled: !p,
						onClick: () => u(e.id),
						"data-testid": `${y}-duplicate-${e.id}`
					}), /* @__PURE__ */ N(d, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ N(ze, {}),
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
function Ve({ items: e, selectedId: t, readOnly: n = !1, onSelect: r, onMove: i, onDuplicate: a, onDelete: o, canDuplicate: s, testIdPrefix: c }) {
	return /* @__PURE__ */ N("ol", {
		className: "m-0 flex list-none flex-col gap-1 p-0",
		"data-testid": `${c}-list`,
		children: e.map((l, u) => /* @__PURE__ */ N(Be, {
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
var He = k(() => import("./SortableSlideList-CfR4v54k.js"));
function Ue({ back: e }) {
	return /* @__PURE__ */ N("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ N("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function We(e) {
	if (!(e instanceof HTMLElement)) return !1;
	let t = e.tagName;
	return t === "INPUT" || t === "TEXTAREA" || t === "SELECT" || e.isContentEditable;
}
function Ge({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: h, onDownload: g, onOpenPresentationView: _, readOnly: v = !1, className: S, "data-testid": C = "presentation-editor" }) {
	let [w, E] = M(() => e.slides[0]?.id ?? ""), [ne, re] = M(!1), [ie, O] = M(null), [k, oe] = M([]);
	j(() => {
		typeof n == "object" && "slides" in n && oe(n.slides);
	}, [n]);
	let le = ce(a);
	le.current = a, j(() => {
		le.current(e);
	}, [e]);
	let F = e.slides, ue = se(() => new Set(ye(e)), [e]), I = Math.max(F.findIndex((e) => e.id === w), 0), L = F[I], de = se(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : k;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, k]), fe = F.map((e) => ({
		slide: e,
		thumbnailSvg: de.get(e.id),
		uncited: ue.has(e.id)
	})), R = A((e) => {
		E(e);
	}, []), z = A((n, r) => {
		t(we(e, n, r));
	}, [t, e]), B = A(() => {
		let n = Te(e, I);
		n !== e && (t(n), E(n.slides[I + 1].id));
	}, [
		t,
		e,
		I
	]), V = A((n) => {
		let r = Ee(e, n);
		if (r === e) return;
		let i = r.slides.findIndex((e) => e.id === n);
		t(r), E(r.slides[i + 1].id);
	}, [t, e]), H = A((n) => {
		let r = e.slides.findIndex((e) => e.id === n), i = De(e, n);
		i !== e && (t(i), E(i.slides[Math.min(r, i.slides.length - 1)].id));
	}, [t, e]), W = ue.size, G = !v && F.length > 0 && W === 0 && !ne, K = A(() => {
		G && (re(!0), O(null), Promise.resolve(o(e)).catch((e) => {
			O(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => re(!1)));
	}, [
		G,
		o,
		e
	]), q = A((e) => {
		let t = F[I + e];
		t && E(t.id);
	}, [F, I]);
	if (j(() => {
		let e = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
				e.preventDefault(), K();
				return;
			}
			e.metaKey || e.ctrlKey || e.altKey || We(e.target) || (e.key === "ArrowLeft" ? (e.preventDefault(), q(-1)) : e.key === "ArrowRight" && (e.preventDefault(), q(1)));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [K, q]), v) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? F.map((e, t) => {
				let n = Fe(de.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ N("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}) : []
		}));
		return /* @__PURE__ */ N(U, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: I + 1,
			onSlideChange: (e) => {
				let t = F[e - 1];
				t && E(t.id);
			},
			...g ? { onDownload: g } : {},
			className: S,
			"data-testid": `${C}-readonly`
		});
	}
	let pe = (() => {
		if (n === "loading" && de.size === 0) return /* @__PURE__ */ N(p, {
			label: "Rendering the deck…",
			testId: `${C}-preview-loading`
		});
		if (typeof n == "object" && "error" in n) return /* @__PURE__ */ N(f, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${C}-preview-error`
		});
		let t = L ? Fe(de.get(L.id)) : void 0;
		return t ? /* @__PURE__ */ N("img", {
			src: t,
			alt: L.title || `Slide ${I + 1}`,
			className: "max-h-full max-w-full object-contain",
			"data-testid": `${C}-stage-image`
		}) : /* @__PURE__ */ N(m, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${C}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), me = s.map((e) => ({
		id: e.id,
		label: e.label
	}));
	return /* @__PURE__ */ P("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": C,
		onKeyDown: (e) => {
			e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
		},
		children: [
			/* @__PURE__ */ P("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ P("div", {
					className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,2fr)_minmax(0,1fr)]",
					children: [
						/* @__PURE__ */ N(y, {
							label: "Deck title",
							required: !0,
							children: (n) => /* @__PURE__ */ N(x, {
								...n,
								value: e.title,
								maxLength: 120,
								onChange: (n) => t({
									...e,
									title: n.target.value
								}),
								"data-testid": `${C}-deck-title`
							})
						}),
						/* @__PURE__ */ N(y, {
							label: "Subtitle",
							children: (n) => /* @__PURE__ */ N(x, {
								...n,
								value: e.subtitle ?? "",
								maxLength: 200,
								onChange: (n) => t({
									...e,
									subtitle: n.target.value || void 0
								}),
								"data-testid": `${C}-deck-subtitle`
							})
						}),
						/* @__PURE__ */ N(y, {
							label: "Theme",
							children: (n) => /* @__PURE__ */ N(D, {
								...n,
								value: e.theme ?? "product",
								options: Q.map((e) => ({
									value: e,
									label: e
								})),
								onChange: (n) => t({
									...e,
									theme: n.target.value
								}),
								"data-testid": `${C}-deck-theme`
							})
						})
					]
				}), /* @__PURE__ */ P("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						me.length > 0 && /* @__PURE__ */ N(b, {
							items: me,
							value: c,
							onValueChange: l,
							variant: "segmented",
							size: "sm",
							"aria-label": "Revision",
							idPrefix: `${C}-revisions`
						}),
						/* @__PURE__ */ N(i, {
							variant: "primary",
							size: "sm",
							disabled: !G,
							onClick: K,
							"data-testid": `${C}-save`,
							children: ne ? "Saving…" : `Save as ${Oe(s)}`
						}),
						g && /* @__PURE__ */ N(i, {
							variant: "secondary",
							size: "sm",
							onClick: g,
							"data-testid": `${C}-download`,
							children: "Download .pptx"
						}),
						_ && /* @__PURE__ */ N(i, {
							variant: "ghost",
							size: "sm",
							onClick: _,
							"data-testid": `${C}-open-view`,
							children: "Open in presentation view"
						})
					]
				})]
			}),
			W > 0 && /* @__PURE__ */ N(T, {
				tone: "warning",
				"data-testid": `${C}-uncited-warning`,
				children: W === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${W} slides cite no source. Every slide names at least one — Save is off until they do.`
			}),
			ie && /* @__PURE__ */ N(T, {
				tone: "error",
				onDismiss: () => O(null),
				"data-testid": `${C}-save-error`,
				children: ie
			}),
			/* @__PURE__ */ P("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ P("div", {
					className: "flex min-w-0 flex-col gap-2 md:w-72",
					"data-testid": `${C}-rail`,
					children: [
						/* @__PURE__ */ P("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ N(te, {
								as: "div",
								children: "Slides"
							}), /* @__PURE__ */ N(ee, {
								value: F.length / 40,
								segments: 10,
								showPercent: !1,
								tone: "surface",
								note: `${F.length} / 40`,
								"data-testid": `${C}-slide-meter`
							})]
						}),
						/* @__PURE__ */ P("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ N(y, {
								label: "Layout",
								className: "min-w-0 flex-1",
								children: (n) => /* @__PURE__ */ N(D, {
									...n,
									size: "sm",
									value: L?.layout ?? "bullets",
									disabled: !L,
									options: X.map((e) => ({
										value: e,
										label: Z[e]
									})),
									onChange: (n) => {
										L && t($(e, Ce(L, n.target.value)));
									},
									"data-testid": `${C}-layout`
								})
							}), /* @__PURE__ */ N(i, {
								variant: "secondary",
								size: "sm",
								disabled: F.length >= 40,
								onClick: B,
								"data-testid": `${C}-add-slide`,
								children: "Add slide"
							})]
						}),
						/* @__PURE__ */ N("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ N(ae, {
								fallback: /* @__PURE__ */ N(Ve, {
									items: fe,
									selectedId: L?.id ?? "",
									onSelect: R,
									onMove: z,
									onDuplicate: V,
									onDelete: H,
									canDuplicate: F.length < 40,
									testIdPrefix: `${C}-slide`
								}),
								children: /* @__PURE__ */ N(He, {
									items: fe,
									selectedId: L?.id ?? "",
									onSelect: R,
									onMove: z,
									onDuplicate: V,
									onDelete: H,
									canDuplicate: F.length < 40,
									testIdPrefix: `${C}-slide`
								})
							})
						})
					]
				}), /* @__PURE__ */ P("div", {
					className: "flex min-w-0 flex-1 flex-col gap-3",
					children: [
						/* @__PURE__ */ N("div", {
							className: "flex min-h-[14rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40 p-2",
							"data-testid": `${C}-stage`,
							children: pe
						}),
						/* @__PURE__ */ P("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ N(d, {
									"aria-label": "Previous slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ N(Ue, { back: !0 }),
									disabled: I <= 0,
									onClick: () => q(-1),
									"data-testid": `${C}-previous`
								}),
								/* @__PURE__ */ N(m, {
									className: "text-[13px] text-text-secondary",
									"data-testid": `${C}-position`,
									children: `Slide ${F.length === 0 ? 0 : I + 1} of ${F.length}`
								}),
								/* @__PURE__ */ N(d, {
									"aria-label": "Next slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ N(Ue, {}),
									disabled: I >= F.length - 1,
									onClick: () => q(1),
									"data-testid": `${C}-next`
								})
							]
						}),
						L && /* @__PURE__ */ N(Pe, {
							slide: L,
							onChange: (n) => t($(e, n)),
							sources: u,
							onSearchSources: h,
							testIdPrefix: `${C}-slide`
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { $ as A, be as C, Oe as D, we as E, V as F, z as I, R as L, Ce as M, U as N, xe as O, B as P, Te as S, Se as T, pe as _, Pe as a, X as b, G as c, _e as d, me as f, J as g, W as h, Fe as i, ye as j, De as k, K as l, ve as m, Ve as n, Ae as o, he as p, Be as r, Q as s, Ge as t, ge as u, q as v, Ee as w, Z as x, Y as y };
