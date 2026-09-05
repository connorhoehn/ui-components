import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { r as i, t as a } from "./ChannelHeader-DB1RPq43.js";
import { n as o } from "./DockedPanelContext-pH9A5z1h.js";
import { t as s } from "./Input-DLknWXri.js";
import { t as c } from "./Avatar-BzicCOft.js";
import { t as l } from "./PresenceAvatars-BkzMACtv.js";
import { n as u, r as d, t as f } from "./ReactionPickerPopover-moHezwrL.js";
import { useEffect as p, useMemo as m, useRef as h, useState as g } from "react";
import { Fragment as _, jsx as v, jsxs as y } from "react/jsx-runtime";
//#region src/utils/identity.ts
var b = [
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
function x(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return b[Math.abs(t) % b.length];
}
function S(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function C(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function w({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: l, tone: u = "light", className: d }) {
	let f = u === "dark", p = C(r), m = !o || !!p;
	return /* @__PURE__ */ y("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ v("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ v(c, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ y("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ y("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ v("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ v("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ v("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				l && /* @__PURE__ */ v("div", {
					"data-testid": "message-row-footer",
					className: e("mt-1", s && "self-end"),
					children: l
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var T = /* @__PURE__ */ new Set([
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
]), E = /^(https?:|mailto:)/i;
function D(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || E.test(t) ? t : null;
}
function O(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => O(e, `${t}-${n}`));
	if (!T.has(n.tagName)) return /* @__PURE__ */ v("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ v("br", {}, t);
		case "A": {
			let e = D(n.getAttribute("href"));
			return e ? /* @__PURE__ */ v("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ v("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ v("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ v(e, { children: r }, t);
		}
	}
}
function k({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = m(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => O(e, `n${t}`));
	}, [t]);
	return /* @__PURE__ */ v("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? n
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function A({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let u = a.length > 0;
	return /* @__PURE__ */ y("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ y("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ v("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ v("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${ee(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ v("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ v(l, {
					users: a.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: !0
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			o && /* @__PURE__ */ v("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function ee(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/ReactionChips.tsx
function j(e, t) {
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
function M(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function te({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = m(() => j(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ v("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ y("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: M(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ v("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var ne = [
	"👍",
	"🎉",
	"❤️"
];
function N({ quickReactions: t = ne, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ v("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: "grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary",
		children: n
	}, r);
	return /* @__PURE__ */ y("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ v("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ v("span", {
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
function F(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function I({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ y("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ v("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ v("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: F(t.timestamp)
		})]
	}), /* @__PURE__ */ v("span", {
		className: "block truncate text-xs text-text-secondary",
		children: P(t.text)
	})] });
	return /* @__PURE__ */ y("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ v("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ v("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ v("button", {
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
function L(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function R(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function re({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = L(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ y("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ v("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: o ? /* @__PURE__ */ v("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : /* @__PURE__ */ v("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ y("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ v("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ v("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: R(t.size)
			})]
		})]
	}) : /* @__PURE__ */ v("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ y("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: [/* @__PURE__ */ v(z, {}), /* @__PURE__ */ y("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ v("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ v("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: R(t.size)
				})]
			})]
		})
	});
}
function ie({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : R(o);
	return /* @__PURE__ */ y("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ v("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ v(z, {}),
			/* @__PURE__ */ y("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ y("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ v("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ v("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ v("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ v("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ v("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ v("button", {
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
function z() {
	return /* @__PURE__ */ v("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ v("path", {
			d: "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function ae(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function oe(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function se(e) {
	if (!e) return null;
	if (e.kind === "document" && typeof e.documentId == "string" && e.documentId) return {
		documentId: e.documentId,
		title: typeof e.title == "string" ? e.title : "",
		icon: typeof e.icon == "string" ? e.icon : void 0
	};
	let t = e.share;
	return t && t.kind === "document" && typeof t.id == "string" && t.id ? {
		documentId: t.id,
		title: typeof t.title == "string" ? t.title : "",
		icon: typeof t.icon == "string" ? t.icon : void 0
	} : null;
}
function B({ messages: n, onSend: r, disabled: i = !1, onTyping: a, typingUsers: c = [], composer: l, currentUserId: m, reactionsFor: b, onToggleReaction: x, onReply: S, onTogglePin: C, pinnedMessageIds: T, onJumpToMessage: E, highlightedMessageId: D, documentEditors: O, onOpenDocument: ee, tone: j = "light", showHeader: M, fill: ne, onLoadMore: P, hasMore: F, loadingMore: L = !1, onSendFiles: R, transfers: z = [], currentActor: B, onCancelTransfer: le, attachmentSrc: V, onOpenAttachment: H, acceptFiles: U, maxFileSize: W, onFileError: G, emojis: ue = f }) {
	let K = j === "dark", de = o(), fe = M ?? !(de?.hasHeader ?? !1), q = ne ?? de?.fillsHeight ?? !1, [J, Y] = g(""), X = h(null), Z = h(null), pe = !!P && F !== !1, me = h(null), he = h(null), [ge, _e] = g(!1), ve = !!R && !i, [ye, Q] = g(0), [be, xe] = g(!1), $ = h(!0), Se = h(n.length), Ce = n.length + z.length, we = h(null);
	function Te() {
		let e = X.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, Q(0));
	}
	function Ee() {
		let e = X.current;
		if (!e) return;
		let t = ae(e);
		$.current = t, t && Q(0), xe(e.scrollTop > 8);
	}
	p(() => {
		let e = X.current, t = Se.current, n = Ce - t;
		if (Se.current = Ce, !e) return;
		let r = we.current;
		if (r && n > 0) {
			we.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, Q(0), xe(e.scrollTop > 8)) : n > 0 && Q((e) => e + n);
	}, [Ce]);
	function De() {
		let e = X.current;
		e && (we.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), P?.();
	}
	p(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function Oe() {
		let e = J.trim();
		!e || i || (Z.current && clearTimeout(Z.current), Z.current = null, a?.(!1), $.current = !0, r(e), Y(""));
	}
	function ke(e) {
		!ve || e.length === 0 || ($.current = !0, R?.(e));
	}
	function Ae(e) {
		if (!ve) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), ke(t));
	}
	function je(e) {
		Y((t) => t + e), _e(!1);
	}
	function Me(e) {
		i || (a?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => a?.(!1), 2e3)), e.key === "Enter" && !i && J.trim() && Oe();
	}
	let Ne = /* @__PURE__ */ y("div", {
		"data-testid": "chat-panel",
		className: e(q ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", K ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			fe && /* @__PURE__ */ y("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", K ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			c.length > 0 && /* @__PURE__ */ v("div", {
				className: e("text-xs italic mb-1 shrink-0", K ? "text-white/50" : "text-text-secondary"),
				children: oe(c)
			}),
			/* @__PURE__ */ y("div", {
				className: e("relative flex flex-col mb-2", q ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ y("div", {
					ref: X,
					onScroll: Ee,
					"data-testid": "chat-panel-messages",
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden", be && "fade-top", q ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: [
						pe && n.length > 0 && /* @__PURE__ */ v("div", {
							className: "flex justify-center pb-1",
							children: /* @__PURE__ */ v("button", {
								type: "button",
								"data-testid": "chat-panel-load-more",
								onClick: De,
								disabled: L,
								className: e("rounded px-2 py-1 text-xs disabled:opacity-60", K ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
								children: L ? "Loading…" : "Load earlier messages"
							})
						}),
						n.length === 0 ? /* @__PURE__ */ v("div", {
							className: e("text-sm", K ? "text-white/40" : "text-text-secondary"),
							children: "No messages yet"
						}) : n.map((t, n) => {
							let r = t.displayName ?? t.clientId.slice(0, 8), i = t.attachments ?? [], a = t.metadata?.html, o = typeof a == "string" ? a : void 0, s = /* @__PURE__ */ v(k, {
								html: o,
								text: t.content
							}), c = se(t.metadata), l = c ? /* @__PURE__ */ v(A, {
								documentId: c.documentId,
								title: c.title || t.content,
								icon: c.icon,
								createdBy: t.metadata?.displayName ?? t.displayName,
								editors: O?.(c.documentId) ?? [],
								onOpen: ee
							}) : i.length === 0 ? s : /* @__PURE__ */ y(_, { children: [(t.content || o) && s, i.map((e) => /* @__PURE__ */ v(re, {
								attachment: e,
								src: V?.(e),
								onOpen: H
							}, e.id))] }), u = t.id ?? "", d = u && b ? b(u) : [], f = t.metadata?.replyTo, p = !!u && !!T?.has(u), h = !!m && t.userId === m, g = /* @__PURE__ */ y(_, { children: [
								f && /* @__PURE__ */ v(I, {
									quote: f,
									onJump: E,
									className: "mb-1"
								}),
								p && /* @__PURE__ */ v("span", {
									className: "mb-0.5 block text-[11px] text-text-tertiary",
									"data-testid": "pinned-marker",
									children: "📌 Pinned"
								}),
								l,
								d.length > 0 && m && x && /* @__PURE__ */ v(te, {
									reactions: d,
									currentUserId: m,
									onToggle: (e) => x(u, e)
								})
							] });
							return /* @__PURE__ */ y("div", {
								"data-testid": "chat-message",
								"data-message-id": u || void 0,
								className: e("group relative rounded-md", u && u === D && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
								children: [/* @__PURE__ */ v(w, {
									author: r,
									content: g,
									timestamp: t.timestamp,
									avatarUrl: t.avatarUrl,
									tone: j,
									mine: h
								}), u && (x || S || C) && /* @__PURE__ */ v(N, {
									className: e("absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100", h ? "right-14" : "left-14"),
									onReact: x ? (e) => x(u, e) : void 0,
									onReply: S ? () => S(t) : void 0,
									onTogglePin: C ? () => C(t) : void 0,
									pinned: p
								})]
							}, t.id ?? n);
						}),
						z.map((e) => /* @__PURE__ */ v(w, {
							author: e.actor,
							timestamp: "",
							tone: j,
							content: /* @__PURE__ */ v(ie, {
								transfer: e,
								mine: !!B && e.actor === B,
								onCancel: le
							})
						}, e.transferId))
					]
				}), ye > 0 && /* @__PURE__ */ y("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Te,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", K ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						ye,
						" new message",
						ye === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			l ? /* @__PURE__ */ v("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				children: l
			}) : /* @__PURE__ */ y("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					R && /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !ve,
						onClick: () => me.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", K ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ v(ce, {})
					}), /* @__PURE__ */ v("input", {
						ref: me,
						type: "file",
						multiple: !0,
						accept: U,
						"aria-hidden": "true",
						tabIndex: -1,
						className: "hidden",
						onChange: (e) => {
							let t = Array.from(e.target.files ?? []), n = W ? t.filter((e) => e.size > W) : [];
							n.length > 0 && G?.(`Skipped ${n.length} file(s) over the size limit.`), ke(t.filter((e) => !n.includes(e))), e.target.value = "";
						}
					})] }),
					/* @__PURE__ */ v("button", {
						ref: he,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": ge,
						title: "Insert emoji",
						disabled: i,
						onClick: () => _e((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", K ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ v("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ v(u, {
						open: ge,
						onSelect: je,
						onClose: () => _e(!1),
						triggerRef: he,
						emojis: ue
					}),
					/* @__PURE__ */ v(s, {
						size: "sm",
						value: J,
						onChange: (e) => Y(e.target.value),
						onKeyDown: Me,
						onPaste: Ae,
						disabled: i,
						placeholder: i ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", K && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ v(t, {
						variant: "primary",
						size: "sm",
						onClick: Oe,
						disabled: i || !J.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return R ? /* @__PURE__ */ v(d, {
		onFiles: ke,
		accept: U,
		maxSize: W,
		onError: G,
		disabled: i,
		className: q ? "flex h-full min-h-0 flex-col" : void 0,
		children: Ne
	}) : Ne;
}
function ce() {
	return /* @__PURE__ */ v("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ v("path", {
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
function le({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ y("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ y("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ v("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ v("div", { children: e.map((e) => {
			let n = x(e.metadata.email ?? e.clientId), r = S(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ y("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ v("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ v("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ v("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ v("span", {
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
	let c = /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ y("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ v("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ v("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ y("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ v("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ v("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ v("span", {
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
	return /* @__PURE__ */ v("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ v("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function W({ pins: e, onJump: t, onUnpin: n, className: i, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ v(U, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ v(r, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ v(V, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ v(c, {
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
			actions: n && /* @__PURE__ */ v("button", {
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
	return /* @__PURE__ */ v(U, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ v(r, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = L(e.attachment);
			return /* @__PURE__ */ v(V, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ v("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ v("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					R(e.attachment.size),
					H(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function ue({ mentions: e, onJump: t, className: n, "data-testid": i = "mentions-panel" }) {
	return /* @__PURE__ */ v(U, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ v(r, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ v(V, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ y("span", {
				className: "relative",
				children: [/* @__PURE__ */ v(c, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ v("span", {
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
function de(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function fe({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ v(U, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ v(r, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ v(V, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ v("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ v("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [H(e.startedAt), K(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : de(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function q({ documents: t, onOpen: n, onCreate: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = i && /* @__PURE__ */ y("button", {
		type: "button",
		onClick: i,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ v("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ y("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ v(r, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ v("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ v(V, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ v("span", {
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
function X({ name: t, description: r, online: o, avatarUrl: s, features: c = J, children: l, files: u = [], thumbnailSrc: d, documents: f = [], onOpenDocument: p, onCreateDocument: m, pins: h = [], onUnpin: b, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callInProgress: D = !1, headerActions: O, view: k, onViewChange: A, className: ee, "data-testid": j = "conversation-surface" }) {
	let M = new Set(c), [te, ne] = g("chat"), N = k ?? te, P = M.has(N) ? N : c[0] ?? "chat", F = (e) => {
		k === void 0 && ne(e), A?.(e);
	}, I = (e) => e || void 0, L = c.filter((e) => Y[e]).map((e) => ({
		id: e,
		label: Y[e],
		badge: e === "files" ? I(u.length) : e === "documents" ? I(f.length) : e === "pins" ? I(h.length) : e === "calls" ? I(C.length) : e === "mentions" ? I(x.filter((e) => e.unread).length) : void 0
	})), R = (e) => {
		F("chat"), T?.(e);
	};
	return /* @__PURE__ */ y("section", {
		className: e("flex min-w-0 flex-col", ee),
		"data-testid": j,
		children: [
			/* @__PURE__ */ v(a, {
				name: t,
				description: r,
				online: o,
				avatarUrl: s,
				"data-testid": `${j}-header`,
				tabs: L.length > 1 ? /* @__PURE__ */ v(i, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: P,
					onValueChange: (e) => F(e),
					items: L
				}) : void 0,
				actions: E || O ? /* @__PURE__ */ y(_, { children: [E && /* @__PURE__ */ y(_, { children: [/* @__PURE__ */ v(n, {
					"aria-label": D ? "Join the call" : "Start an audio call",
					title: D ? "Join the call" : "Audio call",
					"data-testid": `${j}-audio-call`,
					onClick: () => E(!0),
					children: "📞"
				}), /* @__PURE__ */ v(n, {
					"aria-label": D ? "Join the call with video" : "Start a video call",
					title: D ? "Join the call" : "Video call",
					"data-testid": `${j}-video-call`,
					variant: D ? "primary" : "ghost",
					onClick: () => E(!1),
					children: "🎥"
				})] }), O] }) : void 0
			}),
			M.has("files") && P === "files" && /* @__PURE__ */ v(G, {
				className: "min-h-0 flex-1",
				files: u,
				thumbnailSrc: d,
				onJump: T ? R : void 0
			}),
			M.has("documents") && P === "documents" && /* @__PURE__ */ v(q, {
				className: "min-h-0 flex-1",
				documents: f,
				onOpen: p,
				onCreate: m
			}),
			M.has("pins") && P === "pins" && /* @__PURE__ */ v(W, {
				className: "min-h-0 flex-1",
				pins: h,
				onUnpin: b,
				onJump: T ? R : void 0
			}),
			M.has("mentions") && P === "mentions" && /* @__PURE__ */ v(ue, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					F("chat"), S(e, t);
				} : void 0
			}),
			M.has("calls") && P === "calls" && /* @__PURE__ */ v(fe, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			M.has("chat") && /* @__PURE__ */ v("div", {
				className: "min-h-0 flex-1",
				"data-testid": `${j}-chat`,
				hidden: P !== "chat",
				children: l
			})
		]
	});
}
//#endregion
export { w as C, S as E, k as S, x as T, N as _, ue as a, j as b, K as c, re as d, ie as f, P as g, I as h, G as i, le as l, L as m, X as n, fe as o, R as p, q as r, W as s, J as t, B as u, te as v, C as w, A as x, M as y };
