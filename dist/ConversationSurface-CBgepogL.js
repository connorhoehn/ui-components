import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, p as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./Chip-4IBrlduZ.js";
import { t as i } from "./IconButton-DDeXW3mZ.js";
import { B as a, E as o, M as s, S as c, U as l, W as u, at as d, b as f, et as p, f as m, ht as h, i as g, pt as _, ut as v, v as y } from "./Icons-BSEVGRI6.js";
import { t as b } from "./ConfirmDialog-CSS_SMC6.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./EmptyState-zKbpAhFD.js";
import { a as C, n as w, t as T } from "./ChannelHeader-qvaO7oMR.js";
import { n as E } from "./Tabs-CWj6ZL7J.js";
import { n as D } from "./DockedPanelContext-pH9A5z1h.js";
import { t as O } from "./Textarea-Dz4doxTv.js";
import { t as k } from "./Avatar-DeJWic2B.js";
import { t as A } from "./RovingToolbar-CmQag9q6.js";
import { t as j } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as ee } from "./DropdownMenu-CHrQvZgc.js";
import { t as M } from "./StatusPill-C-aN2Pzz.js";
import { i as N, n as P, r as F, t as I } from "./ReactionPickerPopover-DkcC4xmE.js";
import { g as te } from "./MediaIcons-_ai5Til2.js";
import { t as L } from "./formatBytes-05ivRSJY.js";
import { Fragment as R, useEffect as z, useMemo as B, useRef as V, useState as H } from "react";
import { Fragment as U, jsx as W, jsxs as G } from "react/jsx-runtime";
//#region src/utils/identity.ts
var ne = [
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
function K(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return ne[Math.abs(t) % ne.length];
}
function re(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function q(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function ie(e, t) {
	let n = q(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = q(t);
	return r ? n !== r : !1;
}
function ae(e, t = /* @__PURE__ */ new Date()) {
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
function oe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function J(e) {
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
function se(e, t = /* @__PURE__ */ new Date()) {
	let n = new Date(e);
	if (Number.isNaN(n.getTime())) return "";
	let r = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime(), i = Math.round((r(t) - r(n)) / 864e5);
	if (i === 0) return `${n.getHours().toString().padStart(2, "0")}:${n.getMinutes().toString().padStart(2, "0")}`;
	if (i === 1) return "Yesterday";
	if (i > 1 && i < 7) return n.toLocaleDateString(void 0, { weekday: "short" });
	let a = n.getFullYear() === t.getFullYear();
	return n.toLocaleDateString(void 0, {
		day: "numeric",
		month: "numeric",
		...a ? {} : { year: "2-digit" }
	});
}
//#endregion
//#region src/components/social/MessageRow.tsx
function ce(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function le({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, contentLayout: d = "inline", className: f }) {
	let p = l === "dark", m = ce(r), h = !o || !!m;
	return /* @__PURE__ */ G("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", f),
		children: [/* @__PURE__ */ W("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ W(k, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ G("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				h && /* @__PURE__ */ G("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ W("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", p ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						m && /* @__PURE__ */ W("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: J(r),
							className: e("text-xs shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: m
						}),
						u && /* @__PURE__ */ W("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${J(u)}`,
							className: e("text-[11px] shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ W("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", p ? "text-white/90" : "text-text-primary", s && d === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && d === "inline" && (p ? "bg-white/15" : "bg-primary-bg"), s && d === "block" && "w-full max-w-[36rem]"),
					children: n
				}),
				c && /* @__PURE__ */ W("div", {
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
var ue = /* @__PURE__ */ new Set([
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
]), de = /^(https?:|mailto:)/i;
function fe(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || de.test(t) ? t : null;
}
function pe(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => pe(e, `${t}-${n}`));
	if (!ue.has(n.tagName)) return /* @__PURE__ */ W("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ W("br", {}, t);
		case "A": {
			let e = fe(n.getAttribute("href"));
			return e ? /* @__PURE__ */ W("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ W("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ W("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ W(e, { children: r }, t);
		}
	}
}
var me = /```([\s\S]*?)```|`([^`\n]+)`/g;
function he(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (me.lastIndex = 0; (r = me.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ W("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ W("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ W("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ge({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = B(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => pe(e, `n${t}`));
	}, [t]), o = B(() => he(n ?? ""), [n]);
	return /* @__PURE__ */ W("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function _e({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ G("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ W("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ W(y, { size: 18 })
			}),
			/* @__PURE__ */ G("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ W("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ W("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${ve(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ W("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ W(j, {
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
			o && /* @__PURE__ */ W("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function ve(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ye({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ G("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [r ? /* @__PURE__ */ W("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ W(y, {
			size: 12,
			className: "shrink-0 text-text-tertiary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ W("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function Y(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function be(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function xe(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Se({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? Y(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? be(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
	return /* @__PURE__ */ G("div", {
		"data-testid": f,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ W("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ G("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ W("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${m} in progress` : m
					}),
					/* @__PURE__ */ W("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: h
					}),
					!i && s === !1 && /* @__PURE__ */ W("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${f}-not-recorded`,
						children: xe(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ W("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ W(j, {
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
			i && u && /* @__PURE__ */ W("button", {
				type: "button",
				"data-testid": `${f}-join`,
				onClick: () => u(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-on-primary hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
var Ce = {
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
function we(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Te(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Ee(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function De({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ G("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ W("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ W(k, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ G("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ W("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ W("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ W("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Oe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: d = "ready", transcriptReady: f = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: w, "data-testid": T = "recording-activity-card" }) {
	let E = o ?? a.length, D = d === "gone", O = d !== "saving" && d !== "failed" && !D && !!g, k = () => {
		g?.(n);
	}, A = c != null && c > 0 ? Y(c) : "", N = we(s), P = Ee(a, E), { state: F, label: I } = Ce[d], te = [
		...g && O ? [{
			"data-testid": `${T}-menu-open`,
			label: "Open",
			onSelect: k
		}] : [],
		...x && f ? [{
			"data-testid": `${T}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		..._ && !D ? [{
			"data-testid": `${T}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !D ? [{
			"data-testid": `${T}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...y && !D ? [{
			"data-testid": `${T}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && O ? [{
			"data-testid": `${T}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], L = te.length ? [{
		items: te,
		"data-testid": `${T}-menu-items`
	}] : [];
	return /* @__PURE__ */ G("div", {
		"data-testid": T,
		"data-recording-id": n,
		"data-stage": d,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", w),
		children: [/* @__PURE__ */ G("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ G("button", {
				type: "button",
				onClick: O ? k : void 0,
				disabled: !O,
				"aria-label": O ? `Play ${r.toLowerCase()}` : `${r}: ${I.toLowerCase()}`,
				"data-testid": `${T}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", O ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ W("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${T}-thumbnail`
					}) : /* @__PURE__ */ W(De, {
						participants: a,
						total: E,
						testId: T
					}),
					O && /* @__PURE__ */ W("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ W("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ W("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ W("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					A && /* @__PURE__ */ W("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${T}-duration`,
						children: A
					})
				]
			}), /* @__PURE__ */ G("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ G("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ G("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ W("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${T}-title`,
								children: r
							}), h && /* @__PURE__ */ W("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${T}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ W(u, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ G("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${T}-by`,
							children: ["by ", i]
						}),
						E > 0 && /* @__PURE__ */ G("div", {
							className: "flex items-center gap-2",
							"data-testid": `${T}-people`,
							children: [/* @__PURE__ */ W(j, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: C
							}), /* @__PURE__ */ W("span", {
								className: "truncate text-xs text-text-tertiary",
								children: P
							})]
						}),
						/* @__PURE__ */ G("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ W(M, {
									state: F,
									label: I,
									size: "sm",
									"data-testid": `${T}-stage`
								}),
								d === "ready" && f && /* @__PURE__ */ W(M, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${T}-transcript`
								}),
								d === "ready" && p && /* @__PURE__ */ W(M, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${T}-summary`
								}),
								N && /* @__PURE__ */ W("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${T}-when`,
									children: N
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ W(ee, {
					trigger: /* @__PURE__ */ W("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: L,
					"data-testid": `${T}-menu`
				})]
			})]
		}), m && d !== "failed" && !D && /* @__PURE__ */ G("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${T}-expiry`,
			children: [/* @__PURE__ */ G("span", { children: ["Set to expire ", Te(m)] }), S && /* @__PURE__ */ W(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => S(n),
				"data-testid": `${T}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function ke(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function X(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Z(e, t) {
	let n = e.names && e.names.length > 0 ? ke(e.names) : e.userIds.length > 0 ? ke(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = X(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ae({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Z(t, n);
	return /* @__PURE__ */ G("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ W("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ W("time", {
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
var je = [
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
], Me = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Ne = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Pe = 6, Fe = "shrink-0 whitespace-nowrap underline underline-offset-2", Ie = `${Fe} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Q(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Le(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Re(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Q(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Q(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Q(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Le(e.index)}`;
		case "deleteBlock": return `Removed block ${Le(e.index)}`;
		case "appendMacro": return t ? `Added a ${Q(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Le(e.index)}`;
		case "setDocumentType": return `Type: ${Q(t, 40)}`;
		case "skip": return t ? Q(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Q(t)}` : e.op;
	}
}
function ze(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Be(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function Ve(e) {
	if (!e?.startedAt) return null;
	let t = ze(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Be(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var $ = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function He({ runId: n, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: h, suggestion: g, onReview: _, documentTitle: v, defaultExpanded: b = !1, className: x, "data-testid": S = "agent-run-card" }) {
	let C = l?.phase ?? "received", [w, T] = H(b), E = C === "completed" ? l?.suggestion ?? g : void 0, D = C === "completed" ? l?.review : void 0, O = !!E && !D, k = C === "completed" && l?.noop === !0, A = C === "completed" ? l?.result ?? f : void 0, j = A?.kind === "link" && A.label ? A.label : "Open", ee = u && !(A?.kind === "document" && p), M = Me[C], N = C === "failed" || C === "rejected", P = N ? "danger" : D ? D.decision === "accept" ? "success" : "neutral" : k ? "warning" : C === "completed" ? E ? "warning" : "success" : C === "awaiting_approval" ? "warning" : "info", F = D ? "Reviewed" : O ? "Suggested" : k ? "No change" : Ne[C], I = D ? D.byName ?? D.by : void 0, L = D ? `${D.decision === "accept" ? "Accepted" : "Rejected"} by ${I}` : void 0, R = C === "awaiting_approval", z = C === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : R ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : L ?? l?.detail ?? (O && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : C === "received" ? "Received" : F), B = l?.details, V = B?.ops ?? [], U = B?.steps ?? [], ne = B?.document?.title || v || "Document", K = !!B?.document || !!u, re = B?.error ?? (C === "failed" ? l?.detail : void 0), q = Ve(B), ie = `${S}-details-${n}`, ae = !!(O && E && _ || R && h || A && p || A?.kind === "link" && !p);
	return /* @__PURE__ */ G("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", x),
		"data-testid": S,
		"data-phase": C,
		"data-run-id": n,
		"data-expanded": w ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || T((e) => !e);
		},
		children: [
			/* @__PURE__ */ G("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ W(te, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ G("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${S}-instruction`,
						children: [
							/* @__PURE__ */ W("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							a
						]
					}),
					/* @__PURE__ */ W(r, {
						size: "xs",
						tone: P,
						"data-testid": `${S}-phase`,
						children: F
					}),
					/* @__PURE__ */ W(i, {
						size: "sm",
						"aria-label": w ? "Hide details" : "Show details",
						"aria-expanded": w,
						"aria-controls": w ? ie : void 0,
						onClick: () => T((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${S}-toggle`,
						icon: /* @__PURE__ */ W(m, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", w && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ G("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ G("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", ae && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ W("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${S}-steps`,
							children: je.map((t, n) => {
								let r = N ? n < M : n < M || n === M && C === "completed", i = n === M && C !== "completed" && !N, a = N && n === M;
								return /* @__PURE__ */ G("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ W("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? k && n === M ? "bg-warning" : "bg-success" : i ? R ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ W("span", {
										className: "sr-only",
										children: a ? F : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ W("span", {
							className: e("min-w-0 flex-1 truncate", D && (D.decision === "accept" ? "text-success" : "text-text-tertiary"), C === "failed" && "text-danger", k && "text-warning-fg"),
							"data-testid": `${S}-detail`,
							"data-review": D?.decision,
							title: l?.detail,
							children: z
						})]
					}),
					O && E && _ && /* @__PURE__ */ G("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-review`,
						children: [/* @__PURE__ */ W(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "accept", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${S}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ W(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "reject", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${S}-reject-review`,
							children: "Reject"
						})]
					}),
					R && h && /* @__PURE__ */ G("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-decide`,
						children: [/* @__PURE__ */ W(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(n, "approve"),
							"data-testid": `${S}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ W(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(n, "reject"),
							"data-testid": `${S}-reject`,
							children: "Reject"
						})]
					}),
					A && p && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => p(A),
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": A.kind,
						children: j
					}),
					A?.kind === "link" && !p && /* @__PURE__ */ W("a", {
						href: A.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": "link",
						children: j
					}),
					d && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: () => d(n),
						className: Ie,
						"data-testid": `${S}-open-run`,
						children: "Open run"
					}),
					ee && /* @__PURE__ */ W("button", {
						type: "button",
						onClick: u,
						className: Ie,
						"data-testid": `${S}-open-document`,
						children: "Open document"
					})
				]
			}),
			w && /* @__PURE__ */ G("div", {
				id: ie,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${S}-details`,
				children: [
					K && /* @__PURE__ */ G("div", {
						className: "flex items-start gap-2",
						"data-testid": `${S}-details-document`,
						children: [
							/* @__PURE__ */ W(y, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ G("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ W("span", {
									className: "block truncate font-medium text-text-primary",
									children: ne
								}), B?.document?.snippet && /* @__PURE__ */ W("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${S}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							u && /* @__PURE__ */ W(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${S}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ G("div", {
						"data-testid": `${S}-details-ops`,
						children: [
							/* @__PURE__ */ W("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ W("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, Pe).map((e, t) => /* @__PURE__ */ W("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Re(e)
								}, t))
							}),
							V.length > Pe && /* @__PURE__ */ G("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${S}-details-more-ops`,
								children: [
									"+",
									V.length - Pe,
									" more"
								]
							})
						]
					}),
					U.length > 0 && /* @__PURE__ */ W("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${S}-details-steps`,
						children: U.map((t) => /* @__PURE__ */ G("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ W("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", $[t.status] ?? $.pending)
							}), /* @__PURE__ */ W("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					re && /* @__PURE__ */ W("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${S}-details-error`,
						children: re
					}),
					/* @__PURE__ */ G("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ W("button", {
								type: "button",
								onClick: () => d(n),
								className: e(Fe, "hover:text-text-primary"),
								"data-testid": `${S}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							A && p && /* @__PURE__ */ W("button", {
								type: "button",
								onClick: () => p(A),
								className: e(Fe, "font-medium text-info"),
								"data-testid": `${S}-details-open-result`,
								children: j
							}),
							q && /* @__PURE__ */ W("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${S}-details-timings`,
								children: q
							})
						]
					})
				]
			})
		]
	});
}
function Ue(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = We(e.result);
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
function We(e) {
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
function Ge(e, t) {
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
function Ke(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function qe({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = B(() => Ge(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ W("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ G("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Ke(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ W("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ W("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Je = [
	"👍",
	"🎉",
	"❤️"
], Ye = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Xe({ quickReactions: t = Je, onReact: n, onOpenReactionPicker: r, onReply: i, onForward: a, onTogglePin: c, pinned: l = !1, onCopyLink: m, onEdit: h, onDelete: g, className: _, "data-testid": y = "message-actions" }) {
	let b = [], x = (e, t, n, r) => b.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) x(`react-${e}`, `React ${e}`, /* @__PURE__ */ W("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	return r && x("more-reactions", "More reactions", /* @__PURE__ */ W(d, { size: 14 }), (e) => r(e.currentTarget)), i && x("reply", "Reply", /* @__PURE__ */ W(p, { size: 14 }), i), a && x("forward", "Forward to another conversation", /* @__PURE__ */ W(o, { size: 14 }), (e) => a(e.currentTarget)), c && x("pin", l ? "Unpin" : "Pin to channel", /* @__PURE__ */ W(u, { size: 14 }), c), m && x("copy-link", "Copy link to message", /* @__PURE__ */ W(s, { size: 14 }), m), h && x("edit", "Edit message", /* @__PURE__ */ W(f, { size: 13 }), h), g && x("delete", "Delete message", /* @__PURE__ */ W(v, { size: 13 }), g), b.length === 0 ? null : /* @__PURE__ */ W(A, {
		label: "Message actions",
		"data-testid": y,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", _),
		children: b.map((e) => /* @__PURE__ */ W("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${y}-${e.key}`,
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Ye}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ze({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = H(e), [s, c] = H(!1), [l, u] = H(null), d = V(null);
	z(() => {
		let e = d.current;
		e && (e.focus(), e.setSelectionRange(e.value.length, e.value.length));
	}, []);
	let f = a.trim(), p = f.length > 0 && f !== e.trim() && !s, m = async () => {
		if (p) {
			c(!0), u(null);
			try {
				await n(f);
			} catch (e) {
				u(e instanceof Error ? e.message : String(e)), c(!1);
			}
		}
	};
	return /* @__PURE__ */ G("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ W(O, {
				ref: d,
				value: a,
				onChange: (e) => o(e.target.value),
				onKeyDown: (e) => {
					if (e.key === "Escape") {
						e.preventDefault(), r();
						return;
					}
					e.key === "Enter" && !e.shiftKey && (e.preventDefault(), m());
				},
				disabled: s,
				minRows: 1,
				maxRows: 8,
				autoResize: !0,
				"aria-label": "Edit message",
				"data-testid": `${i}-input`
			}),
			/* @__PURE__ */ G("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ W("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ W(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ W(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ W("p", {
				className: "m-0 text-xs text-danger-fg",
				role: "alert",
				"data-testid": `${i}-error`,
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function Qe(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function $e(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function et({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ G("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ W("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ W("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: $e(t.timestamp)
		})]
	}), /* @__PURE__ */ W("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Qe(t.text)
	})] });
	return /* @__PURE__ */ G("div", {
		"data-testid": a,
		"data-quoted-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ W("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ W("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ W("button", {
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
function tt(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function nt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = tt(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ W("button", {
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ W("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ G("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ W(U, { children: o ? /* @__PURE__ */ W("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ W("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ W("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ G("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ W("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ W("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: L(t.size)
			})]
		})]
	}) : /* @__PURE__ */ W("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(at, {}), /* @__PURE__ */ G("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ W("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ W("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: L(t.size)
				})]
			})] })
		})
	});
}
function rt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function it({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : L(o);
	return /* @__PURE__ */ G("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ W("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ W(at, {}),
			/* @__PURE__ */ G("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ G("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ W("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ W("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ W("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ W("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ W("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ W("button", {
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
function at() {
	return /* @__PURE__ */ W("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ W("path", {
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
function ot({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ae(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ G("div", {
		role: "separator",
		"aria-label": oe(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ W("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ W("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ W("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function st(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function ct(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function lt(e) {
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
function ut(e) {
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
var dt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function ft(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => dt[e] ?? e)
	};
}
function pt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function mt(e) {
	return `${pt(e)}:`;
}
function ht(e, t) {
	let n, r;
	try {
		n = new DOMParser().parseFromString(e, "text/html"), r = n.createTreeWalker(n.body, NodeFilter.SHOW_TEXT).nextNode();
	} catch {
		return null;
	}
	let i = r?.textContent ?? "";
	if (!r || !i.startsWith(t)) return null;
	let a = i.slice(t.length);
	if (a.startsWith("\n")) r.textContent = a.slice(1);
	else if (a === "") {
		r.textContent = "";
		let e = r.nextSibling;
		e && e.nodeType === Node.ELEMENT_NODE && e.tagName === "BR" && e.parentNode?.removeChild(e);
	} else return null;
	return (n.body.textContent ?? "").trim() ? n.body.innerHTML : null;
}
function gt(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = mt(t);
	if (n) {
		let t = ht(n, r);
		if (t === null) return {
			body: e,
			html: n,
			stripped: !1
		};
		let i = `${r}\n`;
		return {
			body: e.startsWith(i) ? e.slice(i.length) : e,
			html: t,
			stripped: !0
		};
	}
	let i = `${r}\n`;
	if (!e.startsWith(i)) return {
		body: e,
		stripped: !1
	};
	let a = e.slice(i.length);
	return a.trim() ? {
		body: a,
		stripped: !0
	} : {
		body: e,
		stripped: !1
	};
}
function _t(e) {
	let t = e?.forwardedFrom;
	return !t || typeof t.messageId != "string" || !t.messageId || typeof t.author != "string" || !t.author ? null : {
		messageId: t.messageId,
		channel: typeof t.channel == "string" ? t.channel : "",
		...typeof t.channelLabel == "string" ? { channelLabel: t.channelLabel } : {},
		author: t.author,
		...typeof t.authorUserId == "string" ? { authorUserId: t.authorUserId } : {},
		...typeof t.timestamp == "string" ? { timestamp: t.timestamp } : {}
	};
}
function vt(e) {
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
function yt(e) {
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
function bt(e) {
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
function xt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function St(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(xt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Ct(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function wt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Tt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = Ct(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = Ct(r), i = wt(r);
		e && i && i !== e && t.has(i) && n.set(e, i);
	}
	let r = (e) => {
		let t = e;
		for (let e = 0; e < 64; e += 1) {
			let e = n.get(t);
			if (!e) break;
			t = e;
		}
		return t;
	}, i = [], a = /* @__PURE__ */ new Map();
	for (let t of e) {
		let e = Ct(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = Ct(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Et = 3, Dt = 2, Ot = 3e5;
function kt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function At(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Ue(e.metadata) || yt(e.metadata) || vt(e.metadata) || lt(e.metadata) || bt(e.metadata));
}
function jt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = kt(r);
	if (!i || i !== kt(n) || !At(n) || !At(r) || r.editedAt || ie(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Ot;
}
function Mt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Nt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ G("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ W("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ W("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Pt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Ft(e) {
	return e.displayName || e.userId;
}
function It(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = kt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Lt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: f, reactionsFor: p, onToggleReaction: m, onReply: h, onForwardMessage: g, onCopyLink: _, onTogglePin: v, onEditMessage: y, onDeleteMessage: S, pinnedMessageIds: T, onJumpToMessage: E, highlightedMessageId: O, threaded: A = !1, alignOwnMessages: j = !0, documentEditors: ee, callParticipants: M, agentRunStatus: te, onOpenRun: L, onOpenResult: B, onDecideRun: ne, onReviewRun: K, onJoinCall: re, onOpenRecording: q, onCopyRecordingLink: ae, onShareRecording: oe, onDownloadRecording: se, onOpenRecordingTranscript: ce, onManageRecordingExpiry: ue, recordingStatus: de, onOpenDocument: fe, renderMessageReferences: pe, tone: me = "light", showHeader: he, fill: ve, onLoadMore: Y, hasMore: be, loadingMore: xe = !1, onSendFiles: Ce, transfers: we = [], currentActor: Te, onCancelTransfer: Ee, attachmentSrc: De, onOpenAttachment: ke, acceptFiles: X, maxFileSize: Z, onFileError: je, readReceipts: Me, readReceiptsEnabled: Ne = !0, unreadFrom: Pe, emojis: Fe = I }) {
	let [Ie, Q] = H(null), [Le, Re] = H(null), ze = V(null), [Be, Ve] = H(null), $ = me === "dark", We = D(), Ge = he ?? !(We?.hasHeader ?? !1), Ke = ve ?? We?.fillsHeight ?? !1, [Je, Ye] = H(""), Qe = V(null), $e = V(null), tt = !!Y && be !== !1, at = V(null), dt = V(null), [mt, ht] = H(!1), wt = !!Ce && !a, Ot = St(n, r), kt = A ? Tt(Ot) : null, [At, Lt] = H(() => /* @__PURE__ */ new Set());
	function zt(e) {
		Lt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Bt = V(void 0);
	if (Pe !== void 0) {
		let e = Bt.current;
		if (e === void 0) Bt.current = Pe;
		else {
			let t = Date.parse(Pe), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Bt.current = Pe);
		}
	}
	let Vt = Bt.current, Ht = Vt === void 0 ? -1 : Mt(kt ? kt.map((e) => xt(e.root)) : Ot.map((e) => xt(e)), Vt), Ut = Me !== void 0, Wt = Me ?? [], Gt = Ne && f ? f : void 0, Kt = (() => {
		if (Gt) for (let e = Ot.length - 1; e >= 0; --e) {
			let t = Ot[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Gt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), qt = Kt && Gt ? Pt(Wt, Gt, Kt.timestamp) : [], Jt = qt.length === 1 && !!Gt && It(n, Wt, Gt) === 1;
	function Yt() {
		if (!Kt) return null;
		if (qt.length === 0) return Ut ? /* @__PURE__ */ W("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", j ? "justify-end pr-1" : "justify-start pl-7", $ ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ W("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = qt.map(Ft), n = qt.slice(0, 3);
		return /* @__PURE__ */ G("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", j ? "justify-end pr-1" : "justify-start pl-7", $ ? "text-white/50" : "text-text-tertiary"),
			children: [
				qt.length > 1 && /* @__PURE__ */ W("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ W(k, {
						name: Ft(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ W("span", {
					"data-testid": "chat-read-receipts-label",
					children: Jt ? "Seen" : `Seen by ${qt.length}`
				}),
				/* @__PURE__ */ W("span", {
					style: C,
					children: Jt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Xt, Zt] = H(0), [Qt, $t] = H(!1), en = V(!0), tn = V(n.length), nn = n.length + r.length + we.length, rn = V(null), [an, on] = H(""), sn = V(null), cn = V(!1), ln = V(0);
	z(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!cn.current) {
			cn.current = !0, sn.current = t;
			return;
		}
		if (t === sn.current || (sn.current = t, f && e.userId === f)) return;
		ln.current += 1;
		let r = ln.current % 2 == 0 ? "​" : "";
		on(ct(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function un() {
		let e = Qe.current;
		e && (e.scrollTop = e.scrollHeight, en.current = !0, Zt(0));
	}
	function dn() {
		let e = Qe.current;
		if (!e) return;
		let t = st(e);
		en.current = t, t && Zt(0), $t(e.scrollTop > 8);
	}
	z(() => {
		let e = Qe.current, t = tn.current, n = nn - t;
		if (tn.current = nn, !e) return;
		let r = rn.current;
		if (r && n > 0) {
			rn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		en.current ? (e.scrollTop = e.scrollHeight, Zt(0), $t(e.scrollTop > 8)) : n > 0 && Zt((e) => e + n);
	}, [nn]);
	function fn() {
		let e = Qe.current;
		e && (rn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), Y?.();
	}
	z(() => () => {
		$e.current && clearTimeout($e.current);
	}, []);
	function pn() {
		let e = Je.trim();
		!e || a || ($e.current && clearTimeout($e.current), $e.current = null, o?.(!1), en.current = !0, i(e), Ye(""));
	}
	function mn(e) {
		!wt || e.length === 0 || (en.current = !0, Ce?.(e));
	}
	function hn(e) {
		if (!wt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), mn(t));
	}
	function gn(e) {
		Ye((t) => t + e), ht(!1);
	}
	function _n() {
		a || (o?.(!0), $e.current && clearTimeout($e.current), $e.current = setTimeout(() => o?.(!1), 2e3));
	}
	function vn(e) {
		_n(), e.key === "Enter" && !a && Je.trim() && pn();
	}
	function yn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Ht ? /* @__PURE__ */ W(Nt, { tone: me }) : null, l = !c && jt(a, n), d = !o && ie(s, i) ? /* @__PURE__ */ W(ot, {
			timestamp: s,
			tone: me
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Ue(r.metadata);
			return /* @__PURE__ */ G(R, { children: [
				d,
				c,
				/* @__PURE__ */ W("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ W(le, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: me,
						mine: !0,
						contentLayout: i ? "block" : "inline",
						content: /* @__PURE__ */ G(U, { children: [
							i ? /* @__PURE__ */ W(He, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: te?.(i.runId),
								onOpenDocument: fe && i.documentId ? () => fe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: L,
								result: i.result,
								onOpenResult: B,
								onDecide: ne,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: K
							}) : /* @__PURE__ */ W(ge, { text: r.content }),
							/* @__PURE__ */ W("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", $ ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ W("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ W(t, {
									type: "button",
									size: "sm",
									variant: e.primary ? "primary" : "ghost",
									onClick: e.onSelect,
									children: e.label
								}, e.id))
							})
						] })
					})
				})
			] }, `local:${r.id}`);
		}
		let { message: b } = n, x = b.displayName ?? b.clientId.slice(0, 8), C = b.attachments ?? [], w = b.metadata?.html, D = typeof w == "string" ? w : void 0, k = _t(b.metadata), A = gt(b.content, k, D), N = /* @__PURE__ */ W(ge, {
			html: A.html,
			text: A.body
		}), P = lt(b.metadata), F = Ue(b.metadata), I = vt(b.metadata), z = yt(b.metadata), V = bt(b.metadata), H = ft(b.metadata), he = ut(b.metadata), ve = F ? /* @__PURE__ */ W(He, {
			runId: F.runId,
			instruction: F.instruction || b.content.replace(/^\/doc\s*/i, ""),
			command: F.command,
			agentName: F.agentName,
			requestedBy: b.displayName,
			status: te?.(F.runId),
			onOpenDocument: fe && F.documentId ? () => fe(F.documentId) : void 0,
			documentTitle: F.documentTitle,
			onOpenRun: L,
			result: F.result,
			onOpenResult: B,
			onDecide: ne,
			suggestion: F.suggestionKey ? {
				key: F.suggestionKey,
				...F.documentId ? { documentId: F.documentId } : {}
			} : void 0,
			onReview: K
		}) : z ? (() => {
			let e = de?.(z.recordingId), t = {
				...z,
				...e ?? {}
			};
			return /* @__PURE__ */ W(Oe, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? b.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!b.id && !!T?.has(b.id),
				onOpen: q,
				onCopyLink: ae,
				onShare: oe,
				onDownload: se,
				onOpenTranscript: ce,
				onManageExpiry: ue,
				onTogglePin: v ? () => v(b) : void 0
			});
		})() : I ? /* @__PURE__ */ W(Se, {
			callId: I.callId,
			startedBy: (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			participants: M?.(I.callId) ?? I.participants,
			live: I.live,
			durationMs: I.durationMs,
			audioOnly: I.audioOnly,
			recorded: I.recorded,
			notRecordedReason: I.notRecordedReason,
			lobbyName: I.lobbyName,
			onJoin: re
		}) : P ? /* @__PURE__ */ W(_e, {
			documentId: P.documentId,
			title: P.title || b.content,
			icon: P.icon,
			createdBy: P.createdBy ?? (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			editors: ee?.(P.documentId) ?? [],
			onOpen: fe
		}) : C.length === 0 ? N : /* @__PURE__ */ G(U, { children: [(b.content || D) && N, C.map((e) => /* @__PURE__ */ W(nt, {
			attachment: e,
			src: De?.(e),
			onOpen: ke
		}, e.id))] }), Y = b.id ?? "", be = Y && p ? p(Y) : [], xe = b.metadata?.replyTo, Ce = !!o && !!xe && xe.messageId === o.rootId, we = !!xe && !Ce, Te = !!Y && !!T?.has(Y), Ee = !!f && b.userId === f, X = b.metadata?.system === !0, Z = !!b.deletedAt || b.metadata?.deleted === !0, je = !!(F || z || I || P || V), Me = !!(F || z || I || P || C.length > 0), Ne = Ee && !Z && !X && !je && !!Y, Pe = !!Y && !Z && !X && !je && C.length === 0 && !!b.content.trim(), Fe = Ne && !!y && Ie === Y, Le = /* @__PURE__ */ G(U, { children: [
			we && xe && /* @__PURE__ */ W(et, {
				quote: xe,
				onJump: E,
				className: "mb-1"
			}),
			k && /* @__PURE__ */ G("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [pt(k), k.timestamp ? J(k.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ W("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					A.stripped ? pt(k) : "Forwarded"
				]
			}),
			Te && /* @__PURE__ */ G("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ W(u, { size: 11 }), " Pinned"]
			}),
			Z ? /* @__PURE__ */ W("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Fe ? /* @__PURE__ */ W(Ze, {
				initialText: b.content,
				onSave: async (e) => {
					await y(b, e), Q(null);
				},
				onCancel: () => Q(null)
			}) : ve,
			!Z && pe?.(b),
			!Z && he.length > 0 && /* @__PURE__ */ W("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: he.map((e) => /* @__PURE__ */ W(ye, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: fe
				}, e.id))
			}),
			!Z && H && /* @__PURE__ */ G("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					H.labels.length > 0 ? `Too large to send: ${H.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Z && be.length > 0 && f && m && /* @__PURE__ */ W(qe, {
				reactions: be,
				currentUserId: f,
				onToggle: (e) => m(Y, e)
			})
		] });
		return V ? /* @__PURE__ */ G(R, { children: [
			d,
			c,
			/* @__PURE__ */ W(Ae, {
				membership: V,
				fallbackText: b.content,
				timestamp: b.timestamp,
				"data-testid": "membership-notice"
			})
		] }, b.id ?? r) : /* @__PURE__ */ G(R, { children: [
			d,
			c,
			/* @__PURE__ */ G("div", {
				"data-testid": "chat-message",
				"data-message-id": Y || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? J(b.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", Y && Y === O && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ W(le, {
					author: x,
					content: Le,
					timestamp: l ? "" : b.timestamp,
					editedAt: Z ? void 0 : b.editedAt,
					avatarUrl: b.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: me,
					mine: Ee && j,
					contentLayout: Me ? "block" : "inline"
				}), Y && !Z && !Fe && (m || Ne || Pe && g || !X && (h || v || _)) && /* @__PURE__ */ W(Xe, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: m ? (e) => m(Y, e) : void 0,
					onOpenReactionPicker: m ? (e) => {
						ze.current = e, Re(Y);
					} : void 0,
					onReply: h && !X ? () => h(o?.rootMessage ?? b) : void 0,
					onForward: g && Pe ? (e) => g(b, e) : void 0,
					onCopyLink: _ && !X && Y ? () => _(b) : void 0,
					onTogglePin: v && !X ? () => v(b) : void 0,
					pinned: !!b.id && !!T?.has(b.id),
					onEdit: Ne && y ? () => Q(Y) : void 0,
					onDelete: Ne && S ? () => Ve(Y) : void 0
				})]
			}),
			!!Kt && Y === Kt.id && Yt()
		] }, b.id ?? r);
	}
	function bn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function xn(e) {
		if (!h || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !bt(t.metadata)) return t;
	}
	function Sn(t, n, r) {
		let i = xt(r?.root), a = r && r.replies.length === 0 && !xn(r.root) ? r.root : void 0, o = yn(t.root, n, i, a), s = xt(t.root) ?? "", c = n > 0 && n !== Ht && !ie(s, i) ? /* @__PURE__ */ W("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", $ ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? xn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ G(R, { children: [c, o] }, `post:${Ct(t.root) ?? n}`) : o;
		let u = Ct(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Et, p = !f || At.has(u), m = p ? t.replies : t.replies.slice(0, Dt), g = t.replies.length - m.length, _ = [...new Set(t.replies.slice(m.length).map(bn))].slice(0, 3);
		return /* @__PURE__ */ G(R, { children: [c, /* @__PURE__ */ G("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ G("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", $ ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => yn(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ G("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => zt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ W("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ W(k, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ W("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ W("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${bn(t.root)}`,
						onClick: () => h?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let Cn = /* @__PURE__ */ G("div", {
		"data-testid": "chat-panel",
		className: e(Ke ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", $ ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Ge && /* @__PURE__ */ G("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", $ ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ W("span", {
				style: C,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: an
			}),
			/* @__PURE__ */ G("div", {
				className: e("relative flex flex-col mb-2", Ke ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ W("div", {
					ref: Qe,
					onScroll: dn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Qt && "fade-top", Ke ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ G("div", {
						className: "mt-auto pb-4",
						children: [
							tt && n.length > 0 && /* @__PURE__ */ W("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ W("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: fn,
									disabled: xe,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: xe ? "Loading…" : "Load earlier messages"
								})
							}),
							Ot.length === 0 ? c ?? /* @__PURE__ */ W("div", {
								className: e("text-sm", $ ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : kt ? kt.map((e, t) => Sn(e, t, kt[t - 1])) : Ot.map((e, t) => yn(e, t, xt(Ot[t - 1]), Ot[t - 1])),
							m && /* @__PURE__ */ W(P, {
								open: Le !== null,
								triggerRef: ze,
								emojis: Fe,
								onSelect: (e) => {
									Le && m(Le, e), Re(null);
								},
								onClose: () => Re(null)
							}),
							S && /* @__PURE__ */ W(b, {
								open: Be !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ve(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Be);
									Ve(null), e && S(e);
								}
							}),
							we.map((e) => /* @__PURE__ */ W(le, {
								author: e.actor,
								timestamp: "",
								tone: me,
								content: /* @__PURE__ */ W(it, {
									transfer: e,
									mine: rt(e, f, Te),
									onCancel: Ee
								})
							}, e.transferId))
						]
					})
				}), Xt > 0 && /* @__PURE__ */ G("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: un,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						Xt,
						" new message",
						Xt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ W(w, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", $ ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ W("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? _n : void 0,
				children: l
			}) : /* @__PURE__ */ G("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Ce && /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !wt,
						onClick: () => at.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", $ ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ W(Rt, {})
					}), /* @__PURE__ */ W(N, {
						ref: at,
						multiple: !0,
						accept: X,
						onFiles: (e) => {
							let t = Z ? e.filter((e) => e.size > Z) : [];
							t.length > 0 && je?.(`Skipped ${t.length} file(s) over the size limit.`), mn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ W("button", {
						ref: dt,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": mt,
						title: "Insert emoji",
						disabled: a,
						onClick: () => ht((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", $ ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ W(d, {
							size: 16,
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ W(P, {
						open: mt,
						onSelect: gn,
						onClose: () => ht(!1),
						triggerRef: dt,
						emojis: Fe
					}),
					/* @__PURE__ */ W(x, {
						size: "sm",
						value: Je,
						onChange: (e) => Ye(e.target.value),
						onKeyDown: vn,
						onPaste: hn,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", $ && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ W(t, {
						variant: "primary",
						size: "sm",
						onClick: pn,
						disabled: a || !Je.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Ce ? /* @__PURE__ */ W(F, {
		onFiles: mn,
		accept: X,
		maxSize: Z,
		onError: je,
		disabled: a,
		className: Ke ? "flex h-full min-h-0 flex-col" : void 0,
		children: Cn
	}) : Cn;
}
function Rt() {
	return /* @__PURE__ */ W("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ W("path", {
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
function zt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Bt({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ G("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ G("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ W("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ W("div", { children: e.map((e) => {
			let n = K(zt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = re(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ G("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ W("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ W("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ W("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ W("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
//#region src/components/social/FeedRow.tsx
var Vt = "min-w-0 truncate", Ht = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function Ut({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ W("time", {
		dateTime: a,
		title: o,
		className: Ht,
		children: i
	}) : /* @__PURE__ */ W("span", {
		title: o,
		className: Ht,
		children: i
	}) : null, _ = /* @__PURE__ */ G("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ G("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ W("span", {
				"data-line": "primary",
				title: r,
				className: e(Vt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ W("span", {
			"data-line": "secondary",
			title: s,
			className: e(Vt, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ G("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ G("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ W("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ W("button", {
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ W("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ W("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function Wt(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Gt({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ W("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ W("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Kt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ W(Gt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ W(S, {
			icon: /* @__PURE__ */ W(u, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${J(e.sentAt)} · pinned ${J(e.pinnedAt)}` : J(r) : void 0;
			return /* @__PURE__ */ W(Ut, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ W(k, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: Wt(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ W("button", {
					type: "button",
					"aria-label": "Unpin",
					title: "Unpin",
					"data-testid": "pinned-message-unpin",
					onClick: () => n(e.messageId),
					className: "grid h-6 w-6 place-items-center rounded bg-transparent text-xs text-text-tertiary hover:bg-surface-hover hover:text-text-primary",
					children: "✕"
				})
			}, e.messageId);
		})
	});
}
function qt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ W(Gt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ W(S, {
			icon: /* @__PURE__ */ W(a, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = tt(e.attachment);
			return /* @__PURE__ */ W(Ut, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ W("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ W("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ W(y, {})
				}),
				title: e.attachment.name,
				meta: [e.author, L(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Wt(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? J(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Jt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ W(Gt, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ W(S, {
			icon: /* @__PURE__ */ W(g, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ W(Ut, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ W(k, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Wt(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? J(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Yt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Xt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Zt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ W(Gt, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ W(S, {
			icon: /* @__PURE__ */ W(_, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ W(Ut, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ W("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ W("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ W(_, {})
				}),
				title: [Wt(e.startedAt), Yt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Xt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Qt({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = (t, n, r, i, a = !1) => /* @__PURE__ */ G("button", {
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ W("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), c = (e) => [r && s("create", r, /* @__PURE__ */ W("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && s("create-whiteboard", i, /* @__PURE__ */ W(h, { size: 15 }), "New whiteboard", e)].filter(Boolean), l = !!(r || i);
	return /* @__PURE__ */ G("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [l && t.length > 0 && /* @__PURE__ */ G("div", {
			className: "mb-1 flex flex-col",
			children: [r && s("create", r, /* @__PURE__ */ W("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && s("create-whiteboard", i, /* @__PURE__ */ W(h, { size: 15 }), "New whiteboard in this conversation")]
		}), t.length === 0 ? /* @__PURE__ */ W(S, {
			icon: /* @__PURE__ */ W(y, { size: 40 }),
			title: "No documents yet",
			description: "Documents and whiteboards started here stay with this conversation.",
			action: l ? /* @__PURE__ */ W("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: c(!0)
			}) : void 0
		}) : /* @__PURE__ */ W("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ W(Ut, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ W("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ W(y, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Wt(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? J(e.updatedAt) : void 0,
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var $t = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], en = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function tn({ name: t, description: n, online: r, avatarUrl: a, features: o = $t, children: s, canvas: c, members: u, memberCount: d, files: f = [], thumbnailSrc: p, documents: m = [], onOpenDocument: h, onRename: g, onCreateDocument: v, onCreateWhiteboard: y, pins: b = [], onUnpin: x, mentions: S = [], onOpenMention: C, recordings: w = [], onOpenRecording: D, onJumpToMessage: O, onStartCall: k, callModeFixed: A = !1, onWatch: j, watchLabel: ee, watchHint: M, watchViewerCount: N, callInProgress: P = !1, headerActions: F, view: I, onViewChange: te, className: L, "data-testid": R = "conversation-surface" }) {
	let z = new Set(o), [B, V] = H("chat"), ne = I ?? B, K = z.has(ne) ? ne : o[0] ?? "chat", re = (e) => {
		I === void 0 && V(e), te?.(e);
	}, q = (e) => e || void 0, ie = o.filter((e) => en[e]).map((e) => ({
		id: e,
		label: en[e],
		badge: e === "files" ? q(f.length) : e === "documents" ? q(m.length) : e === "pins" ? q(b.length) : e === "members" ? d == null ? void 0 : q(d) : e === "calls" ? q(w.length) : e === "mentions" ? q(S.filter((e) => e.unread).length) : void 0
	})), ae = (e) => {
		re("chat"), O?.(e);
	};
	return /* @__PURE__ */ G("section", {
		className: e("flex min-w-0 flex-col", L),
		"data-testid": R,
		children: [
			/* @__PURE__ */ W(T, {
				name: t,
				onRename: g,
				description: n,
				online: r,
				avatarUrl: a,
				"data-testid": `${R}-header`,
				tabs: ie.length > 1 ? /* @__PURE__ */ W(E, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: K,
					onValueChange: (e) => re(e),
					items: ie
				}) : void 0,
				actions: k || j || F ? /* @__PURE__ */ G(U, { children: [
					k && (A ? /* @__PURE__ */ W(i, {
						"aria-label": P ? "Join the call" : "Start a call",
						title: P ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => k(!1),
						children: /* @__PURE__ */ W(l, { size: 16 })
					}) : /* @__PURE__ */ G(U, { children: [/* @__PURE__ */ W(i, {
						"aria-label": P ? "Join the call with audio" : "Start an audio call",
						title: P ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => k(!0),
						children: /* @__PURE__ */ W(l, { size: 16 })
					}), /* @__PURE__ */ W(i, {
						"aria-label": P ? "Join the call with video" : "Start a video call",
						title: P ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => k(!1),
						children: /* @__PURE__ */ W(_, { size: 16 })
					})] })),
					j && /* @__PURE__ */ W(nn, {
						testId: `${R}-watch`,
						label: ee,
						hint: M,
						viewerCount: N,
						onClick: j
					}),
					F
				] }) : void 0
			}),
			z.has("files") && K === "files" && /* @__PURE__ */ W(qt, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: p,
				onJump: O ? ae : void 0
			}),
			z.has("documents") && K === "documents" && /* @__PURE__ */ W(Qt, {
				className: "min-h-0 flex-1",
				documents: m,
				onOpen: h,
				onCreate: v,
				onCreateWhiteboard: y
			}),
			z.has("pins") && K === "pins" && /* @__PURE__ */ W(Kt, {
				className: "min-h-0 flex-1",
				pins: b,
				onUnpin: x,
				onJump: O ? ae : void 0
			}),
			z.has("members") && K === "members" && /* @__PURE__ */ W("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-members`,
				children: u
			}),
			z.has("mentions") && K === "mentions" && /* @__PURE__ */ W(Jt, {
				className: "min-h-0 flex-1",
				mentions: S,
				onJump: C ? (e, t) => {
					re("chat"), C(e, t);
				} : void 0
			}),
			z.has("calls") && K === "calls" && /* @__PURE__ */ W(Zt, {
				className: "min-h-0 flex-1",
				recordings: w,
				onOpen: D
			}),
			z.has("chat") && /* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: K !== "chat",
				children: [c && /* @__PURE__ */ W("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${R}-canvas`,
					children: c
				}), /* @__PURE__ */ W("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function nn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ G(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? rn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ W(c, { size: 14 }),
			/* @__PURE__ */ W("span", { children: o }),
			s && /* @__PURE__ */ W("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var rn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { q as $, qe as A, Z as B, nt as C, Qe as D, et as E, Ue as F, be as G, Oe as H, We as I, _e as J, Y as K, Ve as L, Ge as M, $ as N, Ze as O, He as P, se as Q, Re as R, ot as S, tt as T, Ee as U, X as V, Se as W, le as X, ge as Y, ce as Z, _t as _, Jt as a, re as at, ft as b, Yt as c, Lt as d, ae as et, vt as f, pt as g, mt as h, qt as i, K as it, Ke as j, Xe as k, Ut as l, ut as m, tn as n, J as nt, Zt as o, lt as p, ye as q, Qt as r, ie as rt, Kt as s, $t as t, oe as tt, Bt as u, bt as v, it as w, gt as x, yt as y, Ae as z };
