import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Card-DWAlG4MZ.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { t as o } from "./SegmentedControl-pVesnE3W.js";
import { t as s } from "./Chip-YhQI5B9P.js";
import { t as c } from "./Modal-CyoyiNKN.js";
import { t as l } from "./Input-DLknWXri.js";
import { t as u } from "./Textarea-Dz4doxTv.js";
import { t as d } from "./Avatar-BzicCOft.js";
import { t as f } from "./InlinePopover-DFdI8hw1.js";
import { t as p } from "./Select-CqVokE2v.js";
import { t as m } from "./activationKey-CjbL3LUv.js";
import { A as h, k as g } from "./renderers-9QJtVt3f.js";
import { n as _ } from "./ErrorBoundary-BCUsxk15.js";
import { o as v, s as y, t as b } from "./VerdictChip-CKnsnKYd.js";
import { a as x, c as S, i as C, n as w, o as T, r as E, s as ee, t as D } from "./TiptapEditor-Kdj65m6g.js";
import { A as te, C as ne, D as O, E as k, F as A, I as re, L as j, M, N, O as P, P as F, R as ie, S as I, T as L, _ as R, a as z, b as B, c as V, d as H, f as U, g as ae, h as oe, i as se, j as ce, k as le, l as ue, m as de, o as fe, p as pe, r as me, s as he, t as ge, u as _e, v as ve, w as ye, x as be, y as xe, z as Se } from "./DocumentEditorPage-BVf4dJgY.js";
import { a as Ce, c as we, d as Te, f as Ee, h as De, i as Oe, l as ke, m as Ae, n as je, o as Me, p as Ne, r as Pe, s as Fe, t as Ie, u as Le } from "./CanvasDocumentView-Cnceszk_.js";
import { useCallback as W, useEffect as G, useImperativeHandle as Re, useMemo as K, useRef as q, useState as J } from "react";
import { Fragment as Y, jsx as X, jsxs as Z } from "react/jsx-runtime";
import * as ze from "yjs";
import { relativePositionToAbsolutePosition as Be, ySyncPluginKey as Ve } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function He(e) {
	let t = Date.now(), n = new Date(e).getTime();
	if (isNaN(n)) return "";
	let r = t - n;
	if (r < 0) return "just now";
	let i = Math.floor(r / 1e3);
	if (i < 60) return "just now";
	let a = Math.floor(i / 60);
	if (a < 60) return `${a}m ago`;
	let o = Math.floor(a / 60);
	if (o < 24) return `${o}h ago`;
	let s = Math.floor(o / 24);
	return s < 30 ? `${s}d ago` : `${Math.floor(s / 30)}mo ago`;
}
var Ue = {
	draft: {
		bg: "var(--color-warning-bg)",
		color: "var(--color-warning-fg)"
	},
	review: {
		bg: "var(--color-info-bg)",
		color: "var(--color-info-fg)"
	},
	final: {
		bg: "var(--color-success-bg)",
		color: "var(--color-success-fg)"
	},
	archived: {
		bg: "var(--color-surface-hover)",
		color: "var(--color-text-secondary)"
	}
};
function We({ status: e }) {
	let t = Ue[e] ?? Ue.draft;
	return /* @__PURE__ */ X("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Ge = {
	editor: {
		icon: "✏",
		label: "Editing"
	},
	reviewer: {
		icon: "✔",
		label: "Reviewing"
	},
	reader: {
		icon: "👁",
		label: "Viewing"
	}
};
function Ke({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Z("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Ge[e.mode ?? "editor"] ?? Ge.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ Z("button", {
				type: "button",
				title: `${e.displayName} — ${a ? "Away" : i.label}`,
				"aria-label": `${e.displayName} — ${a ? "Away" : i.label}`,
				onClick: (n) => {
					n.stopPropagation(), t(e.userId);
				},
				className: n("relative cursor-pointer bg-transparent border-none p-0 font-[inherit]"),
				style: {
					marginLeft: r > 0 ? -6 : 0,
					zIndex: 5 - r
				},
				children: [
					/* @__PURE__ */ X("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ X("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ X("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ Z("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function qe({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = J(!1), [u, d] = J(null), [f, p] = J(null), [h, g] = J(1), v = Math.max(1, Math.ceil(e.length / 10)), y = Math.min(h, v), b = K(() => {
		let t = (y - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, y]), x = W((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ Z("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ Z("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ X("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ Z("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ X("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ X("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ X("div", {
				className: n("flex flex-col gap-3"),
				children: b.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ Z("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: m(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ X("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ Z("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ Z("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ X("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ X(We, { status: e.status }),
											e.type && /* @__PURE__ */ X("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ Z("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ X("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ X("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ Z("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", He(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ X("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ X(Ke, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ X("button", {
								type: "button",
								onClick: (t) => x(t, e.id, e.title),
								onKeyDown: (e) => e.stopPropagation(),
								title: "Delete document",
								"aria-label": `Delete ${e.title}`,
								className: n("absolute top-2 right-2 w-[22px] h-[22px] flex items-center justify-center border-none rounded bg-danger-bg text-danger-fg text-sm leading-none cursor-pointer font-[inherit] p-0"),
								children: "×"
							})
						]
					}, e.id);
				})
			}),
			e.length > 10 && /* @__PURE__ */ Z("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ X("button", {
						"data-testid": "pagination-prev",
						disabled: y <= 1,
						onClick: () => g((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ Z("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							y,
							" of ",
							v
						]
					}),
					/* @__PURE__ */ X("button", {
						"data-testid": "pagination-next",
						disabled: y >= v,
						onClick: () => g((e) => Math.min(v, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y >= v ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ X(_, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function Je(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function Ye({ editor: e, provider: t, followClientId: n, onLost: r }) {
	G(() => {
		let i = t?.awareness;
		if (!e || !i || n == null) return;
		let a = () => {
			let t = i.getStates().get(n);
			if (!t) {
				r?.();
				return;
			}
			let a = t.cursor;
			if (a) try {
				let t = Ve.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = Be(t.doc, t.type, ze.createRelativePositionFromJSON(a.head), t.binding.mapping);
				if (n == null) return;
				let r = Math.max(0, Math.min(n, e.state.doc.content.size)), i = e.view.domAtPos(r);
				(i.node instanceof Element ? i.node : i.node.parentElement)?.scrollIntoView({
					block: "center",
					behavior: "smooth"
				});
			} catch {}
		};
		return a(), i.on("change", a), () => i.off("change", a);
	}, [
		e,
		t,
		n,
		r
	]);
}
//#endregion
//#region src/components/doc-editor/StandaloneTiptap.tsx
var Xe = "prosemirror";
function Ze(e) {
	return e.ydoc !== void 0;
}
function Qe(e) {
	return Ze(e) ? /* @__PURE__ */ X($e, { ...e }) : /* @__PURE__ */ X(et, { ...e });
}
function $e({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = Xe, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = K(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = q(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ X("div", {
		className: n(c),
		children: /* @__PURE__ */ X(D, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function et({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = Xe, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = q(/* @__PURE__ */ new Set()), _ = W((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = W((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = K(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: h
	}), [
		r,
		a,
		h
	]), b = t({
		config: y,
		onMessage: v
	}), { ydoc: x, provider: S, synced: C } = e({
		documentId: i,
		ws: b,
		onMessage: _
	}), w = K(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = q(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ X("div", {
		className: n(d),
		children: /* @__PURE__ */ X(D, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ X("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function tt({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ Z("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ Z("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ Z("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ Z("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ X("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ X("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var nt = {
	pending: {
		bg: "var(--color-warning-bg)",
		text: "var(--color-warning-fg)"
	},
	acked: {
		bg: "var(--color-success-bg)",
		text: "var(--color-success-fg)"
	},
	done: {
		bg: "var(--color-info-bg)",
		text: "var(--color-info-fg)"
	},
	rejected: {
		bg: "var(--color-danger-bg)",
		text: "var(--color-danger-fg)"
	}
}, rt = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, it = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function at({ item: e, onAck: t, onReject: r }) {
	let [i, a] = J(!1), [o, s] = J(""), [c, l] = J("none"), d = q(e.status), f = nt[e.status] ?? it, p = rt[e.priority] ?? "var(--color-neutral)", [m, h] = J(!1), g = q(null);
	G(() => () => {
		g.current && clearTimeout(g.current);
	}, []), G(() => {
		d.current === "pending" && e.status === "acked" ? l("ack") : d.current === "pending" && e.status === "rejected" && l("reject"), d.current = e.status;
	}, [e.status]);
	let _ = () => {
		m || (h(!0), l("ack"), g.current = setTimeout(() => {
			g.current = null, t(o || void 0), s(""), a(!1), h(!1);
		}, 150));
	}, v = () => {
		if (!m) {
			if (!o.trim()) {
				a(!0);
				return;
			}
			h(!0), l("reject"), g.current = setTimeout(() => {
				g.current = null, r(o), s(""), a(!1), h(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ Z("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ Z("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ X("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ X("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: f.bg,
							color: f.text
						},
						children: e.status
					}),
					/* @__PURE__ */ X("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: p,
							border: `1px solid ${p}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ Z("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ X("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ Z("span", { children: [
					"Approved by ",
					/* @__PURE__ */ X("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ Z(Y, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Z(Y, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ Z("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ X("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ Z("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ X("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ Z(Y, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Z(Y, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ Z("div", { children: [/* @__PURE__ */ Z("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ X("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: m,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ X("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: m,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ X("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ Z("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ X(u, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && _()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ Z("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ X("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: _,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ X("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ X("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
							onClick: () => {
								a(!1), s("");
							},
							tabIndex: 0,
							children: "Cancel"
						})
					]
				})]
			})] })
		]
	});
}
//#endregion
//#region src/components/doc-editor/ChunkViewer.tsx
var ot = {
	summary: {
		bg: "var(--color-info-bg)",
		text: "var(--color-info-fg)"
	},
	tasks: {
		bg: "var(--color-warning-bg)",
		text: "var(--color-warning-fg)"
	},
	decisions: {
		bg: "var(--color-accent-bg)",
		text: "var(--color-accent-fg)"
	},
	notes: {
		bg: "var(--color-surface-hover)",
		text: "var(--color-text-primary)"
	},
	custom: {
		bg: "var(--color-primary-bg)",
		text: "var(--color-primary-fg)"
	}
};
function st({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = ot[e.type] ?? ot.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ Z("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ X("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ X("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ X("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ X(D, {
					fragment: i,
					ydoc: a,
					provider: o,
					user: {
						name: "",
						color: ""
					},
					editable: !1,
					sectionId: e.id
				})
			}),
			!i && e.items.length === 0 && /* @__PURE__ */ Z("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ Z("div", { children: [e.items.map((e) => /* @__PURE__ */ X(at, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ Z("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ X(ae, {
				comments: s ?? [],
				onAddComment: c,
				participants: d,
				onResolveThread: l,
				onUnresolveThread: u
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/AckMode.tsx
var Q = 4;
function ct({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = J(0), _ = Math.max(1, Math.ceil(e.length / Q)), v = h * Q, y = e.slice(v, v + Q);
	if (G(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Q)), s?.());
	}, [
		o,
		e.length,
		s
	]), G(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ X("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ Z("div", { children: [
		/* @__PURE__ */ X(tt, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ X("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ Z("div", { children: [a.length > 0 && /* @__PURE__ */ Z("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ X("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ X("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ X(st, {
					section: e,
					onAckItem: (n, r) => t(e.id, n, r),
					onRejectItem: (t, n) => r(e.id, t, n),
					fragment: c(e.id),
					ydoc: l,
					provider: u,
					comments: d?.[e.id],
					onAddComment: f ? (t, n) => f(e.id, t, n) : void 0,
					onResolveThread: p ? (t) => p(e.id, t) : void 0,
					onUnresolveThread: m ? (t) => m(e.id, t) : void 0,
					participants: a
				})] }, e.id);
			})
		}),
		/* @__PURE__ */ Z("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ X("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ Z("span", {
					className: n("text-[13px] text-text-secondary"),
					children: [
						"Page ",
						h + 1,
						" of ",
						_,
						" (",
						e.length,
						" sections)"
					]
				}),
				/* @__PURE__ */ X("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === _ - 1 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: x,
					disabled: h === _ - 1,
					children: "Next"
				})
			]
		})
	] });
}
//#endregion
//#region src/components/doc-editor/ActivityFeed.tsx
function lt(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function ut(e, t) {
	let n = t.documentTitle ? ` in ${t.documentTitle}` : "";
	switch (e) {
		case "doc.ack": return `acknowledged "${t.itemText || "item"}"${n}`;
		case "doc.reject": return `rejected "${t.itemText || "item"}"${n}`;
		case "doc.add_item": return `added task in "${t.sectionTitle || "section"}"${n}`;
		case "doc.add_section": return `added new section${n}`;
		case "doc.edit_section": return `edited "${t.sectionTitle || "section"}"${n}`;
		case "doc.remove_item": return `removed "${t.itemText || "item"}"${n}`;
		case "doc.comment": return `commented: "${t.text || "..."}"${n}`;
		case "pipeline.run.started": {
			let e = t.pipelineId ?? "";
			return e ? `triggered pipeline ${e}` : "triggered a pipeline";
		}
		case "pipeline.run.completed": return typeof t.durationMs == "number" ? `pipeline run completed in ${t.durationMs}ms` : "pipeline run completed";
		case "pipeline.run.failed": return `pipeline run failed: ${t.error ?? "unknown error"}`;
		case "pipeline.approval.requested": return "approval requested";
		default: return t.description ? String(t.description) : e;
	}
}
function dt(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function ft(e) {
	try {
		return new Date(e).toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		});
	} catch {
		return "";
	}
}
function pt(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function mt({ events: e, participants: t }) {
	let [r, i] = J(!1);
	return /* @__PURE__ */ Z("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ Z("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ Z("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ X("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ Z(Y, { children: [t.length > 0 && /* @__PURE__ */ Z("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ X("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ Z("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ X("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					pt(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ X("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ X("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ Z("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ X("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: dt(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ Z("div", { children: [
						/* @__PURE__ */ X("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ Z("span", {
							className: n("text-neutral"),
							children: [
								lt(e.eventType),
								" ",
								ut(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ X("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: ft(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var ht = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, gt = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function _t({ label: e, children: t }) {
	return /* @__PURE__ */ Z("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ X("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ X("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var vt = {
	field: "Field change",
	prose: "Body text"
};
function yt({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: c, targetReason: u, before: f, after: p, edits: m, rationale: h, draftError: g, author: _, category: x, path: S, locationHint: C, verdict: w, verdictStatus: T = "idle", verdictError: E, revision: ee, onRereview: D, onAccept: te, onReject: ne, onRedraft: O, onReattach: k, onConfirmAttachment: A, className: re, "data-testid": j = "proposal-card" }) {
	let [M, N] = J(!1), [P, F] = J(null), [ie, I] = J(!1), [L, R] = J(""), z = i === "applied", B = i === "rejected", V = z || B;
	async function H() {
		N(!0), F(null);
		try {
			let e = await te();
			F(e);
		} catch (e) {
			F({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			N(!1);
		}
	}
	let U = t === "prose" ? m ?? [] : [{
		before: f ?? "",
		after: p ?? ""
	}];
	return /* @__PURE__ */ Z("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", z ? "border-success-border" : "border-border", B && "opacity-60", re),
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ X("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: x ?? vt[t]
					}),
					_ && /* @__PURE__ */ Z("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ X(d, {
							name: _.name,
							size: 18,
							..._.avatarUrl ? { src: _.avatarUrl } : {}
						}), /* @__PURE__ */ X("span", {
							className: "truncate text-xs text-text-secondary",
							children: _.name
						})]
					}),
					/* @__PURE__ */ X("span", { className: "flex-1" }),
					/* @__PURE__ */ X(s, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ X(s, {
						tone: gt[a],
						size: "sm",
						children: ht[a]
					}),
					o === "healed" && /* @__PURE__ */ X(s, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ X(s, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					z && /* @__PURE__ */ X(s, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					B && /* @__PURE__ */ X(s, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ Z("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ X(v, {
				path: S ?? (c ? [c] : []),
				...C ? { hint: C } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1",
				children: [u && /* @__PURE__ */ X(_t, {
					label: "Why",
					children: u
				}), h && /* @__PURE__ */ X(_t, {
					label: "Rationale",
					children: h
				})]
			}),
			i === "drafting" && /* @__PURE__ */ X("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			g && /* @__PURE__ */ X("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: g
			}),
			i !== "drafting" && !g && U.length > 0 && /* @__PURE__ */ X(y, {
				pairs: U,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ X(b, {
				verdict: w,
				status: T,
				error: E,
				revision: ee,
				"data-testid": `${j}-verdict`
			}),
			P && !P.ok && /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${j}-apply-error`,
				children: [
					/* @__PURE__ */ X("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ X("span", { children: P.message ?? "The document refused the change." }),
					P.stale && /* @__PURE__ */ Z("span", { children: [
						"Drafted against ",
						JSON.stringify(P.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(P.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!V && /* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "primary",
						disabled: M || i === "drafting" || !!g,
						onClick: H,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => I((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					O && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: O,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					D && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: D,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					k && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && o === "author_only" && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: A,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			ie && !V && /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ X("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ X(l, {
						id: `${j}-reason`,
						size: "sm",
						value: L,
						onChange: (e) => R(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ Z("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ X(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								ne(L), I(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ X(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => I(!1),
							children: "Cancel"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/WorkItemRow.tsx
function bt({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: m, onPropose: h, onAttach: g, onDismiss: _, className: v, "data-testid": y = `work-item-${e}` }) {
	let b = [...f ?? []].sort((e, t) => t.score - e.score), x = new Set(b.map((e) => e.sectionId)), S = m.filter((e) => !x.has(e.id));
	return /* @__PURE__ */ X(i, {
		padding: "sm",
		className: v,
		"data-testid": y,
		"data-item-id": e,
		children: /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ X(s, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), l && /* @__PURE__ */ X(s, {
						tone: "caution",
						size: "sm",
						"data-testid": `${y}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ Z("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				c && /* @__PURE__ */ X("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ X("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${y}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: h,
						"data-testid": `${y}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						onClick: _,
						"data-testid": `${y}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && b.length > 0 && /* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ X("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), b.map((e) => /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						onClick: () => g(e.sectionId),
						"data-testid": `${y}-candidate`,
						children: [
							e.sectionTitle ?? e.sectionId,
							" — ",
							e.reason
						]
					}, e.sectionId))]
				}),
				a && S.length > 0 && /* @__PURE__ */ Z("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ X("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ X(p, {
						size: "sm",
						value: "",
						placeholder: "Choose a section…",
						options: S.map((e) => ({
							value: e.id,
							label: e.title || e.id
						})),
						onChange: (e) => {
							e.target.value && g(e.target.value);
						},
						"data-testid": `${y}-file-under`
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentGhostPopover.tsx
var xt = "[data-comment-id]", St = 240;
function Ct(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function wt(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Tt({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [p, m] = J(null), h = q(null), g = q(null), _ = q(null);
	_.current = p;
	let v = K(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), y = q(v);
	y.current = v;
	let b = W(() => {
		g.current !== null && (clearTimeout(g.current), g.current = null);
	}, []), x = W(() => {
		b(), m(null);
	}, [b]), S = W((e, n, r) => {
		if (b(), !y.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Ct(e)}"]`) ?? null;
		i instanceof HTMLElement && (h.current = i, m({
			id: e,
			via: r
		}));
	}, [b, t]);
	Re(l, () => ({
		openComment: (e, t) => S(e, t, "click"),
		close: x
	}), [S, x]);
	let C = q(null), w = p?.id ?? null;
	G(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), G(() => b, [b]), G(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(xt) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (_.current?.id === n) {
					x();
					return;
				}
				S(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (b(), _.current?.id !== a && (g.current = setTimeout(() => S(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (b(), g.current = setTimeout(() => {
				_.current?.via === "hover" && x();
			}, St));
		};
		return e.addEventListener("click", a), e.addEventListener("mouseover", o), e.addEventListener("mouseout", s), () => {
			e.removeEventListener("click", a), e.removeEventListener("mouseover", o), e.removeEventListener("mouseout", s);
		};
	}, [
		t,
		i,
		n,
		S,
		x,
		b
	]);
	let T = w ? v.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), x());
	};
	return /* @__PURE__ */ X(f, {
		trigger: h,
		open: !!T,
		onClose: x,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": u,
		children: T && /* @__PURE__ */ Z("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: b,
			onMouseLeave: () => {
				b(), g.current = setTimeout(() => {
					_.current?.via === "hover" && x();
				}, St);
			},
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ X(d, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ X("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ X("span", {
							className: "text-[11px] text-text-tertiary",
							children: B(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ X(s, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ X("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ X("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ X("span", {
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: wt(T.replyCount ?? 0)
					}), /* @__PURE__ */ Z("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ X(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !T.resolved && /* @__PURE__ */ X(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(c),
							"data-testid": `${u}-resolve`,
							children: "Resolve"
						})]
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/VideoDockSlot.tsx
function Et() {
	return /* @__PURE__ */ Z("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ X("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ X("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function Dt({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
	let [h, g] = J(!1), _ = W((e) => {
		e.preventDefault(), t && g(!0), l?.(e);
	}, [t, l]), v = W((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (g(!1), u?.(e));
	}, [u]), y = W((e) => {
		e.preventDefault(), g(!1), t && d?.(e);
	}, [t, d]);
	return !e && !t ? null : /* @__PURE__ */ X("div", {
		"data-testid": m,
		"data-docked": String(e),
		"data-drag-over": String(h),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: _,
		onDragLeave: v,
		onDrop: y,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", h ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", f),
		children: e ? /* @__PURE__ */ Z("div", {
			"data-testid": `${m}-content`,
			className: "relative w-full",
			children: [p, c && /* @__PURE__ */ X("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ X(a, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${m}-undock`,
					icon: /* @__PURE__ */ X(Et, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ Z("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${m}-dropzone`,
			className: n("flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", h ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ X("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ X("span", {
				className: "text-xs text-text-tertiary",
				children: o
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentOwnership.tsx
function Ot({ owner: e, collaborators: t = [], maxAvatars: r = 3, onShare: i, className: a, "data-testid": o = "document-ownership" }) {
	if (!e) return null;
	let s = t.slice(0, r), c = t.length - s.length;
	return /* @__PURE__ */ Z("span", {
		"data-testid": o,
		className: n("inline-flex items-center gap-2", a),
		children: [
			/* @__PURE__ */ Z("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ X(d, {
					name: e.displayName,
					size: 20,
					...e.avatarUrl ? { src: e.avatarUrl } : {}
				}), /* @__PURE__ */ Z("span", {
					className: "text-xs text-text-secondary",
					"data-testid": `${o}-owner`,
					children: ["Owned by ", /* @__PURE__ */ X("span", {
						className: "font-medium text-text-primary",
						children: e.displayName
					})]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ Z("span", {
				className: "inline-flex items-center",
				"data-testid": `${o}-collaborators`,
				children: [s.map((e, t) => /* @__PURE__ */ X("span", {
					className: n("inline-flex rounded-full ring-2 ring-surface", t > 0 && "-ml-1.5"),
					title: e.displayName,
					children: /* @__PURE__ */ X(d, {
						name: e.displayName,
						size: 20,
						...e.avatarUrl ? { src: e.avatarUrl } : {}
					})
				}, e.userId)), c > 0 && /* @__PURE__ */ Z("span", {
					"data-testid": `${o}-overflow`,
					title: t.slice(r).map((e) => e.displayName).join(", "),
					className: "-ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-surface-inset px-1 text-[10px] font-semibold text-text-secondary ring-2 ring-surface",
					children: ["+", c]
				})]
			}),
			i && /* @__PURE__ */ X("button", {
				type: "button",
				onClick: i,
				"data-testid": `${o}-share`,
				className: "rounded border border-border px-2 py-0.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary",
				children: "Share"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var kt = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], At = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function jt({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: l, onInvite: u, onCopyLink: f, notice: p, "data-testid": m = "document-share-dialog" }) {
	let [h, g] = J(""), _ = () => {
		let e = h.trim();
		!e || !u || (u(e), g(""));
	};
	return /* @__PURE__ */ X(c, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-4",
			"data-testid": m,
			children: [
				u && /* @__PURE__ */ Z("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ X("input", {
						value: h,
						onChange: (e) => g(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && _();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${m}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						onClick: _,
						disabled: !h.trim(),
						"data-testid": `${m}-invite`,
						children: "Invite"
					})]
				}),
				p && /* @__PURE__ */ X("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${m}-notice`,
					children: p
				}),
				/* @__PURE__ */ X("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${m}-people`,
					children: i.map((e) => /* @__PURE__ */ Z("div", {
						className: "flex items-center gap-2",
						"data-testid": `${m}-person`,
						children: [
							/* @__PURE__ */ X(d, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ X("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !l ? /* @__PURE__ */ X("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${m}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ X("select", {
								value: e.role,
								onChange: (t) => l(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${m}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: kt.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ X("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ X("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ X("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${m}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(At).map((e) => /* @__PURE__ */ X("option", {
							value: e,
							children: At[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center justify-between",
					children: [f ? /* @__PURE__ */ X(r, {
						variant: "secondary",
						size: "sm",
						onClick: f,
						"data-testid": `${m}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ X("span", {}), /* @__PURE__ */ X(r, {
						size: "sm",
						onClick: t,
						"data-testid": `${m}-done`,
						children: "Done"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionModeControl.tsx
var $ = [
	{
		value: "editing",
		label: "Editing",
		hint: "Your changes go straight into the document."
	},
	{
		value: "suggesting",
		label: "Suggesting",
		hint: "Your changes become proposals other people accept or reject."
	},
	{
		value: "viewing",
		label: "Viewing",
		hint: "Read the document without changing it."
	}
];
function Mt({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: s, "data-testid": c = "suggestion-mode-control" }) {
	let l = $.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), u = $.find((t) => t.value === e);
	return /* @__PURE__ */ Z("div", {
		"data-testid": c,
		"data-mode": e,
		title: u?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", s),
		children: [/* @__PURE__ */ X(o, {
			options: l,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ X("span", {
			"data-testid": `${c}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var Nt = {
	insert: "Insertion",
	delete: "Deletion",
	replace: "Replacement",
	modify: "Formatting"
}, Pt = {
	insert: "bg-success-bg text-success-fg",
	delete: "bg-danger-bg text-danger-fg",
	replace: "bg-caution-bg text-caution-fg",
	modify: "bg-info-bg text-info-fg"
};
function Ft(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function It({ kind: e, author: t, when: r = null, deletedText: i = "", insertedText: a = "", active: o = !1, onFocus: s, onAccept: c, onReject: l, className: u, "data-testid": d = "suggestion-card" }) {
	let f = t.trim() === "" ? "Unknown author" : t;
	return /* @__PURE__ */ Z("div", {
		"data-testid": d,
		"data-kind": e,
		"data-active": o ? "true" : "false",
		className: n("flex flex-col gap-2 border-b border-border p-3 text-sm", o && "bg-surface-inset", u),
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ X("span", {
						className: n("rounded px-1.5 py-0.5 text-xs font-medium", Pt[e]),
						"data-testid": `${d}-kind`,
						children: Nt[e]
					}),
					/* @__PURE__ */ X("span", {
						className: "truncate text-xs text-text-secondary",
						"data-testid": `${d}-author`,
						children: f
					}),
					r !== null && /* @__PURE__ */ X("span", {
						className: "ml-auto text-xs tabular-nums text-text-tertiary",
						children: Ft(r)
					})
				]
			}),
			(i || a) && /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: s,
				disabled: !s,
				"data-testid": `${d}-body`,
				className: n("flex flex-col items-start gap-0.5 text-left", s && "cursor-pointer hover:opacity-80"),
				children: [i && /* @__PURE__ */ X("del", {
					className: "suggestion suggestion--delete",
					"data-testid": `${d}-deleted`,
					children: i
				}), a && /* @__PURE__ */ X("ins", {
					className: "suggestion suggestion--insert",
					"data-testid": `${d}-inserted`,
					children: a
				})]
			}),
			(c || l) && /* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				children: [c && /* @__PURE__ */ X("button", {
					type: "button",
					onClick: c,
					"data-testid": `${d}-accept`,
					className: "cursor-pointer rounded border border-border bg-surface px-2 py-1 text-xs font-medium text-text-primary hover:bg-surface-hover",
					children: "Accept"
				}), l && /* @__PURE__ */ X("button", {
					type: "button",
					onClick: l,
					"data-testid": `${d}-reject`,
					className: "cursor-pointer rounded px-2 py-1 text-xs font-medium text-text-secondary hover:bg-surface-hover",
					children: "Reject"
				})]
			})
		]
	});
}
//#endregion
export { ct as AckMode, ue as ActionItemsCard, mt as ActivityFeed, I as AttachmentsPanel, F as CANVAS_BODY_KEY, A as CANVAS_SCHEMA_VERSION, Ie as CanvasDocumentView, w as CanvasLineSpacing, st as ChunkViewer, Tt as CommentGhostPopover, R as CommentThreadNode, he as DiffViewer, ge as DocumentEditorPage, je as DocumentFindBar, Ce as DocumentGutter, O as DocumentHeader, qe as DocumentListPage, Ne as DocumentOutline, Ot as DocumentOwnership, Ae as DocumentRuler, jt as DocumentShareDialog, Le as DocumentStatusBar, Fe as DocumentToolbar, S as EditorToolbar, U as ExecutiveSummaryCard, k as FollowModeBar, pe as HeaderBanner, _e as KeyDecisionsCard, E as LINE_SPACINGS, C as LINE_SPACING_LABELS, be as MentionDropdown, z as MyMentionsPanel, _ as NewDocumentModal, De as PX_PER_INCH, P as ParticipantAvatars, yt as ProposalCard, V as ReaderMode, oe as ReviewMode, tt as ReviewProgress, at as ReviewableItem, kt as SHARE_ROLES, $ as SUGGESTION_AUTHORING_MODES, ye as SectionBlock, ae as SectionComments, ne as SectionList, H as SectionSummariesCard, Qe as StandaloneTiptap, It as SuggestionCard, Mt as SuggestionModeControl, me as TableOfContents, h as TaskItemRow, g as TaskList, D as TiptapEditor, fe as VersionHistoryPanel, L as VideoCallPanel, Dt as VideoDockSlot, se as VideoHistoryPanel, bt as WorkItemRow, Te as ZOOM_FIT, Ee as ZOOM_STEPS, re as canvasBody, M as canvasFragmentToMarkdown, Je as clientIdForUser, ve as countAllComments, le as findDocumentTarget, Pe as findMatches, de as generateSummaryBullets, xe as getInitials, j as isCanvasDocument, x as isLineSpacing, T as lineSpacingAttributes, Oe as nextMatchIndex, ee as parseLineSpacing, we as readOutline, ie as readSchemaVersion, B as relativeTime, wt as replyLabel, te as scrollToDocumentTarget, Me as stackOffsets, N as useDocumentActions, ke as useDocumentOutline, Ye as useFollowCursor, Se as useIsCanvasDocument, ce as useSidebarPanels };
