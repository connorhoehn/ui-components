import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./StatusDot-Bgx2zxgC.js";
import { t as r } from "./InlinePopover-CG_Jwga7.js";
import { useCallback as i, useEffect as a, useId as o, useLayoutEffect as s, useRef as c, useState as l } from "react";
import { Fragment as u, jsx as d, jsxs as f } from "react/jsx-runtime";
import { createPortal as p } from "react-dom";
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
function g({ state: e, ariaLabel: t, label: r, pulse: i, size: a = "sm", className: o, style: s, title: c, "data-testid": l }) {
	let u = i ?? e === "online", f = t ?? h[e];
	return /* @__PURE__ */ d(n, {
		color: m[e],
		pulse: u,
		size: a,
		label: r,
		className: o,
		style: s,
		title: c,
		"data-testid": l ?? `presence-${e}`,
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
function v({ value: t, onChange: n, placeholder: r, onClear: i, tone: a = "surface", className: o, inputClassName: s, style: c, autoFocus: l, "aria-label": u, "data-testid": p }) {
	let m = _[a] ?? _.surface;
	return /* @__PURE__ */ f("div", {
		className: e("relative inline-flex items-center", o),
		style: c,
		children: [
			/* @__PURE__ */ f("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", m.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ d("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ d("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ d("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: l,
				"aria-label": u ?? r ?? "Search",
				"data-testid": p,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", m.field, s)
			}),
			t && /* @__PURE__ */ d("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: e("absolute right-2 p-0.5 rounded", m.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ d("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ d("path", {
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
function b({ open: n, anchor: i, placement: o = "bottom-start", title: s, subtitle: l, icon: u, submitLabel: p, submitSlot: m, submitTestId: h, submitDisabled: g = !1, busy: _ = !1, error: v = null, onSubmit: b, onClose: x, width: S = "md", children: C, "data-testid": w = "popover-form" }) {
	let T = c(null), E = c(null);
	if (a(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			E.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let D = /* @__PURE__ */ f("form", {
		className: e("flex flex-col", y[S]),
		"data-testid": w,
		onSubmit: (e) => {
			e.preventDefault(), !g && !_ && b();
		},
		children: [
			/* @__PURE__ */ f("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [u && /* @__PURE__ */ d("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: u
				}), /* @__PURE__ */ f("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ d("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${w}-title`,
						children: s
					}), l && /* @__PURE__ */ d("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: l
					})]
				})]
			}),
			/* @__PURE__ */ d("div", {
				ref: E,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: C
			}),
			/* @__PURE__ */ d("div", {
				className: e("min-h-[1.125rem] px-3", v && "pb-1"),
				"aria-live": "polite",
				children: v && /* @__PURE__ */ d("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${w}-error`,
					children: v
				})
			}),
			/* @__PURE__ */ f("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ d(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: x,
					disabled: _,
					"data-testid": `${w}-cancel`,
					children: "Cancel"
				}), m === !1 ? null : m ?? /* @__PURE__ */ d(t, {
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
	return i ? /* @__PURE__ */ d(r, {
		trigger: i ?? T,
		open: n,
		onClose: x,
		placement: o,
		offset: 6,
		className: "p-0",
		"data-testid": `${w}-popover`,
		children: D
	}) : /* @__PURE__ */ d("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: x,
		"data-testid": `${w}-backdrop`,
		children: /* @__PURE__ */ d("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: D
		})
	});
}
function x({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ f("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ d("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ d("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
//#region src/components/shared/Tooltip.tsx
function S(e, t, n) {
	switch (t) {
		case "top": return {
			position: "fixed",
			bottom: window.innerHeight - e.top + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
		case "left": return {
			position: "fixed",
			top: e.top + e.height / 2,
			right: window.innerWidth - e.left + n,
			transform: "translateY(-50%)"
		};
		case "right": return {
			position: "fixed",
			top: e.top + e.height / 2,
			left: e.right + n,
			transform: "translateY(-50%)"
		};
		default: return {
			position: "fixed",
			top: e.bottom + n,
			left: e.left + e.width / 2,
			transform: "translateX(-50%)"
		};
	}
}
function C({ content: t, children: n, placement: r = "top", openDelay: m = 350, closeDelay: h = 100, disabled: g = !1, className: _, "data-testid": v = "tooltip" }) {
	let [y, b] = l(!1), [x, C] = l(null), w = c(null), T = c(null), E = o(), D = i(() => {
		T.current &&= (clearTimeout(T.current), null);
	}, []);
	a(() => D, [D]);
	let O = i(() => {
		let e = w.current;
		e && C(S(e.getBoundingClientRect(), r, 6));
	}, [r]);
	s(() => {
		y ? O() : C(null);
	}, [y, O]);
	let k = i(() => {
		g || (D(), T.current = setTimeout(() => b(!0), m));
	}, [
		D,
		g,
		m
	]), A = i(() => {
		D(), T.current = setTimeout(() => b(!1), h);
	}, [D, h]), j = i(() => {
		D(), b(!1);
	}, [D]);
	return /* @__PURE__ */ f(u, { children: [/* @__PURE__ */ d("span", {
		ref: w,
		className: "inline-flex",
		onMouseEnter: k,
		onMouseLeave: A,
		onFocus: () => {
			D(), b(!0);
		},
		onBlur: j,
		onKeyDown: (e) => {
			e.key === "Escape" && j();
		},
		"aria-describedby": y ? E : void 0,
		children: n
	}), y && x && typeof document < "u" && p(/* @__PURE__ */ d("div", {
		role: "tooltip",
		id: E,
		"data-testid": v,
		className: e("pointer-events-none z-[9500] max-w-xs rounded-md border border-border bg-surface px-2 py-1 text-xs text-text-primary shadow-lg", _),
		style: x,
		children: t
	}), document.body)] });
}
//#endregion
export { g as a, v as i, x as n, b as r, C as t };
