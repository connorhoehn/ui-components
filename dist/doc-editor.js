import { n as e, t } from "./useWebSocket-CGc0yRhM.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Card-DWAlG4MZ.js";
import { t as a } from "./IconButton-C3DMtvSx.js";
import { t as o } from "./Chip-YhQI5B9P.js";
import { t as s } from "./Input-DLknWXri.js";
import { t as c } from "./Textarea-Dz4doxTv.js";
import { t as l } from "./Avatar-BzicCOft.js";
import { t as u } from "./InlinePopover-DFdI8hw1.js";
import { t as d } from "./Select-CqVokE2v.js";
import { t as f } from "./activationKey-CjbL3LUv.js";
import { a as p, n as m, r as h } from "./renderers-aONC4W_Z.js";
import { o as g, s as _, t as v } from "./VerdictChip-CKnsnKYd.js";
import { n as y, t as b } from "./TiptapEditor-CUZ_20iC.js";
import { A as x, C as S, D as C, E as w, O as T, S as E, T as D, _ as O, a as ee, b as k, c as A, d as j, f as M, g as N, h as P, i as F, k as I, l as L, m as R, o as te, p as z, r as B, s as ne, t as V, u as H, v as U, w as re, x as W, y as ie } from "./DocumentEditorPage-DRMfcLtj.js";
import { i as ae, n as oe, r as se, t as ce } from "./CanvasDocumentView-CyuwiD04.js";
import { useCallback as G, useEffect as K, useImperativeHandle as le, useMemo as q, useRef as J, useState as Y } from "react";
import { Fragment as X, jsx as Z, jsxs as Q } from "react/jsx-runtime";
import * as ue from "yjs";
import { relativePositionToAbsolutePosition as de, ySyncPluginKey as fe } from "@tiptap/y-tiptap";
//#region src/components/doc-editor/DocumentListPage.tsx
function pe(e) {
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
var me = {
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
function he({ status: e }) {
	let t = me[e] ?? me.draft;
	return /* @__PURE__ */ Z("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var ge = {
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
function _e({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ Q("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = ge[e.mode ?? "editor"] ?? ge.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
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
function ve({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: s }) {
	let [c, l] = Y(!1), [u, d] = Y(null), [m, h] = Y(null), [g, _] = Y(1), v = Math.max(1, Math.ceil(e.length / 10)), y = Math.min(g, v), b = q(() => {
		let t = (y - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, y]), x = G((e, t, n) => {
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
				children: b.map((e) => {
					let i = t[e.id] ?? [], a = u === e.id, s = a || m === e.id;
					return /* @__PURE__ */ Q("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: f(() => r(e.id)),
						onMouseEnter: () => d(e.id),
						onMouseLeave: () => d(null),
						onFocus: () => h(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || h((t) => t === e.id ? null : t);
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
											/* @__PURE__ */ Z(he, { status: e.status }),
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
										children: ["Updated ", pe(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ Z("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ Z(_e, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							s && /* @__PURE__ */ Z("button", {
								type: "button",
								onClick: (t) => x(t, e.id, e.title),
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
						disabled: y <= 1,
						onClick: () => _((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ Q("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							y,
							" of ",
							v
						]
					}),
					/* @__PURE__ */ Z("button", {
						"data-testid": "pagination-next",
						disabled: y >= v,
						onClick: () => _((e) => Math.min(v, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y >= v ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ Z(p, {
				open: c,
				onClose: () => l(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/useFollowCursor.ts
function ye(e, t) {
	for (let [n, r] of e.getStates()) {
		let e = r?.user;
		if (e && t(e)) return n;
	}
	return null;
}
function be({ editor: e, provider: t, followClientId: n, onLost: r }) {
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
				let t = fe.getState(e.view.state);
				if (!t?.type || !t?.binding?.mapping) return;
				let n = de(t.doc, t.type, ue.createRelativePositionFromJSON(a.head), t.binding.mapping);
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
var xe = "prosemirror";
function Se(e) {
	return e.ydoc !== void 0;
}
function Ce(e) {
	return Se(e) ? /* @__PURE__ */ Z(we, { ...e }) : /* @__PURE__ */ Z(Te, { ...e });
}
function we({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = xe, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = q(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = J(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ Z("div", {
		className: n(c),
		children: /* @__PURE__ */ Z(b, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function Te({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = xe, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: m }) {
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
	]), x = t({
		config: y,
		onMessage: v
	}), { ydoc: S, provider: C, synced: w } = e({
		documentId: i,
		ws: x,
		onMessage: _
	}), T = q(() => S ? S.getXmlFragment(c) : null, [S, c]), E = !!S && !!T && (m !== !0 || w), D = J(!1);
	return !D.current && E && T && S && (D.current = !0, f?.(T, S)), E ? /* @__PURE__ */ Z("div", {
		className: n(d),
		children: /* @__PURE__ */ Z(b, {
			fragment: T,
			ydoc: S,
			provider: C,
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
function Ee({ current: e, total: t }) {
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
var De = {
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
}, Oe = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, ke = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Ae({ item: e, onAck: t, onReject: r }) {
	let [i, a] = Y(!1), [o, s] = Y(""), [l, u] = Y("none"), d = J(e.status), f = De[e.status] ?? ke, p = Oe[e.priority] ?? "var(--color-neutral)", [m, h] = Y(!1), g = J(null);
	K(() => () => {
		g.current && clearTimeout(g.current);
	}, []), K(() => {
		d.current === "pending" && e.status === "acked" ? u("ack") : d.current === "pending" && e.status === "rejected" && u("reject"), d.current = e.status;
	}, [e.status]);
	let _ = () => {
		m || (h(!0), u("ack"), g.current = setTimeout(() => {
			g.current = null, t(o || void 0), s(""), a(!1), h(!1);
		}, 150));
	}, v = () => {
		if (!m) {
			if (!o.trim()) {
				a(!0);
				return;
			}
			h(!0), u("reject"), g.current = setTimeout(() => {
				g.current = null, r(o), s(""), a(!1), h(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ Q("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", l === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : l === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
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
							background: f.bg,
							color: f.text
						},
						children: e.status
					}),
					/* @__PURE__ */ Z("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: p,
							border: `1px solid ${p}`
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
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: m,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ Z("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: m,
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
				children: [/* @__PURE__ */ Z(c, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && _()), e.key === "Escape" && (a(!1), s(""));
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
							onClick: _,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ Z("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: m,
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
var je = {
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
function Me({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = je[e.type] ?? je.custom, p = e.items.filter((e) => e.status !== "pending").length;
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
				children: /* @__PURE__ */ Z(b, {
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
			e.items.length > 0 && /* @__PURE__ */ Q("div", { children: [e.items.map((e) => /* @__PURE__ */ Z(Ae, {
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
			c && /* @__PURE__ */ Z(N, {
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
function Ne({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
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
		/* @__PURE__ */ Z(Ee, {
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
				}), /* @__PURE__ */ Z(Me, {
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
function Pe(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function Fe(e, t) {
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
function Ie(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Le(e) {
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
function Re(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function ze({ events: e, participants: t }) {
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
					Re(e.mode),
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
						children: Ie(e.displayName || "Unknown")
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
								Pe(e.eventType),
								" ",
								Fe(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ Z("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Le(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var Be = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Ve = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function He({ label: e, children: t }) {
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
var Ue = {
	field: "Field change",
	prose: "Body text"
};
function We({ utterance: e, kind: t, status: i, confidence: a, attachState: c, targetLabel: u, targetReason: d, before: f, after: p, edits: m, rationale: h, draftError: y, author: b, category: x, path: S, locationHint: C, verdict: w, verdictStatus: T = "idle", verdictError: E, revision: D, onRereview: O, onAccept: ee, onReject: k, onRedraft: A, onReattach: j, onConfirmAttachment: M, className: N, "data-testid": P = "proposal-card" }) {
	let [F, I] = Y(!1), [L, R] = Y(null), [te, z] = Y(!1), [B, ne] = Y(""), V = i === "applied", H = i === "rejected", U = V || H;
	async function re() {
		I(!0), R(null);
		try {
			let e = await ee();
			R(e);
		} catch (e) {
			R({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			I(!1);
		}
	}
	let W = t === "prose" ? m ?? [] : [{
		before: f ?? "",
		after: p ?? ""
	}];
	return /* @__PURE__ */ Q("div", {
		"data-testid": P,
		"data-status": i,
		"data-confidence": a,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", V ? "border-success-border" : "border-border", H && "opacity-60", N),
		children: [
			/* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z("span", {
						className: "text-sm font-semibold leading-tight text-text-primary",
						"data-testid": `${P}-category`,
						children: x ?? Ue[t]
					}),
					b && /* @__PURE__ */ Q("span", {
						className: "flex min-w-0 items-center gap-1.5",
						"data-testid": `${P}-requester`,
						children: [/* @__PURE__ */ Z(l, {
							name: b.name,
							size: 18,
							...b.avatarUrl ? { src: b.avatarUrl } : {}
						}), /* @__PURE__ */ Z("span", {
							className: "truncate text-xs text-text-secondary",
							children: b.name
						})]
					}),
					/* @__PURE__ */ Z("span", { className: "flex-1" }),
					/* @__PURE__ */ Z(o, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${P}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ Z(o, {
						tone: Ve[a],
						size: "sm",
						children: Be[a]
					}),
					c === "healed" && /* @__PURE__ */ Z(o, {
						tone: "caution",
						size: "sm",
						"data-testid": `${P}-healed`,
						children: "Re-found by quote — check this"
					}),
					c === "author_only" && /* @__PURE__ */ Z(o, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					V && /* @__PURE__ */ Z(o, {
						tone: "success",
						size: "sm",
						"data-testid": `${P}-applied`,
						children: "Applied"
					}),
					H && /* @__PURE__ */ Z(o, {
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
			/* @__PURE__ */ Z(g, {
				path: S ?? (u ? [u] : []),
				...C ? { hint: C } : {},
				"data-testid": `${P}-location`
			}),
			/* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1",
				children: [d && /* @__PURE__ */ Z(He, {
					label: "Why",
					children: d
				}), h && /* @__PURE__ */ Z(He, {
					label: "Rationale",
					children: h
				})]
			}),
			i === "drafting" && /* @__PURE__ */ Z("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${P}-drafting`,
				children: "Drafting a proposal…"
			}),
			y && /* @__PURE__ */ Z("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${P}-draft-error`,
				children: y
			}),
			i !== "drafting" && !y && W.length > 0 && /* @__PURE__ */ Z(_, {
				pairs: W,
				"data-testid": `${P}-diff`
			}),
			i !== "drafting" && /* @__PURE__ */ Z(v, {
				verdict: w,
				status: T,
				error: E,
				revision: D,
				"data-testid": `${P}-verdict`
			}),
			L && !L.ok && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${P}-apply-error`,
				children: [
					/* @__PURE__ */ Z("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ Z("span", { children: L.message ?? "The document refused the change." }),
					L.stale && /* @__PURE__ */ Q("span", { children: [
						"Drafted against ",
						JSON.stringify(L.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(L.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!U && /* @__PURE__ */ Q("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: F || i === "drafting" || !!y,
						onClick: re,
						"data-testid": `${P}-accept`,
						children: F ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: F,
						onClick: () => z((e) => !e),
						"data-testid": `${P}-reject`,
						children: "Reject"
					}),
					A && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: F,
						onClick: A,
						"data-testid": `${P}-redraft`,
						children: "Re-draft"
					}),
					O && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: F,
						onClick: O,
						"data-testid": `${P}-rereview`,
						children: "Re-run review"
					}),
					j && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						disabled: F,
						onClick: j,
						"data-testid": `${P}-reattach`,
						children: "Move…"
					}),
					M && c === "author_only" && /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "secondary",
						disabled: F,
						onClick: M,
						"data-testid": `${P}-confirm`,
						children: "Right place"
					})
				]
			}),
			te && !U && /* @__PURE__ */ Q("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ Z("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${P}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ Z(s, {
						id: `${P}-reason`,
						size: "sm",
						value: B,
						onChange: (e) => ne(e.target.value),
						"data-testid": `${P}-reason`
					}),
					/* @__PURE__ */ Q("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								k(B), z(!1);
							},
							"data-testid": `${P}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => z(!1),
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
function Ge({ itemId: e, utterance: t, unplaced: a = !1, targetLabel: s, reason: c, contextSplit: l, drafting: u = !1, draftError: f, candidates: p, sections: m, onPropose: h, onAttach: g, onDismiss: _, className: v, "data-testid": y = `work-item-${e}` }) {
	let b = [...p ?? []].sort((e, t) => t.score - e.score), x = new Set(b.map((e) => e.sectionId)), S = m.filter((e) => !x.has(e.id));
	return /* @__PURE__ */ Z(i, {
		padding: "sm",
		className: v,
		"data-testid": y,
		"data-item-id": e,
		children: /* @__PURE__ */ Q("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-1.5",
					children: [/* @__PURE__ */ Z(o, {
						tone: a ? "neutral" : "success",
						size: "sm",
						uppercase: !0,
						children: a ? "Unplaced" : s ?? "Placed"
					}), l && /* @__PURE__ */ Z(o, {
						tone: "caution",
						size: "sm",
						"data-testid": `${y}-split`,
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
				f && /* @__PURE__ */ Z("div", {
					className: n("rounded border border-warning-border bg-warning-bg", "px-2 py-1.5 text-xs text-warning-fg"),
					"data-testid": `${y}-draft-error`,
					children: f
				}),
				/* @__PURE__ */ Q("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "primary",
						disabled: u,
						onClick: h,
						"data-testid": `${y}-propose`,
						children: u ? "Drafting…" : "Draft a change"
					}), /* @__PURE__ */ Z(r, {
						size: "sm",
						variant: "ghost",
						onClick: _,
						"data-testid": `${y}-dismiss`,
						children: "Not useful"
					})]
				}),
				a && b.length > 0 && /* @__PURE__ */ Q("div", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Best guesses"
					}), b.map((e) => /* @__PURE__ */ Q(r, {
						size: "sm",
						variant: "secondary",
						onClick: () => g(e.sectionId),
						"data-testid": `${y}-candidate`,
						children: [
							e.sectionTitle ?? e.sectionId,
							" — ",
							e.reason
						]
					}, e.sectionId))]
				}),
				a && S.length > 0 && /* @__PURE__ */ Q("label", {
					className: "flex flex-col gap-1",
					children: [/* @__PURE__ */ Z("span", {
						className: "text-[11px] uppercase tracking-wide text-text-tertiary",
						children: "Or file it under"
					}), /* @__PURE__ */ Z(d, {
						size: "sm",
						value: "",
						placeholder: "Choose a section…",
						options: S.map((e) => ({
							value: e.id,
							label: e.title || e.id
						})),
						onChange: (e) => {
							e.target.value && g(e.target.value);
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
var Ke = "[data-comment-id]", qe = 240;
function Je(e) {
	return typeof CSS < "u" && typeof CSS.escape == "function" ? CSS.escape(e) : e.replace(/["\\]/g, "\\$&");
}
function Ye(e) {
	return e <= 0 ? "No replies" : e === 1 ? "1 reply" : `${e} replies`;
}
function Xe({ threads: e, containerRef: t, hoverDelayMs: n = 140, hoverEnabled: i = !0, onOpenChange: a, onOpenThread: s, onResolve: c, ref: d, "data-testid": f = "comment-ghost" }) {
	let [p, m] = Y(null), h = J(null), g = J(null), _ = J(null);
	_.current = p;
	let v = q(() => {
		let t = /* @__PURE__ */ new Map();
		for (let n of e) t.set(n.id, n);
		return t;
	}, [e]), y = J(v);
	y.current = v;
	let b = G(() => {
		g.current !== null && (clearTimeout(g.current), g.current = null);
	}, []), x = G(() => {
		b(), m(null);
	}, [b]), S = G((e, n, r) => {
		if (b(), !y.current.has(e)) return;
		let i = n ?? t?.current?.querySelector(`[data-comment-id="${Je(e)}"]`) ?? null;
		i instanceof HTMLElement && (h.current = i, m({
			id: e,
			via: r
		}));
	}, [b, t]);
	le(d, () => ({
		openComment: (e, t) => S(e, t, "click"),
		close: x
	}), [S, x]);
	let C = J(null), w = p?.id ?? null;
	K(() => {
		C.current !== w && (C.current = w, a?.(w));
	}, [w, a]), K(() => b, [b]), K(() => {
		let e = t?.current;
		if (!e) return;
		let r = (e) => e instanceof Element ? e.closest(Ke) : null, a = (e) => {
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
			}, qe));
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
	return /* @__PURE__ */ Z(u, {
		trigger: h,
		open: !!T,
		onClose: x,
		placement: "bottom-start",
		className: "w-72 p-0",
		"aria-label": T ? `Comment by ${T.author}` : void 0,
		"data-testid": f,
		children: T && /* @__PURE__ */ Q("div", {
			"data-testid": `${f}-card`,
			"data-comment-id": T.id,
			className: "flex flex-col gap-2 p-3",
			onMouseEnter: b,
			onMouseLeave: () => {
				b(), g.current = setTimeout(() => {
					_.current?.via === "hover" && x();
				}, qe);
			},
			children: [
				/* @__PURE__ */ Q("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ Z(l, {
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
							children: k(T.timestamp)
						}),
						T.resolved && /* @__PURE__ */ Z(o, {
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
						"data-testid": `${f}-replies`,
						className: "text-[11px] text-text-tertiary",
						children: Ye(T.replyCount ?? 0)
					}), /* @__PURE__ */ Q("span", {
						className: "flex gap-1.5",
						children: [s && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(s),
							"data-testid": `${f}-open`,
							children: "Open thread"
						}), c && !T.resolved && /* @__PURE__ */ Z(r, {
							size: "sm",
							variant: "ghost",
							onClick: E(c),
							"data-testid": `${f}-resolve`,
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
function Ze() {
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
function Qe({ docked: e, canAccept: t, dockId: r, label: i = "Video dock", hint: o = "Drop the call here to read alongside it", undockLabel: s = "Pop video back out", onRequestUndock: c, onDragOver: l, onDragLeave: u, onDrop: d, className: f, children: p, "data-testid": m = "video-dock-slot" }) {
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
		children: e ? /* @__PURE__ */ Q(X, { children: [/* @__PURE__ */ Q("div", {
			className: "flex items-center justify-between gap-2 border-b border-border px-2 py-1",
			children: [/* @__PURE__ */ Z("span", {
				className: "truncate text-xs font-medium text-text-secondary",
				children: i
			}), c && /* @__PURE__ */ Z(a, {
				"aria-label": s,
				size: "sm",
				onClick: c,
				"data-testid": `${m}-undock`,
				icon: /* @__PURE__ */ Z(Ze, {})
			})]
		}), /* @__PURE__ */ Z("div", {
			"data-testid": `${m}-content`,
			className: "aspect-video w-full",
			children: p
		})] }) : /* @__PURE__ */ Q("div", {
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
export { Ne as AckMode, L as ActionItemsCard, ze as ActivityFeed, E as AttachmentsPanel, ce as CanvasDocumentView, Me as ChunkViewer, Xe as CommentGhostPopover, O as CommentThreadNode, ne as DiffViewer, V as DocumentEditorPage, oe as DocumentGutter, C as DocumentHeader, ve as DocumentListPage, ae as DocumentToolbar, y as EditorToolbar, M as ExecutiveSummaryCard, w as FollowModeBar, z as HeaderBanner, H as KeyDecisionsCard, W as MentionDropdown, ee as MyMentionsPanel, p as NewDocumentModal, T as ParticipantAvatars, We as ProposalCard, A as ReaderMode, P as ReviewMode, Ee as ReviewProgress, Ae as ReviewableItem, re as SectionBlock, N as SectionComments, S as SectionList, j as SectionSummariesCard, Ce as StandaloneTiptap, B as TableOfContents, h as TaskItemRow, m as TaskList, b as TiptapEditor, te as VersionHistoryPanel, D as VideoCallPanel, Qe as VideoDockSlot, F as VideoHistoryPanel, Ge as WorkItemRow, ye as clientIdForUser, U as countAllComments, R as generateSummaryBullets, ie as getInitials, k as relativeTime, Ye as replyLabel, se as stackOffsets, x as useDocumentActions, be as useFollowCursor, I as useSidebarPanels };
