import { t as e } from "./cn-DhjIN-s0.js";
import { t } from "./Stack-CkiMw5K0.js";
import { t as n } from "./InlinePopover-sx7SpM1v.js";
import { Children as r, useRef as i, useState as a } from "react";
import { Fragment as o, jsx as s, jsxs as c } from "react/jsx-runtime";
//#region src/components/ui/SelectableCard.tsx
var l = {
	sm: "p-3",
	md: "p-4",
	lg: "p-6"
};
function u({ children: t, selected: n = !1, onSelect: r, padding: i = "sm", disabled: a = !1, className: o, ...c }) {
	return /* @__PURE__ */ s("button", {
		type: "button",
		"aria-pressed": n,
		disabled: a,
		onClick: r,
		className: e("block w-full text-left font-inherit rounded-lg border transition-colors duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40", l[i], n ? "border-primary bg-surface-hover" : "border-border bg-surface hover:border-border-emphasis", a ? "opacity-50 cursor-not-allowed" : "cursor-pointer", o),
		...c,
		children: t
	});
}
//#endregion
//#region src/components/shared/Breadcrumbs.tsx
function d({ item: t, isLast: n, block: r = !1, afterActivate: i }) {
	let a = (e) => {
		t.onClick?.(e), i?.();
	}, o = e("text-sm leading-snug transition-colors duration-100", n ? "text-[var(--color-text-primary)] font-medium cursor-default" : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-normal", r && "block w-full px-3 py-1.5 rounded-sm hover:bg-[var(--color-surface-hover)]");
	return n || !t.href && !t.onClick ? /* @__PURE__ */ s("span", {
		className: o,
		"aria-current": n ? "page" : void 0,
		children: t.label
	}) : t.href ? /* @__PURE__ */ s("a", {
		href: t.href,
		onClick: a,
		className: e(o, "no-underline"),
		children: t.label
	}) : /* @__PURE__ */ s("button", {
		type: "button",
		onClick: a,
		className: e(o, "border-none bg-transparent cursor-pointer font-[inherit] p-0", r && "text-left px-3 py-1.5"),
		children: t.label
	});
}
function f(e, t) {
	if (e.length <= t) return e;
	let n = e.slice(0, 1), r = e.slice(-(t - 2 > 0 ? t - 2 : 1));
	return [
		...n,
		null,
		...r
	];
}
function p(e, t) {
	let n = t - 2 > 0 ? t - 2 : 1;
	return e.slice(1, e.length - n);
}
function m({ items: e }) {
	let [t, r] = a(!1), l = i(null);
	return /* @__PURE__ */ c(o, { children: [/* @__PURE__ */ s("button", {
		ref: l,
		type: "button",
		"aria-label": "Show hidden breadcrumbs",
		"aria-expanded": t,
		"aria-haspopup": "true",
		onClick: () => r((e) => !e),
		className: "text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] border-none bg-transparent cursor-pointer px-1 py-0 rounded-sm leading-snug",
		children: "…"
	}), /* @__PURE__ */ s(n, {
		trigger: l,
		open: t,
		onClose: () => r(!1),
		"aria-label": "Hidden breadcrumbs",
		"data-testid": "breadcrumb-overflow",
		className: "min-w-[160px] py-1",
		children: /* @__PURE__ */ s("ol", {
			className: "list-none m-0 p-0",
			children: e.map((e, t) => /* @__PURE__ */ s("li", { children: /* @__PURE__ */ s(d, {
				item: e,
				isLast: !1,
				block: !0,
				afterActivate: () => r(!1)
			}) }, `${e.label}-${t}`))
		})
	})] });
}
function h({ items: t, separator: n = "/", maxItems: r, overflow: i = "ellipsis", minItems: a, className: o, "data-testid": l }) {
	if (t.length === 0 || a != null && t.length < a) return null;
	let u = r == null ? t : f(t, r), h = r == null ? [] : p(t, r);
	return /* @__PURE__ */ s("nav", {
		"aria-label": "Breadcrumb",
		"data-testid": l,
		className: e("flex items-center", o),
		children: /* @__PURE__ */ s("ol", {
			className: "flex items-center gap-1 flex-wrap list-none m-0 p-0",
			children: u.map((e, t) => {
				let r = t === u.length - 1;
				return /* @__PURE__ */ c("li", {
					className: "flex items-center gap-1",
					children: [e === null ? i === "menu" && h.length > 0 ? /* @__PURE__ */ s(m, { items: h }) : /* @__PURE__ */ s("span", {
						className: "text-sm text-[var(--color-text-tertiary)] select-none",
						"aria-label": "More items",
						title: "Some items are hidden",
						children: "…"
					}) : /* @__PURE__ */ s(d, {
						item: e,
						isLast: r
					}), !r && /* @__PURE__ */ s("span", {
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
var g = {
	xs: "text-[11px]",
	sm: "text-[12px]"
}, _ = {
	tertiary: "text-text-tertiary",
	secondary: "text-text-secondary"
};
function v(e) {
	return e == null || e === !1 || e === !0 ? !1 : typeof e == "string" ? e.trim() !== "" : !Array.isArray(e) || r.toArray(e).some(v);
}
function y({ items: t, separator: n = "·", size: r = "xs", tone: i = "tertiary", className: a, "data-testid": o }) {
	let l = t.filter(v);
	return l.length === 0 ? null : /* @__PURE__ */ s("div", {
		className: e("flex flex-wrap items-center gap-x-1.5 gap-y-0.5", g[r], _[i], a),
		"data-testid": o,
		children: l.map((e, t) => /* @__PURE__ */ c("span", {
			className: "flex items-center gap-1.5",
			children: [t > 0 ? /* @__PURE__ */ s("span", {
				"aria-hidden": "true",
				children: n
			}) : null, e]
		}, t))
	});
}
//#endregion
//#region src/components/shared/Text.tsx
function b({ as: e = "span", className: n, title: r, children: i, wrap: a = !1, ...o }) {
	return /* @__PURE__ */ s(t, {
		as: e,
		gap: "none",
		wrap: a,
		className: n,
		title: r,
		...o,
		children: i
	});
}
var x = b;
//#endregion
export { u as a, h as i, b as n, y as r, x as t };
