import { d as e, l as t } from "./Button-DQoeE5dN.js";
import { n } from "./safeHref-CSAycLWi.js";
import { useState as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/shared/EmptyState.tsx
var o = {
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
function s({ icon: n, title: r, body: s, description: u, actionLabel: d, onAction: f, action: p, actions: m, testId: h = "empty-state", actionTestId: g = "empty-state-action", tone: _ = "surface", className: v, size: y, layout: b, density: x = "default", align: S = "center", actionsDirection: C = "column", details: w }) {
	let T = u ?? s, E = o[_] ?? o.surface, D = t("EmptyState", y, {
		comfortable: "md",
		compact: "sm"
	}), O = D === "sm", k = D === "lg", A = (b ?? (x === "compact" ? "line" : "block")) === "line", j = S === "start" && !A;
	return /* @__PURE__ */ a("div", {
		"data-testid": h,
		"data-ui-empty": "",
		"data-align": S,
		"data-size": D,
		className: e(A ? "flex flex-row flex-wrap items-center gap-1.5 py-1 text-[13px] font-[inherit]" : j ? e("flex flex-col items-start text-left font-[inherit]", O ? "gap-1" : k ? "gap-2" : "gap-1.5") : e("flex flex-col items-center justify-center font-[inherit]", O ? "gap-1 px-4 py-6" : "min-h-[220px] gap-2 p-8"), E.container, v),
		children: [
			n && (A ? /* @__PURE__ */ i("span", {
				className: "leading-none",
				"aria-hidden": "true",
				children: n
			}) : typeof n == "string" ? /* @__PURE__ */ i("div", {
				className: e(O ? "text-[28px] mb-1 leading-none" : "text-[52px] mb-2"),
				"aria-hidden": "true",
				children: n
			}) : /* @__PURE__ */ i("div", {
				className: O ? "mb-1" : "mb-2",
				children: n
			})),
			A ? /* @__PURE__ */ i("span", {
				className: e("font-normal", E.description),
				children: r
			}) : /* @__PURE__ */ i("div", {
				className: e(O ? "text-[14px] font-semibold" : k ? "text-[24px] font-bold leading-8 tracking-[-0.01em]" : j ? "text-lg font-semibold leading-7" : "text-lg font-semibold", k || j ? "text-text-primary" : E.title),
				children: r
			}),
			T && (A ? /* @__PURE__ */ i("span", {
				className: E.description,
				children: T
			}) : /* @__PURE__ */ i("div", {
				className: e(j ? "text-left" : "text-center max-w-[340px]", k ? "text-base leading-[25px] text-text-secondary" : j && !O ? "text-base leading-6 text-text-secondary" : e(O ? "text-sm leading-normal" : "text-[13px] leading-normal", E.description)),
				children: T
			})),
			m && m.length > 0 ? /* @__PURE__ */ i(c, {
				actions: m,
				palette: E,
				direction: C,
				large: k,
				start: j
			}) : p ? /* @__PURE__ */ i("div", {
				className: "mt-2.5",
				children: p
			}) : d && f && /* @__PURE__ */ i("button", {
				"data-ui-part": "",
				"data-testid": g,
				onClick: f,
				className: e(O ? "mt-2 inline-flex h-6.5 items-center px-2.5 text-xs font-semibold rounded-md" : "mt-2.5 px-[22px] py-[9px] text-sm font-semibold rounded-lg", "border-none cursor-pointer font-[inherit]", E.cta),
				children: d
			}),
			w && !A && /* @__PURE__ */ a("div", {
				className: e("flex w-full flex-col gap-1.5 border-t border-border", k ? "mt-[22px] pt-8" : "mt-5 pt-5", j ? "items-start text-left" : "items-center text-center"),
				"data-testid": `${h}-details`,
				children: [
					/* @__PURE__ */ i("div", {
						className: e("font-semibold text-text-primary", k ? "text-xl leading-7" : O ? "text-sm leading-normal" : "text-lg leading-7"),
						children: w.title
					}),
					w.body != null && /* @__PURE__ */ i("div", {
						className: "text-sm leading-6 text-text-secondary",
						children: w.body
					}),
					w.action && /* @__PURE__ */ i("div", {
						className: "mt-3",
						children: /* @__PURE__ */ i(l, {
							action: w.action,
							defaultVariant: "link",
							palette: E,
							large: k,
							start: j
						})
					})
				]
			})
		]
	});
}
function c({ actions: t, palette: n, direction: r = "column", large: o = !1, start: s = !1 }) {
	let c = r === "row";
	return /* @__PURE__ */ i("ul", {
		"data-testid": "empty-state-actions",
		"data-direction": r,
		className: e("m-0 list-none p-0", c ? e("flex flex-row flex-wrap items-center gap-4", s ? "justify-start" : "justify-center") : "flex flex-col gap-3 w-full max-w-[420px]", o ? "mt-2" : s ? "mt-0" : "mt-3"),
		children: t.map((e, t) => /* @__PURE__ */ a("li", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ i(l, {
				action: e,
				defaultVariant: t === 0 ? "primary" : "secondary",
				palette: n,
				large: o,
				inline: c,
				start: s
			}), e.code && /* @__PURE__ */ i(u, {
				code: e.code,
				palette: n
			})]
		}, `${e.label}-${t}`))
	});
}
function l({ action: t, defaultVariant: r, palette: o, large: s = !1, inline: c = !1, start: l = !1 }) {
	let u = t.variant ?? r, d = u === "link" ? e("inline-flex items-center gap-1 self-start border-0 bg-transparent p-0 font-medium text-primary no-underline", "cursor-pointer hover:underline [font-family:inherit]", "text-sm") : e("inline-flex items-center justify-center", c ? "self-start" : "self-stretch", s ? "px-[21px] py-[10px] text-base" : "px-[18px] py-[8px] text-sm", "font-semibold rounded-lg cursor-pointer", "transition-colors [font-family:inherit]", u === "primary" ? o.actionPrimary : o.actionSecondary);
	if (t.href) {
		let e = t.external === !0;
		return /* @__PURE__ */ a("a", {
			"data-testid": "empty-state-actions-link",
			href: n(t.href) ?? void 0,
			onClick: t.onClick,
			className: d,
			...e ? {
				target: "_blank",
				rel: "noopener noreferrer"
			} : null,
			children: [t.label, e && /* @__PURE__ */ i("span", {
				className: "sr-only",
				children: " (opens in new tab)"
			})]
		});
	}
	return /* @__PURE__ */ i("button", {
		"data-ui-part": "",
		type: "button",
		"data-testid": "empty-state-actions-button",
		onClick: t.onClick,
		className: d,
		children: t.label
	});
}
function u({ code: t, palette: n }) {
	let [o, s] = r(!1);
	return /* @__PURE__ */ a("div", {
		"data-testid": "empty-state-action-code",
		className: e("relative flex items-start gap-2 rounded-md", "text-[12px] font-mono leading-snug", n.code, "px-3 py-2"),
		children: [/* @__PURE__ */ i("pre", {
			className: "flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0",
			children: t
		}), /* @__PURE__ */ i("button", {
			"data-ui-part": "",
			type: "button",
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(t), s(!0), setTimeout(() => s(!1), 1500);
				} catch {}
			},
			"aria-label": o ? "Copied to clipboard" : "Copy code to clipboard",
			"data-testid": "empty-state-action-code-copy",
			className: e("shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded", n.copy, "cursor-pointer", o ? n.copyDone : n.copyIdle),
			children: o ? "Copied" : "Copy"
		})]
	});
}
//#endregion
export { s as t };
