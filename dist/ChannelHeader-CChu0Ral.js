import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { useCallback as r, useId as i, useMemo as a, useRef as o } from "react";
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
//#region src/components/shared/Tabs.tsx
var d = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function f(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function p(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function m({ items: t, value: n, onValueChange: l, variant: u = "underline", size: m = "md", className: h, style: g, "aria-label": _, idPrefix: v }) {
	let y = i(), b = v ?? y, x = o(/* @__PURE__ */ new Map()), S = a(() => t.filter((e) => !e.disabled).map((e) => e.id), [t]), C = r((e) => {
		x.current.get(e)?.focus();
	}, []), w = r((e, t) => {
		if (S.length === 0) return;
		let n = S.indexOf(t), r = null;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				r = n === -1 ? 0 : (n + 1) % S.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				r = n === -1 ? S.length - 1 : (n - 1 + S.length) % S.length;
				break;
			case "Home":
				r = 0;
				break;
			case "End":
				r = S.length - 1;
				break;
			case "Enter":
			case " ":
				e.preventDefault(), l(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = S[r];
			l(t), C(t);
		}
	}, [
		S,
		l,
		C
	]);
	return /* @__PURE__ */ s("div", {
		role: "tablist",
		"aria-label": _,
		className: e(f(u), h),
		style: g,
		children: t.map((t) => {
			let r = t.id === n;
			return /* @__PURE__ */ c("button", {
				ref: (e) => {
					e ? x.current.set(t.id, e) : x.current.delete(t.id);
				},
				type: "button",
				role: "tab",
				id: `${b}-tab-${t.id}`,
				"aria-controls": `${b}-panel-${t.id}`,
				"aria-selected": r,
				"aria-disabled": t.disabled || void 0,
				tabIndex: r ? 0 : -1,
				disabled: t.disabled,
				onClick: () => !t.disabled && l(t.id),
				onKeyDown: (e) => w(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", d[m], p(u, r, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ s("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ s("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", r && u === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function h({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ s("div", {
		role: "tabpanel",
		id: n ? `${n}-panel-${e}` : void 0,
		"aria-labelledby": n ? `${n}-tab-${e}` : void 0,
		tabIndex: 0,
		className: r,
		style: i,
		children: a
	}) : null;
}
//#endregion
//#region src/components/shared/ThinkingDots.tsx
function g({ size: t = "md", className: n }) {
	return /* @__PURE__ */ s("span", {
		className: e("inline-flex items-center gap-1", n),
		"data-testid": "thinking-dots",
		children: [
			0,
			1,
			2
		].map((n) => /* @__PURE__ */ s("span", { className: e("ui-thinking-dot inline-block rounded-full bg-current", t === "sm" ? "h-1 w-1" : "h-1.5 w-1.5", n === 1 && "[animation-delay:200ms]", n === 2 && "[animation-delay:400ms]") }, n))
	});
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function _(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function v({ names: t, compact: n = !1, size: r = "sm", className: i, "data-testid": a = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ c("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ s(g, { size: r }), !n && /* @__PURE__ */ s("span", { children: _(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function y({ name: r, memberCount: i, description: a, tabs: o, actions: l, avatarUrl: u, online: d, onMembersClick: f, size: p = "md", as: m = "div", className: h, "data-testid": g }) {
	let _ = p === "sm";
	return /* @__PURE__ */ c(m, {
		"data-testid": g,
		"data-size": p,
		className: e("@container flex items-center justify-between", _ ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", h),
		children: [
			/* @__PURE__ */ c("div", {
				className: e("flex min-w-0 items-center", _ ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ c("div", {
					className: "relative shrink-0",
					children: [u ? /* @__PURE__ */ s("img", {
						src: u,
						alt: r,
						className: _ ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ s(t, {
						name: r,
						size: _ ? 28 : 36
					}), d !== void 0 && /* @__PURE__ */ s("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ s(n, {
							color: d ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": d ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ c("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ c("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ s("h2", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", _ ? "text-[13px]" : "text-[15px]"),
							children: r
						}), i !== void 0 && (f ? /* @__PURE__ */ c("button", {
							type: "button",
							onClick: f,
							"data-testid": "channel-header-members",
							"aria-label": `${i} ${i === 1 ? "member" : "members"} — open the member list`,
							className: e("text-[11px] font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								i,
								" ",
								i === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ c("span", {
							"data-testid": "channel-header-members",
							className: "text-[11px] font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								i,
								" ",
								i === 1 ? "member" : "members"
							]
						}))]
					}), a && !_ && /* @__PURE__ */ s("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: a
					})]
				})]
			}),
			o && /* @__PURE__ */ s("div", {
				className: "flex min-w-fit flex-1 items-center @max-3xl:order-last @max-3xl:basis-full",
				children: o
			}),
			l && /* @__PURE__ */ s("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: l
			})
		]
	});
}
//#endregion
export { h as a, u as c, g as i, v as n, m as o, _ as r, l as s, y as t };
