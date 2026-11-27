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
import { t as w } from "./FormField-BwK2AS6I.js";
import { t as T } from "./SearchInput-CPnuBA94.js";
import { t as E } from "./DropdownMenu-BhfFj91k.js";
import { t as ee } from "./EmptyState-BUeW7XOr.js";
import { t as te } from "./ErrorState-Cfh63LhO.js";
import { t as ne } from "./LoadingState-D19sK4DN.js";
import { t as re } from "./SegmentedControl-CKdSbD8t.js";
import { t as D } from "./StatusPill-DrTq5Ki4.js";
import { n as O } from "./Tabs-ChyOmBFc.js";
import { t as k } from "./SkeletonCard-DBVy8trP.js";
import { t as A } from "./Textarea-MJCZpfkl.js";
import { t as j } from "./DotMeter-B7TMlYNN.js";
import { n as ie } from "./RovingToolbar-CaWm5s1M.js";
import { t as M } from "./InlineAlert-DoLPfet9.js";
import { t as N } from "./ThinkingDots-CL7iPQV1.js";
import { t as ae } from "./PresenceAvatars-g_VszLJh.js";
import { t as oe } from "./useMeasuredWidth-Ba1Q33KU.js";
import { t as P } from "./SectionLabel-BVXGq_WP.js";
import { G as se, U as F } from "./renderers-CHFmP6SP.js";
import { a as ce } from "./composerSendError-BajHkkpC.js";
import { t as le } from "./InlineEditableText-B_sH74Yd.js";
import { i as ue, t as de } from "./FloatingComposerDock-DWGsFjIv.js";
import { Suspense as fe, lazy as I, useCallback as L, useEffect as R, useId as pe, useMemo as me, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var he = /* @__PURE__ */ new Set(["diagram", "presentation"]), ge = [
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
], _e = [
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
function ve(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function ye(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function be(t) {
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
function xe({ open: e, onClose: i, onCreate: a, onCreateFromFixture: s, onSearchDocuments: c, recordings: l, initialShape: u }) {
	let [d, f] = B([]), [p, m] = B(!1), [h, g] = B(null), [_, y] = B(null), [b, w] = B(""), [T, E] = B(""), [ee, te] = B(!1), [ne, re] = B(""), [D, O] = B("page"), [k, j] = B("blank"), [ie, M] = B(""), [N, ae] = B(""), [oe, P] = B([]), ce = z(null), le = z(null), ue = pe(), de = `${ue}-blank-label`, fe = `${ue}-type-label`, I = `${ue}-cookbook-label`, L = `${ue}-title`, xe = `${ue}-description`, Se = `${ue}-deck-from`, Ce = `${ue}-deck-source`;
	R(() => {
		if (!e) return;
		let r = n();
		f(r), g(null), y(null), w(""), E(""), te(!1), re(""), O(u ?? "page"), j("blank"), M(""), ae(""), P([]);
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
	let we = me(() => ge.filter((e) => ve(e, b)), [b]), Te = me(() => d.filter((e) => ye(e, b)), [d, b]), Ee = me(() => F.filter((e) => se(e, b)), [b]);
	if (R(() => {
		if (!e || D !== "presentation") return;
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
		D,
		k,
		N,
		l,
		c
	]), !e) return null;
	let De = d.find((e) => e.id === h), Oe = _ ? F.find((e) => e.id === _) : void 0, ke = D === "sections", Ae = !!Oe || !!De, W = d.length === 0 && !p && !Oe, je = we.length === 0 && Te.length === 0 && Ee.length === 0, Me = Oe ? {
		kind: "cookbook",
		cookbook: Oe
	} : De && !he.has(D) ? {
		kind: "type",
		type: De
	} : {
		kind: "blank",
		shape: D
	}, Ne = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), he.has(D) && O("page"), ee || E(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			O(e.shape), he.has(e.shape) && (y(null), ee || E(""));
			return;
		}
		y(null), g(e.type.id), ee || E("");
	}, Pe = (e) => e.kind === "blank" ? e.shape : he.has(D) ? "page" : D, Fe = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let o = ne.trim() || void 0;
		if (n === "presentation") {
			s ? s({
				from: k,
				...k !== "blank" && ie ? { sourceId: ie } : {},
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
			let t = be(e.cookbook);
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
	}, Ie = D === "presentation" && k !== "blank" && !ie, Le = !!T.trim() && (!ke || Ae) && !Ie, Re = () => {
		Le && Fe(Me, T, Pe(Me));
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
				e.key === "Enter" && !e.shiftKey && Le && Re();
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
							let t = Ee.length > 0 && b.trim() ? {
								kind: "cookbook",
								cookbook: Ee[0]
							} : we.length > 0 ? {
								kind: "blank",
								shape: we[0].id
							} : Te.length > 0 ? {
								kind: "type",
								type: Te[0]
							} : void 0;
							if (!t) return;
							Ne(t);
							let n = T.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								le.current?.focus();
								return;
							}
							Fe(t, n, Pe(t));
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
						we.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ H("div", {
								id: de,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": de,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: we.map((e) => /* @__PURE__ */ U(v, {
									padding: "md",
									selected: D === e.id,
									onSelect: () => Ne({
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
						D === "presentation" && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ H("label", {
									htmlFor: Se,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ H(C, {
									id: Se,
									value: k,
									options: _e.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										j(e.target.value), M(""), ae("");
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
										htmlFor: Ce,
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
										id: Ce,
										required: !0,
										"aria-required": "true",
										value: ie,
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
						Ee.length > 0 && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ U("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ H("div", {
									id: I,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ H("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: D === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : D === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : D === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ H("div", {
								role: "group",
								"aria-labelledby": I,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: Ee.map((e) => {
									let t = _ === e.id;
									return /* @__PURE__ */ U(v, {
										padding: "md",
										selected: t,
										onSelect: () => Ne({
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
						!he.has(D) && (Te.length > 0 || W || d.length === 0 && p) && /* @__PURE__ */ U("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ U("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ H("span", {
										id: fe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !ke && /* @__PURE__ */ H("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								d.length === 0 && p && /* @__PURE__ */ H("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								W && /* @__PURE__ */ H("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: ke ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								Te.length > 0 && /* @__PURE__ */ H("div", {
									role: "group",
									"aria-labelledby": fe,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Te.map((e) => {
										let t = !Oe && h === e.id;
										return /* @__PURE__ */ U("button", {
											"data-ui-part": "",
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Ne({
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
															children: D === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
							htmlFor: L,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ H("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ H(S, {
							ref: le,
							id: L,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: T,
							onChange: (e) => {
								E(e.target.value), te(!0);
							},
							placeholder: Oe ? `e.g. ${Oe.name}` : De ? `e.g. Q2 ${De.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("label", {
						htmlFor: xe,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ H("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ H(A, {
						id: xe,
						"data-testid": "new-doc-description",
						value: ne,
						onChange: (e) => re(e.target.value),
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
						onClick: Re,
						disabled: !Le,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Le ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
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
function De(e, t, n) {
	if (n <= 0) return t;
	let r = e === "previous" ? t - 1 : e === "next" ? t + 1 : e === "first" ? 1 : n;
	return Math.min(Math.max(r, 1), n);
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
var Oe = 5;
function ke({ back: e }) {
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
function Ae({ title: e, subtitle: t, revisions: n, olderRevisions: o, revisionId: s, onRevisionChange: l, slideIndex: u, onSlideChange: d, onDownload: f, downloadLabel: p = "Download .pptx", onOpenPreview: m, pending: g, notice: _, state: v = "ready", errorMessage: b, ownerName: x, onRetry: S, maxSlideWidth: w, autoFocus: T = !1, className: E, "data-testid": O = "presentation-view" }) {
	let k = pe(), A = z(null), j = z(!1);
	if (R(() => {
		!T || j.current || !A.current || (j.current = !0, A.current.focus({ preventScroll: !0 }));
	}), v === "loading") return /* @__PURE__ */ H(ne, {
		label: "Opening the presentation…",
		testId: `${O}-loading`
	});
	if (v === "no-access") return /* @__PURE__ */ H(y, {
		resource: "this presentation",
		ownerName: x ?? null,
		testId: `${O}-no-access`
	});
	if (v === "error") return /* @__PURE__ */ H(te, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...S ? {
			actionLabel: "Try again",
			onAction: S
		} : {},
		testId: `${O}-error`
	});
	let ie = n.find((e) => e.id === s) ?? n[0], M = ie?.slides ?? [];
	if (v === "empty" || !ie || M.length === 0) return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", E),
		"data-testid": O,
		children: [/* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ H(c, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ H(c, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${O}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ H(ee, {
			title: "No slides yet",
			description: g?.status === "generating" ? `${g.label} is still being generated.` : g?.status === "failed" ? g.message ?? `${g.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${O}-empty`
		})]
	});
	let N = M[Math.min(Math.max(u, 1), M.length) - 1];
	return /* @__PURE__ */ U("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", E),
		ref: A,
		"data-testid": O,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${N.index} of ${M.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Ee(e);
			if (!t) return;
			e.preventDefault();
			let n = De(t, N.index, M.length);
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
						"data-testid": `${O}-title`,
						children: e
					}), t && /* @__PURE__ */ H(c, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${O}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ U("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > Oe || (o?.count ?? 0) > 0 ? /* @__PURE__ */ H(C, {
							"aria-label": "Revision",
							size: "sm",
							value: ie.id,
							onChange: (e) => we(e.target.value, l, o),
							options: Ce(n, o),
							className: "w-auto",
							"data-testid": `${O}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ H(a, {
							density: "compact",
							children: /* @__PURE__ */ H(re, {
								"aria-label": "Revision",
								value: ie.id,
								onChange: l,
								options: n.map((e) => ({
									label: e.label,
									value: e.id
								})),
								"data-testid": `${O}-revisions`
							})
						}),
						g && /* @__PURE__ */ H(D, {
							state: g.status === "failed" ? "error" : "pending",
							label: `${g.label} ${g.status}`,
							"data-testid": `${O}-pending`
						}),
						f && /* @__PURE__ */ H(i, {
							variant: "secondary",
							size: "sm",
							onClick: f,
							"data-testid": `${O}-download`,
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
							"data-testid": `${O}-stage`,
							children: N.preview ?? /* @__PURE__ */ H(c, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${O}-no-preview`,
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
								icon: /* @__PURE__ */ H(ke, { back: !0 }),
								disabled: N.index <= 1,
								onClick: () => d(N.index - 1),
								"data-testid": `${O}-previous`
							}),
							/* @__PURE__ */ H(c, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${O}-position`,
								children: `Slide ${N.index} of ${M.length}`
							}),
							/* @__PURE__ */ H(h, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ H(ke, {}),
								disabled: N.index >= M.length,
								onClick: () => d(N.index + 1),
								"data-testid": `${O}-next`
							}),
							m && N.preview && /* @__PURE__ */ H(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => m(N.id),
								"data-testid": `${O}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ U("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${O}-outline`,
					children: [/* @__PURE__ */ H(P, {
						as: "div",
						className: "mb-1",
						"data-testid": `${O}-outline-label`,
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
							"data-testid": `${O}-outline-row`,
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
				"data-testid": `${O}-notice`,
				children: _
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/svgPreview.ts
function W(e) {
	if (!e) return;
	let t = e.trim();
	if (t) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(t)}`;
}
//#endregion
//#region src/components/doc-editor/presentation/SlideRow.tsx
function je() {
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
function Me() {
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
function Ne() {
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
function Pe() {
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
function Fe({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, readOnly: l = !1, onSelect: u, onMove: d, onDuplicate: f, onDelete: p, canDuplicate: m, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = W(i);
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
						icon: /* @__PURE__ */ H(je, {}),
						disabled: t === 0,
						onClick: () => d(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ H(h, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Me, {}),
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
						icon: /* @__PURE__ */ H(Ne, {}),
						disabled: !m,
						onClick: () => f(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ H(h, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ H(Pe, {}),
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
function Ie({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Fe, listClassName: u, testIdPrefix: d }) {
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
var Le = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Re = 40, ze = 8, Be = 200, Ve = 120, G = 200, He = 60, Ue = 2e3, We = 24, Ge = 6, Ke = 400, qe = 10, Je = 6, K = 2, Ye = 4, Xe = 12, Ze = 60, Qe = 24, $e = 8, et = 5, tt = 40, nt = 5, q = 120, J = 40, rt = 140, it = 3, at = 6, ot = 16, st = 40, ct = 80, lt = 6, ut = 80, dt = 100, ft = 3, pt = 120, mt = 100, ht = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, gt = [
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
], _t = {
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
}, vt = {
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
}, yt = [
	"bar",
	"line",
	"stacked-bar",
	"pie"
], bt = {
	bar: "Bar",
	line: "Line",
	"stacked-bar": "Stacked bar",
	pie: "Pie"
}, xt = [
	"product",
	"engineering",
	"plain"
];
function St(e) {
	return !!e && typeof e == "object" && typeof e.ref == "string";
}
function Ct(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function wt(e) {
	return e.slides.length > 0 && Ct(e).length === 0;
}
function Tt(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function Et(e, t = "bullets") {
	return Dt({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Dt(e, t) {
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
var Ot = {
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
}, kt = Object.values(Ot).filter((e) => e !== null);
function At(e) {
	let t = Ot[e.layout], n = kt.filter((n) => n !== t && e[n] !== void 0);
	if (!n.length) return e;
	let r = { ...e };
	for (let e of n) delete r[e];
	return r;
}
function jt(e) {
	let t = !1, n = e.slides.map((e) => {
		let n = At(e);
		return n !== e && (t = !0), n;
	});
	return t ? {
		...e,
		slides: n
	} : e;
}
function Mt(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function Nt(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Pt(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = Et(Tt(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Ft(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Tt(e),
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
function It(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function Lt(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
var Rt = /* @__PURE__ */ new Set([
	"product",
	"engineering",
	"plain"
]), zt = /* @__PURE__ */ new Set([
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
]), Bt = /* @__PURE__ */ new Set([
	"title",
	"subtitle",
	"theme",
	"slides"
]), Vt = /* @__PURE__ */ new Set([
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
]), Ht = /* @__PURE__ */ new Set(["ref"]), Ut = /* @__PURE__ */ new Set([
	"documentId",
	"anchor",
	"title"
]), Wt = /* @__PURE__ */ new Set([
	"kind",
	"labels",
	"series"
]), Gt = /* @__PURE__ */ new Set([
	"bar",
	"line",
	"stacked-bar",
	"pie"
]), Kt = /* @__PURE__ */ new Set(["name", "values"]), qt = /* @__PURE__ */ new Set(["text", "by"]), Jt = /* @__PURE__ */ new Set(["alt"]), Yt = /* @__PURE__ */ new Set([
	"value",
	"label",
	"delta"
]), Xt = /* @__PURE__ */ new Set(["header", "rows"]), Zt = /* @__PURE__ */ new Set([
	"left",
	"right",
	"verdict"
]), Qt = /* @__PURE__ */ new Set(["title", "points"]), $t = /* @__PURE__ */ new Set([
	"date",
	"label",
	"detail"
]), en = /* @__PURE__ */ new Set(["items", "current"]), tn = /* @__PURE__ */ new Set([
	"line",
	"nextSteps",
	"contact"
]);
function Y(e) {
	return !!e && typeof e == "object" && !Array.isArray(e);
}
function X(e) {
	if (typeof e == "string") return e.replace(/\s+/g, " ").trim() || void 0;
}
function nn(e) {
	if (typeof e == "string") return e.replace(/[ \t]+$/gm, "").trim() || void 0;
}
function Z(e, t) {
	return Object.keys(e).filter((n) => !t.has(n) && e[n] !== void 0);
}
function rn(e) {
	let t = [];
	if (!Y(e)) return {
		ok: !1,
		errors: ["deck: expected an object"]
	};
	for (let n of Z(e, Bt)) t.push(`deck: unknown field '${n}'`);
	let n = X(e.title);
	n ? n.length > 120 && t.push("deck.title: longer than 120 characters") : t.push("deck.title: required");
	let r = X(e.subtitle);
	e.subtitle !== void 0 && !r && t.push("deck.subtitle: must be a non-empty string when present"), r && r.length > 200 && t.push("deck.subtitle: longer than 200 characters");
	let i;
	if (e.theme !== void 0 && (i = an(e.theme, t)), !Array.isArray(e.slides) || e.slides.length === 0) return t.push("deck.slides: at least one slide is required"), {
		ok: !1,
		errors: t
	};
	e.slides.length > 40 && t.push(`deck.slides: ${e.slides.length} slides, the cap is 40`);
	let a = [], o = /* @__PURE__ */ new Set();
	return e.slides.slice(0, 40).forEach((e, n) => {
		let r = on(e, n, o, t);
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
function an(e, t) {
	let n = "deck.theme: must be 'product', 'engineering', 'plain' or { ref: '<theme id>' } naming a theme you were given";
	if (typeof e == "string") {
		if (Rt.has(e)) return e;
		t.push(n);
		return;
	}
	if (!Y(e)) {
		t.push(n);
		return;
	}
	let r = Z(e, Ht);
	if (r.length) {
		t.push(`deck.theme: a deck names its theme and never describes it; only { ref } is accepted, not ${r.map((e) => `'${e}'`).join(", ")}`);
		return;
	}
	let i = typeof e.ref == "string" ? e.ref.trim() : "";
	if (!Le.test(i)) {
		t.push(`deck.theme.ref: must match ${Le} (a theme id you were given)`);
		return;
	}
	return { ref: i };
}
function on(e, t, n, r) {
	let i = `slides[${t}]`;
	if (!Y(e)) return r.push(`${i}: expected an object`), null;
	for (let t of Z(e, Vt)) r.push(`${i}: unknown field '${t}'`);
	let a = typeof e.id == "string" ? e.id.trim() : "";
	ht.test(a) ? n.has(a) ? r.push(`${i}.id: '${a}' is used twice`) : n.add(a) : r.push(`${i}.id: must match ${ht} (letters, digits, '_' and '-')`);
	let o = typeof e.layout == "string" ? e.layout : "";
	zt.has(o) || r.push(`${i}.layout: must be one of ${[...zt].join(", ")}`);
	let s = X(e.title);
	s ? s.length > 120 && r.push(`${i}.title: longer than 120 characters`) : r.push(`${i}.title: required`);
	let c = X(e.eyebrow);
	e.eyebrow !== void 0 && !c && r.push(`${i}.eyebrow: must be a non-empty string when present`), c && c.length > 60 && r.push(`${i}.eyebrow: longer than 60 characters`);
	let l = nn(e.notes);
	l && l.length > 2e3 && r.push(`${i}.notes: longer than ${Ue} characters`);
	let u = e.bullets === void 0 ? void 0 : sn(e.bullets, `${i}.bullets`, r), d = e.columns === void 0 ? void 0 : cn(e.columns, i, r), f = e.chart === void 0 ? void 0 : ln(e.chart, `${i}.chart`, r), p = e.quote === void 0 ? void 0 : un(e.quote, `${i}.quote`, r), m = e.image === void 0 ? void 0 : dn(e.image, `${i}.image`, r), h = e.figures === void 0 ? void 0 : pn(e.figures, `${i}.figures`, r), g = e.table === void 0 ? void 0 : mn(e.table, `${i}.table`, r), _ = e.comparison === void 0 ? void 0 : hn(e.comparison, `${i}.comparison`, r), v = e.timeline === void 0 ? void 0 : gn(e.timeline, `${i}.timeline`, r), y = e.agenda === void 0 ? void 0 : _n(e.agenda, `${i}.agenda`, r), b = e.closing === void 0 ? void 0 : vn(e.closing, `${i}.closing`, r);
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
	let S = yn(e.sources, i, r);
	return !a || !s || !zt.has(o) ? null : {
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
function sn(e, t, n) {
	if (!Array.isArray(e)) return n.push(`${t}: expected an array of strings`), [];
	e.length > 8 && n.push(`${t}: ${e.length} bullets, the cap is 8`);
	let r = [];
	return e.slice(0, 8).forEach((e, i) => {
		let a = X(e);
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
function cn(e, t, n) {
	if (!Array.isArray(e) || e.length !== 2) {
		n.push(`${t}.columns: expected exactly two arrays of bullets`);
		return;
	}
	let r = sn(e[0], `${t}.columns[0]`, n), i = sn(e[1], `${t}.columns[1]`, n);
	if (!r.length && !i.length) {
		n.push(`${t}.columns: both columns are empty`);
		return;
	}
	return [r, i];
}
function ln(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Z(e, Wt)) n.push(`${t}: unknown field '${r}'`);
	let r = typeof e.kind == "string" && Gt.has(e.kind) ? e.kind : void 0;
	r || n.push(`${t}.kind: must be 'bar', 'line', 'stacked-bar' or 'pie'`);
	let i = [];
	!Array.isArray(e.labels) || e.labels.length === 0 ? n.push(`${t}.labels: at least one label is required`) : (e.labels.length > 24 && n.push(`${t}.labels: ${e.labels.length} labels, the cap is 24`), e.labels.slice(0, 24).forEach((e, r) => {
		let a = X(e);
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
		for (let t of Z(e, Kt)) n.push(`${s}: unknown field '${t}'`);
		let c = X(e.name);
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
function un(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Z(e, qt)) n.push(`${t}: unknown field '${r}'`);
	let r = X(e.text), i = X(e.by);
	if (r ? r.length > 400 && n.push(`${t}.text: longer than 400 characters`) : n.push(`${t}.text: required`), i || n.push(`${t}.by: required — an unattributed quote is not a source`), !(!r || !i)) return {
		text: r,
		by: i.slice(0, 80)
	};
}
function dn(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected an object`);
		return;
	}
	for (let r of Z(e, Jt)) n.push(`${t}: unknown field '${r}'`);
	let r = X(e.alt);
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
function Q(e, t, n, r, i = !0) {
	let a = X(e);
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
function fn(e, t, n, r, i, a) {
	if (!Array.isArray(e)) return a.push(`${t}: expected an array of strings`), [];
	e.length < n && a.push(`${t}: ${e.length} item${e.length === 1 ? "" : "s"}, at least ${n} needed`), e.length > r && a.push(`${t}: ${e.length} items, the cap is ${r}`);
	let o = [];
	return e.slice(0, r).forEach((e, n) => {
		let r = Q(e, `${t}[${n}]`, i, a);
		r && o.push(r);
	}), o;
}
function pn(e, t, n) {
	if (!Array.isArray(e)) {
		n.push(`${t}: expected an array of { value, label, delta? }`);
		return;
	}
	(e.length < 2 || e.length > 4) && n.push(`${t}: ${e.length} figures, expected 2 to 4`);
	let r = [];
	return e.slice(0, 4).forEach((e, i) => {
		let a = `${t}[${i}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of Z(e, Yt)) n.push(`${a}: unknown field '${t}'`);
		let o = Q(e.value, `${a}.value`, 12, n), s = Q(e.label, `${a}.label`, 60, n), c = Q(e.delta, `${a}.delta`, 24, n, !1);
		o && s && r.push({
			value: o,
			label: s,
			...c ? { delta: c } : {}
		});
	}), r.length >= 2 && r.length === e.length ? r : void 0;
}
function mn(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { header, rows }`);
		return;
	}
	for (let r of Z(e, Xt)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = fn(e.header, `${t}.header`, 1, 5, 40, n), a = [];
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
		let s = e.map((e, t) => e === "" ? "" : Q(e, `${o}[${t}]`, 40, n) ?? "");
		a.push(s);
	})), n.length === r ? {
		header: i,
		rows: a
	} : void 0;
}
function hn(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { left, right, verdict? }`);
		return;
	}
	for (let r of Z(e, Zt)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = (e, t) => {
		if (!Y(e)) {
			n.push(`${t}: expected { title, points }`);
			return;
		}
		for (let r of Z(e, Qt)) n.push(`${t}: unknown field '${r}'`);
		let r = Q(e.title, `${t}.title`, 40, n), i = fn(e.points, `${t}.points`, 1, 5, 120, n);
		return r ? {
			title: r,
			points: i
		} : void 0;
	}, a = i(e.left, `${t}.left`), o = i(e.right, `${t}.right`), s = Q(e.verdict, `${t}.verdict`, 140, n, !1);
	if (!(n.length !== r || !a || !o)) return {
		left: a,
		right: o,
		...s ? { verdict: s } : {}
	};
}
function gn(e, t, n) {
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
		for (let t of Z(e, $t)) n.push(`${a}: unknown field '${t}'`);
		let o = Q(e.date, `${a}.date`, 16, n), s = Q(e.label, `${a}.label`, 40, n), c = Q(e.detail, `${a}.detail`, 80, n, !1);
		o && s && i.push({
			date: o,
			label: s,
			...c ? { detail: c } : {}
		});
	}), n.length === r ? i : void 0;
}
function _n(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { items, current? }`);
		return;
	}
	for (let r of Z(e, en)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = fn(e.items, `${t}.items`, 1, 6, 80, n), a;
	return e.current !== void 0 && (typeof e.current != "number" || !Number.isInteger(e.current) || e.current < 0 || e.current >= i.length ? n.push(`${t}.current: must be the 0-based position of one of the ${i.length} items`) : a = e.current), n.length === r ? {
		items: i,
		...a === void 0 ? {} : { current: a }
	} : void 0;
}
function vn(e, t, n) {
	if (!Y(e)) {
		n.push(`${t}: expected { line, nextSteps?, contact? }`);
		return;
	}
	for (let r of Z(e, tn)) n.push(`${t}: unknown field '${r}'`);
	let r = n.length, i = Q(e.line, `${t}.line`, 100, n), a = e.nextSteps === void 0 ? void 0 : fn(e.nextSteps, `${t}.nextSteps`, 1, 3, 120, n), o = Q(e.contact, `${t}.contact`, 100, n, !1);
	if (!(n.length !== r || !i)) return {
		line: i,
		...a?.length ? { nextSteps: a } : {},
		...o ? { contact: o } : {}
	};
}
function yn(e, t, n) {
	if (!Array.isArray(e) || e.length === 0) return n.push(`${t}.sources: every slide must cite at least one source document`), [];
	e.length > 10 && n.push(`${t}.sources: ${e.length} sources, the cap is 10`);
	let r = [];
	return e.slice(0, 10).forEach((e, i) => {
		let a = `${t}.sources[${i}]`;
		if (!Y(e)) {
			n.push(`${a}: expected an object`);
			return;
		}
		for (let t of Z(e, Ut)) n.push(`${a}: unknown field '${t}'`);
		let o = X(e.documentId), s = X(e.title), c = X(e.anchor);
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
var bn = I(() => import("./SortableSlideList-DqBRbnb0.js"));
function xn(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function Sn(e, t) {
	xn(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function Cn() {
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
function wn({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let s = W(e.thumbnailSvg), l = t + 1;
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
						children: [/* @__PURE__ */ H(Cn, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ H("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ H(ae, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function Tn() {
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
function En({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: s = !1, generating: l = !1, viewers: u, readOnly: d = !1, onSelect: f, onMove: p, onDuplicate: m, onDelete: h, canDuplicate: g, canDelete: _, dragHandle: v, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = W(i), C = t + 1, w = e.title || "Untitled slide", T = [
		...t > 0 ? [{
			label: "Move up",
			trailing: "⌥↑",
			onSelect: () => p(t, t - 1),
			"data-testid": `${x}-up-${e.id}`
		}] : [],
		...t < n - 1 ? [{
			label: "Move down",
			trailing: "⌥↓",
			onSelect: () => p(t, t + 1),
			"data-testid": `${x}-down-${e.id}`
		}] : [],
		...g ? [{
			label: "Duplicate",
			onSelect: () => m(e.id),
			"data-testid": `${x}-duplicate-${e.id}`
		}] : [],
		..._ ? [{
			label: "Delete slide",
			danger: !0,
			onSelect: () => h(e.id),
			"data-testid": `${x}-delete-${e.id}`
		}] : []
	];
	return /* @__PURE__ */ U("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": s ? "true" : void 0,
		"data-generating": l ? "true" : void 0,
		"aria-busy": l || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ U("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ H("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
			}), !d && v && /* @__PURE__ */ H("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ U("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ U("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => f(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : s ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ H("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", l && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ U("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ H(c, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ H(c, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: _t[e.layout]
						})]
					}), l && /* @__PURE__ */ H("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ H(c, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ U("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						S ? /* @__PURE__ */ H(c, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}) : /* @__PURE__ */ H("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						s && !l && /* @__PURE__ */ H(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ H(c, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				u && u.length > 0 && /* @__PURE__ */ H("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${x}-viewers-${e.id}`,
					"aria-label": `${u.map((e) => e.name).join(", ")} ${u.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ H(ae, {
						users: [...u],
						maxVisible: 2,
						size: 16
					})
				}),
				!d && T.length > 0 && /* @__PURE__ */ H("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ H(E, {
						trigger: /* @__PURE__ */ H(Tn, {}),
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
function Dn({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: s, onAdd: l, canAdd: u = !0, generatingSlideIds: d, generatedItems: f, slideViewers: p, readOnly: m = !1, className: h, testIdPrefix: g = "filmstrip" }) {
	let v = z(null), y = me(() => new Set(d ?? []), [d]), b = me(() => e.map((e) => {
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
	]), x = me(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	R(() => {
		xn(v.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => Sn(v.current, s));
			return;
		}
		let c = C[o];
		n(c), Sn(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: s,
		canDuplicate: u,
		rowComponent: En,
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
			/* @__PURE__ */ H(fe, {
				fallback: /* @__PURE__ */ H(Ie, { ...T }),
				children: H(m ? Ie : bn, { ...T })
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
				children: S.map((r, i) => /* @__PURE__ */ H(wn, {
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
var On = {
	document: "📄",
	transcript: "🎙️"
};
function kn({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: s = !1, testIdPrefix: l }) {
	let [u, d] = B(""), [f, p] = B(!1), [m, h] = B(n), g = pe(), _ = z(0);
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
	}, x = /* @__PURE__ */ H(ce, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${l}-source-chips`
	}), S = /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ H(T, {
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
							children: On[t.kind ?? "document"]
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
				/* @__PURE__ */ H(P, {
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
			/* @__PURE__ */ H(P, {
				as: "div",
				children: /* @__PURE__ */ H("span", {
					id: g,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ H(M, {
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
function An() {
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
function jn({ label: e, count: t, max: n, min: r, testId: i }) {
	return /* @__PURE__ */ U("div", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ H(P, {
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
function Mn({ label: e, disabled: t, onClick: n, testId: r }) {
	return /* @__PURE__ */ H(h, {
		"aria-label": e,
		variant: "ghost",
		size: "sm",
		icon: /* @__PURE__ */ H(An, {}),
		disabled: t,
		onClick: n,
		"data-testid": r
	});
}
function Nn({ children: e, disabled: t, onClick: n, testId: r }) {
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
function Pn(e, t, n) {
	let r = e.slice();
	return r[t] = n, r;
}
function Fn({ label: e, itemLabel: t, items: n, max: r, maxChars: i, min: a = 0, addLabel: o, onChange: s, readOnly: l, testIdPrefix: u, numbered: d = !1 }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		"data-testid": u,
		children: [
			/* @__PURE__ */ H(jn, {
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
							onChange: (e) => s(Pn(n, r, e.target.value)),
							"data-testid": `${u}-${r}`
						}),
						!l && /* @__PURE__ */ H(Mn, {
							label: `Remove ${t.toLowerCase()} ${r + 1}`,
							disabled: n.length <= Math.max(a, 0),
							onClick: () => s(n.filter((e, t) => t !== r)),
							testId: `${u}-remove-${r}`
						})
					]
				}, r))
			}),
			!l && /* @__PURE__ */ H(Nn, {
				disabled: n.length >= r,
				onClick: () => s([...n, ""]),
				testId: `${u}-add`,
				children: o
			})
		]
	});
}
function In({ figures: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.delta || delete i.delta, t(Pn(e, n, i));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H(jn, {
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
						!n && /* @__PURE__ */ H(Mn, {
							label: `Remove figure ${o + 1}`,
							disabled: e.length <= 2,
							onClick: () => t(e.filter((e, t) => t !== o)),
							testId: `${r}-remove-${o}`
						})
					]
				}, o))
			}),
			!n && /* @__PURE__ */ H(Nn, {
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
function Ln({ table: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			rows: Pn(e.rows, n, Pn(e.rows[n], r, i))
		});
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [/* @__PURE__ */ U("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ H(P, {
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
							header: Pn(e.header, o, n.target.value)
						}),
						"data-testid": `${r}-header-${o}`
					}), !n && /* @__PURE__ */ H(Mn, {
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
				}) }, o)), !n && /* @__PURE__ */ H(l, { children: /* @__PURE__ */ H(Mn, {
					label: `Remove row ${i + 1}`,
					disabled: e.rows.length <= 1,
					onClick: () => s(i),
					testId: `${r}-remove-row-${i}`
				}) })] }, i)) })]
			})
		})]
	});
}
function Rn({ comparison: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (i, a) => {
		let o = e[i];
		return /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5",
			"data-testid": `${r}-${i}`,
			children: [/* @__PURE__ */ H(w, {
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
			}), /* @__PURE__ */ H(Fn, {
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
		}), /* @__PURE__ */ H(w, {
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
function zn({ steps: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	let i = (n, r) => {
		let i = {
			...e[n],
			...r
		};
		i.detail || delete i.detail, t(Pn(e, n, i));
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": r,
		children: [
			/* @__PURE__ */ H(jn, {
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
						!n && /* @__PURE__ */ H(Mn, {
							label: `Remove step ${o + 1}`,
							disabled: e.length <= 3,
							onClick: () => t(e.filter((e, t) => t !== o)),
							testId: `${r}-remove-${o}`
						})
					]
				}, o))
			}),
			!n && /* @__PURE__ */ H(Nn, {
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
function Bn({ agenda: e, onChange: t, readOnly: n, testIdPrefix: r }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-2",
		"data-testid": r,
		children: [/* @__PURE__ */ H(Fn, {
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
		}), /* @__PURE__ */ H(w, {
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
function Vn({ closing: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			/* @__PURE__ */ H(w, {
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
			/* @__PURE__ */ H(Fn, {
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
			/* @__PURE__ */ H(w, {
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
function Hn() {
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
function Un({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ H(P, {
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
							icon: /* @__PURE__ */ H(Hn, {}),
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
function Wn({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
				children: [/* @__PURE__ */ H(w, {
					label: "Chart type",
					className: "w-40",
					children: (i) => /* @__PURE__ */ H(C, {
						...i,
						size: "sm",
						value: e.kind,
						disabled: n,
						options: yt.map((e) => ({
							value: e,
							label: bt[e]
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
								icon: /* @__PURE__ */ H(Hn, {}),
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
							icon: /* @__PURE__ */ H(Hn, {}),
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
function Gn({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
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
				children: [/* @__PURE__ */ H(w, {
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
				}), /* @__PURE__ */ H(w, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ H(S, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ H(Un, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ U("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ H(Un, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ H(Un, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ H(Wn, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ H(w, {
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
				}), /* @__PURE__ */ H(w, {
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
			e.layout === "image" && /* @__PURE__ */ H(w, {
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
			e.layout === "key-figures" && e.figures && /* @__PURE__ */ H(In, {
				figures: e.figures,
				onChange: (e) => l({ figures: e }),
				readOnly: a,
				testIdPrefix: `${c}-figures`
			}),
			e.layout === "table" && e.table && /* @__PURE__ */ H(Ln, {
				table: e.table,
				onChange: (e) => l({ table: e }),
				readOnly: a,
				testIdPrefix: `${c}-table`
			}),
			e.layout === "comparison" && e.comparison && /* @__PURE__ */ H(Rn, {
				comparison: e.comparison,
				onChange: (e) => l({ comparison: e }),
				readOnly: a,
				testIdPrefix: `${c}-comparison`
			}),
			e.layout === "timeline" && e.timeline && /* @__PURE__ */ H(zn, {
				steps: e.timeline,
				onChange: (e) => l({ timeline: e }),
				readOnly: a,
				testIdPrefix: `${c}-timeline`
			}),
			e.layout === "agenda" && e.agenda && /* @__PURE__ */ H(Bn, {
				agenda: e.agenda,
				onChange: (e) => l({ agenda: e }),
				readOnly: a,
				testIdPrefix: `${c}-agenda`
			}),
			e.layout === "closing" && e.closing && /* @__PURE__ */ H(Vn, {
				closing: e.closing,
				onChange: (e) => l({ closing: e }),
				readOnly: a,
				testIdPrefix: `${c}-closing`
			}),
			s && /* @__PURE__ */ H(w, {
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
			o && /* @__PURE__ */ H(kn, {
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
var Kn = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function qn({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": s = "slide-stage" }) {
	return /* @__PURE__ */ H("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ U("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": s,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", Kn[a]),
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
var Jn = [
	"chart",
	"quote",
	"image",
	"two-column"
], Yn = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
};
function Xn(e, t) {
	return St(e) ? t.find((t) => t.id === e.ref)?.name ?? e.ref : Yn[e] ?? e;
}
var Zn = {
	narrow: 600,
	wide: 900
};
function Qn(e) {
	return e == null ? "wide" : e < Zn.narrow ? "narrow" : e < Zn.wide ? "medium" : "wide";
}
var $n = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, er = "Text style comes from the theme", tr = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function nr({ redo: e }) {
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
function rr() {
	return /* @__PURE__ */ H("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function ir() {
	return /* @__PURE__ */ H("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function ar({ label: e, value: t }) {
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
function or({ slide: e, theme: t, themes: n = [], onAddSlide: o, canAddSlide: s = !0, onBrowseLayouts: l, onLayoutChange: u, onThemeChange: d, onThemeRefChange: f, onChartKindChange: p, onUndo: m, onRedo: g, canUndo: v = !1, canRedo: y = !1, onPresent: b, end: x, disabled: S = !1, className: C, testIdPrefix: w = "slides-toolbar", size: T = "auto" }) {
	let { ref: ee, ...te } = ie(), { ref: ne, width: D } = oe(ee), O = T === "auto" ? Qn(D) : T, k = $n[O], A = (e) => k.has(e), j = S, M = !j && e ? {
		label: "Layout of this slide",
		items: gt.map((t) => ({
			label: _t[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && u(t);
			},
			"data-testid": `${w}-layout-${t}`
		}))
	} : null, N = !j && s ? {
		label: "New slide after this one",
		items: Jn.map((e) => ({
			label: `${_t[e]} slide`,
			onSelect: () => o(e),
			"data-testid": `${w}-insert-${e}`
		})).concat(l ? [{
			label: "All layouts…",
			onSelect: l,
			"data-testid": `${w}-insert-all`
		}] : [])
	} : null, ae = St(t) ? t.ref : null, P = j ? null : {
		label: "Deck theme",
		items: xt.map((e) => ({
			label: Yn[e],
			checked: e === t,
			onSelect: () => {
				e !== t && d(e);
			},
			"data-testid": `${w}-theme-${e}`
		})).concat((f ? n : []).map((e) => ({
			label: e.name,
			checked: e.id === ae,
			onSelect: () => {
				e.id !== ae && f?.({ ref: e.id });
			},
			"data-testid": `${w}-theme-ref-${e.id}`
		})))
	}, se = Xn(t, n), F = !j && e?.layout === "chart" && e.chart && p ? e.chart : null, ce = F && p ? {
		label: "Chart type",
		items: yt.map((e) => ({
			label: bt[e],
			checked: F.kind === e,
			onSelect: () => {
				F.kind !== e && p(e);
			},
			"data-testid": `${w}-chart-kind-${e}`
		}))
	} : null, le = F && F.kind !== "bar" && F.kind !== "line" && A("chart") ? F.kind : null, ue = le ? [
		"bar",
		"line",
		le
	] : ["bar", "line"], de = [];
	return !A("layout") && M && de.push(M), !A("insert") && N && de.push(N), !A("theme") && P && de.push(P), !A("chart") && ce && de.push(ce), (!A("note") || le) && !j && de.push({
		label: er,
		items: [],
		"data-testid": `${w}-style-note`
	}), /* @__PURE__ */ U("div", {
		...te,
		ref: ne,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": O,
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
			A("layout") && M && e && /* @__PURE__ */ H(E, {
				trigger: /* @__PURE__ */ H(ar, {
					label: "Layout",
					value: _t[e.layout]
				}),
				triggerLabel: `Layout: ${_t[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-layout`,
				sections: [M],
				"data-testid": `${w}-layout-menu`
			}),
			A("insert") && N && /* @__PURE__ */ H(E, {
				trigger: /* @__PURE__ */ H(ar, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-insert`,
				sections: [N],
				"data-testid": `${w}-insert-menu`
			}),
			A("theme") && P && /* @__PURE__ */ H(E, {
				trigger: /* @__PURE__ */ H(ar, {
					label: "Theme",
					value: se
				}),
				triggerLabel: `Theme: ${se}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${w}-theme`,
				sections: [P],
				"data-testid": `${w}-theme-menu`
			}),
			A("chart") && F && p && /* @__PURE__ */ H(a, {
				density: "compact",
				children: /* @__PURE__ */ H(re, {
					value: F.kind,
					onChange: (e) => p(e),
					options: ue.map((e) => ({
						value: e,
						label: bt[e]
					})),
					"aria-label": "Chart type",
					className: "shrink-0",
					"data-testid": `${w}-chart-kind`
				})
			}),
			(m || g) && /* @__PURE__ */ U(V, { children: [
				/* @__PURE__ */ H(ir, {}),
				m && /* @__PURE__ */ H(h, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(nr, {}),
					disabled: j || !v,
					onClick: m,
					"data-testid": `${w}-undo`
				}),
				g && /* @__PURE__ */ H(h, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ H(nr, { redo: !0 }),
					disabled: j || !y,
					onClick: g,
					"data-testid": `${w}-redo`
				})
			] }),
			de.length > 0 && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ir, {}), /* @__PURE__ */ H(E, {
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
			A("note") && !le && /* @__PURE__ */ H(c, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-xs text-text-tertiary",
				title: tr,
				"data-testid": `${w}-style-note`,
				children: er
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
					children: [/* @__PURE__ */ H(rr, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/LayoutGallery.tsx
function $({ wide: e = !1, center: t = !1 }) {
	return /* @__PURE__ */ H("span", { className: r("block h-1.5 rounded-sm bg-text-tertiary", e ? "w-3/4" : "w-1/2", t && "mx-auto") });
}
function sr({ count: e = 3, className: t }) {
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
function cr() {
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
function lr() {
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
function ur() {
	return /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-4 gap-px overflow-hidden rounded-sm bg-border-emphasis",
		children: Array.from({ length: 16 }, (e, t) => /* @__PURE__ */ H("span", { className: r("block", t < 4 ? "bg-primary/30" : "bg-surface") }, t))
	});
}
function dr({ titled: e = !1 }) {
	return /* @__PURE__ */ H("span", {
		className: "grid flex-1 grid-cols-2 gap-2",
		children: [0, 1].map((t) => /* @__PURE__ */ U("span", {
			className: r("flex flex-col gap-1", e && "rounded-sm bg-surface p-1"),
			children: [e && /* @__PURE__ */ H("span", { className: "block h-1.5 w-1/2 rounded-sm bg-primary/50" }), /* @__PURE__ */ H(sr, { count: 3 })]
		}, t))
	});
}
function fr() {
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
function pr() {
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
var mr = {
	title: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H($, { wide: !0 }), /* @__PURE__ */ H("span", { className: "block h-1 w-1/3 rounded-sm bg-border-emphasis" })]
	}),
	section: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H("span", { className: "block h-1 w-1/5 rounded-sm bg-primary/60" }), /* @__PURE__ */ H($, {})]
	}),
	bullets: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(sr, { count: 4 })] }),
	"two-column": () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(dr, {})] }),
	chart: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(cr, {})] }),
	quote: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5 px-2",
		children: [/* @__PURE__ */ H(sr, { count: 2 }), /* @__PURE__ */ H("span", { className: "block h-1 w-1/4 self-end rounded-sm bg-primary/60" })]
	}),
	image: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H("span", { className: "block flex-1 rounded-sm bg-primary/20" })] }),
	"key-figures": () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(lr, {})] }),
	table: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(ur, {})] }),
	comparison: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(dr, { titled: !0 })] }),
	timeline: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(fr, {})] }),
	agenda: () => /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H($, {}), /* @__PURE__ */ H(pr, {})] }),
	closing: () => /* @__PURE__ */ U("span", {
		className: "flex flex-1 flex-col justify-center gap-1.5",
		children: [/* @__PURE__ */ H($, {
			wide: !0,
			center: !0
		}), /* @__PURE__ */ H(sr, {
			count: 2,
			className: "mx-auto w-1/2"
		})]
	})
};
function hr({ layout: e, className: t }) {
	return /* @__PURE__ */ H("span", {
		"aria-hidden": "true",
		"data-layout-schematic": e,
		className: r("flex aspect-video w-full flex-col gap-2 overflow-hidden rounded-md border border-border bg-surface-muted p-3", t),
		children: mr[e]()
	});
}
function gr({ svg: e, layout: t, className: n }) {
	let i = W(e);
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
	}) : t ? /* @__PURE__ */ H(hr, {
		layout: t,
		className: n
	}) : /* @__PURE__ */ H("span", {
		"aria-hidden": "true",
		className: r("block aspect-video w-full rounded-md border border-border bg-surface-muted", n)
	});
}
function _r({ onSelect: e, layouts: t = gt, previews: n, selected: i, label: a = "Slide layouts", className: o, testIdPrefix: s = "layout-gallery" }) {
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
					children: [/* @__PURE__ */ H(gr, {
						svg: n?.[t],
						layout: t
					}), /* @__PURE__ */ U("span", {
						className: "flex min-w-0 flex-col gap-0.5",
						children: [/* @__PURE__ */ H(c, {
							as: "span",
							size: "sm",
							weight: "medium",
							className: "block",
							children: _t[t]
						}), /* @__PURE__ */ H(c, {
							as: "span",
							size: "xs",
							tone: "secondary",
							className: "block",
							children: vt[t]
						})]
					})]
				})
			}, t))
		})
	});
}
//#endregion
//#region src/components/doc-editor/presentation/DeckPresentMode.tsx
function vr({ back: e }) {
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
function yr({ title: e, slides: t, slideIndex: n, onSlideChange: a, onExit: o, loading: l = !1, error: u, onRetry: d, showNotes: f = !1, onFocusConversation: p, className: m, testId: g = "deck-present" }) {
	let _ = z(null);
	R(() => {
		_.current?.focus({ preventScroll: !0 });
	}, []);
	let v = !u && !l && t.length > 0, y = Math.min(Math.max(n, 0), Math.max(t.length - 1, 0)), b = v ? t[y] : void 0, x = W(b?.svg), S = (e) => {
		if (e.key === "Escape") {
			e.preventDefault(), e.stopPropagation(), o();
			return;
		}
		if (!v) return;
		let n = Ee(e);
		if (!n) return;
		e.preventDefault();
		let r = De(n, y + 1, t.length);
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
			children: /* @__PURE__ */ H(qn, {
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
							icon: /* @__PURE__ */ H(vr, { back: !0 }),
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
							icon: /* @__PURE__ */ H(vr, {}),
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
				children: [/* @__PURE__ */ H(P, {
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
function br(e, t) {
	let n = z(t);
	n.current = t, R(() => {
		if (e) return n.current?.(!0), () => n.current?.(!1);
	}, [e]);
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function xr({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Ue, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": s = "speaker-notes" }) {
	let l = pe(), u = pe(), d = e?.length ?? 0, f = d >= i * .9;
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
function Sr({ testIdPrefix: e }) {
	return /* @__PURE__ */ H(M, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Cr = I(() => import("./PresentationAgentComposer-J7u6LDom.js").catch(() => ({ default: Sr })));
function wr({ back: e }) {
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
function Tr(e, t) {
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
function Er({ spec: e, onChange: t, preview: n, onRequestPreview: o, onSaveRevision: l, revisions: u, activeRevisionId: d, onSelectRevision: f, olderRevisions: p, sources: m, onSearchSources: g, onDownload: _, onOpenPresentationView: v, onFocusModeChange: y, showNotes: x = !1, previewCurrent: T = !0, readOnly: E = !1, onInstruct: re, instructHints: D, onUndoInstruct: k, generatingSlideIds: A, slideViewers: ie, selectSlideRequest: N, footer: ae, renderFrame: oe, onSelectedSlideChange: P, themes: se, layoutPreviews: F, className: ce, "data-testid": I = "presentation-editor" }) {
	let [pe, he] = B(!1), ge = z(null), [_e, ve] = B(!1);
	br(_e, y);
	let [ye, be] = B(() => e.slides[0]?.id ?? ""), [xe, Se] = B(!1), [Oe, ke] = B(null), je = !!re, [Me, Ne] = B("slide"), [Pe, Fe] = B(!1), [Ie, Le] = B(null), [Re, ze] = B(null), [Be, Ve] = B(() => /* @__PURE__ */ new Set()), { edit: G, undo: He, redo: Ue, canUndo: We, canRedo: Ge } = Tr(e, t), [Ke, qe] = B([]);
	R(() => {
		typeof n == "object" && "slides" in n && qe(n.slides);
	}, [n]);
	let Je = z(o);
	Je.current = o;
	let K = e.slides, Ye = me(() => new Set(Ct(e)), [e]), Xe = Ye.size === 0;
	R(() => {
		Xe && Je.current(e);
	}, [e, Xe]);
	let Ze = typeof n == "object" && "slides" in n ? n.slides : Ke, Qe = me(() => new Map(Ze.map((e) => [e.id, e.svg])), [Ze]), $e = me(() => {
		let e = new Set(K.map((e) => e.id));
		return Ze.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Ze, K]), et = K.length + $e.length, tt = K.findIndex((e) => e.id === ye), nt = tt === -1 ? $e.findIndex((e) => e.id === ye) : -1, q = tt === -1 ? nt === -1 ? 0 : K.length + nt : tt, J = tt !== -1 || nt === -1 ? K[q] : void 0, rt = nt === -1 ? void 0 : $e[nt], it = J?.id ?? rt?.id, at = J ? J.title || "Untitled slide" : rt?.title, ot = me(() => [...K.map((e) => e.id), ...$e.map((e) => e.id)], [K, $e]), st = Math.min(q, K.length - 1), ct = z(P);
	ct.current = P, R(() => {
		it && ct.current?.(it, q);
	}, [it, q]);
	let lt = me(() => {
		let e = new Set(A ?? []);
		return Pe && Me === "slide" && J && e.add(J.id), [...e];
	}, [
		A,
		Pe,
		Me,
		J
	]), ut = !!J && lt.includes(J.id), dt = K.map((e) => ({
		slide: e,
		thumbnailSvg: Qe.get(e.id),
		uncited: Ye.has(e.id),
		changed: Be.has(e.id)
	})), ft = L((e) => {
		be(e);
	}, []), pt = N?.key, mt = N?.slideId;
	R(() => {
		mt && e.slides.some((e) => e.id === mt) && be(mt);
	}, [pt, mt]);
	let ht = L((t, n) => {
		G(Nt(e, t, n));
	}, [G, e]), gt = L((t) => {
		let n = Pt(e, st, t);
		n !== e && (G(n), be(n.slides[st + 1].id));
	}, [
		G,
		e,
		st
	]), _t = L((t) => {
		let n = Ft(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		G(n), be(n.slides[r + 1].id);
	}, [G, e]), vt = L((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = It(e, t);
		r !== e && (G(r), be(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [G, e]), yt = L((t) => G(Mt(e, t)), [G, e]), bt = L(async (e) => {
		if (!re || Pe) return !1;
		let t = J?.id;
		Fe(!0), ze(null);
		try {
			let n = await re(e, Me === "slide" && t ? {
				slideId: t,
				scope: Me
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return Ve(new Set(r)), Le(n?.summary?.trim() || "Done."), Me === "deck" && r.length && (!t || !r.includes(t)) && be(r[0]), !0;
		} catch (e) {
			return ze(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			Fe(!1);
		}
	}, [
		re,
		Pe,
		Me,
		J?.id
	]), xt = L(() => {
		k?.(), Le(null), Ve(/* @__PURE__ */ new Set());
	}, [k]), St = Ye.size, wt = !E && K.length > 0 && St === 0 && !xe, Tt = L(() => {
		wt && (Se(!0), ke(null), Promise.resolve(l(jt(e))).catch((e) => {
			ke(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => Se(!1)));
	}, [
		wt,
		l,
		e
	]), Et = L((e) => {
		let t = ot[q + e];
		t && be(t);
	}, [ot, q]);
	R(() => {
		if (E || _e) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), Tt();
				return;
			}
			if (pe) return;
			if (t && e.key.toLowerCase() === "z" && !Te(e.target)) {
				e.preventDefault(), e.shiftKey ? Ue() : He();
				return;
			}
			let n = Ee(e);
			if (!n) return;
			e.preventDefault();
			let r = De(n, q + 1, et);
			r !== q + 1 && Et(r - (q + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		E,
		_e,
		pe,
		Tt,
		He,
		Ue,
		Et,
		q,
		et
	]);
	let Ot = z(null), kt = pe || _e;
	R(() => {
		if (kt || !Ot.current) return;
		let e = Ot.current();
		Ot.current = null, e?.focus();
	}, [kt]);
	let At = (e) => () => typeof document > "u" ? null : document.querySelector(`[data-testid="${e}"]`), Rt = L(() => {
		let e = typeof document > "u" ? null : document.querySelector("[aria-haspopup=\"menu\"][aria-expanded=\"true\"]");
		ge.current = e ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null), he(!0);
	}, []), zt = L(() => {
		let e = ge.current, t = At(`${I}-toolbar-insert`);
		Ot.current = () => e?.isConnected ? e : t(), he(!1);
	}, [I]), Bt = z(null);
	R(() => {
		pe && Bt.current?.focus();
	}, [pe]);
	let Vt = L(() => {
		Ot.current = At(`${I}-toolbar-present`), ve(!1);
	}, [I]);
	if (E) {
		let t = (u.length > 0 ? u : [{
			id: d,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === d ? [...K.map((e, t) => {
				let n = W(Qe.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ H("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...$e.map((e, t) => {
				let n = W(e.svg);
				return {
					id: e.id,
					index: K.length + t + 1,
					title: e.title,
					...n ? { preview: /* @__PURE__ */ H("img", {
						src: n,
						alt: e.title
					}) } : {}
				};
			})] : []
		}));
		return /* @__PURE__ */ H(Ae, {
			title: e.title,
			revisions: t,
			revisionId: d,
			onRevisionChange: f,
			slideIndex: q + 1,
			onSlideChange: (e) => {
				let t = ot[e - 1];
				t && be(t);
			},
			..._ ? { onDownload: _ } : {},
			className: ce,
			"data-testid": `${I}-readonly`
		});
	}
	let Ht = (() => {
		if (rt) {
			let e = W(rt.svg);
			return e ? /* @__PURE__ */ H("img", {
				src: e,
				alt: rt.title,
				className: "h-full w-full object-contain",
				"data-testid": `${I}-stage-image`
			}) : /* @__PURE__ */ H(c, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${I}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (J && Ye.has(J.id)) return /* @__PURE__ */ H(a, {
			density: "compact",
			children: /* @__PURE__ */ H(ee, {
				title: "Add a source to preview this slide",
				description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
				testId: `${I}-preview-needs-source`
			})
		});
		let t = J ? W(Qe.get(J.id)) : void 0;
		if (!Xe && !t) return /* @__PURE__ */ H(a, {
			density: "compact",
			children: /* @__PURE__ */ H(ee, {
				title: "The preview waits for every slide's source",
				description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
				testId: `${I}-preview-needs-source`
			})
		});
		if (n === "loading" && Qe.size === 0) return /* @__PURE__ */ H(ne, {
			label: "Rendering the deck…",
			testId: `${I}-preview-loading`
		});
		if (Xe && typeof n == "object" && "error" in n) return /* @__PURE__ */ H(te, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => o(e),
			testId: `${I}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ H("img", {
			src: r,
			alt: J.title || `Slide ${q + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${I}-stage-image`
		}) : /* @__PURE__ */ H(c, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${I}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ut = u.map((e) => ({
		id: e.id,
		label: e.label
	})), Wt = /* @__PURE__ */ U("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${I}-revision-controls`,
		children: [
			Ut.length > 5 || (p?.count ?? 0) > 0 ? /* @__PURE__ */ H(C, {
				size: "sm",
				"aria-label": "Revision",
				value: d,
				onChange: (e) => we(e.target.value, f, p),
				options: Ce(Ut, p),
				className: "w-auto",
				"data-testid": `${I}-revision-select`
			}) : Ut.length > 0 && /* @__PURE__ */ H(O, {
				items: Ut,
				value: d,
				onValueChange: f,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${I}-revisions`
			}),
			/* @__PURE__ */ H(i, {
				variant: "primary",
				size: "sm",
				disabled: !wt,
				onClick: Tt,
				"data-testid": `${I}-save`,
				children: xe ? "Saving…" : `Save as ${Lt(u)}`
			}),
			_ && /* @__PURE__ */ H(i, {
				variant: "secondary",
				size: "sm",
				onClick: _,
				"data-testid": `${I}-download`,
				children: "Download .pptx"
			})
		]
	}), Gt = je || oe ? /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ H(le, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => G({
				...e,
				title: t
			}),
			"data-testid": `${I}-deck-title`
		}), /* @__PURE__ */ H(le, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => G({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${I}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ U("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ H(w, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ H(S, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => G({
					...e,
					title: t.target.value
				}),
				"data-testid": `${I}-deck-title`
			})
		}), /* @__PURE__ */ H(w, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ H(S, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => G({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${I}-deck-subtitle`
			})
		})]
	}), Kt = v ? () => v(it ? {
		slideId: it,
		slideIndex: q + 1
	} : void 0) : () => {
		he(!1), ve(!0);
	}, qt = /* @__PURE__ */ H(V, { children: /* @__PURE__ */ H(or, {
		slide: J,
		theme: e.theme ?? "product",
		...se?.length ? {
			themes: se,
			onThemeRefChange: (t) => G({
				...e,
				theme: t
			})
		} : {},
		onBrowseLayouts: Rt,
		onAddSlide: gt,
		canAddSlide: K.length < 40,
		onLayoutChange: (t) => {
			J && G(Mt(e, Dt(J, t)));
		},
		onThemeChange: (t) => G({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			J?.chart && G(Mt(e, {
				...J,
				chart: {
					...J.chart,
					kind: t
				}
			}));
		},
		onUndo: He,
		onRedo: Ue,
		canUndo: We,
		canRedo: Ge,
		onPresent: Kt,
		testIdPrefix: `${I}-toolbar`
	}) }), Jt = /* @__PURE__ */ U("section", {
		"aria-label": "Choose a layout",
		className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto",
		onKeyDown: (e) => {
			e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), zt());
		},
		"data-testid": `${I}-layout-panel`,
		children: [/* @__PURE__ */ U(s, {
			gap: "sm",
			align: "center",
			className: "shrink-0",
			"data-testid": `${I}-layout-panel-header`,
			children: [/* @__PURE__ */ U(i, {
				ref: Bt,
				variant: "ghost",
				size: "sm",
				onClick: zt,
				"aria-label": at ? `Back to slide ${q + 1}: ${at}` : "Back to the deck",
				"data-testid": `${I}-layout-back`,
				children: [/* @__PURE__ */ H(wr, { back: !0 }), "Back"]
			}), /* @__PURE__ */ H(c, {
				as: "div",
				size: "base",
				weight: "semibold",
				children: "Choose a layout"
			})]
		}), /* @__PURE__ */ H(_r, {
			previews: F,
			onSelect: (e) => {
				zt(), gt(e);
			},
			testIdPrefix: `${I}-layout-gallery`
		})]
	}), Yt = /* @__PURE__ */ U(V, { children: [St > 0 && /* @__PURE__ */ H(M, {
		tone: "warning",
		"data-testid": `${I}-uncited-warning`,
		children: St === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${St} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), Oe && /* @__PURE__ */ H(M, {
		tone: "error",
		onDismiss: () => ke(null),
		"data-testid": `${I}-save-error`,
		children: Oe
	})] }), Xt = je && /* @__PURE__ */ U(V, { children: [Re && /* @__PURE__ */ H(M, {
		tone: "error",
		onDismiss: () => ze(null),
		"data-testid": `${I}-agent-error`,
		children: Re
	}), Ie && !Re && /* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${I}-agent-summary`,
		children: [
			/* @__PURE__ */ H(c, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${Ie}`
			}),
			Be.size > 0 && /* @__PURE__ */ H(c, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: Be.size === 1 ? "1 slide marked in the filmstrip" : `${Be.size} slides marked in the filmstrip`
			}),
			k && /* @__PURE__ */ H(i, {
				variant: "ghost",
				size: "sm",
				onClick: xt,
				"data-testid": `${I}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Zt = je && J && /* @__PURE__ */ H(fe, {
		fallback: /* @__PURE__ */ H(c, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${I}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ H(Cr, {
			scope: Me,
			onScopeChange: Ne,
			slideLabel: `slide ${q + 1}`,
			busy: Pe,
			onSubmit: bt,
			...D?.length ? { suggestions: D } : {},
			testIdPrefix: I
		})
	}), Qt = {
		selectedSlide: J,
		...rt ? { selectedGeneratedSlide: rt } : {},
		selectedIndex: q,
		slideCount: et,
		selectSlide: ft,
		markChanged: (e) => Ve(new Set(e))
	}, $t = typeof ae == "function" ? ae(Qt) : ae, en = $t != null && $t !== !1 ? $t : Zt ? /* @__PURE__ */ H(ue, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ U("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${I}-dock-card`,
			children: [Xt, Zt]
		}),
		"data-testid": `${I}-dock`
	}) : null, tn = J && /* @__PURE__ */ H(V, { children: je ? /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(kn, {
		compact: !0,
		sources: J.sources,
		onChange: (e) => yt({
			...J,
			sources: e
		}),
		options: m,
		onSearchSources: g,
		testIdPrefix: `${I}-slide`
	}), /* @__PURE__ */ H(b, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${I}-details`,
		children: /* @__PURE__ */ H(Gn, {
			slide: J,
			onChange: yt,
			sources: m,
			onSearchSources: g,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${I}-slide`
		})
	})] }) : /* @__PURE__ */ H(Gn, {
		slide: J,
		onChange: yt,
		sources: m,
		onSearchSources: g,
		showNotes: !1,
		testIdPrefix: `${I}-slide`
	}) }), Y = /* @__PURE__ */ U("div", {
		className: r("flex items-center justify-center gap-2", oe && "ml-auto shrink-0"),
		"data-testid": `${I}-slide-nav`,
		children: [
			/* @__PURE__ */ H(h, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ H(wr, { back: !0 }),
				disabled: q <= 0,
				onClick: () => Et(-1),
				"data-testid": `${I}-previous`
			}),
			/* @__PURE__ */ H(c, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${I}-position`,
				children: `Slide ${et === 0 ? 0 : q + 1} of ${et}`
			}),
			/* @__PURE__ */ H(h, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ H(wr, {}),
				disabled: q >= et - 1,
				onClick: () => Et(1),
				"data-testid": `${I}-next`
			}),
			/* @__PURE__ */ H(j, {
				value: K.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${K.length} / 40`,
				className: "ml-2",
				"data-testid": `${I}-slide-meter`
			})
		]
	}), X = /* @__PURE__ */ U("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${I}-body`,
		children: [/* @__PURE__ */ H(Dn, {
			items: dt,
			selectedId: J?.id ?? "",
			onSelect: ft,
			onMove: ht,
			onDuplicate: _t,
			onDelete: vt,
			onAdd: () => gt(),
			canAdd: K.length < 40,
			generatingSlideIds: lt,
			generatedItems: $e.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...ie ? { slideViewers: ie } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${I}-slide`
		}), pe ? Jt : /* @__PURE__ */ U("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${I}-main`,
			children: [
				/* @__PURE__ */ H("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${I}-stage-frame`,
					children: /* @__PURE__ */ H(qn, {
						generating: ut,
						label: at ? `Slide ${q + 1} of ${et}: ${at}` : "No slide",
						"data-testid": `${I}-stage`,
						children: Ht
					})
				}),
				!oe && Y,
				rt && /* @__PURE__ */ H(c, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${I}-generated-note`,
					children: `${rt.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				J && /* @__PURE__ */ U("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ H(xr, {
						value: J.notes,
						onChange: (e) => yt({
							...J,
							notes: e
						}),
						"data-testid": `${I}-slide-notes`
					}), tn]
				})
			]
		})]
	}), nn = Xe ? typeof n == "object" && "error" in n ? n.error : void 0 : "Add a source to each slide before presenting.", Z = !nn && (!T || n === "loading"), rn = [...K.map((e, t) => ({
		id: e.id,
		title: e.title || `Slide ${t + 1}`,
		...Qe.get(e.id) ? { svg: Qe.get(e.id) } : {},
		...e.notes ? { notes: e.notes } : {}
	})), ...$e.map((e) => ({
		id: e.id,
		title: e.title,
		generated: !0,
		...e.svg ? { svg: e.svg } : {}
	}))], an = /* @__PURE__ */ H(yr, {
		title: e.title,
		slides: rn,
		slideIndex: q,
		onSlideChange: (e) => {
			let t = ot[e];
			t && be(t);
		},
		onExit: Vt,
		loading: Z,
		...nn ? { error: nn } : {},
		...Xe && nn ? { onRetry: () => o(e) } : {},
		showNotes: x,
		testId: `${I}-present`
	}), on = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (_e) {
		let e = /* @__PURE__ */ H("div", {
			className: r("flex h-full min-h-0 flex-col", ce),
			"data-testid": I,
			"data-presenting": "",
			children: an
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
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", ce),
			"data-testid": I,
			onKeyDown: on,
			children: [
				/* @__PURE__ */ U("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${I}-deck-line`,
					children: [Gt, Y]
				}),
				Yt,
				X
			]
		});
		return /* @__PURE__ */ H(V, { children: oe({
			toolbar: qt,
			actions: Wt,
			surface: e,
			footer: en
		}) });
	}
	return /* @__PURE__ */ U("div", {
		className: r("relative flex h-full min-h-0 flex-col", ce),
		"data-testid": I,
		onKeyDown: on,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ U("div", {
					className: r("flex flex-wrap justify-between gap-2", je ? "items-center" : "items-end"),
					...je ? { "data-testid": `${I}-deck-line` } : {},
					children: [Gt, Wt]
				}), /* @__PURE__ */ H("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: qt
				})]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${I}-scroller`,
				children: [Yt, X]
			}),
			/* @__PURE__ */ H("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${I}-dock-row`,
				children: /* @__PURE__ */ H(de.Provider, {
					value: "pinned",
					children: en
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/TemplateGallery.tsx
var Dr = 3;
function Or(e) {
	return `${e} slide${e === 1 ? "" : "s"}`;
}
function kr({ templates: e, onSelect: t, selectedId: n, loading: i = !1, loadingCount: a = 4, emptyTitle: o = "No templates yet", emptyDescription: s, label: l = "Deck templates", className: u, testIdPrefix: d = "template-gallery" }) {
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
						children: /* @__PURE__ */ H(k, {
							height: "100%",
							rounded: "md"
						})
					}),
					/* @__PURE__ */ H(k, {
						height: 14,
						rounded: "md"
					}),
					/* @__PURE__ */ H(k, {
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
				let [r, ...i] = e.previews, a = i.slice(0, Dr), o = [Or(e.slideCount), e.audience].filter(Boolean).join(" · ");
				return /* @__PURE__ */ H("li", {
					className: "min-w-0",
					children: /* @__PURE__ */ U(v, {
						selected: n === e.id,
						onSelect: () => t(e.id),
						className: "flex h-full flex-col gap-2",
						"data-testid": `${d}-${e.id}`,
						"data-template": e.id,
						children: [
							/* @__PURE__ */ H(gr, { svg: r }),
							a.length > 0 && /* @__PURE__ */ H("span", {
								className: "grid grid-cols-3 gap-1.5",
								"data-testid": `${d}-${e.id}-strip`,
								children: a.map((e, t) => /* @__PURE__ */ H(gr, {
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
var Ar = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function jr(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => Ar[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function Mr(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function Nr({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [s, c] = B(!1), [l, u] = B(""), d = jr(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
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
						children: Mr(e)
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
						children: [/* @__PURE__ */ H(N, {
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
function Pr({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
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
			children: d.map((e) => /* @__PURE__ */ H(Nr, {
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
export { at as $, nt as A, xe as At, pt as B, lt as C, Dt as Ct, We as D, Ae as Dt, Be as E, W as Et, Ye as F, qe as G, Je as H, Qe as I, et as J, G as K, Ze as L, J as M, mt as N, Ge as O, Se as Ot, He as P, st as Q, Xe as R, xt as S, rn as St, ze as T, Fe as Tt, Ke as U, Ue as V, Re as W, ot as X, $e as Y, ct as Z, kn as _, Tt as _t, Er as a, gt as at, yt as b, At as bt, yr as c, Le as ct, Zn as d, jt as dt, Ve as et, Jn as f, Ft as ft, Gn as g, Lt as gt, qn as h, Nt as ht, kr as i, ht as it, q as j, dt as k, Ce as kt, _r as l, Pt as lt, Qn as m, Et as mt, Mr as n, K as nt, xr as o, vt as ot, or as p, St as pt, tt as q, jr as r, it as rt, br as s, _t as st, Pr as t, rt as tt, hr as u, wt as ut, Dn as v, It as vt, ut as w, Ie as wt, bt as x, Ct as xt, En as y, Mt as yt, ft as z };
