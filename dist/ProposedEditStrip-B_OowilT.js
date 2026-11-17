import { n as e, r as t, t as n } from "./useDocumentTypes-DCKwxXn8.js";
import { d as r, n as i, o as a } from "./Button-DQoeE5dN.js";
import { t as o } from "./Chip-BtSN-nsV.js";
import { n as s } from "./Text-XdCzxWMv.js";
import { a as c, i as l, n as u, o as d, r as f, t as p } from "./Table-B3hr3Qau.js";
import { t as m } from "./IconButton-BgM9MvwA.js";
import { at as h, m as g } from "./Icons-CNCMF52q.js";
import { c as _, o as v } from "./ErrorBoundary-DbN7k9yT.js";
import { n as y } from "./Badge-hAdAjIrX.js";
import { t as b } from "./Modal-C88cabjQ.js";
import { t as x } from "./Input-DiOEvL5h.js";
import { t as S } from "./Select-k38b8PrZ.js";
import { t as C } from "./FormField-BDZIVA7n.js";
import { t as w } from "./SearchInput-dKz14kIg.js";
import { t as T } from "./EmptyState-wSbA9Oka.js";
import { t as ee } from "./ErrorState-Cu8eBaIu.js";
import { t as te } from "./LoadingState-BQlqtSB5.js";
import { t as E } from "./DropdownMenu-8X91cU7p.js";
import { t as ne } from "./SegmentedControl-CO8w_o0t.js";
import { t as re } from "./StatusPill-AqmSksrZ.js";
import { n as D } from "./Tabs-VCUI4Fx2.js";
import { t as O } from "./Textarea-Cf4WFXAs.js";
import { t as k } from "./DotMeter-DJzl5dNX.js";
import { n as A } from "./RovingToolbar-eUKIxXK4.js";
import { t as j } from "./InlineAlert-BMRUWJjD.js";
import { t as M } from "./ThinkingDots-BhOnjzvM.js";
import { t as N } from "./PresenceAvatars-CM37OyKJ.js";
import { t as P } from "./useMeasuredWidth-vp2hlEPF.js";
import { t as F } from "./SectionLabel-B60gea5o.js";
import { G as I, U as L } from "./renderers-Bj_R7kXH.js";
import { a as ie } from "./composerSendError-CHBTu9L8.js";
import { t as ae } from "./InlineEditableText-CKjRokmb.js";
import { i as oe, t as se } from "./FloatingComposerDock-DbxmNCal.js";
import { Suspense as ce, lazy as le, useCallback as R, useEffect as z, useId as ue, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var de = /* @__PURE__ */ new Set(["diagram", "presentation"]), fe = [
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
], pe = [
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
function me(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function he(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function ge(t) {
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
function _e({ open: e, onClose: i, onCreate: a, onCreateFromFixture: s, onSearchDocuments: c, recordings: l, initialShape: u }) {
	let [d, f] = H([]), [p, m] = H(!1), [h, g] = H(null), [v, y] = H(null), [C, w] = H(""), [T, ee] = H(""), [te, E] = H(!1), [ne, re] = H(""), [D, k] = H("page"), [A, j] = H("blank"), [M, N] = H(""), [P, F] = H(""), [ie, ae] = H([]), oe = V(null), se = V(null), ce = ue(), le = `${ce}-blank-label`, R = `${ce}-type-label`, _e = `${ce}-cookbook-label`, ve = `${ce}-title`, ye = `${ce}-description`, be = `${ce}-deck-from`, xe = `${ce}-deck-source`;
	z(() => {
		if (!e) return;
		let r = n();
		f(r), g(null), y(null), w(""), ee(""), E(!1), re(""), k(u ?? "page"), j("blank"), N(""), F(""), ae([]);
		let i = !1;
		m(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			f(t), g((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || m(!1);
		});
		let a = setTimeout(() => oe.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let Se = B(() => fe.filter((e) => me(e, C)), [C]), Ce = B(() => d.filter((e) => he(e, C)), [d, C]), K = B(() => L.filter((e) => I(e, C)), [C]);
	if (z(() => {
		if (!e || D !== "presentation") return;
		if (A === "blank") {
			ae([]);
			return;
		}
		let t = P.trim().toLowerCase();
		if (A === "transcript") {
			let e = l ?? [];
			ae(t ? e.filter((e) => e.title.toLowerCase().includes(t)) : e);
			return;
		}
		if (!c) {
			ae([]);
			return;
		}
		let n = !1;
		return Promise.resolve(c(P.trim())).then((e) => {
			n || ae(e);
		}).catch(() => void 0), () => {
			n = !0;
		};
	}, [
		e,
		D,
		A,
		P,
		l,
		c
	]), !e) return null;
	let q = d.find((e) => e.id === h), we = v ? L.find((e) => e.id === v) : void 0, J = D === "sections", Te = !!we || !!q, Ee = d.length === 0 && !p && !we, Y = Se.length === 0 && Ce.length === 0 && K.length === 0, De = we ? {
		kind: "cookbook",
		cookbook: we
	} : q && !de.has(D) ? {
		kind: "type",
		type: q
	} : {
		kind: "blank",
		shape: D
	}, Oe = (e) => {
		if (e.kind === "cookbook") {
			y(e.cookbook.id), de.has(D) && k("page"), te || ee(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			k(e.shape), de.has(e.shape) && (y(null), te || ee(""));
			return;
		}
		y(null), g(e.type.id), te || ee("");
	}, ke = (e) => e.kind === "blank" ? e.shape : de.has(D) ? "page" : D, Ae = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let o = ne.trim() || void 0;
		if (n === "presentation") {
			s ? s({
				from: A,
				...A !== "blank" && M ? { sourceId: M } : {},
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
			let t = ge(e.cookbook);
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
	}, je = D === "presentation" && A !== "blank" && !M, Me = !!T.trim() && (!J || Te) && !je, Ne = () => {
		Me && Ae(De, T, ke(De));
	};
	return /* @__PURE__ */ W(b, {
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
				e.key === "Enter" && !e.shiftKey && Me && Ne();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ W("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ G("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ W(x, {
						ref: oe,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: C,
						onChange: (e) => w(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = K.length > 0 && C.trim() ? {
								kind: "cookbook",
								cookbook: K[0]
							} : Se.length > 0 ? {
								kind: "blank",
								shape: Se[0].id
							} : Ce.length > 0 ? {
								kind: "type",
								type: Ce[0]
							} : void 0;
							if (!t) return;
							Oe(t);
							let n = T.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								se.current?.focus();
								return;
							}
							Ae(t, n, ke(t));
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
								id: le,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": le,
								className: r("grid grid-cols-2 gap-2 md:grid-cols-4"),
								children: Se.map((e) => /* @__PURE__ */ G(_, {
									padding: "md",
									selected: D === e.id,
									onSelect: () => Oe({
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
											e.id === "page" && /* @__PURE__ */ W(o, {
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
						D === "presentation" && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							"data-testid": "presentation-start-from",
							children: [
								/* @__PURE__ */ W("label", {
									htmlFor: be,
									className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
									children: "Start from"
								}),
								/* @__PURE__ */ W(S, {
									id: be,
									value: A,
									options: pe.map((e) => ({
										value: e.value,
										label: e.label
									})),
									onChange: (e) => {
										j(e.target.value), N(""), F("");
									},
									"data-testid": "presentation-from"
								}),
								/* @__PURE__ */ W("div", {
									className: r("mt-1 text-[11px] text-text-tertiary"),
									children: A === "blank" ? "One empty slide. You add the slides and their sources as you write." : "The generator drafts the slides from it, and every slide cites what it came from."
								}),
								A !== "blank" && /* @__PURE__ */ G("div", {
									className: r("mt-2 flex flex-col gap-1.5"),
									children: [/* @__PURE__ */ W(x, {
										type: "search",
										value: P,
										onChange: (e) => F(e.target.value),
										"aria-label": A === "transcript" ? "Search transcripts" : "Search documents",
										placeholder: A === "transcript" ? "Search transcripts…" : "Search documents…",
										"data-testid": "presentation-source-search"
									}), ie.length === 0 ? /* @__PURE__ */ W("div", {
										"data-testid": "presentation-no-sources",
										className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
										children: A === "transcript" ? "No transcripts to draw on. A recording with a transcript can seed a deck." : c ? "Nothing matches that. Sources come from the Documents explorer." : "Document search is not available here — start blank and add sources per slide."
									}) : /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G("label", {
										htmlFor: xe,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: [
											A === "transcript" ? "Transcript" : "Document",
											" ",
											/* @__PURE__ */ W("span", {
												className: r("text-danger-fg"),
												"aria-hidden": "true",
												children: "*"
											})
										]
									}), /* @__PURE__ */ W(S, {
										id: xe,
										required: !0,
										"aria-required": "true",
										value: M,
										placeholder: "Choose one…",
										options: ie.map((e) => ({
											value: e.id,
											label: e.subtitle ? `${e.title} · ${e.subtitle}` : e.title
										})),
										onChange: (e) => N(e.target.value),
										"data-testid": "presentation-source"
									})] })]
								})
							]
						}),
						K.length > 0 && /* @__PURE__ */ G("div", {
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
									children: D === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : D === "presentation" ? "Picking one switches to Page — a deck’s structure is the slide spec, not a document type." : D === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ W("div", {
								role: "group",
								"aria-labelledby": _e,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: K.map((e) => {
									let t = v === e.id;
									return /* @__PURE__ */ G(_, {
										padding: "md",
										selected: t,
										onSelect: () => Oe({
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
						!de.has(D) && (Ce.length > 0 || Ee || d.length === 0 && p) && /* @__PURE__ */ G("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ G("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ W("span", {
										id: R,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !J && /* @__PURE__ */ W("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								d.length === 0 && p && /* @__PURE__ */ W("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Ee && /* @__PURE__ */ W("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: J ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								Ce.length > 0 && /* @__PURE__ */ W("div", {
									role: "group",
									"aria-labelledby": R,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: Ce.map((e) => {
										let t = !we && h === e.id;
										return /* @__PURE__ */ G("button", {
											"data-ui-part": "",
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Oe({
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
															children: D === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
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
						Y && /* @__PURE__ */ G("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								C,
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
						}), /* @__PURE__ */ W(x, {
							ref: se,
							id: ve,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: T,
							onChange: (e) => {
								ee(e.target.value), E(!0);
							},
							placeholder: we ? `e.g. ${we.name}` : q ? `e.g. Q2 ${q.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ G("div", { children: [/* @__PURE__ */ G("label", {
						htmlFor: ye,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ W("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ W(O, {
						id: ye,
						"data-testid": "new-doc-description",
						value: ne,
						onChange: (e) => re(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ G("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ W("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-cancel",
						onClick: i,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ W("button", {
						"data-ui-part": "",
						"data-testid": "new-doc-submit",
						onClick: Ne,
						disabled: !Me,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", Me ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/revisionPicker.ts
var ve = "__older-revisions__";
function ye(e, t) {
	let n = [...e].reverse().map((e, t) => ({
		value: e.id,
		label: t === 0 ? `${e.label} · latest` : e.label
	}));
	return t && t.count > 0 && n.push(t.loading ? {
		value: ve,
		label: "Loading older versions…",
		disabled: !0
	} : {
		value: ve,
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
var K = 5;
function q({ back: e }) {
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
function we({ title: e, subtitle: t, revisions: n, olderRevisions: o, revisionId: c, onRevisionChange: l, slideIndex: u, onSlideChange: d, onDownload: f, downloadLabel: p = "Download .pptx", onOpenPreview: h, pending: g, notice: _, state: y = "ready", errorMessage: b, ownerName: x, onRetry: C, maxSlideWidth: w, autoFocus: E = !1, className: D, "data-testid": O = "presentation-view" }) {
	let k = ue(), A = V(null), j = V(!1);
	if (z(() => {
		!E || j.current || !A.current || (j.current = !0, A.current.focus({ preventScroll: !0 }));
	}), y === "loading") return /* @__PURE__ */ W(te, {
		label: "Opening the presentation…",
		testId: `${O}-loading`
	});
	if (y === "no-access") return /* @__PURE__ */ W(v, {
		resource: "this presentation",
		ownerName: x ?? null,
		testId: `${O}-no-access`
	});
	if (y === "error") return /* @__PURE__ */ W(ee, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...C ? {
			actionLabel: "Try again",
			onAction: C
		} : {},
		testId: `${O}-error`
	});
	let M = n.find((e) => e.id === c) ?? n[0], N = M?.slides ?? [];
	if (y === "empty" || !M || N.length === 0) return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", D),
		"data-testid": O,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-col",
			children: [/* @__PURE__ */ W(s, {
				as: "div",
				className: "text-base font-semibold text-text-primary",
				children: e
			}), t && /* @__PURE__ */ W(s, {
				as: "div",
				className: "truncate text-xs text-text-tertiary",
				"data-testid": `${O}-subtitle`,
				children: t
			})]
		}), /* @__PURE__ */ W(T, {
			title: "No slides yet",
			description: g?.status === "generating" ? `${g.label} is still being generated.` : g?.status === "failed" ? g.message ?? `${g.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${O}-empty`
		})]
	});
	let P = N[Math.min(Math.max(u, 1), N.length) - 1];
	return /* @__PURE__ */ G("div", {
		className: r("flex min-h-0 flex-col gap-3 p-4", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", D),
		ref: A,
		"data-testid": O,
		role: "group",
		tabIndex: 0,
		"aria-roledescription": "Slide deck",
		"aria-label": `${e} — slide ${P.index} of ${N.length}. Use the left and right arrow keys to change slide.`,
		onKeyDown: (e) => {
			let t = Se(e);
			if (!t) return;
			e.preventDefault();
			let n = Ce(t, P.index, N.length);
			n !== P.index && d(n);
		},
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ G("div", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ W(s, {
						as: "div",
						className: "text-base font-semibold text-text-primary",
						"data-testid": `${O}-title`,
						children: e
					}), t && /* @__PURE__ */ W(s, {
						as: "div",
						className: "truncate text-xs text-text-tertiary",
						"data-testid": `${O}-subtitle`,
						children: t
					})]
				}), /* @__PURE__ */ G("div", {
					className: "flex items-center gap-2",
					children: [
						n.length > K || (o?.count ?? 0) > 0 ? /* @__PURE__ */ W(S, {
							"aria-label": "Revision",
							size: "sm",
							value: M.id,
							onChange: (e) => be(e.target.value, l, o),
							options: ye(n, o),
							className: "w-auto",
							"data-testid": `${O}-revision-select`
						}) : n.length > 1 && /* @__PURE__ */ W(a, {
							density: "compact",
							children: /* @__PURE__ */ W(ne, {
								"aria-label": "Revision",
								value: M.id,
								onChange: l,
								options: n.map((e) => ({
									label: e.label,
									value: e.id
								})),
								"data-testid": `${O}-revisions`
							})
						}),
						g && /* @__PURE__ */ W(re, {
							state: g.status === "failed" ? "error" : "pending",
							label: `${g.label} ${g.status}`,
							"data-testid": `${O}-pending`
						}),
						f && /* @__PURE__ */ W(i, {
							variant: "secondary",
							size: "sm",
							onClick: f,
							"data-testid": `${O}-download`,
							children: p
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
							style: w === void 0 ? void 0 : { maxWidth: w },
							"data-testid": `${O}-stage`,
							children: P.preview ?? /* @__PURE__ */ W(s, {
								className: "text-[13px] text-text-tertiary",
								"data-testid": `${O}-no-preview`,
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
								icon: /* @__PURE__ */ W(q, { back: !0 }),
								disabled: P.index <= 1,
								onClick: () => d(P.index - 1),
								"data-testid": `${O}-previous`
							}),
							/* @__PURE__ */ W(s, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${O}-position`,
								children: `Slide ${P.index} of ${N.length}`
							}),
							/* @__PURE__ */ W(m, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ W(q, {}),
								disabled: P.index >= N.length,
								onClick: () => d(P.index + 1),
								"data-testid": `${O}-next`
							}),
							h && P.preview && /* @__PURE__ */ W(i, {
								variant: "ghost",
								size: "sm",
								onClick: () => h(P.id),
								"data-testid": `${O}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ G("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": k,
					"data-testid": `${O}-outline`,
					children: [/* @__PURE__ */ W(F, {
						as: "div",
						className: "mb-1",
						"data-testid": `${O}-outline-label`,
						children: /* @__PURE__ */ W("span", {
							id: k,
							children: "Slides"
						})
					}), /* @__PURE__ */ W("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: N.map((e) => /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G("button", {
							"data-ui-part": "",
							type: "button",
							onClick: () => d(e.index),
							"aria-current": e.id === P.id ? "true" : void 0,
							className: r("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === P.id && "bg-surface-hover font-medium"),
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
			_ && /* @__PURE__ */ W(s, {
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
function Te() {
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
function Ee() {
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
function Y() {
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
function De() {
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
function Oe({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: c = !1, readOnly: l = !1, onSelect: u, onMove: d, onDuplicate: f, onDelete: p, canDuplicate: h, canDelete: g, dragHandle: _, rowRef: v, dragging: y = !1, testIdPrefix: b }) {
	let x = J(i);
	return /* @__PURE__ */ G("li", {
		ref: v,
		"data-testid": `${b}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": c ? "true" : void 0,
		className: r("flex items-start gap-1.5 rounded-lg border p-1.5 transition-colors", a ? "border-info bg-info-bg" : c ? "border-success bg-success-bg" : "border-transparent hover:bg-surface-hover", y && "opacity-40"),
		children: [
			!l && (_ ?? /* @__PURE__ */ W("span", {
				className: "w-0",
				"aria-hidden": "true"
			})),
			/* @__PURE__ */ G("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => u(e.id),
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
						}) : /* @__PURE__ */ W(s, {
							className: "text-[9px] text-text-tertiary",
							children: "no preview"
						})
					}),
					/* @__PURE__ */ G("span", {
						className: "flex min-w-0 flex-1 flex-col gap-0.5",
						children: [
							/* @__PURE__ */ W(s, {
								as: "span",
								className: "truncate text-[12px] font-medium text-text-primary",
								children: e.title || "Untitled slide"
							}),
							/* @__PURE__ */ W(s, {
								as: "span",
								className: "text-[10px] text-text-tertiary",
								children: e.layout
							}),
							c && /* @__PURE__ */ W(s, {
								as: "span",
								className: "text-[10px] font-semibold text-success-fg",
								"data-testid": `${b}-changed-${e.id}`,
								children: "Edited by agent"
							}),
							o && /* @__PURE__ */ W(s, {
								as: "span",
								className: "text-[10px] font-semibold text-danger-fg",
								"data-testid": `${b}-uncited-${e.id}`,
								children: "No source"
							})
						]
					})
				]
			}),
			!l && /* @__PURE__ */ G("span", {
				className: "flex shrink-0 flex-col gap-0.5",
				children: [/* @__PURE__ */ G("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ W(m, {
						"aria-label": `Move slide ${t + 1} up`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Te, {}),
						disabled: t === 0,
						onClick: () => d(t, t - 1),
						"data-testid": `${b}-up-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Move slide ${t + 1} down`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Ee, {}),
						disabled: t >= n - 1,
						onClick: () => d(t, t + 1),
						"data-testid": `${b}-down-${e.id}`
					})]
				}), /* @__PURE__ */ G("span", {
					className: "flex gap-0.5",
					children: [/* @__PURE__ */ W(m, {
						"aria-label": `Duplicate slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(Y, {}),
						disabled: !h,
						onClick: () => f(e.id),
						"data-testid": `${b}-duplicate-${e.id}`
					}), /* @__PURE__ */ W(m, {
						"aria-label": `Delete slide ${t + 1}`,
						variant: "ghost",
						size: "sm",
						icon: /* @__PURE__ */ W(De, {}),
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
function ke({ items: e, selectedId: t, readOnly: n = !1, onSelect: i, onMove: a, onDuplicate: o, onDelete: s, canDuplicate: c, rowComponent: l = Oe, listClassName: u, testIdPrefix: d }) {
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
var Ae = 40, je = 8, Me = 200, Ne = 120, X = 200, Pe = 60, Fe = 2e3, Ie = 24, Le = 6, Re = 400, ze = 10, Be = /^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/, Ve = [
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
function He(e) {
	return e.slides.filter((e) => e.sources.length === 0).map((e) => e.id);
}
function $(e) {
	return e.slides.length > 0 && He(e).length === 0;
}
function Ue(e, t = "s") {
	let n = new Set(e.slides.map((e) => e.id)), r = e.slides.length + 1;
	for (; n.has(`${t}${r}`);) r += 1;
	return `${t}${r}`;
}
function We(e, t = "bullets") {
	return Ge({
		id: e,
		layout: t,
		title: "",
		sources: []
	}, t);
}
function Ge(e, t) {
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
function Ke(e, t) {
	let n = e.slides.findIndex((e) => e.id === t.id);
	if (n === -1) return e;
	let r = e.slides.slice();
	return r[n] = t, {
		...e,
		slides: r
	};
}
function qe(e, t, n) {
	let { slides: r } = e;
	if (t === n || t < 0 || t >= r.length || n < 0 || n >= r.length) return e;
	let i = r.slice(), [a] = i.splice(t, 1);
	return i.splice(n, 0, a), {
		...e,
		slides: i
	};
}
function Je(e, t, n = "bullets") {
	if (e.slides.length >= 40) return e;
	let r = We(Ue(e), n), i = e.slides.slice();
	return i.splice(Math.min(Math.max(t + 1, 0), i.length), 0, r), {
		...e,
		slides: i
	};
}
function Ye(e, t) {
	if (e.slides.length >= 40) return e;
	let n = e.slides.findIndex((e) => e.id === t);
	if (n === -1) return e;
	let r = e.slides[n], i = {
		...r,
		id: Ue(e),
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
function Xe(e, t) {
	if (e.slides.length <= 1) return e;
	let n = e.slides.filter((e) => e.id !== t);
	return n.length === e.slides.length ? e : {
		...e,
		slides: n
	};
}
function Ze(e) {
	let t = e.reduce((e, t) => {
		let n = /^v(\d+)$/i.exec(t.label.trim());
		return n ? Math.max(e, Number(n[1])) : e;
	}, 0);
	return `v${Math.max(t, e.length) + 1}`;
}
//#endregion
//#region src/components/doc-editor/presentation/Filmstrip.tsx
var Qe = le(() => import("./SortableSlideList-PGHi6zZw.js"));
function $e(e, t) {
	if (e) return Array.from(e.querySelectorAll("[data-slide-id]")).find((e) => e.dataset.slideId === t);
}
function et(e, t) {
	$e(e, t)?.querySelector("[data-filmstrip-select]")?.focus();
}
function tt() {
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
function nt({ item: e, index: t, selected: n, viewers: i, onSelect: a, testIdPrefix: o }) {
	let c = J(e.thumbnailSvg), l = t + 1;
	return /* @__PURE__ */ G("li", {
		"data-testid": `${o}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-generated": "true",
		className: "group flex items-start gap-1.5",
		children: [/* @__PURE__ */ W("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: /* @__PURE__ */ W("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: l
			})
		}), /* @__PURE__ */ G("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ W("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => a(e.id),
					"aria-current": n ? "true" : void 0,
					"aria-label": `Slide ${l}: ${e.title} (generated, not editable)`,
					"data-testid": `${o}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", n ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-border-emphasis"),
					children: c ? /* @__PURE__ */ W("img", {
						src: c,
						alt: "",
						className: "h-full w-full object-contain",
						"data-testid": `${o}-thumb-${e.id}`
					}) : /* @__PURE__ */ G("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ W(s, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: e.title
						}), /* @__PURE__ */ W(s, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: "Generated"
						})]
					})
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [/* @__PURE__ */ W(s, {
						as: "span",
						className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
						children: e.title
					}), /* @__PURE__ */ G(s, {
						as: "span",
						className: "inline-flex shrink-0 items-center gap-0.5 text-[10px] font-semibold text-text-tertiary",
						title: "Built from the slides' citations; it changes as they do.",
						"data-testid": `${o}-generated-${e.id}`,
						children: [/* @__PURE__ */ W(tt, {}), "Generated"]
					})]
				}),
				i && i.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${o}-viewers-${e.id}`,
					"aria-label": `${i.map((e) => e.name).join(", ")} ${i.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(N, {
						users: [...i],
						maxVisible: 2,
						size: 16
					})
				})
			]
		})]
	});
}
function rt() {
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
function it({ slide: e, index: t, total: n, thumbnailSvg: i, selected: a, uncited: o, changed: c = !1, generating: l = !1, viewers: u, readOnly: d = !1, onSelect: f, onMove: p, onDuplicate: m, onDelete: h, canDuplicate: g, canDelete: _, dragHandle: v, rowRef: y, dragging: b = !1, testIdPrefix: x }) {
	let S = J(i), C = t + 1, w = e.title || "Untitled slide", T = [
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
	return /* @__PURE__ */ G("li", {
		ref: y,
		"data-testid": `${x}-row-${e.id}`,
		"data-slide-id": e.id,
		"data-changed": c ? "true" : void 0,
		"data-generating": l ? "true" : void 0,
		"aria-busy": l || void 0,
		className: r("group flex items-start gap-1.5", b && "opacity-40"),
		children: [/* @__PURE__ */ G("span", {
			className: "flex w-4 shrink-0 flex-col items-center gap-1 pt-0.5",
			children: [/* @__PURE__ */ W("span", {
				className: "text-[11px] tabular-nums text-text-tertiary",
				children: C
			}), !d && v && /* @__PURE__ */ W("span", {
				className: "opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100",
				children: v
			})]
		}), /* @__PURE__ */ G("span", {
			className: "relative flex min-w-0 flex-1 flex-col gap-0.5",
			children: [
				/* @__PURE__ */ G("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => f(e.id),
					"aria-current": a ? "true" : void 0,
					"aria-label": `Slide ${C}: ${w}`,
					"data-testid": `${x}-select-${e.id}`,
					"data-filmstrip-select": "",
					className: r("relative block aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md border bg-surface p-0 text-left font-[inherit] transition-shadow", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", a ? "border-primary ring-2 ring-primary/40" : c ? "border-success" : o ? "border-danger-border" : "border-border hover:border-border-emphasis"),
					children: [S ? /* @__PURE__ */ W("img", {
						src: S,
						alt: "",
						className: r("h-full w-full object-contain", l && "opacity-40"),
						"data-testid": `${x}-thumb-${e.id}`
					}) : /* @__PURE__ */ G("span", {
						className: "flex h-full w-full flex-col justify-center gap-0.5 px-2",
						children: [/* @__PURE__ */ W(s, {
							as: "span",
							className: "line-clamp-2 text-[10px] font-semibold leading-tight text-text-primary",
							children: w
						}), /* @__PURE__ */ W(s, {
							as: "span",
							className: "text-[9px] text-text-tertiary",
							children: Z[e.layout]
						})]
					}), l && /* @__PURE__ */ W("span", {
						className: "absolute inset-x-0 bottom-0 bg-surface/85 px-1.5 py-0.5",
						"data-testid": `${x}-generating-${e.id}`,
						children: /* @__PURE__ */ W(s, {
							as: "span",
							className: "text-[10px] font-medium text-text-secondary",
							children: "Generating…"
						})
					})]
				}),
				/* @__PURE__ */ G("span", {
					className: "flex min-w-0 items-center gap-1.5",
					children: [
						S ? /* @__PURE__ */ W(s, {
							as: "span",
							className: "min-w-0 flex-1 truncate text-[11px] text-text-secondary",
							children: w
						}) : /* @__PURE__ */ W("span", {
							className: "min-w-0 flex-1",
							"aria-hidden": "true"
						}),
						c && !l && /* @__PURE__ */ W(s, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-success-fg",
							"data-testid": `${x}-changed-${e.id}`,
							children: "Edited by agent"
						}),
						o && /* @__PURE__ */ W(s, {
							as: "span",
							className: "shrink-0 text-[10px] font-semibold text-danger-fg",
							"data-testid": `${x}-uncited-${e.id}`,
							children: "No source"
						})
					]
				}),
				u && u.length > 0 && /* @__PURE__ */ W("span", {
					className: "pointer-events-none absolute left-1 top-1",
					"data-testid": `${x}-viewers-${e.id}`,
					"aria-label": `${u.map((e) => e.name).join(", ")} ${u.length === 1 ? "is" : "are"} on this slide`,
					role: "img",
					children: /* @__PURE__ */ W(N, {
						users: [...u],
						maxVisible: 2,
						size: 16
					})
				}),
				!d && T.length > 0 && /* @__PURE__ */ W("span", {
					className: r("absolute right-1 top-1 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100", a ? "opacity-100" : "opacity-0"),
					children: /* @__PURE__ */ W(E, {
						trigger: /* @__PURE__ */ W(rt, {}),
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
function at({ items: e, selectedId: t, onSelect: n, onMove: a, onDuplicate: o, onDelete: c, onAdd: l, canAdd: u = !0, generatingSlideIds: d, generatedItems: f, slideViewers: p, readOnly: m = !1, className: g, testIdPrefix: _ = "filmstrip" }) {
	let v = V(null), y = B(() => new Set(d ?? []), [d]), b = B(() => e.map((e) => {
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
	]), x = B(() => {
		let t = new Set(e.map((e) => e.slide.id));
		return [...y].filter((e) => !t.has(e));
	}, [e, y]);
	z(() => {
		$e(v.current, t)?.scrollIntoView?.({ block: "nearest" });
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
			a(i, o), requestAnimationFrame(() => et(v.current, s));
			return;
		}
		let c = C[o];
		n(c), et(v.current, c);
	}, T = {
		items: b,
		selectedId: t,
		readOnly: m,
		onSelect: n,
		onMove: a,
		onDuplicate: o,
		onDelete: c,
		canDuplicate: u,
		rowComponent: it,
		listClassName: "gap-2.5",
		testIdPrefix: _
	};
	return /* @__PURE__ */ G("div", {
		ref: v,
		role: "group",
		"aria-label": "Slides",
		className: r("flex min-w-0 flex-col gap-2.5", g),
		"data-testid": `${_}-strip`,
		onKeyDown: w,
		children: [
			/* @__PURE__ */ W(ce, {
				fallback: /* @__PURE__ */ W(ke, { ...T }),
				children: W(m ? ke : Qe, { ...T })
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
					children: /* @__PURE__ */ W(s, {
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
				children: S.map((r, i) => /* @__PURE__ */ W(nt, {
					item: r,
					index: e.length + x.length + i,
					selected: r.id === t,
					...p?.[r.id]?.length ? { viewers: p[r.id] } : {},
					onSelect: n,
					testIdPrefix: _
				}, r.id))
			}),
			l && !m && /* @__PURE__ */ G("div", {
				className: "flex items-start gap-1.5",
				children: [/* @__PURE__ */ W("span", {
					className: "w-4 shrink-0",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(i, {
					variant: "secondary",
					size: "sm",
					disabled: !u,
					onClick: l,
					className: "min-w-0 flex-1",
					"data-testid": `${_}-add`,
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
var ot = {
	document: "📄",
	transcript: "🎙️"
};
function st({ sources: e, onChange: t, options: n, onSearchSources: a, readOnly: o = !1, compact: c = !1, testIdPrefix: l }) {
	let [u, d] = H(""), [f, p] = H(!1), [m, h] = H(n), g = ue(), _ = V(0);
	z(() => {
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
	}, x = /* @__PURE__ */ W(ie, {
		references: v,
		onRemove: o ? void 0 : (n) => {
			t(e.filter((e) => `${e.documentId}${e.anchor ? `#${e.anchor}` : ""}` !== n));
		},
		removeLabel: (e) => `Remove source ${e.label}`,
		className: "px-0 py-0",
		"data-testid": `${l}-source-chips`
	}), S = /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ W(w, {
			value: u,
			onChange: d,
			placeholder: "Search your documents and transcripts…",
			"aria-label": "Search sources",
			"data-testid": `${l}-source-search`
		}), y ? /* @__PURE__ */ W(s, {
			className: "text-[11px] text-text-tertiary",
			children: "A slide cites at most 10 sources."
		}) : m.length === 0 ? /* @__PURE__ */ W(s, {
			className: "text-[11px] text-text-tertiary",
			"data-testid": `${l}-source-no-results`,
			children: "Nothing matches that. Sources come from the Documents explorer."
		}) : /* @__PURE__ */ W("ul", {
			"aria-labelledby": g,
			className: "m-0 flex max-h-32 list-none flex-col gap-0.5 overflow-y-auto p-0",
			"data-testid": `${l}-source-results`,
			children: m.slice(0, 20).map((t) => {
				let n = e.some((e) => e.documentId === t.documentId);
				return /* @__PURE__ */ W("li", { children: /* @__PURE__ */ G(i, {
					variant: "ghost",
					size: "sm",
					fullWidth: !0,
					disabled: n,
					onClick: () => b(t),
					"data-testid": `${l}-source-option-${t.documentId}`,
					className: r("justify-start border-none text-left"),
					children: [
						/* @__PURE__ */ W("span", {
							className: "mr-1.5",
							"aria-hidden": "true",
							children: ot[t.kind ?? "document"]
						}),
						/* @__PURE__ */ W("span", {
							className: "truncate",
							children: t.title
						}),
						n && /* @__PURE__ */ W("span", {
							className: "ml-1.5 text-xs text-text-tertiary",
							children: "added"
						})
					]
				}) }, t.documentId);
			})
		})]
	});
	return c ? /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-wrap items-center gap-2",
			children: [
				/* @__PURE__ */ W(F, {
					as: "div",
					children: /* @__PURE__ */ W("span", {
						id: g,
						children: "Sources"
					})
				}),
				e.length === 0 ? /* @__PURE__ */ W(s, {
					as: "span",
					className: "text-[12px] font-semibold text-danger-fg",
					"data-testid": `${l}-sources-warning`,
					children: "None yet — this slide needs one before Save."
				}) : /* @__PURE__ */ W("div", {
					className: "min-w-0",
					children: x
				}),
				!o && /* @__PURE__ */ W(i, {
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
	}) : /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": `${l}-sources`,
		children: [
			/* @__PURE__ */ W(F, {
				as: "div",
				children: /* @__PURE__ */ W("span", {
					id: g,
					children: "Sources used"
				})
			}),
			e.length === 0 ? /* @__PURE__ */ W(j, {
				tone: "warning",
				"data-testid": `${l}-sources-warning`,
				children: "This slide cites nothing. Every slide names at least one source — add one before saving."
			}) : x,
			!o && S
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SlideForm.tsx
function ct() {
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
function lt({ label: e, bullets: t, onChange: n, readOnly: r, testIdPrefix: a }) {
	let o = (e, r) => {
		let i = t.slice();
		i[e] = r, n(i);
	};
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1",
		"data-testid": a,
		children: [
			/* @__PURE__ */ W(F, {
				as: "div",
				children: e
			}),
			/* @__PURE__ */ W("ol", {
				className: "m-0 flex list-none flex-col gap-1 p-0",
				children: t.map((i, c) => /* @__PURE__ */ G("li", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ W(s, {
							className: "w-3 shrink-0 text-[11px] text-text-tertiary",
							children: "•"
						}),
						/* @__PURE__ */ W(x, {
							value: i,
							maxLength: 200,
							disabled: r,
							"aria-label": `${e} ${c + 1}`,
							onChange: (e) => o(c, e.target.value),
							"data-testid": `${a}-${c}`
						}),
						!r && /* @__PURE__ */ W(m, {
							"aria-label": `Remove ${e.toLowerCase()} ${c + 1}`,
							variant: "ghost",
							size: "sm",
							icon: /* @__PURE__ */ W(ct, {}),
							onClick: () => n(t.filter((e, t) => t !== c)),
							"data-testid": `${a}-remove-${c}`
						})
					]
				}, c))
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
function ut({ chart: e, onChange: t, readOnly: n, testIdPrefix: r }) {
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
			children: [/* @__PURE__ */ W(C, {
				label: "Chart type",
				className: "w-40",
				children: (i) => /* @__PURE__ */ W(S, {
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
					e.series.map((i, a) => /* @__PURE__ */ W(d, { children: /* @__PURE__ */ W(x, {
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
					/* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(x, {
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
					e.series.map((e, t) => /* @__PURE__ */ W(c, { children: /* @__PURE__ */ W(x, {
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
						icon: /* @__PURE__ */ W(ct, {}),
						disabled: e.labels.length <= 1,
						onClick: () => s(o),
						"data-testid": `${r}-remove-label-${o}`
					}) })
				] }, o)) })]
			})
		})]
	});
}
function dt({ slide: e, onChange: t, sources: n, onSearchSources: i, readOnly: a = !1, showSources: o = !0, showNotes: s = !0, testIdPrefix: c }) {
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
				children: [/* @__PURE__ */ W(C, {
					label: "Eyebrow",
					hint: "The small line above the title.",
					children: (t) => /* @__PURE__ */ W(x, {
						...t,
						value: e.eyebrow ?? "",
						maxLength: 60,
						disabled: a,
						onChange: (e) => l({ eyebrow: e.target.value || void 0 }),
						"data-testid": `${c}-eyebrow`
					})
				}), /* @__PURE__ */ W(C, {
					label: "Slide title",
					required: !0,
					children: (t) => /* @__PURE__ */ W(x, {
						...t,
						value: e.title,
						maxLength: 120,
						disabled: a,
						onChange: (e) => l({ title: e.target.value }),
						"data-testid": `${c}-title`
					})
				})]
			}),
			e.layout === "bullets" && /* @__PURE__ */ W(lt, {
				label: "Bullets",
				bullets: e.bullets ?? [],
				onChange: (e) => l({ bullets: e }),
				readOnly: a,
				testIdPrefix: `${c}-bullets`
			}),
			e.layout === "two-column" && /* @__PURE__ */ G("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ W(lt, {
					label: "Left column",
					bullets: e.columns?.[0] ?? [],
					onChange: (t) => l({ columns: [t, e.columns?.[1] ?? []] }),
					readOnly: a,
					testIdPrefix: `${c}-column-0`
				}), /* @__PURE__ */ W(lt, {
					label: "Right column",
					bullets: e.columns?.[1] ?? [],
					onChange: (t) => l({ columns: [e.columns?.[0] ?? [], t] }),
					readOnly: a,
					testIdPrefix: `${c}-column-1`
				})]
			}),
			e.layout === "chart" && e.chart && /* @__PURE__ */ W(ut, {
				chart: e.chart,
				onChange: (e) => l({ chart: e }),
				readOnly: a,
				testIdPrefix: `${c}-chart`
			}),
			e.layout === "quote" && /* @__PURE__ */ G("div", {
				className: "flex flex-col gap-2",
				children: [/* @__PURE__ */ W(C, {
					label: "Quote",
					children: (t) => /* @__PURE__ */ W(O, {
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
				}), /* @__PURE__ */ W(C, {
					label: "Attributed to",
					children: (t) => /* @__PURE__ */ W(x, {
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
			e.layout === "image" && /* @__PURE__ */ W(C, {
				label: "Image description",
				hint: "An image slide is a framed caption until an asset pipeline puts bytes behind it.",
				children: (t) => /* @__PURE__ */ W(x, {
					...t,
					value: e.image?.alt ?? "",
					disabled: a,
					onChange: (e) => l({ image: { alt: e.target.value } }),
					"data-testid": `${c}-image-alt`
				})
			}),
			s && /* @__PURE__ */ W(C, {
				label: "Speaker notes",
				hint: "Goes into the .pptx notes pane, not onto the slide.",
				children: (t) => /* @__PURE__ */ W(O, {
					...t,
					rows: 3,
					maxLength: 2e3,
					value: e.notes ?? "",
					disabled: a,
					onChange: (e) => l({ notes: e.target.value || void 0 }),
					"data-testid": `${c}-notes`
				})
			}),
			o && /* @__PURE__ */ W(st, {
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
var ft = {
	"2xl": "max-w-2xl",
	"3xl": "max-w-3xl",
	"4xl": "max-w-4xl",
	"5xl": "max-w-5xl"
};
function pt({ children: e, generating: t = !1, generatingLabel: n = "Generating…", label: i, maxWidth: a = "4xl", className: o, "data-testid": c = "slide-stage" }) {
	return /* @__PURE__ */ W("div", {
		className: r("flex w-full justify-center", o),
		children: /* @__PURE__ */ G("div", {
			role: "figure",
			"aria-label": i,
			"aria-busy": t || void 0,
			"data-testid": c,
			"data-aspect": "16/9",
			className: r("relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-surface shadow-sm", ft[a]),
			children: [e, t && /* @__PURE__ */ G("span", {
				role: "status",
				className: "absolute inset-x-0 bottom-0 flex items-center gap-2 bg-surface/85 px-3 py-1.5",
				"data-testid": `${c}-generating`,
				children: [/* @__PURE__ */ W("span", {
					className: "h-1.5 w-1.5 animate-pulse rounded-full bg-primary",
					"aria-hidden": "true"
				}), /* @__PURE__ */ W(s, {
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
var mt = [
	"chart",
	"quote",
	"image",
	"two-column"
], ht = {
	product: "Product",
	engineering: "Engineering",
	plain: "Plain"
}, gt = {
	narrow: 600,
	wide: 900
};
function _t(e) {
	return e == null ? "wide" : e < gt.narrow ? "narrow" : e < gt.wide ? "medium" : "wide";
}
var vt = {
	wide: /* @__PURE__ */ new Set([
		"layout",
		"insert",
		"theme",
		"chart",
		"note"
	]),
	medium: /* @__PURE__ */ new Set(["layout", "chart"]),
	narrow: /* @__PURE__ */ new Set([])
}, yt = "Text style comes from the theme", bt = "A deck is rendered from its layout and theme, so text has no bold, italic or font of its own.";
function xt({ redo: e }) {
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
function St() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-3 w-3",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", { d: "M4.5 3v10l8-5-8-5z" })
	});
}
function Ct() {
	return /* @__PURE__ */ W("span", {
		className: "mx-1 h-5 w-px shrink-0 bg-border",
		"aria-hidden": "true"
	});
}
function wt({ label: e, value: t }) {
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
function Tt({ slide: e, theme: t, onAddSlide: n, canAddSlide: o = !0, onLayoutChange: c, onThemeChange: l, onChartKindChange: u, onUndo: d, onRedo: f, canUndo: p = !1, canRedo: g = !1, onPresent: _, end: v, disabled: y = !1, className: b, testIdPrefix: x = "slides-toolbar", size: S = "auto" }) {
	let { ref: C, ...w } = A(), { ref: T, width: ee } = P(C), te = S === "auto" ? _t(ee) : S, re = vt[te], D = (e) => re.has(e), O = y, k = !O && e ? {
		label: "Layout of this slide",
		items: Ve.map((t) => ({
			label: Z[t],
			checked: t === e.layout,
			onSelect: () => {
				t !== e.layout && c(t);
			},
			"data-testid": `${x}-layout-${t}`
		}))
	} : null, j = !O && o ? {
		label: "New slide after this one",
		items: mt.map((e) => ({
			label: `${Z[e]} slide`,
			onSelect: () => n(e),
			"data-testid": `${x}-insert-${e}`
		}))
	} : null, M = O ? null : {
		label: "Deck theme",
		items: Q.map((e) => ({
			label: ht[e],
			checked: e === t,
			onSelect: () => {
				e !== t && l(e);
			},
			"data-testid": `${x}-theme-${e}`
		}))
	}, N = !O && e?.layout === "chart" && e.chart && u ? e.chart : null, F = N && u ? {
		label: "Chart type",
		items: ["bar", "line"].map((e) => ({
			label: e === "bar" ? "Bar" : "Line",
			checked: N.kind === e,
			onSelect: () => {
				N.kind !== e && u(e);
			},
			"data-testid": `${x}-chart-kind-${e}`
		}))
	} : null, I = [];
	return !D("layout") && k && I.push(k), !D("insert") && j && I.push(j), !D("theme") && M && I.push(M), !D("chart") && F && I.push(F), !D("note") && !O && I.push({
		label: yt,
		items: [],
		"data-testid": `${x}-style-note`
	}), /* @__PURE__ */ G("div", {
		...w,
		ref: T,
		role: "toolbar",
		"aria-label": "Slide tools",
		"data-size": te,
		className: r("flex min-w-0 flex-1 flex-nowrap items-center gap-1", b),
		"data-testid": x,
		children: [
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: O || !o,
				onClick: () => n(),
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-new-slide`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1",
					children: [/* @__PURE__ */ W(h, { size: 12 }), "New slide"]
				})
			}),
			D("layout") && k && e && /* @__PURE__ */ W(E, {
				trigger: /* @__PURE__ */ W(wt, {
					label: "Layout",
					value: Z[e.layout]
				}),
				triggerLabel: `Layout: ${Z[e.layout]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-layout`,
				sections: [k],
				"data-testid": `${x}-layout-menu`
			}),
			D("insert") && j && /* @__PURE__ */ W(E, {
				trigger: /* @__PURE__ */ W(wt, { label: "Insert" }),
				triggerLabel: "Insert a slide",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-insert`,
				sections: [j],
				"data-testid": `${x}-insert-menu`
			}),
			D("theme") && M && /* @__PURE__ */ W(E, {
				trigger: /* @__PURE__ */ W(wt, {
					label: "Theme",
					value: ht[t]
				}),
				triggerLabel: `Theme: ${ht[t]}`,
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-theme`,
				sections: [M],
				"data-testid": `${x}-theme-menu`
			}),
			D("chart") && N && u && /* @__PURE__ */ W(a, {
				density: "compact",
				children: /* @__PURE__ */ W(ne, {
					value: N.kind,
					onChange: (e) => u(e),
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
			(d || f) && /* @__PURE__ */ G(U, { children: [
				/* @__PURE__ */ W(Ct, {}),
				d && /* @__PURE__ */ W(m, {
					"aria-label": "Undo",
					title: "Undo (⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(xt, {}),
					disabled: O || !p,
					onClick: d,
					"data-testid": `${x}-undo`
				}),
				f && /* @__PURE__ */ W(m, {
					"aria-label": "Redo",
					title: "Redo (⇧⌘Z)",
					variant: "ghost",
					size: "sm",
					icon: /* @__PURE__ */ W(xt, { redo: !0 }),
					disabled: O || !g,
					onClick: f,
					"data-testid": `${x}-redo`
				})
			] }),
			I.length > 0 && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(Ct, {}), /* @__PURE__ */ W(E, {
				trigger: /* @__PURE__ */ W("span", {
					className: "text-[14px] leading-none",
					"aria-hidden": "true",
					children: "⋯"
				}),
				triggerLabel: "More slide tools",
				triggerTitle: "More slide tools",
				triggerClassName: "shrink-0 border-transparent",
				triggerTestId: `${x}-more`,
				sections: I,
				"data-testid": `${x}-more-menu`
			})] }),
			D("note") && /* @__PURE__ */ W(s, {
				as: "span",
				className: "ml-1 shrink-0 whitespace-nowrap text-xs text-text-tertiary",
				title: bt,
				"data-testid": `${x}-style-note`,
				children: yt
			}),
			/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1",
				"aria-hidden": "true"
			}),
			v,
			_ && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: _,
				className: "shrink-0 whitespace-nowrap",
				"data-testid": `${x}-present`,
				children: /* @__PURE__ */ G("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ W(St, {}), "Present"]
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/SpeakerNotes.tsx
function Et({ value: e, onChange: t, readOnly: n = !1, maxLength: i = Fe, placeholder: a = "Add what to say while this slide is up. Notes go into the .pptx notes pane, not onto the slide.", className: o, "data-testid": c = "speaker-notes" }) {
	let l = ue(), u = ue(), d = e?.length ?? 0, f = d >= i * .9;
	return /* @__PURE__ */ G("section", {
		"data-ui-part": "",
		"aria-labelledby": l,
		className: r("flex flex-col gap-1 rounded-lg border border-border bg-surface px-3 py-2", o),
		"data-testid": `${c}-pane`,
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ W(s, {
				as: "span",
				id: l,
				className: "text-[12px] font-semibold text-text-primary",
				children: "Speaker notes"
			}), /* @__PURE__ */ W(s, {
				as: "span",
				id: u,
				className: r("text-[11px] tabular-nums", f ? "text-warning-fg" : "text-text-tertiary"),
				"data-testid": `${c}-count`,
				children: `${d} / ${i}`
			})]
		}), /* @__PURE__ */ W(O, {
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
			"data-testid": c
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/PresentationEditor.tsx
function Dt({ testIdPrefix: e }) {
	return /* @__PURE__ */ W(j, {
		tone: "warning",
		"data-testid": `${e}-agent-unavailable`,
		children: "The agent box needs the rich-text composer (the optional @tiptap peers). Edit the slide by hand below."
	});
}
var Ot = le(() => import("./PresentationAgentComposer-6d57ETe_.js").catch(() => ({ default: Dt })));
function kt({ back: e }) {
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
function At(e, t) {
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
function jt({ spec: e, onChange: t, preview: n, onRequestPreview: o, onSaveRevision: c, revisions: l, activeRevisionId: u, onSelectRevision: d, olderRevisions: f, sources: p, onSearchSources: h, onDownload: g, onOpenPresentationView: _, readOnly: v = !1, onInstruct: b, instructHints: w, onUndoInstruct: E, generatingSlideIds: ne, slideViewers: re, selectSlideRequest: O, footer: A, renderFrame: M, onSelectedSlideChange: N, className: P, "data-testid": F = "presentation-editor" }) {
	let [I, L] = H(() => e.slides[0]?.id ?? ""), [ie, le] = H(!1), [ue, de] = H(null), fe = !!b, [pe, me] = H("slide"), [he, ge] = H(!1), [_e, ve] = H(null), [K, q] = H(null), [Te, Ee] = H(() => /* @__PURE__ */ new Set()), { edit: Y, undo: De, redo: Oe, canUndo: ke, canRedo: Ae } = At(e, t), [je, Me] = H([]);
	z(() => {
		typeof n == "object" && "slides" in n && Me(n.slides);
	}, [n]);
	let Ne = V(o);
	Ne.current = o;
	let X = e.slides, Pe = B(() => new Set(He(e)), [e]), Fe = Pe.size === 0;
	z(() => {
		Fe && Ne.current(e);
	}, [e, Fe]);
	let Ie = typeof n == "object" && "slides" in n ? n.slides : je, Le = B(() => new Map(Ie.map((e) => [e.id, e.svg])), [Ie]), Re = B(() => {
		let e = new Set(X.map((e) => e.id));
		return Ie.filter((t) => t.generated && !e.has(t.id)).map((e, t) => ({
			id: e.id,
			title: e.title || `Generated slide ${t + 1}`,
			svg: e.svg
		}));
	}, [Ie, X]), ze = X.length + Re.length, Be = X.findIndex((e) => e.id === I), Ve = Be === -1 ? Re.findIndex((e) => e.id === I) : -1, Z = Be === -1 ? Ve === -1 ? 0 : X.length + Ve : Be, Q = Be !== -1 || Ve === -1 ? X[Z] : void 0, $ = Ve === -1 ? void 0 : Re[Ve], Ue = Q?.id ?? $?.id, We = Q ? Q.title || "Untitled slide" : $?.title, Qe = B(() => [...X.map((e) => e.id), ...Re.map((e) => e.id)], [X, Re]), $e = Math.min(Z, X.length - 1), et = V(N);
	et.current = N, z(() => {
		Ue && et.current?.(Ue, Z);
	}, [Ue, Z]);
	let tt = B(() => {
		let e = new Set(ne ?? []);
		return he && pe === "slide" && Q && e.add(Q.id), [...e];
	}, [
		ne,
		he,
		pe,
		Q
	]), nt = !!Q && tt.includes(Q.id), rt = X.map((e) => ({
		slide: e,
		thumbnailSvg: Le.get(e.id),
		uncited: Pe.has(e.id),
		changed: Te.has(e.id)
	})), it = R((e) => {
		L(e);
	}, []), ot = O?.key, ct = O?.slideId;
	z(() => {
		ct && e.slides.some((e) => e.id === ct) && L(ct);
	}, [ot, ct]);
	let lt = R((t, n) => {
		Y(qe(e, t, n));
	}, [Y, e]), ut = R((t) => {
		let n = Je(e, $e, t);
		n !== e && (Y(n), L(n.slides[$e + 1].id));
	}, [
		Y,
		e,
		$e
	]), ft = R((t) => {
		let n = Ye(e, t);
		if (n === e) return;
		let r = n.slides.findIndex((e) => e.id === t);
		Y(n), L(n.slides[r + 1].id);
	}, [Y, e]), mt = R((t) => {
		let n = e.slides.findIndex((e) => e.id === t), r = Xe(e, t);
		r !== e && (Y(r), L(r.slides[Math.min(n, r.slides.length - 1)].id));
	}, [Y, e]), ht = R((t) => Y(Ke(e, t)), [Y, e]), gt = R(async (e) => {
		if (!b || he) return !1;
		let t = Q?.id;
		ge(!0), q(null);
		try {
			let n = await b(e, pe === "slide" && t ? {
				slideId: t,
				scope: pe
			} : { scope: "deck" }), r = n?.changedSlideIds ?? [];
			return Ee(new Set(r)), ve(n?.summary?.trim() || "Done."), pe === "deck" && r.length && (!t || !r.includes(t)) && L(r[0]), !0;
		} catch (e) {
			return q(e instanceof Error ? e.message : "The agent could not make that change."), !1;
		} finally {
			ge(!1);
		}
	}, [
		b,
		he,
		pe,
		Q?.id
	]), _t = R(() => {
		E?.(), ve(null), Ee(/* @__PURE__ */ new Set());
	}, [E]), vt = Pe.size, yt = !v && X.length > 0 && vt === 0 && !ie, bt = R(() => {
		yt && (le(!0), de(null), Promise.resolve(c(e)).catch((e) => {
			de(e instanceof Error ? e.message : "The revision could not be saved.");
		}).finally(() => le(!1)));
	}, [
		yt,
		c,
		e
	]), xt = R((e) => {
		let t = Qe[Z + e];
		t && L(t);
	}, [Qe, Z]);
	if (z(() => {
		if (v) return;
		let e = (e) => {
			let t = e.metaKey || e.ctrlKey;
			if (t && e.key.toLowerCase() === "s") {
				e.preventDefault(), bt();
				return;
			}
			if (t && e.key.toLowerCase() === "z" && !xe(e.target)) {
				e.preventDefault(), e.shiftKey ? Oe() : De();
				return;
			}
			let n = Se(e);
			if (!n) return;
			e.preventDefault();
			let r = Ce(n, Z + 1, ze);
			r !== Z + 1 && xt(r - (Z + 1));
		};
		return window.addEventListener("keydown", e), () => window.removeEventListener("keydown", e);
	}, [
		v,
		bt,
		De,
		Oe,
		xt,
		Z,
		ze
	]), v) {
		let t = (l.length > 0 ? l : [{
			id: u,
			label: "v1"
		}]).map((e) => ({
			id: e.id,
			label: e.label,
			...e.createdAt ? { createdAt: e.createdAt } : {},
			slides: e.id === u ? [...X.map((e, t) => {
				let n = J(Le.get(e.id));
				return {
					id: e.id,
					index: t + 1,
					title: e.title || "Untitled slide",
					...n ? { preview: /* @__PURE__ */ W("img", {
						src: n,
						alt: e.title || `Slide ${t + 1}`
					}) } : {}
				};
			}), ...Re.map((e, t) => {
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
		return /* @__PURE__ */ W(we, {
			title: e.title,
			revisions: t,
			revisionId: u,
			onRevisionChange: d,
			slideIndex: Z + 1,
			onSlideChange: (e) => {
				let t = Qe[e - 1];
				t && L(t);
			},
			...g ? { onDownload: g } : {},
			className: P,
			"data-testid": `${F}-readonly`
		});
	}
	let St = (() => {
		if ($) {
			let e = J($.svg);
			return e ? /* @__PURE__ */ W("img", {
				src: e,
				alt: $.title,
				className: "h-full w-full object-contain",
				"data-testid": `${F}-stage-image`
			}) : /* @__PURE__ */ W(s, {
				className: "text-[13px] text-text-tertiary",
				"data-testid": `${F}-no-preview`,
				children: "This slide has not been rendered yet."
			});
		}
		if (Q && Pe.has(Q.id)) return /* @__PURE__ */ W(a, {
			density: "compact",
			children: /* @__PURE__ */ W(T, {
				title: "Add a source to preview this slide",
				description: "A slide renders once it cites the document or transcript it draws from. Pick one under Sources used.",
				testId: `${F}-preview-needs-source`
			})
		});
		let t = Q ? J(Le.get(Q.id)) : void 0;
		if (!Fe && !t) return /* @__PURE__ */ W(a, {
			density: "compact",
			children: /* @__PURE__ */ W(T, {
				title: "The preview waits for every slide's source",
				description: "The deck renders as a whole, so it draws once each slide cites what it draws from.",
				testId: `${F}-preview-needs-source`
			})
		});
		if (n === "loading" && Le.size === 0) return /* @__PURE__ */ W(te, {
			label: "Rendering the deck…",
			testId: `${F}-preview-loading`
		});
		if (Fe && typeof n == "object" && "error" in n) return /* @__PURE__ */ W(ee, {
			title: "This deck could not be rendered",
			description: n.error,
			actionLabel: "Try again",
			onAction: () => o(e),
			testId: `${F}-preview-error`
		});
		let r = t;
		return r ? /* @__PURE__ */ W("img", {
			src: r,
			alt: Q.title || `Slide ${Z + 1}`,
			className: "h-full w-full object-contain",
			"data-testid": `${F}-stage-image`
		}) : /* @__PURE__ */ W(s, {
			className: "text-[13px] text-text-tertiary",
			"data-testid": `${F}-no-preview`,
			children: "This slide has not been rendered yet."
		});
	})(), Ct = l.map((e) => ({
		id: e.id,
		label: e.label
	})), wt = /* @__PURE__ */ G("div", {
		className: "flex flex-wrap items-center gap-2",
		"data-testid": `${F}-revision-controls`,
		children: [
			Ct.length > 5 || (f?.count ?? 0) > 0 ? /* @__PURE__ */ W(S, {
				size: "sm",
				"aria-label": "Revision",
				value: u,
				onChange: (e) => be(e.target.value, d, f),
				options: ye(Ct, f),
				className: "w-auto",
				"data-testid": `${F}-revision-select`
			}) : Ct.length > 0 && /* @__PURE__ */ W(D, {
				items: Ct,
				value: u,
				onValueChange: d,
				variant: "segmented",
				size: "sm",
				"aria-label": "Revision",
				idPrefix: `${F}-revisions`
			}),
			/* @__PURE__ */ W(i, {
				variant: "primary",
				size: "sm",
				disabled: !yt,
				onClick: bt,
				"data-testid": `${F}-save`,
				children: ie ? "Saving…" : `Save as ${Ze(l)}`
			}),
			g && /* @__PURE__ */ W(i, {
				variant: "secondary",
				size: "sm",
				onClick: g,
				"data-testid": `${F}-download`,
				children: "Download .pptx"
			})
		]
	}), Dt = fe || M ? /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-1 flex-wrap items-center gap-1.5",
		children: [/* @__PURE__ */ W(ae, {
			value: e.title,
			required: !0,
			label: "Deck title",
			maxLength: 120,
			onCommit: (t) => Y({
				...e,
				title: t
			}),
			"data-testid": `${F}-deck-title`
		}), /* @__PURE__ */ W(ae, {
			value: e.subtitle ?? "",
			label: "Subtitle",
			placeholder: "Add a subtitle",
			tone: "muted",
			maxLength: 200,
			onCommit: (t) => Y({
				...e,
				subtitle: t || void 0
			}),
			"data-testid": `${F}-deck-subtitle`
		})]
	}) : /* @__PURE__ */ G("div", {
		className: "grid min-w-0 flex-1 grid-cols-1 gap-2 sm:grid-cols-2",
		children: [/* @__PURE__ */ W(C, {
			label: "Deck title",
			required: !0,
			children: (t) => /* @__PURE__ */ W(x, {
				...t,
				value: e.title,
				maxLength: 120,
				onChange: (t) => Y({
					...e,
					title: t.target.value
				}),
				"data-testid": `${F}-deck-title`
			})
		}), /* @__PURE__ */ W(C, {
			label: "Subtitle",
			children: (t) => /* @__PURE__ */ W(x, {
				...t,
				value: e.subtitle ?? "",
				maxLength: 200,
				onChange: (t) => Y({
					...e,
					subtitle: t.target.value || void 0
				}),
				"data-testid": `${F}-deck-subtitle`
			})
		})]
	}), jt = _ ? () => _(Ue ? {
		slideId: Ue,
		slideIndex: Z + 1
	} : void 0) : void 0, Mt = /* @__PURE__ */ W(Tt, {
		slide: Q,
		theme: e.theme ?? "product",
		onAddSlide: ut,
		canAddSlide: X.length < 40,
		onLayoutChange: (t) => {
			Q && Y(Ke(e, Ge(Q, t)));
		},
		onThemeChange: (t) => Y({
			...e,
			theme: t
		}),
		onChartKindChange: (t) => {
			Q?.chart && Y(Ke(e, {
				...Q,
				chart: {
					...Q.chart,
					kind: t
				}
			}));
		},
		onUndo: De,
		onRedo: Oe,
		canUndo: ke,
		canRedo: Ae,
		...jt ? { onPresent: jt } : {},
		testIdPrefix: `${F}-toolbar`
	}), Nt = /* @__PURE__ */ G(U, { children: [vt > 0 && /* @__PURE__ */ W(j, {
		tone: "warning",
		"data-testid": `${F}-uncited-warning`,
		children: vt === 1 ? "1 slide cites no source. Every slide names at least one — Save is off until it does." : `${vt} slides cite no source. Every slide names at least one — Save is off until they do.`
	}), ue && /* @__PURE__ */ W(j, {
		tone: "error",
		onDismiss: () => de(null),
		"data-testid": `${F}-save-error`,
		children: ue
	})] }), Pt = fe && /* @__PURE__ */ G(U, { children: [K && /* @__PURE__ */ W(j, {
		tone: "error",
		onDismiss: () => q(null),
		"data-testid": `${F}-agent-error`,
		children: K
	}), _e && !K && /* @__PURE__ */ G("div", {
		className: "flex min-w-0 flex-wrap items-start gap-2",
		role: "status",
		"data-testid": `${F}-agent-summary`,
		children: [
			/* @__PURE__ */ W(s, {
				as: "span",
				className: "min-w-0 flex-1 whitespace-normal break-words text-[12px] text-success-fg",
				children: `✓ ${_e}`
			}),
			Te.size > 0 && /* @__PURE__ */ W(s, {
				as: "span",
				className: "text-[11px] text-text-tertiary",
				children: Te.size === 1 ? "1 slide marked in the filmstrip" : `${Te.size} slides marked in the filmstrip`
			}),
			E && /* @__PURE__ */ W(i, {
				variant: "ghost",
				size: "sm",
				onClick: _t,
				"data-testid": `${F}-agent-undo`,
				children: "Undo"
			})
		]
	})] }), Ft = fe && Q && /* @__PURE__ */ W(ce, {
		fallback: /* @__PURE__ */ W(s, {
			className: "text-[12px] text-text-tertiary",
			"data-testid": `${F}-agent-loading`,
			children: "Loading the agent…"
		}),
		children: /* @__PURE__ */ W(Ot, {
			scope: pe,
			onScopeChange: me,
			slideLabel: `slide ${Z + 1}`,
			busy: he,
			onSubmit: gt,
			...w?.length ? { suggestions: w } : {},
			testIdPrefix: F
		})
	}), It = {
		selectedSlide: Q,
		...$ ? { selectedGeneratedSlide: $ } : {},
		selectedIndex: Z,
		slideCount: ze,
		selectSlide: it,
		markChanged: (e) => Ee(new Set(e))
	}, Lt = typeof A == "function" ? A(It) : A, Rt = Lt != null && Lt !== !1 ? Lt : Ft ? /* @__PURE__ */ W(oe, {
		maxWidth: "4xl",
		label: "Deck agent",
		composer: /* @__PURE__ */ G("div", {
			className: "flex flex-col gap-1.5 rounded-lg border border-border bg-surface p-2",
			"data-testid": `${F}-dock-card`,
			children: [Pt, Ft]
		}),
		"data-testid": `${F}-dock`
	}) : null, zt = Q && /* @__PURE__ */ W(U, { children: fe ? /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(st, {
		compact: !0,
		sources: Q.sources,
		onChange: (e) => ht({
			...Q,
			sources: e
		}),
		options: p,
		onSearchSources: h,
		testIdPrefix: `${F}-slide`
	}), /* @__PURE__ */ W(y, {
		summary: "Edit slide details",
		density: "compact",
		"data-testid": `${F}-details`,
		children: /* @__PURE__ */ W(dt, {
			slide: Q,
			onChange: ht,
			sources: p,
			onSearchSources: h,
			showSources: !1,
			showNotes: !1,
			testIdPrefix: `${F}-slide`
		})
	})] }) : /* @__PURE__ */ W(dt, {
		slide: Q,
		onChange: ht,
		sources: p,
		onSearchSources: h,
		showNotes: !1,
		testIdPrefix: `${F}-slide`
	}) }), Bt = /* @__PURE__ */ G("div", {
		className: r("flex items-center justify-center gap-2", M && "ml-auto shrink-0"),
		"data-testid": `${F}-slide-nav`,
		children: [
			/* @__PURE__ */ W(m, {
				"aria-label": "Previous slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(kt, { back: !0 }),
				disabled: Z <= 0,
				onClick: () => xt(-1),
				"data-testid": `${F}-previous`
			}),
			/* @__PURE__ */ W(s, {
				className: "text-[13px] text-text-secondary",
				"data-testid": `${F}-position`,
				children: `Slide ${ze === 0 ? 0 : Z + 1} of ${ze}`
			}),
			/* @__PURE__ */ W(m, {
				"aria-label": "Next slide",
				variant: "ghost",
				size: "sm",
				icon: /* @__PURE__ */ W(kt, {}),
				disabled: Z >= ze - 1,
				onClick: () => xt(1),
				"data-testid": `${F}-next`
			}),
			/* @__PURE__ */ W(k, {
				value: X.length / 40,
				segments: 10,
				showPercent: !1,
				tone: "surface",
				note: `${X.length} / 40`,
				className: "ml-2",
				"data-testid": `${F}-slide-meter`
			})
		]
	}), Vt = /* @__PURE__ */ G("div", {
		className: "flex min-h-0 flex-1 flex-col gap-4 md:flex-row",
		"data-testid": `${F}-body`,
		children: [/* @__PURE__ */ W(at, {
			items: rt,
			selectedId: Q?.id ?? "",
			onSelect: it,
			onMove: lt,
			onDuplicate: ft,
			onDelete: mt,
			onAdd: () => ut(),
			canAdd: X.length < 40,
			generatingSlideIds: tt,
			generatedItems: Re.map((e) => ({
				id: e.id,
				title: e.title,
				...e.svg ? { thumbnailSvg: e.svg } : {}
			})),
			...re ? { slideViewers: re } : {},
			className: "md:min-h-0 md:w-44 md:shrink-0 md:overflow-y-auto",
			testIdPrefix: `${F}-slide`
		}), /* @__PURE__ */ G("div", {
			className: "flex min-w-0 flex-1 flex-col gap-3 md:min-h-0 md:overflow-y-auto md:[container-type:size]",
			"data-testid": `${F}-main`,
			children: [
				/* @__PURE__ */ W("div", {
					className: "mx-auto w-full shrink-0 md:max-w-[max(20rem,calc(100cqh*16/9))]",
					"data-testid": `${F}-stage-frame`,
					children: /* @__PURE__ */ W(pt, {
						generating: nt,
						label: We ? `Slide ${Z + 1} of ${ze}: ${We}` : "No slide",
						"data-testid": `${F}-stage`,
						children: St
					})
				}),
				!M && Bt,
				$ && /* @__PURE__ */ W(s, {
					className: "mx-auto w-full max-w-4xl text-[12px] text-text-tertiary",
					"data-testid": `${F}-generated-note`,
					children: `${$.title} is built from the slides' citations and changes as they do. It has no fields of its own to edit.`
				}),
				Q && /* @__PURE__ */ G("div", {
					className: "mx-auto flex w-full max-w-4xl flex-col gap-3",
					children: [/* @__PURE__ */ W(Et, {
						value: Q.notes,
						onChange: (e) => ht({
							...Q,
							notes: e
						}),
						"data-testid": `${F}-slide-notes`
					}), zt]
				})
			]
		})]
	}), Ht = (e) => {
		e.key === "Enter" && e.target.tagName === "INPUT" && e.preventDefault();
	};
	if (M) {
		let e = /* @__PURE__ */ G("div", {
			className: r("flex min-h-0 flex-col gap-1.5 px-4 pb-2 pt-1.5 md:h-full md:min-h-[14rem]", P),
			"data-testid": F,
			onKeyDown: Ht,
			children: [
				/* @__PURE__ */ G("div", {
					className: "flex shrink-0 flex-wrap items-center gap-2",
					"data-testid": `${F}-deck-line`,
					children: [Dt, Bt]
				}),
				Nt,
				Vt
			]
		});
		return /* @__PURE__ */ W(U, { children: M({
			toolbar: Mt,
			actions: wt,
			surface: e,
			footer: Rt
		}) });
	}
	return /* @__PURE__ */ G("div", {
		className: r("relative flex h-full min-h-0 flex-col", P),
		"data-testid": F,
		onKeyDown: Ht,
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex shrink-0 flex-col gap-3 px-4 pt-4",
				children: [/* @__PURE__ */ G("div", {
					className: r("flex flex-wrap justify-between gap-2", fe ? "items-center" : "items-end"),
					...fe ? { "data-testid": `${F}-deck-line` } : {},
					children: [Dt, wt]
				}), /* @__PURE__ */ W("div", {
					className: "rounded-lg border border-border bg-surface px-2 py-1.5",
					children: Mt
				})]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 pt-3 pb-4",
				"data-testid": `${F}-scroller`,
				children: [Nt, Vt]
			}),
			/* @__PURE__ */ W("div", {
				className: "flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
				"data-testid": `${F}-dock-row`,
				children: /* @__PURE__ */ W(se.Provider, {
					value: "pinned",
					children: Rt
				})
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/ProposedEditStrip.tsx
var Mt = {
	"&amp;": "&",
	"&lt;": "<",
	"&gt;": ">",
	"&quot;": "\"",
	"&#39;": "'",
	"&nbsp;": " "
};
function Nt(e) {
	return e.text == null ? e.html ? e.html.replace(/<\s*(br|\/p|\/li|\/h[1-6]|\/div)\s*\/?>/gi, "\n").replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (e) => Mt[e] ?? e).replace(/\n{3,}/g, "\n\n").trim() : "" : e.text;
}
function Pt(e) {
	return e.kind === "replace" ? e.anchor === "cursor" ? "Replace at cursor" : "Replace selection" : e.anchor === "cursor" ? "Insert at cursor" : "Insert";
}
function Ft({ edit: e, onApply: t, onDiscard: n, onRevise: r, testId: a }) {
	let [s, c] = H(!1), [l, u] = H(""), d = Nt(e.content), f = e.status === "streaming", p = e.status === "applying", m = e.status === "applied";
	return /* @__PURE__ */ G("li", {
		className: "flex min-w-0 flex-col gap-1.5 py-2 first:pt-0 last:pb-0",
		"data-status": e.status,
		"data-proposal-id": e.id,
		"data-testid": `${a}-item`,
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [
					/* @__PURE__ */ W(o, {
						size: "xs",
						tone: "info",
						"data-testid": `${a}-placement`,
						children: Pt(e)
					}),
					e.summary && /* @__PURE__ */ W("span", {
						className: "min-w-0 flex-1 truncate text-[13px] text-text-primary",
						"data-testid": `${a}-summary`,
						children: e.summary
					}),
					!e.summary && /* @__PURE__ */ W("span", { className: "flex-1" }),
					f && /* @__PURE__ */ G("span", {
						className: "flex shrink-0 items-center gap-1.5 text-[12px] text-text-tertiary",
						role: "status",
						"data-testid": `${a}-streaming`,
						children: [/* @__PURE__ */ W(M, {
							size: "sm",
							className: "text-primary"
						}), "Drafting…"]
					}),
					m && /* @__PURE__ */ W(o, {
						size: "xs",
						tone: "success",
						"data-testid": `${a}-applied`,
						children: "Applied"
					}),
					!m && /* @__PURE__ */ G("span", {
						className: "flex shrink-0 items-center gap-1",
						children: [
							r && e.status === "ready" && /* @__PURE__ */ W(i, {
								size: "sm",
								variant: "ghost",
								"aria-expanded": s,
								onClick: () => c((e) => !e),
								"data-testid": `${a}-revise`,
								children: "Revise…"
							}),
							/* @__PURE__ */ W(i, {
								size: "sm",
								variant: "ghost",
								disabled: p,
								onClick: () => n(e.id),
								"data-testid": `${a}-discard`,
								children: f ? "Cancel" : "Discard"
							}),
							/* @__PURE__ */ W(i, {
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
			d && /* @__PURE__ */ W("p", {
				className: "m-0 line-clamp-3 whitespace-pre-wrap break-words text-[13px] leading-5 text-text-secondary",
				"data-testid": `${a}-preview`,
				children: d
			}),
			s && r && /* @__PURE__ */ G("form", {
				className: "flex min-w-0 items-center gap-2",
				onSubmit: (t) => {
					t.preventDefault();
					let n = l.trim();
					!n || !r || (r(e.id, n), u(""), c(!1));
				},
				"data-testid": `${a}-revise-form`,
				children: [/* @__PURE__ */ W(x, {
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
				}), /* @__PURE__ */ W(i, {
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
function It({ proposals: e, onApply: t, onDiscard: n, onRevise: a, onApplyAll: o, onDiscardAll: s, title: c, className: l, "data-testid": u = "proposed-edit-strip" }) {
	let d = e.filter((e) => e.status !== "discarded");
	if (d.length === 0) return null;
	let f = d.filter((e) => e.status === "ready").length, p = d.filter((e) => e.status === "ready" || e.status === "streaming").length, m = c ?? (d.length === 1 ? "Proposed edit" : `${d.length} proposed edits`);
	return /* @__PURE__ */ G("section", {
		"data-ui-part": "",
		"aria-label": m,
		"aria-live": "polite",
		className: r("flex min-w-0 flex-col gap-2 rounded-md border border-border border-l-[3px] border-l-primary bg-surface px-3 py-2 shadow-sm", l),
		"data-testid": u,
		children: [/* @__PURE__ */ G("div", {
			className: "flex min-w-0 items-center gap-2",
			children: [
				/* @__PURE__ */ W("span", {
					className: "min-w-0 flex-1 truncate text-[13px] font-semibold text-text-primary",
					"data-testid": `${u}-title`,
					children: m
				}),
				s && p > 1 && /* @__PURE__ */ W(i, {
					size: "sm",
					variant: "ghost",
					onClick: s,
					"data-testid": `${u}-discard-all`,
					children: "Discard all"
				}),
				o && f > 1 && /* @__PURE__ */ W(i, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					"data-testid": `${u}-apply-all`,
					children: "Apply all"
				})
			]
		}), /* @__PURE__ */ W("ul", {
			className: "m-0 flex min-w-0 list-none flex-col divide-y divide-border p-0",
			children: d.map((e) => /* @__PURE__ */ W(Ft, {
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
export { Je as A, Ge as B, Ae as C, Be as D, Ne as E, Ze as F, ve as G, Oe as H, Ue as I, ye as K, Xe as L, Ye as M, We as N, Ve as O, qe as P, Ke as R, Re as S, X as T, J as U, ke as V, we as W, Me as _, Et as a, Pe as b, Tt as c, dt as d, st as f, je as g, Q as h, jt as i, $ as j, Z as k, _t as l, it as m, Pt as n, gt as o, at as p, _e as q, Nt as r, mt as s, It as t, pt as u, Ie as v, ze as w, Fe as x, Le as y, He as z };
