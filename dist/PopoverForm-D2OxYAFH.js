import { t as e } from "./cn-DhjIN-s0.js";
import { _ as t } from "./overlayStack-CHdlnODN.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { t as r } from "./InlinePopover-DpXHdWeE.js";
import { useEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/shared/PresenceDot.tsx
var c = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, l = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function u({ state: e, ariaLabel: t, label: r, pulse: i, size: a = "sm", className: s, style: u, title: d, "data-testid": f }) {
	let p = i ?? e === "online", m = t ?? l[e];
	return /* @__PURE__ */ o(n, {
		color: c[e],
		pulse: p,
		size: a,
		label: r,
		className: s,
		style: u,
		title: d,
		"data-testid": f ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
//#region src/components/shared/PopoverForm.tsx
var d = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function f({ open: n, anchor: c, placement: l = "bottom-start", title: u, subtitle: f, icon: p, submitLabel: m, submitSlot: h, submitTestId: g, submitDisabled: _ = !1, busy: v = !1, error: y = null, onSubmit: b, onClose: x, width: S = "md", children: C, "data-testid": w = "popover-form" }) {
	let T = a(null), E = a(null);
	if (i(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			E.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let D = /* @__PURE__ */ s("form", {
		className: e("flex flex-col", d[S]),
		"data-testid": w,
		onSubmit: (e) => {
			e.preventDefault(), !_ && !v && b();
		},
		children: [
			/* @__PURE__ */ s("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [p && /* @__PURE__ */ o("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: p
				}), /* @__PURE__ */ s("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ o("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${w}-title`,
						children: u
					}), f && /* @__PURE__ */ o("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: f
					})]
				})]
			}),
			/* @__PURE__ */ o("div", {
				ref: E,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: C
			}),
			/* @__PURE__ */ o("div", {
				className: e("min-h-[1.125rem] px-3", y && "pb-1"),
				"aria-live": "polite",
				children: y && /* @__PURE__ */ o("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${w}-error`,
					children: y
				})
			}),
			/* @__PURE__ */ s("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ o(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: x,
					disabled: v,
					"data-testid": `${w}-cancel`,
					children: "Cancel"
				}), h === !1 ? null : h ?? /* @__PURE__ */ o(t, {
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
	return c ? /* @__PURE__ */ o(r, {
		trigger: c ?? T,
		open: n,
		onClose: x,
		placement: l,
		offset: 6,
		className: "p-0",
		"data-testid": `${w}-popover`,
		children: D
	}) : /* @__PURE__ */ o("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: x,
		"data-testid": `${w}-backdrop`,
		children: /* @__PURE__ */ o("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: D
		})
	});
}
function p({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ s("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ o("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ o("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
export { f as n, u as r, p as t };
