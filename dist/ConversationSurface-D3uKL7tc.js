import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { n as r, t as i } from "./DropdownMenu-CkpcNvfV.js";
import { t as a } from "./Chip-YhQI5B9P.js";
import { t as o } from "./EmptyState-JzzL2z1E.js";
import { n as s, o as c, s as l, t as u } from "./ChannelHeader-C0n2KYEb.js";
import { n as d } from "./DockedPanelContext-pH9A5z1h.js";
import { t as f } from "./Input-DLknWXri.js";
import { t as p } from "./Avatar-BzicCOft.js";
import { i as m, n as h, r as g, t as _ } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as v } from "./formatBytes-05ivRSJY.js";
import { Fragment as y, useEffect as b, useMemo as x, useRef as S, useState as C } from "react";
import { Fragment as w, jsx as T, jsxs as E } from "react/jsx-runtime";
//#region src/utils/identity.ts
var D = [
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
function O(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return D[Math.abs(t) % D.length];
}
function k(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function A(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function j(e, t) {
	let n = A(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = A(t);
	return r ? n !== r : !1;
}
function M(e, t = /* @__PURE__ */ new Date()) {
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
function N(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function P(e) {
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
//#endregion
//#region src/components/social/MessageRow.tsx
function F(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function ee({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", className: u }) {
	let d = l === "dark", f = F(r), m = !o || !!f;
	return /* @__PURE__ */ E("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", u),
		children: [/* @__PURE__ */ T("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ T(p, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ E("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ E("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ T("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", d ? "text-white/70" : "text-text-secondary"),
						children: t
					}), f && /* @__PURE__ */ T("time", {
						"data-testid": "message-row-time",
						dateTime: r,
						title: P(r),
						className: e("text-xs shrink-0", d ? "text-white/40" : "text-text-tertiary"),
						children: f
					})]
				}),
				/* @__PURE__ */ T("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", d ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (d ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ T("div", {
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
var I = /* @__PURE__ */ new Set([
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
]), L = /^(https?:|mailto:)/i;
function R(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || L.test(t) ? t : null;
}
function z(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => z(e, `${t}-${n}`));
	if (!I.has(n.tagName)) return /* @__PURE__ */ T("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ T("br", {}, t);
		case "A": {
			let e = R(n.getAttribute("href"));
			return e ? /* @__PURE__ */ T("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ T("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ T("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ T(e, { children: r }, t);
		}
	}
}
var te = /```([\s\S]*?)```|`([^`\n]+)`/g;
function B(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (te.lastIndex = 0; (r = te.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ T("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ T("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ T("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function V({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = x(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => z(e, `n${t}`));
	}, [t]), o = x(() => B(n ?? ""), [n]);
	return /* @__PURE__ */ T("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function H({ documentId: t, title: n, icon: i, createdBy: a, editors: o = [], onOpen: s, className: c, "data-testid": l = "document-activity-card" }) {
	let u = o.length > 0;
	return /* @__PURE__ */ E("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", c),
		children: [
			/* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: i || "📄"
			}),
			/* @__PURE__ */ E("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ T("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ T("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${U(o)} editing now` : a ? `Created by ${a}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ T("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ T(r, {
					users: o.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: !0
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			s && /* @__PURE__ */ T("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => s(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function U(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ne({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ E("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ T("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ T("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function W(e) {
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
function K(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function re({ callId: t, startedBy: n, participants: i = [], live: a = !1, durationMs: o, audioOnly: s, recorded: c, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !a && typeof o == "number" ? W(o) : "", h = s === void 0 ? "Call" : s ? "Audio call" : "Video call", g = a ? G(i, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ E("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": a ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", a ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: s === void 0 || s ? "📞" : "📹"
			}),
			/* @__PURE__ */ E("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ T("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: a ? `${h} in progress` : h
					}),
					/* @__PURE__ */ T("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!a && c === !1 && /* @__PURE__ */ T("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: K(l, u)
					})
				]
			}),
			i.length > 0 && /* @__PURE__ */ T("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ T(r, {
					users: i.map((e) => ({
						id: e.userId,
						name: e.displayName ?? "Someone",
						avatarUrl: e.avatarUrl,
						online: a
					})),
					maxVisible: 3,
					size: 22
				})
			}),
			a && d && /* @__PURE__ */ T("button", {
				type: "button",
				"data-testid": `${p}-join`,
				onClick: () => d(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/RecordingActivityCard.tsx
function ie(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function ae(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function oe({ recordingId: t, title: n = "Recording", recordedBy: r, startedAt: a, durationMs: o, thumbnailUrl: s, participantCount: c, status: l = "ready", expiresAt: u, onOpen: d, onCopyLink: f, onDownload: p, className: m, "data-testid": h = "recording-activity-card" }) {
	let g = l === "ready" && !!d, _ = () => d?.(t), v = o == null ? "" : W(o), y = [ie(a), c != null && c > 0 ? `${c} ${c === 1 ? "person" : "people"}` : ""].filter(Boolean).join(" · "), b = [
		...d && l === "ready" ? [{
			id: "open",
			label: "Open",
			onSelect: _
		}] : [],
		...f ? [{
			id: "copy-link",
			label: "Copy link",
			onSelect: () => f(t)
		}] : [],
		...p && l === "ready" ? [{
			id: "download",
			label: "Download",
			onSelect: () => p(t)
		}] : []
	], x = b.length ? [{
		items: b,
		"data-testid": `${h}-menu-items`
	}] : [], S = l === "processing" ? "Still processing — it will be ready to watch shortly." : l === "failed" ? "This recording could not be processed." : u ? `This recording expires on ${ae(u)}.` : null;
	return /* @__PURE__ */ E("div", {
		"data-testid": h,
		"data-recording-id": t,
		"data-status": l,
		className: e("max-w-md overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", m),
		children: [/* @__PURE__ */ E("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ E("button", {
				type: "button",
				onClick: g ? _ : void 0,
				disabled: !g,
				"aria-label": g ? `Play ${n.toLowerCase()}` : n,
				"data-testid": `${h}-thumb`,
				className: e("relative aspect-video w-44 shrink-0 overflow-hidden bg-black text-left", g ? "cursor-pointer" : "cursor-default"),
				children: [
					s ? /* @__PURE__ */ T("img", {
						src: s,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover"
					}) : /* @__PURE__ */ T("span", {
						className: "absolute inset-0 flex items-center justify-center text-white/30",
						children: /* @__PURE__ */ T("svg", {
							width: "32",
							height: "32",
							viewBox: "0 0 24 24",
							fill: "currentColor",
							"aria-hidden": !0,
							children: /* @__PURE__ */ T("path", { d: "M8 5v14l11-7z" })
						})
					}),
					g && /* @__PURE__ */ T("span", {
						className: "absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ T("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ T("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ T("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					v && /* @__PURE__ */ T("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${h}-duration`,
						children: v
					})
				]
			}), /* @__PURE__ */ E("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ E("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ T("div", {
							className: "truncate text-[15px] font-semibold text-text-primary",
							"data-testid": `${h}-title`,
							children: n
						}),
						r && /* @__PURE__ */ T("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${h}-by`,
							children: r
						}),
						y && /* @__PURE__ */ T("div", {
							className: "mt-1 truncate text-xs text-text-tertiary",
							children: y
						})
					]
				}), x.length > 0 && /* @__PURE__ */ T(i, {
					trigger: /* @__PURE__ */ T("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "Recording actions",
					triggerTitle: "More",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: x,
					"data-testid": `${h}-menu`
				})]
			})]
		}), S && /* @__PURE__ */ T("div", {
			className: e("border-t px-3 py-2 text-xs", l === "failed" ? "border-danger-border bg-danger-bg text-danger-fg" : "border-warning-border bg-warning-bg text-warning-fg"),
			"data-testid": `${h}-notice`,
			children: S
		})]
	});
}
//#endregion
//#region src/components/social/AgentRunCard.tsx
var se = [
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
], ce = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, le = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, q = 6;
function J(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function ue(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function de(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${J(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${J(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${J(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${ue(e.index)}`;
		case "deleteBlock": return `Removed block ${ue(e.index)}`;
		case "appendMacro": return t ? `Added a ${J(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${ue(e.index)}`;
		case "setDocumentType": return `Type: ${J(t, 40)}`;
		case "skip": return t ? J(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${J(t)}` : e.op;
	}
}
function fe(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function pe(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function me(e) {
	if (!e?.startedAt) return null;
	let t = fe(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? pe(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var he = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function ge({ runId: r, instruction: i, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = l?.phase ?? "received", [S, w] = C(v), D = x === "completed" ? l?.suggestion ?? h : void 0, O = x === "completed" ? l?.review : void 0, k = !!D && !O, A = x === "completed" && l?.noop === !0, j = x === "completed" ? l?.result ?? f : void 0, M = j?.kind === "link" && j.label ? j.label : "Open", N = u && !(j?.kind === "document" && p), P = ce[x], F = x === "failed" || x === "rejected", ee = F ? "danger" : O ? O.decision === "accept" ? "success" : "neutral" : A ? "warning" : x === "completed" ? D ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", I = O ? "Reviewed" : k ? "Suggested" : A ? "No change" : le[x], L = O ? O.byName ?? O.by : void 0, R = O ? `${O.decision === "accept" ? "Accepted" : "Rejected"} by ${L}` : void 0, z = x === "awaiting_approval", te = x === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : z ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : R ?? l?.detail ?? (k && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : I), B = l?.details, V = B?.ops ?? [], H = B?.steps ?? [], U = B?.document?.title || _ || "Document", ne = !!B?.document || !!u, W = B?.error ?? (x === "failed" ? l?.detail : void 0), G = me(B), K = `${b}-details-${r}`;
	return /* @__PURE__ */ E("div", {
		className: e("flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", y),
		"data-testid": b,
		"data-phase": x,
		"data-run-id": r,
		"data-expanded": S ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${i}` : `${o}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || w((e) => !e);
		},
		children: [
			/* @__PURE__ */ E("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ T("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ E("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${b}-instruction`,
						children: [
							/* @__PURE__ */ T("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ T(a, {
						size: "xs",
						tone: ee,
						"data-testid": `${b}-phase`,
						children: I
					}),
					/* @__PURE__ */ T(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? K : void 0,
						onClick: () => w((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${b}-toggle`,
						icon: /* @__PURE__ */ T("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", S && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ E("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ T("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${b}-steps`,
						children: se.map((t, n) => {
							let r = F ? n < P : n < P || n === P && x === "completed", i = n === P && x !== "completed" && !F, a = F && n === P;
							return /* @__PURE__ */ E("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ T("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? A && n === P ? "bg-warning" : "bg-success" : i ? z ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ T("span", {
									className: "sr-only",
									children: a ? I : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ T("span", {
						className: e("min-w-0 flex-1 truncate", O && (O.decision === "accept" ? "text-success" : "text-text-tertiary"), x === "failed" && "text-danger", A && "text-warning-fg"),
						"data-testid": `${b}-detail`,
						"data-review": O?.decision,
						title: l?.detail,
						children: te
					}),
					k && D && g && /* @__PURE__ */ E("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-review`,
						children: [/* @__PURE__ */ T(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: D.key,
								...D.documentId ? { documentId: D.documentId } : {}
							}),
							"data-testid": `${b}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ T(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject", {
								key: D.key,
								...D.documentId ? { documentId: D.documentId } : {}
							}),
							"data-testid": `${b}-reject-review`,
							children: "Reject"
						})]
					}),
					z && m && /* @__PURE__ */ E("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-decide`,
						children: [/* @__PURE__ */ T(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "approve"),
							"data-testid": `${b}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ T(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "reject"),
							"data-testid": `${b}-reject`,
							children: "Reject"
						})]
					}),
					j && p && /* @__PURE__ */ T("button", {
						type: "button",
						onClick: () => p(j),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": j.kind,
						children: M
					}),
					j?.kind === "link" && !p && /* @__PURE__ */ T("a", {
						href: j.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": "link",
						children: M
					}),
					d && /* @__PURE__ */ T("button", {
						type: "button",
						onClick: () => d(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-run`,
						children: "run"
					}),
					N && /* @__PURE__ */ T("button", {
						type: "button",
						onClick: u,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-document`,
						children: "document"
					})
				]
			}),
			S && /* @__PURE__ */ E("div", {
				id: K,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					ne && /* @__PURE__ */ E("div", {
						className: "flex items-start gap-2",
						"data-testid": `${b}-details-document`,
						children: [
							/* @__PURE__ */ T("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ E("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ T("span", {
									className: "block truncate font-medium text-text-primary",
									children: U
								}), B?.document?.snippet && /* @__PURE__ */ T("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							u && /* @__PURE__ */ T(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${b}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ E("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ T("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ T("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, q).map((e, t) => /* @__PURE__ */ T("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: de(e)
								}, t))
							}),
							V.length > q && /* @__PURE__ */ E("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									V.length - q,
									" more"
								]
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ T("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: H.map((t) => /* @__PURE__ */ E("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ T("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", he[t.status] ?? he.pending)
							}), /* @__PURE__ */ T("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					W && /* @__PURE__ */ T("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: W
					}),
					/* @__PURE__ */ E("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ T("button", {
								type: "button",
								onClick: () => d(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${b}-details-open-run`,
								children: "Open run"
							}),
							j && p && /* @__PURE__ */ T("button", {
								type: "button",
								onClick: () => p(j),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${b}-details-open-result`,
								children: M
							}),
							G && /* @__PURE__ */ T("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${b}-details-timings`,
								children: G
							})
						]
					})
				]
			})
		]
	});
}
function _e(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ve(e.result);
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
function ve(e) {
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
function ye(e, t) {
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
function Y(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function be({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = x(() => ye(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ T("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ E("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Y(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ T("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var xe = [
	"👍",
	"🎉",
	"❤️"
], Se = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ce({ quickReactions: t = xe, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ T("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Se}`,
		children: n
	}, r);
	return /* @__PURE__ */ E("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function we(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Te(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Ee({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ E("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ T("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ T("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Te(t.timestamp)
		})]
	}), /* @__PURE__ */ T("span", {
		className: "block truncate text-xs text-text-secondary",
		children: we(t.text)
	})] });
	return /* @__PURE__ */ E("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ T("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ T("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ T("button", {
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
function De(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function Oe({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = De(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ E("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ T("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ T("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ T("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ T("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ E("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ T("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ T("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: v(t.size)
			})]
		})]
	}) : /* @__PURE__ */ T("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ E("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ T(X, {}), /* @__PURE__ */ E("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ T("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ T("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: v(t.size)
				})]
			})]
		})
	});
}
function ke(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ae({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : v(o);
	return /* @__PURE__ */ E("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ T("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ T(X, {}),
			/* @__PURE__ */ E("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ E("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ T("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ T("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ T("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ T("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ T("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ T("button", {
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
function X() {
	return /* @__PURE__ */ T("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ T("path", {
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
function je({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = M(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ E("div", {
		role: "separator",
		"aria-label": N(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ T("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ T("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ T("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Me(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Ne(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Pe(e) {
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
function Fe(e) {
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
var Z = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Ie(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Z[e] ?? e)
	};
}
function Le(e) {
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
function Re(e) {
	if (!e || e.kind !== "recording") return null;
	let t = typeof e.recordingId == "string" ? e.recordingId : "";
	if (!t) return null;
	let n = e.status === "processing" || e.status === "failed" ? e.status : "ready";
	return {
		recordingId: t,
		callId: typeof e.callId == "string" ? e.callId : void 0,
		title: typeof e.title == "string" ? e.title : void 0,
		startedAt: typeof e.startedAt == "string" ? e.startedAt : void 0,
		durationMs: typeof e.durationMs == "number" ? e.durationMs : void 0,
		thumbnailUrl: typeof e.thumbnailUrl == "string" ? e.thumbnailUrl : void 0,
		participantCount: typeof e.participantCount == "number" ? e.participantCount : void 0,
		status: n,
		expiresAt: typeof e.expiresAt == "string" ? e.expiresAt : void 0
	};
}
function ze(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Be(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(ze(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Ve({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: c = [], emptyState: u, composer: p, currentUserId: v, reactionsFor: x, onToggleReaction: D, onReply: O, onTogglePin: k, pinnedMessageIds: A, onJumpToMessage: M, highlightedMessageId: N, documentEditors: P, callParticipants: F, agentRunStatus: I, onOpenRun: L, onOpenResult: R, onDecideRun: z, onReviewRun: te, onJoinCall: B, onOpenRecording: U, onCopyRecordingLink: W, onOpenDocument: G, tone: K = "light", showHeader: ie, fill: ae, onLoadMore: se, hasMore: ce, loadingMore: le = !1, onSendFiles: q, transfers: J = [], currentActor: ue, onCancelTransfer: de, attachmentSrc: fe, onOpenAttachment: pe, acceptFiles: me, maxFileSize: he, onFileError: ve, emojis: ye = _ }) {
	let Y = K === "dark", xe = d(), Se = ie ?? !(xe?.hasHeader ?? !1), we = ae ?? xe?.fillsHeight ?? !1, [Te, De] = C(""), X = S(null), Z = S(null), Ve = !!se && ce !== !1, Ue = S(null), We = S(null), [Q, $] = C(!1), Ge = !!q && !a, Ke = Be(n, r), [qe, Je] = C(0), [Ye, Xe] = C(!1), Ze = S(!0), Qe = S(n.length), $e = n.length + r.length + J.length, et = S(null), [tt, nt] = C(""), rt = S(null), it = S(!1), at = S(0);
	b(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!it.current) {
			it.current = !0, rt.current = t;
			return;
		}
		if (t === rt.current || (rt.current = t, v && e.userId === v)) return;
		at.current += 1;
		let r = at.current % 2 == 0 ? "​" : "";
		nt(Ne(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, v]);
	function ot() {
		let e = X.current;
		e && (e.scrollTop = e.scrollHeight, Ze.current = !0, Je(0));
	}
	function st() {
		let e = X.current;
		if (!e) return;
		let t = Me(e);
		Ze.current = t, t && Je(0), Xe(e.scrollTop > 8);
	}
	b(() => {
		let e = X.current, t = Qe.current, n = $e - t;
		if (Qe.current = $e, !e) return;
		let r = et.current;
		if (r && n > 0) {
			et.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Ze.current ? (e.scrollTop = e.scrollHeight, Je(0), Xe(e.scrollTop > 8)) : n > 0 && Je((e) => e + n);
	}, [$e]);
	function ct() {
		let e = X.current;
		e && (et.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), se?.();
	}
	b(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function lt() {
		let e = Te.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), Ze.current = !0, i(e), De(""));
	}
	function ut(e) {
		!Ge || e.length === 0 || (Ze.current = !0, q?.(e));
	}
	function dt(e) {
		if (!Ge) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), ut(t));
	}
	function ft(e) {
		De((t) => t + e), $(!1);
	}
	function pt() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function mt(e) {
		pt(), e.key === "Enter" && !a && Te.trim() && lt();
	}
	let ht = /* @__PURE__ */ E("div", {
		"data-testid": "chat-panel",
		className: e(we ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Y ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Se && /* @__PURE__ */ E("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Y ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ T("span", {
				style: l,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: tt
			}),
			/* @__PURE__ */ E("div", {
				className: e("relative flex flex-col mb-2", we ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ T("div", {
					ref: X,
					onScroll: st,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Ye && "fade-top", we ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ E("div", {
						className: "mt-auto",
						children: [
							Ve && n.length > 0 && /* @__PURE__ */ T("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ T("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: ct,
									disabled: le,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Y ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: le ? "Loading…" : "Load earlier messages"
								})
							}),
							Ke.length === 0 ? u ?? /* @__PURE__ */ T("div", {
								className: e("text-sm", Y ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : Ke.map((n, r) => {
								let i = ze(Ke[r - 1]), a = n.kind === "message" ? n.message.timestamp : n.local.timestamp, o = j(a, i) ? /* @__PURE__ */ T(je, {
									timestamp: a,
									tone: K
								}, `day:${a}:${r}`) : null;
								if (n.kind === "local") {
									let r = n.local, i = _e(r.metadata);
									return /* @__PURE__ */ E(y, { children: [o, /* @__PURE__ */ T("div", {
										"data-testid": "chat-local-message",
										"data-local-message-id": r.id,
										className: "rounded-md",
										children: /* @__PURE__ */ T(ee, {
											author: r.displayName,
											timestamp: r.timestamp,
											tone: K,
											mine: !0,
											content: /* @__PURE__ */ E(w, { children: [
												i ? /* @__PURE__ */ T(ge, {
													runId: i.runId,
													instruction: i.instruction || r.content,
													command: i.command,
													agentName: i.agentName,
													requestedBy: r.displayName,
													status: I?.(i.runId),
													onOpenDocument: G && i.documentId ? () => G(i.documentId) : void 0,
													documentTitle: i.documentTitle,
													onOpenRun: L,
													result: i.result,
													onOpenResult: R,
													onDecide: z,
													suggestion: i.suggestionKey ? {
														key: i.suggestionKey,
														...i.documentId ? { documentId: i.documentId } : {}
													} : void 0,
													onReview: te
												}) : /* @__PURE__ */ T(V, { text: r.content }),
												/* @__PURE__ */ T("div", {
													"data-testid": "chat-local-message-note",
													className: e("mt-1 text-[11px] italic", Y ? "text-white/50" : "text-text-tertiary"),
													children: r.note ?? "Only you can see this"
												}),
												r.actions && r.actions.length > 0 && /* @__PURE__ */ T("div", {
													className: "mt-1.5 flex flex-wrap gap-1.5",
													"data-testid": "chat-local-message-actions",
													children: r.actions.map((e) => /* @__PURE__ */ T(t, {
														type: "button",
														size: "sm",
														variant: e.primary ? "primary" : "ghost",
														onClick: e.onSelect,
														children: e.label
													}, e.id))
												})
											] })
										})
									})] }, `local:${r.id}`);
								}
								let { message: s } = n, c = s.displayName ?? s.clientId.slice(0, 8), l = s.attachments ?? [], u = s.metadata?.html, d = typeof u == "string" ? u : void 0, f = /* @__PURE__ */ T(V, {
									html: d,
									text: s.content
								}), p = Pe(s.metadata), m = _e(s.metadata), h = Le(s.metadata), g = Re(s.metadata), _ = Ie(s.metadata), b = Fe(s.metadata), S = m ? /* @__PURE__ */ T(ge, {
									runId: m.runId,
									instruction: m.instruction || s.content.replace(/^\/doc\s*/i, ""),
									command: m.command,
									agentName: m.agentName,
									requestedBy: s.displayName,
									status: I?.(m.runId),
									onOpenDocument: G && m.documentId ? () => G(m.documentId) : void 0,
									documentTitle: m.documentTitle,
									onOpenRun: L,
									result: m.result,
									onOpenResult: R,
									onDecide: z,
									suggestion: m.suggestionKey ? {
										key: m.suggestionKey,
										...m.documentId ? { documentId: m.documentId } : {}
									} : void 0,
									onReview: te
								}) : g ? /* @__PURE__ */ T(oe, {
									recordingId: g.recordingId,
									title: g.title,
									recordedBy: (typeof s.metadata?.recordedBy == "string" ? s.metadata.recordedBy : void 0) ?? s.displayName,
									startedAt: g.startedAt,
									durationMs: g.durationMs,
									thumbnailUrl: g.thumbnailUrl,
									participantCount: g.participantCount,
									status: g.status,
									expiresAt: g.expiresAt,
									onOpen: U,
									onCopyLink: W
								}) : h ? /* @__PURE__ */ T(re, {
									callId: h.callId,
									startedBy: (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									participants: F?.(h.callId) ?? h.participants,
									live: h.live,
									durationMs: h.durationMs,
									audioOnly: h.audioOnly,
									recorded: h.recorded,
									notRecordedReason: h.notRecordedReason,
									lobbyName: h.lobbyName,
									onJoin: B
								}) : p ? /* @__PURE__ */ T(H, {
									documentId: p.documentId,
									title: p.title || s.content,
									icon: p.icon,
									createdBy: p.createdBy ?? (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									editors: P?.(p.documentId) ?? [],
									onOpen: G
								}) : l.length === 0 ? f : /* @__PURE__ */ E(w, { children: [(s.content || d) && f, l.map((e) => /* @__PURE__ */ T(Oe, {
									attachment: e,
									src: fe?.(e),
									onOpen: pe
								}, e.id))] }), C = s.id ?? "", ie = C && x ? x(C) : [], ae = s.metadata?.replyTo, se = !!C && !!A?.has(C), ce = !!v && s.userId === v, le = s.metadata?.system === !0, q = /* @__PURE__ */ E(w, { children: [
									ae && /* @__PURE__ */ T(Ee, {
										quote: ae,
										onJump: M,
										className: "mb-1"
									}),
									se && /* @__PURE__ */ T("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									S,
									b.length > 0 && /* @__PURE__ */ T("div", {
										className: "mt-1 flex flex-wrap gap-1",
										"data-testid": "chat-message-docrefs",
										children: b.map((e) => /* @__PURE__ */ T(ne, {
											documentId: e.id,
											label: e.label,
											icon: e.icon,
											onOpen: G
										}, e.id))
									}),
									_ && /* @__PURE__ */ E("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											_.labels.length > 0 ? `Too large to send: ${_.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									ie.length > 0 && v && D && /* @__PURE__ */ T(be, {
										reactions: ie,
										currentUserId: v,
										onToggle: (e) => D(C, e)
									})
								] });
								return /* @__PURE__ */ E(y, { children: [o, /* @__PURE__ */ E("div", {
									"data-testid": "chat-message",
									"data-message-id": C || void 0,
									className: e("group relative rounded-md transition-colors hover:bg-surface-hover", C && C === N && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ T(ee, {
										author: c,
										content: q,
										timestamp: s.timestamp,
										avatarUrl: s.avatarUrl,
										tone: K,
										mine: ce
									}), C && (D || !le && (O || k)) && /* @__PURE__ */ T(Ce, {
										className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
										onReact: D ? (e) => D(C, e) : void 0,
										onReply: O && !le ? () => O(s) : void 0,
										onTogglePin: k && !le ? () => k(s) : void 0,
										pinned: se
									})]
								})] }, s.id ?? r);
							}),
							J.map((e) => /* @__PURE__ */ T(ee, {
								author: e.actor,
								timestamp: "",
								tone: K,
								content: /* @__PURE__ */ T(Ae, {
									transfer: e,
									mine: ke(e, v, ue),
									onCancel: de
								})
							}, e.transferId))
						]
					})
				}), qe > 0 && /* @__PURE__ */ E("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: ot,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Y ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						qe,
						" new message",
						qe === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			c.length > 0 && /* @__PURE__ */ T(s, {
				names: c,
				className: e("mb-1 mt-1 shrink-0 italic", Y ? "text-white/50" : "text-text-secondary")
			}),
			p ? /* @__PURE__ */ T("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? pt : void 0,
				children: p
			}) : /* @__PURE__ */ E("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					q && /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Ge,
						onClick: () => Ue.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Y ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ T(He, {})
					}), /* @__PURE__ */ T(m, {
						ref: Ue,
						multiple: !0,
						accept: me,
						onFiles: (e) => {
							let t = he ? e.filter((e) => e.size > he) : [];
							t.length > 0 && ve?.(`Skipped ${t.length} file(s) over the size limit.`), ut(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ T("button", {
						ref: We,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Q,
						title: "Insert emoji",
						disabled: a,
						onClick: () => $((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Y ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ T("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ T(h, {
						open: Q,
						onSelect: ft,
						onClose: () => $(!1),
						triggerRef: We,
						emojis: ye
					}),
					/* @__PURE__ */ T(f, {
						size: "sm",
						value: Te,
						onChange: (e) => De(e.target.value),
						onKeyDown: mt,
						onPaste: dt,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Y && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ T(t, {
						variant: "primary",
						size: "sm",
						onClick: lt,
						disabled: a || !Te.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return q ? /* @__PURE__ */ T(g, {
		onFiles: ut,
		accept: me,
		maxSize: he,
		onError: ve,
		disabled: a,
		className: we ? "flex h-full min-h-0 flex-col" : void 0,
		children: ht
	}) : ht;
}
function He() {
	return /* @__PURE__ */ T("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ T("path", {
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
function Ue(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function We({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ E("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ E("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ T("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ T("div", { children: e.map((e) => {
			let n = O(Ue(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = k(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ E("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ T("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ T("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ T("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ T("span", {
						className: "text-text-tertiary italic",
						children: "typing..."
					})
				]
			}, e.clientId);
		}) })]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function Q({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ E("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ T("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ T("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ E("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ T("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ T("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ T("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
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
function Ge({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ T("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ T("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function Ke({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ T(Ge, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ T(o, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ T(Q, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ T(p, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				$(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ T("button", {
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
function qe({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ T(Ge, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ T(o, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = De(e.attachment);
			return /* @__PURE__ */ T(Q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ T("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ T("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					v(e.attachment.size),
					$(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Je({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ T(Ge, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ T(o, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ T(Q, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ E("span", {
				className: "relative",
				children: [/* @__PURE__ */ T(p, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ T("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				$(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Ye(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Xe(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Ze({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ T(Ge, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ T(o, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ T(Q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ T("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ T("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [$(e.startedAt), Ye(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Xe(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Qe({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ E("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ T("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ E("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [s, t.length === 0 ? /* @__PURE__ */ T(o, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ T("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ T(Q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ T("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					$(e.updatedAt),
					e.activeEditors ? `${e.activeEditors} editing` : ""
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var $e = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], et = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function tt({ name: t, description: r, online: i, avatarUrl: a, features: o = $e, children: s, canvas: l, files: d = [], thumbnailSrc: f, documents: p = [], onOpenDocument: m, onCreateDocument: h, pins: g = [], onUnpin: _, mentions: v = [], onOpenMention: y, recordings: b = [], onOpenRecording: x, onJumpToMessage: S, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: M, callInProgress: N = !1, headerActions: P, view: F, onViewChange: ee, className: I, "data-testid": L = "conversation-surface" }) {
	let R = new Set(o), [z, te] = C("chat"), B = F ?? z, V = R.has(B) ? B : o[0] ?? "chat", H = (e) => {
		F === void 0 && te(e), ee?.(e);
	}, U = (e) => e || void 0, ne = o.filter((e) => et[e]).map((e) => ({
		id: e,
		label: et[e],
		badge: e === "files" ? U(d.length) : e === "documents" ? U(p.length) : e === "pins" ? U(g.length) : e === "calls" ? U(b.length) : e === "mentions" ? U(v.filter((e) => e.unread).length) : void 0
	})), W = (e) => {
		H("chat"), S?.(e);
	};
	return /* @__PURE__ */ E("section", {
		className: e("flex min-w-0 flex-col", I),
		"data-testid": L,
		children: [
			/* @__PURE__ */ T(u, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${L}-header`,
				tabs: ne.length > 1 ? /* @__PURE__ */ T(c, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: V,
					onValueChange: (e) => H(e),
					items: ne
				}) : void 0,
				actions: D || k || P ? /* @__PURE__ */ E(w, { children: [
					D && (O ? /* @__PURE__ */ T(n, {
						"aria-label": N ? "Join the call" : "Start a call",
						title: N ? "Join the call" : "Start a call",
						"data-testid": `${L}-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => D(!1),
						children: "📞"
					}) : /* @__PURE__ */ E(w, { children: [/* @__PURE__ */ T(n, {
						"aria-label": N ? "Join the call with audio" : "Start an audio call",
						title: N ? "Join with audio" : "Audio call",
						"data-testid": `${L}-audio-call`,
						onClick: () => D(!0),
						children: "📞"
					}), /* @__PURE__ */ T(n, {
						"aria-label": N ? "Join the call with video" : "Start a video call",
						title: N ? "Join with video" : "Video call",
						"data-testid": `${L}-video-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => D(!1),
						children: "🎥"
					})] })),
					k && /* @__PURE__ */ T(nt, {
						testId: `${L}-watch`,
						label: A,
						hint: j,
						viewerCount: M,
						onClick: k
					}),
					P
				] }) : void 0
			}),
			R.has("files") && V === "files" && /* @__PURE__ */ T(qe, {
				className: "min-h-0 flex-1",
				files: d,
				thumbnailSrc: f,
				onJump: S ? W : void 0
			}),
			R.has("documents") && V === "documents" && /* @__PURE__ */ T(Qe, {
				className: "min-h-0 flex-1",
				documents: p,
				onOpen: m,
				onCreate: h
			}),
			R.has("pins") && V === "pins" && /* @__PURE__ */ T(Ke, {
				className: "min-h-0 flex-1",
				pins: g,
				onUnpin: _,
				onJump: S ? W : void 0
			}),
			R.has("mentions") && V === "mentions" && /* @__PURE__ */ T(Je, {
				className: "min-h-0 flex-1",
				mentions: v,
				onJump: y ? (e, t) => {
					H("chat"), y(e, t);
				} : void 0
			}),
			R.has("calls") && V === "calls" && /* @__PURE__ */ T(Ze, {
				className: "min-h-0 flex-1",
				recordings: b,
				onOpen: x
			}),
			R.has("chat") && /* @__PURE__ */ E("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${L}-chat`,
				hidden: V !== "chat",
				children: [l && /* @__PURE__ */ T("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${L}-canvas`,
					children: l
				}), /* @__PURE__ */ T("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function nt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ E(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? rt,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ T("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ T("span", { children: o }),
			s && /* @__PURE__ */ T("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var rt = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { me as A, F as B, be as C, ge as D, he as E, W as F, j as G, M as H, ne as I, O as K, H as L, oe as M, re as N, _e as O, G as P, V as R, Ce as S, ye as T, N as U, A as V, P as W, Oe as _, Je as a, Ee as b, Ye as c, Le as d, Pe as f, je as g, Ie as h, qe as i, de as j, ve as k, We as l, Re as m, tt as n, Ze as o, Fe as p, k as q, Qe as r, Ke as s, $e as t, Ve as u, Ae as v, Y as w, we as x, De as y, ee as z };
