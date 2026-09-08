import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-wU9TwJvB.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./EmptyState-ClmWoqCb.js";
import { r as i, t as a } from "./ChannelHeader-DMJDs8u5.js";
import { n as o } from "./DockedPanelContext-pH9A5z1h.js";
import { t as s } from "./Input-DLknWXri.js";
import { t as c } from "./Avatar-BzicCOft.js";
import { t as l } from "./PresenceAvatars-BkzMACtv.js";
import { i as u, n as d, r as f, t as p } from "./ReactionPickerPopover-8eSV-aRw.js";
import { useEffect as m, useMemo as h, useRef as g, useState as _ } from "react";
import { Fragment as v, jsx as y, jsxs as b } from "react/jsx-runtime";
//#region src/utils/identity.ts
var x = [
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
function S(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return x[Math.abs(t) % x.length];
}
function C(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/MessageRow.tsx
function w(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function T({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: l, tone: u = "light", className: d }) {
	let f = u === "dark", p = w(r), m = !o || !!p;
	return /* @__PURE__ */ b("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ y("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ y(c, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ b("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ b("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ y("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ y("span", {
						"data-testid": "message-row-time",
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ y("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				l && /* @__PURE__ */ y("div", {
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
var E = /* @__PURE__ */ new Set([
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
]), ee = /^(https?:|mailto:)/i;
function D(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ee.test(t) ? t : null;
}
function O(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => O(e, `${t}-${n}`));
	if (!E.has(n.tagName)) return /* @__PURE__ */ y("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ y("br", {}, t);
		case "A": {
			let e = D(n.getAttribute("href"));
			return e ? /* @__PURE__ */ y("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ y("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ y("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ y(e, { children: r }, t);
		}
	}
}
var k = /```([\s\S]*?)```|`([^`\n]+)`/g;
function te(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (k.lastIndex = 0; (r = k.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ y("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ y("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ y("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function A({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = h(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => O(e, `n${t}`));
	}, [t]), o = h(() => te(n ?? ""), [n]);
	return /* @__PURE__ */ y("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function j({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let u = a.length > 0;
	return /* @__PURE__ */ b("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ b("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ y("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ y("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${M(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ y("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ y(l, {
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
			o && /* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function M(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function N(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function P(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function F({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, onJoin: s, className: c, "data-testid": u = "call-activity-card" }) {
	let d = !i && typeof a == "number" ? N(a) : "", f = o === void 0 ? "Call" : o ? "Audio call" : "Video call", p = i ? P(r, !0) : [n ? `${n} started a call` : "Call ended", d].filter(Boolean).join(" · ");
	return /* @__PURE__ */ b("div", {
		"data-testid": u,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", c),
		children: [
			/* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ b("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ y("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: i ? `${f} in progress` : f
				}), /* @__PURE__ */ y("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: p
				})]
			}),
			r.length > 0 && /* @__PURE__ */ y("span", {
				className: "shrink-0",
				"data-testid": `${u}-participants`,
				children: /* @__PURE__ */ y(l, {
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
			i && s && /* @__PURE__ */ y("button", {
				type: "button",
				"data-testid": `${u}-join`,
				onClick: () => s(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/ReactionChips.tsx
function I(e, t) {
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
function L(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ne({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = h(() => I(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ y("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ b("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: L(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ y("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var R = [
	"👍",
	"🎉",
	"❤️"
];
function z({ quickReactions: t = R, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ y("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: "grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary",
		children: n
	}, r);
	return /* @__PURE__ */ b("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function B(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function V(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function H({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ b("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ y("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ y("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: V(t.timestamp)
		})]
	}), /* @__PURE__ */ y("span", {
		className: "block truncate text-xs text-text-secondary",
		children: B(t.text)
	})] });
	return /* @__PURE__ */ b("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ y("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ y("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ y("button", {
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
function U(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function W(e) {
	return !Number.isFinite(e) || e < 0 ? "" : e < 1024 ? `${e} B` : e < 1048576 ? `${(e / 1024).toFixed(1)} KB` : `${(e / 1048576).toFixed(1)} MB`;
}
function re({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = U(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ b("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ y("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: o ? /* @__PURE__ */ y("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ y("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ y("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ b("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ y("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ y("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: W(t.size)
			})]
		})]
	}) : /* @__PURE__ */ y("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ b("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
			children: [/* @__PURE__ */ y(oe, {}), /* @__PURE__ */ b("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ y("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ y("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: W(t.size)
				})]
			})]
		})
	});
}
function ie(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function ae({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : W(o);
	return /* @__PURE__ */ b("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ y("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ y(oe, {}),
			/* @__PURE__ */ b("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ b("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ y("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ y("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ y("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ y("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ y("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ y("button", {
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
function oe() {
	return /* @__PURE__ */ y("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ y("path", {
			d: "M14 3v5h5M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function se(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function ce(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing...`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing...`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing...`;
}
function le(e) {
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
var ue = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function de(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => ue[e] ?? e)
	};
}
function fe(e) {
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
function pe({ messages: n, onSend: r, disabled: i = !1, onTyping: a, typingUsers: c = [], composer: l, currentUserId: h, reactionsFor: x, onToggleReaction: S, onReply: C, onTogglePin: w, pinnedMessageIds: E, onJumpToMessage: ee, highlightedMessageId: D, documentEditors: O, callParticipants: k, onJoinCall: te, onOpenDocument: M, tone: N = "light", showHeader: P, fill: I, onLoadMore: L, hasMore: R, loadingMore: B = !1, onSendFiles: V, transfers: U = [], currentActor: W, onCancelTransfer: oe, attachmentSrc: ue, onOpenAttachment: pe, acceptFiles: he, maxFileSize: G, onFileError: K, emojis: q = p }) {
	let J = N === "dark", ge = o(), _e = P ?? !(ge?.hasHeader ?? !1), Y = I ?? ge?.fillsHeight ?? !1, [X, ve] = _(""), Z = g(null), Q = g(null), ye = !!L && R !== !1, be = g(null), xe = g(null), [Se, Ce] = _(!1), we = !!V && !i, [Te, Ee] = _(0), [De, Oe] = _(!1), $ = g(!0), ke = g(n.length), Ae = n.length + U.length, je = g(null);
	function Me() {
		let e = Z.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, Ee(0));
	}
	function Ne() {
		let e = Z.current;
		if (!e) return;
		let t = se(e);
		$.current = t, t && Ee(0), Oe(e.scrollTop > 8);
	}
	m(() => {
		let e = Z.current, t = ke.current, n = Ae - t;
		if (ke.current = Ae, !e) return;
		let r = je.current;
		if (r && n > 0) {
			je.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, Ee(0), Oe(e.scrollTop > 8)) : n > 0 && Ee((e) => e + n);
	}, [Ae]);
	function Pe() {
		let e = Z.current;
		e && (je.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), L?.();
	}
	m(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function Fe() {
		let e = X.trim();
		!e || i || (Q.current && clearTimeout(Q.current), Q.current = null, a?.(!1), $.current = !0, r(e), ve(""));
	}
	function Ie(e) {
		!we || e.length === 0 || ($.current = !0, V?.(e));
	}
	function Le(e) {
		if (!we) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Ie(t));
	}
	function Re(e) {
		ve((t) => t + e), Ce(!1);
	}
	function ze(e) {
		i || (a?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => a?.(!1), 2e3)), e.key === "Enter" && !i && X.trim() && Fe();
	}
	let Be = /* @__PURE__ */ b("div", {
		"data-testid": "chat-panel",
		className: e(Y ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", J ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			_e && /* @__PURE__ */ b("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", J ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			c.length > 0 && /* @__PURE__ */ y("div", {
				className: e("text-xs italic mb-1 shrink-0", J ? "text-white/50" : "text-text-secondary"),
				children: ce(c)
			}),
			/* @__PURE__ */ b("div", {
				className: e("relative flex flex-col mb-2", Y ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ y("div", {
					ref: Z,
					onScroll: Ne,
					"data-testid": "chat-panel-messages",
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", De && "fade-top", Y ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ b("div", {
						className: "mt-auto",
						children: [
							ye && n.length > 0 && /* @__PURE__ */ y("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ y("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Pe,
									disabled: B,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", J ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: B ? "Loading…" : "Load earlier messages"
								})
							}),
							n.length === 0 ? /* @__PURE__ */ y("div", {
								className: e("text-sm", J ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : n.map((t, n) => {
								let r = t.displayName ?? t.clientId.slice(0, 8), i = t.attachments ?? [], a = t.metadata?.html, o = typeof a == "string" ? a : void 0, s = /* @__PURE__ */ y(A, {
									html: o,
									text: t.content
								}), c = le(t.metadata), l = fe(t.metadata), u = de(t.metadata), d = l ? /* @__PURE__ */ y(F, {
									callId: l.callId,
									startedBy: (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									participants: k?.(l.callId) ?? l.participants,
									live: l.live,
									durationMs: l.durationMs,
									audioOnly: l.audioOnly,
									onJoin: te
								}) : c ? /* @__PURE__ */ y(j, {
									documentId: c.documentId,
									title: c.title || t.content,
									icon: c.icon,
									createdBy: c.createdBy ?? (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									editors: O?.(c.documentId) ?? [],
									onOpen: M
								}) : i.length === 0 ? s : /* @__PURE__ */ b(v, { children: [(t.content || o) && s, i.map((e) => /* @__PURE__ */ y(re, {
									attachment: e,
									src: ue?.(e),
									onOpen: pe
								}, e.id))] }), f = t.id ?? "", p = f && x ? x(f) : [], m = t.metadata?.replyTo, g = !!f && !!E?.has(f), _ = !!h && t.userId === h, P = t.metadata?.system === !0, I = /* @__PURE__ */ b(v, { children: [
									m && /* @__PURE__ */ y(H, {
										quote: m,
										onJump: ee,
										className: "mb-1"
									}),
									g && /* @__PURE__ */ y("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									d,
									u && /* @__PURE__ */ b("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											u.labels.length > 0 ? `Too large to send: ${u.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									p.length > 0 && h && S && /* @__PURE__ */ y(ne, {
										reactions: p,
										currentUserId: h,
										onToggle: (e) => S(f, e)
									})
								] });
								return /* @__PURE__ */ b("div", {
									"data-testid": "chat-message",
									"data-message-id": f || void 0,
									className: e("group relative rounded-md", f && f === D && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ y(T, {
										author: r,
										content: I,
										timestamp: t.timestamp,
										avatarUrl: t.avatarUrl,
										tone: N,
										mine: _
									}), f && (S || !P && (C || w)) && /* @__PURE__ */ y(z, {
										className: e("absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100", _ ? "right-14" : "left-14"),
										onReact: S ? (e) => S(f, e) : void 0,
										onReply: C && !P ? () => C(t) : void 0,
										onTogglePin: w && !P ? () => w(t) : void 0,
										pinned: g
									})]
								}, t.id ?? n);
							}),
							U.map((e) => /* @__PURE__ */ y(T, {
								author: e.actor,
								timestamp: "",
								tone: N,
								content: /* @__PURE__ */ y(ae, {
									transfer: e,
									mine: ie(e, h, W),
									onCancel: oe
								})
							}, e.transferId))
						]
					})
				}), Te > 0 && /* @__PURE__ */ b("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Me,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", J ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Te,
						" new message",
						Te === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			l ? /* @__PURE__ */ y("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				children: l
			}) : /* @__PURE__ */ b("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					V && /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !we,
						onClick: () => be.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", J ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ y(me, {})
					}), /* @__PURE__ */ y(u, {
						ref: be,
						multiple: !0,
						accept: he,
						onFiles: (e) => {
							let t = G ? e.filter((e) => e.size > G) : [];
							t.length > 0 && K?.(`Skipped ${t.length} file(s) over the size limit.`), Ie(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ y("button", {
						ref: xe,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Se,
						title: "Insert emoji",
						disabled: i,
						onClick: () => Ce((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", J ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"),
						children: /* @__PURE__ */ y("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ y(d, {
						open: Se,
						onSelect: Re,
						onClose: () => Ce(!1),
						triggerRef: xe,
						emojis: q
					}),
					/* @__PURE__ */ y(s, {
						size: "sm",
						value: X,
						onChange: (e) => ve(e.target.value),
						onKeyDown: ze,
						onPaste: Le,
						disabled: i,
						placeholder: i ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", J && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ y(t, {
						variant: "primary",
						size: "sm",
						onClick: Fe,
						disabled: i || !X.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return V ? /* @__PURE__ */ y(f, {
		onFiles: Ie,
		accept: he,
		maxSize: G,
		onError: K,
		disabled: i,
		className: Y ? "flex h-full min-h-0 flex-col" : void 0,
		children: Be
	}) : Be;
}
function me() {
	return /* @__PURE__ */ y("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ y("path", {
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
function he(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function G({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ b("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ b("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ y("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ y("div", { children: e.map((e) => {
			let n = S(he(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = C(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ b("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ y("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ y("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ y("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ y("span", {
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
function K({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ b("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ y("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ y("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ b("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ y("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ y("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ y("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function q(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function J({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ y("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ y("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function ge({ pins: e, onJump: t, onUnpin: n, className: i, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ y(J, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ y(r, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ y(K, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ y(c, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				q(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ y("button", {
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
function _e({ files: e, thumbnailSrc: t, onJump: n, className: i, "data-testid": a = "channel-files-panel" }) {
	return /* @__PURE__ */ y(J, {
		empty: e.length === 0,
		className: i,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ y(r, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = U(e.attachment);
			return /* @__PURE__ */ y(K, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ y("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ y("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					W(e.attachment.size),
					q(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Y({ mentions: e, onJump: t, className: n, "data-testid": i = "mentions-panel" }) {
	return /* @__PURE__ */ y(J, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ y(r, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ y(K, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ b("span", {
				className: "relative",
				children: [/* @__PURE__ */ y(c, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ y("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				q(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function X(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function ve(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Z({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ y(J, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ y(r, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ y(K, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ y("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ y("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [q(e.startedAt), X(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : ve(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Q({ documents: t, onOpen: n, onCreate: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = i && /* @__PURE__ */ b("button", {
		type: "button",
		onClick: i,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ y("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ b("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ y(r, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ y("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ y(K, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ y("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					q(e.updatedAt),
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
var ye = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], be = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function xe({ name: t, description: r, online: o, avatarUrl: s, features: c = ye, children: l, files: u = [], thumbnailSrc: d, documents: f = [], onOpenDocument: p, onCreateDocument: m, pins: h = [], onUnpin: g, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: ee = !1, onWatch: D, watchLabel: O, watchHint: k, watchViewerCount: te, callInProgress: A = !1, headerActions: j, view: M, onViewChange: N, className: P, "data-testid": F = "conversation-surface" }) {
	let I = new Set(c), [L, ne] = _("chat"), R = M ?? L, z = I.has(R) ? R : c[0] ?? "chat", B = (e) => {
		M === void 0 && ne(e), N?.(e);
	}, V = (e) => e || void 0, H = c.filter((e) => be[e]).map((e) => ({
		id: e,
		label: be[e],
		badge: e === "files" ? V(u.length) : e === "documents" ? V(f.length) : e === "pins" ? V(h.length) : e === "calls" ? V(C.length) : e === "mentions" ? V(x.filter((e) => e.unread).length) : void 0
	})), U = (e) => {
		B("chat"), T?.(e);
	};
	return /* @__PURE__ */ b("section", {
		className: e("flex min-w-0 flex-col", P),
		"data-testid": F,
		children: [
			/* @__PURE__ */ y(a, {
				name: t,
				description: r,
				online: o,
				avatarUrl: s,
				"data-testid": `${F}-header`,
				tabs: H.length > 1 ? /* @__PURE__ */ y(i, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: z,
					onValueChange: (e) => B(e),
					items: H
				}) : void 0,
				actions: E || D || j ? /* @__PURE__ */ b(v, { children: [
					E && (ee ? /* @__PURE__ */ y(n, {
						"aria-label": A ? "Join the call" : "Start a call",
						title: A ? "Join the call" : "Start a call",
						"data-testid": `${F}-call`,
						variant: A ? "primary" : "ghost",
						onClick: () => E(!1),
						children: "📞"
					}) : /* @__PURE__ */ b(v, { children: [/* @__PURE__ */ y(n, {
						"aria-label": A ? "Join the call with audio" : "Start an audio call",
						title: A ? "Join with audio" : "Audio call",
						"data-testid": `${F}-audio-call`,
						onClick: () => E(!0),
						children: "📞"
					}), /* @__PURE__ */ y(n, {
						"aria-label": A ? "Join the call with video" : "Start a video call",
						title: A ? "Join with video" : "Video call",
						"data-testid": `${F}-video-call`,
						variant: A ? "primary" : "ghost",
						onClick: () => E(!1),
						children: "🎥"
					})] })),
					D && /* @__PURE__ */ y(Se, {
						testId: `${F}-watch`,
						label: O,
						hint: k,
						viewerCount: te,
						onClick: D
					}),
					j
				] }) : void 0
			}),
			I.has("files") && z === "files" && /* @__PURE__ */ y(_e, {
				className: "min-h-0 flex-1",
				files: u,
				thumbnailSrc: d,
				onJump: T ? U : void 0
			}),
			I.has("documents") && z === "documents" && /* @__PURE__ */ y(Q, {
				className: "min-h-0 flex-1",
				documents: f,
				onOpen: p,
				onCreate: m
			}),
			I.has("pins") && z === "pins" && /* @__PURE__ */ y(ge, {
				className: "min-h-0 flex-1",
				pins: h,
				onUnpin: g,
				onJump: T ? U : void 0
			}),
			I.has("mentions") && z === "mentions" && /* @__PURE__ */ y(Y, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					B("chat"), S(e, t);
				} : void 0
			}),
			I.has("calls") && z === "calls" && /* @__PURE__ */ y(Z, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			I.has("chat") && /* @__PURE__ */ y("div", {
				className: "min-h-0 flex-1",
				"data-testid": `${F}-chat`,
				hidden: z !== "chat",
				children: l
			})
		]
	});
}
function Se({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ b(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Ce,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ y("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ y("span", { children: o }),
			s && /* @__PURE__ */ y("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Ce = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { w as A, I as C, j as D, N as E, C as M, A as O, L as S, P as T, U as _, Y as a, z as b, X as c, fe as d, le as f, W as g, ae as h, _e as i, S as j, T as k, G as l, re as m, xe as n, Z as o, de as p, Q as r, ge as s, ye as t, pe as u, H as v, F as w, ne as x, B as y };
