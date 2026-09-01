import { n as e, t } from "./useWebSocket-16eHDqT5.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./Button-wU9TwJvB.js";
import { t as i } from "./Chip-YhQI5B9P.js";
import { t as a } from "./EmptyState-ClmWoqCb.js";
import { t as o } from "./Input-DLknWXri.js";
import { t as s } from "./activationKey-CjbL3LUv.js";
import { t as c } from "./Textarea-Dz4doxTv.js";
import { a as l, n as u, r as d } from "./renderers-DIrGz3QL.js";
import { t as f } from "./Select-CqVokE2v.js";
import { n as p, t as m } from "./TiptapEditor-CnjifOQz.js";
import { A as h, C as g, D as _, E as v, O as y, S as b, T as x, _ as S, a as C, b as w, c as T, d as E, f as D, g as O, h as k, i as A, k as j, l as M, m as N, o as P, p as F, r as ee, s as te, t as ne, u as re, v as ie, w as ae, x as oe, y as se } from "./DocumentEditorPage-B78AbMmc.js";
import { i as ce, n as le, r as ue, t as de } from "./CanvasDocumentView-CWKa5yyu.js";
import { useCallback as I, useEffect as L, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/doc-editor/DocumentListPage.tsx
function fe(e) {
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
var W = {
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
function pe({ status: e }) {
	let t = W[e] ?? W.draft;
	return /* @__PURE__ */ H("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var G = {
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
function me({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ U("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = G[e.mode ?? "editor"] ?? G.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ U("button", {
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
					/* @__PURE__ */ H("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ H("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ H("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-surface border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ U("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function he({ documents: e, presence: t, onOpenDocument: r, onCreateDocument: i, onDeleteDocument: a, onJumpToUser: o, hideHeader: c }) {
	let [u, d] = B(!1), [f, p] = B(null), [m, h] = B(null), [g, _] = B(1), v = Math.max(1, Math.ceil(e.length / 10)), y = Math.min(g, v), b = R(() => {
		let t = (y - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, y]), x = I((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && a(t);
	}, [a]);
	return /* @__PURE__ */ U("div", {
		className: n("px-4"),
		children: [
			!c && /* @__PURE__ */ U("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ H("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ U("button", {
					"data-testid": "new-document-btn",
					onClick: () => d(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ H("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ H("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ H("div", {
				className: n("flex flex-col gap-3"),
				children: b.map((e) => {
					let i = t[e.id] ?? [], a = f === e.id, c = a || m === e.id;
					return /* @__PURE__ */ U("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => r(e.id),
						onKeyDown: s(() => r(e.id)),
						onMouseEnter: () => p(e.id),
						onMouseLeave: () => p(null),
						onFocus: () => h(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || h((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-surface border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", a ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ H("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ U("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ U("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ H("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ H(pe, { status: e.status }),
											e.type && /* @__PURE__ */ H("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ U("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ H("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ H("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ U("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", fe(e.updatedAt)]
									})
								]
							}),
							i.length > 0 && /* @__PURE__ */ H("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ H(me, {
									users: i,
									onClickUser: (t) => o(e.id, t)
								})
							}),
							c && /* @__PURE__ */ H("button", {
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
			e.length > 10 && /* @__PURE__ */ U("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ H("button", {
						"data-testid": "pagination-prev",
						disabled: y <= 1,
						onClick: () => _((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ U("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							y,
							" of ",
							v
						]
					}),
					/* @__PURE__ */ H("button", {
						"data-testid": "pagination-next",
						disabled: y >= v,
						onClick: () => _((e) => Math.min(v, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y >= v ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-surface text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ H(l, {
				open: u,
				onClose: () => d(!1),
				onCreate: i
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/StandaloneTiptap.tsx
var K = "prosemirror";
function ge(e) {
	return e.ydoc !== void 0;
}
function q(e) {
	return ge(e) ? /* @__PURE__ */ H(_e, { ...e }) : /* @__PURE__ */ H(ve, { ...e });
}
function _e({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = K, editable: o, placeholder: s, className: c, onFragmentReady: l }) {
	let u = R(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), d = z(!1);
	return d.current || (d.current = !0, l?.(u, e)), /* @__PURE__ */ H("div", {
		className: n(c),
		children: /* @__PURE__ */ H(m, {
			fragment: u,
			ydoc: e,
			provider: t,
			user: i,
			editable: o,
			placeholder: s
		})
	});
}
function ve({ gatewayUrl: r, docId: i, authToken: a, channel: o, user: s, fragmentName: c = K, editable: l, placeholder: u, className: d, onFragmentReady: f, loadingSlot: p, requireSync: h }) {
	let g = o ?? `doc:${i}`, _ = z(/* @__PURE__ */ new Set()), v = I((e) => (_.current.add(e), () => {
		_.current.delete(e);
	}), []), y = I((e) => {
		_.current.forEach((t) => t(e));
	}, []), b = R(() => ({
		wsUrl: r,
		cognitoToken: a,
		defaultChannel: g
	}), [
		r,
		a,
		g
	]), x = t({
		config: b,
		onMessage: y
	}), { ydoc: S, provider: C, synced: w } = e({
		documentId: i,
		ws: x,
		onMessage: v
	}), T = R(() => S ? S.getXmlFragment(c) : null, [S, c]), E = !!S && !!T && (h !== !0 || w), D = z(!1);
	return !D.current && E && T && S && (D.current = !0, f?.(T, S)), E ? /* @__PURE__ */ H("div", {
		className: n(d),
		children: /* @__PURE__ */ H(m, {
			fragment: T,
			ydoc: S,
			provider: C,
			user: s,
			editable: l,
			placeholder: u
		})
	}) : /* @__PURE__ */ H("div", {
		className: n(d),
		children: p ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function J({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ U("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ U("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ U("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ U("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ H("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ H("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var ye = {
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
}, be = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
}, xe = {
	bg: "var(--color-surface-hover)",
	text: "var(--color-text-secondary)"
};
function Y({ item: e, onAck: t, onReject: r }) {
	let [i, a] = B(!1), [o, s] = B(""), [l, u] = B("none"), d = z(e.status), f = ye[e.status] ?? xe, p = be[e.priority] ?? "var(--color-neutral)", [m, h] = B(!1), g = z(null);
	L(() => () => {
		g.current && clearTimeout(g.current);
	}, []), L(() => {
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
	return /* @__PURE__ */ U("div", {
		className: n("bg-surface border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", l === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : l === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ U("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ H("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ H("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: f.bg,
							color: f.text
						},
						children: e.status
					}),
					/* @__PURE__ */ H("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: p,
							border: `1px solid ${p}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ U("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ H("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ U("span", { children: [
					"Approved by ",
					/* @__PURE__ */ H("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ U(V, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ U(V, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ U("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ H("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ U("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ H("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ U(V, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ U(V, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ U("div", { children: [/* @__PURE__ */ U("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ H("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: m,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ H("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", m && "opacity-60 cursor-not-allowed"),
						onClick: v,
						disabled: m,
						children: "Reject"
					}),
					!i && /* @__PURE__ */ H("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => a(!0),
						children: "Add note"
					})
				]
			}), i && /* @__PURE__ */ U("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ H(c, {
					value: o,
					onChange: (e) => s(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), o.trim() && _()), e.key === "Escape" && (a(!1), s(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ U("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ H("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: _,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ H("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: v,
							disabled: m,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ H("button", {
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
var X = {
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
function Z({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: o, comments: s, onAddComment: c, onResolveThread: l, onUnresolveThread: u, participants: d }) {
	let f = X[e.type] ?? X.custom, p = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ U("div", {
		className: n("bg-surface border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ H("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ H("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: f.bg,
					color: f.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ H("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ H(m, {
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
			!i && e.items.length === 0 && /* @__PURE__ */ U("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ U("div", { children: [e.items.map((e) => /* @__PURE__ */ H(Y, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ U("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					p,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			c && /* @__PURE__ */ H(O, {
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
function Se({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = B(0), _ = Math.max(1, Math.ceil(e.length / Q)), v = h * Q, y = e.slice(v, v + Q);
	if (L(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Q)), s?.());
	}, [
		o,
		e.length,
		s
	]), L(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ H("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ U("div", { children: [
		/* @__PURE__ */ H(J, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ H("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ U("div", { children: [a.length > 0 && /* @__PURE__ */ U("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ H("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ H("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ H(Z, {
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
		/* @__PURE__ */ U("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ H("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-surface text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ U("span", {
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
				/* @__PURE__ */ H("button", {
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
function Ce(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function we(e, t) {
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
function Te(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function Ee(e) {
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
function De(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function Oe({ events: e, participants: t }) {
	let [r, i] = B(!1);
	return /* @__PURE__ */ U("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ U("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ U("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ H("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ U(V, { children: [t.length > 0 && /* @__PURE__ */ U("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ H("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ U("span", {
				className: n("inline-flex items-center gap-1 bg-surface border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ H("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					De(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ H("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ H("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ U("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ H("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: Te(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ U("div", { children: [
						/* @__PURE__ */ H("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ U("span", {
							className: n("text-neutral"),
							children: [
								Ce(e.eventType),
								" ",
								we(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ H("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: Ee(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
//#region src/components/doc-editor/ProposalCard.tsx
var ke = {
	high: "High confidence",
	medium: "Needs your confirmation",
	low: "Unplaced"
}, Ae = {
	high: "success",
	medium: "warning",
	low: "neutral"
};
function $({ label: e, children: t }) {
	return /* @__PURE__ */ U("div", {
		className: "flex gap-2 text-xs",
		children: [/* @__PURE__ */ H("span", {
			className: "shrink-0 w-16 text-text-tertiary",
			children: e
		}), /* @__PURE__ */ H("span", {
			className: "min-w-0 flex-1 text-text-secondary break-words",
			children: t
		})]
	});
}
function je({ before: e, after: t }) {
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1",
		children: [/* @__PURE__ */ U("div", {
			className: "rounded border border-danger-border bg-danger-bg px-2 py-1",
			children: [/* @__PURE__ */ H("div", {
				className: "text-[10px] uppercase tracking-wide text-danger-fg/70",
				children: "Now"
			}), /* @__PURE__ */ H("div", {
				className: "text-xs text-danger-fg break-words line-through decoration-danger-fg/40",
				children: e || /* @__PURE__ */ H("span", {
					className: "italic opacity-60 no-underline",
					children: "(empty)"
				})
			})]
		}), /* @__PURE__ */ U("div", {
			className: "rounded border border-success-border bg-success-bg px-2 py-1",
			children: [/* @__PURE__ */ H("div", {
				className: "text-[10px] uppercase tracking-wide text-success-fg/70",
				children: "Proposed"
			}), /* @__PURE__ */ H("div", {
				className: "text-xs text-success-fg break-words",
				children: t || /* @__PURE__ */ H("span", {
					className: "italic opacity-60",
					children: "(removed)"
				})
			})]
		})]
	});
}
function Me({ utterance: e, kind: t, status: a, confidence: s, attachState: c, targetLabel: l, targetReason: u, before: d, after: f, edits: p, rationale: m, draftError: h, onAccept: g, onReject: _, onRedraft: v, onReattach: y, onConfirmAttachment: b, className: x, "data-testid": S = "proposal-card" }) {
	let [C, w] = B(!1), [T, E] = B(null), [D, O] = B(!1), [k, A] = B(""), j = a === "applied", M = a === "rejected", N = j || M;
	async function P() {
		w(!0), E(null);
		try {
			let e = await g();
			E(e);
		} catch (e) {
			E({
				ok: !1,
				message: e instanceof Error ? e.message : String(e)
			});
		} finally {
			w(!1);
		}
	}
	let F = t === "prose" ? p ?? [] : [{
		before: d ?? "",
		after: f ?? ""
	}];
	return /* @__PURE__ */ U("div", {
		"data-testid": S,
		"data-status": a,
		"data-confidence": s,
		className: n("flex flex-col gap-3 rounded-lg border bg-surface p-3", j ? "border-success-border" : "border-border", M && "opacity-60", x),
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [
					/* @__PURE__ */ H(i, {
						tone: "info",
						size: "sm",
						uppercase: !0,
						"data-testid": `${S}-author`,
						children: "AI proposal"
					}),
					/* @__PURE__ */ H(i, {
						tone: Ae[s],
						size: "sm",
						children: ke[s]
					}),
					c === "healed" && /* @__PURE__ */ H(i, {
						tone: "caution",
						size: "sm",
						"data-testid": `${S}-healed`,
						children: "Re-found by quote — check this"
					}),
					c === "author_only" && /* @__PURE__ */ H(i, {
						tone: "neutral",
						size: "sm",
						children: "Only you can see this"
					}),
					j && /* @__PURE__ */ H(i, {
						tone: "success",
						size: "sm",
						"data-testid": `${S}-applied`,
						children: "Applied"
					}),
					M && /* @__PURE__ */ H(i, {
						tone: "neutral",
						size: "sm",
						children: "Rejected"
					})
				]
			}),
			/* @__PURE__ */ U("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e,
					"”"
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1",
				children: [
					l && /* @__PURE__ */ H($, {
						label: "Target",
						children: l
					}),
					u && /* @__PURE__ */ H($, {
						label: "Why",
						children: u
					}),
					m && /* @__PURE__ */ H($, {
						label: "Rationale",
						children: m
					})
				]
			}),
			a === "drafting" && /* @__PURE__ */ H("div", {
				className: "text-xs text-text-tertiary",
				"data-testid": `${S}-drafting`,
				children: "Drafting a proposal…"
			}),
			h && /* @__PURE__ */ H("div", {
				className: "rounded border border-warning-border bg-warning-bg px-2 py-1.5 text-xs text-warning-fg",
				"data-testid": `${S}-draft-error`,
				children: h
			}),
			a !== "drafting" && !h && F.length > 0 && /* @__PURE__ */ H("div", {
				className: "flex flex-col gap-2",
				"data-testid": `${S}-diff`,
				children: F.map((e, t) => /* @__PURE__ */ H(je, {
					before: e.before,
					after: e.after
				}, t))
			}),
			T && !T.ok && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1 rounded border border-danger-border bg-danger-bg px-2 py-1.5 text-xs text-danger-fg",
				"data-testid": `${S}-apply-error`,
				children: [
					/* @__PURE__ */ H("span", {
						className: "font-semibold",
						children: "This was not applied."
					}),
					/* @__PURE__ */ H("span", { children: T.message ?? "The document refused the change." }),
					T.stale && /* @__PURE__ */ U("span", { children: [
						"Drafted against ",
						JSON.stringify(T.stale.expected ?? ""),
						"; the document now reads ",
						JSON.stringify(T.stale.actual ?? ""),
						"."
					] })
				]
			}),
			!N && /* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ H(r, {
						size: "sm",
						variant: "primary",
						disabled: C || a === "drafting" || !!h,
						onClick: P,
						"data-testid": `${S}-accept`,
						children: C ? "Applying…" : t === "field" ? "Apply change" : "Add as suggestion"
					}),
					/* @__PURE__ */ H(r, {
						size: "sm",
						variant: "ghost",
						disabled: C,
						onClick: () => O((e) => !e),
						"data-testid": `${S}-reject`,
						children: "Reject"
					}),
					v && /* @__PURE__ */ H(r, {
						size: "sm",
						variant: "ghost",
						disabled: C,
						onClick: v,
						"data-testid": `${S}-redraft`,
						children: "Re-draft"
					}),
					y && /* @__PURE__ */ H(r, {
						size: "sm",
						variant: "ghost",
						disabled: C,
						onClick: y,
						"data-testid": `${S}-reattach`,
						children: "Move…"
					}),
					b && c === "author_only" && /* @__PURE__ */ H(r, {
						size: "sm",
						variant: "secondary",
						disabled: C,
						onClick: b,
						"data-testid": `${S}-confirm`,
						children: "Right place"
					})
				]
			}),
			D && !N && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ H("label", {
						className: "text-[11px] text-text-tertiary",
						htmlFor: `${S}-reason`,
						children: "Why? (optional — helps the next draft)"
					}),
					/* @__PURE__ */ H(o, {
						id: `${S}-reason`,
						size: "sm",
						value: k,
						onChange: (e) => A(e.target.value),
						"data-testid": `${S}-reason`
					}),
					/* @__PURE__ */ U("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ H(r, {
							size: "sm",
							variant: "danger",
							onClick: () => {
								_(k), O(!1);
							},
							"data-testid": `${S}-reject-confirm`,
							children: "Reject proposal"
						}), /* @__PURE__ */ H(r, {
							size: "sm",
							variant: "ghost",
							onClick: () => O(!1),
							children: "Cancel"
						})]
					})
				]
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/WorkItemInbox.tsx
function Ne({ entry: e, sections: t, onAttach: a, onDismiss: o, testId: s }) {
	let c = [...e.candidates ?? []].sort((e, t) => t.score - e.score), l = new Set(c.map((e) => e.sectionId)), u = t.filter((e) => !l.has(e.id));
	return /* @__PURE__ */ U("li", {
		className: "flex flex-col gap-2 rounded-lg border border-border bg-surface p-3",
		"data-testid": `${s}-entry`,
		"data-item-id": e.itemId,
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex flex-wrap items-center gap-1.5",
				children: [/* @__PURE__ */ H(i, {
					tone: "neutral",
					size: "sm",
					uppercase: !0,
					children: "Unplaced"
				}), e.contextSplit && /* @__PURE__ */ H(i, {
					tone: "caution",
					size: "sm",
					"data-testid": `${s}-split`,
					children: "The screen moved while you spoke"
				})]
			}),
			/* @__PURE__ */ U("blockquote", {
				className: "border-l-2 border-border pl-2 text-sm italic text-text-primary",
				children: [
					"“",
					e.utterance,
					"”"
				]
			}),
			e.reason && /* @__PURE__ */ H("p", {
				className: "text-xs text-text-tertiary",
				children: e.reason
			}),
			c.length > 0 && /* @__PURE__ */ U("div", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] uppercase tracking-wide text-text-tertiary",
					children: "Best guesses"
				}), c.map((t) => /* @__PURE__ */ U("button", {
					type: "button",
					onClick: () => a(e.itemId, t.sectionId),
					className: n("flex flex-col items-start gap-0.5 rounded border border-border", "bg-surface-inset px-2 py-1.5 text-left transition-colors", "hover:bg-surface-hover cursor-pointer"),
					"data-testid": `${s}-candidate`,
					"data-section-id": t.sectionId,
					children: [/* @__PURE__ */ H("span", {
						className: "text-xs font-semibold text-text-primary",
						children: t.sectionTitle ?? t.sectionId
					}), /* @__PURE__ */ H("span", {
						className: "text-[11px] text-text-tertiary",
						children: t.reason
					})]
				}, t.sectionId))]
			}),
			u.length > 0 && /* @__PURE__ */ U("label", {
				className: "flex flex-col gap-1",
				children: [/* @__PURE__ */ H("span", {
					className: "text-[11px] uppercase tracking-wide text-text-tertiary",
					children: "Or file it under"
				}), /* @__PURE__ */ H(f, {
					size: "sm",
					defaultValue: "",
					placeholder: "Choose a section…",
					options: u.map((e) => ({
						value: e.id,
						label: e.title || e.id
					})),
					onChange: (t) => {
						t.target.value && a(e.itemId, t.target.value);
					},
					"data-testid": `${s}-select`
				})]
			}),
			/* @__PURE__ */ H("div", { children: /* @__PURE__ */ H(r, {
				size: "sm",
				variant: "ghost",
				onClick: () => o(e.itemId),
				"data-testid": `${s}-dismiss`,
				children: "Not useful"
			}) })
		]
	});
}
function Pe({ entries: e, sections: t, onAttach: r, onDismiss: i, className: o, "data-testid": s = "work-item-inbox" }) {
	return e.length === 0 ? /* @__PURE__ */ H("div", {
		className: o,
		"data-testid": `${s}-empty`,
		children: /* @__PURE__ */ H(a, {
			title: "Nothing unplaced",
			body: "Remarks we could not confidently attach to a section will wait here.",
			testId: `${s}-empty-state`
		})
	}) : /* @__PURE__ */ H("ul", {
		className: n("flex flex-col gap-2", o),
		"data-testid": s,
		children: e.map((e) => /* @__PURE__ */ H(Ne, {
			entry: e,
			sections: t,
			onAttach: r,
			onDismiss: i,
			testId: s
		}, e.itemId))
	});
}
//#endregion
export { Se as AckMode, M as ActionItemsCard, Oe as ActivityFeed, b as AttachmentsPanel, de as CanvasDocumentView, Z as ChunkViewer, S as CommentThreadNode, te as DiffViewer, ne as DocumentEditorPage, le as DocumentGutter, _ as DocumentHeader, he as DocumentListPage, ce as DocumentToolbar, p as EditorToolbar, D as ExecutiveSummaryCard, v as FollowModeBar, F as HeaderBanner, re as KeyDecisionsCard, oe as MentionDropdown, C as MyMentionsPanel, l as NewDocumentModal, y as ParticipantAvatars, Me as ProposalCard, T as ReaderMode, k as ReviewMode, J as ReviewProgress, Y as ReviewableItem, ae as SectionBlock, O as SectionComments, g as SectionList, E as SectionSummariesCard, q as StandaloneTiptap, ee as TableOfContents, d as TaskItemRow, u as TaskList, m as TiptapEditor, P as VersionHistoryPanel, x as VideoCallPanel, A as VideoHistoryPanel, Pe as WorkItemInbox, ie as countAllComments, N as generateSummaryBullets, se as getInitials, w as relativeTime, ue as stackOffsets, h as useDocumentActions, j as useSidebarPanels };
