import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, b as i, f as a, k as o, m as s, n as c, p as l, t as u, x as d, y as f } from "./DropdownMenu-BvQCmhcx.js";
import { f as p, t as m } from "./Chip-BENLwTlq.js";
import { t as h } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as g } from "./EmptyState-JzzL2z1E.js";
import { n as _, o as v, s as ee, t as y } from "./ChannelHeader-BOsRE9TC.js";
import { n as b } from "./DockedPanelContext-pH9A5z1h.js";
import { t as x } from "./Input-DLknWXri.js";
import { t as S } from "./Textarea-Dz4doxTv.js";
import { t as C } from "./Avatar-BzicCOft.js";
import { t as w } from "./StatusPill-Db42eiME.js";
import { i as T, n as E, r as D, t as O } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as k } from "./formatBytes-05ivRSJY.js";
import { Fragment as A, useEffect as j, useMemo as M, useRef as N, useState as P } from "react";
import { Fragment as F, jsx as I, jsxs as L } from "react/jsx-runtime";
//#region src/utils/identity.ts
var R = [
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
function z(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return R[Math.abs(t) % R.length];
}
function te(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function B(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function V(e, t) {
	let n = B(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = B(t);
	return r ? n !== r : !1;
}
function ne(e, t = /* @__PURE__ */ new Date()) {
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
function re(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function H(e) {
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
function U(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function W({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = U(r), m = !o || !!p;
	return /* @__PURE__ */ L("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ I("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ I(C, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ L("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ L("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ I("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ I("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: H(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ I("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${H(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ I("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ I("div", {
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
var G = /* @__PURE__ */ new Set([
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
]), ie = /^(https?:|mailto:)/i;
function ae(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || ie.test(t) ? t : null;
}
function oe(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => oe(e, `${t}-${n}`));
	if (!G.has(n.tagName)) return /* @__PURE__ */ I("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ I("br", {}, t);
		case "A": {
			let e = ae(n.getAttribute("href"));
			return e ? /* @__PURE__ */ I("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ I("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ I("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ I(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ I("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ I("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ I("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function le({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = M(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => oe(e, `n${t}`));
	}, [t]), o = M(() => ce(n ?? ""), [n]);
	return /* @__PURE__ */ I("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function ue({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": l = "document-activity-card" }) {
	let u = a.length > 0;
	return /* @__PURE__ */ L("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ L("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ I("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ I("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${de(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ I("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ I(c, {
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
			o && /* @__PURE__ */ I("button", {
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
	return /* @__PURE__ */ L("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ I("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ I("span", {
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
	return /* @__PURE__ */ L("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ L("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ I("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ I("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && s === !1 && /* @__PURE__ */ I("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: he(l, u)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ I("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ I(c, {
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
			i && d && /* @__PURE__ */ I("button", {
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
function ve(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function ye(e) {
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
function be({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ L("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ I("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ I(C, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ L("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ I("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ I("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ I("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function xe({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: l, thumbnailUrl: f, stage: p = "ready", transcriptReady: m = !1, summaryReady: h = !1, expiresAt: g, pinned: _ = !1, onOpen: v, onCopyLink: ee, onShare: y, onTogglePin: b, onDownload: x, onOpenTranscript: S, onManageExpiry: C, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let O = o ?? a.length, k = p === "gone", A = p !== "saving" && p !== "failed" && !k && !!v, j = () => {
		v?.(n);
	}, M = l != null && l > 0 ? pe(l) : "", N = ve(s), P = K(a, O), { state: F, label: R } = _e[p], z = [
		...v && A ? [{
			"data-testid": `${D}-menu-open`,
			label: "Open",
			onSelect: j
		}] : [],
		...S && m ? [{
			"data-testid": `${D}-menu-transcript`,
			label: "Transcript",
			onSelect: () => S(n)
		}] : [],
		...ee && !k ? [{
			"data-testid": `${D}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => ee(n)
		}] : [],
		...y && !k ? [{
			"data-testid": `${D}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => y(n)
		}] : [],
		...b && !k ? [{
			"data-testid": `${D}-menu-pin`,
			label: _ ? "Unpin" : "Pin",
			onSelect: () => b(n)
		}] : [],
		...x && A ? [{
			"data-testid": `${D}-menu-download`,
			label: "Download",
			onSelect: () => x(n)
		}] : []
	], te = z.length ? [{
		items: z,
		"data-testid": `${D}-menu-items`
	}] : [];
	return /* @__PURE__ */ L("div", {
		"data-testid": D,
		"data-recording-id": n,
		"data-stage": p,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", E),
		children: [/* @__PURE__ */ L("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ L("button", {
				type: "button",
				onClick: A ? j : void 0,
				disabled: !A,
				"aria-label": A ? `Play ${r.toLowerCase()}` : `${r}: ${R.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", A ? "cursor-pointer" : "cursor-default"),
				children: [
					f ? /* @__PURE__ */ I("img", {
						src: f,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ I(be, {
						participants: a,
						total: O,
						testId: D
					}),
					A && /* @__PURE__ */ I("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ I("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ I("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ I("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					M && /* @__PURE__ */ I("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${D}-duration`,
						children: M
					})
				]
			}), /* @__PURE__ */ L("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ L("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ L("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ I("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${D}-title`,
								children: r
							}), _ && /* @__PURE__ */ I("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ I(d, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ L("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", i]
						}),
						O > 0 && /* @__PURE__ */ L("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ I(c, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ I("span", {
								className: "truncate text-xs text-text-tertiary",
								children: P
							})]
						}),
						/* @__PURE__ */ L("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ I(w, {
									state: F,
									label: R,
									size: "sm",
									"data-testid": `${D}-stage`
								}),
								p === "ready" && m && /* @__PURE__ */ I(w, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${D}-transcript`
								}),
								p === "ready" && h && /* @__PURE__ */ I(w, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${D}-summary`
								}),
								N && /* @__PURE__ */ I("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${D}-when`,
									children: N
								})
							]
						})
					]
				}), te.length > 0 && /* @__PURE__ */ I(u, {
					trigger: /* @__PURE__ */ I("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: te,
					"data-testid": `${D}-menu`
				})]
			})]
		}), g && p !== "failed" && !k && /* @__PURE__ */ L("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ L("span", { children: ["Set to expire ", ye(g)] }), C && /* @__PURE__ */ I(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => C(n),
				"data-testid": `${D}-manage-expiry`,
				children: "View or change"
			})]
		})]
	});
}
//#endregion
//#region src/components/social/MembershipNotice.tsx
function Se(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function Ce(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function we(e, t) {
	let n = e.names && e.names.length > 0 ? Se(e.names) : e.userIds.length > 0 ? Se(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = Ce(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Te({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = we(t, n);
	return /* @__PURE__ */ L("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ I("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ I("time", {
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
var Ee = [
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
], De = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Oe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, ke = 6;
function Ae(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function q(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function je(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Ae(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Ae(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Ae(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${q(e.index)}`;
		case "deleteBlock": return `Removed block ${q(e.index)}`;
		case "appendMacro": return t ? `Added a ${Ae(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${q(e.index)}`;
		case "setDocumentType": return `Type: ${Ae(t, 40)}`;
		case "skip": return t ? Ae(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Ae(t)}` : e.op;
	}
}
function Me(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Ne(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function J(e) {
	if (!e?.startedAt) return null;
	let t = Me(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? Ne(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Y = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Pe({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: p, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: ee, "data-testid": y = "agent-run-card" }) {
	let b = c?.phase ?? "received", [x, S] = P(v), C = b === "completed" ? c?.suggestion ?? h : void 0, w = b === "completed" ? c?.review : void 0, T = !!C && !w, E = b === "completed" && c?.noop === !0, D = b === "completed" ? c?.result ?? d : void 0, O = D?.kind === "link" && D.label ? D.label : "Open", k = l && !(D?.kind === "document" && f), A = De[b], j = b === "failed" || b === "rejected", M = j ? "danger" : w ? w.decision === "accept" ? "success" : "neutral" : E ? "warning" : b === "completed" ? C ? "warning" : "success" : b === "awaiting_approval" ? "warning" : "info", N = w ? "Reviewed" : T ? "Suggested" : E ? "No change" : Oe[b], F = w ? w.byName ?? w.by : void 0, R = w ? `${w.decision === "accept" ? "Accepted" : "Rejected"} by ${F}` : void 0, z = b === "awaiting_approval", te = b === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : z ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : R ?? c?.detail ?? (T && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : b === "received" ? "Received" : N), B = c?.details, V = B?.ops ?? [], ne = B?.steps ?? [], re = B?.document?.title || _ || "Document", H = !!B?.document || !!l, U = B?.error ?? (b === "failed" ? c?.detail : void 0), W = J(B), G = `${y}-details-${r}`;
	return /* @__PURE__ */ L("div", {
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
			/* @__PURE__ */ L("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ I("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ L("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${y}-instruction`,
						children: [
							/* @__PURE__ */ I("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ I(m, {
						size: "xs",
						tone: M,
						"data-testid": `${y}-phase`,
						children: N
					}),
					/* @__PURE__ */ I(n, {
						size: "sm",
						"aria-label": x ? "Hide details" : "Show details",
						"aria-expanded": x,
						"aria-controls": x ? G : void 0,
						onClick: () => S((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${y}-toggle`,
						icon: /* @__PURE__ */ I("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", x && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ L("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ I("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${y}-steps`,
						children: Ee.map((t, n) => {
							let r = j ? n < A : n < A || n === A && b === "completed", i = n === A && b !== "completed" && !j, a = j && n === A;
							return /* @__PURE__ */ L("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ I("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? E && n === A ? "bg-warning" : "bg-success" : i ? z ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ I("span", {
									className: "sr-only",
									children: a ? N : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ I("span", {
						className: e("min-w-0 flex-1 truncate", w && (w.decision === "accept" ? "text-success" : "text-text-tertiary"), b === "failed" && "text-danger", E && "text-warning-fg"),
						"data-testid": `${y}-detail`,
						"data-review": w?.decision,
						title: c?.detail,
						children: te
					}),
					T && C && g && /* @__PURE__ */ L("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-review`,
						children: [/* @__PURE__ */ I(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: C.key,
								...C.documentId ? { documentId: C.documentId } : {}
							}),
							"data-testid": `${y}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ I(t, {
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
					z && p && /* @__PURE__ */ L("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${y}-decide`,
						children: [/* @__PURE__ */ I(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => p(r, "approve"),
							"data-testid": `${y}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ I(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => p(r, "reject"),
							"data-testid": `${y}-reject`,
							children: "Reject"
						})]
					}),
					D && f && /* @__PURE__ */ I("button", {
						type: "button",
						onClick: () => f(D),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": D.kind,
						children: O
					}),
					D?.kind === "link" && !f && /* @__PURE__ */ I("a", {
						href: D.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${y}-open-result`,
						"data-result-kind": "link",
						children: O
					}),
					u && /* @__PURE__ */ I("button", {
						type: "button",
						onClick: () => u(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-run`,
						children: "run"
					}),
					k && /* @__PURE__ */ I("button", {
						type: "button",
						onClick: l,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${y}-open-document`,
						children: "document"
					})
				]
			}),
			x && /* @__PURE__ */ L("div", {
				id: G,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${y}-details`,
				children: [
					H && /* @__PURE__ */ L("div", {
						className: "flex items-start gap-2",
						"data-testid": `${y}-details-document`,
						children: [
							/* @__PURE__ */ I("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ L("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ I("span", {
									className: "block truncate font-medium text-text-primary",
									children: re
								}), B?.document?.snippet && /* @__PURE__ */ I("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${y}-details-snippet`,
									children: B.document.snippet
								})]
							}),
							l && /* @__PURE__ */ I(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${y}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					V.length > 0 && /* @__PURE__ */ L("div", {
						"data-testid": `${y}-details-ops`,
						children: [
							/* @__PURE__ */ I("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ I("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: V.slice(0, ke).map((e, t) => /* @__PURE__ */ I("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: je(e)
								}, t))
							}),
							V.length > ke && /* @__PURE__ */ L("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${y}-details-more-ops`,
								children: [
									"+",
									V.length - ke,
									" more"
								]
							})
						]
					}),
					ne.length > 0 && /* @__PURE__ */ I("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${y}-details-steps`,
						children: ne.map((t) => /* @__PURE__ */ L("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ I("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Y[t.status] ?? Y.pending)
							}), /* @__PURE__ */ I("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					U && /* @__PURE__ */ I("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${y}-details-error`,
						children: U
					}),
					/* @__PURE__ */ L("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ I("button", {
								type: "button",
								onClick: () => u(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${y}-details-open-run`,
								children: "Open run"
							}),
							D && f && /* @__PURE__ */ I("button", {
								type: "button",
								onClick: () => f(D),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${y}-details-open-result`,
								children: O
							}),
							W && /* @__PURE__ */ I("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${y}-details-timings`,
								children: W
							})
						]
					})
				]
			})
		]
	});
}
function Fe(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = Ie(e.result);
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
function Ie(e) {
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
function Le(e, t) {
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
function Re(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ze({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = M(() => Le(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ I("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ L("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Re(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ I("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var Be = [
	"👍",
	"🎉",
	"❤️"
], Ve = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function He({ quickReactions: t = Be, onReact: n, onOpenReactionPicker: r, onReply: i, onForward: a, onTogglePin: s, pinned: c = !1, onCopyLink: u, onEdit: f, onDelete: p, className: m, "data-testid": h = "message-actions" }) {
	let g = (e, t, n, r) => /* @__PURE__ */ I("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${h}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${Ve}`,
		children: n
	}, r);
	return /* @__PURE__ */ L("div", {
		"data-testid": h,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", m),
		children: [
			n && t.map((e) => g(`React ${e}`, () => n(e), /* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && g("More reactions", r, /* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && g("Reply", i, /* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && g("Forward to another conversation", a, /* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: "↪"
			}), "forward"),
			s && g(c ? "Unpin" : "Pin to channel", s, /* @__PURE__ */ I(d, { size: 14 }), "pin"),
			u && g("Copy link to message", u, /* @__PURE__ */ I("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			f && g("Edit message", f, /* @__PURE__ */ I(l, { size: 13 }), "edit"),
			p && g("Delete message", p, /* @__PURE__ */ I(o, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function Ue({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = P(e), [s, c] = P(!1), [l, u] = P(null), d = N(null);
	j(() => {
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
	return /* @__PURE__ */ L("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ I(S, {
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
			/* @__PURE__ */ L("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ I("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ I(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ I(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ I("p", {
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
function X(e, t = 120) {
	let n = e.replace(/\s+/g, " ").trim();
	if (n.length <= t) return n;
	let r = n.slice(0, t), i = r.lastIndexOf(" ");
	return `${(i > t * .6 ? r.slice(0, i) : r).trimEnd()}…`;
}
function We(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
}
function Ge({ quote: t, onJump: n, onDismiss: r, className: i, "data-testid": a = "quote-block" }) {
	let o = /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ L("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ I("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ I("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: We(t.timestamp)
		})]
	}), /* @__PURE__ */ I("span", {
		className: "block truncate text-xs text-text-secondary",
		children: X(t.text)
	})] });
	return /* @__PURE__ */ L("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ I("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ I("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ I("button", {
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
function Ke(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function qe({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Ke(t), o = n ?? t.preview;
	return a ? /* @__PURE__ */ L("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ I("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ I("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ I("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ I("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ L("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ I("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ I("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: k(t.size)
			})]
		})]
	}) : /* @__PURE__ */ I("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ L("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ I(Xe, {}), /* @__PURE__ */ L("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ I("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ I("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: k(t.size)
				})]
			})]
		})
	});
}
function Je(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ye({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : k(o);
	return /* @__PURE__ */ L("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ I("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ I(Xe, {}),
			/* @__PURE__ */ L("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ L("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ I("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ I("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ I("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ I("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ I("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ I("button", {
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
function Xe() {
	return /* @__PURE__ */ I("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ I("path", {
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
function Ze({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = ne(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ L("div", {
		role: "separator",
		"aria-label": re(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ I("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ I("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ I("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function Qe(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function $e(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function et(e) {
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
function tt(e) {
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
var nt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function rt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => nt[e] ?? e)
	};
}
function it(e) {
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
function at(e) {
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
function ot(e) {
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
function st(e) {
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
function ct(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function lt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(ct(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function ut(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function dt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function ft(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = ut(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = ut(r), i = dt(r);
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
		let e = ut(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = ut(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var pt = 3, mt = 2, ht = 3e5;
function Z(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function gt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Fe(e.metadata) || ot(e.metadata) || at(e.metadata) || et(e.metadata) || st(e.metadata));
}
function _t(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Z(r);
	if (!i || i !== Z(n) || !gt(n) || !gt(r) || r.editedAt || V(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= ht;
}
function vt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function yt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ L("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ I("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ I("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function bt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function xt(e) {
	return e.displayName || e.userId;
}
function St(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Z(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Ct({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: f, onToggleReaction: p, onReply: m, onForwardMessage: g, onTogglePin: v, onEditMessage: y, onDeleteMessage: S, pinnedMessageIds: w, onJumpToMessage: k, highlightedMessageId: M, threaded: R = !1, alignOwnMessages: z = !0, documentEditors: te, callParticipants: B, agentRunStatus: ne, onOpenRun: re, onOpenResult: U, onDecideRun: G, onReviewRun: ie, onJoinCall: ae, onOpenRecording: oe, onCopyRecordingLink: se, onShareRecording: ce, onDownloadRecording: de, onOpenRecordingTranscript: pe, onManageRecordingExpiry: me, recordingStatus: he, onOpenDocument: _e, tone: ve = "light", showHeader: ye, fill: K, onLoadMore: be, hasMore: Se, loadingMore: Ce = !1, onSendFiles: we, transfers: Ee = [], currentActor: De, onCancelTransfer: Oe, attachmentSrc: ke, onOpenAttachment: Ae, acceptFiles: q, maxFileSize: je, onFileError: Me, readReceipts: Ne = [], readReceiptsEnabled: J = !0, unreadFrom: Y, emojis: Ie = O }) {
	let [Le, Re] = P(null), [Be, Ve] = P(null), X = ve === "dark", We = b(), Ke = ye ?? !(We?.hasHeader ?? !1), Xe = K ?? We?.fillsHeight ?? !1, [nt, dt] = P(""), ht = N(null), Z = N(null), gt = !!be && Se !== !1, Ct = N(null), Tt = N(null), [Et, Dt] = P(!1), Ot = !!we && !a, Q = lt(n, r), $ = R ? ft(Q) : null, [kt, At] = P(() => /* @__PURE__ */ new Set());
	function jt(e) {
		At((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let Mt = N(void 0);
	if (Y !== void 0) {
		let e = Mt.current;
		if (e === void 0) Mt.current = Y;
		else {
			let t = Date.parse(Y), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (Mt.current = Y);
		}
	}
	let Nt = Mt.current, Pt = Nt === void 0 ? -1 : vt($ ? $.map((e) => ct(e.root)) : Q.map((e) => ct(e)), Nt), Ft = J && u ? u : void 0, It = (() => {
		if (!(!Ft || Ne.length === 0)) for (let e = Q.length - 1; e >= 0; --e) {
			let t = Q[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Ft || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), Lt = It && Ft ? bt(Ne, Ft, It.timestamp) : [], Rt = Lt.length === 1 && !!Ft && St(n, Ne, Ft) === 1;
	function zt() {
		if (Lt.length === 0) return null;
		let t = Lt.map(xt), n = Lt.slice(0, 3);
		return /* @__PURE__ */ L("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", z ? "justify-end pr-1" : "justify-start pl-7", X ? "text-white/50" : "text-text-tertiary"),
			children: [
				Lt.length > 1 && /* @__PURE__ */ I("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ I(C, {
						name: xt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ I("span", {
					"data-testid": "chat-read-receipts-label",
					children: Rt ? "Seen" : `Seen by ${Lt.length}`
				}),
				/* @__PURE__ */ I("span", {
					style: ee,
					children: Rt ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Bt, Vt] = P(0), [Ht, Ut] = P(!1), Wt = N(!0), Gt = N(n.length), Kt = n.length + r.length + Ee.length, qt = N(null), [Jt, Yt] = P(""), Xt = N(null), Zt = N(!1), Qt = N(0);
	j(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!Zt.current) {
			Zt.current = !0, Xt.current = t;
			return;
		}
		if (t === Xt.current || (Xt.current = t, u && e.userId === u)) return;
		Qt.current += 1;
		let r = Qt.current % 2 == 0 ? "​" : "";
		Yt($e(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function $t() {
		let e = ht.current;
		e && (e.scrollTop = e.scrollHeight, Wt.current = !0, Vt(0));
	}
	function en() {
		let e = ht.current;
		if (!e) return;
		let t = Qe(e);
		Wt.current = t, t && Vt(0), Ut(e.scrollTop > 8);
	}
	j(() => {
		let e = ht.current, t = Gt.current, n = Kt - t;
		if (Gt.current = Kt, !e) return;
		let r = qt.current;
		if (r && n > 0) {
			qt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Wt.current ? (e.scrollTop = e.scrollHeight, Vt(0), Ut(e.scrollTop > 8)) : n > 0 && Vt((e) => e + n);
	}, [Kt]);
	function tn() {
		let e = ht.current;
		e && (qt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), be?.();
	}
	j(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function nn() {
		let e = nt.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), Wt.current = !0, i(e), dt(""));
	}
	function rn(e) {
		!Ot || e.length === 0 || (Wt.current = !0, we?.(e));
	}
	function an(e) {
		if (!Ot) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), rn(t));
	}
	function on(e) {
		dt((t) => t + e), Dt(!1);
	}
	function sn() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function cn(e) {
		sn(), e.key === "Enter" && !a && nt.trim() && nn();
	}
	function ln(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Pt ? /* @__PURE__ */ I(yt, { tone: ve }) : null, l = !c && _t(a, n), h = !o && V(s, i) ? /* @__PURE__ */ I(Ze, {
			timestamp: s,
			tone: ve
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Fe(r.metadata);
			return /* @__PURE__ */ L(A, { children: [
				h,
				c,
				/* @__PURE__ */ I("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ I(W, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: ve,
						mine: !0,
						content: /* @__PURE__ */ L(F, { children: [
							i ? /* @__PURE__ */ I(Pe, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: ne?.(i.runId),
								onOpenDocument: _e && i.documentId ? () => _e(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: re,
								result: i.result,
								onOpenResult: U,
								onDecide: G,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: ie
							}) : /* @__PURE__ */ I(le, { text: r.content }),
							/* @__PURE__ */ I("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", X ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ I("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ I(t, {
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
		let { message: _ } = n, ee = _.displayName ?? _.clientId.slice(0, 8), b = _.attachments ?? [], x = _.metadata?.html, C = typeof x == "string" ? x : void 0, T = /* @__PURE__ */ I(le, {
			html: C,
			text: _.content
		}), E = et(_.metadata), D = Fe(_.metadata), O = at(_.metadata), j = ot(_.metadata), N = st(_.metadata), P = rt(_.metadata), R = tt(_.metadata), ye = D ? /* @__PURE__ */ I(Pe, {
			runId: D.runId,
			instruction: D.instruction || _.content.replace(/^\/doc\s*/i, ""),
			command: D.command,
			agentName: D.agentName,
			requestedBy: _.displayName,
			status: ne?.(D.runId),
			onOpenDocument: _e && D.documentId ? () => _e(D.documentId) : void 0,
			documentTitle: D.documentTitle,
			onOpenRun: re,
			result: D.result,
			onOpenResult: U,
			onDecide: G,
			suggestion: D.suggestionKey ? {
				key: D.suggestionKey,
				...D.documentId ? { documentId: D.documentId } : {}
			} : void 0,
			onReview: ie
		}) : j ? (() => {
			let e = he?.(j.recordingId), t = {
				...j,
				...e ?? {}
			};
			return /* @__PURE__ */ I(xe, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? _.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!_.id && !!w?.has(_.id),
				onOpen: oe,
				onCopyLink: se,
				onShare: ce,
				onDownload: de,
				onOpenTranscript: pe,
				onManageExpiry: me,
				onTogglePin: v ? () => v(_) : void 0
			});
		})() : O ? /* @__PURE__ */ I(ge, {
			callId: O.callId,
			startedBy: (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			participants: B?.(O.callId) ?? O.participants,
			live: O.live,
			durationMs: O.durationMs,
			audioOnly: O.audioOnly,
			recorded: O.recorded,
			notRecordedReason: O.notRecordedReason,
			lobbyName: O.lobbyName,
			onJoin: ae
		}) : E ? /* @__PURE__ */ I(ue, {
			documentId: E.documentId,
			title: E.title || _.content,
			icon: E.icon,
			createdBy: E.createdBy ?? (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			editors: te?.(E.documentId) ?? [],
			onOpen: _e
		}) : b.length === 0 ? T : /* @__PURE__ */ L(F, { children: [(_.content || C) && T, b.map((e) => /* @__PURE__ */ I(qe, {
			attachment: e,
			src: ke?.(e),
			onOpen: Ae
		}, e.id))] }), K = _.id ?? "", be = K && f ? f(K) : [], Se = _.metadata?.replyTo, Ce = !!o && !!Se && Se.messageId === o.rootId, we = !!Se && !Ce, Ee = !!K && !!w?.has(K), De = !!u && _.userId === u, Oe = _.metadata?.system === !0, q = !!_.deletedAt || _.metadata?.deleted === !0, je = !!(D || j || O || E || N), Me = De && !q && !Oe && !je && !!K, Ne = !!K && !q && !Oe && !je && b.length === 0 && !!_.content.trim(), J = it(_.metadata), Y = Me && !!y && Le === K, Ie = /* @__PURE__ */ L(F, { children: [
			we && Se && /* @__PURE__ */ I(Ge, {
				quote: Se,
				onJump: k,
				className: "mb-1"
			}),
			J && /* @__PURE__ */ L("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [
					`Forwarded from ${J.channelLabel || J.channel || "another conversation"}`,
					J.author,
					J.timestamp ? H(J.timestamp) : ""
				].filter(Boolean).join(" · "),
				children: [/* @__PURE__ */ I("span", {
					"aria-hidden": !0,
					children: "↪"
				}), " Forwarded"]
			}),
			Ee && /* @__PURE__ */ L("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ I(d, { size: 11 }), " Pinned"]
			}),
			q ? /* @__PURE__ */ I("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Y ? /* @__PURE__ */ I(Ue, {
				initialText: _.content,
				onSave: async (e) => {
					await y(_, e), Re(null);
				},
				onCancel: () => Re(null)
			}) : ye,
			!q && R.length > 0 && /* @__PURE__ */ I("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: R.map((e) => /* @__PURE__ */ I(fe, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: _e
				}, e.id))
			}),
			!q && P && /* @__PURE__ */ L("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					P.labels.length > 0 ? `Too large to send: ${P.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!q && be.length > 0 && u && p && /* @__PURE__ */ I(ze, {
				reactions: be,
				currentUserId: u,
				onToggle: (e) => p(K, e)
			})
		] });
		return N ? /* @__PURE__ */ L(A, { children: [
			h,
			c,
			/* @__PURE__ */ I(Te, {
				membership: N,
				fallbackText: _.content,
				timestamp: _.timestamp,
				"data-testid": "membership-notice"
			})
		] }, _.id ?? r) : /* @__PURE__ */ L(A, { children: [
			h,
			c,
			/* @__PURE__ */ L("div", {
				"data-testid": "chat-message",
				"data-message-id": K || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? H(_.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", K && K === M && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ I(W, {
					author: ee,
					content: Ie,
					timestamp: l ? "" : _.timestamp,
					editedAt: q ? void 0 : _.editedAt,
					avatarUrl: _.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: ve,
					mine: De && z
				}), K && !q && !Y && (p || Me || Ne && g || !Oe && (m || v)) && /* @__PURE__ */ I(He, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: p ? (e) => p(K, e) : void 0,
					onReply: m && !Oe ? () => m(o?.rootMessage ?? _) : void 0,
					onForward: g && Ne ? () => g(_) : void 0,
					onTogglePin: v && !Oe ? () => v(_) : void 0,
					pinned: !!_.id && !!w?.has(_.id),
					onEdit: Me && y ? () => Re(K) : void 0,
					onDelete: Me && S ? () => Ve(K) : void 0
				})]
			}),
			!!It && K === It.id && zt()
		] }, _.id ?? r);
	}
	function un(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function dn(e) {
		if (!m || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !st(t.metadata)) return t;
	}
	function fn(t, n, r) {
		let i = ct(r?.root), a = r && r.replies.length === 0 && !dn(r.root) ? r.root : void 0, o = ln(t.root, n, i, a), s = ct(t.root) ?? "", c = n > 0 && n !== Pt && !V(s, i) ? /* @__PURE__ */ I("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", X ? "border-white/10" : "border-border-subtle")
		}) : null, l = dn(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ L(A, { children: [c, o] }, `post:${ut(t.root) ?? n}`) : o;
		let u = ut(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > pt, p = !f || kt.has(u), h = p ? t.replies : t.replies.slice(0, mt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(un))].slice(0, 3), v = t.replies.length === 0;
		return /* @__PURE__ */ L(A, { children: [c, /* @__PURE__ */ L("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ L("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", X ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => ln(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ L("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => jt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ I("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ I(C, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ I("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ I("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${un(t.root)}`,
						onClick: () => m?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", v && e("opacity-0 transition-opacity", "group-hover/post:opacity-100 group-has-[:focus-visible]/post:opacity-100", "[@media(hover:none)]:opacity-100"), X ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let pn = /* @__PURE__ */ L("div", {
		"data-testid": "chat-panel",
		className: e(Xe ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", X ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			Ke && /* @__PURE__ */ L("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", X ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ I("span", {
				style: ee,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Jt
			}),
			/* @__PURE__ */ L("div", {
				className: e("relative flex flex-col mb-2", Xe ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ I("div", {
					ref: ht,
					onScroll: en,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Ht && "fade-top", Xe ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ L("div", {
						className: "mt-auto pb-4",
						children: [
							gt && n.length > 0 && /* @__PURE__ */ I("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ I("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: tn,
									disabled: Ce,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Ce ? "Loading…" : "Load earlier messages"
								})
							}),
							Q.length === 0 ? c ?? /* @__PURE__ */ I("div", {
								className: e("text-sm", X ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : $ ? $.map((e, t) => fn(e, t, $[t - 1])) : Q.map((e, t) => ln(e, t, ct(Q[t - 1]), Q[t - 1])),
							S && /* @__PURE__ */ I(h, {
								open: Be !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Ve(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Be);
									Ve(null), e && S(e);
								}
							}),
							Ee.map((e) => /* @__PURE__ */ I(W, {
								author: e.actor,
								timestamp: "",
								tone: ve,
								content: /* @__PURE__ */ I(Ye, {
									transfer: e,
									mine: Je(e, u, De),
									onCancel: Oe
								})
							}, e.transferId))
						]
					})
				}), Bt > 0 && /* @__PURE__ */ L("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: $t,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Bt,
						" new message",
						Bt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ I(_, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", X ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ I("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? sn : void 0,
				children: l
			}) : /* @__PURE__ */ L("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					we && /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Ot,
						onClick: () => Ct.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", X ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ I(wt, {})
					}), /* @__PURE__ */ I(T, {
						ref: Ct,
						multiple: !0,
						accept: q,
						onFiles: (e) => {
							let t = je ? e.filter((e) => e.size > je) : [];
							t.length > 0 && Me?.(`Skipped ${t.length} file(s) over the size limit.`), rn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ I("button", {
						ref: Tt,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": Et,
						title: "Insert emoji",
						disabled: a,
						onClick: () => Dt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", X ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ I("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ I(E, {
						open: Et,
						onSelect: on,
						onClose: () => Dt(!1),
						triggerRef: Tt,
						emojis: Ie
					}),
					/* @__PURE__ */ I(x, {
						size: "sm",
						value: nt,
						onChange: (e) => dt(e.target.value),
						onKeyDown: cn,
						onPaste: an,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", X && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ I(t, {
						variant: "primary",
						size: "sm",
						onClick: nn,
						disabled: a || !nt.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return we ? /* @__PURE__ */ I(D, {
		onFiles: rn,
		accept: q,
		maxSize: je,
		onError: Me,
		disabled: a,
		className: Xe ? "flex h-full min-h-0 flex-col" : void 0,
		children: pn
	}) : pn;
}
function wt() {
	return /* @__PURE__ */ I("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ I("path", {
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
function Tt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Et({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ L("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ L("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ I("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ I("div", { children: e.map((e) => {
			let n = z(Tt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = te(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ L("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ I("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ I("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ I("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ I("span", {
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
var Dt = "min-w-0 truncate", Ot = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function Q({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": m, ...h }) {
	let g = r ? i ? /* @__PURE__ */ I("time", {
		dateTime: i,
		title: a,
		className: Ot,
		children: r
	}) : /* @__PURE__ */ I("span", {
		title: a,
		className: Ot,
		children: r
	}) : null, _ = /* @__PURE__ */ L("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ L("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ I("span", {
				"data-line": "primary",
				title: n,
				className: e(Dt, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), g]
		}), /* @__PURE__ */ I("span", {
			"data-line": "secondary",
			title: o,
			className: e(Dt, "text-[11px] leading-snug", s ? p[s] : "text-text-tertiary"),
			children: o
		})]
	});
	return /* @__PURE__ */ L("li", {
		...h,
		"data-testid": m,
		"data-unread": d ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", f),
		children: [
			/* @__PURE__ */ L("span", {
				className: "relative shrink-0",
				children: [t, d && /* @__PURE__ */ I("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			l ? /* @__PURE__ */ I("button", {
				type: "button",
				onClick: l,
				"aria-label": u,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ I("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			c && /* @__PURE__ */ I("span", {
				className: "flex shrink-0 items-center gap-1",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
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
function kt({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ I("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ I("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function At({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ I(kt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ I(g, {
			icon: /* @__PURE__ */ I(d, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ I(Q, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ I(C, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
			timestamp: $(e.pinnedAt),
			timestampIso: e.pinnedAt,
			timestampTitle: e.pinnedAt ? H(e.pinnedAt) : void 0,
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ I("button", {
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
function jt({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ I(kt, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ I(g, {
			icon: /* @__PURE__ */ I(f, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Ke(e.attachment);
			return /* @__PURE__ */ I(Q, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ I("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ I("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ I(a, {})
				}),
				title: e.attachment.name,
				meta: [e.author, k(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: $(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? H(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function Mt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ I(kt, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ I(g, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ I(Q, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ I(C, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: $(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? H(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Nt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Pt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Ft({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ I(kt, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ I(g, {
			icon: /* @__PURE__ */ I(r, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ I(Q, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ I("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ I("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ I(r, {})
				}),
				title: [$(e.startedAt), Nt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Pt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function It({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": o = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ L("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ I("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ L("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ I(g, {
			icon: /* @__PURE__ */ I(a, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ I("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ I(Q, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ I("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ I(a, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: $(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? H(e.updatedAt) : void 0,
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var Lt = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Rt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function zt({ name: t, description: a, online: o, avatarUrl: s, features: c = Lt, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: ee = [], onUnpin: b, mentions: x = [], onOpenMention: S, recordings: C = [], onOpenRecording: w, onJumpToMessage: T, onStartCall: E, callModeFixed: D = !1, onWatch: O, watchLabel: k, watchHint: A, watchViewerCount: j, callInProgress: M = !1, headerActions: N, view: R, onViewChange: z, className: te, "data-testid": B = "conversation-surface" }) {
	let V = new Set(c), [ne, re] = P("chat"), H = R ?? ne, U = V.has(H) ? H : c[0] ?? "chat", W = (e) => {
		R === void 0 && re(e), z?.(e);
	}, G = (e) => e || void 0, ie = c.filter((e) => Rt[e]).map((e) => ({
		id: e,
		label: Rt[e],
		badge: e === "files" ? G(p.length) : e === "documents" ? G(h.length) : e === "pins" ? G(ee.length) : e === "members" ? f == null ? void 0 : G(f) : e === "calls" ? G(C.length) : e === "mentions" ? G(x.filter((e) => e.unread).length) : void 0
	})), ae = (e) => {
		W("chat"), T?.(e);
	};
	return /* @__PURE__ */ L("section", {
		className: e("flex min-w-0 flex-col", te),
		"data-testid": B,
		children: [
			/* @__PURE__ */ I(y, {
				name: t,
				description: a,
				online: o,
				avatarUrl: s,
				"data-testid": `${B}-header`,
				tabs: ie.length > 1 ? /* @__PURE__ */ I(v, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: U,
					onValueChange: (e) => W(e),
					items: ie
				}) : void 0,
				actions: E || O || N ? /* @__PURE__ */ L(F, { children: [
					E && (D ? /* @__PURE__ */ I(n, {
						"aria-label": M ? "Join the call" : "Start a call",
						title: M ? "Join the call" : "Start a call",
						"data-testid": `${B}-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ I(i, { size: 16 })
					}) : /* @__PURE__ */ L(F, { children: [/* @__PURE__ */ I(n, {
						"aria-label": M ? "Join the call with audio" : "Start an audio call",
						title: M ? "Join with audio" : "Audio call",
						"data-testid": `${B}-audio-call`,
						onClick: () => E(!0),
						children: /* @__PURE__ */ I(i, { size: 16 })
					}), /* @__PURE__ */ I(n, {
						"aria-label": M ? "Join the call with video" : "Start a video call",
						title: M ? "Join with video" : "Video call",
						"data-testid": `${B}-video-call`,
						variant: M ? "primary" : "ghost",
						onClick: () => E(!1),
						children: /* @__PURE__ */ I(r, { size: 16 })
					})] })),
					O && /* @__PURE__ */ I(Bt, {
						testId: `${B}-watch`,
						label: k,
						hint: A,
						viewerCount: j,
						onClick: O
					}),
					N
				] }) : void 0
			}),
			V.has("files") && U === "files" && /* @__PURE__ */ I(jt, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: T ? ae : void 0
			}),
			V.has("documents") && U === "documents" && /* @__PURE__ */ I(It, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			V.has("pins") && U === "pins" && /* @__PURE__ */ I(At, {
				className: "min-h-0 flex-1",
				pins: ee,
				onUnpin: b,
				onJump: T ? ae : void 0
			}),
			V.has("members") && U === "members" && /* @__PURE__ */ I("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-members`,
				children: d
			}),
			V.has("mentions") && U === "mentions" && /* @__PURE__ */ I(Mt, {
				className: "min-h-0 flex-1",
				mentions: x,
				onJump: S ? (e, t) => {
					W("chat"), S(e, t);
				} : void 0
			}),
			V.has("calls") && U === "calls" && /* @__PURE__ */ I(Ft, {
				className: "min-h-0 flex-1",
				recordings: C,
				onOpen: w
			}),
			V.has("chat") && /* @__PURE__ */ L("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${B}-chat`,
				hidden: U !== "chat",
				children: [u && /* @__PURE__ */ I("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${B}-canvas`,
					children: u
				}), /* @__PURE__ */ I("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function Bt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ L(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Vt,
		"aria-label": c ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ I(s, { size: 14 }),
			/* @__PURE__ */ I("span", { children: o }),
			c && /* @__PURE__ */ I("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Vt = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { V as $, Y as A, K as B, Ge as C, ze as D, He as E, je as F, ue as G, me as H, Te as I, U as J, le as K, we as L, Fe as M, Ie as N, Re as O, J as P, H as Q, Ce as R, Ke as S, Ue as T, pe as U, ge as V, fe as W, ne as X, B as Y, re as Z, ot as _, Mt as a, qe as b, Nt as c, Ct as d, z as et, at as f, st as g, it as h, jt as i, Pe as j, Le as k, Q as l, tt as m, zt as n, Ft as o, et as p, W as q, It as r, At as s, Lt as t, te as tt, Et as u, rt as v, X as w, Ye as x, Ze as y, xe as z };
