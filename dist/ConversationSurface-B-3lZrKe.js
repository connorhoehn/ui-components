import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { n as r, t as i } from "./DropdownMenu-BRjC3-Go.js";
import { t as a } from "./Chip-BENLwTlq.js";
import { t as o } from "./EmptyState-JzzL2z1E.js";
import { n as s, o as c, s as l, t as u } from "./ChannelHeader-BOsRE9TC.js";
import { n as d } from "./DockedPanelContext-pH9A5z1h.js";
import { t as f } from "./Input-DLknWXri.js";
import { t as p } from "./Avatar-BzicCOft.js";
import { t as m } from "./StatusPill-Db42eiME.js";
import { i as h, n as g, r as _, t as v } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as y } from "./formatBytes-05ivRSJY.js";
import { Fragment as b, useEffect as x, useMemo as S, useRef as C, useState as w } from "react";
import { Fragment as T, jsx as E, jsxs as D } from "react/jsx-runtime";
//#region src/utils/identity.ts
var O = [
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
function k(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return O[Math.abs(t) % O.length];
}
function A(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function j(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function M(e, t) {
	let n = j(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = j(t);
	return r ? n !== r : !1;
}
function N(e, t = /* @__PURE__ */ new Date()) {
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
function P(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function F(e) {
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
function I(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function L({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", className: u }) {
	let d = l === "dark", f = I(r), m = !o || !!f;
	return /* @__PURE__ */ D("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", u),
		children: [/* @__PURE__ */ E("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ E(p, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ D("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ D("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ E("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", d ? "text-white/70" : "text-text-secondary"),
						children: t
					}), f && /* @__PURE__ */ E("time", {
						"data-testid": "message-row-time",
						dateTime: r,
						title: F(r),
						className: e("text-xs shrink-0", d ? "text-white/40" : "text-text-tertiary"),
						children: f
					})]
				}),
				/* @__PURE__ */ E("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", d ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (d ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ E("div", {
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
var ee = /* @__PURE__ */ new Set([
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
]), te = /^(https?:|mailto:)/i;
function R(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || te.test(t) ? t : null;
}
function z(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => z(e, `${t}-${n}`));
	if (!ee.has(n.tagName)) return /* @__PURE__ */ E("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ E("br", {}, t);
		case "A": {
			let e = R(n.getAttribute("href"));
			return e ? /* @__PURE__ */ E("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ E("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ E("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ E(e, { children: r }, t);
		}
	}
}
var B = /```([\s\S]*?)```|`([^`\n]+)`/g;
function V(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (B.lastIndex = 0; (r = B.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ E("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ E("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ E("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function H({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = S(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => z(e, `n${t}`));
	}, [t]), o = S(() => V(n ?? ""), [n]);
	return /* @__PURE__ */ E("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function U({ documentId: t, title: n, icon: i, createdBy: a, editors: o = [], onOpen: s, className: c, "data-testid": l = "document-activity-card" }) {
	let u = o.length > 0;
	return /* @__PURE__ */ D("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", c),
		children: [
			/* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: i || "📄"
			}),
			/* @__PURE__ */ D("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ E("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ E("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${ne(o)} editing now` : a ? `Created by ${a}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ E("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ E(r, {
					users: o.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: !0
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			s && /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => s(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function ne(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function W({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ D("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ E("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ E("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function G(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function K(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function re(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ie({ callId: t, startedBy: n, participants: i = [], live: a = !1, durationMs: o, audioOnly: s, recorded: c, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !a && typeof o == "number" ? G(o) : "", h = s === void 0 ? "Call" : s ? "Audio call" : "Video call", g = a ? K(i, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ D("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": a ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", a ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: s === void 0 || s ? "📞" : "📹"
			}),
			/* @__PURE__ */ D("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ E("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: a ? `${h} in progress` : h
					}),
					/* @__PURE__ */ E("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!a && c === !1 && /* @__PURE__ */ E("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: re(l, u)
					})
				]
			}),
			i.length > 0 && /* @__PURE__ */ E("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ E(r, {
					users: i.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: a
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			a && d && /* @__PURE__ */ E("button", {
				type: "button",
				"data-testid": `${p}-join`,
				onClick: () => d(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
var ae = {
	saving: {
		state: "pending",
		label: "Saving recording"
	},
	transcribing: {
		state: "pending",
		label: "Transcribing"
	},
	summarizing: {
		state: "pending",
		label: "Summarizing"
	},
	ready: {
		state: "success",
		label: "Ready to watch"
	},
	failed: {
		state: "error",
		label: "Could not be processed"
	},
	gone: {
		state: "neutral",
		label: "No longer available"
	}
};
function oe(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function se(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function ce(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function q({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ D("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ E("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ E(p, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ D("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ E("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ E("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ E("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function le({ recordingId: n, title: a = "Recording", recordedBy: o, participants: s = [], participantCount: c, startedAt: l, durationMs: u, thumbnailUrl: d, stage: f = "ready", transcriptReady: p = !1, summaryReady: h = !1, expiresAt: g, pinned: _ = !1, onOpen: v, onCopyLink: y, onShare: b, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: O, "data-testid": k = "recording-activity-card" }) {
	let A = c ?? s.length, j = f === "gone", M = f !== "saving" && f !== "failed" && !j && !!v, N = () => {
		v?.(n);
	}, P = u != null && u > 0 ? G(u) : "", F = oe(l), I = ce(s, A), { state: L, label: ee } = ae[f], te = [
		...v && M ? [{
			"data-testid": `${k}-menu-open`,
			label: "Open",
			onSelect: N
		}] : [],
		...C && p ? [{
			"data-testid": `${k}-menu-transcript`,
			label: "Transcript",
			onSelect: () => C(n)
		}] : [],
		...y && !j ? [{
			"data-testid": `${k}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => y(n)
		}] : [],
		...b && !j ? [{
			"data-testid": `${k}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => b(n)
		}] : [],
		...x && !j ? [{
			"data-testid": `${k}-menu-pin`,
			label: _ ? "Unpin" : "Pin",
			onSelect: () => x(n)
		}] : [],
		...S && M ? [{
			"data-testid": `${k}-menu-download`,
			label: "Download",
			onSelect: () => S(n)
		}] : []
	], R = te.length ? [{
		items: te,
		"data-testid": `${k}-menu-items`
	}] : [];
	return /* @__PURE__ */ D("div", {
		"data-testid": k,
		"data-recording-id": n,
		"data-stage": f,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", O),
		children: [/* @__PURE__ */ D("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ D("button", {
				type: "button",
				onClick: M ? N : void 0,
				disabled: !M,
				"aria-label": M ? `Play ${a.toLowerCase()}` : `${a}: ${ee.toLowerCase()}`,
				"data-testid": `${k}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", M ? "cursor-pointer" : "cursor-default"),
				children: [
					d ? /* @__PURE__ */ E("img", {
						src: d,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${k}-thumbnail`
					}) : /* @__PURE__ */ E(q, {
						participants: s,
						total: A,
						testId: k
					}),
					M && /* @__PURE__ */ E("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ E("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ E("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ E("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					P && /* @__PURE__ */ E("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${k}-duration`,
						children: P
					})
				]
			}), /* @__PURE__ */ D("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ D("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ D("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ E("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${k}-title`,
								children: a
							}), _ && /* @__PURE__ */ E("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${k}-pinned`,
								title: "Pinned",
								children: "📌"
							})]
						}),
						o && /* @__PURE__ */ D("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${k}-by`,
							children: ["by ", o]
						}),
						A > 0 && /* @__PURE__ */ D("div", {
							className: "flex items-center gap-2",
							"data-testid": `${k}-people`,
							children: [/* @__PURE__ */ E(r, {
								users: s.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ E("span", {
								className: "truncate text-xs text-text-tertiary",
								children: I
							})]
						}),
						/* @__PURE__ */ D("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ E(m, {
									state: L,
									label: ee,
									size: "sm",
									"data-testid": `${k}-stage`
								}),
								f === "ready" && p && /* @__PURE__ */ E(m, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${k}-transcript`
								}),
								f === "ready" && h && /* @__PURE__ */ E(m, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${k}-summary`
								}),
								F && /* @__PURE__ */ E("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${k}-when`,
									children: F
								})
							]
						})
					]
				}), R.length > 0 && /* @__PURE__ */ E(i, {
					trigger: /* @__PURE__ */ E("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: R,
					"data-testid": `${k}-menu`
				})]
			})]
		}), g && f !== "failed" && !j && /* @__PURE__ */ D("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${k}-expiry`,
			children: [/* @__PURE__ */ D("span", { children: ["Set to expire ", se(g)] }), w && /* @__PURE__ */ E(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => w(n),
				"data-testid": `${k}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function ue(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function de(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function fe(e, t) {
	let n = e.names && e.names.length > 0 ? ue(e.names) : e.userIds.length > 0 ? ue(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = de(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function pe({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = fe(t, n);
	return /* @__PURE__ */ D("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ E("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ E("time", {
			dateTime: r,
			className: "tabular-nums",
			"data-testid": `${a}-time`,
			children: new Date(r).toLocaleTimeString(void 0, {
				hour: "numeric",
				minute: "2-digit"
			})
		})]
	});
}
//#endregion
//#region src/components/social/AgentRunCard.tsx
var me = [
	{
		phase: "received",
		label: "Received"
	},
	{
		phase: "running",
		label: "Processing via pipeline"
	},
	{
		phase: "completed",
		label: "Updated"
	}
], J = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, he = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, ge = 6;
function Y(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function _e(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function ve(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Y(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Y(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Y(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${_e(e.index)}`;
		case "deleteBlock": return `Removed block ${_e(e.index)}`;
		case "appendMacro": return t ? `Added a ${Y(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${_e(e.index)}`;
		case "setDocumentType": return `Type: ${Y(t, 40)}`;
		case "skip": return t ? Y(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Y(t)}` : e.op;
	}
}
function ye(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function be(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function xe(e) {
	if (!e?.startedAt) return null;
	let t = ye(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? be(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Se = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Ce({ runId: r, instruction: i, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = l?.phase ?? "received", [S, C] = w(v), T = x === "completed" ? l?.suggestion ?? h : void 0, O = x === "completed" ? l?.review : void 0, k = !!T && !O, A = x === "completed" && l?.noop === !0, j = x === "completed" ? l?.result ?? f : void 0, M = j?.kind === "link" && j.label ? j.label : "Open", N = u && !(j?.kind === "document" && p), P = J[x], F = x === "failed" || x === "rejected", I = F ? "danger" : O ? O.decision === "accept" ? "success" : "neutral" : A ? "warning" : x === "completed" ? T ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", L = O ? "Reviewed" : k ? "Suggested" : A ? "No change" : he[x], ee = O ? O.byName ?? O.by : void 0, te = O ? `${O.decision === "accept" ? "Accepted" : "Rejected"} by ${ee}` : void 0, R = x === "awaiting_approval", z = x === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : R ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : te ?? l?.detail ?? (k && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : L), B = l?.details, V = B?.ops ?? [], H = B?.steps ?? [], U = B?.document?.title || _ || "Document", ne = !!B?.document || !!u, W = B?.error ?? (x === "failed" ? l?.detail : void 0), G = xe(B), K = `${b}-details-${r}`;
	return /* @__PURE__ */ D("div", {
		className: e("flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", y),
		"data-testid": b,
		"data-phase": x,
		"data-run-id": r,
		"data-expanded": S ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${i}` : `${o}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || C((e) => !e);
		},
		children: [
			/* @__PURE__ */ D("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ E("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ D("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${b}-instruction`,
						children: [
							/* @__PURE__ */ E("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ E(a, {
						size: "xs",
						tone: I,
						"data-testid": `${b}-phase`,
						children: L
					}),
					/* @__PURE__ */ E(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? K : void 0,
						onClick: () => C((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${b}-toggle`,
						icon: /* @__PURE__ */ E("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", S && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ D("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ E("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${b}-steps`,
						children: me.map((t, n) => {
							let r = F ? n < P : n < P || n === P && x === "completed", i = n === P && x !== "completed" && !F, a = F && n === P;
							return /* @__PURE__ */ D("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ E("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? A && n === P ? "bg-warning" : "bg-success" : i ? R ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ E("span", {
									className: "sr-only",
									children: a ? L : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ E("span", {
						className: e("min-w-0 flex-1 truncate", O && (O.decision === "accept" ? "text-success" : "text-text-tertiary"), x === "failed" && "text-danger", A && "text-warning-fg"),
						"data-testid": `${b}-detail`,
						"data-review": O?.decision,
						title: l?.detail,
						children: z
					}),
					k && T && g && /* @__PURE__ */ D("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-review`,
						children: [/* @__PURE__ */ E(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${b}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ E(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${b}-reject-review`,
							children: "Reject"
						})]
					}),
					R && m && /* @__PURE__ */ D("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-decide`,
						children: [/* @__PURE__ */ E(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "approve"),
							"data-testid": `${b}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ E(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "reject"),
							"data-testid": `${b}-reject`,
							children: "Reject"
						})]
					}),
					j && p && /* @__PURE__ */ E("button", {
						type: "button",
						onClick: () => p(j),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": j.kind,
						children: M
					}),
					j?.kind === "link" && !p && /* @__PURE__ */ E("a", {
						href: j.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": "link",
						children: M
					}),
					d && /* @__PURE__ */ E("button", {
						type: "button",
						onClick: () => d(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-run`,
						children: "run"
					}),
					N && /* @__PURE__ */ E("button", {
						type: "button",
						onClick: u,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-document`,
						children: "document"
					})
				]
			}),
			S && /* @__PURE__ */ D("div", {
				id: K,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					ne && /* @__PURE__ */ D("div", {
						className: "flex items-start gap-2",
						"data-testid": `${b}-details-document`,
						children: [
							/* @__PURE__ */ E("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ D("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ E("span", {
									className: "block truncate font-medium text-text-primary",
									children: U
								}), B?.document?.snippet && /* @__PURE__ */ E("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							u && /* @__PURE__ */ E(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${b}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ D("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ E("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, ge).map((e, t) => /* @__PURE__ */ E("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: ve(e)
								}, t))
							}),
							V.length > ge && /* @__PURE__ */ D("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									V.length - ge,
									" more"
								]
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ E("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: H.map((t) => /* @__PURE__ */ D("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ E("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Se[t.status] ?? Se.pending)
							}), /* @__PURE__ */ E("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					W && /* @__PURE__ */ E("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: W
					}),
					/* @__PURE__ */ D("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ E("button", {
								type: "button",
								onClick: () => d(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${b}-details-open-run`,
								children: "Open run"
							}),
							j && p && /* @__PURE__ */ E("button", {
								type: "button",
								onClick: () => p(j),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${b}-details-open-result`,
								children: M
							}),
							G && /* @__PURE__ */ E("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${b}-details-timings`,
								children: G
							})
						]
					})
				]
			})
		]
	});
}
function we(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = X(e.result);
	return {
		runId: t,
		documentId: n,
		instruction: typeof e.instruction == "string" ? e.instruction : "",
		agentName: typeof e.agentName == "string" && e.agentName ? e.agentName : "Agent",
		command: typeof e.command == "string" && e.command ? e.command : "/doc",
		...typeof e.pipelineId == "string" ? { pipelineId: e.pipelineId } : {},
		...typeof e.documentTitle == "string" && e.documentTitle ? { documentTitle: e.documentTitle } : {},
		...r ? { result: r } : {},
		...typeof e.suggestionKey == "string" && e.suggestionKey ? { suggestionKey: e.suggestionKey } : {}
	};
}
function X(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (t.kind === "document" && typeof t.documentId == "string" && t.documentId) return {
		kind: "document",
		documentId: t.documentId
	};
	if (t.kind === "link" && typeof t.href == "string" && t.href) return {
		kind: "link",
		href: t.href,
		...typeof t.label == "string" && t.label ? { label: t.label } : {}
	};
	if (t.kind === "panel" && t.panel && typeof t.panel == "object") {
		let e = t.panel;
		if (typeof e.kind != "string" || !e.kind || typeof e.id != "string" || !e.id) return null;
		let n = {
			kind: e.kind,
			id: e.id
		};
		if (typeof e.title == "string" && e.title && (n.title = e.title), e.params && typeof e.params == "object") {
			let t = {};
			for (let [n, r] of Object.entries(e.params)) typeof r == "string" && (t[n] = r);
			n.params = t;
		}
		return {
			kind: "panel",
			panel: n
		};
	}
	return null;
}
//#endregion
//#region src/components/social/ReactionChips.tsx
function Te(e, t) {
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
function Ee(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function De({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = S(() => Te(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ E("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ D("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Ee(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ E("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Oe = [
	"👍",
	"🎉",
	"❤️"
], ke = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ae({ quickReactions: t = Oe, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ E("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${ke}`,
		children: n
	}, r);
	return /* @__PURE__ */ D("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function je(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Me(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Ne({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ E("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ E("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Me(t.timestamp)
		})]
	}), /* @__PURE__ */ E("span", {
		className: "block truncate text-xs text-text-secondary",
		children: je(t.text)
	})] });
	return /* @__PURE__ */ D("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ E("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ E("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ E("button", {
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
function Z(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function Pe({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Z(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ D("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ E("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ E("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ E("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ E("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ D("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ E("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ E("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: y(t.size)
			})]
		})]
	}) : /* @__PURE__ */ E("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ D("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ E(Le, {}), /* @__PURE__ */ D("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ E("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ E("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: y(t.size)
				})]
			})]
		})
	});
}
function Fe(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ie({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : y(o);
	return /* @__PURE__ */ D("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ E("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ E(Le, {}),
			/* @__PURE__ */ D("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ D("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ E("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ E("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ E("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ E("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ E("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ E("button", {
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
function Le() {
	return /* @__PURE__ */ E("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ E("path", {
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
function Re({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = N(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ D("div", {
		role: "separator",
		"aria-label": P(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ E("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function ze(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Be(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Ve(e) {
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
function He(e) {
	if (!e || !Array.isArray(e.documents)) return [];
	let t = /* @__PURE__ */ new Set(), n = [];
	for (let r of e.documents) {
		if (!r || typeof r != "object") continue;
		let e = r;
		typeof e.id != "string" || !e.id || t.has(e.id) || (t.add(e.id), n.push({
			id: e.id,
			label: typeof e.label == "string" && e.label ? e.label : e.id,
			...typeof e.icon == "string" && e.icon ? { icon: e.icon } : {}
		}));
	}
	return n;
}
var Ue = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function We(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Ue[e] ?? e)
	};
}
function Ge(e) {
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
		recorded: typeof e.recorded == "boolean" ? e.recorded : void 0,
		notRecordedReason: typeof e.notRecordedReason == "string" ? e.notRecordedReason : void 0,
		lobbyName: typeof e.lobbyName == "string" ? e.lobbyName : void 0,
		participants: n
	};
}
function Ke(e) {
	if (!e || e.kind !== "recording") return null;
	let t = typeof e.recordingId == "string" ? e.recordingId : "";
	if (!t) return null;
	let n = e.stage ?? (e.status === "processing" ? "saving" : e.status), r = n === "saving" || n === "transcribing" || n === "summarizing" || n === "failed" ? n : "ready", i = (Array.isArray(e.participants) ? e.participants : []).map((e) => {
		let t = e, n = typeof t?.userId == "string" ? t.userId : typeof t?.id == "string" ? t.id : "";
		return n ? {
			id: n,
			name: typeof t.displayName == "string" && t.displayName ? t.displayName : typeof t.name == "string" && t.name ? t.name : n,
			...typeof t.avatarUrl == "string" ? { avatarUrl: t.avatarUrl } : {}
		} : null;
	}).filter(Boolean);
	return {
		recordingId: t,
		callId: typeof e.callId == "string" ? e.callId : void 0,
		title: typeof e.title == "string" ? e.title : void 0,
		recordedBy: typeof e.recordedBy == "string" ? e.recordedBy : void 0,
		startedAt: typeof e.startedAt == "string" ? e.startedAt : void 0,
		durationMs: typeof e.durationMs == "number" ? e.durationMs : void 0,
		thumbnailUrl: typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : void 0,
		participants: i,
		participantCount: typeof e.participantCount == "number" ? e.participantCount : void 0,
		stage: r,
		expiresAt: typeof e.expiresAt == "string" ? e.expiresAt : void 0
	};
}
function qe(e) {
	if (!e || e.kind !== "membership") return null;
	let t = e.event === "removed" ? "removed" : e.event === "added" ? "added" : null;
	if (!t) return null;
	let n = typeof e.actorId == "string" ? e.actorId : "", r = Array.isArray(e.userIds) ? e.userIds.filter((e) => typeof e == "string") : [], i = e.names, a = Array.isArray(i) ? i.filter((e) => typeof e == "string") : i && typeof i == "object" ? (Array.isArray(e.userIds) ? e.userIds : []).map((e) => {
		let t = i[String(e)];
		return typeof t == "string" && t ? t : String(e);
	}) : void 0, o = e.history, s = o && (o.mode === "none" || o.mode === "all" || o.mode === "days") ? {
		mode: o.mode,
		...typeof o.days == "number" ? { days: o.days } : {}
	} : void 0;
	return {
		event: t,
		actorId: n,
		...typeof e.actorName == "string" ? { actorName: e.actorName } : {},
		userIds: r,
		...a && a.length ? { names: a } : {},
		...s ? { history: s } : {}
	};
}
function Je(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Ye(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Je(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Xe({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: c = [], emptyState: u, composer: p, currentUserId: m, reactionsFor: y, onToggleReaction: S, onReply: O, onTogglePin: k, pinnedMessageIds: A, onJumpToMessage: j, highlightedMessageId: N, documentEditors: P, callParticipants: F, agentRunStatus: I, onOpenRun: ee, onOpenResult: te, onDecideRun: R, onReviewRun: z, onJoinCall: B, onOpenRecording: V, onCopyRecordingLink: ne, onShareRecording: G, onDownloadRecording: K, onOpenRecordingTranscript: re, onManageRecordingExpiry: ae, recordingStatus: oe, onOpenDocument: se, tone: ce = "light", showHeader: q, fill: ue, onLoadMore: de, hasMore: fe, loadingMore: me = !1, onSendFiles: J, transfers: he = [], currentActor: ge, onCancelTransfer: Y, attachmentSrc: _e, onOpenAttachment: ve, acceptFiles: ye, maxFileSize: be, onFileError: xe, emojis: Se = v }) {
	let X = ce === "dark", Te = d(), Ee = q ?? !(Te?.hasHeader ?? !1), Oe = ue ?? Te?.fillsHeight ?? !1, [ke, je] = w(""), Me = C(null), Z = C(null), Le = !!de && fe !== !1, Ue = C(null), Xe = C(null), [Qe, $e] = w(!1), Q = !!J && !a, $ = Ye(n, r), [et, tt] = w(0), [nt, rt] = w(!1), it = C(!0), at = C(n.length), ot = n.length + r.length + he.length, st = C(null), [ct, lt] = w(""), ut = C(null), dt = C(!1), ft = C(0);
	x(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!dt.current) {
			dt.current = !0, ut.current = t;
			return;
		}
		if (t === ut.current || (ut.current = t, m && e.userId === m)) return;
		ft.current += 1;
		let r = ft.current % 2 == 0 ? "​" : "";
		lt(Be(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, m]);
	function pt() {
		let e = Me.current;
		e && (e.scrollTop = e.scrollHeight, it.current = !0, tt(0));
	}
	function mt() {
		let e = Me.current;
		if (!e) return;
		let t = ze(e);
		it.current = t, t && tt(0), rt(e.scrollTop > 8);
	}
	x(() => {
		let e = Me.current, t = at.current, n = ot - t;
		if (at.current = ot, !e) return;
		let r = st.current;
		if (r && n > 0) {
			st.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		it.current ? (e.scrollTop = e.scrollHeight, tt(0), rt(e.scrollTop > 8)) : n > 0 && tt((e) => e + n);
	}, [ot]);
	function ht() {
		let e = Me.current;
		e && (st.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), de?.();
	}
	x(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function gt() {
		let e = ke.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), it.current = !0, i(e), je(""));
	}
	function _t(e) {
		!Q || e.length === 0 || (it.current = !0, J?.(e));
	}
	function vt(e) {
		if (!Q) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), _t(t));
	}
	function yt(e) {
		je((t) => t + e), $e(!1);
	}
	function bt() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function xt(e) {
		bt(), e.key === "Enter" && !a && ke.trim() && gt();
	}
	let St = /* @__PURE__ */ D("div", {
		"data-testid": "chat-panel",
		className: e(Oe ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", X ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Ee && /* @__PURE__ */ D("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", X ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ E("span", {
				style: l,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: ct
			}),
			/* @__PURE__ */ D("div", {
				className: e("relative flex flex-col mb-2", Oe ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ E("div", {
					ref: Me,
					onScroll: mt,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", nt && "fade-top", Oe ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ D("div", {
						className: "mt-auto",
						children: [
							Le && n.length > 0 && /* @__PURE__ */ E("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ E("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: ht,
									disabled: me,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: me ? "Loading…" : "Load earlier messages"
								})
							}),
							$.length === 0 ? u ?? /* @__PURE__ */ E("div", {
								className: e("text-sm", X ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : $.map((n, r) => {
								let i = Je($[r - 1]), a = n.kind === "message" ? n.message.timestamp : n.local.timestamp, o = M(a, i) ? /* @__PURE__ */ E(Re, {
									timestamp: a,
									tone: ce
								}, `day:${a}:${r}`) : null;
								if (n.kind === "local") {
									let r = n.local, i = we(r.metadata);
									return /* @__PURE__ */ D(b, { children: [o, /* @__PURE__ */ E("div", {
										"data-testid": "chat-local-message",
										"data-local-message-id": r.id,
										className: "rounded-md",
										children: /* @__PURE__ */ E(L, {
											author: r.displayName,
											timestamp: r.timestamp,
											tone: ce,
											mine: !0,
											content: /* @__PURE__ */ D(T, { children: [
												i ? /* @__PURE__ */ E(Ce, {
													runId: i.runId,
													instruction: i.instruction || r.content,
													command: i.command,
													agentName: i.agentName,
													requestedBy: r.displayName,
													status: I?.(i.runId),
													onOpenDocument: se && i.documentId ? () => se(i.documentId) : void 0,
													documentTitle: i.documentTitle,
													onOpenRun: ee,
													result: i.result,
													onOpenResult: te,
													onDecide: R,
													suggestion: i.suggestionKey ? {
														key: i.suggestionKey,
														...i.documentId ? { documentId: i.documentId } : {}
													} : void 0,
													onReview: z
												}) : /* @__PURE__ */ E(H, { text: r.content }),
												/* @__PURE__ */ E("div", {
													"data-testid": "chat-local-message-note",
													className: e("mt-1 text-[11px] italic", X ? "text-white/50" : "text-text-tertiary"),
													children: r.note ?? "Only you can see this"
												}),
												r.actions && r.actions.length > 0 && /* @__PURE__ */ E("div", {
													className: "mt-1.5 flex flex-wrap gap-1.5",
													"data-testid": "chat-local-message-actions",
													children: r.actions.map((e) => /* @__PURE__ */ E(t, {
														type: "button",
														size: "sm",
														variant: e.primary ? "primary" : "ghost",
														onClick: e.onSelect,
														children: e.label
													}, e.id))
												})
											] })
										})
									})] }, `local:${r.id}`);
								}
								let { message: s } = n, c = s.displayName ?? s.clientId.slice(0, 8), l = s.attachments ?? [], u = s.metadata?.html, d = typeof u == "string" ? u : void 0, f = /* @__PURE__ */ E(H, {
									html: d,
									text: s.content
								}), p = Ve(s.metadata), h = we(s.metadata), g = Ge(s.metadata), _ = Ke(s.metadata), v = qe(s.metadata), x = We(s.metadata), C = He(s.metadata), w = h ? /* @__PURE__ */ E(Ce, {
									runId: h.runId,
									instruction: h.instruction || s.content.replace(/^\/doc\s*/i, ""),
									command: h.command,
									agentName: h.agentName,
									requestedBy: s.displayName,
									status: I?.(h.runId),
									onOpenDocument: se && h.documentId ? () => se(h.documentId) : void 0,
									documentTitle: h.documentTitle,
									onOpenRun: ee,
									result: h.result,
									onOpenResult: te,
									onDecide: R,
									suggestion: h.suggestionKey ? {
										key: h.suggestionKey,
										...h.documentId ? { documentId: h.documentId } : {}
									} : void 0,
									onReview: z
								}) : _ ? (() => {
									let e = oe?.(_.recordingId), t = {
										..._,
										...e ?? {}
									};
									return /* @__PURE__ */ E(le, {
										recordingId: t.recordingId,
										title: t.title,
										recordedBy: t.recordedBy ?? s.displayName,
										participants: t.participants,
										participantCount: t.participantCount,
										startedAt: t.startedAt,
										durationMs: t.durationMs,
										thumbnailUrl: t.thumbnailUrl,
										stage: t.stage ?? "ready",
										transcriptReady: t.transcriptReady,
										summaryReady: t.summaryReady,
										expiresAt: t.expiresAt,
										pinned: !!s.id && !!A?.has(s.id),
										onOpen: V,
										onCopyLink: ne,
										onShare: G,
										onDownload: K,
										onOpenTranscript: re,
										onManageExpiry: ae,
										onTogglePin: k ? () => k(s) : void 0
									});
								})() : g ? /* @__PURE__ */ E(ie, {
									callId: g.callId,
									startedBy: (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									participants: F?.(g.callId) ?? g.participants,
									live: g.live,
									durationMs: g.durationMs,
									audioOnly: g.audioOnly,
									recorded: g.recorded,
									notRecordedReason: g.notRecordedReason,
									lobbyName: g.lobbyName,
									onJoin: B
								}) : p ? /* @__PURE__ */ E(U, {
									documentId: p.documentId,
									title: p.title || s.content,
									icon: p.icon,
									createdBy: p.createdBy ?? (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									editors: P?.(p.documentId) ?? [],
									onOpen: se
								}) : l.length === 0 ? f : /* @__PURE__ */ D(T, { children: [(s.content || d) && f, l.map((e) => /* @__PURE__ */ E(Pe, {
									attachment: e,
									src: _e?.(e),
									onOpen: ve
								}, e.id))] }), q = s.id ?? "", ue = q && y ? y(q) : [], de = s.metadata?.replyTo, fe = !!q && !!A?.has(q), me = !!m && s.userId === m, J = s.metadata?.system === !0, he = /* @__PURE__ */ D(T, { children: [
									de && /* @__PURE__ */ E(Ne, {
										quote: de,
										onJump: j,
										className: "mb-1"
									}),
									fe && /* @__PURE__ */ E("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									w,
									C.length > 0 && /* @__PURE__ */ E("div", {
										className: "mt-1 flex flex-wrap gap-1",
										"data-testid": "chat-message-docrefs",
										children: C.map((e) => /* @__PURE__ */ E(W, {
											documentId: e.id,
											label: e.label,
											icon: e.icon,
											onOpen: se
										}, e.id))
									}),
									x && /* @__PURE__ */ D("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											x.labels.length > 0 ? `Too large to send: ${x.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									ue.length > 0 && m && S && /* @__PURE__ */ E(De, {
										reactions: ue,
										currentUserId: m,
										onToggle: (e) => S(q, e)
									})
								] });
								return v ? /* @__PURE__ */ D(b, { children: [o, /* @__PURE__ */ E(pe, {
									membership: v,
									fallbackText: s.content,
									timestamp: s.timestamp,
									"data-testid": "membership-notice"
								})] }, s.id ?? r) : /* @__PURE__ */ D(b, { children: [o, /* @__PURE__ */ D("div", {
									"data-testid": "chat-message",
									"data-message-id": q || void 0,
									className: e("group relative rounded-md transition-colors hover:bg-surface-hover", q && q === N && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ E(L, {
										author: c,
										content: he,
										timestamp: s.timestamp,
										avatarUrl: s.avatarUrl,
										tone: ce,
										mine: me
									}), q && (S || !J && (O || k)) && /* @__PURE__ */ E(Ae, {
										className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
										onReact: S ? (e) => S(q, e) : void 0,
										onReply: O && !J ? () => O(s) : void 0,
										onTogglePin: k && !J ? () => k(s) : void 0,
										pinned: !!s.id && !!A?.has(s.id)
									})]
								})] }, s.id ?? r);
							}),
							he.map((e) => /* @__PURE__ */ E(L, {
								author: e.actor,
								timestamp: "",
								tone: ce,
								content: /* @__PURE__ */ E(Ie, {
									transfer: e,
									mine: Fe(e, m, ge),
									onCancel: Y
								})
							}, e.transferId))
						]
					})
				}), et > 0 && /* @__PURE__ */ D("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: pt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						et,
						" new message",
						et === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ E(s, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", X ? "text-white/50" : "text-text-secondary")
			}),
			p ? /* @__PURE__ */ E("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? bt : void 0,
				children: p
			}) : /* @__PURE__ */ D("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					J && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Q,
						onClick: () => Ue.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", X ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ E(Ze, {})
					}), /* @__PURE__ */ E(h, {
						ref: Ue,
						multiple: !0,
						accept: ye,
						onFiles: (e) => {
							let t = be ? e.filter((e) => e.size > be) : [];
							t.length > 0 && xe?.(`Skipped ${t.length} file(s) over the size limit.`), _t(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ E("button", {
						ref: Xe,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Qe,
						title: "Insert emoji",
						disabled: a,
						onClick: () => $e((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", X ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ E("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ E(g, {
						open: Qe,
						onSelect: yt,
						onClose: () => $e(!1),
						triggerRef: Xe,
						emojis: Se
					}),
					/* @__PURE__ */ E(f, {
						size: "sm",
						value: ke,
						onChange: (e) => je(e.target.value),
						onKeyDown: xt,
						onPaste: vt,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", X && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ E(t, {
						variant: "primary",
						size: "sm",
						onClick: gt,
						disabled: a || !ke.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return J ? /* @__PURE__ */ E(_, {
		onFiles: _t,
		accept: ye,
		maxSize: be,
		onError: xe,
		disabled: a,
		className: Oe ? "flex h-full min-h-0 flex-col" : void 0,
		children: St
	}) : St;
}
function Ze() {
	return /* @__PURE__ */ E("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ E("path", {
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
function Qe(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function $e({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ D("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ D("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ E("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ E("div", { children: e.map((e) => {
			let n = k(Qe(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = A(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ D("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ E("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ E("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ E("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ E("span", {
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
function Q({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ D("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ E("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ E("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ D("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ E("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ E("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ E("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function $(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function et({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ E("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ E("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function tt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ E(et, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ E(Q, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ E(p, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				$(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ E("button", {
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
function nt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ E(et, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Z(e.attachment);
			return /* @__PURE__ */ E(Q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ E("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ E("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					y(e.attachment.size),
					$(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function rt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ E(et, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ E(Q, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ D("span", {
				className: "relative",
				children: [/* @__PURE__ */ E(p, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ E("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				$(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function it(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function at(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function ot({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ E(et, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ E(Q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ E("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ E("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [$(e.startedAt), it(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : at(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function st({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ D("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ E("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ D("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [s, t.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ E("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ E(Q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ E("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					$(e.updatedAt),
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
var ct = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], lt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function ut({ name: t, description: r, online: i, avatarUrl: a, features: o = ct, children: s, canvas: l, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: S = [], onOpenRecording: C, onJumpToMessage: O, onStartCall: k, callModeFixed: A = !1, onWatch: j, watchLabel: M, watchHint: N, watchViewerCount: P, callInProgress: F = !1, headerActions: I, view: L, onViewChange: ee, className: te, "data-testid": R = "conversation-surface" }) {
	let z = new Set(o), [B, V] = w("chat"), H = L ?? B, U = z.has(H) ? H : o[0] ?? "chat", ne = (e) => {
		L === void 0 && V(e), ee?.(e);
	}, W = (e) => e || void 0, G = o.filter((e) => lt[e]).map((e) => ({
		id: e,
		label: lt[e],
		badge: e === "files" ? W(p.length) : e === "documents" ? W(h.length) : e === "pins" ? W(v.length) : e === "members" ? f == null ? void 0 : W(f) : e === "calls" ? W(S.length) : e === "mentions" ? W(b.filter((e) => e.unread).length) : void 0
	})), K = (e) => {
		ne("chat"), O?.(e);
	};
	return /* @__PURE__ */ D("section", {
		className: e("flex min-w-0 flex-col", te),
		"data-testid": R,
		children: [
			/* @__PURE__ */ E(u, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${R}-header`,
				tabs: G.length > 1 ? /* @__PURE__ */ E(c, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: U,
					onValueChange: (e) => ne(e),
					items: G
				}) : void 0,
				actions: k || j || I ? /* @__PURE__ */ D(T, { children: [
					k && (A ? /* @__PURE__ */ E(n, {
						"aria-label": F ? "Join the call" : "Start a call",
						title: F ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => k(!1),
						children: "📞"
					}) : /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E(n, {
						"aria-label": F ? "Join the call with audio" : "Start an audio call",
						title: F ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => k(!0),
						children: "📞"
					}), /* @__PURE__ */ E(n, {
						"aria-label": F ? "Join the call with video" : "Start a video call",
						title: F ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => k(!1),
						children: "🎥"
					})] })),
					j && /* @__PURE__ */ E(dt, {
						testId: `${R}-watch`,
						label: M,
						hint: N,
						viewerCount: P,
						onClick: j
					}),
					I
				] }) : void 0
			}),
			z.has("files") && U === "files" && /* @__PURE__ */ E(nt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: O ? K : void 0
			}),
			z.has("documents") && U === "documents" && /* @__PURE__ */ E(st, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			z.has("pins") && U === "pins" && /* @__PURE__ */ E(tt, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: O ? K : void 0
			}),
			z.has("members") && U === "members" && /* @__PURE__ */ E("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-members`,
				children: d
			}),
			z.has("mentions") && U === "mentions" && /* @__PURE__ */ E(rt, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					ne("chat"), x(e, t);
				} : void 0
			}),
			z.has("calls") && U === "calls" && /* @__PURE__ */ E(ot, {
				className: "min-h-0 flex-1",
				recordings: S,
				onOpen: C
			}),
			z.has("chat") && /* @__PURE__ */ D("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: U !== "chat",
				children: [l && /* @__PURE__ */ E("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${R}-canvas`,
					children: l
				}), /* @__PURE__ */ E("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function dt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ D(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? ft,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ E("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ E("span", { children: o }),
			s && /* @__PURE__ */ E("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var ft = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { X as A, G as B, Ae as C, Se as D, Te as E, de as F, I as G, U as H, le as I, P as J, j as K, ce as L, ve as M, pe as N, Ce as O, fe as P, A as Q, ie as R, je as S, Ee as T, H as U, W as V, L as W, M as X, F as Y, k as Z, Re as _, rt as a, Z as b, it as c, Ge as d, Ve as f, We as g, Ke as h, nt as i, xe as j, we as k, $e as l, qe as m, ut as n, ot as o, He as p, N as q, st as r, tt as s, ct as t, Xe as u, Pe as v, De as w, Ne as x, Ie as y, K as z };
