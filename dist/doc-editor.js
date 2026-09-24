import { n as e, t } from "./useWebSocket-C9oAM0NL.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { _ as r } from "./overlayStack-CHdlnODN.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-DDeXW3mZ.js";
import { d as o } from "./DropdownMenu-thsvyIAZ.js";
import { n as s, t as c } from "./Stack-CkiMw5K0.js";
import { i as l, r as u } from "./Text-DpIU0dw3.js";
import { t as d } from "./Banner-6sJQ2hAL.js";
import { t as f } from "./Chip-zdVBwV9j.js";
import { t as p } from "./Modal-DMFNRUDx.js";
import { t as m } from "./EmptyState-DFWbBBcY.js";
import { t as h } from "./SegmentedControl-X19S_gNQ.js";
import { n as g } from "./Tabs-DjNsAODd.js";
import { t as _ } from "./Input-DLknWXri.js";
import { t as v } from "./Textarea-Dz4doxTv.js";
import { t as y } from "./Avatar-DeJWic2B.js";
import { t as b } from "./InlineAlert-CRnIKeAF.js";
import { t as x } from "./CardHeader-CsPhVpCm.js";
import { t as S } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as C } from "./InlinePopover-DtYo8_ZC.js";
import { t as w } from "./Badge-C23_Y4Yj.js";
import { t as T } from "./ChangeDiff-CzO8zCc-.js";
import { t as E } from "./Select-D2EQq7Wi.js";
import { t as D } from "./Checkbox-Dftwml_V.js";
import { n as ee } from "./FileKindMark-Dl7rnRek.js";
import { t as O } from "./activationKey-CjbL3LUv.js";
import { A as k, k as A } from "./renderers-CLgJ6UYB.js";
import { A as te, B as j, C as M, D as N, E as P, F, H as ne, I, L, M as R, N as z, O as B, P as V, R as H, S as U, T as re, U as ie, V as W, W as G, _ as ae, a as oe, b as se, c as ce, d as le, f as ue, g as de, h as fe, i as pe, j as me, k as he, l as ge, m as _e, n as ve, o as ye, p as be, q as xe, r as Se, s as Ce, t as we, u as Te, v as Ee, w as De, x as Oe, y as ke, z as Ae } from "./PresentationEditor-DnThzh7v.js";
import { o as je, t as Me } from "./VerdictChip-ClwrKr68.js";
import { a as Ne, c as Pe, d as Fe, f as Ie, h as Le, i as Re, l as ze, m as Be, n as Ve, o as He, p as Ue, r as We, s as Ge, t as Ke, u as qe } from "./TiptapEditor-CajZRkz8.js";
import { i as Je, n as Ye, r as Xe, t as Ze } from "./FloatingComposerDock-DMUQCjea.js";
import { A as Qe, B as $e, C as et, D as tt, E as nt, F as rt, G as it, H as at, I as ot, K as st, L as ct, M as lt, N as ut, O as dt, P as ft, R as pt, S as mt, T as ht, U as gt, V as _t, W as vt, _ as yt, a as bt, b as xt, c as St, d as Ct, f as wt, g as Tt, h as Et, i as Dt, j as Ot, k as kt, l as At, m as jt, o as Mt, p as Nt, r as Pt, s as Ft, t as It, u as Lt, v as Rt, w as zt, x as Bt, y as Vt, z as Ht } from "./DocumentEditorPage-I1Yin-LV.js";
import { S as Ut, _ as Wt, a as Gt, b as Kt, c as qt, d as Jt, f as Yt, g as Xt, h as Zt, i as Qt, l as $t, m as en, n as tn, o as nn, p as rn, r as an, s as on, t as sn, u as cn, v as ln, x as un, y as dn } from "./useDocumentImageUpload-BpIEqjdH.js";
import { createContext as fn, useCallback as K, useContext as pn, useEffect as q, useId as mn, useImperativeHandle as hn, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
import * as gn from "yjs";
import { NodeViewWrapper as _n, ReactNodeViewRenderer as vn } from "@tiptap/react";
import { relativePositionToAbsolutePosition as yn, ySyncPluginKey as bn } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function xn(e) {
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
var Sn = {
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
function Cn({ status: e }) {
	let t = Sn[e] ?? Sn.draft;
	return /* @__PURE__ */ Q("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var wn = {
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
function Tn({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ $("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = wn[e.mode ?? "editor"] ?? wn.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ $("button", {
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
					/* @__PURE__ */ Q("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ Q("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ Q("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ $("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function En({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = X(!1), [u, d] = X(null), [f, p] = X(null), [m, h] = X(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = J(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = K((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ $("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ $("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ Q("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ $("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ Q("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ Q("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ Q("div", {
				className: n("flex flex-col gap-3"),
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ $("div", {
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
							/* @__PURE__ */ Q("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ $("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ $("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ Q("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ Q(Cn, { status: e.status }),
											e.type && /* @__PURE__ */ Q("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ $("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ Q("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ Q("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ $("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", xn(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Q("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Q(Tn, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ Q("button", {
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
			e.length > 10 && /* @__PURE__ */ $("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ Q("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ $("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ Q("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ Q(xe, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function Dn(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function On({ editor: e, provider: t, followClientId: n, onLost: r }) {
	q(() => {
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
				let t = bn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = yn(t.doc, t.type, gn.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var kn = "prosemirror";
function An(e) {
	return e.ydoc !== void 0;
}
function jn(e) {
	return An(e) ? /* @__PURE__ */ Q(Mn, { ...e }) : /* @__PURE__ */ Q(Nn, { ...e });
}
function Mn({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = kn, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = J(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = Y(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Q("div", {
		className: n(c),
		children: /* @__PURE__ */ Q(Ke, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Nn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = kn, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = Y(/* @__PURE__ */ new Set()), _ = K((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = K((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = J(() => ({
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
	}), w = J(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = Y(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ Q("div", {
		className: n(d),
		children: /* @__PURE__ */ Q(Ke, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ Q("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function Pn({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ $("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ $("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ $("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ $("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ Q("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ Q("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var Fn = {
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
}, In = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, Ln = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Rn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = X(!1), [o, s] = X(""), [c, l] = X("none"), u = Y(e.status), d = Fn[e.status] ?? Ln, f = In[e.priority] ?? "var(--color-neutral)", [p, m] = X(!1), h = Y(null);
	q(() => () => {
		h.current && clearTimeout(h.current);
	}, []), q(() => {
		u.current === "pending" && e.status === "acked" ? l("ack") : u.current === "pending" && e.status === "rejected" && l("reject"), u.current = e.status;
	}, [e.status]);
	let g = () => {
		p || (m(!0), l("ack"), h.current = setTimeout(() => {
			h.current = null, t(o || void 0), s(""), a(!1), m(!1);
		}, 150));
	}, _ = () => {
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
	return /* @__PURE__ */ $("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ $("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ Q("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ Q("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ Q("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ $("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ Q("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ $("span", { children: [
					"Approved by ",
					/* @__PURE__ */ Q("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ $(Z, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ $(Z, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ $("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ Q("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ $("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ Q("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ $(Z, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ $(Z, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ $("div", { children: [/* @__PURE__ */ $("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ Q("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ Q("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: p,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ Q("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ $("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ Q(v, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && g()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ $("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ Q("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ Q("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: _,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ Q("button", {
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
var zn = {
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
function Bn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = zn[e.type] ?? zn.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ $("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ Q("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ Q("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ Q("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ Q(Ke, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ $("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ $("div", { children: [e.items.map((e) => /* @__PURE__ */ Q(Rn, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ $("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ Q(Tt, {
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
var Vn = 4;
function Hn({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = X(0), _ = Math.max(1, Math.ceil(e.length / Vn)), v = h * Vn, y = e.slice(v, v + Vn);
	if (q(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Vn)), s?.());
	}, [
		o,
		e.length,
		s
	]), q(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ Q("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ $("div", { children: [
		/* @__PURE__ */ Q(Pn, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ Q("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ $("div", { children: [a.length > 0 && /* @__PURE__ */ $("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ Q("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ Q("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ Q(Bn, {
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
		/* @__PURE__ */ $("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ Q("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ $("span", {
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
				/* @__PURE__ */ Q("button", {
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
function Un(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Wn(e, t) {
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
function Gn(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Kn(e) {
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
function qn(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function Jn({ events: e, participants: t }) {
	let [r, i] = X(!1);
	return /* @__PURE__ */ $("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ $("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ $("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ Q("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ $(Z, { children: [t.length > 0 && /* @__PURE__ */ $("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ Q("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ $("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ Q("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					qn(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ Q("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ Q("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ $("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ Q("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: Gn(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ $("div", { children: [
						/* @__PURE__ */ Q("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ $("span", {
							className: n("text-neutral"),
							children: [
								Un(e.eventType),
								" ",
								Wn(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Q("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Kn(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var Yn = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Xn = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function Zn({ label: e, children: t }) {
	return /* @__PURE__ */ $("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ Q("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ Q("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var Qn = {
	field: "Field change",
	prose: "Body text"
};
function $n({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: u, edits: d, rationale: p, draftError: m, author: h, category: g, path: v, locationHint: b, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: w, onRereview: E, onAccept: D, onReject: ee, onRedraft: O, onReattach: k, onConfirmAttachment: A, className: te, "data-testid": j = "proposal-card" }) {
	let [M, N] = X(!1), [P, F] = X(null), [ne, I] = X(!1), [L, R] = X(""), z = i === "applied", B = i === "rejected", V = z || B;
	async function H() {
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
	let U = t === "prose" ? d ?? [] : [{
		before: l ?? "",
		after: u ?? ""
	}];
	return /* @__PURE__ */ $("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", z ? "border-success-border" : "border-border", B && "opacity-60", te),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Q("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: g ?? Qn[t]
					}),
					h && /* @__PURE__ */ $("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ Q(y, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ Q("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ Q("span", { className: "flex-1" }),
					/* @__PURE__ */ Q(f, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Q(f, {
						tone: Xn[a],
						size: "sm",
						children: Yn[a]
					}),
					o === "healed" && /* @__PURE__ */ Q(f, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ Q(f, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					z && /* @__PURE__ */ Q(f, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					B && /* @__PURE__ */ Q(f, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ $("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ Q(je, {
				path: v ?? (s ? [s] : []),
				...b ? { hint: b } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ Q(Zn, {
					label: "Why",
					children: c
				}), p && /* @__PURE__ */ Q(Zn, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Q("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ Q("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && U.length > 0 && /* @__PURE__ */ Q(T, {
				pairs: U,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Q(Me, {
				verdict: x,
				status: S,
				error: C,
				revision: w,
				"data-testid": `${j}-verdict`
			}),
			P && !P.ok && /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${j}-apply-error`,
				children: [
					/* @__PURE__ */ Q("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Q("span", { children: P.message ?? "The document refused the change." }),
					P.stale && /* @__PURE__ */ $("span", { children: [
						"Drafted against ",
						JSON.stringify(P.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(P.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!V && /* @__PURE__ */ $("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "primary",
						disabled: M || i === "drafting" || !!m,
						onClick: H,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => I((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					O && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: O,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					E && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: E,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					k && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && o === "author_only" && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: A,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			ne && !V && /* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Q("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Q(_, {
						id: `${j}-reason`,
						size: "sm",
						value: L,
						onChange: (e) => R(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ $("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Q(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								ee(L), I(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Q(r, {
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
function er({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: u, candidates: d, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...d ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = p.filter((e) => !b.has(e.id));
	return /* @__PURE__ */ Q(i, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ $("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ $("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ Q(f, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), c && /* @__PURE__ */ Q(f, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ $("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				s && /* @__PURE__ */ Q("p", {
					className: "text-xs text-text-tertiary",
					children: s
				}),
				u && /* @__PURE__ */ Q("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: u
				}),
				/* @__PURE__ */ $("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "primary",
						disabled: l,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: l ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && y.length > 0 && /* @__PURE__ */ $("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ $(r, {
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
				a && x.length > 0 && /* @__PURE__ */ $("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ Q(E, {
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
var tr = "[data-comment-id]", nr = 240;
function rr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function ir(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function ar({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
	let [u, d] = X(null), p = Y(null), m = Y(null), h = Y(null);
	h.current = u;
	let g = J(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = Y(g);
	_.current = g;
	let v = K(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), b = K(() => {
		v(), d(null);
	}, [v]), x = K((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${rr(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, d({
			id: e,
			via: r
		}));
	}, [v, t]);
	hn(c, () => ({
		openComment: (e, t) => x(e, t, "click"),
		close: b
	}), [x, b]);
	let S = Y(null), w = u?.id ?? null;
	q(() => {
		S.current !== w && (S.current = w, a?.(w));
	}, [w, a]), q(() => v, [v]), q(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(tr) : null, a = (e) => {
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
			!t || !a || (v(), h.current?.id !== a && (m.current = setTimeout(() => x(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (v(), m.current = setTimeout(() => {
				h.current?.via === "hover" && b();
			}, nr));
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
		v
	]);
	let T = w ? g.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), b());
	};
	return /* @__PURE__ */ Q(C, {
		trigger: p,
		open: !!T,
		onClose: b,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": l,
		children: T && /* @__PURE__ */ $("div", {
			"data-testid": `${l}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), m.current = setTimeout(() => {
					h.current?.via === "hover" && b();
				}, nr);
			},
			children: [
				/* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Q(y, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ Q("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ Q("span", {
							className: "text-[11px] text-text-tertiary",
							children: Bt(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ Q(f, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ Q("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ Q("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ $("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Q("span", {
						"data-testid": `${l}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: ir(T.replyCount ?? 0)
					}), /* @__PURE__ */ $("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ Q(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${l}-open`,
							children: "Open thread"
						}), s && !T.resolved && /* @__PURE__ */ Q(r, {
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
function or() {
	return /* @__PURE__ */ $("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ Q("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ Q("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function sr({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
	let [h, g] = X(!1), _ = K((e) => {
		e.preventDefault(), t && g(!0), l?.(e);
	}, [t, l]), v = K((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (g(!1), u?.(e));
	}, [u]), y = K((e) => {
		e.preventDefault(), g(!1), t && d?.(e);
	}, [t, d]);
	return !e && !t ? null : /* @__PURE__ */ Q("div", {
		"data-testid": m,
		"data-docked": String(e),
		"data-drag-over": String(h),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: _,
		onDragLeave: v,
		onDrop: y,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", h ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", f),
		children: e ? /* @__PURE__ */ $("div", {
			"data-testid": `${m}-content`,
			className: "relative w-full",
			children: [p, c && /* @__PURE__ */ Q("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ Q(a, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${m}-undock`,
					icon: /* @__PURE__ */ Q(or, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ $("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${m}-dropzone`,
			className: n("flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", h ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ Q("span", {
				className: "text-xs text-text-tertiary",
				children: o
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function cr({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ Q("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ Q("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ Q("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ Q("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/useCommentMarginPreference.ts
var lr = "doc-editor:canvas:gutter-visible";
function ur(e = lr, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function dr({ storageKey: e = lr, defaultVisible: t = !1 } = {}) {
	let [n, r] = X(() => ur(e, t)), i = K((t) => {
		try {
			window.localStorage.setItem(e, t ? "1" : "0");
		} catch {}
		r(t);
	}, [e]);
	return {
		visible: n,
		toggle: K(() => {
			r((t) => {
				let n = !t;
				try {
					window.localStorage.setItem(e, n ? "1" : "0");
				} catch {}
				return n;
			});
		}, [e]),
		show: K(() => i(!0), [i])
	};
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var fr = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], pr = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function mr({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [m, h] = X(""), g = () => {
		let e = m.trim();
		!e || !l || (l(e), h(""));
	};
	return /* @__PURE__ */ Q(p, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ $("div", {
			className: "flex flex-col gap-4",
			"data-testid": f,
			children: [
				l && /* @__PURE__ */ $("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Q("input", {
						value: m,
						onChange: (e) => h(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && g();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ Q(r, {
						size: "sm",
						onClick: g,
						disabled: !m.trim(),
						"data-testid": `${f}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ Q("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${f}-notice`,
					children: d
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${f}-people`,
					children: i.map((e) => /* @__PURE__ */ $("div", {
						className: "flex items-center gap-2",
						"data-testid": `${f}-person`,
						children: [
							/* @__PURE__ */ Q(y, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ Q("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ Q("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${f}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ Q("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${f}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: fr.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Q("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ $("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ Q("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${f}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(pr).map((e) => /* @__PURE__ */ Q("option", {
							value: e,
							children: pr[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ $("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ Q(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${f}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ Q("span", {}), /* @__PURE__ */ Q(r, {
						size: "sm",
						onClick: t,
						"data-testid": `${f}-done`,
						children: "Done"
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionModeControl.tsx
var hr = [
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
function gr({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = hr.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = hr.find((t) => t.value === e);
	return /* @__PURE__ */ $("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Q(h, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ Q("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var _r = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, vr = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, yr = 6, br = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function xr(e) {
	let t = br.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function Sr(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Cr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, yr), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ $("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Q(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > yr && /* @__PURE__ */ $("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - yr,
				" more"
			]
		})]
	});
}
function wr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = xr(t.trim() === "" ? "Unknown author" : t.trim()), v = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = v.length > 0 || b.length > 0;
	return /* @__PURE__ */ $("div", {
		"data-testid": h,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ Q(y, {
						name: g,
						size: 20
					}),
					/* @__PURE__ */ Q("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: g,
						"data-testid": `${h}-author`,
						children: g
					}),
					i !== null && /* @__PURE__ */ Q("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: Sr(i)
					}),
					/* @__PURE__ */ Q("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", vr[e]),
						"data-testid": `${h}-kind`,
						children: _r[e]
					})
				]
			}),
			(_ || a) && /* @__PURE__ */ $("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					_ && /* @__PURE__ */ $("span", {
						"data-testid": `${h}-model`,
						children: ["powered by ", _]
					}),
					_ && a && /* @__PURE__ */ Q("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ $("span", {
						"data-testid": `${h}-context`,
						children: ["in ", a]
					})
				]
			}),
			x && /* @__PURE__ */ $("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${h}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [b.length > 0 && /* @__PURE__ */ Q(Cr, {
					lines: b,
					tone: "delete",
					testId: `${h}-deleted`
				}), v.length > 0 && /* @__PURE__ */ Q(Cr, {
					lines: v,
					tone: "insert",
					testId: `${h}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ $("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ Q(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${h}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ Q(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${h}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ Q(r, {
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
function Tr({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: l = "No suggestions", emptyBody: u = "Proposed changes to this document show up here for review.", title: p = "Suggestions", variant: h = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
	let v = e > 0 && (a || o), y = v || c ? /* @__PURE__ */ $("span", {
		className: "flex items-center gap-1.5",
		children: [
			c,
			v && o && /* @__PURE__ */ Q(r, {
				variant: "ghost",
				size: "sm",
				onClick: o,
				"data-testid": `${_}-reject-all`,
				children: "Reject all"
			}),
			v && a && /* @__PURE__ */ Q(r, {
				variant: "secondary",
				size: "sm",
				onClick: a,
				"data-testid": `${_}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, b = /* @__PURE__ */ $(Z, { children: [s && /* @__PURE__ */ Q("div", {
		className: n("pt-2", h === "card" && "px-3"),
		children: /* @__PURE__ */ Q(d, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: s
		})
	}), e === 0 ? /* @__PURE__ */ Q(m, {
		size: "sm",
		title: l,
		body: u,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ Q("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return h === "pane" ? /* @__PURE__ */ $("div", {
		className: n("flex min-h-0 flex-1 flex-col", g),
		"data-testid": _,
		"data-variant": "pane",
		children: [/* @__PURE__ */ $("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${_}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), y]
		}), /* @__PURE__ */ Q("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: b
		})]
	}) : /* @__PURE__ */ $(i, {
		padding: "none",
		className: n("overflow-hidden", g),
		"data-testid": _,
		children: [/* @__PURE__ */ Q(x, {
			title: p,
			meta: /* @__PURE__ */ Q(f, {
				tone: "neutral",
				size: "xs",
				mono: !0,
				children: String(e)
			}),
			action: y
		}), b]
	});
}
//#endregion
//#region src/components/doc-editor/AuthenticatedDocumentImage.tsx
var Er = (e) => e.startsWith("/api/uploads/"), Dr = fn(null);
function Or({ children: e, ...t }) {
	return /* @__PURE__ */ Q(Dr.Provider, {
		value: t,
		children: e
	});
}
function kr({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = pn(Dr), o = a?.loadImage, s = a?.requiresAuthentication ?? Er, [c, l] = X(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
	return q(() => {
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
	]), /* @__PURE__ */ Q(_n, {
		as: "div",
		"data-testid": "canvas-document-image",
		"data-image-state": p ? "failed" : f ? "ready" : "loading",
		children: f && !p ? /* @__PURE__ */ Q("img", {
			src: f,
			alt: r,
			...i ? { title: i } : {},
			className: t ? "ProseMirror-selectednode" : void 0,
			draggable: !1
		}) : /* @__PURE__ */ Q("span", {
			className: p ? "text-sm italic text-danger-fg" : "text-sm italic text-text-tertiary",
			"data-testid": "canvas-document-image-fallback",
			children: p ? `Could not load ${r || "image"}` : "Loading image…"
		})
	});
}
function Ar(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return vn(kr);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function jr({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = X(""), [o, l] = X(!1), [d, p] = X(null), m = Y(!1);
	async function h(e) {
		if (!m.current) {
			m.current = !0, l(!0), p(null);
			try {
				await e(), a("");
			} catch (e) {
				p(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				m.current = !1, l(!1);
			}
		}
	}
	let g = e.reviewerName || e.reviewerId, _ = e.state.replace(/_/g, " "), y = _.charAt(0).toUpperCase() + _.slice(1);
	return /* @__PURE__ */ Q(G, {
		"aria-label": `Review by ${g}`,
		"aria-busy": o,
		children: /* @__PURE__ */ $(s, {
			gap: "sm",
			children: [
				/* @__PURE__ */ $(c, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Q("strong", { children: g }),
						/* @__PURE__ */ Q(f, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: y
						}),
						e.required && /* @__PURE__ */ Q(f, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Q(u, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Q("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Q("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				d && /* @__PURE__ */ Q(b, {
					tone: "error",
					children: d
				}),
				t && e.state === "pending" && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(v, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: o,
					"aria-label": `Review comment for ${g}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ $(c, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "secondary",
						disabled: o,
						onClick: () => void h(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "primary",
						disabled: o,
						onClick: () => void h(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Q(r, {
					size: "sm",
					variant: "ghost",
					disabled: o,
					onClick: () => void h(() => n(e.requestKey)),
					children: "Withdraw review"
				})
			]
		})
	});
}
function Mr({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: l, onDecide: u, onWithdraw: d }) {
	let [f, p] = X(""), [m, h] = X(""), [g, _] = X(!0), [y, x] = X(!1), [S, C] = X(null), w = Y(!1);
	async function T() {
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
	return /* @__PURE__ */ $(s, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Q(b, {
				tone: "error",
				children: a
			}),
			l && /* @__PURE__ */ $(s, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Q(E, {
						"aria-label": "Reviewer",
						placeholder: "Choose a reviewer",
						value: f,
						disabled: y || i,
						options: t.map((e) => ({
							value: e.id,
							label: e.displayName
						})),
						onChange: (e) => p(e.target.value)
					}),
					/* @__PURE__ */ Q(v, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: y,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ $(c, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Q(D, {
							checked: g,
							onChange: _,
							disabled: y
						}), "Required review"]
					}),
					S && /* @__PURE__ */ Q(b, {
						tone: "error",
						children: S
					}),
					/* @__PURE__ */ Q(r, {
						size: "sm",
						disabled: y || i || !t.some((e) => e.id === f),
						onClick: () => void T(),
						children: y ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Q(ie, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ Q(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: o,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ Q(jr, {
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
var Nr = [
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
function Pr({ filled: e }) {
	return /* @__PURE__ */ Q("svg", {
		width: 16,
		height: 16,
		viewBox: "0 0 16 16",
		fill: e ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: 1.4,
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ Q("path", { d: "M8 1.9l1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.3l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.9Z" })
	});
}
function Fr({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: s, starred: c = !1, onStarredChange: u, statusPill: d, path: p, crumbsTrailing: m, subtitle: h, metaBar: _, participants: v, onParticipantClick: y, onFollowParticipant: b, followingParticipantId: x, meta: C, saveState: T, headActions: E, tabs: D, activeTab: O, onTabChange: k, toolbar: A, children: te, footer: j, surface: M = "workspace", explorer: N, workbench: P, label: F = "Editor", variant: I = "document", itemType: L, itemKey: R, className: z, "data-testid": B = "editor-shell" }) {
	let V = I === "work-item", H = V && (L || R) ? /* @__PURE__ */ $(Z, { children: [L && /* @__PURE__ */ Q(f, {
		size: "sm",
		tone: "info",
		"data-testid": `${B}-item-type`,
		children: L
	}), R && /* @__PURE__ */ Q("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${B}-item-key`,
		children: R
	})] }) : null, U = H || m != null ? /* @__PURE__ */ $(Z, { children: [H, m] }) : null, re = V && (e && e.length > 0 || U != null), ie = V ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", W = `${B}-${mn().replace(/:/g, "")}`, G = !!D && D.length > 0, ae = G ? D.some((e) => e.id === O) ? O : D[0].id : void 0, oe = v && v.length > 0 || C != null || !!T, se = /* @__PURE__ */ $("section", {
		"aria-label": F,
		"data-testid": B,
		"data-surface": M,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ $("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-variant": I,
				"data-testid": `${B}-header`,
				children: [
					re && /* @__PURE__ */ $("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${B}-crumbs-row`,
						children: [
							/* @__PURE__ */ Q(o, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ Q(l, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								className: "min-w-0 text-[13px] text-text-secondary",
								"data-testid": `${B}-crumbs`
							}),
							e && e.length > 0 && U != null && /* @__PURE__ */ Q("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							U != null && /* @__PURE__ */ Q("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${B}-crumbs-trailing`,
								children: U
							}),
							/* @__PURE__ */ Q("span", { className: "flex-1" }),
							E && /* @__PURE__ */ Q("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${B}-actions`,
								children: E
							})
						]
					}),
					!V && e && e.length > 0 && !m && /* @__PURE__ */ Q(l, {
						items: e,
						maxItems: 4,
						className: "text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${B}-crumbs`
					}),
					!V && m && /* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${B}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ Q(l, {
							items: e,
							maxItems: 4,
							className: "min-w-0 text-xs",
							"data-testid": `${B}-crumbs`
						}), /* @__PURE__ */ Q("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${B}-crumbs-trailing`,
							children: m
						})]
					}),
					/* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [
							s && !V && /* @__PURE__ */ Q(ee, {
								kind: s,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${B}-kind`
							}),
							/* @__PURE__ */ $("div", {
								className: "flex min-w-0 flex-1 flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ $("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ $("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${B}-title-group`,
												children: [r ? /* @__PURE__ */ Q(ne, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", ie, V && "relative -left-[5px]"),
													"data-testid": `${B}-title`
												}) : /* @__PURE__ */ Q("h1", {
													className: n("m-0 min-w-0 max-w-full flex-initial truncate text-text-primary", ie),
													"data-testid": `${B}-title`,
													children: t
												}), u && /* @__PURE__ */ Q(a, {
													size: "sm",
													"aria-label": c ? "Remove star" : "Star this file",
													"aria-pressed": c,
													title: c ? "Starred" : "Star",
													onClick: () => u(!c),
													className: c ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${B}-star`,
													children: /* @__PURE__ */ Q(Pr, { filled: c })
												})]
											}),
											d,
											p && p.length > 0 && /* @__PURE__ */ Q("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${B}-path`,
												children: /* @__PURE__ */ Q(l, {
													items: p,
													maxItems: 4,
													lastIsCurrent: !1,
													className: "min-w-0 text-[13px] text-text-tertiary",
													"data-testid": `${B}-path-crumbs`
												})
											})
										]
									}),
									h != null && /* @__PURE__ */ Q("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${B}-subtitle`,
										children: h
									}),
									oe && /* @__PURE__ */ $("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${B}-byline`,
										children: [
											v && v.length > 0 && /* @__PURE__ */ Q(S, {
												users: v,
												size: 22,
												maxVisible: 4,
												...y ? { onUserClick: y } : {},
												...b ? {
													onFollowUser: b,
													followingUserId: x ?? null
												} : {}
											}),
											C != null && /* @__PURE__ */ Q("span", {
												className: "min-w-0 truncate",
												children: C
											}),
											/* @__PURE__ */ Q(ft, {
												state: T,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							E && !re && /* @__PURE__ */ Q("div", {
								className: "flex shrink-0 items-center gap-3",
								"data-testid": `${B}-actions`,
								children: E
							})
						]
					}),
					_ != null && /* @__PURE__ */ Q("div", {
						className: n("flex min-w-0 items-center", V ? "pb-2 pt-3" : "py-2"),
						"data-testid": `${B}-meta-bar`,
						children: _
					}),
					G ? /* @__PURE__ */ Q(g, {
						items: D.map((e) => ({
							id: e.id,
							label: e.label,
							...e.disabled ? { disabled: !0 } : {},
							...e.count ? { badge: V ? /* @__PURE__ */ Q("span", {
								"aria-label": `${e.count} in ${e.label}`,
								children: e.count
							}) : /* @__PURE__ */ Q(w, {
								variant: "count",
								value: e.count,
								color: "muted",
								"aria-label": `${e.count} in ${e.label}`
							}) } : {},
							testId: `${B}-tab-${e.id}`
						})),
						value: ae,
						onValueChange: (e) => k?.(e),
						variant: "underline",
						...V ? { badgeStyle: "plain" } : {},
						size: "md",
						itemClassName: "px-3.5 pb-1.5 pt-1 text-[15px] leading-5",
						"aria-label": `${t} sections`,
						idPrefix: W,
						className: "-mb-px -ml-3 mt-1 border-b-0"
					}) : /* @__PURE__ */ Q("span", {
						className: "h-2",
						"aria-hidden": "true"
					})
				]
			}),
			A && /* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${B}-toolbar`,
				children: A
			}),
			/* @__PURE__ */ $("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", M === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${B}-surface`,
				children: [/* @__PURE__ */ Q("div", {
					...G ? {
						role: "tabpanel",
						id: `${W}-panel-${ae}`,
						"aria-labelledby": `${W}-tab-${ae}`
					} : {},
					className: "min-h-0 flex-1 overflow-auto",
					"data-testid": `${B}-scroller`,
					children: te
				}), j != null && /* @__PURE__ */ Q("div", {
					className: "relative z-20 flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
					"data-testid": `${B}-dock`,
					children: /* @__PURE__ */ Q(Ze.Provider, {
						value: "pinned",
						children: j
					})
				})]
			})
		]
	});
	return !N && !P ? /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col", z),
		children: se
	}) : /* @__PURE__ */ $("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", z),
		"data-testid": `${B}-frame`,
		children: [N && /* @__PURE__ */ Q("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${B}-explorer`,
			children: N
		}), /* @__PURE__ */ $("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [se, P && /* @__PURE__ */ Q("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${B}-workbench`,
				children: P
			})]
		})]
	});
}
//#endregion
export { Hn as AckMode, At as ActionItemsCard, Jn as ActivityFeed, et as AttachmentsPanel, kr as AuthenticatedDocumentImageView, Ve as BULLET_STYLES, _t as CANVAS_BODY_KEY, at as CANVAS_SCHEMA_VERSION, lr as COMMENT_MARGIN_STORAGE_KEY, Gt as CanvasDocumentView, ze as CanvasLineSpacing, We as CanvasListStyle, Bn as ChunkViewer, yt as CommentContextHeader, ar as CommentGhostPopover, Rt as CommentThreadNode, Ze as ComposerDockPlacementContext, ue as DECK_THEMES, Nr as DEFAULT_EDITOR_SHELL_TABS, Ye as DOCK_HEIGHT_VAR, Xe as DOCK_INSET_VAR, lt as DOCUMENT_MODE_LABELS, Jt as DOCUMENT_TOOLBAR_BREAKPOINTS, Ft as DiffViewer, It as DocumentEditorPage, nn as DocumentFindBar, $t as DocumentGutter, dt as DocumentHeader, Or as DocumentImageProvider, kt as DocumentLifecyclePill, En as DocumentListPage, ut as DocumentModePill, Kt as DocumentOutline, Ot as DocumentOwnership, Mr as DocumentReviewPanel, un as DocumentRuler, ft as DocumentSaveStatus, mr as DocumentShareDialog, Wt as DocumentStatusBar, Yt as DocumentToolbar, Fr as EditorShell, Le as EditorToolbar, wt as ExecutiveSummaryCard, Te as Filmstrip, le as FilmstripThumb, Je as FloatingComposerDock, cr as FloatingDockBar, tt as FollowModeBar, Nt as HeaderBanner, Lt as KeyDecisionsCard, qe as LINE_SPACINGS, Fe as LINE_SPACING_LABELS, Re as LIST_STYLE_LABELS, sn as MAX_ATTACHMENT_BYTES, be as MAX_BULLETS_PER_SLIDE, _e as MAX_BULLET_CHARS, fe as MAX_CHART_LABELS, de as MAX_CHART_SERIES, ae as MAX_EYEBROW_CHARS, tn as MAX_IMAGE_BYTES, Ee as MAX_NOTES_CHARS, ke as MAX_QUOTE_CHARS, se as MAX_SLIDES, Oe as MAX_SOURCES_PER_SLIDE, U as MAX_SUBTITLE_CHARS, M as MAX_TITLE_CHARS, Ne as MULTILEVEL_STYLES, mt as MentionDropdown, bt as MyMentionsPanel, He as NUMBER_STYLES, xe as NewDocumentModal, Ut as PX_PER_INCH, rt as ParticipantAvatars, we as PresentationEditor, W as PresentationView, $n as ProposalCard, St as ReaderMode, Et as ReviewMode, Pn as ReviewProgress, Rn as ReviewableItem, fr as SHARE_ROLES, Se as SLIDES_TOOLBAR_BREAKPOINTS, De as SLIDE_ID_PATTERN, pe as SLIDE_INSERTS, re as SLIDE_LAYOUTS, P as SLIDE_LAYOUT_LABELS, hr as SUGGESTION_AUTHORING_MODES, ht as SectionBlock, Tt as SectionComments, zt as SectionList, Ct as SectionSummariesCard, ce as SlideForm, H as SlideList, Ae as SlideRow, ge as SlideSources, Ce as SlideStage, oe as SlidesToolbar, ve as SpeakerNotes, jn as StandaloneTiptap, wr as SuggestionCard, gr as SuggestionModeControl, Tr as SuggestionReviewList, Pt as TableOfContents, k as TaskItemRow, A as TaskList, Ke as TiptapEditor, Mt as VersionHistoryPanel, nt as VideoCallPanel, sr as VideoDockSlot, Dt as VideoHistoryPanel, er as WorkItemRow, Qe as WorkspaceDocumentHeaderNotices, ln as ZOOM_FIT, dn as ZOOM_STEPS, an as acceptsDocumentImage, N as addSlide, B as canSaveDeck, gt as canvasBody, Ht as canvasFragmentToMarkdown, Dn as clientIdForUser, Vt as countAllComments, Ar as createAuthenticatedDocumentImage, rn as documentToolbarSize, he as duplicateSlide, ot as findDocumentTarget, on as findMatches, jt as generateSummaryBullets, xt as getInitials, vt as isCanvasDocument, Ie as isLineSpacing, Ue as lineSpacingAttributes, Ge as listTypeFor, te as makeSlide, me as moveSlide, qt as nextMatchIndex, R as nextRevisionLabel, z as nextSlideId, Be as parseLineSpacing, Pe as parseListStyle, ur as readCommentMarginPreference, Zt as readOutline, it as readSchemaVersion, Bt as relativeTime, V as removeSlide, F as replaceSlide, ir as replyLabel, ct as scrollToDocumentTarget, ye as slidesToolbarSize, cn as stackOffsets, j as svgDataUri, I as uncitedSlideIds, dr as useCommentMarginPreference, $e as useDocumentActions, Qt as useDocumentImageUpload, Xt as useDocumentOutline, en as useDocumentToolbarSize, On as useFollowCursor, st as useIsCanvasDocument, pt as useSidebarPanels, L as withLayoutDefaults };
