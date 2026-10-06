import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C2OEUpX-.js";
import { p as n } from "./overlayStack-D0Hf2ZrU.js";
import { t as r } from "./Chip-0zFpfJ52.js";
import { t as i } from "./IconButton-VqtspsS5.js";
import { A as a, E as o, J as s, Q as c, S as l, St as u, Z as d, ct as f, i as p, m, pt as h, w as g, wt as _, yt as v, z as y } from "./Icons-B_xESAH3.js";
import { g as b } from "./MediaIcons-_ai5Til2.js";
import { t as x } from "./ConfirmDialog-D5LLBfII.js";
import { t as S } from "./Input-CpLq80dw.js";
import { t as C } from "./EmptyState-DnbFBYDA.js";
import { t as ee } from "./StatusPill-c89IbU1L.js";
import { i as w, n as T, t as E } from "./ChannelHeader-DVZMP9gf.js";
import { n as D } from "./Tabs-BArH-7z_.js";
import { n as O } from "./DockedPanelContext-pH9A5z1h.js";
import { t as te } from "./Textarea-Drx4YDDG.js";
import { t as k } from "./Avatar-CmYYkk9C.js";
import { t as A } from "./DotMeter-KxyExwVb.js";
import { t as j } from "./RovingToolbar-B1Fai5PF.js";
import { t as M } from "./PresenceAvatars-DAgxQ3PF.js";
import { t as N } from "./DropdownMenu-BS-H0H0p.js";
import { i as P, n as F, r as I, t as L } from "./ReactionPickerPopover-CGha15Y2.js";
import { n as R } from "./useComputeProjects-ZSazDRet.js";
import { t as z } from "./QuoteBlock-qqQqscMP.js";
import { t as ne } from "./formatBytes-05ivRSJY.js";
import { Fragment as re, useEffect as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/utils/identity.ts
var q = [
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
function ie(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return q[Math.abs(t) % q.length];
}
function J(e) {
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
function oe(e, t) {
	let n = ae(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = ae(t);
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
function Y(e) {
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
	return /* @__PURE__ */ K("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", f),
		children: [/* @__PURE__ */ G("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ G(k, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ K("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				h && /* @__PURE__ */ K("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ G("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", p ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						m && /* @__PURE__ */ G("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: Y(r),
							className: e("text-xs shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: m
						}),
						u && /* @__PURE__ */ G("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${Y(u)}`,
							className: e("text-[11px] shrink-0", p ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ G("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", p ? "text-white/90" : "text-text-primary", s && d === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && d === "inline" && (p ? "bg-white/15" : "bg-primary-bg"), d === "block" && "w-full max-w-[30rem]"),
					children: n
				}),
				c && /* @__PURE__ */ G("div", {
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
	if (!fe.has(n.tagName)) return /* @__PURE__ */ G("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ G("br", {}, t);
		case "A": {
			let e = me(n.getAttribute("href"));
			return e ? /* @__PURE__ */ G("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ G("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ G("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ G(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ G("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ G("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ G("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ve({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = V(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => he(e, `n${t}`));
	}, [t]), o = V(() => _e(n ?? ""), [n]);
	return /* @__PURE__ */ G("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ye(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function be({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: c, "data-testid": u = "document-activity-card" }) {
	let d = !s && a.length > 0;
	return /* @__PURE__ */ K("div", {
		"data-testid": u,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", c),
		children: [
			/* @__PURE__ */ G("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ G(l, { size: 18 })
			}),
			/* @__PURE__ */ K("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ G("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ G("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${u}-unavailable` : void 0,
					children: s ? ye(s) : d ? `${xe(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ G("span", {
				className: "shrink-0",
				"data-testid": `${u}-editors`,
				children: /* @__PURE__ */ G(M, {
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
			o && !s && /* @__PURE__ */ G("button", {
				type: "button",
				"data-testid": `${u}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function xe(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function Se({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let c = a ? void 0 : i, u = a ? ye(a) : null;
	return /* @__PURE__ */ K("button", {
		type: "button",
		onClick: c ? () => c(t) : void 0,
		disabled: !c,
		title: u ? `${n} — ${u}` : n,
		"data-testid": s,
		"data-document-id": t,
		"data-unavailable": a,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", c ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a && "border-dashed text-text-tertiary opacity-70", o),
		children: [
			r ? /* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ G(l, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ G("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			u && /* @__PURE__ */ K("span", {
				className: "shrink-0",
				"data-testid": `${s}-unavailable`,
				children: ["· ", u]
			})
		]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function Ce(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function we(e, t) {
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
	let n = De(e), [r, i] = U(() => Date.now());
	return B(() => {
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
	let _ = i && !s, v = Oe(o, _), y = !_ && typeof a == "number" ? Ce(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = ke(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = we(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : we(r, !1)), /* @__PURE__ */ K("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ K("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ K("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ G("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ G("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ K("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ G("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ K("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ G("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${Ee(v)}`
							}),
							_ && /* @__PURE__ */ G("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ G("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ G("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: Te(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ G("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ G(M, {
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
			!_ && c && l && /* @__PURE__ */ G("button", {
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ G("button", {
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
function X(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Ne(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Pe({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ K("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ G("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ G(k, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ K("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ G("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ G("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ G("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Fe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: l, thumbnailUrl: u, stage: d = "ready", transcriptReady: f = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: w, "data-testid": T = "recording-activity-card" }) {
	let E = o ?? a.length, D = d === "gone", O = d !== "saving" && d !== "failed" && !D && !!g, te = () => {
		g?.(n);
	}, k = l != null && l > 0 ? Ce(l) : "", A = Me(s), j = Ne(a, E), { state: P, label: F } = je[d], I = [
		...g && O ? [{
			"data-testid": `${T}-menu-open`,
			label: "Open",
			onSelect: te
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
	], L = I.length ? [{
		items: I,
		"data-testid": `${T}-menu-items`
	}] : [];
	return /* @__PURE__ */ K("div", {
		"data-testid": T,
		"data-recording-id": n,
		"data-stage": d,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", w),
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ K("button", {
				type: "button",
				onClick: O ? te : void 0,
				disabled: !O,
				"aria-label": O ? `Play ${r.toLowerCase()}` : `${r}: ${F.toLowerCase()}`,
				"data-testid": `${T}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", O ? "cursor-pointer" : "cursor-default"),
				children: [
					u ? /* @__PURE__ */ G("img", {
						src: u,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${T}-thumbnail`
					}) : /* @__PURE__ */ G(Pe, {
						participants: a,
						total: E,
						testId: T
					}),
					O && /* @__PURE__ */ G("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ G("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ G("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ G("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					k && /* @__PURE__ */ G("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${T}-duration`,
						children: k
					})
				]
			}), /* @__PURE__ */ K("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ K("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ K("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ G("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${T}-title`,
								children: r
							}), h && /* @__PURE__ */ G("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${T}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ G(c, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ K("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${T}-by`,
							children: ["by ", i]
						}),
						E > 0 && /* @__PURE__ */ K("div", {
							className: "flex items-center gap-2",
							"data-testid": `${T}-people`,
							children: [/* @__PURE__ */ G(M, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: C
							}), /* @__PURE__ */ G("span", {
								className: "truncate text-xs text-text-tertiary",
								children: j
							})]
						}),
						/* @__PURE__ */ K("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ G(ee, {
									state: P,
									label: F,
									size: "sm",
									"data-testid": `${T}-stage`
								}),
								d === "ready" && f && /* @__PURE__ */ G(ee, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${T}-transcript`
								}),
								d === "ready" && p && /* @__PURE__ */ G(ee, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${T}-summary`
								}),
								A && /* @__PURE__ */ G("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${T}-when`,
									children: A
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ G(N, {
					trigger: /* @__PURE__ */ G("span", {
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
		}), m && d !== "failed" && !D && /* @__PURE__ */ K("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${T}-expiry`,
			children: [/* @__PURE__ */ K("span", { children: ["Set to expire ", X(m)] }), S && /* @__PURE__ */ G(t, {
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
	return /* @__PURE__ */ K("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ G("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ G("time", {
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
var Be = {
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
}, Ve = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function He(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Ue(e) {
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
		default: return Be[e.phase]?.label ?? "Running…";
	}
}
function We(e) {
	let t = !!e && (Be[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = U(() => Date.now());
	return B(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var Ge = [
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
], Ke = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, qe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Je = 6;
function Ye(e) {
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
function Xe(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = Ye(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var Ze = "shrink-0 whitespace-nowrap underline underline-offset-2", Z = `${Ze} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Qe(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function $e(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function et(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Qe(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Qe(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Qe(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${$e(e.index)}`;
		case "deleteBlock": return `Removed block ${$e(e.index)}`;
		case "appendMacro": return t ? `Added a ${Qe(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${$e(e.index)}`;
		case "setDocumentType": return `Type: ${Qe(t, 40)}`;
		case "skip": return t ? Qe(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Qe(t)}` : e.op;
	}
}
function tt(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function nt(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function rt(e) {
	if (!e?.startedAt) return null;
	let t = tt(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? nt(e.startedAt, e.completedAt) : null;
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
function it({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = Be[n.phase] ?? Be.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ K("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ G("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: Ue(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ G("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: He(r)
			}),
			c > 0 && /* @__PURE__ */ K("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ K("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						R(l),
						" / ",
						R(c)
					]
				}), /* @__PURE__ */ G(A, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ G("button", {
				type: "button",
				onClick: () => i(t),
				className: e(Ze, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ G("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ K("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ve[t.status] ?? Ve.pending)
			}), /* @__PURE__ */ G("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function at({ runId: n, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: u, onOpenDocument: d, onOpenRun: f, result: p, onOpenResult: h, onDecide: g, suggestion: _, onReview: v, onRetry: y, documentTitle: x, defaultExpanded: S = !1, loop: C, onOpenLab: ee, className: w, "data-testid": T = "agent-run-card" }) {
	let E = u?.phase ?? "received", [D, O] = U(S), te = We(C), k = E === "completed" ? u?.suggestion ?? _ : void 0, A = E === "completed" ? u?.review : void 0, j = !!k && !A, M = E === "completed" && u?.noop === !0, N = E === "completed" ? u?.result ?? p : void 0, P = N?.kind === "link" && N.label ? N.label : "Open", F = d && !(N?.kind === "document" && h), I = Ke[E], L = E === "failed" || E === "rejected", R = L ? "danger" : A ? A.decision === "accept" ? "success" : "neutral" : M ? "warning" : E === "completed" ? k ? "warning" : "success" : E === "awaiting_approval" ? "warning" : "info", z = A ? "Reviewed" : j ? "Suggested" : M ? "No change" : qe[E], ne = A ? A.byName ?? A.by : void 0, re = A ? `${A.decision === "accept" ? "Accepted" : "Rejected"} by ${ne}` : void 0, B = E === "awaiting_approval", V = E === "failed" ? Xe(u?.details?.error ?? u?.detail, c) : void 0, H = E === "running" ? u?.stepLabel ? `${o} — ${u.stepLabel}` : `${o} is working via the pipeline` : B ? `Waiting for approval${u?.detail ? ` — ${u.detail}` : ""}` : V ? V.summary : re ?? u?.detail ?? (j && u?.suggestion ? `${u.suggestion.applied} ${u.suggestion.applied === 1 ? "change" : "changes"} suggested` : E === "received" ? "Received" : z), W = u?.details, q = W?.ops ?? [], ie = W?.steps ?? [], J = W?.document?.title || x || "Document", ae = !!W?.document || !!d, oe = V ? V.technical : W?.error, se = rt(W), ce = `${T}-details-${n}`, Y = !!(j && k && v || B && g || N && h || N?.kind === "link" && !h);
	return /* @__PURE__ */ K("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", w),
		"data-testid": T,
		"data-phase": C ? C.phase : E,
		"data-mode": C ? "loop" : void 0,
		"data-run-id": n,
		"data-expanded": D ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || O((e) => !e);
		},
		children: [
			/* @__PURE__ */ K("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ G(b, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ K("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${T}-instruction`,
						children: [
							/* @__PURE__ */ G("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							a
						]
					}),
					C ? /* @__PURE__ */ G(r, {
						size: "xs",
						tone: Be[C.phase]?.tone ?? "info",
						"data-testid": `${T}-phase`,
						children: Be[C.phase]?.label ?? C.phase
					}) : /* @__PURE__ */ G(r, {
						size: "xs",
						tone: R,
						"data-testid": `${T}-phase`,
						children: z
					}),
					/* @__PURE__ */ G(i, {
						size: "sm",
						"aria-label": D ? "Hide details" : "Show details",
						"aria-expanded": D,
						"aria-controls": D ? ce : void 0,
						onClick: () => O((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${T}-toggle`,
						icon: /* @__PURE__ */ G(m, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", D && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			C ? /* @__PURE__ */ G(it, {
				runId: n,
				loop: C,
				clock: te,
				onOpenLab: ee,
				testId: T
			}) : /* @__PURE__ */ K("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ K("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", Y && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ G("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${T}-steps`,
							children: Ge.map((t, n) => {
								let r = L ? n < I : n < I || n === I && E === "completed", i = n === I && E !== "completed" && !L, a = L && n === I;
								return /* @__PURE__ */ K("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ G("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? M && n === I ? "bg-warning" : "bg-success" : i ? B ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ G("span", {
										className: "sr-only",
										children: a ? z : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ G("span", {
							className: e("min-w-0 flex-1 truncate", A && (A.decision === "accept" ? "text-success" : "text-text-tertiary"), E === "failed" && "text-danger", M && "text-warning-fg"),
							"data-testid": `${T}-detail`,
							"data-review": A?.decision,
							title: V ? V.summary : u?.detail,
							children: H
						})]
					}),
					j && k && v && /* @__PURE__ */ K("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${T}-review`,
						children: [/* @__PURE__ */ G(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(n, "accept", {
								key: k.key,
								...k.documentId ? { documentId: k.documentId } : {}
							}),
							"data-testid": `${T}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ G(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(n, "reject", {
								key: k.key,
								...k.documentId ? { documentId: k.documentId } : {}
							}),
							"data-testid": `${T}-reject-review`,
							children: "Reject"
						})]
					}),
					B && g && /* @__PURE__ */ K("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${T}-decide`,
						children: [/* @__PURE__ */ G(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(n, "approve"),
							"data-testid": `${T}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ G(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(n, "reject"),
							"data-testid": `${T}-reject`,
							children: "Reject"
						})]
					}),
					E === "failed" && y && /* @__PURE__ */ G(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => y(n),
						"data-testid": `${T}-retry`,
						children: "Retry"
					}),
					N && h && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: () => h(N),
						className: e(Ze, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": N.kind,
						children: P
					}),
					N?.kind === "link" && !h && /* @__PURE__ */ G("a", {
						href: N.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Ze, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": "link",
						children: P
					}),
					f && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: () => f(n),
						className: Z,
						"data-testid": `${T}-open-run`,
						children: "Open run"
					}),
					F && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: d,
						className: Z,
						"data-testid": `${T}-open-document`,
						children: "Open document"
					})
				]
			}),
			D && /* @__PURE__ */ K("div", {
				id: ce,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${T}-details`,
				children: [
					ae && /* @__PURE__ */ K("div", {
						className: "flex items-start gap-2",
						"data-testid": `${T}-details-document`,
						children: [
							/* @__PURE__ */ G(l, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ K("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ G("span", {
									className: "block truncate font-medium text-text-primary",
									children: J
								}), W?.document?.snippet && /* @__PURE__ */ G("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${T}-details-snippet`,
									children: W.document.snippet
								})]
							}),
							d && /* @__PURE__ */ G(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: d,
								"data-testid": `${T}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					q.length > 0 && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-ops`,
						children: [
							/* @__PURE__ */ G("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ G("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: q.slice(0, Je).map((e, t) => /* @__PURE__ */ G("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: et(e)
								}, t))
							}),
							q.length > Je && /* @__PURE__ */ K("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${T}-details-more-ops`,
								children: [
									"+",
									q.length - Je,
									" more"
								]
							})
						]
					}),
					ie.length > 0 && /* @__PURE__ */ G("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${T}-details-steps`,
						children: ie.map((t) => /* @__PURE__ */ K("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ G("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Q[t.status] ?? Q.pending)
							}), /* @__PURE__ */ G("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					oe && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-error-block`,
						children: [/* @__PURE__ */ G("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ G("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${T}-details-error`,
							children: oe
						})]
					}),
					/* @__PURE__ */ K("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							f && /* @__PURE__ */ G("button", {
								type: "button",
								onClick: () => f(n),
								className: e(Ze, "hover:text-text-primary"),
								"data-testid": `${T}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							N && h && /* @__PURE__ */ G("button", {
								type: "button",
								onClick: () => h(N),
								className: e(Ze, "font-medium text-info"),
								"data-testid": `${T}-details-open-result`,
								children: P
							}),
							se && /* @__PURE__ */ G("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${T}-details-timings`,
								children: se
							})
						]
					})
				]
			})
		]
	});
}
function ot(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = st(e.result);
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
function st(e) {
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
function ct(e, t) {
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
function lt(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ut({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = V(() => ct(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ G("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ K("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: lt(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ G("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ G("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var dt = [
	"👍",
	"🎉",
	"❤️"
], ft = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function pt({ quickReactions: t = dt, onReact: n, onOpenReactionPicker: r, onReply: i, onForward: o, onTogglePin: s, pinned: l = !1, onCopyLink: u, onEdit: d, onDelete: p, className: m, "data-testid": _ = "message-actions" }) {
	let b = [], x = (e, t, n, r) => b.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) x(`react-${e}`, `React ${e}`, /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	return r && x("more-reactions", "More reactions", /* @__PURE__ */ G(h, { size: 14 }), (e) => r(e.currentTarget)), i && x("reply", "Reply", /* @__PURE__ */ G(f, { size: 14 }), i), o && x("forward", "Forward to another conversation", /* @__PURE__ */ G(a, { size: 14 }), (e) => o(e.currentTarget)), s && x("pin", l ? "Unpin" : "Pin to channel", /* @__PURE__ */ G(c, { size: 14 }), s), u && x("copy-link", "Copy link to message", /* @__PURE__ */ G(y, { size: 14 }), u), d && x("edit", "Edit message", /* @__PURE__ */ G(g, { size: 13 }), d), p && x("delete", "Delete message", /* @__PURE__ */ G(v, { size: 13 }), p), b.length === 0 ? null : /* @__PURE__ */ G(j, {
		label: "Message actions",
		"data-testid": _,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", m),
		children: b.map((e) => /* @__PURE__ */ G("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${_}-${e.key}`,
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${ft}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function mt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = U(e), [s, c] = U(!1), [l, u] = U(null), d = H(null);
	B(() => {
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
	return /* @__PURE__ */ K("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ G(te, {
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
			/* @__PURE__ */ K("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ G("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ G(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ G(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ G("p", {
				className: "m-0 text-xs text-danger-fg",
				role: "alert",
				"data-testid": `${i}-error`,
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChatAttachment.tsx
function $(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function ht({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = $(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ G("button", {
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ G("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ K("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ G(W, { children: o ? /* @__PURE__ */ G("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ G("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ G("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ K("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ G("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ G("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: ne(t.size)
			})]
		})]
	}) : /* @__PURE__ */ G("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(vt, {}), /* @__PURE__ */ K("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ G("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ G("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: ne(t.size)
				})]
			})] })
		})
	});
}
function gt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function _t({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : ne(o);
	return /* @__PURE__ */ K("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ G("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ G(vt, {}),
			/* @__PURE__ */ K("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ K("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ G("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ G("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ G("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ G("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ G("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ G("button", {
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
function vt() {
	return /* @__PURE__ */ G("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ G("path", {
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
function yt({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = se(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ K("div", {
		role: "separator",
		"aria-label": ce(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function bt(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function xt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function St(e) {
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
function Ct(e) {
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
var wt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Tt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => wt[e] ?? e)
	};
}
function Et(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function Dt(e) {
	return `${Et(e)}:`;
}
function Ot(e, t) {
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
function kt(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = Dt(t);
	if (n) {
		let t = Ot(n, r);
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
function At(e) {
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
function jt(e) {
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
function Mt(e) {
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
function Nt(e) {
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
function Pt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Ft(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Pt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function It(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Lt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Rt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = It(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = It(r), i = Lt(r);
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
		let e = It(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = It(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var zt = 3, Bt = 2, Vt = 3e5;
function Ht(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Ut(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(ot(e.metadata) || Mt(e.metadata) || jt(e.metadata) || St(e.metadata) || Nt(e.metadata));
}
function Wt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Ht(r);
	if (!i || i !== Ht(n) || !Ut(n) || !Ut(r) || r.editedAt || oe(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Vt;
}
function Gt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Kt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ K("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ G("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ G("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function qt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Jt(e) {
	return e.displayName || e.userId;
}
function Yt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Ht(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Xt(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function Zt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: l, composer: u, dock: d, currentUserId: f, reactionsFor: p, onToggleReaction: m, onReply: g, reply: _, onCancelReply: v, onForwardMessage: y, onCopyLink: b, onTogglePin: C, onEditMessage: ee, onDeleteMessage: E, pinnedMessageIds: D, onJumpToMessage: te, highlightedMessageId: A, threaded: j = !1, alignOwnMessages: M = !0, documentEditors: N, documentUnavailable: R, callParticipants: ne, agentRunStatus: V, onOpenRun: q, agentLoopStatus: ie, onOpenLab: J, onOpenResult: ae, onDecideRun: se, onReviewRun: ce, onRetryRun: le, onJoinCall: ue, onOpenRecording: fe, onCopyRecordingLink: pe, onShareRecording: me, onDownloadRecording: he, onOpenRecordingTranscript: ge, onManageRecordingExpiry: _e, recordingStatus: ye, onOpenDocument: xe, renderMessageReferences: Ce, tone: we = "light", showHeader: Te, fill: Ee, onLoadMore: De, hasMore: Oe, loadingMore: ke = !1, onSendFiles: je, transfers: Me = [], currentActor: X, onCancelTransfer: Ne, attachmentSrc: Pe, onOpenAttachment: Ie, acceptFiles: Le, maxFileSize: Re, onFileError: Be, readReceipts: Ve, readReceiptsEnabled: He = !0, unreadFrom: Ue, emojis: We = L }) {
	let [Ge, Ke] = U(null), [qe, Je] = U(null), Ye = H(null), [Xe, Ze] = U(null), Z = we === "dark", Qe = O(), $e = Te ?? !(Qe?.hasHeader ?? !1), et = Ee ?? Qe?.fillsHeight ?? !1, [tt, nt] = U(""), rt = H(null), Q = H(null), it = !!De && Oe !== !1, st = H(null), ct = H(null), [lt, dt] = U(!1), ft = !!je && !a, $ = Ft(n, r), vt = j ? Rt($) : null, [wt, Dt] = U(() => /* @__PURE__ */ new Set());
	function Ot(e) {
		Dt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Lt = H(void 0);
	if (Ue !== void 0) {
		let e = Lt.current;
		if (e === void 0) Lt.current = Ue;
		else {
			let t = Date.parse(Ue), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Lt.current = Ue);
		}
	}
	let Vt = Lt.current, Ht = Vt === void 0 ? -1 : Gt(vt ? vt.map((e) => Pt(e.root)) : $.map((e) => Pt(e)), Vt), Ut = Ve !== void 0, Zt = Ve ?? [], $t = He && f ? f : void 0, en = (() => {
		if ($t) for (let e = $.length - 1; e >= 0; --e) {
			let t = $[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== $t || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), tn = en && $t ? qt(Zt, $t, en.timestamp) : [], nn = tn.length === 1 && !!$t && Yt(n, Zt, $t) === 1;
	function rn() {
		if (!en) return null;
		if (tn.length === 0) return Ut ? /* @__PURE__ */ G("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", M ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ G("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = tn.map(Jt), n = tn.slice(0, 3);
		return /* @__PURE__ */ K("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", M ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				tn.length > 1 && /* @__PURE__ */ G("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ G(k, {
						name: Jt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ G("span", {
					"data-testid": "chat-read-receipts-label",
					children: nn ? "Seen" : `Seen by ${tn.length}`
				}),
				/* @__PURE__ */ G("span", {
					style: w,
					children: nn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [an, on] = U(0), [sn, cn] = U(!1), ln = H(!0), un = H(n.length), dn = n.length + r.length + Me.length, fn = H(null), [pn, mn] = U(""), hn = H(null), gn = H(!1), _n = H(0);
	B(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!gn.current) {
			gn.current = !0, hn.current = t;
			return;
		}
		if (t === hn.current || (hn.current = t, f && e.userId === f)) return;
		_n.current += 1;
		let r = _n.current % 2 == 0 ? "​" : "";
		mn(xt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function vn() {
		let e = rt.current;
		e && (e.scrollTop = e.scrollHeight, ln.current = !0, on(0));
	}
	function yn() {
		let e = rt.current;
		if (!e) return;
		let t = bt(e);
		ln.current = t, t && on(0), cn(e.scrollTop > 8);
	}
	B(() => {
		let e = rt.current, t = un.current, n = dn - t;
		if (un.current = dn, !e) return;
		let r = fn.current;
		if (r && n > 0) {
			fn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		ln.current ? (e.scrollTop = e.scrollHeight, on(0), cn(e.scrollTop > 8)) : n > 0 && on((e) => e + n);
	}, [dn]);
	function bn() {
		let e = rt.current;
		e && (fn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), De?.();
	}
	B(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function xn() {
		let e = tt.trim();
		!e || a || (Q.current && clearTimeout(Q.current), Q.current = null, o?.(!1), ln.current = !0, i(e), nt(""));
	}
	function Sn(e) {
		!ft || e.length === 0 || (ln.current = !0, je?.(e));
	}
	function Cn(e) {
		if (!ft) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Sn(t));
	}
	function wn(e) {
		nt((t) => t + e), dt(!1);
	}
	function Tn() {
		a || (o?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => o?.(!1), 2e3));
	}
	function En(e) {
		Tn(), e.key === "Enter" && !a && tt.trim() && xn();
	}
	function Dn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, l = !o && r === Ht ? /* @__PURE__ */ G(Kt, { tone: we }) : null, u = !l && Wt(a, n), d = !o && oe(s, i) ? /* @__PURE__ */ G(yt, {
			timestamp: s,
			tone: we
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = ot(r.metadata);
			return /* @__PURE__ */ K(re, { children: [
				d,
				l,
				/* @__PURE__ */ G("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ G(de, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: we,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ K(W, { children: [
							i ? /* @__PURE__ */ G(at, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: V?.(i.runId),
								onOpenDocument: xe && i.documentId ? () => xe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: q,
								result: i.result,
								onOpenResult: ae,
								onDecide: se,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: ce,
								onRetry: le,
								...Xt(i, ie, J)
							}) : r.body == null ? /* @__PURE__ */ G(ve, { text: r.content }) : /* @__PURE__ */ G("div", {
								"data-testid": "chat-local-message-body",
								className: "min-w-0",
								children: typeof r.body == "function" ? r.body() : r.body
							}),
							/* @__PURE__ */ G("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ G("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ G(t, {
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
		let { message: h } = n, _ = h.displayName ?? h.clientId.slice(0, 8), v = h.attachments ?? [], x = h.metadata?.html, S = typeof x == "string" ? x : void 0, w = At(h.metadata), T = kt(h.content, w, S), O = /* @__PURE__ */ G(ve, {
			html: T.html,
			text: T.body
		}), k = St(h.metadata), j = ot(h.metadata), P = jt(h.metadata), F = Mt(h.metadata), I = Nt(h.metadata), L = Tt(h.metadata), B = Ct(h.metadata), H = j ? /* @__PURE__ */ G(at, {
			runId: j.runId,
			instruction: j.instruction || h.content.replace(/^\/doc\s*/i, ""),
			command: j.command,
			agentName: j.agentName,
			requestedBy: h.displayName,
			status: V?.(j.runId),
			onOpenDocument: xe && j.documentId ? () => xe(j.documentId) : void 0,
			documentTitle: j.documentTitle,
			onOpenRun: q,
			result: j.result,
			onOpenResult: ae,
			onDecide: se,
			suggestion: j.suggestionKey ? {
				key: j.suggestionKey,
				...j.documentId ? { documentId: j.documentId } : {}
			} : void 0,
			onReview: ce,
			onRetry: le,
			...Xt(j, ie, J)
		}) : F ? (() => {
			let e = ye?.(F.recordingId), t = {
				...F,
				...e ?? {}
			};
			return /* @__PURE__ */ G(Fe, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? h.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!h.id && !!D?.has(h.id),
				onOpen: fe,
				onCopyLink: pe,
				onShare: me,
				onDownload: he,
				onOpenTranscript: ge,
				onManageExpiry: _e,
				onTogglePin: C ? () => C(h) : void 0
			});
		})() : P ? /* @__PURE__ */ G(Ae, {
			callId: P.callId,
			startedBy: (typeof h.metadata?.displayName == "string" ? h.metadata.displayName : void 0) ?? h.displayName,
			participants: ne?.(P.callId) ?? P.participants,
			live: P.live,
			durationMs: P.durationMs,
			startedAt: P.startedAt,
			outcome: P.outcome,
			recordingId: P.recordingId,
			onOpenRecording: fe,
			audioOnly: P.audioOnly,
			recorded: P.recorded,
			notRecordedReason: P.notRecordedReason,
			lobbyName: P.lobbyName,
			onJoin: ue
		}) : k ? /* @__PURE__ */ G(be, {
			documentId: k.documentId,
			title: k.title || h.content,
			icon: k.icon,
			createdBy: k.createdBy ?? (typeof h.metadata?.displayName == "string" ? h.metadata.displayName : void 0) ?? h.displayName,
			editors: N?.(k.documentId) ?? [],
			onOpen: xe,
			unavailable: R?.(k.documentId)
		}) : v.length === 0 ? O : /* @__PURE__ */ K(W, { children: [(h.content || S) && O, v.map((e) => /* @__PURE__ */ G(ht, {
			attachment: e,
			src: Pe?.(e),
			onOpen: Ie
		}, e.id))] }), U = h.id ?? "", Te = U && p ? p(U) : [], Ee = h.metadata?.replyTo, De = !!o && !!Ee && Ee.messageId === o.rootId, Oe = !!Ee && !De, ke = !!U && !!D?.has(U), je = !!f && h.userId === f, Me = h.metadata?.system === !0, X = !!h.deletedAt || h.metadata?.deleted === !0, Ne = !!(j || F || P || k || I), Le = !!(j || F || P || k || v.length > 0), Re = je && !X && !Me && !Ne && !!U, Be = !!U && !X && !Me && !Ne && v.length === 0 && !!h.content.trim(), Ve = Re && !!ee && Ge === U, He = /* @__PURE__ */ K(W, { children: [
			Oe && Ee && /* @__PURE__ */ G(z, {
				quote: Ee,
				onJump: te,
				className: "mb-1"
			}),
			w && /* @__PURE__ */ K("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Et(w), w.timestamp ? Y(w.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ G("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					T.stripped ? Et(w) : "Forwarded"
				]
			}),
			ke && /* @__PURE__ */ K("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ G(c, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			X ? /* @__PURE__ */ G("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Ve ? /* @__PURE__ */ G(mt, {
				initialText: h.content,
				onSave: async (e) => {
					await ee(h, e), Ke(null);
				},
				onCancel: () => Ke(null)
			}) : H,
			!X && Ce?.(h),
			!X && B.length > 0 && /* @__PURE__ */ G("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: B.map((e) => /* @__PURE__ */ G(Se, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: xe,
					unavailable: R?.(e.id)
				}, e.id))
			}),
			!X && L && /* @__PURE__ */ K("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					L.labels.length > 0 ? `Too large to send: ${L.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!X && Te.length > 0 && f && m && /* @__PURE__ */ G(ut, {
				reactions: Te,
				currentUserId: f,
				onToggle: (e) => m(U, e)
			})
		] });
		return I ? /* @__PURE__ */ K(re, { children: [
			d,
			l,
			/* @__PURE__ */ G(ze, {
				membership: I,
				fallbackText: h.content,
				timestamp: h.timestamp,
				"data-testid": "membership-notice"
			})
		] }, h.id ?? r) : /* @__PURE__ */ K(re, { children: [
			d,
			l,
			/* @__PURE__ */ K("div", {
				"data-testid": "chat-message",
				"data-message-id": U || void 0,
				"data-continues": u ? "true" : void 0,
				title: u ? Y(h.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", U && U === A && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ G(de, {
					author: _,
					content: He,
					timestamp: u ? "" : h.timestamp,
					editedAt: X ? void 0 : h.editedAt,
					avatarUrl: h.avatarUrl,
					hideAvatar: u,
					hideAuthor: u,
					tone: we,
					mine: je && M,
					contentLayout: Le ? "block" : "inline"
				}), U && !X && !Ve && (m || Re || Be && y || !Me && (g || C || b)) && /* @__PURE__ */ G(pt, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: m ? (e) => m(U, e) : void 0,
					onOpenReactionPicker: m ? (e) => {
						Ye.current = e, Je(U);
					} : void 0,
					onReply: g && !Me ? () => g(o?.rootMessage ?? h) : void 0,
					onForward: y && Be ? (e) => y(h, e) : void 0,
					onCopyLink: b && !Me && U ? () => b(h) : void 0,
					onTogglePin: C && !Me ? () => C(h) : void 0,
					pinned: !!h.id && !!D?.has(h.id),
					onEdit: Re && ee ? () => Ke(U) : void 0,
					onDelete: Re && E ? () => Ze(U) : void 0
				})]
			}),
			!!en && U === en.id && rn()
		] }, h.id ?? r);
	}
	function On(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function kn(e) {
		if (!g || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !Nt(t.metadata)) return t;
	}
	function An(t, n, r) {
		let i = Pt(r?.root), a = r && r.replies.length === 0 && !kn(r.root) ? r.root : void 0, o = Dn(t.root, n, i, a), s = Pt(t.root) ?? "", c = n > 0 && n !== Ht && !oe(s, i) ? /* @__PURE__ */ G("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? kn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ K(re, { children: [c, o] }, `post:${It(t.root) ?? n}`) : o;
		let u = It(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > zt, p = !f || wt.has(u), m = p ? t.replies : t.replies.slice(0, Bt), h = t.replies.length - m.length, _ = [...new Set(t.replies.slice(m.length).map(On))].slice(0, 3);
		return /* @__PURE__ */ K(re, { children: [c, /* @__PURE__ */ K("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ K("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => Dn(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ K("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => Ot(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ G("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ G(k, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${h} more ${h === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ G("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ G("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${On(t.root)}`,
						onClick: () => g?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let jn = /* @__PURE__ */ K("div", {
		"data-testid": "chat-panel",
		className: e(et ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			$e && /* @__PURE__ */ K("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ G("span", {
				style: w,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: pn
			}),
			/* @__PURE__ */ K("div", {
				className: e("relative flex flex-col mb-2", et ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ G("div", {
					ref: rt,
					onScroll: yn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", sn && "fade-top", et ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ K("div", {
						className: "mt-auto pb-4",
						children: [
							it && n.length > 0 && /* @__PURE__ */ G("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ G("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: bn,
									disabled: ke,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: ke ? "Loading…" : "Load earlier messages"
								})
							}),
							$.length === 0 ? l ?? /* @__PURE__ */ G("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : vt ? vt.map((e, t) => An(e, t, vt[t - 1])) : $.map((e, t) => Dn(e, t, Pt($[t - 1]), $[t - 1])),
							m && /* @__PURE__ */ G(F, {
								open: qe !== null,
								triggerRef: Ye,
								emojis: We,
								onSelect: (e) => {
									qe && m(qe, e), Je(null);
								},
								onClose: () => Je(null)
							}),
							E && /* @__PURE__ */ G(x, {
								open: Xe !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ze(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Xe);
									Ze(null), e && E(e);
								}
							}),
							Me.map((e) => /* @__PURE__ */ G(de, {
								author: e.actor,
								timestamp: "",
								tone: we,
								content: /* @__PURE__ */ G(_t, {
									transfer: e,
									mine: gt(e, f, X),
									onCancel: Ne
								})
							}, e.transferId))
						]
					})
				}), an > 0 && /* @__PURE__ */ K("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: vn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						an,
						" new message",
						an === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ G(T, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Z ? "text-white/50" : "text-text-secondary")
			}),
			d != null && d !== !1 && /* @__PURE__ */ G("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: d
			}),
			u ? /* @__PURE__ */ G("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Tn : void 0,
				children: u
			}) : /* @__PURE__ */ K("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [_ && /* @__PURE__ */ G(z, {
					quote: _,
					onDismiss: v,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ K("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						je && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G("button", {
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !ft,
							onClick: () => st.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(Qt, {})
						}), /* @__PURE__ */ G(P, {
							ref: st,
							multiple: !0,
							accept: Le,
							onFiles: (e) => {
								let t = Re ? e.filter((e) => e.size > Re) : [];
								t.length > 0 && Be?.(`Skipped ${t.length} file(s) over the size limit.`), Sn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ G("button", {
							ref: ct,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": lt,
							title: "Insert emoji",
							disabled: a,
							onClick: () => dt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(h, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ G(F, {
							open: lt,
							onSelect: wn,
							onClose: () => dt(!1),
							triggerRef: ct,
							emojis: We
						}),
						/* @__PURE__ */ G(S, {
							size: "sm",
							value: tt,
							onChange: (e) => nt(e.target.value),
							onKeyDown: En,
							onPaste: Cn,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ G(t, {
							variant: "primary",
							size: "sm",
							onClick: xn,
							disabled: a || !tt.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return je ? /* @__PURE__ */ G(I, {
		onFiles: Sn,
		accept: Le,
		maxSize: Re,
		onError: Be,
		disabled: a,
		className: et ? "flex h-full min-h-0 flex-col" : void 0,
		children: jn
	}) : jn;
}
function Qt() {
	return /* @__PURE__ */ G("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ G("path", {
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
function $t(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function en({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ K("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ K("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ G("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ G("div", { children: e.map((e) => {
			let n = ie($t(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = J(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ K("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ G("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ G("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ G("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ G("span", {
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
var tn = "min-w-0 truncate", nn = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function rn({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ G("time", {
		dateTime: a,
		title: o,
		className: nn,
		children: i
	}) : /* @__PURE__ */ G("span", {
		title: o,
		className: nn,
		children: i
	}) : null, _ = /* @__PURE__ */ K("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ K("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ G("span", {
				"data-line": "primary",
				title: r,
				className: e(tn, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ G("span", {
			"data-line": "secondary",
			title: s,
			className: e(tn, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ K("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ K("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ G("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ G("button", {
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ G("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ G("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function an(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function on({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ G("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function sn({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ G(on, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(C, {
			icon: /* @__PURE__ */ G(c, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${Y(e.sentAt)} · pinned ${Y(e.pinnedAt)}` : Y(r) : void 0;
			return /* @__PURE__ */ G(rn, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ G(k, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: an(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ G("button", {
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
function cn({ file: e, thumbnailSrc: t, onJump: n }) {
	let r = t?.(e.attachment) ?? e.attachment.preview, i = $(e.attachment);
	return /* @__PURE__ */ G(rn, {
		"data-testid": "channel-file",
		"data-kind": "file",
		leading: i && r ? /* @__PURE__ */ G("img", {
			src: r,
			alt: "",
			className: "h-8 w-8 rounded object-cover"
		}) : /* @__PURE__ */ G("span", {
			"aria-hidden": !0,
			className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
			children: /* @__PURE__ */ G(s, {})
		}),
		title: e.attachment.name,
		meta: [e.author, ne(e.attachment.size)].filter(Boolean).join(" · "),
		timestamp: an(e.sentAt),
		timestampIso: e.sentAt,
		timestampTitle: e.sentAt ? Y(e.sentAt) : void 0,
		onJump: n ? () => n(e.messageId) : void 0,
		jumpLabel: `Go to the message with ${e.attachment.name}`
	});
}
function ln({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ G(on, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(C, {
			icon: /* @__PURE__ */ G(s, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => /* @__PURE__ */ G(cn, {
			file: e,
			thumbnailSrc: t,
			onJump: n
		}, `${e.messageId}:${e.attachment.id}`))
	});
}
function un({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ G(on, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(C, {
			icon: /* @__PURE__ */ G(p, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ G(rn, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ G(k, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: an(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? Y(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function dn(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function fn(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function pn({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ G(on, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(C, {
			icon: /* @__PURE__ */ G(u, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ G(rn, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ G("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ G("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ G(u, {})
				}),
				title: [an(e.startedAt), dn(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : fn(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function mn(e, t) {
	let n = e ? Date.parse(e) : NaN, r = t ? Date.parse(t) : NaN;
	return Number.isNaN(n) && Number.isNaN(r) ? 0 : Number.isNaN(n) ? 1 : Number.isNaN(r) ? -1 : r - n;
}
function hn({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, files: a, thumbnailSrc: o, onJumpToFile: s, className: c, "data-testid": u = "channel-documents-panel" }) {
	let d = (t, n, r, i, a = !1) => /* @__PURE__ */ K("button", {
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ G("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), f = (e) => [r && d("create", r, /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && d("create-whiteboard", i, /* @__PURE__ */ G(_, { size: 15 }), "New whiteboard", e)].filter(Boolean), p = !!(r || i), m = a ? [...t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	})), ...a.map((e) => ({
		kind: "file",
		file: e,
		at: e.sentAt
	}))].sort((e, t) => mn(e.at, t.at)) : t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	}));
	return /* @__PURE__ */ K("div", {
		className: e("min-h-0 overflow-y-auto p-2", c),
		"data-testid": u,
		children: [p && m.length > 0 && /* @__PURE__ */ K("div", {
			className: "mb-1 flex flex-col",
			children: [r && d("create", r, /* @__PURE__ */ G("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && d("create-whiteboard", i, /* @__PURE__ */ G(_, { size: 15 }), "New whiteboard in this conversation")]
		}), m.length === 0 ? /* @__PURE__ */ G(C, {
			icon: /* @__PURE__ */ G(l, { size: 40 }),
			title: a ? "Nothing here yet" : "No documents yet",
			description: a ? "Documents, whiteboards and files shared here stay with this conversation." : "Documents and whiteboards started here stay with this conversation.",
			action: p ? /* @__PURE__ */ G("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: f(!0)
			}) : void 0
		}) : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: m.map((e) => e.kind === "file" ? /* @__PURE__ */ G(cn, {
				file: e.file,
				thumbnailSrc: o,
				onJump: s
			}, `file:${e.file.messageId}:${e.file.attachment.id}`) : /* @__PURE__ */ G(rn, {
				"data-testid": "channel-document",
				"data-kind": "document",
				leading: /* @__PURE__ */ G("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.doc.icon || /* @__PURE__ */ G(l, {})
				}),
				title: e.doc.title || "Untitled",
				meta: [e.doc.createdBy, e.doc.activeEditors ? `${e.doc.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: an(e.doc.updatedAt),
				timestampIso: e.doc.updatedAt,
				timestampTitle: e.doc.updatedAt ? Y(e.doc.updatedAt) : void 0,
				onJump: n ? () => n(e.doc.documentId) : void 0,
				jumpLabel: `Open ${e.doc.title || "this document"}`
			}, e.doc.documentId))
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
function vn({ name: t, description: n, online: r, avatarUrl: a, features: o = gn, children: s, canvas: c, members: l, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onRename: _, onCreateDocument: v, onCreateWhiteboard: y, pins: b = [], onUnpin: x, mentions: S = [], onOpenMention: C, recordings: ee = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: O, callModeFixed: te = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: M, callInProgress: N = !1, headerActions: P, view: F, onViewChange: I, className: L, "data-testid": R = "conversation-surface" }) {
	let z = new Set(o), ne = z.has("files") && z.has("documents"), [re, B] = U("chat"), V = F ?? re, H = ne && V === "files" ? "documents" : V, q = z.has(H) ? H : o[0] ?? "chat", ie = (e) => {
		F === void 0 && B(e), I?.(e);
	}, J = (e) => e || void 0, ae = o.filter((e) => _n[e] && !(ne && e === "files")).map((e) => ({
		id: e,
		label: _n[e],
		badge: e === "files" ? J(p.length) : e === "documents" ? J(h.length + (ne ? p.length : 0)) : e === "pins" ? J(b.length) : e === "members" ? f == null ? void 0 : J(f) : e === "calls" ? J(ee.length) : e === "mentions" ? J(S.filter((e) => e.unread).length) : void 0
	})), oe = (e) => {
		ie("chat"), T?.(e);
	};
	return /* @__PURE__ */ K("section", {
		className: e("flex min-w-0 flex-col", L),
		"data-testid": R,
		children: [
			/* @__PURE__ */ G(E, {
				name: t,
				onRename: _,
				description: n,
				online: r,
				avatarUrl: a,
				"data-testid": `${R}-header`,
				tabs: ae.length > 1 ? /* @__PURE__ */ G(D, {
					variant: "underline",
					size: "md",
					"aria-label": "Views of this conversation",
					getItemTestId: (e) => `${R}-tab-${e.id}`,
					value: q,
					onValueChange: (e) => ie(e),
					items: ae
				}) : void 0,
				actions: O || k || P ? /* @__PURE__ */ K(W, { children: [
					O && (te ? /* @__PURE__ */ G(i, {
						"aria-label": N ? "Join the call" : "Start a call",
						title: N ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => O(!1),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(i, {
						"aria-label": N ? "Join the call with audio" : "Start an audio call",
						title: N ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => O(!0),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}), /* @__PURE__ */ G(i, {
						"aria-label": N ? "Join the call with video" : "Start a video call",
						title: N ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => O(!1),
						children: /* @__PURE__ */ G(u, { size: 16 })
					})] })),
					k && /* @__PURE__ */ G(yn, {
						testId: `${R}-watch`,
						label: A,
						hint: j,
						viewerCount: M,
						onClick: k
					}),
					P
				] }) : void 0
			}),
			z.has("files") && q === "files" && /* @__PURE__ */ G(ln, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? oe : void 0
			}),
			z.has("documents") && q === "documents" && /* @__PURE__ */ G(hn, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: v,
				onCreateWhiteboard: y,
				...ne ? {
					files: p,
					thumbnailSrc: m,
					onJumpToFile: T ? oe : void 0
				} : {}
			}),
			z.has("pins") && q === "pins" && /* @__PURE__ */ G(sn, {
				className: "min-h-0 flex-1",
				pins: b,
				onUnpin: x,
				onJump: T ? oe : void 0
			}),
			z.has("members") && q === "members" && /* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-members`,
				children: l
			}),
			z.has("mentions") && q === "mentions" && /* @__PURE__ */ G(un, {
				className: "min-h-0 flex-1",
				mentions: S,
				onJump: C ? (e, t) => {
					ie("chat"), C(e, t);
				} : void 0
			}),
			z.has("calls") && q === "calls" && /* @__PURE__ */ G(pn, {
				className: "min-h-0 flex-1",
				recordings: ee,
				onOpen: w
			}),
			z.has("chat") && /* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: q !== "chat",
				children: [c && /* @__PURE__ */ G("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${R}-canvas`,
					children: c
				}), /* @__PURE__ */ G("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function yn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let s = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ K(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? bn,
		"aria-label": c ? `${s} — ${i} watching` : s,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ G(o, { size: 14 }),
			/* @__PURE__ */ G("span", { children: s }),
			c && /* @__PURE__ */ G("span", {
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
export { ye as $, ct as A, ze as B, ht as C, pt as D, mt as E, rt as F, Ae as G, Le as H, Ue as I, Ce as J, ke as K, Xe as L, at as M, ot as N, ut as O, st as P, be as Q, et as R, yt as S, $ as T, Fe as U, Re as V, Ne as W, Oe as X, Ee as Y, Se as Z, At as _, un as a, se as at, Tt as b, dn as c, oe as ct, Zt as d, ve as et, jt as f, Et as g, Dt as h, ln as i, ae as it, Q as j, lt as k, rn as l, ie as lt, Ct as m, vn as n, ue as nt, pn as o, ce as ot, St as p, we as q, hn as r, le as rt, sn as s, Y as st, gn as t, de as tt, en as u, J as ut, Nt as v, _t as w, kt as x, Mt as y, He as z };
