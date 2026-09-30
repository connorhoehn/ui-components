import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { t as r } from "./cn-D4QmbyEy.js";
import { v as i } from "./overlayStack-DWxp7Rsz.js";
import { a, i as o, n as s, o as c, r as l, t as u } from "./Table-CPSPcCzr.js";
import { t as d } from "./Chip-QXPdpJoz.js";
import { t as f } from "./IconButton-VqtspsS5.js";
import { J as p, f as m } from "./Icons-CCn6EnUZ.js";
import { i as h, o as g } from "./Breadcrumbs-CjrGWjOa.js";
import { n as _ } from "./Badge-BCM8nNmE.js";
import { t as v } from "./Modal-R-ipbeZi.js";
import { t as y } from "./Input-CpLq80dw.js";
import { t as b } from "./EmptyState-DnbFBYDA.js";
import { n as x, t as S } from "./ThinkingDots-BZOWJ3Fp.js";
import { n as ee, t as C } from "./StatusPill-c89IbU1L.js";
import { t as w } from "./FormField-BQhFpmZJ.js";
import { n as te } from "./Tabs-BArH-7z_.js";
import { t as T } from "./Textarea-Drx4YDDG.js";
import { t as E } from "./DotMeter-KxyExwVb.js";
import { t as ne } from "./SegmentedControl-Blx221jS.js";
import { t as D } from "./SearchInput-8LpHL-oD.js";
import { n as O } from "./RovingToolbar-B1Fai5PF.js";
import { t as k } from "./InlineAlert-CBtteaVZ.js";
import { t as A } from "./PresenceAvatars-DlmKqodq.js";
import { t as j } from "./DropdownMenu-DfuRPo2m.js";
import { t as M } from "./SectionLabel-Bn8Vvb-K.js";
import { n as N } from "./Text-DrPQe5RD.js";
import { t as re } from "./Select-ErGXS9Yj.js";
import { G as P, U as ie } from "./renderers-Doqpgh8C.js";
import { t as F } from "./useMeasuredWidth-BPrwD0q5.js";
import { r as ae } from "./composerCommands-pkWHH8RU.js";
import { i as oe, t as se } from "./FloatingComposerDock-ZezHreIm.js";
import { Component as ce, Suspense as le, lazy as I, useCallback as L, useEffect as R, useId as ue, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var G = /* @__PURE__ */ new Set(["diagram", "presentation"]), de = [
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
	let [u, f] = V([]), [p, m] = V(!1), [h, _] = V(null), [b, x] = V(null), [S, ee] = V(""), [C, w] = V(""), [te, E] = V(!1), [ne, D] = V(""), [O, k] = V("page"), [A, j] = V("blank"), [M, N] = V(""), [F, ae] = V(""), [oe, se] = V([]), ce = B(null), le = B(null), I = ue(), L = `${I}-blank-label`, ge = `${I}-type-label`, _e = `${I}-cookbook-label`, ve = `${I}-title`, ye = `${I}-description`, be = `${I}-deck-from`, xe = `${I}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		f(r), _(null), x(null), ee(""), w(""), E(!1), D(""), k(l ?? "page"), j("blank"), N(""), ae(""), se([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), _((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => ce.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let K = z(() => de.filter((e) => pe(e, S)), [S]), q = z(() => u.filter((e) => me(e, S)), [u, S]), Se = z(() => ie.filter((e) => P(e, S)), [S]);
	if (R(() => {
		if (!e || O !== "presentation") return;
		if (A === "blank") {
			se([]);
			return;
		}
		let t = F.trim().toLowerCase();
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
		return Promise.resolve(s(F.trim())).then((e) => {
			n || se(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		A,
		F,
		c,
		s
	]), !e) return null;
	let Ce = u.find((e) => e.id === h), we = b ? ie.find((e) => e.id === b) : void 0, Te = O === "sections", Ee = !!we || !!Ce, De = u.length === 0 && !p && !we, Oe = K.length === 0 && q.length === 0 && Se.length === 0, J = we ? {
		kind: "cookbook",
		cookbook: we
	} : Ce && !G.has(O) ? {
		kind: "type",
		type: Ce
	} : {
		kind: "blank",
		shape: O
	}, ke = (e) => {
		if (e.kind === "cookbook") {
			x(e.cookbook.id), G.has(O) && k("page"), te || w(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			k(e.shape), G.has(e.shape) && (x(null), te || w(""));
			return;
		}
		x(null), _(e.type.id), te || w("");
	}, Ae = (e) => e.kind === "blank" ? e.shape : G.has(O) ? "page" : O, je = (e, t, n) => {
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
	}, Me = O === "presentation" && A !== "blank" && !M, Ne = !!C.trim() && (!Te || Ee) && !Me, Y = () => {
		Ne && je(J, C, Ae(J));
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
				e.key === "Enter" && !e.shiftKey && Ne && Y();
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
						ref: ce,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: S,
						onChange: (e) => ee(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = Se.length > 0 && S.trim() ? {
								kind: "cookbook",
								cookbook: Se[0]
							} : K.length > 0 ? {
								kind: "blank",
								shape: K[0].id
							} : q.length > 0 ? {
								kind: "type",
								type: q[0]
							} : void 0;
							if (!t) return;
							ke(t);
							let n = C.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								le.current?.focus();
								return;
							}
							je(t, n, Ae(t));
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
						K.length > 0 && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ U("div", {
								id: L,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ U("div", {
								role: "group",
								"aria-labelledby": L,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: K.map((e) => /* @__PURE__ */ W(g, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => ke({
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
									htmlFor: be,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ U(re, {
									id: be,
									value: A,
									options: fe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										j(e.target.value), N(""), ae("");
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
										value: F,
										onChange: (e) => ae(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), oe.length === 0 ? /* @__PURE__ */ U("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : s ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("label", {
										htmlFor: xe,
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
									}), /* @__PURE__ */ U(re, {
										id: xe,
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
						Se.length > 0 && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ W("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ U("div", {
									id: _e,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ U("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ U("div", {
								role: "group",
								"aria-labelledby": _e,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: Se.map((e) => {
									let t = b === e.id;
									return /* @__PURE__ */ W(g, {
										padding: "md",
										selected: t,
										onSelect: () => ke({
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
						!G.has(O) && (q.length > 0 || De || u.length === 0 && p) && /* @__PURE__ */ W("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ W("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ U("span", {
										id: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Te && /* @__PURE__ */ U("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								u.length === 0 && p && /* @__PURE__ */ U("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								De && /* @__PURE__ */ U("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Te ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								q.length > 0 && /* @__PURE__ */ U("div", {
									role: "group",
									"aria-labelledby": ge,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: q.map((e) => {
										let t = !we && h === e.id;
										return /* @__PURE__ */ W("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => ke({
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
						Oe && /* @__PURE__ */ W("div", {
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
							htmlFor: ve,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ U("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ U(y, {
							ref: le,
							id: ve,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: C,
							onChange: (e) => {
								w(e.target.value), E(!0);
							},
							placeholder: we ? `e.g. ${we.name}` : Ce ? `e.g. Q2 ${Ce.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("label", {
						htmlFor: ye,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ U("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ U(T, {
						id: ye,
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
						disabled: !Ne,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Ne ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var _e = class extends ce {
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
	let p = ue(), m = c === 3 ? "h3" : "h2", h = t === 0;
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
var K = "__older-revisions__";
function q(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: K,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: K,
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
function Oe({ title: e, subtitle: t, revisions: n, olderRevisions: a, revisionId: o, onRevisionChange: s, slideIndex: c, onSlideChange: l, onDownload: u, downloadLabel: d = "Download .pptx", onOpenPreview: p, pending: m, notice: g, state: _ = "ready", errorMessage: v, ownerName: y, onRetry: S, maxSlideWidth: w, autoFocus: te = !1, className: T, "data-testid": E = "presentation-view" }) {
	let D = ue(), O = B(null), k = B(!1);
	if (R(() => {
		!te || k.current || !O.current || (k.current = !0, O.current.focus({ preventScroll: !0 }));
	}), _ === "loading") return /* @__PURE__ */ U(ee, {
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
		...S ? {
			actionLabel: "Try again",
			onAction: S
		} : {},
		testId: `${E}-error`
	});
	let A = n.find((e) => e.id === o) ?? n[0], j = A?.slides ?? [];
	if (_ === "empty" || !A || j.length === 0) return /* @__PURE__ */ W("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", T),
		"data-testid": E,
		children: [/* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ U(N, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ U(N, {
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
	let P = j[Math.min(Math.max(c, 1), j.length) - 1];
	return /* @__PURE__ */ W("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", T),
		ref: O,
		"data-testid": E,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${P.index} of ${j.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = we(e);
			if (!t) return;
			e.preventDefault();
			let n = Te(t, P.index, j.length);
			n !== P.index && l(n);
		},
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ U(N, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${E}-title`,
						children: e
					}), t && /* @__PURE__ */ U(N, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${E}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ee || (a?.count ?? 0) > 0 ? /* @__PURE__ */ U(re, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: (e) => Se(e.target.value, s, a),
							options: q(n, a),
							className: "w-auto",
							"data-testid": `${E}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ U(ne, {
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
						m && /* @__PURE__ */ U(C, {
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
							children: P.preview ?? /* @__PURE__ */ U(N, {
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
								disabled: P.index <= 1,
								onClick: () => l(P.index - 1),
								"data-testid": `${E}-previous`
							}),
							/* @__PURE__ */ U(N, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${E}-position`,
								children: `Slide ${P.index} of ${j.length}`
							}),
							/* @__PURE__ */ U(f, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ U(De, {}),
								disabled: P.index >= j.length,
								onClick: () => l(P.index + 1),
								"data-testid": `${E}-next`
							}),
							p && P.preview && /* @__PURE__ */ U(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => p(P.id),
								"data-testid": `${E}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ W("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": D,
					"data-testid": `${E}-outline`,
					children: [/* @__PURE__ */ U(M, {
						as: "div",
						className: "mb-1",
						"data-testid": `${E}-outline-label`,
						children: /* @__PURE__ */ U("span", {
							id: D,
							children: "Slides"
						})
					}), /* @__PURE__ */ U("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ U("li", { children: /* @__PURE__ */ W("button", {
							type: "button",
							onClick: () => l(e.index),
							"aria-current": e.id === P.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === P.id && "bg-surface-hover font-medium"),
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
			g && /* @__PURE__ */ U(N, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${E}-notice`,
				children: g
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
	let b = J(i);
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
						}) : /* @__PURE__ */ U(N, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ W("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ U(N, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ U(N, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ U(N, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${y}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ U(N, {
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
function Y({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Ne, listClassName: u, testIdPrefix: d }) {
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
var Pe = 40, Fe = 8, Ie = 200, Le = 120, Re = 200, ze = 60, Be = 2e3, Ve = 24, X = 6, Z = 400, Q = 10, He = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ue = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image"
], $ = {
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
var nt = I(() => import("./SortableSlideList-BeBQuJtj.js"));
function rt(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function it(e, t) {
	rt(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function at() {
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
function ot({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = J(e.thumbnailSvg), c = t + 1;
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
						children: [/* @__PURE__ */ U(N, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ U(N, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ W("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ U(N, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ W(N, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ U(at, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ U("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ U(A, {
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
function ct({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: c = !1, viewers: l, readOnly: u = !1, onSelect: d, onMove: f, onDuplicate: p, onDelete: m, canDuplicate: h, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = J(i), S = t + 1, ee = e.title || "Untitled slide", C = [
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
					"aria-label": `Slide ${S}: ${ee}`,
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
						children: [/* @__PURE__ */ U(N, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: ee
						}), /* @__PURE__ */ U(N, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: $[e.layout]
						})]
					}), c && /* @__PURE__ */ U("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${b}-generating-${e.id}`,
						children: /* @__PURE__ */ U(N, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ W("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						x ? /* @__PURE__ */ U(N, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: ee
						}) : /* @__PURE__ */ U("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !c && /* @__PURE__ */ U(N, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${b}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ U(N, {
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
					children: /* @__PURE__ */ U(A, {
						users: [...l],
						maxVisible: 2,
						size: 16
					})
				}),
				!u && C.length > 0 && /* @__PURE__ */ U("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ U(j, {
						trigger: /* @__PURE__ */ U(st, {}),
						triggerLabel: `Slide ${S} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "h-auto bg-surface/90 px-1 py-0.5",
						triggerTestId: `${b}-menu-${e.id}`,
						align: "end",
						sections: [{ items: C }],
						"data-testid": `${b}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function lt({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: c, canAdd: l = !0, generatingSlideIds: u, generatedItems: d, slideViewers: f, readOnly: m = !1, className: h, testIdPrefix: g = "filmstrip" }) {
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
		rt(_.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let x = d ?? [], S = [...e.map((e) => e.slide.id), ...x.map((e) => e.id)], ee = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = S.indexOf(t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= S.length) return;
		r.preventDefault();
		let s = S[i];
		if (r.altKey) {
			if (m || i >= e.length || o >= e.length) return;
			a(i, o), requestAnimationFrame(() => it(_.current, s));
			return;
		}
		let c = S[o];
		n(c), it(_.current, c);
	}, C = {
		items: y,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: l,
		rowComponent: ct,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ W("div", {
		ref: _,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", h),
		"data-testid": `${g}-strip`,
		onKeyDown: ee,
		children: [
			/* @__PURE__ */ U(le, {
				fallback: /* @__PURE__ */ U(Y, { ...C }),
				children: U(m ? Y : nt, { ...C })
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
					children: /* @__PURE__ */ U(N, {
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
				children: x.map((r, i) => /* @__PURE__ */ U(ot, {
					item: r,
					index: e.length + b.length + i,
					selected: r.id === t,
					...f?.[r.id]?.length ? { viewers: f[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			c && !m && /* @__PURE__ */ W("div", {
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
						children: [/* @__PURE__ */ U(p, { size: 12 }), "Add slide"]
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
	let [l, u] = V(""), [d, f] = V(!1), [p, m] = V(n), h = ue(), g = B(0);
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
	}, b = /* @__PURE__ */ U(ae, {
		references: _,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${c}-source-chips`
	}), x = /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ U(D, {
			value: l,
			onChange: u,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${c}-source-search`
		}), v ? /* @__PURE__ */ U(N, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : p.length === 0 ? /* @__PURE__ */ U(N, {
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
							children: ut[t.kind ?? "document"]
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
				/* @__PURE__ */ U(M, {
					as: "div",
					children: /* @__PURE__ */ U("span", {
						id: h,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ U(N, {
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
			/* @__PURE__ */ U(M, {
				as: "div",
				children: /* @__PURE__ */ U("span", {
					id: h,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ U(k, {
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
function pt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ U(M, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ U("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ W("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ U(N, {
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
							icon: /* @__PURE__ */ U(ft, {}),
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
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-end gap-2",
			children: [/* @__PURE__ */ U(w, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ U(re, {
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
						icon: /* @__PURE__ */ U(ft, {}),
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
	return /* @__PURE__ */ W("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ U(w, {
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
				}), /* @__PURE__ */ U(w, {
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
			e.layout === "bullets" && /* @__PURE__ */ U(pt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ W("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ U(pt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ U(pt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ U(mt, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ U(w, {
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
				}), /* @__PURE__ */ U(w, {
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
			e.layout === "image" && /* @__PURE__ */ U(w, {
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
			s && /* @__PURE__ */ U(w, {
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
			o && /* @__PURE__ */ U(dt, {
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
	return /* @__PURE__ */ U("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ W("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", gt[a]),
			children: [e, t && /* @__PURE__ */ W("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ U("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ U(N, {
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
function Et() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Dt() {
	return /* @__PURE__ */ U("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function Ot({ label: e, value: t }) {
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
			/* @__PURE__ */ U(m, { size: 12 })
		]
	});
}
function kt({ slide: e, theme: t, onAddSlide: n, canAddSlide: a = !0, onLayoutChange: o, onThemeChange: s, onChartKindChange: c, onUndo: l, onRedo: u, canUndo: d = !1, canRedo: m = !1, onPresent: h, end: g, disabled: _ = !1, className: v, testIdPrefix: y = "slides-toolbar", size: b = "auto" }) {
	let { ref: x, ...S } = O(), { ref: ee, width: C } = F(x), w = b === "auto" ? xt(C) : b, te = St[w], T = (e) => te.has(e), E = _, D = !E && e ? {
		label: "Layout of this slide",
		items: Ue.map((t) => ({
			label: $[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && o(t);
			},
			"data-testid": `${y}-layout-${t}`
		}))
	} : null, k = !E && a ? {
		label: "New slide after this one",
		items: vt.map((e) => ({
			label: `${$[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${y}-insert-${e}`
		}))
	} : null, A = E ? null : {
		label: "Deck theme",
		items: We.map((e) => ({
			label: yt[e],
			checked: e === t,
			onSelect: () => {
				e !== t && s(e);
			},
			"data-testid": `${y}-theme-${e}`
		}))
	}, M = !E && e?.layout === "chart" && e.chart && c ? e.chart : null, re = M && c ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: M.kind === e,
			onSelect: () => {
				M.kind !== e && c(e);
			},
			"data-testid": `${y}-chart-kind-${e}`
		}))
	} : null, P = [];
	return !T("layout") && D && P.push(D), !T("insert") && k && P.push(k), !T("theme") && A && P.push(A), !T("chart") && re && P.push(re), !T("note") && !E && P.push({
		label: Ct,
		items: [],
		"data-testid": `${y}-style-note`
	}), /* @__PURE__ */ W("div", {
		...S,
		ref: ee,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": w,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", v),
		"data-testid": y,
		children: [
			/* @__PURE__ */ U(i, {
				variant: "primary",
				size: "sm",
				disabled: E || !a,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${y}-new-slide`,
				children: /* @__PURE__ */ W("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ U(p, { size: 12 }), "New slide"]
				})
			}),
			T("layout") && D && e && /* @__PURE__ */ U(j, {
				trigger: /* @__PURE__ */ U(Ot, {
					label: "Layout",
					value: $[e.layout]
				}),
				triggerLabel: `Layout: ${$[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-layout`,
				sections: [D],
				"data-testid": `${y}-layout-menu`
			}),
			T("insert") && k && /* @__PURE__ */ U(j, {
				trigger: /* @__PURE__ */ U(Ot, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-insert`,
				sections: [k],
				"data-testid": `${y}-insert-menu`
			}),
			T("theme") && A && /* @__PURE__ */ U(j, {
				trigger: /* @__PURE__ */ U(Ot, {
					label: "Theme",
					value: yt[t]
				}),
				triggerLabel: `Theme: ${yt[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-theme`,
				sections: [A],
				"data-testid": `${y}-theme-menu`
			}),
			T("chart") && M && c && /* @__PURE__ */ U(ne, {
				size: "sm",
				value: M.kind,
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
				/* @__PURE__ */ U(Dt, {}),
				l && /* @__PURE__ */ U(f, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ U(Tt, {}),
					disabled: E || !d,
					onClick: l,
					"data-testid": `${y}-undo`
				}),
				u && /* @__PURE__ */ U(f, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ U(Tt, { redo: !0 }),
					disabled: E || !m,
					onClick: u,
					"data-testid": `${y}-redo`
				})
			] }),
			P.length > 0 && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(Dt, {}), /* @__PURE__ */ U(j, {
				trigger: /* @__PURE__ */ U("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${y}-more`,
				sections: P,
				"data-testid": `${y}-more-menu`
			})] }),
			T("note") && /* @__PURE__ */ U(N, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-[11px] text-text-tertiary",
				title: wt,
				"data-testid": `${y}-style-note`,
				children: Ct
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
					children: [/* @__PURE__ */ U(Et, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function At({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Be, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let c = ue(), l = ue(), u = e?.length ?? 0, d = u >= i * .9;
	return /* @__PURE__ */ W("section", {
		"aria-labelledby": c,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ U(N, {
				as: "span",
				id: c,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ U(N, {
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
function jt({ testIdPrefix: e }) {
	return /* @__PURE__ */ U(k, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Mt = I(() => import("./PresentationAgentComposer-DnWZObmZ.js").catch(() => ({ default: jt })));
function Nt({ back: e }) {
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
function Pt(e, t) {
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
function Ft({ spec: e, onChange: t, preview: n, onRequestPreview: a, onSaveRevision: o, revisions: s, activeRevisionId: c, onSelectRevision: l, olderRevisions: u, sources: d, onSearchSources: p, onDownload: m, onOpenPresentationView: h, readOnly: g = !1, onInstruct: v, instructHints: S, onUndoInstruct: C, generatingSlideIds: T, slideViewers: ne, selectSlideRequest: D, footer: O, renderFrame: A, onSelectedSlideChange: j, className: M, "data-testid": P = "presentation-editor" }) {
	let [ie, F] = V(() => e.slides[0]?.id ?? ""), [ae, ce] = V(!1), [I, ue] = V(null), G = !!v, [de, fe] = V("slide"), [pe, me] = V(!1), [he, ge] = V(null), [_e, ve] = V(null), [ye, be] = V(() => /* @__PURE__ */ new Set()), { edit: K, undo: Ee, redo: De, canUndo: ke, canRedo: Ae } = Pt(e, t), [je, Me] = V([]);
	R(() => {
		typeof n == "object" && "slides" in n && Me(n.slides);
	}, [n]);
	let Ne = B(a);
	Ne.current = a;
	let Y = e.slides, Pe = z(() => new Set(Ge(e)), [e]), Fe = Pe.size === 0;
	R(() => {
		Fe && Ne.current(e);
	}, [e, Fe]);
	let Ie = typeof n == "object" && "slides" in n ? n.slides : je, Le = z(() => new Map(Ie.map((e) => [e.id, e.svg])), [Ie]), Re = z(() => {
		let e = new Set(Y.map((e) => e.id));
		return Ie.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Ie, Y]), ze = Y.length + Re.length, Be = Y.findIndex((e) => e.id === ie), Ve = Be === -1 ? Re.findIndex((e) => e.id === ie) : -1, X = Be === -1 ? Ve === -1 ? 0 : Y.length + Ve : Be, Z = Be !== -1 || Ve === -1 ? Y[X] : void 0, Q = Ve === -1 ? void 0 : Re[Ve], He = Z?.id ?? Q?.id, Ue = Z ? Z.title || "Untitled slide" : Q?.title, $ = z(() => [...Y.map((e) => e.id), ...Re.map((e) => e.id)], [Y, Re]), We = Math.min(X, Y.length - 1), Ke = B(j);
	Ke.current = j, R(() => {
		He && Ke.current?.(He, X);
	}, [He, X]);
	let qe = z(() => {
		let e = new Set(T ?? []);
		return pe && de === "slide" && Z && e.add(Z.id), [...e];
	}, [
		T,
		pe,
		de,
		Z
	]), Je = !!Z && qe.includes(Z.id), nt = Y.map((e) => ({
		slide: e,
		thumbnailSvg: Le.get(e.id),
		uncited: Pe.has(e.id),
		changed: ye.has(e.id)
	})), rt = L((e) => {
		F(e);
	}, []), it = D?.key, at = D?.slideId;
	R(() => {
		at && e.slides.some((e) => e.id === at) && F(at);
	}, [it, at]);
	let ot = L((t, n) => {
		K(Ze(e, t, n));
	}, [K, e]), st = L((t) => {
		let n = Qe(e, We, t);
		n !== e && (K(n), F(n.slides[We + 1].id));
	}, [
		K,
		e,
		We
	]), ct = L((t) => {
		let n = $e(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		K(n), F(n.slides[r + 1].id);
	}, [K, e]), ut = L((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = et(e, t);
		r !== e && (K(r), F(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [K, e]), ft = L((t) => K(Xe(e, t)), [K, e]), pt = L(async (e) => {
		if (!v || pe) return !1;
		let t = Z?.id;
		me(!0), ve(null);
		try {
			let n = await v(e, de === "slide" && t ? {
				slideId: t,
				scope: de
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return be(new Set(r)), ge(n?.summary?.trim() || "Done."), de === "deck" && r.length && (!t || !r.includes(t)) && F(r[0]), !0;
		} catch (e) {
			return ve(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			me(!1);
		}
	}, [
		v,
		pe,
		de,
		Z?.id
	]), mt = L(() => {
		C?.(), ge(null), be(/* @__PURE__ */ new Set());
	}, [C]), gt = Pe.size, vt = !g && Y.length > 0 && gt === 0 && !ae, yt = L(() => {
		vt && (ce(!0), ue(null), Promise.resolve(o(e)).catch((e) => {
			ue(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ce(!1)));
	}, [
		vt,
		o,
		e
	]), bt = L((e) => {
		let t = $[X + e];
		t && F(t);
	}, [$, X]);
	if (R(() => {
		if (g) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), yt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !Ce(e.target)) {
				e.preventDefault(), e.shiftKey ? De() : Ee();
				return;
			}
			let n = we(e);
			if (!n) return;
			e.preventDefault();
			let r = Te(n, X + 1, ze);
			r !== X + 1 && bt(r - (X + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		g,
		yt,
		Ee,
		De,
		bt,
		X,
		ze
	]), g) {
		let t = (s.length > 0 ? s : [{
			id: c,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === c ? [...Y.map((e, t) => {
				let n = J(Le.get(e.id));
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
				let n = J(e.svg);
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
			slideIndex: X + 1,
			onSlideChange: (e) => {
				let t = $[e - 1];
				t && F(t);
			},
			...m ? { onDownload: m } : {},
			className: M,
			"data-testid": `${P}-readonly`
		});
	}
	let xt = (() => {
		if (Q) {
			let e = J(Q.svg);
			return e ? /* @__PURE__ */ U("img", {
				src: e,
				alt: Q.title,
				className: "h-full w-full object-contain",
				"data-testid": `${P}-stage-image`
			}) : /* @__PURE__ */ U(N, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${P}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Z && Pe.has(Z.id)) return /* @__PURE__ */ U(b, {
			size: "sm",
			title: "Add a source to preview this slide",
			description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
			testId: `${P}-preview-needs-source`
		});
		let t = Z ? J(Le.get(Z.id)) : void 0;
		if (!Fe && !t) return /* @__PURE__ */ U(b, {
			size: "sm",
			title: "The preview waits for every slide's source",
			description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
			testId: `${P}-preview-needs-source`
		});
		if (n === "loading" && Le.size === 0) return /* @__PURE__ */ U(ee, {
			label: "Rendering the deck…",
			testId: `${P}-preview-loading`
		});
		if (Fe && typeof n == "object" && "error" in n) return /* @__PURE__ */ U(x, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => a(e),
			testId: `${P}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ U("img", {
			src: r,
			alt: Z.title || `Slide ${X + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${P}-stage-image`
		}) : /* @__PURE__ */ U(N, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${P}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), St = s.map((e) => ({
		id: e.id,
		label: e.label
	})), Ct = /* @__PURE__ */ W("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${P}-revision-controls`,
		children: [
			St.length > 5 || (u?.count ?? 0) > 0 ? /* @__PURE__ */ U(re, {
				size: "sm",
				"aria-label": "Revision",
				value: c,
				onChange: (e) => Se(e.target.value, l, u),
				options: q(St, u),
				className: "w-auto",
				"data-testid": `${P}-revision-select`
			}) : St.length > 0 && /* @__PURE__ */ U(te, {
				items: St,
				value: c,
				onValueChange: l,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${P}-revisions`
			}),
			/* @__PURE__ */ U(i, {
				variant: "primary",
				size: "sm",
				disabled: !vt,
				onClick: yt,
				"data-testid": `${P}-save`,
				children: ae ? "Saving…" : `Save as ${tt(s)}`
			}),
			m && /* @__PURE__ */ U(i, {
				variant: "secondary",
				size: "sm",
				onClick: m,
				"data-testid": `${P}-download`,
				children: "Download .pptx"
			})
		]
	}), wt = G || A ? /* @__PURE__ */ W("div", {
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
			"data-testid": `${P}-deck-title`
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
			"data-testid": `${P}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ W("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ U(w, {
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
				"data-testid": `${P}-deck-title`
			})
		}), /* @__PURE__ */ U(w, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ U(y, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => K({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${P}-deck-subtitle`
			})
		})]
	}), Tt = h ? () => h(He ? {
		slideId: He,
		slideIndex: X + 1
	} : void 0) : void 0, Et = /* @__PURE__ */ U(kt, {
		slide: Z,
		theme: e.theme ?? "product",
		onAddSlide: st,
		canAddSlide: Y.length < 40,
		onLayoutChange: (t) => {
			Z && K(Xe(e, Ye(Z, t)));
		},
		onThemeChange: (t) => K({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Z?.chart && K(Xe(e, {
				...Z,
				chart: {
					...Z.chart,
					kind: t
				}
			}));
		},
		onUndo: Ee,
		onRedo: De,
		canUndo: ke,
		canRedo: Ae,
		...Tt ? { onPresent: Tt } : {},
		testIdPrefix: `${P}-toolbar`
	}), Dt = /* @__PURE__ */ W(H, { children: [gt > 0 && /* @__PURE__ */ U(k, {
		tone: "warning",
		"data-testid": `${P}-uncited-warning`,
		children: gt === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${gt} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), I && /* @__PURE__ */ U(k, {
		tone: "error",
		onDismiss: () => ue(null),
		"data-testid": `${P}-save-error`,
		children: I
	})] }), Ot = G && /* @__PURE__ */ W(H, { children: [_e && /* @__PURE__ */ U(k, {
		tone: "error",
		onDismiss: () => ve(null),
		"data-testid": `${P}-agent-error`,
		children: _e
	}), he && !_e && /* @__PURE__ */ W("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${P}-agent-summary`,
		children: [
			/* @__PURE__ */ U(N, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${he}`
			}),
			ye.size > 0 && /* @__PURE__ */ U(N, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: ye.size === 1 ? "1 slide marked in the filmstrip" : `${ye.size} slides marked in the filmstrip`
			}),
			C && /* @__PURE__ */ U(i, {
				variant: "ghost",
				size: "sm",
				onClick: mt,
				"data-testid": `${P}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), jt = G && Z && /* @__PURE__ */ U(le, {
		fallback: /* @__PURE__ */ U(N, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${P}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ U(Mt, {
			scope: de,
			onScopeChange: fe,
			slideLabel: `slide ${X + 1}`,
			busy: pe,
			onSubmit: pt,
			...S?.length ? { suggestions: S } : {},
			testIdPrefix: P
		})
	}), Ft = {
		selectedSlide: Z,
		...Q ? { selectedGeneratedSlide: Q } : {},
		selectedIndex: X,
		slideCount: ze,
		selectSlide: rt,
		markChanged: (e) => be(new Set(e))
	}, It = typeof O == "function" ? O(Ft) : O, Lt = It != null && It !== !1 ? It : jt ? /* @__PURE__ */ U(oe, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${P}-dock-card`,
			children: [Ot, jt]
		}),
		"data-testid": `${P}-dock`
	}) : null, Rt = Z && /* @__PURE__ */ U(H, { children: G ? /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(dt, {
		compact: !0,
		sources: Z.sources,
		onChange: (e) => ft({
			...Z,
			sources: e
		}),
		options: d,
		onSearchSources: p,
		testIdPrefix: `${P}-slide`
	}), /* @__PURE__ */ U(_, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${P}-details`,
		children: /* @__PURE__ */ U(ht, {
			slide: Z,
			onChange: ft,
			sources: d,
			onSearchSources: p,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${P}-slide`
		})
	})] }) : /* @__PURE__ */ U(ht, {
		slide: Z,
		onChange: ft,
		sources: d,
		onSearchSources: p,
		showNotes: !1,
		testIdPrefix: `${P}-slide`
	}) }), zt = /* @__PURE__ */ W("div", {
		className: r("flex items-center justify-center gap-2", A && "ml-auto shrink-0"),
		"data-testid": `${P}-slide-nav`,
		children: [
			/* @__PURE__ */ U(f, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(Nt, { back: !0 }),
				disabled: X <= 0,
				onClick: () => bt(-1),
				"data-testid": `${P}-previous`
			}),
			/* @__PURE__ */ U(N, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${P}-position`,
				children: `Slide ${ze === 0 ? 0 : X + 1} of ${ze}`
			}),
			/* @__PURE__ */ U(f, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ U(Nt, {}),
				disabled: X >= ze - 1,
				onClick: () => bt(1),
				"data-testid": `${P}-next`
			}),
			/* @__PURE__ */ U(E, {
				value: Y.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${Y.length} / 40`,
				className: "ml-2",
				"data-testid": `${P}-slide-meter`
			})
		]
	}), Bt = /* @__PURE__ */ W("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${P}-body`,
		children: [/* @__PURE__ */ U(lt, {
			items: nt,
			selectedId: Z?.id ?? "",
			onSelect: rt,
			onMove: ot,
			onDuplicate: ct,
			onDelete: ut,
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
			testIdPrefix: `${P}-slide`
		}), /* @__PURE__ */ W("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${P}-main`,
			children: [
				/* @__PURE__ */ U("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${P}-stage-frame`,
					children: /* @__PURE__ */ U(_t, {
						generating: Je,
						label: Ue ? `Slide ${X + 1} of ${ze}: ${Ue}` : "No slide",
						"data-testid": `${P}-stage`,
						children: xt
					})
				}),
				!A && zt,
				Q && /* @__PURE__ */ U(N, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${P}-generated-note`,
					children: `${Q.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Z && /* @__PURE__ */ W("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ U(At, {
						value: Z.notes,
						onChange: (e) => ft({
							...Z,
							notes: e
						}),
						"data-testid": `${P}-slide-notes`
					}), Rt]
				})
			]
		})]
	}), Vt = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (A) {
		let e = /* @__PURE__ */ W("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", M),
			"data-testid": P,
			onKeyDown: Vt,
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${P}-deck-line`,
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
		className: r("relative flex h-full min-h-0 flex-col", M),
		"data-testid": P,
		onKeyDown: Vt,
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ W("div", {
					className: r("flex flex-wrap justify-between gap-2", G ? "items-center" : "items-end"),
					...G ? { "data-testid": `${P}-deck-line` } : {},
					children: [wt, Ct]
				}), /* @__PURE__ */ U("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Et
				})]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${P}-scroller`,
				children: [Dt, Bt]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${P}-dock-row`,
				children: /* @__PURE__ */ U(se.Provider, {
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
	let [o, s] = V(!1), [c, l] = V(""), u = Lt(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ W("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ U(d, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: Rt(e)
					}),
					e.summary && /* @__PURE__ */ U("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ U("span", { className: "flex-1" }),
					f && /* @__PURE__ */ W("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ U(S, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ U(d, {
						size: "xs",
						tone: "success",
						"data-testid": `${a}-applied`,
						children: "Applied"
					}),
					!m && /* @__PURE__ */ W("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							r && e.status === "ready" && /* @__PURE__ */ U(i, {
								size: "sm",
								variant: "ghost",
								"aria-expanded": o,
								onClick: () => s((e) => !e),
								"data-testid": `${a}-revise`,
								children: "Revise…"
							}),
							/* @__PURE__ */ U(i, {
								size: "sm",
								variant: "ghost",
								disabled: p,
								onClick: () => n(e.id),
								"data-testid": `${a}-discard`,
								children: f ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ U(i, {
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
			u && /* @__PURE__ */ U("p", {
				className: "m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary",
				"data-testid": `${a}-preview`,
				children: u
			}),
			o && r && /* @__PURE__ */ W("form", {
				className: "flex min-w-0 items-center gap-2",
				onSubmit: (t) => {
					t.preventDefault();
					let n = c.trim();
					!n || !r || (r(e.id, n), l(""), s(!1));
				},
				"data-testid": `${a}-revise-form`,
				children: [/* @__PURE__ */ U(y, {
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
				}), /* @__PURE__ */ U(i, {
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
	return /* @__PURE__ */ W("section", {
		"aria-label": m,
		"aria-live": "polite",
		className: r("flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm", l),
		"data-testid": u,
		children: [/* @__PURE__ */ W("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ U("span", {
					className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
					"data-testid": `${u}-title`,
					children: m
				}),
				s && p > 1 && /* @__PURE__ */ U(i, {
					size: "sm",
					variant: "ghost",
					onClick: s,
					"data-testid": `${u}-discard-all`,
					children: "Discard all"
				}),
				o && f > 1 && /* @__PURE__ */ U(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${u}-apply-all`,
					children: "Apply all"
				})
			]
		}), /* @__PURE__ */ U("ul", {
			className: "m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0",
			children: d.map((e) => /* @__PURE__ */ U(zt, {
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
export { Qe as A, Ye as B, Pe as C, He as D, Le as E, tt as F, K as G, Ne as H, qe as I, ve as J, q as K, et as L, $e as M, Je as N, Ue as O, Ze as P, Xe as R, Z as S, Re as T, J as U, Y as V, Oe as W, _e as X, ye as Y, ge as Z, Ie as _, At as a, ze as b, kt as c, ht as d, dt as f, Fe as g, We as h, Ft as i, Ke as j, $ as k, xt as l, ct as m, Rt as n, bt as o, lt as p, xe as q, Lt as r, vt as s, Bt as t, _t as u, Ve as v, Q as w, Be as x, X as y, Ge as z };
