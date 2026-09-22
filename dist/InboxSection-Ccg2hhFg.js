import { n as e, r as t, t as n } from "./useDocumentTypes-BUXMPyPU.js";
import { t as r } from "./cn-DhjIN-s0.js";
import { o as i } from "./Text-DIl-Ssia.js";
import { t as a } from "./Chip-BENLwTlq.js";
import { t as o } from "./Modal-CyoyiNKN.js";
import { t as s } from "./EmptyState-JzzL2z1E.js";
import { t as c } from "./Input-DLknWXri.js";
import { t as l } from "./Textarea-Dz4doxTv.js";
import { G as ee, U as u } from "./renderers-9QJtVt3f.js";
import { Component as d, useEffect as f, useId as p, useMemo as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/components/doc-editor/NewDocumentModal.tsx
var te = [
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
	}
];
function ne(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || e.description.toLowerCase().includes(n) || e.keywords.some((e) => e.includes(n));
}
function re(e, t) {
	let n = t.trim().toLowerCase();
	return !n || e.name.toLowerCase().includes(n) || (e.description ?? "").toLowerCase().includes(n);
}
function ie(t) {
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
function b({ open: e, onClose: s, onCreate: d }) {
	let [_, b] = g([]), [x, S] = g(!1), [C, w] = g(null), [T, E] = g(null), [D, O] = g(""), [k, A] = g(""), [j, M] = g(!1), [N, P] = g(""), [F, I] = g("page"), L = h(null), R = h(null), z = p(), B = `${z}-blank-label`, V = `${z}-type-label`, H = `${z}-cookbook-label`, U = `${z}-title`, W = `${z}-description`;
	f(() => {
		if (!e) return;
		let r = n();
		b(r), w(null), E(null), O(""), A(""), M(!1), P(""), I("page");
		let i = !1;
		S(!0), t().then((e) => {
			if (i) return;
			let t = e.ok ? e.types : e.cached;
			b(t), w((e) => e && t.some((t) => t.id === e) ? e : null);
		}).finally(() => {
			i || S(!1);
		});
		let a = setTimeout(() => L.current?.focus(), 50);
		return () => {
			i = !0, clearTimeout(a);
		};
	}, [e]);
	let G = m(() => te.filter((e) => ne(e, D)), [D]), K = m(() => _.filter((e) => re(e, D)), [_, D]), q = m(() => u.filter((e) => ee(e, D)), [D]);
	if (!e) return null;
	let J = _.find((e) => e.id === C), Y = T ? u.find((e) => e.id === T) : void 0, X = F === "sections", ae = !!Y || !!J, Z = _.length === 0 && !x && !Y, oe = G.length === 0 && K.length === 0 && q.length === 0, se = Y ? {
		kind: "cookbook",
		cookbook: Y
	} : J && F !== "diagram" ? {
		kind: "type",
		type: J
	} : {
		kind: "blank",
		shape: F
	}, Q = (e) => {
		if (e.kind === "cookbook") {
			E(e.cookbook.id), F === "diagram" && I("page"), j || A(e.cookbook.name);
			return;
		}
		if (e.kind === "blank") {
			I(e.shape), e.shape === "diagram" && (E(null), j || A(""));
			return;
		}
		E(null), w(e.type.id), j || A("");
	}, ce = (e) => e.kind === "blank" ? e.shape : F === "diagram" ? "page" : F, le = (e, t, n) => {
		let r = t.trim();
		if (!r) return;
		let i = N.trim() || void 0;
		if (e.kind === "cookbook") {
			let t = ie(e.cookbook);
			d({
				title: r,
				type: t.name,
				description: i,
				icon: t.icon,
				documentTypeId: t.id,
				shape: n
			});
		} else e.kind === "type" && n !== "diagram" ? d({
			title: r,
			type: e.type.name,
			description: i,
			icon: e.type.icon,
			documentTypeId: e.type.id,
			shape: n
		}) : d({
			title: r,
			type: n === "diagram" ? "Diagram" : "Document",
			description: i,
			icon: n === "diagram" ? "🖉" : "📄",
			shape: n
		});
		s();
	}, $ = !!k.trim() && (!X || ae), ue = () => {
		$ && le(se, k, ce(se));
	};
	return /* @__PURE__ */ v(o, {
		open: e,
		onClose: s,
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
		children: /* @__PURE__ */ y("div", {
			onKeyDown: (e) => {
				e.key === "Enter" && !e.shiftKey && $ && ue();
			},
			className: "contents",
			children: [
				/* @__PURE__ */ v("h2", {
					className: r("m-0 px-6 pt-6 pb-2 text-lg font-bold text-text-primary shrink-0"),
					children: "Create New Document"
				}),
				/* @__PURE__ */ y("div", {
					className: r("px-6 pb-3 shrink-0"),
					children: [/* @__PURE__ */ v(c, {
						ref: L,
						type: "search",
						"data-testid": "new-doc-search",
						"aria-label": "Search document types",
						placeholder: "What are you writing? Try “retro”, “bug”, “invoice”…",
						value: D,
						onChange: (e) => O(e.target.value),
						onKeyDown: (e) => {
							if (e.key !== "Enter" || e.shiftKey) return;
							e.preventDefault(), e.stopPropagation();
							let t = q.length > 0 && D.trim() ? {
								kind: "cookbook",
								cookbook: q[0]
							} : G.length > 0 ? {
								kind: "blank",
								shape: G[0].id
							} : K.length > 0 ? {
								kind: "type",
								type: K[0]
							} : void 0;
							if (!t) return;
							Q(t);
							let n = k.trim() || (t.kind === "cookbook" ? t.cookbook.name : "");
							if (!n) {
								R.current?.focus();
								return;
							}
							le(t, n, ce(t));
						}
					}), /* @__PURE__ */ v("div", {
						className: r("mt-1.5 text-[11px] text-text-tertiary"),
						children: "Start from a ready-made type — Enter takes the first match. Everything in it stays editable afterwards."
					})]
				}),
				/* @__PURE__ */ y("div", {
					className: r("flex-1 overflow-y-auto px-6 min-h-0"),
					"data-testid": "new-doc-starters",
					children: [
						G.length > 0 && /* @__PURE__ */ y("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ v("div", {
								id: B,
								className: r("block text-[13px] font-semibold text-text-secondary mb-2"),
								children: "Shape"
							}), /* @__PURE__ */ v("div", {
								role: "group",
								"aria-labelledby": B,
								className: r("grid grid-cols-3 gap-2"),
								children: G.map((e) => /* @__PURE__ */ y(i, {
									padding: "md",
									selected: F === e.id,
									onSelect: () => Q({
										kind: "blank",
										shape: e.id
									}),
									"data-testid": `doc-shape-${e.id}`,
									children: [/* @__PURE__ */ y("div", {
										className: r("flex items-center gap-2"),
										children: [
											/* @__PURE__ */ v("span", {
												className: r("text-xl shrink-0"),
												"aria-hidden": "true",
												children: e.icon
											}),
											/* @__PURE__ */ v("span", {
												className: r("text-sm font-semibold text-text-primary"),
												children: e.name
											}),
											e.id === "page" && /* @__PURE__ */ v(a, {
												tone: "info",
												size: "xs",
												children: "Default"
											})
										]
									}), /* @__PURE__ */ v("div", {
										className: r("mt-1 text-[11px] leading-snug text-neutral"),
										children: e.description
									})]
								}, e.id))
							})]
						}),
						q.length > 0 && /* @__PURE__ */ y("div", {
							className: r("mb-5"),
							children: [/* @__PURE__ */ y("div", {
								className: r("mb-2"),
								children: [/* @__PURE__ */ v("div", {
									id: H,
									className: r("block text-[13px] font-semibold text-text-secondary"),
									children: "Known types"
								}), /* @__PURE__ */ v("div", {
									className: r("text-[11px] text-text-tertiary"),
									"data-testid": "starter-shape-note",
									children: F === "diagram" ? "Picking one switches to Page — a whiteboard has no document type." : F === "sections" ? "Its fields become sections, one form each." : "Its fields become blocks on the page — typed values, headings and checklists."
								})]
							}), /* @__PURE__ */ v("div", {
								role: "group",
								"aria-labelledby": H,
								className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
								children: q.map((e) => {
									let t = T === e.id;
									return /* @__PURE__ */ y(i, {
										padding: "md",
										selected: t,
										onSelect: () => Q({
											kind: "cookbook",
											cookbook: e
										}),
										"data-testid": `starter-cookbook-${e.id}`,
										children: [
											/* @__PURE__ */ y("div", {
												className: r("flex items-center gap-2"),
												children: [/* @__PURE__ */ v("span", {
													className: r("text-xl shrink-0"),
													"aria-hidden": "true",
													children: e.icon
												}), /* @__PURE__ */ v("span", {
													className: r("text-sm font-semibold text-text-primary"),
													children: e.name
												})]
											}),
											/* @__PURE__ */ v("div", {
												className: r("mt-1 text-[11px] leading-snug text-neutral line-clamp-2"),
												children: e.description
											}),
											/* @__PURE__ */ v("div", {
												className: r("mt-1 text-[11px] text-text-tertiary"),
												children: e.category
											})
										]
									}, e.id);
								})
							})]
						}),
						F !== "diagram" && (K.length > 0 || Z || _.length === 0 && x) && /* @__PURE__ */ y("div", {
							className: r("mb-5"),
							children: [
								/* @__PURE__ */ y("div", {
									className: r("mb-2 flex items-baseline gap-1.5"),
									children: [/* @__PURE__ */ v("span", {
										id: V,
										className: r("block text-[13px] font-semibold text-text-secondary"),
										children: "Your document types"
									}), !X && /* @__PURE__ */ v("span", {
										className: r("text-[13px] font-normal text-text-tertiary"),
										children: "optional"
									})]
								}),
								_.length === 0 && x && /* @__PURE__ */ v("div", {
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: "Loading document types…"
								}),
								Z && /* @__PURE__ */ v("div", {
									"data-testid": "no-document-types",
									className: r("px-3.5 py-3 border border-dashed border-border-field rounded-lg text-[13px] text-text-tertiary"),
									children: X ? "Sections come from a document type. Pick a known type above, or make a page instead — it needs no type." : "None of your own yet. Pick a known type above, or define one in ☰ → Document Types."
								}),
								K.length > 0 && /* @__PURE__ */ v("div", {
									role: "group",
									"aria-labelledby": V,
									className: r("grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2"),
									children: K.map((e) => {
										let t = !Y && C === e.id;
										return /* @__PURE__ */ y("button", {
											type: "button",
											"data-testid": `type-option-${e.id}`,
											"aria-pressed": t,
											onClick: () => Q({
												kind: "type",
												type: e
											}),
											className: r("flex items-center gap-2.5 min-h-[72px] px-3.5 py-2.5 rounded-lg cursor-pointer text-left relative font-[inherit] transition-[background,border-color] duration-[120ms]", t ? "bg-info-bg border-2 border-info" : "bg-surface border-2 border-border hover:bg-surface-panel"),
											children: [
												/* @__PURE__ */ v("span", {
													className: r("text-2xl shrink-0"),
													children: e.icon
												}),
												/* @__PURE__ */ y("div", {
													className: r("min-w-0"),
													children: [
														/* @__PURE__ */ v("div", {
															className: r("text-sm font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
															children: e.name
														}),
														e.description && /* @__PURE__ */ v("div", {
															className: r("text-[11px] text-neutral leading-tight mt-0.5 overflow-hidden line-clamp-2"),
															children: e.description
														}),
														/* @__PURE__ */ v("div", {
															className: r("text-[11px] text-text-tertiary mt-0.5"),
															children: F === "sections" ? `${e.fields.length} section${e.fields.length === 1 ? "" : "s"}` : `${e.fields.length} block${e.fields.length === 1 ? "" : "s"}`
														})
													]
												}),
												t && /* @__PURE__ */ v("span", {
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
						oe && /* @__PURE__ */ y("div", {
							"data-testid": "new-doc-no-matches",
							className: r("text-center py-8 text-[13px] text-text-tertiary"),
							children: [
								"Nothing matches “",
								D,
								"”. Clear the search to see every starting point."
							]
						})
					]
				}),
				/* @__PURE__ */ y("div", {
					className: r("shrink-0 border-t border-border px-6 pt-4 pb-3"),
					children: [/* @__PURE__ */ y("div", {
						className: r("mb-3"),
						children: [/* @__PURE__ */ y("label", {
							htmlFor: U,
							className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
							children: ["Title ", /* @__PURE__ */ v("span", {
								className: r("text-danger-fg"),
								"aria-hidden": "true",
								children: "*"
							})]
						}), /* @__PURE__ */ v(c, {
							ref: R,
							id: U,
							required: !0,
							"aria-required": "true",
							"data-testid": "new-doc-title",
							value: k,
							onChange: (e) => {
								A(e.target.value), M(!0);
							},
							placeholder: Y ? `e.g. ${Y.name}` : J ? `e.g. Q2 ${J.name}` : "Document title…"
						})]
					}), /* @__PURE__ */ y("div", { children: [/* @__PURE__ */ y("label", {
						htmlFor: W,
						className: r("block text-[13px] font-semibold text-text-secondary mb-1"),
						children: ["Description ", /* @__PURE__ */ v("span", {
							className: r("text-text-tertiary font-normal"),
							children: "(optional)"
						})]
					}), /* @__PURE__ */ v(l, {
						id: W,
						"data-testid": "new-doc-description",
						value: N,
						onChange: (e) => P(e.target.value),
						placeholder: "Brief description of this document…",
						rows: 2,
						className: r("resize-y")
					})] })]
				}),
				/* @__PURE__ */ y("div", {
					className: r("flex justify-end gap-2 px-6 py-4 border-t border-border bg-surface shrink-0"),
					children: [/* @__PURE__ */ v("button", {
						"data-testid": "new-doc-cancel",
						onClick: s,
						className: r("px-4 py-2 text-sm font-medium border border-border rounded-lg bg-surface text-text-secondary cursor-pointer font-[inherit]"),
						children: "Cancel"
					}), /* @__PURE__ */ v("button", {
						"data-testid": "new-doc-submit",
						onClick: ue,
						disabled: !$,
						className: r("px-5 py-2 text-sm font-semibold border-none rounded-lg text-white font-[inherit]", $ ? "bg-info cursor-pointer" : "bg-neutral cursor-not-allowed"),
						children: "Create Document"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/misc/ErrorBoundary.tsx
var x = class extends d {
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
		return this.state.hasError ? /* @__PURE__ */ y("div", {
			className: "bg-danger-bg border border-danger-border rounded-lg p-6 text-center font-sans",
			children: [
				/* @__PURE__ */ v("p", {
					className: "m-0 mb-2 text-[0.95rem] font-semibold text-danger-fg",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ v("p", {
					className: "m-0 mb-4 text-[0.8rem] text-danger-fg",
					children: this.state.error?.message ?? "An unexpected error occurred."
				}),
				/* @__PURE__ */ v("button", {
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
function S({ title: e, count: t, countTone: n = "neutral", hint: i, action: o, empty: c, footer: l, headingLevel: ee = 2, children: u, className: d, "data-testid": f }) {
	let m = p(), h = ee === 3 ? "h3" : "h2", g = t === 0;
	return /* @__PURE__ */ y("section", {
		"aria-labelledby": m,
		"data-testid": f,
		className: r("overflow-hidden rounded-lg border border-border bg-surface", d),
		children: [
			/* @__PURE__ */ y("div", {
				className: "flex items-center gap-2 border-b border-border bg-surface-panel px-4 py-2.5",
				children: [
					/* @__PURE__ */ v(h, {
						id: m,
						className: "m-0 text-[13px] font-semibold leading-none text-text-primary",
						children: e
					}),
					/* @__PURE__ */ v(a, {
						tone: g ? "neutral" : n,
						size: "xs",
						mono: !0,
						"aria-label": `${t} in ${e}`,
						children: String(t)
					}),
					i != null && /* @__PURE__ */ v("span", {
						className: "min-w-0 truncate text-[11px] text-text-tertiary",
						children: i
					}),
					o != null && /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("span", { className: "flex-1" }), /* @__PURE__ */ v("div", {
						className: "flex shrink-0 items-center gap-2",
						children: o
					})] })
				]
			}),
			g && c ? /* @__PURE__ */ v(s, {
				size: "sm",
				testId: c.testId ?? (f ? `${f}-empty` : "inbox-section-empty"),
				...c.icon == null ? {} : { icon: c.icon },
				title: c.title,
				...c.body ? { body: c.body } : {}
			}) : /* @__PURE__ */ v("ul", {
				className: "m-0 list-none divide-y divide-border p-0",
				children: u
			}),
			!g && l != null && /* @__PURE__ */ v("div", {
				className: "border-t border-border bg-surface-panel px-4 py-2 text-[11px] text-text-tertiary",
				children: l
			})
		]
	});
}
function C({ children: e, className: t, ...n }) {
	return /* @__PURE__ */ v("li", {
		className: r("px-4 py-3", t),
		...n,
		children: e
	});
}
//#endregion
export { b as i, C as n, x as r, S as t };
