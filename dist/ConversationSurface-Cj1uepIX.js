import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, b as i, f as a, k as o, m as s, n as c, p as l, t as u, x as d, y as f } from "./DropdownMenu-BvQCmhcx.js";
import { t as p } from "./Chip-BENLwTlq.js";
import { t as m } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as h } from "./EmptyState-JzzL2z1E.js";
import { n as g, o as _, s as v, t as ee } from "./ChannelHeader-BOsRE9TC.js";
import { n as y } from "./DockedPanelContext-pH9A5z1h.js";
import { t as b } from "./Input-DLknWXri.js";
import { t as x } from "./Textarea-Dz4doxTv.js";
import { t as S } from "./Avatar-BzicCOft.js";
import { t as C } from "./StatusPill-Db42eiME.js";
import { i as w, n as T, r as E, t as D } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as O } from "./formatBytes-05ivRSJY.js";
import { Fragment as k, useEffect as A, useMemo as j, useRef as M, useState as N } from "react";
import { Fragment as P, jsx as F, jsxs as I } from "react/jsx-runtime";
//#region src/utils/identity.ts
var L = [
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
function R(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return L[Math.abs(t) % L.length];
}
function z(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function te(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function B(e, t) {
	let n = te(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = te(t);
	return r ? n !== r : !1;
}
function V(e, t = /* @__PURE__ */ new Date()) {
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
function ne(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function re(e) {
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
function ie(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function H({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = ie(r), m = !o || !!p;
	return /* @__PURE__ */ I("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ F("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ F(S, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ I("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ I("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ F("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ F("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: re(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ F("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${re(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ F("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ F("div", {
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
var U = /* @__PURE__ */ new Set([
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
]), W = /^(https?:|mailto:)/i;
function ae(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || W.test(t) ? t : null;
}
function oe(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => oe(e, `${t}-${n}`));
	if (!U.has(n.tagName)) return /* @__PURE__ */ F("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ F("br", {}, t);
		case "A": {
			let e = ae(n.getAttribute("href"));
			return e ? /* @__PURE__ */ F("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ F("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ F("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ F(e, { children: r }, t);
		}
	}
}
var se = /```([\s\S]*?)```|`([^`\n]+)`/g;
function ce(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (se.lastIndex = 0; (r = se.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ F("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ F("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ F("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function le({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = j(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => oe(e, `n${t}`));
	}, [t]), o = j(() => ce(n ?? ""), [n]);
	return /* @__PURE__ */ F("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ue({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": l = "document-activity-card" }) {
	let u = a.length > 0;
	return /* @__PURE__ */ I("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ I("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ F("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ F("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${de(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ F("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ F(c, {
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
			o && /* @__PURE__ */ F("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function de(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function fe({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ I("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ F("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ F("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function pe(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function me(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function he(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ge({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !i && typeof a == "number" ? pe(a) : "", h = o === void 0 ? "Call" : o ? "Audio call" : "Video call", g = i ? me(r, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ I("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ I("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ F("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ F("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && s === !1 && /* @__PURE__ */ F("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: he(l, u)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ F("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ F(c, {
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
			i && d && /* @__PURE__ */ F("button", {
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
var _e = {
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
function G(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function ve(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function K(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function ye({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ I("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ F("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ F(S, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ I("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ F("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ F("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ F("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function be({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: l, thumbnailUrl: d, stage: f = "ready", transcriptReady: p = !1, summaryReady: m = !1, expiresAt: h, pinned: g = !1, onOpen: _, onCopyLink: v, onShare: ee, onTogglePin: y, onDownload: b, onOpenTranscript: x, onManageExpiry: S, onParticipantClick: w, className: T, "data-testid": E = "recording-activity-card" }) {
	let D = o ?? a.length, O = f === "gone", k = f !== "saving" && f !== "failed" && !O && !!_, A = () => {
		_?.(n);
	}, j = l != null && l > 0 ? pe(l) : "", M = G(s), N = K(a, D), { state: P, label: L } = _e[f], R = [
		..._ && k ? [{
			"data-testid": `${E}-menu-open`,
			label: "Open",
			onSelect: A
		}] : [],
		...x && p ? [{
			"data-testid": `${E}-menu-transcript`,
			label: "Transcript",
			onSelect: () => x(n)
		}] : [],
		...v && !O ? [{
			"data-testid": `${E}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => v(n)
		}] : [],
		...ee && !O ? [{
			"data-testid": `${E}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => ee(n)
		}] : [],
		...y && !O ? [{
			"data-testid": `${E}-menu-pin`,
			label: g ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && k ? [{
			"data-testid": `${E}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], z = R.length ? [{
		items: R,
		"data-testid": `${E}-menu-items`
	}] : [];
	return /* @__PURE__ */ I("div", {
		"data-testid": E,
		"data-recording-id": n,
		"data-stage": f,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", T),
		children: [/* @__PURE__ */ I("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ I("button", {
				type: "button",
				onClick: k ? A : void 0,
				disabled: !k,
				"aria-label": k ? `Play ${r.toLowerCase()}` : `${r}: ${L.toLowerCase()}`,
				"data-testid": `${E}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", k ? "cursor-pointer" : "cursor-default"),
				children: [
					d ? /* @__PURE__ */ F("img", {
						src: d,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${E}-thumbnail`
					}) : /* @__PURE__ */ F(ye, {
						participants: a,
						total: D,
						testId: E
					}),
					k && /* @__PURE__ */ F("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ F("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ F("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ F("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					j && /* @__PURE__ */ F("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${E}-duration`,
						children: j
					})
				]
			}), /* @__PURE__ */ I("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ I("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ I("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ F("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${E}-title`,
								children: r
							}), g && /* @__PURE__ */ F("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${E}-pinned`,
								title: "Pinned",
								children: "📌"
							})]
						}),
						i && /* @__PURE__ */ I("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${E}-by`,
							children: ["by ", i]
						}),
						D > 0 && /* @__PURE__ */ I("div", {
							className: "flex items-center gap-2",
							"data-testid": `${E}-people`,
							children: [/* @__PURE__ */ F(c, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: w
							}), /* @__PURE__ */ F("span", {
								className: "truncate text-xs text-text-tertiary",
								children: N
							})]
						}),
						/* @__PURE__ */ I("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ F(C, {
									state: P,
									label: L,
									size: "sm",
									"data-testid": `${E}-stage`
								}),
								f === "ready" && p && /* @__PURE__ */ F(C, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${E}-transcript`
								}),
								f === "ready" && m && /* @__PURE__ */ F(C, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${E}-summary`
								}),
								M && /* @__PURE__ */ F("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${E}-when`,
									children: M
								})
							]
						})
					]
				}), z.length > 0 && /* @__PURE__ */ F(u, {
					trigger: /* @__PURE__ */ F("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: z,
					"data-testid": `${E}-menu`
				})]
			})]
		}), h && f !== "failed" && !O && /* @__PURE__ */ I("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${E}-expiry`,
			children: [/* @__PURE__ */ I("span", { children: ["Set to expire ", ve(h)] }), S && /* @__PURE__ */ F(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => S(n),
				"data-testid": `${E}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function xe(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function Se(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Ce(e, t) {
	let n = e.names && e.names.length > 0 ? xe(e.names) : e.userIds.length > 0 ? xe(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = Se(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function we({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Ce(t, n);
	return /* @__PURE__ */ I("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ F("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ F("time", {
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
var Te = [
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
], q = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Ee = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, De = 6;
function J(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Y(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Oe(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${J(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${J(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${J(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Y(e.index)}`;
		case "deleteBlock": return `Removed block ${Y(e.index)}`;
		case "appendMacro": return t ? `Added a ${J(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Y(e.index)}`;
		case "setDocumentType": return `Type: ${J(t, 40)}`;
		case "skip": return t ? J(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${J(t)}` : e.op;
	}
}
function ke(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Ae(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function je(e) {
	if (!e?.startedAt) return null;
	let t = ke(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Ae(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Me = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Ne({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: m, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: ee, "data-testid": y = "agent-run-card" }) {
	let b = c?.phase ?? "received", [x, S] = N(v), C = b === "completed" ? c?.suggestion ?? h : void 0, w = b === "completed" ? c?.review : void 0, T = !!C && !w, E = b === "completed" && c?.noop === !0, D = b === "completed" ? c?.result ?? d : void 0, O = D?.kind === "link" && D.label ? D.label : "Open", k = l && !(D?.kind === "document" && f), A = q[b], j = b === "failed" || b === "rejected", M = j ? "danger" : w ? w.decision === "accept" ? "success" : "neutral" : E ? "warning" : b === "completed" ? C ? "warning" : "success" : b === "awaiting_approval" ? "warning" : "info", P = w ? "Reviewed" : T ? "Suggested" : E ? "No change" : Ee[b], L = w ? w.byName ?? w.by : void 0, R = w ? `${w.decision === "accept" ? "Accepted" : "Rejected"} by ${L}` : void 0, z = b === "awaiting_approval", te = b === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : z ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : R ?? c?.detail ?? (T && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : b === "received" ? "Received" : P), B = c?.details, V = B?.ops ?? [], ne = B?.steps ?? [], re = B?.document?.title || _ || "Document", ie = !!B?.document || !!l, H = B?.error ?? (b === "failed" ? c?.detail : void 0), U = je(B), W = `${y}-details-${r}`;
	return /* @__PURE__ */ I("div", {
		className: e("flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", ee),
		"data-testid": y,
		"data-phase": b,
		"data-run-id": r,
		"data-expanded": x ? "true" : void 0,
		title: o ? `${o} asked ${a}: ${i}` : `${a}: ${i}`,
		onClick: (e) => {
			e.target.closest("button, a") || S((e) => !e);
		},
		children: [
			/* @__PURE__ */ I("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ F("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ I("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${y}-instruction`,
						children: [
							/* @__PURE__ */ F("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ F(p, {
						size: "xs",
						tone: M,
						"data-testid": `${y}-phase`,
						children: P
					}),
					/* @__PURE__ */ F(n, {
						size: "sm",
						"aria-label": x ? "Hide details" : "Show details",
						"aria-expanded": x,
						"aria-controls": x ? W : void 0,
						onClick: () => S((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${y}-toggle`,
						icon: /* @__PURE__ */ F("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", x && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ I("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ F("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${y}-steps`,
						children: Te.map((t, n) => {
							let r = j ? n < A : n < A || n === A && b === "completed", i = n === A && b !== "completed" && !j, a = j && n === A;
							return /* @__PURE__ */ I("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ F("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? E && n === A ? "bg-warning" : "bg-success" : i ? z ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ F("span", {
									className: "sr-only",
									children: a ? P : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ F("span", {
						className: e("min-w-0 flex-1 truncate", w && (w.decision === "accept" ? "text-success" : "text-text-tertiary"), b === "failed" && "text-danger", E && "text-warning-fg"),
						"data-testid": `${y}-detail`,
						"data-review": w?.decision,
						title: c?.detail,
						children: te
					}),
					T && C && g && /* @__PURE__ */ I("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-review`,
						children: [/* @__PURE__ */ F(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: C.key,
								...C.documentId ? { documentId: C.documentId } : {}
							}),
							"data-testid": `${y}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ F(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "reject", {
								key: C.key,
								...C.documentId ? { documentId: C.documentId } : {}
							}),
							"data-testid": `${y}-reject-review`,
							children: "Reject"
						})]
					}),
					z && m && /* @__PURE__ */ I("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-decide`,
						children: [/* @__PURE__ */ F(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "approve"),
							"data-testid": `${y}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ F(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => m(r, "reject"),
							"data-testid": `${y}-reject`,
							children: "Reject"
						})]
					}),
					D && f && /* @__PURE__ */ F("button", {
						type: "button",
						onClick: () => f(D),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": D.kind,
						children: O
					}),
					D?.kind === "link" && !f && /* @__PURE__ */ F("a", {
						href: D.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": "link",
						children: O
					}),
					u && /* @__PURE__ */ F("button", {
						type: "button",
						onClick: () => u(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-run`,
						children: "run"
					}),
					k && /* @__PURE__ */ F("button", {
						type: "button",
						onClick: l,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-document`,
						children: "document"
					})
				]
			}),
			x && /* @__PURE__ */ I("div", {
				id: W,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${y}-details`,
				children: [
					ie && /* @__PURE__ */ I("div", {
						className: "flex items-start gap-2",
						"data-testid": `${y}-details-document`,
						children: [
							/* @__PURE__ */ F("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ I("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ F("span", {
									className: "block truncate font-medium text-text-primary",
									children: re
								}), B?.document?.snippet && /* @__PURE__ */ F("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${y}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							l && /* @__PURE__ */ F(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${y}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ I("div", {
						"data-testid": `${y}-details-ops`,
						children: [
							/* @__PURE__ */ F("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ F("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, De).map((e, t) => /* @__PURE__ */ F("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Oe(e)
								}, t))
							}),
							V.length > De && /* @__PURE__ */ I("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${y}-details-more-ops`,
								children: [
									"+",
									V.length - De,
									" more"
								]
							})
						]
					}),
					ne.length > 0 && /* @__PURE__ */ F("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${y}-details-steps`,
						children: ne.map((t) => /* @__PURE__ */ I("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ F("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Me[t.status] ?? Me.pending)
							}), /* @__PURE__ */ F("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					H && /* @__PURE__ */ F("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${y}-details-error`,
						children: H
					}),
					/* @__PURE__ */ I("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ F("button", {
								type: "button",
								onClick: () => u(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${y}-details-open-run`,
								children: "Open run"
							}),
							D && f && /* @__PURE__ */ F("button", {
								type: "button",
								onClick: () => f(D),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${y}-details-open-result`,
								children: O
							}),
							U && /* @__PURE__ */ F("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${y}-details-timings`,
								children: U
							})
						]
					})
				]
			})
		]
	});
}
function Pe(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = Fe(e.result);
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
function Fe(e) {
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
function Ie(e, t) {
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
function Le(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function Re({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = j(() => Ie(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ F("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ I("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Le(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ F("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var X = [
	"👍",
	"🎉",
	"❤️"
], ze = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Be({ quickReactions: t = X, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: s = !1, onCopyLink: c, onEdit: u, onDelete: d, className: f, "data-testid": p = "message-actions" }) {
	let m = (e, t, n, r) => /* @__PURE__ */ F("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${p}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${ze}`,
		children: n
	}, r);
	return /* @__PURE__ */ I("div", {
		"data-testid": p,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", f),
		children: [
			n && t.map((e) => m(`React ${e}`, () => n(e), /* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && m("More reactions", r, /* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && m("Reply", i, /* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && m(s ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: "📌"
			}), "pin"),
			c && m("Copy link to message", c, /* @__PURE__ */ F("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			u && m("Edit message", u, /* @__PURE__ */ F(l, { size: 13 }), "edit"),
			d && m("Delete message", d, /* @__PURE__ */ F(o, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ve({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = N(e), [s, c] = N(!1), [l, u] = N(null), d = M(null);
	A(() => {
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
	return /* @__PURE__ */ I("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ F(x, {
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
			/* @__PURE__ */ I("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ F("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ F(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ F(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ F("p", {
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
function He(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function Ue(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function We({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ I("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ F("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ F("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: Ue(t.timestamp)
		})]
	}), /* @__PURE__ */ F("span", {
		className: "block truncate text-xs text-text-secondary",
		children: He(t.text)
	})] });
	return /* @__PURE__ */ I("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ F("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ F("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ F("button", {
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
function Ge(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function Ke({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Ge(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ I("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ F("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ F("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ F("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ F("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ I("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ F("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ F("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: O(t.size)
			})]
		})]
	}) : /* @__PURE__ */ F("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ I("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ F(Ye, {}), /* @__PURE__ */ I("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ F("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ F("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: O(t.size)
				})]
			})]
		})
	});
}
function qe(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Je({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : O(o);
	return /* @__PURE__ */ I("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ F("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ F(Ye, {}),
			/* @__PURE__ */ I("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ I("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ F("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ F("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ F("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ F("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ F("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ F("button", {
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
function Ye() {
	return /* @__PURE__ */ F("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ F("path", {
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
function Xe({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = V(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ I("div", {
		role: "separator",
		"aria-label": ne(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ F("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ F("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ F("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Ze(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function Qe(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function $e(e) {
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
function et(e) {
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
var tt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function nt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => tt[e] ?? e)
	};
}
function rt(e) {
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
function it(e) {
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
function at(e) {
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
function ot(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function st(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(ot(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function ct(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Z(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function lt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = ct(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = ct(r), i = Z(r);
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
		let e = ct(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = ct(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var ut = 3, dt = 2, ft = 3e5;
function pt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function mt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Pe(e.metadata) || it(e.metadata) || rt(e.metadata) || $e(e.metadata) || at(e.metadata));
}
function ht(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = pt(r);
	if (!i || i !== pt(n) || !mt(n) || !mt(r) || r.editedAt || B(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= ft;
}
function gt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function _t(e) {
	return e.displayName || e.userId;
}
function vt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = pt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function yt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: d, onToggleReaction: f, onReply: p, onTogglePin: h, onEditMessage: _, onDeleteMessage: ee, pinnedMessageIds: x, onJumpToMessage: C, highlightedMessageId: O, threaded: j = !1, alignOwnMessages: L = !0, documentEditors: R, callParticipants: z, agentRunStatus: te, onOpenRun: V, onOpenResult: ne, onDecideRun: ie, onReviewRun: U, onJoinCall: W, onOpenRecording: ae, onCopyRecordingLink: oe, onShareRecording: se, onDownloadRecording: ce, onOpenRecordingTranscript: de, onManageRecordingExpiry: pe, recordingStatus: me, onOpenDocument: he, tone: _e = "light", showHeader: G, fill: ve, onLoadMore: K, hasMore: ye, loadingMore: xe = !1, onSendFiles: Se, transfers: Ce = [], currentActor: Te, onCancelTransfer: q, attachmentSrc: Ee, onOpenAttachment: De, acceptFiles: J, maxFileSize: Y, onFileError: Oe, readReceipts: ke = [], readReceiptsEnabled: Ae = !0, emojis: je = D }) {
	let [Me, Fe] = N(null), [Ie, Le] = N(null), X = _e === "dark", ze = y(), He = G ?? !(ze?.hasHeader ?? !1), Ue = ve ?? ze?.fillsHeight ?? !1, [Ge, Ye] = N(""), tt = M(null), Z = M(null), ft = !!K && ye !== !1, pt = M(null), mt = M(null), [yt, xt] = N(!1), St = !!Se && !a, Q = st(n, r), $ = j ? lt(Q) : null, [Ct, wt] = N(() => /* @__PURE__ */ new Set());
	function Tt(e) {
		wt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Et = Ae && u ? u : void 0, Dt = (() => {
		if (!(!Et || ke.length === 0)) for (let e = Q.length - 1; e >= 0; --e) {
			let t = Q[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Et || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), Ot = Dt && Et ? gt(ke, Et, Dt.timestamp) : [], kt = Ot.length === 1 && !!Et && vt(n, ke, Et) === 1;
	function At() {
		if (Ot.length === 0) return null;
		let t = Ot.map(_t), n = Ot.slice(0, 3);
		return /* @__PURE__ */ I("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", L ? "justify-end pr-1" : "justify-start pl-7", X ? "text-white/50" : "text-text-tertiary"),
			children: [
				Ot.length > 1 && /* @__PURE__ */ F("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ F(S, {
						name: _t(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ F("span", {
					"data-testid": "chat-read-receipts-label",
					children: kt ? "Seen" : `Seen by ${Ot.length}`
				}),
				/* @__PURE__ */ F("span", {
					style: v,
					children: kt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [jt, Mt] = N(0), [Nt, Pt] = N(!1), Ft = M(!0), It = M(n.length), Lt = n.length + r.length + Ce.length, Rt = M(null), [zt, Bt] = N(""), Vt = M(null), Ht = M(!1), Ut = M(0);
	A(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!Ht.current) {
			Ht.current = !0, Vt.current = t;
			return;
		}
		if (t === Vt.current || (Vt.current = t, u && e.userId === u)) return;
		Ut.current += 1;
		let r = Ut.current % 2 == 0 ? "​" : "";
		Bt(Qe(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function Wt() {
		let e = tt.current;
		e && (e.scrollTop = e.scrollHeight, Ft.current = !0, Mt(0));
	}
	function Gt() {
		let e = tt.current;
		if (!e) return;
		let t = Ze(e);
		Ft.current = t, t && Mt(0), Pt(e.scrollTop > 8);
	}
	A(() => {
		let e = tt.current, t = It.current, n = Lt - t;
		if (It.current = Lt, !e) return;
		let r = Rt.current;
		if (r && n > 0) {
			Rt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Ft.current ? (e.scrollTop = e.scrollHeight, Mt(0), Pt(e.scrollTop > 8)) : n > 0 && Mt((e) => e + n);
	}, [Lt]);
	function Kt() {
		let e = tt.current;
		e && (Rt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), K?.();
	}
	A(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function qt() {
		let e = Ge.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), Ft.current = !0, i(e), Ye(""));
	}
	function Jt(e) {
		!St || e.length === 0 || (Ft.current = !0, Se?.(e));
	}
	function Yt(e) {
		if (!St) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Jt(t));
	}
	function Xt(e) {
		Ye((t) => t + e), xt(!1);
	}
	function Zt() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function Qt(e) {
		Zt(), e.key === "Enter" && !a && Ge.trim() && qt();
	}
	function $t(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = ht(a, n), l = !o && B(s, i) ? /* @__PURE__ */ F(Xe, {
			timestamp: s,
			tone: _e
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Pe(r.metadata);
			return /* @__PURE__ */ I(k, { children: [l, /* @__PURE__ */ F("div", {
				"data-testid": "chat-local-message",
				"data-local-message-id": r.id,
				className: "rounded-md",
				children: /* @__PURE__ */ F(H, {
					author: r.displayName,
					timestamp: r.timestamp,
					tone: _e,
					mine: !0,
					content: /* @__PURE__ */ I(P, { children: [
						i ? /* @__PURE__ */ F(Ne, {
							runId: i.runId,
							instruction: i.instruction || r.content,
							command: i.command,
							agentName: i.agentName,
							requestedBy: r.displayName,
							status: te?.(i.runId),
							onOpenDocument: he && i.documentId ? () => he(i.documentId) : void 0,
							documentTitle: i.documentTitle,
							onOpenRun: V,
							result: i.result,
							onOpenResult: ne,
							onDecide: ie,
							suggestion: i.suggestionKey ? {
								key: i.suggestionKey,
								...i.documentId ? { documentId: i.documentId } : {}
							} : void 0,
							onReview: U
						}) : /* @__PURE__ */ F(le, { text: r.content }),
						/* @__PURE__ */ F("div", {
							"data-testid": "chat-local-message-note",
							className: e("mt-1 text-[11px] italic", X ? "text-white/50" : "text-text-tertiary"),
							children: r.note ?? "Only you can see this"
						}),
						r.actions && r.actions.length > 0 && /* @__PURE__ */ F("div", {
							className: "mt-1.5 flex flex-wrap gap-1.5",
							"data-testid": "chat-local-message-actions",
							children: r.actions.map((e) => /* @__PURE__ */ F(t, {
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
		let { message: m } = n, g = m.displayName ?? m.clientId.slice(0, 8), v = m.attachments ?? [], y = m.metadata?.html, b = typeof y == "string" ? y : void 0, S = /* @__PURE__ */ F(le, {
			html: b,
			text: m.content
		}), w = $e(m.metadata), T = Pe(m.metadata), E = rt(m.metadata), D = it(m.metadata), A = at(m.metadata), j = nt(m.metadata), M = et(m.metadata), N = T ? /* @__PURE__ */ F(Ne, {
			runId: T.runId,
			instruction: T.instruction || m.content.replace(/^\/doc\s*/i, ""),
			command: T.command,
			agentName: T.agentName,
			requestedBy: m.displayName,
			status: te?.(T.runId),
			onOpenDocument: he && T.documentId ? () => he(T.documentId) : void 0,
			documentTitle: T.documentTitle,
			onOpenRun: V,
			result: T.result,
			onOpenResult: ne,
			onDecide: ie,
			suggestion: T.suggestionKey ? {
				key: T.suggestionKey,
				...T.documentId ? { documentId: T.documentId } : {}
			} : void 0,
			onReview: U
		}) : D ? (() => {
			let e = me?.(D.recordingId), t = {
				...D,
				...e ?? {}
			};
			return /* @__PURE__ */ F(be, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? m.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!m.id && !!x?.has(m.id),
				onOpen: ae,
				onCopyLink: oe,
				onShare: se,
				onDownload: ce,
				onOpenTranscript: de,
				onManageExpiry: pe,
				onTogglePin: h ? () => h(m) : void 0
			});
		})() : E ? /* @__PURE__ */ F(ge, {
			callId: E.callId,
			startedBy: (typeof m.metadata?.displayName == "string" ? m.metadata.displayName : void 0) ?? m.displayName,
			participants: z?.(E.callId) ?? E.participants,
			live: E.live,
			durationMs: E.durationMs,
			audioOnly: E.audioOnly,
			recorded: E.recorded,
			notRecordedReason: E.notRecordedReason,
			lobbyName: E.lobbyName,
			onJoin: W
		}) : w ? /* @__PURE__ */ F(ue, {
			documentId: w.documentId,
			title: w.title || m.content,
			icon: w.icon,
			createdBy: w.createdBy ?? (typeof m.metadata?.displayName == "string" ? m.metadata.displayName : void 0) ?? m.displayName,
			editors: R?.(w.documentId) ?? [],
			onOpen: he
		}) : v.length === 0 ? S : /* @__PURE__ */ I(P, { children: [(m.content || b) && S, v.map((e) => /* @__PURE__ */ F(Ke, {
			attachment: e,
			src: Ee?.(e),
			onOpen: De
		}, e.id))] }), G = m.id ?? "", ve = G && d ? d(G) : [], K = m.metadata?.replyTo, ye = !!o && !!K && K.messageId === o.rootId, xe = !!K && !ye, Se = !!G && !!x?.has(G), Ce = !!u && m.userId === u, Te = m.metadata?.system === !0, q = !!m.deletedAt || m.metadata?.deleted === !0, J = Ce && !q && !Te && !(T || D || E || w || A) && !!G, Y = J && !!_ && Me === G, Oe = /* @__PURE__ */ I(P, { children: [
			xe && K && /* @__PURE__ */ F(We, {
				quote: K,
				onJump: C,
				className: "mb-1"
			}),
			Se && /* @__PURE__ */ F("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: "📌 Pinned"
			}),
			q ? /* @__PURE__ */ F("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Y ? /* @__PURE__ */ F(Ve, {
				initialText: m.content,
				onSave: async (e) => {
					await _(m, e), Fe(null);
				},
				onCancel: () => Fe(null)
			}) : N,
			!q && M.length > 0 && /* @__PURE__ */ F("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: M.map((e) => /* @__PURE__ */ F(fe, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: he
				}, e.id))
			}),
			!q && j && /* @__PURE__ */ I("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					j.labels.length > 0 ? `Too large to send: ${j.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!q && ve.length > 0 && u && f && /* @__PURE__ */ F(Re, {
				reactions: ve,
				currentUserId: u,
				onToggle: (e) => f(G, e)
			})
		] });
		return A ? /* @__PURE__ */ I(k, { children: [l, /* @__PURE__ */ F(we, {
			membership: A,
			fallbackText: m.content,
			timestamp: m.timestamp,
			"data-testid": "membership-notice"
		})] }, m.id ?? r) : /* @__PURE__ */ I(k, { children: [
			l,
			/* @__PURE__ */ I("div", {
				"data-testid": "chat-message",
				"data-message-id": G || void 0,
				"data-continues": c ? "true" : void 0,
				title: c ? re(m.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", G && G === O && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ F(H, {
					author: g,
					content: Oe,
					timestamp: c ? "" : m.timestamp,
					editedAt: q ? void 0 : m.editedAt,
					avatarUrl: m.avatarUrl,
					hideAvatar: c,
					hideAuthor: c,
					tone: _e,
					mine: Ce && L
				}), G && !q && !Y && (f || J || !Te && (p || h)) && /* @__PURE__ */ F(Be, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: f ? (e) => f(G, e) : void 0,
					onReply: p && !Te ? () => p(o?.rootMessage ?? m) : void 0,
					onTogglePin: h && !Te ? () => h(m) : void 0,
					pinned: !!m.id && !!x?.has(m.id),
					onEdit: J && _ ? () => Fe(G) : void 0,
					onDelete: J && ee ? () => Le(G) : void 0
				})]
			}),
			!!Dt && G === Dt.id && At()
		] }, m.id ?? r);
	}
	function en(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function tn(e) {
		if (!p || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !at(t.metadata)) return t;
	}
	function nn(t, n, r) {
		let i = ot(r?.root), a = r && r.replies.length === 0 && !tn(r.root) ? r.root : void 0, o = $t(t.root, n, i, a), s = ot(t.root) ?? "", c = n > 0 && !B(s, i) ? /* @__PURE__ */ F("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", X ? "border-white/10" : "border-border-subtle")
		}) : null, l = tn(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ I(k, { children: [c, o] }, `post:${ct(t.root) ?? n}`) : o;
		let u = ct(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > ut, m = !f || Ct.has(u), h = m ? t.replies : t.replies.slice(0, dt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(en))].slice(0, 3);
		return /* @__PURE__ */ I(k, { children: [c, /* @__PURE__ */ I("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ I("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", X ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => $t(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ I("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => Tt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ F("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ F(S, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ F("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ F("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${en(t.root)}`,
						onClick: () => p?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let rn = /* @__PURE__ */ I("div", {
		"data-testid": "chat-panel",
		className: e(Ue ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", X ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			He && /* @__PURE__ */ I("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", X ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ F("span", {
				style: v,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: zt
			}),
			/* @__PURE__ */ I("div", {
				className: e("relative flex flex-col mb-2", Ue ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ F("div", {
					ref: tt,
					onScroll: Gt,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Nt && "fade-top", Ue ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ I("div", {
						className: "mt-auto pb-4",
						children: [
							ft && n.length > 0 && /* @__PURE__ */ F("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ F("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Kt,
									disabled: xe,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: xe ? "Loading…" : "Load earlier messages"
								})
							}),
							Q.length === 0 ? c ?? /* @__PURE__ */ F("div", {
								className: e("text-sm", X ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : $ ? $.map((e, t) => nn(e, t, $[t - 1])) : Q.map((e, t) => $t(e, t, ot(Q[t - 1]), Q[t - 1])),
							ee && /* @__PURE__ */ F(m, {
								open: Ie !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Le(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Ie);
									Le(null), e && ee(e);
								}
							}),
							Ce.map((e) => /* @__PURE__ */ F(H, {
								author: e.actor,
								timestamp: "",
								tone: _e,
								content: /* @__PURE__ */ F(Je, {
									transfer: e,
									mine: qe(e, u, Te),
									onCancel: q
								})
							}, e.transferId))
						]
					})
				}), jt > 0 && /* @__PURE__ */ I("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Wt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						jt,
						" new message",
						jt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ F(g, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", X ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ F("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Zt : void 0,
				children: l
			}) : /* @__PURE__ */ I("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Se && /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !St,
						onClick: () => pt.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", X ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ F(bt, {})
					}), /* @__PURE__ */ F(w, {
						ref: pt,
						multiple: !0,
						accept: J,
						onFiles: (e) => {
							let t = Y ? e.filter((e) => e.size > Y) : [];
							t.length > 0 && Oe?.(`Skipped ${t.length} file(s) over the size limit.`), Jt(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ F("button", {
						ref: mt,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": yt,
						title: "Insert emoji",
						disabled: a,
						onClick: () => xt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", X ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ F("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ F(T, {
						open: yt,
						onSelect: Xt,
						onClose: () => xt(!1),
						triggerRef: mt,
						emojis: je
					}),
					/* @__PURE__ */ F(b, {
						size: "sm",
						value: Ge,
						onChange: (e) => Ye(e.target.value),
						onKeyDown: Qt,
						onPaste: Yt,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", X && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ F(t, {
						variant: "primary",
						size: "sm",
						onClick: qt,
						disabled: a || !Ge.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Se ? /* @__PURE__ */ F(E, {
		onFiles: Jt,
		accept: J,
		maxSize: Y,
		onError: Oe,
		disabled: a,
		className: Ue ? "flex h-full min-h-0 flex-col" : void 0,
		children: rn
	}) : rn;
}
function bt() {
	return /* @__PURE__ */ F("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ F("path", {
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
function xt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function St({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ I("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ I("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ F("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ F("div", { children: e.map((e) => {
			let n = R(xt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = z(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ I("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ F("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ F("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ F("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ F("span", {
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
	let c = /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F("span", {
		className: "shrink-0",
		children: e
	}), /* @__PURE__ */ I("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ F("span", {
			className: "truncate text-[13px] font-medium text-text-primary",
			children: t
		}), /* @__PURE__ */ F("span", {
			className: "truncate text-[11px] text-text-tertiary",
			children: n
		})]
	})] });
	return /* @__PURE__ */ I("li", {
		"data-testid": o,
		"data-unread": s ? "true" : void 0,
		className: "flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover",
		children: [i ? /* @__PURE__ */ F("button", {
			type: "button",
			onClick: i,
			"aria-label": a,
			"data-testid": o ? `${o}-jump` : void 0,
			className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
			children: c
		}) : /* @__PURE__ */ F("span", {
			className: "flex min-w-0 flex-1 items-center gap-3",
			children: c
		}), r && /* @__PURE__ */ F("span", {
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
function Ct({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ F("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ F("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function wt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ F(Ct, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ F(h, {
			icon: /* @__PURE__ */ F(d, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ F(Q, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ F(S, {
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
			actions: n && /* @__PURE__ */ F("button", {
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
function Tt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ F(Ct, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ F(h, {
			icon: /* @__PURE__ */ F(f, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Ge(e.attachment);
			return /* @__PURE__ */ F(Q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ F("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ F("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ F(a, {})
				}),
				title: e.attachment.name,
				meta: [
					e.author,
					O(e.attachment.size),
					$(e.sentAt)
				].filter(Boolean).join(" · "),
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Et({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ F(Ct, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ F(h, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ F(Q, {
			"data-testid": "mention",
			"data-unread": e.unread,
			leading: /* @__PURE__ */ I("span", {
				className: "relative",
				children: [/* @__PURE__ */ F(S, {
					name: e.author,
					size: 28
				}), e.unread && /* @__PURE__ */ F("span", {
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
function Dt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Ot(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function kt({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ F(Ct, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ F(h, {
			icon: /* @__PURE__ */ F(r, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ F(Q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ F("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ F("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ F(r, {})
				}),
				title: [$(e.startedAt), Dt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Ot(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function At({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": o = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ I("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ F("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ I("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ F(h, {
			icon: /* @__PURE__ */ F(a, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ F("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ F(Q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ F("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ F(a, {})
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
var jt = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Mt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function Nt({ name: t, description: a, online: o, avatarUrl: s, features: c = jt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: v, pins: y = [], onUnpin: b, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: k, watchHint: A, watchViewerCount: j, callInProgress: M = !1, headerActions: L, view: R, onViewChange: z, className: te, "data-testid": B = "conversation-surface" }) {
	let V = new Set(c), [ne, re] = N("chat"), ie = R ?? ne, H = V.has(ie) ? ie : c[0] ?? "chat", U = (e) => {
		R === void 0 && re(e), z?.(e);
	}, W = (e) => e || void 0, ae = c.filter((e) => Mt[e]).map((e) => ({
		id: e,
		label: Mt[e],
		badge: e === "files" ? W(p.length) : e === "documents" ? W(h.length) : e === "pins" ? W(y.length) : e === "members" ? f == null ? void 0 : W(f) : e === "calls" ? W(C.length) : e === "mentions" ? W(x.filter((e) => e.unread).length) : void 0
	})), oe = (e) => {
		U("chat"), T?.(e);
	};
	return /* @__PURE__ */ I("section", {
		className: e("flex min-w-0 flex-col", te),
		"data-testid": B,
		children: [
			/* @__PURE__ */ F(ee, {
				name: t,
				description: a,
				online: o,
				avatarUrl: s,
				"data-testid": `${B}-header`,
				tabs: ae.length > 1 ? /* @__PURE__ */ F(_, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: H,
					onValueChange: (e) => U(e),
					items: ae
				}) : void 0,
				actions: E || O || L ? /* @__PURE__ */ I(P, { children: [
					E && (D ? /* @__PURE__ */ F(n, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${B}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ F(i, { size: 16 })
					}) : /* @__PURE__ */ I(P, { children: [/* @__PURE__ */ F(n, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${B}-audio-call`,
						onClick: () => E(!0),
						children: /* @__PURE__ */ F(i, { size: 16 })
					}), /* @__PURE__ */ F(n, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${B}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ F(r, { size: 16 })
					})] })),
					O && /* @__PURE__ */ F(Pt, {
						testId: `${B}-watch`,
						label: k,
						hint: A,
						viewerCount: j,
						onClick: O
					}),
					L
				] }) : void 0
			}),
			V.has("files") && H === "files" && /* @__PURE__ */ F(Tt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? oe : void 0
			}),
			V.has("documents") && H === "documents" && /* @__PURE__ */ F(At, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: v
			}),
			V.has("pins") && H === "pins" && /* @__PURE__ */ F(wt, {
				className: "min-h-0 flex-1",
				pins: y,
				onUnpin: b,
				onJump: T ? oe : void 0
			}),
			V.has("members") && H === "members" && /* @__PURE__ */ F("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-members`,
				children: d
			}),
			V.has("mentions") && H === "mentions" && /* @__PURE__ */ F(Et, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					U("chat"), S(e, t);
				} : void 0
			}),
			V.has("calls") && H === "calls" && /* @__PURE__ */ F(kt, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			V.has("chat") && /* @__PURE__ */ I("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-chat`,
				hidden: H !== "chat",
				children: [u && /* @__PURE__ */ F("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${B}-canvas`,
					children: u
				}), /* @__PURE__ */ F("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function Pt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ I(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Ft,
		"aria-label": c ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ F(s, { size: 14 }),
			/* @__PURE__ */ F("span", { children: o }),
			c && /* @__PURE__ */ F("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Ft = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { z as $, Pe as A, me as B, Ve as C, Ie as D, Le as E, Ce as F, H as G, fe as H, Se as I, V as J, ie as K, be as L, je as M, Oe as N, Me as O, we as P, R as Q, K as R, He as S, Re as T, ue as U, pe as V, le as W, re as X, ne as Y, B as Z, Xe as _, Et as a, Ge as b, Dt as c, rt as d, $e as f, nt as g, it as h, Tt as i, Fe as j, Ne as k, St as l, at as m, Nt as n, kt as o, et as p, te as q, At as r, wt as s, jt as t, yt as u, Ke as v, Be as w, We as x, Je as y, ge as z };
