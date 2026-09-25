import { n as e, t } from "./useWebSocket-C9oAM0NL.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { _ as r } from "./overlayStack-CHdlnODN.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-DDeXW3mZ.js";
import { Y as o, f as s, tt as c } from "./Icons-DpB_pJYh.js";
import { n as l, t as u } from "./Stack-CkiMw5K0.js";
import { i as d, r as f } from "./Text-DJADJSl7.js";
import { t as p } from "./Banner-CaB9d-bY.js";
import { t as m } from "./Chip-zdVBwV9j.js";
import { t as h } from "./Modal-DMFNRUDx.js";
import { t as g } from "./EmptyState-zKbpAhFD.js";
import { t as _ } from "./SegmentedControl-X19S_gNQ.js";
import { n as v } from "./Tabs-DjNsAODd.js";
import { t as y } from "./Input-DLknWXri.js";
import { t as b } from "./Textarea-Dz4doxTv.js";
import { t as x } from "./Avatar-DeJWic2B.js";
import { t as S } from "./InlineAlert-CRnIKeAF.js";
import { t as C } from "./CardHeader-CsPhVpCm.js";
import { t as w } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as T } from "./InlinePopover-DtYo8_ZC.js";
import { t as E } from "./Badge-C23_Y4Yj.js";
import { t as D } from "./ChangeDiff-CzO8zCc-.js";
import { t as O } from "./Select-D2EQq7Wi.js";
import { t as k } from "./Checkbox-Dftwml_V.js";
import { n as ee } from "./FileKindMark-DC9vrnFM.js";
import { t as A } from "./activationKey-CjbL3LUv.js";
import { A as te, k as j } from "./renderers-CLgJ6UYB.js";
import { A as M, B as N, C as P, D as F, E as ne, F as I, G as L, H as re, I as R, J as z, K as B, L as V, M as H, N as U, O as ie, P as ae, R as oe, S as W, T as se, U as ce, V as le, W as ue, _ as de, a as fe, b as pe, c as me, d as he, f as ge, g as _e, h as ve, i as ye, j as be, k as xe, l as Se, m as Ce, n as we, o as Te, p as Ee, r as De, s as Oe, t as ke, u as Ae, v as je, w as Me, x as Ne, y as Pe, z as Fe } from "./PresentationEditor-DPW4A3a7.js";
import { r as Ie } from "./MediaIcons-OLUYBJM0.js";
import { o as Le, t as Re } from "./VerdictChip-ClwrKr68.js";
import { a as ze, c as Be, d as Ve, f as He, h as Ue, i as We, l as Ge, m as Ke, n as qe, o as Je, p as Ye, r as Xe, s as Ze, t as Qe, u as $e } from "./TiptapEditor-CajZRkz8.js";
import { i as et, n as tt, r as nt, t as rt } from "./FloatingComposerDock-DMUQCjea.js";
import { A as it, B as at, C as ot, D as st, E as ct, F as lt, G as ut, H as dt, I as ft, J as pt, K as mt, L as ht, M as gt, N as _t, O as vt, P as yt, R as bt, S as xt, T as St, U as Ct, V as wt, W as Tt, _ as Et, a as Dt, b as Ot, c as kt, d as At, f as jt, g as Mt, h as Nt, i as Pt, j as Ft, k as It, l as Lt, m as Rt, o as zt, p as Bt, q as Vt, r as Ht, s as Ut, t as Wt, u as Gt, v as Kt, w as qt, x as Jt, y as Yt, z as Xt } from "./DocumentEditorPage-BIfn9K4T.js";
import { S as Zt, _ as Qt, a as $t, b as en, c as tn, d as nn, f as rn, g as an, h as on, i as sn, l as cn, m as ln, n as un, o as dn, p as fn, r as pn, s as mn, t as hn, u as gn, v as _n, x as vn, y as yn } from "./useDocumentImageUpload-CUnPIpd8.js";
import { r as bn } from "./RichChatComposer-D7LM60Xw.js";
import { createContext as xn, forwardRef as Sn, useCallback as G, useContext as Cn, useEffect as K, useId as wn, useImperativeHandle as Tn, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import * as En from "yjs";
import { NodeViewWrapper as Dn, ReactNodeViewRenderer as On } from "@tiptap/react";
import { relativePositionToAbsolutePosition as kn, ySyncPluginKey as An } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function jn(e) {
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
var Mn = {
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
function Nn({ status: e }) {
	let t = Mn[e] ?? Mn.draft;
	return /* @__PURE__ */ Z("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Pn = {
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
function Fn({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Q("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Pn[e.mode ?? "editor"] ?? Pn.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function In({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
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
						onKeyDown: A(() => r(e.id)),
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
											/* @__PURE__ */ Z(Nn, { status: e.status }),
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
										children: ["Updated ", jn(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Z("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Z(Fn, {
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
			/* @__PURE__ */ Z(z, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function Ln(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function Rn({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = An.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = kn(t.doc, t.type, En.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var zn = "prosemirror";
function Bn(e) {
	return e.ydoc !== void 0;
}
function Vn(e) {
	return Bn(e) ? /* @__PURE__ */ Z(Hn, { ...e }) : /* @__PURE__ */ Z(Un, { ...e });
}
function Hn({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = zn, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = q(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = J(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Z("div", {
		className: n(c),
		children: /* @__PURE__ */ Z(Qe, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Un({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = zn, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
		children: /* @__PURE__ */ Z(Qe, {
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
function Wn({ current: e, total: t }) {
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
var Gn = {
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
}, Kn = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, qn = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Jn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = Y(!1), [o, s] = Y(""), [c, l] = Y("none"), u = J(e.status), d = Gn[e.status] ?? qn, f = Kn[e.priority] ?? "var(--color-neutral)", [p, m] = Y(!1), h = J(null);
	K(() => () => {
		h.current && clearTimeout(h.current);
	}, []), K(() => {
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
						onClick: _,
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
				children: [/* @__PURE__ */ Z(b, {
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
							onClick: _,
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
var Yn = {
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
function Xn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Yn[e.type] ?? Yn.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
				children: /* @__PURE__ */ Z(Qe, {
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
			e.items.length > 0 && /* @__PURE__ */ Q("div", { children: [e.items.map((e) => /* @__PURE__ */ Z(Jn, {
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
			c && /* @__PURE__ */ Z(Mt, {
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
var Zn = 4;
function Qn({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = Y(0), _ = Math.max(1, Math.ceil(e.length / Zn)), v = h * Zn, y = e.slice(v, v + Zn);
	if (K(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Zn)), s?.());
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
		/* @__PURE__ */ Z(Wn, {
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
				}), /* @__PURE__ */ Z(Xn, {
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
function $n(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function er(e, t) {
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
function tr(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function nr(e) {
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
function rr(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function ir({ events: e, participants: t }) {
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
					rr(e.mode),
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
						children: tr(e.displayName || "Unknown")
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
								$n(e.eventType),
								" ",
								er(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Z("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: nr(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var ar = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, or = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function sr({ label: e, children: t }) {
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
var cr = {
	field: "Field change",
	prose: "Body text"
};
function lr({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: u, edits: d, rationale: f, draftError: p, author: h, category: g, path: _, locationHint: v, verdict: b, verdictStatus: S = "idle", verdictError: C, revision: w, onRereview: T, onAccept: E, onReject: O, onRedraft: k, onReattach: ee, onConfirmAttachment: A, className: te, "data-testid": j = "proposal-card" }) {
	let [M, N] = Y(!1), [P, F] = Y(null), [ne, I] = Y(!1), [L, re] = Y(""), R = i === "applied", z = i === "rejected", B = R || z;
	async function V() {
		N(!0), F(null);
		try {
			let e = await E();
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
	let H = t === "prose" ? d ?? [] : [{
		before: l ?? "",
		after: u ?? ""
	}];
	return /* @__PURE__ */ Q("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", R ? "border-success-border" : "border-border", z && "opacity-60", te),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: g ?? cr[t]
					}),
					h && /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ Z(x, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ Z("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					/* @__PURE__ */ Z(m, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Z(m, {
						tone: or[a],
						size: "sm",
						children: ar[a]
					}),
					o === "healed" && /* @__PURE__ */ Z(m, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ Z(m, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					R && /* @__PURE__ */ Z(m, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					z && /* @__PURE__ */ Z(m, {
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
			/* @__PURE__ */ Z(Le, {
				path: _ ?? (s ? [s] : []),
				...v ? { hint: v } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ Z(sr, {
					label: "Why",
					children: c
				}), f && /* @__PURE__ */ Z(sr, {
					label: "Rationale",
					children: f
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Z("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			p && /* @__PURE__ */ Z("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: p
			}),
			i !== "drafting" && !p && H.length > 0 && /* @__PURE__ */ Z(D, {
				pairs: H,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Z(Re, {
				verdict: b,
				status: S,
				error: C,
				revision: w,
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
			!B && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: M || i === "drafting" || !!p,
						onClick: V,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => I((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					k && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					T && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: T,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					ee && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: ee,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && o === "author_only" && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: A,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			ne && !B && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Z(y, {
						id: `${j}-reason`,
						size: "sm",
						value: L,
						onChange: (e) => re(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								O(L), I(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Z(r, {
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
function ur({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: u, candidates: d, sections: f, onPropose: p, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...d ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = f.filter((e) => !b.has(e.id));
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
					children: [/* @__PURE__ */ Z(m, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), c && /* @__PURE__ */ Z(m, {
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
						onClick: p,
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
					}), /* @__PURE__ */ Z(O, {
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
var dr = "[data-comment-id]", fr = 240;
function pr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function mr(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function hr({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
	let [u, d] = Y(null), f = J(null), p = J(null), h = J(null);
	h.current = u;
	let g = q(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = J(g);
	_.current = g;
	let v = G(() => {
		p.current !== null && (clearTimeout(p.current), p.current = null);
	}, []), y = G(() => {
		v(), d(null);
	}, [v]), b = G((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${pr(e)}"]`) ?? null;
		i instanceof HTMLElement && (f.current = i, d({
			id: e,
			via: r
		}));
	}, [v, t]);
	Tn(c, () => ({
		openComment: (e, t) => b(e, t, "click"),
		close: y
	}), [b, y]);
	let S = J(null), C = u?.id ?? null;
	K(() => {
		S.current !== C && (S.current = C, a?.(C));
	}, [C, a]), K(() => v, [v]), K(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(dr) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (h.current?.id === n) {
					y();
					return;
				}
				b(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (v(), h.current?.id !== a && (p.current = setTimeout(() => b(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (v(), p.current = setTimeout(() => {
				h.current?.via === "hover" && y();
			}, fr));
		};
		return e.addEventListener("click", a), e.addEventListener("mouseover", o), e.addEventListener("mouseout", s), () => {
			e.removeEventListener("click", a), e.removeEventListener("mouseover", o), e.removeEventListener("mouseout", s);
		};
	}, [
		t,
		i,
		n,
		b,
		y,
		v
	]);
	let w = C ? g.get(C) ?? null : null, E = (e) => () => {
		w && (e?.(w.id), y());
	};
	return /* @__PURE__ */ Z(T, {
		trigger: f,
		open: !!w,
		onClose: y,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": w ? `Comment by ${w.author}` : void 0,
		"data-testid": l,
		children: w && /* @__PURE__ */ Q("div", {
			"data-testid": `${l}-card`,
			"data-comment-id": w.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), p.current = setTimeout(() => {
					h.current?.via === "hover" && y();
				}, fr);
			},
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Z(x, {
							name: w.author,
							size: 20,
							color: w.color
						}),
						/* @__PURE__ */ Z("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: w.author
						}),
						w.timestamp && /* @__PURE__ */ Z("span", {
							className: "text-[11px] text-text-tertiary",
							children: xt(w.timestamp)
						}),
						w.resolved && /* @__PURE__ */ Z(m, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				w.quote && /* @__PURE__ */ Z("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: w.quote
				}),
				/* @__PURE__ */ Z("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: w.text
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Z("span", {
						"data-testid": `${l}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: mr(w.replyCount ?? 0)
					}), /* @__PURE__ */ Q("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${l}-open`,
							children: "Open thread"
						}), s && !w.resolved && /* @__PURE__ */ Z(r, {
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
function gr() {
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
function _r({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
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
					icon: /* @__PURE__ */ Z(gr, {}),
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
function vr({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
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
//#region src/components/doc-editor/useCommentMarginPreference.ts
var yr = "doc-editor:canvas:gutter-visible";
function br(e = yr, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function xr({ storageKey: e = yr, defaultVisible: t = !1 } = {}) {
	let [n, r] = Y(() => br(e, t)), i = G((t) => {
		try {
			window.localStorage.setItem(e, t ? "1" : "0");
		} catch {}
		r(t);
	}, [e]);
	return {
		visible: n,
		toggle: G(() => {
			r((t) => {
				let n = !t;
				try {
					window.localStorage.setItem(e, n ? "1" : "0");
				} catch {}
				return n;
			});
		}, [e]),
		show: G(() => i(!0), [i])
	};
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var Sr = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], Cr = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function wr({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, m] = Y(""), g = () => {
		let e = p.trim();
		!e || !l || (l(e), m(""));
	};
	return /* @__PURE__ */ Z(h, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-4",
			"data-testid": f,
			children: [
				l && /* @__PURE__ */ Q("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ Z("input", {
						value: p,
						onChange: (e) => m(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && g();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						onClick: g,
						disabled: !p.trim(),
						"data-testid": `${f}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ Z("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${f}-notice`,
					children: d
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${f}-people`,
					children: i.map((e) => /* @__PURE__ */ Q("div", {
						className: "flex items-center gap-2",
						"data-testid": `${f}-person`,
						children: [
							/* @__PURE__ */ Z(x, {
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
								"data-testid": `${f}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ Z("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${f}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: Sr.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Z("option", {
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
						"data-testid": `${f}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(Cr).map((e) => /* @__PURE__ */ Z("option", {
							value: e,
							children: Cr[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ Z(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${f}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ Z("span", {}), /* @__PURE__ */ Z(r, {
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
var Tr = [
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
function Er({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = Tr.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = Tr.find((t) => t.value === e);
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Z(_, {
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
var Dr = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, Or = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, kr = 6, Ar = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function jr(e) {
	let t = Ar.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function Mr(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Nr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, kr), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Q("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Z(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > kr && /* @__PURE__ */ Q("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - kr,
				" more"
			]
		})]
	});
}
function Pr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = jr(t.trim() === "" ? "Unknown author" : t.trim()), v = c && c.length > 0 ? c : s ? [s] : [], y = l && l.length > 0 ? l : o ? [o] : [], b = v.length > 0 || y.length > 0;
	return /* @__PURE__ */ Q("div", {
		"data-testid": h,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ Z(x, {
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
						children: Mr(i)
					}),
					/* @__PURE__ */ Z("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", Or[e]),
						"data-testid": `${h}-kind`,
						children: Dr[e]
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
			b && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${h}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [y.length > 0 && /* @__PURE__ */ Z(Nr, {
					lines: y,
					tone: "delete",
					testId: `${h}-deleted`
				}), v.length > 0 && /* @__PURE__ */ Z(Nr, {
					lines: v,
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
function Fr({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: l = "No suggestions", emptyBody: u = "Proposed changes to this document show up here for review.", title: d = "Suggestions", variant: f = "card", className: h, "data-testid": _ = "suggestion-review-list" }) {
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
	}) : void 0, b = /* @__PURE__ */ Q(X, { children: [s && /* @__PURE__ */ Z("div", {
		className: n("pt-2", f === "card" && "px-3"),
		children: /* @__PURE__ */ Z(p, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: s
		})
	}), e === 0 ? /* @__PURE__ */ Z(g, {
		size: "sm",
		title: l,
		body: u,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ Z("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return f === "pane" ? /* @__PURE__ */ Q("div", {
		className: n("flex min-h-0 flex-1 flex-col", h),
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
			children: b
		})]
	}) : /* @__PURE__ */ Q(i, {
		padding: "none",
		className: n("overflow-hidden", h),
		"data-testid": _,
		children: [/* @__PURE__ */ Z(C, {
			title: d,
			meta: /* @__PURE__ */ Z(m, {
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
var Ir = (e) => e.startsWith("/api/uploads/"), Lr = xn(null);
function Rr({ children: e, ...t }) {
	return /* @__PURE__ */ Z(Lr.Provider, {
		value: t,
		children: e
	});
}
function zr({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = Cn(Lr), o = a?.loadImage, s = a?.requiresAuthentication ?? Ir, [c, l] = Y(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
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
	]), /* @__PURE__ */ Z(Dn, {
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
function Br(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return On(zr);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Vr({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = Y(""), [o, s] = Y(!1), [c, d] = Y(null), p = J(!1);
	async function h(e) {
		if (!p.current) {
			p.current = !0, s(!0), d(null);
			try {
				await e(), a("");
			} catch (e) {
				d(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				p.current = !1, s(!1);
			}
		}
	}
	let g = e.reviewerName || e.reviewerId, _ = e.state.replace(/_/g, " "), v = _.charAt(0).toUpperCase() + _.slice(1);
	return /* @__PURE__ */ Z(B, {
		"aria-label": `Review by ${g}`,
		"aria-busy": o,
		children: /* @__PURE__ */ Q(l, {
			gap: "sm",
			children: [
				/* @__PURE__ */ Q(u, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Z("strong", { children: g }),
						/* @__PURE__ */ Z(m, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: v
						}),
						e.required && /* @__PURE__ */ Z(m, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Z(f, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				c && /* @__PURE__ */ Z(S, {
					tone: "error",
					children: c
				}),
				t && e.state === "pending" && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(b, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: o,
					"aria-label": `Review comment for ${g}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ Q(u, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: o,
						onClick: () => void h(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: o,
						onClick: () => void h(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Z(r, {
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
function Hr({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: s, onDecide: c, onWithdraw: d }) {
	let [f, p] = Y(""), [m, h] = Y(""), [g, _] = Y(!0), [v, y] = Y(!1), [x, C] = Y(null), w = J(!1);
	async function T() {
		if (!(!s || !t.some((e) => e.id === f) || w.current)) {
			w.current = !0, y(!0), C(null);
			try {
				await s({
					reviewerId: f,
					note: m.trim(),
					required: g
				}), h(""), p("");
			} catch (e) {
				C(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				w.current = !1, y(!1);
			}
		}
	}
	return /* @__PURE__ */ Q(l, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Z(S, {
				tone: "error",
				children: a
			}),
			s && /* @__PURE__ */ Q(l, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Z(O, {
						"aria-label": "Reviewer",
						placeholder: "Choose a reviewer",
						value: f,
						disabled: v || i,
						options: t.map((e) => ({
							value: e.id,
							label: e.displayName
						})),
						onChange: (e) => p(e.target.value)
					}),
					/* @__PURE__ */ Z(b, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: v,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ Q(u, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Z(k, {
							checked: g,
							onChange: _,
							disabled: v
						}), "Required review"]
					}),
					x && /* @__PURE__ */ Z(S, {
						tone: "error",
						children: x
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						disabled: v || i || !t.some((e) => e.id === f),
						onClick: () => void T(),
						children: v ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Z(L, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ Z(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: o,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ Z(Vr, {
					request: e,
					onDecide: e.reviewerId === n ? c : void 0,
					onWithdraw: d
				}, e.requestKey))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/EditorShell.tsx
var Ur = [
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
function Wr({ filled: e }) {
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
function Gr({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: o, starred: c = !1, onStarredChange: l, statusPill: u, path: f, crumbsTrailing: p, subtitle: h, metaBar: g, participants: _, onParticipantClick: y, onFollowParticipant: b, followingParticipantId: x, meta: S, saveState: C, headActions: T, tabs: D, activeTab: O, onTabChange: k, toolbar: A, children: te, footer: j, surface: M = "workspace", explorer: N, workbench: P, label: F = "Editor", variant: ne = "document", itemType: I, itemKey: L, titleSize: re = "md", tabsTrailing: R, className: z, "data-testid": B = "editor-shell" }) {
	let V = ne === "work-item", H = V && (I || L) ? /* @__PURE__ */ Q(X, { children: [I && /* @__PURE__ */ Z(m, {
		size: "sm",
		tone: "info",
		"data-testid": `${B}-item-type`,
		children: I
	}), L && /* @__PURE__ */ Z("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${B}-item-key`,
		children: L
	})] }) : null, U = H || p != null ? /* @__PURE__ */ Q(X, { children: [H, p] }) : null, ie = V && (e && e.length > 0 || U != null), ae = re === "lg" ? "text-[26px] font-semibold leading-8" : V ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", oe = `${B}-${wn().replace(/:/g, "")}`, W = !!D && D.length > 0, se = W ? D.some((e) => e.id === O) ? O : D[0].id : void 0, ce = _ && _.length > 0 || S != null || !!C, le = (e) => /* @__PURE__ */ Z(v, {
		items: D.map((e) => ({
			id: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {},
			...e.count ? { badge: V ? /* @__PURE__ */ Z("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}) : /* @__PURE__ */ Z(E, {
				variant: "count",
				value: e.count,
				color: "muted",
				"aria-label": `${e.count} in ${e.label}`
			}) } : {},
			testId: `${B}-tab-${e.id}`
		})),
		value: se,
		onValueChange: (e) => k?.(e),
		variant: "underline",
		...V ? { badgeStyle: "plain" } : {},
		size: "md",
		itemClassName: "px-3.5 pb-1.5 pt-1 text-[15px] leading-5",
		"aria-label": `${t} sections`,
		idPrefix: oe,
		className: e
	}), de = /* @__PURE__ */ Q("section", {
		"aria-label": F,
		"data-testid": B,
		"data-surface": M,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ Q("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-variant": ne,
				"data-testid": `${B}-header`,
				children: [
					ie && /* @__PURE__ */ Q("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${B}-crumbs-row`,
						children: [
							/* @__PURE__ */ Z(s, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ Z(d, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								className: "min-w-0 text-[13px] text-text-secondary",
								"data-testid": `${B}-crumbs`
							}),
							e && e.length > 0 && U != null && /* @__PURE__ */ Z("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							U != null && /* @__PURE__ */ Z("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${B}-crumbs-trailing`,
								children: U
							}),
							/* @__PURE__ */ Z("span", { className: "flex-1" }),
							T && /* @__PURE__ */ Z("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${B}-actions`,
								children: T
							})
						]
					}),
					!V && e && e.length > 0 && !p && /* @__PURE__ */ Z(d, {
						items: e,
						maxItems: 4,
						className: "text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${B}-crumbs`
					}),
					!V && p && /* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${B}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ Z(d, {
							items: e,
							maxItems: 4,
							className: "min-w-0 text-xs",
							"data-testid": `${B}-crumbs`
						}), /* @__PURE__ */ Z("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${B}-crumbs-trailing`,
							children: p
						})]
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [
							o && !V && /* @__PURE__ */ Z(ee, {
								kind: o,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${B}-kind`
							}),
							/* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-1 flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ Q("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${B}-title-group`,
												children: [r ? /* @__PURE__ */ Z(ue, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", ae, V && "relative -left-[5px]"),
													"data-testid": `${B}-title`
												}) : /* @__PURE__ */ Z("h1", {
													className: n("m-0 min-w-0 max-w-full flex-initial truncate text-text-primary", ae),
													"data-testid": `${B}-title`,
													children: t
												}), l && /* @__PURE__ */ Z(a, {
													size: "sm",
													"aria-label": c ? "Remove star" : "Star this file",
													"aria-pressed": c,
													title: c ? "Starred" : "Star",
													onClick: () => l(!c),
													className: c ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${B}-star`,
													children: /* @__PURE__ */ Z(Wr, { filled: c })
												})]
											}),
											u,
											f && f.length > 0 && /* @__PURE__ */ Z("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${B}-path`,
												children: /* @__PURE__ */ Z(d, {
													items: f,
													maxItems: 4,
													lastIsCurrent: !1,
													className: "min-w-0 text-[13px] text-text-tertiary",
													"data-testid": `${B}-path-crumbs`
												})
											})
										]
									}),
									h != null && /* @__PURE__ */ Z("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${B}-subtitle`,
										children: h
									}),
									ce && /* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${B}-byline`,
										children: [
											_ && _.length > 0 && /* @__PURE__ */ Z(w, {
												users: _,
												size: 22,
												maxVisible: 4,
												...y ? { onUserClick: y } : {},
												...b ? {
													onFollowUser: b,
													followingUserId: x ?? null
												} : {}
											}),
											S != null && /* @__PURE__ */ Z("span", {
												className: "min-w-0 truncate",
												children: S
											}),
											/* @__PURE__ */ Z(ft, {
												state: C,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							T && !ie && /* @__PURE__ */ Z("div", {
								className: "flex shrink-0 items-center gap-3",
								"data-testid": `${B}-actions`,
								children: T
							})
						]
					}),
					g != null && /* @__PURE__ */ Z("div", {
						className: n("flex min-w-0 items-center", V ? re === "lg" ? "pb-2 pt-1" : "pb-2 pt-3" : "py-2"),
						"data-testid": `${B}-meta-bar`,
						children: g
					}),
					R == null ? W ? le("-mb-px -ml-3 mt-1 border-b-0") : /* @__PURE__ */ Z("span", {
						className: "h-2",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ Q("div", {
						className: "-mb-px mt-1 flex min-w-0 items-end gap-3",
						"data-testid": `${B}-tabs-row`,
						children: [W ? le("-ml-3 min-w-0 flex-1 border-b-0") : /* @__PURE__ */ Z("span", {
							className: "flex-1",
							"aria-hidden": "true"
						}), /* @__PURE__ */ Z("div", {
							className: "flex shrink-0 items-center gap-2 pb-1.5",
							"data-testid": `${B}-tabs-trailing`,
							children: R
						})]
					})
				]
			}),
			A && /* @__PURE__ */ Z("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${B}-toolbar`,
				children: A
			}),
			/* @__PURE__ */ Q("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", M === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${B}-surface`,
				children: [/* @__PURE__ */ Z("div", {
					...W ? {
						role: "tabpanel",
						id: `${oe}-panel-${se}`,
						"aria-labelledby": `${oe}-tab-${se}`
					} : {},
					className: "min-h-0 flex-1 overflow-auto",
					"data-testid": `${B}-scroller`,
					children: te
				}), j != null && /* @__PURE__ */ Z("div", {
					className: "relative z-20 flex max-h-[var(--dock-max-height,50%)] min-h-0 shrink-0 flex-col",
					"data-testid": `${B}-dock`,
					children: /* @__PURE__ */ Z(rt.Provider, {
						value: "pinned",
						children: j
					})
				})]
			})
		]
	});
	return !N && !P ? /* @__PURE__ */ Z("div", {
		className: n("flex h-full min-h-0 flex-col", z),
		children: de
	}) : /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", z),
		"data-testid": `${B}-frame`,
		children: [N && /* @__PURE__ */ Z("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${B}-explorer`,
			children: N
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [de, P && /* @__PURE__ */ Z("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${B}-workbench`,
				children: P
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/DictationButton.tsx
var Kr = 250;
function qr(e, t, n) {
	return n || (e === "unsupported" ? "Dictation needs a microphone and a secure page" : t ? "Listening — release to insert" : e === "transcribing" ? "Transcribing…" : e === "starting" ? "Starting the microphone…" : "Hold to dictate");
}
function Jr({ state: e, micActive: t, unavailableReason: r, onStart: i, onStop: a, className: o, "data-testid": s = "dictation-button" }) {
	let c = J(null), l = qr(e, t, r), u = e === "transcribing" || e === "starting", d = () => {
		if (t) {
			a(), c.current = null;
			return;
		}
		c.current = Date.now(), i();
	}, f = () => {
		let e = c.current;
		e !== null && (c.current = null, !(Date.now() - e < 250) && a());
	};
	return /* @__PURE__ */ Z("button", {
		type: "button",
		"aria-label": l,
		title: l,
		"aria-pressed": t,
		"data-state": t ? "listening" : e,
		"data-testid": s,
		onPointerDown: (e) => {
			e.button === 0 && (e.preventDefault(), d());
		},
		onPointerUp: f,
		onPointerLeave: f,
		onKeyDown: (e) => {
			(e.key === " " || e.key === "Enter") && !e.repeat && (e.preventDefault(), d());
		},
		onKeyUp: (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), f());
		},
		className: n("grid h-7 w-7 shrink-0 place-items-center rounded-md border-0 p-0 transition-colors", t ? "bg-danger text-white" : "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary", u && "animate-pulse", (r || e === "unsupported") && "opacity-60", o),
		children: /* @__PURE__ */ Z(Ie, {
			size: 15,
			"aria-hidden": "true"
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentReplyComposer.tsx
var $ = {
	resolve: "/resolve",
	agent: "/agent",
	assign: "/assign"
};
function Yr(e) {
	let t = e.text.trim();
	if (!t) return { kind: "empty" };
	let n = /^\/(resolve|agent|assign)\b\s*([\s\S]*)$/i.exec(t);
	if (!n) return {
		kind: "reply",
		text: t
	};
	let r = n[2].trim();
	switch (n[1].toLowerCase()) {
		case "resolve": return {
			kind: "resolve",
			note: r
		};
		case "agent": return {
			kind: "agent",
			instruction: r
		};
		default: {
			let t = e.command?.trigger === $.assign ? e.command.argument : void 0, n = (t?.label ?? r).replace(/^@/, "").trim();
			return {
				kind: "assign",
				userId: t?.id ?? null,
				name: n
			};
		}
	}
}
var Xr = Sn(function({ mentionUsers: e, onReply: t, onResolve: r, onAskAgent: i, onAssign: a, onCancel: o, dictation: s, placeholder: c = "Reply or type /", variant: l = "card", submitLabel: u = "Reply", className: d, "data-testid": f = "comment-reply-composer" }, p) {
	let m = J(null);
	Tn(p, () => ({
		focus: () => m.current?.focus(),
		insertText: (e) => {
			let t = m.current;
			if (!t) return;
			let n = t.editor?.getText() ?? "";
			t.insertText(n && !/\s$/.test(n) ? ` ${e}` : e);
		}
	}), []);
	let h = q(() => e.filter((e) => e.type === "user"), [e]), g = G((t) => {
		let n = t.trim().toLowerCase();
		return e.filter((e) => !n || e.displayName.toLowerCase().includes(n)).slice(0, 8).map((e) => ({
			id: e.userId,
			label: e.displayName,
			color: e.color,
			...e.type === "group" ? { hint: `${e.memberCount ?? 0} people` } : {}
		}));
	}, [e]), _ = q(() => {
		let e = [];
		return r && e.push({
			trigger: $.resolve,
			label: "Resolve thread"
		}), i && e.push({
			trigger: $.agent,
			label: "Ask the agent"
		}), a && e.push({
			trigger: $.assign,
			label: "Assign to…",
			argument: {
				placeholder: "type a name",
				search: (e) => {
					let t = e.replace(/^@/, "").trim().toLowerCase();
					return h.filter((e) => !t || e.displayName.toLowerCase().includes(t)).slice(0, 8).map((e) => ({
						id: e.userId,
						label: e.displayName,
						...e.online ? { hint: "online" } : {}
					}));
				}
			}
		}), e;
	}, [
		r,
		i,
		a,
		h
	]), v = G(async (e) => {
		let n = Yr(e);
		switch (n.kind) {
			case "empty": return !1;
			case "reply": return await t(n.text) !== !1;
			case "resolve": return r ? n.note && await t(n.note) === !1 ? !1 : (r(), !0) : await t(e.text.trim()) !== !1;
			case "agent": return i ? (i(n.instruction), !0) : await t(e.text.trim()) !== !1;
			case "assign": {
				let e = n.userId ? h.find((e) => e.userId === n.userId) : h.find((e) => e.displayName.toLowerCase() === n.name.toLowerCase());
				return !a || !e ? !1 : (a(e), !0);
			}
		}
	}, [
		t,
		r,
		i,
		a,
		h
	]), y = s?.micActive === !0;
	return /* @__PURE__ */ Z("div", {
		className: n("flex flex-col gap-1", d),
		"data-testid": f,
		onKeyDown: (e) => {
			e.key === "Escape" && o && (e.stopPropagation(), o());
		},
		children: /* @__PURE__ */ Z(bn, {
			ref: m,
			onSend: v,
			onSearchPeople: g,
			commands: _,
			placeholder: y ? "Listening… release to insert" : c,
			density: l === "dock" ? "comfortable" : "compact",
			toolbar: l === "dock" ? "editor" : "compact",
			...l === "dock" ? { backdropTone: "none" } : { radius: "md" },
			allowAttachments: !1,
			allowEmoji: !1,
			submitLabel: u,
			...s ? { submitLead: /* @__PURE__ */ Z(Jr, {
				state: s.state,
				micActive: s.micActive,
				...s.unavailableReason ? { unavailableReason: s.unavailableReason } : {},
				onStart: s.start,
				onStop: s.stop,
				"data-testid": `${f}-mic`
			}) } : {},
			"data-testid": `${f}-input`
		})
	});
});
//#endregion
//#region src/components/doc-editor/CommentHandoffBar.tsx
function Zr({ author: e, quote: t, variant: r = "agent", resolveOnApply: i = !1, onResolveOnApplyChange: a, onDismiss: s, className: l, "data-testid": u = "comment-handoff-bar" }) {
	let d = r === "reply", f = d ? "Stop replying" : "Stop answering this comment";
	return /* @__PURE__ */ Q("div", {
		role: "status",
		"data-testid": u,
		"data-variant": r,
		className: n("flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm", l),
		children: [
			d ? /* @__PURE__ */ Z(o, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-primary"
			}) : /* @__PURE__ */ Z(c, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-info-fg"
			}),
			/* @__PURE__ */ Q("span", {
				className: "min-w-0 flex-1 truncate",
				children: [
					d ? "Replying to " : "Answering ",
					/* @__PURE__ */ Z("span", {
						className: "font-semibold text-text-primary",
						children: e
					}),
					d ? null : "’s comment",
					t ? /* @__PURE__ */ Q("span", {
						className: "text-text-tertiary",
						children: [
							" on “",
							t,
							"”"
						]
					}) : null
				]
			}),
			d ? /* @__PURE__ */ Z("span", {
				className: "hidden shrink-0 text-text-tertiary sm:inline",
				children: "Esc to go back"
			}) : /* @__PURE__ */ Q("label", {
				className: "inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary",
				children: [/* @__PURE__ */ Z(k, {
					checked: i,
					onChange: (e) => a?.(e),
					"data-testid": `${u}-resolve`
				}), "Resolve when applied"]
			}),
			/* @__PURE__ */ Z("button", {
				type: "button",
				onClick: s,
				"aria-label": f,
				title: f,
				"data-testid": `${u}-dismiss`,
				className: "grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
				children: /* @__PURE__ */ Z("span", {
					"aria-hidden": "true",
					children: "×"
				})
			})
		]
	});
}
//#endregion
export { Qn as AckMode, Lt as ActionItemsCard, ir as ActivityFeed, St as AttachmentsPanel, zr as AuthenticatedDocumentImageView, qe as BULLET_STYLES, Ct as CANVAS_BODY_KEY, Tt as CANVAS_SCHEMA_VERSION, yr as COMMENT_MARGIN_STORAGE_KEY, $ as COMMENT_REPLY_COMMANDS, $t as CanvasDocumentView, Ge as CanvasLineSpacing, Xe as CanvasListStyle, Xn as ChunkViewer, Et as CommentContextHeader, hr as CommentGhostPopover, Zr as CommentHandoffBar, Xr as CommentReplyComposer, Kt as CommentThreadNode, rt as ComposerDockPlacementContext, ge as DECK_THEMES, Ur as DEFAULT_EDITOR_SHELL_TABS, Kr as DICTATION_HOLD_MS, tt as DOCK_HEIGHT_VAR, nt as DOCK_INSET_VAR, yt as DOCUMENT_MODE_LABELS, nn as DOCUMENT_TOOLBAR_BREAKPOINTS, Jr as DictationButton, Ut as DiffViewer, Wt as DocumentEditorPage, dn as DocumentFindBar, cn as DocumentGutter, it as DocumentHeader, Rr as DocumentImageProvider, Ft as DocumentLifecyclePill, In as DocumentListPage, lt as DocumentModePill, en as DocumentOutline, _t as DocumentOwnership, Hr as DocumentReviewPanel, vn as DocumentRuler, ft as DocumentSaveStatus, wr as DocumentShareDialog, Qt as DocumentStatusBar, rn as DocumentToolbar, Gr as EditorShell, Ue as EditorToolbar, jt as ExecutiveSummaryCard, Ae as Filmstrip, he as FilmstripThumb, et as FloatingComposerDock, vr as FloatingDockBar, It as FollowModeBar, Bt as HeaderBanner, Gt as KeyDecisionsCard, $e as LINE_SPACINGS, Ve as LINE_SPACING_LABELS, We as LIST_STYLE_LABELS, hn as MAX_ATTACHMENT_BYTES, Ee as MAX_BULLETS_PER_SLIDE, Ce as MAX_BULLET_CHARS, ve as MAX_CHART_LABELS, _e as MAX_CHART_SERIES, de as MAX_EYEBROW_CHARS, un as MAX_IMAGE_BYTES, je as MAX_NOTES_CHARS, Pe as MAX_QUOTE_CHARS, pe as MAX_SLIDES, Ne as MAX_SOURCES_PER_SLIDE, W as MAX_SUBTITLE_CHARS, P as MAX_TITLE_CHARS, ze as MULTILEVEL_STYLES, qt as MentionDropdown, Dt as MyMentionsPanel, Je as NUMBER_STYLES, z as NewDocumentModal, re as OLDER_REVISIONS_VALUE, Zt as PX_PER_INCH, ht as ParticipantAvatars, ke as PresentationEditor, le as PresentationView, lr as ProposalCard, kt as ReaderMode, Yt as ResolvedBanner, Nt as ReviewMode, Wn as ReviewProgress, Jn as ReviewableItem, Sr as SHARE_ROLES, De as SLIDES_TOOLBAR_BREAKPOINTS, Me as SLIDE_ID_PATTERN, ye as SLIDE_INSERTS, se as SLIDE_LAYOUTS, ne as SLIDE_LAYOUT_LABELS, Tr as SUGGESTION_AUTHORING_MODES, st as SectionBlock, Mt as SectionComments, ct as SectionList, At as SectionSummariesCard, me as SlideForm, oe as SlideList, Fe as SlideRow, Se as SlideSources, Oe as SlideStage, fe as SlidesToolbar, we as SpeakerNotes, Vn as StandaloneTiptap, Pr as SuggestionCard, Er as SuggestionModeControl, Fr as SuggestionReviewList, Ht as TableOfContents, te as TaskItemRow, j as TaskList, Qe as TiptapEditor, zt as VersionHistoryPanel, vt as VideoCallPanel, _r as VideoDockSlot, Pt as VideoHistoryPanel, ur as WorkItemRow, gt as WorkspaceDocumentHeaderNotices, _n as ZOOM_FIT, yn as ZOOM_STEPS, pn as acceptsDocumentImage, F as addSlide, ie as canSaveDeck, ut as canvasBody, wt as canvasFragmentToMarkdown, Ln as clientIdForUser, Yr as commentReplyIntent, Ot as countAllComments, Br as createAuthenticatedDocumentImage, qr as dictationButtonLabel, fn as documentToolbarSize, xe as duplicateSlide, bt as findDocumentTarget, mn as findMatches, Rt as generateSummaryBullets, Jt as getInitials, mt as isCanvasDocument, He as isLineSpacing, Ye as lineSpacingAttributes, Ze as listTypeFor, M as makeSlide, be as moveSlide, tn as nextMatchIndex, H as nextRevisionLabel, U as nextSlideId, Ke as parseLineSpacing, Be as parseListStyle, br as readCommentMarginPreference, on as readOutline, Vt as readSchemaVersion, xt as relativeTime, ae as removeSlide, I as replaceSlide, mr as replyLabel, ot as resolverLabel, ce as revisionPickerOptions, Xt as scrollToDocumentTarget, Te as slidesToolbarSize, gn as stackOffsets, N as svgDataUri, R as uncitedSlideIds, xr as useCommentMarginPreference, dt as useDocumentActions, sn as useDocumentImageUpload, an as useDocumentOutline, ln as useDocumentToolbarSize, Rn as useFollowCursor, pt as useIsCanvasDocument, at as useSidebarPanels, V as withLayoutDefaults };
