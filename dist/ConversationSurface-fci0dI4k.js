import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./Chip-YhQI5B9P.js";
import { t as i } from "./EmptyState-JzzL2z1E.js";
import { n as a, o, s, t as c } from "./ChannelHeader-C0n2KYEb.js";
import { n as l } from "./DockedPanelContext-pH9A5z1h.js";
import { t as u } from "./Input-DLknWXri.js";
import { t as d } from "./Avatar-BzicCOft.js";
import { t as f } from "./PresenceAvatars-BkzMACtv.js";
import { i as p, n as m, r as h, t as g } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as _ } from "./formatBytes-05ivRSJY.js";
import { Fragment as ee, useEffect as v, useMemo as y, useRef as b, useState as x } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
//#region src/utils/identity.ts
var T = [
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
function E(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return T[Math.abs(t) % T.length];
}
function D(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function O(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function k(e, t) {
	let n = O(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = O(t);
	return r ? n !== r : !1;
}
function A(e, t = /* @__PURE__ */ new Date()) {
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
function j(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function M(e) {
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
function N(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function P({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", className: u }) {
	let f = l === "dark", p = N(r), m = !o || !!p;
	return /* @__PURE__ */ w("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", u),
		children: [/* @__PURE__ */ C("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ C(d, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ w("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ w("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ C("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ C("time", {
						"data-testid": "message-row-time",
						dateTime: r,
						title: M(r),
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ C("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ C("div", {
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
var te = /* @__PURE__ */ new Set([
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
]), F = /^(https?:|mailto:)/i;
function I(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || F.test(t) ? t : null;
}
function L(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => L(e, `${t}-${n}`));
	if (!te.has(n.tagName)) return /* @__PURE__ */ C("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ C("br", {}, t);
		case "A": {
			let e = I(n.getAttribute("href"));
			return e ? /* @__PURE__ */ C("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ C("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ C("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ C(e, { children: r }, t);
		}
	}
}
var R = /```([\s\S]*?)```|`([^`\n]+)`/g;
function ne(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (R.lastIndex = 0; (r = R.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ C("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ C("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ C("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function z({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = y(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => L(e, `n${t}`));
	}, [t]), o = y(() => ne(n ?? ""), [n]);
	return /* @__PURE__ */ C("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function B({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ w("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ w("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ C("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ C("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${V(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ C("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ C(f, {
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
			o && /* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function V(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function H({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ w("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ C("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ C("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function U(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function W(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function re(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ie({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": p = "call-activity-card" }) {
	let m = !i && typeof a == "number" ? U(a) : "", h = o === void 0 ? "Call" : o ? "Audio call" : "Video call", g = i ? W(r, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ w("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ w("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ C("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ C("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && s === !1 && /* @__PURE__ */ C("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: re(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ C("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ C(f, {
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
			i && u && /* @__PURE__ */ C("button", {
				type: "button",
				"data-testid": `${p}-join`,
				onClick: () => u(t),
				className: "shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white hover:opacity-90",
				children: "Join"
			})
		]
	});
}
//#endregion
//#region src/components/social/AgentRunCard.tsx
var ae = [
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
], oe = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, se = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, G = 6;
function K(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function ce(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function le(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${K(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${K(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${K(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${ce(e.index)}`;
		case "deleteBlock": return `Removed block ${ce(e.index)}`;
		case "appendMacro": return t ? `Added a ${K(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${ce(e.index)}`;
		case "setDocumentType": return `Type: ${K(t, 40)}`;
		case "skip": return t ? K(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${K(t)}` : e.op;
	}
}
function ue(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function de(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function fe(e) {
	if (!e?.startedAt) return null;
	let t = ue(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? de(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var pe = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function me({ runId: i, instruction: a, agentName: o, requestedBy: s, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: ee = !1, className: v, "data-testid": y = "agent-run-card" }) {
	let b = l?.phase ?? "received", [S, T] = x(ee), E = b === "completed" ? l?.suggestion ?? h : void 0, D = b === "completed" ? l?.review : void 0, O = !!E && !D, k = b === "completed" && l?.noop === !0, A = b === "completed" ? l?.result ?? f : void 0, j = A?.kind === "link" && A.label ? A.label : "Open", M = u && !(A?.kind === "document" && p), N = oe[b], P = b === "failed" || b === "rejected", te = P ? "danger" : D ? D.decision === "accept" ? "success" : "neutral" : k ? "warning" : b === "completed" ? E ? "warning" : "success" : b === "awaiting_approval" ? "warning" : "info", F = D ? "Reviewed" : O ? "Suggested" : k ? "No change" : se[b], I = D ? D.byName ?? D.by : void 0, L = D ? `${D.decision === "accept" ? "Accepted" : "Rejected"} by ${I}` : void 0, R = b === "awaiting_approval", ne = b === "running" ? l?.stepLabel ? `${o} — ${l.stepLabel}` : `${o} is working via the pipeline` : R ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : L ?? l?.detail ?? (O && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : b === "received" ? "Received" : F), z = l?.details, B = z?.ops ?? [], V = z?.steps ?? [], H = z?.document?.title || _ || "Document", U = !!z?.document || !!u, W = z?.error ?? (b === "failed" ? l?.detail : void 0), re = fe(z), ie = `${y}-details-${i}`;
	return /* @__PURE__ */ w("div", {
		className: e("flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", v),
		"data-testid": y,
		"data-phase": b,
		"data-run-id": i,
		"data-expanded": S ? "true" : void 0,
		title: s ? `${s} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || T((e) => !e);
		},
		children: [
			/* @__PURE__ */ w("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ C("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ w("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${y}-instruction`,
						children: [
							/* @__PURE__ */ C("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							a
						]
					}),
					/* @__PURE__ */ C(r, {
						size: "xs",
						tone: te,
						"data-testid": `${y}-phase`,
						children: F
					}),
					/* @__PURE__ */ C(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? ie : void 0,
						onClick: () => T((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${y}-toggle`,
						icon: /* @__PURE__ */ C("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", S && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ w("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ C("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${y}-steps`,
						children: ae.map((t, n) => {
							let r = P ? n < N : n < N || n === N && b === "completed", i = n === N && b !== "completed" && !P, a = P && n === N;
							return /* @__PURE__ */ w("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ C("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? k && n === N ? "bg-warning" : "bg-success" : i ? R ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ C("span", {
									className: "sr-only",
									children: a ? F : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ C("span", {
						className: e("min-w-0 flex-1 truncate", D && (D.decision === "accept" ? "text-success" : "text-text-tertiary"), b === "failed" && "text-danger", k && "text-warning-fg"),
						"data-testid": `${y}-detail`,
						"data-review": D?.decision,
						title: l?.detail,
						children: ne
					}),
					O && E && g && /* @__PURE__ */ w("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-review`,
						children: [/* @__PURE__ */ C(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(i, "accept", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${y}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ C(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(i, "reject", {
								key: E.key,
								...E.documentId ? { documentId: E.documentId } : {}
							}),
							"data-testid": `${y}-reject-review`,
							children: "Reject"
						})]
					}),
					R && m && /* @__PURE__ */ w("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-decide`,
						children: [/* @__PURE__ */ C(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(i, "approve"),
							"data-testid": `${y}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ C(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(i, "reject"),
							"data-testid": `${y}-reject`,
							children: "Reject"
						})]
					}),
					A && p && /* @__PURE__ */ C("button", {
						type: "button",
						onClick: () => p(A),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": A.kind,
						children: j
					}),
					A?.kind === "link" && !p && /* @__PURE__ */ C("a", {
						href: A.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": "link",
						children: j
					}),
					d && /* @__PURE__ */ C("button", {
						type: "button",
						onClick: () => d(i),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-run`,
						children: "run"
					}),
					M && /* @__PURE__ */ C("button", {
						type: "button",
						onClick: u,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-document`,
						children: "document"
					})
				]
			}),
			S && /* @__PURE__ */ w("div", {
				id: ie,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${y}-details`,
				children: [
					U && /* @__PURE__ */ w("div", {
						className: "flex items-start gap-2",
						"data-testid": `${y}-details-document`,
						children: [
							/* @__PURE__ */ C("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ w("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ C("span", {
									className: "block truncate font-medium text-text-primary",
									children: H
								}), z?.document?.snippet && /* @__PURE__ */ C("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${y}-details-snippet`,
									children: z.document.snippet
								})]
							}),
							u && /* @__PURE__ */ C(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${y}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					B.length > 0 && /* @__PURE__ */ w("div", {
						"data-testid": `${y}-details-ops`,
						children: [
							/* @__PURE__ */ C("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ C("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: B.slice(0, G).map((e, t) => /* @__PURE__ */ C("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: le(e)
								}, t))
							}),
							B.length > G && /* @__PURE__ */ w("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${y}-details-more-ops`,
								children: [
									"+",
									B.length - G,
									" more"
								]
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ C("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${y}-details-steps`,
						children: V.map((t) => /* @__PURE__ */ w("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ C("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", pe[t.status] ?? pe.pending)
							}), /* @__PURE__ */ C("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					W && /* @__PURE__ */ C("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${y}-details-error`,
						children: W
					}),
					/* @__PURE__ */ w("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ C("button", {
								type: "button",
								onClick: () => d(i),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${y}-details-open-run`,
								children: "Open run"
							}),
							A && p && /* @__PURE__ */ C("button", {
								type: "button",
								onClick: () => p(A),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${y}-details-open-result`,
								children: j
							}),
							re && /* @__PURE__ */ C("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${y}-details-timings`,
								children: re
							})
						]
					})
				]
			})
		]
	});
}
function he(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ge(e.result);
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
function ge(e) {
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
function _e(e, t) {
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
function q(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ve({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = y(() => _e(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ C("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ w("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: q(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ C("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var ye = [
	"👍",
	"🎉",
	"❤️"
], be = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function xe({ quickReactions: t = ye, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ C("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${be}`,
		children: n
	}, r);
	return /* @__PURE__ */ w("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function Se(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Ce(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function we({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ w("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ C("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ C("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Ce(t.timestamp)
		})]
	}), /* @__PURE__ */ C("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Se(t.text)
	})] });
	return /* @__PURE__ */ w("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ C("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ C("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ C("button", {
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
function Te(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function Ee({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Te(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ w("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ C("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ C("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ C("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ C("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ w("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ C("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ C("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: _(t.size)
			})]
		})]
	}) : /* @__PURE__ */ C("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ w("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ C(J, {}), /* @__PURE__ */ w("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ C("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ C("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: _(t.size)
				})]
			})]
		})
	});
}
function De(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Oe({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : _(o);
	return /* @__PURE__ */ w("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ C("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ C(J, {}),
			/* @__PURE__ */ w("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ w("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ C("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ C("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ C("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ C("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ C("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ C("button", {
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
function J() {
	return /* @__PURE__ */ C("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ C("path", {
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
function ke({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = A(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ w("div", {
		role: "separator",
		"aria-label": j(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ C("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ C("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ C("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Ae(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function je(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Me(e) {
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
function Ne(e) {
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
var Y = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Pe(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Y[e] ?? e)
	};
}
function Fe(e) {
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
function Ie(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Le(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Ie(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Re({ messages: n, localMessages: r = [], onSend: i, disabled: o = !1, onTyping: c, typingUsers: d = [], composer: f, currentUserId: _, reactionsFor: y, onToggleReaction: T, onReply: E, onTogglePin: D, pinnedMessageIds: O, onJumpToMessage: A, highlightedMessageId: j, documentEditors: M, callParticipants: N, agentRunStatus: te, onOpenRun: F, onOpenResult: I, onDecideRun: L, onReviewRun: R, onJoinCall: ne, onOpenDocument: V, tone: U = "light", showHeader: W, fill: re, onLoadMore: ae, hasMore: oe, loadingMore: se = !1, onSendFiles: G, transfers: K = [], currentActor: ce, onCancelTransfer: le, attachmentSrc: ue, onOpenAttachment: de, acceptFiles: fe, maxFileSize: pe, onFileError: ge, emojis: _e = g }) {
	let q = U === "dark", ye = l(), be = W ?? !(ye?.hasHeader ?? !1), Se = re ?? ye?.fillsHeight ?? !1, [Ce, Te] = x(""), J = b(null), Y = b(null), Re = !!ae && oe !== !1, Be = b(null), Ve = b(null), [X, Z] = x(!1), Q = !!G && !o, He = Le(n, r), [Ue, We] = x(0), [Ge, Ke] = x(!1), $ = b(!0), qe = b(n.length), Je = n.length + r.length + K.length, Ye = b(null), [Xe, Ze] = x(""), Qe = b(null), $e = b(!1), et = b(0);
	v(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!$e.current) {
			$e.current = !0, Qe.current = t;
			return;
		}
		if (t === Qe.current || (Qe.current = t, _ && e.userId === _)) return;
		et.current += 1;
		let r = et.current % 2 == 0 ? "​" : "";
		Ze(je(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, _]);
	function tt() {
		let e = J.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, We(0));
	}
	function nt() {
		let e = J.current;
		if (!e) return;
		let t = Ae(e);
		$.current = t, t && We(0), Ke(e.scrollTop > 8);
	}
	v(() => {
		let e = J.current, t = qe.current, n = Je - t;
		if (qe.current = Je, !e) return;
		let r = Ye.current;
		if (r && n > 0) {
			Ye.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, We(0), Ke(e.scrollTop > 8)) : n > 0 && We((e) => e + n);
	}, [Je]);
	function rt() {
		let e = J.current;
		e && (Ye.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), ae?.();
	}
	v(() => () => {
		Y.current && clearTimeout(Y.current);
	}, []);
	function it() {
		let e = Ce.trim();
		!e || o || (Y.current && clearTimeout(Y.current), Y.current = null, c?.(!1), $.current = !0, i(e), Te(""));
	}
	function at(e) {
		!Q || e.length === 0 || ($.current = !0, G?.(e));
	}
	function ot(e) {
		if (!Q) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), at(t));
	}
	function st(e) {
		Te((t) => t + e), Z(!1);
	}
	function ct() {
		o || (c?.(!0), Y.current && clearTimeout(Y.current), Y.current = setTimeout(() => c?.(!1), 2e3));
	}
	function lt(e) {
		ct(), e.key === "Enter" && !o && Ce.trim() && it();
	}
	let ut = /* @__PURE__ */ w("div", {
		"data-testid": "chat-panel",
		className: e(Se ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			be && /* @__PURE__ */ w("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", q ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ C("span", {
				style: s,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Xe
			}),
			/* @__PURE__ */ w("div", {
				className: e("relative flex flex-col mb-2", Se ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ C("div", {
					ref: J,
					onScroll: nt,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Ge && "fade-top", Se ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ w("div", {
						className: "mt-auto",
						children: [
							Re && n.length > 0 && /* @__PURE__ */ C("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ C("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: rt,
									disabled: se,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: se ? "Loading…" : "Load earlier messages"
								})
							}),
							He.length === 0 ? /* @__PURE__ */ C("div", {
								className: e("text-sm", q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : He.map((n, r) => {
								let i = Ie(He[r - 1]), a = n.kind === "message" ? n.message.timestamp : n.local.timestamp, o = k(a, i) ? /* @__PURE__ */ C(ke, {
									timestamp: a,
									tone: U
								}, `day:${a}:${r}`) : null;
								if (n.kind === "local") {
									let r = n.local, i = he(r.metadata);
									return /* @__PURE__ */ w(ee, { children: [o, /* @__PURE__ */ C("div", {
										"data-testid": "chat-local-message",
										"data-local-message-id": r.id,
										className: "rounded-md",
										children: /* @__PURE__ */ C(P, {
											author: r.displayName,
											timestamp: r.timestamp,
											tone: U,
											mine: !0,
											content: /* @__PURE__ */ w(S, { children: [
												i ? /* @__PURE__ */ C(me, {
													runId: i.runId,
													instruction: i.instruction || r.content,
													command: i.command,
													agentName: i.agentName,
													requestedBy: r.displayName,
													status: te?.(i.runId),
													onOpenDocument: V && i.documentId ? () => V(i.documentId) : void 0,
													documentTitle: i.documentTitle,
													onOpenRun: F,
													result: i.result,
													onOpenResult: I,
													onDecide: L,
													suggestion: i.suggestionKey ? {
														key: i.suggestionKey,
														...i.documentId ? { documentId: i.documentId } : {}
													} : void 0,
													onReview: R
												}) : /* @__PURE__ */ C(z, { text: r.content }),
												/* @__PURE__ */ C("div", {
													"data-testid": "chat-local-message-note",
													className: e("mt-1 text-[11px] italic", q ? "text-white/50" : "text-text-tertiary"),
													children: r.note ?? "Only you can see this"
												}),
												r.actions && r.actions.length > 0 && /* @__PURE__ */ C("div", {
													className: "mt-1.5 flex flex-wrap gap-1.5",
													"data-testid": "chat-local-message-actions",
													children: r.actions.map((e) => /* @__PURE__ */ C(t, {
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
								let { message: s } = n, c = s.displayName ?? s.clientId.slice(0, 8), l = s.attachments ?? [], u = s.metadata?.html, d = typeof u == "string" ? u : void 0, f = /* @__PURE__ */ C(z, {
									html: d,
									text: s.content
								}), p = Me(s.metadata), m = he(s.metadata), h = Fe(s.metadata), g = Pe(s.metadata), v = Ne(s.metadata), b = m ? /* @__PURE__ */ C(me, {
									runId: m.runId,
									instruction: m.instruction || s.content.replace(/^\/doc\s*/i, ""),
									command: m.command,
									agentName: m.agentName,
									requestedBy: s.displayName,
									status: te?.(m.runId),
									onOpenDocument: V && m.documentId ? () => V(m.documentId) : void 0,
									documentTitle: m.documentTitle,
									onOpenRun: F,
									result: m.result,
									onOpenResult: I,
									onDecide: L,
									suggestion: m.suggestionKey ? {
										key: m.suggestionKey,
										...m.documentId ? { documentId: m.documentId } : {}
									} : void 0,
									onReview: R
								}) : h ? /* @__PURE__ */ C(ie, {
									callId: h.callId,
									startedBy: (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									participants: N?.(h.callId) ?? h.participants,
									live: h.live,
									durationMs: h.durationMs,
									audioOnly: h.audioOnly,
									recorded: h.recorded,
									notRecordedReason: h.notRecordedReason,
									lobbyName: h.lobbyName,
									onJoin: ne
								}) : p ? /* @__PURE__ */ C(B, {
									documentId: p.documentId,
									title: p.title || s.content,
									icon: p.icon,
									createdBy: p.createdBy ?? (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									editors: M?.(p.documentId) ?? [],
									onOpen: V
								}) : l.length === 0 ? f : /* @__PURE__ */ w(S, { children: [(s.content || d) && f, l.map((e) => /* @__PURE__ */ C(Ee, {
									attachment: e,
									src: ue?.(e),
									onOpen: de
								}, e.id))] }), x = s.id ?? "", W = x && y ? y(x) : [], re = s.metadata?.replyTo, ae = !!x && !!O?.has(x), oe = !!_ && s.userId === _, se = s.metadata?.system === !0, G = /* @__PURE__ */ w(S, { children: [
									re && /* @__PURE__ */ C(we, {
										quote: re,
										onJump: A,
										className: "mb-1"
									}),
									ae && /* @__PURE__ */ C("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									b,
									v.length > 0 && /* @__PURE__ */ C("div", {
										className: "mt-1 flex flex-wrap gap-1",
										"data-testid": "chat-message-docrefs",
										children: v.map((e) => /* @__PURE__ */ C(H, {
											documentId: e.id,
											label: e.label,
											icon: e.icon,
											onOpen: V
										}, e.id))
									}),
									g && /* @__PURE__ */ w("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											g.labels.length > 0 ? `Too large to send: ${g.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									W.length > 0 && _ && T && /* @__PURE__ */ C(ve, {
										reactions: W,
										currentUserId: _,
										onToggle: (e) => T(x, e)
									})
								] });
								return /* @__PURE__ */ w(ee, { children: [o, /* @__PURE__ */ w("div", {
									"data-testid": "chat-message",
									"data-message-id": x || void 0,
									className: e("group relative rounded-md", x && x === j && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ C(P, {
										author: c,
										content: G,
										timestamp: s.timestamp,
										avatarUrl: s.avatarUrl,
										tone: U,
										mine: oe
									}), x && (T || !se && (E || D)) && /* @__PURE__ */ C(xe, {
										className: e("absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100", oe ? "right-14" : "left-14"),
										onReact: T ? (e) => T(x, e) : void 0,
										onReply: E && !se ? () => E(s) : void 0,
										onTogglePin: D && !se ? () => D(s) : void 0,
										pinned: ae
									})]
								})] }, s.id ?? r);
							}),
							K.map((e) => /* @__PURE__ */ C(P, {
								author: e.actor,
								timestamp: "",
								tone: U,
								content: /* @__PURE__ */ C(Oe, {
									transfer: e,
									mine: De(e, _, ce),
									onCancel: le
								})
							}, e.transferId))
						]
					})
				}), Ue > 0 && /* @__PURE__ */ w("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: tt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", q ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Ue,
						" new message",
						Ue === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			d.length > 0 && /* @__PURE__ */ C(a, {
				names: d,
				className: e("mb-1 mt-1 shrink-0 italic", q ? "text-white/50" : "text-text-secondary")
			}),
			f ? /* @__PURE__ */ C("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: c ? ct : void 0,
				children: f
			}) : /* @__PURE__ */ w("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					G && /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Q,
						onClick: () => Be.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ C(ze, {})
					}), /* @__PURE__ */ C(p, {
						ref: Be,
						multiple: !0,
						accept: fe,
						onFiles: (e) => {
							let t = pe ? e.filter((e) => e.size > pe) : [];
							t.length > 0 && ge?.(`Skipped ${t.length} file(s) over the size limit.`), at(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ C("button", {
						ref: Ve,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": X,
						title: "Insert emoji",
						disabled: o,
						onClick: () => Z((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ C("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ C(m, {
						open: X,
						onSelect: st,
						onClose: () => Z(!1),
						triggerRef: Ve,
						emojis: _e
					}),
					/* @__PURE__ */ C(u, {
						size: "sm",
						value: Ce,
						onChange: (e) => Te(e.target.value),
						onKeyDown: lt,
						onPaste: ot,
						disabled: o,
						placeholder: o ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ C(t, {
						variant: "primary",
						size: "sm",
						onClick: it,
						disabled: o || !Ce.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return G ? /* @__PURE__ */ C(h, {
		onFiles: at,
		accept: fe,
		maxSize: pe,
		onError: ge,
		disabled: o,
		className: Se ? "flex h-full min-h-0 flex-col" : void 0,
		children: ut
	}) : ut;
}
function ze() {
	return /* @__PURE__ */ C("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ C("path", {
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
function Be(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Ve({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ w("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ w("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ C("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ C("div", { children: e.map((e) => {
			let n = E(Be(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = D(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ w("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ C("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ C("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ C("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ C("span", {
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
function X({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ w("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ C("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ C("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ w("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ C("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ C("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ C("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function Z(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Q({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ C("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ C("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function He({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ C(Q, {
		empty: e.length === 0,
		className: r,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ C(i, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ C(X, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ C(d, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				Z(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ C("button", {
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
function Ue({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": a = "channel-files-panel" }) {
	return /* @__PURE__ */ C(Q, {
		empty: e.length === 0,
		className: r,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ C(i, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Te(e.attachment);
			return /* @__PURE__ */ C(X, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ C("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					_(e.attachment.size),
					Z(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function We({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ C(Q, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ C(i, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ C(X, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ w("span", {
				className: "relative",
				children: [/* @__PURE__ */ C(d, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ C("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				Z(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Ge(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Ke(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function $({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ C(Q, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ C(i, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ C(X, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ C("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [Z(e.startedAt), Ge(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Ke(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function qe({ documents: t, onOpen: n, onCreate: r, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ w("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ C("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ w("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ C(i, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ C("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ C(X, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					Z(e.updatedAt),
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
var Je = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], Ye = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function Xe({ name: t, description: r, online: i, avatarUrl: a, features: s = Je, children: l, canvas: u, files: d = [], thumbnailSrc: f, documents: p = [], onOpenDocument: m, onCreateDocument: h, pins: g = [], onUnpin: _, mentions: ee = [], onOpenMention: v, recordings: y = [], onOpenRecording: b, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: k, watchHint: A, watchViewerCount: j, callInProgress: M = !1, headerActions: N, view: P, onViewChange: te, className: F, "data-testid": I = "conversation-surface" }) {
	let L = new Set(s), [R, ne] = x("chat"), z = P ?? R, B = L.has(z) ? z : s[0] ?? "chat", V = (e) => {
		P === void 0 && ne(e), te?.(e);
	}, H = (e) => e || void 0, U = s.filter((e) => Ye[e]).map((e) => ({
		id: e,
		label: Ye[e],
		badge: e === "files" ? H(d.length) : e === "documents" ? H(p.length) : e === "pins" ? H(g.length) : e === "calls" ? H(y.length) : e === "mentions" ? H(ee.filter((e) => e.unread).length) : void 0
	})), W = (e) => {
		V("chat"), T?.(e);
	};
	return /* @__PURE__ */ w("section", {
		className: e("flex min-w-0 flex-col", F),
		"data-testid": I,
		children: [
			/* @__PURE__ */ C(c, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${I}-header`,
				tabs: U.length > 1 ? /* @__PURE__ */ C(o, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: B,
					onValueChange: (e) => V(e),
					items: U
				}) : void 0,
				actions: E || O || N ? /* @__PURE__ */ w(S, { children: [
					E && (D ? /* @__PURE__ */ C(n, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${I}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: "📞"
					}) : /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C(n, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${I}-audio-call`,
						onClick: () => E(!0),
						children: "📞"
					}), /* @__PURE__ */ C(n, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${I}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: "🎥"
					})] })),
					O && /* @__PURE__ */ C(Ze, {
						testId: `${I}-watch`,
						label: k,
						hint: A,
						viewerCount: j,
						onClick: O
					}),
					N
				] }) : void 0
			}),
			L.has("files") && B === "files" && /* @__PURE__ */ C(Ue, {
				className: "min-h-0 flex-1",
				files: d,
				thumbnailSrc: f,
				onJump: T ? W : void 0
			}),
			L.has("documents") && B === "documents" && /* @__PURE__ */ C(qe, {
				className: "min-h-0 flex-1",
				documents: p,
				onOpen: m,
				onCreate: h
			}),
			L.has("pins") && B === "pins" && /* @__PURE__ */ C(He, {
				className: "min-h-0 flex-1",
				pins: g,
				onUnpin: _,
				onJump: T ? W : void 0
			}),
			L.has("mentions") && B === "mentions" && /* @__PURE__ */ C(We, {
				className: "min-h-0 flex-1",
				mentions: ee,
				onJump: v ? (e, t) => {
					V("chat"), v(e, t);
				} : void 0
			}),
			L.has("calls") && B === "calls" && /* @__PURE__ */ C($, {
				className: "min-h-0 flex-1",
				recordings: y,
				onOpen: b
			}),
			L.has("chat") && /* @__PURE__ */ w("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${I}-chat`,
				hidden: B !== "chat",
				children: [u && /* @__PURE__ */ C("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${I}-canvas`,
					children: u
				}), /* @__PURE__ */ C("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function Ze({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ w(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Qe,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ C("span", { children: o }),
			s && /* @__PURE__ */ C("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Qe = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { le as A, A as B, q as C, he as D, me as E, B as F, D as G, M as H, z as I, P as L, W as M, U as N, ge as O, H as P, N as R, ve as S, pe as T, k as U, j as V, E as W, Oe as _, We as a, Se as b, Ge as c, Fe as d, Me as f, Ee as g, ke as h, Ue as i, ie as j, fe as k, Ve as l, Pe as m, Xe as n, $ as o, Ne as p, qe as r, He as s, Je as t, Re as u, Te as v, _e as w, xe as x, we as y, O as z };
