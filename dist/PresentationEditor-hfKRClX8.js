import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { _ as i } from "./overlayStack-BDlo8PJg.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CypeBEj0.js";
import { t as d } from "./IconButton-C3DMtvSx.js";
import { i as f, n as p } from "./Text-D5E7T_4D.js";
import { t as m } from "./Chip-DYqbAD3L.js";
import { t as h } from "./Modal-D2qxMX2_.js";
import { t as g } from "./EmptyState-DQYx5Oyy.js";
import { i as _, n as v, r as y, t as b } from "./SearchInput-DXbGHmns.js";
import { t as x } from "./FormField-E8Z0ppOp.js";
import { n as S } from "./Tabs-BGZyr2nH.js";
import { t as C } from "./Input-DLknWXri.js";
import { t as w } from "./Textarea-Dz4doxTv.js";
import { t as T } from "./DotMeter-BDVkadI8.js";
import { t as E } from "./InlineAlert-CRnIKeAF.js";
import { t as D } from "./SectionLabel-bcrhNYOr.js";
import { t as ee } from "./StatusPill-Db42eiME.js";
import { t as O } from "./Select-CD8ixtYi.js";
import { G as k, U as te } from "./renderers-5O9bh08s.js";
import { t as ne } from "./ComposerReferences-nGKcicNt.js";
import { Component as A, Suspense as re, lazy as j, useCallback as M, useEffect as ie, useId as N, useMemo as ae, useRef as oe, useState as P } from "react";
import { Fragment as se, jsx as F, jsxs as I } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var L = /* @__PURE__ */ new Set(["diagram", "presentation"]), R = [
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
], ce = [
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
function le(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function z(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function B(t) {
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
	let [l, u] = P([]), [d, p] = P(!1), [g, _] = P(null), [v, y] = P(null), [b, x] = P(""), [S, T] = P(""), [E, D] = P(!1), [ee, ne] = P(""), [A, re] = P("page"), [j, M] = P("blank"), [V, H] = P(""), [U, W] = P(""), [ue, G] = P([]), de = oe(null), K = oe(null), q = N(), fe = `${q}-blank-label`, J = `${q}-type-label`, Y = `${q}-cookbook-label`, pe = `${q}-title`, X = `${q}-description`, me = `${q}-deck-from`, he = `${q}-deck-source`;
	ie(() => {
		if (!e) return;
		let r = n();
		u(r), _(null), y(null), x(""), T(""), D(!1), ne(""), re("page"), M("blank"), H(""), W(""), G([]);
		let i = !1;
		p(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			u(t), _((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || p(!1);
		});
		let a = setTimeout(() => de.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let ge = ae(() => R.filter((e) => le(e, b)), [b]), Z = ae(() => l.filter((e) => z(e, b)), [l, b]), _e = ae(() => te.filter((e) => k(e, b)), [b]);
	if (ie(() => {
		if (!e || A !== "presentation") return;
		if (j === "blank") {
			G([]);
			return;
		}
		let t = U.trim().toLowerCase();
		if (j === "transcript") {
			let e = c ?? [];
			G(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			G([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(U.trim())).then((e) => {
			n || G(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		A,
		j,
		U,
		c,
		s
	]), !e) return null;
	let ve = l.find((e) => e.id === g), Q = v ? te.find((e) => e.id === v) : void 0, ye = A === "sections", be = !!Q || !!ve, xe = l.length === 0 && !d && !Q, Se = ge.length === 0 && Z.length === 0 && _e.length === 0, Ce = Q ? {
		kind: "cookbook",
		cookbook: Q
	} : ve && !L.has(A) ? {
		kind: "type",
		type: ve
	} : {
		kind: "blank",
		shape: A
	}, $ = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), L.has(A) && re("page"), E || T(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			re(e.shape), L.has(e.shape) && (y(null), E || T(""));
			return;
		}
		y(null), _(e.type.id), E || T("");
	}, we = (e) => e.kind === "blank" ? e.shape : L.has(A) ? "page" : A, Te = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = ee.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: j,
				...j !== "blank" && V ? { sourceId: V } : {},
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
			let t = B(e.cookbook);
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
	}, Ee = A === "presentation" && j !== "blank" && !V, De = !!S.trim() && (!ye || be) && !Ee, Oe = () => {
		De && Te(Ce, S, we(Ce));
	};
	return /* @__PURE__ */ F(h, {
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
				e.key === "Enter" && !e.shiftKey && De && Oe();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ F("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ I("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ F(C, {
						ref: de,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => x(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = _e.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: _e[0]
							} : ge.length > 0 ? {
								kind: "blank",
								shape: ge[0].id
							} : Z.length > 0 ? {
								kind: "type",
								type: Z[0]
							} : void 0;
							if (!t) return;
							$(t);
							let n = S.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								K.current?.focus();
								return;
							}
							Te(t, n, we(t));
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
						ge.length > 0 && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ F("div", {
								id: fe,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ F("div", {
								role: "group",
								"aria-labelledby": fe,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: ge.map((e) => /* @__PURE__ */ I(f, {
									padding: "md",
									selected: A === e.id,
									onSelect: () => $({
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
											e.id === "page" && /* @__PURE__ */ F(m, {
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
						A === "presentation" && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ F("label", {
									htmlFor: me,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ F(O, {
									id: me,
									value: j,
									options: ce.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										M(e.target.value), H(""), W("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ F("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: j === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								j !== "blank" && /* @__PURE__ */ I("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ F(C, {
										type: "search",
										value: U,
										onChange: (e) => W(e.target.value),
										"aria-label": j === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: j === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ue.length === 0 ? /* @__PURE__ */ F("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: j === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ I(se, { children: [/* @__PURE__ */ I("label", {
										htmlFor: he,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											j === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ F("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ F(O, {
										id: he,
										required: !0,
										"aria-required": "true",
										value: V,
										placeholder: "Choose one…",
										options: ue.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => H(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						_e.length > 0 && /* @__PURE__ */ I("div", {
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
									children: A === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : A === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : A === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ F("div", {
								role: "group",
								"aria-labelledby": Y,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: _e.map((e) => {
									let t = v === e.id;
									return /* @__PURE__ */ I(f, {
										padding: "md",
										selected: t,
										onSelect: () => $({
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
						!L.has(A) && (Z.length > 0 || xe || l.length === 0 && d) && /* @__PURE__ */ I("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ I("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ F("span", {
										id: J,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !ye && /* @__PURE__ */ F("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								l.length === 0 && d && /* @__PURE__ */ F("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								xe && /* @__PURE__ */ F("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: ye ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								Z.length > 0 && /* @__PURE__ */ F("div", {
									role: "group",
									"aria-labelledby": J,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Z.map((e) => {
										let t = !Q && g === e.id;
										return /* @__PURE__ */ I("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => $({
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
															children: A === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
						Se && /* @__PURE__ */ I("div", {
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
						}), /* @__PURE__ */ F(C, {
							ref: K,
							id: pe,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: S,
							onChange: (e) => {
								T(e.target.value), D(!0);
							},
							placeholder: Q ? `e.g. ${Q.name}` : ve ? `e.g. Q2 ${ve.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ I("div", { children: [/* @__PURE__ */ I("label", {
						htmlFor: X,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ F("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ F(w, {
						id: X,
						"data-testid": "new-doc-description",
						value: ee,
						onChange: (e) => ne(e.target.value),
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
var H = class extends A {
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
function U({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": d }) {
	let f = N(), p = c === 3 ? "h3" : "h2", h = t === 0;
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
					/* @__PURE__ */ F(m, {
						tone: h ? "neutral" : n,
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
			h && o ? /* @__PURE__ */ F(g, {
				size: "sm",
				testId: o.testId ?? (d ? `${d}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ F("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!h && s != null && /* @__PURE__ */ F("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function W({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ F("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function ue(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function G(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || ue(e.target)) return null;
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
function de(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function K({ back: e }) {
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
function q({ title: e, revisions: t, revisionId: n, onRevisionChange: a, slideIndex: o, onSlideChange: s, onDownload: c, downloadLabel: l = "Download .pptx", onOpenPreview: u, pending: f, notice: m, state: h = "ready", errorMessage: b, onRetry: x, maxSlideWidth: S, className: C, "data-testid": w = "presentation-view" }) {
	let T = N();
	if (h === "loading") return /* @__PURE__ */ F(y, {
		label: "Opening the presentation…",
		testId: `${w}-loading`
	});
	if (h === "error") return /* @__PURE__ */ F(_, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...x ? {
			actionLabel: "Try again",
			onAction: x
		} : {},
		testId: `${w}-error`
	});
	let E = t.find((e) => e.id === n) ?? t[0], O = E?.slides ?? [];
	if (h === "empty" || !E || O.length === 0) return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", C),
		"data-testid": w,
		children: [/* @__PURE__ */ F(p, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ F(g, {
			title: "No slides yet",
			description: f?.status === "generating" ? `${f.label} is still being generated.` : f?.status === "failed" ? f.message ?? `${f.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${w}-empty`
		})]
	});
	let k = O[Math.min(Math.max(o, 1), O.length) - 1];
	return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", C),
		"data-testid": w,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${k.index} of ${O.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = G(e);
			if (!t) return;
			e.preventDefault();
			let n = de(t, k.index, O.length);
			n !== k.index && s(n);
		},
		children: [
			/* @__PURE__ */ I("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ F(p, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${w}-title`,
					children: e
				}), /* @__PURE__ */ I("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ F(v, {
							"aria-label": "Revision",
							size: "sm",
							value: E.id,
							onChange: a,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${w}-revisions`
						}),
						f && /* @__PURE__ */ F(ee, {
							state: f.status === "failed" ? "error" : "pending",
							label: `${f.label} ${f.status}`,
							"data-testid": `${w}-pending`
						}),
						c && /* @__PURE__ */ F(i, {
							variant: "secondary",
							size: "sm",
							onClick: c,
							"data-testid": `${w}-download`,
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
							style: S === void 0 ? void 0 : { maxWidth: S },
							"data-testid": `${w}-stage`,
							children: k.preview ?? /* @__PURE__ */ F(p, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${w}-no-preview`,
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
								icon: /* @__PURE__ */ F(K, { back: !0 }),
								disabled: k.index <= 1,
								onClick: () => s(k.index - 1),
								"data-testid": `${w}-previous`
							}),
							/* @__PURE__ */ F(p, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${w}-position`,
								children: `Slide ${k.index} of ${O.length}`
							}),
							/* @__PURE__ */ F(d, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ F(K, {}),
								disabled: k.index >= O.length,
								onClick: () => s(k.index + 1),
								"data-testid": `${w}-next`
							}),
							u && k.preview && /* @__PURE__ */ F(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => u(k.id),
								"data-testid": `${w}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ I("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": T,
					"data-testid": `${w}-outline`,
					children: [/* @__PURE__ */ F(D, {
						as: "div",
						className: "mb-1",
						"data-testid": `${w}-outline-label`,
						children: /* @__PURE__ */ F("span", {
							id: T,
							children: "Slides"
						})
					}), /* @__PURE__ */ F("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: O.map((e) => /* @__PURE__ */ F("li", { children: /* @__PURE__ */ I("button", {
							type: "button",
							onClick: () => s(e.index),
							"aria-current": e.id === k.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === k.id && "bg-surface-hover font-medium"),
							"data-testid": `${w}-outline-row`,
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
			m && /* @__PURE__ */ F(p, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${w}-notice`,
				children: m
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var fe = 40, J = 8, Y = 200, pe = 120, X = 200, me = 60, he = 2e3, ge = 24, Z = 6, _e = 400, ve = 10, Q = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, ye = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], be = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, xe = [
	"product",
	"engineering",
	"plain"
];
function Se(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Ce(e) {
	return e.slides.length > 0 && Se(e).length === 0;
}
function $(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function we(e, t = "bullets") {
	return Te({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Te(e, t) {
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
function Ee(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function De(e, t, n) {
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
	let r = we($(e), n), i = e.slides.slice();
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
		id: $(e),
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
	let [c, l] = P(""), [u, d] = P(n), f = N(), m = oe(0);
	ie(() => {
		let e = c.trim();
		if (!a) {
			let t = e.toLowerCase();
			d(t ? n.filter((e) => e.title.toLowerCase().includes(t)) : n);
			return;
		}
		let t = ++m.current, r = !1;
		return Promise.resolve(a(e)).then((e) => {
			r || t !== m.current || d(e);
		}).catch(() => {
			!r && t === m.current && d(n);
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
			}) : /* @__PURE__ */ F(ne, {
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
				children: [/* @__PURE__ */ F(b, {
					value: c,
					onChange: l,
					placeholder: "Search your documents and transcripts…",
					"aria-label": "Search sources",
					"data-testid": `${s}-source-search`
				}), g ? /* @__PURE__ */ F(p, {
					className: "text-[11px] text-text-tertiary",
					children: "A slide cites at most 10 sources."
				}) : u.length === 0 ? /* @__PURE__ */ F(p, {
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
						/* @__PURE__ */ F(p, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ F(C, {
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
			children: [/* @__PURE__ */ F(x, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ F(O, {
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
					e.series.map((i, a) => /* @__PURE__ */ F(c, { children: /* @__PURE__ */ F(C, {
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
					/* @__PURE__ */ F(a, { children: /* @__PURE__ */ F(C, {
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
					e.series.map((e, t) => /* @__PURE__ */ F(a, { children: /* @__PURE__ */ F(C, {
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
				children: [/* @__PURE__ */ F(x, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ F(C, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => s({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${o}-eyebrow`
					})
				}), /* @__PURE__ */ F(x, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ F(C, {
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
				children: [/* @__PURE__ */ F(x, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ F(w, {
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
				}), /* @__PURE__ */ F(x, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ F(C, {
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
			e.layout === "image" && /* @__PURE__ */ F(x, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ F(C, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => s({ image: { alt: e.target.value } }),
					"data-testid": `${o}-image-alt`
				})
			}),
			/* @__PURE__ */ F(x, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ F(w, {
					...t,
					rows: 3,
					maxLength: he,
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
function Ue({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, readOnly: s = !1, onSelect: c, onMove: l, onDuplicate: u, onDelete: f, canDuplicate: m, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: y }) {
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
						}) : /* @__PURE__ */ F(p, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ I("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ F(p, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ F(p, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							o && /* @__PURE__ */ F(p, {
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
						disabled: !m,
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
var Ge = j(() => import("./SortableSlideList-DMsGP-9R.js"));
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
function qe({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, sources: u, onSearchSources: f, onDownload: m, onOpenPresentationView: h, readOnly: v = !1, className: b, "data-testid": w = "presentation-editor" }) {
	let [ee, k] = P(() => e.slides[0]?.id ?? ""), [te, ne] = P(!1), [A, j] = P(null), [N, se] = P([]);
	ie(() => {
		typeof n == "object" && "slides" in n && se(n.slides);
	}, [n]);
	let L = oe(a);
	L.current = a;
	let R = e.slides, ce = ae(() => new Set(Se(e)), [e]), le = ce.size === 0;
	ie(() => {
		le && L.current(e);
	}, [e, le]);
	let z = Math.max(R.findIndex((e) => e.id === ee), 0), B = R[z], V = ae(() => {
		let e = typeof n == "object" && "slides" in n ? n.slides : N;
		return new Map(e.map((e) => [e.id, e.svg]));
	}, [n, N]), H = R.map((e) => ({
		slide: e,
		thumbnailSvg: V.get(e.id),
		uncited: ce.has(e.id)
	})), U = M((e) => {
		k(e);
	}, []), W = M((n, r) => {
		t(De(e, n, r));
	}, [t, e]), ue = M(() => {
		let n = Oe(e, z);
		n !== e && (t(n), k(n.slides[z + 1].id));
	}, [
		t,
		e,
		z
	]), K = M((n) => {
		let r = ke(e, n);
		if (r === e) return;
		let i = r.slides.findIndex((e) => e.id === n);
		t(r), k(r.slides[i + 1].id);
	}, [t, e]), fe = M((n) => {
		let r = e.slides.findIndex((e) => e.id === n), i = Ae(e, n);
		i !== e && (t(i), k(i.slides[Math.min(r, i.slides.length - 1)].id));
	}, [t, e]), J = ce.size, Y = !v && R.length > 0 && J === 0 && !te, pe = M(() => {
		Y && (ne(!0), j(null), Promise.resolve(o(e)).catch((e) => {
			j(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ne(!1)));
	}, [
		Y,
		o,
		e
	]), X = M((e) => {
		let t = R[z + e];
		t && k(t.id);
	}, [R, z]);
	if (ie(() => {
		let e = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
				e.preventDefault(), pe();
				return;
			}
			let t = G(e);
			if (!t) return;
			e.preventDefault();
			let n = de(t, z + 1, R.length);
			n !== z + 1 && X(n - (z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		pe,
		X,
		z,
		R.length
	]), v) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? R.map((e, t) => {
				let n = Re(V.get(e.id));
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
		return /* @__PURE__ */ F(q, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: z + 1,
			onSlideChange: (e) => {
				let t = R[e - 1];
				t && k(t.id);
			},
			...m ? { onDownload: m } : {},
			className: b,
			"data-testid": `${w}-readonly`
		});
	}
	let me = (() => {
		if (B && ce.has(B.id)) return /* @__PURE__ */ F(g, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${w}-preview-needs-source`
		});
		let t = B ? Re(V.get(B.id)) : void 0;
		if (!le && !t) return /* @__PURE__ */ F(g, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${w}-preview-needs-source`
		});
		if (n === "loading" && V.size === 0) return /* @__PURE__ */ F(y, {
			label: "Rendering the deck…",
			testId: `${w}-preview-loading`
		});
		if (le && typeof n == "object" && "error" in n) return /* @__PURE__ */ F(_, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${w}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ F("img", {
			src: r,
			alt: B.title || `Slide ${z + 1}`,
			className: "max-h-full max-w-full object-contain",
			"data-testid": `${w}-stage-image`
		}) : /* @__PURE__ */ F(p, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${w}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), he = s.map((e) => ({
		id: e.id,
		label: e.label
	}));
	return /* @__PURE__ */ I("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", b),
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
						/* @__PURE__ */ F(x, {
							label: "Deck title",
							required: !0,
							children: (n) => /* @__PURE__ */ F(C, {
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
						/* @__PURE__ */ F(x, {
							label: "Subtitle",
							children: (n) => /* @__PURE__ */ F(C, {
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
						/* @__PURE__ */ F(x, {
							label: "Theme",
							children: (n) => /* @__PURE__ */ F(O, {
								...n,
								value: e.theme ?? "product",
								options: xe.map((e) => ({
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
						he.length > 0 && /* @__PURE__ */ F(S, {
							items: he,
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
							disabled: !Y,
							onClick: pe,
							"data-testid": `${w}-save`,
							children: te ? "Saving…" : `Save as ${je(s)}`
						}),
						m && /* @__PURE__ */ F(i, {
							variant: "secondary",
							size: "sm",
							onClick: m,
							"data-testid": `${w}-download`,
							children: "Download .pptx"
						}),
						h && /* @__PURE__ */ F(i, {
							variant: "ghost",
							size: "sm",
							onClick: h,
							"data-testid": `${w}-open-view`,
							children: "Open in presentation view"
						})
					]
				})]
			}),
			J > 0 && /* @__PURE__ */ F(E, {
				tone: "warning",
				"data-testid": `${w}-uncited-warning`,
				children: J === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${J} slides cite no source. Every slide names at least one — Save is off until they do.`
			}),
			A && /* @__PURE__ */ F(E, {
				tone: "error",
				onDismiss: () => j(null),
				"data-testid": `${w}-save-error`,
				children: A
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
							}), /* @__PURE__ */ F(T, {
								value: R.length / 40,
								segments: 10,
								showPercent: !1,
								tone: "surface",
								note: `${R.length} / 40`,
								"data-testid": `${w}-slide-meter`
							})]
						}),
						/* @__PURE__ */ I("div", {
							className: "flex items-end gap-2",
							children: [/* @__PURE__ */ F(x, {
								label: "Layout",
								className: "min-w-0 flex-1",
								children: (n) => /* @__PURE__ */ F(O, {
									...n,
									size: "sm",
									value: B?.layout ?? "bullets",
									disabled: !B,
									options: ye.map((e) => ({
										value: e,
										label: be[e]
									})),
									onChange: (n) => {
										B && t(Ee(e, Te(B, n.target.value)));
									},
									"data-testid": `${w}-layout`
								})
							}), /* @__PURE__ */ F(i, {
								variant: "secondary",
								size: "sm",
								disabled: R.length >= 40,
								onClick: ue,
								"data-testid": `${w}-add-slide`,
								children: "Add slide"
							})]
						}),
						/* @__PURE__ */ F("div", {
							className: "min-h-0 flex-1 overflow-y-auto",
							children: /* @__PURE__ */ F(re, {
								fallback: /* @__PURE__ */ F(We, {
									items: H,
									selectedId: B?.id ?? "",
									onSelect: U,
									onMove: W,
									onDuplicate: K,
									onDelete: fe,
									canDuplicate: R.length < 40,
									testIdPrefix: `${w}-slide`
								}),
								children: /* @__PURE__ */ F(Ge, {
									items: H,
									selectedId: B?.id ?? "",
									onSelect: U,
									onMove: W,
									onDuplicate: K,
									onDelete: fe,
									canDuplicate: R.length < 40,
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
							children: me
						}),
						/* @__PURE__ */ I("div", {
							className: "flex items-center justify-center gap-2",
							children: [
								/* @__PURE__ */ F(d, {
									"aria-label": "Previous slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ F(Ke, { back: !0 }),
									disabled: z <= 0,
									onClick: () => X(-1),
									"data-testid": `${w}-previous`
								}),
								/* @__PURE__ */ F(p, {
									className: "text-[13px] text-text-secondary",
									"data-testid": `${w}-position`,
									children: `Slide ${R.length === 0 ? 0 : z + 1} of ${R.length}`
								}),
								/* @__PURE__ */ F(d, {
									"aria-label": "Next slide",
									variant: "ghost",
									size: "sm",
									icon: /* @__PURE__ */ F(Ke, {}),
									disabled: z >= R.length - 1,
									onClick: () => X(1),
									"data-testid": `${w}-next`
								})
							]
						}),
						B && /* @__PURE__ */ F(Le, {
							slide: B,
							onChange: (n) => t(Ee(e, n)),
							sources: u,
							onSearchSources: f,
							testIdPrefix: `${w}-slide`
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Ee as A, Ce as C, je as D, De as E, W as F, H as I, V as L, Te as M, q as N, $ as O, U as P, Oe as S, we as T, X as _, Le as a, ye as b, J as c, Z as d, me as f, ve as g, fe as h, Re as i, Se as j, Ae as k, Y as l, _e as m, We as n, Ne as o, he as p, Ue as r, xe as s, qe as t, ge as u, pe as v, ke as w, be as x, Q as y };
