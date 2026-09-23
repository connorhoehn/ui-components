import { n as e, t } from "./useWebSocket-C9oAM0NL.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { _ as r } from "./overlayStack-CHdlnODN.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-DDeXW3mZ.js";
import { n as o, t as s } from "./Stack-CkiMw5K0.js";
import { i as c, r as l } from "./Text-DpIU0dw3.js";
import { t as u } from "./Banner-6sJQ2hAL.js";
import { t as d } from "./Chip-zdVBwV9j.js";
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
import { t as T } from "./Select-D2EQq7Wi.js";
import { t as E } from "./Checkbox-Dftwml_V.js";
import { n as ee } from "./FileKindMark-Dl7rnRek.js";
import { t as te } from "./activationKey-CjbL3LUv.js";
import { A as D, k as O } from "./renderers-CLgJ6UYB.js";
import { A as k, B as A, C as j, D as M, E as N, F as P, H as F, I, L, M as R, N as z, O as B, P as V, R as H, S as ne, T as U, U as re, V as ie, W as ae, _ as oe, a as se, b as ce, c as le, d as ue, f as de, g as fe, h as pe, i as me, j as he, k as ge, l as _e, m as ve, n as ye, o as be, p as xe, q as Se, r as Ce, s as we, t as Te, u as Ee, v as De, w as Oe, x as ke, y as Ae, z as je } from "./PresentationEditor-BodqTYSt.js";
import { o as Me, t as Ne } from "./VerdictChip-ClwrKr68.js";
import { a as Pe, c as Fe, d as Ie, f as Le, h as Re, i as ze, l as Be, m as Ve, n as He, o as Ue, p as We, r as Ge, s as Ke, t as W, u as qe } from "./TiptapEditor-CajZRkz8.js";
import { i as Je, n as Ye, r as Xe, t as Ze } from "./FloatingComposerDock-DMUQCjea.js";
import { A as Qe, B as $e, C as et, D as tt, E as nt, F as rt, G as it, H as at, I as ot, L as st, M as ct, N as lt, O as ut, P as dt, R as ft, S as pt, T as mt, U as ht, V as gt, W as _t, _ as vt, a as yt, b as bt, c as xt, d as St, f as Ct, g as wt, h as Tt, i as Et, j as Dt, k as Ot, l as kt, m as At, o as jt, p as Mt, r as Nt, s as Pt, t as Ft, u as It, v as Lt, w as Rt, x as zt, y as Bt, z as Vt } from "./DocumentEditorPage-BNsG2GM9.js";
import { S as Ht, _ as Ut, a as Wt, b as Gt, c as Kt, d as qt, f as Jt, g as Yt, h as Xt, i as Zt, l as Qt, m as $t, n as en, o as tn, p as nn, r as rn, s as an, t as on, u as sn, v as cn, x as ln, y as un } from "./useDocumentImageUpload-5iHtXA8C.js";
import { createContext as dn, useCallback as G, useContext as fn, useEffect as K, useId as pn, useImperativeHandle as mn, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import * as hn from "yjs";
import { NodeViewWrapper as gn, ReactNodeViewRenderer as _n } from "@tiptap/react";
import { relativePositionToAbsolutePosition as vn, ySyncPluginKey as yn } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function bn(e) {
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
var xn = {
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
function Sn({ status: e }) {
	let t = xn[e] ?? xn.draft;
	return /* @__PURE__ */ Z("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Cn = {
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
function wn({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Q("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Cn[e.mode ?? "editor"] ?? Cn.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function Tn({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
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
						onKeyDown: te(() => r(e.id)),
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
											/* @__PURE__ */ Z(Sn, { status: e.status }),
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
										children: ["Updated ", bn(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Z("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Z(wn, {
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
			/* @__PURE__ */ Z(Se, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function En(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function Dn({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = yn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = vn(t.doc, t.type, hn.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var On = "prosemirror";
function kn(e) {
	return e.ydoc !== void 0;
}
function An(e) {
	return kn(e) ? /* @__PURE__ */ Z(jn, { ...e }) : /* @__PURE__ */ Z(Mn, { ...e });
}
function jn({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = On, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
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
function Mn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = On, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
function Nn({ current: e, total: t }) {
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
var Pn = {
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
}, Fn = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, In = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Ln({ item: e, onAck: t, onReject: r }) {
	let [i, a] = Y(!1), [o, s] = Y(""), [c, l] = Y("none"), u = J(e.status), d = Pn[e.status] ?? In, f = Fn[e.priority] ?? "var(--color-neutral)", [p, m] = Y(!1), h = J(null);
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
var Rn = {
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
function zn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Rn[e.type] ?? Rn.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
			e.items.length > 0 && /* @__PURE__ */ Q("div", { children: [e.items.map((e) => /* @__PURE__ */ Z(Ln, {
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
			c && /* @__PURE__ */ Z(wt, {
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
function Bn({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
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
		/* @__PURE__ */ Z(Nn, {
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
				}), /* @__PURE__ */ Z(zn, {
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
function Vn(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Hn(e, t) {
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
function Un(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Wn(e) {
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
function Gn(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function Kn({ events: e, participants: t }) {
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
					Gn(e.mode),
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
						children: Un(e.displayName || "Unknown")
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
								Vn(e.eventType),
								" ",
								Hn(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Z("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Wn(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var qn = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Jn = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function Yn({ label: e, children: t }) {
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
var Xn = {
	field: "Field change",
	prose: "Body text"
};
function Zn({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: u, edits: f, rationale: p, draftError: m, author: h, category: _, path: y, locationHint: b, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: T, onRereview: E, onAccept: ee, onReject: te, onRedraft: D, onReattach: O, onConfirmAttachment: k, className: A, "data-testid": j = "proposal-card" }) {
	let [M, N] = Y(!1), [P, F] = Y(null), [I, L] = Y(!1), [R, z] = Y(""), B = i === "applied", V = i === "rejected", H = B || V;
	async function ne() {
		N(!0), F(null);
		try {
			let e = await ee();
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
	let U = t === "prose" ? f ?? [] : [{
		before: l ?? "",
		after: u ?? ""
	}];
	return /* @__PURE__ */ Q("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", B ? "border-success-border" : "border-border", V && "opacity-60", A),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: _ ?? Xn[t]
					}),
					h && /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
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
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Z(d, {
						tone: Jn[a],
						size: "sm",
						children: qn[a]
					}),
					o === "healed" && /* @__PURE__ */ Z(d, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
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
						"data-testid": `${j}-applied`,
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
			/* @__PURE__ */ Z(Me, {
				path: y ?? (s ? [s] : []),
				...b ? { hint: b } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ Z(Yn, {
					label: "Why",
					children: c
				}), p && /* @__PURE__ */ Z(Yn, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Z("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ Z("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && U.length > 0 && /* @__PURE__ */ Z(w, {
				pairs: U,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Z(Ne, {
				verdict: x,
				status: S,
				error: C,
				revision: T,
				"data-testid": `${j}-verdict`
			}),
			P && !P.ok && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${j}-apply-error`,
				children: [
					/* @__PURE__ */ Z("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Z("span", { children: P.message ?? "The document refused the change." }),
					P.stale && /* @__PURE__ */ Q("span", { children: [
						"Drafted against ",
						JSON.stringify(P.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(P.stale.actual ?? ""),
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
						disabled: M || i === "drafting" || !!m,
						onClick: ne,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => L((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					D && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: D,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					E && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: E,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					O && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: O,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					k && o === "author_only" && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			I && !H && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Z(g, {
						id: `${j}-reason`,
						size: "sm",
						value: R,
						onChange: (e) => z(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								te(R), L(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => L(!1),
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
function Qn({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: u, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
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
var $n = "[data-comment-id]", er = 240;
function tr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function nr(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function rr({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
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
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${tr(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [y, t]);
	mn(c, () => ({
		openComment: (e, t) => x(e, t, "click"),
		close: b
	}), [x, b]);
	let C = J(null), w = u?.id ?? null;
	K(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), K(() => y, [y]), K(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest($n) : null, a = (e) => {
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
			}, er));
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
				}, er);
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
							children: bt(T.timestamp)
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
						children: nr(T.replyCount ?? 0)
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
function ir() {
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
function ar({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
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
					icon: /* @__PURE__ */ Z(ir, {}),
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
function or({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
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
var sr = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], cr = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function lr({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": p = "document-share-dialog" }) {
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
								children: sr.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Z("option", {
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
						children: Object.keys(cr).map((e) => /* @__PURE__ */ Z("option", {
							value: e,
							children: cr[e](o)
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
var ur = [
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
function dr({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = ur.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = ur.find((t) => t.value === e);
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
var fr = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, pr = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, mr = 6, hr = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function gr(e) {
	let t = hr.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function _r(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function vr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, mr), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Q("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Z(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > mr && /* @__PURE__ */ Q("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - mr,
				" more"
			]
		})]
	});
}
function yr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = gr(t.trim() === "" ? "Unknown author" : t.trim()), y = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = y.length > 0 || b.length > 0;
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
						children: _r(i)
					}),
					/* @__PURE__ */ Z("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", pr[e]),
						"data-testid": `${h}-kind`,
						children: fr[e]
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
				children: [b.length > 0 && /* @__PURE__ */ Z(vr, {
					lines: b,
					tone: "delete",
					testId: `${h}-deleted`
				}), y.length > 0 && /* @__PURE__ */ Z(vr, {
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
function br({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: l = "No suggestions", emptyBody: f = "Proposed changes to this document show up here for review.", title: m = "Suggestions", variant: h = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
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
var xr = (e) => e.startsWith("/api/uploads/"), Sr = dn(null);
function Cr({ children: e, ...t }) {
	return /* @__PURE__ */ Z(Sr.Provider, {
		value: t,
		children: e
	});
}
function wr({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = fn(Sr), o = a?.loadImage, s = a?.requiresAuthentication ?? xr, [c, l] = Y(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
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
	]), /* @__PURE__ */ Z(gn, {
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
function Tr(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return _n(wr);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Er({ request: e, onDecide: t, onWithdraw: n }) {
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
	let g = e.reviewerName || e.reviewerId, v = e.state.replace(/_/g, " "), b = v.charAt(0).toUpperCase() + v.slice(1);
	return /* @__PURE__ */ Z(ae, {
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
							children: b
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
function Dr({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: c, onRequest: l, onDecide: u, onWithdraw: d }) {
	let [f, p] = Y(""), [m, h] = Y(""), [g, v] = Y(!0), [b, x] = Y(!1), [S, C] = Y(null), w = J(!1);
	async function ee() {
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
						onClick: () => void ee(),
						children: b ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Z(re, {
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
				children: e.map((e) => /* @__PURE__ */ Z(Er, {
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
var Or = [
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
function kr({ filled: e }) {
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
function Ar({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: o, starred: s = !1, onStarredChange: l, statusPill: u, path: d, crumbsTrailing: f, subtitle: p, metaBar: m, participants: g, onParticipantClick: _, onFollowParticipant: v, followingParticipantId: y, meta: b, saveState: S, headActions: w, tabs: T, activeTab: E, onTabChange: te, toolbar: D, children: O, footer: k, surface: A = "workspace", explorer: j, workbench: M, label: N = "Editor", className: P, "data-testid": I = "editor-shell" }) {
	let L = `${I}-${pn().replace(/:/g, "")}`, R = !!T && T.length > 0, z = R ? T.some((e) => e.id === E) ? E : T[0].id : void 0, B = g && g.length > 0 || b != null || !!S, V = /* @__PURE__ */ Q("section", {
		"aria-label": N,
		"data-testid": I,
		"data-surface": A,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ Q("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-testid": `${I}-header`,
				children: [
					e && e.length > 0 && !f && /* @__PURE__ */ Z(c, {
						items: e,
						maxItems: 4,
						className: "text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${I}-crumbs`
					}),
					f && /* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${I}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ Z(c, {
							items: e,
							maxItems: 4,
							className: "min-w-0 text-xs",
							"data-testid": `${I}-crumbs`
						}), /* @__PURE__ */ Z("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${I}-crumbs-trailing`,
							children: f
						})]
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [
							o && /* @__PURE__ */ Z(ee, {
								kind: o,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${I}-kind`
							}),
							/* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-1 flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ Q("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${I}-title-group`,
												children: [r ? /* @__PURE__ */ Z(F, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: "min-w-0 max-w-full flex-initial py-0 text-xl font-bold leading-6",
													"data-testid": `${I}-title`
												}) : /* @__PURE__ */ Z("h1", {
													className: "m-0 min-w-0 max-w-full flex-initial truncate text-xl font-bold leading-6 text-text-primary",
													"data-testid": `${I}-title`,
													children: t
												}), l && /* @__PURE__ */ Z(a, {
													size: "sm",
													"aria-label": s ? "Remove star" : "Star this file",
													"aria-pressed": s,
													title: s ? "Starred" : "Star",
													onClick: () => l(!s),
													className: s ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${I}-star`,
													children: /* @__PURE__ */ Z(kr, { filled: s })
												})]
											}),
											u,
											d && d.length > 0 && /* @__PURE__ */ Z("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${I}-path`,
												children: /* @__PURE__ */ Z(c, {
													items: d,
													maxItems: 4,
													lastIsCurrent: !1,
													className: "min-w-0 text-[13px] text-text-tertiary",
													"data-testid": `${I}-path-crumbs`
												})
											})
										]
									}),
									p != null && /* @__PURE__ */ Z("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${I}-subtitle`,
										children: p
									}),
									B && /* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${I}-byline`,
										children: [
											g && g.length > 0 && /* @__PURE__ */ Z(x, {
												users: g,
												size: 22,
												maxVisible: 4,
												..._ ? { onUserClick: _ } : {},
												...v ? {
													onFollowUser: v,
													followingUserId: y ?? null
												} : {}
											}),
											b != null && /* @__PURE__ */ Z("span", {
												className: "min-w-0 truncate",
												children: b
											}),
											/* @__PURE__ */ Z(lt, {
												state: S,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							w && /* @__PURE__ */ Z("div", {
								className: "flex shrink-0 items-center gap-3",
								"data-testid": `${I}-actions`,
								children: w
							})
						]
					}),
					m != null && /* @__PURE__ */ Z("div", {
						className: "flex min-w-0 items-center py-2",
						"data-testid": `${I}-meta-bar`,
						children: m
					}),
					R ? /* @__PURE__ */ Z(h, {
						items: T.map((e) => ({
							id: e.id,
							label: e.label,
							...e.disabled ? { disabled: !0 } : {},
							...e.count ? { badge: /* @__PURE__ */ Z(C, {
								variant: "count",
								value: e.count,
								color: "muted",
								"aria-label": `${e.count} in ${e.label}`
							}) } : {},
							testId: `${I}-tab-${e.id}`
						})),
						value: z,
						onValueChange: (e) => te?.(e),
						variant: "underline",
						size: "md",
						itemClassName: "px-3.5 pb-1.5 pt-1 text-[15px] leading-5",
						"aria-label": `${t} sections`,
						idPrefix: L,
						className: "-mb-px -ml-3 mt-1 border-b-0"
					}) : /* @__PURE__ */ Z("span", {
						className: "h-2",
						"aria-hidden": "true"
					})
				]
			}),
			D && /* @__PURE__ */ Z("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${I}-toolbar`,
				children: D
			}),
			/* @__PURE__ */ Q("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", A === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${I}-surface`,
				children: [/* @__PURE__ */ Z("div", {
					...R ? {
						role: "tabpanel",
						id: `${L}-panel-${z}`,
						"aria-labelledby": `${L}-tab-${z}`
					} : {},
					className: "min-h-0 flex-1 overflow-auto",
					"data-testid": `${I}-scroller`,
					children: O
				}), k != null && /* @__PURE__ */ Z("div", {
					className: "relative z-20 flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
					"data-testid": `${I}-dock`,
					children: /* @__PURE__ */ Z(Ze.Provider, {
						value: "pinned",
						children: k
					})
				})]
			})
		]
	});
	return !j && !M ? /* @__PURE__ */ Z("div", {
		className: n("flex h-full min-h-0 flex-col", P),
		children: V
	}) : /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", P),
		"data-testid": `${I}-frame`,
		children: [j && /* @__PURE__ */ Z("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${I}-explorer`,
			children: j
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [V, M && /* @__PURE__ */ Z("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${I}-workbench`,
				children: M
			})]
		})]
	});
}
//#endregion
export { Bn as AckMode, kt as ActionItemsCard, Kn as ActivityFeed, pt as AttachmentsPanel, wr as AuthenticatedDocumentImageView, He as BULLET_STYLES, $e as CANVAS_BODY_KEY, gt as CANVAS_SCHEMA_VERSION, Wt as CanvasDocumentView, Be as CanvasLineSpacing, Ge as CanvasListStyle, zn as ChunkViewer, rr as CommentGhostPopover, vt as CommentThreadNode, Ze as ComposerDockPlacementContext, de as DECK_THEMES, Or as DEFAULT_EDITOR_SHELL_TABS, Ye as DOCK_HEIGHT_VAR, Xe as DOCK_INSET_VAR, Dt as DOCUMENT_MODE_LABELS, qt as DOCUMENT_TOOLBAR_BREAKPOINTS, Pt as DiffViewer, Ft as DocumentEditorPage, tn as DocumentFindBar, Qt as DocumentGutter, tt as DocumentHeader, Cr as DocumentImageProvider, ut as DocumentLifecyclePill, Tn as DocumentListPage, ct as DocumentModePill, Gt as DocumentOutline, Qe as DocumentOwnership, Dr as DocumentReviewPanel, ln as DocumentRuler, lt as DocumentSaveStatus, lr as DocumentShareDialog, Ut as DocumentStatusBar, Jt as DocumentToolbar, Ar as EditorShell, Re as EditorToolbar, Ct as ExecutiveSummaryCard, Ee as Filmstrip, ue as FilmstripThumb, Je as FloatingComposerDock, or as FloatingDockBar, nt as FollowModeBar, Mt as HeaderBanner, It as KeyDecisionsCard, qe as LINE_SPACINGS, Ie as LINE_SPACING_LABELS, ze as LIST_STYLE_LABELS, on as MAX_ATTACHMENT_BYTES, xe as MAX_BULLETS_PER_SLIDE, ve as MAX_BULLET_CHARS, pe as MAX_CHART_LABELS, fe as MAX_CHART_SERIES, oe as MAX_EYEBROW_CHARS, en as MAX_IMAGE_BYTES, De as MAX_NOTES_CHARS, Ae as MAX_QUOTE_CHARS, ce as MAX_SLIDES, ke as MAX_SOURCES_PER_SLIDE, ne as MAX_SUBTITLE_CHARS, j as MAX_TITLE_CHARS, Pe as MULTILEVEL_STYLES, zt as MentionDropdown, yt as MyMentionsPanel, Ue as NUMBER_STYLES, Se as NewDocumentModal, Ht as PX_PER_INCH, dt as ParticipantAvatars, Te as PresentationEditor, ie as PresentationView, Zn as ProposalCard, xt as ReaderMode, Tt as ReviewMode, Nn as ReviewProgress, Ln as ReviewableItem, sr as SHARE_ROLES, Ce as SLIDES_TOOLBAR_BREAKPOINTS, Oe as SLIDE_ID_PATTERN, me as SLIDE_INSERTS, U as SLIDE_LAYOUTS, N as SLIDE_LAYOUT_LABELS, ur as SUGGESTION_AUTHORING_MODES, Rt as SectionBlock, wt as SectionComments, et as SectionList, St as SectionSummariesCard, le as SlideForm, H as SlideList, je as SlideRow, _e as SlideSources, we as SlideStage, se as SlidesToolbar, ye as SpeakerNotes, An as StandaloneTiptap, yr as SuggestionCard, dr as SuggestionModeControl, br as SuggestionReviewList, Nt as TableOfContents, D as TaskItemRow, O as TaskList, W as TiptapEditor, jt as VersionHistoryPanel, mt as VideoCallPanel, ar as VideoDockSlot, Et as VideoHistoryPanel, Qn as WorkItemRow, Ot as WorkspaceDocumentHeaderNotices, cn as ZOOM_FIT, un as ZOOM_STEPS, rn as acceptsDocumentImage, M as addSlide, B as canSaveDeck, at as canvasBody, ft as canvasFragmentToMarkdown, En as clientIdForUser, Lt as countAllComments, Tr as createAuthenticatedDocumentImage, nn as documentToolbarSize, ge as duplicateSlide, rt as findDocumentTarget, an as findMatches, At as generateSummaryBullets, Bt as getInitials, ht as isCanvasDocument, Le as isLineSpacing, We as lineSpacingAttributes, Ke as listTypeFor, k as makeSlide, he as moveSlide, Kt as nextMatchIndex, R as nextRevisionLabel, z as nextSlideId, Ve as parseLineSpacing, Fe as parseListStyle, Xt as readOutline, _t as readSchemaVersion, bt as relativeTime, V as removeSlide, P as replaceSlide, nr as replyLabel, ot as scrollToDocumentTarget, be as slidesToolbarSize, sn as stackOffsets, A as svgDataUri, I as uncitedSlideIds, Vt as useDocumentActions, Zt as useDocumentImageUpload, Yt as useDocumentOutline, $t as useDocumentToolbarSize, Dn as useFollowCursor, it as useIsCanvasDocument, st as useSidebarPanels, L as withLayoutDefaults };
