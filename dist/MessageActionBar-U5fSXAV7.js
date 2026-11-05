import { t as e } from "./cn-D4QmbyEy.js";
import { A as t, B as n, St as r, dt as i, gt as a, tt as o, w as s } from "./Icons-CqVFbuiZ.js";
import { t as c } from "./ThinkingDots-52RnodUR.js";
import { t as l } from "./Avatar-DkkMISPQ.js";
import { t as u } from "./StatusDot-GwVn-q5q.js";
import { t as d } from "./RovingToolbar-B1Fai5PF.js";
import { useEffect as f, useRef as p, useState as m } from "react";
import { jsx as h, jsxs as g } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var _ = {
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
function v({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ h(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: _,
		children: t
	});
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function y(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function b({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ g("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ h(c, { size: r }), !n && /* @__PURE__ */ h("span", { children: y(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function x({ name: t, onRename: n, memberCount: r, description: i, tabs: a, actions: o, avatarUrl: s, online: c, onMembersClick: d, size: _ = "md", headingLevel: v = 2, as: y = "div", className: b, "data-testid": x }) {
	let S = _ === "sm", C = y, w = v === 1 ? "h1" : "h2", [T, E] = m(!1), [D, O] = m(t), k = p(null);
	f(() => {
		T || O(t);
	}, [t, T]), f(() => {
		T && (k.current?.focus(), k.current?.select());
	}, [T]);
	let A = () => {
		let e = D.trim();
		if (E(!1), !e || e === t) {
			O(t);
			return;
		}
		n?.(e);
	}, j = () => {
		O(t), E(!1);
	};
	return /* @__PURE__ */ g(C, {
		"data-testid": x,
		"data-size": _,
		className: e("@container flex items-center justify-between", S ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", b),
		children: [
			/* @__PURE__ */ g("div", {
				className: e("flex min-w-0 max-w-full items-center", S ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ g("div", {
					className: "relative shrink-0",
					children: [s ? /* @__PURE__ */ h("img", {
						src: s,
						alt: t,
						className: S ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ h(l, {
						name: t,
						size: S ? 28 : 36
					}), c !== void 0 && /* @__PURE__ */ h("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ h(u, {
							color: c ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": c ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ g("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ g("div", {
						className: "flex items-baseline gap-2",
						children: [T ? /* @__PURE__ */ h("input", {
							ref: k,
							value: D,
							onChange: (e) => O(e.target.value.slice(0, 100)),
							maxLength: 100,
							"aria-label": "Conversation name",
							"data-testid": x ? `${x}-name-input` : "channel-header-name-input",
							onBlur: A,
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), A()) : e.key === "Escape" && (e.preventDefault(), j()), e.stopPropagation();
							},
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", "text-sm")
						}) : /* @__PURE__ */ h(w, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", v === 1 ? "text-xl" : "text-sm", n && "cursor-text"),
							onDoubleClick: n ? () => E(!0) : void 0,
							title: n ? "Double-click to rename" : void 0,
							"data-testid": x ? `${x}-name` : void 0,
							children: t
						}), r !== void 0 && (d ? /* @__PURE__ */ g("button", {
							type: "button",
							onClick: d,
							"data-testid": "channel-header-members",
							"aria-label": `${r} ${r === 1 ? "member" : "members"} — open the member list`,
							className: e("text-xs font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ g("span", {
							"data-testid": "channel-header-members",
							className: "text-xs font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								r,
								" ",
								r === 1 ? "member" : "members"
							]
						}))]
					}), i && !S && /* @__PURE__ */ h("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: i
					})]
				})]
			}),
			a && /* @__PURE__ */ h("div", {
				className: e("flex max-w-full items-center justify-end overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full @max-3xl:justify-start", S ? "min-w-0 flex-1" : "flex-[1_0_auto]"),
				children: a
			}),
			o && /* @__PURE__ */ h("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: o
			})
		]
	});
}
//#endregion
//#region src/components/social/MessageActionBar.tsx
var S = [
	"👍",
	"🎉",
	"❤️"
], C = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
function w({ actions: c = [], label: l = "Message actions", quickReactions: u = S, onReact: f, onOpenReactionPicker: p, onReply: m, onForward: g, onTogglePin: _, pinned: v = !1, onCopyLink: y, onEdit: b, onDelete: x, className: w, "data-testid": T = "message-actions" }) {
	let E = [], D = (e, t, n, r) => E.push({
		key: e,
		label: t,
		glyph: n,
		onClick: r
	});
	if (f) for (let e of u) D(`react-${e}`, `React ${e}`, /* @__PURE__ */ h("span", {
		"aria-hidden": !0,
		children: e
	}), () => f(e));
	p && D("more-reactions", "More reactions", /* @__PURE__ */ h(a, { size: 14 }), (e) => p(e.currentTarget)), m && D("reply", "Reply", /* @__PURE__ */ h(i, { size: 14 }), m), g && D("forward", "Forward to another conversation", /* @__PURE__ */ h(t, { size: 14 }), (e) => g(e.currentTarget)), _ && D("pin", v ? "Unpin" : "Pin to channel", /* @__PURE__ */ h(o, { size: 14 }), _), y && D("copy-link", "Copy link to message", /* @__PURE__ */ h(n, { size: 14 }), y), b && D("edit", "Edit message", /* @__PURE__ */ h(s, { size: 13 }), b), x && D("delete", "Delete message", /* @__PURE__ */ h(r, { size: 13 }), x);
	for (let e of c) E.push({
		key: e.id,
		label: e.label,
		glyph: e.icon,
		disabled: e.disabled,
		onClick: (t) => e.onClick(t.currentTarget)
	});
	return E.length === 0 ? null : /* @__PURE__ */ h(d, {
		label: l,
		"data-testid": T,
		className: e("gap-0.5 rounded-lg border border-border bg-surface p-0.5 shadow-sm", w),
		children: E.map((e) => /* @__PURE__ */ h("button", {
			type: "button",
			"aria-label": e.label,
			title: e.label,
			"data-testid": `${T}-${e.key}`,
			onClick: e.onClick,
			disabled: e.disabled,
			className: `grid h-6 w-6 place-items-center rounded text-xs leading-none text-text-secondary hover:bg-surface-hover hover:text-text-primary ${C}`,
			children: e.glyph
		}, e.key))
	});
}
//#endregion
export { _ as a, y as i, x as n, v as o, b as r, w as t };
