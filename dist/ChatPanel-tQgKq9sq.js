import { f as e, n as t } from "./Button-DwPf_9pb.js";
import { t as n } from "./Chip-DVGdTxaN.js";
import { n as r } from "./safeHref-dF2rw8EK.js";
import { t as i } from "./IconButton-BmDqeC-b.js";
import { A as a, B as o, Ct as s, S as c, Y as l, _t as u, ft as d, m as f, nt as p, w as m } from "./Icons-CNCMF52q.js";
import { g as h } from "./MediaIcons-_ai5Til2.js";
import { t as g } from "./ConfirmDialog-fETObVHH.js";
import { t as _ } from "./Input-B5h9UXBs.js";
import { t as v } from "./InlinePopover-C-Dtxban.js";
import { t as y } from "./DropdownMenu-Bu9IMVKk.js";
import { t as b } from "./StatusPill-DrTq5Ki4.js";
import { n as x } from "./Avatar-BWzSZ73h.js";
import { t as S } from "./VisuallyHidden-CVFiyXyk.js";
import { r as C, t as w } from "./AssistantMark-yMqczRQv.js";
import { t as T } from "./Textarea-MJCZpfkl.js";
import { t as E } from "./DotMeter-B7TMlYNN.js";
import { t as D } from "./StatusDot-BE5sqjcB.js";
import { t as O } from "./RovingToolbar-CaWm5s1M.js";
import { t as k } from "./ThinkingDots-CL7iPQV1.js";
import { t as ee } from "./PresenceAvatars-g_VszLJh.js";
import { i as A, n as j, r as M, t as N } from "./ReactionPickerPopover-DnsNc9Cx.js";
import { n as P } from "./useComputeProjects-ZSazDRet.js";
import { t as F } from "./QuoteBlock-nEnmOQxg.js";
import { t as I } from "./formatBytes-05ivRSJY.js";
import { Fragment as L, useEffect as R, useMemo as te, useRef as z, useState as B } from "react";
import { Fragment as V, jsx as H, jsxs as U } from "react/jsx-runtime";
//#region src/components/shared/TypingIndicator.tsx
function ne(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function re({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ U("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ H(k, { size: r }), !n && /* @__PURE__ */ H("span", { children: ne(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function ie({ name: t, onRename: n, memberCount: r, description: i, tabs: a, actions: o, avatarUrl: s, online: c, onMembersClick: l, size: u = "md", headingLevel: d = 2, as: f = "div", className: p, "data-testid": m }) {
	let h = u === "sm", g = f, _ = d === 1 ? "h1" : "h2", [v, y] = B(!1), [b, S] = B(t), C = z(null);
	R(() => {
		v || S(t);
	}, [t, v]), R(() => {
		v && (C.current?.focus(), C.current?.select());
	}, [v]);
	let w = () => {
		let e = b.trim();
		if (y(!1), !e || e === t) {
			S(t);
			return;
		}
		n?.(e);
	}, T = () => {
		S(t), y(!1);
	};
	return /* @__PURE__ */ U(g, {
		"data-testid": m,
		"data-size": u,
		className: e("@container flex items-center justify-between", h ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", p),
		children: [
			/* @__PURE__ */ U("div", {
				className: e("flex min-w-0 max-w-full items-center", h ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ U("div", {
					className: "relative shrink-0",
					children: [s ? /* @__PURE__ */ H("img", {
						src: s,
						alt: t,
						className: h ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ H(x, {
						name: t,
						size: h ? 28 : 36
					}), c !== void 0 && /* @__PURE__ */ H("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ H(D, {
							color: c ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": c ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ U("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ U("div", {
						className: "flex items-baseline gap-2",
						children: [v ? /* @__PURE__ */ H("input", {
							"data-ui-part": "",
							ref: C,
							value: b,
							onChange: (e) => S(e.target.value.slice(0, 100)),
							maxLength: 100,
							"aria-label": "Conversation name",
							"data-testid": m ? `${m}-name-input` : "channel-header-name-input",
							onBlur: w,
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), w()) : e.key === "Escape" && (e.preventDefault(), T()), e.stopPropagation();
							},
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", "text-sm")
						}) : /* @__PURE__ */ H(_, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", d === 1 ? "text-xl" : "text-sm", n && "cursor-text"),
							onDoubleClick: n ? () => y(!0) : void 0,
							title: n ? "Double-click to rename" : void 0,
							"data-testid": m ? `${m}-name` : void 0,
							children: t
						}), r !== void 0 && (l ? /* @__PURE__ */ U("button", {
							"data-ui-part": "",
							type: "button",
							onClick: l,
							"data-testid": "channel-header-members",
							"aria-label": `${r} ${r === 1 ? "member" : "members"} — open the member list`,
							className: e("text-xs font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ U("span", {
							"data-testid": "channel-header-members",
							className: "text-xs font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}))]
					}), i && !h && /* @__PURE__ */ H("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: i
					})]
				})]
			}),
			a && /* @__PURE__ */ H("div", {
				className: e("flex max-w-full items-center justify-end overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full @max-3xl:justify-start", h ? "min-w-0 flex-1" : "flex-[1_0_auto]"),
				children: a
			}),
			o && /* @__PURE__ */ H("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var W = [
	"👍",
	"🎉",
	"❤️"
], ae = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function G({ actions: t = [], label: n = "Message actions", quickReactions: r = W, onReact: i, onOpenReactionPicker: c, onReply: l, onForward: f, onTogglePin: h, pinned: g = !1, onCopyLink: _, onEdit: v, onDelete: y, className: b, "data-testid": x = "message-actions" }) {
	let S = [], C = (e, t, n, r) => S.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (i) for (let e of r) C(`react-${e}`, `React ${e}`, /* @__PURE__ */ H("span", {
		"aria-hidden": !0,
		children: e
	}), () => i(e));
	c && C("more-reactions", "More reactions", /* @__PURE__ */ H(u, { size: 14 }), (e) => c(e.currentTarget)), l && C("reply", "Reply", /* @__PURE__ */ H(d, { size: 14 }), l), f && C("forward", "Forward to another conversation", /* @__PURE__ */ H(a, { size: 14 }), (e) => f(e.currentTarget)), h && C("pin", g ? "Unpin" : "Pin to channel", /* @__PURE__ */ H(p, { size: 14 }), h), _ && C("copy-link", "Copy link to message", /* @__PURE__ */ H(o, { size: 14 }), _), v && C("edit", "Edit message", /* @__PURE__ */ H(m, { size: 13 }), v), y && C("delete", "Delete message", /* @__PURE__ */ H(s, { size: 13 }), y);
	for (let e of t) S.push({
		key: e.id,
		label: e.label,
		glyph: e.icon,
		disabled: e.disabled,
		onClick: (t) => e.onClick(t.currentTarget)
	});
	return S.length === 0 ? null : /* @__PURE__ */ H(O, {
		label: n,
		variant: "action-bar",
		"data-testid": x,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", b),
		children: S.map((e) => /* @__PURE__ */ H("button", {
			"data-ui-part": "",
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${x}-${e.key}`,
			onClick: e.onClick,
			disabled: e.disabled,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${ae}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/utils/identity.ts
var oe = [
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
function se(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return oe[Math.abs(t) % oe.length];
}
function ce(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function le(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function ue(e, t) {
	let n = le(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = le(t);
	return r ? n !== r : !1;
}
function de(e, t = /* @__PURE__ */ new Date()) {
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
function fe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function pe(e) {
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
function me(e, t = /* @__PURE__ */ new Date()) {
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
function he(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function ge({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: s = !1, footer: c, actions: u, actionsLayout: d = "inline", tone: f = "light", editedAt: p, contentLayout: m = "inline", assistant: h = !1, avatar: g, className: _ }) {
	let y = f === "dark", b = he(r), [S, C] = B(!1), w = z(null), T = !o || !!b, E = !!u && (d === "menu" || !T);
	R(() => {
		E || C(!1);
	}, [E]);
	let D = /* @__PURE__ */ H("button", {
		"data-ui-part": "",
		ref: w,
		type: "button",
		"aria-label": "Message actions",
		"aria-expanded": S,
		"aria-haspopup": "dialog",
		onClick: () => C((e) => !e),
		"data-testid": "message-row-actions-toggle",
		className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary aria-expanded:opacity-100",
		children: /* @__PURE__ */ H(l, { size: 16 })
	});
	return /* @__PURE__ */ U("div", {
		"data-testid": "message-row",
		"data-mine": s ? "true" : "false",
		"data-voice": h ? "assistant" : void 0,
		className: e("flex items-start gap-2 py-1", s && "flex-row-reverse", _),
		children: [
			/* @__PURE__ */ H("div", {
				className: "w-5 shrink-0 mt-0.5",
				children: E && !T ? D : !a && (g ?? /* @__PURE__ */ H(x, {
					name: t,
					src: i,
					size: 20
				}))
			}),
			/* @__PURE__ */ U("div", {
				className: e("flex grow flex-col min-w-0", s && "items-end"),
				children: [
					T && /* @__PURE__ */ U("div", {
						"data-testid": "message-row-header",
						className: e(u && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", E && "flex-nowrap", u && s && "flex-row-reverse"),
						children: [T && /* @__PURE__ */ U("div", {
							className: e("flex items-baseline gap-2 min-w-0 max-w-full", u && (E ? "flex-1" : "shrink-0"), s && "flex-row-reverse"),
							children: [
								!o && /* @__PURE__ */ H("span", {
									"data-testid": "message-row-author",
									className: e("text-xs font-semibold truncate", y ? "text-white/70" : h ? "text-accent-fg" : "text-text-secondary"),
									children: t
								}),
								b && /* @__PURE__ */ H("time", {
									"data-testid": "message-row-time",
									dateTime: r,
									title: pe(r),
									className: e("text-xs shrink-0", y ? "text-white/40" : "text-text-tertiary"),
									children: b
								}),
								p && /* @__PURE__ */ H("span", {
									"data-testid": "message-row-edited",
									title: `Edited ${pe(p)}`,
									className: e("text-[11px] shrink-0", y ? "text-white/40" : "text-text-tertiary"),
									children: "(edited)"
								})
							]
						}), E ? D : u && /* @__PURE__ */ H("div", {
							"data-testid": "message-row-actions",
							className: "max-w-full shrink-0",
							children: u
						})]
					}),
					/* @__PURE__ */ H("span", {
						"data-testid": "message-row-content",
						className: e("text-sm min-w-0 break-words whitespace-pre-wrap", y ? "text-white/90" : "text-text-primary", s && m === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", s && m === "inline" && (y ? "bg-white/15" : "bg-primary-bg"), m === "block" && "w-full max-w-[30rem]"),
						children: n
					}),
					c && /* @__PURE__ */ H("div", {
						"data-testid": "message-row-footer",
						className: e("mt-1", s && "self-end"),
						children: c
					})
				]
			}),
			E && /* @__PURE__ */ H(v, {
				trigger: w,
				open: S,
				onClose: () => C(!1),
				placement: s ? "bottom-end" : "bottom-start",
				"aria-label": "Message actions",
				className: "min-w-0 max-w-[calc(100vw-16px)] p-0",
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var _e = /* @__PURE__ */ new Set([
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
]);
function ve(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let n = e, i = Array.from(n.childNodes).map((e, n) => ve(e, `${t}-${n}`));
	if (!_e.has(n.tagName)) return /* @__PURE__ */ H("span", { children: i }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ H("br", {}, t);
		case "A": {
			let e = r(n.getAttribute("href"));
			return e ? /* @__PURE__ */ H("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: i
			}, t) : /* @__PURE__ */ H("span", { children: i }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), r = !e && n.classList.contains("docref");
			return /* @__PURE__ */ H("span", {
				className: e ? "mention" : r ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": r ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: i
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ H(e, { children: i }, t);
		}
	}
}
var ye = /```([\s\S]*?)```|`([^`\n]+)`/g;
function be(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (ye.lastIndex = 0; (r = ye.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ H("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ H("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ H("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function xe({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = te(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ve(e, `n${t}`));
	}, [t]), o = te(() => be(n ?? ""), [n]);
	return /* @__PURE__ */ H("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function Se(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function Ce({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: l, "data-testid": u = "document-activity-card" }) {
	let d = !s && a.length > 0;
	return /* @__PURE__ */ U("div", {
		"data-testid": u,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", l),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ H(c, { size: 18 })
			}),
			/* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ H("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ H("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${u}-unavailable` : void 0,
					children: s ? Se(s) : d ? `${we(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${u}-editors`,
				children: /* @__PURE__ */ H(ee, {
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
			o && !s && /* @__PURE__ */ H("button", {
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
function we(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function Te({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let l = a ? void 0 : i, u = a ? Se(a) : null;
	return /* @__PURE__ */ U("button", {
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
			r ? /* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ H(c, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ H("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			u && /* @__PURE__ */ U("span", {
				className: "shrink-0",
				"data-testid": `${s}-unavailable`,
				children: ["· ", u]
			})
		]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function Ee(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function De(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function Oe(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function ke(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function Ae(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function je(e, t) {
	let n = Ae(e), [r, i] = B(() => Date.now());
	return R(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function Me(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Ne({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = je(o, _), y = !_ && typeof a == "number" ? Ee(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = Me(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = De(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : De(r, !1)), /* @__PURE__ */ U("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ U("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ U("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ H("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ H("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ H("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ U("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ H("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${ke(v)}`
							}),
							_ && /* @__PURE__ */ H("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ H("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ H("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: Oe(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ H(ee, {
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
			!_ && c && l && /* @__PURE__ */ H("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ H("button", {
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
var Pe = {
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
function Fe(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Ie(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Le(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Re({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ U("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ H(x, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ U("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ H("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ H("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function ze({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: x, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let O = o ?? a.length, k = u === "gone", A = u !== "saving" && u !== "failed" && !k && !!g, j = () => {
		g?.(n);
	}, M = c != null && c > 0 ? Ee(c) : "", N = Fe(s), P = Le(a, O), { state: F, label: I } = Pe[u], L = [
		...g && A ? [{
			"data-testid": `${D}-menu-open`,
			label: "Open",
			onSelect: j
		}] : [],
		...C && d ? [{
			"data-testid": `${D}-menu-transcript`,
			label: "Transcript",
			onSelect: () => C(n)
		}] : [],
		..._ && !k ? [{
			"data-testid": `${D}-menu-copy-link`,
			label: "Copy link",
			onSelect: () => _(n)
		}] : [],
		...v && !k ? [{
			"data-testid": `${D}-menu-share`,
			label: "Share…",
			description: "A link that works outside this conversation",
			onSelect: () => v(n)
		}] : [],
		...x && !k ? [{
			"data-testid": `${D}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => x(n)
		}] : [],
		...S && A ? [{
			"data-testid": `${D}-menu-download`,
			label: "Download",
			onSelect: () => S(n)
		}] : []
	], R = L.length ? [{
		items: L,
		"data-testid": `${D}-menu-items`
	}] : [];
	return /* @__PURE__ */ U("div", {
		"data-testid": D,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", E),
		children: [/* @__PURE__ */ U("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ U("button", {
				"data-ui-part": "",
				type: "button",
				onClick: A ? j : void 0,
				disabled: !A,
				"aria-label": A ? `Play ${r.toLowerCase()}` : `${r}: ${I.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", A ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ H("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ H(Re, {
						participants: a,
						total: O,
						testId: D
					}),
					A && /* @__PURE__ */ H("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ H("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ H("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ H("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					M && /* @__PURE__ */ H("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${D}-duration`,
						children: M
					})
				]
			}), /* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ U("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ H("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${D}-title`,
								children: r
							}), h && /* @__PURE__ */ H("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ H(p, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ U("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", i]
						}),
						O > 0 && /* @__PURE__ */ U("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ H(ee, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ H("span", {
								className: "truncate text-xs text-text-tertiary",
								children: P
							})]
						}),
						/* @__PURE__ */ U("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ H(b, {
									state: F,
									label: I,
									size: "sm",
									"data-testid": `${D}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ H(b, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${D}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ H(b, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${D}-summary`
								}),
								N && /* @__PURE__ */ H("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${D}-when`,
									children: N
								})
							]
						})
					]
				}), R.length > 0 && /* @__PURE__ */ H(y, {
					trigger: /* @__PURE__ */ H("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: R,
					"data-testid": `${D}-menu`
				})]
			})]
		}), m && u !== "failed" && !k && /* @__PURE__ */ U("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ U("span", { children: ["Set to expire ", Ie(m)] }), w && /* @__PURE__ */ H(t, {
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
function Be(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function K(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Ve(e, t) {
	let n = e.names && e.names.length > 0 ? Be(e.names) : e.userIds.length > 0 ? Be(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = K(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function He({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Ve(t, n);
	return /* @__PURE__ */ U("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ H("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ H("time", {
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
var q = {
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
		default: return q[e.phase]?.label ?? "Running…";
	}
}
function Ke(e) {
	let t = !!e && (q[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = B(() => Date.now());
	return R(() => {
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
], J = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Je = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Ye = 6;
function Xe(e) {
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
function Ze(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = Xe(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var Y = "shrink-0 whitespace-nowrap underline underline-offset-2", Qe = `${Y} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function X(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function $e(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function et(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${X(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${X(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${X(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${$e(e.index)}`;
		case "deleteBlock": return `Removed block ${$e(e.index)}`;
		case "appendMacro": return t ? `Added a ${X(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${$e(e.index)}`;
		case "setDocumentType": return `Type: ${X(t, 40)}`;
		case "skip": return t ? X(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${X(t)}` : e.op;
	}
}
function tt(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function nt(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function rt(e) {
	if (!e?.startedAt) return null;
	let t = tt(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? nt(e.startedAt, e.completedAt) : null;
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
function it({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = q[n.phase] ?? q.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ U("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ H("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: Ge(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ H("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: We(r)
			}),
			c > 0 && /* @__PURE__ */ U("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ U("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						P(l),
						" / ",
						P(c)
					]
				}), /* @__PURE__ */ H(E, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ H("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => i(t),
				className: e(Y, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ H("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ U("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ue[t.status] ?? Ue.pending)
			}), /* @__PURE__ */ H("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function at({ runId: a, instruction: o, agentName: s, requestedBy: l, command: u = "/doc", status: d, onOpenDocument: p, onOpenRun: m, result: g, onOpenResult: _, onDecide: v, suggestion: y, onReview: b, onRetry: x, documentTitle: S, defaultExpanded: C = !1, loop: w, onOpenLab: T, className: E, "data-testid": D = "agent-run-card" }) {
	let O = d?.phase ?? "received", [k, ee] = B(C), A = Ke(w), j = O === "completed" ? d?.suggestion ?? y : void 0, M = O === "completed" ? d?.review : void 0, N = !!j && !M, P = O === "completed" && d?.noop === !0, F = O === "completed" ? d?.result ?? g : void 0, I = F?.kind === "link" && F.label ? F.label : "Open", L = p && !(F?.kind === "document" && _), R = J[O], te = O === "failed" || O === "rejected", z = te ? "danger" : M ? M.decision === "accept" ? "success" : "neutral" : P ? "warning" : O === "completed" ? j ? "warning" : "success" : O === "awaiting_approval" ? "warning" : "info", V = M ? "Reviewed" : N ? "Suggested" : P ? "No change" : Je[O], ne = M ? M.byName ?? M.by : void 0, re = M ? `${M.decision === "accept" ? "Accepted" : "Rejected"} by ${ne}` : void 0, ie = O === "awaiting_approval", W = O === "failed" ? Ze(d?.details?.error ?? d?.detail, u) : void 0, ae = O === "running" ? d?.stepLabel ? `${s} — ${d.stepLabel}` : `${s} is working via the pipeline` : ie ? `Waiting for approval${d?.detail ? ` — ${d.detail}` : ""}` : W ? W.summary : re ?? d?.detail ?? (N && d?.suggestion ? `${d.suggestion.applied} ${d.suggestion.applied === 1 ? "change" : "changes"} suggested` : O === "received" ? "Received" : V), G = d?.details, oe = G?.ops ?? [], se = G?.steps ?? [], ce = G?.document?.title || S || "Document", le = !!G?.document || !!p, ue = W ? W.technical : G?.error, de = rt(G), fe = `${D}-details-${a}`, pe = !!(N && j && b || ie && v || F && _ || F?.kind === "link" && !_);
	return /* @__PURE__ */ U("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", E),
		"data-testid": D,
		"data-phase": w ? w.phase : O,
		"data-mode": w ? "loop" : void 0,
		"data-run-id": a,
		"data-expanded": k ? "true" : void 0,
		title: l ? `${l} asked ${s}: ${o}` : `${s}: ${o}`,
		onClick: (e) => {
			e.target.closest("button, a") || ee((e) => !e);
		},
		children: [
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ H(h, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ U("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${D}-instruction`,
						children: [
							/* @__PURE__ */ H("span", {
								className: "font-mono text-text-tertiary",
								children: u
							}),
							" ",
							o
						]
					}),
					w ? /* @__PURE__ */ H(n, {
						size: "xs",
						tone: q[w.phase]?.tone ?? "info",
						"data-testid": `${D}-phase`,
						children: q[w.phase]?.label ?? w.phase
					}) : /* @__PURE__ */ H(n, {
						size: "xs",
						tone: z,
						"data-testid": `${D}-phase`,
						children: V
					}),
					/* @__PURE__ */ H(i, {
						size: "sm",
						"aria-label": k ? "Hide details" : "Show details",
						"aria-expanded": k,
						"aria-controls": k ? fe : void 0,
						onClick: () => ee((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${D}-toggle`,
						icon: /* @__PURE__ */ H(f, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", k && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			w ? /* @__PURE__ */ H(it, {
				runId: a,
				loop: w,
				clock: A,
				onOpenLab: T,
				testId: D
			}) : /* @__PURE__ */ U("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ U("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", pe && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ H("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${D}-steps`,
							children: qe.map((t, n) => {
								let r = te ? n < R : n < R || n === R && O === "completed", i = n === R && O !== "completed" && !te, a = te && n === R;
								return /* @__PURE__ */ U("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ H("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? P && n === R ? "bg-warning" : "bg-success" : i ? ie ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ H("span", {
										className: "sr-only",
										children: a ? V : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ H("span", {
							className: e("min-w-0 flex-1 truncate", M && (M.decision === "accept" ? "text-success" : "text-text-tertiary"), O === "failed" && "text-danger", P && "text-warning-fg"),
							"data-testid": `${D}-detail`,
							"data-review": M?.decision,
							title: W ? W.summary : d?.detail,
							children: ae
						})]
					}),
					N && j && b && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${D}-review`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => b(a, "accept", {
								key: j.key,
								...j.documentId ? { documentId: j.documentId } : {}
							}),
							"data-testid": `${D}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => b(a, "reject", {
								key: j.key,
								...j.documentId ? { documentId: j.documentId } : {}
							}),
							"data-testid": `${D}-reject-review`,
							children: "Reject"
						})]
					}),
					ie && v && /* @__PURE__ */ U("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${D}-decide`,
						children: [/* @__PURE__ */ H(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(a, "approve"),
							"data-testid": `${D}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ H(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(a, "reject"),
							"data-testid": `${D}-reject`,
							children: "Reject"
						})]
					}),
					O === "failed" && x && /* @__PURE__ */ H(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => x(a),
						"data-testid": `${D}-retry`,
						children: "Retry"
					}),
					F && _ && /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => _(F),
						className: e(Y, "font-medium text-info"),
						"data-testid": `${D}-open-result`,
						"data-result-kind": F.kind,
						children: I
					}),
					F?.kind === "link" && !_ && r(F.href) && /* @__PURE__ */ H("a", {
						href: r(F.href) ?? void 0,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Y, "font-medium text-info"),
						"data-testid": `${D}-open-result`,
						"data-result-kind": "link",
						children: I
					}),
					m && /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => m(a),
						className: Qe,
						"data-testid": `${D}-open-run`,
						children: "Open run"
					}),
					L && /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						type: "button",
						onClick: p,
						className: Qe,
						"data-testid": `${D}-open-document`,
						children: "Open document"
					})
				]
			}),
			k && /* @__PURE__ */ U("div", {
				id: fe,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${D}-details`,
				children: [
					le && /* @__PURE__ */ U("div", {
						className: "flex items-start gap-2",
						"data-testid": `${D}-details-document`,
						children: [
							/* @__PURE__ */ H(c, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ U("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ H("span", {
									className: "block truncate font-medium text-text-primary",
									children: ce
								}), G?.document?.snippet && /* @__PURE__ */ H("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${D}-details-snippet`,
									children: G.document.snippet
								})]
							}),
							p && /* @__PURE__ */ H(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: p,
								"data-testid": `${D}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					oe.length > 0 && /* @__PURE__ */ U("div", {
						"data-testid": `${D}-details-ops`,
						children: [
							/* @__PURE__ */ H("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ H("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: oe.slice(0, Ye).map((e, t) => /* @__PURE__ */ H("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: et(e)
								}, t))
							}),
							oe.length > Ye && /* @__PURE__ */ U("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${D}-details-more-ops`,
								children: [
									"+",
									oe.length - Ye,
									" more"
								]
							})
						]
					}),
					se.length > 0 && /* @__PURE__ */ H("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${D}-details-steps`,
						children: se.map((t) => /* @__PURE__ */ U("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ H("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Z[t.status] ?? Z.pending)
							}), /* @__PURE__ */ H("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					ue && /* @__PURE__ */ U("div", {
						"data-testid": `${D}-details-error-block`,
						children: [/* @__PURE__ */ H("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ H("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${D}-details-error`,
							children: ue
						})]
					}),
					/* @__PURE__ */ U("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							m && /* @__PURE__ */ H("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => m(a),
								className: e(Y, "hover:text-text-primary"),
								"data-testid": `${D}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							F && _ && /* @__PURE__ */ H("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => _(F),
								className: e(Y, "font-medium text-info"),
								"data-testid": `${D}-details-open-result`,
								children: I
							}),
							de && /* @__PURE__ */ H("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${D}-details-timings`,
								children: de
							})
						]
					})
				]
			})
		]
	});
}
function ot(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = st(e.result);
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
function st(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (t.kind === "document" && typeof t.documentId == "string" && t.documentId) return {
		kind: "document",
		documentId: t.documentId
	};
	if (t.kind === "link" && typeof t.href == "string" && r(t.href)) return {
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
function ct(e, t) {
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
function lt(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ut({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = te(() => ct(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ H("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ U("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: lt(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ H("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function dt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = B(e), [s, c] = B(!1), [l, u] = B(null), d = z(null);
	R(() => {
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
	return /* @__PURE__ */ U("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ H(T, {
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
			/* @__PURE__ */ U("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ H("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ H(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ H(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ H("p", {
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
function Q(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function ft({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = Q(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ H("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ H("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ U("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ H(V, { children: o ? /* @__PURE__ */ H("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ H("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ H("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ U("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ H("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ H("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: I(t.size)
			})]
		})]
	}) : /* @__PURE__ */ H("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H(ht, {}), /* @__PURE__ */ U("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ H("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ H("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: I(t.size)
				})]
			})] })
		})
	});
}
function pt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function mt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : I(o);
	return /* @__PURE__ */ U("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ H("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ H(ht, {}),
			/* @__PURE__ */ U("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ U("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ H("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ H("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ H("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ H("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ H("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ H("button", {
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
function ht() {
	return /* @__PURE__ */ H("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ H("path", {
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
function gt({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = de(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ U("div", {
		role: "separator",
		"aria-label": fe(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ H("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function _t(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function vt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function yt(e) {
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
function bt(e) {
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
var xt = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function St(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => xt[e] ?? e)
	};
}
function Ct(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function wt(e) {
	return `${Ct(e)}:`;
}
function Tt(e, t) {
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
function Et(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = wt(t);
	if (n) {
		let t = Tt(n, r);
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
function Dt(e) {
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
function Ot(e) {
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
function kt(e) {
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
function At(e) {
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
function jt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Mt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(jt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Nt(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function Pt(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Ft(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = Nt(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = Nt(r), i = Pt(r);
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
		let e = Nt(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = Nt(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var It = 3, Lt = 2, Rt = 3e5;
function $(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function zt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(ot(e.metadata) || kt(e.metadata) || Ot(e.metadata) || yt(e.metadata) || At(e.metadata));
}
function Bt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = $(r);
	if (!i || i !== $(n) || !zt(n) || !zt(r) || r.editedAt || ue(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Rt;
}
function Vt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Ht({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ U("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ H("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Ut(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Wt(e) {
	return e.displayName || e.userId;
}
function Gt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = $(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Kt(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function qt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, dock: d, currentUserId: f, reactionsFor: m, onToggleReaction: h, onReply: v, reply: y, onCancelReply: b, onForwardMessage: T, onCopyLink: E, onTogglePin: D, onEditMessage: O, onDeleteMessage: k, canEditMessage: ee, canDeleteMessage: P, pinnedMessageIds: I, onJumpToMessage: te, highlightedMessageId: ne, threaded: ie = !1, postRhythm: W = "channel", alignOwnMessages: ae = !0, documentEditors: oe, documentUnavailable: se, callParticipants: ce, agentRunStatus: le, onOpenRun: de, agentLoopStatus: fe, onOpenLab: me, onOpenResult: he, onDecideRun: _e, onReviewRun: ve, onRetryRun: ye, onJoinCall: be, onOpenRecording: Se, onCopyRecordingLink: we, onShareRecording: Ee, onDownloadRecording: De, onOpenRecordingTranscript: Oe, onManageRecordingExpiry: ke, recordingStatus: Ae, onOpenDocument: je, renderMessageReferences: Me, renderSystemMessage: Pe, renderMessageBody: Fe, isAssistantMessage: Ie, assistantMark: Le, tone: Re = "light", showHeader: Be, fill: K, flushComposer: Ve = !1, contentAlign: q = "end", onLoadMore: Ue, hasMore: We, loadingMore: Ge = !1, onSendFiles: Ke, transfers: qe = [], currentActor: J, onCancelTransfer: Je, attachmentSrc: Ye, onOpenAttachment: Xe, acceptFiles: Ze, maxFileSize: Y, onFileError: Qe, readReceipts: X, readReceiptsEnabled: $e = !0, unreadFrom: et, emojis: tt = N }) {
	let [nt, rt] = B(null), [Z, it] = B(null), st = z(null), [ct, lt] = B(null), Q = Re === "dark", ht = C(), xt = Be ?? !(ht?.hasHeader ?? !1), wt = K ?? ht?.fillsHeight ?? !1, [Tt, Pt] = B(""), Rt = z(null), $ = z(null), zt = !!Ue && We !== !1, qt = z(null), Yt = z(null), [Xt, Zt] = B(!1), Qt = !!Ke && !a, $t = Mt(n, r), en = ie ? Ft($t) : null, [tn, nn] = B(() => /* @__PURE__ */ new Set());
	function rn(e) {
		nn((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let an = z(void 0);
	if (et !== void 0) {
		let e = an.current;
		if (e === void 0) an.current = et;
		else {
			let t = Date.parse(et), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (an.current = et);
		}
	}
	let on = an.current, sn = on === void 0 ? -1 : Vt(en ? en.map((e) => jt(e.root)) : $t.map((e) => jt(e)), on), cn = X !== void 0, ln = X ?? [], un = $e && f ? f : void 0, dn = (() => {
		if (un) for (let e = $t.length - 1; e >= 0; --e) {
			let t = $t[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== un || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), fn = dn && un ? Ut(ln, un, dn.timestamp) : [], pn = fn.length === 1 && !!un && Gt(n, ln, un) === 1;
	function mn() {
		if (!dn) return null;
		if (fn.length === 0) return cn ? /* @__PURE__ */ H("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", ae ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ H("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = fn.map(Wt), n = fn.slice(0, 3);
		return /* @__PURE__ */ U("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", ae ? "justify-end pr-1" : "justify-start pl-7", Q ? "text-white/50" : "text-text-tertiary"),
			children: [
				fn.length > 1 && /* @__PURE__ */ H("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ H(x, {
						name: Wt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ H("span", {
					"data-testid": "chat-read-receipts-label",
					children: pn ? "Seen" : `Seen by ${fn.length}`
				}),
				/* @__PURE__ */ H("span", {
					style: S,
					children: pn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [hn, gn] = B(0), [_n, vn] = B(!1), yn = z(!0), bn = z(n.length), xn = n.length + r.length + qe.length, Sn = z(null), [Cn, wn] = B(""), Tn = z(null), En = z(!1), Dn = z(0);
	R(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!En.current) {
			En.current = !0, Tn.current = t;
			return;
		}
		if (t === Tn.current || (Tn.current = t, f && e.userId === f)) return;
		Dn.current += 1;
		let r = Dn.current % 2 == 0 ? "​" : "";
		wn(vt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function On() {
		let e = Rt.current;
		e && (e.scrollTop = e.scrollHeight, yn.current = !0, gn(0));
	}
	function kn() {
		let e = Rt.current;
		if (!e) return;
		let t = _t(e);
		yn.current = t, t && gn(0), vn(e.scrollTop > 8);
	}
	R(() => {
		let e = Rt.current, t = bn.current, n = xn - t;
		if (bn.current = xn, !e) return;
		let r = Sn.current;
		if (r && n > 0) {
			Sn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		yn.current ? (e.scrollTop = e.scrollHeight, gn(0), vn(e.scrollTop > 8)) : n > 0 && gn((e) => e + n);
	}, [xn]);
	function An() {
		let e = Rt.current;
		e && (Sn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), Ue?.();
	}
	R(() => () => {
		$.current && clearTimeout($.current);
	}, []);
	function jn() {
		let e = Tt.trim();
		!e || a || ($.current && clearTimeout($.current), $.current = null, o?.(!1), yn.current = !0, i(e), Pt(""));
	}
	function Mn(e) {
		!Qt || e.length === 0 || (yn.current = !0, Ke?.(e));
	}
	function Nn(e) {
		if (!Qt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Mn(t));
	}
	function Pn(e) {
		Pt((t) => t + e), Zt(!1);
	}
	function Fn() {
		a || (o?.(!0), $.current && clearTimeout($.current), $.current = setTimeout(() => o?.(!1), 2e3));
	}
	function In(e) {
		Fn(), e.key === "Enter" && !a && Tt.trim() && jn();
	}
	function Ln(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === sn ? /* @__PURE__ */ H(Ht, { tone: Re }) : null, l = !!Pe && a?.kind === "message" && !a.message.deletedAt && a.message.metadata?.deleted !== !0 && Pe(a.message) != null, u = !c && !l && Bt(a, n), d = !o && ue(s, i) ? /* @__PURE__ */ H(gt, {
			timestamp: s,
			tone: Re,
			className: r === 0 ? "pt-0" : void 0
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = ot(r.metadata);
			return /* @__PURE__ */ U(L, { children: [
				d,
				c,
				/* @__PURE__ */ H("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ H(ge, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: Re,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ U(V, { children: [
							i ? /* @__PURE__ */ H(at, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: le?.(i.runId),
								onOpenDocument: je && i.documentId ? () => je(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: de,
								result: i.result,
								onOpenResult: he,
								onDecide: _e,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: ve,
								onRetry: ye,
								...Kt(i, fe, me)
							}) : r.body == null ? /* @__PURE__ */ H(xe, { text: r.content }) : /* @__PURE__ */ H("div", {
								"data-testid": "chat-local-message-body",
								className: "min-w-0",
								children: typeof r.body == "function" ? r.body() : r.body
							}),
							/* @__PURE__ */ H("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Q ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ H("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ H(t, {
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
		let { message: g } = n, _ = g.displayName ?? g.clientId.slice(0, 8), y = g.attachments ?? [], b = g.metadata?.html, x = typeof b == "string" ? b : void 0, S = Dt(g.metadata), C = Et(g.content, S, x), A = /* @__PURE__ */ H(xe, {
			html: C.html,
			text: C.body
		}), j = yt(g.metadata), M = ot(g.metadata), N = Ot(g.metadata), R = kt(g.metadata), z = At(g.metadata), B = St(g.metadata), re = bt(g.metadata), ie = M ? /* @__PURE__ */ H(at, {
			runId: M.runId,
			instruction: M.instruction || g.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: g.displayName,
			status: le?.(M.runId),
			onOpenDocument: je && M.documentId ? () => je(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: de,
			result: M.result,
			onOpenResult: he,
			onDecide: _e,
			suggestion: M.suggestionKey ? {
				key: M.suggestionKey,
				...M.documentId ? { documentId: M.documentId } : {}
			} : void 0,
			onReview: ve,
			onRetry: ye,
			...Kt(M, fe, me)
		}) : R ? (() => {
			let e = Ae?.(R.recordingId), t = {
				...R,
				...e ?? {}
			};
			return /* @__PURE__ */ H(ze, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? g.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!g.id && !!I?.has(g.id),
				onOpen: Se,
				onCopyLink: we,
				onShare: Ee,
				onDownload: De,
				onOpenTranscript: Oe,
				onManageExpiry: ke,
				onTogglePin: D ? () => D(g) : void 0
			});
		})() : N ? /* @__PURE__ */ H(Ne, {
			callId: N.callId,
			startedBy: (typeof g.metadata?.displayName == "string" ? g.metadata.displayName : void 0) ?? g.displayName,
			participants: ce?.(N.callId) ?? N.participants,
			live: N.live,
			durationMs: N.durationMs,
			startedAt: N.startedAt,
			outcome: N.outcome,
			recordingId: N.recordingId,
			onOpenRecording: Se,
			audioOnly: N.audioOnly,
			recorded: N.recorded,
			notRecordedReason: N.notRecordedReason,
			lobbyName: N.lobbyName,
			onJoin: be
		}) : j ? /* @__PURE__ */ H(Ce, {
			documentId: j.documentId,
			title: j.title || g.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof g.metadata?.displayName == "string" ? g.metadata.displayName : void 0) ?? g.displayName,
			editors: oe?.(j.documentId) ?? [],
			onOpen: je,
			unavailable: se?.(j.documentId)
		}) : y.length === 0 ? A : /* @__PURE__ */ U(V, { children: [(g.content || x) && A, y.map((e) => /* @__PURE__ */ H(ft, {
			attachment: e,
			src: Ye?.(e),
			onOpen: Xe
		}, e.id))] }), W = g.deletedAt || g.metadata?.deleted === !0 ? null : Fe?.(g) ?? null, Be = W ?? ie, K = g.id ?? "", Ve = K && m ? m(K) : [], q = g.metadata?.replyTo, Ue = !!o && !!q && q.messageId === o.rootId, We = !!q && !Ue, Ge = !!K && !!I?.has(K), Ke = !!f && g.userId === f, qe = g.metadata?.system === !0, J = !!g.deletedAt || g.metadata?.deleted === !0, Je = !!(M || R || N || j || z), Ze = W != null || !!(M || R || N || j || y.length > 0), Y = !J && !qe && !Je && !!K, Qe = Y && (ee ? ee(g) : Ke), X = Y && (P ? P(g) : Ke), $e = Qe || X, et = !!K && !J && !qe && !Je && y.length === 0 && !!g.content.trim(), tt = J ? null : Pe?.(g) ?? null, Z = !J && Ie?.(g) === !0, ct = Le ?? /* @__PURE__ */ H(w, {}), pt = Qe && !!O && nt === K, mt = /* @__PURE__ */ U(V, { children: [
			We && q && /* @__PURE__ */ H(F, {
				quote: q,
				onJump: te,
				className: "mb-1"
			}),
			S && /* @__PURE__ */ U("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Ct(S), S.timestamp ? pe(S.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ H("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					C.stripped ? Ct(S) : "Forwarded"
				]
			}),
			Ge && /* @__PURE__ */ U("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ H(p, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			J ? /* @__PURE__ */ H("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : pt ? /* @__PURE__ */ H(dt, {
				initialText: g.content,
				onSave: async (e) => {
					await O(g, e), rt(null);
				},
				onCancel: () => rt(null)
			}) : Be,
			!J && Me?.(g),
			!J && re.length > 0 && /* @__PURE__ */ H("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: re.map((e) => /* @__PURE__ */ H(Te, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: je,
					unavailable: se?.(e.id)
				}, e.id))
			}),
			!J && B && /* @__PURE__ */ U("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					B.labels.length > 0 ? `Too large to send: ${B.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!J && Ve.length > 0 && f && h && /* @__PURE__ */ H(ut, {
				reactions: Ve,
				currentUserId: f,
				onToggle: (e) => h(K, e)
			})
		] });
		return tt != null && Z ? /* @__PURE__ */ U(L, { children: [
			d,
			c,
			/* @__PURE__ */ U("div", {
				role: "status",
				"data-testid": "chat-system-line",
				"data-voice": "assistant",
				"data-message-id": K || void 0,
				className: "flex items-start gap-2 px-2 py-1 text-xs",
				children: [/* @__PURE__ */ H("span", {
					className: "mt-0.5 flex w-5 shrink-0 justify-center",
					children: ct
				}), /* @__PURE__ */ H("div", {
					"data-testid": "chat-assistant-notice",
					className: e("min-w-0 max-w-[30rem] break-words rounded-xl border px-2.5 py-1", Re === "dark" ? "border-accent/40 bg-accent/20 text-white/80" : "border-accent/25 bg-accent/8 text-text-secondary"),
					children: tt
				})]
			})
		] }, g.id ?? r) : tt == null ? z ? /* @__PURE__ */ U(L, { children: [
			d,
			c,
			/* @__PURE__ */ H(He, {
				membership: z,
				fallbackText: g.content,
				timestamp: g.timestamp,
				"data-testid": "membership-notice"
			})
		] }, g.id ?? r) : /* @__PURE__ */ U(L, { children: [
			d,
			c,
			/* @__PURE__ */ H("div", {
				"data-testid": "chat-message",
				"data-message-id": K || void 0,
				"data-voice": Z ? "assistant" : void 0,
				"data-continues": u ? "true" : void 0,
				title: u ? pe(g.timestamp) : void 0,
				className: e("group relative rounded-md px-2 transition-colors hover:bg-surface-hover", K && K === ne && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ H(ge, {
					actionsLayout: "menu",
					className: u ? "py-0.5" : void 0,
					author: _,
					content: mt,
					timestamp: u ? "" : g.timestamp,
					editedAt: J ? void 0 : g.editedAt,
					avatarUrl: g.avatarUrl,
					assistant: Z,
					avatar: Z ? ct : void 0,
					hideAvatar: u,
					hideAuthor: u,
					tone: Re,
					mine: Ke && ae,
					contentLayout: Ze ? "block" : "inline",
					actions: K && !J && !pt && (h || $e || et && T || !qe && (v || D || E)) ? /* @__PURE__ */ H(G, {
						className: "max-w-full flex-wrap",
						onReact: h ? (e) => h(K, e) : void 0,
						onOpenReactionPicker: h ? (e) => {
							st.current = e, it(K);
						} : void 0,
						onReply: v && !qe ? () => v(o?.rootMessage ?? g) : void 0,
						onForward: T && et ? (e) => T(g, e) : void 0,
						onCopyLink: E && !qe && K ? () => E(g) : void 0,
						onTogglePin: D && !qe ? () => D(g) : void 0,
						pinned: !!g.id && !!I?.has(g.id),
						onEdit: Qe && O ? () => rt(K) : void 0,
						onDelete: X && k ? () => lt(K) : void 0
					}) : void 0
				})
			}),
			!!dn && K === dn.id && mn()
		] }, g.id ?? r) : /* @__PURE__ */ U(L, { children: [
			d,
			c,
			/* @__PURE__ */ H("div", {
				role: "status",
				"data-testid": "chat-system-line",
				"data-message-id": K || void 0,
				className: "flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary",
				children: tt
			})
		] }, g.id ?? r);
	}
	function Rn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function zn(e) {
		if (!v || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !At(t.metadata)) return t;
	}
	function Bn(t, n, r) {
		let i = jt(r?.root), a = W === "chat", o = r && r.replies.length === 0 && (a || !zn(r.root)) ? r.root : void 0, s = Ln(t.root, n, i, o), c = jt(t.root) ?? "", l = !a && n > 0 && n !== sn && !ue(c, i) ? /* @__PURE__ */ H("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Q ? "border-white/10" : "border-border-subtle")
		}) : null, u = t.replies.length > 0 ? zn(t.root) : null;
		if (t.replies.length === 0 && !u) return l ? /* @__PURE__ */ U(L, { children: [l, s] }, `post:${Nt(t.root) ?? n}`) : s;
		let d = Nt(t.root) ?? "", f = t.root.kind === "message" ? t.root.message : void 0, p = !!d && t.replies.length > It, m = !p || tn.has(d), h = m ? t.replies : t.replies.slice(0, Lt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(Rn))].slice(0, 3);
		return /* @__PURE__ */ U(L, { children: [l, /* @__PURE__ */ U("div", {
			"data-testid": "chat-thread",
			"data-thread-root": d || void 0,
			className: "group/post",
			children: [
				s,
				t.replies.length > 0 && /* @__PURE__ */ U("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Q ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => Ln(e, t, void 0, h[t - 1], {
						rootId: d,
						...f ? { rootMessage: f } : {}
					})), p && /* @__PURE__ */ U("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => rn(d),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ H("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ H(x, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				u && /* @__PURE__ */ H("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Rn(t.root)}`,
						onClick: () => v?.(u),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${d || n}`);
	}
	let Vn = /* @__PURE__ */ U("div", {
		"data-testid": "chat-panel",
		className: e(wt ? e("flex h-full min-h-0 flex-col", Ve && l ? "px-0 pb-0" : "px-[var(--ui-content-gutter,1rem)] pb-3") : e("border rounded mt-4", Ve && l ? "px-0 pt-3 pb-0" : "p-3", Q ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			xt && /* @__PURE__ */ U("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Ve && l && "mx-[var(--ui-content-gutter,1rem)]", Q ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ H("span", {
				style: S,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Cn
			}),
			/* @__PURE__ */ U("div", {
				className: e("relative flex flex-col mb-2", wt ? "min-h-0 flex-1" : "", Ve && l && "mx-[var(--ui-content-gutter,1rem)]"),
				children: [/* @__PURE__ */ H("div", {
					ref: Rt,
					onScroll: kn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", _n && "fade-top", wt ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ U("div", {
						"data-chat-content": !0,
						className: e("pb-[var(--ui-chat-gap,1rem)]", q === "end" && "mt-auto"),
						children: [
							zt && n.length > 0 && /* @__PURE__ */ H("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ H("button", {
									"data-ui-part": "",
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: An,
									disabled: Ge,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Ge ? "Loading…" : "Load earlier messages"
								})
							}),
							$t.length === 0 ? c ?? /* @__PURE__ */ H("div", {
								className: e("text-sm", Q ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : en ? en.map((e, t) => Bn(e, t, en[t - 1])) : $t.map((e, t) => Ln(e, t, jt($t[t - 1]), $t[t - 1])),
							h && /* @__PURE__ */ H(j, {
								open: Z !== null,
								triggerRef: st,
								emojis: tt,
								onSelect: (e) => {
									Z && h(Z, e), it(null);
								},
								onClose: () => it(null)
							}),
							k && /* @__PURE__ */ H(g, {
								open: ct !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => lt(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === ct);
									lt(null), e && k(e);
								}
							}),
							qe.map((e) => /* @__PURE__ */ H(ge, {
								author: e.actor,
								timestamp: "",
								tone: Re,
								content: /* @__PURE__ */ H(mt, {
									transfer: e,
									mine: pt(e, f, J),
									onCancel: Je
								})
							}, e.transferId))
						]
					})
				}), hn > 0 && /* @__PURE__ */ U("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: On,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Q ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						hn,
						" new message",
						hn === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ H(re, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Ve && l && "mx-[var(--ui-content-gutter,1rem)]", Q ? "text-white/50" : "text-text-secondary")
			}),
			d != null && d !== !1 && /* @__PURE__ */ H("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: d
			}),
			l ? /* @__PURE__ */ H("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Fn : void 0,
				children: l
			}) : /* @__PURE__ */ U("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [y && /* @__PURE__ */ H(F, {
					quote: y,
					onDismiss: b,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ U("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						Ke && /* @__PURE__ */ U(V, { children: [/* @__PURE__ */ H("button", {
							"data-ui-part": "",
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !Qt,
							onClick: () => qt.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Q ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ H(Jt, {})
						}), /* @__PURE__ */ H(A, {
							ref: qt,
							multiple: !0,
							accept: Ze,
							onFiles: (e) => {
								let t = Y ? e.filter((e) => e.size > Y) : [];
								t.length > 0 && Qe?.(`Skipped ${t.length} file(s) over the size limit.`), Mn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ H("button", {
							"data-ui-part": "",
							ref: Yt,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": Xt,
							title: "Insert emoji",
							disabled: a,
							onClick: () => Zt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Q ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ H(u, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ H(j, {
							open: Xt,
							onSelect: Pn,
							onClose: () => Zt(!1),
							triggerRef: Yt,
							emojis: tt
						}),
						/* @__PURE__ */ H(_, {
							size: "sm",
							value: Tt,
							onChange: (e) => Pt(e.target.value),
							onKeyDown: In,
							onPaste: Nn,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Q && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ H(t, {
							variant: "primary",
							size: "sm",
							onClick: jn,
							disabled: a || !Tt.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return Ke ? /* @__PURE__ */ H(M, {
		onFiles: Mn,
		accept: Ze,
		maxSize: Y,
		onError: Qe,
		disabled: a,
		className: wt ? "flex h-full min-h-0 flex-col" : void 0,
		children: Vn
	}) : Vn;
}
function Jt() {
	return /* @__PURE__ */ H("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ H("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
export { ce as $, Ve as A, Te as B, st as C, et as D, Ze as E, Me as F, he as G, Se as H, De as I, de as J, me as K, Ee as L, ze as M, Le as N, We as O, Ne as P, se as Q, ke as R, ot as S, Ge as T, xe as U, Ce as V, ge as W, pe as X, fe as Y, ue as Z, ut as _, wt as a, Z as b, At as c, Et as d, G as et, gt as f, dt as g, Q as h, bt as i, K as j, He as k, kt as l, mt as m, Ot as n, re as nt, Ct as o, ft as p, le as q, yt as r, ne as rt, Dt as s, qt as t, ie as tt, St as u, lt as v, rt as w, at as x, ct as y, je as z };
