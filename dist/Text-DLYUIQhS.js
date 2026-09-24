import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Stack-CkiMw5K0.js";
import { t as n } from "./EmptyState-DFWbBBcY.js";
import { t as r } from "./InlinePopover-DtYo8_ZC.js";
import { Children as i, useRef as a, useState as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var u = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function d({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...s }) {
	return /* @__PURE__ */ c("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", u[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...s,
		children: t
	});
}
//#endregion
//#region src/components/shared/NoAccessState.tsx
function f() {
	return /* @__PURE__ */ l("svg", {
		width: "28",
		height: "28",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "1.75",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": !0,
		children: [/* @__PURE__ */ c("rect", {
			x: "4",
			y: "11",
			width: "16",
			height: "10",
			rx: "2"
		}), /* @__PURE__ */ c("path", { d: "M8 11V7a4 4 0 0 1 8 0v4" })]
	});
}
function p(e, t) {
	return `You don't have access to ${e} — ask ${t?.trim() || "its owner"} to share it.`;
}
function m({ resource: e, ownerName: t, actionLabel: r, onAction: i, size: a, className: o, testId: s = "no-access-state" }) {
	return /* @__PURE__ */ c(n, {
		icon: /* @__PURE__ */ c(f, {}),
		title: `You don't have access to ${e}`,
		body: `Ask ${t?.trim() || "its owner"} to share it with you.`,
		...r && i ? {
			actionLabel: r,
			onAction: i
		} : {},
		...a ? { size: a } : {},
		...o ? { className: o } : {},
		testId: s
	});
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function h({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ c("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ c("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ c("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function g(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function _(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function v({ items: e }) {
	let [t, n] = o(!1), i = a(null);
	return /* @__PURE__ */ l(s, { children: [/* @__PURE__ */ c("button", {
		ref: i,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => n((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ c(r, {
		trigger: i,
		open: t,
		onClose: () => n(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ c("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ c("li", { children: /* @__PURE__ */ c(h, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => n(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function y({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, lastIsCurrent: o = !0, className: s, "data-testid": u }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let d = r == null ? t : g(t, r), f = r == null ? [] : _(t, r);
	return /* @__PURE__ */ c("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": u,
		className: e("flex items-center", s),
		children: /* @__PURE__ */ c("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: d.map((e, t) => {
				let r = t === d.length - 1;
				return /* @__PURE__ */ l("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && f.length > 0 ? /* @__PURE__ */ c(v, { items: f }) : /* @__PURE__ */ c("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ c(h, {
						item: e,
						isLast: r && o
					}), !r && /* @__PURE__ */ c("span", {
						className: "text-[var(--color-text-tertiary)] text-sm select-none",
						"aria-hidden": "true",
						children: n
					})]
				}, t);
			})
		})
	});
}
//#endregion
//#region src/components/shared/MetaLine.tsx
var b = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, x = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function S(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || i.toArray(e).some(S);
}
function C({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let s = t.filter(S);
	return s.length === 0 ? null : /* @__PURE__ */ c("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", b[r], x[i], a),
		"data-testid": o,
		children: s.map((e, t) => /* @__PURE__ */ l("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ c("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function w({ as: e = "span", className: n, title: r, children: i, wrap: a = !1, ...o }) {
	return /* @__PURE__ */ c(t, {
		as: e,
		gap: "none",
		wrap: a,
		className: n,
		title: r,
		...o,
		children: i
	});
}
var T = w;
//#endregion
export { m as a, y as i, w as n, p as o, C as r, d as s, T as t };
