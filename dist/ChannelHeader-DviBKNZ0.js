import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./ThinkingDots-BHtlGy_Q.js";
import { t as n } from "./Avatar-DkkMISPQ.js";
import { t as r } from "./StatusDot-GwVn-q5q.js";
import { useEffect as i, useRef as a, useState as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var l = {
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
function u({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ s(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: l,
		children: t
	});
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function d(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function f({ names: n, compact: r = !1, size: i = "sm", className: a, "data-testid": o = "typing-indicator" }) {
	return n.length === 0 ? null : /* @__PURE__ */ c("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", a),
		children: [/* @__PURE__ */ s(t, { size: i }), !r && /* @__PURE__ */ s("span", { children: d(n) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function p({ name: t, onRename: l, memberCount: u, description: d, tabs: f, actions: p, avatarUrl: m, online: h, onMembersClick: g, size: _ = "md", headingLevel: v = 2, as: y = "div", className: b, "data-testid": x }) {
	let S = _ === "sm", C = y, w = v === 1 ? "h1" : "h2", [T, E] = o(!1), [D, O] = o(t), k = a(null);
	i(() => {
		T || O(t);
	}, [t, T]), i(() => {
		T && (k.current?.focus(), k.current?.select());
	}, [T]);
	let A = () => {
		let e = D.trim();
		if (E(!1), !e || e === t) {
			O(t);
			return;
		}
		l?.(e);
	}, j = () => {
		O(t), E(!1);
	};
	return /* @__PURE__ */ c(C, {
		"data-testid": x,
		"data-size": _,
		className: e("@container flex items-center justify-between", S ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", b),
		children: [
			/* @__PURE__ */ c("div", {
				className: e("flex min-w-0 max-w-full items-center", S ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ c("div", {
					className: "relative shrink-0",
					children: [m ? /* @__PURE__ */ s("img", {
						src: m,
						alt: t,
						className: S ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ s(n, {
						name: t,
						size: S ? 28 : 36
					}), h !== void 0 && /* @__PURE__ */ s("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ s(r, {
							color: h ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": h ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ c("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ c("div", {
						className: "flex items-baseline gap-2",
						children: [T ? /* @__PURE__ */ s("input", {
							"data-ui-part": "",
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
						}) : /* @__PURE__ */ s(w, {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", v === 1 ? "text-xl" : "text-sm", l && "cursor-text"),
							onDoubleClick: l ? () => E(!0) : void 0,
							title: l ? "Double-click to rename" : void 0,
							"data-testid": x ? `${x}-name` : void 0,
							children: t
						}), u !== void 0 && (g ? /* @__PURE__ */ c("button", {
							"data-ui-part": "",
							type: "button",
							onClick: g,
							"data-testid": "channel-header-members",
							"aria-label": `${u} ${u === 1 ? "member" : "members"} — open the member list`,
							className: e("text-xs font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								u,
								" ",
								u === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ c("span", {
							"data-testid": "channel-header-members",
							className: "text-xs font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								u,
								" ",
								u === 1 ? "member" : "members"
							]
						}))]
					}), d && !S && /* @__PURE__ */ s("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: d
					})]
				})]
			}),
			f && /* @__PURE__ */ s("div", {
				className: e("flex max-w-full items-center justify-end overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full @max-3xl:justify-start", S ? "min-w-0 flex-1" : "flex-[1_0_auto]"),
				children: f
			}),
			p && /* @__PURE__ */ s("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
export { u as a, l as i, f as n, d as r, p as t };
