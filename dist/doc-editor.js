import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { _ as r } from "./overlayStack-BDlo8PJg.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { n as o, t as s } from "./Stack-CkiMw5K0.js";
import { r as c } from "./Text-DIl-Ssia.js";
import { t as l } from "./Banner-C3Wgh62A.js";
import { t as u } from "./Chip-DYqbAD3L.js";
import { t as d } from "./Modal-D2qxMX2_.js";
import { t as f } from "./EmptyState-DQYx5Oyy.js";
import { t as p } from "./Input-DLknWXri.js";
import { t as m } from "./Textarea-Dz4doxTv.js";
import { t as h } from "./Avatar-Bq_1SEQ2.js";
import { n as g } from "./SearchInput-Y-j1He57.js";
import { t as _ } from "./InlineAlert-CRnIKeAF.js";
import { t as v } from "./CardHeader-CsPhVpCm.js";
import { t as y } from "./InlinePopover-2oYczSG0.js";
import { t as b } from "./ChangeDiff-CzO8zCc-.js";
import { t as x } from "./Select-CD8ixtYi.js";
import { t as S } from "./Checkbox-Db43XgBJ.js";
import { t as C } from "./activationKey-CjbL3LUv.js";
import { A as w, k as T } from "./renderers-5O9bh08s.js";
import { A as E, C as D, D as ee, E as O, F as k, L as A, M as te, N as j, O as M, P as N, S as P, T as F, _ as ne, a as I, b as L, c as re, d as R, f as z, g as B, h as ie, i as V, j as ae, k as oe, l as se, m as ce, n as le, o as ue, p as de, r as fe, s as pe, t as me, u as he, v as ge, w as _e, x as ve, y as ye } from "./PresentationEditor-BiSDmZeA.js";
import { o as be, t as xe } from "./VerdictChip-CtR3yfCy.js";
import { a as Se, c as Ce, i as we, n as Te, o as Ee, r as De, s as Oe, t as H } from "./TiptapEditor-Kdj65m6g.js";
import { A as ke, B as Ae, C as je, D as Me, E as Ne, F as Pe, H as Fe, I as Ie, L as Le, M as Re, N as ze, O as Be, P as Ve, R as He, S as Ue, T as We, V as Ge, _ as Ke, a as qe, b as Je, c as Ye, d as Xe, f as Ze, g as Qe, h as $e, i as et, j as tt, k as nt, l as rt, m as it, o as at, p as ot, r as st, s as ct, t as lt, u as ut, v as dt, w as ft, x as pt, y as mt, z as ht } from "./DocumentEditorPage-yAqQGUyC.js";
import { _ as gt, a as _t, c as vt, d as yt, f as bt, g as xt, h as St, i as Ct, l as wt, m as Tt, n as Et, o as Dt, p as Ot, r as kt, s as At, t as jt, u as Mt, v as Nt, y as Pt } from "./useDocumentImageUpload-BCm9zpfQ.js";
import { createContext as Ft, useCallback as U, useContext as It, useEffect as W, useImperativeHandle as Lt, useMemo as G, useRef as K, useState as q } from "react";
import { Fragment as J, jsx as Y, jsxs as X } from "react/jsx-runtime";
import * as Rt from "yjs";
import { NodeViewWrapper as zt, ReactNodeViewRenderer as Bt } from "@tiptap/react";
import { relativePositionToAbsolutePosition as Vt, ySyncPluginKey as Ht } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function Ut(e) {
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
var Wt = {
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
function Gt({ status: e }) {
	let t = Wt[e] ?? Wt.draft;
	return /* @__PURE__ */ Y("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Kt = {
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
function qt({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ X("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Kt[e.mode ?? "editor"] ?? Kt.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ X("button", {
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
					/* @__PURE__ */ Y("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ Y("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ Y("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ X("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function Jt({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = q(!1), [u, d] = q(null), [f, p] = q(null), [m, h] = q(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = G(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = U((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ X("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ X("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ Y("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ X("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ Y("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ Y("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ Y("div", {
				className: n("flex flex-col gap-3"),
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ X("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: C(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ Y("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ X("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ X("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ Y("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ Y(Gt, { status: e.status }),
											e.type && /* @__PURE__ */ Y("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ X("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ Y("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ Y("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ X("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", Ut(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Y("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Y(qt, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ Y("button", {
								type: "button",
								onClick: (t) => y(t, e.id, e.title),
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
			e.length > 10 && /* @__PURE__ */ X("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ Y("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ X("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ Y("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ Y(A, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function Yt(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function Xt({ editor: e, provider: t, followClientId: n, onLost: r }) {
	W(() => {
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
				let t = Ht.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = Vt(t.doc, t.type, Rt.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var Zt = "prosemirror";
function Qt(e) {
	return e.ydoc !== void 0;
}
function $t(e) {
	return Qt(e) ? /* @__PURE__ */ Y(en, { ...e }) : /* @__PURE__ */ Y(tn, { ...e });
}
function en({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = Zt, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = G(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = K(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Y("div", {
		className: n(c),
		children: /* @__PURE__ */ Y(H, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function tn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = Zt, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = K(/* @__PURE__ */ new Set()), _ = U((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = U((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = G(() => ({
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
	}), w = G(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = K(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ Y("div", {
		className: n(d),
		children: /* @__PURE__ */ Y(H, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ Y("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function nn({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ X("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ X("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ X("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ X("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ Y("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ Y("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var rn = {
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
}, an = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, on = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function sn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = q(!1), [o, s] = q(""), [c, l] = q("none"), u = K(e.status), d = rn[e.status] ?? on, f = an[e.priority] ?? "var(--color-neutral)", [p, h] = q(!1), g = K(null);
	W(() => () => {
		g.current && clearTimeout(g.current);
	}, []), W(() => {
		u.current === "pending" && e.status === "acked" ? l("ack") : u.current === "pending" && e.status === "rejected" && l("reject"), u.current = e.status;
	}, [e.status]);
	let _ = () => {
		p || (h(!0), l("ack"), g.current = setTimeout(() => {
			g.current = null, t(o || void 0), s(""), a(!1), h(!1);
		}, 150));
	}, v = () => {
		if (!p) {
			if (!o.trim()) {
				a(!0);
				return;
			}
			h(!0), l("reject"), g.current = setTimeout(() => {
				g.current = null, r(o), s(""), a(!1), h(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ X("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ X("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ Y("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ Y("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ Y("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ X("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ Y("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ X("span", { children: [
					"Approved by ",
					/* @__PURE__ */ Y("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ X(J, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ X(J, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ X("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ Y("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ X("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ Y("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ X(J, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ X(J, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ X("div", { children: [/* @__PURE__ */ X("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ Y("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ Y("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: p,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ Y("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ X("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ Y(m, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && _()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ X("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ Y("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: _,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ Y("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ Y("button", {
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
var cn = {
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
function ln({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = cn[e.type] ?? cn.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ X("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ Y("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ Y("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ Y("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ Y(H, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ X("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ X("div", { children: [e.items.map((e) => /* @__PURE__ */ Y(sn, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ X("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ Y(Qe, {
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
var Z = 4;
function un({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = q(0), _ = Math.max(1, Math.ceil(e.length / Z)), v = h * Z, y = e.slice(v, v + Z);
	if (W(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Z)), s?.());
	}, [
		o,
		e.length,
		s
	]), W(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ Y("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ X("div", { children: [
		/* @__PURE__ */ Y(nn, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ Y("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ X("div", { children: [a.length > 0 && /* @__PURE__ */ X("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ Y("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ Y("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ Y(ln, {
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
		/* @__PURE__ */ X("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ Y("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ X("span", {
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
				/* @__PURE__ */ Y("button", {
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
function dn(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function fn(e, t) {
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
function pn(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function mn(e) {
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
function hn(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function gn({ events: e, participants: t }) {
	let [r, i] = q(!1);
	return /* @__PURE__ */ X("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ X("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ X("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ Y("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ X(J, { children: [t.length > 0 && /* @__PURE__ */ X("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ Y("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ X("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ Y("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					hn(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ Y("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ Y("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ X("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ Y("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: pn(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ X("div", { children: [
						/* @__PURE__ */ Y("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ X("span", {
							className: n("text-neutral"),
							children: [
								dn(e.eventType),
								" ",
								fn(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Y("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: mn(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var _n = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, vn = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function yn({ label: e, children: t }) {
	return /* @__PURE__ */ X("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ Y("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ Y("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var bn = {
	field: "Field change",
	prose: "Body text"
};
function xn({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: d, edits: f, rationale: m, draftError: g, author: _, category: v, path: y, locationHint: x, verdict: S, verdictStatus: C = "idle", verdictError: w, revision: T, onRereview: E, onAccept: D, onReject: ee, onRedraft: O, onReattach: k, onConfirmAttachment: A, className: te, "data-testid": j = "proposal-card" }) {
	let [M, N] = q(!1), [P, F] = q(null), [ne, I] = q(!1), [L, re] = q(""), R = i === "applied", z = i === "rejected", B = R || z;
	async function ie() {
		N(!0), F(null);
		try {
			let e = await D();
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
	let V = t === "prose" ? f ?? [] : [{
		before: l ?? "",
		after: d ?? ""
	}];
	return /* @__PURE__ */ X("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", R ? "border-success-border" : "border-border", z && "opacity-60", te),
		children: [
			/* @__PURE__ */ X("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Y("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: v ?? bn[t]
					}),
					_ && /* @__PURE__ */ X("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ Y(h, {
							name: _.name,
							size: 18,
							..._.avatarUrl ? { src: _.avatarUrl } : {}
						}), /* @__PURE__ */ Y("span", {
							className: "truncate text-xs text-text-secondary",
							children: _.name
						})]
					}),
					/* @__PURE__ */ Y("span", { className: "flex-1" }),
					/* @__PURE__ */ Y(u, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Y(u, {
						tone: vn[a],
						size: "sm",
						children: _n[a]
					}),
					o === "healed" && /* @__PURE__ */ Y(u, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ Y(u, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					R && /* @__PURE__ */ Y(u, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					z && /* @__PURE__ */ Y(u, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ X("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ Y(be, {
				path: y ?? (s ? [s] : []),
				...x ? { hint: x } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ X("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ Y(yn, {
					label: "Why",
					children: c
				}), m && /* @__PURE__ */ Y(yn, {
					label: "Rationale",
					children: m
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Y("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			g && /* @__PURE__ */ Y("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: g
			}),
			i !== "drafting" && !g && V.length > 0 && /* @__PURE__ */ Y(b, {
				pairs: V,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Y(xe, {
				verdict: S,
				status: C,
				error: w,
				revision: T,
				"data-testid": `${j}-verdict`
			}),
			P && !P.ok && /* @__PURE__ */ X("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${j}-apply-error`,
				children: [
					/* @__PURE__ */ Y("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Y("span", { children: P.message ?? "The document refused the change." }),
					P.stale && /* @__PURE__ */ X("span", { children: [
						"Drafted against ",
						JSON.stringify(P.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(P.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!B && /* @__PURE__ */ X("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "primary",
						disabled: M || i === "drafting" || !!g,
						onClick: ie,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => I((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					O && /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: O,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					E && /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: E,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					k && /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && o === "author_only" && /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: A,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			ne && !B && /* @__PURE__ */ X("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Y("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Y(p, {
						id: `${j}-reason`,
						size: "sm",
						value: L,
						onChange: (e) => re(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ X("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Y(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								ee(L), I(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Y(r, {
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
function Sn({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...f ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), S = p.filter((e) => !b.has(e.id));
	return /* @__PURE__ */ Y(i, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ X("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ X("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ Y(u, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), c && /* @__PURE__ */ Y(u, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ X("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				s && /* @__PURE__ */ Y("p", {
					className: "text-xs text-text-tertiary",
					children: s
				}),
				d && /* @__PURE__ */ Y("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ X("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "primary",
						disabled: l,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: l ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && y.length > 0 && /* @__PURE__ */ X("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Y("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "secondary",
						onClick: () => h(e.sectionId),
						"data-testid": `${v}-candidate`,
						children: [
							e.sectionTitle ?? e.sectionId,
							" — ",
							e.reason
						]
					}, e.sectionId))]
				}),
				a && S.length > 0 && /* @__PURE__ */ X("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Y("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ Y(x, {
						size: "sm",
						value: "",
						placeholder: "Choose a section…",
						options: S.map((e) => ({
							value: e.id,
							label: e.title || e.id
						})),
						onChange: (e) => {
							e.target.value && h(e.target.value);
						},
						"data-testid": `${v}-file-under`
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentGhostPopover.tsx
var Cn = "[data-comment-id]", wn = 240;
function Tn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function En(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Dn({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
	let [d, f] = q(null), p = K(null), m = K(null), g = K(null);
	g.current = d;
	let _ = G(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), v = K(_);
	v.current = _;
	let b = U(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), x = U(() => {
		b(), f(null);
	}, [b]), S = U((e, n, r) => {
		if (b(), !v.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Tn(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [b, t]);
	Lt(c, () => ({
		openComment: (e, t) => S(e, t, "click"),
		close: x
	}), [S, x]);
	let C = K(null), w = d?.id ?? null;
	W(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), W(() => b, [b]), W(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Cn) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (g.current?.id === n) {
					x();
					return;
				}
				S(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (b(), g.current?.id !== a && (m.current = setTimeout(() => S(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (b(), m.current = setTimeout(() => {
				g.current?.via === "hover" && x();
			}, wn));
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
	let T = w ? _.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), x());
	};
	return /* @__PURE__ */ Y(y, {
		trigger: p,
		open: !!T,
		onClose: x,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": l,
		children: T && /* @__PURE__ */ X("div", {
			"data-testid": `${l}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: b,
			onMouseLeave: () => {
				b(), m.current = setTimeout(() => {
					g.current?.via === "hover" && x();
				}, wn);
			},
			children: [
				/* @__PURE__ */ X("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Y(h, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ Y("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ Y("span", {
							className: "text-[11px] text-text-tertiary",
							children: Je(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ Y(u, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ Y("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ Y("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Y("span", {
						"data-testid": `${l}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: En(T.replyCount ?? 0)
					}), /* @__PURE__ */ X("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ Y(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${l}-open`,
							children: "Open thread"
						}), s && !T.resolved && /* @__PURE__ */ Y(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(s),
							"data-testid": `${l}-resolve`,
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
function On() {
	return /* @__PURE__ */ X("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ Y("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ Y("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function kn({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
	let [h, g] = q(!1), _ = U((e) => {
		e.preventDefault(), t && g(!0), l?.(e);
	}, [t, l]), v = U((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (g(!1), u?.(e));
	}, [u]), y = U((e) => {
		e.preventDefault(), g(!1), t && d?.(e);
	}, [t, d]);
	return !e && !t ? null : /* @__PURE__ */ Y("div", {
		"data-testid": m,
		"data-docked": String(e),
		"data-drag-over": String(h),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: _,
		onDragLeave: v,
		onDrop: y,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", h ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", f),
		children: e ? /* @__PURE__ */ X("div", {
			"data-testid": `${m}-content`,
			className: "relative w-full",
			children: [p, c && /* @__PURE__ */ Y("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ Y(a, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${m}-undock`,
					icon: /* @__PURE__ */ Y(On, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ X("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${m}-dropzone`,
			className: n("flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", h ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ Y("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ Y("span", {
				className: "text-xs text-text-tertiary",
				children: o
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function An({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ Y("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ Y("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ Y("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ Y("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var jn = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], Mn = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function Nn({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: f, "data-testid": p = "document-share-dialog" }) {
	let [m, g] = q(""), _ = () => {
		let e = m.trim();
		!e || !l || (l(e), g(""));
	};
	return /* @__PURE__ */ Y(d, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ X("div", {
			className: "flex flex-col gap-4",
			"data-testid": p,
			children: [
				l && /* @__PURE__ */ X("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Y("input", {
						value: m,
						onChange: (e) => g(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && _();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${p}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ Y(r, {
						size: "sm",
						onClick: _,
						disabled: !m.trim(),
						"data-testid": `${p}-invite`,
						children: "Invite"
					})]
				}),
				f && /* @__PURE__ */ Y("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${p}-notice`,
					children: f
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${p}-people`,
					children: i.map((e) => /* @__PURE__ */ X("div", {
						className: "flex items-center gap-2",
						"data-testid": `${p}-person`,
						children: [
							/* @__PURE__ */ Y(h, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ Y("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ Y("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${p}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ Y("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${p}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: jn.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Y("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ X("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ Y("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ Y("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${p}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(Mn).map((e) => /* @__PURE__ */ Y("option", {
							value: e,
							children: Mn[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ X("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ Y(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${p}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ Y("span", {}), /* @__PURE__ */ Y(r, {
						size: "sm",
						onClick: t,
						"data-testid": `${p}-done`,
						children: "Done"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionModeControl.tsx
var Q = [
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
function Pn({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = Q.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = Q.find((t) => t.value === e);
	return /* @__PURE__ */ X("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Y(g, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ Y("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var Fn = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, In = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, $ = 6, Ln = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function Rn(e) {
	let t = Ln.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function zn(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Bn({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, $), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ X("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Y(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > $ && /* @__PURE__ */ X("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - $,
				" more"
			]
		})]
	});
}
function Vn({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": g = "suggestion-card" }) {
	let { person: _, model: v } = Rn(t.trim() === "" ? "Unknown author" : t.trim()), y = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = y.length > 0 || b.length > 0;
	return /* @__PURE__ */ X("div", {
		"data-testid": g,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ X("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ Y(h, {
						name: _,
						size: 20
					}),
					/* @__PURE__ */ Y("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: _,
						"data-testid": `${g}-author`,
						children: _
					}),
					i !== null && /* @__PURE__ */ Y("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: zn(i)
					}),
					/* @__PURE__ */ Y("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", In[e]),
						"data-testid": `${g}-kind`,
						children: Fn[e]
					})
				]
			}),
			(v || a) && /* @__PURE__ */ X("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					v && /* @__PURE__ */ X("span", {
						"data-testid": `${g}-model`,
						children: ["powered by ", v]
					}),
					v && a && /* @__PURE__ */ Y("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ X("span", {
						"data-testid": `${g}-context`,
						children: ["in ", a]
					})
				]
			}),
			x && /* @__PURE__ */ X("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${g}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [b.length > 0 && /* @__PURE__ */ Y(Bn, {
					lines: b,
					tone: "delete",
					testId: `${g}-deleted`
				}), y.length > 0 && /* @__PURE__ */ Y(Bn, {
					lines: y,
					tone: "insert",
					testId: `${g}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ X("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ Y(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${g}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ Y(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${g}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ Y(r, {
						variant: "primary",
						size: "sm",
						onClick: f,
						"data-testid": `${g}-accept`,
						children: "Accept"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionReviewList.tsx
function Hn({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: d = "No suggestions", emptyBody: p = "Proposed changes to this document show up here for review.", title: m = "Suggestions", variant: h = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
	let y = e > 0 && (a || o), b = y || c ? /* @__PURE__ */ X("span", {
		className: "flex items-center gap-1.5",
		children: [
			c,
			y && o && /* @__PURE__ */ Y(r, {
				variant: "ghost",
				size: "sm",
				onClick: o,
				"data-testid": `${_}-reject-all`,
				children: "Reject all"
			}),
			y && a && /* @__PURE__ */ Y(r, {
				variant: "secondary",
				size: "sm",
				onClick: a,
				"data-testid": `${_}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, x = /* @__PURE__ */ X(J, { children: [s && /* @__PURE__ */ Y("div", {
		className: n("pt-2", h === "card" && "px-3"),
		children: /* @__PURE__ */ Y(l, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: s
		})
	}), e === 0 ? /* @__PURE__ */ Y(f, {
		size: "sm",
		title: d,
		body: p,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ Y("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return h === "pane" ? /* @__PURE__ */ X("div", {
		className: n("flex min-h-0 flex-1 flex-col", g),
		"data-testid": _,
		"data-variant": "pane",
		children: [/* @__PURE__ */ X("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Y("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${_}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), b]
		}), /* @__PURE__ */ Y("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: x
		})]
	}) : /* @__PURE__ */ X(i, {
		padding: "none",
		className: n("overflow-hidden", g),
		"data-testid": _,
		children: [/* @__PURE__ */ Y(v, {
			title: m,
			meta: /* @__PURE__ */ Y(u, {
				tone: "neutral",
				size: "xs",
				mono: !0,
				children: String(e)
			}),
			action: b
		}), x]
	});
}
//#endregion
//#region src/components/doc-editor/AuthenticatedDocumentImage.tsx
var Un = (e) => e.startsWith("/api/uploads/"), Wn = Ft(null);
function Gn({ children: e, ...t }) {
	return /* @__PURE__ */ Y(Wn.Provider, {
		value: t,
		children: e
	});
}
function Kn({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = It(Wn), o = a?.loadImage, s = a?.requiresAuthentication ?? Un, [c, l] = q(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
	return W(() => {
		if (!n || !u) return;
		let e = new AbortController(), t = null;
		return l(null), (async () => {
			try {
				if (!o) throw Error("Document image authentication is not configured");
				let r = await o(n, e.signal);
				if (e.signal.aborted) return;
				t = URL.createObjectURL(r), l({
					src: n,
					loader: o,
					url: t,
					failed: !1
				});
			} catch {
				e.signal.aborted || l({
					src: n,
					loader: o,
					url: null,
					failed: !0
				});
			}
		})(), () => {
			e.abort(), t && URL.revokeObjectURL(t);
		};
	}, [
		n,
		u,
		o
	]), /* @__PURE__ */ Y(zt, {
		as: "div",
		"data-testid": "canvas-document-image",
		"data-image-state": p ? "failed" : f ? "ready" : "loading",
		children: f && !p ? /* @__PURE__ */ Y("img", {
			src: f,
			alt: r,
			...i ? { title: i } : {},
			className: t ? "ProseMirror-selectednode" : void 0,
			draggable: !1
		}) : /* @__PURE__ */ Y("span", {
			className: p ? "text-sm italic text-danger-fg" : "text-sm italic text-text-tertiary",
			"data-testid": "canvas-document-image-fallback",
			children: p ? `Could not load ${r || "image"}` : "Loading image…"
		})
	});
}
function qn(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return Bt(Kn);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Jn({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = q(""), [l, d] = q(!1), [f, p] = q(null), h = K(!1);
	async function g(e) {
		if (!h.current) {
			h.current = !0, d(!0), p(null);
			try {
				await e(), a("");
			} catch (e) {
				p(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				h.current = !1, d(!1);
			}
		}
	}
	let v = e.reviewerName || e.reviewerId, y = e.state.replace(/_/g, " ");
	return /* @__PURE__ */ Y(k, {
		"aria-label": `Review by ${v}`,
		"aria-busy": l,
		children: /* @__PURE__ */ X(o, {
			gap: "sm",
			children: [
				/* @__PURE__ */ X(s, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Y("strong", { children: v }),
						/* @__PURE__ */ Y(u, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: y
						}),
						e.required && /* @__PURE__ */ Y(u, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Y(c, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Y("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Y("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				f && /* @__PURE__ */ Y(_, {
					tone: "error",
					children: f
				}),
				t && e.state === "pending" && /* @__PURE__ */ X(J, { children: [/* @__PURE__ */ Y(m, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: l,
					"aria-label": `Review comment for ${v}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ X(s, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "secondary",
						disabled: l,
						onClick: () => void g(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "primary",
						disabled: l,
						onClick: () => void g(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Y(r, {
					size: "sm",
					variant: "ghost",
					disabled: l,
					onClick: () => void g(() => n(e.requestKey)),
					children: "Withdraw review"
				})
			]
		})
	});
}
function Yn({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: c, onRequest: l, onDecide: u, onWithdraw: d }) {
	let [f, p] = q(""), [h, g] = q(""), [v, y] = q(!0), [b, C] = q(!1), [w, T] = q(null), E = K(!1);
	async function D() {
		if (!(!l || !t.some((e) => e.id === f) || E.current)) {
			E.current = !0, C(!0), T(null);
			try {
				await l({
					reviewerId: f,
					note: h.trim(),
					required: v
				}), g(""), p("");
			} catch (e) {
				T(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				E.current = !1, C(!1);
			}
		}
	}
	return /* @__PURE__ */ X(o, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Y(_, {
				tone: "error",
				children: a
			}),
			l && /* @__PURE__ */ X(o, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Y(x, {
						"aria-label": "Reviewer",
						placeholder: "Choose a reviewer",
						value: f,
						disabled: b || i,
						options: t.map((e) => ({
							value: e.id,
							label: e.displayName
						})),
						onChange: (e) => p(e.target.value)
					}),
					/* @__PURE__ */ Y(m, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: h,
						disabled: b,
						onChange: (e) => g(e.target.value)
					}),
					/* @__PURE__ */ X(s, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Y(S, {
							checked: v,
							onChange: y,
							disabled: b
						}), "Required review"]
					}),
					w && /* @__PURE__ */ Y(_, {
						tone: "error",
						children: w
					}),
					/* @__PURE__ */ Y(r, {
						size: "sm",
						disabled: b || i || !t.some((e) => e.id === f),
						onClick: () => void D(),
						children: b ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Y(N, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ Y(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: c,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ Y(Jn, {
					request: e,
					onDecide: e.reviewerId === n ? u : void 0,
					onWithdraw: d
				}, e.requestKey))
			})
		]
	});
}
//#endregion
export { un as AckMode, rt as ActionItemsCard, gn as ActivityFeed, Ue as AttachmentsPanel, Kn as AuthenticatedDocumentImageView, Le as CANVAS_BODY_KEY, He as CANVAS_SCHEMA_VERSION, _t as CanvasDocumentView, Te as CanvasLineSpacing, ln as ChunkViewer, Dn as CommentGhostPopover, Ke as CommentThreadNode, pe as DECK_THEMES, ct as DiffViewer, lt as DocumentEditorPage, Dt as DocumentFindBar, wt as DocumentGutter, Me as DocumentHeader, Gn as DocumentImageProvider, Jt as DocumentListPage, nt as DocumentModePill, gt as DocumentOutline, Be as DocumentOwnership, Yn as DocumentReviewPanel, Nt as DocumentRuler, ke as DocumentSaveStatus, Nn as DocumentShareDialog, Tt as DocumentStatusBar, yt as DocumentToolbar, Ce as EditorToolbar, Ze as ExecutiveSummaryCard, An as FloatingDockBar, Ne as FollowModeBar, ot as HeaderBanner, ut as KeyDecisionsCard, De as LINE_SPACINGS, we as LINE_SPACING_LABELS, jt as MAX_ATTACHMENT_BYTES, re as MAX_BULLETS_PER_SLIDE, se as MAX_BULLET_CHARS, he as MAX_CHART_LABELS, R as MAX_CHART_SERIES, z as MAX_EYEBROW_CHARS, Et as MAX_IMAGE_BYTES, de as MAX_NOTES_CHARS, ce as MAX_QUOTE_CHARS, ie as MAX_SLIDES, B as MAX_SOURCES_PER_SLIDE, ne as MAX_SUBTITLE_CHARS, ge as MAX_TITLE_CHARS, pt as MentionDropdown, qe as MyMentionsPanel, A as NewDocumentModal, Pt as PX_PER_INCH, tt as ParticipantAvatars, me as PresentationEditor, j as PresentationView, xn as ProposalCard, Ye as ReaderMode, $e as ReviewMode, nn as ReviewProgress, sn as ReviewableItem, jn as SHARE_ROLES, ye as SLIDE_ID_PATTERN, L as SLIDE_LAYOUTS, ve as SLIDE_LAYOUT_LABELS, Q as SUGGESTION_AUTHORING_MODES, ft as SectionBlock, Qe as SectionComments, je as SectionList, Xe as SectionSummariesCard, I as SlideForm, le as SlideList, fe as SlideRow, ue as SlideSources, $t as StandaloneTiptap, Vn as SuggestionCard, Pn as SuggestionModeControl, Hn as SuggestionReviewList, st as TableOfContents, w as TaskItemRow, T as TaskList, H as TiptapEditor, at as VersionHistoryPanel, We as VideoCallPanel, kn as VideoDockSlot, et as VideoHistoryPanel, Sn as WorkItemRow, St as ZOOM_FIT, xt as ZOOM_STEPS, kt as acceptsDocumentImage, P as addSlide, D as canSaveDeck, ht as canvasBody, Pe as canvasFragmentToMarkdown, Yt as clientIdForUser, dt as countAllComments, qn as createAuthenticatedDocumentImage, _e as duplicateSlide, Re as findDocumentTarget, At as findMatches, it as generateSummaryBullets, mt as getInitials, Ae as isCanvasDocument, Se as isLineSpacing, Ee as lineSpacingAttributes, F as makeSlide, O as moveSlide, vt as nextMatchIndex, ee as nextRevisionLabel, M as nextSlideId, Oe as parseLineSpacing, bt as readOutline, Ge as readSchemaVersion, Je as relativeTime, oe as removeSlide, E as replaceSlide, En as replyLabel, ze as scrollToDocumentTarget, Mt as stackOffsets, V as svgDataUri, ae as uncitedSlideIds, Ie as useDocumentActions, Ct as useDocumentImageUpload, Ot as useDocumentOutline, Xt as useFollowCursor, Fe as useIsCanvasDocument, Ve as useSidebarPanels, te as withLayoutDefaults };
