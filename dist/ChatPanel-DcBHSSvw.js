import { d as e, n as t } from "./Button-DQoeE5dN.js";
import { n, r } from "./safeHref-CSAycLWi.js";
import { t as i } from "./IconButton-BgM9MvwA.js";
import { A as a, B as o, J as s, S as c, St as l, dt as u, gt as d, m as f, s as p, tt as m, w as h } from "./Icons-CqVFbuiZ.js";
import { g } from "./MediaIcons-_ai5Til2.js";
import { t as _ } from "./ConfirmDialog-DaIkb8ho.js";
import { t as v } from "./Input-DiOEvL5h.js";
import { t as y } from "./InlinePopover-CEzf8hyR.js";
import { t as b } from "./ThinkingDots-mwuPsKFX.js";
import { t as x } from "./DropdownMenu-LFtIWj5Y.js";
import { t as S } from "./StatusPill-AqmSksrZ.js";
import { n as C } from "./Avatar-CNZ7AQ8M.js";
import { n as w, r as T } from "./DockedPanelContext-BeypizAi.js";
import { t as E } from "./Textarea-Cf4WFXAs.js";
import { t as D } from "./DotMeter-DJzl5dNX.js";
import { t as O } from "./StatusDot-DAok6F5B.js";
import { t as k } from "./RovingToolbar-C8vF753M.js";
import { t as ee } from "./PresenceAvatars-Dw8HVI_h.js";
import { i as A, n as j, r as M, t as N } from "./ReactionPickerPopover-se1jqsCw.js";
import { n as P } from "./useComputeProjects-ZSazDRet.js";
import { t as F } from "./QuoteBlock-Dks53Idi.js";
import { t as te } from "./formatBytes-05ivRSJY.js";
import { Fragment as I, useEffect as L, useMemo as ne, useRef as R, useState as z } from "react";
import { Fragment as B, jsx as V, jsxs as H } from "react/jsx-runtime";
//#region src/components/shared/TypingIndicator.tsx
function re(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function ie({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ H("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ V(b, { size: r }), !n && /* @__PURE__ */ V("span", { children: re(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function ae({ name: t, onRename: n, memberCount: r, description: i, tabs: a, actions: o, avatarUrl: s, online: c, onMembersClick: l, size: u = "md", headingLevel: d = 2, as: f = "div", className: p, "data-testid": m }) {
	let h = u === "sm", g = f, _ = d === 1 ? "h1" : "h2", [v, y] = z(!1), [b, x] = z(t), S = R(null);
	L(() => {
		v || x(t);
	}, [t, v]), L(() => {
		v && (S.current?.focus(), S.current?.select());
	}, [v]);
	let w = () => {
		let e = b.trim();
		if (y(!1), !e || e === t) {
			x(t);
			return;
		}
		n?.(e);
	}, T = () => {
		x(t), y(!1);
	};
	return /* @__PURE__ */ H(g, {
		"data-testid": m,
		"data-size": u,
		className: e("@container flex items-center justify-between", h ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", p),
		children: [
			/* @__PURE__ */ H("div", {
				className: e("flex min-w-0 max-w-full items-center", h ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ H("div", {
					className: "relative shrink-0",
					children: [s ? /* @__PURE__ */ V("img", {
						src: s,
						alt: t,
						className: h ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ V(C, {
						name: t,
						size: h ? 28 : 36
					}), c !== void 0 && /* @__PURE__ */ V("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ V(O, {
							color: c ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": c ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ H("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ H("div", {
						className: "flex items-baseline gap-2",
						children: [v ? /* @__PURE__ */ V("input", {
							"data-ui-part": "",
							ref: S,
							value: b,
							onChange: (e) => x(e.target.value.slice(0, 100)),
							maxLength: 100,
							"aria-label": "Conversation name",
							"data-testid": m ? `${m}-name-input` : "channel-header-name-input",
							onBlur: w,
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), w()) : e.key === "Escape" && (e.preventDefault(), T()), e.stopPropagation();
							},
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", "text-sm")
						}) : /* @__PURE__ */ V(_, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", d === 1 ? "text-xl" : "text-sm", n && "cursor-text"),
							onDoubleClick: n ? () => y(!0) : void 0,
							title: n ? "Double-click to rename" : void 0,
							"data-testid": m ? `${m}-name` : void 0,
							children: t
						}), r !== void 0 && (l ? /* @__PURE__ */ H("button", {
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
						}) : /* @__PURE__ */ H("span", {
							"data-testid": "channel-header-members",
							className: "text-xs font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}))]
					}), i && !h && /* @__PURE__ */ V("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: i
					})]
				})]
			}),
			a && /* @__PURE__ */ V("div", {
				className: e("flex max-w-full items-center justify-end overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full @max-3xl:justify-start", h ? "min-w-0 flex-1" : "flex-[1_0_auto]"),
				children: a
			}),
			o && /* @__PURE__ */ V("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var U = [
	"👍",
	"🎉",
	"❤️"
], oe = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function W({ actions: t = [], label: n = "Message actions", quickReactions: r = U, onReact: i, onOpenReactionPicker: s, onReply: c, onForward: f, onTogglePin: p, pinned: g = !1, onCopyLink: _, onEdit: v, onDelete: y, className: b, "data-testid": x = "message-actions" }) {
	let S = [], C = (e, t, n, r) => S.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (i) for (let e of r) C(`react-${e}`, `React ${e}`, /* @__PURE__ */ V("span", {
		"aria-hidden": !0,
		children: e
	}), () => i(e));
	s && C("more-reactions", "More reactions", /* @__PURE__ */ V(d, { size: 14 }), (e) => s(e.currentTarget)), c && C("reply", "Reply", /* @__PURE__ */ V(u, { size: 14 }), c), f && C("forward", "Forward to another conversation", /* @__PURE__ */ V(a, { size: 14 }), (e) => f(e.currentTarget)), p && C("pin", g ? "Unpin" : "Pin to channel", /* @__PURE__ */ V(m, { size: 14 }), p), _ && C("copy-link", "Copy link to message", /* @__PURE__ */ V(o, { size: 14 }), _), v && C("edit", "Edit message", /* @__PURE__ */ V(h, { size: 13 }), v), y && C("delete", "Delete message", /* @__PURE__ */ V(l, { size: 13 }), y);
	for (let e of t) S.push({
		key: e.id,
		label: e.label,
		glyph: e.icon,
		disabled: e.disabled,
		onClick: (t) => e.onClick(t.currentTarget)
	});
	return S.length === 0 ? null : /* @__PURE__ */ V(k, {
		label: n,
		"data-testid": x,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", b),
		children: S.map((e) => /* @__PURE__ */ V("button", {
			"data-ui-part": "",
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${x}-${e.key}`,
			onClick: e.onClick,
			disabled: e.disabled,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${oe}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
//#region src/utils/identity.ts
var se = [
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
function ce(e) {
	let t = 0;
	for (let n = 0; n < e.length; n++) t = e.charCodeAt(n) + ((t << 5) - t);
	return se[Math.abs(t) % se.length];
}
function le(e) {
	if (!e) return "?";
	let t = e.trim().split(/\s+/);
	return t.length >= 2 ? ((t[0][0] ?? "") + (t[t.length - 1][0] ?? "")).toUpperCase() : e.slice(0, 2).toUpperCase();
}
//#endregion
//#region src/components/social/dayBoundary.ts
function ue(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : `${t.getFullYear().toString().padStart(4, "0")}-${(t.getMonth() + 1).toString().padStart(2, "0")}-${t.getDate().toString().padStart(2, "0")}`;
}
function de(e, t) {
	let n = ue(e);
	if (!n) return !1;
	if (t === void 0) return !0;
	let r = ue(t);
	return r ? n !== r : !1;
}
function fe(e, t = /* @__PURE__ */ new Date()) {
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
function pe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		weekday: "long",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
}
function me(e) {
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
function he(e, t = /* @__PURE__ */ new Date()) {
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
function ge(e) {
	try {
		let t = new Date(e);
		return isNaN(t.getTime()) ? "" : `${t.getHours().toString().padStart(2, "0")}:${t.getMinutes().toString().padStart(2, "0")}`;
	} catch {
		return "";
	}
}
function _e({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: o = !1, mine: c = !1, footer: l, actions: u, actionsLayout: d = "inline", tone: f = "light", editedAt: p, contentLayout: m = "inline", assistant: h = !1, avatar: g, className: _ }) {
	let v = f === "dark", b = ge(r), [x, S] = z(!1), w = R(null), T = !o || !!b, E = !!u && (d === "menu" || !T);
	L(() => {
		E || S(!1);
	}, [E]);
	let D = /* @__PURE__ */ V("button", {
		"data-ui-part": "",
		ref: w,
		type: "button",
		"aria-label": "Message actions",
		"aria-expanded": x,
		"aria-haspopup": "dialog",
		onClick: () => S((e) => !e),
		"data-testid": "message-row-actions-toggle",
		className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary aria-expanded:opacity-100",
		children: /* @__PURE__ */ V(s, { size: 16 })
	});
	return /* @__PURE__ */ H("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		"data-voice": h ? "assistant" : void 0,
		className: e("flex items-start gap-2 py-1", c && "flex-row-reverse", _),
		children: [
			/* @__PURE__ */ V("div", {
				className: "w-5 shrink-0 mt-0.5",
				children: E && !T ? D : !a && (g ?? /* @__PURE__ */ V(C, {
					name: t,
					src: i,
					size: 20
				}))
			}),
			/* @__PURE__ */ H("div", {
				className: e("flex grow flex-col min-w-0", c && "items-end"),
				children: [
					T && /* @__PURE__ */ H("div", {
						"data-testid": "message-row-header",
						className: e(u && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", E && "flex-nowrap", u && c && "flex-row-reverse"),
						children: [T && /* @__PURE__ */ H("div", {
							className: e("flex items-baseline gap-2 min-w-0 max-w-full", u && (E ? "flex-1" : "shrink-0"), c && "flex-row-reverse"),
							children: [
								!o && /* @__PURE__ */ V("span", {
									"data-testid": "message-row-author",
									className: e("text-xs font-semibold truncate", v ? "text-white/70" : h ? "text-accent-fg" : "text-text-secondary"),
									children: t
								}),
								b && /* @__PURE__ */ V("time", {
									"data-testid": "message-row-time",
									dateTime: r,
									title: me(r),
									className: e("text-xs shrink-0", v ? "text-white/40" : "text-text-tertiary"),
									children: b
								}),
								p && /* @__PURE__ */ V("span", {
									"data-testid": "message-row-edited",
									title: `Edited ${me(p)}`,
									className: e("text-[11px] shrink-0", v ? "text-white/40" : "text-text-tertiary"),
									children: "(edited)"
								})
							]
						}), E ? D : u && /* @__PURE__ */ V("div", {
							"data-testid": "message-row-actions",
							className: "max-w-full shrink-0",
							children: u
						})]
					}),
					/* @__PURE__ */ V("span", {
						"data-testid": "message-row-content",
						className: e("text-sm min-w-0 break-words whitespace-pre-wrap", v ? "text-white/90" : "text-text-primary", c && m === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", c && m === "inline" && (v ? "bg-white/15" : "bg-primary-bg"), m === "block" && "w-full max-w-[30rem]"),
						children: n
					}),
					l && /* @__PURE__ */ V("div", {
						"data-testid": "message-row-footer",
						className: e("mt-1", c && "self-end"),
						children: l
					})
				]
			}),
			E && /* @__PURE__ */ V(y, {
				trigger: w,
				open: x,
				onClose: () => S(!1),
				placement: c ? "bottom-end" : "bottom-start",
				"aria-label": "Message actions",
				className: "min-w-0 max-w-[calc(100vw-16px)] p-0",
				children: u
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageBody.tsx
var ve = /* @__PURE__ */ new Set([
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
function ye(e, t) {
	if (e.nodeType === Node.TEXT_NODE) return e.textContent;
	if (e.nodeType !== Node.ELEMENT_NODE) return null;
	let r = e, i = Array.from(r.childNodes).map((e, n) => ye(e, `${t}-${n}`));
	if (!ve.has(r.tagName)) return /* @__PURE__ */ V("span", { children: i }, t);
	switch (r.tagName) {
		case "BR": return /* @__PURE__ */ V("br", {}, t);
		case "A": {
			let e = n(r.getAttribute("href"));
			return e ? /* @__PURE__ */ V("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: i
			}, t) : /* @__PURE__ */ V("span", { children: i }, t);
		}
		case "SPAN": {
			let e = r.classList.contains("mention"), n = !e && r.classList.contains("docref");
			return /* @__PURE__ */ V("span", {
				className: e ? "mention" : n ? "docref" : void 0,
				"data-mention-id": e ? r.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": n ? r.getAttribute("data-id") ?? void 0 : void 0,
				children: i
			}, t);
		}
		default: {
			let e = r.tagName.toLowerCase();
			return /* @__PURE__ */ V(e, { children: i }, t);
		}
	}
}
var be = /```([\s\S]*?)```|`([^`\n]+)`/g;
function xe(e) {
	if (!e || e.indexOf("`") === -1) return e;
	let t = [], n = 0, r;
	for (be.lastIndex = 0; (r = be.exec(e)) !== null;) {
		r.index > n && t.push(e.slice(n, r.index));
		let i = r[1];
		if (i !== void 0) {
			let e = i.replace(/^\r?\n/, ""), n = e.indexOf("\n");
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ V("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ V("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ V("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function Se({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = ne(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ye(e, `n${t}`));
	}, [t]), o = ne(() => xe(n ?? ""), [n]);
	return /* @__PURE__ */ V("div", {
		"data-testid": i,
		className: e("message-body", r),
		children: a ?? o
	});
}
//#endregion
//#region src/components/social/DocumentActivityCard.tsx
function Ce(e) {
	return e === "gone" ? "No longer available" : "You don’t have access";
}
function we({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: s, className: l, "data-testid": u = "document-activity-card" }) {
	let d = !s && a.length > 0;
	return /* @__PURE__ */ H("div", {
		"data-testid": u,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": s,
		"aria-disabled": s ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", s && "border-dashed opacity-60", l),
		children: [
			/* @__PURE__ */ V("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ V(c, { size: 18 })
			}),
			/* @__PURE__ */ H("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ V("span", {
					className: e("truncate text-[13px] font-semibold", s ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ V("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": s ? `${u}-unavailable` : void 0,
					children: s ? Ce(s) : d ? `${Te(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ V("span", {
				className: "shrink-0",
				"data-testid": `${u}-editors`,
				children: /* @__PURE__ */ V(ee, {
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
			o && !s && /* @__PURE__ */ V("button", {
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
function Te(e) {
	let t = e.length, n = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), r = t - n.length;
	if (n.length === 0) return t === 1 ? "Someone is" : `${t} people are`;
	if (r === 0) return n.length === 1 ? `${n[0]} is` : `${n[0]} and ${n[1]} are`;
	let i = r === 1 ? "1 other" : `${r} others`;
	return n.length === 1 ? `${n[0]} and ${i} are` : `${n[0]}, ${n[1]} and ${i} are`;
}
//#endregion
//#region src/components/social/DocumentChip.tsx
function Ee({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": s = "chat-message-docref" }) {
	let l = a ? void 0 : i, u = a ? Ce(a) : null;
	return /* @__PURE__ */ H("button", {
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
			r ? /* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ V(c, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ V("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			u && /* @__PURE__ */ H("span", {
				className: "shrink-0",
				"data-testid": `${s}-unavailable`,
				children: ["· ", u]
			})
		]
	});
}
//#endregion
//#region src/components/social/CallActivityCard.tsx
function De(e) {
	if (!Number.isFinite(e) || e < 0) return "";
	let t = Math.round(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60;
	return n > 0 ? r > 0 ? `${n}h ${r}m` : `${n}h` : r > 0 ? i > 0 ? `${r}m ${i}s` : `${r}m` : `${i}s`;
}
function Oe(e, t) {
	let n = e.length;
	if (n === 0) return t ? "Nobody has joined yet" : "Nobody joined";
	let r = e.map((e) => e.displayName).filter(Boolean).slice(0, 2), i = n - r.length, a = i === 1 ? "1 other" : `${i} others`, o;
	return o = r.length === 0 ? n === 1 ? "Someone" : `${n} people` : i > 0 ? r.length === 1 ? `${r[0]} and ${a}` : `${r[0]}, ${r[1]} and ${a}` : r.length === 1 ? r[0] : `${r[0]} and ${r[1]}`, `${o} ${n === 1 ? t ? "is" : "was" : t ? "are" : "were"} in the call`;
}
function ke(e, t) {
	let n = e ?? "";
	if (n === "room-setting-off") {
		let e = t?.startsWith("room:") ? t.slice(5) : "";
		return e ? `Not recorded — recording is off for #${e}; a room admin can turn it on under Manage #${e}.` : "Not recorded — recording is off for this room; a room admin can turn it on.";
	}
	return n.startsWith("dm-not-opted-in") ? "Not recorded — both people must turn on 'Record my DM calls' in their profile." : "Not recorded.";
}
function Ae(e) {
	if (!Number.isFinite(e) || e < 0) return "0:00";
	let t = Math.floor(e / 1e3), n = Math.floor(t / 3600), r = Math.floor(t % 3600 / 60), i = t % 60, a = n > 0 ? String(r).padStart(2, "0") : String(r);
	return `${n > 0 ? `${n}:` : ""}${a}:${String(i).padStart(2, "0")}`;
}
function je(e) {
	if (typeof e == "number") return Number.isFinite(e) ? e : null;
	if (typeof e == "string" && e) {
		let t = Date.parse(e);
		return Number.isFinite(t) ? t : null;
	}
	return null;
}
function Me(e, t) {
	let n = je(e), [r, i] = z(() => Date.now());
	return L(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function Ne(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Pe({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = Me(o, _), y = !_ && typeof a == "number" ? De(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = Ne(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = Oe(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : Oe(r, !1)), /* @__PURE__ */ H("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ H("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ H("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ V("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ V("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ H("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ V("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ H("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ V("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${Ae(v)}`
							}),
							_ && /* @__PURE__ */ V("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ V("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ V("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: ke(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ V("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ V(ee, {
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
			!_ && c && l && /* @__PURE__ */ V("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ V("button", {
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
var Fe = {
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
function Ie(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Le(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function G(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Re({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ H("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ V("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ V(C, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ H("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ V("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ V("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ V("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function ze({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: f = !1, expiresAt: p, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: b, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let O = o ?? a.length, k = u === "gone", A = u !== "saving" && u !== "failed" && !k && !!g, j = () => {
		g?.(n);
	}, M = c != null && c > 0 ? De(c) : "", N = Ie(s), P = G(a, O), { state: F, label: te } = Fe[u], I = [
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
		...y && !k ? [{
			"data-testid": `${D}-menu-pin`,
			label: h ? "Unpin" : "Pin",
			onSelect: () => y(n)
		}] : [],
		...b && A ? [{
			"data-testid": `${D}-menu-download`,
			label: "Download",
			onSelect: () => b(n)
		}] : []
	], L = I.length ? [{
		items: I,
		"data-testid": `${D}-menu-items`
	}] : [];
	return /* @__PURE__ */ H("div", {
		"data-testid": D,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", E),
		children: [/* @__PURE__ */ H("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ H("button", {
				"data-ui-part": "",
				type: "button",
				onClick: A ? j : void 0,
				disabled: !A,
				"aria-label": A ? `Play ${r.toLowerCase()}` : `${r}: ${te.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", A ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ V("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ V(Re, {
						participants: a,
						total: O,
						testId: D
					}),
					A && /* @__PURE__ */ V("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ V("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ V("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ V("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					M && /* @__PURE__ */ V("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${D}-duration`,
						children: M
					})
				]
			}), /* @__PURE__ */ H("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ H("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ H("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ V("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${D}-title`,
								children: r
							}), h && /* @__PURE__ */ V("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ V(m, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ H("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", i]
						}),
						O > 0 && /* @__PURE__ */ H("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ V(ee, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ V("span", {
								className: "truncate text-xs text-text-tertiary",
								children: P
							})]
						}),
						/* @__PURE__ */ H("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ V(S, {
									state: F,
									label: te,
									size: "sm",
									"data-testid": `${D}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ V(S, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${D}-transcript`
								}),
								u === "ready" && f && /* @__PURE__ */ V(S, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${D}-summary`
								}),
								N && /* @__PURE__ */ V("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${D}-when`,
									children: N
								})
							]
						})
					]
				}), L.length > 0 && /* @__PURE__ */ V(x, {
					trigger: /* @__PURE__ */ V("span", {
						className: "tracking-wide",
						children: "⋯"
					}),
					triggerLabel: "More options",
					triggerTitle: "More options",
					triggerClassName: "h-7 rounded-md px-2 text-text-secondary hover:bg-surface-hover",
					align: "end",
					sections: L,
					"data-testid": `${D}-menu`
				})]
			})]
		}), p && u !== "failed" && !k && /* @__PURE__ */ H("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ H("span", { children: ["Set to expire ", Le(p)] }), w && /* @__PURE__ */ V(t, {
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
function q(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function Be(e, t) {
	let n = e.names && e.names.length > 0 ? K(e.names) : e.userIds.length > 0 ? K(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = q(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Ve({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = Be(t, n);
	return /* @__PURE__ */ H("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ V("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ V("time", {
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
var J = {
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
}, He = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function Ue(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Y(e) {
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
		default: return J[e.phase]?.label ?? "Running…";
	}
}
function X(e) {
	let t = !!e && (J[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = z(() => Date.now());
	return L(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var Z = [
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
], We = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, Ge = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Ke = 6;
function qe(e) {
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
function Je(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = qe(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var Q = "shrink-0 whitespace-nowrap underline underline-offset-2", Ye = `${Q} hidden text-text-tertiary hover:text-text-primary @md:inline`;
function Xe(e, t = 60) {
	let n = e.trim().replace(/\s+/g, " ");
	return n.length > t ? `${n.slice(0, t - 1).trimEnd()}…` : n;
}
function Ze(e) {
	return typeof e == "number" ? String(e + 1) : "?";
}
function Qe(e) {
	let t = e.text ?? "";
	switch (e.op) {
		case "setTitle": return `Renamed to “${Xe(t)}”`;
		case "appendBlock":
		case "insertBlock": return e.kind === "horizontalRule" ? "Added a divider" : e.kind === "heading" ? t.trim() ? `Added heading “${Xe(t)}”` : "Added an empty heading" : t.trim() ? `Added: “${Xe(t)}”` : "Added an empty block";
		case "replaceBlock": return `Rewrote block ${Ze(e.index)}`;
		case "deleteBlock": return `Removed block ${Ze(e.index)}`;
		case "appendMacro": return t ? `Added a ${Xe(t, 40)}` : "Added a macro";
		case "copyBlock": return `Carried block ${Ze(e.index)}`;
		case "setDocumentType": return `Type: ${Xe(t, 40)}`;
		case "skip": return t ? Xe(t, 120) : "Skipped";
		default: return t ? `${e.op}: ${Xe(t)}` : e.op;
	}
}
function $e(e) {
	let t = Date.parse(e);
	return Number.isNaN(t) ? null : new Date(t).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
function et(e, t) {
	let n = Date.parse(t) - Date.parse(e);
	if (Number.isNaN(n) || n < 0) return null;
	let r = Math.round(n / 1e3);
	return r < 600 ? `${r}s` : `${Math.round(r / 60)}m`;
}
function tt(e) {
	if (!e?.startedAt) return null;
	let t = $e(e.startedAt);
	if (!t) return null;
	let n = e.completedAt ? et(e.startedAt, e.completedAt) : null;
	return n ? `started ${t} · ${n}` : `started ${t}`;
}
var nt = {
	pending: "bg-border",
	running: "animate-pulse bg-info",
	completed: "bg-success",
	failed: "bg-danger",
	skipped: "bg-border",
	awaiting: "bg-warning"
};
function rt({ runId: t, loop: n, clock: r, onOpenLab: i, testId: a }) {
	let o = J[n.phase] ?? J.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ H("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ V("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: Y(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ V("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: Ue(r)
			}),
			c > 0 && /* @__PURE__ */ H("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ H("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						P(l),
						" / ",
						P(c)
					]
				}), /* @__PURE__ */ V(D, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ V("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => i(t),
				className: e(Q, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ V("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ H("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", He[t.status] ?? He.pending)
			}), /* @__PURE__ */ V("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function it({ runId: a, instruction: o, agentName: s, requestedBy: l, command: u = "/doc", status: d, onOpenDocument: p, onOpenRun: m, result: h, onOpenResult: _, onDecide: v, suggestion: y, onReview: b, onRetry: x, documentTitle: S, defaultExpanded: C = !1, loop: w, onOpenLab: T, className: E, "data-testid": D = "agent-run-card" }) {
	let O = d?.phase ?? "received", [k, ee] = z(C), A = X(w), j = O === "completed" ? d?.suggestion ?? y : void 0, M = O === "completed" ? d?.review : void 0, N = !!j && !M, P = O === "completed" && d?.noop === !0, F = O === "completed" ? d?.result ?? h : void 0, te = F?.kind === "link" && F.label ? F.label : "Open", I = p && !(F?.kind === "document" && _), L = We[O], ne = O === "failed" || O === "rejected", R = ne ? "danger" : M ? M.decision === "accept" ? "success" : "neutral" : P ? "warning" : O === "completed" ? j ? "warning" : "success" : O === "awaiting_approval" ? "warning" : "info", B = M ? "Reviewed" : N ? "Suggested" : P ? "No change" : Ge[O], re = M ? M.byName ?? M.by : void 0, ie = M ? `${M.decision === "accept" ? "Accepted" : "Rejected"} by ${re}` : void 0, ae = O === "awaiting_approval", U = O === "failed" ? Je(d?.details?.error ?? d?.detail, u) : void 0, oe = O === "running" ? d?.stepLabel ? `${s} — ${d.stepLabel}` : `${s} is working via the pipeline` : ae ? `Waiting for approval${d?.detail ? ` — ${d.detail}` : ""}` : U ? U.summary : ie ?? d?.detail ?? (N && d?.suggestion ? `${d.suggestion.applied} ${d.suggestion.applied === 1 ? "change" : "changes"} suggested` : O === "received" ? "Received" : B), W = d?.details, se = W?.ops ?? [], ce = W?.steps ?? [], le = W?.document?.title || S || "Document", ue = !!W?.document || !!p, de = U ? U.technical : W?.error, fe = tt(W), pe = `${D}-details-${a}`, me = !!(N && j && b || ae && v || F && _ || F?.kind === "link" && !_);
	return /* @__PURE__ */ H("div", {
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
			/* @__PURE__ */ H("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ V(g, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ H("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${D}-instruction`,
						children: [
							/* @__PURE__ */ V("span", {
								className: "font-mono text-text-tertiary",
								children: u
							}),
							" ",
							o
						]
					}),
					w ? /* @__PURE__ */ V(r, {
						size: "xs",
						tone: J[w.phase]?.tone ?? "info",
						"data-testid": `${D}-phase`,
						children: J[w.phase]?.label ?? w.phase
					}) : /* @__PURE__ */ V(r, {
						size: "xs",
						tone: R,
						"data-testid": `${D}-phase`,
						children: B
					}),
					/* @__PURE__ */ V(i, {
						size: "sm",
						"aria-label": k ? "Hide details" : "Show details",
						"aria-expanded": k,
						"aria-controls": k ? pe : void 0,
						onClick: () => ee((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${D}-toggle`,
						icon: /* @__PURE__ */ V(f, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", k && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			w ? /* @__PURE__ */ V(rt, {
				runId: a,
				loop: w,
				clock: A,
				onOpenLab: T,
				testId: D
			}) : /* @__PURE__ */ H("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ H("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", me && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ V("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${D}-steps`,
							children: Z.map((t, n) => {
								let r = ne ? n < L : n < L || n === L && O === "completed", i = n === L && O !== "completed" && !ne, a = ne && n === L;
								return /* @__PURE__ */ H("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ V("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? P && n === L ? "bg-warning" : "bg-success" : i ? ae ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ V("span", {
										className: "sr-only",
										children: a ? B : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ V("span", {
							className: e("min-w-0 flex-1 truncate", M && (M.decision === "accept" ? "text-success" : "text-text-tertiary"), O === "failed" && "text-danger", P && "text-warning-fg"),
							"data-testid": `${D}-detail`,
							"data-review": M?.decision,
							title: U ? U.summary : d?.detail,
							children: oe
						})]
					}),
					N && j && b && /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${D}-review`,
						children: [/* @__PURE__ */ V(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => b(a, "accept", {
								key: j.key,
								...j.documentId ? { documentId: j.documentId } : {}
							}),
							"data-testid": `${D}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ V(t, {
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
					ae && v && /* @__PURE__ */ H("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${D}-decide`,
						children: [/* @__PURE__ */ V(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(a, "approve"),
							"data-testid": `${D}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ V(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => v(a, "reject"),
							"data-testid": `${D}-reject`,
							children: "Reject"
						})]
					}),
					O === "failed" && x && /* @__PURE__ */ V(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => x(a),
						"data-testid": `${D}-retry`,
						children: "Retry"
					}),
					F && _ && /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => _(F),
						className: e(Q, "font-medium text-info"),
						"data-testid": `${D}-open-result`,
						"data-result-kind": F.kind,
						children: te
					}),
					F?.kind === "link" && !_ && n(F.href) && /* @__PURE__ */ V("a", {
						href: n(F.href) ?? void 0,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Q, "font-medium text-info"),
						"data-testid": `${D}-open-result`,
						"data-result-kind": "link",
						children: te
					}),
					m && /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => m(a),
						className: Ye,
						"data-testid": `${D}-open-run`,
						children: "Open run"
					}),
					I && /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						type: "button",
						onClick: p,
						className: Ye,
						"data-testid": `${D}-open-document`,
						children: "Open document"
					})
				]
			}),
			k && /* @__PURE__ */ H("div", {
				id: pe,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${D}-details`,
				children: [
					ue && /* @__PURE__ */ H("div", {
						className: "flex items-start gap-2",
						"data-testid": `${D}-details-document`,
						children: [
							/* @__PURE__ */ V(c, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ H("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ V("span", {
									className: "block truncate font-medium text-text-primary",
									children: le
								}), W?.document?.snippet && /* @__PURE__ */ V("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${D}-details-snippet`,
									children: W.document.snippet
								})]
							}),
							p && /* @__PURE__ */ V(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: p,
								"data-testid": `${D}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					se.length > 0 && /* @__PURE__ */ H("div", {
						"data-testid": `${D}-details-ops`,
						children: [
							/* @__PURE__ */ V("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ V("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: se.slice(0, Ke).map((e, t) => /* @__PURE__ */ V("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: Qe(e)
								}, t))
							}),
							se.length > Ke && /* @__PURE__ */ H("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${D}-details-more-ops`,
								children: [
									"+",
									se.length - Ke,
									" more"
								]
							})
						]
					}),
					ce.length > 0 && /* @__PURE__ */ V("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${D}-details-steps`,
						children: ce.map((t) => /* @__PURE__ */ H("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ V("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", nt[t.status] ?? nt.pending)
							}), /* @__PURE__ */ V("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					de && /* @__PURE__ */ H("div", {
						"data-testid": `${D}-details-error-block`,
						children: [/* @__PURE__ */ V("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ V("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${D}-details-error`,
							children: de
						})]
					}),
					/* @__PURE__ */ H("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							m && /* @__PURE__ */ V("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => m(a),
								className: e(Q, "hover:text-text-primary"),
								"data-testid": `${D}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							F && _ && /* @__PURE__ */ V("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => _(F),
								className: e(Q, "font-medium text-info"),
								"data-testid": `${D}-details-open-result`,
								children: te
							}),
							fe && /* @__PURE__ */ V("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${D}-details-timings`,
								children: fe
							})
						]
					})
				]
			})
		]
	});
}
function at(e) {
	if (!e || e.kind !== "agent-run") return null;
	let t = typeof e.runId == "string" ? e.runId : "", n = typeof e.documentId == "string" ? e.documentId : "";
	if (!t) return null;
	let r = ot(e.result);
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
function ot(e) {
	if (!e || typeof e != "object") return null;
	let t = e;
	if (t.kind === "document" && typeof t.documentId == "string" && t.documentId) return {
		kind: "document",
		documentId: t.documentId
	};
	if (t.kind === "link" && typeof t.href == "string" && n(t.href)) return {
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
function st(e, t) {
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
function $(e) {
	let t = e.mine ? ["You", ...e.names] : [...e.names];
	return t.length === 0 ? "" : t.length === 1 ? t[0] : t.length <= 3 ? `${t.slice(0, -1).join(", ")} and ${t[t.length - 1]}` : `${t.slice(0, 2).join(", ")} and ${t.length - 2} others`;
}
function ct({ reactions: t, currentUserId: n, onToggle: r, className: i, "data-testid": a = "reaction-chips" }) {
	let o = ne(() => st(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ V("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ H("button", {
			"data-ui-part": "",
			type: "button",
			"data-testid": "reaction-chip",
			"data-emoji": t.emoji,
			"data-mine": String(t.mine),
			"aria-pressed": t.mine,
			"aria-label": `${t.emoji} ${t.count}${t.mine ? ", including you" : ""}`,
			title: $(t),
			onClick: () => r(t.emoji),
			className: e("flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-xs leading-none", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", t.mine ? "border-primary bg-primary-bg text-primary-fg" : "border-border bg-surface text-text-secondary hover:bg-surface-hover"),
			children: [/* @__PURE__ */ V("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ V("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function lt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = z(e), [s, c] = z(!1), [l, u] = z(null), d = R(null);
	L(() => {
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
	return /* @__PURE__ */ H("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ V(E, {
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
			/* @__PURE__ */ H("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ V("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ V(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ V(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ V("p", {
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
function ut(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function dt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = ut(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ V("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ V("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ H("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ V(B, { children: o ? /* @__PURE__ */ V("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ V("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ V("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ H("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ V("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ V("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: te(t.size)
			})]
		})]
	}) : /* @__PURE__ */ V("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V(mt, {}), /* @__PURE__ */ H("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ V("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ V("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: te(t.size)
				})]
			})] })
		})
	});
}
function ft(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function pt({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : te(o);
	return /* @__PURE__ */ H("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ V("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ V(mt, {}),
			/* @__PURE__ */ H("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ H("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ V("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ V("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ V("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ V("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ V("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ V("button", {
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
function mt() {
	return /* @__PURE__ */ V("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ V("path", {
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
function ht({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = fe(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ H("div", {
		role: "separator",
		"aria-label": pe(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ V("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
//#endregion
//#region src/components/social/AssistantMark.tsx
var gt = {
	16: "h-4 w-4 rounded",
	20: "h-5 w-5 rounded-md",
	24: "h-6 w-6 rounded-md",
	32: "h-8 w-8 rounded-lg"
}, _t = {
	16: 12,
	20: 14,
	24: 16,
	32: 18
};
function vt({ icon: t, size: n = 20, label: r, className: i }) {
	return /* @__PURE__ */ V("span", {
		"data-testid": "assistant-mark",
		...r ? {
			role: "img",
			"aria-label": r
		} : { "aria-hidden": !0 },
		className: e("inline-grid shrink-0 place-items-center border border-accent-border bg-accent-bg text-accent-fg", gt[n], i),
		children: t ?? /* @__PURE__ */ V(p, { size: _t[n] })
	});
}
function yt(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function bt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function xt(e) {
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
function St(e) {
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
var Ct = {
	attachments: "files",
	html: "formatting",
	mentions: "mentions",
	replyTo: "the quoted reply"
};
function wt(e) {
	if (!e || e._truncated !== !0) return null;
	let t = (Array.isArray(e._droppedKeys) ? e._droppedKeys : []).filter((e) => typeof e == "string");
	return {
		droppedKeys: t,
		labels: t.map((e) => Ct[e] ?? e)
	};
}
function Tt(e) {
	return `Forwarded from ${e.channelLabel?.trim() || e.channel || "another conversation"} — ${e.author}`;
}
function Et(e) {
	return `${Tt(e)}:`;
}
function Dt(e, t) {
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
function Ot(e, t, n) {
	if (!t) return {
		body: e,
		html: n,
		stripped: !1
	};
	let r = Et(t);
	if (n) {
		let t = Dt(n, r);
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
function kt(e) {
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
function At(e) {
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
function jt(e) {
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
function Mt(e) {
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
function Nt(e) {
	if (e) return e.kind === "message" ? e.message.timestamp : e.local.timestamp;
}
function Pt(e, t) {
	let n = e.map((e) => ({
		kind: "message",
		message: e
	}));
	if (t.length === 0) return n;
	let r = [...t].sort((e, t) => (Date.parse(e.timestamp) || 0) - (Date.parse(t.timestamp) || 0));
	for (let e of r) {
		let t = Date.parse(e.timestamp), r = n.length;
		for (; r > 0 && !Number.isNaN(t) && Date.parse(Nt(n[r - 1]) ?? "") > t;) --r;
		n.splice(r, 0, {
			kind: "local",
			local: e
		});
	}
	return n;
}
function Ft(e) {
	return (e.kind === "message" ? e.message.id : e.local.id) || void 0;
}
function It(e) {
	let t = (e.kind === "message" ? e.message.metadata : e.local.metadata)?.replyTo;
	return typeof t?.messageId == "string" && t.messageId ? t.messageId : void 0;
}
function Lt(e) {
	let t = /* @__PURE__ */ new Set();
	for (let n of e) {
		let e = Ft(n);
		e && t.add(e);
	}
	let n = /* @__PURE__ */ new Map();
	for (let r of e) {
		let e = Ft(r), i = It(r);
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
		let e = Ft(t);
		if (e && r(e) !== e) continue;
		let n = {
			root: t,
			replies: []
		};
		i.push(n), e && a.set(e, n);
	}
	for (let t of e) {
		let e = Ft(t);
		if (!e) continue;
		let n = r(e);
		n !== e && a.get(n)?.replies.push(t);
	}
	return i;
}
var Rt = 3, zt = 2, Bt = 3e5;
function Vt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Ht(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(at(e.metadata) || jt(e.metadata) || At(e.metadata) || xt(e.metadata) || Mt(e.metadata));
}
function Ut(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = Vt(r);
	if (!i || i !== Vt(n) || !Ht(n) || !Ht(r) || r.editedAt || de(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Bt;
}
function Wt(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Gt({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ H("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ V("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ V("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Kt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function qt(e) {
	return e.displayName || e.userId;
}
function Jt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = Vt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function Yt(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function Xt({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, dock: u, currentUserId: f, reactionsFor: p, onToggleReaction: h, onReply: g, reply: y, onCancelReply: b, onForwardMessage: x, onCopyLink: S, onTogglePin: E, onEditMessage: D, onDeleteMessage: O, canEditMessage: k, canDeleteMessage: ee, pinnedMessageIds: P, onJumpToMessage: te, highlightedMessageId: ne, threaded: re = !1, postRhythm: ae = "channel", alignOwnMessages: U = !0, documentEditors: oe, documentUnavailable: se, callParticipants: ce, agentRunStatus: le, onOpenRun: ue, agentLoopStatus: fe, onOpenLab: pe, onOpenResult: he, onDecideRun: ge, onReviewRun: ve, onRetryRun: ye, onJoinCall: be, onOpenRecording: xe, onCopyRecordingLink: Ce, onShareRecording: Te, onDownloadRecording: De, onOpenRecordingTranscript: Oe, onManageRecordingExpiry: ke, recordingStatus: Ae, onOpenDocument: je, renderMessageReferences: Me, renderSystemMessage: Ne, renderMessageBody: Fe, isAssistantMessage: Ie, assistantMark: Le, tone: G = "light", showHeader: Re, fill: K, flushComposer: q = !1, contentAlign: Be = "end", onLoadMore: J, hasMore: He, loadingMore: Ue = !1, onSendFiles: Y, transfers: X = [], currentActor: Z, onCancelTransfer: We, attachmentSrc: Ge, onOpenAttachment: Ke, acceptFiles: qe, maxFileSize: Je, onFileError: Q, readReceipts: Ye, readReceiptsEnabled: Xe = !0, unreadFrom: Ze, emojis: Qe = N }) {
	let [$e, et] = z(null), [tt, nt] = z(null), rt = R(null), [ot, st] = z(null), $ = G === "dark", ut = w(), mt = Re ?? !(ut?.hasHeader ?? !1), gt = K ?? ut?.fillsHeight ?? !1, [_t, Ct] = z(""), Et = R(null), Dt = R(null), It = !!J && He !== !1, Bt = R(null), Vt = R(null), [Ht, Xt] = z(!1), Qt = !!Y && !a, $t = Pt(n, r), en = re ? Lt($t) : null, [tn, nn] = z(() => /* @__PURE__ */ new Set());
	function rn(e) {
		nn((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let an = R(void 0);
	if (Ze !== void 0) {
		let e = an.current;
		if (e === void 0) an.current = Ze;
		else {
			let t = Date.parse(Ze), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && (an.current = Ze);
		}
	}
	let on = an.current, sn = on === void 0 ? -1 : Wt(en ? en.map((e) => Nt(e.root)) : $t.map((e) => Nt(e)), on), cn = Ye !== void 0, ln = Ye ?? [], un = Xe && f ? f : void 0, dn = (() => {
		if (un) for (let e = $t.length - 1; e >= 0; --e) {
			let t = $t[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== un || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), fn = dn && un ? Kt(ln, un, dn.timestamp) : [], pn = fn.length === 1 && !!un && Jt(n, ln, un) === 1;
	function mn() {
		if (!dn) return null;
		if (fn.length === 0) return cn ? /* @__PURE__ */ V("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", U ? "justify-end pr-1" : "justify-start pl-7", $ ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ V("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = fn.map(qt), n = fn.slice(0, 3);
		return /* @__PURE__ */ H("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", U ? "justify-end pr-1" : "justify-start pl-7", $ ? "text-white/50" : "text-text-tertiary"),
			children: [
				fn.length > 1 && /* @__PURE__ */ V("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ V(C, {
						name: qt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ V("span", {
					"data-testid": "chat-read-receipts-label",
					children: pn ? "Seen" : `Seen by ${fn.length}`
				}),
				/* @__PURE__ */ V("span", {
					style: T,
					children: pn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [hn, gn] = z(0), [_n, vn] = z(!1), yn = R(!0), bn = R(n.length), xn = n.length + r.length + X.length, Sn = R(null), [Cn, wn] = z(""), Tn = R(null), En = R(!1), Dn = R(0);
	L(() => {
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
		wn(bt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, f]);
	function On() {
		let e = Et.current;
		e && (e.scrollTop = e.scrollHeight, yn.current = !0, gn(0));
	}
	function kn() {
		let e = Et.current;
		if (!e) return;
		let t = yt(e);
		yn.current = t, t && gn(0), vn(e.scrollTop > 8);
	}
	L(() => {
		let e = Et.current, t = bn.current, n = xn - t;
		if (bn.current = xn, !e) return;
		let r = Sn.current;
		if (r && n > 0) {
			Sn.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		yn.current ? (e.scrollTop = e.scrollHeight, gn(0), vn(e.scrollTop > 8)) : n > 0 && gn((e) => e + n);
	}, [xn]);
	function An() {
		let e = Et.current;
		e && (Sn.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), J?.();
	}
	L(() => () => {
		Dt.current && clearTimeout(Dt.current);
	}, []);
	function jn() {
		let e = _t.trim();
		!e || a || (Dt.current && clearTimeout(Dt.current), Dt.current = null, o?.(!1), yn.current = !0, i(e), Ct(""));
	}
	function Mn(e) {
		!Qt || e.length === 0 || (yn.current = !0, Y?.(e));
	}
	function Nn(e) {
		if (!Qt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Mn(t));
	}
	function Pn(e) {
		Ct((t) => t + e), Xt(!1);
	}
	function Fn() {
		a || (o?.(!0), Dt.current && clearTimeout(Dt.current), Dt.current = setTimeout(() => o?.(!1), 2e3));
	}
	function In(e) {
		Fn(), e.key === "Enter" && !a && _t.trim() && jn();
	}
	function Ln(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === sn ? /* @__PURE__ */ V(Gt, { tone: G }) : null, l = !!Ne && a?.kind === "message" && !a.message.deletedAt && a.message.metadata?.deleted !== !0 && Ne(a.message) != null, u = !c && !l && Ut(a, n), d = !o && de(s, i) ? /* @__PURE__ */ V(ht, {
			timestamp: s,
			tone: G,
			className: r === 0 ? "pt-0" : void 0
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = at(r.metadata);
			return /* @__PURE__ */ H(I, { children: [
				d,
				c,
				/* @__PURE__ */ V("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ V(_e, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: G,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ H(B, { children: [
							i ? /* @__PURE__ */ V(it, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: le?.(i.runId),
								onOpenDocument: je && i.documentId ? () => je(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: ue,
								result: i.result,
								onOpenResult: he,
								onDecide: ge,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: ve,
								onRetry: ye,
								...Yt(i, fe, pe)
							}) : r.body == null ? /* @__PURE__ */ V(Se, { text: r.content }) : /* @__PURE__ */ V("div", {
								"data-testid": "chat-local-message-body",
								className: "min-w-0",
								children: typeof r.body == "function" ? r.body() : r.body
							}),
							/* @__PURE__ */ V("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", $ ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ V("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ V(t, {
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
		let { message: _ } = n, v = _.displayName ?? _.clientId.slice(0, 8), y = _.attachments ?? [], b = _.metadata?.html, C = typeof b == "string" ? b : void 0, w = kt(_.metadata), T = Ot(_.content, w, C), A = /* @__PURE__ */ V(Se, {
			html: T.html,
			text: T.body
		}), j = xt(_.metadata), M = at(_.metadata), N = At(_.metadata), L = jt(_.metadata), R = Mt(_.metadata), z = wt(_.metadata), re = St(_.metadata), ie = M ? /* @__PURE__ */ V(it, {
			runId: M.runId,
			instruction: M.instruction || _.content.replace(/^\/doc\s*/i, ""),
			command: M.command,
			agentName: M.agentName,
			requestedBy: _.displayName,
			status: le?.(M.runId),
			onOpenDocument: je && M.documentId ? () => je(M.documentId) : void 0,
			documentTitle: M.documentTitle,
			onOpenRun: ue,
			result: M.result,
			onOpenResult: he,
			onDecide: ge,
			suggestion: M.suggestionKey ? {
				key: M.suggestionKey,
				...M.documentId ? { documentId: M.documentId } : {}
			} : void 0,
			onReview: ve,
			onRetry: ye,
			...Yt(M, fe, pe)
		}) : L ? (() => {
			let e = Ae?.(L.recordingId), t = {
				...L,
				...e ?? {}
			};
			return /* @__PURE__ */ V(ze, {
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
				pinned: !!_.id && !!P?.has(_.id),
				onOpen: xe,
				onCopyLink: Ce,
				onShare: Te,
				onDownload: De,
				onOpenTranscript: Oe,
				onManageExpiry: ke,
				onTogglePin: E ? () => E(_) : void 0
			});
		})() : N ? /* @__PURE__ */ V(Pe, {
			callId: N.callId,
			startedBy: (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			participants: ce?.(N.callId) ?? N.participants,
			live: N.live,
			durationMs: N.durationMs,
			startedAt: N.startedAt,
			outcome: N.outcome,
			recordingId: N.recordingId,
			onOpenRecording: xe,
			audioOnly: N.audioOnly,
			recorded: N.recorded,
			notRecordedReason: N.notRecordedReason,
			lobbyName: N.lobbyName,
			onJoin: be
		}) : j ? /* @__PURE__ */ V(we, {
			documentId: j.documentId,
			title: j.title || _.content,
			icon: j.icon,
			createdBy: j.createdBy ?? (typeof _.metadata?.displayName == "string" ? _.metadata.displayName : void 0) ?? _.displayName,
			editors: oe?.(j.documentId) ?? [],
			onOpen: je,
			unavailable: se?.(j.documentId)
		}) : y.length === 0 ? A : /* @__PURE__ */ H(B, { children: [(_.content || C) && A, y.map((e) => /* @__PURE__ */ V(dt, {
			attachment: e,
			src: Ge?.(e),
			onOpen: Ke
		}, e.id))] }), ae = _.deletedAt || _.metadata?.deleted === !0 ? null : Fe?.(_) ?? null, Re = ae ?? ie, K = _.id ?? "", q = K && p ? p(K) : [], Be = _.metadata?.replyTo, J = !!o && !!Be && Be.messageId === o.rootId, He = !!Be && !J, Ue = !!K && !!P?.has(K), Y = !!f && _.userId === f, X = _.metadata?.system === !0, Z = !!_.deletedAt || _.metadata?.deleted === !0, We = !!(M || L || N || j || R), qe = ae != null || !!(M || L || N || j || y.length > 0), Je = !Z && !X && !We && !!K, Q = Je && (k ? k(_) : Y), Ye = Je && (ee ? ee(_) : Y), Xe = Q || Ye, Ze = !!K && !Z && !X && !We && y.length === 0 && !!_.content.trim(), Qe = Z ? null : Ne?.(_) ?? null, tt = !Z && Ie?.(_) === !0, ot = Le ?? /* @__PURE__ */ V(vt, {}), ut = Q && !!D && $e === K, ft = /* @__PURE__ */ H(B, { children: [
			He && Be && /* @__PURE__ */ V(F, {
				quote: Be,
				onJump: te,
				className: "mb-1"
			}),
			w && /* @__PURE__ */ H("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Tt(w), w.timestamp ? me(w.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ V("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					T.stripped ? Tt(w) : "Forwarded"
				]
			}),
			Ue && /* @__PURE__ */ H("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ V(m, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			Z ? /* @__PURE__ */ V("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : ut ? /* @__PURE__ */ V(lt, {
				initialText: _.content,
				onSave: async (e) => {
					await D(_, e), et(null);
				},
				onCancel: () => et(null)
			}) : Re,
			!Z && Me?.(_),
			!Z && re.length > 0 && /* @__PURE__ */ V("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: re.map((e) => /* @__PURE__ */ V(Ee, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: je,
					unavailable: se?.(e.id)
				}, e.id))
			}),
			!Z && z && /* @__PURE__ */ H("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					z.labels.length > 0 ? `Too large to send: ${z.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!Z && q.length > 0 && f && h && /* @__PURE__ */ V(ct, {
				reactions: q,
				currentUserId: f,
				onToggle: (e) => h(K, e)
			})
		] });
		return Qe != null && tt ? /* @__PURE__ */ H(I, { children: [
			d,
			c,
			/* @__PURE__ */ H("div", {
				role: "status",
				"data-testid": "chat-system-line",
				"data-voice": "assistant",
				"data-message-id": K || void 0,
				className: "flex items-start gap-2 px-2 py-1 text-xs",
				children: [/* @__PURE__ */ V("span", {
					className: "mt-0.5 flex w-5 shrink-0 justify-center",
					children: ot
				}), /* @__PURE__ */ V("div", {
					"data-testid": "chat-assistant-notice",
					className: e("min-w-0 max-w-[30rem] break-words rounded-xl border px-2.5 py-1", G === "dark" ? "border-accent/40 bg-accent/20 text-white/80" : "border-accent/25 bg-accent/8 text-text-secondary"),
					children: Qe
				})]
			})
		] }, _.id ?? r) : Qe == null ? R ? /* @__PURE__ */ H(I, { children: [
			d,
			c,
			/* @__PURE__ */ V(Ve, {
				membership: R,
				fallbackText: _.content,
				timestamp: _.timestamp,
				"data-testid": "membership-notice"
			})
		] }, _.id ?? r) : /* @__PURE__ */ H(I, { children: [
			d,
			c,
			/* @__PURE__ */ V("div", {
				"data-testid": "chat-message",
				"data-message-id": K || void 0,
				"data-voice": tt ? "assistant" : void 0,
				"data-continues": u ? "true" : void 0,
				title: u ? me(_.timestamp) : void 0,
				className: e("group relative rounded-md px-2 transition-colors hover:bg-surface-hover", K && K === ne && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ V(_e, {
					actionsLayout: "menu",
					className: u ? "py-0.5" : void 0,
					author: v,
					content: ft,
					timestamp: u ? "" : _.timestamp,
					editedAt: Z ? void 0 : _.editedAt,
					avatarUrl: _.avatarUrl,
					assistant: tt,
					avatar: tt ? ot : void 0,
					hideAvatar: u,
					hideAuthor: u,
					tone: G,
					mine: Y && U,
					contentLayout: qe ? "block" : "inline",
					actions: K && !Z && !ut && (h || Xe || Ze && x || !X && (g || E || S)) ? /* @__PURE__ */ V(W, {
						className: "max-w-full flex-wrap",
						onReact: h ? (e) => h(K, e) : void 0,
						onOpenReactionPicker: h ? (e) => {
							rt.current = e, nt(K);
						} : void 0,
						onReply: g && !X ? () => g(o?.rootMessage ?? _) : void 0,
						onForward: x && Ze ? (e) => x(_, e) : void 0,
						onCopyLink: S && !X && K ? () => S(_) : void 0,
						onTogglePin: E && !X ? () => E(_) : void 0,
						pinned: !!_.id && !!P?.has(_.id),
						onEdit: Q && D ? () => et(K) : void 0,
						onDelete: Ye && O ? () => st(K) : void 0
					}) : void 0
				})
			}),
			!!dn && K === dn.id && mn()
		] }, _.id ?? r) : /* @__PURE__ */ H(I, { children: [
			d,
			c,
			/* @__PURE__ */ V("div", {
				role: "status",
				"data-testid": "chat-system-line",
				"data-message-id": K || void 0,
				className: "flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary",
				children: Qe
			})
		] }, _.id ?? r);
	}
	function Rn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function zn(e) {
		if (!g || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !Mt(t.metadata)) return t;
	}
	function Bn(t, n, r) {
		let i = Nt(r?.root), a = ae === "chat", o = r && r.replies.length === 0 && (a || !zn(r.root)) ? r.root : void 0, s = Ln(t.root, n, i, o), c = Nt(t.root) ?? "", l = !a && n > 0 && n !== sn && !de(c, i) ? /* @__PURE__ */ V("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", $ ? "border-white/10" : "border-border-subtle")
		}) : null, u = t.replies.length > 0 ? zn(t.root) : null;
		if (t.replies.length === 0 && !u) return l ? /* @__PURE__ */ H(I, { children: [l, s] }, `post:${Ft(t.root) ?? n}`) : s;
		let d = Ft(t.root) ?? "", f = t.root.kind === "message" ? t.root.message : void 0, p = !!d && t.replies.length > Rt, m = !p || tn.has(d), h = m ? t.replies : t.replies.slice(0, zt), _ = t.replies.length - h.length, v = [...new Set(t.replies.slice(h.length).map(Rn))].slice(0, 3);
		return /* @__PURE__ */ H(I, { children: [l, /* @__PURE__ */ H("div", {
			"data-testid": "chat-thread",
			"data-thread-root": d || void 0,
			className: "group/post",
			children: [
				s,
				t.replies.length > 0 && /* @__PURE__ */ H("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", $ ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => Ln(e, t, void 0, h[t - 1], {
						rootId: d,
						...f ? { rootMessage: f } : {}
					})), p && /* @__PURE__ */ H("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => rn(d),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && v.length > 0 && /* @__PURE__ */ V("span", {
							className: "flex items-center gap-0.5",
							children: v.map((e) => /* @__PURE__ */ V(C, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${_} more ${_ === 1 ? "reply" : "replies"}`]
					})]
				}),
				u && /* @__PURE__ */ V("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Rn(t.root)}`,
						onClick: () => g?.(u),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${d || n}`);
	}
	let Vn = /* @__PURE__ */ H("div", {
		"data-testid": "chat-panel",
		className: e(gt ? e("flex h-full min-h-0 flex-col", q && l ? "px-0 pb-0" : "px-[var(--ui-content-gutter,1rem)] pb-3") : e("border rounded mt-4", q && l ? "px-0 pt-3 pb-0" : "p-3", $ ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			mt && /* @__PURE__ */ H("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", q && l && "mx-[var(--ui-content-gutter,1rem)]", $ ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ V("span", {
				style: T,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: Cn
			}),
			/* @__PURE__ */ H("div", {
				className: e("relative flex flex-col mb-2", gt ? "min-h-0 flex-1" : "", q && l && "mx-[var(--ui-content-gutter,1rem)]"),
				children: [/* @__PURE__ */ V("div", {
					ref: Et,
					onScroll: kn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", _n && "fade-top", gt ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ H("div", {
						"data-chat-content": !0,
						className: e("pb-[var(--ui-chat-gap,1rem)]", Be === "end" && "mt-auto"),
						children: [
							It && n.length > 0 && /* @__PURE__ */ V("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ V("button", {
									"data-ui-part": "",
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: An,
									disabled: Ue,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: Ue ? "Loading…" : "Load earlier messages"
								})
							}),
							$t.length === 0 ? c ?? /* @__PURE__ */ V("div", {
								className: e("text-sm", $ ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : en ? en.map((e, t) => Bn(e, t, en[t - 1])) : $t.map((e, t) => Ln(e, t, Nt($t[t - 1]), $t[t - 1])),
							h && /* @__PURE__ */ V(j, {
								open: tt !== null,
								triggerRef: rt,
								emojis: Qe,
								onSelect: (e) => {
									tt && h(tt, e), nt(null);
								},
								onClose: () => nt(null)
							}),
							O && /* @__PURE__ */ V(_, {
								open: ot !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => st(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === ot);
									st(null), e && O(e);
								}
							}),
							X.map((e) => /* @__PURE__ */ V(_e, {
								author: e.actor,
								timestamp: "",
								tone: G,
								content: /* @__PURE__ */ V(pt, {
									transfer: e,
									mine: ft(e, f, Z),
									onCancel: We
								})
							}, e.transferId))
						]
					})
				}), hn > 0 && /* @__PURE__ */ H("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: On,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", $ ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						hn,
						" new message",
						hn === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ V(ie, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", q && l && "mx-[var(--ui-content-gutter,1rem)]", $ ? "text-white/50" : "text-text-secondary")
			}),
			u != null && u !== !1 && /* @__PURE__ */ V("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: u
			}),
			l ? /* @__PURE__ */ V("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? Fn : void 0,
				children: l
			}) : /* @__PURE__ */ H("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [y && /* @__PURE__ */ V(F, {
					quote: y,
					onDismiss: b,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ H("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						Y && /* @__PURE__ */ H(B, { children: [/* @__PURE__ */ V("button", {
							"data-ui-part": "",
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !Qt,
							onClick: () => Bt.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", $ ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ V(Zt, {})
						}), /* @__PURE__ */ V(A, {
							ref: Bt,
							multiple: !0,
							accept: qe,
							onFiles: (e) => {
								let t = Je ? e.filter((e) => e.size > Je) : [];
								t.length > 0 && Q?.(`Skipped ${t.length} file(s) over the size limit.`), Mn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ V("button", {
							"data-ui-part": "",
							ref: Vt,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": Ht,
							title: "Insert emoji",
							disabled: a,
							onClick: () => Xt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", $ ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ V(d, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ V(j, {
							open: Ht,
							onSelect: Pn,
							onClose: () => Xt(!1),
							triggerRef: Vt,
							emojis: Qe
						}),
						/* @__PURE__ */ V(v, {
							size: "sm",
							value: _t,
							onChange: (e) => Ct(e.target.value),
							onKeyDown: In,
							onPaste: Nn,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", $ && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ V(t, {
							variant: "primary",
							size: "sm",
							onClick: jn,
							disabled: a || !_t.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return Y ? /* @__PURE__ */ V(M, {
		onFiles: Mn,
		accept: qe,
		maxSize: Je,
		onError: Q,
		disabled: a,
		className: gt ? "flex h-full min-h-0 flex-col" : void 0,
		children: Vn
	}) : Vn;
}
function Zt() {
	return /* @__PURE__ */ V("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ V("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
export { ce as $, Ve as A, Me as B, at as C, Je as D, Y as E, Pe as F, _e as G, we as H, Ne as I, ue as J, ge as K, Oe as L, q as M, ze as N, Qe as O, G as P, de as Q, De as R, it as S, tt as T, Ce as U, Ee as V, Se as W, pe as X, fe as Y, me as Z, lt as _, Et as a, st as b, Mt as c, Ot as d, le as et, vt as f, ut as g, pt as h, St as i, re as it, Be as j, Ue as k, jt as l, dt as m, At as n, ae as nt, Tt as o, ht as p, he as q, xt as r, ie as rt, kt as s, Xt as t, W as tt, wt as u, ct as v, ot as w, nt as x, $ as y, Ae as z };
