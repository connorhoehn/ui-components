import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Button-BhS4-R6_.js";
import { t as n } from "./Card-RQCeAPNU.js";
import { t as r } from "./StatusDot-Bgx2zxgC.js";
import { t as i } from "./CardHeader-CsPhVpCm.js";
import { t as a } from "./InlinePopover-CG_Jwga7.js";
import { useEffect as o, useRef as s, useState as c } from "react";
import { jsx as l, jsxs as u } from "react/jsx-runtime";
//#region src/components/shared/PresenceDot.tsx
var d = {
	online: "var(--color-success, #22c55e)",
	away: "var(--color-state-pending, #f59e0b)",
	busy: "var(--color-state-error, #ef4444)",
	offline: "var(--color-text-tertiary, #94a3b8)",
	unknown: "var(--color-text-tertiary, #94a3b8)"
}, f = {
	online: "Online",
	away: "Away",
	busy: "Busy",
	offline: "Offline",
	unknown: "Unknown presence"
};
function p({ state: e, ariaLabel: t, label: n, pulse: i, size: a = "sm", className: o, style: s, title: c, "data-testid": u }) {
	let p = i ?? e === "online", m = t ?? f[e];
	return /* @__PURE__ */ l(r, {
		color: d[e],
		pulse: p,
		size: a,
		label: n,
		className: o,
		style: s,
		title: c,
		"data-testid": u ?? `presence-${e}`,
		"aria-label": m
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var m = {
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
function h({ value: t, onChange: n, placeholder: r, onClear: i, tone: a = "surface", className: o, inputClassName: s, style: c, autoFocus: d, "aria-label": f, "data-testid": p }) {
	let h = m[a] ?? m.surface;
	return /* @__PURE__ */ u("div", {
		className: e("relative inline-flex items-center", o),
		style: c,
		children: [
			/* @__PURE__ */ u("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", h.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ l("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ l("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ l("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: r ?? "Search…",
				autoFocus: d,
				"aria-label": f ?? r ?? "Search",
				"data-testid": p,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", h.field, s)
			}),
			t && /* @__PURE__ */ l("button", {
				type: "button",
				onClick: () => {
					n(""), i?.();
				},
				className: e("absolute right-2 p-0.5 rounded", h.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ l("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ l("path", {
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
//#region src/components/shared/LogStream.tsx
var g = {
	debug: "DEBUG",
	info: "INFO",
	warn: "WARN",
	error: "ERROR"
}, _ = {
	debug: "text-[var(--color-text-tertiary)]",
	info: "text-[var(--color-info,#3b82f6)]",
	warn: "text-[var(--color-warning,#d97706)]",
	error: "text-[var(--color-danger,#dc2626)]"
};
function v({ lines: t, follow: r = !0, showTimestamp: a = !0, showLevel: d = !0, showSource: f = !0, title: p = "Log stream", headerSlot: m, emptyMessage: h = "No log lines yet.", maxHeight: v, tone: y = "code", onClear: b, className: x, style: S, "data-testid": C = "log-stream" }) {
	let w = s(null), [T, E] = c(!1);
	o(() => {
		if (!r || T) return;
		let e = w.current;
		e && (e.scrollTop = e.scrollHeight);
	}, [
		t,
		r,
		T
	]);
	let D = () => {
		let e = w.current;
		if (!e) return;
		let t = e.scrollHeight - e.scrollTop - e.clientHeight < 24;
		E(!t);
	}, O = () => {
		let e = w.current;
		e && (e.scrollTop = e.scrollHeight, E(!1));
	}, k = /* @__PURE__ */ u("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ u("span", {
			className: "text-[10px] text-[var(--color-text-tertiary)]",
			"data-testid": `${C}-count`,
			children: [
				t.length,
				" ",
				t.length === 1 ? "line" : "lines"
			]
		}), b && /* @__PURE__ */ l("button", {
			type: "button",
			onClick: b,
			"data-testid": `${C}-clear`,
			className: e("text-[10px] uppercase tracking-wide", "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]", "border border-[var(--color-border)] rounded px-1.5 py-0.5", "cursor-pointer bg-transparent"),
			children: "Clear"
		})]
	});
	return /* @__PURE__ */ u(n, {
		"data-testid": C,
		className: e("flex flex-col", x),
		style: S,
		children: [p !== null && /* @__PURE__ */ l("div", {
			className: "px-4 py-3 border-b border-[var(--color-border)]",
			children: /* @__PURE__ */ l(i, {
				title: p,
				meta: m ?? k
			})
		}), /* @__PURE__ */ u("div", {
			className: "relative flex-1 min-h-0 flex",
			children: [/* @__PURE__ */ l("div", {
				ref: w,
				onScroll: D,
				role: "log",
				"aria-live": r ? "polite" : "off",
				"data-testid": `${C}-scroll`,
				className: e("flex-1 overflow-y-auto", "font-mono text-[12px] leading-[1.55]", y === "surface" ? "bg-surface-inset text-text-primary" : "bg-[var(--color-surface-subtle,#0b1020)] text-[var(--color-text-primary,#e5e7eb)]", "py-2"),
				style: { maxHeight: v },
				children: t.length === 0 ? /* @__PURE__ */ l("div", {
					"data-testid": `${C}-empty`,
					className: "px-3 py-6 text-center text-[11px] text-[var(--color-text-tertiary)]",
					children: h
				}) : t.map((t) => {
					let n = t.level ?? "info", r = String(n), i = g[n] ?? r.toUpperCase(), o = _[n] ?? _.info;
					return /* @__PURE__ */ u("div", {
						role: "listitem",
						"data-testid": `${C}-line`,
						"data-level": t.level || void 0,
						className: "flex items-baseline gap-2 px-3 hover:bg-[var(--color-surface,rgba(255,255,255,0.04))]",
						children: [
							a && t.timestamp && /* @__PURE__ */ l("span", {
								className: "shrink-0 text-[var(--color-text-tertiary)] tabular-nums",
								children: t.timestamp
							}),
							d && t.level && /* @__PURE__ */ l("span", {
								className: e("shrink-0 font-semibold uppercase text-[10px] w-[44px]", o),
								"aria-label": `level ${r.toLowerCase()}`,
								children: i
							}),
							f && t.source && /* @__PURE__ */ u("span", {
								className: "shrink-0 text-[var(--color-text-secondary)]",
								children: [
									"[",
									t.source,
									"]"
								]
							}),
							/* @__PURE__ */ l("span", {
								className: "flex-1 whitespace-pre-wrap break-words",
								children: t.message
							})
						]
					}, t.id);
				})
			}), r && T && /* @__PURE__ */ l("button", {
				type: "button",
				"data-testid": `${C}-jump`,
				onClick: O,
				className: e("absolute bottom-3 left-1/2 -translate-x-1/2", "px-3 py-1 text-[10px] font-semibold uppercase tracking-wide", "bg-primary text-white rounded-full border-none cursor-pointer", "shadow-[0_2px_8px_rgba(0,0,0,0.25)]"),
				children: "Jump to live ↓"
			})]
		})]
	});
}
var y = v, b = {
	sm: "w-[264px]",
	md: "w-[320px]",
	lg: "w-[380px]"
};
function x({ open: n, anchor: r, placement: i = "bottom-start", title: c, subtitle: d, icon: f, submitLabel: p, submitSlot: m, submitTestId: h, submitDisabled: g = !1, busy: _ = !1, error: v = null, onSubmit: y, onClose: x, width: S = "md", children: C, "data-testid": w = "popover-form" }) {
	let T = s(null), E = s(null);
	if (o(() => {
		if (!n) return;
		let e = window.setTimeout(() => {
			E.current?.querySelector("input, textarea, select")?.focus();
		}, 0);
		return () => window.clearTimeout(e);
	}, [n]), !n) return null;
	let D = /* @__PURE__ */ u("form", {
		className: e("flex flex-col", b[S]),
		"data-testid": w,
		onSubmit: (e) => {
			e.preventDefault(), !g && !_ && y();
		},
		children: [
			/* @__PURE__ */ u("div", {
				className: "flex items-center gap-2 border-b border-border px-3 py-2.5",
				children: [f && /* @__PURE__ */ l("span", {
					className: "flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary-bg text-primary-fg",
					"aria-hidden": "true",
					children: f
				}), /* @__PURE__ */ u("span", {
					className: "flex min-w-0 flex-col",
					children: [/* @__PURE__ */ l("span", {
						className: "truncate text-[13px] font-semibold leading-tight text-text-primary",
						"data-testid": `${w}-title`,
						children: c
					}), d && /* @__PURE__ */ l("span", {
						className: "truncate text-[11px] leading-tight text-text-tertiary",
						children: d
					})]
				})]
			}),
			/* @__PURE__ */ l("div", {
				ref: E,
				className: "flex flex-col gap-2.5 px-3 py-2.5",
				children: C
			}),
			/* @__PURE__ */ l("div", {
				className: e("min-h-[1.125rem] px-3", v && "pb-1"),
				"aria-live": "polite",
				children: v && /* @__PURE__ */ l("span", {
					className: "text-[11px] leading-tight text-danger-fg",
					role: "alert",
					"data-testid": `${w}-error`,
					children: v
				})
			}),
			/* @__PURE__ */ u("div", {
				className: "flex items-center justify-end gap-1.5 border-t border-border px-3 py-2",
				children: [/* @__PURE__ */ l(t, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: x,
					disabled: _,
					"data-testid": `${w}-cancel`,
					children: "Cancel"
				}), m === !1 ? null : m ?? /* @__PURE__ */ l(t, {
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
	return r ? /* @__PURE__ */ l(a, {
		trigger: r ?? T,
		open: n,
		onClose: x,
		placement: i,
		offset: 6,
		className: "p-0",
		"data-testid": `${w}-popover`,
		children: D
	}) : /* @__PURE__ */ l("div", {
		className: "fixed inset-0 z-50 flex items-start justify-center bg-black/20 pt-24",
		onMouseDown: x,
		"data-testid": `${w}-backdrop`,
		children: /* @__PURE__ */ l("div", {
			className: "rounded-lg border border-border bg-surface shadow-lg",
			onMouseDown: (e) => e.stopPropagation(),
			children: D
		})
	});
}
function S({ label: e, hint: t, children: n, "data-testid": r }) {
	return /* @__PURE__ */ u("label", {
		className: "flex flex-col gap-1",
		"data-testid": r,
		children: [
			/* @__PURE__ */ l("span", {
				className: "text-[11px] font-medium leading-none text-text-secondary",
				children: e
			}),
			n,
			t && /* @__PURE__ */ l("span", {
				className: "text-[11px] leading-tight text-text-tertiary",
				children: t
			})
		]
	});
}
//#endregion
export { h as a, y as i, x as n, p as o, v as r, S as t };
