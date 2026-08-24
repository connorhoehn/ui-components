import { g as e, t } from "./useWebSocket-BKfGpImp.js";
import { t as n } from "./cn-DhjIN-s0.js";
import { t as r } from "./activationKey-CjbL3LUv.js";
import { t as i } from "./Textarea-C3t5PCLv.js";
import { a, i as o, n as s, o as c, r as l } from "./renderers-Ceq-XDqT.js";
import { C as u, D as d, E as f, O as p, S as m, T as h, _ as g, a as _, b as v, c as y, d as b, f as x, g as S, h as C, i as w, k as T, l as E, m as D, o as O, p as k, r as A, s as ee, t as te, u as ne, v as re, w as ie, x as ae, y as j } from "./DocumentEditorPage-DVak-ySU.js";
import { useCallback as M, useEffect as N, useMemo as P, useRef as F, useState as I } from "react";
import { Fragment as L, jsx as R, jsxs as z } from "react/jsx-runtime";
//#region src/components/doc-editor/DocumentListPage.tsx
function oe(e) {
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
var B = {
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
function V({ status: e }) {
	let t = B[e] ?? B.draft;
	return /* @__PURE__ */ R("span", {
		className: n("inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full capitalize leading-[18px]"),
		style: {
			background: t.bg,
			color: t.color
		},
		children: e
	});
}
var H = {
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
function U({ users: e, onClickUser: t }) {
	let r = e.slice(0, 5), i = e.length - 5;
	return /* @__PURE__ */ z("div", {
		className: n("flex items-center gap-0.5"),
		children: [r.map((e, r) => {
			let i = H[e.mode ?? "editor"] ?? H.editor, a = e.idle === !0, o = a ? "var(--color-warning)" : "var(--color-success)";
			return /* @__PURE__ */ z("button", {
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
					/* @__PURE__ */ R("div", {
						className: n("w-8 h-8 rounded-full text-white text-[11px] font-bold flex items-center justify-center border-2 border-white"),
						style: { background: a ? `${e.color}99` : e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").slice(0, 2).toUpperCase()
					}),
					/* @__PURE__ */ R("div", {
						className: n("absolute -bottom-px -right-px w-2.5 h-2.5 rounded-full border-2 border-white"),
						style: { background: o }
					}),
					/* @__PURE__ */ R("div", {
						className: n("absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-white border border-border flex items-center justify-center text-[8px] leading-none"),
						children: i.icon
					})
				]
			}, e.userId);
		}), i > 0 && /* @__PURE__ */ z("div", {
			className: n("w-8 h-8 rounded-full bg-neutral text-white text-[10px] font-bold flex items-center justify-center border-2 border-white -ml-1.5"),
			children: ["+", i]
		})]
	});
}
function W({ documents: e, presence: t, onOpenDocument: i, onCreateDocument: a, onDeleteDocument: o, onJumpToUser: s, hideHeader: l }) {
	let [u, d] = I(!1), [f, p] = I(null), [m, h] = I(null), [g, _] = I(1), v = Math.max(1, Math.ceil(e.length / 10)), y = Math.min(g, v), b = P(() => {
		let t = (y - 1) * 10;
		return e.slice(t, t + 10);
	}, [e, y]), x = M((e, t, n) => {
		e.stopPropagation(), window.confirm(`Delete "${n}"? This cannot be undone.`) && o(t);
	}, [o]);
	return /* @__PURE__ */ z("div", {
		className: n("px-4"),
		children: [
			!l && /* @__PURE__ */ z("div", {
				className: n("flex items-center justify-between mb-5"),
				children: [/* @__PURE__ */ R("h1", {
					className: n("m-0 text-[22px] font-bold text-text-primary"),
					children: "Documents"
				}), /* @__PURE__ */ z("button", {
					"data-testid": "new-document-btn",
					onClick: () => d(!0),
					className: n("flex items-center gap-1.5 px-4 py-2 text-sm font-semibold border-none rounded-lg bg-info text-white cursor-pointer font-[inherit]"),
					children: [/* @__PURE__ */ R("span", {
						className: n("text-base leading-none"),
						children: "+"
					}), "New Document"]
				})]
			}),
			e.length === 0 ? /* @__PURE__ */ R("div", {
				"data-testid": "documents-empty",
				className: n("text-center px-4 py-12 text-text-tertiary text-[15px]"),
				children: "No documents yet. Create your first document to get started."
			}) : /* @__PURE__ */ R("div", {
				className: n("flex flex-col gap-3"),
				children: b.map((e) => {
					let a = t[e.id] ?? [], o = f === e.id, c = o || m === e.id;
					return /* @__PURE__ */ z("div", {
						"data-testid": `document-card-${e.id}`,
						role: "button",
						tabIndex: 0,
						"aria-label": `Open ${e.title}`,
						onClick: () => i(e.id),
						onKeyDown: r(() => i(e.id)),
						onMouseEnter: () => p(e.id),
						onMouseLeave: () => p(null),
						onFocus: () => h(e.id),
						onBlur: (t) => {
							t.currentTarget.contains(t.relatedTarget) || h((t) => t === e.id ? null : t);
						},
						className: n("flex items-center gap-4 px-4 py-3.5 bg-white border border-border rounded-lg cursor-pointer relative transition-shadow duration-150", o ? "shadow-[0_4px_12px_rgba(0,0,0,0.08)]" : ""),
						children: [
							/* @__PURE__ */ R("span", {
								className: n("text-2xl shrink-0"),
								children: e.icon
							}),
							/* @__PURE__ */ z("div", {
								className: n("flex-1 min-w-0"),
								children: [
									/* @__PURE__ */ z("div", {
										className: n("flex items-center gap-2 mb-0.5"),
										children: [
											/* @__PURE__ */ R("span", {
												className: n("text-[15px] font-semibold text-text-primary overflow-hidden text-ellipsis whitespace-nowrap"),
												children: e.title
											}),
											/* @__PURE__ */ R(V, { status: e.status }),
											e.type && /* @__PURE__ */ R("span", {
												className: n("inline-block px-2 py-px text-[11px] font-semibold rounded-full bg-surface-hover text-text-secondary whitespace-nowrap shrink-0"),
												children: e.type
											}),
											e.activeCallSessionId && /* @__PURE__ */ z("span", {
												className: n("inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-semibold rounded-full bg-success-bg text-success-fg leading-[18px]"),
												children: [/* @__PURE__ */ R("span", { className: n("w-1.5 h-1.5 rounded-full bg-success animate-pulse") }), "Live Call"]
											})
										]
									}),
									e.description && /* @__PURE__ */ R("div", {
										className: n("text-[13px] text-neutral overflow-hidden text-ellipsis whitespace-nowrap mb-0.5"),
										children: e.description
									}),
									/* @__PURE__ */ z("div", {
										className: n("text-xs text-text-tertiary"),
										children: ["Updated ", oe(e.updatedAt)]
									})
								]
							}),
							a.length > 0 && /* @__PURE__ */ R("div", {
								className: n("shrink-0"),
								children: /* @__PURE__ */ R(U, {
									users: a,
									onClickUser: (t) => s(e.id, t)
								})
							}),
							c && /* @__PURE__ */ R("button", {
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
			e.length > 10 && /* @__PURE__ */ z("div", {
				"data-testid": "pagination-controls",
				className: n("flex items-center justify-center gap-3 mt-4 pt-3 border-t border-border"),
				children: [
					/* @__PURE__ */ R("button", {
						"data-testid": "pagination-prev",
						disabled: y <= 1,
						onClick: () => _((e) => Math.max(1, e - 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y <= 1 ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"),
						children: "Previous"
					}),
					/* @__PURE__ */ z("span", {
						"data-testid": "pagination-info",
						className: n("text-[13px] text-text-secondary font-medium"),
						children: [
							"Page ",
							y,
							" of ",
							v
						]
					}),
					/* @__PURE__ */ R("button", {
						"data-testid": "pagination-next",
						disabled: y >= v,
						onClick: () => _((e) => Math.min(v, e + 1)),
						className: n("px-3.5 py-1.5 text-[13px] font-semibold font-[inherit] border border-border rounded-md", y >= v ? "bg-surface-hover text-text-tertiary cursor-not-allowed" : "bg-white text-text-secondary cursor-pointer"),
						children: "Next"
					})
				]
			}),
			/* @__PURE__ */ R(c, {
				open: u,
				onClose: () => d(!1),
				onCreate: a
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/StandaloneTiptap.tsx
var G = "prosemirror";
function K(e) {
	return e.ydoc !== void 0;
}
function se(e) {
	return K(e) ? /* @__PURE__ */ R(ce, { ...e }) : /* @__PURE__ */ R(le, { ...e });
}
function ce({ ydoc: e, provider: t, fragment: r, user: i, fragmentName: a = G, editable: s, placeholder: c, className: l, onFragmentReady: u }) {
	let d = P(() => r ?? e.getXmlFragment(a), [
		r,
		e,
		a
	]), f = F(!1);
	return f.current || (f.current = !0, u?.(d, e)), /* @__PURE__ */ R("div", {
		className: n(l),
		children: /* @__PURE__ */ R(o, {
			fragment: d,
			ydoc: e,
			provider: t,
			user: i,
			editable: s,
			placeholder: c
		})
	});
}
function le({ gatewayUrl: r, docId: i, authToken: a, channel: s, user: c, fragmentName: l = G, editable: u, placeholder: d, className: f, onFragmentReady: p, loadingSlot: m, requireSync: h }) {
	let g = s ?? `doc:${i}`, _ = F(/* @__PURE__ */ new Set()), v = M((e) => (_.current.add(e), () => {
		_.current.delete(e);
	}), []), y = M((e) => {
		_.current.forEach((t) => t(e));
	}, []), b = P(() => ({
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
	}), T = P(() => S ? S.getXmlFragment(l) : null, [S, l]), E = !!S && !!T && (h !== !0 || w), D = F(!1);
	return !D.current && E && T && S && (D.current = !0, p?.(T, S)), E ? /* @__PURE__ */ R("div", {
		className: n(f),
		children: /* @__PURE__ */ R(o, {
			fragment: T,
			ydoc: S,
			provider: C,
			user: c,
			editable: u,
			placeholder: d
		})
	}) : /* @__PURE__ */ R("div", {
		className: n(f),
		children: m ?? null
	});
}
//#endregion
//#region src/components/doc-editor/ReviewProgress.tsx
function q({ current: e, total: t }) {
	let r = t > 0 ? Math.round(e / t * 100) : 0;
	return /* @__PURE__ */ z("div", {
		className: n("mb-4"),
		children: [/* @__PURE__ */ z("div", {
			className: n("text-[13px] text-text-secondary mb-1 flex justify-between"),
			children: [/* @__PURE__ */ z("span", { children: [
				e,
				" of ",
				t,
				" sections reviewed"
			] }), /* @__PURE__ */ z("span", { children: [r, "%"] })]
		}), /* @__PURE__ */ R("div", {
			className: n("h-2 bg-surface-emphasis rounded overflow-hidden"),
			children: /* @__PURE__ */ R("div", {
				className: n("h-full bg-info rounded transition-[width] duration-300 ease-in-out"),
				style: { width: `${r}%` }
			})
		})]
	});
}
//#endregion
//#region src/components/doc-editor/ReviewableItem.tsx
var ue = {
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
}, J = {
	low: "var(--color-neutral)",
	medium: "var(--color-warning)",
	high: "var(--color-danger)"
};
function Y({ item: e, onAck: t, onReject: r }) {
	let [a, o] = I(!1), [s, c] = I(""), [l, u] = I("none"), d = F(e.status), f = ue[e.status], [p, m] = I(!1), h = F(null);
	N(() => () => {
		h.current && clearTimeout(h.current);
	}, []), N(() => {
		d.current === "pending" && e.status === "acked" ? u("ack") : d.current === "pending" && e.status === "rejected" && u("reject"), d.current = e.status;
	}, [e.status]);
	let g = () => {
		p || (m(!0), u("ack"), h.current = setTimeout(() => {
			h.current = null, t(s || void 0), c(""), o(!1), m(!1);
		}, 150));
	}, _ = () => {
		if (!p) {
			if (!s.trim()) {
				o(!0);
				return;
			}
			m(!0), u("reject"), h.current = setTimeout(() => {
				h.current = null, r(s), c(""), o(!1), m(!1);
			}, 150);
		}
	};
	return /* @__PURE__ */ z("div", {
		className: n("bg-white border border-border rounded-lg px-4 py-3 mb-2 transition-all duration-300 ease-in-out", l === "ack" ? "animate-[ackPulse_0.6s_ease-out] border-success bg-success-bg" : l === "reject" ? "animate-[rejectPulse_0.6s_ease-out] border-danger bg-danger-bg" : ""),
		children: [
			/* @__PURE__ */ z("div", {
				className: n("flex items-center mb-1.5"),
				children: [
					/* @__PURE__ */ R("span", {
						className: n("text-sm font-medium flex-1 text-text-primary"),
						children: e.text
					}),
					/* @__PURE__ */ R("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2"),
						style: {
							background: f.bg,
							color: f.text
						},
						children: e.status
					}),
					/* @__PURE__ */ R("span", {
						className: n("inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ml-2 bg-transparent"),
						style: {
							color: J[e.priority],
							border: `1px solid ${J[e.priority]}`
						},
						children: e.priority
					})
				]
			}),
			e.status === "acked" && /* @__PURE__ */ z("div", {
				className: n("flex items-center gap-1.5 text-xs text-text-secondary mb-1"),
				children: [/* @__PURE__ */ R("span", {
					className: n("w-5 h-5 rounded-full bg-success text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✓"
				}), /* @__PURE__ */ z("span", { children: [
					"Approved by ",
					/* @__PURE__ */ R("strong", {
						className: n("text-text-primary"),
						children: e.ackedBy?.slice(0, 8) ?? "user"
					}),
					e.ackedAt && /* @__PURE__ */ z(L, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ z(L, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "rejected" && /* @__PURE__ */ z("div", {
				className: n("flex items-center gap-1.5 text-xs text-danger-fg mb-1"),
				children: [/* @__PURE__ */ R("span", {
					className: n("w-5 h-5 rounded-full bg-danger text-white inline-flex items-center justify-center text-[10px] font-bold shrink-0"),
					children: "✕"
				}), /* @__PURE__ */ z("span", { children: [
					"Rejected by ",
					/* @__PURE__ */ R("strong", { children: e.ackedBy?.slice(0, 8) ?? "user" }),
					e.ackedAt && /* @__PURE__ */ z(L, { children: [" · ", new Date(e.ackedAt).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit"
					})] }),
					e.notes && /* @__PURE__ */ z(L, { children: [" — ", e.notes] })
				] })]
			}),
			e.status === "pending" && /* @__PURE__ */ z("div", { children: [/* @__PURE__ */ z("div", {
				className: n("flex gap-2 mt-1.5"),
				children: [
					/* @__PURE__ */ R("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-success text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: g,
						disabled: p,
						children: "Acknowledge"
					}),
					/* @__PURE__ */ R("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold border-none rounded-md cursor-pointer bg-danger text-white", p && "opacity-60 cursor-not-allowed"),
						onClick: _,
						disabled: p,
						children: "Reject"
					}),
					!a && /* @__PURE__ */ R("button", {
						type: "button",
						className: n("px-3.5 py-1.5 text-[13px] font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
						onClick: () => o(!0),
						children: "Add note"
					})
				]
			}), a && /* @__PURE__ */ z("div", {
				className: n("mt-2"),
				children: [/* @__PURE__ */ R(i, {
					value: s,
					onChange: (e) => c(e.target.value),
					onKeyDown: (e) => {
						e.key === "Enter" && !e.shiftKey && (e.preventDefault(), s.trim() && g()), e.key === "Escape" && (o(!1), c(""));
					},
					placeholder: "Add notes or rejection reason... (Enter to submit, Esc to cancel)",
					autoFocus: !0,
					className: n("min-h-[60px] resize-y")
				}), /* @__PURE__ */ z("div", {
					className: n("flex gap-1.5 mt-1.5"),
					children: [
						/* @__PURE__ */ R("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-success text-white"),
							onClick: g,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Acknowledge"
						}),
						/* @__PURE__ */ R("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold border-none rounded-md cursor-pointer bg-danger text-white"),
							onClick: _,
							disabled: p,
							tabIndex: 0,
							children: "Submit & Reject"
						}),
						/* @__PURE__ */ R("button", {
							type: "button",
							className: n("px-3 py-[5px] text-xs font-semibold rounded-md cursor-pointer bg-transparent text-text-secondary border border-border-field"),
							onClick: () => {
								o(!1), c("");
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
function Z({ section: e, onAckItem: t, onRejectItem: r, fragment: i, ydoc: a, provider: s, comments: c, onAddComment: l, onResolveThread: u, onUnresolveThread: d, participants: f }) {
	let p = X[e.type] ?? X.custom, m = e.items.filter((e) => e.status !== "pending").length;
	return /* @__PURE__ */ z("div", {
		className: n("bg-white border border-border rounded-lg p-5 mb-4"),
		children: [
			/* @__PURE__ */ R("h2", {
				className: n("text-xl font-bold m-0 mb-1 text-text-primary"),
				children: e.title
			}),
			/* @__PURE__ */ R("span", {
				className: n("inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full mb-3"),
				style: {
					background: p.bg,
					color: p.text
				},
				children: e.type
			}),
			i && /* @__PURE__ */ R("div", {
				className: n(e.items.length > 0 ? "mb-4" : ""),
				children: /* @__PURE__ */ R(o, {
					fragment: i,
					ydoc: a,
					provider: s,
					user: {
						name: "",
						color: ""
					},
					editable: !1,
					sectionId: e.id
				})
			}),
			!i && e.items.length === 0 && /* @__PURE__ */ z("div", {
				className: n("py-6 text-text-tertiary text-sm text-center"),
				children: [
					"This ",
					e.type,
					" section has no content. Switch to Editor mode to add content."
				]
			}),
			e.items.length > 0 && /* @__PURE__ */ z("div", { children: [e.items.map((e) => /* @__PURE__ */ R(Y, {
				item: e,
				onAck: (n) => t(e.id, n),
				onReject: (t) => r(e.id, t)
			}, e.id)), /* @__PURE__ */ z("div", {
				className: n("text-xs text-text-secondary mt-3 pt-2 border-t border-border-subtle"),
				children: [
					m,
					" of ",
					e.items.length,
					" items reviewed"
				]
			})] }),
			l && /* @__PURE__ */ R(S, {
				comments: c ?? [],
				onAddComment: l,
				participants: f,
				onResolveThread: u,
				onUnresolveThread: d
			})
		]
	});
}
//#endregion
//#region src/components/doc-editor/AckMode.tsx
var Q = 4;
function $({ sections: e, onAckItem: t, onRejectItem: r, participants: i, onSectionFocus: a, jumpToIndex: o, onJumpComplete: s, getSectionFragment: c, ydoc: l, provider: u, comments: d, onAddComment: f, onResolveThread: p, onUnresolveThread: m }) {
	let [h, g] = I(0), _ = Math.max(1, Math.ceil(e.length / Q)), v = h * Q, y = e.slice(v, v + Q);
	if (N(() => {
		o != null && o >= 0 && o < e.length && (g(Math.floor(o / Q)), s?.());
	}, [
		o,
		e.length,
		s
	]), N(() => {
		y.length > 0 && a && a(y[0].id);
	}, [v, a]), e.length === 0) return /* @__PURE__ */ R("div", {
		className: n("text-center p-12 text-text-secondary text-[15px]"),
		children: "No sections to review."
	});
	let b = () => g((e) => Math.max(0, e - 1)), x = () => g((e) => Math.min(_ - 1, e + 1)), S = v + y.length;
	return /* @__PURE__ */ z("div", { children: [
		/* @__PURE__ */ R(q, {
			current: S,
			total: e.length
		}),
		/* @__PURE__ */ R("div", {
			className: n("flex flex-col gap-4"),
			children: y.map((e) => {
				let a = i?.filter((t) => t.currentSectionId === e.id) ?? [];
				return /* @__PURE__ */ z("div", { children: [a.length > 0 && /* @__PURE__ */ z("div", {
					className: n("flex gap-1 mb-1.5 items-center"),
					children: [/* @__PURE__ */ R("span", {
						className: n("text-xs text-text-secondary mr-1"),
						children: "Viewing:"
					}), a.map((e) => /* @__PURE__ */ R("div", {
						title: `${e.displayName} (${e.mode})`,
						className: n("w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-semibold"),
						style: { background: e.color },
						children: e.displayName.split(" ").map((e) => e[0]).join("").toUpperCase().slice(0, 2)
					}, e.clientId))]
				}), /* @__PURE__ */ R(Z, {
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
		/* @__PURE__ */ z("div", {
			className: n("flex justify-between items-center mt-4 py-3"),
			children: [
				/* @__PURE__ */ R("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === 0 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-white text-text-primary cursor-pointer"),
					onClick: b,
					disabled: h === 0,
					children: "Previous"
				}),
				/* @__PURE__ */ z("span", {
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
				/* @__PURE__ */ R("button", {
					type: "button",
					className: n("px-[18px] py-2 text-sm font-semibold border border-border-field rounded-md font-[inherit]", h === _ - 1 ? "bg-surface-inset text-text-tertiary cursor-default" : "bg-white text-text-primary cursor-pointer"),
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
function de(e) {
	return e === "doc.ack" ? "✅" : e === "doc.reject" ? "❌" : e === "doc.add_item" || e === "doc.add_section" ? "➕" : e === "doc.edit_section" ? "✏️" : e === "doc.remove_item" ? "➖" : e === "doc.comment" ? "💬" : e.endsWith(".join") ? "🟢" : e.endsWith(".leave") ? "🔴" : e.startsWith("social.") ? "💬" : e === "pipeline.run.started" ? "▶" : e === "pipeline.run.completed" ? "✓" : e === "pipeline.run.failed" ? "✕" : e === "pipeline.approval.requested" ? "✋" : "•";
}
function fe(e, t) {
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
function pe(e) {
	return e.split(" ").map((e) => e[0] ?? "").join("").toUpperCase().slice(0, 2);
}
function me(e) {
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
function he(e) {
	switch (e) {
		case "editor": return "editing";
		case "reviewer": return "reviewing";
		case "reader": return "reading";
		default: return "online";
	}
}
function ge({ events: e, participants: t }) {
	let [r, i] = I(!1);
	return /* @__PURE__ */ z("div", {
		className: n("bg-surface-panel border border-border rounded-lg overflow-hidden"),
		children: [/* @__PURE__ */ z("button", {
			type: "button",
			"aria-expanded": !r,
			className: n("w-full text-left font-[inherit] flex items-center justify-between px-3 py-2 bg-surface-hover border-b border-border text-[13px] font-semibold text-text-primary cursor-pointer select-none"),
			onClick: () => i((e) => !e),
			children: [/* @__PURE__ */ z("span", { children: ["Activity ", e.length > 0 && `(${e.length})`] }), /* @__PURE__ */ R("span", {
				className: n("text-[11px] font-normal text-text-tertiary"),
				children: r ? "▶" : "▼"
			})]
		}), !r && /* @__PURE__ */ z(L, { children: [t.length > 0 && /* @__PURE__ */ z("div", {
			className: n("flex items-center gap-1.5 px-3 py-1.5 border-b border-border text-[11px] text-neutral flex-wrap"),
			children: [/* @__PURE__ */ R("span", {
				className: n("font-semibold"),
				children: "Active:"
			}), t.map((e) => /* @__PURE__ */ z("span", {
				className: n("inline-flex items-center gap-1 bg-white border border-border rounded-xl px-2 py-0.5 text-[11px] font-medium text-text-primary"),
				children: [
					/* @__PURE__ */ R("span", {
						className: n("w-2 h-2 rounded-full shrink-0"),
						style: { background: e.color }
					}),
					e.displayName,
					" (",
					he(e.mode),
					")"
				]
			}, e.clientId))]
		}), /* @__PURE__ */ R("div", {
			className: n("max-h-[260px] overflow-y-auto py-1"),
			children: e.length === 0 ? /* @__PURE__ */ R("div", {
				className: n("px-3 py-4 text-center text-text-tertiary text-xs"),
				children: "No activity yet. Actions like acknowledging tasks will appear here."
			}) : e.map((e) => /* @__PURE__ */ z("div", {
				className: n("flex items-start gap-2 px-3 py-1.5 text-xs leading-normal border-b border-border-subtle"),
				children: [
					/* @__PURE__ */ R("div", {
						className: n("w-[22px] h-[22px] rounded-full text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-px"),
						style: { background: e.color || "var(--color-text-tertiary)" },
						children: pe(e.displayName || "Unknown")
					}),
					/* @__PURE__ */ z("div", { children: [
						/* @__PURE__ */ R("span", {
							className: n("font-semibold text-text-primary"),
							children: e.displayName || "Unknown"
						}),
						" ",
						/* @__PURE__ */ z("span", {
							className: n("text-neutral"),
							children: [
								de(e.eventType),
								" ",
								fe(e.eventType, e.detail)
							]
						})
					] }),
					/* @__PURE__ */ R("span", {
						className: n("text-[10px] text-text-tertiary whitespace-nowrap ml-auto pl-2 shrink-0"),
						children: me(e.timestamp)
					})
				]
			}, e.id))
		})] })]
	});
}
//#endregion
export { $ as AckMode, E as ActionItemsCard, ge as ActivityFeed, ae as AttachmentsPanel, Z as ChunkViewer, ee as DiffViewer, te as DocumentEditorPage, f as DocumentHeader, W as DocumentListPage, a as EditorToolbar, x as ExecutiveSummaryCard, h as FollowModeBar, k as HeaderBanner, ne as KeyDecisionsCard, v as MentionDropdown, _ as MyMentionsPanel, c as NewDocumentModal, d as ParticipantAvatars, y as ReaderMode, C as ReviewMode, q as ReviewProgress, Y as ReviewableItem, u as SectionBlock, S as SectionComments, m as SectionList, b as SectionSummariesCard, se as StandaloneTiptap, A as TableOfContents, l as TaskItemRow, s as TaskList, o as TiptapEditor, O as VersionHistoryPanel, ie as VideoCallPanel, w as VideoHistoryPanel, g as countAllComments, D as generateSummaryBullets, re as getInitials, j as relativeTime, T as useDocumentActions, p as useSidebarPanels };
