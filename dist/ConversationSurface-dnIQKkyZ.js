import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, D as i, N as a, P as o, b as s, d as c, f as l, h as u, p as d, s as f, u as p, x as m, y as h } from "./Icons-dYlqbmVH.js";
import { f as g, t as _ } from "./Chip-BENLwTlq.js";
import { t as v } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as y } from "./EmptyState-JzzL2z1E.js";
import { n as b, o as ee, s as x, t as S } from "./ChannelHeader-BOsRE9TC.js";
import { n as C } from "./DockedPanelContext-pH9A5z1h.js";
import { t as w } from "./Input-DLknWXri.js";
import { t as T } from "./Textarea-Dz4doxTv.js";
import { t as E } from "./Avatar-BzicCOft.js";
import { n as D, t as O } from "./DropdownMenu--cgRPg4y.js";
import { t as k } from "./StatusPill-Db42eiME.js";
import { i as A, n as te, r as j, t as M } from "./ReactionPickerPopover-CcL-n6gt.js";
import { p as ne } from "./MediaIcons-OLUYBJM0.js";
import { t as re } from "./formatBytes-05ivRSJY.js";
import { Fragment as N, useEffect as P, useMemo as F, useRef as I, useState as L } from "react";
import { Fragment as ie, jsx as R, jsxs as z } from "react/jsx-runtime";
//#region src/utils/identity.ts
var B = [
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
function V(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return B[Math.abs(t) % B.length];
}
function H(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function ae(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function U(e, t) {
	let n = ae(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = ae(t);
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
function W(e) {
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
	return /* @__PURE__ */ z("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ R("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ R(E, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ z("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ z("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ R("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ R("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: W(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ R("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${W(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ R("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ R("div", {
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
	if (!de.has(n.tagName)) return /* @__PURE__ */ R("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ R("br", {}, t);
		case "A": {
			let e = pe(n.getAttribute("href"));
			return e ? /* @__PURE__ */ R("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ R("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ R("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ R(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ R("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ R("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ R("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function _e({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = F(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => me(e, `n${t}`));
	}, [t]), o = F(() => ge(n ?? ""), [n]);
	return /* @__PURE__ */ R("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ve({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ z("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ R("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ R(p, { size: 18 })
			}),
			/* @__PURE__ */ z("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ R("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ R("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${ye(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ R("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ R(D, {
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
			o && /* @__PURE__ */ R("button", {
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
	return /* @__PURE__ */ z("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [r ? /* @__PURE__ */ R("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ R(p, {
			size: 12,
			className: "shrink-0 text-text-tertiary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ R("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function xe(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function G(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function Se(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Ce({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? xe(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? G(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
	return /* @__PURE__ */ z("div", {
		"data-testid": f,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ R("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ z("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ R("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${m} in progress` : m
					}),
					/* @__PURE__ */ R("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: h
					}),
					!i && s === !1 && /* @__PURE__ */ R("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${f}-not-recorded`,
						children: Se(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ R("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ R(D, {
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
			i && u && /* @__PURE__ */ R("button", {
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
var K = {
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
	return /* @__PURE__ */ z("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ R("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ R(E, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ z("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ R("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ R("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ R("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Oe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: ee, onManageExpiry: x, onParticipantClick: S, className: C, "data-testid": w = "recording-activity-card" }) {
	let T = o ?? a.length, E = u === "gone", A = u !== "saving" && u !== "failed" && !E && !!g, te = () => {
		g?.(n);
	}, j = c != null && c > 0 ? xe(c) : "", M = we(s), ne = Ee(a, T), { state: re, label: N } = K[u], P = [
		...g && A ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: te
		}] : [],
		...ee && d ? [{
			"data-testid": `${w}-menu-transcript`,
			label: "Transcript",
			onSelect: () => ee(n)
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
		...b && A ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], F = P.length ? [{
		items: P,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ z("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", C),
		children: [/* @__PURE__ */ z("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ z("button", {
				type: "button",
				onClick: A ? te : void 0,
				disabled: !A,
				"aria-label": A ? `Play ${r.toLowerCase()}` : `${r}: ${N.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", A ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ R("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ R(De, {
						participants: a,
						total: T,
						testId: w
					}),
					A && /* @__PURE__ */ R("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ R("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ R("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ R("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					j && /* @__PURE__ */ R("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: j
					})
				]
			}), /* @__PURE__ */ z("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ z("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ z("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ R("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${w}-title`,
								children: r
							}), h && /* @__PURE__ */ R("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ R(m, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ z("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${w}-by`,
							children: ["by ", i]
						}),
						T > 0 && /* @__PURE__ */ z("div", {
							className: "flex items-center gap-2",
							"data-testid": `${w}-people`,
							children: [/* @__PURE__ */ R(D, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: S
							}), /* @__PURE__ */ R("span", {
								className: "truncate text-xs text-text-tertiary",
								children: ne
							})]
						}),
						/* @__PURE__ */ z("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ R(k, {
									state: re,
									label: N,
									size: "sm",
									"data-testid": `${w}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ R(k, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${w}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ R(k, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${w}-summary`
								}),
								M && /* @__PURE__ */ R("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: M
								})
							]
						})
					]
				}), F.length > 0 && /* @__PURE__ */ R(O, {
					trigger: /* @__PURE__ */ R("span", {
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
		}), p && u !== "failed" && !E && /* @__PURE__ */ z("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ z("span", { children: ["Set to expire ", Te(p)] }), x && /* @__PURE__ */ R(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => x(n),
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
function Ae(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function q(e, t) {
	let n = e.names && e.names.length > 0 ? ke(e.names) : e.userIds.length > 0 ? ke(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = Ae(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function je({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = q(t, n);
	return /* @__PURE__ */ z("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ R("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ R("time", {
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
var J = [
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
function Y(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Le(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Re(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Y(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Y(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Y(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Le(e.index)}`;
		case "deleteBlock": return `Removed block ${Le(e.index)}`;
		case "appendMacro": return t ? `Added a ${Y(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Le(e.index)}`;
		case "setDocumentType": return `Type: ${Y(t, 40)}`;
		case "skip": return t ? Y(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Y(t)}` : e.op;
	}
}
function X(e) {
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
	let t = X(e.startedAt);
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
function He({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: m, onDecide: h, suggestion: g, onReview: v, documentTitle: y, defaultExpanded: b = !1, className: ee, "data-testid": x = "agent-run-card" }) {
	let S = c?.phase ?? "received", [C, w] = L(b), T = S === "completed" ? c?.suggestion ?? g : void 0, E = S === "completed" ? c?.review : void 0, D = !!T && !E, O = S === "completed" && c?.noop === !0, k = S === "completed" ? c?.result ?? d : void 0, A = k?.kind === "link" && k.label ? k.label : "Open", te = l && !(k?.kind === "document" && m), j = Me[S], M = S === "failed" || S === "rejected", re = M ? "danger" : E ? E.decision === "accept" ? "success" : "neutral" : O ? "warning" : S === "completed" ? T ? "warning" : "success" : S === "awaiting_approval" ? "warning" : "info", N = E ? "Reviewed" : D ? "Suggested" : O ? "No change" : Ne[S], P = E ? E.byName ?? E.by : void 0, F = E ? `${E.decision === "accept" ? "Accepted" : "Rejected"} by ${P}` : void 0, I = S === "awaiting_approval", ie = S === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : I ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : F ?? c?.detail ?? (D && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : S === "received" ? "Received" : N), B = c?.details, V = B?.ops ?? [], H = B?.steps ?? [], ae = B?.document?.title || y || "Document", U = !!B?.document || !!l, oe = B?.error ?? (S === "failed" ? c?.detail : void 0), se = Be(B), W = `${x}-details-${r}`, ce = !!(D && T && v || I && h || k && m || k?.kind === "link" && !m);
	return /* @__PURE__ */ z("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", ee),
		"data-testid": x,
		"data-phase": S,
		"data-run-id": r,
		"data-expanded": C ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || w((e) => !e);
		},
		children: [
			/* @__PURE__ */ z("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ R(ne, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ z("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${x}-instruction`,
						children: [
							/* @__PURE__ */ R("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ R(_, {
						size: "xs",
						tone: re,
						"data-testid": `${x}-phase`,
						children: N
					}),
					/* @__PURE__ */ R(n, {
						size: "sm",
						"aria-label": C ? "Hide details" : "Show details",
						"aria-expanded": C,
						"aria-controls": C ? W : void 0,
						onClick: () => w((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${x}-toggle`,
						icon: /* @__PURE__ */ R(f, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", C && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ z("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ z("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", ce && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ R("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${x}-steps`,
							children: J.map((t, n) => {
								let r = M ? n < j : n < j || n === j && S === "completed", i = n === j && S !== "completed" && !M, a = M && n === j;
								return /* @__PURE__ */ z("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ R("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? O && n === j ? "bg-warning" : "bg-success" : i ? I ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ R("span", {
										className: "sr-only",
										children: a ? N : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ R("span", {
							className: e("min-w-0 flex-1 truncate", E && (E.decision === "accept" ? "text-success" : "text-text-tertiary"), S === "failed" && "text-danger", O && "text-warning-fg"),
							"data-testid": `${x}-detail`,
							"data-review": E?.decision,
							title: c?.detail,
							children: ie
						})]
					}),
					D && T && v && /* @__PURE__ */ z("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-review`,
						children: [/* @__PURE__ */ R(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(r, "accept", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${x}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ R(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(r, "reject", {
								key: T.key,
								...T.documentId ? { documentId: T.documentId } : {}
							}),
							"data-testid": `${x}-reject-review`,
							children: "Reject"
						})]
					}),
					I && h && /* @__PURE__ */ z("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-decide`,
						children: [/* @__PURE__ */ R(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "approve"),
							"data-testid": `${x}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ R(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "reject"),
							"data-testid": `${x}-reject`,
							children: "Reject"
						})]
					}),
					k && m && /* @__PURE__ */ R("button", {
						type: "button",
						onClick: () => m(k),
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": k.kind,
						children: A
					}),
					k?.kind === "link" && !m && /* @__PURE__ */ R("a", {
						href: k.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Fe, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": "link",
						children: A
					}),
					u && /* @__PURE__ */ R("button", {
						type: "button",
						onClick: () => u(r),
						className: Ie,
						"data-testid": `${x}-open-run`,
						children: "Open run"
					}),
					te && /* @__PURE__ */ R("button", {
						type: "button",
						onClick: l,
						className: Ie,
						"data-testid": `${x}-open-document`,
						children: "Open document"
					})
				]
			}),
			C && /* @__PURE__ */ z("div", {
				id: W,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${x}-details`,
				children: [
					U && /* @__PURE__ */ z("div", {
						className: "flex items-start gap-2",
						"data-testid": `${x}-details-document`,
						children: [
							/* @__PURE__ */ R(p, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ z("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ R("span", {
									className: "block truncate font-medium text-text-primary",
									children: ae
								}), B?.document?.snippet && /* @__PURE__ */ R("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${x}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							l && /* @__PURE__ */ R(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${x}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ z("div", {
						"data-testid": `${x}-details-ops`,
						children: [
							/* @__PURE__ */ R("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ R("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, Pe).map((e, t) => /* @__PURE__ */ R("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Re(e)
								}, t))
							}),
							V.length > Pe && /* @__PURE__ */ z("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${x}-details-more-ops`,
								children: [
									"+",
									V.length - Pe,
									" more"
								]
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ R("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${x}-details-steps`,
						children: H.map((t) => /* @__PURE__ */ z("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ R("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ve[t.status] ?? Ve.pending)
							}), /* @__PURE__ */ R("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					oe && /* @__PURE__ */ R("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${x}-details-error`,
						children: oe
					}),
					/* @__PURE__ */ z("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ R("button", {
								type: "button",
								onClick: () => u(r),
								className: e(Fe, "hover:text-text-primary"),
								"data-testid": `${x}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							k && m && /* @__PURE__ */ R("button", {
								type: "button",
								onClick: () => m(k),
								className: e(Fe, "font-medium text-info"),
								"data-testid": `${x}-details-open-result`,
								children: A
							}),
							se && /* @__PURE__ */ R("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${x}-details-timings`,
								children: se
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
	let o = F(() => Ge(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ R("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ z("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Ke(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ R("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ R("span", {
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
function Xe({ quickReactions: t = Je, onReact: n, onOpenReactionPicker: o, onReply: s, onForward: l, onTogglePin: f, pinned: p = !1, onCopyLink: h, onEdit: g, onDelete: _, className: v, "data-testid": y = "message-actions" }) {
	let b = (e, t, n, r) => /* @__PURE__ */ R("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${y}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Ye}`,
		children: n
	}, r);
	return /* @__PURE__ */ z("div", {
		"data-testid": y,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", v),
		children: [
			n && t.map((e) => b(`React ${e}`, () => n(e), /* @__PURE__ */ R("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			o && b("More reactions", o, /* @__PURE__ */ R(r, { size: 14 }), "more-reactions"),
			s && b("Reply", s, /* @__PURE__ */ R(i, { size: 14 }), "reply"),
			l && b("Forward to another conversation", (e) => l(e.currentTarget), /* @__PURE__ */ R(d, { size: 14 }), "forward"),
			f && b(p ? "Unpin" : "Pin to channel", f, /* @__PURE__ */ R(m, { size: 14 }), "pin"),
			h && b("Copy link to message", h, /* @__PURE__ */ R(u, { size: 14 }), "copy-link"),
			g && b("Edit message", g, /* @__PURE__ */ R(c, { size: 13 }), "edit"),
			_ && b("Delete message", _, /* @__PURE__ */ R(a, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ze({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = L(e), [s, c] = L(!1), [l, u] = L(null), d = I(null);
	P(() => {
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
	return /* @__PURE__ */ z("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ R(T, {
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
			/* @__PURE__ */ z("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ R("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ R(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ R(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ R("p", {
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
	let o = /* @__PURE__ */ z(ie, { children: [/* @__PURE__ */ z("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ R("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ R("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: $e(t.timestamp)
		})]
	}), /* @__PURE__ */ R("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Qe(t.text)
	})] });
	return /* @__PURE__ */ z("div", {
		"data-testid": a,
		"data-quoted-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ R("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ R("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ R("button", {
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
	let a = tt(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ z("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ R("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ R("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ R("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ R("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ z("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ R("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ R("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: re(t.size)
			})]
		})]
	}) : /* @__PURE__ */ R("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ z("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ R(at, {}), /* @__PURE__ */ z("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ R("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ R("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: re(t.size)
				})]
			})]
		})
	});
}
function rt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function it({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : re(o);
	return /* @__PURE__ */ z("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ R("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ R(at, {}),
			/* @__PURE__ */ z("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ z("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ R("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ R("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ R("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ R("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ R("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ R("button", {
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
	return /* @__PURE__ */ R("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ R("path", {
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
	let a = oe(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ z("div", {
		role: "separator",
		"aria-label": se(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ R("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ R("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ R("span", {
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
function Z(e) {
	return `${pt(e)}:`;
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
	let r = Z(t);
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
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Ue(e.metadata) || vt(e.metadata) || _t(e.metadata) || lt(e.metadata) || yt(e.metadata));
}
function At(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Ot(r);
	if (!i || i !== Ot(n) || !kt(n) || !kt(r) || r.editedAt || U(r.timestamp, n.timestamp)) return !1;
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
	return /* @__PURE__ */ z("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ R("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ R("span", {
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
function It({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: d, onToggleReaction: f, onReply: p, onForwardMessage: h, onTogglePin: g, onEditMessage: _, onDeleteMessage: y, pinnedMessageIds: ee, onJumpToMessage: S, highlightedMessageId: T, threaded: D = !1, alignOwnMessages: O = !0, documentEditors: k, callParticipants: ne, agentRunStatus: re, onOpenRun: F, onOpenResult: B, onDecideRun: V, onReviewRun: H, onJoinCall: ae, onOpenRecording: oe, onCopyRecordingLink: se, onShareRecording: ce, onDownloadRecording: le, onOpenRecordingTranscript: de, onManageRecordingExpiry: fe, recordingStatus: pe, onOpenDocument: me, tone: he = "light", showHeader: ge, fill: ye, onLoadMore: xe, hasMore: G, loadingMore: Se = !1, onSendFiles: K, transfers: we = [], currentActor: Te, onCancelTransfer: Ee, attachmentSrc: De, onOpenAttachment: ke, acceptFiles: Ae, maxFileSize: q, onFileError: J, readReceipts: Me, readReceiptsEnabled: Ne = !0, unreadFrom: Pe, emojis: Fe = M }) {
	let [Ie, Y] = L(null), [Le, Re] = L(null), X = he === "dark", ze = C(), Be = ge ?? !(ze?.hasHeader ?? !1), Ve = ye ?? ze?.fillsHeight ?? !1, [We, Ge] = L(""), Ke = I(null), Je = I(null), Ye = !!xe && G !== !1, Qe = I(null), $e = I(null), [tt, at] = L(!1), dt = !!K && !a, Z = xt(n, r), mt = D ? wt(Z) : null, [Ct, Dt] = L(() => /* @__PURE__ */ new Set());
	function Ot(e) {
		Dt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let kt = I(void 0);
	if (Pe !== void 0) {
		let e = kt.current;
		if (e === void 0) kt.current = Pe;
		else {
			let t = Date.parse(Pe), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (kt.current = Pe);
		}
	}
	let It = kt.current, Rt = It === void 0 ? -1 : jt(mt ? mt.map((e) => bt(e.root)) : Z.map((e) => bt(e)), It), zt = Me !== void 0, Bt = Me ?? [], Vt = Ne && u ? u : void 0, Q = (() => {
		if (Vt) for (let e = Z.length - 1; e >= 0; --e) {
			let t = Z[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Vt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), $ = Q && Vt ? Nt(Bt, Vt, Q.timestamp) : [], Ht = $.length === 1 && !!Vt && Ft(n, Bt, Vt) === 1;
	function Ut() {
		if (!Q) return null;
		if ($.length === 0) return zt ? /* @__PURE__ */ R("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", O ? "justify-end pr-1" : "justify-start pl-7", X ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ R("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = $.map(Pt), n = $.slice(0, 3);
		return /* @__PURE__ */ z("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", O ? "justify-end pr-1" : "justify-start pl-7", X ? "text-white/50" : "text-text-tertiary"),
			children: [
				$.length > 1 && /* @__PURE__ */ R("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ R(E, {
						name: Pt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ R("span", {
					"data-testid": "chat-read-receipts-label",
					children: Ht ? "Seen" : `Seen by ${$.length}`
				}),
				/* @__PURE__ */ R("span", {
					style: x,
					children: Ht ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Wt, Gt] = L(0), [Kt, qt] = L(!1), Jt = I(!0), Yt = I(n.length), Xt = n.length + r.length + we.length, Zt = I(null), [Qt, $t] = L(""), en = I(null), tn = I(!1), nn = I(0);
	P(() => {
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
		$t(ct(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function rn() {
		let e = Ke.current;
		e && (e.scrollTop = e.scrollHeight, Jt.current = !0, Gt(0));
	}
	function an() {
		let e = Ke.current;
		if (!e) return;
		let t = st(e);
		Jt.current = t, t && Gt(0), qt(e.scrollTop > 8);
	}
	P(() => {
		let e = Ke.current, t = Yt.current, n = Xt - t;
		if (Yt.current = Xt, !e) return;
		let r = Zt.current;
		if (r && n > 0) {
			Zt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Jt.current ? (e.scrollTop = e.scrollHeight, Gt(0), qt(e.scrollTop > 8)) : n > 0 && Gt((e) => e + n);
	}, [Xt]);
	function on() {
		let e = Ke.current;
		e && (Zt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), xe?.();
	}
	P(() => () => {
		Je.current && clearTimeout(Je.current);
	}, []);
	function sn() {
		let e = We.trim();
		!e || a || (Je.current && clearTimeout(Je.current), Je.current = null, o?.(!1), Jt.current = !0, i(e), Ge(""));
	}
	function cn(e) {
		!dt || e.length === 0 || (Jt.current = !0, K?.(e));
	}
	function ln(e) {
		if (!dt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), cn(t));
	}
	function un(e) {
		Ge((t) => t + e), at(!1);
	}
	function dn() {
		a || (o?.(!0), Je.current && clearTimeout(Je.current), Je.current = setTimeout(() => o?.(!1), 2e3));
	}
	function fn(e) {
		dn(), e.key === "Enter" && !a && We.trim() && sn();
	}
	function pn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Rt ? /* @__PURE__ */ R(Mt, { tone: he }) : null, l = !c && At(a, n), v = !o && U(s, i) ? /* @__PURE__ */ R(ot, {
			timestamp: s,
			tone: he
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Ue(r.metadata);
			return /* @__PURE__ */ z(N, { children: [
				v,
				c,
				/* @__PURE__ */ R("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ R(ue, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: he,
						mine: !0,
						content: /* @__PURE__ */ z(ie, { children: [
							i ? /* @__PURE__ */ R(He, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: re?.(i.runId),
								onOpenDocument: me && i.documentId ? () => me(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: F,
								result: i.result,
								onOpenResult: B,
								onDecide: V,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: H
							}) : /* @__PURE__ */ R(_e, { text: r.content }),
							/* @__PURE__ */ R("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", X ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ R("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ R(t, {
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
		let { message: b } = n, x = b.displayName ?? b.clientId.slice(0, 8), C = b.attachments ?? [], w = b.metadata?.html, E = typeof w == "string" ? w : void 0, D = gt(b.metadata), A = ht(b.content, D, E), te = /* @__PURE__ */ R(_e, {
			html: A.html,
			text: A.body
		}), j = lt(b.metadata), M = Ue(b.metadata), P = _t(b.metadata), I = vt(b.metadata), L = yt(b.metadata), ge = ft(b.metadata), ye = ut(b.metadata), xe = M ? /* @__PURE__ */ R(He, {
			runId: M.runId,
			instruction: M.instruction || b.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: b.displayName,
			status: re?.(M.runId),
			onOpenDocument: me && M.documentId ? () => me(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: F,
			result: M.result,
			onOpenResult: B,
			onDecide: V,
			suggestion: M.suggestionKey ? {
				key: M.suggestionKey,
				...M.documentId ? { documentId: M.documentId } : {}
			} : void 0,
			onReview: H
		}) : I ? (() => {
			let e = pe?.(I.recordingId), t = {
				...I,
				...e ?? {}
			};
			return /* @__PURE__ */ R(Oe, {
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
				pinned: !!b.id && !!ee?.has(b.id),
				onOpen: oe,
				onCopyLink: se,
				onShare: ce,
				onDownload: le,
				onOpenTranscript: de,
				onManageExpiry: fe,
				onTogglePin: g ? () => g(b) : void 0
			});
		})() : P ? /* @__PURE__ */ R(Ce, {
			callId: P.callId,
			startedBy: (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			participants: ne?.(P.callId) ?? P.participants,
			live: P.live,
			durationMs: P.durationMs,
			audioOnly: P.audioOnly,
			recorded: P.recorded,
			notRecordedReason: P.notRecordedReason,
			lobbyName: P.lobbyName,
			onJoin: ae
		}) : j ? /* @__PURE__ */ R(ve, {
			documentId: j.documentId,
			title: j.title || b.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			editors: k?.(j.documentId) ?? [],
			onOpen: me
		}) : C.length === 0 ? te : /* @__PURE__ */ z(ie, { children: [(b.content || E) && te, C.map((e) => /* @__PURE__ */ R(nt, {
			attachment: e,
			src: De?.(e),
			onOpen: ke
		}, e.id))] }), G = b.id ?? "", Se = G && d ? d(G) : [], K = b.metadata?.replyTo, we = !!o && !!K && K.messageId === o.rootId, Te = !!K && !we, Ee = !!G && !!ee?.has(G), Ae = !!u && b.userId === u, q = b.metadata?.system === !0, J = !!b.deletedAt || b.metadata?.deleted === !0, Me = !!(M || I || P || j || L), Ne = Ae && !J && !q && !Me && !!G, Pe = !!G && !J && !q && !Me && C.length === 0 && !!b.content.trim(), Fe = Ne && !!_ && Ie === G, Le = /* @__PURE__ */ z(ie, { children: [
			Te && K && /* @__PURE__ */ R(et, {
				quote: K,
				onJump: S,
				className: "mb-1"
			}),
			D && /* @__PURE__ */ z("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [pt(D), D.timestamp ? W(D.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ R("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					A.stripped ? pt(D) : "Forwarded"
				]
			}),
			Ee && /* @__PURE__ */ z("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ R(m, { size: 11 }), " Pinned"]
			}),
			J ? /* @__PURE__ */ R("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Fe ? /* @__PURE__ */ R(Ze, {
				initialText: b.content,
				onSave: async (e) => {
					await _(b, e), Y(null);
				},
				onCancel: () => Y(null)
			}) : xe,
			!J && ye.length > 0 && /* @__PURE__ */ R("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: ye.map((e) => /* @__PURE__ */ R(be, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: me
				}, e.id))
			}),
			!J && ge && /* @__PURE__ */ z("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					ge.labels.length > 0 ? `Too large to send: ${ge.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!J && Se.length > 0 && u && f && /* @__PURE__ */ R(qe, {
				reactions: Se,
				currentUserId: u,
				onToggle: (e) => f(G, e)
			})
		] });
		return L ? /* @__PURE__ */ z(N, { children: [
			v,
			c,
			/* @__PURE__ */ R(je, {
				membership: L,
				fallbackText: b.content,
				timestamp: b.timestamp,
				"data-testid": "membership-notice"
			})
		] }, b.id ?? r) : /* @__PURE__ */ z(N, { children: [
			v,
			c,
			/* @__PURE__ */ z("div", {
				"data-testid": "chat-message",
				"data-message-id": G || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? W(b.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", G && G === T && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ R(ue, {
					author: x,
					content: Le,
					timestamp: l ? "" : b.timestamp,
					editedAt: J ? void 0 : b.editedAt,
					avatarUrl: b.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: he,
					mine: Ae && O
				}), G && !J && !Fe && (f || Ne || Pe && h || !q && (p || g)) && /* @__PURE__ */ R(Xe, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: f ? (e) => f(G, e) : void 0,
					onReply: p && !q ? () => p(o?.rootMessage ?? b) : void 0,
					onForward: h && Pe ? (e) => h(b, e) : void 0,
					onTogglePin: g && !q ? () => g(b) : void 0,
					pinned: !!b.id && !!ee?.has(b.id),
					onEdit: Ne && _ ? () => Y(G) : void 0,
					onDelete: Ne && y ? () => Re(G) : void 0
				})]
			}),
			!!Q && G === Q.id && Ut()
		] }, b.id ?? r);
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
		let i = bt(r?.root), a = r && r.replies.length === 0 && !hn(r.root) ? r.root : void 0, o = pn(t.root, n, i, a), s = bt(t.root) ?? "", c = n > 0 && n !== Rt && !U(s, i) ? /* @__PURE__ */ R("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", X ? "border-white/10" : "border-border-subtle")
		}) : null, l = hn(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ z(N, { children: [c, o] }, `post:${St(t.root) ?? n}`) : o;
		let u = St(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Tt, m = !f || Ct.has(u), h = m ? t.replies : t.replies.slice(0, Et), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(mn))].slice(0, 3), v = t.replies.length === 0;
		return /* @__PURE__ */ z(N, { children: [c, /* @__PURE__ */ z("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ z("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", X ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => pn(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ z("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => Ot(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ R("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ R(E, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ R("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ R("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${mn(t.root)}`,
						onClick: () => p?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", v && e("opacity-0 transition-opacity", "group-hover/post:opacity-100 group-has-[:focus-visible]/post:opacity-100", "[@media(hover:none)]:opacity-100"), X ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let _n = /* @__PURE__ */ z("div", {
		"data-testid": "chat-panel",
		className: e(Ve ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", X ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Be && /* @__PURE__ */ z("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", X ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ R("span", {
				style: x,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Qt
			}),
			/* @__PURE__ */ z("div", {
				className: e("relative flex flex-col mb-2", Ve ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ R("div", {
					ref: Ke,
					onScroll: an,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Kt && "fade-top", Ve ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ z("div", {
						className: "mt-auto pb-4",
						children: [
							Ye && n.length > 0 && /* @__PURE__ */ R("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ R("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: on,
									disabled: Se,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Se ? "Loading…" : "Load earlier messages"
								})
							}),
							Z.length === 0 ? c ?? /* @__PURE__ */ R("div", {
								className: e("text-sm", X ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : mt ? mt.map((e, t) => gn(e, t, mt[t - 1])) : Z.map((e, t) => pn(e, t, bt(Z[t - 1]), Z[t - 1])),
							y && /* @__PURE__ */ R(v, {
								open: Le !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Re(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Le);
									Re(null), e && y(e);
								}
							}),
							we.map((e) => /* @__PURE__ */ R(ue, {
								author: e.actor,
								timestamp: "",
								tone: he,
								content: /* @__PURE__ */ R(it, {
									transfer: e,
									mine: rt(e, u, Te),
									onCancel: Ee
								})
							}, e.transferId))
						]
					})
				}), Wt > 0 && /* @__PURE__ */ z("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: rn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Wt,
						" new message",
						Wt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ R(b, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", X ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ R("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? dn : void 0,
				children: l
			}) : /* @__PURE__ */ z("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					K && /* @__PURE__ */ z(ie, { children: [/* @__PURE__ */ R("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !dt,
						onClick: () => Qe.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", X ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ R(Lt, {})
					}), /* @__PURE__ */ R(A, {
						ref: Qe,
						multiple: !0,
						accept: Ae,
						onFiles: (e) => {
							let t = q ? e.filter((e) => e.size > q) : [];
							t.length > 0 && J?.(`Skipped ${t.length} file(s) over the size limit.`), cn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ R("button", {
						ref: $e,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": tt,
						title: "Insert emoji",
						disabled: a,
						onClick: () => at((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", X ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ R("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ R(te, {
						open: tt,
						onSelect: un,
						onClose: () => at(!1),
						triggerRef: $e,
						emojis: Fe
					}),
					/* @__PURE__ */ R(w, {
						size: "sm",
						value: We,
						onChange: (e) => Ge(e.target.value),
						onKeyDown: fn,
						onPaste: ln,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", X && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ R(t, {
						variant: "primary",
						size: "sm",
						onClick: sn,
						disabled: a || !We.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return K ? /* @__PURE__ */ R(j, {
		onFiles: cn,
		accept: Ae,
		maxSize: q,
		onError: J,
		disabled: a,
		className: Ve ? "flex h-full min-h-0 flex-col" : void 0,
		children: _n
	}) : _n;
}
function Lt() {
	return /* @__PURE__ */ R("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ R("path", {
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
	return /* @__PURE__ */ z("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ z("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ R("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ R("div", { children: e.map((e) => {
			let n = V(Rt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = H(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ z("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ R("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ R("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ R("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ R("span", {
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
function Q({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": p, ...m }) {
	let h = r ? i ? /* @__PURE__ */ R("time", {
		dateTime: i,
		title: a,
		className: Vt,
		children: r
	}) : /* @__PURE__ */ R("span", {
		title: a,
		className: Vt,
		children: r
	}) : null, _ = /* @__PURE__ */ z("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ z("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ R("span", {
				"data-line": "primary",
				title: n,
				className: e(Bt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), h]
		}), /* @__PURE__ */ R("span", {
			"data-line": "secondary",
			title: o,
			className: e(Bt, "text-[11px] leading-snug", s ? g[s] : "text-text-tertiary"),
			children: o
		})]
	});
	return /* @__PURE__ */ z("li", {
		...m,
		"data-testid": p,
		"data-unread": d ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", f),
		children: [
			/* @__PURE__ */ z("span", {
				className: "relative shrink-0",
				children: [t, d && /* @__PURE__ */ R("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			l ? /* @__PURE__ */ R("button", {
				type: "button",
				onClick: l,
				"aria-label": u,
				"data-testid": p ? `${p}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ R("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			c && /* @__PURE__ */ R("span", {
				className: "flex shrink-0 items-center gap-1",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
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
function Ht({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ R("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ R("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Ut({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ R(Ht, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ R(y, {
			icon: /* @__PURE__ */ R(m, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${W(e.sentAt)} · pinned ${W(e.pinnedAt)}` : W(r) : void 0;
			return /* @__PURE__ */ R(Q, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ R(E, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: $(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ R("button", {
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
function Wt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ R(Ht, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ R(y, {
			icon: /* @__PURE__ */ R(h, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = tt(e.attachment);
			return /* @__PURE__ */ R(Q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ R("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ R("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ R(p, {})
				}),
				title: e.attachment.name,
				meta: [e.author, re(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: $(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? W(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Gt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ R(Ht, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ R(y, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ R(Q, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ R(E, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: $(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? W(e.at) : void 0,
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
	return /* @__PURE__ */ R(Ht, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ R(y, {
			icon: /* @__PURE__ */ R(o, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ R(Q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ R("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ R("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ R(o, {})
				}),
				title: [$(e.startedAt), Kt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : qt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Yt({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
	let o = r && /* @__PURE__ */ z("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ R("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ z("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [o, t.length === 0 ? /* @__PURE__ */ R(y, {
			icon: /* @__PURE__ */ R(p, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ R("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ R(Q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ R("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ R(p, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: $(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? W(e.updatedAt) : void 0,
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
function Qt({ name: t, description: r, online: i, avatarUrl: a, features: c = Xt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: k, watchHint: A, watchViewerCount: te, callInProgress: j = !1, headerActions: M, view: ne, onViewChange: re, className: N, "data-testid": P = "conversation-surface" }) {
	let F = new Set(c), [I, B] = L("chat"), V = ne ?? I, H = F.has(V) ? V : c[0] ?? "chat", ae = (e) => {
		ne === void 0 && B(e), re?.(e);
	}, U = (e) => e || void 0, oe = c.filter((e) => Zt[e]).map((e) => ({
		id: e,
		label: Zt[e],
		badge: e === "files" ? U(p.length) : e === "documents" ? U(h.length) : e === "pins" ? U(v.length) : e === "members" ? f == null ? void 0 : U(f) : e === "calls" ? U(C.length) : e === "mentions" ? U(b.filter((e) => e.unread).length) : void 0
	})), se = (e) => {
		ae("chat"), T?.(e);
	};
	return /* @__PURE__ */ z("section", {
		className: e("flex min-w-0 flex-col", N),
		"data-testid": P,
		children: [
			/* @__PURE__ */ R(S, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${P}-header`,
				tabs: oe.length > 1 ? /* @__PURE__ */ R(ee, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: H,
					onValueChange: (e) => ae(e),
					items: oe
				}) : void 0,
				actions: E || O || M ? /* @__PURE__ */ z(ie, { children: [
					E && (D ? /* @__PURE__ */ R(n, {
						"aria-label": j ? "Join the call" : "Start a call",
						title: j ? "Join the call" : "Start a call",
						"data-testid": `${P}-call`,
						variant: j ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ R(s, { size: 16 })
					}) : /* @__PURE__ */ z(ie, { children: [/* @__PURE__ */ R(n, {
						"aria-label": j ? "Join the call with audio" : "Start an audio call",
						title: j ? "Join with audio" : "Audio call",
						"data-testid": `${P}-audio-call`,
						onClick: () => E(!0),
						children: /* @__PURE__ */ R(s, { size: 16 })
					}), /* @__PURE__ */ R(n, {
						"aria-label": j ? "Join the call with video" : "Start a video call",
						title: j ? "Join with video" : "Video call",
						"data-testid": `${P}-video-call`,
						variant: j ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ R(o, { size: 16 })
					})] })),
					O && /* @__PURE__ */ R($t, {
						testId: `${P}-watch`,
						label: k,
						hint: A,
						viewerCount: te,
						onClick: O
					}),
					M
				] }) : void 0
			}),
			F.has("files") && H === "files" && /* @__PURE__ */ R(Wt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? se : void 0
			}),
			F.has("documents") && H === "documents" && /* @__PURE__ */ R(Yt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			F.has("pins") && H === "pins" && /* @__PURE__ */ R(Ut, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: T ? se : void 0
			}),
			F.has("members") && H === "members" && /* @__PURE__ */ R("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${P}-members`,
				children: d
			}),
			F.has("mentions") && H === "mentions" && /* @__PURE__ */ R(Gt, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					ae("chat"), x(e, t);
				} : void 0
			}),
			F.has("calls") && H === "calls" && /* @__PURE__ */ R(Jt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			F.has("chat") && /* @__PURE__ */ z("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${P}-chat`,
				hidden: H !== "chat",
				children: [u && /* @__PURE__ */ R("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${P}-canvas`,
					children: u
				}), /* @__PURE__ */ R("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function $t({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ z(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? en,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ R(l, { size: 14 }),
			/* @__PURE__ */ R("span", { children: o }),
			s && /* @__PURE__ */ R("span", {
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
export { ae as $, qe as A, q as B, nt as C, Qe as D, et as E, Ue as F, G, Oe as H, We as I, ve as J, xe as K, Be as L, Ge as M, Ve as N, Ze as O, He as P, ce as Q, Re as R, ot as S, tt as T, Ee as U, Ae as V, Ce as W, ue as X, _e as Y, le as Z, gt as _, Gt as a, H as at, ft as b, Kt as c, It as d, oe as et, _t as f, pt as g, Z as h, Wt as i, V as it, Ke as j, Xe as k, Q as l, ut as m, Qt as n, W as nt, Jt as o, lt as p, be as q, Yt as r, U as rt, Ut as s, Xt as t, se as tt, zt as u, yt as v, it as w, ht as x, vt as y, je as z };
