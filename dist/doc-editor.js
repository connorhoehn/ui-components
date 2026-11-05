import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { n as r, o as i } from "./Button-C-I3BxWI.js";
import { t as a } from "./Card-sJqvEOtP.js";
import { n as o } from "./overlayStack-DxIDMUs-.js";
import { t as s } from "./IconButton-Bf5Wy0tS.js";
import { _t as c, dt as l, m as u } from "./Icons-CqVFbuiZ.js";
import { i as d } from "./MediaIcons-_ai5Til2.js";
import { c as f, i as p, l as m, n as h } from "./Text-BEZVdfww.js";
import { t as g } from "./Badge-D58pEJIm.js";
import { t as _ } from "./Banner-400g6E1q.js";
import { t as v } from "./Modal-PO0F6rAp.js";
import { t as y } from "./Input-Brvp1kPv.js";
import { t as b } from "./Select-CpZyUWay.js";
import { t as x } from "./InlinePopover-Dx8-r-XU.js";
import { t as S } from "./EmptyState-pOG782nO.js";
import { n as C } from "./ThinkingDots-BHtlGy_Q.js";
import { n as w } from "./StatusPill-CLkB5jFS.js";
import { t as T } from "./DropdownMenu-DP3rRjEd.js";
import { t as E } from "./Textarea-CvdLeuO_.js";
import { t as ee } from "./Avatar-DkkMISPQ.js";
import { t as te } from "./SegmentedControl-DAjnOtF4.js";
import { t as D } from "./InlineAlert-CnWUBrte.js";
import { t as O } from "./CardHeader-DzQxX5J-.js";
import { t as ne } from "./Breadcrumbs-CirFL-yi.js";
import { t as k } from "./PresenceAvatars-DqCOZ057.js";
import { t as re } from "./ChangeDiff-CGfT-mcu.js";
import { t as A } from "./MetaLine-DFn2XXGU.js";
import { t as j } from "./Checkbox-BW-hyqCM.js";
import { n as ie } from "./FileKindMark-BZmXUxaT.js";
import { t as M } from "./activationKey-CjbL3LUv.js";
import { A as ae, k as oe } from "./renderers-C5HikurY.js";
import { A as N, B as se, C as P, D as ce, E as le, F as ue, G as F, H as I, I as L, J as R, K as de, L as fe, M as pe, N as me, O as he, P as ge, R as _e, S as ve, T as ye, U as be, V as xe, W as Se, X as Ce, _ as we, a as Te, b as Ee, c as De, d as Oe, f as ke, g as Ae, h as je, i as Me, j as Ne, k as Pe, l as Fe, m as Ie, n as Le, o as Re, p as ze, q as Be, r as Ve, s as He, t as Ue, u as We, v as Ge, w as Ke, x as qe, y as Je, z as Ye } from "./ProposedEditStrip-CLlg6ffE.js";
import { t as Xe } from "./InlineEditableText-c94ETQ89.js";
import { o as Ze, t as Qe } from "./VerdictChip-Dd5al9jm.js";
import { a as $e, c as et, d as tt, f as nt, h as rt, i as it, l as at, m as ot, n as st, o as ct, p as lt, r as ut, s as dt, t as ft, u as pt } from "./TiptapEditor-BU4pt2sS.js";
import { i as mt, n as ht, r as gt, t as _t } from "./FloatingComposerDock-D10uQ4k3.js";
import { A as vt, B as yt, C as bt, D as xt, E as St, F as Ct, G as wt, H as Tt, I as Et, J as Dt, K as Ot, L as kt, M as At, N as jt, O as Mt, P as Nt, R as Pt, S as Ft, T as It, U as Lt, V as Rt, W as zt, _ as Bt, a as Vt, b as Ht, c as Ut, d as Wt, f as Gt, g as Kt, h as qt, i as Jt, j as Yt, k as Xt, l as Zt, m as Qt, o as $t, p as en, q as tn, r as nn, s as rn, t as an, u as on, v as sn, w as cn, x as ln, y as un, z as dn } from "./DocumentEditorPage-Bn1a8zO7.js";
import { C as fn, S as pn, T as mn, _ as hn, a as gn, b as _n, c as vn, d as yn, f as bn, g as xn, h as Sn, i as Cn, l as wn, m as Tn, n as En, o as Dn, p as On, r as kn, s as An, t as jn, u as Mn, v as Nn, w as Pn, x as Fn, y as In } from "./useDocumentImageUpload-XILE9ZZg.js";
import { i as Ln } from "./ConversationInputs-InPayN0Y.js";
import { r as Rn } from "./RichChatComposer-B2Xmnqkg.js";
import { forwardRef as zn, useCallback as z, useEffect as B, useId as Bn, useImperativeHandle as Vn, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
import * as Hn from "yjs";
import { relativePositionToAbsolutePosition as Un, ySyncPluginKey as Wn } from "@tiptap/y-tiptap";
import { Extension as Gn, Mark as Kn, mergeAttributes as qn } from "@tiptap/core";
import { EditorState as Jn, Plugin as Yn, PluginKey as Xn, TextSelection as q } from "@tiptap/pm/state";
import { Decoration as Zn, DecorationSet as Qn } from "@tiptap/pm/view";
import { AddMarkStep as $n, AddNodeMarkStep as er, AttrStep as tr, RemoveMarkStep as nr, RemoveNodeMarkStep as rr, ReplaceAroundStep as ir, ReplaceStep as ar, Transform as or, replaceStep as sr } from "@tiptap/pm/transform";
//#region src/components/doc-editor/DocumentListPage.tsx
function cr(e) {
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
var lr = {
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
function ur({ status: e }) {
	let t = lr[e] ?? lr.draft;
	return /* @__PURE__ */ G("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var dr = {
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
function fr({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ K("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = dr[e.mode ?? "editor"] ?? dr.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ K("button", {
				"data-ui-part": "",
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
					/* @__PURE__ */ G("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ G("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ G("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ K("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function pr({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = U(!1), [u, d] = U(null), [f, p] = U(null), [m, h] = U(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = V(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = z((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ K("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ K("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ G("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ K("button", {
					"data-ui-part": "",
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ G("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ G("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ G("div", {
				className: n("flex flex-col gap-3"),
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ K("div", {
						"data-ui-part": "",
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: M(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ G("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ K("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ K("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ G("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ G(ur, { status: e.status }),
											e.type && /* @__PURE__ */ G("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ K("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ G("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ G("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ K("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", cr(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ G("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ G(fr, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ G("button", {
								"data-ui-part": "",
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
			e.length > 10 && /* @__PURE__ */ K("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ G("button", {
						"data-ui-part": "",
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ K("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ G("button", {
						"data-ui-part": "",
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ G(Ce, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function mr(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function hr({ editor: e, provider: t, followClientId: n, onLost: r }) {
	B(() => {
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
				let t = Wn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = Un(t.doc, t.type, Hn.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var gr = "prosemirror";
function _r(e) {
	return e.ydoc !== void 0;
}
function vr(e) {
	return _r(e) ? /* @__PURE__ */ G(yr, { ...e }) : /* @__PURE__ */ G(br, { ...e });
}
function yr({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = gr, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = V(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = H(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ G("div", {
		className: n(c),
		children: /* @__PURE__ */ G(ft, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function br({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = gr, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = H(/* @__PURE__ */ new Set()), _ = z((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = z((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = V(() => ({
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
	}), w = V(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = H(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ G("div", {
		className: n(d),
		children: /* @__PURE__ */ G(ft, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ G("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function xr({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ K("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ K("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ K("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ K("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ G("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ G("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var Sr = {
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
}, Cr = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, wr = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Tr({ item: e, onAck: t, onReject: r }) {
	let [i, a] = U(!1), [o, s] = U(""), [c, l] = U("none"), u = H(e.status), d = Sr[e.status] ?? wr, f = Cr[e.priority] ?? "var(--color-neutral)", [p, m] = U(!1), h = H(null);
	B(() => () => {
		h.current && clearTimeout(h.current);
	}, []), B(() => {
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
	return /* @__PURE__ */ K("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ K("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ G("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ G("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ G("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ K("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ G("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ K("span", { children: [
					"Approved by ",
					/* @__PURE__ */ G("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ K(W, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ K(W, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ K("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ G("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ K("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ G("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ K(W, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ K(W, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ K("div", { children: [/* @__PURE__ */ K("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: p,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ K("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ G(E, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && g()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ K("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ G("button", {
							"data-ui-part": "",
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ G("button", {
							"data-ui-part": "",
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: _,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ G("button", {
							"data-ui-part": "",
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
var Er = {
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
function Dr({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Er[e.type] ?? Er.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ K("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ G("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ G("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ G("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ G(ft, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ K("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ K("div", { children: [e.items.map((e) => /* @__PURE__ */ G(Tr, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ K("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ G(Kt, {
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
var Or = 4;
function kr({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = U(0), _ = Math.max(1, Math.ceil(e.length / Or)), v = h * Or, y = e.slice(v, v + Or);
	if (B(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Or)), s?.());
	}, [
		o,
		e.length,
		s
	]), B(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ G("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ K("div", { children: [
		/* @__PURE__ */ G(xr, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ G("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ K("div", { children: [a.length > 0 && /* @__PURE__ */ K("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ G("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ G("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ G(Dr, {
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
		/* @__PURE__ */ K("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ G("button", {
					"data-ui-part": "",
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ K("span", {
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
				/* @__PURE__ */ G("button", {
					"data-ui-part": "",
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
function Ar(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function jr(e, t) {
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
function Mr(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Nr(e) {
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
function Pr(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function Fr({ events: e, participants: t }) {
	let [r, i] = U(!1);
	return /* @__PURE__ */ K("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ K("button", {
			"data-ui-part": "",
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ K("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ G("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ K(W, { children: [t.length > 0 && /* @__PURE__ */ K("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ G("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ K("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ G("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					Pr(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ G("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ G("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ K("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ G("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: Mr(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ K("div", { children: [
						/* @__PURE__ */ G("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ K("span", {
							className: n("text-neutral"),
							children: [
								Ar(e.eventType),
								" ",
								jr(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ G("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Nr(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/useDeckPresence.ts
var Ir = {
	viewers: [],
	participants: [],
	slideViewers: {},
	editingElsewhere: !1
}, Lr = (e) => `doc:${e}`, Rr = "var(--color-primary)", zr = /* @__PURE__ */ new Set([
	"editor",
	"reviewer",
	"reader"
]);
function Br(e, t) {
	let n = e.find((e) => e.clientId === t)?.metadata?.userId;
	return typeof n == "string" && n ? n : null;
}
function Vr(e, t, n, r = () => void 0) {
	let i = Br(e, n), a = /* @__PURE__ */ new Map();
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
function Hr(e, t, n) {
	let r = Br(e, n);
	return r ? e.some((e) => e.clientId !== n && e.status !== "offline" && e.metadata?.userId === r && e.metadata?.deckEditing?.documentId === t) : !1;
}
function Ur(e, t) {
	let n = t?.metadata ?? {}, r = typeof n.mode == "string" && zr.has(n.mode) ? n.mode : e.editing ? "editor" : "reader";
	return {
		clientId: e.clientId,
		userId: e.id,
		displayName: e.name,
		color: typeof n.color == "string" && n.color ? n.color : Rr,
		mode: r,
		currentSectionId: e.slideId ?? null,
		...e.idle ? { idle: !0 } : {}
	};
}
function Wr(e) {
	let { roster: t, ownClientId: n, updateMetadata: r, documentId: i, selectedSlideId: a, slideTitle: o, editing: s = !1 } = e;
	return B(() => {
		r({ deckSlide: a ? {
			documentId: i,
			slideId: a
		} : null });
	}, [
		i,
		a,
		r
	]), B(() => {
		r({ deckEditing: s ? { documentId: i } : null });
	}, [
		i,
		s,
		r
	]), B(() => () => r({
		deckSlide: null,
		deckEditing: null
	}), [r]), V(() => {
		let e = Vr(t, i, n, o), r = {};
		for (let t of e) t.slideId && (r[t.slideId] ??= []).push(t);
		return {
			viewers: e,
			participants: e.map((e) => Ur(e, t.find((t) => t.clientId === e.clientId))),
			slideViewers: r,
			editingElsewhere: Hr(t, i, n)
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
var Gr = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Kr = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function qr({ label: e, children: t }) {
	return /* @__PURE__ */ K("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ G("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ G("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var Jr = {
	field: "Field change",
	prose: "Body text"
};
function Yr({ utterance: e, kind: t, status: i, confidence: a, attachState: s, targetLabel: c, targetReason: l, before: u, after: d, edits: f, rationale: p, draftError: m, author: h, category: g, path: _, locationHint: v, verdict: b, verdictStatus: x = "idle", verdictError: S, revision: C, onRereview: w, onAccept: T, onReject: E, onRedraft: te, onReattach: D, onConfirmAttachment: O, className: ne, "data-testid": k = "proposal-card" }) {
	let [A, j] = U(!1), [ie, M] = U(null), [ae, oe] = U(!1), [N, se] = U(""), P = i === "applied", ce = i === "rejected", le = P || ce;
	async function ue() {
		j(!0), M(null);
		try {
			let e = await T();
			M(e);
		} catch (e) {
			M({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			j(!1);
		}
	}
	let F = t === "prose" ? f ?? [] : [{
		before: u ?? "",
		after: d ?? ""
	}];
	return /* @__PURE__ */ K("div", {
		"data-testid": k,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", P ? "border-success-border" : "border-border", ce && "opacity-60", ne),
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ G("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${k}-category`,
						children: g ?? Jr[t]
					}),
					h && /* @__PURE__ */ K("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${k}-requester`,
						children: [/* @__PURE__ */ G(ee, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ G("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ G("span", { className: "flex-1" }),
					/* @__PURE__ */ G(o, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${k}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ G(o, {
						tone: Kr[a],
						size: "sm",
						children: Gr[a]
					}),
					s === "healed" && /* @__PURE__ */ G(o, {
						tone: "caution",
						size: "sm",
						"data-testid": `${k}-healed`,
						children: "Re-found by quote — check this"
					}),
					s === "author_only" && /* @__PURE__ */ G(o, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					P && /* @__PURE__ */ G(o, {
						tone: "success",
						size: "sm",
						"data-testid": `${k}-applied`,
						children: "Applied"
					}),
					ce && /* @__PURE__ */ G(o, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ K("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ G(Ze, {
				path: _ ?? (c ? [c] : []),
				...v ? { hint: v } : {},
				"data-testid": `${k}-location`
			}),
			/* @__PURE__ */ K("div", {
				className: "flex flex-col gap-1",
				children: [l && /* @__PURE__ */ G(qr, {
					label: "Why",
					children: l
				}), p && /* @__PURE__ */ G(qr, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ G("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${k}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ G("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${k}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && F.length > 0 && /* @__PURE__ */ G(re, {
				pairs: F,
				"data-testid": `${k}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ G(Qe, {
				verdict: b,
				status: x,
				error: S,
				revision: C,
				"data-testid": `${k}-verdict`
			}),
			ie && !ie.ok && /* @__PURE__ */ K("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${k}-apply-error`,
				children: [
					/* @__PURE__ */ G("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ G("span", { children: ie.message ?? "The document refused the change." }),
					ie.stale && /* @__PURE__ */ K("span", { children: [
						"Drafted against ",
						JSON.stringify(ie.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(ie.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!le && /* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ G(r, {
						size: "sm",
						variant: "primary",
						disabled: A || i === "drafting" || !!m,
						onClick: ue,
						"data-testid": `${k}-accept`,
						children: A ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ G(r, {
						size: "sm",
						variant: "ghost",
						disabled: A,
						onClick: () => oe((e) => !e),
						"data-testid": `${k}-reject`,
						children: "Reject"
					}),
					te && /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "ghost",
						disabled: A,
						onClick: te,
						"data-testid": `${k}-redraft`,
						children: "Re-draft"
					}),
					w && /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "ghost",
						disabled: A,
						onClick: w,
						"data-testid": `${k}-rereview`,
						children: "Re-run review"
					}),
					D && /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "ghost",
						disabled: A,
						onClick: D,
						"data-testid": `${k}-reattach`,
						children: "Move…"
					}),
					O && s === "author_only" && /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "secondary",
						disabled: A,
						onClick: O,
						"data-testid": `${k}-confirm`,
						children: "Right place"
					})
				]
			}),
			ae && !le && /* @__PURE__ */ K("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ G("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${k}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ G(y, {
						id: `${k}-reason`,
						size: "sm",
						value: N,
						onChange: (e) => se(e.target.value),
						"data-testid": `${k}-reason`
					}),
					/* @__PURE__ */ K("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ G(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								E(N), oe(!1);
							},
							"data-testid": `${k}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ G(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => oe(!1),
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
function Xr({ itemId: e, utterance: t, unplaced: i = !1, targetLabel: s, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...f ?? []].sort((e, t) => t.score - e.score), x = new Set(y.map((e) => e.sectionId)), S = p.filter((e) => !x.has(e.id));
	return /* @__PURE__ */ G(a, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ K("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ K("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ G(o, {
						tone: i ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: i ? "Unplaced" : s ?? "Placed"
					}), l && /* @__PURE__ */ G(o, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ K("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				c && /* @__PURE__ */ G("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ G("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ K("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ G(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				i && y.length > 0 && /* @__PURE__ */ K("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ G("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ K(r, {
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
				i && S.length > 0 && /* @__PURE__ */ K("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ G("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ G(b, {
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
var Zr = "[data-comment-id]", Qr = 240;
function $r(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function ei(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function ti({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: s, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [d, f] = U(null), p = H(null), m = H(null), h = H(null);
	h.current = d;
	let g = V(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = H(g);
	_.current = g;
	let v = z(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), y = z(() => {
		v(), f(null);
	}, [v]), b = z((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${$r(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [v, t]);
	Vn(l, () => ({
		openComment: (e, t) => b(e, t, "click"),
		close: y
	}), [b, y]);
	let S = H(null), C = d?.id ?? null;
	B(() => {
		S.current !== C && (S.current = C, a?.(C));
	}, [C, a]), B(() => v, [v]), B(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Zr) : null, a = (e) => {
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
			}, Qr));
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
	return /* @__PURE__ */ G(x, {
		trigger: p,
		open: !!w,
		onClose: y,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": w ? `Comment by ${w.author}` : void 0,
		"data-testid": u,
		children: w && /* @__PURE__ */ K("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": w.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), m.current = setTimeout(() => {
					h.current?.via === "hover" && y();
				}, Qr);
			},
			children: [
				/* @__PURE__ */ K("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ G(ee, {
							name: w.author,
							size: 20,
							color: w.color
						}),
						/* @__PURE__ */ G("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: w.author
						}),
						w.timestamp && /* @__PURE__ */ G("span", {
							className: "text-[11px] text-text-tertiary",
							children: Ft(w.timestamp)
						}),
						w.resolved && /* @__PURE__ */ G(o, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				w.quote && /* @__PURE__ */ G("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: w.quote
				}),
				/* @__PURE__ */ G("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: w.text
				}),
				/* @__PURE__ */ K("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ G("span", {
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: ei(w.replyCount ?? 0)
					}), /* @__PURE__ */ K("span", {
						className: "flex gap-1.5",
						children: [s && /* @__PURE__ */ G(r, {
							size: "sm",
							variant: "ghost",
							onClick: T(s),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !w.resolved && /* @__PURE__ */ G(r, {
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
function ni() {
	return /* @__PURE__ */ K("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ G("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ G("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function ri({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: a = "Drop the call here to read alongside it", undockLabel: o = "Pop video back out", onRequestUndock: c, compact: l = !1, onDragOver: u, onDragLeave: d, onDrop: f, className: p, children: m, "data-testid": h = "video-dock-slot" }) {
	let [g, _] = U(!1), v = z((e) => {
		e.preventDefault(), t && _(!0), u?.(e);
	}, [t, u]), y = z((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (_(!1), d?.(e));
	}, [d]), b = z((e) => {
		e.preventDefault(), _(!1), t && f?.(e);
	}, [t, f]);
	return !e && !t ? null : /* @__PURE__ */ G("div", {
		"data-testid": h,
		"data-docked": String(e),
		"data-compact": l ? "true" : void 0,
		"data-drag-over": String(g),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: v,
		onDragLeave: y,
		onDrop: b,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", g ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", p),
		children: e ? /* @__PURE__ */ K("div", {
			"data-testid": `${h}-content`,
			className: "relative w-full",
			children: [m, c && /* @__PURE__ */ G("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ G(s, {
					"aria-label": o,
					size: "sm",
					onClick: c,
					"data-testid": `${h}-undock`,
					icon: /* @__PURE__ */ G(ni, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ K("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${h}-dropzone`,
			className: n(l ? "flex h-10 w-full flex-row items-center justify-center gap-2" : "flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", g ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ G("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ G("span", {
				className: "truncate text-xs text-text-tertiary",
				children: a
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function ii({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ G("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ G("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ G("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ G("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/useCommentMarginPreference.ts
var ai = "doc-editor:canvas:gutter-visible";
function oi(e = ai, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function si({ storageKey: e = ai, defaultVisible: t = !1 } = {}) {
	let [n, r] = U(() => oi(e, t)), i = z((t) => {
		try {
			window.localStorage.setItem(e, t ? "1" : "0");
		} catch {}
		r(t);
	}, [e]);
	return {
		visible: n,
		toggle: z(() => {
			r((t) => {
				let n = !t;
				try {
					window.localStorage.setItem(e, n ? "1" : "0");
				} catch {}
				return n;
			});
		}, [e]),
		show: z(() => i(!0), [i])
	};
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var ci = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], li = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function ui({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, m] = U(""), h = () => {
		let e = p.trim();
		!e || !l || (l(e), m(""));
	};
	return /* @__PURE__ */ G(v, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ K("div", {
			className: "flex flex-col gap-4",
			"data-testid": f,
			children: [
				l && /* @__PURE__ */ K("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ G("input", {
						"data-ui-part": "",
						value: p,
						onChange: (e) => m(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && h();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ G(r, {
						size: "sm",
						onClick: h,
						disabled: !p.trim(),
						"data-testid": `${f}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ G("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${f}-notice`,
					children: d
				}),
				/* @__PURE__ */ G("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${f}-people`,
					children: i.map((e) => /* @__PURE__ */ K("div", {
						className: "flex items-center gap-2",
						"data-testid": `${f}-person`,
						children: [
							/* @__PURE__ */ G(ee, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ G("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ G("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${f}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ G(b, {
								size: "sm",
								variant: "ghost",
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${f}-role`,
								options: ci.filter((e) => e !== "owner").map((e) => ({
									value: e,
									label: e
								}))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ K("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ G("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ G(b, {
						size: "md",
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${f}-general-access`,
						options: Object.keys(li).map((e) => ({
							value: e,
							label: li[e](o)
						}))
					})]
				}),
				/* @__PURE__ */ K("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ G(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${f}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ G("span", {}), /* @__PURE__ */ G(r, {
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
var di = [
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
function fi({ mode: e, onModeChange: t, showViewing: r = !0, openCount: a = null, disabled: o = !1, className: s, "data-testid": c = "suggestion-mode-control" }) {
	let l = di.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), u = di.find((t) => t.value === e);
	return /* @__PURE__ */ K("div", {
		"data-testid": c,
		"data-mode": e,
		title: u?.hint,
		className: n("inline-flex items-center gap-2", o && "pointer-events-none opacity-50", s),
		children: [/* @__PURE__ */ G(i, {
			density: "compact",
			children: /* @__PURE__ */ G(te, {
				options: l,
				value: e,
				"aria-label": "What your typing does",
				onChange: (n) => {
					let r = n;
					r !== e && t(r);
				}
			})
		}), a !== null && a > 0 && /* @__PURE__ */ G("span", {
			"data-testid": `${c}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: a === 1 ? "1 suggestion" : `${a} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var pi = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, mi = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, hi = 6, gi = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function _i(e) {
	let t = gi.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function vi(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function yi({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, hi), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ K("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ G(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > hi && /* @__PURE__ */ K("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - hi,
				" more"
			]
		})]
	});
}
function bi({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, acceptLabel: m = "Accept", selected: h = !1, onSelectedChange: g, status: _, className: v, "data-testid": y = "suggestion-card" }) {
	let { person: b, model: x } = _i(t.trim() === "" ? "Unknown author" : t.trim()), S = c && c.length > 0 ? c : s ? [s] : [], C = l && l.length > 0 ? l : o ? [o] : [], w = S.length > 0 || C.length > 0;
	return /* @__PURE__ */ K("div", {
		"data-testid": y,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		"data-selected": g ? h ? "true" : "false" : void 0,
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", v),
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex items-center gap-2",
				children: [
					g && /* @__PURE__ */ G(j, {
						checked: h,
						onChange: (e) => g(e),
						"aria-label": `Select suggestion by ${t.trim() || "unknown author"}`,
						"data-testid": `${y}-select`
					}),
					/* @__PURE__ */ G(ee, {
						name: b,
						size: 20
					}),
					/* @__PURE__ */ G("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: b,
						"data-testid": `${y}-author`,
						children: b
					}),
					i !== null && /* @__PURE__ */ G("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: vi(i)
					}),
					_ != null && /* @__PURE__ */ G("span", {
						className: "ml-auto flex shrink-0 items-center",
						"data-testid": `${y}-status`,
						children: _
					}),
					/* @__PURE__ */ G("span", {
						className: n(_ == null && "ml-auto", "shrink-0 text-[11px] font-medium", mi[e]),
						"data-testid": `${y}-kind`,
						children: pi[e]
					})
				]
			}),
			(x || a) && /* @__PURE__ */ K("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					x && /* @__PURE__ */ K("span", {
						"data-testid": `${y}-model`,
						children: ["powered by ", x]
					}),
					x && a && /* @__PURE__ */ G("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ K("span", {
						"data-testid": `${y}-context`,
						children: ["in ", a]
					})
				]
			}),
			w && /* @__PURE__ */ K("button", {
				"data-ui-part": "",
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${y}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [C.length > 0 && /* @__PURE__ */ G(yi, {
					lines: C,
					tone: "delete",
					testId: `${y}-deleted`
				}), S.length > 0 && /* @__PURE__ */ G(yi, {
					lines: S,
					tone: "insert",
					testId: `${y}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ K("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ G(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${y}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ G(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${y}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ G(r, {
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
//#region src/components/doc-editor/deckText.ts
function xi(e) {
	let t = !1, n, r, i = e.trim().split(/\s+/).filter(Boolean), a = [];
	for (let e = 0; e < i.length; e += 1) {
		let o = i[e], s = o.toLowerCase();
		if (s === "--preview") {
			t = !0;
			continue;
		}
		if (s === "--from" || s.startsWith("--from=")) {
			let t = s.startsWith("--from=") ? o.slice(7) : i[e + 1] ?? "", a = t.toLowerCase();
			s.startsWith("--from=") || (e += 1);
			let c = /^recording:(.+)$/i.exec(t);
			c ? (n = "transcript", r = c[1]) : a.startsWith("transcript") || a.startsWith("recording") || a.startsWith("meeting") ? n = "transcript" : a && (n = "documents");
			continue;
		}
		a.push(o);
	}
	return {
		prompt: a.join(" ").trim(),
		preview: t,
		...n ? { from: n } : {},
		...r ? { recordingId: r } : {}
	};
}
function Si(e, t) {
	let n = /^(.+?)\s*(?:—|–)\s*(.+)$/s.exec(e.trim())?.[1]?.trim();
	return n ? n.slice(0, 120) : (e.trim().split(/\s+/).slice(0, 8).join(" ") || (t ? `${t} deck` : "Presentation")).slice(0, 120);
}
function Ci(e, t) {
	if (e && t.some((t) => t.recordingId === e)) return e;
	if (!e) return t.length === 1 ? t[0].recordingId : void 0;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/markNames.ts
var wi = "suggestionInsert", Ti = "suggestionDelete", Ei = "suggestionModify", Di = 6e5;
function Oi(e = Date.now()) {
	return Math.floor(e / Di) * Di;
}
function ki(e, t, n = Date.now()) {
	return {
		user: e,
		username: t,
		date: Oi(n)
	};
}
function J(e) {
	if (!e) return null;
	let { user: t, username: n, date: r } = e.attrs;
	return typeof t != "string" || typeof r != "number" ? null : {
		user: t,
		username: typeof n == "string" ? n : t,
		date: r
	};
}
function Y(e, t) {
	return !e || !t ? !1 : e.user === t.user && e.date === t.date;
}
function Ai(e) {
	return `${e.user}@${e.date}`;
}
var ji = "string", Mi = "number";
//#endregion
//#region src/components/doc-editor/suggestions/vendor/utils.ts
function X(e) {
	let t = e.marks[wi], n = e.marks[Ti], r = e.marks[Ei], i = [
		t ? null : wi,
		n ? null : Ti,
		r ? null : Ei
	].filter(Boolean);
	if (!t || !n || !r) throw Error(`Suggestion marks missing from schema: ${i.join(", ")}. Register the SuggestionMarks extensions on the editor.`);
	return {
		insertion: t,
		deletion: n,
		modification: r
	};
}
function Z(e, t, n) {
	return e.find((e) => e.type === t && (!n || Y(J(e), n)));
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/findSuggestionMarkEnd.ts
function Ni(e, t, n) {
	let r = Z((e.nodeAfter ?? e.nodeBefore)?.marks ?? [], t, n);
	if (!r) return e.pos;
	let i = J(r), a = e.pos + (e.nodeAfter?.nodeSize ?? 0);
	for (;;) {
		let n = e.doc.resolve(a);
		if (n.depth < 1 || n.nodeAfter && !Z(n.marks(), t, i ?? void 0)) return n.pos;
		let r = n.after(), o = e.doc.resolve(r), s = o.nodeAfter;
		for (; o.depth > 0 && !s;) r = n.after(o.depth), o = e.doc.resolve(r), s = o.nodeAfter;
		let c = r + 1, l = s?.firstChild;
		for (; l && !l.isLeaf && !Z(l.marks, t, i ?? void 0);) l = l.firstChild, c++;
		let u = l ? Z(l.marks, t, i ?? void 0) : void 0;
		if (!l || !u || !Y(J(u), i)) return n.pos;
		let d = e.doc.resolve(c);
		a = d.pos + (d.nodeAfter?.nodeSize ?? 0);
	}
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/decorations.ts
function Pi() {
	let e = document.createElement("span");
	return e.className = "suggestion-pilcrow", e.appendChild(document.createTextNode("¶")), e;
}
function Fi(e) {
	let t = J(e);
	return t ? Ai(t) : e.type.name;
}
function Ii(e) {
	let { deletion: t, insertion: n } = X(e.schema), r = [], i = null, a = null, o = 0;
	return e.doc.descendants((e, s, c) => {
		if (e.isTextblock && e.childCount && (e.children.every((e) => !!Z(e.marks, t)) && r.push(Zn.node(s, s + e.nodeSize, { "data-node-deletion": "true" })), e.children.every((e) => !!Z(e.marks, n)) && r.push(Zn.node(s, s + e.nodeSize, { "data-node-insertion": "true" }))), e.type.name !== "text") return !0;
		let l = Z(e.marks, t), u = Z(e.marks, n), d = a ? Z(a.marks, t) : void 0, f = a ? Z(a.marks, n) : void 0, p = o;
		return a = e, o = s + e.nodeSize, c === i ? (i = c, !0) : (i = c, (!l || !d) && (!u || !f) || !Y(J(l), J(d)) && !Y(J(u), J(f)) || (l && r.push(Zn.widget(p, Pi, {
			key: Fi(l),
			marks: [l]
		})), u && r.push(Zn.widget(p, Pi, {
			key: Fi(u),
			marks: [u]
		})), !0));
	}), Qn.create(e.doc, r);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/plugin.ts
var Q = new Xn("suggestChanges");
function Li(e = !1) {
	return new Yn({
		key: Q,
		state: {
			init() {
				return { enabled: e };
			},
			apply(e, t) {
				let n = e.getMeta(Q);
				return n && "enabled" in n ? { enabled: !!n.enabled } : t;
			}
		},
		props: {
			decorations: Ii,
			handleKeyDown(e, t) {
				return t.key === "ArrowRight" && e.state.selection instanceof q && e.state.selection.empty && e.state.selection.$cursor?.nodeAfter?.text?.startsWith("​") && e.dispatch(e.state.tr.setSelection(q.create(e.state.doc, e.state.selection.$cursor.pos + 1))), t.key === "ArrowLeft" && e.state.selection instanceof q && e.state.selection.empty && e.state.selection.$cursor?.nodeBefore?.text?.endsWith("​") && e.dispatch(e.state.tr.setSelection(q.create(e.state.doc, e.state.selection.$cursor.pos - 1))), !1;
			}
		}
	});
}
function Ri(e) {
	return !!Q.getState(e)?.enabled;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/commands.ts
function zi(e, t, n) {
	let r = [];
	e.doc.descendants((e, i) => {
		if (!e.isTextblock) return !0;
		let a = e.childCount > 0;
		return e.forEach((e) => {
			Z(e.marks, t, n) || (a = !1);
		}), a && r.push(i), !1;
	});
	for (let t = r.length - 1; t >= 0; t--) {
		let n = r[t], i = e.doc.nodeAt(n);
		if (!i) continue;
		let a = e.doc.resolve(n), o = a.depth, s = n, c = n + i.nodeSize;
		for (; o > 0 && a.node(o).childCount === 1;) s = a.before(o), c = a.after(o), o--;
		let l = e.doc.resolve(s), u = l.index();
		if (!l.parent.canReplace(u, u + 1)) {
			let t = l.parent.contentMatchAt(u).defaultType?.createAndFill(), n = e.doc.nodeAt(s);
			t && n && t.type !== n.type && l.parent.canReplaceWith(u, u + 1, t.type) && e.replaceWith(s, c, t);
			continue;
		}
		e.delete(s, c);
	}
}
function Bi(e, t, n, r, i, a, o) {
	let s = (e) => Z(e, n, i), c = (e) => Z(e, r, i), l = (e) => i ? e : n, u = s(e.marks);
	u && (e.isInline ? t.removeMark(0, e.nodeSize, l(u)) : t.removeNodeMark(0, l(u))), e.descendants((e, n) => {
		if (a !== void 0 && n < a) return !0;
		if (o !== void 0 && n > o) return !1;
		let u = c(e.marks), d = s(e.marks);
		if (!u && !d) return !0;
		if (u) {
			let { pos: a, deleted: o } = t.mapping.mapResult(n);
			if (o) return !1;
			let s = Ni(t.doc.resolve(a + e.nodeSize), r, i), c = t.doc.textBetween(a - 1, a, "x", "x"), l = s <= t.doc.content.size ? t.doc.textBetween(s, s + 1, "x", "x") : "", u = +(c === " " && l === " ");
			return t.deleteRange(a, s + u), !1;
		}
		let f = d, p = t.mapping.map(n), m = p + e.nodeSize;
		return e.isInline ? (t.removeMark(p, m, l(f)), e.text === "​" && t.delete(p, m)) : t.removeNodeMark(p, l(f)), !0;
	});
}
function Vi(e, t, n, r) {
	let { modification: i } = X(e.type.schema), a = e.marks.filter((e) => e.type === i && (!r || Y(J(e), r)));
	for (let r of a) if (r.attrs.type === "attr" && typeof r.attrs.attrName == "string") n.setNodeAttribute(t, r.attrs.attrName, r.attrs.previousValue);
	else if (r.attrs.type === "mark") r.attrs.previousValue ? n.addNodeMark(0, e.type.schema.markFromJSON(r.attrs.previousValue)) : n.removeNodeMark(t, e.type.schema.markFromJSON(r.attrs.previousValue));
	else if (r.attrs.type === "nodeType") {
		let i = e.type.schema.nodes[r.attrs.previousValue];
		if (!i) throw Error(`Unknown node type ${String(r.attrs.previousValue)}`);
		n.setNodeMarkup(t, i, null);
	} else throw Error("Unknown modification type");
}
function Hi(e, t, n, r, i, a) {
	let { modification: o } = X(e.type.schema), s = (e) => r ? e : o, c = Z(e.marks, o, r);
	if (c) {
		let i;
		do
			i = t.steps.length, t.removeNodeMark(0, s(c));
		while (t.steps.length > i);
		n < 0 && Vi(e, 0, t, r);
	}
	e.descendants((e, c) => {
		if (i !== void 0 && c < i) return !0;
		if (a !== void 0 && c > a) return !1;
		let l = Z(e.marks, o, r);
		if (!l) return !0;
		let u;
		do
			u = t.steps.length, t.removeNodeMark(c, s(l));
		while (t.steps.length > u);
		return n < 0 && Vi(e, c, t, r), !0;
	});
}
function Ui(e) {
	let { deletion: t, insertion: n } = X(e.type.schema), r = new or(e);
	return zi(r, t), Bi(e, r, n, t), Hi(r.doc, r, 1), r.doc;
}
function Wi(e) {
	let { deletion: t, insertion: n } = X(e.type.schema), r = new or(e);
	return zi(r, n), Bi(e, r, t, n), Hi(r.doc, r, -1), r.doc;
}
function Gi(e, t, n) {
	let r = e.resolve(t).blockRange(e.resolve(n)), { deletion: i, insertion: a } = X(e.type.schema), o = new or(e);
	return Bi(e, o, a, i, void 0, r.start, r.end), Hi(e, o, 1, void 0, r.start, r.end), o.doc.slice(o.mapping.map(t), o.mapping.map(n));
}
function Ki(e, t) {
	let { deletion: n, insertion: r } = X(e.schema), i = e.tr;
	return zi(i, n), Bi(e.doc, i, r, n), Hi(i.doc, i, 1), i.setMeta(Q, { skip: !0 }), t?.(i), !0;
}
function qi(e, t, n) {
	return (r, i) => {
		let { deletion: a, insertion: o } = X(r.schema), s = r.tr;
		return t === void 0 && n === void 0 && zi(s, a, e), Bi(r.doc, s, o, a, e, t, n), Hi(s.doc, s, 1, e, t, n), s.steps.length ? (s.setMeta(Q, { skip: !0 }), i?.(s), !0) : !1;
	};
}
function Ji(e, t) {
	let { deletion: n, insertion: r } = X(e.schema), i = e.tr;
	return zi(i, r), Bi(e.doc, i, n, r), Hi(i.doc, i, -1), i.setMeta(Q, { skip: !0 }), t?.(i), !0;
}
function Yi(e, t, n) {
	return (r, i) => {
		let { deletion: a, insertion: o } = X(r.schema), s = r.tr;
		return t === void 0 && n === void 0 && zi(s, o, e), Bi(r.doc, s, a, o, e, t, n), Hi(s.doc, s, -1, e, t, n), s.steps.length ? (s.setMeta(Q, { skip: !0 }), i?.(s), !0) : !1;
	};
}
function Xi(e) {
	return (t, n) => {
		let { deletion: r, insertion: i, modification: a } = X(t.schema), o = null, s = null;
		return t.doc.descendants((t, n) => !t.marks.find((t) => (t.type === i || t.type === r || t.type === a) && Y(J(t), e)) || (o === null && (o = n), s = n + t.nodeSize, !1)), o === null || s === null ? !1 : (n && n(t.tr.setSelection(q.create(t.doc, o, s)).scrollIntoView()), !0);
	};
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/rebasePos.ts
function $(e, t, n) {
	let r = t.slice().reverse().reduce((e, t) => t.getMap().invert().map(e), e);
	return n.reduce((e, t) => t.getMap().map(e), r);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/replaceStep.ts
function Zi(e, t, n, r, i, a) {
	let { deletion: o, insertion: s } = X(t.schema), c = n.resolve(r.from).nodeBefore, l = Z(c?.marks ?? [], o) ?? Z(c?.marks ?? [], s) ?? null, u = n.resolve(r.to).nodeAfter, d = Z(u?.marks ?? [], o) ?? Z(u?.marks ?? [], s) ?? null, f = J(l) ?? J(d), p = f && Y(f, a) ? f : a, m = [], h = $(r.from, i, e.steps), g = $(r.to, i, e.steps);
	t.selection.empty && h !== g && e.setSelection(q.near(e.doc.resolve(h)));
	let _ = (e) => e.marks.some((e) => e.type === s && J(e)?.user === a.user);
	e.doc.nodesBetween(h, g, (e, t) => !_(e) || (m.push({
		from: Math.max(t, h),
		to: Math.min(t + e.nodeSize, r.to)
	}), !1)), m.reverse();
	for (let t of m) e.delete(t.from, t.to);
	if (h = $(r.from, i, e.steps), g = $(r.to, i, e.steps), h !== g) {
		let t = e.doc.resolve(h), n = e.doc.resolve(g);
		!t.nodeAfter && !Z(t.nodeBefore?.marks ?? [], o) && (e.insertText("​", h), g++, n = e.doc.resolve(g)), !n.nodeBefore && !Z(n.nodeAfter?.marks ?? [], o) && (e.insertText("​", g), g++, n = e.doc.resolve(g)), t.nodeBefore?.text?.endsWith("​") && !n.nodeAfter?.text?.startsWith("​") && (e.delete(h - 1, h), h--, g--, t = e.doc.resolve(h), n = e.doc.resolve(g)), n.nodeAfter?.text?.startsWith("​") && !t.nodeBefore?.text?.endsWith("​") && e.delete(g, g + 1), t.nodeBefore && g - h === 1 && e.doc.textBetween(h, g) === "​" && (e.delete(h, g), h--, g--, t = e.doc.resolve(h), n = e.doc.resolve(g), e.setSelection(q.near(t)));
	}
	let v = e.doc.resolve(h).blockRange(e.doc.resolve(g));
	if (!v || v.start !== h || v.end !== g ? e.addMark(h, g, o.create({ ...p })) : e.doc.nodesBetween(v.start, v.end, (t, n) => n < v.start || (e.addNodeMark(n, o.create({ ...p })), !1)), r.slice.content.size) {
		let t = e.doc.resolve(g), n = Ni(t, o);
		e.replace(n, n, r.slice);
		let i = e.steps[e.steps.length - 1].getMap().map(n);
		e.doc.nodesBetween(n, i, (t, r) => {
			let a = e.doc.resolve(r);
			for (let e = a.depth; e >= 0; e--) if (Z(a.node(e).marks, s, p)) return;
			if (r < n || r + t.nodeSize > i || t.isInline) {
				e.addMark(Math.max(r, n), Math.min(r + t.nodeSize, i), s.create({ ...p }));
				return;
			}
			e.addNodeMark(r, s.create({ ...p }));
		});
		let a = e.doc.resolve(n), c = e.doc.resolve(i);
		a.nodeAfter || (e.insertText("​", n), e.addMark(n, n + 1, s.create({ ...p })), i++, c = e.doc.resolve(i)), c.nodeBefore || (e.insertText("​", i), e.addMark(i, i + 1, s.create({ ...p })), i++, c = e.doc.resolve(i)), n !== t.pos && e.setSelection(q.near(e.doc.resolve(n + r.slice.size)));
	}
	return Y(p, a);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/addMarkStep.ts
function Qi(e, t, n, r, i, a) {
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = Gi(o, r.from, r.to), c = sr(n, r.from, r.to, s);
	return c ? Zi(e, t, n, c, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/addNodeMarkStep.ts
function $i(e, t, n, r, i, a) {
	let { modification: o } = X(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter?.marks ?? [];
	c.filter((e) => e.type === o && e.attrs.type === "mark" && r.mark.type.excludes(t.schema.markFromJSON(e.attrs.newValue).type)).forEach((e) => {
		c = e.removeFromSet(c);
	});
	let l = r.mark.addToSet(c), u = null;
	for (let e of c) if (!l.some((t) => t.eq(e))) {
		u = e;
		break;
	}
	return l = o.create({
		...a,
		type: "mark",
		previousValue: u?.toJSON() ?? null,
		newValue: r.mark.toJSON()
	}).addToSet(l), e.setNodeMarkup(s, null, null, l), !0;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/attrStep.ts
function ea(e, t, n, r, i, a) {
	let { modification: o } = X(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter, l = c?.marks ?? [], u = l.find((e) => e.type === o && e.attrs.type === "attr" && e.attrs.attrName === r.attr);
	return u && (l = u.removeFromSet(l)), l = o.create({
		...a,
		type: "attr",
		attrName: r.attr,
		previousValue: c?.attrs[r.attr] ?? null,
		newValue: r.value
	}).addToSet(l), e.setNodeMarkup(s, null, {
		...c?.attrs,
		[r.attr]: r.value
	}, l), !0;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/removeMarkStep.ts
function ta(e, t, n, r, i, a) {
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = Gi(o, r.from, r.to), c = sr(n, r.from, r.to, s);
	return c ? Zi(e, t, n, c, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/removeNodeMarkStep.ts
function na(e, t, n, r, i, a) {
	let { modification: o } = X(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter?.marks ?? [], l = c.find((e) => e.type === o && e.attrs.type === "mark" && e.attrs.newValue && r.mark.eq(t.schema.markFromJSON(e.attrs.newValue)));
	return l ? (e.removeNodeMark(s, l), e.removeNodeMark(s, t.schema.markFromJSON(l.attrs.newValue)), !1) : (c = r.mark.removeFromSet(c), c = o.create({
		...a,
		type: "mark",
		previousValue: r.mark.toJSON(),
		newValue: null
	}).addToSet(c), e.setNodeMarkup(s, null, null, c), !0);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/replaceAroundStep.ts
function ra(e, t, n, r, i, a) {
	let o = r.structure;
	if (r.insert === 1 && r.slice.size === 2 && r.gapTo === r.to - 1 && r.gapFrom === r.from + 1 && o) {
		let { modification: o } = X(t.schema), s = r.slice.content.firstChild, c = $(r.from, i, e.steps), l = e.doc.resolve(c).nodeAfter;
		if (!s || !l) throw Error("Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode / newNode is null");
		if (s.marks.filter((e) => !l?.marks.some((t) => t.eq(e))).forEach((s) => {
			s.type !== o && $i(e, t, n, new er(r.from, s), i, a);
		}), c = $(r.from, i, e.steps), l = e.doc.resolve(c).nodeAfter, !l) throw Error("Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode is null");
		if (l.marks.filter((e) => !s.marks.some((t) => t.eq(e))).forEach((s) => {
			s.type !== o && na(e, t, n, new rr(r.from, s), i, a);
		}), s.type.name !== l.type.name) {
			let t = $(r.from, i, e.steps), n = e.doc.resolve(t).nodeAfter;
			if (!n) throw Error("Failed to apply modifications to node: no node found");
			let c = n.marks, l = c.find((e) => e.type === o && e.attrs.type === "nodeType");
			l && (c = l.removeFromSet(c)), c = o.create({
				...a,
				type: "nodeType",
				previousValue: n.type.name,
				newValue: s.type.name
			}).addToSet(c), e.setNodeMarkup(t, s.type, null, c);
		}
		let u = /* @__PURE__ */ new Set([...Object.keys(s.attrs), ...Object.keys(l.attrs)]);
		for (let o of u) s.attrs[o] !== l.attrs[o] && ea(e, t, n, new tr(r.from, o, s.attrs[o]), i, a);
		return !0;
	}
	return !1;
}
function ia(e, t, n, r, i, a) {
	if (ra(e, t, n, r, i, a)) return !0;
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = r.getMap().map(r.from, -1), c = r.getMap().map(r.to, 1), l = o.resolve(s).blockRange(o.resolve(c));
	if (!l) return !1;
	let u = sr(n, r.getMap().invert().map(l.start), r.getMap().invert().map(l.end), Gi(o, l.start, l.end));
	return u ? Zi(e, t, n, u, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/withSuggestChanges.ts
function aa(e) {
	return e instanceof ar ? Zi : e instanceof ir ? ia : e instanceof $n ? Qi : e instanceof nr ? ta : e instanceof er ? $i : e instanceof rr ? na : e instanceof tr ? ea : (e, t, n, r, i) => {
		let a = i.slice().reverse().reduce((e, t) => e?.map(t.getMap().invert()) ?? null, r), o = e.steps.reduce((e, t) => e?.map(t.getMap()) ?? null, a);
		return o && e.step(o), !1;
	};
}
function oa(e, t, n) {
	X(t.schema);
	let r = n(t.schema, e.docs[0]), i = t.tr;
	for (let a = 0; a < e.steps.length; a++) {
		let o = e.steps[a], s = e.docs[a];
		aa(o)(i, t, s, o, e.steps.slice(0, a), r) && a < e.steps.length - 1 && (r = n(t.schema, i.doc));
	}
	if (e.selectionSet && !i.selectionSet) {
		let t = e.docs[0], n = t ? e.selection.map(t, e.mapping.invert()) : e.selection;
		i.setSelection(n.map(i.doc, i.mapping));
	}
	return e.scrolledIntoView && i.scrollIntoView(), e.storedMarksSet && i.setStoredMarks(e.storedMarks), i.meta = e.meta, i;
}
function sa(e) {
	let t = e.getMeta("y-sync$") ?? {};
	return !!e.getMeta("history$") || !!e.getMeta("collab$") || !!t.isUndoRedoOperation || !!t.isChangeOrigin || "skip" in (e.getMeta(Q) ?? {});
}
//#endregion
//#region src/components/doc-editor/suggestions/marks.ts
var ca = {
	user: {
		isRequired: !0,
		validate: ji,
		parseHTML: (e) => e.getAttribute("data-suggestion-user"),
		renderHTML: (e) => ({ "data-suggestion-user": e.user })
	},
	username: {
		isRequired: !0,
		validate: ji,
		parseHTML: (e) => e.getAttribute("data-suggestion-username"),
		renderHTML: (e) => ({ "data-suggestion-username": e.username })
	},
	date: {
		isRequired: !0,
		validate: Mi,
		parseHTML: (e) => {
			let t = e.getAttribute("data-suggestion-date");
			return t === null ? null : Number(t);
		},
		renderHTML: (e) => ({ "data-suggestion-date": String(e.date) })
	}
};
function la(e) {
	return e.hasAttribute("data-suggestion-user") && e.hasAttribute("data-suggestion-username") && e.hasAttribute("data-suggestion-date");
}
var ua = "", da = !1, fa = Kn.create({
	name: wi,
	inclusive: da,
	excludes: ua,
	addAttributes() {
		return { ...ca };
	},
	parseHTML() {
		return [{
			tag: "ins[data-suggestion-user]",
			priority: 60,
			getAttrs: (e) => la(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ins",
			qn(e, { class: "suggestion suggestion--insert" }),
			0
		];
	}
}), pa = Kn.create({
	name: Ti,
	inclusive: da,
	excludes: ua,
	addAttributes() {
		return { ...ca };
	},
	parseHTML() {
		return [{
			tag: "del[data-suggestion-user]",
			priority: 60,
			getAttrs: (e) => la(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"del",
			qn(e, { class: "suggestion suggestion--delete" }),
			0
		];
	}
}), ma = Kn.create({
	name: Ei,
	inclusive: da,
	excludes: ua,
	addAttributes() {
		return {
			...ca,
			type: {
				isRequired: !0,
				validate: "string",
				parseHTML: (e) => e.getAttribute("data-suggestion-modify-type"),
				renderHTML: (e) => ({ "data-suggestion-modify-type": e.type })
			},
			attrName: {
				default: null,
				validate: "string|null",
				parseHTML: (e) => e.getAttribute("data-suggestion-attr-name"),
				renderHTML: (e) => e.attrName == null ? {} : { "data-suggestion-attr-name": e.attrName }
			},
			previousValue: {
				default: null,
				parseHTML: (e) => {
					let t = e.getAttribute("data-suggestion-prev");
					return t === null ? null : JSON.parse(t);
				},
				renderHTML: (e) => e.previousValue === void 0 ? {} : { "data-suggestion-prev": JSON.stringify(e.previousValue ?? null) }
			},
			newValue: {
				default: null,
				parseHTML: (e) => {
					let t = e.getAttribute("data-suggestion-next");
					return t === null ? null : JSON.parse(t);
				},
				renderHTML: (e) => e.newValue === void 0 ? {} : { "data-suggestion-next": JSON.stringify(e.newValue ?? null) }
			}
		};
	},
	parseHTML() {
		return [{
			tag: "span[data-suggestion-modify-type]",
			priority: 60,
			getAttrs: (e) => la(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			qn(e, { class: "suggestion suggestion--modify" }),
			0
		];
	}
}), ha = [
	fa,
	pa,
	ma
], ga = Gn.create({
	name: "suggestChanges",
	addOptions() {
		return {
			user: {
				id: "anonymous",
				name: "Anonymous"
			},
			enabled: !1,
			now: () => Date.now()
		};
	},
	addStorage() {
		return {
			unregister: void 0,
			authorOverride: void 0
		};
	},
	addExtensions() {
		return [...ha];
	},
	addProseMirrorPlugins() {
		return [Li(this.options.enabled)];
	},
	onCreate() {
		let e = this.options.register?.(this.editor);
		typeof e == "function" && (this.storage.unregister = e);
	},
	onDestroy() {
		let e = this.storage.unregister;
		e && (e(), this.storage.unregister = void 0);
	},
	dispatchTransaction({ transaction: e, next: t }) {
		let n = this.editor.state;
		if (!Ri(n) || sa(e)) {
			t(e);
			return;
		}
		let { user: r, now: i } = this.options, a = this.storage.authorOverride ?? r;
		t(oa(e, n, () => ki(a.id, a.name, i())));
	},
	addCommands() {
		return {
			setSuggestionMode: (e) => ({ state: t, dispatch: n }) => Q.getState(t) ? (n?.(t.tr.setMeta(Q, {
				skip: !0,
				enabled: e
			})), !0) : !1,
			toggleSuggestionMode: () => ({ state: e, dispatch: t }) => {
				let n = Q.getState(e);
				return n ? (t?.(e.tr.setMeta(Q, {
					skip: !0,
					enabled: !n.enabled
				})), !0) : !1;
			},
			acceptSuggestion: (e) => ({ state: t, dispatch: n }) => qi(e)(t, n),
			rejectSuggestion: (e) => ({ state: t, dispatch: n }) => Yi(e)(t, n),
			acceptAllSuggestions: () => ({ state: e, dispatch: t }) => Ki(e, t),
			rejectAllSuggestions: () => ({ state: e, dispatch: t }) => Ji(e, t),
			selectSuggestion: (e) => ({ state: t, dispatch: n }) => Xi(e)(t, n)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-e": () => this.editor.commands.toggleSuggestionMode() };
	}
});
function _a(e, t, n) {
	let r = e.storage.suggestChanges;
	if (!r) throw Error("authorSuggestionsAs: the SuggestChanges extension is not on this editor");
	let i = r.authorOverride, a = Ri(e.state);
	r.authorOverride = t, a || e.commands.setSuggestionMode(!0);
	try {
		n();
	} finally {
		a || e.commands.setSuggestionMode(!1), r.authorOverride = i;
	}
}
function va(e, t = "AI proposal") {
	return {
		id: `ai:${e}`,
		name: t
	};
}
//#endregion
//#region src/components/doc-editor/suggestions/listSuggestions.ts
function ya(e) {
	return e.split("​").join("");
}
function ba(e) {
	let t = e.inserted.length > 0, n = e.deleted.length > 0;
	return t && n ? "replace" : t ? "insert" : n ? "delete" : "modify";
}
function xa(e) {
	let { insertion: t, deletion: n, modification: r } = X(e.type.schema), i = /* @__PURE__ */ new Map(), a = [];
	return e.descendants((o, s) => {
		let c = o.isText ? e.resolve(s).before(e.resolve(s).depth) : s;
		for (let e of o.marks) {
			if (e.type !== t && e.type !== n && e.type !== r) continue;
			let l = J(e);
			if (!l) continue;
			let u = Ai(l), d = i.get(u);
			d || (d = {
				id: l,
				from: s,
				to: s + o.nodeSize,
				inserted: [],
				insertedBlocks: [],
				lastBlockPos: null,
				deleted: [],
				modified: !1
			}, i.set(u, d), a.push(u)), d.from = Math.min(d.from, s), d.to = Math.max(d.to, s + o.nodeSize), l.username && (d.id = {
				...d.id,
				username: l.username
			});
			let f = o.isText ? o.text ?? "" : "";
			e.type === t ? (d.inserted.push(f), d.lastBlockPos === c && d.insertedBlocks.length > 0 ? d.insertedBlocks[d.insertedBlocks.length - 1] += f : (d.insertedBlocks.push(f), d.lastBlockPos = c)) : e.type === n ? d.deleted.push(f) : d.modified = !0;
		}
		return !0;
	}), a.map((e) => {
		let t = i.get(e);
		return {
			id: t.id,
			key: e,
			kind: ba(t),
			from: t.from,
			to: t.to,
			insertedText: ya(t.inserted.join("")),
			insertedBlocks: t.insertedBlocks.map(ya).filter((e) => e.length > 0),
			deletedText: ya(t.deleted.join(""))
		};
	});
}
//#endregion
//#region src/components/doc-editor/suggestions/suggestionAuthor.ts
var Sa = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function Ca({ person: e, model: t }) {
	let n = e.trim(), r = t?.trim();
	return n ? r ? `${n} (powered by ${r})` : n : r ?? "";
}
function wa(e) {
	let t = (e ?? "").trim();
	if (!t) return { person: "" };
	let n = Sa.exec(t);
	if (!n) return { person: t };
	let r = n[1].trim(), i = n[2].trim();
	return !r || !i ? { person: t } : {
		person: r,
		model: i
	};
}
function Ta(e) {
	return Ca(wa(e.username));
}
//#endregion
//#region src/components/doc-editor/suggestions/viewModes.ts
var Ea = [
	{
		value: "all-markup",
		label: "All markup"
	},
	{
		value: "simple-markup",
		label: "Simple markup"
	},
	{
		value: "final",
		label: "Final"
	},
	{
		value: "original",
		label: "Original"
	}
];
function Da(e) {
	return Ui(e);
}
function Oa(e) {
	return Wi(e);
}
function ka(e, t) {
	switch (t) {
		case "final": return Da(e);
		case "original": return Oa(e);
		case "all-markup":
		case "simple-markup": return e;
	}
}
function Aa(e, t) {
	return Jn.create({
		schema: e.schema,
		doc: ka(e.doc, t)
	});
}
function ja(e) {
	return `suggestion-view-${e}`;
}
//#endregion
//#region src/components/doc-editor/SuggestionReviewList.tsx
function Ma({ count: e, children: t, onAcceptAll: s, onRejectAll: c, acceptLabel: l = "Accept all", selectedCount: u, error: d = null, headerExtra: f, emptyTitle: p = "No suggestions", emptyBody: m = "Proposed changes to this document show up here for review.", title: h = "Suggestions", variant: g = "card", className: v, "data-testid": y = "suggestion-review-list" }) {
	let b = e > 0 && (s || c), x = b || f ? /* @__PURE__ */ K("span", {
		className: "flex items-center gap-1.5",
		children: [
			f,
			b && c && /* @__PURE__ */ G(r, {
				variant: "ghost",
				size: "sm",
				onClick: c,
				"data-testid": `${y}-reject-all`,
				children: "Reject all"
			}),
			b && s && /* @__PURE__ */ G(r, {
				variant: "secondary",
				size: "sm",
				onClick: s,
				disabled: u === 0,
				"data-testid": `${y}-accept-all`,
				children: u === void 0 ? l : `${l} (${u})`
			})
		]
	}) : void 0, C = /* @__PURE__ */ K(W, { children: [d && /* @__PURE__ */ G("div", {
		className: n("pt-2", g === "card" && "px-3"),
		children: /* @__PURE__ */ G(_, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${y}-error`,
			children: d
		})
	}), e === 0 ? /* @__PURE__ */ G(i, {
		density: "compact",
		children: /* @__PURE__ */ G(S, {
			title: p,
			body: m,
			testId: `${y}-empty`
		})
	}) : /* @__PURE__ */ G("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${y}-list`,
		children: t
	})] });
	return g === "pane" ? /* @__PURE__ */ K("div", {
		className: n("flex min-h-0 flex-1 flex-col", v),
		"data-testid": y,
		"data-variant": "pane",
		children: [/* @__PURE__ */ K("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ G("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${y}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), x]
		}), /* @__PURE__ */ G("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: C
		})]
	}) : /* @__PURE__ */ K(a, {
		padding: "none",
		className: n("overflow-hidden", v),
		"data-testid": y,
		children: [/* @__PURE__ */ G(O, {
			title: h,
			meta: /* @__PURE__ */ G(o, {
				tone: "neutral",
				size: "xs",
				mono: !0,
				children: String(e)
			}),
			action: x
		}), C]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Na({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = U(""), [s, c] = U(!1), [l, u] = U(null), d = H(!1);
	async function p(e) {
		if (!d.current) {
			d.current = !0, c(!0), u(null);
			try {
				await e(), a("");
			} catch (e) {
				u(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				d.current = !1, c(!1);
			}
		}
	}
	let h = e.reviewerName || e.reviewerId, g = e.state.replace(/_/g, " "), _ = g.charAt(0).toUpperCase() + g.slice(1);
	return /* @__PURE__ */ G(R, {
		"aria-label": `Review by ${h}`,
		"aria-busy": s,
		children: /* @__PURE__ */ K(m, {
			gap: "sm",
			children: [
				/* @__PURE__ */ K(f, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ G("strong", { children: h }),
						/* @__PURE__ */ G(o, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: _
						}),
						e.required && /* @__PURE__ */ G(o, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ G(A, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ G("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ G("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				l && /* @__PURE__ */ G(D, {
					tone: "error",
					children: l
				}),
				t && e.state === "pending" && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(E, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: s,
					"aria-label": `Review comment for ${h}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ K(f, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ G(r, {
						size: "sm",
						variant: "secondary",
						disabled: s,
						onClick: () => void p(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ G(r, {
						size: "sm",
						variant: "primary",
						disabled: s,
						onClick: () => void p(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ G(r, {
					size: "sm",
					variant: "ghost",
					disabled: s,
					onClick: () => void p(() => n(e.requestKey)),
					children: "Withdraw review"
				})
			]
		})
	});
}
function Pa({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: s, onDecide: c, onWithdraw: l }) {
	let [u, d] = U(""), [p, h] = U(""), [g, _] = U(!0), [v, y] = U(!1), [x, S] = U(null), C = H(!1);
	async function w() {
		if (!(!s || !t.some((e) => e.id === u) || C.current)) {
			C.current = !0, y(!0), S(null);
			try {
				await s({
					reviewerId: u,
					note: p.trim(),
					required: g
				}), h(""), d("");
			} catch (e) {
				S(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				C.current = !1, y(!1);
			}
		}
	}
	return /* @__PURE__ */ K(m, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ G(D, {
				tone: "error",
				children: a
			}),
			s && /* @__PURE__ */ K(m, {
				gap: "sm",
				children: [
					/* @__PURE__ */ G(b, {
						"aria-label": "Reviewer",
						placeholder: "Choose a reviewer",
						value: u,
						disabled: v || i,
						options: t.map((e) => ({
							value: e.id,
							label: e.displayName
						})),
						onChange: (e) => d(e.target.value)
					}),
					/* @__PURE__ */ G(E, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: p,
						disabled: v,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ K(f, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ G(j, {
							checked: g,
							onChange: _,
							disabled: v
						}), "Required review"]
					}),
					x && /* @__PURE__ */ G(D, {
						tone: "error",
						children: x
					}),
					/* @__PURE__ */ G(r, {
						size: "sm",
						disabled: v || i || !t.some((e) => e.id === u),
						onClick: () => void w(),
						children: v ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ G(Be, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ G(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: o,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ G(Na, {
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
var Fa = [
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
function Ia({ filled: e }) {
	return /* @__PURE__ */ G("svg", {
		width: 16,
		height: 16,
		viewBox: "0 0 16 16",
		fill: e ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: 1.4,
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", { d: "M8 1.9l1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.3l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.9Z" })
	});
}
function La({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: a, starred: c = !1, onStarredChange: l, statusPill: d, path: f, crumbsTrailing: m, subtitle: h, metaBar: _, participants: v, onParticipantClick: y, onFollowParticipant: b, followingParticipantId: x, meta: S, saveState: C, headActions: w, tabs: T, activeTab: E, onTabChange: ee, toolbar: te, children: D, footer: O, proposal: re, surface: A = "workspace", explorer: j, workbench: M, label: ae = "Editor", variant: oe = "document", itemType: N, itemKey: se, titleSize: P = "md", titleAs: ce = "h1", titleOverflow: le = "truncate", tabsTrailing: ue, headerInset: F = "editor", className: I, "data-testid": L = "editor-shell" }) {
	let R = oe === "work-item", de = R && (N || se) ? /* @__PURE__ */ K(W, { children: [N && /* @__PURE__ */ G(o, {
		size: "sm",
		tone: "info",
		"data-testid": `${L}-item-type`,
		children: N
	}), se && /* @__PURE__ */ G("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${L}-item-key`,
		children: se
	})] }) : null, fe = de || m != null ? /* @__PURE__ */ K(W, { children: [de, m] }) : null, pe = R && (e && e.length > 0 || fe != null), me = P === "lg" ? "text-[26px] font-semibold leading-8" : P === "sm" ? "text-sm font-semibold leading-5" : R ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", he = `${L}-${Bn().replace(/:/g, "")}`, ge = !!T && T.length > 0, _e = ge ? T.some((e) => e.id === E) ? E : T[0].id : void 0, ve = v && v.length > 0 || S != null || !!C, ye = (e) => /* @__PURE__ */ G(p, {
		items: T.map((e) => ({
			id: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {},
			...e.count ? { badge: R ? /* @__PURE__ */ G("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}) : /* @__PURE__ */ G(g, {
				variant: "count",
				value: e.count,
				color: "muted",
				"aria-label": `${e.count} in ${e.label}`
			}) } : {},
			testId: `${L}-tab-${e.id}`
		})),
		value: _e,
		onValueChange: (e) => ee?.(e),
		variant: "underline",
		...R ? { badgeStyle: "plain" } : {},
		size: "md",
		itemClassName: "px-3.5 pb-1.5 pt-1 leading-5",
		"aria-label": `${t} sections`,
		idPrefix: he,
		className: e
	}), be = /* @__PURE__ */ K("section", {
		"data-ui-part": "",
		"aria-label": ae,
		"data-testid": L,
		"data-surface": A,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ K("header", {
				className: n("flex flex-col gap-1 border-b border-border pt-3", F === "page" ? "px-6" : "px-5"),
				"data-variant": oe,
				"data-header-inset": F,
				"data-testid": `${L}-header`,
				children: [
					pe && /* @__PURE__ */ K("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${L}-crumbs-row`,
						children: [
							/* @__PURE__ */ G(u, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ G(ne, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								size: "sm",
								className: "min-w-0",
								"data-testid": `${L}-crumbs`
							}),
							e && e.length > 0 && fe != null && /* @__PURE__ */ G("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							fe != null && /* @__PURE__ */ G("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${L}-crumbs-trailing`,
								children: fe
							}),
							/* @__PURE__ */ G("span", { className: "flex-1" }),
							w && /* @__PURE__ */ G("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${L}-actions`,
								children: w
							})
						]
					}),
					!R && e && e.length > 0 && !m && /* @__PURE__ */ G(ne, {
						items: e,
						maxItems: 4,
						size: "sm",
						className: "[@media(max-height:640px)]:hidden",
						"data-testid": `${L}-crumbs`
					}),
					!R && m && /* @__PURE__ */ K("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${L}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ G(ne, {
							items: e,
							maxItems: 4,
							size: "sm",
							className: "min-w-0",
							"data-testid": `${L}-crumbs`
						}), /* @__PURE__ */ G("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${L}-crumbs-trailing`,
							children: m
						})]
					}),
					/* @__PURE__ */ K("div", {
						className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
						"data-testid": `${L}-head-row`,
						children: [
							a && !R && /* @__PURE__ */ G(ie, {
								kind: a,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${L}-kind`
							}),
							/* @__PURE__ */ K("div", {
								className: "flex min-w-0 flex-[1_1_18rem] flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ K("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ K("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${L}-title-group`,
												children: [r ? /* @__PURE__ */ G(Xe, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", me, R && "relative -left-[5px]"),
													"data-testid": `${L}-title`
												}) : /* @__PURE__ */ G(ce, {
													className: n("m-0 min-w-0 max-w-full flex-initial text-text-primary", me, le === "wrap" ? "whitespace-normal break-words" : "truncate"),
													"data-testid": `${L}-title`,
													"data-title-size": P,
													children: t
												}), l && /* @__PURE__ */ G(s, {
													size: "sm",
													"aria-label": c ? "Remove star" : "Star this file",
													"aria-pressed": c,
													title: c ? "Starred" : "Star",
													onClick: () => l(!c),
													className: c ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${L}-star`,
													children: /* @__PURE__ */ G(Ia, { filled: c })
												})]
											}),
											d,
											f && f.length > 0 && /* @__PURE__ */ G("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${L}-path`,
												children: /* @__PURE__ */ G(ne, {
													items: f,
													"aria-label": "Document location",
													maxItems: 4,
													lastIsCurrent: !1,
													size: "sm",
													className: "min-w-0",
													"data-testid": `${L}-path-crumbs`
												})
											})
										]
									}),
									h != null && /* @__PURE__ */ G("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${L}-subtitle`,
										children: h
									}),
									ve && /* @__PURE__ */ K("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${L}-byline`,
										children: [
											v && v.length > 0 && /* @__PURE__ */ G(k, {
												users: v,
												size: 22,
												maxVisible: 4,
												...y ? { onUserClick: y } : {},
												...b ? {
													onFollowUser: b,
													followingUserId: x ?? null
												} : {}
											}),
											S != null && /* @__PURE__ */ G("span", {
												className: "min-w-0 truncate",
												children: S
											}),
											/* @__PURE__ */ G(Et, {
												state: C,
												className: "text-xs"
											})
										]
									})
								]
							}),
							w && !pe && /* @__PURE__ */ G("div", {
								className: "ml-auto flex shrink-0 flex-wrap items-center gap-3",
								"data-testid": `${L}-actions`,
								children: w
							})
						]
					}),
					_ != null && /* @__PURE__ */ G("div", {
						className: n("flex min-w-0 items-center", R ? P === "lg" ? "pb-2 pt-1" : "pb-2 pt-3" : "py-2"),
						"data-testid": `${L}-meta-bar`,
						children: _
					}),
					ue == null ? ge ? ye("-mb-px -ml-3 mt-1 border-b-0") : /* @__PURE__ */ G("span", {
						className: "h-2",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ K("div", {
						className: "-mb-px mt-1 flex min-w-0 items-end gap-3",
						"data-testid": `${L}-tabs-row`,
						children: [ge ? ye("-ml-3 min-w-0 flex-1 border-b-0") : /* @__PURE__ */ G("span", {
							className: "flex-1",
							"aria-hidden": "true"
						}), /* @__PURE__ */ G("div", {
							className: "flex shrink-0 items-center gap-2 pb-1.5",
							"data-testid": `${L}-tabs-trailing`,
							children: ue
						})]
					})
				]
			}),
			te && /* @__PURE__ */ G("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${L}-toolbar`,
				children: te
			}),
			/* @__PURE__ */ K("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", A === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${L}-surface`,
				children: [
					/* @__PURE__ */ G("div", {
						...ge ? {
							role: "tabpanel",
							id: `${he}-panel-${_e}`,
							"aria-labelledby": `${he}-tab-${_e}`
						} : {},
						className: n("flex-1 overflow-auto", re != null || O != null ? "min-h-28" : "min-h-0"),
						"data-testid": `${L}-scroller`,
						children: D
					}),
					re != null && /* @__PURE__ */ G("div", {
						className: "relative z-20 max-h-[40%] min-h-16 shrink overflow-auto px-[var(--dock-inset,1rem)] pb-1 pt-2",
						"data-testid": `${L}-proposal`,
						children: re
					}),
					O != null && /* @__PURE__ */ G("div", {
						className: "relative z-20 flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
						"data-testid": `${L}-dock`,
						children: /* @__PURE__ */ G(_t.Provider, {
							value: "pinned",
							children: O
						})
					})
				]
			})
		]
	});
	return !j && !M ? /* @__PURE__ */ G("div", {
		className: n("flex h-full min-h-0 flex-col", I),
		children: be
	}) : /* @__PURE__ */ K("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", I),
		"data-testid": `${L}-frame`,
		children: [j && /* @__PURE__ */ G("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${L}-explorer`,
			children: j
		}), /* @__PURE__ */ K("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [be, M && /* @__PURE__ */ G("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${L}-workbench`,
				children: M
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/DeckPresentationDialog.tsx
var Ra = () => {};
function za({ title: e, slides: t, open: n, slideIndex: i, onSlideChange: a, onClose: o, loading: s = !1, error: c, onRetry: l, onFocusConversation: u, testId: d = "deck-presentation" }) {
	let p = Ln(), m = u ?? (p.present ? () => {
		p.request({ mode: "agent" });
	} : void 0);
	return /* @__PURE__ */ K(v, {
		open: n,
		onClose: o,
		ariaLabel: `Present ${e}`,
		maxWidth: 1280,
		cardClassName: "flex h-[min(90vh,960px)] flex-col p-4",
		children: [/* @__PURE__ */ K(f, {
			gap: "sm",
			align: "center",
			className: "justify-between",
			children: [/* @__PURE__ */ G(h, {
				size: "sm",
				weight: "semibold",
				children: "Presenting"
			}), /* @__PURE__ */ K(f, {
				gap: "xs",
				align: "center",
				children: [m && /* @__PURE__ */ G(r, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						o(), requestAnimationFrame(() => m?.());
					},
					children: "Chat & agent"
				}), /* @__PURE__ */ G(r, {
					size: "sm",
					variant: "secondary",
					onClick: o,
					children: "Exit presentation"
				})]
			})]
		}), c ? /* @__PURE__ */ G("div", {
			className: "flex min-h-0 flex-1 items-center justify-center",
			"data-testid": `${d}-error`,
			children: /* @__PURE__ */ G(C, {
				title: "Couldn't prepare the presentation",
				description: c,
				...l ? {
					actionLabel: "Retry preview",
					onAction: l
				} : {}
			})
		}) : s ? /* @__PURE__ */ G("div", {
			className: "flex min-h-0 flex-1 items-center justify-center",
			"data-testid": `${d}-loading`,
			children: /* @__PURE__ */ G(w, { label: "Preparing your current slides…" })
		}) : /* @__PURE__ */ G(Se, {
			title: e,
			revisions: [{
				id: "current",
				label: "Current",
				slides: t.map((e, t) => {
					let n = be(e.svg), r = e.title || `Slide ${t + 1}`;
					return {
						id: e.id,
						index: t + 1,
						title: r,
						...n ? { preview: /* @__PURE__ */ G("img", {
							src: n,
							alt: r,
							className: "h-full w-full object-contain"
						}) } : {}
					};
				})
			}],
			revisionId: "current",
			onRevisionChange: Ra,
			slideIndex: i + 1,
			onSlideChange: (e) => a(e - 1),
			autoFocus: !0,
			className: "min-h-0 flex-1",
			"data-testid": d
		})]
	});
}
//#endregion
//#region src/components/doc-editor/presentation/DeckReader.tsx
var Ba = [
	{
		value: "fit",
		label: "Fit"
	},
	{
		value: "75",
		label: "75%"
	},
	{
		value: "100",
		label: "100%"
	},
	{
		value: "125",
		label: "125%"
	}
], Va = () => {};
function Ha({ spec: e, compactReview: t = !1, fileActions: i, preview: a, previewCurrent: o = !0, onRequestPreview: s, slideViewers: c, selectSlideRequest: l, onSelectedSlideChange: u, onNavigateSlide: d, renderFrame: p, footer: m, onFocusConversation: g, "data-testid": _ = "deck-reader" }) {
	let [v, y] = U(e.slides[0]?.id ?? ""), [x, C] = U(!1), [ee, te] = U(null), D = ee ?? !t, [O, ne] = U("fit"), [k, re] = U(!1), A = H(null), [j, ie] = U({
		width: 800,
		height: 420
	}), M = Bn(), ae = H(s);
	ae.current = s;
	let oe = H(u);
	oe.current = u;
	let N = Ne(e), se = Ln(), P = g ?? (se.present ? () => {
		se.request({ mode: "agent" });
	} : void 0);
	B(() => {
		N && ae.current(e);
	}, [e, N]);
	let ce = typeof a == "object" && "error" in a ? a.error : void 0, le = (!o || a === "loading") && !ce, ue = V(() => o && typeof a == "object" && "slides" in a ? a.slides : [], [a, o]), F = V(() => {
		let t = new Map(ue.map((e) => [e.id, e])), n = new Set(e.slides.map((e) => e.id));
		return [...e.slides.map((e) => ({
			id: e.id,
			title: e.title || "Untitled slide",
			slide: e,
			svg: t.get(e.id)?.svg,
			generated: !1
		})), ...ue.filter((e) => e.generated && !n.has(e.id)).map((e) => ({
			id: e.id,
			title: e.title || "Sources",
			svg: e.svg,
			generated: !0
		}))];
	}, [e.slides, ue]), I = Math.max(0, F.findIndex((e) => e.id === v)), L = F[I], R = (e) => {
		F.some((t) => t.id === e) && (y(e), d?.(e));
	};
	B(() => {
		L && oe.current?.(L.id);
	}, [L?.id]), B(() => {
		l && F.some((e) => e.id === l.slideId) && y(l.slideId);
	}, [l?.key, F]), B(() => {
		let e = A.current;
		if (!e || typeof ResizeObserver > "u") return;
		let t = new ResizeObserver((e) => {
			let { width: t, height: n } = e[0].contentRect;
			t > 0 && n > 0 && ie({
				width: t,
				height: n
			});
		});
		return t.observe(e), () => t.disconnect();
	}, []);
	let de = (e) => {
		let t = F[Math.min(F.length - 1, Math.max(0, e))];
		t && R(t.id);
	}, fe = (e) => {
		if (e.altKey || e.ctrlKey || e.metaKey || e.target.closest("input, textarea, select, [contenteditable=\"true\"]")) return;
		let t = e.key === "ArrowRight" || e.key === "PageDown" ? I + 1 : e.key === "ArrowLeft" || e.key === "PageUp" ? I - 1 : e.key === "Home" ? 0 : e.key === "End" ? F.length - 1 : null;
		t !== null && (e.preventDefault(), de(t));
	}, pe = O === "fit" ? Math.max(120, Math.min(1024, j.width, j.height * 16 / 9)) : 960 * Number(O) / 100, me = /* @__PURE__ */ K(f, {
		gap: "xs",
		align: "center",
		wrap: !0,
		className: "deck-reader-toolbar min-h-9 gap-1.5 text-xs max-[700px]:gap-1",
		role: "toolbar",
		"aria-label": "Presentation viewing tools",
		"data-testid": `${_}-toolbar`,
		children: [
			!t && /* @__PURE__ */ K(W, { children: [
				/* @__PURE__ */ G(r, {
					size: "sm",
					variant: x ? "secondary" : "primary",
					onClick: () => C(!1),
					"aria-pressed": !x,
					children: "Slides"
				}),
				/* @__PURE__ */ G(r, {
					size: "sm",
					variant: x ? "primary" : "secondary",
					onClick: () => C(!0),
					"aria-pressed": x,
					children: "Outline"
				}),
				/* @__PURE__ */ G("span", {
					className: "deck-reader-toolbar-divider mx-0.5 h-[18px] border-l border-border",
					"aria-hidden": "true"
				})
			] }),
			/* @__PURE__ */ G(r, {
				size: "sm",
				variant: "ghost",
				"aria-label": "Previous slide",
				disabled: I === 0,
				onClick: () => de(I - 1),
				children: "←"
			}),
			/* @__PURE__ */ K(h, {
				size: "xs",
				tabular: !0,
				className: "deck-reader-position whitespace-nowrap",
				"data-testid": `${_}-position`,
				children: [
					"Slide ",
					L ? I + 1 : 0,
					" of ",
					F.length
				]
			}),
			/* @__PURE__ */ G(r, {
				size: "sm",
				variant: "ghost",
				"aria-label": "Next slide",
				disabled: I >= F.length - 1,
				onClick: () => de(I + 1),
				children: "→"
			}),
			!t && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(b, {
				size: "sm",
				"aria-label": "Slide zoom",
				value: O,
				onChange: (e) => ne(e.target.value),
				options: Ba,
				className: "deck-reader-zoom w-auto"
			}), /* @__PURE__ */ G(r, {
				size: "sm",
				variant: "secondary",
				"aria-pressed": D,
				onClick: () => te(!D),
				children: "Notes"
			})] }),
			/* @__PURE__ */ G("span", { className: "deck-reader-toolbar-spacer flex-1" }),
			!t && /* @__PURE__ */ G(r, {
				size: "sm",
				variant: "ghost",
				disabled: !P,
				onClick: () => P?.(),
				title: "Focus the presentation conversation",
				children: "Chat & agent"
			}),
			t && /* @__PURE__ */ G(T, {
				trigger: "View",
				triggerLabel: "Presentation view options",
				triggerVariant: "default",
				sections: [{ items: [
					{
						label: "Slide thumbnails",
						active: !x,
						onSelect: () => C(!1)
					},
					{
						label: "Outline",
						active: x,
						onSelect: () => C(!0)
					},
					{
						label: "Speaker notes",
						active: D,
						onSelect: () => te(!D)
					},
					{
						label: "Fit slide",
						active: O === "fit",
						onSelect: () => ne("fit")
					},
					{
						label: "Actual size",
						active: O === "100",
						onSelect: () => ne("100")
					},
					{
						label: "Chat & agent",
						disabled: !P,
						onSelect: () => P?.()
					}
				] }]
			}),
			/* @__PURE__ */ G(r, {
				size: "sm",
				variant: "primary",
				disabled: !L?.svg,
				onClick: () => re(!0),
				children: "Present"
			}),
			i
		]
	}), he = e.slides.map((e) => ({
		slide: e,
		thumbnailSvg: F.find((t) => t.id === e.id)?.svg,
		uncited: !1
	})), ge = be(L?.svg), _e = /* @__PURE__ */ K("div", {
		className: "deck-reader-surface flex h-full min-h-[220px] gap-3 overflow-hidden px-3 py-2 max-[1199px]:px-2 max-[1199px]:py-1 max-[700px]:gap-1.5 max-[700px]:px-1",
		"data-testid": _,
		children: [/* @__PURE__ */ G("nav", {
			className: "deck-reader-rail min-h-0 shrink-0 grow-0 basis-[172px] overflow-y-auto p-1 *:w-full max-[700px]:basis-32",
			"aria-label": x ? "Presentation outline" : "Slide thumbnails",
			children: x ? /* @__PURE__ */ G("ol", {
				className: "deck-reader-outline m-0 flex list-none flex-col gap-1 p-0",
				children: F.map((e, t) => /* @__PURE__ */ G("li", { children: /* @__PURE__ */ K("button", {
					"data-ui-part": "",
					type: "button",
					onClick: () => R(e.id),
					"aria-current": L?.id === e.id ? "true" : void 0,
					className: n("flex w-full cursor-pointer gap-2 rounded-md border border-solid border-transparent bg-transparent p-2 text-left font-[inherit] text-xs text-text-primary", "hover:bg-surface-hover aria-[current=true]:border-primary aria-[current=true]:bg-primary/7", "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"),
					children: [/* @__PURE__ */ G("span", {
						className: "deck-reader-outline-number shrink-0 tabular-nums text-text-tertiary",
						children: t + 1
					}), /* @__PURE__ */ K("span", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ G("strong", { children: e.title }),
							e.slide?.bullets && /* @__PURE__ */ G("span", {
								className: "deck-reader-outline-detail mt-1 line-clamp-3 leading-[1.45] text-text-secondary",
								children: e.slide.bullets.join(" · ")
							}),
							e.generated && /* @__PURE__ */ G("span", {
								className: "deck-reader-outline-detail mt-1 line-clamp-3 leading-[1.45] text-text-secondary",
								children: "Generated from citations"
							})
						]
					})]
				}) }, e.id))
			}) : /* @__PURE__ */ G(ze, {
				items: he,
				selectedId: L?.id ?? "",
				onSelect: R,
				onMove: Va,
				onDuplicate: Va,
				onDelete: Va,
				readOnly: !0,
				canAdd: !1,
				generatedItems: F.filter((e) => e.generated).map((e) => ({
					id: e.id,
					title: e.title,
					thumbnailSvg: e.svg
				})),
				slideViewers: c,
				testIdPrefix: `${_}-filmstrip`
			})
		}), /* @__PURE__ */ K("main", {
			className: "deck-reader-main flex min-h-0 min-w-0 flex-1 flex-col",
			onKeyDown: fe,
			children: [/* @__PURE__ */ G("div", {
				className: n("deck-reader-viewport flex min-h-[140px] flex-1 overflow-auto px-4 py-3 max-[1199px]:p-2 max-[700px]:px-2", "focus-visible:rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"),
				ref: A,
				tabIndex: 0,
				"aria-label": "Slide canvas. Use arrow keys to change slides.",
				"data-testid": `${_}-viewport`,
				children: L ? /* @__PURE__ */ G("div", {
					className: "deck-reader-slide-frame m-auto shrink-0",
					style: { width: pe },
					children: /* @__PURE__ */ G(We, {
						className: "deck-reader-stage [&>[role=figure]]:max-w-none",
						label: `Slide ${I + 1} of ${F.length}: ${L.title}`,
						"data-testid": `${_}-stage`,
						children: ge ? /* @__PURE__ */ G("img", {
							src: ge,
							alt: L.title,
							className: "h-full w-full object-contain"
						}) : le ? /* @__PURE__ */ G("div", {
							"data-testid": `${_}-preview-loading`,
							children: /* @__PURE__ */ G(w, { label: "Rendering the current version…" })
						}) : /* @__PURE__ */ K("div", {
							className: "deck-reader-no-preview flex flex-col items-center gap-2 p-6",
							children: [/* @__PURE__ */ G(h, {
								size: "sm",
								children: ce ?? "This slide’s preview is unavailable."
							}), N && /* @__PURE__ */ G(r, {
								size: "sm",
								variant: "secondary",
								onClick: () => ae.current(e),
								children: "Retry preview"
							})]
						})
					})
				}) : /* @__PURE__ */ G(S, {
					title: "No slides yet",
					body: "This saved version contains no slides."
				})
			}), D && /* @__PURE__ */ G("div", {
				className: "deck-reader-notes max-h-[120px] shrink-0 overflow-y-auto px-4 pt-1.5 max-[1199px]:px-2 max-[1199px]:pt-0.5",
				children: L?.slide ? /* @__PURE__ */ K("section", {
					"data-ui-part": "",
					className: "deck-reader-note-panel flex flex-col gap-1 rounded-lg border border-solid border-border bg-surface px-3 py-2 max-[1199px]:gap-0.5 max-[1199px]:px-2 max-[1199px]:py-1",
					"aria-labelledby": M,
					children: [/* @__PURE__ */ G("label", {
						htmlFor: `${M}-text`,
						id: M,
						className: "max-[1199px]:leading-4",
						children: /* @__PURE__ */ G(h, {
							size: "xs",
							weight: "semibold",
							className: "max-[1199px]:leading-4",
							children: "Speaker notes"
						})
					}), /* @__PURE__ */ G(E, {
						id: `${M}-text`,
						value: L.slide.notes ?? "",
						readOnly: !0,
						autoResize: !0,
						minRows: 2,
						maxRows: 4,
						placeholder: "No speaker notes on this slide.",
						"aria-labelledby": M,
						"data-testid": `${_}-notes`,
						className: n("min-h-[42px] border-transparent bg-transparent p-0 text-sm text-text-secondary", "max-[1199px]:h-10! max-[1199px]:max-h-10! max-[1199px]:min-h-10 max-[1199px]:overflow-y-auto! max-[1199px]:leading-[18px]")
					})]
				}) : L?.generated ? /* @__PURE__ */ G(h, {
					size: "xs",
					tone: "secondary",
					children: "This generated Sources slide has no speaker notes."
				}) : null
			})]
		})]
	}), ve = {
		selectedSlide: L?.slide,
		selectedIndex: I,
		slideCount: F.length,
		...L?.generated ? { selectedGeneratedSlide: {
			id: L.id,
			title: L.title,
			svg: L.svg
		} } : {},
		selectSlide: R,
		markChanged: Va
	};
	return /* @__PURE__ */ K(W, { children: [p({
		toolbar: me,
		actions: null,
		surface: _e,
		footer: m?.(ve) ?? null
	}), /* @__PURE__ */ G(za, {
		title: e.title,
		slides: F.map((e) => ({
			id: e.id,
			title: e.title,
			svg: e.svg ?? "",
			generated: e.generated
		})),
		open: k,
		onClose: () => re(!1),
		slideIndex: I,
		onSlideChange: de,
		loading: le,
		error: ce,
		onRetry: N ? () => ae.current(e) : void 0,
		onFocusConversation: P,
		testId: `${_}-present`
	})] });
}
//#endregion
//#region src/components/doc-editor/DictationButton.tsx
var Ua = 250;
function Wa(e, t, n) {
	return n || (e === "unsupported" ? "Dictation needs a microphone and a secure page" : t ? "Listening — release to insert" : e === "transcribing" ? "Transcribing…" : e === "starting" ? "Starting the microphone…" : "Hold to dictate");
}
function Ga({ state: e, micActive: t, unavailableReason: r, onStart: i, onStop: a, className: o, "data-testid": s = "dictation-button" }) {
	let c = H(null), l = Wa(e, t, r), u = e === "transcribing" || e === "starting", f = () => {
		if (t) {
			a(), c.current = null;
			return;
		}
		c.current = Date.now(), i();
	}, p = () => {
		let e = c.current;
		e !== null && (c.current = null, !(Date.now() - e < 250) && a());
	};
	return /* @__PURE__ */ G("button", {
		"data-ui-part": "",
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
		className: n("grid h-7 w-7 shrink-0 place-items-center rounded-md border-0 p-0 transition-colors", t ? "bg-danger text-white" : "bg-transparent text-text-secondary hover:bg-surface-hover hover:text-text-primary", u && "animate-pulse", (r || e === "unsupported") && "opacity-60", o),
		children: /* @__PURE__ */ G(d, {
			size: 15,
			"aria-hidden": "true"
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentReplyComposer.tsx
var Ka = {
	resolve: "/resolve",
	agent: "/agent",
	assign: "/assign"
};
function qa(e) {
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
			let t = e.command?.trigger === Ka.assign ? e.command.argument : void 0, n = (t?.label ?? r).replace(/^@/, "").trim();
			return {
				kind: "assign",
				userId: t?.id ?? null,
				name: n
			};
		}
	}
}
var Ja = zn(function({ mentionUsers: e, onReply: t, onResolve: r, onAskAgent: i, onAssign: a, onCancel: o, dictation: s, placeholder: c = "Reply or type /", variant: l = "card", submitLabel: u = "Reply", className: d, "data-testid": f = "comment-reply-composer" }, p) {
	let m = H(null);
	Vn(p, () => ({
		focus: () => m.current?.focus(),
		insertText: (e) => {
			let t = m.current;
			if (!t) return;
			let n = t.editor?.getText() ?? "";
			t.insertText(n && !/\s$/.test(n) ? ` ${e}` : e);
		}
	}), []);
	let h = V(() => e.filter((e) => e.type === "user"), [e]), g = z((t) => {
		let n = t.trim().toLowerCase();
		return e.filter((e) => !n || e.displayName.toLowerCase().includes(n)).slice(0, 8).map((e) => ({
			id: e.userId,
			label: e.displayName,
			color: e.color,
			...e.type === "group" ? { hint: `${e.memberCount ?? 0} people` } : {}
		}));
	}, [e]), _ = V(() => {
		let e = [];
		return r && e.push({
			trigger: Ka.resolve,
			label: "Resolve thread"
		}), i && e.push({
			trigger: Ka.agent,
			label: "Ask the agent"
		}), a && e.push({
			trigger: Ka.assign,
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
	]), v = z(async (e) => {
		let n = qa(e);
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
	return /* @__PURE__ */ G("div", {
		className: n("flex flex-col gap-1", d),
		"data-testid": f,
		onKeyDown: (e) => {
			e.key === "Escape" && o && (e.stopPropagation(), o());
		},
		children: /* @__PURE__ */ G(Rn, {
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
			...s ? { submitLead: /* @__PURE__ */ G(Ga, {
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
function Ya({ author: e, quote: t, variant: r = "agent", resolveOnApply: i = !1, onResolveOnApplyChange: a, onDismiss: o, className: s, "data-testid": u = "comment-handoff-bar" }) {
	let d = r === "reply", f = d ? "Stop replying" : "Stop answering this comment";
	return /* @__PURE__ */ K("div", {
		role: "status",
		"data-testid": u,
		"data-variant": r,
		className: n("flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm", s),
		children: [
			d ? /* @__PURE__ */ G(l, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-primary"
			}) : /* @__PURE__ */ G(c, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-info-fg"
			}),
			/* @__PURE__ */ K("span", {
				className: "min-w-0 flex-1 truncate",
				children: [
					d ? "Replying to " : "Answering ",
					/* @__PURE__ */ G("span", {
						className: "font-semibold text-text-primary",
						children: e
					}),
					d ? null : "’s comment",
					t ? /* @__PURE__ */ K("span", {
						className: "text-text-tertiary",
						children: [
							" on “",
							t,
							"”"
						]
					}) : null
				]
			}),
			d ? /* @__PURE__ */ G("span", {
				className: "hidden shrink-0 text-text-tertiary sm:inline",
				children: "Esc to go back"
			}) : /* @__PURE__ */ K("label", {
				className: "inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary",
				children: [/* @__PURE__ */ G(j, {
					checked: i,
					onChange: (e) => a?.(e),
					"data-testid": `${u}-resolve`
				}), "Resolve when applied"]
			}),
			/* @__PURE__ */ G("button", {
				"data-ui-part": "",
				type: "button",
				onClick: o,
				"aria-label": f,
				title: f,
				"data-testid": `${u}-dismiss`,
				className: "grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
				children: /* @__PURE__ */ G("span", {
					"aria-hidden": "true",
					children: "×"
				})
			})
		]
	});
}
//#endregion
export { kr as AckMode, Zt as ActionItemsCard, Fr as ActivityFeed, It as AttachmentsPanel, gn as AuthenticatedDocumentImageView, st as BULLET_STYLES, Lt as CANVAS_BODY_KEY, zt as CANVAS_SCHEMA_VERSION, ai as COMMENT_MARGIN_STORAGE_KEY, Ka as COMMENT_REPLY_COMMANDS, vn as CanvasDocumentView, at as CanvasLineSpacing, ut as CanvasListStyle, Dr as ChunkViewer, Bt as CommentContextHeader, ti as CommentGhostPopover, Ya as CommentHandoffBar, Ja as CommentReplyComposer, sn as CommentThreadNode, _t as ComposerDockPlacementContext, je as DECK_THEMES, Fa as DEFAULT_EDITOR_SHELL_TABS, Ua as DICTATION_HOLD_MS, ht as DOCK_HEIGHT_VAR, gt as DOCK_INSET_VAR, Nt as DOCUMENT_MODE_LABELS, Tn as DOCUMENT_TOOLBAR_BREAKPOINTS, za as DeckPresentationDialog, Ha as DeckReader, Ga as DictationButton, rn as DiffViewer, an as DocumentEditorPage, wn as DocumentFindBar, bn as DocumentGutter, vt as DocumentHeader, Dn as DocumentImageProvider, Yt as DocumentLifecyclePill, pr as DocumentListPage, Ct as DocumentModePill, fn as DocumentOutline, jt as DocumentOwnership, Pa as DocumentReviewPanel, Pn as DocumentRuler, Et as DocumentSaveStatus, ui as DocumentShareDialog, _n as DocumentStatusBar, Sn as DocumentToolbar, Ir as EMPTY_DECK_PRESENCE, La as EditorShell, rt as EditorToolbar, Gt as ExecutiveSummaryCard, ze as Filmstrip, Ie as FilmstripThumb, mt as FloatingComposerDock, ii as FloatingDockBar, Xt as FollowModeBar, en as HeaderBanner, on as KeyDecisionsCard, pt as LINE_SPACINGS, tt as LINE_SPACING_LABELS, it as LIST_STYLE_LABELS, jn as MAX_ATTACHMENT_BYTES, Ae as MAX_BULLETS_PER_SLIDE, we as MAX_BULLET_CHARS, Ge as MAX_CHART_LABELS, Je as MAX_CHART_SERIES, Ee as MAX_EYEBROW_CHARS, En as MAX_IMAGE_BYTES, qe as MAX_NOTES_CHARS, ve as MAX_QUOTE_CHARS, P as MAX_SLIDES, Ke as MAX_SOURCES_PER_SLIDE, ye as MAX_SUBTITLE_CHARS, le as MAX_TITLE_CHARS, $e as MULTILEVEL_STYLES, cn as MentionDropdown, Vt as MyMentionsPanel, ct as NUMBER_STYLES, Ce as NewDocumentModal, F as OLDER_REVISIONS_VALUE, mn as PX_PER_INCH, kt as ParticipantAvatars, Me as PresentationEditor, Se as PresentationView, Yr as ProposalCard, Ue as ProposedEditStrip, Ut as ReaderMode, un as ResolvedBanner, qt as ReviewMode, xr as ReviewProgress, Tr as ReviewableItem, ci as SHARE_ROLES, Re as SLIDES_TOOLBAR_BREAKPOINTS, ce as SLIDE_ID_PATTERN, He as SLIDE_INSERTS, he as SLIDE_LAYOUTS, Pe as SLIDE_LAYOUT_LABELS, di as SUGGESTION_AUTHORING_MODES, Di as SUGGESTION_DATE_BUCKET_MS, Ea as SUGGESTION_VIEW_MODES, xt as SectionBlock, Kt as SectionComments, St as SectionList, Wt as SectionSummariesCard, Oe as SlideForm, xe as SlideList, I as SlideRow, ke as SlideSources, We as SlideStage, De as SlidesToolbar, Te as SpeakerNotes, vr as StandaloneTiptap, ga as SuggestChanges, bi as SuggestionCard, pa as SuggestionDelete, fa as SuggestionInsert, ha as SuggestionMarks, fi as SuggestionModeControl, ma as SuggestionModify, Ma as SuggestionReviewList, nn as TableOfContents, ae as TaskItemRow, oe as TaskList, ft as TiptapEditor, $t as VersionHistoryPanel, Mt as VideoCallPanel, ri as VideoDockSlot, Jt as VideoHistoryPanel, Xr as WorkItemRow, At as WorkspaceDocumentHeaderNotices, Fn as ZOOM_FIT, pn as ZOOM_STEPS, kn as acceptsDocumentImage, N as addSlide, _a as authorSuggestionsAs, Oi as bucketSuggestionDate, Ne as canSaveDeck, wt as canvasBody, Rt as canvasFragmentToMarkdown, mr as clientIdForUser, qa as commentReplyIntent, Ht as countAllComments, An as createAuthenticatedDocumentImage, ki as createSuggestionIdentity, Lr as deckPresenceChannel, Si as deckTitleFrom, Ur as deckViewerToParticipant, Vr as deckViewersOf, Wa as dictationButtonLabel, ka as docForViewMode, xn as documentToolbarSize, pe as duplicateSlide, Hr as editingInMyOtherTab, Da as finalDoc, Pt as findDocumentTarget, Mn as findMatches, Ca as formatSuggestionAuthor, Qt as generateSummaryBullets, ln as getInitials, Ot as isCanvasDocument, nt as isLineSpacing, Ri as isSuggestChangesEnabled, lt as lineSpacingAttributes, xa as listSuggestions, dt as listTypeFor, me as makeSlide, ge as moveSlide, yn as nextMatchIndex, ue as nextRevisionLabel, L as nextSlideId, Oa as originalDoc, xi as parseDeckText, ot as parseLineSpacing, et as parseListStyle, wa as parseSuggestionAuthor, Aa as previewStateForViewMode, va as proposalAuthor, Le as proposedEditPlacement, Ve as proposedEditPreview, oi as readCommentMarginPreference, Nn as readOutline, tn as readSchemaVersion, Ci as recordingIdFor, Ft as relativeTime, fe as removeSlide, _e as replaceSlide, ei as replyLabel, bt as resolverLabel, de as revisionPickerOptions, Y as sameSuggestion, dn as scrollToDocumentTarget, Fe as slidesToolbarSize, On as stackOffsets, Ta as suggestionAuthorLabel, J as suggestionIdentityOf, Ai as suggestionKey, be as svgDataUri, Ye as uncitedSlideIds, si as useCommentMarginPreference, Wr as useDeckPresence, Tt as useDocumentActions, Cn as useDocumentImageUpload, In as useDocumentOutline, hn as useDocumentToolbarSize, hr as useFollowCursor, Dt as useIsCanvasDocument, yt as useSidebarPanels, ja as viewModeClassName, se as withLayoutDefaults };
