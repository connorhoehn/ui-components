import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { r as i, t as a } from "./ChannelHeader-DB1RPq43.js";
import { n as o } from "./DockedPanelContext-pH9A5z1h.js";
import { t as s } from "./Input-DLknWXri.js";
import { t as c } from "./Avatar-BzicCOft.js";
import { n as l, r as u, t as d } from "./ReactionPickerPopover-moHezwrL.js";
import { useEffect as f, useMemo as p, useRef as m, useState as h } from "react";
import { Fragment as g, jsx as _, jsxs as v } from "react/jsx-runtime";
//#region src/utils/identity.ts
var y = [
	"#FF6B6B",
	"#4ECDC4",
	"#45B7D1",
	"#96CEB4",
	"#FECA57",
	"#FF9FF3",
	"#54A0FF",
	"#5F27CD",
	"#00D2D3",
	"#FF9F43",
	"#1DD1A1",
	"#F368E0",
	"#3742FA",
	"#2F3542",
	"#FF3838"
];
function b(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return y[Math.abs(t) % y.length];
}
function x(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function S(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function C({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: l, tone: u = "light", className: d }) {
	let f = u === "dark", p = S(r), m = !o || !!p;
	return /* @__PURE__ */ v("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", d),
		children: [/* @__PURE__ */ _("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ _(c, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ v("div", {
			className: "flex grow flex-col min-w-0",
			children: [
				m && /* @__PURE__ */ v("div", {
					className: "flex items-baseline gap-2 min-w-0",
					children: [!o && /* @__PURE__ */ _("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ _("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ _("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary"),
					children: n
				}),
				l && /* @__PURE__ */ _("div", {
					"data-testid": "message-row-footer",
					className: "mt-1",
					children: l
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var w = /* @__PURE__ */ new Set([
	"P",
	"BR",
	"STRONG",
	"B",
	"EM",
	"I",
	"S",
	"DEL",
	"CODE",
	"PRE",
	"UL",
	"OL",
	"LI",
	"BLOCKQUOTE",
	"A",
	"SPAN"
]), T = /^(https?:|mailto:)/i;
function E(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || T.test(t) ? t : null;
}
function D(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => D(e, `${t}-${n}`));
	if (!w.has(n.tagName)) return /* @__PURE__ */ _("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ _("br", {}, t);
		case "A": {
			let e = E(n.getAttribute("href"));
			return e ? /* @__PURE__ */ _("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ _("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ _("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ _(e, { children: r }, t);
		}
	}
}
function O({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = p(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => D(e, `n${t}`));
	}, [t]);
	return /* @__PURE__ */ _("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? n
	});
}
//#endregion
//#region src/components/social/ReactionChips.tsx
function k(e, t) {
	let n = [], r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Set();
	for (let a of e) {
		let e = `${a.emoji} ${a.userId}`;
		if (i.has(e)) continue;
		i.add(e);
		let o = r.get(a.emoji);
		o || (o = {
			emoji: a.emoji,
			count: 0,
			mine: !1,
			names: []
		}, r.set(a.emoji, o), n.push(a.emoji)), o.count += 1, a.userId === t ? o.mine = !0 : o.names.push(a.displayName ?? a.userId);
	}
	return n.map((e) => r.get(e));
}
function A(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function j({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = p(() => k(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ _("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ v("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: A(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ _("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var M = [
	"👍",
	"🎉",
	"❤️"
];
function N({ quickReactions: t = M, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ _("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: "grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary",
		children: n
	}, r);
	return /* @__PURE__ */ v("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ _("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function P(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function ee(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function F({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ v("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ _("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ _("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: ee(t.timestamp)
		})]
	}), /* @__PURE__ */ _("span", {
		className: "block truncate text-xs text-text-secondary",
		children: P(t.text)
	})] });
	return /* @__PURE__ */ v("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ _("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ _("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ _("button", {
			type: "button",
			"data-testid": `${a}-dismiss`,
			"aria-label": "Remove quote",
			onClick: r,
			className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
			children: "✕"
		})]
	});
}
//#endregion
//#region src/components/social/ChatAttachment.tsx
function I(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function L(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function R({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = I(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ v("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ _("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: o ? /* @__PURE__ */ _("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : /* @__PURE__ */ _("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ v("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ _("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ _("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: L(t.size)
			})]
		})]
	}) : /* @__PURE__ */ _("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ v("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: [/* @__PURE__ */ _(B, {}), /* @__PURE__ */ v("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ _("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ _("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: L(t.size)
				})]
			})]
		})
	});
}
function z({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : L(o);
	return /* @__PURE__ */ v("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ _("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ _(B, {}),
			/* @__PURE__ */ v("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ v("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ _("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ _("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ _("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ _("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ _("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ _("button", {
				type: "button",
				onClick: () => r(t.transferId),
				"aria-label": `Cancel upload of ${t.name}`,
				"data-testid": "transfer-bubble-cancel",
				className: e("shrink-0 rounded px-1.5 py-0.5 text-xs", "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
				children: "✕"
			})
		]
	});
}
function B() {
	return /* @__PURE__ */ _("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ _("path", {
			d: "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function te(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function ne(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function re({ messages: n, onSend: r, disabled: i = !1, onTyping: a, typingUsers: c = [], composer: p, currentUserId: y, reactionsFor: b, onToggleReaction: x, onReply: S, onTogglePin: w, pinnedMessageIds: T, onJumpToMessage: E, highlightedMessageId: D, tone: k = "light", showHeader: A, fill: M, onLoadMore: P, hasMore: ee, loadingMore: I = !1, onSendFiles: L, transfers: B = [], currentActor: re, onCancelTransfer: ae, attachmentSrc: V, onOpenAttachment: H, acceptFiles: U, maxFileSize: W, onFileError: G, emojis: oe = d }) {
	let K = k === "dark", se = o(), ce = A ?? !(se?.hasHeader ?? !1), q = M ?? se?.fillsHeight ?? !1, [J, Y] = h(""), X = m(null), Z = m(null), le = !!P && ee !== !1, ue = m(null), de = m(null), [fe, pe] = h(!1), me = !!L && !i, [he, Q] = h(0), $ = m(!0), ge = m(n.length), _e = n.length + B.length, ve = m(null);
	function ye() {
		let e = X.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, Q(0));
	}
	function be() {
		let e = X.current;
		if (!e) return;
		let t = te(e);
		$.current = t, t && Q(0);
	}
	f(() => {
		let e = X.current, t = ge.current, n = _e - t;
		if (ge.current = _e, !e) return;
		let r = ve.current;
		if (r && n > 0) {
			ve.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, Q(0)) : n > 0 && Q((e) => e + n);
	}, [_e]);
	function xe() {
		let e = X.current;
		e && (ve.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), P?.();
	}
	f(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function Se() {
		let e = J.trim();
		!e || i || (Z.current && clearTimeout(Z.current), Z.current = null, a?.(!1), $.current = !0, r(e), Y(""));
	}
	function Ce(e) {
		!me || e.length === 0 || ($.current = !0, L?.(e));
	}
	function we(e) {
		if (!me) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Ce(t));
	}
	function Te(e) {
		Y((t) => t + e), pe(!1);
	}
	function Ee(e) {
		i || (a?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => a?.(!1), 2e3)), e.key === "Enter" && !i && J.trim() && Se();
	}
	let De = /* @__PURE__ */ v("div", {
		"data-testid": "chat-panel",
		className: e(q ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", K ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			ce && /* @__PURE__ */ v("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", K ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			c.length > 0 && /* @__PURE__ */ _("div", {
				className: e("text-xs italic mb-1 shrink-0", K ? "text-white/50" : "text-text-secondary"),
				children: ne(c)
			}),
			/* @__PURE__ */ v("div", {
				className: e("relative flex flex-col mb-2", q ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ v("div", {
					ref: X,
					onScroll: be,
					"data-testid": "chat-panel-messages",
					className: e("overflow-y-auto overflow-x-hidden", q ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [
						le && n.length > 0 && /* @__PURE__ */ _("div", {
							className: "flex justify-center pb-1",
							children: /* @__PURE__ */ _("button", {
								type: "button",
								"data-testid": "chat-panel-load-more",
								onClick: xe,
								disabled: I,
								className: e("rounded px-2 py-1 text-xs disabled:opacity-60", K ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
								children: I ? "Loading…" : "Load earlier messages"
							})
						}),
						n.length === 0 ? /* @__PURE__ */ _("div", {
							className: e("text-sm", K ? "text-white/40" : "text-text-secondary"),
							children: "No messages yet"
						}) : n.map((t, n) => {
							let r = t.displayName ?? t.clientId.slice(0, 8), i = t.attachments ?? [], a = t.metadata?.html, o = typeof a == "string" ? a : void 0, s = /* @__PURE__ */ _(O, {
								html: o,
								text: t.content
							}), c = i.length === 0 ? s : /* @__PURE__ */ v(g, { children: [(t.content || o) && s, i.map((e) => /* @__PURE__ */ _(R, {
								attachment: e,
								src: V?.(e),
								onOpen: H
							}, e.id))] }), l = t.id ?? "", u = l && b ? b(l) : [], d = t.metadata?.replyTo, f = !!l && !!T?.has(l), p = /* @__PURE__ */ v(g, { children: [
								d && /* @__PURE__ */ _(F, {
									quote: d,
									onJump: E,
									className: "mb-1"
								}),
								f && /* @__PURE__ */ _("span", {
									className: "mb-0.5 block text-[11px] text-text-tertiary",
									"data-testid": "pinned-marker",
									children: "📌 Pinned"
								}),
								c,
								u.length > 0 && y && x && /* @__PURE__ */ _(j, {
									reactions: u,
									currentUserId: y,
									onToggle: (e) => x(l, e)
								})
							] });
							return /* @__PURE__ */ v("div", {
								"data-testid": "chat-message",
								"data-message-id": l || void 0,
								className: e("group relative rounded-md", l && l === D && "bg-surface-inset ring-1 ring-primary transition-colors"),
								children: [/* @__PURE__ */ _(C, {
									author: r,
									content: p,
									timestamp: t.timestamp,
									avatarUrl: t.avatarUrl,
									tone: k
								}), l && (x || S || w) && /* @__PURE__ */ _(N, {
									className: "absolute right-2 top-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 focus-within:opacity-100",
									onReact: x ? (e) => x(l, e) : void 0,
									onReply: S ? () => S(t) : void 0,
									onTogglePin: w ? () => w(t) : void 0,
									pinned: f
								})]
							}, t.id ?? n);
						}),
						B.map((e) => /* @__PURE__ */ _(C, {
							author: e.actor,
							timestamp: "",
							tone: k,
							content: /* @__PURE__ */ _(z, {
								transfer: e,
								mine: !!re && e.actor === re,
								onCancel: ae
							})
						}, e.transferId))
					]
				}), he > 0 && /* @__PURE__ */ v("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: ye,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", K ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						he,
						" new message",
						he === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			p ? /* @__PURE__ */ _("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				children: p
			}) : /* @__PURE__ */ v("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					L && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !me,
						onClick: () => ue.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", K ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ _(ie, {})
					}), /* @__PURE__ */ _("input", {
						ref: ue,
						type: "file",
						multiple: !0,
						accept: U,
						"aria-hidden": "true",
						tabIndex: -1,
						className: "hidden",
						onChange: (e) => {
							let t = Array.from(e.target.files ?? []), n = W ? t.filter((e) => e.size > W) : [];
							n.length > 0 && G?.(`Skipped ${n.length} file(s) over the size limit.`), Ce(t.filter((e) => !n.includes(e))), e.target.value = "";
						}
					})] }),
					/* @__PURE__ */ _("button", {
						ref: de,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": fe,
						title: "Insert emoji",
						disabled: i,
						onClick: () => pe((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", K ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ _("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ _(l, {
						open: fe,
						onSelect: Te,
						onClose: () => pe(!1),
						triggerRef: de,
						emojis: oe
					}),
					/* @__PURE__ */ _(s, {
						size: "sm",
						value: J,
						onChange: (e) => Y(e.target.value),
						onKeyDown: Ee,
						onPaste: we,
						disabled: i,
						placeholder: i ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", K && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ _(t, {
						variant: "primary",
						size: "sm",
						onClick: Se,
						disabled: i || !J.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return L ? /* @__PURE__ */ _(u, {
		onFiles: Ce,
		accept: U,
		maxSize: W,
		onError: G,
		disabled: i,
		className: q ? "flex h-full min-h-0 flex-col" : void 0,
		children: De
	}) : De;
}
function ie() {
	return /* @__PURE__ */ _("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ _("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function ae({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ v("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ v("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ _("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ _("div", { children: e.map((e) => {
			let n = b(e.metadata.email ?? e.clientId), r = x(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ v("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ _("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ _("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ _("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ _("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function V({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ v("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ _("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ _("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ v("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ _("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ _("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ _("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function H(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function U({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ _("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ _("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function W({ pins: e, onJump: t, onUnpin: n, className: i, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ _(U, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ _(r, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ _(V, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ _(c, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				H(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ _("button", {
				type: "button",
				"aria-label": "Unpin",
				title: "Unpin",
				"data-testid": "pinned-message-unpin",
				onClick: () => n(e.messageId),
				className: "grid h-6 w-6 place-items-center rounded bg-transparent text-xs text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
				children: "✕"
			})
		}, e.messageId))
	});
}
function G({ files: e, thumbnailSrc: t, onJump: n, className: i, "data-testid": a = "channel-files-panel" }) {
	return /* @__PURE__ */ _(U, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ _(r, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = I(e.attachment);
			return /* @__PURE__ */ _(V, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ _("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ _("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					L(e.attachment.size),
					H(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function oe({ mentions: e, onJump: t, className: n, "data-testid": i = "mentions-panel" }) {
	return /* @__PURE__ */ _(U, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ _(r, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ _(V, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ v("span", {
				className: "relative",
				children: [/* @__PURE__ */ _(c, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ _("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				H(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function K(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function se(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function ce({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ _(U, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ _(r, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ _(V, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ _("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ _("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [H(e.startedAt), K(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : se(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function q({ documents: t, onOpen: n, onCreate: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = i && /* @__PURE__ */ v("button", {
		type: "button",
		onClick: i,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ _("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ v("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ _(r, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ _("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ _(V, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ _("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					H(e.updatedAt),
					e.activeEditors ? `${e.activeEditors} editing` : ""
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var J = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], Y = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function X({ name: t, description: r, online: o, avatarUrl: s, features: c = J, children: l, files: u = [], thumbnailSrc: d, documents: f = [], onOpenDocument: p, onCreateDocument: m, pins: y = [], onUnpin: b, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callInProgress: D = !1, headerActions: O, view: k, onViewChange: A, className: j, "data-testid": M = "conversation-surface" }) {
	let N = new Set(c), [P, ee] = h("chat"), F = k ?? P, I = N.has(F) ? F : c[0] ?? "chat", L = (e) => {
		k === void 0 && ee(e), A?.(e);
	}, R = (e) => e || void 0, z = c.filter((e) => Y[e]).map((e) => ({
		id: e,
		label: Y[e],
		badge: e === "files" ? R(u.length) : e === "documents" ? R(f.length) : e === "pins" ? R(y.length) : e === "calls" ? R(C.length) : e === "mentions" ? R(x.filter((e) => e.unread).length) : void 0
	})), B = (e) => {
		L("chat"), T?.(e);
	};
	return /* @__PURE__ */ v("section", {
		className: e("flex min-w-0 flex-col", j),
		"data-testid": M,
		children: [
			/* @__PURE__ */ _(a, {
				name: t,
				description: r,
				online: o,
				avatarUrl: s,
				"data-testid": `${M}-header`,
				tabs: z.length > 1 ? /* @__PURE__ */ _(i, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: I,
					onValueChange: (e) => L(e),
					items: z
				}) : void 0,
				actions: E || O ? /* @__PURE__ */ v(g, { children: [E && /* @__PURE__ */ v(g, { children: [/* @__PURE__ */ _(n, {
					"aria-label": D ? "Join the call" : "Start an audio call",
					title: D ? "Join the call" : "Audio call",
					"data-testid": `${M}-audio-call`,
					onClick: () => E(!0),
					children: "📞"
				}), /* @__PURE__ */ _(n, {
					"aria-label": D ? "Join the call with video" : "Start a video call",
					title: D ? "Join the call" : "Video call",
					"data-testid": `${M}-video-call`,
					variant: D ? "primary" : "ghost",
					onClick: () => E(!1),
					children: "🎥"
				})] }), O] }) : void 0
			}),
			N.has("files") && I === "files" && /* @__PURE__ */ _(G, {
				className: "min-h-0 flex-1",
				files: u,
				thumbnailSrc: d,
				onJump: T ? B : void 0
			}),
			N.has("documents") && I === "documents" && /* @__PURE__ */ _(q, {
				className: "min-h-0 flex-1",
				documents: f,
				onOpen: p,
				onCreate: m
			}),
			N.has("pins") && I === "pins" && /* @__PURE__ */ _(W, {
				className: "min-h-0 flex-1",
				pins: y,
				onUnpin: b,
				onJump: T ? B : void 0
			}),
			N.has("mentions") && I === "mentions" && /* @__PURE__ */ _(oe, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					L("chat"), S(e, t);
				} : void 0
			}),
			N.has("calls") && I === "calls" && /* @__PURE__ */ _(ce, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			N.has("chat") && /* @__PURE__ */ _("div", {
				className: "min-h-0 flex-1",
				"data-testid": `${M}-chat`,
				hidden: I !== "chat",
				children: l
			})
		]
	});
}
//#endregion
export { S as C, C as S, x as T, N as _, oe as a, k as b, K as c, R as d, z as f, P as g, F as h, G as i, ae as l, I as m, X as n, ce as o, L as p, q as r, W as s, J as t, re as u, j as v, b as w, O as x, A as y };
