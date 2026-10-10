import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-D4QmbyEy.js";
import { n as i } from "./Button-C2OEUpX-.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CG6ZfYj8.js";
import { t as d } from "./Chip-0zFpfJ52.js";
import { a as f, n as p } from "./Tabs-DqkWBCTi.js";
import { m, tt as h } from "./Icons-B_xESAH3.js";
import { a as g, r as _ } from "./FollowBanner-CFgvOjVO.js";
import { n as v } from "./Badge-POenI45X.js";
import { t as y } from "./Modal-CjgKqXl7.js";
import { t as b } from "./Input-CpLq80dw.js";
import { t as x } from "./EmptyState-BupZX4UK.js";
import { n as S, t as C } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as w, t as T } from "./StatusPill-c89IbU1L.js";
import { t as E } from "./FormField-BQhFpmZJ.js";
import { t as D } from "./DropdownMenu-M27Ly7by.js";
import { t as O } from "./Textarea-Drx4YDDG.js";
import { t as k } from "./DotMeter-KxyExwVb.js";
import { t as ee } from "./SegmentedControl-C2b-qya3.js";
import { t as A } from "./SearchInput-8LpHL-oD.js";
import { n as j } from "./RovingToolbar-B1Fai5PF.js";
import { t as M } from "./InlineAlert-CBtteaVZ.js";
import { n as N } from "./Text-BA4t3u5l.js";
import { t as P } from "./PresenceAvatars-DAgxQ3PF.js";
import { t as F } from "./useMeasuredWidth-BPrwD0q5.js";
import { t as I } from "./SectionLabel-Bn8Vvb-K.js";
import { t as te } from "./Select-C6OGjVyH.js";
import { G as L, U as R } from "./renderers-cv5TKsG8.js";
import { a as ne } from "./composerSendError-D9zJtYFp.js";
import { i as re, t as ie } from "./FloatingComposerDock-ZezHreIm.js";
import { Component as ae, Suspense as oe, lazy as z, useCallback as B, useEffect as V, useId as se, useMemo as H, useRef as U, useState as W } from "react";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var J = /* @__PURE__ */ new Set(["diagram", "presentation"]), ce = [
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
], le = [
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
function ue(e, t) {
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
function pe({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c, initialShape: l }) {
	let [u, f] = W([]), [p, m] = W(!1), [h, _] = W(null), [v, x] = W(null), [S, C] = W(""), [w, T] = W(""), [E, D] = W(!1), [k, ee] = W(""), [A, j] = W("page"), [M, N] = W("blank"), [P, F] = W(""), [I, ne] = W(""), [re, ie] = W([]), ae = U(null), oe = U(null), z = se(), B = `${z}-blank-label`, pe = `${z}-type-label`, me = `${z}-cookbook-label`, he = `${z}-title`, ge = `${z}-description`, _e = `${z}-deck-from`, ve = `${z}-deck-source`;
	V(() => {
		if (!e) return;
		let r = n();
		f(r), _(null), x(null), C(""), T(""), D(!1), ee(""), j(l ?? "page"), N("blank"), F(""), ne(""), ie([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), _((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => ae.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let Y = H(() => ce.filter((e) => ue(e, S)), [S]), ye = H(() => u.filter((e) => de(e, S)), [u, S]), be = H(() => R.filter((e) => L(e, S)), [S]);
	if (V(() => {
		if (!e || A !== "presentation") return;
		if (M === "blank") {
			ie([]);
			return;
		}
		let t = I.trim().toLowerCase();
		if (M === "transcript") {
			let e = c ?? [];
			ie(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			ie([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(I.trim())).then((e) => {
			n || ie(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		A,
		M,
		I,
		c,
		s
	]), !e) return null;
	let xe = u.find((e) => e.id === h), Se = v ? R.find((e) => e.id === v) : void 0, Ce = A === "sections", we = !!Se || !!xe, Te = u.length === 0 && !p && !Se, Ee = Y.length === 0 && ye.length === 0 && be.length === 0, X = Se ? {
		kind: "cookbook",
		cookbook: Se
	} : xe && !J.has(A) ? {
		kind: "type",
		type: xe
	} : {
		kind: "blank",
		shape: A
	}, De = (e) => {
		if (e.kind === "cookbook") {
			x(e.cookbook.id), J.has(A) && j("page"), E || T(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			j(e.shape), J.has(e.shape) && (x(null), E || T(""));
			return;
		}
		x(null), _(e.type.id), E || T("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : J.has(A) ? "page" : A, ke = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = k.trim() || void 0;
		if (n === "presentation") {
			o ? o({
				from: M,
				...M !== "blank" && P ? { sourceId: P } : {},
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
	}, Ae = A === "presentation" && M !== "blank" && !P, je = !!w.trim() && (!Ce || we) && !Ae, Z = () => {
		je && ke(X, w, Oe(X));
	};
	return /* @__PURE__ */ K(y, {
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
		children: /* @__PURE__ */ q("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && je && Z();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ K("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ q("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ K(b, {
						ref: ae,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: S,
						onChange: (e) => C(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = be.length > 0 && S.trim() ? {
								kind: "cookbook",
								cookbook: be[0]
							} : Y.length > 0 ? {
								kind: "blank",
								shape: Y[0].id
							} : ye.length > 0 ? {
								kind: "type",
								type: ye[0]
							} : void 0;
							if (!t) return;
							De(t);
							let n = w.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								oe.current?.focus();
								return;
							}
							ke(t, n, Oe(t));
						}
					}), /* @__PURE__ */ K("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ q("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						Y.length > 0 && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ K("div", {
								id: B,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": B,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: Y.map((e) => /* @__PURE__ */ q(g, {
									padding: "md",
									selected: A === e.id,
									onSelect: () => De({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ q("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ K("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ K("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ K(d, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ K("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						A === "presentation" && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ K("label", {
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ K(te, {
									id: _e,
									value: M,
									options: le.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										N(e.target.value), F(""), ne("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ K("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: M === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								M !== "blank" && /* @__PURE__ */ q("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ K(b, {
										type: "search",
										value: I,
										onChange: (e) => ne(e.target.value),
										"aria-label": M === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: M === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), re.length === 0 ? /* @__PURE__ */ K("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: M === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ q("label", {
										htmlFor: ve,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											M === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ K("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ K(te, {
										id: ve,
										required: !0,
										"aria-required": "true",
										value: P,
										placeholder: "Choose one…",
										options: re.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => F(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						be.length > 0 && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ q("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ K("div", {
									id: me,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ K("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: A === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : A === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : A === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": me,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: be.map((e) => {
									let t = v === e.id;
									return /* @__PURE__ */ q(g, {
										padding: "md",
										selected: t,
										onSelect: () => De({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ q("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ K("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ K("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ K("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ K("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!J.has(A) && (ye.length > 0 || Te || u.length === 0 && p) && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ q("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ K("span", {
										id: pe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Ce && /* @__PURE__ */ K("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								u.length === 0 && p && /* @__PURE__ */ K("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Te && /* @__PURE__ */ K("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Ce ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								ye.length > 0 && /* @__PURE__ */ K("div", {
									role: "group",
									"aria-labelledby": pe,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: ye.map((e) => {
										let t = !Se && h === e.id;
										return /* @__PURE__ */ q("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => De({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ K("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ q("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ K("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ K("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ K("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: A === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ K("span", {
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
						Ee && /* @__PURE__ */ q("div", {
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
				/* @__PURE__ */ q("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ q("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ q("label", {
							htmlFor: he,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ K("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ K(b, {
							ref: oe,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: w,
							onChange: (e) => {
								T(e.target.value), D(!0);
							},
							placeholder: Se ? `e.g. ${Se.name}` : xe ? `e.g. Q2 ${xe.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ q("div", { children: [/* @__PURE__ */ q("label", {
						htmlFor: ge,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ K("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ K(O, {
						id: ge,
						"data-testid": "new-doc-description",
						value: k,
						onChange: (e) => ee(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ q("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ K("button", {
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ K("button", {
						"data-testid": "new-doc-submit",
						onClick: Z,
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
var me = class extends ae {
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
		return this.state.hasError ? /* @__PURE__ */ q("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ K("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ K("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ K("button", {
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
function he({ title: e, count: t, countTone: n = "neutral", hint: i, action: a, empty: o, footer: s, headingLevel: c = 2, children: l, className: u, "data-testid": f }) {
	let p = se(), m = c === 3 ? "h3" : "h2", h = t === 0;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": p,
		"data-testid": f,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", u),
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ K(m, {
						id: p,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ K(d, {
						tone: h ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ K("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					a != null && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K("span", { className: "flex-1" }), /* @__PURE__ */ K("div", {
						className: "flex shrink-0 items-center gap-2",
						children: a
					})] })
				]
			}),
			h && o ? /* @__PURE__ */ K(x, {
				size: "sm",
				testId: o.testId ?? (f ? `${f}-empty` : "inbox-section-empty"),
				...o.icon == null ? {} : { icon: o.icon },
				title: o.title,
				...o.body ? { body: o.body } : {}
			}) : /* @__PURE__ */ K("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: l
			}),
			!h && s != null && /* @__PURE__ */ K("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: s
			})
		]
	});
}
function ge({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ K("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var _e = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function ve({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
	let [p, m] = W(!1), [h, g] = W(e), _ = U(null);
	V(() => {
		p || g(e);
	}, [e, p]), V(() => {
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
	return p ? /* @__PURE__ */ K(b, {
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
	}) : /* @__PURE__ */ K("button", {
		type: "button",
		disabled: s,
		onClick: () => m(!0),
		"aria-label": `${n}: ${e || i || "empty"}. Click to edit.`,
		title: "Click to edit",
		"data-testid": f,
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", _e[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var Y = "__older-revisions__";
function ye(e, t) {
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
function be(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
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
function Ce(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var we = 5;
function Te({ back: e }) {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ee({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: d = "Download .pptx", onOpenPreview: p, pending: m, notice: h, state: g = "ready", errorMessage: v, ownerName: y, onRetry: b, maxSlideWidth: C, autoFocus: E = !1, className: D, "data-testid": O = "presentation-view" }) {
	let k = se(), A = U(null), j = U(!1);
	if (V(() => {
		!E || j.current || !A.current || (j.current = !0, A.current.focus({ preventScroll: !0 }));
	}), g === "loading") return /* @__PURE__ */ K(w, {
		label: "Opening the presentation…",
		testId: `${O}-loading`
	});
	if (g === "no-access") return /* @__PURE__ */ K(_, {
		resource: "this presentation",
		ownerName: y ?? null,
		testId: `${O}-no-access`
	});
	if (g === "error") return /* @__PURE__ */ K(S, {
		title: "This presentation could not be opened",
		...v ? { description: v } : {},
		...b ? {
			actionLabel: "Try again",
			onAction: b
		} : {},
		testId: `${O}-error`
	});
	let M = n.find((e) => e.id === o) ?? n[0], P = M?.slides ?? [];
	if (g === "empty" || !M || P.length === 0) return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", D),
		"data-testid": O,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ K(N, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ K(N, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${O}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ K(x, {
			title: "No slides yet",
			description: m?.status === "generating" ? `${m.label} is still being generated.` : m?.status === "failed" ? m.message ?? `${m.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${O}-empty`
		})]
	});
	let F = P[Math.min(Math.max(c, 1), P.length) - 1];
	return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", D),
		ref: A,
		"data-testid": O,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${F.index} of ${P.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Se(e);
			if (!t) return;
			e.preventDefault();
			let n = Ce(t, F.index, P.length);
			n !== F.index && l(n);
		},
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ K(N, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${O}-title`,
						children: e
					}), t && /* @__PURE__ */ K(N, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${O}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ q("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > we || (a?.count ?? 0) > 0 ? /* @__PURE__ */ K(te, {
							"aria-label": "Revision",
							size: "sm",
							value: M.id,
							onChange: (e) => be(e.target.value, s, a),
							options: ye(n, a),
							className: "w-auto",
							"data-testid": `${O}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ K(ee, {
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
						m && /* @__PURE__ */ K(T, {
							state: m.status === "failed" ? "error" : "pending",
							label: `${m.label} ${m.status}`,
							"data-testid": `${O}-pending`
						}),
						u && /* @__PURE__ */ K(i, {
							variant: "secondary",
							size: "sm",
							onClick: u,
							"data-testid": `${O}-download`,
							children: d
						})
					]
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ K("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ K("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: C === void 0 ? void 0 : { maxWidth: C },
							"data-testid": `${O}-stage`,
							children: F.preview ?? /* @__PURE__ */ K(N, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${O}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ q("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ K(f, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(Te, { back: !0 }),
								disabled: F.index <= 1,
								onClick: () => l(F.index - 1),
								"data-testid": `${O}-previous`
							}),
							/* @__PURE__ */ K(N, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${O}-position`,
								children: `Slide ${F.index} of ${P.length}`
							}),
							/* @__PURE__ */ K(f, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(Te, {}),
								disabled: F.index >= P.length,
								onClick: () => l(F.index + 1),
								"data-testid": `${O}-next`
							}),
							p && F.preview && /* @__PURE__ */ K(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => p(F.id),
								"data-testid": `${O}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ q("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${O}-outline`,
					children: [/* @__PURE__ */ K(I, {
						as: "div",
						className: "mb-1",
						"data-testid": `${O}-outline-label`,
						children: /* @__PURE__ */ K("span", {
							id: k,
							children: "Slides"
						})
					}), /* @__PURE__ */ K("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: P.map((e) => /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === F.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === F.id && "bg-surface-hover font-medium"),
							"data-testid": `${O}-outline-row`,
							children: [/* @__PURE__ */ K("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ K("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			h && /* @__PURE__ */ K(N, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${O}-notice`,
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
function De() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 10l4-4 4 4",
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
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ke() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ K("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Ae() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function je({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: p, canDuplicate: m, canDelete: h, dragHandle: g, rowRef: _, dragging: v = !1, testIdPrefix: y }) {
	let b = X(i);
	return /* @__PURE__ */ q("li", {
		ref: _,
		"data-testid": `${y}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", v && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ K("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ q("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${y}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ K("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ K("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: b ? /* @__PURE__ */ K("img", {
							src: b,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${y}-thumb-${e.id}`
						}) : /* @__PURE__ */ K(N, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ q("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ K(N, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ K(N, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ K(N, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${y}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ K(N, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${y}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!c && /* @__PURE__ */ q("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ q("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ K(f, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(De, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${y}-up-${e.id}`
					}), /* @__PURE__ */ K(f, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Oe, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${y}-down-${e.id}`
					})]
				}), /* @__PURE__ */ q("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ K(f, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(ke, {}),
						disabled: !m,
						onClick: () => d(e.id),
						"data-testid": `${y}-duplicate-${e.id}`
					}), /* @__PURE__ */ K(f, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Ae, {}),
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
function Z({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = je, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ K("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ K(l, {
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
var Me = 40, Ne = 8, Pe = 200, Fe = 120, Ie = 200, Le = 60, Re = 2e3, ze = 24, Q = 6, $ = 400, Be = 10, Ve = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, He = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], Ue = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, We = [
	"product",
	"engineering",
	"plain"
];
function Ge(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Ke(e) {
	return e.slides.length > 0 && Ge(e).length === 0;
}
function qe(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Je(e, t = "bullets") {
	return Ye({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ye(e, t) {
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
function Xe(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Ze(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Qe(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Je(qe(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function $e(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: qe(e),
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
function et(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function tt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var nt = z(() => import("./SortableSlideList-tNhL09ti.js"));
function rt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function it(e, t) {
	rt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function at() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ K("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function ot({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = X(e.thumbnailSvg), c = t + 1;
	return /* @__PURE__ */ q("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ K("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ K("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: c
			})
		}), /* @__PURE__ */ q("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ K("button", {
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${c}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ K("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ q("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ K(N, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ K(N, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ K(N, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ q(N, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ K(at, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(P, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function st() {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ K("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ K("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ K("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function ct({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = X(i), S = t + 1, C = e.title || "Untitled slide", w = [
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
	return /* @__PURE__ */ q("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", y && "opacity-40"),
		children: [/* @__PURE__ */ q("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ K("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: S
			}), !u && _ && /* @__PURE__ */ K("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: _
			})]
		}), /* @__PURE__ */ q("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${S}: ${C}`,
					"data-testid": `${b}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [x ? /* @__PURE__ */ K("img", {
						src: x,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${b}-thumb-${e.id}`
					}) : /* @__PURE__ */ q("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ K(N, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: C
						}), /* @__PURE__ */ K(N, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ue[e.layout]
						})]
					}), c && /* @__PURE__ */ K("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${b}-generating-${e.id}`,
						children: /* @__PURE__ */ K(N, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						x ? /* @__PURE__ */ K(N, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: C
						}) : /* @__PURE__ */ K("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ K(N, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${b}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ K(N, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${b}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${b}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(P, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && w.length > 0 && /* @__PURE__ */ K("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ K(D, {
						trigger: /* @__PURE__ */ K(st, {}),
						triggerLabel: `Slide ${S} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "h-auto bg-surface/90 px-1 py-0.5",
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
function lt({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: g = "filmstrip" }) {
	let _ = U(null), v = H(() => new Set(u ?? []), [u]), y = H(() => e.map((e) => {
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
	]), b = H(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...v].filter((e) => !t.has(e));
	}, [e, v]);
	V(() => {
		rt(_.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => it(_.current, s));
			return;
		}
		let c = S[o];
		n(c), it(_.current, c);
	}, w = {
		items: y,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ct,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ q("div", {
		ref: _,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${g}-strip`,
		onKeyDown: C,
		children: [
			/* @__PURE__ */ K(oe, {
				fallback: /* @__PURE__ */ K(Z, { ...w }),
				children: K(p ? Z : nt, { ...w })
			}),
			b.map((t) => /* @__PURE__ */ q("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ K("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ K("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ K(N, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			x.length > 0 && /* @__PURE__ */ K("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: x.map((r, i) => /* @__PURE__ */ K(ot, {
					item: r,
					index: e.length + b.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			c && !p && /* @__PURE__ */ q("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ K("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ K(i, {
					variant: "ghost",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1 border border-dashed border-border text-text-secondary",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ q("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ K(h, { size: 12 }), "Add slide"]
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
	let [l, u] = W(""), [d, f] = W(!1), [p, m] = W(n), h = se(), g = U(0);
	V(() => {
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
	}, b = /* @__PURE__ */ K(ne, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), x = /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ K(A, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ K(N, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ K(N, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${c}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ K("ul", {
			"aria-labelledby": h,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${c}-source-results`,
			children: p.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => y(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ K("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ut[t.kind ?? "document"]
						}),
						/* @__PURE__ */ K("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ K("span", {
							className: "ml-1.5 text-[10px] text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ K(I, {
					as: "div",
					children: /* @__PURE__ */ K("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ K(N, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ K("div", {
					className: "min-w-0",
					children: b
				}),
				!o && /* @__PURE__ */ K(i, {
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
	}) : /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ K(I, {
				as: "div",
				children: /* @__PURE__ */ K("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ K(M, {
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
function ft() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
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
	return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ K(I, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ K("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ q("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ K(N, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ K(b, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ K(f, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ K(ft, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ K(i, {
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
	return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ q("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ K(E, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ K(te, {
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
			}), !n && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(i, {
				variant: "ghost",
				size: "sm",
				disabled: e.labels.length >= 24,
				onClick: p,
				"data-testid": `${r}-add-label`,
				children: "Add row"
			}), /* @__PURE__ */ K(i, {
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
		}), /* @__PURE__ */ K("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ q(u, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ K(l, { children: /* @__PURE__ */ q(o, { children: [
					/* @__PURE__ */ K(c, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ K(c, { children: /* @__PURE__ */ K(b, {
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
					!n && /* @__PURE__ */ K(c, {})
				] }) }), /* @__PURE__ */ K(s, { children: e.labels.map((i, s) => /* @__PURE__ */ q(o, { children: [
					/* @__PURE__ */ K(a, { children: /* @__PURE__ */ K(b, {
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
					e.series.map((e, t) => /* @__PURE__ */ K(a, { children: /* @__PURE__ */ K(b, {
						size: "sm",
						type: "number",
						value: String(e.values[s] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => d(t, s, e.target.value),
						"data-testid": `${r}-value-${t}-${s}`
					}) }, t)),
					!n && /* @__PURE__ */ K(a, { children: /* @__PURE__ */ K(f, {
						"aria-label": `Remove row ${s + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(ft, {}),
						disabled: e.labels.length <= 1,
						onClick: () => m(s),
						"data-testid": `${r}-remove-label-${s}`
					}) })
				] }, s)) })]
			})
		})]
	});
}
function ht({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ q("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ q("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ K(E, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ K(b, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ K(E, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ K(b, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ K(pt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ q("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ K(pt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ K(pt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ K(mt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ q("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ K(E, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ K(O, {
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
				}), /* @__PURE__ */ K(E, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ K(b, {
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
			e.layout === "image" && /* @__PURE__ */ K(E, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ K(b, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ K(E, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ K(O, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ K(dt, {
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
	return /* @__PURE__ */ K("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ q("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", gt[a]),
			children: [e, t && /* @__PURE__ */ q("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ K("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ K(N, {
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
}, bt = {
	narrow: 600,
	wide: 900
};
function xt(e) {
	return e == null ? "wide" : e < bt.narrow ? "narrow" : e < bt.wide ? "medium" : "wide";
}
var St = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, Ct = "Text style comes from the theme", wt = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function Tt({ redo: e }) {
	return /* @__PURE__ */ q("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ K("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ K("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function Et() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Dt() {
	return /* @__PURE__ */ K("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Ot({ label: e, value: t }) {
	return /* @__PURE__ */ q("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ K("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ K("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ K(m, { size: 12 })
		]
	});
}
function kt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: p = !1, onPresent: m, end: g, disabled: _ = !1, className: v, testIdPrefix: y = "slides-toolbar", size: b = "auto" }) {
	let { ref: x, ...S } = j(), { ref: C, width: w } = F(x), T = b === "auto" ? xt(w) : b, E = St[T], O = (e) => E.has(e), k = _, A = !k && e ? {
		label: "Layout of this slide",
		items: He.map((t) => ({
			label: Ue[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${y}-layout-${t}`
		}))
	} : null, M = !k && a ? {
		label: "New slide after this one",
		items: vt.map((e) => ({
			label: `${Ue[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${y}-insert-${e}`
		}))
	} : null, P = k ? null : {
		label: "Deck theme",
		items: We.map((e) => ({
			label: yt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${y}-theme-${e}`
		}))
	}, I = !k && e?.layout === "chart" && e.chart && c ? e.chart : null, te = I && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: I.kind === e,
			onSelect: () => {
				I.kind !== e && c(e);
			},
			"data-testid": `${y}-chart-kind-${e}`
		}))
	} : null, L = [];
	return !O("layout") && A && L.push(A), !O("insert") && M && L.push(M), !O("theme") && P && L.push(P), !O("chart") && te && L.push(te), !O("note") && !k && L.push({
		label: Ct,
		items: [],
		"data-testid": `${y}-style-note`
	}), /* @__PURE__ */ q("div", {
		...S,
		ref: C,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": T,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", v),
		"data-testid": y,
		children: [
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: k || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${y}-new-slide`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ K(h, { size: 12 }), "New slide"]
				})
			}),
			O("layout") && A && e && /* @__PURE__ */ K(D, {
				trigger: /* @__PURE__ */ K(Ot, {
					label: "Layout",
					value: Ue[e.layout]
				}),
				triggerLabel: `Layout: ${Ue[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-layout`,
				sections: [A],
				"data-testid": `${y}-layout-menu`
			}),
			O("insert") && M && /* @__PURE__ */ K(D, {
				trigger: /* @__PURE__ */ K(Ot, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-insert`,
				sections: [M],
				"data-testid": `${y}-insert-menu`
			}),
			O("theme") && P && /* @__PURE__ */ K(D, {
				trigger: /* @__PURE__ */ K(Ot, {
					label: "Theme",
					value: yt[t]
				}),
				triggerLabel: `Theme: ${yt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-theme`,
				sections: [P],
				"data-testid": `${y}-theme-menu`
			}),
			O("chart") && I && c && /* @__PURE__ */ K(ee, {
				size: "sm",
				value: I.kind,
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
			(l || u) && /* @__PURE__ */ q(G, { children: [
				/* @__PURE__ */ K(Dt, {}),
				l && /* @__PURE__ */ K(f, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Tt, {}),
					disabled: k || !d,
					onClick: l,
					"data-testid": `${y}-undo`
				}),
				u && /* @__PURE__ */ K(f, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Tt, { redo: !0 }),
					disabled: k || !p,
					onClick: u,
					"data-testid": `${y}-redo`
				})
			] }),
			L.length > 0 && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(Dt, {}), /* @__PURE__ */ K(D, {
				trigger: /* @__PURE__ */ K("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-more`,
				sections: L,
				"data-testid": `${y}-more-menu`
			})] }),
			O("note") && /* @__PURE__ */ K(N, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: wt,
				"data-testid": `${y}-style-note`,
				children: Ct
			}),
			/* @__PURE__ */ K("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			g,
			m && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: m,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${y}-present`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ K(Et, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function At({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Re, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = se(), l = se(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ q("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ K(N, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ K(N, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ K(O, {
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
function jt({ testIdPrefix: e }) {
	return /* @__PURE__ */ K(M, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Mt = z(() => import("./PresentationAgentComposer-COCqFQ3R.js").catch(() => ({ default: jt })));
function Nt({ back: e }) {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Pt(e, t) {
	let [n, r] = W({
		past: [],
		future: []
	}), i = U(null), a = U(0);
	return V(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: B((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: B(() => {
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
		redo: B(() => {
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
function Ft({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: d, onSearchSources: m, onDownload: h, onOpenPresentationView: g, readOnly: _ = !1, onInstruct: y, instructHints: C, onUndoInstruct: T, generatingSlideIds: D, slideViewers: O, selectSlideRequest: ee, footer: A, renderFrame: j, onSelectedSlideChange: P, className: F, "data-testid": I = "presentation-editor" }) {
	let [L, R] = W(() => e.slides[0]?.id ?? ""), [ne, ae] = W(!1), [z, se] = W(null), J = !!y, [ce, le] = W("slide"), [ue, de] = W(!1), [fe, pe] = W(null), [me, he] = W(null), [ge, _e] = W(() => /* @__PURE__ */ new Set()), { edit: Y, undo: we, redo: Te, canUndo: De, canRedo: Oe } = Pt(e, t), [ke, Ae] = W([]);
	V(() => {
		typeof n == "object" && "slides" in n && Ae(n.slides);
	}, [n]);
	let je = U(a);
	je.current = a;
	let Z = e.slides, Me = H(() => new Set(Ge(e)), [e]), Ne = Me.size === 0;
	V(() => {
		Ne && je.current(e);
	}, [e, Ne]);
	let Pe = typeof n == "object" && "slides" in n ? n.slides : ke, Fe = H(() => new Map(Pe.map((e) => [e.id, e.svg])), [Pe]), Ie = H(() => {
		let e = new Set(Z.map((e) => e.id));
		return Pe.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Pe, Z]), Le = Z.length + Ie.length, Re = Z.findIndex((e) => e.id === L), ze = Re === -1 ? Ie.findIndex((e) => e.id === L) : -1, Q = Re === -1 ? ze === -1 ? 0 : Z.length + ze : Re, $ = Re !== -1 || ze === -1 ? Z[Q] : void 0, Be = ze === -1 ? void 0 : Ie[ze], Ve = $?.id ?? Be?.id, He = $ ? $.title || "Untitled slide" : Be?.title, Ue = H(() => [...Z.map((e) => e.id), ...Ie.map((e) => e.id)], [Z, Ie]), We = Math.min(Q, Z.length - 1), Ke = U(P);
	Ke.current = P, V(() => {
		Ve && Ke.current?.(Ve, Q);
	}, [Ve, Q]);
	let qe = H(() => {
		let e = new Set(D ?? []);
		return ue && ce === "slide" && $ && e.add($.id), [...e];
	}, [
		D,
		ue,
		ce,
		$
	]), Je = !!$ && qe.includes($.id), nt = Z.map((e) => ({
		slide: e,
		thumbnailSvg: Fe.get(e.id),
		uncited: Me.has(e.id),
		changed: ge.has(e.id)
	})), rt = B((e) => {
		R(e);
	}, []), it = ee?.key, at = ee?.slideId;
	V(() => {
		at && e.slides.some((e) => e.id === at) && R(at);
	}, [it, at]);
	let ot = B((t, n) => {
		Y(Ze(e, t, n));
	}, [Y, e]), st = B((t) => {
		let n = Qe(e, We, t);
		n !== e && (Y(n), R(n.slides[We + 1].id));
	}, [
		Y,
		e,
		We
	]), ct = B((t) => {
		let n = $e(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		Y(n), R(n.slides[r + 1].id);
	}, [Y, e]), ut = B((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = et(e, t);
		r !== e && (Y(r), R(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [Y, e]), ft = B((t) => Y(Xe(e, t)), [Y, e]), pt = B(async (e) => {
		if (!y || ue) return !1;
		let t = $?.id;
		de(!0), he(null);
		try {
			let n = await y(e, ce === "slide" && t ? {
				slideId: t,
				scope: ce
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return _e(new Set(r)), pe(n?.summary?.trim() || "Done."), ce === "deck" && r.length && (!t || !r.includes(t)) && R(r[0]), !0;
		} catch (e) {
			return he(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			de(!1);
		}
	}, [
		y,
		ue,
		ce,
		$?.id
	]), mt = B(() => {
		T?.(), pe(null), _e(/* @__PURE__ */ new Set());
	}, [T]), gt = Me.size, vt = !_ && Z.length > 0 && gt === 0 && !ne, yt = B(() => {
		vt && (ae(!0), se(null), Promise.resolve(o(e)).catch((e) => {
			se(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ae(!1)));
	}, [
		vt,
		o,
		e
	]), bt = B((e) => {
		let t = Ue[Q + e];
		t && R(t);
	}, [Ue, Q]);
	if (V(() => {
		if (_) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), yt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !xe(e.target)) {
				e.preventDefault(), e.shiftKey ? Te() : we();
				return;
			}
			let n = Se(e);
			if (!n) return;
			e.preventDefault();
			let r = Ce(n, Q + 1, Le);
			r !== Q + 1 && bt(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		_,
		yt,
		we,
		Te,
		bt,
		Q,
		Le
	]), _) {
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
					...n ? { preview: /* @__PURE__ */ K("img", {
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
					...n ? { preview: /* @__PURE__ */ K("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ K(Ee, {
			title: e.title,
			revisions: t,
			revisionId: c,
			onRevisionChange: l,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = Ue[e - 1];
				t && R(t);
			},
			...h ? { onDownload: h } : {},
			className: F,
			"data-testid": `${I}-readonly`
		});
	}
	let xt = (() => {
		if (Be) {
			let e = X(Be.svg);
			return e ? /* @__PURE__ */ K("img", {
				src: e,
				alt: Be.title,
				className: "h-full w-full object-contain",
				"data-testid": `${I}-stage-image`
			}) : /* @__PURE__ */ K(N, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${I}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if ($ && Me.has($.id)) return /* @__PURE__ */ K(x, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${I}-preview-needs-source`
		});
		let t = $ ? X(Fe.get($.id)) : void 0;
		if (!Ne && !t) return /* @__PURE__ */ K(x, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${I}-preview-needs-source`
		});
		if (n === "loading" && Fe.size === 0) return /* @__PURE__ */ K(w, {
			label: "Rendering the deck…",
			testId: `${I}-preview-loading`
		});
		if (Ne && typeof n == "object" && "error" in n) return /* @__PURE__ */ K(S, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${I}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ K("img", {
			src: r,
			alt: $.title || `Slide ${Q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${I}-stage-image`
		}) : /* @__PURE__ */ K(N, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${I}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ q("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${I}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ K(te, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => be(e.target.value, l, u),
				options: ye(St, u),
				className: "w-auto",
				"data-testid": `${I}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ K(p, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${I}-revisions`
			}),
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: !vt,
				onClick: yt,
				"data-testid": `${I}-save`,
				children: ne ? "Saving…" : `Save as ${tt(s)}`
			}),
			h && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: h,
				"data-testid": `${I}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = J || j ? /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ K(ve, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => Y({
				...e,
				title: t
			}),
			"data-testid": `${I}-deck-title`
		}), /* @__PURE__ */ K(ve, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => Y({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${I}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ q("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ K(E, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ K(b, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => Y({
					...e,
					title: t.target.value
				}),
				"data-testid": `${I}-deck-title`
			})
		}), /* @__PURE__ */ K(E, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ K(b, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => Y({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${I}-deck-subtitle`
			})
		})]
	}), Tt = g ? () => g(Ve ? {
		slideId: Ve,
		slideIndex: Q + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ K(kt, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: Z.length < 40,
		onLayoutChange: (t) => {
			$ && Y(Xe(e, Ye($, t)));
		},
		onThemeChange: (t) => Y({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			$?.chart && Y(Xe(e, {
				...$,
				chart: {
					...$.chart,
					kind: t
				}
			}));
		},
		onUndo: we,
		onRedo: Te,
		canUndo: De,
		canRedo: Oe,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${I}-toolbar`
	}), Dt = /* @__PURE__ */ q(G, { children: [gt > 0 && /* @__PURE__ */ K(M, {
		tone: "warning",
		"data-testid": `${I}-uncited-warning`,
		children: gt === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${gt} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), z && /* @__PURE__ */ K(M, {
		tone: "error",
		onDismiss: () => se(null),
		"data-testid": `${I}-save-error`,
		children: z
	})] }), Ot = J && /* @__PURE__ */ q(G, { children: [me && /* @__PURE__ */ K(M, {
		tone: "error",
		onDismiss: () => he(null),
		"data-testid": `${I}-agent-error`,
		children: me
	}), fe && !me && /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${I}-agent-summary`,
		children: [
			/* @__PURE__ */ K(N, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${fe}`
			}),
			ge.size > 0 && /* @__PURE__ */ K(N, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: ge.size === 1 ? "1 slide marked in the filmstrip" : `${ge.size} slides marked in the filmstrip`
			}),
			T && /* @__PURE__ */ K(i, {
				variant: "ghost",
				size: "sm",
				onClick: mt,
				"data-testid": `${I}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), jt = J && $ && /* @__PURE__ */ K(oe, {
		fallback: /* @__PURE__ */ K(N, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${I}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ K(Mt, {
			scope: ce,
			onScopeChange: le,
			slideLabel: `slide ${Q + 1}`,
			busy: ue,
			onSubmit: pt,
			...C?.length ? { suggestions: C } : {},
			testIdPrefix: I
		})
	}), Ft = {
		selectedSlide: $,
		...Be ? { selectedGeneratedSlide: Be } : {},
		selectedIndex: Q,
		slideCount: Le,
		selectSlide: rt,
		markChanged: (e) => _e(new Set(e))
	}, It = typeof A == "function" ? A(Ft) : A, Lt = It != null && It !== !1 ? It : jt ? /* @__PURE__ */ K(re, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${I}-dock-card`,
			children: [Ot, jt]
		}),
		"data-testid": `${I}-dock`
	}) : null, Rt = $ && /* @__PURE__ */ K(G, { children: J ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(dt, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => ft({
			...$,
			sources: e
		}),
		options: d,
		onSearchSources: m,
		testIdPrefix: `${I}-slide`
	}), /* @__PURE__ */ K(v, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${I}-details`,
		children: /* @__PURE__ */ K(ht, {
			slide: $,
			onChange: ft,
			sources: d,
			onSearchSources: m,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${I}-slide`
		})
	})] }) : /* @__PURE__ */ K(ht, {
		slide: $,
		onChange: ft,
		sources: d,
		onSearchSources: m,
		showNotes: !1,
		testIdPrefix: `${I}-slide`
	}) }), zt = /* @__PURE__ */ q("div", {
		className: r("flex items-center justify-center gap-2", j && "ml-auto shrink-0"),
		"data-testid": `${I}-slide-nav`,
		children: [
			/* @__PURE__ */ K(f, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(Nt, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => bt(-1),
				"data-testid": `${I}-previous`
			}),
			/* @__PURE__ */ K(N, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${I}-position`,
				children: `Slide ${Le === 0 ? 0 : Q + 1} of ${Le}`
			}),
			/* @__PURE__ */ K(f, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(Nt, {}),
				disabled: Q >= Le - 1,
				onClick: () => bt(1),
				"data-testid": `${I}-next`
			}),
			/* @__PURE__ */ K(k, {
				value: Z.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Z.length} / 40`,
				className: "ml-2",
				"data-testid": `${I}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ q("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${I}-body`,
		children: [/* @__PURE__ */ K(lt, {
			items: nt,
			selectedId: $?.id ?? "",
			onSelect: rt,
			onMove: ot,
			onDuplicate: ct,
			onDelete: ut,
			onAdd: () => st(),
			canAdd: Z.length < 40,
			generatingSlideIds: qe,
			generatedItems: Ie.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...O ? { slideViewers: O } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${I}-slide`
		}), /* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${I}-main`,
			children: [
				/* @__PURE__ */ K("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${I}-stage-frame`,
					children: /* @__PURE__ */ K(_t, {
						generating: Je,
						label: He ? `Slide ${Q + 1} of ${Le}: ${He}` : "No slide",
						"data-testid": `${I}-stage`,
						children: xt
					})
				}),
				!j && zt,
				Be && /* @__PURE__ */ K(N, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${I}-generated-note`,
					children: `${Be.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				$ && /* @__PURE__ */ q("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ K(At, {
						value: $.notes,
						onChange: (e) => ft({
							...$,
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
	if (j) {
		let e = /* @__PURE__ */ q("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", F),
			"data-testid": I,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ q("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${I}-deck-line`,
					children: [wt, zt]
				}),
				Dt,
				Bt
			]
		});
		return /* @__PURE__ */ K(G, { children: j({
			toolbar: Et,
			actions: Ct,
			surface: e,
			footer: Lt
		}) });
	}
	return /* @__PURE__ */ q("div", {
		className: r("relative flex h-full min-h-0 flex-col", F),
		"data-testid": I,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ q("div", {
					className: r("flex flex-wrap justify-between gap-2", J ? "items-center" : "items-end"),
					...J ? { "data-testid": `${I}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ K("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${I}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${I}-dock-row`,
				children: /* @__PURE__ */ K(ie.Provider, {
					value: "pinned",
					children: Lt
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ProposedEditStrip.tsx
var It = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function Lt(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => It[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function Rt(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function zt({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [o, s] = W(!1), [c, l] = W(""), u = Lt(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ q("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ K(d, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: Rt(e)
					}),
					e.summary && /* @__PURE__ */ K("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ K("span", { className: "flex-1" }),
					f && /* @__PURE__ */ q("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ K(C, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ K(d, {
						size: "xs",
						tone: "success",
						"data-testid": `${a}-applied`,
						children: "Applied"
					}),
					!m && /* @__PURE__ */ q("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							r && e.status === "ready" && /* @__PURE__ */ K(i, {
								size: "sm",
								variant: "ghost",
								"aria-expanded": o,
								onClick: () => s((e) => !e),
								"data-testid": `${a}-revise`,
								children: "Revise…"
							}),
							/* @__PURE__ */ K(i, {
								size: "sm",
								variant: "ghost",
								disabled: p,
								onClick: () => n(e.id),
								"data-testid": `${a}-discard`,
								children: f ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ K(i, {
								size: "sm",
								variant: "primary",
								disabled: f || p || !u,
								onClick: () => t(e.id),
								"data-testid": `${a}-apply`,
								children: p ? "Applying…" : "Apply"
							})
						]
					})
				]
			}),
			u && /* @__PURE__ */ K("p", {
				className: "m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary",
				"data-testid": `${a}-preview`,
				children: u
			}),
			o && r && /* @__PURE__ */ q("form", {
				className: "flex min-w-0 items-center gap-2",
				onSubmit: (t) => {
					t.preventDefault();
					let n = c.trim();
					!n || !r || (r(e.id, n), l(""), s(!1));
				},
				"data-testid": `${a}-revise-form`,
				children: [/* @__PURE__ */ K(b, {
					size: "sm",
					autoFocus: !0,
					value: c,
					onChange: (e) => l(e.target.value),
					onKeyDown: (e) => {
						e.key === "Escape" && (e.preventDefault(), s(!1));
					},
					placeholder: "How should it change?",
					"aria-label": "Revision instruction",
					className: "min-w-0 flex-1",
					"data-testid": `${a}-revise-input`
				}), /* @__PURE__ */ K(i, {
					type: "submit",
					size: "sm",
					variant: "secondary",
					disabled: !c.trim(),
					"data-testid": `${a}-revise-send`,
					children: "Send"
				})]
			})
		]
	});
}
function Bt({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
	let d = e.filter((e) => e.status !== "discarded");
	if (d.length === 0) return null;
	let f = d.filter((e) => e.status === "ready").length, p = d.filter((e) => e.status === "ready" || e.status === "streaming").length, m = c ?? (d.length === 1 ? "Proposed edit" : `${d.length} proposed edits`);
	return /* @__PURE__ */ q("section", {
		"aria-label": m,
		"aria-live": "polite",
		className: r("flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm", l),
		"data-testid": u,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ K("span", {
					className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
					"data-testid": `${u}-title`,
					children: m
				}),
				s && p > 1 && /* @__PURE__ */ K(i, {
					size: "sm",
					variant: "ghost",
					onClick: s,
					"data-testid": `${u}-discard-all`,
					children: "Discard all"
				}),
				o && f > 1 && /* @__PURE__ */ K(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${u}-apply-all`,
					children: "Apply all"
				})
			]
		}), /* @__PURE__ */ K("ul", {
			className: "m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0",
			children: d.map((e) => /* @__PURE__ */ K(zt, {
				edit: e,
				onApply: t,
				onDiscard: n,
				...a ? { onRevise: a } : {},
				testId: u
			}, e.id))
		})]
	});
}
//#endregion
export { Qe as A, Ye as B, Me as C, Ve as D, Fe as E, tt as F, Y as G, je as H, qe as I, he as J, ye as K, et as L, $e as M, Je as N, He as O, Ze as P, Xe as R, $ as S, Ie as T, X as U, Z as V, Ee as W, me as X, ge as Y, pe as Z, Pe as _, At as a, Le as b, kt as c, ht as d, dt as f, Ne as g, We as h, Ft as i, Ke as j, Ue as k, xt as l, ct as m, Rt as n, bt as o, lt as p, ve as q, Lt as r, vt as s, Bt as t, _t as u, ze as v, Be as w, Re as x, Q as y, Ge as z };
