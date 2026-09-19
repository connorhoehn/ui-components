import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { useCallback as r, useEffect as i, useId as a, useMemo as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/VisuallyHidden.tsx
var d = {
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
function f({ as: e = "span", children: t, className: n, id: r, "data-testid": i }) {
	return /* @__PURE__ */ l(e, {
		id: r,
		"data-testid": i,
		className: n,
		style: d,
		children: t
	});
}
//#endregion
//#region src/components/shared/Tabs.tsx
var p = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function m(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function h(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function g({ items: t, value: n, onValueChange: i, variant: c = "underline", size: d = "md", className: f, style: g, "aria-label": _, idPrefix: v }) {
	let y = a(), b = v ?? y, x = s(/* @__PURE__ */ new Map()), S = o(() => t.filter((e) => !e.disabled).map((e) => e.id), [t]), C = r((e) => {
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
				e.preventDefault(), i(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = S[r];
			i(t), C(t);
		}
	}, [
		S,
		i,
		C
	]);
	return /* @__PURE__ */ l("div", {
		role: "tablist",
		"aria-label": _,
		className: e(m(c), f),
		style: g,
		children: t.map((t) => {
			let r = t.id === n;
			return /* @__PURE__ */ u("button", {
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
				onClick: () => !t.disabled && i(t.id),
				onKeyDown: (e) => w(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", p[d], h(c, r, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ l("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ l("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", r && c === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function _({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
	return e === t ? /* @__PURE__ */ l("div", {
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
function v({ size: t = "md", className: n }) {
	return /* @__PURE__ */ l("span", {
		className: e("inline-flex items-center gap-1", n),
		"data-testid": "thinking-dots",
		children: [
			0,
			1,
			2
		].map((n) => /* @__PURE__ */ l("span", { className: e("ui-thinking-dot inline-block rounded-full bg-current", t === "sm" ? "h-1 w-1" : "h-1.5 w-1.5", n === 1 && "[animation-delay:200ms]", n === 2 && "[animation-delay:400ms]") }, n))
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
	return t.length === 0 ? null : /* @__PURE__ */ u("span", {
		role: "status",
		"aria-live": "polite",
		"data-testid": a,
		className: e("inline-flex items-center gap-1.5 text-[12px] text-text-tertiary", i),
		children: [/* @__PURE__ */ l(v, { size: r }), !n && /* @__PURE__ */ l("span", { children: y(t) })]
	});
}
//#endregion
//#region src/components/shared/ChannelHeader.tsx
function x({ name: r, onRename: a, memberCount: o, description: d, tabs: f, actions: p, avatarUrl: m, online: h, onMembersClick: g, size: _ = "md", as: v = "div", className: y, "data-testid": b }) {
	let x = _ === "sm", S = v, [C, w] = c(!1), [T, E] = c(r), D = s(null);
	i(() => {
		C || E(r);
	}, [r, C]), i(() => {
		C && (D.current?.focus(), D.current?.select());
	}, [C]);
	let O = () => {
		let e = T.trim();
		if (w(!1), !e || e === r) {
			E(r);
			return;
		}
		a?.(e);
	}, k = () => {
		E(r), w(!1);
	};
	return /* @__PURE__ */ u(S, {
		"data-testid": b,
		"data-size": _,
		className: e("@container flex items-center justify-between", x ? "flex-nowrap gap-x-2 px-3 py-2" : "flex-wrap gap-x-4 gap-y-1 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", y),
		children: [
			/* @__PURE__ */ u("div", {
				className: e("flex min-w-0 items-center", x ? "gap-2" : "gap-3"),
				children: [/* @__PURE__ */ u("div", {
					className: "relative shrink-0",
					children: [m ? /* @__PURE__ */ l("img", {
						src: m,
						alt: r,
						className: x ? "h-7 w-7 rounded-full object-cover" : "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ l(t, {
						name: r,
						size: x ? 28 : 36
					}), h !== void 0 && /* @__PURE__ */ l("span", {
						className: "absolute -bottom-0.5 -right-0.5",
						children: /* @__PURE__ */ l(n, {
							color: h ? "var(--color-success)" : "var(--color-text-tertiary)",
							size: "sm",
							"aria-label": h ? "Online" : "Offline"
						})
					})]
				}), /* @__PURE__ */ u("div", {
					className: "min-w-0 flex flex-col gap-0.5",
					children: [/* @__PURE__ */ u("div", {
						className: "flex items-center gap-2",
						children: [C ? /* @__PURE__ */ l("input", {
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
							className: e("min-w-0 rounded border border-primary bg-surface px-1 py-0 font-semibold text-[var(--color-text-primary)] leading-tight outline-none", x ? "text-[13px]" : "text-[15px]")
						}) : /* @__PURE__ */ l("h2", {
							className: e("font-semibold text-[var(--color-text-primary)] leading-tight truncate", x ? "text-[13px]" : "text-[15px]", a && "cursor-text"),
							onDoubleClick: a ? () => w(!0) : void 0,
							title: a ? "Double-click to rename" : void 0,
							"data-testid": b ? `${b}-name` : void 0,
							children: r
						}), o !== void 0 && (g ? /* @__PURE__ */ u("button", {
							type: "button",
							onClick: g,
							"data-testid": "channel-header-members",
							"aria-label": `${o} ${o === 1 ? "member" : "members"} — open the member list`,
							className: e("text-[11px] font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", "cursor-pointer hover:text-[var(--color-text-secondary)]"),
							children: [
								o,
								" ",
								o === 1 ? "member" : "members"
							]
						}) : /* @__PURE__ */ u("span", {
							"data-testid": "channel-header-members",
							className: "text-[11px] font-medium leading-none text-[var(--color-text-tertiary)]",
							children: [
								o,
								" ",
								o === 1 ? "member" : "members"
							]
						}))]
					}), d && !x && /* @__PURE__ */ l("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: d
					})]
				})]
			}),
			f && /* @__PURE__ */ l("div", {
				className: "flex min-w-0 max-w-full flex-1 items-center overflow-x-auto overscroll-x-contain whitespace-nowrap [&>*]:shrink-0 @max-3xl:order-last @max-3xl:basis-full",
				children: f
			}),
			p && /* @__PURE__ */ l("div", {
				className: "ml-auto flex shrink-0 items-center gap-2",
				children: p
			})
		]
	});
}
//#endregion
export { _ as a, f as c, v as i, b as n, g as o, y as r, d as s, x as t };
