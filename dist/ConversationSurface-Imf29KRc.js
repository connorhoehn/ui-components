import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./IconButton-C3DMtvSx.js";
import { A as r, b as i, f as a, k as o, m as s, n as c, p as l, t as u, x as d, y as f } from "./DropdownMenu-BvQCmhcx.js";
import { f as p, t as m } from "./Chip-BENLwTlq.js";
import { t as h } from "./ConfirmDialog-Cd8NZEXi.js";
import { t as g } from "./EmptyState-JzzL2z1E.js";
import { n as _, o as v, s as y, t as b } from "./ChannelHeader-BOsRE9TC.js";
import { n as x } from "./DockedPanelContext-pH9A5z1h.js";
import { t as S } from "./Input-DLknWXri.js";
import { t as C } from "./Textarea-Dz4doxTv.js";
import { t as w } from "./Avatar-BzicCOft.js";
import { t as T } from "./StatusPill-Db42eiME.js";
import { i as E, n as D, r as O, t as k } from "./ReactionPickerPopover-CcL-n6gt.js";
import { t as A } from "./formatBytes-05ivRSJY.js";
import { Fragment as j, useEffect as M, useMemo as N, useRef as P, useState as F } from "react";
import { Fragment as I, jsx as L, jsxs as R } from "react/jsx-runtime";
//#region src/utils/identity.ts
var z = [
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
function B(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return z[Math.abs(t) % z.length];
}
function ee(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function V(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function H(e, t) {
	let n = V(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = V(t);
	return r ? n !== r : !1;
}
function te(e, t = /* @__PURE__ */ new Date()) {
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
function U(e) {
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
function W(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function G({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, tone: l = "light", editedAt: u, className: d }) {
	let f = l === "dark", p = W(r), m = !o || !!p;
	return /* @__PURE__ */ R("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", d),
		children: [/* @__PURE__ */ L("div", {
			className: "w-5 shrink-0 mt-0.5",
			children: !a && /* @__PURE__ */ L(w, {
				name: t,
				src: i,
				size: 20
			})
		}), /* @__PURE__ */ R("div", {
			className: e("flex grow flex-col min-w-0", s && "items-end"),
			children: [
				m && /* @__PURE__ */ R("div", {
					className: e("flex items-baseline gap-2 min-w-0", s && "flex-row-reverse"),
					children: [
						!o && /* @__PURE__ */ L("span", {
							"data-testid": "message-row-author",
							className: e("text-xs font-semibold truncate", f ? "text-white/70" : "text-text-secondary"),
							children: t
						}),
						p && /* @__PURE__ */ L("time", {
							"data-testid": "message-row-time",
							dateTime: r,
							title: U(r),
							className: e("text-xs shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: p
						}),
						u && /* @__PURE__ */ L("span", {
							"data-testid": "message-row-edited",
							title: `Edited ${U(u)}`,
							className: e("text-[11px] shrink-0", f ? "text-white/40" : "text-text-tertiary"),
							children: "(edited)"
						})
					]
				}),
				/* @__PURE__ */ L("span", {
					"data-testid": "message-row-content",
					className: e("text-sm min-w-0 break-words whitespace-pre-wrap", f ? "text-white/90" : "text-text-primary", s && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && (f ? "bg-white/15" : "bg-primary-bg")),
					children: n
				}),
				c && /* @__PURE__ */ L("div", {
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
var K = /* @__PURE__ */ new Set([
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
]), re = /^(https?:|mailto:)/i;
function ie(e) {
	if (!e) return null;
	let t = e.trim();
	return t.startsWith("/") || t.startsWith("#") || re.test(t) ? t : null;
}
function ae(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, r = Array.from(n.childNodes).map((e, n) => ae(e, `${t}-${n}`));
	if (!K.has(n.tagName)) return /* @__PURE__ */ L("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ L("br", {}, t);
		case "A": {
			let e = ie(n.getAttribute("href"));
			return e ? /* @__PURE__ */ L("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ L("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ L("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ L(e, { children: r }, t);
		}
	}
}
var oe = /```([\s\S]*?)```|`([^`\n]+)`/g;
function se(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (oe.lastIndex = 0; (r = oe.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ L("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ L("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ L("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function ce({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = N(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ae(e, `n${t}`));
	}, [t]), o = N(() => se(n ?? ""), [n]);
	return /* @__PURE__ */ L("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function le({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, className: s, "data-testid": l = "document-activity-card" }) {
	let u = a.length > 0;
	return /* @__PURE__ */ R("div", {
		"data-testid": l,
		"data-document-id": t,
		"data-editing": u ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s),
		children: [
			/* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				className: "grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: r || "📄"
			}),
			/* @__PURE__ */ R("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ L("span", {
					className: "truncate text-[13px] font-semibold text-text-primary",
					children: n || "Untitled"
				}), /* @__PURE__ */ L("span", {
					className: "truncate text-[11px] text-text-tertiary",
					children: u ? `${ue(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			u && /* @__PURE__ */ L("span", {
				className: "shrink-0",
				"data-testid": `${l}-editors`,
				children: /* @__PURE__ */ L(c, {
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
			o && /* @__PURE__ */ L("button", {
				type: "button",
				"data-testid": `${l}-open`,
				onClick: () => o(t),
				className: "shrink-0 rounded border border-border bg-surface px-2 py-1 text-[11px] font-medium text-text-primary hover:bg-surface-hover",
				children: "Open"
			})
		]
	});
}
function ue(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function de({ documentId: t, label: n, icon: r, onOpen: i, className: a, "data-testid": o = "chat-message-docref" }) {
	return /* @__PURE__ */ R("button", {
		type: "button",
		onClick: i ? () => i(t) : void 0,
		disabled: !i,
		title: n,
		"data-testid": o,
		"data-document-id": t,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", i ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a),
		children: [/* @__PURE__ */ L("span", {
			"aria-hidden": "true",
			className: "shrink-0",
			children: r || "📄"
		}), /* @__PURE__ */ L("span", {
			className: "min-w-0 truncate",
			children: n
		})]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function fe(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function pe(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function me(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function he({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, audioOnly: o, recorded: s, notRecordedReason: l, lobbyName: u, onJoin: d, className: f, "data-testid": p = "call-activity-card" }) {
	let m = !i && typeof a == "number" ? fe(a) : "", h = o === void 0 ? "Call" : o ? "Audio call" : "Video call", g = i ? pe(r, !0) : [n ? `${n} started a call` : "Call ended", m].filter(Boolean).join(" · ");
	return /* @__PURE__ */ R("div", {
		"data-testid": p,
		"data-call-id": t,
		"data-live": i ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", i ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", f),
		children: [
			/* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded text-base", "bg-surface"),
				children: o === void 0 || o ? "📞" : "📹"
			}),
			/* @__PURE__ */ R("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ L("span", {
						className: "truncate text-[13px] font-semibold text-text-primary",
						children: i ? `${h} in progress` : h
					}),
					/* @__PURE__ */ L("span", {
						className: "truncate text-[11px] text-text-tertiary",
						children: g
					}),
					!i && s === !1 && /* @__PURE__ */ L("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${p}-not-recorded`,
						children: me(l, u)
					})
				]
			}),
			r.length > 0 && /* @__PURE__ */ L("span", {
				className: "shrink-0",
				"data-testid": `${p}-participants`,
				children: /* @__PURE__ */ L(c, {
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
			i && d && /* @__PURE__ */ L("button", {
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
var ge = {
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
function _e(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function q(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function ve(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function ye({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ R("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ L("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ L(w, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ R("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ L("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ L("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ L("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function be({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: l, thumbnailUrl: f, stage: p = "ready", transcriptReady: m = !1, summaryReady: h = !1, expiresAt: g, pinned: _ = !1, onOpen: v, onCopyLink: y, onShare: b, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: E, className: D, "data-testid": O = "recording-activity-card" }) {
	let k = o ?? a.length, A = p === "gone", j = p !== "saving" && p !== "failed" && !A && !!v, M = () => {
		v?.(n);
	}, N = l != null && l > 0 ? fe(l) : "", P = _e(s), F = ve(a, k), { state: I, label: z } = ge[p], B = [
		...v && j ? [{
			"data-testid": `${O}-menu-open`,
			label: "Open",
			onSelect: M
		}] : [],
		...C && m ? [{
			"data-testid": `${O}-menu-transcript`,
			label: "Transcript",
			onSelect: () => C(n)
		}] : [],
		...y && !A ? [{
			"data-testid": `${O}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => y(n)
		}] : [],
		...b && !A ? [{
			"data-testid": `${O}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => b(n)
		}] : [],
		...x && !A ? [{
			"data-testid": `${O}-menu-pin`,
			label: _ ? "Unpin" : "Pin",
			onSelect: () => x(n)
		}] : [],
		...S && j ? [{
			"data-testid": `${O}-menu-download`,
			label: "Download",
			onSelect: () => S(n)
		}] : []
	], ee = B.length ? [{
		items: B,
		"data-testid": `${O}-menu-items`
	}] : [];
	return /* @__PURE__ */ R("div", {
		"data-testid": O,
		"data-recording-id": n,
		"data-stage": p,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", D),
		children: [/* @__PURE__ */ R("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ R("button", {
				type: "button",
				onClick: j ? M : void 0,
				disabled: !j,
				"aria-label": j ? `Play ${r.toLowerCase()}` : `${r}: ${z.toLowerCase()}`,
				"data-testid": `${O}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", j ? "cursor-pointer" : "cursor-default"),
				children: [
					f ? /* @__PURE__ */ L("img", {
						src: f,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${O}-thumbnail`
					}) : /* @__PURE__ */ L(ye, {
						participants: a,
						total: k,
						testId: O
					}),
					j && /* @__PURE__ */ L("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ L("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ L("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ L("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					N && /* @__PURE__ */ L("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${O}-duration`,
						children: N
					})
				]
			}), /* @__PURE__ */ R("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ R("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ R("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ L("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${O}-title`,
								children: r
							}), _ && /* @__PURE__ */ L("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${O}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ L(d, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ R("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${O}-by`,
							children: ["by ", i]
						}),
						k > 0 && /* @__PURE__ */ R("div", {
							className: "flex items-center gap-2",
							"data-testid": `${O}-people`,
							children: [/* @__PURE__ */ L(c, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: E
							}), /* @__PURE__ */ L("span", {
								className: "truncate text-xs text-text-tertiary",
								children: F
							})]
						}),
						/* @__PURE__ */ R("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ L(T, {
									state: I,
									label: z,
									size: "sm",
									"data-testid": `${O}-stage`
								}),
								p === "ready" && m && /* @__PURE__ */ L(T, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${O}-transcript`
								}),
								p === "ready" && h && /* @__PURE__ */ L(T, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${O}-summary`
								}),
								P && /* @__PURE__ */ L("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${O}-when`,
									children: P
								})
							]
						})
					]
				}), ee.length > 0 && /* @__PURE__ */ L(u, {
					trigger: /* @__PURE__ */ L("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: ee,
					"data-testid": `${O}-menu`
				})]
			})]
		}), g && p !== "failed" && !A && /* @__PURE__ */ R("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${O}-expiry`,
			children: [/* @__PURE__ */ R("span", { children: ["Set to expire ", q(g)] }), w && /* @__PURE__ */ L(t, {
				variant: "ghost",
				size: "sm",
				onClick: () => w(n),
				"data-testid": `${O}-manage-expiry`,
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
	return /* @__PURE__ */ R("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ L("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ L("time", {
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
], Ee = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, De = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Oe = 6;
function J(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Y(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function ke(e) {
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
function Ae(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function je(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function Me(e) {
	if (!e?.startedAt) return null;
	let t = Ae(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? je(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var Ne = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function Pe({ runId: r, instruction: i, agentName: a, requestedBy: o, command: s = "/doc", status: c, onOpenDocument: l, onOpenRun: u, result: d, onOpenResult: f, onDecide: p, suggestion: h, onReview: g, documentTitle: _, defaultExpanded: v = !1, className: y, "data-testid": b = "agent-run-card" }) {
	let x = c?.phase ?? "received", [S, C] = F(v), w = x === "completed" ? c?.suggestion ?? h : void 0, T = x === "completed" ? c?.review : void 0, E = !!w && !T, D = x === "completed" && c?.noop === !0, O = x === "completed" ? c?.result ?? d : void 0, k = O?.kind === "link" && O.label ? O.label : "Open", A = l && !(O?.kind === "document" && f), j = Ee[x], M = x === "failed" || x === "rejected", N = M ? "danger" : T ? T.decision === "accept" ? "success" : "neutral" : D ? "warning" : x === "completed" ? w ? "warning" : "success" : x === "awaiting_approval" ? "warning" : "info", P = T ? "Reviewed" : E ? "Suggested" : D ? "No change" : De[x], I = T ? T.byName ?? T.by : void 0, z = T ? `${T.decision === "accept" ? "Accepted" : "Rejected"} by ${I}` : void 0, B = x === "awaiting_approval", ee = x === "running" ? c?.stepLabel ? `${a} — ${c.stepLabel}` : `${a} is working via the pipeline` : B ? `Waiting for approval${c?.detail ? ` — ${c.detail}` : ""}` : z ?? c?.detail ?? (E && c?.suggestion ? `${c.suggestion.applied} ${c.suggestion.applied === 1 ? "change" : "changes"} suggested` : x === "received" ? "Received" : P), V = c?.details, H = V?.ops ?? [], te = V?.steps ?? [], ne = V?.document?.title || _ || "Document", U = !!V?.document || !!l, W = V?.error ?? (x === "failed" ? c?.detail : void 0), G = Me(V), K = `${b}-details-${r}`;
	return /* @__PURE__ */ R("div", {
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
			/* @__PURE__ */ R("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ L("span", {
						"aria-hidden": "true",
						className: "shrink-0",
						children: "🪄"
					}),
					/* @__PURE__ */ R("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${b}-instruction`,
						children: [
							/* @__PURE__ */ L("span", {
								className: "font-mono text-text-tertiary",
								children: s
							}),
							" ",
							i
						]
					}),
					/* @__PURE__ */ L(m, {
						size: "xs",
						tone: N,
						"data-testid": `${b}-phase`,
						children: P
					}),
					/* @__PURE__ */ L(n, {
						size: "sm",
						"aria-label": S ? "Hide details" : "Show details",
						"aria-expanded": S,
						"aria-controls": S ? K : void 0,
						onClick: () => C((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${b}-toggle`,
						icon: /* @__PURE__ */ L("span", {
							"aria-hidden": "true",
							className: e("inline-block transition-transform duration-150", S && "rotate-90"),
							children: "▶"
						})
					})
				]
			}),
			/* @__PURE__ */ R("div", {
				className: "flex min-w-0 items-center gap-1.5 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ L("ol", {
						className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
						"aria-label": "Run progress",
						"data-testid": `${b}-steps`,
						children: Te.map((t, n) => {
							let r = M ? n < j : n < j || n === j && x === "completed", i = n === j && x !== "completed" && !M, a = M && n === j;
							return /* @__PURE__ */ R("li", {
								className: "flex items-center",
								title: t.label,
								"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
								children: [/* @__PURE__ */ L("span", {
									"aria-hidden": "true",
									className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? D && n === j ? "bg-warning" : "bg-success" : i ? B ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
								}), /* @__PURE__ */ L("span", {
									className: "sr-only",
									children: a ? P : t.label
								})]
							}, t.phase);
						})
					}),
					/* @__PURE__ */ L("span", {
						className: e("min-w-0 flex-1 truncate", T && (T.decision === "accept" ? "text-success" : "text-text-tertiary"), x === "failed" && "text-danger", D && "text-warning-fg"),
						"data-testid": `${b}-detail`,
						"data-review": T?.decision,
						title: c?.detail,
						children: ee
					}),
					E && w && g && /* @__PURE__ */ R("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-review`,
						children: [/* @__PURE__ */ L(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => g(r, "accept", {
								key: w.key,
								...w.documentId ? { documentId: w.documentId } : {}
							}),
							"data-testid": `${b}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ L(t, {
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
					B && p && /* @__PURE__ */ R("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${b}-decide`,
						children: [/* @__PURE__ */ L(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => p(r, "approve"),
							"data-testid": `${b}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ L(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => p(r, "reject"),
							"data-testid": `${b}-reject`,
							children: "Reject"
						})]
					}),
					O && f && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: () => f(O),
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": O.kind,
						children: k
					}),
					O?.kind === "link" && !f && /* @__PURE__ */ L("a", {
						href: O.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
						"data-testid": `${b}-open-result`,
						"data-result-kind": "link",
						children: k
					}),
					u && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: () => u(r),
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-run`,
						children: "run"
					}),
					A && /* @__PURE__ */ L("button", {
						type: "button",
						onClick: l,
						className: "shrink-0 text-text-tertiary underline-offset-2 hover:text-text-primary hover:underline",
						"data-testid": `${b}-open-document`,
						children: "document"
					})
				]
			}),
			S && /* @__PURE__ */ R("div", {
				id: K,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${b}-details`,
				children: [
					U && /* @__PURE__ */ R("div", {
						className: "flex items-start gap-2",
						"data-testid": `${b}-details-document`,
						children: [
							/* @__PURE__ */ L("span", {
								"aria-hidden": "true",
								className: "shrink-0",
								children: "📄"
							}),
							/* @__PURE__ */ R("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ L("span", {
									className: "block truncate font-medium text-text-primary",
									children: ne
								}), V?.document?.snippet && /* @__PURE__ */ L("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${b}-details-snippet`,
									children: V.document.snippet
								})]
							}),
							l && /* @__PURE__ */ L(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: l,
								"data-testid": `${b}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					H.length > 0 && /* @__PURE__ */ R("div", {
						"data-testid": `${b}-details-ops`,
						children: [
							/* @__PURE__ */ L("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ L("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: H.slice(0, Oe).map((e, t) => /* @__PURE__ */ L("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: ke(e)
								}, t))
							}),
							H.length > Oe && /* @__PURE__ */ R("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${b}-details-more-ops`,
								children: [
									"+",
									H.length - Oe,
									" more"
								]
							})
						]
					}),
					te.length > 0 && /* @__PURE__ */ L("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${b}-details-steps`,
						children: te.map((t) => /* @__PURE__ */ R("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ L("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ne[t.status] ?? Ne.pending)
							}), /* @__PURE__ */ L("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					W && /* @__PURE__ */ L("div", {
						className: "text-[11px] text-danger",
						"data-testid": `${b}-details-error`,
						children: W
					}),
					/* @__PURE__ */ R("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							u && /* @__PURE__ */ L("button", {
								type: "button",
								onClick: () => u(r),
								className: "shrink-0 underline-offset-2 hover:text-text-primary hover:underline",
								"data-testid": `${b}-details-open-run`,
								children: "Open run"
							}),
							O && f && /* @__PURE__ */ L("button", {
								type: "button",
								onClick: () => f(O),
								className: "shrink-0 font-medium text-info underline-offset-2 hover:underline",
								"data-testid": `${b}-details-open-result`,
								children: k
							}),
							G && /* @__PURE__ */ L("span", {
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
	let o = N(() => Le(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ L("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ R("button", {
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: Re(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ L("span", {
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
], X = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function Ve({ quickReactions: t = Be, onReact: n, onOpenReactionPicker: r, onReply: i, onTogglePin: a, pinned: s = !1, onCopyLink: c, onEdit: u, onDelete: f, className: p, "data-testid": m = "message-actions" }) {
	let h = (e, t, n, r) => /* @__PURE__ */ L("button", {
		type: "button",
		"aria-label": e,
		title: e,
		"data-testid": `${m}-${r}`,
		onClick: t,
		className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${X}`,
		children: n
	}, r);
	return /* @__PURE__ */ R("div", {
		"data-testid": m,
		className: e("flex items-center gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", p),
		children: [
			n && t.map((e) => h(`React ${e}`, () => n(e), /* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				children: e
			}), `react-${e}`)),
			r && h("More reactions", r, /* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				children: "😀"
			}), "more-reactions"),
			i && h("Reply", i, /* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				children: "↩"
			}), "reply"),
			a && h(s ? "Unpin" : "Pin to channel", a, /* @__PURE__ */ L(d, { size: 14 }), "pin"),
			c && h("Copy link to message", c, /* @__PURE__ */ L("span", {
				"aria-hidden": !0,
				children: "🔗"
			}), "copy-link"),
			u && h("Edit message", u, /* @__PURE__ */ L(l, { size: 13 }), "edit"),
			f && h("Delete message", f, /* @__PURE__ */ L(o, { size: 13 }), "delete")
		]
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function He({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = F(e), [s, c] = F(!1), [l, u] = F(null), d = P(null);
	M(() => {
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
	return /* @__PURE__ */ R("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ L(C, {
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
			/* @__PURE__ */ R("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ L("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ L(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ L(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ L("p", {
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
function Ue(e, t = 120) {
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
	let o = /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ R("span", {
		className: "flex items-baseline gap-2",
		children: [/* @__PURE__ */ L("span", {
			className: "truncate text-xs font-semibold text-text-primary",
			children: t.author
		}), t.timestamp && /* @__PURE__ */ L("span", {
			className: "shrink-0 text-[11px] tabular-nums text-text-tertiary",
			children: We(t.timestamp)
		})]
	}), /* @__PURE__ */ L("span", {
		className: "block truncate text-xs text-text-secondary",
		children: Ue(t.text)
	})] });
	return /* @__PURE__ */ R("div", {
		"data-testid": a,
		"data-message-id": t.messageId,
		className: e("flex items-start gap-2 rounded border-l-2 border-primary bg-surface-inset px-2 py-1", i),
		children: [n ? /* @__PURE__ */ L("button", {
			type: "button",
			"data-testid": `${a}-jump`,
			onClick: () => n(t.messageId),
			"aria-label": `Go to the message from ${t.author}`,
			className: "flex min-w-0 flex-1 flex-col items-start text-left hover:underline",
			children: o
		}) : /* @__PURE__ */ L("span", {
			className: "flex min-w-0 flex-1 flex-col",
			children: o
		}), r && /* @__PURE__ */ L("button", {
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
	return a ? /* @__PURE__ */ R("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [/* @__PURE__ */ L("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r ? "cursor-zoom-in" : "cursor-default", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: o ? /* @__PURE__ */ L("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ L("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ L("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			})
		}), /* @__PURE__ */ R("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ L("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ L("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: A(t.size)
			})]
		})]
	}) : /* @__PURE__ */ L("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: /* @__PURE__ */ R("button", {
			type: "button",
			onClick: r ? () => r(t) : void 0,
			"aria-label": `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
			children: [/* @__PURE__ */ L(Xe, {}), /* @__PURE__ */ R("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ L("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ L("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: A(t.size)
				})]
			})]
		})
	});
}
function Je(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function Ye({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : A(o);
	return /* @__PURE__ */ R("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ L("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ L(Xe, {}),
			/* @__PURE__ */ R("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ R("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ L("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ L("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ L("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ L("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ L("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ L("button", {
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
	return /* @__PURE__ */ L("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ L("path", {
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
	let a = te(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ R("div", {
		role: "separator",
		"aria-label": ne(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ L("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ L("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ L("span", {
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
function at(e) {
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
function ot(e) {
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
function st(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function ct(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(st(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function lt(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function ut(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function dt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = lt(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = lt(r), i = ut(r);
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
		let e = lt(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = lt(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var ft = 3, pt = 2, Z = 3e5;
function mt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function ht(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(Fe(e.metadata) || at(e.metadata) || it(e.metadata) || et(e.metadata) || ot(e.metadata));
}
function gt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = mt(r);
	if (!i || i !== mt(n) || !ht(n) || !ht(r) || r.editedAt || H(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Z;
}
function _t(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function vt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ R("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ L("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ L("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function yt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function bt(e) {
	return e.displayName || e.userId;
}
function xt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = mt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function St({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, currentUserId: u, reactionsFor: f, onToggleReaction: p, onReply: m, onTogglePin: g, onEditMessage: v, onDeleteMessage: b, pinnedMessageIds: C, onJumpToMessage: T, highlightedMessageId: A, threaded: N = !1, alignOwnMessages: z = !0, documentEditors: B, callParticipants: ee, agentRunStatus: V, onOpenRun: te, onOpenResult: ne, onDecideRun: W, onReviewRun: K, onJoinCall: re, onOpenRecording: ie, onCopyRecordingLink: ae, onShareRecording: oe, onDownloadRecording: se, onOpenRecordingTranscript: ue, onManageRecordingExpiry: fe, recordingStatus: pe, onOpenDocument: me, tone: ge = "light", showHeader: _e, fill: q, onLoadMore: ve, hasMore: ye, loadingMore: xe = !1, onSendFiles: Se, transfers: Ce = [], currentActor: Te, onCancelTransfer: Ee, attachmentSrc: De, onOpenAttachment: Oe, acceptFiles: J, maxFileSize: Y, onFileError: ke, readReceipts: Ae = [], readReceiptsEnabled: je = !0, unreadFrom: Me, emojis: Ne = k }) {
	let [Ie, Le] = F(null), [Re, Be] = F(null), X = ge === "dark", Ue = x(), We = _e ?? !(Ue?.hasHeader ?? !1), Ke = q ?? Ue?.fillsHeight ?? !1, [Xe, nt] = F(""), ut = P(null), Z = P(null), mt = !!ve && ye !== !1, ht = P(null), St = P(null), [wt, Tt] = F(!1), Et = !!Se && !a, Q = ct(n, r), $ = N ? dt(Q) : null, [Dt, Ot] = F(() => /* @__PURE__ */ new Set());
	function kt(e) {
		Ot((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let At = P(void 0);
	if (Me !== void 0) {
		let e = At.current;
		if (e === void 0) At.current = Me;
		else {
			let t = Date.parse(Me), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (At.current = Me);
		}
	}
	let jt = At.current, Mt = jt === void 0 ? -1 : _t($ ? $.map((e) => st(e.root)) : Q.map((e) => st(e)), jt), Nt = je && u ? u : void 0, Pt = (() => {
		if (!(!Nt || Ae.length === 0)) for (let e = Q.length - 1; e >= 0; --e) {
			let t = Q[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== Nt || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), Ft = Pt && Nt ? yt(Ae, Nt, Pt.timestamp) : [], It = Ft.length === 1 && !!Nt && xt(n, Ae, Nt) === 1;
	function Lt() {
		if (Ft.length === 0) return null;
		let t = Ft.map(bt), n = Ft.slice(0, 3);
		return /* @__PURE__ */ R("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", z ? "justify-end pr-1" : "justify-start pl-7", X ? "text-white/50" : "text-text-tertiary"),
			children: [
				Ft.length > 1 && /* @__PURE__ */ L("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ L(w, {
						name: bt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ L("span", {
					"data-testid": "chat-read-receipts-label",
					children: It ? "Seen" : `Seen by ${Ft.length}`
				}),
				/* @__PURE__ */ L("span", {
					style: y,
					children: It ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [Rt, zt] = F(0), [Bt, Vt] = F(!1), Ht = P(!0), Ut = P(n.length), Wt = n.length + r.length + Ce.length, Gt = P(null), [Kt, qt] = F(""), Jt = P(null), Yt = P(!1), Xt = P(0);
	M(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!Yt.current) {
			Yt.current = !0, Jt.current = t;
			return;
		}
		if (t === Jt.current || (Jt.current = t, u && e.userId === u)) return;
		Xt.current += 1;
		let r = Xt.current % 2 == 0 ? "​" : "";
		qt($e(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, u]);
	function Zt() {
		let e = ut.current;
		e && (e.scrollTop = e.scrollHeight, Ht.current = !0, zt(0));
	}
	function Qt() {
		let e = ut.current;
		if (!e) return;
		let t = Qe(e);
		Ht.current = t, t && zt(0), Vt(e.scrollTop > 8);
	}
	M(() => {
		let e = ut.current, t = Ut.current, n = Wt - t;
		if (Ut.current = Wt, !e) return;
		let r = Gt.current;
		if (r && n > 0) {
			Gt.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		Ht.current ? (e.scrollTop = e.scrollHeight, zt(0), Vt(e.scrollTop > 8)) : n > 0 && zt((e) => e + n);
	}, [Wt]);
	function $t() {
		let e = ut.current;
		e && (Gt.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), ve?.();
	}
	M(() => () => {
		Z.current && clearTimeout(Z.current);
	}, []);
	function en() {
		let e = Xe.trim();
		!e || a || (Z.current && clearTimeout(Z.current), Z.current = null, o?.(!1), Ht.current = !0, i(e), nt(""));
	}
	function tn(e) {
		!Et || e.length === 0 || (Ht.current = !0, Se?.(e));
	}
	function nn(e) {
		if (!Et) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), tn(t));
	}
	function rn(e) {
		nt((t) => t + e), Tt(!1);
	}
	function an() {
		a || (o?.(!0), Z.current && clearTimeout(Z.current), Z.current = setTimeout(() => o?.(!1), 2e3));
	}
	function on(e) {
		an(), e.key === "Enter" && !a && Xe.trim() && en();
	}
	function sn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === Mt ? /* @__PURE__ */ L(vt, { tone: ge }) : null, l = !c && gt(a, n), h = !o && H(s, i) ? /* @__PURE__ */ L(Ze, {
			timestamp: s,
			tone: ge
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = Fe(r.metadata);
			return /* @__PURE__ */ R(j, { children: [
				h,
				c,
				/* @__PURE__ */ L("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ L(G, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: ge,
						mine: !0,
						content: /* @__PURE__ */ R(I, { children: [
							i ? /* @__PURE__ */ L(Pe, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: V?.(i.runId),
								onOpenDocument: me && i.documentId ? () => me(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: te,
								result: i.result,
								onOpenResult: ne,
								onDecide: W,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: K
							}) : /* @__PURE__ */ L(ce, { text: r.content }),
							/* @__PURE__ */ L("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", X ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ L("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ L(t, {
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
		let { message: _ } = n, y = _.displayName ?? _.clientId.slice(0, 8), x = _.attachments ?? [], S = _.metadata?.html, w = typeof S == "string" ? S : void 0, E = /* @__PURE__ */ L(ce, {
			html: w,
			text: _.content
		}), D = et(_.metadata), O = Fe(_.metadata), k = it(_.metadata), M = at(_.metadata), N = ot(_.metadata), P = rt(_.metadata), F = tt(_.metadata), _e = O ? /* @__PURE__ */ L(Pe, {
			runId: O.runId,
			instruction: O.instruction || _.content.replace(/^\/doc\s*/i, ""),
			command: O.command,
			agentName: O.agentName,
			requestedBy: _.displayName,
			status: V?.(O.runId),
			onOpenDocument: me && O.documentId ? () => me(O.documentId) : void 0,
			documentTitle: O.documentTitle,
			onOpenRun: te,
			result: O.result,
			onOpenResult: ne,
			onDecide: W,
			suggestion: O.suggestionKey ? {
				key: O.suggestionKey,
				...O.documentId ? { documentId: O.documentId } : {}
			} : void 0,
			onReview: K
		}) : M ? (() => {
			let e = pe?.(M.recordingId), t = {
				...M,
				...e ?? {}
			};
			return /* @__PURE__ */ L(be, {
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
				pinned: !!_.id && !!C?.has(_.id),
				onOpen: ie,
				onCopyLink: ae,
				onShare: oe,
				onDownload: se,
				onOpenTranscript: ue,
				onManageExpiry: fe,
				onTogglePin: g ? () => g(_) : void 0
			});
		})() : k ? /* @__PURE__ */ L(he, {
			callId: k.callId,
			startedBy: (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			participants: ee?.(k.callId) ?? k.participants,
			live: k.live,
			durationMs: k.durationMs,
			audioOnly: k.audioOnly,
			recorded: k.recorded,
			notRecordedReason: k.notRecordedReason,
			lobbyName: k.lobbyName,
			onJoin: re
		}) : D ? /* @__PURE__ */ L(le, {
			documentId: D.documentId,
			title: D.title || _.content,
			icon: D.icon,
			createdBy: D.createdBy ?? (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			editors: B?.(D.documentId) ?? [],
			onOpen: me
		}) : x.length === 0 ? E : /* @__PURE__ */ R(I, { children: [(_.content || w) && E, x.map((e) => /* @__PURE__ */ L(qe, {
			attachment: e,
			src: De?.(e),
			onOpen: Oe
		}, e.id))] }), q = _.id ?? "", ve = q && f ? f(q) : [], ye = _.metadata?.replyTo, xe = !!o && !!ye && ye.messageId === o.rootId, Se = !!ye && !xe, Ce = !!q && !!C?.has(q), Te = !!u && _.userId === u, Ee = _.metadata?.system === !0, J = !!_.deletedAt || _.metadata?.deleted === !0, Y = Te && !J && !Ee && !(O || M || k || D || N) && !!q, ke = Y && !!v && Ie === q, Ae = /* @__PURE__ */ R(I, { children: [
			Se && ye && /* @__PURE__ */ L(Ge, {
				quote: ye,
				onJump: T,
				className: "mb-1"
			}),
			Ce && /* @__PURE__ */ R("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ L(d, { size: 11 }), " Pinned"]
			}),
			J ? /* @__PURE__ */ L("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : ke ? /* @__PURE__ */ L(He, {
				initialText: _.content,
				onSave: async (e) => {
					await v(_, e), Le(null);
				},
				onCancel: () => Le(null)
			}) : _e,
			!J && F.length > 0 && /* @__PURE__ */ L("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: F.map((e) => /* @__PURE__ */ L(de, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: me
				}, e.id))
			}),
			!J && P && /* @__PURE__ */ R("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					P.labels.length > 0 ? `Too large to send: ${P.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!J && ve.length > 0 && u && p && /* @__PURE__ */ L(ze, {
				reactions: ve,
				currentUserId: u,
				onToggle: (e) => p(q, e)
			})
		] });
		return N ? /* @__PURE__ */ R(j, { children: [
			h,
			c,
			/* @__PURE__ */ L(we, {
				membership: N,
				fallbackText: _.content,
				timestamp: _.timestamp,
				"data-testid": "membership-notice"
			})
		] }, _.id ?? r) : /* @__PURE__ */ R(j, { children: [
			h,
			c,
			/* @__PURE__ */ R("div", {
				"data-testid": "chat-message",
				"data-message-id": q || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? U(_.timestamp) : void 0,
				className: e("group relative rounded-md transition-colors hover:bg-surface-hover", q && q === A && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: [/* @__PURE__ */ L(G, {
					author: y,
					content: Ae,
					timestamp: l ? "" : _.timestamp,
					editedAt: J ? void 0 : _.editedAt,
					avatarUrl: _.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: ge,
					mine: Te && z
				}), q && !J && !ke && (p || Y || !Ee && (m || g)) && /* @__PURE__ */ L(Ve, {
					className: e("absolute -top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100 group-has-[:focus-visible]:opacity-100"),
					onReact: p ? (e) => p(q, e) : void 0,
					onReply: m && !Ee ? () => m(o?.rootMessage ?? _) : void 0,
					onTogglePin: g && !Ee ? () => g(_) : void 0,
					pinned: !!_.id && !!C?.has(_.id),
					onEdit: Y && v ? () => Le(q) : void 0,
					onDelete: Y && b ? () => Be(q) : void 0
				})]
			}),
			!!Pt && q === Pt.id && Lt()
		] }, _.id ?? r);
	}
	function cn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function ln(e) {
		if (!m || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !ot(t.metadata)) return t;
	}
	function un(t, n, r) {
		let i = st(r?.root), a = r && r.replies.length === 0 && !ln(r.root) ? r.root : void 0, o = sn(t.root, n, i, a), s = st(t.root) ?? "", c = n > 0 && n !== Mt && !H(s, i) ? /* @__PURE__ */ L("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", X ? "border-white/10" : "border-border-subtle")
		}) : null, l = ln(t.root);
		if (t.replies.length === 0 && !l) return c ? /* @__PURE__ */ R(j, { children: [c, o] }, `post:${lt(t.root) ?? n}`) : o;
		let u = lt(t.root) ?? "", d = t.root.kind === "message" ? t.root.message : void 0, f = !!u && t.replies.length > ft, p = !f || Dt.has(u), h = p ? t.replies : t.replies.slice(0, pt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(cn))].slice(0, 3), v = t.replies.length === 0;
		return /* @__PURE__ */ R(j, { children: [c, /* @__PURE__ */ R("div", {
			"data-testid": "chat-thread",
			"data-thread-root": u || void 0,
			className: "group/post",
			children: [
				o,
				t.replies.length > 0 && /* @__PURE__ */ R("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", X ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => sn(e, t, void 0, h[t - 1], {
						rootId: u,
						...d ? { rootMessage: d } : {}
					})), f && /* @__PURE__ */ R("button", {
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": p,
						onClick: () => kt(u),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!p && _.length > 0 && /* @__PURE__ */ L("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ L(w, {
								name: e,
								size: 16
							}, e))
						}), p ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				l && /* @__PURE__ */ L("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ L("button", {
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${cn(t.root)}`,
						onClick: () => m?.(l),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", v && e("opacity-0 transition-opacity", "group-hover/post:opacity-100 group-has-[:focus-visible]/post:opacity-100", "[@media(hover:none)]:opacity-100"), X ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${u || n}`);
	}
	let dn = /* @__PURE__ */ R("div", {
		"data-testid": "chat-panel",
		className: e(Ke ? "flex h-full min-h-0 flex-col px-3 pb-3 pt-2" : e("border rounded p-3 mt-4", X ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			We && /* @__PURE__ */ R("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", X ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ L("span", {
				style: y,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Kt
			}),
			/* @__PURE__ */ R("div", {
				className: e("relative flex flex-col mb-2", Ke ? "min-h-0 flex-1" : ""),
				children: [/* @__PURE__ */ L("div", {
					ref: ut,
					onScroll: Qt,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", Bt && "fade-top", Ke ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ R("div", {
						className: "mt-auto pb-4",
						children: [
							mt && n.length > 0 && /* @__PURE__ */ L("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ L("button", {
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: $t,
									disabled: xe,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: xe ? "Loading…" : "Load earlier messages"
								})
							}),
							Q.length === 0 ? c ?? /* @__PURE__ */ L("div", {
								className: e("text-sm", X ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : $ ? $.map((e, t) => un(e, t, $[t - 1])) : Q.map((e, t) => sn(e, t, st(Q[t - 1]), Q[t - 1])),
							b && /* @__PURE__ */ L(h, {
								open: Re !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => Be(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === Re);
									Be(null), e && b(e);
								}
							}),
							Ce.map((e) => /* @__PURE__ */ L(G, {
								author: e.actor,
								timestamp: "",
								tone: ge,
								content: /* @__PURE__ */ L(Ye, {
									transfer: e,
									mine: Je(e, u, Te),
									onCancel: Ee
								})
							}, e.transferId))
						]
					})
				}), Rt > 0 && /* @__PURE__ */ R("button", {
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Zt,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", X ? "bg-white/20 text-white" : "bg-primary text-white"),
					children: [
						Rt,
						" new message",
						Rt === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ L(_, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", X ? "text-white/50" : "text-text-secondary")
			}),
			l ? /* @__PURE__ */ L("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? an : void 0,
				children: l
			}) : /* @__PURE__ */ R("div", {
				className: "flex flex-row items-center gap-2 shrink-0",
				children: [
					Se && /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L("button", {
						type: "button",
						"data-testid": "chat-panel-attach",
						"aria-label": "Attach a file",
						title: "Attach a file",
						disabled: !Et,
						onClick: () => ht.current?.click(),
						className: e("shrink-0 rounded p-1.5 disabled:opacity-40", X ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ L(Ct, {})
					}), /* @__PURE__ */ L(E, {
						ref: ht,
						multiple: !0,
						accept: J,
						onFiles: (e) => {
							let t = Y ? e.filter((e) => e.size > Y) : [];
							t.length > 0 && ke?.(`Skipped ${t.length} file(s) over the size limit.`), tn(e.filter((e) => !t.includes(e)));
						}
					})] }),
					/* @__PURE__ */ L("button", {
						ref: St,
						type: "button",
						"data-testid": "chat-panel-emoji",
						"aria-label": "Insert emoji",
						"aria-expanded": wt,
						title: "Insert emoji",
						disabled: a,
						onClick: () => Tt((e) => !e),
						className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", X ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
						children: /* @__PURE__ */ L("span", {
							"aria-hidden": "true",
							children: "🙂"
						})
					}),
					/* @__PURE__ */ L(D, {
						open: wt,
						onSelect: rn,
						onClose: () => Tt(!1),
						triggerRef: St,
						emojis: Ne
					}),
					/* @__PURE__ */ L(S, {
						size: "sm",
						value: Xe,
						onChange: (e) => nt(e.target.value),
						onKeyDown: on,
						onPaste: nn,
						disabled: a,
						placeholder: a ? "Not connected" : "Type a message...",
						className: e("flex-1 text-sm", X && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
					}),
					/* @__PURE__ */ L(t, {
						variant: "primary",
						size: "sm",
						onClick: en,
						disabled: a || !Xe.trim(),
						className: "text-sm px-3 shrink-0",
						children: "Send"
					})
				]
			})
		]
	});
	return Se ? /* @__PURE__ */ L(O, {
		onFiles: tn,
		accept: J,
		maxSize: Y,
		onError: ke,
		disabled: a,
		className: Ke ? "flex h-full min-h-0 flex-col" : void 0,
		children: dn
	}) : dn;
}
function Ct() {
	return /* @__PURE__ */ L("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ L("path", {
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
function wt(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function Tt({ users: e, currentClientId: t }) {
	return /* @__PURE__ */ R("div", {
		className: "border border-border rounded p-3 font-mono",
		children: [/* @__PURE__ */ R("div", {
			className: "text-[0.8rem] font-bold mb-2 text-text-primary",
			children: [
				"Users in channel (",
				e.length,
				")"
			]
		}), e.length === 0 ? /* @__PURE__ */ L("div", {
			className: "text-text-tertiary text-xs",
			children: "No other users connected"
		}) : /* @__PURE__ */ L("div", { children: e.map((e) => {
			let n = B(wt(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = ee(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
			return /* @__PURE__ */ R("div", {
				className: "flex items-center gap-2 py-1 text-xs",
				children: [
					/* @__PURE__ */ L("div", {
						className: "w-5 h-5 rounded-full flex items-center justify-center text-[0.55rem] font-bold text-white shrink-0",
						style: { backgroundColor: n },
						children: r
					}),
					/* @__PURE__ */ L("span", {
						className: "text-text-primary",
						children: o
					}),
					a && /* @__PURE__ */ L("span", {
						className: "text-text-tertiary",
						children: "(you)"
					}),
					i && /* @__PURE__ */ L("span", {
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
var Et = "min-w-0 truncate", Q = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function $({ leading: t, title: n, timestamp: r, timestampIso: i, timestampTitle: a, meta: o, metaTone: s, actions: c, onJump: l, jumpLabel: u, unread: d, className: f, "data-testid": m, ...h }) {
	let g = r ? i ? /* @__PURE__ */ L("time", {
		dateTime: i,
		title: a,
		className: Q,
		children: r
	}) : /* @__PURE__ */ L("span", {
		title: a,
		className: Q,
		children: r
	}) : null, _ = /* @__PURE__ */ R("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ R("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ L("span", {
				"data-line": "primary",
				title: n,
				className: e(Et, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: n
			}), g]
		}), /* @__PURE__ */ L("span", {
			"data-line": "secondary",
			title: o,
			className: e(Et, "text-[11px] leading-snug", s ? p[s] : "text-text-tertiary"),
			children: o
		})]
	});
	return /* @__PURE__ */ R("li", {
		...h,
		"data-testid": m,
		"data-unread": d ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", f),
		children: [
			/* @__PURE__ */ R("span", {
				className: "relative shrink-0",
				children: [t, d && /* @__PURE__ */ L("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			l ? /* @__PURE__ */ L("button", {
				type: "button",
				onClick: l,
				"aria-label": u,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ L("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			c && /* @__PURE__ */ L("span", {
				className: "flex shrink-0 items-center gap-1",
				children: c
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function Dt(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function Ot({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ L("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ L("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function kt({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ L(Ot, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ L(g, {
			icon: /* @__PURE__ */ L(d, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => /* @__PURE__ */ L($, {
			"data-testid": "pinned-message",
			leading: /* @__PURE__ */ L(w, {
				name: e.author,
				size: 28
			}),
			title: e.preview,
			meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
			timestamp: Dt(e.pinnedAt),
			timestampIso: e.pinnedAt,
			timestampTitle: e.pinnedAt ? U(e.pinnedAt) : void 0,
			onJump: t ? () => t(e.messageId) : void 0,
			jumpLabel: `Go to the pinned message from ${e.author}`,
			actions: n && /* @__PURE__ */ L("button", {
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
function At({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ L(Ot, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ L(g, {
			icon: /* @__PURE__ */ L(f, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => {
			let r = t?.(e.attachment) ?? e.attachment.preview, i = Ke(e.attachment);
			return /* @__PURE__ */ L($, {
				"data-testid": "channel-file",
				leading: i && r ? /* @__PURE__ */ L("img", {
					src: r,
					alt: "",
					className: "h-8 w-8 rounded object-cover"
				}) : /* @__PURE__ */ L("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ L(a, {})
				}),
				title: e.attachment.name,
				meta: [e.author, A(e.attachment.size)].filter(Boolean).join(" · "),
				timestamp: Dt(e.sentAt),
				timestampIso: e.sentAt,
				timestampTitle: e.sentAt ? U(e.sentAt) : void 0,
				onJump: n ? () => n(e.messageId) : void 0,
				jumpLabel: `Go to the message with ${e.attachment.name}`
			}, `${e.messageId}:${e.attachment.id}`);
		})
	});
}
function jt({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ L(Ot, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ L(g, {
			icon: "@",
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ L($, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ L(w, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: Dt(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? U(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function Mt(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function Nt(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function Pt({ recordings: e, onOpen: t, className: n, "data-testid": i = "channel-recordings-panel" }) {
	return /* @__PURE__ */ L(Ot, {
		empty: e.length === 0,
		className: n,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ L(g, {
			icon: /* @__PURE__ */ L(r, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ L($, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ L("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ L("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ L(r, {})
				}),
				title: [Dt(e.startedAt), Mt(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : Nt(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function Ft({ documents: t, onOpen: n, onCreate: r, className: i, "data-testid": o = "channel-documents-panel" }) {
	let s = r && /* @__PURE__ */ R("button", {
		type: "button",
		onClick: r,
		"data-testid": "channel-documents-create",
		className: "mb-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-medium text-primary hover:bg-surface-hover",
		children: [/* @__PURE__ */ L("span", {
			"aria-hidden": !0,
			className: "grid h-7 w-7 place-items-center rounded bg-surface-inset",
			children: "+"
		}), "New document in this conversation"]
	});
	return /* @__PURE__ */ R("div", {
		className: e("min-h-0 overflow-y-auto p-2", i),
		"data-testid": o,
		children: [s, t.length === 0 ? /* @__PURE__ */ L(g, {
			icon: /* @__PURE__ */ L(a, { size: 40 }),
			title: "No documents yet",
			description: "Documents written in this conversation stay with it."
		}) : /* @__PURE__ */ L("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t.map((e) => /* @__PURE__ */ L($, {
				"data-testid": "channel-document",
				leading: /* @__PURE__ */ L("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.icon || /* @__PURE__ */ L(a, {})
				}),
				title: e.title || "Untitled",
				meta: [e.createdBy, e.activeEditors ? `${e.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: Dt(e.updatedAt),
				timestampIso: e.updatedAt,
				timestampTitle: e.updatedAt ? U(e.updatedAt) : void 0,
				onJump: n ? () => n(e.documentId) : void 0,
				jumpLabel: `Open ${e.title || "this document"}`
			}, e.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var It = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], Lt = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function Rt({ name: t, description: a, online: o, avatarUrl: s, features: c = It, children: l, canvas: u, members: d, memberCount: f, files: p = [], thumbnailSrc: m, documents: h = [], onOpenDocument: g, onCreateDocument: _, pins: y = [], onUnpin: x, mentions: S = [], onOpenMention: C, recordings: w = [], onOpenRecording: T, onJumpToMessage: E, onStartCall: D, callModeFixed: O = !1, onWatch: k, watchLabel: A, watchHint: j, watchViewerCount: M, callInProgress: N = !1, headerActions: P, view: z, onViewChange: B, className: ee, "data-testid": V = "conversation-surface" }) {
	let H = new Set(c), [te, ne] = F("chat"), U = z ?? te, W = H.has(U) ? U : c[0] ?? "chat", G = (e) => {
		z === void 0 && ne(e), B?.(e);
	}, K = (e) => e || void 0, re = c.filter((e) => Lt[e]).map((e) => ({
		id: e,
		label: Lt[e],
		badge: e === "files" ? K(p.length) : e === "documents" ? K(h.length) : e === "pins" ? K(y.length) : e === "members" ? f == null ? void 0 : K(f) : e === "calls" ? K(w.length) : e === "mentions" ? K(S.filter((e) => e.unread).length) : void 0
	})), ie = (e) => {
		G("chat"), E?.(e);
	};
	return /* @__PURE__ */ R("section", {
		className: e("flex min-w-0 flex-col", ee),
		"data-testid": V,
		children: [
			/* @__PURE__ */ L(b, {
				name: t,
				description: a,
				online: o,
				avatarUrl: s,
				"data-testid": `${V}-header`,
				tabs: re.length > 1 ? /* @__PURE__ */ L(v, {
					variant: "underline",
					size: "sm",
					"aria-label": "Views of this conversation",
					value: W,
					onValueChange: (e) => G(e),
					items: re
				}) : void 0,
				actions: D || k || P ? /* @__PURE__ */ R(I, { children: [
					D && (O ? /* @__PURE__ */ L(n, {
						"aria-label": N ? "Join the call" : "Start a call",
						title: N ? "Join the call" : "Start a call",
						"data-testid": `${V}-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ L(i, { size: 16 })
					}) : /* @__PURE__ */ R(I, { children: [/* @__PURE__ */ L(n, {
						"aria-label": N ? "Join the call with audio" : "Start an audio call",
						title: N ? "Join with audio" : "Audio call",
						"data-testid": `${V}-audio-call`,
						onClick: () => D(!0),
						children: /* @__PURE__ */ L(i, { size: 16 })
					}), /* @__PURE__ */ L(n, {
						"aria-label": N ? "Join the call with video" : "Start a video call",
						title: N ? "Join with video" : "Video call",
						"data-testid": `${V}-video-call`,
						variant: N ? "primary" : "ghost",
						onClick: () => D(!1),
						children: /* @__PURE__ */ L(r, { size: 16 })
					})] })),
					k && /* @__PURE__ */ L(zt, {
						testId: `${V}-watch`,
						label: A,
						hint: j,
						viewerCount: M,
						onClick: k
					}),
					P
				] }) : void 0
			}),
			H.has("files") && W === "files" && /* @__PURE__ */ L(At, {
				className: "min-h-0 flex-1",
				files: p,
				thumbnailSrc: m,
				onJump: E ? ie : void 0
			}),
			H.has("documents") && W === "documents" && /* @__PURE__ */ L(Ft, {
				className: "min-h-0 flex-1",
				documents: h,
				onOpen: g,
				onCreate: _
			}),
			H.has("pins") && W === "pins" && /* @__PURE__ */ L(kt, {
				className: "min-h-0 flex-1",
				pins: y,
				onUnpin: x,
				onJump: E ? ie : void 0
			}),
			H.has("members") && W === "members" && /* @__PURE__ */ L("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${V}-members`,
				children: d
			}),
			H.has("mentions") && W === "mentions" && /* @__PURE__ */ L(jt, {
				className: "min-h-0 flex-1",
				mentions: S,
				onJump: C ? (e, t) => {
					G("chat"), C(e, t);
				} : void 0
			}),
			H.has("calls") && W === "calls" && /* @__PURE__ */ L(Pt, {
				className: "min-h-0 flex-1",
				recordings: w,
				onOpen: T
			}),
			H.has("chat") && /* @__PURE__ */ R("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${V}-chat`,
				hidden: W !== "chat",
				children: [u && /* @__PURE__ */ L("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${V}-canvas`,
					children: u
				}), /* @__PURE__ */ L("div", {
					className: "min-h-0 flex-1",
					children: l
				})]
			})
		]
	});
}
function zt({ testId: e, label: n, hint: r, viewerCount: i, onClick: a }) {
	let o = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ R(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: a,
		title: r ?? Bt,
		"aria-label": c ? `${o} — ${i} watching` : o,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ L(s, { size: 14 }),
			/* @__PURE__ */ L("span", { children: o }),
			c && /* @__PURE__ */ L("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var Bt = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { B as $, Pe as A, he as B, Ue as C, Re as D, ze as E, we as F, ce as G, fe as H, Ce as I, V as J, G as K, Se as L, Ie as M, Me as N, Le as O, ke as P, H as Q, be as R, Ge as S, Ve as T, de as U, pe as V, le as W, ne as X, te as Y, U as Z, rt as _, jt as a, Ye as b, Mt as c, St as d, ee as et, it as f, at as g, ot as h, At as i, Fe as j, Ne as k, $ as l, tt as m, Rt as n, Pt as o, et as p, W as q, Ft as r, kt as s, It as t, Tt as u, Ze as v, He as w, Ke as x, qe as y, ve as z };
