import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t, p as n } from "./overlayStack-CHdlnODN.js";
import { t as r } from "./Chip-4IBrlduZ.js";
import { t as i } from "./IconButton-DDeXW3mZ.js";
import { E as a, G as o, N as s, S as c, V as l, W as u, b as d, dt as f, f as p, gt as m, i as h, mt as g, ot as _, tt as v, v as y } from "./Icons-CCn6EnUZ.js";
import { t as b } from "./ConfirmDialog-CSS_SMC6.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./EmptyState-zKbpAhFD.js";
import { a as ee, n as te, t as C } from "./ChannelHeader-qvaO7oMR.js";
import { n as w } from "./Tabs-CWj6ZL7J.js";
import { n as T } from "./DockedPanelContext-pH9A5z1h.js";
import { t as E } from "./Textarea-Dz4doxTv.js";
import { t as D } from "./Avatar-DeJWic2B.js";
import { t as O } from "./DotMeter-BDVkadI8.js";
import { t as k } from "./RovingToolbar-CmQag9q6.js";
import { t as A } from "./PresenceAvatars-Dmtv09Kg.js";
import { t as ne } from "./DropdownMenu-dM1tsyrs.js";
import { t as j } from "./StatusPill-C-aN2Pzz.js";
import { i as M, n as N, r as P, t as F } from "./ReactionPickerPopover-DkcC4xmE.js";
import { n as re } from "./useComputeProjects-ZSazDRet.js";
import { g as I } from "./MediaIcons-_ai5Til2.js";
import { t as L } from "./formatBytes-05ivRSJY.js";
import { Fragment as ie, useEffect as R, useMemo as z, useRef as B, useState as V } from "react";
import { Fragment as H, jsx as U, jsxs as W } from "react/jsx-runtime";
//#region src/utils/identity.ts
var G = [
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
	return G[Math.abs(t) % G.length];
}
function ae(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function oe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function se(e, t) {
	let n = oe(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = oe(t);
	return r ? n !== r : !1;
}
function ce(e, t = /* @__PURE__ */ new Date()) {
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
function le(e) {
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
function ue(e, t = /* @__PURE__ */ new Date()) {
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
function de(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function fe({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, contentLayout: d = "inline", className: f }) {
	let p = l === "dark", m = de(r), h = !o || !!m;
	return /* @__PURE__ */ W("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", f),
		children: [/* @__PURE__ */ U("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ U(D, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ W("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				h && /* @__PURE__ */ W("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ U("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", p ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						m && /* @__PURE__ */ U("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: q(r),
							className: e("text-xs shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: m
						}),
						u && /* @__PURE__ */ U("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${q(u)}`,
							className: e("text-[11px] shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ U("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", p ? "text-white/90" : "text-text-primary", s && d === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && d === "inline" && (p ? "bg-white/15" : "bg-primary-bg"), d === "block" && "w-full max-w-[30rem]"),
					children: n
				}),
				c && /* @__PURE__ */ U("div", {
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
var pe = /* @__PURE__ */ new Set([
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
]), me = /^(https?:|mailto:)/i;
function he(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || me.test(t) ? t : null;
}
function ge(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => ge(e, `${t}-${n}`));
	if (!pe.has(n.tagName)) return /* @__PURE__ */ U("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ U("br", {}, t);
		case "A": {
			let e = he(n.getAttribute("href"));
			return e ? /* @__PURE__ */ U("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ U("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ U("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ U(e, { children: r }, t);
		}
	}
}
var _e = /```([\s\S]*?)```|`([^`\n]+)`/g;
function ve(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (_e.lastIndex = 0; (r = _e.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ U("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ U("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ U("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ye({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = z(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ge(e, `n${t}`));
	}, [t]), o = z(() => ve(n ?? ""), [n]);
	return /* @__PURE__ */ U("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function be(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function xe({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: c, "data-testid": l = "document-activity-card" }) {
	let u = !s && a.length > 0;
	return /* @__PURE__ */ W("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", c),
		children: [
			/* @__PURE__ */ U("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ U(y, { size: 18 })
			}),
			/* @__PURE__ */ W("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ U("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ U("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${l}-unavailable` : void 0,
					children: s ? be(s) : u ? `${Se(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ U("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ U(A, {
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
			o && !s && /* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function Se(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function Ce({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let c = a ? void 0 : i, l = a ? be(a) : null;
	return /* @__PURE__ */ W("button", {
		type: "button",
		onClick: c ? () => c(t) : void 0,
		disabled: !c,
		title: l ? `${n} — ${l}` : n,
		"data-testid": s,
		"data-document-id": t,
		"data-unavailable": a,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", c ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a && "border-dashed text-text-tertiary opacity-70", o),
		children: [
			r ? /* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ U(y, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ U("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			l && /* @__PURE__ */ W("span", {
				className: "shrink-0",
				"data-testid": `${s}-unavailable`,
				children: ["· ", l]
			})
		]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function we(e) {
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
function Te(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Ee(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function De(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function Oe(e, t) {
	let n = De(e), [r, i] = V(() => Date.now());
	return R(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function ke(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Ae({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = Oe(o, _), y = !_ && typeof a == "number" ? we(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = ke(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = J(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : J(r, !1)), /* @__PURE__ */ W("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ W("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ W("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ U("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ U("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ W("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ U("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ W("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ U("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${Ee(v)}`
							}),
							_ && /* @__PURE__ */ U("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ U("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ U("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: Te(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ U("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ U(A, {
					users: r.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: _
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			!_ && c && l && /* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ U("button", {
				type: "button",
				"data-testid": `${g}-join`,
				onClick: () => m(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-on-primary hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
var je = {
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
function Me(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Ne(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Pe(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Y({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ W("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ U("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ U(D, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ W("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ U("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ U("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ U("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Fe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: s, startedAt: c, durationMs: l, thumbnailUrl: u, stage: d = "ready", transcriptReady: f = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: ee, className: te, "data-testid": C = "recording-activity-card" }) {
	let w = s ?? a.length, T = d === "gone", E = d !== "saving" && d !== "failed" && !T && !!g, D = () => {
		g?.(n);
	}, O = l != null && l > 0 ? we(l) : "", k = Me(c), M = Pe(a, w), { state: N, label: P } = je[d], F = [
		...g && E ? [{
			"data-testid": `${C}-menu-open`,
			label: "Open",
			onSelect: D
		}] : [],
		...x && f ? [{
			"data-testid": `${C}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		..._ && !T ? [{
			"data-testid": `${C}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !T ? [{
			"data-testid": `${C}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...y && !T ? [{
			"data-testid": `${C}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && E ? [{
			"data-testid": `${C}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], re = F.length ? [{
		items: F,
		"data-testid": `${C}-menu-items`
	}] : [];
	return /* @__PURE__ */ W("div", {
		"data-testid": C,
		"data-recording-id": n,
		"data-stage": d,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", te),
		children: [/* @__PURE__ */ W("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ W("button", {
				type: "button",
				onClick: E ? D : void 0,
				disabled: !E,
				"aria-label": E ? `Play ${r.toLowerCase()}` : `${r}: ${P.toLowerCase()}`,
				"data-testid": `${C}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", E ? "cursor-pointer" : "cursor-default"),
				children: [
					u ? /* @__PURE__ */ U("img", {
						src: u,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${C}-thumbnail`
					}) : /* @__PURE__ */ U(Y, {
						participants: a,
						total: w,
						testId: C
					}),
					E && /* @__PURE__ */ U("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ U("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ U("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ U("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					O && /* @__PURE__ */ U("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${C}-duration`,
						children: O
					})
				]
			}), /* @__PURE__ */ W("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ W("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ W("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ U("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${C}-title`,
								children: r
							}), h && /* @__PURE__ */ U("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${C}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ U(o, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ W("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${C}-by`,
							children: ["by ", i]
						}),
						w > 0 && /* @__PURE__ */ W("div", {
							className: "flex items-center gap-2",
							"data-testid": `${C}-people`,
							children: [/* @__PURE__ */ U(A, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: ee
							}), /* @__PURE__ */ U("span", {
								className: "truncate text-xs text-text-tertiary",
								children: M
							})]
						}),
						/* @__PURE__ */ W("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ U(j, {
									state: N,
									label: P,
									size: "sm",
									"data-testid": `${C}-stage`
								}),
								d === "ready" && f && /* @__PURE__ */ U(j, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${C}-transcript`
								}),
								d === "ready" && p && /* @__PURE__ */ U(j, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${C}-summary`
								}),
								k && /* @__PURE__ */ U("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${C}-when`,
									children: k
								})
							]
						})
					]
				}), re.length > 0 && /* @__PURE__ */ U(ne, {
					trigger: /* @__PURE__ */ U("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: re,
					"data-testid": `${C}-menu`
				})]
			})]
		}), m && d !== "failed" && !T && /* @__PURE__ */ W("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${C}-expiry`,
			children: [/* @__PURE__ */ W("span", { children: ["Set to expire ", Ne(m)] }), S && /* @__PURE__ */ U(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => S(n),
				"data-testid": `${C}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function Ie(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function Le(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Re(e, t) {
	let n = e.names && e.names.length > 0 ? Ie(e.names) : e.userIds.length > 0 ? Ie(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = Le(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function ze({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Re(t, n);
	return /* @__PURE__ */ W("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ U("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ U("time", {
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
var X = {
	planning: {
		label: "Planning",
		tone: "info",
		dot: "bg-info",
		busy: !0
	},
	starting: {
		label: "Starting",
		tone: "info",
		dot: "bg-info",
		busy: !0
	},
	running: {
		label: "Running",
		tone: "info",
		dot: "bg-success",
		busy: !0
	},
	waiting: {
		label: "Waiting",
		tone: "warning",
		dot: "bg-warning",
		busy: !1
	},
	done: {
		label: "Done",
		tone: "success",
		dot: "bg-success",
		busy: !1
	},
	failed: {
		label: "Failed",
		tone: "danger",
		dot: "bg-danger",
		busy: !1
	},
	stopped: {
		label: "Stopped",
		tone: "neutral",
		dot: "bg-border",
		busy: !1
	},
	budget: {
		label: "Budget spent",
		tone: "warning",
		dot: "bg-warning",
		busy: !1
	}
}, Be = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function Ve(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function He(e) {
	let t = e.steps ?? [], n = t.length, r = t.findIndex((e) => e.status === "running");
	switch (e.phase) {
		case "planning": return "Planning…";
		case "starting": return "Starting the box…";
		case "running": return r >= 0 ? `Running step ${r + 1} of ${n} — ${t[r].title}` : "Running…";
		case "waiting": {
			let e = t.filter((e) => e.status === "done").length;
			return n ? `Waiting between turns · ${e} of ${n} steps done` : "Waiting between turns";
		}
		case "done": return e.outcome ?? (n ? `Done · ${n} ${n === 1 ? "step" : "steps"}` : "Done");
		case "failed": return e.outcome ?? "The loop failed.";
		case "stopped": return e.outcome ?? "Stopped";
		case "budget": return e.outcome ?? "Stopped at its context budget";
		default: return X[e.phase]?.label ?? "Running…";
	}
}
function Ue(e) {
	let t = !!e && (X[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = V(() => Date.now());
	return R(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var We = [
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
], Ge = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Ke = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, qe = 6;
function Je(e) {
	switch ((e ?? "").replace(/^\//, "").toLowerCase()) {
		case "deck": return "the deck";
		case "doc":
		case "edit": return "the edit";
		case "summarize": return "the summary";
		case "diagram": return "the diagram";
		case "transcribe": return "the transcript";
		case "recording": return "the recording";
		default: return "the result";
	}
}
function Z(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = Je(t), a = /chat service|chat:|the join|conversation/.test(r);
	return /refused to post|refused to read|dm_forbidden|not a member|forbidden|not allowed|permission/.test(r) ? {
		summary: `Couldn't post ${i} to this conversation — you're not a member of it.`,
		technical: n
	} : a && /did not answer|did not confirm|timeout|timed out|within \d+ ?ms/.test(r) ? {
		summary: `Couldn't post ${i} to this conversation — the chat didn't respond. Try again.`,
		technical: n
	} : /gateway connection failed|could not connect|did not open|econnrefused|enotfound|socket hang up|network/.test(r) ? {
		summary: `Couldn't reach the chat service to post ${i}. Try again.`,
		technical: n
	} : /model slot|rate limit|rate_limit|rate limited|overloaded|quota/.test(r) ? {
		summary: `The agent is busy right now, so ${i} wasn't made. Try again in a minute.`,
		technical: n
	} : /model did not answer/.test(r) ? {
		summary: `The agent didn't answer in time, so ${i} wasn't made. Try again in a minute.`,
		technical: n
	} : /timeout|timed out|etimedout/.test(r) ? {
		summary: `Making ${i} took too long and was stopped. Try again.`,
		technical: n
	} : { summary: n };
}
var Ye = "shrink-0 whitespace-nowrap underline underline-offset-2", Xe = `${Ye} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Q(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Ze(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Qe(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Q(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Q(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Q(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Ze(e.index)}`;
		case "deleteBlock": return `Removed block ${Ze(e.index)}`;
		case "appendMacro": return t ? `Added a ${Q(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Ze(e.index)}`;
		case "setDocumentType": return `Type: ${Q(t, 40)}`;
		case "skip": return t ? Q(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Q(t)}` : e.op;
	}
}
function $e(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function et(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function tt(e) {
	if (!e?.startedAt) return null;
	let t = $e(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? et(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var nt = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function rt({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = X[n.phase] ?? X.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ U("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: He(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ U("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: Ve(r)
			}),
			c > 0 && /* @__PURE__ */ W("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ W("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						re(l),
						" / ",
						re(c)
					]
				}), /* @__PURE__ */ U(O, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ U("button", {
				type: "button",
				onClick: () => i(t),
				className: e(Ye, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ U("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ W("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Be[t.status] ?? Be.pending)
			}), /* @__PURE__ */ U("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function it({ runId: n, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: m, onDecide: h, suggestion: g, onReview: _, onRetry: v, documentTitle: b, defaultExpanded: x = !1, loop: S, onOpenLab: ee, className: te, "data-testid": C = "agent-run-card" }) {
	let w = l?.phase ?? "received", [T, E] = V(x), D = Ue(S), O = w === "completed" ? l?.suggestion ?? g : void 0, k = w === "completed" ? l?.review : void 0, A = !!O && !k, ne = w === "completed" && l?.noop === !0, j = w === "completed" ? l?.result ?? f : void 0, M = j?.kind === "link" && j.label ? j.label : "Open", N = u && !(j?.kind === "document" && m), P = Ge[w], F = w === "failed" || w === "rejected", re = F ? "danger" : k ? k.decision === "accept" ? "success" : "neutral" : ne ? "warning" : w === "completed" ? O ? "warning" : "success" : w === "awaiting_approval" ? "warning" : "info", L = k ? "Reviewed" : A ? "Suggested" : ne ? "No change" : Ke[w], ie = k ? k.byName ?? k.by : void 0, R = k ? `${k.decision === "accept" ? "Accepted" : "Rejected"} by ${ie}` : void 0, z = w === "awaiting_approval", B = w === "failed" ? Z(l?.details?.error ?? l?.detail, c) : void 0, H = w === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : z ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : B ? B.summary : R ?? l?.detail ?? (A && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : w === "received" ? "Received" : L), G = l?.details, K = G?.ops ?? [], ae = G?.steps ?? [], oe = G?.document?.title || b || "Document", se = !!G?.document || !!u, ce = B ? B.technical : G?.error, le = tt(G), q = `${C}-details-${n}`, ue = !!(A && O && _ || z && h || j && m || j?.kind === "link" && !m);
	return /* @__PURE__ */ W("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", te),
		"data-testid": C,
		"data-phase": S ? S.phase : w,
		"data-mode": S ? "loop" : void 0,
		"data-run-id": n,
		"data-expanded": T ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || E((e) => !e);
		},
		children: [
			/* @__PURE__ */ W("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ U(I, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ W("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${C}-instruction`,
						children: [
							/* @__PURE__ */ U("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							a
						]
					}),
					S ? /* @__PURE__ */ U(r, {
						size: "xs",
						tone: X[S.phase]?.tone ?? "info",
						"data-testid": `${C}-phase`,
						children: X[S.phase]?.label ?? S.phase
					}) : /* @__PURE__ */ U(r, {
						size: "xs",
						tone: re,
						"data-testid": `${C}-phase`,
						children: L
					}),
					/* @__PURE__ */ U(i, {
						size: "sm",
						"aria-label": T ? "Hide details" : "Show details",
						"aria-expanded": T,
						"aria-controls": T ? q : void 0,
						onClick: () => E((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${C}-toggle`,
						icon: /* @__PURE__ */ U(p, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", T && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			S ? /* @__PURE__ */ U(rt, {
				runId: n,
				loop: S,
				clock: D,
				onOpenLab: ee,
				testId: C
			}) : /* @__PURE__ */ W("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ W("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", ue && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ U("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${C}-steps`,
							children: We.map((t, n) => {
								let r = F ? n < P : n < P || n === P && w === "completed", i = n === P && w !== "completed" && !F, a = F && n === P;
								return /* @__PURE__ */ W("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ U("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? ne && n === P ? "bg-warning" : "bg-success" : i ? z ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ U("span", {
										className: "sr-only",
										children: a ? L : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ U("span", {
							className: e("min-w-0 flex-1 truncate", k && (k.decision === "accept" ? "text-success" : "text-text-tertiary"), w === "failed" && "text-danger", ne && "text-warning-fg"),
							"data-testid": `${C}-detail`,
							"data-review": k?.decision,
							title: B ? B.summary : l?.detail,
							children: H
						})]
					}),
					A && O && _ && /* @__PURE__ */ W("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${C}-review`,
						children: [/* @__PURE__ */ U(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "accept", {
								key: O.key,
								...O.documentId ? { documentId: O.documentId } : {}
							}),
							"data-testid": `${C}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ U(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(n, "reject", {
								key: O.key,
								...O.documentId ? { documentId: O.documentId } : {}
							}),
							"data-testid": `${C}-reject-review`,
							children: "Reject"
						})]
					}),
					z && h && /* @__PURE__ */ W("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${C}-decide`,
						children: [/* @__PURE__ */ U(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(n, "approve"),
							"data-testid": `${C}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ U(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => h(n, "reject"),
							"data-testid": `${C}-reject`,
							children: "Reject"
						})]
					}),
					w === "failed" && v && /* @__PURE__ */ U(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => v(n),
						"data-testid": `${C}-retry`,
						children: "Retry"
					}),
					j && m && /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => m(j),
						className: e(Ye, "font-medium text-info"),
						"data-testid": `${C}-open-result`,
						"data-result-kind": j.kind,
						children: M
					}),
					j?.kind === "link" && !m && /* @__PURE__ */ U("a", {
						href: j.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Ye, "font-medium text-info"),
						"data-testid": `${C}-open-result`,
						"data-result-kind": "link",
						children: M
					}),
					d && /* @__PURE__ */ U("button", {
						type: "button",
						onClick: () => d(n),
						className: Xe,
						"data-testid": `${C}-open-run`,
						children: "Open run"
					}),
					N && /* @__PURE__ */ U("button", {
						type: "button",
						onClick: u,
						className: Xe,
						"data-testid": `${C}-open-document`,
						children: "Open document"
					})
				]
			}),
			T && /* @__PURE__ */ W("div", {
				id: q,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${C}-details`,
				children: [
					se && /* @__PURE__ */ W("div", {
						className: "flex items-start gap-2",
						"data-testid": `${C}-details-document`,
						children: [
							/* @__PURE__ */ U(y, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ W("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ U("span", {
									className: "block truncate font-medium text-text-primary",
									children: oe
								}), G?.document?.snippet && /* @__PURE__ */ U("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${C}-details-snippet`,
									children: G.document.snippet
								})]
							}),
							u && /* @__PURE__ */ U(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${C}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					K.length > 0 && /* @__PURE__ */ W("div", {
						"data-testid": `${C}-details-ops`,
						children: [
							/* @__PURE__ */ U("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ U("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: K.slice(0, qe).map((e, t) => /* @__PURE__ */ U("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Qe(e)
								}, t))
							}),
							K.length > qe && /* @__PURE__ */ W("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${C}-details-more-ops`,
								children: [
									"+",
									K.length - qe,
									" more"
								]
							})
						]
					}),
					ae.length > 0 && /* @__PURE__ */ U("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${C}-details-steps`,
						children: ae.map((t) => /* @__PURE__ */ W("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ U("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", nt[t.status] ?? nt.pending)
							}), /* @__PURE__ */ U("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ce && /* @__PURE__ */ W("div", {
						"data-testid": `${C}-details-error-block`,
						children: [/* @__PURE__ */ U("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ U("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${C}-details-error`,
							children: ce
						})]
					}),
					/* @__PURE__ */ W("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => d(n),
								className: e(Ye, "hover:text-text-primary"),
								"data-testid": `${C}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							j && m && /* @__PURE__ */ U("button", {
								type: "button",
								onClick: () => m(j),
								className: e(Ye, "font-medium text-info"),
								"data-testid": `${C}-details-open-result`,
								children: M
							}),
							le && /* @__PURE__ */ U("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${C}-details-timings`,
								children: le
							})
						]
					})
				]
			})
		]
	});
}
function at(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ot(e.result);
	return {
		runId: t,
		documentId: n,
		instruction: typeof e.instruction == "string" ? e.instruction : "",
		agentName: typeof e.agentName == "string" && e.agentName ? e.agentName : "Agent",
		command: typeof e.command == "string" && e.command ? e.command : "/doc",
		...typeof e.pipelineId == "string" ? { pipelineId: e.pipelineId } : {},
		...typeof e.documentTitle == "string" && e.documentTitle ? { documentTitle: e.documentTitle } : {},
		...r ? { result: r } : {},
		...typeof e.suggestionKey == "string" && e.suggestionKey ? { suggestionKey: e.suggestionKey } : {},
		..."lab" in e && e.lab !== void 0 && e.lab !== !1 ? { lab: !0 } : {}
	};
}
function ot(e) {
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
function st(e, t) {
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
function ct(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function lt({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = z(() => st(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ U("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ W("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: ct(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ U("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ U("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var ut = [
	"👍",
	"🎉",
	"❤️"
], dt = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function ft({ quickReactions: t = ut, onReact: n, onOpenReactionPicker: r, onReply: i, onForward: c, onTogglePin: l, pinned: u = !1, onCopyLink: p, onEdit: m, onDelete: h, className: g, "data-testid": y = "message-actions" }) {
	let b = [], x = (e, t, n, r) => b.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) x(`react-${e}`, `React ${e}`, /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	return r && x("more-reactions", "More reactions", /* @__PURE__ */ U(_, { size: 14 }), (e) => r(e.currentTarget)), i && x("reply", "Reply", /* @__PURE__ */ U(v, { size: 14 }), i), c && x("forward", "Forward to another conversation", /* @__PURE__ */ U(a, { size: 14 }), (e) => c(e.currentTarget)), l && x("pin", u ? "Unpin" : "Pin to channel", /* @__PURE__ */ U(o, { size: 14 }), l), p && x("copy-link", "Copy link to message", /* @__PURE__ */ U(s, { size: 14 }), p), m && x("edit", "Edit message", /* @__PURE__ */ U(d, { size: 13 }), m), h && x("delete", "Delete message", /* @__PURE__ */ U(f, { size: 13 }), h), b.length === 0 ? null : /* @__PURE__ */ U(k, {
		label: "Message actions",
		"data-testid": y,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", g),
		children: b.map((e) => /* @__PURE__ */ U("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${y}-${e.key}`,
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${dt}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function pt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = V(e), [s, c] = V(!1), [l, u] = V(null), d = B(null);
	R(() => {
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
	return /* @__PURE__ */ W("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ U(E, {
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
			/* @__PURE__ */ W("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ U("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ U(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ U(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ U("p", {
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
function mt(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function ht(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function gt({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ W("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ U("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ U("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: ht(t.timestamp)
		})]
	}), /* @__PURE__ */ U("span", {
		className: "block truncate text-xs text-text-secondary",
		children: mt(t.text)
	})] });
	return /* @__PURE__ */ W("div", {
		"data-testid": a,
		"data-quoted-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ U("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ U("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ U("button", {
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
function _t(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function vt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = _t(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ U("button", {
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ U("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ W("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ U(H, { children: o ? /* @__PURE__ */ U("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ U("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ U("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ W("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ U("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ U("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: L(t.size)
			})]
		})]
	}) : /* @__PURE__ */ U("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(xt, {}), /* @__PURE__ */ W("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ U("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ U("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: L(t.size)
				})]
			})] })
		})
	});
}
function yt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function bt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : L(o);
	return /* @__PURE__ */ W("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ U("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ U(xt, {}),
			/* @__PURE__ */ W("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ W("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ U("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ U("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ U("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ U("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ U("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ U("button", {
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
function xt() {
	return /* @__PURE__ */ U("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ U("path", {
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
function St({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ce(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ W("div", {
		role: "separator",
		"aria-label": le(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ U("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Ct(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function wt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Tt(e) {
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
function Et(e) {
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
var Dt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Ot(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Dt[e] ?? e)
	};
}
function kt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function At(e) {
	return `${kt(e)}:`;
}
function jt(e, t) {
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
function Mt(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = At(t);
	if (n) {
		let t = jt(n, r);
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
function Nt(e) {
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
function Pt(e) {
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
		startedAt: typeof e.startedAt == "string" ? e.startedAt : void 0,
		outcome: e.outcome === "cancelled" || e.outcome === "declined" || e.outcome === "no-answer" ? e.outcome : void 0,
		recordingId: typeof e.recordingId == "string" ? e.recordingId : void 0,
		audioOnly: typeof e.audioOnly == "boolean" ? e.audioOnly : void 0,
		recorded: typeof e.recorded == "boolean" ? e.recorded : void 0,
		notRecordedReason: typeof e.notRecordedReason == "string" ? e.notRecordedReason : void 0,
		lobbyName: typeof e.lobbyName == "string" ? e.lobbyName : void 0,
		participants: n
	};
}
function Ft(e) {
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
function It(e) {
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
function Lt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Rt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Lt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function zt(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Bt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Vt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = zt(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = zt(r), i = Bt(r);
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
		let e = zt(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = zt(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Ht = 3, Ut = 2, Wt = 3e5;
function Gt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Kt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(at(e.metadata) || Ft(e.metadata) || Pt(e.metadata) || Tt(e.metadata) || It(e.metadata));
}
function qt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Gt(r);
	if (!i || i !== Gt(n) || !Kt(n) || !Kt(r) || r.editedAt || se(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Wt;
}
function Jt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Yt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ W("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ U("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ U("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Xt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Zt(e) {
	return e.displayName || e.userId;
}
function Qt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Gt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function $t(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function en({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: s, typingUsers: c = [], emptyState: l, composer: u, dock: d, currentUserId: f, reactionsFor: p, onToggleReaction: m, onReply: h, onForwardMessage: g, onCopyLink: v, onTogglePin: y, onEditMessage: S, onDeleteMessage: C, pinnedMessageIds: w, onJumpToMessage: E, highlightedMessageId: O, threaded: k = !1, alignOwnMessages: A = !0, documentEditors: ne, documentUnavailable: j, callParticipants: re, agentRunStatus: I, onOpenRun: L, agentLoopStatus: z, onOpenLab: G, onOpenResult: K, onDecideRun: ae, onReviewRun: oe, onRetryRun: ce, onJoinCall: le, onOpenRecording: ue, onCopyRecordingLink: de, onShareRecording: pe, onDownloadRecording: me, onOpenRecordingTranscript: he, onManageRecordingExpiry: ge, recordingStatus: _e, onOpenDocument: ve, renderMessageReferences: be, tone: Se = "light", showHeader: we, fill: J, onLoadMore: Te, hasMore: Ee, loadingMore: De = !1, onSendFiles: Oe, transfers: ke = [], currentActor: je, onCancelTransfer: Me, attachmentSrc: Ne, onOpenAttachment: Pe, acceptFiles: Y, maxFileSize: Ie, onFileError: Le, readReceipts: Re, readReceiptsEnabled: X = !0, unreadFrom: Be, emojis: Ve = F }) {
	let [He, Ue] = V(null), [We, Ge] = V(null), Ke = B(null), [qe, Je] = V(null), Z = Se === "dark", Ye = T(), Xe = we ?? !(Ye?.hasHeader ?? !1), Q = J ?? Ye?.fillsHeight ?? !1, [Ze, Qe] = V(""), $e = B(null), et = B(null), tt = !!Te && Ee !== !1, nt = B(null), rt = B(null), [ot, st] = V(!1), ct = !!Oe && !a, ut = Rt(n, r), dt = k ? Vt(ut) : null, [mt, ht] = V(() => /* @__PURE__ */ new Set());
	function _t(e) {
		ht((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let xt = B(void 0);
	if (Be !== void 0) {
		let e = xt.current;
		if (e === void 0) xt.current = Be;
		else {
			let t = Date.parse(Be), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (xt.current = Be);
		}
	}
	let Dt = xt.current, At = Dt === void 0 ? -1 : Jt(dt ? dt.map((e) => Lt(e.root)) : ut.map((e) => Lt(e)), Dt), jt = Re !== void 0, Bt = Re ?? [], Wt = X && f ? f : void 0, Gt = (() => {
		if (Wt) for (let e = ut.length - 1; e >= 0; --e) {
			let t = ut[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Wt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), Kt = Gt && Wt ? Xt(Bt, Wt, Gt.timestamp) : [], en = Kt.length === 1 && !!Wt && Qt(n, Bt, Wt) === 1;
	function nn() {
		if (!Gt) return null;
		if (Kt.length === 0) return jt ? /* @__PURE__ */ U("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", A ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ U("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = Kt.map(Zt), n = Kt.slice(0, 3);
		return /* @__PURE__ */ W("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", A ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				Kt.length > 1 && /* @__PURE__ */ U("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ U(D, {
						name: Zt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ U("span", {
					"data-testid": "chat-read-receipts-label",
					children: en ? "Seen" : `Seen by ${Kt.length}`
				}),
				/* @__PURE__ */ U("span", {
					style: ee,
					children: en ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [rn, an] = V(0), [on, sn] = V(!1), $ = B(!0), cn = B(n.length), ln = n.length + r.length + ke.length, un = B(null), [dn, fn] = V(""), pn = B(null), mn = B(!1), hn = B(0);
	R(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!mn.current) {
			mn.current = !0, pn.current = t;
			return;
		}
		if (t === pn.current || (pn.current = t, f && e.userId === f)) return;
		hn.current += 1;
		let r = hn.current % 2 == 0 ? "​" : "";
		fn(wt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function gn() {
		let e = $e.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, an(0));
	}
	function _n() {
		let e = $e.current;
		if (!e) return;
		let t = Ct(e);
		$.current = t, t && an(0), sn(e.scrollTop > 8);
	}
	R(() => {
		let e = $e.current, t = cn.current, n = ln - t;
		if (cn.current = ln, !e) return;
		let r = un.current;
		if (r && n > 0) {
			un.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, an(0), sn(e.scrollTop > 8)) : n > 0 && an((e) => e + n);
	}, [ln]);
	function vn() {
		let e = $e.current;
		e && (un.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), Te?.();
	}
	R(() => () => {
		et.current && clearTimeout(et.current);
	}, []);
	function yn() {
		let e = Ze.trim();
		!e || a || (et.current && clearTimeout(et.current), et.current = null, s?.(!1), $.current = !0, i(e), Qe(""));
	}
	function bn(e) {
		!ct || e.length === 0 || ($.current = !0, Oe?.(e));
	}
	function xn(e) {
		if (!ct) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), bn(t));
	}
	function Sn(e) {
		Qe((t) => t + e), st(!1);
	}
	function Cn() {
		a || (s?.(!0), et.current && clearTimeout(et.current), et.current = setTimeout(() => s?.(!1), 2e3));
	}
	function wn(e) {
		Cn(), e.key === "Enter" && !a && Ze.trim() && yn();
	}
	function Tn(n, r, i, a, s) {
		let c = n.kind === "message" ? n.message.timestamp : n.local.timestamp, l = !s && r === At ? /* @__PURE__ */ U(Yt, { tone: Se }) : null, u = !l && qt(a, n), d = !s && se(c, i) ? /* @__PURE__ */ U(St, {
			timestamp: c,
			tone: Se
		}, `day:${c}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = at(r.metadata);
			return /* @__PURE__ */ W(ie, { children: [
				d,
				l,
				/* @__PURE__ */ U("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ U(fe, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: Se,
						mine: !0,
						contentLayout: i ? "block" : "inline",
						content: /* @__PURE__ */ W(H, { children: [
							i ? /* @__PURE__ */ U(it, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: I?.(i.runId),
								onOpenDocument: ve && i.documentId ? () => ve(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: L,
								result: i.result,
								onOpenResult: K,
								onDecide: ae,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: oe,
								onRetry: ce,
								...$t(i, z, G)
							}) : /* @__PURE__ */ U(ye, { text: r.content }),
							/* @__PURE__ */ U("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ U("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ U(t, {
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
		let { message: _ } = n, b = _.displayName ?? _.clientId.slice(0, 8), x = _.attachments ?? [], ee = _.metadata?.html, te = typeof ee == "string" ? ee : void 0, T = Nt(_.metadata), D = Mt(_.content, T, te), k = /* @__PURE__ */ U(ye, {
			html: D.html,
			text: D.body
		}), M = Tt(_.metadata), N = at(_.metadata), P = Pt(_.metadata), F = Ft(_.metadata), R = It(_.metadata), B = Ot(_.metadata), V = Et(_.metadata), we = N ? /* @__PURE__ */ U(it, {
			runId: N.runId,
			instruction: N.instruction || _.content.replace(/^\/doc\s*/i, ""),
			command: N.command,
			agentName: N.agentName,
			requestedBy: _.displayName,
			status: I?.(N.runId),
			onOpenDocument: ve && N.documentId ? () => ve(N.documentId) : void 0,
			documentTitle: N.documentTitle,
			onOpenRun: L,
			result: N.result,
			onOpenResult: K,
			onDecide: ae,
			suggestion: N.suggestionKey ? {
				key: N.suggestionKey,
				...N.documentId ? { documentId: N.documentId } : {}
			} : void 0,
			onReview: oe,
			onRetry: ce,
			...$t(N, z, G)
		}) : F ? (() => {
			let e = _e?.(F.recordingId), t = {
				...F,
				...e ?? {}
			};
			return /* @__PURE__ */ U(Fe, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? _.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!_.id && !!w?.has(_.id),
				onOpen: ue,
				onCopyLink: de,
				onShare: pe,
				onDownload: me,
				onOpenTranscript: he,
				onManageExpiry: ge,
				onTogglePin: y ? () => y(_) : void 0
			});
		})() : P ? /* @__PURE__ */ U(Ae, {
			callId: P.callId,
			startedBy: (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			participants: re?.(P.callId) ?? P.participants,
			live: P.live,
			durationMs: P.durationMs,
			startedAt: P.startedAt,
			outcome: P.outcome,
			recordingId: P.recordingId,
			onOpenRecording: ue,
			audioOnly: P.audioOnly,
			recorded: P.recorded,
			notRecordedReason: P.notRecordedReason,
			lobbyName: P.lobbyName,
			onJoin: le
		}) : M ? /* @__PURE__ */ U(xe, {
			documentId: M.documentId,
			title: M.title || _.content,
			icon: M.icon,
			createdBy: M.createdBy ?? (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			editors: ne?.(M.documentId) ?? [],
			onOpen: ve,
			unavailable: j?.(M.documentId)
		}) : x.length === 0 ? k : /* @__PURE__ */ W(H, { children: [(_.content || te) && k, x.map((e) => /* @__PURE__ */ U(vt, {
			attachment: e,
			src: Ne?.(e),
			onOpen: Pe
		}, e.id))] }), J = _.id ?? "", Te = J && p ? p(J) : [], Ee = _.metadata?.replyTo, De = !!s && !!Ee && Ee.messageId === s.rootId, Oe = !!Ee && !De, ke = !!J && !!w?.has(J), je = !!f && _.userId === f, Me = _.metadata?.system === !0, Y = !!_.deletedAt || _.metadata?.deleted === !0, Ie = !!(N || F || P || M || R), Le = !!(N || F || P || M || x.length > 0), Re = je && !Y && !Me && !Ie && !!J, X = !!J && !Y && !Me && !Ie && x.length === 0 && !!_.content.trim(), Be = Re && !!S && He === J, Ve = /* @__PURE__ */ W(H, { children: [
			Oe && Ee && /* @__PURE__ */ U(gt, {
				quote: Ee,
				onJump: E,
				className: "mb-1"
			}),
			T && /* @__PURE__ */ W("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [kt(T), T.timestamp ? q(T.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ U("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					D.stripped ? kt(T) : "Forwarded"
				]
			}),
			ke && /* @__PURE__ */ W("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ U(o, { size: 11 }), " Pinned"]
			}),
			Y ? /* @__PURE__ */ U("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Be ? /* @__PURE__ */ U(pt, {
				initialText: _.content,
				onSave: async (e) => {
					await S(_, e), Ue(null);
				},
				onCancel: () => Ue(null)
			}) : we,
			!Y && be?.(_),
			!Y && V.length > 0 && /* @__PURE__ */ U("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: V.map((e) => /* @__PURE__ */ U(Ce, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: ve,
					unavailable: j?.(e.id)
				}, e.id))
			}),
			!Y && B && /* @__PURE__ */ W("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					B.labels.length > 0 ? `Too large to send: ${B.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Y && Te.length > 0 && f && m && /* @__PURE__ */ U(lt, {
				reactions: Te,
				currentUserId: f,
				onToggle: (e) => m(J, e)
			})
		] });
		return R ? /* @__PURE__ */ W(ie, { children: [
			d,
			l,
			/* @__PURE__ */ U(ze, {
				membership: R,
				fallbackText: _.content,
				timestamp: _.timestamp,
				"data-testid": "membership-notice"
			})
		] }, _.id ?? r) : /* @__PURE__ */ W(ie, { children: [
			d,
			l,
			/* @__PURE__ */ W("div", {
				"data-testid": "chat-message",
				"data-message-id": J || void 0,
				"data-continues": u ? "true" : void 0,
				title: u ? q(_.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", J && J === O && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ U(fe, {
					author: b,
					content: Ve,
					timestamp: u ? "" : _.timestamp,
					editedAt: Y ? void 0 : _.editedAt,
					avatarUrl: _.avatarUrl,
					hideAvatar: u,
					hideAuthor: u,
					tone: Se,
					mine: je && A,
					contentLayout: Le ? "block" : "inline"
				}), J && !Y && !Be && (m || Re || X && g || !Me && (h || y || v)) && /* @__PURE__ */ U(ft, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: m ? (e) => m(J, e) : void 0,
					onOpenReactionPicker: m ? (e) => {
						Ke.current = e, Ge(J);
					} : void 0,
					onReply: h && !Me ? () => h(s?.rootMessage ?? _) : void 0,
					onForward: g && X ? (e) => g(_, e) : void 0,
					onCopyLink: v && !Me && J ? () => v(_) : void 0,
					onTogglePin: y && !Me ? () => y(_) : void 0,
					pinned: !!_.id && !!w?.has(_.id),
					onEdit: Re && S ? () => Ue(J) : void 0,
					onDelete: Re && C ? () => Je(J) : void 0
				})]
			}),
			!!Gt && J === Gt.id && nn()
		] }, _.id ?? r);
	}
	function En(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Dn(e) {
		if (!h || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !It(t.metadata)) return t;
	}
	function On(t, n, r) {
		let i = Lt(r?.root), a = r && r.replies.length === 0 && !Dn(r.root) ? r.root : void 0, o = Tn(t.root, n, i, a), s = Lt(t.root) ?? "", c = n > 0 && n !== At && !se(s, i) ? /* @__PURE__ */ U("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? Dn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ W(ie, { children: [c, o] }, `post:${zt(t.root) ?? n}`) : o;
		let u = zt(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Ht, p = !f || mt.has(u), m = p ? t.replies : t.replies.slice(0, Ut), g = t.replies.length - m.length, _ = [...new Set(t.replies.slice(m.length).map(En))].slice(0, 3);
		return /* @__PURE__ */ W(ie, { children: [c, /* @__PURE__ */ W("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ W("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => Tn(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ W("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => _t(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ U("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ U(D, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ U("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${En(t.root)}`,
						onClick: () => h?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let kn = /* @__PURE__ */ W("div", {
		"data-testid": "chat-panel",
		className: e(Q ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Xe && /* @__PURE__ */ W("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ U("span", {
				style: ee,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: dn
			}),
			/* @__PURE__ */ W("div", {
				className: e("relative flex flex-col mb-2", Q ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ U("div", {
					ref: $e,
					onScroll: _n,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", on && "fade-top", Q ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ W("div", {
						className: "mt-auto pb-4",
						children: [
							tt && n.length > 0 && /* @__PURE__ */ U("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ U("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: vn,
									disabled: De,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: De ? "Loading…" : "Load earlier messages"
								})
							}),
							ut.length === 0 ? l ?? /* @__PURE__ */ U("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : dt ? dt.map((e, t) => On(e, t, dt[t - 1])) : ut.map((e, t) => Tn(e, t, Lt(ut[t - 1]), ut[t - 1])),
							m && /* @__PURE__ */ U(N, {
								open: We !== null,
								triggerRef: Ke,
								emojis: Ve,
								onSelect: (e) => {
									We && m(We, e), Ge(null);
								},
								onClose: () => Ge(null)
							}),
							C && /* @__PURE__ */ U(b, {
								open: qe !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Je(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === qe);
									Je(null), e && C(e);
								}
							}),
							ke.map((e) => /* @__PURE__ */ U(fe, {
								author: e.actor,
								timestamp: "",
								tone: Se,
								content: /* @__PURE__ */ U(bt, {
									transfer: e,
									mine: yt(e, f, je),
									onCancel: Me
								})
							}, e.transferId))
						]
					})
				}), rn > 0 && /* @__PURE__ */ W("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: gn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						rn,
						" new message",
						rn === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ U(te, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", Z ? "text-white/50" : "text-text-secondary")
			}),
			d != null && d !== !1 && /* @__PURE__ */ U("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: d
			}),
			u ? /* @__PURE__ */ U("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: s ? Cn : void 0,
				children: u
			}) : /* @__PURE__ */ W("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Oe && /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !ct,
						onClick: () => nt.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ U(tn, {})
					}), /* @__PURE__ */ U(M, {
						ref: nt,
						multiple: !0,
						accept: Y,
						onFiles: (e) => {
							let t = Ie ? e.filter((e) => e.size > Ie) : [];
							t.length > 0 && Le?.(`Skipped ${t.length} file(s) over the size limit.`), bn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ U("button", {
						ref: rt,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": ot,
						title: "Insert emoji",
						disabled: a,
						onClick: () => st((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ U(_, {
							size: 16,
							"aria-hidden": "true"
						})
					}),
					/* @__PURE__ */ U(N, {
						open: ot,
						onSelect: Sn,
						onClose: () => st(!1),
						triggerRef: rt,
						emojis: Ve
					}),
					/* @__PURE__ */ U(x, {
						size: "sm",
						value: Ze,
						onChange: (e) => Qe(e.target.value),
						onKeyDown: wn,
						onPaste: xn,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ U(t, {
						variant: "primary",
						size: "sm",
						onClick: yn,
						disabled: a || !Ze.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Oe ? /* @__PURE__ */ U(P, {
		onFiles: bn,
		accept: Y,
		maxSize: Ie,
		onError: Le,
		disabled: a,
		className: Q ? "flex h-full min-h-0 flex-col" : void 0,
		children: kn
	}) : kn;
}
function tn() {
	return /* @__PURE__ */ U("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ U("path", {
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
function nn(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function rn({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ W("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ W("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ U("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ U("div", { children: e.map((e) => {
			let n = K(nn(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = ae(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ W("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ U("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ U("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ U("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ U("span", {
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
var an = "min-w-0 truncate", on = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function sn({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ U("time", {
		dateTime: a,
		title: o,
		className: on,
		children: i
	}) : /* @__PURE__ */ U("span", {
		title: o,
		className: on,
		children: i
	}) : null, _ = /* @__PURE__ */ W("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ W("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ U("span", {
				"data-line": "primary",
				title: r,
				className: e(an, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ U("span", {
			"data-line": "secondary",
			title: s,
			className: e(an, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ W("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ W("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ U("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ U("button", {
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ U("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
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
function cn({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ U("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ U("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function ln({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ U(cn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ U(S, {
			icon: /* @__PURE__ */ U(o, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${q(e.sentAt)} · pinned ${q(e.pinnedAt)}` : q(r) : void 0;
			return /* @__PURE__ */ U(sn, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ U(D, {
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
				actions: n && /* @__PURE__ */ U("button", {
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
function un({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ U(cn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ U(S, {
			icon: /* @__PURE__ */ U(l, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = _t(e.attachment);
			return /* @__PURE__ */ U(sn, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ U("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ U(y, {})
				}),
				title: e.attachment.name,
				meta: [e.author, L(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: $(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? q(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function dn({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ U(cn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ U(S, {
			icon: /* @__PURE__ */ U(h, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ U(sn, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ U(D, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: $(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? q(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function fn(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function pn(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function mn({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ U(cn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ U(S, {
			icon: /* @__PURE__ */ U(g, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ U(sn, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ U("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ U(g, {})
				}),
				title: [$(e.startedAt), fn(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : pn(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function hn({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = (t, n, r, i, a = !1) => /* @__PURE__ */ W("button", {
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ U("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), c = (e) => [r && s("create", r, /* @__PURE__ */ U("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && s("create-whiteboard", i, /* @__PURE__ */ U(m, { size: 15 }), "New whiteboard", e)].filter(Boolean), l = !!(r || i);
	return /* @__PURE__ */ W("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [l && t.length > 0 && /* @__PURE__ */ W("div", {
			className: "mb-1 flex flex-col",
			children: [r && s("create", r, /* @__PURE__ */ U("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && s("create-whiteboard", i, /* @__PURE__ */ U(m, { size: 15 }), "New whiteboard in this conversation")]
		}), t.length === 0 ? /* @__PURE__ */ U(S, {
			icon: /* @__PURE__ */ U(y, { size: 40 }),
			title: "No documents yet",
			description: "Documents and whiteboards started here stay with this conversation.",
			action: l ? /* @__PURE__ */ U("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: c(!0)
			}) : void 0
		}) : /* @__PURE__ */ U("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ U(sn, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ U("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ U(y, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: $(e.updatedAt),
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
var gn = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], _n = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function vn({ name: t, description: n, online: r, avatarUrl: a, features: o = gn, children: s, canvas: c, members: l, memberCount: d, files: f = [], thumbnailSrc: p, documents: m = [], onOpenDocument: h, onRename: _, onCreateDocument: v, onCreateWhiteboard: y, pins: b = [], onUnpin: x, mentions: S = [], onOpenMention: ee, recordings: te = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: ne, watchViewerCount: j, callInProgress: M = !1, headerActions: N, view: P, onViewChange: F, className: re, "data-testid": I = "conversation-surface" }) {
	let L = new Set(o), [ie, R] = V("chat"), z = P ?? ie, B = L.has(z) ? z : o[0] ?? "chat", G = (e) => {
		P === void 0 && R(e), F?.(e);
	}, K = (e) => e || void 0, ae = o.filter((e) => _n[e]).map((e) => ({
		id: e,
		label: _n[e],
		badge: e === "files" ? K(f.length) : e === "documents" ? K(m.length) : e === "pins" ? K(b.length) : e === "members" ? d == null ? void 0 : K(d) : e === "calls" ? K(te.length) : e === "mentions" ? K(S.filter((e) => e.unread).length) : void 0
	})), oe = (e) => {
		G("chat"), E?.(e);
	};
	return /* @__PURE__ */ W("section", {
		className: e("flex min-w-0 flex-col", re),
		"data-testid": I,
		children: [
			/* @__PURE__ */ U(C, {
				name: t,
				onRename: _,
				description: n,
				online: r,
				avatarUrl: a,
				"data-testid": `${I}-header`,
				tabs: ae.length > 1 ? /* @__PURE__ */ U(w, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: B,
					onValueChange: (e) => G(e),
					items: ae
				}) : void 0,
				actions: D || k || N ? /* @__PURE__ */ W(H, { children: [
					D && (O ? /* @__PURE__ */ U(i, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${I}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ U(u, { size: 16 })
					}) : /* @__PURE__ */ W(H, { children: [/* @__PURE__ */ U(i, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${I}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ U(u, { size: 16 })
					}), /* @__PURE__ */ U(i, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${I}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ U(g, { size: 16 })
					})] })),
					k && /* @__PURE__ */ U(yn, {
						testId: `${I}-watch`,
						label: A,
						hint: ne,
						viewerCount: j,
						onClick: k
					}),
					N
				] }) : void 0
			}),
			L.has("files") && B === "files" && /* @__PURE__ */ U(un, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: p,
				onJump: E ? oe : void 0
			}),
			L.has("documents") && B === "documents" && /* @__PURE__ */ U(hn, {
				className: "min-h-0 flex-1",
				documents: m,
				onOpen: h,
				onCreate: v,
				onCreateWhiteboard: y
			}),
			L.has("pins") && B === "pins" && /* @__PURE__ */ U(ln, {
				className: "min-h-0 flex-1",
				pins: b,
				onUnpin: x,
				onJump: E ? oe : void 0
			}),
			L.has("members") && B === "members" && /* @__PURE__ */ U("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-members`,
				children: l
			}),
			L.has("mentions") && B === "mentions" && /* @__PURE__ */ U(dn, {
				className: "min-h-0 flex-1",
				mentions: S,
				onJump: ee ? (e, t) => {
					G("chat"), ee(e, t);
				} : void 0
			}),
			L.has("calls") && B === "calls" && /* @__PURE__ */ U(mn, {
				className: "min-h-0 flex-1",
				recordings: te,
				onOpen: T
			}),
			L.has("chat") && /* @__PURE__ */ W("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-chat`,
				hidden: B !== "chat",
				children: [c && /* @__PURE__ */ U("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${I}-canvas`,
					children: c
				}), /* @__PURE__ */ U("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function yn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ W(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? bn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ U(c, { size: 14 }),
			/* @__PURE__ */ U("span", { children: o }),
			s && /* @__PURE__ */ U("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var bn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { Ce as $, lt as A, Qe as B, vt as C, mt as D, gt as E, at as F, Fe as G, ze as H, ot as I, ke as J, Pe as K, tt as L, st as M, nt as N, pt as O, it as P, Oe as Q, He as R, St as S, _t as T, Re as U, Ve as V, Le as W, we as X, J as Y, Ee as Z, Nt as _, dn as a, ue as at, Ot as b, fn as c, le as ct, en as d, K as dt, xe as et, Pt as f, ae as ft, kt as g, At as h, un as i, de as it, ct as j, ft as k, sn as l, q as lt, Et as m, vn as n, ye as nt, mn as o, oe as ot, Tt as p, Ae as q, hn as r, fe as rt, ln as s, ce as st, gn as t, be as tt, rn as u, se as ut, It as v, bt as w, Mt as x, Ft as y, Z as z };
