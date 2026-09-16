import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { c as r, m as i, n as a, t as o } from "./DropdownMenu-Bjmwaxsw.js";
import { t as s } from "./Chip-BENLwTlq.js";
import { t as c } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as l } from "./EmptyState-JzzL2z1E.js";
import { n as u, o as d, s as f, t as p } from "./ChannelHeader-BOsRE9TC.js";
import { n as m } from "./DockedPanelContext-pH9A5z1h.js";
import { t as h } from "./Input-DLknWXri.js";
import { t as g } from "./Textarea-Dz4doxTv.js";
import { t as _ } from "./Avatar-BzicCOft.js";
import { t as v } from "./StatusPill-Db42eiME.js";
import { i as y, n as b, r as x, t as S } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as C } from "./formatBytes-05ivRSJY.js";
import { Fragment as w, useEffect as T, useMemo as E, useRef as D, useState as O } from "react";
import { Fragment as k, jsx as A, jsxs as j } from "react/jsx-runtime";
//#region src/utils/identity.ts
var M = [
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
function N(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return M[Math.abs(t) % M.length];
}
function P(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function F(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function ee(e, t) {
	let n = F(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = F(t);
	return r ? n !== r : !1;
}
function I(e, t = /* @__PURE__ */ new Date()) {
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
function L(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function R(e) {
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
function z(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function B({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = z(r), m = !o || !!p;
	return /* @__PURE__ */ j("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ A("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ A(_, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ j("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ j("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ A("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ A("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: R(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ A("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${R(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ A("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ A("div", {
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
var V = /* @__PURE__ */ new Set([
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
]), H = /^(https?:|mailto:)/i;
function U(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || H.test(t) ? t : null;
}
function W(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => W(e, `${t}-${n}`));
	if (!V.has(n.tagName)) return /* @__PURE__ */ A("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ A("br", {}, t);
		case "A": {
			let e = U(n.getAttribute("href"));
			return e ? /* @__PURE__ */ A("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ A("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ A("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ A(e, { children: r }, t);
		}
	}
}
var G = /```([\s\S]*?)```|`([^`\n]+)`/g;
function K(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (G.lastIndex = 0; (r = G.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ A("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ A("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ A("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function te({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = E(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => W(e, `n${t}`));
	}, [t]), o = E(() => K(n ?? ""), [n]);
	return /* @__PURE__ */ A("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ne({ documentId: t, title: n, icon: r, createdBy: i, editors: o = [], onOpen: s, className: c, "data-testid": l = "document-activity-card" }) {
	let u = o.length > 0;
	return /* @__PURE__ */ j("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", c),
		children: [
			/* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ j("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ A("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ A("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${re(o)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ A("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ A(a, {
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
			s && /* @__PURE__ */ A("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => s(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function re(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ie({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ j("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ A("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ A("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function ae(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function oe(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function se(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ce({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: o, audioOnly: s, recorded: c, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !i && typeof o == "number" ? ae(o) : "", h = s === void 0 ? "Call" : s ? "Audio call" : "Video call", g = i ? oe(r, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ j("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: s === void 0 || s ? "📞" : "📹"
			}),
			/* @__PURE__ */ j("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ A("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ A("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && c === !1 && /* @__PURE__ */ A("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: se(l, u)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ A("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ A(a, {
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
			i && d && /* @__PURE__ */ A("button", {
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
var le = {
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
function ue(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function de(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function fe(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function pe({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ j("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ A("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ A(_, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ j("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ A("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ A("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ A("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function me({ recordingId: n, title: r = "Recording", recordedBy: i, participants: s = [], participantCount: c, startedAt: l, durationMs: u, thumbnailUrl: d, stage: f = "ready", transcriptReady: p = !1, summaryReady: m = !1, expiresAt: h, pinned: g = !1, onOpen: _, onCopyLink: y, onShare: b, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let O = c ?? s.length, k = f === "gone", M = f !== "saving" && f !== "failed" && !k && !!_, N = () => {
		_?.(n);
	}, P = u != null && u > 0 ? ae(u) : "", F = ue(l), ee = fe(s, O), { state: I, label: L } = le[f], R = [
		..._ && M ? [{
			"data-testid": `${D}-menu-open`,
			label: "Open",
			onSelect: N
		}] : [],
		...C && p ? [{
			"data-testid": `${D}-menu-transcript`,
			label: "Transcript",
			onSelect: () => C(n)
		}] : [],
		...y && !k ? [{
			"data-testid": `${D}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => y(n)
		}] : [],
		...b && !k ? [{
			"data-testid": `${D}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => b(n)
		}] : [],
		...x && !k ? [{
			"data-testid": `${D}-menu-pin`,
			label: g ? "Unpin" : "Pin",
			onSelect: () => x(n)
		}] : [],
		...S && M ? [{
			"data-testid": `${D}-menu-download`,
			label: "Download",
			onSelect: () => S(n)
		}] : []
	], z = R.length ? [{
		items: R,
		"data-testid": `${D}-menu-items`
	}] : [];
	return /* @__PURE__ */ j("div", {
		"data-testid": D,
		"data-recording-id": n,
		"data-stage": f,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", E),
		children: [/* @__PURE__ */ j("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ j("button", {
				type: "button",
				onClick: M ? N : void 0,
				disabled: !M,
				"aria-label": M ? `Play ${r.toLowerCase()}` : `${r}: ${L.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", M ? "cursor-pointer" : "cursor-default"),
				children: [
					d ? /* @__PURE__ */ A("img", {
						src: d,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ A(pe, {
						participants: s,
						total: O,
						testId: D
					}),
					M && /* @__PURE__ */ A("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ A("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ A("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ A("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					P && /* @__PURE__ */ A("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${D}-duration`,
						children: P
					})
				]
			}), /* @__PURE__ */ j("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ j("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ j("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ A("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${D}-title`,
								children: r
							}), g && /* @__PURE__ */ A("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: "📌"
							})]
						}),
						i && /* @__PURE__ */ j("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", i]
						}),
						O > 0 && /* @__PURE__ */ j("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ A(a, {
								users: s.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ A("span", {
								className: "truncate text-xs text-text-tertiary",
								children: ee
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ A(v, {
									state: I,
									label: L,
									size: "sm",
									"data-testid": `${D}-stage`
								}),
								f === "ready" && p && /* @__PURE__ */ A(v, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${D}-transcript`
								}),
								f === "ready" && m && /* @__PURE__ */ A(v, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${D}-summary`
								}),
								F && /* @__PURE__ */ A("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${D}-when`,
									children: F
								})
							]
						})
					]
				}), z.length > 0 && /* @__PURE__ */ A(o, {
					trigger: /* @__PURE__ */ A("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: z,
					"data-testid": `${D}-menu`
				})]
			})]
		}), h && f !== "failed" && !k && /* @__PURE__ */ j("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ j("span", { children: ["Set to expire ", de(h)] }), w && /* @__PURE__ */ A(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => w(n),
				"data-testid": `${D}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function he(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function ge(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function q(e, t) {
	let n = e.names && e.names.length > 0 ? he(e.names) : e.userIds.length > 0 ? he(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = ge(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function _e({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = q(t, n);
	return /* @__PURE__ */ j("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ A("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ A("time", {
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
var J = [
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
], Y = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, ve = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, ye = 6;
function X(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function be(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function xe(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${X(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${X(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${X(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${be(e.index)}`;
		case "deleteBlock": return `Removed block ${be(e.index)}`;
		case "appendMacro": return t ? `Added a ${X(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${be(e.index)}`;
		case "setDocumentType": return `Type: ${X(t, 40)}`;
		case "skip": return t ? X(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${X(t)}` : e.op;
	}
}
function Se(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Ce(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function we(e) {
	if (!e?.startedAt) return null;
	let t = Se(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Ce(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Te = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Ee({ runId: r, instruction: i, agentName: a, requestedBy: o, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = l?.phase ?? "received", [S, C] = O(v), w = x === "completed" ? l?.suggestion ?? h : void 0, T = x === "completed" ? l?.review : void 0, E = !!w && !T, D = x === "completed" && l?.noop === !0, k = x === "completed" ? l?.result ?? f : void 0, M = k?.kind === "link" && k.label ? k.label : "Open", N = u && !(k?.kind === "document" && p), P = Y[x], F = x === "failed" || x === "rejected", ee = F ? "danger" : T ? T.decision === "accept" ? "success" : "neutral" : D ? "warning" : x === "completed" ? w ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", I = T ? "Reviewed" : E ? "Suggested" : D ? "No change" : ve[x], L = T ? T.byName ?? T.by : void 0, R = T ? `${T.decision === "accept" ? "Accepted" : "Rejected"} by ${L}` : void 0, z = x === "awaiting_approval", B = x === "running" ? l?.stepLabel ? `${a} — ${l.stepLabel}` : `${a} is working via the pipeline` : z ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : R ?? l?.detail ?? (E && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : I), V = l?.details, H = V?.ops ?? [], U = V?.steps ?? [], W = V?.document?.title || _ || "Document", G = !!V?.document || !!u, K = V?.error ?? (x === "failed" ? l?.detail : void 0), te = we(V), ne = `${b}-details-${r}`;
	return /* @__PURE__ */ j("div", {
		className: e("flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", y),
		"data-testid": b,
		"data-phase": x,
		"data-run-id": r,
		"data-expanded": S ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || C((e) => !e);
		},
		children: [
			/* @__PURE__ */ j("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ A("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ j("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${b}-instruction`,
						children: [
							/* @__PURE__ */ A("span", {
								className: "font-mono text-text-tertiary",
								children: c
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ A(s, {
						size: "xs",
						tone: ee,
						"data-testid": `${b}-phase`,
						children: I
					}),
					/* @__PURE__ */ A(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? ne : void 0,
						onClick: () => C((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${b}-toggle`,
						icon: /* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", S && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ j("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ A("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${b}-steps`,
						children: J.map((t, n) => {
							let r = F ? n < P : n < P || n === P && x === "completed", i = n === P && x !== "completed" && !F, a = F && n === P;
							return /* @__PURE__ */ j("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ A("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? D && n === P ? "bg-warning" : "bg-success" : i ? z ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ A("span", {
									className: "sr-only",
									children: a ? I : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ A("span", {
						className: e("min-w-0 flex-1 truncate", T && (T.decision === "accept" ? "text-success" : "text-text-tertiary"), x === "failed" && "text-danger", D && "text-warning-fg"),
						"data-testid": `${b}-detail`,
						"data-review": T?.decision,
						title: l?.detail,
						children: B
					}),
					E && w && g && /* @__PURE__ */ j("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-review`,
						children: [/* @__PURE__ */ A(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${b}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ A(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${b}-reject-review`,
							children: "Reject"
						})]
					}),
					z && m && /* @__PURE__ */ j("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-decide`,
						children: [/* @__PURE__ */ A(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "approve"),
							"data-testid": `${b}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ A(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "reject"),
							"data-testid": `${b}-reject`,
							children: "Reject"
						})]
					}),
					k && p && /* @__PURE__ */ A("button", {
						type: "button",
						onClick: () => p(k),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": k.kind,
						children: M
					}),
					k?.kind === "link" && !p && /* @__PURE__ */ A("a", {
						href: k.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": "link",
						children: M
					}),
					d && /* @__PURE__ */ A("button", {
						type: "button",
						onClick: () => d(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-run`,
						children: "run"
					}),
					N && /* @__PURE__ */ A("button", {
						type: "button",
						onClick: u,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-document`,
						children: "document"
					})
				]
			}),
			S && /* @__PURE__ */ j("div", {
				id: ne,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					G && /* @__PURE__ */ j("div", {
						className: "flex items-start gap-2",
						"data-testid": `${b}-details-document`,
						children: [
							/* @__PURE__ */ A("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ j("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ A("span", {
									className: "block truncate font-medium text-text-primary",
									children: W
								}), V?.document?.snippet && /* @__PURE__ */ A("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: V.document.snippet
								})]
							}),
							u && /* @__PURE__ */ A(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: u,
								"data-testid": `${b}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ j("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ A("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ A("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: H.slice(0, ye).map((e, t) => /* @__PURE__ */ A("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: xe(e)
								}, t))
							}),
							H.length > ye && /* @__PURE__ */ j("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									H.length - ye,
									" more"
								]
							})
						]
					}),
					U.length > 0 && /* @__PURE__ */ A("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: U.map((t) => /* @__PURE__ */ j("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ A("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Te[t.status] ?? Te.pending)
							}), /* @__PURE__ */ A("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					K && /* @__PURE__ */ A("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: K
					}),
					/* @__PURE__ */ j("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							d && /* @__PURE__ */ A("button", {
								type: "button",
								onClick: () => d(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${b}-details-open-run`,
								children: "Open run"
							}),
							k && p && /* @__PURE__ */ A("button", {
								type: "button",
								onClick: () => p(k),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${b}-details-open-result`,
								children: M
							}),
							te && /* @__PURE__ */ A("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${b}-details-timings`,
								children: te
							})
						]
					})
				]
			})
		]
	});
}
function De(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = Oe(e.result);
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
function Oe(e) {
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
function ke(e, t) {
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
function Ae(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function je({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = E(() => ke(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ A("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ j("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Ae(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ A("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Z = [
	"👍",
	"🎉",
	"❤️"
], Me = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ne({ quickReactions: t = Z, onReact: n, onOpenReactionPicker: a, onReply: o, onTogglePin: s, pinned: c = !1, onCopyLink: l, onEdit: u, onDelete: d, className: f, "data-testid": p = "message-actions" }) {
	let m = (e, t, n, r) => /* @__PURE__ */ A("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${p}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Me}`,
		children: n
	}, r);
	return /* @__PURE__ */ j("div", {
		"data-testid": p,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", f),
		children: [
			n && t.map((e) => m(`React ${e}`, () => n(e), /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			a && m("More reactions", a, /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			o && m("Reply", o, /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			s && m(c ? "Unpin" : "Pin to channel", s, /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			l && m("Copy link to message", l, /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			u && m("Edit message", u, /* @__PURE__ */ A(r, { size: 13 }), "edit"),
			d && m("Delete message", d, /* @__PURE__ */ A(i, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Pe({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = O(e), [s, c] = O(!1), [l, u] = O(null), d = D(null);
	T(() => {
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
	return /* @__PURE__ */ j("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ A(g, {
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
			/* @__PURE__ */ j("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ A("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ A(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ A(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ A("p", {
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
function Fe(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Ie(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Le({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ j("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ A("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ A("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Ie(t.timestamp)
		})]
	}), /* @__PURE__ */ A("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Fe(t.text)
	})] });
	return /* @__PURE__ */ j("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ A("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ A("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ A("button", {
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
function Re(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function ze({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Re(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ j("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ A("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ A("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ A("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ A("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ j("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ A("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ A("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: C(t.size)
			})]
		})]
	}) : /* @__PURE__ */ A("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ j("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ A(He, {}), /* @__PURE__ */ j("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ A("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ A("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: C(t.size)
				})]
			})]
		})
	});
}
function Be(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ve({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : C(o);
	return /* @__PURE__ */ j("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ A("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ A(He, {}),
			/* @__PURE__ */ j("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ j("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ A("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ A("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ A("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ A("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ A("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ A("button", {
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
function He() {
	return /* @__PURE__ */ A("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ A("path", {
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
function Ue({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = I(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ j("div", {
		role: "separator",
		"aria-label": L(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ A("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ A("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ A("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function We(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Ge(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Ke(e) {
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
function qe(e) {
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
var Je = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Ye(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Je[e] ?? e)
	};
}
function Xe(e) {
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
function Ze(e) {
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
function Qe(e) {
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
function $e(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function et(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse($e(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Q({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: l, composer: d, currentUserId: p, reactionsFor: g, onToggleReaction: _, onReply: v, onTogglePin: C, onEditMessage: E, onDeleteMessage: M, pinnedMessageIds: N, onJumpToMessage: P, highlightedMessageId: F, documentEditors: I, callParticipants: L, agentRunStatus: R, onOpenRun: z, onOpenResult: V, onDecideRun: H, onReviewRun: U, onJoinCall: W, onOpenRecording: G, onCopyRecordingLink: K, onShareRecording: re, onDownloadRecording: ae, onOpenRecordingTranscript: oe, onManageRecordingExpiry: se, recordingStatus: le, onOpenDocument: ue, tone: de = "light", showHeader: fe, fill: pe, onLoadMore: he, hasMore: ge, loadingMore: q = !1, onSendFiles: J, transfers: Y = [], currentActor: ve, onCancelTransfer: ye, attachmentSrc: X, onOpenAttachment: be, acceptFiles: xe, maxFileSize: Se, onFileError: Ce, emojis: we = S }) {
	let [Te, Oe] = O(null), [ke, Ae] = O(null), Z = de === "dark", Me = m(), Fe = fe ?? !(Me?.hasHeader ?? !1), Ie = pe ?? Me?.fillsHeight ?? !1, [Re, He] = O(""), Je = D(null), Q = D(null), nt = !!he && ge !== !1, rt = D(null), it = D(null), [at, $] = O(!1), ot = !!J && !a, st = et(n, r), [ct, lt] = O(0), [ut, dt] = O(!1), ft = D(!0), pt = D(n.length), mt = n.length + r.length + Y.length, ht = D(null), [gt, _t] = O(""), vt = D(null), yt = D(!1), bt = D(0);
	T(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!yt.current) {
			yt.current = !0, vt.current = t;
			return;
		}
		if (t === vt.current || (vt.current = t, p && e.userId === p)) return;
		bt.current += 1;
		let r = bt.current % 2 == 0 ? "​" : "";
		_t(Ge(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, p]);
	function xt() {
		let e = Je.current;
		e && (e.scrollTop = e.scrollHeight, ft.current = !0, lt(0));
	}
	function St() {
		let e = Je.current;
		if (!e) return;
		let t = We(e);
		ft.current = t, t && lt(0), dt(e.scrollTop > 8);
	}
	T(() => {
		let e = Je.current, t = pt.current, n = mt - t;
		if (pt.current = mt, !e) return;
		let r = ht.current;
		if (r && n > 0) {
			ht.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		ft.current ? (e.scrollTop = e.scrollHeight, lt(0), dt(e.scrollTop > 8)) : n > 0 && lt((e) => e + n);
	}, [mt]);
	function Ct() {
		let e = Je.current;
		e && (ht.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), he?.();
	}
	T(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function wt() {
		let e = Re.trim();
		!e || a || (Q.current && clearTimeout(Q.current), Q.current = null, o?.(!1), ft.current = !0, i(e), He(""));
	}
	function Tt(e) {
		!ot || e.length === 0 || (ft.current = !0, J?.(e));
	}
	function Et(e) {
		if (!ot) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Tt(t));
	}
	function Dt(e) {
		He((t) => t + e), $(!1);
	}
	function Ot() {
		a || (o?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => o?.(!1), 2e3));
	}
	function kt(e) {
		Ot(), e.key === "Enter" && !a && Re.trim() && wt();
	}
	let At = /* @__PURE__ */ j("div", {
		"data-testid": "chat-panel",
		className: e(Ie ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Fe && /* @__PURE__ */ j("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ A("span", {
				style: f,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: gt
			}),
			/* @__PURE__ */ j("div", {
				className: e("relative flex flex-col mb-2", Ie ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ A("div", {
					ref: Je,
					onScroll: St,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", ut && "fade-top", Ie ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ j("div", {
						className: "mt-auto",
						children: [
							nt && n.length > 0 && /* @__PURE__ */ A("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ A("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Ct,
									disabled: q,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: q ? "Loading…" : "Load earlier messages"
								})
							}),
							st.length === 0 ? l ?? /* @__PURE__ */ A("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : st.map((n, r) => {
								let i = $e(st[r - 1]), a = n.kind === "message" ? n.message.timestamp : n.local.timestamp, o = ee(a, i) ? /* @__PURE__ */ A(Ue, {
									timestamp: a,
									tone: de
								}, `day:${a}:${r}`) : null;
								if (n.kind === "local") {
									let r = n.local, i = De(r.metadata);
									return /* @__PURE__ */ j(w, { children: [o, /* @__PURE__ */ A("div", {
										"data-testid": "chat-local-message",
										"data-local-message-id": r.id,
										className: "rounded-md",
										children: /* @__PURE__ */ A(B, {
											author: r.displayName,
											timestamp: r.timestamp,
											tone: de,
											mine: !0,
											content: /* @__PURE__ */ j(k, { children: [
												i ? /* @__PURE__ */ A(Ee, {
													runId: i.runId,
													instruction: i.instruction || r.content,
													command: i.command,
													agentName: i.agentName,
													requestedBy: r.displayName,
													status: R?.(i.runId),
													onOpenDocument: ue && i.documentId ? () => ue(i.documentId) : void 0,
													documentTitle: i.documentTitle,
													onOpenRun: z,
													result: i.result,
													onOpenResult: V,
													onDecide: H,
													suggestion: i.suggestionKey ? {
														key: i.suggestionKey,
														...i.documentId ? { documentId: i.documentId } : {}
													} : void 0,
													onReview: U
												}) : /* @__PURE__ */ A(te, { text: r.content }),
												/* @__PURE__ */ A("div", {
													"data-testid": "chat-local-message-note",
													className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
													children: r.note ?? "Only you can see this"
												}),
												r.actions && r.actions.length > 0 && /* @__PURE__ */ A("div", {
													className: "mt-1.5 flex flex-wrap gap-1.5",
													"data-testid": "chat-local-message-actions",
													children: r.actions.map((e) => /* @__PURE__ */ A(t, {
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
								let { message: s } = n, c = s.displayName ?? s.clientId.slice(0, 8), l = s.attachments ?? [], u = s.metadata?.html, d = typeof u == "string" ? u : void 0, f = /* @__PURE__ */ A(te, {
									html: d,
									text: s.content
								}), m = Ke(s.metadata), h = De(s.metadata), y = Xe(s.metadata), b = Ze(s.metadata), x = Qe(s.metadata), S = Ye(s.metadata), T = qe(s.metadata), D = h ? /* @__PURE__ */ A(Ee, {
									runId: h.runId,
									instruction: h.instruction || s.content.replace(/^\/doc\s*/i, ""),
									command: h.command,
									agentName: h.agentName,
									requestedBy: s.displayName,
									status: R?.(h.runId),
									onOpenDocument: ue && h.documentId ? () => ue(h.documentId) : void 0,
									documentTitle: h.documentTitle,
									onOpenRun: z,
									result: h.result,
									onOpenResult: V,
									onDecide: H,
									suggestion: h.suggestionKey ? {
										key: h.suggestionKey,
										...h.documentId ? { documentId: h.documentId } : {}
									} : void 0,
									onReview: U
								}) : b ? (() => {
									let e = le?.(b.recordingId), t = {
										...b,
										...e ?? {}
									};
									return /* @__PURE__ */ A(me, {
										recordingId: t.recordingId,
										title: t.title,
										recordedBy: t.recordedBy ?? s.displayName,
										participants: t.participants,
										participantCount: t.participantCount,
										startedAt: t.startedAt,
										durationMs: t.durationMs,
										thumbnailUrl: t.thumbnailUrl,
										stage: t.stage ?? "ready",
										transcriptReady: t.transcriptReady,
										summaryReady: t.summaryReady,
										expiresAt: t.expiresAt,
										pinned: !!s.id && !!N?.has(s.id),
										onOpen: G,
										onCopyLink: K,
										onShare: re,
										onDownload: ae,
										onOpenTranscript: oe,
										onManageExpiry: se,
										onTogglePin: C ? () => C(s) : void 0
									});
								})() : y ? /* @__PURE__ */ A(ce, {
									callId: y.callId,
									startedBy: (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									participants: L?.(y.callId) ?? y.participants,
									live: y.live,
									durationMs: y.durationMs,
									audioOnly: y.audioOnly,
									recorded: y.recorded,
									notRecordedReason: y.notRecordedReason,
									lobbyName: y.lobbyName,
									onJoin: W
								}) : m ? /* @__PURE__ */ A(ne, {
									documentId: m.documentId,
									title: m.title || s.content,
									icon: m.icon,
									createdBy: m.createdBy ?? (typeof s.metadata?.displayName == "string" ? s.metadata.displayName : void 0) ?? s.displayName,
									editors: I?.(m.documentId) ?? [],
									onOpen: ue
								}) : l.length === 0 ? f : /* @__PURE__ */ j(k, { children: [(s.content || d) && f, l.map((e) => /* @__PURE__ */ A(ze, {
									attachment: e,
									src: X?.(e),
									onOpen: be
								}, e.id))] }), O = s.id ?? "", fe = O && g ? g(O) : [], pe = s.metadata?.replyTo, he = !!O && !!N?.has(O), ge = !!p && s.userId === p, q = s.metadata?.system === !0, J = !!s.deletedAt || s.metadata?.deleted === !0, Y = ge && !J && !q && !(h || b || y || m || x) && !!O, ve = Y && !!E && Te === O, ye = /* @__PURE__ */ j(k, { children: [
									pe && /* @__PURE__ */ A(Le, {
										quote: pe,
										onJump: P,
										className: "mb-1"
									}),
									he && /* @__PURE__ */ A("span", {
										className: "mb-0.5 block text-[11px] text-text-tertiary",
										"data-testid": "pinned-marker",
										children: "📌 Pinned"
									}),
									J ? /* @__PURE__ */ A("span", {
										className: "italic text-text-tertiary",
										"data-testid": "message-deleted",
										children: "This message was deleted."
									}) : ve ? /* @__PURE__ */ A(Pe, {
										initialText: s.content,
										onSave: async (e) => {
											await E(s, e), Oe(null);
										},
										onCancel: () => Oe(null)
									}) : D,
									!J && T.length > 0 && /* @__PURE__ */ A("div", {
										className: "mt-1 flex flex-wrap gap-1",
										"data-testid": "chat-message-docrefs",
										children: T.map((e) => /* @__PURE__ */ A(ie, {
											documentId: e.id,
											label: e.label,
											icon: e.icon,
											onOpen: ue
										}, e.id))
									}),
									!J && S && /* @__PURE__ */ j("div", {
										"data-testid": "message-truncated",
										className: "mt-1 text-[11px] text-warning-fg",
										children: [
											"⚠",
											" ",
											S.labels.length > 0 ? `Too large to send: ${S.labels.join(", ")}` : "Part of this message was too large to send"
										]
									}),
									!J && fe.length > 0 && p && _ && /* @__PURE__ */ A(je, {
										reactions: fe,
										currentUserId: p,
										onToggle: (e) => _(O, e)
									})
								] });
								return x ? /* @__PURE__ */ j(w, { children: [o, /* @__PURE__ */ A(_e, {
									membership: x,
									fallbackText: s.content,
									timestamp: s.timestamp,
									"data-testid": "membership-notice"
								})] }, s.id ?? r) : /* @__PURE__ */ j(w, { children: [o, /* @__PURE__ */ j("div", {
									"data-testid": "chat-message",
									"data-message-id": O || void 0,
									className: e("group relative rounded-md transition-colors hover:bg-surface-hover", O && O === F && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
									children: [/* @__PURE__ */ A(B, {
										author: c,
										content: ye,
										timestamp: s.timestamp,
										editedAt: J ? void 0 : s.editedAt,
										avatarUrl: s.avatarUrl,
										tone: de,
										mine: ge
									}), O && !J && !ve && (_ || Y || !q && (v || C)) && /* @__PURE__ */ A(Ne, {
										className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
										onReact: _ ? (e) => _(O, e) : void 0,
										onReply: v && !q ? () => v(s) : void 0,
										onTogglePin: C && !q ? () => C(s) : void 0,
										pinned: !!s.id && !!N?.has(s.id),
										onEdit: Y && E ? () => Oe(O) : void 0,
										onDelete: Y && M ? () => Ae(O) : void 0
									})]
								})] }, s.id ?? r);
							}),
							M && /* @__PURE__ */ A(c, {
								open: ke !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ae(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === ke);
									Ae(null), e && M(e);
								}
							}),
							Y.map((e) => /* @__PURE__ */ A(B, {
								author: e.actor,
								timestamp: "",
								tone: de,
								content: /* @__PURE__ */ A(Ve, {
									transfer: e,
									mine: Be(e, p, ve),
									onCancel: ye
								})
							}, e.transferId))
						]
					})
				}), ct > 0 && /* @__PURE__ */ j("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: xt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						ct,
						" new message",
						ct === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ A(u, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Z ? "text-white/50" : "text-text-secondary")
			}),
			d ? /* @__PURE__ */ A("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Ot : void 0,
				children: d
			}) : /* @__PURE__ */ j("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					J && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !ot,
						onClick: () => rt.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ A(tt, {})
					}), /* @__PURE__ */ A(y, {
						ref: rt,
						multiple: !0,
						accept: xe,
						onFiles: (e) => {
							let t = Se ? e.filter((e) => e.size > Se) : [];
							t.length > 0 && Ce?.(`Skipped ${t.length} file(s) over the size limit.`), Tt(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ A("button", {
						ref: it,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": at,
						title: "Insert emoji",
						disabled: a,
						onClick: () => $((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ A(b, {
						open: at,
						onSelect: Dt,
						onClose: () => $(!1),
						triggerRef: it,
						emojis: we
					}),
					/* @__PURE__ */ A(h, {
						size: "sm",
						value: Re,
						onChange: (e) => He(e.target.value),
						onKeyDown: kt,
						onPaste: Et,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ A(t, {
						variant: "primary",
						size: "sm",
						onClick: wt,
						disabled: a || !Re.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return J ? /* @__PURE__ */ A(x, {
		onFiles: Tt,
		accept: xe,
		maxSize: Se,
		onError: Ce,
		disabled: a,
		className: Ie ? "flex h-full min-h-0 flex-col" : void 0,
		children: At
	}) : At;
}
function tt() {
	return /* @__PURE__ */ A("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ A("path", {
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
function nt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function rt({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ j("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ j("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ A("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ A("div", { children: e.map((e) => {
			let n = N(nt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = P(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ j("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ A("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ A("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ A("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ A("span", {
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
function it({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
	let c = /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ j("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ A("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ A("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ j("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ A("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ A("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ A("span", {
			className: "flex shrink-0 items-center gap-1",
			children: r
		})]
	});
}
function at(e) {
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
	return /* @__PURE__ */ A("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ A("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function ot({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ A($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ A(it, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ A(_, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				at(e.pinnedAt)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ A("button", {
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
function st({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ A($, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Re(e.attachment);
			return /* @__PURE__ */ A(it, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ A("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ A("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: "📄"
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					C(e.attachment.size),
					at(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function ct({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ A($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ A(it, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ j("span", {
				className: "relative",
				children: [/* @__PURE__ */ A(_, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ A("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			title: e.excerpt,
			meta: [
				e.author,
				e.channelLabel ?? e.channel,
				at(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function lt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function ut(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function dt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ A($, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ A(it, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ A("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ A("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-sm",
					children: "🎥"
				}),
				title: [at(e.startedAt), lt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : ut(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function ft({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
	let o = r && /* @__PURE__ */ j("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ A("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ j("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": a,
		children: [o, t.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "📄",
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ A("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ A(it, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ A("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					at(e.updatedAt),
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
var pt = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], mt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function ht({ name: t, description: r, online: i, avatarUrl: a, features: o = pt, children: s, canvas: c, members: l, memberCount: u, files: f = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: S = [], onOpenRecording: C, onJumpToMessage: w, onStartCall: T, callModeFixed: E = !1, onWatch: D, watchLabel: M, watchHint: N, watchViewerCount: P, callInProgress: F = !1, headerActions: ee, view: I, onViewChange: L, className: R, "data-testid": z = "conversation-surface" }) {
	let B = new Set(o), [V, H] = O("chat"), U = I ?? V, W = B.has(U) ? U : o[0] ?? "chat", G = (e) => {
		I === void 0 && H(e), L?.(e);
	}, K = (e) => e || void 0, te = o.filter((e) => mt[e]).map((e) => ({
		id: e,
		label: mt[e],
		badge: e === "files" ? K(f.length) : e === "documents" ? K(h.length) : e === "pins" ? K(v.length) : e === "members" ? u == null ? void 0 : K(u) : e === "calls" ? K(S.length) : e === "mentions" ? K(b.filter((e) => e.unread).length) : void 0
	})), ne = (e) => {
		G("chat"), w?.(e);
	};
	return /* @__PURE__ */ j("section", {
		className: e("flex min-w-0 flex-col", R),
		"data-testid": z,
		children: [
			/* @__PURE__ */ A(p, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${z}-header`,
				tabs: te.length > 1 ? /* @__PURE__ */ A(d, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: W,
					onValueChange: (e) => G(e),
					items: te
				}) : void 0,
				actions: T || D || ee ? /* @__PURE__ */ j(k, { children: [
					T && (E ? /* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call" : "Start a call",
						title: F ? "Join the call" : "Start a call",
						"data-testid": `${z}-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "📞"
					}) : /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call with audio" : "Start an audio call",
						title: F ? "Join with audio" : "Audio call",
						"data-testid": `${z}-audio-call`,
						onClick: () => T(!0),
						children: "📞"
					}), /* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call with video" : "Start a video call",
						title: F ? "Join with video" : "Video call",
						"data-testid": `${z}-video-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "🎥"
					})] })),
					D && /* @__PURE__ */ A(gt, {
						testId: `${z}-watch`,
						label: M,
						hint: N,
						viewerCount: P,
						onClick: D
					}),
					ee
				] }) : void 0
			}),
			B.has("files") && W === "files" && /* @__PURE__ */ A(st, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: m,
				onJump: w ? ne : void 0
			}),
			B.has("documents") && W === "documents" && /* @__PURE__ */ A(ft, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			B.has("pins") && W === "pins" && /* @__PURE__ */ A(ot, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: w ? ne : void 0
			}),
			B.has("members") && W === "members" && /* @__PURE__ */ A("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${z}-members`,
				children: l
			}),
			B.has("mentions") && W === "mentions" && /* @__PURE__ */ A(ct, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					G("chat"), x(e, t);
				} : void 0
			}),
			B.has("calls") && W === "calls" && /* @__PURE__ */ A(dt, {
				className: "min-h-0 flex-1",
				recordings: S,
				onOpen: C
			}),
			B.has("chat") && /* @__PURE__ */ j("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${z}-chat`,
				hidden: W !== "chat",
				children: [c && /* @__PURE__ */ A("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${z}-canvas`,
					children: c
				}), /* @__PURE__ */ A("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function gt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ j(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? _t,
		"aria-label": s ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "👁"
			}),
			/* @__PURE__ */ A("span", { children: o }),
			s && /* @__PURE__ */ A("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var _t = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { P as $, De as A, oe as B, Pe as C, ke as D, Ae as E, q as F, B as G, ie as H, ge as I, I as J, z as K, me as L, we as M, xe as N, Te as O, _e as P, N as Q, fe as R, Fe as S, je as T, ne as U, ae as V, te as W, R as X, L as Y, ee as Z, Ue as _, ct as a, Re as b, lt as c, Xe as d, Ke as f, Ye as g, Ze as h, st as i, Oe as j, Ee as k, rt as l, Qe as m, ht as n, dt as o, qe as p, F as q, ft as r, ot as s, pt as t, Q as u, ze as v, Ne as w, Le as x, Ve as y, ce as z };
