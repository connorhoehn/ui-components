import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Stack-CkiMw5K0.js";
import { t as n } from "./Spinner-CLcq5z8N.js";
import { Children as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var o = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function s({ children: t, selected: n = !1, onSelect: r, padding: a = "sm", disabled: s = !1, className: c, ...l }) {
	return /* @__PURE__ */ i("button", {
		type: "button",
		"aria-pressed": n,
		disabled: s,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", o[a], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", s ? "opacity-50 cursor-not-allowed" : "cursor-pointer", c),
		...l,
		children: t
	});
}
//#endregion
//#region src/components/shared/ErrorState.tsx
function c({ icon: t = "⚠️", title: n, body: r, description: o, actionLabel: s, onAction: c, action: l, testId: u = "error-state", actionTestId: d = "error-state-action" }) {
	let f = o ?? r;
	return /* @__PURE__ */ a("div", {
		role: "alert",
		"data-testid": u,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-2 p-8 font-[inherit]"),
		children: [
			t && (typeof t == "string" ? /* @__PURE__ */ i("div", {
				className: "text-[52px] mb-2",
				"aria-hidden": !0,
				children: t
			}) : /* @__PURE__ */ i("div", {
				className: "mb-2",
				children: t
			})),
			/* @__PURE__ */ i("div", {
				className: "text-[17px] font-semibold text-[var(--color-state-error,#dc2626)]",
				children: n
			}),
			f && /* @__PURE__ */ i("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: f
			}),
			l ? /* @__PURE__ */ i("div", {
				className: "mt-2.5",
				children: l
			}) : s && c && /* @__PURE__ */ i("button", {
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
function l({ label: t = "Loading…", description: r, spinnerSize: o = "lg", spinnerColor: s, testId: c = "loading-state" }) {
	return /* @__PURE__ */ a("div", {
		role: "status",
		"aria-live": "polite",
		"data-testid": c,
		className: e("flex flex-col items-center justify-center min-h-[220px]", "text-text-secondary gap-3 p-8 font-[inherit]"),
		children: [
			/* @__PURE__ */ i(n, {
				size: o,
				color: s,
				decorative: !0
			}),
			/* @__PURE__ */ i("div", {
				className: "text-[15px] font-medium text-text-primary",
				children: t
			}),
			r && /* @__PURE__ */ i("div", {
				className: "text-[13px] text-center max-w-[340px] text-text-secondary leading-normal",
				children: r
			})
		]
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var u = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, d = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function f(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || r.toArray(e).some(f);
}
function p({ items: t, separator: n = "·", size: r = "xs", tone: o = "tertiary", className: s, "data-testid": c }) {
	let l = t.filter(f);
	return l.length === 0 ? null : /* @__PURE__ */ i("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", u[r], d[o], s),
		"data-testid": c,
		children: l.map((e, t) => /* @__PURE__ */ a("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ i("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function m({ as: e = "span", className: n, title: r, children: a, wrap: o = !1, ...s }) {
	return /* @__PURE__ */ i(t, {
		as: e,
		gap: "none",
		wrap: o,
		className: n,
		title: r,
		...s,
		children: a
	});
}
var h = m;
//#endregion
export { c as a, l as i, m as n, s as o, p as r, h as t };
