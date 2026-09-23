import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, p as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./IconButton-DDeXW3mZ.js";
import { D as i, F as a, G as o, J as s, L as c, Q as l, R as u, _ as d, d as f, et as p, g as m, h, i as g, t as _, tt as v, x as ee } from "./DropdownMenu-thsvyIAZ.js";
import { t as y } from "./Chip-zdVBwV9j.js";
import { t as b } from "./ConfirmDialog-CSS_SMC6.js";
import { t as x } from "./EmptyState-DFWbBBcY.js";
import { a as S, n as C, t as te } from "./ChannelHeader-qvaO7oMR.js";
import { n as w } from "./Tabs-BGZyr2nH.js";
import { n as T } from "./DockedPanelContext-pH9A5z1h.js";
import { t as E } from "./Input-DLknWXri.js";
import { t as D } from "./Textarea-Dz4doxTv.js";
import { t as O } from "./Avatar-DeJWic2B.js";
import { t as k } from "./RovingToolbar-CmQag9q6.js";
import { t as ne } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as A } from "./StatusPill-CCLWewW3.js";
import { i as j, n as M, r as N, t as P } from "./ReactionPickerPopover-CcL-n6gt.js";
import { p as re } from "./MediaIcons-OLUYBJM0.js";
import { t as F } from "./formatBytes-05ivRSJY.js";
import { Fragment as I, useEffect as L, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/utils/identity.ts
var ie = [
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
function W(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return ie[Math.abs(t) % ie.length];
}
function ae(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function G(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function oe(e, t) {
	let n = G(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = G(t);
	return r ? n !== r : !1;
}
function se(e, t = /* @__PURE__ */ new Date()) {
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
function ce(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function K(e) {
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
function le(e, t = /* @__PURE__ */ new Date()) {
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
function ue(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function de({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, contentLayout: d = "inline", className: f }) {
	let p = l === "dark", m = ue(r), h = !o || !!m;
	return /* @__PURE__ */ U("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", f),
		children: [/* @__PURE__ */ H("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ H(O, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ U("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				h && /* @__PURE__ */ U("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ H("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", p ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						m && /* @__PURE__ */ H("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: K(r),
							className: e("text-xs shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: m
						}),
						u && /* @__PURE__ */ H("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${K(u)}`,
							className: e("text-[11px] shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ H("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", p ? "text-white/90" : "text-text-primary", s && d === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && d === "inline" && (p ? "bg-white/15" : "bg-primary-bg"), s && d === "block" && "w-full max-w-[36rem]"),
					children: n
				}),
				c && /* @__PURE__ */ H("div", {
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
var fe = /* @__PURE__ */ new Set([
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
]), pe = /^(https?:|mailto:)/i;
function me(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || pe.test(t) ? t : null;
}
function he(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => he(e, `${t}-${n}`));
	if (!fe.has(n.tagName)) return /* @__PURE__ */ H("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ H("br", {}, t);
		case "A": {
			let e = me(n.getAttribute("href"));
			return e ? /* @__PURE__ */ H("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ H("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ H("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ H(e, { children: r }, t);
		}
	}
}
var ge = /```([\s\S]*?)```|`([^`\n]+)`/g;
function _e(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (ge.lastIndex = 0; (r = ge.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ H("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ H("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ H("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ve({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = R(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => he(e, `n${t}`));
	}, [t]), o = R(() => _e(n ?? ""), [n]);
	return /* @__PURE__ */ H("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ye({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ U("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ H(h, { size: 18 })
			}),
			/* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ H("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ H("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${be(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ H(ne, {
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
			o && /* @__PURE__ */ H("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function be(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function xe({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ U("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [r ? /* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r
		}) : /* @__PURE__ */ H(h, {
			size: 12,
			className: "shrink-0 text-text-tertiary",
			"aria-hidden": "true"
		}), /* @__PURE__ */ H("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function q(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function Se(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function Ce(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function we({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? q(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? Se(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
	return /* @__PURE__ */ U("div", {
		"data-testid": f,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ H("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${m} in progress` : m
					}),
					/* @__PURE__ */ H("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: h
					}),
					!i && s === !1 && /* @__PURE__ */ H("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${f}-not-recorded`,
						children: Ce(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ H(ne, {
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
			i && u && /* @__PURE__ */ H("button", {
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
var Te = {
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
function Ee(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function De(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Oe(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function ke({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ U("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ H(O, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ U("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ H("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ H("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Ae({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: d = "ready", transcriptReady: f = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: v, onShare: ee, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: te, "data-testid": w = "recording-activity-card" }) {
	let T = o ?? a.length, E = d === "gone", D = d !== "saving" && d !== "failed" && !E && !!g, O = () => {
		g?.(n);
	}, k = c != null && c > 0 ? q(c) : "", j = Ee(s), M = Oe(a, T), { state: N, label: P } = Te[d], re = [
		...g && D ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: O
		}] : [],
		...x && f ? [{
			"data-testid": `${w}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		...v && !E ? [{
			"data-testid": `${w}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => v(n)
		}] : [],
		...ee && !E ? [{
			"data-testid": `${w}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => ee(n)
		}] : [],
		...y && !E ? [{
			"data-testid": `${w}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && D ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], F = re.length ? [{
		items: re,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ U("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": d,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", te),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ U("button", {
				type: "button",
				onClick: D ? O : void 0,
				disabled: !D,
				"aria-label": D ? `Play ${r.toLowerCase()}` : `${r}: ${P.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", D ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ H("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ H(ke, {
						participants: a,
						total: T,
						testId: w
					}),
					D && /* @__PURE__ */ H("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ H("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ H("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ H("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					k && /* @__PURE__ */ H("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: k
					})
				]
			}), /* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ H("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${w}-title`,
								children: r
							}), h && /* @__PURE__ */ H("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ H(u, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ U("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${w}-by`,
							children: ["by ", i]
						}),
						T > 0 && /* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							"data-testid": `${w}-people`,
							children: [/* @__PURE__ */ H(ne, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: C
							}), /* @__PURE__ */ H("span", {
								className: "truncate text-xs text-text-tertiary",
								children: M
							})]
						}),
						/* @__PURE__ */ U("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ H(A, {
									state: N,
									label: P,
									size: "sm",
									"data-testid": `${w}-stage`
								}),
								d === "ready" && f && /* @__PURE__ */ H(A, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${w}-transcript`
								}),
								d === "ready" && p && /* @__PURE__ */ H(A, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${w}-summary`
								}),
								j && /* @__PURE__ */ H("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: j
								})
							]
						})
					]
				}), F.length > 0 && /* @__PURE__ */ H(_, {
					trigger: /* @__PURE__ */ H("span", {
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
		}), m && d !== "failed" && !E && /* @__PURE__ */ U("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ U("span", { children: ["Set to expire ", De(m)] }), S && /* @__PURE__ */ H(t, {
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
function je(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function J(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Y(e, t) {
	let n = e.names && e.names.length > 0 ? je(e.names) : e.userIds.length > 0 ? je(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = J(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Me({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Y(t, n);
	return /* @__PURE__ */ U("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ H("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ H("time", {
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
var Ne = [
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
], Pe = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Fe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, X = 6, Ie = "shrink-0 whitespace-nowrap underline underline-offset-2", Le = `${Ie} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Z(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Re(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function ze(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Z(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Z(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Z(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Re(e.index)}`;
		case "deleteBlock": return `Removed block ${Re(e.index)}`;
		case "appendMacro": return t ? `Added a ${Z(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Re(e.index)}`;
		case "setDocumentType": return `Type: ${Z(t, 40)}`;
		case "skip": return t ? Z(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Z(t)}` : e.op;
	}
}
function Be(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Ve(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function He(e) {
	if (!e?.startedAt) return null;
	let t = Be(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Ve(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Q = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Ue({ runId: n, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: p, onDecide: m, suggestion: g, onReview: _, documentTitle: v, defaultExpanded: ee = !1, className: b, "data-testid": x = "agent-run-card" }) {
	let S = c?.phase ?? "received", [C, te] = B(ee), w = S === "completed" ? c?.suggestion ?? g : void 0, T = S === "completed" ? c?.review : void 0, E = !!w && !T, D = S === "completed" && c?.noop === !0, O = S === "completed" ? c?.result ?? d : void 0, k = O?.kind === "link" && O.label ? O.label : "Open", ne = l && !(O?.kind === "document" && p), A = Pe[S], j = S === "failed" || S === "rejected", M = j ? "danger" : T ? T.decision === "accept" ? "success" : "neutral" : D ? "warning" : S === "completed" ? w ? "warning" : "success" : S === "awaiting_approval" ? "warning" : "info", N = T ? "Reviewed" : E ? "Suggested" : D ? "No change" : Fe[S], P = T ? T.byName ?? T.by : void 0, F = T ? `${T.decision === "accept" ? "Accepted" : "Rejected"} by ${P}` : void 0, I = S === "awaiting_approval", L = S === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : I ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : F ?? c?.detail ?? (E && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : S === "received" ? "Received" : N), R = c?.details, z = R?.ops ?? [], V = R?.steps ?? [], ie = R?.document?.title || v || "Document", W = !!R?.document || !!l, ae = R?.error ?? (S === "failed" ? c?.detail : void 0), G = He(R), oe = `${x}-details-${n}`, se = !!(E && w && _ || I && m || O && p || O?.kind === "link" && !p);
	return /* @__PURE__ */ U("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", b),
		"data-testid": x,
		"data-phase": S,
		"data-run-id": n,
		"data-expanded": C ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || te((e) => !e);
		},
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ H(re, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ U("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${x}-instruction`,
						children: [
							/* @__PURE__ */ H("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ H(y, {
						size: "xs",
						tone: M,
						"data-testid": `${x}-phase`,
						children: N
					}),
					/* @__PURE__ */ H(r, {
						size: "sm",
						"aria-label": C ? "Hide details" : "Show details",
						"aria-expanded": C,
						"aria-controls": C ? oe : void 0,
						onClick: () => te((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${x}-toggle`,
						icon: /* @__PURE__ */ H(f, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", C && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ U("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", se && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ H("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${x}-steps`,
							children: Ne.map((t, n) => {
								let r = j ? n < A : n < A || n === A && S === "completed", i = n === A && S !== "completed" && !j, a = j && n === A;
								return /* @__PURE__ */ U("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ H("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? D && n === A ? "bg-warning" : "bg-success" : i ? I ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ H("span", {
										className: "sr-only",
										children: a ? N : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ H("span", {
							className: e("min-w-0 flex-1 truncate", T && (T.decision === "accept" ? "text-success" : "text-text-tertiary"), S === "failed" && "text-danger", D && "text-warning-fg"),
							"data-testid": `${x}-detail`,
							"data-review": T?.decision,
							title: c?.detail,
							children: L
						})]
					}),
					E && w && _ && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-review`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "accept", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${x}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "reject", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${x}-reject-review`,
							children: "Reject"
						})]
					}),
					I && m && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${x}-decide`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(n, "approve"),
							"data-testid": `${x}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(n, "reject"),
							"data-testid": `${x}-reject`,
							children: "Reject"
						})]
					}),
					O && p && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => p(O),
						className: e(Ie, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": O.kind,
						children: k
					}),
					O?.kind === "link" && !p && /* @__PURE__ */ H("a", {
						href: O.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Ie, "font-medium text-info"),
						"data-testid": `${x}-open-result`,
						"data-result-kind": "link",
						children: k
					}),
					u && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => u(n),
						className: Le,
						"data-testid": `${x}-open-run`,
						children: "Open run"
					}),
					ne && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: l,
						className: Le,
						"data-testid": `${x}-open-document`,
						children: "Open document"
					})
				]
			}),
			C && /* @__PURE__ */ U("div", {
				id: oe,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${x}-details`,
				children: [
					W && /* @__PURE__ */ U("div", {
						className: "flex items-start gap-2",
						"data-testid": `${x}-details-document`,
						children: [
							/* @__PURE__ */ H(h, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ U("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ H("span", {
									className: "block truncate font-medium text-text-primary",
									children: ie
								}), R?.document?.snippet && /* @__PURE__ */ H("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${x}-details-snippet`,
									children: R.document.snippet
								})]
							}),
							l && /* @__PURE__ */ H(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${x}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					z.length > 0 && /* @__PURE__ */ U("div", {
						"data-testid": `${x}-details-ops`,
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ H("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: z.slice(0, X).map((e, t) => /* @__PURE__ */ H("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: ze(e)
								}, t))
							}),
							z.length > X && /* @__PURE__ */ U("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${x}-details-more-ops`,
								children: [
									"+",
									z.length - X,
									" more"
								]
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ H("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${x}-details-steps`,
						children: V.map((t) => /* @__PURE__ */ U("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ H("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Q[t.status] ?? Q.pending)
							}), /* @__PURE__ */ H("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ae && /* @__PURE__ */ H("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${x}-details-error`,
						children: ae
					}),
					/* @__PURE__ */ U("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => u(n),
								className: e(Ie, "hover:text-text-primary"),
								"data-testid": `${x}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							O && p && /* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => p(O),
								className: e(Ie, "font-medium text-info"),
								"data-testid": `${x}-details-open-result`,
								children: k
							}),
							G && /* @__PURE__ */ H("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${x}-details-timings`,
								children: G
							})
						]
					})
				]
			})
		]
	});
}
function We(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = Ge(e.result);
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
function Ge(e) {
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
function Ke(e, t) {
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
function qe(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Je({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = R(() => Ke(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ H("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: qe(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ H("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Ye = [
	"👍",
	"🎉",
	"❤️"
], Xe = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ze({ quickReactions: t = Ye, onReact: n, onOpenReactionPicker: r, onReply: a, onForward: c, onTogglePin: d, pinned: f = !1, onCopyLink: p, onEdit: h, onDelete: g, className: _, "data-testid": v = "message-actions" }) {
	let y = [], b = (e, t, n, r) => y.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) b(`react-${e}`, `React ${e}`, /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	return r && b("more-reactions", "More reactions", /* @__PURE__ */ H(s, { size: 14 }), (e) => r(e.currentTarget)), a && b("reply", "Reply", /* @__PURE__ */ H(o, { size: 14 }), a), c && b("forward", "Forward to another conversation", /* @__PURE__ */ H(ee, { size: 14 }), (e) => c(e.currentTarget)), d && b("pin", f ? "Unpin" : "Pin to channel", /* @__PURE__ */ H(u, { size: 14 }), d), p && b("copy-link", "Copy link to message", /* @__PURE__ */ H(i, { size: 14 }), p), h && b("edit", "Edit message", /* @__PURE__ */ H(m, { size: 13 }), h), g && b("delete", "Delete message", /* @__PURE__ */ H(l, { size: 13 }), g), y.length === 0 ? null : /* @__PURE__ */ H(k, {
		label: "Message actions",
		"data-testid": v,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", _),
		children: y.map((e) => /* @__PURE__ */ H("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${v}-${e.key}`,
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Xe}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Qe({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = B(e), [s, c] = B(!1), [l, u] = B(null), d = z(null);
	L(() => {
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
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ H(D, {
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
			/* @__PURE__ */ U("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ H("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ H(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ H(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ H("p", {
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
function $e(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function et(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function tt({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ H("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ H("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: et(t.timestamp)
		})]
	}), /* @__PURE__ */ H("span", {
		className: "block truncate text-xs text-text-secondary",
		children: $e(t.text)
	})] });
	return /* @__PURE__ */ U("div", {
		"data-testid": a,
		"data-quoted-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ H("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ H("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ H("button", {
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
function nt(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function rt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = nt(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ H("button", {
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ H("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ U("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ H(V, { children: o ? /* @__PURE__ */ H("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ H("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ H("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ U("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ H("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ H("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: F(t.size)
			})]
		})]
	}) : /* @__PURE__ */ H("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ot, {}), /* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ H("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ H("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: F(t.size)
				})]
			})] })
		})
	});
}
function it(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function at({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : F(o);
	return /* @__PURE__ */ U("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ H("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ H(ot, {}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ U("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ H("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ H("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ H("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ H("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ H("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ H("button", {
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
function ot() {
	return /* @__PURE__ */ H("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ H("path", {
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
function st({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = se(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ U("div", {
		role: "separator",
		"aria-label": ce(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function ct(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function lt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function ut(e) {
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
function dt(e) {
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
var ft = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function pt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => ft[e] ?? e)
	};
}
function mt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function ht(e) {
	return `${mt(e)}:`;
}
function gt(e, t) {
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
function _t(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = ht(t);
	if (n) {
		let t = gt(n, r);
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
function vt(e) {
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
function yt(e) {
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
function bt(e) {
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
function xt(e) {
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
function St(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Ct(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(St(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function wt(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Tt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Et(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = wt(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = wt(r), i = Tt(r);
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
		let e = wt(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = wt(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Dt = 3, Ot = 2, kt = 3e5;
function At(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function jt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(We(e.metadata) || bt(e.metadata) || yt(e.metadata) || ut(e.metadata) || xt(e.metadata));
}
function Mt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = At(r);
	if (!i || i !== At(n) || !jt(n) || !jt(r) || r.editedAt || oe(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= kt;
}
function Nt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Pt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ U("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Ft(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function It(e) {
	return e.displayName || e.userId;
}
function Lt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = At(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Rt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: c = [], emptyState: l, composer: d, currentUserId: f, reactionsFor: p, onToggleReaction: m, onReply: h, onForwardMessage: g, onCopyLink: _, onTogglePin: v, onEditMessage: ee, onDeleteMessage: y, pinnedMessageIds: x, onJumpToMessage: te, highlightedMessageId: w, threaded: D = !1, alignOwnMessages: k = !0, documentEditors: ne, callParticipants: A, agentRunStatus: re, onOpenRun: F, onOpenResult: R, onDecideRun: ie, onReviewRun: W, onJoinCall: ae, onOpenRecording: G, onCopyRecordingLink: se, onShareRecording: ce, onDownloadRecording: le, onOpenRecordingTranscript: ue, onManageRecordingExpiry: fe, recordingStatus: pe, onOpenDocument: me, renderMessageReferences: he, tone: ge = "light", showHeader: _e, fill: be, onLoadMore: q, hasMore: Se, loadingMore: Ce = !1, onSendFiles: Te, transfers: Ee = [], currentActor: De, onCancelTransfer: Oe, attachmentSrc: ke, onOpenAttachment: je, acceptFiles: J, maxFileSize: Y, onFileError: Ne, readReceipts: Pe, readReceiptsEnabled: Fe = !0, unreadFrom: X, emojis: Ie = P }) {
	let [Le, Z] = B(null), [Re, ze] = B(null), Be = z(null), [Ve, He] = B(null), Q = ge === "dark", Ge = T(), Ke = _e ?? !(Ge?.hasHeader ?? !1), qe = be ?? Ge?.fillsHeight ?? !1, [Ye, Xe] = B(""), $e = z(null), et = z(null), nt = !!q && Se !== !1, ot = z(null), ft = z(null), [ht, gt] = B(!1), Tt = !!Te && !a, kt = Ct(n, r), At = D ? Et(kt) : null, [jt, Rt] = B(() => /* @__PURE__ */ new Set());
	function Bt(e) {
		Rt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Vt = z(void 0);
	if (X !== void 0) {
		let e = Vt.current;
		if (e === void 0) Vt.current = X;
		else {
			let t = Date.parse(X), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Vt.current = X);
		}
	}
	let Ht = Vt.current, Ut = Ht === void 0 ? -1 : Nt(At ? At.map((e) => St(e.root)) : kt.map((e) => St(e)), Ht), Wt = Pe !== void 0, Gt = Pe ?? [], $ = Fe && f ? f : void 0, Kt = (() => {
		if ($) for (let e = kt.length - 1; e >= 0; --e) {
			let t = kt[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== $ || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), qt = Kt && $ ? Ft(Gt, $, Kt.timestamp) : [], Jt = qt.length === 1 && !!$ && Lt(n, Gt, $) === 1;
	function Yt() {
		if (!Kt) return null;
		if (qt.length === 0) return Wt ? /* @__PURE__ */ H("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", k ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ H("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = qt.map(It), n = qt.slice(0, 3);
		return /* @__PURE__ */ U("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", k ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: [
				qt.length > 1 && /* @__PURE__ */ H("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ H(O, {
						name: It(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ H("span", {
					"data-testid": "chat-read-receipts-label",
					children: Jt ? "Seen" : `Seen by ${qt.length}`
				}),
				/* @__PURE__ */ H("span", {
					style: S,
					children: Jt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Xt, Zt] = B(0), [Qt, $t] = B(!1), en = z(!0), tn = z(n.length), nn = n.length + r.length + Ee.length, rn = z(null), [an, on] = B(""), sn = z(null), cn = z(!1), ln = z(0);
	L(() => {
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
		on(lt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function un() {
		let e = $e.current;
		e && (e.scrollTop = e.scrollHeight, en.current = !0, Zt(0));
	}
	function dn() {
		let e = $e.current;
		if (!e) return;
		let t = ct(e);
		en.current = t, t && Zt(0), $t(e.scrollTop > 8);
	}
	L(() => {
		let e = $e.current, t = tn.current, n = nn - t;
		if (tn.current = nn, !e) return;
		let r = rn.current;
		if (r && n > 0) {
			rn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		en.current ? (e.scrollTop = e.scrollHeight, Zt(0), $t(e.scrollTop > 8)) : n > 0 && Zt((e) => e + n);
	}, [nn]);
	function fn() {
		let e = $e.current;
		e && (rn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), q?.();
	}
	L(() => () => {
		et.current && clearTimeout(et.current);
	}, []);
	function pn() {
		let e = Ye.trim();
		!e || a || (et.current && clearTimeout(et.current), et.current = null, o?.(!1), en.current = !0, i(e), Xe(""));
	}
	function mn(e) {
		!Tt || e.length === 0 || (en.current = !0, Te?.(e));
	}
	function hn(e) {
		if (!Tt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), mn(t));
	}
	function gn(e) {
		Xe((t) => t + e), gt(!1);
	}
	function _n() {
		a || (o?.(!0), et.current && clearTimeout(et.current), et.current = setTimeout(() => o?.(!1), 2e3));
	}
	function vn(e) {
		_n(), e.key === "Enter" && !a && Ye.trim() && pn();
	}
	function yn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Ut ? /* @__PURE__ */ H(Pt, { tone: ge }) : null, l = !c && Mt(a, n), d = !o && oe(s, i) ? /* @__PURE__ */ H(st, {
			timestamp: s,
			tone: ge
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = We(r.metadata);
			return /* @__PURE__ */ U(I, { children: [
				d,
				c,
				/* @__PURE__ */ H("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ H(de, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: ge,
						mine: !0,
						contentLayout: i ? "block" : "inline",
						content: /* @__PURE__ */ U(V, { children: [
							i ? /* @__PURE__ */ H(Ue, {
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
								onOpenResult: R,
								onDecide: ie,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: W
							}) : /* @__PURE__ */ H(ve, { text: r.content }),
							/* @__PURE__ */ H("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Q ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ H("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ H(t, {
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
		let { message: b } = n, S = b.displayName ?? b.clientId.slice(0, 8), C = b.attachments ?? [], T = b.metadata?.html, E = typeof T == "string" ? T : void 0, D = vt(b.metadata), O = _t(b.content, D, E), j = /* @__PURE__ */ H(ve, {
			html: O.html,
			text: O.body
		}), M = ut(b.metadata), N = We(b.metadata), P = yt(b.metadata), L = bt(b.metadata), z = xt(b.metadata), B = pt(b.metadata), _e = dt(b.metadata), be = N ? /* @__PURE__ */ H(Ue, {
			runId: N.runId,
			instruction: N.instruction || b.content.replace(/^\/doc\s*/i, ""),
			command: N.command,
			agentName: N.agentName,
			requestedBy: b.displayName,
			status: re?.(N.runId),
			onOpenDocument: me && N.documentId ? () => me(N.documentId) : void 0,
			documentTitle: N.documentTitle,
			onOpenRun: F,
			result: N.result,
			onOpenResult: R,
			onDecide: ie,
			suggestion: N.suggestionKey ? {
				key: N.suggestionKey,
				...N.documentId ? { documentId: N.documentId } : {}
			} : void 0,
			onReview: W
		}) : L ? (() => {
			let e = pe?.(L.recordingId), t = {
				...L,
				...e ?? {}
			};
			return /* @__PURE__ */ H(Ae, {
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
				onOpen: G,
				onCopyLink: se,
				onShare: ce,
				onDownload: le,
				onOpenTranscript: ue,
				onManageExpiry: fe,
				onTogglePin: v ? () => v(b) : void 0
			});
		})() : P ? /* @__PURE__ */ H(we, {
			callId: P.callId,
			startedBy: (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			participants: A?.(P.callId) ?? P.participants,
			live: P.live,
			durationMs: P.durationMs,
			audioOnly: P.audioOnly,
			recorded: P.recorded,
			notRecordedReason: P.notRecordedReason,
			lobbyName: P.lobbyName,
			onJoin: ae
		}) : M ? /* @__PURE__ */ H(ye, {
			documentId: M.documentId,
			title: M.title || b.content,
			icon: M.icon,
			createdBy: M.createdBy ?? (typeof b.metadata?.displayName == "string" ? b.metadata.displayName : void 0) ?? b.displayName,
			editors: ne?.(M.documentId) ?? [],
			onOpen: me
		}) : C.length === 0 ? j : /* @__PURE__ */ U(V, { children: [(b.content || E) && j, C.map((e) => /* @__PURE__ */ H(rt, {
			attachment: e,
			src: ke?.(e),
			onOpen: je
		}, e.id))] }), q = b.id ?? "", Se = q && p ? p(q) : [], Ce = b.metadata?.replyTo, Te = !!o && !!Ce && Ce.messageId === o.rootId, Ee = !!Ce && !Te, De = !!q && !!x?.has(q), Oe = !!f && b.userId === f, J = b.metadata?.system === !0, Y = !!b.deletedAt || b.metadata?.deleted === !0, Ne = !!(N || L || P || M || z), Pe = !!(N || L || P || M || C.length > 0), Fe = Oe && !Y && !J && !Ne && !!q, X = !!q && !Y && !J && !Ne && C.length === 0 && !!b.content.trim(), Ie = Fe && !!ee && Le === q, Re = /* @__PURE__ */ U(V, { children: [
			Ee && Ce && /* @__PURE__ */ H(tt, {
				quote: Ce,
				onJump: te,
				className: "mb-1"
			}),
			D && /* @__PURE__ */ U("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [mt(D), D.timestamp ? K(D.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					O.stripped ? mt(D) : "Forwarded"
				]
			}),
			De && /* @__PURE__ */ U("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ H(u, { size: 11 }), " Pinned"]
			}),
			Y ? /* @__PURE__ */ H("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Ie ? /* @__PURE__ */ H(Qe, {
				initialText: b.content,
				onSave: async (e) => {
					await ee(b, e), Z(null);
				},
				onCancel: () => Z(null)
			}) : be,
			!Y && he?.(b),
			!Y && _e.length > 0 && /* @__PURE__ */ H("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: _e.map((e) => /* @__PURE__ */ H(xe, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: me
				}, e.id))
			}),
			!Y && B && /* @__PURE__ */ U("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					B.labels.length > 0 ? `Too large to send: ${B.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Y && Se.length > 0 && f && m && /* @__PURE__ */ H(Je, {
				reactions: Se,
				currentUserId: f,
				onToggle: (e) => m(q, e)
			})
		] });
		return z ? /* @__PURE__ */ U(I, { children: [
			d,
			c,
			/* @__PURE__ */ H(Me, {
				membership: z,
				fallbackText: b.content,
				timestamp: b.timestamp,
				"data-testid": "membership-notice"
			})
		] }, b.id ?? r) : /* @__PURE__ */ U(I, { children: [
			d,
			c,
			/* @__PURE__ */ U("div", {
				"data-testid": "chat-message",
				"data-message-id": q || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? K(b.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", q && q === w && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ H(de, {
					author: S,
					content: Re,
					timestamp: l ? "" : b.timestamp,
					editedAt: Y ? void 0 : b.editedAt,
					avatarUrl: b.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: ge,
					mine: Oe && k,
					contentLayout: Pe ? "block" : "inline"
				}), q && !Y && !Ie && (m || Fe || X && g || !J && (h || v || _)) && /* @__PURE__ */ H(Ze, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: m ? (e) => m(q, e) : void 0,
					onOpenReactionPicker: m ? (e) => {
						Be.current = e, ze(q);
					} : void 0,
					onReply: h && !J ? () => h(o?.rootMessage ?? b) : void 0,
					onForward: g && X ? (e) => g(b, e) : void 0,
					onCopyLink: _ && !J && q ? () => _(b) : void 0,
					onTogglePin: v && !J ? () => v(b) : void 0,
					pinned: !!b.id && !!x?.has(b.id),
					onEdit: Fe && ee ? () => Z(q) : void 0,
					onDelete: Fe && y ? () => He(q) : void 0
				})]
			}),
			!!Kt && q === Kt.id && Yt()
		] }, b.id ?? r);
	}
	function bn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function xn(e) {
		if (!h || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !xt(t.metadata)) return t;
	}
	function Sn(t, n, r) {
		let i = St(r?.root), a = r && r.replies.length === 0 && !xn(r.root) ? r.root : void 0, o = yn(t.root, n, i, a), s = St(t.root) ?? "", c = n > 0 && n !== Ut && !oe(s, i) ? /* @__PURE__ */ H("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Q ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? xn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ U(I, { children: [c, o] }, `post:${wt(t.root) ?? n}`) : o;
		let u = wt(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Dt, p = !f || jt.has(u), m = p ? t.replies : t.replies.slice(0, Ot), g = t.replies.length - m.length, _ = [...new Set(t.replies.slice(m.length).map(bn))].slice(0, 3);
		return /* @__PURE__ */ U(I, { children: [c, /* @__PURE__ */ U("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ U("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Q ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => yn(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => Bt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ H("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ H(O, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ H("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ H("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${bn(t.root)}`,
						onClick: () => h?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let Cn = /* @__PURE__ */ U("div", {
		"data-testid": "chat-panel",
		className: e(qe ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Ke && /* @__PURE__ */ U("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Q ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ H("span", {
				style: S,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: an
			}),
			/* @__PURE__ */ U("div", {
				className: e("relative flex flex-col mb-2", qe ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ H("div", {
					ref: $e,
					onScroll: dn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Qt && "fade-top", qe ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ U("div", {
						className: "mt-auto pb-4",
						children: [
							nt && n.length > 0 && /* @__PURE__ */ H("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ H("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: fn,
									disabled: Ce,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Ce ? "Loading…" : "Load earlier messages"
								})
							}),
							kt.length === 0 ? l ?? /* @__PURE__ */ H("div", {
								className: e("text-sm", Q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : At ? At.map((e, t) => Sn(e, t, At[t - 1])) : kt.map((e, t) => yn(e, t, St(kt[t - 1]), kt[t - 1])),
							m && /* @__PURE__ */ H(M, {
								open: Re !== null,
								triggerRef: Be,
								emojis: Ie,
								onSelect: (e) => {
									Re && m(Re, e), ze(null);
								},
								onClose: () => ze(null)
							}),
							y && /* @__PURE__ */ H(b, {
								open: Ve !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => He(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Ve);
									He(null), e && y(e);
								}
							}),
							Ee.map((e) => /* @__PURE__ */ H(de, {
								author: e.actor,
								timestamp: "",
								tone: ge,
								content: /* @__PURE__ */ H(at, {
									transfer: e,
									mine: it(e, f, De),
									onCancel: Oe
								})
							}, e.transferId))
						]
					})
				}), Xt > 0 && /* @__PURE__ */ U("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: un,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						Xt,
						" new message",
						Xt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ H(C, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", Q ? "text-white/50" : "text-text-secondary")
			}),
			d ? /* @__PURE__ */ H("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? _n : void 0,
				children: d
			}) : /* @__PURE__ */ U("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Te && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Tt,
						onClick: () => ot.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ H(zt, {})
					}), /* @__PURE__ */ H(j, {
						ref: ot,
						multiple: !0,
						accept: J,
						onFiles: (e) => {
							let t = Y ? e.filter((e) => e.size > Y) : [];
							t.length > 0 && Ne?.(`Skipped ${t.length} file(s) over the size limit.`), mn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ H("button", {
						ref: ft,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": ht,
						title: "Insert emoji",
						disabled: a,
						onClick: () => gt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ H(s, {
							size: 16,
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ H(M, {
						open: ht,
						onSelect: gn,
						onClose: () => gt(!1),
						triggerRef: ft,
						emojis: Ie
					}),
					/* @__PURE__ */ H(E, {
						size: "sm",
						value: Ye,
						onChange: (e) => Xe(e.target.value),
						onKeyDown: vn,
						onPaste: hn,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ H(t, {
						variant: "primary",
						size: "sm",
						onClick: pn,
						disabled: a || !Ye.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Te ? /* @__PURE__ */ H(N, {
		onFiles: mn,
		accept: J,
		maxSize: Y,
		onError: Ne,
		disabled: a,
		className: qe ? "flex h-full min-h-0 flex-col" : void 0,
		children: Cn
	}) : Cn;
}
function zt() {
	return /* @__PURE__ */ H("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
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
function Bt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Vt({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ U("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ U("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ H("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ H("div", { children: e.map((e) => {
			let n = W(Bt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = ae(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ U("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ H("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ H("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ H("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ H("span", {
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
var Ht = "min-w-0 truncate", Ut = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function Wt({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ H("time", {
		dateTime: a,
		title: o,
		className: Ut,
		children: i
	}) : /* @__PURE__ */ H("span", {
		title: o,
		className: Ut,
		children: i
	}) : null, _ = /* @__PURE__ */ U("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ U("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ H("span", {
				"data-line": "primary",
				title: r,
				className: e(Ht, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ H("span", {
			"data-line": "secondary",
			title: s,
			className: e(Ht, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ U("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ U("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ H("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ H("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ H("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function Gt(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function $({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ H("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ H("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Kt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ H($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ H(x, {
			icon: /* @__PURE__ */ H(u, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${K(e.sentAt)} · pinned ${K(e.pinnedAt)}` : K(r) : void 0;
			return /* @__PURE__ */ H(Wt, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ H(O, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: Gt(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ H("button", {
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
	return /* @__PURE__ */ H($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ H(x, {
			icon: /* @__PURE__ */ H(a, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = nt(e.attachment);
			return /* @__PURE__ */ H(Wt, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ H("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ H(h, {})
				}),
				title: e.attachment.name,
				meta: [e.author, F(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Gt(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? K(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Jt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ H($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ H(x, {
			icon: /* @__PURE__ */ H(g, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ H(Wt, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ H(O, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Gt(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? K(e.at) : void 0,
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
	return /* @__PURE__ */ H($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ H(x, {
			icon: /* @__PURE__ */ H(p, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ H(Wt, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ H("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ H(p, {})
				}),
				title: [Gt(e.startedAt), Yt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Xt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Qt({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = (t, n, r, i, a = !1) => /* @__PURE__ */ U("button", {
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ H("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), c = (e) => [r && s("create", r, /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && s("create-whiteboard", i, /* @__PURE__ */ H(v, { size: 15 }), "New whiteboard", e)].filter(Boolean), l = !!(r || i);
	return /* @__PURE__ */ U("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [l && t.length > 0 && /* @__PURE__ */ U("div", {
			className: "mb-1 flex flex-col",
			children: [r && s("create", r, /* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && s("create-whiteboard", i, /* @__PURE__ */ H(v, { size: 15 }), "New whiteboard in this conversation")]
		}), t.length === 0 ? /* @__PURE__ */ H(x, {
			icon: /* @__PURE__ */ H(h, { size: 40 }),
			title: "No documents yet",
			description: "Documents and whiteboards started here stay with this conversation.",
			action: l ? /* @__PURE__ */ H("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: c(!0)
			}) : void 0
		}) : /* @__PURE__ */ H("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ H(Wt, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ H(h, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Gt(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? K(e.updatedAt) : void 0,
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
function tn({ name: t, description: n, online: i, avatarUrl: a, features: o = $t, children: s, canvas: l, members: u, memberCount: d, files: f = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onRename: _, onCreateDocument: v, onCreateWhiteboard: ee, pins: y = [], onUnpin: b, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: ne, watchHint: A, watchViewerCount: j, callInProgress: M = !1, headerActions: N, view: P, onViewChange: re, className: F, "data-testid": I = "conversation-surface" }) {
	let L = new Set(o), [R, z] = B("chat"), ie = P ?? R, W = L.has(ie) ? ie : o[0] ?? "chat", ae = (e) => {
		P === void 0 && z(e), re?.(e);
	}, G = (e) => e || void 0, oe = o.filter((e) => en[e]).map((e) => ({
		id: e,
		label: en[e],
		badge: e === "files" ? G(f.length) : e === "documents" ? G(h.length) : e === "pins" ? G(y.length) : e === "members" ? d == null ? void 0 : G(d) : e === "calls" ? G(C.length) : e === "mentions" ? G(x.filter((e) => e.unread).length) : void 0
	})), se = (e) => {
		ae("chat"), E?.(e);
	};
	return /* @__PURE__ */ U("section", {
		className: e("flex min-w-0 flex-col", F),
		"data-testid": I,
		children: [
			/* @__PURE__ */ H(te, {
				name: t,
				onRename: _,
				description: n,
				online: i,
				avatarUrl: a,
				"data-testid": `${I}-header`,
				tabs: oe.length > 1 ? /* @__PURE__ */ H(w, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: W,
					onValueChange: (e) => ae(e),
					items: oe
				}) : void 0,
				actions: D || k || N ? /* @__PURE__ */ U(V, { children: [
					D && (O ? /* @__PURE__ */ H(r, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${I}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ H(c, { size: 16 })
					}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(r, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${I}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ H(c, { size: 16 })
					}), /* @__PURE__ */ H(r, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${I}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ H(p, { size: 16 })
					})] })),
					k && /* @__PURE__ */ H(nn, {
						testId: `${I}-watch`,
						label: ne,
						hint: A,
						viewerCount: j,
						onClick: k
					}),
					N
				] }) : void 0
			}),
			L.has("files") && W === "files" && /* @__PURE__ */ H(qt, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: m,
				onJump: E ? se : void 0
			}),
			L.has("documents") && W === "documents" && /* @__PURE__ */ H(Qt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: v,
				onCreateWhiteboard: ee
			}),
			L.has("pins") && W === "pins" && /* @__PURE__ */ H(Kt, {
				className: "min-h-0 flex-1",
				pins: y,
				onUnpin: b,
				onJump: E ? se : void 0
			}),
			L.has("members") && W === "members" && /* @__PURE__ */ H("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-members`,
				children: u
			}),
			L.has("mentions") && W === "mentions" && /* @__PURE__ */ H(Jt, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					ae("chat"), S(e, t);
				} : void 0
			}),
			L.has("calls") && W === "calls" && /* @__PURE__ */ H(Zt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: T
			}),
			L.has("chat") && /* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-chat`,
				hidden: W !== "chat",
				children: [l && /* @__PURE__ */ H("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${I}-canvas`,
					children: l
				}), /* @__PURE__ */ H("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function nn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ U(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? rn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ H(d, { size: 14 }),
			/* @__PURE__ */ H("span", { children: o }),
			s && /* @__PURE__ */ H("span", {
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
export { G as $, Je as A, Y as B, rt as C, $e as D, tt as E, We as F, Se as G, Ae as H, Ge as I, ye as J, q as K, He as L, Ke as M, Q as N, Qe as O, Ue as P, le as Q, ze as R, st as S, nt as T, Oe as U, J as V, we as W, de as X, ve as Y, ue as Z, vt as _, Jt as a, ae as at, pt as b, Yt as c, Rt as d, se as et, yt as f, mt as g, ht as h, qt as i, W as it, qe as j, Ze as k, Wt as l, dt as m, tn as n, K as nt, Zt as o, ut as p, xe as q, Qt as r, oe as rt, Kt as s, $t as t, ce as tt, Vt as u, xt as v, at as w, _t as x, bt as y, Me as z };
