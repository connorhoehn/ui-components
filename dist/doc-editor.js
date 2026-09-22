import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-BhS4-R6_.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { n as o, t as s } from "./Stack-CkiMw5K0.js";
import { a as c, i as l, n as u, r as d } from "./Text-DIl-Ssia.js";
import { t as f } from "./Banner-C3Wgh62A.js";
import { t as p } from "./Chip-BENLwTlq.js";
import { t as m } from "./Modal-CyoyiNKN.js";
import { t as h } from "./EmptyState-JzzL2z1E.js";
import { t as g } from "./Input-DLknWXri.js";
import { t as _ } from "./Textarea-Dz4doxTv.js";
import { t as v } from "./Avatar-BzicCOft.js";
import { t as y } from "./SegmentedControl-BhRaBRce.js";
import { t as b } from "./InlineAlert-CRnIKeAF.js";
import { t as x } from "./CardHeader-CsPhVpCm.js";
import { t as S } from "./InlinePopover-CG_Jwga7.js";
import { t as C } from "./SectionLabel-hq1ieKla.js";
import { t as w } from "./ChangeDiff-CzO8zCc-.js";
import { t as T } from "./StatusPill-Db42eiME.js";
import { t as E } from "./Select-CqVokE2v.js";
import { t as D } from "./Checkbox-DqN9RkXK.js";
import { t as O } from "./activationKey-CjbL3LUv.js";
import { A as k, k as A } from "./renderers-9QJtVt3f.js";
import { i as j, n as ee, t as M } from "./InboxSection-Ccg2hhFg.js";
import { o as te, t as ne } from "./VerdictChip-h9KAEWjC.js";
import { a as N, c as P, i as F, n as I, o as re, r as L, s as R, t as z } from "./TiptapEditor-Kdj65m6g.js";
import { A as B, B as V, C as H, D as ie, E as U, F as ae, H as oe, I as se, L as ce, M as le, N as ue, O as de, P as fe, R as pe, S as me, T as he, V as ge, _ as _e, a as ve, b as ye, c as be, d as xe, f as Se, g as Ce, h as we, i as Te, j as Ee, k as De, l as Oe, m as ke, o as Ae, p as je, r as Me, s as Ne, t as Pe, u as Fe, v as Ie, w as Le, x as Re, y as ze, z as Be } from "./DocumentEditorPage-BXpiipg3.js";
import { _ as Ve, a as He, c as Ue, d as We, f as Ge, g as Ke, h as qe, i as Je, l as Ye, m as Xe, n as Ze, o as Qe, p as $e, r as et, s as tt, t as nt, u as rt, v as it, y as at } from "./useDocumentImageUpload-Bc5eOs-m.js";
import { createContext as ot, useCallback as W, useContext as st, useEffect as G, useId as ct, useImperativeHandle as lt, useMemo as K, useRef as q, useState as J } from "react";
import { Fragment as Y, jsx as X, jsxs as Z } from "react/jsx-runtime";
import * as ut from "yjs";
import { NodeViewWrapper as dt, ReactNodeViewRenderer as ft } from "@tiptap/react";
import { relativePositionToAbsolutePosition as pt, ySyncPluginKey as mt } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function ht(e) {
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
var gt = {
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
function _t({ status: e }) {
	let t = gt[e] ?? gt.draft;
	return /* @__PURE__ */ X("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var vt = {
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
function yt({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Z("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = vt[e.mode ?? "editor"] ?? vt.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function bt({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = J(!1), [u, d] = J(null), [f, p] = J(null), [m, h] = J(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), v = K(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), y = W((e, t, n) => {
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
				children: v.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ Z("div", {
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
											/* @__PURE__ */ X(_t, { status: e.status }),
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
										children: ["Updated ", ht(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ X("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ X(yt, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ X("button", {
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
			e.length > 10 && /* @__PURE__ */ Z("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ X("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ Z("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ X("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ X(j, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function xt(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function St({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = mt.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = pt(t.doc, t.type, ut.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var Ct = "prosemirror";
function wt(e) {
	return e.ydoc !== void 0;
}
function Tt(e) {
	return wt(e) ? /* @__PURE__ */ X(Et, { ...e }) : /* @__PURE__ */ X(Dt, { ...e });
}
function Et({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = Ct, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = K(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = q(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ X("div", {
		className: n(c),
		children: /* @__PURE__ */ X(z, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Dt({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = Ct, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
		children: /* @__PURE__ */ X(z, {
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
function Ot({ current: e, total: t }) {
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
var kt = {
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
}, At = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, jt = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Mt({ item: e, onAck: t, onReject: r }) {
	let [i, a] = J(!1), [o, s] = J(""), [c, l] = J("none"), u = q(e.status), d = kt[e.status] ?? jt, f = At[e.priority] ?? "var(--color-neutral)", [p, m] = J(!1), h = q(null);
	G(() => () => {
		h.current && clearTimeout(h.current);
	}, []), G(() => {
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
							background: d.bg,
							color: d.text
						},
						children: e.status
					}),
					/* @__PURE__ */ X("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: f,
							border: `1px solid ${f}`
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
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ X("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: p,
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
				children: [/* @__PURE__ */ X(_, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && g()), e.key === "Escape" && (a(!1), s(""));
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
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ X("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: p,
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
var Nt = {
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
function Pt({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = Nt[e.type] ?? Nt.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
				children: /* @__PURE__ */ X(z, {
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
			e.items.length > 0 && /* @__PURE__ */ Z("div", { children: [e.items.map((e) => /* @__PURE__ */ X(Mt, {
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
			c && /* @__PURE__ */ X(Ce, {
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
function Ft({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
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
		/* @__PURE__ */ X(Ot, {
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
				}), /* @__PURE__ */ X(Pt, {
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
function It(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Lt(e, t) {
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
function Rt(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function zt(e) {
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
function Bt(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function Vt({ events: e, participants: t }) {
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
					Bt(e.mode),
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
						children: Rt(e.displayName || "Unknown")
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
								It(e.eventType),
								" ",
								Lt(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ X("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: zt(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var Ht = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Ut = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function Wt({ label: e, children: t }) {
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
var Gt = {
	field: "Field change",
	prose: "Body text"
};
function Kt({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: s, targetReason: c, before: l, after: u, edits: d, rationale: f, draftError: m, author: h, category: _, path: y, locationHint: b, verdict: x, verdictStatus: S = "idle", verdictError: C, revision: T, onRereview: E, onAccept: D, onReject: O, onRedraft: k, onReattach: A, onConfirmAttachment: j, className: ee, "data-testid": M = "proposal-card" }) {
	let [N, P] = J(!1), [F, I] = J(null), [re, L] = J(!1), [R, z] = J(""), B = i === "applied", V = i === "rejected", H = B || V;
	async function ie() {
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
	let U = t === "prose" ? d ?? [] : [{
		before: l ?? "",
		after: u ?? ""
	}];
	return /* @__PURE__ */ Z("div", {
		"data-testid": M,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", B ? "border-success-border" : "border-border", V && "opacity-60", ee),
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ X("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${M}-category`,
						children: _ ?? Gt[t]
					}),
					h && /* @__PURE__ */ Z("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${M}-requester`,
						children: [/* @__PURE__ */ X(v, {
							name: h.name,
							size: 18,
							...h.avatarUrl ? { src: h.avatarUrl } : {}
						}), /* @__PURE__ */ X("span", {
							className: "truncate text-xs text-text-secondary",
							children: h.name
						})]
					}),
					/* @__PURE__ */ X("span", { className: "flex-1" }),
					/* @__PURE__ */ X(p, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${M}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ X(p, {
						tone: Ut[a],
						size: "sm",
						children: Ht[a]
					}),
					o === "healed" && /* @__PURE__ */ X(p, {
						tone: "caution",
						size: "sm",
						"data-testid": `${M}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ X(p, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					B && /* @__PURE__ */ X(p, {
						tone: "success",
						size: "sm",
						"data-testid": `${M}-applied`,
						children: "Applied"
					}),
					V && /* @__PURE__ */ X(p, {
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
			/* @__PURE__ */ X(te, {
				path: y ?? (s ? [s] : []),
				...b ? { hint: b } : {},
				"data-testid": `${M}-location`
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1",
				children: [c && /* @__PURE__ */ X(Wt, {
					label: "Why",
					children: c
				}), f && /* @__PURE__ */ X(Wt, {
					label: "Rationale",
					children: f
				})]
			}),
			i === "drafting" && /* @__PURE__ */ X("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${M}-drafting`,
				children: "Drafting a proposal…"
			}),
			m && /* @__PURE__ */ X("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${M}-draft-error`,
				children: m
			}),
			i !== "drafting" && !m && U.length > 0 && /* @__PURE__ */ X(w, {
				pairs: U,
				"data-testid": `${M}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ X(ne, {
				verdict: x,
				status: S,
				error: C,
				revision: T,
				"data-testid": `${M}-verdict`
			}),
			F && !F.ok && /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${M}-apply-error`,
				children: [
					/* @__PURE__ */ X("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ X("span", { children: F.message ?? "The document refused the change." }),
					F.stale && /* @__PURE__ */ Z("span", { children: [
						"Drafted against ",
						JSON.stringify(F.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(F.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!H && /* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "primary",
						disabled: N || i === "drafting" || !!m,
						onClick: ie,
						"data-testid": `${M}-accept`,
						children: N ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: () => L((e) => !e),
						"data-testid": `${M}-reject`,
						children: "Reject"
					}),
					k && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: k,
						"data-testid": `${M}-redraft`,
						children: "Re-draft"
					}),
					E && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: E,
						"data-testid": `${M}-rereview`,
						children: "Re-run review"
					}),
					A && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						disabled: N,
						onClick: A,
						"data-testid": `${M}-reattach`,
						children: "Move…"
					}),
					j && o === "author_only" && /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "secondary",
						disabled: N,
						onClick: j,
						"data-testid": `${M}-confirm`,
						children: "Right place"
					})
				]
			}),
			re && !H && /* @__PURE__ */ Z("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ X("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${M}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ X(g, {
						id: `${M}-reason`,
						size: "sm",
						value: R,
						onChange: (e) => z(e.target.value),
						"data-testid": `${M}-reason`
					}),
					/* @__PURE__ */ Z("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ X(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								O(R), L(!1);
							},
							"data-testid": `${M}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ X(r, {
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
function qt({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: s, contextSplit: c, drafting: l = !1, draftError: u, candidates: d, sections: f, onPropose: m, onAttach: h, onDismiss: g, className: _, "data-testid": v = `work-item-${e}` }) {
	let y = [...d ?? []].sort((e, t) => t.score - e.score), b = new Set(y.map((e) => e.sectionId)), x = f.filter((e) => !b.has(e.id));
	return /* @__PURE__ */ X(i, {
		padding: "sm",
		className: _,
		"data-testid": v,
		"data-item-id": e,
		children: /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ X(p, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), c && /* @__PURE__ */ X(p, {
						tone: "caution",
						size: "sm",
						"data-testid": `${v}-split`,
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
				s && /* @__PURE__ */ X("p", {
					className: "text-xs text-text-tertiary",
					children: s
				}),
				u && /* @__PURE__ */ X("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${v}-draft-error`,
					children: u
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "primary",
						disabled: l,
						onClick: m,
						"data-testid": `${v}-propose`,
						children: l ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${v}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && y.length > 0 && /* @__PURE__ */ Z("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ X("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), y.map((e) => /* @__PURE__ */ Z(r, {
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
				a && x.length > 0 && /* @__PURE__ */ Z("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ X("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ X(E, {
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
var Jt = "[data-comment-id]", Yt = 240;
function Xt(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Zt(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Qt({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: s, ref: c, "data-testid": l = "comment-ghost" }) {
	let [u, d] = J(null), f = q(null), m = q(null), h = q(null);
	h.current = u;
	let g = K(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), _ = q(g);
	_.current = g;
	let y = W(() => {
		m.current !== null && (clearTimeout(m.current), m.current = null);
	}, []), b = W(() => {
		y(), d(null);
	}, [y]), x = W((e, n, r) => {
		if (y(), !_.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Xt(e)}"]`) ?? null;
		i instanceof HTMLElement && (f.current = i, d({
			id: e,
			via: r
		}));
	}, [y, t]);
	lt(c, () => ({
		openComment: (e, t) => x(e, t, "click"),
		close: b
	}), [x, b]);
	let C = q(null), w = u?.id ?? null;
	G(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), G(() => y, [y]), G(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Jt) : null, a = (e) => {
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
			}, Yt));
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
	return /* @__PURE__ */ X(S, {
		trigger: f,
		open: !!T,
		onClose: b,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": l,
		children: T && /* @__PURE__ */ Z("div", {
			"data-testid": `${l}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: y,
			onMouseLeave: () => {
				y(), m.current = setTimeout(() => {
					h.current?.via === "hover" && b();
				}, Yt);
			},
			children: [
				/* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ X(v, {
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
							children: ye(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ X(p, {
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
						"data-testid": `${l}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Zt(T.replyCount ?? 0)
					}), /* @__PURE__ */ Z("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ X(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${l}-open`,
							children: "Open thread"
						}), s && !T.resolved && /* @__PURE__ */ X(r, {
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
function $t() {
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
function en({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
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
					icon: /* @__PURE__ */ X($t, {}),
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
//#region src/components/doc-editor/FloatingDockBar.tsx
function tn({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ X("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ X("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ X("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ X("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var nn = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], rn = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function an({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: c, onInvite: l, onCopyLink: u, notice: d, "data-testid": f = "document-share-dialog" }) {
	let [p, h] = J(""), g = () => {
		let e = p.trim();
		!e || !l || (l(e), h(""));
	};
	return /* @__PURE__ */ X(m, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ Z("div", {
			className: "flex flex-col gap-4",
			"data-testid": f,
			children: [
				l && /* @__PURE__ */ Z("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ X("input", {
						value: p,
						onChange: (e) => h(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && g();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${f}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						onClick: g,
						disabled: !p.trim(),
						"data-testid": `${f}-invite`,
						children: "Invite"
					})]
				}),
				d && /* @__PURE__ */ X("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${f}-notice`,
					children: d
				}),
				/* @__PURE__ */ X("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${f}-people`,
					children: i.map((e) => /* @__PURE__ */ Z("div", {
						className: "flex items-center gap-2",
						"data-testid": `${f}-person`,
						children: [
							/* @__PURE__ */ X(v, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ X("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !c ? /* @__PURE__ */ X("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${f}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ X("select", {
								value: e.role,
								onChange: (t) => c(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${f}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: nn.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ X("option", {
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
						"data-testid": `${f}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(rn).map((e) => /* @__PURE__ */ X("option", {
							value: e,
							children: rn[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ Z("div", {
					className: "flex items-center justify-between",
					children: [u ? /* @__PURE__ */ X(r, {
						variant: "secondary",
						size: "sm",
						onClick: u,
						"data-testid": `${f}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ X("span", {}), /* @__PURE__ */ X(r, {
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
function on({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = $.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = $.find((t) => t.value === e);
	return /* @__PURE__ */ Z("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ X(y, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ X("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var sn = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, cn = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, ln = 6, un = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function dn(e) {
	let t = un.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function fn(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function pn({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, ln), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Z("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ X(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > ln && /* @__PURE__ */ Z("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - ln,
				" more"
			]
		})]
	});
}
function mn({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: f, onReject: p, className: m, "data-testid": h = "suggestion-card" }) {
	let { person: g, model: _ } = dn(t.trim() === "" ? "Unknown author" : t.trim()), y = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = y.length > 0 || b.length > 0;
	return /* @__PURE__ */ Z("div", {
		"data-testid": h,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", m),
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ X(v, {
						name: g,
						size: 20
					}),
					/* @__PURE__ */ X("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: g,
						"data-testid": `${h}-author`,
						children: g
					}),
					i !== null && /* @__PURE__ */ X("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: fn(i)
					}),
					/* @__PURE__ */ X("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", cn[e]),
						"data-testid": `${h}-kind`,
						children: sn[e]
					})
				]
			}),
			(_ || a) && /* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					_ && /* @__PURE__ */ Z("span", {
						"data-testid": `${h}-model`,
						children: ["powered by ", _]
					}),
					_ && a && /* @__PURE__ */ X("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ Z("span", {
						"data-testid": `${h}-context`,
						children: ["in ", a]
					})
				]
			}),
			x && /* @__PURE__ */ Z("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${h}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [b.length > 0 && /* @__PURE__ */ X(pn, {
					lines: b,
					tone: "delete",
					testId: `${h}-deleted`
				}), y.length > 0 && /* @__PURE__ */ X(pn, {
					lines: y,
					tone: "insert",
					testId: `${h}-inserted`
				})]
			}),
			(d || f || p) && /* @__PURE__ */ Z("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ X(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${h}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					p && /* @__PURE__ */ X(r, {
						variant: "ghost",
						size: "sm",
						onClick: p,
						"data-testid": `${h}-reject`,
						children: "Reject"
					}),
					f && /* @__PURE__ */ X(r, {
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
function hn({ count: e, children: t, onAcceptAll: a, onRejectAll: o, error: s = null, headerExtra: c, emptyTitle: l = "No suggestions", emptyBody: u = "Proposed changes to this document show up here for review.", title: d = "Suggestions", variant: m = "card", className: g, "data-testid": _ = "suggestion-review-list" }) {
	let v = e > 0 && (a || o), y = v || c ? /* @__PURE__ */ Z("span", {
		className: "flex items-center gap-1.5",
		children: [
			c,
			v && o && /* @__PURE__ */ X(r, {
				variant: "ghost",
				size: "sm",
				onClick: o,
				"data-testid": `${_}-reject-all`,
				children: "Reject all"
			}),
			v && a && /* @__PURE__ */ X(r, {
				variant: "secondary",
				size: "sm",
				onClick: a,
				"data-testid": `${_}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, b = /* @__PURE__ */ Z(Y, { children: [s && /* @__PURE__ */ X("div", {
		className: n("pt-2", m === "card" && "px-3"),
		children: /* @__PURE__ */ X(f, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${_}-error`,
			children: s
		})
	}), e === 0 ? /* @__PURE__ */ X(h, {
		size: "sm",
		title: l,
		body: u,
		testId: `${_}-empty`
	}) : /* @__PURE__ */ X("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${_}-list`,
		children: t
	})] });
	return m === "pane" ? /* @__PURE__ */ Z("div", {
		className: n("flex min-h-0 flex-1 flex-col", g),
		"data-testid": _,
		"data-variant": "pane",
		children: [/* @__PURE__ */ Z("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ X("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${_}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), y]
		}), /* @__PURE__ */ X("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: b
		})]
	}) : /* @__PURE__ */ Z(i, {
		padding: "none",
		className: n("overflow-hidden", g),
		"data-testid": _,
		children: [/* @__PURE__ */ X(x, {
			title: d,
			meta: /* @__PURE__ */ X(p, {
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
var gn = (e) => e.startsWith("/api/uploads/"), _n = ot(null);
function vn({ children: e, ...t }) {
	return /* @__PURE__ */ X(_n.Provider, {
		value: t,
		children: e
	});
}
function yn({ node: e, selected: t }) {
	let n = e.attrs.src ?? "", r = e.attrs.alt ?? "", i = e.attrs.title ?? "", a = st(_n), o = a?.loadImage, s = a?.requiresAuthentication ?? gn, [c, l] = J(null), u = s(n), d = c?.src === n && c.loader === o ? c : null, f = u ? d?.url : n, p = u && !!d?.failed;
	return G(() => {
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
	]), /* @__PURE__ */ X(dt, {
		as: "div",
		"data-testid": "canvas-document-image",
		"data-image-state": p ? "failed" : f ? "ready" : "loading",
		children: f && !p ? /* @__PURE__ */ X("img", {
			src: f,
			alt: r,
			...i ? { title: i } : {},
			className: t ? "ProseMirror-selectednode" : void 0,
			draggable: !1
		}) : /* @__PURE__ */ X("span", {
			className: p ? "text-sm italic text-danger-fg" : "text-sm italic text-text-tertiary",
			"data-testid": "canvas-document-image-fallback",
			children: p ? `Could not load ${r || "image"}` : "Loading image…"
		})
	});
}
function bn(e) {
	return e.configure({
		inline: !1,
		allowBase64: !1
	}).extend({ addNodeView() {
		return ft(yn);
	} });
}
//#endregion
//#region src/components/doc-editor/DocumentReviewPanel.tsx
function xn({ request: e, onDecide: t, onWithdraw: n }) {
	let [i, a] = J(""), [c, l] = J(!1), [u, f] = J(null), m = q(!1);
	async function h(e) {
		if (!m.current) {
			m.current = !0, l(!0), f(null);
			try {
				await e(), a("");
			} catch (e) {
				f(e instanceof Error ? e.message : "The review could not be updated.");
			} finally {
				m.current = !1, l(!1);
			}
		}
	}
	let g = e.reviewerName || e.reviewerId, v = e.state.replace(/_/g, " ");
	return /* @__PURE__ */ X(ee, {
		"aria-label": `Review by ${g}`,
		"aria-busy": c,
		children: /* @__PURE__ */ Z(o, {
			gap: "sm",
			children: [
				/* @__PURE__ */ Z(s, {
					gap: "sm",
					wrap: !0,
					children: [
						/* @__PURE__ */ X("strong", { children: g }),
						/* @__PURE__ */ X(p, {
							size: "xs",
							tone: e.state === "approved" ? "success" : e.state === "changes_requested" ? "warning" : "neutral",
							children: v
						}),
						e.required && /* @__PURE__ */ X(p, {
							size: "xs",
							tone: "warning",
							children: "Required"
						})
					]
				}),
				/* @__PURE__ */ X(d, { items: [`Requested by ${e.requestedByName || e.requestedBy}`, e.dueDate ? `Due ${e.dueDate}` : null] }),
				e.note && /* @__PURE__ */ X("p", {
					className: "m-0 text-sm text-text-primary whitespace-pre-wrap",
					children: e.note
				}),
				e.comment && /* @__PURE__ */ X("p", {
					className: "m-0 text-sm text-text-secondary whitespace-pre-wrap",
					children: e.comment
				}),
				u && /* @__PURE__ */ X(b, {
					tone: "error",
					children: u
				}),
				t && e.state === "pending" && /* @__PURE__ */ Z(Y, { children: [/* @__PURE__ */ X(_, {
					value: i,
					onChange: (e) => a(e.target.value),
					rows: 2,
					disabled: c,
					"aria-label": `Review comment for ${g}`,
					placeholder: "Add a comment (optional)"
				}), /* @__PURE__ */ Z(s, {
					gap: "sm",
					wrap: !0,
					children: [/* @__PURE__ */ X(r, {
						size: "sm",
						variant: "secondary",
						disabled: c,
						onClick: () => void h(() => t(e.requestKey, "changes_requested", i)),
						children: "Request changes"
					}), /* @__PURE__ */ X(r, {
						size: "sm",
						variant: "primary",
						disabled: c,
						onClick: () => void h(() => t(e.requestKey, "approved", i)),
						children: "Approve review"
					})]
				})] }),
				n && e.state === "pending" && /* @__PURE__ */ X(r, {
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
function Sn({ requests: e, reviewers: t = [], currentUserId: n, loading: i, error: a, onRefresh: c, onRequest: l, onDecide: u, onWithdraw: d }) {
	let [f, p] = J(""), [m, h] = J(""), [g, v] = J(!0), [y, x] = J(!1), [S, C] = J(null), w = q(!1);
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
	return /* @__PURE__ */ Z(o, {
		gap: "md",
		children: [
			a && /* @__PURE__ */ X(b, {
				tone: "error",
				children: a
			}),
			l && /* @__PURE__ */ Z(o, {
				gap: "sm",
				children: [
					/* @__PURE__ */ X(E, {
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
					/* @__PURE__ */ X(_, {
						"aria-label": "Review request note",
						placeholder: "What should they review?",
						rows: 2,
						value: m,
						disabled: y,
						onChange: (e) => h(e.target.value)
					}),
					/* @__PURE__ */ Z(s, {
						as: "label",
						gap: "sm",
						align: "center",
						children: [/* @__PURE__ */ X(D, {
							checked: g,
							onChange: v,
							disabled: y
						}), "Required review"]
					}),
					S && /* @__PURE__ */ X(b, {
						tone: "error",
						children: S
					}),
					/* @__PURE__ */ X(r, {
						size: "sm",
						disabled: y || i || !t.some((e) => e.id === f),
						onClick: () => void T(),
						children: y ? "Requesting…" : "Request review"
					})
				]
			}),
			/* @__PURE__ */ X(M, {
				title: "Document reviews",
				count: e.length,
				hint: i ? "Loading…" : void 0,
				action: /* @__PURE__ */ X(r, {
					size: "sm",
					variant: "ghost",
					disabled: i,
					onClick: c,
					children: "Refresh reviews"
				}),
				empty: { title: i ? "Loading reviews…" : a ? "Reviews unavailable" : "No reviews requested" },
				children: e.map((e) => /* @__PURE__ */ X(xn, {
					request: e,
					onDecide: e.reviewerId === n ? u : void 0,
					onWithdraw: d
				}, e.requestKey))
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/PresentationView.tsx
function Cn({ back: e }) {
	return /* @__PURE__ */ X("svg", {
		viewBox: "0 0 16 16",
		className: n("h-3.5 w-3.5", e && "rotate-180"),
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ X("path", {
			d: "M6 3l5 5-5 5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function wn({ title: e, revisions: t, revisionId: i, onRevisionChange: o, slideIndex: s, onSlideChange: d, onDownload: f, downloadLabel: p = "Download .pptx", onOpenPreview: m, pending: g, notice: _, state: v = "ready", errorMessage: b, onRetry: x, className: S, "data-testid": w = "presentation-view" }) {
	let E = ct();
	if (v === "loading") return /* @__PURE__ */ X(l, {
		label: "Opening the presentation…",
		testId: `${w}-loading`
	});
	if (v === "error") return /* @__PURE__ */ X(c, {
		title: "This presentation could not be opened",
		...b ? { description: b } : {},
		...x ? {
			actionLabel: "Try again",
			onAction: x
		} : {},
		testId: `${w}-error`
	});
	let D = t.find((e) => e.id === i) ?? t[0], O = D?.slides ?? [];
	if (v === "empty" || !D || O.length === 0) return /* @__PURE__ */ Z("div", {
		className: n("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": w,
		children: [/* @__PURE__ */ X(u, {
			as: "div",
			className: "text-base font-semibold text-text-primary",
			children: e
		}), /* @__PURE__ */ X(h, {
			title: "No slides yet",
			description: g?.status === "generating" ? `${g.label} is still being generated.` : g?.status === "failed" ? g.message ?? `${g.label} failed.` : "This presentation has no rendered revision to show.",
			testId: `${w}-empty`
		})]
	});
	let k = O[Math.min(Math.max(s, 1), O.length) - 1];
	return /* @__PURE__ */ Z("div", {
		className: n("flex min-h-0 flex-col gap-3 p-4", S),
		"data-testid": w,
		children: [
			/* @__PURE__ */ Z("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ X(u, {
					as: "div",
					className: "text-base font-semibold text-text-primary",
					"data-testid": `${w}-title`,
					children: e
				}), /* @__PURE__ */ Z("div", {
					className: "flex items-center gap-2",
					children: [
						t.length > 1 && /* @__PURE__ */ X(y, {
							"aria-label": "Revision",
							size: "sm",
							value: D.id,
							onChange: o,
							options: t.map((e) => ({
								label: e.label,
								value: e.id
							})),
							"data-testid": `${w}-revisions`
						}),
						g && /* @__PURE__ */ X(T, {
							state: g.status === "failed" ? "error" : "pending",
							label: `${g.label} ${g.status}`,
							"data-testid": `${w}-pending`
						}),
						f && /* @__PURE__ */ X(r, {
							variant: "secondary",
							size: "sm",
							onClick: f,
							"data-testid": `${w}-download`,
							children: p
						})
					]
				})]
			}),
			/* @__PURE__ */ Z("div", {
				className: "flex min-h-0 flex-1 flex-col gap-3 md:flex-row",
				children: [/* @__PURE__ */ Z("div", {
					className: "flex min-w-0 flex-1 flex-col gap-2",
					children: [/* @__PURE__ */ X("div", {
						className: "flex min-h-[12rem] items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-hover/40",
						"data-testid": `${w}-stage`,
						children: k.preview ?? /* @__PURE__ */ X(u, {
							className: "text-[13px] text-text-tertiary",
							"data-testid": `${w}-no-preview`,
							children: "This slide’s preview could not be read."
						})
					}), /* @__PURE__ */ Z("div", {
						className: "flex items-center justify-center gap-2",
						children: [
							/* @__PURE__ */ X(a, {
								"aria-label": "Previous slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ X(Cn, { back: !0 }),
								disabled: k.index <= 1,
								onClick: () => d(k.index - 1),
								"data-testid": `${w}-previous`
							}),
							/* @__PURE__ */ X(u, {
								className: "text-[13px] text-text-secondary",
								"data-testid": `${w}-position`,
								children: `Slide ${k.index} of ${O.length}`
							}),
							/* @__PURE__ */ X(a, {
								"aria-label": "Next slide",
								variant: "ghost",
								size: "sm",
								icon: /* @__PURE__ */ X(Cn, {}),
								disabled: k.index >= O.length,
								onClick: () => d(k.index + 1),
								"data-testid": `${w}-next`
							}),
							m && k.preview && /* @__PURE__ */ X(r, {
								variant: "ghost",
								size: "sm",
								onClick: () => m(k.id),
								"data-testid": `${w}-open-preview`,
								children: "Open larger preview"
							})
						]
					})]
				}), /* @__PURE__ */ Z("nav", {
					className: "min-w-0 md:w-64",
					"aria-labelledby": E,
					"data-testid": `${w}-outline`,
					children: [/* @__PURE__ */ X(C, {
						as: "div",
						className: "mb-1",
						"data-testid": `${w}-outline-label`,
						children: /* @__PURE__ */ X("span", {
							id: E,
							children: "Slides"
						})
					}), /* @__PURE__ */ X("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0",
						children: O.map((e) => /* @__PURE__ */ X("li", { children: /* @__PURE__ */ Z("button", {
							type: "button",
							onClick: () => d(e.index),
							"aria-current": e.id === k.id ? "true" : void 0,
							className: n("flex w-full cursor-pointer items-baseline gap-2 rounded-md border-none bg-transparent px-2 py-1 text-left font-[inherit] text-[13px] text-text-primary transition-colors hover:bg-surface-hover", e.id === k.id && "bg-surface-hover font-medium"),
							"data-testid": `${w}-outline-row`,
							children: [/* @__PURE__ */ X("span", {
								className: "tabular-nums text-text-tertiary",
								children: e.index
							}), /* @__PURE__ */ X("span", {
								className: "truncate",
								children: e.title
							})]
						}) }, e.id))
					})]
				})]
			}),
			_ && /* @__PURE__ */ X(u, {
				className: "text-[11.5px] text-text-tertiary",
				"data-testid": `${w}-notice`,
				children: _
			})
		]
	});
}
//#endregion
export { Ft as AckMode, Oe as ActionItemsCard, Vt as ActivityFeed, me as AttachmentsPanel, yn as AuthenticatedDocumentImageView, ce as CANVAS_BODY_KEY, pe as CANVAS_SCHEMA_VERSION, He as CanvasDocumentView, I as CanvasLineSpacing, Pt as ChunkViewer, Qt as CommentGhostPopover, _e as CommentThreadNode, Ne as DiffViewer, Pe as DocumentEditorPage, Qe as DocumentFindBar, Ye as DocumentGutter, ie as DocumentHeader, vn as DocumentImageProvider, bt as DocumentListPage, De as DocumentModePill, Ve as DocumentOutline, de as DocumentOwnership, Sn as DocumentReviewPanel, it as DocumentRuler, B as DocumentSaveStatus, an as DocumentShareDialog, Xe as DocumentStatusBar, We as DocumentToolbar, P as EditorToolbar, Se as ExecutiveSummaryCard, tn as FloatingDockBar, U as FollowModeBar, je as HeaderBanner, Fe as KeyDecisionsCard, L as LINE_SPACINGS, F as LINE_SPACING_LABELS, nt as MAX_ATTACHMENT_BYTES, Ze as MAX_IMAGE_BYTES, Re as MentionDropdown, ve as MyMentionsPanel, j as NewDocumentModal, at as PX_PER_INCH, Ee as ParticipantAvatars, wn as PresentationView, Kt as ProposalCard, be as ReaderMode, we as ReviewMode, Ot as ReviewProgress, Mt as ReviewableItem, nn as SHARE_ROLES, $ as SUGGESTION_AUTHORING_MODES, Le as SectionBlock, Ce as SectionComments, H as SectionList, xe as SectionSummariesCard, Tt as StandaloneTiptap, mn as SuggestionCard, on as SuggestionModeControl, hn as SuggestionReviewList, Me as TableOfContents, k as TaskItemRow, A as TaskList, z as TiptapEditor, Ae as VersionHistoryPanel, he as VideoCallPanel, en as VideoDockSlot, Te as VideoHistoryPanel, qt as WorkItemRow, qe as ZOOM_FIT, Ke as ZOOM_STEPS, et as acceptsDocumentImage, Be as canvasBody, ae as canvasFragmentToMarkdown, xt as clientIdForUser, Ie as countAllComments, bn as createAuthenticatedDocumentImage, le as findDocumentTarget, tt as findMatches, ke as generateSummaryBullets, ze as getInitials, V as isCanvasDocument, N as isLineSpacing, re as lineSpacingAttributes, Ue as nextMatchIndex, R as parseLineSpacing, Ge as readOutline, ge as readSchemaVersion, ye as relativeTime, Zt as replyLabel, ue as scrollToDocumentTarget, rt as stackOffsets, se as useDocumentActions, Je as useDocumentImageUpload, $e as useDocumentOutline, St as useFollowCursor, oe as useIsCanvasDocument, fe as useSidebarPanels };
