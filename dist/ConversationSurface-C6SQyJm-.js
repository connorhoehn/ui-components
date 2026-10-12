import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-BEOshFFZ.js";
import { p as n } from "./overlayStack-D0Hf2ZrU.js";
import { t as r } from "./Chip-D2jKHd4a.js";
import { t as i } from "./IconButton-IiLzRH-W.js";
import { A as a, E as o, J as s, Q as c, S as l, St as u, Z as d, ct as f, i as p, m, pt as h, tt as g, w as _, wt as v, yt as y, z as b } from "./Icons-B_xESAH3.js";
import { g as x } from "./MediaIcons-_ai5Til2.js";
import { i as S } from "./Text-Dp6koIMo.js";
import { t as C } from "./ConfirmDialog-D5LLBfII.js";
import { t as ee } from "./Input-CpLq80dw.js";
import { t as w } from "./EmptyState-ClSHRgi-.js";
import { t as T } from "./StatusPill-c89IbU1L.js";
import { i as E, n as D, t as O } from "./ChannelHeader-DVZMP9gf.js";
import { t as te } from "./DropdownMenu-DR9iVi2Z.js";
import { n as k } from "./DockedPanelContext-pH9A5z1h.js";
import { t as A } from "./Textarea-Drx4YDDG.js";
import { t as j } from "./Avatar-CmYYkk9C.js";
import { t as ne } from "./DotMeter-KxyExwVb.js";
import { t as M } from "./RovingToolbar-B1Fai5PF.js";
import { t as N } from "./PresenceAvatars-DAgxQ3PF.js";
import { a as re, d as P, i as F } from "./railType-DaEA_kg6.js";
import { i as I, n as L, r as R, t as ie } from "./ReactionPickerPopover-BIBLJam7.js";
import { n as ae } from "./useComputeProjects-ZSazDRet.js";
import { t as oe } from "./QuoteBlock-qqQqscMP.js";
import { t as se } from "./formatBytes-05ivRSJY.js";
import { Fragment as z, useEffect as B, useMemo as V, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/utils/identity.ts
var ce = [
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
function q(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return ce[Math.abs(t) % ce.length];
}
function le(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/RailSectionHeader.tsx
function ue({ label: t, actions: n = [], presentational: r = !0, collapsed: i = !1, onToggleCollapse: a, controls: o, toggleId: s, collapsedCount: c = 0, count: l, dark: u = !1, className: d, "data-testid": f = "rail-section-header" }) {
	let p = a !== void 0, m = e("min-w-0 flex-1 truncate", F, u ? "text-white/40" : re);
	return /* @__PURE__ */ K("div", {
		"data-testid": f,
		className: e("flex items-center gap-1 px-2 pb-1 pt-3", d),
		children: [
			p ? /* @__PURE__ */ K("button", {
				type: "button",
				id: s,
				"aria-expanded": !i,
				"aria-controls": o,
				onClick: () => a(!i),
				"data-testid": `${f}-toggle`,
				className: e("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "hover:text-white" : "hover:text-text-primary"),
				children: [
					/* @__PURE__ */ G(P, {
						open: !i,
						className: u ? "text-white/40" : "text-text-secondary"
					}),
					/* @__PURE__ */ G("span", {
						className: m,
						children: t
					}),
					i && c > 0 && /* @__PURE__ */ K(W, { children: [" ", /* @__PURE__ */ G("span", {
						"aria-label": `${c} unread`,
						"data-testid": `${f}-collapsed-count`,
						className: e("grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none", u ? "bg-white/15 text-white" : "bg-primary text-on-primary"),
						children: c > 99 ? "99+" : c
					})] })
				]
			}) : /* @__PURE__ */ G("span", {
				"aria-hidden": r || void 0,
				className: m,
				children: t
			}),
			typeof l == "number" && /* @__PURE__ */ G("span", {
				"aria-label": `${l} items`,
				"data-testid": `${f}-count`,
				"data-shape": "plain",
				className: e("shrink-0 pr-1", "text-[11px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", u && "text-white/60"),
				children: l
			}),
			n.map((t) => /* @__PURE__ */ G("button", {
				type: "button",
				title: t.label,
				"aria-label": t.label,
				onClick: (e) => {
					i && a?.(!1), t.onClick(e.currentTarget);
				},
				"data-testid": t["data-testid"],
				className: e("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
				children: t.icon ?? /* @__PURE__ */ G(g, { size: 13 })
			}, t.label))
		]
	});
}
//#endregion
//#region src/components/social/dayBoundary.ts
function de(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function fe(e, t) {
	let n = de(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = de(t);
	return r ? n !== r : !1;
}
function pe(e, t = /* @__PURE__ */ new Date()) {
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
function me(e) {
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
function he(e, t = /* @__PURE__ */ new Date()) {
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
function ge(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function _e({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, actions: l, tone: u = "light", editedAt: d, contentLayout: f = "inline", className: p }) {
	let m = u === "dark", h = ge(r), g = !o || !!h;
	return /* @__PURE__ */ K("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", p),
		children: [/* @__PURE__ */ G("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ G(j, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ K("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				(g || l) && /* @__PURE__ */ K("div", {
					"data-testid": "message-row-header",
					className: e(l && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", l && s && "flex-row-reverse"),
					children: [g && /* @__PURE__ */ K("div", {
						className: e("flex items-baseline gap-2 min-w-0 max-w-full", l && "shrink-0", s && "flex-row-reverse"),
						children: [
							!o && /* @__PURE__ */ G("span", {
								"data-testid": "message-row-author",
								className: e("text-xs font-semibold truncate", m ? "text-white/70" : "text-text-secondary"),
								children: t
							}),
							h && /* @__PURE__ */ G("time", {
								"data-testid": "message-row-time",
								dateTime: r,
								title: J(r),
								className: e("text-xs shrink-0", m ? "text-white/40" : "text-text-tertiary"),
								children: h
							}),
							d && /* @__PURE__ */ G("span", {
								"data-testid": "message-row-edited",
								title: `Edited ${J(d)}`,
								className: e("text-[11px] shrink-0", m ? "text-white/40" : "text-text-tertiary"),
								children: "(edited)"
							})
						]
					}), l && /* @__PURE__ */ G("div", {
						"data-testid": "message-row-actions",
						className: "max-w-full shrink-0",
						children: l
					})]
				}),
				/* @__PURE__ */ G("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", m ? "text-white/90" : "text-text-primary", s && f === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && f === "inline" && (m ? "bg-white/15" : "bg-primary-bg"), f === "block" && "w-full max-w-[30rem]"),
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
var ve = /* @__PURE__ */ new Set([
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
]), ye = /^(https?:|mailto:)/i;
function be(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ye.test(t) ? t : null;
}
function xe(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => xe(e, `${t}-${n}`));
	if (!ve.has(n.tagName)) return /* @__PURE__ */ G("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ G("br", {}, t);
		case "A": {
			let e = be(n.getAttribute("href"));
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
var Se = /```([\s\S]*?)```|`([^`\n]+)`/g;
function Ce(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (Se.lastIndex = 0; (r = Se.exec(e)) !== null;) {
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
function we({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = V(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => xe(e, `n${t}`));
	}, [t]), o = V(() => Ce(n ?? ""), [n]);
	return /* @__PURE__ */ G("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function Te(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function Ee({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: c, "data-testid": u = "document-activity-card" }) {
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
					children: s ? Te(s) : d ? `${De(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ G("span", {
				className: "shrink-0",
				"data-testid": `${u}-editors`,
				children: /* @__PURE__ */ G(N, {
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
function De(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function Oe({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let c = a ? void 0 : i, u = a ? Te(a) : null;
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
function ke(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function Ae(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function je(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Me(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function Ne(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function Y(e, t) {
	let n = Ne(e), [r, i] = U(() => Date.now());
	return B(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function X(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Pe({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = Y(o, _), y = !_ && typeof a == "number" ? ke(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = X(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = Ae(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : Ae(r, !1)), /* @__PURE__ */ K("div", {
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
								children: v === null ? "Live" : `Live · ${Me(v)}`
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
						children: je(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ G("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ G(N, {
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
var Fe = {
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
function Ie(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Le(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Re(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function ze({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ K("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ G("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ G(j, {
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
function Be({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: l, thumbnailUrl: u, stage: d = "ready", transcriptReady: f = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: ee, "data-testid": w = "recording-activity-card" }) {
	let E = o ?? a.length, D = d === "gone", O = d !== "saving" && d !== "failed" && !D && !!g, k = () => {
		g?.(n);
	}, A = l != null && l > 0 ? ke(l) : "", j = Ie(s), ne = Re(a, E), { state: M, label: re } = Fe[d], P = [
		...g && O ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: k
		}] : [],
		...x && f ? [{
			"data-testid": `${w}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		..._ && !D ? [{
			"data-testid": `${w}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !D ? [{
			"data-testid": `${w}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...y && !D ? [{
			"data-testid": `${w}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && O ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], F = P.length ? [{
		items: P,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ K("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": d,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", ee),
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ K("button", {
				type: "button",
				onClick: O ? k : void 0,
				disabled: !O,
				"aria-label": O ? `Play ${r.toLowerCase()}` : `${r}: ${re.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", O ? "cursor-pointer" : "cursor-default"),
				children: [
					u ? /* @__PURE__ */ G("img", {
						src: u,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ G(ze, {
						participants: a,
						total: E,
						testId: w
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
					A && /* @__PURE__ */ G("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: A
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
								"data-testid": `${w}-title`,
								children: r
							}), h && /* @__PURE__ */ G("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ G(c, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ K("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${w}-by`,
							children: ["by ", i]
						}),
						E > 0 && /* @__PURE__ */ K("div", {
							className: "flex items-center gap-2",
							"data-testid": `${w}-people`,
							children: [/* @__PURE__ */ G(N, {
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
								children: ne
							})]
						}),
						/* @__PURE__ */ K("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ G(T, {
									state: M,
									label: re,
									size: "sm",
									"data-testid": `${w}-stage`
								}),
								d === "ready" && f && /* @__PURE__ */ G(T, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${w}-transcript`
								}),
								d === "ready" && p && /* @__PURE__ */ G(T, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${w}-summary`
								}),
								j && /* @__PURE__ */ G("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: j
								})
							]
						})
					]
				}), F.length > 0 && /* @__PURE__ */ G(te, {
					trigger: /* @__PURE__ */ G("span", {
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
		}), m && d !== "failed" && !D && /* @__PURE__ */ K("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ K("span", { children: ["Set to expire ", Le(m)] }), S && /* @__PURE__ */ G(t, {
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
function Ve(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function He(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Ue(e, t) {
	let n = e.names && e.names.length > 0 ? Ve(e.names) : e.userIds.length > 0 ? Ve(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = He(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function We({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Ue(t, n);
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
var Ge = {
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
}, Ke = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function qe(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Je(e) {
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
		default: return Ge[e.phase]?.label ?? "Running…";
	}
}
function Ye(e) {
	let t = !!e && (Ge[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = U(() => Date.now());
	return B(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var Xe = [
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
], Ze = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Qe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, $e = 6;
function et(e) {
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
	let r = n.toLowerCase(), i = et(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var tt = "shrink-0 whitespace-nowrap underline underline-offset-2", nt = `${tt} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Q(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function rt(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function it(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Q(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Q(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Q(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${rt(e.index)}`;
		case "deleteBlock": return `Removed block ${rt(e.index)}`;
		case "appendMacro": return t ? `Added a ${Q(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${rt(e.index)}`;
		case "setDocumentType": return `Type: ${Q(t, 40)}`;
		case "skip": return t ? Q(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Q(t)}` : e.op;
	}
}
function at(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function ot(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function st(e) {
	if (!e?.startedAt) return null;
	let t = at(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? ot(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var ct = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function lt({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = Ge[n.phase] ?? Ge.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
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
				children: Je(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ G("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: qe(r)
			}),
			c > 0 && /* @__PURE__ */ K("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ K("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						ae(l),
						" / ",
						ae(c)
					]
				}), /* @__PURE__ */ G(ne, {
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
				className: e(tt, "font-medium text-info"),
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
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ke[t.status] ?? Ke.pending)
			}), /* @__PURE__ */ G("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function ut({ runId: n, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: u, onOpenDocument: d, onOpenRun: f, result: p, onOpenResult: h, onDecide: g, suggestion: _, onReview: v, onRetry: y, documentTitle: b, defaultExpanded: S = !1, loop: C, onOpenLab: ee, className: w, "data-testid": T = "agent-run-card" }) {
	let E = u?.phase ?? "received", [D, O] = U(S), te = Ye(C), k = E === "completed" ? u?.suggestion ?? _ : void 0, A = E === "completed" ? u?.review : void 0, j = !!k && !A, ne = E === "completed" && u?.noop === !0, M = E === "completed" ? u?.result ?? p : void 0, N = M?.kind === "link" && M.label ? M.label : "Open", re = d && !(M?.kind === "document" && h), P = Ze[E], F = E === "failed" || E === "rejected", I = F ? "danger" : A ? A.decision === "accept" ? "success" : "neutral" : ne ? "warning" : E === "completed" ? k ? "warning" : "success" : E === "awaiting_approval" ? "warning" : "info", L = A ? "Reviewed" : j ? "Suggested" : ne ? "No change" : Qe[E], R = A ? A.byName ?? A.by : void 0, ie = A ? `${A.decision === "accept" ? "Accepted" : "Rejected"} by ${R}` : void 0, ae = E === "awaiting_approval", oe = E === "failed" ? Z(u?.details?.error ?? u?.detail, c) : void 0, se = E === "running" ? u?.stepLabel ? `${o} — ${u.stepLabel}` : `${o} is working via the pipeline` : ae ? `Waiting for approval${u?.detail ? ` — ${u.detail}` : ""}` : oe ? oe.summary : ie ?? u?.detail ?? (j && u?.suggestion ? `${u.suggestion.applied} ${u.suggestion.applied === 1 ? "change" : "changes"} suggested` : E === "received" ? "Received" : L), z = u?.details, B = z?.ops ?? [], V = z?.steps ?? [], H = z?.document?.title || b || "Document", W = !!z?.document || !!d, ce = oe ? oe.technical : z?.error, q = st(z), le = `${T}-details-${n}`, ue = !!(j && k && v || ae && g || M && h || M?.kind === "link" && !h);
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
					/* @__PURE__ */ G(x, {
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
						tone: Ge[C.phase]?.tone ?? "info",
						"data-testid": `${T}-phase`,
						children: Ge[C.phase]?.label ?? C.phase
					}) : /* @__PURE__ */ G(r, {
						size: "xs",
						tone: I,
						"data-testid": `${T}-phase`,
						children: L
					}),
					/* @__PURE__ */ G(i, {
						size: "sm",
						"aria-label": D ? "Hide details" : "Show details",
						"aria-expanded": D,
						"aria-controls": D ? le : void 0,
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
			C ? /* @__PURE__ */ G(lt, {
				runId: n,
				loop: C,
				clock: te,
				onOpenLab: ee,
				testId: T
			}) : /* @__PURE__ */ K("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ K("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", ue && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ G("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${T}-steps`,
							children: Xe.map((t, n) => {
								let r = F ? n < P : n < P || n === P && E === "completed", i = n === P && E !== "completed" && !F, a = F && n === P;
								return /* @__PURE__ */ K("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ G("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? ne && n === P ? "bg-warning" : "bg-success" : i ? ae ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ G("span", {
										className: "sr-only",
										children: a ? L : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ G("span", {
							className: e("min-w-0 flex-1 truncate", A && (A.decision === "accept" ? "text-success" : "text-text-tertiary"), E === "failed" && "text-danger", ne && "text-warning-fg"),
							"data-testid": `${T}-detail`,
							"data-review": A?.decision,
							title: oe ? oe.summary : u?.detail,
							children: se
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
					ae && g && /* @__PURE__ */ K("span", {
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
					M && h && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: () => h(M),
						className: e(tt, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": M.kind,
						children: N
					}),
					M?.kind === "link" && !h && /* @__PURE__ */ G("a", {
						href: M.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(tt, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": "link",
						children: N
					}),
					f && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: () => f(n),
						className: nt,
						"data-testid": `${T}-open-run`,
						children: "Open run"
					}),
					re && /* @__PURE__ */ G("button", {
						type: "button",
						onClick: d,
						className: nt,
						"data-testid": `${T}-open-document`,
						children: "Open document"
					})
				]
			}),
			D && /* @__PURE__ */ K("div", {
				id: le,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${T}-details`,
				children: [
					W && /* @__PURE__ */ K("div", {
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
									children: H
								}), z?.document?.snippet && /* @__PURE__ */ G("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${T}-details-snippet`,
									children: z.document.snippet
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
					B.length > 0 && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-ops`,
						children: [
							/* @__PURE__ */ G("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ G("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: B.slice(0, $e).map((e, t) => /* @__PURE__ */ G("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: it(e)
								}, t))
							}),
							B.length > $e && /* @__PURE__ */ K("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${T}-details-more-ops`,
								children: [
									"+",
									B.length - $e,
									" more"
								]
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ G("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${T}-details-steps`,
						children: V.map((t) => /* @__PURE__ */ K("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ G("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ct[t.status] ?? ct.pending)
							}), /* @__PURE__ */ G("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ce && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-error-block`,
						children: [/* @__PURE__ */ G("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ G("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${T}-details-error`,
							children: ce
						})]
					}),
					/* @__PURE__ */ K("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							f && /* @__PURE__ */ G("button", {
								type: "button",
								onClick: () => f(n),
								className: e(tt, "hover:text-text-primary"),
								"data-testid": `${T}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							M && h && /* @__PURE__ */ G("button", {
								type: "button",
								onClick: () => h(M),
								className: e(tt, "font-medium text-info"),
								"data-testid": `${T}-details-open-result`,
								children: N
							}),
							q && /* @__PURE__ */ G("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${T}-details-timings`,
								children: q
							})
						]
					})
				]
			})
		]
	});
}
function dt(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ft(e.result);
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
function ft(e) {
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
function pt(e, t) {
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
function mt(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ht({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = V(() => pt(t, n), [t, n]);
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
			title: mt(t),
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
var gt = [
	"👍",
	"🎉",
	"❤️"
], _t = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function vt({ quickReactions: t = gt, onReact: n, onOpenReactionPicker: r, onReply: i, onForward: o, onTogglePin: s, pinned: l = !1, onCopyLink: u, onEdit: d, onDelete: p, className: m, "data-testid": g = "message-actions" }) {
	let v = [], x = (e, t, n, r) => v.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (n) for (let e of t) x(`react-${e}`, `React ${e}`, /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		children: e
	}), () => n(e));
	return r && x("more-reactions", "More reactions", /* @__PURE__ */ G(h, { size: 14 }), (e) => r(e.currentTarget)), i && x("reply", "Reply", /* @__PURE__ */ G(f, { size: 14 }), i), o && x("forward", "Forward to another conversation", /* @__PURE__ */ G(a, { size: 14 }), (e) => o(e.currentTarget)), s && x("pin", l ? "Unpin" : "Pin to channel", /* @__PURE__ */ G(c, { size: 14 }), s), u && x("copy-link", "Copy link to message", /* @__PURE__ */ G(b, { size: 14 }), u), d && x("edit", "Edit message", /* @__PURE__ */ G(_, { size: 13 }), d), p && x("delete", "Delete message", /* @__PURE__ */ G(y, { size: 13 }), p), v.length === 0 ? null : /* @__PURE__ */ G(M, {
		label: "Message actions",
		"data-testid": g,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", m),
		children: v.map((e) => /* @__PURE__ */ G("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${g}-${e.key}`,
			onClick: e.onClick,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${_t}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function yt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
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
			/* @__PURE__ */ G(A, {
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
function bt(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function xt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = bt(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ G("button", {
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
				children: se(t.size)
			})]
		})]
	}) : /* @__PURE__ */ G("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(wt, {}), /* @__PURE__ */ K("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ G("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ G("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: se(t.size)
				})]
			})] })
		})
	});
}
function St(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ct({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : se(o);
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
			}) : /* @__PURE__ */ G(wt, {}),
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
function wt() {
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
function Tt({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = pe(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ K("div", {
		role: "separator",
		"aria-label": me(t),
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
function Et(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Dt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Ot(e) {
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
function kt(e) {
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
var At = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function jt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => At[e] ?? e)
	};
}
function Mt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function Nt(e) {
	return `${Mt(e)}:`;
}
function Pt(e, t) {
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
function Ft(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = Nt(t);
	if (n) {
		let t = Pt(n, r);
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
function It(e) {
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
function Lt(e) {
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
function Rt(e) {
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
function zt(e) {
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
function Bt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Vt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Bt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Ht(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Ut(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Wt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = Ht(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = Ht(r), i = Ut(r);
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
		let e = Ht(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = Ht(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Gt = 3, Kt = 2, qt = 3e5;
function Jt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Yt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(dt(e.metadata) || Rt(e.metadata) || Lt(e.metadata) || Ot(e.metadata) || zt(e.metadata));
}
function Xt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Jt(r);
	if (!i || i !== Jt(n) || !Yt(n) || !Yt(r) || r.editedAt || fe(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= qt;
}
function Zt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Qt({ tone: t = "light" }) {
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
function $t(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function en(e) {
	return e.displayName || e.userId;
}
function tn(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Jt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function nn(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function rn({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: l, composer: u, dock: d, currentUserId: f, reactionsFor: p, onToggleReaction: m, onReply: g, reply: _, onCancelReply: v, onForwardMessage: y, onCopyLink: b, onTogglePin: x, onEditMessage: S, onDeleteMessage: w, canEditMessage: T, canDeleteMessage: O, pinnedMessageIds: te, onJumpToMessage: A, highlightedMessageId: ne, threaded: M = !1, alignOwnMessages: N = !0, documentEditors: re, documentUnavailable: P, callParticipants: F, agentRunStatus: ae, onOpenRun: se, agentLoopStatus: V, onOpenLab: ce, onOpenResult: q, onDecideRun: le, onReviewRun: ue, onRetryRun: de, onJoinCall: pe, onOpenRecording: me, onCopyRecordingLink: he, onShareRecording: ge, onDownloadRecording: ve, onOpenRecordingTranscript: ye, onManageRecordingExpiry: be, recordingStatus: xe, onOpenDocument: Se, renderMessageReferences: Ce, tone: Te = "light", showHeader: De, fill: ke, flushComposer: Ae = !1, onLoadMore: je, hasMore: Me, loadingMore: Ne = !1, onSendFiles: Y, transfers: X = [], currentActor: Fe, onCancelTransfer: Ie, attachmentSrc: Le, onOpenAttachment: Re, acceptFiles: ze, maxFileSize: Ve, onFileError: He, readReceipts: Ue, readReceiptsEnabled: Ge = !0, unreadFrom: Ke, emojis: qe = ie }) {
	let [Je, Ye] = U(null), [Xe, Ze] = U(null), Qe = H(null), [$e, et] = U(null), Z = Te === "dark", tt = k(), nt = De ?? !(tt?.hasHeader ?? !1), Q = ke ?? tt?.fillsHeight ?? !1, [rt, it] = U(""), at = H(null), ot = H(null), st = !!je && Me !== !1, ct = H(null), lt = H(null), [ft, pt] = U(!1), mt = !!Y && !a, gt = Vt(n, r), _t = M ? Wt(gt) : null, [bt, wt] = U(() => /* @__PURE__ */ new Set());
	function At(e) {
		wt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Nt = H(void 0);
	if (Ke !== void 0) {
		let e = Nt.current;
		if (e === void 0) Nt.current = Ke;
		else {
			let t = Date.parse(Ke), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Nt.current = Ke);
		}
	}
	let Pt = Nt.current, Ut = Pt === void 0 ? -1 : Zt(_t ? _t.map((e) => Bt(e.root)) : gt.map((e) => Bt(e)), Pt), qt = Ue !== void 0, Jt = Ue ?? [], Yt = Ge && f ? f : void 0, rn = (() => {
		if (Yt) for (let e = gt.length - 1; e >= 0; --e) {
			let t = gt[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Yt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), on = rn && Yt ? $t(Jt, Yt, rn.timestamp) : [], sn = on.length === 1 && !!Yt && tn(n, Jt, Yt) === 1;
	function cn() {
		if (!rn) return null;
		if (on.length === 0) return qt ? /* @__PURE__ */ G("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", N ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ G("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = on.map(en), n = on.slice(0, 3);
		return /* @__PURE__ */ K("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", N ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				on.length > 1 && /* @__PURE__ */ G("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ G(j, {
						name: en(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ G("span", {
					"data-testid": "chat-read-receipts-label",
					children: sn ? "Seen" : `Seen by ${on.length}`
				}),
				/* @__PURE__ */ G("span", {
					style: E,
					children: sn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [ln, $] = U(0), [un, dn] = U(!1), fn = H(!0), pn = H(n.length), mn = n.length + r.length + X.length, hn = H(null), [gn, _n] = U(""), vn = H(null), yn = H(!1), bn = H(0);
	B(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!yn.current) {
			yn.current = !0, vn.current = t;
			return;
		}
		if (t === vn.current || (vn.current = t, f && e.userId === f)) return;
		bn.current += 1;
		let r = bn.current % 2 == 0 ? "​" : "";
		_n(Dt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function xn() {
		let e = at.current;
		e && (e.scrollTop = e.scrollHeight, fn.current = !0, $(0));
	}
	function Sn() {
		let e = at.current;
		if (!e) return;
		let t = Et(e);
		fn.current = t, t && $(0), dn(e.scrollTop > 8);
	}
	B(() => {
		let e = at.current, t = pn.current, n = mn - t;
		if (pn.current = mn, !e) return;
		let r = hn.current;
		if (r && n > 0) {
			hn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		fn.current ? (e.scrollTop = e.scrollHeight, $(0), dn(e.scrollTop > 8)) : n > 0 && $((e) => e + n);
	}, [mn]);
	function Cn() {
		let e = at.current;
		e && (hn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), je?.();
	}
	B(() => () => {
		ot.current && clearTimeout(ot.current);
	}, []);
	function wn() {
		let e = rt.trim();
		!e || a || (ot.current && clearTimeout(ot.current), ot.current = null, o?.(!1), fn.current = !0, i(e), it(""));
	}
	function Tn(e) {
		!mt || e.length === 0 || (fn.current = !0, Y?.(e));
	}
	function En(e) {
		if (!mt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Tn(t));
	}
	function Dn(e) {
		it((t) => t + e), pt(!1);
	}
	function On() {
		a || (o?.(!0), ot.current && clearTimeout(ot.current), ot.current = setTimeout(() => o?.(!1), 2e3));
	}
	function kn(e) {
		On(), e.key === "Enter" && !a && rt.trim() && wn();
	}
	function An(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, l = !o && r === Ut ? /* @__PURE__ */ G(Qt, { tone: Te }) : null, u = !l && Xt(a, n), d = !o && fe(s, i) ? /* @__PURE__ */ G(Tt, {
			timestamp: s,
			tone: Te
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = dt(r.metadata);
			return /* @__PURE__ */ K(z, { children: [
				d,
				l,
				/* @__PURE__ */ G("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ G(_e, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: Te,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ K(W, { children: [
							i ? /* @__PURE__ */ G(ut, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: ae?.(i.runId),
								onOpenDocument: Se && i.documentId ? () => Se(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: se,
								result: i.result,
								onOpenResult: q,
								onDecide: le,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: ue,
								onRetry: de,
								...nn(i, V, ce)
							}) : r.body == null ? /* @__PURE__ */ G(we, { text: r.content }) : /* @__PURE__ */ G("div", {
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
		let { message: h } = n, _ = h.displayName ?? h.clientId.slice(0, 8), v = h.attachments ?? [], C = h.metadata?.html, ee = typeof C == "string" ? C : void 0, E = It(h.metadata), D = Ft(h.content, E, ee), k = /* @__PURE__ */ G(we, {
			html: D.html,
			text: D.body
		}), j = Ot(h.metadata), M = dt(h.metadata), I = Lt(h.metadata), L = Rt(h.metadata), R = zt(h.metadata), ie = jt(h.metadata), B = kt(h.metadata), H = M ? /* @__PURE__ */ G(ut, {
			runId: M.runId,
			instruction: M.instruction || h.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: h.displayName,
			status: ae?.(M.runId),
			onOpenDocument: Se && M.documentId ? () => Se(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: se,
			result: M.result,
			onOpenResult: q,
			onDecide: le,
			suggestion: M.suggestionKey ? {
				key: M.suggestionKey,
				...M.documentId ? { documentId: M.documentId } : {}
			} : void 0,
			onReview: ue,
			onRetry: de,
			...nn(M, V, ce)
		}) : L ? (() => {
			let e = xe?.(L.recordingId), t = {
				...L,
				...e ?? {}
			};
			return /* @__PURE__ */ G(Be, {
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
				pinned: !!h.id && !!te?.has(h.id),
				onOpen: me,
				onCopyLink: he,
				onShare: ge,
				onDownload: ve,
				onOpenTranscript: ye,
				onManageExpiry: be,
				onTogglePin: x ? () => x(h) : void 0
			});
		})() : I ? /* @__PURE__ */ G(Pe, {
			callId: I.callId,
			startedBy: (typeof h.metadata?.displayName == "string" ? h.metadata.displayName : void 0) ?? h.displayName,
			participants: F?.(I.callId) ?? I.participants,
			live: I.live,
			durationMs: I.durationMs,
			startedAt: I.startedAt,
			outcome: I.outcome,
			recordingId: I.recordingId,
			onOpenRecording: me,
			audioOnly: I.audioOnly,
			recorded: I.recorded,
			notRecordedReason: I.notRecordedReason,
			lobbyName: I.lobbyName,
			onJoin: pe
		}) : j ? /* @__PURE__ */ G(Ee, {
			documentId: j.documentId,
			title: j.title || h.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof h.metadata?.displayName == "string" ? h.metadata.displayName : void 0) ?? h.displayName,
			editors: re?.(j.documentId) ?? [],
			onOpen: Se,
			unavailable: P?.(j.documentId)
		}) : v.length === 0 ? k : /* @__PURE__ */ K(W, { children: [(h.content || ee) && k, v.map((e) => /* @__PURE__ */ G(xt, {
			attachment: e,
			src: Le?.(e),
			onOpen: Re
		}, e.id))] }), U = h.id ?? "", De = U && p ? p(U) : [], ke = h.metadata?.replyTo, Ae = !!o && !!ke && ke.messageId === o.rootId, je = !!ke && !Ae, Me = !!U && !!te?.has(U), Ne = !!f && h.userId === f, Y = h.metadata?.system === !0, X = !!h.deletedAt || h.metadata?.deleted === !0, Fe = !!(M || L || I || j || R), Ie = !!(M || L || I || j || v.length > 0), ze = !X && !Y && !Fe && !!U, Ve = ze && (T ? T(h) : Ne), He = ze && (O ? O(h) : Ne), Ue = Ve || He, Ge = !!U && !X && !Y && !Fe && v.length === 0 && !!h.content.trim(), Ke = Ve && !!S && Je === U, qe = /* @__PURE__ */ K(W, { children: [
			je && ke && /* @__PURE__ */ G(oe, {
				quote: ke,
				onJump: A,
				className: "mb-1"
			}),
			E && /* @__PURE__ */ K("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Mt(E), E.timestamp ? J(E.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ G("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					D.stripped ? Mt(E) : "Forwarded"
				]
			}),
			Me && /* @__PURE__ */ K("span", {
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
			}) : Ke ? /* @__PURE__ */ G(yt, {
				initialText: h.content,
				onSave: async (e) => {
					await S(h, e), Ye(null);
				},
				onCancel: () => Ye(null)
			}) : H,
			!X && Ce?.(h),
			!X && B.length > 0 && /* @__PURE__ */ G("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: B.map((e) => /* @__PURE__ */ G(Oe, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: Se,
					unavailable: P?.(e.id)
				}, e.id))
			}),
			!X && ie && /* @__PURE__ */ K("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					ie.labels.length > 0 ? `Too large to send: ${ie.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!X && De.length > 0 && f && m && /* @__PURE__ */ G(ht, {
				reactions: De,
				currentUserId: f,
				onToggle: (e) => m(U, e)
			})
		] });
		return R ? /* @__PURE__ */ K(z, { children: [
			d,
			l,
			/* @__PURE__ */ G(We, {
				membership: R,
				fallbackText: h.content,
				timestamp: h.timestamp,
				"data-testid": "membership-notice"
			})
		] }, h.id ?? r) : /* @__PURE__ */ K(z, { children: [
			d,
			l,
			/* @__PURE__ */ G("div", {
				"data-testid": "chat-message",
				"data-message-id": U || void 0,
				"data-continues": u ? "true" : void 0,
				title: u ? J(h.timestamp) : void 0,
				className: e("group relative rounded-md px-2 py-1 transition-colors hover:bg-surface-hover", U && U === ne && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ G(_e, {
					author: _,
					content: qe,
					timestamp: u ? "" : h.timestamp,
					editedAt: X ? void 0 : h.editedAt,
					avatarUrl: h.avatarUrl,
					hideAvatar: u,
					hideAuthor: u,
					tone: Te,
					mine: Ne && N,
					contentLayout: Ie ? "block" : "inline",
					actions: U && !X && !Ke && (m || Ue || Ge && y || !Y && (g || x || b)) ? /* @__PURE__ */ G(vt, {
						className: "max-w-full flex-wrap opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100",
						onReact: m ? (e) => m(U, e) : void 0,
						onOpenReactionPicker: m ? (e) => {
							Qe.current = e, Ze(U);
						} : void 0,
						onReply: g && !Y ? () => g(o?.rootMessage ?? h) : void 0,
						onForward: y && Ge ? (e) => y(h, e) : void 0,
						onCopyLink: b && !Y && U ? () => b(h) : void 0,
						onTogglePin: x && !Y ? () => x(h) : void 0,
						pinned: !!h.id && !!te?.has(h.id),
						onEdit: Ve && S ? () => Ye(U) : void 0,
						onDelete: He && w ? () => et(U) : void 0
					}) : void 0
				})
			}),
			!!rn && U === rn.id && cn()
		] }, h.id ?? r);
	}
	function jn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Mn(e) {
		if (!g || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !zt(t.metadata)) return t;
	}
	function Nn(t, n, r) {
		let i = Bt(r?.root), a = r && r.replies.length === 0 && !Mn(r.root) ? r.root : void 0, o = An(t.root, n, i, a), s = Bt(t.root) ?? "", c = n > 0 && n !== Ut && !fe(s, i) ? /* @__PURE__ */ G("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, l = t.replies.length > 0 ? Mn(t.root) : null;
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ K(z, { children: [c, o] }, `post:${Ht(t.root) ?? n}`) : o;
		let u = Ht(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > Gt, p = !f || bt.has(u), m = p ? t.replies : t.replies.slice(0, Kt), h = t.replies.length - m.length, _ = [...new Set(t.replies.slice(m.length).map(jn))].slice(0, 3);
		return /* @__PURE__ */ K(z, { children: [c, /* @__PURE__ */ K("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ K("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => An(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ K("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => At(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ G("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ G(j, {
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
						"aria-label": `Reply to ${jn(t.root)}`,
						onClick: () => g?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let Pn = /* @__PURE__ */ K("div", {
		"data-testid": "chat-panel",
		className: e(Q ? e("flex h-full min-h-0 flex-col pt-2", Ae && u ? "px-0 pb-0" : "px-3 pb-3") : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			nt && /* @__PURE__ */ K("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ G("span", {
				style: E,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: gn
			}),
			/* @__PURE__ */ K("div", {
				className: e("relative flex flex-col mb-2", Q ? "min-h-0 flex-1" : "", Q && Ae && u && "mx-4"),
				children: [/* @__PURE__ */ G("div", {
					ref: at,
					onScroll: Sn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", un && "fade-top", Q ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ K("div", {
						className: "mt-auto pb-4",
						children: [
							st && n.length > 0 && /* @__PURE__ */ G("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ G("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Cn,
									disabled: Ne,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Ne ? "Loading…" : "Load earlier messages"
								})
							}),
							gt.length === 0 ? l ?? /* @__PURE__ */ G("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : _t ? _t.map((e, t) => Nn(e, t, _t[t - 1])) : gt.map((e, t) => An(e, t, Bt(gt[t - 1]), gt[t - 1])),
							m && /* @__PURE__ */ G(L, {
								open: Xe !== null,
								triggerRef: Qe,
								emojis: qe,
								onSelect: (e) => {
									Xe && m(Xe, e), Ze(null);
								},
								onClose: () => Ze(null)
							}),
							w && /* @__PURE__ */ G(C, {
								open: $e !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => et(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === $e);
									et(null), e && w(e);
								}
							}),
							X.map((e) => /* @__PURE__ */ G(_e, {
								author: e.actor,
								timestamp: "",
								tone: Te,
								content: /* @__PURE__ */ G(Ct, {
									transfer: e,
									mine: St(e, f, Fe),
									onCancel: Ie
								})
							}, e.transferId))
						]
					})
				}), ln > 0 && /* @__PURE__ */ K("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: xn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						ln,
						" new message",
						ln === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ G(D, {
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
				onKeyDownCapture: o ? On : void 0,
				children: u
			}) : /* @__PURE__ */ K("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [_ && /* @__PURE__ */ G(oe, {
					quote: _,
					onDismiss: v,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ K("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						Y && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G("button", {
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !mt,
							onClick: () => ct.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(an, {})
						}), /* @__PURE__ */ G(I, {
							ref: ct,
							multiple: !0,
							accept: ze,
							onFiles: (e) => {
								let t = Ve ? e.filter((e) => e.size > Ve) : [];
								t.length > 0 && He?.(`Skipped ${t.length} file(s) over the size limit.`), Tn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ G("button", {
							ref: lt,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": ft,
							title: "Insert emoji",
							disabled: a,
							onClick: () => pt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(h, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ G(L, {
							open: ft,
							onSelect: Dn,
							onClose: () => pt(!1),
							triggerRef: lt,
							emojis: qe
						}),
						/* @__PURE__ */ G(ee, {
							size: "sm",
							value: rt,
							onChange: (e) => it(e.target.value),
							onKeyDown: kn,
							onPaste: En,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ G(t, {
							variant: "primary",
							size: "sm",
							onClick: wn,
							disabled: a || !rt.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return Y ? /* @__PURE__ */ G(R, {
		onFiles: Tn,
		accept: ze,
		maxSize: Ve,
		onError: He,
		disabled: a,
		className: Q ? "flex h-full min-h-0 flex-col" : void 0,
		children: Pn
	}) : Pn;
}
function an() {
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
function on(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function sn({ users: e, currentClientId: t }) {
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
			let n = q(on(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = le(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
var cn = "min-w-0 truncate", ln = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function $({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ G("time", {
		dateTime: a,
		title: o,
		className: ln,
		children: i
	}) : /* @__PURE__ */ G("span", {
		title: o,
		className: ln,
		children: i
	}) : null, _ = /* @__PURE__ */ K("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ K("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ G("span", {
				"data-line": "primary",
				title: r,
				className: e(cn, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ G("span", {
			"data-line": "secondary",
			title: s,
			className: e(cn, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
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
function un(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function dn({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ G("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function fn({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ G(dn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(w, {
			icon: /* @__PURE__ */ G(c, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${J(e.sentAt)} · pinned ${J(e.pinnedAt)}` : J(r) : void 0;
			return /* @__PURE__ */ G($, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ G(j, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: un(r),
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
function pn({ file: e, thumbnailSrc: t, onJump: n }) {
	let r = t?.(e.attachment) ?? e.attachment.preview, i = bt(e.attachment);
	return /* @__PURE__ */ G($, {
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
		meta: [e.author, se(e.attachment.size)].filter(Boolean).join(" · "),
		timestamp: un(e.sentAt),
		timestampIso: e.sentAt,
		timestampTitle: e.sentAt ? J(e.sentAt) : void 0,
		onJump: n ? () => n(e.messageId) : void 0,
		jumpLabel: `Go to the message with ${e.attachment.name}`
	});
}
function mn({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ G(dn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(w, {
			icon: /* @__PURE__ */ G(s, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => /* @__PURE__ */ G(pn, {
			file: e,
			thumbnailSrc: t,
			onJump: n
		}, `${e.messageId}:${e.attachment.id}`))
	});
}
function hn({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ G(dn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(w, {
			icon: /* @__PURE__ */ G(p, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ G($, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ G(j, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: un(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? J(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function gn(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function _n(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function vn({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ G(dn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(w, {
			icon: /* @__PURE__ */ G(u, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ G($, {
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
				title: [un(e.startedAt), gn(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : _n(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function yn(e, t) {
	let n = e ? Date.parse(e) : NaN, r = t ? Date.parse(t) : NaN;
	return Number.isNaN(n) && Number.isNaN(r) ? 0 : Number.isNaN(n) ? 1 : Number.isNaN(r) ? -1 : r - n;
}
function bn({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, files: a, thumbnailSrc: o, onJumpToFile: s, className: c, "data-testid": u = "channel-documents-panel" }) {
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
	}), "New document", e), i && d("create-whiteboard", i, /* @__PURE__ */ G(v, { size: 15 }), "New whiteboard", e)].filter(Boolean), p = !!(r || i), m = a ? [...t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	})), ...a.map((e) => ({
		kind: "file",
		file: e,
		at: e.sentAt
	}))].sort((e, t) => yn(e.at, t.at)) : t.map((e) => ({
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
			}), "New document in this conversation"), i && d("create-whiteboard", i, /* @__PURE__ */ G(v, { size: 15 }), "New whiteboard in this conversation")]
		}), m.length === 0 ? /* @__PURE__ */ G(w, {
			icon: /* @__PURE__ */ G(l, { size: 40 }),
			title: a ? "Nothing here yet" : "No documents yet",
			description: a ? "Documents, whiteboards and files shared here stay with this conversation." : "Documents and whiteboards started here stay with this conversation.",
			action: p ? /* @__PURE__ */ G("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: f(!0)
			}) : void 0
		}) : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: m.map((e) => e.kind === "file" ? /* @__PURE__ */ G(pn, {
				file: e.file,
				thumbnailSrc: o,
				onJump: s
			}, `file:${e.file.messageId}:${e.file.attachment.id}`) : /* @__PURE__ */ G($, {
				"data-testid": "channel-document",
				"data-kind": "document",
				leading: /* @__PURE__ */ G("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.doc.icon || /* @__PURE__ */ G(l, {})
				}),
				title: e.doc.title || "Untitled",
				meta: [e.doc.createdBy, e.doc.activeEditors ? `${e.doc.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: un(e.doc.updatedAt),
				timestampIso: e.doc.updatedAt,
				timestampTitle: e.doc.updatedAt ? J(e.doc.updatedAt) : void 0,
				onJump: n ? () => n(e.doc.documentId) : void 0,
				jumpLabel: `Open ${e.doc.title || "this document"}`
			}, e.doc.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var xn = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Sn = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function Cn({ name: t, description: n, online: r, avatarUrl: a, features: o = xn, children: s, canvas: c, members: l, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onRename: _, onCreateDocument: v, onCreateWhiteboard: y, pins: b = [], onUnpin: x, mentions: C = [], onOpenMention: ee, recordings: w = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: te = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: ne, callInProgress: M = !1, headerActions: N, headerClassName: re, view: P, onViewChange: F, className: I, "data-testid": L = "conversation-surface" }) {
	let R = new Set(o), ie = R.has("files") && R.has("documents"), [ae, oe] = U("chat"), se = P ?? ae, z = ie && se === "files" ? "documents" : se, B = R.has(z) ? z : o[0] ?? "chat", V = (e) => {
		P === void 0 && oe(e), F?.(e);
	}, H = (e) => e || void 0, ce = o.filter((e) => Sn[e] && !(ie && e === "files")).map((e) => ({
		id: e,
		label: Sn[e],
		badge: e === "files" ? H(p.length) : e === "documents" ? H(h.length + (ie ? p.length : 0)) : e === "pins" ? H(b.length) : e === "members" ? f == null ? void 0 : H(f) : e === "calls" ? H(w.length) : e === "mentions" ? H(C.filter((e) => e.unread).length) : void 0
	})), q = (e) => {
		V("chat"), E?.(e);
	};
	return /* @__PURE__ */ K("section", {
		className: e("flex min-w-0 flex-col", I),
		"data-testid": L,
		children: [
			/* @__PURE__ */ G(O, {
				className: re,
				name: t,
				onRename: _,
				description: n,
				online: r,
				avatarUrl: a,
				"data-testid": `${L}-header`,
				tabs: ce.length > 1 ? /* @__PURE__ */ G(S, {
					variant: "underline",
					size: "md",
					"aria-label": "Views of this conversation",
					getItemTestId: (e) => `${L}-tab-${e.id}`,
					value: B,
					onValueChange: (e) => V(e),
					items: ce
				}) : void 0,
				actions: D || k || N ? /* @__PURE__ */ K(W, { children: [
					D && (te ? /* @__PURE__ */ G(i, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${L}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(i, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${L}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}), /* @__PURE__ */ G(i, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${L}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ G(u, { size: 16 })
					})] })),
					k && /* @__PURE__ */ G(wn, {
						testId: `${L}-watch`,
						label: A,
						hint: j,
						viewerCount: ne,
						onClick: k
					}),
					N
				] }) : void 0
			}),
			R.has("files") && B === "files" && /* @__PURE__ */ G(mn, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: E ? q : void 0
			}),
			R.has("documents") && B === "documents" && /* @__PURE__ */ G(bn, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: v,
				onCreateWhiteboard: y,
				...ie ? {
					files: p,
					thumbnailSrc: m,
					onJumpToFile: E ? q : void 0
				} : {}
			}),
			R.has("pins") && B === "pins" && /* @__PURE__ */ G(fn, {
				className: "min-h-0 flex-1",
				pins: b,
				onUnpin: x,
				onJump: E ? q : void 0
			}),
			R.has("members") && B === "members" && /* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${L}-members`,
				children: l
			}),
			R.has("mentions") && B === "mentions" && /* @__PURE__ */ G(hn, {
				className: "min-h-0 flex-1",
				mentions: C,
				onJump: ee ? (e, t) => {
					V("chat"), ee(e, t);
				} : void 0
			}),
			R.has("calls") && B === "calls" && /* @__PURE__ */ G(vn, {
				className: "min-h-0 flex-1",
				recordings: w,
				onOpen: T
			}),
			R.has("chat") && /* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${L}-chat`,
				hidden: B !== "chat",
				children: [c && /* @__PURE__ */ G("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${L}-canvas`,
					children: c
				}), /* @__PURE__ */ G("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function wn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let s = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ K(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Tn,
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
var Tn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { Te as $, pt as A, We as B, xt as C, vt as D, yt as E, st as F, Pe as G, He as H, Je as I, ke as J, X as K, Z as L, ut as M, dt as N, ht as O, ft as P, Ee as Q, it as R, Tt as S, bt as T, Be as U, Ue as V, Re as W, Y as X, Me as Y, Oe as Z, It as _, hn as a, pe as at, jt as b, gn as c, fe as ct, rn as d, le as dt, we as et, Lt as f, Mt as g, Nt as h, mn as i, de as it, ct as j, mt as k, $ as l, ue as lt, kt as m, Cn as n, ge as nt, vn as o, me as ot, Ot as p, Ae as q, bn as r, he as rt, fn as s, J as st, xn as t, _e as tt, sn as u, q as ut, zt as v, Ct as w, Ft as x, Rt as y, qe as z };
