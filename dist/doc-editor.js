import { n as e, t } from "./useWebSocket-BQgHqMAQ.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { v as r } from "./overlayStack-DWxp7Rsz.js";
import { t as i } from "./Card-CbTNNNkk.js";
import { t as a } from "./Chip-QXPdpJoz.js";
import { t as o } from "./IconButton-VqtspsS5.js";
import { ct as s, nt as c, p as l } from "./Icons-_hcrQmPz.js";
import { n as u, t as d } from "./Stack-DNMA-_4L.js";
import { t as f } from "./Breadcrumbs-ZdYJODLL.js";
import { t as p } from "./Badge-BV6tPLgZ.js";
import { t as m } from "./Banner-CmrqvKtx.js";
import { t as h } from "./Modal-R-ipbeZi.js";
import { t as g } from "./Input-CpLq80dw.js";
import { t as _ } from "./EmptyState-DnbFBYDA.js";
import { n as v } from "./Tabs-BArH-7z_.js";
import { t as y } from "./Textarea-Drx4YDDG.js";
import { t as b } from "./Avatar-k-lopdn-.js";
import { t as x } from "./SegmentedControl-Buix_cko.js";
import { t as S } from "./InlineAlert-CBtteaVZ.js";
import { t as C } from "./CardHeader-C50GEAmo.js";
import { t as w } from "./PresenceAvatars-DlmKqodq.js";
import { t as T } from "./InlinePopover-PfCtP6n9.js";
import { t as E } from "./ChangeDiff-BHerlwTS.js";
import { r as D } from "./Text-DrPQe5RD.js";
import { t as O } from "./Select-ErGXS9Yj.js";
import { t as k } from "./Checkbox-BC03mkQI.js";
import { n as ee } from "./FileKindMark-Cs3Q8iud.js";
import { t as A } from "./activationKey-CjbL3LUv.js";
import { A as te, k as j } from "./renderers-B4G34vmP.js";
import { A as M, B as N, C as P, D as F, E as ne, F as I, G as L, H as R, I as z, J as B, K as V, L as re, M as H, N as U, O as ie, P as W, R as ae, S as oe, T as se, U as G, V as ce, W as le, Y as ue, Z as de, _ as fe, a as pe, b as me, c as he, d as ge, f as _e, g as ve, h as ye, i as be, j as xe, k as Se, l as Ce, m as we, n as Te, o as Ee, p as De, q as Oe, r as ke, s as Ae, t as je, u as Me, v as Ne, w as Pe, x as Fe, y as Ie, z as Le } from "./ProposedEditStrip-CZ43IwHS.js";
import { i as Re } from "./MediaIcons-_ai5Til2.js";
import { o as ze, t as Be } from "./VerdictChip-CSV5IQDb.js";
import { a as Ve, c as He, d as Ue, f as We, h as Ge, i as Ke, l as qe, m as Je, n as Ye, o as Xe, p as Ze, r as Qe, s as $e, t as et, u as tt } from "./TiptapEditor-D4GkRCY3.js";
import { i as nt, n as rt, r as it, t as at } from "./FloatingComposerDock-ZezHreIm.js";
import { A as ot, B as st, C as ct, D as lt, E as ut, F as dt, G as ft, H as pt, I as mt, J as ht, K as gt, L as _t, M as vt, N as yt, O as bt, P as xt, R as St, S as Ct, T as wt, U as Tt, V as Et, W as Dt, _ as Ot, a as kt, b as At, c as jt, d as Mt, f as Nt, g as Pt, h as Ft, i as It, j as Lt, k as Rt, l as zt, m as Bt, o as Vt, p as Ht, q as Ut, r as Wt, s as Gt, t as Kt, u as qt, v as Jt, w as Yt, x as Xt, y as Zt, z as Qt } from "./DocumentEditorPage-8naEAZL9.js";
import { C as $t, S as en, T as tn, _ as nn, a as rn, b as an, c as on, d as sn, f as cn, g as ln, h as un, i as dn, l as fn, m as pn, n as mn, o as hn, p as gn, r as _n, s as vn, t as yn, u as bn, v as xn, w as Sn, x as Cn, y as wn } from "./useDocumentImageUpload-Davah7mv.js";
import { r as Tn } from "./RichChatComposer-Ch2_Ok4_.js";
import { forwardRef as En, useCallback as K, useEffect as q, useId as Dn, useImperativeHandle as On, useMemo as J, useRef as Y, useState as X } from "react";
import { Fragment as Z, jsx as Q, jsxs as $ } from "react/jsx-runtime";
import * as kn from "yjs";
import { relativePositionToAbsolutePosition as An, ySyncPluginKey as jn } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function Mn(e) {
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
var Nn = {
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
function Pn({ status: e }) {
	let t = Nn[e] ?? Nn.draft;
	return /* @__PURE__ */ Q("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Fn = {
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
function In({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ $("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Fn[e.mode ?? "editor"] ?? Fn.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function Ln({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
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
						onKeyDown: A(() => r(e.id)),
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
											/* @__PURE__ */ Q(Pn, { status: e.status }),
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
										children: ["Updated ", Mn(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Q("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Q(In, {
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
			/* @__PURE__ */ Q(de, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function Rn(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function zn({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = jn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = An(t.doc, t.type, kn.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var Bn = "prosemirror";
function Vn(e) {
	return e.ydoc !== void 0;
}
function Hn(e) {
	return Vn(e) ? /* @__PURE__ */ Q(Un, { ...e }) : /* @__PURE__ */ Q(Wn, { ...e });
}
function Un({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = Bn, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = J(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = Y(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Q("div", {
		className: n(c),
		children: /* @__PURE__ */ Q(et, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Wn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = Bn, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
		children: /* @__PURE__ */ Q(et, {
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
function Gn({ current: e, total: t }) {
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
var Kn = {
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
}, qn = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, Jn = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Yn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = X(!1), [o, s] = X(""), [c, l] = X("none"), u = Y(e.status), d = Kn[e.status] ?? Jn, f = qn[e.priority] ?? "var(--color-neutral)", [p, m] = X(!1), h = Y(null);
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
				children: [/* @__PURE__ */ Q(y, {
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
var Xn = {
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
function Zn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Xn[e.type] ?? Xn.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
				children: /* @__PURE__ */ Q(et, {
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
			e.items.length > 0 && /* @__PURE__ */ $("div", { children: [e.items.map((e) => /* @__PURE__ */ Q(Yn, {
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
			c && /* @__PURE__ */ Q(Pt, {
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
var Qn = 4;
function $n({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = X(0), _ = Math.max(1, Math.ceil(e.length / Qn)), v = h * Qn, y = e.slice(v, v + Qn);
	if (q(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Qn)), s?.());
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
		/* @__PURE__ */ Q(Gn, {
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
				}), /* @__PURE__ */ Q(Zn, {
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
function er(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function tr(e, t) {
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
function nr(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function rr(e) {
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
function ir(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function ar({ events: e, participants: t }) {
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
					ir(e.mode),
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
						children: nr(e.displayName || "Unknown")
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
								er(e.eventType),
								" ",
								tr(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Q("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: rr(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var or = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, sr = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function cr({ label: e, children: t }) {
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
var lr = {
	field: "Field change",
	prose: "Body text"
};
function ur({ utterance: e, kind: t, status: i, confidence: o, attachState: s, targetLabel: c, targetReason: l, before: u, after: d, edits: f, rationale: p, draftError: m, author: h, category: _, path: v, locationHint: y, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: w, onRereview: T, onAccept: D, onReject: O, onRedraft: k, onReattach: ee, onConfirmAttachment: A, className: te, "data-testid": j = "proposal-card" }) {
	let [M, N] = X(!1), [P, F] = X(null), [ne, I] = X(!1), [L, R] = X(""), z = i === "applied", B = i === "rejected", V = z || B;
	async function re() {
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
	let H = t === "prose" ? f ?? [] : [{
		before: u ?? "",
		after: d ?? ""
	}];
	return /* @__PURE__ */ $("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": o,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", z ? "border-success-border" : "border-border", B && "opacity-60", te),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Q("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: _ ?? lr[t]
					}),
					h && /* @__PURE__ */ $("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ Q(b, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ Q("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ Q("span", { className: "flex-1" }),
					/* @__PURE__ */ Q(a, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Q(a, {
						tone: sr[o],
						size: "sm",
						children: or[o]
					}),
					s === "healed" && /* @__PURE__ */ Q(a, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					s === "author_only" && /* @__PURE__ */ Q(a, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					z && /* @__PURE__ */ Q(a, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					B && /* @__PURE__ */ Q(a, {
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
			/* @__PURE__ */ Q(ze, {
				path: v ?? (c ? [c] : []),
				...y ? { hint: y } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ $("div", {
				className: "flex flex-col gap-1",
				children: [l && /* @__PURE__ */ Q(cr, {
					label: "Why",
					children: l
				}), p && /* @__PURE__ */ Q(cr, {
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
			i !== "drafting" && !m && H.length > 0 && /* @__PURE__ */ Q(E, {
				pairs: H,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Q(Be, {
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
						onClick: re,
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
					k && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					T && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: T,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					ee && /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: ee,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && s === "author_only" && /* @__PURE__ */ Q(r, {
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
					/* @__PURE__ */ Q(g, {
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
								O(L), I(!1);
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
function dr({ itemId: e, utterance: t, unplaced: o = !1, targetLabel: s, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...f ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = p.filter((e) => !b.has(e.id));
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
					children: [/* @__PURE__ */ Q(a, {
						tone: o ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: o ? "Unplaced" : s ?? "Placed"
					}), l && /* @__PURE__ */ Q(a, {
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
				c && /* @__PURE__ */ Q("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ Q("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ $("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				o && y.length > 0 && /* @__PURE__ */ $("div", {
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
				o && x.length > 0 && /* @__PURE__ */ $("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Q("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ Q(O, {
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
var fr = "[data-comment-id]", pr = 240;
function mr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function hr(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function gr({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: o, onOpenThread: s, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [d, f] = X(null), p = Y(null), m = Y(null), h = Y(null);
	h.current = d;
	let g = J(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = Y(g);
	_.current = g;
	let v = K(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), y = K(() => {
		v(), f(null);
	}, [v]), x = K((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${mr(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [v, t]);
	On(l, () => ({
		openComment: (e, t) => x(e, t, "click"),
		close: y
	}), [x, y]);
	let S = Y(null), C = d?.id ?? null;
	q(() => {
		S.current !== C && (S.current = C, o?.(C));
	}, [C, o]), q(() => v, [v]), q(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(fr) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (t && n) {
				if (h.current?.id === n) {
					y();
					return;
				}
				x(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			t && a && (v(), h.current?.id !== a && (m.current = setTimeout(() => x(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (v(), m.current = setTimeout(() => {
				h.current?.via === "hover" && y();
			}, pr));
		};
		return e.addEventListener("click", a), e.addEventListener("mouseover", o), e.addEventListener("mouseout", s), () => {
			e.removeEventListener("click", a), e.removeEventListener("mouseover", o), e.removeEventListener("mouseout", s);
		};
	}, [
		t,
		i,
		n,
		x,
		y,
		v
	]);
	let w = C ? g.get(C) ?? null : null, E = (e) => () => {
		w && (e?.(w.id), y());
	};
	return /* @__PURE__ */ Q(T, {
		trigger: p,
		open: !!w,
		onClose: y,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": w ? `Comment by ${w.author}` : void 0,
		"data-testid": u,
		children: w && /* @__PURE__ */ $("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": w.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), m.current = setTimeout(() => {
					h.current?.via === "hover" && y();
				}, pr);
			},
			children: [
				/* @__PURE__ */ $("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Q(b, {
							name: w.author,
							size: 20,
							color: w.color
						}),
						/* @__PURE__ */ Q("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: w.author
						}),
						w.timestamp && /* @__PURE__ */ Q("span", {
							className: "text-[11px] text-text-tertiary",
							children: Ct(w.timestamp)
						}),
						w.resolved && /* @__PURE__ */ Q(a, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				w.quote && /* @__PURE__ */ Q("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: w.quote
				}),
				/* @__PURE__ */ Q("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: w.text
				}),
				/* @__PURE__ */ $("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ Q("span", {
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: hr(w.replyCount ?? 0)
					}), /* @__PURE__ */ $("span", {
						className: "flex gap-1.5",
						children: [s && /* @__PURE__ */ Q(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(s),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !w.resolved && /* @__PURE__ */ Q(r, {
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
function _r() {
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
function vr({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: a = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, compact: l = !1, onDragOver: u, onDragLeave: d, onDrop: f, className: p, children: m, "data-testid": h = "video-dock-slot" }) {
	let [g, _] = X(!1), v = K((e) => {
		e.preventDefault(), t && _(!0), u?.(e);
	}, [t, u]), y = K((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (_(!1), d?.(e));
	}, [d]), b = K((e) => {
		e.preventDefault(), _(!1), t && f?.(e);
	}, [t, f]);
	return !e && !t ? null : /* @__PURE__ */ Q("div", {
		"data-testid": h,
		"data-docked": String(e),
		"data-compact": l ? "true" : void 0,
		"data-drag-over": String(g),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: v,
		onDragLeave: y,
		onDrop: b,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", g ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", p),
		children: e ? /* @__PURE__ */ $("div", {
			"data-testid": `${h}-content`,
			className: "relative w-full",
			children: [m, c && /* @__PURE__ */ Q("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ Q(o, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${h}-undock`,
					icon: /* @__PURE__ */ Q(_r, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ $("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${h}-dropzone`,
			className: n(l ? "flex h-10 w-full flex-row items-center justify-center gap-2" : "flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", g ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ Q("span", {
				className: "truncate text-xs text-text-tertiary",
				children: a
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function yr({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
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
var br = "doc-editor:canvas:gutter-visible";
function xr(e = br, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function Sr({ storageKey: e = br, defaultVisible: t = !1 } = {}) {
	let [n, r] = X(() => xr(e, t)), i = K((t) => {
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
var Cr = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], wr = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function Tr({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, m] = X(""), g = () => {
		let e = p.trim();
		e && l && (l(e), m(""));
	};
	return /* @__PURE__ */ Q(h, {
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
						value: p,
						onChange: (e) => m(e.target.value),
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
						disabled: !p.trim(),
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
							/* @__PURE__ */ Q(b, {
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
								children: Cr.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Q("option", {
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
						children: Object.keys(wr).map((e) => /* @__PURE__ */ Q("option", {
							value: e,
							children: wr[e](o)
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
var Er = [
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
function Dr({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = Er.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = Er.find((t) => t.value === e);
	return /* @__PURE__ */ $("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Q(x, {
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
var Or = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, kr = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, Ar = 6, jr = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function Mr(e) {
	let t = jr.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function Nr(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Pr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, Ar), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ $("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Q(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > Ar && /* @__PURE__ */ $("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - Ar,
				" more"
			]
		})]
	});
}
function Fr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = Mr(t.trim() === "" ? "Unknown author" : t.trim()), v = c && c.length > 0 ? c : s ? [s] : [], y = l && l.length > 0 ? l : o ? [o] : [], x = v.length > 0 || y.length > 0;
	return /* @__PURE__ */ $("div", {
		"data-testid": h,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ $("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ Q(b, {
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
						children: Nr(i)
					}),
					/* @__PURE__ */ Q("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", kr[e]),
						"data-testid": `${h}-kind`,
						children: Or[e]
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
				children: [y.length > 0 && /* @__PURE__ */ Q(Pr, {
					lines: y,
					tone: "delete",
					testId: `${h}-deleted`
				}), v.length > 0 && /* @__PURE__ */ Q(Pr, {
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
function Ir({ count: e, children: t, onAcceptAll: o, onRejectAll: s, error: c = null, headerExtra: l, emptyTitle: u = "No suggestions", emptyBody: d = "Proposed changes to this document show up here for review.", title: f = "Suggestions", variant: p = "card", className: h, "data-testid": g = "suggestion-review-list" }) {
	let v = e > 0 && (o || s), y = v || l ? /* @__PURE__ */ $("span", {
		className: "flex items-center gap-1.5",
		children: [
			l,
			v && s && /* @__PURE__ */ Q(r, {
				variant: "ghost",
				size: "sm",
				onClick: s,
				"data-testid": `${g}-reject-all`,
				children: "Reject all"
			}),
			v && o && /* @__PURE__ */ Q(r, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				"data-testid": `${g}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, b = /* @__PURE__ */ $(Z, { children: [c && /* @__PURE__ */ Q("div", {
		className: n("pt-2", p === "card" && "px-3"),
		children: /* @__PURE__ */ Q(m, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${g}-error`,
			children: c
		})
	}), e === 0 ? /* @__PURE__ */ Q(_, {
		size: "sm",
		title: u,
		body: d,
		testId: `${g}-empty`
	}) : /* @__PURE__ */ Q("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${g}-list`,
		children: t
	})] });
	return p === "pane" ? /* @__PURE__ */ $("div", {
		className: n("flex min-h-0 flex-1 flex-col", h),
		"data-testid": g,
		"data-variant": "pane",
		children: [/* @__PURE__ */ $("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Q("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${g}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), y]
		}), /* @__PURE__ */ Q("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: b
		})]
	}) : /* @__PURE__ */ $(i, {
		padding: "none",
		className: n("overflow-hidden", h),
		"data-testid": g,
		children: [/* @__PURE__ */ Q(C, {
			title: f,
			meta: /* @__PURE__ */ Q(a, {
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
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Lr({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, o] = X(""), [s, c] = X(!1), [l, f] = X(null), p = Y(!1);
	async function m(e) {
		if (!p.current) {
			p.current = !0, c(!0), f(null);
			try {
				await e(), o("");
			} catch (e) {
				f(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				p.current = !1, c(!1);
			}
		}
	}
	let h = e.reviewerName || e.reviewerId, g = e.state.replace(/_/g, " "), _ = g.charAt(0).toUpperCase() + g.slice(1);
	return /* @__PURE__ */ Q(ue, {
		"aria-label": `Review by ${h}`,
		"aria-busy": s,
		children: /* @__PURE__ */ $(u, {
			gap: "sm",
			children: [
				/* @__PURE__ */ $(d, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Q("strong", { children: h }),
						/* @__PURE__ */ Q(a, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: _
						}),
						e.required && /* @__PURE__ */ Q(a, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Q(D, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Q("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Q("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				l && /* @__PURE__ */ Q(S, {
					tone: "error",
					children: l
				}),
				t && e.state === "pending" && /* @__PURE__ */ $(Z, { children: [/* @__PURE__ */ Q(y, {
					value: i,
					onChange: (e) => o(e.target.value),
					rows: 2,
					disabled: s,
					"aria-label": `Review comment for ${h}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ $(d, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "secondary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "primary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Q(r, {
					size: "sm",
					variant: "ghost",
					disabled: s,
					onClick: () => void m(() => n(e.requestKey)),
					children: "Withdraw review"
				})
			]
		})
	});
}
function Rr({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: s, onDecide: c, onWithdraw: l }) {
	let [f, p] = X(""), [m, h] = X(""), [g, _] = X(!0), [v, b] = X(!1), [x, C] = X(null), w = Y(!1);
	async function T() {
		if (s && t.some((e) => e.id === f) && !w.current) {
			w.current = !0, b(!0), C(null);
			try {
				await s({
					reviewerId: f,
					note: m.trim(),
					required: g
				}), h(""), p("");
			} catch (e) {
				C(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				w.current = !1, b(!1);
			}
		}
	}
	return /* @__PURE__ */ $(u, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Q(S, {
				tone: "error",
				children: a
			}),
			s && /* @__PURE__ */ $(u, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Q(O, {
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
					/* @__PURE__ */ Q(y, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: v,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ $(d, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Q(k, {
							checked: g,
							onChange: _,
							disabled: v
						}), "Required review"]
					}),
					x && /* @__PURE__ */ Q(S, {
						tone: "error",
						children: x
					}),
					/* @__PURE__ */ Q(r, {
						size: "sm",
						disabled: v || i || !t.some((e) => e.id === f),
						onClick: () => void T(),
						children: v ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Q(B, {
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
				children: e.map((e) => /* @__PURE__ */ Q(Lr, {
					request: e,
					onDecide: e.reviewerId === n ? c : void 0,
					onWithdraw: l
				}, e.requestKey))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/EditorShell.tsx
var zr = [
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
function Br({ filled: e }) {
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
function Vr({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: s, starred: c = !1, onStarredChange: u, statusPill: d, path: m, crumbsTrailing: h, subtitle: g, metaBar: _, participants: y, onParticipantClick: b, onFollowParticipant: x, followingParticipantId: S, meta: C, saveState: T, headActions: E, tabs: D, activeTab: O, onTabChange: k, toolbar: A, children: te, footer: j, proposal: M, surface: N = "workspace", explorer: P, workbench: F, label: ne = "Editor", variant: I = "document", itemType: L, itemKey: R, titleSize: z = "md", titleOverflow: B = "truncate", tabsTrailing: V, className: re, "data-testid": H = "editor-shell" }) {
	let U = I === "work-item", ie = U && (L || R) ? /* @__PURE__ */ $(Z, { children: [L && /* @__PURE__ */ Q(a, {
		size: "sm",
		tone: "info",
		"data-testid": `${H}-item-type`,
		children: L
	}), R && /* @__PURE__ */ Q("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${H}-item-key`,
		children: R
	})] }) : null, W = ie || h != null ? /* @__PURE__ */ $(Z, { children: [ie, h] }) : null, ae = U && (e && e.length > 0 || W != null), oe = z === "lg" ? "text-[26px] font-semibold leading-8" : U ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", se = `${H}-${Dn().replace(/:/g, "")}`, G = !!D && D.length > 0, ce = G ? D.some((e) => e.id === O) ? O : D[0].id : void 0, le = y && y.length > 0 || C != null || !!T, ue = (e) => /* @__PURE__ */ Q(v, {
		items: D.map((e) => ({
			id: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {},
			...e.count ? { badge: U ? /* @__PURE__ */ Q("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}) : /* @__PURE__ */ Q(p, {
				variant: "count",
				value: e.count,
				color: "muted",
				"aria-label": `${e.count} in ${e.label}`
			}) } : {},
			testId: `${H}-tab-${e.id}`
		})),
		value: ce,
		onValueChange: (e) => k?.(e),
		variant: "underline",
		...U ? { badgeStyle: "plain" } : {},
		size: "md",
		itemClassName: "px-3.5 pb-1.5 pt-1 leading-5",
		"aria-label": `${t} sections`,
		idPrefix: se,
		className: e
	}), de = /* @__PURE__ */ $("section", {
		"aria-label": ne,
		"data-testid": H,
		"data-surface": N,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ $("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-variant": I,
				"data-testid": `${H}-header`,
				children: [
					ae && /* @__PURE__ */ $("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${H}-crumbs-row`,
						children: [
							/* @__PURE__ */ Q(l, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ Q(f, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								size: "sm",
								className: "min-w-0",
								"data-testid": `${H}-crumbs`
							}),
							e && e.length > 0 && W != null && /* @__PURE__ */ Q("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							W != null && /* @__PURE__ */ Q("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${H}-crumbs-trailing`,
								children: W
							}),
							/* @__PURE__ */ Q("span", { className: "flex-1" }),
							E && /* @__PURE__ */ Q("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${H}-actions`,
								children: E
							})
						]
					}),
					!U && e && e.length > 0 && !h && /* @__PURE__ */ Q(f, {
						items: e,
						maxItems: 4,
						size: "sm",
						className: "[@media(max-height:640px)]:hidden",
						"data-testid": `${H}-crumbs`
					}),
					!U && h && /* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${H}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ Q(f, {
							items: e,
							maxItems: 4,
							size: "sm",
							className: "min-w-0",
							"data-testid": `${H}-crumbs`
						}), /* @__PURE__ */ Q("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${H}-crumbs-trailing`,
							children: h
						})]
					}),
					/* @__PURE__ */ $("div", {
						className: "flex min-w-0 items-center gap-2",
						children: [
							s && !U && /* @__PURE__ */ Q(ee, {
								kind: s,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${H}-kind`
							}),
							/* @__PURE__ */ $("div", {
								className: "flex min-w-0 flex-1 flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ $("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ $("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${H}-title-group`,
												children: [r ? /* @__PURE__ */ Q(Oe, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", oe, U && "relative -left-[5px]"),
													"data-testid": `${H}-title`
												}) : /* @__PURE__ */ Q("h1", {
													className: n("m-0 min-w-0 max-w-full flex-initial text-text-primary", oe, B === "wrap" ? "whitespace-normal break-words" : "truncate"),
													"data-testid": `${H}-title`,
													children: t
												}), u && /* @__PURE__ */ Q(o, {
													size: "sm",
													"aria-label": c ? "Remove star" : "Star this file",
													"aria-pressed": c,
													title: c ? "Starred" : "Star",
													onClick: () => u(!c),
													className: c ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${H}-star`,
													children: /* @__PURE__ */ Q(Br, { filled: c })
												})]
											}),
											d,
											m && m.length > 0 && /* @__PURE__ */ Q("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${H}-path`,
												children: /* @__PURE__ */ Q(f, {
													items: m,
													maxItems: 4,
													lastIsCurrent: !1,
													size: "sm",
													className: "min-w-0",
													"data-testid": `${H}-path-crumbs`
												})
											})
										]
									}),
									g != null && /* @__PURE__ */ Q("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${H}-subtitle`,
										children: g
									}),
									le && /* @__PURE__ */ $("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${H}-byline`,
										children: [
											y && y.length > 0 && /* @__PURE__ */ Q(w, {
												users: y,
												size: 22,
												maxVisible: 4,
												...b ? { onUserClick: b } : {},
												...x ? {
													onFollowUser: x,
													followingUserId: S ?? null
												} : {}
											}),
											C != null && /* @__PURE__ */ Q("span", {
												className: "min-w-0 truncate",
												children: C
											}),
											/* @__PURE__ */ Q(mt, {
												state: T,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							E && !ae && /* @__PURE__ */ Q("div", {
								className: "flex shrink-0 items-center gap-3",
								"data-testid": `${H}-actions`,
								children: E
							})
						]
					}),
					_ != null && /* @__PURE__ */ Q("div", {
						className: n("flex min-w-0 items-center", U ? z === "lg" ? "pb-2 pt-1" : "pb-2 pt-3" : "py-2"),
						"data-testid": `${H}-meta-bar`,
						children: _
					}),
					V == null ? G ? ue("-mb-px -ml-3 mt-1 border-b-0") : /* @__PURE__ */ Q("span", {
						className: "h-2",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ $("div", {
						className: "-mb-px mt-1 flex min-w-0 items-end gap-3",
						"data-testid": `${H}-tabs-row`,
						children: [G ? ue("-ml-3 min-w-0 flex-1 border-b-0") : /* @__PURE__ */ Q("span", {
							className: "flex-1",
							"aria-hidden": "true"
						}), /* @__PURE__ */ Q("div", {
							className: "flex shrink-0 items-center gap-2 pb-1.5",
							"data-testid": `${H}-tabs-trailing`,
							children: V
						})]
					})
				]
			}),
			A && /* @__PURE__ */ Q("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${H}-toolbar`,
				children: A
			}),
			/* @__PURE__ */ $("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", N === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${H}-surface`,
				children: [
					/* @__PURE__ */ Q("div", {
						...G ? {
							role: "tabpanel",
							id: `${se}-panel-${ce}`,
							"aria-labelledby": `${se}-tab-${ce}`
						} : {},
						className: "min-h-0 flex-1 overflow-auto",
						"data-testid": `${H}-scroller`,
						children: te
					}),
					M != null && /* @__PURE__ */ Q("div", {
						className: "relative z-20 max-h-[40%] min-h-0 shrink-0 overflow-auto px-[var(--dock-inset,1rem)] pb-1 pt-2",
						"data-testid": `${H}-proposal`,
						children: M
					}),
					j != null && /* @__PURE__ */ Q("div", {
						className: "relative z-20 flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
						"data-testid": `${H}-dock`,
						children: /* @__PURE__ */ Q(at.Provider, {
							value: "pinned",
							children: j
						})
					})
				]
			})
		]
	});
	return !P && !F ? /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col", re),
		children: de
	}) : /* @__PURE__ */ $("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", re),
		"data-testid": `${H}-frame`,
		children: [P && /* @__PURE__ */ Q("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${H}-explorer`,
			children: P
		}), /* @__PURE__ */ $("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [de, F && /* @__PURE__ */ Q("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${H}-workbench`,
				children: F
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/DictationButton.tsx
var Hr = 250;
function Ur(e, t, n) {
	return n || (e === "unsupported" ? "Dictation needs a microphone and a secure page" : t ? "Listening — release to insert" : e === "transcribing" ? "Transcribing…" : e === "starting" ? "Starting the microphone…" : "Hold to dictate");
}
function Wr({ state: e, micActive: t, unavailableReason: r, onStart: i, onStop: a, className: o, "data-testid": s = "dictation-button" }) {
	let c = Y(null), l = Ur(e, t, r), u = e === "transcribing" || e === "starting", d = () => {
		if (t) {
			a(), c.current = null;
			return;
		}
		c.current = Date.now(), i();
	}, f = () => {
		let e = c.current;
		e !== null && (c.current = null, !(Date.now() - e < 250) && a());
	};
	return /* @__PURE__ */ Q("button", {
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
		children: /* @__PURE__ */ Q(Re, {
			size: 15,
			"aria-hidden": "true"
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentReplyComposer.tsx
var Gr = {
	resolve: "/resolve",
	agent: "/agent",
	assign: "/assign"
};
function Kr(e) {
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
			let t = e.command?.trigger === Gr.assign ? e.command.argument : void 0, n = (t?.label ?? r).replace(/^@/, "").trim();
			return {
				kind: "assign",
				userId: t?.id ?? null,
				name: n
			};
		}
	}
}
var qr = En(function({ mentionUsers: e, onReply: t, onResolve: r, onAskAgent: i, onAssign: a, onCancel: o, dictation: s, placeholder: c = "Reply or type /", variant: l = "card", submitLabel: u = "Reply", className: d, "data-testid": f = "comment-reply-composer" }, p) {
	let m = Y(null);
	On(p, () => ({
		focus: () => m.current?.focus(),
		insertText: (e) => {
			let t = m.current;
			if (!t) return;
			let n = t.editor?.getText() ?? "";
			t.insertText(n && !/\s$/.test(n) ? ` ${e}` : e);
		}
	}), []);
	let h = J(() => e.filter((e) => e.type === "user"), [e]), g = K((t) => {
		let n = t.trim().toLowerCase();
		return e.filter((e) => !n || e.displayName.toLowerCase().includes(n)).slice(0, 8).map((e) => ({
			id: e.userId,
			label: e.displayName,
			color: e.color,
			...e.type === "group" ? { hint: `${e.memberCount ?? 0} people` } : {}
		}));
	}, [e]), _ = J(() => {
		let e = [];
		return r && e.push({
			trigger: Gr.resolve,
			label: "Resolve thread"
		}), i && e.push({
			trigger: Gr.agent,
			label: "Ask the agent"
		}), a && e.push({
			trigger: Gr.assign,
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
	]), v = K(async (e) => {
		let n = Kr(e);
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
	return /* @__PURE__ */ Q("div", {
		className: n("flex flex-col gap-1", d),
		"data-testid": f,
		onKeyDown: (e) => {
			e.key === "Escape" && o && (e.stopPropagation(), o());
		},
		children: /* @__PURE__ */ Q(Tn, {
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
			...s ? { submitLead: /* @__PURE__ */ Q(Wr, {
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
function Jr({ author: e, quote: t, variant: r = "agent", resolveOnApply: i = !1, onResolveOnApplyChange: a, onDismiss: o, className: l, "data-testid": u = "comment-handoff-bar" }) {
	let d = r === "reply", f = d ? "Stop replying" : "Stop answering this comment";
	return /* @__PURE__ */ $("div", {
		role: "status",
		"data-testid": u,
		"data-variant": r,
		className: n("flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm", l),
		children: [
			d ? /* @__PURE__ */ Q(c, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-primary"
			}) : /* @__PURE__ */ Q(s, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-info-fg"
			}),
			/* @__PURE__ */ $("span", {
				className: "min-w-0 flex-1 truncate",
				children: [
					d ? "Replying to " : "Answering ",
					/* @__PURE__ */ Q("span", {
						className: "font-semibold text-text-primary",
						children: e
					}),
					d ? null : "’s comment",
					t ? /* @__PURE__ */ $("span", {
						className: "text-text-tertiary",
						children: [
							" on “",
							t,
							"”"
						]
					}) : null
				]
			}),
			d ? /* @__PURE__ */ Q("span", {
				className: "hidden shrink-0 text-text-tertiary sm:inline",
				children: "Esc to go back"
			}) : /* @__PURE__ */ $("label", {
				className: "inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary",
				children: [/* @__PURE__ */ Q(k, {
					checked: i,
					onChange: (e) => a?.(e),
					"data-testid": `${u}-resolve`
				}), "Resolve when applied"]
			}),
			/* @__PURE__ */ Q("button", {
				type: "button",
				onClick: o,
				"aria-label": f,
				title: f,
				"data-testid": `${u}-dismiss`,
				className: "grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
				children: /* @__PURE__ */ Q("span", {
					"aria-hidden": "true",
					children: "×"
				})
			})
		]
	});
}
//#endregion
export { $n as AckMode, zt as ActionItemsCard, ar as ActivityFeed, wt as AttachmentsPanel, rn as AuthenticatedDocumentImageView, Ye as BULLET_STYLES, Tt as CANVAS_BODY_KEY, Dt as CANVAS_SCHEMA_VERSION, br as COMMENT_MARGIN_STORAGE_KEY, Gr as COMMENT_REPLY_COMMANDS, on as CanvasDocumentView, qe as CanvasLineSpacing, Qe as CanvasListStyle, Zn as ChunkViewer, Ot as CommentContextHeader, gr as CommentGhostPopover, Jr as CommentHandoffBar, qr as CommentReplyComposer, Jt as CommentThreadNode, at as ComposerDockPlacementContext, ye as DECK_THEMES, zr as DEFAULT_EDITOR_SHELL_TABS, Hr as DICTATION_HOLD_MS, rt as DOCK_HEIGHT_VAR, it as DOCK_INSET_VAR, xt as DOCUMENT_MODE_LABELS, pn as DOCUMENT_TOOLBAR_BREAKPOINTS, Wr as DictationButton, Gt as DiffViewer, Kt as DocumentEditorPage, fn as DocumentFindBar, cn as DocumentGutter, ot as DocumentHeader, hn as DocumentImageProvider, Lt as DocumentLifecyclePill, Ln as DocumentListPage, dt as DocumentModePill, $t as DocumentOutline, yt as DocumentOwnership, Rr as DocumentReviewPanel, Sn as DocumentRuler, mt as DocumentSaveStatus, Tr as DocumentShareDialog, an as DocumentStatusBar, un as DocumentToolbar, Vr as EditorShell, Ge as EditorToolbar, Nt as ExecutiveSummaryCard, De as Filmstrip, we as FilmstripThumb, nt as FloatingComposerDock, yr as FloatingDockBar, Rt as FollowModeBar, Ht as HeaderBanner, qt as KeyDecisionsCard, tt as LINE_SPACINGS, Ue as LINE_SPACING_LABELS, Ke as LIST_STYLE_LABELS, yn as MAX_ATTACHMENT_BYTES, ve as MAX_BULLETS_PER_SLIDE, fe as MAX_BULLET_CHARS, Ne as MAX_CHART_LABELS, Ie as MAX_CHART_SERIES, me as MAX_EYEBROW_CHARS, mn as MAX_IMAGE_BYTES, Fe as MAX_NOTES_CHARS, oe as MAX_QUOTE_CHARS, P as MAX_SLIDES, Pe as MAX_SOURCES_PER_SLIDE, se as MAX_SUBTITLE_CHARS, ne as MAX_TITLE_CHARS, Ve as MULTILEVEL_STYLES, Yt as MentionDropdown, kt as MyMentionsPanel, Xe as NUMBER_STYLES, de as NewDocumentModal, L as OLDER_REVISIONS_VALUE, tn as PX_PER_INCH, _t as ParticipantAvatars, be as PresentationEditor, le as PresentationView, ur as ProposalCard, je as ProposedEditStrip, jt as ReaderMode, Zt as ResolvedBanner, Ft as ReviewMode, Gn as ReviewProgress, Yn as ReviewableItem, Cr as SHARE_ROLES, Ee as SLIDES_TOOLBAR_BREAKPOINTS, F as SLIDE_ID_PATTERN, Ae as SLIDE_INSERTS, ie as SLIDE_LAYOUTS, Se as SLIDE_LAYOUT_LABELS, Er as SUGGESTION_AUTHORING_MODES, lt as SectionBlock, Pt as SectionComments, ut as SectionList, Mt as SectionSummariesCard, ge as SlideForm, ce as SlideList, R as SlideRow, _e as SlideSources, Me as SlideStage, he as SlidesToolbar, pe as SpeakerNotes, Hn as StandaloneTiptap, Fr as SuggestionCard, Dr as SuggestionModeControl, Ir as SuggestionReviewList, Wt as TableOfContents, te as TaskItemRow, j as TaskList, et as TiptapEditor, Vt as VersionHistoryPanel, bt as VideoCallPanel, vr as VideoDockSlot, It as VideoHistoryPanel, dr as WorkItemRow, vt as WorkspaceDocumentHeaderNotices, Cn as ZOOM_FIT, en as ZOOM_STEPS, _n as acceptsDocumentImage, M as addSlide, xe as canSaveDeck, ft as canvasBody, Et as canvasFragmentToMarkdown, Rn as clientIdForUser, Kr as commentReplyIntent, At as countAllComments, vn as createAuthenticatedDocumentImage, Ur as dictationButtonLabel, ln as documentToolbarSize, H as duplicateSlide, St as findDocumentTarget, bn as findMatches, Bt as generateSummaryBullets, Xt as getInitials, gt as isCanvasDocument, We as isLineSpacing, Ze as lineSpacingAttributes, $e as listTypeFor, U as makeSlide, W as moveSlide, sn as nextMatchIndex, I as nextRevisionLabel, z as nextSlideId, Je as parseLineSpacing, He as parseListStyle, Te as proposedEditPlacement, ke as proposedEditPreview, xr as readCommentMarginPreference, xn as readOutline, Ut as readSchemaVersion, Ct as relativeTime, re as removeSlide, ae as replaceSlide, hr as replyLabel, ct as resolverLabel, V as revisionPickerOptions, Qt as scrollToDocumentTarget, Ce as slidesToolbarSize, gn as stackOffsets, G as svgDataUri, Le as uncitedSlideIds, Sr as useCommentMarginPreference, pt as useDocumentActions, dn as useDocumentImageUpload, wn as useDocumentOutline, nn as useDocumentToolbarSize, zn as useFollowCursor, ht as useIsCanvasDocument, st as useSidebarPanels, N as withLayoutDefaults };
