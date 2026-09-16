import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { n as r, t as i } from "./DropdownMenu-BRjC3-Go.js";
import { t as a } from "./Chip-YhQI5B9P.js";
import { t as o } from "./EmptyState-JzzL2z1E.js";
import { n as s, o as c, s as l, t as u } from "./ChannelHeader-C0n2KYEb.js";
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
var R = /* @__PURE__ */ new Set([
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
]), z = /^(https?:|mailto:)/i;
function B(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || z.test(t) ? t : null;
}
function ee(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => ee(e, `${t}-${n}`));
	if (!R.has(n.tagName)) return /* @__PURE__ */ E("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ E("br", {}, t);
		case "A": {
			let e = B(n.getAttribute("href"));
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
var V = /```([\s\S]*?)```|`([^`\n]+)`/g;
function H(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (V.lastIndex = 0; (r = V.exec(e)) !== null;) {
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
function U({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = S(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ee(e, `n${t}`));
	}, [t]), o = S(() => H(n ?? ""), [n]);
	return /* @__PURE__ */ E("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function W({ documentId: t, title: n, icon: i, createdBy: a, editors: o = [], onOpen: s, className: c, "data-testid": l = "document-activity-card" }) {
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
					children: u ? `${te(o)} editing now` : a ? `Created by ${a}` : "Document"
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
function te(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ne({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
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
function re(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function ie(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function ae(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function oe({ callId: t, startedBy: n, participants: i = [], live: a = !1, durationMs: o, audioOnly: s, recorded: c, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !a && typeof o == "number" ? re(o) : "", h = s === void 0 ? "Call" : s ? "Audio call" : "Video call", g = a ? ie(i, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
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
						children: ae(l, u)
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
var se = {
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
function ce(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function G(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function K(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function le({ participants: t, total: n, testId: r }) {
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
function ue({ recordingId: n, title: a = "Recording", recordedBy: o, participants: s = [], participantCount: c, startedAt: l, durationMs: u, thumbnailUrl: d, stage: f = "ready", transcriptReady: p = !1, summaryReady: h = !1, expiresAt: g, pinned: _ = !1, onOpen: v, onCopyLink: y, onShare: b, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: O, "data-testid": k = "recording-activity-card" }) {
	let A = c ?? s.length, j = f === "gone", M = f !== "saving" && f !== "failed" && !j && !!v, N = () => {
		v?.(n);
	}, P = u != null && u > 0 ? re(u) : "", F = ce(l), I = K(s, A), { state: L, label: R } = se[f], z = [
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
	], B = z.length ? [{
		items: z,
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
				"aria-label": M ? `Play ${a.toLowerCase()}` : `${a}: ${R.toLowerCase()}`,
				"data-testid": `${k}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", M ? "cursor-pointer" : "cursor-default"),
				children: [
					d ? /* @__PURE__ */ E("img", {
						src: d,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${k}-thumbnail`
					}) : /* @__PURE__ */ E(le, {
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
									label: R,
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
				}), B.length > 0 && /* @__PURE__ */ E(i, {
					trigger: /* @__PURE__ */ E("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: B,
					"data-testid": `${k}-menu`
				})]
			})]
		}), g && f !== "failed" && !j && /* @__PURE__ */ D("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${k}-expiry`,
			children: [/* @__PURE__ */ D("span", { children: ["Set to expire ", G(g)] }), w && /* @__PURE__ */ E(t, {
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
//#region src/components/social/AgentRunCard.tsx
var de = [
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
], fe = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, pe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, q = 6;
function J(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function me(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function he(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${J(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${J(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${J(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${me(e.index)}`;
		case "deleteBlock": return `Removed block ${me(e.index)}`;
		case "appendMacro": return t ? `Added a ${J(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${me(e.index)}`;
		case "setDocumentType": return `Type: ${J(t, 40)}`;
		case "skip": return t ? J(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${J(t)}` : e.op;
	}
}
function ge(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function _e(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function ve(e) {
	if (!e?.startedAt) return null;
	let t = ge(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? _e(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var ye = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function be({ runId: r, instruction: i, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = l?.phase ?? "received", [S, C] = w(v), T = x === "completed" ? l?.suggestion ?? h : void 0, O = x === "completed" ? l?.review : void 0, k = !!T && !O, A = x === "completed" && l?.noop === !0, j = x === "completed" ? l?.result ?? f : void 0, M = j?.kind === "link" && j.label ? j.label : "Open", N = u && !(j?.kind === "document" && p), P = fe[x], F = x === "failed" || x === "rejected", I = F ? "danger" : O ? O.decision === "accept" ? "success" : "neutral" : A ? "warning" : x === "completed" ? T ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", L = O ? "Reviewed" : k ? "Suggested" : A ? "No change" : pe[x], R = O ? O.byName ?? O.by : void 0, z = O ? `${O.decision === "accept" ? "Accepted" : "Rejected"} by ${R}` : void 0, B = x === "awaiting_approval", ee = x === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : B ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : z ?? l?.detail ?? (k && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : L), V = l?.details, H = V?.ops ?? [], U = V?.steps ?? [], W = V?.document?.title || _ || "Document", te = !!V?.document || !!u, ne = V?.error ?? (x === "failed" ? l?.detail : void 0), re = ve(V), ie = `${b}-details-${r}`;
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
						"aria-controls": S ? ie : void 0,
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
						children: de.map((t, n) => {
							let r = F ? n < P : n < P || n === P && x === "completed", i = n === P && x !== "completed" && !F, a = F && n === P;
							return /* @__PURE__ */ D("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ E("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? A && n === P ? "bg-warning" : "bg-success" : i ? B ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
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
						children: ee
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
					B && m && /* @__PURE__ */ D("span", {
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
				id: ie,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					te && /* @__PURE__ */ D("div", {
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
									children: W
								}), V?.document?.snippet && /* @__PURE__ */ E("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: V.document.snippet
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
					H.length > 0 && /* @__PURE__ */ D("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ E("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ E("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: H.slice(0, q).map((e, t) => /* @__PURE__ */ E("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: he(e)
								}, t))
							}),
							H.length > q && /* @__PURE__ */ D("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									H.length - q,
									" more"
								]
							})
						]
					}),
					U.length > 0 && /* @__PURE__ */ E("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: U.map((t) => /* @__PURE__ */ D("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ E("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ye[t.status] ?? ye.pending)
							}), /* @__PURE__ */ E("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ne && /* @__PURE__ */ E("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: ne
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
							re && /* @__PURE__ */ E("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${b}-details-timings`,
								children: re
							})
						]
					})
				]
			})
		]
	});
}
function xe(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = Se(e.result);
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
function Se(e) {
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
function Ce(e, t) {
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
function we(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Te({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = S(() => Ce(t, n), [t, n]);
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
			title: we(t),
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
var Y = [
	"👍",
	"🎉",
	"❤️"
], Ee = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function De({ quickReactions: t = Y, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ E("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Ee}`,
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
function Oe(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function ke(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Ae({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ D("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ E("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ E("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: ke(t.timestamp)
		})]
	}), /* @__PURE__ */ E("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Oe(t.text)
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
function X(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function je({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = X(t), o = n ?? t.preview;
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
			children: [/* @__PURE__ */ E(Pe, {}), /* @__PURE__ */ D("span", {
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
function Me(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ne({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
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
			}) : /* @__PURE__ */ E(Pe, {}),
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
function Pe() {
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
function Fe({ timestamp: t, now: n, tone: r = "light", className: i }) {
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
function Ie(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Le(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Re(e) {
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
function ze(e) {
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
var Be = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Ve(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Be[e] ?? e)
	};
}
function He(e) {
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
function Ue(e) {
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
function We(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Ge(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(We(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Z({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: c = [], emptyState: u, composer: p, currentUserId: m, reactionsFor: y, onToggleReaction: S, onReply: O, onTogglePin: k, pinnedMessageIds: A, onJumpToMessage: j, highlightedMessageId: N, documentEditors: P, callParticipants: F, agentRunStatus: I, onOpenRun: R, onOpenResult: z, onDecideRun: B, onReviewRun: ee, onJoinCall: V, onOpenRecording: H, onCopyRecordingLink: te, onShareRecording: re, onDownloadRecording: ie, onOpenRecordingTranscript: ae, onManageRecordingExpiry: se, recordingStatus: ce, onOpenDocument: G, tone: K = "light", showHeader: le, fill: de, onLoadMore: fe, hasMore: pe, loadingMore: q = !1, onSendFiles: J, transfers: me = [], currentActor: he, onCancelTransfer: ge, attachmentSrc: _e, onOpenAttachment: ve, acceptFiles: ye, maxFileSize: Se, onFileError: Ce, emojis: we = v }) {
	let Y = K === "dark", Ee = d(), Oe = le ?? !(Ee?.hasHeader ?? !1), ke = de ?? Ee?.fillsHeight ?? !1, [X, Pe] = w(""), Be = C(null), Z = C(null), qe = !!fe && pe !== !1, Je = C(null), Q = C(null), [Ye, Xe] = w(!1), Ze = !!J && !a, Qe = Ge(n, r), [$e, et] = w(0), [tt, nt] = w(!1), $ = C(!0), rt = C(n.length), it = n.length + r.length + me.length, at = C(null), [ot, st] = w(""), ct = C(null), lt = C(!1), ut = C(0);
	x(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!lt.current) {
			lt.current = !0, ct.current = t;
			return;
		}
		if (t === ct.current || (ct.current = t, m && e.userId === m)) return;
		ut.current += 1;
		let r = ut.current % 2 == 0 ? "​" : "";
		st(Le(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, m]);
	function dt() {
		let e = Be.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, et(0));
	}
	function ft() {
		let e = Be.current;
		if (!e) return;
		let t = Ie(e);
		$.current = t, t && et(0), nt(e.scrollTop > 8);
	}
	x(() => {
		let e = Be.current, t = rt.current, n = it - t;
		if (rt.current = it, !e) return;
		let r = at.current;
		if (r && n > 0) {
			at.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, et(0), nt(e.scrollTop > 8)) : n > 0 && et((e) => e + n);
	}, [it]);
	function pt() {
		let e = Be.current;
		e && (at.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), fe?.();
	}
	x(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function mt() {
		let e = X.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), $.current = !0, i(e), Pe(""));
	}
	function ht(e) {
		!Ze || e.length === 0 || ($.current = !0, J?.(e));
	}
	function gt(e) {
		if (!Ze) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), ht(t));
	}
	function _t(e) {
		Pe((t) => t + e), Xe(!1);
	}
	function vt() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function yt(e) {
		vt(), e.key === "Enter" && !a && X.trim() && mt();
	}
	let bt = /* @__PURE__ */ D("div", {
		"data-testid": "chat-panel",
		className: e(ke ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Y ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Oe && /* @__PURE__ */ D("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Y ? "text-white/90" : "text-text-primary"),
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
				children: ot
			}),
			/* @__PURE__ */ D("div", {
				className: e("relative flex flex-col mb-2", ke ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ E("div", {
					ref: Be,
					onScroll: ft,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", tt && "fade-top", ke ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ D("div", {
						className: "mt-auto",
						children: [
							qe && n.length > 0 && /* @__PURE__ */ E("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ E("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: pt,
									disabled: q,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Y ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: q ? "Loading…" : "Load earlier messages"
								})
							}),
							Qe.length === 0 ? u ?? /* @__PURE__ */ E("div", {
								className: e("text-sm", Y ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : Qe.map((n, r) => {
								let i = We(Qe[r - 1]), a = n.kind === "message" ? n.message.timestamp : n.local.timestamp, o = M(a, i) ? /* @__PURE__ */ E(Fe, {
									timestamp: a,
									tone: K
								}, `day:${a}:${r}`) : null;
								if (n.kind === "local") {
									let r = n.local, i = xe(r.metadata);
									return /* @__PURE__ */ D(b, { children: [o, /* @__PURE__ */ E("div", {
										"data-testid": "chat-local-message",
										"data-local-message-id": r.id,
										className: "rounded-md",
										children: /* @__PURE__ */ E(L, {
											author: r.displayName,
											timestamp: r.timestamp,
											tone: K,
											mine: !0,
											content: /* @__PURE__ */ D(T, { children: [
												i ? /* @__PURE__ */ E(be, {
													runId: i.runId,
													instruction: i.instruction || r.content,
													command: i.command,
													agentName: i.agentName,
													requestedBy: r.displayName,
													status: I?.(i.runId),
													onOpenDocument: G && i.documentId ? () => G(i.documentId) : void 0,
													documentTitle: i.documentTitle,
													onOpenRun: R,
													result: i.result,
													onOpenResult: z,
													onDecide: B,
													suggestion: i.suggestionKey ? {
														key: i.suggestionKey,
														...i.documentId ? { documentId: i.documentId } : {}
													} : void 0,
													onReview: ee
												}) : /* @__PURE__ */ E(U, { text: r.content }),
												/* @__PURE__ */ E("div", {
													"data-testid": "chat-local-message-note",
													className: e("mt-1 text-[11px] italic", Y ? "text-white/50" : "text-text-tertiary"),
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
								let { message: s } = n, c = s.displayName ?? s.clientId.slice(0, 8), l = s.attachments ?? [], u = s.metadata?.html, d = typeof u == "string" ? u : void 0, f = /* @__PURE__ */ E(U, {
									html: d,
									text: s.content
								}), p = Re(s.metadata), h = xe(s.metadata), g = He(s.metadata), _ = Ue(s.metadata), v = Ve(s.metadata), x = ze(s.metadata), C = h ? /* @__PURE__ */ E(be, {
									runId: h.runId,
									instruction: h.instruction || s.content.replace(/^\/doc\s*/i, ""),
									command: h.command,
									agentName: h.agentName,
									requestedBy: s.displayName,
									status: I?.(h.runId),
									onOpenDocument: G && h.documentId ? () => G(h.documentId) : void 0,
									documentTitle: h.documentTitle,
									onOpenRun: R,
									result: h.result,
									onOpenResult: z,
									onDecide: B,
									suggestion: h.suggestionKey ? {
										key: h.suggestionKey,
										...h.documentId ? { documentId: h.documentId } : {}
									} : void 0,
									onReview: ee
								}) : _ ? (() => {
									let e = ce?.(_.recordingId), t = {
										..._,
										...e ?? {}
									};
									return /* @__PURE__ */ E(ue, {
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
										onOpen: H,
										onCopyLink: te,
										onShare: re,
										onDownload: ie,
										onOpenTranscript: ae,
										onManageExpiry: se,
										onTogglePin: k ? () => k(s) : void 0
									});
								})() : g ? /* @__PURE__ */ E(oe, {
									callId: g.callId,
									startedBy: (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									participants: F?.(g.callId) ?? g.participants,
									live: g.live,
									durationMs: g.durationMs,
									audioOnly: g.audioOnly,
									recorded: g.recorded,
									notRecordedReason: g.notRecordedReason,
									lobbyName: g.lobbyName,
									onJoin: V
								}) : p ? /* @__PURE__ */ E(W, {
									documentId: p.documentId,
									title: p.title || s.content,
									icon: p.icon,
									createdBy: p.createdBy ?? (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									editors: P?.(p.documentId) ?? [],
									onOpen: G
								}) : l.length === 0 ? f : /* @__PURE__ */ D(T, { children: [(s.content || d) && f, l.map((e) => /* @__PURE__ */ E(je, {
									attachment: e,
									src: _e?.(e),
									onOpen: ve
								}, e.id))] }), w = s.id ?? "", le = w && y ? y(w) : [], de = s.metadata?.replyTo, fe = !!w && !!A?.has(w), pe = !!m && s.userId === m, q = s.metadata?.system === !0, J = /* @__PURE__ */ D(T, { children: [
									de && /* @__PURE__ */ E(Ae, {
										quote: de,
										onJump: j,
										className: "mb-1"
									}),
									fe && /* @__PURE__ */ E("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									C,
									x.length > 0 && /* @__PURE__ */ E("div", {
										className: "mt-1 flex flex-wrap gap-1",
										"data-testid": "chat-message-docrefs",
										children: x.map((e) => /* @__PURE__ */ E(ne, {
											documentId: e.id,
											label: e.label,
											icon: e.icon,
											onOpen: G
										}, e.id))
									}),
									v && /* @__PURE__ */ D("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											v.labels.length > 0 ? `Too large to send: ${v.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									le.length > 0 && m && S && /* @__PURE__ */ E(Te, {
										reactions: le,
										currentUserId: m,
										onToggle: (e) => S(w, e)
									})
								] });
								return /* @__PURE__ */ D(b, { children: [o, /* @__PURE__ */ D("div", {
									"data-testid": "chat-message",
									"data-message-id": w || void 0,
									className: e("group relative rounded-md transition-colors hover:bg-surface-hover", w && w === N && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ E(L, {
										author: c,
										content: J,
										timestamp: s.timestamp,
										avatarUrl: s.avatarUrl,
										tone: K,
										mine: pe
									}), w && (S || !q && (O || k)) && /* @__PURE__ */ E(De, {
										className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
										onReact: S ? (e) => S(w, e) : void 0,
										onReply: O && !q ? () => O(s) : void 0,
										onTogglePin: k && !q ? () => k(s) : void 0,
										pinned: !!s.id && !!A?.has(s.id)
									})]
								})] }, s.id ?? r);
							}),
							me.map((e) => /* @__PURE__ */ E(L, {
								author: e.actor,
								timestamp: "",
								tone: K,
								content: /* @__PURE__ */ E(Ne, {
									transfer: e,
									mine: Me(e, m, he),
									onCancel: ge
								})
							}, e.transferId))
						]
					})
				}), $e > 0 && /* @__PURE__ */ D("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: dt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Y ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						$e,
						" new message",
						$e === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ E(s, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", Y ? "text-white/50" : "text-text-secondary")
			}),
			p ? /* @__PURE__ */ E("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? vt : void 0,
				children: p
			}) : /* @__PURE__ */ D("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					J && /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Ze,
						onClick: () => Je.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Y ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ E(Ke, {})
					}), /* @__PURE__ */ E(h, {
						ref: Je,
						multiple: !0,
						accept: ye,
						onFiles: (e) => {
							let t = Se ? e.filter((e) => e.size > Se) : [];
							t.length > 0 && Ce?.(`Skipped ${t.length} file(s) over the size limit.`), ht(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ E("button", {
						ref: Q,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Ye,
						title: "Insert emoji",
						disabled: a,
						onClick: () => Xe((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Y ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ E("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ E(g, {
						open: Ye,
						onSelect: _t,
						onClose: () => Xe(!1),
						triggerRef: Q,
						emojis: we
					}),
					/* @__PURE__ */ E(f, {
						size: "sm",
						value: X,
						onChange: (e) => Pe(e.target.value),
						onKeyDown: yt,
						onPaste: gt,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Y && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ E(t, {
						variant: "primary",
						size: "sm",
						onClick: mt,
						disabled: a || !X.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return J ? /* @__PURE__ */ E(_, {
		onFiles: ht,
		accept: ye,
		maxSize: Se,
		onError: Ce,
		disabled: a,
		className: ke ? "flex h-full min-h-0 flex-col" : void 0,
		children: bt
	}) : bt;
}
function Ke() {
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
function qe(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Je({ users: e, currentClientId: t }) {
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
			let n = k(qe(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = A(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
function Ye(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Xe({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ E("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ E("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Ze({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ E(Xe, {
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
				Ye(e.pinnedAt)
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
function Qe({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ E(Xe, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ E(o, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = X(e.attachment);
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
					Ye(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function $e({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ E(Xe, {
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
				Ye(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function et(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function tt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function nt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ E(Xe, {
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
				title: [Ye(e.startedAt), et(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : tt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function $({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
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
					Ye(e.updatedAt),
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
var rt = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], it = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function at({ name: t, description: r, online: i, avatarUrl: a, features: o = rt, children: s, canvas: l, files: d = [], thumbnailSrc: f, documents: p = [], onOpenDocument: m, onCreateDocument: h, pins: g = [], onUnpin: _, mentions: v = [], onOpenMention: y, recordings: b = [], onOpenRecording: x, onJumpToMessage: S, onStartCall: C, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: M, callInProgress: N = !1, headerActions: P, view: F, onViewChange: I, className: L, "data-testid": R = "conversation-surface" }) {
	let z = new Set(o), [B, ee] = w("chat"), V = F ?? B, H = z.has(V) ? V : o[0] ?? "chat", U = (e) => {
		F === void 0 && ee(e), I?.(e);
	}, W = (e) => e || void 0, te = o.filter((e) => it[e]).map((e) => ({
		id: e,
		label: it[e],
		badge: e === "files" ? W(d.length) : e === "documents" ? W(p.length) : e === "pins" ? W(g.length) : e === "calls" ? W(b.length) : e === "mentions" ? W(v.filter((e) => e.unread).length) : void 0
	})), ne = (e) => {
		U("chat"), S?.(e);
	};
	return /* @__PURE__ */ D("section", {
		className: e("flex min-w-0 flex-col", L),
		"data-testid": R,
		children: [
			/* @__PURE__ */ E(u, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${R}-header`,
				tabs: te.length > 1 ? /* @__PURE__ */ E(c, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: H,
					onValueChange: (e) => U(e),
					items: te
				}) : void 0,
				actions: C || k || P ? /* @__PURE__ */ D(T, { children: [
					C && (O ? /* @__PURE__ */ E(n, {
						"aria-label": N ? "Join the call" : "Start a call",
						title: N ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => C(!1),
						children: "📞"
					}) : /* @__PURE__ */ D(T, { children: [/* @__PURE__ */ E(n, {
						"aria-label": N ? "Join the call with audio" : "Start an audio call",
						title: N ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => C(!0),
						children: "📞"
					}), /* @__PURE__ */ E(n, {
						"aria-label": N ? "Join the call with video" : "Start a video call",
						title: N ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => C(!1),
						children: "🎥"
					})] })),
					k && /* @__PURE__ */ E(ot, {
						testId: `${R}-watch`,
						label: A,
						hint: j,
						viewerCount: M,
						onClick: k
					}),
					P
				] }) : void 0
			}),
			z.has("files") && H === "files" && /* @__PURE__ */ E(Qe, {
				className: "min-h-0 flex-1",
				files: d,
				thumbnailSrc: f,
				onJump: S ? ne : void 0
			}),
			z.has("documents") && H === "documents" && /* @__PURE__ */ E($, {
				className: "min-h-0 flex-1",
				documents: p,
				onOpen: m,
				onCreate: h
			}),
			z.has("pins") && H === "pins" && /* @__PURE__ */ E(Ze, {
				className: "min-h-0 flex-1",
				pins: g,
				onUnpin: _,
				onJump: S ? ne : void 0
			}),
			z.has("mentions") && H === "mentions" && /* @__PURE__ */ E($e, {
				className: "min-h-0 flex-1",
				mentions: v,
				onJump: y ? (e, t) => {
					U("chat"), y(e, t);
				} : void 0
			}),
			z.has("calls") && H === "calls" && /* @__PURE__ */ E(nt, {
				className: "min-h-0 flex-1",
				recordings: b,
				onOpen: x
			}),
			z.has("chat") && /* @__PURE__ */ D("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: H !== "chat",
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
function ot({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ D(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? st,
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
var st = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { ve as A, L as B, Te as C, be as D, ye as E, ie as F, F as G, j as H, re as I, A as J, M as K, ne as L, ue as M, K as N, xe as O, oe as P, W as R, De as S, Ce as T, N as U, I as V, P as W, je as _, $e as a, Ae as b, et as c, He as d, Re as f, Fe as g, Ve as h, Qe as i, he as j, Se as k, Je as l, Ue as m, at as n, nt as o, ze as p, k as q, $ as r, Ze as s, rt as t, Z as u, Ne as v, we as w, Oe as x, X as y, U as z };
