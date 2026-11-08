import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { f as n } from "./Chip-BlpTnjWu.js";
import { t as r } from "./IconButton-Bf5Wy0tS.js";
import { Dt as i, E as a, S as o, Tt as s, X as c, et as l, i as u, it as d, tt as f } from "./Icons-CqVFbuiZ.js";
import { t as p } from "./EmptyState-pOG782nO.js";
import { $ as m, Q as h, X as g, h as _, tt as ee } from "./ChatPanel-PbdaVeEr.js";
import { n as te } from "./Tabs-DyFKFsp9.js";
import { n as v } from "./Avatar-T3d5ukiz.js";
import { a as ne, d as y, i as b } from "./railType-AsIPWdQ5.js";
import { t as x } from "./formatBytes-05ivRSJY.js";
import { useState as re } from "react";
import { Fragment as S, jsx as C, jsxs as w } from "react/jsx-runtime";
//#region src/components/social/RailSectionHeader.tsx
function T({ label: t, actions: n = [], presentational: r = !0, collapsed: i = !1, onToggleCollapse: a, controls: o, toggleId: s, collapsedCount: c = 0, count: l, dark: u = !1, className: f, "data-testid": p = "rail-section-header" }) {
	let m = a !== void 0, h = e("min-w-0 flex-1 truncate", b, u ? "text-white/40" : ne);
	return /* @__PURE__ */ w("div", {
		"data-testid": p,
		className: e("flex items-center gap-1 px-2 pb-1 pt-3", f),
		children: [
			m ? /* @__PURE__ */ w("button", {
				"data-ui-part": "",
				type: "button",
				id: s,
				"aria-expanded": !i,
				"aria-controls": o,
				onClick: () => a(!i),
				"data-testid": `${p}-toggle`,
				className: e("flex min-w-0 flex-1 cursor-pointer items-center gap-1 rounded border-none bg-transparent p-0 text-left", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "hover:text-white" : "hover:text-text-primary"),
				children: [
					/* @__PURE__ */ C(y, {
						open: !i,
						className: u ? "text-white/40" : "text-text-secondary"
					}),
					/* @__PURE__ */ C("span", {
						className: h,
						children: t
					}),
					i && c > 0 && /* @__PURE__ */ w(S, { children: [" ", /* @__PURE__ */ C("span", {
						"aria-label": `${c} unread`,
						"data-testid": `${p}-collapsed-count`,
						className: e("grid h-4 min-w-4 shrink-0 place-items-center rounded-full px-1 text-[10px] font-semibold leading-none", u ? "bg-white/15 text-white" : "bg-primary text-on-primary"),
						children: c > 99 ? "99+" : c
					})] })
				]
			}) : /* @__PURE__ */ C("span", {
				"aria-hidden": r || void 0,
				className: h,
				children: t
			}),
			typeof l == "number" && /* @__PURE__ */ C("span", {
				"aria-label": `${l} items`,
				"data-testid": `${p}-count`,
				"data-shape": "plain",
				className: e("shrink-0 pr-1", "text-[12px] font-medium leading-4 normal-case tracking-normal tabular-nums text-text-tertiary", u && "text-white/60"),
				children: l
			}),
			n.map((t) => /* @__PURE__ */ C("button", {
				"data-ui-part": "",
				type: "button",
				title: t.label,
				"aria-label": t.label,
				onClick: (e) => {
					i && a?.(!1), t.onClick(e.currentTarget);
				},
				"data-testid": t["data-testid"],
				className: e("grid h-5 w-5 shrink-0 cursor-pointer place-items-center rounded border-none bg-transparent p-0", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", u ? "text-white/50 hover:bg-white/10 hover:text-white" : "text-text-tertiary hover:bg-surface-hover hover:text-text-primary"),
				children: t.icon ?? /* @__PURE__ */ C(d, { size: 13 })
			}, t.label))
		]
	});
}
//#endregion
//#region src/components/social/presenceIdentity.ts
function E(e, t, n) {
	return e || t || n || "";
}
//#endregion
//#region src/components/social/PresencePanel.tsx
function D({ users: e, currentClientId: t }) {
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
			let n = h(E(e.metadata.userId ?? e.metadata.email, e.metadata.displayName, e.clientId)), r = m(e.metadata.displayName ?? e.clientId.slice(0, 2)), i = e.metadata.isTyping === !0, a = e.clientId === t, o = e.metadata.displayName ?? (e.clientId.length > 12 ? e.clientId.slice(0, 12) + "..." : e.clientId);
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
//#region src/components/social/FeedRow.tsx
var O = "min-w-0 truncate", k = "shrink-0 text-[11px] tabular-nums text-text-tertiary";
function A({ leading: t, title: r, timestamp: i, timestampIso: a, timestampTitle: o, meta: s, metaTone: c, actions: l, onJump: u, jumpLabel: d, unread: f, className: p, "data-testid": m, ...h }) {
	let g = i ? a ? /* @__PURE__ */ C("time", {
		dateTime: a,
		title: o,
		className: k,
		children: i
	}) : /* @__PURE__ */ C("span", {
		title: o,
		className: k,
		children: i
	}) : null, _ = /* @__PURE__ */ w("span", {
		className: "flex min-w-0 flex-1 flex-col gap-0.5 text-left",
		children: [/* @__PURE__ */ w("span", {
			className: "flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ C("span", {
				"data-line": "primary",
				title: r,
				className: e(O, "flex-1 text-[13px] font-medium leading-snug text-text-primary"),
				children: r
			}), g]
		}), /* @__PURE__ */ C("span", {
			"data-line": "secondary",
			title: s,
			className: e(O, "text-[11px] leading-snug", c ? n[c] : "text-text-tertiary"),
			children: s
		})]
	});
	return /* @__PURE__ */ w("li", {
		...h,
		"data-testid": m,
		"data-unread": f ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-md px-2 py-1.5 hover:bg-surface-hover", p),
		children: [
			/* @__PURE__ */ w("span", {
				className: "relative shrink-0",
				children: [t, f && /* @__PURE__ */ C("span", {
					"aria-label": "Unread",
					className: "absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary"
				})]
			}),
			u ? /* @__PURE__ */ C("button", {
				"data-ui-part": "",
				type: "button",
				onClick: u,
				"aria-label": d,
				"data-testid": m ? `${m}-jump` : void 0,
				className: "flex min-w-0 flex-1 items-center gap-3 bg-transparent p-0 text-left",
				children: _
			}) : /* @__PURE__ */ C("span", {
				className: "flex min-w-0 flex-1 items-center gap-3",
				children: _
			}),
			l && /* @__PURE__ */ C("span", {
				className: "flex shrink-0 items-center gap-1",
				children: l
			})
		]
	});
}
//#endregion
//#region src/components/social/ChannelViews.tsx
function j(e) {
	if (!e) return "";
	let t = new Date(e);
	if (Number.isNaN(t.getTime())) return "";
	let n = /* @__PURE__ */ new Date(), r = t.toDateString() === n.toDateString(), i = `${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}`;
	return r ? i : `${t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	})} ${i}`;
}
function M({ children: t, empty: n, className: r, "data-testid": i }) {
	return /* @__PURE__ */ C("div", {
		className: e("min-h-0 overflow-y-auto p-2", r),
		"data-testid": i,
		children: n ? t : /* @__PURE__ */ C("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: t
		})
	});
}
function N({ pins: e, onJump: t, onUnpin: n, className: r, "data-testid": i = "pinned-messages-panel" }) {
	return /* @__PURE__ */ C(M, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ C(p, {
			icon: /* @__PURE__ */ C(f, { size: 40 }),
			title: "Nothing pinned yet",
			description: "Pin a message to keep it at the top of this channel for everyone."
		}) : e.map((e) => {
			let r = e.sentAt ?? e.pinnedAt, i = r ? e.sentAt && e.pinnedAt && e.pinnedAt !== e.sentAt ? `Sent ${g(e.sentAt)} · pinned ${g(e.pinnedAt)}` : g(r) : void 0;
			return /* @__PURE__ */ C(A, {
				"data-testid": "pinned-message",
				leading: /* @__PURE__ */ C(v, {
					name: e.author,
					size: 28
				}),
				title: e.preview,
				meta: [e.author, e.pinnedBy && `pinned by ${e.pinnedBy}`].filter(Boolean).join(" · "),
				timestamp: j(r),
				timestampIso: r,
				timestampTitle: i,
				onJump: t ? () => t(e.messageId) : void 0,
				jumpLabel: `Go to the pinned message from ${e.author}`,
				actions: n && /* @__PURE__ */ C("button", {
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
function P({ file: e, thumbnailSrc: t, onJump: n }) {
	let r = t?.(e.attachment) ?? e.attachment.preview, i = _(e.attachment);
	return /* @__PURE__ */ C(A, {
		"data-testid": "channel-file",
		"data-kind": "file",
		leading: i && r ? /* @__PURE__ */ C("img", {
			src: r,
			alt: "",
			className: "h-8 w-8 rounded object-cover"
		}) : /* @__PURE__ */ C("span", {
			"aria-hidden": !0,
			className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-text-tertiary",
			children: /* @__PURE__ */ C(c, {})
		}),
		title: e.attachment.name,
		meta: [e.author, x(e.attachment.size)].filter(Boolean).join(" · "),
		timestamp: j(e.sentAt),
		timestampIso: e.sentAt,
		timestampTitle: e.sentAt ? g(e.sentAt) : void 0,
		onJump: n ? () => n(e.messageId) : void 0,
		jumpLabel: `Go to the message with ${e.attachment.name}`
	});
}
function F({ files: e, thumbnailSrc: t, onJump: n, className: r, "data-testid": i = "channel-files-panel" }) {
	return /* @__PURE__ */ C(M, {
		empty: e.length === 0,
		className: r,
		"data-testid": i,
		children: e.length === 0 ? /* @__PURE__ */ C(p, {
			icon: /* @__PURE__ */ C(c, { size: 40 }),
			title: "No files here yet",
			description: "Drag a file into the conversation and it will show up in this list."
		}) : e.map((e) => /* @__PURE__ */ C(P, {
			file: e,
			thumbnailSrc: t,
			onJump: n
		}, `${e.messageId}:${e.attachment.id}`))
	});
}
function ie({ mentions: e, onJump: t, className: n, "data-testid": r = "mentions-panel" }) {
	return /* @__PURE__ */ C(M, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ C(p, {
			icon: /* @__PURE__ */ C(u, { size: 40 }),
			title: "No mentions",
			description: "When somebody @-mentions you, it lands here."
		}) : e.map((e) => /* @__PURE__ */ C(A, {
			"data-testid": "mention",
			unread: e.unread,
			leading: /* @__PURE__ */ C(v, {
				name: e.author,
				size: 28
			}),
			title: e.excerpt,
			meta: [e.author, e.channelLabel ?? e.channel].filter(Boolean).join(" · "),
			timestamp: j(e.at),
			timestampIso: e.at,
			timestampTitle: e.at ? g(e.at) : void 0,
			onJump: t ? () => t(e.channel, e.messageId) : void 0,
			jumpLabel: `Go to the mention from ${e.author}`
		}, `${e.channel}:${e.messageId}`))
	});
}
function I(e) {
	if (!e || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = (e) => String(e).padStart(2, "0");
	return n > 0 ? `${n}:${a(r)}:${a(i)}` : `${r}:${a(i)}`;
}
function ae(e) {
	let t = (e.participants ?? []).map((e) => e.displayName).filter(Boolean);
	if (t.length > 0) return t.length <= 3 ? t.join(", ") : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
	let n = e.participantCount ?? 0;
	return n > 0 ? `${n} ${n === 1 ? "person" : "people"}` : "";
}
function L({ recordings: e, onOpen: t, className: n, "data-testid": r = "channel-recordings-panel" }) {
	return /* @__PURE__ */ C(M, {
		empty: e.length === 0,
		className: n,
		"data-testid": r,
		children: e.length === 0 ? /* @__PURE__ */ C(p, {
			icon: /* @__PURE__ */ C(s, { size: 40 }),
			title: "No recorded calls",
			description: "Calls recorded in this conversation show up here."
		}) : e.map((e) => {
			let n = e.playable === !1;
			return /* @__PURE__ */ C(A, {
				"data-testid": "channel-recording",
				leading: e.thumbnailUrl ? /* @__PURE__ */ C("img", {
					src: e.thumbnailUrl,
					alt: "",
					className: "h-8 w-12 rounded object-cover"
				}) : /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-12 place-items-center rounded bg-surface-inset text-text-tertiary",
					children: /* @__PURE__ */ C(s, {})
				}),
				title: [j(e.startedAt), I(e.durationMs)].filter(Boolean).join(" · ") || "Recording",
				meta: n ? "Still being assembled" : ae(e),
				onJump: t && !n ? () => t(e.recordingId) : void 0,
				jumpLabel: "Play this recording"
			}, e.recordingId);
		})
	});
}
function R(e, t) {
	let n = e ? Date.parse(e) : NaN, r = t ? Date.parse(t) : NaN;
	return Number.isNaN(n) && Number.isNaN(r) ? 0 : Number.isNaN(n) ? 1 : Number.isNaN(r) ? -1 : r - n;
}
function z({ documents: t, onOpen: n, onCreate: r, onCreateWhiteboard: a, files: s, thumbnailSrc: c, onJumpToFile: l, className: u, "data-testid": d = "channel-documents-panel" }) {
	let f = (t, n, r, i, a = !1) => /* @__PURE__ */ w("button", {
		"data-ui-part": "",
		type: "button",
		onClick: n,
		"data-testid": `channel-documents-${t}`,
		className: e("flex items-center gap-2 rounded-md text-[13px] font-medium text-primary hover:bg-surface-hover", a ? "justify-center border border-border px-3 py-2" : "w-full px-2 py-1.5 text-left"),
		children: [/* @__PURE__ */ C("span", {
			"aria-hidden": !0,
			className: e("grid place-items-center rounded", a ? "h-5 w-5" : "h-7 w-7 bg-surface-inset"),
			children: r
		}), i]
	}, t), m = (e) => [r && f("create", r, /* @__PURE__ */ C("span", {
		"aria-hidden": !0,
		children: "+"
	}), "New document", e), a && f("create-whiteboard", a, /* @__PURE__ */ C(i, { size: 15 }), "New whiteboard", e)].filter(Boolean), h = !!(r || a), _ = s ? [...t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	})), ...s.map((e) => ({
		kind: "file",
		file: e,
		at: e.sentAt
	}))].sort((e, t) => R(e.at, t.at)) : t.map((e) => ({
		kind: "document",
		doc: e,
		at: e.updatedAt
	}));
	return /* @__PURE__ */ w("div", {
		className: e("min-h-0 overflow-y-auto p-2", u),
		"data-testid": d,
		children: [h && _.length > 0 && /* @__PURE__ */ w("div", {
			className: "mb-1 flex flex-col",
			children: [r && f("create", r, /* @__PURE__ */ C("span", {
				"aria-hidden": !0,
				children: "+"
			}), "New document in this conversation"), a && f("create-whiteboard", a, /* @__PURE__ */ C(i, { size: 15 }), "New whiteboard in this conversation")]
		}), _.length === 0 ? /* @__PURE__ */ C(p, {
			icon: /* @__PURE__ */ C(o, { size: 40 }),
			title: s ? "Nothing here yet" : "No documents yet",
			description: s ? "Documents, whiteboards and files shared here stay with this conversation." : "Documents and whiteboards started here stay with this conversation.",
			action: h ? /* @__PURE__ */ C("div", {
				className: "flex flex-wrap justify-center gap-2",
				children: m(!0)
			}) : void 0
		}) : /* @__PURE__ */ C("ul", {
			className: "m-0 flex list-none flex-col gap-0.5 p-0",
			children: _.map((e) => e.kind === "file" ? /* @__PURE__ */ C(P, {
				file: e.file,
				thumbnailSrc: c,
				onJump: l
			}, `file:${e.file.messageId}:${e.file.attachment.id}`) : /* @__PURE__ */ C(A, {
				"data-testid": "channel-document",
				"data-kind": "document",
				leading: /* @__PURE__ */ C("span", {
					"aria-hidden": !0,
					className: "grid h-8 w-8 place-items-center rounded bg-surface-inset text-sm text-text-tertiary",
					children: e.doc.icon || /* @__PURE__ */ C(o, {})
				}),
				title: e.doc.title || "Untitled",
				meta: [e.doc.createdBy, e.doc.activeEditors ? `${e.doc.activeEditors} editing` : ""].filter(Boolean).join(" · "),
				timestamp: j(e.doc.updatedAt),
				timestampIso: e.doc.updatedAt,
				timestampTitle: e.doc.updatedAt ? g(e.doc.updatedAt) : void 0,
				onJump: n ? () => n(e.doc.documentId) : void 0,
				jumpLabel: `Open ${e.doc.title || "this document"}`
			}, e.doc.documentId))
		})]
	});
}
//#endregion
//#region src/components/social/ConversationSurface.tsx
var B = [
	"chat",
	"files",
	"documents",
	"pins",
	"members",
	"mentions",
	"calls"
], V = {
	chat: "Chat",
	files: "Files",
	documents: "Documents",
	pins: "Pinned",
	members: "Members",
	mentions: "Mentions",
	calls: "Calls"
};
function H({ name: t, headingLevel: n, description: i, online: a, avatarUrl: o, features: c = B, children: u, canvas: d, members: f, memberCount: p, files: m = [], thumbnailSrc: h, documents: g = [], onOpenDocument: _, onRename: v, onCreateDocument: ne, onCreateWhiteboard: y, pins: b = [], onUnpin: x, mentions: T = [], onOpenMention: E, recordings: D = [], onOpenRecording: O, onJumpToMessage: k, onStartCall: A, callModeFixed: j = !1, onWatch: M, watchLabel: P, watchHint: I, watchViewerCount: ae, callInProgress: R = !1, headerActions: H, headerClassName: U, view: W, onViewChange: se, className: ce, "data-testid": G = "conversation-surface" }) {
	let K = new Set(c), q = K.has("files") && K.has("documents"), [le, ue] = re("chat"), J = W ?? le, Y = q && J === "files" ? "documents" : J, X = K.has(Y) ? Y : c[0] ?? "chat", Z = (e) => {
		W === void 0 && ue(e), se?.(e);
	}, Q = (e) => e || void 0, de = c.filter((e) => V[e] && !(q && e === "files")).map((e) => ({
		id: e,
		label: V[e],
		badge: e === "files" ? Q(m.length) : e === "documents" ? Q(g.length + (q ? m.length : 0)) : e === "pins" ? Q(b.length) : e === "members" ? p == null ? void 0 : Q(p) : e === "calls" ? Q(D.length) : e === "mentions" ? Q(T.filter((e) => e.unread).length) : void 0
	})), $ = (e) => {
		Z("chat"), k?.(e);
	};
	return /* @__PURE__ */ w("section", {
		"data-ui-part": "",
		className: e("flex min-w-0 flex-col", ce),
		"data-testid": G,
		children: [
			/* @__PURE__ */ C(ee, {
				headingLevel: n,
				className: U,
				name: t,
				onRename: v,
				description: i,
				online: a,
				avatarUrl: o,
				"data-testid": `${G}-header`,
				tabs: de.length > 1 ? /* @__PURE__ */ C(te, {
					variant: "underline",
					size: "md",
					"aria-label": "Views of this conversation",
					getItemTestId: (e) => `${G}-tab-${e.id}`,
					value: X,
					onValueChange: (e) => Z(e),
					items: de
				}) : void 0,
				actions: A || M || H ? /* @__PURE__ */ w(S, { children: [
					A && (j ? /* @__PURE__ */ C(r, {
						"aria-label": R ? "Join the call" : "Start a call",
						title: R ? "Join the call" : "Start a call",
						"data-testid": `${G}-call`,
						variant: R ? "primary" : "ghost",
						onClick: () => A(!1),
						children: /* @__PURE__ */ C(l, { size: 16 })
					}) : /* @__PURE__ */ w(S, { children: [/* @__PURE__ */ C(r, {
						"aria-label": R ? "Join the call with audio" : "Start an audio call",
						title: R ? "Join with audio" : "Audio call",
						"data-testid": `${G}-audio-call`,
						onClick: () => A(!0),
						children: /* @__PURE__ */ C(l, { size: 16 })
					}), /* @__PURE__ */ C(r, {
						"aria-label": R ? "Join the call with video" : "Start a video call",
						title: R ? "Join with video" : "Video call",
						"data-testid": `${G}-video-call`,
						variant: R ? "primary" : "ghost",
						onClick: () => A(!1),
						children: /* @__PURE__ */ C(s, { size: 16 })
					})] })),
					M && /* @__PURE__ */ C(oe, {
						testId: `${G}-watch`,
						label: P,
						hint: I,
						viewerCount: ae,
						onClick: M
					}),
					H
				] }) : void 0
			}),
			K.has("files") && X === "files" && /* @__PURE__ */ C(F, {
				className: "min-h-0 flex-1",
				files: m,
				thumbnailSrc: h,
				onJump: k ? $ : void 0
			}),
			K.has("documents") && X === "documents" && /* @__PURE__ */ C(z, {
				className: "min-h-0 flex-1",
				documents: g,
				onOpen: _,
				onCreate: ne,
				onCreateWhiteboard: y,
				...q ? {
					files: m,
					thumbnailSrc: h,
					onJumpToFile: k ? $ : void 0
				} : {}
			}),
			K.has("pins") && X === "pins" && /* @__PURE__ */ C(N, {
				className: "min-h-0 flex-1",
				pins: b,
				onUnpin: x,
				onJump: k ? $ : void 0
			}),
			K.has("members") && X === "members" && /* @__PURE__ */ C("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${G}-members`,
				children: f
			}),
			K.has("mentions") && X === "mentions" && /* @__PURE__ */ C(ie, {
				className: "min-h-0 flex-1",
				mentions: T,
				onJump: E ? (e, t) => {
					Z("chat"), E(e, t);
				} : void 0
			}),
			K.has("calls") && X === "calls" && /* @__PURE__ */ C(L, {
				className: "min-h-0 flex-1",
				recordings: D,
				onOpen: O
			}),
			K.has("chat") && /* @__PURE__ */ w("div", {
				className: "flex min-h-0 flex-1 flex-col",
				"data-testid": `${G}-chat`,
				hidden: X !== "chat",
				children: [d && /* @__PURE__ */ C("div", {
					className: "shrink-0 px-3 pt-3",
					"data-testid": `${G}-canvas`,
					children: d
				}), /* @__PURE__ */ C("div", {
					className: "min-h-0 flex-1",
					children: u
				})]
			})
		]
	});
}
function oe({ testId: e, label: n, hint: r, viewerCount: i, onClick: o }) {
	let s = n ?? "Watch", c = typeof i == "number" && Number.isFinite(i) && i >= 0;
	return /* @__PURE__ */ w(t, {
		variant: "secondary",
		size: "sm",
		"data-testid": e,
		onClick: o,
		title: r ?? U,
		"aria-label": c ? `${s} — ${i} watching` : s,
		className: "inline-flex h-8 items-center gap-1.5",
		children: [
			/* @__PURE__ */ C(a, { size: 14 }),
			/* @__PURE__ */ C("span", { children: s }),
			c && /* @__PURE__ */ C("span", {
				"data-testid": `${e}-count`,
				"aria-hidden": !0,
				className: "rounded-full bg-surface-hover px-1.5 text-[11px] font-medium text-text-secondary",
				children: i
			})
		]
	});
}
var U = "Watch without joining — near-realtime, scales to any audience, and you are not on camera.";
//#endregion
export { ie as a, I as c, T as d, F as i, A as l, H as n, L as o, z as r, N as s, B as t, D as u };
