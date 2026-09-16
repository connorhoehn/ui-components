import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { n as r, t as i, u as a, v as o } from "./DropdownMenu-aZxk83gS.js";
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
function I(e, t) {
	let n = F(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = F(t);
	return r ? n !== r : !1;
}
function L(e, t = /* @__PURE__ */ new Date()) {
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
function R(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function z(e) {
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
function B(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function V({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = B(r), m = !o || !!p;
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
							title: z(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ A("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${z(u)}`,
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
var H = /* @__PURE__ */ new Set([
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
]), ee = /^(https?:|mailto:)/i;
function te(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ee.test(t) ? t : null;
}
function U(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => U(e, `${t}-${n}`));
	if (!H.has(n.tagName)) return /* @__PURE__ */ A("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ A("br", {}, t);
		case "A": {
			let e = te(n.getAttribute("href"));
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
var W = /```([\s\S]*?)```|`([^`\n]+)`/g;
function G(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (W.lastIndex = 0; (r = W.exec(e)) !== null;) {
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
function ne({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = E(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => U(e, `n${t}`));
	}, [t]), o = E(() => G(n ?? ""), [n]);
	return /* @__PURE__ */ A("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function re({ documentId: t, title: n, icon: i, createdBy: a, editors: o = [], onOpen: s, className: c, "data-testid": l = "document-activity-card" }) {
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
				children: i || "📄"
			}),
			/* @__PURE__ */ j("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ A("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ A("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${ie(o)} editing now` : a ? `Created by ${a}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ A("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ A(r, {
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
function ie(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function ae({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
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
function oe(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function se(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function ce(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function le({ callId: t, startedBy: n, participants: i = [], live: a = !1, durationMs: o, audioOnly: s, recorded: c, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !a && typeof o == "number" ? oe(o) : "", h = s === void 0 ? "Call" : s ? "Audio call" : "Video call", g = a ? se(i, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ j("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": a ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", a ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
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
						children: a ? `${h} in progress` : h
					}),
					/* @__PURE__ */ A("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!a && c === !1 && /* @__PURE__ */ A("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: ce(l, u)
					})
				]
			}),
			i.length > 0 && /* @__PURE__ */ A("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ A(r, {
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
			a && d && /* @__PURE__ */ A("button", {
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
var ue = {
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
function de(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function fe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function pe(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function me({ participants: t, total: n, testId: r }) {
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
function he({ recordingId: n, title: a = "Recording", recordedBy: o, participants: s = [], participantCount: c, startedAt: l, durationMs: u, thumbnailUrl: d, stage: f = "ready", transcriptReady: p = !1, summaryReady: m = !1, expiresAt: h, pinned: g = !1, onOpen: _, onCopyLink: y, onShare: b, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let O = c ?? s.length, k = f === "gone", M = f !== "saving" && f !== "failed" && !k && !!_, N = () => {
		_?.(n);
	}, P = u != null && u > 0 ? oe(u) : "", F = de(l), I = pe(s, O), { state: L, label: R } = ue[f], z = [
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
	], B = z.length ? [{
		items: z,
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
				"aria-label": M ? `Play ${a.toLowerCase()}` : `${a}: ${R.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", M ? "cursor-pointer" : "cursor-default"),
				children: [
					d ? /* @__PURE__ */ A("img", {
						src: d,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ A(me, {
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
								children: a
							}), g && /* @__PURE__ */ A("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: "📌"
							})]
						}),
						o && /* @__PURE__ */ j("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", o]
						}),
						O > 0 && /* @__PURE__ */ j("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ A(r, {
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
								children: I
							})]
						}),
						/* @__PURE__ */ j("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ A(v, {
									state: L,
									label: R,
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
				}), B.length > 0 && /* @__PURE__ */ A(i, {
					trigger: /* @__PURE__ */ A("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: B,
					"data-testid": `${D}-menu`
				})]
			})]
		}), h && f !== "failed" && !k && /* @__PURE__ */ j("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ j("span", { children: ["Set to expire ", fe(h)] }), w && /* @__PURE__ */ A(t, {
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
function K(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function ge(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function q(e, t) {
	let n = e.names && e.names.length > 0 ? K(e.names) : e.userIds.length > 0 ? K(e.userIds) : "", r = e.actorName ?? e.actorId;
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
var ve = [
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
], J = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, ye = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, be = 6;
function Y(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function xe(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Se(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Y(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Y(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Y(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${xe(e.index)}`;
		case "deleteBlock": return `Removed block ${xe(e.index)}`;
		case "appendMacro": return t ? `Added a ${Y(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${xe(e.index)}`;
		case "setDocumentType": return `Type: ${Y(t, 40)}`;
		case "skip": return t ? Y(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Y(t)}` : e.op;
	}
}
function X(e) {
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
	let t = X(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Ce(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Z = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Te({ runId: r, instruction: i, agentName: a, requestedBy: o, command: c = "/doc", status: l, onOpenDocument: u, onOpenRun: d, result: f, onOpenResult: p, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = l?.phase ?? "received", [S, C] = O(v), w = x === "completed" ? l?.suggestion ?? h : void 0, T = x === "completed" ? l?.review : void 0, E = !!w && !T, D = x === "completed" && l?.noop === !0, k = x === "completed" ? l?.result ?? f : void 0, M = k?.kind === "link" && k.label ? k.label : "Open", N = u && !(k?.kind === "document" && p), P = J[x], F = x === "failed" || x === "rejected", I = F ? "danger" : T ? T.decision === "accept" ? "success" : "neutral" : D ? "warning" : x === "completed" ? w ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", L = T ? "Reviewed" : E ? "Suggested" : D ? "No change" : ye[x], R = T ? T.byName ?? T.by : void 0, z = T ? `${T.decision === "accept" ? "Accepted" : "Rejected"} by ${R}` : void 0, B = x === "awaiting_approval", V = x === "running" ? l?.stepLabel ? `${a} — ${l.stepLabel}` : `${a} is working via the pipeline` : B ? `Waiting for approval${l?.detail ? ` — ${l.detail}` : ""}` : z ?? l?.detail ?? (E && l?.suggestion ? `${l.suggestion.applied} ${l.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : L), H = l?.details, ee = H?.ops ?? [], te = H?.steps ?? [], U = H?.document?.title || _ || "Document", W = !!H?.document || !!u, G = H?.error ?? (x === "failed" ? l?.detail : void 0), ne = we(H), re = `${b}-details-${r}`;
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
						tone: I,
						"data-testid": `${b}-phase`,
						children: L
					}),
					/* @__PURE__ */ A(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? re : void 0,
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
						children: ve.map((t, n) => {
							let r = F ? n < P : n < P || n === P && x === "completed", i = n === P && x !== "completed" && !F, a = F && n === P;
							return /* @__PURE__ */ j("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ A("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? D && n === P ? "bg-warning" : "bg-success" : i ? B ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ A("span", {
									className: "sr-only",
									children: a ? L : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ A("span", {
						className: e("min-w-0 flex-1 truncate", T && (T.decision === "accept" ? "text-success" : "text-text-tertiary"), x === "failed" && "text-danger", D && "text-warning-fg"),
						"data-testid": `${b}-detail`,
						"data-review": T?.decision,
						title: l?.detail,
						children: V
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
					B && m && /* @__PURE__ */ j("span", {
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
				id: re,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					W && /* @__PURE__ */ j("div", {
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
									children: U
								}), H?.document?.snippet && /* @__PURE__ */ A("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: H.document.snippet
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
					ee.length > 0 && /* @__PURE__ */ j("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ A("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ A("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: ee.slice(0, be).map((e, t) => /* @__PURE__ */ A("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Se(e)
								}, t))
							}),
							ee.length > be && /* @__PURE__ */ j("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									ee.length - be,
									" more"
								]
							})
						]
					}),
					te.length > 0 && /* @__PURE__ */ A("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: te.map((t) => /* @__PURE__ */ j("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ A("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Z[t.status] ?? Z.pending)
							}), /* @__PURE__ */ A("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					G && /* @__PURE__ */ A("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: G
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
							ne && /* @__PURE__ */ A("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${b}-details-timings`,
								children: ne
							})
						]
					})
				]
			})
		]
	});
}
function Ee(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = De(e.result);
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
function De(e) {
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
function Oe(e, t) {
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
function ke(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Ae({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = E(() => Oe(t, n), [t, n]);
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
			title: ke(t),
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
var je = [
	"👍",
	"🎉",
	"❤️"
], Me = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ne({ quickReactions: t = je, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: s, pinned: c = !1, onCopyLink: l, onEdit: u, onDelete: d, className: f, "data-testid": p = "message-actions" }) {
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
			r && m("More reactions", r, /* @__PURE__ */ A("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && m("Reply", i, /* @__PURE__ */ A("span", {
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
			u && m("Edit message", u, /* @__PURE__ */ A(a, { size: 13 }), "edit"),
			d && m("Delete message", d, /* @__PURE__ */ A(o, { size: 13 }), "delete")
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
function Q(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function Re({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Q(t), o = n ?? t.preview;
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
			children: [/* @__PURE__ */ A(Ve, {}), /* @__PURE__ */ j("span", {
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
function ze(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Be({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
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
			}) : /* @__PURE__ */ A(Ve, {}),
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
function Ve() {
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
function He({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = L(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ j("div", {
		role: "separator",
		"aria-label": R(t),
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
function Ue(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function We(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function Ge(e) {
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
function Ke(e) {
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
var qe = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function Je(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => qe[e] ?? e)
	};
}
function Ye(e) {
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
function Xe(e) {
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
function Ze(e) {
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
function Qe(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function $e(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Qe(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function et(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function tt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function nt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = et(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = et(r), i = tt(r);
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
		let e = et(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = et(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var rt = 3, it = 2, at = 3e5;
function ot(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function st(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Ee(e.metadata) || Xe(e.metadata) || Ye(e.metadata) || Ge(e.metadata) || Ze(e.metadata));
}
function ct(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = ot(r);
	if (!i || i !== ot(n) || !st(n) || !st(r) || r.editedAt || I(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= at;
}
function $({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: l, composer: d, currentUserId: p, reactionsFor: g, onToggleReaction: v, onReply: C, onTogglePin: E, onEditMessage: M, onDeleteMessage: N, pinnedMessageIds: P, onJumpToMessage: F, highlightedMessageId: L, threaded: R = !1, alignOwnMessages: B = !0, documentEditors: H, callParticipants: ee, agentRunStatus: te, onOpenRun: U, onOpenResult: W, onDecideRun: G, onReviewRun: ie, onJoinCall: oe, onOpenRecording: se, onCopyRecordingLink: ce, onShareRecording: ue, onDownloadRecording: de, onOpenRecordingTranscript: fe, onManageRecordingExpiry: pe, recordingStatus: me, onOpenDocument: K, tone: ge = "light", showHeader: q, fill: ve, onLoadMore: J, hasMore: ye, loadingMore: be = !1, onSendFiles: Y, transfers: xe = [], currentActor: Se, onCancelTransfer: X, attachmentSrc: Ce, onOpenAttachment: we, acceptFiles: Z, maxFileSize: De, onFileError: Oe, emojis: ke = S }) {
	let [je, Me] = O(null), [Fe, Ie] = O(null), Q = ge === "dark", Ve = m(), qe = q ?? !(Ve?.hasHeader ?? !1), tt = ve ?? Ve?.fillsHeight ?? !1, [at, ot] = O(""), st = D(null), $ = D(null), ut = !!J && ye !== !1, dt = D(null), ft = D(null), [pt, mt] = O(!1), ht = !!Y && !a, gt = $e(n, r), _t = R ? nt(gt) : null, [vt, yt] = O(() => /* @__PURE__ */ new Set());
	function bt(e) {
		yt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let [xt, St] = O(0), [Ct, wt] = O(!1), Tt = D(!0), Et = D(n.length), Dt = n.length + r.length + xe.length, Ot = D(null), [kt, At] = O(""), jt = D(null), Mt = D(!1), Nt = D(0);
	T(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!Mt.current) {
			Mt.current = !0, jt.current = t;
			return;
		}
		if (t === jt.current || (jt.current = t, p && e.userId === p)) return;
		Nt.current += 1;
		let r = Nt.current % 2 == 0 ? "​" : "";
		At(We(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, p]);
	function Pt() {
		let e = st.current;
		e && (e.scrollTop = e.scrollHeight, Tt.current = !0, St(0));
	}
	function Ft() {
		let e = st.current;
		if (!e) return;
		let t = Ue(e);
		Tt.current = t, t && St(0), wt(e.scrollTop > 8);
	}
	T(() => {
		let e = st.current, t = Et.current, n = Dt - t;
		if (Et.current = Dt, !e) return;
		let r = Ot.current;
		if (r && n > 0) {
			Ot.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Tt.current ? (e.scrollTop = e.scrollHeight, St(0), wt(e.scrollTop > 8)) : n > 0 && St((e) => e + n);
	}, [Dt]);
	function It() {
		let e = st.current;
		e && (Ot.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), J?.();
	}
	T(() => () => {
		$.current && clearTimeout($.current);
	}, []);
	function Lt() {
		let e = at.trim();
		!e || a || ($.current && clearTimeout($.current), $.current = null, o?.(!1), Tt.current = !0, i(e), ot(""));
	}
	function Rt(e) {
		!ht || e.length === 0 || (Tt.current = !0, Y?.(e));
	}
	function zt(e) {
		if (!ht) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Rt(t));
	}
	function Bt(e) {
		ot((t) => t + e), mt(!1);
	}
	function Vt() {
		a || (o?.(!0), $.current && clearTimeout($.current), $.current = setTimeout(() => o?.(!1), 2e3));
	}
	function Ht(e) {
		Vt(), e.key === "Enter" && !a && at.trim() && Lt();
	}
	function Ut(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = ct(a, n), l = !o && I(s, i) ? /* @__PURE__ */ A(He, {
			timestamp: s,
			tone: ge
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Ee(r.metadata);
			return /* @__PURE__ */ j(w, { children: [l, /* @__PURE__ */ A("div", {
				"data-testid": "chat-local-message",
				"data-local-message-id": r.id,
				className: "rounded-md",
				children: /* @__PURE__ */ A(V, {
					author: r.displayName,
					timestamp: r.timestamp,
					tone: ge,
					mine: !0,
					content: /* @__PURE__ */ j(k, { children: [
						i ? /* @__PURE__ */ A(Te, {
							runId: i.runId,
							instruction: i.instruction || r.content,
							command: i.command,
							agentName: i.agentName,
							requestedBy: r.displayName,
							status: te?.(i.runId),
							onOpenDocument: K && i.documentId ? () => K(i.documentId) : void 0,
							documentTitle: i.documentTitle,
							onOpenRun: U,
							result: i.result,
							onOpenResult: W,
							onDecide: G,
							suggestion: i.suggestionKey ? {
								key: i.suggestionKey,
								...i.documentId ? { documentId: i.documentId } : {}
							} : void 0,
							onReview: ie
						}) : /* @__PURE__ */ A(ne, { text: r.content }),
						/* @__PURE__ */ A("div", {
							"data-testid": "chat-local-message-note",
							className: e("mt-1 text-[11px] italic", Q ? "text-white/50" : "text-text-tertiary"),
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
		let { message: u } = n, d = u.displayName ?? u.clientId.slice(0, 8), f = u.attachments ?? [], m = u.metadata?.html, h = typeof m == "string" ? m : void 0, _ = /* @__PURE__ */ A(ne, {
			html: h,
			text: u.content
		}), y = Ge(u.metadata), b = Ee(u.metadata), x = Ye(u.metadata), S = Xe(u.metadata), T = Ze(u.metadata), D = Je(u.metadata), O = Ke(u.metadata), R = b ? /* @__PURE__ */ A(Te, {
			runId: b.runId,
			instruction: b.instruction || u.content.replace(/^\/doc\s*/i, ""),
			command: b.command,
			agentName: b.agentName,
			requestedBy: u.displayName,
			status: te?.(b.runId),
			onOpenDocument: K && b.documentId ? () => K(b.documentId) : void 0,
			documentTitle: b.documentTitle,
			onOpenRun: U,
			result: b.result,
			onOpenResult: W,
			onDecide: G,
			suggestion: b.suggestionKey ? {
				key: b.suggestionKey,
				...b.documentId ? { documentId: b.documentId } : {}
			} : void 0,
			onReview: ie
		}) : S ? (() => {
			let e = me?.(S.recordingId), t = {
				...S,
				...e ?? {}
			};
			return /* @__PURE__ */ A(he, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? u.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!u.id && !!P?.has(u.id),
				onOpen: se,
				onCopyLink: ce,
				onShare: ue,
				onDownload: de,
				onOpenTranscript: fe,
				onManageExpiry: pe,
				onTogglePin: E ? () => E(u) : void 0
			});
		})() : x ? /* @__PURE__ */ A(le, {
			callId: x.callId,
			startedBy: (typeof u.metadata?.displayName == "string" ? u.metadata.displayName : void 0) ?? u.displayName,
			participants: ee?.(x.callId) ?? x.participants,
			live: x.live,
			durationMs: x.durationMs,
			audioOnly: x.audioOnly,
			recorded: x.recorded,
			notRecordedReason: x.notRecordedReason,
			lobbyName: x.lobbyName,
			onJoin: oe
		}) : y ? /* @__PURE__ */ A(re, {
			documentId: y.documentId,
			title: y.title || u.content,
			icon: y.icon,
			createdBy: y.createdBy ?? (typeof u.metadata?.displayName == "string" ? u.metadata.displayName : void 0) ?? u.displayName,
			editors: H?.(y.documentId) ?? [],
			onOpen: K
		}) : f.length === 0 ? _ : /* @__PURE__ */ j(k, { children: [(u.content || h) && _, f.map((e) => /* @__PURE__ */ A(Re, {
			attachment: e,
			src: Ce?.(e),
			onOpen: we
		}, e.id))] }), q = u.id ?? "", ve = q && g ? g(q) : [], J = u.metadata?.replyTo, ye = !!o && !!J && J.messageId === o.rootId, be = !!J && !ye, Y = !!q && !!P?.has(q), xe = !!p && u.userId === p, Se = u.metadata?.system === !0, X = !!u.deletedAt || u.metadata?.deleted === !0, Z = xe && !X && !Se && !(b || S || x || y || T) && !!q, De = Z && !!M && je === q, Oe = /* @__PURE__ */ j(k, { children: [
			be && J && /* @__PURE__ */ A(Le, {
				quote: J,
				onJump: F,
				className: "mb-1"
			}),
			Y && /* @__PURE__ */ A("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: "📌 Pinned"
			}),
			X ? /* @__PURE__ */ A("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : De ? /* @__PURE__ */ A(Pe, {
				initialText: u.content,
				onSave: async (e) => {
					await M(u, e), Me(null);
				},
				onCancel: () => Me(null)
			}) : R,
			!X && O.length > 0 && /* @__PURE__ */ A("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: O.map((e) => /* @__PURE__ */ A(ae, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: K
				}, e.id))
			}),
			!X && D && /* @__PURE__ */ j("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					D.labels.length > 0 ? `Too large to send: ${D.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!X && ve.length > 0 && p && v && /* @__PURE__ */ A(Ae, {
				reactions: ve,
				currentUserId: p,
				onToggle: (e) => v(q, e)
			})
		] });
		return T ? /* @__PURE__ */ j(w, { children: [l, /* @__PURE__ */ A(_e, {
			membership: T,
			fallbackText: u.content,
			timestamp: u.timestamp,
			"data-testid": "membership-notice"
		})] }, u.id ?? r) : /* @__PURE__ */ j(w, { children: [l, /* @__PURE__ */ j("div", {
			"data-testid": "chat-message",
			"data-message-id": q || void 0,
			"data-continues": c ? "true" : void 0,
			title: c ? z(u.timestamp) : void 0,
			className: e("group relative rounded-md transition-colors hover:bg-surface-hover", q && q === L && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
			children: [/* @__PURE__ */ A(V, {
				author: d,
				content: Oe,
				timestamp: c ? "" : u.timestamp,
				editedAt: X ? void 0 : u.editedAt,
				avatarUrl: u.avatarUrl,
				hideAvatar: c,
				hideAuthor: c,
				tone: ge,
				mine: xe && B
			}), q && !X && !De && (v || Z || !Se && (C || E)) && /* @__PURE__ */ A(Ne, {
				className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
				onReact: v ? (e) => v(q, e) : void 0,
				onReply: C && !Se ? () => C(o?.rootMessage ?? u) : void 0,
				onTogglePin: E && !Se ? () => E(u) : void 0,
				pinned: !!u.id && !!P?.has(u.id),
				onEdit: Z && M ? () => Me(q) : void 0,
				onDelete: Z && N ? () => Ie(q) : void 0
			})]
		})] }, u.id ?? r);
	}
	function Wt(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Gt(e) {
		if (!C || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !Ze(t.metadata)) return t;
	}
	function Kt(t, n, r) {
		let i = Qe(r?.root), a = r && r.replies.length === 0 && !Gt(r.root) ? r.root : void 0, o = Ut(t.root, n, i, a), s = Qe(t.root) ?? "", c = n > 0 && !I(s, i) ? /* @__PURE__ */ A("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Q ? "border-white/10" : "border-border-subtle")
		}) : null, l = Gt(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ j(w, { children: [c, o] }, `post:${et(t.root) ?? n}`) : o;
		let u = et(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > rt, p = !f || vt.has(u), m = p ? t.replies : t.replies.slice(0, it), h = t.replies.length - m.length, g = [...new Set(t.replies.slice(m.length).map(Wt))].slice(0, 3);
		return /* @__PURE__ */ j(w, { children: [c, /* @__PURE__ */ j("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ j("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Q ? "border-white/20" : "border-border"),
					children: [m.map((e, t) => Ut(e, t, void 0, m[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ j("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => bt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && g.length > 0 && /* @__PURE__ */ A("span", {
							className: "flex items-center gap-0.5",
							children: g.map((e) => /* @__PURE__ */ A(_, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${h} more ${h === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ A("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ A("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Wt(t.root)}`,
						onClick: () => C?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let qt = /* @__PURE__ */ j("div", {
		"data-testid": "chat-panel",
		className: e(tt ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", Q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			qe && /* @__PURE__ */ j("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Q ? "text-white/90" : "text-text-primary"),
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
				children: kt
			}),
			/* @__PURE__ */ j("div", {
				className: e("relative flex flex-col mb-2", tt ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ A("div", {
					ref: st,
					onScroll: Ft,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Ct && "fade-top", tt ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ j("div", {
						className: "mt-auto pb-4",
						children: [
							ut && n.length > 0 && /* @__PURE__ */ A("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ A("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: It,
									disabled: be,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: be ? "Loading…" : "Load earlier messages"
								})
							}),
							gt.length === 0 ? l ?? /* @__PURE__ */ A("div", {
								className: e("text-sm", Q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : _t ? _t.map((e, t) => Kt(e, t, _t[t - 1])) : gt.map((e, t) => Ut(e, t, Qe(gt[t - 1]), gt[t - 1])),
							N && /* @__PURE__ */ A(c, {
								open: Fe !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ie(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Fe);
									Ie(null), e && N(e);
								}
							}),
							xe.map((e) => /* @__PURE__ */ A(V, {
								author: e.actor,
								timestamp: "",
								tone: ge,
								content: /* @__PURE__ */ A(Be, {
									transfer: e,
									mine: ze(e, p, Se),
									onCancel: X
								})
							}, e.transferId))
						]
					})
				}), xt > 0 && /* @__PURE__ */ j("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Pt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						xt,
						" new message",
						xt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ A(u, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Q ? "text-white/50" : "text-text-secondary")
			}),
			d ? /* @__PURE__ */ A("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Vt : void 0,
				children: d
			}) : /* @__PURE__ */ j("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Y && /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !ht,
						onClick: () => dt.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ A(lt, {})
					}), /* @__PURE__ */ A(y, {
						ref: dt,
						multiple: !0,
						accept: Z,
						onFiles: (e) => {
							let t = De ? e.filter((e) => e.size > De) : [];
							t.length > 0 && Oe?.(`Skipped ${t.length} file(s) over the size limit.`), Rt(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ A("button", {
						ref: ft,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": pt,
						title: "Insert emoji",
						disabled: a,
						onClick: () => mt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ A("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ A(b, {
						open: pt,
						onSelect: Bt,
						onClose: () => mt(!1),
						triggerRef: ft,
						emojis: ke
					}),
					/* @__PURE__ */ A(h, {
						size: "sm",
						value: at,
						onChange: (e) => ot(e.target.value),
						onKeyDown: Ht,
						onPaste: zt,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", Q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ A(t, {
						variant: "primary",
						size: "sm",
						onClick: Lt,
						disabled: a || !at.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Y ? /* @__PURE__ */ A(x, {
		onFiles: Rt,
		accept: Z,
		maxSize: De,
		onError: Oe,
		disabled: a,
		className: tt ? "flex h-full min-h-0 flex-col" : void 0,
		children: qt
	}) : qt;
}
function lt() {
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
function ut(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function dt({ users: e, currentClientId: t }) {
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
			let n = N(ut(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = P(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
function ft({ leading: e, title: t, meta: n, actions: r, onJump: i, jumpLabel: a, "data-testid": o, "data-unread": s }) {
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
function pt(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function mt({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ A("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ A("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function ht({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ A(mt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "📌",
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ A(ft, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ A(_, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [
				e.author,
				e.pinnedBy && `pinned by ${e.pinnedBy}`,
				pt(e.pinnedAt)
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
function gt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ A(mt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "📎",
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Q(e.attachment);
			return /* @__PURE__ */ A(ft, {
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
					pt(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function _t({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ A(mt, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ A(ft, {
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
				pt(e.at)
			].filter(Boolean).join(" · "),
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function vt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function yt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function bt({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ A(mt, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ A(l, {
			icon: "🎥",
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ A(ft, {
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
				title: [pt(e.startedAt), vt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : yt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function xt({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": a = "channel-documents-panel" }) {
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
			children: t.map((e) => /* @__PURE__ */ A(ft, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ A("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm",
					children: e.icon || "📄"
				}),
				title: e.title || "Untitled",
				meta: [
					e.createdBy,
					pt(e.updatedAt),
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
var St = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Ct = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function wt({ name: t, description: r, online: i, avatarUrl: a, features: o = St, children: s, canvas: c, members: l, memberCount: u, files: f = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: v = [], onUnpin: y, mentions: b = [], onOpenMention: x, recordings: S = [], onOpenRecording: C, onJumpToMessage: w, onStartCall: T, callModeFixed: E = !1, onWatch: D, watchLabel: M, watchHint: N, watchViewerCount: P, callInProgress: F = !1, headerActions: I, view: L, onViewChange: R, className: z, "data-testid": B = "conversation-surface" }) {
	let V = new Set(o), [H, ee] = O("chat"), te = L ?? H, U = V.has(te) ? te : o[0] ?? "chat", W = (e) => {
		L === void 0 && ee(e), R?.(e);
	}, G = (e) => e || void 0, ne = o.filter((e) => Ct[e]).map((e) => ({
		id: e,
		label: Ct[e],
		badge: e === "files" ? G(f.length) : e === "documents" ? G(h.length) : e === "pins" ? G(v.length) : e === "members" ? u == null ? void 0 : G(u) : e === "calls" ? G(S.length) : e === "mentions" ? G(b.filter((e) => e.unread).length) : void 0
	})), re = (e) => {
		W("chat"), w?.(e);
	};
	return /* @__PURE__ */ j("section", {
		className: e("flex min-w-0 flex-col", z),
		"data-testid": B,
		children: [
			/* @__PURE__ */ A(p, {
				name: t,
				description: r,
				online: i,
				avatarUrl: a,
				"data-testid": `${B}-header`,
				tabs: ne.length > 1 ? /* @__PURE__ */ A(d, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: U,
					onValueChange: (e) => W(e),
					items: ne
				}) : void 0,
				actions: T || D || I ? /* @__PURE__ */ j(k, { children: [
					T && (E ? /* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call" : "Start a call",
						title: F ? "Join the call" : "Start a call",
						"data-testid": `${B}-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "📞"
					}) : /* @__PURE__ */ j(k, { children: [/* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call with audio" : "Start an audio call",
						title: F ? "Join with audio" : "Audio call",
						"data-testid": `${B}-audio-call`,
						onClick: () => T(!0),
						children: "📞"
					}), /* @__PURE__ */ A(n, {
						"aria-label": F ? "Join the call with video" : "Start a video call",
						title: F ? "Join with video" : "Video call",
						"data-testid": `${B}-video-call`,
						variant: F ? "primary" : "ghost",
						onClick: () => T(!1),
						children: "🎥"
					})] })),
					D && /* @__PURE__ */ A(Tt, {
						testId: `${B}-watch`,
						label: M,
						hint: N,
						viewerCount: P,
						onClick: D
					}),
					I
				] }) : void 0
			}),
			V.has("files") && U === "files" && /* @__PURE__ */ A(gt, {
				className: "min-h-0 flex-1",
				files: f,
				thumbnailSrc: m,
				onJump: w ? re : void 0
			}),
			V.has("documents") && U === "documents" && /* @__PURE__ */ A(xt, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			V.has("pins") && U === "pins" && /* @__PURE__ */ A(ht, {
				className: "min-h-0 flex-1",
				pins: v,
				onUnpin: y,
				onJump: w ? re : void 0
			}),
			V.has("members") && U === "members" && /* @__PURE__ */ A("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-members`,
				children: l
			}),
			V.has("mentions") && U === "mentions" && /* @__PURE__ */ A(_t, {
				className: "min-h-0 flex-1",
				mentions: b,
				onJump: x ? (e, t) => {
					W("chat"), x(e, t);
				} : void 0
			}),
			V.has("calls") && U === "calls" && /* @__PURE__ */ A(bt, {
				className: "min-h-0 flex-1",
				recordings: S,
				onOpen: C
			}),
			V.has("chat") && /* @__PURE__ */ j("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-chat`,
				hidden: U !== "chat",
				children: [c && /* @__PURE__ */ A("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${B}-canvas`,
					children: c
				}), /* @__PURE__ */ A("div", {
					className: "min-h-0 flex-1",
					children: s
				})]
			})
		]
	});
}
function Tt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", s = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ j(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Et,
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
var Et = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { P as $, Ee as A, se as B, Pe as C, Oe as D, ke as E, q as F, V as G, ae as H, ge as I, L as J, B as K, he as L, we as M, Se as N, Z as O, _e as P, N as Q, pe as R, Fe as S, Ae as T, re as U, oe as V, ne as W, z as X, R as Y, I as Z, He as _, _t as a, Q as b, vt as c, Ye as d, Ge as f, Je as g, Xe as h, gt as i, De as j, Te as k, dt as l, Ze as m, wt as n, bt as o, Ke as p, F as q, xt as r, ht as s, St as t, $ as u, Re as v, Ne as w, Le as x, Be as y, le as z };
