import { t as e } from "./cn-D4QmbyEy.js";
import { n as t } from "./Button-C-I3BxWI.js";
import { n } from "./overlayStack-DxIDMUs-.js";
import { t as r } from "./IconButton-Bf5Wy0tS.js";
import { A as i, B as a, J as o, S as s, St as c, dt as l, gt as u, m as d, tt as f, w as p } from "./Icons-CqVFbuiZ.js";
import { g as m } from "./MediaIcons-_ai5Til2.js";
import { t as h } from "./ConfirmDialog-DrXzW1zj.js";
import { t as g } from "./Input-Brvp1kPv.js";
import { t as _ } from "./InlinePopover-Dx8-r-XU.js";
import { n as v, t as y } from "./safeHref-BR1Vy6Dm.js";
import { t as b } from "./StatusPill-cLjwbEQM.js";
import { t as x } from "./DropdownMenu-DP3rRjEd.js";
import { n as S } from "./DockedPanelContext-pH9A5z1h.js";
import { t as C } from "./Textarea-CvdLeuO_.js";
import { n as w } from "./Avatar-GvBbrBxQ.js";
import { t as T } from "./DotMeter-B6ZDgLU7.js";
import { t as E } from "./StatusDot-GwVn-q5q.js";
import { t as D } from "./RovingToolbar-B1Fai5PF.js";
import { t as O } from "./PresenceAvatars-BEy1DnNW.js";
import { i as ee, n as k, r as A, t as j } from "./ReactionPickerPopover-wsdZyMqU.js";
import { n as M } from "./useComputeProjects-ZSazDRet.js";
import { t as N } from "./QuoteBlock-NVq2JJEM.js";
import { t as P } from "./formatBytes-05ivRSJY.js";
import { Fragment as F, useEffect as I, useMemo as L, useRef as R, useState as z } from "react";
import { Fragment as te, jsx as B, jsxs as V } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var H = {
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clipPath: "inset(50%)",
	whiteSpace: "nowrap",
	border: 0
};
function ne({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ B(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: H,
		children: t
	});
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function re(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function U({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ V("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ B(v, { size: r }), !n && /* @__PURE__ */ B("span", { children: re(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function W({ name: t, onRename: n, memberCount: r, description: i, tabs: a, actions: o, avatarUrl: s, online: c, onMembersClick: l, size: u = "md", headingLevel: d = 2, as: f = "div", className: p, "data-testid": m }) {
	let h = u === "sm", g = f, _ = d === 1 ? "h1" : "h2", [v, y] = z(!1), [b, x] = z(t), S = R(null);
	I(() => {
		v || x(t);
	}, [t, v]), I(() => {
		v && (S.current?.focus(), S.current?.select());
	}, [v]);
	let C = () => {
		let e = b.trim();
		if (y(!1), !e || e === t) {
			x(t);
			return;
		}
		n?.(e);
	}, T = () => {
		x(t), y(!1);
	};
	return /* @__PURE__ */ V(g, {
		"data-testid": m,
		"data-size": u,
		className: e("@container flex items-center justify-between", h ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", p),
		children: [
			/* @__PURE__ */ V("div", {
				className: e("flex min-w-0 max-w-full items-center", h ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ V("div", {
					className: "relative shrink-0",
					children: [s ? /* @__PURE__ */ B("img", {
						src: s,
						alt: t,
						className: h ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ B(w, {
						name: t,
						size: h ? 28 : 36
					}), c !== void 0 && /* @__PURE__ */ B("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ B(E, {
							color: c ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": c ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ V("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ V("div", {
						className: "flex items-baseline gap-2",
						children: [v ? /* @__PURE__ */ B("input", {
							"data-ui-part": "",
							ref: S,
							value: b,
							onChange: (e) => x(e.target.value.slice(0, 100)),
							maxLength: 100,
							"aria-label": "Conversation name",
							"data-testid": m ? `${m}-name-input` : "channel-header-name-input",
							onBlur: C,
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), C()) : e.key === "Escape" && (e.preventDefault(), T()), e.stopPropagation();
							},
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", "text-sm")
						}) : /* @__PURE__ */ B(_, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", d === 1 ? "text-xl" : "text-sm", n && "cursor-text"),
							onDoubleClick: n ? () => y(!0) : void 0,
							title: n ? "Double-click to rename" : void 0,
							"data-testid": m ? `${m}-name` : void 0,
							children: t
						}), r !== void 0 && (l ? /* @__PURE__ */ V("button", {
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
						}) : /* @__PURE__ */ V("span", {
							"data-testid": "channel-header-members",
							className: "text-xs font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}))]
					}), i && !h && /* @__PURE__ */ B("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: i
					})]
				})]
			}),
			a && /* @__PURE__ */ B("div", {
				className: e("flex max-w-full items-center justify-end overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full @max-3xl:justify-start", h ? "min-w-0 flex-1" : "flex-[1_0_auto]"),
				children: a
			}),
			o && /* @__PURE__ */ B("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var ie = [
	"👍",
	"🎉",
	"❤️"
], G = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function ae({ actions: t = [], label: n = "Message actions", quickReactions: r = ie, onReact: o, onOpenReactionPicker: s, onReply: d, onForward: m, onTogglePin: h, pinned: g = !1, onCopyLink: _, onEdit: v, onDelete: y, className: b, "data-testid": x = "message-actions" }) {
	let S = [], C = (e, t, n, r) => S.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (o) for (let e of r) C(`react-${e}`, `React ${e}`, /* @__PURE__ */ B("span", {
		"aria-hidden": !0,
		children: e
	}), () => o(e));
	s && C("more-reactions", "More reactions", /* @__PURE__ */ B(u, { size: 14 }), (e) => s(e.currentTarget)), d && C("reply", "Reply", /* @__PURE__ */ B(l, { size: 14 }), d), m && C("forward", "Forward to another conversation", /* @__PURE__ */ B(i, { size: 14 }), (e) => m(e.currentTarget)), h && C("pin", g ? "Unpin" : "Pin to channel", /* @__PURE__ */ B(f, { size: 14 }), h), _ && C("copy-link", "Copy link to message", /* @__PURE__ */ B(a, { size: 14 }), _), v && C("edit", "Edit message", /* @__PURE__ */ B(p, { size: 13 }), v), y && C("delete", "Delete message", /* @__PURE__ */ B(c, { size: 13 }), y);
	for (let e of t) S.push({
		key: e.id,
		label: e.label,
		glyph: e.icon,
		disabled: e.disabled,
		onClick: (t) => e.onClick(t.currentTarget)
	});
	return S.length === 0 ? null : /* @__PURE__ */ B(D, {
		label: n,
		"data-testid": x,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", b),
		children: S.map((e) => /* @__PURE__ */ B("button", {
			"data-ui-part": "",
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${x}-${e.key}`,
			onClick: e.onClick,
			disabled: e.disabled,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${G}`,
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
function ge({ author: t, content: n, timestamp: r, avatarUrl: i, hideAvatar: a = !1, hideAuthor: s = !1, mine: c = !1, footer: l, actions: u, actionsLayout: d = "inline", tone: f = "light", editedAt: p, contentLayout: m = "inline", className: h }) {
	let g = f === "dark", v = he(r), [y, b] = z(!1), x = R(null), S = !s || !!v, C = !!u && (d === "menu" || !S);
	I(() => {
		C || b(!1);
	}, [C]);
	let T = /* @__PURE__ */ B("button", {
		"data-ui-part": "",
		ref: x,
		type: "button",
		"aria-label": "Message actions",
		"aria-expanded": y,
		"aria-haspopup": "dialog",
		onClick: () => b((e) => !e),
		"data-testid": "message-row-actions-toggle",
		className: "grid h-5 w-5 shrink-0 place-items-center rounded text-text-secondary opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-primary aria-expanded:opacity-100",
		children: /* @__PURE__ */ B(o, { size: 16 })
	});
	return /* @__PURE__ */ V("div", {
		"data-testid": "message-row",
		"data-mine": c ? "true" : "false",
		className: e("flex items-start gap-2 py-1", c && "flex-row-reverse", h),
		children: [
			/* @__PURE__ */ B("div", {
				className: "w-5 shrink-0 mt-0.5",
				children: C && !S ? T : !a && /* @__PURE__ */ B(w, {
					name: t,
					src: i,
					size: 20
				})
			}),
			/* @__PURE__ */ V("div", {
				className: e("flex grow flex-col min-w-0", c && "items-end"),
				children: [
					S && /* @__PURE__ */ V("div", {
						"data-testid": "message-row-header",
						className: e(u && "mb-1 flex w-full min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1", C && "flex-nowrap", u && c && "flex-row-reverse"),
						children: [S && /* @__PURE__ */ V("div", {
							className: e("flex items-baseline gap-2 min-w-0 max-w-full", u && (C ? "flex-1" : "shrink-0"), c && "flex-row-reverse"),
							children: [
								!s && /* @__PURE__ */ B("span", {
									"data-testid": "message-row-author",
									className: e("text-xs font-semibold truncate", g ? "text-white/70" : "text-text-secondary"),
									children: t
								}),
								v && /* @__PURE__ */ B("time", {
									"data-testid": "message-row-time",
									dateTime: r,
									title: pe(r),
									className: e("text-xs shrink-0", g ? "text-white/40" : "text-text-tertiary"),
									children: v
								}),
								p && /* @__PURE__ */ B("span", {
									"data-testid": "message-row-edited",
									title: `Edited ${pe(p)}`,
									className: e("text-[11px] shrink-0", g ? "text-white/40" : "text-text-tertiary"),
									children: "(edited)"
								})
							]
						}), C ? T : u && /* @__PURE__ */ B("div", {
							"data-testid": "message-row-actions",
							className: "max-w-full shrink-0",
							children: u
						})]
					}),
					/* @__PURE__ */ B("span", {
						"data-testid": "message-row-content",
						className: e("text-sm min-w-0 break-words whitespace-pre-wrap", g ? "text-white/90" : "text-text-primary", c && m === "inline" && "max-w-[85%] rounded-lg rounded-tr-sm px-3 py-1.5 text-right", c && m === "inline" && (g ? "bg-white/15" : "bg-primary-bg"), m === "block" && "w-full max-w-[30rem]"),
						children: n
					}),
					l && /* @__PURE__ */ B("div", {
						"data-testid": "message-row-footer",
						className: e("mt-1", c && "self-end"),
						children: l
					})
				]
			}),
			C && /* @__PURE__ */ B(_, {
				trigger: x,
				open: y,
				onClose: () => b(!1),
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
	let n = e, r = Array.from(n.childNodes).map((e, n) => ve(e, `${t}-${n}`));
	if (!_e.has(n.tagName)) return /* @__PURE__ */ B("span", { children: r }, t);
	switch (n.tagName) {
		case "BR": return /* @__PURE__ */ B("br", {}, t);
		case "A": {
			let e = y(n.getAttribute("href"));
			return e ? /* @__PURE__ */ B("a", {
				href: e,
				target: "_blank",
				rel: "noopener noreferrer nofollow",
				className: "text-primary-fg underline underline-offset-2",
				children: r
			}, t) : /* @__PURE__ */ B("span", { children: r }, t);
		}
		case "SPAN": {
			let e = n.classList.contains("mention"), i = !e && n.classList.contains("docref");
			return /* @__PURE__ */ B("span", {
				className: e ? "mention" : i ? "docref" : void 0,
				"data-mention-id": e ? n.getAttribute("data-id") ?? void 0 : void 0,
				"data-document-id": i ? n.getAttribute("data-id") ?? void 0 : void 0,
				children: r
			}, t);
		}
		default: {
			let e = n.tagName.toLowerCase();
			return /* @__PURE__ */ B(e, { children: r }, t);
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
			n > 0 && /^[a-zA-Z0-9_+-]{1,20}$/.test(e.slice(0, n).trim()) && (e = e.slice(n + 1)), t.push(/* @__PURE__ */ B("pre", {
				className: "message-code-block",
				children: /* @__PURE__ */ B("code", { children: e.replace(/\n$/, "") })
			}, `f${r.index}`));
		} else t.push(/* @__PURE__ */ B("code", {
			className: "message-code-inline",
			children: r[2]
		}, `i${r.index}`));
		n = r.index + r[0].length;
	}
	return n < e.length && t.push(e.slice(n)), t.length === 1 && typeof t[0] == "string" ? t[0] : t;
}
function xe({ html: t, text: n, className: r, "data-testid": i = "message-body" }) {
	let a = L(() => {
		if (!t) return null;
		let e = new DOMParser().parseFromString(t, "text/html");
		return Array.from(e.body.childNodes).map((e, t) => ve(e, `n${t}`));
	}, [t]), o = L(() => be(n ?? ""), [n]);
	return /* @__PURE__ */ B("div", {
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
function Ce({ documentId: t, title: n, icon: r, createdBy: i, editors: a = [], onOpen: o, unavailable: c, className: l, "data-testid": u = "document-activity-card" }) {
	let d = !c && a.length > 0;
	return /* @__PURE__ */ V("div", {
		"data-testid": u,
		"data-document-id": t,
		"data-editing": d ? "true" : void 0,
		"data-unavailable": c,
		"aria-disabled": c ? "true" : void 0,
		className: e("flex items-center gap-3 rounded-lg border border-border bg-surface-inset px-3 py-2", c && "border-dashed opacity-60", l),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				className: e("grid h-9 w-9 shrink-0 place-items-center rounded bg-surface", r ? "text-base" : "text-text-tertiary"),
				children: r || /* @__PURE__ */ B(s, { size: 18 })
			}),
			/* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [/* @__PURE__ */ B("span", {
					className: e("truncate text-[13px] font-semibold", c ? "text-text-tertiary" : "text-text-primary"),
					children: n || "Untitled"
				}), /* @__PURE__ */ B("span", {
					className: "truncate text-[11px] text-text-tertiary",
					"data-testid": c ? `${u}-unavailable` : void 0,
					children: c ? Se(c) : d ? `${we(a)} editing now` : i ? `Created by ${i}` : "Document"
				})]
			}),
			d && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${u}-editors`,
				children: /* @__PURE__ */ B(O, {
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
			o && !c && /* @__PURE__ */ B("button", {
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
function Te({ documentId: t, label: n, icon: r, onOpen: i, unavailable: a, className: o, "data-testid": c = "chat-message-docref" }) {
	let l = a ? void 0 : i, u = a ? Se(a) : null;
	return /* @__PURE__ */ V("button", {
		"data-ui-part": "",
		type: "button",
		onClick: l ? () => l(t) : void 0,
		disabled: !l,
		title: u ? `${n} — ${u}` : n,
		"data-testid": c,
		"data-document-id": t,
		"data-unavailable": a,
		className: e("inline-flex max-w-full items-center gap-1 rounded-full border border-border bg-surface px-2 py-0.5 text-[11px] text-text-primary", l ? "hover:border-primary hover:bg-surface-hover" : "cursor-default", a && "border-dashed text-text-tertiary opacity-70", o),
		children: [
			r ? /* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: "shrink-0",
				children: r
			}) : /* @__PURE__ */ B(s, {
				size: 12,
				className: "shrink-0 text-text-tertiary",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ B("span", {
				className: "min-w-0 truncate",
				children: n
			}),
			u && /* @__PURE__ */ V("span", {
				className: "shrink-0",
				"data-testid": `${c}-unavailable`,
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
	let n = Ae(e), [r, i] = z(() => Date.now());
	return I(() => {
		if (!t || n === null) return;
		i(Date.now());
		let e = setInterval(() => i(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [t, n]), n === null ? null : Math.max(0, r - n);
}
function K(e) {
	return e === "declined" ? "Declined" : e === "no-answer" ? "No answer" : "Missed call";
}
function Me({ callId: t, startedBy: n, participants: r = [], live: i = !1, durationMs: a, startedAt: o, outcome: s, recordingId: c, onOpenRecording: l, audioOnly: u, recorded: d, notRecordedReason: f, lobbyName: p, onJoin: m, className: h, "data-testid": g = "call-activity-card" }) {
	let _ = i && !s, v = je(o, _), y = !_ && typeof a == "number" ? Ee(a) : "", b = u === void 0 ? "Call" : u ? "Audio call" : "Video call", x, S;
	return s ? (x = K(s), S = n ? `${n} called` : "Nobody answered") : _ ? (x = `${b} in progress`, S = De(r, !0)) : (x = y ? `${b} ended · ${y}` : `${b} ended`, S = n ? r.length === 0 ? `${n} started the call · Nobody joined` : `${n} started the call` : De(r, !1)), /* @__PURE__ */ V("div", {
		"data-testid": g,
		"data-call-id": t,
		"data-live": _ ? "true" : void 0,
		"data-outcome": s,
		className: e("flex items-center gap-3 rounded-lg border px-3 py-2", _ ? "border-primary bg-primary-bg" : "border-border bg-surface-inset", h),
		children: [
			/* @__PURE__ */ V("span", {
				"aria-hidden": !0,
				className: "relative grid h-9 w-9 shrink-0 place-items-center rounded bg-surface text-base",
				children: [u === void 0 || u ? "📞" : "📹", _ && /* @__PURE__ */ V("span", {
					"data-testid": `${g}-pulse`,
					className: "absolute -right-1 -top-1 grid h-3 w-3 place-items-center",
					children: [/* @__PURE__ */ B("span", { className: "absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-safe:animate-ping" }), /* @__PURE__ */ B("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-success ring-2 ring-surface" })]
				})]
			}),
			/* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-1 flex-col gap-0.5",
				children: [
					/* @__PURE__ */ B("span", {
						className: e("truncate text-[13px] font-semibold", s ? "text-danger" : "text-text-primary"),
						children: x
					}),
					/* @__PURE__ */ V("span", {
						className: "flex min-w-0 items-center gap-1 text-[11px] text-text-tertiary",
						children: [
							_ && /* @__PURE__ */ B("span", {
								className: "shrink-0 font-semibold text-success",
								"data-testid": `${g}-live`,
								"aria-live": "off",
								children: v === null ? "Live" : `Live · ${ke(v)}`
							}),
							_ && /* @__PURE__ */ B("span", {
								"aria-hidden": !0,
								className: "shrink-0",
								children: "·"
							}),
							/* @__PURE__ */ B("span", {
								className: "truncate",
								children: S
							})
						]
					}),
					!_ && !s && d === !1 && /* @__PURE__ */ B("span", {
						className: "truncate text-[11px] text-text-tertiary",
						"data-testid": `${g}-not-recorded`,
						children: Oe(f, p)
					})
				]
			}),
			!s && r.length > 0 && /* @__PURE__ */ B("span", {
				className: "shrink-0",
				"data-testid": `${g}-participants`,
				children: /* @__PURE__ */ B(O, {
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
			!_ && c && l && /* @__PURE__ */ B("button", {
				"data-ui-part": "",
				type: "button",
				"data-testid": `${g}-recording`,
				onClick: () => l(c),
				className: "shrink-0 rounded border border-border bg-surface px-2.5 py-1 text-[11px] font-semibold text-text-primary hover:bg-surface-hover",
				children: "Recording"
			}),
			_ && m && /* @__PURE__ */ B("button", {
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
var Ne = {
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
function Pe(e) {
	if (!e) return "";
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit"
	});
}
function Fe(e) {
	let t = new Date(e);
	return Number.isNaN(t.getTime()) ? "" : t.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Ie(e, t) {
	if (t <= 0) return "";
	let [n] = e;
	if (!n) return `${t} ${t === 1 ? "person" : "people"}`;
	let r = t - 1;
	return r <= 0 ? n.name : `${n.name} and ${r} ${r === 1 ? "other" : "others"}`;
}
function Le({ participants: t, total: n, testId: r }) {
	let i = t.slice(0, n > 4 ? 3 : 4), a = n - i.length, o = i.length + +(a > 0) <= 1 ? "grid-cols-1" : "grid-cols-2";
	return /* @__PURE__ */ V("div", {
		className: e("grid h-full w-full gap-0.5 bg-black p-0.5", o),
		"data-testid": `${r}-tiles`,
		children: [
			i.map((e) => /* @__PURE__ */ B("div", {
				className: "flex items-center justify-center bg-neutral-800",
				"data-testid": `${r}-tile`,
				children: /* @__PURE__ */ B(w, {
					name: e.name,
					src: e.avatarUrl,
					color: e.color,
					size: i.length <= 1 ? 48 : 32
				})
			}, e.id)),
			a > 0 && /* @__PURE__ */ V("div", {
				className: "flex items-center justify-center bg-neutral-800 text-sm font-medium text-white/80",
				"data-testid": `${r}-tile-more`,
				children: ["+", a]
			}),
			i.length === 0 && a <= 0 && /* @__PURE__ */ B("div", {
				className: "flex items-center justify-center text-white/30",
				children: /* @__PURE__ */ B("svg", {
					width: "32",
					height: "32",
					viewBox: "0 0 24 24",
					fill: "currentColor",
					"aria-hidden": !0,
					children: /* @__PURE__ */ B("path", { d: "M8 5v14l11-7z" })
				})
			})
		]
	});
}
function Re({ recordingId: n, title: r = "Recording", recordedBy: i, participants: a = [], participantCount: o, startedAt: s, durationMs: c, thumbnailUrl: l, stage: u = "ready", transcriptReady: d = !1, summaryReady: p = !1, expiresAt: m, pinned: h = !1, onOpen: g, onCopyLink: _, onShare: v, onTogglePin: y, onDownload: S, onOpenTranscript: C, onManageExpiry: w, onParticipantClick: T, className: E, "data-testid": D = "recording-activity-card" }) {
	let ee = o ?? a.length, k = u === "gone", A = u !== "saving" && u !== "failed" && !k && !!g, j = () => {
		g?.(n);
	}, M = c != null && c > 0 ? Ee(c) : "", N = Pe(s), P = Ie(a, ee), { state: F, label: I } = Ne[u], L = [
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
		...S && A ? [{
			"data-testid": `${D}-menu-download`,
			label: "Download",
			onSelect: () => S(n)
		}] : []
	], R = L.length ? [{
		items: L,
		"data-testid": `${D}-menu-items`
	}] : [];
	return /* @__PURE__ */ V("div", {
		"data-testid": D,
		"data-recording-id": n,
		"data-stage": u,
		className: e("max-w-lg overflow-hidden rounded-lg border border-border bg-surface text-sm shadow-sm", E),
		children: [/* @__PURE__ */ V("div", {
			className: "flex items-stretch",
			children: [/* @__PURE__ */ V("button", {
				"data-ui-part": "",
				type: "button",
				onClick: A ? j : void 0,
				disabled: !A,
				"aria-label": A ? `Play ${r.toLowerCase()}` : `${r}: ${I.toLowerCase()}`,
				"data-testid": `${D}-thumb`,
				className: e("relative aspect-video w-48 shrink-0 overflow-hidden bg-black text-left", A ? "cursor-pointer" : "cursor-default"),
				children: [
					l ? /* @__PURE__ */ B("img", {
						src: l,
						alt: "",
						loading: "lazy",
						className: "h-full w-full object-cover",
						"data-testid": `${D}-thumbnail`
					}) : /* @__PURE__ */ B(Le, {
						participants: a,
						total: ee,
						testId: D
					}),
					A && /* @__PURE__ */ B("span", {
						className: "absolute inset-0 flex items-center justify-center transition-colors hover:bg-black/25",
						children: /* @__PURE__ */ B("span", {
							className: "flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black shadow",
							children: /* @__PURE__ */ B("svg", {
								width: "16",
								height: "16",
								viewBox: "0 0 24 24",
								fill: "currentColor",
								"aria-hidden": !0,
								children: /* @__PURE__ */ B("path", { d: "M8 5v14l11-7z" })
							})
						})
					}),
					M && /* @__PURE__ */ B("span", {
						className: "absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[11px] font-medium tabular-nums text-white",
						"data-testid": `${D}-duration`,
						children: M
					})
				]
			}), /* @__PURE__ */ V("div", {
				className: "flex min-w-0 flex-1 items-start gap-2 px-3 py-2.5",
				children: [/* @__PURE__ */ V("div", {
					className: "flex min-w-0 flex-1 flex-col gap-1",
					children: [
						/* @__PURE__ */ V("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ B("span", {
								className: "truncate text-[15px] font-semibold text-text-primary",
								"data-testid": `${D}-title`,
								children: r
							}), h && /* @__PURE__ */ B("span", {
								className: "text-xs text-text-tertiary",
								"data-testid": `${D}-pinned`,
								title: "Pinned",
								children: /* @__PURE__ */ B(f, { size: 12 })
							})]
						}),
						i && /* @__PURE__ */ V("div", {
							className: "truncate text-sm text-text-secondary",
							"data-testid": `${D}-by`,
							children: ["by ", i]
						}),
						ee > 0 && /* @__PURE__ */ V("div", {
							className: "flex items-center gap-2",
							"data-testid": `${D}-people`,
							children: [/* @__PURE__ */ B(O, {
								users: a.map((e) => ({
									id: e.id,
									name: e.name,
									avatarUrl: e.avatarUrl,
									color: e.color
								})),
								size: 20,
								maxVisible: 4,
								onUserClick: T
							}), /* @__PURE__ */ B("span", {
								className: "truncate text-xs text-text-tertiary",
								children: P
							})]
						}),
						/* @__PURE__ */ V("div", {
							className: "flex flex-wrap items-center gap-1.5",
							children: [
								/* @__PURE__ */ B(b, {
									state: F,
									label: I,
									size: "sm",
									"data-testid": `${D}-stage`
								}),
								u === "ready" && d && /* @__PURE__ */ B(b, {
									state: "neutral",
									label: "Transcript",
									size: "sm",
									"data-testid": `${D}-transcript`
								}),
								u === "ready" && p && /* @__PURE__ */ B(b, {
									state: "neutral",
									label: "Summary",
									size: "sm",
									"data-testid": `${D}-summary`
								}),
								N && /* @__PURE__ */ B("span", {
									className: "text-xs text-text-tertiary",
									"data-testid": `${D}-when`,
									children: N
								})
							]
						})
					]
				}), R.length > 0 && /* @__PURE__ */ B(x, {
					trigger: /* @__PURE__ */ B("span", {
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
		}), m && u !== "failed" && !k && /* @__PURE__ */ V("div", {
			className: "flex items-center justify-between gap-2 border-t border-warning-border bg-warning-bg px-3 py-1.5 text-xs text-warning-fg",
			"data-testid": `${D}-expiry`,
			children: [/* @__PURE__ */ V("span", { children: ["Set to expire ", Fe(m)] }), w && /* @__PURE__ */ B(t, {
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
function q(e) {
	return e.length <= 1 ? e[0] ?? "" : e.length === 2 ? `${e[0]} and ${e[1]}` : `${e.slice(0, -1).join(", ")} and ${e[e.length - 1]}`;
}
function J(e) {
	return e ? e.mode === "all" ? "all history" : e.mode === "days" ? `history from the last ${e.days === 1 ? "day" : `${e.days ?? 7} days`}` : "no history" : "";
}
function ze(e, t) {
	let n = e.names && e.names.length > 0 ? q(e.names) : e.userIds.length > 0 ? q(e.userIds) : "", r = e.actorName ?? e.actorId;
	if (!n) return t || (e.event === "added" ? `${r} added people` : `${r} removed people`);
	if (e.event === "removed") return `${r} removed ${n}`;
	let i = J(e.history);
	return `${r} added ${n}${i ? ` · ${i}` : ""}`;
}
function Be({ membership: t, fallbackText: n, timestamp: r, className: i, "data-testid": a = "membership-notice" }) {
	let o = ze(t, n);
	return /* @__PURE__ */ V("div", {
		role: "status",
		"data-testid": a,
		"data-event": t.event,
		className: e("flex items-center justify-center gap-2 px-3 py-1.5 text-center text-xs text-text-tertiary", i),
		children: [/* @__PURE__ */ B("span", {
			"data-testid": `${a}-text`,
			children: o
		}), r && /* @__PURE__ */ B("time", {
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
var Y = {
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
}, Ve = {
	pending: "bg-border",
	running: "animate-pulse bg-success motion-reduce:animate-none",
	done: "bg-info",
	failed: "bg-danger",
	skipped: "bg-border"
};
function He(e) {
	let t = Math.max(0, Math.floor(e / 1e3)), n = Math.floor(t / 60), r = t % 60;
	return `${n}:${String(r).padStart(2, "0")}`;
}
function Ue(e) {
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
		default: return Y[e.phase]?.label ?? "Running…";
	}
}
function We(e) {
	let t = !!e && (Y[e.phase]?.busy ?? !1), n = e?.startedAt ? Date.parse(e.startedAt) : NaN, r = t && !Number.isNaN(n), [i, a] = z(() => Date.now());
	return I(() => {
		if (!r) return;
		a(Date.now());
		let e = setInterval(() => a(Date.now()), 1e3);
		return () => clearInterval(e);
	}, [r]), e ? r ? Math.max(0, i - n) : typeof e.elapsedMs == "number" ? e.elapsedMs : null : null;
}
var Ge = [
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
], Ke = {
	received: 0,
	running: 1,
	awaiting_approval: 1,
	completed: 2,
	rejected: 2,
	failed: 2
}, qe = {
	received: "Received",
	running: "Processing",
	awaiting_approval: "Needs approval",
	completed: "Updated",
	rejected: "Rejected",
	failed: "Failed"
}, Je = 6;
function Ye(e) {
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
function Xe(e, t) {
	let n = (e ?? "").trim();
	if (!n) return { summary: "The run failed." };
	if (/^[A-Z][^]*[.!]$/.test(n)) return { summary: n };
	let r = n.toLowerCase(), i = Ye(t), a = /chat service|chat:|the join|conversation/.test(r);
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
var Ze = "shrink-0 whitespace-nowrap underline underline-offset-2", Qe = `${Ze} hidden text-text-tertiary hover:text-text-primary @md:inline`;
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
	let o = Y[n.phase] ?? Y.running, s = n.phase === "planning" ? [] : n.steps ?? [], c = n.contextBudgetTokens ?? 0, l = n.contextTokens ?? 0, u = n.phase === "failed";
	return /* @__PURE__ */ V(te, { children: [/* @__PURE__ */ V("div", {
		className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
		"data-testid": `${a}-loop`,
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", o.dot, o.busy && "animate-pulse motion-reduce:animate-none")
			}),
			/* @__PURE__ */ B("span", {
				className: e("min-w-0 flex-1 truncate", u && "text-danger"),
				title: n.outcome,
				"data-testid": `${a}-detail`,
				children: Ue(n)
			}),
			r !== null && o.busy && /* @__PURE__ */ B("span", {
				className: "shrink-0 tabular-nums text-text-tertiary",
				title: "Time since the loop started",
				"data-testid": `${a}-clock`,
				children: He(r)
			}),
			c > 0 && /* @__PURE__ */ V("span", {
				className: "flex shrink-0 items-center gap-1",
				title: "Context spent against this loop's budget",
				"data-testid": `${a}-budget`,
				children: [/* @__PURE__ */ V("span", {
					className: "tabular-nums text-text-tertiary",
					children: [
						M(l),
						" / ",
						M(c)
					]
				}), /* @__PURE__ */ B(T, {
					value: Math.min(1, Math.max(0, l / c)),
					segments: 6,
					showPercent: !1,
					tone: "surface",
					label: "context"
				})]
			}),
			i && /* @__PURE__ */ B("button", {
				"data-ui-part": "",
				type: "button",
				onClick: () => i(t),
				className: e(Ze, "font-medium text-info"),
				"data-testid": `${a}-open-lab`,
				children: "Open lab"
			})
		]
	}), s.length > 0 && /* @__PURE__ */ B("ol", {
		className: "m-0 flex list-none flex-wrap items-center gap-1 p-0 text-[11px]",
		"aria-label": "Loop steps",
		"data-testid": `${a}-loop-steps`,
		children: s.map((t) => /* @__PURE__ */ V("li", {
			"data-state": t.status,
			title: `${t.kind} · ${t.status}`,
			className: "flex min-w-0 max-w-full items-center gap-1 rounded-full border border-border bg-surface-inset px-1.5 py-px leading-4",
			children: [/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Ve[t.status] ?? Ve.pending)
			}), /* @__PURE__ */ B("span", {
				className: e("min-w-0 max-w-[12rem] truncate", t.status === "running" ? "text-text-primary" : t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : "text-text-secondary"),
				children: t.title
			})]
		}, t.id))
	})] });
}
function at({ runId: i, instruction: a, agentName: o, requestedBy: c, command: l = "/doc", status: u, onOpenDocument: f, onOpenRun: p, result: h, onOpenResult: g, onDecide: _, suggestion: v, onReview: y, onRetry: b, documentTitle: x, defaultExpanded: S = !1, loop: C, onOpenLab: w, className: T, "data-testid": E = "agent-run-card" }) {
	let D = u?.phase ?? "received", [O, ee] = z(S), k = We(C), A = D === "completed" ? u?.suggestion ?? v : void 0, j = D === "completed" ? u?.review : void 0, M = !!A && !j, N = D === "completed" && u?.noop === !0, P = D === "completed" ? u?.result ?? h : void 0, F = P?.kind === "link" && P.label ? P.label : "Open", I = f && !(P?.kind === "document" && g), L = Ke[D], R = D === "failed" || D === "rejected", te = R ? "danger" : j ? j.decision === "accept" ? "success" : "neutral" : N ? "warning" : D === "completed" ? A ? "warning" : "success" : D === "awaiting_approval" ? "warning" : "info", H = j ? "Reviewed" : M ? "Suggested" : N ? "No change" : qe[D], ne = j ? j.byName ?? j.by : void 0, re = j ? `${j.decision === "accept" ? "Accepted" : "Rejected"} by ${ne}` : void 0, U = D === "awaiting_approval", W = D === "failed" ? Xe(u?.details?.error ?? u?.detail, l) : void 0, ie = D === "running" ? u?.stepLabel ? `${o} — ${u.stepLabel}` : `${o} is working via the pipeline` : U ? `Waiting for approval${u?.detail ? ` — ${u.detail}` : ""}` : W ? W.summary : re ?? u?.detail ?? (M && u?.suggestion ? `${u.suggestion.applied} ${u.suggestion.applied === 1 ? "change" : "changes"} suggested` : D === "received" ? "Received" : H), G = u?.details, ae = G?.ops ?? [], oe = G?.steps ?? [], se = G?.document?.title || x || "Document", ce = !!G?.document || !!f, le = W ? W.technical : G?.error, ue = rt(G), de = `${E}-details-${i}`, fe = !!(M && A && y || U && _ || P && g || P?.kind === "link" && !g);
	return /* @__PURE__ */ V("div", {
		className: e("@container flex w-full max-w-[36rem] cursor-default flex-col gap-0.5 rounded-md border border-border bg-surface px-2 py-1 text-left text-[12px]", T),
		"data-testid": E,
		"data-phase": C ? C.phase : D,
		"data-mode": C ? "loop" : void 0,
		"data-run-id": i,
		"data-expanded": O ? "true" : void 0,
		title: c ? `${c} asked ${o}: ${a}` : `${o}: ${a}`,
		onClick: (e) => {
			e.target.closest("button, a") || ee((e) => !e);
		},
		children: [
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 items-center gap-1.5",
				children: [
					/* @__PURE__ */ B(m, {
						size: 14,
						className: "shrink-0 text-text-tertiary",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ V("span", {
						className: "min-w-0 flex-1 truncate text-text-primary",
						"data-testid": `${E}-instruction`,
						children: [
							/* @__PURE__ */ B("span", {
								className: "font-mono text-text-tertiary",
								children: l
							}),
							" ",
							a
						]
					}),
					C ? /* @__PURE__ */ B(n, {
						size: "xs",
						tone: Y[C.phase]?.tone ?? "info",
						"data-testid": `${E}-phase`,
						children: Y[C.phase]?.label ?? C.phase
					}) : /* @__PURE__ */ B(n, {
						size: "xs",
						tone: te,
						"data-testid": `${E}-phase`,
						children: H
					}),
					/* @__PURE__ */ B(r, {
						size: "sm",
						"aria-label": O ? "Hide details" : "Show details",
						"aria-expanded": O,
						"aria-controls": O ? de : void 0,
						onClick: () => ee((e) => !e),
						className: "!h-5 !w-5 shrink-0 text-[10px] text-text-tertiary",
						"data-testid": `${E}-toggle`,
						icon: /* @__PURE__ */ B(d, {
							size: 12,
							dir: "right",
							className: e("transition-transform duration-150", O && "rotate-90"),
							"aria-hidden": "true"
						})
					})
				]
			}),
			C ? /* @__PURE__ */ B(it, {
				runId: i,
				loop: C,
				clock: k,
				onOpenLab: w,
				testId: E
			}) : /* @__PURE__ */ V("div", {
				className: "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] text-text-secondary",
				children: [
					/* @__PURE__ */ V("div", {
						className: e("flex min-w-0 grow items-center gap-1.5", fe && "basis-full @sm:basis-0"),
						children: [/* @__PURE__ */ B("ol", {
							className: "m-0 flex shrink-0 list-none items-center gap-1 p-0",
							"aria-label": "Run progress",
							"data-testid": `${E}-steps`,
							children: Ge.map((t, n) => {
								let r = R ? n < L : n < L || n === L && D === "completed", i = n === L && D !== "completed" && !R, a = R && n === L;
								return /* @__PURE__ */ V("li", {
									className: "flex items-center",
									title: t.label,
									"data-state": a ? "failed" : r ? "done" : i ? "active" : "pending",
									children: [/* @__PURE__ */ B("span", {
										"aria-hidden": "true",
										className: e("inline-block h-1.5 w-1.5 rounded-full", a ? "bg-danger" : r ? N && n === L ? "bg-warning" : "bg-success" : i ? U ? "bg-warning" : "animate-pulse bg-info" : "bg-border")
									}), /* @__PURE__ */ B("span", {
										className: "sr-only",
										children: a ? H : t.label
									})]
								}, t.phase);
							})
						}), /* @__PURE__ */ B("span", {
							className: e("min-w-0 flex-1 truncate", j && (j.decision === "accept" ? "text-success" : "text-text-tertiary"), D === "failed" && "text-danger", N && "text-warning-fg"),
							"data-testid": `${E}-detail`,
							"data-review": j?.decision,
							title: W ? W.summary : u?.detail,
							children: ie
						})]
					}),
					M && A && y && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${E}-review`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => y(i, "accept", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
							}),
							"data-testid": `${E}-accept`,
							children: "Accept"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => y(i, "reject", {
								key: A.key,
								...A.documentId ? { documentId: A.documentId } : {}
							}),
							"data-testid": `${E}-reject-review`,
							children: "Reject"
						})]
					}),
					U && _ && /* @__PURE__ */ V("span", {
						className: "flex shrink-0 items-center gap-1",
						"data-testid": `${E}-decide`,
						children: [/* @__PURE__ */ B(t, {
							size: "sm",
							variant: "primary",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(i, "approve"),
							"data-testid": `${E}-approve`,
							children: "Approve"
						}), /* @__PURE__ */ B(t, {
							size: "sm",
							variant: "ghost",
							className: "!px-2 !py-0 text-[11px] leading-5",
							onClick: () => _(i, "reject"),
							"data-testid": `${E}-reject`,
							children: "Reject"
						})]
					}),
					D === "failed" && b && /* @__PURE__ */ B(t, {
						size: "sm",
						variant: "primary",
						className: "!px-2 !py-0 text-[11px] leading-5",
						onClick: () => b(i),
						"data-testid": `${E}-retry`,
						children: "Retry"
					}),
					P && g && /* @__PURE__ */ B("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => g(P),
						className: e(Ze, "font-medium text-info"),
						"data-testid": `${E}-open-result`,
						"data-result-kind": P.kind,
						children: F
					}),
					P?.kind === "link" && !g && /* @__PURE__ */ B("a", {
						href: P.href,
						target: "_blank",
						rel: "noopener noreferrer",
						className: e(Ze, "font-medium text-info"),
						"data-testid": `${E}-open-result`,
						"data-result-kind": "link",
						children: F
					}),
					p && /* @__PURE__ */ B("button", {
						"data-ui-part": "",
						type: "button",
						onClick: () => p(i),
						className: Qe,
						"data-testid": `${E}-open-run`,
						children: "Open run"
					}),
					I && /* @__PURE__ */ B("button", {
						"data-ui-part": "",
						type: "button",
						onClick: f,
						className: Qe,
						"data-testid": `${E}-open-document`,
						children: "Open document"
					})
				]
			}),
			O && /* @__PURE__ */ V("div", {
				id: de,
				className: "mt-1 flex flex-col gap-2 border-t border-border pt-1.5",
				"data-testid": `${E}-details`,
				children: [
					ce && /* @__PURE__ */ V("div", {
						className: "flex items-start gap-2",
						"data-testid": `${E}-details-document`,
						children: [
							/* @__PURE__ */ B(s, {
								size: 14,
								className: "mt-0.5 shrink-0 text-text-tertiary",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ V("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ B("span", {
									className: "block truncate font-medium text-text-primary",
									children: se
								}), G?.document?.snippet && /* @__PURE__ */ B("span", {
									className: "line-clamp-2 block text-[11px] text-text-secondary",
									"data-testid": `${E}-details-snippet`,
									children: G.document.snippet
								})]
							}),
							f && /* @__PURE__ */ B(t, {
								size: "sm",
								variant: "primary",
								className: "!px-2 !py-0.5 text-[11px] leading-5",
								onClick: f,
								"data-testid": `${E}-details-open-document`,
								children: "Open beside the chat"
							})
						]
					}),
					ae.length > 0 && /* @__PURE__ */ V("div", {
						"data-testid": `${E}-details-ops`,
						children: [
							/* @__PURE__ */ B("div", {
								className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
								children: "What changed"
							}),
							/* @__PURE__ */ B("ul", {
								className: "m-0 mt-0.5 list-none p-0 text-[11px] text-text-secondary",
								children: ae.slice(0, Je).map((e, t) => /* @__PURE__ */ B("li", {
									className: "truncate",
									"data-op": e.op,
									title: e.text,
									children: et(e)
								}, t))
							}),
							ae.length > Je && /* @__PURE__ */ V("div", {
								className: "text-[11px] text-text-tertiary",
								"data-testid": `${E}-details-more-ops`,
								children: [
									"+",
									ae.length - Je,
									" more"
								]
							})
						]
					}),
					oe.length > 0 && /* @__PURE__ */ B("ol", {
						className: "m-0 flex list-none flex-col gap-0.5 p-0 text-[11px]",
						"aria-label": "Steps",
						"data-testid": `${E}-details-steps`,
						children: oe.map((t) => /* @__PURE__ */ V("li", {
							className: "flex items-center gap-1.5",
							"data-step-id": t.id,
							"data-status": t.status,
							children: [/* @__PURE__ */ B("span", {
								"aria-hidden": "true",
								className: e("inline-block h-1.5 w-1.5 shrink-0 rounded-full", Z[t.status] ?? Z.pending)
							}), /* @__PURE__ */ B("span", {
								className: e("min-w-0 truncate", t.status === "failed" ? "text-danger" : t.status === "skipped" ? "text-text-tertiary line-through" : t.status === "running" ? "text-text-primary" : "text-text-secondary"),
								children: t.label
							})]
						}, t.id))
					}),
					le && /* @__PURE__ */ V("div", {
						"data-testid": `${E}-details-error-block`,
						children: [/* @__PURE__ */ B("div", {
							className: "text-[10px] font-semibold uppercase tracking-wide text-text-tertiary",
							children: "Details"
						}), /* @__PURE__ */ B("div", {
							className: "mt-0.5 break-words text-[11px] text-danger",
							"data-testid": `${E}-details-error`,
							children: le
						})]
					}),
					/* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-center gap-2 text-[11px] text-text-tertiary",
						children: [
							p && /* @__PURE__ */ B("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => p(i),
								className: e(Ze, "hover:text-text-primary"),
								"data-testid": `${E}-details-open-run`,
								children: "Open run in the pipeline"
							}),
							P && g && /* @__PURE__ */ B("button", {
								"data-ui-part": "",
								type: "button",
								onClick: () => g(P),
								className: e(Ze, "font-medium text-info"),
								"data-testid": `${E}-details-open-result`,
								children: F
							}),
							ue && /* @__PURE__ */ B("span", {
								className: "ml-auto min-w-0 truncate",
								"data-testid": `${E}-details-timings`,
								children: ue
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
	let o = L(() => ct(t, n), [t, n]);
	return o.length === 0 ? null : /* @__PURE__ */ B("div", {
		"data-testid": a,
		className: e("mt-1 flex flex-wrap gap-1", i),
		children: o.map((t) => /* @__PURE__ */ V("button", {
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
			children: [/* @__PURE__ */ B("span", {
				"aria-hidden": !0,
				children: t.emoji
			}), /* @__PURE__ */ B("span", {
				className: "tabular-nums",
				children: t.count
			})]
		}, t.emoji))
	});
}
//#endregion
//#region src/components/social/InlineMessageEditor.tsx
function dt({ initialText: e, onSave: n, onCancel: r, "data-testid": i = "message-editor" }) {
	let [a, o] = z(e), [s, c] = z(!1), [l, u] = z(null), d = R(null);
	I(() => {
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
	return /* @__PURE__ */ V("div", {
		className: "flex flex-col gap-1.5",
		"data-testid": i,
		children: [
			/* @__PURE__ */ B(C, {
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
			/* @__PURE__ */ V("div", {
				className: "flex items-center justify-end gap-1.5",
				children: [
					/* @__PURE__ */ B("span", {
						className: "mr-auto text-[11px] text-text-tertiary",
						children: "Enter to save · Esc to cancel"
					}),
					/* @__PURE__ */ B(t, {
						variant: "ghost",
						size: "sm",
						onClick: r,
						disabled: s,
						"data-testid": `${i}-cancel`,
						children: "Cancel"
					}),
					/* @__PURE__ */ B(t, {
						variant: "primary",
						size: "sm",
						onClick: () => void m(),
						disabled: !p,
						"data-testid": `${i}-save`,
						children: s ? "Saving…" : "Save"
					})
				]
			}),
			l && /* @__PURE__ */ B("p", {
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
function ft(e) {
	return typeof e.contentType == "string" && e.contentType.startsWith("image/");
}
function pt({ attachment: t, src: n, onOpen: r, className: i }) {
	let a = ft(t), o = n ?? t.preview, s = ({ label: n, className: i, children: a }) => r ? /* @__PURE__ */ B("button", {
		"data-ui-part": "",
		type: "button",
		onClick: () => r(t),
		"aria-label": n,
		className: e(i, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
		children: a
	}) : /* @__PURE__ */ B("div", {
		className: i,
		children: a
	});
	return a ? /* @__PURE__ */ V("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "image",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: [s({
			label: `Open image ${t.name}`,
			className: e("block max-w-full overflow-hidden rounded-lg border text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "cursor-zoom-in"),
			children: /* @__PURE__ */ B(te, { children: o ? /* @__PURE__ */ B("img", {
				src: o,
				alt: t.name,
				width: t.width,
				height: t.height,
				"data-testid": "attachment-bubble-image",
				className: e("block h-auto max-h-[320px] w-auto max-w-full object-contain", !n && "blur-[6px]")
			}) : n === null ? /* @__PURE__ */ B("div", {
				"data-testid": "attachment-bubble-unavailable",
				className: "flex h-24 w-40 items-center justify-center px-2 text-center text-xs text-[var(--color-text-tertiary)]",
				children: "Preview unavailable"
			}) : /* @__PURE__ */ B("div", {
				className: "flex h-24 w-40 items-center justify-center text-xs text-[var(--color-text-tertiary)]",
				children: "Loading image…"
			}) })
		}), /* @__PURE__ */ V("div", {
			className: "mt-0.5 flex min-w-0 items-baseline gap-2",
			children: [/* @__PURE__ */ B("span", {
				className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
				children: t.name
			}), /* @__PURE__ */ B("span", {
				className: "shrink-0 text-xs text-[var(--color-text-tertiary)]",
				children: P(t.size)
			})]
		})]
	}) : /* @__PURE__ */ B("div", {
		"data-testid": "attachment-bubble",
		"data-attachment-kind": "file",
		className: e("mt-1 min-w-0 max-w-full", i),
		children: s({
			label: `Download ${t.name}`,
			className: e("flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", r && "hover:bg-[var(--color-surface-hover)]"),
			children: /* @__PURE__ */ V(te, { children: [/* @__PURE__ */ B(gt, {}), /* @__PURE__ */ V("span", {
				className: "flex min-w-0 flex-col",
				children: [/* @__PURE__ */ B("span", {
					className: "min-w-0 break-all text-sm text-[var(--color-text-primary)]",
					children: t.name
				}), /* @__PURE__ */ B("span", {
					className: "text-xs text-[var(--color-text-tertiary)]",
					children: P(t.size)
				})]
			})] })
		})
	});
}
function mt(e, t, n) {
	return e.uploader ? !!t && e.uploader === t : !!n && e.actor === n;
}
function ht({ transfer: t, mine: n = !1, onCancel: r, className: i }) {
	let { size: a, transferred: o, phase: s } = t, c = a > 0 ? Math.min(100, Math.round(o / a * 100)) : 0, l = s === "failed" || s === "cancelled", u = s === "failed" ? t.error ?? "Upload failed" : s === "cancelled" ? "Cancelled" : s === "verifying" ? "Verifying…" : a > 0 ? `${c}%` : P(o);
	return /* @__PURE__ */ V("div", {
		"data-testid": "transfer-bubble",
		"data-transfer-phase": s,
		"data-transfer-pct": c,
		className: e("mt-1 flex min-w-0 max-w-full items-center gap-2.5 rounded-lg border px-2.5 py-2", "border-[var(--color-border)] bg-[var(--color-surface-inset)]", i),
		children: [
			t.preview ? /* @__PURE__ */ B("img", {
				src: t.preview,
				alt: "",
				"aria-hidden": "true",
				"data-testid": "transfer-bubble-preview",
				className: "h-9 w-9 shrink-0 rounded object-cover blur-[3px]"
			}) : /* @__PURE__ */ B(gt, {}),
			/* @__PURE__ */ V("div", {
				className: "flex min-w-0 grow flex-col gap-1",
				children: [
					/* @__PURE__ */ V("div", {
						className: "flex min-w-0 items-baseline gap-2",
						children: [/* @__PURE__ */ B("span", {
							className: "min-w-0 truncate text-sm text-[var(--color-text-primary)]",
							children: t.name
						}), /* @__PURE__ */ B("span", {
							"data-testid": "transfer-bubble-status",
							className: e("shrink-0 text-xs tabular-nums", l ? "text-[var(--color-danger,#dc2626)]" : "text-[var(--color-text-tertiary)]"),
							children: u
						})]
					}),
					/* @__PURE__ */ B("span", {
						className: "min-w-0 truncate text-xs text-[var(--color-text-tertiary)]",
						children: n ? "Sending…" : `${t.actor} is sending…`
					}),
					!l && /* @__PURE__ */ B("div", {
						role: "progressbar",
						"aria-valuemin": 0,
						"aria-valuemax": 100,
						"aria-valuenow": c,
						"aria-label": `${t.name} upload progress`,
						"data-testid": "transfer-bubble-bar",
						className: "h-1 w-full overflow-hidden rounded-full bg-[var(--color-surface-emphasis)]",
						children: /* @__PURE__ */ B("div", {
							className: "h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-200 ease-out",
							style: { width: `${c}%` }
						})
					})
				]
			}),
			n && r && !l && s !== "complete" && /* @__PURE__ */ B("button", {
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
function gt() {
	return /* @__PURE__ */ B("svg", {
		width: "20",
		height: "20",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		className: "shrink-0 text-[var(--color-text-tertiary)]",
		children: /* @__PURE__ */ B("path", {
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
function _t({ timestamp: t, now: n, tone: r = "light", className: i }) {
	let a = de(t, n);
	if (!a) return null;
	let o = r === "dark";
	return /* @__PURE__ */ V("div", {
		role: "separator",
		"aria-label": fe(t),
		"data-testid": "chat-day-separator",
		"data-day-label": a,
		className: e("flex items-center gap-2 py-2 select-none", i),
		children: [
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			}),
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide", o ? "bg-white/10 text-white/60" : "bg-surface-inset text-text-tertiary"),
				children: a
			}),
			/* @__PURE__ */ B("span", {
				"aria-hidden": "true",
				className: e("h-px grow", o ? "bg-white/15" : "bg-border")
			})
		]
	});
}
function vt(e, t = 64) {
	return e.scrollHeight - e.scrollTop - e.clientHeight <= t;
}
function yt(e, t, n = 120) {
	let r = t.replace(/\s+/g, " ").trim();
	return r ? `${e}: ${r.length > n ? `${r.slice(0, n)}…` : r}` : `${e} sent a message`;
}
function bt(e) {
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
function xt(e) {
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
var Q = {
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
		labels: t.map((e) => Q[e] ?? e)
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
function zt(e) {
	let t = e.userId;
	return t ? `id:${t}` : e.displayName ? `name:${e.displayName}` : void 0;
}
function Bt(e) {
	return e.metadata?.system === !0 || e.deletedAt || e.metadata?.deleted === !0 ? !1 : !(ot(e.metadata) || kt(e.metadata) || Ot(e.metadata) || bt(e.metadata) || At(e.metadata));
}
function Vt(e, t) {
	if (!e || e.kind !== "message" || t.kind !== "message") return !1;
	let n = e.message, r = t.message, i = zt(r);
	if (!i || i !== zt(n) || !Bt(n) || !Bt(r) || r.editedAt || ue(r.timestamp, n.timestamp)) return !1;
	let a = Date.parse(n.timestamp), o = Date.parse(r.timestamp);
	return !Number.isFinite(a) || !Number.isFinite(o) ? !1 : o >= a && o - a <= Rt;
}
function Ht(e, t) {
	if (!t) return -1;
	let n = Date.parse(t);
	if (!Number.isFinite(n)) return -1;
	for (let t = 0; t < e.length; t += 1) {
		let r = e[t], i = r === void 0 ? NaN : Date.parse(r);
		if (Number.isFinite(i) && i >= n) return t > 0 ? t : -1;
	}
	return -1;
}
function Ut({ tone: t = "light" }) {
	let n = t === "dark";
	return /* @__PURE__ */ V("div", {
		role: "separator",
		"aria-label": "New messages",
		"data-testid": "chat-unread-separator",
		className: "flex items-center gap-2 py-1 select-none",
		children: [/* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: e("h-px grow", n ? "bg-call-chrome-accent" : "bg-primary")
		}), /* @__PURE__ */ B("span", {
			"aria-hidden": "true",
			className: e("shrink-0 text-[11px] font-semibold uppercase tracking-wide", n ? "text-white" : "text-primary"),
			children: "New"
		})]
	});
}
function Wt(e, t, n) {
	let r = Date.parse(n);
	return Number.isFinite(r) ? e.filter((e) => {
		if (e.userId === t) return !1;
		let n = Date.parse(e.readAt);
		return Number.isFinite(n) && n >= r;
	}) : [];
}
function Gt(e) {
	return e.displayName || e.userId;
}
function Kt(e, t, n) {
	let r = /* @__PURE__ */ new Set();
	for (let t of e) {
		if (t.userId === n || t.metadata?.system === !0) continue;
		let e = zt(t);
		e && r.add(e);
	}
	for (let e of t) e.userId !== n && r.add(`id:${e.userId}`);
	return r.size;
}
function qt(e, t, n) {
	let r = t?.(e.runId);
	return {
		...r ? { loop: r } : {},
		...n && (r || e.lab) ? { onOpenLab: n } : {}
	};
}
function $({ messages: n, localMessages: r = [], onSend: i, disabled: a = !1, onTyping: o, typingUsers: s = [], emptyState: c, composer: l, dock: d, currentUserId: p, reactionsFor: m, onToggleReaction: _, onReply: v, reply: y, onCancelReply: b, onForwardMessage: x, onCopyLink: C, onTogglePin: T, onEditMessage: E, onDeleteMessage: D, canEditMessage: O, canDeleteMessage: M, pinnedMessageIds: P, onJumpToMessage: L, highlightedMessageId: ne, threaded: re = !1, postRhythm: W = "channel", alignOwnMessages: ie = !0, documentEditors: G, documentUnavailable: oe, callParticipants: se, agentRunStatus: ce, onOpenRun: le, agentLoopStatus: de, onOpenLab: fe, onOpenResult: me, onDecideRun: he, onReviewRun: _e, onRetryRun: ve, onJoinCall: ye, onOpenRecording: be, onCopyRecordingLink: Se, onShareRecording: we, onDownloadRecording: Ee, onOpenRecordingTranscript: De, onManageRecordingExpiry: Oe, recordingStatus: ke, onOpenDocument: Ae, renderMessageReferences: je, tone: K = "light", showHeader: Ne, fill: Pe, flushComposer: Fe = !1, contentAlign: Ie = "end", onLoadMore: Le, hasMore: q, loadingMore: J = !1, onSendFiles: ze, transfers: Y = [], currentActor: Ve, onCancelTransfer: He, attachmentSrc: Ue, onOpenAttachment: We, acceptFiles: Ge, maxFileSize: Ke, onFileError: qe, readReceipts: Je, readReceiptsEnabled: Ye = !0, unreadFrom: Xe, emojis: Ze = j }) {
	let [Qe, X] = z(null), [$e, et] = z(null), tt = R(null), [nt, rt] = z(null), Z = K === "dark", it = S(), st = Ne ?? !(it?.hasHeader ?? !1), ct = Pe ?? it?.fillsHeight ?? !1, [lt, ft] = z(""), gt = R(null), Q = R(null), wt = !!Le && q !== !1, Tt = R(null), Pt = R(null), [Rt, zt] = z(!1), Bt = !!ze && !a, $ = Mt(n, r), Yt = re ? Ft($) : null, [Xt, Zt] = z(() => /* @__PURE__ */ new Set());
	function Qt(e) {
		Zt((t) => {
			let n = new Set(t);
			return n.delete(e) || n.add(e), n;
		});
	}
	let $t = R(void 0);
	if (Xe !== void 0) {
		let e = $t.current;
		if (e === void 0) $t.current = Xe;
		else {
			let t = Date.parse(Xe), n = Date.parse(e);
			Number.isFinite(t) && Number.isFinite(n) && t < n && ($t.current = Xe);
		}
	}
	let en = $t.current, tn = en === void 0 ? -1 : Ht(Yt ? Yt.map((e) => jt(e.root)) : $.map((e) => jt(e)), en), nn = Je !== void 0, rn = Je ?? [], an = Ye && p ? p : void 0, on = (() => {
		if (an) for (let e = $.length - 1; e >= 0; --e) {
			let t = $[e];
			if (t.kind !== "message") continue;
			let n = t.message;
			if (!(n.userId !== an || !n.id) && !(n.deletedAt || n.metadata?.deleted === !0)) return {
				id: n.id,
				timestamp: n.timestamp
			};
		}
	})(), sn = on && an ? Wt(rn, an, on.timestamp) : [], cn = sn.length === 1 && !!an && Kt(n, rn, an) === 1;
	function ln() {
		if (!on) return null;
		if (sn.length === 0) return nn ? /* @__PURE__ */ B("div", {
			"data-testid": "chat-read-receipts",
			className: e("flex items-center gap-1 px-2 pb-1 text-[11px]", ie ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: /* @__PURE__ */ B("span", {
				"data-testid": "chat-read-receipts-label",
				children: "Sent"
			})
		}) : null;
		let t = sn.map(Gt), n = sn.slice(0, 3);
		return /* @__PURE__ */ V("div", {
			"data-testid": "chat-read-receipts",
			title: t.join(", "),
			className: e("mt-0.5 flex items-center gap-1 text-[11px]", ie ? "justify-end pr-1" : "justify-start pl-7", Z ? "text-white/50" : "text-text-tertiary"),
			children: [
				sn.length > 1 && /* @__PURE__ */ B("span", {
					className: "flex items-center gap-0.5",
					"aria-hidden": "true",
					children: n.map((e) => /* @__PURE__ */ B(w, {
						name: Gt(e),
						size: 14
					}, e.userId))
				}),
				/* @__PURE__ */ B("span", {
					"data-testid": "chat-read-receipts-label",
					children: cn ? "Seen" : `Seen by ${sn.length}`
				}),
				/* @__PURE__ */ B("span", {
					style: H,
					children: cn ? ` by ${t[0]}` : `: ${t.join(", ")}`
				})
			]
		});
	}
	let [un, dn] = z(0), [fn, pn] = z(!1), mn = R(!0), hn = R(n.length), gn = n.length + r.length + Y.length, _n = R(null), [vn, yn] = z(""), bn = R(null), xn = R(!1), Sn = R(0);
	I(() => {
		let e = n[n.length - 1];
		if (!e) return;
		let t = e.id ?? `${e.timestamp}:${e.clientId}:${e.content}`;
		if (!xn.current) {
			xn.current = !0, bn.current = t;
			return;
		}
		if (t === bn.current || (bn.current = t, p && e.userId === p)) return;
		Sn.current += 1;
		let r = Sn.current % 2 == 0 ? "​" : "";
		yn(yt(e.displayName ?? e.clientId.slice(0, 8), e.content) + r);
	}, [n, p]);
	function Cn() {
		let e = gt.current;
		e && (e.scrollTop = e.scrollHeight, mn.current = !0, dn(0));
	}
	function wn() {
		let e = gt.current;
		if (!e) return;
		let t = vt(e);
		mn.current = t, t && dn(0), pn(e.scrollTop > 8);
	}
	I(() => {
		let e = gt.current, t = hn.current, n = gn - t;
		if (hn.current = gn, !e) return;
		let r = _n.current;
		if (r && n > 0) {
			_n.current = null, e.scrollTop = r.scrollTop + (e.scrollHeight - r.scrollHeight);
			return;
		}
		mn.current ? (e.scrollTop = e.scrollHeight, dn(0), pn(e.scrollTop > 8)) : n > 0 && dn((e) => e + n);
	}, [gn]);
	function Tn() {
		let e = gt.current;
		e && (_n.current = {
			scrollHeight: e.scrollHeight,
			scrollTop: e.scrollTop
		}), Le?.();
	}
	I(() => () => {
		Q.current && clearTimeout(Q.current);
	}, []);
	function En() {
		let e = lt.trim();
		!e || a || (Q.current && clearTimeout(Q.current), Q.current = null, o?.(!1), mn.current = !0, i(e), ft(""));
	}
	function Dn(e) {
		!Bt || e.length === 0 || (mn.current = !0, ze?.(e));
	}
	function On(e) {
		if (!Bt) return;
		let t = Array.from(e.clipboardData?.items ?? []).filter((e) => e.kind === "file").map((e) => e.getAsFile()).filter((e) => e !== null);
		t.length !== 0 && (e.preventDefault(), Dn(t));
	}
	function kn(e) {
		ft((t) => t + e), zt(!1);
	}
	function An() {
		a || (o?.(!0), Q.current && clearTimeout(Q.current), Q.current = setTimeout(() => o?.(!1), 2e3));
	}
	function jn(e) {
		An(), e.key === "Enter" && !a && lt.trim() && En();
	}
	function Mn(n, r, i, a, o) {
		let s = n.kind === "message" ? n.message.timestamp : n.local.timestamp, c = !o && r === tn ? /* @__PURE__ */ B(Ut, { tone: K }) : null, l = !c && Vt(a, n), u = !o && ue(s, i) ? /* @__PURE__ */ B(_t, {
			timestamp: s,
			tone: K,
			className: r === 0 ? "pt-0" : void 0
		}, `day:${s}:${r}`) : null;
		if (n.kind === "local") {
			let r = n.local, i = ot(r.metadata);
			return /* @__PURE__ */ V(F, { children: [
				u,
				c,
				/* @__PURE__ */ B("div", {
					"data-testid": "chat-local-message",
					"data-local-message-id": r.id,
					className: "rounded-md",
					children: /* @__PURE__ */ B(ge, {
						author: r.displayName,
						timestamp: r.timestamp,
						tone: K,
						mine: !0,
						contentLayout: i || r.body != null ? "block" : "inline",
						content: /* @__PURE__ */ V(te, { children: [
							i ? /* @__PURE__ */ B(at, {
								runId: i.runId,
								instruction: i.instruction || r.content,
								command: i.command,
								agentName: i.agentName,
								requestedBy: r.displayName,
								status: ce?.(i.runId),
								onOpenDocument: Ae && i.documentId ? () => Ae(i.documentId) : void 0,
								documentTitle: i.documentTitle,
								onOpenRun: le,
								result: i.result,
								onOpenResult: me,
								onDecide: he,
								suggestion: i.suggestionKey ? {
									key: i.suggestionKey,
									...i.documentId ? { documentId: i.documentId } : {}
								} : void 0,
								onReview: _e,
								onRetry: ve,
								...qt(i, de, fe)
							}) : r.body == null ? /* @__PURE__ */ B(xe, { text: r.content }) : /* @__PURE__ */ B("div", {
								"data-testid": "chat-local-message-body",
								className: "min-w-0",
								children: typeof r.body == "function" ? r.body() : r.body
							}),
							/* @__PURE__ */ B("div", {
								"data-testid": "chat-local-message-note",
								className: e("mt-1 text-[11px] italic", Z ? "text-white/50" : "text-text-tertiary"),
								children: r.note ?? "Only you can see this"
							}),
							r.actions && r.actions.length > 0 && /* @__PURE__ */ B("div", {
								className: "mt-1.5 flex flex-wrap gap-1.5",
								"data-testid": "chat-local-message-actions",
								children: r.actions.map((e) => /* @__PURE__ */ B(t, {
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
		let { message: d } = n, h = d.displayName ?? d.clientId.slice(0, 8), g = d.attachments ?? [], y = d.metadata?.html, b = typeof y == "string" ? y : void 0, S = Dt(d.metadata), w = Et(d.content, S, b), ee = /* @__PURE__ */ B(xe, {
			html: w.html,
			text: w.body
		}), k = bt(d.metadata), A = ot(d.metadata), j = Ot(d.metadata), I = kt(d.metadata), R = At(d.metadata), z = St(d.metadata), H = xt(d.metadata), re = A ? /* @__PURE__ */ B(at, {
			runId: A.runId,
			instruction: A.instruction || d.content.replace(/^\/doc\s*/i, ""),
			command: A.command,
			agentName: A.agentName,
			requestedBy: d.displayName,
			status: ce?.(A.runId),
			onOpenDocument: Ae && A.documentId ? () => Ae(A.documentId) : void 0,
			documentTitle: A.documentTitle,
			onOpenRun: le,
			result: A.result,
			onOpenResult: me,
			onDecide: he,
			suggestion: A.suggestionKey ? {
				key: A.suggestionKey,
				...A.documentId ? { documentId: A.documentId } : {}
			} : void 0,
			onReview: _e,
			onRetry: ve,
			...qt(A, de, fe)
		}) : I ? (() => {
			let e = ke?.(I.recordingId), t = {
				...I,
				...e ?? {}
			};
			return /* @__PURE__ */ B(Re, {
				recordingId: t.recordingId,
				title: t.title,
				recordedBy: t.recordedBy ?? d.displayName,
				participants: t.participants,
				participantCount: t.participantCount,
				startedAt: t.startedAt,
				durationMs: t.durationMs,
				thumbnailUrl: t.thumbnailUrl,
				stage: t.stage ?? "ready",
				transcriptReady: t.transcriptReady,
				summaryReady: t.summaryReady,
				expiresAt: t.expiresAt,
				pinned: !!d.id && !!P?.has(d.id),
				onOpen: be,
				onCopyLink: Se,
				onShare: we,
				onDownload: Ee,
				onOpenTranscript: De,
				onManageExpiry: Oe,
				onTogglePin: T ? () => T(d) : void 0
			});
		})() : j ? /* @__PURE__ */ B(Me, {
			callId: j.callId,
			startedBy: (typeof d.metadata?.displayName == "string" ? d.metadata.displayName : void 0) ?? d.displayName,
			participants: se?.(j.callId) ?? j.participants,
			live: j.live,
			durationMs: j.durationMs,
			startedAt: j.startedAt,
			outcome: j.outcome,
			recordingId: j.recordingId,
			onOpenRecording: be,
			audioOnly: j.audioOnly,
			recorded: j.recorded,
			notRecordedReason: j.notRecordedReason,
			lobbyName: j.lobbyName,
			onJoin: ye
		}) : k ? /* @__PURE__ */ B(Ce, {
			documentId: k.documentId,
			title: k.title || d.content,
			icon: k.icon,
			createdBy: k.createdBy ?? (typeof d.metadata?.displayName == "string" ? d.metadata.displayName : void 0) ?? d.displayName,
			editors: G?.(k.documentId) ?? [],
			onOpen: Ae,
			unavailable: oe?.(k.documentId)
		}) : g.length === 0 ? ee : /* @__PURE__ */ V(te, { children: [(d.content || b) && ee, g.map((e) => /* @__PURE__ */ B(pt, {
			attachment: e,
			src: Ue?.(e),
			onOpen: We
		}, e.id))] }), U = d.id ?? "", W = U && m ? m(U) : [], Ne = d.metadata?.replyTo, Pe = !!o && !!Ne && Ne.messageId === o.rootId, Fe = !!Ne && !Pe, Ie = !!U && !!P?.has(U), Le = !!p && d.userId === p, q = d.metadata?.system === !0, J = !!d.deletedAt || d.metadata?.deleted === !0, ze = !!(A || I || j || k || R), Y = !!(A || I || j || k || g.length > 0), Ve = !J && !q && !ze && !!U, He = Ve && (O ? O(d) : Le), Ge = Ve && (M ? M(d) : Le), Ke = He || Ge, qe = !!U && !J && !q && !ze && g.length === 0 && !!d.content.trim(), Je = He && !!E && Qe === U, Ye = /* @__PURE__ */ V(te, { children: [
			Fe && Ne && /* @__PURE__ */ B(N, {
				quote: Ne,
				onJump: L,
				className: "mb-1"
			}),
			S && /* @__PURE__ */ V("span", {
				className: "mb-0.5 block text-[11px] text-text-tertiary",
				"data-testid": "forwarded-marker",
				title: [Ct(S), S.timestamp ? pe(S.timestamp) : ""].filter(Boolean).join(" · "),
				children: [
					/* @__PURE__ */ B("span", {
						"aria-hidden": !0,
						children: "↪"
					}),
					" ",
					w.stripped ? Ct(S) : "Forwarded"
				]
			}),
			Ie && /* @__PURE__ */ V("span", {
				className: "mb-0.5 flex items-center gap-1 text-[11px] text-text-tertiary",
				"data-testid": "pinned-marker",
				children: [/* @__PURE__ */ B(f, {
					size: 11,
					className: "shrink-0"
				}), " Pinned"]
			}),
			J ? /* @__PURE__ */ B("span", {
				className: "italic text-text-tertiary",
				"data-testid": "message-deleted",
				children: "This message was deleted."
			}) : Je ? /* @__PURE__ */ B(dt, {
				initialText: d.content,
				onSave: async (e) => {
					await E(d, e), X(null);
				},
				onCancel: () => X(null)
			}) : re,
			!J && je?.(d),
			!J && H.length > 0 && /* @__PURE__ */ B("div", {
				className: "mt-1 flex flex-wrap gap-1",
				"data-testid": "chat-message-docrefs",
				children: H.map((e) => /* @__PURE__ */ B(Te, {
					documentId: e.id,
					label: e.label,
					icon: e.icon,
					onOpen: Ae,
					unavailable: oe?.(e.id)
				}, e.id))
			}),
			!J && z && /* @__PURE__ */ V("div", {
				"data-testid": "message-truncated",
				className: "mt-1 text-[11px] text-warning-fg",
				children: [
					"⚠",
					" ",
					z.labels.length > 0 ? `Too large to send: ${z.labels.join(", ")}` : "Part of this message was too large to send"
				]
			}),
			!J && W.length > 0 && p && _ && /* @__PURE__ */ B(ut, {
				reactions: W,
				currentUserId: p,
				onToggle: (e) => _(U, e)
			})
		] });
		return R ? /* @__PURE__ */ V(F, { children: [
			u,
			c,
			/* @__PURE__ */ B(Be, {
				membership: R,
				fallbackText: d.content,
				timestamp: d.timestamp,
				"data-testid": "membership-notice"
			})
		] }, d.id ?? r) : /* @__PURE__ */ V(F, { children: [
			u,
			c,
			/* @__PURE__ */ B("div", {
				"data-testid": "chat-message",
				"data-message-id": U || void 0,
				"data-continues": l ? "true" : void 0,
				title: l ? pe(d.timestamp) : void 0,
				className: e("group relative rounded-md px-2 transition-colors hover:bg-surface-hover", U && U === ne && "bg-surface-inset ring-1 ring-inset ring-primary transition-colors"),
				children: /* @__PURE__ */ B(ge, {
					actionsLayout: "menu",
					className: l ? "py-0.5" : void 0,
					author: h,
					content: Ye,
					timestamp: l ? "" : d.timestamp,
					editedAt: J ? void 0 : d.editedAt,
					avatarUrl: d.avatarUrl,
					hideAvatar: l,
					hideAuthor: l,
					tone: K,
					mine: Le && ie,
					contentLayout: Y ? "block" : "inline",
					actions: U && !J && !Je && (_ || Ke || qe && x || !q && (v || T || C)) ? /* @__PURE__ */ B(ae, {
						className: "max-w-full flex-wrap",
						onReact: _ ? (e) => _(U, e) : void 0,
						onOpenReactionPicker: _ ? (e) => {
							tt.current = e, et(U);
						} : void 0,
						onReply: v && !q ? () => v(o?.rootMessage ?? d) : void 0,
						onForward: x && qe ? (e) => x(d, e) : void 0,
						onCopyLink: C && !q && U ? () => C(d) : void 0,
						onTogglePin: T && !q ? () => T(d) : void 0,
						pinned: !!d.id && !!P?.has(d.id),
						onEdit: He && E ? () => X(U) : void 0,
						onDelete: Ge && D ? () => rt(U) : void 0
					}) : void 0
				})
			}),
			!!on && U === on.id && ln()
		] }, d.id ?? r);
	}
	function Nn(e) {
		return e.kind === "message" ? e.message.displayName ?? e.message.clientId.slice(0, 8) : e.local.displayName;
	}
	function Pn(e) {
		if (!v || e.kind !== "message") return;
		let t = e.message;
		if (t.id && !(t.deletedAt || t.metadata?.deleted === !0) && t.metadata?.system !== !0 && !At(t.metadata)) return t;
	}
	function Fn(t, n, r) {
		let i = jt(r?.root), a = W === "chat", o = r && r.replies.length === 0 && (a || !Pn(r.root)) ? r.root : void 0, s = Mn(t.root, n, i, o), c = jt(t.root) ?? "", l = !a && n > 0 && n !== tn && !ue(c, i) ? /* @__PURE__ */ B("div", {
			"aria-hidden": "true",
			"data-testid": "chat-post-boundary",
			className: e("mt-3 border-t pt-3", Z ? "border-white/10" : "border-border-subtle")
		}) : null, u = t.replies.length > 0 ? Pn(t.root) : null;
		if (t.replies.length === 0 && !u) return l ? /* @__PURE__ */ V(F, { children: [l, s] }, `post:${Nt(t.root) ?? n}`) : s;
		let d = Nt(t.root) ?? "", f = t.root.kind === "message" ? t.root.message : void 0, p = !!d && t.replies.length > It, m = !p || Xt.has(d), h = m ? t.replies : t.replies.slice(0, Lt), g = t.replies.length - h.length, _ = [...new Set(t.replies.slice(h.length).map(Nn))].slice(0, 3);
		return /* @__PURE__ */ V(F, { children: [l, /* @__PURE__ */ V("div", {
			"data-testid": "chat-thread",
			"data-thread-root": d || void 0,
			className: "group/post",
			children: [
				s,
				t.replies.length > 0 && /* @__PURE__ */ V("div", {
					"data-testid": "chat-thread-replies",
					className: e("ml-7 border-l pl-2", Z ? "border-white/20" : "border-border"),
					children: [h.map((e, t) => Mn(e, t, void 0, h[t - 1], {
						rootId: d,
						...f ? { rootMessage: f } : {}
					})), p && /* @__PURE__ */ V("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-toggle",
						"aria-expanded": m,
						onClick: () => Qt(d),
						className: e("mt-0.5 flex items-center gap-1.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
						children: [!m && _.length > 0 && /* @__PURE__ */ B("span", {
							className: "flex items-center gap-0.5",
							children: _.map((e) => /* @__PURE__ */ B(w, {
								name: e,
								size: 16
							}, e))
						}), m ? "Show fewer replies" : `${g} more ${g === 1 ? "reply" : "replies"}`]
					})]
				}),
				u && /* @__PURE__ */ B("div", {
					className: "ml-7 border-l border-transparent pl-2",
					children: /* @__PURE__ */ B("button", {
						"data-ui-part": "",
						type: "button",
						"data-testid": "chat-thread-reply",
						"aria-label": `Reply to ${Nn(t.root)}`,
						onClick: () => v?.(u),
						className: e("mt-0.5 rounded px-1 py-0.5 text-xs", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/50 hover:bg-white/10 hover:text-white/80 focus-visible:text-white/80" : "text-text-tertiary hover:bg-surface-hover hover:text-text-secondary focus-visible:text-text-secondary"),
						children: "Reply"
					})
				})
			]
		})] }, `post:${d || n}`);
	}
	let In = /* @__PURE__ */ V("div", {
		"data-testid": "chat-panel",
		className: e(ct ? e("flex h-full min-h-0 flex-col", Fe && l ? "px-0 pb-0" : "px-[var(--ui-content-gutter,1rem)] pb-3") : e("border rounded mt-4", Fe && l ? "px-0 pt-3 pb-0" : "p-3", Z ? "border-white/10 bg-white/5" : "border-border")),
		children: [
			st && /* @__PURE__ */ V("div", {
				className: e("text-sm font-semibold mb-2 shrink-0", Fe && l && "mx-[var(--ui-content-gutter,1rem)]", Z ? "text-white/90" : "text-text-primary"),
				children: [
					"Chat (",
					n.length,
					")"
				]
			}),
			/* @__PURE__ */ B("span", {
				style: H,
				role: "status",
				"aria-live": "polite",
				"data-testid": "chat-panel-announcer",
				children: vn
			}),
			/* @__PURE__ */ V("div", {
				className: e("relative flex flex-col mb-2", ct ? "min-h-0 flex-1" : "", Fe && l && "mx-[var(--ui-content-gutter,1rem)]"),
				children: [/* @__PURE__ */ B("div", {
					ref: gt,
					onScroll: wn,
					"data-testid": "chat-panel-messages",
					role: "log",
					"aria-live": "off",
					"aria-label": "Message history",
					tabIndex: 0,
					className: e("relative scrollbar-none overflow-y-auto overflow-x-hidden flex flex-col", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset rounded", fn && "fade-top", ct ? "min-h-0 flex-1" : "max-h-[200px]"),
					children: /* @__PURE__ */ V("div", {
						"data-chat-content": !0,
						className: e("pb-[var(--ui-chat-gap,1rem)]", Ie === "end" && "mt-auto"),
						children: [
							wt && n.length > 0 && /* @__PURE__ */ B("div", {
								className: "flex justify-center pb-1",
								children: /* @__PURE__ */ B("button", {
									"data-ui-part": "",
									type: "button",
									"data-testid": "chat-panel-load-more",
									onClick: Tn,
									disabled: J,
									className: e("rounded px-2 py-1 text-xs disabled:opacity-60", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "text-white/70 hover:bg-white/10" : "text-text-secondary hover:bg-surface-hover"),
									children: J ? "Loading…" : "Load earlier messages"
								})
							}),
							$.length === 0 ? c ?? /* @__PURE__ */ B("div", {
								className: e("text-sm", Z ? "text-white/40" : "text-text-secondary"),
								children: "No messages yet"
							}) : Yt ? Yt.map((e, t) => Fn(e, t, Yt[t - 1])) : $.map((e, t) => Mn(e, t, jt($[t - 1]), $[t - 1])),
							_ && /* @__PURE__ */ B(k, {
								open: $e !== null,
								triggerRef: tt,
								emojis: Ze,
								onSelect: (e) => {
									$e && _($e, e), et(null);
								},
								onClose: () => et(null)
							}),
							D && /* @__PURE__ */ B(h, {
								open: nt !== null,
								tone: "destructive",
								title: "Delete this message?",
								body: "It will be removed for everyone in this conversation.",
								confirmLabel: "Delete",
								onCancel: () => rt(null),
								onConfirm: () => {
									let e = n.find((e) => e.id === nt);
									rt(null), e && D(e);
								}
							}),
							Y.map((e) => /* @__PURE__ */ B(ge, {
								author: e.actor,
								timestamp: "",
								tone: K,
								content: /* @__PURE__ */ B(ht, {
									transfer: e,
									mine: mt(e, p, Ve),
									onCancel: He
								})
							}, e.transferId))
						]
					})
				}), un > 0 && /* @__PURE__ */ V("button", {
					"data-ui-part": "",
					type: "button",
					"data-testid": "chat-panel-new-messages",
					onClick: Cn,
					className: e("absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-xs shadow-md", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", Z ? "bg-white/20 text-white" : "bg-primary text-on-primary"),
					children: [
						un,
						" new message",
						un === 1 ? "" : "s",
						" ↓"
					]
				})]
			}),
			s.length > 0 && /* @__PURE__ */ B(U, {
				names: s,
				className: e("mb-1 mt-1 shrink-0 italic", Fe && l && "mx-[var(--ui-content-gutter,1rem)]", Z ? "text-white/50" : "text-text-secondary")
			}),
			d != null && d !== !1 && /* @__PURE__ */ B("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-dock-slot",
				children: d
			}),
			l ? /* @__PURE__ */ B("div", {
				className: "shrink-0",
				"data-testid": "chat-panel-composer-slot",
				onKeyDownCapture: o ? An : void 0,
				children: l
			}) : /* @__PURE__ */ V("div", {
				className: "flex shrink-0 flex-col gap-1",
				children: [y && /* @__PURE__ */ B(N, {
					quote: y,
					onDismiss: b,
					"data-testid": "chat-panel-pending-reply"
				}), /* @__PURE__ */ V("div", {
					className: "flex flex-row items-center gap-2 shrink-0",
					children: [
						ze && /* @__PURE__ */ V(te, { children: [/* @__PURE__ */ B("button", {
							"data-ui-part": "",
							type: "button",
							"data-testid": "chat-panel-attach",
							"aria-label": "Attach a file",
							title: "Attach a file",
							disabled: !Bt,
							onClick: () => Tt.current?.click(),
							className: e("shrink-0 rounded p-1.5 disabled:opacity-40", Z ? "text-white/60 hover:bg-white/10" : "text-[var(--color-text-tertiary)] hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ B(Jt, {})
						}), /* @__PURE__ */ B(ee, {
							ref: Tt,
							multiple: !0,
							accept: Ge,
							onFiles: (e) => {
								let t = Ke ? e.filter((e) => e.size > Ke) : [];
								t.length > 0 && qe?.(`Skipped ${t.length} file(s) over the size limit.`), Dn(e.filter((e) => !t.includes(e)));
							}
						})] }),
						/* @__PURE__ */ B("button", {
							"data-ui-part": "",
							ref: Pt,
							type: "button",
							"data-testid": "chat-panel-emoji",
							"aria-label": "Insert emoji",
							"aria-expanded": Rt,
							title: "Insert emoji",
							disabled: a,
							onClick: () => zt((e) => !e),
							className: e("shrink-0 rounded p-1.5 text-base leading-none disabled:opacity-40", Z ? "hover:bg-white/10" : "hover:bg-[var(--color-surface-hover)]", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"),
							children: /* @__PURE__ */ B(u, {
								size: 16,
								"aria-hidden": "true"
							})
						}),
						/* @__PURE__ */ B(k, {
							open: Rt,
							onSelect: kn,
							onClose: () => zt(!1),
							triggerRef: Pt,
							emojis: Ze
						}),
						/* @__PURE__ */ B(g, {
							size: "sm",
							value: lt,
							onChange: (e) => ft(e.target.value),
							onKeyDown: jn,
							onPaste: On,
							disabled: a,
							placeholder: a ? "Not connected" : "Type a message...",
							className: e("flex-1 text-sm", Z && "border-white/20 bg-white/10 text-white placeholder:text-white/35 focus:border-white/40 focus:bg-white/10 focus:ring-white/20")
						}),
						/* @__PURE__ */ B(t, {
							variant: "primary",
							size: "sm",
							onClick: En,
							disabled: a || !lt.trim(),
							className: "text-sm px-3 shrink-0",
							children: "Send"
						})
					]
				})]
			})
		]
	});
	return ze ? /* @__PURE__ */ B(A, {
		onFiles: Dn,
		accept: Ge,
		maxSize: Ke,
		onError: qe,
		disabled: a,
		className: ct ? "flex h-full min-h-0 flex-col" : void 0,
		children: In
	}) : In;
}
function Jt() {
	return /* @__PURE__ */ B("svg", {
		width: "18",
		height: "18",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ B("path", {
			d: "M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48",
			stroke: "currentColor",
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
//#endregion
export { ce as $, ze as A, Te as B, st as C, et as D, Xe as E, K as F, he as G, Se as H, De as I, de as J, me as K, Ee as L, Re as M, Ie as N, He as O, Me as P, se as Q, ke as R, ot as S, Ue as T, xe as U, Ce as V, ge as W, pe as X, fe as Y, ue as Z, ut as _, wt as a, ne as at, Z as b, At as c, Et as d, ae as et, _t as f, dt as g, ft as h, xt as i, H as it, J as j, Be as k, kt as l, ht as m, Ot as n, U as nt, Ct as o, pt as p, le as q, bt as r, re as rt, Dt as s, $ as t, W as tt, St as u, lt as v, rt as w, at as x, ct as y, je as z };
