import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Spinner-CLcq5z8N.js";
import { useRef as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/components/shared/ErrorState.tsx
function a({ icon: t = "⚠️", title: n, body: a, description: o, actionLabel: s, onAction: c, action: l, testId: u = "error-state", actionTestId: d = "error-state-action" }) {
	let f = o ?? a;
	return /* @__PURE__ */ i("div", {
		role: "alert",
		"data-testid": u,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ r("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ r("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ r("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			f && /* @__PURE__ */ r("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: f
			}),
			l ? /* @__PURE__ */ r("div", {
				className: "mt-2.5",
				children: l
			}) : s && c && /* @__PURE__ */ r("button", {
				"data-testid": d,
				onClick: c,
				type: "button",
				className: e("mt-2.5 px-[22px] py-[9px] text-sm font-semibold", "bg-surface text-text-primary border border-border rounded-lg cursor-pointer font-[inherit]", "hover:bg-surface-panel"),
				children: s
			})
		]
	});
}
//#endregion
//#region src/components/shared/LoadingState.tsx
function o({ label: n = "Loading…", description: a, spinnerSize: o = "lg", spinnerColor: s, testId: c = "loading-state" }) {
	return /* @__PURE__ */ i("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ r(t, {
				size: o,
				color: s,
				decorative: !0
			}),
			/* @__PURE__ */ r("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: n
			}),
			a && /* @__PURE__ */ r("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: a
			})
		]
	});
}
//#endregion
//#region src/components/shared/SegmentedControl.tsx
var s = {
	sm: "px-2.5 py-1 text-xs",
	md: "px-3 py-1.5 text-sm"
}, c = "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]", l = "bg-surface shadow-sm text-[var(--color-text-primary)] border border-[var(--color-border)]";
function u({ options: t, value: a, onChange: o, size: u = "md", "aria-label": d, "aria-labelledby": f, disabled: p = !1, fullWidth: m = !1, className: h, "data-testid": g }) {
	let _ = n(null), v = t.filter((e) => !p), y = t.findIndex((e) => e.value === a), b = (e) => {
		if (p || v.length === 0) return;
		let n = (((y < 0 ? 0 : y) + e) % t.length + t.length) % t.length;
		o(t[n].value), _.current?.querySelectorAll("[role=\"radio\"]")[n]?.focus();
	};
	return /* @__PURE__ */ r("div", {
		ref: _,
		role: "radiogroup",
		"aria-label": d,
		"aria-labelledby": f,
		"data-testid": g,
		className: e(m ? "flex w-full items-center" : "inline-flex items-center", "rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-inset,#f8fafc)] p-0.5 gap-0.5", h),
		children: t.map((n, r) => {
			let d = n.value === a;
			return /* @__PURE__ */ i("button", {
				type: "button",
				role: "radio",
				"aria-checked": d,
				tabIndex: d || y < 0 && r === 0 ? 0 : -1,
				onClick: () => o(n.value),
				onKeyDown: (e) => {
					let n = e.key === "ArrowLeft" || e.key === "ArrowUp", r = e.key === "ArrowRight" || e.key === "ArrowDown";
					if (!(!n && !r && e.key !== "Home" && e.key !== "End")) {
						if (e.preventDefault(), e.key === "Home") {
							o(t[0].value);
							return;
						}
						if (e.key === "End") {
							o(t[t.length - 1].value);
							return;
						}
						b(n ? -1 : 1);
					}
				},
				disabled: p,
				"data-testid": g ? `${g}-${n.value}` : void 0,
				className: e("inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-all cursor-pointer", m && "flex-1", p && "cursor-not-allowed opacity-60", s[u], d ? l : c),
				children: [n.icon, n.label]
			}, n.value);
		})
	});
}
//#endregion
//#region src/components/shared/SearchInput.tsx
var d = {
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
function f({ value: t, onChange: n, placeholder: a, onClear: o, tone: s = "surface", className: c, inputClassName: l, style: u, autoFocus: f, "aria-label": p, "data-testid": m }) {
	let h = d[s] ?? d.surface;
	return /* @__PURE__ */ i("div", {
		className: e("relative inline-flex items-center", c),
		style: u,
		children: [
			/* @__PURE__ */ i("svg", {
				className: e("absolute left-3 w-3.5 h-3.5 pointer-events-none", h.icon),
				viewBox: "0 0 16 16",
				fill: "none",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ r("circle", {
					cx: "7",
					cy: "7",
					r: "4.5",
					stroke: "currentColor",
					strokeWidth: "1.5"
				}), /* @__PURE__ */ r("path", {
					d: "M10.5 10.5L14 14",
					stroke: "currentColor",
					strokeWidth: "1.5",
					strokeLinecap: "round"
				})]
			}),
			/* @__PURE__ */ r("input", {
				type: "text",
				value: t,
				onChange: (e) => n(e.target.value),
				placeholder: a ?? "Search…",
				autoFocus: f,
				"aria-label": p ?? a ?? "Search",
				"data-testid": m,
				className: e("w-full pl-8 pr-7 py-1.5 text-sm rounded-md border focus:outline-none focus:ring-2 transition-colors", h.field, l)
			}),
			t && /* @__PURE__ */ r("button", {
				type: "button",
				onClick: () => {
					n(""), o?.();
				},
				className: e("absolute right-2 p-0.5 rounded", h.clear),
				"aria-label": "Clear search",
				children: /* @__PURE__ */ r("svg", {
					width: "12",
					height: "12",
					viewBox: "0 0 12 12",
					fill: "none",
					children: /* @__PURE__ */ r("path", {
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
export { a as i, u as n, o as r, f as t };
