import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { n, p as r } from "./overlayStack-DxIDMUs-.js";
import { t as i } from "./IconButton-J9jGN6eo.js";
import { $ as a, A as o, B as s, E as c, Et as l, S as u, Y as d, et as f, ht as p, i as m, m as h, q as g, rt as _, ut as v, w as y, wt as b, xt as x } from "./Icons-C__ztBBw.js";
import { g as S } from "./MediaIcons-_ai5Til2.js";
import { i as C } from "./Text-Cv8fPFPw.js";
import { t as ee } from "./ConfirmDialog-BxFrBQ52.js";
import { t as w } from "./Input-B0LB5k_L.js";
import { t as T } from "./InlinePopover-Dx8-r-XU.js";
import { t as E } from "./EmptyState-D5ucMp2y.js";
import { t as D } from "./StatusPill-CLkB5jFS.js";
import { i as O, n as k, t as A } from "./ChannelHeader-v2clAAea.js";
import { t as j } from "./DropdownMenu-2S3snVPG.js";
import { n as M } from "./DockedPanelContext-pH9A5z1h.js";
import { t as N } from "./Textarea-BwvE1HPn.js";
import { t as P } from "./Avatar-DkkMISPQ.js";
import { t as F } from "./DotMeter-B6ZDgLU7.js";
import { t as te } from "./RovingToolbar-B1Fai5PF.js";
import { t as I } from "./PresenceAvatars--JG3ZaTz.js";
import { a as L, d as ne, i as R } from "./railType-C-v_XDgr.js";
import { i as z, n as B, r as re, t as V } from "./ReactionPickerPopover-Dwr2gY0t.js";
import { n as ie } from "./useComputeProjects-ZSazDRet.js";
import { t as H } from "./QuoteBlock-qqQqscMP.js";
import { t as U } from "./formatBytes-05ivRSJY.js";
import { Fragment as ae, useEffect as W, useMemo as oe, useRef as G, useState as K } from "react";
import { Fragment as q, jsx as J, jsxs as Y } from "react/jsx-runtime";
//#region src/utils/identity.ts
var se = [
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
function ce(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return se[Math.abs(t) % se.length];
}
function le(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/RailSectionHeader.tsx
function ue({ label: t, actions: n = [], presentational: r = !0, collapsed: i = !1, onToggleCollapse: a, controls: o, toggleId: s, collapsedCount: c = 0, count: l, dark: u = !1, className: d, "data-testid": f = "rail-section-header" }) {
	let p = a !== void 0, m = e("min-w-0 flex-1 truncate", R, u ? "text-white/40" : L);
	return /* @__PURE__ */ Y("div", {
		"data-testid": f,
		className: e("flex items-center gap-1 px-2 pb-1 pt-3", d),
		children: [
			p ? /* @__PURE__ */ Y("button", {
				type: "button",
				id: s,
				"aria-expanded": !i,
				"aria-controls": o,
				onClick: () => a(!i),
				"data-testid": `${f}-toggle`,
				className: e("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "hover:text-white" : "hover:text-text-primary"),
				children: [
					/* @__PURE__ */ J(ne, {
						open: !i,
						className: u ? "text-white/40" : "text-text-secondary"
					}),
					/* @__PURE__ */ J("span", {
						className: m,
						children: t
					}),
					i && c > 0 && /* @__PURE__ */ Y(q, { children: [" ", /* @__PURE__ */ J("span", {
						"aria-label": `${c} unread`,
						"data-testid": `${f}-collapsed-count`,
						className: e("grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none", u ? "bg-white/15 text-white" : "bg-primary text-on-primary"),
						children: c > 99 ? "99+" : c
					})] })
				]
			}) : /* @__PURE__ */ J("span", {
				"aria-hidden": r || void 0,
				className: m,
				children: t
			}),
			typeof l == "number" && /* @__PURE__ */ J("span", {
				"aria-label": `${l} items`,
				"data-testid": `${f}-count`,
				"data-shape": "plain",
				className: e("shrink-0 pr-1", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", u && "text-white/60"),
				children: l
			}),
			n.map((t) => /* @__PURE__ */ J("button", {
				type: "button",
				title: t.label,
				"aria-label": t.label,
				onClick: (e) => {
					i && a?.(!1), t.onClick(e.currentTarget);
				},
				"data-testid": t["data-testid"],
				className: e("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
				children: t.icon ?? /* @__PURE__ */ J(_, { size: 13 })
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
function X(e) {
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
function _e({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, actions: l, actionsLayout: u = "inline", tone: d = "light", editedAt: f, contentLayout: p = "inline", className: m }) {
	let h = d === "dark", _ = ge(r), [v, y] = K(!1), b = G(null), x = !o || !!_, S = !!l && (u === "menu" || !x);
	W(() => {
		S || y(!1);
	}, [S]);
	let C = /* @__PURE__ */ J("button", {
		ref: b,
		type: "button",
		"aria-label": "Message actions",
		"aria-expanded": v,
		"aria-haspopup": "dialog",
		onClick: () => y((e) => !e),
		"data-testid": "message-row-actions-toggle",
		className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary aria-expanded:opacity-100",
		children: /* @__PURE__ */ J(g, { size: 16 })
	});
	return /* @__PURE__ */ Y("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", m),
		children: [
			/* @__PURE__ */ J("div", {
				className: "w-5 shrink-0 mt-0.5",
				children: S && !x ? C : !a && /* @__PURE__ */ J(P, {
					name: t,
					src: i,
					size: 20
				})
			}),
			/* @__PURE__ */ Y("div", {
				className: e("flex grow flex-col min-w-0", s && "items-end"),
				children: [
					x && /* @__PURE__ */ Y("div", {
						"data-testid": "message-row-header",
						className: e(l && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", S && "flex-nowrap", l && s && "flex-row-reverse"),
						children: [x && /* @__PURE__ */ Y("div", {
							className: e("flex items-baseline gap-2 min-w-0 max-w-full", l && (S ? "flex-1" : "shrink-0"), s && "flex-row-reverse"),
							children: [
								!o && /* @__PURE__ */ J("span", {
									"data-testid": "message-row-author",
									className: e("text-xs font-semibold truncate", h ? "text-white/70" : "text-text-secondary"),
									children: t
								}),
								_ && /* @__PURE__ */ J("time", {
									"data-testid": "message-row-time",
									dateTime: r,
									title: X(r),
									className: e("text-xs shrink-0", h ? "text-white/40" : "text-text-tertiary"),
									children: _
								}),
								f && /* @__PURE__ */ J("span", {
									"data-testid": "message-row-edited",
									title: `Edited ${X(f)}`,
									className: e("text-[11px] shrink-0", h ? "text-white/40" : "text-text-tertiary"),
									children: "(edited)"
								})
							]
						}), S ? C : l && /* @__PURE__ */ J("div", {
							"data-testid": "message-row-actions",
							className: "max-w-full shrink-0",
							children: l
						})]
					}),
					/* @__PURE__ */ J("span", {
						"data-testid": "message-row-content",
						className: e("text-sm min-w-0 break-words whitespace-pre-wrap", h ? "text-white/90" : "text-text-primary", s && p === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && p === "inline" && (h ? "bg-white/15" : "bg-primary-bg"), p === "block" && "w-full max-w-[30rem]"),
						children: n
					}),
					c && /* @__PURE__ */ J("div", {
						"data-testid": "message-row-footer",
						className: e("mt-1", s && "self-end"),
						children: c
					})
				]
			}),
			S && /* @__PURE__ */ J(T, {
				trigger: b,
				open: v,
				onClose: () => y(!1),
				placement: s ? "bottom-end" : "bottom-start",
				"aria-label": "Message actions",
				className: "min-w-0 max-w-[calc(100vw-16px)] p-0",
				children: l
			})
		]
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
	if (!ve.has(n.tagName)) return /* @__PURE__ */ J("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ J("br", {}, t);
		case "A": {
			let e = be(n.getAttribute("href"));
			return e ? /* @__PURE__ */ J("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ J("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ J("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ J(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ J("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ J("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ J("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function we({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = oe(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => xe(e, `n${t}`));
	}, [t]), o = oe(() => Ce(n ?? ""), [n]);
	return /* @__PURE__ */ J("div", {
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
function Ee({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: c, "data-testid": l = "document-activity-card" }) {
	let d = !s && a.length > 0;
	return /* @__PURE__ */ Y("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", c),
		children: [
			/* @__PURE__ */ J("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ J(u, { size: 18 })
			}),
			/* @__PURE__ */ Y("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ J("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ J("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${l}-unavailable` : void 0,
					children: s ? Te(s) : d ? `${De(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ J("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ J(I, {
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
			o && !s && /* @__PURE__ */ J("button", {
				type: "button",
				"data-testid": `${l}-open`,
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
	let c = a ? void 0 : i, l = a ? Te(a) : null;
	return /* @__PURE__ */ Y("button", {
		type: "button",
		onClick: c ? () => c(t) : void 0,
		disabled: !c,
		title: l ? `${n} — ${l}` : n,
		"data-testid": s,
		"data-document-id": t,
		"data-unavailable": a,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", c ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a && "border-dashed text-text-tertiary opacity-70", o),
		children: [
			r ? /* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ J(u, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ J("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			l && /* @__PURE__ */ Y("span", {
				className: "shrink-0",
				"data-testid": `${s}-unavailable`,
				children: ["· ", l]
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
function Z(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function Ne(e, t) {
	let n = Z(e), [r, i] = K(() => Date.now());
	return W(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function Pe(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Fe({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = Ne(o, _), y = !_ && typeof a == "number" ? ke(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = Pe(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = Ae(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : Ae(r, !1)), /* @__PURE__ */ Y("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ Y("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ Y("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ J("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ J("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ Y("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ J("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ Y("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ J("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${Me(v)}`
							}),
							_ && /* @__PURE__ */ J("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ J("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ J("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: je(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ J("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ J(I, {
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
			!_ && c && l && /* @__PURE__ */ J("button", {
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ J("button", {
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
var Ie = {
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
function Le(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Re(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function ze(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Be({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ Y("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ J("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ J(P, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ Y("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ J("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ J("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ J("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Ve({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: C, className: ee, "data-testid": w = "recording-activity-card" }) {
	let T = o ?? a.length, E = u === "gone", O = u !== "saving" && u !== "failed" && !E && !!g, k = () => {
		g?.(n);
	}, A = c != null && c > 0 ? ke(c) : "", M = Le(s), N = ze(a, T), { state: P, label: F } = Ie[u], te = [
		...g && O ? [{
			"data-testid": `${w}-menu-open`,
			label: "Open",
			onSelect: k
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
		...b && O ? [{
			"data-testid": `${w}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], L = te.length ? [{
		items: te,
		"data-testid": `${w}-menu-items`
	}] : [];
	return /* @__PURE__ */ Y("div", {
		"data-testid": w,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", ee),
		children: [/* @__PURE__ */ Y("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ Y("button", {
				type: "button",
				onClick: O ? k : void 0,
				disabled: !O,
				"aria-label": O ? `Play ${r.toLowerCase()}` : `${r}: ${F.toLowerCase()}`,
				"data-testid": `${w}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", O ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ J("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${w}-thumbnail`
					}) : /* @__PURE__ */ J(Be, {
						participants: a,
						total: T,
						testId: w
					}),
					O && /* @__PURE__ */ J("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ J("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ J("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ J("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					A && /* @__PURE__ */ J("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${w}-duration`,
						children: A
					})
				]
			}), /* @__PURE__ */ Y("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ Y("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ Y("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ J("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${w}-title`,
								children: r
							}), h && /* @__PURE__ */ J("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${w}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ J(f, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ Y("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${w}-by`,
							children: ["by ", i]
						}),
						T > 0 && /* @__PURE__ */ Y("div", {
							className: "flex items-center gap-2",
							"data-testid": `${w}-people`,
							children: [/* @__PURE__ */ J(I, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: C
							}), /* @__PURE__ */ J("span", {
								className: "truncate text-xs text-text-tertiary",
								children: N
							})]
						}),
						/* @__PURE__ */ Y("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ J(D, {
									state: P,
									label: F,
									size: "sm",
									"data-testid": `${w}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ J(D, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${w}-transcript`
								}),
								u === "ready" && p && /* @__PURE__ */ J(D, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${w}-summary`
								}),
								M && /* @__PURE__ */ J("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${w}-when`,
									children: M
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ J(j, {
					trigger: /* @__PURE__ */ J("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: L,
					"data-testid": `${w}-menu`
				})]
			})]
		}), m && u !== "failed" && !E && /* @__PURE__ */ Y("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${w}-expiry`,
			children: [/* @__PURE__ */ Y("span", { children: ["Set to expire ", Re(m)] }), S && /* @__PURE__ */ J(t, {
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
function He(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function Ue(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function We(e, t) {
	let n = e.names && e.names.length > 0 ? He(e.names) : e.userIds.length > 0 ? He(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = Ue(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ge({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = We(t, n);
	return /* @__PURE__ */ Y("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ J("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ J("time", {
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
var Ke = {
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
}, qe = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function Je(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Ye(e) {
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
		default: return Ke[e.phase]?.label ?? "Running…";
	}
}
function Xe(e) {
	let t = !!e && (Ke[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = K(() => Date.now());
	return W(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var Ze = [
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
], Qe = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, $e = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, et = 6;
function tt(e) {
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
function Q(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = tt(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var nt = "shrink-0 whitespace-nowrap underline underline-offset-2", rt = `${nt} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function $(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function it(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function at(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${$(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${$(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${$(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${it(e.index)}`;
		case "deleteBlock": return `Removed block ${it(e.index)}`;
		case "appendMacro": return t ? `Added a ${$(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${it(e.index)}`;
		case "setDocumentType": return `Type: ${$(t, 40)}`;
		case "skip": return t ? $(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${$(t)}` : e.op;
	}
}
function ot(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function st(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function ct(e) {
	if (!e?.startedAt) return null;
	let t = ot(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? st(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var lt = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function ut({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = Ke[n.phase] ?? Ke.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ Y("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ J("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: Ye(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ J("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: Je(r)
			}),
			c > 0 && /* @__PURE__ */ Y("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ Y("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						ie(l),
						" / ",
						ie(c)
					]
				}), /* @__PURE__ */ J(F, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ J("button", {
				type: "button",
				onClick: () => i(t),
				className: e(nt, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ J("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ Y("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", qe[t.status] ?? qe.pending)
			}), /* @__PURE__ */ J("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function dt({ runId: r, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: d, onOpenRun: f, result: p, onOpenResult: m, onDecide: g, suggestion: _, onReview: v, onRetry: y, documentTitle: b, defaultExpanded: x = !1, loop: C, onOpenLab: ee, className: w, "data-testid": T = "agent-run-card" }) {
	let E = l?.phase ?? "received", [D, O] = K(x), k = Xe(C), A = E === "completed" ? l?.suggestion ?? _ : void 0, j = E === "completed" ? l?.review : void 0, M = !!A && !j, N = E === "completed" && l?.noop === !0, P = E === "completed" ? l?.result ?? p : void 0, F = P?.kind === "link" && P.label ? P.label : "Open", te = d && !(P?.kind === "document" && m), I = Qe[E], L = E === "failed" || E === "rejected", ne = L ? "danger" : j ? j.decision === "accept" ? "success" : "neutral" : N ? "warning" : E === "completed" ? A ? "warning" : "success" : E === "awaiting_approval" ? "warning" : "info", R = j ? "Reviewed" : M ? "Suggested" : N ? "No change" : $e[E], z = j ? j.byName ?? j.by : void 0, B = j ? `${j.decision === "accept" ? "Accepted" : "Rejected"} by ${z}` : void 0, re = E === "awaiting_approval", V = E === "failed" ? Q(l?.details?.error ?? l?.detail, c) : void 0, ie = E === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : re ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : V ? V.summary : B ?? l?.detail ?? (M && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : E === "received" ? "Received" : R), H = l?.details, U = H?.ops ?? [], ae = H?.steps ?? [], W = H?.document?.title || b || "Document", oe = !!H?.document || !!d, G = V ? V.technical : H?.error, q = ct(H), se = `${T}-details-${r}`, ce = !!(M && A && v || re && g || P && m || P?.kind === "link" && !m);
	return /* @__PURE__ */ Y("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", w),
		"data-testid": T,
		"data-phase": C ? C.phase : E,
		"data-mode": C ? "loop" : void 0,
		"data-run-id": r,
		"data-expanded": D ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || O((e) => !e);
		},
		children: [
			/* @__PURE__ */ Y("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ J(S, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ Y("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${T}-instruction`,
						children: [
							/* @__PURE__ */ J("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							a
						]
					}),
					C ? /* @__PURE__ */ J(n, {
						size: "xs",
						tone: Ke[C.phase]?.tone ?? "info",
						"data-testid": `${T}-phase`,
						children: Ke[C.phase]?.label ?? C.phase
					}) : /* @__PURE__ */ J(n, {
						size: "xs",
						tone: ne,
						"data-testid": `${T}-phase`,
						children: R
					}),
					/* @__PURE__ */ J(i, {
						size: "sm",
						"aria-label": D ? "Hide details" : "Show details",
						"aria-expanded": D,
						"aria-controls": D ? se : void 0,
						onClick: () => O((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${T}-toggle`,
						icon: /* @__PURE__ */ J(h, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", D && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			C ? /* @__PURE__ */ J(ut, {
				runId: r,
				loop: C,
				clock: k,
				onOpenLab: ee,
				testId: T
			}) : /* @__PURE__ */ Y("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ Y("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", ce && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ J("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${T}-steps`,
							children: Ze.map((t, n) => {
								let r = L ? n < I : n < I || n === I && E === "completed", i = n === I && E !== "completed" && !L, a = L && n === I;
								return /* @__PURE__ */ Y("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ J("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? N && n === I ? "bg-warning" : "bg-success" : i ? re ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ J("span", {
										className: "sr-only",
										children: a ? R : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ J("span", {
							className: e("min-w-0 flex-1 truncate", j && (j.decision === "accept" ? "text-success" : "text-text-tertiary"), E === "failed" && "text-danger", N && "text-warning-fg"),
							"data-testid": `${T}-detail`,
							"data-review": j?.decision,
							title: V ? V.summary : l?.detail,
							children: ie
						})]
					}),
					M && A && v && /* @__PURE__ */ Y("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${T}-review`,
						children: [/* @__PURE__ */ J(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(r, "accept", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
							}),
							"data-testid": `${T}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ J(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(r, "reject", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
							}),
							"data-testid": `${T}-reject-review`,
							children: "Reject"
						})]
					}),
					re && g && /* @__PURE__ */ Y("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${T}-decide`,
						children: [/* @__PURE__ */ J(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "approve"),
							"data-testid": `${T}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ J(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject"),
							"data-testid": `${T}-reject`,
							children: "Reject"
						})]
					}),
					E === "failed" && y && /* @__PURE__ */ J(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => y(r),
						"data-testid": `${T}-retry`,
						children: "Retry"
					}),
					P && m && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => m(P),
						className: e(nt, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": P.kind,
						children: F
					}),
					P?.kind === "link" && !m && /* @__PURE__ */ J("a", {
						href: P.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(nt, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": "link",
						children: F
					}),
					f && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: () => f(r),
						className: rt,
						"data-testid": `${T}-open-run`,
						children: "Open run"
					}),
					te && /* @__PURE__ */ J("button", {
						type: "button",
						onClick: d,
						className: rt,
						"data-testid": `${T}-open-document`,
						children: "Open document"
					})
				]
			}),
			D && /* @__PURE__ */ Y("div", {
				id: se,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${T}-details`,
				children: [
					oe && /* @__PURE__ */ Y("div", {
						className: "flex items-start gap-2",
						"data-testid": `${T}-details-document`,
						children: [
							/* @__PURE__ */ J(u, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ Y("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ J("span", {
									className: "block truncate font-medium text-text-primary",
									children: W
								}), H?.document?.snippet && /* @__PURE__ */ J("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${T}-details-snippet`,
									children: H.document.snippet
								})]
							}),
							d && /* @__PURE__ */ J(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: d,
								"data-testid": `${T}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					U.length > 0 && /* @__PURE__ */ Y("div", {
						"data-testid": `${T}-details-ops`,
						children: [
							/* @__PURE__ */ J("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ J("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: U.slice(0, et).map((e, t) => /* @__PURE__ */ J("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: at(e)
								}, t))
							}),
							U.length > et && /* @__PURE__ */ Y("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${T}-details-more-ops`,
								children: [
									"+",
									U.length - et,
									" more"
								]
							})
						]
					}),
					ae.length > 0 && /* @__PURE__ */ J("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${T}-details-steps`,
						children: ae.map((t) => /* @__PURE__ */ Y("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ J("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", lt[t.status] ?? lt.pending)
							}), /* @__PURE__ */ J("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					G && /* @__PURE__ */ Y("div", {
						"data-testid": `${T}-details-error-block`,
						children: [/* @__PURE__ */ J("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ J("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${T}-details-error`,
							children: G
						})]
					}),
					/* @__PURE__ */ Y("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							f && /* @__PURE__ */ J("button", {
								type: "button",
								onClick: () => f(r),
								className: e(nt, "hover:text-text-primary"),
								"data-testid": `${T}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							P && m && /* @__PURE__ */ J("button", {
								type: "button",
								onClick: () => m(P),
								className: e(nt, "font-medium text-info"),
								"data-testid": `${T}-details-open-result`,
								children: F
							}),
							q && /* @__PURE__ */ J("span", {
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
function ft(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = pt(e.result);
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
function pt(e) {
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
function mt(e, t) {
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
function ht(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function gt({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = oe(() => mt(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ J("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ Y("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: ht(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ J("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ J("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var _t = [
	"👍",
	"🎉",
	"❤️"
], vt = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function yt({ actions: t = [], label: n = "Message actions", quickReactions: r = _t, onReact: i, onOpenReactionPicker: a, onReply: c, onForward: l, onTogglePin: u, pinned: d = !1, onCopyLink: m, onEdit: h, onDelete: g, className: _, "data-testid": b = "message-actions" }) {
	let S = [], C = (e, t, n, r) => S.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (i) for (let e of r) C(`react-${e}`, `React ${e}`, /* @__PURE__ */ J("span", {
		"aria-hidden": !0,
		children: e
	}), () => i(e));
	a && C("more-reactions", "More reactions", /* @__PURE__ */ J(p, { size: 14 }), (e) => a(e.currentTarget)), c && C("reply", "Reply", /* @__PURE__ */ J(v, { size: 14 }), c), l && C("forward", "Forward to another conversation", /* @__PURE__ */ J(o, { size: 14 }), (e) => l(e.currentTarget)), u && C("pin", d ? "Unpin" : "Pin to channel", /* @__PURE__ */ J(f, { size: 14 }), u), m && C("copy-link", "Copy link to message", /* @__PURE__ */ J(s, { size: 14 }), m), h && C("edit", "Edit message", /* @__PURE__ */ J(y, { size: 13 }), h), g && C("delete", "Delete message", /* @__PURE__ */ J(x, { size: 13 }), g);
	for (let e of t) S.push({
		key: e.id,
		label: e.label,
		glyph: e.icon,
		disabled: e.disabled,
		onClick: (t) => e.onClick(t.currentTarget)
	});
	return S.length === 0 ? null : /* @__PURE__ */ J(te, {
		label: n,
		"data-testid": b,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", _),
		children: S.map((e) => /* @__PURE__ */ J("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${b}-${e.key}`,
			onClick: e.onClick,
			disabled: e.disabled,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${vt}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function bt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = K(e), [s, c] = K(!1), [l, u] = K(null), d = G(null);
	W(() => {
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
	return /* @__PURE__ */ Y("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ J(N, {
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
			/* @__PURE__ */ Y("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ J("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ J(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ J(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ J("p", {
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
function xt(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function St({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = xt(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ J("button", {
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ J("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ Y("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ J(q, { children: o ? /* @__PURE__ */ J("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ J("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ J("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ Y("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ J("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ J("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: U(t.size)
			})]
		})]
	}) : /* @__PURE__ */ J("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(Tt, {}), /* @__PURE__ */ Y("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ J("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ J("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: U(t.size)
				})]
			})] })
		})
	});
}
function Ct(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function wt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : U(o);
	return /* @__PURE__ */ Y("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ J("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ J(Tt, {}),
			/* @__PURE__ */ Y("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ Y("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ J("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ J("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ J("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ J("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ J("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ J("button", {
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
function Tt() {
	return /* @__PURE__ */ J("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ J("path", {
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
function Et({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = pe(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ Y("div", {
		role: "separator",
		"aria-label": me(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ J("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Dt(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Ot(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function kt(e) {
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
function At(e) {
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
var jt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Mt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => jt[e] ?? e)
	};
}
function Nt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function Pt(e) {
	return `${Nt(e)}:`;
}
function Ft(e, t) {
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
function It(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = Pt(t);
	if (n) {
		let t = Ft(n, r);
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
function Lt(e) {
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
function Rt(e) {
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
function zt(e) {
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
function Bt(e) {
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
function Vt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Ht(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Vt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Ut(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Wt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Gt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = Ut(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = Ut(r), i = Wt(r);
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
		let e = Ut(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = Ut(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Kt = 3, qt = 2, Jt = 3e5;
function Yt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Xt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(ft(e.metadata) || zt(e.metadata) || Rt(e.metadata) || kt(e.metadata) || Bt(e.metadata));
}
function Zt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Yt(r);
	if (!i || i !== Yt(n) || !Xt(n) || !Xt(r) || r.editedAt || fe(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Jt;
}
function Qt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function $t({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ Y("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ J("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function en(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function tn(e) {
	return e.displayName || e.userId;
}
function nn(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Yt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function rn(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function an({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, dock: u, currentUserId: d, reactionsFor: m, onToggleReaction: h, onReply: g, reply: _, onCancelReply: v, onForwardMessage: y, onCopyLink: b, onTogglePin: x, onEditMessage: S, onDeleteMessage: C, canEditMessage: T, canDeleteMessage: E, pinnedMessageIds: D, onJumpToMessage: A, highlightedMessageId: j, threaded: N = !1, postRhythm: F = "channel", alignOwnMessages: te = !0, documentEditors: I, documentUnavailable: L, callParticipants: ne, agentRunStatus: R, onOpenRun: ie, agentLoopStatus: U, onOpenLab: oe, onOpenResult: se, onDecideRun: ce, onReviewRun: le, onRetryRun: ue, onJoinCall: de, onOpenRecording: pe, onCopyRecordingLink: me, onShareRecording: he, onDownloadRecording: ge, onOpenRecordingTranscript: ve, onManageRecordingExpiry: ye, recordingStatus: be, onOpenDocument: xe, renderMessageReferences: Se, tone: Ce = "light", showHeader: Te, fill: De, flushComposer: ke = !1, contentAlign: Ae = "end", onLoadMore: je, hasMore: Me, loadingMore: Z = !1, onSendFiles: Ne, transfers: Pe = [], currentActor: Ie, onCancelTransfer: Le, attachmentSrc: Re, onOpenAttachment: ze, acceptFiles: Be, maxFileSize: He, onFileError: Ue, readReceipts: We, readReceiptsEnabled: Ke = !0, unreadFrom: qe, emojis: Je = V }) {
	let [Ye, Xe] = K(null), [Ze, Qe] = K(null), $e = G(null), [et, tt] = K(null), Q = Ce === "dark", nt = M(), rt = Te ?? !(nt?.hasHeader ?? !1), $ = De ?? nt?.fillsHeight ?? !1, [it, at] = K(""), ot = G(null), st = G(null), ct = !!je && Me !== !1, lt = G(null), ut = G(null), [pt, mt] = K(!1), ht = !!Ne && !a, _t = Ht(n, r), vt = N ? Gt(_t) : null, [xt, Tt] = K(() => /* @__PURE__ */ new Set());
	function jt(e) {
		Tt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Pt = G(void 0);
	if (qe !== void 0) {
		let e = Pt.current;
		if (e === void 0) Pt.current = qe;
		else {
			let t = Date.parse(qe), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Pt.current = qe);
		}
	}
	let Ft = Pt.current, Wt = Ft === void 0 ? -1 : Qt(vt ? vt.map((e) => Vt(e.root)) : _t.map((e) => Vt(e)), Ft), Jt = We !== void 0, Yt = We ?? [], Xt = Ke && d ? d : void 0, an = (() => {
		if (Xt) for (let e = _t.length - 1; e >= 0; --e) {
			let t = _t[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Xt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), sn = an && Xt ? en(Yt, Xt, an.timestamp) : [], cn = sn.length === 1 && !!Xt && nn(n, Yt, Xt) === 1;
	function ln() {
		if (!an) return null;
		if (sn.length === 0) return Jt ? /* @__PURE__ */ J("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", te ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ J("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = sn.map(tn), n = sn.slice(0, 3);
		return /* @__PURE__ */ Y("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", te ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: [
				sn.length > 1 && /* @__PURE__ */ J("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ J(P, {
						name: tn(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ J("span", {
					"data-testid": "chat-read-receipts-label",
					children: cn ? "Seen" : `Seen by ${sn.length}`
				}),
				/* @__PURE__ */ J("span", {
					style: O,
					children: cn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [un, dn] = K(0), [fn, pn] = K(!1), mn = G(!0), hn = G(n.length), gn = n.length + r.length + Pe.length, _n = G(null), [vn, yn] = K(""), bn = G(null), xn = G(!1), Sn = G(0);
	W(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!xn.current) {
			xn.current = !0, bn.current = t;
			return;
		}
		if (t === bn.current || (bn.current = t, d && e.userId === d)) return;
		Sn.current += 1;
		let r = Sn.current % 2 == 0 ? "​" : "";
		yn(Ot(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, d]);
	function Cn() {
		let e = ot.current;
		e && (e.scrollTop = e.scrollHeight, mn.current = !0, dn(0));
	}
	function wn() {
		let e = ot.current;
		if (!e) return;
		let t = Dt(e);
		mn.current = t, t && dn(0), pn(e.scrollTop > 8);
	}
	W(() => {
		let e = ot.current, t = hn.current, n = gn - t;
		if (hn.current = gn, !e) return;
		let r = _n.current;
		if (r && n > 0) {
			_n.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		mn.current ? (e.scrollTop = e.scrollHeight, dn(0), pn(e.scrollTop > 8)) : n > 0 && dn((e) => e + n);
	}, [gn]);
	function Tn() {
		let e = ot.current;
		e && (_n.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), je?.();
	}
	W(() => () => {
		st.current && clearTimeout(st.current);
	}, []);
	function En() {
		let e = it.trim();
		!e || a || (st.current && clearTimeout(st.current), st.current = null, o?.(!1), mn.current = !0, i(e), at(""));
	}
	function Dn(e) {
		!ht || e.length === 0 || (mn.current = !0, Ne?.(e));
	}
	function On(e) {
		if (!ht) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Dn(t));
	}
	function kn(e) {
		at((t) => t + e), mt(!1);
	}
	function An() {
		a || (o?.(!0), st.current && clearTimeout(st.current), st.current = setTimeout(() => o?.(!1), 2e3));
	}
	function jn(e) {
		An(), e.key === "Enter" && !a && it.trim() && En();
	}
	function Mn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Wt ? /* @__PURE__ */ J($t, { tone: Ce }) : null, l = !c && Zt(a, n), u = !o && fe(s, i) ? /* @__PURE__ */ J(Et, {
			timestamp: s,
			tone: Ce,
			className: r === 0 ? "pt-0" : void 0
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = ft(r.metadata);
			return /* @__PURE__ */ Y(ae, { children: [
				u,
				c,
				/* @__PURE__ */ J("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ J(_e, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: Ce,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ Y(q, { children: [
							i ? /* @__PURE__ */ J(dt, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: R?.(i.runId),
								onOpenDocument: xe && i.documentId ? () => xe(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: ie,
								result: i.result,
								onOpenResult: se,
								onDecide: ce,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: le,
								onRetry: ue,
								...rn(i, U, oe)
							}) : r.body == null ? /* @__PURE__ */ J(we, { text: r.content }) : /* @__PURE__ */ J("div", {
								"data-testid": "chat-local-message-body",
								className: "min-w-0",
								children: typeof r.body == "function" ? r.body() : r.body
							}),
							/* @__PURE__ */ J("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Q ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ J("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ J(t, {
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
		let { message: p } = n, _ = p.displayName ?? p.clientId.slice(0, 8), v = p.attachments ?? [], ee = p.metadata?.html, w = typeof ee == "string" ? ee : void 0, O = Lt(p.metadata), k = It(p.content, O, w), M = /* @__PURE__ */ J(we, {
			html: k.html,
			text: k.body
		}), N = kt(p.metadata), P = ft(p.metadata), F = Rt(p.metadata), z = zt(p.metadata), B = Bt(p.metadata), re = Mt(p.metadata), V = At(p.metadata), W = P ? /* @__PURE__ */ J(dt, {
			runId: P.runId,
			instruction: P.instruction || p.content.replace(/^\/doc\s*/i, ""),
			command: P.command,
			agentName: P.agentName,
			requestedBy: p.displayName,
			status: R?.(P.runId),
			onOpenDocument: xe && P.documentId ? () => xe(P.documentId) : void 0,
			documentTitle: P.documentTitle,
			onOpenRun: ie,
			result: P.result,
			onOpenResult: se,
			onDecide: ce,
			suggestion: P.suggestionKey ? {
				key: P.suggestionKey,
				...P.documentId ? { documentId: P.documentId } : {}
			} : void 0,
			onReview: le,
			onRetry: ue,
			...rn(P, U, oe)
		}) : z ? (() => {
			let e = be?.(z.recordingId), t = {
				...z,
				...e ?? {}
			};
			return /* @__PURE__ */ J(Ve, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? p.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!p.id && !!D?.has(p.id),
				onOpen: pe,
				onCopyLink: me,
				onShare: he,
				onDownload: ge,
				onOpenTranscript: ve,
				onManageExpiry: ye,
				onTogglePin: x ? () => x(p) : void 0
			});
		})() : F ? /* @__PURE__ */ J(Fe, {
			callId: F.callId,
			startedBy: (typeof p.metadata?.displayName == "string" ? p.metadata.displayName : void 0) ?? p.displayName,
			participants: ne?.(F.callId) ?? F.participants,
			live: F.live,
			durationMs: F.durationMs,
			startedAt: F.startedAt,
			outcome: F.outcome,
			recordingId: F.recordingId,
			onOpenRecording: pe,
			audioOnly: F.audioOnly,
			recorded: F.recorded,
			notRecordedReason: F.notRecordedReason,
			lobbyName: F.lobbyName,
			onJoin: de
		}) : N ? /* @__PURE__ */ J(Ee, {
			documentId: N.documentId,
			title: N.title || p.content,
			icon: N.icon,
			createdBy: N.createdBy ?? (typeof p.metadata?.displayName == "string" ? p.metadata.displayName : void 0) ?? p.displayName,
			editors: I?.(N.documentId) ?? [],
			onOpen: xe,
			unavailable: L?.(N.documentId)
		}) : v.length === 0 ? M : /* @__PURE__ */ Y(q, { children: [(p.content || w) && M, v.map((e) => /* @__PURE__ */ J(St, {
			attachment: e,
			src: Re?.(e),
			onOpen: ze
		}, e.id))] }), G = p.id ?? "", K = G && m ? m(G) : [], Te = p.metadata?.replyTo, De = !!o && !!Te && Te.messageId === o.rootId, ke = !!Te && !De, Ae = !!G && !!D?.has(G), je = !!d && p.userId === d, Me = p.metadata?.system === !0, Z = !!p.deletedAt || p.metadata?.deleted === !0, Ne = !!(P || z || F || N || B), Pe = !!(P || z || F || N || v.length > 0), Ie = !Z && !Me && !Ne && !!G, Le = Ie && (T ? T(p) : je), Be = Ie && (E ? E(p) : je), He = Le || Be, Ue = !!G && !Z && !Me && !Ne && v.length === 0 && !!p.content.trim(), We = Le && !!S && Ye === G, Ke = /* @__PURE__ */ Y(q, { children: [
			ke && Te && /* @__PURE__ */ J(H, {
				quote: Te,
				onJump: A,
				className: "mb-1"
			}),
			O && /* @__PURE__ */ Y("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Nt(O), O.timestamp ? X(O.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ J("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					k.stripped ? Nt(O) : "Forwarded"
				]
			}),
			Ae && /* @__PURE__ */ Y("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ J(f, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			Z ? /* @__PURE__ */ J("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : We ? /* @__PURE__ */ J(bt, {
				initialText: p.content,
				onSave: async (e) => {
					await S(p, e), Xe(null);
				},
				onCancel: () => Xe(null)
			}) : W,
			!Z && Se?.(p),
			!Z && V.length > 0 && /* @__PURE__ */ J("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: V.map((e) => /* @__PURE__ */ J(Oe, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: xe,
					unavailable: L?.(e.id)
				}, e.id))
			}),
			!Z && re && /* @__PURE__ */ Y("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					re.labels.length > 0 ? `Too large to send: ${re.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Z && K.length > 0 && d && h && /* @__PURE__ */ J(gt, {
				reactions: K,
				currentUserId: d,
				onToggle: (e) => h(G, e)
			})
		] });
		return B ? /* @__PURE__ */ Y(ae, { children: [
			u,
			c,
			/* @__PURE__ */ J(Ge, {
				membership: B,
				fallbackText: p.content,
				timestamp: p.timestamp,
				"data-testid": "membership-notice"
			})
		] }, p.id ?? r) : /* @__PURE__ */ Y(ae, { children: [
			u,
			c,
			/* @__PURE__ */ J("div", {
				"data-testid": "chat-message",
				"data-message-id": G || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? X(p.timestamp) : void 0,
				className: e("group relative rounded-md px-2 transition-colors hover:bg-surface-hover", G && G === j && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ J(_e, {
					actionsLayout: "menu",
					className: l ? "py-0.5" : void 0,
					author: _,
					content: Ke,
					timestamp: l ? "" : p.timestamp,
					editedAt: Z ? void 0 : p.editedAt,
					avatarUrl: p.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: Ce,
					mine: je && te,
					contentLayout: Pe ? "block" : "inline",
					actions: G && !Z && !We && (h || He || Ue && y || !Me && (g || x || b)) ? /* @__PURE__ */ J(yt, {
						className: "max-w-full flex-wrap",
						onReact: h ? (e) => h(G, e) : void 0,
						onOpenReactionPicker: h ? (e) => {
							$e.current = e, Qe(G);
						} : void 0,
						onReply: g && !Me ? () => g(o?.rootMessage ?? p) : void 0,
						onForward: y && Ue ? (e) => y(p, e) : void 0,
						onCopyLink: b && !Me && G ? () => b(p) : void 0,
						onTogglePin: x && !Me ? () => x(p) : void 0,
						pinned: !!p.id && !!D?.has(p.id),
						onEdit: Le && S ? () => Xe(G) : void 0,
						onDelete: Be && C ? () => tt(G) : void 0
					}) : void 0
				})
			}),
			!!an && G === an.id && ln()
		] }, p.id ?? r);
	}
	function Nn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Pn(e) {
		if (!g || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !Bt(t.metadata)) return t;
	}
	function Fn(t, n, r) {
		let i = Vt(r?.root), a = F === "chat", o = r && r.replies.length === 0 && (a || !Pn(r.root)) ? r.root : void 0, s = Mn(t.root, n, i, o), c = Vt(t.root) ?? "", l = !a && n > 0 && n !== Wt && !fe(c, i) ? /* @__PURE__ */ J("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Q ? "border-white/10" : "border-border-subtle")
		}) : null, u = t.replies.length > 0 ? Pn(t.root) : null;
		if (t.replies.length === 0 && !u) return l ? /* @__PURE__ */ Y(ae, { children: [l, s] }, `post:${Ut(t.root) ?? n}`) : s;
		let d = Ut(t.root) ?? "", f = t.root.kind === "message" ? t.root.message : void 0, p = !!d && t.replies.length > Kt, m = !p || xt.has(d), h = m ? t.replies : t.replies.slice(0, qt), _ = t.replies.length - h.length, v = [...new Set(t.replies.slice(h.length).map(Nn))].slice(0, 3);
		return /* @__PURE__ */ Y(ae, { children: [l, /* @__PURE__ */ Y("div", {
			"data-testid": "chat-thread",
			"data-thread-root": d || void 0,
			className: "group/post",
			children: [
				s,
				t.replies.length > 0 && /* @__PURE__ */ Y("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Q ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => Mn(e, t, void 0, h[t - 1], {
						rootId: d,
						...f ? { rootMessage: f } : {}
					})), p && /* @__PURE__ */ Y("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => jt(d),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && v.length > 0 && /* @__PURE__ */ J("span", {
							className: "flex items-center gap-0.5",
							children: v.map((e) => /* @__PURE__ */ J(P, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${_} more ${_ === 1 ? "reply" : "replies"}`]
					})]
				}),
				u && /* @__PURE__ */ J("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ J("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Nn(t.root)}`,
						onClick: () => g?.(u),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${d || n}`);
	}
	let In = /* @__PURE__ */ Y("div", {
		"data-testid": "chat-panel",
		className: e($ ? e("flex h-full min-h-0 flex-col", ke && l ? "px-0 pb-0" : "px-[var(--ui-content-gutter,1rem)] pb-3") : e("border rounded mt-4", ke && l ? "px-0 pt-3 pb-0" : "p-3", Q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			rt && /* @__PURE__ */ Y("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", ke && l && "mx-[var(--ui-content-gutter,1rem)]", Q ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ J("span", {
				style: O,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: vn
			}),
			/* @__PURE__ */ Y("div", {
				className: e("relative flex flex-col mb-2", $ ? "min-h-0 flex-1" : "", ke && l && "mx-[var(--ui-content-gutter,1rem)]"),
				children: [/* @__PURE__ */ J("div", {
					ref: ot,
					onScroll: wn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", fn && "fade-top", $ ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ Y("div", {
						"data-chat-content": !0,
						className: e("pb-[var(--ui-chat-gap,1rem)]", Ae === "end" && "mt-auto"),
						children: [
							ct && n.length > 0 && /* @__PURE__ */ J("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ J("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Tn,
									disabled: Z,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Z ? "Loading…" : "Load earlier messages"
								})
							}),
							_t.length === 0 ? c ?? /* @__PURE__ */ J("div", {
								className: e("text-sm", Q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : vt ? vt.map((e, t) => Fn(e, t, vt[t - 1])) : _t.map((e, t) => Mn(e, t, Vt(_t[t - 1]), _t[t - 1])),
							h && /* @__PURE__ */ J(B, {
								open: Ze !== null,
								triggerRef: $e,
								emojis: Je,
								onSelect: (e) => {
									Ze && h(Ze, e), Qe(null);
								},
								onClose: () => Qe(null)
							}),
							C && /* @__PURE__ */ J(ee, {
								open: et !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => tt(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === et);
									tt(null), e && C(e);
								}
							}),
							Pe.map((e) => /* @__PURE__ */ J(_e, {
								author: e.actor,
								timestamp: "",
								tone: Ce,
								content: /* @__PURE__ */ J(wt, {
									transfer: e,
									mine: Ct(e, d, Ie),
									onCancel: Le
								})
							}, e.transferId))
						]
					})
				}), un > 0 && /* @__PURE__ */ Y("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Cn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						un,
						" new message",
						un === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ J(k, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", ke && l && "mx-[var(--ui-content-gutter,1rem)]", Q ? "text-white/50" : "text-text-secondary")
			}),
			u != null && u !== !1 && /* @__PURE__ */ J("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: u
			}),
			l ? /* @__PURE__ */ J("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? An : void 0,
				children: l
			}) : /* @__PURE__ */ Y("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [_ && /* @__PURE__ */ J(H, {
					quote: _,
					onDismiss: v,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ Y("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						Ne && /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J("button", {
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !ht,
							onClick: () => lt.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ J(on, {})
						}), /* @__PURE__ */ J(z, {
							ref: lt,
							multiple: !0,
							accept: Be,
							onFiles: (e) => {
								let t = He ? e.filter((e) => e.size > He) : [];
								t.length > 0 && Ue?.(`Skipped ${t.length} file(s) over the size limit.`), Dn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ J("button", {
							ref: ut,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": pt,
							title: "Insert emoji",
							disabled: a,
							onClick: () => mt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ J(p, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ J(B, {
							open: pt,
							onSelect: kn,
							onClose: () => mt(!1),
							triggerRef: ut,
							emojis: Je
						}),
						/* @__PURE__ */ J(w, {
							size: "sm",
							value: it,
							onChange: (e) => at(e.target.value),
							onKeyDown: jn,
							onPaste: On,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ J(t, {
							variant: "primary",
							size: "sm",
							onClick: En,
							disabled: a || !it.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return Ne ? /* @__PURE__ */ J(re, {
		onFiles: Dn,
		accept: Be,
		maxSize: He,
		onError: Ue,
		disabled: a,
		className: $ ? "flex h-full min-h-0 flex-col" : void 0,
		children: In
	}) : In;
}
function on() {
	return /* @__PURE__ */ J("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ J("path", {
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
function sn(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function cn({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ Y("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ Y("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ J("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ J("div", { children: e.map((e) => {
			let n = ce(sn(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = le(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ Y("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ J("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ J("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ J("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ J("span", {
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
var ln = "min-w-0 truncate", un = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function dn({ leading: t, title: n, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ J("time", {
		dateTime: a,
		title: o,
		className: un,
		children: i
	}) : /* @__PURE__ */ J("span", {
		title: o,
		className: un,
		children: i
	}) : null, _ = /* @__PURE__ */ Y("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ Y("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ J("span", {
				"data-line": "primary",
				title: n,
				className: e(ln, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), g]
		}), /* @__PURE__ */ J("span", {
			"data-line": "secondary",
			title: s,
			className: e(ln, "text-[11px] leading-snug", c ? r[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ Y("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ Y("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ J("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ J("button", {
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ J("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ J("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function fn(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function pn({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ J("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ J("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function mn({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ J(pn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ J(E, {
			icon: /* @__PURE__ */ J(f, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${X(e.sentAt)} · pinned ${X(e.pinnedAt)}` : X(r) : void 0;
			return /* @__PURE__ */ J(dn, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ J(P, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: fn(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ J("button", {
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
function hn({ file: e, thumbnailSrc: t, onJump: n }) {
	let r = t?.(e.attachment) ?? e.attachment.preview, i = xt(e.attachment);
	return /* @__PURE__ */ J(dn, {
		"data-testid": "channel-file",
		"data-kind": "file",
		leading: i && r ? /* @__PURE__ */ J("img", {
			src: r,
			alt: "",
			className: "h-8 w-8 rounded object-cover"
		}) : /* @__PURE__ */ J("span", {
			"aria-hidden": !0,
			className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
			children: /* @__PURE__ */ J(d, {})
		}),
		title: e.attachment.name,
		meta: [e.author, U(e.attachment.size)].filter(Boolean).join(" · "),
		timestamp: fn(e.sentAt),
		timestampIso: e.sentAt,
		timestampTitle: e.sentAt ? X(e.sentAt) : void 0,
		onJump: n ? () => n(e.messageId) : void 0,
		jumpLabel: `Go to the message with ${e.attachment.name}`
	});
}
function gn({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ J(pn, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ J(E, {
			icon: /* @__PURE__ */ J(d, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => /* @__PURE__ */ J(hn, {
			file: e,
			thumbnailSrc: t,
			onJump: n
		}, `${e.messageId}:${e.attachment.id}`))
	});
}
function _n({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ J(pn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ J(E, {
			icon: /* @__PURE__ */ J(m, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ J(dn, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ J(P, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: fn(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? X(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function vn(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function yn(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function bn({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ J(pn, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ J(E, {
			icon: /* @__PURE__ */ J(b, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ J(dn, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ J("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ J("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ J(b, {})
				}),
				title: [fn(e.startedAt), vn(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : yn(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function xn(e, t) {
	let n = e ? Date.parse(e) : NaN, r = t ? Date.parse(t) : NaN;
	return Number.isNaN(n) && Number.isNaN(r) ? 0 : Number.isNaN(n) ? 1 : Number.isNaN(r) ? -1 : r - n;
}
function Sn({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, files: a, thumbnailSrc: o, onJumpToFile: s, className: c, "data-testid": d = "channel-documents-panel" }) {
	let f = (t, n, r, i, a = !1) => /* @__PURE__ */ Y("button", {
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ J("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), p = (e) => [r && f("create", r, /* @__PURE__ */ J("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && f("create-whiteboard", i, /* @__PURE__ */ J(l, { size: 15 }), "New whiteboard", e)].filter(Boolean), m = !!(r || i), h = a ? [...t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	})), ...a.map((e) => ({
		kind: "file",
		file: e,
		at: e.sentAt
	}))].sort((e, t) => xn(e.at, t.at)) : t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	}));
	return /* @__PURE__ */ Y("div", {
		className: e("min-h-0 overflow-y-auto p-2", c),
		"data-testid": d,
		children: [m && h.length > 0 && /* @__PURE__ */ Y("div", {
			className: "mb-1 flex flex-col",
			children: [r && f("create", r, /* @__PURE__ */ J("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && f("create-whiteboard", i, /* @__PURE__ */ J(l, { size: 15 }), "New whiteboard in this conversation")]
		}), h.length === 0 ? /* @__PURE__ */ J(E, {
			icon: /* @__PURE__ */ J(u, { size: 40 }),
			title: a ? "Nothing here yet" : "No documents yet",
			description: a ? "Documents, whiteboards and files shared here stay with this conversation." : "Documents and whiteboards started here stay with this conversation.",
			action: m ? /* @__PURE__ */ J("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: p(!0)
			}) : void 0
		}) : /* @__PURE__ */ J("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: h.map((e) => e.kind === "file" ? /* @__PURE__ */ J(hn, {
				file: e.file,
				thumbnailSrc: o,
				onJump: s
			}, `file:${e.file.messageId}:${e.file.attachment.id}`) : /* @__PURE__ */ J(dn, {
				"data-testid": "channel-document",
				"data-kind": "document",
				leading: /* @__PURE__ */ J("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.doc.icon || /* @__PURE__ */ J(u, {})
				}),
				title: e.doc.title || "Untitled",
				meta: [e.doc.createdBy, e.doc.activeEditors ? `${e.doc.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: fn(e.doc.updatedAt),
				timestampIso: e.doc.updatedAt,
				timestampTitle: e.doc.updatedAt ? X(e.doc.updatedAt) : void 0,
				onJump: n ? () => n(e.doc.documentId) : void 0,
				jumpLabel: `Open ${e.doc.title || "this document"}`
			}, e.doc.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var Cn = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], wn = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function Tn({ name: t, description: n, online: r, avatarUrl: o, features: s = Cn, children: c, canvas: l, members: u, memberCount: d, files: f = [], thumbnailSrc: p, documents: m = [], onOpenDocument: h, onRename: g, onCreateDocument: _, onCreateWhiteboard: v, pins: y = [], onUnpin: x, mentions: S = [], onOpenMention: ee, recordings: w = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: j, watchHint: M, watchViewerCount: N, callInProgress: P = !1, headerActions: F, headerClassName: te, view: I, onViewChange: L, className: ne, "data-testid": R = "conversation-surface" }) {
	let z = new Set(s), B = z.has("files") && z.has("documents"), [re, V] = K("chat"), ie = I ?? re, H = B && ie === "files" ? "documents" : ie, U = z.has(H) ? H : s[0] ?? "chat", ae = (e) => {
		I === void 0 && V(e), L?.(e);
	}, W = (e) => e || void 0, oe = s.filter((e) => wn[e] && !(B && e === "files")).map((e) => ({
		id: e,
		label: wn[e],
		badge: e === "files" ? W(f.length) : e === "documents" ? W(m.length + (B ? f.length : 0)) : e === "pins" ? W(y.length) : e === "members" ? d == null ? void 0 : W(d) : e === "calls" ? W(w.length) : e === "mentions" ? W(S.filter((e) => e.unread).length) : void 0
	})), G = (e) => {
		ae("chat"), E?.(e);
	};
	return /* @__PURE__ */ Y("section", {
		className: e("flex min-w-0 flex-col", ne),
		"data-testid": R,
		children: [
			/* @__PURE__ */ J(A, {
				className: te,
				name: t,
				onRename: g,
				description: n,
				online: r,
				avatarUrl: o,
				"data-testid": `${R}-header`,
				tabs: oe.length > 1 ? /* @__PURE__ */ J(C, {
					variant: "underline",
					size: "md",
					"aria-label": "Views of this conversation",
					getItemTestId: (e) => `${R}-tab-${e.id}`,
					value: U,
					onValueChange: (e) => ae(e),
					items: oe
				}) : void 0,
				actions: D || k || F ? /* @__PURE__ */ Y(q, { children: [
					D && (O ? /* @__PURE__ */ J(i, {
						"aria-label": P ? "Join the call" : "Start a call",
						title: P ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ J(a, { size: 16 })
					}) : /* @__PURE__ */ Y(q, { children: [/* @__PURE__ */ J(i, {
						"aria-label": P ? "Join the call with audio" : "Start an audio call",
						title: P ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ J(a, { size: 16 })
					}), /* @__PURE__ */ J(i, {
						"aria-label": P ? "Join the call with video" : "Start a video call",
						title: P ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ J(b, { size: 16 })
					})] })),
					k && /* @__PURE__ */ J(En, {
						testId: `${R}-watch`,
						label: j,
						hint: M,
						viewerCount: N,
						onClick: k
					}),
					F
				] }) : void 0
			}),
			z.has("files") && U === "files" && /* @__PURE__ */ J(gn, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: p,
				onJump: E ? G : void 0
			}),
			z.has("documents") && U === "documents" && /* @__PURE__ */ J(Sn, {
				className: "min-h-0 flex-1",
				documents: m,
				onOpen: h,
				onCreate: _,
				onCreateWhiteboard: v,
				...B ? {
					files: f,
					thumbnailSrc: p,
					onJumpToFile: E ? G : void 0
				} : {}
			}),
			z.has("pins") && U === "pins" && /* @__PURE__ */ J(mn, {
				className: "min-h-0 flex-1",
				pins: y,
				onUnpin: x,
				onJump: E ? G : void 0
			}),
			z.has("members") && U === "members" && /* @__PURE__ */ J("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-members`,
				children: u
			}),
			z.has("mentions") && U === "mentions" && /* @__PURE__ */ J(_n, {
				className: "min-h-0 flex-1",
				mentions: S,
				onJump: ee ? (e, t) => {
					ae("chat"), ee(e, t);
				} : void 0
			}),
			z.has("calls") && U === "calls" && /* @__PURE__ */ J(bn, {
				className: "min-h-0 flex-1",
				recordings: w,
				onOpen: T
			}),
			z.has("chat") && /* @__PURE__ */ Y("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: U !== "chat",
				children: [l && /* @__PURE__ */ J("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${R}-canvas`,
					children: l
				}), /* @__PURE__ */ J("div", {
					className: "min-h-0 flex-1",
					children: c
				})]
			})
		]
	});
}
function En({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ Y(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Dn,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ J(c, { size: 14 }),
			/* @__PURE__ */ J("span", { children: o }),
			s && /* @__PURE__ */ J("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Dn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { Te as $, mt as A, Ge as B, St as C, yt as D, bt as E, ct as F, Fe as G, Ue as H, Ye as I, ke as J, Pe as K, Q as L, dt as M, ft as N, gt as O, pt as P, Ee as Q, at as R, Et as S, xt as T, Ve as U, We as V, ze as W, Ne as X, Me as Y, Oe as Z, Lt as _, _n as a, pe as at, Mt as b, vn as c, fe as ct, an as d, le as dt, we as et, Rt as f, Nt as g, Pt as h, gn as i, de as it, lt as j, ht as k, dn as l, ue as lt, At as m, Tn as n, ge as nt, bn as o, me as ot, kt as p, Ae as q, Sn as r, he as rt, mn as s, X as st, Cn as t, _e as tt, cn as u, ce as ut, Bt as v, wt as w, It as x, zt as y, Je as z };
