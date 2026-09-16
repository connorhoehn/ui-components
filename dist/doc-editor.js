import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-BhS4-R6_.js";
import { t as i } from "./Card-RQCeAPNU.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { t as o } from "./Banner-C3Wgh62A.js";
import { t as s } from "./Chip-BENLwTlq.js";
import { t as c } from "./Modal-CyoyiNKN.js";
import { t as l } from "./EmptyState-JzzL2z1E.js";
import { t as u } from "./Input-DLknWXri.js";
import { t as d } from "./Textarea-Dz4doxTv.js";
import { t as f } from "./Avatar-BzicCOft.js";
import { t as p } from "./SegmentedControl-18MqeMsn.js";
import { t as m } from "./CardHeader-CsPhVpCm.js";
import { t as h } from "./InlinePopover-D25AtkYZ.js";
import { t as g } from "./ChangeDiff-CzO8zCc-.js";
import { t as _ } from "./Select-CqVokE2v.js";
import { t as v } from "./activationKey-CjbL3LUv.js";
import { A as y, k as b } from "./renderers-9QJtVt3f.js";
import { n as x } from "./ErrorBoundary-B8XtFqCN.js";
import { o as S, t as C } from "./VerdictChip-h9KAEWjC.js";
import { a as w, c as T, i as E, n as ee, o as D, r as te, s as ne, t as O } from "./TiptapEditor-Kdj65m6g.js";
import { A as k, C as A, D as re, E as j, F as M, I as N, L as P, M as F, N as ie, O as I, P as L, R as ae, S as R, T as z, _ as B, a as oe, b as V, c as se, d as ce, f as le, g as ue, h as de, i as fe, j as pe, k as me, l as he, m as ge, o as _e, p as ve, r as ye, s as be, t as xe, u as Se, v as Ce, w as we, x as Te, y as Ee, z as De } from "./DocumentEditorPage-Ca2MCK9F.js";
import { a as Oe, c as ke, d as Ae, f as je, h as Me, i as Ne, l as Pe, m as Fe, n as Ie, o as Le, p as Re, r as ze, s as Be, t as Ve, u as He } from "./CanvasDocumentView-BkP5mFI6.js";
import { useCallback as H, useEffect as U, useImperativeHandle as Ue, useMemo as W, useRef as G, useState as K } from "react";
import { Fragment as q, jsx as J, jsxs as Y } from "react/jsx-runtime";
import * as We from "yjs";
import { relativePositionToAbsolutePosition as Ge, ySyncPluginKey as Ke } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function qe(e) {
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
var Je = {
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
function Ye({ status: e }) {
	let t = Je[e] ?? Je.draft;
	return /* @__PURE__ */ J("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var Xe = {
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
function Ze({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Y("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = Xe[e.mode ?? "editor"] ?? Xe.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ Y("button", {
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
					/* @__PURE__ */ J("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ J("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ J("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ Y("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function Qe({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = K(!1), [u, d] = K(null), [f, p] = K(null), [m, h] = K(1), g = Math.max(1, Math.ceil(e.length / 10)), _ = Math.min(m, g), y = W(() => {
		let t = (_ - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, _]), b = H((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ Y("div", {
		className: n("px-4"),
		children: [
			!s && /* @__PURE__ */ Y("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ J("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ Y("button", {
					"data-testid": "new-document-btn",
					onClick: () => l(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ J("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ J("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ J("div", {
				className: n("flex flex-col gap-3"),
				children: y.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || f === e.id;
					return /* @__PURE__ */ Y("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: v(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => p(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || p((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ J("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ Y("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ Y("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ J("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ J(Ye, { status: e.status }),
											e.type && /* @__PURE__ */ J("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ Y("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ J("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ J("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ Y("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", qe(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ J("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ J(Ze, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ J("button", {
								type: "button",
								onClick: (t) => b(t, e.id, e.title),
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
			e.length > 10 && /* @__PURE__ */ Y("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ J("button", {
						"data-testid": "pagination-prev",
						disabled: _ <= 1,
						onClick: () => h((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ Y("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							_,
							" of ",
							g
						]
					}),
					/* @__PURE__ */ J("button", {
						"data-testid": "pagination-next",
						disabled: _ >= g,
						onClick: () => h((e) => Math.min(g, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", _ >= g ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ J(x, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function $e(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function et({ editor: e, provider: t, followClientId: n, onLost: r }) {
	U(() => {
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
				let t = Ke.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = Ge(t.doc, t.type, We.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var tt = "prosemirror";
function nt(e) {
	return e.ydoc !== void 0;
}
function rt(e) {
	return nt(e) ? /* @__PURE__ */ J(it, { ...e }) : /* @__PURE__ */ J(at, { ...e });
}
function it({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = tt, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = W(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = G(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ J("div", {
		className: n(c),
		children: /* @__PURE__ */ J(O, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function at({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = tt, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
	let h = o ?? `doc:${i}`, g = G(/* @__PURE__ */ new Set()), _ = H((e) => (g.current.add(e), () => {
		g.current.delete(e);
	}), []), v = H((e) => {
		g.current.forEach((t) => t(e));
	}, []), y = W(() => ({
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
	}), w = W(() => x ? x.getXmlFragment(c) : null, [x, c]), T = !!x && !!w && (m !== !0 || C), E = G(!1);
	return !E.current && T && w && x && (E.current = !0, f?.(w, x)), T ? /* @__PURE__ */ J("div", {
		className: n(d),
		children: /* @__PURE__ */ J(O, {
			fragment: w,
			ydoc: x,
			provider: S,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ J("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function ot({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ Y("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ Y("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ Y("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ Y("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ J("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ J("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var st = {
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
}, ct = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, lt = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function ut({ item: e, onAck: t, onReject: r }) {
	let [i, a] = K(!1), [o, s] = K(""), [c, l] = K("none"), u = G(e.status), f = st[e.status] ?? lt, p = ct[e.priority] ?? "var(--color-neutral)", [m, h] = K(!1), g = G(null);
	U(() => () => {
		g.current && clearTimeout(g.current);
	}, []), U(() => {
		u.current === "pending" && e.status === "acked" ? l("ack") : u.current === "pending" && e.status === "rejected" && l("reject"), u.current = e.status;
	}, [e.status]);
	let _ = () => {
		m || (h(!0), l("ack"), g.current = setTimeout(() => {
			g.current = null, t(o || void 0), s(""), a(!1), h(!1);
		}, 150));
	}, v = () => {
		if (!m) {
			if (!o.trim()) {
				a(!0);
				return;
			}
			h(!0), l("reject"), g.current = setTimeout(() => {
				g.current = null, r(o), s(""), a(!1), h(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ Y("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", c === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : c === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ Y("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ J("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ J("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: f.bg,
							color: f.text
						},
						children: e.status
					}),
					/* @__PURE__ */ J("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: p,
							border: `1px solid ${p}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ Y("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ J("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ Y("span", { children: [
					"Approved by ",
					/* @__PURE__ */ J("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ Y(q, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Y(q, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ Y("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ J("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ Y("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ J("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ Y(q, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ Y(q, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ Y("div", { children: [/* @__PURE__ */ Y("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ J("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: m,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ J("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: m,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ J("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ Y("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ J(d, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && _()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ Y("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ J("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: _,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ J("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ J("button", {
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
var dt = {
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
function ft({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = dt[e.type] ?? dt.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ Y("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ J("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ J("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ J("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ J(O, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ Y("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ Y("div", { children: [e.items.map((e) => /* @__PURE__ */ J(ut, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ Y("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ J(ue, {
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
var X = 4;
function pt({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = K(0), _ = Math.max(1, Math.ceil(e.length / X)), v = h * X, y = e.slice(v, v + X);
	if (U(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / X)), s?.());
	}, [
		o,
		e.length,
		s
	]), U(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ J("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ Y("div", { children: [
		/* @__PURE__ */ J(ot, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ J("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ Y("div", { children: [a.length > 0 && /* @__PURE__ */ Y("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ J("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ J("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ J(ft, {
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
		/* @__PURE__ */ Y("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ J("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ Y("span", {
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
				/* @__PURE__ */ J("button", {
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
function mt(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function ht(e, t) {
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
function gt(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function _t(e) {
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
function vt(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function yt({ events: e, participants: t }) {
	let [r, i] = K(!1);
	return /* @__PURE__ */ Y("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ Y("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ Y("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ J("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ Y(q, { children: [t.length > 0 && /* @__PURE__ */ Y("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ J("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ Y("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ J("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					vt(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ J("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ J("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ Y("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ J("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: gt(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ Y("div", { children: [
						/* @__PURE__ */ J("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ Y("span", {
							className: n("text-neutral"),
							children: [
								mt(e.eventType),
								" ",
								ht(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ J("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: _t(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var bt = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, xt = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function St({ label: e, children: t }) {
	return /* @__PURE__ */ Y("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ J("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ J("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
var Ct = {
	field: "Field change",
	prose: "Body text"
};
function wt({ utterance: e, kind: t, status: i, confidence: a, attachState: o, targetLabel: c, targetReason: l, before: d, after: p, edits: m, rationale: h, draftError: _, author: v, category: y, path: b, locationHint: x, verdict: w, verdictStatus: T = "idle", verdictError: E, revision: ee, onRereview: D, onAccept: te, onReject: ne, onRedraft: O, onReattach: k, onConfirmAttachment: A, className: re, "data-testid": j = "proposal-card" }) {
	let [M, N] = K(!1), [P, F] = K(null), [ie, I] = K(!1), [L, ae] = K(""), R = i === "applied", z = i === "rejected", B = R || z;
	async function oe() {
		N(!0), F(null);
		try {
			let e = await te();
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
	let V = t === "prose" ? m ?? [] : [{
		before: d ?? "",
		after: p ?? ""
	}];
	return /* @__PURE__ */ Y("div", {
		"data-testid": j,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", R ? "border-success-border" : "border-border", z && "opacity-60", re),
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ J("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${j}-category`,
						children: y ?? Ct[t]
					}),
					v && /* @__PURE__ */ Y("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${j}-requester`,
						children: [/* @__PURE__ */ J(f, {
							name: v.name,
							size: 18,
							...v.avatarUrl ? { src: v.avatarUrl } : {}
						}), /* @__PURE__ */ J("span", {
							className: "truncate text-xs text-text-secondary",
							children: v.name
						})]
					}),
					/* @__PURE__ */ J("span", { className: "flex-1" }),
					/* @__PURE__ */ J(s, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${j}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ J(s, {
						tone: xt[a],
						size: "sm",
						children: bt[a]
					}),
					o === "healed" && /* @__PURE__ */ J(s, {
						tone: "caution",
						size: "sm",
						"data-testid": `${j}-healed`,
						children: "Re-found by quote — check this"
					}),
					o === "author_only" && /* @__PURE__ */ J(s, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					R && /* @__PURE__ */ J(s, {
						tone: "success",
						size: "sm",
						"data-testid": `${j}-applied`,
						children: "Applied"
					}),
					z && /* @__PURE__ */ J(s, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ Y("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ J(S, {
				path: b ?? (c ? [c] : []),
				...x ? { hint: x } : {},
				"data-testid": `${j}-location`
			}),
			/* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-1",
				children: [l && /* @__PURE__ */ J(St, {
					label: "Why",
					children: l
				}), h && /* @__PURE__ */ J(St, {
					label: "Rationale",
					children: h
				})]
			}),
			i === "drafting" && /* @__PURE__ */ J("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${j}-drafting`,
				children: "Drafting a proposal…"
			}),
			_ && /* @__PURE__ */ J("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${j}-draft-error`,
				children: _
			}),
			i !== "drafting" && !_ && V.length > 0 && /* @__PURE__ */ J(g, {
				pairs: V,
				"data-testid": `${j}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ J(C, {
				verdict: w,
				status: T,
				error: E,
				revision: ee,
				"data-testid": `${j}-verdict`
			}),
			P && !P.ok && /* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${j}-apply-error`,
				children: [
					/* @__PURE__ */ J("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ J("span", { children: P.message ?? "The document refused the change." }),
					P.stale && /* @__PURE__ */ Y("span", { children: [
						"Drafted against ",
						JSON.stringify(P.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(P.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!B && /* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ J(r, {
						size: "sm",
						variant: "primary",
						disabled: M || i === "drafting" || !!_,
						onClick: oe,
						"data-testid": `${j}-accept`,
						children: M ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ J(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: () => I((e) => !e),
						"data-testid": `${j}-reject`,
						children: "Reject"
					}),
					O && /* @__PURE__ */ J(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: O,
						"data-testid": `${j}-redraft`,
						children: "Re-draft"
					}),
					D && /* @__PURE__ */ J(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: D,
						"data-testid": `${j}-rereview`,
						children: "Re-run review"
					}),
					k && /* @__PURE__ */ J(r, {
						size: "sm",
						variant: "ghost",
						disabled: M,
						onClick: k,
						"data-testid": `${j}-reattach`,
						children: "Move…"
					}),
					A && o === "author_only" && /* @__PURE__ */ J(r, {
						size: "sm",
						variant: "secondary",
						disabled: M,
						onClick: A,
						"data-testid": `${j}-confirm`,
						children: "Right place"
					})
				]
			}),
			ie && !B && /* @__PURE__ */ Y("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ J("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${j}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ J(u, {
						id: `${j}-reason`,
						size: "sm",
						value: L,
						onChange: (e) => ae(e.target.value),
						"data-testid": `${j}-reason`
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ J(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								ne(L), I(!1);
							},
							"data-testid": `${j}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ J(r, {
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
function Tt({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: o, reason: c, contextSplit: l, drafting: u = !1, draftError: d, candidates: f, sections: p, onPropose: m, onAttach: h, onDismiss: g, className: v, "data-testid": y = `work-item-${e}` }) {
	let b = [...f ?? []].sort((e, t) => t.score - e.score), x = new Set(b.map((e) => e.sectionId)), S = p.filter((e) => !x.has(e.id));
	return /* @__PURE__ */ J(i, {
		padding: "sm",
		className: v,
		"data-testid": y,
		"data-item-id": e,
		children: /* @__PURE__ */ Y("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ Y("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ J(s, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : o ?? "Placed"
					}), l && /* @__PURE__ */ J(s, {
						tone: "caution",
						size: "sm",
						"data-testid": `${y}-split`,
						children: "The screen moved while you spoke"
					})]
				}),
				/* @__PURE__ */ Y("blockquote", {
					className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
					children: [
						"“",
						t,
						"”"
					]
				}),
				c && /* @__PURE__ */ J("p", {
					className: "text-xs text-text-tertiary",
					children: c
				}),
				d && /* @__PURE__ */ J("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${y}-draft-error`,
					children: d
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ J(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: m,
						"data-testid": `${y}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ J(r, {
						size: "sm",
						variant: "ghost",
						onClick: g,
						"data-testid": `${y}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && b.length > 0 && /* @__PURE__ */ Y("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), b.map((e) => /* @__PURE__ */ Y(r, {
						size: "sm",
						variant: "secondary",
						onClick: () => h(e.sectionId),
						"data-testid": `${y}-candidate`,
						children: [
							e.sectionTitle ?? e.sectionId,
							" — ",
							e.reason
						]
					}, e.sectionId))]
				}),
				a && S.length > 0 && /* @__PURE__ */ Y("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ J("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ J(_, {
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
						"data-testid": `${y}-file-under`
					})]
				})
			]
		})
	});
}
//#endregion
//#region src/components/doc-editor/CommentGhostPopover.tsx
var Et = "[data-comment-id]", Dt = 240;
function Ot(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Z(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function kt({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: o, onResolve: c, ref: l, "data-testid": u = "comment-ghost" }) {
	let [d, p] = K(null), m = G(null), g = G(null), _ = G(null);
	_.current = d;
	let v = W(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), y = G(v);
	y.current = v;
	let b = H(() => {
		g.current !== null && (clearTimeout(g.current), g.current = null);
	}, []), x = H(() => {
		b(), p(null);
	}, [b]), S = H((e, n, r) => {
		if (b(), !y.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Ot(e)}"]`) ?? null;
		i instanceof HTMLElement && (m.current = i, p({
			id: e,
			via: r
		}));
	}, [b, t]);
	Ue(l, () => ({
		openComment: (e, t) => S(e, t, "click"),
		close: x
	}), [S, x]);
	let C = G(null), w = d?.id ?? null;
	U(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), U(() => b, [b]), U(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Et) : null, a = (e) => {
			let t = r(e.target), n = t?.getAttribute("data-comment-id");
			if (!(!t || !n)) {
				if (_.current?.id === n) {
					x();
					return;
				}
				S(n, t, "click");
			}
		}, o = (e) => {
			if (!i) return;
			let t = r(e.target), a = t?.getAttribute("data-comment-id");
			!t || !a || (b(), _.current?.id !== a && (g.current = setTimeout(() => S(a, t, "hover"), n)));
		}, s = (e) => {
			i && r(e.target) && (b(), g.current = setTimeout(() => {
				_.current?.via === "hover" && x();
			}, Dt));
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
	let T = w ? v.get(w) ?? null : null, E = (e) => () => {
		T && (e?.(T.id), x());
	};
	return /* @__PURE__ */ J(h, {
		trigger: m,
		open: !!T,
		onClose: x,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": u,
		children: T && /* @__PURE__ */ Y("div", {
			"data-testid": `${u}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: b,
			onMouseLeave: () => {
				b(), g.current = setTimeout(() => {
					_.current?.via === "hover" && x();
				}, Dt);
			},
			children: [
				/* @__PURE__ */ Y("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ J(f, {
							name: T.author,
							size: 20,
							color: T.color
						}),
						/* @__PURE__ */ J("span", {
							className: "truncate text-[13px] font-semibold text-text-primary",
							children: T.author
						}),
						T.timestamp && /* @__PURE__ */ J("span", {
							className: "text-[11px] text-text-tertiary",
							children: V(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ J(s, {
							tone: "success",
							size: "xs",
							children: "Resolved"
						})
					]
				}),
				T.quote && /* @__PURE__ */ J("div", {
					className: "border-l-2 border-border pl-2 text-[11px] italic text-text-tertiary line-clamp-2",
					children: T.quote
				}),
				/* @__PURE__ */ J("div", {
					className: "whitespace-pre-wrap text-[13px] leading-snug text-text-primary line-clamp-4",
					children: T.text
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ J("span", {
						"data-testid": `${u}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Z(T.replyCount ?? 0)
					}), /* @__PURE__ */ Y("span", {
						className: "flex gap-1.5",
						children: [o && /* @__PURE__ */ J(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(o),
							"data-testid": `${u}-open`,
							children: "Open thread"
						}), c && !T.resolved && /* @__PURE__ */ J(r, {
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
function At() {
	return /* @__PURE__ */ Y("svg", {
		viewBox: "0 0 16 16",
		className: "h-4 w-4",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.5",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ J("path", {
			d: "M6.5 2.75H3A1.25 1.25 0 0 0 1.75 4v8A1.25 1.25 0 0 0 3 13.25h8A1.25 1.25 0 0 0 12.25 12V8.5",
			strokeLinecap: "round"
		}), /* @__PURE__ */ J("path", {
			d: "M9.5 1.75h4.75V6.5M14 2 7.75 8.25",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function jt({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
	let [h, g] = K(!1), _ = H((e) => {
		e.preventDefault(), t && g(!0), l?.(e);
	}, [t, l]), v = H((e) => {
		let t = e.relatedTarget;
		t instanceof Node && e.currentTarget.contains(t) || (g(!1), u?.(e));
	}, [u]), y = H((e) => {
		e.preventDefault(), g(!1), t && d?.(e);
	}, [t, d]);
	return !e && !t ? null : /* @__PURE__ */ J("div", {
		"data-testid": m,
		"data-docked": String(e),
		"data-drag-over": String(h),
		"data-call-dock-target": t && r ? r : void 0,
		onDragOver: _,
		onDragLeave: v,
		onDrop: y,
		className: n("w-full overflow-hidden rounded-lg border transition-colors duration-150", "bg-surface", h ? "border-primary" : "border-border", "data-[pointer-over=true]:border-primary", f),
		children: e ? /* @__PURE__ */ Y("div", {
			"data-testid": `${m}-content`,
			className: "relative w-full",
			children: [p, c && /* @__PURE__ */ J("div", {
				className: "absolute right-1 top-1 z-10 rounded bg-black/45 backdrop-blur-sm",
				children: /* @__PURE__ */ J(a, {
					"aria-label": s,
					size: "sm",
					onClick: c,
					"data-testid": `${m}-undock`,
					icon: /* @__PURE__ */ J(At, {}),
					className: "text-white hover:bg-white/20"
				})
			})]
		}) : /* @__PURE__ */ Y("div", {
			role: "region",
			"aria-label": i,
			"data-testid": `${m}-dropzone`,
			className: n("flex aspect-video w-full flex-col items-center justify-center gap-1", "rounded-lg border-2 border-dashed px-3 text-center", h ? "border-primary bg-surface-hover" : "border-border"),
			children: [/* @__PURE__ */ J("span", {
				className: "text-xs font-medium text-text-secondary",
				children: i
			}), /* @__PURE__ */ J("span", {
				className: "text-xs text-text-tertiary",
				children: o
			})]
		})
	});
}
//#endregion
//#region src/components/doc-editor/FloatingDockBar.tsx
function Mt({ docked: e, ghost: t = !1, dockId: r, ghostLabel: i = "Drop the call here", label: a = "Call, along the bottom of the page", bottomOffset: o = 16, className: s, children: c, "data-testid": l = "floating-dock-bar" }) {
	return !e && t && r ? /* @__PURE__ */ J("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		"data-testid": `${l}-ghost`,
		children: /* @__PURE__ */ J("div", {
			className: n("pointer-events-auto flex h-28 w-full max-w-3xl items-center justify-center rounded-2xl border-2 border-dashed", "border-primary/40 bg-primary/5 text-sm font-medium text-text-secondary backdrop-blur-[2px] transition-colors duration-150", "data-[pointer-over=true]:border-primary data-[pointer-over=true]:bg-primary/15 data-[pointer-over=true]:text-text-primary"),
			"data-call-dock-target": r,
			role: "region",
			"aria-label": i,
			children: i
		})
	}) : e ? /* @__PURE__ */ J("div", {
		className: n("pointer-events-none fixed inset-x-0 z-40 flex justify-center px-4", s),
		style: { bottom: o },
		role: "region",
		"aria-label": a,
		"data-testid": l,
		children: /* @__PURE__ */ J("div", {
			className: "pointer-events-auto flex max-w-full justify-center",
			"data-testid": `${l}-body`,
			children: c
		})
	}) : null;
}
//#endregion
//#region src/components/doc-editor/DocumentModePill.tsx
var Nt = {
	editing: {
		label: "Editing",
		tone: "info"
	},
	suggesting: {
		label: "Suggesting",
		tone: "warning"
	},
	review: {
		label: "Review",
		tone: "accent"
	},
	read: {
		label: "Read",
		tone: "neutral"
	}
};
function Pt({ mode: e, reason: t, className: r, "data-testid": i = "document-mode-pill" }) {
	let { label: a, tone: o } = Nt[e];
	return /* @__PURE__ */ J("span", {
		className: n("inline-flex items-center", r),
		title: t,
		"aria-label": t ? `${a}. ${t}` : a,
		"data-testid": i,
		"data-mode": e,
		children: /* @__PURE__ */ J(s, {
			tone: o,
			size: "sm",
			className: "rounded-full px-2.5",
			children: a
		})
	});
}
//#endregion
//#region src/components/doc-editor/DocumentOwnership.tsx
function Ft({ owner: e, collaborators: t = [], maxAvatars: r = 3, onShare: i, className: a, "data-testid": o = "document-ownership" }) {
	if (!e) return null;
	let s = t.slice(0, r), c = t.length - s.length;
	return /* @__PURE__ */ Y("span", {
		"data-testid": o,
		className: n("inline-flex items-center gap-2", a),
		children: [
			/* @__PURE__ */ Y("span", {
				className: "inline-flex items-center gap-1.5",
				children: [/* @__PURE__ */ J(f, {
					name: e.displayName,
					size: 20,
					...e.avatarUrl ? { src: e.avatarUrl } : {}
				}), /* @__PURE__ */ Y("span", {
					className: "text-xs text-text-secondary",
					"data-testid": `${o}-owner`,
					children: ["Owned by ", /* @__PURE__ */ J("span", {
						className: "font-medium text-text-primary",
						children: e.displayName
					})]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ Y("span", {
				className: "inline-flex items-center",
				"data-testid": `${o}-collaborators`,
				children: [s.map((e, t) => /* @__PURE__ */ J("span", {
					className: n("inline-flex rounded-full ring-2 ring-surface", t > 0 && "-ml-1.5"),
					title: e.displayName,
					children: /* @__PURE__ */ J(f, {
						name: e.displayName,
						size: 20,
						...e.avatarUrl ? { src: e.avatarUrl } : {}
					})
				}, e.userId)), c > 0 && /* @__PURE__ */ Y("span", {
					"data-testid": `${o}-overflow`,
					title: t.slice(r).map((e) => e.displayName).join(", "),
					className: "-ml-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-surface-inset px-1 text-[10px] font-semibold text-text-secondary ring-2 ring-surface",
					children: ["+", c]
				})]
			}),
			i && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: i,
				"data-testid": `${o}-share`,
				className: "rounded border border-border px-2 py-0.5 text-xs font-medium text-text-secondary hover:bg-surface-hover hover:text-text-primary",
				children: "Share"
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/DocumentShareDialog.tsx
var It = [
	"owner",
	"editor",
	"commenter",
	"viewer"
], Lt = {
	restricted: () => "Restricted — only people added here",
	"org-view": (e) => `Anyone at ${e} can view`,
	"org-edit": (e) => `Anyone at ${e} can edit`,
	"link-view": () => "Anyone with the link can view"
};
function Rt({ open: e, onClose: t, documentTitle: n, people: i, generalAccess: a = "restricted", orgName: o = "your organisation", onChangeGeneralAccess: s, onChangeRole: l, onInvite: u, onCopyLink: d, notice: p, "data-testid": m = "document-share-dialog" }) {
	let [h, g] = K(""), _ = () => {
		let e = h.trim();
		!e || !u || (u(e), g(""));
	};
	return /* @__PURE__ */ J(c, {
		open: e,
		onClose: t,
		title: n ? `Share “${n}”` : "Share",
		maxWidth: 460,
		children: /* @__PURE__ */ Y("div", {
			className: "flex flex-col gap-4",
			"data-testid": m,
			children: [
				u && /* @__PURE__ */ Y("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ J("input", {
						value: h,
						onChange: (e) => g(e.target.value),
						onKeyDown: (e) => {
							e.key === "Enter" && _();
						},
						placeholder: "Add people by name or email",
						"aria-label": "Add people",
						"data-testid": `${m}-invite-input`,
						className: "min-w-0 flex-1 rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary"
					}), /* @__PURE__ */ J(r, {
						size: "sm",
						onClick: _,
						disabled: !h.trim(),
						"data-testid": `${m}-invite`,
						children: "Invite"
					})]
				}),
				p && /* @__PURE__ */ J("p", {
					className: "m-0 rounded border border-border-emphasis bg-surface-inset px-2.5 py-1.5 text-xs leading-snug text-text-secondary",
					"data-testid": `${m}-notice`,
					children: p
				}),
				/* @__PURE__ */ J("div", {
					className: "flex flex-col gap-1",
					"data-testid": `${m}-people`,
					children: i.map((e) => /* @__PURE__ */ Y("div", {
						className: "flex items-center gap-2",
						"data-testid": `${m}-person`,
						children: [
							/* @__PURE__ */ J(f, {
								name: e.displayName,
								size: 26,
								...e.avatarUrl ? { src: e.avatarUrl } : {}
							}),
							/* @__PURE__ */ J("span", {
								className: "min-w-0 flex-1 truncate text-sm text-text-primary",
								children: e.displayName
							}),
							e.role === "owner" || !l ? /* @__PURE__ */ J("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${m}-role-static`,
								children: e.role === "owner" ? "Owner" : e.role
							}) : /* @__PURE__ */ J("select", {
								value: e.role,
								onChange: (t) => l(e.userId, t.target.value),
								"aria-label": `Access for ${e.displayName}`,
								"data-testid": `${m}-role`,
								className: "rounded border border-border bg-surface px-1 py-0.5 text-xs text-text-secondary",
								children: It.filter((e) => e !== "owner").map((e) => /* @__PURE__ */ J("option", {
									value: e,
									children: e
								}, e))
							})
						]
					}, e.userId))
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex flex-col gap-1.5 border-t border-border pt-3",
					children: [/* @__PURE__ */ J("span", {
						className: "text-xs font-medium text-text-secondary",
						children: "General access"
					}), /* @__PURE__ */ J("select", {
						value: a,
						onChange: (e) => s?.(e.target.value),
						disabled: !s,
						"aria-label": "General access",
						"data-testid": `${m}-general-access`,
						className: "rounded border border-border bg-surface px-2 py-1.5 text-sm text-text-primary disabled:opacity-60",
						children: Object.keys(Lt).map((e) => /* @__PURE__ */ J("option", {
							value: e,
							children: Lt[e](o)
						}, e))
					})]
				}),
				/* @__PURE__ */ Y("div", {
					className: "flex items-center justify-between",
					children: [d ? /* @__PURE__ */ J(r, {
						variant: "secondary",
						size: "sm",
						onClick: d,
						"data-testid": `${m}-copy-link`,
						children: "Copy link"
					}) : /* @__PURE__ */ J("span", {}), /* @__PURE__ */ J(r, {
						size: "sm",
						onClick: t,
						"data-testid": `${m}-done`,
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
function zt({ mode: e, onModeChange: t, showViewing: r = !0, openCount: i = null, disabled: a = !1, className: o, "data-testid": s = "suggestion-mode-control" }) {
	let c = Q.filter((e) => r || e.value !== "viewing").map((e) => ({
		label: e.label,
		value: e.value
	})), l = Q.find((t) => t.value === e);
	return /* @__PURE__ */ Y("div", {
		"data-testid": s,
		"data-mode": e,
		title: l?.hint,
		className: n("inline-flex items-center gap-2", a && "pointer-events-none opacity-50", o),
		children: [/* @__PURE__ */ J(p, {
			options: c,
			value: e,
			size: "sm",
			"aria-label": "What your typing does",
			onChange: (n) => {
				let r = n;
				r !== e && t(r);
			}
		}), i !== null && i > 0 && /* @__PURE__ */ J("span", {
			"data-testid": `${s}-count`,
			className: "rounded-full bg-surface-inset px-2 py-0.5 text-xs tabular-nums text-text-secondary",
			children: i === 1 ? "1 suggestion" : `${i} suggestions`
		})]
	});
}
//#endregion
//#region src/components/doc-editor/SuggestionCard.tsx
var Bt = {
	insert: "Added",
	delete: "Removed",
	replace: "Replaced",
	modify: "Formatted"
}, Vt = {
	insert: "text-success-fg",
	delete: "text-danger-fg",
	replace: "text-caution-fg",
	modify: "text-info-fg"
}, $ = 6, Ht = /^(.*\S)\s*\(powered by\s+([^()]+)\)$/;
function Ut(e) {
	let t = Ht.exec(e);
	if (!t) return { person: e };
	let n = t[1].trim(), r = t[2].trim();
	return n && r ? {
		person: n,
		model: r
	} : { person: e };
}
function Wt(e) {
	return new Date(e).toLocaleTimeString([], {
		hour: "numeric",
		minute: "2-digit"
	});
}
function Gt({ lines: e, tone: t, testId: r }) {
	let i = e.slice(0, $), a = t === "insert" ? "ins" : "del";
	return /* @__PURE__ */ Y("div", {
		className: n("flex flex-col gap-1 border-l-2 pl-2.5", t === "insert" ? "border-success-fg" : "border-danger-fg"),
		"data-testid": r,
		children: [i.map((e, r) => /* @__PURE__ */ J(a, {
			className: n("block whitespace-pre-line text-[13px] leading-relaxed no-underline", t === "insert" ? "text-text-primary" : "text-text-secondary line-through"),
			children: e
		}, r)), e.length > $ && /* @__PURE__ */ Y("span", {
			className: "text-xs text-text-tertiary",
			children: [
				"and ",
				e.length - $,
				" more"
			]
		})]
	});
}
function Kt({ kind: e, author: t, when: i = null, context: a, deletedText: o = "", insertedText: s = "", insertedBlocks: c, deletedBlocks: l, active: u = !1, onFocus: d, onAccept: p, onReject: m, className: h, "data-testid": g = "suggestion-card" }) {
	let { person: _, model: v } = Ut(t.trim() === "" ? "Unknown author" : t.trim()), y = c && c.length > 0 ? c : s ? [s] : [], b = l && l.length > 0 ? l : o ? [o] : [], x = y.length > 0 || b.length > 0;
	return /* @__PURE__ */ Y("div", {
		"data-testid": g,
		"data-kind": e,
		"data-active": u ? "true" : "false",
		className: n("flex flex-col gap-2.5 border-b border-border px-4 py-3 text-sm last:border-b-0", u && "bg-surface-inset", h),
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ J(f, {
						name: _,
						size: 20
					}),
					/* @__PURE__ */ J("span", {
						className: "min-w-0 truncate text-[13px] font-medium text-text-primary",
						title: _,
						"data-testid": `${g}-author`,
						children: _
					}),
					i !== null && /* @__PURE__ */ J("span", {
						className: "shrink-0 text-xs tabular-nums text-text-tertiary",
						children: Wt(i)
					}),
					/* @__PURE__ */ J("span", {
						className: n("ml-auto shrink-0 text-[11px] font-medium", Vt[e]),
						"data-testid": `${g}-kind`,
						children: Bt[e]
					})
				]
			}),
			(v || a) && /* @__PURE__ */ Y("div", {
				className: "flex flex-wrap items-center gap-x-1.5 text-xs text-text-tertiary",
				children: [
					v && /* @__PURE__ */ Y("span", {
						"data-testid": `${g}-model`,
						children: ["powered by ", v]
					}),
					v && a && /* @__PURE__ */ J("span", {
						"aria-hidden": "true",
						children: "·"
					}),
					a && /* @__PURE__ */ Y("span", {
						"data-testid": `${g}-context`,
						children: ["in ", a]
					})
				]
			}),
			x && /* @__PURE__ */ Y("button", {
				type: "button",
				onClick: d,
				disabled: !d,
				"data-testid": `${g}-body`,
				className: n("flex w-full flex-col items-stretch gap-1 border-none bg-transparent p-0 text-left font-[inherit]", d && "cursor-pointer hover:opacity-80"),
				children: [b.length > 0 && /* @__PURE__ */ J(Gt, {
					lines: b,
					tone: "delete",
					testId: `${g}-deleted`
				}), y.length > 0 && /* @__PURE__ */ J(Gt, {
					lines: y,
					tone: "insert",
					testId: `${g}-inserted`
				})]
			}),
			(d || p || m) && /* @__PURE__ */ Y("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					d && /* @__PURE__ */ J(r, {
						variant: "ghost",
						size: "sm",
						onClick: d,
						"data-testid": `${g}-show`,
						className: "mr-auto",
						children: "Show"
					}),
					m && /* @__PURE__ */ J(r, {
						variant: "ghost",
						size: "sm",
						onClick: m,
						"data-testid": `${g}-reject`,
						children: "Reject"
					}),
					p && /* @__PURE__ */ J(r, {
						variant: "primary",
						size: "sm",
						onClick: p,
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
function qt({ count: e, children: t, onAcceptAll: a, onRejectAll: c, error: u = null, headerExtra: d, emptyTitle: f = "No suggestions", emptyBody: p = "Proposed changes to this document show up here for review.", title: h = "Suggestions", variant: g = "card", className: _, "data-testid": v = "suggestion-review-list" }) {
	let y = e > 0 && (a || c), b = y || d ? /* @__PURE__ */ Y("span", {
		className: "flex items-center gap-1.5",
		children: [
			d,
			y && c && /* @__PURE__ */ J(r, {
				variant: "ghost",
				size: "sm",
				onClick: c,
				"data-testid": `${v}-reject-all`,
				children: "Reject all"
			}),
			y && a && /* @__PURE__ */ J(r, {
				variant: "secondary",
				size: "sm",
				onClick: a,
				"data-testid": `${v}-accept-all`,
				children: "Accept all"
			})
		]
	}) : void 0, x = /* @__PURE__ */ Y(q, { children: [u && /* @__PURE__ */ J("div", {
		className: n("pt-2", g === "card" && "px-3"),
		children: /* @__PURE__ */ J(o, {
			variant: "error",
			layout: "stacked",
			"data-testid": `${v}-error`,
			children: u
		})
	}), e === 0 ? /* @__PURE__ */ J(l, {
		size: "sm",
		title: f,
		body: p,
		testId: `${v}-empty`
	}) : /* @__PURE__ */ J("ul", {
		className: "m-0 list-none p-0",
		"data-testid": `${v}-list`,
		children: t
	})] });
	return g === "pane" ? /* @__PURE__ */ Y("div", {
		className: n("flex min-h-0 flex-1 flex-col", _),
		"data-testid": v,
		"data-variant": "pane",
		children: [/* @__PURE__ */ Y("div", {
			className: "flex shrink-0 items-center justify-between gap-2 border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ J("span", {
				className: "text-xs text-tertiary",
				"data-testid": `${v}-count`,
				children: e === 0 ? "None open" : e === 1 ? "1 open" : `${e} open`
			}), b]
		}), /* @__PURE__ */ J("div", {
			className: "min-h-0 flex-1 overflow-y-auto px-3",
			children: x
		})]
	}) : /* @__PURE__ */ Y(i, {
		padding: "none",
		className: n("overflow-hidden", _),
		"data-testid": v,
		children: [/* @__PURE__ */ J(m, {
			title: h,
			meta: /* @__PURE__ */ J(s, {
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
export { pt as AckMode, he as ActionItemsCard, yt as ActivityFeed, R as AttachmentsPanel, L as CANVAS_BODY_KEY, M as CANVAS_SCHEMA_VERSION, Ve as CanvasDocumentView, ee as CanvasLineSpacing, ft as ChunkViewer, kt as CommentGhostPopover, B as CommentThreadNode, be as DiffViewer, xe as DocumentEditorPage, Ie as DocumentFindBar, Oe as DocumentGutter, re as DocumentHeader, Qe as DocumentListPage, Pt as DocumentModePill, Re as DocumentOutline, Ft as DocumentOwnership, Fe as DocumentRuler, Rt as DocumentShareDialog, He as DocumentStatusBar, Be as DocumentToolbar, T as EditorToolbar, le as ExecutiveSummaryCard, Mt as FloatingDockBar, j as FollowModeBar, ve as HeaderBanner, Se as KeyDecisionsCard, te as LINE_SPACINGS, E as LINE_SPACING_LABELS, Te as MentionDropdown, oe as MyMentionsPanel, x as NewDocumentModal, Me as PX_PER_INCH, I as ParticipantAvatars, wt as ProposalCard, se as ReaderMode, de as ReviewMode, ot as ReviewProgress, ut as ReviewableItem, It as SHARE_ROLES, Q as SUGGESTION_AUTHORING_MODES, we as SectionBlock, ue as SectionComments, A as SectionList, ce as SectionSummariesCard, rt as StandaloneTiptap, Kt as SuggestionCard, zt as SuggestionModeControl, qt as SuggestionReviewList, ye as TableOfContents, y as TaskItemRow, b as TaskList, O as TiptapEditor, _e as VersionHistoryPanel, z as VideoCallPanel, jt as VideoDockSlot, fe as VideoHistoryPanel, Tt as WorkItemRow, Ae as ZOOM_FIT, je as ZOOM_STEPS, N as canvasBody, F as canvasFragmentToMarkdown, $e as clientIdForUser, Ce as countAllComments, me as findDocumentTarget, ze as findMatches, ge as generateSummaryBullets, Ee as getInitials, P as isCanvasDocument, w as isLineSpacing, D as lineSpacingAttributes, Ne as nextMatchIndex, ne as parseLineSpacing, ke as readOutline, ae as readSchemaVersion, V as relativeTime, Z as replyLabel, k as scrollToDocumentTarget, Le as stackOffsets, ie as useDocumentActions, Pe as useDocumentOutline, et as useFollowCursor, De as useIsCanvasDocument, pe as useSidebarPanels };
