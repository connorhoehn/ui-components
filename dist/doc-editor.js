import { n as e, t } from "./useWebSocket-Cmv4zMFO.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { n as r } from "./Button-C2OEUpX-.js";
import { t as i } from "./Card-CbTNNNkk.js";
import { t as a } from "./Chip-0zFpfJ52.js";
import { t as o } from "./IconButton-VqtspsS5.js";
import { ct as s, m as c, mt as l } from "./Icons-B_xESAH3.js";
import { i as u } from "./MediaIcons-_ai5Til2.js";
import { n as d, t as f } from "./Stack-DNMA-_4L.js";
import { t as p } from "./Breadcrumbs-XyCrvmIp.js";
import { t as m } from "./Badge-POenI45X.js";
import { t as h } from "./Banner-8ngXUtJu.js";
import { t as g } from "./Modal-CjgKqXl7.js";
import { t as _ } from "./Input-CpLq80dw.js";
import { t as v } from "./EmptyState-DnbFBYDA.js";
import { n as y } from "./Tabs-BArH-7z_.js";
import { t as b } from "./Textarea-Drx4YDDG.js";
import { t as x } from "./Avatar-CmYYkk9C.js";
import { t as S } from "./SegmentedControl-Blx221jS.js";
import { t as C } from "./InlineAlert-CBtteaVZ.js";
import { t as w } from "./CardHeader-C50GEAmo.js";
import { t as T } from "./PresenceAvatars-DAgxQ3PF.js";
import { n as E } from "./DropdownMenu-BS-H0H0p.js";
import { t as D } from "./ChangeDiff-BHerlwTS.js";
import { t as ee } from "./MetaLine-BtHTTScI.js";
import { t as O } from "./Select-C6OGjVyH.js";
import { t as k } from "./Checkbox-C70AGFS5.js";
import { n as te } from "./FileKindMark-DhjYpKjg.js";
import { t as ne } from "./activationKey-CjbL3LUv.js";
import { A, k as j } from "./renderers-DS5eZtXk.js";
import { A as M, B as N, C as P, D as re, E as F, F as I, G as L, H as R, I as z, J as B, K as ie, L as V, M as H, N as ae, O as U, P as oe, R as se, S as ce, T as W, U as le, V as ue, W as de, Y as fe, Z as pe, _ as me, a as he, b as ge, c as _e, d as ve, f as ye, g as be, h as xe, i as Se, j as Ce, k as we, l as Te, m as Ee, n as De, o as Oe, p as ke, q as Ae, r as je, s as Me, t as Ne, u as Pe, v as Fe, w as Ie, x as Le, y as Re, z as ze } from "./ProposedEditStrip-AevYnd07.js";
import { o as Be, t as Ve } from "./VerdictChip-B8JaUpcJ.js";
import { a as He, c as Ue, d as We, f as Ge, h as Ke, i as qe, l as Je, m as Ye, n as Xe, o as Ze, p as Qe, r as $e, s as et, t as tt, u as nt } from "./TiptapEditor-BjjwDyPa.js";
import { i as rt, n as it, r as at, t as ot } from "./FloatingComposerDock-ZezHreIm.js";
import { A as st, B as ct, C as lt, D as ut, E as dt, F as ft, G as pt, H as mt, I as ht, J as gt, K as _t, L as vt, M as yt, N as bt, O as xt, P as St, R as Ct, S as wt, T as Tt, U as Et, V as Dt, W as Ot, _ as kt, a as At, b as jt, c as Mt, d as Nt, f as Pt, g as Ft, h as It, i as Lt, j as Rt, k as zt, l as Bt, m as Vt, o as Ht, p as Ut, q as Wt, r as Gt, s as Kt, t as qt, u as Jt, v as Yt, w as Xt, x as Zt, y as Qt, z as $t } from "./DocumentEditorPage-wtvXzfnx.js";
import { C as en, S as tn, T as nn, _ as rn, a as an, b as on, c as sn, d as cn, f as ln, g as un, h as dn, i as fn, l as pn, m as mn, n as hn, o as gn, p as _n, r as vn, s as yn, t as bn, u as xn, v as Sn, w as Cn, x as wn, y as Tn } from "./useDocumentImageUpload-DySteVsb.js";
import { r as En } from "./RichChatComposer-BT2VH5tI.js";
import { forwardRef as Dn, useCallback as G, useEffect as K, useId as On, useImperativeHandle as kn, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import * as An from "yjs";
import { relativePositionToAbsolutePosition as jn, ySyncPluginKey as Mn } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function Nn(e) {
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
var Pn = {
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
function Fn({ status: e }) {
	let t = Pn[e] ?? Pn.draft;
	return /* @__PURE__ */ Z("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var In = {
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
function Ln({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Q("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = In[e.mode ?? "editor"] ?? In.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function Rn({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
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
						onKeyDown: ne(() => r(e.id)),
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
											/* @__PURE__ */ Z(Fn, { status: e.status }),
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
										children: ["Updated ", Nn(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Z("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Z(Ln, {
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
			/* @__PURE__ */ Z(pe, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function zn(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function Bn({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = Mn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = jn(t.doc, t.type, An.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var Vn = "prosemirror";
function Hn(e) {
	return e.ydoc !== void 0;
}
function Un(e) {
	return Hn(e) ? /* @__PURE__ */ Z(Wn, { ...e }) : /* @__PURE__ */ Z(Gn, { ...e });
}
function Wn({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = Vn, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = q(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = J(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Z("div", {
		className: n(c),
		children: /* @__PURE__ */ Z(tt, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Gn({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = Vn, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
		children: /* @__PURE__ */ Z(tt, {
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
function Kn({ current: e, total: t }) {
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
var qn = {
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
}, Jn = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, Yn = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Xn({ item: e, onAck: t, onReject: r }) {
	let [i, a] = Y(!1), [o, s] = Y(""), [c, l] = Y("none"), u = J(e.status), d = qn[e.status] ?? Yn, f = Jn[e.priority] ?? "var(--color-neutral)", [p, m] = Y(!1), h = J(null);
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
var Zn = {
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
function Qn({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Zn[e.type] ?? Zn.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
				children: /* @__PURE__ */ Z(tt, {
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
			e.items.length > 0 && /* @__PURE__ */ Q("div", { children: [e.items.map((e) => /* @__PURE__ */ Z(Xn, {
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
			c && /* @__PURE__ */ Z(Ft, {
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
var $n = 4;
function er({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = Y(0), _ = Math.max(1, Math.ceil(e.length / $n)), v = h * $n, y = e.slice(v, v + $n);
	if (K(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / $n)), s?.());
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
		/* @__PURE__ */ Z(Kn, {
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
				}), /* @__PURE__ */ Z(Qn, {
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
function tr(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function nr(e, t) {
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
function rr(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function ir(e) {
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
function ar(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function or({ events: e, participants: t }) {
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
					ar(e.mode),
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
						children: rr(e.displayName || "Unknown")
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
								tr(e.eventType),
								" ",
								nr(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Z("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: ir(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/useDeckPresence.ts
var sr = {
	viewers: [],
	participants: [],
	slideViewers: {},
	editingElsewhere: !1
}, cr = (e) => `doc:${e}`, lr = "var(--color-primary)", ur = /* @__PURE__ */ new Set([
	"editor",
	"reviewer",
	"reader"
]);
function dr(e, t) {
	let n = e.find((e) => e.clientId === t)?.metadata?.userId;
	return typeof n == "string" && n ? n : null;
}
function fr(e, t, n, r = () => void 0) {
	let i = dr(e, n), a = /* @__PURE__ */ new Map();
	for (let o of e) {
		if (o.clientId === n || o.status === "offline") continue;
		let e = o.metadata ?? {}, s = typeof e.userId == "string" && e.userId ? e.userId : null;
		if (s && s === i) continue;
		let c = s ?? o.clientId, l = e.deckSlide, u = l && l.documentId === t && typeof l.slideId == "string" ? l.slideId : void 0, d = u ? r(u) : void 0, f = e.deckEditing?.documentId === t, p = {
			id: c,
			clientId: o.clientId,
			name: typeof e.displayName == "string" && e.displayName ? e.displayName : "Someone",
			...typeof e.avatarUrl == "string" && e.avatarUrl ? { avatarUrl: e.avatarUrl } : {},
			...o.status === "away" ? { idle: !0 } : {},
			detail: f ? "editing this deck" : u ? "on this deck" : "viewing this deck",
			...d ? { location: d } : {},
			...u ? { slideId: u } : {},
			...f ? { editing: !0 } : {}
		}, m = a.get(c), h = (e) => String(e.lastSeen ?? e.timestamp ?? "");
		(!m || h(o) > h(m.entry)) && a.set(c, {
			entry: o,
			viewer: p
		});
	}
	return [...a.values()].map(({ viewer: e }) => e).sort((e, t) => e.name.localeCompare(t.name));
}
function pr(e, t, n) {
	let r = dr(e, n);
	return r ? e.some((e) => e.clientId !== n && e.status !== "offline" && e.metadata?.userId === r && e.metadata?.deckEditing?.documentId === t) : !1;
}
function mr(e, t) {
	let n = t?.metadata ?? {}, r = typeof n.mode == "string" && ur.has(n.mode) ? n.mode : e.editing ? "editor" : "reader";
	return {
		clientId: e.clientId,
		userId: e.id,
		displayName: e.name,
		color: typeof n.color == "string" && n.color ? n.color : lr,
		mode: r,
		currentSectionId: e.slideId ?? null,
		...e.idle ? { idle: !0 } : {}
	};
}
function hr(e) {
	let { roster: t, ownClientId: n, updateMetadata: r, documentId: i, selectedSlideId: a, slideTitle: o, editing: s = !1 } = e;
	return K(() => {
		r({ deckSlide: a ? {
			documentId: i,
			slideId: a
		} : null });
	}, [
		i,
		a,
		r
	]), K(() => {
		r({ deckEditing: s ? { documentId: i } : null });
	}, [
		i,
		s,
		r
	]), K(() => () => r({
		deckSlide: null,
		deckEditing: null
	}), [r]), q(() => {
		let e = fr(t, i, n, o), r = {};
		for (let t of e) t.slideId && (r[t.slideId] ??= []).push(t);
		return {
			viewers: e,
			participants: e.map((e) => mr(e, t.find((t) => t.clientId === e.clientId))),
			slideViewers: r,
			editingElsewhere: pr(t, i, n)
		};
	}, [
		t,
		i,
		n,
		o
	]);
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var gr = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, _r = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function vr({ label: e, children: t }) {
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
var yr = {
	field: "Field change",
	prose: "Body text"
};
function br({ utterance: e, kind: t, status: i, confidence: o, attachState: s, targetLabel: c, targetReason: l, before: u, after: d, edits: f, rationale: p, draftError: m, author: h, category: g, path: v, locationHint: y, verdict: b, verdictStatus: S = "idle", verdictError: C, revision: w, onRereview: T, onAccept: E, onReject: ee, onRedraft: O, onReattach: k, onConfirmAttachment: te, className: ne, "data-testid": A = "proposal-card" }) {
	let [j, M] = Y(!1), [N, P] = Y(null), [re, F] = Y(!1), [I, L] = Y(""), R = i === "applied", z = i === "rejected", B = R || z;
	async function ie() {
		M(!0), P(null);
		try {
			let e = await E();
			P(e);
		} catch (e) {
			P({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			M(!1);
		}
	}
	let V = t === "prose" ? f ?? [] : [{
		before: u ?? "",
		after: d ?? ""
	}];
	return /* @__PURE__ */ Q("div", {
		"data-testid": A,
		"data-status": i,
		"data-confidence": o,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", R ? "border-success-border" : "border-border", z && "opacity-60", ne),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${A}-category`,
						children: g ?? yr[t]
					}),
					h && /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${A}-requester`,
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
					/* @__PURE__ */ Z(a, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${A}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Z(a, {
						tone: _r[o],
						size: "sm",
						children: gr[o]
					}),
					s === "healed" && /* @__PURE__ */ Z(a, {
						tone: "caution",
						size: "sm",
						"data-testid": `${A}-healed`,
						children: "Re-found by quote — check this"
					}),
					s === "author_only" && /* @__PURE__ */ Z(a, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					R && /* @__PURE__ */ Z(a, {
						tone: "success",
						size: "sm",
						"data-testid": `${A}-applied`,
						children: "Applied"
					}),
					z && /* @__PURE__ */ Z(a, {
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
			/* @__PURE__ */ Z(Be, {
				path: v ?? (c ? [c] : []),
				...y ? { hint: y } : {},
				"data-testid": `${A}-location`
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [l && /* @__PURE__ */ Z(vr, {
					label: "Why",
					children: l
				}), p && /* @__PURE__ */ Z(vr, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Z("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${A}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ Z("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${A}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && V.length > 0 && /* @__PURE__ */ Z(D, {
				pairs: V,
				"data-testid": `${A}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Z(Ve, {
				verdict: b,
				status: S,
				error: C,
				revision: w,
				"data-testid": `${A}-verdict`
			}),
			N && !N.ok && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${A}-apply-error`,
				children: [
					/* @__PURE__ */ Z("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Z("span", { children: N.message ?? "The document refused the change." }),
					N.stale && /* @__PURE__ */ Q("span", { children: [
						"Drafted against ",
						JSON.stringify(N.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(N.stale.actual ?? ""),
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
						disabled: j || i === "drafting" || !!m,
						onClick: ie,
						"data-testid": `${A}-accept`,
						children: j ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: j,
						onClick: () => F((e) => !e),
						"data-testid": `${A}-reject`,
						children: "Reject"
					}),
					O && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: j,
						onClick: O,
						"data-testid": `${A}-redraft`,
						children: "Re-draft"
					}),
					T && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: j,
						onClick: T,
						"data-testid": `${A}-rereview`,
						children: "Re-run review"
					}),
					k && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: j,
						onClick: k,
						"data-testid": `${A}-reattach`,
						children: "Move…"
					}),
					te && s === "author_only" && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: j,
						onClick: te,
						"data-testid": `${A}-confirm`,
						children: "Right place"
					})
				]
			}),
			re && !B && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${A}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Z(_, {
						id: `${A}-reason`,
						size: "sm",
						value: I,
						onChange: (e) => L(e.target.value),
						"data-testid": `${A}-reason`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								ee(I), F(!1);
							},
							"data-testid": `${A}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => F(!1),
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
function xr({ itemId: e, utterance: t, unplaced: o = !1, targetLabel: s, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
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
					children: [/* @__PURE__ */ Z(a, {
						tone: o ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: o ? "Unplaced" : s ?? "Placed"
					}), l && /* @__PURE__ */ Z(a, {
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
				c && /* @__PURE__ */ Z("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ Z("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				o && y.length > 0 && /* @__PURE__ */ Q("div", {
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
				o && x.length > 0 && /* @__PURE__ */ Q("label", {
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
var Sr = "[data-comment-id]", Cr = 240;
function wr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Tr(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Er({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: o, onOpenThread: s, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [d, f] = Y(null), p = J(null), m = J(null), h = J(null);
	h.current = d;
	let g = q(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = J(g);
	_.current = g;
	let v = G(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), y = G(() => {
		v(), f(null);
	}, [v]), b = G((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${wr(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [v, t]);
	kn(l, () => ({
		openComment: (e, t) => b(e, t, "click"),
		close: y
	}), [b, y]);
	let S = J(null), C = d?.id ?? null;
	K(() => {
		S.current !== C && (S.current = C, o?.(C));
	}, [C, o]), K(() => v, [v]), K(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Sr) : null, a = (e) => {
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
			!t || !a || (v(), h.current?.id !== a && (m.current = setTimeout(() => b(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (v(), m.current = setTimeout(() => {
				h.current?.via === "hover" && y();
			}, Cr));
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
	let w = C ? g.get(C) ?? null : null, T = (e) => () => {
		w && (e?.(w.id), y());
	};
	return /* @__PURE__ */ Z(E, {
		trigger: p,
		open: !!w,
		onClose: y,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": w ? `Comment by ${w.author}` : void 0,
		"data-testid": u,
		children: w && /* @__PURE__ */ Q("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": w.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), m.current = setTimeout(() => {
					h.current?.via === "hover" && y();
				}, Cr);
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
							children: wt(w.timestamp)
						}),
						w.resolved && /* @__PURE__ */ Z(a, {
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
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Tr(w.replyCount ?? 0)
					}), /* @__PURE__ */ Q("span", {
						className: "flex gap-1.5",
						children: [s && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: T(s),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !w.resolved && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: T(c),
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
function Dr() {
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
function Or({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: a = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, compact: l = !1, onDragOver: u, onDragLeave: d, onDrop: f, className: p, children: m, "data-testid": h = "video-dock-slot" }) {
	let [g, _] = Y(!1), v = G((e) => {
		e.preventDefault(), t && _(!0), u?.(e);
	}, [t, u]), y = G((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (_(!1), d?.(e));
	}, [d]), b = G((e) => {
		e.preventDefault(), _(!1), t && f?.(e);
	}, [t, f]);
	return !e && !t ? null : /* @__PURE__ */ Z("div", {
		"data-testid": h,
		"data-docked": String(e),
		"data-compact": l ? "true" : void 0,
		"data-drag-over": String(g),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: v,
		onDragLeave: y,
		onDrop: b,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", g ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", p),
		children: e ? /* @__PURE__ */ Q("div", {
			"data-testid": `${h}-content`,
			className: "relative w-full",
			children: [m, c && /* @__PURE__ */ Z("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ Z(o, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${h}-undock`,
					icon: /* @__PURE__ */ Z(Dr, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ Q("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${h}-dropzone`,
			className: n(l ? "flex h-10 w-full flex-row items-center justify-center gap-2" : "flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", g ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ Z("span", {
				className: "truncate text-xs text-text-tertiary",
				children: a
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function kr({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
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
var Ar = "doc-editor:canvas:gutter-visible";
function jr(e = Ar, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function Mr({ storageKey: e = Ar, defaultVisible: t = !1 } = {}) {
	let [n, r] = Y(() => jr(e, t)), i = G((t) => {
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
var Nr = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], Pr = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function Fr({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, m] = Y(""), h = () => {
		let e = p.trim();
		!e || !l || (l(e), m(""));
	};
	return /* @__PURE__ */ Z(g, {
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
							e.key === "Enter" && h();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						onClick: h,
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
								children: Nr.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ Z("option", {
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
						children: Object.keys(Pr).map((e) => /* @__PURE__ */ Z("option", {
							value: e,
							children: Pr[e](o)
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
var Ir = [
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
function Lr({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = Ir.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = Ir.find((t) => t.value === e);
	return /* @__PURE__ */ Q("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ Z(S, {
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
var Rr = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, zr = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, Br = 6, Vr = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function Hr(e) {
	let t = Vr.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function Ur(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Wr({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, Br), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Q("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ Z(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > Br && /* @__PURE__ */ Q("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - Br,
				" more"
			]
		})]
	});
}
function Gr({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, acceptLabel: m = "Accept", selected: h = !1, onSelectedChange: g, status: _, className: v, "data-testid": y = "suggestion-card" }) {
	let { person: b, model: S } = Hr(t.trim() === "" ? "Unknown author" : t.trim()), C = c && c.length > 0 ? c : s ? [s] : [], w = l && l.length > 0 ? l : o ? [o] : [], T = C.length > 0 || w.length > 0;
	return /* @__PURE__ */ Q("div", {
		"data-testid": y,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		"data-selected": g ? h ? "true" : "false" : void 0,
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", v),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex items-center gap-2",
				children: [
					g && /* @__PURE__ */ Z(k, {
						checked: h,
						onChange: (e) => g(e),
						"aria-label": `Select suggestion by ${t.trim() || "unknown author"}`,
						"data-testid": `${y}-select`
					}),
					/* @__PURE__ */ Z(x, {
						name: b,
						size: 20
					}),
					/* @__PURE__ */ Z("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: b,
						"data-testid": `${y}-author`,
						children: b
					}),
					i !== null && /* @__PURE__ */ Z("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: Ur(i)
					}),
					_ != null && /* @__PURE__ */ Z("span", {
						className: "ml-auto flex shrink-0 items-center",
						"data-testid": `${y}-status`,
						children: _
					}),
					/* @__PURE__ */ Z("span", {
						className: n(_ == null && "ml-auto", "shrink-0 text-[11px] font-medium", zr[e]),
						"data-testid": `${y}-kind`,
						children: Rr[e]
					})
				]
			}),
			(S || a) && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					S && /* @__PURE__ */ Q("span", {
						"data-testid": `${y}-model`,
						children: ["powered by ", S]
					}),
					S && a && /* @__PURE__ */ Z("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ Q("span", {
						"data-testid": `${y}-context`,
						children: ["in ", a]
					})
				]
			}),
			T && /* @__PURE__ */ Q("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${y}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [w.length > 0 && /* @__PURE__ */ Z(Wr, {
					lines: w,
					tone: "delete",
					testId: `${y}-deleted`
				}), C.length > 0 && /* @__PURE__ */ Z(Wr, {
					lines: C,
					tone: "insert",
					testId: `${y}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ Q("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ Z(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${y}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ Z(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${y}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ Z(r, {
						variant: "primary",
						size: "sm",
						onClick: f,
						"data-testid": `${y}-accept`,
						children: m
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionReviewList.tsx
function Kr({ count: e, children: t, onAcceptAll: o, onRejectAll: s, acceptLabel: c = "Accept all", error: l = null, headerExtra: u, emptyTitle: d = "No suggestions", emptyBody: f = "Proposed changes to this document show up here for review.", title: p = "Suggestions", variant: m = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
	let y = e > 0 && (o || s), b = y || u ? /* @__PURE__ */ Q("span", {
		className: "flex items-center gap-1.5",
		children: [
			u,
			y && s && /* @__PURE__ */ Z(r, {
				variant: "ghost",
				size: "sm",
				onClick: s,
				"data-testid": `${_}-reject-all`,
				children: "Reject all"
			}),
			y && o && /* @__PURE__ */ Z(r, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				"data-testid": `${_}-accept-all`,
				children: c
			})
		]
	}) : void 0, x = /* @__PURE__ */ Q(X, { children: [l && /* @__PURE__ */ Z("div", {
		className: n("pt-2", m === "card" && "px-3"),
		children: /* @__PURE__ */ Z(h, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: l
		})
	}), e === 0 ? /* @__PURE__ */ Z(v, {
		size: "sm",
		title: d,
		body: f,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ Z("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return m === "pane" ? /* @__PURE__ */ Q("div", {
		className: n("flex min-h-0 flex-1 flex-col", g),
		"data-testid": _,
		"data-variant": "pane",
		children: [/* @__PURE__ */ Q("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ Z("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${_}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), b]
		}), /* @__PURE__ */ Z("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: x
		})]
	}) : /* @__PURE__ */ Q(i, {
		padding: "none",
		className: n("overflow-hidden", g),
		"data-testid": _,
		children: [/* @__PURE__ */ Z(w, {
			title: p,
			meta: /* @__PURE__ */ Z(a, {
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
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function qr({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, o] = Y(""), [s, c] = Y(!1), [l, u] = Y(null), p = J(!1);
	async function m(e) {
		if (!p.current) {
			p.current = !0, c(!0), u(null);
			try {
				await e(), o("");
			} catch (e) {
				u(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				p.current = !1, c(!1);
			}
		}
	}
	let h = e.reviewerName || e.reviewerId, g = e.state.replace(/_/g, " "), _ = g.charAt(0).toUpperCase() + g.slice(1);
	return /* @__PURE__ */ Z(fe, {
		"aria-label": `Review by ${h}`,
		"aria-busy": s,
		children: /* @__PURE__ */ Q(d, {
			gap: "sm",
			children: [
				/* @__PURE__ */ Q(f, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ Z("strong", { children: h }),
						/* @__PURE__ */ Z(a, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: _
						}),
						e.required && /* @__PURE__ */ Z(a, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ Z(ee, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ Z("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				l && /* @__PURE__ */ Z(C, {
					tone: "error",
					children: l
				}),
				t && e.state === "pending" && /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Z(b, {
					value: i,
					onChange: (e) => o(e.target.value),
					rows: 2,
					disabled: s,
					"aria-label": `Review comment for ${h}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ Q(f, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ Z(r, {
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
function Jr({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: s, onDecide: c, onWithdraw: l }) {
	let [u, p] = Y(""), [m, h] = Y(""), [g, _] = Y(!0), [v, y] = Y(!1), [x, S] = Y(null), w = J(!1);
	async function T() {
		if (!(!s || !t.some((e) => e.id === u) || w.current)) {
			w.current = !0, y(!0), S(null);
			try {
				await s({
					reviewerId: u,
					note: m.trim(),
					required: g
				}), h(""), p("");
			} catch (e) {
				S(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				w.current = !1, y(!1);
			}
		}
	}
	return /* @__PURE__ */ Q(d, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ Z(C, {
				tone: "error",
				children: a
			}),
			s && /* @__PURE__ */ Q(d, {
				gap: "sm",
				children: [
					/* @__PURE__ */ Z(O, {
						"aria-label": "Reviewer",
						placeholder: "Choose a reviewer",
						value: u,
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
					/* @__PURE__ */ Q(f, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ Z(k, {
							checked: g,
							onChange: _,
							disabled: v
						}), "Required review"]
					}),
					x && /* @__PURE__ */ Z(C, {
						tone: "error",
						children: x
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						disabled: v || i || !t.some((e) => e.id === u),
						onClick: () => void T(),
						children: v ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ Z(B, {
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
				children: e.map((e) => /* @__PURE__ */ Z(qr, {
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
var Yr = [
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
function Xr({ filled: e }) {
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
function Zr({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: s, starred: l = !1, onStarredChange: u, statusPill: d, path: f, crumbsTrailing: h, subtitle: g, metaBar: _, participants: v, onParticipantClick: b, onFollowParticipant: x, followingParticipantId: S, meta: C, saveState: w, headActions: E, tabs: D, activeTab: ee, onTabChange: O, toolbar: k, children: ne, footer: A, proposal: j, surface: M = "workspace", explorer: N, workbench: P, label: re = "Editor", variant: F = "document", itemType: I, itemKey: L, titleSize: R = "md", titleOverflow: z = "truncate", tabsTrailing: B, className: ie, "data-testid": V = "editor-shell" }) {
	let H = F === "work-item", ae = H && (I || L) ? /* @__PURE__ */ Q(X, { children: [I && /* @__PURE__ */ Z(a, {
		size: "sm",
		tone: "info",
		"data-testid": `${V}-item-type`,
		children: I
	}), L && /* @__PURE__ */ Z("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${V}-item-key`,
		children: L
	})] }) : null, U = ae || h != null ? /* @__PURE__ */ Q(X, { children: [ae, h] }) : null, oe = H && (e && e.length > 0 || U != null), se = R === "lg" ? "text-[26px] font-semibold leading-8" : H ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", ce = `${V}-${On().replace(/:/g, "")}`, W = !!D && D.length > 0, le = W ? D.some((e) => e.id === ee) ? ee : D[0].id : void 0, ue = v && v.length > 0 || C != null || !!w, de = (e) => /* @__PURE__ */ Z(y, {
		items: D.map((e) => ({
			id: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {},
			...e.count ? { badge: H ? /* @__PURE__ */ Z("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}) : /* @__PURE__ */ Z(m, {
				variant: "count",
				value: e.count,
				color: "muted",
				"aria-label": `${e.count} in ${e.label}`
			}) } : {},
			testId: `${V}-tab-${e.id}`
		})),
		value: le,
		onValueChange: (e) => O?.(e),
		variant: "underline",
		...H ? { badgeStyle: "plain" } : {},
		size: "md",
		itemClassName: "px-3.5 pb-1.5 pt-1 leading-5",
		"aria-label": `${t} sections`,
		idPrefix: ce,
		className: e
	}), fe = /* @__PURE__ */ Q("section", {
		"aria-label": re,
		"data-testid": V,
		"data-surface": M,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ Q("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-variant": F,
				"data-testid": `${V}-header`,
				children: [
					oe && /* @__PURE__ */ Q("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${V}-crumbs-row`,
						children: [
							/* @__PURE__ */ Z(c, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ Z(p, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								size: "sm",
								className: "min-w-0",
								"data-testid": `${V}-crumbs`
							}),
							e && e.length > 0 && U != null && /* @__PURE__ */ Z("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							U != null && /* @__PURE__ */ Z("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${V}-crumbs-trailing`,
								children: U
							}),
							/* @__PURE__ */ Z("span", { className: "flex-1" }),
							E && /* @__PURE__ */ Z("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${V}-actions`,
								children: E
							})
						]
					}),
					!H && e && e.length > 0 && !h && /* @__PURE__ */ Z(p, {
						items: e,
						maxItems: 4,
						size: "sm",
						className: "[@media(max-height:640px)]:hidden",
						"data-testid": `${V}-crumbs`
					}),
					!H && h && /* @__PURE__ */ Q("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${V}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ Z(p, {
							items: e,
							maxItems: 4,
							size: "sm",
							className: "min-w-0",
							"data-testid": `${V}-crumbs`
						}), /* @__PURE__ */ Z("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${V}-crumbs-trailing`,
							children: h
						})]
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
						"data-testid": `${V}-head-row`,
						children: [
							s && !H && /* @__PURE__ */ Z(te, {
								kind: s,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${V}-kind`
							}),
							/* @__PURE__ */ Q("div", {
								className: "flex min-w-0 flex-[1_1_18rem] flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ Q("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${V}-title-group`,
												children: [r ? /* @__PURE__ */ Z(Ae, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", se, H && "relative -left-[5px]"),
													"data-testid": `${V}-title`
												}) : /* @__PURE__ */ Z("h1", {
													className: n("m-0 min-w-0 max-w-full flex-initial text-text-primary", se, z === "wrap" ? "whitespace-normal break-words" : "truncate"),
													"data-testid": `${V}-title`,
													children: t
												}), u && /* @__PURE__ */ Z(o, {
													size: "sm",
													"aria-label": l ? "Remove star" : "Star this file",
													"aria-pressed": l,
													title: l ? "Starred" : "Star",
													onClick: () => u(!l),
													className: l ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${V}-star`,
													children: /* @__PURE__ */ Z(Xr, { filled: l })
												})]
											}),
											d,
											f && f.length > 0 && /* @__PURE__ */ Z("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${V}-path`,
												children: /* @__PURE__ */ Z(p, {
													items: f,
													maxItems: 4,
													lastIsCurrent: !1,
													size: "sm",
													className: "min-w-0",
													"data-testid": `${V}-path-crumbs`
												})
											})
										]
									}),
									g != null && /* @__PURE__ */ Z("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${V}-subtitle`,
										children: g
									}),
									ue && /* @__PURE__ */ Q("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${V}-byline`,
										children: [
											v && v.length > 0 && /* @__PURE__ */ Z(T, {
												users: v,
												size: 22,
												maxVisible: 4,
												...b ? { onUserClick: b } : {},
												...x ? {
													onFollowUser: x,
													followingUserId: S ?? null
												} : {}
											}),
											C != null && /* @__PURE__ */ Z("span", {
												className: "min-w-0 truncate",
												children: C
											}),
											/* @__PURE__ */ Z(ht, {
												state: w,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							E && !oe && /* @__PURE__ */ Z("div", {
								className: "ml-auto flex shrink-0 flex-wrap items-center gap-3",
								"data-testid": `${V}-actions`,
								children: E
							})
						]
					}),
					_ != null && /* @__PURE__ */ Z("div", {
						className: n("flex min-w-0 items-center", H ? R === "lg" ? "pb-2 pt-1" : "pb-2 pt-3" : "py-2"),
						"data-testid": `${V}-meta-bar`,
						children: _
					}),
					B == null ? W ? de("-mb-px -ml-3 mt-1 border-b-0") : /* @__PURE__ */ Z("span", {
						className: "h-2",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ Q("div", {
						className: "-mb-px mt-1 flex min-w-0 items-end gap-3",
						"data-testid": `${V}-tabs-row`,
						children: [W ? de("-ml-3 min-w-0 flex-1 border-b-0") : /* @__PURE__ */ Z("span", {
							className: "flex-1",
							"aria-hidden": "true"
						}), /* @__PURE__ */ Z("div", {
							className: "flex shrink-0 items-center gap-2 pb-1.5",
							"data-testid": `${V}-tabs-trailing`,
							children: B
						})]
					})
				]
			}),
			k && /* @__PURE__ */ Z("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${V}-toolbar`,
				children: k
			}),
			/* @__PURE__ */ Q("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", M === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${V}-surface`,
				children: [
					/* @__PURE__ */ Z("div", {
						...W ? {
							role: "tabpanel",
							id: `${ce}-panel-${le}`,
							"aria-labelledby": `${ce}-tab-${le}`
						} : {},
						className: n("flex-1 overflow-auto", j != null || A != null ? "min-h-28" : "min-h-0"),
						"data-testid": `${V}-scroller`,
						children: ne
					}),
					j != null && /* @__PURE__ */ Z("div", {
						className: "relative z-20 max-h-[40%] min-h-16 shrink overflow-auto px-[var(--dock-inset,1rem)] pb-1 pt-2",
						"data-testid": `${V}-proposal`,
						children: j
					}),
					A != null && /* @__PURE__ */ Z("div", {
						className: "relative z-20 flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
						"data-testid": `${V}-dock`,
						children: /* @__PURE__ */ Z(ot.Provider, {
							value: "pinned",
							children: A
						})
					})
				]
			})
		]
	});
	return !N && !P ? /* @__PURE__ */ Z("div", {
		className: n("flex h-full min-h-0 flex-col", ie),
		children: fe
	}) : /* @__PURE__ */ Q("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", ie),
		"data-testid": `${V}-frame`,
		children: [N && /* @__PURE__ */ Z("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${V}-explorer`,
			children: N
		}), /* @__PURE__ */ Q("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [fe, P && /* @__PURE__ */ Z("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${V}-workbench`,
				children: P
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/DictationButton.tsx
var Qr = 250;
function $r(e, t, n) {
	return n || (e === "unsupported" ? "Dictation needs a microphone and a secure page" : t ? "Listening — release to insert" : e === "transcribing" ? "Transcribing…" : e === "starting" ? "Starting the microphone…" : "Hold to dictate");
}
function ei({ state: e, micActive: t, unavailableReason: r, onStart: i, onStop: a, className: o, "data-testid": s = "dictation-button" }) {
	let c = J(null), l = $r(e, t, r), d = e === "transcribing" || e === "starting", f = () => {
		if (t) {
			a(), c.current = null;
			return;
		}
		c.current = Date.now(), i();
	}, p = () => {
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
			e.button === 0 && (e.preventDefault(), f());
		},
		onPointerUp: p,
		onPointerLeave: p,
		onKeyDown: (e) => {
			(e.key === " " || e.key === "Enter") && !e.repeat && (e.preventDefault(), f());
		},
		onKeyUp: (e) => {
			(e.key === " " || e.key === "Enter") && (e.preventDefault(), p());
		},
		className: n("grid h-7 w-7 shrink-0 place-items-center rounded-md border-0 p-0 transition-colors", t ? "bg-danger text-white" : "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary", d && "animate-pulse", (r || e === "unsupported") && "opacity-60", o),
		children: /* @__PURE__ */ Z(u, {
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
function ti(e) {
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
var ni = Dn(function({ mentionUsers: e, onReply: t, onResolve: r, onAskAgent: i, onAssign: a, onCancel: o, dictation: s, placeholder: c = "Reply or type /", variant: l = "card", submitLabel: u = "Reply", className: d, "data-testid": f = "comment-reply-composer" }, p) {
	let m = J(null);
	kn(p, () => ({
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
		let n = ti(e);
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
		children: /* @__PURE__ */ Z(En, {
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
			...s ? { submitLead: /* @__PURE__ */ Z(ei, {
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
function ri({ author: e, quote: t, variant: r = "agent", resolveOnApply: i = !1, onResolveOnApplyChange: a, onDismiss: o, className: c, "data-testid": u = "comment-handoff-bar" }) {
	let d = r === "reply", f = d ? "Stop replying" : "Stop answering this comment";
	return /* @__PURE__ */ Q("div", {
		role: "status",
		"data-testid": u,
		"data-variant": r,
		className: n("flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm", c),
		children: [
			d ? /* @__PURE__ */ Z(s, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-primary"
			}) : /* @__PURE__ */ Z(l, {
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
				onClick: o,
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
export { er as AckMode, Bt as ActionItemsCard, or as ActivityFeed, Tt as AttachmentsPanel, an as AuthenticatedDocumentImageView, Xe as BULLET_STYLES, Et as CANVAS_BODY_KEY, Ot as CANVAS_SCHEMA_VERSION, Ar as COMMENT_MARGIN_STORAGE_KEY, $ as COMMENT_REPLY_COMMANDS, sn as CanvasDocumentView, Je as CanvasLineSpacing, $e as CanvasListStyle, Qn as ChunkViewer, kt as CommentContextHeader, Er as CommentGhostPopover, ri as CommentHandoffBar, ni as CommentReplyComposer, Yt as CommentThreadNode, ot as ComposerDockPlacementContext, xe as DECK_THEMES, Yr as DEFAULT_EDITOR_SHELL_TABS, Qr as DICTATION_HOLD_MS, it as DOCK_HEIGHT_VAR, at as DOCK_INSET_VAR, St as DOCUMENT_MODE_LABELS, mn as DOCUMENT_TOOLBAR_BREAKPOINTS, ei as DictationButton, Kt as DiffViewer, qt as DocumentEditorPage, pn as DocumentFindBar, ln as DocumentGutter, st as DocumentHeader, gn as DocumentImageProvider, Rt as DocumentLifecyclePill, Rn as DocumentListPage, ft as DocumentModePill, en as DocumentOutline, bt as DocumentOwnership, Jr as DocumentReviewPanel, Cn as DocumentRuler, ht as DocumentSaveStatus, Fr as DocumentShareDialog, on as DocumentStatusBar, dn as DocumentToolbar, sr as EMPTY_DECK_PRESENCE, Zr as EditorShell, Ke as EditorToolbar, Pt as ExecutiveSummaryCard, ke as Filmstrip, Ee as FilmstripThumb, rt as FloatingComposerDock, kr as FloatingDockBar, zt as FollowModeBar, Ut as HeaderBanner, Jt as KeyDecisionsCard, nt as LINE_SPACINGS, We as LINE_SPACING_LABELS, qe as LIST_STYLE_LABELS, bn as MAX_ATTACHMENT_BYTES, be as MAX_BULLETS_PER_SLIDE, me as MAX_BULLET_CHARS, Fe as MAX_CHART_LABELS, Re as MAX_CHART_SERIES, ge as MAX_EYEBROW_CHARS, hn as MAX_IMAGE_BYTES, Le as MAX_NOTES_CHARS, ce as MAX_QUOTE_CHARS, P as MAX_SLIDES, Ie as MAX_SOURCES_PER_SLIDE, W as MAX_SUBTITLE_CHARS, F as MAX_TITLE_CHARS, He as MULTILEVEL_STYLES, Xt as MentionDropdown, At as MyMentionsPanel, Ze as NUMBER_STYLES, pe as NewDocumentModal, L as OLDER_REVISIONS_VALUE, nn as PX_PER_INCH, vt as ParticipantAvatars, Se as PresentationEditor, de as PresentationView, br as ProposalCard, Ne as ProposedEditStrip, Mt as ReaderMode, Qt as ResolvedBanner, It as ReviewMode, Kn as ReviewProgress, Xn as ReviewableItem, Nr as SHARE_ROLES, Oe as SLIDES_TOOLBAR_BREAKPOINTS, re as SLIDE_ID_PATTERN, Me as SLIDE_INSERTS, U as SLIDE_LAYOUTS, we as SLIDE_LAYOUT_LABELS, Ir as SUGGESTION_AUTHORING_MODES, ut as SectionBlock, Ft as SectionComments, dt as SectionList, Nt as SectionSummariesCard, ve as SlideForm, ue as SlideList, R as SlideRow, ye as SlideSources, Pe as SlideStage, _e as SlidesToolbar, he as SpeakerNotes, Un as StandaloneTiptap, Gr as SuggestionCard, Lr as SuggestionModeControl, Kr as SuggestionReviewList, Gt as TableOfContents, A as TaskItemRow, j as TaskList, tt as TiptapEditor, Ht as VersionHistoryPanel, xt as VideoCallPanel, Or as VideoDockSlot, Lt as VideoHistoryPanel, xr as WorkItemRow, yt as WorkspaceDocumentHeaderNotices, wn as ZOOM_FIT, tn as ZOOM_STEPS, vn as acceptsDocumentImage, M as addSlide, Ce as canSaveDeck, pt as canvasBody, Dt as canvasFragmentToMarkdown, zn as clientIdForUser, ti as commentReplyIntent, jt as countAllComments, yn as createAuthenticatedDocumentImage, cr as deckPresenceChannel, mr as deckViewerToParticipant, fr as deckViewersOf, $r as dictationButtonLabel, un as documentToolbarSize, H as duplicateSlide, pr as editingInMyOtherTab, Ct as findDocumentTarget, xn as findMatches, Vt as generateSummaryBullets, Zt as getInitials, _t as isCanvasDocument, Ge as isLineSpacing, Qe as lineSpacingAttributes, et as listTypeFor, ae as makeSlide, oe as moveSlide, cn as nextMatchIndex, I as nextRevisionLabel, z as nextSlideId, Ye as parseLineSpacing, Ue as parseListStyle, De as proposedEditPlacement, je as proposedEditPreview, jr as readCommentMarginPreference, Sn as readOutline, Wt as readSchemaVersion, wt as relativeTime, V as removeSlide, se as replaceSlide, Tr as replyLabel, lt as resolverLabel, ie as revisionPickerOptions, $t as scrollToDocumentTarget, Te as slidesToolbarSize, _n as stackOffsets, le as svgDataUri, ze as uncitedSlideIds, Mr as useCommentMarginPreference, hr as useDeckPresence, mt as useDocumentActions, fn as useDocumentImageUpload, Tn as useDocumentOutline, rn as useDocumentToolbarSize, Bn as useFollowCursor, gt as useIsCanvasDocument, ct as useSidebarPanels, N as withLayoutDefaults };
