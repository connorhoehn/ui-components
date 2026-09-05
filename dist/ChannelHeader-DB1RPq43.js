import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Avatar-BzicCOft.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { useCallback as r, useId as i, useMemo as a, useRef as o } from "react";
import { jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/shared/Tabs.tsx
var l = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
};
function u(e) {
	switch (e) {
		case "underline": return "inline-flex items-center gap-1 border-b border-[var(--color-border)]";
		case "pill": return "inline-flex items-center gap-1";
		case "segmented": return "inline-flex items-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5";
	}
}
function d(t, n, r) {
	return t === "underline" ? e("-mb-px border-b-2 rounded-none", n ? "border-[var(--color-primary)] text-[var(--color-text-primary)]" : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:text-[var(--color-text-secondary)]") : t === "pill" ? e("rounded-full", n ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent") : e("rounded-md", n ? "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", r && "opacity-50 cursor-not-allowed hover:bg-transparent");
}
function f({ items: t, value: n, onValueChange: f, variant: p = "underline", size: m = "md", className: h, style: g, "aria-label": _, idPrefix: v }) {
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
				e.preventDefault(), f(t);
				return;
			default: return;
		}
		if (r !== null) {
			e.preventDefault();
			let t = S[r];
			f(t), C(t);
		}
	}, [
		S,
		f,
		C
	]);
	return /* @__PURE__ */ s("div", {
		role: "tablist",
		"aria-label": _,
		className: e(u(p), h),
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
				onClick: () => !t.disabled && f(t.id),
				onKeyDown: (e) => w(e, t.id),
				className: e("inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer", l[m], d(p, r, !!t.disabled)),
				children: [
					t.icon,
					/* @__PURE__ */ s("span", { children: t.label }),
					t.badge !== void 0 && t.badge !== null && /* @__PURE__ */ s("span", {
						className: e("ml-1 inline-flex items-center justify-center rounded-full px-1.5 min-w-[20px] text-[10px] font-semibold", r && p === "pill" ? "bg-white/20 text-white" : "bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)]"),
						children: t.badge
					})
				]
			}, t.id);
		})
	});
}
function p({ id: e, when: t, idPrefix: n, className: r, style: i, children: a }) {
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
//#region src/components/shared/ChannelHeader.tsx
function m({ name: r, memberCount: i, description: a, tabs: o, actions: l, avatarUrl: u, online: d, onMembersClick: f, className: p, "data-testid": m }) {
	return /* @__PURE__ */ c("div", {
		"data-testid": m,
		className: e("flex items-center justify-between gap-4 px-6 py-3", "border-b border-[var(--color-border)] bg-[var(--color-surface)]", p),
		children: [
			/* @__PURE__ */ c("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [/* @__PURE__ */ c("div", {
					className: "relative shrink-0",
					children: [u ? /* @__PURE__ */ s("img", {
						src: u,
						alt: r,
						className: "w-9 h-9 rounded-full object-cover"
					}) : /* @__PURE__ */ s(t, {
						name: r,
						size: 36
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
							className: "text-[15px] font-semibold text-[var(--color-text-primary)] leading-tight truncate",
							children: r
						}), i !== void 0 && /* @__PURE__ */ c("button", {
							type: "button",
							onClick: f,
							disabled: !f,
							className: e("text-[11px] font-medium text-[var(--color-text-tertiary)]", "bg-transparent border-none p-0 leading-none", f && "cursor-pointer hover:text-[var(--color-text-secondary)]", !f && "cursor-default"),
							children: [
								i,
								" ",
								i === 1 ? "member" : "members"
							]
						})]
					}), a && /* @__PURE__ */ s("p", {
						className: "text-[12px] text-[var(--color-text-tertiary)] truncate leading-tight",
						children: a
					})]
				})]
			}),
			o && /* @__PURE__ */ s("div", {
				className: "flex min-w-0 flex-1 items-center overflow-x-auto",
				children: o
			}),
			l && /* @__PURE__ */ s("div", {
				className: "flex items-center gap-2 shrink-0",
				children: l
			})
		]
	});
}
//#endregion
export { p as n, f as r, m as t };
