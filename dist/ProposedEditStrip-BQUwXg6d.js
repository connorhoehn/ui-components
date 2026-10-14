import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-D4QmbyEy.js";
import { n as i, o as a } from "./Button-uREUOWUk.js";
import { a as o, i as s, n as c, o as l, r as u, t as d } from "./Table-uvSptnQY.js";
import { n as f } from "./overlayStack-C0EBgmzL.js";
import { t as p } from "./IconButton-IE5g44md.js";
import { m, tt as h } from "./Icons-B_xESAH3.js";
import { i as g, n as _ } from "./Text-Y7cUwppt.js";
import { a as v, r as y } from "./FollowBanner-B0SN-fYr.js";
import { n as b } from "./Badge-Dr0R7r9G.js";
import { t as x } from "./Modal-CEiWhFnj.js";
import { t as S } from "./Input-_B49FdRY.js";
import { t as C } from "./Select-0lM_wZAc.js";
import { t as w } from "./FormField-CQ27qxWt.js";
import { t as T } from "./SearchInput-HK4TcIG4.js";
import { t as E } from "./EmptyState-ChFI22O0.js";
import { n as ee, t as te } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as D, t as O } from "./StatusPill-c89IbU1L.js";
import { t as k } from "./DropdownMenu-CkxvSCck.js";
import { t as A } from "./Textarea-BwvE1HPn.js";
import { t as j } from "./DotMeter-KxyExwVb.js";
import { t as M } from "./SegmentedControl-CSn7GyT9.js";
import { n as N } from "./RovingToolbar-B1Fai5PF.js";
import { t as P } from "./InlineAlert-CBtteaVZ.js";
import { t as F } from "./PresenceAvatars-CYKRD9yJ.js";
import { t as I } from "./useMeasuredWidth-CEvoQHRM.js";
import { t as L } from "./SectionLabel-Bn8Vvb-K.js";
import { G as R, U as z } from "./renderers-C8lCvSqU.js";
import { a as ne } from "./composerSendError-Bv4mkKMu.js";
import { i as re, t as ie } from "./FloatingComposerDock-D10uQ4k3.js";
import { Component as ae, Suspense as oe, lazy as se, useCallback as B, useEffect as V, useId as ce, useMemo as H, useRef as U, useState as W } from "react";
import { Fragment as G, jsx as K, jsxs as q } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var J = /* @__PURE__ */ new Set(["diagram", "presentation"]), le = [
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
function me({ open: e, onClose: i, onCreate: a, onCreateFromFixture: o, onSearchDocuments: s, recordings: c, initialShape: l }) {
	let [u, d] = W([]), [p, m] = W(!1), [h, g] = W(null), [_, y] = W(null), [b, w] = W(""), [T, E] = W(""), [ee, te] = W(!1), [D, O] = W(""), [k, j] = W("page"), [M, N] = W("blank"), [P, F] = W(""), [I, L] = W(""), [ne, re] = W([]), ie = U(null), ae = U(null), oe = ce(), se = `${oe}-blank-label`, B = `${oe}-type-label`, me = `${oe}-cookbook-label`, he = `${oe}-title`, ge = `${oe}-description`, _e = `${oe}-deck-from`, ve = `${oe}-deck-source`;
	V(() => {
		if (!e) return;
		let r = n();
		d(r), g(null), y(null), w(""), E(""), te(!1), O(""), j(l ?? "page"), N("blank"), F(""), L(""), re([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			d(t), g((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => ie.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let ye = H(() => le.filter((e) => de(e, b)), [b]), Y = H(() => u.filter((e) => fe(e, b)), [u, b]), be = H(() => z.filter((e) => R(e, b)), [b]);
	if (V(() => {
		if (!e || k !== "presentation") return;
		if (M === "blank") {
			re([]);
			return;
		}
		let t = I.trim().toLowerCase();
		if (M === "transcript") {
			let e = c ?? [];
			re(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!s) {
			re([]);
			return;
		}
		let n = !1;
		return Promise.resolve(s(I.trim())).then((e) => {
			n || re(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		k,
		M,
		I,
		c,
		s
	]), !e) return null;
	let xe = u.find((e) => e.id === h), Se = _ ? z.find((e) => e.id === _) : void 0, Ce = k === "sections", we = !!Se || !!xe, Te = u.length === 0 && !p && !Se, Ee = ye.length === 0 && Y.length === 0 && be.length === 0, De = Se ? {
		kind: "cookbook",
		cookbook: Se
	} : xe && !J.has(k) ? {
		kind: "type",
		type: xe
	} : {
		kind: "blank",
		shape: k
	}, X = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), J.has(k) && j("page"), ee || E(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			j(e.shape), J.has(e.shape) && (y(null), ee || E(""));
			return;
		}
		y(null), g(e.type.id), ee || E("");
	}, Oe = (e) => e.kind === "blank" ? e.shape : J.has(k) ? "page" : k, ke = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let s = D.trim() || void 0;
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
	}, Ae = k === "presentation" && M !== "blank" && !P, je = !!T.trim() && (!Ce || we) && !Ae, Me = () => {
		je && ke(De, T, Oe(De));
	};
	return /* @__PURE__ */ K(x, {
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
				e.key === "Enter" && !e.shiftKey && je && Me();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ K("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ q("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ K(S, {
						ref: ie,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => w(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = be.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: be[0]
							} : ye.length > 0 ? {
								kind: "blank",
								shape: ye[0].id
							} : Y.length > 0 ? {
								kind: "type",
								type: Y[0]
							} : void 0;
							if (!t) return;
							X(t);
							let n = T.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								ae.current?.focus();
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
						ye.length > 0 && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ K("div", {
								id: se,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": se,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: ye.map((e) => /* @__PURE__ */ q(v, {
									padding: "md",
									selected: k === e.id,
									onSelect: () => X({
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
											e.id === "page" && /* @__PURE__ */ K(f, {
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
						k === "presentation" && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ K("label", {
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ K(C, {
									id: _e,
									value: M,
									options: ue.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										N(e.target.value), F(""), L("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ K("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: M === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								M !== "blank" && /* @__PURE__ */ q("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ K(S, {
										type: "search",
										value: I,
										onChange: (e) => L(e.target.value),
										"aria-label": M === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: M === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ne.length === 0 ? /* @__PURE__ */ K("div", {
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
									}), /* @__PURE__ */ K(C, {
										id: ve,
										required: !0,
										"aria-required": "true",
										value: P,
										placeholder: "Choose one…",
										options: ne.map((e) => ({
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
									children: k === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : k === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : k === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ K("div", {
								role: "group",
								"aria-labelledby": me,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: be.map((e) => {
									let t = _ === e.id;
									return /* @__PURE__ */ q(v, {
										padding: "md",
										selected: t,
										onSelect: () => X({
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
						!J.has(k) && (Y.length > 0 || Te || u.length === 0 && p) && /* @__PURE__ */ q("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ q("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ K("span", {
										id: B,
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
								Y.length > 0 && /* @__PURE__ */ K("div", {
									role: "group",
									"aria-labelledby": B,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Y.map((e) => {
										let t = !Se && h === e.id;
										return /* @__PURE__ */ q("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => X({
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
															children: k === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
								b,
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
						}), /* @__PURE__ */ K(S, {
							ref: ae,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: T,
							onChange: (e) => {
								E(e.target.value), te(!0);
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
					}), /* @__PURE__ */ K(A, {
						id: ge,
						"data-testid": "new-doc-description",
						value: D,
						onChange: (e) => O(e.target.value),
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
var he = class extends ae {
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
function ge({ title: e, count: t, countTone: n = "neutral", hint: i, action: o, empty: s, footer: c, headingLevel: l = 2, children: u, className: d, "data-testid": p }) {
	let m = ce(), h = l === 3 ? "h3" : "h2", g = t === 0;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": m,
		"data-testid": p,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", d),
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ K(h, {
						id: m,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ K(f, {
						tone: g ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ K("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					o != null && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K("span", { className: "flex-1" }), /* @__PURE__ */ K("div", {
						className: "flex shrink-0 items-center gap-2",
						children: o
					})] })
				]
			}),
			g && s ? /* @__PURE__ */ K(a, {
				density: "compact",
				children: /* @__PURE__ */ K(E, {
					testId: s.testId ?? (p ? `${p}-empty` : "inbox-section-empty"),
					...s.icon == null ? {} : { icon: s.icon },
					title: s.title,
					...s.body ? { body: s.body } : {}
				})
			}) : /* @__PURE__ */ K("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: u
			}),
			!g && c != null && /* @__PURE__ */ K("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: c
			})
		]
	});
}
function _e({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ K("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
//#region src/components/forms/InlineEditableText.tsx
var ve = {
	title: "text-[14px] font-semibold text-text-primary",
	muted: "text-[12px] text-text-secondary"
};
function ye({ value: e, onCommit: t, label: n, placeholder: i, maxLength: a, required: o = !1, disabled: s = !1, size: c = "sm", tone: l = "title", fitContent: u = !1, className: d, "data-testid": f = "inline-editable-text" }) {
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
	return p ? /* @__PURE__ */ K(S, {
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
		className: r("min-w-0 truncate rounded border border-transparent bg-transparent px-1 py-0.5 text-left font-[inherit]", "hover:border-border hover:bg-surface-hover focus-visible:border-primary focus-visible:outline-none disabled:cursor-default disabled:hover:border-transparent disabled:hover:bg-transparent", ve[l], !e && "italic text-text-tertiary", d),
		children: e || i
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var Y = "__older-revisions__";
function be(e, t) {
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
function xe(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function Se(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Ce(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || Se(e.target)) return null;
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
function we(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Te = 5;
function Ee({ back: e }) {
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
function De({ title: e, subtitle: t, revisions: n, olderRevisions: o, revisionId: s, onRevisionChange: c, slideIndex: l, onSlideChange: u, onDownload: d, downloadLabel: f = "Download .pptx", onOpenPreview: m, pending: h, notice: g, state: v = "ready", errorMessage: b, ownerName: x, onRetry: S, maxSlideWidth: w, autoFocus: T = !1, className: te, "data-testid": k = "presentation-view" }) {
	let A = ce(), j = U(null), N = U(!1);
	if (V(() => {
		!T || N.current || !j.current || (N.current = !0, j.current.focus({ preventScroll: !0 }));
	}), v === "loading") return /* @__PURE__ */ K(D, {
		label: "Opening the presentation…",
		testId: `${k}-loading`
	});
	if (v === "no-access") return /* @__PURE__ */ K(y, {
		resource: "this presentation",
		ownerName: x ?? null,
		testId: `${k}-no-access`
	});
	if (v === "error") return /* @__PURE__ */ K(ee, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...S ? {
			actionLabel: "Try again",
			onAction: S
		} : {},
		testId: `${k}-error`
	});
	let P = n.find((e) => e.id === s) ?? n[0], F = P?.slides ?? [];
	if (v === "empty" || !P || F.length === 0) return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", te),
		"data-testid": k,
		children: [/* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ K(_, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ K(_, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${k}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ K(E, {
			title: "No slides yet",
			description: h?.status === "generating" ? `${h.label} is still being generated.` : h?.status === "failed" ? h.message ?? `${h.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${k}-empty`
		})]
	});
	let I = F[Math.min(Math.max(l, 1), F.length) - 1];
	return /* @__PURE__ */ q("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", te),
		ref: j,
		"data-testid": k,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${I.index} of ${F.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Ce(e);
			if (!t) return;
			e.preventDefault();
			let n = we(t, I.index, F.length);
			n !== I.index && u(n);
		},
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ q("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ K(_, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${k}-title`,
						children: e
					}), t && /* @__PURE__ */ K(_, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${k}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ q("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Te || (o?.count ?? 0) > 0 ? /* @__PURE__ */ K(C, {
							"aria-label": "Revision",
							size: "sm",
							value: P.id,
							onChange: (e) => xe(e.target.value, c, o),
							options: be(n, o),
							className: "w-auto",
							"data-testid": `${k}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ K(a, {
							density: "compact",
							children: /* @__PURE__ */ K(M, {
								"aria-label": "Revision",
								value: P.id,
								onChange: c,
								options: n.map((e) => ({
									label: e.label,
									value: e.id
								})),
								"data-testid": `${k}-revisions`
							})
						}),
						h && /* @__PURE__ */ K(O, {
							state: h.status === "failed" ? "error" : "pending",
							label: `${h.label} ${h.status}`,
							"data-testid": `${k}-pending`
						}),
						d && /* @__PURE__ */ K(i, {
							variant: "secondary",
							size: "sm",
							onClick: d,
							"data-testid": `${k}-download`,
							children: f
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
							style: w === void 0 ? void 0 : { maxWidth: w },
							"data-testid": `${k}-stage`,
							children: I.preview ?? /* @__PURE__ */ K(_, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${k}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ q("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ K(p, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(Ee, { back: !0 }),
								disabled: I.index <= 1,
								onClick: () => u(I.index - 1),
								"data-testid": `${k}-previous`
							}),
							/* @__PURE__ */ K(_, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${k}-position`,
								children: `Slide ${I.index} of ${F.length}`
							}),
							/* @__PURE__ */ K(p, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ K(Ee, {}),
								disabled: I.index >= F.length,
								onClick: () => u(I.index + 1),
								"data-testid": `${k}-next`
							}),
							m && I.preview && /* @__PURE__ */ K(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => m(I.id),
								"data-testid": `${k}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ q("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": A,
					"data-testid": `${k}-outline`,
					children: [/* @__PURE__ */ K(L, {
						as: "div",
						className: "mb-1",
						"data-testid": `${k}-outline-label`,
						children: /* @__PURE__ */ K("span", {
							id: A,
							children: "Slides"
						})
					}), /* @__PURE__ */ K("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: F.map((e) => /* @__PURE__ */ K("li", { children: /* @__PURE__ */ q("button", {
							type: "button",
							onClick: () => u(e.index),
							"aria-current": e.id === I.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === I.id && "bg-surface-hover font-medium"),
							"data-testid": `${k}-outline-row`,
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
			g && /* @__PURE__ */ K(_, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${k}-notice`,
				children: g
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
function Oe() {
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
function ke() {
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
function Ae() {
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
function je() {
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
function Me({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: c = !1, onSelect: l, onMove: u, onDuplicate: d, onDelete: f, canDuplicate: m, canDelete: h, dragHandle: g, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = X(i);
	return /* @__PURE__ */ q("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!c && (g ?? /* @__PURE__ */ K("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ q("button", {
				type: "button",
				onClick: () => l(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ K("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ K("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ K("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ K(_, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ q("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ K(_, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ K(_, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ K(_, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ K(_, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
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
					children: [/* @__PURE__ */ K(p, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Oe, {}),
						disabled: t === 0,
						onClick: () => u(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ K(p, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(ke, {}),
						disabled: t >= n - 1,
						onClick: () => u(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ q("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ K(p, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(Ae, {}),
						disabled: !m,
						onClick: () => d(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ K(p, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(je, {}),
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
function Z({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Me, listClassName: u, testIdPrefix: d }) {
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
var Ne = 40, Pe = 8, Fe = 200, Ie = 120, Le = 200, Re = 60, ze = 2e3, Be = 24, Q = 6, $ = 400, Ve = 10, He = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ue = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], We = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image"
}, Ge = [
	"product",
	"engineering",
	"plain"
];
function Ke(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function qe(e) {
	return e.slides.length > 0 && Ke(e).length === 0;
}
function Je(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Ye(e, t = "bullets") {
	return Xe({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Xe(e, t) {
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
function Ze(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Qe(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function $e(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Ye(Je(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function et(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Je(e),
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
function tt(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function nt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var rt = se(() => import("./SortableSlideList-Cbva_gGv.js"));
function it(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function at(e, t) {
	it(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function ot() {
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
function st({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
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
						children: [/* @__PURE__ */ K(_, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ K(_, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ K(_, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ q(_, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ K(ot, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(F, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function ct() {
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
function lt({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: v, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = X(i), C = t + 1, w = e.title || "Untitled slide", T = [
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
	return /* @__PURE__ */ q("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": c ? "true" : void 0,
		"aria-busy": c || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ q("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ K("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
			}), !u && v && /* @__PURE__ */ K("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ q("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ q("button", {
					type: "button",
					onClick: () => d(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ K("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", c && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ q("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ K(_, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ K(_, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: We[e.layout]
						})]
					}), c && /* @__PURE__ */ K("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ K(_, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ q("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						S ? /* @__PURE__ */ K(_, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}) : /* @__PURE__ */ K("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ K(_, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ K(_, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				l && l.length > 0 && /* @__PURE__ */ K("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${x}-viewers-${e.id}`,
					"aria-label": `${l.map((e) => e.name).join(", ")} ${l.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ K(F, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && T.length > 0 && /* @__PURE__ */ K("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ K(k, {
						trigger: /* @__PURE__ */ K(ct, {}),
						triggerLabel: `Slide ${C} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "h-auto bg-surface/90 px-1 py-0.5",
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
function ut({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: p = !1, className: m, testIdPrefix: g = "filmstrip" }) {
	let v = U(null), y = H(() => new Set(u ?? []), [u]), b = H(() => e.map((e) => {
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
	]), x = H(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	V(() => {
		it(v.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => at(v.current, s));
			return;
		}
		let c = C[o];
		n(c), at(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: p,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: lt,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ q("div", {
		ref: v,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", m),
		"data-testid": `${g}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ K(oe, {
				fallback: /* @__PURE__ */ K(Z, { ...T }),
				children: K(p ? Z : rt, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ q("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ K("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ K("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ K(_, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ K("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ K(st, {
					item: r,
					index: e.length + x.length + i,
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
					variant: "secondary",
					size: "sm",
					disabled: !l,
					onClick: c,
					className: "min-w-0 flex-1",
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
var dt = {
	document: "📄",
	transcript: "🎙️"
};
function ft({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: c }) {
	let [l, u] = W(""), [d, f] = W(!1), [p, m] = W(n), h = ce(), g = U(0);
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
	}, x = /* @__PURE__ */ K(ne, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), S = /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ K(T, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), y ? /* @__PURE__ */ K(_, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ K(_, {
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
					onClick: () => b(t),
					"data-testid": `${c}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ K("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: dt[t.kind ?? "document"]
						}),
						/* @__PURE__ */ K("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ K("span", {
							className: "ml-1.5 text-xs text-text-tertiary",
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
				/* @__PURE__ */ K(L, {
					as: "div",
					children: /* @__PURE__ */ K("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ K(_, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${c}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ K("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ K(i, {
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
	}) : /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${c}-sources`,
		children: [
			/* @__PURE__ */ K(L, {
				as: "div",
				children: /* @__PURE__ */ K("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ K(P, {
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
function pt() {
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
function mt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ q("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ K(L, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ K("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ q("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ K(_, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ K(S, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ K(p, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ K(pt, {}),
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
function ht({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	}, f = () => {
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
			children: [/* @__PURE__ */ K(w, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ K(C, {
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
				onClick: f,
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
			children: /* @__PURE__ */ q(d, {
				"data-testid": `${r}-table`,
				children: [/* @__PURE__ */ K(u, { children: /* @__PURE__ */ q(s, { children: [
					/* @__PURE__ */ K(l, { children: "Label" }),
					e.series.map((i, a) => /* @__PURE__ */ K(l, { children: /* @__PURE__ */ K(S, {
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
					!n && /* @__PURE__ */ K(l, {})
				] }) }), /* @__PURE__ */ K(c, { children: e.labels.map((i, c) => /* @__PURE__ */ q(s, { children: [
					/* @__PURE__ */ K(o, { children: /* @__PURE__ */ K(S, {
						size: "sm",
						value: i,
						disabled: n,
						"aria-label": `Row ${c + 1} label`,
						onChange: (n) => t({
							...e,
							labels: e.labels.map((e, t) => t === c ? n.target.value : e)
						}),
						"data-testid": `${r}-label-${c}`
					}) }),
					e.series.map((e, t) => /* @__PURE__ */ K(o, { children: /* @__PURE__ */ K(S, {
						size: "sm",
						type: "number",
						value: String(e.values[c] ?? 0),
						disabled: n,
						"aria-label": `${e.name} at ${i}`,
						onChange: (e) => a(t, c, e.target.value),
						"data-testid": `${r}-value-${t}-${c}`
					}) }, t)),
					!n && /* @__PURE__ */ K(o, { children: /* @__PURE__ */ K(p, {
						"aria-label": `Remove row ${c + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ K(pt, {}),
						disabled: e.labels.length <= 1,
						onClick: () => m(c),
						"data-testid": `${r}-remove-label-${c}`
					}) })
				] }, c)) })]
			})
		})]
	});
}
function gt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
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
				children: [/* @__PURE__ */ K(w, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ K(S, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ K(w, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ K(S, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ K(mt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ q("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ K(mt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ K(mt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ K(ht, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ q("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ K(w, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ K(A, {
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
				}), /* @__PURE__ */ K(w, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ K(S, {
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
			e.layout === "image" && /* @__PURE__ */ K(w, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ K(S, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ K(w, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ K(A, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ K(ft, {
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
var _t = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function vt({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ K("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ q("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", _t[a]),
			children: [e, t && /* @__PURE__ */ q("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ K("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ K(_, {
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
var yt = [
	"chart",
	"quote",
	"image",
	"two-column"
], bt = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
}, xt = {
	narrow: 600,
	wide: 900
};
function St(e) {
	return e == null ? "wide" : e < xt.narrow ? "narrow" : e < xt.wide ? "medium" : "wide";
}
var Ct = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, wt = "Text style comes from the theme", Tt = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function Et({ redo: e }) {
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
function Dt() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ K("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Ot() {
	return /* @__PURE__ */ K("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function kt({ label: e, value: t }) {
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
function At({ slide: e, theme: t, onAddSlide: n, canAddSlide: o = !0, onLayoutChange: s, onThemeChange: c, onChartKindChange: l, onUndo: u, onRedo: d, canUndo: f = !1, canRedo: m = !1, onPresent: g, end: v, disabled: y = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...w } = N(), { ref: T, width: E } = I(C), ee = S === "auto" ? St(E) : S, te = Ct[ee], D = (e) => te.has(e), O = y, A = !O && e ? {
		label: "Layout of this slide",
		items: Ue.map((t) => ({
			label: We[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && s(t);
			},
			"data-testid": `${x}-layout-${t}`
		}))
	} : null, j = !O && o ? {
		label: "New slide after this one",
		items: yt.map((e) => ({
			label: `${We[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, P = O ? null : {
		label: "Deck theme",
		items: Ge.map((e) => ({
			label: bt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && c(e);
			},
			"data-testid": `${x}-theme-${e}`
		}))
	}, F = !O && e?.layout === "chart" && e.chart && l ? e.chart : null, L = F && l ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: F.kind === e,
			onSelect: () => {
				F.kind !== e && l(e);
			},
			"data-testid": `${x}-chart-kind-${e}`
		}))
	} : null, R = [];
	return !D("layout") && A && R.push(A), !D("insert") && j && R.push(j), !D("theme") && P && R.push(P), !D("chart") && L && R.push(L), !D("note") && !O && R.push({
		label: wt,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ q("div", {
		...w,
		ref: T,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": ee,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: O || !o,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ K(h, { size: 12 }), "New slide"]
				})
			}),
			D("layout") && A && e && /* @__PURE__ */ K(k, {
				trigger: /* @__PURE__ */ K(kt, {
					label: "Layout",
					value: We[e.layout]
				}),
				triggerLabel: `Layout: ${We[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [A],
				"data-testid": `${x}-layout-menu`
			}),
			D("insert") && j && /* @__PURE__ */ K(k, {
				trigger: /* @__PURE__ */ K(kt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [j],
				"data-testid": `${x}-insert-menu`
			}),
			D("theme") && P && /* @__PURE__ */ K(k, {
				trigger: /* @__PURE__ */ K(kt, {
					label: "Theme",
					value: bt[t]
				}),
				triggerLabel: `Theme: ${bt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [P],
				"data-testid": `${x}-theme-menu`
			}),
			D("chart") && F && l && /* @__PURE__ */ K(a, {
				density: "compact",
				children: /* @__PURE__ */ K(M, {
					value: F.kind,
					onChange: (e) => l(e),
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
				})
			}),
			(u || d) && /* @__PURE__ */ q(G, { children: [
				/* @__PURE__ */ K(Ot, {}),
				u && /* @__PURE__ */ K(p, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Et, {}),
					disabled: O || !f,
					onClick: u,
					"data-testid": `${x}-undo`
				}),
				d && /* @__PURE__ */ K(p, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ K(Et, { redo: !0 }),
					disabled: O || !m,
					onClick: d,
					"data-testid": `${x}-redo`
				})
			] }),
			R.length > 0 && /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(Ot, {}), /* @__PURE__ */ K(k, {
				trigger: /* @__PURE__ */ K("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-more`,
				sections: R,
				"data-testid": `${x}-more-menu`
			})] }),
			D("note") && /* @__PURE__ */ K(_, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: Tt,
				"data-testid": `${x}-style-note`,
				children: wt
			}),
			/* @__PURE__ */ K("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			v,
			g && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: g,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ q("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ K(Dt, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function jt({ value: e, onChange: t, readOnly: n = !1, maxLength: i = ze, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = ce(), l = ce(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ q("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ q("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ K(_, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ K(_, {
				as: "span",
				id: l,
				className: r("text-[11px] tabular-nums", d ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${u} / ${i}`
			})]
		}), /* @__PURE__ */ K(A, {
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
			className: "border-transparent bg-transparent px-0 focus:border-transparent",
			"data-testid": s
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/PresentationEditor.tsx
function Mt({ testIdPrefix: e }) {
	return /* @__PURE__ */ K(P, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Nt = se(() => import("./PresentationAgentComposer-DAAhOvNp.js").catch(() => ({ default: Mt })));
function Pt({ back: e }) {
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
function Ft(e, t) {
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
function It({ spec: e, onChange: t, preview: n, onRequestPreview: o, onSaveRevision: s, revisions: c, activeRevisionId: l, onSelectRevision: u, olderRevisions: d, sources: f, onSearchSources: m, onDownload: h, onOpenPresentationView: v, readOnly: y = !1, onInstruct: x, instructHints: T, onUndoInstruct: te, generatingSlideIds: O, slideViewers: k, selectSlideRequest: A, footer: M, renderFrame: N, onSelectedSlideChange: F, className: I, "data-testid": L = "presentation-editor" }) {
	let [R, z] = W(() => e.slides[0]?.id ?? ""), [ne, ae] = W(!1), [se, ce] = W(null), J = !!x, [le, ue] = W("slide"), [de, fe] = W(!1), [pe, me] = W(null), [he, ge] = W(null), [_e, ve] = W(() => /* @__PURE__ */ new Set()), { edit: Y, undo: Te, redo: Ee, canUndo: Oe, canRedo: ke } = Ft(e, t), [Ae, je] = W([]);
	V(() => {
		typeof n == "object" && "slides" in n && je(n.slides);
	}, [n]);
	let Me = U(o);
	Me.current = o;
	let Z = e.slides, Ne = H(() => new Set(Ke(e)), [e]), Pe = Ne.size === 0;
	V(() => {
		Pe && Me.current(e);
	}, [e, Pe]);
	let Fe = typeof n == "object" && "slides" in n ? n.slides : Ae, Ie = H(() => new Map(Fe.map((e) => [e.id, e.svg])), [Fe]), Le = H(() => {
		let e = new Set(Z.map((e) => e.id));
		return Fe.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Fe, Z]), Re = Z.length + Le.length, ze = Z.findIndex((e) => e.id === R), Be = ze === -1 ? Le.findIndex((e) => e.id === R) : -1, Q = ze === -1 ? Be === -1 ? 0 : Z.length + Be : ze, $ = ze !== -1 || Be === -1 ? Z[Q] : void 0, Ve = Be === -1 ? void 0 : Le[Be], He = $?.id ?? Ve?.id, Ue = $ ? $.title || "Untitled slide" : Ve?.title, We = H(() => [...Z.map((e) => e.id), ...Le.map((e) => e.id)], [Z, Le]), Ge = Math.min(Q, Z.length - 1), qe = U(F);
	qe.current = F, V(() => {
		He && qe.current?.(He, Q);
	}, [He, Q]);
	let Je = H(() => {
		let e = new Set(O ?? []);
		return de && le === "slide" && $ && e.add($.id), [...e];
	}, [
		O,
		de,
		le,
		$
	]), Ye = !!$ && Je.includes($.id), rt = Z.map((e) => ({
		slide: e,
		thumbnailSvg: Ie.get(e.id),
		uncited: Ne.has(e.id),
		changed: _e.has(e.id)
	})), it = B((e) => {
		z(e);
	}, []), at = A?.key, ot = A?.slideId;
	V(() => {
		ot && e.slides.some((e) => e.id === ot) && z(ot);
	}, [at, ot]);
	let st = B((t, n) => {
		Y(Qe(e, t, n));
	}, [Y, e]), ct = B((t) => {
		let n = $e(e, Ge, t);
		n !== e && (Y(n), z(n.slides[Ge + 1].id));
	}, [
		Y,
		e,
		Ge
	]), lt = B((t) => {
		let n = et(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		Y(n), z(n.slides[r + 1].id);
	}, [Y, e]), dt = B((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = tt(e, t);
		r !== e && (Y(r), z(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [Y, e]), pt = B((t) => Y(Ze(e, t)), [Y, e]), mt = B(async (e) => {
		if (!x || de) return !1;
		let t = $?.id;
		fe(!0), ge(null);
		try {
			let n = await x(e, le === "slide" && t ? {
				slideId: t,
				scope: le
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return ve(new Set(r)), me(n?.summary?.trim() || "Done."), le === "deck" && r.length && (!t || !r.includes(t)) && z(r[0]), !0;
		} catch (e) {
			return ge(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			fe(!1);
		}
	}, [
		x,
		de,
		le,
		$?.id
	]), ht = B(() => {
		te?.(), me(null), ve(/* @__PURE__ */ new Set());
	}, [te]), _t = Ne.size, yt = !y && Z.length > 0 && _t === 0 && !ne, bt = B(() => {
		yt && (ae(!0), ce(null), Promise.resolve(s(e)).catch((e) => {
			ce(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ae(!1)));
	}, [
		yt,
		s,
		e
	]), xt = B((e) => {
		let t = We[Q + e];
		t && z(t);
	}, [We, Q]);
	if (V(() => {
		if (y) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), bt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !Se(e.target)) {
				e.preventDefault(), e.shiftKey ? Ee() : Te();
				return;
			}
			let n = Ce(e);
			if (!n) return;
			e.preventDefault();
			let r = we(n, Q + 1, Re);
			r !== Q + 1 && xt(r - (Q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		y,
		bt,
		Te,
		Ee,
		xt,
		Q,
		Re
	]), y) {
		let t = (c.length > 0 ? c : [{
			id: l,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === l ? [...Z.map((e, t) => {
				let n = X(Ie.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ K("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Le.map((e, t) => {
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
		return /* @__PURE__ */ K(De, {
			title: e.title,
			revisions: t,
			revisionId: l,
			onRevisionChange: u,
			slideIndex: Q + 1,
			onSlideChange: (e) => {
				let t = We[e - 1];
				t && z(t);
			},
			...h ? { onDownload: h } : {},
			className: I,
			"data-testid": `${L}-readonly`
		});
	}
	let St = (() => {
		if (Ve) {
			let e = X(Ve.svg);
			return e ? /* @__PURE__ */ K("img", {
				src: e,
				alt: Ve.title,
				className: "h-full w-full object-contain",
				"data-testid": `${L}-stage-image`
			}) : /* @__PURE__ */ K(_, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${L}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if ($ && Ne.has($.id)) return /* @__PURE__ */ K(a, {
			density: "compact",
			children: /* @__PURE__ */ K(E, {
				title: "Add a source to preview this slide",
				description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
				testId: `${L}-preview-needs-source`
			})
		});
		let t = $ ? X(Ie.get($.id)) : void 0;
		if (!Pe && !t) return /* @__PURE__ */ K(a, {
			density: "compact",
			children: /* @__PURE__ */ K(E, {
				title: "The preview waits for every slide's source",
				description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
				testId: `${L}-preview-needs-source`
			})
		});
		if (n === "loading" && Ie.size === 0) return /* @__PURE__ */ K(D, {
			label: "Rendering the deck…",
			testId: `${L}-preview-loading`
		});
		if (Pe && typeof n == "object" && "error" in n) return /* @__PURE__ */ K(ee, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => o(e),
			testId: `${L}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ K("img", {
			src: r,
			alt: $.title || `Slide ${Q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${L}-stage-image`
		}) : /* @__PURE__ */ K(_, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${L}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ct = c.map((e) => ({
		id: e.id,
		label: e.label
	})), wt = /* @__PURE__ */ q("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${L}-revision-controls`,
		children: [
			Ct.length > 5 || (d?.count ?? 0) > 0 ? /* @__PURE__ */ K(C, {
				size: "sm",
				"aria-label": "Revision",
				value: l,
				onChange: (e) => xe(e.target.value, u, d),
				options: be(Ct, d),
				className: "w-auto",
				"data-testid": `${L}-revision-select`
			}) : Ct.length > 0 && /* @__PURE__ */ K(g, {
				items: Ct,
				value: l,
				onValueChange: u,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${L}-revisions`
			}),
			/* @__PURE__ */ K(i, {
				variant: "primary",
				size: "sm",
				disabled: !yt,
				onClick: bt,
				"data-testid": `${L}-save`,
				children: ne ? "Saving…" : `Save as ${nt(c)}`
			}),
			h && /* @__PURE__ */ K(i, {
				variant: "secondary",
				size: "sm",
				onClick: h,
				"data-testid": `${L}-download`,
				children: "Download .pptx"
			})
		]
	}), Tt = J || N ? /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ K(ye, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => Y({
				...e,
				title: t
			}),
			"data-testid": `${L}-deck-title`
		}), /* @__PURE__ */ K(ye, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => Y({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${L}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ q("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ K(w, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ K(S, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => Y({
					...e,
					title: t.target.value
				}),
				"data-testid": `${L}-deck-title`
			})
		}), /* @__PURE__ */ K(w, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ K(S, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => Y({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${L}-deck-subtitle`
			})
		})]
	}), Et = v ? () => v(He ? {
		slideId: He,
		slideIndex: Q + 1
	} : void 0) : void 0, Dt = /* @__PURE__ */ K(At, {
		slide: $,
		theme: e.theme ?? "product",
		onAddSlide: ct,
		canAddSlide: Z.length < 40,
		onLayoutChange: (t) => {
			$ && Y(Ze(e, Xe($, t)));
		},
		onThemeChange: (t) => Y({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			$?.chart && Y(Ze(e, {
				...$,
				chart: {
					...$.chart,
					kind: t
				}
			}));
		},
		onUndo: Te,
		onRedo: Ee,
		canUndo: Oe,
		canRedo: ke,
		...Et ? { onPresent: Et } : {},
		testIdPrefix: `${L}-toolbar`
	}), Ot = /* @__PURE__ */ q(G, { children: [_t > 0 && /* @__PURE__ */ K(P, {
		tone: "warning",
		"data-testid": `${L}-uncited-warning`,
		children: _t === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${_t} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), se && /* @__PURE__ */ K(P, {
		tone: "error",
		onDismiss: () => ce(null),
		"data-testid": `${L}-save-error`,
		children: se
	})] }), kt = J && /* @__PURE__ */ q(G, { children: [he && /* @__PURE__ */ K(P, {
		tone: "error",
		onDismiss: () => ge(null),
		"data-testid": `${L}-agent-error`,
		children: he
	}), pe && !he && /* @__PURE__ */ q("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${L}-agent-summary`,
		children: [
			/* @__PURE__ */ K(_, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${pe}`
			}),
			_e.size > 0 && /* @__PURE__ */ K(_, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: _e.size === 1 ? "1 slide marked in the filmstrip" : `${_e.size} slides marked in the filmstrip`
			}),
			te && /* @__PURE__ */ K(i, {
				variant: "ghost",
				size: "sm",
				onClick: ht,
				"data-testid": `${L}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Mt = J && $ && /* @__PURE__ */ K(oe, {
		fallback: /* @__PURE__ */ K(_, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${L}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ K(Nt, {
			scope: le,
			onScopeChange: ue,
			slideLabel: `slide ${Q + 1}`,
			busy: de,
			onSubmit: mt,
			...T?.length ? { suggestions: T } : {},
			testIdPrefix: L
		})
	}), It = {
		selectedSlide: $,
		...Ve ? { selectedGeneratedSlide: Ve } : {},
		selectedIndex: Q,
		slideCount: Re,
		selectSlide: it,
		markChanged: (e) => ve(new Set(e))
	}, Lt = typeof M == "function" ? M(It) : M, Rt = Lt != null && Lt !== !1 ? Lt : Mt ? /* @__PURE__ */ K(re, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ q("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${L}-dock-card`,
			children: [kt, Mt]
		}),
		"data-testid": `${L}-dock`
	}) : null, zt = $ && /* @__PURE__ */ K(G, { children: J ? /* @__PURE__ */ q(G, { children: [/* @__PURE__ */ K(ft, {
		compact: !0,
		sources: $.sources,
		onChange: (e) => pt({
			...$,
			sources: e
		}),
		options: f,
		onSearchSources: m,
		testIdPrefix: `${L}-slide`
	}), /* @__PURE__ */ K(b, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${L}-details`,
		children: /* @__PURE__ */ K(gt, {
			slide: $,
			onChange: pt,
			sources: f,
			onSearchSources: m,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${L}-slide`
		})
	})] }) : /* @__PURE__ */ K(gt, {
		slide: $,
		onChange: pt,
		sources: f,
		onSearchSources: m,
		showNotes: !1,
		testIdPrefix: `${L}-slide`
	}) }), Bt = /* @__PURE__ */ q("div", {
		className: r("flex items-center justify-center gap-2", N && "ml-auto shrink-0"),
		"data-testid": `${L}-slide-nav`,
		children: [
			/* @__PURE__ */ K(p, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(Pt, { back: !0 }),
				disabled: Q <= 0,
				onClick: () => xt(-1),
				"data-testid": `${L}-previous`
			}),
			/* @__PURE__ */ K(_, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${L}-position`,
				children: `Slide ${Re === 0 ? 0 : Q + 1} of ${Re}`
			}),
			/* @__PURE__ */ K(p, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ K(Pt, {}),
				disabled: Q >= Re - 1,
				onClick: () => xt(1),
				"data-testid": `${L}-next`
			}),
			/* @__PURE__ */ K(j, {
				value: Z.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Z.length} / 40`,
				className: "ml-2",
				"data-testid": `${L}-slide-meter`
			})
		]
	}), Vt = /* @__PURE__ */ q("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${L}-body`,
		children: [/* @__PURE__ */ K(ut, {
			items: rt,
			selectedId: $?.id ?? "",
			onSelect: it,
			onMove: st,
			onDuplicate: lt,
			onDelete: dt,
			onAdd: () => ct(),
			canAdd: Z.length < 40,
			generatingSlideIds: Je,
			generatedItems: Le.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...k ? { slideViewers: k } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${L}-slide`
		}), /* @__PURE__ */ q("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${L}-main`,
			children: [
				/* @__PURE__ */ K("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${L}-stage-frame`,
					children: /* @__PURE__ */ K(vt, {
						generating: Ye,
						label: Ue ? `Slide ${Q + 1} of ${Re}: ${Ue}` : "No slide",
						"data-testid": `${L}-stage`,
						children: St
					})
				}),
				!N && Bt,
				Ve && /* @__PURE__ */ K(_, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${L}-generated-note`,
					children: `${Ve.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				$ && /* @__PURE__ */ q("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ K(jt, {
						value: $.notes,
						onChange: (e) => pt({
							...$,
							notes: e
						}),
						"data-testid": `${L}-slide-notes`
					}), zt]
				})
			]
		})]
	}), Ht = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (N) {
		let e = /* @__PURE__ */ q("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", I),
			"data-testid": L,
			onKeyDown: Ht,
			children: [
				/* @__PURE__ */ q("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${L}-deck-line`,
					children: [Tt, Bt]
				}),
				Ot,
				Vt
			]
		});
		return /* @__PURE__ */ K(G, { children: N({
			toolbar: Dt,
			actions: wt,
			surface: e,
			footer: Rt
		}) });
	}
	return /* @__PURE__ */ q("div", {
		className: r("relative flex h-full min-h-0 flex-col", I),
		"data-testid": L,
		onKeyDown: Ht,
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ q("div", {
					className: r("flex flex-wrap justify-between gap-2", J ? "items-center" : "items-end"),
					...J ? { "data-testid": `${L}-deck-line` } : {},
					children: [Tt, wt]
				}), /* @__PURE__ */ K("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Dt
				})]
			}),
			/* @__PURE__ */ q("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${L}-scroller`,
				children: [Ot, Vt]
			}),
			/* @__PURE__ */ K("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${L}-dock-row`,
				children: /* @__PURE__ */ K(ie.Provider, {
					value: "pinned",
					children: Rt
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ProposedEditStrip.tsx
var Lt = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function Rt(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => Lt[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function zt(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function Bt({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [o, s] = W(!1), [c, l] = W(""), u = Rt(e.content), d = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ q("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ q("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ K(f, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: zt(e)
					}),
					e.summary && /* @__PURE__ */ K("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ K("span", { className: "flex-1" }),
					d && /* @__PURE__ */ q("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ K(te, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ K(f, {
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
								children: d ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ K(i, {
								size: "sm",
								variant: "primary",
								disabled: d || p || !u,
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
				children: [/* @__PURE__ */ K(S, {
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
function Vt({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
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
			children: d.map((e) => /* @__PURE__ */ K(Bt, {
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
export { $e as A, Xe as B, Ne as C, He as D, Ie as E, nt as F, Y as G, Me as H, Je as I, ge as J, be as K, tt as L, et as M, Ye as N, Ue as O, Qe as P, Ze as R, $ as S, Le as T, X as U, Z as V, De as W, he as X, _e as Y, me as Z, Fe as _, jt as a, Re as b, At as c, gt as d, ft as f, Pe as g, Ge as h, It as i, qe as j, We as k, St as l, lt as m, zt as n, xt as o, ut as p, ye as q, Rt as r, yt as s, Vt as t, vt as u, Be as v, Ve as w, ze as x, Q as y, Ke as z };
