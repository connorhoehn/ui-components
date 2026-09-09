import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-cRZd1Oud.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { n as i, o as a, s as o, t as s } from "./ChannelHeader-DEd48bLe.js";
import { n as c } from "./DockedPanelContext-pH9A5z1h.js";
import { t as l } from "./Input-DLknWXri.js";
import { t as u } from "./Avatar-BzicCOft.js";
import { t as d } from "./PresenceAvatars-BkzMACtv.js";
import { i as f, n as p, r as m, t as ee } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as h } from "./formatBytes-05ivRSJY.js";
import { Fragment as te, useEffect as g, useMemo as _, useRef as v, useState as y } from "react";
import { Fragment as b, jsx as x, jsxs as S } from "react/jsx-runtime";
//#region src/utils/identity.ts
var C = [
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
function w(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return C[Math.abs(t) % C.length];
}
function T(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function E(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function D(e, t) {
	let n = E(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = E(t);
	return r ? n !== r : !1;
}
function ne(e, t = /* @__PURE__ */ new Date()) {
	let n = new Date(e);
	if (Number.isNaN(n.getTime())) return "";
	let r = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime(), i = Math.round((r(t) - r(n)) / 864e5);
	if (i === 0) return "Today";
	if (i === 1) return "Yesterday";
	if (i > 1 && i < 7) return n.toLocaleDateString(void 0, { weekday: "long" });
	let a = n.getFullYear() === t.getFullYear();
	return n.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		...a ? {} : { year: "numeric" }
	});
}
function O(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function re(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
//#endregion
//#region src/components/social/MessageRow.tsx
function k(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function A({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", className: d }) {
	let f = l === "dark", p = k(r), m = !o || !!p;
	return /* @__PURE__ */ S("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ x("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ x(u, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ S("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ S("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ x("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ x("time", {
						"data-testid": "message-row-time",
						dateTime: r,
						title: re(r),
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ x("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ x("div", {
					"data-testid": "message-row-footer",
					className: e("mt-1", s && "self-end"),
					children: c
				})
			]
		})]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var ie = /* @__PURE__ */ new Set([
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
]), ae = /^(https?:|mailto:)/i;
function j(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ae.test(t) ? t : null;
}
function M(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => M(e, `${t}-${n}`));
	if (!ie.has(n.tagName)) return /* @__PURE__ */ x("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ x("br", {}, t);
		case "A": {
			let e = j(n.getAttribute("href"));
			return e ? /* @__PURE__ */ x("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ x("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ x("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ x(e, { children: r }, t);
		}
	}
}
var N = /```([\s\S]*?)```|`([^`\n]+)`/g;
function P(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (N.lastIndex = 0; (r = N.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ x("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ x("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ x("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function oe({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = _(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => M(e, `n${t}`));
	}, [t]), o = _(() => P(n ?? ""), [n]);
	return /* @__PURE__ */ x("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function F({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ S("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ S("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ x("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ x("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${I(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ x("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ x(d, {
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
			o && /* @__PURE__ */ x("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function I(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function L(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function R(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function se({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, onJoin: s, className: c, "data-testid": l = "call-activity-card" }) {
	let u = !i && typeof a == "number" ? L(a) : "", f = o === void 0 ? "Call" : o ? "Audio call" : "Video call", p = i ? R(r, !0) : [n ? `${n} started a call` : "Call ended", u].filter(Boolean).join(" · ");
	return /* @__PURE__ */ S("div", {
		"data-testid": l,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", c),
		children: [
			/* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ S("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ x("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: i ? `${f} in progress` : f
				}), /* @__PURE__ */ x("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: p
				})]
			}),
			r.length > 0 && /* @__PURE__ */ x("span", {
				className: "shrink-0",
				"data-testid": `${l}-participants`,
				children: /* @__PURE__ */ x(d, {
					users: r.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: i
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			i && s && /* @__PURE__ */ x("button", {
				type: "button",
				"data-testid": `${l}-join`,
				onClick: () => s(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/ReactionChips.tsx
function z(e, t) {
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
function ce(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function le({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = _(() => z(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ x("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ S("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: ce(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ x("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var ue = [
	"👍",
	"🎉",
	"❤️"
], de = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function fe({ quickReactions: t = ue, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ x("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${de}`,
		children: n
	}, r);
	return /* @__PURE__ */ S("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function pe(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function me(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function he({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ S("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ x("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ x("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: me(t.timestamp)
		})]
	}), /* @__PURE__ */ x("span", {
		className: "block truncate text-xs text-text-secondary",
		children: pe(t.text)
	})] });
	return /* @__PURE__ */ S("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ x("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ x("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ x("button", {
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
function B(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function ge({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = B(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ S("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ x("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ x("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ x("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ x("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ S("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ x("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ x("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: h(t.size)
			})]
		})]
	}) : /* @__PURE__ */ x("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ S("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ x(V, {}), /* @__PURE__ */ S("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ x("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ x("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: h(t.size)
				})]
			})]
		})
	});
}
function _e(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function ve({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : h(o);
	return /* @__PURE__ */ S("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ x("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ x(V, {}),
			/* @__PURE__ */ S("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ S("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ x("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ x("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ x("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ x("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ x("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ x("button", {
				type: "button",
				onClick: () => r(t.transferId),
				"aria-label": `Cancel upload of ${t.name}`,
				"data-testid": "transfer-bubble-cancel",
				className: e("shrink-0 rounded px-1.5 py-0.5 text-xs", "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
				children: "✕"
			})
		]
	});
}
function V() {
	return /* @__PURE__ */ x("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ x("path", {
			d: "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
//#region src/components/social/DaySeparator.tsx
function ye({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ne(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ S("div", {
		role: "separator",
		"aria-label": O(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ x("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function be(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function xe(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Se(e) {
	if (!e) return null;
	if (e.kind === "document" && typeof e.documentId == "string" && e.documentId) return {
		documentId: e.documentId,
		title: typeof e.title == "string" ? e.title : "",
		icon: typeof e.icon == "string" ? e.icon : void 0,
		createdBy: typeof e.createdBy == "string" ? e.createdBy : void 0
	};
	let t = e.share;
	return t && t.kind === "document" && typeof t.id == "string" && t.id ? {
		documentId: t.id,
		title: typeof t.title == "string" ? t.title : "",
		icon: typeof t.icon == "string" ? t.icon : void 0,
		createdBy: typeof t.createdBy == "string" ? t.createdBy : void 0
	} : null;
}
var Ce = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function we(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Ce[e] ?? e)
	};
}
function Te(e) {
	if (!e || e.kind !== "call") return null;
	let t = typeof e.callId == "string" ? e.callId : "";
	if (!t) return null;
	let n = (Array.isArray(e.participants) ? e.participants : []).map((e) => {
		let t = e, n = typeof t?.userId == "string" ? t.userId : "";
		return n ? {
			userId: n,
			displayName: typeof t.displayName == "string" ? t.displayName : void 0
		} : null;
	}).filter(Boolean);
	return {
		callId: t,
		live: e.live === !0,
		durationMs: typeof e.durationMs == "number" ? e.durationMs : void 0,
		audioOnly: typeof e.audioOnly == "boolean" ? e.audioOnly : void 0,
		participants: n
	};
}
function H({ messages: n, onSend: r, disabled: a = !1, onTyping: s, typingUsers: u = [], composer: d, currentUserId: h, reactionsFor: _, onToggleReaction: C, onReply: w, onTogglePin: T, pinnedMessageIds: E, onJumpToMessage: ne, highlightedMessageId: O, documentEditors: re, callParticipants: k, onJoinCall: ie, onOpenDocument: ae, tone: j = "light", showHeader: M, fill: N, onLoadMore: P, hasMore: I, loadingMore: L = !1, onSendFiles: R, transfers: z = [], currentActor: ce, onCancelTransfer: ue, attachmentSrc: de, onOpenAttachment: pe, acceptFiles: me, maxFileSize: B, onFileError: V, emojis: Ce = ee }) {
	let H = j === "dark", De = c(), Oe = M ?? !(De?.hasHeader ?? !1), U = N ?? De?.fillsHeight ?? !1, [W, G] = y(""), K = v(null), q = v(null), ke = !!P && I !== !1, Ae = v(null), je = v(null), [J, Y] = y(!1), X = !!R && !a, [Z, Q] = y(0), [Me, Ne] = y(!1), $ = v(!0), Pe = v(n.length), Fe = n.length + z.length, Ie = v(null), [Le, Re] = y(""), ze = v(null), Be = v(!1), Ve = v(0);
	g(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!Be.current) {
			Be.current = !0, ze.current = t;
			return;
		}
		if (t === ze.current || (ze.current = t, h && e.userId === h)) return;
		Ve.current += 1;
		let r = Ve.current % 2 == 0 ? "​" : "";
		Re(xe(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, h]);
	function He() {
		let e = K.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, Q(0));
	}
	function Ue() {
		let e = K.current;
		if (!e) return;
		let t = be(e);
		$.current = t, t && Q(0), Ne(e.scrollTop > 8);
	}
	g(() => {
		let e = K.current, t = Pe.current, n = Fe - t;
		if (Pe.current = Fe, !e) return;
		let r = Ie.current;
		if (r && n > 0) {
			Ie.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, Q(0), Ne(e.scrollTop > 8)) : n > 0 && Q((e) => e + n);
	}, [Fe]);
	function We() {
		let e = K.current;
		e && (Ie.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), P?.();
	}
	g(() => () => {
		q.current && clearTimeout(q.current);
	}, []);
	function Ge() {
		let e = W.trim();
		!e || a || (q.current && clearTimeout(q.current), q.current = null, s?.(!1), $.current = !0, r(e), G(""));
	}
	function Ke(e) {
		!X || e.length === 0 || ($.current = !0, R?.(e));
	}
	function qe(e) {
		if (!X) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Ke(t));
	}
	function Je(e) {
		G((t) => t + e), Y(!1);
	}
	function Ye() {
		a || (s?.(!0), q.current && clearTimeout(q.current), q.current = setTimeout(() => s?.(!1), 2e3));
	}
	function Xe(e) {
		Ye(), e.key === "Enter" && !a && W.trim() && Ge();
	}
	let Ze = /* @__PURE__ */ S("div", {
		"data-testid": "chat-panel",
		className: e(U ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", H ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Oe && /* @__PURE__ */ S("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", H ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			u.length > 0 && /* @__PURE__ */ x(i, {
				names: u,
				className: e("mb-1 shrink-0 italic", H ? "text-white/50" : "text-text-secondary")
			}),
			/* @__PURE__ */ x("span", {
				style: o,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Le
			}),
			/* @__PURE__ */ S("div", {
				className: e("relative flex flex-col mb-2", U ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ x("div", {
					ref: K,
					onScroll: Ue,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Me && "fade-top", U ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ S("div", {
						className: "mt-auto",
						children: [
							ke && n.length > 0 && /* @__PURE__ */ x("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ x("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: We,
									disabled: L,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", H ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: L ? "Loading…" : "Load earlier messages"
								})
							}),
							n.length === 0 ? /* @__PURE__ */ x("div", {
								className: e("text-sm", H ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : n.map((t, r) => {
								let i = t.displayName ?? t.clientId.slice(0, 8), a = t.attachments ?? [], o = t.metadata?.html, s = typeof o == "string" ? o : void 0, c = /* @__PURE__ */ x(oe, {
									html: s,
									text: t.content
								}), l = Se(t.metadata), u = Te(t.metadata), d = we(t.metadata), f = u ? /* @__PURE__ */ x(se, {
									callId: u.callId,
									startedBy: (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									participants: k?.(u.callId) ?? u.participants,
									live: u.live,
									durationMs: u.durationMs,
									audioOnly: u.audioOnly,
									onJoin: ie
								}) : l ? /* @__PURE__ */ x(F, {
									documentId: l.documentId,
									title: l.title || t.content,
									icon: l.icon,
									createdBy: l.createdBy ?? (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									editors: re?.(l.documentId) ?? [],
									onOpen: ae
								}) : a.length === 0 ? c : /* @__PURE__ */ S(b, { children: [(t.content || s) && c, a.map((e) => /* @__PURE__ */ x(ge, {
									attachment: e,
									src: de?.(e),
									onOpen: pe
								}, e.id))] }), p = t.id ?? "", m = p && _ ? _(p) : [], ee = t.metadata?.replyTo, g = !!p && !!E?.has(p), v = !!h && t.userId === h, y = t.metadata?.system === !0, M = /* @__PURE__ */ S(b, { children: [
									ee && /* @__PURE__ */ x(he, {
										quote: ee,
										onJump: ne,
										className: "mb-1"
									}),
									g && /* @__PURE__ */ x("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									f,
									d && /* @__PURE__ */ S("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											d.labels.length > 0 ? `Too large to send: ${d.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									m.length > 0 && h && C && /* @__PURE__ */ x(le, {
										reactions: m,
										currentUserId: h,
										onToggle: (e) => C(p, e)
									})
								] }), N = D(t.timestamp, n[r - 1]?.timestamp) ? /* @__PURE__ */ x(ye, {
									timestamp: t.timestamp,
									tone: j
								}, `day:${t.timestamp}:${r}`) : null;
								return /* @__PURE__ */ S(te, { children: [N, /* @__PURE__ */ S("div", {
									"data-testid": "chat-message",
									"data-message-id": p || void 0,
									className: e("group relative rounded-md", p && p === O && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ x(A, {
										author: i,
										content: M,
										timestamp: t.timestamp,
										avatarUrl: t.avatarUrl,
										tone: j,
										mine: v
									}), p && (C || !y && (w || T)) && /* @__PURE__ */ x(fe, {
										className: e("absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100", v ? "right-14" : "left-14"),
										onReact: C ? (e) => C(p, e) : void 0,
										onReply: w && !y ? () => w(t) : void 0,
										onTogglePin: T && !y ? () => T(t) : void 0,
										pinned: g
									})]
								})] }, t.id ?? r);
							}),
							z.map((e) => /* @__PURE__ */ x(A, {
								author: e.actor,
								timestamp: "",
								tone: j,
								content: /* @__PURE__ */ x(ve, {
									transfer: e,
									mine: _e(e, h, ce),
									onCancel: ue
								})
							}, e.transferId))
						]
					})
				}), Z > 0 && /* @__PURE__ */ S("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: He,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", H ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Z,
						" new message",
						Z === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			d ? /* @__PURE__ */ x("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: s ? Ye : void 0,
				children: d
			}) : /* @__PURE__ */ S("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					R && /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !X,
						onClick: () => Ae.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", H ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ x(Ee, {})
					}), /* @__PURE__ */ x(f, {
						ref: Ae,
						multiple: !0,
						accept: me,
						onFiles: (e) => {
							let t = B ? e.filter((e) => e.size > B) : [];
							t.length > 0 && V?.(`Skipped ${t.length} file(s) over the size limit.`), Ke(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ x("button", {
						ref: je,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": J,
						title: "Insert emoji",
						disabled: a,
						onClick: () => Y((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", H ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ x("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ x(p, {
						open: J,
						onSelect: Je,
						onClose: () => Y(!1),
						triggerRef: je,
						emojis: Ce
					}),
					/* @__PURE__ */ x(l, {
						size: "sm",
						value: W,
						onChange: (e) => G(e.target.value),
						onKeyDown: Xe,
						onPaste: qe,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", H && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ x(t, {
						variant: "primary",
						size: "sm",
						onClick: Ge,
						disabled: a || !W.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return R ? /* @__PURE__ */ x(m, {
		onFiles: Ke,
		accept: me,
		maxSize: B,
		onError: V,
		disabled: a,
		className: U ? "flex h-full min-h-0 flex-col" : void 0,
		children: Ze
	}) : Ze;
}
function Ee() {
	return /* @__PURE__ */ x("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ x("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
//#region src/components/social/presenceIdentity.ts
function De(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Oe({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ S("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ S("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ x("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ x("div", { children: e.map((e) => {
			let n = w(De(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = T(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ S("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ x("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ x("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ x("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ x("span", {
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
function U({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ S("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ x("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ x("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ S("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ x("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ x("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ x("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function W(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function G({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ x("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ x("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function K({ pins: e, onJump: t, onUnpin: n, className: i, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ x(G, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ x(r, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ x(U, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ x(u, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				W(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ x("button", {
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
function q({ files: e, thumbnailSrc: t, onJump: n, className: i, "data-testid": a = "channel-files-panel" }) {
	return /* @__PURE__ */ x(G, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ x(r, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = B(e.attachment);
			return /* @__PURE__ */ x(U, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ x("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ x("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					h(e.attachment.size),
					W(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function ke({ mentions: e, onJump: t, className: n, "data-testid": i = "mentions-panel" }) {
	return /* @__PURE__ */ x(G, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ x(r, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ x(U, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ S("span", {
				className: "relative",
				children: [/* @__PURE__ */ x(u, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ x("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				W(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Ae(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function je(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function J({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ x(G, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ x(r, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ x(U, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ x("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ x("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [W(e.startedAt), Ae(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : je(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Y({ documents: t, onOpen: n, onCreate: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = i && /* @__PURE__ */ S("button", {
		type: "button",
		onClick: i,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ x("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ S("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ x(r, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ x("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ x(U, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ x("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					W(e.updatedAt),
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
var X = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], Z = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function Q({ name: t, description: r, online: i, avatarUrl: o, features: c = X, children: l, canvas: u, files: d = [], thumbnailSrc: f, documents: p = [], onOpenDocument: m, onCreateDocument: ee, pins: h = [], onUnpin: te, mentions: g = [], onOpenMention: _, recordings: v = [], onOpenRecording: C, onJumpToMessage: w, onStartCall: T, callModeFixed: E = !1, onWatch: D, watchLabel: ne, watchHint: O, watchViewerCount: re, callInProgress: k = !1, headerActions: A, view: ie, onViewChange: ae, className: j, "data-testid": M = "conversation-surface" }) {
	let N = new Set(c), [P, oe] = y("chat"), F = ie ?? P, I = N.has(F) ? F : c[0] ?? "chat", L = (e) => {
		ie === void 0 && oe(e), ae?.(e);
	}, R = (e) => e || void 0, se = c.filter((e) => Z[e]).map((e) => ({
		id: e,
		label: Z[e],
		badge: e === "files" ? R(d.length) : e === "documents" ? R(p.length) : e === "pins" ? R(h.length) : e === "calls" ? R(v.length) : e === "mentions" ? R(g.filter((e) => e.unread).length) : void 0
	})), z = (e) => {
		L("chat"), w?.(e);
	};
	return /* @__PURE__ */ S("section", {
		className: e("flex min-w-0 flex-col", j),
		"data-testid": M,
		children: [
			/* @__PURE__ */ x(s, {
				name: t,
				description: r,
				online: i,
				avatarUrl: o,
				"data-testid": `${M}-header`,
				tabs: se.length > 1 ? /* @__PURE__ */ x(a, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: I,
					onValueChange: (e) => L(e),
					items: se
				}) : void 0,
				actions: T || D || A ? /* @__PURE__ */ S(b, { children: [
					T && (E ? /* @__PURE__ */ x(n, {
						"aria-label": k ? "Join the call" : "Start a call",
						title: k ? "Join the call" : "Start a call",
						"data-testid": `${M}-call`,
						variant: k ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "📞"
					}) : /* @__PURE__ */ S(b, { children: [/* @__PURE__ */ x(n, {
						"aria-label": k ? "Join the call with audio" : "Start an audio call",
						title: k ? "Join with audio" : "Audio call",
						"data-testid": `${M}-audio-call`,
						onClick: () => T(!0),
						children: "📞"
					}), /* @__PURE__ */ x(n, {
						"aria-label": k ? "Join the call with video" : "Start a video call",
						title: k ? "Join with video" : "Video call",
						"data-testid": `${M}-video-call`,
						variant: k ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "🎥"
					})] })),
					D && /* @__PURE__ */ x(Me, {
						testId: `${M}-watch`,
						label: ne,
						hint: O,
						viewerCount: re,
						onClick: D
					}),
					A
				] }) : void 0
			}),
			N.has("files") && I === "files" && /* @__PURE__ */ x(q, {
				className: "min-h-0 flex-1",
				files: d,
				thumbnailSrc: f,
				onJump: w ? z : void 0
			}),
			N.has("documents") && I === "documents" && /* @__PURE__ */ x(Y, {
				className: "min-h-0 flex-1",
				documents: p,
				onOpen: m,
				onCreate: ee
			}),
			N.has("pins") && I === "pins" && /* @__PURE__ */ x(K, {
				className: "min-h-0 flex-1",
				pins: h,
				onUnpin: te,
				onJump: w ? z : void 0
			}),
			N.has("mentions") && I === "mentions" && /* @__PURE__ */ x(ke, {
				className: "min-h-0 flex-1",
				mentions: g,
				onJump: _ ? (e, t) => {
					L("chat"), _(e, t);
				} : void 0
			}),
			N.has("calls") && I === "calls" && /* @__PURE__ */ x(J, {
				className: "min-h-0 flex-1",
				recordings: v,
				onOpen: C
			}),
			N.has("chat") && /* @__PURE__ */ S("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${M}-chat`,
				hidden: I !== "chat",
				children: [u && /* @__PURE__ */ x("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${M}-canvas`,
					children: u
				}), /* @__PURE__ */ x("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function Me({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ S(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Ne,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ x("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ x("span", { children: o }),
			s && /* @__PURE__ */ x("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Ne = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { k as A, z as C, F as D, L as E, D as F, w as I, T as L, ne as M, O as N, oe as O, re as P, ce as S, R as T, B as _, ke as a, fe as b, Ae as c, Te as d, Se as f, ve as g, ge as h, q as i, E as j, A as k, Oe as l, ye as m, Q as n, J as o, we as p, Y as r, K as s, X as t, H as u, he as v, se as w, le as x, pe as y };
