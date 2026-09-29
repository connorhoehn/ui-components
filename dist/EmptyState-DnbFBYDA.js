import { t as e } from "./cn-D4QmbyEy.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/EmptyState.tsx
var i = {
	surface: {
		container: "text-text-tertiary",
		title: "text-neutral",
		description: "text-text-tertiary",
		cta: "bg-primary text-on-primary",
		actionPrimary: "bg-primary text-on-primary border border-transparent hover:bg-primary/90",
		actionSecondary: "bg-transparent text-text-primary border border-border-emphasis hover:bg-surface-panel",
		code: "bg-surface-inverse text-text-inverse",
		copy: "border border-border-emphasis hover:bg-surface-inverse",
		copyIdle: "text-text-inverse",
		copyDone: "text-success-fg border-success/50"
	},
	code: {
		container: "text-code-muted",
		title: "text-code-text",
		description: "text-code-muted",
		cta: "bg-code-blue text-code-bg",
		actionPrimary: "bg-code-blue text-code-bg border border-transparent hover:bg-code-blue/90",
		actionSecondary: "bg-transparent text-code-text border border-code-border hover:bg-code-surface",
		code: "bg-code-bg text-code-text",
		copy: "border border-code-border hover:bg-code-surface",
		copyIdle: "text-code-subtle",
		copyDone: "text-code-green border-code-green/50"
	}
};
function a({ icon: t, title: a, body: c, description: l, actionLabel: u, onAction: d, action: f, actions: p, testId: m = "empty-state", actionTestId: h = "empty-state-action", tone: g = "surface", className: _, size: v = "md", density: y = "default", align: b = "center", actionsDirection: x = "column", details: S }) {
	let C = l ?? c, w = i[g] ?? i.surface, T = v === "sm", E = v === "lg", D = y === "compact", O = b === "start" && !D;
	return /* @__PURE__ */ r("div", {
		"data-testid": m,
		"data-align": b,
		"data-size": v,
		className: e(D ? "flex flex-row flex-wrap items-center gap-1.5 py-1 text-[13px] font-[inherit]" : O ? e("flex flex-col items-start text-left font-[inherit]", T ? "gap-1" : E ? "gap-2" : "gap-1.5") : e("flex flex-col items-center justify-center font-[inherit]", T ? "gap-1 px-4 py-6" : "min-h-[220px] gap-2 p-8"), w.container, _),
		children: [
			t && (D ? /* @__PURE__ */ n("span", {
				className: "leading-none",
				"aria-hidden": "true",
				children: t
			}) : typeof t == "string" ? /* @__PURE__ */ n("div", {
				className: e(T ? "text-[28px] mb-1 leading-none" : "text-[52px] mb-2"),
				"aria-hidden": "true",
				children: t
			}) : /* @__PURE__ */ n("div", {
				className: T ? "mb-1" : "mb-2",
				children: t
			})),
			D ? /* @__PURE__ */ n("span", {
				className: e("font-normal", w.description),
				children: a
			}) : /* @__PURE__ */ n("div", {
				className: e(T ? "text-[14px] font-semibold" : E ? "text-[24px] font-bold leading-8 tracking-[-0.01em]" : O ? "text-lg font-semibold leading-7" : "text-lg font-semibold", E || O ? "text-text-primary" : w.title),
				children: a
			}),
			C && (D ? /* @__PURE__ */ n("span", {
				className: w.description,
				children: C
			}) : /* @__PURE__ */ n("div", {
				className: e(O ? "text-left" : "text-center max-w-[340px]", E ? "text-base leading-[25px] text-text-secondary" : O && !T ? "text-base leading-6 text-text-secondary" : e("text-[13px] leading-normal", w.description)),
				children: C
			})),
			p && p.length > 0 ? /* @__PURE__ */ n(o, {
				actions: p,
				palette: w,
				direction: x,
				large: E,
				start: O
			}) : f ? /* @__PURE__ */ n("div", {
				className: "mt-2.5",
				children: f
			}) : u && d && /* @__PURE__ */ n("button", {
				"data-testid": h,
				onClick: d,
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "border-none rounded-lg cursor-pointer font-[inherit]", w.cta),
				children: u
			}),
			S && !D && /* @__PURE__ */ r("div", {
				className: e("flex w-full flex-col gap-1.5 border-t border-border", E ? "mt-[22px] pt-8" : "mt-5 pt-5", O ? "items-start text-left" : "items-center text-center"),
				"data-testid": `${m}-details`,
				children: [
					/* @__PURE__ */ n("div", {
						className: e("font-semibold leading-7 text-text-primary", E ? "text-xl" : "text-lg"),
						children: S.title
					}),
					S.body != null && /* @__PURE__ */ n("div", {
						className: "text-sm leading-6 text-text-secondary",
						children: S.body
					}),
					S.action && /* @__PURE__ */ n("div", {
						className: "mt-3",
						children: /* @__PURE__ */ n(s, {
							action: S.action,
							defaultVariant: "link",
							palette: w,
							large: E,
							start: O
						})
					})
				]
			})
		]
	});
}
function o({ actions: t, palette: i, direction: a = "column", large: o = !1, start: l = !1 }) {
	let u = a === "row";
	return /* @__PURE__ */ n("ul", {
		"data-testid": "empty-state-actions",
		"data-direction": a,
		className: e("m-0 list-none p-0", u ? e("flex flex-row flex-wrap items-center gap-4", l ? "justify-start" : "justify-center") : "flex flex-col gap-3 w-full max-w-[420px]", o ? "mt-2" : l ? "mt-0" : "mt-3"),
		children: t.map((e, t) => /* @__PURE__ */ r("li", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ n(s, {
				action: e,
				defaultVariant: t === 0 ? "primary" : "secondary",
				palette: i,
				large: o,
				inline: u,
				start: l
			}), e.code && /* @__PURE__ */ n(c, {
				code: e.code,
				palette: i
			})]
		}, `${e.label}-${t}`))
	});
}
function s({ action: t, defaultVariant: i, palette: a, large: o = !1, inline: s = !1, start: c = !1 }) {
	let l = t.variant ?? i, u = l === "link" ? e("inline-flex items-center gap-1 self-start border-0 bg-transparent p-0 font-medium text-primary no-underline", "cursor-pointer hover:underline [font-family:inherit]", o || c ? "text-base" : "text-sm") : e("inline-flex items-center justify-center", s ? "self-start" : "self-stretch", o ? "px-[21px] py-[10px] text-base" : "px-[18px] py-[8px] text-sm", "font-semibold rounded-lg cursor-pointer", "transition-colors [font-family:inherit]", l === "primary" ? a.actionPrimary : a.actionSecondary);
	if (t.href) {
		let e = t.external === !0;
		return /* @__PURE__ */ r("a", {
			"data-testid": "empty-state-actions-link",
			href: t.href,
			onClick: t.onClick,
			className: u,
			...e ? {
				target: "_blank",
				rel: "noopener noreferrer"
			} : null,
			children: [t.label, e && /* @__PURE__ */ n("span", {
				className: "sr-only",
				children: " (opens in new tab)"
			})]
		});
	}
	return /* @__PURE__ */ n("button", {
		type: "button",
		"data-testid": "empty-state-actions-button",
		onClick: t.onClick,
		className: u,
		children: t.label
	});
}
function c({ code: i, palette: a }) {
	let [o, s] = t(!1);
	return /* @__PURE__ */ r("div", {
		"data-testid": "empty-state-action-code",
		className: e("relative flex items-start gap-2 rounded-md", "text-[12px] font-mono leading-snug", a.code, "px-3 py-2"),
		children: [/* @__PURE__ */ n("pre", {
			className: "flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0",
			children: i
		}), /* @__PURE__ */ n("button", {
			type: "button",
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(i), s(!0), setTimeout(() => s(!1), 1500);
				} catch {}
			},
			"aria-label": o ? "Copied to clipboard" : "Copy code to clipboard",
			"data-testid": "empty-state-action-code-copy",
			className: e("shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded", a.copy, "cursor-pointer", o ? a.copyDone : a.copyIdle),
			children: o ? "Copied" : "Copy"
		})]
	});
}
//#endregion
export { a as t };
