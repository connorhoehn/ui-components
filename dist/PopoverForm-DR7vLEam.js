import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { t as r } from "./InlinePopover-D25AtkYZ.js";
import { useEffect as i, useRef as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";
//#region src/components/ui/Stack.tsx
var c = {
	none: "gap-0",
	xs: "gap-1.5",
	sm: "gap-2",
	md: "gap-3",
	lg: "gap-4",
	xl: "gap-6"
}, l = {
	start: "items-start",
	center: "items-center",
	end: "items-end",
	baseline: "items-baseline",
	stretch: "items-stretch"
}, u = {
	start: "justify-start",
	center: "justify-center",
	end: "justify-end",
	between: "justify-between"
};
function d(t, { gap: n = "md", align: r, justify: i, wrap: a }) {
	return e("flex", t === "col" ? "flex-col" : "flex-row", c[n], r ? l[r] : void 0, i ? u[i] : void 0, a ? "flex-wrap" : void 0);
}
function f({ children: t, gap: n, align: r, justify: i, wrap: a = !1, as: s = "div", className: c, ref: l, ...u }) {
	return /* @__PURE__ */ o(s, {
		ref: l,
		className: e(d("col", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), c),
		...u,
		children: t
	});
}
function p({ children: t, gap: n = "sm", align: r = "center", justify: i, wrap: a = !0, as: s = "div", className: c, ref: l, ...u }) {
	return /* @__PURE__ */ o(s, {
		ref: l,
		className: e(d("row", {
			gap: n,
			align: r,
			justify: i,
			wrap: a
		}), c),
		...u,
		children: t
	});
}
//#endregion
//#region src/components/shared/PresenceDot.tsx
var m = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, h = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function g({ state: e, ariaLabel: t, label: r, pulse: i, size: a = "sm", className: s, style: c, title: l, "data-testid": u }) {
	let d = i ?? e === "online", f = t ?? h[e];
	return /* @__PURE__ */ o(n, {
		color: m[e],
		pulse: d,
		size: a,
		label: r,
		className: s,
		style: c,
		title: l,
		"data-testid": u ?? `presence-${e}`,
		"aria-label": f
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var _ = {
	surface: {
		icon: "text-[var(--color-text-tertiary)]",
		field: "border-[var(--color-border-field,#d1d5db)] bg-surface text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]",
		clear: "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]"
	},
	code: {
		icon: "text-code-muted",
		field: "border-code-border bg-code-surface text-code-text placeholder:text-code-muted focus:ring-code-blue focus:border-code-blue",
		clear: "text-code-muted hover:text-code-text hover:bg-code-raised"
	}
};
function v({ value: t, onChange: n, placeholder: r, onClear: i, tone: a = "surface", className: c, inputClassName: l, style: u, autoFocus: d, "aria-label": f, "data-testid": p }) {
	let m = _[a] ?? _.surface;
	return /* @__PURE__ */ s("div", {
		className: e("relative inline-flex items-center", c),
		style: u,
		children: [
			/* @__PURE__ */ s("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", m.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ o("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ o("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ o("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: d,
				"aria-label": f ?? r ?? "Search",
				"data-testid": p,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", m.field, l)
			}),
			t && /* @__PURE__ */ o("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: e("absolute right-2 p-0.5 rounded", m.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ o("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ o("path", {
						d: "M2 2l8 8M10 2l-8 8",
						stroke: "currentColor",
						strokeWidth: "1.5",
						strokeLinecap: "round"
					})
				})
			})
		]
	});
}
//#endregion
//#region src/components/shared/PopoverForm.tsx
var y = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function b({ open: n, anchor: c, placement: l = "bottom-start", title: u, subtitle: d, icon: f, submitLabel: p, submitSlot: m, submitTestId: h, submitDisabled: g = !1, busy: _ = !1, error: v = null, onSubmit: b, onClose: x, width: S = "md", children: C, "data-testid": w = "popover-form" }) {
	let T = a(null), E = a(null);
	if (i(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			E.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let D = /* @__PURE__ */ s("form", {
		className: e("flex flex-col", y[S]),
		"data-testid": w,
		onSubmit: (e) => {
			e.preventDefault(), !g && !_ && b();
		},
		children: [
			/* @__PURE__ */ s("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [f && /* @__PURE__ */ o("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: f
				}), /* @__PURE__ */ s("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ o("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${w}-title`,
						children: u
					}), d && /* @__PURE__ */ o("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: d
					})]
				})]
			}),
			/* @__PURE__ */ o("div", {
				ref: E,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: C
			}),
			/* @__PURE__ */ o("div", {
				className: e("min-h-[1.125rem] px-3", v && "pb-1"),
				"aria-live": "polite",
				children: v && /* @__PURE__ */ o("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${w}-error`,
					children: v
				})
			}),
			/* @__PURE__ */ s("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ o(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: x,
					disabled: _,
					"data-testid": `${w}-cancel`,
					children: "Cancel"
				}), m ?? /* @__PURE__ */ o(t, {
					type: "submit",
					variant: "primary",
					size: "sm",
					disabled: g || _,
					"data-testid": h ?? `${w}-submit`,
					children: _ ? "Working…" : p
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
function x({ label: e, hint: t, children: n, "data-testid": r }) {
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
export { p as a, g as i, b as n, f as o, v as r, x as t };
