import { n as e, t } from "./useWebSocket-C9oAM0NL.js";
import { t as n } from "./cn-D4QmbyEy.js";
import { n as r } from "./Button-C2OEUpX-.js";
import { t as i } from "./Card-CbTNNNkk.js";
import { t as a } from "./Chip-0zFpfJ52.js";
import { n as o, r as s } from "./Tabs-C6UIoOMr.js";
import { ct as c, m as l, mt as u } from "./Icons-B_xESAH3.js";
import { i as d } from "./MediaIcons-_ai5Til2.js";
import { n as f, t as p } from "./Stack-DNMA-_4L.js";
import { t as m } from "./Badge-POenI45X.js";
import { t as h } from "./Banner-8ngXUtJu.js";
import { t as g } from "./Modal-CjgKqXl7.js";
import { t as _ } from "./Input-CpLq80dw.js";
import { t as v } from "./EmptyState-BupZX4UK.js";
import { n as y } from "./DropdownMenu-M27Ly7by.js";
import { t as b } from "./Textarea-Drx4YDDG.js";
import { t as x } from "./Avatar-CmYYkk9C.js";
import { t as S } from "./SegmentedControl-DfUTJiYa.js";
import { t as C } from "./InlineAlert-CBtteaVZ.js";
import { t as w } from "./CardHeader-C50GEAmo.js";
import { n as T } from "./NumberInput-axCowEor.js";
import { t as E } from "./PresenceAvatars-DAgxQ3PF.js";
import { t as ee } from "./ChangeDiff-BHerlwTS.js";
import { t as te } from "./MetaLine-BtHTTScI.js";
import { t as ne } from "./Select-C6OGjVyH.js";
import { t as D } from "./Checkbox-C70AGFS5.js";
import { n as re } from "./FileKindMark-DhjYpKjg.js";
import { t as ie } from "./activationKey-CjbL3LUv.js";
import { A as O, k } from "./renderers-cv5TKsG8.js";
import { A as ae, B as A, C as j, D as oe, E as M, F as N, G as se, H as P, I as ce, J as le, K as ue, L as F, M as I, N as de, O as fe, P as pe, R as me, S as he, T as ge, U as _e, V as ve, W as ye, Y as be, Z as xe, _ as Se, a as Ce, b as we, c as Te, d as Ee, f as De, g as Oe, h as ke, i as Ae, j as je, k as Me, l as Ne, m as Pe, n as Fe, o as Ie, p as Le, q as Re, r as ze, s as Be, t as Ve, u as He, v as Ue, w as We, x as Ge, y as Ke, z as qe } from "./ProposedEditStrip-6l3-tR07.js";
import { o as Je, t as Ye } from "./VerdictChip-B8JaUpcJ.js";
import { a as Xe, c as Ze, d as Qe, f as $e, h as et, i as tt, l as nt, m as rt, n as it, o as at, p as ot, r as st, s as ct, t as lt, u as ut } from "./TiptapEditor-BjjwDyPa.js";
import { i as dt, n as ft, r as pt, t as mt } from "./FloatingComposerDock-ZezHreIm.js";
import { A as ht, B as gt, C as _t, D as vt, E as yt, F as bt, G as xt, H as St, I as Ct, J as wt, K as Tt, L as Et, M as Dt, N as Ot, O as kt, P as At, R as jt, S as Mt, T as Nt, U as Pt, V as Ft, W as It, _ as Lt, a as Rt, b as zt, c as Bt, d as Vt, f as Ht, g as Ut, h as Wt, i as Gt, j as Kt, k as qt, l as Jt, m as Yt, o as Xt, p as Zt, q as Qt, r as $t, s as en, t as tn, u as nn, v as rn, w as an, x as on, y as sn, z as cn } from "./DocumentEditorPage-BeZmQGdw.js";
import { C as ln, S as un, T as dn, _ as fn, a as pn, b as mn, c as hn, d as gn, f as _n, g as vn, h as yn, i as bn, l as xn, m as Sn, n as Cn, o as wn, p as Tn, r as En, s as Dn, t as On, u as kn, v as An, w as jn, x as Mn, y as Nn } from "./useDocumentImageUpload-k2Cs0Dzj.js";
import { r as Pn } from "./RichChatComposer-C-Bjb8Vp.js";
import { forwardRef as Fn, useCallback as L, useEffect as R, useId as In, useImperativeHandle as Ln, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
import * as Rn from "yjs";
import { relativePositionToAbsolutePosition as zn, ySyncPluginKey as Bn } from "@tiptap/y-tiptap";
import { Extension as Vn, Mark as Hn, mergeAttributes as Un } from "@tiptap/core";
import { EditorState as Wn, Plugin as Gn, PluginKey as Kn, TextSelection as G } from "@tiptap/pm/state";
import { AddMarkStep as qn, AddNodeMarkStep as Jn, AttrStep as Yn, RemoveMarkStep as Xn, RemoveNodeMarkStep as Zn, ReplaceAroundStep as Qn, ReplaceStep as $n, Transform as er, replaceStep as tr } from "@tiptap/pm/transform";
import { Decoration as nr, DecorationSet as rr } from "@tiptap/pm/view";
//#region src/components/doc-editor/DocumentListPage.tsx
function ir(e) {
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
var ar = {
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
function or({ status: e }) {
	let t = ar[e] ?? ar.draft;
	return /* @__PURE__ */ U("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var sr = {
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
function cr({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ W("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = sr[e.mode ?? "editor"] ?? sr.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ W("button", {
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
					/* @__PURE__ */ U("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ U("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ U("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ W("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function lr({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = V(!1), [u, d] = V(null), [f, p] = V(null), [m, h] = V(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = z(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = L((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ W("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ W("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ U("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ W("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ U("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ U("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ U("div", {
				className: n("flex flex-col gap-3"),
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ W("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: ie(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ U("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ W("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ W("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ U("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ U(or, { status: e.status }),
											e.type && /* @__PURE__ */ U("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ W("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ U("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ U("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ W("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", ir(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ U("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ U(cr, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ U("button", {
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
			e.length > 10 && /* @__PURE__ */ W("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ U("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ W("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ U("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ U(xe, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function ur(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function dr({ editor: e, provider: t, followClientId: n, onLost: r }) {
	R(() => {
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
				let t = Bn.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = zn(t.doc, t.type, Rn.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var fr = "prosemirror";
function pr(e) {
	return e.ydoc !== void 0;
}
function mr(e) {
	return pr(e) ? /* @__PURE__ */ U(hr, { ...e }) : /* @__PURE__ */ U(gr, { ...e });
}
function hr({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = fr, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = z(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = B(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ U("div", {
		className: n(c),
		children: /* @__PURE__ */ U(lt, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function gr({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = fr, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = B(/* @__PURE__ */ new Set()), _ = L((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = L((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = z(() => ({
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
	}), w = z(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = B(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ U("div", {
		className: n(d),
		children: /* @__PURE__ */ U(lt, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ U("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function _r({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ W("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ W("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ W("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ W("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ U("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ U("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var vr = {
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
}, yr = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, br = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function xr({ item: e, onAck: t, onReject: r }) {
	let [i, a] = V(!1), [o, s] = V(""), [c, l] = V("none"), u = B(e.status), d = vr[e.status] ?? br, f = yr[e.priority] ?? "var(--color-neutral)", [p, m] = V(!1), h = B(null);
	R(() => () => {
		h.current && clearTimeout(h.current);
	}, []), R(() => {
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
	return /* @__PURE__ */ W("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ W("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ U("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ U("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ U("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ W("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ U("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ W("span", { children: [
					"Approved by ",
					/* @__PURE__ */ U("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ W(H, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ W(H, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ W("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ U("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ W("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ U("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ W(H, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ W(H, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ W("div", { children: [/* @__PURE__ */ W("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ U("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ U("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: p,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ U("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ W("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ U(b, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && g()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ W("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ U("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ U("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: _,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ U("button", {
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
var Sr = {
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
function Cr({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Sr[e.type] ?? Sr.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ W("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ U("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ U("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ U("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ U(lt, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ W("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ W("div", { children: [e.items.map((e) => /* @__PURE__ */ U(xr, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ W("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ U(Ut, {
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
var wr = 4;
function Tr({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = V(0), _ = Math.max(1, Math.ceil(e.length / wr)), v = h * wr, y = e.slice(v, v + wr);
	if (R(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / wr)), s?.());
	}, [
		o,
		e.length,
		s
	]), R(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ U("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ W("div", { children: [
		/* @__PURE__ */ U(_r, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ U("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ W("div", { children: [a.length > 0 && /* @__PURE__ */ W("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ U("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ U("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ U(Cr, {
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
		/* @__PURE__ */ W("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ U("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ W("span", {
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
				/* @__PURE__ */ U("button", {
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
function Er(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Dr(e, t) {
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
function Or(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function kr(e) {
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
function Ar(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function jr({ events: e, participants: t }) {
	let [r, i] = V(!1);
	return /* @__PURE__ */ W("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ W("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ W("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ U("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ W(H, { children: [t.length > 0 && /* @__PURE__ */ W("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ U("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ W("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ U("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					Ar(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ U("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ U("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ W("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ U("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: Or(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ W("div", { children: [
						/* @__PURE__ */ U("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ W("span", {
							className: n("text-neutral"),
							children: [
								Er(e.eventType),
								" ",
								Dr(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ U("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: kr(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/useDeckPresence.ts
var Mr = {
	viewers: [],
	participants: [],
	slideViewers: {},
	editingElsewhere: !1
}, Nr = (e) => `doc:${e}`, Pr = "var(--color-primary)", Fr = /* @__PURE__ */ new Set([
	"editor",
	"reviewer",
	"reader"
]);
function Ir(e, t) {
	let n = e.find((e) => e.clientId === t)?.metadata?.userId;
	return typeof n == "string" && n ? n : null;
}
function Lr(e, t, n, r = () => void 0) {
	let i = Ir(e, n), a = /* @__PURE__ */ new Map();
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
function Rr(e, t, n) {
	let r = Ir(e, n);
	return r ? e.some((e) => e.clientId !== n && e.status !== "offline" && e.metadata?.userId === r && e.metadata?.deckEditing?.documentId === t) : !1;
}
function zr(e, t) {
	let n = t?.metadata ?? {}, r = typeof n.mode == "string" && Fr.has(n.mode) ? n.mode : e.editing ? "editor" : "reader";
	return {
		clientId: e.clientId,
		userId: e.id,
		displayName: e.name,
		color: typeof n.color == "string" && n.color ? n.color : Pr,
		mode: r,
		currentSectionId: e.slideId ?? null,
		...e.idle ? { idle: !0 } : {}
	};
}
function Br(e) {
	let { roster: t, ownClientId: n, updateMetadata: r, documentId: i, selectedSlideId: a, slideTitle: o, editing: s = !1 } = e;
	return R(() => {
		r({ deckSlide: a ? {
			documentId: i,
			slideId: a
		} : null });
	}, [
		i,
		a,
		r
	]), R(() => {
		r({ deckEditing: s ? { documentId: i } : null });
	}, [
		i,
		s,
		r
	]), R(() => () => r({
		deckSlide: null,
		deckEditing: null
	}), [r]), z(() => {
		let e = Lr(t, i, n, o), r = {};
		for (let t of e) t.slideId && (r[t.slideId] ??= []).push(t);
		return {
			viewers: e,
			participants: e.map((e) => zr(e, t.find((t) => t.clientId === e.clientId))),
			slideViewers: r,
			editingElsewhere: Rr(t, i, n)
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
var Vr = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Hr = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function Ur({ label: e, children: t }) {
	return /* @__PURE__ */ W("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ U("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ U("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var Wr = {
	field: "Field change",
	prose: "Body text"
};
function Gr({ utterance: e, kind: t, status: i, confidence: o, attachState: s, targetLabel: c, targetReason: l, before: u, after: d, edits: f, rationale: p, draftError: m, author: h, category: g, path: v, locationHint: y, verdict: b, verdictStatus: S = "idle", verdictError: C, revision: w, onRereview: T, onAccept: E, onReject: te, onRedraft: ne, onReattach: D, onConfirmAttachment: re, className: ie, "data-testid": O = "proposal-card" }) {
	let [k, ae] = V(!1), [A, j] = V(null), [oe, M] = V(!1), [N, se] = V(""), P = i === "applied", ce = i === "rejected", le = P || ce;
	async function ue() {
		ae(!0), j(null);
		try {
			let e = await E();
			j(e);
		} catch (e) {
			j({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			ae(!1);
		}
	}
	let F = t === "prose" ? f ?? [] : [{
		before: u ?? "",
		after: d ?? ""
	}];
	return /* @__PURE__ */ W("div", {
		"data-testid": O,
		"data-status": i,
		"data-confidence": o,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", P ? "border-success-border" : "border-border", ce && "opacity-60", ie),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ U("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${O}-category`,
						children: g ?? Wr[t]
					}),
					h && /* @__PURE__ */ W("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${O}-requester`,
						children: [/* @__PURE__ */ U(x, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ U("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ U("span", { className: "flex-1" }),
					/* @__PURE__ */ U(a, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${O}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ U(a, {
						tone: Hr[o],
						size: "sm",
						children: Vr[o]
					}),
					s === "healed" && /* @__PURE__ */ U(a, {
						tone: "caution",
						size: "sm",
						"data-testid": `${O}-healed`,
						children: "Re-found by quote — check this"
					}),
					s === "author_only" && /* @__PURE__ */ U(a, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					P && /* @__PURE__ */ U(a, {
						tone: "success",
						size: "sm",
						"data-testid": `${O}-applied`,
						children: "Applied"
					}),
					ce && /* @__PURE__ */ U(a, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ W("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ U(Je, {
				path: v ?? (c ? [c] : []),
				...y ? { hint: y } : {},
				"data-testid": `${O}-location`
			}),
			/* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1",
				children: [l && /* @__PURE__ */ U(Ur, {
					label: "Why",
					children: l
				}), p && /* @__PURE__ */ U(Ur, {
					label: "Rationale",
					children: p
				})]
			}),
			i === "drafting" && /* @__PURE__ */ U("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${O}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ U("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${O}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && F.length > 0 && /* @__PURE__ */ U(ee, {
				pairs: F,
				"data-testid": `${O}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ U(Ye, {
				verdict: b,
				status: S,
				error: C,
				revision: w,
				"data-testid": `${O}-verdict`
			}),
			A && !A.ok && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${O}-apply-error`,
				children: [
					/* @__PURE__ */ U("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ U("span", { children: A.message ?? "The document refused the change." }),
					A.stale && /* @__PURE__ */ W("span", { children: [
						"Drafted against ",
						JSON.stringify(A.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(A.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!le && /* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ U(r, {
						size: "sm",
						variant: "primary",
						disabled: k || i === "drafting" || !!m,
						onClick: ue,
						"data-testid": `${O}-accept`,
						children: k ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ U(r, {
						size: "sm",
						variant: "ghost",
						disabled: k,
						onClick: () => M((e) => !e),
						"data-testid": `${O}-reject`,
						children: "Reject"
					}),
					ne && /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "ghost",
						disabled: k,
						onClick: ne,
						"data-testid": `${O}-redraft`,
						children: "Re-draft"
					}),
					T && /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "ghost",
						disabled: k,
						onClick: T,
						"data-testid": `${O}-rereview`,
						children: "Re-run review"
					}),
					D && /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "ghost",
						disabled: k,
						onClick: D,
						"data-testid": `${O}-reattach`,
						children: "Move…"
					}),
					re && s === "author_only" && /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "secondary",
						disabled: k,
						onClick: re,
						"data-testid": `${O}-confirm`,
						children: "Right place"
					})
				]
			}),
			oe && !le && /* @__PURE__ */ W("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ U("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${O}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ U(_, {
						id: `${O}-reason`,
						size: "sm",
						value: N,
						onChange: (e) => se(e.target.value),
						"data-testid": `${O}-reason`
					}),
					/* @__PURE__ */ W("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ U(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								te(N), M(!1);
							},
							"data-testid": `${O}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ U(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => M(!1),
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
function Kr({ itemId: e, utterance: t, unplaced: o = !1, targetLabel: s, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...f ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = p.filter((e) => !b.has(e.id));
	return /* @__PURE__ */ U(i, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ U(a, {
						tone: o ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: o ? "Unplaced" : s ?? "Placed"
					}), l && /* @__PURE__ */ U(a, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ W("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				c && /* @__PURE__ */ U("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ U("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ W("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ U(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				o && y.length > 0 && /* @__PURE__ */ W("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ W(r, {
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
				o && x.length > 0 && /* @__PURE__ */ W("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ U("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ U(ne, {
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
var qr = "[data-comment-id]", Jr = 240;
function Yr(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Xr(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Zr({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: o, onOpenThread: s, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [d, f] = V(null), p = B(null), m = B(null), h = B(null);
	h.current = d;
	let g = z(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = B(g);
	_.current = g;
	let v = L(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), b = L(() => {
		v(), f(null);
	}, [v]), S = L((e, n, r) => {
		if (v(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Yr(e)}"]`) ?? null;
		i instanceof HTMLElement && (p.current = i, f({
			id: e,
			via: r
		}));
	}, [v, t]);
	Ln(l, () => ({
		openComment: (e, t) => S(e, t, "click"),
		close: b
	}), [S, b]);
	let C = B(null), w = d?.id ?? null;
	R(() => {
		C.current !== w && (C.current = w, o?.(w));
	}, [w, o]), R(() => v, [v]), R(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(qr) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (h.current?.id === n) {
					b();
					return;
				}
				S(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (v(), h.current?.id !== a && (m.current = setTimeout(() => S(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (v(), m.current = setTimeout(() => {
				h.current?.via === "hover" && b();
			}, Jr));
		};
		return e.addEventListener("click", a), e.addEventListener("mouseover", o), e.addEventListener("mouseout", s), () => {
			e.removeEventListener("click", a), e.removeEventListener("mouseover", o), e.removeEventListener("mouseout", s);
		};
	}, [
		t,
		i,
		n,
		S,
		b,
		v
	]);
	let T = w ? g.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), b());
	};
	return /* @__PURE__ */ U(y, {
		trigger: p,
		open: !!T,
		onClose: b,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": u,
		children: T && /* @__PURE__ */ W("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: v,
			onMouseLeave: () => {
				v(), m.current = setTimeout(() => {
					h.current?.via === "hover" && b();
				}, Jr);
			},
			children: [
				/* @__PURE__ */ W("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ U(x, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ U("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ U("span", {
							className: "text-[11px] text-text-tertiary",
							children: Mt(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ U(a, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ U("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ U("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ U("span", {
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Xr(T.replyCount ?? 0)
					}), /* @__PURE__ */ W("span", {
						className: "flex gap-1.5",
						children: [s && /* @__PURE__ */ U(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(s),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !T.resolved && /* @__PURE__ */ U(r, {
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
function Qr() {
	return /* @__PURE__ */ W("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ U("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ U("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function $r({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: a = "Drop the call here to read alongside it", undockLabel: o = "Pop video back out", onRequestUndock: c, compact: l = !1, onDragOver: u, onDragLeave: d, onDrop: f, className: p, children: m, "data-testid": h = "video-dock-slot" }) {
	let [g, _] = V(!1), v = L((e) => {
		e.preventDefault(), t && _(!0), u?.(e);
	}, [t, u]), y = L((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (_(!1), d?.(e));
	}, [d]), b = L((e) => {
		e.preventDefault(), _(!1), t && f?.(e);
	}, [t, f]);
	return !e && !t ? null : /* @__PURE__ */ U("div", {
		"data-testid": h,
		"data-docked": String(e),
		"data-compact": l ? "true" : void 0,
		"data-drag-over": String(g),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: v,
		onDragLeave: y,
		onDrop: b,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", g ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", p),
		children: e ? /* @__PURE__ */ W("div", {
			"data-testid": `${h}-content`,
			className: "relative w-full",
			children: [m, c && /* @__PURE__ */ U("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ U(s, {
					"aria-label": o,
					size: "sm",
					onClick: c,
					"data-testid": `${h}-undock`,
					icon: /* @__PURE__ */ U(Qr, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ W("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${h}-dropzone`,
			className: n(l ? "flex h-10 w-full flex-row items-center justify-center gap-2" : "flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", g ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ U("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ U("span", {
				className: "truncate text-xs text-text-tertiary",
				children: a
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function ei({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ U("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ U("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ U("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ U("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/useCommentMarginPreference.ts
var ti = "doc-editor:canvas:gutter-visible";
function ni(e = ti, t = !1) {
	if (typeof window > "u") return t;
	try {
		let n = window.localStorage.getItem(e);
		return n === "1" || n !== "0" && t;
	} catch {
		return t;
	}
}
function ri({ storageKey: e = ti, defaultVisible: t = !1 } = {}) {
	let [n, r] = V(() => ni(e, t)), i = L((t) => {
		try {
			window.localStorage.setItem(e, t ? "1" : "0");
		} catch {}
		r(t);
	}, [e]);
	return {
		visible: n,
		toggle: L(() => {
			r((t) => {
				let n = !t;
				try {
					window.localStorage.setItem(e, n ? "1" : "0");
				} catch {}
				return n;
			});
		}, [e]),
		show: L(() => i(!0), [i])
	};
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var ii = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], ai = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function oi({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, m] = V(""), h = () => {
		let e = p.trim();
		!e || !l || (l(e), m(""));
	};
	return /* @__PURE__ */ U(g, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ W("div", {
			className: "flex flex-col gap-4",
			"data-testid": f,
			children: [
				l && /* @__PURE__ */ W("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ U("input", {
						value: p,
						onChange: (e) => m(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && h();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ U(r, {
						size: "sm",
						onClick: h,
						disabled: !p.trim(),
						"data-testid": `${f}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ U("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${f}-notice`,
					children: d
				}),
				/* @__PURE__ */ U("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${f}-people`,
					children: i.map((e) => /* @__PURE__ */ W("div", {
						className: "flex items-center gap-2",
						"data-testid": `${f}-person`,
						children: [
							/* @__PURE__ */ U(x, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ U("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ U("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${f}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ U("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${f}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: ii.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ U("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ W("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ U("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ U("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${f}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(ai).map((e) => /* @__PURE__ */ U("option", {
							value: e,
							children: ai[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ W("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ U(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${f}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ U("span", {}), /* @__PURE__ */ U(r, {
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
var si = [
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
function ci({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = si.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = si.find((t) => t.value === e);
	return /* @__PURE__ */ W("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ U(S, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ U("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var li = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, ui = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, di = 6, fi = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function pi(e) {
	let t = fi.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function mi(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function hi({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, di), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ W("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ U(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > di && /* @__PURE__ */ W("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - di,
				" more"
			]
		})]
	});
}
function gi({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, acceptLabel: m = "Accept", selected: h = !1, onSelectedChange: g, status: _, className: v, "data-testid": y = "suggestion-card" }) {
	let { person: b, model: S } = pi(t.trim() === "" ? "Unknown author" : t.trim()), C = c && c.length > 0 ? c : s ? [s] : [], w = l && l.length > 0 ? l : o ? [o] : [], T = C.length > 0 || w.length > 0;
	return /* @__PURE__ */ W("div", {
		"data-testid": y,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		"data-selected": g ? h ? "true" : "false" : void 0,
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", v),
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex items-center gap-2",
				children: [
					g && /* @__PURE__ */ U(D, {
						checked: h,
						onChange: (e) => g(e),
						"aria-label": `Select suggestion by ${t.trim() || "unknown author"}`,
						"data-testid": `${y}-select`
					}),
					/* @__PURE__ */ U(x, {
						name: b,
						size: 20
					}),
					/* @__PURE__ */ U("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: b,
						"data-testid": `${y}-author`,
						children: b
					}),
					i !== null && /* @__PURE__ */ U("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: mi(i)
					}),
					_ != null && /* @__PURE__ */ U("span", {
						className: "ml-auto flex shrink-0 items-center",
						"data-testid": `${y}-status`,
						children: _
					}),
					/* @__PURE__ */ U("span", {
						className: n(_ == null && "ml-auto", "shrink-0 text-[11px] font-medium", ui[e]),
						"data-testid": `${y}-kind`,
						children: li[e]
					})
				]
			}),
			(S || a) && /* @__PURE__ */ W("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					S && /* @__PURE__ */ W("span", {
						"data-testid": `${y}-model`,
						children: ["powered by ", S]
					}),
					S && a && /* @__PURE__ */ U("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ W("span", {
						"data-testid": `${y}-context`,
						children: ["in ", a]
					})
				]
			}),
			T && /* @__PURE__ */ W("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${y}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [w.length > 0 && /* @__PURE__ */ U(hi, {
					lines: w,
					tone: "delete",
					testId: `${y}-deleted`
				}), C.length > 0 && /* @__PURE__ */ U(hi, {
					lines: C,
					tone: "insert",
					testId: `${y}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ W("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ U(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${y}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ U(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${y}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ U(r, {
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
function _i(e) {
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
function vi(e, t) {
	let n = /^(.+?)\s*(?:—|–)\s*(.+)$/s.exec(e.trim())?.[1]?.trim();
	return n ? n.slice(0, 120) : (e.trim().split(/\s+/).slice(0, 8).join(" ") || (t ? `${t} deck` : "Presentation")).slice(0, 120);
}
function yi(e, t) {
	if (e && t.some((t) => t.recordingId === e)) return e;
	if (!e) return t.length === 1 ? t[0].recordingId : void 0;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/markNames.ts
var bi = "suggestionInsert", xi = "suggestionDelete", Si = "suggestionModify", Ci = 6e5;
function wi(e = Date.now()) {
	return Math.floor(e / Ci) * Ci;
}
function Ti(e, t, n = Date.now()) {
	return {
		user: e,
		username: t,
		date: wi(n)
	};
}
function K(e) {
	if (!e) return null;
	let { user: t, username: n, date: r } = e.attrs;
	return typeof t != "string" || typeof r != "number" ? null : {
		user: t,
		username: typeof n == "string" ? n : t,
		date: r
	};
}
function q(e, t) {
	return !e || !t ? !1 : e.user === t.user && e.date === t.date;
}
function Ei(e) {
	return `${e.user}@${e.date}`;
}
var Di = "string", Oi = "number";
//#endregion
//#region src/components/doc-editor/suggestions/vendor/utils.ts
function J(e) {
	let t = e.marks[bi], n = e.marks[xi], r = e.marks[Si], i = [
		t ? null : bi,
		n ? null : xi,
		r ? null : Si
	].filter(Boolean);
	if (!t || !n || !r) throw Error(`Suggestion marks missing from schema: ${i.join(", ")}. Register the SuggestionMarks extensions on the editor.`);
	return {
		insertion: t,
		deletion: n,
		modification: r
	};
}
function Y(e, t, n) {
	return e.find((e) => e.type === t && (!n || q(K(e), n)));
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/findSuggestionMarkEnd.ts
function ki(e, t, n) {
	let r = Y((e.nodeAfter ?? e.nodeBefore)?.marks ?? [], t, n);
	if (!r) return e.pos;
	let i = K(r), a = e.pos + (e.nodeAfter?.nodeSize ?? 0);
	for (;;) {
		let n = e.doc.resolve(a);
		if (n.depth < 1 || n.nodeAfter && !Y(n.marks(), t, i ?? void 0)) return n.pos;
		let r = n.after(), o = e.doc.resolve(r), s = o.nodeAfter;
		for (; o.depth > 0 && !s;) r = n.after(o.depth), o = e.doc.resolve(r), s = o.nodeAfter;
		let c = r + 1, l = s?.firstChild;
		for (; l && !l.isLeaf && !Y(l.marks, t, i ?? void 0);) l = l.firstChild, c++;
		let u = l ? Y(l.marks, t, i ?? void 0) : void 0;
		if (!l || !u || !q(K(u), i)) return n.pos;
		let d = e.doc.resolve(c);
		a = d.pos + (d.nodeAfter?.nodeSize ?? 0);
	}
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/decorations.ts
function Ai() {
	let e = document.createElement("span");
	return e.className = "suggestion-pilcrow", e.appendChild(document.createTextNode("¶")), e;
}
function ji(e) {
	let t = K(e);
	return t ? Ei(t) : e.type.name;
}
function Mi(e) {
	let { deletion: t, insertion: n } = J(e.schema), r = [], i = null, a = null, o = 0;
	return e.doc.descendants((e, s, c) => {
		if (e.isTextblock && e.childCount && (e.children.every((e) => !!Y(e.marks, t)) && r.push(nr.node(s, s + e.nodeSize, { "data-node-deletion": "true" })), e.children.every((e) => !!Y(e.marks, n)) && r.push(nr.node(s, s + e.nodeSize, { "data-node-insertion": "true" }))), e.type.name !== "text") return !0;
		let l = Y(e.marks, t), u = Y(e.marks, n), d = a ? Y(a.marks, t) : void 0, f = a ? Y(a.marks, n) : void 0, p = o;
		return a = e, o = s + e.nodeSize, c === i ? (i = c, !0) : (i = c, (!l || !d) && (!u || !f) || !q(K(l), K(d)) && !q(K(u), K(f)) || (l && r.push(nr.widget(p, Ai, {
			key: ji(l),
			marks: [l]
		})), u && r.push(nr.widget(p, Ai, {
			key: ji(u),
			marks: [u]
		})), !0));
	}), rr.create(e.doc, r);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/plugin.ts
var X = new Kn("suggestChanges");
function Ni(e = !1) {
	return new Gn({
		key: X,
		state: {
			init() {
				return { enabled: e };
			},
			apply(e, t) {
				let n = e.getMeta(X);
				return n && "enabled" in n ? { enabled: !!n.enabled } : t;
			}
		},
		props: {
			decorations: Mi,
			handleKeyDown(e, t) {
				return t.key === "ArrowRight" && e.state.selection instanceof G && e.state.selection.empty && e.state.selection.$cursor?.nodeAfter?.text?.startsWith("​") && e.dispatch(e.state.tr.setSelection(G.create(e.state.doc, e.state.selection.$cursor.pos + 1))), t.key === "ArrowLeft" && e.state.selection instanceof G && e.state.selection.empty && e.state.selection.$cursor?.nodeBefore?.text?.endsWith("​") && e.dispatch(e.state.tr.setSelection(G.create(e.state.doc, e.state.selection.$cursor.pos - 1))), !1;
			}
		}
	});
}
function Pi(e) {
	return !!X.getState(e)?.enabled;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/commands.ts
function Fi(e, t, n) {
	let r = [];
	e.doc.descendants((e, i) => {
		if (!e.isTextblock) return !0;
		let a = e.childCount > 0;
		return e.forEach((e) => {
			Y(e.marks, t, n) || (a = !1);
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
function Z(e, t, n, r, i, a, o) {
	let s = (e) => Y(e, n, i), c = (e) => Y(e, r, i), l = (e) => i ? e : n, u = s(e.marks);
	u && (e.isInline ? t.removeMark(0, e.nodeSize, l(u)) : t.removeNodeMark(0, l(u))), e.descendants((e, n) => {
		if (a !== void 0 && n < a) return !0;
		if (o !== void 0 && n > o) return !1;
		let u = c(e.marks), d = s(e.marks);
		if (!u && !d) return !0;
		if (u) {
			let { pos: a, deleted: o } = t.mapping.mapResult(n);
			if (o) return !1;
			let s = ki(t.doc.resolve(a + e.nodeSize), r, i), c = t.doc.textBetween(a - 1, a, "x", "x"), l = s <= t.doc.content.size ? t.doc.textBetween(s, s + 1, "x", "x") : "", u = +(c === " " && l === " ");
			return t.deleteRange(a, s + u), !1;
		}
		let f = d, p = t.mapping.map(n), m = p + e.nodeSize;
		return e.isInline ? (t.removeMark(p, m, l(f)), e.text === "​" && t.delete(p, m)) : t.removeNodeMark(p, l(f)), !0;
	});
}
function Ii(e, t, n, r) {
	let { modification: i } = J(e.type.schema), a = e.marks.filter((e) => e.type === i && (!r || q(K(e), r)));
	for (let r of a) if (r.attrs.type === "attr" && typeof r.attrs.attrName == "string") n.setNodeAttribute(t, r.attrs.attrName, r.attrs.previousValue);
	else if (r.attrs.type === "mark") r.attrs.previousValue ? n.addNodeMark(0, e.type.schema.markFromJSON(r.attrs.previousValue)) : n.removeNodeMark(t, e.type.schema.markFromJSON(r.attrs.previousValue));
	else if (r.attrs.type === "nodeType") {
		let i = e.type.schema.nodes[r.attrs.previousValue];
		if (!i) throw Error(`Unknown node type ${String(r.attrs.previousValue)}`);
		n.setNodeMarkup(t, i, null);
	} else throw Error("Unknown modification type");
}
function Q(e, t, n, r, i, a) {
	let { modification: o } = J(e.type.schema), s = (e) => r ? e : o, c = Y(e.marks, o, r);
	if (c) {
		let i;
		do
			i = t.steps.length, t.removeNodeMark(0, s(c));
		while (t.steps.length > i);
		n < 0 && Ii(e, 0, t, r);
	}
	e.descendants((e, c) => {
		if (i !== void 0 && c < i) return !0;
		if (a !== void 0 && c > a) return !1;
		let l = Y(e.marks, o, r);
		if (!l) return !0;
		let u;
		do
			u = t.steps.length, t.removeNodeMark(c, s(l));
		while (t.steps.length > u);
		return n < 0 && Ii(e, c, t, r), !0;
	});
}
function Li(e) {
	let { deletion: t, insertion: n } = J(e.type.schema), r = new er(e);
	return Fi(r, t), Z(e, r, n, t), Q(r.doc, r, 1), r.doc;
}
function Ri(e) {
	let { deletion: t, insertion: n } = J(e.type.schema), r = new er(e);
	return Fi(r, n), Z(e, r, t, n), Q(r.doc, r, -1), r.doc;
}
function zi(e, t, n) {
	let r = e.resolve(t).blockRange(e.resolve(n)), { deletion: i, insertion: a } = J(e.type.schema), o = new er(e);
	return Z(e, o, a, i, void 0, r.start, r.end), Q(e, o, 1, void 0, r.start, r.end), o.doc.slice(o.mapping.map(t), o.mapping.map(n));
}
function Bi(e, t) {
	let { deletion: n, insertion: r } = J(e.schema), i = e.tr;
	return Fi(i, n), Z(e.doc, i, r, n), Q(i.doc, i, 1), i.setMeta(X, { skip: !0 }), t?.(i), !0;
}
function Vi(e, t, n) {
	return (r, i) => {
		let { deletion: a, insertion: o } = J(r.schema), s = r.tr;
		return t === void 0 && n === void 0 && Fi(s, a, e), Z(r.doc, s, o, a, e, t, n), Q(s.doc, s, 1, e, t, n), s.steps.length ? (s.setMeta(X, { skip: !0 }), i?.(s), !0) : !1;
	};
}
function Hi(e, t) {
	let { deletion: n, insertion: r } = J(e.schema), i = e.tr;
	return Fi(i, r), Z(e.doc, i, n, r), Q(i.doc, i, -1), i.setMeta(X, { skip: !0 }), t?.(i), !0;
}
function Ui(e, t, n) {
	return (r, i) => {
		let { deletion: a, insertion: o } = J(r.schema), s = r.tr;
		return t === void 0 && n === void 0 && Fi(s, o, e), Z(r.doc, s, a, o, e, t, n), Q(s.doc, s, -1, e, t, n), s.steps.length ? (s.setMeta(X, { skip: !0 }), i?.(s), !0) : !1;
	};
}
function Wi(e) {
	return (t, n) => {
		let { deletion: r, insertion: i, modification: a } = J(t.schema), o = null, s = null;
		return t.doc.descendants((t, n) => !t.marks.find((t) => (t.type === i || t.type === r || t.type === a) && q(K(t), e)) || (o === null && (o = n), s = n + t.nodeSize, !1)), o === null || s === null ? !1 : (n && n(t.tr.setSelection(G.create(t.doc, o, s)).scrollIntoView()), !0);
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
function Gi(e, t, n, r, i, a) {
	let { deletion: o, insertion: s } = J(t.schema), c = n.resolve(r.from).nodeBefore, l = Y(c?.marks ?? [], o) ?? Y(c?.marks ?? [], s) ?? null, u = n.resolve(r.to).nodeAfter, d = Y(u?.marks ?? [], o) ?? Y(u?.marks ?? [], s) ?? null, f = K(l) ?? K(d), p = f && q(f, a) ? f : a, m = [], h = $(r.from, i, e.steps), g = $(r.to, i, e.steps);
	t.selection.empty && h !== g && e.setSelection(G.near(e.doc.resolve(h)));
	let _ = (e) => e.marks.some((e) => e.type === s && K(e)?.user === a.user);
	e.doc.nodesBetween(h, g, (e, t) => !_(e) || (m.push({
		from: Math.max(t, h),
		to: Math.min(t + e.nodeSize, r.to)
	}), !1)), m.reverse();
	for (let t of m) e.delete(t.from, t.to);
	if (h = $(r.from, i, e.steps), g = $(r.to, i, e.steps), h !== g) {
		let t = e.doc.resolve(h), n = e.doc.resolve(g);
		!t.nodeAfter && !Y(t.nodeBefore?.marks ?? [], o) && (e.insertText("​", h), g++, n = e.doc.resolve(g)), !n.nodeBefore && !Y(n.nodeAfter?.marks ?? [], o) && (e.insertText("​", g), g++, n = e.doc.resolve(g)), t.nodeBefore?.text?.endsWith("​") && !n.nodeAfter?.text?.startsWith("​") && (e.delete(h - 1, h), h--, g--, t = e.doc.resolve(h), n = e.doc.resolve(g)), n.nodeAfter?.text?.startsWith("​") && !t.nodeBefore?.text?.endsWith("​") && e.delete(g, g + 1), t.nodeBefore && g - h === 1 && e.doc.textBetween(h, g) === "​" && (e.delete(h, g), h--, g--, t = e.doc.resolve(h), n = e.doc.resolve(g), e.setSelection(G.near(t)));
	}
	let v = e.doc.resolve(h).blockRange(e.doc.resolve(g));
	if (!v || v.start !== h || v.end !== g ? e.addMark(h, g, o.create({ ...p })) : e.doc.nodesBetween(v.start, v.end, (t, n) => n < v.start || (e.addNodeMark(n, o.create({ ...p })), !1)), r.slice.content.size) {
		let t = e.doc.resolve(g), n = ki(t, o);
		e.replace(n, n, r.slice);
		let i = e.steps[e.steps.length - 1].getMap().map(n);
		e.doc.nodesBetween(n, i, (t, r) => {
			let a = e.doc.resolve(r);
			for (let e = a.depth; e >= 0; e--) if (Y(a.node(e).marks, s, p)) return;
			if (r < n || r + t.nodeSize > i || t.isInline) {
				e.addMark(Math.max(r, n), Math.min(r + t.nodeSize, i), s.create({ ...p }));
				return;
			}
			e.addNodeMark(r, s.create({ ...p }));
		});
		let a = e.doc.resolve(n), c = e.doc.resolve(i);
		a.nodeAfter || (e.insertText("​", n), e.addMark(n, n + 1, s.create({ ...p })), i++, c = e.doc.resolve(i)), c.nodeBefore || (e.insertText("​", i), e.addMark(i, i + 1, s.create({ ...p })), i++, c = e.doc.resolve(i)), n !== t.pos && e.setSelection(G.near(e.doc.resolve(n + r.slice.size)));
	}
	return q(p, a);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/addMarkStep.ts
function Ki(e, t, n, r, i, a) {
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = zi(o, r.from, r.to), c = tr(n, r.from, r.to, s);
	return c ? Gi(e, t, n, c, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/addNodeMarkStep.ts
function qi(e, t, n, r, i, a) {
	let { modification: o } = J(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter?.marks ?? [];
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
function Ji(e, t, n, r, i, a) {
	let { modification: o } = J(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter, l = c?.marks ?? [], u = l.find((e) => e.type === o && e.attrs.type === "attr" && e.attrs.attrName === r.attr);
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
function Yi(e, t, n, r, i, a) {
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = zi(o, r.from, r.to), c = tr(n, r.from, r.to, s);
	return c ? Gi(e, t, n, c, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/removeNodeMarkStep.ts
function Xi(e, t, n, r, i, a) {
	let { modification: o } = J(t.schema), s = $(r.pos, i, e.steps), c = e.doc.resolve(s).nodeAfter?.marks ?? [], l = c.find((e) => e.type === o && e.attrs.type === "mark" && e.attrs.newValue && r.mark.eq(t.schema.markFromJSON(e.attrs.newValue)));
	return l ? (e.removeNodeMark(s, l), e.removeNodeMark(s, t.schema.markFromJSON(l.attrs.newValue)), !1) : (c = r.mark.removeFromSet(c), c = o.create({
		...a,
		type: "mark",
		previousValue: r.mark.toJSON(),
		newValue: null
	}).addToSet(c), e.setNodeMarkup(s, null, null, c), !0);
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/replaceAroundStep.ts
function Zi(e, t, n, r, i, a) {
	let o = r.structure;
	if (r.insert === 1 && r.slice.size === 2 && r.gapTo === r.to - 1 && r.gapFrom === r.from + 1 && o) {
		let { modification: o } = J(t.schema), s = r.slice.content.firstChild, c = $(r.from, i, e.steps), l = e.doc.resolve(c).nodeAfter;
		if (!s || !l) throw Error("Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode / newNode is null");
		if (s.marks.filter((e) => !l?.marks.some((t) => t.eq(e))).forEach((s) => {
			s.type !== o && qi(e, t, n, new Jn(r.from, s), i, a);
		}), c = $(r.from, i, e.steps), l = e.doc.resolve(c).nodeAfter, !l) throw Error("Failed to apply modifications to node: unexpected ReplaceAroundStep as oldNode is null");
		if (l.marks.filter((e) => !s.marks.some((t) => t.eq(e))).forEach((s) => {
			s.type !== o && Xi(e, t, n, new Zn(r.from, s), i, a);
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
		for (let o of u) s.attrs[o] !== l.attrs[o] && Ji(e, t, n, new Yn(r.from, o, s.attrs[o]), i, a);
		return !0;
	}
	return !1;
}
function Qi(e, t, n, r, i, a) {
	if (Zi(e, t, n, r, i, a)) return !0;
	let o = r.apply(n).doc;
	if (!o) return !1;
	let s = r.getMap().map(r.from, -1), c = r.getMap().map(r.to, 1), l = o.resolve(s).blockRange(o.resolve(c));
	if (!l) return !1;
	let u = tr(n, r.getMap().invert().map(l.start), r.getMap().invert().map(l.end), zi(o, l.start, l.end));
	return u ? Gi(e, t, n, u, i, a) : !1;
}
//#endregion
//#region src/components/doc-editor/suggestions/vendor/withSuggestChanges.ts
function $i(e) {
	return e instanceof $n ? Gi : e instanceof Qn ? Qi : e instanceof qn ? Ki : e instanceof Xn ? Yi : e instanceof Jn ? qi : e instanceof Zn ? Xi : e instanceof Yn ? Ji : (e, t, n, r, i) => {
		let a = i.slice().reverse().reduce((e, t) => e?.map(t.getMap().invert()) ?? null, r), o = e.steps.reduce((e, t) => e?.map(t.getMap()) ?? null, a);
		return o && e.step(o), !1;
	};
}
function ea(e, t, n) {
	J(t.schema);
	let r = n(t.schema, e.docs[0]), i = t.tr;
	for (let a = 0; a < e.steps.length; a++) {
		let o = e.steps[a], s = e.docs[a];
		$i(o)(i, t, s, o, e.steps.slice(0, a), r) && a < e.steps.length - 1 && (r = n(t.schema, i.doc));
	}
	if (e.selectionSet && !i.selectionSet) {
		let t = e.docs[0], n = t ? e.selection.map(t, e.mapping.invert()) : e.selection;
		i.setSelection(n.map(i.doc, i.mapping));
	}
	return e.scrolledIntoView && i.scrollIntoView(), e.storedMarksSet && i.setStoredMarks(e.storedMarks), i.meta = e.meta, i;
}
function ta(e) {
	let t = e.getMeta("y-sync$") ?? {};
	return !!e.getMeta("history$") || !!e.getMeta("collab$") || !!t.isUndoRedoOperation || !!t.isChangeOrigin || "skip" in (e.getMeta(X) ?? {});
}
//#endregion
//#region src/components/doc-editor/suggestions/marks.ts
var na = {
	user: {
		isRequired: !0,
		validate: Di,
		parseHTML: (e) => e.getAttribute("data-suggestion-user"),
		renderHTML: (e) => ({ "data-suggestion-user": e.user })
	},
	username: {
		isRequired: !0,
		validate: Di,
		parseHTML: (e) => e.getAttribute("data-suggestion-username"),
		renderHTML: (e) => ({ "data-suggestion-username": e.username })
	},
	date: {
		isRequired: !0,
		validate: Oi,
		parseHTML: (e) => {
			let t = e.getAttribute("data-suggestion-date");
			return t === null ? null : Number(t);
		},
		renderHTML: (e) => ({ "data-suggestion-date": String(e.date) })
	}
};
function ra(e) {
	return e.hasAttribute("data-suggestion-user") && e.hasAttribute("data-suggestion-username") && e.hasAttribute("data-suggestion-date");
}
var ia = "", aa = !1, oa = Hn.create({
	name: bi,
	inclusive: aa,
	excludes: ia,
	addAttributes() {
		return { ...na };
	},
	parseHTML() {
		return [{
			tag: "ins[data-suggestion-user]",
			priority: 60,
			getAttrs: (e) => ra(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"ins",
			Un(e, { class: "suggestion suggestion--insert" }),
			0
		];
	}
}), sa = Hn.create({
	name: xi,
	inclusive: aa,
	excludes: ia,
	addAttributes() {
		return { ...na };
	},
	parseHTML() {
		return [{
			tag: "del[data-suggestion-user]",
			priority: 60,
			getAttrs: (e) => ra(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"del",
			Un(e, { class: "suggestion suggestion--delete" }),
			0
		];
	}
}), ca = Hn.create({
	name: Si,
	inclusive: aa,
	excludes: ia,
	addAttributes() {
		return {
			...na,
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
			getAttrs: (e) => ra(e) ? null : !1
		}];
	},
	renderHTML({ HTMLAttributes: e }) {
		return [
			"span",
			Un(e, { class: "suggestion suggestion--modify" }),
			0
		];
	}
}), la = [
	oa,
	sa,
	ca
], ua = Vn.create({
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
		return [...la];
	},
	addProseMirrorPlugins() {
		return [Ni(this.options.enabled)];
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
		if (!Pi(n) || ta(e)) {
			t(e);
			return;
		}
		let { user: r, now: i } = this.options, a = this.storage.authorOverride ?? r;
		t(ea(e, n, () => Ti(a.id, a.name, i())));
	},
	addCommands() {
		return {
			setSuggestionMode: (e) => ({ state: t, dispatch: n }) => X.getState(t) ? (n?.(t.tr.setMeta(X, {
				skip: !0,
				enabled: e
			})), !0) : !1,
			toggleSuggestionMode: () => ({ state: e, dispatch: t }) => {
				let n = X.getState(e);
				return n ? (t?.(e.tr.setMeta(X, {
					skip: !0,
					enabled: !n.enabled
				})), !0) : !1;
			},
			acceptSuggestion: (e) => ({ state: t, dispatch: n }) => Vi(e)(t, n),
			rejectSuggestion: (e) => ({ state: t, dispatch: n }) => Ui(e)(t, n),
			acceptAllSuggestions: () => ({ state: e, dispatch: t }) => Bi(e, t),
			rejectAllSuggestions: () => ({ state: e, dispatch: t }) => Hi(e, t),
			selectSuggestion: (e) => ({ state: t, dispatch: n }) => Wi(e)(t, n)
		};
	},
	addKeyboardShortcuts() {
		return { "Mod-Shift-e": () => this.editor.commands.toggleSuggestionMode() };
	}
});
function da(e, t, n) {
	let r = e.storage.suggestChanges;
	if (!r) throw Error("authorSuggestionsAs: the SuggestChanges extension is not on this editor");
	let i = r.authorOverride, a = Pi(e.state);
	r.authorOverride = t, a || e.commands.setSuggestionMode(!0);
	try {
		n();
	} finally {
		a || e.commands.setSuggestionMode(!1), r.authorOverride = i;
	}
}
function fa(e, t = "AI proposal") {
	return {
		id: `ai:${e}`,
		name: t
	};
}
//#endregion
//#region src/components/doc-editor/suggestions/listSuggestions.ts
function pa(e) {
	return e.split("​").join("");
}
function ma(e) {
	let t = e.inserted.length > 0, n = e.deleted.length > 0;
	return t && n ? "replace" : t ? "insert" : n ? "delete" : "modify";
}
function ha(e) {
	let { insertion: t, deletion: n, modification: r } = J(e.type.schema), i = /* @__PURE__ */ new Map(), a = [];
	return e.descendants((o, s) => {
		let c = o.isText ? e.resolve(s).before(e.resolve(s).depth) : s;
		for (let e of o.marks) {
			if (e.type !== t && e.type !== n && e.type !== r) continue;
			let l = K(e);
			if (!l) continue;
			let u = Ei(l), d = i.get(u);
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
			kind: ma(t),
			from: t.from,
			to: t.to,
			insertedText: pa(t.inserted.join("")),
			insertedBlocks: t.insertedBlocks.map(pa).filter((e) => e.length > 0),
			deletedText: pa(t.deleted.join(""))
		};
	});
}
//#endregion
//#region src/components/doc-editor/suggestions/suggestionAuthor.ts
var ga = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function _a({ person: e, model: t }) {
	let n = e.trim(), r = t?.trim();
	return n ? r ? `${n} (powered by ${r})` : n : r ?? "";
}
function va(e) {
	let t = (e ?? "").trim();
	if (!t) return { person: "" };
	let n = ga.exec(t);
	if (!n) return { person: t };
	let r = n[1].trim(), i = n[2].trim();
	return !r || !i ? { person: t } : {
		person: r,
		model: i
	};
}
function ya(e) {
	return _a(va(e.username));
}
//#endregion
//#region src/components/doc-editor/suggestions/viewModes.ts
var ba = [
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
function xa(e) {
	return Li(e);
}
function Sa(e) {
	return Ri(e);
}
function Ca(e, t) {
	switch (t) {
		case "final": return xa(e);
		case "original": return Sa(e);
		case "all-markup":
		case "simple-markup": return e;
	}
}
function wa(e, t) {
	return Wn.create({
		schema: e.schema,
		doc: Ca(e.doc, t)
	});
}
function Ta(e) {
	return `suggestion-view-${e}`;
}
//#endregion
//#region src/components/doc-editor/SuggestionReviewList.tsx
function Ea({ count: e, children: t, onAcceptAll: o, onRejectAll: s, acceptLabel: c = "Accept all", selectedCount: l, error: u = null, headerExtra: d, emptyTitle: f = "No suggestions", emptyBody: p = "Proposed changes to this document show up here for review.", title: m = "Suggestions", variant: g = "card", className: _, "data-testid": y = "suggestion-review-list" }) {
	let b = e > 0 && (o || s), x = b || d ? /* @__PURE__ */ W("span", {
		className: "flex items-center gap-1.5",
		children: [
			d,
			b && s && /* @__PURE__ */ U(r, {
				variant: "ghost",
				size: "sm",
				onClick: s,
				"data-testid": `${y}-reject-all`,
				children: "Reject all"
			}),
			b && o && /* @__PURE__ */ U(r, {
				variant: "secondary",
				size: "sm",
				onClick: o,
				disabled: l === 0,
				"data-testid": `${y}-accept-all`,
				children: l === void 0 ? c : `${c} (${l})`
			})
		]
	}) : void 0, S = /* @__PURE__ */ W(H, { children: [u && /* @__PURE__ */ U("div", {
		className: n("pt-2", g === "card" && "px-3"),
		children: /* @__PURE__ */ U(h, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${y}-error`,
			children: u
		})
	}), e === 0 ? /* @__PURE__ */ U(v, {
		size: "sm",
		title: f,
		body: p,
		testId: `${y}-empty`
	}) : /* @__PURE__ */ U("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${y}-list`,
		children: t
	})] });
	return g === "pane" ? /* @__PURE__ */ W("div", {
		className: n("flex min-h-0 flex-1 flex-col", _),
		"data-testid": y,
		"data-variant": "pane",
		children: [/* @__PURE__ */ W("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ U("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${y}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), x]
		}), /* @__PURE__ */ U("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: S
		})]
	}) : /* @__PURE__ */ W(i, {
		padding: "none",
		className: n("overflow-hidden", _),
		"data-testid": y,
		children: [/* @__PURE__ */ U(w, {
			title: m,
			meta: /* @__PURE__ */ U(a, {
				tone: "neutral",
				size: "xs",
				mono: !0,
				children: String(e)
			}),
			action: x
		}), S]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function Da({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, o] = V(""), [s, c] = V(!1), [l, u] = V(null), d = B(!1);
	async function m(e) {
		if (!d.current) {
			d.current = !0, c(!0), u(null);
			try {
				await e(), o("");
			} catch (e) {
				u(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				d.current = !1, c(!1);
			}
		}
	}
	let h = e.reviewerName || e.reviewerId, g = e.state.replace(/_/g, " "), _ = g.charAt(0).toUpperCase() + g.slice(1);
	return /* @__PURE__ */ U(be, {
		"aria-label": `Review by ${h}`,
		"aria-busy": s,
		children: /* @__PURE__ */ W(f, {
			gap: "sm",
			children: [
				/* @__PURE__ */ W(p, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ U("strong", { children: h }),
						/* @__PURE__ */ U(a, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: _
						}),
						e.required && /* @__PURE__ */ U(a, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ U(te, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ U("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ U("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				l && /* @__PURE__ */ U(C, {
					tone: "error",
					children: l
				}),
				t && e.state === "pending" && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(b, {
					value: i,
					onChange: (e) => o(e.target.value),
					rows: 2,
					disabled: s,
					"aria-label": `Review comment for ${h}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ W(p, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ U(r, {
						size: "sm",
						variant: "secondary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ U(r, {
						size: "sm",
						variant: "primary",
						disabled: s,
						onClick: () => void m(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ U(r, {
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
function Oa({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: o, onRequest: s, onDecide: c, onWithdraw: l }) {
	let [u, d] = V(""), [m, h] = V(""), [g, _] = V(!0), [v, y] = V(!1), [x, S] = V(null), w = B(!1);
	async function T() {
		if (!(!s || !t.some((e) => e.id === u) || w.current)) {
			w.current = !0, y(!0), S(null);
			try {
				await s({
					reviewerId: u,
					note: m.trim(),
					required: g
				}), h(""), d("");
			} catch (e) {
				S(e instanceof Error ? e.message : "The review could not be requested.");
			} finally {
				w.current = !1, y(!1);
			}
		}
	}
	return /* @__PURE__ */ W(f, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ U(C, {
				tone: "error",
				children: a
			}),
			s && /* @__PURE__ */ W(f, {
				gap: "sm",
				children: [
					/* @__PURE__ */ U(ne, {
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
					/* @__PURE__ */ U(b, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: v,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ W(p, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ U(D, {
							checked: g,
							onChange: _,
							disabled: v
						}), "Required review"]
					}),
					x && /* @__PURE__ */ U(C, {
						tone: "error",
						children: x
					}),
					/* @__PURE__ */ U(r, {
						size: "sm",
						disabled: v || i || !t.some((e) => e.id === u),
						onClick: () => void T(),
						children: v ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ U(le, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ U(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: o,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ U(Da, {
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
var ka = [
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
function Aa({ filled: e }) {
	return /* @__PURE__ */ U("svg", {
		width: 16,
		height: 16,
		viewBox: "0 0 16 16",
		fill: e ? "currentColor" : "none",
		stroke: "currentColor",
		strokeWidth: 1.4,
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", { d: "M8 1.9l1.8 3.7 4.1.6-3 2.9.7 4.1L8 11.3l-3.6 1.9.7-4.1-3-2.9 4.1-.6L8 1.9Z" })
	});
}
function ja({ breadcrumbs: e, title: t, onTitleChange: r, titleLabel: i = "File name", kind: c, starred: u = !1, onStarredChange: d, statusPill: f, path: p, crumbsTrailing: h, subtitle: g, metaBar: _, participants: v, onParticipantClick: y, onFollowParticipant: b, followingParticipantId: x, meta: S, saveState: C, headActions: w, tabs: ee, activeTab: te, onTabChange: ne, toolbar: D, children: ie, footer: O, proposal: k, surface: ae = "workspace", explorer: A, workbench: j, label: oe = "Editor", variant: M = "document", itemType: N, itemKey: se, titleSize: P = "md", titleOverflow: ce = "truncate", tabsTrailing: le, className: ue, "data-testid": F = "editor-shell" }) {
	let I = M === "work-item", de = I && (N || se) ? /* @__PURE__ */ W(H, { children: [N && /* @__PURE__ */ U(a, {
		size: "sm",
		tone: "info",
		"data-testid": `${F}-item-type`,
		children: N
	}), se && /* @__PURE__ */ U("span", {
		className: "font-mono text-[12px] text-text-secondary",
		"data-testid": `${F}-item-key`,
		children: se
	})] }) : null, fe = de || h != null ? /* @__PURE__ */ W(H, { children: [de, h] }) : null, pe = I && (e && e.length > 0 || fe != null), me = P === "lg" ? "text-[26px] font-semibold leading-8" : I ? "text-[22px] font-bold leading-7" : "text-xl font-bold leading-6", he = `${F}-${In().replace(/:/g, "")}`, ge = !!ee && ee.length > 0, _e = ge ? ee.some((e) => e.id === te) ? te : ee[0].id : void 0, ve = v && v.length > 0 || S != null || !!C, ye = (e) => /* @__PURE__ */ U(o, {
		items: ee.map((e) => ({
			id: e.id,
			label: e.label,
			...e.disabled ? { disabled: !0 } : {},
			...e.count ? { badge: I ? /* @__PURE__ */ U("span", {
				"aria-label": `${e.count} in ${e.label}`,
				children: e.count
			}) : /* @__PURE__ */ U(m, {
				variant: "count",
				value: e.count,
				color: "muted",
				"aria-label": `${e.count} in ${e.label}`
			}) } : {},
			testId: `${F}-tab-${e.id}`
		})),
		value: _e,
		onValueChange: (e) => ne?.(e),
		variant: "underline",
		...I ? { badgeStyle: "plain" } : {},
		size: "md",
		itemClassName: "px-3.5 pb-1.5 pt-1 leading-5",
		"aria-label": `${t} sections`,
		idPrefix: he,
		className: e
	}), be = /* @__PURE__ */ W("section", {
		"aria-label": oe,
		"data-testid": F,
		"data-surface": ae,
		className: "flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-surface",
		children: [
			/* @__PURE__ */ W("header", {
				className: "flex flex-col gap-1 border-b border-border px-5 pt-3",
				"data-variant": M,
				"data-testid": `${F}-header`,
				children: [
					pe && /* @__PURE__ */ W("div", {
						className: "flex h-7 min-w-0 items-center gap-2 text-[13px] text-text-secondary",
						"data-testid": `${F}-crumbs-row`,
						children: [
							/* @__PURE__ */ U(l, {
								dir: "right",
								size: 12,
								"aria-hidden": "true",
								className: "-ml-1 shrink-0 text-text-tertiary"
							}),
							e && e.length > 0 && /* @__PURE__ */ U(T, {
								items: e,
								maxItems: 4,
								lastIsCurrent: !1,
								size: "sm",
								className: "min-w-0",
								"data-testid": `${F}-crumbs`
							}),
							e && e.length > 0 && fe != null && /* @__PURE__ */ U("span", {
								"aria-hidden": "true",
								className: "shrink-0 text-text-tertiary",
								children: "/"
							}),
							fe != null && /* @__PURE__ */ U("span", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${F}-crumbs-trailing`,
								children: fe
							}),
							/* @__PURE__ */ U("span", { className: "flex-1" }),
							w && /* @__PURE__ */ U("div", {
								className: "flex shrink-0 items-center gap-2",
								"data-testid": `${F}-actions`,
								children: w
							})
						]
					}),
					!I && e && e.length > 0 && !h && /* @__PURE__ */ U(T, {
						items: e,
						maxItems: 4,
						size: "sm",
						className: "[@media(max-height:640px)]:hidden",
						"data-testid": `${F}-crumbs`
					}),
					!I && h && /* @__PURE__ */ W("div", {
						className: "flex min-w-0 items-center gap-2 text-xs [@media(max-height:640px)]:hidden",
						"data-testid": `${F}-crumbs-row`,
						children: [e && e.length > 0 && /* @__PURE__ */ U(T, {
							items: e,
							maxItems: 4,
							size: "sm",
							className: "min-w-0",
							"data-testid": `${F}-crumbs`
						}), /* @__PURE__ */ U("span", {
							className: "flex shrink-0 items-center gap-2",
							"data-testid": `${F}-crumbs-trailing`,
							children: h
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1",
						"data-testid": `${F}-head-row`,
						children: [
							c && !I && /* @__PURE__ */ U(re, {
								kind: c,
								size: "2xl",
								variant: "outline",
								className: "[@media(max-height:640px)]:h-8 [@media(max-height:640px)]:w-8",
								"data-testid": `${F}-kind`
							}),
							/* @__PURE__ */ W("div", {
								className: "flex min-w-0 flex-[1_1_18rem] flex-col gap-0 [@media(max-height:640px)]:flex-row [@media(max-height:640px)]:items-center [@media(max-height:640px)]:gap-3",
								children: [
									/* @__PURE__ */ W("div", {
										className: "flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1 [@media(max-height:640px)]:flex-1",
										children: [
											/* @__PURE__ */ W("span", {
												className: "flex min-w-0 max-w-full flex-initial flex-nowrap items-center gap-x-2",
												"data-testid": `${F}-title-group`,
												children: [r ? /* @__PURE__ */ U(Re, {
													value: t,
													onCommit: r,
													label: i,
													required: !0,
													fitContent: !0,
													className: n("min-w-0 max-w-full flex-initial py-0", me, I && "relative -left-[5px]"),
													"data-testid": `${F}-title`
												}) : /* @__PURE__ */ U("h1", {
													className: n("m-0 min-w-0 max-w-full flex-initial text-text-primary", me, ce === "wrap" ? "whitespace-normal break-words" : "truncate"),
													"data-testid": `${F}-title`,
													children: t
												}), d && /* @__PURE__ */ U(s, {
													size: "sm",
													"aria-label": u ? "Remove star" : "Star this file",
													"aria-pressed": u,
													title: u ? "Starred" : "Star",
													onClick: () => d(!u),
													className: u ? "shrink-0 text-primary" : "shrink-0 text-text-tertiary",
													"data-testid": `${F}-star`,
													children: /* @__PURE__ */ U(Aa, { filled: u })
												})]
											}),
											f,
											p && p.length > 0 && /* @__PURE__ */ U("span", {
												className: "flex min-w-0 flex-1 items-center border-l border-border pl-3",
												"data-testid": `${F}-path`,
												children: /* @__PURE__ */ U(T, {
													items: p,
													maxItems: 4,
													lastIsCurrent: !1,
													size: "sm",
													className: "min-w-0",
													"data-testid": `${F}-path-crumbs`
												})
											})
										]
									}),
									g != null && /* @__PURE__ */ U("p", {
										className: "m-0 min-w-0 truncate text-[15px] leading-5 text-text-secondary [@media(max-height:640px)]:hidden",
										"data-testid": `${F}-subtitle`,
										children: g
									}),
									ve && /* @__PURE__ */ W("div", {
										className: "flex min-w-0 flex-wrap items-center gap-2 text-[13px] text-text-tertiary [@media(max-height:640px)]:max-w-[50%] [@media(max-height:640px)]:flex-nowrap",
										"data-testid": `${F}-byline`,
										children: [
											v && v.length > 0 && /* @__PURE__ */ U(E, {
												users: v,
												size: 22,
												maxVisible: 4,
												...y ? { onUserClick: y } : {},
												...b ? {
													onFollowUser: b,
													followingUserId: x ?? null
												} : {}
											}),
											S != null && /* @__PURE__ */ U("span", {
												className: "min-w-0 truncate",
												children: S
											}),
											/* @__PURE__ */ U(Ct, {
												state: C,
												className: "text-[13px]"
											})
										]
									})
								]
							}),
							w && !pe && /* @__PURE__ */ U("div", {
								className: "ml-auto flex shrink-0 flex-wrap items-center gap-3",
								"data-testid": `${F}-actions`,
								children: w
							})
						]
					}),
					_ != null && /* @__PURE__ */ U("div", {
						className: n("flex min-w-0 items-center", I ? P === "lg" ? "pb-2 pt-1" : "pb-2 pt-3" : "py-2"),
						"data-testid": `${F}-meta-bar`,
						children: _
					}),
					le == null ? ge ? ye("-mb-px -ml-3 mt-1 border-b-0") : /* @__PURE__ */ U("span", {
						className: "h-2",
						"aria-hidden": "true"
					}) : /* @__PURE__ */ W("div", {
						className: "-mb-px mt-1 flex min-w-0 items-end gap-3",
						"data-testid": `${F}-tabs-row`,
						children: [ge ? ye("-ml-3 min-w-0 flex-1 border-b-0") : /* @__PURE__ */ U("span", {
							className: "flex-1",
							"aria-hidden": "true"
						}), /* @__PURE__ */ U("div", {
							className: "flex shrink-0 items-center gap-2 pb-1.5",
							"data-testid": `${F}-tabs-trailing`,
							children: le
						})]
					})
				]
			}),
			D && /* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-1 border-b border-border px-[var(--dock-inset,1rem)] py-1.5",
				"data-testid": `${F}-toolbar`,
				children: D
			}),
			/* @__PURE__ */ W("div", {
				className: n("relative flex min-h-0 flex-1 flex-col", ae === "workspace" ? "bg-workspace" : "bg-surface"),
				"data-testid": `${F}-surface`,
				children: [
					/* @__PURE__ */ U("div", {
						...ge ? {
							role: "tabpanel",
							id: `${he}-panel-${_e}`,
							"aria-labelledby": `${he}-tab-${_e}`
						} : {},
						className: n("flex-1 overflow-auto", k != null || O != null ? "min-h-28" : "min-h-0"),
						"data-testid": `${F}-scroller`,
						children: ie
					}),
					k != null && /* @__PURE__ */ U("div", {
						className: "relative z-20 max-h-[40%] min-h-16 shrink overflow-auto px-[var(--dock-inset,1rem)] pb-1 pt-2",
						"data-testid": `${F}-proposal`,
						children: k
					}),
					O != null && /* @__PURE__ */ U("div", {
						className: "relative z-20 flex max-h-[max(var(--dock-max-height,50%),var(--dock-floor,0px))] min-h-0 shrink-0 flex-col",
						"data-testid": `${F}-dock`,
						children: /* @__PURE__ */ U(mt.Provider, {
							value: "pinned",
							children: O
						})
					})
				]
			})
		]
	});
	return !A && !j ? /* @__PURE__ */ U("div", {
		className: n("flex h-full min-h-0 flex-col", ue),
		children: be
	}) : /* @__PURE__ */ W("div", {
		className: n("flex h-full min-h-0 flex-col lg:flex-row", ue),
		"data-testid": `${F}-frame`,
		children: [A && /* @__PURE__ */ U("div", {
			className: "flex max-h-72 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border bg-surface lg:max-h-none lg:w-64 lg:border-b-0 lg:border-r",
			"data-testid": `${F}-explorer`,
			children: A
		}), /* @__PURE__ */ W("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col lg:flex-row",
			children: [be, j && /* @__PURE__ */ U("div", {
				className: "order-first flex max-h-64 min-h-0 shrink-0 flex-col overflow-y-auto border-b border-border lg:order-none lg:max-h-none lg:w-80 lg:border-b-0 lg:border-l",
				"data-testid": `${F}-workbench`,
				children: j
			})]
		})]
	});
}
//#endregion
//#region src/components/doc-editor/DictationButton.tsx
var Ma = 250;
function Na(e, t, n) {
	return n || (e === "unsupported" ? "Dictation needs a microphone and a secure page" : t ? "Listening — release to insert" : e === "transcribing" ? "Transcribing…" : e === "starting" ? "Starting the microphone…" : "Hold to dictate");
}
function Pa({ state: e, micActive: t, unavailableReason: r, onStart: i, onStop: a, className: o, "data-testid": s = "dictation-button" }) {
	let c = B(null), l = Na(e, t, r), u = e === "transcribing" || e === "starting", f = () => {
		if (t) {
			a(), c.current = null;
			return;
		}
		c.current = Date.now(), i();
	}, p = () => {
		let e = c.current;
		e !== null && (c.current = null, !(Date.now() - e < 250) && a());
	};
	return /* @__PURE__ */ U("button", {
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
		children: /* @__PURE__ */ U(d, {
			size: 15,
			"aria-hidden": "true"
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentReplyComposer.tsx
var Fa = {
	resolve: "/resolve",
	agent: "/agent",
	assign: "/assign"
};
function Ia(e) {
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
			let t = e.command?.trigger === Fa.assign ? e.command.argument : void 0, n = (t?.label ?? r).replace(/^@/, "").trim();
			return {
				kind: "assign",
				userId: t?.id ?? null,
				name: n
			};
		}
	}
}
var La = Fn(function({ mentionUsers: e, onReply: t, onResolve: r, onAskAgent: i, onAssign: a, onCancel: o, dictation: s, placeholder: c = "Reply or type /", variant: l = "card", submitLabel: u = "Reply", className: d, "data-testid": f = "comment-reply-composer" }, p) {
	let m = B(null);
	Ln(p, () => ({
		focus: () => m.current?.focus(),
		insertText: (e) => {
			let t = m.current;
			if (!t) return;
			let n = t.editor?.getText() ?? "";
			t.insertText(n && !/\s$/.test(n) ? ` ${e}` : e);
		}
	}), []);
	let h = z(() => e.filter((e) => e.type === "user"), [e]), g = L((t) => {
		let n = t.trim().toLowerCase();
		return e.filter((e) => !n || e.displayName.toLowerCase().includes(n)).slice(0, 8).map((e) => ({
			id: e.userId,
			label: e.displayName,
			color: e.color,
			...e.type === "group" ? { hint: `${e.memberCount ?? 0} people` } : {}
		}));
	}, [e]), _ = z(() => {
		let e = [];
		return r && e.push({
			trigger: Fa.resolve,
			label: "Resolve thread"
		}), i && e.push({
			trigger: Fa.agent,
			label: "Ask the agent"
		}), a && e.push({
			trigger: Fa.assign,
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
	]), v = L(async (e) => {
		let n = Ia(e);
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
	return /* @__PURE__ */ U("div", {
		className: n("flex flex-col gap-1", d),
		"data-testid": f,
		onKeyDown: (e) => {
			e.key === "Escape" && o && (e.stopPropagation(), o());
		},
		children: /* @__PURE__ */ U(Pn, {
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
			...s ? { submitLead: /* @__PURE__ */ U(Pa, {
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
function Ra({ author: e, quote: t, variant: r = "agent", resolveOnApply: i = !1, onResolveOnApplyChange: a, onDismiss: o, className: s, "data-testid": l = "comment-handoff-bar" }) {
	let d = r === "reply", f = d ? "Stop replying" : "Stop answering this comment";
	return /* @__PURE__ */ W("div", {
		role: "status",
		"data-testid": l,
		"data-variant": r,
		className: n("flex min-w-0 items-center gap-3 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-text-secondary shadow-sm", s),
		children: [
			d ? /* @__PURE__ */ U(c, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-primary"
			}) : /* @__PURE__ */ U(u, {
				size: 14,
				"aria-hidden": "true",
				className: "shrink-0 text-info-fg"
			}),
			/* @__PURE__ */ W("span", {
				className: "min-w-0 flex-1 truncate",
				children: [
					d ? "Replying to " : "Answering ",
					/* @__PURE__ */ U("span", {
						className: "font-semibold text-text-primary",
						children: e
					}),
					d ? null : "’s comment",
					t ? /* @__PURE__ */ W("span", {
						className: "text-text-tertiary",
						children: [
							" on “",
							t,
							"”"
						]
					}) : null
				]
			}),
			d ? /* @__PURE__ */ U("span", {
				className: "hidden shrink-0 text-text-tertiary sm:inline",
				children: "Esc to go back"
			}) : /* @__PURE__ */ W("label", {
				className: "inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-text-primary",
				children: [/* @__PURE__ */ U(D, {
					checked: i,
					onChange: (e) => a?.(e),
					"data-testid": `${l}-resolve`
				}), "Resolve when applied"]
			}),
			/* @__PURE__ */ U("button", {
				type: "button",
				onClick: o,
				"aria-label": f,
				title: f,
				"data-testid": `${l}-dismiss`,
				className: "grid h-6 w-6 shrink-0 place-items-center rounded border-0 bg-transparent p-0 text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
				children: /* @__PURE__ */ U("span", {
					"aria-hidden": "true",
					children: "×"
				})
			})
		]
	});
}
//#endregion
export { Tr as AckMode, Jt as ActionItemsCard, jr as ActivityFeed, Nt as AttachmentsPanel, pn as AuthenticatedDocumentImageView, it as BULLET_STYLES, Pt as CANVAS_BODY_KEY, It as CANVAS_SCHEMA_VERSION, ti as COMMENT_MARGIN_STORAGE_KEY, Fa as COMMENT_REPLY_COMMANDS, hn as CanvasDocumentView, nt as CanvasLineSpacing, st as CanvasListStyle, Cr as ChunkViewer, Lt as CommentContextHeader, Zr as CommentGhostPopover, Ra as CommentHandoffBar, La as CommentReplyComposer, rn as CommentThreadNode, mt as ComposerDockPlacementContext, ke as DECK_THEMES, ka as DEFAULT_EDITOR_SHELL_TABS, Ma as DICTATION_HOLD_MS, ft as DOCK_HEIGHT_VAR, pt as DOCK_INSET_VAR, At as DOCUMENT_MODE_LABELS, Sn as DOCUMENT_TOOLBAR_BREAKPOINTS, Pa as DictationButton, en as DiffViewer, tn as DocumentEditorPage, xn as DocumentFindBar, _n as DocumentGutter, ht as DocumentHeader, wn as DocumentImageProvider, Kt as DocumentLifecyclePill, lr as DocumentListPage, bt as DocumentModePill, ln as DocumentOutline, Ot as DocumentOwnership, Oa as DocumentReviewPanel, jn as DocumentRuler, Ct as DocumentSaveStatus, oi as DocumentShareDialog, mn as DocumentStatusBar, yn as DocumentToolbar, Mr as EMPTY_DECK_PRESENCE, ja as EditorShell, et as EditorToolbar, Ht as ExecutiveSummaryCard, Le as Filmstrip, Pe as FilmstripThumb, dt as FloatingComposerDock, ei as FloatingDockBar, qt as FollowModeBar, Zt as HeaderBanner, nn as KeyDecisionsCard, ut as LINE_SPACINGS, Qe as LINE_SPACING_LABELS, tt as LIST_STYLE_LABELS, On as MAX_ATTACHMENT_BYTES, Oe as MAX_BULLETS_PER_SLIDE, Se as MAX_BULLET_CHARS, Ue as MAX_CHART_LABELS, Ke as MAX_CHART_SERIES, we as MAX_EYEBROW_CHARS, Cn as MAX_IMAGE_BYTES, Ge as MAX_NOTES_CHARS, he as MAX_QUOTE_CHARS, j as MAX_SLIDES, We as MAX_SOURCES_PER_SLIDE, ge as MAX_SUBTITLE_CHARS, M as MAX_TITLE_CHARS, Xe as MULTILEVEL_STYLES, an as MentionDropdown, Rt as MyMentionsPanel, at as NUMBER_STYLES, xe as NewDocumentModal, se as OLDER_REVISIONS_VALUE, dn as PX_PER_INCH, Et as ParticipantAvatars, Ae as PresentationEditor, ye as PresentationView, Gr as ProposalCard, Ve as ProposedEditStrip, Bt as ReaderMode, sn as ResolvedBanner, Wt as ReviewMode, _r as ReviewProgress, xr as ReviewableItem, ii as SHARE_ROLES, Ie as SLIDES_TOOLBAR_BREAKPOINTS, oe as SLIDE_ID_PATTERN, Be as SLIDE_INSERTS, fe as SLIDE_LAYOUTS, Me as SLIDE_LAYOUT_LABELS, si as SUGGESTION_AUTHORING_MODES, Ci as SUGGESTION_DATE_BUCKET_MS, ba as SUGGESTION_VIEW_MODES, vt as SectionBlock, Ut as SectionComments, yt as SectionList, Vt as SectionSummariesCard, Ee as SlideForm, ve as SlideList, P as SlideRow, De as SlideSources, He as SlideStage, Te as SlidesToolbar, Ce as SpeakerNotes, mr as StandaloneTiptap, ua as SuggestChanges, gi as SuggestionCard, sa as SuggestionDelete, oa as SuggestionInsert, la as SuggestionMarks, ci as SuggestionModeControl, ca as SuggestionModify, Ea as SuggestionReviewList, $t as TableOfContents, O as TaskItemRow, k as TaskList, lt as TiptapEditor, Xt as VersionHistoryPanel, kt as VideoCallPanel, $r as VideoDockSlot, Gt as VideoHistoryPanel, Kr as WorkItemRow, Dt as WorkspaceDocumentHeaderNotices, Mn as ZOOM_FIT, un as ZOOM_STEPS, En as acceptsDocumentImage, ae as addSlide, da as authorSuggestionsAs, wi as bucketSuggestionDate, je as canSaveDeck, xt as canvasBody, Ft as canvasFragmentToMarkdown, ur as clientIdForUser, Ia as commentReplyIntent, zt as countAllComments, Dn as createAuthenticatedDocumentImage, Ti as createSuggestionIdentity, Nr as deckPresenceChannel, vi as deckTitleFrom, zr as deckViewerToParticipant, Lr as deckViewersOf, Na as dictationButtonLabel, Ca as docForViewMode, vn as documentToolbarSize, I as duplicateSlide, Rr as editingInMyOtherTab, xa as finalDoc, jt as findDocumentTarget, kn as findMatches, _a as formatSuggestionAuthor, Yt as generateSummaryBullets, on as getInitials, Tt as isCanvasDocument, $e as isLineSpacing, Pi as isSuggestChangesEnabled, ot as lineSpacingAttributes, ha as listSuggestions, ct as listTypeFor, de as makeSlide, pe as moveSlide, gn as nextMatchIndex, N as nextRevisionLabel, ce as nextSlideId, Sa as originalDoc, _i as parseDeckText, rt as parseLineSpacing, Ze as parseListStyle, va as parseSuggestionAuthor, wa as previewStateForViewMode, fa as proposalAuthor, Fe as proposedEditPlacement, ze as proposedEditPreview, ni as readCommentMarginPreference, An as readOutline, Qt as readSchemaVersion, yi as recordingIdFor, Mt as relativeTime, F as removeSlide, me as replaceSlide, Xr as replyLabel, _t as resolverLabel, ue as revisionPickerOptions, q as sameSuggestion, cn as scrollToDocumentTarget, Ne as slidesToolbarSize, Tn as stackOffsets, ya as suggestionAuthorLabel, K as suggestionIdentityOf, Ei as suggestionKey, _e as svgDataUri, qe as uncitedSlideIds, ri as useCommentMarginPreference, Br as useDeckPresence, St as useDocumentActions, bn as useDocumentImageUpload, Nn as useDocumentOutline, fn as useDocumentToolbarSize, dr as useFollowCursor, wt as useIsCanvasDocument, gt as useSidebarPanels, Ta as viewModeClassName, A as withLayoutDefaults };
