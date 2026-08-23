import { t as e } from "./cn-DhjIN-s0.js";
import { useState as t } from "react";
import { jsx as n, jsxs as r } from "react/jsx-runtime";
//#region src/components/shared/EmptyState.tsx
function i({ icon: t, title: i, body: o, description: s, actionLabel: c, onAction: l, action: u, actions: d, testId: f = "empty-state", actionTestId: p = "empty-state-action" }) {
	let m = s ?? o;
	return /* @__PURE__ */ r("div", {
		"data-testid": f,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-tertiary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ n("div", {
				className: "text-[52px] mb-2",
				children: t
			}) : /* @__PURE__ */ n("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ n("div", {
				className: "text-[17px] font-semibold text-neutral",
				children: i
			}),
			m && /* @__PURE__ */ n("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-tertiary leading-normal",
				children: m
			}),
			d && d.length > 0 ? /* @__PURE__ */ n(a, { actions: d }) : u ? /* @__PURE__ */ n("div", {
				className: "mt-2.5",
				children: u
			}) : c && l && /* @__PURE__ */ n("button", {
				"data-testid": p,
				onClick: l,
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "bg-primary text-white border-none rounded-lg cursor-pointer font-[inherit]"),
				children: c
			})
		]
	});
}
function a({ actions: e }) {
	return /* @__PURE__ */ n("ul", {
		"data-testid": "empty-state-actions",
		className: "mt-3 flex flex-col gap-3 w-full max-w-[420px]",
		children: e.map((e, t) => /* @__PURE__ */ r("li", {
			className: "flex flex-col gap-1.5",
			children: [/* @__PURE__ */ n(o, {
				action: e,
				defaultVariant: t === 0 ? "primary" : "secondary"
			}), e.code && /* @__PURE__ */ n(s, { code: e.code })]
		}, `${e.label}-${t}`))
	});
}
function o({ action: t, defaultVariant: i }) {
	let a = t.variant ?? i, o = e("inline-flex items-center justify-center self-stretch", "px-[18px] py-[8px] text-sm font-semibold rounded-lg cursor-pointer", "transition-colors font-[inherit]", a === "primary" ? "bg-primary text-white border border-transparent hover:bg-primary/90" : "bg-transparent text-text-primary border border-border-emphasis hover:bg-surface-panel");
	if (t.href) {
		let e = t.external === !0;
		return /* @__PURE__ */ r("a", {
			"data-testid": "empty-state-actions-link",
			href: t.href,
			onClick: t.onClick,
			className: o,
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
		className: o,
		children: t.label
	});
}
function s({ code: i }) {
	let [a, o] = t(!1);
	return /* @__PURE__ */ r("div", {
		"data-testid": "empty-state-action-code",
		className: e("relative flex items-start gap-2 rounded-md", "bg-surface-inverse text-text-inverse text-[12px] font-mono leading-snug", "px-3 py-2"),
		children: [/* @__PURE__ */ n("pre", {
			className: "flex-1 overflow-x-auto whitespace-pre-wrap break-all m-0",
			children: i
		}), /* @__PURE__ */ n("button", {
			type: "button",
			onClick: async () => {
				try {
					await navigator.clipboard.writeText(i), o(!0), setTimeout(() => o(!1), 1500);
				} catch {}
			},
			"aria-label": a ? "Copied to clipboard" : "Copy code to clipboard",
			"data-testid": "empty-state-action-code-copy",
			className: e("shrink-0 self-start text-[11px] font-semibold px-2 py-1 rounded", "border border-border-emphasis hover:bg-surface-inverse cursor-pointer", a ? "text-success-fg border-success/50" : "text-text-inverse"),
			children: a ? "Copied" : "Copy"
		})]
	});
}
//#endregion
export { i as t };
