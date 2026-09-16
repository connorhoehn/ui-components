import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { useCallback as r, useId as i, useMemo as a, useRef as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var u = {
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
function d({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ c(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: u,
		children: t
	});
}
//#endregion
//#region src/components/shared/Tabs.tsx
var f = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function p(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function m(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function h({ items: t, value: n, onValueChange: s, variant: u = "underline", size: d = "md", className: h, style: g, "aria-label": _, idPrefix: v }) {
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
				e.preventDefault(), s(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = S[r];
			s(t), C(t);
		}
	}, [
		S,
		s,
		C
	]);
	return /* @__PURE__ */ c("div", {
		role: "tablist",
		"aria-label": _,
		className: e(p(u), h),
		style: g,
		children: t.map((t) => {
			let r = t.id === n;
			return /* @__PURE__ */ l("button", {
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
				onClick: () => !t.disabled && s(t.id),
				onKeyDown: (e) => w(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", f[d], m(u, r, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ c("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ c("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", r && u === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function g({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ c("div", {
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
function _({ size: t = "md", color: n, className: r }) {
	let i = t === "sm" ? 4 : 6, a = n || "var(--color-text-tertiary, #94a3b8)";
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("style", { children: "\n        @keyframes thinkDot {\n          0%, 80%, 100% { transform: scale(1); opacity: 0.4; }\n          40% { transform: scale(1.3); opacity: 1; }\n        }\n      " }), /* @__PURE__ */ c("span", {
		className: e("inline-flex items-center gap-1", r),
		children: [
			0,
			1,
			2
		].map((e) => /* @__PURE__ */ c("span", { style: {
			width: i,
			height: i,
			borderRadius: "50%",
			background: a,
			display: "inline-block",
			animation: `thinkDot 1.2s ease-in-out ${e * .2}s infinite`
		} }, e))
	})] });
}
//#endregion
//#region src/components/shared/TypingIndicator.tsx
function v(e) {
	if (e.length === 0) return "";
	if (e.length === 1) return `${e[0]} is typing…`;
	if (e.length === 2) return `${e[0]} and ${e[1]} are typing…`;
	let t = e.length - 2;
	return `${e[0]}, ${e[1]} and ${t} other${t > 1 ? "s" : ""} are typing…`;
}
function y({ names: t, compact: n = !1, color: r, size: i = "sm", className: a, "data-testid": o = "typing-indicator" }) {
	return t.length === 0 ? null : /* @__PURE__ */ l("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": o,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", a),
		children: [/* @__PURE__ */ c(_, {
			size: i,
			color: r
		}), !n && /* @__PURE__ */ c("span", { children: v(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function b({ name: r, memberCount: i, description: a, tabs: o, actions: s, avatarUrl: u, online: d, onMembersClick: f, size: p = "md", as: m = "div", className: h, "data-testid": g }) {
	let _ = p === "sm";
	return /* @__PURE__ */ l(m, {
		"data-testid": g,
		"data-size": p,
		className: e("@container flex items-center justify-between", _ ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", h),
		children: [
			/* @__PURE__ */ l("div", {
				className: e("flex min-w-0 items-center", _ ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ l("div", {
					className: "relative shrink-0",
					children: [u ? /* @__PURE__ */ c("img", {
						src: u,
						alt: r,
						className: _ ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ c(t, {
						name: r,
						size: _ ? 28 : 36
					}), d !== void 0 && /* @__PURE__ */ c("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ c(n, {
							color: d ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": d ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ l("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ l("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ c("h2", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", _ ? "text-[13px]" : "text-[15px]"),
							children: r
						}), i !== void 0 && (f ? /* @__PURE__ */ l("button", {
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
						}) : /* @__PURE__ */ l("span", {
							"data-testid": "channel-header-members",
							className: "text-[11px] font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								i,
								" ",
								i === 1 ? "member" : "members"
							]
						}))]
					}), a && !_ && /* @__PURE__ */ c("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: a
					})]
				})]
			}),
			o && /* @__PURE__ */ c("div", {
				className: "flex min-w-fit flex-1 items-center @max-3xl:order-last @max-3xl:basis-full",
				children: o
			}),
			s && /* @__PURE__ */ c("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: s
			})
		]
	});
}
//#endregion
export { g as a, d as c, _ as i, y as n, h as o, v as r, u as s, b as t };
