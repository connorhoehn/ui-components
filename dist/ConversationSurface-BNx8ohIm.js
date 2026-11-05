import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { n, p as r } from "./overlayStack-DxIDMUs-.js";
import { t as i } from "./IconButton-Bf5Wy0tS.js";
import { Dt as a, E as o, J as s, S as c, Tt as l, X as u, et as d, gt as f, i as p, it as m, m as h, tt as g } from "./Icons-CqVFbuiZ.js";
import { g as _ } from "./MediaIcons-_ai5Til2.js";
import { i as v } from "./Text-BAAQrepu.js";
import { t as y } from "./ConfirmDialog-DrXzW1zj.js";
import { t as b } from "./Input-Brvp1kPv.js";
import { t as x } from "./InlinePopover-Dx8-r-XU.js";
import { t as S } from "./EmptyState-pOG782nO.js";
import { t as C } from "./StatusPill-cLjwbEQM.js";
import { a as w, n as ee, r as T, t as E } from "./MessageActionBar-D5z_lwFP.js";
import { t as D } from "./DropdownMenu-DP3rRjEd.js";
import { n as O } from "./DockedPanelContext-pH9A5z1h.js";
import { t as k } from "./Textarea-CvdLeuO_.js";
import { t as A } from "./Avatar-DkkMISPQ.js";
import { t as j } from "./DotMeter-B6ZDgLU7.js";
import { t as M } from "./PresenceAvatars-DqCOZ057.js";
import { a as te, d as N, i as P } from "./railType-AsIPWdQ5.js";
import { i as F, n as I, r as L, t as ne } from "./ReactionPickerPopover-wsdZyMqU.js";
import { n as re } from "./useComputeProjects-ZSazDRet.js";
import { t as R } from "./QuoteBlock-NVq2JJEM.js";
import { t as z } from "./formatBytes-05ivRSJY.js";
import { Fragment as B, useEffect as V, useMemo as ie, useRef as H, useState as U } from "react";
import { Fragment as W, jsx as G, jsxs as K } from "react/jsx-runtime";
//#region src/utils/identity.ts
var ae = [
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
	return ae[Math.abs(t) % ae.length];
}
function oe(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/RailSectionHeader.tsx
function J({ label: t, actions: n = [], presentational: r = !0, collapsed: i = !1, onToggleCollapse: a, controls: o, toggleId: s, collapsedCount: c = 0, count: l, dark: u = !1, className: d, "data-testid": f = "rail-section-header" }) {
	let p = a !== void 0, h = e("min-w-0 flex-1 truncate", P, u ? "text-white/40" : te);
	return /* @__PURE__ */ K("div", {
		"data-testid": f,
		className: e("flex items-center gap-1 px-2 pb-1 pt-3", d),
		children: [
			p ? /* @__PURE__ */ K("button", {
				"data-ui-part": "",
				type: "button",
				id: s,
				"aria-expanded": !i,
				"aria-controls": o,
				onClick: () => a(!i),
				"data-testid": `${f}-toggle`,
				className: e("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "hover:text-white" : "hover:text-text-primary"),
				children: [
					/* @__PURE__ */ G(N, {
						open: !i,
						className: u ? "text-white/40" : "text-text-secondary"
					}),
					/* @__PURE__ */ G("span", {
						className: h,
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
				className: h,
				children: t
			}),
			typeof l == "number" && /* @__PURE__ */ G("span", {
				"aria-label": `${l} items`,
				"data-testid": `${f}-count`,
				"data-shape": "plain",
				className: e("shrink-0 pr-1", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", u && "text-white/60"),
				children: l
			}),
			n.map((t) => /* @__PURE__ */ G("button", {
				"data-ui-part": "",
				type: "button",
				title: t.label,
				"aria-label": t.label,
				onClick: (e) => {
					i && a?.(!1), t.onClick(e.currentTarget);
				},
				"data-testid": t["data-testid"],
				className: e("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
				children: t.icon ?? /* @__PURE__ */ G(m, { size: 13 })
			}, t.label))
		]
	});
}
//#endregion
//#region src/components/social/dayBoundary.ts
function se(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function ce(e, t) {
	let n = se(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = se(t);
	return r ? n !== r : !1;
}
function le(e, t = /* @__PURE__ */ new Date()) {
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
function ue(e) {
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
function de(e, t = /* @__PURE__ */ new Date()) {
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
function fe(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function pe({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: c = !1, footer: l, actions: u, actionsLayout: d = "inline", tone: f = "light", editedAt: p, contentLayout: m = "inline", className: h }) {
	let g = f === "dark", _ = fe(r), [v, y] = U(!1), b = H(null), S = !o || !!_, C = !!u && (d === "menu" || !S);
	V(() => {
		C || y(!1);
	}, [C]);
	let w = /* @__PURE__ */ G("button", {
		"data-ui-part": "",
		ref: b,
		type: "button",
		"aria-label": "Message actions",
		"aria-expanded": v,
		"aria-haspopup": "dialog",
		onClick: () => y((e) => !e),
		"data-testid": "message-row-actions-toggle",
		className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary aria-expanded:opacity-100",
		children: /* @__PURE__ */ G(s, { size: 16 })
	});
	return /* @__PURE__ */ K("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		className: e("flex items-start gap-2 py-1", c && "flex-row-reverse", h),
		children: [
			/* @__PURE__ */ G("div", {
				className: "w-5 shrink-0 mt-0.5",
				children: C && !S ? w : !a && /* @__PURE__ */ G(A, {
					name: t,
					src: i,
					size: 20
				})
			}),
			/* @__PURE__ */ K("div", {
				className: e("flex grow flex-col min-w-0", c && "items-end"),
				children: [
					S && /* @__PURE__ */ K("div", {
						"data-testid": "message-row-header",
						className: e(u && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", C && "flex-nowrap", u && c && "flex-row-reverse"),
						children: [S && /* @__PURE__ */ K("div", {
							className: e("flex items-baseline gap-2 min-w-0 max-w-full", u && (C ? "flex-1" : "shrink-0"), c && "flex-row-reverse"),
							children: [
								!o && /* @__PURE__ */ G("span", {
									"data-testid": "message-row-author",
									className: e("text-xs font-semibold truncate", g ? "text-white/70" : "text-text-secondary"),
									children: t
								}),
								_ && /* @__PURE__ */ G("time", {
									"data-testid": "message-row-time",
									dateTime: r,
									title: Y(r),
									className: e("text-xs shrink-0", g ? "text-white/40" : "text-text-tertiary"),
									children: _
								}),
								p && /* @__PURE__ */ G("span", {
									"data-testid": "message-row-edited",
									title: `Edited ${Y(p)}`,
									className: e("text-[11px] shrink-0", g ? "text-white/40" : "text-text-tertiary"),
									children: "(edited)"
								})
							]
						}), C ? w : u && /* @__PURE__ */ G("div", {
							"data-testid": "message-row-actions",
							className: "max-w-full shrink-0",
							children: u
						})]
					}),
					/* @__PURE__ */ G("span", {
						"data-testid": "message-row-content",
						className: e("text-sm min-w-0 break-words whitespace-pre-wrap", g ? "text-white/90" : "text-text-primary", c && m === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", c && m === "inline" && (g ? "bg-white/15" : "bg-primary-bg"), m === "block" && "w-full max-w-[30rem]"),
						children: n
					}),
					l && /* @__PURE__ */ G("div", {
						"data-testid": "message-row-footer",
						className: e("mt-1", c && "self-end"),
						children: l
					})
				]
			}),
			C && /* @__PURE__ */ G(x, {
				trigger: b,
				open: v,
				onClose: () => y(!1),
				placement: c ? "bottom-end" : "bottom-start",
				"aria-label": "Message actions",
				className: "min-w-0 max-w-[calc(100vw-16px)] p-0",
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var me = /* @__PURE__ */ new Set([
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
]), he = /^(https?:|mailto:)/i;
function ge(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || he.test(t) ? t : null;
}
function _e(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => _e(e, `${t}-${n}`));
	if (!me.has(n.tagName)) return /* @__PURE__ */ G("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ G("br", {}, t);
		case "A": {
			let e = ge(n.getAttribute("href"));
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
var ve = /```([\s\S]*?)```|`([^`\n]+)`/g;
function ye(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (ve.lastIndex = 0; (r = ve.exec(e)) !== null;) {
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
function be({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = ie(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => _e(e, `n${t}`));
	}, [t]), o = ie(() => ye(n ?? ""), [n]);
	return /* @__PURE__ */ G("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function xe(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function Se({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: l, "data-testid": u = "document-activity-card" }) {
	let d = !s && a.length > 0;
	return /* @__PURE__ */ K("div", {
		"data-testid": u,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", l),
		children: [
			/* @__PURE__ */ G("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ G(c, { size: 18 })
			}),
			/* @__PURE__ */ K("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ G("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ G("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${u}-unavailable` : void 0,
					children: s ? xe(s) : d ? `${Ce(a)} editing now` : i ? `Created by ${i}` : "Document"
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
				"data-ui-part": "",
				type: "button",
				"data-testid": `${u}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function Ce(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function we({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let l = a ? void 0 : i, u = a ? xe(a) : null;
	return /* @__PURE__ */ K("button", {
		"data-ui-part": "",
		type: "button",
		onClick: l ? () => l(t) : void 0,
		disabled: !l,
		title: u ? `${n} — ${u}` : n,
		"data-testid": s,
		"data-document-id": t,
		"data-unavailable": a,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", l ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a && "border-dashed text-text-tertiary opacity-70", o),
		children: [
			r ? /* @__PURE__ */ G("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ G(c, {
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
function Te(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function Ee(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function De(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Oe(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function ke(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function Ae(e, t) {
	let n = ke(e), [r, i] = U(() => Date.now());
	return V(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function je(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Me({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = Ae(o, _), y = !_ && typeof a == "number" ? Te(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = je(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = Ee(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : Ee(r, !1)), /* @__PURE__ */ K("div", {
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
								children: v === null ? "Live" : `Live · ${Oe(v)}`
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
						children: De(f, p)
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
				"data-ui-part": "",
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ G("button", {
				"data-ui-part": "",
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
var Ne = {
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
function Pe(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Fe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function X(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Ie({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ K("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ G("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ G(A, {
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
function Le({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: m = !1, onOpen: h, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: w, className: ee, "data-testid": T = "recording-activity-card" }) {
	let E = o ?? a.length, O = u === "gone", k = u !== "saving" && u !== "failed" && !O && !!h, A = () => {
		h?.(n);
	}, j = c != null && c > 0 ? Te(c) : "", te = Pe(s), N = X(a, E), { state: P, label: F } = Ne[u], I = [
		...h && k ? [{
			"data-testid": `${T}-menu-open`,
			label: "Open",
			onSelect: A
		}] : [],
		...x && d ? [{
			"data-testid": `${T}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		..._ && !O ? [{
			"data-testid": `${T}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !O ? [{
			"data-testid": `${T}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...y && !O ? [{
			"data-testid": `${T}-menu-pin`,
			label: m ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && k ? [{
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
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", ee),
		children: [/* @__PURE__ */ K("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ K("button", {
				"data-ui-part": "",
				type: "button",
				onClick: k ? A : void 0,
				disabled: !k,
				"aria-label": k ? `Play ${r.toLowerCase()}` : `${r}: ${F.toLowerCase()}`,
				"data-testid": `${T}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", k ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ G("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${T}-thumbnail`
					}) : /* @__PURE__ */ G(Ie, {
						participants: a,
						total: E,
						testId: T
					}),
					k && /* @__PURE__ */ G("span", {
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
					j && /* @__PURE__ */ G("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${T}-duration`,
						children: j
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
							}), m && /* @__PURE__ */ G("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${T}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ G(g, { size: 12 })
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
								onUserClick: w
							}), /* @__PURE__ */ G("span", {
								className: "truncate text-xs text-text-tertiary",
								children: N
							})]
						}),
						/* @__PURE__ */ K("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ G(C, {
									state: P,
									label: F,
									size: "sm",
									"data-testid": `${T}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ G(C, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${T}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ G(C, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${T}-summary`
								}),
								te && /* @__PURE__ */ G("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${T}-when`,
									children: te
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ G(D, {
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
		}), p && u !== "failed" && !O && /* @__PURE__ */ K("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${T}-expiry`,
			children: [/* @__PURE__ */ K("span", { children: ["Set to expire ", Fe(p)] }), S && /* @__PURE__ */ G(t, {
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
function Re(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function ze(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Be(e, t) {
	let n = e.names && e.names.length > 0 ? Re(e.names) : e.userIds.length > 0 ? Re(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = ze(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ve({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Be(t, n);
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
var He = {
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
}, Ue = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function We(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Ge(e) {
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
		default: return He[e.phase]?.label ?? "Running…";
	}
}
function Ke(e) {
	let t = !!e && (He[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = U(() => Date.now());
	return V(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var qe = [
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
], Je = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Ye = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Xe = 6;
function Ze(e) {
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
function Qe(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = Ze(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var $e = "shrink-0 whitespace-nowrap underline underline-offset-2", et = `${$e} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function tt(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function nt(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function rt(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${tt(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${tt(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${tt(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${nt(e.index)}`;
		case "deleteBlock": return `Removed block ${nt(e.index)}`;
		case "appendMacro": return t ? `Added a ${tt(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${nt(e.index)}`;
		case "setDocumentType": return `Type: ${tt(t, 40)}`;
		case "skip": return t ? tt(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${tt(t)}` : e.op;
	}
}
function Z(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function it(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function at(e) {
	if (!e?.startedAt) return null;
	let t = Z(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? it(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var ot = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function st({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = He[n.phase] ?? He.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
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
				children: Ge(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ G("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: We(r)
			}),
			c > 0 && /* @__PURE__ */ K("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ K("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						re(l),
						" / ",
						re(c)
					]
				}), /* @__PURE__ */ G(j, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ G("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => i(t),
				className: e($e, "font-medium text-info"),
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
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ue[t.status] ?? Ue.pending)
			}), /* @__PURE__ */ G("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function ct({ runId: r, instruction: a, agentName: o, requestedBy: s, command: l = "/doc", status: u, onOpenDocument: d, onOpenRun: f, result: p, onOpenResult: m, onDecide: g, suggestion: v, onReview: y, onRetry: b, documentTitle: x, defaultExpanded: S = !1, loop: C, onOpenLab: w, className: ee, "data-testid": T = "agent-run-card" }) {
	let E = u?.phase ?? "received", [D, O] = U(S), k = Ke(C), A = E === "completed" ? u?.suggestion ?? v : void 0, j = E === "completed" ? u?.review : void 0, M = !!A && !j, te = E === "completed" && u?.noop === !0, N = E === "completed" ? u?.result ?? p : void 0, P = N?.kind === "link" && N.label ? N.label : "Open", F = d && !(N?.kind === "document" && m), I = Je[E], L = E === "failed" || E === "rejected", ne = L ? "danger" : j ? j.decision === "accept" ? "success" : "neutral" : te ? "warning" : E === "completed" ? A ? "warning" : "success" : E === "awaiting_approval" ? "warning" : "info", re = j ? "Reviewed" : M ? "Suggested" : te ? "No change" : Ye[E], R = j ? j.byName ?? j.by : void 0, z = j ? `${j.decision === "accept" ? "Accepted" : "Rejected"} by ${R}` : void 0, B = E === "awaiting_approval", V = E === "failed" ? Qe(u?.details?.error ?? u?.detail, l) : void 0, ie = E === "running" ? u?.stepLabel ? `${o} — ${u.stepLabel}` : `${o} is working via the pipeline` : B ? `Waiting for approval${u?.detail ? ` — ${u.detail}` : ""}` : V ? V.summary : z ?? u?.detail ?? (M && u?.suggestion ? `${u.suggestion.applied} ${u.suggestion.applied === 1 ? "change" : "changes"} suggested` : E === "received" ? "Received" : re), H = u?.details, W = H?.ops ?? [], ae = H?.steps ?? [], q = H?.document?.title || x || "Document", oe = !!H?.document || !!d, J = V ? V.technical : H?.error, se = at(H), ce = `${T}-details-${r}`, le = !!(M && A && y || B && g || N && m || N?.kind === "link" && !m);
	return /* @__PURE__ */ K("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", ee),
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
			/* @__PURE__ */ K("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ G(_, {
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
								children: l
							}),
							" ",
							a
						]
					}),
					C ? /* @__PURE__ */ G(n, {
						size: "xs",
						tone: He[C.phase]?.tone ?? "info",
						"data-testid": `${T}-phase`,
						children: He[C.phase]?.label ?? C.phase
					}) : /* @__PURE__ */ G(n, {
						size: "xs",
						tone: ne,
						"data-testid": `${T}-phase`,
						children: re
					}),
					/* @__PURE__ */ G(i, {
						size: "sm",
						"aria-label": D ? "Hide details" : "Show details",
						"aria-expanded": D,
						"aria-controls": D ? ce : void 0,
						onClick: () => O((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${T}-toggle`,
						icon: /* @__PURE__ */ G(h, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", D && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			C ? /* @__PURE__ */ G(st, {
				runId: r,
				loop: C,
				clock: k,
				onOpenLab: w,
				testId: T
			}) : /* @__PURE__ */ K("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ K("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", le && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ G("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${T}-steps`,
							children: qe.map((t, n) => {
								let r = L ? n < I : n < I || n === I && E === "completed", i = n === I && E !== "completed" && !L, a = L && n === I;
								return /* @__PURE__ */ K("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ G("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? te && n === I ? "bg-warning" : "bg-success" : i ? B ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ G("span", {
										className: "sr-only",
										children: a ? re : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ G("span", {
							className: e("min-w-0 flex-1 truncate", j && (j.decision === "accept" ? "text-success" : "text-text-tertiary"), E === "failed" && "text-danger", te && "text-warning-fg"),
							"data-testid": `${T}-detail`,
							"data-review": j?.decision,
							title: V ? V.summary : u?.detail,
							children: ie
						})]
					}),
					M && A && y && /* @__PURE__ */ K("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${T}-review`,
						children: [/* @__PURE__ */ G(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => y(r, "accept", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
							}),
							"data-testid": `${T}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ G(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => y(r, "reject", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
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
							onClick: () => g(r, "approve"),
							"data-testid": `${T}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ G(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject"),
							"data-testid": `${T}-reject`,
							children: "Reject"
						})]
					}),
					E === "failed" && b && /* @__PURE__ */ G(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => b(r),
						"data-testid": `${T}-retry`,
						children: "Retry"
					}),
					N && m && /* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => m(N),
						className: e($e, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": N.kind,
						children: P
					}),
					N?.kind === "link" && !m && /* @__PURE__ */ G("a", {
						href: N.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e($e, "font-medium text-info"),
						"data-testid": `${T}-open-result`,
						"data-result-kind": "link",
						children: P
					}),
					f && /* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => f(r),
						className: et,
						"data-testid": `${T}-open-run`,
						children: "Open run"
					}),
					F && /* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						onClick: d,
						className: et,
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
					oe && /* @__PURE__ */ K("div", {
						className: "flex items-start gap-2",
						"data-testid": `${T}-details-document`,
						children: [
							/* @__PURE__ */ G(c, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ K("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ G("span", {
									className: "block truncate font-medium text-text-primary",
									children: q
								}), H?.document?.snippet && /* @__PURE__ */ G("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${T}-details-snippet`,
									children: H.document.snippet
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
					W.length > 0 && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-ops`,
						children: [
							/* @__PURE__ */ G("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ G("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: W.slice(0, Xe).map((e, t) => /* @__PURE__ */ G("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: rt(e)
								}, t))
							}),
							W.length > Xe && /* @__PURE__ */ K("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${T}-details-more-ops`,
								children: [
									"+",
									W.length - Xe,
									" more"
								]
							})
						]
					}),
					ae.length > 0 && /* @__PURE__ */ G("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${T}-details-steps`,
						children: ae.map((t) => /* @__PURE__ */ K("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ G("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", ot[t.status] ?? ot.pending)
							}), /* @__PURE__ */ G("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					J && /* @__PURE__ */ K("div", {
						"data-testid": `${T}-details-error-block`,
						children: [/* @__PURE__ */ G("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ G("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${T}-details-error`,
							children: J
						})]
					}),
					/* @__PURE__ */ K("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							f && /* @__PURE__ */ G("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => f(r),
								className: e($e, "hover:text-text-primary"),
								"data-testid": `${T}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							N && m && /* @__PURE__ */ G("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => m(N),
								className: e($e, "font-medium text-info"),
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
function lt(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ut(e.result);
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
function ut(e) {
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
function dt(e, t) {
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
function ft({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = ie(() => dt(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ G("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ K("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Q(t),
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
//#region src/components/social/InlineMessageEditor.tsx
function pt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = U(e), [s, c] = U(!1), [l, u] = U(null), d = H(null);
	V(() => {
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
			/* @__PURE__ */ G(k, {
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
function mt(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function ht({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = mt(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ G("button", {
		"data-ui-part": "",
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
				children: z(t.size)
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
					children: z(t.size)
				})]
			})] })
		})
	});
}
function gt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function _t({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : z(o);
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
				"data-ui-part": "",
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
	let a = le(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ K("div", {
		role: "separator",
		"aria-label": ue(t),
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
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(lt(e.metadata) || Mt(e.metadata) || jt(e.metadata) || St(e.metadata) || Nt(e.metadata));
}
function Wt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Ht(r);
	if (!i || i !== Ht(n) || !Ut(n) || !Ut(r) || r.editedAt || ce(r.timestamp, n.timestamp)) return !1;
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
function Zt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, dock: u, currentUserId: d, reactionsFor: p, onToggleReaction: m, onReply: h, reply: _, onCancelReply: v, onForwardMessage: x, onCopyLink: S, onTogglePin: C, onEditMessage: ee, onDeleteMessage: D, canEditMessage: k, canDeleteMessage: j, pinnedMessageIds: M, onJumpToMessage: te, highlightedMessageId: N, threaded: P = !1, postRhythm: re = "channel", alignOwnMessages: z = !0, documentEditors: ie, documentUnavailable: ae, callParticipants: q, agentRunStatus: oe, onOpenRun: J, agentLoopStatus: se, onOpenLab: le, onOpenResult: ue, onDecideRun: de, onReviewRun: fe, onRetryRun: me, onJoinCall: he, onOpenRecording: ge, onCopyRecordingLink: _e, onShareRecording: ve, onDownloadRecording: ye, onOpenRecordingTranscript: xe, onManageRecordingExpiry: Ce, recordingStatus: Te, onOpenDocument: Ee, renderMessageReferences: De, tone: Oe = "light", showHeader: ke, fill: Ae, flushComposer: je = !1, contentAlign: Ne = "end", onLoadMore: Pe, hasMore: Fe, loadingMore: X = !1, onSendFiles: Ie, transfers: Re = [], currentActor: ze, onCancelTransfer: Be, attachmentSrc: He, onOpenAttachment: Ue, acceptFiles: We, maxFileSize: Ge, onFileError: Ke, readReceipts: qe, readReceiptsEnabled: Je = !0, unreadFrom: Ye, emojis: Xe = ne }) {
	let [Ze, Qe] = U(null), [$e, et] = U(null), tt = H(null), [nt, rt] = U(null), Z = Oe === "dark", it = O(), at = ke ?? !(it?.hasHeader ?? !1), ot = Ae ?? it?.fillsHeight ?? !1, [st, ut] = U(""), dt = H(null), Q = H(null), mt = !!Pe && Fe !== !1, vt = H(null), wt = H(null), [Dt, Ot] = U(!1), Lt = !!Ie && !a, Vt = Ft(n, r), Ht = P ? Rt(Vt) : null, [Ut, Zt] = U(() => /* @__PURE__ */ new Set());
	function $t(e) {
		Zt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let en = H(void 0);
	if (Ye !== void 0) {
		let e = en.current;
		if (e === void 0) en.current = Ye;
		else {
			let t = Date.parse(Ye), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (en.current = Ye);
		}
	}
	let tn = en.current, nn = tn === void 0 ? -1 : Gt(Ht ? Ht.map((e) => Pt(e.root)) : Vt.map((e) => Pt(e)), tn), rn = qe !== void 0, an = qe ?? [], $ = Je && d ? d : void 0, on = (() => {
		if ($) for (let e = Vt.length - 1; e >= 0; --e) {
			let t = Vt[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== $ || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), sn = on && $ ? qt(an, $, on.timestamp) : [], cn = sn.length === 1 && !!$ && Yt(n, an, $) === 1;
	function ln() {
		if (!on) return null;
		if (sn.length === 0) return rn ? /* @__PURE__ */ G("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", z ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ G("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = sn.map(Jt), n = sn.slice(0, 3);
		return /* @__PURE__ */ K("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", z ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				sn.length > 1 && /* @__PURE__ */ G("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ G(A, {
						name: Jt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ G("span", {
					"data-testid": "chat-read-receipts-label",
					children: cn ? "Seen" : `Seen by ${sn.length}`
				}),
				/* @__PURE__ */ G("span", {
					style: w,
					children: cn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [un, dn] = U(0), [fn, pn] = U(!1), mn = H(!0), hn = H(n.length), gn = n.length + r.length + Re.length, _n = H(null), [vn, yn] = U(""), bn = H(null), xn = H(!1), Sn = H(0);
	V(() => {
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
		yn(xt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, d]);
	function Cn() {
		let e = dt.current;
		e && (e.scrollTop = e.scrollHeight, mn.current = !0, dn(0));
	}
	function wn() {
		let e = dt.current;
		if (!e) return;
		let t = bt(e);
		mn.current = t, t && dn(0), pn(e.scrollTop > 8);
	}
	V(() => {
		let e = dt.current, t = hn.current, n = gn - t;
		if (hn.current = gn, !e) return;
		let r = _n.current;
		if (r && n > 0) {
			_n.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		mn.current ? (e.scrollTop = e.scrollHeight, dn(0), pn(e.scrollTop > 8)) : n > 0 && dn((e) => e + n);
	}, [gn]);
	function Tn() {
		let e = dt.current;
		e && (_n.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), Pe?.();
	}
	V(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function En() {
		let e = st.trim();
		!e || a || (Q.current && clearTimeout(Q.current), Q.current = null, o?.(!1), mn.current = !0, i(e), ut(""));
	}
	function Dn(e) {
		!Lt || e.length === 0 || (mn.current = !0, Ie?.(e));
	}
	function On(e) {
		if (!Lt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Dn(t));
	}
	function kn(e) {
		ut((t) => t + e), Ot(!1);
	}
	function An() {
		a || (o?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => o?.(!1), 2e3));
	}
	function jn(e) {
		An(), e.key === "Enter" && !a && st.trim() && En();
	}
	function Mn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === nn ? /* @__PURE__ */ G(Kt, { tone: Oe }) : null, l = !c && Wt(a, n), u = !o && ce(s, i) ? /* @__PURE__ */ G(yt, {
			timestamp: s,
			tone: Oe,
			className: r === 0 ? "pt-0" : void 0
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = lt(r.metadata);
			return /* @__PURE__ */ K(B, { children: [
				u,
				c,
				/* @__PURE__ */ G("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ G(pe, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: Oe,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ K(W, { children: [
							i ? /* @__PURE__ */ G(ct, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: oe?.(i.runId),
								onOpenDocument: Ee && i.documentId ? () => Ee(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: J,
								result: i.result,
								onOpenResult: ue,
								onDecide: de,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: fe,
								onRetry: me,
								...Xt(i, se, le)
							}) : r.body == null ? /* @__PURE__ */ G(be, { text: r.content }) : /* @__PURE__ */ G("div", {
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
		let { message: f } = n, _ = f.displayName ?? f.clientId.slice(0, 8), v = f.attachments ?? [], y = f.metadata?.html, b = typeof y == "string" ? y : void 0, w = At(f.metadata), T = kt(f.content, w, b), O = /* @__PURE__ */ G(be, {
			html: T.html,
			text: T.body
		}), A = St(f.metadata), P = lt(f.metadata), F = jt(f.metadata), I = Mt(f.metadata), L = Nt(f.metadata), ne = Tt(f.metadata), re = Ct(f.metadata), V = P ? /* @__PURE__ */ G(ct, {
			runId: P.runId,
			instruction: P.instruction || f.content.replace(/^\/doc\s*/i, ""),
			command: P.command,
			agentName: P.agentName,
			requestedBy: f.displayName,
			status: oe?.(P.runId),
			onOpenDocument: Ee && P.documentId ? () => Ee(P.documentId) : void 0,
			documentTitle: P.documentTitle,
			onOpenRun: J,
			result: P.result,
			onOpenResult: ue,
			onDecide: de,
			suggestion: P.suggestionKey ? {
				key: P.suggestionKey,
				...P.documentId ? { documentId: P.documentId } : {}
			} : void 0,
			onReview: fe,
			onRetry: me,
			...Xt(P, se, le)
		}) : I ? (() => {
			let e = Te?.(I.recordingId), t = {
				...I,
				...e ?? {}
			};
			return /* @__PURE__ */ G(Le, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? f.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!f.id && !!M?.has(f.id),
				onOpen: ge,
				onCopyLink: _e,
				onShare: ve,
				onDownload: ye,
				onOpenTranscript: xe,
				onManageExpiry: Ce,
				onTogglePin: C ? () => C(f) : void 0
			});
		})() : F ? /* @__PURE__ */ G(Me, {
			callId: F.callId,
			startedBy: (typeof f.metadata?.displayName == "string" ? f.metadata.displayName : void 0) ?? f.displayName,
			participants: q?.(F.callId) ?? F.participants,
			live: F.live,
			durationMs: F.durationMs,
			startedAt: F.startedAt,
			outcome: F.outcome,
			recordingId: F.recordingId,
			onOpenRecording: ge,
			audioOnly: F.audioOnly,
			recorded: F.recorded,
			notRecordedReason: F.notRecordedReason,
			lobbyName: F.lobbyName,
			onJoin: he
		}) : A ? /* @__PURE__ */ G(Se, {
			documentId: A.documentId,
			title: A.title || f.content,
			icon: A.icon,
			createdBy: A.createdBy ?? (typeof f.metadata?.displayName == "string" ? f.metadata.displayName : void 0) ?? f.displayName,
			editors: ie?.(A.documentId) ?? [],
			onOpen: Ee,
			unavailable: ae?.(A.documentId)
		}) : v.length === 0 ? O : /* @__PURE__ */ K(W, { children: [(f.content || b) && O, v.map((e) => /* @__PURE__ */ G(ht, {
			attachment: e,
			src: He?.(e),
			onOpen: Ue
		}, e.id))] }), H = f.id ?? "", U = H && p ? p(H) : [], ke = f.metadata?.replyTo, Ae = !!o && !!ke && ke.messageId === o.rootId, je = !!ke && !Ae, Ne = !!H && !!M?.has(H), Pe = !!d && f.userId === d, Fe = f.metadata?.system === !0, X = !!f.deletedAt || f.metadata?.deleted === !0, Ie = !!(P || I || F || A || L), Re = !!(P || I || F || A || v.length > 0), ze = !X && !Fe && !Ie && !!H, Be = ze && (k ? k(f) : Pe), We = ze && (j ? j(f) : Pe), Ge = Be || We, Ke = !!H && !X && !Fe && !Ie && v.length === 0 && !!f.content.trim(), qe = Be && !!ee && Ze === H, Je = /* @__PURE__ */ K(W, { children: [
			je && ke && /* @__PURE__ */ G(R, {
				quote: ke,
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
			Ne && /* @__PURE__ */ K("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ G(g, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			X ? /* @__PURE__ */ G("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : qe ? /* @__PURE__ */ G(pt, {
				initialText: f.content,
				onSave: async (e) => {
					await ee(f, e), Qe(null);
				},
				onCancel: () => Qe(null)
			}) : V,
			!X && De?.(f),
			!X && re.length > 0 && /* @__PURE__ */ G("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: re.map((e) => /* @__PURE__ */ G(we, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: Ee,
					unavailable: ae?.(e.id)
				}, e.id))
			}),
			!X && ne && /* @__PURE__ */ K("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					ne.labels.length > 0 ? `Too large to send: ${ne.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!X && U.length > 0 && d && m && /* @__PURE__ */ G(ft, {
				reactions: U,
				currentUserId: d,
				onToggle: (e) => m(H, e)
			})
		] });
		return L ? /* @__PURE__ */ K(B, { children: [
			u,
			c,
			/* @__PURE__ */ G(Ve, {
				membership: L,
				fallbackText: f.content,
				timestamp: f.timestamp,
				"data-testid": "membership-notice"
			})
		] }, f.id ?? r) : /* @__PURE__ */ K(B, { children: [
			u,
			c,
			/* @__PURE__ */ G("div", {
				"data-testid": "chat-message",
				"data-message-id": H || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? Y(f.timestamp) : void 0,
				className: e("group relative rounded-md px-2 transition-colors hover:bg-surface-hover", H && H === N && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ G(pe, {
					actionsLayout: "menu",
					className: l ? "py-0.5" : void 0,
					author: _,
					content: Je,
					timestamp: l ? "" : f.timestamp,
					editedAt: X ? void 0 : f.editedAt,
					avatarUrl: f.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: Oe,
					mine: Pe && z,
					contentLayout: Re ? "block" : "inline",
					actions: H && !X && !qe && (m || Ge || Ke && x || !Fe && (h || C || S)) ? /* @__PURE__ */ G(E, {
						className: "max-w-full flex-wrap",
						onReact: m ? (e) => m(H, e) : void 0,
						onOpenReactionPicker: m ? (e) => {
							tt.current = e, et(H);
						} : void 0,
						onReply: h && !Fe ? () => h(o?.rootMessage ?? f) : void 0,
						onForward: x && Ke ? (e) => x(f, e) : void 0,
						onCopyLink: S && !Fe && H ? () => S(f) : void 0,
						onTogglePin: C && !Fe ? () => C(f) : void 0,
						pinned: !!f.id && !!M?.has(f.id),
						onEdit: Be && ee ? () => Qe(H) : void 0,
						onDelete: We && D ? () => rt(H) : void 0
					}) : void 0
				})
			}),
			!!on && H === on.id && ln()
		] }, f.id ?? r);
	}
	function Nn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Pn(e) {
		if (!h || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !Nt(t.metadata)) return t;
	}
	function Fn(t, n, r) {
		let i = Pt(r?.root), a = re === "chat", o = r && r.replies.length === 0 && (a || !Pn(r.root)) ? r.root : void 0, s = Mn(t.root, n, i, o), c = Pt(t.root) ?? "", l = !a && n > 0 && n !== nn && !ce(c, i) ? /* @__PURE__ */ G("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, u = t.replies.length > 0 ? Pn(t.root) : null;
		if (t.replies.length === 0 && !u) return l ? /* @__PURE__ */ K(B, { children: [l, s] }, `post:${It(t.root) ?? n}`) : s;
		let d = It(t.root) ?? "", f = t.root.kind === "message" ? t.root.message : void 0, p = !!d && t.replies.length > zt, m = !p || Ut.has(d), g = m ? t.replies : t.replies.slice(0, Bt), _ = t.replies.length - g.length, v = [...new Set(t.replies.slice(g.length).map(Nn))].slice(0, 3);
		return /* @__PURE__ */ K(B, { children: [l, /* @__PURE__ */ K("div", {
			"data-testid": "chat-thread",
			"data-thread-root": d || void 0,
			className: "group/post",
			children: [
				s,
				t.replies.length > 0 && /* @__PURE__ */ K("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [g.map((e, t) => Mn(e, t, void 0, g[t - 1], {
						rootId: d,
						...f ? { rootMessage: f } : {}
					})), p && /* @__PURE__ */ K("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => $t(d),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && v.length > 0 && /* @__PURE__ */ G("span", {
							className: "flex items-center gap-0.5",
							children: v.map((e) => /* @__PURE__ */ G(A, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${_} more ${_ === 1 ? "reply" : "replies"}`]
					})]
				}),
				u && /* @__PURE__ */ G("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ G("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Nn(t.root)}`,
						onClick: () => h?.(u),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${d || n}`);
	}
	let In = /* @__PURE__ */ K("div", {
		"data-testid": "chat-panel",
		className: e(ot ? e("flex h-full min-h-0 flex-col", je && l ? "px-0 pb-0" : "px-[var(--ui-content-gutter,1rem)] pb-3") : e("border rounded mt-4", je && l ? "px-0 pt-3 pb-0" : "p-3", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			at && /* @__PURE__ */ K("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", je && l && "mx-[var(--ui-content-gutter,1rem)]", Z ? "text-white/90" : "text-text-primary"),
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
				children: vn
			}),
			/* @__PURE__ */ K("div", {
				className: e("relative flex flex-col mb-2", ot ? "min-h-0 flex-1" : "", je && l && "mx-[var(--ui-content-gutter,1rem)]"),
				children: [/* @__PURE__ */ G("div", {
					ref: dt,
					onScroll: wn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", fn && "fade-top", ot ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ K("div", {
						"data-chat-content": !0,
						className: e("pb-[var(--ui-chat-gap,1rem)]", Ne === "end" && "mt-auto"),
						children: [
							mt && n.length > 0 && /* @__PURE__ */ G("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ G("button", {
									"data-ui-part": "",
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Tn,
									disabled: X,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: X ? "Loading…" : "Load earlier messages"
								})
							}),
							Vt.length === 0 ? c ?? /* @__PURE__ */ G("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : Ht ? Ht.map((e, t) => Fn(e, t, Ht[t - 1])) : Vt.map((e, t) => Mn(e, t, Pt(Vt[t - 1]), Vt[t - 1])),
							m && /* @__PURE__ */ G(I, {
								open: $e !== null,
								triggerRef: tt,
								emojis: Xe,
								onSelect: (e) => {
									$e && m($e, e), et(null);
								},
								onClose: () => et(null)
							}),
							D && /* @__PURE__ */ G(y, {
								open: nt !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => rt(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === nt);
									rt(null), e && D(e);
								}
							}),
							Re.map((e) => /* @__PURE__ */ G(pe, {
								author: e.actor,
								timestamp: "",
								tone: Oe,
								content: /* @__PURE__ */ G(_t, {
									transfer: e,
									mine: gt(e, d, ze),
									onCancel: Be
								})
							}, e.transferId))
						]
					})
				}), un > 0 && /* @__PURE__ */ K("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Cn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						un,
						" new message",
						un === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ G(T, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", je && l && "mx-[var(--ui-content-gutter,1rem)]", Z ? "text-white/50" : "text-text-secondary")
			}),
			u != null && u !== !1 && /* @__PURE__ */ G("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: u
			}),
			l ? /* @__PURE__ */ G("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? An : void 0,
				children: l
			}) : /* @__PURE__ */ K("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [_ && /* @__PURE__ */ G(R, {
					quote: _,
					onDismiss: v,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ K("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						Ie && /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G("button", {
							"data-ui-part": "",
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !Lt,
							onClick: () => vt.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(Qt, {})
						}), /* @__PURE__ */ G(F, {
							ref: vt,
							multiple: !0,
							accept: We,
							onFiles: (e) => {
								let t = Ge ? e.filter((e) => e.size > Ge) : [];
								t.length > 0 && Ke?.(`Skipped ${t.length} file(s) over the size limit.`), Dn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ G("button", {
							"data-ui-part": "",
							ref: wt,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": Dt,
							title: "Insert emoji",
							disabled: a,
							onClick: () => Ot((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ G(f, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ G(I, {
							open: Dt,
							onSelect: kn,
							onClose: () => Ot(!1),
							triggerRef: wt,
							emojis: Xe
						}),
						/* @__PURE__ */ G(b, {
							size: "sm",
							value: st,
							onChange: (e) => ut(e.target.value),
							onKeyDown: jn,
							onPaste: On,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ G(t, {
							variant: "primary",
							size: "sm",
							onClick: En,
							disabled: a || !st.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return Ie ? /* @__PURE__ */ G(L, {
		onFiles: Dn,
		accept: We,
		maxSize: Ge,
		onError: Ke,
		disabled: a,
		className: ot ? "flex h-full min-h-0 flex-col" : void 0,
		children: In
	}) : In;
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
			let n = q($t(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = oe(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
function rn({ leading: t, title: n, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
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
				title: n,
				className: e(tn, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), g]
		}), /* @__PURE__ */ G("span", {
			"data-line": "secondary",
			title: s,
			className: e(tn, "text-[11px] leading-snug", c ? r[c] : "text-text-tertiary"),
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
				"data-ui-part": "",
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
function $({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ G("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function on({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ G($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(S, {
			icon: /* @__PURE__ */ G(g, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${Y(e.sentAt)} · pinned ${Y(e.pinnedAt)}` : Y(r) : void 0;
			return /* @__PURE__ */ G(rn, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ G(A, {
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
					"data-ui-part": "",
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
function sn({ file: e, thumbnailSrc: t, onJump: n }) {
	let r = t?.(e.attachment) ?? e.attachment.preview, i = mt(e.attachment);
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
			children: /* @__PURE__ */ G(u, {})
		}),
		title: e.attachment.name,
		meta: [e.author, z(e.attachment.size)].filter(Boolean).join(" · "),
		timestamp: an(e.sentAt),
		timestampIso: e.sentAt,
		timestampTitle: e.sentAt ? Y(e.sentAt) : void 0,
		onJump: n ? () => n(e.messageId) : void 0,
		jumpLabel: `Go to the message with ${e.attachment.name}`
	});
}
function cn({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ G($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ G(S, {
			icon: /* @__PURE__ */ G(u, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => /* @__PURE__ */ G(sn, {
			file: e,
			thumbnailSrc: t,
			onJump: n
		}, `${e.messageId}:${e.attachment.id}`))
	});
}
function ln({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ G($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(S, {
			icon: /* @__PURE__ */ G(p, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ G(rn, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ G(A, {
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
function un(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function dn(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function fn({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ G($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ G(S, {
			icon: /* @__PURE__ */ G(l, { size: 40 }),
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
					children: /* @__PURE__ */ G(l, {})
				}),
				title: [an(e.startedAt), un(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : dn(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function pn(e, t) {
	let n = e ? Date.parse(e) : NaN, r = t ? Date.parse(t) : NaN;
	return Number.isNaN(n) && Number.isNaN(r) ? 0 : Number.isNaN(n) ? 1 : Number.isNaN(r) ? -1 : r - n;
}
function mn({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: i, files: o, thumbnailSrc: s, onJumpToFile: l, className: u, "data-testid": d = "channel-documents-panel" }) {
	let f = (t, n, r, i, a = !1) => /* @__PURE__ */ K("button", {
		"data-ui-part": "",
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ G("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), p = (e) => [r && f("create", r, /* @__PURE__ */ G("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), i && f("create-whiteboard", i, /* @__PURE__ */ G(a, { size: 15 }), "New whiteboard", e)].filter(Boolean), m = !!(r || i), h = o ? [...t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	})), ...o.map((e) => ({
		kind: "file",
		file: e,
		at: e.sentAt
	}))].sort((e, t) => pn(e.at, t.at)) : t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	}));
	return /* @__PURE__ */ K("div", {
		className: e("min-h-0 overflow-y-auto p-2", u),
		"data-testid": d,
		children: [m && h.length > 0 && /* @__PURE__ */ K("div", {
			className: "mb-1 flex flex-col",
			children: [r && f("create", r, /* @__PURE__ */ G("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), i && f("create-whiteboard", i, /* @__PURE__ */ G(a, { size: 15 }), "New whiteboard in this conversation")]
		}), h.length === 0 ? /* @__PURE__ */ G(S, {
			icon: /* @__PURE__ */ G(c, { size: 40 }),
			title: o ? "Nothing here yet" : "No documents yet",
			description: o ? "Documents, whiteboards and files shared here stay with this conversation." : "Documents and whiteboards started here stay with this conversation.",
			action: m ? /* @__PURE__ */ G("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: p(!0)
			}) : void 0
		}) : /* @__PURE__ */ G("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: h.map((e) => e.kind === "file" ? /* @__PURE__ */ G(sn, {
				file: e.file,
				thumbnailSrc: s,
				onJump: l
			}, `file:${e.file.messageId}:${e.file.attachment.id}`) : /* @__PURE__ */ G(rn, {
				"data-testid": "channel-document",
				"data-kind": "document",
				leading: /* @__PURE__ */ G("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.doc.icon || /* @__PURE__ */ G(c, {})
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
var hn = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], gn = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function _n({ name: t, headingLevel: n, description: r, online: a, avatarUrl: o, features: s = hn, children: c, canvas: u, members: f, memberCount: p, files: m = [], thumbnailSrc: h, documents: g = [], onOpenDocument: _, onRename: y, onCreateDocument: b, onCreateWhiteboard: x, pins: S = [], onUnpin: C, mentions: w = [], onOpenMention: T, recordings: E = [], onOpenRecording: D, onJumpToMessage: O, onStartCall: k, callModeFixed: A = !1, onWatch: j, watchLabel: M, watchHint: te, watchViewerCount: N, callInProgress: P = !1, headerActions: F, headerClassName: I, view: L, onViewChange: ne, className: re, "data-testid": R = "conversation-surface" }) {
	let z = new Set(s), B = z.has("files") && z.has("documents"), [V, ie] = U("chat"), H = L ?? V, ae = B && H === "files" ? "documents" : H, q = z.has(ae) ? ae : s[0] ?? "chat", oe = (e) => {
		L === void 0 && ie(e), ne?.(e);
	}, J = (e) => e || void 0, se = s.filter((e) => gn[e] && !(B && e === "files")).map((e) => ({
		id: e,
		label: gn[e],
		badge: e === "files" ? J(m.length) : e === "documents" ? J(g.length + (B ? m.length : 0)) : e === "pins" ? J(S.length) : e === "members" ? p == null ? void 0 : J(p) : e === "calls" ? J(E.length) : e === "mentions" ? J(w.filter((e) => e.unread).length) : void 0
	})), ce = (e) => {
		oe("chat"), O?.(e);
	};
	return /* @__PURE__ */ K("section", {
		"data-ui-part": "",
		className: e("flex min-w-0 flex-col", re),
		"data-testid": R,
		children: [
			/* @__PURE__ */ G(ee, {
				headingLevel: n,
				className: I,
				name: t,
				onRename: y,
				description: r,
				online: a,
				avatarUrl: o,
				"data-testid": `${R}-header`,
				tabs: se.length > 1 ? /* @__PURE__ */ G(v, {
					variant: "underline",
					size: "md",
					"aria-label": "Views of this conversation",
					getItemTestId: (e) => `${R}-tab-${e.id}`,
					value: q,
					onValueChange: (e) => oe(e),
					items: se
				}) : void 0,
				actions: k || j || F ? /* @__PURE__ */ K(W, { children: [
					k && (A ? /* @__PURE__ */ G(i, {
						"aria-label": P ? "Join the call" : "Start a call",
						title: P ? "Join the call" : "Start a call",
						"data-testid": `${R}-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => k(!1),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}) : /* @__PURE__ */ K(W, { children: [/* @__PURE__ */ G(i, {
						"aria-label": P ? "Join the call with audio" : "Start an audio call",
						title: P ? "Join with audio" : "Audio call",
						"data-testid": `${R}-audio-call`,
						onClick: () => k(!0),
						children: /* @__PURE__ */ G(d, { size: 16 })
					}), /* @__PURE__ */ G(i, {
						"aria-label": P ? "Join the call with video" : "Start a video call",
						title: P ? "Join with video" : "Video call",
						"data-testid": `${R}-video-call`,
						variant: P ? "primary" : "ghost",
						onClick: () => k(!1),
						children: /* @__PURE__ */ G(l, { size: 16 })
					})] })),
					j && /* @__PURE__ */ G(vn, {
						testId: `${R}-watch`,
						label: M,
						hint: te,
						viewerCount: N,
						onClick: j
					}),
					F
				] }) : void 0
			}),
			z.has("files") && q === "files" && /* @__PURE__ */ G(cn, {
				className: "min-h-0 flex-1",
				files: m,
				thumbnailSrc: h,
				onJump: O ? ce : void 0
			}),
			z.has("documents") && q === "documents" && /* @__PURE__ */ G(mn, {
				className: "min-h-0 flex-1",
				documents: g,
				onOpen: _,
				onCreate: b,
				onCreateWhiteboard: x,
				...B ? {
					files: m,
					thumbnailSrc: h,
					onJumpToFile: O ? ce : void 0
				} : {}
			}),
			z.has("pins") && q === "pins" && /* @__PURE__ */ G(on, {
				className: "min-h-0 flex-1",
				pins: S,
				onUnpin: C,
				onJump: O ? ce : void 0
			}),
			z.has("members") && q === "members" && /* @__PURE__ */ G("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-members`,
				children: f
			}),
			z.has("mentions") && q === "mentions" && /* @__PURE__ */ G(ln, {
				className: "min-h-0 flex-1",
				mentions: w,
				onJump: T ? (e, t) => {
					oe("chat"), T(e, t);
				} : void 0
			}),
			z.has("calls") && q === "calls" && /* @__PURE__ */ G(fn, {
				className: "min-h-0 flex-1",
				recordings: E,
				onOpen: D
			}),
			z.has("chat") && /* @__PURE__ */ K("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${R}-chat`,
				hidden: q !== "chat",
				children: [u && /* @__PURE__ */ G("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${R}-canvas`,
					children: u
				}), /* @__PURE__ */ G("div", {
					className: "min-h-0 flex-1",
					children: c
				})]
			})
		]
	});
}
function vn({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let s = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ K(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? yn,
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
var yn = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { be as $, ot as A, Be as B, ht as C, ft as D, pt as E, Ge as F, je as G, Le as H, Qe as I, Oe as J, Ee as K, rt as L, lt as M, ut as N, Q as O, at as P, xe as Q, We as R, yt as S, mt as T, X as U, ze as V, Me as W, we as X, Ae as Y, Se as Z, At as _, ln as a, ue as at, Tt as b, un as c, J as ct, Zt as d, pe as et, jt as f, Et as g, Dt as h, cn as i, le as it, ct as j, dt as k, rn as l, q as lt, Ct as m, _n as n, de as nt, fn as o, Y as ot, St as p, Te as q, mn as r, se as rt, on as s, ce as st, hn as t, fe as tt, en as u, oe as ut, Nt as v, _t as w, kt as x, Mt as y, Ve as z };
