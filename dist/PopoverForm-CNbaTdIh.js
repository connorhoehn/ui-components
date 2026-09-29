import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-DHAs60_m.js";
import { t as n } from "./InlinePopover-CO_TmyX7.js";
import { useEffect as r, useRef as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";
//#region src/components/shared/PopoverForm.tsx
var s = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function c({ open: c, anchor: l, placement: u = "bottom-start", title: d, subtitle: f, icon: p, submitLabel: m, submitSlot: h, submitTestId: g, submitDisabled: _ = !1, busy: v = !1, error: y = null, onSubmit: b, onClose: x, width: S = "md", children: C, "data-testid": w = "popover-form" }) {
	let T = i(null), E = i(null);
	if (r(() => {
		if (!c) return;
		let e = window.setTimeout(() => {
			E.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [c]), !c) return null;
	let D = /* @__PURE__ */ o("form", {
		className: e("flex flex-col", s[S]),
		"data-testid": w,
		onSubmit: (e) => {
			e.preventDefault(), !_ && !v && b();
		},
		children: [
			/* @__PURE__ */ o("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [p && /* @__PURE__ */ a("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: p
				}), /* @__PURE__ */ o("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ a("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${w}-title`,
						children: d
					}), f && /* @__PURE__ */ a("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: f
					})]
				})]
			}),
			/* @__PURE__ */ a("div", {
				ref: E,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: C
			}),
			/* @__PURE__ */ a("div", {
				className: e("min-h-[1.125rem] px-3", y && "pb-1"),
				"aria-live": "polite",
				children: y && /* @__PURE__ */ a("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${w}-error`,
					children: y
				})
			}),
			/* @__PURE__ */ o("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ a(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: x,
					disabled: v,
					"data-testid": `${w}-cancel`,
					children: "Cancel"
				}), h === !1 ? null : h ?? /* @__PURE__ */ a(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: _ || v,
					"data-testid": g ?? `${w}-submit`,
					children: v ? "Working…" : m
				})]
			})
		]
	});
	return l ? /* @__PURE__ */ a(n, {
		trigger: l ?? T,
		open: c,
		onClose: x,
		placement: u,
		offset: 6,
		className: "p-0",
		"data-testid": `${w}-popover`,
		children: D
	}) : /* @__PURE__ */ a("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: x,
		"data-testid": `${w}-backdrop`,
		children: /* @__PURE__ */ a("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: D
		})
	});
}
function l({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ o("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ a("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ a("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
export { c as n, l as t };
