import { t as e } from "./cn-DhjIN-s0.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/EmptyState.tsx
var i = {
	surface: {
		container: "text-text-tertiary",
		title: "text-neutral",
		description: "text-text-tertiary",
		cta: "bg-primary text-white",
		actionPrimary: "bg-primary text-white border border-transparent hover:bg-primary/90",
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
function a({ icon: t, title: a, body: s, description: c, actionLabel: l, onAction: u, action: d, actions: f, testId: p = "empty-state", actionTestId: m = "empty-state-action", tone: h = "surface", className: g, size: _ = "md" }) {
	let v = c ?? s, y = i[h] ?? i.surface, b = _ === "sm";
	return /* @__PURE__ */ r("div", {
		"data-testid": p,
		className: e("flex flex-col items-center justify-center font-[inherit]", b ? "gap-1 px-4 py-6" : "min-h-[220px] gap-2 p-8", y.container, g),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ n("div", {
				className: e(b ? "text-[28px] mb-1 leading-none" : "text-[52px] mb-2"),
				"aria-hidden": "true",
				children: t
			}) : /* @__PURE__ */ n("div", {
				className: b ? "mb-1" : "mb-2",
				children: t
			})),
			/* @__PURE__ */ n("div", {
				className: e(b ? "text-[14px] font-semibold" : "text-[17px] font-semibold", y.title),
				children: a
			}),
			v && /* @__PURE__ */ n("div", {
				className: e("text-[13px] text-center max-w-[340px] leading-normal", y.description),
				children: v
			}),
			f && f.length > 0 ? /* @__PURE__ */ n(o, {
				actions: f,
				palette: y
			}) : d ? /* @__PURE__ */ n("div", {
				className: "mt-2.5",
				children: d
			}) : l && u && /* @__PURE__ */ n("button", {
				"data-testid": m,
				onClick: u,
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "border-none rounded-lg cursor-pointer font-[inherit]", y.cta),
				children: l
			})
		]
	});
}
function o({ actions: e, palette: t }) {
	return /* @__PURE__ */ n("ul", {
		"data-testid": "empty-state-actions",
		className: "mt-3 flex flex-col gap-3 w-full max-w-[420px]",
		children: e.map((e, i) => /* @__PURE__ */ r("li", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ n(s, {
				action: e,
				defaultVariant: i === 0 ? "primary" : "secondary",
				palette: t
			}), e.code && /* @__PURE__ */ n(c, {
				code: e.code,
				palette: t
			})]
		}, `${e.label}-${i}`))
	});
}
function s({ action: t, defaultVariant: i, palette: a }) {
	let o = t.variant ?? i, s = e("inline-flex items-center justify-center self-stretch", "px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer", "transition-colors font-[inherit]", o === "primary" ? a.actionPrimary : a.actionSecondary);
	if (t.href) {
		let e = t.external === !0;
		return /* @__PURE__ */ r("a", {
			"data-testid": "empty-state-actions-link",
			href: t.href,
			onClick: t.onClick,
			className: s,
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
		className: s,
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
