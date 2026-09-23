import { n as e, t } from "./useWebSocket-C9oAM0NL.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { _ as r } from "./overlayStack-CHdlnODN.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { n as o, t as s } from "./Stack-CkiMw5K0.js";
import { i as c, r as l } from "./Text-nbwye3hS.js";
import { t as u } from "./Banner-6sJQ2hAL.js";
import { t as d } from "./Chip-B_HZn3xl.js";
import { t as f } from "./Modal-DMFNRUDx.js";
import { t as p } from "./EmptyState-DFWbBBcY.js";
import { t as m } from "./SegmentedControl-X19S_gNQ.js";
import { n as h } from "./Tabs-BGZyr2nH.js";
import { t as g } from "./Input-DLknWXri.js";
import { t as _ } from "./Textarea-Dz4doxTv.js";
import { t as v } from "./Avatar-DeJWic2B.js";
import { t as y } from "./InlineAlert-CRnIKeAF.js";
import { t as b } from "./CardHeader-CsPhVpCm.js";
import { t as x } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as S } from "./InlinePopover-DtYo8_ZC.js";
import { t as C } from "./Badge-C23_Y4Yj.js";
import { t as w } from "./ChangeDiff-CzO8zCc-.js";
import { t as T } from "./Select-D5mMMegw.js";
import { t as E } from "./Checkbox-Dftwml_V.js";
import { n as D } from "./FileKindMark-Ovzug-VD.js";
import { t as O } from "./activationKey-CjbL3LUv.js";
import { A as k, k as A } from "./renderers-BX3ZB5kO.js";
import { A as j, B as ee, C as M, D as N, E as P, F, G as I, H as L, I as R, L as z, M as te, N as B, O as V, P as H, R as ne, S as U, T as re, V as ie, _ as ae, a as oe, b as se, c as ce, d as le, f as ue, g as de, h as fe, i as pe, j as me, k as he, l as ge, m as _e, n as ve, o as ye, p as be, r as xe, s as Se, t as Ce, u as we, v as Te, w as Ee, x as De, y as Oe, z as ke } from "./PresentationEditor-SWVtuiCN.js";
import { o as Ae, t as je } from "./VerdictChip-Bp8XP18h.js";
import { a as Me, c as Ne, i as Pe, n as Fe, o as Ie, r as Le, s as Re, t as W } from "./TiptapEditor-Kdj65m6g.js";
import { i as ze, n as Be, r as Ve, t as He } from "./FloatingComposerDock-DMUQCjea.js";
import { A as Ue, B as We, C as Ge, D as Ke, E as qe, F as Je, H as Ye, I as Xe, L as Ze, M as Qe, N as $e, O as et, P as tt, R as nt, S as rt, T as it, U as at, V as ot, W as st, _ as ct, a as lt, b as ut, c as dt, d as ft, f as pt, g as mt, h as ht, i as gt, j as _t, k as vt, l as yt, m as bt, o as xt, p as St, r as Ct, s as wt, t as Tt, u as Et, v as Dt, w as Ot, x as kt, y as At, z as jt } from "./DocumentEditorPage-CjcAqj6I.js";
import { S as Mt, _ as Nt, a as Pt, b as Ft, c as It, d as Lt, f as Rt, g as zt, h as Bt, i as Vt, l as Ht, m as Ut, n as Wt, o as Gt, p as Kt, r as qt, s as Jt, t as Yt, u as Xt, v as Zt, x as Qt, y as $t } from "./useDocumentImageUpload-DYBLg7f8.js";
import { createContext as en, useCallback as G, useContext as tn, useEffect as K, useId as nn, useImperativeHandle as rn, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import * as an from "yjs";
import { NodeViewWrapper as on, ReactNodeViewRenderer as sn } from "@tiptap/react";
import { relativePositionToAbsolutePosition as cn, ySyncPluginKey as ln } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function un(e) {
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
var dn = {
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
function fn({ status: e }) {
	let t = dn[e] ?? dn.draft;
	return /* @__PURE__ */ Z("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var pn = {
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
function mn({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Q("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = pn[e.mode ?? "editor"] ?? pn.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ Q("button", {
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
					/* @__PURE__ */ Z("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ Z("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ Z("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ Q("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function hn({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = Y(!1), [u, d] = Y(null), [f, p] = Y(null), [m, h] = Y(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = q(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = G((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ Q("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ Q("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ Z("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ Q("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ Z("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ Z("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ Z("div", {
				className: n("flex flex-col gap-3"),
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ Q("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: O(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ Z("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ Q("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ Q("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ Z("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ Z(fn, { status: e.status }),
											e.type && /* @__PURE__ */ Z("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ Q("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ Z("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ Z("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ Q("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", un(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Z("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Z(mn, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ Z("button", {
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
			e.length > 10 && /* @__PURE__ */ Q("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ Z("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ Q("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ Z("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ Z(I, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function gn(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function _n({ editor: e, provider: t, followClientId: n, onLost: r }) {
	K(() => {
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
				let t = ln.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = cn(t.doc, t.type, an.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var vn = "prosemirror";
function yn(e) {
	return e.ydoc !== void 0;
}
function bn(e) {
	return yn(e) ? /* @__PURE__ */ Z(xn, { ...e }) : /* @__PURE__ */ Z(Sn, { ...e });
}
function xn({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = vn, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = q(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = J(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Z("div", {
		className: n(c),
		children: /* @__PURE__ */ Z(W, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Sn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = vn, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = J(/* @__PURE__ */ new Set()), _ = G((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = G((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = q(() => ({
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
	}), w = q(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = J(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ Z("div", {
		className: n(d),
		children: /* @__PURE__ */ Z(W, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ Z("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function Cn({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ Q("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ Q("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ Q("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ Q("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ Z("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ Z("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var wn = {
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
}, Tn = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, En = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Dn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = Y(!1), [o, s] = Y(""), [c, l] = Y("none"), u = J(e.status), d = wn[e.status] ?? En, f = Tn[e.priority] ?? "var(--color-neutral)", [p, m] = Y(!1), h = J(null);
	K(() => () => {
		h.current && clearTimeout(h.current);
	}, []), K(() => {
		u.current === "pending" && e.status === "acked" ? l("ack") : u.current === "pending" && e.status === "rejected" && l("reject"), u.current = e.status;
	}, [e.status]);
	let g = () => {
		p || (m(!0), l("ack"), h.current = setTimeout(() => {
			h.current = null, t(o || void 0), s(""), a(!1), m(!1);
		}, 150));
	}, v = () => {
		if (!p) {
			if (!o.trim()) {
				a(!0);
				return;
			}
			m(!0), l("reject"), h.current = setTimeout(() => {
				h.current = null, r(o), s(""), a(!1), m(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ Q("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ Q("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ Z("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ Z("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ Z("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ Q("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ Z("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ Q("span", { children: [
					"Approved by ",
					/* @__PURE__ */ Z("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ Q(X, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Q(X, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ Q("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ Z("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ Q("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ Z("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ Q(X, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Q(X, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ Q("div", { children: [/* @__PURE__ */ Q("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ Z("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: p,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ Z("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ Q("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ Z(_, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && g()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ Q("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ Z("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ Z("button", {
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
var On = {
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
function kn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = On[e.type] ?? On.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ Q("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ Z("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ Z("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ Z("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ Z(W, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ Q("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ Q("div", { children: [e.items.map((e) => /* @__PURE__ */ Z(Dn, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ Q("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ Z(mt, {
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
var $ = 4;
function An({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = Y(0), _ = Math.max(1, Math.ceil(e.length / $)), v = h * $, y = e.slice(v, v + $);
	if (K(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / $)), s?.());
	}, [
		o,
		e.length,
		s
	]), K(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ Z("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ Q("div", { children: [
		/* @__PURE__ */ Z(Cn, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ Z("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ Q("div", { children: [a.length > 0 && /* @__PURE__ */ Q("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ Z("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ Z("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ Z(kn, {
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
		/* @__PURE__ */ Q("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ Z("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ Q("span", {
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
				/* @__PURE__ */ Z("button", {
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
function jn(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Mn(e, t) {
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
function Nn(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Pn(e) {
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
function Fn(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function In({ events: e, participants: t }) {
	let [r, i] = Y(!1);
	return /* @__PURE__ */ Q("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ Q("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ Q("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ Z("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ Q(X, { children: [t.length > 0 && /* @__PURE__ */ Q("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ Z("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ Q("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ Z("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					Fn(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ Z("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ Z("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ Q("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ Z("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: Nn(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ Q("div", { children: [
						/* @__PURE__ */ Z("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ Q("span", {
							className: n("text-neutral"),
							children: [
								jn(e.eventType),
								" ",
								Mn(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Z("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Pn(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var Ln = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Rn = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function zn({ label: e, children: t }) {
	return /* @__PURE__ */ Q("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ Z("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ Z("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var Bn = {
	field: "Field change",
	prose: "Body text"
};
function Vn({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: u, edits: f, rationale: p, draftError: m, author: h, category: _, path: y, locationHint: b, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: T, onRereview: E, onAccept: D, onReject: O, onRedraft: k, onReattach: A, onConfirmAttachment: j, className: ee, "data-testid": M = "proposal-card" }) {
	let [N, P] = Y(!1), [F, I] = Y(null), [L, R] = Y(!1), [z, te] = Y(""), B = i === "applied", V = i === "rejected", H = B || V;
	async function ne() {
		P(!0), I(null);
		try {
			let e = await D();
			I(e);
		} catch (e) {
			I({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			P(!1);
		}
	}
	let U = t === "prose" ? f ?? [] : [{
		before: l ?? "",
		after: u ?? ""
	}];
	return /* @__PURE__ */ Q("div", {
		"data-testid": M,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", B ? "border-success-border" : "border-border", V && "opacity-60", ee),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${M}-category`,
						children: _ ?? Bn[t]
					}),
					h && /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${M}-requester`,
						children: [/* @__PURE__ */ Z(v, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ Z("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					/* @__PURE__ */ Z(d, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${M}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Z(d, {
						tone: Rn[a],
						size: "sm",
						children: Ln[a]
					}),
					o === "healed" && /* @__PURE__ */ Z(d, {
						tone: "caution",
						size: "sm",
						"data-testid": `${M}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ Z(d, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					B && /* @__PURE__ */ Z(d, {
						tone: "success",
						size: "sm",
						"data-testid": `${M}-applied`,
						children: "Applied"
					}),
					V && /* @__PURE__ */ Z(d, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ Q("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ Z(Ae, {
				path: y ?? (s ? [s] : []),
				...b ? { hint: b } : {},
				"data-testid": `${M}-location`
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ Z(zn, {
					label: "Why",
					children: c
				}), p && /* @__PURE__ */ Z(zn, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Z("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${M}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ Z("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${M}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && U.length > 0 && /* @__PURE__ */ Z(w, {
				pairs: U,
				"data-testid": `${M}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Z(je, {
				verdict: x,
				status: S,
				error: C,
				revision: T,
				"data-testid": `${M}-verdict`
			}),
			F && !F.ok && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${M}-apply-error`,
				children: [
					/* @__PURE__ */ Z("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Z("span", { children: F.message ?? "The document refused the change." }),
					F.stale && /* @__PURE__ */ Q("span", { children: [
						"Drafted against ",
						JSON.stringify(F.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(F.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!H && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: N || i === "drafting" || !!m,
						onClick: ne,
						"data-testid": `${M}-accept`,
						children: N ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: () => R((e) => !e),
						"data-testid": `${M}-reject`,
						children: "Reject"
					}),
					k && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: k,
						"data-testid": `${M}-redraft`,
						children: "Re-draft"
					}),
					E && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: E,
						"data-testid": `${M}-rereview`,
						children: "Re-run review"
					}),
					A && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: A,
						"data-testid": `${M}-reattach`,
						children: "Move…"
					}),
					j && o === "author_only" && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: N,
						onClick: j,
						"data-testid": `${M}-confirm`,
						children: "Right place"
					})
				]
			}),
			L && !H && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${M}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Z(g, {
						id: `${M}-reason`,
						size: "sm",
						value: z,
						onChange: (e) => te(e.target.value),
						"data-testid": `${M}-reason`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								O(z), R(!1);
							},
							"data-testid": `${M}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => R(!1),
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
function Hn({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: u, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...f ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = p.filter((e) => !b.has(e.id));
	return /* @__PURE__ */ Z(i, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ Z(d, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), c && /* @__PURE__ */ Z(d, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ Q("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				s && /* @__PURE__ */ Z("p", {
					className: "text-xs text-text-tertiary",
					children: s
				}),
				u && /* @__PURE__ */ Z("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: u
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: l,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: l ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && y.length > 0 && /* @__PURE__ */ Q("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ Q(r, {
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
				a && x.length > 0 && /* @__PURE__ */ Q("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ Z(T, {
						size: "sm",
						value: "",
						placeholder: "Choose a section…",
						options: x.map((e) => ({
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
var Un = "[data-comment-id]", Wn = 240;
function Gn(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Kn(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function qn({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
	let [u, f] = Y(null), p = J(null), m = J(null), h = J(null);
	h.current = u;
	let g = q(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = J(g);
	_.current = g;
	let y = G(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), b = G(() => {
		y(), f(null);
	}, [y]), x = G((e, n, r) => {
		if (y(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Gn(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [y, t]);
	rn(c, () => ({
		openComment: (e, t) => x(e, t, "click"),
		close: b
	}), [x, b]);
	let C = J(null), w = u?.id ?? null;
	K(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), K(() => y, [y]), K(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Un) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (h.current?.id === n) {
					b();
					return;
				}
				x(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (y(), h.current?.id !== a && (m.current = setTimeout(() => x(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (y(), m.current = setTimeout(() => {
				h.current?.via === "hover" && b();
			}, Wn));
		};
		return e.addEventListener("click", a), e.addEventListener("mouseover", o), e.addEventListener("mouseout", s), () => {
			e.removeEventListener("click", a), e.removeEventListener("mouseover", o), e.removeEventListener("mouseout", s);
		};
	}, [
		t,
		i,
		n,
		x,
		b,
		y
	]);
	let T = w ? g.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), b());
	};
	return /* @__PURE__ */ Z(S, {
		trigger: p,
		open: !!T,
		onClose: b,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": l,
		children: T && /* @__PURE__ */ Q("div", {
			"data-testid": `${l}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: y,
			onMouseLeave: () => {
				y(), m.current = setTimeout(() => {
					h.current?.via === "hover" && b();
				}, Wn);
			},
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Z(v, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ Z("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ Z("span", {
							className: "text-[11px] text-text-tertiary",
							children: ut(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ Z(d, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ Z("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ Z("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Z("span", {
						"data-testid": `${l}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Kn(T.replyCount ?? 0)
					}), /* @__PURE__ */ Q("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${l}-open`,
							children: "Open thread"
						}), s && !T.resolved && /* @__PURE__ */ Z(r, {
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
function Jn() {
	return /* @__PURE__ */ Q("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ Z("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ Z("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function Yn({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
	let [h, g] = Y(!1), _ = G((e) => {
		e.preventDefault(), t && g(!0), l?.(e);
	}, [t, l]), v = G((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (g(!1), u?.(e));
	}, [u]), y = G((e) => {
		e.preventDefault(), g(!1), t && d?.(e);
	}, [t, d]);
	return !e && !t ? null : /* @__PURE__ */ Z("div", {
		"data-testid": m,
		"data-docked": String(e),
		"data-drag-over": String(h),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: _,
		onDragLeave: v,
		onDrop: y,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", h ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", f),
		children: e ? /* @__PURE__ */ Q("div", {
			"data-testid": `${m}-content`,
			className: "relative w-full",
			children: [p, c && /* @__PURE__ */ Z("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ Z(a, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${m}-undock`,
					icon: /* @__PURE__ */ Z(Jn, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ Q("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${m}-dropzone`,
			className: n("flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", h ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ Z("span", {
				className: "text-xs text-text-tertiary",
				children: o
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function Xn({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ Z("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ Z("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ Z("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ Z("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var Zn = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], Qn = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function $n({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": p = "document-share-dialog" }) {
	let [m, h] = Y(""), g = () => {
		let e = m.trim();
		!e || !l || (l(e), h(""));
	};
	return /* @__PURE__ */ Z(f, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-4",
			"data-testid": p,
			children: [
				l && /* @__PURE__ */ Q("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Z("input", {
						value: m,
						onChange: (e) => h(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && g();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${p}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						onClick: g,
						disabled: !m.trim(),
						"data-testid": `${p}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ Z("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${p}-notice`,
					children: d
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${p}-people`,
					children: i.map((e) => /* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2",
						"data-testid": `${p}-person`,
						children: [
							/* @__PURE__ */ Z(v, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ Z("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ Z("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${p}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ Z("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${p}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: Zn.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Z("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ Z("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${p}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(Qn).map((e) => /* @__PURE__ */ Z("option", {
							value: e,
							children: Qn[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ Z(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${p}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ Z("span", {}), /* @__PURE__ */ Z(r, {
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
var er = [
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
function tr({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = er.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = er.find((t) => t.value === e);
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Z(m, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ Z("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var nr = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, rr = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, ir = 6, ar = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function or(e) {
	let t = ar.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function sr(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function cr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, ir), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Q("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Z(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > ir && /* @__PURE__ */ Q("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - ir,
				" more"
			]
		})]
	});
}
function lr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = or(t.trim() === "" ? "Unknown author" : t.trim()), y = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = y.length > 0 || b.length > 0;
	return /* @__PURE__ */ Q("div", {
		"data-testid": h,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ Z(v, {
						name: g,
						size: 20
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: g,
						"data-testid": `${h}-author`,
						children: g
					}),
					i !== null && /* @__PURE__ */ Z("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: sr(i)
					}),
					/* @__PURE__ */ Z("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", rr[e]),
						"data-testid": `${h}-kind`,
						children: nr[e]
					})
				]
			}),
			(_ || a) && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					_ && /* @__PURE__ */ Q("span", {
						"data-testid": `${h}-model`,
						children: ["powered by ", _]
					}),
					_ && a && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ Q("span", {
						"data-testid": `${h}-context`,
						children: ["in ", a]
					})
				]
			}),
			x && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${h}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [b.length > 0 && /* @__PURE__ */ Z(cr, {
					lines: b,
					tone: "delete",
					testId: `${h}-deleted`
				}), y.length > 0 && /* @__PURE__ */ Z(cr, {
					lines: y,
					tone: "insert",
					testId: `${h}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ Q("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ Z(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${h}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ Z(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${h}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ Z(r, {
						variant: "primary",
						size: "sm",
						onClick: f,
						"data-testid": `${h}-accept`,
						children: "Accept"
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionReviewList.tsx
function ur({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: l = "No suggestions", emptyBody: f = "Proposed changes to this document show up here for review.", title: m = "Suggestions", variant: h = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
	let v = e > 0 && (a || o), y = v || c ? /* @__PURE__ */ Q("span", {
		className: "flex items-center gap-1.5",
		children: [
			c,
			v && o && /* @__PURE__ */ Z(r, {
				variant: "ghost",
				size: "sm",
				onClick: o,
				"data-testid": `${_}-reject-all`,
				children: "Reject all"
			}),
			v && a && /* @__PURE__ */ Z(r, {
				variant: "secondary",
				size: "sm",
				onClick: a,
				"data-testid": `${_}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, x = /* @__PURE__ */ Q(X, { children: [s && /* @__PURE__ */ Z("div", {
		className: n("pt-2", h === "card" && "px-3"),
		children: /* @__PURE__ */ Z(u, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: s
		})
	}), e === 0 ? /* @__PURE__ */ Z(p, {
		size: "sm",
		title: l,
		body: f,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ Z("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return h === "pane" ? /* @__PURE__ */ Q("div", {
		className: n("flex min-h-0 flex-1 flex-col", g),
		"data-testid": _,
		"data-variant": "pane",
		children: [/* @__PURE__ */ Q("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${_}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), y]
		}), /* @__PURE__ */ Z("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: x
		})]
	}) : /* @__PURE__ */ Q(i, {
		padding: "none",
		className: n("overflow-hidden", g),
		"data-testid": _,
		children: [/* @__PURE__ */ Z(b, {
			title: m,
			meta: /* @__PURE__ */ Z(d, {
				tone: "neutral",
				size: "xs",
				mono: !0,
				children: String(e)
			}),
			action: y
		}), x]
	});
}
//#endregion
//#region src/components/doc-editor/AuthenticatedDocumentImage.tsx
var dr = (e) => e.startsWith("/api/uploads/"), fr = en(null);
function pr({ children: e, ...t }) {
	return /* @__PURE__ */ Z(fr.Provider, {
		value: t,
		children: e
	});
}
function mr({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = tn(fr), o = a?.loadImage, s = a?.requiresAuthentication ?? dr, [c, l] = Y(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
	return K(() => {
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
	]), /* @__PURE__ */ Z(on, {
		as: "div",
		"data-testid": "canvas-document-image",
		"data-image-state": p ? "failed" : f ? "ready" : "loading",
		children: f && !p ? /* @__PURE__ */ Z("img", {
			src: f,
			alt: r,
			...i ? { title: i } : {},
			className: t ? "ProseMirror-selectednode" : void 0,
			draggable: !1
		}) : /* @__PURE__ */ Z("span", {
			className: p ? "text-sm italic text-danger-fg" : "text-sm italic text-text-tertiary",
			"data-testid": "canvas-document-image-fallback",
			children: p ? `Could not load ${r || "image"}` : "Loading image…"
		})
	});
}
function hr(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return sn(mr);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function gr({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = Y(""), [c, u] = Y(!1), [f, p] = Y(null), m = J(!1);
	async function h(e) {
		if (!m.current) {
			m.current = !0, u(!0), p(null);
			try {
				await e(), a("");
			} catch (e) {
				p(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				m.current = !1, u(!1);
			}
		}
	}
	let g = e.reviewerName || e.reviewerId, v = e.state.replace(/_/g, " ");
	return /* @__PURE__ */ Z(L, {
		"aria-label": `Review by ${g}`,
		"aria-busy": c,
		children: /* @__PURE__ */ Q(o, {
			gap: "sm",
			children: [
				/* @__PURE__ */ Q(s, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Z("strong", { children: g }),
						/* @__PURE__ */ Z(d, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: v
						}),
						e.required && /* @__PURE__ */ Z(d, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Z(l, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				f && /* @__PURE__ */ Z(y, {
					tone: "error",
					children: f
				}),
				t && e.state === "pending" && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(_, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: c,
					"aria-label": `Review comment for ${g}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ Q(s, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: c,
						onClick: () => void h(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: c,
						onClick: () => void h(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Z(r, {
					size: "sm",
					variant: "ghost",
					disabled: c,
					onClick: () => void h(() => n(e.requestKey)),
					children: "Withdraw review"
				})
			]
		})
	});
}
function _r({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: c, onRequest: l, onDecide: u, onWithdraw: d }) {
	let [f, p] = Y(""), [m, h] = Y(""), [g, v] = Y(!0), [b, x] = Y(!1), [S, C] = Y(null), w = J(!1);
	async function D() {
		if (!(!l || !t.some((e) => e.id === f) || w.current)) {
			w.current = !0, x(!0), C(null);
			try {
				await l({
					reviewerId: f,
					note: m.trim(),
					required: g
				}), h(""), p("");
			} catch (e) {
				C(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				w.current = !1, x(!1);
			}
		}
	}
	return /* @__PURE__ */ Q(o, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Z(y, {
				tone: "error",
				children: a
			}),
			l && /* @__PURE__ */ Q(o, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Z(T, {
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
					/* @__PURE__ */ Z(_, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: b,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ Q(s, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Z(E, {
							checked: g,
							onChange: v,
							disabled: b
						}), "Required review"]
					}),
					S && /* @__PURE__ */ Z(y, {
						tone: "error",
						children: S
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						disabled: b || i || !t.some((e) => e.id === f),
						onClick: () => void D(),
						children: b ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Z(ie, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ Z(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: c,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ Z(gr, {
					request: e,
					onDecide: e.reviewerId === n ? u : void 0,
					onWithdraw: d
				}, e.requestKey))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/EditorShell.tsx
var vr = [
	{
		id: "editor",
		label: "Editor"
	},
	{
		id: "comments",
		label: "Comments"
	},
	{
		id: "versions",
		label: "Versions"
	},
	{
		id: "history",
		label: "History"
	}
];
function yr({ filled: e }) {
	return /* @__PURE__ */ Z("svg", {
		width: 16,
		height: 16,
		viewBox: "0 0 16 16",
		fill: e ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: 1.4,
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Z("path", { d: "M8 1.9l1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.3l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.9Z" })
	});
}
function br({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: o, starred: s = !1, onStarredChange: l, statusPill: u, participants: d, onParticipantClick: f, onFollowParticipant: p, followingParticipantId: m, meta: g, saveState: _, headActions: v, tabs: y, activeTab: b, onTabChange: S, toolbar: w, children: T, footer: E, surface: O = "workspace", explorer: k, workbench: A, label: j = "Editor", className: M, "data-testid": N = "editor-shell" }) {
	let P = `${N}-${nn().replace(/:/g, "")}`, F = !!y && y.length > 0, I = F ? y.some((e) => e.id === b) ? b : y[0].id : void 0, L = d && d.length > 0 || g != null || !!_, R = /* @__PURE__ */ Q("section", {
		"aria-label": j,
		"data-testid": N,
		"data-surface": O,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ Q("header", {
				className: "flex flex-col gap-1 border-b border-border px-4 pt-2.5",
				"data-testid": `${N}-header`,
				children: [
					e && e.length > 0 && /* @__PURE__ */ Z(c, {
						items: e,
						maxItems: 4,
						className: "text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${N}-crumbs`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-start gap-3",
						children: [/* @__PURE__ */ Q("div", {
							className: "flex min-w-0 flex-1 flex-col gap-1 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
							children: [/* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
								children: [
									o && /* @__PURE__ */ Z(D, {
										kind: o,
										"data-testid": `${N}-kind`
									}),
									r ? /* @__PURE__ */ Z(ee, {
										value: t,
										onCommit: r,
										label: i,
										required: !0,
										className: "min-w-[10rem] max-w-full flex-1 basis-0 text-lg",
										"data-testid": `${N}-title`
									}) : /* @__PURE__ */ Z("h1", {
										className: "m-0 min-w-[10rem] max-w-full flex-1 basis-0 truncate text-lg font-semibold text-text-primary",
										"data-testid": `${N}-title`,
										children: t
									}),
									l && /* @__PURE__ */ Z(a, {
										size: "sm",
										"aria-label": s ? "Remove star" : "Star this file",
										"aria-pressed": s,
										title: s ? "Starred" : "Star",
										onClick: () => l(!s),
										className: s ? "text-primary" : "text-text-tertiary",
										"data-testid": `${N}-star`,
										children: /* @__PURE__ */ Z(yr, { filled: s })
									}),
									u
								]
							}), L && /* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-wrap items-center gap-2 text-xs text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
								"data-testid": `${N}-byline`,
								children: [
									d && d.length > 0 && /* @__PURE__ */ Z(x, {
										users: d,
										size: 22,
										maxVisible: 4,
										...f ? { onUserClick: f } : {},
										...p ? {
											onFollowUser: p,
											followingUserId: m ?? null
										} : {}
									}),
									g != null && /* @__PURE__ */ Z("span", {
										className: "min-w-0 truncate",
										children: g
									}),
									/* @__PURE__ */ Z(Qe, { state: _ })
								]
							})]
						}), v && /* @__PURE__ */ Z("div", {
							className: "flex shrink-0 items-center gap-1.5",
							"data-testid": `${N}-actions`,
							children: v
						})]
					}),
					F ? /* @__PURE__ */ Z(h, {
						items: y.map((e) => ({
							id: e.id,
							label: e.label,
							...e.disabled ? { disabled: !0 } : {},
							...e.count ? { badge: /* @__PURE__ */ Z(C, {
								variant: "count",
								value: e.count,
								color: "muted",
								"aria-label": `${e.count} in ${e.label}`
							}) } : {},
							testId: `${N}-tab-${e.id}`
						})),
						value: I,
						onValueChange: (e) => S?.(e),
						variant: "underline",
						size: "sm",
						"aria-label": `${t} sections`,
						idPrefix: P,
						className: "-mb-px mt-1 border-b-0"
					}) : /* @__PURE__ */ Z("span", {
						className: "h-2",
						"aria-hidden": "true"
					})
				]
			}),
			w && /* @__PURE__ */ Z("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${N}-toolbar`,
				children: w
			}),
			/* @__PURE__ */ Q("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", O === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${N}-surface`,
				children: [/* @__PURE__ */ Z("div", {
					...F ? {
						role: "tabpanel",
						id: `${P}-panel-${I}`,
						"aria-labelledby": `${P}-tab-${I}`
					} : {},
					className: "min-h-0 flex-1 overflow-auto",
					"data-testid": `${N}-scroller`,
					children: T
				}), E != null && /* @__PURE__ */ Z("div", {
					className: "relative z-20 flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
					"data-testid": `${N}-dock`,
					children: /* @__PURE__ */ Z(He.Provider, {
						value: "pinned",
						children: E
					})
				})]
			})
		]
	});
	return !k && !A ? /* @__PURE__ */ Z("div", {
		className: n("flex h-full min-h-0 flex-col", M),
		children: R
	}) : /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", M),
		"data-testid": `${N}-frame`,
		children: [k && /* @__PURE__ */ Z("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${N}-explorer`,
			children: k
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [R, A && /* @__PURE__ */ Z("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${N}-workbench`,
				children: A
			})]
		})]
	});
}
//#endregion
export { An as AckMode, yt as ActionItemsCard, In as ActivityFeed, rt as AttachmentsPanel, mr as AuthenticatedDocumentImageView, jt as CANVAS_BODY_KEY, We as CANVAS_SCHEMA_VERSION, Pt as CanvasDocumentView, Fe as CanvasLineSpacing, kn as ChunkViewer, qn as CommentGhostPopover, ct as CommentThreadNode, He as ComposerDockPlacementContext, we as DECK_THEMES, vr as DEFAULT_EDITOR_SHELL_TABS, Be as DOCK_HEIGHT_VAR, Ve as DOCK_INSET_VAR, Lt as DOCUMENT_TOOLBAR_BREAKPOINTS, wt as DiffViewer, Tt as DocumentEditorPage, Gt as DocumentFindBar, Ht as DocumentGutter, Ke as DocumentHeader, pr as DocumentImageProvider, et as DocumentLifecyclePill, hn as DocumentListPage, _t as DocumentModePill, Ft as DocumentOutline, Ue as DocumentOwnership, _r as DocumentReviewPanel, Qt as DocumentRuler, Qe as DocumentSaveStatus, $n as DocumentShareDialog, Nt as DocumentStatusBar, Rt as DocumentToolbar, br as EditorShell, Ne as EditorToolbar, pt as ExecutiveSummaryCard, ce as Filmstrip, ge as FilmstripThumb, ze as FloatingComposerDock, Xn as FloatingDockBar, qe as FollowModeBar, St as HeaderBanner, Et as KeyDecisionsCard, Le as LINE_SPACINGS, Pe as LINE_SPACING_LABELS, Yt as MAX_ATTACHMENT_BYTES, le as MAX_BULLETS_PER_SLIDE, ue as MAX_BULLET_CHARS, be as MAX_CHART_LABELS, _e as MAX_CHART_SERIES, fe as MAX_EYEBROW_CHARS, Wt as MAX_IMAGE_BYTES, de as MAX_NOTES_CHARS, ae as MAX_QUOTE_CHARS, Te as MAX_SLIDES, Oe as MAX_SOURCES_PER_SLIDE, se as MAX_SUBTITLE_CHARS, De as MAX_TITLE_CHARS, kt as MentionDropdown, lt as MyMentionsPanel, I as NewDocumentModal, Mt as PX_PER_INCH, $e as ParticipantAvatars, Ce as PresentationEditor, ke as PresentationView, Vn as ProposalCard, dt as ReaderMode, ht as ReviewMode, Cn as ReviewProgress, Dn as ReviewableItem, Zn as SHARE_ROLES, U as SLIDE_ID_PATTERN, xe as SLIDE_INSERTS, M as SLIDE_LAYOUTS, Ee as SLIDE_LAYOUT_LABELS, er as SUGGESTION_AUTHORING_MODES, Ot as SectionBlock, mt as SectionComments, Ge as SectionList, ft as SectionSummariesCard, ye as SlideForm, R as SlideList, z as SlideRow, Se as SlideSources, oe as SlideStage, pe as SlidesToolbar, ve as SpeakerNotes, bn as StandaloneTiptap, lr as SuggestionCard, tr as SuggestionModeControl, ur as SuggestionReviewList, Ct as TableOfContents, k as TaskItemRow, A as TaskList, W as TiptapEditor, xt as VersionHistoryPanel, it as VideoCallPanel, Yn as VideoDockSlot, gt as VideoHistoryPanel, Hn as WorkItemRow, vt as WorkspaceDocumentHeaderNotices, Zt as ZOOM_FIT, $t as ZOOM_STEPS, qt as acceptsDocumentImage, re as addSlide, P as canSaveDeck, ot as canvasBody, Ze as canvasFragmentToMarkdown, gn as clientIdForUser, Dt as countAllComments, hr as createAuthenticatedDocumentImage, Kt as documentToolbarSize, N as duplicateSlide, tt as findDocumentTarget, Jt as findMatches, bt as generateSummaryBullets, At as getInitials, Ye as isCanvasDocument, Me as isLineSpacing, Ie as lineSpacingAttributes, V as makeSlide, he as moveSlide, It as nextMatchIndex, j as nextRevisionLabel, me as nextSlideId, Re as parseLineSpacing, Bt as readOutline, at as readSchemaVersion, ut as relativeTime, te as removeSlide, B as replaceSlide, Kn as replyLabel, Je as scrollToDocumentTarget, Xt as stackOffsets, ne as svgDataUri, H as uncitedSlideIds, nt as useDocumentActions, Vt as useDocumentImageUpload, zt as useDocumentOutline, Ut as useDocumentToolbarSize, _n as useFollowCursor, st as useIsCanvasDocument, Xe as useSidebarPanels, F as withLayoutDefaults };
