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
import { t as ae } from "./Textarea-MJCZpfkl.js";
import { t as A } from "./DotMeter-B7TMlYNN.js";
import { t as j } from "./StatusDot-BE5sqjcB.js";
import { n as M, t as N } from "./RovingToolbar-CaWm5s1M.js";
import { t as oe } from "./InlineAlert-DoLPfet9.js";
import { t as se } from "./ThinkingDots-CL7iPQV1.js";
import { t as ce } from "./PresenceAvatars-g_VszLJh.js";
import { t as le } from "./useMeasuredWidth-Ba1Q33KU.js";
import { t as P } from "./SectionLabel-BVXGq_WP.js";
import { G as ue, U as de } from "./renderers-CHFmP6SP.js";
import { a as fe } from "./composerSendError-BajHkkpC.js";
import { t as pe } from "./InlineEditableText-B_sH74Yd.js";
import { i as me, t as he } from "./FloatingComposerDock-DWGsFjIv.js";
import { Suspense as ge, forwardRef as _e, lazy as ve, useCallback as F, useEffect as I, useId as ye, useImperativeHandle as be, useMemo as L, useRef as R, useState as z } from "react";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var xe = /* @__PURE__ */ new Set(["diagram", "presentation"]), Se = [
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
], Ce = [
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
function we(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function Te(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function Ee(t) {
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
function De({ open: e, onClose: i, onCreate: a, onCreateFromFixture: s, onSearchDocuments: c, recordings: l, initialShape: u }) {
	let [d, f] = z([]), [p, m] = z(!1), [h, g] = z(null), [_, y] = z(null), [b, w] = z(""), [T, E] = z(""), [D, ee] = z(!1), [te, ne] = z(""), [O, re] = z("page"), [k, ie] = z("blank"), [A, j] = z(""), [M, N] = z(""), [oe, se] = z([]), ce = R(null), le = R(null), P = ye(), fe = `${P}-blank-label`, pe = `${P}-type-label`, me = `${P}-cookbook-label`, he = `${P}-title`, ge = `${P}-description`, _e = `${P}-deck-from`, ve = `${P}-deck-source`;
	I(() => {
		if (!e) return;
		let r = n();
		f(r), g(null), y(null), w(""), E(""), ee(!1), ne(""), re(u ?? "page"), ie("blank"), j(""), N(""), se([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), g((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => ce.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let F = L(() => Se.filter((e) => we(e, b)), [b]), be = L(() => d.filter((e) => Te(e, b)), [d, b]), De = L(() => de.filter((e) => ue(e, b)), [b]);
	if (I(() => {
		if (!e || O !== "presentation") return;
		if (k === "blank") {
			se([]);
			return;
		}
		let t = M.trim().toLowerCase();
		if (k === "transcript") {
			let e = l ?? [];
			se(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!c) {
			se([]);
			return;
		}
		let n = !1;
		return Promise.resolve(c(M.trim())).then((e) => {
			n || se(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		O,
		k,
		M,
		l,
		c
	]), !e) return null;
	let Oe = d.find((e) => e.id === h), ke = _ ? de.find((e) => e.id === _) : void 0, Ae = O === "sections", je = !!ke || !!Oe, Me = d.length === 0 && !p && !ke, Ne = F.length === 0 && be.length === 0 && De.length === 0, Pe = ke ? {
		kind: "cookbook",
		cookbook: ke
	} : Oe && !xe.has(O) ? {
		kind: "type",
		type: Oe
	} : {
		kind: "blank",
		shape: O
	}, Fe = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), xe.has(O) && re("page"), D || E(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			re(e.shape), xe.has(e.shape) && (y(null), D || E(""));
			return;
		}
		y(null), g(e.type.id), D || E("");
	}, Ie = (e) => e.kind === "blank" ? e.shape : xe.has(O) ? "page" : O, Le = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let o = te.trim() || void 0;
		if (n === "presentation") {
			s ? s({
				from: k,
				...k !== "blank" && A ? { sourceId: A } : {},
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
			let t = Ee(e.cookbook);
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
	}, Re = O === "presentation" && k !== "blank" && !A, U = !!T.trim() && (!Ae || je) && !Re, W = () => {
		U && Le(Pe, T, Ie(Pe));
	};
	return /* @__PURE__ */ V(x, {
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
		children: /* @__PURE__ */ H("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && U && W();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ V("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ H("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ V(S, {
						ref: ce,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: b,
						onChange: (e) => w(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = De.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: De[0]
							} : F.length > 0 ? {
								kind: "blank",
								shape: F[0].id
							} : be.length > 0 ? {
								kind: "type",
								type: be[0]
							} : void 0;
							if (!t) return;
							Fe(t);
							let n = T.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								le.current?.focus();
								return;
							}
							Le(t, n, Ie(t));
						}
					}), /* @__PURE__ */ V("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ H("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						F.length > 0 && /* @__PURE__ */ H("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ V("div", {
								id: fe,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ V("div", {
								role: "group",
								"aria-labelledby": fe,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: F.map((e) => /* @__PURE__ */ H(v, {
									padding: "md",
									selected: O === e.id,
									onSelect: () => Fe({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ H("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ V("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ V("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ V(o, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ V("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						O === "presentation" && /* @__PURE__ */ H("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ V("label", {
									htmlFor: _e,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ V(C, {
									id: _e,
									value: k,
									options: Ce.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										ie(e.target.value), j(""), N("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ V("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: k === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								k !== "blank" && /* @__PURE__ */ H("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ V(S, {
										type: "search",
										value: M,
										onChange: (e) => N(e.target.value),
										"aria-label": k === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: k === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), oe.length === 0 ? /* @__PURE__ */ V("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: k === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : c ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H("label", {
										htmlFor: ve,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											k === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ V("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ V(C, {
										id: ve,
										required: !0,
										"aria-required": "true",
										value: A,
										placeholder: "Choose one…",
										options: oe.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => j(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						De.length > 0 && /* @__PURE__ */ H("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ H("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ V("div", {
									id: me,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ V("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: O === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : O === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : O === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ V("div", {
								role: "group",
								"aria-labelledby": me,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: De.map((e) => {
									let t = _ === e.id;
									return /* @__PURE__ */ H(v, {
										padding: "md",
										selected: t,
										onSelect: () => Fe({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ H("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ V("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ V("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ V("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ V("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						!xe.has(O) && (be.length > 0 || Me || d.length === 0 && p) && /* @__PURE__ */ H("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ H("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ V("span", {
										id: pe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !Ae && /* @__PURE__ */ V("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								d.length === 0 && p && /* @__PURE__ */ V("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Me && /* @__PURE__ */ V("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: Ae ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								be.length > 0 && /* @__PURE__ */ V("div", {
									role: "group",
									"aria-labelledby": pe,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: be.map((e) => {
										let t = !ke && h === e.id;
										return /* @__PURE__ */ H("button", {
											"data-ui-part": "",
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Fe({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ V("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ H("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ V("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ V("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ V("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: O === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ V("span", {
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
						Ne && /* @__PURE__ */ H("div", {
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
				/* @__PURE__ */ H("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ H("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ H("label", {
							htmlFor: he,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ V("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ V(S, {
							ref: le,
							id: he,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: T,
							onChange: (e) => {
								E(e.target.value), ee(!0);
							},
							placeholder: ke ? `e.g. ${ke.name}` : Oe ? `e.g. Q2 ${Oe.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ H("div", { children: [/* @__PURE__ */ H("label", {
						htmlFor: ge,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ V("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ V(ae, {
						id: ge,
						"data-testid": "new-doc-description",
						value: te,
						onChange: (e) => ne(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ H("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ V("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-submit",
						onClick: W,
						disabled: !U,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", U ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var Oe = "__older-revisions__";
function ke(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: Oe,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: Oe,
		label: `Older versions (${t.count})…`
	}), n;
}
function Ae(e, t, n) {
	if (e === "__older-revisions__") {
		n && !n.loading && n.onLoad();
		return;
	}
	t?.(e);
}
//#endregion
//#region src/lib/slideNavigationKey.ts
function je(e) {
	let t = e;
	return !t || typeof t.tagName != "string" ? !1 : t.isContentEditable ? !0 : t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT";
}
function Me(e) {
	if (e.ctrlKey || e.metaKey || e.altKey || je(e.target)) return null;
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
function Ne(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Pe = 5;
function Fe({ back: e }) {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ie({ title: e, subtitle: t, revisions: n, olderRevisions: o, revisionId: s, onRevisionChange: l, slideIndex: u, onSlideChange: d, onDownload: f, downloadLabel: p = "Download .pptx", onOpenPreview: m, pending: g, notice: _, state: v = "ready", errorMessage: b, ownerName: x, onRetry: S, maxSlideWidth: w, autoFocus: T = !1, className: E, "data-testid": D = "presentation-view" }) {
	let k = ye(), ie = R(null), ae = R(!1);
	if (I(() => {
		!T || ae.current || !ie.current || (ae.current = !0, ie.current.focus({ preventScroll: !0 }));
	}), v === "loading") return /* @__PURE__ */ V(ne, {
		label: "Opening the presentation…",
		testId: `${D}-loading`
	});
	if (v === "no-access") return /* @__PURE__ */ V(y, {
		resource: "this presentation",
		ownerName: x ?? null,
		testId: `${D}-no-access`
	});
	if (v === "error") return /* @__PURE__ */ V(te, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...S ? {
			actionLabel: "Try again",
			onAction: S
		} : {},
		testId: `${D}-error`
	});
	let A = n.find((e) => e.id === s) ?? n[0], j = A?.slides ?? [];
	if (v === "empty" || !A || j.length === 0) return /* @__PURE__ */ H("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", E),
		"data-testid": D,
		children: [/* @__PURE__ */ H("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ V(c, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ V(c, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${D}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ V(ee, {
			title: "No slides yet",
			description: g?.status === "generating" ? `${g.label} is still being generated.` : g?.status === "failed" ? g.message ?? `${g.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${D}-empty`
		})]
	});
	let M = j[Math.min(Math.max(u, 1), j.length) - 1];
	return /* @__PURE__ */ H("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", E),
		ref: ie,
		"data-testid": D,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${M.index} of ${j.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Me(e);
			if (!t) return;
			e.preventDefault();
			let n = Ne(t, M.index, j.length);
			n !== M.index && d(n);
		},
		children: [
			/* @__PURE__ */ H("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ H("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ V(c, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${D}-title`,
						children: e
					}), t && /* @__PURE__ */ V(c, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${D}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ H("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Pe || (o?.count ?? 0) > 0 ? /* @__PURE__ */ V(C, {
							"aria-label": "Revision",
							size: "sm",
							value: A.id,
							onChange: (e) => Ae(e.target.value, l, o),
							options: ke(n, o),
							className: "w-auto",
							"data-testid": `${D}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ V(a, {
							density: "compact",
							children: /* @__PURE__ */ V(O, {
								"aria-label": "Revision",
								value: A.id,
								onChange: l,
								options: n.map((e) => ({
									label: e.label,
									value: e.id
								})),
								"data-testid": `${D}-revisions`
							})
						}),
						g && /* @__PURE__ */ V(re, {
							state: g.status === "failed" ? "error" : "pending",
							label: `${g.label} ${g.status}`,
							"data-testid": `${D}-pending`
						}),
						f && /* @__PURE__ */ V(i, {
							variant: "secondary",
							size: "sm",
							onClick: f,
							"data-testid": `${D}-download`,
							children: p
						})
					]
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ H("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ V("div", {
						className: "flex min-h-0 flex-1 justify-center",
						children: /* @__PURE__ */ V("div", {
							className: r("flex h-full min-h-[12rem] w-auto max-w-full flex-1 items-center justify-center", "aspect-[16/9] overflow-hidden rounded-lg border border-border bg-surface-hover/40"),
							style: w === void 0 ? void 0 : { maxWidth: w },
							"data-testid": `${D}-stage`,
							children: M.preview ?? /* @__PURE__ */ V(c, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${D}-no-preview`,
								children: "This slide’s preview could not be read."
							})
						})
					}), /* @__PURE__ */ H("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ V(h, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ V(Fe, { back: !0 }),
								disabled: M.index <= 1,
								onClick: () => d(M.index - 1),
								"data-testid": `${D}-previous`
							}),
							/* @__PURE__ */ V(c, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${D}-position`,
								children: `Slide ${M.index} of ${j.length}`
							}),
							/* @__PURE__ */ V(h, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ V(Fe, {}),
								disabled: M.index >= j.length,
								onClick: () => d(M.index + 1),
								"data-testid": `${D}-next`
							}),
							m && M.preview && /* @__PURE__ */ V(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => m(M.id),
								"data-testid": `${D}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ H("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${D}-outline`,
					children: [/* @__PURE__ */ V(P, {
						as: "div",
						className: "mb-1",
						"data-testid": `${D}-outline-label`,
						children: /* @__PURE__ */ V("span", {
							id: k,
							children: "Slides"
						})
					}), /* @__PURE__ */ V("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: j.map((e) => /* @__PURE__ */ V("li", { children: /* @__PURE__ */ H("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => d(e.index),
							"aria-current": e.id === M.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === M.id && "bg-surface-hover font-medium"),
							"data-testid": `${D}-outline-row`,
							children: [/* @__PURE__ */ V("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ V("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			_ && /* @__PURE__ */ V(c, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${D}-notice`,
				children: _
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function Le(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/deckSpec.ts
var Re = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, U = [
	"highlight",
	"accent",
	"bold",
	"underline",
	"outline",
	"gradient"
];
function W(e) {
	return e === void 0 ? "" : (typeof e == "string" ? e : e.map((e) => e.text).join("")).replace(/\s+/g, " ").trim();
}
function ze(e) {
	return Array.isArray(e) ? e : void 0;
}
var Be = [
	"corner",
	"background",
	"title"
];
function Ve(e) {
	return typeof e == "string" ? e : e.map((e) => ({ ...e }));
}
function He(e) {
	let { title: t, bullets: n, ...r } = e;
	return {
		...r,
		title: W(t),
		...n ? { bullets: n.map((e) => W(e)) } : {}
	};
}
var Ue = 40, We = 8, Ge = 200, Ke = 120, qe = 200, Je = 60, Ye = 2e3, Xe = 24, Ze = 6, Qe = 400, $e = 10, et = 6, tt = 2, nt = 4, rt = 12, it = 60, at = 24, ot = 8, st = 5, ct = 40, lt = 5, ut = 120, dt = 40, ft = 140, pt = 3, mt = 6, ht = 16, gt = 40, _t = 80, vt = 6, yt = 80, G = 100, bt = 3, xt = 120, St = 100, Ct = 40, wt = 140, Tt = 3, Et = 4, K = 3, Dt = 5, Ot = 24, kt = 2, At = 8, jt = 40, Mt = 48, Nt = 80, Pt = 3, q = 5, J = 40, Ft = 60, It = 2e3, Lt = 200, Rt = 3, zt = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Bt = [
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
	"closing",
	"big-quote",
	"process",
	"cards",
	"matrix",
	"big-number",
	"image-text",
	"image-full",
	"people",
	"funnel",
	"kpi"
], Vt = [
	"image",
	"image-text",
	"image-full"
], Ht = [
	{
		id: "openers",
		label: "Openers",
		layouts: [
			"title",
			"section",
			"agenda",
			"big-quote"
		]
	},
	{
		id: "numbers",
		label: "Numbers",
		layouts: [
			"key-figures",
			"big-number",
			"kpi"
		]
	},
	{
		id: "lists",
		label: "Lists and steps",
		layouts: [
			"bullets",
			"two-column",
			"cards",
			"process",
			"timeline"
		]
	},
	{
		id: "comparisons",
		label: "Comparisons",
		layouts: [
			"comparison",
			"matrix",
			"table"
		]
	},
	{
		id: "charts",
		label: "Charts",
		layouts: ["chart", "funnel"]
	},
	{
		id: "people",
		label: "People",
		layouts: ["people", "quote"]
	},
	{
		id: "images",
		label: "Images",
		layouts: [
			"image",
			"image-text",
			"image-full"
		]
	},
	{
		id: "closers",
		label: "Closers",
		layouts: ["closing"]
	}
], Ut = {
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
	closing: "Closing",
	"big-quote": "Big quote",
	process: "Process",
	cards: "Cards",
	matrix: "Matrix",
	"big-number": "Big number",
	"image-text": "Image and text",
	"image-full": "Full-bleed image",
	people: "People",
	funnel: "Funnel",
	kpi: "KPI"
}, Wt = {
	title: "The opening slide: the deck title and who it is for.",
	section: "A divider that opens the next part of the talk.",
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
	closing: "The last word: a closing line, next steps and who to contact.",
	"big-quote": "One quotation set as the whole slide.",
	process: "Three to five numbered steps, each with an icon.",
	cards: "Three or four titled cards with an icon and a line each.",
	matrix: "A two-by-two: two axes and four quadrants.",
	"big-number": "One headline number and the story behind it.",
	"image-text": "A picture beside the words.",
	"image-full": "A picture filling the slide, the words over it.",
	people: "Two to eight people: name, role and a line each.",
	funnel: "Three to five stages, widest first, each with its count.",
	kpi: "Headline numbers above the chart that explains them."
}, Gt = [
	"bold",
	"editorial",
	"minimal",
	"playful",
	"corporate"
], Kt = {
	bold: "Bold",
	editorial: "Editorial",
	minimal: "Minimal",
	playful: "Playful",
	corporate: "Corporate"
}, qt = {
	bold: "Full-colour covers and dividers, heavy type.",
	editorial: "Serif headings, rules and a corner bracket.",
	minimal: "Quiet: white space, thin lines, no motif.",
	playful: "Rounded cards, a stronger tint, confetti and blobs.",
	corporate: "Arial, square corners, flat accent fields."
}, Jt = {
	corner: "Corner",
	background: "Background",
	title: "Beside the title"
}, Yt = [
	"bar",
	"line",
	"stacked-bar",
	"pie"
], Xt = {
	bar: "Bar",
	line: "Line",
	"stacked-bar": "Stacked bar",
	pie: "Pie"
}, Zt = [
	"product",
	"engineering",
	"plain"
];
function Qt(e) {
	return !!e && typeof e == "object" && typeof e.ref == "string";
}
function $t(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function en(e) {
	return e.slides.length > 0 && $t(e).length === 0;
}
function tn(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function nn(e, t = "bullets") {
	return rn({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function rn(e, t) {
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
	if (t === "timeline" && !n.timeline && (n.timeline = [
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
	]), t === "agenda" && !n.agenda && (n.agenda = { items: [""] }), t === "closing" && !n.closing && (n.closing = { line: "" }), t === "big-quote" && !n.quote && (n.quote = {
		text: "",
		by: ""
	}), (t === "image-text" || t === "image-full") && !n.image && (n.image = { alt: "" }), t === "cards" || t === "process") {
		let e = n.items ?? [];
		e.length < 3 && (n.items = [...e, ...Array.from({ length: Math.max(0, 3 - e.length) }, () => ({ title: "" }))]);
	}
	return t === "matrix" && !n.matrix && (n.matrix = {
		x: ["", ""],
		y: ["", ""],
		quadrants: [
			{ title: "" },
			{ title: "" },
			{ title: "" },
			{ title: "" }
		]
	}), t === "people" && !n.people && (n.people = [{
		name: "",
		role: ""
	}, {
		name: "",
		role: ""
	}]), t === "funnel" && !n.funnel && (n.funnel = [
		{
			label: "",
			value: ""
		},
		{
			label: "",
			value: ""
		},
		{
			label: "",
			value: ""
		}
	]), t === "big-number" && !n.figures?.length && (n.figures = [{
		value: "",
		label: ""
	}]), t === "kpi" && (n.figures ||= [{
		value: "",
		label: ""
	}, {
		value: "",
		label: ""
	}], n.chart ||= {
		kind: "bar",
		labels: ["Q1", "Q2"],
		series: [{
			name: "Series 1",
			values: [0, 0]
		}]
	}), n;
}
var an = {
	title: [],
	section: [],
	bullets: [],
	"two-column": ["columns"],
	chart: ["chart"],
	quote: ["quote"],
	image: ["image"],
	"key-figures": ["figures"],
	table: ["table"],
	comparison: ["comparison"],
	timeline: ["timeline"],
	agenda: ["agenda"],
	closing: ["closing"],
	"big-quote": ["quote"],
	process: ["items"],
	cards: ["items"],
	matrix: ["matrix"],
	"big-number": ["figures"],
	"image-text": ["image"],
	"image-full": ["image"],
	people: ["people"],
	funnel: ["funnel"],
	kpi: ["figures", "chart"]
}, on = [...new Set(Object.values(an).flat())];
function sn(e) {
	switch (e) {
		case "cards": return [3, 4];
		case "process": return [3, 5];
		case "people": return [2, 8];
		case "funnel": return [3, 5];
		case "big-number": return [1, 1];
		case "key-figures":
		case "kpi": return [2, 4];
		case "timeline": return [3, 6];
		default: return;
	}
}
function cn(e) {
	let t = an[e.layout], n = on.filter((n) => !t.includes(n) && e[n] !== void 0), r = sn(e.layout)?.[1], i = e.layout === "cards" || e.layout === "process" ? "items" : e.layout === "big-number" ? "figures" : void 0, a = i ? e[i] : void 0, o = i && r !== void 0 && a && a.length > r;
	if (!n.length && !o) return e;
	let s = { ...e };
	for (let e of n) delete s[e];
	return o && i === "items" && (s.items = e.items.slice(0, r)), o && i === "figures" && (s.figures = e.figures.slice(0, r)), s;
}
function ln(e) {
	let t = !1, n = e.slides.map((e) => {
		let n = cn(e);
		return n !== e && (t = !0), n;
	});
	return t ? {
		...e,
		slides: n
	} : e;
}
function un(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function dn(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function fn(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = nn(tn(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function pn(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: tn(e),
		title: Ve(r.title),
		bullets: r.bullets ? r.bullets.map(Ve) : void 0,
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
				...r.comparison.left,
				points: r.comparison.left.points.slice()
			},
			right: {
				...r.comparison.right,
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
		items: r.items ? r.items.map((e) => ({ ...e })) : void 0,
		matrix: r.matrix ? {
			x: [r.matrix.x[0], r.matrix.x[1]],
			y: [r.matrix.y[0], r.matrix.y[1]],
			quadrants: r.matrix.quadrants.map((e) => ({ ...e }))
		} : void 0,
		people: r.people ? r.people.map((e) => ({ ...e })) : void 0,
		funnel: r.funnel ? r.funnel.map((e) => ({ ...e })) : void 0,
		decoration: r.decoration && r.decoration !== "none" ? { ...r.decoration } : r.decoration,
		sources: r.sources.map((e) => ({ ...e }))
	};
	for (let e of Object.keys(i)) i[e] === void 0 && delete i[e];
	let a = e.slides.slice();
	return a.splice(n + 1, 0, i), {
		...e,
		slides: a
	};
}
function mn(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function hn(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
var gn = /^[a-z0-9]+(?:-[a-z0-9]+)*$/, _n = [], vn = [];
function yn(e) {
	return typeof e == "string" && (_n.length ? _n.includes(e) : gn.test(e));
}
function bn(e) {
	return typeof e == "string" && (vn.length ? vn.includes(e) : gn.test(e));
}
var xn = /* @__PURE__ */ new Set([
	"product",
	"engineering",
	"plain"
]), Sn = /* @__PURE__ */ new Set([
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
	"closing",
	"big-quote",
	"process",
	"cards",
	"matrix",
	"big-number",
	"image-text",
	"image-full",
	"people",
	"funnel",
	"kpi"
]), Cn = /* @__PURE__ */ new Set([
	"title",
	"subtitle",
	"theme",
	"slides"
]), wn = /* @__PURE__ */ new Set([
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
	"items",
	"matrix",
	"people",
	"funnel",
	"decoration",
	"notes",
	"sources"
]), Tn = /* @__PURE__ */ new Set(["ref"]), En = /* @__PURE__ */ new Set([
	"documentId",
	"anchor",
	"title"
]), Dn = /* @__PURE__ */ new Set([
	"kind",
	"labels",
	"series"
]), On = /* @__PURE__ */ new Set([
	"bar",
	"line",
	"stacked-bar",
	"pie"
]), kn = /* @__PURE__ */ new Set(["name", "values"]), An = /* @__PURE__ */ new Set(["text", "by"]), jn = /* @__PURE__ */ new Set([
	"alt",
	"assetId",
	"url",
	"side"
]), Mn = /* @__PURE__ */ new Set([
	"value",
	"label",
	"delta",
	"context",
	"icon"
]), Nn = /* @__PURE__ */ new Set([
	"title",
	"text",
	"icon"
]), Pn = /* @__PURE__ */ new Set([
	"x",
	"y",
	"quadrants"
]), Fn = /* @__PURE__ */ new Set([
	"name",
	"role",
	"detail",
	"assetId"
]), In = /* @__PURE__ */ new Set([
	"label",
	"value",
	"detail"
]), Ln = {
	chart: ["chart", "kpi"],
	quote: ["quote", "big-quote"],
	image: [
		"image",
		"image-text",
		"image-full"
	],
	figures: [
		"key-figures",
		"big-number",
		"kpi"
	],
	table: ["table"],
	comparison: ["comparison"],
	timeline: ["timeline"],
	agenda: ["agenda"],
	closing: ["closing"],
	items: ["cards", "process"],
	matrix: ["matrix"],
	people: ["people"],
	funnel: ["funnel"]
}, Rn = /* @__PURE__ */ new Set(["header", "rows"]), zn = /* @__PURE__ */ new Set([
	"left",
	"right",
	"verdict"
]), Bn = /* @__PURE__ */ new Set([
	"title",
	"points",
	"icon"
]), Vn = /* @__PURE__ */ new Set([
	"date",
	"label",
	"detail"
]), Hn = /* @__PURE__ */ new Set(["items", "current"]), Un = /* @__PURE__ */ new Set([
	"line",
	"nextSteps",
	"contact"
]);
function Y(e) {
	return !!e && typeof e == "object" && !Array.isArray(e);
}
function Wn(e) {
	if (typeof e == "string") return e.replace(/\s+/g, " ").trim() || void 0;
}
function Gn(e) {
	if (typeof e == "string") return e.replace(/[ \t]+$/gm, "").trim() || void 0;
}
function X(e, t) {
	return Object.keys(e).filter((n) => !t.has(n) && e[n] !== void 0);
}
function Kn(e, t = {}) {
	_n = t.iconNames ?? [], vn = t.graphicNames ?? [];
	let n = [];
	if (!Y(e)) return {
		ok: !1,
		errors: ["deck: expected an object"]
	};
	for (let t of X(e, Cn)) n.push(`deck: unknown field '${t}'`);
	let r = Wn(e.title);
	r ? r.length > 120 && n.push("deck.title: longer than 120 characters") : n.push("deck.title: required");
	let i = Wn(e.subtitle);
	e.subtitle !== void 0 && !i && n.push("deck.subtitle: must be a non-empty string when present"), i && i.length > 200 && n.push("deck.subtitle: longer than 200 characters");
	let a;
	if (e.theme !== void 0 && (a = qn(e.theme, n)), !Array.isArray(e.slides) || e.slides.length === 0) return n.push("deck.slides: at least one slide is required"), {
		ok: !1,
		errors: n
	};
	e.slides.length > 40 && n.push(`deck.slides: ${e.slides.length} slides, the cap is 40`);
	let o = [], s = /* @__PURE__ */ new Set();
	return e.slides.slice(0, 40).forEach((e, t) => {
		let r = Jn(e, t, s, n);
		r && o.push(r);
	}), n.length ? {
		ok: !1,
		errors: n
	} : {
		ok: !0,
		spec: {
			title: r,
			...i ? { subtitle: i } : {},
			...a ? { theme: a } : {},
			slides: o
		}
	};
}
function qn(e, t) {
	let n = "deck.theme: must be 'product', 'engineering', 'plain' or { ref: '<theme id>' } naming a theme you were given";
	if (typeof e == "string") {
		if (xn.has(e)) return e;
		t.push(n);
		return;
	}
	if (!Y(e)) {
		t.push(n);
		return;
	}
	let r = X(e, Tn);
	if (r.length) {
		t.push(`deck.theme: a deck names its theme and never describes it; only { ref } is accepted, not ${r.map((e) => `'${e}'`).join(", ")}`);
		return;
	}
	let i = typeof e.ref == "string" ? e.ref.trim() : "";
	if (!Re.test(i)) {
		t.push(`deck.theme.ref: must match ${Re} (a theme id you were given)`);
		return;
	}
	return { ref: i };
}
function Jn(e, t, n, r) {
	let i = `slides[${t}]`;
	if (!Y(e)) return r.push(`${i}: expected an object`), null;
	for (let t of X(e, wn)) r.push(`${i}: unknown field '${t}'`);
	let a = typeof e.id == "string" ? e.id.trim() : "";
	zt.test(a) ? n.has(a) ? r.push(`${i}.id: '${a}' is used twice`) : n.add(a) : r.push(`${i}.id: must match ${zt} (letters, digits, '_' and '-')`);
	let o = typeof e.layout == "string" ? e.layout : "";
	Sn.has(o) || r.push(`${i}.layout: must be one of ${[...Sn].join(", ")}`);
	let s = e.title === void 0 ? void 0 : Qn(e.title, `${i}.title`, 120, r);
	e.title === void 0 && r.push(`${i}.title: required`);
	let c = Wn(e.eyebrow);
	e.eyebrow !== void 0 && !c && r.push(`${i}.eyebrow: must be a non-empty string when present`), c && c.length > 60 && r.push(`${i}.eyebrow: longer than 60 characters`);
	let l = Gn(e.notes);
	l && l.length > 2e3 && r.push(`${i}.notes: longer than ${Ye} characters`);
	let u = e.bullets === void 0 ? void 0 : $n(e.bullets, `${i}.bullets`, r), d = e.columns === void 0 ? void 0 : tr(e.columns, i, r), f = e.chart === void 0 ? void 0 : nr(e.chart, `${i}.chart`, r), p = e.quote === void 0 ? void 0 : rr(e.quote, `${i}.quote`, r), m = e.image === void 0 ? void 0 : ir(e.image, `${i}.image`, r), h = o === "big-number" ? [1, 1] : [2, 4], g = e.figures === void 0 ? void 0 : fr(e.figures, `${i}.figures`, r, h), _ = e.table === void 0 ? void 0 : pr(e.table, `${i}.table`, r), v = e.comparison === void 0 ? void 0 : mr(e.comparison, `${i}.comparison`, r), y = e.timeline === void 0 ? void 0 : hr(e.timeline, `${i}.timeline`, r), b = e.agenda === void 0 ? void 0 : gr(e.agenda, `${i}.agenda`, r), x = e.closing === void 0 ? void 0 : _r(e.closing, `${i}.closing`, r), S = o === "process" ? [3, 5] : [3, 4], C = e.items === void 0 ? void 0 : sr(e.items, `${i}.items`, S, r), w = e.matrix === void 0 ? void 0 : cr(e.matrix, `${i}.matrix`, r), T = e.people === void 0 ? void 0 : lr(e.people, `${i}.people`, r), E = e.funnel === void 0 ? void 0 : ur(e.funnel, `${i}.funnel`, r);
	o === "bullets" && !u?.length && r.push(`${i}: a 'bullets' slide needs at least one bullet`), o === "two-column" && !d && r.push(`${i}: a 'two-column' slide needs columns`), o === "chart" && !f && r.push(`${i}: a 'chart' slide needs a chart`), o === "kpi" && !f && e.chart === void 0 && r.push(`${i}: a 'kpi' slide needs a chart`), o === "quote" && !p && r.push(`${i}: a 'quote' slide needs a quote`), o === "big-quote" && !p && e.quote === void 0 && r.push(`${i}: a 'big-quote' slide needs a quote`), o === "image" && !m && r.push(`${i}: an 'image' slide needs image.alt`), (o === "image-text" || o === "image-full") && !m && e.image === void 0 && r.push(`${i}: an '${o}' slide needs image.alt`), o === "big-number" && e.bullets !== void 0 && Array.isArray(e.bullets) && e.bullets.length > 3 && r.push(`${i}.bullets: a 'big-number' story takes at most 3 bullets`), d && o !== "two-column" && r.push(`${i}.columns: only a 'two-column' slide may carry columns`);
	let D = [
		[f, "chart"],
		[p, "quote"],
		[m, "image"],
		[g, "figures"],
		[_, "table"],
		[v, "comparison"],
		[y, "timeline"],
		[b, "agenda"],
		[x, "closing"],
		[C, "items"],
		[w, "matrix"],
		[T, "people"],
		[E, "funnel"]
	];
	for (let [t, n] of D) {
		let a = Ln[n], s = a.length === 1 ? `a '${a[0]}' slide` : `${a.map((e) => `'${e}'`).join(", ")} slides`;
		if ([
			"figures",
			"table",
			"comparison",
			"timeline",
			"agenda",
			"closing",
			"items",
			"matrix",
			"people",
			"funnel"
		].includes(n) && a.includes(o) && !t && e[n] === void 0 && r.push(`${i}: a '${o}' slide needs ${n}`), t && !a.includes(o)) {
			let e = {
				chart: "a chart",
				quote: "a quote",
				image: "an image"
			}[n] ?? n;
			r.push(`${i}.${n}: only ${s} may carry ${e}`);
		}
	}
	o === "chart" && f && f.kind === "pie" && f.series.length !== 1 && r.push(`${i}.chart.series: a pie takes exactly one series`), o === "chart" && f && f.kind === "pie" && f.labels.length > 6 && r.push(`${i}.chart.labels: a pie takes at most 6 slices`);
	let ee = vr(e.sources, i, r), te = e.decoration === void 0 ? void 0 : Xn(e.decoration, `${i}.decoration`, r);
	return !a || !s || !Sn.has(o) ? null : {
		id: a,
		layout: o,
		title: s,
		...c ? { eyebrow: c } : {},
		...u?.length ? { bullets: u } : {},
		...d ? { columns: d } : {},
		...f ? { chart: f } : {},
		...p ? { quote: p } : {},
		...m ? { image: m } : {},
		...g ? { figures: g } : {},
		..._ ? { table: _ } : {},
		...v ? { comparison: v } : {},
		...y ? { timeline: y } : {},
		...b ? { agenda: b } : {},
		...x ? { closing: x } : {},
		...C ? { items: C } : {},
		...w ? { matrix: w } : {},
		...T ? { people: T } : {},
		...E ? { funnel: E } : {},
		...te ? { decoration: te } : {},
		...l ? { notes: l } : {},
		sources: ee
	};
}
var Yn = /* @__PURE__ */ new Set(["graphic", "placement"]);
function Xn(e, t, n) {
	if (e === "none") return "none";
	if (!Y(e)) {
		n.push(`${t}: expected 'none' or { graphic, placement? }`);
		return;
	}
	for (let r of X(e, Yn)) n.push(`${t}: unknown field '${r}'`);
	if (!bn(e.graphic)) {
		n.push(`${t}.graphic: unknown graphic '${String(e.graphic)}'; use one of ${vn.join(", ")}`);
		return;
	}
	if (e.placement !== void 0 && !Be.includes(e.placement)) {
		n.push(`${t}.placement: must be one of ${Be.join(", ")}`);
		return;
	}
	return {
		graphic: e.graphic,
		...e.placement ? { placement: e.placement } : {}
	};
}
var Zn = /* @__PURE__ */ new Set(["text", "emphasis"]);
function Qn(e, t, n, r) {
	if (typeof e == "string") {
		let i = Wn(e);
		if (!i) {
			r.push(`${t}: must be a non-empty string`);
			return;
		}
		if (i.length > n) {
			r.push(`${t}: longer than ${n} characters`);
			return;
		}
		return i;
	}
	if (!Array.isArray(e)) {
		r.push(`${t}: expected a string or an array of runs`);
		return;
	}
	if (!e.length) {
		r.push(`${t}: an array of runs must not be empty`);
		return;
	}
	let i = [], a = !0;
	if (e.forEach((e, n) => {
		if (!Y(e)) {
			r.push(`${t}[${n}]: expected a run { text, emphasis? }`), a = !1;
			return;
		}
		for (let i of X(e, Zn)) r.push(`${t}[${n}]: unknown field '${i}'`), a = !1;
		if (typeof e.text != "string" || !e.text.trim()) {
			r.push(`${t}[${n}].text: must be a non-empty string`), a = !1;
			return;
		}
		if (e.emphasis !== void 0 && !U.includes(e.emphasis)) {
			r.push(`${t}[${n}].emphasis: must be one of ${U.join(", ")}`), a = !1;
			return;
		}
		i.push({
			text: e.text.replace(/[\t\r\n]+/g, " "),
			...e.emphasis ? { emphasis: e.emphasis } : {}
		});
	}), a) {
		if (W(i).length > n) {
			r.push(`${t}: longer than ${n} characters`);
			return;
		}
		return i;
	}
}
function $n(e, t, n) {
	if (!Array.isArray(e)) return n.push(`${t}: expected an array of strings or runs`), [];
	e.length > 8 && n.push(`${t}: ${e.length} bullets, the cap is 8`);
	let r = [];
	return e.slice(0, 8).forEach((e, i) => {
		let a = Qn(e, `${t}[${i}]`, 200, n);
		a !== void 0 && r.push(a);
	}), r;
}
function er(e, t, n) {
	if (!Array.isArray(e)) return n.push(`${t}: expected an array of strings`), [];
	e.length > 8 && n.push(`${t}: ${e.length} bullets, the cap is 8`);
	let r = [];
	return e.slice(0, 8).forEach((e, i) => {
		let a = Wn(e);
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
function tr(e, t, n) {
	if (!Array.isArray(e) || e.length !== 2) {
		n.push(`${t}.columns: expected exactly two arrays of bullets`);
		return;
	}
	let r = er(e[0], `${t}.columns[0]`, n), i = er(e[1], `${t}.columns[1]`, n);
	if (!r.length && !i.length) {
		n.push(`${t}.columns: both columns are empty`);
		return;
	}
	return [r, i];
}
function nr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of X(e, Dn)) n.push(`${t}: unknown field '${r}'`);
	let r = typeof e.kind == "string" && On.has(e.kind) ? e.kind : void 0;
	r || n.push(`${t}.kind: must be 'bar', 'line', 'stacked-bar' or 'pie'`);
	let i = [];
	!Array.isArray(e.labels) || e.labels.length === 0 ? n.push(`${t}.labels: at least one label is required`) : (e.labels.length > 24 && n.push(`${t}.labels: ${e.labels.length} labels, the cap is 24`), e.labels.slice(0, 24).forEach((e, r) => {
		let a = Wn(e);
		if (!a) {
			n.push(`${t}.labels[${r}]: must be a non-empty string`);
			return;
		}
		i.push(a.slice(0, 40));
	}));
	let a = [];
	if (!Array.isArray(e.series) || e.series.length === 0 ? n.push(`${t}.series: at least one series is required`) : (e.series.length > 6 && n.push(`${t}.series: ${e.series.length} series, the cap is 6`), e.series.slice(0, 6).forEach((e, o) => {
		let s = `${t}.series[${o}]`;
		if (!Y(e)) {
			n.push(`${s}: expected an object`);
			return;
		}
		for (let t of X(e, kn)) n.push(`${s}: unknown field '${t}'`);
		let c = Wn(e.name);
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
function rr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of X(e, An)) n.push(`${t}: unknown field '${r}'`);
	let r = Wn(e.text), i = Wn(e.by);
	if (r ? r.length > 400 && n.push(`${t}.text: longer than 400 characters`) : n.push(`${t}.text: required`), i || n.push(`${t}.by: required — an unattributed quote is not a source`), !(!r || !i)) return {
		text: r,
		by: i.slice(0, 80)
	};
}
function ir(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of X(e, jn)) n.push(`${t}: unknown field '${r}'`);
	let r = Wn(e.alt);
	if (!r) {
		n.push(`${t}.alt: required`);
		return;
	}
	if (r.length > 200) {
		n.push(`${t}.alt: longer than 200 characters`);
		return;
	}
	let i = Z(e.assetId, `${t}.assetId`, 200, n, !1), a;
	e.url !== void 0 && (a = typeof e.url == "string" ? e.url.trim() : "", (!/^https:\/\/[^\s]+$/.test(a) || a.length > 2e3) && (n.push(`${t}.url: must be an https URL of at most ${It} characters`), a = void 0)), e.side !== void 0 && e.side !== "left" && e.side !== "right" && n.push(`${t}.side: must be 'left' or 'right'`);
	let o = e.side === "left" || e.side === "right" ? e.side : void 0;
	return {
		alt: r,
		...i ? { assetId: i } : {},
		...a ? { url: a } : {},
		...o ? { side: o } : {}
	};
}
function ar(e, t, n) {
	if (e !== void 0) {
		if (!yn(e)) {
			n.push(`${t}: unknown icon '${String(e)}'; use one of ${_n.join(", ")}`);
			return;
		}
		return e;
	}
}
function or(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { title, text?, icon? }`);
		return;
	}
	for (let r of X(e, Nn)) n.push(`${t}: unknown field '${r}'`);
	let r = Z(e.title, `${t}.title`, 40, n), i = Z(e.text, `${t}.text`, 140, n, !1), a = ar(e.icon, `${t}.icon`, n);
	return r ? {
		title: r,
		...i ? { text: i } : {},
		...a ? { icon: a } : {}
	} : void 0;
}
function sr(e, t, [n, r], i) {
	if (!Array.isArray(e)) {
		i.push(`${t}: expected an array of { title, text?, icon? }`);
		return;
	}
	(e.length < n || e.length > r) && i.push(`${t}: ${e.length} items, expected ${n} to ${r}`);
	let a = i.length, o = e.slice(0, r).map((e, n) => or(e, `${t}[${n}]`, i));
	return i.length === a && e.length >= n && e.length <= r ? o : void 0;
}
function cr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { x, y, quadrants }`);
		return;
	}
	for (let r of X(e, Pn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = dr(e.x, `${t}.x`, 2, 2, 24, n), a = dr(e.y, `${t}.y`, 2, 2, 24, n);
	if (!Array.isArray(e.quadrants) || e.quadrants.length !== 4) {
		n.push(`${t}.quadrants: exactly four { title, text?, icon? }, top-left, top-right, bottom-left, bottom-right`);
		return;
	}
	let o = e.quadrants.map((e, r) => or(e, `${t}.quadrants[${r}]`, n));
	if (n.length === r) return {
		x: i,
		y: a,
		quadrants: o
	};
}
function lr(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { name, role, detail?, assetId? }`);
		return;
	}
	(e.length < 2 || e.length > 8) && n.push(`${t}: ${e.length} people, expected 2 to 8`);
	let r = n.length, i = [];
	return e.slice(0, 8).forEach((e, r) => {
		let a = `${t}[${r}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of X(e, Fn)) n.push(`${a}: unknown field '${t}'`);
		let o = Z(e.name, `${a}.name`, 40, n), s = Z(e.role, `${a}.role`, 48, n), c = Z(e.detail, `${a}.detail`, 80, n, !1), l = Z(e.assetId, `${a}.assetId`, 200, n, !1);
		o && s && i.push({
			name: o,
			role: s,
			...c ? { detail: c } : {},
			...l ? { assetId: l } : {}
		});
	}), n.length === r && e.length >= 2 && e.length <= 8 ? i : void 0;
}
function ur(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { label, value, detail? }`);
		return;
	}
	(e.length < 3 || e.length > 5) && n.push(`${t}: ${e.length} stages, expected 3 to 5`);
	let r = n.length, i = [];
	return e.slice(0, 5).forEach((e, r) => {
		let a = `${t}[${r}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of X(e, In)) n.push(`${a}: unknown field '${t}'`);
		let o = Z(e.label, `${a}.label`, 40, n), s = Z(e.value, `${a}.value`, 12, n), c = Z(e.detail, `${a}.detail`, 60, n, !1);
		o && s && i.push({
			label: o,
			value: s,
			...c ? { detail: c } : {}
		});
	}), n.length === r && e.length >= 3 && e.length <= 5 ? i : void 0;
}
function Z(e, t, n, r, i = !0) {
	let a = Wn(e);
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
function dr(e, t, n, r, i, a) {
	if (!Array.isArray(e)) return a.push(`${t}: expected an array of strings`), [];
	e.length < n && a.push(`${t}: ${e.length} item${e.length === 1 ? "" : "s"}, at least ${n} needed`), e.length > r && a.push(`${t}: ${e.length} items, the cap is ${r}`);
	let o = [];
	return e.slice(0, r).forEach((e, n) => {
		let r = Z(e, `${t}[${n}]`, i, a);
		r && o.push(r);
	}), o;
}
function fr(e, t, n, [r, i] = [2, 4]) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { value, label, delta?, context?, icon? }`);
		return;
	}
	(e.length < r || e.length > i) && n.push(`${t}: ${e.length} figures, expected ${r === i ? `exactly ${r}` : `${r} to ${i}`}`);
	let a = [];
	return e.slice(0, 4).forEach((e, r) => {
		let i = `${t}[${r}]`;
		if (!Y(e)) {
			n.push(`${i}: expected an object`);
			return;
		}
		for (let t of X(e, Mn)) n.push(`${i}: unknown field '${t}'`);
		let o = Z(e.value, `${i}.value`, 12, n), s = Z(e.label, `${i}.label`, 60, n), c = Z(e.delta, `${i}.delta`, 24, n, !1), l = Z(e.context, `${i}.context`, 60, n, !1), u = ar(e.icon, `${i}.icon`, n);
		o && s && a.push({
			value: o,
			label: s,
			...c ? { delta: c } : {},
			...l ? { context: l } : {},
			...u ? { icon: u } : {}
		});
	}), a.length >= r && a.length <= i && a.length === e.length ? a : void 0;
}
function pr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { header, rows }`);
		return;
	}
	for (let r of X(e, Rn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = dr(e.header, `${t}.header`, 1, 5, 40, n), a = [];
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
		let s = e.map((e, t) => e === "" ? "" : Z(e, `${o}[${t}]`, 40, n) ?? "");
		a.push(s);
	})), n.length === r ? {
		header: i,
		rows: a
	} : void 0;
}
function mr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { left, right, verdict? }`);
		return;
	}
	for (let r of X(e, zn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = (e, t) => {
		if (!Y(e)) {
			n.push(`${t}: expected { title, points }`);
			return;
		}
		for (let r of X(e, Bn)) n.push(`${t}: unknown field '${r}'`);
		let r = Z(e.title, `${t}.title`, 40, n), i = dr(e.points, `${t}.points`, 1, 5, 120, n), a = ar(e.icon, `${t}.icon`, n);
		return r ? {
			title: r,
			points: i,
			...a ? { icon: a } : {}
		} : void 0;
	}, a = i(e.left, `${t}.left`), o = i(e.right, `${t}.right`), s = Z(e.verdict, `${t}.verdict`, 140, n, !1);
	if (!(n.length !== r || !a || !o)) return {
		left: a,
		right: o,
		...s ? { verdict: s } : {}
	};
}
function hr(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { date, label, detail? }`);
		return;
	}
	let r = n.length;
	(e.length < 3 || e.length > 6) && n.push(`${t}: ${e.length} steps, expected 3 to 6`);
	let i = [];
	return e.slice(0, 6).forEach((e, r) => {
		let a = `${t}[${r}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of X(e, Vn)) n.push(`${a}: unknown field '${t}'`);
		let o = Z(e.date, `${a}.date`, 16, n), s = Z(e.label, `${a}.label`, 40, n), c = Z(e.detail, `${a}.detail`, 80, n, !1);
		o && s && i.push({
			date: o,
			label: s,
			...c ? { detail: c } : {}
		});
	}), n.length === r ? i : void 0;
}
function gr(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { items, current? }`);
		return;
	}
	for (let r of X(e, Hn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = dr(e.items, `${t}.items`, 1, 6, 80, n), a;
	return e.current !== void 0 && (typeof e.current != "number" || !Number.isInteger(e.current) || e.current < 0 || e.current >= i.length ? n.push(`${t}.current: must be the 0-based position of one of the ${i.length} items`) : a = e.current), n.length === r ? {
		items: i,
		...a === void 0 ? {} : { current: a }
	} : void 0;
}
function _r(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { line, nextSteps?, contact? }`);
		return;
	}
	for (let r of X(e, Un)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = Z(e.line, `${t}.line`, 100, n), a = e.nextSteps === void 0 ? void 0 : dr(e.nextSteps, `${t}.nextSteps`, 1, 3, 120, n), o = Z(e.contact, `${t}.contact`, 100, n, !1);
	if (!(n.length !== r || !i)) return {
		line: i,
		...a?.length ? { nextSteps: a } : {},
		...o ? { contact: o } : {}
	};
}
function vr(e, t, n) {
	if (!Array.isArray(e) || e.length === 0) return n.push(`${t}.sources: every slide must cite at least one source document`), [];
	e.length > 10 && n.push(`${t}.sources: ${e.length} sources, the cap is 10`);
	let r = [];
	return e.slice(0, 10).forEach((e, i) => {
		let a = `${t}.sources[${i}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of X(e, En)) n.push(`${a}: unknown field '${t}'`);
		let o = Wn(e.documentId), s = Wn(e.title), c = Wn(e.anchor);
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
function yr(e, t, n) {
	let r = t.replace(/\[(\d+)\]/g, ".$1").split("."), i = /* @__PURE__ */ new Set([
		"title",
		"value",
		"label",
		"name",
		"role",
		"date",
		"text",
		"by",
		"alt",
		"line"
	]), a = (e, t) => {
		let o = r[t], s = /^\d+$/.test(o) ? Number(o) : void 0;
		if (Array.isArray(e)) {
			if (s === void 0 || s >= e.length) return e;
			let i = e.slice();
			return i[s] = t === r.length - 1 ? n : a(e[s], t + 1), i;
		}
		if (!e || typeof e != "object") return e;
		let c = e;
		if (t === r.length - 1) {
			let e = { ...c }, a = !i.has(o) || o === "text" && r[0] !== "quote";
			return (n === "" || n === void 0) && a && t > 0 ? delete e[o] : e[o] = n, e;
		}
		return o in c ? {
			...c,
			[o]: a(c[o], t + 1)
		} : e;
	};
	return a(e, 0);
}
var br = {
	bullets: () => "",
	items: () => ({ title: "" }),
	figures: () => ({
		value: "",
		label: ""
	}),
	people: () => ({
		name: "",
		role: ""
	}),
	funnel: () => ({
		label: "",
		value: ""
	}),
	timeline: () => ({
		date: "",
		label: ""
	})
};
function xr(e, t) {
	return t === "bullets" ? [+(e.layout === "bullets"), e.layout === "big-number" ? 3 : 8] : sn(e.layout) ?? [0, 0];
}
function Sr(e, t) {
	if (!(t in br)) return;
	let n = e[t];
	return Array.isArray(n) ? n : t === "bullets" ? [] : void 0;
}
function Cr(e, t, n) {
	let r = Sr(e, t);
	if (!r || r.length >= xr(e, t)[1]) return e;
	let i = r.slice();
	return i.splice(Math.min(Math.max(n + 1, 0), i.length), 0, br[t]()), {
		...e,
		[t]: i
	};
}
function wr(e, t, n) {
	let r = Sr(e, t);
	return !r || n < 0 || n >= r.length || r.length <= xr(e, t)[0] ? e : {
		...e,
		[t]: r.filter((e, t) => t !== n)
	};
}
function Tr(e, t, n, r) {
	let i = Sr(e, t);
	if (!i || n < 0 || r < 0 || n >= i.length || r >= i.length || n === r) return e;
	let a = i.slice(), [o] = a.splice(n, 1);
	return a.splice(r, 0, o), {
		...e,
		[t]: a
	};
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function Er(e) {
	return `${e.length === 1 ? "Slide finding" : `${e.length} slide findings`}: ${e.map((e) => e.label).join("; ")}`;
}
function Dr() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M4 10l4-4 4 4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Or() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.6",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M4 6l4 4 4-4",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function kr() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.4",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ V("rect", {
			x: "5.5",
			y: "5.5",
			width: "8",
			height: "8",
			rx: "1.5"
		}), /* @__PURE__ */ V("path", {
			d: "M10.5 2.5h-8v8",
			strokeLinecap: "round"
		})]
	});
}
function Ar() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function jr({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: l = !1, onSelect: u, onMove: d, onDuplicate: f, onDelete: p, canDuplicate: m, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = Le(i);
	return /* @__PURE__ */ H("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : s ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!l && (_ ?? /* @__PURE__ */ V("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ H("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => u(e.id),
				"aria-current": a ? "true" : void 0,
				"data-testid": `${b}-select-${e.id}`,
				className: "flex min-w-0 flex-1 cursor-pointer items-start gap-2 border-none bg-transparent p-0 text-left font-[inherit]",
				children: [
					/* @__PURE__ */ V("span", {
						className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
						children: t + 1
					}),
					/* @__PURE__ */ V("span", {
						className: "flex h-11 w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-surface-hover/50",
						children: x ? /* @__PURE__ */ V("img", {
							src: x,
							alt: "",
							className: "h-full w-full object-contain",
							"data-testid": `${b}-thumb-${e.id}`
						}) : /* @__PURE__ */ V(c, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ H("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ V(c, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: W(e.title) || "Untitled slide"
							}),
							/* @__PURE__ */ V(c, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							s && /* @__PURE__ */ V(c, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ V(c, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!l && /* @__PURE__ */ H("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ H("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ V(h, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ V(Dr, {}),
						disabled: t === 0,
						onClick: () => d(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ V(h, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ V(Or, {}),
						disabled: t >= n - 1,
						onClick: () => d(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ H("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ V(h, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ V(kr, {}),
						disabled: !m,
						onClick: () => f(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ V(h, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ V(Ar, {}),
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
function Mr({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = jr, listClassName: u, testIdPrefix: d }) {
	return /* @__PURE__ */ V("ol", {
		className: r("m-0 flex list-none flex-col gap-1 p-0", u),
		"data-testid": `${d}-list`,
		children: e.map((r, u) => /* @__PURE__ */ V(l, {
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
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var Nr = ve(() => import("./SortableSlideList-CbM0Hc5v.js"));
function Pr(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function Fr(e, t) {
	Pr(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function Ir() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ V("rect", {
			x: "3.5",
			y: "7",
			width: "9",
			height: "6.5",
			rx: "1.2"
		}), /* @__PURE__ */ V("path", {
			d: "M5.5 7V5a2.5 2.5 0 0 1 5 0v2",
			strokeLinecap: "round"
		})]
	});
}
function Lr({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = Le(e.thumbnailSvg), l = t + 1;
	return /* @__PURE__ */ H("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ V("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ V("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: l
			})
		}), /* @__PURE__ */ H("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ V("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${l}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: s ? /* @__PURE__ */ V("img", {
						src: s,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ H("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ V(c, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ V(c, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ H("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ V(c, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ H(c, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ V(Ir, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ V("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ V(ce, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function Rr() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3.5 w-3.5",
		fill: "currentColor",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ V("circle", {
				cx: "3.5",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ V("circle", {
				cx: "8",
				cy: "8",
				r: "1.3"
			}),
			/* @__PURE__ */ V("circle", {
				cx: "12.5",
				cy: "8",
				r: "1.3"
			})
		]
	});
}
function zr({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: l = !1, viewers: u, findings: d, readOnly: f = !1, onSelect: p, onMove: m, onDuplicate: h, onDelete: g, canDuplicate: _, canDelete: v, dragHandle: y, rowRef: b, dragging: x = !1, testIdPrefix: S }) {
	let C = Le(i), T = t + 1, E = W(e.title) || "Untitled slide", ee = ye(), te = d?.length ? ee : void 0, ne = (t) => {
		if (!d?.length || !te) return t;
		let n = d.some((e) => e.tone === "warning"), r = Er(d);
		return /* @__PURE__ */ V(w, {
			content: /* @__PURE__ */ V("span", {
				className: "flex flex-col gap-0.5",
				children: d.map((e, t) => /* @__PURE__ */ V(c, {
					as: "span",
					size: "xs",
					children: e.label
				}, t))
			}),
			triggerClassName: "relative block w-full",
			"data-testid": `${S}-findings-tip-${e.id}`,
			children: /* @__PURE__ */ H("span", {
				className: "relative block w-full",
				children: [t, /* @__PURE__ */ V("span", {
					id: te,
					role: "img",
					"aria-label": r,
					"data-tone": n ? "warning" : "info",
					"data-testid": `${S}-findings-${e.id}`,
					className: "pointer-events-none absolute bottom-1 left-1 inline-flex rounded-full bg-surface/90 p-0.5",
					children: /* @__PURE__ */ V(j, {
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
	return /* @__PURE__ */ H("li", {
		ref: b,
		"data-testid": `${S}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": l ? "true" : void 0,
		"aria-busy": l || void 0,
		className: r("group flex items-start gap-1.5", x && "opacity-40"),
		children: [/* @__PURE__ */ H("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ V("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: T
			}), !f && y && /* @__PURE__ */ V("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: y
			})]
		}), /* @__PURE__ */ H("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				ne(/* @__PURE__ */ H("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => p(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${T}: ${E}`,
					...te ? { "aria-describedby": te } : {},
					"data-testid": `${S}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [C ? /* @__PURE__ */ V("img", {
						src: C,
						alt: "",
						className: r("h-full w-full object-contain", l && "opacity-40"),
						"data-testid": `${S}-thumb-${e.id}`
					}) : /* @__PURE__ */ H("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ V(c, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: E
						}), /* @__PURE__ */ V(c, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Ut[e.layout]
						})]
					}), l && /* @__PURE__ */ V("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${S}-generating-${e.id}`,
						children: /* @__PURE__ */ V(c, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				})),
				/* @__PURE__ */ H("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						C ? /* @__PURE__ */ V(c, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: E
						}) : /* @__PURE__ */ V("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !l && /* @__PURE__ */ V(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${S}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ V(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${S}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				u && u.length > 0 && /* @__PURE__ */ V("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${S}-viewers-${e.id}`,
					"aria-label": `${u.map((e) => e.name).join(", ")} ${u.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ V(ce, {
						users: [...u],
						maxVisible: 2,
						size: 16
					})
				}),
				!f && O.length > 0 && /* @__PURE__ */ V("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ V(D, {
						trigger: /* @__PURE__ */ V(Rr, {}),
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
function Br({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: l, canAdd: u = !0, generatingSlideIds: d, generatedItems: f, slideViewers: p, readOnly: m = !1, className: h, testIdPrefix: g = "filmstrip" }) {
	let v = R(null), y = L(() => new Set(d ?? []), [d]), b = L(() => e.map((e) => {
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
	]), x = L(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	I(() => {
		Pr(v.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => Fr(v.current, s));
			return;
		}
		let c = C[o];
		n(c), Fr(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: u,
		rowComponent: zr,
		listClassName: "gap-2.5",
		testIdPrefix: g
	};
	return /* @__PURE__ */ H("div", {
		ref: v,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", h),
		"data-testid": `${g}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ V(ge, {
				fallback: /* @__PURE__ */ V(Mr, { ...T }),
				children: V(m ? Mr : Nr, { ...T })
			}),
			x.map((t) => /* @__PURE__ */ H("div", {
				className: "flex items-start gap-1.5",
				"aria-busy": "true",
				"data-testid": `${g}-placeholder-${t}`,
				children: [/* @__PURE__ */ V("span", {
					className: "w-4 shrink-0 pt-0.5 text-[11px] tabular-nums text-text-tertiary",
					children: e.length + 1
				}), /* @__PURE__ */ V("span", {
					className: "flex aspect-[16/9] min-w-0 flex-1 items-end rounded-md border border-dashed border-border bg-surface px-1.5 py-0.5",
					children: /* @__PURE__ */ V(c, {
						as: "span",
						className: "text-[10px] font-medium text-text-secondary",
						children: "Generating…"
					})
				})]
			}, t)),
			S.length > 0 && /* @__PURE__ */ V("ul", {
				className: "m-0 flex list-none flex-col gap-2.5 p-0",
				"aria-label": "Generated slides",
				"data-testid": `${g}-generated-list`,
				children: S.map((r, i) => /* @__PURE__ */ V(Lr, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...p?.[r.id]?.length ? { viewers: p[r.id] } : {},
					onSelect: n,
					testIdPrefix: g
				}, r.id))
			}),
			l && !m && /* @__PURE__ */ H("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ V("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ V(i, {
					variant: "secondary",
					size: "sm",
					disabled: !u,
					onClick: l,
					className: "min-w-0 flex-1",
					"data-testid": `${g}-add`,
					children: /* @__PURE__ */ H("span", {
						className: "inline-flex items-center gap-1",
						children: [/* @__PURE__ */ V(_, { size: 12 }), "Add slide"]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideSources.tsx
var Vr = {
	document: "📄",
	transcript: "🎙️"
};
function Hr({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: l }) {
	let [u, d] = z(""), [f, p] = z(!1), [m, h] = z(n), g = ye(), _ = R(0);
	I(() => {
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
	}, x = /* @__PURE__ */ V(fe, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${l}-source-chips`
	}), S = /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ V(E, {
			value: u,
			onChange: d,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${l}-source-search`
		}), y ? /* @__PURE__ */ V(c, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : m.length === 0 ? /* @__PURE__ */ V(c, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${l}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ V("ul", {
			"aria-labelledby": g,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${l}-source-results`,
			children: m.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ V("li", { children: /* @__PURE__ */ H(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${l}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ V("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: Vr[t.kind ?? "document"]
						}),
						/* @__PURE__ */ V("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ V("span", {
							className: "ml-1.5 text-xs text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return s ? /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [/* @__PURE__ */ H("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ V(P, {
					as: "div",
					children: /* @__PURE__ */ V("span", {
						id: g,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ V(c, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${l}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ V("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ V(i, {
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
	}) : /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [
			/* @__PURE__ */ V(P, {
				as: "div",
				children: /* @__PURE__ */ V("span", {
					id: g,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ V(oe, {
				tone: "warning",
				"data-testid": `${l}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : x,
			!o && S
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/IconPicker.tsx
function Ur({ name: e, icons: t, renderIcon: n, className: i }) {
	if (n) return /* @__PURE__ */ V("span", {
		"aria-hidden": "true",
		className: r("inline-flex h-5 w-5 items-center justify-center", i),
		children: n(e)
	});
	let a = t?.[e];
	if (!a) return null;
	let o = typeof a == "string" ? [a] : a;
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		className: r("h-5 w-5", i),
		"data-icon": e,
		children: o.map((e, t) => /* @__PURE__ */ V("path", { d: e }, t))
	});
}
function Wr(e) {
	return e.charAt(0).toUpperCase() + e.slice(1).replace(/-/g, " ");
}
function Gr(e, t) {
	let n = t.toLowerCase().split(/\s+/).filter(Boolean);
	if (!n.length) return !0;
	let r = [
		e.label,
		e.name,
		...e.keywords
	].join(" ").toLowerCase();
	return n.every((e) => r.includes(e));
}
var Kr = "all";
function qr({ items: e, icons: t, renderIcon: n, value: i, onSelect: a, allowNone: o = !0, label: s = "Icons", className: l, testIdPrefix: u = "icon-picker" }) {
	let [d, f] = z(""), [p, m] = z(Kr), h = L(() => [...new Set(e.map((e) => e.category))], [e]), g = L(() => e.filter((e) => (p === Kr || e.category === p) && Gr(e, d)), [
		e,
		p,
		d
	]);
	return /* @__PURE__ */ H("section", {
		"aria-label": s,
		className: r("@container flex min-w-0 flex-col gap-2 rounded-md border border-border bg-surface p-2", l),
		"data-testid": u,
		children: [
			/* @__PURE__ */ V(E, {
				value: d,
				onChange: f,
				placeholder: "Search icons",
				"aria-label": `Search ${s.toLowerCase()}`
			}),
			h.length > 1 && /* @__PURE__ */ V(k, {
				variant: "pill",
				size: "sm",
				"aria-label": `${s} categories`,
				value: p,
				onValueChange: m,
				items: [{
					id: Kr,
					label: "All"
				}, ...h.map((e) => ({
					id: e,
					label: Wr(e)
				}))],
				getItemTestId: (e) => `${u}-category-${e.id}`
			}),
			/* @__PURE__ */ H("ul", {
				"aria-label": `${s}: ${g.length} shown`,
				className: "m-0 grid max-h-64 list-none grid-cols-4 gap-1 overflow-y-auto p-0 @xs:grid-cols-6 @md:grid-cols-8",
				children: [o && /* @__PURE__ */ V("li", { children: /* @__PURE__ */ V("button", {
					type: "button",
					"aria-pressed": !i,
					onClick: () => a(void 0),
					className: "flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-border p-1.5 text-text-secondary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10",
					"data-testid": `${u}-none`,
					children: /* @__PURE__ */ V(c, {
						as: "span",
						size: "xs",
						children: "No icon"
					})
				}) }), g.map((e) => /* @__PURE__ */ V("li", { children: /* @__PURE__ */ H("button", {
					type: "button",
					"aria-pressed": i === e.name,
					"aria-label": e.label,
					title: e.label,
					onClick: () => a(e.name),
					className: "flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-transparent p-1.5 text-text-primary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10 aria-pressed:text-primary",
					"data-testid": `${u}-${e.name}`,
					children: [/* @__PURE__ */ V(Ur, {
						name: e.name,
						icons: t,
						renderIcon: n
					}), /* @__PURE__ */ V(c, {
						as: "span",
						size: "xs",
						tone: "secondary",
						className: "line-clamp-1 w-full text-center",
						children: e.label
					})]
				}) }, e.name))]
			}),
			!g.length && /* @__PURE__ */ V(c, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${u}-empty`,
				children: `No icons match "${d}".`
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/GraphicPicker.tsx
var Jr = "all", Yr = "default";
function Xr(e) {
	let t = e.charAt(0).toUpperCase() + e.slice(1);
	return t.endsWith("s") ? t : `${t}s`;
}
var Zr = "flex h-full w-full flex-col items-center justify-center gap-1 rounded-md border border-border p-1.5 text-text-primary hover:bg-surface-hover aria-pressed:border-primary aria-pressed:bg-primary/10";
function Qr({ items: e, renderGraphic: t, graphicSvg: n, value: i, onChange: a, label: o = "Decoration", className: s, testIdPrefix: l = "graphic-picker" }) {
	let [u, d] = z(""), [f, p] = z(Jr), m = L(() => [...new Set(e.map((e) => e.category))], [e]), h = L(() => e.filter((e) => (f === Jr || e.category === f) && Gr(e, u)), [
		e,
		f,
		u
	]), g = i && i !== "none" ? i : void 0;
	return /* @__PURE__ */ H("section", {
		"aria-label": o,
		className: r("@container flex min-w-0 flex-col gap-2 rounded-md border border-border bg-surface p-2", s),
		"data-testid": l,
		children: [
			/* @__PURE__ */ V(E, {
				value: u,
				onChange: d,
				placeholder: "Search graphics",
				"aria-label": `Search ${o.toLowerCase()}`
			}),
			m.length > 1 && /* @__PURE__ */ V(k, {
				variant: "pill",
				size: "sm",
				"aria-label": `${o} categories`,
				value: f,
				onValueChange: p,
				items: [{
					id: Jr,
					label: "All"
				}, ...m.map((e) => ({
					id: e,
					label: Xr(e)
				}))],
				getItemTestId: (e) => `${l}-category-${e.id}`
			}),
			/* @__PURE__ */ H("ul", {
				"aria-label": `${o}: ${h.length} shown`,
				className: "m-0 grid max-h-72 list-none grid-cols-3 gap-1.5 overflow-y-auto p-0 @md:grid-cols-4 @2xl:grid-cols-6",
				children: [
					/* @__PURE__ */ V("li", { children: /* @__PURE__ */ H("button", {
						type: "button",
						"aria-pressed": i === void 0,
						onClick: () => a(void 0),
						className: Zr,
						"data-testid": `${l}-default`,
						children: [/* @__PURE__ */ V(c, {
							as: "span",
							size: "xs",
							weight: "medium",
							children: "Style default"
						}), /* @__PURE__ */ V(c, {
							as: "span",
							size: "xs",
							tone: "tertiary",
							children: "The style's motif"
						})]
					}) }),
					/* @__PURE__ */ V("li", { children: /* @__PURE__ */ H("button", {
						type: "button",
						"aria-pressed": i === "none",
						onClick: () => a("none"),
						className: Zr,
						"data-testid": `${l}-none`,
						children: [/* @__PURE__ */ V(c, {
							as: "span",
							size: "xs",
							weight: "medium",
							children: "None"
						}), /* @__PURE__ */ V(c, {
							as: "span",
							size: "xs",
							tone: "tertiary",
							children: "No graphic"
						})]
					}) }),
					h.map((e) => /* @__PURE__ */ V("li", { children: /* @__PURE__ */ H("button", {
						type: "button",
						"aria-pressed": g?.graphic === e.name,
						"aria-label": e.label,
						title: e.label,
						onClick: () => a({
							graphic: e.name,
							...g?.placement ? { placement: g.placement } : {}
						}),
						className: Zr,
						"data-testid": `${l}-${e.name}`,
						children: [t ? /* @__PURE__ */ V("span", {
							"aria-hidden": "true",
							className: "flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-surface-inset",
							children: t(e.name)
						}) : n ? /* @__PURE__ */ V("span", {
							"aria-hidden": "true",
							className: "flex aspect-video w-full items-center justify-center overflow-hidden rounded-sm bg-surface-inset p-1 [&>svg]:h-full [&>svg]:w-full",
							"data-testid": `${l}-art-${e.name}`,
							dangerouslySetInnerHTML: { __html: n(e.name) }
						}) : null, /* @__PURE__ */ V(c, {
							as: "span",
							size: "xs",
							tone: "secondary",
							className: "line-clamp-1 w-full text-center",
							children: e.label
						})]
					}) }, e.name))
				]
			}),
			g && /* @__PURE__ */ H("div", {
				className: "flex min-w-0 flex-col gap-1",
				"data-testid": `${l}-placement`,
				children: [/* @__PURE__ */ V(P, {
					as: "div",
					children: "Placement"
				}), /* @__PURE__ */ V(O, {
					size: "sm",
					fullWidth: !0,
					className: "grid grid-cols-2 @md:grid-cols-4",
					"aria-label": "Placement",
					value: g.placement ?? Yr,
					onChange: (e) => {
						let { placement: t, ...n } = g;
						a(e === Yr ? n : {
							...n,
							placement: e
						});
					},
					options: [{
						value: Yr,
						label: "Default",
						testId: `${l}-placement-default`
					}, ...Be.map((e) => ({
						value: e,
						label: Jt[e],
						testId: `${l}-placement-${e}`
					}))]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRichForms.tsx
function $r(e, t, n) {
	let r = { ...e };
	return n ? r[t] = n : delete r[t], r;
}
function ei(e, t, n) {
	if (n < 0 || n >= e.length) return e.slice();
	let r = e.slice(), [i] = r.splice(t, 1);
	return r.splice(n, 0, i), r;
}
function ti({ noun: e, index: t, count: n, min: r, onChange: i, testIdPrefix: a }) {
	return /* @__PURE__ */ H("span", {
		className: "flex shrink-0 items-center",
		children: [
			/* @__PURE__ */ V(h, {
				"aria-label": `Move ${e} ${t + 1} up`,
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ V(g, {
					dir: "up",
					size: 12
				}),
				disabled: t === 0,
				onClick: () => i("up"),
				"data-testid": `${a}-up-${t}`
			}),
			/* @__PURE__ */ V(h, {
				"aria-label": `Move ${e} ${t + 1} down`,
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ V(g, {
					dir: "down",
					size: 12
				}),
				disabled: t === n - 1,
				onClick: () => i("down"),
				"data-testid": `${a}-down-${t}`
			}),
			/* @__PURE__ */ V(mi, {
				label: `Remove ${e} ${t + 1}`,
				disabled: n <= r,
				onClick: () => i("remove"),
				testId: `${a}-remove-${t}`
			})
		]
	});
}
function ni(e, t, n) {
	return n === "remove" ? e.filter((e, n) => n !== t) : ei(e, t, n === "up" ? t - 1 : t + 1);
}
function ri({ value: e, icons: t, label: n, open: r, onToggle: a, disabled: o, testId: s }) {
	let l = e ? t.items.find((t) => t.name === e)?.label ?? e : void 0;
	return /* @__PURE__ */ H(i, {
		variant: "secondary",
		size: "sm",
		"aria-expanded": r,
		"aria-label": l ? `${n}: ${l}` : `${n}: none`,
		disabled: o,
		onClick: a,
		className: "shrink-0",
		"data-testid": s,
		children: [e ? /* @__PURE__ */ V(Ur, {
			name: e,
			icons: t.icons,
			renderIcon: t.renderIcon,
			className: "h-4 w-4"
		}) : null, /* @__PURE__ */ V(c, {
			as: "span",
			size: "xs",
			children: e ? "Icon" : "Add icon"
		})]
	});
}
function ii({ value: e, icons: t, label: n, onChange: r, onClose: i, testId: a }) {
	return /* @__PURE__ */ V(qr, {
		items: t.items,
		icons: t.icons,
		renderIcon: t.renderIcon,
		value: e,
		label: n,
		onSelect: (e) => {
			r(e), i();
		},
		testIdPrefix: a
	});
}
function ai({ items: e, onChange: t, bounds: n, noun: r, icons: i, readOnly: a, testIdPrefix: o }) {
	let [s, l] = n, [u, d] = z(null), f = r.charAt(0).toUpperCase() + r.slice(1);
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": o,
		children: [
			/* @__PURE__ */ V(pi, {
				label: `${f}s`,
				count: e.length,
				min: s,
				max: l,
				testId: `${o}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((n, l) => /* @__PURE__ */ H("li", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ H("span", {
						className: "flex flex-wrap items-center gap-1 sm:flex-nowrap",
						children: [
							/* @__PURE__ */ V(c, {
								size: "xs",
								tone: "tertiary",
								tabular: !0,
								className: "w-4 shrink-0 text-right",
								children: `${l + 1}.`
							}),
							/* @__PURE__ */ V(S, {
								value: n.title,
								maxLength: 40,
								placeholder: "Title",
								disabled: a,
								"aria-label": `${f} ${l + 1} title`,
								onChange: (r) => t(Q(e, l, {
									...n,
									title: r.target.value
								})),
								"data-testid": `${o}-title-${l}`
							}),
							/* @__PURE__ */ V(S, {
								value: n.text ?? "",
								maxLength: 140,
								placeholder: "One line (optional)",
								disabled: a,
								"aria-label": `${f} ${l + 1} text, optional`,
								onChange: (r) => t(Q(e, l, $r(n, "text", r.target.value))),
								"data-testid": `${o}-text-${l}`
							}),
							i && /* @__PURE__ */ V(ri, {
								value: n.icon,
								icons: i,
								label: `${f} ${l + 1} icon`,
								open: u === l,
								onToggle: () => d(u === l ? null : l),
								disabled: a,
								testId: `${o}-icon-${l}`
							}),
							!a && /* @__PURE__ */ V(ti, {
								noun: r,
								index: l,
								count: e.length,
								min: s,
								onChange: (n) => {
									d(null), t(ni(e, l, n));
								},
								testIdPrefix: o
							})
						]
					}), i && u === l && !a && /* @__PURE__ */ V(ii, {
						value: n.icon,
						icons: i,
						label: `Icon for ${r} ${l + 1}`,
						onChange: (r) => t(Q(e, l, $r(n, "icon", r))),
						onClose: () => d(null),
						testId: `${o}-icon-picker-${l}`
					})]
				}, l))
			}),
			!a && /* @__PURE__ */ V(hi, {
				disabled: e.length >= l,
				onClick: () => t([...e, { title: "" }]),
				testId: `${o}-add`,
				children: `Add ${r}`
			})
		]
	});
}
var oi = [
	"Top left",
	"Top right",
	"Bottom left",
	"Bottom right"
];
function si({ matrix: e, onChange: t, icons: n, readOnly: r, testIdPrefix: i }) {
	let [a, o] = z(null), s = (n, r, i) => {
		let a = [e[n][0], e[n][1]];
		a[r] = i, t({
			...e,
			[n]: a
		});
	}, l = (n, r) => {
		t({
			...e,
			quadrants: Q(e.quadrants, n, r)
		});
	}, u = (t, n, a, o) => /* @__PURE__ */ V(T, {
		label: a,
		children: (a) => /* @__PURE__ */ V(S, {
			...a,
			value: e[t][n],
			maxLength: 24,
			placeholder: o,
			disabled: r,
			onChange: (e) => s(t, n, e.target.value),
			"data-testid": `${i}-${t}-${n}`
		})
	});
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-2",
		"data-testid": i,
		children: [
			/* @__PURE__ */ V(P, {
				as: "div",
				children: "Axes"
			}),
			/* @__PURE__ */ H("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
				children: [
					u("x", 0, "Horizontal axis, left end", "Low effort"),
					u("x", 1, "Horizontal axis, right end", "High effort"),
					u("y", 0, "Vertical axis, bottom end", "Low value"),
					u("y", 1, "Vertical axis, top end", "High value")
				]
			}),
			/* @__PURE__ */ V(P, {
				as: "div",
				children: "Quadrants"
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-2",
				"data-testid": `${i}-quadrants`,
				children: e.quadrants.map((e, t) => /* @__PURE__ */ H("li", {
					className: "flex flex-col gap-1 rounded-md border border-border p-2",
					children: [
						/* @__PURE__ */ H("span", {
							className: "flex items-center justify-between gap-1",
							children: [/* @__PURE__ */ V(c, {
								size: "xs",
								weight: "medium",
								tone: "secondary",
								children: oi[t]
							}), n && /* @__PURE__ */ V(ri, {
								value: e.icon,
								icons: n,
								label: `${oi[t]} quadrant icon`,
								open: a === t,
								onToggle: () => o(a === t ? null : t),
								disabled: r,
								testId: `${i}-icon-${t}`
							})]
						}),
						/* @__PURE__ */ V(S, {
							value: e.title,
							maxLength: 40,
							placeholder: "Title",
							disabled: r,
							"aria-label": `${oi[t]} quadrant title`,
							onChange: (n) => l(t, {
								...e,
								title: n.target.value
							}),
							"data-testid": `${i}-title-${t}`
						}),
						/* @__PURE__ */ V(S, {
							value: e.text ?? "",
							maxLength: 140,
							placeholder: "One line (optional)",
							disabled: r,
							"aria-label": `${oi[t]} quadrant text, optional`,
							onChange: (n) => l(t, $r(e, "text", n.target.value)),
							"data-testid": `${i}-text-${t}`
						}),
						n && a === t && !r && /* @__PURE__ */ V(ii, {
							value: e.icon,
							icons: n,
							label: `Icon for the ${oi[t].toLowerCase()} quadrant`,
							onChange: (n) => l(t, $r(e, "icon", n)),
							onClose: () => o(null),
							testId: `${i}-icon-picker-${t}`
						})
					]
				}, t))
			})
		]
	});
}
function ci({ people: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ V(pi, {
				label: "People",
				count: e.length,
				min: 2,
				max: 8,
				testId: `${r}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((i, a) => /* @__PURE__ */ H("li", {
					className: "flex flex-wrap items-center gap-1 sm:flex-nowrap",
					children: [
						/* @__PURE__ */ V(S, {
							value: i.name,
							maxLength: 40,
							placeholder: "Name",
							disabled: n,
							"aria-label": `Person ${a + 1} name`,
							onChange: (n) => t(Q(e, a, {
								...i,
								name: n.target.value
							})),
							"data-testid": `${r}-name-${a}`
						}),
						/* @__PURE__ */ V(S, {
							value: i.role,
							maxLength: 48,
							placeholder: "Role",
							disabled: n,
							"aria-label": `Person ${a + 1} role`,
							onChange: (n) => t(Q(e, a, {
								...i,
								role: n.target.value
							})),
							"data-testid": `${r}-role-${a}`
						}),
						/* @__PURE__ */ V(S, {
							value: i.detail ?? "",
							maxLength: 80,
							placeholder: "A line about them (optional)",
							disabled: n,
							"aria-label": `Person ${a + 1} detail, optional`,
							onChange: (n) => t(Q(e, a, $r(i, "detail", n.target.value))),
							"data-testid": `${r}-detail-${a}`
						}),
						!n && /* @__PURE__ */ V(ti, {
							noun: "person",
							index: a,
							count: e.length,
							min: 2,
							onChange: (n) => t(ni(e, a, n)),
							testIdPrefix: r
						})
					]
				}, a))
			}),
			!n && /* @__PURE__ */ V(hi, {
				disabled: e.length >= 8,
				onClick: () => t([...e, {
					name: "",
					role: ""
				}]),
				testId: `${r}-add`,
				children: "Add person"
			})
		]
	});
}
function li({ stages: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ V(pi, {
				label: "Stages, widest first",
				count: e.length,
				min: 3,
				max: 5,
				testId: `${r}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((i, a) => /* @__PURE__ */ H("li", {
					className: "flex flex-wrap items-center gap-1 sm:flex-nowrap",
					children: [
						/* @__PURE__ */ V(c, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "w-4 shrink-0 text-right",
							children: `${a + 1}.`
						}),
						/* @__PURE__ */ V(S, {
							value: i.label,
							maxLength: 40,
							placeholder: "What it counts",
							disabled: n,
							"aria-label": `Stage ${a + 1} label`,
							onChange: (n) => t(Q(e, a, {
								...i,
								label: n.target.value
							})),
							"data-testid": `${r}-label-${a}`
						}),
						/* @__PURE__ */ V(S, {
							value: i.value,
							maxLength: 12,
							placeholder: "12,400",
							disabled: n,
							"aria-label": `Stage ${a + 1} value`,
							onChange: (n) => t(Q(e, a, {
								...i,
								value: n.target.value
							})),
							"data-testid": `${r}-value-${a}`
						}),
						/* @__PURE__ */ V(S, {
							value: i.detail ?? "",
							maxLength: 60,
							placeholder: "A note (optional)",
							disabled: n,
							"aria-label": `Stage ${a + 1} detail, optional`,
							onChange: (n) => t(Q(e, a, $r(i, "detail", n.target.value))),
							"data-testid": `${r}-detail-${a}`
						}),
						!n && /* @__PURE__ */ V(ti, {
							noun: "stage",
							index: a,
							count: e.length,
							min: 3,
							onChange: (n) => t(ni(e, a, n)),
							testIdPrefix: r
						})
					]
				}, a))
			}),
			!n && /* @__PURE__ */ V(hi, {
				disabled: e.length >= 5,
				onClick: () => t([...e, {
					label: "",
					value: ""
				}]),
				testId: `${r}-add`,
				children: "Add stage"
			})
		]
	});
}
function ui({ image: e, layout: t, onChange: n, readOnly: r, testIdPrefix: i }) {
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-2",
		"data-testid": i,
		children: [
			/* @__PURE__ */ V(T, {
				label: "Image description",
				hint: "Read aloud by screen readers, and shown until the picture loads.",
				children: (t) => /* @__PURE__ */ V(S, {
					...t,
					value: e.alt,
					maxLength: 200,
					disabled: r,
					onChange: (t) => n({
						...e,
						alt: t.target.value
					}),
					"data-testid": `${i}-alt`
				})
			}),
			/* @__PURE__ */ V(T, {
				label: "Image URL",
				hint: e.assetId ? "The slide has an uploaded picture; a URL is used only without one." : "An https address the host fetches when it renders.",
				children: (t) => /* @__PURE__ */ V(S, {
					...t,
					type: "url",
					value: e.url ?? "",
					maxLength: It,
					placeholder: "https://",
					disabled: r,
					onChange: (t) => n($r(e, "url", t.target.value.trim())),
					"data-testid": `${i}-url`
				})
			}),
			t === "image-text" && /* @__PURE__ */ H("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ V(P, {
					as: "div",
					children: "Picture side"
				}), /* @__PURE__ */ V(O, {
					size: "sm",
					"aria-label": "Picture side",
					value: e.side ?? "left",
					disabled: r,
					onChange: (t) => n({
						...e,
						side: t
					}),
					options: [{
						value: "left",
						label: "Left",
						testId: `${i}-side-left`
					}, {
						value: "right",
						label: "Right",
						testId: `${i}-side-right`
					}]
				})]
			})
		]
	});
}
function di({ value: e, graphics: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let [o, s] = z(!1), l = e === void 0 ? "Style default" : e === "none" ? "None" : `${t.items.find((t) => t.name === e.graphic)?.label ?? e.graphic}${e.placement ? `, ${Jt[e.placement].toLowerCase()}` : ""}`;
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": a,
		children: [/* @__PURE__ */ H("span", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ V(P, {
					as: "div",
					children: "Graphic"
				}),
				/* @__PURE__ */ V(c, {
					size: "xs",
					tone: "secondary",
					"data-testid": `${a}-current`,
					children: l
				}),
				!r && /* @__PURE__ */ V(i, {
					variant: "ghost",
					size: "sm",
					"aria-expanded": o,
					onClick: () => s(!o),
					"data-testid": `${a}-toggle`,
					children: o ? "Done" : "Change graphic"
				})
			]
		}), o && !r && /* @__PURE__ */ V(Qr, {
			items: t.items,
			renderGraphic: t.renderGraphic,
			graphicSvg: t.graphicSvg,
			value: e,
			onChange: n,
			label: "Slide graphic",
			testIdPrefix: `${a}-picker`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideLayoutForms.tsx
function fi() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function pi({ label: e, count: t, max: n, min: r, testId: i }) {
	return /* @__PURE__ */ H("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ V(P, {
			as: "div",
			children: e
		}), /* @__PURE__ */ V(c, {
			size: "xs",
			tone: "tertiary",
			"data-testid": i,
			children: r === void 0 ? `${t} of ${n}` : `${t} of ${r}–${n}`
		})]
	});
}
function mi({ label: e, disabled: t, onClick: n, testId: r }) {
	return /* @__PURE__ */ V(h, {
		"aria-label": e,
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ V(fi, {}),
		disabled: t,
		onClick: n,
		"data-testid": r
	});
}
function hi({ children: e, disabled: t, onClick: n, testId: r }) {
	return /* @__PURE__ */ V(i, {
		variant: "ghost",
		size: "sm",
		disabled: t,
		onClick: n,
		"data-testid": r,
		className: "self-start",
		children: e
	});
}
function Q(e, t, n) {
	let r = e.slice();
	return r[t] = n, r;
}
function gi({ label: e, itemLabel: t, items: n, max: r, maxChars: i, min: a = 0, addLabel: o, onChange: s, readOnly: l, testIdPrefix: u, numbered: d = !1 }) {
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1",
		"data-testid": u,
		children: [
			/* @__PURE__ */ V(pi, {
				label: e,
				count: n.length,
				max: r,
				testId: `${u}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: n.map((e, r) => /* @__PURE__ */ H("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ V(c, {
							size: "xs",
							tone: "tertiary",
							tabular: !0,
							className: "w-4 shrink-0 text-right",
							children: d ? `${r + 1}.` : "•"
						}),
						/* @__PURE__ */ V(S, {
							value: e,
							maxLength: i,
							disabled: l,
							"aria-label": `${t} ${r + 1}`,
							onChange: (e) => s(Q(n, r, e.target.value)),
							"data-testid": `${u}-${r}`
						}),
						!l && /* @__PURE__ */ V(mi, {
							label: `Remove ${t.toLowerCase()} ${r + 1}`,
							disabled: n.length <= Math.max(a, 0),
							onClick: () => s(n.filter((e, t) => t !== r)),
							testId: `${u}-remove-${r}`
						})
					]
				}, r))
			}),
			!l && /* @__PURE__ */ V(hi, {
				disabled: n.length >= r,
				onClick: () => s([...n, ""]),
				testId: `${u}-add`,
				children: o
			})
		]
	});
}
function _i({ figures: e, onChange: t, bounds: n = [2, 4], icons: r, readOnly: i, testIdPrefix: a }) {
	let [o, s] = n, [c, l] = z(null), u = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.delta || delete i.delta, i.context || delete i.context, i.icon || delete i.icon, t(Q(e, n, i));
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": a,
		children: [
			/* @__PURE__ */ V(pi, {
				label: "Figures",
				count: e.length,
				min: o,
				max: s,
				testId: `${a}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((n, s) => /* @__PURE__ */ H("li", {
					className: "grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto_auto]",
					children: [
						/* @__PURE__ */ V(S, {
							value: n.value,
							maxLength: 12,
							placeholder: "42%",
							disabled: i,
							"aria-label": `Figure ${s + 1} value`,
							onChange: (e) => u(s, { value: e.target.value }),
							"data-testid": `${a}-value-${s}`
						}),
						/* @__PURE__ */ V(S, {
							value: n.label,
							maxLength: 60,
							placeholder: "What it counts",
							disabled: i,
							"aria-label": `Figure ${s + 1} label`,
							onChange: (e) => u(s, { label: e.target.value }),
							"data-testid": `${a}-label-${s}`
						}),
						/* @__PURE__ */ V(S, {
							value: n.delta ?? "",
							maxLength: 24,
							placeholder: "+8 pts (optional)",
							disabled: i,
							"aria-label": `Figure ${s + 1} change, optional`,
							onChange: (e) => u(s, { delta: e.target.value }),
							"data-testid": `${a}-delta-${s}`
						}),
						/* @__PURE__ */ V(S, {
							value: n.context ?? "",
							maxLength: 60,
							placeholder: "vs 71% in Q1 (optional)",
							disabled: i,
							"aria-label": `Figure ${s + 1} context, optional`,
							onChange: (e) => u(s, { context: e.target.value }),
							"data-testid": `${a}-context-${s}`
						}),
						r && /* @__PURE__ */ V(ri, {
							value: n.icon,
							icons: r,
							label: `Figure ${s + 1} icon`,
							open: c === s,
							onToggle: () => l(c === s ? null : s),
							disabled: i,
							testId: `${a}-icon-${s}`
						}),
						!i && /* @__PURE__ */ V(mi, {
							label: `Remove figure ${s + 1}`,
							disabled: e.length <= o,
							onClick: () => t(e.filter((e, t) => t !== s)),
							testId: `${a}-remove-${s}`
						}),
						r && c === s && !i && /* @__PURE__ */ V(qr, {
							className: "sm:col-span-full",
							items: r.items,
							icons: r.icons,
							renderIcon: r.renderIcon,
							value: n.icon,
							label: `Icon for figure ${s + 1}`,
							onSelect: (e) => {
								u(s, { icon: e }), l(null);
							},
							testIdPrefix: `${a}-icon-picker-${s}`
						})
					]
				}, s))
			}),
			!i && /* @__PURE__ */ V(hi, {
				disabled: e.length >= s,
				onClick: () => t([...e, {
					value: "",
					label: ""
				}]),
				testId: `${a}-add`,
				children: "Add figure"
			})
		]
	});
}
function vi({ table: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			rows: Q(e.rows, n, Q(e.rows[n], r, i))
		});
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ H("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ V(P, {
					as: "div",
					children: "Table"
				}),
				/* @__PURE__ */ V(c, {
					size: "xs",
					tone: "tertiary",
					"data-testid": `${r}-count`,
					children: `${e.rows.length} of 8 rows · ${a} of 5 columns · 40 characters a cell`
				}),
				!n && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(i, {
					variant: "ghost",
					size: "sm",
					disabled: e.rows.length >= 8,
					onClick: o,
					"data-testid": `${r}-add-row`,
					children: "Add row"
				}), /* @__PURE__ */ V(i, {
					variant: "ghost",
					size: "sm",
					disabled: a >= 5,
					onClick: h,
					"data-testid": `${r}-add-column`,
					children: "Add column"
				})] })
			]
		}), /* @__PURE__ */ V("div", {
			className: "overflow-x-auto rounded-md border border-border",
			children: /* @__PURE__ */ H(m, {
				"data-testid": `${r}-grid`,
				children: [/* @__PURE__ */ V(p, { children: /* @__PURE__ */ H(u, { children: [e.header.map((i, o) => /* @__PURE__ */ V(f, { children: /* @__PURE__ */ H("div", {
					className: "flex items-center gap-1",
					children: [/* @__PURE__ */ V(S, {
						size: "sm",
						value: i,
						maxLength: 40,
						disabled: n,
						"aria-label": `Column ${o + 1} heading`,
						onChange: (n) => t({
							...e,
							header: Q(e.header, o, n.target.value)
						}),
						"data-testid": `${r}-header-${o}`
					}), !n && /* @__PURE__ */ V(mi, {
						label: `Remove column ${o + 1}`,
						disabled: a <= 1,
						onClick: () => g(o),
						testId: `${r}-remove-column-${o}`
					})]
				}) }, o)), !n && /* @__PURE__ */ V(f, { children: /* @__PURE__ */ V("span", {
					className: "sr-only",
					children: "Row actions"
				}) })] }) }), /* @__PURE__ */ V(d, { children: e.rows.map((t, i) => /* @__PURE__ */ H(u, { children: [e.header.map((a, o) => /* @__PURE__ */ V(l, { children: /* @__PURE__ */ V(S, {
					size: "sm",
					value: t[o] ?? "",
					maxLength: 40,
					disabled: n,
					"aria-label": `Row ${i + 1}, ${e.header[o] || `column ${o + 1}`}`,
					onChange: (e) => _(i, o, e.target.value),
					"data-testid": `${r}-cell-${i}-${o}`
				}) }, o)), !n && /* @__PURE__ */ V(l, { children: /* @__PURE__ */ V(mi, {
					label: `Remove row ${i + 1}`,
					disabled: e.rows.length <= 1,
					onClick: () => s(i),
					testId: `${r}-remove-row-${i}`
				}) })] }, i)) })]
			})
		})]
	});
}
function yi({ comparison: e, onChange: t, icons: n, readOnly: r, testIdPrefix: i }) {
	let [a, o] = z(null), s = (s, c) => {
		let l = e[s];
		return /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-1.5",
			"data-testid": `${i}-${s}`,
			children: [
				n && /* @__PURE__ */ V(ri, {
					value: l.icon,
					icons: n,
					label: `${c} side icon`,
					open: a === s,
					onToggle: () => o(a === s ? null : s),
					disabled: r,
					testId: `${i}-${s}-icon`
				}),
				n && a === s && !r && /* @__PURE__ */ V(qr, {
					items: n.items,
					icons: n.icons,
					renderIcon: n.renderIcon,
					value: l.icon,
					label: `Icon for the ${c.toLowerCase()} side`,
					onSelect: (n) => {
						let { icon: r, ...i } = l;
						t({
							...e,
							[s]: n ? {
								...i,
								icon: n
							} : i
						}), o(null);
					},
					testIdPrefix: `${i}-${s}-icon-picker`
				}),
				/* @__PURE__ */ V(T, {
					label: `${c} side title`,
					children: (n) => /* @__PURE__ */ V(S, {
						...n,
						value: l.title,
						maxLength: 40,
						disabled: r,
						onChange: (n) => t({
							...e,
							[s]: {
								...l,
								title: n.target.value
							}
						}),
						"data-testid": `${i}-${s}-title`
					})
				}),
				/* @__PURE__ */ V(gi, {
					label: `${c} points`,
					itemLabel: `${c} point`,
					items: l.points,
					min: 1,
					max: 5,
					maxChars: 120,
					addLabel: "Add point",
					onChange: (n) => t({
						...e,
						[s]: {
							...l,
							points: n
						}
					}),
					readOnly: r,
					testIdPrefix: `${i}-${s}-points`
				})
			]
		});
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-3",
		"data-testid": i,
		children: [/* @__PURE__ */ H("div", {
			className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
			children: [s("left", "Left"), s("right", "Right")]
		}), /* @__PURE__ */ V(T, {
			label: "Verdict",
			hint: "Optional: the line that settles it. Up to 140 characters.",
			children: (n) => /* @__PURE__ */ V(S, {
				...n,
				value: e.verdict ?? "",
				maxLength: 140,
				disabled: r,
				onChange: (n) => {
					let { verdict: r, ...i } = e;
					t(n.target.value ? {
						...i,
						verdict: n.target.value
					} : i);
				},
				"data-testid": `${i}-verdict`
			})
		})]
	});
}
function bi({ steps: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.detail || delete i.detail, t(Q(e, n, i));
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ V(pi, {
				label: "Steps",
				count: e.length,
				min: 3,
				max: 6,
				testId: `${r}-count`
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-2 p-0",
				children: e.map((a, o) => /* @__PURE__ */ H("li", {
					className: "grid grid-cols-1 items-center gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,3fr)_auto]",
					children: [
						/* @__PURE__ */ V(S, {
							value: a.date,
							maxLength: 16,
							placeholder: "Mar 2027",
							disabled: n,
							"aria-label": `Step ${o + 1} date`,
							onChange: (e) => i(o, { date: e.target.value }),
							"data-testid": `${r}-date-${o}`
						}),
						/* @__PURE__ */ V(S, {
							value: a.label,
							maxLength: 40,
							placeholder: "What happens",
							disabled: n,
							"aria-label": `Step ${o + 1} label`,
							onChange: (e) => i(o, { label: e.target.value }),
							"data-testid": `${r}-label-${o}`
						}),
						/* @__PURE__ */ V(S, {
							value: a.detail ?? "",
							maxLength: 80,
							placeholder: "Detail (optional)",
							disabled: n,
							"aria-label": `Step ${o + 1} detail, optional`,
							onChange: (e) => i(o, { detail: e.target.value }),
							"data-testid": `${r}-detail-${o}`
						}),
						!n && /* @__PURE__ */ V(mi, {
							label: `Remove step ${o + 1}`,
							disabled: e.length <= 3,
							onClick: () => t(e.filter((e, t) => t !== o)),
							testId: `${r}-remove-${o}`
						})
					]
				}, o))
			}),
			!n && /* @__PURE__ */ V(hi, {
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
function xi({ agenda: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-2",
		"data-testid": r,
		children: [/* @__PURE__ */ V(gi, {
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
		}), /* @__PURE__ */ V(T, {
			label: "Current item",
			hint: "Optional: marks where the talk is.",
			className: "sm:w-64",
			children: (i) => /* @__PURE__ */ V(C, {
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
function Si({ closing: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n) => {
		let r = {
			...e,
			...n
		};
		r.contact || delete r.contact, r.nextSteps?.length || delete r.nextSteps, t(r);
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-2",
		"data-testid": r,
		children: [
			/* @__PURE__ */ V(T, {
				label: "Closing line",
				required: !0,
				hint: "Up to 100 characters.",
				children: (t) => /* @__PURE__ */ V(S, {
					...t,
					value: e.line,
					maxLength: 100,
					disabled: n,
					onChange: (e) => i({ line: e.target.value }),
					"data-testid": `${r}-line`
				})
			}),
			/* @__PURE__ */ V(gi, {
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
			/* @__PURE__ */ V(T, {
				label: "Contact",
				hint: "Optional: who to ask. Up to 100 characters.",
				children: (t) => /* @__PURE__ */ V(S, {
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
//#region src/components/doc-editor/presentation/deckText.ts
function Ci(e) {
	return e === void 0 ? "" : typeof e == "string" ? e : e.map((e) => e.text).join("");
}
function wi(e) {
	if (typeof e == "string") return Array.from({ length: e.length }, () => void 0);
	let t = [];
	for (let n of e) for (let e = 0; e < n.text.length; e += 1) t.push(n.emphasis);
	return t;
}
function Ti(e, t) {
	if (!t.some(Boolean)) return e;
	let n = [];
	for (let r = 0; r < e.length; r += 1) {
		let i = t[r], a = n[n.length - 1];
		a && a.emphasis === i ? a.text += e[r] : n.push(i ? {
			text: e[r],
			emphasis: i
		} : { text: e[r] });
	}
	return n;
}
function Ei(e, t, n, r) {
	let i = Ci(e), a = Math.max(0, Math.min(t, n)), o = Math.min(i.length, Math.max(t, n));
	if (o <= a) return e;
	let s = wi(e);
	for (let e = a; e < o; e += 1) s[e] = r ?? void 0;
	return Ti(i, s);
}
function Di(e, t, n) {
	let r = wi(e).slice(Math.max(0, Math.min(t, n)), Math.max(t, n));
	if (!r.length) return;
	let i = r[0];
	return r.every((e) => e === i) ? i : "mixed";
}
function Oi(e, t) {
	if (typeof e == "string") return t;
	let n = Ci(e);
	if (n === t) return e;
	let r = 0;
	for (; r < n.length && r < t.length && n[r] === t[r];) r += 1;
	let i = 0;
	for (; i < n.length - r && i < t.length - r && n[n.length - 1 - i] === t[t.length - 1 - i];) i += 1;
	let a = wi(e), o = t.length - r - i, s = r > 0 ? a[r - 1] : a[n.length - i];
	return Ti(t, [
		...a.slice(0, r),
		...Array.from({ length: o }, () => s),
		...a.slice(n.length - i)
	]);
}
//#endregion
//#region src/components/doc-editor/presentation/DeckTextField.tsx
var ki = {
	highlight: "Highlight",
	accent: "Accent",
	bold: "Bold",
	underline: "Underline",
	outline: "Outline",
	gradient: "Gradient"
}, Ai = {
	highlight: "rounded-sm bg-primary/20 px-0.5",
	accent: "text-primary",
	bold: "font-semibold",
	underline: "underline underline-offset-2",
	outline: "font-semibold text-transparent [-webkit-text-stroke:1px_var(--color-text-primary)]",
	gradient: "bg-gradient-to-r from-primary to-accent bg-clip-text font-semibold text-transparent"
}, ji = {
	highlight: {
		text: "A",
		className: "rounded-sm bg-primary/25 px-0.5"
	},
	accent: {
		text: "A",
		className: "text-primary"
	},
	bold: {
		text: "B",
		className: "font-bold"
	},
	underline: {
		text: "U",
		className: "underline underline-offset-2"
	},
	outline: {
		text: "A",
		className: "font-bold text-transparent [-webkit-text-stroke:1px_var(--color-text-primary)]"
	},
	gradient: {
		text: "A",
		className: "bg-gradient-to-r from-primary to-accent bg-clip-text font-bold text-transparent"
	}
};
function Mi({ active: e, onApply: t, disabled: n = !1, label: i = "Text emphasis", className: a, testIdPrefix: o = "emphasis" }) {
	let s = (e, t, r, i, a) => /* @__PURE__ */ V(w, {
		content: t,
		placement: "top",
		children: /* @__PURE__ */ V(h, {
			"aria-label": t,
			size: "sm",
			variant: "ghost",
			"aria-pressed": r,
			disabled: n,
			onMouseDown: (e) => e.preventDefault(),
			onClick: i,
			"data-testid": `${o}-${e}`,
			icon: a
		})
	}, e);
	return /* @__PURE__ */ H(N, {
		label: i,
		className: r("flex flex-nowrap items-center gap-0.5", a),
		"data-testid": o,
		children: [
			U.map((n) => s(n, ki[n], e === n, () => t(e === n ? null : n), /* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: r("text-sm leading-none", ji[n].className),
				children: ji[n].text
			}))),
			/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: "mx-0.5 h-4 w-px bg-border"
			}),
			s("plain", "Plain", void 0, () => t(null), /* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: "text-sm leading-none line-through decoration-text-tertiary",
				children: "T"
			}))
		]
	});
}
function Ni(e) {
	if (e.variant === "icons") return /* @__PURE__ */ V(Mi, { ...e });
	let { active: t, onApply: n, disabled: a = !1, label: o = "Text emphasis", className: s, testIdPrefix: c = "emphasis" } = e;
	return /* @__PURE__ */ H(N, {
		label: o,
		className: r("flex flex-wrap items-center gap-0.5", s),
		"data-testid": c,
		children: [U.map((e) => /* @__PURE__ */ V(i, {
			variant: "ghost",
			size: "sm",
			"aria-pressed": t === e,
			disabled: a,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => n(t === e ? null : e),
			"data-testid": `${c}-${e}`,
			children: /* @__PURE__ */ V("span", {
				className: Ai[e],
				children: ki[e]
			})
		}, e)), /* @__PURE__ */ V(i, {
			variant: "ghost",
			size: "sm",
			disabled: a,
			onMouseDown: (e) => e.preventDefault(),
			onClick: () => n(null),
			"data-testid": `${c}-plain`,
			children: "Plain"
		})]
	});
}
function Pi({ text: e, className: t, testId: n }) {
	return /* @__PURE__ */ V("span", {
		className: r("min-w-0", t),
		"data-testid": n,
		children: /* @__PURE__ */ V(c, {
			as: "span",
			size: "sm",
			children: typeof e == "string" ? e : e.map((e, t) => /* @__PURE__ */ V("span", {
				className: e.emphasis ? Ai[e.emphasis] : void 0,
				"data-emphasis": e.emphasis,
				children: e.text
			}, t))
		})
	});
}
var Fi = _e(function({ value: e, onChange: t, emphasis: n = !0, disabled: i, className: a, "data-testid": o = "deck-text", "aria-label": s, ...c }, l) {
	let u = R(null), [d, f] = z(!1), [p, m] = z([0, 0]), h = F((e) => {
		u.current = e, typeof l == "function" ? l(e) : l && (l.current = e);
	}, [l]), g = () => {
		let e = u.current;
		e && m([e.selectionStart ?? 0, e.selectionEnd ?? 0]);
	}, _ = (e) => {
		e.currentTarget.contains(e.relatedTarget) || f(!1);
	}, v = (n) => {
		let r = u.current;
		t(Ei(e, r?.selectionStart ?? p[0], r?.selectionEnd ?? p[1], n));
	}, [y, b] = p, x = b > y, C = n && !i && d;
	return /* @__PURE__ */ H("div", {
		className: r("flex min-w-0 flex-1 flex-col gap-1", a),
		onFocus: () => f(!0),
		onBlur: _,
		children: [
			/* @__PURE__ */ V(S, {
				...c,
				ref: h,
				"aria-label": s,
				value: Ci(e),
				disabled: i,
				onChange: (n) => t(Oi(e, n.target.value)),
				onSelect: g,
				onKeyUp: g,
				onMouseUp: g,
				"data-testid": o
			}),
			C && /* @__PURE__ */ V(Ni, {
				label: s ? `${s}: emphasis` : "Text emphasis",
				active: x ? Di(e, y, b) : void 0,
				disabled: !x,
				onApply: v,
				testIdPrefix: `${o}-emphasis`
			}),
			typeof e != "string" && /* @__PURE__ */ V(Pi, {
				text: e,
				className: "block truncate",
				testId: `${o}-preview`
			})
		]
	});
});
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function Ii() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M4 4l8 8M12 4l-8 8",
			strokeLinecap: "round"
		})
	});
}
function Li({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a, max: o }) {
	let s = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ V(P, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ V("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, o) => /* @__PURE__ */ H("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ V(c, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ V(Fi, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${o + 1}`,
							onChange: (e) => s(o, e),
							"data-testid": `${a}-${o}`
						}),
						!r && /* @__PURE__ */ V(h, {
							"aria-label": `Remove ${e.toLowerCase()} ${o + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ V(Ii, {}),
							onClick: () => n(t.filter((e, t) => t !== o)),
							"data-testid": `${a}-remove-${o}`
						})
					]
				}, o))
			}),
			!r && /* @__PURE__ */ V(i, {
				variant: "ghost",
				size: "sm",
				disabled: t.length >= (o ?? 8),
				onClick: () => n([...t, ""]),
				"data-testid": `${a}-add`,
				className: "self-start",
				children: "Add bullet"
			})
		]
	});
}
function Ri({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H("div", {
				className: "flex items-end gap-2",
				children: [/* @__PURE__ */ V(T, {
					label: "Chart type",
					className: "w-40",
					children: (i) => /* @__PURE__ */ V(C, {
						...i,
						size: "sm",
						value: e.kind,
						disabled: n,
						options: Yt.map((e) => ({
							value: e,
							label: Xt[e]
						})),
						onChange: (n) => t({
							...e,
							kind: n.target.value
						}),
						"data-testid": `${r}-kind`
					})
				}), !n && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(i, {
					variant: "ghost",
					size: "sm",
					disabled: e.labels.length >= s,
					onClick: v,
					"data-testid": `${r}-add-label`,
					children: "Add row"
				}), /* @__PURE__ */ V(i, {
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
			/* @__PURE__ */ V(c, {
				size: "xs",
				tone: "tertiary",
				"data-testid": `${r}-limits`,
				children: o ? `${e.labels.length} of 6 slices · one series` : `${e.labels.length} of 24 rows · ${e.series.length} of 6 series`
			}),
			_ && /* @__PURE__ */ V(c, {
				size: "xs",
				tone: "danger",
				role: "alert",
				"data-testid": `${r}-pie-problem`,
				children: _
			}),
			/* @__PURE__ */ V("div", {
				className: "overflow-x-auto rounded-md border border-border",
				children: /* @__PURE__ */ H(m, {
					"data-testid": `${r}-table`,
					children: [/* @__PURE__ */ V(p, { children: /* @__PURE__ */ H(u, { children: [
						/* @__PURE__ */ V(f, { children: "Label" }),
						e.series.map((i, a) => /* @__PURE__ */ V(f, { children: /* @__PURE__ */ H("div", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ V(S, {
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
							}), !n && e.series.length > 1 && /* @__PURE__ */ V(h, {
								"aria-label": `Remove series ${a + 1}`,
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ V(Ii, {}),
								onClick: () => t({
									...e,
									series: e.series.filter((e, t) => t !== a)
								}),
								"data-testid": `${r}-remove-series-${a}`
							})]
						}) }, a)),
						!n && /* @__PURE__ */ V(f, {})
					] }) }), /* @__PURE__ */ V(d, { children: e.labels.map((i, o) => /* @__PURE__ */ H(u, { children: [
						/* @__PURE__ */ V(l, { children: /* @__PURE__ */ V(S, {
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
						e.series.map((e, t) => /* @__PURE__ */ V(l, { children: /* @__PURE__ */ V(S, {
							size: "sm",
							type: "number",
							value: String(e.values[o] ?? 0),
							disabled: n,
							"aria-label": `${e.name} at ${i}`,
							onChange: (e) => a(t, o, e.target.value),
							"data-testid": `${r}-value-${t}-${o}`
						}) }, t)),
						!n && /* @__PURE__ */ V(l, { children: /* @__PURE__ */ V(h, {
							"aria-label": `Remove row ${o + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ V(Ii, {}),
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
function zi({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, icons: c, graphics: l, testIdPrefix: u }) {
	let d = (n) => t({
		...e,
		...n
	}), f = e.layout, p = sn(f);
	return /* @__PURE__ */ H("div", {
		className: r("flex flex-col gap-3"),
		"data-testid": `${u}-form`,
		children: [
			/* @__PURE__ */ H("div", {
				className: "grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
				children: [/* @__PURE__ */ V(T, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ V(S, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => d({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${u}-eyebrow`
					})
				}), /* @__PURE__ */ V(T, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ V(Fi, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => d({ title: e }),
						"data-slide-title": "",
						"data-testid": `${u}-title`
					})
				})]
			}),
			(f === "big-number" || f === "image-text" || f === "image-full" || f === "kpi") && /* @__PURE__ */ V(Li, {
				label: f === "big-number" ? "The story" : "Supporting points",
				bullets: e.bullets ?? [],
				onChange: (e) => d({ bullets: e.length ? e : void 0 }),
				readOnly: a,
				max: f === "big-number" ? 3 : void 0,
				testIdPrefix: `${u}-bullets`
			}),
			e.layout === "bullets" && /* @__PURE__ */ V(Li, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => d({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${u}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ H("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ V(Li, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => d({ columns: [t.map((e) => W(e)), e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${u}-column-0`
				}), /* @__PURE__ */ V(Li, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => d({ columns: [e.columns?.[0] ?? [], t.map((e) => W(e))] }),
					readOnly: a,
					testIdPrefix: `${u}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ V(Ri, {
				chart: e.chart,
				onChange: (e) => d({ chart: e }),
				readOnly: a,
				testIdPrefix: `${u}-chart`
			}),
			(e.layout === "quote" || e.layout === "big-quote") && /* @__PURE__ */ H("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ V(T, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ V(ae, {
						...t,
						rows: 3,
						maxLength: 400,
						value: e.quote?.text ?? "",
						disabled: a,
						onChange: (t) => d({ quote: {
							text: t.target.value,
							by: e.quote?.by ?? ""
						} }),
						"data-testid": `${u}-quote-text`
					})
				}), /* @__PURE__ */ V(T, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ V(S, {
						...t,
						value: e.quote?.by ?? "",
						disabled: a,
						onChange: (t) => d({ quote: {
							text: e.quote?.text ?? "",
							by: t.target.value
						} }),
						"data-testid": `${u}-quote-by`
					})
				})]
			}),
			e.layout === "image" && /* @__PURE__ */ V(T, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ V(S, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => d({ image: { alt: e.target.value } }),
					"data-testid": `${u}-image-alt`
				})
			}),
			(f === "key-figures" || f === "big-number" || f === "kpi") && e.figures && /* @__PURE__ */ V(_i, {
				figures: f === "big-number" ? e.figures.slice(0, 1) : e.figures,
				onChange: (e) => d({ figures: e }),
				bounds: p,
				icons: c,
				readOnly: a,
				testIdPrefix: `${u}-figures`
			}),
			f === "kpi" && e.chart && /* @__PURE__ */ V(Ri, {
				chart: e.chart,
				onChange: (e) => d({ chart: e }),
				readOnly: a,
				testIdPrefix: `${u}-chart`
			}),
			(f === "image-text" || f === "image-full") && e.image && /* @__PURE__ */ V(ui, {
				image: e.image,
				layout: f,
				onChange: (e) => d({ image: e }),
				readOnly: a,
				testIdPrefix: `${u}-image`
			}),
			(f === "cards" || f === "process") && e.items && p && /* @__PURE__ */ V(ai, {
				items: e.items,
				onChange: (e) => d({ items: e }),
				bounds: p,
				noun: f === "cards" ? "card" : "step",
				icons: c,
				readOnly: a,
				testIdPrefix: `${u}-items`
			}),
			f === "matrix" && e.matrix && /* @__PURE__ */ V(si, {
				matrix: e.matrix,
				onChange: (e) => d({ matrix: e }),
				icons: c,
				readOnly: a,
				testIdPrefix: `${u}-matrix`
			}),
			f === "people" && e.people && /* @__PURE__ */ V(ci, {
				people: e.people,
				onChange: (e) => d({ people: e }),
				readOnly: a,
				testIdPrefix: `${u}-people`
			}),
			f === "funnel" && e.funnel && /* @__PURE__ */ V(li, {
				stages: e.funnel,
				onChange: (e) => d({ funnel: e }),
				readOnly: a,
				testIdPrefix: `${u}-funnel`
			}),
			e.layout === "table" && e.table && /* @__PURE__ */ V(vi, {
				table: e.table,
				onChange: (e) => d({ table: e }),
				readOnly: a,
				testIdPrefix: `${u}-table`
			}),
			e.layout === "comparison" && e.comparison && /* @__PURE__ */ V(yi, {
				comparison: e.comparison,
				onChange: (e) => d({ comparison: e }),
				icons: c,
				readOnly: a,
				testIdPrefix: `${u}-comparison`
			}),
			e.layout === "timeline" && e.timeline && /* @__PURE__ */ V(bi, {
				steps: e.timeline,
				onChange: (e) => d({ timeline: e }),
				readOnly: a,
				testIdPrefix: `${u}-timeline`
			}),
			e.layout === "agenda" && e.agenda && /* @__PURE__ */ V(xi, {
				agenda: e.agenda,
				onChange: (e) => d({ agenda: e }),
				readOnly: a,
				testIdPrefix: `${u}-agenda`
			}),
			e.layout === "closing" && e.closing && /* @__PURE__ */ V(Si, {
				closing: e.closing,
				onChange: (e) => d({ closing: e }),
				readOnly: a,
				testIdPrefix: `${u}-closing`
			}),
			l && /* @__PURE__ */ V(di, {
				value: e.decoration,
				graphics: l,
				onChange: (n) => {
					let r = { ...e };
					n === void 0 ? delete r.decoration : r.decoration = n, t(r);
				},
				readOnly: a,
				testIdPrefix: `${u}-decoration`
			}),
			s && /* @__PURE__ */ V(T, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ V(ae, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => d({ notes: e.target.value || void 0 }),
					"data-testid": `${u}-notes`
				})
			}),
			o && /* @__PURE__ */ V(Hr, {
				sources: e.sources,
				onChange: (e) => d({ sources: e }),
				options: n,
				onSearchSources: i,
				readOnly: a,
				testIdPrefix: u
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideStage.tsx
var Bi = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function Vi({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ V("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ H("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", Bi[a]),
			children: [e, t && /* @__PURE__ */ H("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${s}-generating`,
				children: [/* @__PURE__ */ V("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ V(c, {
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
var Hi = [
	"chart",
	"quote",
	"image",
	"two-column"
], Ui = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
};
function Wi(e, t) {
	return Qt(e) ? t.find((t) => t.id === e.ref)?.name ?? e.ref : Ui[e] ?? e;
}
var Gi = {
	narrow: 640,
	chart: 760,
	wide: 900
};
function Ki(e) {
	return e == null ? "wide" : e < Gi.narrow ? "narrow" : e < Gi.wide ? "medium" : "wide";
}
var qi = {
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
}, Ji = "Text style comes from the theme", Yi = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function Xi({ redo: e }) {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "-scale-x-100"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ V("path", {
			d: "M5.5 4.5L3 7l2.5 2.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ V("path", {
			d: "M3.5 7h6a3.5 3.5 0 010 7H7",
			strokeLinecap: "round"
		})]
	});
}
function Zi() {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Qi() {
	return /* @__PURE__ */ V("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function $i({ label: e, value: t }) {
	return /* @__PURE__ */ H("span", {
		className: "inline-flex items-center gap-1 text-[12px]",
		children: [
			/* @__PURE__ */ V("span", {
				className: "text-text-secondary",
				children: e
			}),
			t && /* @__PURE__ */ V("span", {
				className: "font-medium text-text-primary",
				children: t
			}),
			/* @__PURE__ */ V(g, { size: 12 })
		]
	});
}
function ea({ slide: e, theme: t, themes: n = [], onAddSlide: o, canAddSlide: s = !0, onBrowseLayouts: l, onLayoutChange: u, onThemeChange: d, onThemeRefChange: f, onChartKindChange: p, onUndo: m, onRedo: g, canUndo: v = !1, canRedo: y = !1, onPresent: b, end: x, disabled: S = !1, className: C, testIdPrefix: w = "slides-toolbar", hiddenLayouts: T, size: E = "auto" }) {
	let { ref: ee, ...te } = M(), { ref: ne, width: re } = le(ee), k = E === "auto" ? Ki(re) : E, ie = qi[k], ae = k !== "medium" || re == null || re >= Gi.chart, A = (e) => ie.has(e) && (e !== "chart" || ae), j = S, N = !j && e ? {
		label: "Layout of this slide",
		items: Bt.filter((e) => !T?.includes(e)).map((t) => ({
			label: Ut[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && u(t);
			},
			"data-testid": `${w}-layout-${t}`
		}))
	} : null, oe = !j && s ? {
		label: "New slide after this one",
		items: Hi.map((e) => ({
			label: `${Ut[e]} slide`,
			onSelect: () => o(e),
			"data-testid": `${w}-insert-${e}`
		})).concat(l ? [{
			label: "All layouts…",
			onSelect: l,
			"data-testid": `${w}-insert-all`
		}] : [])
	} : null, se = Qt(t) ? t.ref : null, ce = j ? null : {
		label: "Deck theme",
		items: Zt.map((e) => ({
			label: Ui[e],
			checked: e === t,
			onSelect: () => {
				e !== t && d(e);
			},
			"data-testid": `${w}-theme-${e}`
		})).concat((f ? n : []).map((e) => ({
			label: e.name,
			checked: e.id === se,
			onSelect: () => {
				e.id !== se && f?.({ ref: e.id });
			},
			"data-testid": `${w}-theme-ref-${e.id}`
		})))
	}, P = Wi(t, n), ue = !j && e?.layout === "chart" && e.chart && p ? e.chart : null, de = ue && p ? {
		label: "Chart type",
		items: Yt.map((e) => ({
			label: Xt[e],
			checked: ue.kind === e,
			onSelect: () => {
				ue.kind !== e && p(e);
			},
			"data-testid": `${w}-chart-kind-${e}`
		}))
	} : null, fe = ue && ue.kind !== "bar" && ue.kind !== "line" && A("chart") ? ue.kind : null, pe = fe ? [
		"bar",
		"line",
		fe
	] : ["bar", "line"], me = [];
	return !A("layout") && N && me.push(N), !A("insert") && oe && me.push(oe), !A("theme") && ce && me.push(ce), !A("chart") && de && me.push(de), (!A("note") || fe) && !j && me.push({
		label: Ji,
		items: [],
		"data-testid": `${w}-style-note`
	}), /* @__PURE__ */ H("div", {
		...te,
		ref: ne,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": k,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", C),
		"data-testid": w,
		children: [
			/* @__PURE__ */ V(i, {
				variant: "primary",
				size: "sm",
				disabled: j || !s,
				onClick: () => o(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${w}-new-slide`,
				children: /* @__PURE__ */ H("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ V(_, { size: 12 }), "New slide"]
				})
			}),
			A("layout") && N && e && /* @__PURE__ */ V(D, {
				trigger: /* @__PURE__ */ V($i, {
					label: "Layout",
					value: Ut[e.layout]
				}),
				triggerLabel: `Layout: ${Ut[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-layout`,
				sections: [N],
				"data-testid": `${w}-layout-menu`
			}),
			A("insert") && oe && /* @__PURE__ */ V(D, {
				trigger: /* @__PURE__ */ V($i, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-insert`,
				sections: [oe],
				"data-testid": `${w}-insert-menu`
			}),
			A("theme") && ce && /* @__PURE__ */ V(D, {
				trigger: /* @__PURE__ */ V($i, {
					label: "Theme",
					value: P
				}),
				triggerLabel: `Theme: ${P}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-theme`,
				sections: [ce],
				"data-testid": `${w}-theme-menu`
			}),
			A("chart") && ue && p && /* @__PURE__ */ V(a, {
				density: "compact",
				children: /* @__PURE__ */ V(O, {
					value: ue.kind,
					onChange: (e) => p(e),
					options: pe.map((e) => ({
						value: e,
						label: Xt[e]
					})),
					"aria-label": "Chart type",
					className: "shrink-0",
					"data-testid": `${w}-chart-kind`
				})
			}),
			(m || g) && /* @__PURE__ */ H(B, { children: [
				/* @__PURE__ */ V(Qi, {}),
				m && /* @__PURE__ */ V(h, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ V(Xi, {}),
					disabled: j || !v,
					onClick: m,
					"data-testid": `${w}-undo`
				}),
				g && /* @__PURE__ */ V(h, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ V(Xi, { redo: !0 }),
					disabled: j || !y,
					onClick: g,
					"data-testid": `${w}-redo`
				})
			] }),
			me.length > 0 && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(Qi, {}), /* @__PURE__ */ V(D, {
				trigger: /* @__PURE__ */ V("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-more`,
				sections: me,
				"data-testid": `${w}-more-menu`
			})] }),
			A("note") && !fe && /* @__PURE__ */ V(c, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-xs text-text-tertiary",
				title: Yi,
				"data-testid": `${w}-style-note`,
				children: Ji
			}),
			/* @__PURE__ */ V("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			x,
			b && /* @__PURE__ */ V(i, {
				variant: "secondary",
				size: "sm",
				onClick: b,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${w}-present`,
				children: /* @__PURE__ */ H("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ V(Zi, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/LayoutGallery.tsx
function $({ wide: e = !1, center: t = !1 }) {
	return /* @__PURE__ */ V("span", { className: r("block h-1.5 rounded-sm bg-text-tertiary", e ? "w-3/4" : "w-1/2", t && "mx-auto") });
}
function ta({ count: e = 3, className: t }) {
	let n = [
		"w-full",
		"w-5/6",
		"w-2/3",
		"w-4/5",
		"w-3/4",
		"w-1/2"
	];
	return /* @__PURE__ */ V("span", {
		className: r("flex flex-col gap-1", t),
		children: Array.from({ length: e }, (e, t) => /* @__PURE__ */ V("span", { className: r("block h-1 rounded-sm bg-border-emphasis", n[t % n.length]) }, t))
	});
}
function na() {
	return /* @__PURE__ */ V("span", {
		className: "flex min-h-0 flex-1 items-end gap-1 border-b border-l border-border-emphasis px-1",
		children: [
			"h-1/3",
			"h-2/3",
			"h-1/2",
			"h-full",
			"h-3/4"
		].map((e, t) => /* @__PURE__ */ V("span", { className: r("block w-full rounded-t-sm bg-primary/50", e) }, t))
	});
}
function ra() {
	return /* @__PURE__ */ V("span", {
		className: "grid flex-1 grid-cols-3 gap-1.5",
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ H("span", {
			className: "flex flex-col items-center justify-center gap-1 rounded-sm bg-surface",
			children: [/* @__PURE__ */ V("span", { className: "block h-2.5 w-2/3 rounded-sm bg-primary/60" }), /* @__PURE__ */ V("span", { className: "block h-1 w-1/2 rounded-sm bg-border-emphasis" })]
		}, e))
	});
}
function ia() {
	return /* @__PURE__ */ V("span", {
		className: "grid flex-1 grid-cols-4 gap-px overflow-hidden rounded-sm bg-border-emphasis",
		children: Array.from({ length: 16 }, (e, t) => /* @__PURE__ */ V("span", { className: r("block", t < 4 ? "bg-primary/30" : "bg-surface") }, t))
	});
}
function aa({ titled: e = !1 }) {
	return /* @__PURE__ */ V("span", {
		className: "grid flex-1 grid-cols-2 gap-2",
		children: [0, 1].map((t) => /* @__PURE__ */ H("span", {
			className: r("flex flex-col gap-1", e && "rounded-sm bg-surface p-1"),
			children: [e && /* @__PURE__ */ V("span", { className: "block h-1.5 w-1/2 rounded-sm bg-primary/50" }), /* @__PURE__ */ V(ta, { count: 3 })]
		}, t))
	});
}
function oa() {
	return /* @__PURE__ */ H("span", {
		className: "relative flex flex-1 items-center justify-between px-1",
		children: [/* @__PURE__ */ V("span", { className: "absolute inset-x-1 top-1/2 block h-px bg-border-emphasis" }), [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ H("span", {
			className: "relative flex flex-col items-center gap-1",
			children: [/* @__PURE__ */ V("span", { className: "block h-2 w-2 rounded-full bg-primary/70" }), /* @__PURE__ */ V("span", { className: "block h-1 w-5 rounded-sm bg-border-emphasis" })]
		}, e))]
	});
}
function sa() {
	return /* @__PURE__ */ V("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ H("span", {
			className: "flex items-center gap-1.5",
			children: [/* @__PURE__ */ V("span", { className: r("block h-2 w-2 rounded-sm", e === 1 ? "bg-primary" : "bg-border-emphasis") }), /* @__PURE__ */ V("span", { className: r("block h-1 rounded-sm", e === 1 ? "w-2/3 bg-primary/60" : "w-1/2 bg-border-emphasis") })]
		}, e))
	});
}
function ca({ count: e = 3, numbered: t = !1 }) {
	return /* @__PURE__ */ V("span", {
		className: r("grid flex-1 gap-1.5", e === 4 ? "grid-cols-4" : "grid-cols-3"),
		children: Array.from({ length: e }, (e, n) => /* @__PURE__ */ H("span", {
			className: "flex flex-col gap-1 rounded-sm bg-surface p-1",
			children: [
				/* @__PURE__ */ V("span", { className: r("block h-2 w-2 bg-primary/60", t ? "rounded-full" : "rounded-sm") }),
				/* @__PURE__ */ V("span", { className: "block h-1 w-3/4 rounded-sm bg-text-tertiary" }),
				/* @__PURE__ */ V("span", { className: "block h-1 w-1/2 rounded-sm bg-border-emphasis" })
			]
		}, n))
	});
}
function la() {
	return /* @__PURE__ */ V("span", {
		className: "grid flex-1 grid-cols-4 gap-1.5",
		children: [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ H("span", {
			className: "flex flex-col items-center gap-1",
			children: [/* @__PURE__ */ V("span", { className: "block h-4 w-4 rounded-full bg-primary/40" }), /* @__PURE__ */ V("span", { className: "block h-1 w-3/4 rounded-sm bg-text-tertiary" })]
		}, e))
	});
}
function ua() {
	return /* @__PURE__ */ V("span", {
		className: "flex flex-1 flex-col items-center justify-center gap-1",
		children: [
			"w-full",
			"w-3/4",
			"w-1/2",
			"w-1/4"
		].map((e) => /* @__PURE__ */ V("span", { className: r("block h-1.5 rounded-sm bg-primary/50", e) }, e))
	});
}
function da() {
	return /* @__PURE__ */ V("span", {
		className: "grid flex-1 grid-cols-2 gap-px overflow-hidden rounded-sm bg-border-emphasis",
		children: [
			0,
			1,
			2,
			3
		].map((e) => /* @__PURE__ */ V("span", { className: r("block", e === 1 ? "bg-primary/30" : "bg-surface") }, e))
	});
}
var fa = {
	title: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ V($, { wide: !0 }), /* @__PURE__ */ V("span", { className: "block h-1 w-1/3 rounded-sm bg-border-emphasis" })]
	}),
	section: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ V("span", { className: "block h-1 w-1/5 rounded-sm bg-primary/60" }), /* @__PURE__ */ V($, {})]
	}),
	bullets: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ta, { count: 4 })] }),
	"two-column": () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(aa, {})] }),
	chart: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(na, {})] }),
	quote: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5 px-2",
		children: [/* @__PURE__ */ V(ta, { count: 2 }), /* @__PURE__ */ V("span", { className: "block h-1 w-1/4 self-end rounded-sm bg-primary/60" })]
	}),
	image: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V("span", { className: "block flex-1 rounded-sm bg-primary/20" })] }),
	"key-figures": () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ra, {})] }),
	table: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ia, {})] }),
	comparison: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(aa, { titled: !0 })] }),
	timeline: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(oa, {})] }),
	agenda: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(sa, {})] }),
	closing: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ V($, {
			wide: !0,
			center: !0
		}), /* @__PURE__ */ V(ta, {
			count: 2,
			className: "mx-auto w-1/2"
		})]
	}),
	"big-quote": () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5 px-1",
		children: [
			/* @__PURE__ */ V("span", { className: "block h-3 w-3 rounded-sm bg-primary/60" }),
			/* @__PURE__ */ V("span", { className: "block h-2 w-full rounded-sm bg-text-tertiary" }),
			/* @__PURE__ */ V("span", { className: "block h-2 w-3/4 rounded-sm bg-text-tertiary" })
		]
	}),
	process: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ca, {
		count: 4,
		numbered: !0
	})] }),
	cards: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ca, { count: 3 })] }),
	matrix: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(da, {})] }),
	"big-number": () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 items-center gap-2",
		children: [/* @__PURE__ */ V("span", { className: "block h-6 w-1/3 rounded-sm bg-primary/60" }), /* @__PURE__ */ V(ta, {
			count: 3,
			className: "flex-1"
		})]
	}),
	"image-text": () => /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-2 gap-2",
		children: [/* @__PURE__ */ V("span", { className: "block rounded-sm bg-primary/20" }), /* @__PURE__ */ H("span", {
			className: "flex flex-col justify-center gap-1.5",
			children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ta, { count: 2 })]
		})]
	}),
	"image-full": () => /* @__PURE__ */ V("span", {
		className: "flex flex-1 flex-col justify-end gap-1 rounded-sm bg-primary/25 p-1.5",
		children: /* @__PURE__ */ V("span", { className: "block h-1.5 w-1/2 rounded-sm bg-text-primary" })
	}),
	people: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(la, {})] }),
	funnel: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V($, {}), /* @__PURE__ */ V(ua, {})] }),
	kpi: () => /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V("span", {
		className: "grid grid-cols-3 gap-1",
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ V("span", { className: "block h-2 rounded-sm bg-primary/50" }, e))
	}), /* @__PURE__ */ V(na, {})] })
};
function pa({ layout: e, className: t }) {
	return /* @__PURE__ */ V("span", {
		"aria-hidden": "true",
		"data-layout-schematic": e,
		className: r("flex aspect-video w-full flex-col gap-2 overflow-hidden rounded-md border border-border bg-surface-muted p-3", t),
		children: fa[e]()
	});
}
function ma({ svg: e, layout: t, className: n }) {
	let i = Le(e);
	return i ? /* @__PURE__ */ V("span", {
		className: r("block aspect-video w-full overflow-hidden rounded-md border border-border bg-surface", n),
		children: /* @__PURE__ */ V("img", {
			src: i,
			alt: "",
			draggable: !1,
			loading: "lazy",
			className: "block h-full w-full object-contain",
			"data-preview": "svg"
		})
	}) : t ? /* @__PURE__ */ V(pa, {
		layout: t,
		className: n
	}) : /* @__PURE__ */ V("span", {
		"aria-hidden": "true",
		className: r("block aspect-video w-full rounded-md border border-border bg-surface-muted", n)
	});
}
function ha({ onSelect: e, layouts: t, hiddenLayouts: n, previews: i, selected: a, label: o = "Slide layouts", className: s, testIdPrefix: l = "layout-gallery" }) {
	let u = new Set(n ?? []), d = (t, n) => /* @__PURE__ */ V("ul", {
		"aria-label": n,
		className: "m-0 grid list-none grid-cols-1 gap-3 p-0 @md:grid-cols-2 @2xl:grid-cols-3",
		children: t.filter((e) => !u.has(e)).map((t) => /* @__PURE__ */ V("li", {
			className: "min-w-0",
			children: /* @__PURE__ */ H(v, {
				selected: a === t,
				onSelect: () => e(t),
				className: "flex h-full flex-col gap-2",
				"data-testid": `${l}-${t}`,
				"data-layout": t,
				children: [/* @__PURE__ */ V(ma, {
					svg: i?.[t],
					layout: t
				}), /* @__PURE__ */ H("span", {
					className: "flex min-w-0 flex-col gap-0.5",
					children: [/* @__PURE__ */ V(c, {
						as: "span",
						size: "sm",
						weight: "medium",
						className: "block",
						children: Ut[t]
					}), /* @__PURE__ */ V(c, {
						as: "span",
						size: "xs",
						tone: "secondary",
						className: "block",
						children: Wt[t]
					})]
				})]
			})
		}, t))
	});
	return t ? /* @__PURE__ */ V("div", {
		className: r("@container min-w-0", s),
		"data-testid": l,
		children: d(t, o)
	}) : /* @__PURE__ */ V("div", {
		role: "group",
		"aria-label": o,
		className: r("@container flex min-w-0 flex-col gap-4", s),
		"data-testid": l,
		children: Ht.filter((e) => e.layouts.some((e) => !u.has(e))).map((e) => /* @__PURE__ */ H("section", {
			className: "flex flex-col gap-2",
			"data-testid": `${l}-group-${e.id}`,
			children: [/* @__PURE__ */ V(P, {
				as: "div",
				children: e.label
			}), d(e.layouts, e.label)]
		}, e.id))
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRegionsOverlay.tsx
function ga(e, t) {
	let n = (e) => `"${e.replace(/["\\;{}<>]/g, "")}"`;
	return {
		carlito: "\"Carlito\", \"Calibri\", \"Segoe UI\", system-ui, sans-serif",
		calibri: "\"Calibri\", \"Carlito\", \"Segoe UI\", system-ui, sans-serif",
		"liberation sans": "\"Liberation Sans\", Arial, Helvetica, sans-serif",
		arial: "Arial, \"Liberation Sans\", Helvetica, sans-serif",
		gelasio: "\"Gelasio\", Georgia, \"Times New Roman\", serif",
		georgia: "Georgia, \"Gelasio\", \"Times New Roman\", serif"
	}[e.trim().toLowerCase()] || [
		n(e),
		t ? n(t) : null,
		"sans-serif"
	].filter(Boolean).join(", ");
}
function _a(e) {
	return e ? {
		vars: {
			"--region-font": ga(e.fontFamily, e.officeFamily),
			"--region-color": e.color,
			"--region-lh": String(Math.round(e.lineHeight / e.fontSize * 1e3) / 1e3),
			"--region-ls": `${e.letterSpacing ?? 0}px`,
			"--region-bg": e.background ?? "transparent"
		},
		className: r("[font-family:var(--region-font)] [color:var(--region-color)] [line-height:var(--region-lh)] [letter-spacing:var(--region-ls)] [background-color:var(--region-bg)]", e.fontWeight >= 600 ? "font-bold" : "font-normal", e.italic && "italic", e.uppercase && "uppercase", e.align === "center" ? "text-center" : e.align === "right" ? "text-right" : "text-left")
	} : {};
}
function va(e, t = ya) {
	let n = t.height * .125, r = e.y >= n || t.height - (e.y + e.h) < n ? "above" : "below", i = (e, t) => e / t * 100;
	return {
		side: r,
		anchor: e.x + e.w / 2 <= t.width / 2 ? "left" : "right",
		top: i(r === "above" ? e.y : e.y + e.h, t.height),
		left: i(Math.max(0, e.x), t.width),
		right: i(Math.max(0, t.width - (e.x + e.w)), t.width)
	};
}
var ya = {
	width: 960,
	height: 540
}, ba = {
	bullets: "Bullet",
	figures: "Figure",
	people: "Person",
	funnel: "Stage",
	timeline: "Step",
	quadrants: "Quadrant"
}, xa = {
	title: "title",
	text: "text",
	icon: "icon",
	value: "value",
	label: "label",
	delta: "change",
	context: "context",
	name: "name",
	role: "role",
	detail: "detail",
	date: "date",
	by: "attribution",
	alt: "description"
};
function Sa(e) {
	return e.replace(/\[(\d+)\]/g, ".$1");
}
var Ca = {
	bullets: null,
	items: "title",
	figures: "value",
	people: "name",
	funnel: "label",
	timeline: "label"
};
function wa(e) {
	if (e.row) return e.row;
	let [t, n, r, ...i] = Sa(e.path).split(".");
	if (!t || !(t in Ca) || n === void 0 || !/^\d+$/.test(n) || i.length) return;
	let a = Ca[t];
	if (!(a === null ? r !== void 0 : r !== a)) return {
		list: t,
		index: Number(n)
	};
}
function Ta(e, t) {
	let n = Sa(e);
	if (n.startsWith("deck.")) {
		let e = n.slice(5);
		return e === "title" ? "Deck title" : e === "subtitle" ? "Deck subtitle" : `Deck ${e}`;
	}
	let r = n.split(".");
	if (r[0] === "table") {
		if (r[1] === "header") return `Table heading ${Number(r[2]) + 1}`;
		if (r[1] === "rows") return `Table row ${Number(r[2]) + 1}, column ${Number(r[3]) + 1}`;
	}
	if (r[0] === "comparison" && (r[1] === "left" || r[1] === "right")) {
		let e = r[1] === "left" ? "Left" : "Right";
		return r[2] === "points" ? `${e} point ${Number(r[3]) + 1}` : `${e} side ${xa[r[2] ?? ""] ?? r[2] ?? ""}`.trim();
	}
	if (r[0] === "quote") return r[1] === "by" ? "Quote attribution" : "Quote";
	if (r[0] === "closing") return r[1] === "nextSteps" ? `Next step ${Number(r[2]) + 1}` : `Closing ${r[1] === "line" ? "line" : r[1]}`;
	if (r[0] === "agenda" && r[1] === "items") return `Agenda item ${Number(r[2]) + 1}`;
	if (r.length === 1) return {
		title: "Slide title",
		eyebrow: "Eyebrow",
		chart: "Chart",
		image: "Image",
		decoration: "Slide graphic"
	}[e] ?? e.charAt(0).toUpperCase() + e.slice(1);
	let [i, a, o, ...s] = r;
	if (i === "matrix" && a === "quadrants") return `${[
		"Top left",
		"Top right",
		"Bottom left",
		"Bottom right"
	][Number(o)] ?? "Quadrant"} quadrant${s[0] ? ` ${xa[s[0]] ?? s[0]}` : ""}`;
	let c = Number(a);
	return Number.isNaN(c) ? `${i} ${r.slice(1).join(" ")}` : `${i === "items" ? t === "process" ? "Step" : "Card" : ba[i] ?? i} ${c + 1}${o ? ` ${xa[o] ?? o}` : ""}`;
}
function Ea(e, t = ya) {
	let n = t.height / 40;
	return e.slice().sort((e, t) => Math.round(e.box.y / n) - Math.round(t.box.y / n) || e.box.x - t.box.x);
}
function Da(e, t) {
	return JSON.stringify(e) === JSON.stringify(t);
}
var Oa = "flex h-5 w-5 items-center justify-center rounded-sm border border-border bg-surface text-[10px] leading-none text-text-primary shadow-sm hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary";
function ka({ regions: e, slideSize: t = ya, layout: n, onEdit: i, onPick: a, onRowAdd: o, onRowRemove: s, onRowMove: c, editPath: l, onEditPathChange: u, pickedPath: d, readOnly: f = !1, className: p, testIdPrefix: m = "slide-regions" }) {
	let h = e, [g, _] = z(null), [v, y] = z([0, 0]), [b, x] = z({}), S = R(null), C = R(/* @__PURE__ */ new Set()), w = R(/* @__PURE__ */ new Map()), T = R(!1);
	I(() => {
		x((t) => {
			let n = Object.keys(t).filter((n) => {
				let r = e.find((e) => e.path === n);
				return r && r.value !== void 0 && Da(r.value, t[n]);
			});
			if (!n.length) return t;
			let r = { ...t };
			for (let e of n) delete r[e];
			return r;
		});
	}, [e]);
	let E = (e) => {
		if (f) return;
		if (e.kind !== "text" && e.kind !== "runs") {
			a?.(e);
			return;
		}
		let t = b[e.path] ?? e.value ?? "";
		T.current = !1, _({
			path: e.path,
			draft: e.kind === "runs" ? t : Ci(t)
		});
	};
	I(() => {
		if (!l) return;
		let t = e.find((e) => e.path === l);
		t && E(t), u?.(null);
	}, [l]), I(() => {
		if (!g) return;
		let e = S.current;
		e && document.activeElement !== e && (e.focus({ preventScroll: !0 }), e.select());
	}, [g?.path]);
	let D = (t) => {
		if (!g) return;
		let n = e.find((e) => e.path === g.path), r = b[g.path] ?? n?.value ?? "";
		t && !Da(r, g.draft) && (x((e) => ({
			...e,
			[g.path]: g.draft
		})), i(g.path, g.draft));
		let a = g.path;
		_(null), queueMicrotask(() => w.current.get(a)?.focus({ preventScroll: !0 }));
	}, ee = (e, t) => {
		if (e.key === "Escape") {
			e.preventDefault(), e.stopPropagation(), T.current = !0, D(!1);
			return;
		}
		e.key === "Enter" && !(t.multiline && e.shiftKey) && (e.preventDefault(), D(!0));
	}, te = (e) => {
		let t = e.relatedTarget;
		t && [...C.current].some((e) => e.contains(t)) || T.current || D(!0);
	}, ne = () => {
		let e = S.current;
		e && y([e.selectionStart ?? 0, e.selectionEnd ?? 0]);
	}, O = (e) => {
		if (!g) return;
		let t = S.current, n = t?.selectionStart ?? v[0], r = t?.selectionEnd ?? v[1];
		_({
			...g,
			draft: Ei(g.draft, n, r, e)
		}), t?.focus({ preventScroll: !0 });
	}, re = (e) => {
		e && C.current.add(e);
	}, { width: k, height: ie } = t, ae = g ? e.find((e) => e.path === g.path) : void 0, A = g && ae?.kind === "runs" ? va(ae.box, t) : null;
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V("svg", {
		viewBox: `0 0 ${k} ${ie}`,
		preserveAspectRatio: "xMidYMid meet",
		className: r("absolute inset-0 h-full w-full overflow-visible", p),
		"data-testid": m,
		role: "group",
		"aria-label": "Slide elements",
		children: h.map((e) => {
			let { x: t, y: i, w: a, h: l } = e.box, u = e.label ?? Ta(e.path, n), p = g?.path === e.path, h = b[e.path], v = wa(e), y = _a(e.text), x = e.text?.fontSize ?? e.fontSize;
			return /* @__PURE__ */ H("g", {
				className: "group",
				"data-region": e.path,
				children: [
					!p && h !== void 0 && /* @__PURE__ */ V("foreignObject", {
						x: t,
						y: i,
						width: a,
						height: l,
						fontSize: x,
						className: "pointer-events-none overflow-visible",
						children: /* @__PURE__ */ V("div", {
							className: r("h-full w-full overflow-hidden [font-size:inherit]", y.className ?? "bg-surface/90", y.className && "[&_*]:[font-family:inherit] [&_*]:[line-height:inherit]"),
							style: y.vars,
							"data-testid": `${m}-pending-${e.path}`,
							children: /* @__PURE__ */ V(Pi, {
								text: h,
								className: "[&_*]:[font-size:inherit]"
							})
						})
					}),
					p ? /* @__PURE__ */ V("foreignObject", {
						x: t,
						y: i,
						width: a,
						height: l,
						fontSize: x,
						className: "overflow-visible",
						ref: re,
						children: /* @__PURE__ */ V("textarea", {
							style: y.vars,
							"data-styled": e.text ? "slide" : void 0,
							ref: S,
							"aria-label": u,
							value: Ci(g.draft),
							maxLength: e.maxLength,
							rows: 1,
							onChange: (t) => _({
								path: e.path,
								draft: Oi(g.draft, t.target.value)
							}),
							onKeyDown: (t) => ee(t, e),
							onBlur: te,
							onSelect: ne,
							onKeyUp: ne,
							onMouseUp: ne,
							className: r("block min-h-full w-full resize-none overflow-hidden p-0 [field-sizing:content] [font-size:inherit]", y.className ? r("rounded-none border-0 shadow-none outline outline-1 outline-offset-2 outline-primary/70 caret-primary", y.className) : "rounded-sm border border-primary bg-surface leading-tight text-text-primary shadow-md outline-none"),
							"data-testid": `${m}-editor`,
							"data-path": e.path
						})
					}) : /* @__PURE__ */ V("foreignObject", {
						x: t,
						y: i,
						width: a,
						height: l,
						children: /* @__PURE__ */ V("button", {
							type: "button",
							ref: (t) => {
								t ? w.current.set(e.path, t) : w.current.delete(e.path);
							},
							"aria-label": u,
							"aria-pressed": e.kind !== "text" && e.kind !== "runs" ? d === e.path : void 0,
							disabled: f,
							onClick: () => E(e),
							className: r("block h-full w-full cursor-text rounded-sm border border-transparent bg-transparent p-0 hover:border-primary/60 focus-visible:border-primary focus-visible:outline-none aria-pressed:border-primary", e.kind !== "text" && e.kind !== "runs" && "cursor-pointer"),
							"data-testid": `${m}-region-${e.path}`,
							"data-kind": e.kind
						})
					}),
					v && !f && !p && (o || s || c) && /* @__PURE__ */ V("foreignObject", {
						x: t + a - 96,
						y: Math.max(0, i - 22),
						width: 96,
						height: 22,
						className: "overflow-visible",
						children: /* @__PURE__ */ H("div", {
							className: "flex h-full items-center justify-end gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100",
							"data-testid": `${m}-row-${e.path}`,
							children: [
								c && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V("button", {
									type: "button",
									className: Oa,
									"aria-label": `Move ${u} earlier`,
									disabled: v.index === 0,
									onClick: () => c(v.list, v.index, v.index - 1),
									"data-testid": `${m}-row-up-${e.path}`,
									children: "↑"
								}), /* @__PURE__ */ V("button", {
									type: "button",
									className: Oa,
									"aria-label": `Move ${u} later`,
									onClick: () => c(v.list, v.index, v.index + 1),
									"data-testid": `${m}-row-down-${e.path}`,
									children: "↓"
								})] }),
								o && /* @__PURE__ */ V("button", {
									type: "button",
									className: Oa,
									"aria-label": `Add after ${u}`,
									onClick: () => o(v.list, v.index),
									"data-testid": `${m}-row-add-${e.path}`,
									children: "+"
								}),
								s && /* @__PURE__ */ V("button", {
									type: "button",
									className: Oa,
									"aria-label": `Remove ${u}`,
									onClick: () => s(v.list, v.index),
									"data-testid": `${m}-row-remove-${e.path}`,
									children: "×"
								})
							]
						})
					})
				]
			}, e.path);
		})
	}), A && g && ae && (() => {
		let [e, t] = v, i = {
			"--bar-top": `${A.top}%`,
			"--bar-left": `${A.left}%`,
			"--bar-right": `${A.right}%`
		};
		return /* @__PURE__ */ V("div", {
			ref: re,
			style: i,
			onBlur: te,
			className: r("absolute z-10 flex max-w-full flex-nowrap items-center rounded-md border border-border bg-surface p-0.5 shadow-md [top:var(--bar-top)]", A.side === "above" ? "-translate-y-[calc(100%_+_6px)]" : "translate-y-[6px]", A.anchor === "left" ? "[left:var(--bar-left)]" : "[right:var(--bar-right)]"),
			"data-testid": `${m}-emphasis-bar`,
			"data-side": A.side,
			"data-anchor": A.anchor,
			children: /* @__PURE__ */ V(Ni, {
				variant: "icons",
				label: `${ae.label ?? Ta(ae.path, n)}: emphasis`,
				active: t > e ? Di(g.draft, e, t) : void 0,
				disabled: t <= e,
				onApply: O,
				testIdPrefix: `${m}-emphasis`
			})
		});
	})()] });
}
//#endregion
//#region src/components/doc-editor/presentation/DeckStylePicker.tsx
var Aa = {
	bold: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-end gap-1 rounded-sm bg-primary p-2",
		children: [/* @__PURE__ */ V("span", { className: "block h-2 w-3/4 rounded-sm bg-text-inverse" }), /* @__PURE__ */ V("span", { className: "block h-1 w-1/3 rounded-sm bg-text-inverse/60" })]
	}),
	editorial: () => /* @__PURE__ */ H("span", {
		className: "relative flex flex-1 flex-col justify-center gap-1 bg-surface p-2",
		children: [
			/* @__PURE__ */ V("span", { className: "absolute right-1.5 top-1.5 block h-3 w-3 border-r-2 border-t-2 border-primary" }),
			/* @__PURE__ */ V("span", { className: "block h-px w-1/4 bg-text-primary" }),
			/* @__PURE__ */ V("span", { className: "block h-2 w-2/3 bg-text-primary" }),
			/* @__PURE__ */ V("span", { className: "block h-1 w-1/2 bg-border-emphasis" })
		]
	}),
	minimal: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col justify-center gap-1 bg-surface p-3",
		children: [/* @__PURE__ */ V("span", { className: "block h-1.5 w-1/2 rounded-sm bg-text-secondary" }), /* @__PURE__ */ V("span", { className: "block h-px w-full bg-border" })]
	}),
	playful: () => /* @__PURE__ */ H("span", {
		className: "relative flex flex-1 items-end gap-1 overflow-hidden rounded-lg bg-primary/15 p-2",
		children: [
			/* @__PURE__ */ V("span", { className: "absolute -right-2 -top-2 block h-8 w-8 rounded-full bg-primary/50" }),
			/* @__PURE__ */ V("span", { className: "absolute left-2 top-2 block h-1.5 w-1.5 rounded-full bg-accent" }),
			/* @__PURE__ */ V("span", { className: "absolute left-6 top-4 block h-1 w-1 rounded-full bg-primary" }),
			/* @__PURE__ */ V("span", { className: "block h-4 flex-1 rounded-md bg-surface" }),
			/* @__PURE__ */ V("span", { className: "block h-4 flex-1 rounded-md bg-surface" })
		]
	}),
	corporate: () => /* @__PURE__ */ H("span", {
		className: "flex flex-1 flex-col bg-surface",
		children: [/* @__PURE__ */ V("span", { className: "block h-2 w-full bg-primary" }), /* @__PURE__ */ H("span", {
			className: "flex flex-1 flex-col justify-center gap-1 p-2",
			children: [/* @__PURE__ */ V("span", { className: "block h-1.5 w-1/2 bg-text-primary" }), /* @__PURE__ */ H("span", {
				className: "grid grid-cols-3 gap-1",
				children: [
					/* @__PURE__ */ V("span", { className: "block h-2 bg-border-emphasis" }),
					/* @__PURE__ */ V("span", { className: "block h-2 bg-border-emphasis" }),
					/* @__PURE__ */ V("span", { className: "block h-2 bg-border-emphasis" })
				]
			})]
		})]
	})
};
function ja({ style: e, className: t }) {
	return /* @__PURE__ */ V("span", {
		"aria-hidden": "true",
		"data-style-swatch": e,
		className: r("flex aspect-video w-full overflow-hidden rounded-md border border-border bg-surface-inset", t),
		children: Aa[e]()
	});
}
function Ma({ value: e, onChange: t, previews: n, styles: i = Gt, label: a = "Deck styles", className: o, testIdPrefix: s = "deck-style-picker" }) {
	return /* @__PURE__ */ V("div", {
		className: r("@container min-w-0", o),
		"data-testid": s,
		children: /* @__PURE__ */ V("ul", {
			"aria-label": a,
			className: "m-0 grid list-none grid-cols-2 gap-2 p-0 @md:grid-cols-3 @2xl:grid-cols-5",
			children: i.map((r) => {
				let i = n?.[r];
				return /* @__PURE__ */ V("li", {
					className: "min-w-0",
					children: /* @__PURE__ */ H(v, {
						selected: e === r,
						onSelect: () => t(r),
						padding: "sm",
						className: "flex h-full flex-col gap-1.5",
						"data-testid": `${s}-${r}`,
						"data-style": r,
						children: [i ? /* @__PURE__ */ V("span", {
							className: "block aspect-video w-full overflow-hidden rounded-md border border-border bg-surface",
							children: /* @__PURE__ */ V("img", {
								src: i,
								alt: "",
								draggable: !1,
								loading: "lazy",
								className: "block h-full w-full object-cover",
								"data-preview": "image"
							})
						}) : /* @__PURE__ */ V(ja, { style: r }), /* @__PURE__ */ H("span", {
							className: "flex min-w-0 flex-col gap-0.5",
							children: [/* @__PURE__ */ V(c, {
								as: "span",
								size: "sm",
								weight: "medium",
								className: "block",
								children: Kt[r]
							}), /* @__PURE__ */ V(c, {
								as: "span",
								size: "xs",
								tone: "secondary",
								className: "block",
								children: qt[r]
							})]
						})]
					})
				}, r);
			})
		})
	});
}
//#endregion
//#region src/components/doc-editor/presentation/DeckPresentMode.tsx
function Na({ back: e }) {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Pa({ title: e, slides: t, slideIndex: n, onSlideChange: a, onExit: o, loading: l = !1, error: u, onRetry: d, showNotes: f = !1, onFocusConversation: p, className: m, testId: g = "deck-present" }) {
	let _ = R(null);
	I(() => {
		_.current?.focus({ preventScroll: !0 });
	}, []);
	let v = !u && !l && t.length > 0, y = Math.min(Math.max(n, 0), Math.max(t.length - 1, 0)), b = v ? t[y] : void 0, x = Le(b?.svg), S = (e) => {
		if (e.key === "Escape") {
			e.preventDefault(), e.stopPropagation(), o();
			return;
		}
		if (!v) return;
		let n = Me(e);
		if (!n) return;
		e.preventDefault();
		let r = Ne(n, y + 1, t.length);
		r !== y + 1 && a(r - 1);
	}, C = p ? () => {
		o(), requestAnimationFrame(() => p());
	} : void 0, w = u ? /* @__PURE__ */ V("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-error`,
		children: /* @__PURE__ */ V(te, {
			title: "Couldn't prepare the presentation",
			description: u,
			...d ? {
				actionLabel: "Retry preview",
				onAction: d
			} : {}
		})
	}) : l ? /* @__PURE__ */ V("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-loading`,
		children: /* @__PURE__ */ V(ne, { label: "Preparing your current slides…" })
	}) : b ? /* @__PURE__ */ V("div", {
		className: "flex min-h-[12rem] min-w-0 flex-1 items-center justify-center [container-type:size]",
		"data-testid": `${g}-stage-frame`,
		children: /* @__PURE__ */ V("div", {
			className: "w-full max-w-[calc(100cqh*16/9)]",
			children: /* @__PURE__ */ V(Vi, {
				className: "[&>[role=figure]]:max-w-none",
				label: `Slide ${y + 1} of ${t.length}: ${b.title}`,
				"data-testid": `${g}-stage`,
				children: x ? /* @__PURE__ */ V("img", {
					src: x,
					alt: b.title,
					className: "h-full w-full object-contain"
				}) : /* @__PURE__ */ V(c, {
					size: "sm",
					tone: "tertiary",
					"data-testid": `${g}-no-preview`,
					children: "This slide has not been rendered yet."
				})
			})
		})
	}) : /* @__PURE__ */ V("div", {
		className: "flex min-h-0 flex-1 items-center justify-center",
		"data-testid": `${g}-empty`,
		children: /* @__PURE__ */ V(ee, {
			title: "No slides to present",
			description: "This deck has no rendered slides yet."
		})
	});
	return /* @__PURE__ */ H("div", {
		ref: _,
		role: "group",
		tabIndex: -1,
		"aria-roledescription": "Presentation",
		"aria-label": b ? `Presenting ${e} — slide ${y + 1} of ${t.length}. Use the left and right arrow keys to change slide, Escape to exit.` : `Presenting ${e}. Escape to exit.`,
		onKeyDown: S,
		className: r("flex h-full min-h-0 flex-col gap-3 bg-surface-panel p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", m),
		"data-testid": g,
		children: [/* @__PURE__ */ H(s, {
			gap: "sm",
			align: "center",
			className: "shrink-0 justify-between",
			"data-testid": `${g}-header`,
			children: [/* @__PURE__ */ H(s, {
				gap: "xs",
				align: "center",
				className: "min-w-0",
				children: [/* @__PURE__ */ V(c, {
					size: "sm",
					weight: "semibold",
					children: "Presenting"
				}), /* @__PURE__ */ V(c, {
					size: "sm",
					tone: "secondary",
					truncate: !0,
					"data-testid": `${g}-title`,
					children: e
				})]
			}), /* @__PURE__ */ H(s, {
				gap: "xs",
				align: "center",
				children: [C && /* @__PURE__ */ V(i, {
					size: "sm",
					variant: "secondary",
					onClick: C,
					children: "Chat & agent"
				}), /* @__PURE__ */ V(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${g}-exit`,
					children: "Exit presentation"
				})]
			})]
		}), /* @__PURE__ */ H("div", {
			className: r("flex min-h-0 flex-1 flex-col gap-3", f && "lg:flex-row"),
			"data-testid": `${g}-body`,
			children: [/* @__PURE__ */ H("div", {
				className: "flex min-h-0 min-w-0 flex-1 flex-col gap-2",
				children: [w, b && /* @__PURE__ */ H(s, {
					gap: "sm",
					align: "center",
					className: "shrink-0 justify-center",
					"data-testid": `${g}-nav`,
					children: [
						/* @__PURE__ */ V(h, {
							"aria-label": "Previous slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ V(Na, { back: !0 }),
							disabled: y <= 0,
							onClick: () => a(y - 1),
							"data-testid": `${g}-previous`
						}),
						/* @__PURE__ */ V(c, {
							size: "sm",
							tone: "secondary",
							tabular: !0,
							"data-testid": `${g}-position`,
							children: `Slide ${y + 1} of ${t.length}`
						}),
						/* @__PURE__ */ V(h, {
							"aria-label": "Next slide",
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ V(Na, {}),
							disabled: y >= t.length - 1,
							onClick: () => a(y + 1),
							"data-testid": `${g}-next`
						})
					]
				})]
			}), f && b && /* @__PURE__ */ H("section", {
				"aria-label": "Speaker notes",
				className: "flex max-h-40 shrink-0 flex-col gap-1 overflow-y-auto rounded-lg border border-border bg-surface px-3 py-2 lg:max-h-none lg:w-80",
				"data-testid": `${g}-notes`,
				children: [/* @__PURE__ */ V(P, {
					as: "div",
					children: "Speaker notes"
				}), b.notes?.trim() ? /* @__PURE__ */ V(c, {
					as: "p",
					size: "sm",
					tone: "secondary",
					className: "m-0 whitespace-pre-wrap",
					children: b.notes
				}) : /* @__PURE__ */ V(c, {
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
function Fa(e, t) {
	let n = R(t);
	n.current = t, I(() => {
		if (e) return n.current?.(!0), () => n.current?.(!1);
	}, [e]);
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Ia({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Ye, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let l = ye(), u = ye(), d = e?.length ?? 0, f = d >= i * .9;
	return /* @__PURE__ */ H("section", {
		"data-ui-part": "",
		"aria-labelledby": l,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${s}-pane`,
		children: [/* @__PURE__ */ H("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ V(c, {
				as: "span",
				id: l,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ V(c, {
				as: "span",
				id: u,
				className: r("text-[11px] tabular-nums", f ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${s}-count`,
				children: `${d} / ${i}`
			})]
		}), /* @__PURE__ */ V(ae, {
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
function La({ testIdPrefix: e }) {
	return /* @__PURE__ */ V(oe, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Ra = ve(() => import("./PresentationAgentComposer-J7u6LDom.js").catch(() => ({ default: La })));
function za({ back: e }) {
	return /* @__PURE__ */ V("svg", {
		viewBox: "0 0 16 16",
		className: r("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Ba(e, t) {
	let [n, r] = z({
		past: [],
		future: []
	}), i = R(null), a = R(0);
	return I(() => {
		if (i.current === e) {
			i.current = null;
			return;
		}
		i.current = null, r((e) => e.past.length || e.future.length ? {
			past: [],
			future: []
		} : e);
	}, [e]), {
		edit: F((n) => {
			if (n === e) return;
			let o = Date.now(), s = o - a.current < 800;
			a.current = o, r((t) => ({
				past: s && t.past.length ? t.past : [...t.past.slice(-49), e],
				future: []
			})), i.current = n, t(n);
		}, [e, t]),
		undo: F(() => {
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
		redo: F(() => {
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
function Va({ spec: e, onChange: t, preview: n, onRequestPreview: o, onSaveRevision: l, revisions: u, activeRevisionId: d, onSelectRevision: f, olderRevisions: p, sources: m, onSearchSources: g, onDownload: _, onOpenPresentationView: v, onFocusModeChange: y, showNotes: x = !1, previewCurrent: w = !0, readOnly: E = !1, onInstruct: D, instructHints: O, onUndoInstruct: re, generatingSlideIds: ie, slideViewers: ae, selectSlideRequest: j, footer: M, renderFrame: N, onSelectedSlideChange: se, themes: ce, layoutPreviews: le, layoutGalleryOpen: P, onLayoutGalleryOpenChange: ue, slideFindings: de, slideRegions: fe, slideSize: _e, onRegionEdit: ve, onRowAdd: ye, onRowRemove: xe, onRowMove: Se, icons: Ce, graphics: we, onDecorationChange: Te, hiddenLayouts: Ee, deckStyle: De, onDeckStyleChange: Oe, stylePreviews: Pe, ref: Fe, className: Re, "data-testid": U = "presentation-editor" }) {
	let [ze, Be] = z(!1), Ve = P !== void 0, He = Ve ? P : ze, Ue = R(ue);
	Ue.current = ue;
	let We = F((e) => {
		e !== He && (Ve || Be(e), Ue.current?.(e));
	}, [He, Ve]), Ge = R(null), Ke = R(null), [qe, Je] = z(null), Ye = !!fe, [Xe, Ze] = z(null), [Qe, $e] = z(null), et = F((e) => {
		Je((t) => ({
			id: e,
			n: (t?.n ?? 0) + 1
		}));
	}, []), [tt, nt] = z(!1);
	Fa(tt, y);
	let [rt, it] = z(() => e.slides[0]?.id ?? ""), [at, ot] = z(!1), [st, ct] = z(null), lt = !!D, [ut, dt] = z("slide"), [ft, pt] = z(!1), [mt, ht] = z(null), [gt, _t] = z(null), [vt, yt] = z(() => /* @__PURE__ */ new Set()), { edit: G, undo: bt, redo: xt, canUndo: St, canRedo: Ct } = Ba(e, t), [wt, Tt] = z([]);
	I(() => {
		typeof n == "object" && "slides" in n && Tt(n.slides);
	}, [n]);
	let Et = R(o);
	Et.current = o;
	let K = e.slides, Dt = L(() => new Set($t(e)), [e]), Ot = Dt.size === 0;
	I(() => {
		Ot && Et.current(e);
	}, [e, Ot]);
	let kt = typeof n == "object" && "slides" in n ? n.slides : wt, At = L(() => new Map(kt.map((e) => [e.id, e.svg])), [kt]), jt = L(() => {
		let e = new Set(K.map((e) => e.id));
		return kt.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [kt, K]), Mt = K.length + jt.length, Nt = K.findIndex((e) => e.id === rt), Pt = Nt === -1 ? jt.findIndex((e) => e.id === rt) : -1, q = Nt === -1 ? Pt === -1 ? 0 : K.length + Pt : Nt, J = Nt !== -1 || Pt === -1 ? K[q] : void 0, Ft = Pt === -1 ? void 0 : jt[Pt], It = J?.id ?? Ft?.id, Lt = J ? W(J.title) || "Untitled slide" : Ft?.title, Rt = L(() => [...K.map((e) => e.id), ...jt.map((e) => e.id)], [K, jt]), zt = Math.min(q, K.length - 1), Bt = R(se);
	Bt.current = se, I(() => {
		It && Bt.current?.(It, q);
	}, [It, q]);
	let Vt = L(() => {
		let e = new Set(ie ?? []);
		return ft && ut === "slide" && J && e.add(J.id), [...e];
	}, [
		ie,
		ft,
		ut,
		J
	]), Ht = !!J && Vt.includes(J.id), Ut = K.map((e) => ({
		slide: e,
		thumbnailSvg: At.get(e.id),
		uncited: Dt.has(e.id),
		changed: vt.has(e.id),
		...de?.[e.id]?.length ? { findings: de[e.id] } : {}
	})), Wt = F((e) => {
		it(e);
	}, []), Gt = j?.key, Kt = j?.slideId;
	I(() => {
		Kt && e.slides.some((e) => e.id === Kt) && it(Kt);
	}, [Gt, Kt]);
	let qt = F((t, n) => {
		G(dn(e, t, n));
	}, [G, e]), Jt = F((t) => {
		let n = fn(e, zt, t);
		if (n === e) return !1;
		G(n);
		let r = n.slides[zt + 1].id;
		return it(r), et(r), !0;
	}, [
		G,
		e,
		zt,
		et
	]), Yt = F((t) => {
		let n = pn(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		G(n);
		let i = n.slides[r + 1].id;
		it(i), et(i);
	}, [
		G,
		e,
		et
	]), Xt = F((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = mn(e, t);
		r !== e && (G(r), it(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [G, e]), Zt = F((t) => G(un(e, t)), [G, e]), Qt = J?.id;
	I(() => {
		if (!qe || E) return;
		if (Qt !== qe.id) {
			Je(null);
			return;
		}
		if (Ye) {
			if (He) return;
			Je(null), Ze("title");
			return;
		}
		let e = Ke.current, t = e?.querySelector("input[data-slide-title]");
		if (!e || !t) return;
		Je(null), t.focus({ preventScroll: !0 }), t.select();
		let n = e.getBoundingClientRect(), r = t.getBoundingClientRect();
		(r.top < n.top || r.bottom > n.bottom) && (e.scrollTop += r.top - n.top - 8);
	}, [
		qe,
		Qt,
		E,
		He,
		Ye
	]), be(Fe, () => ({ focusSlideTitle: (t) => {
		E || !e.slides.some((e) => e.id === t) || (it(t), et(t));
	} }), [
		E,
		e,
		et
	]);
	let en = F(async (e) => {
		if (!D || ft) return !1;
		let t = J?.id;
		pt(!0), _t(null);
		try {
			let n = await D(e, ut === "slide" && t ? {
				slideId: t,
				scope: ut
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return yt(new Set(r)), ht(n?.summary?.trim() || "Done."), ut === "deck" && r.length && (!t || !r.includes(t)) && it(r[0]), !0;
		} catch (e) {
			return _t(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			pt(!1);
		}
	}, [
		D,
		ft,
		ut,
		J?.id
	]), tn = F(() => {
		re?.(), ht(null), yt(/* @__PURE__ */ new Set());
	}, [re]), nn = Dt.size, an = !E && K.length > 0 && nn === 0 && !at, on = F(() => {
		an && (ot(!0), ct(null), Promise.resolve(l(ln(e))).catch((e) => {
			ct(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => ot(!1)));
	}, [
		an,
		l,
		e
	]), sn = F((e) => {
		let t = Rt[q + e];
		t && it(t);
	}, [Rt, q]);
	I(() => {
		if (E || tt) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), on();
				return;
			}
			if (He) return;
			if (t && e.key.toLowerCase() === "z" && !je(e.target)) {
				e.preventDefault(), e.shiftKey ? xt() : bt();
				return;
			}
			let n = Me(e);
			if (!n) return;
			e.preventDefault();
			let r = Ne(n, q + 1, Mt);
			r !== q + 1 && sn(r - (q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		E,
		tt,
		He,
		on,
		bt,
		xt,
		sn,
		q,
		Mt
	]);
	let cn = R(null), gn = He || tt;
	I(() => {
		if (gn || !cn.current) return;
		let e = cn.current();
		cn.current = null, e?.focus();
	}, [gn]);
	let _n = (e) => () => typeof document > "u" ? null : document.querySelector(`[data-testid="${e}"]`), vn = F(() => {
		let e = typeof document > "u" ? null : document.querySelector("[aria-haspopup=\"menu\"][aria-expanded=\"true\"]");
		Ge.current = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), We(!0);
	}, [We]), yn = F(() => {
		let e = Ge.current, t = _n(`${U}-toolbar-insert`);
		cn.current = () => e?.isConnected ? e : t(), We(!1);
	}, [U, We]), bn = R(null);
	I(() => {
		He && bn.current?.focus();
	}, [He]);
	let xn = F(() => {
		cn.current = _n(`${U}-toolbar-present`), nt(!1);
	}, [U]);
	if (E) {
		let t = (u.length > 0 ? u : [{
			id: d,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === d ? [...K.map((e, t) => {
				let n = Le(At.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: W(e.title) || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ V("img", {
						src: n,
						alt: W(e.title) || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...jt.map((e, t) => {
				let n = Le(e.svg);
				return {
					id: e.id,
					index: K.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ V("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ V(Ie, {
			title: e.title,
			revisions: t,
			revisionId: d,
			onRevisionChange: f,
			slideIndex: q + 1,
			onSlideChange: (e) => {
				let t = Rt[e - 1];
				t && it(t);
			},
			..._ ? { onDownload: _ } : {},
			className: Re,
			"data-testid": `${U}-readonly`
		});
	}
	let Sn = (() => {
		if (Ft) {
			let e = Le(Ft.svg);
			return e ? /* @__PURE__ */ V("img", {
				src: e,
				alt: Ft.title,
				className: "h-full w-full object-contain",
				"data-testid": `${U}-stage-image`
			}) : /* @__PURE__ */ V(c, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${U}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (J && Dt.has(J.id)) return /* @__PURE__ */ V(a, {
			density: "compact",
			children: /* @__PURE__ */ V(ee, {
				title: "Add a source to preview this slide",
				description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
				testId: `${U}-preview-needs-source`
			})
		});
		let t = J ? Le(At.get(J.id)) : void 0;
		if (!Ot && !t) return /* @__PURE__ */ V(a, {
			density: "compact",
			children: /* @__PURE__ */ V(ee, {
				title: "The preview waits for every slide's source",
				description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
				testId: `${U}-preview-needs-source`
			})
		});
		if (n === "loading" && At.size === 0) return /* @__PURE__ */ V(ne, {
			label: "Rendering the deck…",
			testId: `${U}-preview-loading`
		});
		if (Ot && typeof n == "object" && "error" in n) return /* @__PURE__ */ V(te, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => o(e),
			testId: `${U}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ V("img", {
			src: r,
			alt: W(J.title) || `Slide ${q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${U}-stage-image`
		}) : /* @__PURE__ */ V(c, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${U}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Cn = u.map((e) => ({
		id: e.id,
		label: e.label
	})), wn = /* @__PURE__ */ H("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${U}-revision-controls`,
		children: [
			Cn.length > 5 || (p?.count ?? 0) > 0 ? /* @__PURE__ */ V(C, {
				size: "sm",
				"aria-label": "Revision",
				value: d,
				onChange: (e) => Ae(e.target.value, f, p),
				options: ke(Cn, p),
				className: "w-auto",
				"data-testid": `${U}-revision-select`
			}) : Cn.length > 0 && /* @__PURE__ */ V(k, {
				items: Cn,
				value: d,
				onValueChange: f,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${U}-revisions`
			}),
			/* @__PURE__ */ V(i, {
				variant: "primary",
				size: "sm",
				disabled: !an,
				onClick: on,
				"data-testid": `${U}-save`,
				children: at ? "Saving…" : `Save as ${hn(u)}`
			}),
			_ && /* @__PURE__ */ V(i, {
				variant: "secondary",
				size: "sm",
				onClick: _,
				"data-testid": `${U}-download`,
				children: "Download .pptx"
			})
		]
	}), Tn = lt || N ? /* @__PURE__ */ H("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ V(pe, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => G({
				...e,
				title: t
			}),
			"data-testid": `${U}-deck-title`
		}), /* @__PURE__ */ V(pe, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => G({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${U}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ H("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ V(T, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ V(S, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => G({
					...e,
					title: t.target.value
				}),
				"data-testid": `${U}-deck-title`
			})
		}), /* @__PURE__ */ V(T, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ V(S, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => G({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${U}-deck-subtitle`
			})
		})]
	}), En = v ? () => v(It ? {
		slideId: It,
		slideIndex: q + 1
	} : void 0) : () => {
		We(!1), nt(!0);
	}, Dn = /* @__PURE__ */ V(B, { children: /* @__PURE__ */ V(ea, {
		slide: J,
		hiddenLayouts: Ee,
		theme: e.theme ?? "product",
		...ce?.length ? {
			themes: ce,
			onThemeRefChange: (t) => G({
				...e,
				theme: t
			})
		} : {},
		onBrowseLayouts: vn,
		onAddSlide: Jt,
		canAddSlide: K.length < 40,
		onLayoutChange: (t) => {
			J && G(un(e, rn(J, t)));
		},
		onThemeChange: (t) => G({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			J?.chart && G(un(e, {
				...J,
				chart: {
					...J.chart,
					kind: t
				}
			}));
		},
		onUndo: bt,
		onRedo: xt,
		canUndo: St,
		canRedo: Ct,
		onPresent: En,
		testIdPrefix: `${U}-toolbar`
	}) }), On = /* @__PURE__ */ H("section", {
		"aria-label": "Choose a layout",
		className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto",
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), yn());
		},
		"data-testid": `${U}-layout-panel`,
		children: [/* @__PURE__ */ H(s, {
			gap: "sm",
			align: "center",
			className: "shrink-0",
			"data-testid": `${U}-layout-panel-header`,
			children: [/* @__PURE__ */ H(i, {
				ref: bn,
				variant: "ghost",
				size: "sm",
				onClick: yn,
				"aria-label": Lt ? `Back to slide ${q + 1}: ${Lt}` : "Back to the deck",
				"data-testid": `${U}-layout-back`,
				children: [/* @__PURE__ */ V(za, { back: !0 }), "Back"]
			}), /* @__PURE__ */ V(c, {
				as: "div",
				size: "base",
				weight: "semibold",
				children: "Choose a layout"
			})]
		}), /* @__PURE__ */ V(ha, {
			previews: le,
			hiddenLayouts: Ee,
			onSelect: (e) => {
				yn(), Jt(e) && (cn.current = null);
			},
			testIdPrefix: `${U}-layout-gallery`
		})]
	}), kn = /* @__PURE__ */ H(B, { children: [nn > 0 && /* @__PURE__ */ V(oe, {
		tone: "warning",
		"data-testid": `${U}-uncited-warning`,
		children: nn === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${nn} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), st && /* @__PURE__ */ V(oe, {
		tone: "error",
		onDismiss: () => ct(null),
		"data-testid": `${U}-save-error`,
		children: st
	})] }), An = lt && /* @__PURE__ */ H(B, { children: [gt && /* @__PURE__ */ V(oe, {
		tone: "error",
		onDismiss: () => _t(null),
		"data-testid": `${U}-agent-error`,
		children: gt
	}), mt && !gt && /* @__PURE__ */ H("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${U}-agent-summary`,
		children: [
			/* @__PURE__ */ V(c, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${mt}`
			}),
			vt.size > 0 && /* @__PURE__ */ V(c, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: vt.size === 1 ? "1 slide marked in the filmstrip" : `${vt.size} slides marked in the filmstrip`
			}),
			re && /* @__PURE__ */ V(i, {
				variant: "ghost",
				size: "sm",
				onClick: tn,
				"data-testid": `${U}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), jn = lt && J && /* @__PURE__ */ V(ge, {
		fallback: /* @__PURE__ */ V(c, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${U}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ V(Ra, {
			scope: ut,
			onScopeChange: dt,
			slideLabel: `slide ${q + 1}`,
			busy: ft,
			onSubmit: en,
			...O?.length ? { suggestions: O } : {},
			testIdPrefix: U
		})
	}), Mn = {
		selectedSlide: J,
		...Ft ? { selectedGeneratedSlide: Ft } : {},
		selectedIndex: q,
		slideCount: Mt,
		selectSlide: Wt,
		markChanged: (e) => yt(new Set(e))
	}, Nn = typeof M == "function" ? M(Mn) : M, Pn = Nn != null && Nn !== !1 ? Nn : jn ? /* @__PURE__ */ V(me, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ H("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${U}-dock-card`,
			children: [An, jn]
		}),
		"data-testid": `${U}-dock`
	}) : null, Fn = J && /* @__PURE__ */ V(B, { children: lt ? /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(Hr, {
		compact: !0,
		sources: J.sources,
		onChange: (e) => Zt({
			...J,
			sources: e
		}),
		options: m,
		onSearchSources: g,
		testIdPrefix: `${U}-slide`
	}), /* @__PURE__ */ V(b, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${U}-details`,
		children: /* @__PURE__ */ V(zi, {
			slide: J,
			onChange: Zt,
			sources: m,
			onSearchSources: g,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${U}-slide`
		})
	})] }) : /* @__PURE__ */ V(zi, {
		slide: J,
		onChange: Zt,
		sources: m,
		onSearchSources: g,
		showNotes: !1,
		testIdPrefix: `${U}-slide`
	}) }), In = /* @__PURE__ */ H("div", {
		className: r("flex items-center justify-center gap-2", N && "ml-auto shrink-0"),
		"data-testid": `${U}-slide-nav`,
		children: [
			/* @__PURE__ */ V(h, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ V(za, { back: !0 }),
				disabled: q <= 0,
				onClick: () => sn(-1),
				"data-testid": `${U}-previous`
			}),
			/* @__PURE__ */ V(c, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${U}-position`,
				children: `Slide ${Mt === 0 ? 0 : q + 1} of ${Mt}`
			}),
			/* @__PURE__ */ V(h, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ V(za, {}),
				disabled: q >= Mt - 1,
				onClick: () => sn(1),
				"data-testid": `${U}-next`
			}),
			/* @__PURE__ */ V(A, {
				value: K.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${K.length} / 40`,
				className: "ml-2",
				"data-testid": `${U}-slide-meter`
			})
		]
	}), Ln = (e) => {
		J && e !== J && Zt(e);
	}, Rn = (e) => {
		if (!J) return;
		let t = { ...J };
		e === void 0 ? delete t.decoration : t.decoration = e, Ln(t), Te?.(J.id, e);
	}, zn = (t, n) => {
		if (J) {
			if (t.startsWith("deck.")) {
				let r = t.slice(5);
				if (r === "title" || r === "subtitle") {
					let t = typeof n == "string" ? n : W(n), i = { ...e };
					r === "subtitle" && !t ? delete i.subtitle : i[r] = t, G(i);
				}
				ve?.(J.id, t, n);
				return;
			}
			Ln(yr(J, t, n)), ve?.(J.id, t, n);
		}
	}, Bn = Qe && J && Qe.slideId === J.id ? Qe.region : null, Vn = (() => {
		if (!Bn || !J) return;
		let e = J;
		for (let t of Bn.path.replace(/\[(\d+)\]/g, ".$1").split(".")) e = e && typeof e == "object" ? e[t] : void 0;
		return e;
	})(), Hn = J ? fe?.[J.id] : void 0, Un = Bn && J && /* @__PURE__ */ H("section", {
		"aria-label": "Selected element",
		className: "flex flex-col gap-2 rounded-md border border-border bg-surface p-2",
		"data-testid": `${U}-pick-pane`,
		children: [
			/* @__PURE__ */ H(s, {
				gap: "sm",
				align: "center",
				className: "justify-between",
				children: [/* @__PURE__ */ V(c, {
					as: "div",
					size: "sm",
					weight: "semibold",
					children: Bn.label ?? (Bn.kind === "icon" ? "Icon" : Bn.kind === "graphic" ? "Slide graphic" : Bn.kind === "chart" ? "Chart" : "Element")
				}), /* @__PURE__ */ V(i, {
					variant: "ghost",
					size: "sm",
					onClick: () => $e(null),
					"data-testid": `${U}-pick-close`,
					children: "Done"
				})]
			}),
			Bn.kind === "icon" && Ce && /* @__PURE__ */ V(qr, {
				items: Ce.items,
				icons: Ce.icons,
				renderIcon: Ce.renderIcon,
				value: typeof Vn == "string" ? Vn : void 0,
				onSelect: (e) => zn(Bn.path, e ?? ""),
				testIdPrefix: `${U}-icon-picker`
			}),
			Bn.kind === "graphic" && we && /* @__PURE__ */ V(Qr, {
				items: we.items,
				renderGraphic: we.renderGraphic,
				graphicSvg: we.graphicSvg,
				value: J.decoration,
				onChange: (e) => {
					Rn(e), ve?.(J.id, "decoration", e);
				},
				testIdPrefix: `${U}-graphic-picker`
			}),
			Bn.kind === "chart" && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(c, {
				size: "xs",
				tone: "secondary",
				children: "The chart is drawn from the slide's sources. Change what it cites here, or edit its numbers in the outline."
			}), /* @__PURE__ */ V(Hr, {
				compact: !0,
				sources: J.sources,
				onChange: (e) => Zt({
					...J,
					sources: e
				}),
				options: m,
				onSearchSources: g,
				testIdPrefix: `${U}-chart`
			})] }),
			(Bn.kind === "image" || Bn.kind === "figure") && /* @__PURE__ */ V(zi, {
				slide: J,
				onChange: Zt,
				sources: m,
				showSources: !1,
				showNotes: !1,
				icons: Ce,
				testIdPrefix: `${U}-pick-form`
			})
		]
	}), Y = J && /* @__PURE__ */ H("aside", {
		"aria-label": "Slide settings",
		className: "flex min-w-0 flex-col gap-3 md:min-h-0 md:w-80 md:shrink-0 md:overflow-y-auto",
		"data-testid": `${U}-side-pane`,
		children: [
			Un,
			we && /* @__PURE__ */ V(di, {
				value: J.decoration,
				graphics: we,
				onChange: Rn,
				readOnly: E,
				testIdPrefix: `${U}-decoration`
			}),
			/* @__PURE__ */ V(Hr, {
				compact: !0,
				sources: J.sources,
				onChange: (e) => Zt({
					...J,
					sources: e
				}),
				options: m,
				onSearchSources: g,
				readOnly: E,
				testIdPrefix: `${U}-slide`
			}),
			Oe && /* @__PURE__ */ V(b, {
				summary: "Deck style",
				density: "compact",
				"data-testid": `${U}-style`,
				children: /* @__PURE__ */ V(Ma, {
					value: De,
					onChange: Oe,
					previews: Pe,
					testIdPrefix: `${U}-style-picker`
				})
			}),
			/* @__PURE__ */ V(b, {
				summary: "Speaker notes",
				density: "compact",
				"data-testid": `${U}-notes-strip`,
				children: /* @__PURE__ */ V(Ia, {
					value: J.notes,
					onChange: (e) => Zt({
						...J,
						notes: e
					}),
					"data-testid": `${U}-slide-notes`
				})
			}),
			/* @__PURE__ */ V(b, {
				summary: "Edit as outline",
				density: "compact",
				"data-testid": `${U}-outline`,
				children: /* @__PURE__ */ V("div", {
					ref: Ke,
					children: /* @__PURE__ */ V(zi, {
						slide: J,
						onChange: Zt,
						sources: m,
						onSearchSources: g,
						readOnly: E,
						showSources: !1,
						showNotes: !1,
						icons: Ce,
						testIdPrefix: `${U}-slide`
					})
				})
			})
		]
	}), Wn = /* @__PURE__ */ H("div", {
		className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:flex-row",
		"data-testid": `${U}-main`,
		children: [/* @__PURE__ */ H("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:[container-type:size]",
			"data-testid": `${U}-stage-region`,
			children: [
				/* @__PURE__ */ V("div", {
					className: "mx-auto w-full md:max-w-[calc(100cqh*16/9)]",
					"data-testid": `${U}-stage-frame`,
					children: /* @__PURE__ */ H(Vi, {
						generating: Ht,
						label: Lt ? `Slide ${q + 1} of ${Mt}: ${Lt}` : "No slide",
						maxWidth: "5xl",
						"data-testid": `${U}-stage`,
						children: [Sn, J && Hn && !Ht && /* @__PURE__ */ V(ka, {
							regions: Hn,
							slideSize: _e,
							layout: J.layout,
							readOnly: E,
							onEdit: zn,
							onPick: (e) => $e({
								slideId: J.id,
								region: e
							}),
							pickedPath: Bn?.path ?? null,
							onRowAdd: (e, t) => {
								Ln(Cr(J, e, t)), ye?.(J.id, e, t);
							},
							onRowRemove: (e, t) => {
								Ln(wr(J, e, t)), xe?.(J.id, e, t);
							},
							onRowMove: (e, t, n) => {
								Ln(Tr(J, e, t, n)), Se?.(J.id, e, t, n);
							},
							editPath: Xe,
							onEditPathChange: Ze,
							testIdPrefix: `${U}-regions`
						}, J.id)]
					})
				}),
				!N && In,
				Ft && /* @__PURE__ */ V(c, {
					size: "xs",
					tone: "tertiary",
					"data-testid": `${U}-generated-note`,
					children: `${Ft.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				})
			]
		}), Y]
	}), Gn = /* @__PURE__ */ H("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${U}-body`,
		children: [/* @__PURE__ */ V(Br, {
			items: Ut,
			selectedId: J?.id ?? "",
			onSelect: Wt,
			onMove: qt,
			onDuplicate: Yt,
			onDelete: Xt,
			onAdd: () => Jt(),
			canAdd: K.length < 40,
			generatingSlideIds: Vt,
			generatedItems: jt.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...ae ? { slideViewers: ae } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${U}-slide`
		}), He ? On : Ye ? Wn : /* @__PURE__ */ H("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-hidden md:[container-type:size]",
			"data-testid": `${U}-main`,
			children: [/* @__PURE__ */ H("div", {
				className: "flex shrink-0 flex-col gap-3",
				"data-testid": `${U}-stage-region`,
				children: [/* @__PURE__ */ V("div", {
					className: "mx-auto w-full md:max-w-[calc(max(14rem,min(55cqh,100cqh_-_12rem))*16/9)]",
					"data-testid": `${U}-stage-frame`,
					children: /* @__PURE__ */ V(Vi, {
						generating: Ht,
						label: Lt ? `Slide ${q + 1} of ${Mt}: ${Lt}` : "No slide",
						"data-testid": `${U}-stage`,
						children: Sn
					})
				}), !N && In]
			}), /* @__PURE__ */ H("div", {
				ref: Ke,
				className: "flex min-w-0 flex-col gap-3 md:min-h-0 md:flex-1 md:overflow-y-auto",
				"data-testid": `${U}-form-region`,
				children: [Ft && /* @__PURE__ */ V(c, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${U}-generated-note`,
					children: `${Ft.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}), J && /* @__PURE__ */ H("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ V(Ia, {
						value: J.notes,
						onChange: (e) => Zt({
							...J,
							notes: e
						}),
						"data-testid": `${U}-slide-notes`
					}), Fn]
				})]
			})]
		})]
	}), X = Ot ? typeof n == "object" && "error" in n ? n.error : void 0 : "Add a source to each slide before presenting.", Kn = !X && (!w || n === "loading"), qn = [...K.map((e, t) => ({
		id: e.id,
		title: W(e.title) || `Slide ${t + 1}`,
		...At.get(e.id) ? { svg: At.get(e.id) } : {},
		...e.notes ? { notes: e.notes } : {}
	})), ...jt.map((e) => ({
		id: e.id,
		title: e.title,
		generated: !0,
		...e.svg ? { svg: e.svg } : {}
	}))], Jn = /* @__PURE__ */ V(Pa, {
		title: e.title,
		slides: qn,
		slideIndex: q,
		onSlideChange: (e) => {
			let t = Rt[e];
			t && it(t);
		},
		onExit: xn,
		loading: Kn,
		...X ? { error: X } : {},
		...Ot && X ? { onRetry: () => o(e) } : {},
		showNotes: x,
		testId: `${U}-present`
	}), Yn = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (tt) {
		let e = /* @__PURE__ */ V("div", {
			className: r("flex h-full min-h-0 flex-col", Re),
			"data-testid": U,
			"data-presenting": "",
			children: Jn
		});
		return N ? /* @__PURE__ */ V(B, { children: N({
			toolbar: null,
			actions: null,
			surface: e,
			footer: null
		}) }) : e;
	}
	if (N) {
		let e = /* @__PURE__ */ H("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", Re),
			"data-testid": U,
			onKeyDown: Yn,
			children: [
				/* @__PURE__ */ H("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${U}-deck-line`,
					children: [Tn, In]
				}),
				kn,
				Gn
			]
		});
		return /* @__PURE__ */ V(B, { children: N({
			toolbar: Dn,
			actions: wn,
			surface: e,
			footer: Pn
		}) });
	}
	return /* @__PURE__ */ H("div", {
		className: r("relative flex h-full min-h-0 flex-col", Re),
		"data-testid": U,
		onKeyDown: Yn,
		children: [
			/* @__PURE__ */ H("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ H("div", {
					className: r("flex flex-wrap justify-between gap-2", lt ? "items-center" : "items-end"),
					...lt ? { "data-testid": `${U}-deck-line` } : {},
					children: [Tn, wn]
				}), /* @__PURE__ */ V("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Dn
				})]
			}),
			/* @__PURE__ */ H("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${U}-scroller`,
				children: [kn, Gn]
			}),
			/* @__PURE__ */ V("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${U}-dock-row`,
				children: /* @__PURE__ */ V(he.Provider, {
					value: "pinned",
					children: Pn
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/TemplateGallery.tsx
var Ha = 3;
function Ua(e) {
	return `${e} slide${e === 1 ? "" : "s"}`;
}
function Wa({ templates: e, onSelect: t, selectedId: n, loading: i = !1, loadingCount: a = 4, emptyTitle: o = "No templates yet", emptyDescription: s, label: l = "Deck templates", className: u, testIdPrefix: d = "template-gallery" }) {
	let f = "m-0 grid list-none grid-cols-1 gap-4 p-0 @md:grid-cols-2 @2xl:grid-cols-3 @5xl:grid-cols-4";
	return i ? /* @__PURE__ */ V("div", {
		className: r("@container min-w-0", u),
		"data-testid": d,
		"data-state": "loading",
		"aria-busy": "true",
		children: /* @__PURE__ */ V("ul", {
			"aria-label": `${l}, loading`,
			className: f,
			children: Array.from({ length: a }, (e, t) => /* @__PURE__ */ H("li", {
				className: "flex min-w-0 flex-col gap-2",
				"data-testid": `${d}-placeholder`,
				children: [
					/* @__PURE__ */ V("span", {
						className: "block aspect-video w-full overflow-hidden rounded-md",
						children: /* @__PURE__ */ V(ie, {
							height: "100%",
							rounded: "md"
						})
					}),
					/* @__PURE__ */ V(ie, {
						height: 14,
						rounded: "md"
					}),
					/* @__PURE__ */ V(ie, {
						height: 12,
						rounded: "md"
					})
				]
			}, t))
		})
	}) : e.length ? /* @__PURE__ */ V("div", {
		className: r("@container min-w-0", u),
		"data-testid": d,
		children: /* @__PURE__ */ V("ul", {
			"aria-label": l,
			className: f,
			children: e.map((e) => {
				let [r, ...i] = e.previews, a = i.slice(0, Ha), o = [Ua(e.slideCount), e.audience].filter(Boolean).join(" · ");
				return /* @__PURE__ */ V("li", {
					className: "min-w-0",
					children: /* @__PURE__ */ H(v, {
						selected: n === e.id,
						onSelect: () => t(e.id),
						className: "flex h-full flex-col gap-2",
						"data-testid": `${d}-${e.id}`,
						"data-template": e.id,
						children: [
							/* @__PURE__ */ V(ma, { svg: r }),
							a.length > 0 && /* @__PURE__ */ V("span", {
								className: "grid grid-cols-3 gap-1.5",
								"data-testid": `${d}-${e.id}-strip`,
								children: a.map((e, t) => /* @__PURE__ */ V(ma, {
									svg: e,
									className: "rounded-sm"
								}, t))
							}),
							/* @__PURE__ */ H("span", {
								className: "flex min-w-0 flex-col gap-0.5",
								children: [
									/* @__PURE__ */ V(c, {
										as: "span",
										size: "sm",
										weight: "medium",
										className: "block",
										truncate: !0,
										title: e.title,
										children: e.title
									}),
									/* @__PURE__ */ V(c, {
										as: "span",
										size: "xs",
										tone: "secondary",
										className: "block",
										clamp: 2,
										children: e.description
									}),
									/* @__PURE__ */ V(c, {
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
	}) : /* @__PURE__ */ V("div", {
		className: r("min-w-0", u),
		"data-testid": d,
		"data-state": "empty",
		children: /* @__PURE__ */ V(ee, {
			title: o,
			description: s,
			testId: `${d}-empty`
		})
	});
}
//#endregion
//#region src/components/doc-editor/ProposedEditStrip.tsx
var Ga = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function Ka(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => Ga[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function qa(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function Ja({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [s, c] = z(!1), [l, u] = z(""), d = Ka(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ H("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ H("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ V(o, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: qa(e)
					}),
					e.summary && /* @__PURE__ */ V("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ V("span", { className: "flex-1" }),
					f && /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ V(se, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ V(o, {
						size: "xs",
						tone: "success",
						"data-testid": `${a}-applied`,
						children: "Applied"
					}),
					!m && /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							r && e.status === "ready" && /* @__PURE__ */ V(i, {
								size: "sm",
								variant: "ghost",
								"aria-expanded": s,
								onClick: () => c((e) => !e),
								"data-testid": `${a}-revise`,
								children: "Revise…"
							}),
							/* @__PURE__ */ V(i, {
								size: "sm",
								variant: "ghost",
								disabled: p,
								onClick: () => n(e.id),
								"data-testid": `${a}-discard`,
								children: f ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ V(i, {
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
			d && /* @__PURE__ */ V("p", {
				className: "m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary",
				"data-testid": `${a}-preview`,
				children: d
			}),
			s && r && /* @__PURE__ */ H("form", {
				className: "flex min-w-0 items-center gap-2",
				onSubmit: (t) => {
					t.preventDefault();
					let n = l.trim();
					!n || !r || (r(e.id, n), u(""), c(!1));
				},
				"data-testid": `${a}-revise-form`,
				children: [/* @__PURE__ */ V(S, {
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
				}), /* @__PURE__ */ V(i, {
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
function Ya({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
	let d = e.filter((e) => e.status !== "discarded");
	if (d.length === 0) return null;
	let f = d.filter((e) => e.status === "ready").length, p = d.filter((e) => e.status === "ready" || e.status === "streaming").length, m = c ?? (d.length === 1 ? "Proposed edit" : `${d.length} proposed edits`);
	return /* @__PURE__ */ H("section", {
		"data-ui-part": "",
		"aria-label": m,
		"aria-live": "polite",
		className: r("flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm", l),
		"data-testid": u,
		children: [/* @__PURE__ */ H("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ V("span", {
					className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
					"data-testid": `${u}-title`,
					children: m
				}),
				s && p > 1 && /* @__PURE__ */ V(i, {
					size: "sm",
					variant: "ghost",
					onClick: s,
					"data-testid": `${u}-discard-all`,
					children: "Discard all"
				}),
				o && f > 1 && /* @__PURE__ */ V(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${u}-apply-all`,
					children: "Apply all"
				})
			]
		}), /* @__PURE__ */ V("ul", {
			className: "m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0",
			children: d.map((e) => /* @__PURE__ */ V(Ja, {
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
export { Jt as $, Ke as $t, Ni as A, yr as An, Ct as At, ci as B, ke as Bn, Dt as Bt, ea as C, hn as Cn, it as Ct, ki as D, mn as Dn, q as Dt, zi as E, W as En, J as Et, di as F, Kn as Fn, At as Ft, Hr as G, qe as Gt, Ur as H, Ue as Ht, li as I, rn as In, Nt as It, Mr as J, ot as Jt, Br as K, ct as Kt, ui as L, Le as Ln, jt as Lt, Ci as M, xr as Mn, bt as Mt, Oi as N, ze as Nn, xt as Nt, Fi as O, wr as On, It as Ot, Di as P, $t as Pn, Ye as Pt, Be as Q, mt as Qt, ai as R, Ie as Rn, Mt as Rt, Hi as S, Tr as Sn, at as St, Vi as T, He as Tn, Ft as Tt, qr as U, $e as Ut, Qr as V, De as Vn, Qe as Vt, Gr as W, Rt as Wt, Yt as X, _t as Xt, jr as Y, ht as Yt, Xt as Z, gt as Zt, Ta as _, pn as _n, ut as _t, Va as a, K as an, Vt as at, pa as b, nn as bn, Je as bt, Pa as c, Bt as cn, yt as ct, ya as d, Ut as dn, Ge as dt, ft as en, U as et, ka as f, Re as fn, Et as ft, Ea as g, ln as gn, lt as gt, Sa as h, en as hn, G as ht, Wa as i, kt as in, Zt as it, Ei as j, cn as jn, Ot as jt, Pi as k, un as kn, wt as kt, Ma as l, Wt as ln, Lt as lt, va as m, Cr as mn, Ze as mt, qa as n, tt as nn, qt as nt, Ia as o, pt as on, an as ot, ga as p, fn as pn, Xe as pt, zr as q, st as qt, Ka as r, Pt as rn, Kt as rt, Fa as s, zt as sn, vt as st, Ya as t, Tt as tn, Gt as tt, ja as u, Ht as un, We as ut, wa as v, Qt as vn, dt as vt, Ki as w, tn as wn, rt as wt, Gi as x, dn as xn, nt as xt, ha as y, sn as yn, St as yt, si as z, Oe as zn, et as zt };
