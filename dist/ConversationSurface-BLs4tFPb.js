import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-cRZd1Oud.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { t as r } from "./Chip-YhQI5B9P.js";
import { t as i } from "./EmptyState-JzzL2z1E.js";
import { n as a, o, s, t as c } from "./ChannelHeader-Ciy4_sDu.js";
import { n as l } from "./DockedPanelContext-pH9A5z1h.js";
import { t as u } from "./Input-DLknWXri.js";
import { t as d } from "./Avatar-BzicCOft.js";
import { t as f } from "./PresenceAvatars-BkzMACtv.js";
import { i as p, n as m, r as h, t as g } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as _ } from "./formatBytes-05ivRSJY.js";
import { Fragment as v, useEffect as y, useMemo as b, useRef as x, useState as S } from "react";
import { Fragment as C, jsx as w, jsxs as T } from "react/jsx-runtime";
//#region src/utils/identity.ts
var E = [
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
function D(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return E[Math.abs(t) % E.length];
}
function O(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function k(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function A(e, t) {
	let n = k(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = k(t);
	return r ? n !== r : !1;
}
function j(e, t = /* @__PURE__ */ new Date()) {
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
function ee(e) {
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
	return /* @__PURE__ */ T("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", u),
		children: [/* @__PURE__ */ w("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ w(d, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ T("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ T("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [!o && /* @__PURE__ */ w("span", {
						"data-testid": "message-row-author",
						className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
						children: t
					}), p && /* @__PURE__ */ w("time", {
						"data-testid": "message-row-time",
						dateTime: r,
						title: M(r),
						className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
						children: p
					})]
				}),
				/* @__PURE__ */ w("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ w("div", {
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
]), ne = /^(https?:|mailto:)/i;
function F(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ne.test(t) ? t : null;
}
function I(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => I(e, `${t}-${n}`));
	if (!te.has(n.tagName)) return /* @__PURE__ */ w("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ w("br", {}, t);
		case "A": {
			let e = F(n.getAttribute("href"));
			return e ? /* @__PURE__ */ w("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ w("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention");
			return /* @__PURE__ */ w("span", {
				className: e ? "mention" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ w(e, { children: r }, t);
		}
	}
}
var re = /```([\s\S]*?)```|`([^`\n]+)`/g;
function L(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (re.lastIndex = 0; (r = re.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ w("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ w("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ w("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ie({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = b(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => I(e, `n${t}`));
	}, [t]), o = b(() => L(n ?? ""), [n]);
	return /* @__PURE__ */ w("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function R({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": c = "document-activity-card" }) {
	let l = a.length > 0;
	return /* @__PURE__ */ T("div", {
		"data-testid": c,
		"data-document-id": t,
		"data-editing": l ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ T("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ w("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ w("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: l ? `${z(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			l && /* @__PURE__ */ w("span", {
				className: "shrink-0",
				"data-testid": `${c}-editors`,
				children: /* @__PURE__ */ w(f, {
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
			o && /* @__PURE__ */ w("button", {
				type: "button",
				"data-testid": `${c}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function z(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function B(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function V(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function H(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ae({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: c, lobbyName: l, onJoin: u, className: d, "data-testid": p = "call-activity-card" }) {
	let m = !i && typeof a == "number" ? B(a) : "", h = o === void 0 ? "Call" : o ? "Audio call" : "Video call", g = i ? V(r, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ T("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", d),
		children: [
			/* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ T("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ w("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ w("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && s === !1 && /* @__PURE__ */ w("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: H(c, l)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ w("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ w(f, {
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
			i && u && /* @__PURE__ */ w("button", {
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
var oe = [
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
], se = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, U = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
};
function ce({ runId: n, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: p, suggestion: m, onReview: h, className: g, "data-testid": _ = "agent-run-card" }) {
	let v = c?.phase ?? "received", y = v === "completed" ? c?.suggestion ?? m : void 0, b = v === "completed" ? c?.review : void 0, x = !!y && !b, S = v === "completed" ? c?.result ?? d : void 0, C = S?.kind === "link" && S.label ? S.label : "Open", E = l && !(S?.kind === "document" && f), D = se[v], O = v === "failed" || v === "rejected", k = O ? "danger" : b ? b.decision === "accept" ? "success" : "neutral" : v === "completed" ? y ? "warning" : "success" : v === "awaiting_approval" ? "warning" : "info", A = b ? "Reviewed" : x ? "Suggested" : U[v], j = b ? b.byName ?? b.by : void 0, ee = b ? `${b.decision === "accept" ? "Accepted" : "Rejected"} by ${j}` : void 0, M = v === "awaiting_approval";
	return /* @__PURE__ */ T("div", {
		className: e("flex w-full max-w-[36rem] flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", g),
		"data-testid": _,
		"data-phase": v,
		"data-run-id": n,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		children: [/* @__PURE__ */ T("div", {
			className: "flex min-w-0 items-center gap-1.5",
			children: [
				/* @__PURE__ */ w("span", {
					"aria-hidden": "true",
					className: "shrink-0",
					children: "🪄"
				}),
				/* @__PURE__ */ T("span", {
					className: "min-w-0 flex-1 truncate text-text-primary",
					"data-testid": `${_}-instruction`,
					children: [
						/* @__PURE__ */ w("span", {
							className: "font-mono text-text-tertiary",
							children: s
						}),
						" ",
						i
					]
				}),
				/* @__PURE__ */ w(r, {
					size: "xs",
					tone: k,
					"data-testid": `${_}-phase`,
					children: A
				})
			]
		}), /* @__PURE__ */ T("div", {
			className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
			children: [
				/* @__PURE__ */ w("ol", {
					className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
					"aria-label": "Run progress",
					"data-testid": `${_}-steps`,
					children: oe.map((t, n) => {
						let r = O ? n < D : n < D || n === D && v === "completed", i = n === D && v !== "completed" && !O, a = O && n === D;
						return /* @__PURE__ */ T("li", {
							className: "flex items-center",
							title: t.label,
							"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
							children: [/* @__PURE__ */ w("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? "bg-success" : i ? M ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
							}), /* @__PURE__ */ w("span", {
								className: "sr-only",
								children: a ? A : t.label
							})]
						}, t.phase);
					})
				}),
				/* @__PURE__ */ w("span", {
					className: e("min-w-0 flex-1 truncate", b && (b.decision === "accept" ? "text-success" : "text-text-tertiary")),
					"data-testid": `${_}-detail`,
					"data-review": b?.decision,
					children: v === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : M ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : ee ?? c?.detail ?? (x && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : v === "received" ? "Received" : A)
				}),
				x && y && h && /* @__PURE__ */ T("span", {
					className: "flex shrink-0 items-center gap-1",
					"data-testid": `${_}-review`,
					children: [/* @__PURE__ */ w(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => h(n, "accept", {
							key: y.key,
							...y.documentId ? { documentId: y.documentId } : {}
						}),
						"data-testid": `${_}-accept`,
						children: "Accept"
					}), /* @__PURE__ */ w(t, {
						size: "sm",
						variant: "ghost",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => h(n, "reject", {
							key: y.key,
							...y.documentId ? { documentId: y.documentId } : {}
						}),
						"data-testid": `${_}-reject-review`,
						children: "Reject"
					})]
				}),
				M && p && /* @__PURE__ */ T("span", {
					className: "flex shrink-0 items-center gap-1",
					"data-testid": `${_}-decide`,
					children: [/* @__PURE__ */ w(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => p(n, "approve"),
						"data-testid": `${_}-approve`,
						children: "Approve"
					}), /* @__PURE__ */ w(t, {
						size: "sm",
						variant: "ghost",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => p(n, "reject"),
						"data-testid": `${_}-reject`,
						children: "Reject"
					})]
				}),
				S && f && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: () => f(S),
					className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
					"data-testid": `${_}-open-result`,
					"data-result-kind": S.kind,
					children: C
				}),
				S?.kind === "link" && !f && /* @__PURE__ */ w("a", {
					href: S.href,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
					"data-testid": `${_}-open-result`,
					"data-result-kind": "link",
					children: C
				}),
				u && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: () => u(n),
					className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
					"data-testid": `${_}-open-run`,
					children: "run"
				}),
				E && /* @__PURE__ */ w("button", {
					type: "button",
					onClick: l,
					className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
					"data-testid": `${_}-open-document`,
					children: "document"
				})
			]
		})]
	});
}
function le(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ue(e.result);
	return {
		runId: t,
		documentId: n,
		instruction: typeof e.instruction == "string" ? e.instruction : "",
		agentName: typeof e.agentName == "string" && e.agentName ? e.agentName : "Agent",
		command: typeof e.command == "string" && e.command ? e.command : "/doc",
		...typeof e.pipelineId == "string" ? { pipelineId: e.pipelineId } : {},
		...r ? { result: r } : {},
		...typeof e.suggestionKey == "string" && e.suggestionKey ? { suggestionKey: e.suggestionKey } : {}
	};
}
function ue(e) {
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
function de(e, t) {
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
function fe(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function pe({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = b(() => de(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ w("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ T("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: fe(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ w("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var me = [
	"👍",
	"🎉",
	"❤️"
], he = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function ge({ quickReactions: t = me, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: o = !1, onCopyLink: s, onEdit: c, onDelete: l, className: u, "data-testid": d = "message-actions" }) {
	let f = (e, t, n, r) => /* @__PURE__ */ w("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${d}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${he}`,
		children: n
	}, r);
	return /* @__PURE__ */ T("div", {
		"data-testid": d,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", u),
		children: [
			n && t.map((e) => f(`React ${e}`, () => n(e), /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && f("More reactions", r, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && f("Reply", i, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && f(o ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			s && f("Copy link to message", s, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			c && f("Edit", c, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "✎"
			}), "edit"),
			l && f("Delete", l, /* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "🗑"
			}), "delete")
		]
	});
}
//#endregion
//#region src/components/social/QuoteBlock.tsx
function _e(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function ve(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function ye({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ T("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ w("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ w("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: ve(t.timestamp)
		})]
	}), /* @__PURE__ */ w("span", {
		className: "block truncate text-xs text-text-secondary",
		children: _e(t.text)
	})] });
	return /* @__PURE__ */ T("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ w("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ w("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ w("button", {
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
function W(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function be({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = W(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ T("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ w("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ w("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ w("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ w("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ T("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ w("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ w("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: _(t.size)
			})]
		})]
	}) : /* @__PURE__ */ w("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ T("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ w(Ce, {}), /* @__PURE__ */ T("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ w("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ w("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: _(t.size)
				})]
			})]
		})
	});
}
function xe(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Se({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : _(o);
	return /* @__PURE__ */ T("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ w("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ w(Ce, {}),
			/* @__PURE__ */ T("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ T("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ w("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ w("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ w("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ w("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ w("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ w("button", {
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
function Ce() {
	return /* @__PURE__ */ w("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ w("path", {
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
function we({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = j(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ T("div", {
		role: "separator",
		"aria-label": ee(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ w("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ w("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ w("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Te(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Ee(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function De(e) {
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
var G = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Oe(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => G[e] ?? e)
	};
}
function ke(e) {
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
function Ae({ messages: n, onSend: r, disabled: i = !1, onTyping: o, typingUsers: c = [], composer: d, currentUserId: f, reactionsFor: _, onToggleReaction: b, onReply: E, onTogglePin: D, pinnedMessageIds: O, onJumpToMessage: k, highlightedMessageId: j, documentEditors: ee, callParticipants: M, agentRunStatus: N, onOpenRun: te, onOpenResult: ne, onDecideRun: F, onReviewRun: I, onJoinCall: re, onOpenDocument: L, tone: z = "light", showHeader: B, fill: V, onLoadMore: H, hasMore: oe, loadingMore: se = !1, onSendFiles: U, transfers: ue = [], currentActor: de, onCancelTransfer: fe, attachmentSrc: me, onOpenAttachment: he, acceptFiles: _e, maxFileSize: ve, onFileError: W, emojis: Ce = g }) {
	let G = z === "dark", Ae = l(), Me = B ?? !(Ae?.hasHeader ?? !1), K = V ?? Ae?.fillsHeight ?? !1, [q, J] = S(""), Y = x(null), X = x(null), Ne = !!H && oe !== !1, Pe = x(null), Fe = x(null), [Ie, Le] = S(!1), Re = !!U && !i, [Z, Q] = S(0), [ze, Be] = S(!1), $ = x(!0), Ve = x(n.length), He = n.length + ue.length, Ue = x(null), [We, Ge] = S(""), Ke = x(null), qe = x(!1), Je = x(0);
	y(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!qe.current) {
			qe.current = !0, Ke.current = t;
			return;
		}
		if (t === Ke.current || (Ke.current = t, f && e.userId === f)) return;
		Je.current += 1;
		let r = Je.current % 2 == 0 ? "​" : "";
		Ge(Ee(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function Ye() {
		let e = Y.current;
		e && (e.scrollTop = e.scrollHeight, $.current = !0, Q(0));
	}
	function Xe() {
		let e = Y.current;
		if (!e) return;
		let t = Te(e);
		$.current = t, t && Q(0), Be(e.scrollTop > 8);
	}
	y(() => {
		let e = Y.current, t = Ve.current, n = He - t;
		if (Ve.current = He, !e) return;
		let r = Ue.current;
		if (r && n > 0) {
			Ue.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		$.current ? (e.scrollTop = e.scrollHeight, Q(0), Be(e.scrollTop > 8)) : n > 0 && Q((e) => e + n);
	}, [He]);
	function Ze() {
		let e = Y.current;
		e && (Ue.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), H?.();
	}
	y(() => () => {
		X.current && clearTimeout(X.current);
	}, []);
	function Qe() {
		let e = q.trim();
		!e || i || (X.current && clearTimeout(X.current), X.current = null, o?.(!1), $.current = !0, r(e), J(""));
	}
	function $e(e) {
		!Re || e.length === 0 || ($.current = !0, U?.(e));
	}
	function et(e) {
		if (!Re) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), $e(t));
	}
	function tt(e) {
		J((t) => t + e), Le(!1);
	}
	function nt() {
		i || (o?.(!0), X.current && clearTimeout(X.current), X.current = setTimeout(() => o?.(!1), 2e3));
	}
	function rt(e) {
		nt(), e.key === "Enter" && !i && q.trim() && Qe();
	}
	let it = /* @__PURE__ */ T("div", {
		"data-testid": "chat-panel",
		className: e(K ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", G ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Me && /* @__PURE__ */ T("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", G ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			c.length > 0 && /* @__PURE__ */ w(a, {
				names: c,
				className: e("mb-1 shrink-0 italic", G ? "text-white/50" : "text-text-secondary")
			}),
			/* @__PURE__ */ w("span", {
				style: s,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: We
			}),
			/* @__PURE__ */ T("div", {
				className: e("relative flex flex-col mb-2", K ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ w("div", {
					ref: Y,
					onScroll: Xe,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", ze && "fade-top", K ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ T("div", {
						className: "mt-auto",
						children: [
							Ne && n.length > 0 && /* @__PURE__ */ w("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ w("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Ze,
									disabled: se,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", G ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: se ? "Loading…" : "Load earlier messages"
								})
							}),
							n.length === 0 ? /* @__PURE__ */ w("div", {
								className: e("text-sm", G ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : n.map((t, r) => {
								let i = t.displayName ?? t.clientId.slice(0, 8), a = t.attachments ?? [], o = t.metadata?.html, s = typeof o == "string" ? o : void 0, c = /* @__PURE__ */ w(ie, {
									html: s,
									text: t.content
								}), l = De(t.metadata), u = le(t.metadata), d = ke(t.metadata), p = Oe(t.metadata), m = u ? /* @__PURE__ */ w(ce, {
									runId: u.runId,
									instruction: u.instruction || t.content.replace(/^\/doc\s*/i, ""),
									command: u.command,
									agentName: u.agentName,
									requestedBy: t.displayName,
									status: N?.(u.runId),
									onOpenDocument: L && u.documentId ? () => L(u.documentId) : void 0,
									onOpenRun: te,
									result: u.result,
									onOpenResult: ne,
									onDecide: F,
									suggestion: u.suggestionKey ? {
										key: u.suggestionKey,
										...u.documentId ? { documentId: u.documentId } : {}
									} : void 0,
									onReview: I
								}) : d ? /* @__PURE__ */ w(ae, {
									callId: d.callId,
									startedBy: (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									participants: M?.(d.callId) ?? d.participants,
									live: d.live,
									durationMs: d.durationMs,
									audioOnly: d.audioOnly,
									recorded: d.recorded,
									notRecordedReason: d.notRecordedReason,
									lobbyName: d.lobbyName,
									onJoin: re
								}) : l ? /* @__PURE__ */ w(R, {
									documentId: l.documentId,
									title: l.title || t.content,
									icon: l.icon,
									createdBy: l.createdBy ?? (typeof t.metadata?.displayName == "string" ? t.metadata.displayName : void 0) ?? t.displayName,
									editors: ee?.(l.documentId) ?? [],
									onOpen: L
								}) : a.length === 0 ? c : /* @__PURE__ */ T(C, { children: [(t.content || s) && c, a.map((e) => /* @__PURE__ */ w(be, {
									attachment: e,
									src: me?.(e),
									onOpen: he
								}, e.id))] }), h = t.id ?? "", g = h && _ ? _(h) : [], y = t.metadata?.replyTo, x = !!h && !!O?.has(h), S = !!f && t.userId === f, B = t.metadata?.system === !0, V = /* @__PURE__ */ T(C, { children: [
									y && /* @__PURE__ */ w(ye, {
										quote: y,
										onJump: k,
										className: "mb-1"
									}),
									x && /* @__PURE__ */ w("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									m,
									p && /* @__PURE__ */ T("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											p.labels.length > 0 ? `Too large to send: ${p.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									g.length > 0 && f && b && /* @__PURE__ */ w(pe, {
										reactions: g,
										currentUserId: f,
										onToggle: (e) => b(h, e)
									})
								] }), H = A(t.timestamp, n[r - 1]?.timestamp) ? /* @__PURE__ */ w(we, {
									timestamp: t.timestamp,
									tone: z
								}, `day:${t.timestamp}:${r}`) : null;
								return /* @__PURE__ */ T(v, { children: [H, /* @__PURE__ */ T("div", {
									"data-testid": "chat-message",
									"data-message-id": h || void 0,
									className: e("group relative rounded-md", h && h === j && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ w(P, {
										author: i,
										content: V,
										timestamp: t.timestamp,
										avatarUrl: t.avatarUrl,
										tone: z,
										mine: S
									}), h && (b || !B && (E || D)) && /* @__PURE__ */ w(ge, {
										className: e("absolute -top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100", S ? "right-14" : "left-14"),
										onReact: b ? (e) => b(h, e) : void 0,
										onReply: E && !B ? () => E(t) : void 0,
										onTogglePin: D && !B ? () => D(t) : void 0,
										pinned: x
									})]
								})] }, t.id ?? r);
							}),
							ue.map((e) => /* @__PURE__ */ w(P, {
								author: e.actor,
								timestamp: "",
								tone: z,
								content: /* @__PURE__ */ w(Se, {
									transfer: e,
									mine: xe(e, f, de),
									onCancel: fe
								})
							}, e.transferId))
						]
					})
				}), Z > 0 && /* @__PURE__ */ T("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Ye,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", G ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Z,
						" new message",
						Z === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			d ? /* @__PURE__ */ w("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? nt : void 0,
				children: d
			}) : /* @__PURE__ */ T("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					U && /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Re,
						onClick: () => Pe.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", G ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ w(je, {})
					}), /* @__PURE__ */ w(p, {
						ref: Pe,
						multiple: !0,
						accept: _e,
						onFiles: (e) => {
							let t = ve ? e.filter((e) => e.size > ve) : [];
							t.length > 0 && W?.(`Skipped ${t.length} file(s) over the size limit.`), $e(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ w("button", {
						ref: Fe,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Ie,
						title: "Insert emoji",
						disabled: i,
						onClick: () => Le((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", G ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ w("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ w(m, {
						open: Ie,
						onSelect: tt,
						onClose: () => Le(!1),
						triggerRef: Fe,
						emojis: Ce
					}),
					/* @__PURE__ */ w(u, {
						size: "sm",
						value: q,
						onChange: (e) => J(e.target.value),
						onKeyDown: rt,
						onPaste: et,
						disabled: i,
						placeholder: i ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", G && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ w(t, {
						variant: "primary",
						size: "sm",
						onClick: Qe,
						disabled: i || !q.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return U ? /* @__PURE__ */ w(h, {
		onFiles: $e,
		accept: _e,
		maxSize: ve,
		onError: W,
		disabled: i,
		className: K ? "flex h-full min-h-0 flex-col" : void 0,
		children: it
	}) : it;
}
function je() {
	return /* @__PURE__ */ w("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ w("path", {
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
function Me(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function K({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ T("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ T("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ w("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ w("div", { children: e.map((e) => {
			let n = D(Me(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = O(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ T("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ w("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ w("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ w("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ w("span", {
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
function q({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ T("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ w("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ w("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ T("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ w("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ w("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ w("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function J(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Y({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ w("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ w("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function X({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": a = "pinned-messages-panel" }) {
	return /* @__PURE__ */ w(Y, {
		empty: e.length === 0,
		className: r,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ w(i, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ w(q, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ w(d, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				J(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ w("button", {
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
function Ne({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": a = "channel-files-panel" }) {
	return /* @__PURE__ */ w(Y, {
		empty: e.length === 0,
		className: r,
		"data-testid": a,
		children: e.length === 0 ? /* @__PURE__ */ w(i, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = W(e.attachment);
			return /* @__PURE__ */ w(q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ w("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ w("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					_(e.attachment.size),
					J(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Pe({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ w(Y, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ w(i, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ w(q, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ T("span", {
				className: "relative",
				children: [/* @__PURE__ */ w(d, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ w("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				J(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Fe(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Ie(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Le({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ w(Y, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ w(i, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ w(q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ w("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ w("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [J(e.startedAt), Fe(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Ie(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Re({ documents: t, onOpen: n, onCreate: r, className: a, "data-testid": o = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ T("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ w("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ T("div", {
		className: e("min-h-0 overflow-y-auto p-2", a),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ w(i, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ w("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ w(q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ w("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					J(e.updatedAt),
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
var Z = [
	"chat",
	"files",
	"documents",
	"pins",
	"mentions",
	"calls"
], Q = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	mentions: "Mentions",
	calls: "Calls"
};
function ze({ name: t, description: r, online: i, avatarUrl: a, features: s = Z, children: l, canvas: u, files: d = [], thumbnailSrc: f, documents: p = [], onOpenDocument: m, onCreateDocument: h, pins: g = [], onUnpin: _, mentions: v = [], onOpenMention: y, recordings: b = [], onOpenRecording: x, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: ee, callInProgress: M = !1, headerActions: N, view: P, onViewChange: te, className: ne, "data-testid": F = "conversation-surface" }) {
	let I = new Set(s), [re, L] = S("chat"), ie = P ?? re, R = I.has(ie) ? ie : s[0] ?? "chat", z = (e) => {
		P === void 0 && L(e), te?.(e);
	}, B = (e) => e || void 0, V = s.filter((e) => Q[e]).map((e) => ({
		id: e,
		label: Q[e],
		badge: e === "files" ? B(d.length) : e === "documents" ? B(p.length) : e === "pins" ? B(g.length) : e === "calls" ? B(b.length) : e === "mentions" ? B(v.filter((e) => e.unread).length) : void 0
	})), H = (e) => {
		z("chat"), E?.(e);
	};
	return /* @__PURE__ */ T("section", {
		className: e("flex min-w-0 flex-col", ne),
		"data-testid": F,
		children: [
			/* @__PURE__ */ w(c, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${F}-header`,
				tabs: V.length > 1 ? /* @__PURE__ */ w(o, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: R,
					onValueChange: (e) => z(e),
					items: V
				}) : void 0,
				actions: D || k || N ? /* @__PURE__ */ T(C, { children: [
					D && (O ? /* @__PURE__ */ w(n, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${F}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: "📞"
					}) : /* @__PURE__ */ T(C, { children: [/* @__PURE__ */ w(n, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${F}-audio-call`,
						onClick: () => D(!0),
						children: "📞"
					}), /* @__PURE__ */ w(n, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${F}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => D(!1),
						children: "🎥"
					})] })),
					k && /* @__PURE__ */ w(Be, {
						testId: `${F}-watch`,
						label: A,
						hint: j,
						viewerCount: ee,
						onClick: k
					}),
					N
				] }) : void 0
			}),
			I.has("files") && R === "files" && /* @__PURE__ */ w(Ne, {
				className: "min-h-0 flex-1",
				files: d,
				thumbnailSrc: f,
				onJump: E ? H : void 0
			}),
			I.has("documents") && R === "documents" && /* @__PURE__ */ w(Re, {
				className: "min-h-0 flex-1",
				documents: p,
				onOpen: m,
				onCreate: h
			}),
			I.has("pins") && R === "pins" && /* @__PURE__ */ w(X, {
				className: "min-h-0 flex-1",
				pins: g,
				onUnpin: _,
				onJump: E ? H : void 0
			}),
			I.has("mentions") && R === "mentions" && /* @__PURE__ */ w(Pe, {
				className: "min-h-0 flex-1",
				mentions: v,
				onJump: y ? (e, t) => {
					z("chat"), y(e, t);
				} : void 0
			}),
			I.has("calls") && R === "calls" && /* @__PURE__ */ w(Le, {
				className: "min-h-0 flex-1",
				recordings: b,
				onOpen: x
			}),
			I.has("chat") && /* @__PURE__ */ T("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${F}-chat`,
				hidden: R !== "chat",
				children: [u && /* @__PURE__ */ w("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${F}-canvas`,
					children: u
				}), /* @__PURE__ */ w("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function Be({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ T(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? $,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ w("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ w("span", { children: o }),
			s && /* @__PURE__ */ w("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var $ = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { R as A, O as B, de as C, ae as D, ue as E, j as F, ee as I, M as L, P as M, N, V as O, k as P, A as R, fe as S, le as T, W as _, Pe as a, ge as b, Fe as c, ke as d, De as f, Se as g, be as h, Ne as i, ie as j, B as k, K as l, we as m, ze as n, Le as o, Oe as p, Re as r, X as s, Z as t, Ae as u, ye as v, ce as w, pe as x, _e as y, D as z };
