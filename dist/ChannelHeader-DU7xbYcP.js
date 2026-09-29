import { t as e } from "./cn-D4QmbyEy.js";
import { t } from "./Avatar-k-lopdn-.js";
import { t as n } from "./StatusDot-ClFcLvD7.js";
import { useEffect as r, useRef as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var c = {
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
function l({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ o(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: c,
		children: t
	});
}
//#endregion
//#region src/components/shared/ThinkingDots.tsx
function u({ size: t = "md", className: n }) {
	return /* @__PURE__ */ o("span", {
		className: e("inline-flex items-center gap-1", n),
		"data-testid": "thinking-dots",
		children: [
			0,
			1,
			2
		].map((n) => /* @__PURE__ */ o("span", { className: e("ui-thinking-dot inline-block rounded-full bg-current", t === "sm" ? "h-1 w-1" : "h-1.5 w-1.5", n === 1 && "[animation-delay:200ms]", n === 2 && "[animation-delay:400ms]") }, n))
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
function f({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ s("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ o(u, { size: r }), !n && /* @__PURE__ */ o("span", { children: d(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function p({ name: c, onRename: l, memberCount: u, description: d, tabs: f, actions: p, avatarUrl: m, online: h, onMembersClick: g, size: _ = "md", as: v = "div", className: y, "data-testid": b }) {
	let x = _ === "sm", S = v, [C, w] = a(!1), [T, E] = a(c), D = i(null);
	r(() => {
		C || E(c);
	}, [c, C]), r(() => {
		C && (D.current?.focus(), D.current?.select());
	}, [C]);
	let O = () => {
		let e = T.trim();
		if (w(!1), !e || e === c) {
			E(c);
			return;
		}
		l?.(e);
	}, k = () => {
		E(c), w(!1);
	};
	return /* @__PURE__ */ s(S, {
		"data-testid": b,
		"data-size": _,
		className: e("@container flex items-center justify-between", x ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", y),
		children: [
			/* @__PURE__ */ s("div", {
				className: e("flex min-w-0 items-center", x ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ s("div", {
					className: "relative shrink-0",
					children: [m ? /* @__PURE__ */ o("img", {
						src: m,
						alt: c,
						className: x ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ o(t, {
						name: c,
						size: x ? 28 : 36
					}), h !== void 0 && /* @__PURE__ */ o("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ o(n, {
							color: h ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": h ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ s("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ s("div", {
						className: "flex items-center gap-2",
						children: [C ? /* @__PURE__ */ o("input", {
							ref: D,
							value: T,
							onChange: (e) => E(e.target.value.slice(0, 100)),
							maxLength: 100,
							"aria-label": "Conversation name",
							"data-testid": b ? `${b}-name-input` : "channel-header-name-input",
							onBlur: O,
							onKeyDown: (e) => {
								e.key === "Enter" ? (e.preventDefault(), O()) : e.key === "Escape" && (e.preventDefault(), k()), e.stopPropagation();
							},
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", x ? "text-[13px]" : "text-xl")
						}) : /* @__PURE__ */ o("h2", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", x ? "text-[13px]" : "text-xl", l && "cursor-text"),
							onDoubleClick: l ? () => w(!0) : void 0,
							title: l ? "Double-click to rename" : void 0,
							"data-testid": b ? `${b}-name` : void 0,
							children: c
						}), u !== void 0 && (g ? /* @__PURE__ */ s("button", {
							type: "button",
							onClick: g,
							"data-testid": "channel-header-members",
							"aria-label": `${u} ${u === 1 ? "member" : "members"} — open the member list`,
							className: e("text-[11px] font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								u,
								" ",
								u === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ s("span", {
							"data-testid": "channel-header-members",
							className: "text-[11px] font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								u,
								" ",
								u === 1 ? "member" : "members"
							]
						}))]
					}), d && !x && /* @__PURE__ */ o("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: d
					})]
				})]
			}),
			f && /* @__PURE__ */ o("div", {
				className: "flex min-w-0 max-w-full flex-1 items-center overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full",
				children: f
			}),
			p && /* @__PURE__ */ o("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
export { c as a, u as i, f as n, l as o, d as r, p as t };
