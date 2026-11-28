import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { f as r, n as i, s as a } from "./Button-DwPf_9pb.js";
import { t as o } from "./Chip-DVGdTxaN.js";
import { t as s } from "./Stack-BPtkNzDm.js";
import { n as c } from "./Text-DyujO08i.js";
import { a as l, i as u, n as d, o as f, r as p, t as m } from "./Table-9_YsTOuH.js";
import { t as h } from "./IconButton-BmDqeC-b.js";
import { m as g, ot as _ } from "./Icons-DX0dqgD-.js";
import { c as v, o as y } from "./ErrorBoundary-CMvKQGTs.js";
import { n as b } from "./Badge-DpARmDnp.js";
import { t as x } from "./Modal-CEcJQMxG.js";
import { t as S } from "./Input-B5h9UXBs.js";
import { t as C } from "./Select-nxx_K9gv.js";
import { t as w } from "./Tooltip-BaCci7O5.js";
import { t as T } from "./FormField-BwYLyidS.js";
import { t as E } from "./SearchInput-CPnuBA94.js";
import { t as D } from "./DropdownMenu-BhfFj91k.js";
import { t as ee } from "./EmptyState-BUeW7XOr.js";
import { t as te } from "./ErrorState-Cfh63LhO.js";
import { t as ne } from "./LoadingState-D19sK4DN.js";
import { t as O } from "./SegmentedControl-CKdSbD8t.js";
import { t as re } from "./StatusPill-DrTq5Ki4.js";
import { n as k } from "./Tabs-ChyOmBFc.js";
import { t as ie } from "./SkeletonCard-DBVy8trP.js";
import { t as A } from "./Textarea-MJCZpfkl.js";
import { t as j } from "./DotMeter-B7TMlYNN.js";
import { t as M } from "./StatusDot-BE5sqjcB.js";
import { n as N } from "./RovingToolbar-CaWm5s1M.js";
import { t as ae } from "./InlineAlert-DoLPfet9.js";
import { t as oe } from "./ThinkingDots-CL7iPQV1.js";
import { t as P } from "./PresenceAvatars-g_VszLJh.js";
import { t as se } from "./useMeasuredWidth-Ba1Q33KU.js";
import { t as F } from "./SectionLabel-BVXGq_WP.js";
import { G as ce, U as le } from "./renderers-CHFmP6SP.js";
import { a as I } from "./composerSendError-BajHkkpC.js";
import { t as ue } from "./InlineEditableText-B_sH74Yd.js";
import { i as de, t as fe } from "./FloatingComposerDock-DWGsFjIv.js";
import { Suspense as pe, lazy as me, useCallback as L, useEffect as R, useId as he, useImperativeHandle as ge, useMemo as _e, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var W = /* @__PURE__ */ new Set(["diagram", "presentation"]), ve = [
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
], ye = [
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
function be(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function xe(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function Se(t) {
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
function Ce({ open: e, onClose: i, onCreate: a, onCreateFromFixture: s, onSearchDocuments: c, recordings: l, initialShape: u }) {
	let [d, f] = B([]), [p, m] = B(!1), [h, g] = B(null), [_, y] = B(null), [b, w] = B(""), [T, E] = B(""), [D, ee] = B(!1), [te, ne] = B(""), [O, re] = B("page"), [k, ie] = B("blank"), [j, M] = B(""), [N, ae] = B(""), [oe, P] = B([]), se = z(null), F = z(null), I = he(), ue = `${I}-blank-label`, de = `${I}-type-label`, fe = `${I}-cookbook-label`, pe = `${I}-title`, me = `${I}-description`, L = `${I}-deck-from`, ge = `${I}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		f(r), g(null), y(null), w(""), E(""), ee(!1), ne(""), re(u ?? "page"), ie("blank"), M(""), ae(""), P([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), g((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => se.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let Ce = _e(() => ve.filter((e) => be(e, b)), [b]), we = _e(() => d.filter((e) => xe(e, b)), [d, b]), Te = _e(() => le.filter((e) => ce(e, b)), [b]);
	if (R(() => {
		if (!e || O !== "presentation") return;
		if (k === "blank") {
			P([]);
			return;
		}
		let t = N.trim().toLowerCase();
		if (k === "transcript") {
			let e = l ?? [];
			P(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!c) {
			P([]);
			return;
		}
		let n = !1;
		return Promise.resolve(c(N.trim())).then((e) => {
			n || P(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		k,
		N,
		l,
		c
	]), !e) return null;
	let Ee = d.find((e) => e.id === h), De = _ ? le.find((e) => e.id === _) : void 0, Oe = O === "sections", ke = !!De || !!Ee, Ae = d.length === 0 && !p && !De, je = Ce.length === 0 && we.length === 0 && Te.length === 0, Me = De ? {
		kind: "cookbook",
		cookbook: De
	} : Ee && !W.has(O) ? {
		kind: "type",
		type: Ee
	} : {
		kind: "blank",
		shape: O
	}, G = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), W.has(O) && re("page"), D || E(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			re(e.shape), W.has(e.shape) && (y(null), D || E(""));
			return;
		}
		y(null), g(e.type.id), D || E("");
	}, Ne = (e) => e.kind === "blank" ? e.shape : W.has(O) ? "page" : O, Pe = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let o = te.trim() || void 0;
		if (n === "presentation") {
			s ? s({
				from: k,
				...k !== "blank" && j ? { sourceId: j } : {},
				title: r,
				...o ? { description: o } : {}
			}) : a({
				title: r,
				type: "Presentation",
				description: o,
				icon: "📊",
				shape: "presentation"
			}), i();
			return;
		}
		if (e.kind === "cookbook") {
			let t = Se(e.cookbook);
			a({
				title: r,
				type: t.name,
				description: o,
				icon: t.icon,
				documentTypeId: t.id,
				shape: n
			});
		} else e.kind === "type" && n !== "diagram" ? a({
			title: r,
			type: e.type.name,
			description: o,
			icon: e.type.icon,
			documentTypeId: e.type.id,
			shape: n
		}) : a({
			title: r,
			type: n === "diagram" ? "Diagram" : "Document",
			description: o,
			icon: n === "diagram" ? "🖉" : "📄",
			shape: n
		});
		i();
	}, Fe = O === "presentation" && k !== "blank" && !j, Ie = !!T.trim() && (!Oe || ke) && !Fe, Le = () => {
		Ie && Pe(Me, T, Ne(Me));
	};
	return /* @__PURE__ */ H(x, {
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
		children: /* @__PURE__ */ U("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && Ie && Le();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ H("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ U("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ H(S, {
						ref: se,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => w(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = Te.length > 0 && b.trim() ? {
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
							G(t);
							let n = T.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								F.current?.focus();
								return;
							}
							Pe(t, n, Ne(t));
						}
					}), /* @__PURE__ */ H("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ U("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						Ce.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ H("div", {
								id: ue,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": ue,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: Ce.map((e) => /* @__PURE__ */ U(v, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => G({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ U("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ H("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ H("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ H(o, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ H("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ H("label", {
									htmlFor: L,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ H(C, {
									id: L,
									value: k,
									options: ye.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ie(e.target.value), M(""), ae("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ H("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: k === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								k !== "blank" && /* @__PURE__ */ U("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ H(S, {
										type: "search",
										value: N,
										onChange: (e) => ae(e.target.value),
										"aria-label": k === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: k === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), oe.length === 0 ? /* @__PURE__ */ H("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: k === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : c ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("label", {
										htmlFor: ge,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											k === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ H("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ H(C, {
										id: ge,
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
						Te.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ U("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ H("div", {
									id: fe,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ H("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": fe,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: Te.map((e) => {
									let t = _ === e.id;
									return /* @__PURE__ */ U(v, {
										padding: "md",
										selected: t,
										onSelect: () => G({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ U("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ H("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ H("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ H("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ H("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!W.has(O) && (we.length > 0 || Ae || d.length === 0 && p) && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ U("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ H("span", {
										id: de,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Oe && /* @__PURE__ */ H("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								d.length === 0 && p && /* @__PURE__ */ H("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Ae && /* @__PURE__ */ H("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Oe ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								we.length > 0 && /* @__PURE__ */ H("div", {
									role: "group",
									"aria-labelledby": de,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: we.map((e) => {
										let t = !De && h === e.id;
										return /* @__PURE__ */ U("button", {
											"data-ui-part": "",
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => G({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ H("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ U("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ H("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ H("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ H("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ H("span", {
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
						je && /* @__PURE__ */ U("div", {
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
				/* @__PURE__ */ U("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ U("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ U("label", {
							htmlFor: pe,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ H("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ H(S, {
							ref: F,
							id: pe,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: T,
							onChange: (e) => {
								E(e.target.value), ee(!0);
							},
							placeholder: De ? `e.g. ${De.name}` : Ee ? `e.g. Q2 ${Ee.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("label", {
						htmlFor: me,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ H("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ H(A, {
						id: me,
						"data-testid": "new-doc-description",
						value: te,
						onChange: (e) => ne(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ U("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ H("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-submit",
						onClick: Le,
						disabled: !Ie,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Ie ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var we = "__older-revisions__";
function Te(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: we,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: we,
		label: `Older versions (${t.count})…`
	}), n;
}
function Ee(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function De(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Oe(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || De(e.target)) return null;
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
function ke(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Ae = 5;
function je({ back: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Me({ title: e, subtitle: t, revisions: n, olderRevisions: o, revisionId: s, onRevisionChange: l, slideIndex: u, onSlideChange: d, onDownload: f, downloadLabel: p = "Download .pptx", onOpenPreview: m, pending: g, notice: _, state: v = "ready", errorMessage: b, ownerName: x, onRetry: S, maxSlideWidth: w, autoFocus: T = !1, className: E, "data-testid": D = "presentation-view" }) {
	let k = he(), ie = z(null), A = z(!1);
	if (R(() => {
		!T || A.current || !ie.current || (A.current = !0, ie.current.focus({ preventScroll: !0 }));
	}), v === "loading") return /* @__PURE__ */ H(ne, {
		label: "Opening the presentation…",
		testId: `${D}-loading`
	});
	if (v === "no-access") return /* @__PURE__ */ H(y, {
		resource: "this presentation",
		ownerName: x ?? null,
		testId: `${D}-no-access`
	});
	if (v === "error") return /* @__PURE__ */ H(te, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...S ? {
			actionLabel: "Try again",
			onAction: S
		} : {},
		testId: `${D}-error`
	});
	let j = n.find((e) => e.id === s) ?? n[0], M = j?.slides ?? [];
	if (v === "empty" || !j || M.length === 0) return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", E),
		"data-testid": D,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ H(c, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ H(c, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${D}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ H(ee, {
			title: "No slides yet",
			description: g?.status === "generating" ? `${g.label} is still being generated.` : g?.status === "failed" ? g.message ?? `${g.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${D}-empty`
		})]
	});
	let N = M[Math.min(Math.max(u, 1), M.length) - 1];
	return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", E),
		ref: ie,
		"data-testid": D,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${N.index} of ${M.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Oe(e);
			if (!t) return;
			e.preventDefault();
			let n = ke(t, N.index, M.length);
			n !== N.index && d(n);
		},
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ H(c, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${D}-title`,
						children: e
					}), t && /* @__PURE__ */ H(c, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${D}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Ae || (o?.count ?? 0) > 0 ? /* @__PURE__ */ H(C, {
							"aria-label": "Revision",
							size: "sm",
							value: j.id,
							onChange: (e) => Ee(e.target.value, l, o),
							options: Te(n, o),
							className: "w-auto",
							"data-testid": `${D}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ H(a, {
							density: "compact",
							children: /* @__PURE__ */ H(O, {
								"aria-label": "Revision",
								value: j.id,
								onChange: l,
								options: n.map((e) => ({
									label: e.label,
									value: e.id
								})),
								"data-testid": `${D}-revisions`
							})
						}),
						g && /* @__PURE__ */ H(re, {
							state: g.status === "failed" ? "error" : "pending",
							label: `${g.label} ${g.status}`,
							"data-testid": `${D}-pending`
						}),
						f && /* @__PURE__ */ H(i, {
							variant: "secondary",
							size: "sm",
							onClick: f,
							"data-testid": `${D}-download`,
							children: p
						})
					]
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ H("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ H("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: w === void 0 ? void 0 : { maxWidth: w },
							"data-testid": `${D}-stage`,
							children: N.preview ?? /* @__PURE__ */ H(c, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${D}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ U("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ H(h, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(je, { back: !0 }),
								disabled: N.index <= 1,
								onClick: () => d(N.index - 1),
								"data-testid": `${D}-previous`
							}),
							/* @__PURE__ */ H(c, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${D}-position`,
								children: `Slide ${N.index} of ${M.length}`
							}),
							/* @__PURE__ */ H(h, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(je, {}),
								disabled: N.index >= M.length,
								onClick: () => d(N.index + 1),
								"data-testid": `${D}-next`
							}),
							m && N.preview && /* @__PURE__ */ H(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => m(N.id),
								"data-testid": `${D}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ U("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${D}-outline`,
					children: [/* @__PURE__ */ H(F, {
						as: "div",
						className: "mb-1",
						"data-testid": `${D}-outline-label`,
						children: /* @__PURE__ */ H("span", {
							id: k,
							children: "Slides"
						})
					}), /* @__PURE__ */ H("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: M.map((e) => /* @__PURE__ */ H("li", { children: /* @__PURE__ */ U("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => d(e.index),
							"aria-current": e.id === N.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === N.id && "bg-surface-hover font-medium"),
							"data-testid": `${D}-outline-row`,
							children: [/* @__PURE__ */ H("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ H("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			_ && /* @__PURE__ */ H(c, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${D}-notice`,
				children: _
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function G(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Ne(e) {
	return `${e.length === 1 ? "Slide finding" : `${e.length} slide findings`}: ${e.map((e) => e.label).join("; ")}`;
}
function Pe() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Fe() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ie() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ H("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ H("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Le() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Re({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: l = !1, onSelect: u, onMove: d, onDuplicate: f, onDelete: p, canDuplicate: m, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = G(i);
	return /* @__PURE__ */ U("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!l && (_ ?? /* @__PURE__ */ H("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ U("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => u(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ H("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ H("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ H("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ H(c, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ U("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ H(c, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ H(c, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ H(c, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ H(c, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!l && /* @__PURE__ */ U("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ U("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ H(h, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Pe, {}),
						disabled: t === 0,
						onClick: () => d(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ H(h, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Fe, {}),
						disabled: t >= n - 1,
						onClick: () => d(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ U("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ H(h, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Ie, {}),
						disabled: !m,
						onClick: () => f(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ H(h, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Le, {}),
						disabled: !g,
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
function ze({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Re, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ H("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ H(l, {
			slide: r.slide,
			index: u,
			total: e.length,
			thumbnailSvg: r.thumbnailSvg,
			selected: r.slide.id === t,
			uncited: r.uncited,
			changed: r.changed,
			generating: r.generating,
			viewers: r.viewers,
			...r.findings?.length ? { findings: r.findings } : {},
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
var Be = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ve = 40, He = 8, Ue = 200, We = 120, Ge = 200, Ke = 60, qe = 2e3, Je = 24, Ye = 6, Xe = 400, Ze = 10, Qe = 6, $e = 2, K = 4, et = 12, tt = 60, nt = 24, rt = 8, it = 5, at = 40, ot = 5, q = 120, st = 40, ct = 140, lt = 3, ut = 6, dt = 16, ft = 40, pt = 80, mt = 6, J = 80, Y = 100, ht = 3, gt = 120, _t = 100, vt = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, yt = [
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image",
	"key-figures",
	"table",
	"comparison",
	"timeline",
	"agenda",
	"closing"
], bt = {
	title: "Title",
	section: "Section divider",
	bullets: "Bullets",
	"two-column": "Two columns",
	chart: "Chart",
	quote: "Quote",
	image: "Image",
	"key-figures": "Key figures",
	table: "Table",
	comparison: "Comparison",
	timeline: "Timeline",
	agenda: "Agenda",
	closing: "Closing"
}, xt = {
	title: "The opening slide: the deck title and who it is for.",
	section: "A divider that names the next part of the talk.",
	bullets: "A short list of points under one heading.",
	"two-column": "Two lists side by side.",
	chart: "Numbers over time or across groups, as bars, lines, stacked bars or a pie.",
	quote: "One attributed quotation, large.",
	image: "A picture with its caption.",
	"key-figures": "Two to four headline numbers, each with a label and an optional change.",
	table: "A small grid of short text: up to 8 rows by 5 columns.",
	comparison: "Two options weighed side by side, and the line that settles it.",
	timeline: "Three to six dated steps, in order.",
	agenda: "What the talk covers, with the current part marked.",
	closing: "The last word: a closing line, next steps and who to contact."
}, St = [
	"bar",
	"line",
	"stacked-bar",
	"pie"
], Ct = {
	bar: "Bar",
	line: "Line",
	"stacked-bar": "Stacked bar",
	pie: "Pie"
}, wt = [
	"product",
	"engineering",
	"plain"
];
function Tt(e) {
	return !!e && typeof e == "object" && typeof e.ref == "string";
}
function Et(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function Dt(e) {
	return e.slides.length > 0 && Et(e).length === 0;
}
function Ot(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function kt(e, t = "bullets") {
	return At({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function At(e, t) {
	let n = {
		...e,
		layout: t
	};
	if (t === "bullets" && !n.bullets && (n.bullets = [""]), t === "two-column" && !n.columns && (n.columns = [[""], [""]]), t === "chart" && !n.chart && (n.chart = {
		kind: "bar",
		labels: ["Q1", "Q2"],
		series: [{
			name: "Series 1",
			values: [0, 0]
		}]
	}), t === "quote" && !n.quote && (n.quote = {
		text: "",
		by: ""
	}), t === "image" && !n.image && (n.image = { alt: "" }), t === "key-figures" && !n.figures && (n.figures = [{
		value: "",
		label: ""
	}, {
		value: "",
		label: ""
	}]), t === "table" && !n.table && (n.table = {
		header: ["", ""],
		rows: [["", ""]]
	}), t === "comparison" && !n.comparison) {
		let [e, t] = n.columns ?? [[""], [""]];
		n.comparison = {
			left: {
				title: "",
				points: e.length ? e.slice(0, 5) : [""]
			},
			right: {
				title: "",
				points: t.length ? t.slice(0, 5) : [""]
			}
		};
	}
	return t === "timeline" && !n.timeline && (n.timeline = [
		{
			date: "",
			label: ""
		},
		{
			date: "",
			label: ""
		},
		{
			date: "",
			label: ""
		}
	]), t === "agenda" && !n.agenda && (n.agenda = { items: [""] }), t === "closing" && !n.closing && (n.closing = { line: "" }), n;
}
var jt = {
	title: null,
	section: null,
	bullets: null,
	"two-column": "columns",
	chart: "chart",
	quote: "quote",
	image: "image",
	"key-figures": "figures",
	table: "table",
	comparison: "comparison",
	timeline: "timeline",
	agenda: "agenda",
	closing: "closing"
}, Mt = Object.values(jt).filter((e) => e !== null);
function Nt(e) {
	let t = jt[e.layout], n = Mt.filter((n) => n !== t && e[n] !== void 0);
	if (!n.length) return e;
	let r = { ...e };
	for (let e of n) delete r[e];
	return r;
}
function Pt(e) {
	let t = !1, n = e.slides.map((e) => {
		let n = Nt(e);
		return n !== e && (t = !0), n;
	});
	return t ? {
		...e,
		slides: n
	} : e;
}
function Ft(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function It(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Lt(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = kt(Ot(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Rt(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Ot(e),
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
		figures: r.figures ? r.figures.map((e) => ({ ...e })) : void 0,
		table: r.table ? {
			header: r.table.header.slice(),
			rows: r.table.rows.map((e) => e.slice())
		} : void 0,
		comparison: r.comparison ? {
			left: {
				title: r.comparison.left.title,
				points: r.comparison.left.points.slice()
			},
			right: {
				title: r.comparison.right.title,
				points: r.comparison.right.points.slice()
			},
			...r.comparison.verdict === void 0 ? {} : { verdict: r.comparison.verdict }
		} : void 0,
		timeline: r.timeline ? r.timeline.map((e) => ({ ...e })) : void 0,
		agenda: r.agenda ? {
			...r.agenda,
			items: r.agenda.items.slice()
		} : void 0,
		closing: r.closing ? {
			...r.closing,
			...r.closing.nextSteps ? { nextSteps: r.closing.nextSteps.slice() } : {}
		} : void 0,
		sources: r.sources.map((e) => ({ ...e }))
	};
	for (let e of Object.keys(i)) i[e] === void 0 && delete i[e];
	let a = e.slides.slice();
	return a.splice(n + 1, 0, i), {
		...e,
		slides: a
	};
}
function zt(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function Bt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
var Vt = /* @__PURE__ */ new Set([
	"product",
	"engineering",
	"plain"
]), Ht = /* @__PURE__ */ new Set([
	"title",
	"section",
	"bullets",
	"two-column",
	"chart",
	"quote",
	"image",
	"key-figures",
	"table",
	"comparison",
	"timeline",
	"agenda",
	"closing"
]), Ut = /* @__PURE__ */ new Set([
	"title",
	"subtitle",
	"theme",
	"slides"
]), Wt = /* @__PURE__ */ new Set([
	"id",
	"layout",
	"title",
	"eyebrow",
	"bullets",
	"columns",
	"chart",
	"quote",
	"image",
	"figures",
	"table",
	"comparison",
	"timeline",
	"agenda",
	"closing",
	"notes",
	"sources"
]), Gt = /* @__PURE__ */ new Set(["ref"]), Kt = /* @__PURE__ */ new Set([
	"documentId",
	"anchor",
	"title"
]), qt = /* @__PURE__ */ new Set([
	"kind",
	"labels",
	"series"
]), Jt = /* @__PURE__ */ new Set([
	"bar",
	"line",
	"stacked-bar",
	"pie"
]), Yt = /* @__PURE__ */ new Set(["name", "values"]), Xt = /* @__PURE__ */ new Set(["text", "by"]), Zt = /* @__PURE__ */ new Set(["alt"]), Qt = /* @__PURE__ */ new Set([
	"value",
	"label",
	"delta"
]), $t = /* @__PURE__ */ new Set(["header", "rows"]), en = /* @__PURE__ */ new Set([
	"left",
	"right",
	"verdict"
]), tn = /* @__PURE__ */ new Set(["title", "points"]), nn = /* @__PURE__ */ new Set([
	"date",
	"label",
	"detail"
]), rn = /* @__PURE__ */ new Set(["items", "current"]), an = /* @__PURE__ */ new Set([
	"line",
	"nextSteps",
	"contact"
]);
function X(e) {
	return !!e && typeof e == "object" && !Array.isArray(e);
}
function Z(e) {
	if (typeof e == "string") return e.replace(/\s+/g, " ").trim() || void 0;
}
function on(e) {
	if (typeof e == "string") return e.replace(/[ \t]+$/gm, "").trim() || void 0;
}
function Q(e, t) {
	return Object.keys(e).filter((n) => !t.has(n) && e[n] !== void 0);
}
function sn(e) {
	let t = [];
	if (!X(e)) return {
		ok: !1,
		errors: ["deck: expected an object"]
	};
	for (let n of Q(e, Ut)) t.push(`deck: unknown field '${n}'`);
	let n = Z(e.title);
	n ? n.length > 120 && t.push("deck.title: longer than 120 characters") : t.push("deck.title: required");
	let r = Z(e.subtitle);
	e.subtitle !== void 0 && !r && t.push("deck.subtitle: must be a non-empty string when present"), r && r.length > 200 && t.push("deck.subtitle: longer than 200 characters");
	let i;
	if (e.theme !== void 0 && (i = cn(e.theme, t)), !Array.isArray(e.slides) || e.slides.length === 0) return t.push("deck.slides: at least one slide is required"), {
		ok: !1,
		errors: t
	};
	e.slides.length > 40 && t.push(`deck.slides: ${e.slides.length} slides, the cap is 40`);
	let a = [], o = /* @__PURE__ */ new Set();
	return e.slides.slice(0, 40).forEach((e, n) => {
		let r = ln(e, n, o, t);
		r && a.push(r);
	}), t.length ? {
		ok: !1,
		errors: t
	} : {
		ok: !0,
		spec: {
			title: n,
			...r ? { subtitle: r } : {},
			...i ? { theme: i } : {},
			slides: a
		}
	};
}
function cn(e, t) {
	let n = "deck.theme: must be 'product', 'engineering', 'plain' or { ref: '<theme id>' } naming a theme you were given";
	if (typeof e == "string") {
		if (Vt.has(e)) return e;
		t.push(n);
		return;
	}
	if (!X(e)) {
		t.push(n);
		return;
	}
	let r = Q(e, Gt);
	if (r.length) {
		t.push(`deck.theme: a deck names its theme and never describes it; only { ref } is accepted, not ${r.map((e) => `'${e}'`).join(", ")}`);
		return;
	}
	let i = typeof e.ref == "string" ? e.ref.trim() : "";
	if (!Be.test(i)) {
		t.push(`deck.theme.ref: must match ${Be} (a theme id you were given)`);
		return;
	}
	return { ref: i };
}
function ln(e, t, n, r) {
	let i = `slides[${t}]`;
	if (!X(e)) return r.push(`${i}: expected an object`), null;
	for (let t of Q(e, Wt)) r.push(`${i}: unknown field '${t}'`);
	let a = typeof e.id == "string" ? e.id.trim() : "";
	vt.test(a) ? n.has(a) ? r.push(`${i}.id: '${a}' is used twice`) : n.add(a) : r.push(`${i}.id: must match ${vt} (letters, digits, '_' and '-')`);
	let o = typeof e.layout == "string" ? e.layout : "";
	Ht.has(o) || r.push(`${i}.layout: must be one of ${[...Ht].join(", ")}`);
	let s = Z(e.title);
	s ? s.length > 120 && r.push(`${i}.title: longer than 120 characters`) : r.push(`${i}.title: required`);
	let c = Z(e.eyebrow);
	e.eyebrow !== void 0 && !c && r.push(`${i}.eyebrow: must be a non-empty string when present`), c && c.length > 60 && r.push(`${i}.eyebrow: longer than 60 characters`);
	let l = on(e.notes);
	l && l.length > 2e3 && r.push(`${i}.notes: longer than ${qe} characters`);
	let u = e.bullets === void 0 ? void 0 : un(e.bullets, `${i}.bullets`, r), d = e.columns === void 0 ? void 0 : dn(e.columns, i, r), f = e.chart === void 0 ? void 0 : fn(e.chart, `${i}.chart`, r), p = e.quote === void 0 ? void 0 : pn(e.quote, `${i}.quote`, r), m = e.image === void 0 ? void 0 : mn(e.image, `${i}.image`, r), h = e.figures === void 0 ? void 0 : gn(e.figures, `${i}.figures`, r), g = e.table === void 0 ? void 0 : _n(e.table, `${i}.table`, r), _ = e.comparison === void 0 ? void 0 : vn(e.comparison, `${i}.comparison`, r), v = e.timeline === void 0 ? void 0 : yn(e.timeline, `${i}.timeline`, r), y = e.agenda === void 0 ? void 0 : bn(e.agenda, `${i}.agenda`, r), b = e.closing === void 0 ? void 0 : xn(e.closing, `${i}.closing`, r);
	o === "bullets" && !u?.length && r.push(`${i}: a 'bullets' slide needs at least one bullet`), o === "two-column" && !d && r.push(`${i}: a 'two-column' slide needs columns`), o === "chart" && !f && r.push(`${i}: a 'chart' slide needs a chart`), o === "quote" && !p && r.push(`${i}: a 'quote' slide needs a quote`), o === "image" && !m && r.push(`${i}: an 'image' slide needs image.alt`), d && o !== "two-column" && r.push(`${i}.columns: only a 'two-column' slide may carry columns`), f && o !== "chart" && r.push(`${i}.chart: only a 'chart' slide may carry a chart`), p && o !== "quote" && r.push(`${i}.quote: only a 'quote' slide may carry a quote`), m && o !== "image" && r.push(`${i}.image: only an 'image' slide may carry an image`);
	let x = [
		[
			h,
			"key-figures",
			"figures"
		],
		[
			g,
			"table",
			"table"
		],
		[
			_,
			"comparison",
			"comparison"
		],
		[
			v,
			"timeline",
			"timeline"
		],
		[
			y,
			"agenda",
			"agenda"
		],
		[
			b,
			"closing",
			"closing"
		]
	];
	for (let [t, n, a] of x) o === n && !t && e[a] === void 0 && r.push(`${i}: a '${n}' slide needs ${a}`), t && o !== n && r.push(`${i}.${a}: only a '${n}' slide may carry ${a}`);
	o === "chart" && f && f.kind === "pie" && f.series.length !== 1 && r.push(`${i}.chart.series: a pie takes exactly one series`), o === "chart" && f && f.kind === "pie" && f.labels.length > 6 && r.push(`${i}.chart.labels: a pie takes at most 6 slices`);
	let S = Sn(e.sources, i, r);
	return !a || !s || !Ht.has(o) ? null : {
		id: a,
		layout: o,
		title: s,
		...c ? { eyebrow: c } : {},
		...u?.length ? { bullets: u } : {},
		...d ? { columns: d } : {},
		...f ? { chart: f } : {},
		...p ? { quote: p } : {},
		...m ? { image: m } : {},
		...h ? { figures: h } : {},
		...g ? { table: g } : {},
		..._ ? { comparison: _ } : {},
		...v ? { timeline: v } : {},
		...y ? { agenda: y } : {},
		...b ? { closing: b } : {},
		...l ? { notes: l } : {},
		sources: S
	};
}
function un(e, t, n) {
	if (!Array.isArray(e)) return n.push(`${t}: expected an array of strings`), [];
	e.length > 8 && n.push(`${t}: ${e.length} bullets, the cap is 8`);
	let r = [];
	return e.slice(0, 8).forEach((e, i) => {
		let a = Z(e);
		if (!a) {
			n.push(`${t}[${i}]: must be a non-empty string`);
			return;
		}
		if (a.length > 200) {
			n.push(`${t}[${i}]: longer than 200 characters`);
			return;
		}
		r.push(a);
	}), r;
}
function dn(e, t, n) {
	if (!Array.isArray(e) || e.length !== 2) {
		n.push(`${t}.columns: expected exactly two arrays of bullets`);
		return;
	}
	let r = un(e[0], `${t}.columns[0]`, n), i = un(e[1], `${t}.columns[1]`, n);
	if (!r.length && !i.length) {
		n.push(`${t}.columns: both columns are empty`);
		return;
	}
	return [r, i];
}
function fn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Q(e, qt)) n.push(`${t}: unknown field '${r}'`);
	let r = typeof e.kind == "string" && Jt.has(e.kind) ? e.kind : void 0;
	r || n.push(`${t}.kind: must be 'bar', 'line', 'stacked-bar' or 'pie'`);
	let i = [];
	!Array.isArray(e.labels) || e.labels.length === 0 ? n.push(`${t}.labels: at least one label is required`) : (e.labels.length > 24 && n.push(`${t}.labels: ${e.labels.length} labels, the cap is 24`), e.labels.slice(0, 24).forEach((e, r) => {
		let a = Z(e);
		if (!a) {
			n.push(`${t}.labels[${r}]: must be a non-empty string`);
			return;
		}
		i.push(a.slice(0, 40));
	}));
	let a = [];
	if (!Array.isArray(e.series) || e.series.length === 0 ? n.push(`${t}.series: at least one series is required`) : (e.series.length > 6 && n.push(`${t}.series: ${e.series.length} series, the cap is 6`), e.series.slice(0, 6).forEach((e, o) => {
		let s = `${t}.series[${o}]`;
		if (!X(e)) {
			n.push(`${s}: expected an object`);
			return;
		}
		for (let t of Q(e, Yt)) n.push(`${s}: unknown field '${t}'`);
		let c = Z(e.name);
		if (!c) {
			n.push(`${s}.name: required`);
			return;
		}
		if (!Array.isArray(e.values) || e.values.some((e) => typeof e != "number" || !Number.isFinite(e))) {
			n.push(`${s}.values: expected finite numbers`);
			return;
		}
		if (e.values.length !== i.length) {
			n.push(`${s}.values: ${e.values.length} values for ${i.length} labels`);
			return;
		}
		if (r === "pie" && e.values.some((e) => e < 0)) {
			n.push(`${s}.values: a pie's values must be 0 or more`);
			return;
		}
		if (r === "pie" && !e.values.some((e) => e > 0)) {
			n.push(`${s}.values: a pie needs at least one value above 0`);
			return;
		}
		a.push({
			name: c.slice(0, 40),
			values: e.values
		});
	})), !(!r || !i.length || !a.length)) return {
		kind: r,
		labels: i,
		series: a
	};
}
function pn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Q(e, Xt)) n.push(`${t}: unknown field '${r}'`);
	let r = Z(e.text), i = Z(e.by);
	if (r ? r.length > 400 && n.push(`${t}.text: longer than 400 characters`) : n.push(`${t}.text: required`), i || n.push(`${t}.by: required — an unattributed quote is not a source`), !(!r || !i)) return {
		text: r,
		by: i.slice(0, 80)
	};
}
function mn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Q(e, Zt)) n.push(`${t}: unknown field '${r}'`);
	let r = Z(e.alt);
	if (!r) {
		n.push(`${t}.alt: required`);
		return;
	}
	if (r.length > 200) {
		n.push(`${t}.alt: longer than 200 characters`);
		return;
	}
	return { alt: r };
}
function $(e, t, n, r, i = !0) {
	let a = Z(e);
	if (!(e === void 0 && !i)) {
		if (!a) {
			r.push(i ? `${t}: required` : `${t}: must be a non-empty string when present`);
			return;
		}
		if (a.length > n) {
			r.push(`${t}: longer than ${n} characters`);
			return;
		}
		return a;
	}
}
function hn(e, t, n, r, i, a) {
	if (!Array.isArray(e)) return a.push(`${t}: expected an array of strings`), [];
	e.length < n && a.push(`${t}: ${e.length} item${e.length === 1 ? "" : "s"}, at least ${n} needed`), e.length > r && a.push(`${t}: ${e.length} items, the cap is ${r}`);
	let o = [];
	return e.slice(0, r).forEach((e, n) => {
		let r = $(e, `${t}[${n}]`, i, a);
		r && o.push(r);
	}), o;
}
function gn(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { value, label, delta? }`);
		return;
	}
	(e.length < 2 || e.length > 4) && n.push(`${t}: ${e.length} figures, expected 2 to 4`);
	let r = [];
	return e.slice(0, 4).forEach((e, i) => {
		let a = `${t}[${i}]`;
		if (!X(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of Q(e, Qt)) n.push(`${a}: unknown field '${t}'`);
		let o = $(e.value, `${a}.value`, 12, n), s = $(e.label, `${a}.label`, 60, n), c = $(e.delta, `${a}.delta`, 24, n, !1);
		o && s && r.push({
			value: o,
			label: s,
			...c ? { delta: c } : {}
		});
	}), r.length >= 2 && r.length === e.length ? r : void 0;
}
function _n(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected { header, rows }`);
		return;
	}
	for (let r of Q(e, $t)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = hn(e.header, `${t}.header`, 1, 5, 40, n), a = [];
	return !Array.isArray(e.rows) || e.rows.length === 0 ? n.push(`${t}.rows: at least one row is required`) : (e.rows.length > 8 && n.push(`${t}.rows: ${e.rows.length} rows, the cap is 8`), e.rows.slice(0, 8).forEach((e, r) => {
		let o = `${t}.rows[${r}]`;
		if (!Array.isArray(e)) {
			n.push(`${o}: expected an array of strings`);
			return;
		}
		if (e.length !== i.length) {
			n.push(`${o}: ${e.length} cells for ${i.length} columns`);
			return;
		}
		let s = e.map((e, t) => e === "" ? "" : $(e, `${o}[${t}]`, 40, n) ?? "");
		a.push(s);
	})), n.length === r ? {
		header: i,
		rows: a
	} : void 0;
}
function vn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected { left, right, verdict? }`);
		return;
	}
	for (let r of Q(e, en)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = (e, t) => {
		if (!X(e)) {
			n.push(`${t}: expected { title, points }`);
			return;
		}
		for (let r of Q(e, tn)) n.push(`${t}: unknown field '${r}'`);
		let r = $(e.title, `${t}.title`, 40, n), i = hn(e.points, `${t}.points`, 1, 5, 120, n);
		return r ? {
			title: r,
			points: i
		} : void 0;
	}, a = i(e.left, `${t}.left`), o = i(e.right, `${t}.right`), s = $(e.verdict, `${t}.verdict`, 140, n, !1);
	if (!(n.length !== r || !a || !o)) return {
		left: a,
		right: o,
		...s ? { verdict: s } : {}
	};
}
function yn(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { date, label, detail? }`);
		return;
	}
	let r = n.length;
	(e.length < 3 || e.length > 6) && n.push(`${t}: ${e.length} steps, expected 3 to 6`);
	let i = [];
	return e.slice(0, 6).forEach((e, r) => {
		let a = `${t}[${r}]`;
		if (!X(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of Q(e, nn)) n.push(`${a}: unknown field '${t}'`);
		let o = $(e.date, `${a}.date`, 16, n), s = $(e.label, `${a}.label`, 40, n), c = $(e.detail, `${a}.detail`, 80, n, !1);
		o && s && i.push({
			date: o,
			label: s,
			...c ? { detail: c } : {}
		});
	}), n.length === r ? i : void 0;
}
function bn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected { items, current? }`);
		return;
	}
	for (let r of Q(e, rn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = hn(e.items, `${t}.items`, 1, 6, 80, n), a;
	return e.current !== void 0 && (typeof e.current != "number" || !Number.isInteger(e.current) || e.current < 0 || e.current >= i.length ? n.push(`${t}.current: must be the 0-based position of one of the ${i.length} items`) : a = e.current), n.length === r ? {
		items: i,
		...a === void 0 ? {} : { current: a }
	} : void 0;
}
function xn(e, t, n) {
	if (!X(e)) {
		n.push(`${t}: expected { line, nextSteps?, contact? }`);
		return;
	}
	for (let r of Q(e, an)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = $(e.line, `${t}.line`, 100, n), a = e.nextSteps === void 0 ? void 0 : hn(e.nextSteps, `${t}.nextSteps`, 1, 3, 120, n), o = $(e.contact, `${t}.contact`, 100, n, !1);
	if (!(n.length !== r || !i)) return {
		line: i,
		...a?.length ? { nextSteps: a } : {},
		...o ? { contact: o } : {}
	};
}
function Sn(e, t, n) {
	if (!Array.isArray(e) || e.length === 0) return n.push(`${t}.sources: every slide must cite at least one source document`), [];
	e.length > 10 && n.push(`${t}.sources: ${e.length} sources, the cap is 10`);
	let r = [];
	return e.slice(0, 10).forEach((e, i) => {
		let a = `${t}.sources[${i}]`;
		if (!X(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of Q(e, Kt)) n.push(`${a}: unknown field '${t}'`);
		let o = Z(e.documentId), s = Z(e.title), c = Z(e.anchor);
		if (!o) {
			n.push(`${a}.documentId: required`);
			return;
		}
		if (!s) {
			n.push(`${a}.title: required`);
			return;
		}
		r.push({
			documentId: o.slice(0, 200),
			...c ? { anchor: c.slice(0, 120) } : {},
			title: s.slice(0, 160)
		});
	}), r.length || n.push(`${t}.sources: no usable source survived validation`), r;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var Cn = me(() => import("./SortableSlideList-DDZNGs1f.js"));
function wn(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function Tn(e, t) {
	wn(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function En() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ H("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ H("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function Dn({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = G(e.thumbnailSvg), l = t + 1;
	return /* @__PURE__ */ U("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ H("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ H("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: l
			})
		}), /* @__PURE__ */ U("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ H("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${l}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ H("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ U("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ H(c, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ H(c, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ U("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ H(c, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ U(c, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ H(En, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ H("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ H(P, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function On() {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ H("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ H("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ H("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function kn({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: l = !1, viewers: u, findings: d, readOnly: f = !1, onSelect: p, onMove: m, onDuplicate: h, onDelete: g, canDuplicate: _, canDelete: v, dragHandle: y, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = G(i), T = t + 1, E = e.title || "Untitled slide", ee = he(), te = d?.length ? ee : void 0, ne = (t) => {
		if (!d?.length || !te) return t;
		let n = d.some((e) => e.tone === "warning"), r = Ne(d);
		return /* @__PURE__ */ H(w, {
			content: /* @__PURE__ */ H("span", {
				className: "flex flex-col gap-0.5",
				children: d.map((e, t) => /* @__PURE__ */ H(c, {
					as: "span",
					size: "xs",
					children: e.label
				}, t))
			}),
			triggerClassName: "relative block w-full",
			"data-testid": `${S}-findings-tip-${e.id}`,
			children: /* @__PURE__ */ U("span", {
				className: "relative block w-full",
				children: [t, /* @__PURE__ */ H("span", {
					id: te,
					role: "img",
					"aria-label": r,
					"data-tone": n ? "warning" : "info",
					"data-testid": `${S}-findings-${e.id}`,
					className: "pointer-events-none absolute bottom-1 left-1 inline-flex rounded-full bg-surface/90 p-0.5",
					children: /* @__PURE__ */ H(M, {
						size: "sm",
						color: n ? "var(--color-warning)" : "var(--color-info)"
					})
				})]
			})
		});
	}, O = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => m(t, t - 1),
			"data-testid": `${S}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => m(t, t + 1),
			"data-testid": `${S}-down-${e.id}`
		}] : [],
		..._ ? [{
			label: "Duplicate",
			onSelect: () => h(e.id),
			"data-testid": `${S}-duplicate-${e.id}`
		}] : [],
		...v ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => g(e.id),
			"data-testid": `${S}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ U("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": l ? "true" : void 0,
		"aria-busy": l || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ U("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: T
			}), !f && y && /* @__PURE__ */ H("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: y
			})]
		}), /* @__PURE__ */ U("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				ne(/* @__PURE__ */ U("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => p(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${T}: ${E}`,
					...te ? { "aria-describedby": te } : {},
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ H("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", l && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ U("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ H(c, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: E
						}), /* @__PURE__ */ H(c, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: bt[e.layout]
						})]
					}), l && /* @__PURE__ */ H("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ H(c, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				})),
				/* @__PURE__ */ U("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ H(c, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: E
						}) : /* @__PURE__ */ H("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !l && /* @__PURE__ */ H(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ H(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				u && u.length > 0 && /* @__PURE__ */ H("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${u.map((e) => e.name).join(", ")} ${u.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ H(P, {
						users: [...u],
						maxVisible: 2,
						size: 16
					})
				}),
				!f && O.length > 0 && /* @__PURE__ */ H("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ H(D, {
						trigger: /* @__PURE__ */ H(On, {}),
						triggerLabel: `Slide ${T} actions`,
						triggerTitle: "Slide actions",
						triggerClassName: "h-auto bg-surface/90 px-1 py-0.5",
						triggerTestId: `${S}-menu-${e.id}`,
						align: "end",
						sections: [{ items: O }],
						"data-testid": `${S}-menu-panel-${e.id}`
					})
				})
			]
		})]
	});
}
function An({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: l, canAdd: u = !0, generatingSlideIds: d, generatedItems: f, slideViewers: p, readOnly: m = !1, className: h, testIdPrefix: g = "filmstrip" }) {
	let v = z(null), y = _e(() => new Set(d ?? []), [d]), b = _e(() => e.map((e) => {
		let t = p?.[e.slide.id];
		return !y.has(e.slide.id) && !t?.length ? e : {
			...e,
			...y.has(e.slide.id) ? { generating: !0 } : {},
			...t?.length ? { viewers: t } : {}
		};
	}), [
		e,
		y,
		p
	]), x = _e(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	R(() => {
		wn(v.current, t)?.scrollIntoView?.({ block: "nearest" });
	}, [t]);
	let S = f ?? [], C = [...e.map((e) => e.slide.id), ...S.map((e) => e.id)], w = (r) => {
		if (r.key !== "ArrowUp" && r.key !== "ArrowDown" || !r.target.hasAttribute("data-filmstrip-select")) return;
		let i = C.indexOf(t);
		if (i === -1) return;
		let o = i + (r.key === "ArrowUp" ? -1 : 1);
		if (o < 0 || o >= C.length) return;
		r.preventDefault();
		let s = C[i];
		if (r.altKey) {
			if (m || i >= e.length || o >= e.length) return;
			a(i, o), requestAnimationFrame(() => Tn(v.current, s));
			return;
		}
		let c = C[o];
		n(c), Tn(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: u,
		rowComponent: kn,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ U("div", {
		ref: v,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", h),
		"data-testid": `${g}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ H(pe, {
				fallback: /* @__PURE__ */ H(ze, { ...T }),
				children: H(m ? ze : Cn, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ U("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ H("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ H("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ H(c, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ H("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ H(Dn, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...p?.[r.id]?.length ? { viewers: p[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			l && !m && /* @__PURE__ */ U("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ H("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ H(i, {
					variant: "secondary",
					size: "sm",
					disabled: !u,
					onClick: l,
					className: "min-w-0 flex-1",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ U("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ H(_, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var jn = {
	document: "📄",
	transcript: "🎙️"
};
function Mn({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: l }) {
	let [u, d] = B(""), [f, p] = B(!1), [m, h] = B(n), g = he(), _ = z(0);
	R(() => {
		let e = u.trim();
		if (!a) {
			let t = e.toLowerCase();
			h(t ? n.filter((e) => e.title.toLowerCase().includes(t)) : n);
			return;
		}
		let t = ++_.current, r = !1;
		return Promise.resolve(a(e)).then((e) => {
			r || t !== _.current || h(e);
		}).catch(() => {
			!r && t === _.current && h(n);
		}), () => {
			r = !0;
		};
	}, [
		u,
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
		}]), d(""), p(!1));
	}, x = /* @__PURE__ */ H(I, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${l}-source-chips`
	}), S = /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ H(E, {
			value: u,
			onChange: d,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${l}-source-search`
		}), y ? /* @__PURE__ */ H(c, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : m.length === 0 ? /* @__PURE__ */ H(c, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${l}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ H("ul", {
			"aria-labelledby": g,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${l}-source-results`,
			children: m.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ H("li", { children: /* @__PURE__ */ U(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${l}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ H("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: jn[t.kind ?? "document"]
						}),
						/* @__PURE__ */ H("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ H("span", {
							className: "ml-1.5 text-xs text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ H(F, {
					as: "div",
					children: /* @__PURE__ */ H("span", {
						id: g,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ H(c, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${l}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ H("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					"aria-expanded": f,
					disabled: y && !f,
					onClick: () => {
						p((e) => !e), d("");
					},
					"data-testid": `${l}-add-source`,
					children: f ? "Done" : "+ Add source"
				})
			]
		}), !o && f && S]
	}) : /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [
			/* @__PURE__ */ H(F, {
				as: "div",
				children: /* @__PURE__ */ H("span", {
					id: g,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ H(ae, {
				tone: "warning",
				"data-testid": `${l}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : x,
			!o && S
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideLayoutForms.tsx
function Nn() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Pn({ label: e, count: t, max: n, min: r, testId: i }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ H(F, {
			as: "div",
			children: e
		}), /* @__PURE__ */ H(c, {
			size: "xs",
			tone: "tertiary",
			"data-testid": i,
			children: r === void 0 ? `${t} of ${n}` : `${t} of ${r}–${n}`
		})]
	});
}
function Fn({ label: e, disabled: t, onClick: n, testId: r }) {
	return /* @__PURE__ */ H(h, {
		"aria-label": e,
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ H(Nn, {}),
		disabled: t,
		onClick: n,
		"data-testid": r
	});
}
function In({ children: e, disabled: t, onClick: n, testId: r }) {
	return /* @__PURE__ */ H(i, {
		variant: "ghost",
		size: "sm",
		disabled: t,
		onClick: n,
		"data-testid": r,
		className: "self-start",
		children: e
	});
}
function Ln(e, t, n) {
	let r = e.slice();
	return r[t] = n, r;
}
function Rn({ label: e, itemLabel: t, items: n, max: r, maxChars: i, min: a = 0, addLabel: o, onChange: s, readOnly: l, testIdPrefix: u, numbered: d = !1 }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		"data-testid": u,
		children: [
			/* @__PURE__ */ H(Pn, {
				label: e,
				count: n.length,
				max: r,
				testId: `${u}-count`
			}),
			/* @__PURE__ */ H("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: n.map((e, r) => /* @__PURE__ */ U("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ H(c, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "w-4 shrink-0 text-right",
							children: d ? `${r + 1}.` : "•"
						}),
						/* @__PURE__ */ H(S, {
							value: e,
							maxLength: i,
							disabled: l,
							"aria-label": `${t} ${r + 1}`,
							onChange: (e) => s(Ln(n, r, e.target.value)),
							"data-testid": `${u}-${r}`
						}),
						!l && /* @__PURE__ */ H(Fn, {
							label: `Remove ${t.toLowerCase()} ${r + 1}`,
							disabled: n.length <= Math.max(a, 0),
							onClick: () => s(n.filter((e, t) => t !== r)),
							testId: `${u}-remove-${r}`
						})
					]
				}, r))
			}),
			!l && /* @__PURE__ */ H(In, {
				disabled: n.length >= r,
				onClick: () => s([...n, ""]),
				testId: `${u}-add`,
				children: o
			})
		]
	});
}
function zn({ figures: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.delta || delete i.delta, t(Ln(e, n, i));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H(Pn, {
				label: "Figures",
				count: e.length,
				min: 2,
				max: 4,
				testId: `${r}-count`
			}),
			/* @__PURE__ */ H("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((a, o) => /* @__PURE__ */ U("li", {
					className: "grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_auto]",
					children: [
						/* @__PURE__ */ H(S, {
							value: a.value,
							maxLength: 12,
							placeholder: "42%",
							disabled: n,
							"aria-label": `Figure ${o + 1} value`,
							onChange: (e) => i(o, { value: e.target.value }),
							"data-testid": `${r}-value-${o}`
						}),
						/* @__PURE__ */ H(S, {
							value: a.label,
							maxLength: 60,
							placeholder: "What it counts",
							disabled: n,
							"aria-label": `Figure ${o + 1} label`,
							onChange: (e) => i(o, { label: e.target.value }),
							"data-testid": `${r}-label-${o}`
						}),
						/* @__PURE__ */ H(S, {
							value: a.delta ?? "",
							maxLength: 24,
							placeholder: "+8 pts (optional)",
							disabled: n,
							"aria-label": `Figure ${o + 1} change, optional`,
							onChange: (e) => i(o, { delta: e.target.value }),
							"data-testid": `${r}-delta-${o}`
						}),
						!n && /* @__PURE__ */ H(Fn, {
							label: `Remove figure ${o + 1}`,
							disabled: e.length <= 2,
							onClick: () => t(e.filter((e, t) => t !== o)),
							testId: `${r}-remove-${o}`
						})
					]
				}, o))
			}),
			!n && /* @__PURE__ */ H(In, {
				disabled: e.length >= 4,
				onClick: () => t([...e, {
					value: "",
					label: ""
				}]),
				testId: `${r}-add`,
				children: "Add figure"
			})
		]
	});
}
function Bn({ table: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let a = e.header.length, o = () => {
		e.rows.length >= 8 || t({
			...e,
			rows: [...e.rows, e.header.map(() => "")]
		});
	}, s = (n) => {
		e.rows.length <= 1 || t({
			...e,
			rows: e.rows.filter((e, t) => t !== n)
		});
	}, h = () => {
		a >= 5 || t({
			header: [...e.header, ""],
			rows: e.rows.map((e) => [...e, ""])
		});
	}, g = (n) => {
		a <= 1 || t({
			header: e.header.filter((e, t) => t !== n),
			rows: e.rows.map((e) => e.filter((e, t) => t !== n))
		});
	}, _ = (n, r, i) => {
		t({
			...e,
			rows: Ln(e.rows, n, Ln(e.rows[n], r, i))
		});
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ U("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ H(F, {
					as: "div",
					children: "Table"
				}),
				/* @__PURE__ */ H(c, {
					size: "xs",
					tone: "tertiary",
					"data-testid": `${r}-count`,
					children: `${e.rows.length} of 8 rows · ${a} of 5 columns · 40 characters a cell`
				}),
				!n && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					disabled: e.rows.length >= 8,
					onClick: o,
					"data-testid": `${r}-add-row`,
					children: "Add row"
				}), /* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					disabled: a >= 5,
					onClick: h,
					"data-testid": `${r}-add-column`,
					children: "Add column"
				})] })
			]
		}), /* @__PURE__ */ H("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ U(m, {
				"data-testid": `${r}-grid`,
				children: [/* @__PURE__ */ H(p, { children: /* @__PURE__ */ U(u, { children: [e.header.map((i, o) => /* @__PURE__ */ H(f, { children: /* @__PURE__ */ U("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ H(S, {
						size: "sm",
						value: i,
						maxLength: 40,
						disabled: n,
						"aria-label": `Column ${o + 1} heading`,
						onChange: (n) => t({
							...e,
							header: Ln(e.header, o, n.target.value)
						}),
						"data-testid": `${r}-header-${o}`
					}), !n && /* @__PURE__ */ H(Fn, {
						label: `Remove column ${o + 1}`,
						disabled: a <= 1,
						onClick: () => g(o),
						testId: `${r}-remove-column-${o}`
					})]
				}) }, o)), !n && /* @__PURE__ */ H(f, { children: /* @__PURE__ */ H("span", {
					className: "sr-only",
					children: "Row actions"
				}) })] }) }), /* @__PURE__ */ H(d, { children: e.rows.map((t, i) => /* @__PURE__ */ U(u, { children: [e.header.map((a, o) => /* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(S, {
					size: "sm",
					value: t[o] ?? "",
					maxLength: 40,
					disabled: n,
					"aria-label": `Row ${i + 1}, ${e.header[o] || `column ${o + 1}`}`,
					onChange: (e) => _(i, o, e.target.value),
					"data-testid": `${r}-cell-${i}-${o}`
				}) }, o)), !n && /* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(Fn, {
					label: `Remove row ${i + 1}`,
					disabled: e.rows.length <= 1,
					onClick: () => s(i),
					testId: `${r}-remove-row-${i}`
				}) })] }, i)) })]
			})
		})]
	});
}
function Vn({ comparison: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (i, a) => {
		let o = e[i];
		return /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5",
			"data-testid": `${r}-${i}`,
			children: [/* @__PURE__ */ H(T, {
				label: `${a} side title`,
				children: (a) => /* @__PURE__ */ H(S, {
					...a,
					value: o.title,
					maxLength: 40,
					disabled: n,
					onChange: (n) => t({
						...e,
						[i]: {
							...o,
							title: n.target.value
						}
					}),
					"data-testid": `${r}-${i}-title`
				})
			}), /* @__PURE__ */ H(Rn, {
				label: `${a} points`,
				itemLabel: `${a} point`,
				items: o.points,
				min: 1,
				max: 5,
				maxChars: 120,
				addLabel: "Add point",
				onChange: (n) => t({
					...e,
					[i]: {
						...o,
						points: n
					}
				}),
				readOnly: n,
				testIdPrefix: `${r}-${i}-points`
			})]
		});
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-3",
		"data-testid": r,
		children: [/* @__PURE__ */ U("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: [i("left", "Left"), i("right", "Right")]
		}), /* @__PURE__ */ H(T, {
			label: "Verdict",
			hint: "Optional: the line that settles it. Up to 140 characters.",
			children: (i) => /* @__PURE__ */ H(S, {
				...i,
				value: e.verdict ?? "",
				maxLength: 140,
				disabled: n,
				onChange: (n) => {
					let { verdict: r, ...i } = e;
					t(n.target.value ? {
						...i,
						verdict: n.target.value
					} : i);
				},
				"data-testid": `${r}-verdict`
			})
		})]
	});
}
function Hn({ steps: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.detail || delete i.detail, t(Ln(e, n, i));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H(Pn, {
				label: "Steps",
				count: e.length,
				min: 3,
				max: 6,
				testId: `${r}-count`
			}),
			/* @__PURE__ */ H("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((a, o) => /* @__PURE__ */ U("li", {
					className: "grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,3fr)_auto]",
					children: [
						/* @__PURE__ */ H(S, {
							value: a.date,
							maxLength: 16,
							placeholder: "Mar 2027",
							disabled: n,
							"aria-label": `Step ${o + 1} date`,
							onChange: (e) => i(o, { date: e.target.value }),
							"data-testid": `${r}-date-${o}`
						}),
						/* @__PURE__ */ H(S, {
							value: a.label,
							maxLength: 40,
							placeholder: "What happens",
							disabled: n,
							"aria-label": `Step ${o + 1} label`,
							onChange: (e) => i(o, { label: e.target.value }),
							"data-testid": `${r}-label-${o}`
						}),
						/* @__PURE__ */ H(S, {
							value: a.detail ?? "",
							maxLength: 80,
							placeholder: "Detail (optional)",
							disabled: n,
							"aria-label": `Step ${o + 1} detail, optional`,
							onChange: (e) => i(o, { detail: e.target.value }),
							"data-testid": `${r}-detail-${o}`
						}),
						!n && /* @__PURE__ */ H(Fn, {
							label: `Remove step ${o + 1}`,
							disabled: e.length <= 3,
							onClick: () => t(e.filter((e, t) => t !== o)),
							testId: `${r}-remove-${o}`
						})
					]
				}, o))
			}),
			!n && /* @__PURE__ */ H(In, {
				disabled: e.length >= 6,
				onClick: () => t([...e, {
					date: "",
					label: ""
				}]),
				testId: `${r}-add`,
				children: "Add step"
			})
		]
	});
}
function Un({ agenda: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-2",
		"data-testid": r,
		children: [/* @__PURE__ */ H(Rn, {
			label: "Agenda items",
			itemLabel: "Agenda item",
			items: e.items,
			min: 1,
			max: 6,
			maxChars: 80,
			addLabel: "Add item",
			numbered: !0,
			onChange: (n) => {
				let r = e.current;
				r !== void 0 && r >= n.length && (r = void 0), t(r === void 0 ? { items: n } : {
					items: n,
					current: r
				});
			},
			readOnly: n,
			testIdPrefix: `${r}-items`
		}), /* @__PURE__ */ H(T, {
			label: "Current item",
			hint: "Optional: marks where the talk is.",
			className: "sm:w-64",
			children: (i) => /* @__PURE__ */ H(C, {
				...i,
				size: "sm",
				value: e.current === void 0 ? "" : String(e.current),
				disabled: n,
				options: [{
					value: "",
					label: "None"
				}, ...e.items.map((e, t) => ({
					value: String(t),
					label: `${t + 1}. ${e || "Untitled item"}`
				}))],
				onChange: (n) => {
					let r = n.target.value;
					t(r === "" ? { items: e.items } : {
						items: e.items,
						current: Number(r)
					});
				},
				"data-testid": `${r}-current`
			})
		})]
	});
}
function Wn({ closing: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n) => {
		let r = {
			...e,
			...n
		};
		r.contact || delete r.contact, r.nextSteps?.length || delete r.nextSteps, t(r);
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-2",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H(T, {
				label: "Closing line",
				required: !0,
				hint: "Up to 100 characters.",
				children: (t) => /* @__PURE__ */ H(S, {
					...t,
					value: e.line,
					maxLength: 100,
					disabled: n,
					onChange: (e) => i({ line: e.target.value }),
					"data-testid": `${r}-line`
				})
			}),
			/* @__PURE__ */ H(Rn, {
				label: "Next steps",
				itemLabel: "Next step",
				items: e.nextSteps ?? [],
				max: 3,
				maxChars: 120,
				addLabel: "Add next step",
				numbered: !0,
				onChange: (e) => i({ nextSteps: e }),
				readOnly: n,
				testIdPrefix: `${r}-steps`
			}),
			/* @__PURE__ */ H(T, {
				label: "Contact",
				hint: "Optional: who to ask. Up to 100 characters.",
				children: (t) => /* @__PURE__ */ H(S, {
					...t,
					value: e.contact ?? "",
					maxLength: 100,
					disabled: n,
					onChange: (e) => i({ contact: e.target.value }),
					"data-testid": `${r}-contact`
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function Gn() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Kn({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ H(F, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ H("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, s) => /* @__PURE__ */ U("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ H(c, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ H(S, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${s + 1}`,
							onChange: (e) => o(s, e.target.value),
							"data-testid": `${a}-${s}`
						}),
						!r && /* @__PURE__ */ H(h, {
							"aria-label": `Remove ${e.toLowerCase()} ${s + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Gn, {}),
							onClick: () => n(t.filter((e, t) => t !== s)),
							"data-testid": `${a}-remove-${s}`
						})
					]
				}, s))
			}),
			!r && /* @__PURE__ */ H(i, {
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
function qn({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	}, o = e.kind === "pie", s = o ? 6 : 24, g = o ? 1 : 6, _ = o && (e.series.length > 1 || e.labels.length > 6) ? `A pie takes one series and at most 6 slices; this chart has ${e.series.length} series and ${e.labels.length} labels. Remove the extra ones, or pick another chart type.` : null, v = () => {
		e.labels.length >= s || t({
			...e,
			labels: [...e.labels, `Label ${e.labels.length + 1}`],
			series: e.series.map((e) => ({
				...e,
				values: [...e.values, 0]
			}))
		});
	}, y = (n) => {
		e.labels.length <= 1 || t({
			...e,
			labels: e.labels.filter((e, t) => t !== n),
			series: e.series.map((e) => ({
				...e,
				values: e.values.filter((e, t) => t !== n)
			}))
		});
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ H(T, {
					label: "Chart type",
					className: "w-40",
					children: (i) => /* @__PURE__ */ H(C, {
						...i,
						size: "sm",
						value: e.kind,
						disabled: n,
						options: St.map((e) => ({
							value: e,
							label: Ct[e]
						})),
						onChange: (n) => t({
							...e,
							kind: n.target.value
						}),
						"data-testid": `${r}-kind`
					})
				}), !n && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					disabled: e.labels.length >= s,
					onClick: v,
					"data-testid": `${r}-add-label`,
					children: "Add row"
				}), /* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					disabled: e.series.length >= g,
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
			}),
			/* @__PURE__ */ H(c, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${r}-limits`,
				children: o ? `${e.labels.length} of 6 slices · one series` : `${e.labels.length} of 24 rows · ${e.series.length} of 6 series`
			}),
			_ && /* @__PURE__ */ H(c, {
				size: "xs",
				tone: "danger",
				role: "alert",
				"data-testid": `${r}-pie-problem`,
				children: _
			}),
			/* @__PURE__ */ H("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ U(m, {
					"data-testid": `${r}-table`,
					children: [/* @__PURE__ */ H(p, { children: /* @__PURE__ */ U(u, { children: [
						/* @__PURE__ */ H(f, { children: "Label" }),
						e.series.map((i, a) => /* @__PURE__ */ H(f, { children: /* @__PURE__ */ U("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ H(S, {
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
							}), !n && e.series.length > 1 && /* @__PURE__ */ H(h, {
								"aria-label": `Remove series ${a + 1}`,
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(Gn, {}),
								onClick: () => t({
									...e,
									series: e.series.filter((e, t) => t !== a)
								}),
								"data-testid": `${r}-remove-series-${a}`
							})]
						}) }, a)),
						!n && /* @__PURE__ */ H(f, {})
					] }) }), /* @__PURE__ */ H(d, { children: e.labels.map((i, o) => /* @__PURE__ */ U(u, { children: [
						/* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(S, {
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
						e.series.map((e, t) => /* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(S, {
							size: "sm",
							type: "number",
							value: String(e.values[o] ?? 0),
							disabled: n,
							"aria-label": `${e.name} at ${i}`,
							onChange: (e) => a(t, o, e.target.value),
							"data-testid": `${r}-value-${t}-${o}`
						}) }, t)),
						!n && /* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(h, {
							"aria-label": `Remove row ${o + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Gn, {}),
							disabled: e.labels.length <= 1,
							onClick: () => y(o),
							"data-testid": `${r}-remove-label-${o}`
						}) })
					] }, o)) })]
				})
			})
		]
	});
}
function Jn({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
	let l = (n) => t({
		...e,
		...n
	});
	return /* @__PURE__ */ U("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${c}-form`,
		children: [
			/* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ H(T, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ H(S, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ H(T, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ H(S, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-slide-title": "",
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ H(Kn, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ H(Kn, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ H(Kn, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ H(qn, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ H(T, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ H(A, {
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
				}), /* @__PURE__ */ H(T, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ H(S, {
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
			e.layout === "image" && /* @__PURE__ */ H(T, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ H(S, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			e.layout === "key-figures" && e.figures && /* @__PURE__ */ H(zn, {
				figures: e.figures,
				onChange: (e) => l({ figures: e }),
				readOnly: a,
				testIdPrefix: `${c}-figures`
			}),
			e.layout === "table" && e.table && /* @__PURE__ */ H(Bn, {
				table: e.table,
				onChange: (e) => l({ table: e }),
				readOnly: a,
				testIdPrefix: `${c}-table`
			}),
			e.layout === "comparison" && e.comparison && /* @__PURE__ */ H(Vn, {
				comparison: e.comparison,
				onChange: (e) => l({ comparison: e }),
				readOnly: a,
				testIdPrefix: `${c}-comparison`
			}),
			e.layout === "timeline" && e.timeline && /* @__PURE__ */ H(Hn, {
				steps: e.timeline,
				onChange: (e) => l({ timeline: e }),
				readOnly: a,
				testIdPrefix: `${c}-timeline`
			}),
			e.layout === "agenda" && e.agenda && /* @__PURE__ */ H(Un, {
				agenda: e.agenda,
				onChange: (e) => l({ agenda: e }),
				readOnly: a,
				testIdPrefix: `${c}-agenda`
			}),
			e.layout === "closing" && e.closing && /* @__PURE__ */ H(Wn, {
				closing: e.closing,
				onChange: (e) => l({ closing: e }),
				readOnly: a,
				testIdPrefix: `${c}-closing`
			}),
			s && /* @__PURE__ */ H(T, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ H(A, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ H(Mn, {
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
var Yn = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function Xn({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ H("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ U("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", Yn[a]),
			children: [e, t && /* @__PURE__ */ U("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ H("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ H(c, {
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
var Zn = [
	"chart",
	"quote",
	"image",
	"two-column"
], Qn = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
};
function $n(e, t) {
	return Tt(e) ? t.find((t) => t.id === e.ref)?.name ?? e.ref : Qn[e] ?? e;
}
var er = {
	narrow: 640,
	chart: 760,
	wide: 900
};
function tr(e) {
	return e == null ? "wide" : e < er.narrow ? "narrow" : e < er.wide ? "medium" : "wide";
}
var nr = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set([
		"layout",
		"theme",
		"chart"
	]),
	narrow: /* @__PURE__ */ new Set([])
}, rr = "Text style comes from the theme", ir = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function ar({ redo: e }) {
	return /* @__PURE__ */ U("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ H("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ H("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function or() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function sr() {
	return /* @__PURE__ */ H("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function cr({ label: e, value: t }) {
	return /* @__PURE__ */ U("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ H("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ H("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ H(g, { size: 12 })
		]
	});
}
function lr({ slide: e, theme: t, themes: n = [], onAddSlide: o, canAddSlide: s = !0, onBrowseLayouts: l, onLayoutChange: u, onThemeChange: d, onThemeRefChange: f, onChartKindChange: p, onUndo: m, onRedo: g, canUndo: v = !1, canRedo: y = !1, onPresent: b, end: x, disabled: S = !1, className: C, testIdPrefix: w = "slides-toolbar", size: T = "auto" }) {
	let { ref: E, ...ee } = N(), { ref: te, width: ne } = se(E), re = T === "auto" ? tr(ne) : T, k = nr[re], ie = re !== "medium" || ne == null || ne >= er.chart, A = (e) => k.has(e) && (e !== "chart" || ie), j = S, M = !j && e ? {
		label: "Layout of this slide",
		items: yt.map((t) => ({
			label: bt[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && u(t);
			},
			"data-testid": `${w}-layout-${t}`
		}))
	} : null, ae = !j && s ? {
		label: "New slide after this one",
		items: Zn.map((e) => ({
			label: `${bt[e]} slide`,
			onSelect: () => o(e),
			"data-testid": `${w}-insert-${e}`
		})).concat(l ? [{
			label: "All layouts…",
			onSelect: l,
			"data-testid": `${w}-insert-all`
		}] : [])
	} : null, oe = Tt(t) ? t.ref : null, P = j ? null : {
		label: "Deck theme",
		items: wt.map((e) => ({
			label: Qn[e],
			checked: e === t,
			onSelect: () => {
				e !== t && d(e);
			},
			"data-testid": `${w}-theme-${e}`
		})).concat((f ? n : []).map((e) => ({
			label: e.name,
			checked: e.id === oe,
			onSelect: () => {
				e.id !== oe && f?.({ ref: e.id });
			},
			"data-testid": `${w}-theme-ref-${e.id}`
		})))
	}, F = $n(t, n), ce = !j && e?.layout === "chart" && e.chart && p ? e.chart : null, le = ce && p ? {
		label: "Chart type",
		items: St.map((e) => ({
			label: Ct[e],
			checked: ce.kind === e,
			onSelect: () => {
				ce.kind !== e && p(e);
			},
			"data-testid": `${w}-chart-kind-${e}`
		}))
	} : null, I = ce && ce.kind !== "bar" && ce.kind !== "line" && A("chart") ? ce.kind : null, ue = I ? [
		"bar",
		"line",
		I
	] : ["bar", "line"], de = [];
	return !A("layout") && M && de.push(M), !A("insert") && ae && de.push(ae), !A("theme") && P && de.push(P), !A("chart") && le && de.push(le), (!A("note") || I) && !j && de.push({
		label: rr,
		items: [],
		"data-testid": `${w}-style-note`
	}), /* @__PURE__ */ U("div", {
		...ee,
		ref: te,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": re,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", C),
		"data-testid": w,
		children: [
			/* @__PURE__ */ H(i, {
				variant: "primary",
				size: "sm",
				disabled: j || !s,
				onClick: () => o(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${w}-new-slide`,
				children: /* @__PURE__ */ U("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ H(_, { size: 12 }), "New slide"]
				})
			}),
			A("layout") && M && e && /* @__PURE__ */ H(D, {
				trigger: /* @__PURE__ */ H(cr, {
					label: "Layout",
					value: bt[e.layout]
				}),
				triggerLabel: `Layout: ${bt[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-layout`,
				sections: [M],
				"data-testid": `${w}-layout-menu`
			}),
			A("insert") && ae && /* @__PURE__ */ H(D, {
				trigger: /* @__PURE__ */ H(cr, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-insert`,
				sections: [ae],
				"data-testid": `${w}-insert-menu`
			}),
			A("theme") && P && /* @__PURE__ */ H(D, {
				trigger: /* @__PURE__ */ H(cr, {
					label: "Theme",
					value: F
				}),
				triggerLabel: `Theme: ${F}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-theme`,
				sections: [P],
				"data-testid": `${w}-theme-menu`
			}),
			A("chart") && ce && p && /* @__PURE__ */ H(a, {
				density: "compact",
				children: /* @__PURE__ */ H(O, {
					value: ce.kind,
					onChange: (e) => p(e),
					options: ue.map((e) => ({
						value: e,
						label: Ct[e]
					})),
					"aria-label": "Chart type",
					className: "shrink-0",
					"data-testid": `${w}-chart-kind`
				})
			}),
			(m || g) && /* @__PURE__ */ U(V, { children: [
				/* @__PURE__ */ H(sr, {}),
				m && /* @__PURE__ */ H(h, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(ar, {}),
					disabled: j || !v,
					onClick: m,
					"data-testid": `${w}-undo`
				}),
				g && /* @__PURE__ */ H(h, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(ar, { redo: !0 }),
					disabled: j || !y,
					onClick: g,
					"data-testid": `${w}-redo`
				})
			] }),
			de.length > 0 && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(sr, {}), /* @__PURE__ */ H(D, {
				trigger: /* @__PURE__ */ H("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-more`,
				sections: de,
				"data-testid": `${w}-more-menu`
			})] }),
			A("note") && !I && /* @__PURE__ */ H(c, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-xs text-text-tertiary",
				title: ir,
				"data-testid": `${w}-style-note`,
				children: rr
			}),
			/* @__PURE__ */ H("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			x,
			b && /* @__PURE__ */ H(i, {
				variant: "secondary",
				size: "sm",
				onClick: b,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${w}-present`,
				children: /* @__PURE__ */ U("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ H(or, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/LayoutGallery.tsx
function ur({ wide: e = !1, center: t = !1 }) {
	return /* @__PURE__ */ H("span", { className: r("block h-1.5 rounded-sm bg-text-tertiary", e ? "w-3/4" : "w-1/2", t && "mx-auto") });
}
function dr({ count: e = 3, className: t }) {
	let n = [
		"w-full",
		"w-5/6",
		"w-2/3",
		"w-4/5",
		"w-3/4",
		"w-1/2"
	];
	return /* @__PURE__ */ H("span", {
		className: r("flex flex-col gap-1", t),
		children: Array.from({ length: e }, (e, t) => /* @__PURE__ */ H("span", { className: r("block h-1 rounded-sm bg-border-emphasis", n[t % n.length]) }, t))
	});
}
function fr() {
	return /* @__PURE__ */ H("span", {
		className: "flex min-h-0 flex-1 items-end gap-1 border-b border-l border-border-emphasis px-1",
		children: [
			"h-1/3",
			"h-2/3",
			"h-1/2",
			"h-full",
			"h-3/4"
		].map((e, t) => /* @__PURE__ */ H("span", { className: r("block w-full rounded-t-sm bg-primary/50", e) }, t))
	});
}
function pr() {
	return /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-3 gap-1.5",
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ U("span", {
			className: "flex flex-col items-center justify-center gap-1 rounded-sm bg-surface",
			children: [/* @__PURE__ */ H("span", { className: "block h-2.5 w-2/3 rounded-sm bg-primary/60" }), /* @__PURE__ */ H("span", { className: "block h-1 w-1/2 rounded-sm bg-border-emphasis" })]
		}, e))
	});
}
function mr() {
	return /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-4 gap-px overflow-hidden rounded-sm bg-border-emphasis",
		children: Array.from({ length: 16 }, (e, t) => /* @__PURE__ */ H("span", { className: r("block", t < 4 ? "bg-primary/30" : "bg-surface") }, t))
	});
}
function hr({ titled: e = !1 }) {
	return /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-2 gap-2",
		children: [0, 1].map((t) => /* @__PURE__ */ U("span", {
			className: r("flex flex-col gap-1", e && "rounded-sm bg-surface p-1"),
			children: [e && /* @__PURE__ */ H("span", { className: "block h-1.5 w-1/2 rounded-sm bg-primary/50" }), /* @__PURE__ */ H(dr, { count: 3 })]
		}, t))
	});
}
function gr() {
	return /* @__PURE__ */ U("span", {
		className: "relative flex flex-1 items-center justify-between px-1",
		children: [/* @__PURE__ */ H("span", { className: "absolute inset-x-1 top-1/2 block h-px bg-border-emphasis" }), [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ U("span", {
			className: "relative flex flex-col items-center gap-1",
			children: [/* @__PURE__ */ H("span", { className: "block h-2 w-2 rounded-full bg-primary/70" }), /* @__PURE__ */ H("span", { className: "block h-1 w-5 rounded-sm bg-border-emphasis" })]
		}, e))]
	});
}
function _r() {
	return /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ U("span", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ H("span", { className: r("block h-2 w-2 rounded-sm", e === 1 ? "bg-primary" : "bg-border-emphasis") }), /* @__PURE__ */ H("span", { className: r("block h-1 rounded-sm", e === 1 ? "w-2/3 bg-primary/60" : "w-1/2 bg-border-emphasis") })]
		}, e))
	});
}
var vr = {
	title: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H(ur, { wide: !0 }), /* @__PURE__ */ H("span", { className: "block h-1 w-1/3 rounded-sm bg-border-emphasis" })]
	}),
	section: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H("span", { className: "block h-1 w-1/5 rounded-sm bg-primary/60" }), /* @__PURE__ */ H(ur, {})]
	}),
	bullets: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(dr, { count: 4 })] }),
	"two-column": () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(hr, {})] }),
	chart: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(fr, {})] }),
	quote: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5 px-2",
		children: [/* @__PURE__ */ H(dr, { count: 2 }), /* @__PURE__ */ H("span", { className: "block h-1 w-1/4 self-end rounded-sm bg-primary/60" })]
	}),
	image: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H("span", { className: "block flex-1 rounded-sm bg-primary/20" })] }),
	"key-figures": () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(pr, {})] }),
	table: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(mr, {})] }),
	comparison: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(hr, { titled: !0 })] }),
	timeline: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(gr, {})] }),
	agenda: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ur, {}), /* @__PURE__ */ H(_r, {})] }),
	closing: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H(ur, {
			wide: !0,
			center: !0
		}), /* @__PURE__ */ H(dr, {
			count: 2,
			className: "mx-auto w-1/2"
		})]
	})
};
function yr({ layout: e, className: t }) {
	return /* @__PURE__ */ H("span", {
		"aria-hidden": "true",
		"data-layout-schematic": e,
		className: r("flex aspect-video w-full flex-col gap-2 overflow-hidden rounded-md border border-border bg-surface-muted p-3", t),
		children: vr[e]()
	});
}
function br({ svg: e, layout: t, className: n }) {
	let i = G(e);
	return i ? /* @__PURE__ */ H("span", {
		className: r("block aspect-video w-full overflow-hidden rounded-md border border-border bg-surface", n),
		children: /* @__PURE__ */ H("img", {
			src: i,
			alt: "",
			draggable: !1,
			loading: "lazy",
			className: "block h-full w-full object-contain",
			"data-preview": "svg"
		})
	}) : t ? /* @__PURE__ */ H(yr, {
		layout: t,
		className: n
	}) : /* @__PURE__ */ H("span", {
		"aria-hidden": "true",
		className: r("block aspect-video w-full rounded-md border border-border bg-surface-muted", n)
	});
}
function xr({ onSelect: e, layouts: t = yt, previews: n, selected: i, label: a = "Slide layouts", className: o, testIdPrefix: s = "layout-gallery" }) {
	return /* @__PURE__ */ H("div", {
		className: r("@container min-w-0", o),
		"data-testid": s,
		children: /* @__PURE__ */ H("ul", {
			"aria-label": a,
			className: "m-0 grid list-none grid-cols-1 gap-3 p-0 @md:grid-cols-2 @2xl:grid-cols-3",
			children: t.map((t) => /* @__PURE__ */ H("li", {
				className: "min-w-0",
				children: /* @__PURE__ */ U(v, {
					selected: i === t,
					onSelect: () => e(t),
					className: "flex h-full flex-col gap-2",
					"data-testid": `${s}-${t}`,
					"data-layout": t,
					children: [/* @__PURE__ */ H(br, {
						svg: n?.[t],
						layout: t
					}), /* @__PURE__ */ U("span", {
						className: "flex min-w-0 flex-col gap-0.5",
						children: [/* @__PURE__ */ H(c, {
							as: "span",
							size: "sm",
							weight: "medium",
							className: "block",
							children: bt[t]
						}), /* @__PURE__ */ H(c, {
							as: "span",
							size: "xs",
							tone: "secondary",
							className: "block",
							children: xt[t]
						})]
					})]
				})
			}, t))
		})
	});
}
//#endregion
//#region src/components/doc-editor/presentation/DeckPresentMode.tsx
function Sr({ back: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Cr({ title: e, slides: t, slideIndex: n, onSlideChange: a, onExit: o, loading: l = !1, error: u, onRetry: d, showNotes: f = !1, onFocusConversation: p, className: m, testId: g = "deck-present" }) {
	let _ = z(null);
	R(() => {
		_.current?.focus({ preventScroll: !0 });
	}, []);
	let v = !u && !l && t.length > 0, y = Math.min(Math.max(n, 0), Math.max(t.length - 1, 0)), b = v ? t[y] : void 0, x = G(b?.svg), S = (e) => {
		if (e.key === "Escape") {
			e.preventDefault(), e.stopPropagation(), o();
			return;
		}
		if (!v) return;
		let n = Oe(e);
		if (!n) return;
		e.preventDefault();
		let r = ke(n, y + 1, t.length);
		r !== y + 1 && a(r - 1);
	}, C = p ? () => {
		o(), requestAnimationFrame(() => p());
	} : void 0, w = u ? /* @__PURE__ */ H("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-error`,
		children: /* @__PURE__ */ H(te, {
			title: "Couldn't prepare the presentation",
			description: u,
			...d ? {
				actionLabel: "Retry preview",
				onAction: d
			} : {}
		})
	}) : l ? /* @__PURE__ */ H("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-loading`,
		children: /* @__PURE__ */ H(ne, { label: "Preparing your current slides…" })
	}) : b ? /* @__PURE__ */ H("div", {
		className: "flex min-h-[12rem] min-w-0 flex-1 items-center justify-center [container-type:size]",
		"data-testid": `${g}-stage-frame`,
		children: /* @__PURE__ */ H("div", {
			className: "w-full max-w-[calc(100cqh*16/9)]",
			children: /* @__PURE__ */ H(Xn, {
				className: "[&>[role=figure]]:max-w-none",
				label: `Slide ${y + 1} of ${t.length}: ${b.title}`,
				"data-testid": `${g}-stage`,
				children: x ? /* @__PURE__ */ H("img", {
					src: x,
					alt: b.title,
					className: "h-full w-full object-contain"
				}) : /* @__PURE__ */ H(c, {
					size: "sm",
					tone: "tertiary",
					"data-testid": `${g}-no-preview`,
					children: "This slide has not been rendered yet."
				})
			})
		})
	}) : /* @__PURE__ */ H("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-empty`,
		children: /* @__PURE__ */ H(ee, {
			title: "No slides to present",
			description: "This deck has no rendered slides yet."
		})
	});
	return /* @__PURE__ */ U("div", {
		ref: _,
		role: "group",
		tabIndex: -1,
		"aria-roledescription": "Presentation",
		"aria-label": b ? `Presenting ${e} — slide ${y + 1} of ${t.length}. Use the left and right arrow keys to change slide, Escape to exit.` : `Presenting ${e}. Escape to exit.`,
		onKeyDown: S,
		className: r("flex h-full min-h-0 flex-col gap-3 bg-surface-panel p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", m),
		"data-testid": g,
		children: [/* @__PURE__ */ U(s, {
			gap: "sm",
			align: "center",
			className: "shrink-0 justify-between",
			"data-testid": `${g}-header`,
			children: [/* @__PURE__ */ U(s, {
				gap: "xs",
				align: "center",
				className: "min-w-0",
				children: [/* @__PURE__ */ H(c, {
					size: "sm",
					weight: "semibold",
					children: "Presenting"
				}), /* @__PURE__ */ H(c, {
					size: "sm",
					tone: "secondary",
					truncate: !0,
					"data-testid": `${g}-title`,
					children: e
				})]
			}), /* @__PURE__ */ U(s, {
				gap: "xs",
				align: "center",
				children: [C && /* @__PURE__ */ H(i, {
					size: "sm",
					variant: "secondary",
					onClick: C,
					children: "Chat & agent"
				}), /* @__PURE__ */ H(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${g}-exit`,
					children: "Exit presentation"
				})]
			})]
		}), /* @__PURE__ */ U("div", {
			className: r("flex min-h-0 flex-1 flex-col gap-3", f && "lg:flex-row"),
			"data-testid": `${g}-body`,
			children: [/* @__PURE__ */ U("div", {
				className: "flex min-h-0 min-w-0 flex-1 flex-col gap-2",
				children: [w, b && /* @__PURE__ */ U(s, {
					gap: "sm",
					align: "center",
					className: "shrink-0 justify-center",
					"data-testid": `${g}-nav`,
					children: [
						/* @__PURE__ */ H(h, {
							"aria-label": "Previous slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Sr, { back: !0 }),
							disabled: y <= 0,
							onClick: () => a(y - 1),
							"data-testid": `${g}-previous`
						}),
						/* @__PURE__ */ H(c, {
							size: "sm",
							tone: "secondary",
							tabular: !0,
							"data-testid": `${g}-position`,
							children: `Slide ${y + 1} of ${t.length}`
						}),
						/* @__PURE__ */ H(h, {
							"aria-label": "Next slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ H(Sr, {}),
							disabled: y >= t.length - 1,
							onClick: () => a(y + 1),
							"data-testid": `${g}-next`
						})
					]
				})]
			}), f && b && /* @__PURE__ */ U("section", {
				"aria-label": "Speaker notes",
				className: "flex max-h-40 shrink-0 flex-col gap-1 overflow-y-auto rounded-lg border border-border bg-surface px-3 py-2 lg:max-h-none lg:w-80",
				"data-testid": `${g}-notes`,
				children: [/* @__PURE__ */ H(F, {
					as: "div",
					children: "Speaker notes"
				}), b.notes?.trim() ? /* @__PURE__ */ H(c, {
					as: "p",
					size: "sm",
					tone: "secondary",
					className: "m-0 whitespace-pre-wrap",
					children: b.notes
				}) : /* @__PURE__ */ H(c, {
					as: "p",
					size: "sm",
					tone: "tertiary",
					className: "m-0",
					children: b.generated ? "This generated slide has no speaker notes." : "No speaker notes on this slide."
				})]
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/useFocusModeReport.ts
function wr(e, t) {
	let n = z(t);
	n.current = t, R(() => {
		if (e) return n.current?.(!0), () => n.current?.(!1);
	}, [e]);
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Tr({ value: e, onChange: t, readOnly: n = !1, maxLength: i = qe, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let l = he(), u = he(), d = e?.length ?? 0, f = d >= i * .9;
	return /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		"aria-labelledby": l,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ H(c, {
				as: "span",
				id: l,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ H(c, {
				as: "span",
				id: u,
				className: r("text-[11px] tabular-nums", f ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${d} / ${i}`
			})]
		}), /* @__PURE__ */ H(A, {
			"aria-labelledby": l,
			"aria-describedby": u,
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
function Er({ testIdPrefix: e }) {
	return /* @__PURE__ */ H(ae, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Dr = me(() => import("./PresentationAgentComposer-J7u6LDom.js").catch(() => ({ default: Er })));
function Or({ back: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function kr(e, t) {
	let [n, r] = B({
		past: [],
		future: []
	}), i = z(null), a = z(0);
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
function Ar({ spec: e, onChange: t, preview: n, onRequestPreview: o, onSaveRevision: l, revisions: u, activeRevisionId: d, onSelectRevision: f, olderRevisions: p, sources: m, onSearchSources: g, onDownload: _, onOpenPresentationView: v, onFocusModeChange: y, showNotes: x = !1, previewCurrent: w = !0, readOnly: E = !1, onInstruct: D, instructHints: O, onUndoInstruct: re, generatingSlideIds: ie, slideViewers: A, selectSlideRequest: M, footer: N, renderFrame: oe, onSelectedSlideChange: P, themes: se, layoutPreviews: F, layoutGalleryOpen: ce, onLayoutGalleryOpenChange: le, slideFindings: I, ref: me, className: he, "data-testid": W = "presentation-editor" }) {
	let [ve, ye] = B(!1), be = ce !== void 0, xe = be ? ce : ve, Se = z(le);
	Se.current = le;
	let Ce = L((e) => {
		e !== xe && (be || ye(e), Se.current?.(e));
	}, [xe, be]), we = z(null), Ae = z(null), [je, Ne] = B(null), Pe = L((e) => {
		Ne((t) => ({
			id: e,
			n: (t?.n ?? 0) + 1
		}));
	}, []), [Fe, Ie] = B(!1);
	wr(Fe, y);
	let [Le, Re] = B(() => e.slides[0]?.id ?? ""), [ze, Be] = B(!1), [Ve, He] = B(null), Ue = !!D, [We, Ge] = B("slide"), [Ke, qe] = B(!1), [Je, Ye] = B(null), [Xe, Ze] = B(null), [Qe, $e] = B(() => /* @__PURE__ */ new Set()), { edit: K, undo: et, redo: tt, canUndo: nt, canRedo: rt } = kr(e, t), [it, at] = B([]);
	R(() => {
		typeof n == "object" && "slides" in n && at(n.slides);
	}, [n]);
	let ot = z(o);
	ot.current = o;
	let q = e.slides, st = _e(() => new Set(Et(e)), [e]), ct = st.size === 0;
	R(() => {
		ct && ot.current(e);
	}, [e, ct]);
	let lt = typeof n == "object" && "slides" in n ? n.slides : it, ut = _e(() => new Map(lt.map((e) => [e.id, e.svg])), [lt]), dt = _e(() => {
		let e = new Set(q.map((e) => e.id));
		return lt.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [lt, q]), ft = q.length + dt.length, pt = q.findIndex((e) => e.id === Le), mt = pt === -1 ? dt.findIndex((e) => e.id === Le) : -1, J = pt === -1 ? mt === -1 ? 0 : q.length + mt : pt, Y = pt !== -1 || mt === -1 ? q[J] : void 0, ht = mt === -1 ? void 0 : dt[mt], gt = Y?.id ?? ht?.id, _t = Y ? Y.title || "Untitled slide" : ht?.title, vt = _e(() => [...q.map((e) => e.id), ...dt.map((e) => e.id)], [q, dt]), yt = Math.min(J, q.length - 1), bt = z(P);
	bt.current = P, R(() => {
		gt && bt.current?.(gt, J);
	}, [gt, J]);
	let xt = _e(() => {
		let e = new Set(ie ?? []);
		return Ke && We === "slide" && Y && e.add(Y.id), [...e];
	}, [
		ie,
		Ke,
		We,
		Y
	]), St = !!Y && xt.includes(Y.id), Ct = q.map((e) => ({
		slide: e,
		thumbnailSvg: ut.get(e.id),
		uncited: st.has(e.id),
		changed: Qe.has(e.id),
		...I?.[e.id]?.length ? { findings: I[e.id] } : {}
	})), wt = L((e) => {
		Re(e);
	}, []), Tt = M?.key, Dt = M?.slideId;
	R(() => {
		Dt && e.slides.some((e) => e.id === Dt) && Re(Dt);
	}, [Tt, Dt]);
	let Ot = L((t, n) => {
		K(It(e, t, n));
	}, [K, e]), kt = L((t) => {
		let n = Lt(e, yt, t);
		if (n === e) return !1;
		K(n);
		let r = n.slides[yt + 1].id;
		return Re(r), Pe(r), !0;
	}, [
		K,
		e,
		yt,
		Pe
	]), jt = L((t) => {
		let n = Rt(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		K(n);
		let i = n.slides[r + 1].id;
		Re(i), Pe(i);
	}, [
		K,
		e,
		Pe
	]), Mt = L((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = zt(e, t);
		r !== e && (K(r), Re(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [K, e]), Nt = L((t) => K(Ft(e, t)), [K, e]), Vt = Y?.id;
	R(() => {
		if (!je || E) return;
		if (Vt !== je.id) {
			Ne(null);
			return;
		}
		let e = Ae.current, t = e?.querySelector("input[data-slide-title]");
		if (!e || !t) return;
		Ne(null), t.focus({ preventScroll: !0 }), t.select();
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		(r.top < n.top || r.bottom > n.bottom) && (e.scrollTop += r.top - n.top - 8);
	}, [
		je,
		Vt,
		E,
		xe
	]), ge(me, () => ({ focusSlideTitle: (t) => {
		E || !e.slides.some((e) => e.id === t) || (Re(t), Pe(t));
	} }), [
		E,
		e,
		Pe
	]);
	let Ht = L(async (e) => {
		if (!D || Ke) return !1;
		let t = Y?.id;
		qe(!0), Ze(null);
		try {
			let n = await D(e, We === "slide" && t ? {
				slideId: t,
				scope: We
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return $e(new Set(r)), Ye(n?.summary?.trim() || "Done."), We === "deck" && r.length && (!t || !r.includes(t)) && Re(r[0]), !0;
		} catch (e) {
			return Ze(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			qe(!1);
		}
	}, [
		D,
		Ke,
		We,
		Y?.id
	]), Ut = L(() => {
		re?.(), Ye(null), $e(/* @__PURE__ */ new Set());
	}, [re]), Wt = st.size, Gt = !E && q.length > 0 && Wt === 0 && !ze, Kt = L(() => {
		Gt && (Be(!0), He(null), Promise.resolve(l(Pt(e))).catch((e) => {
			He(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => Be(!1)));
	}, [
		Gt,
		l,
		e
	]), qt = L((e) => {
		let t = vt[J + e];
		t && Re(t);
	}, [vt, J]);
	R(() => {
		if (E || Fe) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), Kt();
				return;
			}
			if (xe) return;
			if (t && e.key.toLowerCase() === "z" && !De(e.target)) {
				e.preventDefault(), e.shiftKey ? tt() : et();
				return;
			}
			let n = Oe(e);
			if (!n) return;
			e.preventDefault();
			let r = ke(n, J + 1, ft);
			r !== J + 1 && qt(r - (J + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		E,
		Fe,
		xe,
		Kt,
		et,
		tt,
		qt,
		J,
		ft
	]);
	let Jt = z(null), Yt = xe || Fe;
	R(() => {
		if (Yt || !Jt.current) return;
		let e = Jt.current();
		Jt.current = null, e?.focus();
	}, [Yt]);
	let Xt = (e) => () => typeof document > "u" ? null : document.querySelector(`[data-testid="${e}"]`), Zt = L(() => {
		let e = typeof document > "u" ? null : document.querySelector("[aria-haspopup=\"menu\"][aria-expanded=\"true\"]");
		we.current = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), Ce(!0);
	}, [Ce]), Qt = L(() => {
		let e = we.current, t = Xt(`${W}-toolbar-insert`);
		Jt.current = () => e?.isConnected ? e : t(), Ce(!1);
	}, [W, Ce]), $t = z(null);
	R(() => {
		xe && $t.current?.focus();
	}, [xe]);
	let en = L(() => {
		Jt.current = Xt(`${W}-toolbar-present`), Ie(!1);
	}, [W]);
	if (E) {
		let t = (u.length > 0 ? u : [{
			id: d,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === d ? [...q.map((e, t) => {
				let n = G(ut.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ H("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...dt.map((e, t) => {
				let n = G(e.svg);
				return {
					id: e.id,
					index: q.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ H("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ H(Me, {
			title: e.title,
			revisions: t,
			revisionId: d,
			onRevisionChange: f,
			slideIndex: J + 1,
			onSlideChange: (e) => {
				let t = vt[e - 1];
				t && Re(t);
			},
			..._ ? { onDownload: _ } : {},
			className: he,
			"data-testid": `${W}-readonly`
		});
	}
	let tn = (() => {
		if (ht) {
			let e = G(ht.svg);
			return e ? /* @__PURE__ */ H("img", {
				src: e,
				alt: ht.title,
				className: "h-full w-full object-contain",
				"data-testid": `${W}-stage-image`
			}) : /* @__PURE__ */ H(c, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${W}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Y && st.has(Y.id)) return /* @__PURE__ */ H(a, {
			density: "compact",
			children: /* @__PURE__ */ H(ee, {
				title: "Add a source to preview this slide",
				description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
				testId: `${W}-preview-needs-source`
			})
		});
		let t = Y ? G(ut.get(Y.id)) : void 0;
		if (!ct && !t) return /* @__PURE__ */ H(a, {
			density: "compact",
			children: /* @__PURE__ */ H(ee, {
				title: "The preview waits for every slide's source",
				description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
				testId: `${W}-preview-needs-source`
			})
		});
		if (n === "loading" && ut.size === 0) return /* @__PURE__ */ H(ne, {
			label: "Rendering the deck…",
			testId: `${W}-preview-loading`
		});
		if (ct && typeof n == "object" && "error" in n) return /* @__PURE__ */ H(te, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => o(e),
			testId: `${W}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ H("img", {
			src: r,
			alt: Y.title || `Slide ${J + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${W}-stage-image`
		}) : /* @__PURE__ */ H(c, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${W}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), nn = u.map((e) => ({
		id: e.id,
		label: e.label
	})), rn = /* @__PURE__ */ U("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${W}-revision-controls`,
		children: [
			nn.length > 5 || (p?.count ?? 0) > 0 ? /* @__PURE__ */ H(C, {
				size: "sm",
				"aria-label": "Revision",
				value: d,
				onChange: (e) => Ee(e.target.value, f, p),
				options: Te(nn, p),
				className: "w-auto",
				"data-testid": `${W}-revision-select`
			}) : nn.length > 0 && /* @__PURE__ */ H(k, {
				items: nn,
				value: d,
				onValueChange: f,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${W}-revisions`
			}),
			/* @__PURE__ */ H(i, {
				variant: "primary",
				size: "sm",
				disabled: !Gt,
				onClick: Kt,
				"data-testid": `${W}-save`,
				children: ze ? "Saving…" : `Save as ${Bt(u)}`
			}),
			_ && /* @__PURE__ */ H(i, {
				variant: "secondary",
				size: "sm",
				onClick: _,
				"data-testid": `${W}-download`,
				children: "Download .pptx"
			})
		]
	}), an = Ue || oe ? /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ H(ue, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => K({
				...e,
				title: t
			}),
			"data-testid": `${W}-deck-title`
		}), /* @__PURE__ */ H(ue, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => K({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${W}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ H(T, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ H(S, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => K({
					...e,
					title: t.target.value
				}),
				"data-testid": `${W}-deck-title`
			})
		}), /* @__PURE__ */ H(T, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ H(S, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => K({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${W}-deck-subtitle`
			})
		})]
	}), X = v ? () => v(gt ? {
		slideId: gt,
		slideIndex: J + 1
	} : void 0) : () => {
		Ce(!1), Ie(!0);
	}, Z = /* @__PURE__ */ H(V, { children: /* @__PURE__ */ H(lr, {
		slide: Y,
		theme: e.theme ?? "product",
		...se?.length ? {
			themes: se,
			onThemeRefChange: (t) => K({
				...e,
				theme: t
			})
		} : {},
		onBrowseLayouts: Zt,
		onAddSlide: kt,
		canAddSlide: q.length < 40,
		onLayoutChange: (t) => {
			Y && K(Ft(e, At(Y, t)));
		},
		onThemeChange: (t) => K({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Y?.chart && K(Ft(e, {
				...Y,
				chart: {
					...Y.chart,
					kind: t
				}
			}));
		},
		onUndo: et,
		onRedo: tt,
		canUndo: nt,
		canRedo: rt,
		onPresent: X,
		testIdPrefix: `${W}-toolbar`
	}) }), on = /* @__PURE__ */ U("section", {
		"aria-label": "Choose a layout",
		className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto",
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), Qt());
		},
		"data-testid": `${W}-layout-panel`,
		children: [/* @__PURE__ */ U(s, {
			gap: "sm",
			align: "center",
			className: "shrink-0",
			"data-testid": `${W}-layout-panel-header`,
			children: [/* @__PURE__ */ U(i, {
				ref: $t,
				variant: "ghost",
				size: "sm",
				onClick: Qt,
				"aria-label": _t ? `Back to slide ${J + 1}: ${_t}` : "Back to the deck",
				"data-testid": `${W}-layout-back`,
				children: [/* @__PURE__ */ H(Or, { back: !0 }), "Back"]
			}), /* @__PURE__ */ H(c, {
				as: "div",
				size: "base",
				weight: "semibold",
				children: "Choose a layout"
			})]
		}), /* @__PURE__ */ H(xr, {
			previews: F,
			onSelect: (e) => {
				Qt(), kt(e) && (Jt.current = null);
			},
			testIdPrefix: `${W}-layout-gallery`
		})]
	}), Q = /* @__PURE__ */ U(V, { children: [Wt > 0 && /* @__PURE__ */ H(ae, {
		tone: "warning",
		"data-testid": `${W}-uncited-warning`,
		children: Wt === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${Wt} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), Ve && /* @__PURE__ */ H(ae, {
		tone: "error",
		onDismiss: () => He(null),
		"data-testid": `${W}-save-error`,
		children: Ve
	})] }), sn = Ue && /* @__PURE__ */ U(V, { children: [Xe && /* @__PURE__ */ H(ae, {
		tone: "error",
		onDismiss: () => Ze(null),
		"data-testid": `${W}-agent-error`,
		children: Xe
	}), Je && !Xe && /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${W}-agent-summary`,
		children: [
			/* @__PURE__ */ H(c, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${Je}`
			}),
			Qe.size > 0 && /* @__PURE__ */ H(c, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: Qe.size === 1 ? "1 slide marked in the filmstrip" : `${Qe.size} slides marked in the filmstrip`
			}),
			re && /* @__PURE__ */ H(i, {
				variant: "ghost",
				size: "sm",
				onClick: Ut,
				"data-testid": `${W}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), cn = Ue && Y && /* @__PURE__ */ H(pe, {
		fallback: /* @__PURE__ */ H(c, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${W}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ H(Dr, {
			scope: We,
			onScopeChange: Ge,
			slideLabel: `slide ${J + 1}`,
			busy: Ke,
			onSubmit: Ht,
			...O?.length ? { suggestions: O } : {},
			testIdPrefix: W
		})
	}), ln = {
		selectedSlide: Y,
		...ht ? { selectedGeneratedSlide: ht } : {},
		selectedIndex: J,
		slideCount: ft,
		selectSlide: wt,
		markChanged: (e) => $e(new Set(e))
	}, un = typeof N == "function" ? N(ln) : N, dn = un != null && un !== !1 ? un : cn ? /* @__PURE__ */ H(de, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${W}-dock-card`,
			children: [sn, cn]
		}),
		"data-testid": `${W}-dock`
	}) : null, fn = Y && /* @__PURE__ */ H(V, { children: Ue ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(Mn, {
		compact: !0,
		sources: Y.sources,
		onChange: (e) => Nt({
			...Y,
			sources: e
		}),
		options: m,
		onSearchSources: g,
		testIdPrefix: `${W}-slide`
	}), /* @__PURE__ */ H(b, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${W}-details`,
		children: /* @__PURE__ */ H(Jn, {
			slide: Y,
			onChange: Nt,
			sources: m,
			onSearchSources: g,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${W}-slide`
		})
	})] }) : /* @__PURE__ */ H(Jn, {
		slide: Y,
		onChange: Nt,
		sources: m,
		onSearchSources: g,
		showNotes: !1,
		testIdPrefix: `${W}-slide`
	}) }), pn = /* @__PURE__ */ U("div", {
		className: r("flex items-center justify-center gap-2", oe && "ml-auto shrink-0"),
		"data-testid": `${W}-slide-nav`,
		children: [
			/* @__PURE__ */ H(h, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ H(Or, { back: !0 }),
				disabled: J <= 0,
				onClick: () => qt(-1),
				"data-testid": `${W}-previous`
			}),
			/* @__PURE__ */ H(c, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${W}-position`,
				children: `Slide ${ft === 0 ? 0 : J + 1} of ${ft}`
			}),
			/* @__PURE__ */ H(h, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ H(Or, {}),
				disabled: J >= ft - 1,
				onClick: () => qt(1),
				"data-testid": `${W}-next`
			}),
			/* @__PURE__ */ H(j, {
				value: q.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${q.length} / 40`,
				className: "ml-2",
				"data-testid": `${W}-slide-meter`
			})
		]
	}), mn = /* @__PURE__ */ U("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${W}-body`,
		children: [/* @__PURE__ */ H(An, {
			items: Ct,
			selectedId: Y?.id ?? "",
			onSelect: wt,
			onMove: Ot,
			onDuplicate: jt,
			onDelete: Mt,
			onAdd: () => kt(),
			canAdd: q.length < 40,
			generatingSlideIds: xt,
			generatedItems: dt.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...A ? { slideViewers: A } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${W}-slide`
		}), xe ? on : /* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-hidden md:[container-type:size]",
			"data-testid": `${W}-main`,
			children: [/* @__PURE__ */ U("div", {
				className: "flex shrink-0 flex-col gap-3",
				"data-testid": `${W}-stage-region`,
				children: [/* @__PURE__ */ H("div", {
					className: "mx-auto w-full md:max-w-[calc(max(14rem,min(55cqh,100cqh_-_12rem))*16/9)]",
					"data-testid": `${W}-stage-frame`,
					children: /* @__PURE__ */ H(Xn, {
						generating: St,
						label: _t ? `Slide ${J + 1} of ${ft}: ${_t}` : "No slide",
						"data-testid": `${W}-stage`,
						children: tn
					})
				}), !oe && pn]
			}), /* @__PURE__ */ U("div", {
				ref: Ae,
				className: "flex min-w-0 flex-col gap-3 md:min-h-0 md:flex-1 md:overflow-y-auto",
				"data-testid": `${W}-form-region`,
				children: [ht && /* @__PURE__ */ H(c, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${W}-generated-note`,
					children: `${ht.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}), Y && /* @__PURE__ */ U("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ H(Tr, {
						value: Y.notes,
						onChange: (e) => Nt({
							...Y,
							notes: e
						}),
						"data-testid": `${W}-slide-notes`
					}), fn]
				})]
			})]
		})]
	}), $ = ct ? typeof n == "object" && "error" in n ? n.error : void 0 : "Add a source to each slide before presenting.", hn = !$ && (!w || n === "loading"), gn = [...q.map((e, t) => ({
		id: e.id,
		title: e.title || `Slide ${t + 1}`,
		...ut.get(e.id) ? { svg: ut.get(e.id) } : {},
		...e.notes ? { notes: e.notes } : {}
	})), ...dt.map((e) => ({
		id: e.id,
		title: e.title,
		generated: !0,
		...e.svg ? { svg: e.svg } : {}
	}))], _n = /* @__PURE__ */ H(Cr, {
		title: e.title,
		slides: gn,
		slideIndex: J,
		onSlideChange: (e) => {
			let t = vt[e];
			t && Re(t);
		},
		onExit: en,
		loading: hn,
		...$ ? { error: $ } : {},
		...ct && $ ? { onRetry: () => o(e) } : {},
		showNotes: x,
		testId: `${W}-present`
	}), vn = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (Fe) {
		let e = /* @__PURE__ */ H("div", {
			className: r("flex h-full min-h-0 flex-col", he),
			"data-testid": W,
			"data-presenting": "",
			children: _n
		});
		return oe ? /* @__PURE__ */ H(V, { children: oe({
			toolbar: null,
			actions: null,
			surface: e,
			footer: null
		}) }) : e;
	}
	if (oe) {
		let e = /* @__PURE__ */ U("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", he),
			"data-testid": W,
			onKeyDown: vn,
			children: [
				/* @__PURE__ */ U("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${W}-deck-line`,
					children: [an, pn]
				}),
				Q,
				mn
			]
		});
		return /* @__PURE__ */ H(V, { children: oe({
			toolbar: Z,
			actions: rn,
			surface: e,
			footer: dn
		}) });
	}
	return /* @__PURE__ */ U("div", {
		className: r("relative flex h-full min-h-0 flex-col", he),
		"data-testid": W,
		onKeyDown: vn,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ U("div", {
					className: r("flex flex-wrap justify-between gap-2", Ue ? "items-center" : "items-end"),
					...Ue ? { "data-testid": `${W}-deck-line` } : {},
					children: [an, rn]
				}), /* @__PURE__ */ H("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Z
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${W}-scroller`,
				children: [Q, mn]
			}),
			/* @__PURE__ */ H("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${W}-dock-row`,
				children: /* @__PURE__ */ H(fe.Provider, {
					value: "pinned",
					children: dn
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/TemplateGallery.tsx
var jr = 3;
function Mr(e) {
	return `${e} slide${e === 1 ? "" : "s"}`;
}
function Nr({ templates: e, onSelect: t, selectedId: n, loading: i = !1, loadingCount: a = 4, emptyTitle: o = "No templates yet", emptyDescription: s, label: l = "Deck templates", className: u, testIdPrefix: d = "template-gallery" }) {
	let f = "m-0 grid list-none grid-cols-1 gap-4 p-0 @md:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4";
	return i ? /* @__PURE__ */ H("div", {
		className: r("@container min-w-0", u),
		"data-testid": d,
		"data-state": "loading",
		"aria-busy": "true",
		children: /* @__PURE__ */ H("ul", {
			"aria-label": `${l}, loading`,
			className: f,
			children: Array.from({ length: a }, (e, t) => /* @__PURE__ */ U("li", {
				className: "flex min-w-0 flex-col gap-2",
				"data-testid": `${d}-placeholder`,
				children: [
					/* @__PURE__ */ H("span", {
						className: "block aspect-video w-full overflow-hidden rounded-md",
						children: /* @__PURE__ */ H(ie, {
							height: "100%",
							rounded: "md"
						})
					}),
					/* @__PURE__ */ H(ie, {
						height: 14,
						rounded: "md"
					}),
					/* @__PURE__ */ H(ie, {
						height: 12,
						rounded: "md"
					})
				]
			}, t))
		})
	}) : e.length ? /* @__PURE__ */ H("div", {
		className: r("@container min-w-0", u),
		"data-testid": d,
		children: /* @__PURE__ */ H("ul", {
			"aria-label": l,
			className: f,
			children: e.map((e) => {
				let [r, ...i] = e.previews, a = i.slice(0, jr), o = [Mr(e.slideCount), e.audience].filter(Boolean).join(" · ");
				return /* @__PURE__ */ H("li", {
					className: "min-w-0",
					children: /* @__PURE__ */ U(v, {
						selected: n === e.id,
						onSelect: () => t(e.id),
						className: "flex h-full flex-col gap-2",
						"data-testid": `${d}-${e.id}`,
						"data-template": e.id,
						children: [
							/* @__PURE__ */ H(br, { svg: r }),
							a.length > 0 && /* @__PURE__ */ H("span", {
								className: "grid grid-cols-3 gap-1.5",
								"data-testid": `${d}-${e.id}-strip`,
								children: a.map((e, t) => /* @__PURE__ */ H(br, {
									svg: e,
									className: "rounded-sm"
								}, t))
							}),
							/* @__PURE__ */ U("span", {
								className: "flex min-w-0 flex-col gap-0.5",
								children: [
									/* @__PURE__ */ H(c, {
										as: "span",
										size: "sm",
										weight: "medium",
										className: "block",
										truncate: !0,
										title: e.title,
										children: e.title
									}),
									/* @__PURE__ */ H(c, {
										as: "span",
										size: "xs",
										tone: "secondary",
										className: "block",
										clamp: 2,
										children: e.description
									}),
									/* @__PURE__ */ H(c, {
										as: "span",
										size: "xs",
										tone: "tertiary",
										className: "block",
										"data-testid": `${d}-${e.id}-facts`,
										children: o
									})
								]
							})
						]
					})
				}, e.id);
			})
		})
	}) : /* @__PURE__ */ H("div", {
		className: r("min-w-0", u),
		"data-testid": d,
		"data-state": "empty",
		children: /* @__PURE__ */ H(ee, {
			title: o,
			description: s,
			testId: `${d}-empty`
		})
	});
}
//#endregion
//#region src/components/doc-editor/ProposedEditStrip.tsx
var Pr = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function Fr(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => Pr[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function Ir(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function Lr({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [s, c] = B(!1), [l, u] = B(""), d = Fr(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ U("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ H(o, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: Ir(e)
					}),
					e.summary && /* @__PURE__ */ H("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ H("span", { className: "flex-1" }),
					f && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ H(oe, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ H(o, {
						size: "xs",
						tone: "success",
						"data-testid": `${a}-applied`,
						children: "Applied"
					}),
					!m && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							r && e.status === "ready" && /* @__PURE__ */ H(i, {
								size: "sm",
								variant: "ghost",
								"aria-expanded": s,
								onClick: () => c((e) => !e),
								"data-testid": `${a}-revise`,
								children: "Revise…"
							}),
							/* @__PURE__ */ H(i, {
								size: "sm",
								variant: "ghost",
								disabled: p,
								onClick: () => n(e.id),
								"data-testid": `${a}-discard`,
								children: f ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ H(i, {
								size: "sm",
								variant: "primary",
								disabled: f || p || !d,
								onClick: () => t(e.id),
								"data-testid": `${a}-apply`,
								children: p ? "Applying…" : "Apply"
							})
						]
					})
				]
			}),
			d && /* @__PURE__ */ H("p", {
				className: "m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary",
				"data-testid": `${a}-preview`,
				children: d
			}),
			s && r && /* @__PURE__ */ U("form", {
				className: "flex min-w-0 items-center gap-2",
				onSubmit: (t) => {
					t.preventDefault();
					let n = l.trim();
					!n || !r || (r(e.id, n), u(""), c(!1));
				},
				"data-testid": `${a}-revise-form`,
				children: [/* @__PURE__ */ H(S, {
					size: "sm",
					autoFocus: !0,
					value: l,
					onChange: (e) => u(e.target.value),
					onKeyDown: (e) => {
						e.key === "Escape" && (e.preventDefault(), c(!1));
					},
					placeholder: "How should it change?",
					"aria-label": "Revision instruction",
					className: "min-w-0 flex-1",
					"data-testid": `${a}-revise-input`
				}), /* @__PURE__ */ H(i, {
					type: "submit",
					size: "sm",
					variant: "secondary",
					disabled: !l.trim(),
					"data-testid": `${a}-revise-send`,
					children: "Send"
				})]
			})
		]
	});
}
function Rr({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
	let d = e.filter((e) => e.status !== "discarded");
	if (d.length === 0) return null;
	let f = d.filter((e) => e.status === "ready").length, p = d.filter((e) => e.status === "ready" || e.status === "streaming").length, m = c ?? (d.length === 1 ? "Proposed edit" : `${d.length} proposed edits`);
	return /* @__PURE__ */ U("section", {
		"data-ui-part": "",
		"aria-label": m,
		"aria-live": "polite",
		className: r("flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm", l),
		"data-testid": u,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ H("span", {
					className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
					"data-testid": `${u}-title`,
					children: m
				}),
				s && p > 1 && /* @__PURE__ */ H(i, {
					size: "sm",
					variant: "ghost",
					onClick: s,
					"data-testid": `${u}-discard-all`,
					children: "Discard all"
				}),
				o && f > 1 && /* @__PURE__ */ H(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${u}-apply-all`,
					children: "Apply all"
				})
			]
		}), /* @__PURE__ */ H("ul", {
			className: "m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0",
			children: d.map((e) => /* @__PURE__ */ H(Lr, {
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
export { ut as $, ot as A, Ce as At, gt as B, mt as C, At as Ct, Je as D, Me as Dt, Ue as E, G as Et, K as F, Ze as G, Qe as H, nt as I, it as J, Ge as K, tt as L, st as M, _t as N, Ye as O, we as Ot, Ke as P, ft as Q, et as R, wt as S, sn as St, He as T, Re as Tt, Xe as U, qe as V, Ve as W, dt as X, rt as Y, pt as Z, Mn as _, Ot as _t, Ar as a, yt as at, St as b, Nt as bt, Cr as c, Be as ct, er as d, Pt as dt, We as et, Zn as f, Rt as ft, Jn as g, Bt as gt, Xn as h, It as ht, Nr as i, vt as it, q as j, Y as k, Te as kt, xr as l, Lt as lt, tr as m, kt as mt, Ir as n, $e as nt, Tr as o, xt as ot, lr as p, Tt as pt, at as q, Fr as r, lt as rt, wr as s, bt as st, Rr as t, ct as tt, yr as u, Dt as ut, An as v, zt as vt, J as w, ze as wt, Ct as x, Et as xt, kn as y, Ft as yt, ht as z };
