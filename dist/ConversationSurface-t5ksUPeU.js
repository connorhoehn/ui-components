import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { D as r, M as i, N as a, b as o, d as s, f as c, h as l, k as u, p as d, s as f, u as p, x as m, y as h } from "./Icons-BYrwLcxs.js";
import { f as g, t as _ } from "./Chip-BENLwTlq.js";
import { t as v } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as y } from "./EmptyState-JzzL2z1E.js";
import { n as b, o as x, s as S, t as ee } from "./ChannelHeader-BOsRE9TC.js";
import { n as C } from "./DockedPanelContext-pH9A5z1h.js";
import { t as w } from "./Input-DLknWXri.js";
import { t as T } from "./Textarea-Dz4doxTv.js";
import { t as E } from "./Avatar-BzicCOft.js";
import { n as D, t as O } from "./DropdownMenu-C7d4EDjv.js";
import { t as te } from "./StatusPill-Db42eiME.js";
import { i as k, n as A, r as j, t as M } from "./ReactionPickerPopover-CcL-n6gt.js";
import { p as ne } from "./MediaIcons-OLUYBJM0.js";
import { t as N } from "./formatBytes-05ivRSJY.js";
import { Fragment as P, useEffect as F, useMemo as I, useRef as L, useState as R } from "react";
import { Fragment as z, jsx as B, jsxs as V } from "react/jsx-runtime";
//#region src/utils/identity.ts
var H = [
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
function re(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return H[Math.abs(t) % H.length];
}
function U(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function ie(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function W(e, t) {
	let n = ie(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = ie(t);
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
function G(e) {
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
function le({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = ce(r), m = !o || !!p;
	return /* @__PURE__ */ V("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ B("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ B(E, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ V("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ V("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ B("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ B("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: G(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ B("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${G(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ B("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ B("div", {
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
	if (!ue.has(n.tagName)) return /* @__PURE__ */ B("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ B("br", {}, t);
		case "A": {
			let e = fe(n.getAttribute("href"));
			return e ? /* @__PURE__ */ B("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ B("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ B("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ B(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ B("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ B("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ B("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ge({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = I(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => pe(e, `n${t}`));
	}, [t]), o = I(() => he(n ?? ""), [n]);
	return /* @__PURE__ */ B("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function _e({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ V("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ B("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ B("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${ve(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ B(D, {
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
			o && /* @__PURE__ */ B("button", {
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
	return /* @__PURE__ */ V("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ B("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function be(e) {
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
function xe(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Se({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? be(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? K(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
	return /* @__PURE__ */ V("div", {
		"data-testid": f,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ B("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${m} in progress` : m
					}),
					/* @__PURE__ */ B("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: h
					}),
					!i && s === !1 && /* @__PURE__ */ B("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${f}-not-recorded`,
						children: xe(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ B(D, {
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
			i && u && /* @__PURE__ */ B("button", {
				type: "button",
				"data-testid": `${f}-join`,
				onClick: () => u(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
var q = {
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
function Ce(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function we(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Te(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Ee({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ V("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ B("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ B(E, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ V("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ B("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ B("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ B("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function De({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: ee, className: C, "data-testid": w = "recording-activity-card" }) {
	let T = o ?? a.length, E = u === "gone", k = u !== "saving" && u !== "failed" && !E && !!g, A = () => {
		g?.(n);
	}, j = c != null && c > 0 ? be(c) : "", M = Ce(s), ne = Te(a, T), { state: N, label: P } = q[u], F = [
		...g && k ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: A
		}] : [],
		...x && d ? [{
			"data-testid": `${w}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		..._ && !E ? [{
			"data-testid": `${w}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !E ? [{
			"data-testid": `${w}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...y && !E ? [{
			"data-testid": `${w}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && k ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], I = F.length ? [{
		items: F,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ V("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", C),
		children: [/* @__PURE__ */ V("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ V("button", {
				type: "button",
				onClick: k ? A : void 0,
				disabled: !k,
				"aria-label": k ? `Play ${r.toLowerCase()}` : `${r}: ${P.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", k ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ B("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ B(Ee, {
						participants: a,
						total: T,
						testId: w
					}),
					k && /* @__PURE__ */ B("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ B("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ B("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ B("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					j && /* @__PURE__ */ B("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: j
					})
				]
			}), /* @__PURE__ */ V("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ V("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ V("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ B("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${w}-title`,
								children: r
							}), h && /* @__PURE__ */ B("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ B(m, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ V("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${w}-by`,
							children: ["by ", i]
						}),
						T > 0 && /* @__PURE__ */ V("div", {
							className: "flex items-center gap-2",
							"data-testid": `${w}-people`,
							children: [/* @__PURE__ */ B(D, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: ee
							}), /* @__PURE__ */ B("span", {
								className: "truncate text-xs text-text-tertiary",
								children: ne
							})]
						}),
						/* @__PURE__ */ V("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ B(te, {
									state: N,
									label: P,
									size: "sm",
									"data-testid": `${w}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ B(te, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${w}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ B(te, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${w}-summary`
								}),
								M && /* @__PURE__ */ B("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: M
								})
							]
						})
					]
				}), I.length > 0 && /* @__PURE__ */ B(O, {
					trigger: /* @__PURE__ */ B("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: I,
					"data-testid": `${w}-menu`
				})]
			})]
		}), p && u !== "failed" && !E && /* @__PURE__ */ V("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ V("span", { children: ["Set to expire ", we(p)] }), S && /* @__PURE__ */ B(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => S(n),
				"data-testid": `${w}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function Oe(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function ke(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function J(e, t) {
	let n = e.names && e.names.length > 0 ? Oe(e.names) : e.userIds.length > 0 ? Oe(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = ke(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ae({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = J(t, n);
	return /* @__PURE__ */ V("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ B("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ B("time", {
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
var Y = [
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
], je = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Me = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, X = 6, Ne = "shrink-0 whitespace-nowrap underline underline-offset-2", Pe = `${Ne} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Z(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Fe(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Ie(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Z(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Z(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Z(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Fe(e.index)}`;
		case "deleteBlock": return `Removed block ${Fe(e.index)}`;
		case "appendMacro": return t ? `Added a ${Z(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Fe(e.index)}`;
		case "setDocumentType": return `Type: ${Z(t, 40)}`;
		case "skip": return t ? Z(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Z(t)}` : e.op;
	}
}
function Q(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Le(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function Re(e) {
	if (!e?.startedAt) return null;
	let t = Q(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Le(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var ze = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Be({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: v, defaultExpanded: y = !1, className: b, "data-testid": x = "agent-run-card" }) {
	let S = c?.phase ?? "received", [ee, C] = R(y), w = S === "completed" ? c?.suggestion ?? h : void 0, T = S === "completed" ? c?.review : void 0, E = !!w && !T, D = S === "completed" && c?.noop === !0, O = S === "completed" ? c?.result ?? d : void 0, te = O?.kind === "link" && O.label ? O.label : "Open", k = l && !(O?.kind === "document" && p), A = je[S], j = S === "failed" || S === "rejected", M = j ? "danger" : T ? T.decision === "accept" ? "success" : "neutral" : D ? "warning" : S === "completed" ? w ? "warning" : "success" : S === "awaiting_approval" ? "warning" : "info", N = T ? "Reviewed" : E ? "Suggested" : D ? "No change" : Me[S], P = T ? T.byName ?? T.by : void 0, F = T ? `${T.decision === "accept" ? "Accepted" : "Rejected"} by ${P}` : void 0, I = S === "awaiting_approval", L = S === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : I ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : F ?? c?.detail ?? (E && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : S === "received" ? "Received" : N), z = c?.details, H = z?.ops ?? [], re = z?.steps ?? [], U = z?.document?.title || v || "Document", ie = !!z?.document || !!l, W = z?.error ?? (S === "failed" ? c?.detail : void 0), ae = Re(z), oe = `${x}-details-${r}`, G = !!(E && w && g || I && m || O && p || O?.kind === "link" && !p);
	return /* @__PURE__ */ V("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", b),
		"data-testid": x,
		"data-phase": S,
		"data-run-id": r,
		"data-expanded": ee ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || C((e) => !e);
		},
		children: [
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ B(ne, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ V("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${x}-instruction`,
						children: [
							/* @__PURE__ */ B("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ B(_, {
						size: "xs",
						tone: M,
						"data-testid": `${x}-phase`,
						children: N
					}),
					/* @__PURE__ */ B(n, {
						size: "sm",
						"aria-label": ee ? "Hide details" : "Show details",
						"aria-expanded": ee,
						"aria-controls": ee ? oe : void 0,
						onClick: () => C((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${x}-toggle`,
						icon: /* @__PURE__ */ B(f, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", ee && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ V("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", G && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ B("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${x}-steps`,
							children: Y.map((t, n) => {
								let r = j ? n < A : n < A || n === A && S === "completed", i = n === A && S !== "completed" && !j, a = j && n === A;
								return /* @__PURE__ */ V("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ B("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? D && n === A ? "bg-warning" : "bg-success" : i ? I ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ B("span", {
										className: "sr-only",
										children: a ? N : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ B("span", {
							className: e("min-w-0 flex-1 truncate", T && (T.decision === "accept" ? "text-success" : "text-text-tertiary"), S === "failed" && "text-danger", D && "text-warning-fg"),
							"data-testid": `${x}-detail`,
							"data-review": T?.decision,
							title: c?.detail,
							children: L
						})]
					}),
					E && w && g && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-review`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${x}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${x}-reject-review`,
							children: "Reject"
						})]
					}),
					I && m && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-decide`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "approve"),
							"data-testid": `${x}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "reject"),
							"data-testid": `${x}-reject`,
							children: "Reject"
						})]
					}),
					O && p && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: () => p(O),
						className: e(Ne, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": O.kind,
						children: te
					}),
					O?.kind === "link" && !p && /* @__PURE__ */ B("a", {
						href: O.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Ne, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": "link",
						children: te
					}),
					u && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: () => u(r),
						className: Pe,
						"data-testid": `${x}-open-run`,
						children: "Open run"
					}),
					k && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: l,
						className: Pe,
						"data-testid": `${x}-open-document`,
						children: "Open document"
					})
				]
			}),
			ee && /* @__PURE__ */ V("div", {
				id: oe,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${x}-details`,
				children: [
					ie && /* @__PURE__ */ V("div", {
						className: "flex items-start gap-2",
						"data-testid": `${x}-details-document`,
						children: [
							/* @__PURE__ */ B("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ V("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ B("span", {
									className: "block truncate font-medium text-text-primary",
									children: U
								}), z?.document?.snippet && /* @__PURE__ */ B("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${x}-details-snippet`,
									children: z.document.snippet
								})]
							}),
							l && /* @__PURE__ */ B(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${x}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ V("div", {
						"data-testid": `${x}-details-ops`,
						children: [
							/* @__PURE__ */ B("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ B("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: H.slice(0, X).map((e, t) => /* @__PURE__ */ B("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Ie(e)
								}, t))
							}),
							H.length > X && /* @__PURE__ */ V("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${x}-details-more-ops`,
								children: [
									"+",
									H.length - X,
									" more"
								]
							})
						]
					}),
					re.length > 0 && /* @__PURE__ */ B("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${x}-details-steps`,
						children: re.map((t) => /* @__PURE__ */ V("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ B("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ze[t.status] ?? ze.pending)
							}), /* @__PURE__ */ B("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					W && /* @__PURE__ */ B("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${x}-details-error`,
						children: W
					}),
					/* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => u(r),
								className: e(Ne, "hover:text-text-primary"),
								"data-testid": `${x}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							O && p && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => p(O),
								className: e(Ne, "font-medium text-info"),
								"data-testid": `${x}-details-open-result`,
								children: te
							}),
							ae && /* @__PURE__ */ B("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${x}-details-timings`,
								children: ae
							})
						]
					})
				]
			})
		]
	});
}
function Ve(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = He(e.result);
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
function He(e) {
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
function Ue(e, t) {
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
function We(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Ge({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = I(() => Ue(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ B("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ V("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: We(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ B("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Ke = [
	"👍",
	"🎉",
	"❤️"
], qe = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Je({ quickReactions: t = Ke, onReact: n, onOpenReactionPicker: a, onReply: o, onForward: c, onTogglePin: f, pinned: p = !1, onCopyLink: h, onEdit: g, onDelete: _, className: v, "data-testid": y = "message-actions" }) {
	let b = (e, t, n, r) => /* @__PURE__ */ B("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${y}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${qe}`,
		children: n
	}, r);
	return /* @__PURE__ */ V("div", {
		"data-testid": y,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", v),
		children: [
			n && t.map((e) => b(`React ${e}`, () => n(e), /* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			a && b("More reactions", a, /* @__PURE__ */ B(u, { size: 14 }), "more-reactions"),
			o && b("Reply", o, /* @__PURE__ */ B(r, { size: 14 }), "reply"),
			c && b("Forward to another conversation", c, /* @__PURE__ */ B(d, { size: 14 }), "forward"),
			f && b(p ? "Unpin" : "Pin to channel", f, /* @__PURE__ */ B(m, { size: 14 }), "pin"),
			h && b("Copy link to message", h, /* @__PURE__ */ B(l, { size: 14 }), "copy-link"),
			g && b("Edit message", g, /* @__PURE__ */ B(s, { size: 13 }), "edit"),
			_ && b("Delete message", _, /* @__PURE__ */ B(i, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ye({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = R(e), [s, c] = R(!1), [l, u] = R(null), d = L(null);
	F(() => {
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
	return /* @__PURE__ */ V("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ B(T, {
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
			/* @__PURE__ */ V("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ B("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ B(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ B(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ B("p", {
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
function Xe(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Ze(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Qe({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ V("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ B("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ B("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Ze(t.timestamp)
		})]
	}), /* @__PURE__ */ B("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Xe(t.text)
	})] });
	return /* @__PURE__ */ V("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ B("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ B("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ B("button", {
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
function $e(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function et({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = $e(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ V("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ B("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ B("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ B("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ B("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ V("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ B("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ B("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: N(t.size)
			})]
		})]
	}) : /* @__PURE__ */ B("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ V("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ B(rt, {}), /* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ B("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ B("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: N(t.size)
				})]
			})]
		})
	});
}
function tt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function nt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : N(o);
	return /* @__PURE__ */ V("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ B("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ B(rt, {}),
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ B("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ B("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ B("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ B("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ B("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ B("button", {
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
function rt() {
	return /* @__PURE__ */ B("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ B("path", {
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
function it({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ae(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ V("div", {
		role: "separator",
		"aria-label": oe(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function at(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function ot(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function st(e) {
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
function ct(e) {
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
var lt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function ut(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => lt[e] ?? e)
	};
}
function dt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function $(e) {
	return `${dt(e)}:`;
}
function ft(e, t) {
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
function pt(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = $(t);
	if (n) {
		let t = ft(n, r);
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
function mt(e) {
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
function ht(e) {
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
function gt(e) {
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
function _t(e) {
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
function vt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function yt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(vt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function bt(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function xt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function St(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = bt(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = bt(r), i = xt(r);
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
		let e = bt(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = bt(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Ct = 3, wt = 2, Tt = 3e5;
function Et(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Dt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Ve(e.metadata) || gt(e.metadata) || ht(e.metadata) || st(e.metadata) || _t(e.metadata));
}
function Ot(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Et(r);
	if (!i || i !== Et(n) || !Dt(n) || !Dt(r) || r.editedAt || W(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Tt;
}
function kt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function At({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ V("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function jt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Mt(e) {
	return e.displayName || e.userId;
}
function Nt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Et(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Pt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: d, onToggleReaction: f, onReply: p, onForwardMessage: h, onTogglePin: g, onEditMessage: _, onDeleteMessage: y, pinnedMessageIds: x, onJumpToMessage: ee, highlightedMessageId: T, threaded: D = !1, alignOwnMessages: O = !0, documentEditors: te, callParticipants: ne, agentRunStatus: N, onOpenRun: I, onOpenResult: H, onDecideRun: re, onReviewRun: U, onJoinCall: ie, onOpenRecording: ae, onCopyRecordingLink: oe, onShareRecording: se, onDownloadRecording: ce, onOpenRecordingTranscript: ue, onManageRecordingExpiry: de, recordingStatus: fe, onOpenDocument: pe, tone: me = "light", showHeader: he, fill: ve, onLoadMore: be, hasMore: K, loadingMore: xe = !1, onSendFiles: q, transfers: Ce = [], currentActor: we, onCancelTransfer: Te, attachmentSrc: Ee, onOpenAttachment: Oe, acceptFiles: ke, maxFileSize: J, onFileError: Y, readReceipts: je = [], readReceiptsEnabled: Me = !0, unreadFrom: X, emojis: Ne = M }) {
	let [Pe, Z] = R(null), [Fe, Ie] = R(null), Q = me === "dark", Le = C(), Re = he ?? !(Le?.hasHeader ?? !1), ze = ve ?? Le?.fillsHeight ?? !1, [He, Ue] = R(""), We = L(null), Ke = L(null), qe = !!be && K !== !1, Xe = L(null), Ze = L(null), [$e, rt] = R(!1), lt = !!q && !a, $ = yt(n, r), ft = D ? St($) : null, [xt, Tt] = R(() => /* @__PURE__ */ new Set());
	function Et(e) {
		Tt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Dt = L(void 0);
	if (X !== void 0) {
		let e = Dt.current;
		if (e === void 0) Dt.current = X;
		else {
			let t = Date.parse(X), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Dt.current = X);
		}
	}
	let Pt = Dt.current, It = Pt === void 0 ? -1 : kt(ft ? ft.map((e) => vt(e.root)) : $.map((e) => vt(e)), Pt), Lt = Me && u ? u : void 0, Rt = (() => {
		if (!(!Lt || je.length === 0)) for (let e = $.length - 1; e >= 0; --e) {
			let t = $[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Lt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), zt = Rt && Lt ? jt(je, Lt, Rt.timestamp) : [], Bt = zt.length === 1 && !!Lt && Nt(n, je, Lt) === 1;
	function Vt() {
		if (zt.length === 0) return null;
		let t = zt.map(Mt), n = zt.slice(0, 3);
		return /* @__PURE__ */ V("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", O ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: [
				zt.length > 1 && /* @__PURE__ */ B("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ B(E, {
						name: Mt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ B("span", {
					"data-testid": "chat-read-receipts-label",
					children: Bt ? "Seen" : `Seen by ${zt.length}`
				}),
				/* @__PURE__ */ B("span", {
					style: S,
					children: Bt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Ht, Ut] = R(0), [Wt, Gt] = R(!1), Kt = L(!0), qt = L(n.length), Jt = n.length + r.length + Ce.length, Yt = L(null), [Xt, Zt] = R(""), Qt = L(null), $t = L(!1), en = L(0);
	F(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!$t.current) {
			$t.current = !0, Qt.current = t;
			return;
		}
		if (t === Qt.current || (Qt.current = t, u && e.userId === u)) return;
		en.current += 1;
		let r = en.current % 2 == 0 ? "​" : "";
		Zt(ot(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function tn() {
		let e = We.current;
		e && (e.scrollTop = e.scrollHeight, Kt.current = !0, Ut(0));
	}
	function nn() {
		let e = We.current;
		if (!e) return;
		let t = at(e);
		Kt.current = t, t && Ut(0), Gt(e.scrollTop > 8);
	}
	F(() => {
		let e = We.current, t = qt.current, n = Jt - t;
		if (qt.current = Jt, !e) return;
		let r = Yt.current;
		if (r && n > 0) {
			Yt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Kt.current ? (e.scrollTop = e.scrollHeight, Ut(0), Gt(e.scrollTop > 8)) : n > 0 && Ut((e) => e + n);
	}, [Jt]);
	function rn() {
		let e = We.current;
		e && (Yt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), be?.();
	}
	F(() => () => {
		Ke.current && clearTimeout(Ke.current);
	}, []);
	function an() {
		let e = He.trim();
		!e || a || (Ke.current && clearTimeout(Ke.current), Ke.current = null, o?.(!1), Kt.current = !0, i(e), Ue(""));
	}
	function on(e) {
		!lt || e.length === 0 || (Kt.current = !0, q?.(e));
	}
	function sn(e) {
		if (!lt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), on(t));
	}
	function cn(e) {
		Ue((t) => t + e), rt(!1);
	}
	function ln() {
		a || (o?.(!0), Ke.current && clearTimeout(Ke.current), Ke.current = setTimeout(() => o?.(!1), 2e3));
	}
	function un(e) {
		ln(), e.key === "Enter" && !a && He.trim() && an();
	}
	function dn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === It ? /* @__PURE__ */ B(At, { tone: me }) : null, l = !c && Ot(a, n), v = !o && W(s, i) ? /* @__PURE__ */ B(it, {
			timestamp: s,
			tone: me
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Ve(r.metadata);
			return /* @__PURE__ */ V(P, { children: [
				v,
				c,
				/* @__PURE__ */ B("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ B(le, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: me,
						mine: !0,
						content: /* @__PURE__ */ V(z, { children: [
							i ? /* @__PURE__ */ B(Be, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: N?.(i.runId),
								onOpenDocument: pe && i.documentId ? () => pe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: I,
								result: i.result,
								onOpenResult: H,
								onDecide: re,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: U
							}) : /* @__PURE__ */ B(ge, { text: r.content }),
							/* @__PURE__ */ B("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Q ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ B("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ B(t, {
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
		let { message: b } = n, S = b.displayName ?? b.clientId.slice(0, 8), C = b.attachments ?? [], w = b.metadata?.html, E = typeof w == "string" ? w : void 0, D = mt(b.metadata), k = pt(b.content, D, E), A = /* @__PURE__ */ B(ge, {
			html: k.html,
			text: k.body
		}), j = st(b.metadata), M = Ve(b.metadata), F = ht(b.metadata), L = gt(b.metadata), R = _t(b.metadata), he = ut(b.metadata), ve = ct(b.metadata), be = M ? /* @__PURE__ */ B(Be, {
			runId: M.runId,
			instruction: M.instruction || b.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: b.displayName,
			status: N?.(M.runId),
			onOpenDocument: pe && M.documentId ? () => pe(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: I,
			result: M.result,
			onOpenResult: H,
			onDecide: re,
			suggestion: M.suggestionKey ? {
				key: M.suggestionKey,
				...M.documentId ? { documentId: M.documentId } : {}
			} : void 0,
			onReview: U
		}) : L ? (() => {
			let e = fe?.(L.recordingId), t = {
				...L,
				...e ?? {}
			};
			return /* @__PURE__ */ B(De, {
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
				pinned: !!b.id && !!x?.has(b.id),
				onOpen: ae,
				onCopyLink: oe,
				onShare: se,
				onDownload: ce,
				onOpenTranscript: ue,
				onManageExpiry: de,
				onTogglePin: g ? () => g(b) : void 0
			});
		})() : F ? /* @__PURE__ */ B(Se, {
			callId: F.callId,
			startedBy: (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			participants: ne?.(F.callId) ?? F.participants,
			live: F.live,
			durationMs: F.durationMs,
			audioOnly: F.audioOnly,
			recorded: F.recorded,
			notRecordedReason: F.notRecordedReason,
			lobbyName: F.lobbyName,
			onJoin: ie
		}) : j ? /* @__PURE__ */ B(_e, {
			documentId: j.documentId,
			title: j.title || b.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			editors: te?.(j.documentId) ?? [],
			onOpen: pe
		}) : C.length === 0 ? A : /* @__PURE__ */ V(z, { children: [(b.content || E) && A, C.map((e) => /* @__PURE__ */ B(et, {
			attachment: e,
			src: Ee?.(e),
			onOpen: Oe
		}, e.id))] }), K = b.id ?? "", xe = K && d ? d(K) : [], q = b.metadata?.replyTo, Ce = !!o && !!q && q.messageId === o.rootId, we = !!q && !Ce, Te = !!K && !!x?.has(K), ke = !!u && b.userId === u, J = b.metadata?.system === !0, Y = !!b.deletedAt || b.metadata?.deleted === !0, je = !!(M || L || F || j || R), Me = ke && !Y && !J && !je && !!K, X = !!K && !Y && !J && !je && C.length === 0 && !!b.content.trim(), Ne = Me && !!_ && Pe === K, Fe = /* @__PURE__ */ V(z, { children: [
			we && q && /* @__PURE__ */ B(Qe, {
				quote: q,
				onJump: ee,
				className: "mb-1"
			}),
			D && /* @__PURE__ */ V("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [dt(D), D.timestamp ? G(D.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ B("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					k.stripped ? dt(D) : "Forwarded"
				]
			}),
			Te && /* @__PURE__ */ V("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ B(m, { size: 11 }), " Pinned"]
			}),
			Y ? /* @__PURE__ */ B("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Ne ? /* @__PURE__ */ B(Ye, {
				initialText: b.content,
				onSave: async (e) => {
					await _(b, e), Z(null);
				},
				onCancel: () => Z(null)
			}) : be,
			!Y && ve.length > 0 && /* @__PURE__ */ B("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: ve.map((e) => /* @__PURE__ */ B(ye, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: pe
				}, e.id))
			}),
			!Y && he && /* @__PURE__ */ V("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					he.labels.length > 0 ? `Too large to send: ${he.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Y && xe.length > 0 && u && f && /* @__PURE__ */ B(Ge, {
				reactions: xe,
				currentUserId: u,
				onToggle: (e) => f(K, e)
			})
		] });
		return R ? /* @__PURE__ */ V(P, { children: [
			v,
			c,
			/* @__PURE__ */ B(Ae, {
				membership: R,
				fallbackText: b.content,
				timestamp: b.timestamp,
				"data-testid": "membership-notice"
			})
		] }, b.id ?? r) : /* @__PURE__ */ V(P, { children: [
			v,
			c,
			/* @__PURE__ */ V("div", {
				"data-testid": "chat-message",
				"data-message-id": K || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? G(b.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", K && K === T && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ B(le, {
					author: S,
					content: Fe,
					timestamp: l ? "" : b.timestamp,
					editedAt: Y ? void 0 : b.editedAt,
					avatarUrl: b.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: me,
					mine: ke && O
				}), K && !Y && !Ne && (f || Me || X && h || !J && (p || g)) && /* @__PURE__ */ B(Je, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: f ? (e) => f(K, e) : void 0,
					onReply: p && !J ? () => p(o?.rootMessage ?? b) : void 0,
					onForward: h && X ? () => h(b) : void 0,
					onTogglePin: g && !J ? () => g(b) : void 0,
					pinned: !!b.id && !!x?.has(b.id),
					onEdit: Me && _ ? () => Z(K) : void 0,
					onDelete: Me && y ? () => Ie(K) : void 0
				})]
			}),
			!!Rt && K === Rt.id && Vt()
		] }, b.id ?? r);
	}
	function fn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function pn(e) {
		if (!p || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !_t(t.metadata)) return t;
	}
	function mn(t, n, r) {
		let i = vt(r?.root), a = r && r.replies.length === 0 && !pn(r.root) ? r.root : void 0, o = dn(t.root, n, i, a), s = vt(t.root) ?? "", c = n > 0 && n !== It && !W(s, i) ? /* @__PURE__ */ B("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Q ? "border-white/10" : "border-border-subtle")
		}) : null, l = pn(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ V(P, { children: [c, o] }, `post:${bt(t.root) ?? n}`) : o;
		let u = bt(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Ct, m = !f || xt.has(u), h = m ? t.replies : t.replies.slice(0, wt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(fn))].slice(0, 3), v = t.replies.length === 0;
		return /* @__PURE__ */ V(P, { children: [c, /* @__PURE__ */ V("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ V("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Q ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => dn(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ V("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => Et(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ B("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ B(E, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ B("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ B("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${fn(t.root)}`,
						onClick: () => p?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", v && e("opacity-0 transition-opacity", "group-hover/post:opacity-100 group-has-[:focus-visible]/post:opacity-100", "[@media(hover:none)]:opacity-100"), Q ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let hn = /* @__PURE__ */ V("div", {
		"data-testid": "chat-panel",
		className: e(ze ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Re && /* @__PURE__ */ V("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Q ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ B("span", {
				style: S,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Xt
			}),
			/* @__PURE__ */ V("div", {
				className: e("relative flex flex-col mb-2", ze ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ B("div", {
					ref: We,
					onScroll: nn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Wt && "fade-top", ze ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ V("div", {
						className: "mt-auto pb-4",
						children: [
							qe && n.length > 0 && /* @__PURE__ */ B("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ B("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: rn,
									disabled: xe,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: xe ? "Loading…" : "Load earlier messages"
								})
							}),
							$.length === 0 ? c ?? /* @__PURE__ */ B("div", {
								className: e("text-sm", Q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : ft ? ft.map((e, t) => mn(e, t, ft[t - 1])) : $.map((e, t) => dn(e, t, vt($[t - 1]), $[t - 1])),
							y && /* @__PURE__ */ B(v, {
								open: Fe !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ie(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Fe);
									Ie(null), e && y(e);
								}
							}),
							Ce.map((e) => /* @__PURE__ */ B(le, {
								author: e.actor,
								timestamp: "",
								tone: me,
								content: /* @__PURE__ */ B(nt, {
									transfer: e,
									mine: tt(e, u, we),
									onCancel: Te
								})
							}, e.transferId))
						]
					})
				}), Ht > 0 && /* @__PURE__ */ V("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: tn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Ht,
						" new message",
						Ht === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ B(b, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Q ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ B("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? ln : void 0,
				children: l
			}) : /* @__PURE__ */ V("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					q && /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !lt,
						onClick: () => Xe.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ B(Ft, {})
					}), /* @__PURE__ */ B(k, {
						ref: Xe,
						multiple: !0,
						accept: ke,
						onFiles: (e) => {
							let t = J ? e.filter((e) => e.size > J) : [];
							t.length > 0 && Y?.(`Skipped ${t.length} file(s) over the size limit.`), on(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ B("button", {
						ref: Ze,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": $e,
						title: "Insert emoji",
						disabled: a,
						onClick: () => rt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ B("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ B(A, {
						open: $e,
						onSelect: cn,
						onClose: () => rt(!1),
						triggerRef: Ze,
						emojis: Ne
					}),
					/* @__PURE__ */ B(w, {
						size: "sm",
						value: He,
						onChange: (e) => Ue(e.target.value),
						onKeyDown: un,
						onPaste: sn,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ B(t, {
						variant: "primary",
						size: "sm",
						onClick: an,
						disabled: a || !He.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return q ? /* @__PURE__ */ B(j, {
		onFiles: on,
		accept: ke,
		maxSize: J,
		onError: Y,
		disabled: a,
		className: ze ? "flex h-full min-h-0 flex-col" : void 0,
		children: hn
	}) : hn;
}
function Ft() {
	return /* @__PURE__ */ B("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ B("path", {
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
function It(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Lt({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ V("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ V("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ B("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ B("div", { children: e.map((e) => {
			let n = re(It(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = U(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ V("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ B("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ B("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ B("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ B("span", {
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
var Rt = "min-w-0 truncate", zt = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function Bt({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": p, ...m }) {
	let h = r ? i ? /* @__PURE__ */ B("time", {
		dateTime: i,
		title: a,
		className: zt,
		children: r
	}) : /* @__PURE__ */ B("span", {
		title: a,
		className: zt,
		children: r
	}) : null, _ = /* @__PURE__ */ V("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ V("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ B("span", {
				"data-line": "primary",
				title: n,
				className: e(Rt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), h]
		}), /* @__PURE__ */ B("span", {
			"data-line": "secondary",
			title: o,
			className: e(Rt, "text-[11px] leading-snug", s ? g[s] : "text-text-tertiary"),
			children: o
		})]
	});
	return /* @__PURE__ */ V("li", {
		...m,
		"data-testid": p,
		"data-unread": d ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", f),
		children: [
			/* @__PURE__ */ V("span", {
				className: "relative shrink-0",
				children: [t, d && /* @__PURE__ */ B("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			l ? /* @__PURE__ */ B("button", {
				type: "button",
				onClick: l,
				"aria-label": u,
				"data-testid": p ? `${p}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ B("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			c && /* @__PURE__ */ B("span", {
				className: "flex shrink-0 items-center gap-1",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function Vt(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Ht({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ B("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ B("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Ut({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ B(Ht, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ B(y, {
			icon: /* @__PURE__ */ B(m, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ B(Bt, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ B(E, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
			timestamp: Vt(e.pinnedAt),
			timestampIso: e.pinnedAt,
			timestampTitle: e.pinnedAt ? G(e.pinnedAt) : void 0,
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ B("button", {
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
function Wt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ B(Ht, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ B(y, {
			icon: /* @__PURE__ */ B(h, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = $e(e.attachment);
			return /* @__PURE__ */ B(Bt, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ B("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ B(p, {})
				}),
				title: e.attachment.name,
				meta: [e.author, N(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Vt(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? G(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Gt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ B(Ht, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ B(y, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ B(Bt, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ B(E, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Vt(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? G(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Kt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function qt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Jt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ B(Ht, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ B(y, {
			icon: /* @__PURE__ */ B(a, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ B(Bt, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ B("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ B(a, {})
				}),
				title: [Vt(e.startedAt), Kt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : qt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Yt({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
	let o = r && /* @__PURE__ */ V("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ B("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ V("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [o, t.length === 0 ? /* @__PURE__ */ B(y, {
			icon: /* @__PURE__ */ B(p, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ B("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ B(Bt, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ B(p, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Vt(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? G(e.updatedAt) : void 0,
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var Xt = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Zt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function Qt({ name: t, description: r, online: i, avatarUrl: s, features: c = Xt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: te, watchHint: k, watchViewerCount: A, callInProgress: j = !1, headerActions: M, view: ne, onViewChange: N, className: P, "data-testid": F = "conversation-surface" }) {
	let I = new Set(c), [L, H] = R("chat"), re = ne ?? L, U = I.has(re) ? re : c[0] ?? "chat", ie = (e) => {
		ne === void 0 && H(e), N?.(e);
	}, W = (e) => e || void 0, ae = c.filter((e) => Zt[e]).map((e) => ({
		id: e,
		label: Zt[e],
		badge: e === "files" ? W(p.length) : e === "documents" ? W(h.length) : e === "pins" ? W(v.length) : e === "members" ? f == null ? void 0 : W(f) : e === "calls" ? W(C.length) : e === "mentions" ? W(b.filter((e) => e.unread).length) : void 0
	})), oe = (e) => {
		ie("chat"), T?.(e);
	};
	return /* @__PURE__ */ V("section", {
		className: e("flex min-w-0 flex-col", P),
		"data-testid": F,
		children: [
			/* @__PURE__ */ B(ee, {
				name: t,
				description: r,
				online: i,
				avatarUrl: s,
				"data-testid": `${F}-header`,
				tabs: ae.length > 1 ? /* @__PURE__ */ B(x, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: U,
					onValueChange: (e) => ie(e),
					items: ae
				}) : void 0,
				actions: E || O || M ? /* @__PURE__ */ V(z, { children: [
					E && (D ? /* @__PURE__ */ B(n, {
						"aria-label": j ? "Join the call" : "Start a call",
						title: j ? "Join the call" : "Start a call",
						"data-testid": `${F}-call`,
						variant: j ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ B(o, { size: 16 })
					}) : /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B(n, {
						"aria-label": j ? "Join the call with audio" : "Start an audio call",
						title: j ? "Join with audio" : "Audio call",
						"data-testid": `${F}-audio-call`,
						onClick: () => E(!0),
						children: /* @__PURE__ */ B(o, { size: 16 })
					}), /* @__PURE__ */ B(n, {
						"aria-label": j ? "Join the call with video" : "Start a video call",
						title: j ? "Join with video" : "Video call",
						"data-testid": `${F}-video-call`,
						variant: j ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ B(a, { size: 16 })
					})] })),
					O && /* @__PURE__ */ B($t, {
						testId: `${F}-watch`,
						label: te,
						hint: k,
						viewerCount: A,
						onClick: O
					}),
					M
				] }) : void 0
			}),
			I.has("files") && U === "files" && /* @__PURE__ */ B(Wt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? oe : void 0
			}),
			I.has("documents") && U === "documents" && /* @__PURE__ */ B(Yt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			I.has("pins") && U === "pins" && /* @__PURE__ */ B(Ut, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: T ? oe : void 0
			}),
			I.has("members") && U === "members" && /* @__PURE__ */ B("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${F}-members`,
				children: d
			}),
			I.has("mentions") && U === "mentions" && /* @__PURE__ */ B(Gt, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: S ? (e, t) => {
					ie("chat"), S(e, t);
				} : void 0
			}),
			I.has("calls") && U === "calls" && /* @__PURE__ */ B(Jt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			I.has("chat") && /* @__PURE__ */ V("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${F}-chat`,
				hidden: U !== "chat",
				children: [u && /* @__PURE__ */ B("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${F}-canvas`,
					children: u
				}), /* @__PURE__ */ B("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function $t({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ V(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? en,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ B(c, { size: 14 }),
			/* @__PURE__ */ B("span", { children: o }),
			s && /* @__PURE__ */ B("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var en = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { ie as $, Ge as A, J as B, et as C, Xe as D, Qe as E, Ve as F, K as G, De as H, He as I, _e as J, be as K, Re as L, Ue as M, ze as N, Ye as O, Be as P, se as Q, Ie as R, it as S, $e as T, Te as U, ke as V, Se as W, le as X, ge as Y, ce as Z, mt as _, Gt as a, U as at, ut as b, Kt as c, Pt as d, ae as et, ht as f, dt as g, $ as h, Wt as i, re as it, We as j, Je as k, Bt as l, ct as m, Qt as n, G as nt, Jt as o, st as p, ye as q, Yt as r, W as rt, Ut as s, Xt as t, oe as tt, Lt as u, _t as v, nt as w, pt as x, gt as y, Ae as z };
