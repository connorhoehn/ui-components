import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, D as i, N as a, P as o, b as s, d as c, f as l, h as u, n as d, p as f, s as p, u as m, x as h, y as g } from "./Icons-dYlqbmVH.js";
import { f as _, t as v } from "./Chip-BENLwTlq.js";
import { t as y } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as b } from "./EmptyState-JzzL2z1E.js";
import { n as x, o as S, s as C, t as w } from "./ChannelHeader-CChu0Ral.js";
import { n as T } from "./DockedPanelContext-pH9A5z1h.js";
import { t as E } from "./Input-DLknWXri.js";
import { t as D } from "./Textarea-Dz4doxTv.js";
import { t as O } from "./Avatar-BzicCOft.js";
import { n as k, t as A } from "./DropdownMenu--cgRPg4y.js";
import { t as j } from "./StatusPill-Db42eiME.js";
import { i as ee, n as M, r as N, t as P } from "./ReactionPickerPopover-CcL-n6gt.js";
import { p as te } from "./MediaIcons-OLUYBJM0.js";
import { t as F } from "./formatBytes-05ivRSJY.js";
import { Fragment as I, useEffect as L, useMemo as R, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/utils/identity.ts
var W = [
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
function G(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return W[Math.abs(t) % W.length];
}
function ne(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function K(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function re(e, t) {
	let n = K(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = K(t);
	return r ? n !== r : !1;
}
function ie(e, t = /* @__PURE__ */ new Date()) {
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
function ae(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function q(e) {
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
function oe(e, t = /* @__PURE__ */ new Date()) {
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
function se(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function ce({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = se(r), m = !o || !!p;
	return /* @__PURE__ */ U("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
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
				m && /* @__PURE__ */ U("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ H("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ H("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: q(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ H("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${q(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ H("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
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
var le = /* @__PURE__ */ new Set([
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
]), ue = /^(https?:|mailto:)/i;
function de(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ue.test(t) ? t : null;
}
function fe(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => fe(e, `${t}-${n}`));
	if (!le.has(n.tagName)) return /* @__PURE__ */ H("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ H("br", {}, t);
		case "A": {
			let e = de(n.getAttribute("href"));
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
var pe = /```([\s\S]*?)```|`([^`\n]+)`/g;
function me(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (pe.lastIndex = 0; (r = pe.exec(e)) !== null;) {
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
function he({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = R(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => fe(e, `n${t}`));
	}, [t]), o = R(() => me(n ?? ""), [n]);
	return /* @__PURE__ */ H("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ge({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
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
				children: r || /* @__PURE__ */ H(m, { size: 18 })
			}),
			/* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ H("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ H("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${_e(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ H(k, {
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
function _e(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ve({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
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
		}) : /* @__PURE__ */ H(m, {
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
function ye(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function J(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function be(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function xe({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": f = "call-activity-card" }) {
	let p = !i && typeof a == "number" ? ye(a) : "", m = o === void 0 ? "Call" : o ? "Audio call" : "Video call", h = i ? J(r, !0) : [n ? `${n} started a call` : "Call ended", p].filter(Boolean).join(" · ");
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
						children: be(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${f}-participants`,
				children: /* @__PURE__ */ H(k, {
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
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
var Se = {
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
function De({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: m = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: w, "data-testid": T = "recording-activity-card" }) {
	let E = o ?? a.length, D = u === "gone", O = u !== "saving" && u !== "failed" && !D && !!g, ee = () => {
		g?.(n);
	}, M = c != null && c > 0 ? ye(c) : "", N = Ce(s), P = Te(a, E), { state: te, label: F } = Se[u], I = [
		...g && O ? [{
			"data-testid": `${T}-menu-open`,
			label: "Open",
			onSelect: ee
		}] : [],
		...x && d ? [{
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
			label: m ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && O ? [{
			"data-testid": `${T}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], L = I.length ? [{
		items: I,
		"data-testid": `${T}-menu-items`
	}] : [];
	return /* @__PURE__ */ U("div", {
		"data-testid": T,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", w),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ U("button", {
				type: "button",
				onClick: O ? ee : void 0,
				disabled: !O,
				"aria-label": O ? `Play ${r.toLowerCase()}` : `${r}: ${F.toLowerCase()}`,
				"data-testid": `${T}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", O ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ H("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${T}-thumbnail`
					}) : /* @__PURE__ */ H(Ee, {
						participants: a,
						total: E,
						testId: T
					}),
					O && /* @__PURE__ */ H("span", {
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
					M && /* @__PURE__ */ H("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${T}-duration`,
						children: M
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
								"data-testid": `${T}-title`,
								children: r
							}), m && /* @__PURE__ */ H("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${T}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ H(h, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ U("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${T}-by`,
							children: ["by ", i]
						}),
						E > 0 && /* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							"data-testid": `${T}-people`,
							children: [/* @__PURE__ */ H(k, {
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
								children: P
							})]
						}),
						/* @__PURE__ */ U("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ H(j, {
									state: te,
									label: F,
									size: "sm",
									"data-testid": `${T}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ H(j, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${T}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ H(j, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${T}-summary`
								}),
								N && /* @__PURE__ */ H("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${T}-when`,
									children: N
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ H(A, {
					trigger: /* @__PURE__ */ H("span", {
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
		}), p && u !== "failed" && !D && /* @__PURE__ */ U("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${T}-expiry`,
			children: [/* @__PURE__ */ U("span", { children: ["Set to expire ", we(p)] }), S && /* @__PURE__ */ H(t, {
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
function Oe(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function ke(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Ae(e, t) {
	let n = e.names && e.names.length > 0 ? Oe(e.names) : e.userIds.length > 0 ? Oe(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = ke(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function je({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Ae(t, n);
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
}, Pe = 6, X = "shrink-0 whitespace-nowrap underline underline-offset-2", Fe = `${X} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Ie(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Le(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Re(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Ie(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Ie(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Ie(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Le(e.index)}`;
		case "deleteBlock": return `Removed block ${Le(e.index)}`;
		case "appendMacro": return t ? `Added a ${Ie(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Le(e.index)}`;
		case "setDocumentType": return `Type: ${Ie(t, 40)}`;
		case "skip": return t ? Ie(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Ie(t)}` : e.op;
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
var He = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Ue({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: h, suggestion: g, onReview: _, documentTitle: y, defaultExpanded: b = !1, className: x, "data-testid": S = "agent-run-card" }) {
	let C = c?.phase ?? "received", [w, T] = B(b), E = C === "completed" ? c?.suggestion ?? g : void 0, D = C === "completed" ? c?.review : void 0, O = !!E && !D, k = C === "completed" && c?.noop === !0, A = C === "completed" ? c?.result ?? d : void 0, j = A?.kind === "link" && A.label ? A.label : "Open", ee = l && !(A?.kind === "document" && f), M = Me[C], N = C === "failed" || C === "rejected", P = N ? "danger" : D ? D.decision === "accept" ? "success" : "neutral" : k ? "warning" : C === "completed" ? E ? "warning" : "success" : C === "awaiting_approval" ? "warning" : "info", F = D ? "Reviewed" : O ? "Suggested" : k ? "No change" : Ne[C], I = D ? D.byName ?? D.by : void 0, L = D ? `${D.decision === "accept" ? "Accepted" : "Rejected"} by ${I}` : void 0, R = C === "awaiting_approval", z = C === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : R ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : L ?? c?.detail ?? (O && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : C === "received" ? "Received" : F), V = c?.details, W = V?.ops ?? [], G = V?.steps ?? [], ne = V?.document?.title || y || "Document", K = !!V?.document || !!l, re = V?.error ?? (C === "failed" ? c?.detail : void 0), ie = Ve(V), ae = `${S}-details-${r}`, q = !!(O && E && _ || R && h || A && f || A?.kind === "link" && !f);
	return /* @__PURE__ */ U("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", x),
		"data-testid": S,
		"data-phase": C,
		"data-run-id": r,
		"data-expanded": w ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || T((e) => !e);
		},
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ H(te, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ U("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${S}-instruction`,
						children: [
							/* @__PURE__ */ H("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ H(v, {
						size: "xs",
						tone: P,
						"data-testid": `${S}-phase`,
						children: F
					}),
					/* @__PURE__ */ H(n, {
						size: "sm",
						"aria-label": w ? "Hide details" : "Show details",
						"aria-expanded": w,
						"aria-controls": w ? ae : void 0,
						onClick: () => T((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${S}-toggle`,
						icon: /* @__PURE__ */ H(p, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", w && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ U("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", q && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ H("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${S}-steps`,
							children: Y.map((t, n) => {
								let r = N ? n < M : n < M || n === M && C === "completed", i = n === M && C !== "completed" && !N, a = N && n === M;
								return /* @__PURE__ */ U("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ H("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? k && n === M ? "bg-warning" : "bg-success" : i ? R ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ H("span", {
										className: "sr-only",
										children: a ? F : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ H("span", {
							className: e("min-w-0 flex-1 truncate", D && (D.decision === "accept" ? "text-success" : "text-text-tertiary"), C === "failed" && "text-danger", k && "text-warning-fg"),
							"data-testid": `${S}-detail`,
							"data-review": D?.decision,
							title: c?.detail,
							children: z
						})]
					}),
					O && E && _ && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-review`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(r, "accept", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${S}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(r, "reject", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${S}-reject-review`,
							children: "Reject"
						})]
					}),
					R && h && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${S}-decide`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "approve"),
							"data-testid": `${S}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(r, "reject"),
							"data-testid": `${S}-reject`,
							children: "Reject"
						})]
					}),
					A && f && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => f(A),
						className: e(X, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": A.kind,
						children: j
					}),
					A?.kind === "link" && !f && /* @__PURE__ */ H("a", {
						href: A.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(X, "font-medium text-info"),
						"data-testid": `${S}-open-result`,
						"data-result-kind": "link",
						children: j
					}),
					u && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: () => u(r),
						className: Fe,
						"data-testid": `${S}-open-run`,
						children: "Open run"
					}),
					ee && /* @__PURE__ */ H("button", {
						type: "button",
						onClick: l,
						className: Fe,
						"data-testid": `${S}-open-document`,
						children: "Open document"
					})
				]
			}),
			w && /* @__PURE__ */ U("div", {
				id: ae,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${S}-details`,
				children: [
					K && /* @__PURE__ */ U("div", {
						className: "flex items-start gap-2",
						"data-testid": `${S}-details-document`,
						children: [
							/* @__PURE__ */ H(m, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ U("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ H("span", {
									className: "block truncate font-medium text-text-primary",
									children: ne
								}), V?.document?.snippet && /* @__PURE__ */ H("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${S}-details-snippet`,
									children: V.document.snippet
								})]
							}),
							l && /* @__PURE__ */ H(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${S}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					W.length > 0 && /* @__PURE__ */ U("div", {
						"data-testid": `${S}-details-ops`,
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ H("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: W.slice(0, Pe).map((e, t) => /* @__PURE__ */ H("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Re(e)
								}, t))
							}),
							W.length > Pe && /* @__PURE__ */ U("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${S}-details-more-ops`,
								children: [
									"+",
									W.length - Pe,
									" more"
								]
							})
						]
					}),
					G.length > 0 && /* @__PURE__ */ H("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${S}-details-steps`,
						children: G.map((t) => /* @__PURE__ */ U("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ H("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", He[t.status] ?? He.pending)
							}), /* @__PURE__ */ H("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					re && /* @__PURE__ */ H("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${S}-details-error`,
						children: re
					}),
					/* @__PURE__ */ U("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => u(r),
								className: e(X, "hover:text-text-primary"),
								"data-testid": `${S}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							A && f && /* @__PURE__ */ H("button", {
								type: "button",
								onClick: () => f(A),
								className: e(X, "font-medium text-info"),
								"data-testid": `${S}-details-open-result`,
								children: j
							}),
							ie && /* @__PURE__ */ H("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${S}-details-timings`,
								children: ie
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
	let r = Z(e.result);
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
function Z(e) {
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
	let o = R(() => Ge(t, n), [t, n]);
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
			title: Ke(t),
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
var Je = [
	"👍",
	"🎉",
	"❤️"
], Ye = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Xe({ quickReactions: t = Je, onReact: n, onOpenReactionPicker: o, onReply: s, onForward: l, onTogglePin: d, pinned: p = !1, onCopyLink: m, onEdit: g, onDelete: _, className: v, "data-testid": y = "message-actions" }) {
	let b = [], x = (e, t, n, r) => b.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) x(`react-${e}`, `React ${e}`, /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	o && x("more-reactions", "More reactions", /* @__PURE__ */ H(r, { size: 14 }), (e) => o(e.currentTarget)), s && x("reply", "Reply", /* @__PURE__ */ H(i, { size: 14 }), s), l && x("forward", "Forward to another conversation", /* @__PURE__ */ H(f, { size: 14 }), (e) => l(e.currentTarget)), d && x("pin", p ? "Unpin" : "Pin to channel", /* @__PURE__ */ H(h, { size: 14 }), d), m && x("copy-link", "Copy link to message", /* @__PURE__ */ H(u, { size: 14 }), m), g && x("edit", "Edit message", /* @__PURE__ */ H(c, { size: 13 }), g), _ && x("delete", "Delete message", /* @__PURE__ */ H(a, { size: 13 }), _);
	let [S, C] = B(0), w = z([]);
	L(() => {
		S > b.length - 1 && C(0);
	}, [S, b.length]);
	let T = S > b.length - 1 ? 0 : S, E = (e) => {
		let t = (e + b.length) % b.length;
		C(t), w.current[t]?.focus();
	};
	return b.length === 0 ? null : /* @__PURE__ */ H("div", {
		"data-testid": y,
		role: "toolbar",
		"aria-label": "Message actions",
		"aria-orientation": "horizontal",
		onKeyDown: (e) => {
			switch (e.key) {
				case "ArrowRight":
					e.preventDefault(), E(T + 1);
					break;
				case "ArrowLeft":
					e.preventDefault(), E(T - 1);
					break;
				case "Home":
					e.preventDefault(), E(0);
					break;
				case "End": e.preventDefault(), E(b.length - 1);
			}
		},
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", v),
		children: b.map((e, t) => /* @__PURE__ */ H("button", {
			ref: (e) => {
				w.current[t] = e;
			},
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${y}-${e.key}`,
			tabIndex: t === T ? 0 : -1,
			onFocus: () => C(t),
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Ye}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ze({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
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
	let o = /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ H("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ H("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: $e(t.timestamp)
		})]
	}), /* @__PURE__ */ H("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Qe(t.text)
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
function Q(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function tt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Q(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ U("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ H("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ H("img", {
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
			})
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
		children: /* @__PURE__ */ U("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ H(it, {}), /* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ H("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ H("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: F(t.size)
				})]
			})]
		})
	});
}
function nt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function rt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
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
			}) : /* @__PURE__ */ H(it, {}),
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
function it() {
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
function at({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ie(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ U("div", {
		role: "separator",
		"aria-label": ae(t),
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
function $(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Ot(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(We(e.metadata) || vt(e.metadata) || _t(e.metadata) || ct(e.metadata) || yt(e.metadata));
}
function kt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = $(r);
	if (!i || i !== $(n) || !Ot(n) || !Ot(r) || r.editedAt || re(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Dt;
}
function At(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function jt({ tone: t = "light" }) {
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
function Mt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Nt(e) {
	return e.displayName || e.userId;
}
function Pt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = $(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Ft({ messages: n, localMessages: i = [], onSend: a, disabled: o = !1, onTyping: s, typingUsers: c = [], emptyState: l, composer: u, currentUserId: d, reactionsFor: f, onToggleReaction: p, onReply: m, onForwardMessage: g, onCopyLink: _, onTogglePin: v, onEditMessage: b, onDeleteMessage: S, pinnedMessageIds: w, onJumpToMessage: D, highlightedMessageId: k, threaded: A = !1, alignOwnMessages: j = !0, documentEditors: te, callParticipants: F, agentRunStatus: R, onOpenRun: W, onOpenResult: G, onDecideRun: ne, onReviewRun: K, onJoinCall: ie, onOpenRecording: ae, onCopyRecordingLink: oe, onShareRecording: se, onDownloadRecording: le, onOpenRecordingTranscript: ue, onManageRecordingExpiry: de, recordingStatus: fe, onOpenDocument: pe, tone: me = "light", showHeader: _e, fill: ye, onLoadMore: J, hasMore: be, loadingMore: Se = !1, onSendFiles: Ce, transfers: we = [], currentActor: Te, onCancelTransfer: Ee, attachmentSrc: Oe, onOpenAttachment: ke, acceptFiles: Ae, maxFileSize: Y, onFileError: Me, readReceipts: Ne, readReceiptsEnabled: Pe = !0, unreadFrom: X, emojis: Fe = P }) {
	let [Ie, Le] = B(null), [Re, ze] = B(null), Be = z(null), [Ve, He] = B(null), Z = me === "dark", Ge = T(), Ke = _e ?? !(Ge?.hasHeader ?? !1), Je = ye ?? Ge?.fillsHeight ?? !1, [Ye, Qe] = B(""), $e = z(null), Q = z(null), it = !!J && be !== !1, ut = z(null), pt = z(null), [mt, Ct] = B(!1), Dt = !!Ce && !o, $ = xt(n, i), Ot = A ? wt($) : null, [Ft, Lt] = B(() => /* @__PURE__ */ new Set());
	function Rt(e) {
		Lt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let zt = z(void 0);
	if (X !== void 0) {
		let e = zt.current;
		if (e === void 0) zt.current = X;
		else {
			let t = Date.parse(X), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (zt.current = X);
		}
	}
	let Bt = zt.current, Vt = Bt === void 0 ? -1 : At(Ot ? Ot.map((e) => bt(e.root)) : $.map((e) => bt(e)), Bt), Ht = Ne !== void 0, Ut = Ne ?? [], Wt = Pe && d ? d : void 0, Gt = (() => {
		if (Wt) for (let e = $.length - 1; e >= 0; --e) {
			let t = $[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Wt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), Kt = Gt && Wt ? Mt(Ut, Wt, Gt.timestamp) : [], qt = Kt.length === 1 && !!Wt && Pt(n, Ut, Wt) === 1;
	function Jt() {
		if (!Gt) return null;
		if (Kt.length === 0) return Ht ? /* @__PURE__ */ H("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", j ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ H("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = Kt.map(Nt), n = Kt.slice(0, 3);
		return /* @__PURE__ */ U("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", j ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				Kt.length > 1 && /* @__PURE__ */ H("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ H(O, {
						name: Nt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ H("span", {
					"data-testid": "chat-read-receipts-label",
					children: qt ? "Seen" : `Seen by ${Kt.length}`
				}),
				/* @__PURE__ */ H("span", {
					style: C,
					children: qt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Yt, Xt] = B(0), [Zt, Qt] = B(!1), $t = z(!0), en = z(n.length), tn = n.length + i.length + we.length, nn = z(null), [rn, an] = B(""), on = z(null), sn = z(!1), cn = z(0);
	L(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!sn.current) {
			sn.current = !0, on.current = t;
			return;
		}
		if (t === on.current || (on.current = t, d && e.userId === d)) return;
		cn.current += 1;
		let r = cn.current % 2 == 0 ? "​" : "";
		an(st(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, d]);
	function ln() {
		let e = $e.current;
		e && (e.scrollTop = e.scrollHeight, $t.current = !0, Xt(0));
	}
	function un() {
		let e = $e.current;
		if (!e) return;
		let t = ot(e);
		$t.current = t, t && Xt(0), Qt(e.scrollTop > 8);
	}
	L(() => {
		let e = $e.current, t = en.current, n = tn - t;
		if (en.current = tn, !e) return;
		let r = nn.current;
		if (r && n > 0) {
			nn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$t.current ? (e.scrollTop = e.scrollHeight, Xt(0), Qt(e.scrollTop > 8)) : n > 0 && Xt((e) => e + n);
	}, [tn]);
	function dn() {
		let e = $e.current;
		e && (nn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), J?.();
	}
	L(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function fn() {
		let e = Ye.trim();
		!e || o || (Q.current && clearTimeout(Q.current), Q.current = null, s?.(!1), $t.current = !0, a(e), Qe(""));
	}
	function pn(e) {
		!Dt || e.length === 0 || ($t.current = !0, Ce?.(e));
	}
	function mn(e) {
		if (!Dt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), pn(t));
	}
	function hn(e) {
		Qe((t) => t + e), Ct(!1);
	}
	function gn() {
		o || (s?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => s?.(!1), 2e3));
	}
	function _n(e) {
		gn(), e.key === "Enter" && !o && Ye.trim() && fn();
	}
	function vn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Vt ? /* @__PURE__ */ H(jt, { tone: me }) : null, l = !c && kt(a, n), u = !o && re(s, i) ? /* @__PURE__ */ H(at, {
			timestamp: s,
			tone: me
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = We(r.metadata);
			return /* @__PURE__ */ U(I, { children: [
				u,
				c,
				/* @__PURE__ */ H("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ H(ce, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: me,
						mine: !0,
						content: /* @__PURE__ */ U(V, { children: [
							i ? /* @__PURE__ */ H(Ue, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: R?.(i.runId),
								onOpenDocument: pe && i.documentId ? () => pe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: W,
								result: i.result,
								onOpenResult: G,
								onDecide: ne,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: K
							}) : /* @__PURE__ */ H(he, { text: r.content }),
							/* @__PURE__ */ H("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
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
		let { message: y } = n, x = y.displayName ?? y.clientId.slice(0, 8), C = y.attachments ?? [], T = y.metadata?.html, E = typeof T == "string" ? T : void 0, O = gt(y.metadata), A = ht(y.content, O, E), ee = /* @__PURE__ */ H(he, {
			html: A.html,
			text: A.body
		}), M = ct(y.metadata), N = We(y.metadata), P = _t(y.metadata), L = vt(y.metadata), z = yt(y.metadata), B = dt(y.metadata), _e = lt(y.metadata), ye = N ? /* @__PURE__ */ H(Ue, {
			runId: N.runId,
			instruction: N.instruction || y.content.replace(/^\/doc\s*/i, ""),
			command: N.command,
			agentName: N.agentName,
			requestedBy: y.displayName,
			status: R?.(N.runId),
			onOpenDocument: pe && N.documentId ? () => pe(N.documentId) : void 0,
			documentTitle: N.documentTitle,
			onOpenRun: W,
			result: N.result,
			onOpenResult: G,
			onDecide: ne,
			suggestion: N.suggestionKey ? {
				key: N.suggestionKey,
				...N.documentId ? { documentId: N.documentId } : {}
			} : void 0,
			onReview: K
		}) : L ? (() => {
			let e = fe?.(L.recordingId), t = {
				...L,
				...e ?? {}
			};
			return /* @__PURE__ */ H(De, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? y.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!y.id && !!w?.has(y.id),
				onOpen: ae,
				onCopyLink: oe,
				onShare: se,
				onDownload: le,
				onOpenTranscript: ue,
				onManageExpiry: de,
				onTogglePin: v ? () => v(y) : void 0
			});
		})() : P ? /* @__PURE__ */ H(xe, {
			callId: P.callId,
			startedBy: (typeof y.metadata?.displayName == "string" ? y.metadata.displayName : void 0) ?? y.displayName,
			participants: F?.(P.callId) ?? P.participants,
			live: P.live,
			durationMs: P.durationMs,
			audioOnly: P.audioOnly,
			recorded: P.recorded,
			notRecordedReason: P.notRecordedReason,
			lobbyName: P.lobbyName,
			onJoin: ie
		}) : M ? /* @__PURE__ */ H(ge, {
			documentId: M.documentId,
			title: M.title || y.content,
			icon: M.icon,
			createdBy: M.createdBy ?? (typeof y.metadata?.displayName == "string" ? y.metadata.displayName : void 0) ?? y.displayName,
			editors: te?.(M.documentId) ?? [],
			onOpen: pe
		}) : C.length === 0 ? ee : /* @__PURE__ */ U(V, { children: [(y.content || E) && ee, C.map((e) => /* @__PURE__ */ H(tt, {
			attachment: e,
			src: Oe?.(e),
			onOpen: ke
		}, e.id))] }), J = y.id ?? "", be = J && f ? f(J) : [], Se = y.metadata?.replyTo, Ce = !!o && !!Se && Se.messageId === o.rootId, we = !!Se && !Ce, Te = !!J && !!w?.has(J), Ee = !!d && y.userId === d, Ae = y.metadata?.system === !0, Y = !!y.deletedAt || y.metadata?.deleted === !0, Me = !!(N || L || P || M || z), Ne = Ee && !Y && !Ae && !Me && !!J, Pe = !!J && !Y && !Ae && !Me && C.length === 0 && !!y.content.trim(), X = Ne && !!b && Ie === J, Fe = /* @__PURE__ */ U(V, { children: [
			we && Se && /* @__PURE__ */ H(et, {
				quote: Se,
				onJump: D,
				className: "mb-1"
			}),
			O && /* @__PURE__ */ U("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [ft(O), O.timestamp ? q(O.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					A.stripped ? ft(O) : "Forwarded"
				]
			}),
			Te && /* @__PURE__ */ U("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ H(h, { size: 11 }), " Pinned"]
			}),
			Y ? /* @__PURE__ */ H("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : X ? /* @__PURE__ */ H(Ze, {
				initialText: y.content,
				onSave: async (e) => {
					await b(y, e), Le(null);
				},
				onCancel: () => Le(null)
			}) : ye,
			!Y && _e.length > 0 && /* @__PURE__ */ H("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: _e.map((e) => /* @__PURE__ */ H(ve, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: pe
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
			!Y && be.length > 0 && d && p && /* @__PURE__ */ H(qe, {
				reactions: be,
				currentUserId: d,
				onToggle: (e) => p(J, e)
			})
		] });
		return z ? /* @__PURE__ */ U(I, { children: [
			u,
			c,
			/* @__PURE__ */ H(je, {
				membership: z,
				fallbackText: y.content,
				timestamp: y.timestamp,
				"data-testid": "membership-notice"
			})
		] }, y.id ?? r) : /* @__PURE__ */ U(I, { children: [
			u,
			c,
			/* @__PURE__ */ U("div", {
				"data-testid": "chat-message",
				"data-message-id": J || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? q(y.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", J && J === k && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ H(ce, {
					author: x,
					content: Fe,
					timestamp: l ? "" : y.timestamp,
					editedAt: Y ? void 0 : y.editedAt,
					avatarUrl: y.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: me,
					mine: Ee && j
				}), J && !Y && !X && (p || Ne || Pe && g || !Ae && (m || v || _)) && /* @__PURE__ */ H(Xe, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: p ? (e) => p(J, e) : void 0,
					onOpenReactionPicker: p ? (e) => {
						Be.current = e, ze(J);
					} : void 0,
					onReply: m && !Ae ? () => m(o?.rootMessage ?? y) : void 0,
					onForward: g && Pe ? (e) => g(y, e) : void 0,
					onCopyLink: _ && !Ae && J ? () => _(y) : void 0,
					onTogglePin: v && !Ae ? () => v(y) : void 0,
					pinned: !!y.id && !!w?.has(y.id),
					onEdit: Ne && b ? () => Le(J) : void 0,
					onDelete: Ne && S ? () => He(J) : void 0
				})]
			}),
			!!Gt && J === Gt.id && Jt()
		] }, y.id ?? r);
	}
	function yn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function bn(e) {
		if (!m || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !yt(t.metadata)) return t;
	}
	function xn(t, n, r) {
		let i = bt(r?.root), a = r && r.replies.length === 0 && !bn(r.root) ? r.root : void 0, o = vn(t.root, n, i, a), s = bt(t.root) ?? "", c = n > 0 && n !== Vt && !re(s, i) ? /* @__PURE__ */ H("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? bn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ U(I, { children: [c, o] }, `post:${St(t.root) ?? n}`) : o;
		let u = St(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Tt, p = !f || Ft.has(u), h = p ? t.replies : t.replies.slice(0, Et), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(yn))].slice(0, 3);
		return /* @__PURE__ */ U(I, { children: [c, /* @__PURE__ */ U("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ U("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => vn(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => Rt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
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
						"aria-label": `Reply to ${yn(t.root)}`,
						onClick: () => m?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let Sn = /* @__PURE__ */ U("div", {
		"data-testid": "chat-panel",
		className: e(Je ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Ke && /* @__PURE__ */ U("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ H("span", {
				style: C,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: rn
			}),
			/* @__PURE__ */ U("div", {
				className: e("relative flex flex-col mb-2", Je ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ H("div", {
					ref: $e,
					onScroll: un,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Zt && "fade-top", Je ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ U("div", {
						className: "mt-auto pb-4",
						children: [
							it && n.length > 0 && /* @__PURE__ */ H("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ H("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: dn,
									disabled: Se,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Se ? "Loading…" : "Load earlier messages"
								})
							}),
							$.length === 0 ? l ?? /* @__PURE__ */ H("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : Ot ? Ot.map((e, t) => xn(e, t, Ot[t - 1])) : $.map((e, t) => vn(e, t, bt($[t - 1]), $[t - 1])),
							p && /* @__PURE__ */ H(M, {
								open: Re !== null,
								triggerRef: Be,
								emojis: Fe,
								onSelect: (e) => {
									Re && p(Re, e), ze(null);
								},
								onClose: () => ze(null)
							}),
							S && /* @__PURE__ */ H(y, {
								open: Ve !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => He(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Ve);
									He(null), e && S(e);
								}
							}),
							we.map((e) => /* @__PURE__ */ H(ce, {
								author: e.actor,
								timestamp: "",
								tone: me,
								content: /* @__PURE__ */ H(rt, {
									transfer: e,
									mine: nt(e, d, Te),
									onCancel: Ee
								})
							}, e.transferId))
						]
					})
				}), Yt > 0 && /* @__PURE__ */ U("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: ln,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Yt,
						" new message",
						Yt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ H(x, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", Z ? "text-white/50" : "text-text-secondary")
			}),
			u ? /* @__PURE__ */ H("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: s ? gn : void 0,
				children: u
			}) : /* @__PURE__ */ U("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Ce && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Dt,
						onClick: () => ut.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ H(It, {})
					}), /* @__PURE__ */ H(ee, {
						ref: ut,
						multiple: !0,
						accept: Ae,
						onFiles: (e) => {
							let t = Y ? e.filter((e) => e.size > Y) : [];
							t.length > 0 && Me?.(`Skipped ${t.length} file(s) over the size limit.`), pn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ H("button", {
						ref: pt,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": mt,
						title: "Insert emoji",
						disabled: o,
						onClick: () => Ct((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ H(r, {
							size: 16,
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ H(M, {
						open: mt,
						onSelect: hn,
						onClose: () => Ct(!1),
						triggerRef: pt,
						emojis: Fe
					}),
					/* @__PURE__ */ H(E, {
						size: "sm",
						value: Ye,
						onChange: (e) => Qe(e.target.value),
						onKeyDown: _n,
						onPaste: mn,
						disabled: o,
						placeholder: o ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ H(t, {
						variant: "primary",
						size: "sm",
						onClick: fn,
						disabled: o || !Ye.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Ce ? /* @__PURE__ */ H(N, {
		onFiles: pn,
		accept: Ae,
		maxSize: Y,
		onError: Me,
		disabled: o,
		className: Je ? "flex h-full min-h-0 flex-col" : void 0,
		children: Sn
	}) : Sn;
}
function It() {
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
function Lt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Rt({ users: e, currentClientId: t }) {
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
			let n = G(Lt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = ne(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
var zt = "min-w-0 truncate", Bt = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function Vt({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": p, ...m }) {
	let h = r ? i ? /* @__PURE__ */ H("time", {
		dateTime: i,
		title: a,
		className: Bt,
		children: r
	}) : /* @__PURE__ */ H("span", {
		title: a,
		className: Bt,
		children: r
	}) : null, g = /* @__PURE__ */ U("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ U("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ H("span", {
				"data-line": "primary",
				title: n,
				className: e(zt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), h]
		}), /* @__PURE__ */ H("span", {
			"data-line": "secondary",
			title: o,
			className: e(zt, "text-[11px] leading-snug", s ? _[s] : "text-text-tertiary"),
			children: o
		})]
	});
	return /* @__PURE__ */ U("li", {
		...m,
		"data-testid": p,
		"data-unread": d ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", f),
		children: [
			/* @__PURE__ */ U("span", {
				className: "relative shrink-0",
				children: [t, d && /* @__PURE__ */ H("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			l ? /* @__PURE__ */ H("button", {
				type: "button",
				onClick: l,
				"aria-label": u,
				"data-testid": p ? `${p}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: g
			}) : /* @__PURE__ */ H("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: g
			}),
			c && /* @__PURE__ */ H("span", {
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
	return /* @__PURE__ */ H("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ H("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Wt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ H(Ut, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ H(b, {
			icon: /* @__PURE__ */ H(h, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${q(e.sentAt)} · pinned ${q(e.pinnedAt)}` : q(r) : void 0;
			return /* @__PURE__ */ H(Vt, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ H(O, {
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
function Gt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ H(Ut, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ H(b, {
			icon: /* @__PURE__ */ H(g, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Q(e.attachment);
			return /* @__PURE__ */ H(Vt, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ H("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ H(m, {})
				}),
				title: e.attachment.name,
				meta: [e.author, F(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Ht(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? q(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Kt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ H(Ut, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ H(b, {
			icon: /* @__PURE__ */ H(d, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ H(Vt, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ H(O, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Ht(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? q(e.at) : void 0,
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
	return /* @__PURE__ */ H(Ut, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ H(b, {
			icon: /* @__PURE__ */ H(o, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ H(Vt, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ H("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ H(o, {})
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
	let o = r && /* @__PURE__ */ U("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ H("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ U("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [o, t.length === 0 ? /* @__PURE__ */ H(b, {
			icon: /* @__PURE__ */ H(m, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ H("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ H(Vt, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ H("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ H(m, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Ht(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? q(e.updatedAt) : void 0,
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
function $t({ name: t, description: r, online: i, avatarUrl: a, features: c = Zt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: C = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: ee, callInProgress: M = !1, headerActions: N, view: P, onViewChange: te, className: F, "data-testid": I = "conversation-surface" }) {
	let L = new Set(c), [R, z] = B("chat"), W = P ?? R, G = L.has(W) ? W : c[0] ?? "chat", ne = (e) => {
		P === void 0 && z(e), te?.(e);
	}, K = (e) => e || void 0, re = c.filter((e) => Qt[e]).map((e) => ({
		id: e,
		label: Qt[e],
		badge: e === "files" ? K(p.length) : e === "documents" ? K(h.length) : e === "pins" ? K(v.length) : e === "members" ? f == null ? void 0 : K(f) : e === "calls" ? K(C.length) : e === "mentions" ? K(b.filter((e) => e.unread).length) : void 0
	})), ie = (e) => {
		ne("chat"), E?.(e);
	};
	return /* @__PURE__ */ U("section", {
		className: e("flex min-w-0 flex-col", F),
		"data-testid": I,
		children: [
			/* @__PURE__ */ H(w, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${I}-header`,
				tabs: re.length > 1 ? /* @__PURE__ */ H(S, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: G,
					onValueChange: (e) => ne(e),
					items: re
				}) : void 0,
				actions: D || k || N ? /* @__PURE__ */ U(V, { children: [
					D && (O ? /* @__PURE__ */ H(n, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${I}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ H(s, { size: 16 })
					}) : /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(n, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${I}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ H(s, { size: 16 })
					}), /* @__PURE__ */ H(n, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${I}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ H(o, { size: 16 })
					})] })),
					k && /* @__PURE__ */ H(en, {
						testId: `${I}-watch`,
						label: A,
						hint: j,
						viewerCount: ee,
						onClick: k
					}),
					N
				] }) : void 0
			}),
			L.has("files") && G === "files" && /* @__PURE__ */ H(Gt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: E ? ie : void 0
			}),
			L.has("documents") && G === "documents" && /* @__PURE__ */ H(Xt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			L.has("pins") && G === "pins" && /* @__PURE__ */ H(Wt, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: E ? ie : void 0
			}),
			L.has("members") && G === "members" && /* @__PURE__ */ H("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-members`,
				children: d
			}),
			L.has("mentions") && G === "mentions" && /* @__PURE__ */ H(Kt, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					ne("chat"), x(e, t);
				} : void 0
			}),
			L.has("calls") && G === "calls" && /* @__PURE__ */ H(Yt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: T
			}),
			L.has("chat") && /* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-chat`,
				hidden: G !== "chat",
				children: [u && /* @__PURE__ */ H("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${I}-canvas`,
					children: u
				}), /* @__PURE__ */ H("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function en({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ U(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? tn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ H(l, { size: 14 }),
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
var tn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { K as $, qe as A, Ae as B, tt as C, Qe as D, et as E, We as F, J as G, De as H, Z as I, ge as J, ye as K, Ve as L, Ge as M, He as N, Ze as O, Ue as P, oe as Q, Re as R, at as S, Q as T, Te as U, ke as V, xe as W, ce as X, he as Y, se as Z, gt as _, Kt as a, ne as at, dt as b, qt as c, Ft as d, ie as et, _t as f, ft as g, pt as h, Gt as i, G as it, Ke as j, Xe as k, Vt as l, lt as m, $t as n, q as nt, Yt as o, ct as p, ve as q, Xt as r, re as rt, Wt as s, Zt as t, ae as tt, Rt as u, yt as v, rt as w, ht as x, vt as y, je as z };
