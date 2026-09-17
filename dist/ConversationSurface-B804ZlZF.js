import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, D as i, N as a, P as o, b as s, d as c, f as l, h as u, n as d, p as f, s as p, u as m, x as h, y as g } from "./Icons-dYlqbmVH.js";
import { f as _, t as v } from "./Chip-BENLwTlq.js";
import { t as y } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as b } from "./EmptyState-JzzL2z1E.js";
import { n as x, o as S, s as C, t as ee } from "./ChannelHeader-BOsRE9TC.js";
import { n as w } from "./DockedPanelContext-pH9A5z1h.js";
import { t as T } from "./Input-DLknWXri.js";
import { t as E } from "./Textarea-Dz4doxTv.js";
import { t as D } from "./Avatar-BzicCOft.js";
import { n as O, t as k } from "./DropdownMenu--cgRPg4y.js";
import { t as te } from "./StatusPill-Db42eiME.js";
import { i as ne, n as A, r as j, t as M } from "./ReactionPickerPopover-CcL-n6gt.js";
import { p as re } from "./MediaIcons-OLUYBJM0.js";
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
function U(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return H[Math.abs(t) % H.length];
}
function ie(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function W(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function ae(e, t) {
	let n = W(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = W(t);
	return r ? n !== r : !1;
}
function oe(e, t = /* @__PURE__ */ new Date()) {
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
function se(e) {
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
function ce(e, t = /* @__PURE__ */ new Date()) {
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
function le(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function ue({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = le(r), m = !o || !!p;
	return /* @__PURE__ */ V("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ B("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ B(D, {
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
var de = /* @__PURE__ */ new Set([
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
]), fe = /^(https?:|mailto:)/i;
function pe(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || fe.test(t) ? t : null;
}
function me(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => me(e, `${t}-${n}`));
	if (!de.has(n.tagName)) return /* @__PURE__ */ B("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ B("br", {}, t);
		case "A": {
			let e = pe(n.getAttribute("href"));
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
var he = /```([\s\S]*?)```|`([^`\n]+)`/g;
function ge(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (he.lastIndex = 0; (r = he.exec(e)) !== null;) {
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
function _e({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = I(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => me(e, `n${t}`));
	}, [t]), o = I(() => ge(n ?? ""), [n]);
	return /* @__PURE__ */ B("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ve({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ V("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ B(m, { size: 18 })
			}),
			/* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ B("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ B("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${ye(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ B(O, {
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
function ye(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function be({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ V("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [r ? /* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ B(m, {
			size: 12,
			className: "shrink-0 text-text-tertiary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ B("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function K(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function xe(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function q(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Se({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? K(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? xe(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
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
						children: q(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ B(O, {
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
	return /* @__PURE__ */ V("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ B("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ B(D, {
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
function Oe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: m = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: ee, "data-testid": w = "recording-activity-card" }) {
	let T = o ?? a.length, E = u === "gone", D = u !== "saving" && u !== "failed" && !E && !!g, ne = () => {
		g?.(n);
	}, A = c != null && c > 0 ? K(c) : "", j = we(s), M = Ee(a, T), { state: re, label: N } = Ce[u], P = [
		...g && D ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: ne
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
			label: m ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && D ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], F = P.length ? [{
		items: P,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ V("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", ee),
		children: [/* @__PURE__ */ V("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ V("button", {
				type: "button",
				onClick: D ? ne : void 0,
				disabled: !D,
				"aria-label": D ? `Play ${r.toLowerCase()}` : `${r}: ${N.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", D ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ B("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ B(De, {
						participants: a,
						total: T,
						testId: w
					}),
					D && /* @__PURE__ */ B("span", {
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
					A && /* @__PURE__ */ B("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: A
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
							}), m && /* @__PURE__ */ B("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ B(h, { size: 12 })
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
							children: [/* @__PURE__ */ B(O, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: C
							}), /* @__PURE__ */ B("span", {
								className: "truncate text-xs text-text-tertiary",
								children: M
							})]
						}),
						/* @__PURE__ */ V("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ B(te, {
									state: re,
									label: N,
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
								j && /* @__PURE__ */ B("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: j
								})
							]
						})
					]
				}), F.length > 0 && /* @__PURE__ */ B(k, {
					trigger: /* @__PURE__ */ B("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: F,
					"data-testid": `${w}-menu`
				})]
			})]
		}), p && u !== "failed" && !E && /* @__PURE__ */ V("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ V("span", { children: ["Set to expire ", Te(p)] }), S && /* @__PURE__ */ B(t, {
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
function ke(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function J(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Y(e, t) {
	let n = e.names && e.names.length > 0 ? ke(e.names) : e.userIds.length > 0 ? ke(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = J(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ae({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Y(t, n);
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
function X(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Le(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Z(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${X(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${X(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${X(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Le(e.index)}`;
		case "deleteBlock": return `Removed block ${Le(e.index)}`;
		case "appendMacro": return t ? `Added a ${X(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Le(e.index)}`;
		case "setDocumentType": return `Type: ${X(t, 40)}`;
		case "skip": return t ? X(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${X(t)}` : e.op;
	}
}
function Re(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function ze(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function Be(e) {
	if (!e?.startedAt) return null;
	let t = Re(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? ze(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Ve = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function He({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: h, suggestion: g, onReview: _, documentTitle: y, defaultExpanded: b = !1, className: x, "data-testid": S = "agent-run-card" }) {
	let C = c?.phase ?? "received", [ee, w] = R(b), T = C === "completed" ? c?.suggestion ?? g : void 0, E = C === "completed" ? c?.review : void 0, D = !!T && !E, O = C === "completed" && c?.noop === !0, k = C === "completed" ? c?.result ?? d : void 0, te = k?.kind === "link" && k.label ? k.label : "Open", ne = l && !(k?.kind === "document" && f), A = Me[C], j = C === "failed" || C === "rejected", M = j ? "danger" : E ? E.decision === "accept" ? "success" : "neutral" : O ? "warning" : C === "completed" ? T ? "warning" : "success" : C === "awaiting_approval" ? "warning" : "info", N = E ? "Reviewed" : D ? "Suggested" : O ? "No change" : Ne[C], P = E ? E.byName ?? E.by : void 0, F = E ? `${E.decision === "accept" ? "Accepted" : "Rejected"} by ${P}` : void 0, I = C === "awaiting_approval", L = C === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : I ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : F ?? c?.detail ?? (D && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : C === "received" ? "Received" : N), z = c?.details, H = z?.ops ?? [], U = z?.steps ?? [], ie = z?.document?.title || y || "Document", W = !!z?.document || !!l, ae = z?.error ?? (C === "failed" ? c?.detail : void 0), oe = Be(z), se = `${S}-details-${r}`, G = !!(D && T && _ || I && h || k && f || k?.kind === "link" && !f);
	return /* @__PURE__ */ V("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", x),
		"data-testid": S,
		"data-phase": C,
		"data-run-id": r,
		"data-expanded": ee ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || w((e) => !e);
		},
		children: [
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ B(re, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ V("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${S}-instruction`,
						children: [
							/* @__PURE__ */ B("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ B(v, {
						size: "xs",
						tone: M,
						"data-testid": `${S}-phase`,
						children: N
					}),
					/* @__PURE__ */ B(n, {
						size: "sm",
						"aria-label": ee ? "Hide details" : "Show details",
						"aria-expanded": ee,
						"aria-controls": ee ? se : void 0,
						onClick: () => w((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${S}-toggle`,
						icon: /* @__PURE__ */ B(p, {
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
							"data-testid": `${S}-steps`,
							children: je.map((t, n) => {
								let r = j ? n < A : n < A || n === A && C === "completed", i = n === A && C !== "completed" && !j, a = j && n === A;
								return /* @__PURE__ */ V("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ B("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? O && n === A ? "bg-warning" : "bg-success" : i ? I ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ B("span", {
										className: "sr-only",
										children: a ? N : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ B("span", {
							className: e("min-w-0 flex-1 truncate", E && (E.decision === "accept" ? "text-success" : "text-text-tertiary"), C === "failed" && "text-danger", O && "text-warning-fg"),
							"data-testid": `${S}-detail`,
							"data-review": E?.decision,
							title: c?.detail,
							children: L
						})]
					}),
					D && T && _ && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-review`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(r, "accept", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${S}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(r, "reject", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${S}-reject-review`,
							children: "Reject"
						})]
					}),
					I && h && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-decide`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "approve"),
							"data-testid": `${S}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "reject"),
							"data-testid": `${S}-reject`,
							children: "Reject"
						})]
					}),
					k && f && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: () => f(k),
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": k.kind,
						children: te
					}),
					k?.kind === "link" && !f && /* @__PURE__ */ B("a", {
						href: k.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": "link",
						children: te
					}),
					u && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: () => u(r),
						className: Ie,
						"data-testid": `${S}-open-run`,
						children: "Open run"
					}),
					ne && /* @__PURE__ */ B("button", {
						type: "button",
						onClick: l,
						className: Ie,
						"data-testid": `${S}-open-document`,
						children: "Open document"
					})
				]
			}),
			ee && /* @__PURE__ */ V("div", {
				id: se,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${S}-details`,
				children: [
					W && /* @__PURE__ */ V("div", {
						className: "flex items-start gap-2",
						"data-testid": `${S}-details-document`,
						children: [
							/* @__PURE__ */ B(m, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ V("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ B("span", {
									className: "block truncate font-medium text-text-primary",
									children: ie
								}), z?.document?.snippet && /* @__PURE__ */ B("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${S}-details-snippet`,
									children: z.document.snippet
								})]
							}),
							l && /* @__PURE__ */ B(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${S}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ V("div", {
						"data-testid": `${S}-details-ops`,
						children: [
							/* @__PURE__ */ B("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ B("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: H.slice(0, Pe).map((e, t) => /* @__PURE__ */ B("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Z(e)
								}, t))
							}),
							H.length > Pe && /* @__PURE__ */ V("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${S}-details-more-ops`,
								children: [
									"+",
									H.length - Pe,
									" more"
								]
							})
						]
					}),
					U.length > 0 && /* @__PURE__ */ B("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${S}-details-steps`,
						children: U.map((t) => /* @__PURE__ */ V("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ B("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ve[t.status] ?? Ve.pending)
							}), /* @__PURE__ */ B("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ae && /* @__PURE__ */ B("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${S}-details-error`,
						children: ae
					}),
					/* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => u(r),
								className: e(Fe, "hover:text-text-primary"),
								"data-testid": `${S}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							k && f && /* @__PURE__ */ B("button", {
								type: "button",
								onClick: () => f(k),
								className: e(Fe, "font-medium text-info"),
								"data-testid": `${S}-details-open-result`,
								children: te
							}),
							oe && /* @__PURE__ */ B("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${S}-details-timings`,
								children: oe
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
function Q(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Ke({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = I(() => Ge(t, n), [t, n]);
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
			title: Q(t),
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
var qe = [
	"👍",
	"🎉",
	"❤️"
], Je = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ye({ quickReactions: t = qe, onReact: n, onOpenReactionPicker: o, onReply: s, onForward: l, onTogglePin: d, pinned: p = !1, onCopyLink: m, onEdit: g, onDelete: _, className: v, "data-testid": y = "message-actions" }) {
	let b = (e, t, n, r) => /* @__PURE__ */ B("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${y}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Je}`,
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
			o && b("More reactions", o, /* @__PURE__ */ B(r, { size: 14 }), "more-reactions"),
			s && b("Reply", s, /* @__PURE__ */ B(i, { size: 14 }), "reply"),
			l && b("Forward to another conversation", (e) => l(e.currentTarget), /* @__PURE__ */ B(f, { size: 14 }), "forward"),
			d && b(p ? "Unpin" : "Pin to channel", d, /* @__PURE__ */ B(h, { size: 14 }), "pin"),
			m && b("Copy link to message", m, /* @__PURE__ */ B(u, { size: 14 }), "copy-link"),
			g && b("Edit message", g, /* @__PURE__ */ B(c, { size: 13 }), "edit"),
			_ && b("Delete message", _, /* @__PURE__ */ B(a, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Xe({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
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
			/* @__PURE__ */ B(E, {
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
function Ze(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Qe(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function $e({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ V("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ B("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ B("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Qe(t.timestamp)
		})]
	}), /* @__PURE__ */ B("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Ze(t.text)
	})] });
	return /* @__PURE__ */ V("div", {
		"data-testid": a,
		"data-quoted-message-id": t.messageId,
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
function et(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function tt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = et(t), o = n ?? t.preview;
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
			children: [/* @__PURE__ */ B(it, {}), /* @__PURE__ */ V("span", {
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
function nt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function rt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
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
			}) : /* @__PURE__ */ B(it, {}),
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
function it() {
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
function at({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = oe(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ V("div", {
		role: "separator",
		"aria-label": se(t),
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
function ot(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function st(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function ct(e) {
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
function lt(e) {
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
var ut = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function dt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => ut[e] ?? e)
	};
}
function ft(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function pt(e) {
	return `${ft(e)}:`;
}
function mt(e, t) {
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
function ht(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = pt(t);
	if (n) {
		let t = mt(n, r);
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
function gt(e) {
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
function _t(e) {
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
function vt(e) {
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
function yt(e) {
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
function bt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function xt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(bt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function St(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Ct(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function wt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = St(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = St(r), i = Ct(r);
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
		let e = St(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = St(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Tt = 3, Et = 2, Dt = 3e5;
function Ot(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function kt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Ue(e.metadata) || vt(e.metadata) || _t(e.metadata) || ct(e.metadata) || yt(e.metadata));
}
function At(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Ot(r);
	if (!i || i !== Ot(n) || !kt(n) || !kt(r) || r.editedAt || ae(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Dt;
}
function jt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Mt({ tone: t = "light" }) {
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
function Nt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Pt(e) {
	return e.displayName || e.userId;
}
function Ft(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Ot(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function It({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: d, onToggleReaction: f, onReply: p, onForwardMessage: m, onTogglePin: g, onEditMessage: _, onDeleteMessage: v, pinnedMessageIds: b, onJumpToMessage: S, highlightedMessageId: ee, threaded: E = !1, alignOwnMessages: O = !0, documentEditors: k, callParticipants: te, agentRunStatus: re, onOpenRun: N, onOpenResult: I, onDecideRun: H, onReviewRun: U, onJoinCall: ie, onOpenRecording: W, onCopyRecordingLink: oe, onShareRecording: se, onDownloadRecording: ce, onOpenRecordingTranscript: le, onManageRecordingExpiry: de, recordingStatus: fe, onOpenDocument: pe, tone: me = "light", showHeader: he, fill: ge, onLoadMore: ye, hasMore: K, loadingMore: xe = !1, onSendFiles: q, transfers: Ce = [], currentActor: we, onCancelTransfer: Te, attachmentSrc: Ee, onOpenAttachment: De, acceptFiles: ke, maxFileSize: J, onFileError: Y, readReceipts: je, readReceiptsEnabled: Me = !0, unreadFrom: Ne, emojis: Pe = M }) {
	let [Fe, Ie] = R(null), [X, Le] = R(null), Z = me === "dark", Re = w(), ze = he ?? !(Re?.hasHeader ?? !1), Be = ge ?? Re?.fillsHeight ?? !1, [Ve, We] = R(""), Ge = L(null), Q = L(null), qe = !!ye && K !== !1, Je = L(null), Ze = L(null), [Qe, et] = R(!1), it = !!q && !a, ut = xt(n, r), pt = E ? wt(ut) : null, [mt, Ct] = R(() => /* @__PURE__ */ new Set());
	function Dt(e) {
		Ct((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Ot = L(void 0);
	if (Ne !== void 0) {
		let e = Ot.current;
		if (e === void 0) Ot.current = Ne;
		else {
			let t = Date.parse(Ne), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Ot.current = Ne);
		}
	}
	let kt = Ot.current, It = kt === void 0 ? -1 : jt(pt ? pt.map((e) => bt(e.root)) : ut.map((e) => bt(e)), kt), Rt = je !== void 0, zt = je ?? [], Bt = Me && u ? u : void 0, Vt = (() => {
		if (Bt) for (let e = ut.length - 1; e >= 0; --e) {
			let t = ut[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Bt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), $ = Vt && Bt ? Nt(zt, Bt, Vt.timestamp) : [], Ht = $.length === 1 && !!Bt && Ft(n, zt, Bt) === 1;
	function Ut() {
		if (!Vt) return null;
		if ($.length === 0) return Rt ? /* @__PURE__ */ B("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", O ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ B("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = $.map(Pt), n = $.slice(0, 3);
		return /* @__PURE__ */ V("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", O ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				$.length > 1 && /* @__PURE__ */ B("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ B(D, {
						name: Pt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ B("span", {
					"data-testid": "chat-read-receipts-label",
					children: Ht ? "Seen" : `Seen by ${$.length}`
				}),
				/* @__PURE__ */ B("span", {
					style: C,
					children: Ht ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Wt, Gt] = R(0), [Kt, qt] = R(!1), Jt = L(!0), Yt = L(n.length), Xt = n.length + r.length + Ce.length, Zt = L(null), [Qt, $t] = R(""), en = L(null), tn = L(!1), nn = L(0);
	F(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!tn.current) {
			tn.current = !0, en.current = t;
			return;
		}
		if (t === en.current || (en.current = t, u && e.userId === u)) return;
		nn.current += 1;
		let r = nn.current % 2 == 0 ? "​" : "";
		$t(st(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function rn() {
		let e = Ge.current;
		e && (e.scrollTop = e.scrollHeight, Jt.current = !0, Gt(0));
	}
	function an() {
		let e = Ge.current;
		if (!e) return;
		let t = ot(e);
		Jt.current = t, t && Gt(0), qt(e.scrollTop > 8);
	}
	F(() => {
		let e = Ge.current, t = Yt.current, n = Xt - t;
		if (Yt.current = Xt, !e) return;
		let r = Zt.current;
		if (r && n > 0) {
			Zt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Jt.current ? (e.scrollTop = e.scrollHeight, Gt(0), qt(e.scrollTop > 8)) : n > 0 && Gt((e) => e + n);
	}, [Xt]);
	function on() {
		let e = Ge.current;
		e && (Zt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), ye?.();
	}
	F(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function sn() {
		let e = Ve.trim();
		!e || a || (Q.current && clearTimeout(Q.current), Q.current = null, o?.(!1), Jt.current = !0, i(e), We(""));
	}
	function cn(e) {
		!it || e.length === 0 || (Jt.current = !0, q?.(e));
	}
	function ln(e) {
		if (!it) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), cn(t));
	}
	function un(e) {
		We((t) => t + e), et(!1);
	}
	function dn() {
		a || (o?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => o?.(!1), 2e3));
	}
	function fn(e) {
		dn(), e.key === "Enter" && !a && Ve.trim() && sn();
	}
	function pn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === It ? /* @__PURE__ */ B(Mt, { tone: me }) : null, l = !c && At(a, n), y = !o && ae(s, i) ? /* @__PURE__ */ B(at, {
			timestamp: s,
			tone: me
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Ue(r.metadata);
			return /* @__PURE__ */ V(P, { children: [
				y,
				c,
				/* @__PURE__ */ B("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ B(ue, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: me,
						mine: !0,
						content: /* @__PURE__ */ V(z, { children: [
							i ? /* @__PURE__ */ B(He, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: re?.(i.runId),
								onOpenDocument: pe && i.documentId ? () => pe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: N,
								result: i.result,
								onOpenResult: I,
								onDecide: H,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: U
							}) : /* @__PURE__ */ B(_e, { text: r.content }),
							/* @__PURE__ */ B("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
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
		let { message: x } = n, C = x.displayName ?? x.clientId.slice(0, 8), w = x.attachments ?? [], T = x.metadata?.html, E = typeof T == "string" ? T : void 0, D = gt(x.metadata), ne = ht(x.content, D, E), A = /* @__PURE__ */ B(_e, {
			html: ne.html,
			text: ne.body
		}), j = ct(x.metadata), M = Ue(x.metadata), F = _t(x.metadata), L = vt(x.metadata), R = yt(x.metadata), he = dt(x.metadata), ge = lt(x.metadata), ye = M ? /* @__PURE__ */ B(He, {
			runId: M.runId,
			instruction: M.instruction || x.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: x.displayName,
			status: re?.(M.runId),
			onOpenDocument: pe && M.documentId ? () => pe(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: N,
			result: M.result,
			onOpenResult: I,
			onDecide: H,
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
			return /* @__PURE__ */ B(Oe, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? x.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!x.id && !!b?.has(x.id),
				onOpen: W,
				onCopyLink: oe,
				onShare: se,
				onDownload: ce,
				onOpenTranscript: le,
				onManageExpiry: de,
				onTogglePin: g ? () => g(x) : void 0
			});
		})() : F ? /* @__PURE__ */ B(Se, {
			callId: F.callId,
			startedBy: (typeof x.metadata?.displayName == "string" ? x.metadata.displayName : void 0) ?? x.displayName,
			participants: te?.(F.callId) ?? F.participants,
			live: F.live,
			durationMs: F.durationMs,
			audioOnly: F.audioOnly,
			recorded: F.recorded,
			notRecordedReason: F.notRecordedReason,
			lobbyName: F.lobbyName,
			onJoin: ie
		}) : j ? /* @__PURE__ */ B(ve, {
			documentId: j.documentId,
			title: j.title || x.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof x.metadata?.displayName == "string" ? x.metadata.displayName : void 0) ?? x.displayName,
			editors: k?.(j.documentId) ?? [],
			onOpen: pe
		}) : w.length === 0 ? A : /* @__PURE__ */ V(z, { children: [(x.content || E) && A, w.map((e) => /* @__PURE__ */ B(tt, {
			attachment: e,
			src: Ee?.(e),
			onOpen: De
		}, e.id))] }), K = x.id ?? "", xe = K && d ? d(K) : [], q = x.metadata?.replyTo, Ce = !!o && !!q && q.messageId === o.rootId, we = !!q && !Ce, Te = !!K && !!b?.has(K), ke = !!u && x.userId === u, J = x.metadata?.system === !0, Y = !!x.deletedAt || x.metadata?.deleted === !0, je = !!(M || L || F || j || R), Me = ke && !Y && !J && !je && !!K, Ne = !!K && !Y && !J && !je && w.length === 0 && !!x.content.trim(), Pe = Me && !!_ && Fe === K, X = /* @__PURE__ */ V(z, { children: [
			we && q && /* @__PURE__ */ B($e, {
				quote: q,
				onJump: S,
				className: "mb-1"
			}),
			D && /* @__PURE__ */ V("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [ft(D), D.timestamp ? G(D.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ B("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					ne.stripped ? ft(D) : "Forwarded"
				]
			}),
			Te && /* @__PURE__ */ V("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ B(h, { size: 11 }), " Pinned"]
			}),
			Y ? /* @__PURE__ */ B("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Pe ? /* @__PURE__ */ B(Xe, {
				initialText: x.content,
				onSave: async (e) => {
					await _(x, e), Ie(null);
				},
				onCancel: () => Ie(null)
			}) : ye,
			!Y && ge.length > 0 && /* @__PURE__ */ B("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: ge.map((e) => /* @__PURE__ */ B(be, {
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
			!Y && xe.length > 0 && u && f && /* @__PURE__ */ B(Ke, {
				reactions: xe,
				currentUserId: u,
				onToggle: (e) => f(K, e)
			})
		] });
		return R ? /* @__PURE__ */ V(P, { children: [
			y,
			c,
			/* @__PURE__ */ B(Ae, {
				membership: R,
				fallbackText: x.content,
				timestamp: x.timestamp,
				"data-testid": "membership-notice"
			})
		] }, x.id ?? r) : /* @__PURE__ */ V(P, { children: [
			y,
			c,
			/* @__PURE__ */ V("div", {
				"data-testid": "chat-message",
				"data-message-id": K || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? G(x.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", K && K === ee && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ B(ue, {
					author: C,
					content: X,
					timestamp: l ? "" : x.timestamp,
					editedAt: Y ? void 0 : x.editedAt,
					avatarUrl: x.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: me,
					mine: ke && O
				}), K && !Y && !Pe && (f || Me || Ne && m || !J && (p || g)) && /* @__PURE__ */ B(Ye, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: f ? (e) => f(K, e) : void 0,
					onReply: p && !J ? () => p(o?.rootMessage ?? x) : void 0,
					onForward: m && Ne ? (e) => m(x, e) : void 0,
					onTogglePin: g && !J ? () => g(x) : void 0,
					pinned: !!x.id && !!b?.has(x.id),
					onEdit: Me && _ ? () => Ie(K) : void 0,
					onDelete: Me && v ? () => Le(K) : void 0
				})]
			}),
			!!Vt && K === Vt.id && Ut()
		] }, x.id ?? r);
	}
	function mn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function hn(e) {
		if (!p || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !yt(t.metadata)) return t;
	}
	function gn(t, n, r) {
		let i = bt(r?.root), a = r && r.replies.length === 0 && !hn(r.root) ? r.root : void 0, o = pn(t.root, n, i, a), s = bt(t.root) ?? "", c = n > 0 && n !== It && !ae(s, i) ? /* @__PURE__ */ B("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, l = hn(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ V(P, { children: [c, o] }, `post:${St(t.root) ?? n}`) : o;
		let u = St(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Tt, m = !f || mt.has(u), h = m ? t.replies : t.replies.slice(0, Et), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(mn))].slice(0, 3), v = t.replies.length === 0;
		return /* @__PURE__ */ V(P, { children: [c, /* @__PURE__ */ V("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ V("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => pn(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ V("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => Dt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ B("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ B(D, {
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
						"aria-label": `Reply to ${mn(t.root)}`,
						onClick: () => p?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", v && e("opacity-0 transition-opacity", "group-hover/post:opacity-100 group-has-[:focus-visible]/post:opacity-100", "[@media(hover:none)]:opacity-100"), Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let _n = /* @__PURE__ */ V("div", {
		"data-testid": "chat-panel",
		className: e(Be ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			ze && /* @__PURE__ */ V("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ B("span", {
				style: C,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Qt
			}),
			/* @__PURE__ */ V("div", {
				className: e("relative flex flex-col mb-2", Be ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ B("div", {
					ref: Ge,
					onScroll: an,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Kt && "fade-top", Be ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ V("div", {
						className: "mt-auto pb-4",
						children: [
							qe && n.length > 0 && /* @__PURE__ */ B("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ B("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: on,
									disabled: xe,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: xe ? "Loading…" : "Load earlier messages"
								})
							}),
							ut.length === 0 ? c ?? /* @__PURE__ */ B("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : pt ? pt.map((e, t) => gn(e, t, pt[t - 1])) : ut.map((e, t) => pn(e, t, bt(ut[t - 1]), ut[t - 1])),
							v && /* @__PURE__ */ B(y, {
								open: X !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Le(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === X);
									Le(null), e && v(e);
								}
							}),
							Ce.map((e) => /* @__PURE__ */ B(ue, {
								author: e.actor,
								timestamp: "",
								tone: me,
								content: /* @__PURE__ */ B(rt, {
									transfer: e,
									mine: nt(e, u, we),
									onCancel: Te
								})
							}, e.transferId))
						]
					})
				}), Wt > 0 && /* @__PURE__ */ V("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: rn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Wt,
						" new message",
						Wt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ B(x, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Z ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ B("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? dn : void 0,
				children: l
			}) : /* @__PURE__ */ V("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					q && /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !it,
						onClick: () => Je.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ B(Lt, {})
					}), /* @__PURE__ */ B(ne, {
						ref: Je,
						multiple: !0,
						accept: ke,
						onFiles: (e) => {
							let t = J ? e.filter((e) => e.size > J) : [];
							t.length > 0 && Y?.(`Skipped ${t.length} file(s) over the size limit.`), cn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ B("button", {
						ref: Ze,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Qe,
						title: "Insert emoji",
						disabled: a,
						onClick: () => et((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ B("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ B(A, {
						open: Qe,
						onSelect: un,
						onClose: () => et(!1),
						triggerRef: Ze,
						emojis: Pe
					}),
					/* @__PURE__ */ B(T, {
						size: "sm",
						value: Ve,
						onChange: (e) => We(e.target.value),
						onKeyDown: fn,
						onPaste: ln,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ B(t, {
						variant: "primary",
						size: "sm",
						onClick: sn,
						disabled: a || !Ve.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return q ? /* @__PURE__ */ B(j, {
		onFiles: cn,
		accept: ke,
		maxSize: J,
		onError: Y,
		disabled: a,
		className: Be ? "flex h-full min-h-0 flex-col" : void 0,
		children: _n
	}) : _n;
}
function Lt() {
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
function Rt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function zt({ users: e, currentClientId: t }) {
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
			let n = U(Rt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = ie(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
var Bt = "min-w-0 truncate", Vt = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function $({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": p, ...m }) {
	let h = r ? i ? /* @__PURE__ */ B("time", {
		dateTime: i,
		title: a,
		className: Vt,
		children: r
	}) : /* @__PURE__ */ B("span", {
		title: a,
		className: Vt,
		children: r
	}) : null, g = /* @__PURE__ */ V("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ V("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ B("span", {
				"data-line": "primary",
				title: n,
				className: e(Bt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), h]
		}), /* @__PURE__ */ B("span", {
			"data-line": "secondary",
			title: o,
			className: e(Bt, "text-[11px] leading-snug", s ? _[s] : "text-text-tertiary"),
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
				children: g
			}) : /* @__PURE__ */ B("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: g
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
function Ht(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Ut({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ B("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ B("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Wt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ B(Ut, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ B(b, {
			icon: /* @__PURE__ */ B(h, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${G(e.sentAt)} · pinned ${G(e.pinnedAt)}` : G(r) : void 0;
			return /* @__PURE__ */ B($, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ B(D, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: Ht(r),
				timestampIso: r,
				timestampTitle: i,
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
			}, e.messageId);
		})
	});
}
function Gt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ B(Ut, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ B(b, {
			icon: /* @__PURE__ */ B(g, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = et(e.attachment);
			return /* @__PURE__ */ B($, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ B("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ B(m, {})
				}),
				title: e.attachment.name,
				meta: [e.author, N(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Ht(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? G(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Kt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ B(Ut, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ B(b, {
			icon: /* @__PURE__ */ B(d, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ B($, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ B(D, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Ht(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? G(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function qt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Jt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Yt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ B(Ut, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ B(b, {
			icon: /* @__PURE__ */ B(o, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ B($, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ B("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ B(o, {})
				}),
				title: [Ht(e.startedAt), qt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Jt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Xt({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
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
		children: [o, t.length === 0 ? /* @__PURE__ */ B(b, {
			icon: /* @__PURE__ */ B(m, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ B("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ B($, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ B("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ B(m, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Ht(e.updatedAt),
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
var Zt = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Qt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function $t({ name: t, description: r, online: i, avatarUrl: a, features: c = Zt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: k, watchHint: te, watchViewerCount: ne, callInProgress: A = !1, headerActions: j, view: M, onViewChange: re, className: N, "data-testid": P = "conversation-surface" }) {
	let F = new Set(c), [I, L] = R("chat"), H = M ?? I, U = F.has(H) ? H : c[0] ?? "chat", ie = (e) => {
		M === void 0 && L(e), re?.(e);
	}, W = (e) => e || void 0, ae = c.filter((e) => Qt[e]).map((e) => ({
		id: e,
		label: Qt[e],
		badge: e === "files" ? W(p.length) : e === "documents" ? W(h.length) : e === "pins" ? W(v.length) : e === "members" ? f == null ? void 0 : W(f) : e === "calls" ? W(C.length) : e === "mentions" ? W(b.filter((e) => e.unread).length) : void 0
	})), oe = (e) => {
		ie("chat"), T?.(e);
	};
	return /* @__PURE__ */ V("section", {
		className: e("flex min-w-0 flex-col", N),
		"data-testid": P,
		children: [
			/* @__PURE__ */ B(ee, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${P}-header`,
				tabs: ae.length > 1 ? /* @__PURE__ */ B(S, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: U,
					onValueChange: (e) => ie(e),
					items: ae
				}) : void 0,
				actions: E || O || j ? /* @__PURE__ */ V(z, { children: [
					E && (D ? /* @__PURE__ */ B(n, {
						"aria-label": A ? "Join the call" : "Start a call",
						title: A ? "Join the call" : "Start a call",
						"data-testid": `${P}-call`,
						variant: A ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ B(s, { size: 16 })
					}) : /* @__PURE__ */ V(z, { children: [/* @__PURE__ */ B(n, {
						"aria-label": A ? "Join the call with audio" : "Start an audio call",
						title: A ? "Join with audio" : "Audio call",
						"data-testid": `${P}-audio-call`,
						onClick: () => E(!0),
						children: /* @__PURE__ */ B(s, { size: 16 })
					}), /* @__PURE__ */ B(n, {
						"aria-label": A ? "Join the call with video" : "Start a video call",
						title: A ? "Join with video" : "Video call",
						"data-testid": `${P}-video-call`,
						variant: A ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ B(o, { size: 16 })
					})] })),
					O && /* @__PURE__ */ B(en, {
						testId: `${P}-watch`,
						label: k,
						hint: te,
						viewerCount: ne,
						onClick: O
					}),
					j
				] }) : void 0
			}),
			F.has("files") && U === "files" && /* @__PURE__ */ B(Gt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? oe : void 0
			}),
			F.has("documents") && U === "documents" && /* @__PURE__ */ B(Xt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			F.has("pins") && U === "pins" && /* @__PURE__ */ B(Wt, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: T ? oe : void 0
			}),
			F.has("members") && U === "members" && /* @__PURE__ */ B("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${P}-members`,
				children: d
			}),
			F.has("mentions") && U === "mentions" && /* @__PURE__ */ B(Kt, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					ie("chat"), x(e, t);
				} : void 0
			}),
			F.has("calls") && U === "calls" && /* @__PURE__ */ B(Yt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			F.has("chat") && /* @__PURE__ */ V("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${P}-chat`,
				hidden: U !== "chat",
				children: [u && /* @__PURE__ */ B("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${P}-canvas`,
					children: u
				}), /* @__PURE__ */ B("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function en({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ V(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? tn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ B(l, { size: 14 }),
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
var tn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { W as $, Ke as A, Y as B, tt as C, Ze as D, $e as E, Ue as F, xe as G, Oe as H, We as I, ve as J, K, Be as L, Ge as M, Ve as N, Xe as O, He as P, ce as Q, Z as R, at as S, et as T, Ee as U, J as V, Se as W, ue as X, _e as Y, le as Z, gt as _, Kt as a, ie as at, dt as b, qt as c, It as d, oe as et, _t as f, ft as g, pt as h, Gt as i, U as it, Q as j, Ye as k, $ as l, lt as m, $t as n, G as nt, Yt as o, ct as p, be as q, Xt as r, ae as rt, Wt as s, Zt as t, se as tt, zt as u, yt as v, rt as w, ht as x, vt as y, Ae as z };
